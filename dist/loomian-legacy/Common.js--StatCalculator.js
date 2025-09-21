/* Any JavaScript here will be loaded for all users on every page load. */

// Loomian Stat Calculator
// Calculator Functions
function calcHealth(Base, UP, TP, Level) {
	if(isNaN(Base)) {
		Base = 0;
	}
	if(isNaN(UP)) {
		UP = 0;
	}
	if(isNaN(TP)) {
		TP = 0;
	}
	if(isNaN(UP)) {
		UP = 0;
	}
	return Math.floor((2*Base+UP+Math.floor(TP/4))*Level/100+Level+10);
}
function calcEnergy(Base, UP, TP, Level, Personality) {
	if(isNaN(Base)) {
		Base = 0;
	}
	if(isNaN(UP)) {
		UP = 0;
	}
	if(isNaN(TP)) {
		TP = 0;
	}
	if(isNaN(UP)) {
		UP = 0;
	}
	if(Base == 0) {
		return 0;
	}
	return Math.floor(Math.floor((2*Base+UP+Math.floor(TP/4))*Level/65+80)*Personality);
}
function calcStat(Base, UP, TP, Level, Personality) {
	if(isNaN(Base)) {
		Base = 0;
	}
	if(isNaN(UP)) {
		UP = 0;
	}
	if(isNaN(TP)) {
		TP = 0;
	}
	if(isNaN(UP)) {
		UP = 0;
	}
	if(Base == 0) {
		return 0;
	}
	return Math.floor(Math.floor((2*Base+UP+Math.floor(TP/4))*Level/100+5)*Personality);
}

