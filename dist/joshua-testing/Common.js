/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		activeeditor: { u:'Active Editor' },
		featured: { u:'Featured' }

UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 7, // And have at least 7 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = {
	'Joshuabirger': ['activeeditor'], // add active editor
	'UserName 2': ['featured'], // Add featured
	'UserName 3': ['featured', 'templates'], // Add featured + templates guru
	'UserName 4': ['inactive'] // Always inactive
};