/* [[Custom_Consumable]] */
(function(mw) {
	'use strict';

	window.CookingCalcI18n = window.CookingCalcI18n || {
		drink: 'Drink',
		food: 'Food',
		health: 'Health',
		ingredient: 'Ingredient',
		number: 'Number',
		results: 'Results',
		speed: 'Crafting Speed',
		stamina: 'Stamina',
		values: 'Values',
		water: 'Water',
		weight: 'Weight'
	};
	var i18n = window.CookingCalcI18n;

	window.CookingStatsI18n = window.CookingStatsI18n || [
		'Element Dust',
		'Amar/Azul/Tintoberry/Cactus Sap',
		'Mejoberry',
		'Narcoberry',
		'Stimberry',
		'Crops',
		'Aggeravic Mushroom',
		'Aquatic Mushroom',
		'Ascerbic Mushroom',
		'Auric Mushroom',
		'Rare Mushroom',
		'Seed',
		'Rare Flower',
		'Giant Bee Honey',
		'Sweet Vegetable Cake',
		'Egg',
		'Kibble',
		'Soap',
		'Corrupted Nodule',
		'Organic Polymer',
		'Raw Meat/Fish',
		'Raw Prime Meat/Fish/Mutton',
		'Cooked Meat/Fish/Jerky',
		'Cooked Prime Meat/Jerky/Fish/Lamb Chop',
		'Spoiled Meat',
		'Human Feces',
		'Small Animal Feces',
		'Medium Animal Feces',
		'Large/Massive Animal Feces',
		'Snow Owl Pellet'
	];

    // [0]: health, [1]: stamina, [2]:food, [3]: water, [4]:
    var cookingStats = [
        [0.1, 0.1, 0.1, 0.1, 0.01],
        [0.01, 0.01, 0.0375, 0.025, 0.01],
        [0.01, 0.01, 0.0525, 0.035, 0.01],
        [0.01, -0.1, 0.1, 0.01, 0.01],
        [0.01, 0.125, 0.0375, -0.25, 0.01],
        [0.055, 0.01, 0.06, 0.5, 0.02],
        [0.05, 0.2, 0.1, 0, 0.1],
        [0.01, 0.1, 0.05, 0.2, 0.01],
        [0.01, -0.1, 0.1, 0.01, 0.01],
        [0.01, 0.5, 0.0375, -0.25, 0.01],
        [0.01, 1, 0.01, 0.01, 0.01],
        [0.01, 0.01, 0.01, 0.01, 0.01],
        [0.01, 0.01, 0.01, 0.01, 1],
        [0.11, 0.01, 0.2, 0.01, 0.02],
        [0.1, 0.01, 0.1, 0.01, 0.02],
        [0.8, 0.8, 0.8, 0.01, 0.3],
        [0.01, 3, 2.25, -1, 0.05],
        [-0.05, -0.05, 0.1, -0.05, 0.01],
        [-0.5, -0.5, 0.1, -0.5, 0.01],
        [-0.5, -0.5, 0.1, -0.5, 0.01],
        [0.11, 0.01, 0.15, 0.01, 0.02],
        [0.24, 0.01, 0.2, 0.01, 0.02],
        [0.11, 0.01, 0.2, 0.01, 0.02],
        [0.33, 0.01, 0.29, 0.01, 0.02],
        [-0.5, -0.3, 0.0625, 0.01, 0.02],
        [-0.125, -0.125, 0.1, -0.125, 0.01],
        [-0.05, -0.05, 0, -0.05, 0.01],
        [-0.1, -0.1, 0.1, -0.1, 0.01],
        [-0.15, -0.15, 0.1, -0.15, 0.01],
        [-0.05, -0.05, 0, -0.05, 0.01]
    ];
    var tableRows, dropDownOptions;

    function cookingCalcChangeKind(type) {
        document.getElementById('cookingR2').style.textDecoration = (type === i18n.food ? "" : "line-through");
        document.getElementById('cookingR3').style.textDecoration = (type === i18n.drink ? "" : "line-through");
    }

    function calcCooking() {
        var results = [1, 1, 1, 1, 0.1];
        var ing = 0;
        var ingNr = 0;
        var ingEl = null;
        var ingNrEl = null;
        var csEl = document.getElementById('cookingCalcCraftingSpeed');
        if (csEl !== null) {
            var cs = csEl.value / 100.0;
            for (var i = 0; i < 8; i++) {
                ingEl = document.getElementById('cookingCalcIng' + i);
                ingNrEl = document.getElementById('cookingCalcIngNr' + i);
                if (ingEl !== null && ingNrEl !== null) {
                    ing = ingEl.selectedIndex;
                    ingNr = ingNrEl.value;
                    if (cookingStats[ing] !== null) {
                        for (var j = 0; j < 4; j++) {
                            results[j] += ingNr * cookingStats[ing][j] * 5 * (cs * 1.5625 - 0.3125);
                        }
                        results[4] += ingNr * cookingStats[ing][4];
                    }
                }
            }
        }
        for (var k = 0; k < 5; k++) {
            var rEl = document.getElementById('cookingR' + k);
            if (rEl !== null) {
                rEl.innerHTML = results[k].toFixed(2);
            }
        }
    }

	mw.hook('wikipage.content').add(function($content) {
		var cookingCalcDiv = $content.find('#cookingCalc:not(.loaded)')[0];
	    if (!cookingCalcDiv) return;
		cookingCalcDiv.classList.add('loaded');

	    tableRows = '';
    	dropDownOptions = '';

		for (var ing=0; ing<cookingStats.length; ing++) {
			dropDownOptions += '<option>' + CookingStatsI18n[ing] + '</option>';
		}
		for (var i = 0; i < 8; i++) {
			tableRows += '<tr><td><select id="cookingCalcIng' + i + '">' + dropDownOptions + '</select></td><td><input type="number" min="0" max="1000" maxlength="4" value="0" id="cookingCalcIngNr' + i + '" style="width:5em"></td></tr>';
		}
		
		cookingCalcDiv.innerHTML = '<table class="wikitable">' +
			'<tr><th>' + i18n.speed + '</th><td><input type="number" min="100" max="2000" maxlength="4" value="100" id="cookingCalcCraftingSpeed" style="width:5em">%</td></tr>' +
			'<tr><th>' + i18n.ingredient + '</th><th>' + i18n.number + '</th></tr>' +
			tableRows +
			'</table>' +
			'<table class="wikitable"><tr><th>' + i18n.results + '</th><th colspan="5"><label><input type="radio" name="foodkind">' + i18n.food + '</label><label><input type="radio" name="foodkind">' + i18n.drink + '</label></td></tr><tr><th></th><th>' + i18n.health + '</th><th>' + i18n.stamina + '</th><th>' + i18n.food + '</th><th>' + i18n.water + '</th><th>' + i18n.weight + '</th></tr>' +
			'<tr><th>' + i18n.values + '</th><td id="cookingR0">1</td><td id="cookingR1">1</td><td id="cookingR2">1</td><td id="cookingR3">1</td><td id="cookingR4">0.1</td></tr>' +
			'</table>';
		for (var j = 0; j < 8; j++) {
			$content.find('#cookingCalcIng' + j)[0].selectedIndex = j;
		}

	    // Add the event listeners to the elements.
	    // We do this as event listeners instead of adding onchange attributes because the functions aren't global
	    // and we don't want to pollute the global scope.

	    $content.find('[id^=cookingCalcIng]').each(function(undefined, el){
	        el.addEventListener('input', calcCooking);
	    });

	    $content.find('[name="foodkind"]').each(function(undefined, el){
	        el.addEventListener('change', function(){
	        	cookingCalcChangeKind(el.nextSibling.textContent);
	        });
	    });

	    $content.find('#cookingCalcCraftingSpeed')[0].addEventListener('input', calcCooking);
	});

})(window.mediaWiki);