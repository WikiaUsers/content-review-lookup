/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
window.ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity"];

window.railWAM = {
    logPage:"Project:WAM Log",
    loadOnPage:'Гравити Фолз Фанон вики',
    lang:'ru'
};

// By Kopcap94
!function( mw ) {
    var c = mw.config.get([ 'wgPageName', 'wgMainpage', 'wgAction' ]);
    if ( 
        ( c.wgPageName === c.wgMainpage.replace(/\s/g, '_') ) && 
        ( c.wgAction === 'view' ) 
    ) {
        importScriptPage( 'MediaWiki:DisplayClock/code.js', 'dev' );
    }
}( this.mediaWiki );
importArticles({
    type: 'script',
    articles: [
        'w:dev:MediaWiki:WallGreetingButton/code.js'
    ]
});