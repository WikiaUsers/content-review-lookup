//UserTags config
window.UserTagsMergeMWGroups = true;
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    tags: {
            'bot': {link: 'Special:ListUsers/bot'},
            'bureaucrat': {link: 'Special:ListUsers/bureaucrat'},
            'chatmoderator': {link: 'Special:ListUsers/chatmoderator'},
            'content-moderator': {link: 'Special:ListUsers/content-moderator'},
            'rollback': {link: 'Special:ListUsers/rollback'},
            'sysop': {link: 'Special:ListUsers/sysop'},
            'threadmoderator': {link: 'Special:ListUsers/threadmoderator'
    }
    },
};
 
//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Recent_posts'];
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];

//LockOldBlogs config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn\'t been commented on for over 30 days. There is no need to comment."
};

//LockForums config
window.LockForums = {
    expiryDays: 30,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
};

//Add border color to PIs
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

//TZclock config
window.TZclockSimpleFormat = true;

//AddRailModule config
window.AddRailModule = [{prepend: true}];

//StatIcons config
window.useIncludedStylesheet = true;