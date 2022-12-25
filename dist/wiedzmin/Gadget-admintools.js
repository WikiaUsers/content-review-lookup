// Admin Tools (Gadget)
// Konfiguracja skryptów
window.WHAMBlockReason = '[[Pomoc:Wandalizm|Wandalizm]]';
window.WHAMDeleteReason = 'Porządki';
window.RevealAnonIP = {
    permissions:    [
        'bureaucrat',
        'sysop',
    ]
};
window.batchDeleteDelay = 10;
window.massRenameDelay = 100;
window.massRenameSummary = 'Grupowa zmiana nazw ([[w:c:dev:MassRename|MassRename]])';
window.MultiUploadoption = { max: 70 };
window.ajaxSpecialPages = [
    'Recentchanges',
    'WikiActivity',
    'Watchlist',
    'Log',
    'Newpages',
];
window.AjaxRCRefreshText = 'Odświeżanie';
window.AjaxRCRefreshHoverText = 'Automatycznie odświeża daną stronę specjalną';
window.ajaxRefresh = 3000;
LIRoptions = {
    delay: 10,
    editSummary: 'Automatyczna aktualizacja linków ([[w:c:dev:FileUsageAuto-update|FileUsageAuto-update]])',
};

// Importy
importArticles({
    type: 'script',
    articles:   [
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:WHAM/code.2.js',
        'u:dev:RevealAnonIP/usercode.js',
        'u:dev:MassRename/code.js',
        'u:dev:AjaxDelete/code.js',
        'u:dev:AjaxPatrol/code.js',
        'u:dev:MultiUpload/code.js',
        'u:dev:NullEditButton/code.js',
        'u:dev:FileUsageAuto-update/code.js',
        'u:dev:DiscussionsActivity.js',
        'u:dev:PageRenameAuto-update/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:UserCheck/code.js',
    ]
});

// Przycisk prowadzący do OZ w nagłówku wiki by Nanaki
$(function() {
    $('.wds-community-header__wiki-buttons a[data-tracking="wiki-activity"]').attr({
        href: '/Special:RecentChanges',
        title: 'Ostatnie zmiany',
        'data-tracking': 'recent-changes',
    });
    $('.wds-community-header__wiki-buttons a[data-tracking="more-recent-changes"]').attr({
        href: '/Special:WikiActivity',
        'data-tracking': 'wiki-activity',
    }).html('Aktywność na wiki');
});