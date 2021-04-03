/* Any JavaScript here will be loaded for all users on every page load. */

/* Rail DiscordBanner */
 
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'rQj4CMp',
    prependToRail: false,
    noRail: false
};


/* FloatingTOC https://dev.fandom.com/wiki/FloatingToc*/
window.FloatingToc = {
    speed: 500,
    auto: false,
    enableKey: false
};




/* DiscussionTemplates https://dev.fandom.com/wiki/DiscussionTemplates*/
window.DiscussionTemplates = {
    templates: {
        'Warning': {
            name: 'Template:Vandalism',
            title: 'Warning'
        },
        'Banned': {
            name: 'Template:Ban1',
            title: 'Banned'
        },
        'Permaban': {
            name: 'Template:Ban2_-_Permaban',
            title: 'Permaban'
        }
    },

    allowedGroups: ['sysop', 'rollback', 'content-moderator', 'threadmoderator']
};