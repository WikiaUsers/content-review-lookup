
window.UserTagsJS = {
    modules: {
        mwGroups: [
            "bureaucrat",
            "content-moderator",
            "sysop",
            "patroller",
            "threadmoderator",
            "chatmoderator",
            "patroller",
        ],
        metafilter: {
            "sysop":            ["bureaucrat"],
            "chatmoderator":    ["threadmoderator"],
            "threadmoderator":  ["sysop"],
            "patroller":        ["content-moderator", "sysop"],
            "rollback":         ["content-moderator", "sysop"]
        }
    },
    tags: {
        "bureaucrat":           { u: "Bureaucrat",           },
        "sysop":                { u: "Administrator",        },
        "threadmoderator":      { u: "Discussions Moderator",},
        "chatmoderator":        {                            },
        "content-moderator":    { u: "Content Moderator",    },
        "patroller":            { u: "Patroller",            },
        "rollback":             { u: "Rollback",             }
    }
};