// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:MainPageSearch.js



// [WIP] Check if the page has the 'MainPageSearch' ID. To-do: Include detection of the transclusion of the template in addition to the ID.
const mainPageSearchIDCheck = document.getElementById("MainPageSearch");

if (mainPageSearchIDCheck === null) {
console.log("[Main Page Search] [LOG]: Template is not transcluded. Cancelling script.");
} else if (mw.config.get("wgIsMainPage") === null) {
console.log("[Main Page Search] [LOG]: Template is transcluded, but current page is not the main page. Cancelling script.");
} else {
console.log("[Main Page Search] [LOG]: Template is transcluded and the current page is the main page. Running script.");
document.getElementById("MainPageSearch").setAttribute("style", "border-left:0;border-right:0;border-bottom:0;text-align:center;font-size:24px;border-radius:initial;display:block;");

// Create nodes for the input and the button.
const searchQueryInputNode = document.createElement("textarea");
searchQueryInputNode.setAttribute("id", "SearchQueryInput");
searchQueryInputNode.setAttribute("style", "padding:0.5em");
document.getElementById("SearchQuery").appendChild(searchQueryInputNode);

const searchQueryButton = document.createElement("button");
searchQueryButton.setAttribute("style", "padding:0.75em;");
searchQueryButton.innerHTML = "Confirm";
searchQueryButton.addEventListener("click", openSearch);
document.getElementById("SearchQueryButton").appendChild(searchQueryButton);

// Function for opening the search window with the inputted query.
function openSearch() {
window.open("https://roblox-grass-cutting-incremental.fandom.com/Special:Search?query=" + document.getElementById("SearchQueryInput").value);
}
}