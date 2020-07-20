/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Котёнок";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Ученик";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Воин";
        } else {
            title = "Старший Воин";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }