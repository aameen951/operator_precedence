//
// NOTE(ameen): This code parses terms, factors, and exponents with the correct precedence and associativity
// using simple and straight forward parsing code (loops and recursion) and without any correction passes.
//
// Precedence Rules and Associativity:
//
//   exponents (powers): highest precedence and right-associative.
//   factors (mul/div): next to high precedence and left-associative.
//   terms (add/sub): lowest precedence and left-associative.
//
// BNF Rules:
//
//   power_expr     :=   operand        |  operand         **    power_expr
//
//   multiply_expr  :=   power_expr     |  multiply_expr  (*|/)  power_expr
//
//   add_expr       :=   multiply_expr  |  add_expr       (+|-)  multiply_expr
//
// NOTE(ameen):
// - There is a separate function for each precedence level.
// - Operators with low precedence call the function for operators with the next level of precedence.
// - Operators with highest precedence calls parse_operand directly.
// - Right-associative operators should already be familiar:
//     1. Parse the left side by calling the next precedence level
//     2. Parse the operator.
//     3. Recuse to parse the right side.
//     4. Combine left and right using the operator as the result.
// - Left-associative operators are the tricky ones: 
//     1. Parse the left side by calling the next precedence level.
//     2. Parse the operator.
//     3. Parse the right side by calling the next precedence level again.
//     4. Combine the left and right using the operator and treat the result as the new left side.
//     5. Loop to 2.
//     6. return the last left side.
//
// NOTE(ameen): After reading the code, you can notice that the logic is the same in all functions. Only the
// operators are different. Also left-associative is very similar to right-associative.
// In this example there are only 3 levels of precedence so it doesn't matter that much but in a real language
// there could be more than 10 levels of precedence and each will have more code for error handling and
// building the AST nodes ... which means there is going to be a lot of duplicate, error-prone code.
// 
// How can you compress them into a single function? I suggest giving it a try yourself. Then look at
// parser_b file for the compressed version of this code.
//

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
