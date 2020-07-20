codeLoad.definitions = {
    "AddAlbums": {
        "title": "Add Albums",
        "description": "find album pages that link to the current song page and add them to the SongHeader template",
        "group": "editbutton",
        "articles": [
            "EditorTools-common.js",
            "EditorTools-templates.js",
            "EditorTools-templates-lw.js",
            "AddAlbums.js"
        ],
        "preferences": {
            "editsummary": "albums"
        }
    },
    "AudioPlayer": {
        "title": "Audio Player",
        "description": "show embedded players next to the lyrics for songs with Spotify or Bandcamp links",
        "articles": [
            "AudioPlayer.js"
        ],
        "preferences": {
            "loadBandcamp": true,
            "loadSpotify": true
        }
    },
    "EditButtons": {
        "title": "Extra editor buttons",
        "description": "buttons to quickly add a redirect or HTML comment to a page",
        "group": "editbutton",
        "articles": [
            "EditButtons.js"
        ]
    },
    "ResolveRedirects": {
        "title": "Resolve Redirects",
        "description": "find links to redirects on the current page and replace them with their target page name",
        "group": "editbutton",
        "articles": [
            "EditorTools-common.js",
            "ResolveRedirects.js"
        ],
        "preferences": {
            "editsummary": "resolve redirects"
        }
    },
    "SelectionTools": {
        "title": "Selection Tools",
        "description": "lowercase, uppercase, or replace the selected text",
        "group": "editbutton",
        "articles": [
            "EditorTools-common.js",
            "SelectionTools.js"
        ]
    },
    "ShowRating": {
        "title": "Show Rating",
        "description": "displays a page's star rating when hovering over a link to it",
        "articles": [
            "ShowRating.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "showRatingAlwaysRun": false
        }
    },
    "TidyLyrics": {
        "title": "Tidy Lyrics",
        "description": "tidy and format lyric pages per the standards listed on [[Help:Contents/Editing/Formatting/Songs#Lyrics|the song formatting help page]].",
        "group": "editbutton",
        "articles": [
            "EditorTools-common.js",
            "TidyLyrics.js"
        ],
        "preferences": {
            "annotations-summary": "move annotations to creditbox",
            "linebreaks-summary": "line breaks",
            "tidylyrics-summary": "formatting"
        }
    },
    "TidyTemplates": {
        "title": "Tidy Templates",
        "description": "tidy and sort template parameters",
        "group": "editbutton",
        "articles": [
            "EditorTools-common.js",
            "EditorTools-templates.js",
            "EditorTools-templates-lw.js",
            "TidyTemplates.js"
        ]
    },
    "Wikifyer": {
        "title": "Wikifyer",
        "description": "quickly create album listings using data from Spotify, iTunes, or MusicBrainz",
        "articles": [
            "Wikifyer-loader.js"
        ]
    }
};

codeLoad.groups = {
    "editbutton": "Editor buttons"
};

codeLoad.prefDescriptions = {
    "editsummary": "Edit summary",
    "annotations-summary": "\"Add annotations\" edit summary",
    "linebreaks-summary": "\"Fix line breaks\" edit summary",
    "tidylyrics-summary": "\"Tidy lyrics\" edit summary",
    "showRatingAlwaysRun": "Runs on RC and Watchlist if true",
    "loadBandcamp": "Load the Bandcamp player",
    "loadSpotify": "Load the Spotify player"
};

codeLoad.introMessage = "For more details, see the [[LyricWiki:Scripts]] page.";