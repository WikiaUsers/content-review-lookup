(function(mw) {
	'use strict';
	var MIN_LEVEL = 1,
	    MAX_LEVEL = 80,
	    SPIRAL_MAX_LEVEL = 100;
	var data, MIN_HP, MAX_HP, ADD_MAX_HP, MIN_STR, MAX_STR, ADD_MAX_STR, NAT_RARITY, HAS_SPIRAL_LIMIT_BREAK, ele;

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
					ele.levelInput.value = "60";
				}
				break;
			case "4":
				if (level > 70) {
					level = 70;
					ele.levelInput.value = "70";
				}
				break;
			case "5":
				if (level > MAX_LEVEL) {
					if (HAS_SPIRAL_LIMIT_BREAK) {
						if (level > SPIRAL_MAX_LEVEL) {
							level = SPIRAL_MAX_LEVEL;
							levelInput.value = SPIRAL_MAX_LEVEL;
						}
					} else {
						level = MAX_LEVEL;
						levelInput.value = MAX_LEVEL;
					}
				}
		}

		// Validate the level and rarity before calculating HP and Str
		if(validateLevel(level) && validateRarity(rarity)) {
			if (HAS_SPIRAL_LIMIT_BREAK) {
				// Level 80+ after Mana Spiral is unlocked has a different calc
				setHP(calculateSpiralHP(level, rarity), level);
				setStr(calculateSpiralStr(level, rarity), level);
			} else {
				setHP(calculateHP(level, rarity), level);
				setStr(calculateStr(level, rarity), level);
			}
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
		ele.hpLabel.textContent = (value !== "-") ? ("Level" + level + " HP") : "HP";
		ele.hp.textContent = value;
	}

	// Set the Str value in the display
	function setStr(value, level) {
		ele.strLabel.textContent = (value !== "-") ? ("Level" + level + " 攻") : "攻";
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

	// Calculate the HP for Level 80+
	function calculateSpiralHP(level, rarity) {
		var levelDiff = SPIRAL_MAX_LEVEL - MAX_LEVEL;
		var steps = (ADD_MAX_HP - MAX_HP) / levelDiff;
		var statGain = (level-80) * steps;
		return Math.ceil(MAX_HP + statGain);
	}

	// Calculate the Str for Level 80+
	function calculateSpiralStr(level, rarity) {
		var levelDiff = SPIRAL_MAX_LEVEL - MAX_LEVEL;
		var steps = (ADD_MAX_STR - MAX_STR) / levelDiff;
		var statGain = (level-80) * steps;
		return Math.ceil(MAX_STR + statGain);
	}
	function init($content) {
		var main = $content.find('#AdventurerPageStatsCalculator')[0];
		if (!main) return;

		data = data || main.dataset;
		main.innerHTML = '<div id="adv-level-input-container" style="display:inline-block; text-align:center;">' +
			'<form id="adv-rarity-select" style="display:inline;">' +
				'<div id="adv-rarity-input-3" style="display:inline;"></div>' +
				'<div id="adv-rarity-input-4" style="display:inline;"></div>' +
				'<div id="adv-rarity-input-5" style="display:inline;"></div>' +
			'</form>' +
			'<div id="adv-level-input" style="display:inline-block; margin-left:0.5em;"></div>' +
			'<div id="adv-stat-output-container" style="text-align:center; margin-top:4px;">' +
				'<div style="width:100%" align="center">' +
					'<div class="dt-term" style="display: table-cell;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:middle"><div id="adv-hp-label">Max 5★ HP: </div></div>' +
					'<div class="dd-description" style="display: table-cell;width:150px;text-align:left;padding: 3px 0 3px 6px;border:0px #528e52 solid;vertical-align:middle"><div id="adv-hp" style="display:inline;">' + data.maxHp + '</div></div>' +
				'</div>' +
				'<div style="width:100%" align="center">' +
					'<div class="dt-term" style="display: table-cell;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:middle"><div id="adv-str-label">Max 5★ Str:</div></div>' +
					'<div class="dd-description" style="display: table-cell;width:150px;text-align:left;padding: 3px 0 3px 6px;border:0px #528e52 solid;vertical-align:middle"><div id="adv-str" style="display:inline;">' + data.maxStr + '</div></div>' +
				'</div>' +
			'</div>' +
		'</div>';
		var MIN_HP = [data.minHp3, data.minHp4, data.minHp5],
		MAX_HP = data.maxHp,
		ADD_MAX_HP = data.addMaxHp1,
		MIN_STR = [data.minStr3, data.minStr4, data.minStr5],
		MAX_STR = data.maxStr,
		ADD_MAX_STR = data.addMaxAtk1,
		NAT_RARITY = data.rarity,
		HAS_SPIRAL_LIMIT_BREAK = data.maxLimitBreakCount == 5,
		ele = {
			input: $content.find('#adv-rarity-input-4')[0],
			input1: $content.find('#adv-level-input')[0],
			input3: $content.find('#adv-rarity-input-3')[0],
			input4: $content.find('#adv-rarity-input-4')[0],
			input5: $content.find('#adv-rarity-input-5')[0],
			str: $content.find('#adv-str')[0],
			strLabel: $content.find('#adv-str-label')[0],
			hp: $content.find('#adv-hp')[0],
			hpLabel: $content.find('#adv-hp-label')[0]
		};

		// Initialize the empty divs with content
		var maxLevel = MAX_LEVEL;
		if (HAS_SPIRAL_LIMIT_BREAK) {
			maxLevel = SPIRAL_MAX_LEVEL;
		}

		// Create the rarity radio buttons
		if (NAT_RARITY == 3) {
			ele.input3.innerHTML = '<input type="radio" value=3 name="rarity"><label for="adv-rarity-input-3">3★</label>';
			ele.input3.children[0].addEventListener('input', calcStats);
			ele.input4.innerHTML = '<input type="radio" value=4 name="rarity"><label for="adv-rarity-input-4">4★</label>';
			ele.input4.children[0].addEventListener('input', calcStats);
		} else if (NAT_RARITY == 4) {
			ele.input4.innerHTML = '<input type="radio" value=4 name="rarity"><label for="adv-rarity-input-4">4★</label>';
			ele.input4.children[0].addEventListener('input', calcStats);
		}
		ele.input5.innerHTML = '<input type="radio" value=5 name="rarity" checked=1><label for="adv-rarity-input-5">5★</label>';
		ele.input5.children[0].addEventListener('input', calcStats);
		ele.input1.innerHTML = '<label for="adv-level-input-field" style="font-weight:bold;">Level</label><input type="number" id="adv-level-input-field" value=' + maxLevel + ' min=1 max=' + maxLevel + ' style="width:40px; text-align:center; margin-left:5px;">';
		ele.input1.children[1].addEventListener('input', calcStats);
		ele.levelInput = $content.find('#adv-level-input-field')[0];
		calcStats();
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);