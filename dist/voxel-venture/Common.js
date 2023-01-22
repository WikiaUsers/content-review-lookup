// code to create a spoiler thing like in reddit or discord
/////// (for the reviewers, look at [[User:BrandadCheeser4]] to see examples of this code in use)
/// lectern chapter I
$(".spoiler").addClass("preSpoiler");

$(".spoiler").click(function (){
 $(".spoiler").addClass("appSpoiler");
 $(".spoiler").removeClass("preSpoiler");
 $(".preSpoilerA").removeClass("preSpoilerA");
});

/// lectern chapter II
$(".spoiler2").addClass("preSpoiler2");

$(".spoiler2").click(function (){
 $(".spoiler2").addClass("appSpoiler2");
 $(".spoiler2").removeClass("preSpoiler2");
 $(".preSpoiler2A").removeClass("preSpoiler2A");
});

/// lectern chapter III
$(".spoiler3").addClass("preSpoiler3");

$(".spoiler3").click(function (){
 $(".spoiler3").addClass("appSpoiler3");
 $(".spoiler3").removeClass("preSpoiler3");
 $(".preSpoiler3A").removeClass("preSpoiler3A");
});

/// lectern chapter IV
$(".spoiler4").addClass("preSpoiler4");

$(".spoiler4").click(function (){
 $(".spoiler4").addClass("appSpoiler4");
 $(".spoiler4").removeClass("preSpoiler4");
 $(".preSpoiler4A").removeClass("preSpoiler4A");
});

// for Template:Refinery

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