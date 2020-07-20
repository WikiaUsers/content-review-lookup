PurgeButtonText = 'Purge';
 
importArticles({
type: 'script',
articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js', // http://dev.wikia.com/wiki/PurgeButton
        'u:dev:MediaWiki:Countdown/code.js', // http://dev.wikia.com/wiki/Countdown
        'u:dev:MediaWiki:BackToTopButton/code.js', // http://dev.wikia.com/wiki/BackToTopButton
        'u:dev:MediaWiki:DiscordIntegrator/code.js', // http://dev.wikia.com/wiki/DiscordIntegrator
        'u:dev:MediaWiki:DiscussionsFeed/code.js', // http://dev.wikia.com/wiki/DiscussionsFeed
        'u:dev:MediaWiki:AddRailModule/code.js', // http://dev.wikia.com/wiki/AddRailModule
]
});
 
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});