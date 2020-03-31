function is_number(c)
{
  const code = c.charCodeAt(0);
  return code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0);
}
function is_letter(c)
{
  const code = c.charCodeAt(0);
  return code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0) || code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0);
}
function is_whitespace(c)
{
  return c === '\n' || c === '\r' || c === ' ' || c === '\t';
}
function is_identifier_char(c)
{
  return is_letter(c) || is_number(c) || c === '_';
}
function is_identifier_start(c)
{
  return is_letter(c) || c === '_';
}
function multi_char_equal(token, chars, idx)
{
  if(idx + token.length > chars.length)return false;
  for(let i=0; i<token.length; i++)if(chars[idx+i] !== token.charAt(i))return false;
  return true;
}
function make_token(type, data = {})
{
  return {type, ...data};
}
function lex_string(_str)
{
  const tokens = [];

  const chars = _str.split("");

  for(let i=0; i<chars.length; i++)
  {
    let c = chars[i];
    if(is_whitespace(c));
    else if(is_number(c))
    {
      let number = c;
      while(i+1 < chars.length && (is_number(chars[i+1]) || chars[i+1] === '.'))number += chars[++i];
      tokens.push(make_token(TOKEN_NUMBER, {value: parseFloat(number)}));
    }
    else if(c === '+')tokens.push(make_token(TOKEN_PLUS));
    else if(c === '-')tokens.push(make_token(TOKEN_MINUS));
    else if(multi_char_equal("**", chars, i))tokens.push(make_token(TOKEN_POWER)), i++;
    else if(c === '*')tokens.push(make_token(TOKEN_MULTIPLY));
    else if(c === '/')tokens.push(make_token(TOKEN_DIVIDE));
    else if(c === '(')tokens.push(make_token(TOKEN_OPEN_PAREN));
    else if(c === ')')tokens.push(make_token(TOKEN_CLOSE_PAREN));
    else tokens.push(make_token(TOKEN_UNKNOWN, {char:c}));
  }
  tokens.push(make_token(TOKEN_EOI));
  return tokens;
}
