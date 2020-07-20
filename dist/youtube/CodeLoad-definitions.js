codeLoad.definitions = {
    "ajaxblock": {
        "title": "AjaxBlock",
        "description": "Allows you block a User without changing location",
        "group": "tools",
        "articles": [
            "dev:AjaxBlock/code.js"
        ],
        "requirements": {
            "usergroups": "sysop"
        }
    },
    "ajaxrc": {
        "title": "AjaxRC",
        "description": "Advanced auto-refreshing recent changes and watchlist ([[w:c:dev:AjaxRC|more info]])",
        "isdefault": true,
        "group": "tools",
        "articles": [
            "dev:AjaxRC/code.js"
        ]
    },
    "anchoredrollback": {
        "title": "AnchoredRollback",
        "description": "Allows you to make rollbacks without changing location",
        "group": "tools",
        "articles": [
            "dev:AnchoredRollback/code.js"
        ],
        "requirements": {
            "usergroups": "content-moderator|rollback|sysop"
        }
    },
    "Message": {
        "title": "Message",
        "description": "Allows you to message multiple Users at once",
        "group": "tools",
        "articles": [
            "dev:Message/code.js"
        ],
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
            "dev:BotoneraPopups/code.css"
        ]
    },
    "ContribsLink": {
        "title": "ContribsLink",
        "description": "Adds a link to your contributions page from the drop-down menu in the top-right corner.",
        "group": "extras",
        "articles": [
            "dev:ContribsLink/code.js"
        ]
    },
    "floatingtoc": {
        "title": "FloatingToc",
        "description": "Turns the table of contents into a floating panel",
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
        "description": "Add highlighting to known members of the [[Help:SpamTaskForce|VSTF]], [[Help:Helper Group|Helper]], [[Help:Wikia Staff|Wikia Staff]], and [[Help:Bots|Bot]] groups",
        "isdefault": true,
        "articles": [
            "dev:Highlight/code.css"
        ]
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
    "tools": "Tools",
};