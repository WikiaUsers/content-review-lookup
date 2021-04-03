window.UserTagsJS = {
	modules: {},
	tags: {
            newuser: { u: 'NEW EDITOR', order: 10 }
	}
};

UserTagsJS.modules.newuser = { //autoconfirmed
	days: 7, // Must have been on the Wiki for 7 days
	edits: 5, // And have at least 5 edits to remove the tag
	namespace: [0, 'Talk', 'User talk', 'Forum'] // Edits must be made to articles to count
};

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];