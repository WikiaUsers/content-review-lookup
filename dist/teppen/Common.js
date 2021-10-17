/* Any JavaScript here will be loaded for all users on every page load. */

/* AjaxRC auto-refresh configuration details. See w:c:dev:AjaxRC for documentation */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');


if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }
    
    importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});