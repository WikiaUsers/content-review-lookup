/*
	JS: The following functions contains the Javascript logic
	used for all the formulas of the RR2 - Supreme Victory Calculator
*/

/*
	Contains the math helper functions: related to date and times.
*/
function mathHelpers(){
	
	/*
		This is the constant factor of the Trend excel formula (DO NOT CHANGE!)
		
		IMPORTANT: Contrary to the Excel formula, to implement the TREND
		we'd need several javascript functions which is an exaggerated effort
		given that it's ALWAYS a constant factor.
		
		NOTE: In case the value changes, change the value below as well!
	*/
	var timeTrend = -3.50007812635636;
	var timeFactorLastHour	= 24 - 16; /* Multiplier now starts at 10 and goes down to '1' in 16h */
    var slopeValue;
    var timeFactorMinimum;
    
    /*
    	Returns the result of the Slope formula
    */
    function getSlopeValue(y2, y1, x2, x1) {
    	return (y2 - y1) / (x2 - x1);
    }
    
    /*
    	Converts a Time into seconds.
    */
    function convertTimeToSeconds(hours, minutes, seconds) {
    	return seconds + minutes * 60 + hours * 60 * 60;
    }
    
    /*
    	Converts a Time into a number, by dividing
    	the time by a 24hours number (one day).
    */
    function convertTimeToFactor(hours, minutes, seconds) {
    	return convertTimeToSeconds(hours, minutes, seconds) / convertTimeToSeconds(24, 0, 0);
    }
    
    var initTimeFactors = function () {
    	var y2 = 10;
    	var y1 = 1;
    	var timeFactorMaximum = convertTimeToFactor(23, 59, 59);
    	timeFactorMinimum = convertTimeToFactor(timeFactorLastHour, 0, 0);
    
    	slopeValue = getSlopeValue(y2, y1, timeFactorMaximum, timeFactorMinimum);
    }();
    
    var getTimeFactor = function(hoursRemaining, minutesRemaining) {
    	var timeRemainingFactor;
        
        
        /*
            The Time Factor will stop decreasing after 16 hours
            have passed since the beginning of the fight.
        */
    	if (hoursRemaining < timeFactorLastHour) {
    		timeRemainingFactor = timeFactorMinimum;
    	} else {
    		timeRemainingFactor = convertTimeToFactor(hoursRemaining, minutesRemaining, 0);
    	}
    
    	return slopeValue * timeRemainingFactor + timeTrend;
    };

	return {
		"getTimeFactor": getTimeFactor
	};
}

/*
    Contains the functions to help managing the html DOM
*/
function htmlHelpers(){
    
    /*
        Gets the Input number value
    */
    function getNumberValue(inputId){
        var element = $('#' + inputId);
        
        if(element){
            return Number(element.val());    
        }
        
        return 0;
    }
    
    /*
        Gets the Input or Select text value
    */
    function getTextValue(inputId){
        var element = $('#' + inputId);
        
        if(element){
            return element.val();
        }
        
        return "";
    }
    
    /*
        Sets the Text inside an element
    */
    function setText(elementId, text){
        var element = $('#' + elementId);
        
        if(element){
            element.text(text);
        }
    }
    
    /*
        Sets Html inside an element
    */
    function setHtml(elementId, html){
        var element = $('#' + elementId);
        
        if(element){
            element.html(html);
        }
    }
    
    return {
        "getNumberValue":   getNumberValue,
        "getTextValue":     getTextValue,
        "setText":          setText,
        "setHtml":          setHtml
    };
}

