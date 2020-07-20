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
    "font": {
        "title": "Cinzel Font",
        "description": "Implements notable fonts from the game",
        "group": "design",
        "articles": [
            "Fonts.css"
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
    "profile": {
        "title": "Modern Profile",
        "description": "Modernizes profiles",
        "group": "design",
        "articles": [
            "dev:ModernProfile/EditButton.js"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "subcategories": {
        "title": "Top Subcategories",
        "description": "Shows subcategories on the top of dynamic categories",
        "group": "design",
        "articles": [
            "dev:MoveSubcategoriesToTheTop.js"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "references": {
        "title": "Reference Popups",
        "description": "Adds a floating citation box upon hovering over a reference number",
        "group": "extras",
        "articles": [
            "dev:ReferencePopups/code.js"
        ],
        "preferences": {
            "enabled": true
        }
    }
};

codeLoad.groups = {
    "extras": "Site enhancements",
    "design": "Site styling",
    "tools": "Tools"
};

codeLoad.prefDescriptions = {
    /* advanced script settings */
    "ajaxRefresh": "Refresh interval (milliseconds)",
    "AjaxRCRefreshText": "Refresh text",
    "AjaxRCRefreshHoverText": "Refresh text on hover"
};