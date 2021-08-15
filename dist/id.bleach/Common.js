/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */

/***User Tags***/
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data }
        bureaucrat: 'Admin',
        chatmoderator: 'Chat Moderator',
        rollback: 'Beyond Understanding Editor',
    }
};

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Istimewa:WikiActivity","Istimewa:UncategorizedPages","Istimewa:AllPages","Istimewa:Berkas_baru","Istimewa:Perubahan_terbaru"];
importScriptPage('AjaxRC/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "u:dev:ShowHide/code.js",
        "MediaWiki:Common.js/Toggler.js",
        "u:dev:ReferencePopups/code.js"  // Reference Popups, like on Wikipedia
    ]
});