// March speed calculator
function calcMarchSpeed() {
	var speed = parseInt(document.getElementById("speed-inputbox").value);
	var tiles = parseInt(document.getElementByid("tiles-inputbox").value);
	var time = tiles / speed;
	
	document.getElementsByClassName("march-speed-result")[0].innerText = time;
}

if(window.location.href == "https://totalbattle.fandom.com/wiki/Interactive:March_speed_calculator") {
	// Additions to page
	document.getElementsByClassName("speed-input")[0].innerHTML += "<input id=\"speed-inputbox\" />";
	document.getElementsByClassName("tiles-input")[0].innerHTML += "<input id=\"tiles-inputbox\" />";
	document.getElementsByClassName("button-calc")[0].innerHTML += "<button id=\"calcbutton\" onclick=\"calcMarchSpeed();\">Calculate</button>";
	
	// Pre-set values
	document.getElementById("speed-inputbox").value = "0";
	document.getElementById("tiles-inputbox").value = "0";

	document.getElementById("calcbutton").addEventListener("click", function() {
		var speed = parseInt(document.getElementById("speed-inputbox").value);
		var tiles = parseInt(document.getElementByid("tiles-inputbox").value);
		var time = tiles / speed;
		
		document.getElementsByClassName("march-speed-result")[0].innerText = time;
	});
}