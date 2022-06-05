/* -----Меню-----

=> ImportJS — список импортируемых скриптов
=> Fandomdesktop.js — скрипты к скину Fandomdesktop
=> OldComments.js — блокировка ответов к старым комментариям
=> Common.js — вы здесь
=> ProfileTags — плашки в профиле
=> Project:Medals — награды в профиле

*/

/* ========== DiscussionTemplates ========== */
window.DiscussionTemplates = {
    templates: {
        'Оскорбление': {
            name: 'Шаблон:Предупреждение/оскорбление',
            title: 'Оскорбление'
        },
        'Троллинг': {
            name: 'Шаблон:Предупреждение/троллинг',
            title: 'Троллинг'
        },
        'Спор': {
            name: 'Шаблон:Предупреждение/спор',
            title: 'Спор'
        },
        'Агрессия': {
            name: 'Шаблон:Предупреждение/агрессия',
            title: 'Агрессия'
        },
        'Субкритика': {
            name: 'Шаблон:Предупреждение/субкритика',
            title: 'Субкритика'
        },
        'Маты': {
            name: 'Шаблон:Предупреждение/маты',
            title: 'Маты'
        },
        'Оффтоп': {
            name: 'Шаблон:Предупреждение/оффтоп',
            title: 'оффтоп'
        },
        'Флуд': {
            name: 'Шаблон:Предупреждение/флуд',
            title: 'Флуд'
        },
        'Капс': {
            name: 'Шаблон:Предупреждение/капс',
            title: 'Капс'
        },
        'Спам': {
            name: 'Шаблон:Предупреждение/спам',
            title: 'Спам'
        },
        'Реклама': {
            name: 'Шаблон:Предупреждение/реклама',
            title: 'Реклама'
        },
        'Статпад': {
            name: 'Шаблон:Предупреждение/статпад',
            title: 'Статпад'
        },
        'Плохие правки': {
            name: 'Шаблон:Предупреждение/плохиеправки',
            title: 'Плохие правки'
        },
        '18+': {
            name: 'Шаблон:Предупреждение/18',
            title: '18+'
        },
        'Твинк': {
            name: 'Шаблон:Предупреждение/твинк',
            title: 'Твинк'
        },
        'Плохие блоги': {
            name: 'Шаблон:Предупреждение/плохиеблоги',
            title: 'Плохие блоги'
        },
        'Вне ценза': {
            name: 'Шаблон:Предупреждение/внеценза',
            title: 'Вне ценза'
        },
        'Бессмыслица': {
            name: 'Шаблон:Предупреждение/бессмыслица',
            title: 'Бессмыслица'
        },
        'Блокировка': {
            name: 'Шаблон:Блокировка',
            title: 'Блокировка'
        },
    },
    allowedGroups: ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator']
};

/* ========== FastDelete ========== */
window.fdButtons = [
    {
        summary: 'Вандализм',
        label: 'Вандал'
    },
    {
        summary: 'Мусор',
        label: 'Мусор'
    },
    {
        summary: 'Игра не проходит ценз',
        label: 'Ценз'
    }
];

/* ========== AddRailModule ========== */
window.AddRailModule = ['Шаблон:Статья_месяца'];

/* ========== LockOldBlogs ========== */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Доступ к комментариям закрыт, так как блог не комментировали <expiryDays> дней"
}

/* ========== Выделение комментариев статусников ========== */
setInterval(function () {
    $('.wds-avatar a[href$="BroSafari"]').closest('.Reply, .Reply_body__PM9kM').addClass('Bur');
    $('.wds-avatar a[href$="Cyberpunk%20Ginger"]').closest('.Reply, .Reply_body__PM9kM').addClass('Admin');
    $('.wds-avatar a[href$="Cyberpunk_Ginger"]').closest('.Reply, .Reply_body__PM9kM').addClass('Admin');
    $('.wds-avatar a[href$="MasterKart"]').closest('.Reply, .Reply_body__PM9kM').addClass('Admin');
    $('.wds-avatar a[href$="Luchezze"]').closest('.Reply, .Reply_body__PM9kM').addClass('Admin');
    $('.wds-avatar a[href$="Stal0ker"]').closest('.Reply, .Reply_body__PM9kM').addClass('Contmod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0%20%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="Professor_Fris"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="Professor%20Fris"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
    $('.wds-avatar a[href$="%D0%95%D0%BB%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BE%D0%BD"]').closest('.Reply, .Reply_body__PM9kM').addClass('Dismod');
}, 500 );