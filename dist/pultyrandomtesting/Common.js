// ✓ Format checked! Intro, ToC, notes, sections, headings, lines, and tabs.

// This is where all the local site JavaScript is stored.

/*************************************************/
/*************** TABLE OF CONTENTS ***************/
/**************************************************
TABLE OF CONTENTS
MAIN CODE
    DEV CONFIGS
    USERTAGS
    YXTQWF
    EDITCOUNT
ABANDONED CODE
    USERTAGS
        Pool (8) tag
NOTES

/*************************************************/
/******************* MAIN CODE *******************/
/*************************************************/
// DEV CONFIGS // Excluding UserTags
window.SeeMoreActivityButtonOld = true;

// USERTAGS // Config [[w:c:dev:UserTags]] (imported in [[MediaWiki:ImportJS]]).
/*------------------------------------------------------------------------------- 
| content-volunteer            | Super   | Content Volunteer            | -2/0  | 
| council                      | Super   | Councilor                    | -2/0  | 
| global-discussions-moderator | Super   | Global Discussions Moderator | -2/0  | 
| helper                       | Super   | Helper                       | -2/0  | 
| staff                        | Super   | Staff                        | -2/0  | 
| vanguard                     | Super   | Vanguard                     | -2/0  | 
| voldev                       | Super   | Volunteer Developer          | -2/0  | 
| vstf                         | Super   | VSTF                         | -2/0  | 
| founder                      | Super   | Founding Father              | -3    | 
| bureaucrat                   | Super   | Bureaucrat                   | -2    | 
| sysop                        | Regular | Admin                        | -1    | 
| bot                          | Regular | Slave                        | X     | 
| chatmoderator                | Regular | Honored Guest                | -10   | 
| rollback                     | Regular | Rollback                     | -10   | 
| alt                          | Regular | Alt                          | X     | 
| notautoconfirmed             | Regular | New Account                  | 1e101 | 
| bannedfromchat               | Regular | Banned From Chat             | 1e102 | 
| blocked                      | Regular | Blocked                      | X     | 
| inactive                     | Regular | Inactive                     | 1/0   | 
-------------------------------------------------------------------------------*/
window.UserTagsJS = {
    modules: {},
    tags: {
        "founder":          {order: -3,    u: "Founding Father",  title: "The Amazing Founder of this Wiki"},
        "bureaucrat":       {order: -2                                                                     },
        "sysop":            {order: -1                                                                     },
        "bot":              {              u: "Slave",            title: "Bot"                             },
        "chatmoderator":    {order: -10,   u: "Honored Guest"                                              },
        "rollback":         {order: -10,   u: "Visitor"                                                    },
        "alt":              {              u: "Alt",              title: "Alternative account"             },
        "bannedfromchat":   {order: 1e102, u: "Exiled from Chat", title: "Banned from Chat"                },
        "blocked":          {              u: "Exiled",           title: "Blocked"                         },
    },
};
UserTagsJS.modules.mwGroups = ["content-volunteer", "council", "global-discussions-moderator", "helper", "staff", "vanguard", "voldev", "vstf", "bureaucrat", "sysop", "chatmoderator", "rollback", "bannedfromchat", "blocked"]; // Install groups
UserTagsJS.modules.autoconfirmed = true; // Install notautoconfirmed group
UserTagsJS.modules.inactive = 200; // Inactive period
UserTagsJS.modules.metafilter = { // "Tag" is never owned by ["these", "groups"],
    "sysop":    ["bot"],
    "rollback": ["chatmoderator"],
    "inactive": ["founder", "bot", "alt"],
};
UserTagsJS.modules.custom = {
    "Possessed by Sleet": ["bot"],
    "QueenVisionseekertheNightWingGodessofeverything": ["alt"],
    "The Last Horizon": ["alt"],
    "Yxtqwf": ["founder"],
};

// YXTQWF
window.onload = function() {
    $("a[href$=':Yxtqwf']:contains('Yxtqwf'), a[href$='/Yxtqwf']:contains('Yxtqwf')").each(function() {
        $(this).html($(this).html().replace("Yxtqwf", "YXTQWF"));
    });
};

// EDITCOUNT // Add a "Stats" tab in the user menu.
var username = $(".UserProfileMasthead .masthead-info h1").text();
var tabLink = "<li data-id='editcount'><a href='/wiki/Special:Editcount/" + username + "'>Stats</a></li>";
var tabLocation = $("li[data-id='contribs']");
tabLocation.after(tabLink);

/*************************************************/
/**************** ABANDONED CODE *****************/
/**************************************************
// USERTAGS
    // Pool (8) tag
    window.UserTagsJS = {
        tags: {
            "pool": {order: 1/0, u: "8"},
        },
    };
    UserTagsJS.modules.custom = {
        "Grudgeholderr": ["pool"], 
    };

/*************************************************/
/********************* NOTES *********************/
/**************************************************
    * EDITCOUNT is a fork of [[w:c:town-of-salem:MediaWiki:Wikia.js]].
        * See [[w:c:town-of-salem:Thread:247867]].
    * The "username" variable (EDITCOUNT) is borrowed from [[w:c:dev:Tallylink?oldid=93104]]).
    * The CSS styles for USERTAGS are stored in [[MediaWiki:Common.css/Userpages.css]].
*/