/* Any JavaScript here will be loaded for all users on every page load. */
if (typeof console != "undefined") console.log("MW:Common.js executed");
 
function addLoadEvent(func) 
{
  if (window.addEventListener) 
    window.addEventListener("load", func, false);
  else if (window.attachEvent) 
    window.attachEvent("onload", func);
}
 
/* Dice Roller */
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
/* End Dice Roller */