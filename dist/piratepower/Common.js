/* Any JavaScript here will be loaded for all users on every page load. */

/* MassNullEdit */
nullEditDelay = 1000;
nullEditUserButton = true;

/* importArticles */
importArticles({
    type: 'script',
    articles: [
        
        'u:dev:DisplayClock/code.js',   // DisplayClock
        'u:dev:MassNullEdit/code.js',   // MassNullEdit
        'u:dev:PurgeButton/code.js'     // PurgeButton
    ]
});