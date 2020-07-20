//Basic calculator for Wikia
//Uses modified code written by Dragonfree97 (http://community.wikia.com/wiki/User%3ADragonfree97)
//Can-do: Addition, subtraction, multiplication, division
 
function numberReturn(x) {
	return x.toString();
}
 
function addition() {
	addend1 = +$("#addend1").val();
	addend2 = +$("#addend2").val();
	sum = $("#sum").val();
 
	sum = addend1 + addend2;
 
	$("#addend1").html(numberReturn(addend1));
	$("#addend2").html(numberReturn(addend2));
	$("#sum").html(numberReturn(sum));
 
}
 
function subtraction() {
	minuend = $("#minuend").val();
	subtrahend = $("#subtrahend").val();
	difference = $("#difference").val();
 
	difference = minuend - subtrahend;
 
	$("#minuend").html(numberReturn(minuend));
	$("#subtrahend").html(numberReturn(subtrahend));
	$("#difference").html(numberReturn(difference));
 
}
 
function multiplication() {
	multiplicand = $("#multiplicand").val();
	multiplier = $("#multiplier").val();
	product = $("#product").val();
 
	product = multiplicand * multiplier;
 
	$("#multiplicand").html(numberReturn(multiplicand));
	$("#multiplier").html(numberReturn(multiplier));
	$("#product").html(numberReturn(product));
 
}
 
function division() {
	dividend = $("#dividend").val();
	divisor = $("#divisor").val();
	quotient = $("#quotient").val();
 
	quotient = dividend / divisor;
 
	$("#dividend").html(numberReturn(dividend));
	$("#divisor").html(numberReturn(divisor));
	$("#quotient").html(numberReturn(quotient));
 
}
 
function calculator() {
  $.showCustomModal( 'Calculator', '<div id="calculator-form" style="width:400px;"><tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="addend1"></td><tr></tr><br><tr></tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="addend2"></td></td><tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="addition-button" onClick="addition();">Add!</button></td></tr><tr></tr><br><b>Total: <span id="sum">0</span></b><br><br><tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="minuend"></td><tr></tr><br><tr></tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="subtrahend"></td></td><tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="subtraction-button" onClick="subtraction();">Subtract!</button></td></tr><tr></tr><br><b>Total: <span id="difference">0</span></b></div><br><br><tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="multiplicand"></td><tr></tr><br><tr></tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="multiplier"></td></td><tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="multiplication-button" onClick="multiplication();">Multiply!</button></td></tr><tr></tr><br><b>Total: <span id="product">0</span></b><br><br><tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="dividend"></td><tr></tr><br><tr></tr><td style="text-align: right;"><input style="width: 100px;" type="number" value="0" id="divisor"></td></td><tr><td colspan="2" style="text-align:center; padding: 5px;"><button id="division-button" onClick="division();">Divide!</button></td></tr><tr></tr><br><b>Total: <span id="quotient">0</span></b></div>');
  }
 
var calc = $('<li><a id="calculator">Calculator</a></li>');
 
$(window.WikiaBar.wikiaBarWrapperObj.find('.tools')).append(calc);
 
calc = $('#calculator');
calc.one('click', function (e) {
  e.stopPropagation();
 
  calc.click(function (e) {
    e.stopPropagation();
    calculator();
  });
});