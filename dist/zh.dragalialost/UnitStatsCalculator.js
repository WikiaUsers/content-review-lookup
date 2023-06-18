;(function(mw) {
	'use strict';
	// Constants
	var MIN_LEVEL, UB_LEVEL_0, UB_LEVEL_1, UB_LEVEL_2, UB_LEVEL_3, MAX_LEVEL, MIN_HP, MAX_HP, MIN_STR, MAX_STR;
	
	// Initialize the empty divs with content
	function init() {
		var input = document.getElementById("adv-level-input");
		var input0 = document.getElementById("adv-unbind-0-input");
		var input1 = document.getElementById("adv-unbind-1-input");
		var input2 = document.getElementById("adv-unbind-2-input");
		var input3 = document.getElementById("adv-unbind-3-input");
		var input4 = document.getElementById("adv-unbind-4-input");
		input0.innerHTML = '<input type="radio" value=0 name="unbind" checked=1><label for="adv-unbind-0-input"><img src="https://images.wikia.com/dragalialost_gamepedia_en/images/b/be/0_Unbind.png" style="width:35px; position:relative; bottom:4px;"/></label>';
		input1.innerHTML = '<input type="radio" value=1 name="unbind" checked=1><label for="adv-unbind-1-input"><img src="https://images.wikia.com/dragalialost_gamepedia_en/images/e/ea/1_Unbind.png" style="width:35px; position:relative; bottom:4px;"/></label>';
		input2.innerHTML = '<input type="radio" value=2 name="unbind" checked=1><label for="adv-unbind-2-input"><img src="https://images.wikia.com/dragalialost_gamepedia_en/images/a/ac/2_Unbind.png" style="width:35px; position:relative; bottom:4px;"/></label>';
		input3.innerHTML = '<input type="radio" value=3 name="unbind" checked=1><label for="adv-unbind-3-input"><img src="https://images.wikia.com/dragalialost_gamepedia_en/images/a/a3/3_Unbind.png" style="width:35px; position:relative; bottom:4px;"/></label>';
		input4.innerHTML = '<input type="radio" value=4 name="unbind" checked=1><label for="adv-unbind-4-input"><img src="https://images.wikia.com/dragalialost_gamepedia_en/images/1/1c/4_Unbind.png" style="width:35px; position:relative; bottom:4px;"/></label>';
		input.innerHTML = '<label for="adv-level-input-field" style="font-weight:bold;">等级</label><input type="number" id="adv-level-input-field" value=' + MAX_LEVEL + ' min=1 max=' + MAX_LEVEL + ' style="width:40px; text-align:center; margin-left:5px;">';
		intput.children[1].addEventListener('input', calcStats);
		intput0.children[0].addEventListener('input', calcStats);
		intput1.children[0].addEventListener('input', calcStats);
		intput2.children[0].addEventListener('input', calcStats);
		intput3.children[0].addEventListener('input', calcStats);
		intput4.children[0].addEventListener('input', calcStats);
		calcStats();
	}
	
	// Calculate the HP and STR stats
	function calcStats() {
		// Get the level and Unbind
		var levelInput = document.getElementById('adv-level-input-field');
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
		}
	
		// Validate the level and unbind before calculating HP and Str
		if(validateLevel(level) && validateUnbind(unbind)) {
			setHP(calculateHP(level, unbind), level)
			setStr(calculateStr(level, unbind), level)
		} else {
			setHP("-");
			setStr("-");
		}
	}
	
	// Check if level is a number we can calculate with
	function validateLevel(value) {
		if(isNaN(value) || value == "") {
			return false;
		}
		return true;
	}
	
	// Check if unbind is either 0, 1, 2, 3, 4
	function validateUnbind(unbind) {
		if(unbind == 0 || unbind == 1 || unbind == 2 || unbind == 3 || unbind == 4) {
			return true;
		}
		return false;
	}
	
	// Set the HP value in the display
	function setHP(value, level) {
		if (value != "-") {
			document.getElementById("adv-hp-label").innerHTML = "Lv. " + level + " HP"
		} else {
			document.getElementById("adv-hp-label").innerHTML = "HP"
		}
		document.getElementById("adv-hp").innerHTML = value;
	}
	
	// Set the Str value in the display
	function setStr(value, level) {
		if (value != "-") {
			document.getElementById("adv-str-label").innerHTML = "Lv." + level + " 攻"
		} else {
			document.getElementById("adv-str-label").innerHTML = "攻"
		}
		document.getElementById("adv-str").innerHTML = value;
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

	function preload() {
		var ele = document.getElementById('UnitStatsCalculator');
		if (!ele) return;
		var data = ele.dataset;
		ele.innerHTML = html;
		UB_LEVEL_0 = data.ubLevel0;
		UB_LEVEL_1 = data.ubLevel1;
		UB_LEVEL_2 = data.ubLevel2;
		UB_LEVEL_3 = data.ubLevel3;
		MAX_LEVEL = data.maxLevel;
		MIN_HP = data.minHp;
		MAX_HP = data.maxHp;
		MIN_STR = data.minStr;
		MAX_STR = data.maxStr;
		init();
	}
	// Load modules, init, etc.
	mw.hook('wikipage.content').add(preload);
})(window.mediaWiki);