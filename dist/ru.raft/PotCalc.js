/* Калькулятор на странице "Котелок" */
//console.log('Pot Calc v0.7');

var PotCalc = {};

PotCalc.data = { //default
    price: {
        base_hunger: 1,
        adv_hunger: 1.3,
        clay: 5,
        small_fish: 0,
        medium_fish: 0,
        big_fish: 0,
        shark_meat: 0,
        small_meat: 0,
        big_meat: 0, //not used
        veggies: 0,
        fruits: 0,
        berries: 30,
        silver: 30,
        mushroom: 30,
        pufferfish: 30,
        egg: 0,
        milk: 5,
    },
    fried: {
        small_fish: 20,
        medium_fish: 35,
        big_fish: 30 * 3, //3 portions
        shark_meat: 35,
        small_meat: 35,
        big_meat: 35, //not used
        veggies: 15,
        fruits: 16,
        berries: 7,
        silver: 10,
        mushroom: 10,
        pufferfish: 0,
        egg: 15,
        milk: 10 * 1.3, //bonus hunger
    },
    foods: {},
};
PotCalc.data.foods['Объедки'] = {small_fish:1};
PotCalc.data.foods['Простое рыбное жаркое'] = {small_fish:2,veggies:2};
PotCalc.data.foods['Скат делюкс'] = {big_fish:1,veggies:2,mushroom:1};
PotCalc.data.foods['Салат из лосося'] = {big_fish:1,fruits:2,silver:1};
PotCalc.data.foods['Овощной суп'] = {veggies:4};
PotCalc.data.foods['Рыбное жаркое'] = {medium_fish:2,egg:1,milk:1};
PotCalc.data.foods['Компот'] = {fruits:3,berries:1};
PotCalc.data.foods['Цыпленок с кокосом'] = {fruits:1,mushroom:1,small_meat:2};
PotCalc.data.foods['Омлет с грибами'] = {egg:2,veggies:1,mushroom:1};
PotCalc.data.foods['Ножка с джемом'] = {berries:2,small_meat:2};
PotCalc.data.foods['Акулий ужин'] = {shark_meat:2,mushroom:1,silver:1};
PotCalc.data.foods['Бульон из головы'] = {fruits:3,berries:1};
PotCalc.data.foods['Компот'] = {pufferfish:2,veggies:1,milk:1};

//Синонимы (будущая совместимость)
PotCalc.data.foods['Ужин из акулы'] = PotCalc.data.foods['Акулий ужин'];
PotCalc.data.foods['Фруктовая нарезка'] = PotCalc.data.foods['Компот'];

PotCalc.getNum = function(s) {
    if (!s) return 0;
    s = s.trim();
    var m = s.replace(',','.').match(/[\d.-]+/);
    if(!m) return 0;
    return parseFloat(m[0]);
};

PotCalc.addInput = function(parent, name, id) {
    var e_id = 'price_' + id;
    var wrap = document.createElement('div');
    wrap.style = 'display: table';
    var wrap_name = document.createElement('div');
    wrap_name.innerText = name + ':';
    wrap_name.style = 'width:230px;display: table-cell';
    var wrap_input = document.createElement('div');
    wrap_input.style = 'width:100px;display: table-cell';
    var input = document.createElement('input');
    input.id = e_id;
    input.value = PotCalc.data.price[id]; //means error
    input.setAttribute('size',4);
    wrap_input.appendChild(input);
    wrap.appendChild(wrap_name);
    wrap.appendChild(wrap_input);
    parent.appendChild(wrap);
    //parent.appendChild(document.createElement('br'));
    return input;
};

PotCalc.addHeader = function(parent, name) {
    var header = document.createElement('div');
    header.innerText = name;
    header.style = 'font-size:18px';
    parent.appendChild(header);
    return header;
};

PotCalc.addBR = function(parent) {
    var br = document.createElement('br');
    parent.appendChild(br);
};


