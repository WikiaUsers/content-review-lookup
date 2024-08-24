window.UserTagsJS = {
	modules: {},
	tags: {
		'founder': { u:'Pecado original' },
		'bureaucrat': { u:'Brujo', f:'Bruja' },
		'sysop': { u:'Buque del pecado' },
		'rollback': { u:'Pierrot' },
		'chatmoderator': { u:'Maestro de la Corte', f:'Maestra de la Corte' },
		'bot': { u:'Niño Ghoul' },
		'bot-global': { u:'Niño Ghoul' },
		'blocked': { u:'Intruso', f:'Intrusa' },
	}
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 500, 501, 1201],
	zeroIsInactive: false
};
UserTagsJS.modules.nonuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
importArticles({
    type: 'script',
    articles: [
	'u:dev:YoutubePlayer/code.js',
	'u:dev:UserTags/code.js',
	'u:dev:ReferencePopups/code.js'
    ]
});