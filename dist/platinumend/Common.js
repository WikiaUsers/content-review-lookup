/* Any JavaScript here will be loaded for all users on every page load. */

window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'K5msYSe',
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