// Created by User:TheSeal27.



// [WIP] Check if the page has the 'AstralCalculator' ID. To-do: Include detection of the transclusion of the template in addition to the ID.
const astralCalculatorIDCheck = document.getElementById("AstralCalculator");

if (astralCalculatorIDCheck === null) {
console.log("[Astral Calculator] [LOG]: Template is not transcluded. Cancelling script.");
} else {
console.log("[Astral Calculator] [LOG]: Template is transcluded. Running script.");

// Import Suffix Converter.
mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixConverter.js&action=raw&ctype=text/javascript');

// Create nodes for each input.
function nodeStyleWidth(e) {
    e.setAttribute('style', 'width:10%');
}

const currentAstralNode = document.createElement("input");
document.getElementById("CurrentAstralInput").appendChild(currentAstralNode);
currentAstralNode.setAttribute('id', 'currentAstralInput');
nodeStyleWidth(currentAstralNode);

const goalAstralNode = document.createElement("input");
document.getElementById("GoalAstralInput").appendChild(goalAstralNode);
goalAstralNode.setAttribute('id', 'goalAstralInput');
nodeStyleWidth(goalAstralNode);

const currentAstralPrestigeNode = document.createElement("input");
document.getElementById("CurrentAstralPrestigeInput").appendChild(currentAstralPrestigeNode);
currentAstralPrestigeNode.setAttribute('id', 'currentAstralPrestigeInput');
nodeStyleWidth(currentAstralPrestigeNode);

const spacePowerNode = document.createElement("input");
document.getElementById("SPGainInput").appendChild(spacePowerNode);
spacePowerNode.setAttribute('id', 'spacePowerInput');
nodeStyleWidth(spacePowerNode);

const nextAstralCompletionNode = document.createElement("input");
document.getElementById("NextAstralCompletionInput").appendChild(nextAstralCompletionNode);
nextAstralCompletionNode.setAttribute('id', 'nextAstralCompletionInput');
nextAstralCompletionNode.setAttribute('class', 'slider');
nextAstralCompletionNode.setAttribute('value', '0');
nextAstralCompletionNode.setAttribute('max', '100');
nextAstralCompletionNode.setAttribute('min', '0');
nextAstralCompletionNode.setAttribute('type', 'range');
nodeStyleWidth(nextAstralCompletionNode);

const manualCuttingRateNode = document.createElement("input");
document.getElementById("ManualCuttingRateInput").appendChild(manualCuttingRateNode);
manualCuttingRateNode.setAttribute('id', 'manualCuttingRateInput');
nodeStyleWidth(manualCuttingRateNode);

const autocutRateNode = document.createElement("input");
document.getElementById("AutocutRateInput").appendChild(autocutRateNode);
autocutRateNode.setAttribute('id', 'autocutRateInput');
nodeStyleWidth(autocutRateNode);

const autocutAmountNode = document.createElement("input");
document.getElementById("AutocutAmountInput").appendChild(autocutAmountNode);
autocutAmountNode.setAttribute('id', 'autocutAmountInput');
nodeStyleWidth(autocutAmountNode);

const autocutValueNode = document.createElement("input");
document.getElementById("AutocutValueInput").appendChild(autocutValueNode);
autocutValueNode.setAttribute('id', 'autocutValueInput');
nodeStyleWidth(autocutValueNode);

// Variables for both base (unchanged) and for manipulation.
var currentAstral = 0;
var goalAstral = 1;
var currentAstralPrestige = 0;
var spacePower = 1;
var nextAstralCompletion = 0;
var manualCuttingRate = 0;
var totalCuttingRate;
var totalSPGain;
var autocutRate = 0;
var autocutAmount = 1;
var autocutValue = 1;
var num;
var totalSPReq;
var timeReq;

// Function for updating the requirements' HTML texts.
function updateRequirements() {
const timeUnits = ["1", "60", "3.6e3", "8.64e4", "6.048e5", "2.6298e6", "3.15576e7", "3.15576e8", "3.15576e9", "3.15576e10", "4.350846312e17", "3.15576e21", "3.15576e33", "3.15576e50", "3.15576e107", "1e300"];
const timeNames = ["Second", "Minute", "Hour", "Day", "Week", "Month", "Year", "Decade", "Century", "Millennium", "Age of the Universe", "Stelliferous Era", "Degenerate Era", "Black Hole Era", "Dark Era", "Valve Time"];
const timeNamesPlural = ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years", "Decades", "Centuries", "Millennia", "Ages of the Universe", "Stelliferous Eras", "Degenerate Eras", "Black Hole Eras", "Dark Eras", "Valve Times"];

const astralDifference = goalAstral - currentAstral;
var baseReq = 10 ** (10 * currentAstralPrestige + 2);
var multi = 2 + (0.1 * currentAstralPrestige);
var currentReq = baseReq * (multi ** (currentAstral - 1));

// Function for calculating total SP requirement.
function calcTotalSPReq() {
var cumsum = [];
var a;
var j = [];
var iteration = 0;
var result;
if (currentAstral == "0") {
num = baseReq;
} else {
num = currentReq;
}
while (iteration < astralDifference) {
result = num;
function calcSP() {
j.push(num);
}
calcSP();
num = num * multi;
iteration++

for(a=0;a<j.length;a++) {
  if(a==0) { cumsum[a] = j[0];}
  else { cumsum[a] = cumsum[a-1] + j[a];
  result = cumsum[a];
}
}
}
return result;
}

// If current Astral is 0, return the base requirement, otherwise return the requirement for current Astral plus one.
function checkAstralForZero() {
var result;
if (currentAstral == "0") {
result = baseReq;
} else {
result = currentReq;
}
return result;
}

// Check difference between current Astral and desired Astral.
if (astralDifference > 1) {
num = (calcTotalSPReq()) - (checkAstralForZero() * nextAstralCompletion);
document.getElementById("SPRequirement").innerHTML = convertNumber(num);
} else if (astralDifference === 0) {
num = 0;
document.getElementById("SPRequirement").innerHTML = num;
} else {
num = (calcTotalSPReq()) - (checkAstralForZero() * nextAstralCompletion);
document.getElementById("SPRequirement").innerHTML = convertNumber(num);
}

// Check total cutting rate and then calculate total SP gain per second.
if (autocutRate == 0 && manualCuttingRate > 0) {
totalCuttingRate = manualCuttingRate;
totalSPGain = totalCuttingRate * spacePower;
} else if (manualCuttingRate == 0 && autocutRate > 0) {
totalCuttingRate = (1 / autocutRate) * autocutAmount;
totalSPGain = totalCuttingRate * spacePower * autocutValue;
} else if (autocutRate > 0 && manualCuttingRate > 0) {
totalCuttingRate = manualCuttingRate + ((1 / autocutRate) * autocutAmount);
totalSPGain = (((totalCuttingRate - manualCuttingRate) * autocutValue) + manualCuttingRate) * spacePower;
} else {
totalCuttingRate = 0;
totalSPGain = 0;
}

// Check required time in seconds.
const baseTime = num / totalSPGain;
var timeTextOutput;
var secondaryTime;
var tertiaryTime;
var timeName;

// Function for checking whether or not the provided unit should be plural.
function checkPlural(amount, timeName) {
var singular = timeName;
var plural = timeNamesPlural[timeNames.indexOf(timeName)];
if (amount.toString() == "1") {
return " " + singular;
} else {
return " " + plural;
}
}

// Functions for checking amount of the given unit.
function calcUnitAmount(baseTime, timeName, type) {
var timeCalc;
if (type === '') {
timeCalc = convertNumber(Math.floor(baseTime / timeUnits[timeNames.indexOf(timeName)]));
} else {
timeCalc = convertToScientific(Math.floor(baseTime / timeUnits[timeNames.indexOf(timeName)]));
}
return timeCalc;
}

function getSecondaryTime(primaryUnit, secondaryUnit) {
var result = convertNumber((Number((timeUnits[timeNames.indexOf(primaryUnit)])) * ((baseTime / timeUnits[timeNames.indexOf(primaryUnit)]) - calcUnitAmount(baseTime, primaryUnit))) / timeUnits[timeNames.indexOf(secondaryUnit)]) // Calculate the secondary time.
return result;
}

// Function for obtaining primary and secondary time unit and time name.
function getPrimSecVal(primaryUnit, secondaryUnit) {
timeTextOutput = convertNumber(convertNumber(calcUnitAmount(baseTime, primaryUnit, "scientific"))) + checkPlural(calcUnitAmount(baseTime, primaryUnit), primaryUnit);
if ((baseTime / timeUnits[timeNames.indexOf(primaryUnit)]) - calcUnitAmount(baseTime, primaryUnit, "scientific") > 0) {
timeTextOutput = timeTextOutput + " and " + getSecondaryTime(primaryUnit, secondaryUnit) + checkPlural(getSecondaryTime(primaryUnit, secondaryUnit), secondaryUnit);
} else {
}
result = timeTextOutput;
return result;
}

// Check base time.
// Seconds.
if (baseTime >= timeUnits[0] && baseTime < timeUnits[1]) {
timeTextOutput = baseTime + checkPlural(baseTime, "Second");

// Minutes.
} else if (baseTime >= timeUnits[1] && baseTime < timeUnits[2]) {
getPrimSecVal("Minute", "Second");

// Hours.
} else if (baseTime >= timeUnits[2] && baseTime < timeUnits[3]) {
getPrimSecVal("Hour", "Minute");

// Days.
} else if (baseTime >= timeUnits[3] && baseTime < timeUnits[4]) {
getPrimSecVal("Day", "Hour");

// Weeks.
} else if (baseTime >= timeUnits[4] && baseTime < timeUnits[5]) {
getPrimSecVal("Week", "Day");

// Months.
} else if (baseTime >= timeUnits[5] && baseTime < timeUnits[6]) {
getPrimSecVal("Month", "Week");

// Years.
} else if (baseTime >= timeUnits[6] && baseTime < timeUnits[7]) {
getPrimSecVal("Year", "Month");

// Decades.
} else if (baseTime >= timeUnits[7] && baseTime < timeUnits[8]) {
getPrimSecVal("Decade", "Year");

// Centuries.
} else if (baseTime >= timeUnits[8] && baseTime < timeUnits[9]) {
getPrimSecVal("Century", "Decade");

// Milennia.
} else if (baseTime >= timeUnits[9] && baseTime < timeUnits[10]) {
getPrimSecVal("Millennium", "Century");

// Ages of the Universe.
} else if (baseTime >= timeUnits[10] && baseTime < timeUnits[11]) {
getPrimSecVal("Age of the Universe", "Millennium");

// Stelliferous Eras.
} else if (baseTime >= timeUnits[11] && baseTime < timeUnits[12]) {
getPrimSecVal("Stelliferous Era", "Age of the Universe");

// Degenerate Eras.
} else if (baseTime >= timeUnits[12] && baseTime < timeUnits[13]) {
getPrimSecVal("Degenerate Era", "Stelliferous Era");

// Black Hole eras.
} else if (baseTime >= timeUnits[13] && baseTime < timeUnits[14]) {
getPrimSecVal("Black Hole Era", "Degenerate Era");

// Dark Eras.
} else if (baseTime >= timeUnits[14] && baseTime < timeUnits[15]) {
getPrimSecVal("Dark Era", "Black Hole Era");

// Valve Times (arbitrary unit and length).
} else if (baseTime >= timeUnits[15]) {
getPrimSecVal("Valve Time", "Dark Era");

// If none of the above apply, apply seconds (i.e. being less than 1 second).
} else {
timeTextOutput = baseTime + " seconds";
}

// Output above time unit as HTML text.
document.getElementById("TimeUntilGoal").innerHTML = timeTextOutput;

// Infinity text.
if (num === Infinity || isNaN(num)) {
document.getElementById("SPRequirement").innerHTML = "To infinity and beyond!";
} else {
}

if (baseTime === Infinity || isNaN(baseTime)) {
document.getElementById("TimeUntilGoal").innerHTML = "To infinity and beyond!";
} else {
}
}

// Calculating the values of each input field.
var currentAstralInput = document.getElementById("currentAstralInput");
var currentAstralOutput = document.getElementById("CurrentAstral");
currentAstralOutput.innerHTML = currentAstral;
currentAstralInput.oninput = function() {
if (this.value === '') {
currentAstral = 0;
currentAstralOutput.innerHTML = currentAstral.toString();
updateRequirements();
} else {
currentAstral = Number(this.value);
currentAstralOutput.innerHTML = currentAstral.toString();
updateRequirements();
}
};

var goalAstralInput = document.getElementById("goalAstralInput");
var goalAstralOutput = document.getElementById("GoalAstral");
goalAstralOutput.innerHTML = goalAstral;
goalAstralInput.oninput = function() {
if (this.value === '') {
goalAstral = 1;
goalAstralOutput.innerHTML = goalAstral.toString();
updateRequirements();
} else {
goalAstral = Number(this.value);
goalAstralOutput.innerHTML = goalAstral;
updateRequirements();
}
};

var currentAstralPrestigeInput = document.getElementById("currentAstralPrestigeInput");
var currentAstralPrestigeOutput = document.getElementById("CurrentAstralPrestige");
currentAstralPrestigeOutput.innerHTML = currentAstralPrestige;
currentAstralPrestigeInput.oninput = function() {
if (this.value === '') {
currentAstralPrestige = 0;
currentAstralPrestigeOutput.innerHTML = currentAstralPrestige.toString();
updateRequirements();
} else {
currentAstralPrestige = Number(this.value);
currentAstralPrestigeOutput.innerHTML = currentAstralPrestige;
updateRequirements();
}
};

var spacePowerInput = document.getElementById("spacePowerInput");
spacePowerInput.oninput = function() {
if (this.value === '') {
spacePower = 1;
updateRequirements();
} else {
spacePower = convertToScientific(this.value);
updateRequirements();
}
};

var nextAstralCompletionInput = document.getElementById("nextAstralCompletionInput");
var nextAstralCompletionOutput = document.getElementById("NextAstralCompletion");
nextAstralCompletionOutput.innerHTML = nextAstralCompletion;
nextAstralCompletionInput.oninput = function() {
if (this.value === '') {
nextAstralCompletion = 0;
nextAstralCompletionOutput.innerHTML = nextAstralCompletion;
updateRequirements();
} else {
nextAstralCompletionOutput.innerHTML = this.value;
nextAstralCompletion = (0 + 0.01 * nextAstralCompletionInput.value);
updateRequirements();
}
};

var manualCuttingRateInput = document.getElementById("manualCuttingRateInput");
manualCuttingRateInput.oninput = function() {
if (this.value === '') {
manualCuttingRate = 0;
updateRequirements();
} else {
manualCuttingRate = Number(this.value);
updateRequirements();
}
};

var autocutRateInput = document.getElementById("autocutRateInput");
autocutRateInput.oninput = function() {
if (this.value === '') {
autocutRate = 0;
updateRequirements();
} else {
autocutRate = Number(this.value);
updateRequirements();
}
};

var autocutAmountInput = document.getElementById("autocutAmountInput");
autocutAmountInput.oninput = function() {
if (this.value === '') {
autocutAmount = 1;
updateRequirements();
} else {
autocutAmount = Number(this.value);
updateRequirements();
}
};

var autocutValueInput = document.getElementById("autocutValueInput");
autocutValueInput.oninput = function() {
if (this.value === '') {
autocutValue = 1;
updateRequirements();
} else {
autocutValue = Number(this.value);
updateRequirements();
}
};
}