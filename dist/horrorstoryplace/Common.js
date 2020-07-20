/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		godofwiki: { u:'God Of The Wiki' },
		featured: { u:'Featured' },
		inactive: { u:'Inactive' }
	}
};


UserTagsJS.modules.inactive = 50; // 50 days

UserTagsJS.modules.autoconfirmed = true; // Switch on

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};