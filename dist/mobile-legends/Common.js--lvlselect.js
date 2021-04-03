/* Any JavaScript here will be loaded for all users on every page load. */
var lvlSelectElement = document.createElement("select");
var lvlSelectSpan = document.getElementById("lvlselect");
lvlSelectSpan.appendChild(lvlSelectElement);

// Create option elements
var optionTo = document.createElement("option");
optionTo.setAttribute("value","-1");
var optionNodeTo = document.createTextNode("1-15");
optionTo.appendChild(optionNodeTo);

var optionN = document.createElement("option");
optionN.setAttribute("value","0");
var optionNodeN = document.createTextNode("n");
optionN.appendChild(optionNodeN);

var option1 = document.createElement("option");
option1.setAttribute("value","1");
var optionNode1 = document.createTextNode("1");
option1.appendChild(optionNode1);

var option2 = document.createElement("option");
option2.setAttribute("value","2");
var optionNode2 = document.createTextNode("2");
option2.appendChild(optionNode2);

var option3 = document.createElement("option");
option3.setAttribute("value","3");
var optionNode3 = document.createTextNode("3");
option3.appendChild(optionNode3);

var option4 = document.createElement("option");
option4.setAttribute("value","4");
var optionNode4 = document.createTextNode("4");
option4.appendChild(optionNode4);

var option5 = document.createElement("option");
option5.setAttribute("value","5");
var optionNode5 = document.createTextNode("5");
option5.appendChild(optionNode5);

var option6 = document.createElement("option");
option6.setAttribute("value","6");
var optionNode6 = document.createTextNode("6");
option6.appendChild(optionNode6);

var option7 = document.createElement("option");
option7.setAttribute("value","7");
var optionNode7 = document.createTextNode("7");
option7.appendChild(optionNode7);

var option8 = document.createElement("option");
option8.setAttribute("value","8");
var optionNode8 = document.createTextNode("8");
option8.appendChild(optionNode8);

var option9 = document.createElement("option");
option9.setAttribute("value","9");
var optionNode9 = document.createTextNode("9");
option9.appendChild(optionNode9);

var option10 = document.createElement("option");
option10.setAttribute("value","10");
var optionNode10 = document.createTextNode("10");
option10.appendChild(optionNode10);

var option11 = document.createElement("option");
option11.setAttribute("value","11");
var optionNode11 = document.createTextNode("11");
option11.appendChild(optionNode11);

var option12 = document.createElement("option");
option12.setAttribute("value","12");
var optionNode12 = document.createTextNode("12");
option12.appendChild(optionNode12);

var option13 = document.createElement("option");
option13.setAttribute("value","13");
var optionNode13 = document.createTextNode("13");
option13.appendChild(optionNode13);

var option14 = document.createElement("option");
option14.setAttribute("value","14");
var optionNode14 = document.createTextNode("14");
option14.appendChild(optionNode14);

var option15 = document.createElement("option");
option15.setAttribute("value","15");
var optionNode15 = document.createTextNode("15");
option15.appendChild(optionNode15);


// Appending Options on Select Tag
var select = document.querySelector("select");
select.appendChild(optionTo);
select.appendChild(optionN);
select.appendChild(option1);
select.appendChild(option2);
select.appendChild(option3);
select.appendChild(option4);
select.appendChild(option5);
select.appendChild(option6);
select.appendChild(option7);
select.appendChild(option8);
select.appendChild(option9);
select.appendChild(option10);
select.appendChild(option11);
select.appendChild(option12);
select.appendChild(option13);
select.appendChild(option14);
select.appendChild(option15);

// This is test. It is not the final version.