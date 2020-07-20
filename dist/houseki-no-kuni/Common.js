/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditwidget.js',      // Adds reddit widget to id="reddit-widget"
	]
});
/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log/Auto-Statistics",
    loadOnPage:'Special:WikiActivity',
    autoLogForUsers:["User:Neon Love"],
    lang:'en',
    loadOnNamespace:[-1],
};