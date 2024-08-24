codeLoad.definitions = {
   "clock": {
        "title": "Horloge UTC",
        "description": "Ajoute une horloge UTC � l'en-t�te de la page",
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
    "activityfeed": {
        "title": "Flux d'activit�",
        "description": "Ajoute des couleurs et des effets de survol pour les �l�ments de flux WikiActivity.",
        "articles": [
            "dev:MediaWiki:ActivityFeed.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "snow": {
        "title": "Snow",
        "description": "Cr�e une douce chute de neige en hiver dans l'arri�re-plan du wiki",
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
    "lastedited": {
        "title": "LastEdited",
        "description": "Ajoute des d�tails sur la derni�re modification apport�e � la page en cours.",
        "articles": [
            "dev:LastEdited/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
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