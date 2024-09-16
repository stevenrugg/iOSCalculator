// Get the display element
const display = document.getElementById('calcDisplay');

// Initialize the display value
let currentValue = '0';
let previousValue = '';
let operator = '';

// Add event listeners to each button
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const buttonText = event.target.textContent;
    handleButtonPress(buttonText);
  });
});

// Function to handle button presses
function handleButtonPress(buttonText) {
  // Check if buttonText is a number or a decimal point
  if (!isNaN(buttonText) || buttonText === '.') {
    handleNumber(buttonText);
  } else {
    handleOperator(buttonText);
  }
  updateDisplay();
}

// Handle number or decimal input
function handleNumber(number) {
  if (currentValue === '0') {
    currentValue = number;
  } else {
    currentValue += number;
  }
}

// Handle operator input
function handleOperator(operatorText) {
  switch (operatorText) {
    case 'ac':
      // Clear everything
      currentValue = '0';
      previousValue = '';
      operator = '';
      break;
    case '+/-':
      // Toggle the sign of the current value
      currentValue = (parseFloat(currentValue) * -1).toString();
      break;
    case '%':
      // Convert the current value to a percentage
      currentValue = (parseFloat(currentValue) / 100).toString();
      break;
    case '=':
      // Perform calculation
      try {
        if (operator) {
          previousValue = performCalculation();
          currentValue = previousValue;
          operator = '';
        }
      } catch (error) {
        currentValue = 'Error';
      }
      break;
    case '+':
    case '-':
    case '/':
    case 'x':
      // If there's already an operator, perform the current calculation first
      if (operator) {
        previousValue = performCalculation();
        currentValue = previousValue;
      }
      // Set the operator and save the current value
      operator = operatorText === 'x' ? '*' : operatorText; // Replace 'x' with '*'
      previousValue = currentValue;
      currentValue = '';
      break;
  }
}

// Perform the calculation
function performCalculation() {
  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return 'Error';

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error'; // Handle division by zero
      break;
    default:
      return currentValue;
  }
  return result.toString();
}

// Function to update the display
function updateDisplay() {
  display.textContent = currentValue;
}