var TabStats = ["value", "level", "getElementById", "innerHTML", "maxLevel", "length", "Spent", "Amount", "levelSpent", ".", "replace", "Multiplier", "health", "stamina", "oxygen", "food", "water", "weight", "melee", "speed", "fortitude", "crafting"];
var engramTableDiv = document.getElementById('HumanStat');
engramTableDiv.innerHTML = '<table class="wikitable"><thead><tr><th>Уровень</th><th><input type="text" id="level" value="94" onkeyup="levelChanged()" maxlength="4"></th><th colspan="3">Уровень<span id="levelSpent">1</span>/<span id="maxLevel">94</span></th></tr><tr><th>Характеристика</th><th>Оч. испол.</th><th>Значение</th><th></th><th></th></tr></thead><tbody>'+
//Здоровье
'<tr><td>'+
'<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/94/Health.png/30px-Health.png" style="margin-right: 7px;"/>Здоровье</td><td><span id="healthSpent">0</span></td><td><span id="healthAmount">100</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;health&apos; , 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;health&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;health&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;health&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr>'+
//Выносливость
'<tr><td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8d/Stamina.png/30px-Stamina.png" style="margin-right: 7px;"/>Выносливость</td><td><span id="staminaSpent">0</span></td><td><span id="staminaAmount">100</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;stamina&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;stamina&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;stamina&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;stamina&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Кислород
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/19/Oxygen.png/30px-Oxygen.png" style="margin-right: 7px;"/>Кислород</td><td><span id="oxygenSpent">0</span></td><td><span id="oxygenAmount">100</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;oxygen&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;oxygen&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;oxygen&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;oxygen&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Еда
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c6/Food.png/30px-Food.png" style="margin-right: 7px;"/>Еда</td><td><span id="foodSpent">0</span></td><td><span id="foodAmount">100</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;food&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;food&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos; food&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;food&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Вода
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Water.png/30px-Water.png" style="margin-right: 7px;"/>Вода</td><td><span id="waterSpent">0</span></td><td><span id="waterAmount">100</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;water&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;water&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;water&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;water&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Вес
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6f/Weight.png/30px-Weight.png" style="margin-right: 7px;"/>Вес</td><td><span id="weightSpent">0</span></td><td><span id="weightAmount">100</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;weight&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;weight&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;weight&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;weight&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Урон
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/01/Melee_Damage.png/30px-Melee_Damage.png" style="margin-right: 7px;"/>Урон</td><td><span id="meleeSpent">0</span></td><td><span id="meleeAmount">100</span>%</td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;melee&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;melee&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;melee&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;melee&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Скорость
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e1/Movement_Speed.png/30px-Movement_Speed.png" style="margin-right: 7px;"/>Скорость</td><td><span id="speedSpent">0</span></td><td><span id="speedAmount">100</span>%</td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;speed&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;speed&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;speed&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;speed&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Стойкость
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c6/Fortitude.png/30px-Fortitude.png" style="margin-right: 7px;"/>Стойкость</td><td><span id="fortitudeSpent">0</span></td><td><span id="fortitudeAmount">0</span></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;fortitude&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;fortitude&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;fortitude&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;fortitude&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr><tr>'+
//Крафт
'<td><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/69/Crafting_Speed.png/30px-Crafting_Speed.png" style="margin-right: 7px;"/>Крафт</td><td><span id="craftingSpent">0</span></td><td><span id="craftingAmount">100</span>%</td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;crafting&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/a/a5/PlusButton.png"/></a> <a class="statButton" onclick="decrease(&apos;crafting&apos;, 1)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/8/81/MinButton.png"/></a></td><td style="text-align: center;"><a class="statButton" onclick="increase(&apos;crafting&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/b/b4/Plus5Button.png"/></a> <a class="statButton" onclick="decrease(&apos;crafting&apos;, 5)"><img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/5/50/Min5Button.png"/></a></td></tr></tbody></table>';

function levelChanged() {
    var LvlPl = document.getElementById('level').value;
    document.getElementById('maxLevel').innerHTML = LvlPl,
    resetStats();
}
function resetStats() {
    for (var LvlPl = 0; LvlPl < stats[TabStats[5]]; LvlPl++) {
        document.getElementById(stats[LvlPl] + TabStats[6]).innerHTML = 0,
        document.getElementById(stats[LvlPl] + TabStats[7]).innerHTML = baseStats[stats[LvlPl]]
    }
    ;document.getElementById(TabStats[8]).innerHTML = 1;
}

function increase(LvlPl, _0xe97cx5) {
    var _0xe97cx7 = document.getElementById(LvlPl + TabStats[6])
      , _0xe97cx9 = (Number(_0xe97cx7.innerHTML),
    document.getElementById(TabStats[8]))
      , _0xe97cxa = Number(_0xe97cx9.innerHTML)
      , _0xe97cxb = Number(document.getElementById('level').value);
    if (_0xe97cxa != _0xe97cxb) {
        1 != _0xe97cx5 && _0xe97cxa + _0xe97cx5 > _0xe97cxb && (_0xe97cx5 = _0xe97cxb - _0xe97cxa);
        var _0xe97cxc = Number(document.getElementById(LvlPl + TabStats[7]).innerHTML)
          , _0xe97cxd = Number(_0xe97cxc + _0xe97cx5 * baseIncrease[LvlPl]);
        _0xe97cx7.innerHTML = Number(_0xe97cx7.innerHTML) + Number(_0xe97cx5),
        document.getElementById(LvlPl + TabStats[7]).innerHTML = _0xe97cxd,
        _0xe97cx9.innerHTML = Number(_0xe97cx9.innerHTML) + _0xe97cx5;
    }
    ;
}
function decrease(LvlPl, _0xe97cx5) {
    var _0xe97cx7 = document.getElementById(LvlPl + TabStats[6])
      , _0xe97cx9 = Number(_0xe97cx7.innerHTML);
    if (0 != _0xe97cx9) {
        1 != _0xe97cx5 && 0 > _0xe97cx9 - _0xe97cx5 && (_0xe97cx5 = _0xe97cx9);
        var _0xe97cxa = Number(document.getElementById(LvlPl + TabStats[7]).innerHTML)
          , _0xe97cxb = Number(_0xe97cxa - _0xe97cx5 * baseIncrease[LvlPl]);
        _0xe97cx7.innerHTML = Number(_0xe97cx7.innerHTML) - Number(_0xe97cx5),
        document.getElementById(LvlPl + TabStats[7]).innerHTML = _0xe97cxb;
        var _0xe97cxc = document.getElementById(TabStats[8]);
        _0xe97cxc.innerHTML = Number(_0xe97cxc.innerHTML) - _0xe97cx5;
    }
    ;
}
var stats = [TabStats[12], TabStats[13], TabStats[14], TabStats[15], TabStats[16], TabStats[17], TabStats[18], TabStats[19], TabStats[20], TabStats[21]]
  , baseStats = {
    health: 100,
    stamina: 100,
    oxygen: 100,
    food: 100,
    water: 100,
    weight: 100,
    melee: 100,
    speed: 100,
    fortitude: 0,
    crafting: 100
}
  , baseIncrease = {
    health: 10,
    stamina: 10,
    oxygen: 20,
    food: 10,
    water: 10,
    weight: 10,
    melee: 5,
    speed: 2,
    fortitude: 2,
    crafting: 10
};