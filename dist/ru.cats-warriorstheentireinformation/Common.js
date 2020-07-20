/*Автоматическая выдача плашек по числу правок участника */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 100) {
            title = "Котёнок";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Оруженосец";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Старший Оруженосец";
        } else if (editCount > 1000 && editCount <= 2000) {
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