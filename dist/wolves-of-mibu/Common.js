/* Any JavaScript here will be loaded for all users on every page load. */
window.railWAM = {
    logPage: "Project:WAM Log"
};
 
window.massEditConfig = {
    editInterval: 1500
};
 
window.batchDeleteDelay = 100;
 
window.AjaxCommentDeleteConfig = {
    fastDelete: "The reason for deletion of the comment. You can modify this text!"
};

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log/Auto-Statistics",
    loadOnPage:'Special:WikiActivity',
    autoLogForUsers:["User:DyslexicOkami"],
    loadOnNamespace:[-1],
};
 
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};
 
/**** UploadInFile ****/
window.needsLicense = true;
window.allowMultiUpload = true;
 
/* Auto Refresh */
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
window.BackToTopModern = true;
 
window.topLevelCat = 'Browse';
window.cacheSkip = [];
window.cacheSkipLimit = 1000;
window.CacheCheckRemove = false;
 
window.cacheSkip = ['Specialpages', 'Deadendpages', 'Lonelypages',
    'Uncategorizedcategories', 'Uncategorizedpages', 'Uncategorizedimages', 'Uncategorizedtemplates',
    'Unusedcategories', 'Unusedimages', 'Unusedtemplates', 'UnusedVideos',
    'Wantedcategories', 'Wantedpages', 'Wantedfiles', 'Wantedtemplates'];
 
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
 
// User tags
window.UserTagsJS = {
    tags: {
        'founder': {
            u: 'God',
            link: 'Project:Bureaucrats'
        },
        'bureaucrat': {
            u: 'Legend',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Hero',
            link: 'Project:Administrators'
        },
        'content-moderator': {
            u: 'Champion',
            link: 'Project:Moderator'
        },
        'threadmoderator': {
            u: 'Royal Guard',
            link: 'Project:Thread Moderator'
        },
        'chatmoderator': {
            u: 'Knight',
            link: 'Project:Chat Moderator'
        },
        'rollback': {
            u: 'Hunter',
            link: 'Project:Rollback'
        },
        'poweruser': {
            u: 'Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Adventurer',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Commoner'
        },
        inactive: {
            u: 'Wanderer',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Deceased',
        },
    },
    modules: {
        stopblocked: false,
        inactive: 30,
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
            'threadmoderator',
            'chatmoderator',
            'rollback',
            'user',
            'autoconfirmed-user',
            'bot',
            'bot-global',
            'blocked',
            'nonuser'
        ],
        autoconfirmed: true,
        newuser: true,
        metafilter: {
            'content-moderator': ['bureaucrat'],
            rollback: [
                'bureaucrat',
                'content-moderator'
            ],
            threadmoderator: ['content-moderator'],
            user: [
                'bureaucrat',
                'sysop',
                'content-moderator',
                'threadmoderator',
                'chatmoderator',
                'rollback',
                'translator',
                'newuser',
                'inactive',
                'blocked'
            ],
            bot: ['bot-global'],
            newuser: ['inactive'],
            bureaucrat: ['inactive'],
            sysop: ['inactive'],
            blocked: ['inactive'],
            poweruser: ['newuser']
        },
    },
};