/**
 * FANDOM wiki: PvP victories + Hunger Games status
 * Обновляет .pvp_victory_count (число), .victories_text (склонение),
 * .hunger_games_count (статус) и управляет видимостью украшений.
 */
mw.hook('wikipage.content').add(function ($content) {
    // --------------------------------------------------------------
    // 1. PvP-победы
    // --------------------------------------------------------------
    var resultsContainer = document.querySelector('.pvp_results');
    var victoryCount = 0;
    if (resultsContainer) {
        victoryCount = resultsContainer.querySelectorAll('#pvp_victory').length;
    }

    // Склонение слова "победа" (без числа)
    function getVictoryWord(count) {
        var n = count % 100;
        if (n >= 11 && n <= 19) return 'ПОБЕД';
        var lastDigit = count % 10;
        if (lastDigit === 1) return 'ПОБЕДА';
        if (lastDigit >= 2 && lastDigit <= 4) return 'ПОБЕДЫ';
        return 'ПОБЕД';
    }
    var victoryWord = getVictoryWord(victoryCount);

    // Обновляем числовые счётчики
    document.querySelectorAll('.pvp_victory_count').forEach(function (el) {
        el.textContent = victoryCount;
    });
    // Обновляем текстовые блоки (только слово)
    document.querySelectorAll('.victories_text').forEach(function (el) {
        el.textContent = victoryWord;
    });

    // --------------------------------------------------------------
    // 2. Hunger Games — проверка наличия победителя или места
    // --------------------------------------------------------------
    var hasVictory = false;
    var topPlace = 0; // лучшее (минимальное) место (2..50), если найдено
    var hgContainer = document.querySelector('.pvp_results'); // тот же контейнер

    if (hgContainer) {
        // Проверяем, есть ли id="hunger_games_victory"
        if (hgContainer.querySelector('#hunger_games_victory')) {
            hasVictory = true;
        } else {
            // Ищем все id вида hunger_games_<число>_place (число 2..50)
            var placeElements = hgContainer.querySelectorAll('[id^="hunger_games_"][id$="_place"]');
            var minPlace = Infinity; // начальное значение для поиска минимума
            placeElements.forEach(function (el) {
                var id = el.id;
                // Извлекаем число между "hunger_games_" и "_place"
                var match = id.match(/^hunger_games_(\d+)_place$/);
                if (match) {
                    var num = parseInt(match[1], 10);
                    // Учитываем только места с 2 по 50 и ищем минимальное
                    if (num >= 2 && num <= 50 && num < minPlace) {
                        minPlace = num;
                    }
                }
            });
            // Если нашли хотя бы одно валидное место, сохраняем его
            if (minPlace !== Infinity) {
                topPlace = minPlace;
            }
        }
    }

    // Элементы интерфейса Hunger Games
    var countEls = document.querySelectorAll('.hunger_games_count');
    var crownEls = document.querySelectorAll('.hunger_games_crown');
    var arrowEls = document.querySelectorAll('.hunger_games_arrow');
    var topEls = document.querySelectorAll('.hunger_games_top');

    // Флаг, показывающий, что выполнен один из критериев
    var criteriaMet = hasVictory || (topPlace > 0);

    if (hasVictory) {
        // Победа в Голодных играх — число побед с префиксом "x"
        var hgVictoryCount = hgContainer.querySelectorAll('#hunger_games_victory').length;
        countEls.forEach(function (el) {
            el.textContent = 'x' + hgVictoryCount;
        });
        // Показать корону
        crownEls.forEach(function (el) {
            el.style.display = ''; // убираем inline display:none
        });
        // Скрыть стрелку (на случай, если она была показана ранее)
        arrowEls.forEach(function (el) {
            el.style.display = 'none';
        });
    } else if (topPlace > 0) {
        // Призовое место — текст "ТОП <место>"
        countEls.forEach(function (el) {
            el.textContent = 'ТОП ' + topPlace;
        });
        // Показать стрелку
        arrowEls.forEach(function (el) {
            el.style.display = '';
        });
        // Скрыть корону
        crownEls.forEach(function (el) {
            el.style.display = 'none';
        });
    } else {
        // Ничего не найдено — очищаем счётчик и скрываем все украшения
        countEls.forEach(function (el) {
            el.textContent = '';
        });
        crownEls.forEach(function (el) {
            el.style.display = 'none';
        });
        arrowEls.forEach(function (el) {
            el.style.display = 'none';
        });
    }

    // Показать/скрыть основной блок "ТОП", если выполнен любой критерий
    topEls.forEach(function (el) {
        if (criteriaMet) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });
});