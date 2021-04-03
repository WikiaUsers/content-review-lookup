/* Any JavaScript here will be loaded for users using the mobile site */
/*****************************************
/* Flex Main Page Mobile Collapse Script *
/*****************************************/
// Author:  Shawn Bruckner
// Edited by Patrick Johnston
// Date:    2017-Apr-25
// License: CC-BY 3.0
// Version: beta

var fmpmobilecollapse = fmpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( ".fpbox.mobilecollapsible" ).each( function() {
            var heading = $( this ).find( ".heading" )
            if (heading.length > 0) {
                $(this).addClass( "collapsed" );
                $(this).css("cursor","pointer").click(function() { $(this).toggleClass("collapsed").toggleClass("expanded"); });
            }
        } );
    }
}

window.fmpmobilecollapse = fmpmobilecollapse;

$( document ).ready( fmpmobilecollapse.initialize );

/*********************************************
/* End Flex Main Page Mobile Collapse Script *
/*********************************************/