/*******************/
/****CUSTOM TAGS****/ 
/*******************/

window.UserTagsJS = {
	modules: {},
	tags: {
		cow: { u:'Cow', order:-1 },
		/*
		bureaucrat: { u:'Squadron Leader', link:'PTFS Wiki Staff', order:-1 },
		sysop: { u:'Ace', link:'PTFS Wiki Staff', order:1 },
		content-moderator: { u: 'Pilot', link:'PTFS Wiki Staff', order:-1 },
 
 */
	},
	oasisPlaceBefore: ''
};

 UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'cow', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', "content-moderator", /*'autoconfirmed', 'notautoconfirmed', 'inactive','blocked',
    'founder',*/];
    
UserTagsJS.modules.custom = {
	'TheOriginalCows': ['cow'], 
};  
    
UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
	'sysop': ['bureaucrat', 'founder'],
	"content-moderator": ['sysop', 'bureaucrat', 'founder'],
	'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'rollback': ['chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder'],
	'autoconfirmed': ['townieofthemonth', 'rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};