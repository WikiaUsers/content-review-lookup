/* Any JavaScript here will be loaded for all users on every page load. */
$(".spoiler").click(function (){
 $(".spoiler").addClass("appSpoiler");
 $(".spoiler").removeClass("preSpoiler");
 $(".preSpoilerA").removeClass("preSpoilerA");
});

/* for refinery thing */

$(document).ready(function() {
	$("#box").html('<input type="text" value="1" id="start"></input>');
});

$("#apply").click(function() {
	var refineryMultiply = document.getElementById("start").value;
	//1
	var refineryInput1 = document.getElementById("input1").textContent;
	var refineryOutput1 = document.getElementById("output1").textContent;
	//2
	var refineryInput2 = document.getElementById("input2").textContent;
	var refineryOutput2 = document.getElementById("output2").textContent;
	//3
	var refineryInput3 = document.getElementById("input3").textContent;
	//4
	var refineryInput4 = document.getElementById("input4").textContent;
	//5
	var refineryInput5 = document.getElementById("input5").textContent;

///// outputs
	//1
	document.getElementById("inputFinal1").innerHTML = Math.abs(refineryInput1 * refineryMultiply);
	document.getElementById("outputFinal1").innerHTML = Math.abs(refineryOutput1 * refineryMultiply);
	//2
	document.getElementById("inputFinal2").innerHTML = Math.abs(refineryInput2 * refineryMultiply);
	document.getElementById("outputFinal2").innerHTML = Math.abs(refineryOutput2 * refineryMultiply);
	//3
	document.getElementById("inputFinal3").innerHTML = Math.abs(refineryInput3 * refineryMultiply);
	//4
	document.getElementById("inputFinal4").innerHTML = Math.abs(refineryInput4 * refineryMultiply);
	//5
	document.getElementById("inputFinal5").innerHTML = Math.abs(refineryInput5 * refineryMultiply);
});

//Math.abs(refineryInput1 * refineryMultiply1);