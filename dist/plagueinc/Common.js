/* Any JavaScript here will be loaded for all users on every page load. */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
};
importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
    ]
});
/* Auto Refresh */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]

/* Switcher */
'use strict';
$( function () {
	$.each( document.querySelectorAll( '.switcher-container' ), function ( i, container ) {
		var selected, $radio;
		var switchers = []
		var radioName = 'switcher-' + i;
		$.each( container.children, function ( j, switcher ) {
			var label = switcher.querySelector( '.switcher-label' );
			if ( !label || !label.childNodes.length ) {
				return;
			}
			switchers.push( switcher );
			$radio = $( '<input>' ).prop({ type: 'radio', name: radioName }).on( 'click', function () {
				$( selected ).hide();
				$( switcher ).show();
				selected = switcher;
			} );
			if ( !selected ) {
				// Mark the first one as selected
				selected = switcher;
				$radio.prop( 'checked', true );
			} else if ( label.getAttribute( 'data-switcher-default' ) !== null ) {
				// Custom default
				$radio.click();
			} else {
				// Hide non-default
				$( switcher ).hide();
			}
			$( '<label style="display:block"></label>' ).append( $radio, label.childNodes ).appendTo( container );
			$( label ).remove();
		} );
		if ( switchers.length > 1 ) {
			$( '<label style="display:block">Show all</label>' ).prepend(
				$( '<input>' ).prop({ type: 'radio', name: radioName }).on( 'click', function () {
					$( switchers ).show();
					selected = switchers;
				} )
			).appendTo( container );
		}
		if ( switchers.length === 1 ) {
			$radio.remove();
		}
	} );
} );

/* Slideshow (Credit: Chocòωólina)*/
mw.hook('wikipage.content').add(function() {
    const slider_content = document.querySelectorAll('.slider_content');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    if (slider_content.length === 0 || !next || !prev) {
        // One or more of these elements don't exist. Exit early.
        return;
    }
    var index = 0;

    const mount = function() { slider_content[index].classList.add('active'); };
    const unmount = function() { slider_content[index].classList.remove('active'); };
    next.addEventListener('click', function() {
        unmount();
        if (index >= slider_content.length - 1){
            index = 0;
        } else {
            index++;
        }
        mount();
    });

    prev.addEventListener('click', function() {
        unmount();
        if (index <= 0) {
            index = slider_content.length - 1;
        } else {
            index--;
        }
        mount();
    });
    mount();
});