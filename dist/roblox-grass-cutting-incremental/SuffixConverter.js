// Created by User:TheSeal27.



// Import Suffix Button.
mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixButton.js&action=raw&ctype=text/javascript');

var suffixStatus = "false";

// Constants.
const units = ["", "k", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "DDc", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "UVg", "DVg", "TVg", "QaVg", "QtVg", "SxVg", "SpVg", "OVg", "NVg", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OQd", "NQd", "Qi", "UQi", "DQi", "TQi", "QaQi", "QtQi", "SxQi", "SpQi", "OQi", "NQi", "He", "UHe", "DHe", "THe", "QaHe", "QtHe", "SxHe", "SpHe", "OHe", "NHe", "St", "USt", "DSt", "TSt", "QaSt", "QtSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QtOg", "SxOg", "SpOg", "OOg", "NOg", "Nn", "UNn", "DNn", "TNn", "QaNn", "QtNn", "SxNn", "SpNn", "ONn", "NNn", "Ce", "UCe"];

// Function for obtaining the input and determining whether it is suffix or scientific, then converting to the inverse.
function convertNumber(input) {
var resultSuffix;
var resultScientific;
var checkForLowNumber;
if (suffixStatus === "true") {
if (Number(convertToScientific(input)) < 1e3) {
checkForLowNumber = convertToSuffix(Number(convertToScientific(input)).toFixed(5));
} else {
checkForLowNumber = convertToSuffix(Number(convertToScientific(input)).toExponential(5).toString().replace(/[+]?/g, ""));
}
return checkForLowNumber;
} else {
if (Number(convertToScientific(input)) < 1e3) {
checkForLowNumber = Number(convertToScientific(input)).toFixed(5);
} else {
checkForLowNumber = Number(convertToScientific(input)).toExponential(5).toString().replace(/[+]?/g, "");
}
return checkForLowNumber;
}
}

// Function for converting its input to suffix notation.
function convertToSuffix(input) {
var numberCheck = Number(input).toExponential();
var sigFig;
if (numberCheck.toString().match(/[a-z]{1}/gi) == "e" && numberCheck.toString().match(/[a-z]+/gi).length == "1") {
var index = Math.floor(Math.log10(numberCheck) / 3);
var totalZeroCount = Math.floor(Math.log10(numberCheck));
var extraZeroCount = (totalZeroCount.toString().match(/\d+/g)) - (index * 3);
var suffixUnit = units[index];
function checkExtraZeroCount() {
if (extraZeroCount === "0") {
return 1;
} else {
return 1 * (10 ** extraZeroCount);
}
}
sigFig = Number(((numberCheck.toString().replace(/[e]{1}[+]?[\-]?\d+/g, "")) * checkExtraZeroCount()).toFixed(5));

if (numberCheck < 1e3) {
resultSuffix = Number(numberCheck);
return resultSuffix;
} else if (numberCheck >= 1e3) {
resultSuffix = sigFig + suffixUnit;
return resultSuffix;
}
} else if (input.toString().match(/[a-z]+/gi)) {
sigFig = Number(Number(input.toString().match(/\d+[.]?\d*/g)).toExponential()).toFixed(5);
var suffix = input.toString().match(/[a-z]+/gi);
var suffixZeroes = (units.indexOf(suffix.toString())) * 3;
return convertToSuffix((Number(sigFig) * (10 ** suffixZeroes)).toExponential());
}
else {
return input;
}
}

// Function for converting its input to scientific notation.
function convertToScientific(input) {
var sigFigSuffix;
var findSuffix;
var indexSuffix;
if (input.toString().match(/[a-z]+/gi)) {
if (input.toString().match(/[a-z]{1}/gi) == "e" && input.toString().match(/[a-z]+/gi).length == "1") {
var base = Number(Number(input).toExponential()).toFixed(5).toString().replace(/[+]?/g, "");
var sigFig = Number(base.replace(/[e]{1}[+]?\d+/g, "")).toFixed(5);
var zeroes = base.match(/[e]{1}[+]?\d+/g);
if (zeroes === null) {
resultScientific = sigFig;
} else {
resultScientific = sigFig + zeroes;
}
return resultScientific;
} else {
sigFigSuffix = input.toString().match(/\d*[.]?\d*/g)[0];
findSuffix = input.toString().match(/[a-z]+/gi);
indexSuffix = units.indexOf(findSuffix.toString());
resultScientific = Number((Number(sigFigSuffix)).toFixed(5) + "e" + (Number(indexSuffix) * 3)).toExponential().toString().replace(/[+]?/g, "");
return resultScientific;
}
} else if (Number(input) < 1e3) {
resultScientific = Number(input);
return resultScientific;
} else {
input = convertToSuffix(input);
sigFigSuffix = input.toString().match(/\d*[.]?\d*/g)[0];
findSuffix = input.toString().match(/[a-z]+/gi);
indexSuffix = units.indexOf(findSuffix.toString());
resultScientific = Number((Number(sigFigSuffix)).toFixed(5) + "e" + (Number(indexSuffix) * 3)).toExponential().toString().replace(/[+]?/g, "");
return resultScientific;
}
}