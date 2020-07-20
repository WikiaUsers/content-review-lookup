/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
                sysop: { u:'Admin' },
		'bureaucrat': { u: 'Bureaucrat'},
		'inactive': { u: 'Inactive' },
                'rollback': {u: 'Rollback' },
		'test': { u:'test subject' },
                tester: { u:'Tester', order: 103 }
	      },
};

UserTagsJS.modules.custom = {
	'GuitarRock': ['tester']
};
 
// userRightIcons 
 
UserTagsJS.modules.inactive = 400; // 400 days
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat']; // add corresponding tags to users
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});