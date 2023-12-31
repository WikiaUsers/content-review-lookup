/* [[Template:DragonStatsCalculator]] */
/* [[Template:WeaponStatsCalculator]] */
/* [[Template:WyrmprintStatsCalculator]] */
(function(mw) {
	'use strict';

	var minLevel = 1;
	var ubLevel, minHp, maxHp, minStr, maxStr, ele;

	function radio(id, icon) {
		return '<input type="radio" value=' + id + ' name="unbind" checked=1><label for="adv-unbind-' + id + '-input"><img src="https://static.wikia.nocookie.net/dragalialost_gamepedia_en/images/' + icon + '" style="width:35px; position:relative; bottom:4px;"/></label>';
	}

	// Check if level is a number we can calculate with
	function validateLevel(value) {
		if (isNaN(value) || value === "") {
			return false;
		}
		return true;
	}

	// Check if unbind is either 0, 1, 2, 3, 4
	function validateUnbind(unbind) {
		if ([0, 1, 2, 3, 4].includes(unbind)) {
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
	function calculateHP(level) {
		var levelDiff = ubLevel[4] - minLevel;
		var steps = (maxHp - minHp) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(minHp + statGain);
	}

	// Calculate the Str
	function calculateStr(level) {
		var levelDiff = ubLevel[4] - minLevel;
		var steps = (maxStr - minStr) / levelDiff;
		var statGain = (level-1) * steps;
		return Math.ceil(minStr + statGain);
	}

	// Calculate the HP and STR stats
	function calcStats(unbind) {
		// Get the level and Unbind
		var levelInput = ele.levelInput;
		var level = levelInput.value;

		// Manually set the level cap if we're dealing with a lower unbind
		if (level > ubLevel[unbind]) {
			level = ubLevel[unbind];
			levelInput.value = ubLevel[unbind];
		}

		// Validate the level and unbind before calculating HP and Str
		if (validateLevel(level) && validateUnbind(unbind)) {
			setHP(calculateHP(level), level);
			setStr(calculateStr(level), level);
		} else {
			setHP("-");
			setStr("-");
		}
	}

	function init($content) {
		var main = $content.find('#UnitStatsCalculator:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		var data = main.dataset;
		ubLevel = [
			Number(data.ubLevel0),
			Number(data.ubLevel1),
			Number(data.ubLevel2),
			Number(data.ubLevel3),
			Number(data.maxLevel)
		];
		minHp = Number(data.minHp);
		maxHp = Number(data.maxHp);
		minStr = Number(data.minStr);
		maxStr = Number(data.maxStr);

		main.innerHTML = '<div id="adv-level-input-container" style="display:inline-block; text-align:center;">' +
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
					'<div style="display:table-cell;width:150px;text-align:left;padding: 3px 0 3px 6px;border: 0px #528e52 solid;vertical-align:middle"><div id="adv-hp" style="display:inline;">' + minHp + ' - ' + maxHp + '</div></div>' +
				'</div>' +
				'<div style="width:100%" align="center">' +
					'<div style="display:table-cell;width:120px;text-align:right;padding: 3px 8px 3px 0;margin: 0 -6px 0 0;border-right:3px #528e52 solid;font-weight:bold;vertical-align:middle"><div id="adv-str-label">Str</div></div>' +
					'<div style="display:table-cell;width:150px;text-align:left;padding: 3px 0 3px 6px;border: 0px #528e52 solid;vertical-align:middle"><div id="adv-str" style="display:inline;">' + minStr + ' - ' + maxStr + '</div></div>' +
				'</div>' +
			'</div>' +
		'</div>';

	    ele = {
			input: $content.find('#adv-level-input')[0],
			input0: $content.find('#adv-unbind-0-input')[0],
			input1: $content.find('#adv-unbind-1-input')[0],
			input2: $content.find('#adv-unbind-2-input')[0],
			input3: $content.find('#adv-unbind-3-input')[0],
			input4: $content.find('#adv-unbind-4-input')[0],
			hpLabel: $content.find('#adv-hp-label')[0],
			hp: $content.find('#adv-hp')[0],
			strLabel: $content.find('#adv-str-label')[0],
			str: $content.find('#adv-str')[0]
		};

		function getUnbind() {
			var unbind = $content.find('input[name = "unbind"]:checked')[0].value;
			calcStats(Number(unbind));
		}
		// Initialize the empty divs with content
		ele.input0.innerHTML = radio(0, 'b/be/0_Unbind.png');
		ele.input1.innerHTML = radio(1, 'e/ea/1_Unbind.png');
		ele.input2.innerHTML = radio(2, 'a/ac/2_Unbind.png');
		ele.input3.innerHTML = radio(3, 'a/a3/3_Unbind.png');
		ele.input4.innerHTML = radio(4, '1/1c/4_Unbind.png');
		ele.input.innerHTML = '<label for="adv-level-input-field" style="font-weight:bold;">Level</label><input type="number" id="adv-level-input-field" value=' + ubLevel[4] + ' min=1 max=' + ubLevel[4] + ' style="width:40px; text-align:center; margin-left:5px;">';
		ele.input0.children[0].addEventListener('input', getUnbind);
		ele.input1.children[0].addEventListener('input', getUnbind);
		ele.input2.children[0].addEventListener('input', getUnbind);
		ele.input3.children[0].addEventListener('input', getUnbind);
		ele.input4.children[0].addEventListener('input', getUnbind);
		ele.input.children[1].addEventListener('input', getUnbind);
		ele.levelInput = $content.find('#adv-level-input-field')[0];
		getUnbind();
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);