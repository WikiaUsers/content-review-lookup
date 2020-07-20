/* Any JavaScript here will be loaded for all users on every page load. */

/* ================================================== */
/* ==== Import Articles                          ==== */
/* ================================================== */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MassCategorization/code.js', 'dev');
}

importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/Daily_Reset_Widget.js',    //Daily Reset Widget
	]
});

window.DisplayClockJS = {
    format: '%2I:%2M:%2S %2p %b, %d %Y (PDT)',
    offset: -300,
    hoverText: 'Soccer Spirits in-game time'
};