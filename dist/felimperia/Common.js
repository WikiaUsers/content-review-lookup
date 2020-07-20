/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
/* Buncha codes, for best experience! */
importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:DisplayClock/code.js',
        'u:dev:MediaWiki:ExternalImageLoader/code.js',
        'u:dev:MediaWiki:WallGreetingButton/code.js',
        'u:dev:MediaWiki:DisableBotMessageWalls/code.js',
        'u:dev:MediaWiki:ProfileTags.js',
        'u:dev:MediaWiki:Medals/code.js',
        'u:dev:MediaWiki:HighlightUsers/code.js',
        'u:dev:MediaWiki:ListAdmins/code.js',
        'u:dev:MediaWiki:MarkBlocked.js',
    ]
});
 
/* 
may or may not use in the future
highlight = {
    selectAll: false,
        sysop: 'purple',
        bot: '#00FF00',
    users: {
        ...
    }
};
*/
 
/* 
How to use External Images code:
Use this in source.
{{ExternalImageLoader
|url = full url of image
|align = left, center, right
|alt = text that appears when you hover over the image
|caption = caption text
|link = what the image links to when you click on it
}}
*/