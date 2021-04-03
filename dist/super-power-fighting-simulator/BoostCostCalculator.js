(function() {
	if (document.getElementById("boost-calc")){
		addBoostCalculator();
	}
	
	function addBoostCalculator() {
		var title = document.createTextNode("<big><b>Boost Cost Calculator - SPFS Wiki</b></big>");
		var currentLevel = createField("current", "Your current boost:");
		var finalLevel = createField("final", "The boost you want to obtain:");
		var submit = document.createElement("button");
		submit.append("Calculate");
		var valueTot = document.createTextNode("");
		var valueNext = document.createTextNode("");
		document.getElementById("boost-calc").append(
			title, newline(),
			currentLevel.label, currentLevel.input, newline(),
			finalLevel.label, finalLevel.input, newline(),
			submit, newline(),
			valueTot, newline(),
			valueNext
		);
		submit.onclick = function() {
			var currentValue = parseFloat(currentLevel.input.value.trim());
			var finalValue = parseFloat(finalLevel.input.value.trim());
			var final = 0;
			if (finalValue && finalValue > 1) {
				var final = (finalValue - 1)*100;
			}
            var tokensTot = cumulativeSum(7500, 150, current, final);
            var tokensNext = nextValue(7500, 150, current + 1);
            var tokensTotString = addCommas(tokens);
            var tokensNextString = addCommas (tokens);
            valueTot.nodeValue = "You will need " + tokensString + " Tokens to reach this boost.";
            valueNext.nodeValue = "The next upgrade will cost " + tokensNextString + "Tokens";
		};
	}
	function createField(name, description) {
        var label = document.createElement("label");
        label.htmlFor = name;
        label.append(description);
        var input = document.createElement("input");
        input.name = input.id = name;
        input.type = "number";
        return { label: label, input: input };
    }
    function createSelect(name, options, values, description) {
    	var label = document.createElement("label");
    	label.htmlFor = name;
    	label.append(description);
    	var select = document.createElement("select");
    	select.id = name;
    	for (i = 0; i < options.length; i++) {
    		var option = document.createElement("option");
    		option.value = values[i];
    		option.text = options[i];
    		select.appendChild("option");
    	}
    	return { label: label, select:select};
    }
	function newline() {
		return document.createElement("br");
	}
	function cumulativeSum(base, increase, nInit, nFin) {
		var T1 = nFin*(base + increase*(nFin-1)/2);
		var T2 = nInit*(base + increase*(nInit-1)/2);
		return T1-T2;
	}
	function nextValue(base, increase, n) {
		return base + increase*n;
	}
	function addCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}) ();