/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[WT:Gadget]] before editing. |
 * |_____________________________________________________________________________|
 */


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
			subpageName: 'sandbox',
			portletLabel: 'My Sandbox',
			portletTooltip: 'Go to your sandbox',
		};
		// Don't alter the code below

		// Use Special:MyPage (as opposed to mw.user.getName()) so that it
		// works for logged-out users as well.
		title = new mw.Title( 'Special:MyPage/' + conf.subpageName );

		url = new mw.Uri( title.getUrl() );
		url.extend({
			action: 'edit',
			redlink: 1,
		});

		mw.util.addPortletLink(
			'navigation_widget.widget.sidebox.navigation_box',
			url,
			conf.portletLabel,
			'mysandbox',
			conf.portletTooltip,
			null,
			'li#mysandbox'
		);
	});
}( mediaWiki, jQuery ) );