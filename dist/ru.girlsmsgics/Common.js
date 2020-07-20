/* Изменение плашек */
importScript('MediaWiki:Common.js/masthead.js');

/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Новая Волшебница";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Волшебница";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Выдающаяся Волшебница";
        } else {
            title = "Легендарная Волшебница";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});