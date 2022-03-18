import './styles.css';
import CalculatorUI from './calculator-ui';

addNewCalculatorButton();
new CalculatorUI();

function addNewCalculatorButton(): void {
  const newCalculatorButton = document.createElement('button');
  newCalculatorButton.classList.add('btn');
  newCalculatorButton.classList.add('btn-info');
  newCalculatorButton.classList.add('new-calculator-button');
  newCalculatorButton.innerText = '+';
  newCalculatorButton.onclick = () => new CalculatorUI();
  document.body.append(newCalculatorButton);
}
