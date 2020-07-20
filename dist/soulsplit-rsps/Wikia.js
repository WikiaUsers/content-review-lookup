importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'MediaWiki:Common.js/histats.js', /*Tracker*/
    ]
});


importScriptPage('u:dev:InactiveUsers/code.js');
InactiveUsers = { 
    months: 3,
    gone: '',
    text: 'Inactive'
};