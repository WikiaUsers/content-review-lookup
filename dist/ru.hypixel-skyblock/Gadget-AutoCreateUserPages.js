/* jshint
    esversion: 5, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    sub: true, forin: false,
    -W082, -W084
*/

/* global mw, BannerNotification */

// settings
mw.loader.using('mediawiki.user').then(function () {
    if (mw.user.isAnon()) return;

    window.AutoCreateUserPagesConfig = window.AutoCreateUserPagesConfig || {
        content: {
            2: '{{Userpage Links|\n\
*[[Special:Mypage/Песочница|Моя Песочница]]\n\
*[[Special:Mypage/Проекты|Проекты]]\n\
*[[Special:Mypage/Быстрое копирование|Быстрое копирование]]\n\
}}\n\
Это ваша страница пользователя. Пожалуйста, отредактируйте эту страницу, чтобы рассказать сообществу о себе!\n\
\n\
== Мои любимые страницы ==\n\
* Добавьте ссылки на ваши любимые страницы в вики здесь!\n\
* Любимая страница #2\n\
* Любимая страница #3\n\
\n\
== Мой прогресс в Skyblock ==\n\
*Игровое имя: Добавьте свое игровое имя здесь!\n\
*Оружие: добавьте свое оружие(я) сюда!\n\
*Броня: Добавьте свою броню сюда!',
        },
        summary: 'Автоматическое создание страницы пользователя',
        nesummary: 'Автоматическое редактирование нуля для пользователя',
        notify: '<b>Страницы пользователей успешно созданы</b><br /><a href="/wiki/User:$2">Вот ссылка на вашу страницу пользователя, $1!</a>',
    };

    importArticles({
        type: 'script',
        articles: [
            'MediaWiki:Gadget-AutoCreateUserPages/code.js',
        ],
    });
});