/* Any JavaScript here will be loaded for all users on every page load. */
// importScriptPage('ShowHide/code.js', 'dev');

function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.fandom.com' + url:server + url;
return importScriptURI(url);
}