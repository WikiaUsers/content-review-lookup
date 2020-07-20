/*USERTAGS*/
window.UserTagsJS = {
        modules: {},
        tags: {
                translator: {u:'Переводчик'},
                newuser: {u:'Новичок'},
                inactive: {u:'Неактивен'},
                founder: {u:'Основатель'},
                bureaucrat: {u:'Бюрократ'},
                admin: {u:'Администратор'},
                headadmin: {u:'Главный Администратор'},
                pagemanager: {u:'Модератор Страниц'},
                chatmod: {u:'Модератор Чата'},
                threadmod: {u:'Модератор Форума'},
                contentmoderator: {u:'Модератор'}
        },
        oasisPlaceBefore: '< h2'
};
UserTagsJS.modules.inactive   = 30;
UserTagsJS.modules.metafilter = {
        'bureaucrat':      ['Основатель', 'Бюрократ'],
        'sysop':           ['Администратор', 'Главный Администратор'],
        'rollback':        ['Модератор страниц'],
        'chatmoderator':   ['Модератор Чата'],
        'threadmoderator': ['Модератор Форума'],
        'contentmoderator': ['Модератор']
};
/*CUSTOM USERTAGS*/
UserTagsJS.modules.custom = {
        'MrExoduso':  ['translator', 'headadmin'],
        'Cure Sky':   ['translator', 'admin'],
        'Hime Shirayuki': ['translator', 'admin'],
        'Washi-washi': ['translator'],
        'WakaFromStarAnis': ['translator'],
        'Maks56893': ['translator', 'contentmoderator'],
        '英四郎': ['translator', 'contentmoderator']
};













importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});