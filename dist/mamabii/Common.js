/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('MediaWiki:Common.js/displayTimer.js', 'runescape');

/*for show/hide function*/
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

[[File:Ryan.jpg|thumb|200px]]