/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


/* Import Show/Hide code **************************************
 * from: http://dev.wikia.com/wiki/ShowHide
 * Description: ShowHide is a script for collapsible tables and divs.
 * Added to this site by: User:DarkMoonRising
 */

var ShowHideConfig = { 
	autoCollapse: 3,
	brackets: '{}',
	en: {
		show: "expand",
		hide: "minimise",
		showAll: "expand all",
		hideAll: "shrink all"
	}
};

importScriptPage('ShowHide/code.js', 'dev'); 

/* Import SpoilerAlert code **************************************
 * from: http://dev.wikia.com/wiki/SpoilerAlert
 * Description: Hides the content of a page and displays a dialogue asking if you want to risk seeing spoilers or not
 * Added to this site by: User:DarkMoonRising
 */

importScriptPage('SpoilerAlert/code.js', 'dev');

window.SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};

/* Add Custom Edit Buttons to the Source Edit Window **********************************
 * from: http://community.wikia.com/wiki/Help:Custom_edit_buttons
 * Description: Customising Edit Bar Buttons.
 * Added to this site by: User:DarkMoonRising
 */

if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "Line break",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};
}