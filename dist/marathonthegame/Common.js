/* Any JavaScript here will be loaded for all users on every page load. */

/* MapsExtended global config */
window.mapsExtendedConfig = 
{
    "minimalLayout": true,
    "enableSidebar": true,
};

/* MapsExtended local config */
window.mapsExtendedConfigs = 
{
	"ConfigTesting":
    	{
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
			                ["zoom", "fullscreen"],
			                ["edit"]
			               ],
			"sortMarkers": "category",
			"disabledCategories": ["settings"],
			"categoryGroups": 
			    [
			    	{
            			"label": "Extractions",
            			"children": 
            				[
        						"normal_extraction",
                				"guarded_extraction",
                				"special_extraction"
            				]
        			},
        			{
            			"label": "Spawns",
            			"children": 
            				[
                				"runner",
                				"rook"
            				]
        			},
        			{
            			"label": "Objectives",
            			"children": 
            				[
                				"locked_door",
                				"terminals",
                				"interactive_object",
                				"tad",
                				"quest"
            				]
        			},
        			{
            			"label": "Items",
            			"children": 
            			[
                				"prestige_keys",
                				"superior_keys",
                				"deluxe_keys",
                				"enhanced_keys",
                				"standard_keys",
                				"valuables",
                				"loot",
                					{
                    					"label": "Containers",
                    					"children": 
                    						[
                        						"container_folio",
                        						"container_arms_locker",
                        						"container_strongbox",
                        						"container_superior_strongbox"
                    						]
                					}
            			]
        			}
    			]
    	}
};