// ReadProgressBar Config
window.enableReadProgressBarOnArticles = true

// LinkPreview Config
window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://static.wikia.nocookie.net/silly-cat/images/5/51/NoImage.png/revision/latest?cb=20231017160842',	
    RegExp: {
        ipages: [new RegExp('.*?Silly[_ ]Cat[_ ]Wiki*')],
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
    name: "Performance",
    title: "Performance Mode",
    description: "Disable background, icon, and discord widget gif animation."
}, {
    name: "adBlock",
    title: "AdBlock",
    description: "Blocks all advertisements in Silly Cat Wiki."
}, {
    name: "WiderPage",
    title: "Better Layout",
    description: "Makes page wider and change GlobalNav color to match the wiki theme."
}];