mw.loader.using('jquery', function () {

    var conf = mw.config.values;

    var userName = conf.wgUserName;

    var userEdits = conf.wgUserEditCount;

    var userGroups = conf.wgUserGroups;

    var pageName = conf.wgPageName;


    // ======================== 1. ПЕЧАТНАЯ МАШИНКА ========================

    $('.typewriter-text').each(function () {

        var el = $(this);

        var text = el.text();

        el.text('');

        var i = 0;

        var timer = setInterval(function () {

            if (i < text.length) {

                el.text(el.text() + text.charAt(i));

                i++;

            } else {

                clearInterval(timer);

            }

        }, 100);

    });


    // ======================== 2. РАЗРУШЕНИЕ ТЕКСТА ========================

    $('.decay-text').each(function () {

        var el = $(this);

        var text = el.text();

        var i = 0;

        var timer = setInterval(function () {

            if (i <= text.length) {

                el.text(text.substring(0, text.length - i));

                i++;

            } else {

                clearInterval(timer);

            }

        }, 2000);

    });


    // ======================== 3. КЛАВИАТУРНАЯ ПАСХАЛКА (ТОЛЬКО ПК) ========================

    var keyboardPuzzles = [

        { code: [66, 65, 82, 66, 79, 83], target: '#barbos-secret' } // B A R B O S

    ];

    var keyboardIndexes = keyboardPuzzles.map(function () { return 0; });


    $(document).keydown(function (e) {

        for (var i = 0; i < keyboardPuzzles.length; i++) {

            if (e.keyCode === keyboardPuzzles[i].code[keyboardIndexes[i]]) {

                keyboardIndexes[i]++;

                if (keyboardIndexes[i] === keyboardPuzzles[i].code.length) {

                    $(keyboardPuzzles[i].target).slideDown();

                    keyboardIndexes[i] = 0;

                }

            } else {

                keyboardIndexes[i] = 0;

            }

        }

    });


    // ======================== 4. РУННЫЕ ПАСХАЛКИ (ТЕЛЕФОН + ПК) ========================

    var puzzles = {};

    var puzzleTimers = {};


    $('.puzzle-rune').each(function () {

        var puzzleName = $(this).data('puzzle');

        if (!puzzles[puzzleName]) {

            puzzles[puzzleName] = { sequence: [], index: 0 };

        }

        puzzles[puzzleName].sequence.push($(this).attr('id'));

    });


    $(document).on('click', '.puzzle-rune', function (e) {

        e.preventDefault();

        var puzzleName = $(this).data('puzzle');

        var puzzle = puzzles[puzzleName];

        if (!puzzle) return;


        var runeId = $(this).attr('id');

        if (runeId === puzzle.sequence[puzzle.index]) {

            puzzle.index++;

            $(this).addClass('rune-active');

            if (puzzle.index === puzzle.sequence.length) {

                $('.puzzle-reward[data-puzzle="' + puzzleName + '"]').slideDown();

                resetPuzzle(puzzleName);

            } else {

                clearTimeout(puzzleTimers[puzzleName]);

                puzzleTimers[puzzleName] = setTimeout(function () { resetPuzzle(puzzleName); }, 3000);

            }

        } else {

            resetPuzzle(puzzleName);

        }

    });


    function resetPuzzle(puzzleName) {

        puzzles[puzzleName].index = 0;

        $('.puzzle-rune[data-puzzle="' + puzzleName + '"]').removeClass('rune-active');

        clearTimeout(puzzleTimers[puzzleName]);

    }


    // ======================== 5. СИСТЕМА ОЦЕНОК (БОКОВАЯ ПАНЕЛЬ + ШАБЛОН) ========================

    var RATING = {

        StoringPage: 'Project:Оценки_статей',

        MinEdits: 50,

        NeededGroups: ['autoconfirmed', 'emailconfirmed'],

        Err: 0

    };


    RATING.UserHasNeededGroups = RATING.NeededGroups.every(function (g) { return userGroups.includes(g); });


    if (!userName) {

        RATING.Err = 'Войдите в аккаунт, чтобы ставить оценки';

    } else if (userEdits < RATING.MinEdits && !RATING.UserHasNeededGroups) {

        RATING.Err = 'Нужно 50 правок и подтверждённая почта';

    } else if (userEdits < RATING.MinEdits) {

        RATING.Err = 'Нужно хотя бы 50 правок';

    } else if (!RATING.UserHasNeededGroups) {

        RATING.Err = 'Нужна подтверждённая почта';

    }


    RATING.UserCanVote = RATING.Err === 0;


    function refreshAllRatings() {

        fetch(mw.util.wikiScript('index') + '?title=' + encodeURIComponent(RATING.StoringPage) + '&action=raw')

            .then(function (r) { return r.text(); })

            .then(function (text) {

                var data;

                try { data = JSON.parse(text); } catch (e) { return; }


                $('.inline-rating').each(function () {

                    var el = $(this);

                    var targetPage = el.attr('data-page') || pageName;

                    var pageData = data[targetPage] || [[], []];

                    var score = pageData[0].length - pageData[1].length;

                    var color = score > 0 ? 'green' : score < 0 ? 'red' : 'gray';

                    el.html('<span style="color:' + color + '; font-weight:bold; font-size:1.2em;">' + (score > 0 ? '+' : '') + score + '</span>');

                });


                if ($('.pageRate').length === 0) return;


                var current = data[pageName] || [[], []];

                var score = current[0].length - current[1].length;

                var ratingEl = document.getElementById('pageRating');

                if (ratingEl) {

                    ratingEl.textContent = (score > 0 ? '+' : '') + score;

                    ratingEl.style.color = score > 0 ? 'green' : score < 0 ? 'red' : 'gray';

                    ratingEl.style.fontSize = '30px';

                }

            });

    }


    if ($('.pageRate').length > 0) {

        var section = document.createElement('section');

        var header = document.createElement('h2');

        header.className = 'activity-heading';

        header.textContent = 'Оценка статьи';

        section.className = 'rail-module PageRatingModule';

        section.appendChild(header);

        document.getElementById('WikiaRail').appendChild(section);


        var ratingBody = $('.pageRate')[0];

        section.appendChild(ratingBody);

        ratingBody.style.display = '';


        function saveVote(summary, callback) {

            fetch(mw.util.wikiScript('index') + '?title=' + encodeURIComponent(RATING.StoringPage) + '&action=raw')

                .then(function (r) { return r.text(); })

                .then(function (text) {

                    var data = JSON.parse(text);

                    callback(data);

                    return fetch(mw.util.wikiScript('api'), {

                        method: 'POST',

                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                        body: new URLSearchParams({

                            action: 'edit',

                            title: RATING.StoringPage,

                            summary: summary,

                            text: JSON.stringify(data),

                            bot: 1,

                            token: mw.user.tokens.get('csrfToken'),

                            format: 'json'

                        })

                    });

                })

                .then(function () { refreshAllRatings(); });

        }


        document.getElementById('rate_page_plus').addEventListener('click', function () {

            if (!RATING.UserCanVote) { alert(RATING.Err); return; }

            saveVote('+ голос', function (data) {

                var cur = data[pageName] || [[], []];

                var idx = cur[1].indexOf(userName);

                if (idx !== -1) cur[1].splice(idx, 1);

                if (!cur[0].includes(userName)) cur[0].push(userName);

                data[pageName] = cur;

            });

        });


        document.getElementById('rate_page_minus').addEventListener('click', function () {

            if (!RATING.UserCanVote) { alert(RATING.Err); return; }

            saveVote('- голос', function (data) {

                var cur = data[pageName] || [[], []];

                var idx = cur[0].indexOf(userName);

                if (idx !== -1) cur[0].splice(idx, 1);

                if (!cur[1].includes(userName)) cur[1].push(userName);

                data[pageName] = cur;

            });

        });


        document.getElementById('remove_rate').addEventListener('click', function () {

            if (!RATING.UserCanVote) { alert(RATING.Err); return; }

            saveVote('убрал голос', function (data) {

                var cur = data[pageName] || [[], []];

                var i0 = cur[0].indexOf(userName);

                var i1 = cur[1].indexOf(userName);

                if (i0 !== -1) cur[0].splice(i0, 1);

                if (i1 !== -1) cur[1].splice(i1, 1);

                data[pageName] = cur;

            });

        });

    }


    refreshAllRatings();

});


