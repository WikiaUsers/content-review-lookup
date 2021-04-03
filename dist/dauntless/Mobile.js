mw.loader.using('mobile.site.styles');
/* Any JavaScript here will be loaded for users using the mobile site */
/*****************************************
/* Flex Main Page Mobile Collapse Script *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2017-Apr-25
// License: CC-BY 3.0
// Version: beta

var fmpmobilecollapse = fmpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( ".fmpblock.mobilecollapsible" ).each( function() {
            var heading = $( this ).find( ".heading" )
            if ( heading.length > 0 ) {
                $( this ).addClass( "mobilecollapsible" + index );
                heading.html( $( '<a href="javascript:fmpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".fmpblock.mobilecollapsible" + index ).each( function() {
            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( this ).addClass( 'expanded' );
            } else {
                $( this ).removeClass( 'expanded' );
                $( this ).addClass( 'collapsed' );
            }
        } );
    }
}

window.fmpmobilecollapse = fmpmobilecollapse;

$( document ).ready( fmpmobilecollapse.initialize );

/*********************************************
/* End Flex Main Page Mobile Collapse Script *
/*********************************************/