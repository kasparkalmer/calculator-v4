import Calculator from './calculator.js';

export default class CalculatorUI {
  constructor() {
    this.calculator = new Calculator();

    this.screen = document.createElement('input');
    this.clearButton = this.createButton('clear', 'CE', 'btn-danger disabled', () => this.clearClicked());

    this.createCalculatorUI();
  }

  createCalculatorUI() {
    this.screen.type = 'text';
    this.screen.classList = 'calculator-screen z-depth-1';
    this.screen.value = '';
    this.screen.disabled = true;

    const calculatorDiv = document.createElement('div');
    calculatorDiv.classList.add('calculator');

    const removeCalculatorButton = document.createElement('button');
    removeCalculatorButton.classList = 'btn btn-danger remove-calculator-button';
    removeCalculatorButton.innerText = '-';
    removeCalculatorButton.onclick = () => calculatorDiv.remove();

    calculatorDiv.append(removeCalculatorButton);
    calculatorDiv.append(this.screen);
    calculatorDiv.append(this.createButtons());

    document.body.append(calculatorDiv)
  }

  createButtons() {
    const calculatorButtonsDiv = document.createElement('div');
    calculatorButtonsDiv.classList.add('calculator-keys');

    calculatorButtonsDiv.append(this.createButton('+', '+', 'btn-info operator', () => this.operatorClicked('+')));
    calculatorButtonsDiv.append(this.createButton('-', '-', 'btn-info operator', () => this.operatorClicked('-')));
    calculatorButtonsDiv.append(this.createButton('*', '&times;', 'btn-info operator', () => this.operatorClicked('*')));
    calculatorButtonsDiv.append(this.createButton('/', '&divide;', 'btn-info operator', () => this.operatorClicked('/')));

    for (let input of ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']) {
      calculatorButtonsDiv.append(this.createButton(input, input, 'btn-light', () => this. inputClicked(input)));
    }
    
    calculatorButtonsDiv.append(this.createButton('.', '.', 'btn-secondary', () => this.inputClicked('.')));
    calculatorButtonsDiv.append(this.clearButton);
    calculatorButtonsDiv.append(this.createButton('=', '=', 'equal-sign btn-secondary', () => this.equalsClicked()));

    return calculatorButtonsDiv;
  }

  createButton(value, innerHTML, classList, onclickFunction) {
    const button = document.createElement('button');

    button.value = value;
    button.innerHTML = innerHTML;
    button.classList = classList;
    button.classList.add('btn');
    button.onclick = onclickFunction;

    return button;
  }
  
  operatorClicked(operator) {
    this.setScreen(this.calculator.operator(operator));
  }
  
  clearClicked() {
    if (this.clearButton.textContent === 'C') {
      this.screen.value = this.calculator.clear();
      this.clearButton.textContent = 'CE';
    } else {
      this.screen.value = this.calculator.clearEverything();
      this.clearButton.classList.add('disabled');
    }
  }
  
  backspaceClicked() {
    this.screen.value = this.calculator.removeLast();
  }
  
  equalsClicked() {
    this.setScreen(this.calculator.equals());
  }
  
  inputClicked(input) {
    this.screen.value = this.calculator.input(input);
    if (this.screen.value) {
      this.clearButton.textContent = 'C';
      this.clearButton.classList.remove('disabled');
    }
  }

  setScreen(value) {
    this.screen.value = value.toString().length > 11 ? value.toExponential(6) : value;
  }
}
