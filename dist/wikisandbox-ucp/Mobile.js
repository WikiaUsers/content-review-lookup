/* Any JavaScript here will be loaded for users using the mobile site */
/************************************
/* Main Page Mobile Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2018-Jun-7
// License: CC-BY 3.0

// This script, paired with .mobilecollapsible styles in MediaWiki:Mobile.css, supports making .fpbox collapsible in the mobile view using both the standard
// 2 or 3-column responsive front pages.

// Making an .fpbox collapsible in mobile view involves the following:
//   1. Adding "mobilecollapsible" as another class alongside "fpbox".
//   2. Making sure there is a heading identified by the "heading" class.
//      * Links inside headings can still work, but aren't recommended because they'll be easy to fat-finger while trying to collapse/expand the box.
//      * The script allows multiple headings and automatically ignores any with the "nomobile" or "notoggle" class.
//      * If there are still multiple headings after excluding those, only the first is turned into a collapsing toggle link.
//   3. Placing the area that should be hidden when collapsed inside a div or other block with the "body" class.
//      * It's usually best for this to be everything in the box *except* the heading.
//   4. Optionally add "expanded" next to "mobilecollapsible" to leave the box expanded by default.

var fpmobilecollapse = fpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( '.fpbox.mobilecollapsible' ).each( function() {
            var heading = $( this ).children( '.heading' ).not( '.nomobile, .notoggle' );
            if ( heading.length > 0 && $( this ).children( '.body' ).length > 0 ) {
                $( this ).addClass( 'mobilecollapsible' + index );
                if ( !( $( this ).hasClass( 'expanded') ) ) {
                    $( this ).addClass( 'collapsed' );
                }
                heading.first().html( $( '<a class="togglecollapse" href="javascript:fpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( '.fpbox.mobilecollapsible' + index ).each( function() {
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

window.fpmobilecollapse = fpmobilecollapse;

$( document ).ready( fpmobilecollapse.initialize );

/****************************************
/* End Main Page Mobile Collapse Script *
/****************************************/

/**
 * Test FandomMobile
 */
!(function() {
  var skin = mw.config.get('skin') || ''
  if (skin === 'fandommobile') {
    console.log(
      "  ______              _                 __  __       _     _ _      \n |  ____|            | |               |  \\/  |     | |   (_) |     \n | |__ __ _ _ __   __| | ___  _ __ ___ | \\  / | ___ | |__  _| | ___ \n |  __/ _` | '_ \\ / _` |/ _ \\| '_ ` _ \\| |\\/| |/ _ \\| '_ \\| | |/ _ \\\n | | | (_| | | | | (_| | (_) | | | | | | |  | | (_) | |_) | | |  __/\n |_|  \\__,_|_| |_|\\__,_|\\___/|_| |_| |_|_|  |_|\\___/|_.__/|_|_|\\___|"
    )
  }
})()