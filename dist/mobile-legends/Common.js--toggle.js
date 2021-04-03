/* Any JavaScript here will be loaded for all users on every page load. */

// Adding Variables
var toggle1 = document.getElementById("toggle1");
toggle1.style.cursor = "pointer";
var toggle2 = document.getElementById("toggle2");
toggle2.style.display = "none";
toggle2.style.cursor = "pointer";

// Adding Events for Applying the Variables
toggle1.addEventListener("click",toggleFunction);
function toggleFunction() {
	if (toggle2.style.display === "none") {
	toggle1.style.display = "none";
    toggle2.style.display = "inline";
    }
}
toggle2.addEventListener("click",toggleFunctionTwo);
function toggleFunctionTwo() {
	if (toggle1.style.display === "none") {
    toggle1.style.display = "inline";
    toggle2.style.display = "none";
	}
}