/* Any JavaScript here will be loaded for all users on every page load. */
/* Inactive users */
InactiveUsers = { months : 1 };
/* ImageMap Highlight color */
(window.imagemap = window.imagemap || {}).hightlightcolor = '#ff0000';

/* Content icons */

function loadFunc() {
	showEras('title-Contenticons');
	showEras('title-shortcut');
}

function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}

	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
	
}