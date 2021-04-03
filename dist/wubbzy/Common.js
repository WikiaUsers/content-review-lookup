/* Any JavaScript here will be loaded for all users on every page load. */

/* AjaxRC */

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions", "Images", "Videos"];

window.ajaxRefresh = 30000;

/* BackToTopButton */

window.BackToTopModern = true;

/* ArticleRating */

window.ArticleRating = {
  values: ['Kooky', 'Bad', 'Average', 'Good', 'Perfecto'],
  starSize: [28, 28],
};

/* UserTags 

window.UserTagsJS = {
	modules: {},
	tags: {
	    
		bureaucrat: { u:'Mayor Whoozle', link:'Wubbzypedia:Administrators#Administrator_abilities', title:'Bureaucrat', order:-1/0 },
		
		sysop: { u:'The Super Fixer', link:'Wubbzypedia:Administrators', title:'Admin', order:-1/0 },
		
		'inactive-bureaucrat': { u:'Inactive Bureaucrat' },
		
		'inactive-sysop': { u:'Inactive Admin' },
		
		'content-moderator': { order: -1/0 },
		
		'discord-admin': { u:'Wow Wow Discord Admin', link:'Wubbzypedia:Discord' },
		
		'discord-founder': { u:'Wow Wow Discord Founder', link:'Wubbzypedia:Discord' },
		
		rollback: { u:'Rollbacker', order: -1/0 }, 
		
		newuser: { u:'New User' },
		
	oasisPlaceBefore: '> h2'
	}
};

UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: false
};

UserTagsJS.modules.custom = {
	'SpongeChampion': ['founder'],
	'SuKanzoo': ['discord-admin'],
	'AndreMor': ['discord-admin'],
	'Thevideogameguy22': ['discord-admin'],
	'TDM112': ['discord-founder']
};

UserTagsJS.modules.implode = {
	'inactive-bureaucrat': ['bureaucrat', 'inactive'],
	'inactive-sysop': ['sysop', 'inactive'],
};	

UserTagsJS.modules.newuser = {
	days: 3,
	edits: 20,
	namespace: 0
};

UserTagsJS.modules.stopblocked = true;

UserTagsJS.modules.isblocked = true;

UserTagsJS.modules.metafilter = {
    'inactive': ['staff', 'helper', 'bot', 'bot-global', 'vstf'],
    'newuser': ['staff', 'helper', 'bot', 'bot-global', 'vstf', 'content-team-member', 'util', 'global-discussions-moderator', 'wiki-manager'],
    'content-moderator': ['bot', 'bot-global'],
    'sysop': ['bot', 'bot-global'],
    'threadmoderator': ['bot', 'bot-global'],
    'chatmoderator': ['bot', 'bot-global'],
    'rollback': ['bot', 'bot-global'],
};
*/
/* LinkPreview 

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.scale = {r: '?', t: '/scale-to-width-down/220?'};

window.pPreview.noimage = 'https://images.wikia.nocookie.net/wubbzy/images/2/29/Missing-image-232x150_opt.png';

window.pPreview.tlen = 200;

window.pPreview.RegExp.iparents = ['.portable-infobox', 'img', '.avatar'];
*/


/* MessageBlock */

var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true
};

/* MassCategorization */

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

/* Other */

if(!mw.storage.get('noti')) {
	mw.notify($('<a href="https://discord.gg/fWP7a6J">https://discord.gg/fWP7a6J</a>'), { autoHide: false, tag: "discord", title: "Join our server at Discord" }).then(function() {
		document.getElementsByClassName("mw-notification-tag-discord")[0].addEventListener("click", function() {
			mw.storage.set("noti", "true");
		});
	});
}
     
if(!mw.storage.get('noti2')) {
    mw.notify($('<span>Please, if you are new by editing on this wiki, check the <a href="https://wubbzy.fandom.com/wiki/Help:Community_rules">rules</a> we have set for the comfort of the community and the reader</span>'), { autoHide: false, tag: "rules", title: "Community rules", type: "warn" }).then(function() {
        document.getElementsByClassName("mw-notification-tag-rules")[0].addEventListener("click", function() {
            mw.storage.set("noti2", "true");
        });
    });
}

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
	try {
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:AddAnnouncement/code.js'
		});
	} catch (err) {
		console.log("AddAnnouncement error: " + err);
	}
}

if (mw.config.get("wgUserGroups").indexOf('sysop', 'content-moderator') > -1) {
	try {
		importArticle({
			type: 'script',
			article: 'MediaWiki:Group-sysop.js'
		});
	} catch(err) {
		console.log("Error when importing scripts for mods: " + err);
	}
}