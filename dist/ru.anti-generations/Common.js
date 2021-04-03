/* Плашки */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Котёнок/Волчонок";
        } else if (editCount > 100 && editCount <= 1000) {
            title = "Оруженосец";
        } else if (editCount > 1000 && editCount <= 3000) {
            title = "Воитель";
        } else if (editCount > 3000 && editCount <= 6000) {
            title = "Старший Воитель";
        } else if (editCount > 6000 && editCount <= 10000) {
            title = "Глашатай";
        } else {
            title = "Старейшина";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});