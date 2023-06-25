mw.hook('wikipage.content').add(function() {
	'use strict';
	var hc = document.getElementById('HealCalculator');
	if (!hc) return;

	var html =
	addEntry('HP', 'HP') +
	addEntry('STR', 'STR') +
	addEntry('Potency %', 'PTNCY') +
	addEntry('Potency Buff %', 'PTNCYB') +
	addEntry('Active Strength Buff %', 'STRB') +
	'<div style="width:100%">' +
		'<div class="dt-term"><div>Healing CoAbility %</div></div>' +
		'<div class="dd-description"><div style="display:inline;"><select id="Healing coAbility" name="Healing coAbility">' +
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
		'<div class="dd-description"><div style="display:inline;"><select id="Strength coAbility" name="Strength coAbility">' +
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

	hc.innerHTML = html;
	var ele = {
		HP: document.getElementById('HP'),
		STR: document.getElementById('STR'),
		PTNCY: document.getElementById('PTNCY'),
		PTNCYB: document.getElementById('PTNCYB'),
		STRB: document.getElementById('STRB'),
		SCOBUFF: document.getElementById("Strength coAbility"),
		HCOBUFF: document.getElementById("Healing coAbility"),
		ELEM: document.getElementById('ELEM'),
		RAID: document.getElementById('RAID'),
		DUR: document.getElementById('DUR'),
		FREQ: document.getElementById('FREQ'),
		REGEN: document.getElementById('REGEN'),
		TOTAL: document.getElementById("total"),
		HOT: document.getElementById("HOT"),
		CHECKBOX: document.getElementById('checkbox'),
		calculate: document.getElementById('calculate')
	};
	ele.CHECKBOX.addEventListener('click', display);
	ele.calculate.addEventListener('click', calculate);

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
});