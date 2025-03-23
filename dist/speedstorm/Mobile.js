/* All JavaScript here will be loaded for users of the mobile site */
// Upgrade Coins Calculator 
// level -> coins
    const coinsPerLevel = {
        1: 0,
        2: 150,
        3: 170,
        4: 190,
        5: 210,
        6: 230,
        7: 250,
        8: 270,
        9: 300,
        10: 320,
        11: 350,
        12: 380,
        13: 400,
        14: 450,
        15: 500,
        16: 540,
        17: 580,
        18: 630,
        19: 700,
        20: 750,
        21: 820,
        22: 900,
        23: 970,
        24: 1050,
        25: 1150,
        26: 1250,
        27: 1350,
        28: 1450,
        29: 1550,
        30: 1700,
        31: 1850,
        32: 2000,
        33: 2150,
        34: 2300,
        35: 2500,
        36: 2700,
        37: 3000,
        38: 3300,
        39: 3600,
        40: 4000,
        41: 4300,
        42: 4750,
        43: 5200,
        44: 5700,
        45: 6200,
        46: 6700,
        47: 7300,
        48: 8000,
        49: 8900,
        50: 10000,
    };

// level -> shards
const shardsPerLevel = {
    1: 0, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1,
    11: 2, 12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2, 20: 3,
    21: 3, 22: 3, 23: 3, 24: 3, 25: 3, 26: 4, 27: 4, 28: 4, 29: 4, 30: 4,
    31: 5, 32: 5, 33: 5, 34: 5, 35: 5, 36: 5, 37: 5, 38: 5, 39: 5, 40: 5,
    41: 7, 42: 7, 43: 7, 44: 7, 45: 9, 46: 9, 47: 9, 48: 10, 49: 10, 50: 10,
};

// Get the main div
const calculatorDiv = document.getElementById("calculator");
const calculatorInsideDiv = document.getElementById("calculator-inside");

// Create elements dynamically
const fromLabel = document.createElement("label");
fromLabel.innerText = "From Level:";

const fromInput = document.createElement("input");
fromInput.type = "number";
fromInput.id = "fromLevel";
fromInput.min = 1;
fromInput.max = 50;

const toLabel = document.createElement("label");
toLabel.innerText = " to Level:";

const toInput = document.createElement("input");
toInput.type = "number";
toInput.id = "toLevel";
toInput.min = 1;
toInput.max = 50;

const button = document.createElement("button");
button.innerText = "Calculate";
button.onclick = calculateResources;

const resultText = document.createElement("div");
resultText.innerHTML = 'Result: <span id="shardsResult">0</span> Shards, <span id="result">0</span> Upgrade Coins';

// Append elements to the div
calculatorInsideDiv.appendChild(fromLabel);
calculatorInsideDiv.appendChild(fromInput);
calculatorInsideDiv.appendChild(toLabel);
calculatorInsideDiv.appendChild(toInput);
calculatorInsideDiv.appendChild(button);
calculatorDiv.appendChild(resultText);

function calculateResources() {
    let fromLevel = parseInt(fromInput.value);
    let toLevel = parseInt(toInput.value);

    // Check for valid input
    if (isNaN(fromLevel) || isNaN(toLevel) || fromLevel < 1 || toLevel > 50 || fromLevel >= toLevel) {
        resultText.innerHTML = "Invalid input";
        return;
    }

    // Initialize totals
    let totalCoins = 0;
    let totalShards = 0;

    // Loop through levels starting from fromLevel + 1 to toLevel
    for (let i = fromLevel + 1; i <= toLevel; i++) {
        totalCoins += coinsPerLevel[i] || 0;
        totalShards += shardsPerLevel[i] || 0;
    }

    // Display the results
    document.getElementById("result").innerText = totalCoins;
    document.getElementById("shardsResult").innerText = totalShards;
}