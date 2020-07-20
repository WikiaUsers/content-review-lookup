importScriptPage('ShowHide/code.js', 'dev')
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}
 
PurgeButtonText = 'Aggiorna'; // for PurgeButton/code.js
 
/* For AjaxRC/code.js */
var ajaxPages = ["Speciale:WikiActivity"];
var AjaxRCRefreshText = 'Auto refresh';
 
importArticles({
    type: "script",
    articles: [
	"w:c:dev:ShowHide/code.js",
	"w:c:dev:CollapsibleInfobox/code.js",
        "w:c:dev:Countdown/code.js",
	"w:c:dev:AjaxRC/code.js",
	"w:c:dev:BackToTopButton/code.js",
	"w:c:dev:OasisToolbarButtons/code.js",
	"w:c:dev:AutoEditDropdown/code.js",
	"w:c:dev:PurgeButton/code.js",
	"MediaWiki:Common.js/displayTimer.js"
    ]
});