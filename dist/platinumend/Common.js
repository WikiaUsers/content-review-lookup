/* Any JavaScript here will be loaded for all users on every page load. */

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'N6b8at8psF',
    prependToRail: true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
    ]
});