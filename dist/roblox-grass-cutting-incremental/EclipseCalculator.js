// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:EclipseCalculator.js
// To-do list: (1) Add support for percentage until next Eclipse. (2) Add support for Solar Rays gained per interval, then factor that into a 'Time' result. (3) Add limited support for numbers above e9e15.



// [WIP] Check if the page has the 'EclipseCalculator' ID. To-do: Include detection of the transclusion of the template in addition to the ID.
const eclipseCalculatorIDCheck = document.getElementById("EclipseCalculator");

if (eclipseCalculatorIDCheck === null) {
	console.log("[Eclipse Calculator] [LOG]: Template is not transcluded. Cancelling script.");
	} else {
		console.log("[Eclipse Calculator] [LOG]: Template is transcluded. Running script.");
		mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
		mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:SuffixConverter.js&action=raw&ctype=text/javascript'); // Import Suffix Converter.

		document.getElementById("EclipseCalculator").innerHTML = "<div class='templatedesktop' style='padding:1em;background:#CC8400;text-align:center'><div style='text-align:initial;width:10%;padding:1em;background:initial' class='templatedesktop'>Toggle Suffixes<button style='background:#FF0000' id='ECSuffixButton'>Disabled</button></div><div style='text-align:center;font-weight:bold;font-size:20px'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c5/Eclipse.png/revision/latest?cb=20221221073807' width='75'/> Eclipse Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c5/Eclipse.png/revision/latest?cb=20221221073807' width='75'/></div><p>Current Eclipse: <input id='CurrentEclipseInput' style='width:10%'/></p><p>Desired Eclipse: <input id='GoalEclipseInput' style='width:10%'/></p><button id='ECCalculateButton'>Calculate</button><br><br><div style='text-align:center;font-weight:bold;border-left:0;border-right:0;border-bottom:0;border-radius:initial;background:initial'>Result:</div>At Eclipse <span id='CurrentEclipse'>?</span>, the requirement to reach Eclipse <span id='GoalEclipse'>?</span> is:<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/52/XP3.png/revision/latest?cb=20221219213530' width='50'/>Solar Rays: <span id='EclipseCalculatorSRReq'>?</span></div>";
		var suffixStatus = false;
		
		function calcEclipseReq() { // Function for calculating total Solar Ray requirement from current Eclipse to goal Eclipse.
		document.getElementById("EclipseCalculatorSRReq").innerHTML = "Calculating...";
			var currentEclipse;
			var goalEclipse;
			if (document.getElementById("CurrentEclipseInput").value === '') {
				currentEclipse = new Decimal(1);
			} else {
				currentEclipse = new Decimal(document.getElementById("CurrentEclipseInput").value).floor();
			}
			if (document.getElementById("GoalEclipseInput").value === '') {
				goalEclipse = new Decimal(2);
			} else {
				goalEclipse = new Decimal(document.getElementById("GoalEclipseInput").value).floor();
			}
			document.getElementById("CurrentEclipse").innerHTML = currentEclipse.valueOf();
			document.getElementById("GoalEclipse").innerHTML = goalEclipse.valueOf();
			var result = new Decimal( (new Decimal(100).times( new Decimal(1.05).pow((goalEclipse.sub(1))) )).dividedBy(1.05-1).sub( (new Decimal(100).times( new Decimal(1.05).pow((currentEclipse.sub(1)))) ).dividedBy(1.05-1)));
			const timeout = setTimeout(function() {
				if (result.greaterThanOrEqualTo(1e6) && result.lessThan(1e16)) {
					result = result.toExponential(3).replace(/[+]/, "");
					} else {
					result = result.toStringWithDecimalPlaces(3);
					}
					if (currentEclipse.greaterThan(goalEclipse)) {
						document.getElementById("EclipseCalculatorSRReq").innerHTML = "<span class='rainbow' style='font-weight:bold;font-size:20px'>Error!</span>";
					} else if (suffixStatus === true && new Decimal(result).greaterThanOrEqualTo(1e6) && new Decimal(result).lessThan(1e303)) {
						document.getElementById("EclipseCalculatorSRReq").innerHTML = convertToSuffix(result);
					} else if (new Decimal(result).greaterThanOrEqualTo(1e3) && new Decimal(result).lessThan(1e6)) {
						document.getElementById("EclipseCalculatorSRReq").innerHTML = Number(result).toLocaleString();
					} else {
						document.getElementById("EclipseCalculatorSRReq").innerHTML = result;
					}
			}, 10);
	}
	function toggleSuffixes() { // Function for toggling suffix notation and updating the output.
		if (suffixStatus === false) {
			suffixStatus = true;
			document.getElementById("ECSuffixButton").innerHTML = "Enabled";
			document.getElementById("ECSuffixButton").setAttribute("style", "background:#00FF00");
			calcEclipseReq();
		} else {
			suffixStatus = false;
			document.getElementById("ECSuffixButton").innerHTML = "Disabled";
			document.getElementById("ECSuffixButton").setAttribute("style", "background:#FF0000");
			calcEclipseReq();
		}
	}
		
	document.getElementById("ECCalculateButton").addEventListener("click", calcEclipseReq);
	document.getElementById("ECSuffixButton").addEventListener("click", toggleSuffixes);
}