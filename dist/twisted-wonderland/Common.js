/* Any JavaScript here will be loaded for all users on every page load. */
//Custom Tooltips
window.tooltips_config = {
    offsetX: 0,
    offsetY: 20,
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
};
 
window.tooltips_list = [
{
    classname: 'magic-tooltip',
    parse: '{| \n!<#name#>\n|-\n|<#skill#>\n|}', 
    delay: 500,
},
{
    classname: 'buddy-tooltip',
    text: '<#buddy#>', 
    delay: 500,
},
];

//back to top button
window.BackToTopModern = true;

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;

/* Modifying redirect button from WikiEditor's source mode */
$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-buildSection-advanced', function( event, section ) {
	// The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
	section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
	section.groups.insert.tools.redirect.action.options.post = ']]\n[[Category:Redirected Pages]]';
} );