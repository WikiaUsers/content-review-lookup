/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers (Wikipedia): [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Table sorting fixes ************************************************
  *
  *  Description: Disables code in table sorting routine to set classes on even/odd rows
  *  Maintainers (Wikipedia): [[User:Random832]]
  */
 
ts_alternate_row_colors = false;

function loadFunc() {
	showEras('title-eraicons');
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