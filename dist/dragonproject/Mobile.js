/* Any JavaScript here will be loaded for users using the mobile site *//* Any JavaScript here will be loaded for users using the mobile site */
/************************************
/* Main Page Mobile Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2017-Aug-18
// License: CC-BY 3.0
// Version: beta

var mpmobilecollapse = mpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( ".fpgroup" ).each( function() {
            var heading = $( this ).find( ".mobileheading" )
            if ( heading.length > 0 ) {
                $( this ).addClass( "mobilecollapsible" + index );
                $( this ).addClass( "collapsed" );
                heading.html( '<a href="javascript:mpmobilecollapse.toggle( ' + index + ' )"></a>' );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".fpgroup.mobilecollapsible" + index ).each( function() {
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

window.mpmobilecollapse = mpmobilecollapse;

$( document ).ready( mpmobilecollapse.initialize );

/*********************************************
/* End Flex Main Page Mobile Collapse Script *
/*********************************************/