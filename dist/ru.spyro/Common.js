/*
 * Автоматическое обновление
 */
window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Включить автообновление страницы';

/*Неактивные пользователи*/
//Inactive users
window.InactiveUsers = {
    months: 1,
    text: 'НЕАКТИВЕН'
};

// *****************************************************
// * Таймер *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }
    var tpm = '';
    
    // Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунды';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' минута, и ' + left;
        } else {
            left = (diff % 60) + ' минут, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' час, ' + left;
        } else {
            left = (diff % 24) + ' часов, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' дней, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

//Кнопки быстрого описания правки

//список кнопок
//вызов функции вставки кнопок быстрого описания правки при загрузке страницы
$(function SummaryButtons() {
    var wpSummary = document.getElementById('wpSummary');
    if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return;
    wpSummaryBtn = document.createElement('span'); //global var
    wpSummaryBtn.id = 'userSummaryButtonsA';

    // +Рекомендация
    var wpSummaryBtnRec = document.createElement('i');
    wpSummaryBtnRec.appendChild(document.createTextNode('Пожалуйста, если вы не торопитесь, опишите вашу правку:'));
    wpSummaryBtnRec.appendChild(document.createElement('br'));
    wpSummaryBtn.appendChild(wpSummaryBtnRec);

    wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
    wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
    addSumButton('новости', 'новости', 'Учтены последние новости');
    addSumButton('викификация', 'викификация', 'Произведена викификация');
    addSumButton('частичная викификация', 'частичная викификация', 'Была нажата одна кнопка');
    addSumButton('правила', 'правила', 'Согласно правил');
    addSumButton('оформление', 'оформление', 'Оформление');
    addSumButton('стиль', 'стилевые правки', 'Стилевые правки');
    addSumButton('грамматика', 'грамматика', 'Поправлена орфография/пунктуация');
    addSumButton('категоризация', 'категоризация', 'Изменены/добавлены категории');
    addSumButton('шаблон', 'шаблон', 'Добавлен/изменён шаблон');
    addSumButton('дополнение', 'дополнение', 'Добавлены новые сведения');
    addSumButton('уточнение', 'уточнение', 'Уточнение');
    addSumButton('иллюстрирование', 'иллюстрирование', 'Размещена/изменена иллюстрация');
    addSumButton('обновление', 'обновление сведений', 'Обновлены устаревшие сведения');
    addSumButton('разметка', 'правка разметки', 'Изменение разметки');
    addSumButton('лишнее', 'лишнее', 'Действительно лишнее');
    addSumButton('интервики', 'интервики', 'Интервики тоже нужны');
    addSumButton('замена изображения', 'замена изображения', 'Замена изображения');
    addSumButton('шаблонофикация', 'шаблонофикация', 'шаблонофикация');
    addSumButton('ошибки', 'ошибки', 'Обнаружены ошибки');
    addSumButton('сомнения', 'сомнения', 'Сомнения по статье');
    addSumButton('отмена', 'отмена правки(ок)', 'Отмена одной либо нескольких правок');
});

//код вставки кнопок быстрого описания
function addSumButton(name, text, title) {
    var btn = document.createElement('a');
    btn.appendChild(document.createTextNode(name));
    btn.title = title;
    btn.onclick = function() {
        insertSummary(text);
    };
    wpSummaryBtn.appendChild(btn);
    wpSummaryBtn.appendChild(document.createTextNode(' '));
}

//код вставки описания
function insertSummary(text) {
    var wpSummary = document.getElementById('wpSummary');
    if (wpSummary.value.indexOf(text) != -1) return;
    if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ',';
    if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' ';
    wpSummary.value += text;
}

$(function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE)
        return;

    var titleDiv = document.getElementById('title-meta');

    if (titleDiv == null)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];

    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";

    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
});


mw.hook('wikipage.content').add(function ($content) {
    var msg = {
        nodata: '<span class="udu-nodata">Нет данных</span>',
        reqfailed: 'Error: Request failed.',
        cantavatar: 'Error: Cannot obtain user avatar.',
        usernotfound: 'Пользователь не найден',
        delimiter: '<span class="udu-delim">, </span>',
    };
    var requestMax = 6,
        requestThreshold = 300,
        requestCount = 0,
        requests = [],
        rejected = 0,
        names = $content.find('.infobox-nicknames').text()
            .split('/')
            .map(function(v){return (v||'').trim()})
            .filter(Boolean),
        nickname = mw.config.get('wgTitle').replace( /^[^/]+\//, '' );
    if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length || $content.find('.infobox-editcount')) {
        if ( mw.config.get( 'wgNamespaceNumber' ) !== 0 ) {
            $content.find( '.pi-title .user-link' ).html(
                $( '<a />', {
                    href: '/wiki/User:' + (names[0] || nickname),
                    target: '_blank'
                }).append(
                    $('<span>', {
                        class: 'udu-nickname',
                        text: names[0] || nickname
                    })
                )
            );
        }
 
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'query',
                list: 'users',
                ususers: names[0] || nickname,
                usprop: 'registration|gender|editcount'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data) {
                    switch (data.query.users[0].gender) {
                    case 'male':
                        $content.find('.infobox-gender').append('<span class="fa fa-mars udu-fa"></span>');
                        break;
                    case 'female':
                        $content.find('.infobox-gender').append('<span class="fa fa-venus udu-fa"></span>');
                        break;
                    case 'unknown':
                        break;
                    default:
                        break;
                    }
                    try {
                        if (data.query.users[0].registration) {
                            $content.find('.infobox-registration-date').empty().text(data.query.users[0].registration.replace('T', ' ').replace('Z', ''));
                        } else {
                            $content.find('.infobox-registration-date').html(msg.nodata);
                        }

                        if (data.query.users[0].editcount) {
                            $content.find('.infobox-editcount').html(data.query.users[0].editcount);
                        } else {
                            $content.find('.infobox-editcount').html(msg.nodata);
                        }
                    } catch (e) {
                        $content.find('.infobox-registration-date').html(msg.nodata);
                        $content.find('.infobox-editcount').html(msg.nodata);
                    }
                }
            },
            error: function () {
                console.log(msg.reqfailed);
                $content.find('.infobox-registration-date').html(msg.nodata);
                $content.find('.infobox-editcount').html(msg.nodata)
            }
        });
    }// if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length)
 
    if ($content.find('.infobox-avatar').length) {
        $.ajax({
            url: '/api/v1/User/Details?size=150&ids=' + nickname,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $content.find('.infobox-avatar').html(
                        $('<img>', {
                           src: (data.items[0] || {}).avatar,
                           class: 'avatar'
                        })
                    );
                }
            },
            error: function () {
                console.log(msg.cantavatar);
                $content.find('.infobox-avatar').html(msg.nodata);
            }
        });
    }// if ($content.find('.infobox-avatar').length)
 
    // if ($content.find('.infobox-editcount').length)
});