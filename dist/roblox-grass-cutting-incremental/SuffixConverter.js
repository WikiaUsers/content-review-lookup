// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:SuffixConverter.js



// Import Suffix Button.
mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixButton.js&action=raw&ctype=text/javascript');

// Variable declarations.
const units = ["", "k", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "DDc", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "UVg", "DVg", "TVg", "QaVg", "QtVg", "SxVg", "SpVg", "OVg", "NVg", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OQd", "NQd", "Qi", "UQi", "DQi", "TQi", "QaQi", "QtQi", "SxQi", "SpQi", "OQi", "NQi", "He", "UHe", "DHe", "THe", "QaHe", "QtHe", "SxHe", "SpHe", "OHe", "NHe", "St", "USt", "DSt", "TSt", "QaSt", "QtSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QtOg", "SxOg", "SpOg", "OOg", "NOg", "Nn", "UNn", "DNn", "TNn", "QaNn", "QtNn", "SxNn", "SpNn", "ONn", "NNn", "Ce", "UCe"];

var suffixStatus = false;
var resultSuffix;
var resultScientific;
var checkForLowNumber;
var result;

// Function for obtaining the input and determining whether it is suffix or scientific, then converting to the inverse.
function convertNumber(input) {
if (Number(convertToScientific(input)) < 1e3) {
checkForLowNumber = Number(convertToScientific(input));
result = checkForLowNumber;
} else {
if (suffixStatus === true) {
result = convertToSuffix(convertToScientific(input));
} else {
checkForLowNumber = convertToScientific(Number(convertToScientific(input)).toExponential().toString().replace(/[+]?/g, ""));
result = checkForLowNumber;
}
}
return result;
}

// Function for converting its input to suffix notation.
function convertToSuffix(input) {
var numberCheck = convertToScientific(input);
var sigFig;
if (numberCheck.toString().match(/[a-z]{1}/gi) == "e" && numberCheck.toString().match(/[a-z]+/gi).length == "1") {
var index = Math.floor(Math.log10(numberCheck) / 3);
var totalZeroCount = Math.floor(Math.log10(numberCheck));
var extraZeroCount = (totalZeroCount.toString().match(/\d+/g)) - (index * 3);
var suffixUnit = units[index];
function checkExtraZeroCount() {
if (extraZeroCount === "0") {
result = 1;
} else {
result = 1 * (10 ** extraZeroCount);
}
return result;
}
sigFig = Number((numberCheck.toString().replace(/[e]{1}[+]?[\-]?\d+/g, "")) * checkExtraZeroCount()).toFixed(3);

if (numberCheck < 1e3) {
resultSuffix = Number(numberCheck);
} else if (numberCheck >= 1e3) {
resultSuffix = sigFig + suffixUnit;
}
} else if (input.toString().match(/[a-z]+/gi)) {
sigFig = Number(Number(input.toString().match(/\d+[.]?\d*/g)));
var suffix = input.toString().match(/[a-z]+/gi);
var suffixZeroes = (units.indexOf(suffix.toString())) * 3;
resultSuffix = convertToSuffix((Number(sigFig) * (10 ** suffixZeroes)).toExponential());
}
else {
resultSuffix = Number(input);
}
return resultSuffix;
}

// Function for converting its input to scientific notation.
function convertToScientific(input) {
var sigFigSuffix;
var findSuffix;
var indexSuffix;
var num;
if (input.toString().match(/[a-z]+/gi)) {
if (input.toString().match(/[a-z]{1}/gi) == "e" && input.toString().match(/[a-z]+/gi).length == "1") {
var base = Number(input).toExponential(5).toString().replace(/[+]?/g, "");
var sigFig = Number(base.replace(/[e]{1}[+]?\d+/g, "")).toFixed(5);
var zeroes = base.match(/[e]{1}[+]?\d+/g);
if (zeroes === null) {
resultScientific = sigFig;
} else {
resultScientific = sigFig + zeroes;
}
} else {
sigFigSuffix = Number(input.toString().match(/\d*[.]?\d*/g)[0]).toFixed(5);
findSuffix = input.toString().match(/[a-z]+/gi);
indexSuffix = units.indexOf(findSuffix.toString());
resultScientific = Number((Number(sigFigSuffix)) + "e" + (Number(indexSuffix) * 3)).toExponential(5).toString().replace(/[+]?/g, "");
}
} else if (Number(input) < 1e3) {
resultScientific = Number(input);
} else {
num = Number(Number(input).toFixed(5)).toExponential(5).toString().replace(/[+]?/g, "");
resultScientific = num;
}
return resultScientific;
}



if (document.getElementById("SuffixConverter") !== null) {
console.log("[Suffix Converter] [LOG]: ID located. Loading interactive calculator.");

function nodeStyleWidth(e) {
    e.setAttribute('style', 'width:50%');
}

const suffixConversionNode = document.createElement("input");
suffixConversionNode.setAttribute('id', 'suffixConversionInput');
nodeStyleWidth(suffixConversionNode);
document.getElementById("SuffixConversionInput").appendChild(suffixConversionNode);

const numberConversionInput = document.getElementById("suffixConversionInput");
const numberConversionScientificOutput = document.getElementById("NumberConversionScientificOutput");
const numberConversionSuffixOutput = document.getElementById("NumberConversionSuffixOutput");

// Get value from input.
numberConversionScientificOutput.innerHTML = "?";
numberConversionSuffixOutput.innerHTML = "?";
numberConversionInput.oninput = function() {
var scientificCheck = Number(convertToScientific(numberConversionInput.value));
resultScientific = convertToScientific(this.value);
resultSuffix = convertToSuffix(this.value);
if (this.value === '') {
result = 0;
numberConversionScientificOutput.innerHTML = "?";
numberConversionSuffixOutput.innerHTML = "?";
numberConversionScientificOutput.setAttribute('style', '');
numberConversionSuffixOutput.setAttribute('style', '');
} else if (scientificCheck === Infinity || scientificCheck === -Infinity || isNaN(scientificCheck)) {
numberConversionScientificOutput.innerHTML = "To infinity and beyond!";
numberConversionSuffixOutput.innerHTML = "To infinity and beyond!";
numberConversionScientificOutput.setAttribute('style', 'color:#A629FF;font-weight:bold;');
numberConversionSuffixOutput.setAttribute('style', 'color:#A629FF;font-weight:bold;');
} else {
numberConversionScientificOutput.innerHTML = resultScientific;
numberConversionSuffixOutput.innerHTML = resultSuffix;
numberConversionScientificOutput.setAttribute('style', '');
numberConversionSuffixOutput.setAttribute('style', '');
}
}
} else {
console.log("[Suffix Converter] [LOG]: Failed to find ID. Disabling interactive calculator.");
}