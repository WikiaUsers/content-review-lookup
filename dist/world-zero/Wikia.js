// RailWAM
window.railWAM = {
    logPage: "Project:WAM Log"
};

// UserTags
window.UserTagsJS = {
    modules: {
        mwGroups: ["bureaucrat", "sysop", "threadmoderator", "content-moderator"],
 
        metafilter: {
            inactive: ["bureaucrat", "sysop", "moderator", "threadmoderator", "content-moderator"],
            newuser: ["bureaucrat", "sysop", "moderator", "threadmoderator", "content-moderator"],
            rollback: ["sysop"],
            moderator: ["sysop"],
            threadmoderator: ["sysop"],
            "content-moderator": ["sysop"],
        },
 
        implode: {
            moderator: ["content-moderator", "threadmoderator"]
        },
 
        inactive: {
            days: 30,
            zeroIsInactive: false
        },
 
        newuser: {
            days: 4,
            edits: 10,
            namespace: 0,
        },
    },
 
    tags: {
        bureaucrat: { order: 0 },
        sysop: { order: 1 },
        moderator: { u: "Moderator", order: 2 }
    },
};

// CategoryCSS
window.categoryCSS = {
    "World 1": "MediaWiki:World1.css",
    "World 2": "Mediawiki:World2.css",
    "World 3": "Mediawiki:World3.css",
    "World 4": "Mediawiki:World4.css",
    "World 5": "Mediawiki:World5.css"
};