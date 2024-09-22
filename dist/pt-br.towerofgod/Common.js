/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
        'Special:WikiActivity',
        'Special:RecentChanges',
        'Special:Contributions',
        'Special:Log',
        'Special:Log/move',
        'Special:AbuseLog',
        'Special:NewFiles',
        'Special:NewPages',
        'Special:Watchlist',
        'Special:Statistics',
        'Special:ListFiles'
];

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* UserTags from Dev Wikia */
window.UserTagsJS = {
	modules: {},
	tags: {
        'vanguard': { 
            u:'Irregular', 
            link:'w:Help:Vanguard'
        },
        blocked: { u:'Selado(a)'},
        'newuser': { u:'Regular rank-F'},
        user: { u:'Regular'},
        highregular: { u:'Regular rank-S', link:'Regular'},
        ranker: { u:'Ranker', link:'Ranker'},
        highranker: { u:'High Ranker', link:'Ranker#High Ranker'},
        'bot': { u:'Assistente do Teste'},
        'content-moderator': { 
            u:'Admin do Teste', 
            link:'Tower of God Wiki:Wiki Users#Content Moderators'
        },
        'threadmoderator': { 
            u:'Admin do Teste', 
            link:'Tower of God Wiki:Wiki Users#Thread Moderators'
        },
        'chatmoderator': { 
            u:'Admin do Teste', 
            link:'Tower of God Wiki:Wiki Users#Chat Moderators'
        },
        testdirector: { 
            u:'Diretor do Teste', 
            link:'Tower of God Wiki:Wiki Users#Test Directors'
        },
        'rollback': { u:'Royal Enforcement Division'},
        'sysop': { 
            u:'Governante',
            link:'Tower of God Wiki:Wiki Users#Administrators'
        },
        'bureaucrat': { 
            u:'Guardião de Andar',
            link:'Tower of God Wiki:Wiki Users#Bureaucrats'
        },
        'poweruser': { u:'Mestre de Shinsu'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.newuser = {
	days: 7, // Deve estar no Wiki há 7 dias
	edits: 19 // E tenha pelo menos 19 edições para remover a tag
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.stopblocked = true; // Manually turn on/off
UserTagsJS.modules.mwGroups = [
    'user',
    'bureaucrat',
    'content-moderator',
    'chatmoderator',
    'threadmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bot',
    'bot-global',
    'blocked',
    'poweruser'
];

UserTagsJS.modules.metafilter = {
    'user': ['bureaucrat', 'sysop', 'content-moderator', 'chatmoderator', 'threadmoderator', 'highregular', 'ranker', 'highranker'],
	'content-moderator': ['bureaucrat'],
	chatmoderator: ['bureaucrat'],
	threadmoderator: ['bureaucrat'],
	rollback: ['bureaucrat'],
	patroller: ['bureaucrat'],
	sysop: ['bureaucrat']
};

UserTagsJS.modules.implode = {
	'testdirector': ['chatmoderator', 'content-moderator', 'threadmoderator']
};

UserTagsJS.modules.custom = {
    // High Rankers - 3000+ edits
	'Nesharg': ['highranker'],
	
	// Rankers - 1500+ edits
	
	// S-rank Regulars - 500+ edits
};

// Comments, message wall, forum posts user tags
(function ($, ArticleComments) {
    "use strict";
 
    function addTag() {
        var users = {
            'Nesharg: 'Burocrata',
        };
 
        for (var name in users) {
            $('.comments .edited-by a[href$="' + name + '"]:not(.subtle)')
            .after('<span class="tag">' + users[name] + '</span>');
        }
    }
 
    function init() {
        addTag();
        if (ArticleComments && ArticleComments.addHover) {
            var realFunc = ArticleComments.addHover;
            ArticleComments.addHover = function () {
                var result = realFunc.apply(ArticleComments, arguments);
                addTag();
                return result;
            };
        }
    }
    $(init);
}(jQuery, window.ArticleComments));

// Custom edit buttons
if (mw.toolbar) {
    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
        'Redirect',
        '#REDIRECT [[',
        ']]',
        'Insert text',
        'mw-editbutton-redirect'
    );
    mw.toolbar.addButton(
        'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
        'Add a reference',
        '<ref>',
        '</ref>',
        'Insert source',
        'mw-editbutton-ref'
    );
}

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

// ===========================================================
// EDIT-INTRO FIX for articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Source: http://runescape.wikia.com/wiki/MediaWiki:Common.js/updateintro.js
// Function: Adds EditIntro to all mainspace pages 
//           when "edit this page" link is clicked
// ===========================================================
 
$(function() {
	if (wgNamespaceNumber == '0') {
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:SpoilWarning');
	}
});

var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 502, 1201];
var SocialMediaButtons = { 
	position: "bottom",
	colorScheme: "color",
	buttonSize: "default",
};


importArticles({
    type: "script",
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:AjaxBatchDelete/code.js',
        'u:dev:DisplayClock/code.js',
//      'l:MediaWiki:Snow.js',
        'l:MediaWiki:Common.js/slider.js',
        'u:dev:SocialIcons/code.js' ]
});