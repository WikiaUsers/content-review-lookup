/* Any JavaScript here will be loaded for all users on every page load. */

/* LinkPreview: Blocking the preview when class .previewIgnore will be assigned to div or span */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.iparents = ['.previewIgnore'];
window.pPreview.tlen = 0;

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
    "mapControls": [ [],["zoom","fullscreen"], ["edit"], [] ],
    "collectibleCategories": ["quest"],
    "collectibleCheckboxStyle": "fandom",
    "sortMarkers": "category",
    "categoryGroups": [
    	{"label": "Safe Zones",
        "children": ["town", "safeZone"]},
        {"label": "Anomaly Traveling",
        "children": ["anomalyEntrance","anomalyExit"]},
        {"label": "Items",
        "children": ["itemSteelwire", "itemFunnel", "itemHose", "itemFuelcan", 
        			 "itemNosepliers", "itemLongnosepliers", "itemFirewood"]},
        {"label": "Other form of loot",
        "children": ["chestLockpick", "chestGeneral"]},
        {"label": "Herbalism",
        "children": ["herbChamomile", "herbNettle", "herbRosebay", "herbCelendula", "herbDandelion"]},
        {"label": "Crafting Stations",
        "children": ["craftFurnance", "craftChamicalstation", "craftAmmopress", "craftPressmachine"]},
        {"label": "Artifact",
        "children": ["articaft_01", "artifact_02", "artifact_03", "artifact_04", 
        			 "artifact_05", "artifact_06", "artifact_07", "artifact_08"]},
		/* LIVING ENTITY - MOBS AND NPC'S */
        {"label": "NPC",
        "children": ["npc01", "npc02", "npc03", "npc04",
        			 "npc05", "npc06", "npc07", "npc08",
        			 "npc09", "npc10", "npc11", "npc12",
        			 "npc13", "npc14", "npc15", "npc16"]},
        {"label": "Monsters - Rats",	
        "children": ["monsterSmallrat", "monsterRat", "monsterBigrat", "monsterWhiterat"]},
        {"label": "Monsters - Dogs",	
        "children": ["monsterSmallstraydog", "monsterStraydog", "monsterElderstraydog"]}, 
        {"label": "Monsters - Boars",	
        "children": ["monsterSwine", "monsterBoar", "monsterElderBoar"]},
        {"label": "Monsters - Watchers",	
        "children": ["monsterSmallwatcher", "monsterWatcher", "monsterForestwatcher"]},     
        {"label": "Monsters - Spiders",	
        "children": ["monsterSpider", "monsterCavespider", "monsterCavespiderboss", "monsterSandspider", 
        			 "monsterFirespider", "monsterSunspider"]},
        {"label": "Monsters - Slimes",	
        "children": ["monsterJelly", "monsterGreenjelly", "monsterBluejelly"]},
        {"label": "Monsters - Lizards",	
        "children": ["monsterSmalllizard", "monsterLizard", "monsterElderlizard"]}, 
        {"label": "Monsters - Flesheaters",	
        "children": ["monsterSmallflesheater", "monsterFlesheater", "monsterElderflesheater", "monsterFlesheaterboss"]},
        {"label": "Monsters - Symbionts",	
        "children": ["monsterSmallsymbiont", "monsterSymbiont", "monsterBunkersymbiont", "monsterBogsymbiont"]}, 
        {"label": "Monsters - Other types",	
        "children": ["monsterHornet", "monsterSmallbug", "monsterBug", "monsterBear", 
        			 "monsterShocker", "monsterBloodsucker", "monsterMatador", "monsterMatadorboss"]},
	]
};