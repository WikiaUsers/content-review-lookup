/* Configure AjaxRC.js */
AjaxRCRefreshText      = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages              = [
    'Special:RecentChanges',
    'Special:WikiActivity'
];

/* Configure ClocksModule.js */
clocksModuleLabels    = [
    "PST",
    "UTC",
    "JST"
];
clocksModuleTimezones = [
    "America/Los_Angeles",
    "UTC",
    "Asia/Tokyo"
];
clocksModuleFormat    = [
    {
        local:  "en",
        format: "%H:%M %a \n%m/%d/%Y"
    }, {
        local:  "en",
        format: "%H:%M %a \n%m/%d/%Y"
    }, {
        local:  "en",
        format: "%H:%M %a \n%m/%d/%Y"
    }
];

/* Import */
importArticle({
    type: 'script',
    article: 'u:dbz-dokkanbattle:MediaWiki:ClocksModule.js'
});