import Calculation from "./calculation.js";

export default class Calculator {
  constructor() {
    this.lastCalculation = undefined;
    this.currentInput = '';
    this.waitingForInput = true;
  }

  operator(operator) {
    if (operator === '-' && this.waitingForInput) {
      return this.input(operator);
    } else if (!isNaN(this.currentInput)) {
      return this.newCalculation(operator);
    }
  }

  newCalculation(operator) {
    if (isNaN(this.currentInput)) {
      return this.currentInput;
    }

    if (this.lastCalculation && this.lastCalculation.operand2) {
      this.lastCalculation = new Calculation(this.lastCalculation, operator);
      this.lastCalculation.operand2 = this.currentInput;
    } else if (this.lastCalculation) {
      this.lastCalculation.operand2 = this.currentInput;
      this.lastCalculation = new Calculation(this.lastCalculation, operator);
    } else {
      this.lastCalculation = new Calculation(this.currentInput, operator);
    }

    this.currentInput = '';
    this.waitingForInput = true;
    return this.lastCalculation.getResult();
  }

  equals() {
    if (this.lastCalculation.operand2) {
      const newCalculation = new Calculation(this.lastCalculation, this.lastCalculation.operator);
      newCalculation.operand2 = this.lastCalculation.operand2;
      this.lastCalculation = newCalculation;
    } else {
      this.lastCalculation.operand2 = this.currentInput;
      this.currentInput = '';
    }
    return this.lastCalculation.getResult();
  }

  input(input) {
    if (this.waitingForInput) {
      this.waitingForInput = false;
    }

    if (input === '0' && (this.currentInput === '0' || this.currentInput === '-0')) {
      return this.currentInput;
    }

    if ((!isNaN(input) || input === '-'
        || (input === '.' && !this.currentInput.includes('.')))
        && this.currentInput.length <= 10) {
      this.currentInput = this.currentInput + input;
    }

    return this.currentInput;
  }

  clear() {
    this.currentInput = '';
    return this.currentInput;
  }

  clearEverything() {
    this.lastCalculation = undefined;
    this.currentInput = '';
    return this.currentInput;
  }

  removeLast() {
    const inputLength = this.currentInput.length

    if (inputLength) {
      this.currentInput = this.currentInput.substr(0, inputLength - 1);
      return this.currentInput;
    }

    return this.lastCalculation.getResult();
  }
}
