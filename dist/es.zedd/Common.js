/* AJAX */
importScriptPage('AjaxRC/code.js', 'dev');
ajaxPages = ["Especial:RecentChanges", "Especial:WikiActivity", "Especial:NewPages", "Especial:Contributions"];

importArticles({
    type: 'script',
    articles: [
"w:c:dev:BackToTopButton/code.js",
"w:c:dev:Countdown/code.js",
'u:dev:DisplayClock/code.js',
'u:dev:ExtendedNavigation/code.js',
"w:c:dev:ReferencePopups/code.js",
"w:c:dev:ShowHide/code.js",
'u:dev:UserTags/code.js',
"w:dev:WallGreetingButton/code.js"
    ]
});