;(function(mw) {
	'use strict';
	var cookingStats = {
		// health, stamina, food, water
		'Raw Meat/Fish': [0.55, 0.05, 0.75, 0.05, 0.01],
		'Raw Prime Meat/Fish/Mutton': [1.2, 0.05, 1, 0.05, 0.01],
		'Cooked/Jerky Meat/Fish': [0.55, 0.05, 1, 0.05, 0.01],
		'Cooked/Jerky Prime Meat/Fish/Lamb Chop': [1.65, 0.05, 1.45, 0.05, 0.01],
		'Amar/Azul/Tintoberry': [0.05, 0.05, 0.1875, 0.125, 0.01],
		'Mejoberry': [0.05, 0.05, 0.2625, 0.175, 0.01],
		'Narcoberry': [0.05, -0.5, 0.5, 0.05, 0.01],
		'Stimberry': [0.05, 0.625, 0.1875, -1.25, 0.01],
		'Seed': [0.05, 0.05, 0.05, 0.05, 0.01],
		'Advanced Crops': [0.275, 0.05, 0.3, 2.5, 0.01],
		'Rare Mushroom': [0.05, 5, 0.05, 0.05, 0.01],
		'Rare Flower': [0.05, 0.05, 0.05, 0.05, 1],
		'Egg': [4, 4, 4, 0.05, 0.3],
		'Kibble': [0.05, 15, 11.25, -5, 0.05],
		'Spoiled Meat': [-2.5, -1.5, 0.3125, 0.05, 0.01],
		'Human Feces': [-0.625, -0.625, 0.5, -0.625, 0.01],
		'Small Feces': [-0.25, -0.25, 0, -0.25, 0.01],
		'Medium Feces': [-0.5, -0.5, 0.5, -0.5, 0.03],
		'Large/Massive Feces': [-0.75, -0.75, 0.5, -0.75, 0.03],
		'Cactus Sap': [0.05, 0.05, 0.1875, 0.125, 0.01],
		'Soap': [-0.25, -0.25, 0.5, -0.25, 0.01],
		'Organic Polymer': [-2.5, -2.5, 0.5, -2.5, 0.01],
		'Giant Bee Honey': [1.6875, 1.0625, 2.25, 1.0625, 0.02]
	};
	function cookingCalcChangeKind(food) {
		document.getElementById('cookingR2').style.textDecoration = (food ? "" : "line-through");
		document.getElementById('cookingR3').style.textDecoration = (food ? "line-through" : "");
	}
	function calcCooking() {
		var results = [1, 1, 1, 1, 0.1];
		var ing = 0;
		var ingNr = 0;
		var ingEl = null;
		var ingNrEl = null;
		var csEl = document.getElementById('cookingCalcCraftingSpeed');
		if (csEl != null) {
			var cs = csEl.value / 100.0;
			for (var i = 0; i < 8; i++) {
				ingEl = document.getElementById('cookingCalcIng' + i);
				ingNrEl = document.getElementById('cookingCalcIngNr' + i);
				if (ingEl != null && ingNrEl != null) {
					ing = ingEl.value;
					ingNr = ingNrEl.value;
					if (cookingStats[ing] != null) {
						for (var j = 0; j < 4; j++) {
							results[j] += ingNr * cookingStats[ing][j] * (cs * 1.5625 - 0.3125);
						}
						results[4] += ingNr * cookingStats[ing][4];
					}
				}
			}
		}
		for (var k = 0; k < 5; k++) {
			var rEl = document.getElementById('cookingR' + k);
			if (rEl != null) {
				rEl.innerHTML = results[k].toFixed(2);
			}
		}
	}
	function init() {
		var cookingCalcDiv = document.getElementById('cookingCalc');
		if (!cookingCalcDiv) return;

		var tableRows = '';
		var dropDownOptions = '';
		for (var ing in cookingStats) {
			if (ing) {
				dropDownOptions += '<option>' + ing + '</option>';
			}
		}
		for (var i = 0; i < 8; i++) {
			tableRows += '<tr><td><select id="cookingCalcIng' + i + '">' + dropDownOptions + '</select></td><td><input type="number" min="0" max="1000" maxlength="4" value="0" id="cookingCalcIngNr' + i + '" style="width:5em"></td></tr>';
		}
		cookingCalcDiv.innerHTML = '<table class="wikitable">' +
			'<tr><th>Crafting Speed</th><td><input type="number" min="100" max="2000" maxlength="4" value="100" id="cookingCalcCraftingSpeed" style="width:5em">%</td></tr>' +
			'<tr><th>Ingredient</th><th>Number</th></tr>' +
			tableRows +
		'</table>' +
		'<table class="wikitable"><tr><th>Results</th><th colspan="5"><label><input type="radio" name="foodkind">Food</label><label><input type="radio" name="foodkind">Drink</label></td></tr><tr><th></th><th>Health</th><th>Stamina</th><th>Food</th><th>Water</th><th>Weight</th></tr>' +
			'<tr><th>Values</th><td id="cookingR0">1</td><td id="cookingR1">1</td><td id="cookingR2">1</td><td id="cookingR3">1</td><td id="cookingR4">0.1</td></tr>' +
		'</table>';
		cookingCalcDiv.querySelector('table:nth-child(2) th > label:nth-child(1)').addEventListener('change', function() {
			cookingCalcChangeKind(true);
		});
		cookingCalcDiv.querySelector('table:nth-child(2) th > label:nth-child(2)').addEventListener('change', function() {
			cookingCalcChangeKind(false);
		});
		document.getElementById('cookingCalcCraftingSpeed').addEventListener('change', calcCooking);
		for (var j = 0; j < 8; j++) {
			var ele = document.getElementById('cookingCalcIng' + j);
			var eleNr = document.getElementById('cookingCalcIngNr' + j);
			ele.selectedIndex = j;
			ele.addEventListener('change', calcCooking);
			eleNr.addEventListener('change', calcCooking);
		}
	}
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);