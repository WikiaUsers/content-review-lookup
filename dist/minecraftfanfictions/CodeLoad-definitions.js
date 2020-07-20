codeLoad.definitions = {
    "hiderail": {
        "title": "HideRail",
        "description": "Expands articles to 100% wide in the Oasis skin via the Expand Content toolbar button.",
        "articles": ["dev:HideRail/code.js"],
        "preferences": {"requiresGlobalPrefs": true, "enabled": false}
    },
    "editorvisualminimal": {
        "title": "Visual Editor Minimal",
        "description": "Redesigns the Visual Editor.",
        "articles": ["dev:MediaWiki:EditorVisualMinimal/code.css"],
        "preferences": {"enabled": false}
    },
    "lastedited": {
        "title": "Last Edited",
        "description": "Adds details about the last edit to the current page.",
        "articles": ["dev:LastEdited/code.js"],
        "preferences": {"enabled": false}
    },
    "noimagelightbox": {
        "title": "NoImageLightbox",
        "description": "Kills Wikia's Lightbox loader for images so that clicking an image takes you directly to the 'File:' page.",
        "articles": ["dev:NoImageLightbox/code.js"],
        "preferences": {"enabled": false}
    },
    "pagecreator": {
        "title": "Page Creator",
        "description": "Adds details about who created the page you are on and when. Works at its fullest in tandem with Last Edited, but can perfectly be employed on its own as well.",
        "articles": ["dev:PageCreator/code2.js"],
        "preferences": {"enabled": false}
    },
    "capsfirst": {
        "title": "Caps First",
        "description": "Automatically turns every first letter of any and all messages in the chatroom into a capital letter.",
        "articles": [
            "dev:CapsFirst/code.js"
         ],
         "preferences": {"enabled": false}
    },
    "transparentfooter": {
        "title": "Transparent Footer",
        "description": "Makes the global FANDOM Footer transparent.",
        "articles": ["GlobalFooter.css"],
        "preferences": {"enabled": false}
    },
    "smb": {
        "title": "Alternate See More Activity Button",
        "description": "Redesigns the See More Activity Button to an arrow pointing to the right, located at the top right of the Wiki Activity Module.",
        "articles": ["dev:SeeMoreActivityButton/code.js"],
        "preferences": {
            "enabled": false,
            "SeeMoreActivityButton": true,
            "SeeMoreActivityButtonRC": false
        }
    },
    "jtb": {
        "title": "Jump to bottom button",
        "description": "Adds a button to the toolbar that takes you to the bottom of the page when clicked.",
        "articles": ["JTB.js"],
        "preferences": {"enabled": false}
    },
    "btt": {
        "title": "Back to top button",
        "description": "Adds a button to the toolbar that takes you to the top of the page when clicked. You can customize its appearance.",
        "articles": ["dev:BackToTopButton/code.js"],
        "preferences": {
            "enabled": false,
            "requiresGlobalPrefs": true,
            "BackToTopModern": false,
            "BackToTopArrow": false,
            "BackToTopText": "Jump to top",
            "BackToTopStart": 625
        }
    },
    "hidechatrail": {
        "title": "Hide Chat Rail",
        "description": "Allows you to hide the right rail in chat by clicking / tapping your profile at the top right.",
        "articles": ["dev:HideChatRail/code.js", "dev:HideChatRail/code.css"],
        "preferences": {"enabled": false}}
};

codeLoad.prefDescriptions = {
    "SeeMoreActivityButtonOld": "Tick this checkbox to change the \"See Mor\
    e Activity Button\" to an arrow at the top right of the module.",
    "SeeMoreActivityButtonRC": "Tick this checkbox to make the \"See Mor\
    e Activity Button\" lead to [[Special:RecentChanges]] instead.",
    "BackToTopModern": "Tick this checkbox to change the back to top button\
    into a round, textless button.",
    "BackToTopArrow": "Tick this checkbox to change the back to top button\
    into an arrow.",
    "BackToTopText": "Change the text of the Back to top button. Only \
    applicable for the regular button.",
    "BackToTopStart": "Change this value to set where the back to top button\
    will start to appear."
};