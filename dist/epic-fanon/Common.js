/* Any JavaScript here will be loaded for all users on every page load. */
@import url("http://epic-fanon.wikia.com/index.php?title=MediaWiki:Common.js&usemsgcache=yes&ctype=text/css&smaxage=86400&action=raw&maxage=86400");
var ShowHideConfig = { autoCollapse: Infinity };
importScriptPage('ShowHide/code.js', 'dev');
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);