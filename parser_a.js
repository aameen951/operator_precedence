
function parse_power()
{
  let result = parse_operand();
  if(cur().type == TOKEN_POWER)
  {
    const operator = next();
    result = operator.eval(result, parse_power());
  }
  return result;
}
function parse_multiply()
{
  let result = parse_power();
  while(cur().type == TOKEN_MULTIPLY || cur().type == TOKEN_DIVIDE)
  {
    const operator = next();
    result = operator.eval(result, parse_power());
  }
  return result;
}
function parse_add()
{
  let result = parse_multiply();
  while(cur().type == TOKEN_PLUS || cur().type == TOKEN_MINUS)
  {
    const operator = next();
    result = operator.eval(result, parse_multiply());
  }
  return result;
}

function parse_expression_a()
{
  return parse_add();
}

function parse_a_main()
{
  set_lexer_input("1 + 10 / 2 / 2 + 10 * 3 * 2 + 2.5 ** 3 ** 2"); // expected 3878.197265625
  console.log("A", parse_expression_a());
}
