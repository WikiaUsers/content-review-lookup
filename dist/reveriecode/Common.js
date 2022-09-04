// Tweaking redirect button from WikiEditor's source mode / <nowiki>
$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', function( event, section ) {
	// The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
	section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
	section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
} );
// </nowiki>