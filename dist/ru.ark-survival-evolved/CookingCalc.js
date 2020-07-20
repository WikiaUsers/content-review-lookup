var cookingStats = null;
if (cookingCalcDiv = document.getElementById('cookingCalc')) {
    // [0]: здоровье, [1]: выносливость, [2]:еда, [3]: вода
    cookingStats = {
        "Сырое мясо/рыба": [0.55, 0.05, 0.75, 0.05, 0.01],
        "Сырое первосортное мясо/рыба/баранина": [1.2, 0.05, 1, 0.05, 0.01],
        "Жареное/вяленое мясо/рыба": [0.55, 0.05, 1, 0.05, 0.01],
        "Жареное/вяленое первосортное мясо/рыба/жареная баранина": [1.65, 0.05, 1.45, 0.05, 0.01],
        "Ягоды": [0.05, 0.05, 0.1875, 0.125, 0.01],
        "Межоберри": [0.05, 0.05, 0.2625, 0.175, 0.01],
        "Наркоберри": [0.05, -0.5, 0.5, 0.05, 0.01],
        "Стимберри": [0.05, 0.625, 0.1875, -1.25, 0.01],
        "Семена": [0.05, 0.05, 0.05, 0.05, 0.01],
        "Овощи": [0.275, 0.05, 0.3, 2.5, 0.01],
        "Редкий цветок": [0.05, 5, 0.05, 0.05, 0.01],
        "Редкий гриб": [0.05, 0.05, 0.05, 0.05, 1],
        "Яйца": [4, 4, 4, 0.05, 0.3],
        "Сладкий овощной кекс": [0.5, 0.05, 0.5, 0.05, 0.02],
        "Корм": [0.05, 15, 11.25, -5, 0.05],
        "Протухшее мясо": [-2.5, -1.5, 0.3125, 0.05, 0.01],
        "Человеческие фекалии": [-0.625, -0.625, 0.5, -0.625, 0.01],
        "Маленькие фекалии животных": [-0.25, -0.25, 0, -0.25, 0.01],
        "Средние фекалии животных": [-0.5, -0.5, 0.5, -0.5, 0.03],
        "Большие/огромные фекалии животных": [-0.75, -0.75, 0.5, -0.75, 0.03],
        "Сочная мякоть кактуса": [0.05, 0.05, 0.1875, 0.125, 0.01],
        "Мыло": [-0.25, -0.25, 0.5, -0.25, 0.01],
        "Органический полимер": [-2.5, -2.5, 0.5, -2.5, 0.01],
        "Мёд гигантской пчелы": [1.6875, 1.0625, 2.25, 1.0625, 0.02]
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
            '<tr><th>Скорость изготовления</th><td><input type="number" min="100" max="2000" maxlength="4" value="100" id="cookingCalcCraftingSpeed" onchange="calcCooking()" style="width:5em">%</td></tr>' +
            '<tr><th>Ингредиент</th><th>Количество</th></tr>' +
            tableRows +
            '</table>' +
            '<table class="wikitable"><tr><th>Результат</th><th colspan="5"><label><input type="radio" name="foodkind" onchange="cookingCalcChangeKind(true)">Еда</label><label><input type="radio" name="foodkind" onchange="cookingCalcChangeKind(false)">Вода</label></td></tr><tr><th></th><th>Здоровье</th><th>Выносливость</th><th>Еда</th><th>Вода</th><th>Вес</th></tr>' +
            '<tr><th>Значение</th><td id="cookingR0">1</td><td id="cookingR1">1</td><td id="cookingR2">1</td><td id="cookingR3">1</td><td id="cookingR4">0.1</td></tr>' +
            '</table>';
    for (var i = 0; i < 8; i++) {
        document.getElementById('cookingCalcIng' + i).selectedIndex = i;
    }
};


function cookingCalcChangeKind(food) {
    document.getElementById('cookingR2').style.textDecoration = (food ? "" : "line-through");
    document.getElementById('cookingR3').style.textDecoration = (food ? "line-through" : "");
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
                            results[j] += ingNr * cookingStats[ing][j] * (cs * 1.5625 - 0.3125);
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