window.UserTagsJS = {
	modules: {},
	tags: {
		featured: { u:'Usuario destacado', f:'Usuaria destacada' },
		inactive: { u:'Inactivo', f:'Inactiva' }
	}
};
UserTagsJS.modules.custom = {
	'Mordecai Muerte': ['sysop', 'featured'],
	'Inner Art': ['sysop', 'featured'],
	'EL SUP3R 13': ['featured']
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,110,111,112,113,114,115,116,117,118,119,500,501,502,503,1201,1202],
	zeroIsInactive: false
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
importArticles({
    type: 'script',
    articles: [
 	'u:dev:UserTags/code.js'
    ]
});