(function($) {
    if (!$('#infobody').length) return;

    // Параметры вкладок
    var info_settings = {
        'gameplay': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/c/ce/Gameplay.png/50px-Gameplay.png',
            link: 'Геймплей',
            info: 'В эту категорию входят статьи об игровой механике, а так же о важных игровых моментах, без которых сложно представить полноценную игру.'
        },

        'location': {
            img: 'https://vignette.wikia.nocookie.net/the-long-dark/images/2/28/Карта.png/revision/latest?cb=20170102140452&path-prefix=ru',
            link: 'Локации',
            info: 'В эту категорию входят статьи о разных локациях (местах) в The Long Dark.',
        },

        'medic': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/2/26/Medic.png/50px-Medic.png',
            link: 'Медицина',
            info: 'В эту категорию входят статьи о всех лекарствах, которые можно встретить в игре.'
        },

        'weapon': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/f/fb/Weapon.png/50px-Weapon.png',
            link: 'Оружие',
            info: 'Волки, медведи... Как защитить себя от этих диких зверей? С помощью оружия, конечно же. Да и кто сказал, что с помощью него можно только избавляться от недружелюбных зверей? А как же охота?'
        },

        'food': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/c/c6/Food.png/50px-Food.png',
            link: 'Еда',
            info: 'Еда — важная составляющая игры. Игрок должен постоянно следить за уровнем голода, чтобы не погибнуть.'
        },

        'clother': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/6/69/Clother.png/50px-Clother.png',
            link: 'Одежда',
            info: 'Кто пойдёт на улицу в сорокаградусный мороз без одежды? Поддерживать приемлемую температуру тела персонажа — ещё одна задача игрока. Чтобы не допустить переохлаждения, стоит с умом выбирать одежду.'
        },
        
                'clother2': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/6/69/Clother.png/50px-Clother.png',
            link: 'Одежда',
            info: 'Кто пойдёт на улицу в сорокаградусный мороз без одежды? Поддерживать приемлемую температуру тела персонажа — ещё одна задача игрока. Чтобы не допустить переохлаждения, стоит с умом выбирать одежду.'
        },
        
                'clother3': {
            img: 'https://images.wikia.nocookie.net/the-long-dark/ru/images/thumb/6/69/Clother.png/50px-Clother.png',
            link: 'Одежда',
            info: 'Кто пойдёт на улицу в сорокаградусный мороз без одежды? Поддерживать приемлемую температуру тела персонажа — ещё одна задача игрока. Чтобы не допустить переохлаждения, стоит с умом выбирать одежду.'
        },

        'animals': {
            img: 'https://vignette.wikia.nocookie.net/the-long-dark/images/6/6b/Животное.png/revision/latest?cb=20170102140526&path-prefix=ru',
            link: 'Животные',
            info: 'В The Long Dark есть много разных зверей. Одни опасны, другие — нет...'
        }
    };
    $('.info_link_body').append('<a href="#" class="info_link">Читать</a>');

    $.each(info_settings, function(k,v) {
        $('.info_switcher').append(
            '<div class="info_switcher_item" data-key="' + k + '">' +
                '<a href="' + v.link +'">' +
                   '<img src="' + v.img + '" />' +
                '</a>' +
            '</div>'
        );
    });

    function buildBody($that, key) {
        $('.info_switcher_selected').toggleClass('info_switcher_selected');
        $that.toggleClass('info_switcher_selected');

        $('.info_link').attr('href', '/wiki/Категория:' + info_settings[key].link);
        $('.info_text .title').text(info_settings[key].link);
        $('.info_text .text').text(info_settings[key].info);
    }

    // При наведении выдать новую вкладку
    $('.info_switcher_item').on('hover', function() {
        var key =  $(this).attr('data-key');
        buildBody($(this), key);
    });

    buildBody($('.info_switcher_item:first-child'), 'gameplay');

    $('#infobody').show();
})(this.jQuery);