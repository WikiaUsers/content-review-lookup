/* Any JavaScript here will be loaded for all users on every page load. */
highlight = {
    selectAll: true,
    sysop: '#3F3',
    chatmoderator: '#0CC'
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:ExtendedNavigation/code.js'
    ]
});