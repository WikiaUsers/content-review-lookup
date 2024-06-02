/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Скрипт на Барбоскины_вики:Топ от MarkKond201, сделан с любовью */
(function() {
    // Проверяем, что мы на странице Барбоскины_вики:Топ
    var currentPage = mw.config.get('wgPageName');
    if (currentPage !== 'Барбоскины_вики:Топ') {
        return;
    }

    var templateName = 'Эпизод_(Серия)';
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
            var episodeInfo = wikitext.match(/\{\{Эпизод_\(Серия\)\s*\|([^}]*)\}\}/) || wikitext.match(/\{\{Эпизод \(Серия\)\s*\|([^}]*)\}\}/);
            var episode = 'неизвестен';
            var season = 'неизвестен';
            if (episodeInfo) {
                var params = episodeInfo[1].split(/\|\s*/);  // Split on pipe with optional leading/trailing whitespace
                params.forEach(function(param) {
                    var parts = param.split('=');
                    if (parts.length === 2) {
                        var key = parts[0].trim();
                        var value = parts[1].trim();
                        if (key === 'эпизод') {
                            episode = parseInt(value, 10);
                        }
                        if (key === 'сезон') {
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
            output += '<li><a href="https://barboskiny.fandom.com/ru/wiki/' + character.name + '">' + character.name + '</a>: ' + character.count + '<details><summary>Серии</summary><ul>';
            character.pages.forEach(function(page) {
                output += '<li><b><a href="https://barboskiny.fandom.com/ru/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', эп. ' + page.episode +  '(сезон ' + page.season + ')</li>';
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