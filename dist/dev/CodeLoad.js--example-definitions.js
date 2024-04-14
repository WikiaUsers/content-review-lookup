// example code definitions for [[CodeLoad]]

codeLoad.definitions = {
    "ajaxrc": {
        "title": "AjaxRC",
        "description": "Advanced auto-refreshing recent changes and watchlist ([[w:c:dev:AjaxRC|more info]])",
        "group": "tools",
        "articles": [
            "dev:AjaxRC/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "AjaxRCRefreshText": "Auto-refresh",
            "ajaxRefresh": 30000
        }
    },
    "anchoredrollback": {
        "title": "AnchoredRollback",
        "description": "Allows you to make rollbacks without changing location",
        "group": "tools",
        "articles": [
            "dev:AnchoredRollback/code.js"
        ],
        "preferences": {
            "enabled": true
        },
        "requirements": {
            "usergroups": "content-moderator|rollback|sysop"
        }
    },
    "botonerapopups": {
        "title": "BotoneraPopups",
        "description": "Show popup with useful action links when hovering links while CTRL key is pressed",
        "group": "extras",
        "articles": [
            "dev:BotoneraPopups/BotoneraPopups.js",
            "dev:BotoneraPopups/WikiArticle.js",
            "dev:BotoneraPopups/UILang/en.js",
            "dev:BotoneraPopups/code.js",
            "dev:BotoneraPopups.css"
        ]
    },
    "floatingtoc": {
        "title": "FloatingToc",
        "description": "turns the table of contents into a floating panel",
        "group": "extras",
        "articles": [
            "dev:FloatingToc/code.js"
        ],
        "requirements": {
            "skins": "oasis"
        }
    },
    "highlight": {
        "title": "Highlight",
        "description": "Add highlighting to known members of the [[w:Help:SOAP|SOAP]], [[w:Help:Wiki Specialists|Wiki Specialist]], [[w:Help:Community Team|Fandom Staff]], and [[w:Help:Bots|Bot]] groups",
        "articles": [
            "dev:Highlight.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "revealanonip": {
        "title": "RevealAnonIP",
        "description": "Converts text that says 'A Wikia contributor' to the actual IP address",
        "articles": [
            "dev:RevealAnonIP/code.js"
        ],
        "requirements": {
            "usergroups": "user"
        }
    }
};

codeLoad.groups = {
    "extras": "Site enhancements",
    "tools": "Tools"
};

codeLoad.prefDescriptions = {
    "AjaxRCRefreshText": "Refresh text",
    "ajaxRefresh": "Refresh interval"
};