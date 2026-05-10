/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Dev Wiki */
// BackToTopButton
window.BackToTopModern = true;

// PreloadTemplates
preloadTemplates_subpage = "case-by-case";

// UserTags
window.UserTagsJS = {
    modules: {
        inactive: 45,
        mwGroups: ["autoconfirmed", "bureaucrat", "content-moderator", "threadmoderator", "rollback", "sysop"],
        newuser: false,
        custom: {Gcheung28: ["founder"]},
        metafilter: {sysop: ["bureaucrat"], autoconfirmed: ["bureaucrat", "founder", "sysop", "mod"]},
        implode: {mod: ["content-moderator", "threadmoderator", "rollback"]},
    },
    tags: {
        autoconfirmed: {title: "Autoconfirmed"},
        blocked: {u: "Blocked", link: "Special:BlockList"},
        bureaucrat: {u: "ADMIN-IMAGENES", link: "OreGairu_Wiki:Administrators", title: "Bureaucrat"},
        inactive: {u: "Inactive", title: "Hasn't edited for 45 days"},
        founder: {u: "Gcheung28", link: "OreGairu_Wiki:Administrators", title: "Founder"},
        notautoconfirmed: {u: "New", title: "New user"},
    },
};

/* Auto Refresh Settings */
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
    ];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 60000;
 
/* Import Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});

//Test for spoiler message
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};