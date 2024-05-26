/**
 * Tutorial script: QuickRC ("Quick Recent Changes")
 *
 * A tutorial user script which adds a link to the toolbox to show a pop-up
 * dialog with up to 25 recent edits.
 *
 * Demonstrates:
 * - Use of the API
 * - Use of jQuery
 * - Use of ResourceLoader and some of the default modules that come with it
 *
 * (Be bold and improve it!)
 *
 * Authors:
 * Erik Moeller, 2011, public domain
 * 
 */

// Import the jQuery dialog plugin before starting the rest of this script
mw.loader.using(['jquery.ui.dialog'], function() {

    function renderQuickRCDialog( pageLinks ) {
    	var $dialog = $( '<div></div>' )
			.html(
				'<strong>Welcome, ' + mw.user.name() +
				'!</strong> The following pages have been recently modified:<br/><ul><li>' +
				pageLinks.join( '<br /><li>' ) + '</ul>'
			)
			.dialog({
				autoOpen: true,
				title: 'Hello there!',
				width: '70%',
				modal: true
			});
	}

	function quickRC() {
		var myPageLinks = [];
		var myTitles = [];

		// Fetch recent changes from the API by one of jQuery's AJAX functions
		jQuery.getJSON(
			mw.util.wikiScript( 'api' ),
			{
				'format': 'json',
				'action': 'query',
				'list': 'recentchanges',
				'rclimit' : 25
			},
			function( data ) {

				// Build a unique array of links, using the mw.html library to format them.
				$.each ( data.query.recentchanges , function( index , rc ) {
					// Don't link to this title if we've seen this title already
					if ( $.inArray( rc.title, myTitles ) === -1 ) {
						myPageLinks.push(
							mw.html.element(
								'a', { href: mw.util.wikiGetlink( rc.title ) }, rc.title
							)
						);
					}

					myTitles.push( rc.title );
				} ) ;

				renderQuickRCDialog( myPageLinks );
			}
		);
	}

	$(document).ready( function() {

    	// Add a link to the toolbox
		var link = mw.util.addPortletLink(
            'navigation_widget.widget.sidebox.navigation_box',
			'#',
			'Quick changelog',
    		'qchangelog',
			'Show a quick overview of changes',
			null,
			'#t-whatlinkshere'
		);

		// Create a jQuery object for this link so that we get
		// to use jQuery awesomeness like .click() for binding functions to events
		// and methods like e.preventDefault();
		$(link).click( function( e ) {
			// Avoid the browser going to '#'
			e.preventDefault();

			// Initiate quickRC!
			quickRC();
		});

	});

});