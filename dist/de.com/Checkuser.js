//CU-Skript von Kopcap94 - angepasst für die Commmunity Deutschland von Dragon Rainbow
(function( $, mw ) {
    'use strict';
    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'CheckUser' ) {
        return;
    }
 
    var msg, type = 'Trolls';
 
    function set_reason( t ) {
        switch ( t ) {
            case 'subedits':
                msg = 'Bearbeitungen';
                break;
            case 'subipusers':
                msg = 'Sockenpuppen';
                break;
            case 'subuserips':
                msg = 'IP';
                break;
        }
 
        $( '#checkreason' ).val( 'Um die ' + msg + ' des ' + type + ' zu bekommen');
    }
 
    set_reason( $( '.checkuserradios input:checked' ).attr( 'id' ) );
 
    $( '<button />', {
        'data-type': 'troll',
        type: 'button',
        style: 'margin: 0 2px; padding: 0 3px;',
        text: 'Vandale/Spammer'
    })
    .insertAfter( '#checkreason' )
    .on( 'click', function() {
        if ( $( this ).attr( 'data-type' ) === 'troll' ) {
            type = 'Vandalen/Spammers';
            $( this )
                .attr( 'data-type', 'vandalismus' )
                .text( 'Troll' );
        } else {
            type = 'Trolls';
            $( this )
                .attr( 'data-type', 'troll' )
                .text( 'Vandale/Spammer' );
        }
 
        set_reason( $( '.checkuserradios input:checked' ).attr( 'id' ) );
    });
 
    $( '.checkuserradios input' ).on( 'change', function() {
        set_reason( $( this ).attr( 'id' ) );
    });
})( this.jQuery, this.mediaWiki );