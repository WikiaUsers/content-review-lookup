/* Any JavaScript here will be loaded for all users on every page load. */
// Adapted from King Dragonhoff's StatueStats javascript
$(document).ready(function() {
    /* Create inputs */
	$("span#builderBoostHarness").html('<div id="builderBoostInput">Builder Boost: <select name="builderBoost" id="builderBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> </select> %</div>');
	$("span#hammerJamHarness").html('<div id="hammerJamInput">Toggle Hammer Jam? <input type="checkbox" name="hammerJamBoost" id="hammerJamBoost"></input></div>');
	$("span#trainingBoostHarness").html('<div id="trainingBoostInput">Training Boost: <select name="trainingBoost" id="trainingBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="30">30</option> </select> %</div>');
	$("span#researchBoostHarness").html('<div id="researchBoostInput">Research Boost: <select name="researchBoost" id="researchBoost"> <option value="0">0</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="30">30</option> </select> %</div>');
	$("span#armyBoostHarness").html('<div id="armyBoostInput">Toggle Army Boost? <input type="checkbox" name="armyBoost" id="armyBoost"></input></div>');
	$("span#freezeHarness").html('<div id="freezeInput">Toggle Frost? <input type="checkbox" name="freezeBoost" id="freezeBoost"></input></div>');
	$("span#normalAbilityHarness").html('<div id="normalAbilityInput">Toggle Ability? <input type="checkbox" name="normalAbilityBoost" id="normalAbilityBoost"></input></div>');
	$("span#heroAbilityHarness").html('<div id="heroAbilityInput">Toggle Hero Ability? <input type="checkbox" name="heroAbilityBoost" id="heroAbilityBoost"></input></div>');
	$("span#rageSpellHarness").html('<div id="rageSpellInput">Rage Spell Level: <select name="rageSpellLevel" id="rageSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> </select></div>');
	$("span#capitalRageSpellHarness").html('<div id="capitalRageSpellInput">Rage Spell Level: <select name="capitalRageSpellLevel" id="capitalRageSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#rageTowerHarness").html('<div id="rageTowerInput">Toggle Rage Spell Tower? <input type="checkbox" name="rageTowerBoost" id="rageTowerBoost"></input></div>');
	$("span#poisonTowerHarness").html('<div id="poisonTowerInput">Toggle Poison Spell Tower? <input type="checkbox" name="poisonTowerBoost" id="poisonTowerBoost"></input></div>')
	$("span#valkRageHarness").html('<div id="valkRageInput">Toggle Super Valkyrie Rage? <input type="checkbox" name="valkRageBoost" id="valkRageBoost"></input></div>');
	$("span#hasteSpellHarness").html('<div id="hasteSpellInput">Haste Spell Level: <select name="hasteSpellLevel" id="hasteSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#poisonSpellHarness").html('<div id="poisonSpellInput">Poison Spell Level: <select name="poisonSpellLevel" id="poisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option></select></div>');
	$("span#THpoisonSpellHarness").html('<div id="THpoisonSpellInput">TH Poison Spell Level: <select name="THpoisonSpellLevel" id="THpoisonSpellLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select></div>');
	$("span#lifeAuraHarness").html('<div id="lifeAuraInput">Life Aura Level: <select name="lifeAuraLevel" id="lifeAuraLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> <option value="13">13</option> <option value="14">14</option> <option value="15">15</option> <option value="16">16</option> <option value="17">17</option> <option value="18">18</option> <option value="19">19</option> <option value="20">20</option> <option value="21">21</option> <option value="22">22</option> <option value="23">23</option> <option value="24">24</option> <option value="25">25</option> <option value="26">26</option> <option value="27">27</option> <option value="28">28</option> <option value="29">29</option> <option value="30">30</option> <option value="31">31</option> <option value="32">32</option> <option value="33">33</option> <option value="34">34</option> <option value="35">35</option> <option value="36">36</option> <option value="37">37</option> <option value="38">38</option> <option value="39">39</option> <option value="40">40</option></select></div>');
	$("span#targetHPHarness").html('<div id="targetHPInput">Target Max HP: <input type="text" value="0" id="targetHP" style="text-align: right; width: 55px; background-color:white;"></input></div>');
	$("span#apprenticeAuraHarness").html('<div id="apprenticeAuraInput">Apprentice Warden Aura Level: <select name="apprenticeAuraLevel" id="apprenticeAuraLevel"> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option></select></div>');	
    /* Get the initial cell values, remove commas, and 
       set the cell's title attribute to its original value. */
   var heroAbilityDPH = [0];
   var heroAbilitySpeed = [];
   var heroLevel = 0;
   var deathDamageArray = [];
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
   $(".AbilityDPH").each(function() {
	  // First take the hit speed. Damage increase works on the original DPS
	  // Hero pages should only have one attack speed cell
	  var attackSpeed = $(".AttackSpeed").attr("title") * 1;
	  var damageIncrease = $(this).text().replace(/,/g,"") * (attackSpeed * 1000) / 1000;
	  heroAbilityDPH.push(damageIncrease);
   });
   $(".AbilityDI").each(function() {
	  var damageIncrease = $(this).text().replace(/%/g,"") * 1;
	  $(this).attr("title", damageIncrease);
   });
   $(".AbilitySpeed").each(function() {
      var speedIncrease = $(this).text().replace(/,/g,"") * 1;
      heroAbilitySpeed.push(speedIncrease);
   });
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
		var hammerJamCheckBox = document.getElementById("hammerJamBoost");
		// Multiply initial value by 50% if hammer jam check box is true
		if (hammerJamCheckBox != null) {
			if (hammerJamCheckBox.checked === true) {
				var hammerJamCost = discountCost(cellValueCost,50);
				var calcNewCost = discountCost(hammerJamCost,boostPercent);
			} else {
				var calcNewCost = discountCost(cellValueCost,boostPercent);
			}
		} else {
			var calcNewCost = discountCost(cellValueCost,boostPercent);
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
        var calcNewCost = discountCost(cellValueCost,boostPercent);
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
		var calcNewCost = discountCost(cellValueCost,boostPercent);
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
		var timeSeconds = readTime(str);
		var newtimeSeconds = discountTime(timeSeconds,reducePercent);
 
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
		/* Check if the string contains "d" for days. If so,
       	set the days parameter equal to the number preceding it. */
		var timeSeconds = readTime(str);
		var newtimeSeconds = discountTime(timeSeconds,reducePercent);
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
		var baseTrainTime = readTime(str);
		var newTrainTime = discountTrainTime(baseTrainTime,reducePercent);
		
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
			var costArray = [];
			for (x in initArray) {
				costArray.push(labCostShortToLong(initArray[x]));
			}
			var discountArray = arrayCostDiscount(costArray,boostPercent);
			var outputArray = [];
			for (x in discountArray) {
				outputArray.push(labCostLongToShort(discountArray[x]));
			}
			var output = labArrayToString(outputArray);
			if (hasAsterisk === true) {
				output = "*" + output;
			}
			$(this).text(output.trim());
			if (init.trim() == output.trim() || boostPercent === 0) {
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
			var timeArray = [];
			for (x in initArray) {
				timeArray.push(readTime(initArray[x]));
			}
			var discountArray = arrayTimeDiscount(timeArray,boostPercent);
			var outputArray = [];
			for (x in discountArray) {
				outputArray.push(outputTime(discountArray[x]));
			}
			var output = labArrayToString(outputArray);
			if (hasAsterisk === true) {
				output = "*" + output;
			}
			$(this).text(output.trim());
			if (init.trim() == output.trim() || boostPercent === 0) {
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
	  var auraPercentIncrease = [0,200,211,222,233,244,256,268,281,295,310,326,343,361,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900];
	  var auraMaxHPIncrease = [0,70,76,82,88,94,101,108,116,125,135,146,158,171,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410,425,440,455,470,485,500,515,530,545,560,575];
	  // Lookup arrays for the apprentice's aura ability
	  // Styled in thousandths for ease of comparison
	  var apprenticeAuraPercentIncrease = [0,240,260,280,300]
	  // And a lookup for poison attack rate decrease (used for AltDPS)
	  var poisonASMultiplier = [0,35,40,45,50,55,60,65,68,70]
		$(".AttackSpeed").each(function() {
			var initialSpeed = $(this).attr("title") * 1;
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }  
			var freezeCheckBox = document.getElementById("freezeBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
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
				attackFreq *= Math.min(poisonMultiplier,THpoisonMultiplier,poisonTowerMultiplier);
			}
			
			var freezeMultiplier = 1;
			if (freezeCheckBox != null) { // Only apply frost effect if unit is not a Builder
				if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
                freezeMultiplier = 0.5;
            	}
			}
			attackFreq *= freezeMultiplier;
			
			var normalAbilityCheckBox = document.getElementById("normalAbilityBoost");
			var normalAbilityMultiplier = 1;
			if (normalAbilityCheckBox != null) {
				if (normalAbilityCheckBox.checked === true) {
					var normalAbilityAS = $(".AbilityAS").attr("title") * 1;
					if (isNaN(normalAbilityAS) === true) {
						normalAbilityAS = 0;
					}
					normalAbilityMultiplier = (100 + normalAbilityAS) / 100;
				}
			}
			attackFreq *= normalAbilityMultiplier;
			
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
			} else if (poisonSpellLevel + THpoisonSpellLevel > 0 && $(this).hasClass("Building") === false) {
				$(this).addClass("StatPoisoned");
				$(this).removeClass("StatModified");
			} else {
				$(this).addClass("StatModified");
				$(this).removeClass("StatPoisoned");
			}
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
			}
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
					$(this).addClass("StatFrozen");
				} else {
					$(this).removeClass("StatFrozen");
				}
			}
		});
		// Make a function for calculating DPH, since some different classes (DPH and DPHRange) call on it
		function calcDPH(initialDPH,isHero,isBuilding,isStatue) {
			var rageSpellLevel = $("#rageSpellLevel").val() * 1;
			var capitalRageSpellLevel = $("#capitalRageSpellLevel").val() * 1;
			var rageTowerCheckBox = document.getElementById("rageTowerBoost");
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
		    if (isNaN(capitalRageSpellLevel) === true) {
		    	capitalRageSpellLevel = 0;
		    }
			var calcNewDPH = initialDPH;
			var rageMultiplier = 1;
			var towerRageMultiplier = 1;
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
						towerRageMultiplier = 145/100;
					} else {
						towerRageMultiplier = 19/10;
					}
				}
			}
			var rageDamage = initialDPH * Math.max(rageMultiplier,towerRageMultiplier);
			
			var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
			var heroAbilityDamageIncrease = 0;
			if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
                heroLevel++;
                var abilityLevel = Math.floor(heroLevel / 5);
                heroAbilityDamageIncrease = heroAbilityDPH[abilityLevel];
				}
			}
			var heroAbilityDamage = initialDPH + heroAbilityDamageIncrease;
			
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
			var calcNewDPH = initialDPH;
			if ($(this).hasClass("Hero") === true) {
				if ($(this).hasClass("Statue") === true) {
					calcNewDPH = calcDPH(initialDPH,true,false,true);
				} else {
					calcNewDPH = calcDPH(initialDPH,true,false,false);
				}
			} else if ($(this).hasClass("Building") === true) {
				calcNewDPH = calcDPH(initialDPH,false,true,false);
			} else {
				calcNewDPH = calcDPH(initialDPH,false,false,false);
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
		// The way it's currently coded, the ability toggle is not reusable. So re-set the hero level to zero
		heroLevel = 0;
		$(".DPS").each(function() {
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
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
			var freezeCheckBox = document.getElementById("freezeBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			if (poisonSpellLevel + THpoisonSpellLevel > 0 && $(this).hasClass("Building") === false) {
				$(this).addClass("StatPoisoned");
			} else {
				$(this).removeClass("StatPoisoned");
			}
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
			}
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
					$(this).addClass("StatFrozen");
				} else {
					$(this).removeClass("StatFrozen");
				}
			}
		});
		// Alternative DPS for different attack speeds
		$(".DPS2").each(function() {
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
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
            var freezeCheckBox = document.getElementById("freezeBoost");
            var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
            if (poisonSpellLevel + THpoisonSpellLevel > 0 && $(this).hasClass("Building") === false) {
                $(this).addClass("StatPoisoned");
            } else {
                $(this).removeClass("StatPoisoned");
            }
            if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
			}
            if (freezeCheckBox != null) {
                if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
                    $(this).addClass("StatFrozen");
                } else {
                    $(this).removeClass("StatFrozen");
                }
            }
        });
		// And (perhaps confusingly) "AltDPS", for DPS that's different due to damage bonuses on targets,
		// or simply if you just want DPS altered by buffs/debuffs without dependency on DPH
		$(".AltDPS").each(function() {
			var initialDPS = $(this).attr("title") * 1;
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
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
			// Currently this class won't support abilities. It's because there's currently no instance where this is needed
			var freezeCheckBox = document.getElementById("freezeBoost");
			var rageTowerCheckBox = document.getElementById("rageTowerBoost");
			var poisonTowerCheckBox = document.getElementById("poisonTowerBoost");
			// First calculate buffed DPS by rage
			
			var rageMultiplier = 1;
			var towerRageMultiplier = 1;
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
						towerRageMultiplier = 15/10;
					} else {
						towerRageMultiplier = 2;
					}
				}
			}
            var rageDPS = initialDPS * Math.max(rageMultiplier,towerRageMultiplier);
			// This next part takes the max of one element (because there's no support for abilities)
			// If support for abilities is required in the future, it'll make more sense
			var buffedDPS = Math.max(rageDPS);
			
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
				buffedDPS *= Math.min(poisonMultiplier,THpoisonMultiplier,poisonTowerMultiplier);
			}
			var freezeMultiplier = 1;
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
					freezeMultiplier = 0.5;
				}
			}
			buffedDPS *= freezeMultiplier;
			var finalDPS = buffedDPS.toFixed(3) * 1;
			$(this).text(finalDPS.format("#,##0[.]###"));
			if (initialDPS === finalDPS) {
				$(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
			}
			if (poisonSpellLevel + THpoisonSpellLevel > 0 && $(this).hasClass("Building") === false) {
                $(this).addClass("StatPoisoned");
            } else {
                $(this).removeClass("StatPoisoned");
            }
            if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
			}
            if (freezeCheckBox != null) {
                if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
                    $(this).addClass("StatFrozen");
                } else {
                    $(this).removeClass("StatFrozen");
                }
            }
		});
		$(".HP").each(function() {
			var initialHP = $(this).attr("title") * 1;
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
			var calcPercentHP = initialHP * (1000 + auraPercent)/1000;
			var calcMaxHP = initialHP + auraMaxHP;
			var calcWardenHP = Math.min(calcPercentHP,calcMaxHP);
			var calcApprenticeHP = initialHP * (1000 + apprenticePercent)/1000;
			var calcNewHP = Math.max(calcWardenHP,calcApprenticeHP);
			var roundedHP = Math.floor(calcNewHP * 100)/100; //Use floor function to round down to 2 d.p., since the game does this
			$(this).text(roundedHP.format("#,##0[.]###"));
			if (initialHP === roundedHP) {
                $(this).removeClass("StatModifiedGP");
            } else {
                $(this).addClass("StatModifiedGP");
            }
		});
		$(".Speed").each(function() {
			var initialSpeed = $(this).attr("title") * 1;
			var initialSpeedStr = $(this).attr("title");
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
			var poisonSpellLevel = $("#poisonSpellLevel").val() * 1;
			if (isNaN(poisonSpellLevel) === true) {
		    	poisonSpellLevel = 0;
		    }
			var THpoisonSpellLevel = $("#THpoisonSpellLevel").val() * 1;
			if (isNaN(THpoisonSpellLevel) === true) {
		    	THpoisonSpellLevel = 0;
		    }
			var heroAbilityCheckBox = document.getElementById("heroAbilityBoost");
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
            }
            var rageSpeed = initialSpeed + Math.max(rageBoost,towerRageBoost);
			var hasteSpeed = initialSpeed + hasteBoost;

			var minAbilityBoost = 0;
			var maxAbilityBoost = 0;
			// The same code can be used for both types of speed boosts (since only one of the below checkboxes will be used at a time)
			
			if (heroAbilityCheckBox != null) {
				if (heroAbilityCheckBox.checked === true) {
					if (heroAbilitySpeed.length > 0) {
					//Sorting is currently unnecessary. But if for some reason,
					//higher ability levels get a speed nerf, this is here to obtain the minimum/maximum boosts
						heroAbilitySpeed.sort(function(a, b){return a - b});
						minAbilityBoost = heroAbilitySpeed[0];
						maxAbilityBoost = heroAbilitySpeed[heroAbilitySpeed.length-1];
					}
				}
			} else if (normalAbilityCheckBox != null) {
				if (normalAbilityCheckBox.checked === true) {
					// If using the normal ability check box, there should only be one entry in the speed boost (if at all). So first check if the array isn't empty, otherwise do nothing
					if (heroAbilitySpeed.length > 0) {
						minAbilityBoost = heroAbilitySpeed[0];
						maxAbilityBoost = heroAbilitySpeed[0];
					}
				}
			}
			var minAbilitySpeed = initialSpeed + minAbilityBoost;
			var maxAbilitySpeed = initialSpeed + maxAbilityBoost;
			var minSpeed = Math.max(rageSpeed,hasteSpeed,minAbilitySpeed);
			var maxSpeed = Math.max(rageSpeed,hasteSpeed,maxAbilitySpeed);
			
			// That's all the speed buffs. Now on to the speed de-buffs (which thankfully don't conflict)
			// However, poison's speed decrease isn't linear. So we have to rely on a small lookup
			var poisonSpeedDebuff = [0,26,30,34,38,40,42,44,46,48];
			// Also a small lookup for TH poison
			var THpoisonSpeedDebuff = [0,30,35,40,45,50];
			var poisonTowerDebuff = 0;
			if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
                poisonTowerDebuff = 35;
            	}
			}
			var poisonDebuff = Math.max(poisonSpeedDebuff[poisonSpellLevel],THpoisonSpeedDebuff[THpoisonSpellLevel],poisonTowerDebuff);
			
			minSpeed = minSpeed * (100 - poisonDebuff) /100;
			maxSpeed = maxSpeed * (100 - poisonDebuff) /100;
			
			if (freezeCheckBox != null) {
				if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
					minSpeed *= 0.5;
					maxSpeed *= 0.5;
				}
			}
			
			if (minSpeed === maxSpeed) {
				var output = maxSpeed.toString();
				$(this).text(output);
			} else {
				var output = minSpeed + "-" + maxSpeed;
				$(this).text(output);
			}
			
			if (initialSpeedStr.trim() == output.trim()) {
                $(this).removeClass("StatModified");
            } else {
                $(this).addClass("StatModified");
            }
			if (poisonSpellLevel > 0 || THpoisonSpellLevel > 0) {
                $(this).addClass("StatPoisoned");
            } else {
                $(this).removeClass("StatPoisoned");
            }
            if (poisonTowerCheckBox != null) {
				if (poisonTowerCheckBox.checked === true) {
					$(this).addClass("StatPoisoned");
				} else {
					$(this).removeClass("StatPoisoned");
				}
			}
            if (freezeCheckBox != null) {
                if (freezeCheckBox.checked === true && $(this).hasClass("Builder") === false) {
                    $(this).addClass("StatFrozen");
                } else {
                    $(this).removeClass("StatFrozen");
                }
            }
		});
		//Add a look-up array for wall HTK. Also define two variables to be used inside the loop here, and reset them afterwards
		var wallHP = [300,500,700,900,1400,2000,2500,3000,3500,4000,5000,7000,9000,11000,12500,13500];
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
		$("#builderBoost, #trainingBoost, #researchBoost, #rageSpellLevel, #capitalRageSpellLevel, #lifeAuraLevel, #poisonSpellLevel, #THpoisonSpellLevel, #hasteSpellLevel, #targetHP, #apprenticeAuraLevel").val("0").change();
		if (document.getElementById("hammerJamBoost") != null) {
			document.getElementById("hammerJamBoost").checked = false;
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
        }
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