// ======================== 6. ШАБЛОН CSS ========================

// mw.hook('wikipage.content').add(function () {

//     $('span.import-css').each(function () {

//         mw.util.addCSS($(this).attr('data-css'));

//     });

// });

mw.loader.using('jquery', function() {

  $(document).ready(function() {

    if ($('#virtual-keyboard').length === 0) return;



    // По умолчанию цель — блокнот

    var targetInput = $('#keyboard-input');



    // Если кликнули по полю поиска — переключаем цель на него

    $('#search-input').on('focus click', function() {

      targetInput = $(this);

    });



    // Если кликнули по блокноту — возвращаем цель

    $('#keyboard-input').on('focus click', function() {

      targetInput = $(this);

    });



    // Обработчик виртуальных клавиш

    $(document).on('click', '.virtual-key', function(e) {

      e.preventDefault();

      var key = $(this).data('key');



      // Фокусируем цель, чтобы каретка встала на место

      targetInput.focus();



      if (key === 'BACKSPACE') {

        // Эмуляция backspace через Selection API

        var sel = window.getSelection();

        if (sel.rangeCount && $(sel.anchorNode).closest(targetInput).length) {

          var range = sel.getRangeAt(0);

          if (range.collapsed && range.startOffset > 0) {

            range.setStart(range.startContainer, range.startOffset - 1);

            range.deleteContents();

          } else if (!range.collapsed) {

            range.deleteContents();

          }

        }

      } else if (key === 'ENTER') {

        document.execCommand('insertHTML', false, '\n');

      } else if (key === 'SPACE') {

        document.execCommand('insertText', false, ' ');

      } else {

        document.execCommand('insertText', false, key);

      }

    });

  });

});
    // И при каждом изменении DOM (например, если комментарии подгружаются динамически)

    // mw.hook('wikipa
