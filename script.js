// Get the display element
const display = document.getElementById('calcDisplay');

// Initialize the display value
let currentValue = '0';
let previousValue = '';
let operator = '';
let resetNext = false; // Flag to reset input after "="

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
  if (resetNext) {
    // If resetNext is true, start a fresh calculation
    currentValue = number;
    resetNext = false;
  } else {
    // Append the number or decimal point
    if (currentValue === '0') {
      currentValue = number;
    } else {
      currentValue += number;
    }
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
      resetNext = false;
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
      // Perform calculation and prepare to reset for the next input
      try {
        if (operator) {
          previousValue = performCalculation();
          currentValue = previousValue;
          operator = '';
          resetNext = true; // Set reset flag so next input starts a new calculation
        }
      } catch (error) {
        currentValue = 'Error';
      }
      break;
    case '+':
    case '-':
    case '/':
    case 'x':
      // Perform calculation first if an operator already exists
      if (operator && !resetNext) {
        previousValue = performCalculation();
        currentValue = previousValue;
      }
      // Set operator and prepare for next number
      operator = operatorText === 'x' ? '*' : operatorText; // Replace 'x' with '*'
      previousValue = currentValue;
      currentValue = '';
      resetNext = false; // Don't reset after operator press
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
