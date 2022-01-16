/* Any JavaScript here will be loaded for all users on every page load. */
window.DiscordBannerSettings = {
    bannerStyle: '1',
    inviteLink: 'TBBuWQB',
};

window.massEditConfig = {
    editInterval: 1500
};
 
window.batchDeleteDelay = 100;
 
window.AjaxCommentDeleteConfig = {
    fastDelete: "The reason for deletion of the comment. You can modify this text!"
};
 
 
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 1000;
 
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
    'Uncategorizedcategories', 'Uncategorizedpages', 'UncategorizediSynergists', 'Uncategorizedtemplates',
    'Unusedcategories', 'UnusediSynergists', 'Unusedtemplates', 'UnusedVideos',
    'Wantedcategories', 'Wantedpages', 'Wantedfiles', 'Wantedtemplates'];
 
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
 
// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Demon King',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Vampire',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Demon',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Synergist',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Synergist',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Synergist',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Synergist'
        },
        inactive: {
            u: 'Deceased',
            title: 'The user hasn\'t edited for last 30 days'
        },
        blocked: {
            u: 'Deceased',
            link: 'Project:Blocking policy'
        },
    },
    modules: {
        stopblocked: false,
        inactive: 30,
        mwGroups: [
            'bureaucrat',
            'sysop',
            'content-moderator',
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
            founder: ['inactive'],
            blocked: ['inactive'],
            poweruser: ['newuser']
        },
    },
};