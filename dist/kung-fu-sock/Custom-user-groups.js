window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Founder' },
		active: { u:'Active' },
		inactive: { u:'Inactive' },
		usermonth: { u:'User of the Month' }
	}
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.newuser = {
	days: 3, // Must have been on the Wiki for 3 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};