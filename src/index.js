import './styles.css';
import CalculatorUI from './calculator-ui.js';

addNewCalculatorButton();
new CalculatorUI();

function addNewCalculatorButton() {
  const newCalculatorButton = document.createElement('button');
  newCalculatorButton.classList = 'btn btn-info new-calculator-button';
  newCalculatorButton.innerText = '+';
  newCalculatorButton.onclick = () => new CalculatorUI();
  document.body.append(newCalculatorButton);
}
