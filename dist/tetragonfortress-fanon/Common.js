/* 
Calculator for damage to be converted into mini-crits and crits
and is used at User_blog:BrandadCheeser4/Calculator_for_mini-crits_and_crits
*/

// input
$(document).ready(function() {
   $("#box").html('<input type="text" value="0" id="start"></input>'); //input box
});

// do math when "Apply" button is clicked

$("#applyButton").click(function() {
	var minicritMultiply = Math.abs(document.getElementById("start").value * 1.35);  //math for mini-crits
	var critMultiply = Math.abs(document.getElementById("start").value * 3); // math for crits
	document.getElementById("resultMinicrit").innerHTML = minicritMultiply; //output math for m-crits
    document.getElementById("resultCrit").innerHTML = critMultiply; //output math for crits
});
 
 // reset the values when "Reset" button is clicked

$("#resetButton").click(function() {
   var reset = Math.abs(document.getElementById("start").value * 0); //reset input value to 0
   document.getElementById("start").value = reset;
   document.getElementById("resultMinicrit").innerHTML = reset; //reset mini-crit output to 0
   document.getElementById("resultCrit").innerHTML = reset; //reset crit output to 0
});