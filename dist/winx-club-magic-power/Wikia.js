// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

// Weather effects
importArticle( { type: 'script', article: 'u:c:MediaWiki:Snow.js' } );

// Extented Navigation
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

// Null edit button
importArticle({
    type: 'script',
    article: 'u:dev:NullEditButton/code.js'
});

// Timed Slider
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});