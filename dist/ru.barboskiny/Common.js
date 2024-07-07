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
/* Скрипт на Барбоскины_вики:Топ_локаций от MarkKond201, сделан с любовью */
(function() {
    // Проверяем, что мы на странице Барбоскины_вики:Топ_локаций
    var currentPage = mw.config.get('wgPageName');
    if (currentPage !== 'Барбоскины_вики:Топ_локаций') {
        return;
    }

    var templateName1 = 'Эпизод_(Серия)';
    var locationCounts = {};
    var pageList1 = {};
    var backgroundLocationCounts = {};
    var pageList2 = {};

    function getPagesWithTemplate1(template, continueToken) {
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Шаблон:' + template,
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

            // Извлекаем информацию о локациях
            var locationsSection = wikitext.match(/==\s*Локации\s*==([\s\S]*?)(==|$)/i);
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

            // Извлекаем информацию о фоновых локациях
            var backgroundLocationsSection = wikitext.match(/==\s*Фоновые локации\s*==([\s\S]*?)(==|$)/i);
            if (backgroundLocationsSection) {
                var backgroundLocations = backgroundLocationsSection[1].match(/^\*\s*\[\[([^\]]+)\]\]/gm);
                if (backgroundLocations) {
                    backgroundLocations.forEach(function(location) {
                        var locationNameMatch = location.match(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/);
                        if (locationNameMatch) {
                            var locationName = locationNameMatch[1].trim();  // Extract location name, ignoring alias text
                            backgroundLocationCounts[locationName] = (backgroundLocationCounts[locationName] || 0) + 1;
                            if (!pageList2[locationName]) {
                                pageList2[locationName] = [];
                            }
                            pageList2[locationName].push({
                                title: title,
                                episode: episode,
                                season: season
                            });
                        }
                    });
                }
            }
        }).catch(function(err) {
            console.error('Ошибка в processPage1:', err);
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

        var output = '<h2>Топ локаций</h2><ol>';
        sortedLocations.forEach(function(location) {
            output += '<li><a href="https://barboskiny.fandom.com/ru/wiki/' + location.name + '">' + location.name + '</a>: ' + location.count + '<details><summary>Серии</summary><ul>';
            location.pages.forEach(function(page) {
                output += '<li><b><a href="https://barboskiny.fandom.com/ru/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', эп. ' + page.episode +  '(сезон ' + page.season + ')</li>';
            });
            output += '</ul></details></li>';
        });
        output += '</ol>';

        output += '<h2>Топ фоновых локаций</h2><ol>';
        sortedBackgroundLocations.forEach(function(location) {
            output += '<li><a href="https://barboskiny.fandom.com/ru/wiki/' + location.name + '">' + location.name + '</a>: ' + location.count + '<details><summary>Серии</summary><ul>';
            location.pages.forEach(function(page) {
                output += '<li><b><a href="https://barboskiny.fandom.com/ru/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', эп. ' + page.episode +  '(сезон ' + page.season + ')</li>';
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
    });
})();

/* Скрипт на Барбоскины_вики:Топ_предметов от MarkKond201, сделан с любовью */
(function() {
    // Проверяем, что мы на странице Барбоскины_вики:Топ_предметов
    var currentPage = mw.config.get('wgPageName');
    if (currentPage !== 'Барбоскины_вики:Топ_предметов') {
        return;
    }

    var templateName1 = 'Эпизод_(Серия)';
    var itemCounts = {};
    var pageList1 = {};
    var backgroundItemCounts = {};
    var pageList2 = {};

    function getPagesWithTemplate1(template, continueToken) {
        return new mw.Api().get({
            action: 'query',
            list: 'embeddedin',
            eititle: 'Шаблон:' + template,
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

            // Извлекаем информацию о предметах
            var itemsSection = wikitext.match(/==\s*Предметы\s*==([\s\S]*?)(==|$)/i);
            if (itemsSection) {
                var items = itemsSection[1].match(/^\*\s*\[\[([^\]]+)\]\]/gm);
                if (items) {
                    items.forEach(function(item) {
                        var itemNameMatch = item.match(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/);
                        if (itemNameMatch) {
                            var itemName = itemNameMatch[1].trim();  // Extract item name, ignoring alias text
                            itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
                            if (!pageList1[itemName]) {
                                pageList1[itemName] = [];
                            }
                            pageList1[itemName].push({
                                title: title,
                                episode: episode,
                                season: season
                            });
                        }
                    });
                }
            }

            // Извлекаем информацию о фоновых предметах
            var backgroundItemsSection = wikitext.match(/==\s*Фоновые предметы\s*==([\s\S]*?)(==|$)/i);
            if (backgroundItemsSection) {
                var backgroundItems = backgroundItemsSection[1].match(/^\*\s*\[\[([^\]]+)\]\]/gm);
                if (backgroundItems) {
                    backgroundItems.forEach(function(item) {
                        var itemNameMatch = item.match(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/);
                        if (itemNameMatch) {
                            var itemName = itemNameMatch[1].trim();  // Extract item name, ignoring alias text
                            backgroundItemCounts[itemName] = (backgroundItemCounts[itemName] || 0) + 1;
                            if (!pageList2[itemName]) {
                                pageList2[itemName] = [];
                            }
                            pageList2[itemName].push({
                                title: title,
                                episode: episode,
                                season: season
                            });
                        }
                    });
                }
            }
        }).catch(function(err) {
            console.error('Ошибка в processPage1:', err);
        });
    }

    function displayTopItems() {
        var sortedItems = Object.keys(itemCounts)
            .map(function(item) {
                return {
                    name: item,
                    count: itemCounts[item],
                    pages: pageList1[item].sort(function(a, b) {
                        return a.episode - b.episode; // Сортировка по номеру серии
                    })
                };
            })
            .sort(function(a, b) {
                return b.count - a.count;
            });

        var sortedBackgroundItems = Object.keys(backgroundItemCounts)
            .map(function(item) {
                return {
                    name: item,
                    count: backgroundItemCounts[item],
                    pages: pageList2[item].sort(function(a, b) {
                        return a.episode - b.episode; // Сортировка по номеру серии
                    })
                };
            })
            .sort(function(a, b) {
                return b.count - a.count;
            });

        var output = '<h2>Топ предметов</h2><ol>';
        sortedItems.forEach(function(item) {
            output += '<li><a href="https://barboskiny.fandom.com/ru/wiki/' + item.name + '">' + item.name + '</a>: ' + item.count + '<details><summary>Серии</summary><ul>';
            item.pages.forEach(function(page) {
                output += '<li><b><a href="https://barboskiny.fandom.com/ru/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', эп. ' + page.episode +  '(сезон ' + page.season + ')</li>';
            });
            output += '</ul></details></li>';
        });
        output += '</ol>';

        output += '<h2>Топ фоновых предметов</h2><ol>';
        sortedBackgroundItems.forEach(function(item) {
            output += '<li><a href="https://barboskiny.fandom.com/ru/wiki/' + item.name + '">' + item.name + '</a>: ' + item.count + '<details><summary>Серии</summary><ul>';
            item.pages.forEach(function(page) {
                output += '<li><b><a href="https://barboskiny.fandom.com/ru/wiki/' + page.title + '"> ' + page.title + '</a></b>' + ', эп. ' + page.episode +  '(сезон ' + page.season + ')</li>';
            });
            output += '</ul></details></li>';
        });
        output += '</ol>';

        $('#mw-content-text').html(output);
    }

    $(function() {
        getPagesWithTemplate1(templateName1).then(displayTopItems).catch(function(err) {
            console.error('Ошибка в основном процессе:', err);
        });
    });
})();