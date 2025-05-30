/* Any JavaScript here will be loaded for all users on every page load. */
/* Quest toggle; author: RheingoldRiver */
$.when( mw.loader.using( 'mediawiki.util' ), $.ready ).then( function () { 
	$dealerList = $('.dealer-toggle');
	
	if (! $dealerList.length) {
		return;
	}
	
	function togglecontent(dealer, display) {
		$('.' + dealer + '-content').each(function() {
			$(this).css('display',display);
		});
	}

	function setDealer(index, element) {
	$dealerList.each(function() {
		$(this).removeClass('current-dealer');
		togglecontent($(this).attr('data-dealer'), 'none');
		});
		$(element).addClass('current-dealer');
		togglecontent($(element).attr('data-dealer'),'');
		$.cookie("lastDealer", index, { expires: 3, path: window.location.pathname });
	}
	
	$dealerList.each(function(index) {
		$(this).click(function() {
			setDealer(index, this);
		});
		if (parseInt($.cookie("lastDealer")) === index  || (index === 0 && ! parseInt($.cookie("lastDealer")))) {
			setDealer(index, this);
		}
		else {
			togglecontent($(this).attr('data-dealer'), 'none');
		}
	});
});

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

mxoverrides["collect-mark-button"] = "Отметить выполненным";
mxoverrides["collect-unmark-button"] = "Выполнено";

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
            "label": "Выходы",
            "children": [
                "exfil_pmc",
                "exfil_scav",
                "exfil_transit"
            ]
        },
        {
            "label": "Спавны",
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
            "label": "Разное",
            "children": [
                "lever",
                "stationarygun",
                "locked",
                "quest"
            ]
        },
        {
            "label": "Лут",
            "children": [
                "loot_keycard",
                "loot_key",
                "loot_loose",
                {
                    "label": "Контейнеры",
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