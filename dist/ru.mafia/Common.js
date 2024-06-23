/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
//Кнопки быстрого описания правки
 
//список кнопок
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 
// +Рекомендация
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Пожалуйста, если вы не торопитесь, опишите вашу правку:'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);
 
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('новости', 'новости', 'Учтены последние новости');
 addSumButton('викификация', 'викификация', 'Произведена викификация');
 addSumButton('частичная викификация', 'частичная викификация', 'Была нажата одна кнопочка');
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
}
 
//код вставки кнопок быстрого описания
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 wpSummaryBtn.appendChild(btn);
 wpSummaryBtn.appendChild(document.createTextNode(' '));
}
 
//код вставки описания
function insertSummary(text) {
 var wpSummary = document.getElementById('wpSummary')
 if (wpSummary.value.indexOf(text) != -1) return 
 if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
 if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
 wpSummary.value += text
}
 
//вызов функции вставки кнопок быстрого описания правки при загрузке страницы
addOnloadHook(SummaryButtons)

// Кнопка очистки кэша страницы
var PurgeButtonText = 'Обновить';

//Кнопка редактирования преамбулы
EditIntroButtonText = 'Редактировать преамбулу';

//Код для подстановки информации об участниках в инфобоксах в профайлах
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