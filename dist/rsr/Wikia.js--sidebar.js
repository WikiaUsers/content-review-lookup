( function ( $, mw ) {

    'use strict';
    var i = 0, //don't change this
    //replace these when updating for events and such
    show_box = false, //change to true for the few days before event
    header_text = "Calculator Ideas", //title of the sidebar box
    link_pagename = "RuneScape:Calculators/Ideas", //fullpagename of page to link to
    link_description = "Have an idea for a new RuneScape calculator? Tell us about it here."; //text to be linked
 
 
    function addRSWGuideModule() {
        $( '<section>' )
            .attr( 'class', 'RSWGuide module' )
            .append(
                $( '<h2>' )
                    .css( {
                        'margin-top': '0px',
                        'margin-bottom': '10px'
                    } )
 
                    // Head text for module
                    .text( header_text )
            )
            .append(
                $( '<div>' )
                    .append(
                        $( '<p>' )
                            .append(
                                $( '<a>' )
                                    .attr( 'href', mw.util.wikiGetlink(link_pagename) )
                                    .text( link_description )
                            )
                    )
            )
            .insertBefore( '.ChatModule' );
    }
 
    function init() {
        if ( $( '.ChatModule' ).length ) {
            addRSWGuideModule();
            return;
        }
        if (i < 60) { //retry for 10 seconds
            i++;
            setTimeout( init, 500 );
        }
    }
    
    if (show_box) {
        init();
    }

}( this.jQuery, this.mediaWiki ) );