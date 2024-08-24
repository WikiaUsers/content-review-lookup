/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages",
    "Special:Contributions"
];


importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:ChatEditTools/code.2.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:UserTags/code.js'
    ]
});
 