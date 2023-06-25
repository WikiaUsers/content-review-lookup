mw.hook('wikipage.content').add(function() {
	'use strict';
	var usc = document.getElementById('UnitStatsCalculator');
	if (!usc) return;

	// Constants
	var data = usc.dataset,
	    MIN_LEVEL = 1,
	    html = '<div id="adv-level-input-container" style="display:inline-block; text-align:center;">' +
		'<form id="adv-unbind-select" style="display:inline-block; width:180px;">' +
			'<div id="adv-unbind-0-input" style="display:inline;"></div>' +
			'<div id="adv-unbind-1-input" style="display:inline;"></div>' +
			'<div id="adv-unbind-2-input" style="display:inline;"></div>' +
			'<div id="adv-unbind-3-input" style="display:inline;"></div>' +
			'<div id="adv-unbind-4-input" style="display:inline;"></div>' +
		'</form>' +
		'<div id="adv-level-input" style="display:inline-block; margin-left:0.5em; position:relative; bottom:1em;"></div>' +
		'<div id="adv-stat-output-container" style="text-align:center; margin-top:4px;">' +
			'<div style="width:100%" align="center">' +
				'<div style="display:table-cell;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:middle"><div id="adv-hp-label">HP</div></div>' +
				'<div style="display:table-cell;width:150px;text-align:left;padding: 3px 0 3px 6px;border: 0px #528e52 solid;vertical-align:middle"><div id="adv-hp" style="display:inline;">' + MIN_HP + ' - ' + MAX_HP + '</div></div>' +
			'</div>' +
			'<div style="width:100%" align="center">' +
				'<div style="display:table-cell;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:middle"><div id="adv-str-label">Str</div></div>' +
				'<div style="display:table-cell;width:150px;text-align:left;padding: 3px 0 3px 6px;border: 0px #528e52 solid;vertical-align:middle"><div id="adv-str" style="display:inline;">' + MIN_STR + ' - ' + MAX_STR + '</div></div>' +
			'</div>' +
		'</div>' +
	'</div>';
	usc.innerHTML = html;
	var UB_LEVEL_0 = Number(data.ubLevel0),
	    UB_LEVEL_1 = Number(data.ubLevel1),
	    UB_LEVEL_2 = Number(data.ubLevel2),
	    UB_LEVEL_3 = Number(data.ubLevel3),
	    MAX_LEVEL = Number(data.maxLevel),
	    MIN_HP = Number(data.minHp),
	    MAX_HP = Number(data.maxHp),
	    MIN_STR = Number(data.minStr),
	    MAX_STR = Number(data.maxStr),

	    ele = {
		input: document.getElementById("adv-level-input"),
		input0: document.getElementById("adv-unbind-0-input"),
		input1: document.getElementById("adv-unbind-1-input"),
		input2: document.getElementById("adv-unbind-2-input"),
		input3: document.getElementById("adv-unbind-3-input"),
		input4: document.getElementById("adv-unbind-4-input"),
		hpLabel: document.getElementById("adv-hp-label"),
		hp: document.getElementById("adv-hp"),
		strLabel: document.getElementById("adv-str-label"),
		str: document.getElementById("adv-str")
	};

	function radio(id, icon) {
		return '<input type="radio" value=' + id + ' name="unbind" checked=1><label for="adv-unbind-' + id + '-input"><img src="https://images.wikia.com/dragalialost_gamepedia_en/images/' + icon + '" style="width:35px; position:relative; bottom:4px;"/></label>';
	}

	// Initialize the empty divs with content
	ele.input0.innerHTML = radio(0, 'b/be/0_Unbind.png');
	ele.input1.innerHTML = radio(1, 'e/ea/1_Unbind.png');
	ele.input2.innerHTML = radio(2, 'a/ac/2_Unbind.png');
	ele.input3.innerHTML = radio(3, 'a/a3/3_Unbind.png');
	ele.input4.innerHTML = radio(4, '1/1c/4_Unbind.png');
	ele.input.innerHTML = '<label for="adv-level-input-field" style="font-weight:bold;">Level</label><input type="number" id="adv-level-input-field" value=' + MAX_LEVEL + ' min=1 max=' + MAX_LEVEL + ' style="width:40px; text-align:center; margin-left:5px;">';
	ele.input0.children[0].addEventListener('input', calcStats);
	ele.input1.children[0].addEventListener('input', calcStats);
	ele.input2.children[0].addEventListener('input', calcStats);
	ele.input3.children[0].addEventListener('input', calcStats);
	ele.input4.children[0].addEventListener('input', calcStats);
	ele.input.children[1].addEventListener('input', calcStats);
	ele.levelInput = document.getElementById('adv-level-input-field');
	calcStats();

	// Calculate the HP and STR stats
	function calcStats() {
		// Get the level and Unbind
		var levelInput = ele.levelInput;
		var level = levelInput.value;
		var unbind = document.querySelector('input[name = "unbind"]:checked').value;
	
		// Manually set the level cap if we're dealing with a lower unbind
		switch (unbind) {
			case "0":
				if (level > UB_LEVEL_0) {
					level = UB_LEVEL_0;
					levelInput.value = UB_LEVEL_0;
				}
				break;
			case "1":
				if (level > UB_LEVEL_1) {
					level = UB_LEVEL_1;
					levelInput.value = UB_LEVEL_1;
				}
				break;
			case "2":
				if (level > UB_LEVEL_2) {
					level = UB_LEVEL_2;
					levelInput.value = UB_LEVEL_2;
				}
				break;
			case "3":
				if (level > UB_LEVEL_3) {
				level = UB_LEVEL_3;
				levelInput.value = UB_LEVEL_3;
				}
				break;
			case "4":
				if (level > MAX_LEVEL) {
					level = MAX_LEVEL;
					levelInput.value = MAX_LEVEL;
				}
				break;
		}

		// Validate the level and unbind before calculating HP and Str
		if (validateLevel(level) && validateUnbind(unbind)) {
			setHP(calculateHP(level, unbind), level);
			setStr(calculateStr(level, unbind), level);
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

	// Check if unbind is either 0, 1, 2, 3, 4
	function validateUnbind(unbind) {
		if (unbind == 0 || unbind == 1 || unbind == 2 || unbind == 3 || unbind == 4) {
			return true;
		}
		return false;
	}

	// Set the HP value in the display
	function setHP(value, level) {
		ele.hpLabel.innerHTML = (value !== "-") ? ("Level " + level + " HP") : "HP";
		ele.hp.innerHTML = value;
	}

	// Set the Str value in the display
	function setStr(value, level) {
		ele.strLabel.innerHTML = (value !== "-") ? ("Level " + level + " Str") : "Str";
		ele.str.innerHTML = value;
	}

	// Calculate the HP
	function calculateHP(level, unbind) {
		var levelDiff = MAX_LEVEL - MIN_LEVEL;
		var steps = (MAX_HP - MIN_HP) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(MIN_HP + statGain);
	}

	// Calculate the Str
	function calculateStr(level, unbind) {
		var levelDiff = MAX_LEVEL - MIN_LEVEL;
		var steps = (MAX_STR - MIN_STR) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(MIN_STR + statGain);
	}
});