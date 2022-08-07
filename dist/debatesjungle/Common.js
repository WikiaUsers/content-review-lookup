/* Any JavaScript here will be loaded for all users on every page load. */

window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

window.ajaxRefresh = 60000;
window.ajaxPages = [
    'Special:WikiActivity',
    'Special:DiscussionsActivity',
    'Special:RecentChanges',
    'Special:Contributions',
    'Special:Log',
    'Special:Log/move',
    'Special:AbuseLog',
    'Special:NewFiles',
    'Special:NewPages',
    'Special:Watchlist',
    'Special:Statistics',
    'Special:ListFiles',
    'Category:Speedy_deletion_candidates',
    'Category:Speedy_move_candidates'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data },
        founder: {
            u: 'Founder',
            order: 1
        },
        bureaucrat: {
            u: 'Bureaucrat',
            order: 2
        },
        'former-bureaucrat': {
            u: 'Retired Bureaucrat',
            order: 3
        },
        sysop: {
            u: 'Administrator',
            order: 4
        },
        'former-sysop': {
            u: 'Retired Administrator',
            order: 5
        },
        'bot-global': {
            u: 'Global Bot',
            order: 7
        },
        bot: {
            u: 'Bot',
            order: 8
        },
        'content-moderator': {
            u: 'Content Moderator',
            order: 10
        },
        'former-content-moderator': {
            u: 'Retired Content Moderator',
            order: 11
        },
        threadmoderator: {
            u: 'Discussion Moderator',
            order: 13
        },
        'former-threadmoderator': {
            u: 'Retired Discussion Moderator',
            order: 14
        },
        chatmoderator: {
            u: 'Chat Moderator',
            order: 16
        },
        'former-chatmoderator': {
            u: 'Retired Chat Moderator',
            order: 17
        },
        rollback: {
            u: 'Rollback',
            order: 19
        },
        'former-rollback': {
            u: 'Former Rollback',
            order: 20
        },
        calc: {
            u: 'Calc Group',
            order: 22
        },
        'former-calc': {
            u: 'Retired Calc Group',
            order: 23
        },
        guru: {
            u: 'Guru',
            order: 40
        },
        'js-helper': {
            u: 'JS Helper',
            order: 51
        },
        'css-helper': {
            u: 'CSS Helper',
            order: 52
        },
        'image-helper': {
            u: 'Image Helper',
            order: 53
        },
        'template-helper': {
            u: 'Templates Helper',
            order: 54
        },
        'human-resources': {
            u: 'Human Resources',
            order: 55
        },
        'former-human-resources': {
            u: 'Retired Human Resources',
            order: 56
        },        
        consultant: {
            u: 'Consultant',
            order: 100
        },
        bannedfromchat: {
            u: 'Banned from Chat',
            order: 500
        },
        inactive: {
            u: 'Inactive',
            order: 1 / 0
        }
    }
};
UserTagsJS.modules.inactive = {
    days: 30,
    // namespaces: [0, 'Talk', 'User', 'User talk', 'Forum'], // Only articles, talk pages, user pages, user talk pages or forums edits count, other Wikia namespace edits don't count
    zeroIsInactive: true // 0 edits = inactive
};
UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');
UserTagsJS.modules.autoconfirmed = true; // Switch on Autoconfirmed User check
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // If the expression is true then they will be marked as a new user
        // If the expression is false then they won't.
        // In this instance, newuser is removed as soon as the user gets 30
        // edits, OR as soon as they have been present for 10 days, whichever
        // happens first.
        return days < 10 && edits < 30;
    }
};
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator', 
    'chatmoderator',
    'patroller',
    'rollback',
    'bannedfromchat'
];
UserTagsJS.modules.custom = {
    'Paralysis of Lenuysis': ['former-content-moderator'],
    'Sera EX': ['former-content-moderator'],
    'Hykuu': ['former-content-moderator'],
    'Emperoer but better': ['former-threadmoderator'], 
    'Game Master Battler': ['former-threadmoderator'],
    'HyperNepsy': ['former-threadmoderator'],
    'Sayo Yasuda': ['former-sysop'],
    'LukaSolosYourVerse': ['former-sysop'],
    'Just Shinza': ['former-sysop'],
    'DarkNeon1994': ['former-bureaucrat'],
    'Twilly18': ['former-bureaucrat'],
    'Udlmaster': ['former-sysop'],
    'LuckyEmile': ['former-bureaucrat'],
    'Elizhaa': ['human-resources'],
    'Sixo_Bullet': ['human-resources'],
    'SoViewtiful': ['human-resources'],
    'PlozAlcachaz': ['former-content-moderator'],
    'Varia29': ['former-sysop'],
    'The Tetromino King': ['former-bureaucrat']
};

