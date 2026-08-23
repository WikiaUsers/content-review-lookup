/* Any JavaScript here will be loaded for all users on every page load. */
const currentPage = mw.config.get('wgPageName');
const discordPages = [
    'Everspace_Wiki',
    'Everspace_Portal',
    'Everspace_2_Portal'
];
/* Only load the discord script for the main and portal pages */
if (discordPages.includes(currentPage)) {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Discord.js'
        ]
    });
}