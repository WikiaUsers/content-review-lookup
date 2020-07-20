codeLoad.definitions = {
   "clock": {
        "title": "UTC Clock",
        "description": "Adds a UTC clock to the page header",
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
    "activityfeed": {
        "title": "Activity Feed",
        "description": "Adds colors and hover effects for the WikiActivity feed items. ",
        "articles": [
            "dev:MediaWiki:ActivityFeed.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "refreshthreads": {
        "title": "Refresh Threads",
        "description": "Periodically checks for new thread replies on the 'Thread' namespace using AJAX. ",
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
        "description": "Creates a gentle winter snowfall in the wiki's background",
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
            "snowCfg_onlyOasis": true,
            "animationInterval": 35
        }
    },
    "hiderail": {
        "title": "HideRail",
        "description": "Expands articles to 100% wide in the Oasis skin via the Expand Content toolbar button.",
        "articles": [
            "dev:HideRail/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": false
        }
    },
    "editorvisualminimal": {
        "title": "EditorVisualMinimal ",
        "description": "Redesign on the visual editor",
        "articles": [
            "dev:MediaWiki:EditorVisualMinimal/code.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "editorsourceminimal": {
        "title": "EditorSourceMinimal",
        "description": "Redesign on the source editor",
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
        "articles": [
            "dev:NoImageLightbox/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
};
codeLoad.prefDescriptions = {
    "format": "Display formatting",
    "interval":"Time between AJAX requests (in ms).",
    "auto_add": "Whether new replies should be added automatically or manually by using a button prompting the user to update.",
    "flakesMax": "Max flakes made",
    "flakesMaxActive": "Max flakes falling",
    "followMouse": "Snow interacts with mouse",
    "useMeltEffect": "Snow melts when falling",
    "useTwinkleEffect": "Snow twinkling",
    "usePositionFixed": "Snow fixed when scrolling",
    "snowCfg_onlyOasis": "Whether should be run only in Oasis or not.",
    "animationInterval": "Theoretical milliseconds per frame measurement."
};