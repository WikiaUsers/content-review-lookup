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

window.pPreview.defimage = 'https://static.wikia.nocookie.net/nickstory/images/8/86/NO_IMAGE_NICKSTORY.png';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/cnas/images/6/60/No_Image_Available.png';