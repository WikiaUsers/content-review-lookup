/* Any JavaScript here will be loaded for all users on every page load. */

// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================

// RevealAnonIP

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

//Auto Message Blocked
var MessageBlock = {
    title : 'Blocked.',
    message : 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck : true
};
//Last Edited Config
window.lastEdited = {
    avatar: false
};

window.ajaxPages = new Array( 'Special:RecentChanges', 'Special:WikiActivity', 'Special:Log', 'Special:NewFiles' );
window.AjaxRCRefreshText = 'Automatically refresh this page',
window.AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads',

// *****************************
// Beginning of Script importing
// *****************************
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
        // 'u:dev:MessageWallUserTags/code.js', /* Please read http://dev.wikia.com/wiki/MessageWallUserTags before re-enabling. This script needs default values to be set for it to work properly.
        'u:dev:DynamicImages/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:UserTags/code.js'          // User Rights Tags
    ]
});

/*SMG4 Quiz*/
var quizName = "SMG4 Quiz";
var quizLang = "en";
var resultsTextArray = [
    "You should watch more SMG4...",
    "Not bad, you know a lot about SMG4.",
    "WOW! You're an SMG4 expert!"
];
var questions = [
 
    ["What was SMG4 first video?",
        "The cake is a lie",
        "Sea Side Stupidity part 1",
        "The Evilness of Eggman",
        "Account loss"
    ],
 
    ["How do you spell SMG4's last name?",
        "Lardwichagul",
        "Luke",
        "Lerdwichagul",
        "SuperMarioGlitchy4"
    ],
 
    ["What is SMG4's most popular video?",
        "2 MILLION FAN COLLABERATION SPECIAL! (SSENMODNAR)",
        "War of the Fat Italians 2018",
        "The cake is a lie",
        "Who let the chomp out?"
    ],
 
    ["When did Fishy Boopkins debut?",
        "War of the Fat Italians 2016",
        "Sea Side Stupidity part 2",
        "Sea Side Stupidity part 1",
        "None of the above"
    ],
 
    ["What was the longest video made by SMG4?",
        "2 MILLION FAN COLLABERATION SPECIAL! (SSENMODNAR)",
        "The Mario Hustle",
        "War of the Fat Italians 2018",
        "Who let the chomp out?"
    ],
 
    ["Which was the first WOTFI",
        "War of the Fat Italians 2016",
        "War of the Fat Italians 2014",
        "War of the Fat Italians 2007",
        "None of the above"
    ],
 
    ["How old is Bob?",
        "3",
        "OVER 9000",
        "502",
        "369"
    ],
 
    ["When did SMG4 upload his first video?",
        "May 7th, 2011",
        "October 6, 2011",
        "March 31, 2007",
        "The cake is a lie"
    ]
    
];
InactiveUsers = { gone: ['Umbreon_The_Serial_Killer'] };

/* User Tags sec. 1*/
window.UserTagsJS = {
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
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */