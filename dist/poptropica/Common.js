//MessageWallUserTags Begin http://dev.wikia.com/wiki/MessageWallUserTags
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Ultimate_iPad_Expert': 'Owner • Global PW Admin • PHB Editor',
        'Legofan100': 'Global PW Admin',
        'HPuterpop': 'Admin • PHB Editor',
        'TronX7': 'Admin',
        'Ylimegirl': 'Admin',
        'Giant_Bubbles': 'Admin',
        'TheSlantedFish': 'Admin • PHB Editor',
        'Bob_Bricks': 'Moderator',
        'DeeBradleyBakerFan': 'Moderator',
        'Gojiran103': 'Moderator',
        'Samwow5': 'Moderator • PHB Editor',
        'SlipperyRaptor': 'ThreadMod • ChatMod • PHB Editor',
        'Rough_Fang': 'Rollbacker',
        'Shadowy_Scarecrow': 'ChatMod • Rollbacker',
        'Ylimebot': 'Bot',
        'Legofan100_bot': 'Bot',
        'Chrisredd': 'ThreadMod • ChatMod',
    }
};
//MessageWallUserTags end

/*UserTags stuff*/
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data }
        blocked: { order: '3' },
        bannedfromchat: { order: '4' },
        owner: {
            u: 'Owner',
            order: '7'
        },
            'bot-global': {
            order: '2'
        },
        bot: {
            u: 'bot',
            link: 'Poptropica Wiki:Bots',
            order: '8'
        },
        phb: {
            u: 'PHB Editor',
            order: '5',
            title: 'Poptropica Help Blog Editor',
            link: 'http://poptropicahelp.net'
        },
        globalpwadmin: {
            u: 'Global PW Admin',
            order: '6',
            title: 'Admin on all 3 PHN wikis'
        },
        bureaucrat: {
            link: 'Poptropica Wiki:Bureaucrats',
            order: '9'
        },
        sysop: {
            link: 'Poptropica Wiki:Administrators',
            order: '10'
        },
        threadmoderator: {
            u: 'Thread Moderator',
            link: 'Poptropica Wiki:Thread Moderators',
            order: '11'
        },
        chatmoderator: {
            link: 'Poptropica Wiki:Chat moderators',
            order: '12'
        },
        rollback: {
            u: 'Rollbacker',
            link: 'Poptropica Wiki:Rollbackers',
            order: '13'
        },
            'autoconfirmed_users': {
            order: '999'
        },
        inactive: {
            order: '1',
            title: "Hasn't edited for 90 days"
        },
        council: {
            u: 'Councilor',
            order: '1.5',
            link: 'http://community.wikia.com/wiki/Help:Community_Council',
            title: 'Wikia Community Council'
        }
    },
    oasisPlaceBefore: ''
};

UserTagsJS.modules.inactive = 90; // 90 days

UserTagsJS.modules.mwGroups = ['blocked', 'bannedfromchat', 'bureaucrat', 'sysop', 'rollback', 'threadmoderator', 'chatmoderator', 'autoconfirmed_users', 'bot', 'bot-global', 'council' ];

UserTagsJS.modules.custom = {
    'Legofan100': ['globalpwadmin'],
    'Ultimate iPad Expert': ['globalpwadmin', 'owner', 'phb'],
    'Samwow5': ['phb'],
    'HPuterpop': ['phb'],
    'TheSlantedFish': ['phb'],
    'SlipperyRaptor': ['phb']
};
/*UserTags stuff end*/

importArticles({
    type: "script",
    articles: [
        //'u:c:MediaWiki:Snow.js',          //This controls the snow falling element. 
        'u:dev:TopEditors/code.js',
        'u:dev:TwittWidget/code.js',
        'u:dev:UserTags/code.js', //http://dev.wikia.com/wiki/UserTags
        'u:dev:Countdown/code.js', //http://dev.wikia.com/wiki/Countdown
        'u:dev:DisplayTimer/code.js', //http://dev.wikia.com/wiki/DisplayTimer
        'u:dev:LastEdited/code.js', //http://dev.wikia.com/wiki/LastEdited
        'u:dev:MiniComplete/code.js', //http://dev.wikia.com/wiki/MiniComplete
        'u:dev:ReferencePopups/code.js', //http://dev.wikia.com/wiki/ReferencePopups
        'u:dev:MessageWallUserTags/code.js', //http://dev.wikia.com/Wiki/MessageWallUserTags
        'u:dev:AjaxRC/code.js' //http://dev.wikia.com/wiki/AjaxRC
    ]
});

/*ListUsers http://dev.wikia.com/wiki/ListUsers start
window.listUsers.customgroups = ['threadmoderator', 'globalpwadmin', 'phb'];
window.listUsers = {
    talk: true,
    contribs: true,
    editcount: true
};
importScriptPage('ListUsers/code.js', 'dev');
*/

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function () {
    if (window.disableUserReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */

/* For [[Templae:EmbedCard]] */
/* TODO: Figure out how to put multiple different cards on one page */
$(function EmbedCard() {
   $("#mw-content-text div.EmbedCard").first().replaceWith(
				'<embed base="http://static.poptropica.com/avatarstudio/" wmode="transparent" width="169" height="236" src="http://static.poptropica.com/avatarstudio/charEmbed.swf?a=' +
				($("#mw-content-text div.EmbedCard").first().text()) +
				'" />');
});