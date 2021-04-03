
window.UserTagsJS = {
	tags: {
		ranga1:	{ u:'Nazwa rangi 1' },
		ranga2:	{ u:'Nazwa rangi 2' }
	},
	modules: {
		inactive: 30,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true,
		custom: {
			'EnderGuy':		['Profesor Oak'],
			'BowserXL':		['Snivy'];
		}
	}
};
 
importArticles({type: "script", articles: ["u:dev:UserTags/code.js"]});