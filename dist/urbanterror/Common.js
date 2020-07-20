/* ########################################################################## */
/* ###                         MediaWiki:Common.js                        ### */
/* ########################################################################## */
/* Any JavaScript here will be loaded for all users on every page load. */
 
 
/* ########################################################################## */
/* START Dev Code Settings and Imports */
/* ########################################################################## */
	//Settings for: Reveal Anon IP
	window.RevealAnonIP = {
		permissions : ['rollback', 'sysop', 'bureaucrat'] //Only show to these groups
	};

	//Settings for: Highlight user groups
	highlight = {
		selectAll: false,
		bureaucrat: '#fc6',
		sysop: '#f66',
		rollback: '#c6f',
		bot: '#3ff', //bot should come last to override any other color settings
		users: {
			Iynque: '#cf3',
		}
	};

	//Settings for: UserTags
	window.UserTagsJS = {
		modules: {},
		tags: {
			bureaucrat: { u:'Bureaucrat', link:'Project:Administrators' },
			sysop: { u:'Admin', link:'Project:Administrators' },
			'former-admin': { u:'Former Admin', link:'Project:Administrators' },
			'head-admin': { u:'Head Admin', link:'Project:Administrators' },
			inactive: { u:'Inactive' },
			'inactive-bureaucrat': { u:'Inactive Bureaucrat', link:'Project:Administrators' },
			'inactive-sysop': { u:'Inactive Admin', link:'Project:Administrators' },
		},
		oasisPlaceBefore: ''
	};
	UserTagsJS.modules.custom = {
		'Ace clubs': ['former-admin'],
		'Cheese319': ['former-admin'],
		'Iynque': ['head-admin'],
	};
	UserTagsJS.modules.autoconfirmed = false; // Don't show autoconfirmed tag
	UserTagsJS.modules.newuser = true; // Show new user tag
	UserTagsJS.modules.inactive = 90; // Inactive if no edits in this many days
	UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global']; // This module adds the user's MediaWiki groups to the internal group list, and will automatically download tag text translations for those groups from the server. 
	UserTagsJS.modules.metafilter = {
		sysop: ['bureaucrat', 'founder'], // Remove sysop if bureaucrat & founder
		bureaucrat: ['founder'], // Remove bureaucrat if founder
		chatmoderator: ['sysop', 'bureaucrat'], // Remove chatmoderator if sysop & bureaucrat
		sysop: ['head-admin'], //Remove "admin" if "head admin"
	};
	UserTagsJS.modules.userfilter = {
		'Iynque': ['inactive'], // Iynque is never inactive, even when he is
		'Cheese319': ['founder'], // Remove the founder tag--only ever made 5 edits
	};
	UserTagsJS.modules.implode = {
		'inactive-bureaucrat': ['bureaucrat', 'inactive'], // Adds 'inactive-bureaucrat' and removes bureaucrat and inactive.
		'inactive-sysop': ['sysop', 'inactive'], // Adds 'inactive-sysop' and removes sysop and inactive.
	};
	//UserTagsJS.modules.explode = {
	//	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
	//};

	//Settings for Lock Old Blogs
	window.LockOldBlogs = {
		expiryDays: 90, //No new comments after 3 months (90 days) with no new comments
		expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!", //The message that should be displayed to the user if commenting has been locked on the blog post.
		nonexpiryCategory: "Never archived blogs" //The category to which you can add blog posts that should never expire.
	};

	//Settings for Lock Old Threads
	window.LockForums = {
		expiryDays: 90, //No new comments after 3 months (90 days) with no new comments
		expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this forum!", //The message that should be displayed to the user if commenting has been locked on the blog post.
		forumName: "Forum" //The name of your Forum board as seen in your wiki's MediaWiki:Forum-forum-title.
	};

	//Import the code from dev.wikia.com
	importArticles({
		type: "script",
		articles: [
			'u:dev:RevealAnonIP/code.js', //http://dev.wikia.com/wiki/RevealAnonIP
			'u:dev:HighlightUsers/code.js', //http://dev.wikia.com/wiki/HighlightUsers
			'u:dev:UserTags/code.js', //http://dev.wikia.com/wiki/UserTags
			'u:dev:LockOldBlogs/code.js', //http://dev.wikia.com/wiki/LockOldBlogs
			'u:dev:LockForums/code.js' //http://dev.wikia.com/wiki/LockForums
		]
	});

 
 
