var cookingStats = null;
if (cookingCalcDiv = document.getElementById('cookingCalc')) {
    // [0]: health, [1]: stamina, [2]:food, [3]: water
    cookingStats = {
        "Raw Meat": [0.55, 0.05, 0.75, 0.05],
        "Raw Prime Meat": [1.2, 0.05, 1, 0.05],
        "Cooked/Jerky Meat": [0.55, 0.05, 1, 0.05],
        "Cooked/Jerky Prime Meat": [1.65, 0.05, 1.45, 0.05],
        "Amar/Azul/Tintoberry": [0.05, 0.05, 0.1875, 0.125],
        "Mejoberry": [0.05, 0.05, 0.2625, 0.175],
        "Narcoberry": [0.05, -0.5, 0.5, 0.05],
        "Stimberry": [0.05, 0.625, 0.1875, -1.25],
        "Seed": [0.05, 0.05, 0.05, 0.05],
        "Crop": [0.275, 0.05, 0.3, 2.5],
        "Rare Mushroom": [0.05, 5, 0.05, 0.05],
        "Rare Flower": [0.05, 0.05, 0.05, 0.05],
        "Egg": [4, 4, 4, 0.05],
        "Kibble": [0.05, 15, 11.25, -5],
        "Spoiled Meat": [-2.5, -1.5, 0.3125, 0.05],
        "Poop": [-0.625, -0.625, 0.5, -0.625]
    };
    var tableRows = '';
    var dropDownOptions = '';
    for (var ing in cookingStats) {
        dropDownOptions += '<option>' + ing + '</option>';
    }

    for (var i = 0; i < 8; i++) {
        tableRows += '<tr><td><select id="cookingCalcIng' + i + '" onchange="calcCooking()">' + dropDownOptions + '</select></td><td><input type="number" min="0" max="1000" maxlength="4" value="0" id="cookingCalcIngNr' + i + '" onchange="calcCooking()" style="width:5em"></td></tr>';
    }

    cookingCalcDiv.innerHTML = '<table class="wikitable">' +
            '<tr><th>Crafting Speed</th><td><input type="number" min="100" max="2000" maxlength="4" value="100" id="cookingCalcCraftingSpeed" onchange="calcCooking()" style="width:5em">%</td></tr>' +
            '<tr><th>Ingredient</th><th>Number</th></tr>' +
            tableRows +
            '</table>' +
            '<table class="wikitable"><tr><th>Results</th><th colspan="4"><label><input type="radio" name="foodkind" onchange="cookingCalcChangeKind(true)">Food</label><label><input type="radio" name="foodkind" onchange="cookingCalcChangeKind(false)">Drink</label></td></tr><tr><th></th><th>Health</th><th>Stamina</th><th>Food</th><th>Water</th></tr>' +
            '<tr><th>Values</th><td id="cookingR0">1</td><td id="cookingR1">1</td><td id="cookingR2">1</td><td id="cookingR3">1</td></tr>' +
            '</table>';
    for (var i = 0; i < 8; i++) {
        document.getElementById('cookingCalcIng' + i).selectedIndex = i;
    }
}

function cookingCalcChangeKind(food) {
    document.getElementById('cookingR2').style.textDecoration = (food ? "" : "line-through");
    document.getElementById('cookingR3').style.textDecoration = (food ? "line-through" : "");
}

function calcCooking() {
    if (cookingStats) {
        var results = [1, 1, 1, 1];

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
                    }
                }
            }
        }
        for (var j = 0; j < 4; j++) {
            var rEl = document.getElementById('cookingR' + j);
            if (rEl != null) {
                rEl.innerHTML = results[j].toFixed(2);
            }
        }
    }
}