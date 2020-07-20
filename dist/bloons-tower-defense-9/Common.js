window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {u:'Conception Grandmaster', order:0},
		founder: {u:'Master', order:-1},
		rollback: {u:'Conception Guardian'},
		labguard: {u:'Lab Guardian', order:-1/0},
		programmer: {u:'Hacker'},
	},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 10;
UserTagsJS.modules.implode = {
	labguard: ['chatmoderator','rollback']
};
UserTagsJS.modules.meta-filter = {
	bureaucrat: ['sysop'],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat'];
UserTagsJS.modules.newuser = {
	days: 30,
	edits: 100,
	namespace: 50,
};
UserTagsJS.modules.custom = {
	'Love Robin': ['bureaucrat'],
	'Raindrop57': ['rollback'],
	'Planterobloon':['rollback'],
	'Logologologol': ['programmer','rollback'],
};

/* RevealAnonIP */
window.RevealAnonIP = {
permissions : ['user']
};

/* QuickDelete options */
// window.category = 'Delete Pages';
//window.reason = 'My Reasons';
//window.buttonText = 'Remove All';

importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
//        'u:dev:QuickDelete/code.js',
        'u:dev:UserTags/code.js'
    ]
});