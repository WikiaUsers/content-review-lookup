/* Any JavaScript here will be loaded for all users on every page load. */

/* -------------------------------------------------------------------------
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* ---------------------------------------------------------------------------
    Adding UserTags
*/

window.UserTagsJS = {
	modules: {},
	tags: {
        bureaucrat: { u:'Bureaucrat', order: 0 },
        sysop: { u:'Administrator', order: 1 },
        rollback: { u:'Rollback', order: 2 },
        threadmoderator: { u:'Discussions Moderator', order: 3  },
        chatmoderator: { u:'Chat Moderator', order: 4 },
        inactive: { u:'Inactive', order: 5 }
    }
};
 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'rollback',
    'threadmoderator',
    'chatmoderator',
    'patroller',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];

/* Import various scripts and stylesheets */
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserBadges/code.js',
        'u:dev:UserTags/code.js'
    ]
 },{
    type: 'style',
    article: 'MediaWiki:Poll.css'
});