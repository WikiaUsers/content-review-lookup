/* ------
PLEASE don't edit this without CastellarCygnus' permission
JS breaks VERY easily! 
Imports are in ImportJS
Thanks!
------ */

/* --- User Tags --- */
window.UserTagsJS = {
    modules: {},
    tags: {
        founder: {u:'Founder'},
        bureaucrat: {u:'Bureaucrat'},
        sysop: {u:'Administrator'},
        threadmoderator: {u:'Discussions Moderator'},
        chatmoderator: {u:'Chat Moderator'},
        coder: {u:'Coder'},
        alli1: {u:'Meme Queen'},
        alli2: {u:'Clod Queen'},
        alli3: {u:'Code Queen'},
        cas1: {u:'Bamhammer'},
        neon: {u:'Best Sc00t'},
        }
};
UserTagsJS.modules.custom = {
 
        'AestheticsAllY': ['alli1','alli2','coder','alli3'],
        'Cherrybombed': ['founder','coder','cas1'],
        'Neon320': ['neon'],
};
UserTagsJS.modules.metafilter = {
    bureaucrat: ['founder'],
    sysop: ['bureaucrat', 'founder'],
    'content-moderator': ['temp', 'sysop', 'bureaucrat'],
    threadmoderator: ['sysop', 'bureaucrat'],
    chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator']
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */

/* Auto refresh */
window.ajaxPages = [
    "Special:NewFiles",
    "Blog:Recent posts",
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];

/* message block */
window.MessageBlock = {
    title : 'Blocked.',
    message : 'This user has been blocked for $2 for the following offence(s): "$1"',
    autocheck : true
};