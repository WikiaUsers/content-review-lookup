window.UserTagsJS = {
	tags: {
		founder:	{ u:'Założyciel', m:'Założyciel', f:'Założycielka' },
		modertwitt:	{ u:'Moderator Twittera', m:'Moderator Twittera', f:'Moderatorka Twittera' }
	},
	modules: {
		inactive: 30,
		mwGroups: ['bot','bureaucrat','chatmoderator','founder','moderator','rollback'],
		autoconfirmed: true,
		newuser: true,
		nonuser: true,
		custom: {
			'Szenzii':		['founder','modertwitt']
		}
	}
};
 
importArticles({type: "script", articles: ["u:dev:UserTags/code.js"]});