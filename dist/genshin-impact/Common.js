/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// Modifying redirect button from WikiEditor's source mode
$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', ( event, section ) => {
	// The exact paths are available in `jquery.wikiEditor.toolbar.config.js` file of the extension
	section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
	section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
} );

// Custom script settings
window.dev = window.dev || {};
(window.dev.BetterUpload = {}).redirectFormat = {
	'default': '==Licensing==\n{{Fairuse}}',
	redirectFormat: '#redirect [[File:%TARGET%]]\n[[Category:Redirect Pages]]'
};