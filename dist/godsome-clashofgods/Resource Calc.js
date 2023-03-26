console.log("success load");
var dataJson = {
    "food": [1000, 10000, 50000, 100000, 150000, 500000, 1500000, 5000000],
    "wood": [1000, 10000, 50000, 100000, 150000, 500000, 1500000, 5000000],
    "stone": [750, 7500, 37500, 75000, 112500, 375000, 1125000, 3750000],
    "gold": [500, 3000, 15000, 50000, 200000, 600000, 2000000],
    "chaosGem": [5, 10, 50, 100, 200, 500, 1000, 2000, 3000, 5000],
    "vipPoint": [5, 10, 50, 100, 200, 500, 1000, 5000],
    "actionPoint": [50, 100, 500, 1000],
};

//make Result Section
function makeResultDiv() {
    var resourceTitle = document.createElement('h2');
    resourceTitle.appendChild(document.createTextNode("재화"));
    var resultDiv = document.createElement('div');
    
    for (var resourceName in dataJson) {
        var resultItemDiv = document.createElement('div');
        var resourceKey = document.createElement('p');
        resourceKey.appendChild(document.createTextNode(resourceName));
        var resultInput = document.createElement('input');
        resultInput.id = resourceName + "Result";
        resultInput.className = "devResultInput";
        resultInput.value = 0;
        resultInput.readOnly = true;

        resultItemDiv.appendChild(resourceKey);
        resultItemDiv.appendChild(resultInput);
        resultDiv.appendChild(resultItemDiv);
    }
    var resetButtonDiv = document.createElement('div');
    var resetButton = document.createElement('button');
    resetButton.id = "devResetAllButton";
    resetButton.appendChild(document.createTextNode("RESET ALL"));
    
    resetButtonDiv.appendChild(resetButton);
    
    resultDiv.style.display = "flex";
    resultDiv.appendChild(resetButtonDiv);

    document.getElementById('devCalcInputDiv').appendChild(resourceTitle);
    document.getElementById('devCalcInputDiv').appendChild(resultDiv);
}

//make calc Section
function makeCalcSection() {
    for (var resourceName in dataJson) {
        var mainDiv = document.createElement('div');
        var mainName = document.createElement('p');
        var mainNameText = document.createTextNode(resourceName);
        mainName.appendChild(mainNameText);
        mainDiv.appendChild(mainName);

        var calcMainDiv = document.createElement('div');
        for (var valueItem in dataJson[resourceName]) {
            var value = dataJson[resourceName][valueItem];

            var calcItemDiv = document.createElement('div');
            var valueName = document.createElement('p');
            var valueText = document.createTextNode(value);
            var resourceImg = document.createElement('img');
            var valueCalcInput = document.createElement('input');
            valueCalcInput.type = "number";
            valueCalcInput.style.width = "40px";
            valueCalcInput.min = 0;
            valueCalcInput.value = 0;
            valueCalcInput.className = "devCalcInput";
            valueCalcInput.id = resourceName + '_' + valueItem;

            valueName.appendChild(valueText);

            calcItemDiv.appendChild(valueName);
            calcItemDiv.appendChild(resourceImg);
            calcItemDiv.appendChild(valueCalcInput);

            calcItemDiv.className = "devCalcItem";

            calcMainDiv.appendChild(calcItemDiv);
        }
        calcMainDiv.style.display = "flex";
        mainDiv.appendChild(calcMainDiv);
        document.getElementById('devCalcInputDiv').appendChild(mainDiv);
    }
}

function setEvent() {
    document.getElementById('devResetAllButton').onclick = function(e) {
        var devCalcInput = document.querySelectorAll('.devCalcInput');
        for (var resourceName in dataJson) {
            document.getElementById(resourceName + Result).value = 0;
        }
    
        devCalcInput.forEach(function (ele) {
            ele.value = 0;
        });
    };
    
    var devCalcInputElements = document.querySelectorAll('.devCalcInput');
    devCalcInputElements.forEach(function (ele) {
        ele.addEventListener('change', function() {
            var calcInputId = ele.id;
            var calcData = calcInputId.split('_');
            var resourceResult = calcTotalResource(calcData[0]);
            document.getElementById(calcData[0] + 'Result').value = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: "compact", compactDisplay: "short" }).format(resourceResult);
        });
    });
}


function calcTotalResource(resourceType) {
    var resourceLength = Object.keys(dataJson[resourceType]).length;
    var resourceResult = 0;

    for (var i = 0; i <= resourceLength - 1; i++) {
        var calcInputValue = document.getElementById(resourceType + '_' + i).value;
        resourceResult += calcInputValue * dataJson[resourceType][i];
    }
    return resourceResult;
}

makeResultDiv();
makeCalcSection();
setEvent();