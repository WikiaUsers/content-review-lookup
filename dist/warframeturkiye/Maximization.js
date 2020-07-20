/* Kselia and Tuna: magic interactive stuff */
// -------------calculater------------------------
//WFstats
function calculate_str() {
	var WarframeSTR = (1 + getCurrent("Intensify") + getCurrent("Augur_Secrets") + getCurrent("Power_Drift") + getCurrent("Blind_Rage") + getCurrent("Transient_Fortitude") + getCurrent("Energy_Conversion") + getCurrentMalus('Overextended') + getCurrent('Growing_Power') + getCurrent("Pacify_&_Provoke")) * getCurrent("Parasitic_Link") * getCurrent("Corruption");
	document.getElementById('abilitySTR').value = (WarframeSTR * 100).toFixed(2) + "%";
}
 
function calculate_dur() {
	var WarframeDUR = 1 + getCurrent("Primed_Continuity") + getCurrent("Constitution") + getCurrent("Augur_Message") + getCurrent("Narrow_Minded") + getCurrentMalus("Transient_Fortitude") + getCurrentMalus("Fleeting_Expertise");
	document.getElementById('abilityDUR').value = (WarframeDUR * 100).toFixed(2) + "%";
}
 
function calculate_rng() {
	var WarframeRNG = (1 + getCurrent('Stretch') + getCurrent('Augur_Reach') + getCurrent('Cunning_Drift') + getCurrent('Overextended') + getCurrentMalus("Narrow_Minded")) * getCurrent("Corruption");
	document.getElementById('abilityRNG').value = (WarframeRNG * 100).toFixed(2) + "%";
}
 
function calculate_eff() {
	var WarframeEFF = 1 + getCurrent('Streamline') + getCurrent('Fleeting_Expertise') + getCurrentMalus("Blind_Rage");
	document.getElementById('abilityEFF').value = (WarframeEFF * 100).toFixed(2) + "%";
}
 
//armor
function calculate_arm() {
	var relativeBonus = getCurrent('Steel_Fiber') + getCurrent('Armored_Agility') + getCurrent('Gladiator_Aegis') + getCurrent('Warcry') + getCurrent('Elemental_Ward') + getCurrent('Metronome') + getCurrent('Vex_Armor');
	document.getElementById('relative_bonus').value = '+'+(relativeBonus * 100).toFixed(1) +'%';
	var absoluteBonus = (getCurrent('Renewal') + getCurrent('Hallowed_Reckoning') + getCurrent('Arcane_Guardian_or_Ultimatum') + getCurrent('Rubble') + getCurrent('Stone_Skin'))*100;
	document.getElementById('absolute_bonus').value = '+'+(absoluteBonus).toFixed(1);
	netArmor = document.getElementById('base_armor').value * (1 + relativeBonus) + absoluteBonus;
	document.getElementById('arm_result').value = netArmor.toFixed(2);
	document.getElementById('arm_reduct').value =(100*1/(1+300/netArmor)).toFixed(2)+'%';
	document.getElementById('arm_effhealth').value = (1/(1-1/(1+300/netArmor))).toFixed(2);
}
 
function calculate() {
	if ($('#MaximizationContainer').length) {
        calculate_str();
        calculate_dur();
        calculate_eff();
        calculate_rng();
    }
  if ($('#AshMaximizationContainer').length) {
    // update all ash related fields...
    document.getElementById('shuriken_dmg').value = abilitySTR() * 500;
    document.getElementById('shuriken_dur').value = (abilityDUR() * 8).toFixed(2);
    document.getElementById('shuriken_ene').value = (abilityEFFcap() * 25).toFixed(2);
    document.getElementById('shuriken_arm').value = abilitySTR() * 70 + "%";
 
    document.getElementById('smoke_rng').value = (abilityRNG() * 10).toFixed(2);
    document.getElementById('smoke_dur').value = (abilityDUR() * 8).toFixed(2);
    document.getElementById('smoke_ene').value = abilityEFFcap() * 35;
 
    document.getElementById('teleport_rng').value = (abilityRNG() * 60).toFixed(2);
    document.getElementById('teleport_dur').value = (abilityDUR() * 10).toFixed(2);
    document.getElementById('teleport_ene').value = (abilityEFFcap() * 25).toFixed(2);
    document.getElementById('fatal_dmg').value = abilitySTR() * 200 + "%";
 
    document.getElementById('storm_dmg').value = abilitySTR() * 2000;
    document.getElementById('storm_rng').value = (abilityRNG() * 50).toFixed(2);
    document.getElementById('storm_ene').value = (abilityEFFcap() *12).toFixed(2);
    document.getElementById('storm_ene2').value = (abilityEFFcap() * 6).toFixed(2);
    document.getElementById('storm_dur').value = abilityDUR() * 100 + "%";
 
 
  }
	if ($('#ArmorContainer').length) {
		calculate_arm();
	}
  //var WarframeDamage = document.getElementById('baseDamage').value;
  //document.getElementById('result').value = (WarframeDamage * WarframeSTR).toFixed(2);
}
 
