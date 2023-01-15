/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
   type: "script",
   articles: [
       'w:c:dev:UserTags/code.js',
       'u:dev:MessageWallUserTags/code.js',
   ]
});
window.UserTagsJS = {
        modules: {},
        tags: {
                founder: {u:'Founder'},
                bureaucrat: {u:'Bureaucrat'},
                sysop: {u:'Admin'},
                threadmoderator: {u:'Moderator'},
                chatmoderator: {u:'Chat Moderator'},
                rollback: {u:'Rollback'},
                coder: {u:'Wiki Coder'},
                gold: {u:'Golden Freddy'},
                scratch: {u:'Vinyl Scratch'},
                arca: {u:'Memelord'},
                pun: {u:'Punmaster'},
                wolf: {u:'Blood Wolf'},
                gothic: {u:'Mad Leader'},
                smash: {u:'Shibbles'},
                rainbow: {u:'Amnesia Rainbow'},
                kitty: {u:'Gothic Kitty'},
                bot: {u:'DYR Wikibot'},
                science: {u:'Do it for science'},
                potato: {u:'Potato Lover'},
        }
};
UserTagsJS.modules.custom = {
        'SketchNebula': ['founder', 'coder', 'gold', 'scratch'],
        'GothicMadHatter': ['gothic', 'kitty'],
        'Arca Asami': ['arca', 'pun', 'wolf'],
        'Rainbowsmash34': ['smash', 'rainbow'],
        'Renbot': ['bot'],
        'Snowlfake champion': ['science', 'potato'],
};
UserTagsJS.modules.metafilter = {
        'inactive': ['sysop', 'bureaucrat'], 
        'sysop': ['bureaucrat', 'founder'],
        'chatmoderator': ['sysop', ['patroller', 'rollback']],
};
window.MessageWallUserTags = {
    tagColor: '#FFFFFF',
    glow: true,
    glowSize: '22px',
    glowColor: '#3104B4',
    users: {
        'SketchNebula': 'Founder',
        'Arca Asami': 'Admin',
        'Rainbowsmash34': 'Admin',
        'Renbot': 'Wikibot',
        'Snowflake champion': 'Rollback'
    }
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* End of the {{USERNAME}} replacement */