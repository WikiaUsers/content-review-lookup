/* This script's purpose it to make "Template:Blank cell" work properly in the VisualEditor, by transferring it's attributes to the corresponding cell it belongs to. */
function swapAllCellTemplates() {
	var blankCellTemplates = document.querySelectorAll(".cellTemplate");
	Array.prototype.forEach.call(blankCellTemplates, function(template) {
		var parentCell = (template.parentNode.nodeName == "TD" ? template.parentNode : template.parentNode.parentNode);
		if(parentCell.nodeName == "TD") {
			swapAttribute("style", template, parentCell);
			swapAttribute("title", template, parentCell);
			swapAttribute("data-sort-value", template, parentCell);
			template.removeAttribute("class");
		}
	});
}
function swapAttribute(attr,fromElem,toElem) {
	var value = fromElem.getAttribute(attr);
	if(value != null && value != undefined) {
		toElem.setAttribute(attr, value);
		fromElem.removeAttribute(attr);
	}
}
 
swapAllCellTemplates(); /*Call once on page loading*/
 
/*Re-apply update after VisualEditor usage.*/
var elemToWatch = document.querySelector("#WikiaMainContent");
if(elemToWatch) {
	var mutationObserver = new MutationObserver(swapAllCellTemplates);
	if(mutationObserver) {
		mutationObserver.observe(elemToWatch, { childList:true, subtree:true });
	} else {
		elemToWatch.addEventListener("DOMNodeInserted", swapAllCellTemplates);
	}
}