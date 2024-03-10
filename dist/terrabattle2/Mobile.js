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


/***************************
/* Tabber Extension Script *
/***************************/

/* Copied from https://raw.githubusercontent.com/HydraWiki/Tabber/master/js/tabber.js */

(function($) {
	$.fn.tabber = function() {
		return this.each(function() {
			// create tabs
			var $this = $(this),
			    tabContent = $this.children('.tabbertab'),
			    nav = $('<ul>').addClass('tabbernav');
			tabContent.each(function() {
				var anchor = $('<a>').text(this.title).attr('title', this.title).attr('href', 'javascript:void(0);');
				$('<li>').append(anchor).appendTo(nav);
			});
			$this.prepend(nav);

			/**
			 * Internal helper function for showing content
			 * @param  string title to show, matching only 1 tab
			 * @return true if matching tab could be shown
			 */
			function showContent(title) {
				var content = tabContent.filter('[title="' + title + '"]');
				if (content.length !== 1) return false;
				tabContent.hide();
				content.show();
				nav.find('.tabberactive').removeClass('tabberactive');
				nav.find('a[title="' + title + '"]').parent().addClass('tabberactive');
				return true;
			}
			// setup initial state
			var loc = location.hash.replace('#', '');
			if ( loc == '' || !showContent(loc) ) {
				showContent(tabContent.first().attr('title'));
			}

			// Repond to clicks on the nav tabs
			nav.on('click', 'a', function(e) {
				var title = $(this).attr('title');
				e.preventDefault();
				location.hash = '#' + title;
				showContent( title );
			});

			$this.addClass('tabberlive');
		});
	};
})(jQuery);

$(document).ready(function() {
	$('.tabber').tabber();
});

/*******************************
/* End Tabber Extension Script *
/*******************************/