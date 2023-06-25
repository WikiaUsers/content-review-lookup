mw.hook('wikipage.content').add(function() {
	'use strict';
	var apsc = document.getElementById('AdventurerPageStatsCalculator');
	if (!apsc) return;

	var data = apsc.dataset,
	    html = '<div id="adv-level-input-container" style="display:inline-block; text-align:center;">' +
		'<form id="adv-rarity-select" style="display:inline;">' +
			'<div id="adv-rarity-input-3" style="display:inline;"></div>' +
			'<div id="adv-rarity-input-4" style="display:inline;"></div>' +
			'<div id="adv-rarity-input-5" style="display:inline;"></div>' +
		'</form>' +
		'<div id="adv-level-input" style="display:inline-block; margin-left:0.5em;"></div>' +
		'<div id="adv-stat-output-container" style="text-align:center; margin-top:4px;">' +
			'<div style="width:100%">' +
				'<div class="dt-term" style="display:inline-block;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:top"><div id="adv-hp-label"></div></div>' +
				'<div class="dd-description" style="display:inline-block;width:150px;text-align:left;padding: 3px 0 3px 6px;border-left: 1px #528e52 solid;vertical-align:top"><div id="adv-hp" style="display:inline;"></div></div>' +
			'</div>' +
			'<div style="width:100%">' +
				'<div class="dt-term" style="display:inline-block;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:top"><div id="adv-str-label"></div></div>' +
				'<div class="dd-description" style="display:inline-block;width:150px;text-align:left;padding: 3px 0 3px 6px;border-left: 1px #528e52 solid;vertical-align:top"><div id="adv-str" style="display:inline;"></div></div>' +
			'</div>' +
		'</div>' +
	'</div>';
	apsc.innerHTML = html;
	var MIN_LEVEL = 1,
	    MAX_LEVEL = 80,
	    MIN_HP = [data.minHp3, data.minHp4, data.minHp5],
	    MAX_HP = data.maxHp,
	    MIN_STR = [data.minStr3, data.minStr4, data.minStr5],
	    MAX_STR = data.maxStr,
	    NAT_RARITY = data.rarity,
	    ele = {
	    	input: document.getElementById("adv-rarity-input-4"),
	    	input1: document.getElementById("adv-level-input"),
	    	input3: document.getElementById("adv-rarity-input-3"),
	    	input4: document.getElementById("adv-rarity-input-4"),
	    	input5: document.getElementById("adv-rarity-input-5"),
	    	str: document.getElementById("adv-str"),
	    	strLabel: document.getElementById("adv-str-label"),
	    	hp: document.getElementById("adv-hp"),
	    	hpLabel: document.getElementById("adv-hp-label")
	    };
	// Initialize the empty divs with content
	if (NAT_RARITY == 3) {
		ele.input3.innerHTML = '<input type="radio" value=3 name="rarity"><label for="adv-rarity-input-3">3★</label>';
		ele.input3.children[0].addEventListener('input', calcStats);
		ele.input4.innerHTML = '<input type="radio" value=4 name="rarity"><label for="adv-rarity-input-4">4★</label>';
		ele.input4.children[0].addEventListener('input', calcStats);
	} else if (NAT_RARITY == 4) {
		ele.input.innerHTML = '<input type="radio" value=4 name="rarity"><label for="adv-rarity-input-4">4★</label>';
		ele.input.children[0].addEventListener('input', calcStats);
	}
	ele.input5.innerHTML = '<input type="radio" value=5 name="rarity" checked=1><label for="adv-rarity-input-5">5★</label>';
	ele.input5.children[0].addEventListener('input', calcStats);
	ele.input1.innerHTML = '<label for="adv-level-input-field" style="font-weight:bold;">等级</label><input type="number" id="adv-level-input-field" value=80 min=1 max=80 style="width:40px; text-align:center; margin-left:5px;">';
	ele.input1.children[1].addEventListener('input', calcStats);
	ele.levelInput = document.getElementById('adv-level-input-field');
	calcStats();

	// Calculate the HP and STR stats
	function calcStats() {
		// Get the level and rarity
		var level = ele.levelInput.value;
		var rarity = document.querySelector('input[name = "rarity"]:checked').value;
	
		// Manually set the level cap if we're dealing with a lower rarity
		switch (rarity) {
			case "3":
				if (level > 60) {
					level = 60;
					levelInput.value = "60";
				}
				break;
			case "4":
				if (level > 70) {
					level = 70;
					levelInput.value = "70";
				}
				break;
		}

		// Validate the level and rarity before calculating HP and Str
		if (validateLevel(level) && validateRarity(rarity)) {
			setHP(calculateHP(level, rarity), level);
			setStr(calculateStr(level, rarity), level);
		} else {
			setHP("-");
			setStr("-");
		}
	}

	// Check if level is a number we can calculate with
	function validateLevel(value) {
		if (isNaN(value) || value == "") {
			return false;
		}
		return true;
	}

	// Check if rarity is either 3, 4, or 5
	function validateRarity(rarity) {
		if (rarity == 3 || rarity == 4 || rarity == 5 || rarity == "3" || rarity == "4" || rarity == "5") {
			return true;
		}
		return false;
	}

	// Set the HP value in the display
	function setHP(value, level) {
		ele.hpLabel.textContent = (value !== "-") ? ("Lv." + level + " HP") : "HP";
		ele.hp.textContent = value;
	}

	// Set the Str value in the display
	function setStr(value, level) {
		ele.strLabel.textContent = (value !== "-") ? ("Lv." + level + " 攻") : "攻";
		ele.str.textContent = value;
	}

	// Calculate the HP
	function calculateHP(level, rarity) {
		var levelDiff = MAX_LEVEL - MIN_LEVEL;
		var steps = (MAX_HP - MIN_HP[2]) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(MIN_HP[rarity-3] + statGain);
	}

	// Calculate the Str
	function calculateStr(level, rarity) {
		var levelDiff = MAX_LEVEL - MIN_LEVEL;
		var steps = (MAX_STR - MIN_STR[2]) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(MIN_STR[rarity-3] + statGain);
	}
});