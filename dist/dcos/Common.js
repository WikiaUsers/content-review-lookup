/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		'verified': { u:'Verified', order:-1/0 },
		'affiliated': 'Affiliated',
		'inactive': 'Inactive',
		'newuser': 'New user'
	}
};

UserTagsJS.modules.newuser = {
	namespace: 0, // [Optional] Edits must be made to articles to count
	computation: function(days, edits) {
		// If the expression is true then they will be marked as a new user
		// If the expression is false then they won't
		// In this example, newuser is removed as soon as the user gets 30 edits, OR as soon as they have been present for 10 days, whichever happens first
		return days < 10 && edits < 30;
	}
};