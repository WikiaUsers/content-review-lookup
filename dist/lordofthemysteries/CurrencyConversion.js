// Conversion function
window.convertCurrency = function convertCurrency() {
  var amount = parseFloat(document.getElementById("amount").value);
  var fromCurrency = document.getElementById("fromCurrency").value;
  var toCurrency = document.getElementById("toCurrency").value;

  // Conversion rates
            var poundToSoli = 20;
            var poundToPenny = 1 / 240;
            var poundToVerl = 24;
            var poundToCoppet = 2400;
            var poundToLick = 500;
            var poundToLouis = 1 / 83.33;
            var soliToPenny = 12;
            var verlToLick = 500;
            var lickToVerl = 1 / 500;
            var coppetToLick = 1 / 5;
            var louisToLick = 400;
            var louisToCoppet = 2000;
            var louisToVerl = 20;
            var coppetToLouis = 1 / 2000;
            var coppetToPound = 1 / 2400;
            var verlToLouis = 1 / 20;
            var verlToCoppet = 1 / 100;
            var risotToVerl = 2;
		    var risotToPound = 1 / 12;
		    var settaToRisot = 10;
		    var deganToRisot = 100;

            var result;

            if (fromCurrency === "Pound" && toCurrency === "Pound") {
                result = "-";
            } else if (fromCurrency === "Soli" && toCurrency === "Soli") {
                result = "-";
            } else if (fromCurrency === "Penny" && toCurrency === "Penny") {
                result = "-";
            } else if (fromCurrency === "Verl d'or" && toCurrency === "Verl d'or") {
                result = "-";
            } else if (fromCurrency === "Coppet" && toCurrency === "Coppet") {
                result = "-";
            } else if (fromCurrency === "Lick" && toCurrency === "Lick") {
                result = "-";
            } else if (fromCurrency === "Louis d'or" && toCurrency === "Louis d'or") {
                result = "-";
            } else if (fromCurrency === "Pound" && toCurrency === "Verl d'or") {
                result = amount * poundToVerl;
            } else if (fromCurrency === "Verl d'or" && toCurrency === "Pound") {
                result = amount / poundToVerl;
            } else if (fromCurrency === "Pound" && toCurrency === "Soli") {
                result = amount * poundToSoli;
            } else if (fromCurrency === "Soli" && toCurrency === "Pound") {
                result = amount / poundToSoli;
            } else if (fromCurrency === "Soli" && toCurrency === "Penny") {
                result = amount * soliToPenny;
            } else if (fromCurrency === "Penny" && toCurrency === "Soli") {
                result = amount / soliToPenny;
            } else if (fromCurrency === "Verl d'or" && toCurrency === "Coppet") {
                result = amount / verlToCoppet;
            } else if (fromCurrency === "Coppet" && toCurrency === "Verl d'or") {
                result = amount * verlToCoppet;
            } else if (fromCurrency === "Coppet" && toCurrency === "Lick") {
                result = amount * coppetToLick;
            } else if (fromCurrency === "Lick" && toCurrency === "Coppet") {
                result = amount / coppetToLick;
            } else if (fromCurrency === "Louis d'or" && toCurrency === "Verl d'or") {
                result = amount * louisToVerl;
            } else if (fromCurrency === "Verl d'or" && toCurrency === "Louis d'or") {
                result = amount * verlToLouis;
            } else if (fromCurrency === "Pound" && toCurrency === "Lick") {
                result = amount * poundToLick;
            } else if (fromCurrency === "Lick" && toCurrency === "Pound") {
                result = amount / poundToLick;
            } else if (fromCurrency === "Penny" && toCurrency === "Pound") {
                result = amount * poundToPenny;
            } else if (fromCurrency === "Pound" && toCurrency === "Penny") {
                result = amount / poundToPenny;
            } else if (fromCurrency === "Pound" && toCurrency === "Coppet") {
            result = amount * poundToCoppet;
            } else if (fromCurrency === "Coppet" && toCurrency === "Pound") {
            result = amount * coppetToPound;
            } else if (fromCurrency === "Pound" && toCurrency === "Louis d'or") {
                result = amount / poundToLouis;
            } else if (fromCurrency === "Louis d'or" && toCurrency === "Pound") {
                result = amount * poundToLouis;
            } else if (fromCurrency === "Verl d'or" && toCurrency === "Lick") {
                result = amount * verlToLick;
            } else if (fromCurrency === "Lick" && toCurrency === "Verl d'or") {
                result = amount * lickToVerl;
            } else if (fromCurrency === "Louis d'or" && toCurrency === "Lick") {
                result = amount * louisToLick;
            } else if (fromCurrency === "Lick" && toCurrency === "Louis d'or") {
                result = amount * louisToLick;
            } else if (fromCurrency === "Louis d'or" && toCurrency === "Coppet") {
                result = amount * louisToCoppet;
            } else if (fromCurrency === "Coppet" && toCurrency === "Louis d'or") {
                result = amount * coppetToLouis;
            } else if (fromCurrency === "Risot" && toCurrency === "Verl d'or") {
			    result = amount * risotToVerl;
			} else if (fromCurrency === "Verl d'or" && toCurrency === "Risot") {
			    result = amount / risotToVerl;
			} else if (fromCurrency === "Risot" && toCurrency === "Pound") {
			    result = amount * risotToPound;
			} else if (fromCurrency === "Pound" && toCurrency === "Risot") {
			    result = amount / risotToPound;
			} else if (fromCurrency === "Setta" && toCurrency === "Risot") {
			    result = amount * settaToRisot;
			} else if (fromCurrency === "Risot" && toCurrency === "Setta") {
			    result = amount / settaToRisot;
			} else if (fromCurrency === "Degan" && toCurrency === "Risot") {
			    result = amount * deganToRisot;
			} else if (fromCurrency === "Risot" && toCurrency === "Degan") {
			    result = amount / deganToRisot;
			} else {
			    result = "Invalid conversion";
			}

    document.getElementById("result").value = result === "-" ? result : result.toFixed(2);
};

