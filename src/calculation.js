export default class Calculation {
  constructor(operand1, operator) {
    this.operand1 = operand1;
    this.operator = operator;
    this.operand2;
  }

  get operand1() {
    return this._operand1 instanceof Calculation ? this._operand1.getResult() : this._operand1;
  }

  set operand1(value) {
    if (value instanceof Calculation) {
      this._operand1 = value;
    } else if (!isNaN(value)) {
      this._operand1 = parseFloat(value);
    } else {
      alert('INTERNAL ERROR! Please refresh the page.');
    }
  }

  get operator() {
    return this._operator;
  }

  set operator(value) {
    if (['+', '-', '*', '/'].includes(value)) {
      this._operator = value;
    } else {
      alert('INTERNAL ERROR! Please refresh the page.');
    }
  }

  getResult() {
    if (this.operand2) {
      switch(this.operator) {
        case '+':
          return this.operand1 + parseFloat(this.operand2);
        case '-':
          return this.operand1 - parseFloat(this.operand2);
        case '*':
          return this.operand1 * parseFloat(this.operand2);
        case '/':
          return this.operand1 / parseFloat(this.operand2);
        default:
          return 0;
      }
    } else {
      return this.operand1;
    }
  }
}
