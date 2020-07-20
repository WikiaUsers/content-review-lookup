/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		awbbot: { u:'awbbot' },
		featured: { u:'Featured' },
		immortal: { u:'Immortal' }
	}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

UserTagsJS.modules.custom = {
	'Velthur': ['awbbot'], // Add AWBBot
	'UserName 2': ['featured'], // Add 
	'UserName 3': ['featured', 'templates'], // Add 
	'UserName 4': ['inactive'] // Always 
};