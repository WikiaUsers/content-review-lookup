/* Any JavaScript here will be loaded for all users on every page load. */
/* Топ Персонажей в страницах серий, MarkKond201 */
(function() {
    // Проверяем, что мы на странице Luntik_Wiki:Топ
    var currentPage = mw.config.get('wgPageName');
    if (currentPage !== 'Luntik_Wiki:Top') {
        return;
    }

    var templateName = 'Episode';
    var characterCounts = {};
    var pageList = {};

    function getPagesWithTemplate(template, continueToken) {
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Template:' + template,
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
            var episodeInfo = wikitext.match(/\{\{Episode\s*\|([^}]*)\}\}/);
            var episode = 'undefined';
            var season = 'undefined';
            if (episodeInfo) {
                var params = episodeInfo[1].split(/\|\s*/);  // Split on pipe with optional leading/trailing whitespace
                params.forEach(function(param) {
                    var parts = param.split('=');
                    if (parts.length === 2) {
                        var key = parts[0].trim();
                        var value = parts[1].trim();
                        if (key === 'Serial number') {
                            episode = parseInt(value, 10);
                        }
                        if (key === 'Season') {
                            season = value;
                        }
                    }
                });
            }

            // Извлекаем информацию о персонажах
            var charactersSection = wikitext.match(/==\s*Characters\s*==([\s\S]*?)(==|$)/i);
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

        var output = '<h2>Top list</h2><ol>';
        sortedCharacters.forEach(function(character) {
            output += '<li><a href="https://luntik.fandom.com/wiki/' + character.name + '">' + character.name + '</a>: ' + character.count + '<details><summary>Episodes</summary><ul>';
            character.pages.forEach(function(page) {
                output += '<li><b><a href="https://luntik.fandom.com/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', ep. ' + page.episode +  '(season ' + page.season + ')</li>';
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


/* Скрипт на Luntik_Wiki:Locations от MarkKond201, сделан с любовью */
(function() {
    // Проверяем, что мы на странице Барбоскины_вики:Топ_локаций
    var currentPage = mw.config.get('wgPageName');
    if (currentPage !== 'Luntik_Wiki:Locations') {
        return;
    }

    var templateName1 = 'Episode';
    var locationCounts = {};
    var pageList1 = {};
    var backgroundLocationCounts = {};
    var pageList2 = {};

    function getPagesWithTemplate1(template, continueToken) {
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Template:' + template,
            eilimit: 'max',
            eicontinue: continueToken
        }).then(function(data) {
            var promises = data.query.embeddedin.map(function(page) {
                return processPage1(page.title);
            });

            if (data.continue) {
                return Promise.all(promises).then(function() {
                    return getPagesWithTemplate1(template, data.continue.eicontinue);
                });
            } else {
                return Promise.all(promises);
            }
        }).catch(function(err) {
            console.error('Ошибка в getPagesWithTemplate1:', err);
        });
    }

    function processPage1(title) {
        return new mw.Api().get({
            action: 'parse',
            page: title,
            prop: 'wikitext'
        }).then(function(data) {
            var wikitext = data.parse.wikitext['*'];

            // Извлекаем информацию из шаблона Серия
            var episodeInfo = wikitext.match(/\{\{Episode\s*\|([^}]*)\}\}/);
            var episode = 'undefined';
            var season = 'undefined';
            if (episodeInfo) {
                var params = episodeInfo[1].split(/\|\s*/);  // Split on pipe with optional leading/trailing whitespace
                params.forEach(function(param) {
                    var parts = param.split('=');
                    if (parts.length === 2) {
                        var key = parts[0].trim();
                        var value = parts[1].trim();
                        if (key === 'Serial number') {
                            episode = parseInt(value, 10);
                        }
                        if (key === 'Season') {
                            season = value;
                        }
                    }
                });
            }

            // Извлекаем информацию о локациях
            var locationsSection = wikitext.match(/==\s*Locations\s*==([\s\S]*?)(==|$)/i);
            if (locationsSection) {
                var locations = locationsSection[1].match(/^\*\s*\[\[([^\]]+)\]\]/gm);
                if (locations) {
                    locations.forEach(function(location) {
                        var locationNameMatch = location.match(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/);
                        if (locationNameMatch) {
                            var locationName = locationNameMatch[1].trim();  // Extract location name, ignoring alias text
                            locationCounts[locationName] = (locationCounts[locationName] || 0) + 1;
                            if (!pageList1[locationName]) {
                                pageList1[locationName] = [];
                            }
                            pageList1[locationName].push({
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

    function displayTopLocations() {
        var sortedLocations = Object.keys(locationCounts)
            .map(function(location) {
                return {
                    name: location,
                    count: locationCounts[location],
                    pages: pageList1[location].sort(function(a, b) {
                        return a.episode - b.episode; // Сортировка по номеру серии
                    })
                };
            })
            .sort(function(a, b) {
                return b.count - a.count;
            });

        var sortedBackgroundLocations = Object.keys(backgroundLocationCounts)
            .map(function(location) {
                return {
                    name: location,
                    count: backgroundLocationCounts[location],
                    pages: pageList2[location].sort(function(a, b) {
                        return a.episode - b.episode; // Сортировка по номеру серии
                    })
                };
            })
            .sort(function(a, b) {
                return b.count - a.count;
            });

        var output = '<h2>Top of locations</h2><ol>';
        sortedLocations.forEach(function(location) {
            output += '<li><a href="https://luntik.fandom.com/wiki/' + location.name + '">' + location.name + '</a>: ' + location.count + '<details><summary>Episodes</summary><ul>';
            location.pages.forEach(function(page) {
                output += '<li><b><a href="https://luntik.fandom.com/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', ep. ' + page.episode +  '(season ' + page.season + ')</li>';
            });
            output += '</ul></details></li>';
        });
        output += '</ol>';

        
        $('#mw-content-text').html(output);
    }

    $(function() {
        getPagesWithTemplate1(templateName1).then(displayTopLocations).catch(function(err) {
            console.error('Ошибка в основном процессе:', err);
        });
})})();