/* Custom user rights icons on userpages start */
importArticles({
    type: "script",
    articles: [
        'u:dev:AddRailModule/code.js',
        'u:dev:ToggleTestMode/code.js'
        //'u:dev:MediaWiki:DiscordIntegrator/code.js'
    ]
});
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk" || wgPageName.indexOf("Special:Contributions") != -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}
/* Custom user rights icons on userpages end */

/* Custom Tooltips for use with the Tooltips/code.js */
var tooltips_list = [
    {
        classname: 'mod-icon', 
        parse: '{'+'{Tooltip/Mod|<#param#>}}',
    }
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};

/* Dynamic pictures begin*/
( function () {
'use strict';
 
var dynamicImages = document.getElementsByClassName( 'dynamic-images'),
i, imageSet , j;
 
for ( i = 0; i < dynamicImages.length; i++ ) {
imageSet = dynamicImages[i].getElementsByClassName( 'image' );
for ( j = 0; j < imageSet.length; j++ ) {
if ( j > 0 ) {
imageSet[j].style.display = 'none';
}
imageSet[j].addEventListener( 'click', function ( event ) {
event.stopImmediatePropagation();
event.preventDefault();
this.style.display = 'none';
if ( this.nextElementSibling !== null ) {
this.nextElementSibling.style.display = 'inline';
} else {
this.parentNode.getElementsByClassName( 'image' )[0].style.display = 'inline';
}
});
}
}
}() );
/* Dynamic pictures end*/



// Kselias and tunas magic interactive stuff 
// -------------calculater------------------------
//WFstats
function calculate_str() {
  var WarframeSTR = (1 + getCurrent("Intensify") + getCurrent("Power_Drift") + getCurrent("Blind_Rage") + getCurrent("Transient_Fortitude") + getCurrent("Energy_Conversion") + getCurrentMalus('Overextended') + getCurrent('Growing_Power') + getCurrent("Pacify_&_Provoke")) * getCurrent("Parasitic_Link") * getCurrent("Corruption");
  document.getElementById('abilitySTR').value = (WarframeSTR * 100).toFixed(2) + "%";
}

function calculate_dur() {
  var WarframeDUR = 1 + getCurrent("Primed_Continuity") + getCurrent("Constitution") + getCurrent("Narrow_Minded") + getCurrentMalus("Transient_Fortitude") + getCurrentMalus("Fleeting_Expertise");
  document.getElementById('abilityDUR').value = (WarframeDUR * 100).toFixed(2) + "%";
}

function calculate_rng() {
  var WarframeRNG = (1 + getCurrent('Stretch') + getCurrent('Cunning_Drift') + getCurrent('Overextended') + getCurrentMalus("Narrow_Minded")) * getCurrent("Corruption");
  document.getElementById('abilityRNG').value = (WarframeRNG * 100).toFixed(2) + "%";
}

function calculate_eff() {
  var WarframeEFF = 1 + getCurrent('Streamline') + getCurrent('Fleeting_Expertise') + getCurrentMalus("Blind_Rage");
  document.getElementById('abilityEFF').value = (WarframeEFF * 100).toFixed(2) + "%";
}

//armor
function calculate_arm() {
	var modBonus = (1 + getCurrent('Steel_Fiber') + getCurrent('Armored_Agility')  + getCurrent('Stone_Shape') + getCurrent('Stone_Armor') + getCurrent('Warcry') + getCurrent('Elemental_Ward')) * getCurrent('Vex_Armor');
	document.getElementById('frameArmor').value = '+'+((modBonus-1) * 100).toFixed(1) +'%';
	netArmor = document.getElementById('base_armor').value * modBonus + getCurrent('Renewal')*100 + getCurrent('Hallowed_Reckoning')*100;
	document.getElementById('arm_result').value = netArmor.toFixed(2);
	document.getElementById('arm_reduct').value =(100*netArmor/(300+netArmor)).toFixed(2)+'%';
	document.getElementById('arm_effhealth').value = (1/(1-netArmor/(300+netArmor))).toFixed(2);
}

function calculate() {
	if ($('#MaximizationContainer').length) {
  	calculate_str();
  	calculate_dur();
  	calculate_eff();
  	calculate_rng();
	}
	if ($('#ArmorContainer').length) {
		calculate_arm();
	}
  //var WarframeDamage = document.getElementById('baseDamage').value;
  //document.getElementById('result').value = (WarframeDamage * WarframeSTR).toFixed(2);
}

function getCurrent(name) {
  parent = document.getElementById(name);
  if (parent.getElementsByClassName('check')[0].checked) {
    return parent.getElementsByClassName('currentEffect')[0].value / 100;
  } else if (parent.className == "*") {
    return 1;
  } else {
    return 0;
  }
}

function getCurrentMalus(name) {
  parent = document.getElementById(name);
  if (parent.getElementsByClassName('check')[0].checked) {
    return parent.getElementsByClassName('currentEffect')[1].value / 100;
  } else {
    return 0;
  }
}

