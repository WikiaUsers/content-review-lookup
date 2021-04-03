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



// Reload page with level specification
// Author: Gako

$(function () {
	function APIthing() {
		// If we ever use this gadget outside of the "main" namespace then we don't want to precede the name of the page with a ':'
		// So if current namespace number is 0 (i.e. main) then add a ':' before the pageName, otherwise don't
		var includePage = mw.config.get('wgNamespaceNumber') == 0 ? ':' + mw.config.get('wgPageName') : mw.config.get('wgPageName');
		var text = "{{#vardefine:mygamestage|" + inputValue + "}}{{" + includePage + "}}";
		var api = new mw.Api();
		api.get({
			action : "parse",
			title: mw.config.get('wgPageName'),
			text : text,
			prop : "text"
		}).then(function(data){
			var result = data.parse.text['*'];
			// define the container as a variable cos we'll use it twice
			var $container = $("#mw-content-text .mw-parser-output .mw-parser-output");
			$container.html(result);
			// this line of code makes the wiki reload the code that makes a table sortable after we replace the content of the page
			mw.hook('wikipage.content').fire($container);
		});
	}
	$("#level-entry-submit").click(function (event) {
		var checkValue = $("#level-entry-level").val();
		var inputVal;
		if (isNaN(checkValue) || checkValue>999999 || checkValue<0) {
			inputValue = 1
		} else {
			inputValue = $("#level-entry-level").val();
		}
		event.preventDefault();
		// we'll always show the current game stage on the page as part of the header, so that people know it starts out as 1
		$('#level-entry-current').html(inputValue);
		APIthing();
	});
});