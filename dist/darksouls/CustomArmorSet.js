$(document).ready(function()
{           
    eval(document.getElementById("customarmorsetdata").innerHTML);
});

//Turn image url into image
function urlImage(name, img, img_lvl) {
    return '<a href="http://www.darksouls.wikia.com/wiki/'+name+'"><img src="'+img+'" width="60" height="68" style="position: relative; top: 0px; right: 0px;"/></a><img src="'+img_lvl+'" style="position: absolute; top: 0px; right: 0px;"/>';
}

//Set head armor menu options
for (var head_opt_id in head_armor) {
    var head_opt_name = head_armor[head_opt_id].name;
    
    var head_opt = document.createElement("option");
    head_opt.text = head_opt_name;
    head_opt.value = head_opt_id;
    head_menu.add(head_opt);
}

//Set chest armor menu options
for (var chest_opt_id in chest_armor) {
    var chest_opt_name = chest_armor[chest_opt_id].name;
    
    var chest_opt = document.createElement("option");
    chest_opt.text = chest_opt_name;
    chest_opt.value = chest_opt_id;
    chest_menu.add(chest_opt);
}    

//Set hands armor menu options
for (var hands_opt_id in hands_armor) {
    var hands_opt_name = hands_armor[hands_opt_id].name;
    
    var hands_opt = document.createElement("option");
    hands_opt.text = hands_opt_name;
    hands_opt.value = hands_opt_id;
    hands_menu.add(hands_opt);
}    

//Set legs armor menu options
for (var legs_opt_id in legs_armor) {
    var legs_opt_name = legs_armor[legs_opt_id].name;
    
    var legs_opt = document.createElement("option");
    legs_opt.text = legs_opt_name;
    legs_opt.value = legs_opt_id;
    legs_menu.add(legs_opt);
}

function headSelectedIndexChanged() {
head_id = head_menu.options[head_menu.selectedIndex].value;

//Reset menus
document.getElementById("head_lvl1").disabled = true;
document.getElementById("head_lvl2").disabled = true;
document.getElementById("head_lvl3").disabled = true;
document.getElementById("head_lvl4").disabled = true;
document.getElementById("head_lvl5").disabled = true;
document.getElementById("head_lvl6").disabled = true;
document.getElementById("head_lvl7").disabled = true;
document.getElementById("head_lvl8").disabled = true;
document.getElementById("head_lvl9").disabled = true;
document.getElementById("head_lvl10").disabled = true;

head_lvl_menu.selectedIndex = 0;

//Set head armor upgrade lvl drop down box
if (head_armor[head_id].lvl1 !== undefined) {
    document.getElementById("head_lvl1").disabled = false;
    document.getElementById("head_lvl2").disabled = false;
    document.getElementById("head_lvl3").disabled = false;
    document.getElementById("head_lvl4").disabled = false;
    document.getElementById("head_lvl5").disabled = false;
    if (head_armor[head_id].lvl6 !== undefined) {
        document.getElementById("head_lvl6").disabled = false;
        document.getElementById("head_lvl7").disabled = false;
        document.getElementById("head_lvl8").disabled = false;
        document.getElementById("head_lvl9").disabled = false;
        document.getElementById("head_lvl10").disabled = false;
    }
}

updateArmor();
}

function chestSelectedIndexChanged() {
chest_id = chest_menu.options[chest_menu.selectedIndex].value;

document.getElementById("chest_lvl1").disabled = true;
document.getElementById("chest_lvl2").disabled = true;
document.getElementById("chest_lvl3").disabled = true;
document.getElementById("chest_lvl4").disabled = true;
document.getElementById("chest_lvl5").disabled = true;
document.getElementById("chest_lvl6").disabled = true;
document.getElementById("chest_lvl7").disabled = true;
document.getElementById("chest_lvl8").disabled = true;
document.getElementById("chest_lvl9").disabled = true;
document.getElementById("chest_lvl10").disabled = true;

chest_lvl_menu.selectedIndex = 0;

//Set chest armor upgrade lvl drop down box
if (chest_armor[chest_id].lvl1 !== undefined) {
    document.getElementById("chest_lvl1").disabled = false;
    document.getElementById("chest_lvl2").disabled = false;
    document.getElementById("chest_lvl3").disabled = false;
    document.getElementById("chest_lvl4").disabled = false;
    document.getElementById("chest_lvl5").disabled = false;
    if (chest_armor[chest_id].lvl6 !== undefined) {
        document.getElementById("chest_lvl6").disabled = false;
        document.getElementById("chest_lvl7").disabled = false;
        document.getElementById("chest_lvl8").disabled = false;
        document.getElementById("chest_lvl9").disabled = false;
        document.getElementById("chest_lvl10").disabled = false;
    }
}

updateArmor();
}

function handsSelectedIndexChanged() {
hands_id = hands_menu.options[hands_menu.selectedIndex].value;

document.getElementById("hands_lvl1").disabled = true;
document.getElementById("hands_lvl2").disabled = true;
document.getElementById("hands_lvl3").disabled = true;
document.getElementById("hands_lvl4").disabled = true;
document.getElementById("hands_lvl5").disabled = true;
document.getElementById("hands_lvl6").disabled = true;
document.getElementById("hands_lvl7").disabled = true;
document.getElementById("hands_lvl8").disabled = true;
document.getElementById("hands_lvl9").disabled = true;
document.getElementById("hands_lvl10").disabled = true;

hands_lvl_menu.selectedIndex = 0;

//Set hands armor upgrade lvl drop down box
if (hands_armor[hands_id].lvl1 !== undefined) {
    document.getElementById("hands_lvl1").disabled = false;
    document.getElementById("hands_lvl2").disabled = false;
    document.getElementById("hands_lvl3").disabled = false;
    document.getElementById("hands_lvl4").disabled = false;
    document.getElementById("hands_lvl5").disabled = false;
    if (hands_armor[hands_id].lvl6 !== undefined) {
        document.getElementById("hands_lvl6").disabled = false;
        document.getElementById("hands_lvl7").disabled = false;
        document.getElementById("hands_lvl8").disabled = false;
        document.getElementById("hands_lvl9").disabled = false;
        document.getElementById("hands_lvl10").disabled = false;
    }
}

updateArmor();
}

function legsSelectedIndexChanged() {
legs_id = legs_menu.options[legs_menu.selectedIndex].value;

document.getElementById("legs_lvl1").disabled = true;
document.getElementById("legs_lvl2").disabled = true;
document.getElementById("legs_lvl3").disabled = true;
document.getElementById("legs_lvl4").disabled = true;
document.getElementById("legs_lvl5").disabled = true;
document.getElementById("legs_lvl6").disabled = true;
document.getElementById("legs_lvl7").disabled = true;
document.getElementById("legs_lvl8").disabled = true;
document.getElementById("legs_lvl9").disabled = true;
document.getElementById("legs_lvl10").disabled = true;

legs_lvl_menu.selectedIndex = 0;

//Set legs armor upgrade lvl drop down box
if (legs_armor[legs_id].lvl1 !== undefined) {
    document.getElementById("legs_lvl1").disabled = false;
    document.getElementById("legs_lvl2").disabled = false;
    document.getElementById("legs_lvl3").disabled = false;
    document.getElementById("legs_lvl4").disabled = false;
    document.getElementById("legs_lvl5").disabled = false;
    if (legs_armor[legs_id].lvl6 !== undefined) {
        document.getElementById("legs_lvl6").disabled = false;
        document.getElementById("legs_lvl7").disabled = false;
        document.getElementById("legs_lvl8").disabled = false;
        document.getElementById("legs_lvl9").disabled = false;
        document.getElementById("legs_lvl10").disabled = false;
    }
}

updateArmor();
}

