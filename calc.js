function calc(...args) {
  if (args.length % 2 === 0) {
    throw new Error('Invalid input');
  }

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const performOperation = (operands, operators) => {
    const operator = operators.pop();
    const b = operands.pop();
    const a = operands.pop();
    switch (operator) {
      case '+':
        operands.push(a + b);
        break;
      case '-':
        operands.push(a - b);
        break;
      case '*':
        operands.push(a * b);
        break;
      case '/':
        if (b === 0) {
          throw new Error('Division by zero');
        }
        operands.push(a / b);
        break;
      default:
        throw new Error('Invalid operator');
    }
  };

  const operands = [];
  const operators = [];

  for (let i = 0; i < args.length; i++) {
    const token = args[i];
    if (i % 2 === 0) {
      if (typeof token !== 'number') {
        throw new Error('Invalid input type');
      }
      operands.push(token);
    }
    else {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        performOperation(operands, operators);
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    performOperation(operands, operators);
  }

  if (operands.length !== 1) {
    throw new Error('Invalid input');
  }

  return operands[0];
}

module.exports = calc;
