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
      currentValue = (parseFloat(currentValue) * -1).toString();
      break;
    case '%':
      // Calculate the percentage of the current value
      currentValue = (parseFloat(currentValue) / 100).toString();
      break;
    case '=':
      // Evaluate the expression and display the result
      try {
        // Replace 'x' with '*' before evaluating
        currentValue = currentValue.replace(/x/g, '*');
        currentValue = eval(currentValue).toString();
      } catch (error) {
        currentValue = 'Error';
      }
      break;
    
    case '+':
    case '-':
    case '/':
      // Append the operator to the current value
      currentValue += buttonText;
      break;

    case 'x':
      // Append the '*' instead of 'x' for multiplication
      currentValue += '*';
      break;

    default:
      // Append the digit or decimal point to the current value
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