function updateArmor() {
head_lvl = head_lvl_menu.options[head_lvl_menu.selectedIndex].value;
chest_lvl = chest_lvl_menu.options[chest_lvl_menu.selectedIndex].value;
hands_lvl = hands_lvl_menu.options[hands_lvl_menu.selectedIndex].value;
legs_lvl = legs_lvl_menu.options[legs_lvl_menu.selectedIndex].value;

switch(head_lvl) {
    case "0":
        head_lvl_img = lvl_img[0];
        break;
    case "1":
        head_lvl_img = lvl_img[1];
        break;
    case "2":
        head_lvl_img = lvl_img[2];
        break;
    case "3":
        head_lvl_img = lvl_img[3];
        break;
    case "4":
        head_lvl_img = lvl_img[4];
        break;
    case "5":
        head_lvl_img = lvl_img[5];
        break;
    case "6":
        head_lvl_img = lvl_img[6];
        break;
    case "7":
        head_lvl_img = lvl_img[7];
        break;
    case "8":
        head_lvl_img = lvl_img[8];
        break;
    case "9":
        head_lvl_img = lvl_img[9];
        break;
    case "10":
        head_lvl_img = lvl_img[10];
        break;
}

switch(chest_lvl) {
    case "0":
        chest_lvl_img = lvl_img[0];
        break;
    case "1":
        chest_lvl_img = lvl_img[1];
        break;
    case "2":
        chest_lvl_img = lvl_img[2];
        break;
    case "3":
        chest_lvl_img = lvl_img[3];
        break;
    case "4":
        chest_lvl_img = lvl_img[4];
        break;
    case "5":
        chest_lvl_img = lvl_img[5];
        break;
    case "6":
        chest_lvl_img = lvl_img[6];
        break;
    case "7":
        chest_lvl_img = lvl_img[7];
        break;
    case "8":
        chest_lvl_img = lvl_img[8];
        break;
    case "9":
        chest_lvl_img = lvl_img[9];
        break;
    case "10":
        chest_lvl_img = lvl_img[10];
        break;
}

switch(hands_lvl) {
    case "0":
        hands_lvl_img = lvl_img[0];
        break;
    case "1":
        hands_lvl_img = lvl_img[1];
        break;
    case "2":
        hands_lvl_img = lvl_img[2];
        break;
    case "3":
        hands_lvl_img = lvl_img[3];
        break;
    case "4":
        hands_lvl_img = lvl_img[4];
        break;
    case "5":
        hands_lvl_img = lvl_img[5];
        break;
    case "6":
        hands_lvl_img = lvl_img[6];
        break;
    case "7":
        hands_lvl_img = lvl_img[7];
        break;
    case "8":
        hands_lvl_img = lvl_img[8];
        break;
    case "9":
        hands_lvl_img = lvl_img[9];
        break;
    case "10":
        hands_lvl_img = lvl_img[10];
        break;
}

switch(legs_lvl) {
    case "0":
        legs_lvl_img = lvl_img[0];
        break;
    case "1":
        legs_lvl_img = lvl_img[1];
        break;
    case "2":
        legs_lvl_img = lvl_img[2];
        break;
    case "3":
        legs_lvl_img = lvl_img[3];
        break;
    case "4":
        legs_lvl_img = lvl_img[4];
        break;
    case "5":
        legs_lvl_img = lvl_img[5];
        break;
    case "6":
        legs_lvl_img = lvl_img[6];
        break;
    case "7":
        legs_lvl_img = lvl_img[7];
        break;
    case "8":
        legs_lvl_img = lvl_img[8];
        break;
    case "9":
        legs_lvl_img = lvl_img[9];
        break;
    case "10":
        legs_lvl_img = lvl_img[10];
        break;
}

//Strings to hold head armor stats
var head_name = head_armor[head_id].name;
var head_img = head_armor[head_id].img;
var strHead_lvl0 = head_armor[head_id].lvl0;
if (head_armor[head_id].lvl1 !== undefined) {
    var strHead_lvl1 = head_armor[head_id].lvl1;
    var strHead_lvl2 = head_armor[head_id].lvl2;
    var strHead_lvl3 = head_armor[head_id].lvl3;
    var strHead_lvl4 = head_armor[head_id].lvl4;
    var strHead_lvl5 = head_armor[head_id].lvl5;
    if (head_armor[head_id].lvl6 !== undefined) {
        var strHead_lvl6 = head_armor[head_id].lvl6;
        var strHead_lvl7 = head_armor[head_id].lvl7;
        var strHead_lvl8 = head_armor[head_id].lvl8;
        var strHead_lvl9 = head_armor[head_id].lvl9;
        var strHead_lvl10 = head_armor[head_id].lvl10;
    }
}

//Strings to hold chest armor stats
var chest_name = chest_armor[chest_id].name;
var chest_img = chest_armor[chest_id].img;
var strChest_lvl0 = chest_armor[chest_id].lvl0;
if (chest_armor[chest_id].lvl1 !== undefined) {
    var strChest_lvl1 = chest_armor[chest_id].lvl1;
    var strChest_lvl2 = chest_armor[chest_id].lvl2;
    var strChest_lvl3 = chest_armor[chest_id].lvl3;
    var strChest_lvl4 = chest_armor[chest_id].lvl4;
    var strChest_lvl5 = chest_armor[chest_id].lvl5;
    if (chest_armor[chest_id].lvl6 !== undefined) {
        var strChest_lvl6 = chest_armor[chest_id].lvl6;
        var strChest_lvl7 = chest_armor[chest_id].lvl7;
        var strChest_lvl8 = chest_armor[chest_id].lvl8;
        var strChest_lvl9 = chest_armor[chest_id].lvl9;
        var strChest_lvl10 = chest_armor[chest_id].lvl10;
    }
}

//Strings to hold hands armor stats
var hands_name = hands_armor[hands_id].name;
var hands_img = hands_armor[hands_id].img;
var strHands_lvl0 = hands_armor[hands_id].lvl0;
if (hands_armor[hands_id].lvl1 !== undefined) {
    var strHands_lvl1 = hands_armor[hands_id].lvl1;
    var strHands_lvl2 = hands_armor[hands_id].lvl2;
    var strHands_lvl3 = hands_armor[hands_id].lvl3;
    var strHands_lvl4 = hands_armor[hands_id].lvl4;
    var strHands_lvl5 = hands_armor[hands_id].lvl5;
    if (hands_armor[hands_id].lvl6 !== undefined) {
        var strHands_lvl6 = hands_armor[hands_id].lvl6;
        var strHands_lvl7 = hands_armor[hands_id].lvl7;
        var strHands_lvl8 = hands_armor[hands_id].lvl8;
        var strHands_lvl9 = hands_armor[hands_id].lvl9;
        var strHands_lvl10 = hands_armor[hands_id].lvl10;
    }
}

//Strings to hold legs armor stats
var legs_name = legs_armor[legs_id].name;
var legs_img = legs_armor[legs_id].img;
var strLegs_lvl0 = legs_armor[legs_id].lvl0;
if (legs_armor[legs_id].lvl1 !== undefined) {
    var strLegs_lvl1 = legs_armor[legs_id].lvl1;
    var strLegs_lvl2 = legs_armor[legs_id].lvl2;
    var strLegs_lvl3 = legs_armor[legs_id].lvl3;
    var strLegs_lvl4 = legs_armor[legs_id].lvl4;
    var strLegs_lvl5 = legs_armor[legs_id].lvl5;
    if (legs_armor[legs_id].lvl6 !== undefined) {
        var strLegs_lvl6 = legs_armor[legs_id].lvl6;
        var strLegs_lvl7 = legs_armor[legs_id].lvl7;
        var strLegs_lvl8 = legs_armor[legs_id].lvl8;
        var strLegs_lvl9 = legs_armor[legs_id].lvl9;
        var strLegs_lvl10 = legs_armor[legs_id].lvl10;
    }
}

//Arrays to hold head armor stats
var arrHead_lvl0 = new Array(11);
if (strHead_lvl1 !== undefined) {
    var arrHead_lvl1 = new Array(9);
    var arrHead_lvl2 = new Array(9);
    var arrHead_lvl3 = new Array(9);
    var arrHead_lvl4 = new Array(9);
    var arrHead_lvl5 = new Array(9);
    if (strHead_lvl6 !== undefined) {
        var arrHead_lvl6 = new Array(9);
        var arrHead_lvl7 = new Array(9);
        var arrHead_lvl8 = new Array(9);
        var arrHead_lvl9 = new Array(9);
        var arrHead_lvl10 = new Array(9);
    }
}

//Arrays to hold chest armor stats
var arrChest_lvl0 = new Array(11);
if (strChest_lvl1 !== undefined) {
    var arrChest_lvl1 = new Array(9);
    var arrChest_lvl2 = new Array(9);
    var arrChest_lvl3 = new Array(9);
    var arrChest_lvl4 = new Array(9);
    var arrChest_lvl5 = new Array(9);
    if (strChest_lvl6 !== undefined) {
        var arrChest_lvl6 = new Array(9);
        var arrChest_lvl7 = new Array(9);
        var arrChest_lvl8 = new Array(9);
        var arrChest_lvl9 = new Array(9);
        var arrChest_lvl10 = new Array(9);
    }
}

//Arrays to hold hands armor stats
var arrHands_lvl0 = new Array(11);
if (strHands_lvl1 !== undefined) {
    var arrHands_lvl1 = new Array(9);
    var arrHands_lvl2 = new Array(9);
    var arrHands_lvl3 = new Array(9);
    var arrHands_lvl4 = new Array(9);
    var arrHands_lvl5 = new Array(9);
    if (strHands_lvl6 !== undefined) {
        var arrHands_lvl6 = new Array(9);
        var arrHands_lvl7 = new Array(9);
        var arrHands_lvl8 = new Array(9);
        var arrHands_lvl9 = new Array(9);
        var arrHands_lvl10 = new Array(9);
    }
}

//Arrays to hold legs armor stats
var arrLegs_lvl0 = new Array(11);
if (strLegs_lvl1 !== undefined) {
    var arrLegs_lvl1 = new Array(9);
    var arrLegs_lvl2 = new Array(9);
    var arrLegs_lvl3 = new Array(9);
    var arrLegs_lvl4 = new Array(9);
    var arrLegs_lvl5 = new Array(9);
    if (strLegs_lvl6 !== undefined) {
        var arrLegs_lvl6 = new Array(9);
        var arrLegs_lvl7 = new Array(9);
        var arrLegs_lvl8 = new Array(9);
        var arrLegs_lvl9 = new Array(9);
        var arrLegs_lvl10 = new Array(9);
    }
}

//Put head armor stats strings into arrays + poise and weight for lvl0
arrHead_lvl0 = strHead_lvl0.split("|");
arrHead_lvl0[10] = head_armor[head_id].poise;
arrHead_lvl0[11] = head_armor[head_id].weight;
if (arrHead_lvl1 !== undefined) {
    arrHead_lvl1 = strHead_lvl1.split("|");
    arrHead_lvl2 = strHead_lvl2.split("|");
    arrHead_lvl3 = strHead_lvl3.split("|");
    arrHead_lvl4 = strHead_lvl4.split("|");
    arrHead_lvl5 = strHead_lvl5.split("|");
    if (arrHead_lvl6 !== undefined) {
        arrHead_lvl6 = strHead_lvl6.split("|");
        arrHead_lvl7 = strHead_lvl7.split("|");
        arrHead_lvl8 = strHead_lvl8.split("|");
        arrHead_lvl9 = strHead_lvl9.split("|");
        arrHead_lvl10 = strHead_lvl10.split("|");
    }
}

//Put chest armor stats strings into arrays + poise and weight for lvl0
arrChest_lvl0 = strChest_lvl0.split("|");
arrChest_lvl0[10] = chest_armor[chest_id].poise;
arrChest_lvl0[11] = chest_armor[chest_id].weight;
if (arrChest_lvl1 !== undefined) {
    arrChest_lvl1 = strChest_lvl1.split("|");
    arrChest_lvl2 = strChest_lvl2.split("|");
    arrChest_lvl3 = strChest_lvl3.split("|");
    arrChest_lvl4 = strChest_lvl4.split("|");
    arrChest_lvl5 = strChest_lvl5.split("|");
    if (arrChest_lvl6 !== undefined) {
        arrChest_lvl6 = strChest_lvl6.split("|");
        arrChest_lvl7 = strChest_lvl7.split("|");
        arrChest_lvl8 = strChest_lvl8.split("|");
        arrChest_lvl9 = strChest_lvl9.split("|");
        arrChest_lvl10 = strChest_lvl10.split("|");
    }
}

//Put hands armor stats strings into arrays + poise and weight for lvl0
arrHands_lvl0 = strHands_lvl0.split("|");
arrHands_lvl0[10] = hands_armor[hands_id].poise;
arrHands_lvl0[11] = hands_armor[hands_id].weight;
if (arrHands_lvl1 !== undefined) {
    arrHands_lvl1 = strHands_lvl1.split("|");
    arrHands_lvl2 = strHands_lvl2.split("|");
    arrHands_lvl3 = strHands_lvl3.split("|");
    arrHands_lvl4 = strHands_lvl4.split("|");
    arrHands_lvl5 = strHands_lvl5.split("|");
    if (arrHands_lvl6 !== undefined) {
        arrHands_lvl6 = strHands_lvl6.split("|");
        arrHands_lvl7 = strHands_lvl7.split("|");
        arrHands_lvl8 = strHands_lvl8.split("|");
        arrHands_lvl9 = strHands_lvl9.split("|");
        arrHands_lvl10 = strHands_lvl10.split("|");
    }
}

//Put legs armor stats strings into arrays + poise and weight for lvl0
arrLegs_lvl0 = strLegs_lvl0.split("|");
arrLegs_lvl0[10] = legs_armor[legs_id].poise;
arrLegs_lvl0[11] = legs_armor[legs_id].weight;
if (arrLegs_lvl1 !== undefined) {
    arrLegs_lvl1 = strLegs_lvl1.split("|");
    arrLegs_lvl2 = strLegs_lvl2.split("|");
    arrLegs_lvl3 = strLegs_lvl3.split("|");
    arrLegs_lvl4 = strLegs_lvl4.split("|");
    arrLegs_lvl5 = strLegs_lvl5.split("|");
    if (arrLegs_lvl6 !== undefined) {
        arrLegs_lvl6 = strLegs_lvl6.split("|");
        arrLegs_lvl7 = strLegs_lvl7.split("|");
        arrLegs_lvl8 = strLegs_lvl8.split("|");
        arrLegs_lvl9 = strLegs_lvl9.split("|");
        arrLegs_lvl10 = strLegs_lvl10.split("|");
    }
}

//Put head armor arrays for each upgrade lvl into one 2D array
if (arrHead_lvl1 === undefined) {
    arrHead = [
        arrHead_lvl0
        ];
}
else if (arrHead_lvl6 === undefined) {
    arrHead = [
        arrHead_lvl0,
        arrHead_lvl1,
        arrHead_lvl2,
        arrHead_lvl3,
        arrHead_lvl4,
        arrHead_lvl5
    ];
}
else {
    arrHead = [
        arrHead_lvl0,
        arrHead_lvl1,
        arrHead_lvl2,
        arrHead_lvl3,
        arrHead_lvl4,
        arrHead_lvl5,
        arrHead_lvl6,
        arrHead_lvl7,
        arrHead_lvl8,
        arrHead_lvl9,
        arrHead_lvl10
    ];
}

//Put chest armor arrays for each upgrade lvl into one 2D array
if (arrChest_lvl1 === undefined) {
    arrChest = [
        arrChest_lvl0
        ];
}
else if (arrChest_lvl6 === undefined) {
    arrChest = [
        arrChest_lvl0,
        arrChest_lvl1,
        arrChest_lvl2,
        arrChest_lvl3,
        arrChest_lvl4,
        arrChest_lvl5
    ];
}
else {
    arrChest = [
        arrChest_lvl0,
        arrChest_lvl1,
        arrChest_lvl2,
        arrChest_lvl3,
        arrChest_lvl4,
        arrChest_lvl5,
        arrChest_lvl6,
        arrChest_lvl7,
        arrChest_lvl8,
        arrChest_lvl9,
        arrChest_lvl10
    ];
}

//Put hands armor arrays for each upgrade lvl into one 2D array
if (arrHands_lvl1 === undefined) {
    arrHands = [
        arrHands_lvl0
        ];
}
else if (arrHands_lvl6 === undefined) {
    arrHands = [
        arrHands_lvl0,
        arrHands_lvl1,
        arrHands_lvl2,
        arrHands_lvl3,
        arrHands_lvl4,
        arrHands_lvl5
    ];
}
else {
    arrHands = [
        arrHands_lvl0,
        arrHands_lvl1,
        arrHands_lvl2,
        arrHands_lvl3,
        arrHands_lvl4,
        arrHands_lvl5,
        arrHands_lvl6,
        arrHands_lvl7,
        arrHands_lvl8,
        arrHands_lvl9,
        arrHands_lvl10
    ];
}

//Put legs armor arrays for each upgrade lvl into one 2D array
if (arrLegs_lvl1 === undefined) {
    arrLegs = [
        arrLegs_lvl0
        ];
}
else if (arrLegs_lvl6 === undefined) {
    arrLegs = [
        arrLegs_lvl0,
        arrLegs_lvl1,
        arrLegs_lvl2,
        arrLegs_lvl3,
        arrLegs_lvl4,
        arrLegs_lvl5
    ];
}
else {
    arrLegs = [
        arrLegs_lvl0,
        arrLegs_lvl1,
        arrLegs_lvl2,
        arrLegs_lvl3,
        arrLegs_lvl4,
        arrLegs_lvl5,
        arrLegs_lvl6,
        arrLegs_lvl7,
        arrLegs_lvl8,
        arrLegs_lvl9,
        arrLegs_lvl10
    ];
}

//If head armor curse res. is "-" (not a number); make it "0.0"
if (isNaN(arrHead[head_lvl][9]) === true) {
    arrHead[head_lvl][9] = "0.0";
}

//If chest armor curse res. is "-" (not a number); make it "0.0"
if (isNaN(arrChest[chest_lvl][9]) === true) {
    arrChest[chest_lvl][9] = "0.0";
}

//If hands armor curse res is "-" (not a number); make it "0.0"
if (isNaN(arrHands[hands_lvl][9]) === true) {
    arrHands[hands_lvl][9] = "0.0";
}

//If legs armor curse res is "-" (not a number); make it "0.0"
if (isNaN(arrLegs[legs_lvl][9]) === true) {
    arrLegs[legs_lvl][9] = "0.0";
}

//Total stats array
arrTotal = [
    (parseFloat(arrHead[head_lvl][0]) + parseFloat(arrChest[chest_lvl][0]) + parseFloat(arrHands[hands_lvl][0]) + parseFloat(arrLegs[legs_lvl][0])).toFixed(1),
    (parseFloat(arrHead[head_lvl][1]) + parseFloat(arrChest[chest_lvl][1]) + parseFloat(arrHands[hands_lvl][1]) + parseFloat(arrLegs[legs_lvl][1])).toFixed(1),
    (parseFloat(arrHead[head_lvl][2]) + parseFloat(arrChest[chest_lvl][2]) + parseFloat(arrHands[hands_lvl][2]) + parseFloat(arrLegs[legs_lvl][2])).toFixed(1),
    (parseFloat(arrHead[head_lvl][3]) + parseFloat(arrChest[chest_lvl][3]) + parseFloat(arrHands[hands_lvl][3]) + parseFloat(arrLegs[legs_lvl][3])).toFixed(1),
    (parseFloat(arrHead[head_lvl][4]) + parseFloat(arrChest[chest_lvl][4]) + parseFloat(arrHands[hands_lvl][4]) + parseFloat(arrLegs[legs_lvl][4])).toFixed(1),
    (parseFloat(arrHead[head_lvl][5]) + parseFloat(arrChest[chest_lvl][5]) + parseFloat(arrHands[hands_lvl][5]) + parseFloat(arrLegs[legs_lvl][5])).toFixed(1),
    (parseFloat(arrHead[head_lvl][6]) + parseFloat(arrChest[chest_lvl][6]) + parseFloat(arrHands[hands_lvl][6]) + parseFloat(arrLegs[legs_lvl][6])).toFixed(1),
    (parseFloat(arrHead[head_lvl][7]) + parseFloat(arrChest[chest_lvl][7]) + parseFloat(arrHands[hands_lvl][7]) + parseFloat(arrLegs[legs_lvl][7])).toFixed(1),
    (parseFloat(arrHead[head_lvl][8]) + parseFloat(arrChest[chest_lvl][8]) + parseFloat(arrHands[hands_lvl][8]) + parseFloat(arrLegs[legs_lvl][8])).toFixed(1),
    (parseFloat(arrHead[head_lvl][9]) + parseFloat(arrChest[chest_lvl][9]) + parseFloat(arrHands[hands_lvl][9]) + parseFloat(arrLegs[legs_lvl][9])).toFixed(1),
    (parseFloat(arrHead[0][10]) + parseFloat(arrChest[0][10]) + parseFloat(arrHands[0][10]) + parseFloat(arrLegs[0][10])).toFixed(1),
    (parseFloat(arrHead[0][11]) + parseFloat(arrChest[0][11]) + parseFloat(arrHands[0][11]) + parseFloat(arrLegs[0][11])).toFixed(1)
];

//Display head armor stats + image
if (head_name === "Unequipped") {
    document.getElementById("head_img").innerHTML = "Unequipped";
}
else {
    document.getElementById("head_img").innerHTML = urlImage(head_name, head_img, head_lvl_img);
}
document.getElementById("head_phy").innerHTML = arrHead[head_lvl][0];
document.getElementById("head_strike").innerHTML = arrHead[head_lvl][1];
document.getElementById("head_slash").innerHTML = arrHead[head_lvl][2];
document.getElementById("head_thrust").innerHTML = arrHead[head_lvl][3];
document.getElementById("head_mag").innerHTML = arrHead[head_lvl][4];
document.getElementById("head_fire").innerHTML = arrHead[head_lvl][5];
document.getElementById("head_ltn").innerHTML = arrHead[head_lvl][6];
document.getElementById("head_bleed").innerHTML = arrHead[head_lvl][7];
document.getElementById("head_poison").innerHTML = arrHead[head_lvl][8];
document.getElementById("head_curse").innerHTML = arrHead[head_lvl][9];
document.getElementById("head_poise").innerHTML = arrHead[0][10];
document.getElementById("head_weight").innerHTML = arrHead[0][11];

//Display chest armor stats + image
if (chest_name === "Unequipped") {
    document.getElementById("chest_img").innerHTML = "Unequipped";
}
else {
    document.getElementById("chest_img").innerHTML = urlImage(chest_name, chest_img, chest_lvl_img);
}    
document.getElementById("chest_phy").innerHTML = arrChest[chest_lvl][0];
document.getElementById("chest_strike").innerHTML = arrChest[chest_lvl][1];
document.getElementById("chest_slash").innerHTML = arrChest[chest_lvl][2];
document.getElementById("chest_thrust").innerHTML = arrChest[chest_lvl][3];
document.getElementById("chest_mag").innerHTML = arrChest[chest_lvl][4];
document.getElementById("chest_fire").innerHTML = arrChest[chest_lvl][5];
document.getElementById("chest_ltn").innerHTML = arrChest[chest_lvl][6];
document.getElementById("chest_bleed").innerHTML = arrChest[chest_lvl][7];
document.getElementById("chest_poison").innerHTML = arrChest[chest_lvl][8];
document.getElementById("chest_curse").innerHTML = arrChest[chest_lvl][9];
document.getElementById("chest_poise").innerHTML = arrChest[0][10];
document.getElementById("chest_weight").innerHTML = arrChest[0][11];

//Display hands armor stats + image
if (hands_name === "Unequipped") {
    document.getElementById("hands_img").innerHTML = "Unequipped";
}
else {
    document.getElementById("hands_img").innerHTML = urlImage(hands_name, hands_img, hands_lvl_img);
}
document.getElementById("hands_phy").innerHTML = arrHands[hands_lvl][0];
document.getElementById("hands_strike").innerHTML = arrHands[hands_lvl][1];
document.getElementById("hands_slash").innerHTML = arrHands[hands_lvl][2];
document.getElementById("hands_thrust").innerHTML = arrHands[hands_lvl][3];
document.getElementById("hands_mag").innerHTML = arrHands[hands_lvl][4];
document.getElementById("hands_fire").innerHTML = arrHands[hands_lvl][5];
document.getElementById("hands_ltn").innerHTML = arrHands[hands_lvl][6];
document.getElementById("hands_bleed").innerHTML = arrHands[hands_lvl][7];
document.getElementById("hands_poison").innerHTML = arrHands[hands_lvl][8];
document.getElementById("hands_curse").innerHTML = arrHands[hands_lvl][9];
document.getElementById("hands_poise").innerHTML = arrHands[0][10];
document.getElementById("hands_weight").innerHTML = arrHands[0][11];

//Display legs armor stats + image
if (legs_name === "Unequipped") {
    document.getElementById("legs_img").innerHTML = "Unequipped";
}
else {
    document.getElementById("legs_img").innerHTML = urlImage(legs_name, legs_img, legs_lvl_img);
}
document.getElementById("legs_phy").innerHTML = arrLegs[legs_lvl][0];
document.getElementById("legs_strike").innerHTML = arrLegs[legs_lvl][1];
document.getElementById("legs_slash").innerHTML = arrLegs[legs_lvl][2];
document.getElementById("legs_thrust").innerHTML = arrLegs[legs_lvl][3];
document.getElementById("legs_mag").innerHTML = arrLegs[legs_lvl][4];
document.getElementById("legs_fire").innerHTML = arrLegs[legs_lvl][5];
document.getElementById("legs_ltn").innerHTML = arrLegs[legs_lvl][6];
document.getElementById("legs_bleed").innerHTML = arrLegs[legs_lvl][7];
document.getElementById("legs_poison").innerHTML = arrLegs[legs_lvl][8];
document.getElementById("legs_curse").innerHTML = arrLegs[legs_lvl][9];
document.getElementById("legs_poise").innerHTML = arrLegs[0][10];
document.getElementById("legs_weight").innerHTML = arrLegs[0][11];

//Display total stats
document.getElementById("total_phy").innerHTML = arrTotal[0];
document.getElementById("total_strike").innerHTML = arrTotal[1];
document.getElementById("total_slash").innerHTML = arrTotal[2];
document.getElementById("total_thrust").innerHTML = arrTotal[3];
document.getElementById("total_mag").innerHTML = arrTotal[4];
document.getElementById("total_fire").innerHTML = arrTotal[5];
document.getElementById("total_ltn").innerHTML = arrTotal[6];
document.getElementById("total_bleed").innerHTML = arrTotal[7];
document.getElementById("total_poison").innerHTML = arrTotal[8];
document.getElementById("total_curse").innerHTML = arrTotal[9];
document.getElementById("total_poise").innerHTML = arrTotal[10];
document.getElementById("total_weight").innerHTML = arrTotal[11];

if (blnComparison === true) {
    compareArmor();
}
}

