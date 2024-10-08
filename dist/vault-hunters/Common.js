/* Any JavaScript here will be loaded for all users on every page load. */

/* Config for [[w:c:dev:PreloadFileDescription]] */
PFD_templates = '{'+'{Information\n|description=\n|source=\n|date=\n|author=\n|permission=\n|other_versions=\n}}';
PFD_license = 'License';
PFD_discourageEditorFileUpload = true

/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
});

/* Any JavaScripts below here are copied from [[w:c:minecraft:MediaWiki:Common.js]]*/
( function() {
'use strict';

/* Fires when DOM is ready */
$( function() {
	
/** 
 * Fix edit summary prompt for undo
 *
 * Fixes the fact that the undo function combined with the "no edit summary prompter"
 * causes problems if leaving the edit summary unchanged.
 * Added by [[wikipedia:User:Deskana]], code by [[wikipedia:User:Tra]].
 * See https://bugzilla.wikimedia.org/show_bug.cgi?id=8912
 */
if ( document.location.search.indexOf( "undo=" ) !== -1 && document.getElementsByName( 'wpAutoSummary' )[0] ) {
	document.getElementsByName( 'wpAutoSummary' )[0].value='1';
}

} );
/* End DOM ready */

}() );