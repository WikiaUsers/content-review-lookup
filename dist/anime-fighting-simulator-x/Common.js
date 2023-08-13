// Function to check for the presence of dangerous code in a formula
function hasDangerousCode(formula) {
  // Regular expression to check for dangerous code
  var dangerousRegex = /alert\(|prompt\(|confirm\(|<script>/i;

  return dangerousRegex.test(formula);
}

// Function to initialize calculators
function initializeCalculator(calculatorElement) {
  // Select input and output elements within the calculator
  var inputElements = calculatorElement.querySelectorAll('.calculator_input');
  var outputElements = calculatorElement.querySelectorAll('.calculator_output');

  var inputAttributes = [];
  var inputFields = [];

  // Loop through input elements to gather attributes and fields
  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    var variable = inputElement.getAttribute('data-variable');
    var inputField = inputElement.querySelector('input');
    
    inputAttributes.push(variable);
    inputFields.push(inputField);
  }
   
  // Function to evaluate formulas
  function evaluateFormulas() {
    var values = {}; // Stores user input values

    // Loop through input elements to retrieve values
    for (var i = 0; i < inputElements.length; i++) {
      var inputElement = inputElements[i];
      var variable = inputElement.getAttribute('data-variable');
      var inputField = inputElement.querySelector('input');
      var inputValue = parseFloat(inputField.value) || 0;

      // Input validation: Restricting range to (1-150)
      if (inputValue < 1 & inputValue != "") {
        inputValue = 1;
      } else if (inputValue > 150) {
        inputValue = 150;
      }
      if (inputValue == "") {
         inputField.value = "";
         values[variable] = 1;
      } else {
         inputField.value = inputValue; // Update input value
         values[variable] = inputValue;
      }
    }

    // Loop through output elements and calculate results
    for (var j = 0; j < outputElements.length; j++) {
      var outputElement = outputElements[j];
      var formula = outputElement.getAttribute('data-formula');

      // Check for dangerous code before evaluating the formula
      if (hasDangerousCode(formula)) {
        outputElement.textContent = 'Formula contains dangerous code.';
        return;
      }

      // Replace variables in formula and calculate result
      try {
        var result = eval(formula.replace(/\b\w+\b/g, function (match) {
          return values[match] || match;
        }));
        outputElement.textContent = result;
      } catch (error) {
        outputElement.textContent = values[variable] || 'Formula Error'; // Use validated value or "Formula Error"
      }
    }
  }

  // Set up event handlers for input elements
  for (var k = 0; k < inputElements.length; k++) {
    var inputElement = inputElements[k];
    var inputField = document.createElement('input');
    inputField.placeholder = '1';
    inputField.defaultValue = '1';
    inputField.type = 'number'; // Set input type to "number"
    inputField.min = 1; // Set minimum value
    inputField.max = 150; // Set maximum value
    inputField.step = 1; // Set step
    inputElement.appendChild(inputField);

    // Set up input event listener to update formulas
    inputField.addEventListener('input', evaluateFormulas);
  }

  // Initial calculation
  evaluateFormulas();
}

// Initialize calculators on the page
var calculatorElements = document.querySelectorAll('.calculator');

if (calculatorElements.length > 0) {
  for (var l = 0; l < calculatorElements.length; l++) {
    var calculatorElement = calculatorElements[l];
    initializeCalculator(calculatorElement);
  }
}