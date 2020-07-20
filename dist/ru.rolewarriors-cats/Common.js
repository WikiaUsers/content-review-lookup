/*Автоматическая выдача плашек по числу правок участника */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 3) {
            title = "Котёнок";
        } else if (editCount > 3 && editCount <= 50) {
            title = "Оруженосец";
        } else if (editCount > 50 && editCount <= 100) {
            title = "Старший Оруженосец";
        } else if (editCount > 100 && editCount <= 200) {
            title = "Воитель";
        } else {
            title = "Старший Воитель";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );
;
//insertusername
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/*Отображение ника на странице с соответствующим шаблоном*/
(function($, mw) {
    if (!$('.insertusername').length) {
        return;
    }
 
    if (wgUserName !== null) {
        $('.insertusername').text(wgUserName);   
    } else {
        $('.insertusername').text('Анонимный участник');
    }