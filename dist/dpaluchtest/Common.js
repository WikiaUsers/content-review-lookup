/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
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
    "sortMarkers": "category",
    "disabledCategories": [
        "settings"
    ],
    "categoryGroups": [
        {
            "label": "Exfils",
            "children": [
                "exfil_pmc",
                "exfil_scav",
                "exfil_shared"
            ]
        },
        {
            "label": "Spawns",
            "children": [
                "spawn_pmc",
                {
                    "label": "AI",
                    "children": [
                        "spawn_scav",
                        "spawn_sniper",
                        "spawn_boss",
                        "spawn_rogueraider",
                        "spawn_bloodhound",
                        "spawn_cultist"
                    ]
                }
            ]
        },
        {
            "label": "Misc",
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