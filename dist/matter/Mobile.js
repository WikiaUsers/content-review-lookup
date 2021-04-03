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
                $( this ).addClass( "collapsed" );
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


/**************************************************
/* Responsive Flex Passage Mobile Collapse Script *
/**************************************************/
// Author:  Shawn Bruckner
// Date:    2019-Jun-09
// License: CC-BY 3.0
// Version: 1.0

// This script enables the mobile collapse features of responsive flex passages
// See Template:RFP block for more information.

var rfpmobilecollapse = rfpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( ".rfpblock.rfpmobilecollapsible" ).each( function() {
            var heading = $( this ).find( ".heading" )
            if ( heading.length > 0 ) {
                $( this ).addClass( "rfpmobilecollapsible" + index );
                if ( !$( this ).hasClass( 'expanded' ) ) {
                    $( this ).addClass( "collapsed" );
                }
                heading.html( $( '<a href="javascript:rfpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".rfpblock.rfpmobilecollapsible" + index ).each( function() {
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

window.rfpmobilecollapse = rfpmobilecollapse;

$( document ).ready( rfpmobilecollapse.initialize );

/******************************************************
/* End Responsive Flex Passage Mobile Collapse Script *
/******************************************************/