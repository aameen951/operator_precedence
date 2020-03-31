
const operators = {
  // NOTE(ameen): Under the hood, 'operators' data is copied into the token.
  [TOKEN_PLUS]     : {precedence:1, left:true, eval:(a, b) => a + b},
  [TOKEN_MINUS]    : {precedence:1, left:true, eval:(a, b) => a - b},
  [TOKEN_MULTIPLY] : {precedence:2, left:true, eval:(a, b) => a * b},
  [TOKEN_DIVIDE]   : {precedence:2, left:true, eval:(a, b) => a / b},
  [TOKEN_POWER]    : {precedence:3, left:false, eval:(a, b) => a ** b},
};

function parse_expression_b(precedence = 0)
{
  let result = parse_operand();
  while(cur().is_operator && cur().precedence >= precedence)
  {
    const operator = next();
    const operand2 = parse_expression_b(operator.precedence + (operator.left ? 1 : 0));
    result = operator.eval(result, operand2);
  }
  return result;
}

function parse_b_main()
{
  set_lexer_input("1 + 10 / 2 / 2 + 10 * 3 * 2 + 2.5 ** 3 ** 2"); // expected 3878.197265625
  console.log("B", parse_expression_b());
}
