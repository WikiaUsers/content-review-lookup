(function ( $ ) {
    $('#ssv_main_body').append(
        '<div id="ssv_wrapper" style="max-height: 768px; overflow: hidden;">' +
        '	<div id="ssv_ship"></div>' +
        '	<div id="ssv_loading">' +
        '		<div id="ssv_progressBar">' +
        '			<span id="ssv_progress"></span>' +
        '		</div>' +
        '	</div>' +
        '	<div class="ssv_overlay">' +
        '		<div class="ssv_menu">' +
        '			<img class="ssv_fullWidthImg" src="https://vignette.wikia.nocookie.net/civilization/images/4/4a/Viewer_menu_%28starships%29.png?action=purge" />' +
        '			<div id="ssv_buttonBar">' +
        '				<img id="ssv_buttonLeft" class="ssv_button" src="https://vignette.wikia.nocookie.net/civilization/images/f/f1/Viewer_left_%28starships%29.png" />' +
        '				<img id="ssv_buttonPlay" class="ssv_button" src="https://vignette.wikia.nocookie.net/civilization/images/2/26/Viewer_play_%28starships%29.png" />' +
        '				<img id="ssv_buttonRight" class="ssv_button" src="https://vignette.wikia.nocookie.net/civilization/images/1/17/Viewer_right_%28starships%29.png" />' +
        '			</div>' +
        '			<img id="ssv_buttonInfo" class="ssv_button" src="https://vignette.wikia.nocookie.net/civilization/images/e/e5/Viewer_info_%28starships%29.png" />' +
        '		</div>' +
        '		<div id="ssv_submenu">' +
        '			<div class="ssv_shipMenuTitle">' +
        '				<span class="ssv_shadow">Ship Menu</span>' +
        '			</div>' +
        '			<div class="ssv_clear"></div>' +
        '			<div>' +
        '				<img id="ssv_buttonEngine" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/8/80/Viewer_button_engine_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonShield" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/5/55/Viewer_button_shield_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonArmor" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/2/2a/Viewer_button_armor_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonLaser" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/8/8b/Viewer_button_laser_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonCannon" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/6/6e/Viewer_button_cannon_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonTorpedo" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/a/ac/Viewer_button_torpedo_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonSensor" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/5/5c/Viewer_button_sensor_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonStealth" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/9/9c/Viewer_button_stealth_%28starships%29.png" />' +
        '			</div>' +
        '			<div>' +
        '				<img id="ssv_buttonHangar" class="ssv_subButton" src="https://vignette.wikia.nocookie.net/civilization/images/6/64/Viewer_button_hangar_%28starships%29.png" />' +
        '			</div>' +
        '		</div>' +
        '		<div id="ssv_infoArea">' +
        '			<div id="ssv_infoEngine" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Engines</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/5/57/Viewer_supremacy_engine_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">Upgrading Engines increases speed and maneuverability which helps you reach the most advantageous battle locations.</span>' +
        '			</div>' +
        '			<div id="ssv_infoShield" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Shields</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/f/fe/Viewer_supremacy_shield_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">Shields absorb energy from enemy weapons, reducing damage. Damaged shields will recover after each turn.</span>' +
        '			</div>' +
        '			<div id="ssv_infoArmor" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Armor</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/c/c5/Viewer_supremacy_fuel_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">Armor increases the amount of damage your ship can take. (Increases your HP by 30)</span>' +
        '			</div>' +
        '			<div id="ssv_infoLaser" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Lasers</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/f/fb/Viewer_supremacy_laser_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">Lasers are long range energy weapons. Find a clean line of fire for maximum effect.</span>' +
        '			</div>' +
        '			<div id="ssv_infoCannon" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Cannons</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/b/b2/Viewer_supremacy_cannon_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">High-energy kinetic weapons: cannons have a shorter range than lasers, but do a lot of damage.</span>' +
        '			</div>' +
        '			<div id="ssv_infoTorpedo" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Torpedoes</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/0/01/Viewer_supremacy_front_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">Slow moving but powerful, torpedoes can flush out enemy ships in cover. Torpedoes are replenished at the start of each mission.</span>' +
        '			</div>' +
        '			<div id="ssv_infoSensor" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Sensors</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/d/d5/Viewer_supremacy_sensor_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">You can\'t shoot\'em if you can\'t see\'em. Activating your sensors will reveal any cloaked enemy starships within your sensor range.</span>' +
        '			</div>' +
        '			<div id="ssv_infoStealth" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Stealth</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/c/c8/Viewer_supremacy_stealth_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">They can\'t shoot you if they can\'t see you. When stealth is activated, you are invisible to ships outside of your stealth radius.</span>' +
        '			</div>' +
        '			<div id="ssv_infoHangar" class="ssv_infoPanel">' +
        '				<div class="ssv_shipMenuTitle">' +
        '					<span class="ssv_shadow">Fighters</span>' +
        '				</div>' +
        '				<div class="ssv_clear"></div>' +
        '				<img src="https://vignette.wikia.nocookie.net/civilization/images/6/67/Viewer_supremacy_hangar_%28starships%29.png" />' +
        '				<span class="ssv_shipPartInfo">Small, fast, and dangerous - but extremely fragile. Your starship can launch one fighter group per battle turn.</span>' +
        '			</div>' +
        '		</div>' +
        '		<div class="ssv_badge">' +
        '			<img class="ssv_fullWidthImg" src="https://vignette.wikia.nocookie.net/civilization/images/4/41/Viewer_supremacy_badge_%28starships%29.png?action=purge" />' +
        '			<div class="ssv_shipName ssv_perspective ssv_center">' +
        '				<span class="ssv_shadow">Battleship</span>' +
        '			</div>' +
        '			<div class="ssv_shipAffinity ssv_supremacy ssv_perspective ssv_center">' +
        '				<span class="ssv_shadow">Supremacy</span>' +
        '			</div>' +
        '		</div>' +
        '	</div>' +
        '</div>'
    );

    /* Import other part of this script */
    importArticles({
        type: 'script',
        articles: [
            'MediaWiki:TextFill.js',
            'MediaWiki:SpriteSpin.js',
            'MediaWiki:StarshipsViewer.js'
        ]
	}, {
		type: 'style',
		article: 'MediaWiki:StarshipsViewer.css',
	});
})( this.jQuery );