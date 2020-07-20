importScriptPage('MediaWiki:Latinify/code.js', 'kocka');

/* Avtomatyčne nadanńa statusiv za kiľkisťu redahuvań korystuvača */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 100) {
            title = "Počatkiveć";
        } else if (editCount > 100 && editCount <= 500) {
            title = "Znaveć";
        } else if (editCount > 500 && editCount <= 1000) {
            title = "Majster";
        } else if (editCount > 1000 && editCount <= 2000) {
            title = "Profesional";
        } else {
            title = "Ekspert";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );
;