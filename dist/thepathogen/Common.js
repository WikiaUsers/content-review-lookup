/* <source lang="javascript" style="tab-size: 4;"> */
 
/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:false, curly:true, browser:true, jquery:true */
/*global mediaWiki */
 
/** 
 * This file manages all JavaScript loaded on the Istaria Wiki
 * 
 * If you have any questions, you can contact Kida at
 * http://istaria.wikia.com/wiki/Message_Wall:Kida155
 * 
 * importArticles() is used to efficiently combine several JavaScript files
 * into one file, minify them, and make a single HTTP request.
 * 
 * For more information about how to use importArticles(),
 * see http://help.wikia.com/wiki/Help:Including_additional_JavaScript_and_CSS
 */
 
 
// Configuration settings for AjaxRC
// http://dev.wikia.com/wiki/AjaxRC
var ajaxPages = ['Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:Contributions', 'Special:AbuseLog', 'Special:NewPages'];
var AjaxRCRefreshText = 'Auto-refresh';
var ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100617113123/dev/images/6/6a/Snake_throbber.gif';
 
 
(function ($, mw, window, console) {
	"use strict";
	var articles, oasisArticles;
 
 
	if (window.localStorage && window.localStorage.getItem('commonjs')) {
		console.log('You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \'commonjs\' from localStorage to re-enable site-wide JavaScript.');
		return;
	}
 
	// ***** BEGIN List of scripts to be loaded for ALL SKINS *****
	// ***** The last entry in this array must not have a comma *****
	articles = [
		// Scripts stored locally on this wiki


		// Scripts on the Wikia Developer's wiki
		'u:dev:PurgeButton/code.js',				// Adds a purge (refresh) option to the edit button dropdown
		'u:dev:ListFiles/code.js',				// Powerful utility script for generating lists of files
		'u:dev:AjaxRC/code.js',					// Auto-refreshes Special:RecentChanges with Ajax
	];
	// ***** END List of scripts to be loaded for ALL SKINS *****
 
 
	if (mw.config.get('skin') === 'oasis') {
 
		// ***** BEGIN List of scripts to be loaded for the OASIS SKIN ONLY *****
		// ***** The last entry in this array must not have a comma *****
		oasisArticles = [
			// Scripts stored locally on this wiki
			'MediaWiki:Common.js/SnippetsOasis.js',		// Tiny snippets of code for just the Oasis skin
			'MediaWiki:Common.js/SubNav.js',			// Level 4 subnavs for the wiki navigation
		];
		// ***** END List of scripts to be loaded for the OASIS SKIN ONLY *****
 
		// Add Oasis-only scripts to the articles array
		for (var i = 0, length = oasisArticles.length; i < length; i++) {
			articles[articles.length] = oasisArticles[i];
		}
	}
 
 
	// Use Wikia's importArticles() function to load JavaScript files
	window.importArticles({
		type: 'script',
		articles: articles
	});
	console.log('Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:', articles);
}(jQuery, mediaWiki, window, window.console));
 
/* </source> */