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
                contentmoderator: {u:'Модератор'},
                designer: {u:'Дизайнер'}
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
        'Shockmon':  ['designer', 'headadmin'],
        'EtoRwiki':   ['translator', 'admin'],
        '英四郎': ['translator', 'contentmoderator']
};