import Calculator from './calculator';

export default class CalculatorUI {

  private calculator: Calculator;
  private screen: HTMLInputElement;
  private clearButton: HTMLButtonElement;

  constructor() {
    this.calculator = new Calculator();

    this.screen = document.createElement('input');
    this.screen.type = 'text';
    this.screen.classList.add('calculator-screen');
    this.screen.classList.add('z-depth-1');
    this.screen.value = '';
    this.screen.disabled = true;

    this.clearButton = this.createButton('clear', 'CE', ['btn-danger', 'disabled'], () => this.clearClicked());

    this.createCalculatorUI();
  }

  private createCalculatorUI(): void {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.classList.add('calculator');

    const removeCalculatorButton = document.createElement('button');
    removeCalculatorButton.classList.add('btn');
    removeCalculatorButton.classList.add('btn-danger');
    removeCalculatorButton.classList.add('remove-calculator-button');
    removeCalculatorButton.innerText = '-';
    removeCalculatorButton.onclick = () => calculatorDiv.remove();

    calculatorDiv.append(removeCalculatorButton);
    calculatorDiv.append(this.screen);
    calculatorDiv.append(this.createButtons());

    document.body.append(calculatorDiv)
  }

  private createButtons(): HTMLDivElement {
    const calculatorButtonsDiv = document.createElement('div');
    calculatorButtonsDiv.classList.add('calculator-keys');

    calculatorButtonsDiv.append(this.createButton('+', '+', ['btn-info', 'operator'], () => this.operatorClicked('+')));
    calculatorButtonsDiv.append(this.createButton('-', '-', ['btn-info', 'operator'], () => this.operatorClicked('-')));
    calculatorButtonsDiv.append(this.createButton('*', '&times;', ['btn-info', 'operator'], () => this.operatorClicked('*')));
    calculatorButtonsDiv.append(this.createButton('/', '&divide;', ['btn-info', 'operator'], () => this.operatorClicked('/')));

    for (let input of ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']) {
      calculatorButtonsDiv.append(this.createButton(input, input, ['btn-light'], () => this. inputClicked(input)));
    }
    
    calculatorButtonsDiv.append(this.createButton('.', '.', ['btn-secondary'], () => this.inputClicked('.')));
    calculatorButtonsDiv.append(this.clearButton);
    calculatorButtonsDiv.append(this.createButton('=', '=', ['equal-sign', 'btn-secondary'], () => this.equalsClicked()));

    return calculatorButtonsDiv;
  }

  private createButton(value: string, innerHTML: string, classList: string[], onclickFunction: Function): HTMLButtonElement {
    const button = document.createElement('button');

    button.value = value;
    button.innerHTML = innerHTML;
    button.classList.add('btn');
    classList.forEach((className) => {
      button.classList.add(className);
    })
    button.addEventListener('click', () => {
      onclickFunction();
    })

    return button;
  }
  
  private operatorClicked(operator: string): void {
    this.setScreen(this.calculator.operator(operator));
  }
  
  private clearClicked(): void {
    if (this.clearButton.textContent === 'C') {
      this.screen.value = this.calculator.clear();
      this.clearButton.textContent = 'CE';
    } else {
      this.screen.value = this.calculator.clearEverything();
      this.clearButton.classList.add('disabled');
    }
  }
  
  private equalsClicked(): void {
    this.setScreen(this.calculator.equals());
  }
  
  private inputClicked(input: string): void {
    this.screen.value = this.calculator.input(input);
    if (this.screen.value) {
      this.clearButton.textContent = 'C';
      this.clearButton.classList.remove('disabled');
    }
  }

  private setScreen(value: string): void {
    this.screen.value = value.toString().length > 11 ? Number(value).toExponential(6) : value;
  }
}
