/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
});

/* Allowing for lists of certain user groups to be rendered */
window.listUsers = {
    talk: true,
    customgroups: ['autopatrol','content-moderator','threadmoderator'],
    limit: 50
};

/* overrides certain i18n strings for MapsExtended */
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};

/* 
   for certain marker types like Billboards, 
   using the word "collected" makes little sense.
   instead, we can use "found"
*/
window.dev.i18n.overrides["MapsExtended"]["category-collected-label"] = "$1 of $2 found";
window.dev.i18n.overrides["MapsExtended"]["collected-all-banner"] = "Congratulations! You found all <b>$1</b> of <b>$2</b> \"$3\" markers on $4.";

/* for [[dev:GlobalFileUsage]] */
window.globalFileUsageConfig = {
    'lang': ['th', 'vi', 'es'],
    'auto_show': false
}