// Reset function
window.resetFields = function resetFields() {
  document.getElementById("amount").value = "";
  document.getElementById("result").value = "";
  document.getElementById("fromCurrency").value = "Pound";
  document.getElementById("toCurrency").value = "Verl d'or";
};

// Create the currency converter's user interface.
$(function () {
    if ($('#currency-converter').length) {  
document.getElementById("currency-converter").innerHTML =
  '<input type="number" id="amount" placeholder="Amount" size="6">' +
  '<select id="fromCurrency">' +
  '<optgroup label="Loen Kingdom">' +
  '<option value="Pound" selected="selected">Pound(s)</option>' +
  '<option value="Soli">Soli</option>' +
  '<option value="Penny">Penny</option>' +
  "</optgroup>" +
  '<optgroup label="Intis Kingdom">' +
  '<option value="Verl d\'or">Verl d\'or</option>' +
  '<option value="Coppet">Coppet(s)</option>' +
  '<option value="Lick"> -- Lick(s)</option>' +
  '<option value="Louis d\'or"> -- Louis d\'or</option>' +
  "</optgroup>" +
  '<optgroup label="Feynapotter Kingdom">' +
  '<option value="Risot">Risot</option>' +
  '<option value="Setta">Setta</option>' +
  '<option value="Degan">Degan</option>' +
  "</optgroup>" +
  "</select>" +
  "<br>" +
  '<input type="number" id="result" readonly placeholder="Result" size="6">' +
  '<select id="toCurrency">' +
  '<optgroup label="Loen Kingdom">' +
  '<option value="Pound">Pound(s)</option>' +
  '<option value="Soli">Soli</option>' +
  '<option value="Penny">Penny</option>' +
  "</optgroup>" +
  '<optgroup label="Intis Kingdom">' +
  '<option value="Verl d\'or" selected="selected">Verl d\'or</option>' +
  '<option value="Coppet">Coppet(s)</option>' +
  '<option value="Lick"> -- Lick(s)</option>' +
  '<option value="Louis d\'or"> -- Louis d\'or</option>' +
  "</optgroup>" +
  '<optgroup label="Feynapotter Kingdom">' +
  '<option value="Risot">Risot</option>' +
  '<option value="Setta">Setta</option>' +
  '<option value="Degan">Degan</option>' +
  "</optgroup>" +
  "</select>" +
  "<br>" +
  '<button onclick="convertCurrency()" title="Convert">Convert</button>' +
  '<button onclick="resetFields()" title="Reset">Reset</button>';
}
});