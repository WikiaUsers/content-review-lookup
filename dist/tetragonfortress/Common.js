/* Any JavaScript here will be loaded for all users on every page load. */

/* Calculator used to calculate mini-crit and crit values
for the given input values. 

This is used at the bottom of the "Critical hit" page.
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
   var reset = Math.abs(document.getElementById("start").value * 0); //define reset varible as 0
   document.getElementById("start").value = reset; //reset input value to 0
   document.getElementById("resultMinicrit").innerHTML = reset; //reset mini-crit output to 0
   document.getElementById("resultCrit").innerHTML = reset; //reset crit output to 0
});

/* Calculator used to calculate how much damage a backstab 
would do depending on the victim's health.

This is used at the bottom of the "Backstab" page*/
$(document).ready(function() {
    //lets the user select their base Overheal health
    $("#selectBackstab").html('<select id="health"><option value="185">Scout</option><option value="300">Soldier</option><option value="260">Pyro</option><option value="260">Demoman</option><option value="450">Heavy</option><option value="185">Engineer</option><option value="225">Medic</option><option value="185">Sniper</option><option value="185">Spy</option>');
    //input box if the user wishs to added more health
    $("#inputBackstab").html('<input type="text" value="0" id="addedHealth"></input>');
});
// do math when "Apply" button is clicked
$("#backstabApply").click(function (){
   var getHealth = document.getElementById("health").value; //retrieves "health"
   var getAddedHealth = document.getElementById("addedHealth").value; //retrieves "addedHealth"
   var doBackstabMath = Math.abs((getHealth * 6) + 40 + (getAddedHealth * 6)); // do the math
   document.getElementById("resultBackstab").innerHTML = doBackstabMath; //output the result
});

//reset values when "Reset" button is clicked

$("#backstabReset").click(function (){
    var resetBackstab = 0; //define reset varible as 0
    document.getElementById("inputBackstab").value = resetBackstab; //reset input value to 0
    document.getElementById("resultBackstab").innerHTML = resetBackstab; //reset output to 0
});