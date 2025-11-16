/* Any JavaScript here will be loaded for users using the mobile site */
/************************************
/* Mobile Main Page Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2017-Feb-13
// License: CC-BY 3.0
// Version: beta

var mmpcollapse = mmpcollapse || {
    initialize : function() {
        var index = 0;
        $( ".mmpcollapsible" ).each( function() {
            var heading = $( this ).find( ".imageheading" )
            if ( heading.length > 0 ) {
                $( this ).addClass( "mmpcollapsible" + index );
                if ( !( $( this ).hasClass( 'expanded' ) ) ) {
                    $( this ).addClass( "collapsed" );
                }
                heading.html( $( '<a href="javascript:mmpcollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".mmpcollapsible" + index ).each( function() {
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

window.mmpcollapse = mmpcollapse;

$( document ).ready( mmpcollapse.initialize );

/****************************************
/* End Mobile Main Page Collapse Script *
/****************************************/