// ------------------ loader--------------------
$(document).ready(function() {
  if ($('#MaximizationContainer').length) {
    // stuff before the frame stats
    var html = "<table width='640px' border='0'>";
    html += makeRow("Base damage", "baseDamage", "''", 100);
    html += "</table>";
    //frame stats
    html += "<table width='640px' border='0'>";
    html += "<tr><td><h4>Stats</h4></td><td><h4>Equipped mods:</h4></td><td><h4>Rank</h4></td><td><h4>Bonus</h4></td><td><h4>Malus</h4></td></tr>";
    // first mod in each category must have the statCell as last argument, all other an empty string
    html += loadMod("Intensify", 5, 5, 0, '', statCell("Strength", "abilitySTR", 4));
    html += loadMod("Power Drift", 5, 2.5, 0, '', '');
    html += loadMod("Transient Fortitude", 10, 5, -2.5, 'DUR', '');
    html += loadMod('Blind Rage', 10, 9, -5, 'EFF', '');
    html += spaaaace();
    html += loadMod('Stretch', 5, 7.5, 0, '', statCell("Range", "abilityRNG", 3));
    html += loadMod("Cunning Drift", 5, 2.5, 0, '', '');
    html += loadMod('Overextended', 5, 15, -10, 'STR', '');
    html += spaaaace();
    html += loadMod('Streamline', 5, 5, 0, '', statCell("Efficiency", "abilityEFF", 2));
    html += loadMod('Fleeting Expertise', 5, 10, -10, 'DUR', '');
    html += spaaaace();
    html += loadMod('Primed Continuity', 10, 5, 0, '', statCell("Duration", "abilityDUR", 3));
    html += loadMod('Constitution', 3, 7, 0, '', '');
    html += loadMod('Narrow Minded', 10, 9, -6, 'RNG', '');
    html += "</table>";
    // occasional stuff
    html += "<table width='640px' border='0'>";
    html += "<tr><td><h4>Buff</h4></td><td><h4>Count</h4></td><td><h4>Bonus</h4></td></tr>";
    html += loadBuff('Energy Conversion', '', 1, 50, '% STR', '+');
    html += loadBuff('Growing Power', '', 8, 25, '% STR', '+');
    html += loadBuff('Pacify & Provoke', '', 80, 1, '% STR', '+');
    html += loadBuff('Parasitic Link', '', 200, 1, '% STR', '*');
    html += loadBuff('Roar', '', 187, 1, '% DMG', '*');
    html += loadBuff('Corruption', 'Void_Relic#Relic_Corruption', 1, 200, '% STR & RNG', '*');
    html += "</table>";
    //ability stats
    html += "<table width='640px' border='0'>";
    html += makeRow("[PH] STR Result", "result", "Result", "");
    document.getElementById('MaximizationContainer').innerHTML = html + "</table>";
  }
	if ($('#ArmorContainer').length) {
	//ability stats
    var html = "<table width='480px' border='0'>";
		html += makeRowInput("Base Armor", "base_armor", "''", 15);
	  html += spaaaace();
		html += makeRow("Armor Bonus", "frameArmor", "Result", "");
    html += makeRow("Armor Result", "arm_result", "Result", "");
		html += makeRow("Damage Reduction", "arm_reduct", "Result", "");
		html += makeRow("Effective Health Multiplier", "arm_effhealth", "Result", "");
		html += spaaaace();
		//frame stats
    html += "<tr class='MaxiHeadingRow'><td>Mods</td><td>Rank</td><td>Bonus</td></tr>";
    // first mod in each category must have the statCell as last argument, all other an empty string
    html += loadMod("Steel Fiber", 10, 10, 0, '', '');
    html += loadMod("Armored Agility", 5, 7.5, 0, '', '');
    // occasional stuff
    html += "<tr class='MaxiHeadingRow'><td>Buffs</td><td>Count</td><td>Bonus</td></tr>";
    html += loadBuff('Stone Shape', 'Focus/Unairu', 1, 12, '%', '+');
    html += loadBuff('Stone Armor', 'Focus/Unairu', 1, 50, '%', '+');
    html += loadBuff('Warcry', '', 142, 1, '%', '+');		
    html += loadBuff('Elemental Ward','', 524, 1, '%', '+');
    html += loadBuff('Hallowed Reckoning','',  748, 1, 'flat', '+');
    html += loadBuff('Renewal','',  600, 1, 'flat', '+');
    html += loadBuff('Vex Armor','', 12.22, 100, '%', '*');
    html += "</table>";
    document.getElementById('ArmorContainer').innerHTML = html;
	}
	calculate();
});

