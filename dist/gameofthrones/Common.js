/* Any JavaScript here will be loaded for all users on every page load. */

importStylesheet("Template:Ambox/code.css");
importScriptPage('ShowHide/code.js', 'dev');

/* Dynamic Navigation Bars */
importScript('MediaWiki:Common.js/navigationbars.js');
 
/* Dynamic Navigation Bars (2) */
importScript('MediaWiki:Common.js/navigationbars2.js');
 
/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsibletables.js');

/*Inactivity tag */
InactiveUsers = {
	months: 12,
	text: 'inactive'
	};
	importScriptPage('InactiveUsers/code.js', 'dev');

/*Standard Edit Summaries*/
window.dev = window.dev || {};

window.dev.editSummaries = {
	css: '#stdSummaries { ... }',
	select: 'MediaWiki:Custom-StandardEditSummaries'
};

importArticles({ type: 'script', articles: [ 
	'u:dev:MediaWiki:Standard Edit Summary/code.js'
]});