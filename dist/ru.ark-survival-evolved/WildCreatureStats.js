var wildStatCalcDiv = null;
var stats = null;
var wildCreatureStats = null;
var percentiles = null;
var wildStatCalcStats = {
    'health': 'Здоровье',
    'stamina': 'Выносливость',
    'oxygen': 'Кислород',
    'food': 'Еда',
    'weight': 'Вес',
    'damage': 'Ближний урон'
};

if (wildStatCalcDiv = document.getElementById('wildStatCalc')) {
    // Примечание: увеличение всегда дается в процентах от базового стат 
    // ПРИМЕЧАНИЕ: в этот ущерб инструмент 1 (в большинстве случаев) от 100 до 100% представляют (как это видно в игре)
    wildCreatureStats = {
        "Англер": {
            "health1": 450,
            "healthInc": 20,
            "stamina1": 240,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1500,
            "foodInc": 10,
            "weight1": 350,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Анкилозавр": {
            "health1": 700,
            "healthInc": 20,
            "stamina1": 175,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 3000,
            "foodInc": 10,
            "weight1": 250,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Аргентавис": {
            "health1": 365,
            "healthInc": 20,
            "stamina1": 750,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 2000,
            "foodInc": 10,
            "weight1": 350,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Дьявольская жаба": {
            "health1": 220,
            "healthInc": 20,
            "stamina1": 190,
            "staminaInc": 10,
            "food1": 1500,
            "foodInc": 10,
            "weight1": 160,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Бронтозавр": {
            "health1": 1850,
            "healthInc": 20,
            "stamina1": 240,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 10000,
            "foodInc": 10,
            "weight1": 900,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Карбонемис": {
            "health1": 700,
            "healthInc": 20,
            "stamina1": 200,
            "staminaInc": 10,
            "food1": 3000,
            "foodInc": 10,
            "weight1": 250,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Карнотавр": {
            "health1": 420,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 2000,
            "foodInc": 10,
            "weight1": 300,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Компи": {
            "health1": 72,
            "healthInc": 30,
            "stamina1": 100,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 450,
            "foodInc": 10,
            "weight1": 25,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Дилофозавр": {
            "health1": 130,
            "healthInc": 20,
            "stamina1": 100,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 450,
            "foodInc": 10,
            "weight1": 45,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Диморфодон": {
            "health1": 125,
            "healthInc": 20,
            "stamina1": 150,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 900,
            "foodInc": 10,
            "weight1": 50,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Волк": {
            "health1": 374,
            "healthInc": 20,
            "stamina1": 260,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 170,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Додо": {
            "health1": 40,
            "healthInc": 20,
            "stamina1": 100,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 450,
            "foodInc": 10,
            "weight1": 50,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Доедикурус": {
            "health1": 850,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 3000,
            "foodInc": 10,
            "weight1": 250,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Дракон": {
            "health1": 20000,
            "healthInc": 20,
            "stamina1": 400,
            "staminaInc": 10,
            "oxygen1": 2000,
            "oxygenInc": 10,
            "food1": 2600,
            "foodInc": 10,
            "weight1": 3000,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Гигантозавр": {
            "health1": 140000,
            "healthInc": 0.05,
            "stamina1": 400,
            "staminaInc": 0.05,
            "oxygen1": 150,
            "oxygenInc": 0.25,
            "food1": 4000,
            "foodInc": 0.25,
            "weight1": 700,
            "weightInc": 1,
            "damage1": 100,
            "damageInc": 5
        },        
        "Гигантопитек": {
            "health1": 640,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1500,
            "foodInc": 10,
            "weight1": 220,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Мамонт": {
            "health1": 850,
            "healthInc": 20,
            "stamina1": 330,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 5000,
            "foodInc": 10,
            "weight1": 500,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Олень": {
            "health1": 300,
            "healthInc": 20,
            "stamina1": 280,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 220,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Обезьяна": {
            "health1": 115,
            "healthInc": 20,
            "stamina1": 100,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 450,
            "foodInc": 10,
            "weight1": 70,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Мозазавр": {
            "health1": 3600,
            "healthInc": 12,
            "stamina1": 400,
            "staminaInc": 10,
            "food1": 8000,
            "foodInc": 10,
            "weight1": 1300,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Овираптор": {
            "health1": 140,
            "healthInc": 20,
            "stamina1": 120,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 900,
            "foodInc": 10,
            "weight1": 100,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },        
        "Пахицелофозавр": {
            "health1": 175,
            "healthInc": 20,
            "stamina1": 150,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 150,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Парацератерий": {
            "health1": 1140,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 6500,
            "foodInc": 10,
            "weight1": 500,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Паразавр": {
            "health1": 200,
            "healthInc": 20,
            "stamina1": 200,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1500,
            "foodInc": 10,
            "weight1": 255,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Фиомия": {
            "health1": 300,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 3000,
            "foodInc": 10,
            "weight1": 200,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
         "Плезиозавр": {
            "health1": 2400,
            "healthInc": 12,
            "stamina1": 200,
            "staminaInc": 10,
            "food1": 5000,
            "foodInc": 10,
            "weight1": 800,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Кенгуру": {
            "health1": 220,
            "healthInc": 20,
            "stamina1": 190,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1500,
            "foodInc": 10,
            "weight1": 400,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Птеранодон": {
            "health1": 210,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 150,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Кетцалькоатль": {
            "health1": 1500,
            "healthInc": 20,
            "stamina1": 750,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 820,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Раптор": {
            "health1": 200,
            "healthInc": 20,
            "stamina1": 150,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 140,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Тираннозавр": {
            "health1": 1000,
            "healthInc": 20,
            "stamina1": 420,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 3000,
            "foodInc": 10,
            "weight1": 500,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Саблезуб": {
            "health1": 275,
            "healthInc": 20,
            "stamina1": 200,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 1200,
            "foodInc": 10,
            "weight1": 200,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Саркозух": {
            "health1": 400,
            "healthInc": 20,
            "stamina1": 450,
            "staminaInc": 10,
            "food1": 1500,
            "foodInc": 10,
            "weight1": 300,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Спинозавр": {
            "health1": 700,
            "healthInc": 20,
            "stamina1": 350,
            "staminaInc": 10,
            "oxygen1": 650,
            "oxygenInc": 10,
            "food1": 2600,
            "foodInc": 10,
            "weight1": 350,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Стегозавр": {
            "health1": 570,
            "healthInc": 20,
            "stamina1": 300,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 6000,
            "foodInc": 10,
            "weight1": 440,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        },
        "Трицератопс": {
            "health1": 375,
            "healthInc": 20,
            "stamina1": 150,
            "staminaInc": 10,
            "oxygen1": 150,
            "oxygenInc": 10,
            "food1": 3000,
            "foodInc": 10,
            "weight1": 365,
            "weightInc": 2,
            "damage1": 100,
            "damageInc": 5
        }
    };
// if a stat has x levelups, the stat is in the top percentiles[x] %. For 33 or more level, the probability is less than 0.01 %
var percentiles = Array(100.00, 100.00, 100.00, 100.00, 99.99, 99.97, 99.89, 99.67, 99.17, 98.13, 96.23, 93.09, 88.39, 81.93, 73.78, 64.28, 53.98, 43.58, 33.76, 25.06, 17.81, 12.11, 7.88, 4.91, 2.92, 1.67, 0.91, 0.48, 0.24, 0.12, 0.05, 0.02, 0.01);

    changeCreature(wildStatCalcDiv.innerHTML);
}

function changeCreature(creature) {
    if (wildCreatureStats[creature] == null)
        creature = Object.keys(wildCreatureStats)[0];

    stats = wildCreatureStats[creature];
    var tableRows = '';
    for (var id in wildStatCalcStats) {
        if (stats[id + '1']) {
            var unit = '';
            if (id === 'damage')
                unit = ' [%]';
            tableRows += '<tr><td><a href="/' + wildStatCalcStats[id] + '">' + wildStatCalcStats[id] + unit + '</a></td><td><input type="number" min="' + stats[id + '1'] + '" max="100000" maxlength="6" step="0.1" value="' + stats[id + '1'] + '" id="wildStatCalc' + id + 'input" onchange="calcNatStats()" style="width:5em"></td><td id="wildStatCalc' + id + '"></td></tr>';
        }
    }
    tableRows += '<tr><td><a href="/Speed">Скорость [%]</a></td><td title="Дикие существа всегда имеют Скорость 100%">100</td><td id="wildStatCalcSpeed"></td></tr>';
    var creatureSelect = '<select onchange="changeCreature(this.value)">';
    for (var c in wildCreatureStats) {
        creatureSelect += '<option' + (c === creature ? ' selected' : '') + '>' + c + '</option>';
    }
    creatureSelect += '</select>';
    wildStatCalcDiv.innerHTML = '<table class="wikitable">' +
            '<tr><th colspan="3">' + creatureSelect + ' Уровень <input type="number" min="1" max="100000" maxlength="6" value="1" id="wildStatCalcLevelInput" onchange="calcNatStats()" style="width:5em"></th></tr>' +
            '<tr><th>Характеристика</th><th>Значение</th><th>Треб. уровней</th></tr>' +
            tableRows +
            '</table>';
    calcNatStats();
}

function calcNatStats() {
    // calculate according level
    if (stats) {
        var totallevel = 1; // 1 is first level
        var levels = [];
        var stat = 0;
        var levelEl = null;
        var percentile = '';
        for (var id in wildStatCalcStats) {
            if (stats[id + '1']) {
                stat = document.getElementById('wildStatCalc' + id + 'input').value;
                if (stats[id + '1'] && stats[id + 'Inc'] && stat >= stats[id + '1']) {
                    var level = Math.round((stat - stats[id + '1']) / (stats[id + 'Inc'] * stats[id + '1'] / 100));
                    levels[id] = level;
                    levelEl = document.getElementById('wildStatCalc' + id);
                    levelEl.innerHTML = level;
                    if (level > 32)
                        percentile = 0.01;
                    else
                        percentile = percentiles[level];
                    levelEl.title = 'This level is in the top ' + percentile + '% compared to all wild level 120 creatures.';
                    totallevel += level;
                }
            }
        }
        var levelInput = document.getElementById('wildStatCalcLevelInput').value;
        document.getElementById('wildStatCalcSpeed').innerHTML = levelInput - totallevel;
        var hue = 0;
        for (var id in wildStatCalcStats) {
            if (stats[id + '1']) {
                hue = 0;
                if (totallevel > 1) {
                    hue = Math.round(120 * levels[id] / 35);
                }
                if (hue > 120)
                    hue = 120;
                document.getElementById('wildStatCalc' + id).parentElement.style.backgroundColor = 'hsl(' + hue + ', 100%, 85%)';
            }
        }
    }
}