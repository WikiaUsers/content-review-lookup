// ReadProgressBar Config
window.enableReadProgressBarOnArticles = true

// LinkPreview Config
window.pPreview = $.extend(true, window.pPreview, {
    noimage: 'https://static.wikia.nocookie.net/silly-cat/images/5/51/NoImage.png/revision/latest?cb=20231017160842',	
    RegExp: {
        ipages: [new RegExp('.*?SillyCat[_ ]Wiki*')],
    },
});

// FandomDesktop modification
// Crdeit: Terraria Wiki
$(function() {
    if (!$('body.skin-fandomdesktop').length) {
        return;
    }
    /* Automatically expand pages to full-width */
    mw.loader.using("skin.fandomdesktop.js").then(function() {
        if (!$('.is-content-expanded').length) {
            if ((mw.config.get("wgUserName") === null) ? localStorage.contentwidth : mw.user.options.get('contentwidth') !== "collapsed") {
                $("button.content-size-toggle").click();
            }
        }
    });
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