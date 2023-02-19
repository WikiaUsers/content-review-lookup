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


/* MapsExtended global config */
window.mapsExtendedConfig = {
    "sortMarkers": "category",
    "openPopupsOnHover": false,
    "useCustomPopups": true,
    "allowFullscreen": true,
    "fullscreenMode": "window",
    "allowSearch": true,
    "hiddenCategories": [
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
                        "spawn_cultist"
                    ]
                }
            ]
        },
        {
            "label": "Misc",
            "children": [
                "locked",
                "quest",
                "lever"
            ]
        },
        {
            "label": "Loot",
            "children": [
                "loot_key",
                "loot_keycard",
                "loot_loose",
                {
                    "label": "Containers",
                    "children": [
                        "container_stash",
                        "container_ammo",
                        "container_cash",
                        "container_pc",
                        "container_dead",
                        "container_drawer",
                        "container_grenade",
                        "container_jacket",
                        "container_medical",
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