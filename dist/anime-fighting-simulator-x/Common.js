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
  var inputElementsLength = inputElements.length;
    
  // Loop through input elements to gather attributes and fields
  for (var i = 0; i < inputElementsLength; i++) {
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
    for (var i = 0; i < inputElementsLength; i++) {
      var inputElement = inputElements[i];
      var variable = inputElement.getAttribute('data-variable');
      var inputField = inputElement.querySelector('input');
      var inputValue = parseFloat(inputField.value) || 0;
      
      var FieldMin = inputField.min; // Set minimum value
      var FieldMax = inputField.max;

      // Input validation: Restricting range to (1-150)
      if (inputValue < FieldMin & inputValue != "") {
        inputValue = FieldMin;
      } else if (inputValue > FieldMax) {
        inputValue = FieldMax;
      }
      if (inputValue == "") {
         inputField.value = "";
         values[variable] = FieldMin;
      } else {
         inputField.value = inputValue; // Update input value
         values[variable] = inputValue;
      }
    }

    // Loop through output elements and calculate results
    outputElementsLength = outputElements.length;
    for (var j = 0; j < outputElementsLength; j++) {
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
        outputElement.innerHTML = formatNumber(result);
      } catch (error) {
        outputElement.innerHTML = formatNumber(values[variable]) || 'Formula Error'; // Use validated value or "Formula Error"
      }
    }
  }

  // Set up event handlers for input elements
  for (var k = 0; k < inputElementsLength; k++) {
    var inputElement = inputElements[k];
    var FieldMin = inputElement.getAttribute('data-FieldMin') || 1;
    var FieldMax = inputElement.getAttribute('data-FieldMax') || 1;
    var inputField = document.createElement('input');
    inputField.placeholder = FieldMin;
    inputField.defaultValue = FieldMin;
    inputField.type = 'number'; // Set input type to "number"
    inputField.min = FieldMin; // Set minimum value
    inputField.max = FieldMax; // Set maximum value
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
	calculatorElementsLength = calculatorElements.length;
  for (var l = 0; l < calculatorElementsLength; l++) {
    initializeCalculator(calculatorElements[l]);
  }
}




function formatNumber(num) {
  if (num < 30) {
	  var formattedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num);
	  var parts = formattedNumber.split('.');
	  var integerPart = parts[0];
	  var decimalPart = parts[1];
	
	  if (decimalPart !== undefined) {
	    return integerPart + '.<small>' + decimalPart + '</small>';
	  } else {
	    return formattedNumber;
	  }
  } else {
	  return parseInt(num);
  }
}