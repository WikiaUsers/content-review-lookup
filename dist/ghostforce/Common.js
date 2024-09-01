/* AjaxRC */
AjaxRCRefreshText = 'Auto-refresh';
ajaxSpecialPages = ["WikiActivity", "Recentchanges"];
 
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
 
/* Link to Discussions Feed */
if (mw.config.get('wgCanonicalSpecialPageName') == 'WikiActivity' || mw.config.get('wgCanonicalSpecialPageName') == 'Recentchanges') {
    $('<li>', {
        id: 'discussrclink',
    }).html('<a href="/wiki/Special:DiscussionsFeed">Discussions Feed</a>')
    .prependTo('.toolbar .tools');
}

/* For [[Template:Icons]] */
$(function () {
	var icons = $('#icons');
    if (icons.length) {
        $('.page-header__meta').after(icons);
        icons.show();
    }
});
 
/*Keeps staff blogs from locking after 30 days of no commenting */
window.LockOldBlogs = {
nonexpiryCategory: "Staff Blogs"
};