/* Any JavaScript here will be loaded for all users on every page load. */
/* Temporary add 'Random page' for anons under 'Explore' menu */
$(document).ready(function() {
	if(mw.config.get("wgUserName")) return;

    $(".explore-menu .wds-list").append('<li><a href="/wiki/Special:Random"><span>Random Page</span></a></li>');
});

/* Interactive maps: Collectible markers button text  */
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
var mxoverrides = window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};

mxoverrides["collect-mark-button"] = "Mark as completed";
mxoverrides["collect-unmark-button"] = "Completed";

/* MapsExtended global config */
window.mapsExtendedConfig = {
    "minimalLayout": true,
    "enableSidebar": true,
    "iconAnchor": "center",
    "enableSearch": true,
    "openPopupsOnHover": false,
    "useCustomPopups": true,
    "enableTooltips": true,
    "enableFullscreen": true,
    "fullscreenMode": "window",
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
    "hiddenControls": ["edit"],
    "collectibleCategories": ["quest"],
    "collectibleCheckboxStyle": "fandom",
    "sortMarkers": "category",
    "categoryGroups": [
        {
            "label": "Extractions",
            "children": [
                "exfil_pmc",
                "exfil_scav",
                "exfil_transit"
            ]
        },
        {
            "label": "Spawns",
            "children": [
                "spawn_pmc",
                "spawn_scav",
                "spawn_sniper",
                "spawn_boss",
                "spawn_rogueraider",
                "spawn_cultist"
            ]
        },
        {
            "label": "Miscellaneous",
            "children": [
                "lever",
                "stationarygun",
                "locked",
                "quest"
            ]
        },
        {
            "label": "Loot",
            "children": [
                "loot_keycard",
                "loot_key",
                "loot_loose",
                {
                    "label": "Containers",
                    "children": [
                        "container_ammo",
                        "container_stash",
                        "container_cash",
                        "container_pc",
                        "container_dead",
                        "container_drawer",
                        "container_grenade",
                        "container_jacket",
                        "container_medical",
                        "container_medcase",
                        "container_safe",
                        "container_duffle",
                        "container_suitcase",
                        "container_crate",
                        "container_tool",
                        "container_weapon",
                        "container_greencrate"
                    ]
                }
            ]
        }
    ]
};