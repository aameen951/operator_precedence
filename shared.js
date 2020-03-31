
const TOKEN_NUMBER = "NUMBER";
const TOKEN_PLUS = "PLUS";
const TOKEN_MINUS = "MINUS";
const TOKEN_MULTIPLY = "MULTIPLY";
const TOKEN_POWER = "POWER";
const TOKEN_DIVIDE = "DIVIDE";
const TOKEN_OPEN_PAREN = "OPEN_PAREN";
const TOKEN_CLOSE_PAREN = "CLOSE_PAREN";
const TOKEN_UNKNOWN = "UNKNOWN";
const TOKEN_EOI = "EOI";


// The lexer
let tokens = [];
let _current = 0;
function cur(){
  return _current < tokens.length ? tokens[_current] : {type: TOKEN_EOI};
}
function next(){
  if(_current < tokens.length)_current++;
  return tokens[_current-1];
}
function set_lexer_input(input){

  tokens = lex_string(input);

  // store operator info on the token to simplify parser code.
  tokens.forEach(t => {
    const operator_data = operators[t.type];
    if(operator_data)
    {
      t.is_operator = true;
      t.precedence = operator_data.precedence;
      t.left = operator_data.left;
      t.eval = operator_data.eval;
    };
  });

  _current = 0;
}

// The parser
function parse_operand(){
  if(cur().type === TOKEN_NUMBER)
    return next().value;
  else if(cur().type === TOKEN_OPEN_PAREN)
  {
    next();
    const result = window.parse_expression();
    if(cur().type !== TOKEN_CLOSE_PAREN)
    {
      throw new Error("Expecting a closing parenthesis");
    }
    next();
    return result;
  }
  throw new Error("Expecting an operand");
}