// Универсальный движок для выборных историй 
$(function() {
    'use strict';

    // Ищем контейнер и данные
    var $container = $('#story-adventure-container');
    var $dataTag = $('#story-adventure-data');

    if (!$container.length || !$dataTag.length) return;

    var story;
    try {
        story = JSON.parse($dataTag.text().trim());
    } catch (e) {
        $container.html('<p style="color:red;">Ошибка в JSON-сценарии.</p>');
        return;
    }

    if (!story.initialNode || !story.nodes) {
        $container.html('<p style="color:red;">В сценарии нет initialNode или nodes.</p>');
        return;
    }

    var nodes = story.nodes;

    // Отрисовка узла
    function renderNode(nodeId) {
        var node = nodes[nodeId];
        if (!node) {
            $container.html('<p style="color:#ff4444;">Конец сюжета? Узел не найден.</p>');
            return;
        }

        var html = '<div class="story-node"><p>' + mw.html.escape(node.text) + '</p>';

        if (node.choices && node.choices.length > 0) {
            html += '<div class="story-choices" style="display:flex; flex-wrap:wrap; gap:10px; margin-top:15px;">';
            node.choices.forEach(function(choice) {
                html += '<button class="story-choice-btn" data-next="' + mw.html.escape(choice.nextNode) + '" style="padding:10px 20px; background:transparent; color:#00ffff; border:2px solid #00ffff; font-family:\'Courier New\',monospace; cursor:pointer; transition:0.3s; letter-spacing:1px;" onmouseover="this.style.background=\'#00ffff\'; this.style.color=\'#000\';" onmouseout="this.style.background=\'transparent\'; this.style.color=\'#00ffff\';">' + mw.html.escape(choice.label) + '</button>';
            });
            html += '</div>';
        } else {
            html += '<p style="color:#888; font-style:italic; margin-top:15px;">Конец истории.</p>';
        }

        html += '</div>';
        $container.html(html);
    }

    // Старт
    renderNode(story.initialNode);

    // Клики по выборам
    $container.on('click', '.story-choice-btn', function() {
        var nextNodeId = $(this).data('next');
        if (nextNodeId) renderNode(nextNodeId);
    });
});