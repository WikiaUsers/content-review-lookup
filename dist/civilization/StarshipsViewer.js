(function(mw) {
	'use strict';
	var imageUrl = "https://static.wikia.nocookie.net/civilization/images/";
	var buttons = [
		{
			id: 'Engine',
			title: 'Engines',
			button: '8/80/Viewer_button_engine_%28starships%29.png', /* [[File:Viewer button engine (starships).png]] */
			image: '5/57/Viewer_supremacy_engine_%28starships%29.png', /* [[File:Viewer supremacy engine (starships).png]] */
			info: 'Upgrading Engines increases speed and maneuverability which helps you reach the most advantageous battle locations.'
		},
		{
			id: 'Shield',
			title: 'Shields',
			button: '5/55/Viewer_button_shield_%28starships%29.png', /* [[File:Viewer button shield (starships).png]] */
			image: 'f/fe/Viewer_supremacy_shield_%28starships%29.png', /* [[File:Viewer supremacy shield (starships).png]] */
			info: 'Shields absorb energy from enemy weapons, reducing damage. Damaged shields will recover after each turn.'
		},
		{
			id: 'Armor',
			title: 'Armor',
			button: '2/2a/Viewer_button_armor_%28starships%29.png', /* [[File:Viewer button armor (starships).png]] */
			image: 'c/c5/Viewer_supremacy_fuel_%28starships%29.png', /* [[File:Viewer supremacy fuel (starships).png]] */
			info: 'Armor increases the amount of damage your ship can take. (Increases your HP by 30)'
		},
		{
			id: 'Laser',
			title: 'Lasers',
			button: '8/8b/Viewer_button_laser_%28starships%29.png', /* [[File:Viewer button laser (starships).png]] */
			image: 'f/fb/Viewer_supremacy_laser_%28starships%29.png', /* [[File:Viewer supremacy laser (starships).png]] */
			info: 'Lasers are long range energy weapons. Find a clean line of fire for maximum effect.'
		},
		{
			id: 'Cannon',
			title: 'Cannons',
			button: '6/6e/Viewer_button_cannon_%28starships%29.png', /* [[File:Viewer button cannon (starships).png]] */
			image: 'b/b2/Viewer_supremacy_cannon_%28starships%29.png', /* [[File:Viewer supremacy cannon (starships).png]] */
			info: 'High-energy kinetic weapons: cannons have a shorter range than lasers, but do a lot of damage.'
		},
		{
			id: 'Torpedo',
			title: 'Torpedoes',
			button: 'a/ac/Viewer_button_torpedo_%28starships%29.png', /* [[File:Viewer button torpedo (starships).png]] */
			image: '0/01/Viewer_supremacy_front_%28starships%29.png', /* [[File:Viewer supremacy front (starships).png]] */
			info: 'Slow moving but powerful, torpedoes can flush out enemy ships in cover. Torpedoes are replenished at the start of each mission.'
		},
		{
			id: 'Sensor',
			title: 'Sensors',
			button: '5/5c/Viewer_button_sensor_%28starships%29.png', /* [[File:Viewer button sensor (starships).png]] */
			image: 'd/d5/Viewer_supremacy_sensor_%28starships%29.png', /* [[File:Viewer supremacy sensor (starships).png]] */
			info: 'You can\'t shoot\'em if you can\'t see\'em. Activating your sensors will reveal any cloaked enemy starships within your sensor range.'
		},
		{
			id: 'Stealth',
			title: 'Stealth',
			button: '9/9c/Viewer_button_stealth_%28starships%29.png', /* [[File:Viewer button stealth (starships).png]] */
			image: 'c/c8/Viewer_supremacy_stealth_%28starships%29.png', /* [[File:Viewer supremacy stealth (starships).png]] */
			info: 'They can\'t shoot you if they can\'t see you. When stealth is activated, you are invisible to ships outside of your stealth radius.'
		},
		{
			id: 'Hangar',
			title: 'Fighters',
			button: '6/64/Viewer_button_hangar_%28starships%29.png', /* [[File:Viewer button hangar (starships).png]] */
			image: '6/67/Viewer_supremacy_hangar_%28starships%29.png', /* [[File:Viewer supremacy hangar (starships).png]] */
			info: 'Small, fast, and dangerous - but extremely fragile. Your starship can launch one fighter group per battle turn.'
		}
	];
	var apiSource = {
		Supremacy: [
			"c/c7/Viewer_supremacy00_%28starships%29.jpg",
			"2/29/Viewer_supremacy01_%28starships%29.jpg",
			"4/46/Viewer_supremacy02_%28starships%29.jpg",
			"f/f7/Viewer_supremacy03_%28starships%29.jpg",
			"6/63/Viewer_supremacy04_%28starships%29.jpg",
			"4/44/Viewer_supremacy05_%28starships%29.jpg",
			"1/17/Viewer_supremacy06_%28starships%29.jpg",
			"6/61/Viewer_supremacy07_%28starships%29.jpg",
			"1/15/Viewer_supremacy08_%28starships%29.jpg",
			"f/fc/Viewer_supremacy09_%28starships%29.jpg",
			"8/86/Viewer_supremacy10_%28starships%29.jpg",
			"a/ac/Viewer_supremacy11_%28starships%29.jpg",
			"b/b5/Viewer_supremacy12_%28starships%29.jpg",
			"d/d6/Viewer_supremacy13_%28starships%29.jpg",
			"4/48/Viewer_supremacy14_%28starships%29.jpg",
			"8/8b/Viewer_supremacy15_%28starships%29.jpg",
			"5/57/Viewer_supremacy16_%28starships%29.jpg",
			"a/a8/Viewer_supremacy17_%28starships%29.jpg",
			"0/0d/Viewer_supremacy18_%28starships%29.jpg",
			"7/7e/Viewer_supremacy19_%28starships%29.jpg",
			"a/ac/Viewer_supremacy20_%28starships%29.jpg",
			"6/6f/Viewer_supremacy21_%28starships%29.jpg",
			"5/5f/Viewer_supremacy22_%28starships%29.jpg",
			"9/90/Viewer_supremacy23_%28starships%29.jpg",
			"a/a1/Viewer_supremacy24_%28starships%29.jpg",
			"6/61/Viewer_supremacy25_%28starships%29.jpg",
			"0/0f/Viewer_supremacy26_%28starships%29.jpg",
			"d/d6/Viewer_supremacy27_%28starships%29.jpg",
			"4/43/Viewer_supremacy28_%28starships%29.jpg",
			"9/93/Viewer_supremacy29_%28starships%29.jpg",
			"8/8b/Viewer_supremacy30_%28starships%29.jpg",
			"1/10/Viewer_supremacy31_%28starships%29.jpg",
			"6/6b/Viewer_supremacy32_%28starships%29.jpg",
			"3/37/Viewer_supremacy33_%28starships%29.jpg",
			"0/09/Viewer_supremacy34_%28starships%29.jpg",
			"8/8f/Viewer_supremacy35_%28starships%29.jpg"
		],

		Purity: [
			"1/12/Viewer_purity00_%28starships%29.jpg",
			"f/f8/Viewer_purity01_%28starships%29.jpg",
			"1/18/Viewer_purity02_%28starships%29.jpg",
			"d/d4/Viewer_purity03_%28starships%29.jpg",
			"8/8f/Viewer_purity04_%28starships%29.jpg",
			"2/28/Viewer_purity05_%28starships%29.jpg",
			"c/c9/Viewer_purity06_%28starships%29.jpg",
			"6/67/Viewer_purity07_%28starships%29.jpg",
			"3/33/Viewer_purity08_%28starships%29.jpg",
			"b/be/Viewer_purity09_%28starships%29.jpg",
			"7/70/Viewer_purity10_%28starships%29.jpg",
			"8/8d/Viewer_purity11_%28starships%29.jpg",
			"0/0d/Viewer_purity12_%28starships%29.jpg",
			"0/0a/Viewer_purity13_%28starships%29.jpg",
			"2/2f/Viewer_purity14_%28starships%29.jpg",
			"6/60/Viewer_purity15_%28starships%29.jpg",
			"f/f7/Viewer_purity16_%28starships%29.jpg",
			"1/1c/Viewer_purity17_%28starships%29.jpg",
			"3/34/Viewer_purity18_%28starships%29.jpg",
			"b/bc/Viewer_purity19_%28starships%29.jpg",
			"8/88/Viewer_purity20_%28starships%29.jpg",
			"9/9f/Viewer_purity21_%28starships%29.jpg",
			"e/e3/Viewer_purity22_%28starships%29.jpg",
			"6/62/Viewer_purity23_%28starships%29.jpg",
			"f/fe/Viewer_purity24_%28starships%29.jpg",
			"5/51/Viewer_purity25_%28starships%29.jpg",
			"f/f5/Viewer_purity26_%28starships%29.jpg",
			"b/ba/Viewer_purity27_%28starships%29.jpg",
			"2/2a/Viewer_purity28_%28starships%29.jpg",
			"0/08/Viewer_purity29_%28starships%29.jpg",
			"f/f9/Viewer_purity30_%28starships%29.jpg",
			"4/46/Viewer_purity31_%28starships%29.jpg",
			"d/d0/Viewer_purity32_%28starships%29.jpg",
			"b/b1/Viewer_purity33_%28starships%29.jpg",
			"5/53/Viewer_purity34_%28starships%29.jpg",
			"6/6d/Viewer_purity35_%28starships%29.jpg"
		],

		Harmony: [
			"b/b7/Viewer_harmony00_%28starships%29.jpg",
			"b/b6/Viewer_harmony01_%28starships%29.jpg",
			"6/66/Viewer_harmony02_%28starships%29.jpg",
			"9/92/Viewer_harmony03_%28starships%29.jpg",
			"0/0f/Viewer_harmony04_%28starships%29.jpg",
			"e/e0/Viewer_harmony05_%28starships%29.jpg",
			"0/0b/Viewer_harmony06_%28starships%29.jpg",
			"5/58/Viewer_harmony07_%28starships%29.jpg",
			"9/99/Viewer_harmony08_%28starships%29.jpg",
			"8/8e/Viewer_harmony09_%28starships%29.jpg",
			"3/33/Viewer_harmony10_%28starships%29.jpg",
			"3/30/Viewer_harmony11_%28starships%29.jpg",
			"f/fc/Viewer_harmony12_%28starships%29.jpg",
			"f/f1/Viewer_harmony13_%28starships%29.jpg",
			"3/33/Viewer_harmony14_%28starships%29.jpg",
			"e/ee/Viewer_harmony15_%28starships%29.jpg",
			"5/5e/Viewer_harmony16_%28starships%29.jpg",
			"e/ed/Viewer_harmony17_%28starships%29.jpg",
			"b/bd/Viewer_harmony18_%28starships%29.jpg",
			"c/c2/Viewer_harmony19_%28starships%29.jpg",
			"3/35/Viewer_harmony20_%28starships%29.jpg",
			"f/ff/Viewer_harmony21_%28starships%29.jpg",
			"8/8e/Viewer_harmony22_%28starships%29.jpg",
			"b/bb/Viewer_harmony23_%28starships%29.jpg",
			"a/aa/Viewer_harmony24_%28starships%29.jpg",
			"5/52/Viewer_harmony25_%28starships%29.jpg",
			"0/05/Viewer_harmony26_%28starships%29.jpg",
			"3/31/Viewer_harmony27_%28starships%29.jpg",
			"3/3a/Viewer_harmony28_%28starships%29.jpg",
			"c/c2/Viewer_harmony29_%28starships%29.jpg",
			"2/2d/Viewer_harmony30_%28starships%29.jpg",
			"1/19/Viewer_harmony31_%28starships%29.jpg",
			"a/aa/Viewer_harmony32_%28starships%29.jpg",
			"0/0b/Viewer_harmony33_%28starships%29.jpg",
			"5/5c/Viewer_harmony34_%28starships%29.jpg",
			"a/ac/Viewer_harmony35_%28starships%29.jpg"
		]
	};
	var loadingFrameCount = 0;
	var totalFrameCount = 35;
    var sources = apiSource[ mw.config.get('wgPageName').replace('_(Starships)', '') ];
    for (var i=0; i<sources.length; i++) {
    	sources[i] = imageUrl + sources[i];
    }

	function showInfoPanel(element) {
		var name = typeof(element) === 'string' ? element : element.target.id.replace('ssv_button', '');
		var show = true;

		if ($("#ssv_info" + name).is(":visible") || name === "hide") {
			show = false;
		}

		$("[id^='ssv_info']:not(#ssv_infoArea)").hide();
		$("[id^='ssv_button']").removeClass("ssv_highlight");

		if (show) {
			$("#ssv_info" + name).show();
			$("#ssv_button" + name).addClass("ssv_highlight");
		}
	}

	function addButtons() {
		var output = '';
		for (var i=0; i<buttons.length; i++) {
			var ele = buttons[i];
			output += '<div>' +
			'<img id="ssv_button' + ele.id + '" class="ssv_subButton" src="' + imageUrl + ele.button + '" />' +
		'</div>';
		}
		return output;
	}
	function addInfo() {
		var output = '';
		for (var i=0; i<buttons.length; i++) {
			var ele = buttons[i];
			output += '<div id="ssv_info' + ele.id + '" class="ssv_infoPanel">' +
				'<div class="ssv_shipMenuTitle">' +
					'<span class="ssv_shadow">' + ele.title + '</span>' +
				'</div>' +
				'<img src="' + imageUrl + ele.image + '" />' +
				'<span class="ssv_shipPartInfo">' + ele.info + '</span>' +
			'</div>';
		}
		return output;
	}

	function init($content) {
		var main = $content.find('#ssv_main_body')[0];
		if (!main) return;
		/* [[File:Viewer menu (starships).png]] */
		/* [[File:Viewer left (starships).png]] */
		/* [[File:Viewer play (starships).png]] */
		/* [[File:Viewer right (starships).png]] */
		/* [[File:Viewer info (starships).png]] */
		/* [[File:Viewer supremacy badge (starships).png]] */
		main.innerHTML =
		'<div id="ssv_wrapper">' +
			'<div id="ssv_ship"></div>' +
			'<div id="ssv_loading">' +
				'<div id="ssv_progressBar">' +
					'<span id="ssv_progress"></span>' +
				'</div>' +
			'</div>' +
			'<div class="ssv_overlay">' +
				'<div class="ssv_menu">' +
					'<img class="ssv_fullWidthImg" src="' + imageUrl + '4/4a/Viewer_menu_%28starships%29.png" />' +
					'<div id="ssv_buttonBar">' +
						'<img id="ssv_buttonLeft" class="ssv_button" src="' + imageUrl + 'f/f1/Viewer_left_%28starships%29.png" />' +
						'<img id="ssv_buttonPlay" class="ssv_button" src="' + imageUrl + '2/26/Viewer_play_%28starships%29.png" />' +
						'<img id="ssv_buttonRight" class="ssv_button" src="' + imageUrl + '1/17/Viewer_right_%28starships%29.png" />' +
					'</div>' +
					'<img id="ssv_buttonInfo" class="ssv_button" src="' + imageUrl + 'e/e5/Viewer_info_%28starships%29.png" />' +
				'</div>' +
				'<div id="ssv_submenu">' +
					'<div class="ssv_shipMenuTitle">' +
						'<span class="ssv_shadow">Ship Menu</span>' +
					'</div>' +
					addButtons() +
				'</div>' +
				'<div id="ssv_infoArea">' +
					addInfo() +
				'</div>' +
				'<div class="ssv_badge">' +
					'<img class="ssv_fullWidthImg" src="' + imageUrl + '4/41/Viewer_supremacy_badge_%28starships%29.png" />' +
					'<div class="ssv_shipName ssv_perspective ssv_center">' +
						'<span class="ssv_shadow">Battleship</span>' +
					'</div>' +
					'<div class="ssv_shipAffinity ssv_supremacy ssv_perspective ssv_center">' +
						'<span class="ssv_shadow">Supremacy</span>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';

	    var wrapWidth = $content.find("#ssv_wrapper").width();
        var wrapHeight = Math.round(wrapWidth * 0.75);
        var ship = $content.find("#ssv_ship");
		var api = ship.spritespin({
	        source		: 	sources,
			frameTime	: 	60,
			animate		:	false,
			onProgress	:	function() {
				loadingFrameCount += 1;
				var percent = loadingFrameCount / totalFrameCount;
				percent  = (percent > 1) ? 1 : percent;
				var width = Math.round($content.find("#ssv_progressBar").width() * percent);
								
				$content.find("#ssv_progress").css('width', width + "px");
			},
			onLoad		:	function() {
				$content.find("#ssv_loading").delay( 300 ).fadeOut( 1200 );
			},
			width   	: 	wrapWidth,
			height  	: 	wrapHeight
		}).spritespin("api");					
	
		api.stopAnimation();
		$content.find('#ssv_submenu > div').click(showInfoPanel);
		$content.find("#ssv_buttonInfo").click(function() {
			if ($content.find("#ssv_submenu").is(":visible")) {
				showInfoPanel("hide");
			}
			$content.find("#ssv_buttonInfo").toggleClass("ssv_highlight");
			$content.find("#ssv_submenu").toggle();
		});
		$content.find("#ssv_buttonLeft").click(function() {
			api.data.reverse = false;
			$content.find("#ssv_buttonPlay").attr("src", imageUrl + "1/16/Viewer_pause_%28starships%29.png");
			api.startAnimation();
			$content.find("#ssv_buttonRight").removeClass("ssv_highlight");
			$content.find("#ssv_buttonLeft").addClass("ssv_highlight");
		});
		$content.find("#ssv_buttonRight").click(function() {
			api.data.reverse = true;
			$content.find("#ssv_buttonPlay").attr("src", imageUrl + "1/16/Viewer_pause_%28starships%29.png");
			api.startAnimation();
			$content.find("#ssv_buttonRight").addClass("ssv_highlight");
			$content.find("#ssv_buttonLeft").removeClass("ssv_highlight");
		});
		$content.find("#ssv_buttonPlay").click(function() {
			if(api.isPlaying()) {
				$content.find("#ssv_buttonPlay").attr("src", imageUrl + "2/26/Viewer_play_%28starships%29.png");
				
				$content.find("#ssv_buttonRight").removeClass("ssv_highlight");
				$content.find("#ssv_buttonLeft").removeClass("ssv_highlight");
			}
			else {
				$content.find("#ssv_buttonPlay").attr("src", imageUrl + "1/16/Viewer_pause_%28starships%29.png");
	
				if (api.data.reverse) {
					$content.find("#ssv_buttonRight").addClass("ssv_highlight");
				} else {
					$content.find("#ssv_buttonLeft").addClass("ssv_highlight");
				}
			}
			api.toggleAnimation();
		});
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);