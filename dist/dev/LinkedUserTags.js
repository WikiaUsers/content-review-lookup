/**
 * @Name           LinkedUserTags
 * @Version        1.0.0
 * @Author         Ursuul <https://dev.fandom.com/wiki/User:Ursuul>
 * @Description    Preconfigured UserTags installation w/ links & ordering
 * @See also       <https://dev.fandom.com/wiki/UserTags>
 *                 <https://dev.fandom.com/wiki/PrettyUserTags>
 */

/* Tag Definitions */
window.UserTagsJS = {
    modules: {},
    tags: {
        //Global Fandom Groups
        'authenticated': {
            link:  'Help:User rights#Authenticated',
            title: 'Help:User rights'
        },
        'bot-global': {
            link:  'Help:Bots',
            title: 'Help:Bots'
        },
        'wiki-specialist': {
            link:  'Help:Content Team Members',
            title: 'Help:Content Team Members'
        },
        'content-volunteer': {
            link:  'w:c:community:Thread:1401657',
            title: 'February 26th 2018 Technical Update'
        },
        'council': {
            link:  'Help:Community Council',
            title: 'Help:Community Council'
        },
        'global-discussions-moderator': {
            link:  'Help:Global Discussions moderators',
            title: 'Help:Global Discussions moderators'
        },
        'helper': {
            link:  'Help:Volunteers and Helpers#Helpers',
            title: 'Help:Volunteers and Helpers'
        },
        'soap': {
            link:  'Help:SpamTaskForce',
            title: 'Help:SpamTaskForce'
        },
        'staff': {
            link:  'Help:Community Team',
            title: 'Help:Community Team'
        },
        'vanguard': {
            link:  'Help:Vanguard',
            title: 'Help:Vanguard'
        },
        'voldev': {
            link:  'Help:Volunteer Developers',
            title: 'Help:Volunteer Developers'
        },
        'wiki-representative': {
            link:  'Help:Wiki Managers',
            title: 'Help:Wiki Managers'
        },

        //Local Groups
        'bannedfromchat': {
            link:  'Help:Chat#Unbanning',
            title: 'Help:Chat',
            order: 1100
        },
        'blocked': {
            link:  'Help:Blocking#Appealing a block',
            title: 'Help:Blocking',
            order: 500
        },
        'bot': {
            link:  'Help:Bots',
            title: 'Help:Bots',
            order: 200
        },
        'bureaucrat': {
            link:  'Help:Bureaucrats\' how-to guide',
            title: 'Help:Bureaucrats\' how-to guide',
            order: 300
        },
        'chatmoderator': {
            link:  'Help:Chat#Chat moderators',
            title: 'Help:Chat',
            order: 900
        },
        'checkuser': {
            link:  'Help:CheckUser',
            title: 'Help:CheckUser',
            order: 600
        },
        'content-moderator': {
            link:  'Help:User rights#Content Moderators',
            title: 'Help:User rights',
            order: 700
        },
        'founder': {
            link:  'Help:Founders',
            title: 'Help:Founders',
            order: 101
        },
        'rollback': {
            link:  'Help:User rights#Rollbacks',
            title: 'Help:User rights',
            order: 1000
        },
        'sysop': {
            link:  'Help:Administrators\' how-to guide',
            title: 'Help:Administrators\' how-to guide',
            order: 400
        },
        'threadmoderator': {
            link:  'Help:User rights#Discussions Moderators',
            title: 'Help:User rights',
            order: 800
        }
    }
};

/* Modules */
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.stopblocked   = false;
UserTagsJS.modules.inactive      = false;
UserTagsJS.modules.newuser       = false;
UserTagsJS.modules.mwGroups      = [
    //Global Fandom Groups
    'authenticated',
    'bot-global',
    
    //Local Groups
    'bannedfromchat',
    'blocked',
    'bot',
    'bureaucrat',
    'chatmoderator',
    'checkuser',
    'content-moderator',
    'founder',
    'rollback',
    'sysop',
    'threadmoderator'
];

/* MetaFilter */
UserTagsJS.modules.metafilter = {
    'bannedfromchat': [
        'blocked',
        'bot',
        'chatmoderator',
        'helper',
        'soap',
        'staff',
        'sysop',
        'threadmoderator',
        'wiki-representative'
    ],
    'bot': 'bot-global',
    'bureaucrat': [
        'bot',
        'founder'
    ],
    'chatmoderator': [
        'blocked',
        'bot',
        'bureaucrat',
        'founder',
        'sysop',
        'threadmoderator'
    ],
    'checkuser': [
        'blocked',
        'bot'
    ],
    'content-moderator': [
        'blocked',
        'bot',
        'bureaucrat',
        'founder',
        'sysop'
    ],
    'founder': 'bot',
    'rollback': [
        'blocked',
        'bot',
        'bureaucrat',
        'content-moderator',
        'founder',
        'sysop'
    ],
    'sysop': [
        'bot',
        'bureaucrat',
        'founder'
    ],
    'threadmoderator': [
        'blocked',
        'bot',
        'bureaucrat',
        'founder',
        'sysop'
    ]
};

/* Custom */
if (window.LinkedUserTagsFounder) {
    UserTagsJS.modules.custom = UserTagsJS.modules.custom || {};
    UserTagsJS.modules.custom[window.LinkedUserTagsFounder] = 'founder';
}

/* UserTags Installation */
mw.util.addCSS(
    '.tag-container a.tag {' +
        'color: inherit;' +
    '}'
);

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:UserTags/code.js'
});