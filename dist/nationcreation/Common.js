/* Nation Creation Classic Experimental Automatic Game-Year Calculator.
   Version 2.0
*/
 
//jQuery UI elements import needed for Stat Calculator
importScript('MediaWiki:Common.js/Jquery-ui.min.js‎');
 
//Stat Calculator
importScript('MediaWiki:Common.js/StatCalc.js');
 
//Auto-refresh in Recent Changes
importScriptPage('AjaxRC/code.js', 'dev');
 
//Collapsible elements
importScriptPage('ShowHide/code.js', 'dev');
 
//Primary variables
 
    var year=2012;
    var today=new Date();
 
//The variable 'h' returns the number of milliseconds from Jan. 1, 1970 until now
    var h=today.getTime();
 
//Convert it to seconds by dividing 'h' by 1000
    var a=h/1000;
 
//Now convert it to minutes by dividing 'a' by 60
    var b=a/60;
 
//And finally, convert it to hours by dividing b by 60
    var c=b/60;
 
//Primary game year function
 
function startTime()
{
//The variable 'd' subtracts 369,247 from variable 'c' to determine the day NCC
//was founded
    var d=c-369247
 
//Divide 'd' by 12 to find how many 1/2 days it has been
    var e=d/12
 
//Add 'e' to the year to get the new game year
    var f=year+e
 
//Convert 'f' to a string
    var i=f.toString();
 
//Carry out the string 4 digits, and cut off the rest (Removing unwanted decimals)
//By removing the decimals, it will appear as "2012", instead of "2012.something"
    var j=i.substring(0,4);
 
    document.getElementById('CountdownTimer').innerHTML = j;
}
 
addOnloadHook(startTime);