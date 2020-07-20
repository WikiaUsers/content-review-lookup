/**
 * Generator for most popular CSS and JavaScript code snippets
 * @author Kopcap94
 * 
 */
$(function () {
    if (!$('#CodeGenerator3').length) {
        return;
    }
 
    $('#CodeGenerator2').replaceWith(
        '<div id="GeneratorBody">' +
            '<fieldset>' +
                '<legend>' +
                    '<div id="SwitchToCSS" class="codegenerator-field-switch">CSS</div>' +
                    '<div id="SwitchToVar" class="codegenerator-field-switch" style="opacity:0.7; width: 120px;">Переменные</div>' +
                '</legend>' +
                '<div id="CSSParams" />' +
                '<div id="VarParams" style="display:none;" />' +
                '<div style="text-align:center;">' +
                    '<textarea id="CodeGenOutput" type="text" placeholder="Результат" />' +
                '</div>' +
            '</fieldset>' +
        '</div>'
    );
 
    $('#CSSParams').append(
        '<h2 style="margin-top:5px;">Опции</h2>' +
        '<div id="CSSoptionblock" class="codegenerator-group" style="-webkit-column-count:2; -moz-column-count:2; column-count:2; text-align:inherit; padding-bottom:2px;">' +
            '<input type="checkbox" class="codegenerator-option" data-section="ColorNames"> Цветные ники<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="ForumTemp"> Таблички на форуме<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="CommentFont"> Фон комментария<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="ChatSign"> Подпись в чате<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="Moder"> Значок модератора<br>' +
            '<input type="checkbox" class="codegenerator-option" data-section="Cursor"> Курсор' +
        '</div>' +
        '<div class="codegenerator-nick codegenerator-nickbody" style="display:none;">' +
            // Поле ввода никнеймов
            '<div class="codegenerator-nickinput" style="display:none; border-bottom:solid 1px #323232;  border-top:solid 1px #323232; padding:5px 0;">' +
                'Введите ник: <input id="CSSNick" placeholder="Можно указывать несколько через знак |" />' +
            '</div>' +
            // Ввод параметров для кода цветных никнеймов
            '<div id="ColorNamesBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Цветные ники</h2>' +
                'Задайте цвет: <input id="CSSColor" class="codegenerator-input codegenerator-color-input" placeholder="Цвет в формате rgb, rgba, hex" disabled="disabled"/>' +
            '</div>' +
            // Плашки
            '<div id="ForumTempBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Таблички на форуме</h2>' +
                '<div>Название таблички: <input id="ForumTempName" class="codegenerator-input" placeholder="Название таблички" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Цвет названия: <input id="ForumTempColor" class="codegenerator-input codegenerator-color-input" placeholder="Цвет названия" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Фон таблички: <input id="ForumTempBack" class="codegenerator-input codegenerator-color-input" placeholder="Фоновый цвет для таблички" disabled="disabled"/></div>' +
            '</div>' +
            // Фон комментариев
            '<div id="CommentFontBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Фон комментариев участника</h2>' +
                '<div style="margin-top:3px;">Цвет текста: <input id="CommentFontColor" class="codegenerator-input codegenerator-color-input" placeholder="Цвет названия" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Фон комментария: <input id="CommentFontBack" class="codegenerator-input codegenerator-color-input" placeholder="Фоновый цвет для таблички" disabled="disabled"/></div>' +
            '</div>' +
            // Подпись в чате
            '<div id="ChatSignBody" class="codegenerator-bodyinnick" style="display:none; border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Подпись в чате</h2>' +
                '<div style="margin-top:3px;">Текст подписи: <input id="ChatSignText" class="codegenerator-input" placeholder="Введите здесь текст" disabled="disabled"/></div>' +
            '</div>' +
            // Значок модератора в чате
            '<div id="ModerBody" class="codegenerator-bodyinnick" style="display:none;">' +
                '<div style="border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                    '<h2 style="margin-top:5px;">Значок модератора</h2>' +
                    '<div>Значок: <input id="ModerIcon" class="codegenerator-input" placeholder="Прямая ссылка на изображение" disabled="disabled"/></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        // Курсор
        '<div id="CursorBody" class="codegenerator-group" style="display:none;">' +
            '<div style="border-bottom:solid 1px #323232; padding-bottom:5px;">' +
                '<h2 style="margin-top:5px;">Курсор</h2>' +
                '<div>Стандартный: <input id="CursorNormal" class="codegenerator-input" placeholder="Прямая ссылка на изображение" disabled="disabled"/></div>' +
                '<div style="margin-top:3px;">Для ссылок: <input id="CursorLink" class="codegenerator-input" placeholder="Прямая ссылка на изображение" disabled="disabled"/></div>' +
            '</div>' +
        '</div>' +
        '<h2 style="margin-top:15px">Результат</h2>' +
        '<button id="CSSSubmit" type="button" class="wikia-button" style="display:block;">Показать результат</button>'
    );
 
    $('#VarParams').append(
        '<h2 style="margin-top:15px;">Класс для вики (наименование вики в БД)</h2>' +
        '<div id="WikiBodyClass" class="codegenerator-group" style="opacity:1; text-align:left;">' +
            '<input class="codegenerator-wikiname" style="width:60%; margin-right: 5px;" placeholder="Ссылка на вики"/>' +
            '<button class="codegenerator-var-get">Получить класс</button> :' +
            '<input class="codegenerator-input codegenerator-wikiname-result" style="width: calc(39% - 130px);" placeholder="Результат" />' +
        '</div>'
    );
 
    $('#SwitchToVar').click(function () {
        $('#CSSParams, #CodeGenOutput').hide();
        $('#VarParams').show();
        $('#SwitchToVar').fadeTo(500, 1);
        $('#SwitchToCSS').fadeTo(500, 0.7);
    });
 
    $('#SwitchToCSS').click(function () {
        $('#VarParams').hide();
        $('#CSSParams, #CodeGenOutput').show();
        $('#SwitchToVar').fadeTo(500, 0.7);
        $('#SwitchToCSS').fadeTo(500, 1);
    });
 
    $('.codegenerator-option').on("change", function () {
        var opt_value = $(this).attr('data-section'),
            $opt_body = $('#' + opt_value + 'Body');
 
        if ($(this).attr('checked') == 'checked') {
            $opt_body.slideDown('fast', function () {
                $(this).css('display', 'block').find('.codegenerator-input').removeAttr('disabled');
                if ($(this).hasClass('codegenerator-bodyinnick')) {
                    if (!$('.codegenerator-nicktoggle').length) {
                        $('.codegenerator-nickinput, .codegenerator-nickbody').slideDown('fast');
                    }
                    $(this).toggleClass('codegenerator-nicktoggle');
                }
            });
        } else {
            $opt_body.slideUp('fast', function () {
                $(this).css('display', 'none').find('.codegenerator-input').attr('disabled', 'disabled');
                if ($(this).hasClass('codegenerator-bodyinnick')) {
                    $(this).toggleClass('codegenerator-nicktoggle');
                    if (!$('.codegenerator-nicktoggle').length) {
                        $('.codegenerator-nickinput, .codegenerator-nickbody').slideUp();
                    }
                }
            });
        }
    });
 
    // CSS
    $('#CSSSubmit').click(function () {
        var invalidInput = false;
        $('.codegenerator-input-error').fadeOut(300);
        $('#CSSParams .codegenerator-input').css('border', 'none');
        // Проверка на наличие заполненных полей
        $('#CSSParams .codegenerator-input').each(function () {
            if ($(this).attr('disabled') !== 'disabled' && !$(this).val()) {
                $(this).css('border', '1px solid red');
                $('<div class="codegenerator-input-error" style="color:red">Это поле должно быть заполнено</div>').insertAfter(this);
                invalidInput = true;
            } else {
                $(this).css('border', '2px inset');
            }
        });
        if (invalidInput) {
            return;
        }
 
        $('#CodeGenOutput').val('');
        var Result = '',
            colorRes = ($('#ColorNamesBody').css('display') !== 'none'),
            tempRes = ($('#ForumTempBody').css('display') !== 'none'),
            commRes = ($('#CommentFontBody').css('display') !== 'none'),
            chatsignRes = ($('#ChatSignBody').css('display') !== 'none'),
            moderRes = ($('#ModerBody').css('display') !== 'none'),
            cursRes = ($('#CursorBody').css('display') !== 'none');
            moderList = '';
        if (colorRes) {
            var ColorSelector = '',
                ColorBody = '    color: ' + $('#CSSColor').val() + ';\n' +
                '}\n\n';
        }
        if (tempRes) {
            var TempSelector = '',
                TempBody = '    color: ' + $('#ForumTempColor').val() + ';\n' +
                '    background-color: ' + $('#ForumTempBack').val() + ';\n' +
                '    content:\'' + $('#ForumTempName').val() + '\';\n' +
                '    border-radius: 1em;\n' +
                '    padding: 0 5px;\n' +
                '    margin-left: 3px;\n' +
                '}\n\n';
        }
        if (cursRes) {
            Result += '/* Курсор на вики */\n' +
                'body {\n' +
                '    cursor: url("' + $('#CursorNormal').val() + '"), auto;\n' +
                '}\n' +
                'a:link, a:visited,\n' +
                'a:hover {\n' +
                '    cursor: url("' + $('#CursorLink').val() + '"), auto;\n' +
                '}\n\n';
        }
        if (commRes) {
            var commBQ = 
                '    background: ' + $('#CommentFontBack').val() + ' !important;\n' +
                '    color: ' + $('#CommentFontColor').val() + ' !important;\n' +
                '}\n',
                commBQafter =
                '    border-color: transparent ' + $('#CommentFontBack').val() + ' ' + $('#CommentFontBack').val() + ' transparent !important;\n' +
                '}\n',
                commBQdiv = 
                '    background: transparent ' + $('#CommentFontBack').val() + ' !important;\n' +
                '    color: ' + $('#CommentFontColor').val() + ' !important;\n' +
                '}\n\n',
                commBQusers = '',
                commBQafterusers = '',
                commBQdivusers = '';
        }
        if (chatsignRes) {
            var chatsignbody_1 = 
                '    content: "' + $('#ChatSignText').val() + '";\n' +
                '    font-size: 10px;\n' + 
                '}\n',
                chatsignbody_2 =
                '    display: none;\n' + 
                '}\n\n',
                chatsignusers_1 = '',
                chatsignusers_2 = '';
        }
        if ($('#CSSNick').val()) {
            var NickArr = $('#CSSNick').val().split('|');
            $.each(NickArr, function (i, nick) {
                var CodeGenCSSEnding = (i + 1 != NickArr.length) ? ',\n' : ' {\n',
                    fordata = nick;
                nick = encodeURIComponent(nick.replace(/\s/g, '_'));
                // Парсим недостающие элементы
                if (nick.indexOf("'") > -1) {
                    nick = nick.replace(/'/g, '%27');
                }
                if (nick.indexOf("~") > -1) {
                    nick = nick.replace(/~/g, '%7E');
                }
                if (colorRes) {
                    ColorSelector += 'a[href$="/' + nick + '"],\na[href$=":' + nick + '"]' + CodeGenCSSEnding;
                }
                if (tempRes) {
                    TempSelector += '.Wall .edited-by > a.subtle[href$="' + nick + '"]:after,\n' +
                        '.comments li[data-user="' + fordata + '"] .edited-by:after' + CodeGenCSSEnding;
                }
                if (commRes) {
                    commBQusers += '.comments li[data-user="' + fordata + '"] blockquote' + CodeGenCSSEnding;
                    commBQafterusers += '.comments li[data-user="' + fordata + '"] blockquote:after' + CodeGenCSSEnding;
                    commBQdivusers += '.comments li[data-user="' + fordata + '"] blockquote div' + CodeGenCSSEnding;
                }
                if (moderRes) {
                    moderList += '#id-' + fordata.replace(/\s/g, '_') + ' .username .badge' + CodeGenCSSEnding;
                }
                if (chatsignRes) {
                    chatsignuser = '#user-' + fordata.replace(/([!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~])/g, '\\$1').replace(/\s/g, '_');
                    chatsignusers_1 += chatsignuser + ' .details:after' + CodeGenCSSEnding;
                    chatsignusers_2 += chatsignuser + ' .status' + CodeGenCSSEnding;
                }
            });
            if (moderRes) {
                Result += '/* Значок модераторов в чате */\n' +
                    moderList +
                    '    background-image: url("' + $('#ModerIcon').val() + '");\n' +
                    '    background-position: 0px 0px;\n' +
                    '}\n\n';
            }
            if (colorRes) {
                Result += '/* Цветные ники */\n' + ColorSelector + ColorBody;
            }
            if (tempRes) {
                Result += '/* Оформление табличек */\n' + TempSelector + TempBody;
            }
            if (commRes) {
                Result += '/* Фон комментариев */\n' + commBQusers + commBQ + commBQafterusers + commBQafter + commBQdivusers + commBQdiv;
            }
            if (chatsignRes) {
                Result += '/* Подписи в чате */\n' + chatsignusers_1 + chatsignbody_1 + chatsignusers_2 + chatsignbody_2;
            }
        }
        $('#CodeGenOutput').val(Result);
    });
 
    // Variables
    $('.codegenerator-var-get').click(function () {
        $('.codegenerator-input-error').remove();
        $('.codegenerator-wikiname, .codegenerator-wikiname-result').css('border', '');
 
        var wikiname = $('.codegenerator-wikiname').val().replace(/^(.+).wikia.com\/.*/, '$1.wikia.com');
        if (wikiname === '') {
            $('<div class="codegenerator-input-error" style="color:red; text-align:center;">Это поле должно быть заполнено</div>').appendTo('#WikiBodyClass');
            $('.codegenerator-wikiname').css('border', '1px solid red');
            return;
        }
 
        if (wikiname.indexOf('http://') === -1) {
            wikiname = 'http://' + wikiname;
        }
        if (wikiname.indexOf('.wikia.com') === -1) {
            wikiname += '.wikia.com';
        }
 
        $('.codegenerator-wikiname-result')
            .val('Подождите...')
            .css('border', '1px solid orange');
 
        $.ajax({
            url: wikiname + '/api.php',
            type: 'GET',
            data: {
                action: 'query',
                meta: 'siteinfo',
                format: 'json'
            },
            crossDomain: true,
            dataType: 'jsonp',
            success: function (d) {
                $('.codegenerator-wikiname-result')
                    .val('wiki-' + d.query.general.wikiid)
                    .css('border', '1px solid green');
            },
            error: function() {
                $('.codegenerator-wikiname-result')
                    .val('Ошибка!')
                    .css('border', '1px solid red');
            }
        });
    });
});