/* ########################################################################## */
/* START {{USERNAME}} replacement */
/* ########################################################################## */
	$(function() {
		if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
		$('span.insertusername').html(mw.config.get('wgUserName'));
	});
	/* Requires copying Template:USERNAME. */
/* END {{USERNAME}} replacement */
 
 
/* ########################################################################## */
/* START Java IRC client */
/* ########################################################################## */
	 
	/* Create names for anonymous users */
	 var iyUserName = "setNickFailed"
	 $(function() {
		var iyChatGenericNames = ['Boa','Cheetah','Chicken','Cobra','Cockroach','Cougar','Goose','Mantis','Penguin','Puma','Python','Raven','Scarab','Scorpion','Tiger','Widow'];
		var iyChatTeamColors = ['Green','Red','Blue','Purple','Orange','Olive','White','Black','Desert','Cowboys','Cavalry','Droogs','DrPink','DrBlue'];
	 	if ( mw.config.get('wgUserName') === null) {
	 		iyUserName = iyChatTeamColors[Math.floor(Math.random()*iyChatTeamColors.length)] + "|" +iyChatGenericNames[Math.floor(Math.random()*iyChatGenericNames.length)] + "_" + Math.floor((Math.random() * 10) + 1);
	 	} else {
	     	iyUserName = mw.config.get('wgUserName');
	 	}
	 });
	
	 /* Inject IRC webchat */
	function onloadhookcustom() {
		var replaceFN = document.getElementById("FreenodeChatReplace");
		var replaceQN = document.getElementById("QuakenetChatReplace");
		if (null != replaceFN) {
			replaceFN.innerHTML='<small><a rel="nofollow" class="external text" href="http://webchat.freenode.net/?nick=' + iyUserName + '&channels=%23%23wikia&uio=OT10cnVlJjExPTIzNg6b">Open freenode in full window</a></small><iframe id="UrTwikiChatFreenode" class="IRCframe" src="http://webchat.freenode.net/?nick=' + iyUserName + '&channels=%23%23wikia&uio=OT10cnVlJjExPTIzNg6b"></iframe>';
			//if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
			//else window.onbeforeunload = confirmexitjrchat;
		};
		if (null != replaceQN) {
			replaceQN.innerHTML='<small><a rel="nofollow" class="external text" href="http://webchat.quakenet.org/?nick=' + iyUserName + '&channels=%23urbanterror%2C%23cmm%2C%23urbanmappers%2C%23urtwiki&uio=OT10cnVlJjExPTIzNg6b">Open freenode in full window</a></small><iframe id="UrTwikiChatQuakenet" class="IRCframe" src="http://webchat.quakenet.org/?nick=' + iyUserName + '&channels=%23urbanterror%2C%23cmm%2C%23urbanmappers%2C%23urtwiki&uio=OT10cnVlJjExPTIzNg6b"></iframe>';
			if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
			else window.onbeforeunload = confirmexitjrchat;
		}
		//alert(document.getElementById("JRChatReplace").innerHTML);
	}
	if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
	else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
/* END Java IRC client */
 
/* ########################################################################## */
/* START Remove bot message walls */
/* ########################################################################## */
if (wgPageName == 'Message_Wall:Default' || wgPageName == 'Message_Wall:MediaWiki default' || wgPageName == 'Message_Wall:QATestsBot' || wgPageName == 'Message_Wall:Maintenance script') {
	$('.Wall').remove();
}
/* END Remove bot message walls */
 
/* ########################################################################## */
console.info("Loaded MediaWiki:Common.js version 36");
/* END of MediaWiki:Common.js */