// Konfiguracja gadżetu
window.ajaxSpecialPages = [
	'Recentchanges',
	'Images',
	'Videos',
	'Watchlist',
	'Contributions',
	'Newpages',
	'Log'
];
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
	'ajaxrc-refresh-text': 'Automatyczne odświeżanie',
	'ajaxrc-refresh-hover': 'Automatycznie odświeża tę stronę co 30 sekund',
}}}}});

// Import
importArticle({
	type: 'script',
	article: 'u:dev:MediaWiki:AjaxRC/code.js'
});