(function($) {
    if (!$('#infobody').length) return;
 
    // Параметры вкладок
    var info_settings = {
        '1': {
            img: 'https://vignette.wikia.nocookie.net/justcause/images/c/cf/%D0%9C%D0%B5%D0%BD%D1%8E2.png/revision/latest?cb=20190323064143&path-prefix=ru',
            template: '{{Button}}',
            link: 'Оружие',
            links: ["Оружие (JC1)", "Оружие (JC2)", "Оружие (JC3)", "Оружие (JC4)"],
            info: '\n'
        },
 
        '2': {
            template: '{{Button}}',
            link: 'Транспорт',
            links: ["Транспорт (JC1)", "Транспорт (JC2)", "Транспорт (JC3)", "Транспорт (JC4)"],
            info: '',
        },
 
        '3': {
            template: '{{Button}}',
            link: 'Персонажи',
            links: ["Персонажи (JC1)", "Персонажи (JC2)", "Персонажи (JC3)", "Персонажи (JC4)"],
            info: ''
        },
 
        '4': {
            template: '{{Button}}',
            link: 'Фракции',
            links: ["Фракции (JC1)", "Фракции (JC2)", "Фракции (JC3)", "Фракции (JC4)"],
            info: ''
        },
 
        '5': {
            template: '{{Button}}',
            link: 'Локации',
            links: ["Локации (JC1)", "Локации (JC2)", "Локации (JC3)", "Локации (JC4)"],
            info: ''
        },
 
        '6': {
            template: '{{Button}}',
            link: 'Миссии',
            links: ["Миссии (JC1)", "Миссии (JC2)", "Миссии (JC3)", "Миссии (JC4)"],
            info: ''
        },
                '7': {
            template: '{{Button}}',
            link: 'Прочее',
            links: ["Прочее (JC1)", "Прочее (JC2)", "Прочее (JC3)", "Прочее (JC4)"],
            info: ''
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