function AddPotCalc() {
    var d = document;
    var log = console.log;
    //Get target table...
    var t = d.querySelector('.wikitable'); //целевая таблица
    if (!t) return;
    //Load data
    if (localStorage.cookpot_save !== undefined) {
        try {
            var saved = JSON.parse(localStorage.cookpot_save);
            for (var pkey in saved) {
                PotCalc.data.price[pkey] = saved[pkey];
            }
        } catch(e){
            //
        }
    }
    //Get column names and indexes...
    var all_th = t.querySelectorAll('th');
    var i_name, i_time, i_hunger, i_hunger2, i_cnt, i_profit; //Номера столбцов
    for(var i=0; i<all_th.length; i++) {
        var name = all_th[i].innerText.replace(/[\r\n]/,'').trim();
        switch (name) {
            case "Название": i_name = i; break;
            case "Время": i_time = i; break;
            case "Сытость": i_hunger = i; break;
            case "Доп.сытость": i_hunger2 = i; break;
            case "Порций": i_cnt = i; break;
            case "Выгода": i_profit = i; break;
            //default: alert('Unknown column: '+name); //debug
        }
    }
    if (!i_name || !i_time || !i_hunger || !i_hunger2 || !i_cnt || !i_profit) {
        return log('Bad table format!',i_name,i_time,
            i_hunger,i_hunger2,i_cnt,i_profit);
    }
    //Get data...
    var data = PotCalc.data;
    var foods = data.foods;
    var tr = t.querySelectorAll('tr');
    for(var i=1; i<tr.length; i++) {
        var arr = tr[i].cells;
        var name = arr[i_name].innerText.trim();
        if (!foods[name]) {
            log('Error! Recipe not found:',name);
            continue;
        }
        foods[name] = {
            name: name,
            time: PotCalc.getNum(arr[i_time].innerText),
            hunger: PotCalc.getNum(arr[i_hunger].innerText),
            hunger2: PotCalc.getNum(arr[i_hunger2].innerText),
            cnt: PotCalc.getNum(arr[i_cnt].innerText),
            profit: 0,
            recipe: foods[name],
        };
    }
    //Show Calc
    var calc = d.querySelector('#pot_calc');
    if (!calc) return;
    calc.innerText = ''; //debug
    calc.style = 'border:1px';
    var title = PotCalc.addHeader(calc,'Калькулятор выгоды');
    title.style = 'font-size:24px';
    PotCalc.addHeader(calc,'Ценность блюд');
    PotCalc.addInput(calc,'Сытость','base_hunger');
    PotCalc.addInput(calc,'Доп.сытость','adv_hunger');
    var checkbox=PotCalc.addInput(calc,'Вычитать жареные ингредиенты','fried');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    PotCalc.addBR(calc);
    PotCalc.addHeader(calc,'Стоиомость добычи ресурсов');
    var comment = PotCalc.addHeader(calc,'(в тех же единицах)');
    comment.style = 'font-size:14px';
    PotCalc.addInput(calc,'Глина','clay');
    PotCalc.addInput(calc,'Мелкая рыба','small_fish');
    PotCalc.addInput(calc,'Средняя рыба','medium_fish');
    PotCalc.addInput(calc,'Большая рыба','big_fish');
    PotCalc.addInput(calc,'Акулье мясо','shark_meat');
    PotCalc.addInput(calc,'Маленькое мясо','small_meat');
    PotCalc.addInput(calc,'Большое мясо','big_meat');
    PotCalc.addInput(calc,'Овощ','veggies');
    PotCalc.addInput(calc,'Фрукт','fruits');
    PotCalc.addInput(calc,'Красная ягода','berries');
    PotCalc.addInput(calc,'Серебристая водоросль','silver');
    PotCalc.addInput(calc,'Гриб','mushroom');
    PotCalc.addInput(calc,'Голова иглобрюха','pufferfish');
    PotCalc.addInput(calc,'Яйцо','egg');
    PotCalc.addInput(calc,'Молоко','milk');
    var button = d.createElement('input');
    button.type = 'button';
    button.value = 'Пересчитать выгоду';
    button.onclick = function() {
        //Read user input
        for (var key in data.price) {
            var el = d.querySelector('#price_' + key);
            if (!el) continue;
            data.price[key] = PotCalc.getNum(el.value);
        }
        //Save data
        localStorage.cookpot_save = JSON.stringify(data.price);
        //Calc new profit & change table
        for(var i=1; i<tr.length; i++) {
            var arr = tr[i].cells;
            var name = arr[i_name].innerText.trim();
            if (!foods[name]) {
                tr[i].style.backgroundColor = '#fff'; //error: unkonwn dish
                continue;
            }
            var f = foods[name];
            //plus
            var profit = f.cnt * (f.hunger * data.price.base_hunger
                + f.hunger2 * data.price.adv_hunger);
            //minus
            for (var ing in f.recipe) {
                profit -= f.recipe[ing] * data.price[ing];
            }
            //minus clay
            profit -= f.cnt * data.price.clay * 0.5;
            //minus fried
            if (checkbox.checked) {
                for (var ing in f.recipe) {
                    profit -= f.recipe[ing] * data.fried[ing];
                    //Костыль!
                    if (name == 'Компот') profit+=11; //Арбуз 5%, а не 16%
                }
            }
            //write to table
            arr[i_profit].setAttribute('data-sort-value', profit.toFixed(3));
            if (profit < -10) tr[i].style.backgroundColor = '#e0a7a7';
            else if (profit < 0) tr[i].style.backgroundColor = '#f6cb9f';
            else if (profit <= 10) tr[i].style.backgroundColor = '#ffe9a7';
            else tr[i].style.backgroundColor = '#b6d7a8';
            if (profit > 0) profit = '+' + profit.toFixed(0);
            else profit = profit.toFixed(0);
            profit += '%';
            arr[i_profit].innerText = profit;
        }
    };
    calc.appendChild(button);
    //Description
    var calc_desc = d.querySelector('#pot_calc_desc');
    if (calc_desc) calc_desc.style.display = '';
}
AddPotCalc();