function setComparisonArmor() {
document.getElementById("comparison_armor").removeAttribute("style");
document.getElementById("head_comparison").innerHTML = head_armor[head_id].name + " +" + head_lvl;
document.getElementById("chest_comparison").innerHTML = chest_armor[chest_id].name + " +" + chest_lvl;
document.getElementById("hands_comparison").innerHTML = hands_armor[hands_id].name + " +" + hands_lvl;
document.getElementById("legs_comparison").innerHTML = legs_armor[legs_id].name + " +" + legs_lvl;

arrOriginalHead[0] = document.getElementById("head_phy").innerHTML;
arrOriginalHead[1] = document.getElementById("head_strike").innerHTML;
arrOriginalHead[2] = document.getElementById("head_slash").innerHTML;
arrOriginalHead[3] = document.getElementById("head_thrust").innerHTML;
arrOriginalHead[4] = document.getElementById("head_mag").innerHTML;
arrOriginalHead[5] = document.getElementById("head_fire").innerHTML;
arrOriginalHead[6] = document.getElementById("head_ltn").innerHTML;
arrOriginalHead[7] = document.getElementById("head_bleed").innerHTML;
arrOriginalHead[8] = document.getElementById("head_poison").innerHTML;
arrOriginalHead[9] = document.getElementById("head_curse").innerHTML;
arrOriginalHead[10] = document.getElementById("head_poise").innerHTML;
arrOriginalHead[11] = document.getElementById("head_weight").innerHTML;

arrOriginalChest[0] = document.getElementById("chest_phy").innerHTML;
arrOriginalChest[1] = document.getElementById("chest_strike").innerHTML;
arrOriginalChest[2] = document.getElementById("chest_slash").innerHTML;
arrOriginalChest[3] = document.getElementById("chest_thrust").innerHTML;
arrOriginalChest[4] = document.getElementById("chest_mag").innerHTML;
arrOriginalChest[5] = document.getElementById("chest_fire").innerHTML;
arrOriginalChest[6] = document.getElementById("chest_ltn").innerHTML;
arrOriginalChest[7] = document.getElementById("chest_bleed").innerHTML;
arrOriginalChest[8] = document.getElementById("chest_poison").innerHTML;
arrOriginalChest[9] = document.getElementById("chest_curse").innerHTML;
arrOriginalChest[10] = document.getElementById("chest_poise").innerHTML;
arrOriginalChest[11] = document.getElementById("chest_weight").innerHTML;

arrOriginalHands[0] = document.getElementById("hands_phy").innerHTML;
arrOriginalHands[1] = document.getElementById("hands_strike").innerHTML;
arrOriginalHands[2] = document.getElementById("hands_slash").innerHTML;
arrOriginalHands[3] = document.getElementById("hands_thrust").innerHTML;
arrOriginalHands[4] = document.getElementById("hands_mag").innerHTML;
arrOriginalHands[5] = document.getElementById("hands_fire").innerHTML;
arrOriginalHands[6] = document.getElementById("hands_ltn").innerHTML;
arrOriginalHands[7] = document.getElementById("hands_bleed").innerHTML;
arrOriginalHands[8] = document.getElementById("hands_poison").innerHTML;
arrOriginalHands[9] = document.getElementById("hands_curse").innerHTML;
arrOriginalHands[10] = document.getElementById("hands_poise").innerHTML;
arrOriginalHands[11] = document.getElementById("hands_weight").innerHTML;

arrOriginalLegs[0] = document.getElementById("legs_phy").innerHTML;
arrOriginalLegs[1] = document.getElementById("legs_strike").innerHTML;
arrOriginalLegs[2] = document.getElementById("legs_slash").innerHTML;
arrOriginalLegs[3] = document.getElementById("legs_thrust").innerHTML;
arrOriginalLegs[4] = document.getElementById("legs_mag").innerHTML;
arrOriginalLegs[5] = document.getElementById("legs_fire").innerHTML;
arrOriginalLegs[6] = document.getElementById("legs_ltn").innerHTML;
arrOriginalLegs[7] = document.getElementById("legs_bleed").innerHTML;
arrOriginalLegs[8] = document.getElementById("legs_poison").innerHTML;
arrOriginalLegs[9] = document.getElementById("legs_curse").innerHTML;
arrOriginalLegs[10] = document.getElementById("legs_poise").innerHTML;
arrOriginalLegs[11] = document.getElementById("legs_weight").innerHTML;

arrOriginalTotal[0] = document.getElementById("total_phy").innerHTML;
arrOriginalTotal[1] = document.getElementById("total_strike").innerHTML;
arrOriginalTotal[2] = document.getElementById("total_slash").innerHTML;
arrOriginalTotal[3] = document.getElementById("total_thrust").innerHTML;
arrOriginalTotal[4] = document.getElementById("total_mag").innerHTML;
arrOriginalTotal[5] = document.getElementById("total_fire").innerHTML;
arrOriginalTotal[6] = document.getElementById("total_ltn").innerHTML;
arrOriginalTotal[7] = document.getElementById("total_bleed").innerHTML;
arrOriginalTotal[8] = document.getElementById("total_poison").innerHTML;
arrOriginalTotal[9] = document.getElementById("total_curse").innerHTML;
arrOriginalTotal[10] = document.getElementById("total_poise").innerHTML;
arrOriginalTotal[11] = document.getElementById("total_weight").innerHTML;


arrOriginal = [
    arrOriginalHead,
    arrOriginalChest,
    arrOriginalHands,
    arrOriginalLegs,
    arrOriginalTotal
    ];
    
blnComparison = true;

document.getElementById("head_phy").removeAttribute("style");
document.getElementById("head_strike").removeAttribute("style");
document.getElementById("head_slash").removeAttribute("style");
document.getElementById("head_thrust").removeAttribute("style");
document.getElementById("head_mag").removeAttribute("style");
document.getElementById("head_fire").removeAttribute("style");
document.getElementById("head_ltn").removeAttribute("style");
document.getElementById("head_bleed").removeAttribute("style");
document.getElementById("head_poison").removeAttribute("style");
document.getElementById("head_curse").removeAttribute("style");
document.getElementById("head_poise").removeAttribute("style");
document.getElementById("head_weight").removeAttribute("style");

document.getElementById("chest_phy").removeAttribute("style");
document.getElementById("chest_strike").removeAttribute("style");
document.getElementById("chest_slash").removeAttribute("style");
document.getElementById("chest_thrust").removeAttribute("style");
document.getElementById("chest_mag").removeAttribute("style");
document.getElementById("chest_fire").removeAttribute("style");
document.getElementById("chest_ltn").removeAttribute("style");
document.getElementById("chest_bleed").removeAttribute("style");
document.getElementById("chest_poison").removeAttribute("style");
document.getElementById("chest_curse").removeAttribute("style");
document.getElementById("chest_poise").removeAttribute("style");
document.getElementById("chest_weight").removeAttribute("style");

document.getElementById("hands_phy").removeAttribute("style");
document.getElementById("hands_strike").removeAttribute("style");
document.getElementById("hands_slash").removeAttribute("style");
document.getElementById("hands_thrust").removeAttribute("style");
document.getElementById("hands_mag").removeAttribute("style");
document.getElementById("hands_fire").removeAttribute("style");
document.getElementById("hands_ltn").removeAttribute("style");
document.getElementById("hands_bleed").removeAttribute("style");
document.getElementById("hands_poison").removeAttribute("style");
document.getElementById("hands_curse").removeAttribute("style");
document.getElementById("hands_poise").removeAttribute("style");
document.getElementById("hands_weight").removeAttribute("style");

document.getElementById("legs_phy").removeAttribute("style");
document.getElementById("legs_strike").removeAttribute("style");
document.getElementById("legs_slash").removeAttribute("style");
document.getElementById("legs_thrust").removeAttribute("style");
document.getElementById("legs_mag").removeAttribute("style");
document.getElementById("legs_fire").removeAttribute("style");
document.getElementById("legs_ltn").removeAttribute("style");
document.getElementById("legs_bleed").removeAttribute("style");
document.getElementById("legs_poison").removeAttribute("style");
document.getElementById("legs_curse").removeAttribute("style");
document.getElementById("legs_poise").removeAttribute("style");
document.getElementById("legs_weight").removeAttribute("style");

document.getElementById("total_phy").removeAttribute("style");
document.getElementById("total_strike").removeAttribute("style");
document.getElementById("total_slash").removeAttribute("style");
document.getElementById("total_thrust").removeAttribute("style");
document.getElementById("total_mag").removeAttribute("style");
document.getElementById("total_fire").removeAttribute("style");
document.getElementById("total_ltn").removeAttribute("style");
document.getElementById("total_bleed").removeAttribute("style");
document.getElementById("total_poison").removeAttribute("style");
document.getElementById("total_curse").removeAttribute("style");
document.getElementById("total_poise").removeAttribute("style");
document.getElementById("total_weight").removeAttribute("style");

document.getElementById("head_phy").removeAttribute("title");
document.getElementById("head_strike").removeAttribute("title");
document.getElementById("head_slash").removeAttribute("title");
document.getElementById("head_thrust").removeAttribute("title");
document.getElementById("head_mag").removeAttribute("title");
document.getElementById("head_fire").removeAttribute("title");
document.getElementById("head_ltn").removeAttribute("title");
document.getElementById("head_bleed").removeAttribute("title");
document.getElementById("head_poison").removeAttribute("title");
document.getElementById("head_curse").removeAttribute("title");
document.getElementById("head_poise").removeAttribute("title");
document.getElementById("head_weight").removeAttribute("title");

document.getElementById("chest_phy").removeAttribute("title");
document.getElementById("chest_strike").removeAttribute("title");
document.getElementById("chest_slash").removeAttribute("title");
document.getElementById("chest_thrust").removeAttribute("title");
document.getElementById("chest_mag").removeAttribute("title");
document.getElementById("chest_fire").removeAttribute("title");
document.getElementById("chest_ltn").removeAttribute("title");
document.getElementById("chest_bleed").removeAttribute("title");
document.getElementById("chest_poison").removeAttribute("title");
document.getElementById("chest_curse").removeAttribute("title");
document.getElementById("chest_poise").removeAttribute("title");
document.getElementById("chest_weight").removeAttribute("title");

document.getElementById("hands_phy").removeAttribute("title");
document.getElementById("hands_strike").removeAttribute("title");
document.getElementById("hands_slash").removeAttribute("title");
document.getElementById("hands_thrust").removeAttribute("title");
document.getElementById("hands_mag").removeAttribute("title");
document.getElementById("hands_fire").removeAttribute("title");
document.getElementById("hands_ltn").removeAttribute("title");
document.getElementById("hands_bleed").removeAttribute("title");
document.getElementById("hands_poison").removeAttribute("title");
document.getElementById("hands_curse").removeAttribute("title");
document.getElementById("hands_poise").removeAttribute("title");
document.getElementById("hands_weight").removeAttribute("title");

document.getElementById("legs_phy").removeAttribute("title");
document.getElementById("legs_strike").removeAttribute("title");
document.getElementById("legs_slash").removeAttribute("title");
document.getElementById("legs_thrust").removeAttribute("title");
document.getElementById("legs_mag").removeAttribute("title");
document.getElementById("legs_fire").removeAttribute("title");
document.getElementById("legs_ltn").removeAttribute("title");
document.getElementById("legs_bleed").removeAttribute("title");
document.getElementById("legs_poison").removeAttribute("title");
document.getElementById("legs_curse").removeAttribute("title");
document.getElementById("legs_poise").removeAttribute("title");
document.getElementById("legs_weight").removeAttribute("title");

document.getElementById("total_phy").removeAttribute("title");
document.getElementById("total_strike").removeAttribute("title");
document.getElementById("total_slash").removeAttribute("title");
document.getElementById("total_thrust").removeAttribute("title");
document.getElementById("total_mag").removeAttribute("title");
document.getElementById("total_fire").removeAttribute("title");
document.getElementById("total_ltn").removeAttribute("title");
document.getElementById("total_bleed").removeAttribute("title");
document.getElementById("total_poison").removeAttribute("title");
document.getElementById("total_curse").removeAttribute("title");
document.getElementById("total_poise").removeAttribute("title");
document.getElementById("total_weight").removeAttribute("title");
}

