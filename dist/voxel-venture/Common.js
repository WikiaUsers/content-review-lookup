// code for spoiler tags, similar to the ones present on reddit and discord
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

/// generic spoiler
$(".spoilerGeneric").addClass("preSpoilerGeneric");

$(".spoilerGeneric").click(function (){
 $(".spoilerGeneric").addClass("appSpoilerGeneric");
 $(".spoilerGeneric").removeClass("preSpoilerGeneric");
 $(".preSpoilerGenericA").removeClass("preSpoilerGenericA");
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
	//6
	var refineryInput6 = document.getElementById("input6").textContent;
	//7
	var refineryInput7 = document.getElementById("input7").textContent;
	//8
	var refineryInput8 = document.getElementById("input8").textContent;
	//9
	var refineryInput9 = document.getElementById("input9").textContent;
	//10
	var refineryInput10 = document.getElementById("input10").textContent;

///// outputs
	//1
	document.getElementById("inputFinal1").innerHTML = refineryInput1 * refineryMultiply;
	document.getElementById("outputFinal1").innerHTML = refineryOutput1 * refineryMultiply;
	//2
	document.getElementById("inputFinal2").innerHTML = refineryInput2 * refineryMultiply;
	document.getElementById("outputFinal2").innerHTML = refineryOutput2 * refineryMultiply;
	//3
	document.getElementById("inputFinal3").innerHTML = refineryInput3 * refineryMultiply;
	//4
	document.getElementById("inputFinal4").innerHTML = refineryInput4 * refineryMultiply;
	//5
	document.getElementById("inputFinal5").innerHTML = refineryInput5 * refineryMultiply;
	//6
	document.getElementById("inputFinal6").innerHTML = refineryInput6 * refineryMultiply;
	//7
	document.getElementById("inputFinal7").innerHTML = refineryInput7 * refineryMultiply;
	//8
	document.getElementById("inputFinal8").innerHTML = refineryInput8 * refineryMultiply;
	//9
	document.getElementById("inputFinal9").innerHTML = refineryInput9 * refineryMultiply;
	//10
	document.getElementById("inputFinal10").innerHTML = refineryInput10 * refineryMultiply;
});