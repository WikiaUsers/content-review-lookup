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
}

/* UserTags */

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

/* LinkPreview */

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });

window.pPreview.scale = {r: '?', t: '/scale-to-width-down/220?'};

window.pPreview.noimage = 'https://images.wikia.nocookie.net/wubbzy/images/2/29/Missing-image-232x150_opt.png';

window.pPreview.tlen = 200;

window.pPreview.RegExp.iparents = ['.portable-infobox', 'img', '.avatar'];

/* RailWAM */

window.railWAM = {
    logPage:"Project:WAM Log",
    autoLogForUsers:"SuKanzoo, AndreMor, Thevideogameguy22, Super Robot 3000",
    botUsers:"Super Robot 3000",
};

/* Quiz */
var quizName = "Wow! Wow! Wubbzy! Quiz";
var quizLang = "en";
var resultsTextArray = [ 
    "Hmmm... Too bad. You don't have much knowledge of the series. But don't worry, you can learn by watching the series or reading the wiki articles!",
    "Wow, you do know about the series! Keep learning by reading some articles from the wiki.",
    "Congratulations! You have achieved the maximum score. We love that you know about this series!!!! On behalf of the entire Wubbzypedia team!" 
];
var questions = [
    ["Which is not a Jukebox Robot song?",
    "Pet Party",
    "The Wubbzy Wiggle",
    "Robot Dance",
    "Happy Hop"], 
 
    ["What's the name of Widget's cousin?",
    "Ratchet",
    "Hatchet",
    "Gadget"],
 
    ["What causes a fleegle to multiply?",
    "Bologna",
    "Potato chips",
    "Marshmallows"],
    
    ["What's the brand that created Wubbzy plushes in more than one size?",
    "Nanco",
    "Fisher-Price",
    "Ty"],
    
    ["How do monsters count to 15?",
    "With their fingers",
    "With their eyes",
    "With their spots"],
    
    ["Who sings the song Come Play With Me?",
    "Mike Reagan",
    "Bob Boyle",
    "Brad Mossman"]
];

/* MessageBlock */

var MessageBlock = {
  title : 'Blocked',
  message : '{'+'{subst:#invoke:BlockMessages|main|reason=$1|expiry=$2}'+'}',
  autocheck : true
};

/* MassCategorization */

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

/* Other */

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    importArticle({
    type: 'script',
    article: ['u:dev:MediaWiki:AddAnnouncement/code.js']
});
}

if (mw.config.get("wgUserGroups").indexOf('sysop', 'content-moderator') > -1) {
    importArticle({
    type: 'script',
    article: ['MediaWiki:Group-sysop.js']
});
}

/* WDS Notification */

if (!$.storage.get('noti2')) {
    new BannerNotification('Please, if you are new by editing on this wiki, check the <a href="https://wubbzy.fandom.com/wiki/Help:Community_guidelines">rules</a> we have set for the comfort of the community and the reader', 'warn').onClose(function () {
        $.storage.set('noti2', true);
    }).show();
}

if (!$.storage.get('noti')) {
    new BannerNotification('Join our server at Discord, Wow Wow Discord: <a href="https://discord.gg/fWP7a6J">Here!</a>', 'notify').onClose(function () {
        $.storage.set('noti', true);
    }).show();
}