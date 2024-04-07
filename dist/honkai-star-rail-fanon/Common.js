/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
});
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
	}
};

window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Inactive (Has not edited recently)' }
	}
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};