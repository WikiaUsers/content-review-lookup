/*Автоматическая выдача плашек по числу правок участника */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 1) {
            title = "Новый врач";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Врач";
        } else if (editCount > 500 && editCount <=1000) {
            title = "Профессиональный врач";
        } else if (editCount > 1000 && editCount <= 5000) {
            title = "Эксперт";
        } else {
            title = "Министр здравоохраннения";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );
;/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */