/*const zeroBtn = document.getElementById('zeroBtn');
const oneBtn = document.getElementById('oneBtn');
const twoBtn = document.getElementById('twoBtn');
const threeBtn = document.getElementById('threeBtn');
const fourBtn = document.getElementById('fourBtn');
const fiveBtn = document.getElementById('fiveBtn');
const sixBtn = document.getElementById('sixBtn');
const sevenBtn = document.getElementById('sevenBtn');
const eightBtn = document.getElementById('eightBtn');
const nineBtn = document.getElementById('nineBtn');
const plusBtn = document.getElementById('plusBtn');
const equalsBtn = document.getElementById('equalsBtn');
const minusBtn = document.getElementById('minusBtn');
const divisionBtn = document.getElementById('divisionBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const dotBtn = document.getElementById('dotBtn');
const percentBtn = document.getElementById('dotBtn');
const plusMinusBtn = document.getElementById('plusMinusBtn');
const acBtn = document.getElementById('acBtn');
const calcDisplay = document.getElementById('calcDisplay');

const screen = document.getElementById('calcDisplay');

let operatorPlus = "+"
let operatorMinus = "-"
let operatorMultiply = "*"
let operatorDivision = "/"
let operatorPercent = "%"
let operatorDot = "."
let operatorPlusMinus = "+/-"
let currentNumber = ""
let previousNumber = ""
let currentOperator = ""
let previousOperator = ""
let decimal = false
let plusMinus = false
let result = 0
let previousResult = 0
// writing a calculator application with the numbers zero through nine as buttons and the output is appended to a 
// <p></p> node in html
// the buttons are assigned to variables and the event listeners are added to each button
zeroBtn.addEventListener('click', function(){
    currentNumber += "0"
    calcDisplay.textContent = currentNumber
});
    
oneBtn.addEventListener('click', function(){
    currentNumber += "1"
    calcDisplay.textContent = currentNumber
});

twoBtn.addEventListener('click', function() {
    currentNumber += "2"
    calcDisplay.textContent = currentNumber
});*/

// Get the display element
const display = document.getElementById('calcDisplay');

// Initialize the display value
let currentValue = '0';

// Add event listeners to each button
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const buttonText = event.target.textContent;
    handleButtonPress(buttonText);
  });
});

// Function to handle button presses
function handleButtonPress(buttonText) {
  switch (buttonText) {
    case 'ac':
      // Clear the display
      currentValue = '0';
      break;
    case '+/-':
      // Toggle the sign of the current value
      currentValue = currentValue * -1;
      break;
    case '%':
      // Calculate the percentage of the current value
      currentValue = currentValue / 100;
      break;
    case '=':
      // Evaluate the expression and display the result
      try {
        currentValue = eval(currentValue);
      } catch (error) {
        currentValue = 'Error';
      }
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      // Append the operator to the current value
      currentValue += buttonText;
      break;
    default:
      // Append the digit to the current value
      if (currentValue === '0') {
        currentValue = buttonText;
      } else {
        currentValue += buttonText;
      }
  }
  updateDisplay();
}

// Function to update the display
function updateDisplay() {
  display.textContent = currentValue;
}
