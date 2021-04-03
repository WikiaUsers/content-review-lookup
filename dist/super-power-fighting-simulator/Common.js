/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
	var Units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N", "Dc", "Ud", "Dd", "Td", "Qua", "Qui", "Sxd", "Spd", "Ocd", "Nod", "Vg", "UVg", "DVg", "TVg", "QaVg", "QiVg", "SxVg", "SpVg", "OcVg", "NoVg", "Tgn"];
	var UnitsValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
	if (mw.config.get('wgUserName') !== null) {
		//Gets the user's username and inserts it inside the span section with class "insertusername"
		var spacing = "";
		if ($("span.insertusername.data-spaced" == "true")){
			spacing = " ";
		}
		$("span.insertusername").html(spacing + mw.config.get('wgUserName'));
	}
	if (document.getElementById("boost-calc")){
		addBoostCalculator();
	}
	if (document.getElementById("max-boost-calc")){
		addMaxBoostCalculator();
	}
	if (document.getElementById("space-stats-calculator")){
		addSpaceStatsCalculator();
	}
	
	function addBoostCalculator() {
		document.getElementById("boost-calc").innerHTML = "";
		//Adds a calculator for the total cost required to reach a certain boost
		var currentLevel = createField("current", "Your current boost:");
		var finalLevel = createField("final", "The boost you want to obtain:");
		var submit = document.createElement("button");
		submit.append("Calculate");
		var result = document.createTextNode("");
		document.getElementById("boost-calc").append(
			currentLevel.label, currentLevel.input, newline(),
			finalLevel.label, finalLevel.input, newline(),
			submit, newline(),
			result
		);
		submit.onclick = function() {
			//VALUE FORMATTING
			//console.log("Input1: " + currentLevel.input.value);
			//console.log("Input2: " + finalLevel.input.value);
			var currentValue = parseFloat(currentLevel.input.value.trim());
			var finalValue = parseFloat(finalLevel.input.value.trim());
			//console.log("Input_trim1: " + currentValue);
			//console.log("Input_trim2: " + finalValue);
			var final = Math.floor((finalValue - 1)*100);
			var current = 0;
			if (currentValue >= 1) {
				current = Math.floor((currentValue - 1)*100);
			}
			//ERROR HANDLING
			else if (currentValue < 1) {
				result.nodeValue = "Please insert a number greater than 1 as beginning boost.";
				return;
			}
			if (finalValue < 1) {
				result.nodeValue = "Please insert a number greater than 1 as objective boost.";
				return;
			}
			if (finalValue == 42 && currentValue == 42) {
				result.nodeValue = "The Answer has been given, now you shall wait for the Question...";
				return;
			}
			if (finalValue <= currentValue) {
				result.nodeValue = "You have already achieved this boost.";
				return;
			}
			//console.log("Input_final1: " + current);
			//console.log("Input_final2: " + final);
			//CALCULATIONS
            var tokensTot = Math.floor(cumulativeSum(7500, 150, current, final));
            var tokensNext = nextValue(7500, 150, current);
            //console.log("Total tokens: " + tokensTot);
            var tokensTotString = addCommas(tokensTot);
            var tokensNextString = addCommas (tokensNext);
            result.nodeValue = "You will need " + tokensTotString + " Tokens to reach this boost." + "\nThe next upgrade will cost " + tokensNextString + " Tokens.";
		};
	}
	
	function addMaxBoostCalculator() {
		document.getElementById("max-boost-calc").innerHTML = "";
		//Adds a calculator for which boost is obtainable with a certain amount of tokens
		var currentLevel = createField("current", "Your current boost:");
		var tokensAvailable = createField("tokens", "The tokens you have:");
		var unitSelector = createSelect("unit", ["", "K", "M"], [0, 1, 2], "Unit:");
		var submitMaxBoost = document.createElement("button");
		submitMaxBoost.append("Calculate");
		var result = document.createTextNode("");
		document.getElementById("max-boost-calc").append(
			currentLevel.label, currentLevel.input, newline(),
			tokensAvailable.label, tokensAvailable.input, unitSelector.label, unitSelector.select, newline(),
			submitMaxBoost, newline(),
			result
		);
		submitMaxBoost.onclick = function() {
			var currentValue = parseFloat(currentLevel.input.value.trim());
			var unit = parseFloat(unitSelector.select.value);
			var tokensValue = Math.floor(parseFloat(tokensAvailable.input.value.trim())*Math.pow(10,3*unit));
			var current = 0;
			if (currentValue >= 1) {
				current = Math.floor((currentValue - 1)*100);
			}
			var nextCost = nextValue(7500, 150, current);
			//ERROR HANDLING
			if (currentValue < 1) {
				result.nodeValue = "Please insert a number greater than 1 as beginning boost.";
				return;
			}
			if (tokensValue < 0) {
				result.nodeValue = "Please insert a positive number of tokens.";
				return;
			}
			if (tokensValue < nextCost) {
				result.nodeValue = "No upgrade is available, the next upgrade costs " + nextCost + " Tokens.";
				return;
			}
			//CALCULATIONS
			var values = cumulativeSumReverse(7500, 150, current, tokensValue);
			var maxUpgrade = values.maxUpgrade;
			var tokensSpent = values.tokensSpent;
			var maxBoost = ((maxUpgrade)/100+1).toFixed(2);
			var tokensSpentString = addCommas(tokensSpent);
			result.nodeValue = "With you current tokens you can reach a x" + maxBoost + " boost by spending " + tokensSpentString + " Tokens.";
		};
	}
	
	function addSpaceStatsCalculator() {
		document.getElementById("space-stats-calculator").innerHTML = "";
		var selectStat = createSelect("stat", ["Endurance", "Strength", "Psychic"], ["e", "s", "p"], "Stat:");
		var statAvailable = createField("statValue", "The total you have for the stat:");
		var unitSelector = createSelect("unit", Units, UnitsValue, "");
		var submitButton = document.createElement("button");
		submitButton.append("Calculate");
		var result = document.createElement("div");
		result.id = "spaceStat";
		result.fontSize = "large";
		document.getElementById("space-stats-calculator").append(
			document.createTextNode("SPACE STATS CALCULATOR (Beta)"), newline(),
			selectStat.label, selectStat.select, newline(),
			statAvailable.label, statAvailable.input, unitSelector.select, newline(),
			submitButton, result
			);
		submitButton.onclick = function() {
			var stat = selectStat.select.value;
			var statAmount = parseFloat(statAvailable.input.value);
			var statUnit = unitSelector.select.value;
			if (statAmount <= 0) {
				result.innerHTML = "Please insert a number higher than 0 as power.";
				return;
			}
			var spacePower = spaceStatCalc(stat, statAmount, statUnit);
			var spacePowerString = "";
			if (spacePower >= 1000){
				spacePowerString = String(Math.trunc(spacePower/10)/100)+"K";
			}
			else {
				spacePowerString = String(Math.round(spacePower));
			}
			result.className = stat;
			result.innerHTML = spacePowerString.bold();
		};
	}
	
	function createField(name, description) {
		//Creates a labelled input for numbers,
		//where "name" is the "id" for the input
		//and "description" is the label itself
        var label = document.createElement("label");
        label.htmlFor = name;
        label.append(description);
        var input = document.createElement("input");
        input.name = input.id = name;
        input.type = "number";
        return { label: label, input: input };
    }
    function createSelect(name, options, values, description) {
    	//Creates a dropdown menu, with id = name, names for the options in the
    	//"options" array, values for those in "values" array, and a label to
    	// define the selection
    	var label = document.createElement("label");
    	label.htmlFor = name;
    	label.append(description);
    	var select = document.createElement("select");
    	select.id = name;
    	for (i = 0; i < options.length; i++) {
    		var option = document.createElement("option");
    		option.value = values[i];
    		option.text = options[i];
    		select.appendChild(option);
    	}
    	return { label: label, select: select};
    }
	function newline() {
		//Creates a new-line element
		return document.createElement("br");
	}
	function cumulativeSum(base, increase, nInit, nFin) {
		//Does the cumulative sum of two number series and returns the difference
		var T1 = nFin*(base + increase*(nFin-1)/2);
		var T2 = nInit*(base + increase*(nInit-1)/2);
		return Math.floor(T1-T2);
	}
	function cumulativeSumReverse(base, increase, nInit, tokens) {
		// Returns the amount of times the sum has happened withing the number of tokens
		// and the value required
		var TInit = nInit*(base + increase*(nInit-1)/2);
		var Total = 0;
		var TotalOld = 0;
		for (var n = nInit+1; Total <= tokens; n++) {
			TotalOld = Total;
			Total = n*(base + increase*(n-1)/2) - TInit;
		}
		return {maxUpgrade: n, tokensSpent: TotalOld};
	}
	function nextValue(base, increase, n) {
		//Returns the next item of a simple mathematical series
		return base + increase*n;
	}
	function spaceStatCalc(stat, statAmount, statUnit) {
		var multi = [1000, 250];
		var threshold = [29000, 7250];
		if (stat == "e") {
			var selection = 0;
		}
		else {
			var selection = 1;
		}
		var spaceStat = (Math.log10(statAmount)+statUnit*3)*multi[selection] - threshold[selection];
		if (spaceStat < 1){
			spaceStat = 0;
		}
		return spaceStat;
	}
	function addCommas(num) {
		//Takes a number and adds commas every 3 values
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function removeCommas(num){
    	//Takes a number and removes commas from it
    	return num.replace(/^[, ]+|[, ]+$|[, ]+/g, "");
    }
    /*function fromAbbrToNum(num) {
    	//Takes an abbreviated number and returns it as a whole number
    	//W.I.P.
    	num = removeCommas(num);
    	const abbr = ['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','N','Dc','Ud',
    	'Dd','Td','Qua','Qui','Sxd','Spd','Ocd','Nov','Vg','Uvg','Dvg'];
    	var regex = "";
    	for (i = 0; i < abbr.length; i++){
    		//Search for the abbreviation in the number with regex and multiplies the value
    		regex = RegExp("\b"+abbr[i], "g");
    		if (regex.test(num)){
    			return parseFloat((/([0-9]+)/g).exec(num)*Math.pow(10,i));
    		}
    	}
    }*/
}) ();