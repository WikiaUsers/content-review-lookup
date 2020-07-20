/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importScriptPage('ShowHide/code.js', 'dev');
importArticle({type: "style", article:"MediaWiki:StaffHighlight.css"});

/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
var collapseCaption = 'hide';
var expandCaption = 'show';

// Set up the words in your language
var navigationBarHide = '[' + collapseCaption + ']';
var navigationBarShow = '[' + expandCaption + ']';

/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} event Event object
 */
function toggleNavigationBar( indexNavigationBar, event ) {
	var navToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
	var navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
	var navChild;

	if ( !navFrame || !navToggle ) {
		return false;
	}

	// If shown now
	if ( navToggle.firstChild.data === navigationBarHide ) {
		for ( navChild = navFrame.firstChild; navChild !== null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavContent' ) || $( navChild ).hasClass( 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
		}
		navToggle.firstChild.data = navigationBarShow;

	// If hidden now
	} else if ( navToggle.firstChild.data === navigationBarShow ) {
		for ( navChild = navFrame.firstChild; navChild !== null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavContent' ) || $( navChild ).hasClass( 'NavPic' ) ) {
				navChild.style.display = 'block';
			}
		}
		navToggle.firstChild.data = navigationBarHide;
	}

	event.preventDefault();
}