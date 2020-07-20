/* Any JavaScript here will be loaded for all users on every page load. */
if (typeof console != "undefined") console.log("MW:Common.js executed");

function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}
//=======================================================================
/* Experimental JS - Forms, Checkboxes, etc. */
//=======================================================================
function headerCheck() {
	var element = document.getElementById("id01");
    element.innerHTML = checkCreate(); //"New Heading";
}

function buttonCreate () {
    myButton = document.createElement("input");
    myButton.type = "button";
    myButton.value = 200;
    myButton.id = "newbutton";
    //myButton.innerText = 2;
    //myButton.onclick = "document.getElementById('button').innerText = 3";
    myButton.onclick=changeValueFunction;
    //myButton.onclick = "mybutton.button.value = '3'";
    placeHolder = document.getElementById("button");
    placeHolder.appendChild(myButton);
}

function checkCreate () {
    var myCheck = document.createElement("input");
    myCheck.type = "checkbox";
    //myCheck.value = "my check";
    placeHolder = document.getElementById("checkboxx");
    placeHolder.appendChild(myCheck);
}
function checkAdd() {
    var x = document.createElement("input");
    x.setAttribute("type", "checkbox");
    document.body.appendChild(x);
}

//This is the main function you'll want here. 
//This, along with enterHandler(), creates a text box hit point tracker.
//To use, type:
//   <div class="textinput" id="123"> </div>
// where the [id] parameter is the creature's hit point max.
//Add or subtract hit points by typing "+15" or "-25" into the text box and hitting enter.
function textCreate () {
    array = document.getElementsByTagName('span');
    var count = 0;
    for(var i=0,len=array.length; i<len; i++) {
		if (array[i].className.indexOf("textinput") > -1) {
		    var ID = count + "TXT";
		    
			myButton = document.createElement("input");
            myButton.type = "text";
            //myButton.style = "border:none; color:black; background-color: #4CAF50; text-align:center; vertical-align:center; text-decoration:none; font-size:16px; display: inline-block;";
            //myButton.id = "newbutton";
            myButton.id = ID;
            myButton.name = "TextField";
			myButton.value = "(+x/-x)";
			myButton.style = "width:50px;"
			myButton.onkeypress = enterHandler;
			//myButton.value = array[i].id;
			
			minusButton = document.createElement("input");
			minusButton.type = "button";
			minusButton.name = "indicator";
			minusButton.style = "border:none; color:black; background-color: #4CAF50; text-align:center; vertical-align:center; text-decoration:none; font-size:16px; display: inline-block;";
            minusButton.id = ID;//"minusButton";
            minusButton.value = array[i].id;
            //minusButton.onclick = "textGet(event)";
            
            array[i].appendChild(minusButton);
            array[i].appendChild(myButton);
			count++;
		}
	}
}

//This function is linked to textCreate(). 
//It handles what the function does with the text box input.
function enterHandler(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
        //this.value = "asdfFFFF";
        array = document.getElementsByName('indicator');
        for(var i=0,len=array.length; i<len; i++) {
    		if (array[i].id == this.id) {
    		    //If the user inputted a negative number, e.g. subtract hitpoints
    		    if (this.value.indexOf("-") > -1) {
    		        array[i].value = Number(array[i].value) + Number(this.value);
    		    }
    		    //If the user inputted a positive number, e.g. add hitpoints
    		    if (this.value.indexOf("+") > -1) {
    		        array[i].value = Number(array[i].value) + Number(this.value);
    		    }
    		    this.value = ""
    		}
    	}
    }
}

addOnloadHook(textCreate);
addOnloadHook(newButtonCreate);
addOnloadHook(buttonCreate);
addOnloadHook(checkCreate);

function changeValueFunction(size) {
    //alert('Res failed');
    var sTsize = size;
    document.getElementById("newbutton").value = this.value;//Number(document.getElementById("newbutton").value) - 3;// "newButtonValue";
    return;
}

function newButtonCreate () {
    /*myButton = document.createElement("input");
    myButton.type = "button";
    //myButton.value = 200;
    myButton.id = "newbutton";
    myButton.onclick=changeValueFunction;*/
    array = document.getElementsByTagName('div');
    var count = 0;
    for(var i=0,len=array.length; i<len; i++) {
		if (array[i].className.indexOf("hitpoints") > -1) {
		    var ID = count + "HP";
		    
			myButton = document.createElement("input");
            myButton.type = "button";
            myButton.style = "border:none; color:black; background-color: #4CAF50; text-align:center; vertical-align:center; text-decoration:none; font-size:16px; display: inline-block;";
            //myButton.id = "newbutton";
            myButton.id = ID;
            myButton.name = "HPtracker";
            myButton.onclick = changeValueFunction;
			myButton.value = array[i].id;

			/*myField = document.createElement("span");
			myField.style = "text-size:120%; color:red; border:1px solid;"
			myField.value = array[i].id;
			myField.name = "HPtracker";
			myField.id = ID;
			myField.innerText = array[i].id;
			myField.onclick = changeText;*/
            
			plusButton = document.createElement("input");
			plusButton.type = "button";
            plusButton.id = ID;//"plusButton";
            plusButton.value = "+";
            plusButton.onclick = incrementUp;

			minusButton = document.createElement("input");
			minusButton.type = "button";
            minusButton.id = ID;//"minusButton";
            minusButton.value = "-";
            minusButton.onclick = incrementDown;

            array[i].appendChild(minusButton);
			array[i].appendChild(myButton);
			//array[i].appendChild(myField);
			array[i].appendChild(plusButton);
			//array[i].appendChild(createTextNode("ASDF"));
			count++;
		}
	}
}

