// Created by User:TheSeal27.



// [WIP] Check if the page has the 'SuffixButton' ID. To-do: Include detection of the transclusion of the template in addition to the ID.
const suffixButtonIDCheck = document.getElementById("SuffixButton");

if (suffixButtonIDCheck === null) {
console.log("[Suffix Button] [LOG]: Failed to find ID. Cancelling script.");
} else {
console.log("[Suffix Button] [LOG]: ID located. Running script.");

const suffixButtonMainNode = document.createElement("div");
document.getElementById("SuffixButton").appendChild(suffixButtonMainNode);
suffixButtonMainNode.setAttribute("id", "SuffixButtonMain");
suffixButtonMainNode.setAttribute("style", "width:100%;text-align:center;padding:0.5em;overflow:auto;font-weight:bold");
document.getElementById("SuffixButtonMain").innerHTML = "Toggle Suffixes";

const suffixButtonBaseNode = document.createElement("div");
suffixButtonMainNode.appendChild(suffixButtonBaseNode);

const suffixButtonNode = document.createElement("button");
suffixButtonBaseNode.appendChild(suffixButtonNode);
suffixButtonNode.setAttribute("id", "SuffixButtonSelf");
suffixButtonNode.setAttribute("style", "padding:0.5em 1em 0.5em 1em;border:0;background:#F94565");
suffixButtonNode.innerHTML = "Disabled";
suffixButtonNode.setAttribute("onclick", "setSuffixStatus()");
suffixButtonNode.setAttribute("value", "false");

var suffixStatus = "false";

function setSuffixStatus() {
if (suffixButtonNode.value === "true") {
suffixButtonNode.setAttribute("style", "padding:0.5em 1em 0.5em 1em;border:0;background:#F94565");
suffixButtonNode.innerHTML = "Disabled";
suffixButtonNode.value = "false";
suffixStatus = "false";
} else {
suffixButtonNode.setAttribute("style", "padding:0.5em 1em 0.5em 1em;border:0;background:#9AEC82");
suffixButtonNode.innerHTML = "Enabled";
suffixButtonNode.value = "true";
suffixStatus = "true";
}
}
}