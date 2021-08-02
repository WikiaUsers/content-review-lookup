codeLoad.definitions = {
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
// Awaiting FandomDesktop Support
//    "clock": {
//        "title": "UTC Clock",
//        "description": "Adds a UTC clock to the page header",
//        "group": "extras",
//        "articles": [
//            "dev:UTCClock/code.js"
//        ],
//        "preferences": {
//            "requiresGlobalPrefs": true,
//            "globalPrefNamespace": "DisplayClockJS",
//            "enabled": false,
//            "format": "%2H:%2M:%2S %p %2d %B %Y (UTC)"
//        }
//    },
    "countdown": {
        "title": "Countdown Clocks",
        "description": "Adds clocks that countdown to specific events and releases",
        "group": "content",
        "articles": [
            "dev:Countdown/code.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
// To Be Rewritten
//    "font": {
//        "title": "Totally Nuts Font",
//        "description": "Removes custom font from text areas with exception of article and rail headers",
//        "group": "design",
//        "articles": [
//            "Wikia.css/totally-nuts.css"
//        ],
//        "preferences": {
//            "enabled": false
//        }
//    },
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
};

codeLoad.groups = {
    "extras": "Site enhancements",
    "design": "Site styling",
    "tools": "Tools",
    "content": "Content additions (Disabling not recommended)"
};

codeLoad.prefDescriptions = {
    "format": "Display formatting",
    "flakesMax": "Max flakes made",
    "flakesMaxActive": "Max flakes falling",
    "followMouse": "Snow interacts with mouse",
    "useMeltEffect": "Snow melts when falling",
    "useTwinkleEffect": "Snow twinkling",
    "usePositionFixed": "Snow fixed when scrolling"
};