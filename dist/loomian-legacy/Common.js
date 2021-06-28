/* Any JavaScript here will be loaded for all users on every page load. */
TBL_GROUP = "roblox-en";

// RailWAM configuration
window.railWAM = {
    logPage:"Project:WAM Log"
};

// Configuration for Mass Managament Tools
window.MassCategorizationGroups = ['sysop', 'content-moderator'];
window.MassRedirectGroups = ['sysop', 'content-moderator'];
window.MassRenameGroups = ['sysop', 'content-moderator'];
window.MassRenameRevertGroups = ['sysop', 'content-moderator'];

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
	return Math.floor((2*Base+UP+TP/4)*Level/100+Level+10);
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
	return Math.floor(((2*Base+UP+TP/4)*Level/65+80)*Personality);
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
	return Math.floor(((2*Base+UP+TP/4)*Level/100+5)*Personality);
}

// Input box creator
$(document).ready(function() {
	$("span#LevelBox").html('<input onClick="this.select();" type="text" value="20" id="Level" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	
	$("span#HPUPBox").html('<input onClick="this.select();" type="text" value="0" id="HPUP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#HPTPBox").html('<input onClick="this.select();" type="text" value="0" id="HPTP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
    
	$("span#EnergyUPBox").html('<input onClick="this.select();" type="text" value="0" id="EnergyUP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#EnergyTPBox").html('<input onClick="this.select();" type="text" value="0" id="EnergyTP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#EnergyPersonalityBox").html('<select id="EnergyPersonality" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">No effect</option><option value="0.9">Dull</option><option value="1.1">Hyper</option></select>');
    
	$("span#MAtkUPBox").html('<input onClick="this.select();" type="text" value="0" id="MAtkUP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#MAtkTPBox").html('<input onClick="this.select();" type="text" value="0" id="MAtkTP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#MAtkPersonalityBox").html('<select id="MAtkPersonality" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">No effect</option><option value="0.8">Very Frail</option><option value="0.9">Frail</option><option value="1.1">Brawny</option><option value="1.2">Very Brawny</option></select>');
    
	$("span#RAtkUPBox").html('<input onClick="this.select();" type="text" value="0" id="RAtkUP" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#RAtkTPBox").html('<input onClick="this.select();" type="text" value="0" id="RAtkTP" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#RAtkPersonalityBox").html('<select id="RAtkPersonality" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">No effect</option><option value="0.8">Very Clumsy</option><option value="0.9">Clumsy</option><option value="1.1">Smart</option><option value="1.2">Very Smart</option></select>');
    
	$("span#MDefUPBox").html('<input onClick="this.select();" type="text" value="0" id="MDefUP" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#MDefTPBox").html('<input onClick="this.select();" type="text" value="0" id="MDefTP" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#MDefPersonalityBox").html('<select id="MDefPersonality" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">No effect</option><option value="0.8">Very Tender</option><option value="0.9">Tender</option><option value="1.1">Robust</option><option value="1.2">Very Robust</option></select>');
    
	$("span#RDefUPBox").html('<input onClick="this.select();" type="text" value="0" id="RDefUP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#RDefTPBox").html('<input onClick="this.select();" type="text" value="0" id="RDefTP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#RDefPersonalityBox").html('<select id="RDefPersonality" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">No effect</option><option value="0.8">Very Foolish</option><option value="0.9">Foolish</option><option value="1.1">Clever</option><option value="1.2">Very Clever</option></select>');

	$("span#SpeedUPBox").html('<input onClick="this.select();" type="text" value="0" id="SpeedUP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#SpeedTPBox").html('<input onClick="this.select();" type="text" value="0" id="SpeedTP" style="text-align: right; font-family: rubik,helvetica,arial,sans-serif; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#SpeedPersonalityBox").html('<select id="SpeedPersonality" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">No effect</option><option value="0.8">Very Sluggish</option><option value="0.9">Sluggish</option><option value="1.1">Nimble</option><option value="1.2">Very Nimble</option></select>');

// Valid Input Checker
    $(".calcButton").click(function() {
    	console.log(this.id);
    	if(parseInt(document.getElementById("Level").value)<0) {
    		document.getElementById("Level").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("HPUP").value)>40) {
    		document.getElementById("HPUP").value = 40;
    	}
    	if(parseInt(document.getElementById("HPUP").value)<0) {
    		document.getElementById("HPUP").value = 0;
    	}
    	if(parseInt(document.getElementById("HPTP").value)>200) {
    		document.getElementById("HPTP").value = 200;
    	}
    	if(parseInt(document.getElementById("HPTP").value)<0) {
    		document.getElementById("HPTP").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("EnergyUP").value)>40) {
    		document.getElementById("EnergyUP").value = 40;
    	}
    	if(parseInt(document.getElementById("EnergyUP").value)<0) {
    		document.getElementById("EnergyUP").value = 0;
    	}
    	if(parseInt(document.getElementById("EnergyTP").value)>200) {
    		document.getElementById("EnergyTP").value = 200;
    	}
    	if(parseInt(document.getElementById("EnergyTP").value)<0) {
    		document.getElementById("EnergyTP").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("MAtkUP").value)>40) {
    		document.getElementById("MAtkUP").value = 40;
    	}
    	if(parseInt(document.getElementById("MAtkUP").value)<0) {
    		document.getElementById("MAtkUP").value = 0;
    	}
    	if(parseInt(document.getElementById("MAtkTP").value)>200) {
    		document.getElementById("MAtkTP").value = 200;
    	}
    	if(parseInt(document.getElementById("MAtkTP").value)<0) {
    		document.getElementById("MAtkTP").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("RAtkUP").value)>40) {
    		document.getElementById("RAtkUP").value = 40;
    	}
    	if(parseInt(document.getElementById("RAtkUP").value)<0) {
    		document.getElementById("RAtkUP").value = 0;
    	}
    	if(parseInt(document.getElementById("RAtkTP").value)>200) {
    		document.getElementById("RAtkTP").value = 200;
    	}
    	if(parseInt(document.getElementById("RAtkTP").value)<0) {
    		document.getElementById("RAtkTP").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("MDefUP").value)>40) {
    		document.getElementById("MDefUP").value = 40;
    	}
    	if(parseInt(document.getElementById("MDefUP").value)<0) {
    		document.getElementById("MDefUP").value = 0;
    	}
    	if(parseInt(document.getElementById("MDefTP").value)>200) {
    		document.getElementById("MDefTP").value = 200;
    	}
    	if(parseInt(document.getElementById("MDefTP").value)<0) {
    		document.getElementById("MDefTP").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("RDefUP").value)>40) {
    		document.getElementById("RDefUP").value = 40;
    	}
    	if(parseInt(document.getElementById("RDefUP").value)<0) {
    		document.getElementById("RDefUP").value = 0;
    	}
    	if(parseInt(document.getElementById("RDefTP").value)>200) {
    		document.getElementById("RDefTP").value = 200;
    	}
    	if(parseInt(document.getElementById("RDefTP").value)<0) {
    		document.getElementById("RDefTP").value = 0;
    	}
    	
    	if(parseInt(document.getElementById("SpeedUP").value)>40) {
    		document.getElementById("SpeedUP").value = 40;
    	}
    	if(parseInt(document.getElementById("SpeedUP").value)<0) {
    		document.getElementById("SpeedUP").value = 0;
    	}
    	if(parseInt(document.getElementById("SpeedTP").value)>200) {
    		document.getElementById("SpeedTP").value = 200;
    	}
    	if(parseInt(document.getElementById("SpeedTP").value)<0) {
    		document.getElementById("SpeedTP").value = 0;
    	}
    	
    	// End Result Displayer
		var HPB = parseInt(document.getElementById("healthBase").innerHTML);
		var HPUP = parseInt(document.getElementById("HPUP").value);
		var HPTP = parseInt(document.getElementById("HPTP").value);
		var HPLvl = parseInt(document.getElementById("Level").value);
		var health = calcHealth(HPB, HPUP, HPTP, HPLvl);
        document.getElementById("displayHealth").innerHTML = health;
        
        var EnergyB = parseInt(document.getElementById("energyBase").innerHTML);
		var EnergyUP = parseInt(document.getElementById("EnergyUP").value);
		var EnergyTP = parseInt(document.getElementById("EnergyTP").value);
		var EnergyLvl = parseInt(document.getElementById("Level").value);
		var EnergyPersonality = document.getElementById("EnergyPersonality").value;
		var energy = calcEnergy(EnergyB, EnergyUP, EnergyTP, EnergyLvl, EnergyPersonality);
        document.getElementById("displayEnergy").innerHTML = energy;
        
        var MAtkB = parseInt(document.getElementById("mAtkBase").innerHTML);
		var MAtkUP = parseInt(document.getElementById("MAtkUP").value);
		var MAtkTP = parseInt(document.getElementById("MAtkTP").value);
		var MAtkLvl = parseInt(document.getElementById("Level").value);
		var MAtkPersonality = document.getElementById("MAtkPersonality").value;
		var matk = calcStat(MAtkB, MAtkUP, MAtkTP, MAtkLvl, MAtkPersonality);
        document.getElementById("displayMAtk").innerHTML = matk;
        
        var RAtkB = parseInt(document.getElementById("rAtkBase").innerHTML);
		var RAtkUP = parseInt(document.getElementById("RAtkUP").value);
		var RAtkTP = parseInt(document.getElementById("RAtkTP").value);
		var RAtkLvl = parseInt(document.getElementById("Level").value);
		var RAtkPersonality = document.getElementById("RAtkPersonality").value;
		var ratk = calcStat(RAtkB, RAtkUP, RAtkTP, RAtkLvl, RAtkPersonality);
        document.getElementById("displayRAtk").innerHTML = ratk;
        
        var MDefB = parseInt(document.getElementById("mDefBase").innerHTML);
		var MDefUP = parseInt(document.getElementById("MDefUP").value);
		var MDefTP = parseInt(document.getElementById("MDefTP").value);
		var MDefLvl = parseInt(document.getElementById("Level").value);
		var MDefPersonality = document.getElementById("MDefPersonality").value;
		var mdef = calcStat(MDefB, MDefUP, MDefTP, MDefLvl, MDefPersonality);
        document.getElementById("displayMDef").innerHTML = mdef;
        
        var RDefB = parseInt(document.getElementById("rDefBase").innerHTML);
		var RDefUP = parseInt(document.getElementById("RDefUP").value);
		var RDefTP = parseInt(document.getElementById("RDefTP").value);
		var RDefLvl = parseInt(document.getElementById("Level").value);
		var RDefPersonality = document.getElementById("RDefPersonality").value;
		var rdef = calcStat(RDefB, RDefUP, RDefTP, RDefLvl, RDefPersonality);
        document.getElementById("displayRDef").innerHTML = rdef;
        
        var SpeedB = parseInt(document.getElementById("speedBase").innerHTML);
		var SpeedUP = parseInt(document.getElementById("SpeedUP").value);
		var SpeedTP = parseInt(document.getElementById("SpeedTP").value);
		var SpeedLvl = parseInt(document.getElementById("Level").value);
		var SpeedPersonality = document.getElementById("SpeedPersonality").value;
		var speed = calcStat(SpeedB, SpeedUP, SpeedTP, SpeedLvl, SpeedPersonality);
        document.getElementById("displaySpeed").innerHTML = speed;
    });
    
    $("#maxButton").click(function() {
    	document.getElementById("HPUP").value = 40;
    	document.getElementById("HPTP").value = 200;
    	
    	document.getElementById("EnergyUP").value = 40;
    	document.getElementById("EnergyTP").value = 200;
    	document.getElementById("EnergyPersonality").selectedIndex = 2;
    	
    	document.getElementById("MAtkUP").value = 40;
    	document.getElementById("MAtkTP").value = 200;
    	document.getElementById("MAtkPersonality").selectedIndex = 4;
    	
    	document.getElementById("RAtkUP").value = 40;
    	document.getElementById("RAtkTP").value = 200;
    	document.getElementById("RAtkPersonality").selectedIndex = 4;
    	
    	document.getElementById("MDefUP").value = 40;
    	document.getElementById("MDefTP").value = 200;
    	document.getElementById("MDefPersonality").selectedIndex = 4;
    	
    	document.getElementById("RDefUP").value = 40;
    	document.getElementById("RDefTP").value = 200;
    	document.getElementById("RDefPersonality").selectedIndex = 4;
    	
    	document.getElementById("SpeedUP").value = 40;
    	document.getElementById("SpeedTP").value = 200;
    	document.getElementById("SpeedPersonality").selectedIndex = 4;
    });
    
    $("#minButton").click(function() {
    	document.getElementById("HPUP").value = 0;
    	document.getElementById("HPTP").value = 0;
    	
    	document.getElementById("EnergyUP").value = 0;
    	document.getElementById("EnergyTP").value = 0;
    	document.getElementById("EnergyPersonality").selectedIndex = 1;
    	
    	document.getElementById("MAtkUP").value = 0;
    	document.getElementById("MAtkTP").value = 0;
    	document.getElementById("MAtkPersonality").selectedIndex = 1;
    	
    	document.getElementById("RAtkUP").value = 0;
    	document.getElementById("RAtkTP").value = 0;
    	document.getElementById("RAtkPersonality").selectedIndex = 1;
    	
    	document.getElementById("MDefUP").value = 0;
    	document.getElementById("MDefTP").value = 0;
    	document.getElementById("MDefPersonality").selectedIndex = 1;
    	
    	document.getElementById("RDefUP").value = 0;
    	document.getElementById("RDefTP").value = 0;
    	document.getElementById("RDefPersonality").selectedIndex = 1;
    	
    	document.getElementById("SpeedUP").value = 0;
    	document.getElementById("SpeedTP").value = 0;
    	document.getElementById("SpeedPersonality").selectedIndex = 1;
    });
    
});