function compareArmor() {
if (parseFloat(arrHead[head_lvl][0]) > parseFloat(arrOriginal[0][0])) {
    document.getElementById("head_phy").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][0]) < parseFloat(arrOriginal[0][0])) {
    document.getElementById("head_phy").style.color = "red";
}
else {
    document.getElementById("head_phy").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][1]) > parseFloat(arrOriginal[0][1])) {
    document.getElementById("head_strike").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][1]) < parseFloat(arrOriginal[0][1])) {
    document.getElementById("head_strike").style.color = "red";
}
else {
    document.getElementById("head_strike").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][2]) > parseFloat(arrOriginal[0][2])) {
    document.getElementById("head_slash").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][2]) < parseFloat(arrOriginal[0][2])) {
    document.getElementById("head_slash").style.color = "red";
}
else {
    document.getElementById("head_slash").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][3]) > parseFloat(arrOriginal[0][3])) {
    document.getElementById("head_thrust").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][3]) < parseFloat(arrOriginal[0][3])) {
    document.getElementById("head_thrust").style.color = "red";
}
else {
    document.getElementById("head_thrust").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][4]) > parseFloat(arrOriginal[0][4])) {
    document.getElementById("head_mag").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][4]) < parseFloat(arrOriginal[0][4])) {
    document.getElementById("head_mag").style.color = "red";
}
else {
    document.getElementById("head_mag").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][5]) > parseFloat(arrOriginal[0][5])) {
    document.getElementById("head_fire").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][5]) < parseFloat(arrOriginal[0][5])) {
    document.getElementById("head_fire").style.color = "red";
}
else {
    document.getElementById("head_fire").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][6]) > parseFloat(arrOriginal[0][6])) {
    document.getElementById("head_ltn").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][6]) < parseFloat(arrOriginal[0][6])) {
    document.getElementById("head_ltn").style.color = "red";
}
else {
    document.getElementById("head_ltn").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][7]) > parseFloat(arrOriginal[0][7])) {
    document.getElementById("head_bleed").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][7]) < parseFloat(arrOriginal[0][7])) {
    document.getElementById("head_bleed").style.color = "red";
}
else {
    document.getElementById("head_bleed").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][8]) > parseFloat(arrOriginal[0][8])) {
    document.getElementById("head_poison").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][8]) < parseFloat(arrOriginal[0][8])) {
    document.getElementById("head_poison").style.color = "red";
}
else {
    document.getElementById("head_poison").removeAttribute("style");
}

