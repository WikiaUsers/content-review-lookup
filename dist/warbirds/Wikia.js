// Script imported here will affect only the default Wikia skin (Oasis)

// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads

// Add Inactive User Icon to MastheadProfiles
importScriptPage('InactiveUsers/code.js', 'dev');
// END Add Inactive User Icon to MastheadProfiles

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});