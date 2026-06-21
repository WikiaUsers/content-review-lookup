/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

$(document).ready(function() {
    // Список альбомов и их песен (в порядке треков)
    var albums = {
        'Наследие': [
            'Цусима',
            'Высота 776',
            'Жизнь за царя',
            'Операция «Союзная сила»',
            'Битва за Москву',
            'Песнь пустыни',
            'Чёрный октябрь',
            'Халхин-Гол',
            'Мясной бор'
        ],
        'Эпоха Империй': [
            'Петропавловск',
            'Распутин',
            'Белая Лилия',
            'Гангут',
            'Смута',
            'Ермак',
            'Искупление огнём',
            'Гвардия Петра'
        ],
        'Блицкриг': [
            'Брестская крепость',
            'Кёнигсберг',
            'Сталинград',
            'Злой город',
            'Фрау Чёрная Смерть',
            'Танк Алёша',
            'Императрица'
        ]
    };

    var currentPage = mw.config.get('wgPageName');
    var currentTitle = currentPage.replace(/_/g, ' ');

    // Проверяем, есть ли страница в каком-либо альбоме
    for (var album in albums) {
        var songs = albums[album];
        if (songs.indexOf(currentTitle) !== -1) {
            // Строим HTML-блок
            var html = '<div style="background: #f5f5f5; border-left: 5px solid #b8860b; padding: 10px 15px; border-radius: 8px; margin: 20px 0; color: #1a1a1a;">';
            html += '<div style="font-weight: bold; margin-bottom: 5px;">🎵 Альбом «' + album + '»:</div>';
            html += '<div style="display: flex; flex-wrap: wrap; gap: 5px 10px;">';
            
            var links = [];
            for (var i = 0; i < songs.length; i++) {
                var song = songs[i];
                if (song === currentTitle) {
                    links.push('<span style="font-weight: bold;">' + song + '</span>');
                } else {
                    links.push('<a href="/ru/wiki/' + encodeURIComponent(song) + '">' + song + '</a>');
                }
            }
            html += links.join(' • ');
            html += '</div></div>';

            // Вставляем блок перед «См. также» или в конец страницы
            var target = $('.mw-parser-output');
            if (target.length) {
                target.append(html);
            }
            break;
        }
    }
});