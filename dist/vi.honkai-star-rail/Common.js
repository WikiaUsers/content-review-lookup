/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#ĐỔI [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Thể loại:Trang Đổi Hướng]]';
});