/* Any JavaScript here will be loaded for all users on every page load. */
 
window.MessageWallUserTags = {
    tagColor: 'lime',
    users: {
        'TheV1ct0ri0u5': 'Founder',
        'ChaoticShadow': 'Administrator'
    }
};

importScriptPage('MessageWallUserTags/code.js', 'dev');
 
/* UserTags */
window.UserTagsJS = {
	modules: {
	    custom: {
	        'Darthwikia25': ['coder'],
	        'Dragonballgtgoku': ['coder'],
	        'KCCreations': ['affiliateMgr'],
	        'SUPERCEREAL': ['affiliateMgr'],
	        'Zmario': ['affiliateMgr']
	    }
	},
	tags: {
		backup: { u:'Backup Account', order: -1/0 },
		coder: { u:'Coder', order: 1},
		affiliateMgr: { u:'Affiliate Wikia Manager', order: 2 },
		sysop: { u:'Administrator' },
		bureaucrat: { u:'Bureaucrat', order: -1/0 },
		rollback: { u:'Rollback', order:-1/0 },
		threadmoderator: { u:'Thread Moderator', order:-1/0 },
		moderator: { u:'Moderator', order:-1/0 }
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
	'Darthwikia25': ['coder'],
	'Dragonballgtgoku': ['coder'],
	'KCCreations': ['affiliateMgr'],
	'SUPERCEREAL': ['affiliateMgr'],
	'Zmario': ['affiliateMgr']
};
	
/*UserTagsJS.modules.metafilter = {
    'inactive': ['coder'],
    'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', 'bureaucrat'],
	'rollback': ['chatmoderator', 'sysop', 'bureaucrat']
};

UserTagsJS.modules.implode = {
	'moderator': ['rollback', 'chatmoderator'],
	'administrator': ['rollback', 'chatmoderator', 'sysop'],
	'bureaucrat': ['rollback', 'chatmoderator', 'sysop', 'bureaucrat']
};

UserTagsJS.module.inactive = 14;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = {
	days: 7,
	edits: 30,
	namespace: 0
};*/

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

//Custom footer
var zeddWiki = 'Zedd';
var zeddWikiLink = zeddWiki.link("http://zedd.wikia.com");

var bassMusicWiki = 'Bass Music';
var bassMusicWikiLink = bassMusicWiki.link("http://bassmusic.wikia.com");

var edmWiki = 'EDM';
var edmWikiLink = edmWiki.link("http://edm.wikia.com");

document.getElementById("WikiaArticleFooter").innerHTML = '<div style="border:1px solid #001230;padding:5px;">Check out our affiliate wikias — ' + zeddWikiLink + ' • ' + bassMusicWikiLink + ' • ' + edmWikiLink + '</div>';