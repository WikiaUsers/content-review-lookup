// Created by User:TheSeal27 for the Mining Simulator Wiki on Fandom. Original page: https://mining-simulator.fandom.com/wiki/MediaWiki:DefaultUploadSummary.js



// Check if the page is Special:Upload, otherwise return null.
if (window.location.pathname === "/wiki/Special:Upload") {
console.log("[Default Upload Summary] [LOG]: Current page is 'Special:Upload'. Running script.");
// Create nodes.
const defaultSummaryBaseNode = document.createElement("div");
const defaultSummaryInputNode = document.createElement("textarea");
const uploadText = document.getElementById("uploadtext");
uploadText.appendChild(defaultSummaryBaseNode);
defaultSummaryInputNode.setAttribute("style", "width:50%");
defaultSummaryInputNode.setAttribute("rows", "8");
defaultSummaryInputNode.setAttribute("cols", "40");
defaultSummaryBaseNode.insertAdjacentHTML("beforebegin", "Input custom summary, applying to all files being uploaded:");
defaultSummaryBaseNode.appendChild(defaultSummaryInputNode);

// Variables.
var fileQuantity = 1;
var iteration = 0;
var summaryText = "[[" + "Category:Unsorted files]]"; // This controls the default value.

// Function for adding summaryText to each file's summary.
function addDefaultSummary() {
iteration = 0;
fileQuantity = document.getElementsByTagName("textarea").length;
while (iteration < fileQuantity) {
document.getElementsByTagName("textarea")[iteration].value = summaryText.toString();
iteration++;
}
}

// Set defaults.
defaultSummaryInputNode.value = summaryText;
addDefaultSummary();

// Get value of input.
defaultSummaryInputNode.oninput = function() {
if (this.value === '') {
summaryText = "";
addDefaultSummary();
} else {
summaryText = this.value;
addDefaultSummary();
}
};

// If the page is not Special:Upload, return null.
} else {
null;
}