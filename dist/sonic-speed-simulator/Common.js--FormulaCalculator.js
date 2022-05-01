/* Any JavaScript here will be loaded for all users on every page load. */

// Originally from: https://loomian-legacy.fandom.com/wiki/MediaWiki:Common.js/StatCalculator.js
// Formula Calculator
// Calculator Functions
function calcXpPlr(Orb, Rebirth, World, Boost, Chao, Trail) {
	if(isNaN(Rebirth)) {
		Rebirth = 1;
	} else {
		Rebirth = Rebirth + 1;
	}
	if(isNaN(Chao)) {
		Chao = 0;
	}
	if(isNaN(Trail)) {
		Trail = 0;
	}
	return Math.floor((Orb * Rebirth * World * Boost) + Chao + Trail);
}

function calcXpPet(Orb, World) {
	return Math.floor(Orb * World);
}

function calcRing(Rebirth, World, Boost, Chao, Trail) {
	if(isNaN(Rebirth)) {
		Rebirth = 1;
	} else {
		Rebirth = Rebirth + 1;
	}
	if(isNaN(Chao)) {
		Chao = 0;
	}
	if(isNaN(Trail)) {
		Trail = 0;
	}
	return Math.floor((Rebirth * World * Boost) + Chao + Trail);
}

// Input box creator
$(document).ready(function() {
	var i = 1;
	var length = document.querySelectorAll('.FormulaTable').length;
	while(i <= length) {
		$("span#OrbBox-"+i).html('<select class="Orb oo-ui-dropdownWidget-handle"><option value="10">White</option><option value="15">Blue</option><option value="30">Purple</option><option value="40">Red</option><option value="50">Golden</option></select>');

		$("span#RebirthBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="Rebirth oo-ui-inputWidget-input"></input>');
		
		$("span#WorldBox-"+i).html('<select class="World oo-ui-dropdownWidget-handle"><option value="1">Green Hill</option><option value="2">Lost Valley</option><option value="3">Emerald Hill</option><option value="4">Snow Valley</option></select>');
		
		$("span#BoostBox-"+i).html('<select class="Boost oo-ui-dropdownWidget-handle"><option value="1">Disabled</option><option value="3">Enabled</option></select>');
		
		$("span#ChaoXpBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="ChaoXp oo-ui-inputWidget-input"></input>');
		
		$("span#ChaoRingBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="ChaoRing oo-ui-inputWidget-input"></input>');
		
		$("span#TrailXpBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="TrailXp oo-ui-inputWidget-input"></input>');
		
		$("span#TrailRingBox-"+i).html('<input onClick="this.select();" type="number" value="0" class="TrailRing oo-ui-inputWidget-input"></input>');
		
		i++;
	}

// Valid Input Checker
    $(".calcButton").click(function() {
    	var id = this.id.substring(5);

    	var RebirthValue = parseInt($("#RebirthBox-" + id + " > .Rebirth")[0].value);
    	if(RebirthValue < 0) {
    		$("#RebirthBox-" + id +" > .Rebirth")[0].value = 0;
    	}

    	var ChaoXpValue = parseInt($("#ChaoXpBox-" + id + " > .ChaoXp")[0].value);
    	if(ChaoXpValue < 0) {
    		$("#ChaoXpBox-" + id +" > .ChaoXp")[0].value = 0;
    	}
    	
    	var ChaoRingValue = parseInt($("#ChaoRingBox-" + id + " > .ChaoRing")[0].value);
    	if(ChaoRingValue < 0) {
    		$("#ChaoRingBox-" + id +" > .ChaoRing")[0].value = 0;
    	}

    	var TrailXpValue = parseInt($("#TrailXpBox-" + id + " > .TrailXp")[0].value);
    	if(TrailXpValue < 0) {
    		$("#TrailXpBox-" + id +" > .TrailXp")[0].value = 0;
    	}
    	
		var TrailRingValue = parseInt($("#TrailRingBox-" + id + " > .TrailRing")[0].value);
    	if(TrailRingValue < 0) {
    		$("#TrailRingBox-" + id +" > .TrailRing")[0].value = 0;
    	}
    	
    	// End Result Displayer
    	
    	var Orb = parseInt($("#OrbBox-" + id + " > .Orb")[0].value);
    	var Rebirth = parseInt($("#RebirthBox-" + id + " > .Rebirth")[0].value);
    	var World = parseInt($("#WorldBox-" + id + " > .World")[0].value);
    	var Boost = parseInt($("#BoostBox-" + id + " > .Boost")[0].value);
    	
    	var ChaoXp = parseInt($("#ChaoXpBox-" + id + " > .ChaoXp")[0].value);
    	var ChaoRing = parseInt($("#ChaoRingBox-" + id + " > .ChaoRing")[0].value);
    	var TrailXp = parseInt($("#TrailXpBox-" + id + " > .TrailXp")[0].value);
    	var TrailRing = parseInt($("#TrailRingBox-" + id + " > .TrailRing")[0].value);
    	
		document.getElementById("displayXpPlr-"+id).innerHTML = calcXpPlr(Orb, Rebirth, World, Boost, ChaoXp, TrailXp);
		document.getElementById("displayXpPet-"+id).innerHTML = calcXpPet(Orb, World);
		document.getElementById("displayRing-"+id).innerHTML = calcRing(Rebirth, World, Boost, ChaoRing, TrailRing);
		
    });
    
});