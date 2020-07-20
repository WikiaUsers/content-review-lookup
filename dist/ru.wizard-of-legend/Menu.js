(function($) {
    if (!$('#infobody').length) return;
 
    // Параметры вкладок
    var info_settings = {
        '1': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/5/55/Menu1.png',
            link: 'Арканы',
            links: ["хаоса", "огненные", "водяные", "земляные", "воздушные"],
            info: 'Каждый аркан относится к какому-либо элементу: \n'
        },
 
        '2': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/d/d2/Menu2.png',
            link: 'Реликвии',
            links: [],
            info: 'Дают пассивные бонусы персонажу внутри Испытания хаоса.',
        },
 
        '3': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/4/45/Menu3.png',
            link: 'Неигровые персонажи',
            links: [],
            info: 'Различные персонажи (НПС), которых можно встретить в Испытании хаоса и на входе в него.'
        },
 
        '4': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/3/38/Menu4.png',
            link: 'Враги',
            links: [],
            info: 'Противники главного героя, встречаются на каждом этаже, кроме локаций босса.'
        },
 
        '5': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/9/9f/Menu5.png',
            link: 'Боссы',
            links: ["Атлас", "Фрея", "Зил", "Мастер Сура"],
            info: ''
        },
 
        '6': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/b/b3/Menu6.png',
            link: 'Костюмы',
            links: [],
            info: 'Различные мантии, которые дают какие-либо бонусы главному герою.'
        },
                '7': {
            img: 'https://images.wikia.nocookie.net/wizard-of-legend/ru/images/b/b7/Menu7.png',
            link: 'Сундуки',
            links: [],
            info: 'Содержат в себе различные игровые предметы.'
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
 
        $('.info_link').attr('href', '' + info_settings[key].link);
        $('.info_text .title').text(info_settings[key].link);
        $('.info_text .text').text(info_settings[key].info);
        for (var i = 0; i < info_settings[key].links.length; i++) {
            $('.info_text .text').append('<a href="/wiki/' + info_settings[key].links[i] + '">' + info_settings[key].links[i] + '</a>' + (i + 1 < info_settings[key].links.length ? ' • ' : ''));
       }
    }
 
    // При наведении выдать новую вкладку
    $('.info_switcher_item').on('hover', function() {
        var key =  $(this).attr('data-key');
        buildBody($(this), key);
    });
 
    buildBody($('.info_switcher_item:first-child'), '1');
 
    $('#infobody').show();
})(this.jQuery);