/*
	Contains the functions to calculate the SupremeVictory values
*/
function supremeVictoryCalculator(calculatorId){
	
	var inputIds = {
		attacker: {
			numberOfHeroes: 		'attackerNumberOfHeroes',
			numberOfTroops: 		'attackerNumberOfTroops',
			heroesRateP5:			'attackerHeroesRateP5',
			troopsRateP1:			'attackerTroopsRateP1',
			warEnergyTech:          'attackerWarEnergyTech',
			totalSkulls:			'attackerTotalSkulls',
		},
		defender: {
			numberOfHeroes: 		'defenderNumberOfHeroes',
			numberOfTroops: 		'defenderNumberOfTroops',
			heroesRateP5:			'defenderHeroesRateP5',
			troopsRateP1:			'defenderTroopsRateP1',
			warEnergyTech:          'defenderWarEnergyTech',
			totalSkulls:			'defenderTotalSkulls'
		},
		terrainType:				'terrainType',
		watchTowerLevel:			'watchTowerLevel',
		watchTowerTerrainModifier:	'watchTowerTerrainModifier',
		hours:						'hours',
		minutes:					'minutes'		
	};
	
	var outputs = {
			attacker : {
				remainingSkulls: {
				    id:     'attackerRemainingSkulls',
				    value:  0
				},
				totalRate: {
				    id:     'totalAttackRate',
				    value:  0
				},
				participatingHeroes: {
				    id:     'attackerParticipatingHeroes',
				    value:  0
				},
				totalHeroesRate: {
				    id:     'totalHeroesAttackRate',
				    value:  0
				},
				participatingTroops: {
				    id:     'attackerParticipatingTroops',
				    value:  0
				},
				totalTroopsRate: {
				    id:     'totalTroopsAttackRate',
				    value:  0
				},
				terrainModifier: {
				    id:     'attackerTerrainModifier',
				    value:  0
				},
				warEnergyCost: {
				    id:     'attackerWarEnergyCost',
				    value:  0
				}
			},
			defender: {
				remainingSkulls: {
				    id:     'defenderRemainingSkulls',
				    value:  0
				},
				totalRate: {
				    id:     'totalDefenseRate',
				    value:  0
				},
				participatingHeroes: {
				    id:     'defenderParticipatingHeroes',
				    value:  0
				},
				totalHeroesRate: {
				    id:     'totalHeroesDefenseRate',
				    value:  0
				},
				participatingTroops: {
				    id:     'defenderParticipatingTroops',
				    value:  0
				},
				totalTroopsRate: {
				    id:     'totalTroopsDefenseRate',
				    value:  0
				},
				terrainModifier: {
				    id:     'defenseTerrainModifier',
				    value:  0
				},
				warEnergyCost: {
				    id:     'defenderWarEnergyCost',
				    value:  0
				},
				watchTowerDefenseModifier: {
				    id:     'watchTowerDefenseModifier',
				    value:  0
				}
			}
		};
	
	var terrainModifiers	= {
	    "Grassland": {
	        attack:     1,
	        defense:    0.8
	    },
		"Green Hills":	{
	        attack:     0.9,
	        defense:    1.1
	    },
		"Forest":{
	        attack:     0.7,
	        defense:    1.3
	    },
	    "Rocky Hills": {
            attack:     0.7,
            defense:    1.5 
	    },
		"Swamp": {
	        attack:     1,
	        defense:    1
	    },
	    "Desert": {
	        attack:     0.8,
	        defense:    0.5
	    },
	    "Sandy Hills": {
	        attack:     0.9,
	        defense:    0.7
	    }
	};
	
	var watchTowerTerrainModifiers = {
		"0": 1,     /* 0 = No WatchTower on the terrain*/
		"1": 1.2,
		"2": 1.5,
		"3": 2,
		"4": 2.5
	};
	
	var staticVars = {
	    "maxWarEnergyCost": 500
	};
	
	var mathCalc = mathHelpers();
	
	var htmlDOM = htmlHelpers();
	
	/*
	    Get the Output value from the memmory
	*/
	function getOutputValue(isAttacker, outputName){
	    var attackerDefender = isAttacker ? "attacker" : "defender";
	    
	    return outputs[attackerDefender][outputName].value;
	}
	
	/*
	    Set the output in-memmory and return its value
	*/
	function setOutputValue(isAttacker, outputName, value){
	    var attackerDefender = isAttacker ? "attacker" : "defender";
	    
	    var output = outputs[attackerDefender][outputName];
	    
	    if(output){
	        output.value = value;
	    }
	    
	    return value;
	}
	
	/*
	    Resets all output values
	*/
	function resetOutputs(){
	    for(var attackerDefender in outputs){
	        for(var output in outputs[attackerDefender]){
	            outputs[attackerDefender][output].value = 0;
	        }
	    }
	}
	
	/*
		Gets the total Attack or Defense Rating of the Heroes (alias, "Battle Rating")
		
		param1:heroesRatingP5 = Either the Heroes attack or defense rating +5 (0, 1, 2 or 3)
		param2:numberOfHeroes = The number of attacker or defending Heroes (players) 
	*/
	function getTotalHeroesBattleRate(isAttack, numberOfHeroes, heroesBattleRateP5){
		var totalHeroesBattleRate = (75 + heroesBattleRateP5 * 5) * numberOfHeroes;
		
		return setOutputValue(isAttack, "totalHeroesRate", totalHeroesBattleRate);
	}
	
	/*
		Gets the total Attack or Defense Rating of the Troops (alias, "Battle Rating")
		
		param1:numberOfTroops = The total number of troops (attacker or defender)
		param2:troopsRatingP1 = The troops Attack or Defense Rating +1 (0, 1, 2 or 3)
	*/
	function getTotalTroopsBattleRate(isAttack, numberOfTroops, troopsBattleRateP1){
		var totalTroopsBattleRate = numberOfTroops + numberOfTroops * troopsBattleRateP1;
		
		return setOutputValue(isAttack, "totalTroopsRate", totalTroopsBattleRate);
	}
	
	/*
		Gets the value of the Terrain modifier,
		to calculate the Total Attack or Defense Rating.
	*/
	function getTerrainModifier(isAttackModifier, terrainType){
		var terrainModifiersObj = terrainModifiers[terrainType];
		var attackDefense;
		var terrainModifier     = 0;
		
		if(terrainModifiersObj){
		    attackDefense = isAttackModifier ? "attack" : "defense";
		    
		    terrainModifier = terrainModifiersObj[attackDefense];
		} 
		
		return setOutputValue(isAttackModifier, "terrainModifier", terrainModifier);
	}
	
	/*
		Gets the Defense modifier for the WatchTower
		param1:watchTowerLevel					= The WatchTower level (1, 2, 3, 4). 0 if not a WatchTower
		param2:watchTowerTerrainModifierTech	= The Tech about WatchTower terrain modifier (0, +10, +20, +30, +40) (%)
	*/
	function getWatchTowerDefenseModifier(watchTowerLevel, watchTowerTerrainModifierTech){
		var watchTowerDefenseModifier = watchTowerTerrainModifiers[watchTowerLevel];
		
		if(watchTowerTerrainModifierTech > 0){
			watchTowerDefenseModifier *= (1 + watchTowerTerrainModifierTech/100);
		}
		
		return setOutputValue(false, "watchTowerDefenseModifier", watchTowerDefenseModifier);
	}
	
	/*
		Gets the Total AttackRating on the given terrain.
		param1:terrainName		= The type of the Terrain
		param2:numberOfTroops	= The total number of troops (attacker or defender)
		param3:troopsRatingP1	= The troops Attack or Defense Rating +1 (0, 1, 2 or 3)
		param4:heroesRatingP5	= Either the Heroes attack or defense rating +5 (0, 1, 2 or 3)
		param5:numberOfHeroes	= The number of attacker or defending Heroes (players) 
	*/
	function getTotalAttackRate(terrainType, numberOfTroops, troopsAttackRateP1, numberOfHeroes, heroesAttackRateP5){
		var troopsAttackRate		= getTotalTroopsBattleRate(true, numberOfTroops, troopsAttackRateP1);
		var heroesAttackRate		= getTotalHeroesBattleRate(true, numberOfHeroes, heroesAttackRateP5);
		var terrainAttackModifier	= getTerrainModifier(true, terrainType);
		
		var totalAttackRate         = (troopsAttackRate + heroesAttackRate) * terrainAttackModifier;
	
		return setOutputValue(true, "totalRate", totalAttackRate);
	}
	
	function getTotalDefenseRate(terrainType, numberOfTroops, troopsDefenseRateP1, numberOfHeroes, heroesDefenseRateP5, watchTowerLevel, watchTowerTerrainModifier){
		var troopsDefenseRate   		= getTotalTroopsBattleRate(false, numberOfTroops, troopsDefenseRateP1);
		var heroesDefenseRate			= getTotalHeroesBattleRate(false, numberOfHeroes, heroesDefenseRateP5);
		var terrainDefenseModifier		= getTerrainModifier(false, terrainType); 
		var watchTowerDefenseModifier	= getWatchTowerDefenseModifier(watchTowerLevel, watchTowerTerrainModifier);
		
		var totalDefenseRate            = (troopsDefenseRate + heroesDefenseRate) * terrainDefenseModifier * watchTowerDefenseModifier;
	
		return setOutputValue(false, "totalRate", totalDefenseRate);
	}
	
	/*
		Gets the Remaining skulls for the Attacker to attain the SupremeVictory
		param1:timeTrendFactor		= The Time Trend formula output
		param2:totalHeroes			= The total number of Heroes (players) of the Attacker + Defender
		param3:totalAttackRate	    = The total Attack rate (attacker) 
		param4:totalDefenseRate 	= The total Defense rate (defender)
		param5:totalAttackerSkulls	= The total number of Skulls already won by the Attacker
		param6:totalDefenderSkulls	= The total number of Skulls already won by the Defender
	*/
	function getAttackerRemainingSkulls(timeTrendFactor, totalHeroes, totalAttackRate, totalDefenseRate, totalAttackerSkulls, totalDefenderSkulls){
		var attackerRemainingSkulls = 0;
		
		if(totalAttackRate>0 && totalDefenseRate>0){
		    attackerRemainingSkulls = (timeTrendFactor * (2250 * totalHeroes) * totalDefenseRate/totalAttackRate) - totalAttackerSkulls + totalDefenderSkulls;
		    attackerRemainingSkulls = Math.round(attackerRemainingSkulls);
		}
		
		return setOutputValue(true, "remainingSkulls", attackerRemainingSkulls);
	}
	
	/*
		Gets the Remaining skulls for the Defender to attain the SupremeVictory
		param1:timeTrendFactor		= The Time Trend formula output
		param2:totalHeroes			= The total number of Heroes (players) of the Attacker + Defender
		param3:totalAttackRate	    = The total Attack rate (attacker) 
		param4:totalDefenseRate	    = The total Defense rate (defender)
		param5:totalAttackerSkulls	= The total number of Skulls already won by the Attacker
		param6:totalDefenderSkulls	= The total number of Skulls already won by the Defender
	*/
	function getDefenderRemainingSkulls(timeTrendFactor, totalHeroes, totalAttackRate, totalDefenseRate, totalAttackerSkulls, totalDefenderSkulls){
		var defenderRemainingSkulls = 0;
		
		if(totalAttackRate>0 && totalDefenseRate >0){
		    defenderRemainingSkulls = (timeTrendFactor * (2250 * totalHeroes) * totalAttackRate/totalDefenseRate) - totalDefenderSkulls + totalAttackerSkulls;
		    defenderRemainingSkulls = Math.round(defenderRemainingSkulls);
		}
		
		return setOutputValue(false, "remainingSkulls", defenderRemainingSkulls);
	}
	
	/*
	    Gets the Discout factor to be applied on the War Energy costs,
	    if the "EnergyCosts: War" tech was researched.
	    
	    param1:energyCostsWarTechModifier = The discount from the Tech (e.g.: 30%)
	*/
	function getWarEnergyDiscountFactor(energyCostsWarTechModifier){
	    if(energyCostsWarTechModifier > 0) {
	        return 1 - (energyCostsWarTechModifier / 100);    
	    }
	    return 1;
	}
	
	/*
	    Gets the EnergyCost for each Conquest battle fought by the Attacker
	    
	    param1:totalHeroesAttackRate        = The total Heroes Attack Rate (attacker)
	    param2:totalHeroesDefenseRate       = The total Heroes Defense Rate (defender)
	    param3:energyCostsWarTechModifier   = The value of the Energy War Costs Tech, if active (e.g.: 30%)
	*/
	function getAttackerWarEnergyCost(totalHeroesAttackRate, totalHeroesDefenseRate, energyCostsWarTechModifier){
	    var warEnergyCost = 0;
	    
	    if(totalHeroesAttackRate>0 && totalHeroesDefenseRate>0){
	        warEnergyCost = Math.round((16 + 16*(totalHeroesDefenseRate / totalHeroesAttackRate)) * getWarEnergyDiscountFactor(energyCostsWarTechModifier));
	    
	        if(warEnergyCost > staticVars.maxWarEnergyCost){
    	        warEnergyCost = staticVars.maxWarEnergyCost;
    	    }
	    }
	    
	    return setOutputValue(true, "warEnergyCost", warEnergyCost);
	}
	
	/*
	    Gets the EnergyCost for each Conquest battle fought by the Defender
	    
	    param1:totalHeroesAttackRate        = The total Heroes Attack Rate (attacker)
	    param2:totalHeroesDefenseRate       = The total Heroes Defense Rate (defender)
	    param3:energyCostsWarTechModifier   = The value of the Energy War Costs Tech, if active (e.g.: 30%)
	*/
	function getDefenderWarEnergyCost(totalHeroesAttackRate, totalHeroesDefenseRate, energyCostsWarTechModifier){
	    var warEnergyCost = 0;
	    
	    if(totalHeroesAttackRate>0 && totalHeroesDefenseRate>0){
	        warEnergyCost = Math.round((16 + 16*(totalHeroesAttackRate / totalHeroesDefenseRate)) * getWarEnergyDiscountFactor(energyCostsWarTechModifier));
	        
	        if(warEnergyCost > staticVars.maxWarEnergyCost){
    	        warEnergyCost = staticVars.maxWarEnergyCost;
    	    }
	    }
	    
	    return setOutputValue(false, "warEnergyCost", warEnergyCost);
	}
	
	
	/*
		Gets the Values of the Inputs to do the calculations
	*/
	function getInputValues(){
		return {
			attacker: {
				numberOfHeroes: 		htmlDOM.getNumberValue(inputIds.attacker.numberOfHeroes),
				numberOfTroops: 		htmlDOM.getNumberValue(inputIds.attacker.numberOfTroops),
				heroesRateP5:		    htmlDOM.getNumberValue(inputIds.attacker.heroesRateP5),
				troopsRateP1:		    htmlDOM.getNumberValue(inputIds.attacker.troopsRateP1),
				warEnergyTech:          htmlDOM.getNumberValue(inputIds.attacker.warEnergyTech),
				totalSkulls:			htmlDOM.getNumberValue(inputIds.attacker.totalSkulls)
			},
			defender: {
				numberOfHeroes: 		htmlDOM.getNumberValue(inputIds.defender.numberOfHeroes),
				numberOfTroops: 		htmlDOM.getNumberValue(inputIds.defender.numberOfTroops),
				heroesRateP5:		    htmlDOM.getNumberValue(inputIds.defender.heroesRateP5),
				troopsRateP1:		    htmlDOM.getNumberValue(inputIds.defender.troopsRateP1),
				warEnergyTech:          htmlDOM.getNumberValue(inputIds.defender.warEnergyTech),
				totalSkulls:			htmlDOM.getNumberValue(inputIds.defender.totalSkulls)
			},
			terrainType:				htmlDOM.getTextValue(inputIds.terrainType),
			watchTowerLevel:			htmlDOM.getNumberValue(inputIds.watchTowerLevel),
			watchTowerTerrainModifier:	htmlDOM.getNumberValue(inputIds.watchTowerTerrainModifier),
			hours:						htmlDOM.getNumberValue(inputIds.hours),
			minutes:					htmlDOM.getNumberValue(inputIds.minutes)		
		};
	}
	
	/*
		Gets the Calculation results of the Supreme Victory skulls and all intermediate values
	*/
	function calculateOutputValues(inputValues){
        var attacker    = inputValues.attacker;
        var defender    = inputValues.defender;
        
        /*
            Set Participating Heroes and Troops
            to be the same as the inputs
        */
        setOutputValue(true, 'participatingHeroes', attacker.numberOfHeroes);
        setOutputValue(true, 'participatingTroops', attacker.numberOfTroops);
        
        setOutputValue(false, 'participatingHeroes', defender.numberOfHeroes);
        setOutputValue(false, 'participatingTroops', defender.numberOfTroops);
        
	    var timeTrendFactor     = mathCalc.getTimeFactor(inputValues.hours, inputValues.minutes);
	    var totalHeroes         = attacker.numberOfHeroes + defender.numberOfHeroes;
	    var totalAttackRate     = getTotalAttackRate(inputValues.terrainType, attacker.numberOfTroops, attacker.troopsRateP1, attacker.numberOfHeroes, attacker.heroesRateP5);
	    var totalDefenseRate    = getTotalDefenseRate(inputValues.terrainType, defender.numberOfTroops, defender.troopsRateP1, defender.numberOfHeroes, defender.heroesRateP5, inputValues.watchTowerLevel, inputValues.watchTowerTerrainModifier);
	    
	    /* Calculate the War Energy Costs*/
		getAttackerWarEnergyCost(outputs.attacker.totalHeroesRate.value, outputs.defender.totalHeroesRate.value, attacker.warEnergyTech);
		getDefenderWarEnergyCost(outputs.attacker.totalHeroesRate.value, outputs.defender.totalHeroesRate.value, attacker.warEnergyTech);
		
		
		/* Calculate the Remaining Skulls*/
		getAttackerRemainingSkulls(timeTrendFactor, totalHeroes, totalAttackRate, totalDefenseRate, attacker.totalSkulls, defender.totalSkulls);
		getDefenderRemainingSkulls(timeTrendFactor, totalHeroes, totalAttackRate, totalDefenseRate, attacker.totalSkulls, defender.totalSkulls);
	}
	
	/*
	    Draw the calculator on the screen
	*/
	function draw(){
	    htmlDOM.setHtml(calculatorId, '<div id="calculator-inputs" class="conquest-calculator-inputs"><table style="width:100%">\
<tbody>\
<tr>\
<th style="min-width: 245px;">Factors</th>\
<th>Attacker</th>\
<th>Defender</th>\
</tr>\
<tr>\
<td>Number of Heroes</td>\
<td align="center"><input max="65" min="0" type="number" value="0" id="attackerNumberOfHeroes"></td>\
<td align="center"><input max="65" min="0" type="number" value="0" id="defenderNumberOfHeroes"></td>\
</tr>\
<tr>\
<td>Number of Troops</td>\
<td align="center"><input max="99999" min="0" type="number" value="0" step="100" id="attackerNumberOfTroops"></td>\
<td align="center"><input max="99999" min="0" type="number" value="0" step="100" id="defenderNumberOfTroops"></td>\
</tr>\
<tr>\
<td>Terrain</td>\
<td colspan="2" align="center">\
<select id="terrainType">\
  <option value="Grassland">Grassland</option>\
  <option value="Green Hills">Green Hills</option>\
  <option value="Forest">Forest</option>\
  <option value="Rocky Hills">Rocky Hills</option>\
  <option value="Swamp">Swamp</option>\
  <option value="Desert">Desert</option>\
  <option value="Sandy Hills">Sandy Hills</option>\
</select>\
</td>\
</tr>\
<tr>\
<td>WatchTower Level</td>\
<td colspan="2" align="center">\
<select id="watchTowerLevel">\
  <option value="0">0</option>\
  <option value="1">1</option>\
  <option value="2">2</option>\
  <option value="3">3</option>\
  <option value="4">4</option>\
</select>\
</td>\
</tr>\
<tr>\
<td>Attack/Defense Rate (Heroes) +5</td>\
<td align="center">\
<select id="attackerHeroesRateP5">\
  <option value="0">0</option>\
  <option value="1">1</option>\
  <option value="2">2</option>\
  <option value="3">3</option>\
</select>\
</td>\
<td align="center">\
<select id="defenderHeroesRateP5">\
  <option value="0">0</option>\
  <option value="1">1</option>\
  <option value="2">2</option>\
  <option value="3">3</option>\
</select>\
</td>\
</tr>\
<tr>\
<td>Attack/Defense Rate (Troops) +1</td>\
<td align="center">\
<select id="attackerTroopsRateP1">\
  <option value="0">0</option>\
  <option value="1">1</option>\
  <option value="2">2</option>\
  <option value="3">3</option>\
</select>\
</td>\
<td align="center">\
<select id="defenderTroopsRateP1">\
  <option value="0">0</option>\
  <option value="1">1</option>\
  <option value="2">2</option>\
  <option value="3">3</option>\
</select>\
</td>\
</tr>\
<tr>\
<td>Terrain Modifier (WatchTowers) %</td>\
<td align="center">\
<div style="width: 87%; background: lightgrey;">&nbsp;</div></td>\
<td align="center">\
<select id="watchTowerTerrainModifier">\
  <option value="0">0</option>\
  <option value="10">10%</option>\
  <option value="20">20%</option>\
  <option value="30">30%</option>\
</select>\
</td>\
</tr>\
<tr>\
<td>Energy Costs: War (%)</td>\
<td align="center">\
	<select id="attackerWarEnergyTech">\
		<option value="0">0</option>\
		<option value="30">-30%</option>\
	</select>\
</td>\
<td align="center">\
	<select id="defenderWarEnergyTech">\
		<option value="0">0</option>\
		<option value="30">-30%</option>\
	</select>\
</td>\
</tr>\
<tr>\
<td>Time Left [Hours] [Minutes]</td>\
<td align="center">\
    <input max="23" min="0" type="number" value="23" id="hours"></td>\
<td align="center">\
    <input max="59" min="0" type="number" value="59"  id="minutes">\
</td>\
</tr>\
<tr>\
<td>Total Skulls</td>\
<td align="center">\
    <input max="999999" min="0" type="number" value="0" step="1000" id="attackerTotalSkulls">\
</td>\
<td align="center">\
    <input max="999999" min="0" type="number" value="0" step="1000" id="defenderTotalSkulls">\
</td>\
</tr>\
<tr>\
<td></td>\
<td colspan="2" align="center"><input type="button" value="Calculate" style="width: 50%; height: 30px; margin-top: 5px;"></td>\
</tr></tbody></table></div>\
\
<div id="calculator-results" class="conquest-calculator-results">\
<div>\
<div class="header" align="left">\
<div class="header-title">Attacker</div>\
<div class="header-subtitle"><span id="attackerRemainingSkulls">-</span> more Skulls for a Supreme Victory</div>\
</div>\
<div class="versus" align="center">vs</div>\
<div class="header" align="right">\
<div class="header-title">Defender</div>\
<div class="header-subtitle"><span id="defenderRemainingSkulls">-</span> more Skulls for a Supreme Victory</div>\
</div>\
</div>\
<div class="data">\
<div class="data-col" align="left">\
<div class="data-col-header">Total Attack Rating: <span id="totalAttackRate">-</span></div>\
<div class="data-col-values">\
<div>\
	<span>Energy Cost (battle):</span>\
	<span id="attackerWarEnergyCost">-</span>\
	<span class="conquest-calculator-icon"><img src="https://vignette.wikia.nocookie.net/royal-revolt-2/images/7/77/IconConquestEnergy.png" alt="IconConquestEnergy" data-image-key="IconConquestEnergy.png" data-image-name="IconConquestEnergy.png" width="17" height="25" title="Conquest Energy"></span>\
</div>\
<div>Participating Heroes: <span id="attackerParticipatingHeroes">-</span></div>\
<div>Total Hero Attack Rating: <span id="totalHeroesAttackRate">-</span></div>\
<div>Participating Troops: <span id="attackerParticipatingTroops">-</span></div>\
<div>Total Troop Attack Rating: <span id="totalTroopsAttackRate">-</span></div>\
<div>Terrain Attack Modifier: <span id="attackerTerrainModifier">-</span></div>\
</div>\
</div>\
<div class="data-col" align="right">\
<div class="data-col-header">Total Defense Rating: <span id="totalDefenseRate">-</span></div>\
<div class="data-col-values">\
<div>\
	<span>Energy Cost (battle):</span>\
	<span id="defenderWarEnergyCost">-</span>\
	<span class="conquest-calculator-icon"><img src="https://vignette.wikia.nocookie.net/royal-revolt-2/images/7/77/IconConquestEnergy.png" alt="IconConquestEnergy" data-image-key="IconConquestEnergy.png" data-image-name="IconConquestEnergy.png" width="17" height="25" title="Conquest Energy"></span>\
</div>\
<div>Participating Heroes: <span id="defenderParticipatingHeroes">-</span></div>\
<div>Total Hero Defense Rating: <span id="totalHeroesDefenseRate">-</span></div>\
<div>Participating Troops: <span id="defenderParticipatingTroops">-</span></div>\
<div>Total Troop Defense Rating: <span id="totalTroopsDefenseRate">-</span></div>\
<div>Terrain Defense Modifier: <span id="defenseTerrainModifier">-</span></div>\
<div">WatchTower Defense Modifier: <span id="watchTowerDefenseModifier">-</span></div>\
</div>\
</div>\
</div>\
</div>');

$('#calculator-inputs input[type="button"]').click(function(){
    calculate();
});
    }
	
	/*
		Refreshes the output values on the screen, after calculating the results
	*/
	function refreshOutputs(){
		var number;
		
		for(var type in outputs){
		    for(var name in outputs[type]){
		        number = outputs[type][name].value;
		        htmlDOM.setText(outputs[type][name].id, number.toLocaleString());
		    }
		}
	}
	
	/*
		Calculates the Outputs and Updates the values on the screen
	*/
	var calculate = function(){
	    resetOutputs();
		calculateOutputValues(getInputValues());
	
		refreshOutputs();
	};
	
	return {
        "draw":         draw,
		"calculate":    calculate
	};
}

var calculator = supremeVictoryCalculator('calculator');
calculator.draw();