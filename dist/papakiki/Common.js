/* Any JavaScript here will be loaded for all users on every page load. */

/* start -- UTC clock "displayTimer" */
importScriptPage('MediaWiki:Common.js/displayTimer.js', 'lim-dall-young-world');
/* end -- UTC clock "displayTimer" */

/* start -- Random Wordmark "randomLogo" */
importScript('MediaWiki:Common.js/randomLogo.js'); //uncomment to start random logo
/* end -- Random Wordmark "randomLogo" */

/* start -- Random Favicon "randomIcon" */
importScript('MediaWiki:Common.js/randomIcon.js'); //uncomment to start random icon
/* end -- Random Favicon "randomIcon" */

/* start -- Random Background "randomBkgnd" */
importScript('MediaWiki:Common.js/randomBkgnd.js'); //uncomment to start random background
/* end -- Random Background "randomBkgnd" */


/* start -- ShowHide */
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = {
	userLang: false,
	en: {
		show: "&#xff0b;",
		hide: "&#xff0d;",
		showAll: "&#x2295;",
		hideAll: "&#x2296;"
	}
};
/* end -- ShowHide */
 
/* start -- CollapsibleInfobox */
importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
// used with [[template:Infobox (collapsible)]]
/* end -- CollapsibleInfobox */
 
/* start -- editIntroButton */
// EditIntroButtonText = 'intro';
importScriptPage('EditIntroButton/code.js', 'dev');
/* end -- editIntroButton */