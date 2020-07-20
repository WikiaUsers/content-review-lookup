/* Any JavaScript here will be loaded for all users on every page load. */
/******** User Tags *********/
window.UserTagsJS = {
	modules: {},
	tags: {
	    //group: {{user tag data}}
	    wendixy: {u:"Wikia Witch's Cat", order:100},
	    setsuna: {u:'Wikia Witch', order:100},
	    inactive: {u:'No Recent Contributions'},
	    bureaucrat: {order:1}
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.inactive = {
    days: 30,
    namespace: [0, 'Forum'],
    zeroIsInactive: true  // 0 article edits = inactive
};
UserTagsJS.modules.autoconfirmed = false; // Switch on to watchout for newly registered accounts
UserTagsJS.modules.newuser = {
	days: 7, // Must have been on the Wiki for 7 days
	edits: 10, // And have at least 15 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = {
  'Wendixy': ['wendixy'],
  'LadySetsuna': ['setsuna'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	bureaucrat: ['founder'] // Remove bureaucrat group from founder
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js',
        'w:c:dev:UserTags/code.js',
        'w:c:dev:Countdown/code.js'
    ]
});