/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importScriptPage('SocialIcons/code.js', 'dev');

/* Изменение плашек */
importScript('MediaWiki:Common.js/masthead.js');

/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Котёнок";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Оруженосец";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Воитель";
        } else {
            title = "Старший воитель";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});