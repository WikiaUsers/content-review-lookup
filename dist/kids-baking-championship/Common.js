/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'User:KittenLove1311' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}
dev:ProfileTags.js

window.SpoilerAlertJS = {
    question: 'This page contains a spoiler. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};