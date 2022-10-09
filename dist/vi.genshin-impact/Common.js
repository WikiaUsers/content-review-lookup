/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

/* ??? */
window.listUsers = {
    talk: true,
    customgroups: ['content-moderator'],
    limit: 50
};

/* Modifying redirect button from WikiEditor's source mode */
$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', function( event, section ) {
	// The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
	section.groups.insert.tools.redirect.action.options.pre = '#đổi [[';
	section.groups.insert.tools.redirect.action.options.post = ']]\n[[Thể loại:Trang đổi hướng]]';
} );