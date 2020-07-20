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

window.SpoilerAlert = {
        question: 'This page contains upcoming content of Scream (TV Series). Are you sure you want to continue?',
        yes: 'Yes, continue',
        no: 'No, I want it to be a surprise',
        isSpoiler: function () {
            return (-1 !== wgCategories.indexOf('Approaching Content','Approaching Content'));
        }
    };