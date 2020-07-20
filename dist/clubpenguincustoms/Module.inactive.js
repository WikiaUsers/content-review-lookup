UserTagsJS.modules.inactive = 50; // 50 days

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 'Talk', 'User talk', 'Forum'] // Edits must be to articles or talk pages or user talk pages or the forum to count, others don't count
};