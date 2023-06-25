mw.hook('wikipage.content').add(function() {
	'use strict';
	var calc = document.getElementById('StatCalc');
	if (!calc) return;
	calc.innerHTML = '<div id="statCalcContainer">' +
		'<div id="statCentre">' +
			'<div>' +
				'<p>Choose a weapon</p>' +
				'<select id="weaponList">' +
					'<option value="" selected disabled>-</option>' +
					'<option value="club">Club</option>' +
					'<option value="cAxe">Crafted Axe</option>' +
					'<option value="cClub">Crafted Club</option>' +
					'<option value="machete">Machete</option>' +
					'<option value="mAxe">Modern Axe</option>' +
					'<option value="pAxe">Plane Axe</option>' +
					'<option value="rAxe">Rusty Axe</option>' +
					'<option value="tennis">Tennis Racket</option>' +
					'<option value="uRock">Upgraded Rock</option>' +
					'<option value="uStick">Upgraded Stick</option>' +
				'</select>' +
				'<div>' +
					'<p>Number of Feathers</p>' +
					'<input id="feather" type="text" maxlength="2" autocomplete="off" spellcheck="false" placeholder="Between 0 and 30">' +
					'<p>Number of Teeth</p>' +
					'<input id="teeth" type="text" maxlength="2" autocomplete="off" spellcheck="false" placeholder="Between 0 and 30">' +
					'<p>Number of Booze</p>' +
					'<input id="glass" type="text" maxlength="2" autocomplete="off" spellcheck="false" placeholder="Between 0 and 30">' +
				'</div>' +
			'</div>' +
			'<div id="statsSection">' +
				'<div id="baseStats">' +
					'<div id="speed">' +
						'<p>Speed: <span id="infoSpeed">0</span></p>' +
						'<div class="statBar" id="speedBar"></div>' +
					'</div>' +
					'<div id="damage">' +
						'<p>Damage: <span id="infoDamage">0</span></p>' +
						'<div class="statBar" id="damageBar"></div>' +
					'</div>' +
					'<div id="block">' +
						'<p>Block: <span id="infoBlock">0</span></p>' +
						'<div class="statBar" id="blockBar"></div>' +
					'</div>' +
				'</div>' +
				'<div>' +
					'<button id="calcStats">Calculate Stats</button>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div id="statsOutput"></div>' +
	'</div>';
	var weaponStats = {
		// speed, damage, block
		club: [1, 7.5, 10],
		cAxe: [1, 5.5, 9],
		cClub: [2, 7, 9],
		machete: [7.25, 5.25, 0],
		mAxe: [5, 7, 9],
		pAxe: [5.5, 5.25, 2],
		rAxe: [3.5, 6, 10],
		tennis: [5, 2, 5.5],
		uRock: [5, 7, 0],
		uStick: [7, 2, 8]
	},
	ele = {
		option: document.getElementById('weaponList'),
		feather: document.getElementById('feather'),
		teeth: document.getElementById('teeth'),
		glass: document.getElementById('glass'),
		output: document.getElementById('statsOutput'),
		speedBar: document.getElementById('speedBar'),
		damageBar: document.getElementById('damageBar'),
		blockBar: document.getElementById('blockBar'),
		infoSpeed: document.getElementById('infoSpeed'),
		infoDamage: document.getElementById('infoDamage'),
		infoBlock: document.getElementById('infoBlock')
	};
	function updateBars() {
		var speed = Number(ele.infoSpeed.textContent);
		var damage = Number(ele.infoDamage.textContent);
		var block = Number(ele.infoBlock.textContent);
		var factor = 10;
		ele.speedBar.style.width = (speed * factor) + 'px';
		ele.damageBar.style.width = (damage * factor) + 'px';
		ele.blockBar.style.width = (block * factor) + 'px';
	}
	document.getElementById('calcStats').addEventListener('click', function() {
		var option = ele.option.value;
		var feather = Number(ele.feather.value);
		var teeth = Number(ele.teeth.value);
		var glass = Number(ele.glass.value);
		var output = ele.output;
		if (option === '') {
			output.textContent = 'Select a weapon from the list.';
			return;
		}
		output.textContent = '';
		if (isNaN(feather) || isNaN(teeth) || isNaN(glass)) {
			output.textContent = 'Make sure all inputs are numbers.';
		} else if (feather < 0 || teeth < 0 || glass < 0) {
			output.textContent = 'How can you have a negative upgrade.';
		} else if ((feather == 0 && teeth == 0 && glass == 0)) {
			output.textContent = 'At least one upgrade has to be greater than 0.';
		} else if ((feather + teeth + glass) > 30) {
			output.textContent = 'The total number of upgrades can\'t exceed 30.';
		} else {
			var damage = (weaponStats[option][1] + ((teeth * 0.1) + (glass * 0.2)) - (feather * 0.05)).toFixed(2);
			var speed = (weaponStats[option][0] - ((teeth * 0.05) + (glass * 0.1)) + (feather * 0.1)).toFixed(2);
			if (damage < 0) damage = 0;
			if (speed < 0) speed = 0;
			ele.infoSpeed.textContent = speed;
			ele.infoDamage.textContent = damage;
			updateBars();
		}
	});
	ele.option.addEventListener('change', function() {
		var option = this.value;
		ele.infoSpeed.textContent = weaponStats[option][0];
		ele.infoDamage.textContent = weaponStats[option][1];
		ele.infoBlock.textContent = weaponStats[option][2];
		updateBars();
	});
});