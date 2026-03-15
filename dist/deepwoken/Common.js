/* jshint esversion: 6 */

$( document ).ready(function() {
    mw.loader.load("/wiki/MediaWiki:Tippy.js?action=raw&ctype=text/javascript");
    mw.loader.load("/wiki/MediaWiki:Gadget-flashAnchored.js?action=raw&ctype=text/javascript");
});

// Prevents ProfileTags extension to overwrite default user tags.
(window.dev = window.dev || {}).profileTags = {
	noHideTags: true
};

// Import scripts in certain pages
const pageName = mw.config.get('wgPageName');
switch(pageName) {
	case 'Monsters': 
		$(function() {
			importScriptPage('MediaWiki:Calculators/MonsterCalculator.js');
		});
		break;
	default:
		$(function() {
			importScriptPage('MediaWiki:RandomImage.js');
		});
		break;
}