const dataJson = {
    "Speed Boost": [1, 5, 10, 15, 30, 60, 180, 600, 900, 1440, 4320, 10080, 43200],
    "Building Speed Boost": [1, 5, 10, 15, 30, 60, 180, 600, 900, 1440, 4320, 10080, 43200],
    "Research Speed Boost": [1, 5, 10, 15, 30, 60, 180, 600, 900, 1440, 4320, 10080, 43200],
    "Training Speed Boost": [1, 5, 10, 15, 30, 60, 180, 600, 900, 1440, 4320, 10080, 43200],
    "Healing Speed Boost": [1, 5, 10, 15, 30, 60, 180, 600, 900, 1440, 4320, 10080, 43200],
};

var imgNameList = {
    "Speed Boost": "9/9d/Speed_Boost.png/revision/latest", 
    "Building Speed Boost": "6/62/Building_Speed_Boost.png/revision/latest", 
    "Research Speed Boost": "7/75/Research_Speed_Boost.png/revision/latest",
    "Training Speed Boost": "3/34/Training_Speed_Boost.png/revision/latest",
    "Healing Speed Boost": "c/c8/Healing_Speed_Boost.png/revision/latest",
};

//make Result Section
function makeResultDiv() {
    var resourceTitle = document.createElement('h2');
    resourceTitle.appendChild(document.createTextNode("Speed Boost"));
    var resultDiv = document.createElement('ul');

    var resultItemDiv = document.createElement('li');
    var resourceImg = document.createElement('img');
    resourceImg.src = "https://static.wikia.nocookie.net/godsome-clashofgods/images/9/9d/Speed_Boost.png/revision/latest";
    resourceImg.style.width = "90px";
    var resultInput = document.createElement('input');
    resultInput.id = "timeResult";
    resultInput.className = "devResultTime";
    resultInput.value = 0;
    resultInput.readOnly = true;
    resultInput.style.width = "90px";
    resultItemDiv.style.width = "90px";
    resultItemDiv.style.margin = "10px";

    resultItemDiv.style.display = "inline-block";

    resultItemDiv.appendChild(resourceImg);
    resultItemDiv.appendChild(resultInput);
    resultDiv.appendChild(resultItemDiv);

    var resetButtonDiv = document.createElement('li');
    var resetButton = document.createElement('button');
    resetButton.id = "devResetAllButton";
    resetButton.appendChild(document.createTextNode("RESET ALL"));

    resetButtonDiv.appendChild(resetButton);
    resetButtonDiv.style.display = "inline-block";

    resultDiv.style.display = "inline-block";
    resultDiv.appendChild(resetButtonDiv);

    document.getElementById('devCalcInputDiv').appendChild(resourceTitle);
    document.getElementById('devCalcInputDiv').appendChild(resultDiv);
}

function makeCalcSection() {
    for (var resourceName in dataJson) {
        var mainDiv = document.createElement('div');
        var mainName = document.createElement('p');
        var mainNameText = document.createTextNode(resourceName);
        mainName.appendChild(mainNameText);
        mainDiv.appendChild(mainName);

        var calcMainDiv = document.createElement('ul');
        for (var valueItem in dataJson[resourceName]) {
            var value = dataJson[resourceName][valueItem];

            var calcItemDiv = document.createElement('li');
            var valueName = document.createElement('p');

            var valueTime = 0;
            if (value >= 1440) {
                valueTime = Math.floor(value / 1440) + " Day";
            } else if (value >= 60) {
                valueTime = Math.floor(value / 60) + " Hours";
            } else {
                valueTime = value + " Minutes";
            }

            var valueText = document.createTextNode(valueTime);
            var resourceImg = document.createElement('img');
            resourceImg.src = "https://static.wikia.nocookie.net/godsome-clashofgods/images/" + imgNameList[resourceName];
            resourceImg.style.width = "70px";
            var valueCalcInput = document.createElement('input');
            valueCalcInput.type = "number";
            valueCalcInput.style.width = "40px";
            valueCalcInput.min = 0;
            valueCalcInput.value = 0;
            valueCalcInput.className = "devCalcInput";
            valueCalcInput.id = resourceName + '_' + valueItem;
            valueCalcInput.style.width = "90px";

            valueName.appendChild(valueText);
            valueName.style.borderBottom = "1px solid black";

            calcItemDiv.appendChild(valueName);
            calcItemDiv.appendChild(resourceImg);
            calcItemDiv.appendChild(valueCalcInput);

            calcItemDiv.className = "devCalcItem";

            calcItemDiv.style.width = "100px";
            calcItemDiv.style.margin = "5px";
            calcItemDiv.style.border = "1px solid black";
            calcItemDiv.style.textAlign = "center";
            calcItemDiv.style.display = "inline-block";
        

            calcMainDiv.appendChild(calcItemDiv);
        }
        calcMainDiv.style.display = "inline-block";
        calcMainDiv.style.textAlign = "left";
        mainDiv.appendChild(calcMainDiv);
        document.getElementById('devCalcInputDiv').appendChild(mainDiv);
    }
}

function setEvent() {
    document.getElementById('devResetAllButton').onclick = function () {
        var devCalcInput = document.querySelectorAll('.devCalcInput');
        for (var resourceName in dataJson) {
            document.getElementById('timeResult').value = 0;
        }

        devCalcInput.forEach(function (ele) {
            ele.value = 0;
        });
    };

    const devCalcInputElements = document.querySelectorAll('.devCalcInput');
    devCalcInputElements.forEach(function (ele) {
        ele.addEventListener('change', function () {
            var calcInputId = ele.id;
            var calcData = calcInputId.split('_');
            var resourceResult = calcTotalResource(calcData[0]);
            document.getElementById('timeResult').value = resourceResult;
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

    return makeTimeFormat(resourceResult);
}

function makeTimeFormat(resourceResult) {
    var day = 0;
    var hour = 0;
    var minute = 0;
    if (resourceResult >= 1440) {
        day = Math.floor(resourceResult / 1440);
        resourceResult = resourceResult % 1440;
    }

    if (resourceResult >= 60) {
        hour = Math.floor(resourceResult / 60);
        resourceResult = resourceResult % 60;
    }

    minute = resourceResult;

    return day + 'd ' + hour + 'h ' + minute + 'm';
}

makeResultDiv();
makeCalcSection();
setEvent();