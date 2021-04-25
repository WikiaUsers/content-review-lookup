/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage:"Project:WAM Log"
};
/* Taken from https://dev.fandom.com/wiki/WikiActivity */
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YouTubeModal/code.js',
    ]
});