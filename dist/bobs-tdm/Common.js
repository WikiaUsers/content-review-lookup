/* Any JavaScript here will be loaded for all users on every page load. */


window.UserTagsJS = {
	modules: {},
	tags: {
		Owner: 'Owner',
		Superadmin: 'Superadmin',
	        Admin: 'Admin'
                Operator: 'Operator'
                Respected: 'Respected'
                Server-Greeter: 'SG'
	}
};

UserTagsJS.modules.custom = {
	'Tomisord1': ['Operator']
        'Walkthroughmaster33': ['Admin']
 // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];





highlight = {
    selectAll: true,
    
    users: {
    Tomisord1: '#000000',
    Walkthroughmaster33: '#ff69b4'
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]

	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});