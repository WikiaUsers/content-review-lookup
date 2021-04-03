/* Any JavaScript here will be loaded for all users on every page load. */

addOnloadHook(function() {$('.qaywsx').text(wgUserName);});

window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
    ]
});