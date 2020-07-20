/* Any JavaScript here will be loaded for all users on every page load. */

//User Tags//
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: { u:'Admin', link:'Dragon_Booster_Wiki:Administrators' },
		sysop: { u:'Admin', link:'Dragon_Booster_Wiki:Administrators' },
		bot: { u:'Bot', link:'Dragon_Booster_Wiki:Administrators' },
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'Bluesonic1': ['bureaucrat'],
	'BluesonicBot': ['bot'],
};
 
// Remove groups from several users
UserTagsJS.modules.userfilter = {
	'BluesonicBot': ['sysop'],
	'Bluesonic1': ['sysop'],
};
 
// Other imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:ArchiveTool/code.js',
        'u:dev:UserTags/code.js',
    ]
});