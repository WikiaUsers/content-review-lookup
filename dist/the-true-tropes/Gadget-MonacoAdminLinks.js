/**
 * Add a "My sandbox" link to the personal portlet menu.
 * Dependencies: mediawiki.util, mediawiki.Title, mediawiki.Uri
 *
 * @source mediawiki.org/wiki/Snippets/MySandbox
 * @version 2
 */
( function ( mw, $ ) {

	$( document ).ready( function () {
		var conf, title, url;

		// Costomize/Translate this to your needs
		conf = {
			subpageName: '',
			portletLabel: 'Admin Links',
			portletTooltip: 'Go to admin panel',
		};
		// Don't alter the code below

		// Use Special:MyPage (as opposed to mw.user.getName()) so that it
		// works for logged-out users as well.
		title = new mw.Title( 'Special:AdminLinks' );

		url = new mw.Uri( title.getUrl() );
		url.extend({
			action: 'view',
		});

		mw.util.addPortletLink(
			'navigation_widget.widget.sidebox.navigation_box',
			url,
			conf.portletLabel,
			'myadminpanel',
			conf.portletTooltip,
			null,
			'li#myadminpanel'
		);
	});
}( mediaWiki, jQuery ) );