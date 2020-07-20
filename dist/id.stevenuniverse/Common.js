//UserTags config
window.UserTagsMergeMWGroups = true;
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        autoconfirmed: true,
        mwGroups: ['chatmoderator', 'patroller']
    },
    oasisPlaceBefore: '> h1'
};

//LockForums config
var LockForums = {
    expiryDays: 14,
    expiryMessage: 'Utas ini telah diarsipkan karena tidak ada aktivitas.'
};

//Add border color to PIs
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

//AjaxRC config
window.ajaxRefresh = 30000;
window.ajaxPages = ['Blog:Posting_terbaru'];
window.AjaxRCRefreshText = 'Perbarui otomatis';
window.AjaxRCRefreshHoverText = 'Secara otomatis menyegarkan halaman ini';
window.ajaxSpecialPages = ['WikiActivity', 'Recentchanges', 'Watchlist', 'Log'];

//Make ReportLog visible to admins and patrollers
if (/sysop|content-moderator/.test(mw.config.get('wgUserGroups'))) {
    importArticle({
        type: 'script',
        article: 'u:dev:AddRailModule/code.js',
    });
}

//Make ViewRemoved only viewable to staff
if (/sysop|content-moderator|threadmoderator|chatmoderator/.test(mw.config.get('wgUserGroups'))) {
    importArticle({
        type: 'script',
        article: 'u:dev:ViewRemoved/code.js'
    });
}

//TZclock config
window.TZclockSimpleFormat = true;

//Rollback config
window.RollbackWikiDisable = true;

//Prevent regular users from creating new threads on the Wikia Updates board
if (
    mw.config.get('wgPageName') === 'Board:Wikia_Updates' &&
    !/sysop|threadmoderator/.test(mw.config.get('wgUserGroups'))
) {
    mw.util.addCSS('.Forum .DiscussionBox .message:before { content: none; }');
    $('#ForumNewMessage > img').hide();
    $('.Forum .DiscussionBox .message')
        .css('margin', 'auto')
        .html('Maaf, kamu tidak boleh membuat utas baru di forum ini. Silakan lihat <a href="/wiki/Special:Forum">Indeks Forum</a> untuk menemukan forum yang lebih tepat.');
}