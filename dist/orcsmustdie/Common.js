/* Any JavaScript here will be loaded for all users on every page load. */

//Using dev maintained version from w:c:dev:AjaxRC
ajaxPages = ["Special:RecentChanges","Special:NewPages","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

//XML additions by pecoes
if (~[112,113].indexOf(mw.config.get('wgNamespaceNumber'))) {
    importArticle({
        type: 'script',
        article: 'u:pecoes:MediaWiki:OMD.js'
    });
}