/**
 * @name        Currency Converter
 * @author      Kofirs2634
 * @version     1.1
 * @description Allows to insert a module with currency converter into the page. Created special for Axong Wiki.
 */
$(function($) {
    if (window.CCUpload) return;
    window.CCUpload = true;
    var state = false,
        path = mw.config.get('wgArticlePath'),
        exchanges = [];

    function calculate(cur) {
        if (cur == null) return;
        exchange = exchanges[parseInt(cur)].split(':')[1].replace(/\s/g, '').replace(',', '.');
        state ? exchange = 1 / exchange : exchange;
        input = parseFloat($('#currency-in').val().replace(',', '.'));
        input ? input : input = 0;
        $('#currency-out').val((exchange * input).toFixed(2))
    }
    function swap() {
        if (!state) {
            $('#cur-name-in').empty().append($('<select>'));
            exchanges.forEach(function(e, n) {
                $('#cur-name-in select').append($('<option>', {
                    name: e.toLowerCase().match(/\w{3}/)[0],
                    value: n,
                    text: e.split(':')[0]
                }))
            });
            $('#cur-name-out').empty().append('Шпицисские (SPZ)');
            state = true;
        } else {
            $('#cur-name-in').empty().append('Шпицисские (SPZ)');
            $('#cur-name-out').empty().append($('<select>'));
            exchanges.forEach(function(e, n) {
                $('#cur-name-out select').append($('<option>', {
                    name: e.toLowerCase().match(/\w{3}/)[0],
                    value: n,
                    text: e.split(':')[0]
                }))
            });
            state = false
        }
        $('.ax-converter select').bind('click change', function() { calculate($('.ax-converter select').val()) });
        calculate(0)
    }
    $('.ax-converter').append('<h2><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" width="16"><path d="M 728 264 m -7.461 0 a 7.461 7.461 0 1 0 14.922 0 a 7.461 7.461 0 1 0 -14.922 0 Z M 728 264 m -6.374 0 a 6.374 6.374 0 0 1 12.748 0 a 6.374 6.374 0 0 1 -12.748 0 Z" style="" transform="matrix(0.440673, 0.897668, -0.897668, 0.440673, -75.825598, -761.839802)" bx:shape="ring 728 264 6.374 6.374 7.461 7.461 1@bb09e128"></path><path style="fill: rgba(216, 216, 216, 0); stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: bevel;" d="M 7.983 13.309 C 9.909 13.308 11.854 11.437 11.483 9.942 C 11.21 8.837 9.482 8.256 8.163 9.2 C 6.134 10.652 4.067 9.418 4.761 7.423 C 5.196 6.178 7.032 4.915 8.573 5.185" transform="matrix(-0.810432, -0.585832, 0.585832, -0.810432, 9.300218, 21.252491)" bx:origin="0.509 0.527"></path><polyline style="stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: bevel; fill: rgba(216, 216, 216, 0);" points="7.1620001792907715 3.2230000495910645 8.53499984741211 3.9739999771118164 9.119999885559082 2.683000087738037" transform="matrix(0.968355, 0.249576, -0.249576, 0.968355, 1.021334, -2.013179)" bx:origin="0.703 0.451"></polyline></svg>Конвертер</h2>')
        .append($('<table>', {
            align: 'center',
            style: 'text-align: center'
        }).append($('<tr>').append($('<td>')
            .append($('<input>', {
                type: 'number',
                id: 'currency-in'
            })))
        .append($('<td>', {
            rowspan: '2',
            style: 'font-size: 3em',
            text: '→'
        })).append($('<td>')
            .append($('<input>', {
                type: 'text',
                id: 'currency-out',
                disabled: 'disabled'
            }))))
        .append($('<tr>').append($('<td>', {
            id: 'cur-name-in',
            text: 'Шпицисские (SPZ)'
        })).append($('<td>', { id: 'cur-name-out' }).append($('<select>').append($('<option>', {
            text: 'Загрузка валют...',
            selected: 'selected',
            disabled: 'disabled'
        })))))
        .append($('<tr>').append($('<td>', { colspan: '3' }).append($('<span>', {
            'class': 'button',
            text: 'Поменять местами'
        })))))
        .append($('<div>', { 'class': 'cur-panel' }));
    $('.cur-panel').append('<h3><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" width="20"><polyline style="stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; fill: rgba(216, 216, 216, 0);" points="0.6159999966621399 15.378000259399414 3.187999963760376 7.980999946594238 6.906000137329102 12.291999816894531 9.081000328063965 9.484999656677246 11.930000305175781 11.541000366210938 14.65999984741211 1.7710000276565552"></polyline><path d="M 27.769 4.628 L 29.105 6.942 L 26.433 6.942 L 27.769 4.628 Z" style="stroke-linecap: round;" transform="matrix(0.969941, 0.24334, -0.24334, 0.969941, -10.795218, -10.992917)" bx:shape="triangle 26.433 4.628 2.672 2.314 0.5 0 1@7698618f" bx:origin="0.49 0.646"></path></svg>Текущий курс валют</h3><ul><li>Загрузка валют...</li></ul>');
    $.get(path.replace('$1', 'MediaWiki:Custom-Converter?action=raw'), function(data) {
        for (i = 0; i < data.split('\n').length - 2; i++) exchanges[i] = data.split('\n')[i + 2];
        $('.cur-panel ul').empty();
        $('.ax-converter select').empty();
        exchanges.forEach(function(e, n) {
            $('.ax-converter select').append($('<option>', {
                name: e.toLowerCase().match(/\w{3}/)[0],
                value: n,
                text: e.split(':')[0]
            }))
            $('.cur-panel ul').append($('<li>', { text: '1 SPZ → ' + e.split(':')[1].replace(/\s/g, '') + ' ' + e.match(/\w{3}/)[0] }))
        })
    })
    $('.ax-converter #currency-in').bind('keyup change', function() { calculate($('.ax-converter select').val()) })
    $('.ax-converter select').bind('click change', function() { calculate($('.ax-converter select').val()) })
    $('.ax-converter .button').click(swap)
})