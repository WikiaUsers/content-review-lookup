/* Any JavaScript here will be loaded for all users on every page load. */
 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
	var Button = document.getElementById("collapseButton" + tableIndex);
	var Table = document.getElementById("collapsibleTable" + tableIndex);
 
	if (!Table || !Button) {
		return false;
	}
 
	var Rows = Table.getElementsByTagName("tr");
 
	if (Button.firstChild.data == collapseCaption) {
		for (var i = 1; i < Rows.length; i++) {
			Rows[i].style.display = "none";
		}
		Button.firstChild.data = expandCaption;
	} else {
		for (var i = 1; i < Rows.length; i++) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName("table");
 
	for (var i = 0; i < Tables.length; i++) {
		if ($(Tables[i]).hasClass("collapsible")) {
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
			var Button = document.createElement("span");
			var ButtonLink = document.createElement("a");
			var ButtonText = document.createTextNode(collapseCaption);
 
			Button.style.styleFloat = "right";
			Button.style.cssFloat = "right";
			Button.style.fontWeight = "normal";
			Button.style.textAlign = "right";
			Button.style.width = "6em";
 
			ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
			ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
			ButtonLink.appendChild(ButtonText);
 
			Button.appendChild(document.createTextNode("["));
			Button.appendChild(ButtonLink);
			Button.appendChild(document.createTextNode("]"));
 
			var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
			/* only add button and increment count if there is a header row to work with */
			if (Header) {
				Header.insertBefore(Button, Header.childNodes[0]);
				tableIndex++;
			}
		}
	}
 
	for (var i = 0; i < tableIndex; i++) {
		if ($(NavigationBoxes[i]).hasClass("collapsed") || (tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass("autocollapse"))) {
			collapseTable(i);
		}
	}
} 
$(createCollapseButtons);

/**
 * Convert the page title inside the VisualEditor into a link pointing
 * back to the original page.
 */
$(function () {
	// Don't run unless the VisualEditor has loaded
	mw.hook('ve.activationComplete').add(function () {
		// Get the name of the page and replace underscores with spaces
		var currentPageName = mw.config.get('wgPageName').replace(/_/g, ' ');
		// Find the VisualEditor Page Title
		var VETitle = document.getElementsByClassName('ve-init-mw-desktopArticleTarget-title')[0];
		// Create a link to the current page
		var link = document.createElement('a');
		// Set the href to be
		link.href = window.location.pathname;
		// Set the title for mouseover
		link.title = currentPageName;
		// Always open in a new tab
		link.target = '_blank';
		link.rel = 'noreferrer noopener';
		// Set the text to be the page name
		link.textContent = currentPageName;
 
		// Remove the original title
		VETitle.textContent = '';
		// Add the link to the title
		VETitle.appendChild(link);
	});
});