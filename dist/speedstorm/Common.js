/* Any JavaScript here will be loaded for all users on every page load. */
/* Discord Banner settings */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'disneyspeedstorm',
    prependToRail: true,
    noRail: false
};

/*Multi-upload*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UploadMultipleFiles.js',
    ]
});

/*Images*/
$('#content img').bind('contextmenu', function(e) {
    return false;
});

$('#content').on('contextmenu', 'img', function(e) {
    return false;
});

$('#content img').attr('draggable', false).on({
    'contextmenu': function(e) {
        return false;
    }
});