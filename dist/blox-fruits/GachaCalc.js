function createFormula(containerId, formulaNumber) {
    var container = document.getElementById(containerId);
    
    var formulaDiv = document.createElement('div');
    formulaDiv.classList.add('formula');

    var inputRange = document.createElement('input');
    inputRange.type = 'number';
    inputRange.min = '0';
    inputRange.max = '2550';
    inputRange.value = '50'; 
    inputRange.placeholder = 'Player Level';

    var resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    container.appendChild(formulaDiv);
    formulaDiv.appendChild(inputRange);
    formulaDiv.appendChild(document.createElement('br'));
    formulaDiv.appendChild(resultDiv);

    calculateResult(inputRange.value, resultDiv, formulaNumber);

    inputRange.addEventListener('input', function() {
        var value = parseInt(inputRange.value);
        if (isNaN(value)) {
            value = 0;
        } else if (value < 0) {
            value = 0;
        } else if (value > 2550) {
            value = 2550;
        }
        inputRange.value = value;
        calculateResult(value, resultDiv, formulaNumber);
    });
}

function calculateResult(value, resultDiv, formulaNumber) {
    var result = 0;
    if (value < 50) {
        result = 0;
        resultDiv.textContent = 'Level is too low!';
    }
    if (value > 49 && value < 2551) {
        if (formulaNumber === 1) {
            result = (value - 1) * 150 + 25000;
        } else if (formulaNumber === 2) {
            result = (value - 1) * 120 + 20000;
        }
    resultDiv.textContent = 'Cost: ';
    var spanElement = document.createElement('span');
    spanElement.textContent = "$ " + result.toLocaleString('en-US');
    spanElement.classList.add("Currency_Money");
    resultDiv.appendChild(spanElement);
    }

}

if (document.getElementById('gachaNormal')) {
    createFormula('gachaNormal', 1);
}

if (document.getElementById('gachaPremium')) {
    createFormula('gachaPremium', 2);
}