//TopicBlockLog config
TBL_WIKIS = [
    "prodigy-fan-ideas",
    "community",
    "prodigy-game-fanon",
    "prodigy-glitch",
];

// Auto Refresh Settings
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
];

var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 30000;
 
// Back to Top Config
window.BackToTopModern = true;

// User Tags
$.get(
    mw.util.wikiScript('load'),
    {
        mode:'articles',
        articles:'MediaWiki:Custom-user-tags.json',
        only:'styles'
    },
    function (d) {
        window.UserTagsJS = JSON.parse(
            d.replace(/\/\*.*\*\//g, '')
        );
    }
);

// Configuration for NoLicenseWarning
window.NoLicenseWarning = {
    forceLicense: true
};

// Configuration for TokenRefresh
window.TokenRefreshInterval = 360000;

// Configuration for UserStatus
window.UserStatusSettings = {
    colorBlindMode: 1,
    lightTheme: 1,
    statusIndicator: 0,
    online: '#0078ff',
    away: '#cc7',
    dnd: 'crimson',
    offline: 'darkgray',
};