(function(mw) {
	'use strict';

	var ele;

	function addEntry(label, id) {
		return '<div style="width:100%"><div class="dt-term"><div>' + label + '</div></div>' +
			'<div class="dd-description"><div style="display:inline;"><input type="number" id="' + id + '" class="a"></div></div>' +
		'</div>';
	}
	function addOption(label, value) {
		return '<option value="' + value + '">' + label + ' +' + value + '%</option>';
	}
	function addCheckbox(label, id) {
		return '<div style="width:100%">' +
			'<div class="dt-term"><div>' + label + '</div></div>' +
			'<div class="dd-description"><div style="display:inline;"><input type="checkbox" id="' + id + '">Check for yes.</div></div>' +
		'</div>';
	}
	function calculate() {
		var HP = ele.HP.value;
		var STR = ele.STR.value;
		var PTNCY = ele.PTNCY.value / 100;
		var PTNCYB = ele.PTNCYB.value / 100;
		var STRB = ele.STRB.value / 100 + 1;
		var SCOBUFF = ele.SCOBUFF[ele.SCOBUFF.selectedIndex].value / 100 + 1;
		var HCOBUFF = ele.HCOBUFF[ele.HCOBUFF.selectedIndex].value / 100 + 1;
		var EBUFF = ele.ELEM.checked ? 1.2 : 1;
		var TARG = ele.RAID.checked ? 16 : 4;
		var TOTAL;
		if (ele.CHECKBOX.checked) {
			var DUR = ele.DUR.value;
			var FREQ = ele.FREQ.value;
			var REGEN = ele.REGEN.value / 100;
			var TIMES = Math.floor(DUR / FREQ);
			var RTOTAL = (((0.64*HP + 0.24*(STR * STRB * SCOBUFF)) * REGEN * (PTNCYB + HCOBUFF)) / TARG) * EBUFF * TIMES;
			TOTAL = (((0.64*HP + 0.24*(STR * STRB * SCOBUFF)) * PTNCY * (PTNCYB + HCOBUFF)) / TARG) * EBUFF + RTOTAL;
			console.log(RTOTAL);
		} else {
			TOTAL = (((0.64*HP + 0.24*(STR * STRB * SCOBUFF)) * PTNCY * (PTNCYB + HCOBUFF)) / TARG) * EBUFF;
		}
		var MINRANGETOTAL = TOTAL * 0.95;
		var MAXRANGETOTAL = TOTAL * 1.05;
		ele.TOTAL.innerHTML = Math.floor(MINRANGETOTAL) + "-" + Math.floor(MAXRANGETOTAL);
	}
	function display() {
		ele.HOT.style.display = ele.CHECKBOX.checked ? "block" : "none";
	}
	function init($content) {
		var main = $content.find('#HealCalculator')[0];
		if (!main) return;
		main.innerHTML = addEntry('HP', 'HP') +
		addEntry('STR', 'STR') +
		addEntry('Potency %', 'PTNCY') +
		addEntry('Potency Buff %', 'PTNCYB') +
		addEntry('Active Strength Buff %', 'STRB') +
		'<div style="width:100%">' +
			'<div class="dt-term"><div>Healing CoAbility %</div></div>' +
			'<div class="dd-description"><div style="display:inline;"><select id="HealingCoAbility" name="Healing coAbility">' +
				addOption('Recovery Potency', '0') +
				addOption('Recovery Potency', '2') +
				addOption('Recovery Potency', '4') +
				addOption('Recovery Potency', '6') +
				addOption('Recovery Potency', '8') +
				addOption('Recovery Potency', '10') +
				addOption('Recovery Potency', '12') +
				addOption('Recovery Potency', '14') +
				addOption('Recovery Potency', '16') +
				addOption('Recovery Potency', '20') +
				'</select></div></div>' +
		'</div>' +
		'<div style="width:100%">' +
			'<div class="dt-term"><div>Strength CoAbility %</div></div>' +
			'<div class="dd-description"><div style="display:inline;"><select id="StrengthCoAbility" name="Strength coAbility">' +
				addOption('Strength', '0') +
				addOption('Strength', '1') +
				addOption('Strength', '2') +
				addOption('Strength', '3') +
				addOption('Strength', '4') +
				addOption('Strength', '5') +
				addOption('Strength', '6') +
				addOption('Strength', '7') +
				addOption('Strength', '8') +
				addOption('Strength', '10') +
				'</select></div></div>' +
		'</div>' +
		addCheckbox('Same Element?', 'ELEM') +
		addCheckbox('Raid?', 'RAID') +
		addCheckbox('Include Healing Over Time?', 'checkbox') +
		'<div id="HOT" style="display:none">' +
			addEntry('REGEN%', 'REGEN') +
			addEntry('DURATION', 'DUR') +
			addEntry('HEAL FREQUENCY', 'FREQ') +
		'</div>' +
		'<div style="width:100%">' +
			'<div class="dt-term"><div>Total Heal</div></div>' +
			'<div class="dd-description"><div id="total" style="display:inline;"></div></div>' +
		'</div>' +
		'<button id="calculate">Calculate</button>';

		ele = {
			HP: $content.find('#HP')[0],
			STR: $content.find('#STR')[0],
			PTNCY: $content.find('#PTNCY')[0],
			PTNCYB: $content.find('#PTNCYB')[0],
			STRB: $content.find('#STRB')[0],
			SCOBUFF: $content.find('#StrengthCoAbility')[0],
			HCOBUFF: $content.find('#HealingCoAbility')[0],
			ELEM: $content.find('#ELEM')[0],
			RAID: $content.find('#RAID')[0],
			DUR: $content.find('#DUR')[0],
			FREQ: $content.find('#FREQ')[0],
			REGEN: $content.find('#REGEN')[0],
			TOTAL: $content.find('#total')[0],
			HOT: $content.find('#HOT')[0],
			CHECKBOX: $content.find('#checkbox')[0],
			calculate: $content.find('#calculate')[0]
		};
		ele.CHECKBOX.addEventListener('click', display);
		ele.calculate.addEventListener('click', calculate);
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);