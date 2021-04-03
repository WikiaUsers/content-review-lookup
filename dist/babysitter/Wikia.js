importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
 
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SocialIcons/code.js',
        'MediaWiki:Wikia.js/userRightsIcons.js'
    ]
});