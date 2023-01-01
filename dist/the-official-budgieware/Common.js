/* Any JavaScript here will be loaded for all users on every page load. */

UserTagsJS.modules.newuser = {
	days: 0, // Must have been on the Wiki for 5 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
	
};

	UserTagsJS.modules.seminewuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.cooluser = {
	days: 50, // Must have been on the Wiki for 50 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.epikuser = {
	days: 100, // Must have been on the Wiki for 100 days
	edits: 0, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.prouser = {
	days: 365, // Must have been on the Wiki for 365 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
};