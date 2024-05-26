(function() {
    // Проверяем, что мы на странице Утерянные_Рекламы_Вики:Топ
    var currentPage = mw.config.get('wgPageName');
    console.log('Текущая страница:', currentPage);
    if (currentPage !== 'Утерянные_Рекламы_Вики:Топ' && currentPage !== 'Лост_Сообщество_Вики:Топ') {
        // console.log('Не на странице Утерянные_Рекламы_Вики:Топ или Лост_Сообщество_Вики:Топ');
        return;
    }

    var templateName = 'Счет';
    var userCounts = {};
    var pageList = {};

    function getPagesWithTemplate(template, continueToken) {
        console.log('Вызов getPagesWithTemplate с continueToken:', continueToken);
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Template:' + template,
            eilimit: 'max',
            eicontinue: continueToken
        }).then(function(data) {
            console.log('Полученные данные из embeddedin:', data);
            var promises = data.query.embeddedin.map(function(page) {
                return processPage(page.title);
            });

            if (data.continue) {
                return Promise.all(promises).then(function() {
                    return getPagesWithTemplate(template, data.continue.eicontinue);
                });
            } else {
                return Promise.all(promises);
            }
        }).catch(function(err) {
            console.error('Ошибка в getPagesWithTemplate:', err);
        });
    }

    function processPage(title) {
        console.log('Обработка страницы:', title);
        return new mw.Api().get({
            action: 'parse',
            page: title,
            prop: 'wikitext'
        }).then(function(data) {
            console.log('Полученный wikitext для', title, ':', data);
            var wikitext = data.parse.wikitext['*'];
            var regex = /\{\{Счет\|([^\}]+)\}\}/g;
            var match;
            while ((match = regex.exec(wikitext)) !== null) {
                var username = match[1].trim();
                userCounts[username] = (userCounts[username] || 0) + 1;
                if (!pageList[username]) {
                    pageList[username] = [];
                }
                pageList[username].push(title);
                console.log('Обновление счетчика для', username, ':', userCounts[username]);
            }
        }).catch(function(err) {
            console.error('Ошибка в processPage:', err);
        });
    }

    function displayTopUsers() {
        console.log('Функция displayTopUsers вызвана');
        var sortedUsers = Object.keys(userCounts)
            .map(function(username) {
                return {
                    name: username,
                    count: userCounts[username],
                    pages: pageList[username]
                };
            })
            .sort(function(a, b) {
                return b.count - a.count;
            });

        var output = '<h2>Топ пользователей по находкам</h2><ol>';
        sortedUsers.forEach(function(user) {
            output += '<li><a href="https://lostadsarchive.fandom.com/ru/wiki/User:' + user.name + '">' + user.name + '</a>: ' + user.count + '<details><summary>Страницы</summary><ol>';
            user.pages.forEach(function(page) {
                output += '<li><a href="https://lostadsarchive.fandom.com/ru/wiki/' + page + '">' + page + '</a></li>';
            });
            output += '</ol></details></li>';
        });
        output += '</ol>';

        $('#mw-content-text').html(output);
        console.log('Топ пользователей отображен:', output);
    }

    $(function() {
        console.log('Начало обработки');
        getPagesWithTemplate(templateName).then(displayTopUsers).catch(function(err) {
            console.error('Ошибка в основном процессе:', err);
        });
    });
})();