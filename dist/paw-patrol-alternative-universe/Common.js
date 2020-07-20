/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u: 'Ryder' },
		bureaucrat: { u:'Leader of the PAW Patrol' },
		admin: { u: 'Deputy of the PAW Patrol' },
		contentmoderator: { u: 'PAW Patrol Member' },
		discussionmoderator: { u: 'WHISKER Patrol Member' },
		chatmoderator: { u: 'WOOF Patrol Member' },
		blocked: { u: 'Caught SIE Member' },
		// group: { associated tag data }
		trainee: { u: 'Trainee' },
	}
};
UserTagsJS.modules.inactive = 50; // 50 days
UserTagsJS.modules.newuser = {
	days: 14, // Must have been on the Wiki for 14 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};