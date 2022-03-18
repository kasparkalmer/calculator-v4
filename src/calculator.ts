import Calculation from "./calculation";

export default class Calculator {

  private lastCalculation: Calculation | undefined;
  private currentInput: string = '';
  private waitingForInput: boolean = true;

  constructor() { }

  public operator(operator: string): string {
    if (operator === '-' && this.waitingForInput) {
      return this.input(operator);
    } else if (!isNaN(Number(this.currentInput))) {
      return this.newCalculation(operator);
    } else {
      return '';
    }
  }

  private newCalculation(operator: string): string {
    if (isNaN(Number(this.currentInput))) {
      return this.currentInput;
    }

    if (this.lastCalculation && this.lastCalculation.operand2) {
      this.lastCalculation = new Calculation(this.lastCalculation, operator);
      this.lastCalculation.operand2 = Number(this.currentInput);
    } else if (this.lastCalculation) {
      this.lastCalculation.operand2 = Number(this.currentInput);
      this.lastCalculation = new Calculation(this.lastCalculation, operator);
    } else {
      this.lastCalculation = new Calculation(Number(this.currentInput), operator);
    }

    this.currentInput = '';
    this.waitingForInput = true;
    return this.lastCalculation.getResult().toString();
  }

  public equals(): string {
    if (this.lastCalculation!.operand2) {
      const newCalculation = new Calculation(this.lastCalculation!, this.lastCalculation!.operator);
      newCalculation.operand2 = this.lastCalculation!.operand2;
      this.lastCalculation = newCalculation;
    } else {
      this.lastCalculation!.operand2 = Number(this.currentInput);
      this.currentInput = '';
    }
    return this.lastCalculation!.getResult().toString();
  }

  public input(input: string): string {
    if (this.waitingForInput) {
      this.waitingForInput = false;
    }

    if (input === '0' && (this.currentInput === '0' || this.currentInput === '-0')) {
      return this.currentInput;
    }

    if ((!isNaN(Number(input)) || input === '-'
        || (input === '.' && !this.currentInput.includes('.')))
        && this.currentInput.length <= 10) {
      this.currentInput = this.currentInput + input;
    }

    return this.currentInput;
  }

  public clear(): string {
    this.currentInput = '';
    return this.currentInput;
  }

  public clearEverything(): string {
    this.lastCalculation = undefined;
    this.currentInput = '';
    return this.currentInput;
  }

  public removeLast(): string {
    if (this.currentInput.length > 0) {
      this.currentInput = this.currentInput.slice(0, -1);
      return this.currentInput;
    } else {
      return this.lastCalculation!.getResult().toString();
    }
  }
}
