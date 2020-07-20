/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Автоматическая выдача плашек по числу правок участника */
!function($) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 100) {
            title = "Слабая чародейка";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Умелый кукловод";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Хитрый мечник";
        } else {
            title = "Могущественный берсерк";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}(this.jQuery);

/*Ява для меню заглавной*/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", "") );
            $(window).scroll();                    
            setTimeout($(window).scroll(), 1000);   
            return false;
        });
    });
});

//Неактивные пользователи
InactiveUsers = { 
    months: 2,
    text: 'ПОКИНУЛ ВИКИ ПО ИНЫМ ПРИЧИНАМ'
};
 
window.railWAM = {
    logPage:"Project:WAM Log"
};