function incrementUp() {
    array = document.getElementsByName('HPtracker');
    for(var i=0,len=array.length; i<len; i++) {
		if (array[i].id == this.id) {
		    array[i].value = Number(array[i].value) + 1;
		    //array[i].innerText = "ASDF"//Number(array[i].innerText) + 1;
		}
	}
}

function incrementDown() {
    array = document.getElementsByName('HPtracker');
    for(var i=0,len=array.length; i<len; i++) {
		if (array[i].id == this.id) {
		    array[i].value = Number(array[i].value) - 1;
		}
	}
}

function changeText() {
    this.innerText = "ASDF"
}

//=======================================================================
/* Dice Roller */
//=======================================================================
function rollInit() {
	array = document.getElementsByTagName('span');
	var count = 0;
	for(var i=0,len=array.length; i<len; i++) {
		if (array[i].className.indexOf('dice_') > -1) {
			array[i].onclick = rollhandler;
			count++;
		}
	}
	if (typeof console != "undefined") console.log("Added click events to "+count+" DieRoll instances");
}
addOnloadHook(rollInit);

function rollhandler() {
	var res = /dice_([^_]*)_([0-9a+-x]*)/.exec(this.className);
	if (res) {
		rollValue(res[1],res[2]);
	} else {
		alert('Res failed');
	}
}

function rollDie(size) {
  var result = size * Math.random()
  if (result == 0) {
      result = 0.5
  }
  result = Math.ceil(result)
  return result }

function rollDice(number, size) {
  var dice = ''
  var result = ''
  var roll = 0
  var total = 0
  for (count = 0; count < number; count++) {
    roll = rollDie(size)
    total += roll
    if (dice == '') {
      dice = roll
    } else {
      dice = dice + ', ' + roll
    }
  }
  result = total + ':' + dice
  return result;
}

function getValue(data) {
  var element_array = data.split('d')
  var result = ''
  if (element_array[1] > 0) {
    result = rollDice(element_array[0], element_array[1])
  } else {
	result = element_array[0] + ':';
  }
  return result;
}

function addcommas (sValue) {
	var X= "", S = String(sValue), L;
	while (S != "") {
		L = S.length-3
		X = S.substr(L, 3) + (X > "" ? "," + X : "");
		S = S.substr(0, L);
	}
	return X;
}

function rollValue(label, data) {
  var original_data = data;
  data = data.replace(/ /g, '+')
  data = data.replace(/\-/g, '+-')
  data = data.replace(/x/g, '+x')
  data = data.replace(/\++/g, '+')
  var element_array = data.split('+')
  var dice = ''
  var result = ''
  var total = 0
  var value = 0
  var array_size = element_array.length
  for (loop = 0; loop < array_size; loop++) {
    value = getValue(element_array[loop])
    var result_array = value.split(':')
    if (result_array[0].charAt(0) == "x") {
    	var multiplier = result_array[0].substring(1);
    	total = total * multiplier;
    } else {
    	total = total + parseInt(result_array[0]);
   	}
    if (result_array[1] != '') {
      if (dice == '') {
        dice = result_array[1];
      } else {
        dice = dice + ' : ' + result_array[1];
      }
    }
  }
  if (total < 1) {
    total = 1;
  }
  if (total.length >= 3) {
	  total = addcommas(total);
  }
  data = original_data;
  if (dice != '') {
    alert(label + ' rolled: ' + total + "\n(" + data + ")\n(Rolls: " + dice + ')')
  } else {
    alert(label + ' rolled: ' + total + "\n(" + data + ')')
  }
  return false;
}

//=======================================================================
/* End Dice Roller */
//=======================================================================
/* Import 
 
importArticles({
    type: "script",
    articles: [
        'u:onepiece:MediaWiki:Common.js/elementClass.js',
        'u:dev:Toggler.js',
        'u:dev:ReferencePopups/custom.js',
        'u:joeplayground:MediaWiki:Tooltip.js'
    ]
});
 
 
/* Allow direct link to Tabber //
 
tabberOptions = {
  onLoad: function() {
    if (window.location.hash) {
      var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
      var currentTabber = this;
      $(".tabbernav li a", this.div).each(function(i) { 
        if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
      });
      /*delete currentTabber;//
    }
  }
};




//Make the DIV element draggable:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/