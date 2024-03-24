$(document).ready(function () {
     eval(document.getElementById("armorsearchdata").innerHTML);
});

function sortAlphabeticalClicked() {
    sortAlphabeticalChecked = true;
    sortHighToLowChecked = false;
    sortLowToHighChecked = false;
}

function sortHighToLowClicked() {
    sortAlphabeticalChecked = false;
    sortHighToLowChecked = true;
    sortLowToHighChecked = false;
}

function sortLowToHighClicked() {
    sortAlphabeticalChecked = false;
    sortHighToLowChecked = false;
    sortLowToHighChecked = true;
}

function headSelected() {
    armor_type = "head";
    armor_menu.disabled = false;
    armor_lvl_menu.disabled = false;
    btnSearch.disabled = true;
    btnWeight.disabled = true;

    for (var trnum = 1; trnum <= 70; trnum++) {
        document.getElementById("tr"+trnum).innerHTML = "";
    }

    $("#armor_menu").empty();

    for (var head_opt_id in head_armor) {
        var head_opt_name = head_armor[head_opt_id].name;
 
        var head_opt = document.createElement("option");
        head_opt.text = head_opt_name;
        head_opt.value = head_opt_id;
        armor_menu.add(head_opt);
    }
}

function chestSelected() {
    armor_type = "chest";
    armor_menu.disabled = false;
    armor_lvl_menu.disabled = false;
    btnSearch.disabled = true;
    btnWeight.disabled = true;

    for (var trnum = 1; trnum <= 70; trnum++) {
        document.getElementById("tr"+trnum).innerHTML = "";
    }
 
    $("#armor_menu").empty();
 
    for (var chest_opt_id in chest_armor) {
        var chest_opt_name = chest_armor[chest_opt_id].name;
 
        var chest_opt = document.createElement("option");
        chest_opt.text = chest_opt_name;
        chest_opt.value = chest_opt_id;
        armor_menu.add(chest_opt);
    }
}

function handsSelected() {
    armor_type = "hands";
    armor_menu.disabled = false;
    armor_lvl_menu.disabled = false;
    btnSearch.disabled = true;
    btnWeight.disabled = true;

    for (var trnum = 1; trnum <= 70; trnum++) {
        document.getElementById("tr"+trnum).innerHTML = "";
    }
 
    $("#armor_menu").empty();
 
    for (var hands_opt_id in hands_armor) {
        var hands_opt_name = hands_armor[hands_opt_id].name;
 
        var hands_opt = document.createElement("option");
        hands_opt.text = hands_opt_name;
        hands_opt.value = hands_opt_id;
        armor_menu.add(hands_opt);
    }
}

function legsSelected() {
    armor_type = "legs";
    armor_menu.disabled = false;
    armor_lvl_menu.disabled = false;
    btnSearch.disabled = true;
    btnWeight.disabled = true;

    for (var trnum = 1; trnum <= 70; trnum++) {
        document.getElementById("tr"+trnum).innerHTML = "";
    }
 
    $("#armor_menu").empty();
 
    for (var legs_opt_id in legs_armor) {
        var legs_opt_name = legs_armor[legs_opt_id].name;
 
        var legs_opt = document.createElement("option");
        legs_opt.text = legs_opt_name;
        legs_opt.value = legs_opt_id;
        armor_menu.add(legs_opt);
    }
}

