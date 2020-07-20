

importArticles({
    type: "script",
    articles: [
        "u:dev:ExtendedNavigation/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:DisplayClock/code.js",
        "u:dev:NullEditButton/code.js",
        "u:dev:AjaxRC/code.js"
    ]
});

// Ajax auto-refresh
var ajaxPages = ['特殊:近期變動','特殊:WikiActivity','特殊:用戶貢獻'];
var AjaxRCRefreshText = 'Auto-refresh';
// END Ajax auto-refresh