var dinoBaseDamage = {
    "Анкилозавр": 50,
    "Аргентавис": 20,
    "Большерогий олень": 30,
    "Бронтозавр": 60,
    "Карбонемис": 13,
    "Карнотавр": 37,
    "Дилофозавр": 10,
    "Диморфодон": 20,
    "Жаба": 12,
    "Додо": 5,
    "Дедикурус": 32,
    "Гигантопитек": 40,
    "Ихтиозавр": 20,
    "Лютоволк": 40,
    "Кетцалькоатль": 25,
    "Мамонт": 40,
    "Мегалодон": 40,
    "Мезопитек": 10,
    "Пахицелафазавр": 10,
    "Парацератерий": 45,
    "Паразавр": 10,
    "Плезиозавр": 75,
    "Птеранодон": 15,
    "Раптор": 15,
    "Саблезуб": 30,
    "Саркозух": 35,
    "Скорпион": 15,
    "Спинозавр": 50,
    "Стегозавр": 41,
    "Тираннозавр": 60,
    "Трицератопс": 32,
    "Фиомия": 10
};

var weaponDamage = {
    "Арбалет (Каменная стрела)": {
        melee: 0,
        damage: 95,
        torpor: 0
    },
    "Арбалет (Транк. стрела)": {
        melee: 0,
        damage: 35,
        torpor: 157.5
    },
    "Граната": {
        melee: 0,
        independent: 1,
        damage: 250,
        torpor: 0
    },
    "Деревянная дубинка": {
        melee: 1,
        damage: 5,
        torpor: 20
    },
    "Длинная винтовка (Пуля)": {
        melee: 0,
        damage: 220,
        torpor: 0
    },
    "Длинная винтовка (Дротик)": {
        melee: 0,
        damage: 26,
        torpor: 221
    },
    "Дробовик": {
        melee: 0,
        damage: 300,
        torpor: 0
    },
    "Заряд С4": {
        melee: 0,
        independent: 1,
        damage: 500,
        torpor: 0
    },
    "Каменная кирка": {
        melee: 1,
        damage: 20,
        torpor: 10
    },
    "Каменный топор": {
        melee: 1,
        damage: 20,
        torpor: 10
    },
    "Копье": {
        melee: 1,
        damage: 40,
        torpor: 0
    },
    "Копье(Бросок)": {
        melee: 0,
        independent: 1,
        damage: 50,
        torpor: 0
    },
    "Кулаки": {
        melee: 1,
        meleeOnly: 1,
        damage: 8,
        torpor: 14
    },
    "Лук (каменная стрела)": {
        melee: 0,
        damage: 50,
        torpor: 0
    },
    "Лук (Транк. стрела)": {
        melee: 0,
        damage: 20,
        torpor: 90
    },
    "Металлическая кирка": {
        melee: 1,
        damage: 32,
        torpor: 16
    },
    "Металлический топор": {
        melee: 0,
        damage: 40,
        torpor: 20
    },
    "Оружие дальнего боя (ближнего боя)": {
        melee: 1,
        damage: 10,
        torpor: 14
    },
    "Пика": {
        melee: 0,
        damage: 55,
        torpor: 0
    },
    "Подзорная труба": {
        melee: 1,
        meleeOnly: 1,
        damage: 8,
        torpor: 0
    },
    "Простой пистолет": {
        melee: 0,
        damage: 80,
        torpor: 0
    },
    "Ракетница": {
        melee: 0,
        damage: 150,
        torpor: 0
    },
    "Рогатка": {
        melee: 0,
        damage: 14,
        torpor: 23.8
    },
    "Сигнальный пистолет": {
        melee: 1,
        meleeOnly: 1,
        damage: 8,
        torpor: 0
    },
    "Улучшенный пистолет": {
        melee: 0,
        damage: 35,
        torpor: 0
    },
    "Штурмовая винтовка": {
        melee: 0,
        damage: 40,
        torpor: 0
    }
};

var selectDino = '<select id="dinos" onchange="dinoChanged()">';
    for (var din in dinoBaseDamage) {
        selectDino += '<option value="' +  din + '">'  +  din + '</option>';    
    }
    selectDino += '</select>';

var selectWeapon = '<select id="weapons" onchange="weaponChanged()">';
    for (var wpn in weaponDamage) {
        selectWeapon += '<option value="' +  wpn + '">'  +  wpn + '</option>';    
    }
    selectWeapon += '</select>';


var damageTableDiv = document.getElementById('damageTable');
damageTableDiv.innerHTML = '<table width="550px" class="wikitable">'+
'<thead>'+
'<tr><th>Заполните поля в калькуляторе для вывода абсолютного урона</th>'+
'</tr></thead>'+
'<tbody>'+
'<tr class="alt">'+
'<td style="text-align:center;"><input id="human" type="radio" name="type" value="human" onchange="typeChanged()" checked=""> Персонаж</td>'+
'</tr><tr>'+
'<td style="text-align:center;"><input type="radio" name="type" value="dinosaur" onchange="typeChanged()"> Существо</td>'+
'</tr></tbody></table>'+