$(document).ready(function() {
	// Creating input boxes
	var i = 1;
	var length = document.querySelectorAll('.StatsTable').length;
	while(i <= length) {
        var table = document.getElementById("Table-" + i);
        var level = 50;
        if (table) {
            var match = table.className.match(/LevelDefault-(\d+)/);
            if (match) {
                level = parseInt(match[1], 10);
            }
        }
		$("span#LevelBox-"+i).html('<input onClick="this.select();" value="' + level + '"type="number" class="Level oo-ui-inputWidget-input"></input>');
		$("span#HPUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="HPUP oo-ui-inputWidget-input"></input>');
		$("span#HPTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="HPTP oo-ui-inputWidget-input"></input>');
    
		$("span#EnergyUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="EnergyUP oo-ui-inputWidget-input"></input>');
		$("span#EnergyTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="EnergyTP oo-ui-inputWidget-input"></input>');
		$("span#EnergyPersonalityBox-"+i).html('<select class="EnergyPersonality oo-ui-dropdownWidget-handle"><option value="1">No effect</option><option value="0.8">Very Dull</option><option value="0.9">Dull</option><option value="1.1">Hyper</option><option value="1.2">Very Hyper</option></select>');
    
		$("span#MAtkUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="MAtkUP oo-ui-inputWidget-input"></input>');
		$("span#MAtkTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="MAtkTP oo-ui-inputWidget-input"></input>');
		$("span#MAtkPersonalityBox-"+i).html('<select class="MAtkPersonality oo-ui-dropdownWidget-handle"><option value="1">No effect</option><option value="0.8">Very Frail</option><option value="0.9">Frail</option><option value="1.1">Brawny</option><option value="1.2">Very Brawny</option></select>');
    
		$("span#RAtkUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="RAtkUP oo-ui-inputWidget-input"></input>');
		$("span#RAtkTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="RAtkTP oo-ui-inputWidget-input"></input>');
		$("span#RAtkPersonalityBox-"+i).html('<select class="RAtkPersonality oo-ui-dropdownWidget-handle"><option value="1">No effect</option><option value="0.8">Very Clumsy</option><option value="0.9">Clumsy</option><option value="1.1">Smart</option><option value="1.2">Very Smart</option></select>');
    
		$("span#MDefUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="MDefUP oo-ui-inputWidget-input"></input>');
		$("span#MDefTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="MDefTP oo-ui-inputWidget-input"></input>');
		$("span#MDefPersonalityBox-"+i).html('<select class="MDefPersonality oo-ui-dropdownWidget-handle"><option value="1">No effect</option><option value="0.8">Very Tender</option><option value="0.9">Tender</option><option value="1.1">Robust</option><option value="1.2">Very Robust</option></select>');
    
		$("span#RDefUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="RDefUP oo-ui-inputWidget-input"></input>');
		$("span#RDefTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="RDefTP oo-ui-inputWidget-input"></input>');
		$("span#RDefPersonalityBox-"+i).html('<select class="RDefPersonality oo-ui-dropdownWidget-handle"><option value="1">No effect</option><option value="0.8">Very Foolish</option><option value="0.9">Foolish</option><option value="1.1">Clever</option><option value="1.2">Very Clever</option></select>');

		$("span#SpeedUPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="SpeedUP oo-ui-inputWidget-input"></input>');
		$("span#SpeedTPBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="SpeedTP oo-ui-inputWidget-input"></input>');
		$("span#SpeedPersonalityBox-"+i).html('<select class="SpeedPersonality oo-ui-dropdownWidget-handle"><option value="1">No effect</option><option value="0.8">Very Sluggish</option><option value="0.9">Sluggish</option><option value="1.1">Nimble</option><option value="1.2">Very Nimble</option></select>');
		i++;
	}

// Valid Input Checker
    $(".calcButton").click(function() {
    	var id = this.id.substring(5);
    	
    	var HPUPValue = parseInt($("#HPUPBox-" + id + " > .HPUP")[0].value);
    	if(HPUPValue > 40) {
    		$("#HPUPBox-" + id +" > .HPUP")[0].value = 40;
    	}
    	if(HPUPValue < 0) {
    		$("#HPUPBox-" + id +" > .HPUP")[0].value = 0;
    	}
    	var HPTPValue = parseInt($("#HPTPBox-" + id + " > .HPTP")[0].value);
    	if(HPTPValue > 200) {
    		$("#HPTPBox-" + id +" > .HPTP")[0].value = 200;
    	}
    	if(HPTPValue < 0) {
    		$("#HPTPBox-" + id +" > .HPTP")[0].value = 0;
    	}
    	
    	var EnergyUPValue = parseInt($("#EnergyUPBox-" + id + " > .EnergyUP")[0].value);
    	if(EnergyUPValue > 40) {
    		$("#EnergyUPBox-" + id +" > .EnergyUP")[0].value = 40;
    	}
    	if(EnergyUPValue < 0) {
    		$("#EnergyUPBox-" + id +" > .EnergyUP")[0].value = 0;
    	}
    	var EnergyTPValue = parseInt($("#EnergyTPBox-" + id + " > .EnergyTP")[0].value);
    	if(EnergyTPValue > 200) {
    		$("#EnergyTPBox-" + id +" > .EnergyTP")[0].value = 200;
    	}
    	if(EnergyTPValue < 0) {
    		$("#EnergyTPBox-" + id +" > .EnergyTP")[0].value = 0;
    	}
    	
    	var MAtkUPValue = parseInt($("#MAtkUPBox-" + id + " > .MAtkUP")[0].value);
    	if(MAtkUPValue > 40) {
    		$("#MAtkUPBox-" + id +" > .MAtkUP")[0].value = 40;
    	}
    	if(MAtkUPValue < 0) {
    		$("#MAtkUPBox-" + id +" > .MAtkUP")[0].value = 0;
    	}
    	var MAtkTPValue = parseInt($("#MAtkTPBox-" + id + " > .MAtkTP")[0].value);
    	if(MAtkTPValue > 200) {
    		$("#MAtkTPBox-" + id +" > .MAtkTP")[0].value = 200;
    	}
    	if(MAtkTPValue < 0) {
    		$("#MAtkTPBox-" + id +" > .MAtkTP")[0].value = 0;
    	}
    	
    	var RAtkUPValue = parseInt($("#RAtkUPBox-" + id + " > .RAtkUP")[0].value);
    	if(RAtkUPValue > 40) {
    		$("#RAtkUPBox-" + id +" > .RAtkUP")[0].value = 40;
    	}
    	if(RAtkUPValue < 0) {
    		$("#RAtkUPBox-" + id +" > .RAtkUP")[0].value = 0;
    	}
    	var RAtkTPValue = parseInt($("#RAtkTPBox-" + id + " > .RAtkTP")[0].value);
    	if(RAtkTPValue > 200) {
    		$("#RAtkTPBox-" + id +" > .RAtkTP")[0].value = 200;
    	}
    	if(RAtkTPValue < 0) {
    		$("#RAtkTPBox-" + id +" > .RAtkTP")[0].value = 0;
    	}
    	
    	var MDefUPValue = parseInt($("#MDefUPBox-" + id + " > .MDefUP")[0].value);
    	if(MDefUPValue > 40) {
    		$("#MDefUPBox-" + id +" > .MDefUP")[0].value = 40;
    	}
    	if(MDefUPValue < 0) {
    		$("#MDefUPBox-" + id +" > .MDefUP")[0].value = 0;
    	}
    	var MDefTPValue = parseInt($("#MDefTPBox-" + id + " > .MDefTP")[0].value);
    	if(MDefTPValue > 200) {
    		$("#MDefTPBox-" + id +" > .MDefTP")[0].value = 200;
    	}
    	if(MDefTPValue < 0) {
    		$("#MDefTPBox-" + id +" > .MDefTP")[0].value = 0;
    	}
    	
    	var RDefUPValue = parseInt($("#RDefUPBox-" + id + " > .RDefUP")[0].value);
    	if(RDefUPValue > 40) {
    		$("#RDefUPBox-" + id +" > .RDefUP")[0].value = 40;
    	}
    	if(RDefUPValue < 0) {
    		$("#RDefUPBox-" + id +" > .RDefUP")[0].value = 0;
    	}
    	var RDefTPValue = parseInt($("#RDefTPBox-" + id + " > .RDefTP")[0].value);
    	if(RDefTPValue > 200) {
    		$("#RDefTPBox-" + id +" > .RDefTP")[0].value = 200;
    	}
    	if(RDefTPValue < 0) {
    		$("#RDefTPBox-" + id +" > .RDefTP")[0].value = 0;
    	}
    	
    	var SpeedUPValue = parseInt($("#SpeedUPBox-" + id + " > .SpeedUP")[0].value);
    	if(SpeedUPValue > 40) {
    		$("#SpeedUPBox-" + id +" > .SpeedUP")[0].value = 40;
    	}
    	if(SpeedUPValue < 0) {
    		$("#SpeedUPBox-" + id +" > .SpeedUP")[0].value = 0;
    	}
    	var SpeedTPValue = parseInt($("#SpeedTPBox-" + id + " > .SpeedTP")[0].value);
    	if(SpeedTPValue > 200) {
    		$("#SpeedTPBox-" + id +" > .SpeedTP")[0].value = 200;
    	}
    	if(SpeedTPValue < 0) {
    		$("#SpeedTPBox-" + id +" > .SpeedTP")[0].value = 0;
    	}
    	
    	// End Result Displayer
    	
    	var Lvl = parseInt($("#LevelBox-" + id + " > .Level")[0].value);
    	var HealthB = parseInt(document.getElementById("healthBase-"+id).innerHTML);
    	var HealthUP = parseInt($("#HPUPBox-" + id +" > .HPUP")[0].value);
    	var HealthTP = parseInt($("#HPTPBox-" + id +" > .HPTP")[0].value);
		document.getElementById("displayHealth-"+id).innerHTML = calcHealth(HealthB, HealthUP, HealthTP, Lvl);
		
		var EnergyB = parseInt(document.getElementById("energyBase-"+id).innerHTML);
		var EnergyUP = parseInt($("#EnergyUPBox-" + id + " > .EnergyUP")[0].value);
		var EnergyTP = parseInt($("#EnergyTPBox-" + id + " > .EnergyTP")[0].value);
		var EnergyPersonality = $("#EnergyPersonalityBox-" + id + " > .EnergyPersonality")[0].value;
		try { // try statement for Harvesect case, as displayEnergy is missing due to it not having an Energy stat
			document.getElementById("displayEnergy-"+id).innerHTML = calcEnergy(EnergyB, EnergyUP, EnergyTP, Lvl, EnergyPersonality);
		}
		finally {
		var MAtkB = parseInt(document.getElementById("mAtkBase-"+id).innerHTML);
		var MAtkUP = parseInt($("#MAtkUPBox-" + id + " > .MAtkUP")[0].value);
		var MAtkTP = parseInt($("#MAtkTPBox-" + id + " > .MAtkTP")[0].value);
		var MAtkPersonality = $("#MAtkPersonalityBox-" + id + " > .MAtkPersonality")[0].value;
		document.getElementById("displayMAtk-"+id).innerHTML = calcStat(MAtkB, MAtkUP, MAtkTP, Lvl, MAtkPersonality);
		
		var RAtkB = parseInt(document.getElementById("rAtkBase-"+id).innerHTML);
		var RAtkUP = parseInt($("#RAtkUPBox-" + id + " > .RAtkUP")[0].value);
		var RAtkTP = parseInt($("#RAtkTPBox-" + id + " > .RAtkTP")[0].value);
		var RAtkPersonality = $("#RAtkPersonalityBox-" + id + " > .RAtkPersonality")[0].value;
		document.getElementById("displayRAtk-"+id).innerHTML = calcStat(RAtkB, RAtkUP, RAtkTP, Lvl, RAtkPersonality);
		
		var MDefB = parseInt(document.getElementById("mDefBase-"+id).innerHTML);
		var MDefUP = parseInt($("#MDefUPBox-" + id + " > .MDefUP")[0].value);
		var MDefTP = parseInt($("#MDefTPBox-" + id + " > .MDefTP")[0].value);
		var MDefPersonality = $("#MDefPersonalityBox-" + id + " > .MDefPersonality")[0].value;
		document.getElementById("displayMDef-"+id).innerHTML = calcStat(MDefB, MDefUP, MDefTP, Lvl, MDefPersonality);
		
		var RDefB = parseInt(document.getElementById("rDefBase-"+id).innerHTML);
		var RDefUP = parseInt($("#RDefUPBox-" + id + " > .RDefUP")[0].value);
		var RDefTP = parseInt($("#RDefTPBox-" + id + " > .RDefTP")[0].value);
		var RDefPersonality = $("#RDefPersonalityBox-" + id + " > .RDefPersonality")[0].value;
		document.getElementById("displayRDef-"+id).innerHTML = calcStat(RDefB, RDefUP, RDefTP, Lvl, RDefPersonality);
		
		var SpeedB = parseInt(document.getElementById("speedBase-"+id).innerHTML);
		var SpeedUP = parseInt($("#SpeedUPBox-" + id + " > .SpeedUP")[0].value);
		var SpeedTP = parseInt($("#SpeedTPBox-" + id + " > .SpeedTP")[0].value);
		var SpeedPersonality = $("#SpeedPersonalityBox-" + id + " > .SpeedPersonality")[0].value;
		document.getElementById("displaySpeed-"+id).innerHTML = calcStat(SpeedB, SpeedUP, SpeedTP, Lvl, SpeedPersonality);
		}
		
    });
    
    $(".maxButton").click(function() {
    	var maxId = this.id.substring(4);
    	$("#HPUPBox-" + maxId +" > .HPUP")[0].value = 40;
    	$("#HPTPBox-" + maxId +" > .HPTP")[0].value = 200;
    	
    	$("#EnergyUPBox-" + maxId +" > .EnergyUP")[0].value = 40;
    	$("#EnergyTPBox-" + maxId +" > .EnergyTP")[0].value = 200;
    	$("#EnergyPersonalityBox-" + maxId +" > .EnergyPersonality")[0].selectedIndex = 4;
    	
    	$("#MAtkUPBox-" + maxId +" > .MAtkUP")[0].value = 40;
    	$("#MAtkTPBox-" + maxId +" > .MAtkTP")[0].value = 200;
    	$("#MAtkPersonalityBox-" + maxId +" > .MAtkPersonality")[0].selectedIndex = 4;
    	
    	$("#RAtkUPBox-" + maxId +" > .RAtkUP")[0].value = 40;
    	$("#RAtkTPBox-" + maxId +" > .RAtkTP")[0].value = 200;
    	$("#RAtkPersonalityBox-" + maxId +" > .RAtkPersonality")[0].selectedIndex = 4;
    	
    	$("#MDefUPBox-" + maxId +" > .MDefUP")[0].value = 40;
    	$("#MDefTPBox-" + maxId +" > .MDefTP")[0].value = 200;
    	$("#MDefPersonalityBox-" + maxId +" > .MDefPersonality")[0].selectedIndex = 4;
    	
    	$("#RDefUPBox-" + maxId +" > .RDefUP")[0].value = 40;
    	$("#RDefTPBox-" + maxId +" > .RDefTP")[0].value = 200;
    	$("#RDefPersonalityBox-" + maxId +" > .RDefPersonality")[0].selectedIndex = 4;
    	
    	$("#SpeedUPBox-" + maxId +" > .SpeedUP")[0].value = 40;
    	$("#SpeedTPBox-" + maxId +" > .SpeedTP")[0].value = 200;
    	$("#SpeedPersonalityBox-" + maxId +" > .SpeedPersonality")[0].selectedIndex = 4;
    });
    
    $(".minButton").click(function() {
    	var minId = this.id.substring(4);
    	$("#HPUPBox-" + minId +" > .HPUP")[0].value = 0;
    	$("#HPTPBox-" + minId +" > .HPTP")[0].value = 0;
    	
    	$("#EnergyUPBox-" + minId +" > .EnergyUP")[0].value = 0;
    	$("#EnergyTPBox-" + minId +" > .EnergyTP")[0].value = 0;
    	$("#EnergyPersonalityBox-" + minId +" > .EnergyPersonality")[0].selectedIndex = 1;
    	
    	$("#MAtkUPBox-" + minId +" > .MAtkUP")[0].value = 0;
    	$("#MAtkTPBox-" + minId +" > .MAtkTP")[0].value = 0;
    	$("#MAtkPersonalityBox-" + minId +" > .MAtkPersonality")[0].selectedIndex = 1;
    	
    	$("#RAtkUPBox-" + minId +" > .RAtkUP")[0].value = 0;
    	$("#RAtkTPBox-" + minId +" > .RAtkTP")[0].value = 0;
    	$("#RAtkPersonalityBox-" + minId +" > .RAtkPersonality")[0].selectedIndex = 1;
    	
    	$("#MDefUPBox-" + minId +" > .MDefUP")[0].value = 0;
    	$("#MDefTPBox-" + minId +" > .MDefTP")[0].value = 0;
    	$("#MDefPersonalityBox-" + minId +" > .MDefPersonality")[0].selectedIndex = 1;
    	
    	$("#RDefUPBox-" + minId +" > .RDefUP")[0].value = 0;
    	$("#RDefTPBox-" + minId +" > .RDefTP")[0].value = 0;
    	$("#RDefPersonalityBox-" + minId +" > .RDefPersonality")[0].selectedIndex = 1;
    	
    	$("#SpeedUPBox-" + minId +" > .SpeedUP")[0].value = 0;
    	$("#SpeedTPBox-" + minId +" > .SpeedTP")[0].value = 0;
    	$("#SpeedPersonalityBox-" + minId +" > .SpeedPersonality")[0].selectedIndex = 1;
    });
    
});