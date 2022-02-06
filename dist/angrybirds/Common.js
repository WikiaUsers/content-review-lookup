/* Any JavaScript here will be loaded for all users on every page load. */

//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
};

//DiscordBanner config
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'KHkfdRNYAM', // Invite for AB Wiki server
    prependToRail: true
    //noRail: false 
};

//UploadMultipleFiles config
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UploadMultipleFiles.js',
    ]
});

//LinkPreview config
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);

window.pPreview.defimage = 'https://static.wikia.nocookie.net/angrybirds/images/5/54/Image_Not_Avalible_%28New%29.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/angrybirds/images/5/54/Image_Not_Avalible_%28New%29.png';