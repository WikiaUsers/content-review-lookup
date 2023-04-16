$(function() {
	
	function calculateDamage(power, weaponDamage, dvm) {
		return (3*(power + 3.333)) * (weaponDamage * ((dvm / 100) + 1) * 0.089);
	}
	
	function calculateHits(monsterHealth, resistance, damage) {
		return monsterHealth / (((100 - resistance) / 100) * damage);
	}
	
	function updateCalculator() {
		let power = parseInt($('#input_power_level').val());
		let weaponDamage = parseInt($('#input_wpn_damage').val());
		let dvm = parseInt($('#input_dmgvsmonsters').val());
		let monsterHealth = parseInt($('#input_monster_health').val());
		let resistance = parseInt($('#input_resistance').val());
		
		let damage = calculateDamage(power, weaponDamage, dvm);
		let hits = calculateHits(monsterHealth, resistance, damage);
		$('#input_damage').val(damage.toFixed(3));
		$('#input_hits').val(Math.ceil(hits));
	}
	
	// Generate Calculator
	(function () {
		$('#monster_calculator').html(
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>Monster\'s Health:</label><input id="input_monster_health" type="number" value="0" min="0" oninput="validity.valid||(value=\'\');"></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>Power Level:</label><input id="input_power_level" type="number" value="0" min="0" max="20" oninput="validity.valid||(value=\'\');"></div></div></div>' +
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>Weapon Damage:</label><input id="input_wpn_damage" type="number" value="0" min="0" oninput="validity.valid||(value=\'\');"></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>DmgVSMonsters (%):</label><input id="input_dmgvsmonsters" type="number" value="0" min="0" oninput="validity.valid||(value=\'\');"></div></div></div>' +
			'<div class="calculator-row"><div class="calculator-col-half">' +
			'<div class="calculator-element"><label>Resistance (%):</label><input id="input_resistance" type="number" value="0" min="0" max="100" oninput="validity.valid||(value=\'\');"></div></div></div>' +
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>Damage:</label><input id="input_damage" type="number" value="0" disabled></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>Hits:</label><input id="input_hits" type="number" value="0" disabled></div></div></div>'
		);
				// Input Listeners
		$('#input_monster_health, #input_power_level, #input_wpn_damage, #input_dmgvsmonsters, #input_resistance').on('input', function() {
			updateCalculator();
		});
	})();
});