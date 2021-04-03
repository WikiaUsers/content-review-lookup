(function($) {
    if (!$('#infobody').length) return;

    // Параметры вкладок
    var info_settings = {
        'gameplay': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Hytale',
            info: 'Общая информация об игре.',
            class: '01'
        },
        
        'hypixel_studios': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Hypixel Studios',
            info: 'Информация об игровой компании, занимающейся разработкой Hytale.',
            class: '02'
        },

        'npcs': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Существа',
            info: 'Информация о существах, населяющих мир Hytale. В игре присутствуют монстры, животные и разумные виды.',
            class: '03'
        },

        'blocks': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Предметы',
            info: 'Информация о кубических структурах, из которых состоит мир Hytale.',
            class: '04'
        },

        'items': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Предметы',
            info: 'Информация о различных объектах, с которыми игрок может взаимодействовать.<br />Пища нужна для восполнения шкалы голода.<br />Оружие используется для защиты от враждебных существ и охоты на диких животных.',
            class: '05'
        },

        'minigames': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Мини-игры',
            info: 'Информация о различных мини-играх, доступных в Hytale.',
            class: '06'
        },

        'music': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Музыка и звуки',
            info: 'Информация об официальных саундтреках и звуках в Hytale.',
            class: '07'
        },

        'versions': {
            img: 'https://gamepedia.cursecdn.com/hytale_ru_gamepedia/8/89/53px-Frame.png',
            link: 'Предстоящие версии',
            info: 'Информация о предстоящих обновлениях Hytale.',
            class: '08'
        },
    };
    $('.info_link_body').append('<a href="#" class="info_link">Читать</a>');

    $.each(info_settings, function(k,v) {
        $('.info_switcher').append(
            '<a class="info_switcher_item is_item' + v.class + '" data-key="' + k + '" href="/ru/wiki/Категория:' + v.link +'">' +
            '</a>'
        );

    });

    function buildBody($that, key) {
        if ($('.info_text .text').text() != info_settings[key].info) {
            $('.info_switcher_selected').toggleClass('info_switcher_selected');
            $that.toggleClass('info_switcher_selected');
            if ($('.info_text').css("display") != "none") {
                $('.info_text').fadeOut("fast", (function() {               
                    $('.info_link').attr('href', '/Категория:' + info_settings[key].link);
                    $('.info_text .title').text(info_settings[key].link);
                    $('.info_text .text').text(info_settings[key].info);
                    $('.info_text').fadeIn("fast");
                }));
            }   else {
                $('.info_link').attr('href', '/Категория:' + info_settings[key].link);
                $('.info_text .title').text(info_settings[key].link);
                $('.info_text .text').text(info_settings[key].info);  
                $('.info_text').fadeIn("fast");
            }
        }
    } 

    // При наведении выдать новую вкладку
    $('.info_switcher_item').on('hover', function() {
        var key =  $(this).attr('data-key');
        buildBody($(this), key);
    });
    
    buildBody($('.info_switcher_item:first-child'), 'gameplay');

    $('#infobody').fadeIn("slow");
})(this.jQuery);