$(function() {
    if (cookingCalcDiv = document.getElementById('cookingCalc')) {
        // [0]: health, [1]: stamina, [2]:food, [3]: water, [4]:
        var cookingStats = {
            'Element Dust': [0.1, 0.1, 0.1, 0.1, 0.01],
            'Amar/Azul/Tintoberry/Cactus Sap': [0.01, 0.01, 0.0375, 0.025, 0.01],
            'Mejoberry': [0.01, 0.01, 0.0525, 0.035, 0.01],
            'Narcoberry': [0.01, -0.1, 0.1, 0.01, 0.01],
            'Stimberry': [0.01, 0.125, 0.0375, -0.25, 0.01],
            'Crops': [0.055, 0.01, 0.06, 0.5, 0.02],
            'Aggeravic Mushroom': [0.05, 0.2, 0.1, 0, 0.1],
            'Aquatic Mushroom': [0.01, 0.1, 0.05, 0.2, 0.01],
            'Ascerbic Mushroom': [0.01, -0.1, 0.1, 0.01, 0.01],
            'Auric Mushroom': [0.01, 0.5, 0.0375, -0.25, 0.01],
            'Rare Mushroom': [0.01, 1, 0.01, 0.01, 0.01],
            'Seed': [0.01, 0.01, 0.01, 0.01, 0.01],
            'Rare Flower': [0.01, 0.01, 0.01, 0.01, 1],
            'Giant Bee Honey': [0.11, 0.01, 0.2, 0.01, 0.02],
            'Sweet Vegetable Cake': [0.1, 0.01, 0.1, 0.01, 0.02],
            'Egg': [0.8, 0.8, 0.8, 0.01, 0.3],
            'Kibble': [0.01, 3, 2.25, -1, 0.05],
            'Soap': [-0.05, -0.05, 0.1, -0.05, 0.01],
            'Corrupted Nodule': [-0.5, -0.5, 0.1, -0.5, 0.01],
            'Organic Polymer': [-0.5, -0.5, 0.1, -0.5, 0.01],
            'Raw Meat/Fish': [0.11, 0.01, 0.15, 0.01, 0.02],
            'Raw Prime Meat/Fish/Mutton': [0.24, 0.01, 0.2, 0.01, 0.02],
            'Cooked Meat/Fish/Jerky': [0.11, 0.01, 0.2, 0.01, 0.02],
            'Cooked Prime Meat/Jerky/Fish/Lamb Chop': [0.33, 0.01, 0.29, 0.01, 0.02],
            'Spoiled Meat': [-0.5, -0.3, 0.0625, 0.01, 0.02],
            'Human Feces': [-0.125, -0.125, 0.1, -0.125, 0.01],
            'Small Animal Feces': [-0.05, -0.05, 0, -0.05, 0.01],
            'Medium Animal Feces': [-0.1, -0.1, 0.1, -0.1, 0.01],
            'Large/Massive Animal Feces': [-0.15, -0.15, 0.1, -0.15, 0.01],
            'Snow Owl Pellet': [-0.05, -0.05, 0, -0.05, 0.01]
        };
        var tableRows = '';
        var dropDownOptions = '';

        for (var ing in cookingStats) {
            dropDownOptions += '<option>' + ing + '</option>';
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
        for (var i = 0; i < 8; i++) {
            document.getElementById('cookingCalcIng' + i).selectedIndex = i;
        }

        function cookingCalcChangeKind(type) {
            document.getElementById('cookingR2').style.textDecoration = (type === "Food" ? "" : "line-through");
            document.getElementById('cookingR3').style.textDecoration = (type === "Drink" ? "" : "line-through");
        }

        function calcCooking() {
            if (cookingStats) {
                var results = [1, 1, 1, 1, .1];
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
                                    results[j] += ingNr * cookingStats[ing][j] * 5 * (cs * 1.5625 - 0.3125);
                                }
                                results[4] += ingNr * cookingStats[ing][4];
                            }
                        }
                    }
                }
                for (var j = 0; j < 5; j++) {
                    var rEl = document.getElementById('cookingR' + j);
                    if (rEl != null) {
                        rEl.innerHTML = results[j].toFixed(2);
                    }
                }
            }
        }

        // Add the event listeners to the elements.
        // We do this as event listeners instead of adding onchange attributes because the functions aren't global
        // and we don't want to pollute the global scope.

        document.querySelectorAll('[id^=cookingCalcIng]').forEach(function(el){
            el.addEventListener('input', calcCooking);
        });

        document.querySelectorAll('[name="foodkind"]').forEach(function(el){
            el.addEventListener('change', function(){cookingCalcChangeKind(el.nextSibling.textContent)});
        });

        document.getElementById('cookingCalcCraftingSpeed').addEventListener('input', calcCooking);
    }
});