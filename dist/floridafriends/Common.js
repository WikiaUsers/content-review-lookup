/* Any JavaScript here will be loaded for all users on every page load. */
/ <pre><nowiki>

// onload stuff
var firstRun = true;

function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
 
	showEras('title-eraicons');
}
function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}
 
	var titleDiv = document.getElementById( className );
 
	if( titleDiv == null || titleDiv == undefined )
		return;
 
	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}

addOnloadHook( loadFunc );
// </nowiki></pre>