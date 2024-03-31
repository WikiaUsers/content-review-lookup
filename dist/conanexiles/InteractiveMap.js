;(function(mw) {
	'use strict';
	console.log("loaded");
	
	function myInit() {
		console.log("init");
		
		var myTestElement = document.getElementById('conan-interactive-map')
		if(!myTestElement) return;
		
		var divMap = document.createElement('div')
		divMap.id = 'map'
		divMap.style = 'height:1000px; width:100%; border: 2px solid orange;'
		divMap.innerHTML = '<div id="control-pane-container">' +
			'	<div id="control-pane">' +
			'		<ul style="margin-left: 0px;">' +
			'			<li class="options-group"><label class="options-group-label" onclickx="toggleGroups(\'options-group-poi\')" group="options-group-poi">Points Of Interest</label>' +
			'				<ul id="options-group-poi" class="options-group-content" style="display: block;">' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_caveIcon">Caves</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_dungeonIcon">Dungeon</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_ruins">Ruins</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_vista">Vista</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_generic_stamp_5">Obelisk</label></li>' +
			'				</ul>' +
			'			</li>' +
			'			<li class="options-group"><label class="options-group-label" onclickx="toggleGroups(\'options-group-camps\')" group="options-group-camps">NPC Camps</label>' +
			'				<ul id="options-group-camps" class="options-group-content" style="display: none;">						' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_black_hand">Black Hand</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_darfari">Darfari Cannibals</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_dogs_of_the_desert">Dogs of the Desert</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_cimmerian">Forgotten Clan</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_vanir">Heirs of the North</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_lemurian">Lemurians</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_relic_hunters">Relic Hunters</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_frost_giant">Ymir\'s Children</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_campIcon">Campfire</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="T_Map_Icon_camp_exiles">Exiles</label></li>' +
			'				</ul>' +
			'			</li>' +
			'			<li class="options-group"><label class="options-group-label" onclickx="toggleGroups(\'options-group-thralls\')" group="options-group-thralls">Thralls</label>' +
			'				<ul id="options-group-thralls" class="options-group-content" style="display: none;">' +
			'					<!--<li><label><input class="overlaySelect" type="checkbox" name="Fighter">Fighter & Archer I-III</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="Profession">Profession Thrall I-III</label></li>-->' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="FighterT4">T4 Fighter</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="ArcherT4">T4 Archer</label></li>' +
			'					<li><label style="font-weight: bold;">T4 Profession Thrall</label>' +
			'						<ul id="crafterT4sub">' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Alchemist">Alchemist</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Armorer">Armorer</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Bearer">Bearer</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Blacksmith">Blacksmith</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Carpenter">Carpenter</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Cook">Cook</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Performer">Performer</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Priest">Priest</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Smelter">Smelter</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Sorcerer">Sorcerer</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Tanner">Tanner</label></li>' +
			'							<li><label><input class="overlaySelect" type="checkbox" name="ProfessionT4Taskmaster">Taskmaster</label></li>' +
			'						</ul>' +
			'					</li>' +
			'				</ul>' +
			'			</li>' +
			'			<li class="options-group"><label class="options-group-label" onclickx="toggleGroups(\'options-group-pets\')" group="options-group-pets">Pets</label>' +
			'				<ul id="options-group-pets" class="options-group-content" style="display: none;">' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterBrownBear">Bear</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterWildBoarPiglet">Boar Shoat</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterCrocodile">Crocodile</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterElephant">Elephant</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterFawn">Fawn</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterFoal">Foal</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterDireWolfPup">Frostwolf</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterHyenaPuppy">Hyena</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterJaguarCub">Jaguar</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterLionCub">Lion</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterOstrich">Ostrich</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterPantherCub">Panther</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterRhino">Rhino</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterSabretoothCub">Sabretooth</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterKappa">Shaleback</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterTigerCub">Tiger</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="CritterWolfPup">Wolf</label></li>' +
			'				</ul>' +
			'			</li>' +
			'			<li class="options-group"><label class="options-group-label" onclickx="toggleGroups(\'options-group-misc\')" group="options-group-misc">Misc</label>' +
			'				<ul id="options-group-misc" class="options-group-content" style="display: none;">' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="DialogNPC">Dialog NPC</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="MerchantNPC">Merchant NPC</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="Worldboss">Worldboss</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="Miniboss">Miniboss</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="misc_feat">Recipes/Feats</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="misc_emote">Emotes</label></li>' +
			'					<li><label><input class="overlaySelect" type="checkbox" name="misc_lore">Lore</label></li>' +
			'				</ul>' +
			'			</li>' +
			'			<li id="focusContainer"><label id="focusLabelx"><input id="focus" class="overlaySelect" type="checkbox" name="focus"><span id="focusLabel">filter</span></label></li>' +
			'		</ul>' +
			'' +
			'	</div>' +
			'</div>' +
			'<div id="focus-details-container">' +
			'	<div id="focus-details"></div>' +
			'</div>' +
			'<div id="coordinates-container">' +
			'	<div class="coordinates">' +
			'		<div class="header">Coordinates</div>' +
			'		<div id="coords"></div>' +
			'	</div>' +
			'</div>'
		
		myTestElement.append(divMap)
		
		var spanClear = document.createElement('span')
		spanClear.style = 'clear: both;'
		myTestElement.append(spanClear)
		
		var imgBaseUrl = 'https://gamepedia.cursecdn.com/conanexiles_gamepedia/thumb'
		var mapImgUrl = 'https://gamepedia.cursecdn.com/conanexiles_gamepedia/f/fb/MiniMapFull.jpg?version=0374b20f055202d5f4b995ea9d50f261'
		var dataUrl = 'https://raw.githubusercontent.com/Juijang/wikidata/master/spawns.json'
	
		// focus: ID
		var focusID = getURLParameter("id")
		if(focusID == "") {
			// fallback: old param
			focusID = getURLParameter("focus")
		}
		// focus: name
		var focusName = decodeHtml(getURLParameter("name")).replace( /_/g, ' ' )
		// focus: weightedSpawnID
		var wID = getURLParameter("wid")
		var debug = getURLParameter("debug")
	
		// TODO temp -> remove me
		if(debug) {
			document.getElementById("coordinates-container").style.display = "block"
		}
	
		// define a standard map marker
		var MapIcon = L.Icon.extend({
		 	options: {
				iconSize:     [20, 20],
				iconAnchor:   [10, 10],
				popupAnchor:  [0, -10]
			}
		})
		// capital icon is slightly bigger than the standard icon
		var MapIconCapital = L.Icon.extend({
		 	options: {
				iconSize:     [26, 26],
				iconAnchor:   [13, 13],
				popupAnchor:  [0, -13]
			},
			capital: true
		})
	
		// map center and zoom defaults
		var mapCenter = [15, 63]
		var mapZoom = 0.4
	
		// define all of the different icons for the map
		var iconDefault = new MapIcon({iconUrl: imgBaseUrl + '/d/da/T_Map_Icon_Purge.png/24px-T_Map_Icon_Purge.png'})
	
		var namedIcons = {
			"focus": 						new MapIcon({iconUrl: imgBaseUrl + '/1/10/MapMarker_filter.png/20px-MapMarker_filter.png'}),
			"Fighter": 						new MapIcon({iconUrl: imgBaseUrl + '/7/73/MapMarker_fighter.png/20px-MapMarker_fighter.png?version=18c90209b06edcdbaa73bfca06ae257b'}),
			"Profession": 					new MapIcon({iconUrl: imgBaseUrl + '/a/ad/MapMarker_prof.png/20px-MapMarker_prof.png?version=348ca14b1b58bbbcee6c2cbb82dd4277'}), 
			"ArcherT4": 					new MapIcon({iconUrl: imgBaseUrl + '/2/27/MapMarker_archerT4.png/20px-MapMarker_archerT4.png'}), 
			"FighterT4": 					new MapIcon({iconUrl: imgBaseUrl + '/e/e9/MapMarker_fighterT4.png/20px-MapMarker_fighterT4.png?version=d159499d55c49bd6be30c090b6b314bf'}), 
			"ProfessionT4": 				new MapIcon({iconUrl: imgBaseUrl + '/8/87/MapMarker_proft4.png/20px-MapMarker_proft4.png?version=ce7d3e0850cf7be4cc6e83ee0eb3fbbc'}), 
			"ProfessionT4Alchemist": 		new MapIcon({iconUrl: imgBaseUrl + '/2/2f/MapMarker_alchemistT4.png/20px-MapMarker_alchemistT4.png?version=4fbdf59d0cbfe93b0d16a0329749dce7'}), 
			"ProfessionT4Armorer": 			new MapIcon({iconUrl: imgBaseUrl + '/8/8f/MapMarker_armorerT4.png/20px-MapMarker_armorerT4.png'}), 
			"ProfessionT4Bearer": 			new MapIcon({iconUrl: imgBaseUrl + '/9/9d/MapMarker_bearerT4.png/20px-MapMarker_bearerT4.png'}), 
			"ProfessionT4Blacksmith":		new MapIcon({iconUrl: imgBaseUrl + '/a/a3/MapMarker_blacksmithT4.png/20px-MapMarker_blacksmithT4.png'}), 
			"ProfessionT4Carpenter": 		new MapIcon({iconUrl: imgBaseUrl + '/b/b6/MapMarker_carpenterT4.png/20px-MapMarker_carpenterT4.png'}), 
			"ProfessionT4Cook": 			new MapIcon({iconUrl: imgBaseUrl + '/6/65/MapMarker_cookT4.png/20px-MapMarker_cookT4.png'}), 
			"ProfessionT4Performer":		new MapIcon({iconUrl: imgBaseUrl + '/5/59/MapMarker_performerT4.png/20px-MapMarker_performerT4.png'}), 
			"ProfessionT4Priest": 			new MapIcon({iconUrl: imgBaseUrl + '/3/3f/MapMarker_priestT4.png/20px-MapMarker_priestT4.png?version=f43e22fff326a283789ab946a113ae2e'}), 
			"ProfessionT4Smelter": 			new MapIcon({iconUrl: imgBaseUrl + '/b/b1/MapMarker_smelterT4.png/20px-MapMarker_smelterT4.png?version=f6b02e702ffc57490eb2dc18a6fb3e1c'}), 
			"ProfessionT4Sorcerer": 		new MapIcon({iconUrl: imgBaseUrl + '/8/87/MapMarker_proft4.png/20px-MapMarker_proft4.png?version=ce7d3e0850cf7be4cc6e83ee0eb3fbbc'}), 
			"ProfessionT4Tanner": 			new MapIcon({iconUrl: imgBaseUrl + '/1/12/MapMarker_tannerT4.png/20px-MapMarker_tannerT4.png?version=c3f3dd9f7cdbff04dfc049a664c332c7'}), 
			"ProfessionT4Taskmaster": 		new MapIcon({iconUrl: imgBaseUrl + '/4/45/MapMarker_taskmasterT4.png/20px-MapMarker_taskmasterT4.png'}), 
			"DialogNPC":					new MapIcon({iconUrl: imgBaseUrl + '/3/3a/MapMarker_dialog_npc.png/20px-MapMarker_dialog_npc.png?version=de44993072c8eafb45fe13c8d2ad7582'}), 
			"MerchantNPC":					new MapIcon({iconUrl: imgBaseUrl + '/a/a3/MapMarker_merchant.png/20px-MapMarker_merchant.png'}), 
			"Worldboss":					new MapIcon({iconUrl: imgBaseUrl + '/8/84/MapMarker_worldboss.png/20px-MapMarker_worldboss.png'}), 
			"Miniboss":						new MapIcon({iconUrl: imgBaseUrl + '/c/c0/MapMarker_miniboss.png/20px-MapMarker_miniboss.png'}), 
			"Critter":						new MapIcon({iconUrl: imgBaseUrl + '/0/08/MapMarker_pet.png/20px-MapMarker_pet.png'}), 
			"CritterLionCub":				new MapIcon({iconUrl: imgBaseUrl + '/e/ec/MapMarker_petLion.png/20px-MapMarker_petLion.png'}), 
			"CritterTigerCub":				new MapIcon({iconUrl: imgBaseUrl + '/4/49/MapMarker_petTiger.png/20px-MapMarker_petTiger.png'}), 
			"CritterPantherCub":			new MapIcon({iconUrl: imgBaseUrl + '/3/3d/MapMarker_petPanther.png/20px-MapMarker_petPanther.png'}), 
			"CritterWolfPup":				new MapIcon({iconUrl: imgBaseUrl + '/c/c1/MapMarker_petWolf.png/20px-MapMarker_petWolf.png'}), 
			"CritterCrocodile":				new MapIcon({iconUrl: imgBaseUrl + '/7/72/MapMarker_petCrocodile.png/20px-MapMarker_petCrocodile.png?version=1bc258d2f5aa7ee5cc4b0a720506dd4e'}), 
			"CritterDireWolfPup":			new MapIcon({iconUrl: imgBaseUrl + '/3/36/MapMarker_petFrostwolf.png/20px-MapMarker_petFrostwolf.png?version=ecf2032e1d6efde45ff6512691f361cc'}), 
			"CritterOstrich":				new MapIcon({iconUrl: imgBaseUrl + '/c/c8/MapMarker_petOstrich.png/20px-MapMarker_petOstrich.png?version=955f959f31bec98f891e7a1599b540c1'}), 
			"CritterWildBoarPiglet":		new MapIcon({iconUrl: imgBaseUrl + '/5/56/MapMarker_petBoarShoat.png/20px-MapMarker_petBoarShoat.png'}), 
			"CritterKappa":					new MapIcon({iconUrl: imgBaseUrl + '/c/ca/MapMarker_petKappa.png/20px-MapMarker_petKappa.png'}), 
			"CritterFawn":					new MapIcon({iconUrl: imgBaseUrl + '/5/56/MapMarker_petFawn.png/20px-MapMarker_petFawn.png'}), 
			"CritterFoal":					new MapIcon({iconUrl: imgBaseUrl + '/0/08/MapMarker_pet.png/20px-MapMarker_pet.png'}), 
			//"CritterStripedHyenaPuppy":		new MapIcon({iconUrl: imgBaseUrl + '/c/cf/MapMarker_petStripedHyena.png/20px-MapMarker_petStripedHyena.png'}), 
			//"CritterSpottedHyenaPuppy":		new MapIcon({iconUrl: imgBaseUrl + '/3/34/MapMarker_petSpottedHyena.png/20px-MapMarker_petSpottedHyena.png'}), 
			"CritterSabretoothCub":			new MapIcon({iconUrl: imgBaseUrl + '/a/a8/MapMarker_petSabretooth.png/20px-MapMarker_petSabretooth.png'}), 
			"CritterJaguarCub":				new MapIcon({iconUrl: imgBaseUrl + '/3/33/MapMarker_petJaguar.png/20px-MapMarker_petJaguar.png'}), 
			"CritterRhino":					new MapIcon({iconUrl: imgBaseUrl + '/5/5f/MapMarker_petRhino.png/20px-MapMarker_petRhino.png'}), 
			"CritterElephant":				new MapIcon({iconUrl: imgBaseUrl + '/5/53/MapMarker_petElephant.png/20px-MapMarker_petElephant.png'}), 
			"CritterBrownBear":				new MapIcon({iconUrl: imgBaseUrl + '/6/62/MapMarker_petBrownBear.png/20px-MapMarker_petBrownBear.png'}), 
			"CritterBlackBearCub":			new MapIcon({iconUrl: imgBaseUrl + '/0/08/MapMarker_pet.png/20px-MapMarker_pet.png'}), 
			"CritterHyenaPuppy":			new MapIcon({iconUrl: imgBaseUrl + '/0/08/MapMarker_pet.png/20px-MapMarker_pet.png'}), 
			// point of interest
			"T_Map_Icon_ruins":				new MapIcon({iconUrl: imgBaseUrl + '/7/77/T_Map_Icon_ruins.png/20px-T_Map_Icon_ruins.png?version=b6955048169f64138597c5ea4e5d1582'}), 
			"T_Map_dungeonIcon":			new MapIcon({iconUrl: imgBaseUrl + '/b/b4/T_Map_dungeonIcon.png/20px-T_Map_dungeonIcon.png?version=fa70bd002ec55a146d74a4a2415bc8c2'}), 
			"T_Map_Icon_vista":				new MapIcon({iconUrl: imgBaseUrl + '/a/ac/T_Map_Icon_vista.png/20px-T_Map_Icon_vista.png?version=2fd46d688ce2a8c4377508c8a4e4dba8'}), 
			"T_Map_caveIcon":				new MapIcon({iconUrl: imgBaseUrl + '/4/44/T_Map_caveIcon.png/20px-T_Map_caveIcon.png?version=be60f611057bac1a6e86212d21de9869'}), 
			"T_Map_campIcon":				new MapIcon({iconUrl: imgBaseUrl + '/2/25/T_Map_campIcon.png/20px-T_Map_campIcon.png?version=0dc7836173b646ae1a394d25f5e56668'}), 
			// poi - faction camps
			"T_Map_Icon_camp_black_hand":	new MapIcon({iconUrl: imgBaseUrl + '/a/aa/T_Map_Icon_camp_black_hand.png/20px-T_Map_Icon_camp_black_hand.png?version=5bb7561647bac087456b00016edb5e93'}), 
			"T_Map_Icon_camp_darfari":		new MapIcon({iconUrl: imgBaseUrl + '/1/1f/T_Map_Icon_camp_darfari.png/20px-T_Map_Icon_camp_darfari.png?version=0a9e61234ea2ddcf6b9895a808037d98'}), 
			"T_Map_Icon_camp_vanir":		new MapIcon({iconUrl: imgBaseUrl + '/1/14/T_Map_Icon_camp_vanir.png/20px-T_Map_Icon_camp_vanir.png?version=2d26b3d81ffb6c6ebd0c4cd2efbb761e'}), 
			"T_Map_Icon_camp_frost_giant":	new MapIcon({iconUrl: imgBaseUrl + '/d/d8/T_Map_Icon_camp_frost_giant.png/20px-T_Map_Icon_camp_frost_giant.png?version=7aa197a07ab1d3917370002c90b50e88'}), 
			"T_Map_Icon_camp_cimmerian":	new MapIcon({iconUrl: imgBaseUrl + '/a/a9/T_Map_Icon_camp_cimmerian.png/20px-T_Map_Icon_camp_cimmerian.png?version=73c84f7a0e1a5755be4f18ff38f1663e'}), 
			"T_Map_Icon_camp_relic_hunters":	new MapIcon({iconUrl: imgBaseUrl + '/f/fd/T_Map_Icon_camp_relic_hunters.png/20px-T_Map_Icon_camp_relic_hunters.png?version=01a060eeb54f06a8123492b293e10f8f'}), 
			"T_Map_Icon_camp_lemurian":		new MapIcon({iconUrl: imgBaseUrl + '/3/34/T_Map_Icon_camp_lemurian.png/20px-T_Map_Icon_camp_lemurian.png?version=cad09d4047cfc3bd075cc855a516cdbd'}), 
			"T_Map_Icon_camp_exiles":		new MapIcon({iconUrl: imgBaseUrl + '/7/7f/T_Map_Icon_camp_exiles.png/20px-T_Map_Icon_camp_exiles.png?version=cc1b8b6b476edd9906c1dc77eeb18170'}), 
			"T_Map_Icon_camp_dogs_of_the_desert":	new MapIcon({iconUrl: imgBaseUrl + '/5/5e/T_Map_Icon_camp_dogs_of_the_desert.png/20px-T_Map_Icon_camp_dogs_of_the_desert.png?version=a9b6878125b601849d9d1e360be6341b'}), 
			// poi - capitals
			"T_Map_Icon_capital_black_hand":new MapIconCapital({iconUrl: imgBaseUrl + '/4/45/T_Map_Icon_capital_black_hand.png/26px-T_Map_Icon_capital_black_hand.png?version=28e143a4edb4ccd6e5a658adf78cafdc'}), 
			"T_Map_Icon_capital_relic_hunters":	new MapIconCapital({iconUrl: imgBaseUrl + '/2/28/T_Map_Icon_capital_relic_hunters.png/26px-T_Map_Icon_capital_relic_hunters.png?version=389ab40f7bb2133a52228de4ac86a4e3'}), 
			"T_Map_Icon_capital_dogs_of_the_desert":	new MapIconCapital({iconUrl: imgBaseUrl + '/0/06/T_Map_Icon_capital_dogs_of_the_desert.png/26px-T_Map_Icon_capital_dogs_of_the_desert.png?version=1fed5eb629a2feda55a759bf3b446d2c'}), 
			"T_Map_Icon_capital_vanir":		new MapIconCapital({iconUrl: imgBaseUrl + '/6/6b/T_Map_Icon_capital_vanir.png/26px-T_Map_Icon_capital_vanir.png?version=7c05cfa852763cc818440b34e39069f2'}), 
			"T_Map_Icon_capital_cimmerian":	new MapIconCapital({iconUrl: imgBaseUrl + '/4/4d/T_Map_Icon_capital_cimmerian.png/26px-T_Map_Icon_capital_cimmerian.png?version=15ebf79a82c9c8c6183dc1aab4b6bb10'}), 
			"T_Map_Icon_capital_unnamed_city":new MapIconCapital({iconUrl: imgBaseUrl + '/0/0d/T_Map_Icon_capital_unnamed_city.png/26px-T_Map_Icon_capital_unnamed_city.png?version=d5b451f6f7a6a7236890811f59ba72fd'}),
			"T_Map_Icon_capital_darfari":	new MapIconCapital({iconUrl: imgBaseUrl + '/8/81/T_Map_Icon_capital_darfari.png/26px-T_Map_Icon_capital_darfari.png?version=a7063a88c336267b50bb4a5f77d10828'}),  
			"T_Map_Icon_capital_frost_giant":	new MapIconCapital({iconUrl: imgBaseUrl + '/0/00/T_Map_Icon_capital_frost_giant.png/26px-T_Map_Icon_capital_frost_giant.png?version=718060f62fbceb01432b13323bcd2e8f'}), 
			"T_Map_Icon_capital_lemurian":	new MapIconCapital({iconUrl: imgBaseUrl + '/d/d4/T_Map_Icon_capital_lemurian.png/26px-T_Map_Icon_capital_lemurian.png?version=818967512f3f558f835a11db9f74d55a'}),
			// poi obelisk
			"T_Map_Icon_generic_stamp_5":	new MapIcon({iconUrl: imgBaseUrl + '/a/a3/T_Map_Icon_generic_stamp_5.png/20px-T_Map_Icon_generic_stamp_5.png?version=2c5a8a8e164f40c40228180401ea6049'}),
			// misc data
			"misc_feat":		new MapIcon({iconUrl: imgBaseUrl + '/4/47/T_Map_Icon_stamp_loreObject.png/20px-T_Map_Icon_stamp_loreObject.png?version=7aa38882f221f04273f4e97e03f5d1cc'}),
			"misc_emote":		new MapIcon({iconUrl: imgBaseUrl + '/2/20/T_Map_avatarIcon.png/20px-T_Map_avatarIcon.png?version=5b372fc04ab5324eaf0f3b2c75926aaa'}),
			"misc_lore":		new MapIcon({iconUrl: imgBaseUrl + '/0/0f/T_Map_Icon_generic_stamp_1.png/20px-T_Map_Icon_generic_stamp_1.png?version=d0509c2b58c54d41b4b3254c5774a7d6'}),
			"misc_dungeonarea":	new MapIcon({iconUrl: imgBaseUrl + '/b/b4/T_Map_dungeonIcon.png/20px-T_Map_dungeonIcon.png?version=fa70bd002ec55a146d74a4a2415bc8c2'}), 
		}
	
		// Define overlay layers for the different types of locations
		var namedOverlays = {
			"focus": 					L.layerGroup(),
			// Fighter & Archers
			"Fighter":					L.layerGroup(),	// Fighters and Archers I-III
			"Profession":				L.layerGroup(),	// Crafter Thralls I-III,
			"ArcherT4":					L.layerGroup(),	// T4 Archers
			"FighterT4":				L.layerGroup(),	// T4 Fighters
			// Profession Thralls
			"ProfessionT4":				L.layerGroup(), // T4 Crafter Thralls
			"ProfessionT4Alchemist":	L.layerGroup(), // T4 Atchemists
			"ProfessionT4Armorer":		L.layerGroup(), // T4 Armorer
			"ProfessionT4Bearer":		L.layerGroup(), // T4 Bearer
			"ProfessionT4Blacksmith":	L.layerGroup(), // T4 Blacksmith
			"ProfessionT4Carpenter":	L.layerGroup(), // T4 Carpenter
			"ProfessionT4Cook":			L.layerGroup(), // T4 Cook
			"ProfessionT4Performer":	L.layerGroup(), // T4 Entertainer
			"ProfessionT4Priest":		L.layerGroup(), // T4 Priest
			"ProfessionT4Smelter":		L.layerGroup(), // T4 Smelter
			"ProfessionT4Sorcerer":		L.layerGroup(), // T4 Sorcerer
			"ProfessionT4Tanner":		L.layerGroup(), // T4 Tanner
			"ProfessionT4Taskmaster":	L.layerGroup(), // T4 Taskmaster
			"ProfDefault":				L.layerGroup(),
			// Misc
			"DialogNPC":				L.layerGroup(),
			"MerchantNPC":				L.layerGroup(),
			"Worldboss":				L.layerGroup(),
			"Miniboss":					L.layerGroup(),
			// Pets
			"Critter":					L.layerGroup(),
			"CritterLionCub":			L.layerGroup(),
			"CritterTigerCub":			L.layerGroup(),
			"CritterPantherCub":		L.layerGroup(),
			"CritterWolfPup":			L.layerGroup(),
			"CritterCrocodile":			L.layerGroup(),
			"CritterDireWolfPup":		L.layerGroup(),
			"CritterOstrich":			L.layerGroup(),
			"CritterWildBoarPiglet":	L.layerGroup(),
			"CritterKappa":				L.layerGroup(),
			"CritterFawn":				L.layerGroup(),
			"CritterFoal":				L.layerGroup(),
			//"CritterSpringyFoal":		L.layerGroup(),
			//"CritterSturdyFoal":		L.layerGroup(),
			"CritterSabretoothCub":		L.layerGroup(),
			"CritterJaguarCub":			L.layerGroup(),
			"CritterRhino":				L.layerGroup(),
			//"CritterCalf":				L.layerGroup(),
			"CritterElephant":			L.layerGroup(),
			"CritterBrownBear":			L.layerGroup(),
			"CritterBlackBearCub":		L.layerGroup(),
			"CritterHyenaPuppy":		L.layerGroup(),
			//"CritterStripedHyenaPuppy":	L.layerGroup(),
			//"CritterSpottedHyenaPuppy":	L.layerGroup(),
			// point of interest
			"poifix":					L.layerGroup(),
			"T_Map_caveIcon":			L.layerGroup(),
			"T_Map_dungeonIcon":		L.layerGroup(),
			"T_Map_Icon_ruins":			L.layerGroup(),
			"T_Map_Icon_vista":			L.layerGroup(),
			"T_Map_Icon_camp_black_hand":			L.layerGroup(),
			"T_Map_Icon_camp_darfari":				L.layerGroup(),
			"T_Map_Icon_camp_vanir":				L.layerGroup(),
			"T_Map_Icon_camp_frost_giant":			L.layerGroup(),
			"T_Map_Icon_camp_cimmerian":			L.layerGroup(),
			"T_Map_Icon_camp_relic_hunters":		L.layerGroup(),
			"T_Map_Icon_camp_lemurian":				L.layerGroup(),
			"T_Map_Icon_camp_dogs_of_the_desert":	L.layerGroup(),
			"T_Map_campIcon": 						L.layerGroup(),
			"T_Map_Icon_camp_exiles":				L.layerGroup(),
			// obelisks
			"T_Map_Icon_generic_stamp_5": 			L.layerGroup(),
			// debug
			"debug":						L.layerGroup(),
			// misc data
			"misc_feat":	L.layerGroup(),
			"misc_emote":	L.layerGroup(),
			"misc_lore":	L.layerGroup(),
			// TODO: neue OVerlays
			"CritterGazelle":			L.layerGroup(),
			"CritterWhiteRabbit":		L.layerGroup(),
			"CritterRabbit":			L.layerGroup(),
			"CritterDeer":				L.layerGroup(),
			"CritterAntilope":			L.layerGroup(),
			"CritterSalamanderHatchling":	L.layerGroup(),
			"CritterKomodoHatchling":	L.layerGroup(),
			"CritterHouseCat":			L.layerGroup(),
			"CritterPiglet":			L.layerGroup(),
		}
	
		// Define the map and options for it.
		var map = L.map('map', {
			crs: L.CRS.Simple,
			minZoom: 0,
			maxZoom: 5,
			zoomDelta: 0.2,
			zoomSnap: 0.2,
			layers: [namedOverlays["focus"], namedOverlays["poifix"]], // always add focus overlay
		})
	
		// The map goes from approx x -340, y -445 to x 470, y 370 so define this for the boundaries
		var bounds = [[-370,-342], [445,475]]
	
		// Provide the full URL to the map image that has been uploaded. May fail if the image is updated by someone.
		var image = L.imageOverlay(mapImgUrl, bounds).addTo(map)
		map.fitBounds(bounds)
	
		// Now add the markers to the map.
		// VERY IMPORTANT - the format for adding the coordinates is different to in Conan.
		// L.marker([-<y>, <x>], {icon: <icon>}).addTo(<overlay name>).bindPopup('<location name>');
		// The mapdata entries are in the format [ "Name", X, Y, "Icon"]
		var focusDetails = new Array()
	
		// load external data for the map
		loadJSON(dataUrl, function(response) {
			// Parse JSON string into object
			var data = JSON.parse(response)
	
			var markerCount = 0
			for (var i in data) {
				var purge = data[i]
				//console.log(purge);
	
				var keys = new Array()
	
				// prepare popup content
				var popup = ""
				if(debug) {
					popup += "id: " + purge["id"] + "<br/><br/>" // spawn id (debug only)
				}
	
				var spawns = purge["spawns"]
				for (var j in spawns) {
					var spawn = spawns[j]
	
					var name = spawn["name"]
					if(name.endsWith(" Default") && keys.length > 0) {
						continue;
					}
					var type = spawn["type"]
					var id = spawn["id"]
					var chance = spawn["chance"]
					if(chance != undefined && !chance.endsWith("%")) {
						chance += "%"
					}
					var fm = spawn["fm"]
	
					// focus: id or name
					if((focusID != "" && id == focusID) || (focusName != "" && name == focusName) || (wID != "" && wID == purge["id"])) {
						document.getElementById("focus").checked = true
						document.getElementById("focusLabel").textContent = name
	
						document.getElementById("focusContainer").style.display="list-item"
	
						var overlayFocus = namedOverlays["focus"]
	
						var focusPopup = prepareSpawnRow(name, type, id, chance, fm) //name + (optional: type and id);
						focusPopup += "<br/>" + prepareTeleportPlayerRow(purge["marker"])
	
						L.marker(prepareMarker(purge["marker"]), {icon: namedIcons["focus"]}).addTo(overlayFocus).bindPopup(focusPopup)
	
						// first match
						if(focusDetails["name"] == undefined) {
							//focusDetails = "Details for " + name + "<br/>" + type + " - " + chance + "%<br/><br/>";
							focusDetails["name"] = name
							focusDetails["type"] = type
	
							var spawnDetails = new Array()
							focusDetails["spawnDetails"] = spawnDetails
						}
	
						// add spawn details
						focusDetails["spawnDetails"].push([purge["marker"], chance])
					}
	
					popup += prepareSpawnRow(name, type, id, chance, fm) // name;
					
					//console.log("name: " + name + " (" + id + ")")
	
					if(type != undefined) {
						// DIalog NPC
						if(type == "Dialog NPC") {
							keys.push("DialogNPC")
						}
						// Merchant NPC
						else if(type == "Merchant NPC") {
							keys.push("MerchantNPC")
						}
						// Worldboss
						else if(type == "WorldBoss") {
							keys.push("Worldboss")
						}
						// Miniboss
						else if(type == "MiniBoss") {
							keys.push("Miniboss")
						}
						// Critter
						else if(type == "Critter") {
							keys.push("Critter")
							// prepare pet specific key
							var cleanName = "Critter" + name.replace(/ /g, "")
							
							// CritterSpringyFoal and CritterSturdyFoal => CritterFoal
							if(cleanName == "CritterSpringyFoal" || cleanName == "CritterSturdyFoal" ) {
								cleanName = "CritterFoal"
							} else if(cleanName == "CritterStripedHyenaPuppy" || cleanName == "CritterSpottedHyenaPuppy") {
								cleanName = "CritterHyenaPuppy"
							} else if(cleanName == "CritterCalf") {
								cleanName = "CritterRhino"
							}
							
							keys.push(cleanName)
						}
						// T4
						else if(type == "Archer") { // T4 Archer
							keys.push("ArcherT4")
						} else if(type == "Fighter") { // T4 Fighter
							keys.push("FighterT4")
						} else {
							//key = "ProfessionT4";
							keys.push("ProfessionT4" + type);
						}
					} else {
						// T1 - T3
						if(name.endsWith(" Default")) {
							keys.push("ProfDefault")
						} else {
							if((name.startsWith("Archer ") || name.startsWith("Fighter ")) && type == undefined) { // Fighter and Archer I-III
								keys.push("Fighter")
							} else {
								keys.push("Profession")
							}						
						}
					}
				}
				
				//console.log("  keys: " + keys)
	
				// add coords to popup
				popup += "<br/>" + prepareTeleportPlayerRow(purge["marker"])
	
				// add marker to overlays
				keys.forEach(function(key) {
					var icon = namedIcons[key]
					if(icon == undefined) {
						icon = iconDefault
					}
	
					var overlay = namedOverlays[key]
					if(overlay == undefined) {
						console.log("overlay not found: " + key)
						//overlay = namedOverlays["debug"]
					} else {
						//console.log("  add popup to: " + key + " : " + popup)
						L.marker(prepareMarker(purge["marker"]), {icon: icon}).addTo(overlay).bindPopup(popup)
						markerCount = markerCount + 1
					}
				});
			}
			
			console.log(markerCount + " markers added")
	
			prepareFocusDetails()
		})
	
		// points of interest - datamined
		loadJSON("https://raw.githubusercontent.com/Juijang/wikidata/master/poi1.json", function(response) {
			var pois = JSON.parse(response)
	
			preparePOIData(pois)
		})
	
		// points of interest - additionals
		loadJSON("https://raw.githubusercontent.com/Juijang/wikidata/master/poi_additionals.json", function(response) {
			var pois = JSON.parse(response)
	
			preparePOIData(pois)
		})
	
		// misc data (lore objects, recipes, ...)
		loadJSON("https://raw.githubusercontent.com/Juijang/wikidata/master/misc_data.json", function(response) {
			var miscData = JSON.parse(response)
	
			for (var i in miscData) {
				var misc = miscData[i]
	
				var name = misc["name"]
				var type = misc["type"]
				var marker = misc["marker"]
				var area = misc["area"]
	
				var icon = namedIcons["misc_" + type]
				if(icon == undefined) {
					console.log("icon not found: " + "misc_" + type)
					icon = iconDefault //namedIcons["T_Map_Icon_ruins"]
				}
	
				var overlay = namedOverlays["misc_" + type]
				if(overlay == undefined) {
					overlay = namedOverlays["debug"]
				}
	
				var popup = ""// = name + "<br/>"
				if(type == "emote") {
					var emotePopup = ""
					for (var j in misc["data"]) {
						var emote = misc["data"][j]
						//popup += "<a href=\"/" + emote.replace( / /g, '_' ) + "\">" + emote + "</a><br/>"
						if(emotePopup != "") {
							emotePopup += ", "
						}
						emotePopup += emote
					}
					popup += "<b>Emote(s):</b> " + emotePopup + "<br/>"
				} else if(type == "feat") {
					var featPopup = ""
					for (var j in misc["data"]) {
						var feat = misc["data"][j]
						//popup += "<a href=\"/" + feat.replace( / /g, '_' ) + "\">" + feat + "</a><br/>"
						if(featPopup != "") {
							featPopup += ", "
						}
						featPopup += "<a href=\"/" + feat.replace( / /g, '_' ) + "\">" + feat + "</a>"
					}
					popup += "<b>Feat(s):</b> " + featPopup + "<br/>"
				} else {
					popup += name + "<br/>"
				}
	
				if(marker) {
					popup += "<br/>" + prepareTeleportPlayerRow(marker)
				}
	
				if(marker) {
					L.marker(prepareMarker(marker), {icon: icon}).addTo(overlay).bindPopup(popup)
				} else if(area) {
					var mapOverride = misc["mapOverride"]
					popup += "<br/>" + mapOverride
					
					var bounds = prepareBounds(area); //[[-purge[2], purge[1]], [-purge[4], purge[3]]];
					var rec = L.rectangle(bounds, {color: "#004eff", fillColor: "#58baff", weight: 1, fillOpacity: 0.25, opacity: 1.0}).addTo(overlay).bindPopup(popup)
				}
				//L.marker(marker, {icon: icon}).addTo(overlay).bindPopup("<a href=\"/" + name.replace( / /g, '_' ) + "\">" + name + "</a><br/><br/>TeleportPlayer " + misc["Location"]["x"] + " " + poi["Location"]["y"] + " " + poi["Location"]["z"])
			}
		})
	
		// The centre of the map is NOT 0,0 - define the real centre for initial display
		// setView(<LatLng> center, <Number> zoom, <Zoom/pan options> options?)
		map.setView( mapCenter, mapZoom)
	
		// add images to the checkboxes
		Array.prototype.forEach.call(document.getElementsByClassName("overlaySelect"), 
			function(element) { 
				// add image
				if(namedIcons[element.name] != undefined) {
					var iconUrl = namedIcons[element.name].options.iconUrl
					var li = element.parentNode.parentNode
					
					li.innerHTML = '<img src="' + iconUrl + '" style="width: 16px; height: 16px; vertical-align: baseline;">' + li.innerHTML
				}
			}
		);
	
		// add event onchange to the checkboxes
		Array.prototype.forEach.call(document.getElementsByClassName("overlaySelect"), 
			function(element) { 
				//console.log(element.name)
				element.onchange = toggleOverlay
			}
		);
		
		// add event onclick to the marker groups
		Array.prototype.forEach.call(document.getElementsByClassName("options-group-label"),
			function(element) {
				//console.log("register onclick for " + element + " with group " + element.getAttribute("group"))
				element.onclick = function(event) {
					toggleGroups(element.getAttribute("group"))
				}
			}
		);
	
		// add debug layer if in debug mode
		if(debug) {
			map.addLayer(namedOverlays["debug"])
		}
	
		// coordinates: add mousemove event to the map
		map.on("mousemove", function(e) {
			var x = Math.round((e.latlng.lng*1000))
			var y = Math.round((e.latlng.lat*-1000))
	
			var content = x + " " + y
	
			var xValue = 65+((x+306868)/46350)
			var xChar
			if(xValue<65 || xValue>81) {
				xChar = "-"
			} else {
				xChar = String.fromCharCode(xValue)
			}
	
			var yValue = (17-Math.floor(((y+407202)/46350)))
			var yChar
			if(yValue<1 || yValue>17) {
				yChar = "-"
			} else {
				yChar = yValue
			}
	
			content += " (" + xChar + "/" + yChar + ")"
	
			document.getElementById("coords").textContent = content
		})
		
		function toggleOverlay(event) {
			var name = event.target.name
			var checked = event.target.checked
			var overlay = namedOverlays[name]
			console.log("event toggleOverlay: name = " + name + ", checked = " + checked)
			console.log(overlay)
			if(overlay == undefined) {
				console.log("no overlay for name '" + name + "' found")
				return;
			}
	
			if(checked) {	
				var result = map.addLayer(overlay)
				console.log(result)
			} else {
				map.removeLayer(overlay)
			}
	
			//console.log(event)
		}
	
		function prepareBounds(bounds) {
			return [[-bounds[1]/1000, bounds[0]/1000], [-bounds[3]/1000, bounds[2]/1000]]
		}
	
		function prepareMarker(marker) {
			return [-marker[1]/1000, marker[0]/1000]
		}
	
		// helper function to load github hosted data
		function loadJSON(url, callback) {   
			var xobj = new XMLHttpRequest()
			xobj.overrideMimeType("application/json");
			xobj.open('GET', url, true)
			xobj.onreadystatechange = function () {
				if (xobj.readyState == 4 && xobj.status == 200) {
					callback(xobj.responseText)
				}
			};
			xobj.send(null);  
		}
	
		function getURLParameter(name) {
			var value = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ""])[1])
			return (value !== 'null') ? value : false
		}
	
		function decodeHtml(html) {
			var txt = document.createElement("textarea");
			txt.innerHTML = html;
			return txt.value;
		}
	
		function prepareTeleportPlayerRow(marker) {
			return "TeleportPlayer " + marker[0] + " " + marker[1] + " " + marker[2]
		}
	
		function prepareSpawnRow(name, type, id, chance, fm) {
			var row = ""
			var debugFlag = ""
			if(id != undefined) {
				row += "<a href=\"/" + name.replace( / /g, '_' ) + "\">" + name + "</a>";
			} else {
				row += name
			}
			if(type != undefined) {
				row += " (" + type
				if(chance != undefined) {
					row += " - " + chance
				}
				if(debug) {
					row += "; id: " + id
					row += "; fm: " + fm
					debugFlag = "&debug=true"
				}
				row += ") <a href='/Interactive_Map?id=" + id + debugFlag + "'><img src='" + namedIcons["focus"].options.iconUrl + "' style='width:12px;height:12px;'></a>"
			}
			row += "<br/>"
	
			return row
		}
	
		function toggleGroups(id) {
			var groups = document.getElementsByClassName("options-group-content");
			for (var j in groups) {
				if(groups[j].style != undefined) {
					if(groups[j].id == id) {
						if(groups[j].style && groups[j].style.display == "none") {
							groups[j].style.display = "block"
						} else {
							groups[j].style.display = "none"
						}
					} else {
						groups[j].style.display = "none"
					}
				}
			}
		}
	
		function preparePOIData(pois) {
			for (var i in pois) {
				var poi = pois[i]
	
				var name = poi["Name"]
				var marker = [-(poi["Location"]["y"]/1000), (poi["Location"]["x"]/1000)]
	
				var icon = namedIcons[poi["Icon"]]
				if(icon == undefined) {
					console.log("icon not found: " + poi["Icon"])
					icon = iconDefault //namedIcons["T_Map_Icon_ruins"]
				}
	
				var overlay
				if(icon.capital) {
					overlay = namedOverlays["poifix"]
				} else {
					overlay = namedOverlays[poi["Icon"]]
					if(overlay == undefined) {
						overlay = namedOverlays["debug"]
					}
				}
	
				L.marker(marker, {icon: icon}).addTo(overlay).bindPopup("<a href=\"/" + name.replace( / /g, '_' ) + "\">" + name + "</a><br/><br/>TeleportPlayer " + poi["Location"]["x"] + " " + poi["Location"]["y"] + " " + poi["Location"]["z"])
			}
		}
	
		function prepareFocusDetails() {
			if(focusDetails["name"] != undefined) {
				// prepare content
				var content = "Details for <b>" + focusDetails["name"] + "</b><br/>"
				content += "Type: " + focusDetails["type"] + "<br/>"
	
				var numberOfSpawns = focusDetails["spawnDetails"].length
				var highestChance
				var allWithSameChance = true
				for(var j in focusDetails["spawnDetails"]) {
					var chance = focusDetails["spawnDetails"][j][1]
					if(chance == "<1%") {
						chance = "0"
					}
	
					if(highestChance == undefined) {
						highestChance = focusDetails["spawnDetails"][j]
					} else if(parseInt(chance) > parseInt(highestChance[1])) {
						highestChance = focusDetails["spawnDetails"][j]
						allWithSameChance = false
					} else if(parseInt(chance)<parseInt(highestChance[1])) {
						allWithSameChance = false
					}
				}
	
				content += "Number of possible spawns: " + numberOfSpawns + ""
				//content += "Average spawn chance: x%<br/>"
				if(numberOfSpawns > 1) {
					if(!allWithSameChance) {
						content += "<br/><br/>Best spawn: TeleportPlayer x y z (with " + highestChance[1] + ")"
					} else {
						content += "<br/><br/>All spawns equal: " + highestChance[1] + ""
					}
				}
	
				document.getElementById("focus-details").innerHTML = content
				if(debug) {
					document.getElementById("focus-details-container").style.display = "block"
				}
			}
		}
	}

	// Execute script after page is loaded
	mw.hook('wikipage.content').add(myInit);
})(window.mediaWiki);