UserTagsJS.modules.metafilter = {
    // Remove inactive from all bureaucrats, sysops, bots, global bots, staff, wikia utility and vstf
    'inactive': [
        'sysop',
        'bureaucrat',
        'bot',
        'bot-global',
        'staff',
        'util',
        'vstf'
    ], 
    'sysop': ['bot', 'bot-global'], // Remove "Administrator" tag from bots and global bots
    'content-moderator': ['bureaucrat', 'sysop'], // Remove "Content Moderator" tag from bureaucrats and administrators
    'threadmoderator': ['bureaucrat', 'sysop'], // Remove "Discussions Moderator" tag from bureaucrats and administrators
    'chatmoderator': ['bureaucrat', 'sysop'], // Remove "Chat Moderator" tag from bureaucrats and administrators
    'rollback': ['bureaucrat', 'sysop'] // Remove "Rollback" tag from bureaucrats and administrators
};
// UserTagsJS.modules.stopblocked = true; //Enabled by default
//Manually turn off by changing true -> false

// Username script // 
	 
(function () { 
	 
if (wgUserName !== null) $('span.insertusername').text(wgUserName);
	 
})();

// Bureaucrat promotion warning message //
!function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Userrights') return;
    $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if ($('#wpGroup-bureaucrat').attr('checked') && !confirm('Do you truly want to appoint a bureaucrat?')) $('#wpGroup-bureaucrat').attr('checked', null);
    });
}();

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/debatesjungle/images/8/88/Blanko.png/revision/latest/scale-to-width-down/200?cb=20190107002413';
window.pPreview.tlen = 1000;

//==============================================================
// Sorts content on Special:WhatLinksHere alphabetically
//==============================================================
 
(function($) {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Whatlinkshere') return;
    var sorted_list,
        $list = $('#mw-whatlinkshere-list');
    sorted_list = $list.children('li').sort(function (a, b) {
        return ($(a).find('a:first').attr('title') > 
        $(b).find('a:first').attr('title')) ? 1 : -1;});
    $list.children('li').remove();
    $list.append(sorted_list);
})(jQuery);

//==============================================================
// Personalized imports
//==============================================================
// Import scripts if user has one of the following ranks:
/* Rollback, Content Moderator, Admin, Bureaucrat, Content Volunteer,
VSTF, FANDOM Helper, FANDOM Staff */
/* For more info on those groups; refer to 
https://community.wikia.com/wiki/Help%3AUser_rights */

(function(){
const wgUserGroups = mw.config.get('wgUserGroups');

if(wgUserGroups.includes('rollback') || 
   wgUserGroups.includes('content-moderator') ||
   wgUserGroups.includes('sysop') ||
   wgUserGroups.includes('bureaucrat') ||
   wgUserGroups.includes('content-volunteer') ||
   wgUserGroups.includes('vstf') ||
   wgUserGroups.includes('helper') ||
   wgUserGroups.includes('staff')){
      importArticles({
            type: 'script',
            articles: [
            'u:dev:MediaWiki:AjaxRename/code.js'
        ]
    });
}

if(wgUserGroups.includes('sysop') ||
   wgUserGroups.includes('bureaucrat') ||
   wgUserGroups.includes('content-volunteer') ||
   wgUserGroups.includes('vstf') ||
   wgUserGroups.includes('helper') ||
   wgUserGroups.includes('staff')){
      importArticles({
            type: 'script',
            articles: [
            'u:dev:MediaWiki:WHAM/code.2.js',
            'u:dev:MediaWiki:AjaxUserRights.js'
        ]
    });
}
}());
//==============================================================
// Category Sorter Resolution
//==============================================================
!function(cfg) {
    // sorts categories by name
    // do not bother anons
    if (cfg.loaded || !mw.config.get('wgUserName')) return;
    cfg.loaded = !0;
    
    var targets = [
            '#mw-normal-catlinks:first > ul:first > li',
            '#mw-hidden-catlinks:first > ul:first > li',
            '#articleCategories .category',
        ];
    
    function sorter(a, b) {
        // locale will be determined automatically. probably. works on my machine
        return (a.textContent || '').localeCompare(b.textContent || '');
    }// sorter

    $(function() {
        targets.forEach(function(target) {
            var $target = $(target),
                $parent = $target.parent(),// cache parent, cuz it will be lost after .remove
                sorted = $target.sort(sorter);
            $target.remove();
            $parent.append(sorted);
        });
    });
}((window.fng = window.fng || {}).catsorter = window.fng.catsorter || {});