function loadMod(name, ranks, bonus, malus, badStat, statCell) {
  var html = "<tr id=" + name.replace(/ /g, "_") + ">" + statCell + "<td><input type='checkbox' class='check' onchange='updateCheck(this)'><a href='/wiki/" + name + "' title='" + name + "'>" + name + "</a></td>";
  html += "<td><input class='currentRank' onchange='changeRank(this)' type='number' min=0 max=" + ranks + " value=" + ranks + " disabled>";
  html += "<input class='maxbtn' type='button' value='max' onclick='clickMaxbtn(this)' disabled></td>";
  html += "<td><input class='bonus' type='number' value=" + bonus + " Hidden>";
  html += "+<input class='currentEffect' type='text' value=" + (ranks + 1) * bonus + " disabled>%</td>";
  if (malus) { // checks if malus is unequal 0
    html += "<td><input class='bonus' type='number' value=" + malus + " Hidden>";
    html += "<input class='currentEffect' type='text' value=" + (ranks + 1) * malus + " disabled>% " + badStat + "</td>";
  }
  return html + "</tr>";
}

function loadBuff(name, link, buffstr, bonus, stat, operation) {
  var html = "<tr id=" + name.replace(/ /g, "_") + " class=" + operation + "><td><input type='checkbox' class='check' onchange='updateCheck(this)'><a href='/wiki/";
  if (link) {
    html += link;
  } else{ // add correct link
	html += name;}
  html += "' title='" + name + "'>" + name + "</a></td>";
  if (buffstr != 1) {
		if ((operation == "*") && (stat === '%')) {
			html += "<td><input class='currentRank count' onchange='changeRank(this)' type='number' step=0.01 min=0.01 max=" + buffstr + " value=" + buffstr + " disabled>";
		}else{
			html += "<td><input class='currentRank count' onchange='changeRank(this)' type='number' min=1 max=" + buffstr + " value=" + buffstr + " disabled>";
		}
    html += "<input class='maxbtn' type='button' value='max' onclick='clickMaxbtn(this)' disabled></td>";
  } else {
    html += "<td><input class='currentRank' disabled Hidden><input class='maxbtn' onclick='clickMaxbtn(this)' Hidden disabled></td>";
  }
  html += "<td><input class='bonus' type='number' value=" + bonus + " Hidden>";
	html += operation + "<input class='currentEffect' type='text' value=" + buffstr * bonus + " disabled>" + stat + "</td>";
  return html + "</tr>";
}

function makeRow(text1, id, ph, value) {
  return "<tr><td>" + text1 + ":</td><td><input class='resultingStat' id=" + id + " readonly placeholder=" + ph + " value=" + value + "></td></tr>";
}
function makeRowInput(text1, id, ph, value) {
  return "<tr><td>" + text1 + ":</td><td><input class='currentRank' type='number' onchange='calculate()' id=" + id + " placeholder=" + ph + " value=" + value + "></td></tr>";
}

function statCell(stat, id, numOfMods) {
  return "<td rowspan=" + numOfMods + " class='statCell'><a href='/wiki/Powers#Power_" + stat + "' title='" + stat + "'>" + stat + "</a>:<br /><input class='resultingStat' id=" + id + " readonly value='100.00%'></td>";
}

function spaaaace() {
  return "<tr class='MaxiSpacer'><td></td></tr>";
}

// ------------ updater---------------
//disable mod inputs as long as the mod is disabled
//$('input:checkbox').change(
function updateCheck(that) {
  var parent = that.closest("tr");
  if (that.checked) {
    parent.getElementsByClassName("currentRank")[0].disabled = false;
    parent.getElementsByClassName("maxbtn")[0].disabled = false;
    curr = parent.getElementsByClassName("currentEffect");
    curr[0].style.color = "green";
    if (curr.length > 1) {
      curr[1].style.color = "red";
    }
    if (parent.id == "Corruption") {
      document.body.style.backgroundColor = "lemonchiffon";
    }
    // count up cheat counter here
  } else {
    parent.getElementsByClassName("currentRank")[0].disabled = true;
    parent.getElementsByClassName("maxbtn")[0].disabled = true;
    curr = parent.getElementsByClassName("currentEffect");
    curr[0].style.color = "#dadada";
    if (curr.length > 1) {
      curr[1].style.color = "#dadada";
    }
    if (parent.id == "Corruption") {
      document.body.style.backgroundColor = "transparent";
    }
    // ... and down here
  }
  calculate();
} //);

// update bonus dynamically
//$('.currentRank').change(function() {
function changeRank(that) {
  var parent = that.closest("tr");
  curr = parent.getElementsByClassName("currentEffect");
  bonus = parent.getElementsByClassName("bonus");
  if (that.className == "currentRank count") {
    curr[0].value = parseFloat(that.value) * bonus[0].value;
  } else {
    curr[0].value = (parseFloat(that.value) + 1) * bonus[0].value;
  }
  if (curr.length > 1) {
    curr[1].value = (parseFloat(that.value) + 1) * bonus[1].value;
  }
  calculate();
} //);
//$('.maxbtn').click(function() {
function clickMaxbtn(that) {
  var rank = that.closest("tr").getElementsByClassName("currentRank")[0];
  rank.value = rank.max;
  $(rank).trigger("change"); // force update!
} //);

// end of magic stuff