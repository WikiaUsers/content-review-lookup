// ReadProgressBar Config
window.enableReadProgressBarOnArticles = true

// LinkPreview Config
window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://static.wikia.nocookie.net/silly-cat/images/5/51/NoImage.png/revision/latest?cb=20231017160842',	
    RegExp: {
        ipages: [new RegExp('.*?SillyCat[_ ]Wiki*')],
    },
});

// MapExtended Config
window.mapsExtendedConfig = {
	"sidebarOverlay": true,
    "minimalLayout": true,
    "enableSidebar": true,
    "iconAnchor": "center",
    "enableSearch": true,
    "openPopupsOnHover": false,
    "useCustomPopups": true,
    "enableTooltips": true,
    "enableFullscreen": true,
    "fullscreenMode": "screen",
    "mapControls": [
                    [],
                    [
                        "zoom",
                        "fullscreen"
                    ],
                    [
                        "edit"
                    ],
                    []
                ],
    "sortMarkers": "category",
};

// GadgetsStateToggler Config
nkch_gst_gadgets = [{
    name: "PageEditInfo",
    title: "Page Edit Info",
    description: "Show details about the creator and last edit to the current page."
}, {
    name: "adBlock",
    title: "AdBlock",
    description: "Blocks all advertisements in Silly Cat Wiki."
}, {
    name: "WiderPage",
    title: "Wider Page",
    description: "Dynamically hide GlobalNav thus makes the page wider."
}, {
    name: "scrollSpy",
    title: "Scroll Spy",
    description: "allows selection of multiple files directly from a single dialog box."
}, {
    name: "Sillynonymous",
    title: "Sillynonymous",
    description: "Replace default fandom's avatar into silly milly cat."
}, {
    name: "Snowflake",
    title: "Snowflake",
    description: "Adds a falling snow to the Mainpage."
}, {
    name: "scrollUpButton",
    title: "Scroll Up Button",
    description: "Adds a scroll to top and bottom button."
}, {
    name: "uploadMultipleFiles",
    title: "Upload Multiple Files",
    description: "allows selection of multiple files directly from a single dialog box."
}, {
    name: "Stella",
    title: "Stella",
    description: "Displays a list of maintenance categories needing attention on the wiki."
}, {
    name: "Modern Changes",
    title: "Modernized Changes",
    description: "Modernizes the appearance of pages that show recent changes or logs."
}, {
    name: "HydraRevived", 
    title: "Hydra Revived", 
    description: "Reintroduces elements from the legacy Hydra skin to FandomDesktop." 
}];