function abilitySTR(){
	return document.getElementById('abilitySTR').value.slice(0,-1) /100;
}
function abilityDUR(){
	return document.getElementById('abilityDUR').value.slice(0,-1) /100;
}
function abilityRNG(){
	return document.getElementById('abilityRNG').value.slice(0,-1) /100;
}
function abilityEFF(){
	return 2 - document.getElementById('abilityEFF').value.slice(0,-1) /100;
}
function abilityEFFcap(){
	var temp = (200 - document.getElementById('abilityEFF').value.slice(0,-1)) /100;
	if (temp < 0.25) {
		return 0.25;
	} else {
		return temp;
	}
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
			html += "<tr class='MaxiHeadingRow'><td>Stats</td><td>Equipped mods:</td><td>Rank</td><td>Bonus</td><td>Malus</td></tr>";
			// first mod in each category must have the statCell as last argument, all other an empty string
			html += loadMod("Intensify", 5, 5, 0, '', statCell("Strength", "abilitySTR", 5));
			html += loadMod("Augur Secrets", 5, 4, 0, '', '');
			html += loadMod("Power Drift", 5, 2.5, 0, '', '');
			html += loadMod("Transient Fortitude", 10, 5, -2.5, 'DUR', '');
			html += loadMod('Blind Rage', 10, 9, -5, 'EFF', '');
			html += spaaaace();
			html += loadMod('Stretch', 5, 7.5, 0, '', statCell("Range", "abilityRNG", 4));
			html += loadMod("Augur Reach", 5, 5, 0, '', '');
			html += loadMod("Cunning Drift", 5, 2.5, 0, '', '');
			html += loadMod('Overextended', 5, 15, -10, 'STR', '');
			html += spaaaace();
			html += loadMod('Streamline', 5, 5, 0, '', statCell("Efficiency", "abilityEFF", 2));
			html += loadMod('Fleeting Expertise', 5, 10, -10, 'DUR', '');
			html += spaaaace();
			html += loadMod('Primed Continuity', 10, 5, 0, '', statCell("Duration", "abilityDUR", 4));
			html += loadMod('Augur Message', 5, 4, 0, '', '');
			html += loadMod('Constitution', 3, 7, 0, '', '');
			html += loadMod('Narrow Minded', 10, 9, -6, 'RNG', '');
			// occasional stuff
			html += "<tr class='MaxiHeadingRow'><td rowspan=6></td><td>Buff</td><td>Count</td><td>Bonus</td></tr>";
			html += loadBuff('Energy Conversion', '', 1, 50, '% STR', '+');
			html += loadBuff('Growing Power', '', 8, 25, '% STR', '+');
			html += loadBuff('Pacify & Provoke', '', 80, 1, '% STR', '+');
			html += loadBuff('Parasitic Link', '', 200, 1, '% STR', '*');
		  //html += loadBuff('Roar', '', 187, 1, '% DMG', '*');
			html += loadBuff('Corruption', 'Void_Relic#Relic_Corruption', 1, 200, '% STR & RNG', '*');
			html += "</table>";
			document.getElementById('MaximizationContainer').innerHTML = html + "</table>";
	}
 
	//ASH could be moved
	if ($('#AshMaximizationContainer').length) {
		var html = "<table width='640px' border='0'>";
			html += "<tr class='MaxiHeadingRow'><td colspan='2'>Abilities</td><td colspan='2'>Augments</td><td>Equipped</td></tr>";
 
			html += abilityHeader("Shuriken","Seeking Shuriken");
			html += abilityRow('shuriken_dmg','damage','shuriken_dur','seconds armor reduction');
			html += abilityRow('shuriken_ene','energy cost','shuriken_arm','Armor reduction');
 
			html += abilityHeader("Smoke Screen","Smoke Shadow");
			html += abilityRow('smoke_dur','seconds duration','','','');
			html += abilityRow('smoke_rng','meters range','','','');
			html += abilityRow('smoke_ene','energy cost','','','');
 
			html += abilityHeader("Teleport","Fatal Teleport");
			html += abilityRow('teleport_dur','seconds duration','fatal_dmg','bonus damage');
			html += abilityRow('teleport_rng','meters range','','','');
			html += abilityRow('teleport_ene','energy cost','','','');
 
			html += abilityHeader("Blade Storm","Rising Storm");
			html += abilityRow('storm_dmg','damage','storm_dur','melee combo counter duration');
			html += abilityRow('storm_rng','meters range','','','');
			html += abilityRow('storm_ene','energy per mark while visible','','','');
			html += abilityRow('storm_ene2','energy per mark while invisible','','','');
 
		document.getElementById('AshMaximizationContainer').innerHTML = html + "</table>";
	}
 
	if ($('#ArmorContainer').length) {
		//ability stats
		var html = "<table width='480px' border='0'>";
			html += makeRowInput("Base Armor", "base_armor", "''", 15);
			html += spaaaace();
			html += makeRow("Relative Armor Bonus", "relative_bonus", "Result", "");
			html += makeRow("Absolute Armor Bonus", "absolute_bonus", "Result", "");
			html += makeRow("Armor Result", "arm_result", "Result", "");
			html += makeRow("Damage Reduction", "arm_reduct", "Result", "");
			html += makeRow("Effective Health Multiplier", "arm_effhealth", "Result", "");
			html += spaaaace();
			//frame stats
			html += "<tr class='MaxiHeadingRow'><td>Mods</td><td>Rank</td><td>Bonus</td></tr>";
			// first mod in each category must have the statCell as last argument, all other an empty string
			html += loadMod("Steel Fiber", 10, 10, 0, '', '');
			html += loadMod("Armored Agility", 5, 7.5, 0, '', '');
			html += loadMod("Gladiator Aegis", 5, 7.5, 0, '', '');
			// occasional stuff
			html += "<tr class='MaxiHeadingRow'><td>Relative Buffs</td><td>Count</td><td>Bonus</td></tr>";
			html += loadBuff('Warcry', '', 232, 1, '%', '+');		
			html += loadBuff('Elemental Ward','', 709, 1, '%', '+');		
			html += loadBuff('Metronome','', 192, 1, '%', '+');
			html += loadBuff('Vex Armor','', 1656, 1, '%', '+');
			html += "<tr class='MaxiHeadingRow'><td>Absolute Buffs</td><td>Count</td><td>Bonus</td></tr>";
			html += loadBuff('Renewal','',  946, 1, '', '+');
			html += loadBuff('Hallowed Reckoning','',  1186, 1, '', '+');
			html += loadBuff('Rubble','',  1500, 1, '', '+');
			html += loadBuff('Arcane Guardian or Ultimatum','Arcane Enhancement#Warframe Arcanes', 8, 150, '', '+');
			html += loadBuff('Stone Skin', 'Focus/Unairu', 4, 15, '', '+');
			html += "</table>";
		document.getElementById('ArmorContainer').innerHTML = html;
	}
	calculate();
});
 
function abilityHeader(name, augment) {
	return "<tr><td colspan='2'>"+name+"</td><td colspan='2'>"+augment+"</td><td><input type='checkbox' class='check' onchange=''></td></tr>";
}
 
function abilityRow(abilityId, abilityTerm, augmentId, augmentTerm) {
	var html = "<tr>";
	if (abilityId) {
		html += "<td><input class='resultingStat' id='"+abilityId+"' readonly value='NaN'></td><td>"+abilityTerm+"</td>";
	}else{
		html += "<td colspan='2'></td>";
	}
	if (augmentId) {
		html+="<td><input class='resultingStat' id='"+augmentId+"' readonly value='NaN'></td><td>"+augmentTerm+"</td><td></td></tr>";
	}else{
		html+="<td colspan='2'></td></tr>";
	}
	return html;
}
 
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
		html += "<td colspan=2><input class='bonus' type='number' value=" + bonus + " Hidden>";
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