// Szablon do zmiany tła
$(function() {
    if($('#dostosujTlo').length > 0) {
        var cl = $($('#dostosujTlo').get(0)).data('bg');
        if(cl) {
            cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
            $(document.body).addClass('tlo-' + cl);
        }
    }
});

// Zmiana tła zależnie od pory dnia
$(function() {
    function isDefaultBG() {
        var bg = $(document.body).css('background-image');
        return bg == 'none' || bg.indexOf('/skins/oasis/css/') > -1 || bg.indexOf('Wiki-background') > -1;
    }
    if(isDefaultBG()) {
        var cl = ([
            'BG7', // 0
            'BG5', // 1
            'BG5', // 2
            'BG5', // 3
            'BG5', // 4
            'BG5', // 5
            'BG8', // 6
            'BG8', // 7
            'BG8', // 8
            'BG8', // 9
            'BG8', // 10
            'BG8', // 11
            'BG3', // 12
            'BG1', // 13
            'BG1', // 14
            'BG1', // 15
            'BG6', // 16
            'BG6', // 17
            'BG2', // 18
            'BG2', // 19
            'BG4', // 20
            'BG4', // 21
            'BG4', // 22
            'BG7'  // 23
        ])[new Date().getHours()];
        $(document.body).addClass(cl);
    }
});