if (parseFloat(arrHead[head_lvl][9]) > parseFloat(arrOriginal[0][9])) {
    document.getElementById("head_curse").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[head_lvl][9]) < parseFloat(arrOriginal[0][9])) {
    document.getElementById("head_curse").style.color = "red";
}
else {
    document.getElementById("head_curse").removeAttribute("style");
}

if (parseFloat(arrHead[0][10]) > parseFloat(arrOriginal[0][10])) {
    document.getElementById("head_poise").style.color = "dodgerblue";
}
else if (parseFloat(arrHead[0][10]) < parseFloat(arrOriginal[0][10])) {
    document.getElementById("head_poise").style.color = "red";
}
else {
    document.getElementById("head_poise").removeAttribute("style");
}

if (parseFloat(arrHead[0][11]) > parseFloat(arrOriginal[0][11])) {
    document.getElementById("head_weight").style.color = "red";
}
else if (parseFloat(arrHead[0][11]) < parseFloat(arrOriginal[0][11])) {
    document.getElementById("head_weight").style.color = "dodgerblue";
}
else {
    document.getElementById("head_weight").removeAttribute("style");
}


if (parseFloat(arrChest[chest_lvl][0]) > parseFloat(arrOriginal[1][0])) {
    document.getElementById("chest_phy").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][0]) < parseFloat(arrOriginal[1][0])) {
    document.getElementById("chest_phy").style.color = "red";
}
else {
    document.getElementById("chest_phy").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][1]) > parseFloat(arrOriginal[1][1])) {
    document.getElementById("chest_strike").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][1]) < parseFloat(arrOriginal[1][1])) {
    document.getElementById("chest_strike").style.color = "red";
}
else {
    document.getElementById("chest_strike").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][2]) > parseFloat(arrOriginal[1][2])) {
    document.getElementById("chest_slash").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][2]) < parseFloat(arrOriginal[1][2])) {
    document.getElementById("chest_slash").style.color = "red";
}
else {
    document.getElementById("chest_slash").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][3]) > parseFloat(arrOriginal[1][3])) {
    document.getElementById("chest_thrust").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][3]) < parseFloat(arrOriginal[1][3])) {
    document.getElementById("chest_thrust").style.color = "red";
}
else {
    document.getElementById("chest_thrust").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][4]) > parseFloat(arrOriginal[1][4])) {
    document.getElementById("chest_mag").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][4]) < parseFloat(arrOriginal[1][4])) {
    document.getElementById("chest_mag").style.color = "red";
}
else {
    document.getElementById("chest_mag").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][5]) > parseFloat(arrOriginal[1][5])) {
    document.getElementById("chest_fire").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][5]) < parseFloat(arrOriginal[1][5])) {
    document.getElementById("chest_fire").style.color = "red";
}
else {
    document.getElementById("chest_fire").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][6]) > parseFloat(arrOriginal[1][6])) {
    document.getElementById("chest_ltn").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][6]) < parseFloat(arrOriginal[1][6])) {
    document.getElementById("chest_ltn").style.color = "red";
}
else {
    document.getElementById("chest_ltn").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][7]) > parseFloat(arrOriginal[1][7])) {
    document.getElementById("chest_bleed").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][7]) < parseFloat(arrOriginal[1][7])) {
    document.getElementById("chest_bleed").style.color = "red";
}
else {
    document.getElementById("chest_bleed").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][8]) > parseFloat(arrOriginal[1][8])) {
    document.getElementById("chest_poison").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][8]) < parseFloat(arrOriginal[1][8])) {
    document.getElementById("chest_poison").style.color = "red";
}
else {
    document.getElementById("chest_poison").removeAttribute("style");
}

