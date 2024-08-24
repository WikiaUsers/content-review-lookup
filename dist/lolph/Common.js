/* Any JavaScript here will be loaded for all users on every page load. */

/* IMPORTS */
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}
importScriptPage('ShowHide/code.js', 'dev');
/*
var ShowHideConfig = { 
	autoCollapse: 3,
	en: { // English
		show: "more",
		hide: "less",
		showAll: "expand all",
		hideAll: "collapse all"
	},
	tl: { // Tagalog
		show: "ipakita",
		hide: "itago",
		showAll: "ipakita lahat",
		hideAll: "itago lahat"
	},
};
*/

// SORTING REPLACEMENTS
mw.config.set(
  'tableSorterCollation', {
    'ä' : 'ae',
    'ö' : 'oe',
    'ß' : 'ss',
    'ü' : 'ue',
    /* REMOVE ANY NONE ALPHA CHARACTERS */
    ' ' : '',
    ',' : '',
    '!' : '',
    ':' : '',
    '.' : ''
  }
);