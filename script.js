/*
"Author": "Steven Rugg",
"Description": "iOS Calculator replica using only CSS3, HTML5 and vanilla javascript. It's amazing the things a little imagination can create!",
"Liscense": "MIT",
"URL": "http://github.com/stevenrugg/iOSCalculator"
"Warning": "** This software is free to use, distribute, alter, change or upgrade for free as long as its use is NON COMMERCIAL. Please leave the attribution and this comment. **WARNING! WARNING! WARNING! This software uses eval(). DO NOT run it in a production environmnent! It is not secure. WARNING! WARNING! WARNING!"
*/


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
    case 'x'.replace(/x/g, "*"):
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
