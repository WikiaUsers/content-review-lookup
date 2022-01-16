window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

window.categories = ['Candidates for deletetion','Sunrise Studios Film','Promotional Website',];

importArticles({
    type: "script",
    articles: [
    "u:dev:ExtendedNavigation/code.js",
    "u:dev:SpoilerAlert/code.js",
    "u:dev:PurgeButton/code.js",
    "u:dev:DisplayClock/code.js",
    'u:dev:QuickDelete/multiCats.js'
        ]
});

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for Scream (2022). Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};