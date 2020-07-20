/* Any JavaScript here will be loaded for all users on every page load. */
window.ArchiveBoards = {
    boards: ["Fun and Games", "Announcements", "News", "Discussions", "Voting"],
};
 /* AjaxRC */
AjaxRCRefreshText = 'Auto-refresh';
ajaxSpecialPages = ["WikiActivity", "Recentchanges"];
 
/* Spoiler alert */
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        chatmoderator: { u: 'Discord Moderator' },
        imagecontrol: { u: 'Image control' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagecontrol',
            'rollback',
            'bot'
        ]
    }
};
 
// Imports LinkImagePopup by Bobogoobo im not sure if this works sorry

/* Randomize wiki word-marks */
$(function() {
    var images = [
        'https://vignette.wikia.nocookie.net/fandomofhalloweenspecials/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200423033304',
        'https://vignette.wikia.nocookie.net/fandomofhalloweenspecials/images/8/89/Wiki-wordmark.png/revision/20200423033302'
      ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

/* Massscript limits */
window.MassCategorizationGroups = ['sysop', 'imagecontrol', 'bot'];