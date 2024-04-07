/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'User:KittenLove1311' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}
dev:ProfileTags.js