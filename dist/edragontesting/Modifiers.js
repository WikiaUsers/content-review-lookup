/* Any JavaScript here will be loaded for all users on every page load. */
// Adapted from King Dragonhoff's StatueStats javascript
$(document).ready(function() {
    /* Create inputs */
	$("span#builderBoostHarness").html('<div id="builderBoostInput">Builder Boost: <select name="builderBoost" id="builderBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> </select> %</div>');
	$("span#hammerJamHarness").html('<div id="hammerJamInput">Toggle Hammer Jam? <input type="checkbox" name="hammerJamBoost" id="hammerJamBoost"></input></div>');
	$("span#autoForgeHarness").html('<div id="autoForgeInput">Toggle Auto Forge Prices? <input type="checkbox" name="autoForgeBoost" id="autoForgeBoost"></input></div>');
	$("span#trainingBoostHarness").html('<div id="trainingBoostInput">Training Boost: <select name="trainingBoost" id="trainingBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="30">30</option> </select> %</div>');
	$("span#researchBoostHarness").html('<div id="researchBoostInput">Research Boost: <select name="researchBoost" id="researchBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="30">30</option> </select> %</div>');
	$("span#armyBoostHarness").html('<div id="armyBoostInput">Toggle Army Boost? <input type="checkbox" name="armyBoost" id="armyBoost"></input></div>');
	$("span#freezeHarness").html('<div id="freezeInput">Toggle Frost? <input type="checkbox" name="freezeBoost" id="freezeBoost"></input></div>');
	$("span#frostPotencyHarness").html('<div id="frostPotencyInput">Frost Potency: '+
		'<select name="frostPotencyLevel" id="frostPotencyLevel">'+
			'<option value="0">0</option>'+
			'<option value="30">30</option>'+
			'<option value="35">35</option>'+
			'<option value="40">40</option>'+
			'<option value="45">45</option>'+
			'<option value="50">50</option>'+
			'<option value="55">55</option>'+
			'<option value="60">60</option>'+
			'<option value="65">65</option>'+
			'<option value="70">70</option>'+
			'<option value="75">75</option>'+
		'</select> %</div>');
	$("span#normalAbilityHarness").html('<div id="normalAbilityInput">Toggle Ability? <input type="checkbox" name="normalAbilityBoost" id="normalAbilityBoost"></input></div>');
	$("span#heroAbilityHarness").html('<div id="heroAbilityInput">Toggle Hero Ability? <input type="checkbox" name="heroAbilityBoost" id="heroAbilityBoost"></input></div>');
	$("span#rageSpellHarness").html('<div id="rageSpellInput">Rage Spell Level: <select name="rageSpellLevel" id="rageSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> </select></div>');
	$("span#capitalRageSpellHarness").html('<div id="capitalRageSpellInput">Rage Spell Level: <select name="capitalRageSpellLevel" id="capitalRageSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#rageTowerHarness").html('<div id="rageTowerInput">Toggle Rage Spell Tower? <input type="checkbox" name="rageTowerBoost" id="rageTowerBoost"></input></div>');
	$("span#poisonTowerHarness").html('<div id="poisonTowerInput">Toggle Poison Spell Tower? <input type="checkbox" name="poisonTowerBoost" id="poisonTowerBoost"></input></div>');
	$("span#valkRageHarness").html('<div id="valkRageInput">Toggle Super Valkyrie Rage? <input type="checkbox" name="valkRageBoost" id="valkRageBoost"></input></div>');
	$("span#hasteSpellHarness").html('<div id="hasteSpellInput">Haste Spell Level: <select name="hasteSpellLevel" id="hasteSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#capitalHasteSpellHarness").html('<div id="capitalHasteSpellInput">Endless Haste Spell Level: <select name="capitalHasteSpellLevel" id="capitalHasteSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select></div>');
	$("span#poisonSpellHarness").html('<div id="poisonSpellInput">Poison Spell Level: <select name="poisonSpellLevel" id="poisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option></select></div>');
	$("span#THpoisonSpellHarness").html('<div id="THpoisonSpellInput">TH Poison Spell Level: <select name="THpoisonSpellLevel" id="THpoisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#HHpoisonSpellHarness").html('<div id="HHpoisonSpellInput">Headhunter Poison Level: <select name="HHpoisonSpellLevel" id="HHpoisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select></div>');
	// GW Life Gem: Keep the name "Life Aura" for legacy purposes (i.e. don't break the name)
	$("span#lifeAuraHarness").html('<div id="lifeAuraInput">Life Gem Level: <select name="lifeAuraLevel" id="lifeAuraLevel"> <option value="0">0</option> <option value="1">1-2</option> <option value="2">3-5</option> <option value="3">6-8</option> <option value="4">9-11</option> <option value="5">12-14</option> <option value="6">15-17</option> <option value="7">18</option> </select></div>');
	$("span#rageAuraHarness").html('<div id="rageAuraInput">Rage Gem Level: <select name="rageAuraLevel" id="rageAuraLevel"> <option value="0">0</option> <option value="1">1-2</option> <option value="2">3-5</option> <option value="3">6-8</option> <option value="4">9-11</option> <option value="5">12-14</option> <option value="6">15-17</option> <option value="7">18</option> </select></div>');
	$("span#targetHPHarness").html('<div id="targetHPInput">Target Max HP: <input type="text" value="0" id="targetHP" style="text-align: right; width: 55px; background-color:white;"></input></div>');
	$("span#apprenticeAuraHarness").html('<div id="apprenticeAuraInput">Apprentice Warden Aura Level: <select name="apprenticeAuraLevel" id="apprenticeAuraLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option></select></div>');
	/* Event boosts: change the options as appropriate for the event
	Last event: Cookie Rumble */
	$("span#eventBuilderBoostHarness").html('<div id="eventBuilderBoostInput" style="display:none;">Builder Boost: <select name="eventBuilderBoost" id="eventBuilderBoost"> <option value="0">0</option> <option value="5">5</option> <option value="10">10</option></select> %</div>');
	$("span#eventResearchBoostHarness").html('<div id="eventResearchBoostInput" style="display:none;">Research Boost: <select name="eventResearchBoost" id="eventResearchBoost"> <option value="0">0</option> <option value="5">5</option> <option value="10">10</option></select> %</div>');
	$("span#eventTrainingBoostHarness").html('<div id="eventTrainingBoostInput">Training Boost: <select name="eventTrainingBoost" id="eventTrainingBoost"> <option value="0">0</option> <option value="15">15</option> <option value="30">30</option></select> %</div>');
	$("span#modifierModeHarness").html('<div id="modifierModeToggle">Modifier Mode: '+
		'<select name="modifierMode" id="modifierMode">'+
   			'<option value="Attack">Attack</option>'+
    		'<option value="Defense">Defense</option>'+
		'</select></div>');
	// Hero gear boosts
	$("span#heroGearToggleHarness").html('<div id="heroGearEnableToggle">Enable Hero Gear? <input type="checkbox" name="heroGearToggle" id="heroGearToggle"></input></div>');
	$("span#heroGearHarness").html('<div id="heroGearInput">' +
		'<table><tr>' +
		'<td><div id="firstHeroGear">' +
    		'<div id="firstHeroGearOption"> Equipment 1: ' +
        	'<select name="firstHeroGearChoice" id="firstHeroGearChoice">' +
        	'</select></div>' +
    	'</div></td>' +
		'<td><div id="firstHeroGearLevel">' +
    		'<div id="firstHeroGearLvl"> Level: ' +
        	'<select name="firstHeroGearLevel" id="firstHeroGearLevel">' +
        	'</select></div>' +
    	'</div></td></tr>' +
    	'<tr><td><div id="secondHeroGear">' +
    		'<div id="secondHeroGearOption"> Equipment 2: ' +
        	'<select name="secondHeroGearChoice" id="secondHeroGearChoice">' +
        	'</select></div>' +
    	'</div></td>' +
		'<td><div id="secondHeroGearLevel">' +
    		'<div id="secondHeroGearLvl"> Level: ' +
        	'<select name="secondHeroGearLevel" id="secondHeroGearLevel">' +
    	    '</select></div>' +
    	'</div></td></tr>' +
	'</table></div>');
    /* Get the initial cell values, remove commas, and 
       set the cell's title attribute to its original value. */
   // Auxillary array for wall HTKs
   var deathDamageArray = [];
    /* Auxillary functions to refresh the level options for the choices
    Call on initialisation and whenever the choice is amended */
    function refreshFirstGearChoices() {
    	var firstGearName = $("select#firstHeroGearChoice option:selected").text();
        var levelCap = dictLevelCaps[firstGearName];
        var firstLevelChoices = $("select#firstHeroGearLevel");
    	firstLevelChoices.empty();
    	for (i = 0; i < levelCap; i++) {
    		firstLevelChoices.append($("<option></option>").attr("value",i).text(i+1));
    	}
    	// Hide the level if there is only one level available
        if (levelCap == 1) {
        	$("#firstHeroGearLvl").css("display","none");
        } else {
        	$("#firstHeroGearLvl").css("display","block");
        }
    }
    function refreshSecondGearChoices() {
    	var secondGearName = $("select#secondHeroGearChoice option:selected").text();
        var levelCap = dictLevelCaps[secondGearName];
        var secondLevelChoices = $("select#secondHeroGearLevel");
    	secondLevelChoices.empty();
    	for (i = 0; i < levelCap; i++) {
    		secondLevelChoices.append($("<option></option>").attr("value",i).text(i+1));
    	}
        // Hide the level if there is only one level available
        if (levelCap == 1) {
        	$("#secondHeroGearLvl").css("display","none");
        } else {
        	$("#secondHeroGearLvl").css("display","block");
        }
    }
    // Function to initialise the options we have available
    function initChoices() {
    	// Temporarily enable all options (we will disable one later)
        $("select#firstHeroGearChoice").children().prop('disabled',false);
        $("select#secondHeroGearChoice").children().prop('disabled',false);
    	// Initialize selections to the first and second items, respectively
        $("select#firstHeroGearChoice option[value=0]").prop('selected',true);
    	$("select#secondHeroGearChoice option[value=1]").prop('selected',true);
    	// Also disable the first item for second choice and second item for first choice
    	$("select#secondHeroGearChoice option[value=0]").prop('disabled',true);
    	$("select#firstHeroGearChoice option[value=1]").prop('disabled',true);
    }
    function toggleModifierMode() {
      	//Change the visibility of various items depending on the mode selected
        //If an item is to be made invisible, also reset it to its initial value
        //TODO: amend to all relevant modifiers
        var mode = $("select#modifierMode").val();
        if (mode == "Attack") {
        	// Reset the values of defense-only items
            $("#rageTowerBoost, #valkRageBoost").prop("checked",false);
            $("#poisonSpellLevel, #frostPotencyLevel").val("0").change();
        	// Disable defense-only items
        	$("#rageTowerHarness, #poisonSpellHarness, #valkRageHarness, #frostPotencyHarness, #defenseModsOnly").css("display","none");
            // Enable all disabled items (except for hero gear inputs and hero ability toggle)
            $("#rageSpellHarness, #capitalRageSpellHarness, #hasteSpellHarness, #capitalHasteSpellHarness, #THpoisonSpellHarness, #HHpoisonSpellHarness, #poisonTowerHarness, #normalAbilityHarness, #lifeAuraHarness, #rageAuraHarness, #heroGearToggleHarness, #offenseModsOnly").css("display","block");
            // Re-initialize hero gear options
            refreshHeroGear();
        } else {
        	// Reset the values of offense-only items
            $("#rageSpellLevel, #capitalRageSpellLevel, #hasteSpellLevel, #capitalHasteSpellLevel, #THpoisonSpellLevel, #HHpoisonSpellLevel, #lifeAuraLevel, #rageAuraLevel").val("0").change();
        	$("#poisonTowerBoost, #normalAbliityBoost, #heroAbilityBoost, #heroGearToggle").prop("checked",false);
        	// Disable offense-only items
            $("#rageSpellHarness, #capitalRageSpellHarness, #hasteSpellHarness, #capitalHasteSpellHarness, #THpoisonSpellHarness, #HHpoisonSpellHarness, #poisonTowerHarness, #normalAbilityHarness, #heroAbilityHarness, #lifeAuraHarness, #rageAuraHarness, #heroGearToggleHarness, #heroGearHarness, #offenseModsOnly").css("display","none");
            // Enable all disabled items
            $("#rageTowerHarness, #poisonSpellHarness, #valkRageHarness, #frostPotencyHarness, #defenseModsOnly").css("display","block");
        }
    }
    function refreshHeroGear() {
    	initChoices();
    	refreshFirstGearChoices();
    	refreshSecondGearChoices();
    }
   /* Initialize the choices
   We first start by writing down level caps corresponding to each choice */
    var dictLevelCaps = {
    	"Barbarian Puppet": 18,
        "Rage Vial": 18,
        "Earthquake Boots": 18,
        "Vampstache": 18,
        "Giant Gauntlet": 27,
    	"Archer Puppet": 18,
    	"Invisibility Vial": 18,
    	"Giant Arrow": 18,
    	"Healer Puppet": 18,
    	"Frozen Arrow": 27,
    	"Eternal Tome": 1, // Technically has 18 levels, but has no passive boosts, so it doesn't matter which you use
    	"Life Gem": 18,
    	"Rage Gem": 18,
    	"Healing Tome": 18,
    	"Royal Gem": 18,
    	"Seeking Shield": 18,
    };
    // Fix the options available to us, depending on the name of the page
    pageName = mw.config.get('wgTitle');
    var heroGearOptions = [];
    switch (pageName) {
    	case ("Modifiers Test"):
    		heroGearOptions = ["Barbarian Puppet", "Rage Vial", "Earthquake Boots", "Vampstache", "Giant Gauntlet", "Eternal Tome"]; //This is just to ensure that the 1-level toggle for level works
    		break;
    	case ("Modifiers Test 2"):
    		heroGearOptions = ["Archer Puppet", "Invisibility Vial", "Giant Arrow", "Healer Puppet", "Frozen Arrow"];
    		break;
    	default: // Having all options in one makes it excellent for testing
    		heroGearOptions = ["Barbarian Puppet", "Rage Vial", "Earthquake Boots", "Vampstache", "Giant Gauntlet", "Archer Puppet", "Invisibility Vial", "Giant Arrow", "Healer Puppet", "Frozen Arrow", "Eternal Tome", "Life Gem", "Rage Gem", "Healing Tome", "Royal Gem", "Seeking Shield"];
    }
	// Insert options
    for (i = 0; i < heroGearOptions.length; i++) {
        $("select#firstHeroGearChoice").append($("<option></option>").attr("value",i).text(heroGearOptions[i]));
        $("select#secondHeroGearChoice").append($("<option></option>").attr("value",i).text(heroGearOptions[i]));
    }
    // Initialize options
    refreshHeroGear();
    // Only toggle modifier mode if it is on the page
    if ($("select#modifierMode").val() != undefined) {
    	toggleModifierMode();
    }
    // Disable the hero gear and ability harnesses at first
    $("#heroGearHarness, #heroAbilityHarness").css("display","none");
    // Whenever modifier mode is changed
	$("select#modifierMode").change(function() {
		toggleModifierMode();
 	});
	// The below two functions disable the option for the other choice that the changed choice is picking
    $("select#firstHeroGearChoice").change(function() {
   		// Identify the choice to disable, and enable all other choices
  		var firstChoice = $("select#firstHeroGearChoice").val();
    	var choiceToDisable = $("select#secondHeroGearChoice option[value=" + firstChoice + "]");
    	choiceToDisable.prop('disabled',true);
    	choiceToDisable.siblings().prop('disabled',false);
		
		refreshFirstGearChoices();
    });
    $("select#secondHeroGearChoice").change(function() {
   	    // Identify the choice to disable, and enable all other choices
  		var secondChoice = $("select#secondHeroGearChoice").val();
    	var choiceToDisable = $("select#firstHeroGearChoice option[value=" + secondChoice + "]");
    	choiceToDisable.prop('disabled',true);
    	choiceToDisable.siblings().prop('disabled',false);
    	
		refreshSecondGearChoices();
    });
	$("#heroGearToggle").change(function() {
  		var tog = $("#heroGearToggle");
        if (tog.is(":checked") === true) {
        	$("#heroGearHarness, #heroAbilityHarness").css("display","block");
        } else {
        	$("#heroGearHarness, #heroAbilityHarness").css("display","none");
        }
	});
   $(".GoldPass").each(function() {
	  var initialStr = $(this).text();
	  $(this).attr("title", initialStr);
   });
   $(".AttackSpeed").each(function() {
      var initialSpeed = $(this).text().replace(/s/g,"") * 1;
      $(this).attr("title", initialSpeed);
   });
	// I could reuse the GoldPass class for this one, but the modifier should deal entirely in numbers
	// and it would be misleading to future editors if that's a GoldPass stat
   $(".ModifierStat").each(function() {
	  var initialStat = $(this).text().replace(/,/g,"") * 1;
	  $(this).attr("title", initialStat);
   });
   $(".ModifierRange").each(function() {
	  var initialRange = $(this).text().replace(/,/g,"");
	  $(this).attr("title", initialRange);
   });
   $(".AttackType").each(function() {
	  var initialAttackType = $(this).text().trim();
	  $(this).attr("title", initialAttackType);
   });
   /* Superseded by hero damage increase dictionaries
   $(".AbilityDPH").each(function() {
	  // First take the hit speed. Damage increase works on the original DPS
	  // Hero pages should only have one attack speed cell
	  var attackSpeed = $(".AttackSpeed").attr("title") * 1;
	  var damageIncrease = $(this).text().replace(/,/g,"") * (attackSpeed * 1000) / 1000;
	  heroAbilityDPH.push(damageIncrease);
   }); */
   // Still used for normal troops e.g. Baby Dragon
   $(".AbilityDI").each(function() {
	  var damageIncrease = $(this).text().replace(/%/g,"") * 1;
	  $(this).attr("title", damageIncrease);
   });
   // Still used for direct lookup (but modified from its original use)
   $(".AbilitySpeed").each(function() {
      var speedIncrease = $(this).text().replace(/,/g,"") * 1;
      $(this).attr("title", speedIncrease);
   });
   // Still used for normal troops e.g. Baby Dragon
   $(".AbilityAS").each(function() {
      var attackSpeedIncrease = $(this).text().replace(/%/g,"") * 1;
      $(this).attr("title", attackSpeedIncrease);
   });
   $(".WallDeathDamage").each(function() {
	  var deathDamage = $(this).text().replace(/,/g,"") * 1;
	  deathDamageArray.push(deathDamage);
   });
   $(".ModifierPercent").each(function () {
   		var percentDamage = $(this).text();
   		$(this).attr("title", percentDamage);
   });
   // New implementation as of December 2021: creating general functions for the Gold Pass modifier
   // here, cost is in units (not thousands or millions of units)
   function discountCost(cost, percent) {
   		return Math.ceil(cost * (1- percent/100));
   }
   // for time, we'll make functions to read in the strings, outputting a "seconds" value we'll use
   function readTime(str) {
   		/* Check if the string contains "d" for days. If so,
       	set the days parameter equal to the number preceding it. */
		if (str.includes("d") === true) {
  			var daysIndex = str.indexOf("d");
  			var days = str.slice(0,daysIndex) * 1;
		// Discard the string corresponding to days
  			var strHours = str.slice(daysIndex+1).trim();
  		} else {
  			var days = 0;
		// If "d" is not there, then leave the string unchanged, but on a new variable
  			var strHours = str;
  		}
		/* Check similarly if the string contains "h" for hours.
       	Similarly also for "m" (for minutes), "s" (for seconds). */
  		if (strHours.includes("h") === true) {
  			var hoursIndex = strHours.indexOf("h");
  			var hours = strHours.slice(0,hoursIndex) * 1;
  			var strMinutes = strHours.slice(hoursIndex+1).trim();
  		} else {
  			var hours = 0;
  			var strMinutes = strHours;
  		}
  		if (strMinutes.includes("m") === true) {
  			var minutesIndex = strMinutes.indexOf("m");
  			var minutes = strMinutes.slice(0,minutesIndex) * 1;
  			var strSeconds = strMinutes.slice(minutesIndex+1).trim();
  		} else {
  			var minutes = 0;
  			var strSeconds = strMinutes;
  		}
  		if (strSeconds.includes("s") === true) {
  			var secondsIndex = strSeconds.indexOf("s");
  			var seconds = strSeconds.slice(0,secondsIndex) * 1;
		// no need to cut the string any more
  		} else {
  			var seconds = 0;
  		}
		return days * 86400 + hours * 3600 + minutes * 60 + seconds;
   }
   // here, time is in seconds (not minutes, hours or days)
   function discountTime(time, percent) {
   		if (time < 1800 || percent === 0) /* no rounding if percent is 0 */ {
  			return Math.ceil(time * (1 - percent/100));
  		} else if (time <= 86400) {
  			return Math.floor((time * (1 - percent/100))/600) * 600;
  		} else {
  			return Math.floor((time * (1 - percent/100))/3600) * 3600;
 		}
   }
   function discountTrainTime(time, percent) {
   		return Math.ceil(time * (1 - percent/100));
   }
   // and make one function to output discounted time as a string
   function outputTime(time) {
   		var days = Math.floor(time/86400);
  		var hours = Math.floor((time - 86400*days)/3600);
  		var minutes = Math.floor((time - 86400*days - 3600*hours)/60);
  		var seconds = time - 86400*days - 3600*hours - 60*minutes;
 
  		if (days != 0) {
  			var outputDay = days + "d ";
  		} else {
  			var outputDay = "";
  		}
  		if (hours != 0) {
  			var outputHour = hours + "h ";
  		} else {
  			var outputHour = "";
  		}
  		if (minutes != 0) {
  			var outputMinute = minutes + "m ";
  		} else {
  			var outputMinute = "";
  		}
  		if (seconds != 0) {
  			var outputSecond = seconds + "s ";
  		} else {
  			var outputSecond = "";
  		}
  		return outputDay + outputHour + outputMinute + outputSecond;
   }
   // A new code for HV lab tables: converting a string of text containing slashes (/) to an array containing each block of text between slashes
   function labStringToArray(str) {
   		var array = [];
		while (str.search("/") != -1) {
  			array.push(str.slice(0,str.indexOf("/")).trim());
  			str = str.slice(str.indexOf("/")+1);
    	}
    	array.push(str.trim());
    	return array;
   }
   // Functions to convert costs in short-form to long-form and vice versa. Note that exactly one of K or M is assumed
   function labCostShortToLong(cost) {
		if (cost.indexOf("K") != -1) {
			var num = cost.slice(0,cost.indexOf("K")).trim() * 1;
			return num * 1000;
		} else if (cost.indexOf("M") != -1) {
			var num = cost.slice(0,cost.indexOf("M")).trim() * 1;
			return num * 1000000;
		} else {
			return cost * 1;
		}
   }
   function labCostLongToShort(cost) {
   		if (cost >= 1000000) {
   			var num = cost / 1000000;
   			return num.toString() + "M";
   		} else if (cost >= 1000) {
   			var num = cost / 1000;
   			return num.toString() + "K";
   		} else {
   			return cost;
   		}
   }
   function labArrayToString(array) {
		str = "";
        for (x in array) {
        	str += array[x] + " / ";
        }
        // Remove the extra slash
        return str.slice(0,-3);
   }
   // Discounts for HV lab tables
   function arrayCostDiscount(array, percent) {
   		for (x in array) {
   			array[x] = discountCost(array[x], percent);
   		}
   		return array;
   }
   function arrayTimeDiscount(array, percent) {
   		for (x in array) {
   			array[x] = discountTime(array[x], percent);
   		}
   		return array;
   }
   // Function for reading DPH ranges (used for Scattershot)
   function readRange(str) {
   		var array = [];
		while (str.search("-") != -1) {
  			array.push(str.slice(0,str.indexOf("-")).trim());
  			str = str.slice(str.indexOf("-")+1);
    	}
    	array.push(str.trim());
    	return array;
   }
   // When Submit button is pressed...
   $("#changeBonusButton").click(function() {
       // Change its text to "Update"
      $("#changeBonusButton").text("Update");
	  // Create arrays for EXP gains to unload later if required
	  var xpArray = [];
	  // Catch-up times (for collectors) are based on the ratio of new build time to old build time.
	  // Make two arrays for these
	  var buildTimes = [];
	  var newbuildTimes = [];
	  // Make three arrays for training times with 2, 3 and 4 barracks
	  var twoBarracksTimes = [];
	  // var threeBarracksTimes = [];
	  // var fourBarracksTimes = [];
      // Do the math and give each cell its new value
      // If cell values change, add styling to them
      $(".bCost").each(function() {
        var cellValueCost = $(this).attr("title").replace(/,/g, "") * 1;
		var boostPercent = $("#builderBoost").val() * 1;
		if (isNaN(boostPercent) === true) {
		    boostPercent = 0;
		}
		var eventBoostPercent = $("#eventBuilderBoost").val() * 1;
		if (isNaN(eventBoostPercent) === true) {
			eventBoostPercent = 0;
		}
		var hammerJamCheckBox = document.getElementById("hammerJamBoost");
		var autoForgeCheckBox = document.getElementById("autoForgeBoost");
		// Multiply initial value by 50% if hammer jam check box is true
		// Same deal with autoforge check box
		if (hammerJamCheckBox != null) {
			if (hammerJamCheckBox.checked === true) {
				var hammerJamCost = discountCost(cellValueCost,50);
				var calcNewCost = discountCost(hammerJamCost,boostPercent+eventBoostPercent);
			} else {
				var calcNewCost = discountCost(cellValueCost,boostPercent+eventBoostPercent);
			}
		} else if (autoForgeCheckBox != null) {
			if (autoForgeCheckBox.checked === true) {
				var autoForgeCost = discountCost(cellValueCost,50);
				var calcNewCost = discountCost(autoForgeCost,boostPercent+eventBoostPercent);
			} else {
				var calcNewCost = discountCost(cellValueCost,boostPercent+eventBoostPercent);
			}
		} else {
			var calcNewCost = discountCost(cellValueCost,boostPercent+eventBoostPercent);
		}
        $(this).text(calcNewCost.format("#,##0[.]###"));
        if (calcNewCost == cellValueCost) {
            $(".bCost").removeClass("StatModifiedGP");
        } else {
            $(".bCost").addClass("StatModifiedGP");
        }
      });
	   $(".tCost").each(function() {
        var cellValueCost = $(this).attr("title").replace(/,/g, "") * 1;
		var boostPercent = $("#trainingBoost").val() * 1;
		if (isNaN(boostPercent) === true) {
		    boostPercent = 0;
		}
		var eventBoostPercent = $("#eventTrainingBoost").val() * 1;
		if (isNaN(eventBoostPercent) === true) {
		    eventBoostPercent = 0;
		}
        var calcNewCost = discountCost(cellValueCost,boostPercent+eventBoostPercent);
        $(this).text(calcNewCost.format("#,##0[.]###"));
        if (calcNewCost == cellValueCost) {
            $(".tCost").removeClass("StatModifiedGP");
        } else {
            $(".tCost").addClass("StatModifiedGP");
        }
	  });
	   $(".rCost").each(function() {
		var cellValueCost = $(this).attr("title").replace(/,/g, "") * 1;
		var boostPercent = $("#researchBoost").val() * 1;
		if (isNaN(boostPercent) === true) {
		    boostPercent = 0;
		}
		var eventBoostPercent = $("#eventResearchBoost").val() * 1;
		if (isNaN(eventBoostPercent) === true) {
		    eventBoostPercent = 0;
		}
		var calcNewCost = discountCost(cellValueCost,boostPercent+eventBoostPercent);
		$(this).text(calcNewCost.format("#,##0[.]###"));
		if (calcNewCost == cellValueCost) {
			$(".rCost").removeClass("StatModifiedGP");
		} else {
			$(".rCost").addClass("StatModifiedGP");
		}
	  });
	   $(".bTime").each(function() {
		var str = $(this).attr("title");
		var reducePercent = $("#builderBoost").val() * 1;
		if (isNaN(reducePercent) === true) {
		    reducePercent = 0;
		}
		var eventReducePercent = $("#eventBuilderBoost").val() * 1;
		if (isNaN(eventReducePercent) === true) {
		    eventReducePercent = 0;
		}
		var timeSeconds = readTime(str);
		var newtimeSeconds = discountTime(timeSeconds,reducePercent+eventReducePercent);
 
		// Calculate the EXP gain and put into the xpArray
		var xpGain = Math.floor(Math.sqrt(newtimeSeconds));
		xpArray.push(xpGain);
 
		// Log the old and new build times into arrays
		buildTimes.push(timeSeconds);
		newbuildTimes.push(newtimeSeconds);
 
  		var output = outputTime(newtimeSeconds);
		$(this).text(output.trim());
		if (str.trim() == output.trim()) {
			$(this).removeClass("StatModifiedGP");
		} else {
			$(this).addClass("StatModifiedGP");
		}
      });
		$(".rTime").each(function() {
		var str = $(this).attr("title");
		var reducePercent = $("#researchBoost").val() * 1;
		if (isNaN(reducePercent) === true) {
		    reducePercent = 0;
		}
		var eventReducePercent = $("#eventResearchBoost").val() * 1;
		if (isNaN(eventReducePercent) === true) {
		    eventReducePercent = 0;
		}
		/* Check if the string contains "d" for days. If so,
       	set the days parameter equal to the number preceding it. */
		var timeSeconds = readTime(str);
		var newtimeSeconds = discountTime(timeSeconds,reducePercent+eventReducePercent);
  		var output = outputTime(newtimeSeconds);
  		
		$(this).text(output.trim());
		if (str.trim() == output.trim()) {
			$(this).removeClass("StatModifiedGP");
		} else {
			$(this).addClass("StatModifiedGP");
		}
      });
		$(".1B").each(function() {
		var str = $(this).attr("title");
		var reducePercent = $("#trainingBoost").val() * 1;
		if (isNaN(reducePercent) === true) {
		    reducePercent = 0;
		}
		var eventReducePercent = $("#eventTrainingBoost").val() * 1;
		if (isNaN(eventReducePercent) === true) {
		    eventReducePercent = 0;
		}
		var baseTrainTime = readTime(str);
		var newTrainTime = discountTrainTime(baseTrainTime,reducePercent+eventReducePercent);
		
		// Obtain new training times for 2, 3, 4 barracks
		// Following barracks changes in October 2022, 3 and 4 barracks are obsoleted. Effectively, a working barracks is worth two barracks, as though there's a invisible (always functional) barracks in the background
		// However, the training time for two barracks is not floored according to my testing
		var newTrainTime2 = Math.ceil(newTrainTime/2);
		// var newTrainTime3 = Math.floor(newTrainTime/3);
		// var newTrainTime4 = Math.floor(newTrainTime/4);
		
		// New test feature: If toggle boost is on, divide these times by 4:
		var armyBoostCheckBox = document.getElementById("armyBoost");
		if (armyBoostCheckBox != null) {
			if (armyBoostCheckBox.checked === true) {
				newTrainTime /= 4;
				newTrainTime2 /= 4;
			//	newTrainTime3 /= 4;
			//	newTrainTime4 /= 4;
			}
		}
 
		// Deposit these training times into the arrays
		twoBarracksTimes.push(newTrainTime2);
		// threeBarracksTimes.push(newTrainTime3);
		// fourBarracksTimes.push(newTrainTime4);
 
		// Convert back to original format
		var output = outputTime(newTrainTime);

		$(this).text(output.trim());
 
		if (str.trim() == output.trim()) {
			$(this).removeClass("StatModifiedGP");
		} else {
			$(this).addClass("StatModifiedGP");
		}
		
		if (armyBoostCheckBox != null) {
			if (armyBoostCheckBox.checked === true) {
				$(this).addClass("StatGemBoosted");
			} else {
				$(this).removeClass("StatGemBoosted");
			}
		}
	  });
		$(".2B").each(function() {
			var cellTrainTime = $(this).attr("title");
			// Now take the first element of the array
			var newTrainTime = twoBarracksTimes[0];
			var armyBoostCheckBox = document.getElementById("armyBoost");
			// Convert to the required format
			var output = outputTime(newTrainTime);
			$(this).text(output.trim());
			twoBarracksTimes.shift();
			if (cellTrainTime.trim() == output.trim()) {
            	$(this).removeClass("StatModifiedGP");
        	} else {
        	    $(this).addClass("StatModifiedGP");
        	}
        
        	if (armyBoostCheckBox != null) {
            	if (armyBoostCheckBox.checked === true) {
                	$(this).addClass("StatGemBoosted");
            	} else {
                	$(this).removeClass("StatGemBoosted");
            	}
        	}
	  });
	/*	Effectively obsoleted by barracks changes (see above)
		$(".3B").each(function() {
			var cellTrainTime = $(this).attr("title");
			// Now take the first element of the array
			var newTrainTime = threeBarracksTimes[0];
			var armyBoostCheckBox = document.getElementById("armyBoost");
			// Convert to the required format
			var output = outputTime(newTrainTime);
			$(this).text(output.trim());
			threeBarracksTimes.shift();
			if (cellTrainTime.trim() == output.trim()) {
                $(this).removeClass("StatModifiedGP");
            } else {
                $(this).addClass("StatModifiedGP");
            }
        
            if (armyBoostCheckBox != null) {
                if (armyBoostCheckBox.checked === true) {
                    $(this).addClass("StatGemBoosted");
                } else {
                    $(this).removeClass("StatGemBoosted");
                }
            }
	  });
		$(".4B").each(function() {
			var cellTrainTime = $(this).attr("title");
			// Now take the first element of the array
			var newTrainTime = fourBarracksTimes[0];
			var armyBoostCheckBox = document.getElementById("armyBoost");
			// Convert to the required format
			var output = outputTime(newTrainTime);
			$(this).text(output.trim());
			fourBarracksTimes.shift();
			if (cellTrainTime.trim() == output.trim()) {
                $(this).removeClass("StatModifiedGP");
            } else {
                $(this).addClass("StatModifiedGP");
            }
        
            if (armyBoostCheckBox != null) {
                if (armyBoostCheckBox.checked === true) {
                    $(this).addClass("StatGemBoosted");
                } else {
                    $(this).removeClass("StatGemBoosted");
                }
            }
	  }); */
		$(".EXP").each(function() {
			var xpOld = $(this).attr("title").replace(/,/g, "") * 1;
			// Take the first element of the xpArray and remove it
			var xpNew = xpArray[0];
			$(this).text(xpNew.format("#,##0[.]###"));
			xpArray.shift();
			if (xpNew === xpOld) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
	  });
		/* First discard the first entry of the two buildTime arrays.
		The first entry is useless because level 1 does not have a catch-up */
		buildTimes.shift();
		newbuildTimes.shift();
		$(".catchUp").each(function() {
			var str = $(this).attr("title");
  			var oldCatchUp = readTime(str);
			// Now extract the old and new build times. New catch up is based on the ratio
			var oldBuildTime = buildTimes[0] * 1;
			var newBuildTime = newbuildTimes[0] * 1;
 
			var newCatchUp = Math.ceil(oldCatchUp * newBuildTime / oldBuildTime);
 
  			var output = outputTime(newCatchUp);
			$(this).text(output.trim());
			//Now discard the first entry in the array (they've been used):
			buildTimes.shift();
			newbuildTimes.shift();
			if (str.trim() == output.trim()) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
	  });
		$(".labRCost").each(function() {
			var init = $(this).attr("title");
			var hasAsterisk = false;
			// Check if we contain an asterisk in the string (corresponding to items that could be upgraded early)
			if (init.indexOf("*") != -1) {
				hasAsterisk = true;
				init = init.slice(1);
			}
			var initArray = labStringToArray(init);
			var boostPercent = $("#researchBoost").val() * 1;
			if (isNaN(boostPercent) === true) {
		    	boostPercent = 0;
			}
			var eventBoostPercent = $("#eventResearchBoost").val() * 1;
			if (isNaN(eventBoostPercent) === true) {
		    	eventBoostPercent = 0;
			}
			var costArray = [];
			for (x in initArray) {
				costArray.push(labCostShortToLong(initArray[x]));
			}
			var discountArray = arrayCostDiscount(costArray,boostPercent+eventBoostPercent);
			var outputArray = [];
			for (x in discountArray) {
				outputArray.push(labCostLongToShort(discountArray[x]));
			}
			var output = labArrayToString(outputArray);
			if (hasAsterisk === true) {
				output = "*" + output;
			}
			$(this).text(output.trim());
			if (init.trim() == output.trim() || boostPercent + eventBoostPercent === 0) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
		});
		$(".labRTime").each(function() {
			var init = $(this).attr("title");
			var hasAsterisk = false;
			// Check if we contain an asterisk in the string (corresponding to items that could be upgraded early)
			if (init.indexOf("*") != -1) {
				hasAsterisk = true;
				init = init.slice(1);
			}
			var initArray = labStringToArray(init);
			var boostPercent = $("#researchBoost").val() * 1;
			if (isNaN(boostPercent) === true) {
		    	boostPercent = 0;
			}
			var eventBoostPercent = $("#eventResearchBoost").val() * 1;
			if (isNaN(eventBoostPercent) === true) {
		    	eventBoostPercent = 0;
			}
			var timeArray = [];
			for (x in initArray) {
				timeArray.push(readTime(initArray[x]));
			}
			var discountArray = arrayTimeDiscount(timeArray,boostPercent+eventBoostPercent);
			var outputArray = [];
			for (x in discountArray) {
				outputArray.push(outputTime(discountArray[x]));
			}
			var output = labArrayToString(outputArray);
			if (hasAsterisk === true) {
				output = "*" + output;
			}
			$(this).text(output.trim());
			if (init.trim() == output.trim() || boostPercent + eventBoostPercent === 0) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
		});
	  // Create an array of attack frequencies. This is because we may have two or more speeds on the same page
	  // We later use this array to calculate DPS if required
	  var attackFreqArray = [];
	  // We also need a DPH array to calculate DPS
	  var DPHArray = [];
	  // Add an array for Wall damage
	  var wallDamageArray = [];
	  // Two lookup arrays for the GW's life aura ability
	  var auraPercentIncrease = [0,400,500,600,700,800,900,1000];
	  var auraMaxHPIncrease = [0,275,350,425,500,575,650,725];
	  // Another one for GW's rage aura ability
	  var rageAuraPercentIncrease = [0,20,25,30,35,40,45,50];
	  // Lookup arrays for the apprentice's aura ability
	  // Styled in thousandths for ease of comparison
	  // TODO: Life aura no longer requires thousandths, may convert to hundredths instead
	  var apprenticeAuraPercentIncrease = [0,240,260,280,300];
	  // And a lookup for poison attack rate decrease (used for AltDPS)
	  var poisonASMultiplier = [0,35,40,45,50,55,60,65,68,70,72];
	  /* Hero Equipment stat dictionaries. We include one for each of the following:
			1. DPS bonus (effectively adds to DPH, but we'll add raw DPS)
			2. HP bonus
			3. HP regen bonus (let's also list Royal Gem's HP regen because that's literally all it does)
			4. Attack speed bonus
			5. Ability damage increase (%)
			6. Ability DPH increase
			7. Ability movement speed
			8. Ability attack type (simply a string to replace another)
		What is not given a dictionary:
			1. Self-heal per second
			2. Other ability aspects e.g. duration, projectile damage, etc.
	  */
		var dictDPSBonus = {
			"Rage Vial": [17,22,27,32,37,42,48,54,60,66,72,79,86,94,104,112,120,128],
			"Earthquake Boots": [13,15,17,19,21,23,26,28,32,40,48,55,63,71,79,86,94,102],
			"Vampstache": [9,10,12,13,15,16,18,19,22,27,32,37,42,48,53,58,63,68],
			"Giant Gauntlet": [17,20,23,26,29,32,34,37,43,53,63,74,84,94,104,115,125,135,140,145,150,155,160,165,170,175,180],
			"Archer Puppet": [26,34,42,49,55,62,71,80,90,100,109,115,122,127,132,136,140,144],
			"Giant Arrow": [20,23,27,30,33,37,40,43,50,59,68,77,86,96,105,114,123,132],
			"Life Gem": [10,12,14,16,18,20,22,24,28,32,38,42,46,50,54,58,62,66],
			"Rage Gem": [12,14,16,18,20,22,24,26,30,36,43,49,56,62,69,75,82,88],
			"Royal Gem": [20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105]
		};
		var dictHPBonus = {
			"Barbarian Puppet": [281,350,425,513,590,668,760,855,950,1050,1150,1314,1520,1726,1932,2138,2344,2550],
			"Earthquake Boots": [209,244,278,313,348,383,418,452,522,677,831,986,1140,1295,1449,1604,1758,1913],
			"Invisibility Vial": [80,100,120,140,170,200,250,300,340,380,420,460,500,540,580,620,660,700],
			"Giant Arrow": [80,93,106,119,133,146,159,172,199,241,284,326,369,411,454,496,539,581],
			"Healer Puppet": [132,154,177,199,221,243,265,287,331,402,473,543,614,685,756,826,897,968],
			"Life Gem": [150,163,172,181,192,203,225,249,275,304,336,351,366,381,396,411,426,441],
			"Healing Tome": [92,107,122,137,153,168,183,198,229,280,330,381,432,482,533,584,634,685],
			"Royal Gem": [40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380],
			"Seeking Shield": [40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380]
		};
		var dictHPRecoveryBonus = {
			"Barbarian Puppet": [100,150,200,250,300,350,400,450,520,600,680,770,860,940,1060,1130,1200,1260],
			"Rage Vial": [150,225,300,375,450,525,600,675,780,900,1020,1155,1290,1410,1590,1695,1800,1890],
			"Archer Puppet": [160,175,190,205,220,235,250,265,280,295,310,325,340,360,380,400,420,440],
			"Healing Tome": [165,193,220,248,275,303,330,358,413,463,513,563,613,663,713,763,813,863],
			"Royal Gem": [1200,1200,1450,1450,1450,1600,1600,1600,1800,1800,1800,2000,2000,2000,2200,2200,2200,2400]
		};
		var dictASBonus = {
			"Vampstache": [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
			"Rage Gem": [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
		};
		var dictAbilityDIBonus = {
			"Rage Vial": [120,120,130,130,130,135,135,135,140,140,140,145,145,145,150,150,150,155]
		};
		var dictAbilityDPHBonus = {
			"Invisibility Vial": [340,440,540,640,730,820,920,1020,1120,1220,1310,1370,1430,1490,1560,1620,1680,1740]
		};
		var dictAbilitySpeedBonus = { //Written in number of tenths
			"Rage Vial": [340,340,383,383,383,415,415,415,447,447,447,480,480,480,511,511,511,543]
		};
		var dictAttackTypeText = { //Repeat as many times as there are levels (if constant across all levels)
			"Giant Gauntlet": Array(27).fill("Area Splash (2.5 tile Radius)")
		};
		// Read the equipment and level
		// Note: The levels are zero-indexed, so e.g. level 2 equipment outputs level 1
		// This is to be compatible with the dictionaries, which are also zero-indexed
		var firstHeroGearName, firstHeroGearLvl, secondHeroGearName, secondHeroGearLvl;
		if ($("#heroGearToggle").is(":checked") === true) {
    		firstHeroGearName = $("select#firstHeroGearChoice option:selected").text();
    		firstHeroGearLvl = $("select#firstHeroGearLevel").val();
      		secondHeroGearName = $("select#secondHeroGearChoice option:selected").text();
    		secondHeroGearLvl = $("select#secondHeroGearLevel").val();
    	}
		$(".AttackSpeed").each(function() {
			// Flags for CSS styling
			var frostUsed = false;
			var poisonUsed = false;
			
			var initialSpeed = $(this).attr("title") * 1;
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
		    var HHpoisonSpellLevel = $("#HHpoisonSpellLevel").val() * 1;
		    if (isNaN(HHpoisonSpellLevel) === true) {
		    	HHpoisonSpellLevel = 0;
		    }
		    /* Set the poison spell level to headhunter lv + 4 if HH level is nonzero
		    There should be no conflict because HH level is attack-only while Poison level is defense-only */
		    if (HHpoisonSpellLevel > 0) {
		    	poisonSpellLevel = HHpoisonSpellLevel + 4;
		    }
			var freezeCheckBox = document.getElementById("freezeBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			
			var firstGearASBoost = 0;
			var secondGearASBoost = 0;
			
			var firstGearASArray = dictASBonus[firstHeroGearName];
			if (firstGearASArray != undefined) {
    			firstGearASBoost = firstGearASArray[firstHeroGearLvl];
        		if (isNaN(firstGearASBoost)) {
        			firstGearASBoost = 0;
        		}
    		}
			var secondGearASArray = dictASBonus[secondHeroGearName];
			if (secondGearASArray != undefined) {
    			secondGearASBoost = secondGearASArray[secondHeroGearLvl];
        		if (isNaN(secondGearASBoost)) {
        			secondGearASBoost = 0;
        		}
    		}
			
			// Try to prevent floating-point errors from making weird behaviour
			var attackFreq = 1000 / (initialSpeed * 1000);
			// Now it's the attack frequency we want to modify, so modify away!
			
		    // Expand this part later to add support for poison, etc.
			var poisonMultiplier = (100 - poisonASMultiplier[poisonSpellLevel])/100;
			var THpoisonMultiplier = 1;
			if (THpoisonSpellLevel > 0) {
				THpoisonMultiplier = (15 - THpoisonSpellLevel)/20;
			}
			var poisonTowerMultiplier = 1;
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
                poisonTowerMultiplier = 75/100;
            	}
			}
			// Whichever poison is most severe will take precedence. Also only apply if unit is not a Building
			if ($(this).hasClass("Building") === false) {
				if (Math.min(poisonMultiplier,THpoisonMultiplier,poisonTowerMultiplier) < 1) {
					poisonUsed = true;
				}
				attackFreq *= Math.min(poisonMultiplier,THpoisonMultiplier,poisonTowerMultiplier);
			}
			
			// Frost: Compare the toggle (50%) and potency multipliers
			var freezeMultiplier = 1;
			var frostMultiplier = 1;
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true) {
                freezeMultiplier = 0.5;
            	}
			}
			var frostPotency = $("#frostPotencyLevel").val() * 1;
			if (isNaN(frostPotency) === true) {
		    	frostPotency = 0;
		    }
		    frostMultiplier = (100 - frostPotency) / 100;
		    // Only apply frost against non-Builders
		    if ($(this).hasClass("Builder") === false) {
		    	if (Math.min(freezeMultiplier,frostMultiplier) < 1) {
		    		frostUsed = true; // Enables frozen CSS if any frost modifier is picked
		    	}
		    	// Pick the strongest of frost toggle and frost potency
				attackFreq *= Math.min(freezeMultiplier,frostMultiplier);
		    }
			
			var normalAbilityCheckBox = document.getElementById("normalAbilityBoost");
			var normalAbilityAS = 0;
			if (normalAbilityCheckBox != null) {
				if (normalAbilityCheckBox.checked === true) {
					normalAbilityAS = $(".AbilityAS").attr("title") * 1;
					if (isNaN(normalAbilityAS) === true) {
						normalAbilityAS = 0;
					}
				}
			}
			// Stack all of the positive multipliers together additively
			var positiveAbilityMultiplier = (100 + normalAbilityAS + firstGearASBoost + secondGearASBoost) / 100;
			attackFreq *= positiveAbilityMultiplier;
			
			attackFreqArray.push(attackFreq);
			// Now display the new attack speed:
			var newSpeed = 1000 / (attackFreq * 1000);
			// We want to display this new speed to 3 d.p. if it is not exactly representible with 3 d.p.
			var roundedSpeed = newSpeed.toFixed(3) * 1;
			var displaySpeed = newSpeed.toFixed() * 1;
			var i = 0;
			while (roundedSpeed != displaySpeed && i < 3) {
				i++;
				displaySpeed = newSpeed.toFixed(i) * 1;
			}
			$(this).text(displaySpeed + "s");
			if (initialSpeed == displaySpeed) {
				$(this).removeClass("StatModified");
				$(this).removeClass("StatPoisoned");
			} else if (poisonUsed && $(this).hasClass("Building") === false) {
				$(this).addClass("StatPoisoned");
				$(this).removeClass("StatModified");
			} else {
				$(this).addClass("StatModified");
				$(this).removeClass("StatPoisoned");
			}
			if (frostUsed === true) {
				$(this).addClass("StatFrozen");
			} else {
				$(this).removeClass("StatFrozen");
			}
		});
		// Make a function for calculating DPH, since some different classes (DPH and DPHRange) call on it
		// Note: DPH increase from passives or ability will be handled before feeding that DPH into here (it is observed to stack multiplicatively)
		function calcDPH(initialDPH,isHero,isBuilding,isStatue) {
			var rageSpellLevel = $("#rageSpellLevel").val() * 1;
			var capitalRageSpellLevel = $("#capitalRageSpellLevel").val() * 1;
			var rageAuraLevel = $("#rageAuraLevel").val() * 1;
			var rageTowerCheckBox = document.getElementById("rageTowerBoost");
			var valkRageCheckBox = document.getElementById("valkRageBoost");
			if (isNaN(rageSpellLevel) === true) {
		    	rageSpellLevel = 0;
		    }
		    if (isNaN(rageAuraLevel) === true) {
		    	rageAuraLevel = 0;
		    }
		    // Set the rage level to 4 if using Super Valkyrie Rage checkbox
		    if (valkRageCheckBox != null) {
				if (valkRageCheckBox.checked === true) {
					rageSpellLevel = 4;
				}
		    }
		    if (isNaN(capitalRageSpellLevel) === true) {
		    	capitalRageSpellLevel = 0;
		    }
			var calcNewDPH = initialDPH;
			var rageMultiplier = 1;
			var towerRageMultiplier = 1;
			var auraRageMultiplier = 1;
			if (rageSpellLevel > 0) {
				// If the unit is a building (has Building class), don't apply rage modifiers. If it is not a building but is a Hero (gains reduced multiplier), use the reduced damage multiplier.
				if (isBuilding === true) {
					rageMultiplier = 1;
				} else if (isHero === true) {
					rageMultiplier = (rageSpellLevel + 32)/20;
				} else {
					rageMultiplier = (rageSpellLevel + 22)/10;
				}
			} else if (capitalRageSpellLevel > 0) { //Not made to be compatible with the rage spell tower, as the latter does not appear in Clan Capital
				rageMultiplier = (capitalRageSpellLevel + 16)/10;
			}
			if (rageTowerCheckBox != null) {
				if (rageTowerCheckBox.checked === true) {
					// Grand Warden statue (has Statue class) is not a building and so gains full buff
					if (isHero === true && isStatue === false) {
						towerRageMultiplier = 13/10;
					} else {
						towerRageMultiplier = 16/10;
					}
				}
			}
			if (rageAuraLevel > 0) {
				var auraBoost = rageAuraPercentIncrease[rageAuraLevel];
				// If the unit is a Hero, apply half this boost
				if (isHero === true) {
					auraRageMultiplier = (100 + (auraBoost * 5 / 10)) / 100;
				} else {
					auraRageMultiplier = (100 + auraBoost) / 100;
				}
			}
			var rageDamage = initialDPH * Math.max(rageMultiplier, towerRageMultiplier, auraRageMultiplier);
			
			// For hero ability damage increase, look it up from dictionary
			var firstGearAbilityDI = 0;
			var secondGearAbilityDI = 0;
			
    		var firstGearArray = dictAbilityDIBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearAbilityDI = firstGearArray[firstHeroGearLvl];
        		if (isNaN(firstGearAbilityDI)) {
        			firstGearAbilityDI = 0;
        		}
    		}
      		var secondGearArray = dictAbilityDIBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearAbilityDI = secondGearArray[secondHeroGearLvl];
        		if (isNaN(secondGearAbilityDI)) {
        			secondGearAbilityDI = 0;
        		}
    		}
    		
    		var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
			var heroAbilityMultiplier = 1;
			if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					// Assuming that DI increases are additive. If they're not, I'll have to tweak it to use max
                	heroAbilityMultiplier = (100 + firstGearAbilityDI + secondGearAbilityDI) / 100;
				}
			}
			var heroAbilityDamage = initialDPH * heroAbilityMultiplier;
			
			var normalAbilityCheckBox = document.getElementById("normalAbilityBoost");
			var normalAbilityMultiplier = 1;
			if (normalAbilityCheckBox != null) {
				if (normalAbilityCheckBox.checked === true) {
					var normalAbilityDI = $(".AbilityDI").attr("title") * 1;
					if (isNaN(normalAbilityDI) === true) {
						normalAbilityDI = 0;
					}
					var normalAbilityMultiplier = (100 + normalAbilityDI) / 100;
				}
			}
			var normalAbilityDamage = initialDPH * normalAbilityMultiplier;
			
			calcNewDPH = Math.max(rageDamage,heroAbilityDamage,normalAbilityDamage);
			return calcNewDPH;
		}
		$(".DPH").each(function() {
			var initialDPH = $(this).attr("title") * 1;
			var baseDPH = initialDPH;
			var calcNewDPH = initialDPH;
			// First, alter the initial DPH by passive DPS-increasing equipment
			// We'll write our attack speed in milliseconds
			var attackSpeed = $(".AttackSpeed").attr("title") * 1000;
			
			// Next, lookup the passive DPS increases from gear
			var firstGearDPS = 0;
			var secondGearDPS = 0;
			var firstGearAbilityDPH = 0;
			var secondGearAbilityDPH = 0;
			
			// Set passive DPS bonuses first
    		var firstGearArray = dictDPSBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearDPS = firstGearArray[firstHeroGearLvl];
        		if (isNaN(firstGearDPS)) {
        			firstGearDPS = 0;
        		}
    		}
      		var secondGearArray = dictDPSBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearDPS = secondGearArray[secondHeroGearLvl];
        		if (isNaN(secondGearDPS)) {
        			secondGearDPS = 0;
        		}
    		}
    		// Add this to initial DPH
    		baseDPH = initialDPH + ((firstGearDPS + secondGearDPS) * attackSpeed / 1000);
    		// Then ability damage (if hero ability checkbox is turned on)
    		firstGearArray = dictAbilityDPHBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearAbilityDPH = firstGearArray[firstHeroGearLvl];
        		if (isNaN(firstGearAbilityDPH)) {
        			firstGearAbilityDPH = 0;
        		}
    		}
      		secondGearArray = dictAbilityDPHBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearAbilityDPH = secondGearArray[secondHeroGearLvl];
        		if (isNaN(secondGearAbilityDPH)) {
        			secondGearAbilityDPH = 0;
        		}
    		}
    		var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					baseDPH += (firstGearAbilityDPH + secondGearAbilityDPH);
				}
			}
			
			// Now begin work on the base DPH
			if ($(this).hasClass("Hero") === true) {
				if ($(this).hasClass("Statue") === true) {
					calcNewDPH = calcDPH(baseDPH,true,false,true);
				} else {
					calcNewDPH = calcDPH(baseDPH,true,false,false);
				}
			} else if ($(this).hasClass("Building") === true) {
				calcNewDPH = calcDPH(baseDPH,false,true,false);
			} else {
				calcNewDPH = calcDPH(baseDPH,false,false,false);
			}
			// Don't add the DPH to the array if it's an alternative, secondary damage
			if ($(this).hasClass("Secondary") === false) {
				DPHArray.push(calcNewDPH);
			}
			if ($(this).hasClass("Wall") === true) {
				wallDamageArray.push(calcNewDPH);
			}
			$(this).text(calcNewDPH.format("#,##0[.]###"));
			if (initialDPH === calcNewDPH) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
		});
		$(".DPHRange").each(function() {
			var initRange = $(this).attr("title");
			// Initial range but formatted - used to compare with the final output
			var initFormat = "";
			var initArray = readRange(initRange);
			for (x in initArray) {
				initArray[x] = initArray[x] * 1;
			}
			initFormat = initArray[0].format("#,##0[.]###") + "-" + initArray[1].format("#,##0[.]###");
			var moddedArray = [];
			var outputRange = "";
			for (x in initArray) {
				moddedArray.push(calcDPH(initArray[x],false));
			}
			outputRange = moddedArray[0].format("#,##0[.]###") + "-" + moddedArray[1].format("#,##0[.]###");
			$(this).text(outputRange.trim());
			if (initFormat.trim() === outputRange.trim()) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
		});
		$(".DPS").each(function() {
			// Flags for CSS styling
			var poisonUsed = false;
			var frostUsed = false;
			
			var initialDPS = $(this).attr("title") * 1;
			var attackFreq = attackFreqArray[0];
			//Here, DPS is calculated by taking the DPS
			var calcNewDPS = DPHArray[0] * attackFreq;
			$(this).text(calcNewDPS.format("#,##0[.]###"));
			DPHArray.shift();
			if (initialDPS == calcNewDPS.toFixed(3)) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
            // These aren't used directly to calculate DPS (instead it works directly on attack speed)
            // Instead, we simply use them to determine if CSS should be styled
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
			var HHpoisonSpellLevel = $("#HHpoisonSpellLevel").val() * 1;
		    if (isNaN(HHpoisonSpellLevel) === true) {
		    	HHpoisonSpellLevel = 0;
		    }
		    var freezeUsed = false;
			var freezeCheckBox = document.getElementById("freezeBoost");
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true) {
					freezeUsed = true;
				}
			}
			var frostPotency = $("#frostPotencyLevel").val() * 1;
			if (isNaN(frostPotency) === true) {
		    	frostPotency = 0;
		    }
		    var poisonTowerUsed = false;
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					poisonTowerUsed = true;
				}
			}
			poisonUsed = ((poisonSpellLevel + THpoisonSpellLevel + HHpoisonSpellLevel > 0) || poisonTowerUsed) && ($(this).hasClass("Building") === false);
			freezeUsed = (freezeCheckBox.checked === true || frostPotency > 0) && ($(this).hasClass("Building") === false);
			if (poisonUsed) {
				$(this).addClass("StatPoisoned");
			} else {
				$(this).removeClass("StatPoisoned");
			}
			if (freezeUsed) {
				$(this).addClass("StatFrozen");
			} else {
				$(this).removeClass("StatFrozen");
			}
		});
		// Alternative DPS for different attack speeds
		$(".DPS2").each(function() {
			// Flags for CSS styling
			var poisonUsed = false;
			var frostUsed = false;
			
            var initialDPS = $(this).attr("title") * 1;
            var attackFreq = attackFreqArray[1];
            //Here, DPS is calculated by taking the DPS
            var calcNewDPS = DPHArray[0] * attackFreq;
            $(this).text(calcNewDPS.format("#,##0[.]###"));
            DPHArray.shift();
            if (initialDPS == calcNewDPS.toFixed(3)) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
			            // These aren't used directly to calculate DPS (instead it works directly on attack speed)
            // Instead, we simply use them to determine if CSS should be styled
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
		    var HHpoisonSpellLevel = $("#HHpoisonSpellLevel").val() * 1;
		    if (isNaN(HHpoisonSpellLevel) === true) {
		    	HHpoisonSpellLevel = 0;
		    }
		    var freezeUsed = false;
			var freezeCheckBox = document.getElementById("freezeBoost");
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true) {
					freezeUsed = true;
				}
			}
			var frostPotency = $("#frostPotencyLevel").val() * 1;
			if (isNaN(frostPotency) === true) {
		    	frostPotency = 0;
		    }
		    var poisonTowerUsed = false;
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					poisonTowerUsed = true;
				}
			}
			poisonUsed = ((poisonSpellLevel + THpoisonSpellLevel + HHpoisonSpellLevel > 0) || poisonTowerUsed) && ($(this).hasClass("Building") === false);
			freezeUsed = (freezeCheckBox.checked === true || frostPotency > 0) && ($(this).hasClass("Building") === false);
			if (poisonUsed) {
				$(this).addClass("StatPoisoned");
			} else {
				$(this).removeClass("StatPoisoned");
			}
			if (freezeUsed) {
				$(this).addClass("StatFrozen");
			} else {
				$(this).removeClass("StatFrozen");
			}
        });
		// And (perhaps confusingly) "AltDPS", for DPS that's different due to damage bonuses on targets,
		// or simply if you just want DPS altered by buffs/debuffs without dependency on DPH
		$(".AltDPS").each(function() {
			// Flags for CSS styling
			var poisonUsed = false;
			var frostUsed = false;
			
			var initialDPS = $(this).attr("title") * 1;
			var baseDPS = initialDPS;

			// First, alter the initial DPH by passive DPS-increasing equipment
			// We'll write our attack speed in milliseconds
			var attackSpeed = $(".AttackSpeed").attr("title") * 1000;
			// First modify this base DPS by hero equipment
			// Lookup the passive DPS increase and ability DPH increases
			var firstGearDPS = 0;
			var secondGearDPS = 0;
			var firstGearAbilityDPH = 0;
			var secondGearAbilityDPH = 0;
			
			// Set passive DPS bonuses first
    		var firstGearArray = dictDPSBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearDPS = firstGearArray[firstHeroGearLvl];
        		if (isNaN(firstGearDPS)) {
        			firstGearDPS = 0;
        		}
    		}
      		var secondGearArray = dictDPSBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearDPS = secondGearArray[secondHeroGearLvl];
        		if (isNaN(secondGearDPS)) {
        			secondGearDPS = 0;
        		}
    		}
    		baseDPS = initialDPS + firstGearDPS + secondGearDPS;
    		
    		// Then ability damage (if hero ability checkbox is turned on)
    		firstGearArray = dictAbilityDPHBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearAbilityDPH = firstGearArray[firstHeroGearLvl];
        		if (isNaN(firstGearAbilityDPH)) {
        			firstGearAbilityDPH = 0;
        		}
    		}
      		secondGearArray = dictAbilityDPHBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearAbilityDPH = secondGearArray[secondHeroGearLvl];
        		if (isNaN(secondGearAbilityDPH)) {
        			secondGearAbilityDPH = 0;
        		}
    		}
    		var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					baseDPS += (firstGearAbilityDPH + secondGearAbilityDPH) * 1000 / attackSpeed;
				}
			}
			
			var rageSpellLevel = $("#rageSpellLevel").val() * 1;
			var valkRageCheckBox = document.getElementById("valkRageBoost");
			if (isNaN(rageSpellLevel) === true) {
		    	rageSpellLevel = 0;
		    }
		    // Set the rage level to 4 if using Super Valkyrie Rage checkbox
		    if (valkRageCheckBox != null) {
				if (valkRageCheckBox.checked === true) {
					rageSpellLevel = 4;
				}
		    }
		    var capitalRageSpellLevel = $("#capitalRageSpellLevel").val() * 1;
			if (isNaN(capitalRageSpellLevel) === true) {
		    	capitalRageSpellLevel = 0;
		    }
		    var rageAuraLevel = $("#rageAuraLevel").val() * 1;
			if (isNaN(rageAuraLevel) === true) {
		    	rageAuraLevel = 0;
		    }
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
			var HHpoisonSpellLevel = $("#HHpoisonSpellLevel").val() * 1;
		    if (isNaN(HHpoisonSpellLevel) === true) {
		    	HHpoisonSpellLevel = 0;
		    }
		    /* Set the poison spell level to headhunter lv + 4 if HH level is nonzero
		    There should be no conflict because HH level is attack-only while Poison level is defense-only */
		    if (HHpoisonSpellLevel > 0) {
		    	poisonSpellLevel = HHpoisonSpellLevel + 4;
		    }
		    var frostPotency = $("#frostPotencyLevel").val() * 1;
			if (isNaN(frostPotency) === true) {
		    	frostPotency = 0;
		    }
			var freezeCheckBox = document.getElementById("freezeBoost");
			var rageTowerCheckBox = document.getElementById("rageTowerBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			// First calculate buffed DPS by rage
			
			var rageMultiplier = 1;
			var towerRageMultiplier = 1;
			var auraRageMultiplier = 1;
			if (rageSpellLevel > 0) {
				// If the unit is a building (has Building class), don't apply rage modifiers. If it is not a building but is a Hero (gains reduced multiplier), use the reduced damage multiplier.
				if ($(this).hasClass("Building") === true) {
					rageMultiplier = 1;
				} else if ($(this).hasClass("Hero") === true) {
					rageMultiplier = (rageSpellLevel + 32)/20;
				} else {
					rageMultiplier = (rageSpellLevel + 22)/10;
				}
			} else if (capitalRageSpellLevel > 0) { //Not made to be compatible with the rage spell tower, as the latter does not appear in Clan Capital
				rageMultiplier = (capitalRageSpellLevel + 16)/10;
			}
			if (rageTowerCheckBox != null) {
				if (rageTowerCheckBox.checked === true) {
					// Grand Warden statue (has Statue class) is not a building and so gains full buff
					if ($(this).hasClass("Hero") === true && $(this).hasClass("Statue") === false) {
						towerRageMultiplier = 13/10;
					} else {
						towerRageMultiplier = 16/10;
					}
				}
			}
			if (rageAuraLevel > 0) {
				var auraBoost = rageAuraPercentIncrease[rageAuraLevel];
				// If the unit is a Hero, apply half this boost
				if ($(this).hasClass("Hero") === true) {
					auraRageMultiplier = (100 + (auraBoost * 5 / 10)) / 100;
				} else {
					auraRageMultiplier = (100 + auraBoost) / 100;
				}
			}
            var rageDPS = baseDPS * Math.max(rageMultiplier,towerRageMultiplier,auraRageMultiplier);
			// Now we adjust for hero abilities
			var firstGearAbilityDI = 0;
			var secondGearAbilityDI = 0;
			var abilityDPS = baseDPS;
			
    		firstGearArray = dictAbilityDIBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearAbilityDI = firstGearArray[firstHeroGearLvl];
        		if (isNaN(firstGearAbilityDI)) {
        			firstGearAbilityDI = 0;
        		}
    		}
      		secondGearArray = dictAbilityDIBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearAbilityDI = secondGearArray[secondHeroGearLvl];
        		if (isNaN(secondGearAbilityDI)) {
        			secondGearAbilityDI = 0;
        		}
    		}
    		// If the ability is used, calculate the ability DPS
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					// Assuming that DI increases are additive. If they're not, I'll have to tweak it to use max
					abilityDPS *= (100 + firstGearAbilityDI + secondGearAbilityDI) / 100;
				}
			}
			// Now take the max of both
			var buffedDPS = Math.max(rageDPS, abilityDPS);
			
			// Add attack speed increases from hero equipment
			// Normal abilities are currently not supported, however
			// This acts on attack frequency, but can be directly multiplied in (see reasoning below for debuffs)
			var firstGearASBoost = 0;
			var secondGearASBoost = 0;
			
			var firstGearASArray = dictASBonus[firstHeroGearName];
			if (firstGearASArray != undefined) {
    			firstGearASBoost = firstGearASArray[firstHeroGearLvl];
        		if (isNaN(firstGearASBoost)) {
        			firstGearASBoost = 0;
        		}
    		}
			var secondGearASArray = dictASBonus[secondHeroGearName];
			if (secondGearASArray != undefined) {
    			secondGearASBoost = secondGearASArray[secondHeroGearLvl];
        		if (isNaN(secondGearASBoost)) {
        			secondGearASBoost = 0;
        		}
    		}
    		buffedDPS *= (100 + firstGearASBoost + secondGearASBoost) / 100;
			// Now poison and freeze work on attack frequency but since DPS is proportional to attack frequency, they can be applied here all the same
			var poisonMultiplier = (100 - poisonASMultiplier[poisonSpellLevel])/100;
			var THpoisonMultiplier = 1;
			if (THpoisonSpellLevel > 0) {
				THpoisonMultiplier = (15 - THpoisonSpellLevel)/20;
			}
			var poisonTowerMultiplier = 1;
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
                poisonTowerMultiplier = 75/100;
            	}
			}
			if ($(this).hasClass("Building") === false) {
				if (Math.min(poisonMultiplier,THpoisonMultiplier,poisonTowerMultiplier) < 1) {
					poisonUsed = true;
				}
				buffedDPS *= Math.min(poisonMultiplier,THpoisonMultiplier,poisonTowerMultiplier);
			}
			var freezeMultiplier = 1;
			var frostMultiplier = 1;
			if (frostPotency > 0) {
				frostMultiplier = (100 - frostPotency)/100;
			}
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
					freezeMultiplier = 0.5;
				}
			}
			if (Math.min(frostMultiplier, freezeMultiplier) < 1) {
				frostUsed = true;
			}
			buffedDPS *= Math.min(frostMultiplier, freezeMultiplier);
			var finalDPS = buffedDPS.toFixed(3) * 1;
			$(this).text(finalDPS.format("#,##0[.]###"));
			if (initialDPS === finalDPS) {
				$(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
			}
			if (poisonUsed && $(this).hasClass("Building") === false) {
                $(this).addClass("StatPoisoned");
            } else {
                $(this).removeClass("StatPoisoned");
            }
            if (frostUsed) {
                $(this).addClass("StatFrozen");
            } else {
                $(this).removeClass("StatFrozen");
            }
		});
		$(".HP").each(function() {
			var initialHP = $(this).attr("title") * 1;
			var baseHP = initialHP;
			// First modify the initial HP via hero equipment
			
			var firstGearHP = 0;
			var secondGearHP = 0;
			
			var firstGearHPArray = dictHPBonus[firstHeroGearName];
    		if (firstGearHPArray != undefined) {
    			firstGearHP = firstGearHPArray[firstHeroGearLvl];
        		if (isNaN(firstGearHP)) {
        			firstGearHP = 0;
        		}
    		}
      		secondGearHPArray = dictHPBonus[secondHeroGearName];
    		if (secondGearHPArray != undefined) {
    			secondGearHP = secondGearHPArray[secondHeroGearLvl];
        		if (isNaN(secondGearHP)) {
        			secondGearHP = 0;
        		}
    		}
    		baseHP = initialHP + firstGearHP + secondGearHP;
			
			var auraLevel = $("#lifeAuraLevel").val() * 1;
			var apprenticeLevel = $("#apprenticeAuraLevel").val() * 1;
			var auraPercent = auraPercentIncrease[auraLevel];
			if (isNaN(auraPercent) === true) {
			    auraPercent = 0;
			}
			var auraMaxHP = auraMaxHPIncrease[auraLevel];
			if (isNaN(auraMaxHP) === true) {
			    auraMaxHP = 0;
			}
			var apprenticePercent = apprenticeAuraPercentIncrease[apprenticeLevel];
			if (isNaN(apprenticePercent) === true) {
				apprenticePercent = 0;
			}
			var calcPercentHP = baseHP * (1000 + auraPercent)/1000;
			var calcMaxHP = baseHP + auraMaxHP;
			var calcWardenHP = Math.min(calcPercentHP,calcMaxHP);
			var calcApprenticeHP = baseHP * (1000 + apprenticePercent)/1000;
			var calcNewHP = Math.max(calcWardenHP,calcApprenticeHP);
			var roundedHP = Math.floor(calcNewHP * 100)/100; //Use floor function to round down to 2 d.p., since the game does this
			$(this).text(roundedHP.format("#,##0[.]###"));
			if (initialHP === roundedHP) {
                $(this).removeClass("StatModifiedGP");
            } else {
                $(this).addClass("StatModifiedGP");
            }
		});
		$(".HPRecovery").each(function() {
			var initialHPRec = $(this).attr("title") * 1;
			// This stat is currently only modified by hero equipment
			var firstGearHPRec = 0;
			var secondGearHPRec = 0;
			
			var firstGearHPArray = dictHPRecoveryBonus[firstHeroGearName];
    		if (firstGearHPArray != undefined) {
    			firstGearHPRec = firstGearHPArray[firstHeroGearLvl];
        		if (isNaN(firstGearHPRec)) {
        			firstGearHPRec = 0;
        		}
    		}
      		secondGearHPArray = dictHPRecoveryBonus[secondHeroGearName];
    		if (secondGearHPArray != undefined) {
    			secondGearHPRec = secondGearHPArray[secondHeroGearLvl];
        		if (isNaN(secondGearHPRec)) {
        			secondGearHPRec = 0;
        		}
    		}
    		var finalHPRec = initialHPRec + firstGearHPRec + secondGearHPRec;
    		$(this).text(finalHPRec.format("#,##0[.]###"));
			if (initialHPRec === finalHPRec) {
                $(this).removeClass("StatModifiedGP");
            } else {
                $(this).addClass("StatModifiedGP");
            }
		});
		$(".Speed").each(function() {
			// Flags for CSS styling
			var poisonUsed = false;
			var frostUsed = false;
			
			var initialSpeed = $(this).attr("title") * 1;
			var baseSpeed = initialSpeed;
			
			var firstGearAbilitySpeed = 0;
			var secondGearAbilitySpeed = 0;
			// Set the base speed via hero equipment (currently only supports the use in ability)
			var firstGearArray = dictAbilitySpeedBonus[firstHeroGearName];
    		if (firstGearArray != undefined) {
    			firstGearAbilitySpeed = firstGearArray[firstHeroGearLvl] / 10;
        		if (isNaN(firstGearAbilitySpeed)) {
        			firstGearAbilitySpeed = 0;
        		}
    		}
      		var secondGearArray = dictAbilitySpeedBonus[secondHeroGearName];
    		if (secondGearArray != undefined) {
    			secondGearAbilitySpeed = secondGearArray[secondHeroGearLvl] / 10;
        		if (isNaN(secondGearAbilitySpeed)) {
        			secondGearAbilitySpeed = 0;
        		}
    		}
    		var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					/* Unlike other buffs, ability speed sets the base movement speed
					 I am assuming that they do not stack and that the best one is used instead
					 And if neither gear gives speed, then use the initial speed */
					baseSpeed = Math.max(firstGearAbilitySpeed, secondGearAbilitySpeed, initialSpeed);
				}
			}
			
			var rageSpellLevel = $("#rageSpellLevel").val() * 1;
			var valkRageCheckBox = document.getElementById("valkRageBoost");
			if (isNaN(rageSpellLevel) === true) {
		    	rageSpellLevel = 0;
		    }
		    // Set the rage level to 4 if using Super Valkyrie Rage checkbox
		    if (valkRageCheckBox != null) {
				if (valkRageCheckBox.checked === true) {
					rageSpellLevel = 4;
				}
		    }
		    var capitalRageSpellLevel = $("#capitalRageSpellLevel").val() * 1;
			if (isNaN(capitalRageSpellLevel) === true) {
		    	capitalRageSpellLevel = 0;
		    } 
			var hasteSpellLevel = $("#hasteSpellLevel").val() * 1;
			if (isNaN(rageSpellLevel) === true) {
		    	hasteSpellLevel = 0;
		    }
		    var capitalHasteSpellLevel = $("#capitalHasteSpellLevel").val() * 1;
		    if (isNaN(capitalHasteSpellLevel) === true) {
		    	capitalHasteSpellLevel = 0;
		    }
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
		    var HHpoisonSpellLevel = $("#HHpoisonSpellLevel").val() * 1;
		    if (isNaN(HHpoisonSpellLevel) === true) {
		    	HHpoisonSpellLevel = 0;
		    }
		    /* Set the poison spell level to headhunter lv + 4 if HH level is nonzero
		    There should be no conflict because HH level is attack-only while Poison level is defense-only */
		    if (HHpoisonSpellLevel > 0) {
		    	poisonSpellLevel = HHpoisonSpellLevel + 4;
		    }
		    var frostPotency = $("#frostPotencyLevel").val() * 1;
		    if (isNaN(frostPotency) === true) {
		    	frostPotency = 0;
		    }
		    // Hero ability check box is already defined and used above
			var normalAbilityCheckBox = document.getElementById("normalAbilityBoost");
			var freezeCheckBox = document.getElementById("freezeBoost");
			var rageTowerCheckBox = document.getElementById("rageTowerBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			var rageBoost = 0;
			var hasteBoost = 0;
			var towerRageBoost = 0;
			if (rageSpellLevel > 0) {
				if ($(this).hasClass("Building") === true) {
					rageBoost = 0;
				} else if ($(this).hasClass("Hero") == true) {
                    rageBoost = rageSpellLevel + 9;
                } else {
                    rageBoost = (2 * rageSpellLevel) + 18;
                }
            } else if (capitalRageSpellLevel > 0) {
            	rageBoost = (2 * capitalRageSpellLevel) + 8;
            }
            if (rageTowerCheckBox != null) {
				if (rageTowerCheckBox.checked === true) { // No speed boost when you're a statue (can't move)
					if ($(this).hasClass("Statue") === true) {
						rageBoost = 0;
					} else if ($(this).hasClass("Hero") == true) {
						towerRageBoost = 15;
					} else {
						towerRageBoost = 30;
					}
				}
			}
			if (hasteSpellLevel > 0) {
                if ($(this).hasClass("Hero") == true) {
                    hasteBoost = (3 * hasteSpellLevel) + 11;
                } else {
                    hasteBoost = (6 * hasteSpellLevel) + 22;
                }
            } else if (capitalHasteSpellLevel > 0) {
            	hasteBoost = capitalHasteSpellLevel + 6;
            }
            /* We will need to multiply and divide by 10 since ability speed is written in tenths,
            	to avoid floating-point errors */
            var rageSpeed = (baseSpeed * 10 + Math.max(rageBoost,towerRageBoost) * 10) / 10;
			var hasteSpeed = (baseSpeed * 10 + hasteBoost * 10) / 10;
			
			var abilityBoost = $(".AbilitySpeed").attr("title") * 1;
			if (isNaN(abilityBoost) === true) {
				abilityBoost = 0;
			}
			
			var abilitySpeed = baseSpeed;
			if (normalAbilityCheckBox != null) {
				if (normalAbilityCheckBox.checked === true) {
					abilitySpeed = (baseSpeed * 10 + abilityBoost * 10) / 10;
				}
			}
			var buffedSpeed = Math.max(rageSpeed, hasteSpeed, abilitySpeed);
			
			// That's all the speed buffs. Now on to the speed de-buffs (which thankfully don't conflict)
			// However, poison's speed decrease isn't linear. So we have to rely on a small lookup
			var poisonSpeedDebuff = [0,26,30,34,38,40,42,44,46,48,50];
			// Also a small lookup for TH poison
			var THpoisonSpeedDebuff = [0,30,35,40,45,50];
			var poisonTowerDebuff = 0;
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
                poisonTowerDebuff = 35;
            	}
			}
			var poisonDebuff = Math.max(poisonSpeedDebuff[poisonSpellLevel],THpoisonSpeedDebuff[THpoisonSpellLevel],poisonTowerDebuff);
			poisonUsed = (poisonDebuff > 0);
			
			buffedSpeed = buffedSpeed * (100 - poisonDebuff) /100;
			
			var freezeDebuff = 0;
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true) {
					freezeDebuff = 50;
				}
			}
			// We can use frost potency directly
			if ($(this).hasClass("Builder") === false) {
				buffedSpeed = buffedSpeed * (100 - Math.max(freezeDebuff, frostPotency)) / 100;
				frostUsed = (Math.max(freezeDebuff, frostPotency) > 0);
			}
			
			$(this).text(buffedSpeed.format("#,##0[.]###"));
			if (buffedSpeed === initialSpeed) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
			if (poisonUsed) {
                $(this).addClass("StatPoisoned");
            } else {
                $(this).removeClass("StatPoisoned");
            }
            if (frostUsed) {
                $(this).addClass("StatFrozen");
            } else {
                $(this).removeClass("StatFrozen");
            }
		});
		$(".AttackType").each(function() {
			// Work with strings
			var initialAttackType = $(this).attr("title");
			var finalAttackType = initialAttackType;
			// This stat is currently only modified by hero equipment, and during a hero ability
			var firstGearAttackType = "";
			var secondGearAttackType = "";
			
			var firstGearAtkArray = dictAttackTypeText[firstHeroGearName];
    		if (firstGearAtkArray != undefined) {
    			firstGearAttackType = firstGearAtkArray[firstHeroGearLvl];
        		if (firstGearAttackType === undefined) {
        			firstGearAttackType = "";
        		}
    		}
      		secondGearAtkArray = dictAttackTypeText[secondHeroGearName];
    		if (secondGearAtkArray != undefined) {
    			secondGearAttackType = secondGearAtkArray[secondHeroGearLvl];
        		if (firstGearAttackType === undefined) {
        			secondGearAttackType = "";
        		}
    		}
    		/* Since there's only one gear that modifies attack type, I will not consider what happens when both try to stack (for now)
    		Additionally, this attack type only appears during hero ability */
    		var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
    				if (firstGearAttackType.length > 0) {
    					finalAttackType = firstGearAttackType;
    				} else if (secondGearAttackType.length > 0) {
    					finalAttackType = secondGearAttackType;
    				}
				}
    		}
    		$(this).text(finalAttackType.trim());
    		if (initialAttackType.trim() === finalAttackType.trim()) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
		});
		//Add a look-up array for wall HTK. Also define two variables to be used inside the loop here, and reset them afterwards
		var wallHP = [300,500,700,900,1400,2000,2500,3000,3500,4000,5000,7000,9000,11000,12500,13500,14500];
		var currentWallLevel = 0;
		var currentWBLevel = 0;
		$(".HTK").each(function() {
            var initialHTK = $(this).attr("title") * 1;
            var currentWallHP = wallHP[currentWallLevel];
            var currentWallDamage = wallDamageArray[currentWBLevel];
            if (deathDamageArray.length > 0) {
				var deathWallDamage = deathDamageArray[currentWBLevel];
			} else {
				var deathWallDamage = 0;
			}
            var newHTK = Math.ceil(currentWallHP/(currentWallDamage+deathWallDamage));
            // Do not change the entries if there are no damage values listed in the arrays
            if (isNaN(newHTK) === false) {
				$(this).text(newHTK);
            	if (newHTK === initialHTK) {
                	$(this).removeClass("StatModified");
            	} else {
                	$(this).addClass("StatModified");
            	}
			}
            if (currentWallLevel === wallHP.length - 1) {
                currentWallLevel = 0;
                currentWBLevel++;
            } else {
                currentWallLevel++;
            }
        });
		currentWallLevel = 0;
		currentWBLevel = 0;
		// Function to handle percentage damage (used by Monolith)
		function calcPercentDamage(HP,percent) {
			if (isNaN(HP) || !HP || HP < 0) return -1;
			return Math.floor(HP * percent) / 100;
		}
		$(".ModifierPercent").each(function() {
			var percentDamage = $(this).attr("title").replace(/%/g,"") * 1;
			if (isNaN(percentDamage)) {
				percentDamage = 0;
			}
			var HP = parseFloat(document.getElementById("targetHP").value);
			var calcDamage = calcPercentDamage(HP,percentDamage);
			if (calcDamage === -1) {
				$(this).text($(this).attr("title"));
				$(this).removeClass("StatMonolith-1");
				$(this).removeClass("StatMonolith-2");
				$(this).removeClass("StatMonolith-3");
			} else {
				$(this).text(calcDamage.format("#,##0[.]###"));
				// Cosmetic change to color of text depending on shot color (this depends on the Monolith's target's max HP)
				if (HP >= 2000) {
					$(this).addClass("StatMonolith-3");
					$(this).removeClass("StatMonolith-1");
					$(this).removeClass("StatMonolith-2");
				} else if (HP >= 600) {
					$(this).addClass("StatMonolith-2");
					$(this).removeClass("StatMonolith-1");
					$(this).removeClass("StatMonolith-3");
				} else {
					$(this).addClass("StatMonolith-1");
					$(this).removeClass("StatMonolith-2");
					$(this).removeClass("StatMonolith-3");					
				}
			}
		});
    });
    // Reset form when Reset button is clicked
    $("#resetBonusButton").click(function() {
        $("#changeBonusButton").text("Apply");
		$("#builderBoost, #trainingBoost, #researchBoost, #rageSpellLevel, #capitalRageSpellLevel, #lifeAuraLevel, #rageAuraLevel, #poisonSpellLevel, #THpoisonSpellLevel, #HHpoisonSpellLevel, #hasteSpellLevel, #capitalHasteSpellLevel, #targetHP, #apprenticeAuraLevel, #frostPotencyLevel, #eventBuilderBoost, #eventTrainingBoost, #eventResearchBoost").val("0").change();
		$("#heroGearToggle, #hammerJamBoost, #autoForgeBoost, #armyBoost, #freezeBoost, #heroAbilityBoost, #normalAbilityBoost, #rageTowerBoost, #valkRageBoost, #poisonTowerBoost").prop("checked",false);
		// Reinitialise the choices
		$("select#modifierMode").val("Attack").change();
    	// Only toggle modifier mode if it is on the page
    	if ($("select#modifierMode").val() != undefined) {
    		toggleModifierMode();
    	}
		// Reset hero gear
		refreshHeroGear();
        $("#heroGearHarness, #heroAbilityHarness").css("display","none");
        /* Experiment with a more concise toggle reset function (above)
		if (document.getElementById("hammerJamBoost") != null) {
			document.getElementById("hammerJamBoost").checked = false;
		}
		if (document.getElementById("autoForgeBoost") != null) {
			document.getElementById("autoForgeBoost").checked = false;
		}
		if (document.getElementById("armyBoost") != null) {
			document.getElementById("armyBoost").checked = false;
		}
		if (document.getElementById("freezeBoost") != null) {
            document.getElementById("freezeBoost").checked = false;
        }
		if (document.getElementById("heroAbilityBoost") != null) {
            document.getElementById("heroAbilityBoost").checked = false;
        }
		if (document.getElementById("normalAbilityBoost") != null) {
            document.getElementById("normalAbilityBoost").checked = false;
        }
        if (document.getElementById("rageTowerBoost") != null) {
            document.getElementById("rageTowerBoost").checked = false;
        }
        if (document.getElementById("valkRageBoost") != null) {
            document.getElementById("valkRageBoost").checked = false;
        }
        if (document.getElementById("poisonTowerBoost") != null) {
            document.getElementById("poisonTowerBoost").checked = false;
        } */
		$(".GoldPass").each(function() {
			var returnInitial = $(this).attr("title");
			$(this).text(returnInitial);
			$(this).removeClass("StatModifiedGP");
			$(this).removeClass("StatGemBoosted");
		});
		$(".AttackSpeed").each(function() {
			var returnInitial = $(this).attr("title");
			$(this).text(returnInitial + "s");
			$(this).removeClass("StatModified");
			$(this).removeClass("StatFrozen");
            $(this).removeClass("StatPoisoned");
		});
		$(".AttackType").each(function() {
			var returnInitial = $(this).attr("title");
			$(this).text(returnInitial);
			$(this).removeClass("StatModified");
		});
		$(".ModifierStat").each(function() {
            var returnInitial = $(this).attr("title") * 1;
            $(this).text(returnInitial.format("#,##0[.]###"));
            $(this).removeClass("StatModified");
			$(this).removeClass("StatModifiedGP");
			$(this).removeClass("StatFrozen");
			$(this).removeClass("StatPoisoned");
        });
        $(".ModifierRange").each(function() {
            var returnInitial = readRange($(this).attr("title"));
            for (x in returnInitial) {
            	returnInitial[x] = returnInitial[x] * 1;
            }
            var reformatRange = returnInitial[0].format("#,##0[.]###") + "-" + returnInitial[1].format("#,##0[.]###");
            $(this).text(reformatRange);
            $(this).removeClass("StatModified");
			$(this).removeClass("StatModifiedGP");
			$(this).removeClass("StatFrozen");
			$(this).removeClass("StatPoisoned");
        });
        $(".ModifierPercent").each(function () {
        	var returnInitial = $(this).attr("title");
        	$(this).text(returnInitial);
        	$(this).removeClass("StatMonolith-1");
        	$(this).removeClass("StatMonolith-2");
        	$(this).removeClass("StatMonolith-3");
        });
    });
});