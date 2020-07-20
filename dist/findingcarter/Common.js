/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Upcoming episodes');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:Standard_Edit_Summary/code.js'    ]
});
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries {max-width: 275px !important;}'
};