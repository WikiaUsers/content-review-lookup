var SocialMediaButtons = { 
        position: "top",
        colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
importArticle( { type: 'script', article: 'u:c:MediaWiki:Snow.js' } );
// Adds copyright notice to siderail in Oasis
importScript('MediaWiki:Wikia.js/Construction.js');
// END Adds copyright notice to siderail in Oasis