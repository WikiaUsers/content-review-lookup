/*Викификатор*/
/*
$(function() {
    if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) return;
        var i = document.createElement('img');
        i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
        i.alt = i.title = 'Викификатор';
        i.onclick = Wikify;
        i.style.cursor = 'pointer';
        toolbar.appendChild(i);
    }
});

if (mwCustomEditButtons) {
    //Перенаправление
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/ru/1/1d/Button_redirect_rus.png",
        "speedTip": "Перенаправление",
        "tagOpen": "#перенаправление [[",
        "tagClose": "]]",
        "sampleText": "название страницы"
    };

    //Шаблон
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Button_template_alt.png",
        "speedTip": "Шаблон",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Название шаблона"
    };
//Категория
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3c/Button_cat_ru.png",
    "speedTip": "Категория",
    "tagOpen": "[[Категория:",
    "tagClose": "|{{PAGENAME}}]]",
    "sampleText": "Название категории"}
//Подчёркивание
mwCustomEditButtons[mwCustomEditButtons.length] = { 
   "imageFile": "http://images.uncyc.org/uk/6/64/Button_underline_ukr.png", 
    "speedTip": "Подчёркивание", 
    "tagOpen": "<u>", 
    "tagClose": "</u>", 
    "sampleText": "Подчёркнутый текст"}
//Зачёркивание
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images.uncyc.org/uk/4/45/Button_strike_ukr.png",
    "speedTip": "Зачёркнутый текст",
    "tagOpen": "<s>",
    "tagClose": "</s>",
    "sampleText": "Зачёркнутый текст"}
//Неразрывный пробел
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/4/4b/Button_nbsp.png",
    "speedTip": "Неразрывный пробел",
    "tagOpen": "&nbsp;",
    "tagClose": "",
    "sampleText": ""}
//Разрыв
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/1/13/Button_enter.png",
    "speedTip": "Разрыв",
    "tagOpen": "<br />",
    "tagClose": "",
    "sampleText": ""}
//Ударение
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0e/Button_acute_accent.png",
    "speedTip": "Ударение",
    "tagOpen": "́",
    "tagClose": "",
    "sampleText": ""}
//Цитата
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anführung.png",
    "speedTip": "Вставка цитаты",
    "tagOpen": "{" + "{Цитата|",
    "tagClose": "||}}",
    "sampleText": "Цитата"}
//Верхний индекс
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
    "speedTip": "Верхний индекс",
    "tagOpen": "<sup>",
    "tagClose": "</sup>",
    "sampleText": "Верхний индекс"}
//Нижний индекс
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
    "speedTip": "Нижний индекс",
    "tagOpen": "<sub>",
    "tagClose": "</sub>",
    "sampleText": "Нижний индекс"}
//Выравнивание текста по левому краю
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/e/ea/Button_align_left.png",
    "speedTip": "Выровнять по левому краю",
    "tagOpen": "<div style='text-align: left; direction: ltr; margin-left: 1em;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Выровненный влево текст"}
//Выравнивание текста по центру
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/he/5/5f/Button_center.png",
    "speedTip": "Выровнять по центру",
    "tagOpen": "<div style='text-align: center;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Выровненный по центру текст"}
//Выравнивание текста по правому краю
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images.uncyc.org/uk/a/a5/Button_align_right.png",
    "speedTip": "Выровнять по правому краю",
    "tagOpen": "<div style='text-align: right;'>\n",
    "tagClose": "\n</div>",
    "sampleText": "Выровненный вправо текст"}
//Скрытый комментарий
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/he/3/34/Button_hide_comment.png",
    "speedTip": "Скрытый комментарий",
    "tagOpen": "<!-- ",
    "tagClose": " -->",
    "sampleText": "Коментарий"}
//Заголовок при наведении курсора
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/7/74/Button_comment.png",
    "speedTip": "Заголовок при наведении курсора",
    "tagOpen": "<span title=\"\"\>",
    "tagClose": "</span>",
    "sampleText": "Текст"}
//Большой текст
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/cb/Button_big_2.png",
    "speedTip": "Большой шрифт",
    "tagOpen": "<big>",
    "tagClose": "</big>",
    "sampleText": "Текст большим шрифтом"}
//Маленький текст
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://images.uncyc.org/uk/4/4c/Button_small_ukr.png",
    "speedTip": "Маленький шрифт",
    "tagOpen": "<small>",
    "tagClose": "</small>",
    "sampleText": "Текст маленьким шрифтом"}
//Галерея
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
    "speedTip": "Галерея",
    "tagOpen": "\n<gallery>\n",
    "tagClose": "\n</gallery>",
    "sampleText": "Файл:Название_изображения1.jpg|Описание_изображения1\n\Файл:Название_изображения2.jpg|Описание_изображения2"}
//Видео
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
    "speedTip": "Видео с YouTube",
    "tagOpen": "\n<nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><nowiki><youtube>\n",
    "tagClose": "\n</youtube></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki></nowiki>",
    "sampleText": "title=\n\movie_url=http://www.youtube.com/watch?v=\n\embed_source_url=http://www.youtube.com/v/&fs=1\n\wrap=yes\n\width=400\n\height=300"}
//Сноска
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/c/c4/Button_ref.png",
    "speedTip": "Сноска",
    "tagOpen": "<ref>",
    "tagClose": "</ref>",
    "sampleText": "Ссылка"}
//Список сносок
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/64/Buttonrefvs8.png",
    "speedTip": "Список сносок",
    "tagOpen": "\n== Примечания ==\n<references/>",
    "tagClose": "",
    "sampleText": ""}
//Цвет
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/he/1/1e/Button_font_color.png",
    "speedTip": "Цветной текст",
    "tagOpen": "<span style='color: ColorName'>",
    "tagClose": "</span>",
    "sampleText": "Цветной текст"}
//Код
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/en/2/23/Button_code.png",
    "speedTip": "Вставка кода",
    "tagOpen": "<code>",
    "tagClose": "</code>",
    "sampleText": "Код"}
//Моноширинный шрифт
mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Tt_icon.png",
    "speedTip": "Моноширинный шрифт",
    "tagOpen": "<tt>",
    "tagClose": "</tt>",
    "sampleText": "Моноширинный шрифт"}
}
*/
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


