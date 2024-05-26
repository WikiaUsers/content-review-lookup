function createFormula(containerId, formulaNumber) {
    var container = document.getElementById(containerId);
    
    var formulaDiv = document.createElement('div');
    formulaDiv.classList.add('formula');

    var inputDiv = document.createElement('div');
    
    var inputRange = document.createElement('input');
    inputRange.type = 'range';
    inputRange.min = '0';
    inputRange.max = '120';
    inputRange.value = '0'; 

    var inputValue = document.createElement('input');
    inputValue.type = 'text';
    inputValue.placeholder = 'Minutes';

    var resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    container.appendChild(formulaDiv);
    formulaDiv.appendChild(inputValue);
    formulaDiv.appendChild(inputDiv);
    inputDiv.appendChild(inputRange);
    formulaDiv.appendChild(document.createElement('br'));
    formulaDiv.appendChild(resultDiv);

    calculateResult(inputRange.value, resultDiv, formulaNumber);

    inputRange.addEventListener('input', function() {
        inputValue.value = inputRange.value;
        calculateResult(inputRange.value, resultDiv, formulaNumber);
    });

    inputValue.addEventListener('input', function() {
        inputRange.value = inputValue.value;
        calculateResult(inputValue.value, resultDiv, formulaNumber);
    });
}

function calculateResult(value, resultDiv, formulaNumber) {
    var totalCoin = 0;

    if (formulaNumber === 1) {
        var m = 1;
        for (var i = 0; i <= value; i++) {
            if (m === 1.5) {
                m = m;
            } else if (Math.floor(i / 9)) {
                m = 1 + (0.1 * Math.floor(i / 9));
            }
            if (i % 2) {
                var coin_s = 10 * m;
                totalCoin += coin_s;
            }
        }
        resultDiv.textContent = 'Total Coins: ' + totalCoin;
    } else if (formulaNumber === 2) {
        for (var i = 0; i <= value; i++) {
            if (i % 2) {
                totalCoin += 5;
            }
        }
        resultDiv.textContent = 'Total Coins: ' + totalCoin;
    }
}

if (document.getElementById('formula1Container')) {
    createFormula('formula1Container', 1);
}

if (document.getElementById('formula2Container')) {
    createFormula('formula2Container', 2);
}