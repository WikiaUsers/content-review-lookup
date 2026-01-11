/* Any JavaScript here will be loaded for all users on every page load. */

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
                "normal_extraction",
                "guarded_extraction",
                "special_extraction"
            ]
        },
        {
            "label": "Spawns",
            "children": [
                "runner",
                "rook"
            ]
        },
        {
            "label": "Objectives",
            "children": [
                "locked_door",
                "terminals",
                "interactive_object",
                "tad",
                "quest"
            ]
        },
        {
            "label": "Items",
            "children": [
                "prestige_keys",
                "superior_keys",
                "deluxe_keys",
                "enhanced_keys",
                "standard_keys",
                "valuables",
                "loot",
                {
                    "label": "Containers",
                    "children": [
                        "container_arms_locker",
						"container_bioprinter",
						"container_cache_case",
						"container_cache_duffel",
						"container_coffer",
						"container_core_storage",
						"container_folio",
						"container_lockbox",
						"container_medical_cabinet",
						"container_munitions_crate",
						"container_strongbox",
						"container_superior_strongbox",
						"container_tool_cart",
						"container_trunk"
                    ]
                }
            ]
        }
    ]
};