/* Any JavaScript here will be loaded for all users on every page load. */

// Functions
function calcExpYield(b, L, e, w, I, M, p) {
	if(isNaN(b)) {
		b = 0;
	}
	if(isNaN(L)) {
		L = 0;
	}
	if(isNaN(M)) {
		M = 0;
	}
	return Math.floor(b*L*e*w*I*M*p/28);
}

$(document).ready(function() {
	// Input Box Creator
	$("span#baseInput").html('<input onClick="this.select();" type="text" value="200" id="expBase" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
    $("span#levelInput").html('<input onClick="this.select();" type="text" value="1" id="expLevel" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
    $("span#expBoostInput").html('<input type="checkbox" id="expBoost"></input>');
    $("span#expLoomiBoostInput").html('<input type="checkbox" id="expLoomiBoost"></input>')
    $("span#battleInput").html('<select id="expBattle" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">Wild</option><option value="1.5">Trainer</option><option value="3">Corrupt</option></select>');
    $("span#loomianIDInput").html('<input type="checkbox" id="expLoomianID"></input>');
    $("span#masteryInput").html('<input onClick="this.select();" type="text" value="0" id="expMastery" style="text-align: right; width: 30px; background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"></input>');
	$("span#participationInput").html('<select id="expParticipation" style="background-color:var(--theme-page-background-color--secondary,hsl(var(--page-background--dark))); color:white; font-family: rubik,helvetica,arial,sans-serif; border: 1px solid var(--theme-border-color); border-radius: 5px;"><option value="1">Participated</option><option value="0">In Party</option><option value="0.25">On Bench</option></select>');
	
	// Input Interpreter and Result Displayer
    $("#expYieldCalc").click(function() {
    	
    	var expBase = parseInt(document.getElementById("expBase").value);
    	var expLevel = parseInt(document.getElementById("expLevel").value);
    	if(document.getElementById("expLoomiBoost").checked) {
    		var expLoomiBoost = 2;
    	}
    	else {
    		var expLoomiBoost = 1;
    	}
    	var expBattle = document.getElementById("expBattle").value;
    	if(document.getElementById("expLoomianID").checked) {
    		var expID = 1.5;
    	}
    	else {
    		var expID = 1;
    	}
    	if(document.getElementById("expMastery").value >= 44 && document.getElementById("expMastery").value < 58) {
    		var expMastery = 1.1;
    	}
    	else if(parseInt(document.getElementById("expMastery").value) >= 58) {
    		var expMastery = 1.2;
    	}
    	else {
    		var expMastery = 1;
    	}
    	if(document.getElementById("expParticipation").value == 1) {
    		var expParticipation = 1;
    	}
    	else if(document.getElementById("expBoost").checked) {
    		if(document.getElementById("expParticipation").selectedIndex == 1) {
    			var expParticipation = 0.5;
    		}
    		else {
    			var expParticipation = 0.75;
    		}
    	}
    	else {
    		var expParticipation = document.getElementById("expParticipation").value;
    	}
    	
    	document.getElementById("expYieldOutput").innerHTML = calcExpYield(expBase, expLevel, expLoomiBoost, expBattle, expID, expMastery, expParticipation);
    	
    });
 
});