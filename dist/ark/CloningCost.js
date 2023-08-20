/* [[Template:CloningCost]] */
(function(mw) {
	'use strict';

	// Constants from the CloningChamber blueprint are retrieved by Purlovia
	// at extraction time. The values are ready to use as-is.
	// {DinoName: [BaseCost, LevelCost, BaseTime, LevelTime], ...}
	var creatures = { // Version: 329.3.6806323
		"Achatina": [ 1725, 55, 12075, 385 ],
		"Allosaurus": [ 1325, 55, 9275, 385 ],
		"Anglerfish": [ 425, 55, 2975, 385 ],
		"Ankylosaurus": [ 2325, 55, 16275, 385 ],
		"Araneo": [ 100, 55, 700, 385 ],
		"Archaeopteryx": [ 325, 38.5, 2275, 269.5 ],
		"Argentavis": [ 1700, 55, 11900, 385 ],
		"Arthropluera": [ 500, 55, 3500, 385 ],
		"Astrocetus": [ 2475, 55, 17325, 385 ],
		"Astrodelphis": [ 1675, 55, 11725, 385 ],
		"Baryonyx": [ 1300, 55, 9100, 385 ],
		"Basilisk": [ 1950, 55, 13650, 385 ],
		"Basilosaurus": [ 1875, 55, 13125, 385 ],
		"Beelzebufo": [ 1425, 55, 9975, 385 ],
		"Bloodstalker": [ 875, 55, 6125, 385 ],
		"Brontosaurus": [ 1975, 55, 13825, 385 ],
		"Bulbdog": [ 125, 55, 875, 385 ],
		"Carbonemys": [ 1600, 55, 11200, 385 ],
		"Carnotaurus": [ 650, 55, 4550, 385 ],
		"Castoroides": [ 2100, 55, 14700, 385 ],
		"Chalicotherium": [ 675, 55, 4725, 385 ],
		"Compy": [ 175, 55, 1225, 385 ],
		"Crystal Wyvern": [ 2125, 55, 14875, 385 ],
		"Daeodon": [ 1675, 55, 11725, 385 ],
		"Deinonychus": [ 575, 55, 4025, 385 ],
		"Dilophosaur": [ 300, 27.5, 2100, 192.5 ],
		"Dimetrodon": [ 200, 27.5, 1400, 192.5 ],
		"Dimorphodon": [ 700, 55, 4900, 385 ],
		"Diplocaulus": [ 1000, 55, 7000, 385 ],
		"Diplodocus": [ 575, 55, 4025, 385 ],
		"Dire Bear": [ 1650, 55, 11550, 385 ],
		"Direwolf": [ 1450, 55, 10150, 385 ],
		"Dodo": [ 25, 27.5, 175, 192.5 ],
		"Doedicurus": [ 2075, 55, 14525, 385 ],
		"Dung Beetle": [ 2250, 27.5, 15750, 192.5 ],
		"Dunkleosteus": [ 1075, 55, 7525, 385 ],
		"Electrophorus": [ 325, 55, 2275, 385 ],
		"Equus": [ 1100, 55, 7700, 385 ],
		"Featherlight": [ 125, 55, 875, 385 ],
		"Ferox": [ 1275, 55, 8925, 385 ],
		"Gacha": [ 1550, 55, 10850, 385 ],
		"Gallimimus": [ 875, 55, 6125, 385 ],
		"Gasbags": [ 1800, 55, 12600, 385 ],
		"Giganotosaurus": [ 2475, 55, 17325, 385 ],
		"Gigantopithecus": [ 875, 55, 6125, 385 ],
		"Griffin": [ 1700, 55, 11900, 385 ],
		"Hesperornis": [ 625, 55, 4375, 385 ],
		"Hyaenodon ": [ 87.5, 55, 612.5, 385 ],
		"Ichthyornis": [ 750, 55, 5250, 385 ],
		"Ichthyosaurus": [ 1650, 55, 11550, 385 ],
		"Iguanodon": [ 800, 55, 5600, 385 ],
		"Jerboa": [ 1275, 55, 8925, 385 ],
		"Kairuku": [ 1025, 27.5, 7175, 192.5 ],
		"Kaprosuchus": [ 1000, 55, 7000, 385 ],
		"Karkinos": [ 1250, 55, 8750, 385 ],
		"Kentrosaurus": [ 925, 55, 6475, 385 ],
		"Lymantria": [ 375, 55, 2625, 385 ],
		"Lystrosaurus": [ 825, 27.5, 5775, 192.5 ],
		"Maewing": [ 775, 55, 5425, 385 ],
		"Magmasaur": [ 2050, 55, 14350, 385 ],
		"Mammoth": [ 1550, 55, 10850, 385 ],
		"Managarmr": [ 2350, 55, 16450, 385 ],
		"Manta": [ 525, 55, 3675, 385 ],
		"Mantis": [ 1975, 55, 13825, 385 ],
		"Megachelon": [ 1850, 55, 12950, 385 ],
		"Megalania": [ 2125, 55, 14875, 385 ],
		"Megaloceros": [ 900, 55, 6300, 385 ],
		"Megalodon": [ 925, 55, 6475, 385 ],
		"Megalosaurus": [ 850, 55, 5950, 385 ],
		"Megatherium": [ 1675, 55, 11725, 385 ],
		"Mesopithecus": [ 575, 27.5, 4025, 192.5 ],
		"Microraptor": [ 850, 55, 5950, 385 ],
		"Morellatops": [ 875, 55, 6125, 385 ],
		"Mosasaurus": [ 2200, 55, 15400, 385 ],
		"Moschops": [ 1250, 55, 8750, 385 ],
		"Onyc": [ 50, 55, 350, 385 ],
		"Otter": [ 2100, 55, 14700, 385 ],
		"Oviraptor": [ 1500, 55, 10500, 385 ],
		"Ovis": [ 1975, 55, 13825, 385 ],
		"Pachy": [ 300, 44, 2100, 308 ],
		"Paraceratherium": [ 1650, 55, 11550, 385 ],
		"Parasaur": [ 350, 38.5, 2450, 269.5 ],
		"Pegomastax": [ 700, 55, 4900, 385 ],
		"Pelagornis": [ 1075, 55, 7525, 385 ],
		"Phiomia": [ 1175, 44, 8225, 308 ],
		"Phoenix": [ 2050, 220, 14350, 1540 ],
		"Plesiosaur": [ 1050, 55, 7350, 385 ],
		"Procoptodon": [ 775, 55, 5425, 385 ],
		"Pteranodon": [ 1975, 55, 13825, 385 ],
		"Pulmonoscorpius": [ 800, 55, 5600, 385 ],
		"Purlovia": [ 800, 55, 5600, 385 ],
		"Quetzal": [ 2450, 550, 17150, 3850 ],
		"Raptor": [ 575, 55, 4025, 385 ],
		"Ravager": [ 625, 55, 4375, 385 ],
		"Reaper King": [ 2325, 55, 16275, 385 ],
		"Rex": [ 2175, 55, 15225, 385 ],
		"Rock Drake": [ 2050, 55, 14350, 385 ],
		"Rock Elemental": [ 2200, 55, 15400, 385 ],
		"Sabertooth": [ 1200, 55, 8400, 385 ],
		"Sarco": [ 550, 55, 3850, 385 ],
		"Shadowmane": [ 2375, 55, 16625, 385 ],
		"Shinehorn": [ 125, 55, 875, 385 ],
		"Snow Owl": [ 1125, 55, 7875, 385 ],
		"Spino": [ 1675, 55, 11725, 385 ],
		"Stegosaurus": [ 725, 55, 5075, 385 ],
		"Tapejara": [ 1675, 55, 11725, 385 ],
		"Terror Bird": [ 900, 55, 6300, 385 ],
		"Therizinosaur": [ 2350, 55, 16450, 385 ],
		"Thorny Dragon": [ 1200, 55, 8400, 385 ],
		"Thylacoleo": [ 1250, 55, 8750, 385 ],
		"Triceratops": [ 575, 55, 4025, 385 ],
		"Troodon": [ 800, 55, 5600, 385 ],
		"Tropeognathus": [ 1675, 55, 11725, 385 ],
		"Tusoteuthis": [ 2175, 55, 15225, 385 ],
		"Unicorn": [ 1100, 55, 7700, 385 ],
		"Velonasaur": [ 800, 55, 5600, 385 ],
		"Voidwyrm": [ 2050, 55, 14350, 385 ],
		"Vulture": [ 800, 55, 5600, 385 ],
		"Woolly Rhino": [ 975, 55, 6825, 385 ],
		"Wyvern": [ 2050, 55, 14350, 385 ],
		"Yutyrannus": [ 2350, 55, 16450, 385 ]
	};
	
	var CHAMBER_MAX_SHARDS = 48 * 1000;
	var ele;

	function calculate() {
		var creatureName = ele.creatureSelect.options[ele.creatureSelect.selectedIndex].value;
		var creature = creatures[creatureName];
		var creatureLevel = parseFloat(ele.characterLevel.value) || 0;
		// Clone Cost
		var baseCost = creature[0];
		var costPerLevel = creature[1];
		var costForLevel = costPerLevel * creatureLevel;
		
		var cloneCost = costForLevel + baseCost;
		var cloneTime = (creature[2] + creature[3] * creatureLevel) / (parseFloat(ele.babyMatureSpeedMultiplier.value) || 1);
		
		// console.log('CloneCostResult: ' + cloneCost);
		// console.log('CloneTimeResult: ' + cloneTime);
		
		ele.costPerLevel.innerText = Math.round(costPerLevel);
		ele.baseCost.innerText = Math.round(baseCost);
		ele.cloneCost.innerText = Math.round(cloneCost);
		if (Number.parseInt(cloneCost) >= CHAMBER_MAX_SHARDS) {
			document.getElementById('clone-cost-color').style = "background-color:#cf4c4c8a !important;";
		} else {
			document.getElementById('clone-cost-color').style = "background-color:#2ebf338a !important";
			ele.cloneTime.innerText = Math.round(cloneTime);
			var cloneTimeReadable = new Date(cloneTime * 1000);
			ele.cloneTimeReadable.innerText = (cloneTimeReadable.getUTCDate() - 1 /* 1. Januar */) + ' d ' + cloneTimeReadable.getUTCHours() + ' h ' +
			cloneTimeReadable.getUTCMinutes() + ' m ' + cloneTimeReadable.getUTCSeconds() + ' s';
		}
	}

	function createSelect(creatureNames) {
		creatureNames.forEach(function (name) {
			var option = document.createElement('option');
			option.innerText = name;
			option.value = name;
			ele.creatureSelect.appendChild(option);
		});
		ele.creatureSelect.addEventListener('change', calculate);
	}

	mw.hook('wikipage.content').add(function($content) {
		var main = $content.find('#creature-select:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		ele = {
			costPerLevel: $content.find('#cost-per-level')[0],
			baseCost:$content.find('#base-cost')[0],
			cloneCost: $content.find('#clone-cost')[0],
			cloneTime: $content.find('#clone-time')[0],
			cloneTimeReadable: $content.find('#clone-time-readable')[0],
			creatureSelect: document.createElement('select'),
			babyMatureSpeedMultiplier: document.createElement('input'),
			characterLevel: document.createElement('input')
		};

		ele.babyMatureSpeedMultiplier.type = 'number';
		ele.babyMatureSpeedMultiplier.min = 0.1;
		ele.babyMatureSpeedMultiplier.max = 100;
		ele.babyMatureSpeedMultiplier.step = 0.1;
		ele.babyMatureSpeedMultiplier.value = 1.0;

		ele.characterLevel.type = 'number';
		ele.characterLevel.min = 1;
		ele.characterLevel.max = 500;
		ele.characterLevel.step = 1;
		ele.characterLevel.value = 224;

		$content.find('#creature-select')[0].append(ele.creatureSelect);
		$content.find('#baby-mature-speed-multiplier')[0].append(ele.babyMatureSpeedMultiplier);
		$content.find('#character-level')[0].append(ele.characterLevel);

		createSelect(Object.keys(creatures).sort());
		ele.babyMatureSpeedMultiplier.addEventListener('input', calculate);
		ele.characterLevel.addEventListener('input', calculate);
		calculate();
	});
})(window.mediaWiki);