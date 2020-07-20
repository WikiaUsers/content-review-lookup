/* Makes username template work */

/* LockForums */
window.LockForums = {
    expiryDays: 30,
    lockMessageWalls: true,
    expiryMessage: 'This thread has been archived due to inactivity.'
}; 

SpoilerAlert = {
    'class': "Spoiler",
};

// BEGIN ListUsers
window.listUsers = {
    talk: true,
    contribs: true,
    editcount: true
};

/*TLH Quiz*/
var quizName = "The Loud House Quiz";
var quizLang = "en";
var resultsTextArray = [
    "You should watch more The Loud House...",
    "Not bad, you know a lot about The Loud House.",
    "WOW! You're a The Loud House expert!"
];
var questions = [

    ["How many sisters does Lincoln have?",
        "10",
        "7",
        "4",
        "He doesn't have any sisters."
    ],

    ["Where does the Loud Family live?",
        "Royal Woods",
        "Michigan",
        "Washington",
        "New Orleans"
    ],

    ["Who is Lincoln's best friend?",
        "Clyde McBride",
        "Rusty Spokes",
        "Liam",
        "Zach"
    ],

    ["Which was the first episode of the series?",
        "Left in the Dark",
        "Get the Message",
        "Heavy Meddle",
        "Making the Case"
    ],

    ["Who created the series?",
        "Chris Savino",
        "Kyle Marshall",
        "Alec Schwimmer",
        "Karla Sakas Shropshire"
    ],

    ["What are the Loud sisters age order? Old to young.",
        "Lori, Leni, Luna, Luan, Lynn, Lucy, Lana, Lola, Lisa und Lily.",
        "Lily, Lola, Lucy, Luan, Leni, Lisa, Lana, Lynn, Luna und Lori.",
        "Luna, Lucy, Lisa, Leni, Lynn, Lola, Lori, Luan, Lana und Lily.",
        "Lily, Lisa, Lola, Lana, Lucy, Lynn, Luan, Luna, Leni und Lori."
    ],

    ["How's the Christmas special of The Loud House called?",
        "11 Louds a Leapin",
        "Christmas at the Louds",
        "The Loud Christmas",
        "Loudly Christmas"
    ],

    ["When did the series start?",
        "May 2, 2016",
        "August 1, 2016",
        "September 27, 2016",
        "March 1, 2016"
    ],

    ["What makes Lincoln happy?",
        "Playing videogames, read comics and being with his sisters.",
        "Sleep all day.",
        "Rule the world!",
        "Watch TV and play sports."
    ],

    ["What's the name of Lincoln's girlfriend?",
        "Ronnie Anne",
        "Christina",
        "Amalia",
        "Tabby"
    ]

];

/* User Tags sec. 1*/
window.UserTagsJS = {
    tags: {
        // group: { associated tag data }
        founder: {
            u: 'Founder',
            order: -1 / 0
        },
        bureaucrat: {
            u: 'Bureaucrat',
            link: 'Project:Staff of the Wiki#Bureaucrats',
            order: -1 / 0
        },
        sysop: {
            u: 'Admin',
            link: 'Project:Staff of the Wiki#Administrators',
            order: -1 / 0
        },
        chatmoderator: {
            u: 'Chat Mod',
            link: 'Project:Staff of the Wiki#Chat_Moderators',
            order: -1 / 0
        },
        adopter: {
            u: 'Wiki Adopter',
            link: 'Project:Staff of the Wiki#Wiki_Adopter',
            order: -1 / 0
        },
        usermonth: {
            u: 'User of the Month',
            order: -1 / 0
        },
        vstf: {
            u: 'VSTF',
            order: -1 / 0
        },
        staff: {
            u: 'Staff',
            order: -1 / 0
        },
        councilor: 'Councilor',
        facebook: 'Facebook Manager',
        twitter: {
            u: 'Twitter Manager',
            link: 'Project:Staff of the Wiki#Twitter_Manager',
            order: -1 / 0
        },
        google: 'Google+ Manager',
        assistant: 'Assistant',
        skype: 'Skype Admin',
        permdisabled: 'Permanantly Disabled Account',
        admincrat: {
            u: 'Admincrat',
            link: 'Project:Staff of the Wiki#Admincrats'
        },
        supportadmin: {
            u: 'Support Administrator',
            link: 'Project:Staff of the Wiki#Support_Administrators',
            order: -1 / 0
        },
        patroller: {
            u: 'Patroller',
            link: 'Project:Staff of the Wiki#Patrollers',
            order: -1 / 0
        },
        formeradmin: {
            u: 'Former Administrator',
            link: 'Project:Staff of the Wiki#Former_Admins',
            order: -1 / 0
        },
        'bot-global': {
            u: 'Wikia Bot',
            link: 'Project:Staff of the Wiki#Wikia_Bots',
            order: -1 / 0
        },
        bot: {
            u: 'Bot',
            link: 'Project:Staff of the Wiki#Bot_Accounts',
            order: -1 / 0
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};

/* User Tags sec. 2 */

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'moderator'];



/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
/* End of the {{USERNAME}} replacement */