// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:EclipseCalculator.js
// To-do list: (1) Add support for percentage until next Eclipse. (2) Add support for Solar Rays gained per interval, then factor that into a 'Time' result. (3) Add limited support for numbers above e9e15.



// [WIP] Check if the page has the 'EclipseCalculator' ID. To-do: Include detection of the transclusion of the template in addition to the ID.
const eclipseCalculatorIDCheck = document.getElementById("EclipseCalculator");

if (eclipseCalculatorIDCheck === null) {
	console.log("[Eclipse Calculator] [LOG]: Template is not transcluded. Cancelling script.");
	} else {
		console.log("[Eclipse Calculator] [LOG]: Template is transcluded. Running script.");
		mw.loader.getScript('https://roblox-grass-cutting-incremental.fandom.com/index.php?title=MediaWiki:Break_eternity.js&action=raw&ctype=text/javascript'); // Import Break Eternity.
		const currentEclipseInputNode = document.createElement("input");
		const goalEclipseInputNode = document.createElement("input");
		document.getElementById("EclipseCalculator").innerHTML = "<div class='templatedesktop' style='padding:1em;background:#CC8400;text-align:center'><div style='text-align:center;font-weight:bold;font-size:20px'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c5/Eclipse.png/revision/latest?cb=20221221073807' width='75'/> Eclipse Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c5/Eclipse.png/revision/latest?cb=20221221073807' width='75'/></div><p>Current Eclipse: <input id='CurrentEclipseInput' style='width:10%'/></p><p>Desired Eclipse: <input id='GoalEclipseInput' style='width:10%'/></p><button id='CalculateButton'>Calculate</button><br><br><div style='text-align:center;font-weight:bold;border-left:0;border-right:0;border-bottom:0;border-radius:initial;background:initial'>Result:</div>At Eclipse <span id='CurrentEclipse'>?</span>, the requirement to reach Eclipse <span id='GoalEclipse'>?</span> is:<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/5/52/XP3.png/revision/latest?cb=20221219213530' width='50'/>Solar Rays: <span id='EclipseCalculatorSRReq'>?</span></div>";

		function calcSingleEclipse(eclipse) {
			eclipse = new Decimal(eclipse);
			var iteration = 0;
			var baseReq = new Decimal(100);
			var num;
			var eclipse;
			var result;
			var sum = [];
			var h = [];
			var b;
			var maxIterations;
			var highEclipse;
			if (eclipse > 1e3) { // Check if the provided Eclipse is too large to compute without draining device resources, then set the maximum iterations of the while loop.
				highEclipse = true;
				maxIterations = 50;
				} else {
				highEclipse = false;
				maxIterations = eclipse;
				}
			if (eclipse == 1) {
				result = 0;
				} else {
					while (iteration < maxIterations) {
						function addCurrentReq() {
							h.push(num);
							}
							if (highEclipse === true) {
								num = baseReq.times(new Decimal(1.05).pow(eclipse.sub(1).add(iteration)));
								} else {
								num = baseReq.times(new Decimal(1.05).pow(iteration));
								}
							addCurrentReq();
							iteration++;
							for (b = 0; b < h.length; b++) {
								if (b == 0) {
									sum[b] = h[0];
									} else {
										sum[b] = new Decimal(sum[b - 1]).add(h[b]);
										result = sum[new Decimal(b).sub(1)];
									}
								}
							}
						}
						return result;
					}
	function calcTotalEclipse() {
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
			const timeout = setTimeout(function() {
				if (calcSingleEclipse(goalEclipse).sub(calcSingleEclipse(currentEclipse)).greaterThanOrEqualTo(1e6) && calcSingleEclipse(goalEclipse).sub(calcSingleEclipse(currentEclipse)).lessThan(1e16)) {
					result = calcSingleEclipse(goalEclipse).sub(calcSingleEclipse(currentEclipse)).toExponential(3).replace(/[+]/, "");
					} else {
					result = calcSingleEclipse(goalEclipse).sub(calcSingleEclipse(currentEclipse)).toStringWithDecimalPlaces(3);
					}
				document.getElementById("EclipseCalculatorSRReq").innerHTML = result;
			}, 10);
	}
	document.getElementById("CalculateButton").addEventListener("click", calcTotalEclipse);
}