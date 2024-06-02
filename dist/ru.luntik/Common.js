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
    if (currentPage !== 'Лунтик_Wiki:Топ') {
        return;
    }

    var templateName = 'Серия';
    var characterCounts = {};
    var pageList = {};

    function getPagesWithTemplate(template, continueToken) {
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Шаблон:' + template,
            eilimit: 'max',
            eicontinue: continueToken
        }).then(function(data) {
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
        return new mw.Api().get({
            action: 'parse',
            page: title,
            prop: 'wikitext'
        }).then(function(data) {
            var wikitext = data.parse.wikitext['*'];

            // Извлекаем информацию из шаблона Серия
            var episodeInfo = wikitext.match(/\{\{Серия\s*\|([^}]*)\}\}/);
            var episode = 'неизвестен';
            var season = 'неизвестен';
            if (episodeInfo) {
                var params = episodeInfo[1].split(/\|\s*/);  // Split on pipe with optional leading/trailing whitespace
                params.forEach(function(param) {
                    var parts = param.split('=');
                    if (parts.length === 2) {
                        var key = parts[0].trim();
                        var value = parts[1].trim();
                        if (key === 'Номер серии') {
                            episode = parseInt(value, 10);
                        }
                        if (key === 'Сезон') {
                            season = value;
                        }
                    }
                });
            }

            // Извлекаем информацию о персонажах
            var charactersSection = wikitext.match(/==\s*Персонажи\s*==([\s\S]*?)(==|$)/i);
            if (charactersSection) {
                // Извлекаем строки, содержащие персонажей, игнорируя подзаголовки
                var characters = charactersSection[1].match(/^\*\s*\[\[([^\]]+)\]\]/gm);
                if (characters) {
                    characters.forEach(function(character) {
                        var characterNameMatch = character.match(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/);
                        if (characterNameMatch) {
                            var characterName = characterNameMatch[1].trim();  // Extract character name, ignoring alias text
                            characterCounts[characterName] = (characterCounts[characterName] || 0) + 1;
                            if (!pageList[characterName]) {
                                pageList[characterName] = [];
                            }
                            pageList[characterName].push({
                                title: title,
                                episode: episode,
                                season: season
                            });
                        }
                    });
                }
            }
        }).catch(function(err) {
            console.error('Ошибка в processPage:', err);
        });
    }

    function displayTopCharacters() {
        var sortedCharacters = Object.keys(characterCounts)
            .map(function(character) {
                return {
                    name: character,
                    count: characterCounts[character],
                    pages: pageList[character].sort(function(a, b) {
                        return a.episode - b.episode; // Сортировка по номеру серии
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
                output += '<li><b><a href="https://luntik.fandom.com/ru/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', эп. ' + page.episode +  '(сезон ' + page.season + ')</li>';
            });
            output += '</ul></details></li>';
        });
        output += '</ol>';

        $('#mw-content-text').html(output);
    }

    $(function() {
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