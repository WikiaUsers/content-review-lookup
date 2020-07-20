window.UserTagsJS = {
    modules: {},
    tags: {
        // groupname: { u:'Displayname', link:'DRRP-Page', order:number }
        // status
        blocked: {u:'Executed', order: 1/0},
        inactive: {u:'Escaped', order: 1/0},
        notautoconfirmed: { u:'Enrolled', order:0 },
// ranks
        founder: { u:'Mastermind', link:'Staff', order:-1 },
        bureaucrat: { u:'Monokuma', link:'Staff', order:-1 },
        sysop: { u:'Monokub', link:'Staff', order:1 },
        contentmoderator: { u: 'Monomi', link:'Staff', order:-1 },
        threadmoderator: { u:'Shirokuma', link:'Staff', order:-1 },
        rollback: { u:'Detective', link:'Staff', order:1 },
        chat_moderator: { u:'Kurokuma', link:'Staff', order:1 },
        autoconfirmed: { u:'Student', order:-1 },
        // suspicious people
        bannedfromchat: { u:'Absent', order:-1},
        JSCSSassist: { u:'Monodam', link:'User:Jdnow', order:-1 },
    },
    oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
	'Jdnow': ['Monodam'] // guy responsible for Javascript/CSS
};

UserTagsJS.modules.mwGroups = [ // ability to CSS these tags
    'autoconfirmed', 'notautoconfirmed', 'inactive','blocked',
    'founder', 'bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', "content-moderator",
    'bannedfromchat', 'jester', 'forger', 'serialkiller', 'executioner', 'arsonist'];
 
UserTagsJS.modules.metafilter = { // Remove lower-rank tags from higher-rank users
    'sysop': ['bureaucrat', 'founder'],
    "content-moderator": ['sysop', 'bureaucrat', 'founder'],
    'threadmoderator': ["content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'chatmoderator': ['threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'rollback': ['chatmoderator', 'threadmoderator',"content-moderator", 'sysop', 'bureaucrat', 'founder'],
    'autoconfirmed': ['rollback', 'chatmoderator', 'threadmoderator', "content-moderator", 'sysop', 'bureaucrat', 'founder'],
};
UserTagsJS.modules.newuser = {
    days: 2, // Must have been on the Wiki for 2 days
    edits: 5, // And have at least 5 edits to remove the tag
};
importArticles({
    type: "script",
    articles: [
         "w:c:dev:RevealAnonIP/code.js",
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
         "w:dev:BackToTopButton/code.js", /* Back to top button */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:SearchGoButton/code.js", /* Search go button */
         "w:c:dev:UserTags/code.js", /* Custom user tags */
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:Standard Edit Summary/code.js", /* Standard edit summary */
         "w:dev:FixMultipleUpload/code.js", /* Fixes the broken Edit Tools template on Special:MultipleUpload */
         "w:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "w:dev:FileUsageAuto-update/code.js", /* Automatically updates file links throughout the wiki upon renaming */
         "MediaWiki:Common.js/Imports.js", /* Auto-refresh, Inactive users, AdvancedOasis, Anons */ 
         "MediaWiki:Common.js/blocklock.js", /* Lock blogs that haven't been commented on for more than 30 days */
         "w:dev:ExternalImageLoader/code.js", /* Allows usage of ExternalImageLoader */
 
    ]
});
/* Any JavaScript here will be loaded for all users on every page load. */