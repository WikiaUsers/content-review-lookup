importArticles({
type: 'script',
articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:Countdown/code.js', // http://dev.fandom.com/wiki/Countdown
        'u:dev:MediaWiki:BackToTopButton/code.js', // http://dev.fandom.com/wiki/BackToTopButton
        'u:dev:MediaWiki:DiscordIntegrator/code.js', // http://dev.fandom.com/wiki/DiscordIntegrator
        'u:dev:MediaWiki:DiscussionsFeed/code.js', // http://dev.fandom.com/wiki/DiscussionsFeed
        'u:dev:MediaWiki:AddRailModule/code.js', // http://dev.fandom.com/wiki/AddRailModule
]
});
 
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});