function armorSelectedIndexChanged() {
switch(armor_type) {
case "head":
head_compare_id = armor_menu.options[armor_menu.selectedIndex].value;
head_compare_lvl = armor_lvl_menu.options[armor_lvl_menu.selectedIndex].value;
btnSearch.disabled = false;
btnWeight.disabled = true;

switch(head_compare_lvl) {
    case "0":
        arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        break;
    case "1":
        if (head_armor[head_compare_id].lvl1 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl1.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "2":
        if (head_armor[head_compare_id].lvl2 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl2.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "3":
        if (head_armor[head_compare_id].lvl3 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl3.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "4":
        if (head_armor[head_compare_id].lvl4 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl4.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "5":
        if (head_armor[head_compare_id].lvl5 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "6":
        if (head_armor[head_compare_id].lvl6 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl6.split("|");
        }
        else if (head_armor[head_compare_id].lvl5 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }   
        break;
    case "7":
        if (head_armor[head_compare_id].lvl7 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl7.split("|");
        }
        else if (head_armor[head_compare_id].lvl5 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "8":
        if (head_armor[head_compare_id].lvl8 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl8.split("|");
        }
        else if (head_armor[head_compare_id].lvl5 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "9":
        if (head_armor[head_compare_id].lvl9 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl9.split("|");
        }
        else if (head_armor[head_compare_id].lvl5 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
    case "10":
        if (head_armor[head_compare_id].lvl10 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl10.split("|");
        }
        else if (head_armor[head_compare_id].lvl5 !== undefined) {
            arrCompareHead = head_armor[head_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHead = head_armor[head_compare_id].lvl0.split("|");
        }
        break;
}
arrCompareHead[10] = head_armor[head_compare_id].poise;
arrCompareHead[11] = head_armor[head_compare_id].weight;

if (isNaN(arrCompareHead[9]) === true) {
    arrCompareHead[9] = "0.0";
}

intCount = 0;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

intCount++;

switch(compare_stat) {
    case "physical":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "strike":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "slash":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "thrust":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "magic":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "fire":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "lightning":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "bleed":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "poison":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "curse":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "poise":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "weight":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
}
break;
case "chest":
chest_compare_id = armor_menu.options[armor_menu.selectedIndex].value;
chest_compare_lvl = armor_lvl_menu.options[armor_lvl_menu.selectedIndex].value;
btnSearch.disabled = false;
btnWeight.disabled = true;

switch(chest_compare_lvl) {
    case "0":
        arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        break;
    case "1":
        if (chest_armor[chest_compare_id].lvl1 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl1.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "2":
        if (chest_armor[chest_compare_id].lvl2 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl2.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "3":
        if (chest_armor[chest_compare_id].lvl3 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl3.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "4":
        if (chest_armor[chest_compare_id].lvl4 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl4.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "5":
        if (chest_armor[chest_compare_id].lvl5 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl5.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "6":
        if (chest_armor[chest_compare_id].lvl6 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl6.split("|");
        }
        else if (chest_armor[chest_compare_id].lvl5 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl5.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }   
        break;
    case "7":
        if (chest_armor[chest_compare_id].lvl7 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl7.split("|");
        }
        else if (chest_armor[chest_compare_id].lvl5 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl5.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "8":
        if (chest_armor[chest_compare_id].lvl8 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl8.split("|");
        }
        else if (chest_armor[chest_compare_id].lvl5 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl5.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "9":
        if (chest_armor[chest_compare_id].lvl9 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl9.split("|");
        }
        else if (chest_armor[chest_compare_id].lvl5 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl5.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
    case "10":
        if (chest_armor[chest_compare_id].lvl10 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl10.split("|");
        }
        else if (chest_armor[chest_compare_id].lvl5 !== undefined) {
            arrCompareChest = chest_armor[chest_compare_id].lvl5.split("|");
        }
        else {
            arrCompareChest = chest_armor[chest_compare_id].lvl0.split("|");
        }
        break;
}
arrCompareChest[10] = chest_armor[chest_compare_id].poise;
arrCompareChest[11] = chest_armor[chest_compare_id].weight;

if (isNaN(arrCompareChest[9]) === true) {
    arrCompareChest[9] = "0.0";
}

intCount = 0;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

intCount++;

switch(compare_stat) {
    case "physical":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "strike":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "slash":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "thrust":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "magic":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "fire":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "lightning":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "bleed":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "poison":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "curse":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "poise":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "weight":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
}
break;
case "hands":
hands_compare_id = armor_menu.options[armor_menu.selectedIndex].value;
hands_compare_lvl = armor_lvl_menu.options[armor_lvl_menu.selectedIndex].value;
btnSearch.disabled = false;
btnWeight.disabled = true;

switch(hands_compare_lvl) {
    case "0":
        arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        break;
    case "1":
        if (hands_armor[hands_compare_id].lvl1 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl1.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "2":
        if (hands_armor[hands_compare_id].lvl2 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl2.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "3":
        if (hands_armor[hands_compare_id].lvl3 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl3.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "4":
        if (hands_armor[hands_compare_id].lvl4 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl4.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "5":
        if (hands_armor[hands_compare_id].lvl5 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "6":
        if (hands_armor[hands_compare_id].lvl6 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl6.split("|");
        }
        else if (hands_armor[hands_compare_id].lvl5 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }   
        break;
    case "7":
        if (hands_armor[hands_compare_id].lvl7 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl7.split("|");
        }
        else if (hands_armor[hands_compare_id].lvl5 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "8":
        if (hands_armor[hands_compare_id].lvl8 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl8.split("|");
        }
        else if (hands_armor[hands_compare_id].lvl5 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "9":
        if (hands_armor[hands_compare_id].lvl9 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl9.split("|");
        }
        else if (hands_armor[hands_compare_id].lvl5 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
    case "10":
        if (hands_armor[hands_compare_id].lvl10 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl10.split("|");
        }
        else if (hands_armor[hands_compare_id].lvl5 !== undefined) {
            arrCompareHands = hands_armor[hands_compare_id].lvl5.split("|");
        }
        else {
            arrCompareHands = hands_armor[hands_compare_id].lvl0.split("|");
        }
        break;
}
arrCompareHands[10] = hands_armor[hands_compare_id].poise;
arrCompareHands[11] = hands_armor[hands_compare_id].weight;

if (isNaN(arrCompareHands[9]) === true) {
    arrCompareHands[9] = "0.0";
}

intCount = 0;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

intCount++;

switch(compare_stat) {
    case "physical":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "strike":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "slash":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "thrust":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "magic":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "fire":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "lightning":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "bleed":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "poison":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "curse":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "poise":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "weight":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
}
break;
case "legs":
legs_compare_id = armor_menu.options[armor_menu.selectedIndex].value;
legs_compare_lvl = armor_lvl_menu.options[armor_lvl_menu.selectedIndex].value;
btnSearch.disabled = false;
btnWeight.disabled = true;

switch(legs_compare_lvl) {
    case "0":
        arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        break;
    case "1":
        if (legs_armor[legs_compare_id].lvl1 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl1.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "2":
        if (legs_armor[legs_compare_id].lvl2 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl2.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "3":
        if (legs_armor[legs_compare_id].lvl3 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl3.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "4":
        if (legs_armor[legs_compare_id].lvl4 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl4.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "5":
        if (legs_armor[legs_compare_id].lvl5 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl5.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "6":
        if (legs_armor[legs_compare_id].lvl6 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl6.split("|");
        }
        else if (legs_armor[legs_compare_id].lvl5 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl5.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }   
        break;
    case "7":
        if (legs_armor[legs_compare_id].lvl7 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl7.split("|");
        }
        else if (legs_armor[legs_compare_id].lvl5 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl5.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "8":
        if (legs_armor[legs_compare_id].lvl8 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl8.split("|");
        }
        else if (legs_armor[legs_compare_id].lvl5 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl5.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "9":
        if (legs_armor[legs_compare_id].lvl9 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl9.split("|");
        }
        else if (legs_armor[legs_compare_id].lvl5 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl5.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
    case "10":
        if (legs_armor[legs_compare_id].lvl10 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl10.split("|");
        }
        else if (legs_armor[legs_compare_id].lvl5 !== undefined) {
            arrCompareLegs = legs_armor[legs_compare_id].lvl5.split("|");
        }
        else {
            arrCompareLegs = legs_armor[legs_compare_id].lvl0.split("|");
        }
        break;
}
arrCompareLegs[10] = legs_armor[legs_compare_id].poise;
arrCompareLegs[11] = legs_armor[legs_compare_id].weight;

if (isNaN(arrCompareLegs[9]) === true) {
    arrCompareLegs[9] = "0.0";
}

intCount = 0;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

intCount++;

switch(compare_stat) {
    case "physical":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "strike":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "slash":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "thrust":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "magic":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "fire":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "lightning":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "bleed":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "poison":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "curse":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "poise":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "weight":
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
}
break;
}
}

function armorSearch() {
switch(armor_type) {
case "head":
btnWeight.disabled = false;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (head_temp_id in head_armor) {

    if (head_temp_id === head_compare_id) continue;

    switch(head_compare_lvl) {
        case "0":
            arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            break;
        case "1":
            if (head_armor[head_temp_id].lvl1 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl1.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (head_armor[head_temp_id].lvl2 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl2.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (head_armor[head_temp_id].lvl3 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl3.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (head_armor[head_temp_id].lvl4 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl4.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (head_armor[head_temp_id].lvl6 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl6.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (head_armor[head_temp_id].lvl7 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl7.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (head_armor[head_temp_id].lvl8 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl8.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (head_armor[head_temp_id].lvl9 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl9.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (head_armor[head_temp_id].lvl10 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl10.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempHead[10] = head_armor[head_temp_id].poise;
    arrTempHead[11] = head_armor[head_temp_id].weight;
    
    if (isNaN(arrTempHead[9]) === true) {
        arrTempHead[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempHead[0]) >= parseFloat(arrCompareHead[0])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempHead[1]) >= parseFloat(arrCompareHead[1])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempHead[2]) >= parseFloat(arrCompareHead[2])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempHead[3]) >= parseFloat(arrCompareHead[3])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempHead[4]) >= parseFloat(arrCompareHead[4])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempHead[5]) >= parseFloat(arrCompareHead[5])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempHead[6]) >= parseFloat(arrCompareHead[6])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempHead[7]) >= parseFloat(arrCompareHead[7])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempHead[8]) >= parseFloat(arrCompareHead[8])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempHead[9]) >= parseFloat(arrCompareHead[9])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempHead[10]) >= parseFloat(arrCompareHead[10])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "weight":
            btnWeight.disabled = true;
            if (parseFloat(arrTempHead[11]) <= parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 11) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
case "chest":
btnWeight.disabled = false;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (chest_temp_id in chest_armor) {

    if (chest_temp_id === chest_compare_id) continue;

    switch(chest_compare_lvl) {
        case "0":
            arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            break;
        case "1":
            if (chest_armor[chest_temp_id].lvl1 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl1.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (chest_armor[chest_temp_id].lvl2 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl2.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (chest_armor[chest_temp_id].lvl3 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl3.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (chest_armor[chest_temp_id].lvl4 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl4.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (chest_armor[chest_temp_id].lvl6 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl6.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (chest_armor[chest_temp_id].lvl7 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl7.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (chest_armor[chest_temp_id].lvl8 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl8.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (chest_armor[chest_temp_id].lvl9 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl9.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (chest_armor[chest_temp_id].lvl10 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl10.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempChest[10] = chest_armor[chest_temp_id].poise;
    arrTempChest[11] = chest_armor[chest_temp_id].weight;
    
    if (isNaN(arrTempChest[9]) === true) {
        arrTempChest[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempChest[0]) >= parseFloat(arrCompareChest[0])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempChest[1]) >= parseFloat(arrCompareChest[1])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempChest[2]) >= parseFloat(arrCompareChest[2])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempChest[3]) >= parseFloat(arrCompareChest[3])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempChest[4]) >= parseFloat(arrCompareChest[4])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempChest[5]) >= parseFloat(arrCompareChest[5])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempChest[6]) >= parseFloat(arrCompareChest[6])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempChest[7]) >= parseFloat(arrCompareChest[7])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempChest[8]) >= parseFloat(arrCompareChest[8])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempChest[9]) >= parseFloat(arrCompareChest[9])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempChest[10]) >= parseFloat(arrCompareChest[10])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "weight":
            btnWeight.disabled = true;
            if (parseFloat(arrTempChest[11]) <= parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 11) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
case "hands":
btnWeight.disabled = false;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (hands_temp_id in hands_armor) {

    if (hands_temp_id === hands_compare_id) continue;

    switch(hands_compare_lvl) {
        case "0":
            arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            break;
        case "1":
            if (hands_armor[hands_temp_id].lvl1 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl1.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (hands_armor[hands_temp_id].lvl2 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl2.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (hands_armor[hands_temp_id].lvl3 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl3.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (hands_armor[hands_temp_id].lvl4 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl4.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (hands_armor[hands_temp_id].lvl6 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl6.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (hands_armor[hands_temp_id].lvl7 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl7.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (hands_armor[hands_temp_id].lvl8 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl8.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (hands_armor[hands_temp_id].lvl9 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl9.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (hands_armor[hands_temp_id].lvl10 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl10.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempHands[10] = hands_armor[hands_temp_id].poise;
    arrTempHands[11] = hands_armor[hands_temp_id].weight;
    
    if (isNaN(arrTempHands[9]) === true) {
        arrTempHands[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempHands[0]) >= parseFloat(arrCompareHands[0])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempHands[1]) >= parseFloat(arrCompareHands[1])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempHands[2]) >= parseFloat(arrCompareHands[2])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempHands[3]) >= parseFloat(arrCompareHands[3])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempHands[4]) >= parseFloat(arrCompareHands[4])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempHands[5]) >= parseFloat(arrCompareHands[5])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempHands[6]) >= parseFloat(arrCompareHands[6])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempHands[7]) >= parseFloat(arrCompareHands[7])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempHands[8]) >= parseFloat(arrCompareHands[8])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempHands[9]) >= parseFloat(arrCompareHands[9])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempHands[10]) >= parseFloat(arrCompareHands[10])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "weight":
            btnWeight.disabled = true;
            if (parseFloat(arrTempHands[11]) <= parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 11) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
case "legs":
btnWeight.disabled = false;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (legs_temp_id in legs_armor) {

    if (legs_temp_id === legs_compare_id) continue;

    switch(legs_compare_lvl) {
        case "0":
            arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            break;
        case "1":
            if (legs_armor[legs_temp_id].lvl1 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl1.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (legs_armor[legs_temp_id].lvl2 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl2.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (legs_armor[legs_temp_id].lvl3 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl3.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (legs_armor[legs_temp_id].lvl4 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl4.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (legs_armor[legs_temp_id].lvl6 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl6.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (legs_armor[legs_temp_id].lvl7 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl7.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (legs_armor[legs_temp_id].lvl8 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl8.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (legs_armor[legs_temp_id].lvl9 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl9.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (legs_armor[legs_temp_id].lvl10 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl10.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempLegs[10] = legs_armor[legs_temp_id].poise;
    arrTempLegs[11] = legs_armor[legs_temp_id].weight;
    
    if (isNaN(arrTempLegs[9]) === true) {
        arrTempLegs[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempLegs[0]) >= parseFloat(arrCompareLegs[0])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempLegs[1]) >= parseFloat(arrCompareLegs[1])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempLegs[2]) >= parseFloat(arrCompareLegs[2])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempLegs[3]) >= parseFloat(arrCompareLegs[3])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempLegs[4]) >= parseFloat(arrCompareLegs[4])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempLegs[5]) >= parseFloat(arrCompareLegs[5])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempLegs[6]) >= parseFloat(arrCompareLegs[6])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempLegs[7]) >= parseFloat(arrCompareLegs[7])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempLegs[8]) >= parseFloat(arrCompareLegs[8])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempLegs[9]) >= parseFloat(arrCompareLegs[9])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempLegs[10]) >= parseFloat(arrCompareLegs[10])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "weight":
            btnWeight.disabled = true;
            if (parseFloat(arrTempLegs[11]) <= parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 11) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
}
}

function statSelectedIndexChanged() {
switch(armor_type) {
case "head":
btnWeight.disabled = true;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

switch(compare_stat) {
    case "physical":
        btnSearch.value = "Find armor with equal or higher Physical Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "strike":
        btnSearch.value = "Find armor with equal or higher Strike Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "slash":
        btnSearch.value = "Find armor with equal or higher Slash Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "thrust":
        btnSearch.value = "Find armor with equal or higher Thrust Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "magic":
        btnSearch.value = "Find armor with equal or higher Magic Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "fire":
        btnSearch.value = "Find armor with equal or higher Fire Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "lightning":
        btnSearch.value = "Find armor with equal or higher Lightning Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "bleed":
        btnSearch.value = "Find armor with equal or higher Bleed Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "poison":
        btnSearch.value = "Find armor with equal or higher Poison Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "curse":
        btnSearch.value = "Find armor with equal or higher Curse Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "poise":
        btnSearch.value = "Find armor with equal or higher Poise";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
    case "weight":
        btnSearch.value = "Find armor with equal or lower Weight";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+head_armor[head_compare_id].name+'">'+head_armor[head_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHead[i]+'</td>';
                }
        }
        break;
}
break;
case "chest":
btnWeight.disabled = true;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

switch(compare_stat) {
    case "physical":
        btnSearch.value = "Find armor with equal or higher Physical Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "strike":
        btnSearch.value = "Find armor with equal or higher Strike Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "slash":
        btnSearch.value = "Find armor with equal or higher Slash Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "thrust":
        btnSearch.value = "Find armor with equal or higher Thrust Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "magic":
        btnSearch.value = "Find armor with equal or higher Magic Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "fire":
        btnSearch.value = "Find armor with equal or higher Fire Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "lightning":
        btnSearch.value = "Find armor with equal or higher Lightning Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "bleed":
        btnSearch.value = "Find armor with equal or higher Bleed Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "poison":
        btnSearch.value = "Find armor with equal or higher Poison Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "curse":
        btnSearch.value = "Find armor with equal or higher Curse Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "poise":
        btnSearch.value = "Find armor with equal or higher Poise";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
    case "weight":
        btnSearch.value = "Find armor with equal or lower Weight";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+chest_armor[chest_compare_id].name+'">'+chest_armor[chest_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareChest[i]+'</td>';
                }
        }
        break;
}
break;
case "hands":
btnWeight.disabled = true;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

switch(compare_stat) {
    case "physical":
        btnSearch.value = "Find armor with equal or higher Physical Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "strike":
        btnSearch.value = "Find armor with equal or higher Strike Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "slash":
        btnSearch.value = "Find armor with equal or higher Slash Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "thrust":
        btnSearch.value = "Find armor with equal or higher Thrust Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "magic":
        btnSearch.value = "Find armor with equal or higher Magic Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "fire":
        btnSearch.value = "Find armor with equal or higher Fire Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "lightning":
        btnSearch.value = "Find armor with equal or higher Lightning Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "bleed":
        btnSearch.value = "Find armor with equal or higher Bleed Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "poison":
        btnSearch.value = "Find armor with equal or higher Poison Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "curse":
        btnSearch.value = "Find armor with equal or higher Curse Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "poise":
        btnSearch.value = "Find armor with equal or higher Poise";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
    case "weight":
        btnSearch.value = "Find armor with equal or lower Weight";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+hands_armor[hands_compare_id].name+'">'+hands_armor[hands_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareHands[i]+'</td>';
                }
        }
        break;
}
break;
case "legs":
btnWeight.disabled = true;
compare_stat = stat_menu.options[stat_menu.selectedIndex].value;

for (var trnum = 1; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

switch(compare_stat) {
    case "physical":
        btnSearch.value = "Find armor with equal or higher Physical Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 0) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "strike":
        btnSearch.value = "Find armor with equal or higher Strike Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 1) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "slash":
        btnSearch.value = "Find armor with equal or higher Slash Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 2) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "thrust":
        btnSearch.value = "Find armor with equal or higher Thrust Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 3) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "magic":
        btnSearch.value = "Find armor with equal or higher Magic Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 4) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "fire":
        btnSearch.value = "Find armor with equal or higher Fire Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 5) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "lightning":
        btnSearch.value = "Find armor with equal or higher Lightning Defense";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 6) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "bleed":
        btnSearch.value = "Find armor with equal or higher Bleed Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 7) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "poison":
        btnSearch.value = "Find armor with equal or higher Poison Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 8) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "curse":
        btnSearch.value = "Find armor with equal or higher Curse Resistance";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 9) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "poise":
        btnSearch.value = "Find armor with equal or higher Poise";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 10) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
    case "weight":
        btnSearch.value = "Find armor with equal or lower Weight";
        tr = document.getElementById("tr1");
        tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black; font-weight:bold;"><a href="/wiki/'+legs_armor[legs_compare_id].name+'">'+legs_armor[legs_compare_id].name+'</a></td>';
        for (var i = 0; i <= 11; i++) {
            if (i == 11) {
                tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
                else {
                    tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black; font-weight:bold;">'+arrCompareLegs[i]+'</td>';
                }
        }
        break;
}
break;
}
}

function removeHigherWeight() {
switch(armor_type) {
case "head":
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (head_temp_id in head_armor) {

    if (head_temp_id === head_compare_id) continue;

    switch(head_compare_lvl) {
        case "0":
            arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            break;
        case "1":
            if (head_armor[head_temp_id].lvl1 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl1.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (head_armor[head_temp_id].lvl2 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl2.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (head_armor[head_temp_id].lvl3 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl3.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (head_armor[head_temp_id].lvl4 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl4.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (head_armor[head_temp_id].lvl6 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl6.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (head_armor[head_temp_id].lvl7 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl7.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (head_armor[head_temp_id].lvl8 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl8.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (head_armor[head_temp_id].lvl9 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl9.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (head_armor[head_temp_id].lvl10 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl10.split("|");
            }
            else if (head_armor[head_temp_id].lvl5 !== undefined) {
                arrTempHead = head_armor[head_temp_id].lvl5.split("|");
            }
            else {
                arrTempHead = head_armor[head_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempHead[10] = head_armor[head_temp_id].poise;
    arrTempHead[11] = head_armor[head_temp_id].weight;
    
    if (isNaN(arrTempHead[9]) === true) {
        arrTempHead[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempHead[0]) >= parseFloat(arrCompareHead[0]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempHead[1]) >= parseFloat(arrCompareHead[1]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempHead[2]) >= parseFloat(arrCompareHead[2]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempHead[3]) >= parseFloat(arrCompareHead[3]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempHead[4]) >= parseFloat(arrCompareHead[4]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempHead[5]) >= parseFloat(arrCompareHead[5]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempHead[6]) >= parseFloat(arrCompareHead[6]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempHead[7]) >= parseFloat(arrCompareHead[7]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempHead[8]) >= parseFloat(arrCompareHead[8]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempHead[9]) >= parseFloat(arrCompareHead[9]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempHead[10]) >= parseFloat(arrCompareHead[10]) && parseFloat(arrTempHead[11]) < parseFloat(arrCompareHead[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+head_armor[head_temp_id].name+'">'+head_armor[head_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHead[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
case "chest":
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (chest_temp_id in chest_armor) {

    if (chest_temp_id === chest_compare_id) continue;

    switch(chest_compare_lvl) {
        case "0":
            arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            break;
        case "1":
            if (chest_armor[chest_temp_id].lvl1 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl1.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (chest_armor[chest_temp_id].lvl2 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl2.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (chest_armor[chest_temp_id].lvl3 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl3.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (chest_armor[chest_temp_id].lvl4 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl4.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (chest_armor[chest_temp_id].lvl6 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl6.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (chest_armor[chest_temp_id].lvl7 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl7.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (chest_armor[chest_temp_id].lvl8 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl8.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (chest_armor[chest_temp_id].lvl9 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl9.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (chest_armor[chest_temp_id].lvl10 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl10.split("|");
            }
            else if (chest_armor[chest_temp_id].lvl5 !== undefined) {
                arrTempChest = chest_armor[chest_temp_id].lvl5.split("|");
            }
            else {
                arrTempChest = chest_armor[chest_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempChest[10] = chest_armor[chest_temp_id].poise;
    arrTempChest[11] = chest_armor[chest_temp_id].weight;
    
    if (isNaN(arrTempChest[9]) === true) {
        arrTempChest[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempChest[0]) >= parseFloat(arrCompareChest[0]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempChest[1]) >= parseFloat(arrCompareChest[1]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempChest[2]) >= parseFloat(arrCompareChest[2]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempChest[3]) >= parseFloat(arrCompareChest[3]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempChest[4]) >= parseFloat(arrCompareChest[4]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempChest[5]) >= parseFloat(arrCompareChest[5]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempChest[6]) >= parseFloat(arrCompareChest[6]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempChest[7]) >= parseFloat(arrCompareChest[7]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempChest[8]) >= parseFloat(arrCompareChest[8]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempChest[9]) >= parseFloat(arrCompareChest[9]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempChest[10]) >= parseFloat(arrCompareChest[10]) && parseFloat(arrTempChest[11]) < parseFloat(arrCompareChest[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+chest_armor[chest_temp_id].name+'">'+chest_armor[chest_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempChest[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
case "hands":
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (hands_temp_id in hands_armor) {

    if (hands_temp_id === hands_compare_id) continue;

    switch(hands_compare_lvl) {
        case "0":
            arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            break;
        case "1":
            if (hands_armor[hands_temp_id].lvl1 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl1.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (hands_armor[hands_temp_id].lvl2 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl2.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (hands_armor[hands_temp_id].lvl3 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl3.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (hands_armor[hands_temp_id].lvl4 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl4.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (hands_armor[hands_temp_id].lvl6 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl6.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (hands_armor[hands_temp_id].lvl7 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl7.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (hands_armor[hands_temp_id].lvl8 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl8.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (hands_armor[hands_temp_id].lvl9 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl9.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (hands_armor[hands_temp_id].lvl10 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl10.split("|");
            }
            else if (hands_armor[hands_temp_id].lvl5 !== undefined) {
                arrTempHands = hands_armor[hands_temp_id].lvl5.split("|");
            }
            else {
                arrTempHands = hands_armor[hands_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempHands[10] = hands_armor[hands_temp_id].poise;
    arrTempHands[11] = hands_armor[hands_temp_id].weight;
    
    if (isNaN(arrTempHands[9]) === true) {
        arrTempHands[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempHands[0]) >= parseFloat(arrCompareHands[0]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempHands[1]) >= parseFloat(arrCompareHands[1]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempHands[2]) >= parseFloat(arrCompareHands[2]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempHands[3]) >= parseFloat(arrCompareHands[3]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempHands[4]) >= parseFloat(arrCompareHands[4]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempHands[5]) >= parseFloat(arrCompareHands[5]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempHands[6]) >= parseFloat(arrCompareHands[6]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempHands[7]) >= parseFloat(arrCompareHands[7]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempHands[8]) >= parseFloat(arrCompareHands[8]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempHands[9]) >= parseFloat(arrCompareHands[9]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempHands[10]) >= parseFloat(arrCompareHands[10]) && parseFloat(arrTempHands[11]) < parseFloat(arrCompareHands[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+hands_armor[hands_temp_id].name+'">'+hands_armor[hands_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempHands[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
case "legs":
intCount = 1;

for (var trnum = 2; trnum <= 70; trnum++) {
    document.getElementById("tr"+trnum).innerHTML = "";
}

for (legs_temp_id in legs_armor) {

    if (legs_temp_id === legs_compare_id) continue;

    switch(legs_compare_lvl) {
        case "0":
            arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            break;
        case "1":
            if (legs_armor[legs_temp_id].lvl1 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl1.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "2":
            if (legs_armor[legs_temp_id].lvl2 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl2.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "3":
            if (legs_armor[legs_temp_id].lvl3 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl3.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "4":
            if (legs_armor[legs_temp_id].lvl4 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl4.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "5":
            if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "6":
            if (legs_armor[legs_temp_id].lvl6 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl6.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }   
            break;
        case "7":
            if (legs_armor[legs_temp_id].lvl7 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl7.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "8":
            if (legs_armor[legs_temp_id].lvl8 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl8.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "9":
            if (legs_armor[legs_temp_id].lvl9 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl9.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
        case "10":
            if (legs_armor[legs_temp_id].lvl10 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl10.split("|");
            }
            else if (legs_armor[legs_temp_id].lvl5 !== undefined) {
                arrTempLegs = legs_armor[legs_temp_id].lvl5.split("|");
            }
            else {
                arrTempLegs = legs_armor[legs_temp_id].lvl0.split("|");
            }
            break;
    }
    arrTempLegs[10] = legs_armor[legs_temp_id].poise;
    arrTempLegs[11] = legs_armor[legs_temp_id].weight;
    
    if (isNaN(arrTempLegs[9]) === true) {
        arrTempLegs[9] = "0.0";
    }

    switch (compare_stat) {
        case "physical":
            if (parseFloat(arrTempLegs[0]) >= parseFloat(arrCompareLegs[0]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 0) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "strike":
            if (parseFloat(arrTempLegs[1]) >= parseFloat(arrCompareLegs[1]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 1) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "slash":
            if (parseFloat(arrTempLegs[2]) >= parseFloat(arrCompareLegs[2]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 2) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "thrust":
            if (parseFloat(arrTempLegs[3]) >= parseFloat(arrCompareLegs[3]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 3) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "magic":
            if (parseFloat(arrTempLegs[4]) >= parseFloat(arrCompareLegs[4]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 4) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "fire":
            if (parseFloat(arrTempLegs[5]) >= parseFloat(arrCompareLegs[5]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
            var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 5) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "lightning":
            if (parseFloat(arrTempLegs[6]) >= parseFloat(arrCompareLegs[6]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 6) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "bleed":
            if (parseFloat(arrTempLegs[7]) >= parseFloat(arrCompareLegs[7]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 7) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "poison":
            if (parseFloat(arrTempLegs[8]) >= parseFloat(arrCompareLegs[8]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 8) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "curse":
            if (parseFloat(arrTempLegs[9]) >= parseFloat(arrCompareLegs[9]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 9) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
        case "poise":
            if (parseFloat(arrTempLegs[10]) >= parseFloat(arrCompareLegs[10]) && parseFloat(arrTempLegs[11]) < parseFloat(arrCompareLegs[11])) {
                 intCount++;
                 var tr = document.getElementById("tr"+intCount);
                     tr.innerHTML = '<td style="text-align:left; background-color:#1d1d1d; border:1px solid black;"><a href="/wiki/'+legs_armor[legs_temp_id].name+'">'+legs_armor[legs_temp_id].name+'</a></td>';
                 for (var i = 0; i <= 11; i++) {
                     if (i == 10) {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#161616; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                     else {
                         tr.innerHTML = tr.innerHTML + '<td style="background-color:#1d1d1d; border:1px solid black;">'+arrTempLegs[i]+'</td>';
                     }
                 }
            }
            break;
    }
}

if (sortHighToLowChecked === true) {
    sortHighToLow();
}
else if (sortLowToHighChecked === true) {
    sortLowToHigh();
}
break;
}
}

function sortHighToLow() {
var arrSort = new Array();

for (i = 2; i <= intCount; i++) {
    arrSort[i-2] = document.getElementById("tr"+i).innerHTML;

    var start = arrSort[i-2].indexOf('<td style="background-color:#161616; border:1px solid black;">') + 62;
    arrSort[i-2] = arrSort[i-2].slice(start);

    var end = arrSort[i-2].indexOf('</td>');
    arrSort[i-2] = arrSort[i-2].slice(0, end);
}

var sorted;
do {
    sorted = false;
    for (i = 0; i < arrSort.length - 1; i++) {
        if (parseFloat(arrSort[i]) < parseFloat(arrSort[i+1])) {
            var temp = arrSort[i];
            arrSort[i] = arrSort[i+1];
            arrSort[i+1] = temp

            var temprow = document.getElementById("tr"+(i+2)).innerHTML;
            document.getElementById("tr"+(i+2)).innerHTML = document.getElementById("tr"+(i+3)).innerHTML;
            document.getElementById("tr"+(i+3)).innerHTML = temprow;

            sorted = true;
        }
    }
} while (sorted);

}

function sortLowToHigh() {
var arrSort = new Array();

for (i = 2; i <= intCount; i++) {
    arrSort[i-2] = document.getElementById("tr"+i).innerHTML;

    var start = arrSort[i-2].indexOf('<td style="background-color:#161616; border:1px solid black;">') + 62;
    arrSort[i-2] = arrSort[i-2].slice(start);

    var end = arrSort[i-2].indexOf('</td>');
    arrSort[i-2] = arrSort[i-2].slice(0, end);
}

var sorted;
do {
    sorted = false;
    for (i = 0; i < arrSort.length - 1; i++) {
        if (parseFloat(arrSort[i]) > parseFloat(arrSort[i+1])) {
            var temp = arrSort[i];
            arrSort[i] = arrSort[i+1];
            arrSort[i+1] = temp

            var temprow = document.getElementById("tr"+(i+2)).innerHTML;
            document.getElementById("tr"+(i+2)).innerHTML = document.getElementById("tr"+(i+3)).innerHTML;
            document.getElementById("tr"+(i+3)).innerHTML = temprow;

            sorted = true;
        }
    }
} while (sorted);

}