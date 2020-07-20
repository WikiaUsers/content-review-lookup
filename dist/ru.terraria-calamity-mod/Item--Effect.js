$( 'section[data-item-name=effect' ).click(function() {
    $( '.effectShow' ).each(function() {
        $( this ).removeClass('effectShow');
    });
    if ( $( this ).hasClass('effectShow') ) $( this ).removeClass('effectShow');
    else $( this ).addClass('effectShow');
});