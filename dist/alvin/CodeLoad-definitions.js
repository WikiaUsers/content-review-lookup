codeLoad.definitions = {
    "ajaxrc": {
        "title": "AjaxRC",
        "description": "Auto-refreshes multiple Special pages including WikiActivity and RecentChanges",
        "group": "tools",
        "articles": [
            "dev:AjaxRC/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": true,
            "ajaxRefresh": 30000,
            "AjaxRCRefreshText": "Auto-refresh",
            "AjaxRCRefreshHoverText": "Automatically refresh the page"
        }
    },
    "backtotop": {
        "title": "Back to Top Button",
        "description": "Adds a back to top button on the bottom toolbar",
        "group": "tools",
        "articles": [
            "dev:BackToTopButton/code.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "clock": {
        "title": "UTC Clock",
        "description": "Adds a UTC clock to the page header",
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
    "countdown": {
        "title": "Countdown Clocks",
        "description": "Adds clocks that countdown to specific events and releases",
        "group": "content",
        "articles": [
            "Wikia.js/countdownclock.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "font": {
        "title": "Totally Nuts Font",
        "description": "Removes custom font from text areas with exception of article and rail headers",
        "group": "design",
        "articles": [
            "Wikia.css/totally-nuts.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "greeting": {
        "title": "Message Wall Greeting Button",
        "description": "Adds a button to a user's message wall greeting and wall history on message wall",
        "group": "tools",
        "articles": [
            "dev:WallGreetingButton/code.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "header": {
        "title": "Advanced Header Theme",
        "description": "Modifies the page navigation header style to better match Munkapedia's theming",
        "group": "design",
        "articles": [
            "Advanced Header Theme.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "ratings": {
        "title": "Star Ratings",
        "description": "Adds five star ratings to episode, special, and film pages",
        "group": "content",
        "articles": [
            "Wikia.js/star-ratings.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "references": {
        "title": "Reference Popups",
        "description": "Adds a floating citation box on hover of a reference number",
        "group": "extras",
        "articles": [
            "dev:ReferencePopups/code.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "search": {
        "title": "Search Suggest",
        "description": "Adds additional page options below local search based on the search query",
        "group": "extras",
        "articles": [
            "dev:SearchSuggest/code.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "snow": {
        "title": "Snow",
        "description": "Creates a gentle winter snowfall in the wiki's background",
        "group": "design",
        "articles": [
            "Wikia.js/snow.js"
        ],
        "preferences": {
            "enabled": false,
            "flakesMax": 115,
            "flakesMaxActive": 65,
            "followMouse": false,
            "useMeltEffect": true,
            "useTwinkleEffect": false,
            "usePositionFixed": true
        }
    },
    "spoiler": {
        "title": "Spoiler",
        "description": "Adds a spoiler notice on pages that may contain spoilers",
        "group": "extras",
        "articles": [
            "Wikia.js/spoiler-alert.js"
        ],
        "preferences": {
            "enabled": true
        }
    }
};

codeLoad.groups = {
    "extras": "Site enhancements",
    "design": "Site styling",
    "tools": "Tools",
    "content": "Content additions (Disabling not recommended)"
};

codeLoad.prefDescriptions = {
    "ajaxRefresh": "Refresh interval (milliseconds)",
    "AjaxRCRefreshText": "Refresh text",
    "AjaxRCRefreshHoverText": "Refresh text on hover",
    "format": "Display formatting",
    "flakesMax": "Max flakes made",
    "flakesMaxActive": "Max flakes falling",
    "followMouse": "Snow interacts with mouse",
    "useMeltEffect": "Snow melts when falling",
    "useTwinkleEffect": "Snow twinkling",
    "usePositionFixed": "Snow fixed when scrolling"
};