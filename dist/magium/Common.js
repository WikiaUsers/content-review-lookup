/* Any JavaScript here will be loaded for all users on every page load. */


/* link preview configuration */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/magium/images/b/b0/Magium_Icon_Wiki.png/revision/latest/scale-to-width-down/480?cb=20200724184417';
window.pPreview.tlen = 1000;


/* RailWAM configuration */
window.railWAM = {
    logPage:"Project:WAM Log"
};

window.AddRailModule = [{prepend: true}];
 
window.PurgeButtonText = 'Refresh';

/* Adds reddit widget to id="reddit-widget" */
importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditWidget.js',
	]
})