export default class Calculation {

  private _operand1!: number | Calculation;
  get operand1(): number {
    return this._operand1 instanceof Calculation ? this._operand1.getResult() : this._operand1;
  }
  set operand1(value: number | Calculation) {
    this._operand1 = value;
  }

  private _operator!: string;
  get operator(): string {
    return this._operator;
  }
  set operator(value: string) {
    if (['+', '-', '*', '/'].includes(value)) {
      this._operator = value;
    } else {
      alert('INTERNAL ERROR! Please refresh the page.');
    }
  }

  public operand2: number | undefined;

  constructor(operand1: number | Calculation, operator: string) {
    this.operand1 = operand1;
    this.operator = operator;
  }

  public getResult(): number {
    if (this.operand2) {
      switch(this.operator) {
        case '+':
          return this.operand1 + this.operand2;
        case '-':
          return this.operand1 - this.operand2;
        case '*':
          return this.operand1 * this.operand2;
        case '/':
          return this.operand1 / this.operand2;
        default:
          return 0;
      }
    } else {
      return this.operand1;
    }
  }
}
