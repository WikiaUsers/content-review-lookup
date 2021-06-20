/* Any JavaScript here will be loaded for all users on every page load. */

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
        blocked: { u:'Sealed'},
        'newuser': { u:'F-rank Regular'},
        user: { u:'Regular'},
        highregular: { u:'S-rank Regular', link:'Regular'},
        ranker: { u:'Ranker', link:'Ranker'},
        highranker: { u:'High Ranker', link:'Ranker#High Ranker'},
        'bot': { u:'Test Assistant'},
        'content-moderator': { 
            u:'Test Admin', 
            link:'Tower of God Wiki:Wiki Users#Content Moderators'
        },
        'threadmoderator': { 
            u:'Test Admin', 
            link:'Tower of God Wiki:Wiki Users#Thread Moderators'
        },
        'chatmoderator': { 
            u:'Test Admin', 
            link:'Tower of God Wiki:Wiki Users#Chat Moderators'
        },
        testdirector: { 
            u:'Test Director', 
            link:'Tower of God Wiki:Wiki Users#Test Directors'
        },
        'rollback': { u:'Royal Enforcement Division'},
        'sysop': { 
            u:'Ruler',
            link:'Tower of God Wiki:Wiki Users#Administrators'
        },
        'bureaucrat': { 
            u:'Floor Guardian',
            link:'Tower of God Wiki:Wiki Users#Bureaucrats'
        },
        'poweruser': { u:'Shinsoo Master'}
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.newuser = {
	days: 7, // Must have been on the Wiki for 7 days
	edits: 19 // And have at least 19 edits to remove the tag
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
	'HermesED': ['highranker'],
	'Mgf60': ['highranker'],
	'Zahard': ['highranker'], // (inactive)
	'Mort de Great': ['highranker'],
	'Tofu21': ['highranker'], // (left the Tower)
	'Athanos': ['highranker'], // (inactive)
	'Reistenger': ['highranker'],
	
	// Rankers - 1500+ edits
	'07n156': ['ranker'], // (inactive)
	'Clash.Bikash': ['ranker'],
	'Vlworr': ['ranker'], // (inactive)
	'SKGenesis': ['ranker'],
	'Lucenthia': ['ranker'], // (inactive)
	'Adat': ['ranker'], // (inactive)
	'OttoLannister550':['ranker'],
	'Androlucus':['ranker'],
	'Kitsunemm': ['ranker'],
	'Urek Mazino': ['ranker'], // (inactive)
	'Baam25th': ['ranker'], // (inactive)
	'WellWhatever13': ['ranker'], // (inactive)
	'TonySansNom': ['ranker'], // (inactive)
	
	// S-rank Regulars - 500+ edits
	'Rallyn4440': ['highregular'],
	'EternET': ['highregular'], // (inactive)
	'Prince of zahard': ['highregular'], // (inactive)
	'Mirror143': ['highregular'], // (inactive)
	'Sigfodr': ['highregular'], // (inactive)
	'L86934': ['highregular'], // (inactive)
	'GoDai': ['highregular'], // (inactive)
	'Parkewl': ['highregular'], // (inactive)
	'Bron Handa': ['highregular'], // (inactive)
	'Rachellover69': ['highregular'], // (inactive)
	'T.F.Baam': ['highregular'], // (inactive)
	'GoodYearBlimp': ['highregular'], // (inactive)
};

// Comments, message wall, forum posts user tags
(function ($, ArticleComments) {
    "use strict";
 
    function addTag() {
        var users = {
            'Demotivator': 'Bureaucrat',
            'HermesED': 'Admin',
            'Cyclrin': 'Admin',
            'SKGenesis': 'Mod',
            'Kitsunemm': 'Mod',
            'Arrogantt': 'Mod',
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

// ToG Discord
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Tower of God Discord",
        id: "191901830526009344",
        theme: "dark"
    }
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