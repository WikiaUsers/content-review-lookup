codeLoad.definitions = {
    "AjaxBatchDelete": {
        "title": "Batch Delete",
        "description": "Allow deleting a list of pages in a form and protecting them if necessary. This tool is accessible through 'My Tools' on Wikia Toolbar.",
        "group": "sysop",
        "articles": [
            "dev:AjaxBatchDelete.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": true,
            "batchDeleteDelay": 1000,
        },
        "requirements": {
            "usergroups": "content-moderator|sysop",
        }
    },
    "MassCategorization": {
        "title": "Mass Categorization",
        "description": "Categorization (add/remove/replace) on multiple pages in a list fashion, similar to AjaxBatchDelete.",
        "group": "sysop",
        "articles": [
            "dev:MassCategorization/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": false,
        },
        "requirements": {
            "usergroups": "content-moderator|sysop",
        }
    },
    "ajaxrc": {
    "title": "AjaxRC",
    "description": "Advanced auto-refreshing for special pages ([[w:c:dev:AjaxRC|more info]]).",
    "group": "extras",
    "articles": [
        "dev:AjaxRC/code.js"
    ],
    "preferences": {
        "enabled": true,
        "requiresGlobalPrefs": true,
        "AjaxRCRefreshText": "Auto-refresh",
        "ajaxRefresh": 60000,
        "AjaxRCRefreshHoverText": 'Automatically refresh the page',
        "ajaxIndicator": "https://vignette.wikia.nocookie.net/sonic/images/7/7c/AjaxRC.gif/revision/latest?cb=20170917141821",
        "ajaxPages": [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:WikiActivity",
    "Special:Log",
    "Special:Contributions"
    ]
}
    },
   "clock": {
        "title": "Page Header clock",
        "description": "Adds a UTC clock to the page header.",
        "group": "extras",
        "articles": [
            "dev:UTCClock/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "globalPrefNamespace": "DisplayClockJS",
            "enabled": false,
            "format": "%2H:%2M:%2S %p %2d %B %Y (UTC)"
        }
    },
    "Toolbarclock": {
        "title": "Toolbar clock",
        "description": "Adds a UTC display clock with purge + null edit function onto your toolbar.",
        "group": "extras",
        "articles": [
            "dev:DisplayTimer/code.js"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "discussionsactivity": {
        "title": "Discussions Activity",
        "description": "Creates a 'Recent Wiki Activity' feed for latest Discussions messages. ",
        "group": "extras",
        "articles": [
            "dev:DiscussionsActivity.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": false,
            "rdaRefreshInterval": 60000
        }
    },
    "ModernWikiActivity": {
        "title": "Modern wiki activity",
        "description": "This stylesheet modernizes the look of the [[Special:WikiActivity]] page",
        "group": "design",
        "articles": [
            "ModernWikiActivity.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "refreshthreads": {
        "title": "Refresh Threads",
        "description": "Periodically checks for new thread replies on the 'Thread' namespace using AJAX. ",
        "group": "extras",
        "articles": [
            "dev:RefreshThreads/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": true,
            "interval": 15000,
            "auto_add": true
        }
    },
    "snow": {
        "title": "Snow",
        "description": "Creates a gentle winter snowfall in the wiki's background.",
        "group": "extras",
        "articles": [
            "dev:SnowStorm.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": false,
            "flakesMax": 135,
            "flakesMaxActive": 85,
            "followMouse": false,
            "useMeltEffect": true,
            "useTwinkleEffect": false,
            "usePositionFixed": true,
            "animationInterval": 35
        }
    },
    "SeeMoreActivityButton": {
        "title": "SeeMoreActivity Button",
        "description": "Adds a link to recent wiki activity or recent changes to Rail.",
        "group": "extras",
        "articles": [
            "dev:SeeMoreActivityButton/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": true,
           "SeeMoreActivityButtonRC": false
        }
    },
    "hiderail": {
        "title": "HideRail",
        "description": "Expands articles to 100% wide via the Expand Content toolbar button.",
        "group": "extras",
        "articles": [
            "dev:HideRail/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "editorvisualminimal": {
        "title": "EditorVisualMinimal",
        "description": "A redesign for the visual editor.",
        "group": "design",
        "articles": [
            "dev:MediaWiki:EditorVisualMinimal/code.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "editorsourceminimal": {
        "title": "EditorSourceMinimal",
        "description": "A redesign for the source editor",
        "group": "design",
        "articles": [
            "dev:MediaWiki:EditorSourceMinimal/light.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "lastedited": {
        "title": "LastEdited",
        "description": "Adds details about the last edit to the current page.",
        "group": "extras",
        "articles": [
            "dev:LastEdited/code.js"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "quickdiff": {
        "title": "QuickDiff",
        "description": "Lets you quickly view any diff link on a wiki (plus extra features for admins).",
        "group": "extras",
    "articles": [
            "dev:QuickDiff/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "noimagelightbox": {
        "title": "NoImageLightbox",
        "description": "Kills Wikia's Lightbox loader for images so that clicking an image takes you directly to the 'File:' page.",
        "group": "extras",
        "articles": [
            "dev:NoImageLightbox/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "pseudomonobook": {
        "title": "PseudoMonobook",
        "description": "Introduces Monobook visual design cues to Oasis.",
        "group": "design",
        "articles": [
            "dev:MediaWiki:PseudoMonobook.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "backtotopbutton": {
        "title": "Back to top button",
        "description": "Adds a button to the right corner of the toolbar that takes you back to the top of the page.",
        "group": "extras",
        "articles": [
            "dev:BackToTopButton/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": false,
           "BackToTopModern": true,
           "BackToTopText": "Back To Top",
           "BackToTopSpeed": "600"
        }
    },
    "FileUsageAuto-update": {
        "title": "FileUsageAuto-update",
        "description": "Automatically updates file links throughout the wiki upon renaming an image or queue file link updates to perform batch updates.",
        "group": "sysop",
        "articles": [
            "dev:FileUsageAuto-update/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": true,
           "editSummary": "Updating file links (automatic)",
           "delay": 5000
        },
        "requirements": {
            "usergroups": "content-moderator|sysop"
        }
    },
    "FileLogs": {
        "title": "File Logs",
        "description": "Shows log excerpts on file pages.",
        "group": "extras",
        "articles": [
            "dev:FileLogs.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "WhatLinksHere": {
        "title": "What links here",
        "description": "Adds a link to [[Special:WhatLinksHere]] to the drop-down menu of the 'Edit' button.",
        "group": "extras",
        "articles": [
            "dev:WhatLinksHere/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "NullEditButton": {
        "title": "Null-Edit Button",
        "description": "Adds Null Edit option to the drop-down menu of the 'Edit' button.",
        "group": "extras",
        "articles": [
            "dev:NullEditButton/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "ParentPageEdit": {
        "title": "Parent Page Edit",
        "description": "Adds buttons to edit base and root pages in sub-pages.",
        "group": "extras",
        "articles": [
            "dev:ParentPageEdit.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": false,
           "EditBasePageText": "Edit base page",
           "EditRootPageText": "Edit root page"
        }
    },
     "ViewSource": {
        "title": "View Source",
        "description": "Adds a 'View source' option to the drop-down menu of the 'Edit' button.",
        "group": "extras",
        "articles": [
            "dev:View Source/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
};
codeLoad.groups = {
    "extras": "Site enhancements",
    "design": "Site styling",
    "sysop": "Moderator-only tools",
};
codeLoad.prefDescriptions = {
    "batchDeleteDelay": "Determines the rate of the deletion. By default, it is 1000 milliseconds (1 second) to delete one article.",
    "AjaxRCRefreshText": "Text displayed beside the checkbox on the page.",
    "ajaxRefresh": "Interval in which the page is automatically refreshed (in milliseconds).",
    "AjaxRCRefreshHoverText": "Text displayed when hovering over the text",
    "ajaxIndicator": "Progress indicator image",
    "format": "Display formatting",
    "rdaRefreshInterval": "Specifies the interval in milliseconds in which the posts will be reloaded.",
    "interval":"Time between AJAX requests (in ms).",
    "auto_add": "Whether new replies should be added automatically or manually by using a button prompting the user to update.",
    "flakesMax": "Max flakes made",
    "flakesMaxActive": "Max flakes falling",
    "followMouse": "Snow interacts with mouse",
    "useMeltEffect": "Snow melts when falling",
    "useTwinkleEffect": "Snow twinkling",
    "usePositionFixed": "Snow fixed when scrolling",
    "animationInterval": "Theoretical milliseconds per frame measurement.",
    "SeeMoreActivityButtonRC": "Tick the checkbox to change the link's destination to [[Special:RecentChanges]] instead.",
    "BackToTopModern": "Whether to show the button as a text button or as an arrow button.",
    "BackToTopText": "If you choose the text button, here you can specify its text.",
    "BackToTopSpeed": "This determines the scroll speed of the button.",
    "editSummary": "This specifies the edit summary for pages that the links are updated on."
};