$(function () {
    if ($('.infobox-gender').length || $('.infobox-registration-date').length) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'query',
                list: 'users',
                ususers: mw.config.get('wgPageName'),
                usprop: 'registration|gender'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data) {
                    switch (data.query.users[0].gender) {
                    case 'male':
                        $('.infobox-gender').append('<img src="https://vignette.wikia.nocookie.net/wikies/images/c/c1/Male.svg/revision/latest/scale-to-width/25?cb=20150302060331&amp;path-prefix=ru" alt="Male.svg" class="" data-image-key="Male.svg" data-image-name="Male.svg" width="25" height="25">');
                        break;
                    case 'female':
                        $('.infobox-gender').append('<img src="https://vignette.wikia.nocookie.net/wikies/images/2/23/Female.svg/revision/latest/scale-to-width/25?cb=20150302060307&amp;path-prefix=ru" alt="Female.svg" class="" data-image-key="Female.svg" data-image-name="Female.svg" width="25" height="25">');
                        break;
                    case 'unknown':
                        break;
                    default:
                        // nothing atm
                    }
                    $('.infobox-registration-date').text(data.query.users[0].registration.replace('T', ' ').replace('Z', ''));
                }
            },
            error: function () {
                console.log('Error: Request failed.');
            }
        });
    }
 
    if ($('.infobox-editcount').length) {
        // Special:EditCount gives more precise data than MW API
        $.ajax({
            url: '/wiki/Special:EditCount/' + mw.config.get('wgPageName'),
            type: 'GET',
            success: function (data) {
                if (data) {
                    //TODO: normal selector instead of this
                    $('.infobox-editcount').text($(data).find('.ecrowright:eq(5)').text());
                }
            },
            error: function () {
                console.log('Error: Request failed.');
            }
        });
    }
 
    if ($('.infobox-avatar').length) {
        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $('.infobox-avatar').text($(data).find('.masthead-avatar').children('img'));
                }
            },
            error: function () {
                console.log('Error: Cannot obtain user avatar.');
                $('.infobox-avatar').html('<span style="color: gray;">Нет данных</span>');
            }
        });
    }
});

/* ################################################## */
/* ### Вставка пользовательского имени            ### */
/* ################################################## */

$(function() {
    if (wgUserName != 'null') {
        $('.insertusername').text(wgUserName);
    }
});

/* ################################################## */
/* ### ReportErrors                               ### */
/* ################################################## */
importScriptPage('MediaWiki:ReportErrors.js');