'<table id="humanInput" class="wikitable" width="550px">'+
'<tbody><tr class="alt">'+
'<td>Оружие</td>'+
'<td>'+selectWeapon+'</td>'+
'</tr><tr>'+
'<td><b>Урон в ближнем бою (%)</b></td>'+
'<td><input id="meleeDamage" type="text" value="100" onkeyup="meleeDamageChanged()"></td>'+
'</tr><tr class="alt">'+
'<td><b>Урон оружия (%)</b></td>'+
'<td><input id="weaponDamage" type="text" value="100" onkeyup="weaponDamageChanged()"></td>'+
'</tr><tr>'+
'<td><b>Абсолютный урон на:</b></td>'+
'<td><span id="weaponDamageOutput">500</span></td>'+
'</tr><tr class="alt">'+
'<td><b>Абсолютное оглушение:</b></td>'+
'<td><span id="weaponTorporOutput">0</span></td>'+
'</tr></tbody></table>'+

'<table id="dinosaurInput" style="display: none;" class="wikitable" width="550px">'+
'<tbody><tr><td><b>Существо</b></td>'+
'<td>'+selectDino +'</td>'+
'</tr><tr class="alt">'+
'<td><b>Урон существа</b> (%)</td>'+
'<td><input id="dinoDamage" type="text" value="100" onkeyup="damageChanged()"></td>'+
'</tr><tr>'+
'<td><b>Абсолютный урон на выходе</b></td>'+
'<td><span id="dinoDamageOutput">100</span></td>'+
'</tr></tbody></table>'+

'<table width="550px"><thead><tr class="alt">'+
'<td colspan="2" style="text-align:center;"><span id="errorMessage" style="color:red; text-align:center;"></span></td>'+
'</tr></thead></table>';

window.onload = function() {
    typeChanged();
};

function dinoChanged() {
    var dinoDamage = checkInput("dinoDamage");
    if (dinoDamage) {
        resetError();
        var dinos = document.getElementById("dinos");
        var selectedDino = dinos.options[dinos.selectedIndex].value;
        var selectedDinoDamage = dinoBaseDamage[selectedDino];
        var ValueDinoDamage = document.getElementById("dinoDamage").value;
        var TotalDamage = Math.round(selectedDinoDamage * (ValueDinoDamage / 100));
        document.getElementById("dinoDamageOutput").innerHTML = TotalDamage;
    }
}

function damageChanged() {
    dinoChanged();
}

function checkInput(param) {
    var valueparam = document.getElementById(param).value;
    if (valueparam < 100) {
        document.getElementById("errorMessage").innerHTML = "Урон не может быть меньше, чем 100%.";
        return false;
    }
    
    return true;
}

function resetError() {
    document.getElementById("errorMessage").innerHTML = "";
}

function weaponChanged() {
    var inputmelee = checkInput("meleeDamage");
    var inputwpn = checkInput("weaponDamage");
    if (inputmelee && inputwpn) {
        resetError();
        var dinos = document.getElementById("weapons");
        var valuedino = dinos.options[dinos.selectedIndex].value;
        var dmgmelee = weaponDamage[valuedino].melee;
        var selectedDinoDamage = weaponDamage[valuedino].damage;
        var damagetorpor = weaponDamage[valuedino].torpor;
        var valuemelee = document.getElementById("meleeDamage").value;
        var ValueDinoDamage = document.getElementById("weaponDamage").value;
        var slctddinodmg = selectedDinoDamage;
        var dmgtrpr = damagetorpor;
        
        if (dmgmelee) {
            slctddinodmg *= Math.round(valuemelee / 100);
            dmgtrpr *= Math.round(valuemelee / 100);
        }
        
        if (!weaponDamage[valuedino].meleeOnly) {
            slctddinodmg *= Math.round(ValueDinoDamage / 100);
            dmgtrpr *= Math.round(ValueDinoDamage / 100);
        }
        
        if (weaponDamage[valuedino].independent) {
            slctddinodmg = selectedDinoDamage;
            damageOutpurTorpor = selectedDinoDamage;
        }
        document.getElementById("weaponDamageOutput").innerHTML = slctddinodmg;
        document.getElementById("weaponTorporOutput").innerHTML = dmgtrpr;
    }
}

function meleeDamageChanged() {
    weaponChanged();
}

function weaponDamageChanged() {
    weaponChanged();
}

function typeChanged() {
    var chkhuman = document.getElementById("human").checked;
    if (chkhuman) {
        document.getElementById("humanInput").style.display = "";
        document.getElementById("dinosaurInput").style.display = 'none';
        weaponChanged();
    } else {
        document.getElementById("humanInput").style.display = 'none';
        document.getElementById("dinosaurInput").style.display = "";
        dinoChanged();
    }
}