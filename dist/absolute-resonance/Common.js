/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'User:Godof.FlameWater' && mw.config.get('wgAction') !== 'edit') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SnowStorm.js',
    ]
});}

window.UserTagsJS = {
    modules: {},
    tags: {
        founder: { u: 'Founder', order: 1 },
        bureaucrat: { u: 'Absolute Resonance Emperor', order: 2 },
        'former-bureaucrat': { u: 'Retired Bureaucrat', order: 3 },
        sysop: { u: 'Heavenly Emperor', order: 4 },
        'former-sysop': { u: 'Retired Administrator', order: 5 },
        'bot-global': { u: 'Global Bot', order: 6 },
        bot: { u: 'Bot', order: 7 },
        'content-moderator': { u: 'King', order: 10 },
        threadmoderator: { u: 'Duke', order: 11 },
        rollback: { u: 'Rollback', order: 13 },
        bannedfromchat: { u: 'Banned from Chat', order: 20 },
        inactive: { u: 'Inactive', order: Infinity } 
    }
};

// Inactive users module (using UserTagsJS)
UserTagsJS.modules.inactive = {
    days: 30, 
    text: 'Inactive', 
    warning: {
        text: 'This user has been inactive for %s days.', 
        days: 7 
    }
};

// Autoconfirmed users module
UserTagsJS.modules.autoconfirmed = true;

// New user module
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // Users are considered "new" if they have less than 7 days AND less than 20 edits
        return days < 7 && edits < 20;
    }
};

// MediaWiki groups to include
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'bannedfromchat'
];

// BackToTopButton Config 
window.BackToTopModern = true;

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 365;
window.lockOldComments.addNoteAbove = true;