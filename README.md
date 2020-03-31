
# Operator Precedence and Associativity

This repository presents two methods for parsing operators according to precedence rules and associativity.
The relevant code is in `parser_a.js` and `parser_b.js`.

## 1. `parser_a`

This parser can handle terms, factors, and exponents with the correct precedence and associativity using _simple and straight forward_ parsing code (loops and recursion) and without any correction passes.

### Explanation:
- There is a separate function for each precedence level.
- Operators with low precedence call the function for operators with the next level of precedence.
- Operators with highest precedence calls parse_operand directly.
- Right-associative operators should already be familiar:
    1. Parse the left side by calling the next precedence level
    2. Parse the operator.
    3. Recurse to parse the right side.
    4. Combine left and right using the operator as the result.
- Left-associative operators are the tricky ones: 
    1. Parse the left side by calling the next precedence level.
    2. Parse the operator.
    3. Parse the right side by calling the next precedence level again.
    4. Combine the left and right using the operator and treat the result as the new left side.
    5. Loop to 2.
    6. return the last left side.

### Problems:

After reading the code, you can see that the logic is the same in all functions. Only the operators are different. Also left-associative operators are very similar to right-associative.

In this example there are only 3 levels of precedence so it doesn't matter that much but in a real language there could be more than 10 levels of precedence and each will have more code for error handling and building the AST nodes etc. which means there is going to be a lot of duplicate and error-prone code.

How can you compress them into a single function? I suggest giving it a try yourself. Then look at `parser_b` for the compressed version of this code.

### Precedence Rules and Associativity:
    terms (add/sub): lowest precedence and left-associative.
    factors (mul/div): higher precedence and left-associative.
    exponents (powers): highest precedence and right-associative.

### BNF Rules:
    add_expr       :=   multiply_expr  |  add_expr       +    multiply_expr
                                       |  add_expr       -    multiply_expr

    multiply_expr  :=   power_expr     |  multiply_expr  *    power_expr
                                       |  multiply_expr  /    power_expr

    power_expr     :=   operand        |  operand        **   power_expr

## 2. `parser_b`

Before looking at this parser, make sure you understand `parser_a` method. 

This is a compressed version of 'parser_a' for handling precedence and associativity. It is data-driven by the following table:

    {
      '+'  : { level: 1, associativity: LEFT },
      '-'  : { level: 1, associativity: LEFT },
      '*'  : { level: 2, associativity: LEFT },
      '/'  : { level: 2, associativity: LEFT },
      '**' : { level: 3, associativity: RIGHT },
    }

This method is called the **Precedence Climbing Method**.

### Precedence Climbing Method:
  - https://eli.thegreenplace.net/2012/08/02/parsing-expressions-by-precedence-climbing
  - https://en.wikipedia.org/wiki/Operator-precedence_parser#Precedence_climbing_method
 
