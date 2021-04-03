// --------------------------------------------------------
// Staff Highlighting (adapted from http://en.wikipedia.org/wiki/User:Ais523/adminrights.js)
// This script changes the color of links to staffs' userpages in the bodyContent of 
// various pages including Special, History pages, diff pages, and old page revisions.
// ("bodyContent" being the content below the page title).
// Based on [[User:ais523/highlightmyname.js]].
// --------------------------------------------------------

var adminrights		= {},
	traineerights	= {},
	execrights		= {},
	botrights		= {},
	retiredrights	= {};

adminrights = {
	"Inglyist"		:1,
	Encredechine	:1,
	Nixinova		:1
};

traineerights = {
};

execrights = {
};

botrights = {
	"Rostiger Bot"	:1
};

retiredrights = {
};

var action = mw.config.get("wgAction"),
	canonicalNamespace = mw.config.get("wgCanonicalNamespace");

if (  canonicalNamespace == 'Служебная'
	  || canonicalNamespace == 'Файл'
	  || canonicalNamespace == 'Справка'
	  || canonicalNamespace.indexOf('Обсуждение') > 0 /* Talk, User talk, etc.*/
	  || canonicalNamespace == 'Project' /* Hytale Wiki namespace */
	  || action == 'history'
	  || document.URL.indexOf('&diff=') > 0
	  || document.URL.indexOf('&oldid=') > 0) {
	
	$(document).ready(function() {
		$("#bodyContent a").each(function() {
			var n = $(this)
			  , u = null
			  , linkHref = n.attr('href');
			if (linkHref) {
				if (linkHref.substr(0,6) === "/UserProfile:") {
					u = linkHref.substr(6);
				} else if (linkHref.substr(0,22) === "/index.php?title=UserProfile:") {
					u = linkHref.substr(22);
				}
				if (u !== null) {
					if      (traineerights[u] === 1) n.addClass("trainee admin");
					else if (adminrights[u] === 1)   n.addClass("admin");
					else if (execrights[u] === 1)    n.addClass("executive");
					else if (botrights[u] === 1)     n.addClass("bot");
					else if (retiredrights[u] === 1) n.addClass("retired");
				}
			}
		});
	});
	
}


/**
* Заменяет {{USERNAME}} именем участника, просматривающего страницу. Требуется копирование шаблона Шаблон:USERNAME.
**/

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
}addOnloadHook(UserNameReplace);


/**
* МЕТКИ УЧАСТНИКОВ
**/

window.UserTagsJS = {
	modules: {},
	tags: {
        blocked:            { u:'Banned', order: 0 },
        bureaucrat:         { u:'Bureaucrat', link:'Hytale Wiki:Staff', order: 1 },
        sysop:              { u:'Administrator', link:'Hytale Wiki:Staff', order: 2 },
        'content-moderator':{ u:'Content Moderator', link:'Hytale Wiki:Staff', order: 3 },
        threadmoderator:    { u:'Forum Moderator', link:'Hytale Wiki:Staff', order: 4  },
        chatmoderator:      { u:'Chat Moderator', link:'Hytale Wiki:Staff', order: 5 },
        rollback:           { u:'Rollback', link:'Hytale Wiki:Staff', order: 6 },
        verified:           { u:'Verified', order: 7 },
        artist:             { u:'Artist', order: 8  },
        moderator:          { u:'Moderator', link:'Hytale Wiki:Staff'  }
    }
};
 
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bannedfromchat',
    'bot',
    'bot-global',
    'bureaucrat', 
    'chatmoderator',
    'rollback',
    'sysop',
    'threadmoderator',
    'moderator',
    'content-moderator'
];
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'moderator': ['sysop', 'bureaucrat'],
    'rollback': ['moderator']
};
UserTagsJS.modules.implode = {
    'moderator': ['content-moderator', 'threadmoderator', 'chatmoderator']
};

UserTagsJS.modules.inactive = 30; //Sets an inactive tag after 90 days


// Просмотр чужих IP-адресов

window.RevealAnonIP = {
    permissions: ['bureaucrat', 'sysop', 'moderator']
}


// Импорт с dev.wikia.com

 importArticles({
    type: 'script',
    articles: [
        'https://dev.fandom.com/wiki/MediaWiki:AjaxRC/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:BackToTopButton/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:Countdown/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:MassProtect/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:RevealAnonIP/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:SignatureCheck/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:UserTags/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:WallGreetingButton/code.js',
        'https://dev.fandom.com/wiki/MediaWiki:YouTubeModal/code.js'
        ]
});