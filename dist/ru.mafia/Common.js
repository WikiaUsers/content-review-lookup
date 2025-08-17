/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
//Кнопки быстрого описания правки

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

//Изменение всплывающих превьюшек
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://static.wikia.nocookie.net/allmafia/images/0/02/%D0%9D%D0%95%D0%A2_%D0%98%D0%97%D0%9E%D0%91%D0%A0%D0%90%D0%96%D0%95%D0%9D%D0%98%D0%AF.png/revision/latest?cb=20250128040643&format=original&path-prefix=ru';

/* Разные слоганы в навигации */
$(document).ready(function() {
    var wikiNames = [
        "Мафия возвращается",
        "Добро пожаловать в Семью",
        "Семья – это те, за кого можно умереть",
        "Семья – это навсегда",
        "Новая эра – старые раны...",
        "Всё решает очень просто Коза ностра",
        "Вито и Джо гоняют на Пежо",
        "Патронов много не бывает",
        "Семья требует жертв",
        "#СынИзабеллы",
		"История криминального мира Сицилии"
    ];
    var randomIndex = Math.floor(Math.random() * wikiNames.length);
    var randomWikiName = wikiNames[randomIndex];
    var communityNameElements = document.getElementsByClassName('fandom-community-header__community-name');
    if (communityNameElements.length > 0) {
        communityNameElements[0].textContent = randomWikiName;
        communityNameElements[0].classList.add('noto-emoji');
    }
    var stickyHeaderElements = document.getElementsByClassName('fandom-sticky-header__sitename');
    if (stickyHeaderElements.length > 0) {
        stickyHeaderElements[0].textContent = randomWikiName;
        stickyHeaderElements[0].classList.add('noto-emoji');
    }
});