if (parseFloat(arrChest[chest_lvl][9]) > parseFloat(arrOriginal[1][9])) {
    document.getElementById("chest_curse").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[chest_lvl][9]) < parseFloat(arrOriginal[1][9])) {
    document.getElementById("chest_curse").style.color = "red";
}
else {
    document.getElementById("chest_curse").removeAttribute("style");
}

if (parseFloat(arrChest[0][10]) > parseFloat(arrOriginal[1][10])) {
    document.getElementById("chest_poise").style.color = "dodgerblue";
}
else if (parseFloat(arrChest[0][10]) < parseFloat(arrOriginal[1][10])) {
    document.getElementById("chest_poise").style.color = "red";
}
else {
    document.getElementById("chest_poise").removeAttribute("style");
}

if (parseFloat(arrChest[0][11]) > parseFloat(arrOriginal[1][11])) {
    document.getElementById("chest_weight").style.color = "red";
}
else if (parseFloat(arrChest[0][11]) < parseFloat(arrOriginal[1][11])) {
    document.getElementById("chest_weight").style.color = "dodgerblue";
}
else {
    document.getElementById("chest_weight").removeAttribute("style");
}


if (parseFloat(arrHands[hands_lvl][0]) > parseFloat(arrOriginal[2][0])) {
    document.getElementById("hands_phy").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][0]) < parseFloat(arrOriginal[2][0])) {
    document.getElementById("hands_phy").style.color = "red";
}
else {
    document.getElementById("hands_phy").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][1]) > parseFloat(arrOriginal[2][1])) {
    document.getElementById("hands_strike").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][1]) < parseFloat(arrOriginal[2][1])) {
    document.getElementById("hands_strike").style.color = "red";
}
else {
    document.getElementById("hands_strike").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][2]) > parseFloat(arrOriginal[2][2])) {
    document.getElementById("hands_slash").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][2]) < parseFloat(arrOriginal[2][2])) {
    document.getElementById("hands_slash").style.color = "red";
}
else {
    document.getElementById("hands_slash").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][3]) > parseFloat(arrOriginal[2][3])) {
    document.getElementById("hands_thrust").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][3]) < parseFloat(arrOriginal[2][3])) {
    document.getElementById("hands_thrust").style.color = "red";
}
else {
    document.getElementById("hands_thrust").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][4]) > parseFloat(arrOriginal[2][4])) {
    document.getElementById("hands_mag").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][4]) < parseFloat(arrOriginal[2][4])) {
    document.getElementById("hands_mag").style.color = "red";
}
else {
    document.getElementById("hands_mag").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][5]) > parseFloat(arrOriginal[2][5])) {
    document.getElementById("hands_fire").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][5]) < parseFloat(arrOriginal[2][5])) {
    document.getElementById("hands_fire").style.color = "red";
}
else {
    document.getElementById("hands_fire").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][6]) > parseFloat(arrOriginal[2][6])) {
    document.getElementById("hands_ltn").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][6]) < parseFloat(arrOriginal[2][6])) {
    document.getElementById("hands_ltn").style.color = "red";
}
else {
    document.getElementById("hands_ltn").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][7]) > parseFloat(arrOriginal[2][7])) {
    document.getElementById("hands_bleed").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][7]) < parseFloat(arrOriginal[2][7])) {
    document.getElementById("hands_bleed").style.color = "red";
}
else {
    document.getElementById("hands_bleed").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][8]) > parseFloat(arrOriginal[2][8])) {
    document.getElementById("hands_poison").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][8]) < parseFloat(arrOriginal[2][8])) {
    document.getElementById("hands_poison").style.color = "red";
}
else {
    document.getElementById("hands_poison").removeAttribute("style");
}

if (parseFloat(arrHands[hands_lvl][9]) > parseFloat(arrOriginal[2][9])) {
    document.getElementById("hands_curse").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[hands_lvl][9]) < parseFloat(arrOriginal[2][9])) {
    document.getElementById("hands_curse").style.color = "red";
}
else {
    document.getElementById("hands_curse").removeAttribute("style");
}

if (parseFloat(arrHands[0][10]) > parseFloat(arrOriginal[2][10])) {
    document.getElementById("hands_poise").style.color = "dodgerblue";
}
else if (parseFloat(arrHands[0][10]) < parseFloat(arrOriginal[2][10])) {
    document.getElementById("hands_poise").style.color = "red";
}
else {
    document.getElementById("hands_poise").removeAttribute("style");
}

if (parseFloat(arrHands[0][11]) > parseFloat(arrOriginal[2][11])) {
    document.getElementById("hands_weight").style.color = "red";
}
else if (parseFloat(arrHands[0][11]) < parseFloat(arrOriginal[2][11])) {
    document.getElementById("hands_weight").style.color = "dodgerblue";
}
else {
    document.getElementById("hands_weight").removeAttribute("style");
}


if (parseFloat(arrLegs[legs_lvl][0]) > parseFloat(arrOriginal[3][0])) {
    document.getElementById("legs_phy").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][0]) < parseFloat(arrOriginal[3][0])) {
    document.getElementById("legs_phy").style.color = "red";
}
else {
    document.getElementById("legs_phy").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][1]) > parseFloat(arrOriginal[3][1])) {
    document.getElementById("legs_strike").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][1]) < parseFloat(arrOriginal[3][1])) {
    document.getElementById("legs_strike").style.color = "red";
}
else {
    document.getElementById("legs_strike").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][2]) > parseFloat(arrOriginal[3][2])) {
    document.getElementById("legs_slash").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][2]) < parseFloat(arrOriginal[3][2])) {
    document.getElementById("legs_slash").style.color = "red";
}
else {
    document.getElementById("legs_slash").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][3]) > parseFloat(arrOriginal[3][3])) {
    document.getElementById("legs_thrust").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][3]) < parseFloat(arrOriginal[3][3])) {
    document.getElementById("legs_thrust").style.color = "red";
}
else {
    document.getElementById("legs_thrust").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][4]) > parseFloat(arrOriginal[3][4])) {
    document.getElementById("legs_mag").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][4]) < parseFloat(arrOriginal[3][4])) {
    document.getElementById("legs_mag").style.color = "red";
}
else {
    document.getElementById("legs_mag").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][5]) > parseFloat(arrOriginal[3][5])) {
    document.getElementById("legs_fire").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][5]) < parseFloat(arrOriginal[3][5])) {
    document.getElementById("legs_fire").style.color = "red";
}
else {
    document.getElementById("legs_fire").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][6]) > parseFloat(arrOriginal[3][6])) {
    document.getElementById("legs_ltn").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][6]) < parseFloat(arrOriginal[3][6])) {
    document.getElementById("legs_ltn").style.color = "red";
}
else {
    document.getElementById("legs_ltn").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][7]) > parseFloat(arrOriginal[3][7])) {
    document.getElementById("legs_bleed").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][7]) < parseFloat(arrOriginal[3][7])) {
    document.getElementById("legs_bleed").style.color = "red";
}
else {
    document.getElementById("legs_bleed").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][8]) > parseFloat(arrOriginal[3][8])) {
    document.getElementById("legs_poison").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][8]) < parseFloat(arrOriginal[3][8])) {
    document.getElementById("legs_poison").style.color = "red";
}
else {
    document.getElementById("legs_poison").removeAttribute("style");
}

if (parseFloat(arrLegs[legs_lvl][9]) > parseFloat(arrOriginal[3][9])) {
    document.getElementById("legs_curse").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[legs_lvl][9]) < parseFloat(arrOriginal[3][9])) {
    document.getElementById("legs_curse").style.color = "red";
}
else {
    document.getElementById("legs_curse").removeAttribute("style");
}

if (parseFloat(arrLegs[0][10]) > parseFloat(arrOriginal[3][10])) {
    document.getElementById("legs_poise").style.color = "dodgerblue";
}
else if (parseFloat(arrLegs[0][10]) < parseFloat(arrOriginal[3][10])) {
    document.getElementById("legs_poise").style.color = "red";
}
else {
    document.getElementById("legs_poise").removeAttribute("style");
}

if (parseFloat(arrLegs[0][11]) > parseFloat(arrOriginal[3][11])) {
    document.getElementById("legs_weight").style.color = "red";
}
else if (parseFloat(arrLegs[0][11]) < parseFloat(arrOriginal[3][11])) {
    document.getElementById("legs_weight").style.color = "dodgerblue";
}
else {
    document.getElementById("legs_weight").removeAttribute("style");
}


if (parseFloat(arrTotal[0]) > parseFloat(arrOriginal[4][0])) {
    document.getElementById("total_phy").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[0]) < parseFloat(arrOriginal[4][0])) {
    document.getElementById("total_phy").style.color = "red";
}
else {
    document.getElementById("total_phy").removeAttribute("style");
}

if (parseFloat(arrTotal[1]) > parseFloat(arrOriginal[4][1])) {
    document.getElementById("total_strike").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[1]) < parseFloat(arrOriginal[4][1])) {
    document.getElementById("total_strike").style.color = "red";
}
else {
    document.getElementById("total_strike").removeAttribute("style");
}

if (parseFloat(arrTotal[2]) > parseFloat(arrOriginal[4][2])) {
    document.getElementById("total_slash").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[2]) < parseFloat(arrOriginal[4][2])) {
    document.getElementById("total_slash").style.color = "red";
}
else {
    document.getElementById("total_slash").removeAttribute("style");
}

if (parseFloat(arrTotal[3]) > parseFloat(arrOriginal[4][3])) {
    document.getElementById("total_thrust").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[3]) < parseFloat(arrOriginal[4][3])) {
    document.getElementById("total_thrust").style.color = "red";
}
else {
    document.getElementById("total_thrust").removeAttribute("style");
}

if (parseFloat(arrTotal[4]) > parseFloat(arrOriginal[4][4])) {
    document.getElementById("total_mag").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[4]) < parseFloat(arrOriginal[4][4])) {
    document.getElementById("total_mag").style.color = "red";
}
else {
    document.getElementById("total_mag").removeAttribute("style");
}

if (parseFloat(arrTotal[5]) > parseFloat(arrOriginal[4][5])) {
    document.getElementById("total_fire").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[5]) < parseFloat(arrOriginal[4][5])) {
    document.getElementById("total_fire").style.color = "red";
}
else {
    document.getElementById("total_fire").removeAttribute("style");
}

