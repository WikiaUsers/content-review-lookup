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
//removed temporarily due to spam/vandalism

//LinkPreview config
window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);

window.pPreview.defimage = 'https://static.wikia.nocookie.net/angrybirds/images/6/6c/Image_Not_Available.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/angrybirds/images/6/6c/Image_Not_Available.png';