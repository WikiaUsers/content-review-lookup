///////////////////////////////////////////////
/******* Anon Tags *******/
///////////////////////////////////////////////
(function() {
    var $masthead = $('#UserProfileMasthead');
    if (!$masthead.exists()) {
        return;
    }
    var $info = $masthead.find('.masthead-info hgroup'),
        username = $info.find('h1').text();
    if (
        mw.util.isIPv4Address(username) ||
        mw.util.isIPv6Address(username)
    ) {
        var $tag = $info.find('.tag');
        if ($tag.exists()) {
            var blocked = $tag.remove().text();
            $info.append(
                $('<span>', {
                    'class': 'tag-container'
                }).append(
                    $('<a>', {
                        'text':    blocked,
                        'href':    mw.util.getUrl('Help:Blocking'),
                        'title':   'Help:Block',
                        'class':   'tag usergroup-blocked blocked-user'
                    })
                )
            );
        }
    }
})();

///////////////////////////////////////////////
/************* Tag Configuration *************/
///////////////////////////////////////////////
/* Tag Creation */
window.UserTagsJS = {
    modules: {},
    tags: {
        /** Global FANDOM Groups **/
        staff: {
            link:  'Help:Community Team',
            title: 'Help:Community Team'
        },
        helper: {
            link:  'Help:Volunteers and Helpers#Helpers',
            title: 'Help:Volunteers and Helpers'
        },
        vstf: {
            link:  'Help:SpamTaskForce',
            title: 'Help:SpamTaskForce'
        },
        'global-discussions-moderator': {
            link:  'Project:Global Discussions Moderator',
            title: 'Project:Global Discussions Moderator'
        },
        voldev: {
            link:  'Help:Volunteer Developers',
            title: 'Help:Volunteer Developers'
        },
        vanguard: {
            link:  'Help:Vanguard',
            title: 'Help:Vanguard'
        },
        council: {
            link:  'Project:Council',
            title: 'Project:Council'
        },
        'content-volunteer': {
            link:  'w:c:community:Thread:1401657',
            title: 'February 26th 2018 Technical Update'
        },
        authenticated: {
            link:  'w:c:community:Help:User rights#Authenticated',
            title: 'Help:User rights'
        },
        'bot-global': {
            link:  'w:c:community:Help:Bots',
            title: 'Help:Bots'
        },


        /** Fully Automated **/
        autoconfirmed: {
            u:     'Verified',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 925
        },
        inactive: {
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 500
        },
        newuser: {
            u:     'User',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 950
        },
        nonuser: {
            u:     'Non-User',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 975
        },
        notautoconfirmed: {
            u:     'New Account',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 1000
        },


        /** Externally Dependent **/
        blocked: {
            link:  'Help:Blocking',
            title: 'Help:Block',
            order: 100
        },
        'check-user': {
            link:  'Help:CheckUser',
            title: 'Help:CheckUser',
            order: 325
        },
        bot: {
            link:  'Project:Bots',
            title: 'Project:Bots',
            order: 400
        },
        rot: {
            u:     'Rogue Bot',
            link:  'Project:Bots#Note on why bots may be blocked',
            title: 'Project:Bots',
            order: 350
        },
        bureaucrat: {
            u:     'Senior Admin',
            link:  'Project:Staff',
            title: 'Project:Staff',
            order: 475
        },
        'content-moderator': {
            u:     'Intern',
            link:  'Project:Internships',
            title: 'Project:Internships',
            order: 625
        },
        threadmoderator: {
            u:     'Intern',
            link:  'Project:Internships',
            title: 'Project:Internships',
            order: 650
        },
        chatmoderator: {
            u:     'Intern',
            link:  'Project:Internships',
            title: 'Project:Internships',
            order: 675
        },
        rollback: {
            u:     'Code Admin',
            link:  'Project:Staff',
            title: 'Project:Staff',
            order: 600
        },


        /** Semi-Internally Dependent **/
        com: {
            u:     'Community Admin',
            link:  'Project:Staff',
            title: 'Project:Staff',
            order: 525
        },
        mod: {
            u:     'Moderator',
            link:  'Project:Staff',
            title: 'Project:Staff',
            order: 550
        },
        sen: {
            u:     'Sentinel',
            link:  'Project:Staff',
            title: 'Project:Staff',
            order: 575
        },


        /** Internally Dependent **/
        founder: {
            link:  'Help:Founders',
            title: 'Help:Founders',
            order: 450
        },
        st: {
            u:     'Error — Contact an Admin',
            link:  'Project:Staff',
            title: 'Project:Staff',
            order: 200
        },
        sa: {
            u:     'Staff Artist',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 760
        },
        em: {
            u:     'Editor of the Month',
            link:  'Project:Home',
            title: 'Project:Home',
            order: 720
        },
        vip: {
            u:     'VIP',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 780
        },
        hi: {
            u:     'On Hiatus',
            link:  'Project:Tags',
            title: 'Project:Tags',
            order: 750
        }
    }
};//End TC*/


