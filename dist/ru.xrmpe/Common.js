/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

if (document.querySelector("body").classList.contains('theme-fandomdesktop-dark')){
    mw.loader.load( '/ru/wiki/Mediawiki:' + mw.config.get( 'wgPageName' ).replace(/:/g,'_') + '.css?action=raw&ctype=text/css', 'text/css' );
}

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
    "useCustomPopups": false,
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
    "collectibleCategories": [
           "loot_drop",
            "container_drop_box",
            "container_metal_case",
            "container_wooden_box",
            "container_safe",
            "container_backpack"
],
    "collectibleCheckboxStyle": "fandom",
    "sortMarkers": "category",
    "categoryGroups": [
        {
            "label": "Спавны",
            "children": [
    "spawn_quest_nps",
    "spawn_trader",
    "spawn_medic",
    "spawn_mechanic",
    "spawn_guide",
    "spawn_othernps",
    "spawn_mutants",
    "spawn_boss",
    "spawn_sleep_place"
]
        },
        {
            "label": "Аномалии",
            "children": [
                "teleport",
                "anomaly1",
                "anomaly2",
                "anomaly3",
                "anomaly4"
            ]
        },
       {
            "label": "Лагеря",
            "children": [
                "camp_1",
                "camp_2"
            ]
        },
        {
            "label": "Лут",
            "children": [
                "loot_drop",
                "loot_self_drop_box",
                {
                    "label": "Контейнеры",
                    "children": [
                        "container_drop_box",
                        "container_metal_case",
                        "container_wooden_box",
                        "container_safe",
                        "container_backpack"

                    ]
                }
            ]
        }
    ]
};