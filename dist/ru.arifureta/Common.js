/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
window.massEditConfig = {
    editInterval: 1500
};
 
window.batchDeleteDelay = 100;
 
window.AjaxCommentDeleteConfig = {
    fastDelete: "Причина удаления комментария. Вы можете изменить этот текст!"
};
 
 
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 1000;
 
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Этот блог считается заархивированным, поскольку в нем не было комментариев в течение <expiryDays> дн. Пожалуйста, не поднимайте этот блог!",
    nonexpiryCategory: "Никогда не архивированные блоги"
};
 
/**** Загрузка файлов ****/
window.needsLicense = true;
window.allowMultiUpload = true;
 
/* Автоматическое обновление */
window.ajaxPages = ["Некоторые часто обновляемые страницы"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Автоматическое обновление';
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
 
window.BackToTopModern = true;
 
window.topLevelCat = 'Browse';
window.cacheSkip = ['Specialpages', 'Deadendpages', 'Lonelypages',
    'Uncategorizedcategories', 'Uncategorizedpages', 'UncategorizediSynergists', 'Uncategorizedtemplates',
    'Unusedcategories', 'UnusediSynergists', 'Unusedtemplates', 'UnusedVideos',
    'Wantedcategories', 'Wantedpages', 'Wantedfiles', 'Wantedtemplates'];
window.cacheSkipLimit = 1000;
window.CacheCheckRemove = false;
 
 
if (mw.config.get('wgUserGroups').indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
  importScriptPage('MediaWiki:MassRename/code.js', 'dev');
}
 
// User tags
window.UserTagsJS = {
    tags: {
        'bureaucrat': {
            u: 'Король Демонов',
            link: 'Project:Bureaucrats'
        },
        'sysop': {
            u: 'Вампир',
            link: 'Project:Sysops'
        },
        'content-moderator': {
            u: 'Демон',
            link: 'Project:Content moderator'
        },
        'poweruser': {
            u: 'Синергист',
            link: 'Project:Autoconfirmed users'
        },
        'autoconfirmed-user': {
            u: 'Синергист',
            link: 'Project:Autoconfirmed users'
        },
        'user': {
            u: 'Синергист',
            link: 'Project:Autoconfirmed users'
        },
        'newuser': {
            u: 'Синергист'
        },
        inactive: {
            u: 'Мёртв',
            title: 'Пользователь ничего не редактировал последние 30 дней.'
        },
        blocked: {
            u: 'Мёртв',
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