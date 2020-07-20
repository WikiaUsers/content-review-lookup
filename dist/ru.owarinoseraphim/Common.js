/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Автоматическая выдача плашек по числу правок участника */
$(function () {
    if ($(".tally > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = $(".tally > em").text();
        var title = '';
        if (editCount <= 100) {
            title = "Ребёнок";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Воин";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Демон";
        } else {
            title = "Вампир";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
});
 
/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
    if (!$('.insertusername').length) {
        return;
    }
 
    if (wgUserName !== null) {
        $('.insertusername').html(wgUserName);   
    } else {
        $('.insertusername').text('Анонимный участник');
    }
})(this.jQuery, this.mediaWiki);