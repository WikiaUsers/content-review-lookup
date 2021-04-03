noteTAvector = ( function() { $( function() {
    $( 'body.skin-hydra .mw-indicator[id^=mw-indicator-noteTA-]' )
        .addClass( 'vectorTabs' )
        .removeAttr( 'style' )
        .empty()
        .each( function() {
            $( '<a href="#"><span style="padding:1px 3px; background: #d3e3f4; color:#000000;height:85%;">汉</span><span style="padding:1px 3px; background: #e9e9e9; color:#434343;height:85%;">漢</span></a>' )
                .click( function( e ) {
                    e.preventDefault();
                } )
                .wrap( '<ul><li><span></span></li></ul>' )
                .parent().parent().parent().appendTo( this );
        } )
        .insertAfter( '#p-variants' );
} ); } );

mw.hook('wikipage.content').add( function ( $content ) {
    //if ( $( '#p-variants' ).next().hasClass('vectorTabs') ) return;
    $( '#p-variants' ).next().remove(); // Will blink duing load preview, but this will avoid the icon won't removed if the TA template is removed, and avoid repeated click event listener from noteTAViewer.
    setTimeout("noteTAvector();", 1);
});