if (parseFloat(arrTotal[6]) > parseFloat(arrOriginal[4][6])) {
    document.getElementById("total_ltn").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[6]) < parseFloat(arrOriginal[4][6])) {
    document.getElementById("total_ltn").style.color = "red";
}
else {
    document.getElementById("total_ltn").removeAttribute("style");
}

if (parseFloat(arrTotal[7]) > parseFloat(arrOriginal[4][7])) {
    document.getElementById("total_bleed").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[7]) < parseFloat(arrOriginal[4][7])) {
    document.getElementById("total_bleed").style.color = "red";
}
else {
    document.getElementById("total_bleed").removeAttribute("style");
}

if (parseFloat(arrTotal[8]) > parseFloat(arrOriginal[4][8])) {
    document.getElementById("total_poison").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[8]) < parseFloat(arrOriginal[4][8])) {
    document.getElementById("total_poison").style.color = "red";
}
else {
    document.getElementById("total_poison").removeAttribute("style");
}

if (parseFloat(arrTotal[9]) > parseFloat(arrOriginal[4][9])) {
    document.getElementById("total_curse").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[9]) < parseFloat(arrOriginal[4][9])) {
    document.getElementById("total_curse").style.color = "red";
}
else {
    document.getElementById("total_curse").removeAttribute("style");
}

if (parseFloat(arrTotal[10]) > parseFloat(arrOriginal[4][10])) {
    document.getElementById("total_poise").style.color = "dodgerblue";
}
else if (parseFloat(arrTotal[10]) < parseFloat(arrOriginal[4][10])) {
    document.getElementById("total_poise").style.color = "red";
}
else {
    document.getElementById("total_poise").removeAttribute("style");
}

if (parseFloat(arrTotal[11]) > parseFloat(arrOriginal[4][11])) {
    document.getElementById("total_weight").style.color = "red";
}
else if (parseFloat(arrTotal[11]) < parseFloat(arrOriginal[4][11])) {
    document.getElementById("total_weight").style.color = "dodgerblue";
}
else {
    document.getElementById("total_weight").removeAttribute("style");
}

var arrHeadDiff = [
    (parseFloat(arrHead[head_lvl][0]) - parseFloat(arrOriginal[0][0])).toFixed(1),
    (parseFloat(arrHead[head_lvl][1]) - parseFloat(arrOriginal[0][1])).toFixed(1),
    (parseFloat(arrHead[head_lvl][2]) - parseFloat(arrOriginal[0][2])).toFixed(1),
    (parseFloat(arrHead[head_lvl][3]) - parseFloat(arrOriginal[0][3])).toFixed(1),
    (parseFloat(arrHead[head_lvl][4]) - parseFloat(arrOriginal[0][4])).toFixed(1),
    (parseFloat(arrHead[head_lvl][5]) - parseFloat(arrOriginal[0][5])).toFixed(1),
    (parseFloat(arrHead[head_lvl][6]) - parseFloat(arrOriginal[0][6])).toFixed(1),
    (parseFloat(arrHead[head_lvl][7]) - parseFloat(arrOriginal[0][7])).toFixed(1),
    (parseFloat(arrHead[head_lvl][8]) - parseFloat(arrOriginal[0][8])).toFixed(1),
    (parseFloat(arrHead[head_lvl][9]) - parseFloat(arrOriginal[0][9])).toFixed(1),
    (parseFloat(arrHead[0][10]) - parseFloat(arrOriginal[0][10])).toFixed(1),
    (parseFloat(arrHead[0][11]) - parseFloat(arrOriginal[0][11])).toFixed(1)
    ];

var arrChestDiff = [
    (parseFloat(arrChest[chest_lvl][0]) - parseFloat(arrOriginal[1][0])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][1]) - parseFloat(arrOriginal[1][1])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][2]) - parseFloat(arrOriginal[1][2])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][3]) - parseFloat(arrOriginal[1][3])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][4]) - parseFloat(arrOriginal[1][4])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][5]) - parseFloat(arrOriginal[1][5])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][6]) - parseFloat(arrOriginal[1][6])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][7]) - parseFloat(arrOriginal[1][7])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][8]) - parseFloat(arrOriginal[1][8])).toFixed(1),
    (parseFloat(arrChest[chest_lvl][9]) - parseFloat(arrOriginal[1][9])).toFixed(1),
    (parseFloat(arrChest[0][10]) - parseFloat(arrOriginal[1][10])).toFixed(1),
    (parseFloat(arrChest[0][11]) - parseFloat(arrOriginal[1][11])).toFixed(1)
    ];

var arrHandsDiff = [
    (parseFloat(arrHands[hands_lvl][0]) - parseFloat(arrOriginal[2][0])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][1]) - parseFloat(arrOriginal[2][1])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][2]) - parseFloat(arrOriginal[2][2])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][3]) - parseFloat(arrOriginal[2][3])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][4]) - parseFloat(arrOriginal[2][4])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][5]) - parseFloat(arrOriginal[2][5])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][6]) - parseFloat(arrOriginal[2][6])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][7]) - parseFloat(arrOriginal[2][7])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][8]) - parseFloat(arrOriginal[2][8])).toFixed(1),
    (parseFloat(arrHands[hands_lvl][9]) - parseFloat(arrOriginal[2][9])).toFixed(1),
    (parseFloat(arrHands[0][10]) - parseFloat(arrOriginal[2][10])).toFixed(1),
    (parseFloat(arrHands[0][11]) - parseFloat(arrOriginal[2][11])).toFixed(1)
    ];

var arrLegsDiff = [
    (parseFloat(arrLegs[legs_lvl][0]) - parseFloat(arrOriginal[3][0])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][1]) - parseFloat(arrOriginal[3][1])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][2]) - parseFloat(arrOriginal[3][2])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][3]) - parseFloat(arrOriginal[3][3])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][4]) - parseFloat(arrOriginal[3][4])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][5]) - parseFloat(arrOriginal[3][5])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][6]) - parseFloat(arrOriginal[3][6])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][7]) - parseFloat(arrOriginal[3][7])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][8]) - parseFloat(arrOriginal[3][8])).toFixed(1),
    (parseFloat(arrLegs[legs_lvl][9]) - parseFloat(arrOriginal[3][9])).toFixed(1),
    (parseFloat(arrLegs[0][10]) - parseFloat(arrOriginal[3][10])).toFixed(1),
    (parseFloat(arrLegs[0][11]) - parseFloat(arrOriginal[3][11])).toFixed(1)
    ];
    
var arrTotalDiff = [
    (parseFloat(arrTotal[0]) - parseFloat(arrOriginal[4][0])).toFixed(1),
    (parseFloat(arrTotal[1]) - parseFloat(arrOriginal[4][1])).toFixed(1),
    (parseFloat(arrTotal[2]) - parseFloat(arrOriginal[4][2])).toFixed(1),
    (parseFloat(arrTotal[3]) - parseFloat(arrOriginal[4][3])).toFixed(1),
    (parseFloat(arrTotal[4]) - parseFloat(arrOriginal[4][4])).toFixed(1),
    (parseFloat(arrTotal[5]) - parseFloat(arrOriginal[4][5])).toFixed(1),
    (parseFloat(arrTotal[6]) - parseFloat(arrOriginal[4][6])).toFixed(1),
    (parseFloat(arrTotal[7]) - parseFloat(arrOriginal[4][7])).toFixed(1),
    (parseFloat(arrTotal[8]) - parseFloat(arrOriginal[4][8])).toFixed(1),
    (parseFloat(arrTotal[9]) - parseFloat(arrOriginal[4][9])).toFixed(1),
    (parseFloat(arrTotal[10]) - parseFloat(arrOriginal[4][10])).toFixed(1),
    (parseFloat(arrTotal[11]) - parseFloat(arrOriginal[4][11])).toFixed(1)
    ];

var arrDiff = [
    arrHeadDiff,
    arrChestDiff,
    arrHandsDiff,
    arrLegsDiff,
    arrTotalDiff
    ];

if (parseFloat(arrDiff[0][0]) >= 0) {
    document.getElementById("head_phy").title = "+" + arrDiff[0][0];
}
else {
    document.getElementById("head_phy").title = arrDiff[0][0];
}
if (parseFloat(arrDiff[0][1]) >= 0) {
    document.getElementById("head_strike").title = "+" + arrDiff[0][1];
}
else {
    document.getElementById("head_strike").title = arrDiff[0][1];
}
if (parseFloat(arrDiff[0][2]) >= 0) {
    document.getElementById("head_slash").title = "+" + arrDiff[0][2];
}
else {
    document.getElementById("head_slash").title = arrDiff[0][2];
}
if (parseFloat(arrDiff[0][3]) >= 0) {
    document.getElementById("head_thrust").title = "+" + arrDiff[0][3];
}
else {
    document.getElementById("head_thrust").title = arrDiff[0][3];
}
if (parseFloat(arrDiff[0][4]) >= 0) {
    document.getElementById("head_mag").title = "+" + arrDiff[0][4];
}
else {
    document.getElementById("head_mag").title = arrDiff[0][4];
}
if (parseFloat(arrDiff[0][5]) >= 0) {
    document.getElementById("head_fire").title = "+" + arrDiff[0][5];
}
else {
    document.getElementById("head_fire").title = arrDiff[0][5];
}
if (parseFloat(arrDiff[0][6]) >= 0) {
    document.getElementById("head_ltn").title = "+" + arrDiff[0][6];
}
else {
    document.getElementById("head_ltn").title = arrDiff[0][6];
}
if (parseFloat(arrDiff[0][7]) >= 0) {
    document.getElementById("head_bleed").title = "+" + arrDiff[0][7];
}
else {
    document.getElementById("head_bleed").title = arrDiff[0][7];
}
if (parseFloat(arrDiff[0][8]) >= 0) {
    document.getElementById("head_poison").title = "+" + arrDiff[0][8];
}
else {
    document.getElementById("head_poison").title = arrDiff[0][8];
}
if (parseFloat(arrDiff[0][9]) >= 0) {
    document.getElementById("head_curse").title = "+" + arrDiff[0][9];
}
else {
    document.getElementById("head_curse").title = arrDiff[0][9];
}
if (parseFloat(arrDiff[0][10]) >= 0) {
    document.getElementById("head_poise").title = "+" + arrDiff[0][10];
}
else {
    document.getElementById("head_poise").title = arrDiff[0][10];
}
if (parseFloat(arrDiff[0][11]) >= 0) {
    document.getElementById("head_weight").title = "+" + arrDiff[0][11];
}
else {
    document.getElementById("head_weight").title = arrDiff[0][11];
}

