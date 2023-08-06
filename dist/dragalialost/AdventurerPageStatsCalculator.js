/* [[Template:AdventurerPageStatsCalculator]] */
(function(mw) {
	'use strict';
	var minLevel = 1,
	    maxLevel = 80,
	    spiralMaxLevel = 100;
	var data, minHp, maxHp, addMaxHp, minStr, maxStr, addMaxStr, hasSpiralLimitBreak, ele;

	// Check if level is a number we can calculate with
	function validateLevel(value) {
		if (isNaN(value) || value === "") {
			return false;
		}
		return true;
	}

	// Check if rarity is either 3, 4, or 5
	function validateRarity(rarity) {
		if ([3, 4, 5].includes(Number(rarity))) {
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
		ele.strLabel.textContent = (value !== "-") ? ("Level" + level + " Str") : "Str";
		ele.str.textContent = value;
	}

	// Calculate the HP
	function calculateHP(level, rarity) {
		var levelDiff = maxLevel - minLevel;
		var steps = (maxHp - minHp[2]) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(minHp[rarity-3] + statGain);
	}

	// Calculate the Str
	function calculateStr(level, rarity) {
		var levelDiff = maxLevel - minLevel;
		var steps = (maxStr - minStr[2]) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(minStr[rarity-3] + statGain);
	}

	// Calculate the HP for Level 80+
	function calculateSpiralHP(level) {
		var levelDiff = spiralMaxLevel - maxLevel;
		var steps = (addMaxHp - maxHp) / levelDiff;
		var statGain = (level-80) * steps;
		return Math.ceil(maxHp + statGain);
	}

	// Calculate the Str for Level 80+
	function calculateSpiralStr(level) {
		var levelDiff = spiralMaxLevel - maxLevel;
		var steps = (addMaxStr - maxStr) / levelDiff;
		var statGain = (level-80) * steps;
		return Math.ceil(maxStr + statGain);
	}

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
				if (level > maxLevel) {
					if (hasSpiralLimitBreak) {
						if (level > spiralMaxLevel) {
							level = spiralMaxLevel;
							ele.levelInput.value = spiralMaxLevel;
						}
					} else {
						level = maxLevel;
						ele.levelInput.value = maxLevel;
					}
				}
		}

		// Validate the level and rarity before calculating HP and Str
		if(validateLevel(level) && validateRarity(rarity)) {
			if (hasSpiralLimitBreak) {
				// Level 80+ after Mana Spiral is unlocked has a different calc
				setHP(calculateSpiralHP(level), level);
				setStr(calculateSpiralStr(level), level);
			} else {
				setHP(calculateHP(level, rarity), level);
				setStr(calculateStr(level, rarity), level);
			}
		} else {
			setHP("-");
			setStr("-");
		}
	}

	function init($content) {
		var main = $content.find('#AdventurerPageStatsCalculator:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
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
		minHp = [Number(data.minHp3 || 0), Number(data.minHp4 || 0), Number(data.minHp5) || 0];
		maxHp = Number(data.maxHp);
		addMaxHp = Number(data.addMaxHp1);
		minStr = [Number(data.minStr), Number(data.minStr4), Number(data.minStr5)];
		maxStr = Number(data.maxStr);
		addMaxStr = Number(data.addMaxAtk1);
		var natRarity = Number(data.rarity);
		hasSpiralLimitBreak = data.maxLimitBreakCount === '5';
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
		var maxLevel2 = maxLevel;
		if (hasSpiralLimitBreak) {
			maxLevel2 = spiralMaxLevel;
		}

		// Create the rarity radio buttons
		if (natRarity === 3) {
			ele.input3.innerHTML = '<input type="radio" value=3 name="rarity"><label for="adv-rarity-input-3">3★</label>';
			ele.input3.children[0].addEventListener('input', calcStats);
			ele.input4.innerHTML = '<input type="radio" value=4 name="rarity"><label for="adv-rarity-input-4">4★</label>';
			ele.input4.children[0].addEventListener('input', calcStats);
		} else if (natRarity === 4) {
			ele.input4.innerHTML = '<input type="radio" value=4 name="rarity"><label for="adv-rarity-input-4">4★</label>';
			ele.input4.children[0].addEventListener('input', calcStats);
		}
		ele.input5.innerHTML = '<input type="radio" value=5 name="rarity" checked=1><label for="adv-rarity-input-5">5★</label>';
		ele.input5.children[0].addEventListener('input', calcStats);
		ele.input1.innerHTML = '<label for="adv-level-input-field" style="font-weight:bold;">Level</label><input type="number" id="adv-level-input-field" value=' + maxLevel2 + ' min=1 max=' + maxLevel2 + ' style="width:40px; text-align:center; margin-left:5px;">';
		ele.input1.children[1].addEventListener('input', calcStats);
		ele.levelInput = $content.find('#adv-level-input-field')[0];
		calcStats();
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);