/* Any JavaScript here will be loaded for all users on every page load. */
// Adapted from King Dragonhoff's StatueStats javascript
$(document).ready(function() {
    /* Create inputs */
	$("span#builderBoostHarness").html('<div id="builderBoostInput">Builder Boost: <select name="builderBoost" id="builderBoost"> <option value="0">0</option> <option value="5">5</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> </select> %</div>');
	$("span#hammerJamHarness").html('<div id="hammerJamInput">Toggle Hammer Jam? <input type="checkbox" name="hammerJamBoost" id="hammerJamBoost"></input></div>');
	$("span#autoForgeHarness").html('<div id="autoForgeInput">Toggle Auto Forge Prices? <input type="checkbox" name="autoForgeBoost" id="autoForgeBoost"></input></div>');
	$("span#trainingBoostHarness").html('<div id="trainingBoostInput">Training Boost: <select name="trainingBoost" id="trainingBoost"> <option value="0">0</option> <option value="5">5</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="30">30</option> </select> %</div>');
	$("span#researchBoostHarness").html('<div id="researchBoostInput">Research Boost: <select name="researchBoost" id="researchBoost"> <option value="0">0</option> <option value="5">5</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="30">30</option> </select> %</div>');
	$("span#armyBoostHarness").html('<div id="armyBoostInput">Toggle Army Boost? <input type="checkbox" name="armyBoost" id="armyBoost"></input></div>');
	$("span#freezeHarness").html('<div id="freezeInput">Toggle Frost? <input type="checkbox" name="freezeBoost" id="freezeBoost"></input></div>');
	$("span#frostPotencyHarness").html('<div id="frostPotencyInput">Frost Potency: '+
		'<select name="frostPotencyLevel" id="frostPotencyLevel">'+
			'<option value="0">0</option>'+
			'<option value="20">20</option>'+
			'<option value="25">25</option>'+
			'<option value="30">30</option>'+
			'<option value="35">35</option>'+
			'<option value="37">37</option>'+
			'<option value="40">40</option>'+
			'<option value="45">45</option>'+
			'<option value="50">50</option>'+
			'<option value="55">55</option>'+
			'<option value="60">60</option>'+
			'<option value="65">65</option>'+
			//'<option value="70">70</option>'+ No longer used as of Sep 2024 balance changes
			//'<option value="75">75</option>'+
		'</select> %</div>');
	$("span#normalAbilityHarness").html('<div id="normalAbilityInput">Toggle Ability? <input type="checkbox" name="normalAbilityBoost" id="normalAbilityBoost"></input></div>');
	$("span#heroAbilityHarness").html('<div id="heroAbilityInput">Toggle Hero Ability? <input type="checkbox" name="heroAbilityBoost" id="heroAbilityBoost"></input></div>');
	$("span#rageSpellHarness").html('<div id="rageSpellInput">Rage Spell Level: <select name="rageSpellLevel" id="rageSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> </select></div>');
	$("span#capitalRageSpellHarness").html('<div id="capitalRageSpellInput">Rage Spell Level: <select name="capitalRageSpellLevel" id="capitalRageSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#rageTowerHarness").html('<div id="rageTowerInput">Toggle Rage Spell Tower? <input type="checkbox" name="rageTowerBoost" id="rageTowerBoost"></input></div>');
	$("span#poisonTowerHarness").html('<div id="poisonTowerInput">Toggle Poison Spell Tower? <input type="checkbox" name="poisonTowerBoost" id="poisonTowerBoost"></input></div>');
	$("span#valkRageHarness").html('<div id="valkRageInput">Toggle Super Valkyrie Rage? <input type="checkbox" name="valkRageBoost" id="valkRageBoost"></input></div>');
	$("span#hasteSpellHarness").html('<div id="hasteSpellInput">Haste Spell Level: <select name="hasteSpellLevel" id="hasteSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option></select></div>');
	$("span#capitalHasteSpellHarness").html('<div id="capitalHasteSpellInput">Endless Haste Spell Level: <select name="capitalHasteSpellLevel" id="capitalHasteSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select></div>');
	$("span#poisonSpellHarness").html('<div id="poisonSpellInput">Poison Spell Level: <select name="poisonSpellLevel" id="poisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option></select></div>');
	$("span#THpoisonSpellHarness").html('<div id="THpoisonSpellInput">TH Poison Spell Level: <select name="THpoisonSpellLevel" id="THpoisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#HHpoisonSpellHarness").html('<div id="HHpoisonSpellInput">Headhunter Poison Level: <select name="HHpoisonSpellLevel" id="HHpoisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select></div>');
	// GW Life Gem: Keep the name "Life Aura" for legacy purposes (i.e. don't break the name)
	$("span#lifeAuraHarness").html('<div id="lifeAuraInput">Life Gem Level: <select name="lifeAuraLevel" id="lifeAuraLevel"> <option value="0">0</option> <option value="1">1-2</option> <option value="2">3-5</option> <option value="3">6-8</option> <option value="4">9-11</option> <option value="5">12-14</option> <option value="6">15-17</option> <option value="7">18</option> </select></div>');
	$("span#rageAuraHarness").html('<div id="rageAuraInput">Rage Gem Level: <select name="rageAuraLevel" id="rageAuraLevel"> <option value="0">0</option> <option value="1">1-2</option> <option value="2">3-5</option> <option value="3">6-8</option> <option value="4">9-11</option> <option value="5">12-14</option> <option value="6">15-17</option> <option value="7">18</option> </select></div>');
	$("span#torchAuraHarness").html('<div id="torchAuraInput">Heroic Torch Level: <select name="torchAuraLevel" id="torchAuraLevel"> <option value="0">0</option> <option value="1">1-2</option> <option value="2">3-5</option> <option value="3">6-8</option> <option value="4">9-11</option> <option value="5">12-14</option> <option value="6">15-17</option> <option value="7">18-20</option> <option value="8">21-23</option> <option value="9">24-26</option> <option value="10">27</option></select></div>');
	$("span#targetHPHarness").html('<div id="targetHPInput">Target Max HP: <input type="text" value="0" id="targetHP" style="text-align: right; width: 55px; background-color:white;"></input></div>');
	// $("span#hardModeHarness").html('<div id="hardModeInput">Toggle Hard Mode? <input type="checkbox" name="hardModeBoost" id="hardModeBoost"></input></div>');	Superseded by the new difficulty modifier
	$("span#difficultyModeHarness").html('<div id="difficultyModeInput">Difficulty Modifier: <select name="difficultyModeBoost" id="difficultyModeBoost">' +
		'<option value="0">None</option>' +
	    '<option value="1">Expert</option>' +
	    '<option value="2">Master</option>' +
	    '<option value="3">Legend</option>' +
	    '<option value="4">Esports</option>' +
		'</select></div>');
	$("span#apprenticeAuraHarness").html('<div id="apprenticeAuraInput">Apprentice Warden Aura Level: <select name="apprenticeAuraLevel" id="apprenticeAuraLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option></select></div>');
	$("span#resourceBoostHarness").html('<div id="resourceBoostInput">Toggle Gem Boost? <input type="checkbox" name="resourceBoost" id="resourceBoost"></input></div>');
	$("span#clockTowerBoostHarness").html('<div id="clockBoostInput">Toggle Clock Tower Boost? <input type="checkbox" name="clockBoost" id="clockBoost"></input></div>');
	/* Event boosts: change the options as appropriate for the event
	Last event: Anime Clash */
	$("span#eventBuilderBoostHarness").html('<div id="eventBuilderBoostInput" style="display:none;">Builder Boost: <select name="eventBuilderBoost" id="eventBuilderBoost">' +
		'<option value="0">0</option>' +
		'<option value="5">5</option>' +
		'<option value="10">10</option>' +
		'</select> %</div>');
	$("span#eventResearchBoostHarness").html('<div id="eventResearchBoostInput" style="display:none;">Research Boost: <select name="eventResearchBoost" id="eventResearchBoost">' +
		'<option value="0">0</option>' +
		'<option value="5">5</option>' +
		'<option value="10">10</option>' +
		'</select> %</div>');
	$("span#eventTrainingBoostHarness").html('<div id="eventTrainingBoostInput">Training Boost: <select name="eventTrainingBoost" id="eventTrainingBoost">' +
		'<option value="0">0</option>' + 
		'<option value="15">15</option>' +
		'<option value="30">30</option>' +
		// '<option value="50">50</option>' +
		'</select> %</div>');
	$("span#starBonusHarness").html('<div id="starBonusInput"">Star Bonus Multiplier: <select name="starBonusBoost" id="starBonusBoost">' +
		'<option value="1">1</option>' +
		'<option value="2">2</option>' +
		'<option value="3">3</option>' +
		'<option value="4">4</option>' +
		'<option value="5">5</option>' +
		'</select> x</div>');
	$("span#leagueBonusHarness").html('<div id="leagueBonusInput"">League Bonus Boost: <select name="leagueBonusBoost" id="leagueBonusBoost">' +
		'<option value="0">0</option>' +
		'<option value="10">10</option>' +
		'<option value="20">20</option>' +
		'<option value="35">35</option>' +
		'<option value="50">50</option>' +
		'<option value="70">70</option>' +
		'<option value="100">100</option>' +
		'</select> %</div>');
	$("span#eventShowcaseBoostHarness").html('<div id="eventShowcaseInput">Toggle Showcase Boost? <input type="checkbox" name="eventShowcaseBoost" id="eventShowcaseBoost"></input></div>');
	$("span#modifierModeHarness").html('<div id="modifierModeToggle">Modifier Mode: '+
		'<select name="modifierMode" id="modifierMode">'+
   			'<option value="Attack">Attack</option>'+
    		'<option value="Defense">Defense</option>'+
		'</select></div>');
	// Hero gear boosts
	$("span#heroGearToggleHarness").html('<div id="heroGearEnableToggle">Enable Hero Equipment? <input type="checkbox" name="heroGearToggle" id="heroGearToggle"></input></div>');
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
    	'</div></td>' +
    	'<td><div id="firstHeroGearEffLvlInfo" style="display:none; cursor:help;">&#9432;</div></td></tr>' +
    	'<tr><td><div id="secondHeroGear">' +
    		'<div id="secondHeroGearOption"> Equipment 2: ' +
        	'<select name="secondHeroGearChoice" id="secondHeroGearChoice">' +
        	'</select></div>' +
    	'</div></td>' +
		'<td><div id="secondHeroGearLevel">' +
    		'<div id="secondHeroGearLvl"> Level: ' +
        	'<select name="secondHeroGearLevel" id="secondHeroGearLevel">' +
    	    '</select></div>' +
    	'</div></td>' +
    	'<td><div id="secondHeroGearEffLvlInfo" style="display:none; cursor:help;">&#9432;</div></td></tr>' +
    	'<tr><td><span id="darkCrownHarness"></span></td></tr>' +
	'</table></div>');
	// Equipment-specific modifiers
	$("span#darkCrownHarness").html('<div id="darkCrownInput" style="display:none;">Dark Crown Stacks: <select name="darkCrownStackLevel" id="darkCrownStackLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select></div>');
    /* Get the initial cell values, remove commas, and 
       set the cell's title attribute to its original value. */
   // Auxillary array for wall HTKs
   var deathDamageArray = [];
   // Variable for reading the correct level cap for normal/hard mode
   var hmCapEnabled = 0;
    /* Auxillary functions to refresh the level options for the choices
    Call on initialisation and whenever the choice is amended */
    function refreshFirstGearChoices() {
    	var firstGearName = $("select#firstHeroGearChoice option:selected").text();
    	if (dictEquipment[firstGearName] != undefined) {
    		var levelCap = dictEquipment[firstGearName].level;
    		if (levelCap == undefined) {
    			levelCap = 0;
    		}
    	}
        var firstLevelChoices = $("select#firstHeroGearLevel");
        var currentChoice = firstLevelChoices.val();
    	firstLevelChoices.empty();
    	for (i = 0; i < levelCap; i++) {
    		firstLevelChoices.append($("<option></option>").attr("value",i).text(i+1));
    	}
    	// Hide the level if there is only one level available
        if (levelCap == 1) {
        	$("#firstHeroGearLvl").css("display","none");
        } else {
        	$("#firstHeroGearLvl").css("display","block");
        	/* If refreshed from hard mode, initialise the selection to the currently selected level,
        	or to the new level cap if that is lower. Note that level cap's actual value is one less than displayed level
        	
        	Currently deprecated so no longer in use
        	
        	if (hmRefresh === true) {
        		if (currentChoice < levelCap) {
        			firstLevelChoices.prop('selectedIndex', currentChoice);
        		} else {
        			firstLevelChoices.prop('selectedIndex', levelCap - 1);
        		}
        	} */
        }
        // Check the special choices
        checkSpecialChoices();
    }
    function refreshSecondGearChoices() {
    	var secondGearName = $("select#secondHeroGearChoice option:selected").text();
    	if (dictEquipment[secondGearName] != undefined) {
    		var levelCap = dictEquipment[secondGearName].level;
    		if (levelCap == undefined) {
    			levelCap = 0;
    		}
    	}
        var secondLevelChoices = $("select#secondHeroGearLevel");
        var currentChoice = secondLevelChoices.val();
    	secondLevelChoices.empty();
    	for (i = 0; i < levelCap; i++) {
    		secondLevelChoices.append($("<option></option>").attr("value",i).text(i+1));
    	}
        // Hide the level if there is only one level available
        if (levelCap == 1) {
        	$("#secondHeroGearLvl").css("display","none");
        } else {
        	$("#secondHeroGearLvl").css("display","block");
        	/* If refreshed from hard mode, initialise the selection to the currently selected level,
        	or to the new level cap if that is lower. Note that level cap's actual value is one less than displayed level
        	if (hmRefresh === true) {
        		if (currentChoice < levelCap) {
        			secondLevelChoices.prop('selectedIndex', currentChoice);
        		} else {
        			secondLevelChoices.prop('selectedIndex', levelCap - 1);
        		}
        	} */
        }
        // Check the special choices
        checkSpecialChoices();
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
    function checkSpecialChoices(){
    	// A function to check for specific Hero Equipment selections ("special choices")
        // Start by recording the selections
        var firstGearName = $("select#firstHeroGearChoice option:selected").text();
        var secondGearName = $("select#secondHeroGearChoice option:selected").text();
        
        // Now compare these against the special choices
        if (checkIsSpecialChoiceSelected(firstGearName,secondGearName,"Dark Crown")) {
        	$("div#darkCrownInput").css("display","block");
        } else {
        	$("div#darkCrownInput").css("display","none");
            // Also reset the value to 0
            $("select#darkCrownStackLevel option[value=0]").prop('selected',true);
        }
    }
    function checkIsSpecialChoiceSelected(firstGear, secondGear, choiceName) {
    	// Always return false if hero gear toggle is false
        if ($("input#heroGearToggle").is(":checked") === false) {
        	return false;
        }
        if (firstGear === choiceName || secondGear === choiceName) {
        	return true;
        }
        return false;
    }
    function toggleModifierMode() {
      	//Change the visibility of various items depending on the mode selected
        //If an item is to be made invisible, also reset it to its initial value
        var mode = $("select#modifierMode").val();
        if (mode == "Attack") {
        	// Reset the values of defense-only items
            $("#rageTowerBoost, #valkRageBoost").prop("checked",false);
            $("#poisonSpellLevel, #frostPotencyLevel").val("0").change();
        	// Disable defense-only items
        	$("#rageTowerHarness, #poisonSpellHarness, #valkRageHarness, #frostPotencyHarness, #defenseModsOnly").css("display","none");
            // Enable all disabled items (except for hero gear inputs and hero ability toggle)
            $("#rageSpellHarness, #capitalRageSpellHarness, #hasteSpellHarness, #capitalHasteSpellHarness, #THpoisonSpellHarness, #HHpoisonSpellHarness, #poisonTowerHarness, #lifeAuraHarness, #rageAuraHarness, #torchAuraHarness, #heroGearToggleHarness, #offenseModsOnly").css("display","block");
            // Re-initialize hero gear options
            refreshHeroGear();
        } else {
        	// Reset the values of offense-only items
            $("#rageSpellLevel, #capitalRageSpellLevel, #hasteSpellLevel, #capitalHasteSpellLevel, #THpoisonSpellLevel, #HHpoisonSpellLevel, #lifeAuraLevel, #rageAuraLevel, #torchAuraLevel").val("0").change();
        	$("#poisonTowerBoost, #heroAbilityBoost, #heroGearToggle").prop("checked",false);
        	// Disable offense-only items
            $("#rageSpellHarness, #capitalRageSpellHarness, #hasteSpellHarness, #capitalHasteSpellHarness, #THpoisonSpellHarness, #HHpoisonSpellHarness, #poisonTowerHarness, #heroAbilityHarness, #lifeAuraHarness, #rageAuraHarness, #torchAuraHarness, #heroGearToggleHarness, #heroGearHarness, #offenseModsOnly").css("display","none");
            // Enable all disabled items
            $("#rageTowerHarness, #poisonSpellHarness, #valkRageHarness, #frostPotencyHarness, #defenseModsOnly").css("display","block");
        }
    }
    function refreshHeroGear() {
		initChoices();
	    refreshFirstGearChoices();
	    refreshSecondGearChoices();
    }
    function getSpecialChoiceLevel(choice) {
    	// Returns the value corresponding to the level selected
    	// If no gear is selected, return -1 (0 is reserved for the first level)
    	if ($("input#heroGearToggle").val() === undefined) {
    		return -1;
    	}
    	if ($("input#heroGearToggle").is(":checked") === false) {
        	return -1;
        }
        // Look through the two equipments
        if ($("select#firstHeroGearChoice option:selected").text() === choice) {
        	return $("select#firstHeroGearLevel").val();
        } else if ($("select#secondHeroGearChoice option:selected").text() === choice) {
        	return $("select#secondHeroGearLevel").val();
        }
       	return -1;
    }
    function getEffectiveLevel(equipName, equipLevel){
  		// Returns the effective level of equipment following difficulty modifiers
        // Remember that for the purposes of entry into arrays, things are offset by one
  		var diff = $("select#difficultyModeBoost").val() * 1;
  		var equipType = 0;
  		var levelPenalty = 0;
  		if (isNaN(diff)) {
  			diff = 0; //Failsafe
  		}
  		if (dictEquipment[equipName] != undefined) {
	        equipType = dictEquipment[equipName].type;
	        if (equipType === undefined) {
	        	equipType = 0; // Failsafe
	        }
  		}
  		if (difficultyEquipLevelPenalty[equipType][diff] != undefined) {
	        levelPenalty = difficultyEquipLevelPenalty[equipType][diff];
	        if (levelPenalty === undefined) {
	        	levelPenalty = 0; // Failsafe
	        }
  		}
        
        return Math.max(0, equipLevel - levelPenalty);
	}
    function updateEffectiveEquipLevels() {
        // Read the equipment and determine their type
        var firstEquip = $("select#firstHeroGearChoice option:selected").text();
        var secondEquip = $("select#secondHeroGearChoice option:selected").text();
        // Get the raw levels of the equipment
        var firstEquipLevel = $("select#firstHeroGearLevel").val() * 1;
        var secondEquipLevel = $("select#secondHeroGearLevel").val() * 1;
        
        // Determine the effective levels of the equipment
        // We need to add one to effective level
        // This is merely for display purposes, as internally they are off by one
        var effFirstEquipLevel = getEffectiveLevel(firstEquip,firstEquipLevel) + 1;
        var effSecondEquipLevel = getEffectiveLevel(secondEquip,secondEquipLevel) + 1;
        var effLevelStr = "Due to difficulty modifiers, stats from the equipment will be calculated as if the equipment was lower-leveled. The effective level of this equipment is "; // Convenient for storing a description string
        
        if (firstEquipLevel + 1 != effFirstEquipLevel) {
        	$("#firstHeroGearEffLvlInfo").css("display","block");
            	document.getElementById("firstHeroGearEffLvlInfo").setAttribute("title",
            	effLevelStr + effFirstEquipLevel + ".");
        } else {
        	$("#firstHeroGearEffLvlInfo").css("display","none");
        }
    	if (secondEquipLevel + 1 != effSecondEquipLevel) {
        	$("#secondHeroGearEffLvlInfo").css("display","block");
            	document.getElementById("secondHeroGearEffLvlInfo").setAttribute("title",
            	effLevelStr + effSecondEquipLevel + ".");
        } else {
        	$("#secondHeroGearEffLvlInfo").css("display","none");
        }
	}
   /* Initialize the choices
   As of October 2025, we write this as a dictionary of objects, each with two properties.
   level is the level cap, whereas type is 0 for common and 1 for epic (this feeds into the level penalty array) */
    var dictEquipment = {
    	"Barbarian Puppet": {level: 18, type: 0},
        "Rage Vial": {level: 18, type: 0},
        "Earthquake Boots": {level: 18, type: 0},
        "Vampstache": {level: 18, type: 0},
        "Giant Gauntlet": {level: 27, type: 1},
        "Spiky Ball": {level: 27, type: 1},
        "Snake Bracelet": {level: 27, type: 1},
    	"Archer Puppet": {level: 18, type: 0},
    	"Invisibility Vial": {level: 18, type: 0},
    	"Giant Arrow": {level: 18, type: 0},
    	"Healer Puppet": {level: 18, type: 0},
    	"Frozen Arrow": {level: 27, type: 1},
    	"Magic Mirror": {level: 27, type: 1},
    	"Action Figure": {level: 27, type: 1},
    	"Henchmen Puppet": {level: 18, type: 0},
    	"Dark Orb": {level: 18, type: 0},
    	"Metal Pants": {level: 18, type: 0},
    	"Noble Iron": {level: 18, type: 0},
    	"Dark Crown": {level: 27, type: 1},
    	"Meteor Staff": {level: 27, type: 1},
    	"Eternal Tome": {level: 1, type: 0}, // Technically has 18 levels, but has no passive boosts, so it doesn't matter which you use
    	"Life Gem": {level: 18, type: 0},
    	"Rage Gem": {level: 18, type: 0},
    	"Healing Tome": {level: 18, type: 0},
    	"Fireball": {level: 27, type: 1},
    	"Lavaloon Puppet": {level: 27, type: 1},
    	"Heroic Torch": {level: 27, type: 1},
    	"Royal Gem": {level: 18, type: 0},
    	"Seeking Shield": {level: 18, type: 0},
    	"Hog Rider Puppet": {level: 18, type: 0},
    	"Haste Vial": {level: 18, type: 0},
    	"Rocket Spear": {level: 27, type: 1},
    	"Electro Boots": {level: 27, type: 1},
    };
    // Equipment level penalty is a 2D array - first entry is for Common equipment, second entry for Epic equipment
		var difficultyEquipLevelPenalty = [[0,0,0,0,3],[0,0,0,0,6]];
    // Fix the options available to us, depending on the name of the page
    pageName = mw.config.get('wgTitle');
    var heroGearOptions = [];
    switch (pageName) {
    	case ("Barbarian King"):
    		heroGearOptions = ["Barbarian Puppet", "Rage Vial", "Earthquake Boots", "Vampstache", "Giant Gauntlet", "Spiky Ball", "Snake Bracelet"];
    		break;
    	case ("Archer Queen"):
    		heroGearOptions = ["Archer Puppet", "Invisibility Vial", "Giant Arrow", "Healer Puppet", "Frozen Arrow", "Magic Mirror", "Action Figure"];
    		break;
    	case ("Minion Prince"):
    		heroGearOptions = ["Henchmen Puppet", "Dark Orb", "Metal Pants", "Noble Iron", "Dark Crown", "Meteor Staff"];
    		break;
     	case ("Grand Warden"):
    		heroGearOptions = ["Eternal Tome", "Life Gem", "Rage Gem", "Healing Tome", "Fireball", "Lavaloon Puppet", "Heroic Torch"];
    		break;
    	case ("Royal Champion"):
    		heroGearOptions = ["Royal Gem", "Seeking Shield", "Hog Rider Puppet", "Haste Vial", "Rocket Spear", "Electro Boots"];
    		break;
    	default: // Having all options in one makes it excellent for testing
    		heroGearOptions = ["Barbarian Puppet", "Rage Vial", "Earthquake Boots", "Vampstache", "Giant Gauntlet", "Spiky Ball", "Snake Bracelet", "Archer Puppet", "Invisibility Vial", "Giant Arrow", "Healer Puppet", "Frozen Arrow", "Magic Mirror", "Action Figure", "Henchmen Puppet", "Dark Orb", "Metal Pants", "Noble Iron", "Dark Crown", "Meteor Staff", "Eternal Tome", "Life Gem", "Rage Gem", "Healing Tome", "Fireball", "Lavaloon Puppet", "Heroic Torch", "Royal Gem", "Seeking Shield", "Hog Rider Puppet", "Haste Vial", "Rocket Spear"];
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
		updateEffectiveEquipLevels();
    });
    $("select#secondHeroGearChoice").change(function() {
   	    // Identify the choice to disable, and enable all other choices
  		var secondChoice = $("select#secondHeroGearChoice").val();
    	var choiceToDisable = $("select#firstHeroGearChoice option[value=" + secondChoice + "]");
    	choiceToDisable.prop('disabled',true);
    	choiceToDisable.siblings().prop('disabled',false);
    	
		refreshSecondGearChoices();
		updateEffectiveEquipLevels();
    });
	$("#heroGearToggle").change(function() {
  		var tog = $("#heroGearToggle");
        if (tog.is(":checked") === true) {
        	$("#heroGearHarness, #heroAbilityHarness").css("display","block");
        } else {
        	$("#heroGearHarness, #heroAbilityHarness").css("display","none");
        }
        checkSpecialChoices();
	});
	/* TODO: Rework this if necessary
	$("#hardModeBoost").change(function() {
		// Reset the level caps for the currently existing equipment as required
		// (If hero equipment is not present, this function simply appears to do nothing)
		var tog = $("#hardModeBoost");
		if (tog.is(":checked") === true) {
			hmCapEnabled = 1;
		} else {
			hmCapEnabled = 0;
		}
		// Now refresh the level choices for hero equipment (where available)
		if ($("select#firstHeroGearLevel").val() != undefined) {
	    	refreshFirstGearChoices(hmEnabled = true);
    	}
    	if ($("select#secondHeroGearLevel").val() != undefined) {
	    	refreshSecondGearChoices(hmEnabled = true);
    	}
	}); */
   $("select#firstHeroGearLevel, select#secondHeroGearLevel, select#difficultyModeBoost").change(function() {
   		// If the hero equipment stuff exists, update effective levels
   		// (Do not apply if the hero equipment stuff does not exist)
   		if ($("input#heroGearToggle").val() != undefined) {
    		updateEffectiveEquipLevels();
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
   $(".HPDecay").each(function () {
   		var HPDecay = $(this).text().replace(/,/g,"") * 1;
   		$(this).attr("title", HPDecay);
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
   $(".changeBonusButton").click(function() {
       // Change its text to "Update"
      $(".changeBonusButton").text("Update");
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
		var hammerJamBoost = $("#hammerJamBoost").prop("checked");
		var calcNewCost = 0;
		if (hammerJamBoost === true) {
			var hammerJamCost = discountCost(cellValueCost,50);
			calcNewCost = discountCost(hammerJamCost,boostPercent+eventBoostPercent);
		} else {
			calcNewCost = discountCost(cellValueCost,boostPercent+eventBoostPercent);
		}
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
		var hammerJamBoost = $("#hammerJamBoost").prop("checked");
		var timeSeconds = readTime(str);
		var newtimeSeconds = 0;
		if (hammerJamBoost === true) {
			var hammerJamSeconds = discountTime(timeSeconds,50);
			newtimeSeconds = discountTime(hammerJamSeconds,reducePercent+eventReducePercent);
		} else {
			newtimeSeconds = discountTime(timeSeconds,reducePercent+eventReducePercent);
		}
 
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
		var hammerJamBoost = $("#hammerJamBoost").prop("checked");
		/* Check if the string contains "d" for days. If so,
       	set the days parameter equal to the number preceding it. */
		var timeSeconds = readTime(str);
		var newtimeSeconds = 0;
		if (hammerJamBoost === true) {
			var hammerJamSeconds = discountTime(timeSeconds,50);
			newtimeSeconds = discountTime(hammerJamSeconds,reducePercent+eventReducePercent);
		} else {
			newtimeSeconds = discountTime(timeSeconds,reducePercent+eventReducePercent);
		}
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
		var eventShowcaseCheckBox = document.getElementById("eventShowcaseBoost");
		var baseTrainTime = readTime(str);
		var newTrainTime;
		if (eventShowcaseCheckBox != null) {
			if (eventShowcaseCheckBox.checked === true) {
				var showcaseTrainTime = discountTrainTime(baseTrainTime,50);
				newTrainTime = discountTrainTime(showcaseTrainTime,reducePercent+eventReducePercent);
			} else {
				newTrainTime = discountTrainTime(baseTrainTime,reducePercent+eventReducePercent);
			}
		} else {
			newTrainTime = discountTrainTime(baseTrainTime,reducePercent+eventReducePercent);
		}
		
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
			var hammerJamBoost = $("#hammerJamBoost").prop("checked");
			var costArray = [];
			for (x in initArray) {
				costArray.push(labCostShortToLong(initArray[x]));
			}
			var discountArray = [];
			if (hammerJamBoost === true) {
				var hammerJamArray = arrayCostDiscount(costArray,50);
				discountArray = arrayCostDiscount(hammerJamArray,boostPercent+eventBoostPercent);
			} else {
				discountArray = arrayCostDiscount(costArray,boostPercent+eventBoostPercent);
			}
			var outputArray = [];
			for (x in discountArray) {
				outputArray.push(labCostLongToShort(discountArray[x]));
			}
			var output = labArrayToString(outputArray);
			if (hasAsterisk === true) {
				output = "*" + output;
			}
			$(this).text(output.trim());
			if (init.trim() == output.trim() || (hammerJamBoost != true && boostPercent + eventBoostPercent === 0)) {
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
			var hammerJamBoost = $("#hammerJamBoost").prop("checked");
			var timeArray = [];
			for (x in initArray) {
				timeArray.push(readTime(initArray[x]));
			}
			var discountArray = [];
			if (hammerJamBoost === true) {
				var hammerJamArray = arrayTimeDiscount(timeArray,50);
				discountArray = arrayTimeDiscount(hammerJamArray,boostPercent+eventBoostPercent);
			} else {
				discountArray = arrayTimeDiscount(timeArray,boostPercent+eventBoostPercent);
			}
			var outputArray = [];
			for (x in discountArray) {
				outputArray.push(outputTime(discountArray[x]));
			}
			var output = labArrayToString(outputArray);
			if (hasAsterisk === true) {
				output = "*" + output;
			}
			$(this).text(output.trim());
			if (init.trim() == output.trim() || (hammerJamBoost != true && boostPercent + eventBoostPercent === 0)) {
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
	  // A HP array is also useful to keep track of HP where other things depend on it
	  var HPArray = [];
	  // Add an array for Wall damage
	  var wallDamageArray = [];
	  // Two lookup arrays for the GW's life aura ability
	  var auraPercentIncrease = [0,400,500,600,700,800,900,1000];
	  var auraMaxHPIncrease = [0,330,420,510,600,690,780,870];
	  // Another one for GW's rage aura ability
	  var rageAuraPercentIncrease = [0,15,20,25,30,35,45,50];
	  // Lookup array for GW's heroic torch speed boost
	  // Note that there is currently no difference between some level groups, but I reserve the different levels for now
	  var torchAuraSpeedIncrease = [0,5,6,6,7,7,7,8,8,8,9];
	  // Lookup arrays for the apprentice's aura ability
	  // Styled in thousandths for ease of comparison
	  // TODO: Life aura no longer requires thousandths, may convert to hundredths instead
	  var apprenticeAuraPercentIncrease = [0,200,220,240,260];
	  // And a lookup for poison attack rate decrease (used for AltDPS)
	  var poisonASMultiplier = [0,35,40,45,50,55,60,65,68,70,72,73];
	  // And a lookup for haste speed increase
	  var hasteSpeedIncrease = [0,28,34,40,46,52,56];
	  /* Hero Equipment stat dictionaries. We include one for each of the following:
			1. DPS bonus (effectively adds to DPH, but we'll add raw DPS)
			2. HP bonus
			3. HP regen bonus (let's also list Royal Gem's HP regen because that's literally all it does)
			4. Attack speed bonus
			5. Ability damage increase (%)
			6. Ability DPH increase
			7. Ability movement speed
			8. Ability attack type (simply a string to replace another)
			9. Ability AS increase (%)
		What is not given a dictionary:
			1. Self-heal per second
			2. Other ability aspects e.g. duration, projectile damage, etc.
	  */
		var dictDPSBonus = {
			"Rage Vial": [17,22,27,32,37,42,48,54,60,66,72,79,86,94,104,112,120,128],
			"Earthquake Boots": [13,15,17,19,21,23,26,28,32,40,48,55,63,71,79,86,94,102],
			"Vampstache": [10,15,20,25,30,40,45,50,60,65,70,80,85,90,100,105,110,120],
			"Giant Gauntlet": [17,20,23,26,29,32,34,37,43,53,63,74,84,94,104,115,125,135,137,140,142,145,147,150,152,155,160],
			"Spiky Ball": [35,38,42,45,49,52,55,58,65,76,88,101,112,124,135,148,159,171,176,182,188,194,199,205,211,217,222],
			"Snake Bracelet": [10,11,12,14,16,18,20,22,24,26,28,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75],
			"Archer Puppet": [28,37,46,54,61,68,78,88,99,110,120,127,134,140,145,150,154,159],
			"Giant Arrow": [20,23,27,30,33,37,40,43,50,59,68,77,86,96,105,114,123,132],
			"Action Figure": [28,32,36,40,44,48,53,58,63,68,74,80,84,89,94,98,102,106,109,112,116,119,122,125,128,132,135],
			"Henchmen Puppet": [33,38,46,51,56,64,71,78,92,103,114,131,140,149,162,169,176,188],
			"Dark Orb": [10,13,18,21,24,29,32,35,40,43,46,51,54,57,62,65,68,73],
			"Meteor Staff": [13,17,21,25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,90,95,100,105,110,115,120,125],
			"Life Gem": [11,13,16,18,20,22,24,26,31,35,42,46,51,55,59,64,68,73],
			"Rage Gem": [12,14,16,18,20,22,24,26,30,36,43,49,56,62,69,75,82,88],
			"Fireball": [21,24,27,30,33,36,40,44,47,51,56,60,63,67,71,74,77,80,82,84,87,89,92,94,96,99,101],
			"Lavaloon Puppet": [10,12,13,15,16,18,20,22,23,25,28,30,31,33,35,37,38,40,41,42,43,45,46,47,48,49,50],
			"Heroic Torch": [10,11,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,45,48,51,54,57,60,63,66,69],
			"Royal Gem": [35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,105,120],
			"Frozen Arrow": [35,40,45,50,55,60,66,72,78,85,92,99,105,111,117,122,127,132,136,140,144,148,152,156,160,164,168],
			"Haste Vial": [20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88],
			"Rocket Spear": [35,40,45,50,55,60,66,72,78,85,92,99,105,111,117,122,127,132,136,140,144,148,152,156,160,164,168]
		};
		var dictHPBonus = {
			"Barbarian Puppet": [309,385,467,564,649,734,836,940,1045,1155,1265,1445,1755,2087,2444,2703,3093,3366],
			"Earthquake Boots": [209,244,278,313,348,383,418,452,522,677,831,986,1200,1500,1800,2100,2300,2500],
			"Spiky Ball": [365,478,590,703,815,928,1040,1153,1265,1378,1490,1603,1715,1828,1940,2053,2165,2278,2390,2503,2615,2728,2840,2953,3065,3178,3290],
			"Snake Bracelet": [150,300,450,600,750,900,1050,1200,1350,1500,1650,1800,1950,2100,2250,2400,2550,2700,2850,3000,3150,3300,3450,3600,3750,3900,4050],
			"Invisibility Vial": [80,100,120,140,170,200,250,300,340,380,420,460,500,540,580,620,660,700],
			"Giant Arrow": [80,93,106,119,133,146,159,172,199,241,284,326,369,411,454,496,539,581],
			"Healer Puppet": [132,154,177,199,221,243,265,287,331,402,473,543,614,685,756,826,897,968],
			"Magic Mirror": [88,96,113,131,157,184,228,272,307,342,377,412,448,483,518,553,588,624,650,676,703,729,756,782,808,835,861],
			"Action Figure": [159,184,200,217,236,254,276,298,318,339,359,380,399,424,448,473,498,522,544,565,586,608,628,649,671,692,713],
			"Dark Orb": [88,103,117,131,147,161,175,190,219,266,313,359,406,453,500,546,593,640],
			"Metal Pants": [350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200],
			"Dark Crown": [50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600,625,650,675,700],
			"Meteor Staff": [58,87,115,144,173,202,230,259,288,317,345,374,403,432,460,489,518,547,607,639,671,705,739,773,809,845,881],
			"Life Gem": [165,179,189,199,211,223,248,274,303,334,370,386,403,419,436,452,469,485],
			"Healing Tome": [92,107,122,137,153,168,183,198,229,280,330,381,432,482,533,584,634,685],
			"Lavaloon Puppet": [50,55,57,60,65,67,70,75,77,80,85,87,90,95,97,100,105,107,110,115,117,120,125,127,130,135,150],
			"Heroic Torch": [30,35,37,40,45,47,50,55,57,60,65,67,70,75,77,80,85,87,90,95,97,100,105,107,110,115,125],
			"Royal Gem": [60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570],
			"Seeking Shield": [40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380],
			"Hog Rider Puppet": [60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570],
			"Rocket Spear": [50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600,625,650,675,700],
			"Electro Boots": [50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600,625,650,675,700]
		};
		var dictHPRecoveryBonus = {
			"Barbarian Puppet": [110,165,220,275,330,385,440,495,572,660,748,847,946,1034,1166,1243,1320,1386],
			"Rage Vial": [150,225,300,375,450,525,600,675,780,900,1020,1155,1290,1410,1590,1695,1800,1890],
			"Archer Puppet": [176,193,209,226,242,259,275,292,308,323,341,358,374,396,418,440,462,484],
			"Magic Mirror": [198,229,250,271,294,317,344,372,397,423,448,474,498,529,560,591,622,652,679,706,732,759,784,811,838,864,891],
			"Henchmen Puppet": [176,193,209,226,242,259,275,292,308,325,341,358,388,418,448,478,508,538],
			"Metal Pants": [1600,1675,1750,1800,1850,1900,1950,2000,2050,2100,2150,2200,2250,2300,2350,2400,2450,2500],
			"Healing Tome": [165,193,220,248,275,303,330,358,413,463,513,563,613,663,713,763,813,863],
			"Heroic Torch": [100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360],
			"Royal Gem": [1200,1200,1450,1450,1450,1600,1600,1600,1800,1800,1800,2000,2000,2000,2200,2200,2200,2400],
			"Hog Rider Puppet": [180,220,270,320,370,420,470,520,560,610,660,700,750,800,850,900,950,1000]
		};
		var dictASBonus = {
			"Vampstache": [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
			"Snake Bracelet": [1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10],
			"Noble Iron": [5,6,6,7,8,8,9,10,10,11,12,12,13,14,14,15,16,17],
			"Dark Crown": [1,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,11],
			"Rage Gem": [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
			"Haste Vial": [5,6,6,7,8,8,9,10,10,11,12,12,13,14,14,15,16,16]
		};
		var dictAbilityDIBonus = { //Written in percent
			"Rage Vial": [120,120,130,130,130,135,135,135,140,140,140,145,145,145,150,150,150,155]
		};
		var dictAbilityDPHBonus = {
			"Invisibility Vial": [340,440,540,640,730,820,920,1020,1120,1220,1310,1370,1430,1490,1560,1620,1680,1740],
			"Rocket Spear": [350,350,420,420,420,490,490,490,560,560,560,630,630,630,700,700,700,770,770,770,840,840,840,910,910,910,980]
		};
		var dictAbilitySpeedBonus = { //Written in number of tenths
			"Rage Vial": [180,180,223,223,223,255,255,255,287,287,287,320,320,320,351,351,351,383],
			"Haste Vial": [180,180,223,223,223,255,255,255,287,287,287,320,320,320,351,351,351,383],
			"Heroic Torch": [25,25,30,30,30,30,30,30,35,35,35,35,35,35,35,35,35,40,40,40,40,40,40,40,40,40,45] // Since the aura acts on GW himself, this is for all intents and purposes identical to an ability speed boost
		};
		var dictAbilityASBonus = { //Written in percent
			"Haste Vial": [60,60,60,60,60,80,80,80,80,80,80,80,80,80,100,100,100,100]
		};
		var dictAttackTypeText = { //Repeat as many times as there are levels (if constant across all levels)
			"Giant Gauntlet": Array(27).fill("Area Splash (2.5 tile Radius)"),
			"Rocket Spear": Array(27).fill("Area Splash (0.8 tile Radius)")
		};
		// Lookup for the Dark Crown's boosts
		var darkCrownBoostArr = [1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10];
		// Difficulty lookups
		var difficultyAttackPenalty = [0,3,6,10,10];
		var difficultyDefenseBoost = [0,7,14,20,20];
		// Read the equipment and level
		// Note: The levels are zero-indexed, so e.g. level 2 equipment outputs level 1
		// This is to be compatible with the dictionaries, which are also zero-indexed
		var firstHeroGearName, firstHeroGearLvl, secondHeroGearName, secondHeroGearLvl;
		if ($("#heroGearToggle").is(":checked") === true) {
    		firstHeroGearName = $("select#firstHeroGearChoice option:selected").text();
    		firstHeroGearLvl = $("select#firstHeroGearLevel").val();
      		secondHeroGearName = $("select#secondHeroGearChoice option:selected").text();
    		secondHeroGearLvl = $("select#secondHeroGearLevel").val();
    		
    		// Modify by difficulty
    		firstHeroGearLvl = getEffectiveLevel(firstHeroGearName, firstHeroGearLvl);
    		secondHeroGearLvl = getEffectiveLevel(secondHeroGearName, secondHeroGearLvl);
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
			var firstGearAASBoost = 0;
			var secondGearAASBoost = 0;
			
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
  			var firstGearAASArray = dictAbilityASBonus[firstHeroGearName];
			if (firstGearAASArray != undefined) {
    			firstGearAASBoost = firstGearAASArray[firstHeroGearLvl];
        		if (isNaN(firstGearAASBoost)) {
        			firstGearAASBoost = 0;
        		}
    		}
			var secondGearAASArray = dictAbilityASBonus[secondHeroGearName];
			if (secondGearAASArray != undefined) {
    			secondGearAASBoost = secondGearAASArray[secondHeroGearLvl];
        		if (isNaN(secondGearAASBoost)) {
        			secondGearAASBoost = 0;
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
			// Obtain hero ability attack speed+ from dictionaries
			var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
			var heroAbilityAS = 0;
			if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					heroAbilityAS = firstGearAASBoost + secondGearAASBoost;
					if (isNaN(heroAbilityAS) === true) {
						heroAbilityAS = 0;
					}
				}
			}
			// Stack all of the positive multipliers together additively
			var positiveAbilityMultiplier = (100 + firstGearASBoost + secondGearASBoost) / 100;
			attackFreq *= positiveAbilityMultiplier;
			// Add ability AS boost (stacks multiplicatively, I think)
			attackFreq *= (100 + Math.max(normalAbilityAS, heroAbilityAS)) / 100;
			
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
			var difficultyLevel = $("#difficultyModeBoost").val() * 1;
			var darkCrownStacks = $("select#darkCrownStackLevel").val() * 1;
			var darkCrownLevel = getSpecialChoiceLevel("Dark Crown");
			var diff = $("select#difficultyModeBoost").val() * 1;
			var modifierMode = "";
			// Take also the modifier mode to distinguish between Attack and Defense for hard mode
			// If there is no modifier mode, ignore this
			if ($("select#modifierMode").val() != undefined) {
				modifierMode = $("select#modifierMode").val();
			}
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
		    if (isNaN(darkCrownStacks) === true) {
		    	darkCrownStacks = 0;
		    }
			var calcNewDPH = initialDPH;
			var rageMultiplier = 1;
			var towerRageMultiplier = 1;
			var auraRageMultiplier = 1;
			var darkCrownMultiplier = 1;
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
			// Dark crown boost
			if (darkCrownLevel > -1) {
				darkCrownMultiplier = (100 + darkCrownStacks * darkCrownBoostArr[darkCrownLevel])/100;
			}
			var rageDamage = initialDPH * Math.max(rageMultiplier, towerRageMultiplier, auraRageMultiplier,darkCrownMultiplier);
			
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
    		// Do the same for hero ability flat damage increase
    		var firstGearAbilityDPH = 0;
			var secondGearAbilityDPH = 0;
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
					normalAbilityMultiplier = (100 + normalAbilityDI) / 100;
				}
			}
			var normalAbilityDamage = initialDPH * normalAbilityMultiplier;
			// Calculate also the damage from flat damage increases, if hero ability check box is turned on
			var heroAbilityDPH = initialDPH;
			if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					// Assuming that DI increases are additive. If they're not, I'll have to tweak it to use max
                	heroAbilityDPH = initialDPH + firstGearAbilityDPH + secondGearAbilityDPH;
				}
			}
			
			calcNewDPH = Math.max(rageDamage,heroAbilityDamage,normalAbilityDamage,heroAbilityDPH);
			// Finally, modify for hard mode as necessary, using "isBuilding" and "isHero" as needed
			// First, check the modifier mode, which will override other checks
			if (!isNaN(diff)) {
				if (diff > 0) {
					if (modifierMode == "Attack") { // Hero in attack mode gets less damage
						calcNewDPH *= (100 - difficultyAttackPenalty[diff])/100;
					} else if (modifierMode == "Defense") { // Hero in defense mode gets more damage
						calcNewDPH *= (100 + difficultyDefenseBoost[diff])/100;
					} else {
						if (isHero === true) { // For heroes when modifier mode is ignored
							// (example: Hero equipments)
							calcNewDPH *= (100 - difficultyAttackPenalty[diff])/100;
						} else if (isBuilding === true || isStatue === true) { // For buildings or "statues"
							calcNewDPH *= (100 + difficultyDefenseBoost[diff])/100;
						}
					}
				}
			}
			return calcNewDPH;
		}
		$(".DPH").each(function() {
			var initialDPH = $(this).attr("title") * 1;
			var baseDPH = initialDPH;
			var calcNewDPH = initialDPH;
			// For CSS styling purposes
			var difficultyBoost = $("select#difficultyModeBoost").val() * 1;
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
    		/* Note: For February update onwards, superseded by balance change which makes the DPH bonus a separate buff,
    		and not a direct modifier to DPH
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
			} */
			
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
			// Keep the original DPH for DPS calculations and comparison, but display only 2 d.p.
			var displayedDPH = calcNewDPH.toFixed(2) * 1;
			$(this).text(displayedDPH.format("#,##0[.]###"));
			if (initialDPH === calcNewDPH) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
            if (!isNaN(difficultyBoost)) {
				if (difficultyBoost > 0 && $(this).hasClass("Builder") === false) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
			}
		});
		$(".DPHRange").each(function() {
			var initRange = $(this).attr("title");
			// For CSS styling purposes
			var difficultyBoost = $("select#difficultyModeBoost").val() * 1;
			// Initial range but formatted - used to compare with the final output
			var initFormat = "";
			var initArray = readRange(initRange);
			var initFormatArray = [];
			for (x in initArray) {
				initArray[x] = initArray[x] * 1;
				initFormatArray.push(initArray[x].toFixed(2) * 1);
			}
			initFormat = initFormatArray[0].format("#,##0[.]###") + "-" + initFormatArray[1].format("#,##0[.]###");
			var moddedArray = [];
			var outputRange = "";
			var moddedFormatArray = [];
			for (x in initArray) { //Use calcDPH with parameters depending on the class
				if ($(this).hasClass("Hero") === true) {
					if ($(this).hasClass("Statue") === true) {
						moddedArray.push(calcDPH(initArray[x],true,false,true));
					} else {
						moddedArray.push(calcDPH(initArray[x],true,false,false));
					}
				} else if ($(this).hasClass("Building") === true) {
					moddedArray.push(calcDPH(initArray[x],false,true,true));
				} else {
					moddedArray.push(calcDPH(initArray[x],false,false,false));
				}
			}
			for (x in moddedArray) {
				moddedFormatArray.push(moddedArray[x].toFixed(2) * 1);
			}
			outputRange = moddedFormatArray[0].format("#,##0[.]###") + "-" + moddedFormatArray[1].format("#,##0[.]###");
			$(this).text(outputRange.trim());
			if (initFormat.trim() === outputRange.trim()) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
            if (!isNaN(difficultyBoost)) {
				if (difficultyBoost > 0 && $(this).hasClass("Builder") === false) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
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
		    if (frostPotency > 0) {
		    	freezeUsed = true;
		    }
		    var poisonTowerUsed = false;
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					poisonTowerUsed = true;
				}
			}
			// Hard mode toggle overrides all other CSS
			var hardModeUsed = false;
			var difficultyBoost = $("select#difficultyModeBoost").val() * 1;
			if (!isNaN(difficultyBoost)) {
				if (difficultyBoost > 0 && $(this).hasClass("Builder") === false) {
					hardModeUsed = true;
				}
			}
			poisonUsed = ((poisonSpellLevel + THpoisonSpellLevel + HHpoisonSpellLevel > 0) || poisonTowerUsed) && ($(this).hasClass("Building") === false);
			freezeUsed = freezeUsed && ($(this).hasClass("Building") === false);
			if (poisonUsed || hardModeUsed) {
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
			if (frostPotency > 0) {
		    	freezeUsed = true;
		    }
		    var poisonTowerUsed = false;
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					poisonTowerUsed = true;
				}
			}
			// Hard mode toggle overrides all other CSS
			var hardModeUsed = false;
			var difficultyBoost = $("select#difficultyModeBoost").val() * 1;
			if (!isNaN(difficultyBoost)) {
				if (difficultyBoost > 0 && $(this).hasClass("Builder") === false) {
					hardModeUsed = true;
				}
			}
			poisonUsed = ((poisonSpellLevel + THpoisonSpellLevel + HHpoisonSpellLevel > 0) || poisonTowerUsed) && ($(this).hasClass("Building") === false);
			freezeUsed = freezeUsed && ($(this).hasClass("Building") === false);
			if (poisonUsed || hardModeUsed) {
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
		    var darkCrownStacks = $("select#darkCrownStackLevel").val() * 1;
			var darkCrownLevel = getSpecialChoiceLevel("Dark Crown");
			if (isNaN(darkCrownStacks) === true) {
		    	darkCrownStacks = 0;
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
			var diff = $("select#difficultyModeBoost").val() * 1;
			var modifierMode = "";
			// Take also the modifier mode to distinguish between Attack and Defense for hard mode
			// If there is no modifier mode, ignore this
			if ($("select#modifierMode").val() != undefined) {
				modifierMode = $("select#modifierMode").val();
			}
			// First calculate buffed DPS by rage
			
			var rageMultiplier = 1;
			var towerRageMultiplier = 1;
			var auraRageMultiplier = 1;
			var darkCrownMultiplier = 1;
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
			// Dark crown boost
			if (darkCrownLevel > -1) {
				darkCrownMultiplier = (100 + darkCrownStacks * darkCrownBoostArr[darkCrownLevel])/100;
			}
            var rageDPS = baseDPS * Math.max(rageMultiplier,towerRageMultiplier,auraRageMultiplier,darkCrownMultiplier);
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
			var firstGearAASBoost = 0;
			var secondGearAASBoost = 0;
			
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
			var firstGearAASArray = dictAbilityASBonus[firstHeroGearName];
			if (firstGearAASArray != undefined) {
    			firstGearAASBoost = firstGearAASArray[firstHeroGearLvl];
        		if (isNaN(firstGearAASBoost)) {
        			firstGearAASBoost = 0;
        		}
    		}
			var secondGearAASArray = dictAbilityASBonus[secondHeroGearName];
			if (secondGearAASArray != undefined) {
    			secondGearAASBoost = secondGearAASArray[secondHeroGearLvl];
        		if (isNaN(secondGearAASBoost)) {
        			secondGearAASBoost = 0;
        		}
    		}
    		buffedDPS *= (100 + firstGearASBoost + secondGearASBoost) / 100;
    		// If hero ability is checked on, further buff the DPS by the ability AS boost
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					// Assuming that ability AS increases are additive. If they're not, I'll have to tweak it to use max
					buffedDPS *= (100 + firstGearAASBoost + secondGearAASBoost) / 100;
				}
			}
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
			
			// Finally, modify for hard mode as necessary, using classes as needed
			// First, check the modifier mode, which will override other checks
			var hardModeUsed = false;
			if (!isNaN(diff)) {
				if (diff > 0) {
					hardModeUsed = true;
					if (modifierMode == "Attack") { // Hero in attack mode gets 10% less damage
						buffedDPS *= (100 - difficultyAttackPenalty[diff])/100;
					} else if (modifierMode == "Defense") { // Hero in defense mode gets 20% more damage
						buffedDPS *= (100 + difficultyDefenseBoost[diff])/100;
					} else {
						if ($(this).hasClass("Hero") === true) { // For heroes when modifier mode is ignored (e.g. Hero equipment)
							buffedDPS *= (100 - difficultyAttackPenalty[diff])/100;
						} else if ($(this).hasClass("Building") === true || $(this).hasClass("Statue") === true) { // For buildings or "statues"
							buffedDPS *= (100 + difficultyDefenseBoost[diff])/100;
						}
					}
				}
			}
			var finalDPS = buffedDPS.toFixed(3) * 1;
			$(this).text(finalDPS.format("#,##0[.]###"));
			if (initialDPS === finalDPS) {
				$(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
			}
			if ((poisonUsed && $(this).hasClass("Building") === false) || hardModeUsed && $(this).hasClass("Builder") === false) {
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
    		// Add also hard mode modifiers. HP modifiers in hard mode apply at this point
    		var diff = $("select#difficultyModeBoost").val() * 1;
			var modifierMode = "";
			var hardModeUsed = false;
			// Take also the modifier mode to distinguish between Attack and Defense for hard mode
			// If there is no modifier mode, ignore this
			if ($("select#modifierMode").val() != undefined) {
				modifierMode = $("select#modifierMode").val();
			}
			// Hard mode modifiers only apply to Heroes
			// The Hero class check is redundant currently but useful if troops get modified in hard mode
			if (!isNaN(diff)) {
				if (diff > 0 && $(this).hasClass("Hero") === true) {
					hardModeUsed = true; // This flag is used for aesthetics
					if (modifierMode == "" || modifierMode == "Attack") {
						baseHP *= (100 - difficultyAttackPenalty[diff])/100; // 10% nerf to base HP
					} else if (modifierMode == "Defense") {
						baseHP *= (100 + difficultyDefenseBoost[diff])/100; // 20% buff to base HP
					}
				}
			}
			
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
			var darkCrownStacks = $("select#darkCrownStackLevel").val() * 1;
			var darkCrownLevel = getSpecialChoiceLevel("Dark Crown");
			if (isNaN(darkCrownStacks) === true) {
		    	darkCrownStacks = 0;
		    }
			var calcPercentHP = baseHP * (1000 + auraPercent)/1000;
			var calcMaxHP = baseHP + auraMaxHP;
			var calcWardenHP = Math.min(calcPercentHP,calcMaxHP);
			var calcApprenticeHP = baseHP * (1000 + apprenticePercent)/1000;
			var calcDarkCrownHP = baseHP;
			if (darkCrownLevel > -1) {
				calcDarkCrownHP = baseHP * (100 + darkCrownStacks * darkCrownBoostArr[darkCrownLevel])/100;
			}
			var calcNewHP = Math.max(calcWardenHP,calcApprenticeHP,calcDarkCrownHP);
			var roundedHP = Math.floor(calcNewHP * 100)/100; //Use floor function to round down to 2 d.p., since the game does this
			// Add the final value to HP array if required
			if ($(this).hasClass("Decay")) {
				HPArray.push(roundedHP);
			}
			$(this).text(roundedHP.format("#,##0[.]###"));
			if (initialHP === roundedHP) {
                $(this).removeClass("StatModifiedGP");
            } else {
                $(this).addClass("StatModifiedGP");
            }
            if (hardModeUsed) {
            	$(this).addClass("StatPoisoned");
            } else {
            	$(this).removeClass("StatPoisoned");
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
			/* Note: Since the February update, it will be treated as a separate buff,
			and no longer acts on base stats */
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
			if (isNaN(hasteSpellLevel) === true) {
		    	hasteSpellLevel = 0;
		    }
		    var capitalHasteSpellLevel = $("#capitalHasteSpellLevel").val() * 1;
		    if (isNaN(capitalHasteSpellLevel) === true) {
		    	capitalHasteSpellLevel = 0;
		    }
		    var torchAuraLevel = $("#torchAuraLevel").val() * 1;
		    if (isNaN(torchAuraLevel) === true) {
		    	torchAuraLevel = 0;
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
			var normalAbilityCheckBox = document.getElementById("normalAbilityBoost");
			var freezeCheckBox = document.getElementById("freezeBoost");
			var rageTowerCheckBox = document.getElementById("rageTowerBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
			var rageBoost = 0;
			var hasteBoost = 0;
			var towerRageBoost = 0;
			var torchBoost = 0;
			var heroAbilityBoost = 0;
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
                	// Halve this increase
                    hasteBoost = hasteSpeedIncrease[hasteSpellLevel] * 5 / 10;
                } else {
                    hasteBoost = hasteSpeedIncrease[hasteSpellLevel];
                }
            } else if (capitalHasteSpellLevel > 0) {
            	hasteBoost = capitalHasteSpellLevel + 6;
            }
            if (torchAuraLevel > 0) {
            	if ($(this).hasClass("Hero") == true) {
                	// Halve this increase
                    torchBoost = torchAuraSpeedIncrease[torchAuraLevel] * 5 / 10;
                } else {
                    torchBoost = torchAuraSpeedIncrease[torchAuraLevel];
                }
            }
    		if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					/* Since the February update, this no longer acts on base speed,
					and additionally is written as a speed increase instead of a fixed speed*/
					heroAbilityBoost = Math.max(firstGearAbilitySpeed, secondGearAbilitySpeed);
				}
			}
            /* We will need to multiply and divide by 10 since ability speed is written in tenths,
            	to avoid floating-point errors */
            var rageSpeed = (baseSpeed * 10 + Math.max(rageBoost,towerRageBoost) * 10) / 10;
			var hasteSpeed = (baseSpeed * 10 + hasteBoost * 10) / 10;
			var torchSpeed = (baseSpeed * 10 + torchBoost * 10) / 10;
			var heroAbilitySpeed = (baseSpeed * 10 + heroAbilityBoost * 10) / 10;
			
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
			var buffedSpeed = Math.max(rageSpeed, hasteSpeed, torchSpeed, abilitySpeed, heroAbilitySpeed);
			
			// That's all the speed buffs. Now on to the speed de-buffs (which thankfully don't conflict)
			// However, poison's speed decrease isn't linear. So we have to rely on a small lookup
			var poisonSpeedDebuff = [0,26,30,34,38,40,42,44,46,48,50,51];
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
    		/* Since there's only one gear equippable at a time that modifies attack type,
    		I will not consider what happens when both try to stack (for now)
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
		var wallHP = [100,200,400,800,1200,1800,2400,3000,3500,4000,5000,7000,8000,9000,10000,11000,12000,13000];
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
		$(".Lifetime").each(function() {
			var initLifetime = $(this).attr("title"); //Is a string
			var unitHP = HPArray[0];
			if (isNaN(unitHP)) {
				unitHP = 0;
			}
			var HPDecay = $(".HPDecay").attr("title") * 1;
			if (isNaN(HPDecay) || HPDecay <= 0) { // Failsafe (should not be used)
				HPDecay = 1;
			}
			// Calculate new lifetime to 2 decimal places (round down)
			var newLifetime = Math.floor((unitHP * 100) / HPDecay) / 100;
			var newLifetimeStr = newLifetime.toFixed(2) + 's';
			$(this).text(newLifetimeStr);
			// Remove the first entry of HP array to use the next entry
			HPArray.shift();
			if (newLifetimeStr.trim() === initLifetime.trim()) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
		});
		$(".StarBonus").each(function() {
			// A relatively straightforward modifier to implement. Modifies the star bonus
			var baseBonus = $(this).attr("title") * 1;
		    var starBonusMult = $("#starBonusBoost").val() * 1;
			if (isNaN(starBonusMult) === true) {
		    	starBonusMult = 1;
		    }
		    var newBonus = baseBonus * starBonusMult;
		    $(this).text(newBonus.format("#,##0[.]###"));
		    if (baseBonus === newBonus) {
				$(this).removeClass("StatGemBoosted");
			} else {
				$(this).addClass("StatGemBoosted");
			}
		});
		$(".LeagueBonus").each(function() {
			// A relatively straightforward modifier to implement. Modifies the league bonus
			var baseBonus = $(this).attr("title") * 1;
		    var leagueBonusBoost = $("#leagueBonusBoost").val() * 1;
			if (isNaN(leagueBonusBoost) === true) {
		    	leagueBonusBoost = 0;
		    }
		    var newBonus = Math.floor(baseBonus * (100 + leagueBonusBoost) / 100);
		    $(this).text(newBonus.format("#,##0[.]###"));
		    if (baseBonus === newBonus) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
		});
		// Used to calculate fill time
		var capacityArr = [];
		var prodRateArr = [];
		var prodUnitArr = []; // Used to determine whether result should be in "days" or "hours"
		var prodLevel = 0; // Used to read the correct level of production rate
		$(".ProductionRate").each(function() {
			// This takes three inputs and modifies accordingly using multiplication:
			// Gem boost, clock tower boost and Hammer Jam toggle
			var baseStr = $(this).attr("title");
			var splitArr = baseStr.split("/");
			var baseRate = 0;
			var unitStr = "";
			if (splitArr.length > 1) { //In case slash is found
				baseRate = splitArr[0].replace(/,/g,"") * 1;
				unitStr = splitArr[1];
				prodUnitArr.push(unitStr);
			} else {
				baseRate = baseStr.replace(/,/g,"") * 1;
				prodUnitArr.push("h"); // Assumed as default
			}
			var resourceBoost = $("#resourceBoost").prop("checked");
			var clockBoost = $("#clockBoost").prop("checked");
			var hammerJamBoost = $("#hammerJamBoost").prop("checked");
			
			var multiplier = 1;
			if (resourceBoost === true) {
				multiplier *= 2;
			}
			if (clockBoost === true) {
				multiplier *= 10;
			}
			if (hammerJamBoost === true) {
				multiplier *= 3;
			}
			var newRate = baseRate * multiplier;
			prodRateArr.push(newRate);
			if (splitArr.length > 1) {
				$(this).text(newRate.format("#,##0[.]###") + "/" + unitStr);
			} else {
				$(this).text(newRate.format("#,##0[.]###"));
			}
			if (baseRate == newRate) {
				$(this).removeClass("StatModifiedGP");
				$(this).removeClass("StatGemBoosted");
			} else if (resourceBoost === true || clockBoost === true) {
				$(this).addClass("StatGemBoosted");
			} else if (hammerJamBoost === true) {
				$(this).addClass("StatModifiedGP");
			}
		});
		$(".LootCapacity").each(function() {
			// This takes three inputs and modifies accordingly using multiplication:
			// Gem boost, clock tower boost and Hammer Jam toggle
			var baseCap = $(this).attr("title").replace(/,/g,"") * 1;
			var hammerJamBoost = $("#hammerJamBoost").prop("checked");
			
			var multiplier = 1;
			if (hammerJamBoost === true) {
				multiplier *= 3;
			}
			var newCap = baseCap * multiplier;
			capacityArr.push(newCap);
			$(this).text(newCap.format("#,##0[.]###"));
			if (newCap == baseCap) {
				$(this).removeClass("StatModifiedGP");
			} else {
				$(this).addClass("StatModifiedGP");
			}
		});
		// Calculate the new time taken per unit (if required)
		$(".UnitFillTime").each(function() {
			var oriStr = $(this).attr("title");
			var oriTimeTaken = readTime(oriStr);
			var newTimeTaken = 100 / (prodRateArr[prodLevel] * 100);
			var newTimeSeconds = 0;
			
			var unit = prodUnitArr[prodLevel];
			if (unit.startsWith("h") === true) {
				newTimeSeconds = Math.ceil(newTimeTaken * 60 * 60);
			} else if (unit.startsWith("d") === true) {
				newTimeSeconds = Math.ceil(newTimeTaken * 24 * 60 * 60);
			} else { // Failsafe (convert to per-second)
				newTimeSeconds = Math.ceil(newTimeTaken);
			}
			var outputStr = outputTime(newTimeSeconds);
			$(this).text(outputStr);
			// Shift one level up for the next use
			prodLevel++;
			// Styling
			if (oriStr == outputStr) {
				$(this).removeClass("StatGemBoosted");
			} else {
				$(this).addClass("StatGemBoosted");
			}
		});
		// Calculate the new time taken
		$(".FillTime").each(function() {
			var oriStr = $(this).attr("title");
			var oriTimeTaken = readTime(oriStr);
			var newTimeTaken = (capacityArr[0] * 100) / (prodRateArr[0] * 100);
			var newTimeSeconds = 0;
			// Distinguish between hours and days.
			// Use the unit name
			var unit = prodUnitArr[0];
			if (unit.startsWith("h") === true) {
				newTimeSeconds = Math.ceil(newTimeTaken * 60 * 60);
			} else if (unit.startsWith("d") === true) {
				newTimeSeconds = Math.ceil(newTimeTaken * 24 * 60 * 60);
			} else { // Failsafe (convert to per-second)
				newTimeSeconds = Math.ceil(newTimeTaken);
			}
			var outputStr = outputTime(newTimeSeconds);
			$(this).text(outputStr);
			// Clean up
			capacityArr.shift();
			prodRateArr.shift();
			prodUnitArr.shift();
			// Styling
			if (oriStr == outputStr) {
				$(this).removeClass("StatGemBoosted");
			} else {
				$(this).addClass("StatGemBoosted");
			}
		});
    });
    // Reset form when Reset button is clicked
    $(".resetBonusButton").click(function() {
        $(".changeBonusButton").text("Apply");
		$("#builderBoost, #trainingBoost, #researchBoost, #rageSpellLevel, #capitalRageSpellLevel, #lifeAuraLevel, #rageAuraLevel, #torchAuraLevel, #poisonSpellLevel, #THpoisonSpellLevel, #HHpoisonSpellLevel, #hasteSpellLevel, #capitalHasteSpellLevel, #targetHP, #apprenticeAuraLevel, #frostPotencyLevel, #eventBuilderBoost, #eventTrainingBoost, #eventResearchBoost, #leagueBonusBoost, #difficultyModeBoost").val("0").change();
		$("#starBonusBoost").val("1").change();
		$("#heroGearToggle, #hammerJamBoost, #autoForgeBoost, #armyBoost, #freezeBoost, #heroAbilityBoost, #normalAbilityBoost, #rageTowerBoost, #valkRageBoost, #poisonTowerBoost, #eventShowcaseBoost, #resourceBoost, #clockBoost").prop("checked",false);
		// Reinitialise the choices
		$("select#modifierMode").val("Attack").change();
    	// Only toggle modifier mode if it is on the page
    	if ($("select#modifierMode").val() != undefined) {
    		toggleModifierMode();
    	}
		// Reset hero gear
		hmCapEnabled = 0; // Reset this variable for level cap purposes
		refreshHeroGear();
        $("#heroGearHarness, #heroAbilityHarness").css("display","none");
        // Now reset all modified cells
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