/* Functionality Modules */
UserTagsJS.modules.stopblocked   = false;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.isblocked     = true;
UserTagsJS.modules.nonuser       = true;
UserTagsJS.modules.inactive      = 30;
UserTagsJS.modules.newuser       = {
    days: 14,
    edits: 10,
    namespace: 0
};
UserTagsJS.modules.mwGroups      = [
    'blocked',
    'authenticated',
    'bot-global',
    'bot',
    'checkuser',
    'founder',
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'chatmoderator',
    'rollback',
    'autoconfirmed'
];//End FM*/


/* Custom Tags */
UserTagsJS.modules.custom = {
    /** Staff Ranks **/
    'Tigerashark14'          : ['st','cofounder'],
    'Cdkey7708'     : ['founder'],//ST exempt
    
};//End CT*/


/* Meta Filter */
UserTagsJS.modules.metafilter = {
    /** Fully Automated **/
    inactive: [
        'blocked',
        'staff',
        'helper',
        'vstf',
        'global-discussions-moderator',
        'voldev',
        'vanguard',
        'council',
        'content-volunteer',
        'authenticated',
        'bot-global',
        'bot',
        'founder',
        'bureaucrat',
        'em',
        'newuser',
        'notautoconfirmed',
        'nonuser',
        'hi'
    ],
    autoconfirmed: [
        'blocked',
        'staff',
        'helper',
        'vstf',
        'global-discussions-moderator',
        'voldev',
        'vanguard',
        'council',
        'content-volunteer',
        'authenticated',
        'bot-global',
        'bot',
        'founder',
        'st',
        'sa',
        'vip',
        'ef',
        'em',
        'threadmoderator',
        'chatmoderator',
        'rollback',
        'nonuser',
        'newuser',
        'inactive',
        'sysop'
    ],
    newuser: [
        'blocked',
        'staff',
        'helper',
        'vstf',
        'global-discussions-moderator',
        'voldev',
        'vanguard',
        'council',
        'content-volunteer',
        'authenticated',
        'bot-global',
        'bot',
        'founder',
        'vip',
        'nonuser',
        'notautoconfirmed',
        'sysop',
        'content-moderator',
        'chatmoderator',
        'threadmoderator',
        'rollback'
    ],
    nonuser: [
        'blocked',
        'staff',
        'helper',
        'vstf',
        'global-discussions-moderator',
        'voldev',
        'vanguard',
        'council',
        'content-volunteer',
        'authenticated',
        'bot-global',
        'bot',
        'founder',
        'vip',
        'notautoconfirmed',
        'sysop',
        'content-moderator',
        'chatmoderator',
        'threadmoderator',
        'rollback'
    ],
    notautoconfirmed: [
        'blocked',
        'staff',
        'helper',
        'vstf',
        'global-discussions-moderator',
        'voldev',
        'vanguard',
        'council',
        'content-volunteer',
        'authenticated',
        'bot-global',
        'bot',
        'vip',
        'sysop',
        'content-moderator',
        'chatmoderator',
        'threadmoderator',
        'rollback'
    ],


    /** Externally Dependent **/
    bot: [
        'staff',
        'helper',
        'vstf',
        'bot-global',
        'founder',
        'st',
        'vip'
    ],
    bureaucrat: 'hi',
    sysop: [
        'blocked',
        'sysop'
    ],
    'content-moderator': [
        'blocked',
        'bot',
        'hi'
    ],
    threadmoderator: [
        'blocked',
        'bot',
        'hi',
        'content-moderator'
    ],
    chatmoderator: [
        'blocked',
        'bot',
        'hi',
        'threadmoderator',
        'sysop'//Sole-sysop bug fix
    ],
    rollback: [
        'blocked',
        'bot',
        'bureaucrat',
        'hi'
    ],
    blocked: 'bureaucrat',


    /** Semi-Internally Dependent **/
    com: [
        'blocked',
        'bureaucrat',
        'hi'
    ],
    mod: [
        'blocked',
        'bureaucrat',
        'com',
        'hi'
    ],
    sen: [
        'blocked',
        'bureaucrat',
        'com',
        'hi'
    ],

    /** Internally Dependent **/
    founder: 'blocked',
    st: [
        'blocked',
        'st'
    ],
    sa: [
        'blocked',
        'hi'
    ],
    em: 'blocked',
    vip: [
        'blocked',
        'bureaucrat',
        'sysop',
        'content-moderator',
        'threadmoderator',
        'chatmoderator',
        'rollback',
        'em'
    ],
    hi: 'blocked'
};//End MF*/


/* User Filter */
UserTagsJS.modules.userfilter = {
    'Anonymoususer12321': 'newuser',
};//End UF*/


/* Implode */
UserTagsJS.modules.implode = {
    'rot': [
        'bot',
        'blocked'
    ],
    'com': [
        'st',
        'content-moderator'
    ],
    'mod': [
        'st',
        'threadmoderator'
    ],
    'sen': [
        'st',
        'chatmoderator'
    ]
};//End Implode*/