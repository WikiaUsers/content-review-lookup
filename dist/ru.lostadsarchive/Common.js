/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автор: Rendann */
/* Закрытие форума */
$(function() {
    if (mw.config.get( 'wgNamespaceNumber' ) == '2000' && mw.config.get( 'wgUserGroups' ).indexOf('sysop') === -1) {
        $('#ForumNewMessage').replaceWith('<blockquote class="message">Форум отключен. Общение участников теперь ведётся в <a href="https://luntik.fandom.com/ru/f">обсуждениях</a></blockquote>');
    }
});

// AJAX-обновление некоторых страниц (выбор страниц)
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемая подсказка


/* Топ Персонажей в страницах серий, MarkKond201 */
(function() {
    // Проверяем, что мы на странице Лунтик_Wiki:Топ
    var currentPage = mw.config.get('wgPageName');
    console.log('Текущая страница:', currentPage);
    if (currentPage !== 'Лунтик_Wiki:Топ') {
        console.log('Не на странице Лунтик_Wiki:Топ');
        return;
    }

    var templateName = 'Серия';
    var characterCounts = {};
    var pageList = {};

    function getPagesWithTemplate(template, continueToken) {
        console.log('Вызов getPagesWithTemplate с continueToken:', continueToken);
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Шаблон:' + template,
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
            
            // Извлекаем информацию из шаблона Серия
            var episodeInfo = wikitext.match(/\{\{Серия\s*\|([^}]*)\}\}/);
            var episode = 'неизвестен';
            var season = 'неизвестен';
            if (episodeInfo) {
                console.log('Найден шаблон Серия в', title);
                var params = episodeInfo[1].split('|');
                params.forEach(function(param) {
                    var parts = param.split('=');
                    if (parts[0].trim() === 'Номер серии') {
                        episode = parseInt(parts[1].trim(), 10);
                    }
                    if (parts[0].trim() === 'Сезон') {
                        season = parts[1].trim();
                    }
                });
            } else {
                console.log('Шаблон Серия не найден в', title);
            }

            console.log('Информация о серии:', { title: title, episode: episode, season: season });

            // Извлекаем информацию о персонажах
            var charactersSection = wikitext.match(/==\s*Персонажи\s*==([\s\S]*?)(==|$)/i);
            if (charactersSection) {
                var characters = charactersSection[1].match(/\*\s*\[\[([^\]]+)\]\]/g);
                if (characters) {
                    characters.forEach(function(character) {
                        var characterName = character.match(/\[\[([^\]]+)\]\]/)[1].trim();
                        characterCounts[characterName] = (characterCounts[characterName] || 0) + 1;
                        if (!pageList[characterName]) {
                            pageList[characterName] = [];
                        }
                        pageList[characterName].push({
                            title: title,
                            episode: episode,
                            season: season
                        });
                        console.log('Обновление счетчика для', characterName, ':', characterCounts[characterName]);
                    });
                } else {
                    console.log('Персонажи не найдены в', title);
                }
            } else {
                console.log('Секция Персонажи не найдена в', title);
            }
        }).catch(function(err) {
            console.error('Ошибка в processPage:', err);
        });
    }

    function displayTopCharacters() {
        console.log('Функция displayTopCharacters вызвана');
        var sortedCharacters = Object.keys(characterCounts)
            .map(function(character) {
                return {
                    name: character,
                    count: characterCounts[character],
                    pages: pageList[character].sort(function(a, b) {
                        return a.episode - b.episode;
                    })
                };
            })
            .sort(function(a, b) {
                return b.count - a.count;
            });

        var output = '<h2>Топ персонажей</h2><ol>';
        sortedCharacters.forEach(function(character) {
            output += '<li><a href="https://luntik.fandom.com/ru/wiki/' + character.name + '">' + character.name + '</a>: ' + character.count + '<details><summary>Серии</summary><ul>';
            character.pages.forEach(function(page) {
                output += '<li><a href="https://luntik.fandom.com/ru/wiki/' + page.title + '">' + page.title + '</a>: ' + ', эп. ' + page.episode + ' (сезон ' + page.season + ')</li>';
            });
            output += '</ul></details></li>';
        });
        output += '</ol>';

        $('#mw-content-text').html(output);
        console.log('Топ персонажей отображен:', output);
    }

    $(function() {
        console.log('Начало обработки');
        getPagesWithTemplate(templateName).then(displayTopCharacters).catch(function(err) {
            console.error('Ошибка в основном процессе:', err);
        });
    });
})();


/* Кнопки в редакторе исходного кода для тире и кавычек-ёлочек */
if ( mwCustomEditButtons ) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sy233-ms/images/c/c2/Кавычки.png/revision/latest?cb=20180704114832&path-prefix=ru",
		"speedTip": "Кавычки",
		"tagOpen": "«",
		"tagClose": "»",
		"sampleText": "Введите текст"
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/sy233-ms/images/5/56/Дефис.png/revision/latest?cb=20180704115844&path-prefix=ru",
		"speedTip": "Тире",
		"sampleText": "—"
	};
}