if (parseFloat(arrDiff[1][0]) >= 0) {
    document.getElementById("chest_phy").title = "+" + arrDiff[1][0];
}
else {
    document.getElementById("chest_phy").title = arrDiff[1][0];
}
if (parseFloat(arrDiff[1][1]) >= 0) {
    document.getElementById("chest_strike").title = "+" + arrDiff[1][1];
}
else {
    document.getElementById("chest_strike").title = arrDiff[1][1];
}
if (parseFloat(arrDiff[1][2]) >= 0) {
    document.getElementById("chest_slash").title = "+" + arrDiff[1][2];
}
else {
    document.getElementById("chest_slash").title = arrDiff[1][2];
}
if (parseFloat(arrDiff[1][3]) >= 0) {
    document.getElementById("chest_thrust").title = "+" + arrDiff[1][3];
}
else {
    document.getElementById("chest_thrust").title = arrDiff[1][3];
}
if (parseFloat(arrDiff[1][4]) >= 0) {
    document.getElementById("chest_mag").title = "+" + arrDiff[1][4];
}
else {
    document.getElementById("chest_mag").title = arrDiff[1][4];
}
if (parseFloat(arrDiff[1][5]) >= 0) {
    document.getElementById("chest_fire").title = "+" + arrDiff[1][5];
}
else {
    document.getElementById("chest_fire").title = arrDiff[1][5];
}
if (parseFloat(arrDiff[1][6]) >= 0) {
    document.getElementById("chest_ltn").title = "+" + arrDiff[1][6];
}
else {
    document.getElementById("chest_ltn").title = arrDiff[1][6];
}
if (parseFloat(arrDiff[1][7]) >= 0) {
    document.getElementById("chest_bleed").title = "+" + arrDiff[1][7];
}
else {
    document.getElementById("chest_bleed").title = arrDiff[1][7];
}
if (parseFloat(arrDiff[1][8]) >= 0) {
    document.getElementById("chest_poison").title = "+" + arrDiff[1][8];
}
else {
    document.getElementById("chest_poison").title = arrDiff[1][8];
}
if (parseFloat(arrDiff[1][9]) >= 0) {
    document.getElementById("chest_curse").title = "+" + arrDiff[1][9];
}
else {
    document.getElementById("chest_curse").title = arrDiff[1][9];
}
if (parseFloat(arrDiff[1][10]) >= 0) {
    document.getElementById("chest_poise").title = "+" + arrDiff[1][10];
}
else {
    document.getElementById("chest_poise").title = arrDiff[1][10];
}
if (parseFloat(arrDiff[1][11]) >= 0) {
    document.getElementById("chest_weight").title = "+" + arrDiff[1][11];
}
else {
    document.getElementById("chest_weight").title = arrDiff[1][11];
}

if (parseFloat(arrDiff[2][0]) >= 0) {
    document.getElementById("hands_phy").title = "+" + arrDiff[2][0];
}
else {
    document.getElementById("hands_phy").title = arrDiff[2][0];
}
if (parseFloat(arrDiff[2][1]) >= 0) {
    document.getElementById("hands_strike").title = "+" + arrDiff[2][1];
}
else {
    document.getElementById("hands_strike").title = arrDiff[2][1];
}
if (parseFloat(arrDiff[2][2]) >= 0) {
    document.getElementById("hands_slash").title = "+" + arrDiff[2][2];
}
else {
    document.getElementById("hands_slash").title = arrDiff[2][2];
}
if (parseFloat(arrDiff[2][3]) >= 0) {
    document.getElementById("hands_thrust").title = "+" + arrDiff[2][3];
}
else {
    document.getElementById("hands_thrust").title = arrDiff[2][3];
}
if (parseFloat(arrDiff[2][4]) >= 0) {
    document.getElementById("hands_mag").title = "+" + arrDiff[2][4];
}
else {
    document.getElementById("hands_mag").title = arrDiff[2][4];
}
if (parseFloat(arrDiff[2][5]) >= 0) {
    document.getElementById("hands_fire").title = "+" + arrDiff[2][5];
}
else {
    document.getElementById("hands_fire").title = arrDiff[2][5];
}
if (parseFloat(arrDiff[2][6]) >= 0) {
    document.getElementById("hands_ltn").title = "+" + arrDiff[2][6];
}
else {
    document.getElementById("hands_ltn").title = arrDiff[2][6];
}
if (parseFloat(arrDiff[2][7]) >= 0) {
    document.getElementById("hands_bleed").title = "+" + arrDiff[2][7];
}
else {
    document.getElementById("hands_bleed").title = arrDiff[2][7];
}
if (parseFloat(arrDiff[2][8]) >= 0) {
    document.getElementById("hands_poison").title = "+" + arrDiff[2][8];
}
else {
    document.getElementById("hands_poison").title = arrDiff[2][8];
}
if (parseFloat(arrDiff[2][9]) >= 0) {
    document.getElementById("hands_curse").title = "+" + arrDiff[2][9];
}
else {
    document.getElementById("hands_curse").title = arrDiff[2][9];
}
if (parseFloat(arrDiff[2][10]) >= 0) {
    document.getElementById("hands_poise").title = "+" + arrDiff[2][10];
}
else {
    document.getElementById("hands_poise").title = arrDiff[2][10];
}
if (parseFloat(arrDiff[2][11]) >= 0) {
    document.getElementById("hands_weight").title = "+" + arrDiff[2][11];
}
else {
    document.getElementById("hands_weight").title = arrDiff[2][11];
}

if (parseFloat(arrDiff[3][0]) >= 0) {
    document.getElementById("legs_phy").title = "+" + arrDiff[3][0];
}
else {
    document.getElementById("legs_phy").title = arrDiff[3][0];
}
if (parseFloat(arrDiff[3][1]) >= 0) {
    document.getElementById("legs_strike").title = "+" + arrDiff[3][1];
}
else {
    document.getElementById("legs_strike").title = arrDiff[3][1];
}
if (parseFloat(arrDiff[3][2]) >= 0) {
    document.getElementById("legs_slash").title = "+" + arrDiff[3][2];
}
else {
    document.getElementById("legs_slash").title = arrDiff[3][2];
}
if (parseFloat(arrDiff[3][3]) >= 0) {
    document.getElementById("legs_thrust").title = "+" + arrDiff[3][3];
}
else {
    document.getElementById("legs_thrust").title = arrDiff[3][3];
}
if (parseFloat(arrDiff[3][4]) >= 0) {
    document.getElementById("legs_mag").title = "+" + arrDiff[3][4];
}
else {
    document.getElementById("legs_mag").title = arrDiff[3][4];
}
if (parseFloat(arrDiff[3][5]) >= 0) {
    document.getElementById("legs_fire").title = "+" + arrDiff[3][5];
}
else {
    document.getElementById("legs_fire").title = arrDiff[3][5];
}
if (parseFloat(arrDiff[3][6]) >= 0) {
    document.getElementById("legs_ltn").title = "+" + arrDiff[3][6];
}
else {
    document.getElementById("legs_ltn").title = arrDiff[3][6];
}
if (parseFloat(arrDiff[3][7]) >= 0) {
    document.getElementById("legs_bleed").title = "+" + arrDiff[3][7];
}
else {
    document.getElementById("legs_bleed").title = arrDiff[3][7];
}
if (parseFloat(arrDiff[3][8]) >= 0) {
    document.getElementById("legs_poison").title = "+" + arrDiff[3][8];
}
else {
    document.getElementById("legs_poison").title = arrDiff[3][8];
}
if (parseFloat(arrDiff[3][9]) >= 0) {
    document.getElementById("legs_curse").title = "+" + arrDiff[3][9];
}
else {
    document.getElementById("legs_curse").title = arrDiff[3][9];
}
if (parseFloat(arrDiff[3][10]) >= 0) {
    document.getElementById("legs_poise").title = "+" + arrDiff[3][10];
}
else {
    document.getElementById("legs_poise").title = arrDiff[3][10];
}
if (parseFloat(arrDiff[3][11]) >= 0) {
    document.getElementById("legs_weight").title = "+" + arrDiff[3][11];
}
else {
    document.getElementById("legs_weight").title = arrDiff[3][11];
}

if (parseFloat(arrDiff[4][0]) >= 0) {
    document.getElementById("total_phy").title = "+" + arrDiff[4][0];
}
else {
    document.getElementById("total_phy").title = arrDiff[4][0];
}
if (parseFloat(arrDiff[4][1]) >= 0) {
    document.getElementById("total_strike").title = "+" + arrDiff[4][1];
}
else {
    document.getElementById("total_strike").title = arrDiff[4][1];
}
if (parseFloat(arrDiff[4][2]) >= 0) {
    document.getElementById("total_slash").title = "+" + arrDiff[4][2];
}
else {
    document.getElementById("total_slash").title = arrDiff[4][2];
}
if (parseFloat(arrDiff[4][3]) >= 0) {
    document.getElementById("total_thrust").title = "+" + arrDiff[4][3];
}
else {
    document.getElementById("total_thrust").title = arrDiff[4][3];
}
if (parseFloat(arrDiff[4][4]) >= 0) {
    document.getElementById("total_mag").title = "+" + arrDiff[4][4];
}
else {
    document.getElementById("total_mag").title = arrDiff[4][4];
}
if (parseFloat(arrDiff[4][5]) >= 0) {
    document.getElementById("total_fire").title = "+" + arrDiff[4][5];
}
else {
    document.getElementById("total_fire").title = arrDiff[4][5];
}
if (parseFloat(arrDiff[4][6]) >= 0) {
    document.getElementById("total_ltn").title = "+" + arrDiff[4][6];
}
else {
    document.getElementById("total_ltn").title = arrDiff[4][6];
}
if (parseFloat(arrDiff[4][7]) >= 0) {
    document.getElementById("total_bleed").title = "+" + arrDiff[4][7];
}
else {
    document.getElementById("total_bleed").title = arrDiff[4][7];
}
if (parseFloat(arrDiff[4][8]) >= 0) {
    document.getElementById("total_poison").title = "+" + arrDiff[4][8];
}
else {
    document.getElementById("total_poison").title = arrDiff[4][8];
}
if (parseFloat(arrDiff[4][9]) >= 0) {
    document.getElementById("total_curse").title = "+" + arrDiff[4][9];
}
else {
    document.getElementById("total_curse").title = arrDiff[4][9];
}
if (parseFloat(arrDiff[4][10]) >= 0) {
    document.getElementById("total_poise").title = "+" + arrDiff[4][10];
}
else {
    document.getElementById("total_poise").title = arrDiff[4][10];
}
if (parseFloat(arrDiff[4][11]) >= 0) {
    document.getElementById("total_weight").title = "+" + arrDiff[4][11];
}
else {
    document.getElementById("total_weight").title = arrDiff[4][11];
}
}