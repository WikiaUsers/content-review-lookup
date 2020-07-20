$( "#fence_slope_slider" ).slider({
    max:101,
    step:1,
    value:50
});

var slider_value2 = $( "#fence_slope_slider" ).slider( "option", "value" );
document.getElementById("skill2").innerHTML = slider_value2;
var slider_value1 = slider_value2 - 1; document.getElementById("skill1").innerHTML = slider_value1;
var slider_value3 = slider_value2 + 1;
document.getElementById("skill3").innerHTML = slider_value3;

var slider_value4 = Math.floor((3 * Math.sqrt(slider_value1)) + 10);
document.getElementById("slope1").innerHTML = slider_value4;
var slider_value5 = Math.floor((3 * Math.sqrt(slider_value2)) + 10);
document.getElementById("slope2").innerHTML = slider_value5;
var slider_value6 = Math.floor((3 * Math.sqrt(slider_value3)) + 10);
document.getElementById("slope3").innerHTML = slider_value6;

$( "#fence_slope_slider" ).on( "slide", function( event, ui ) {
  var slider_value2 = $( "#fence_slope_slider" ).slider( "value" );
  var slider_value1 = slider_value2 - 1;
  var slider_value3 = slider_value2 + 1;
  // Max slope = (3 * √skill) + 10;
  var slider_value4 = Math.floor((3 * Math.sqrt(slider_value1)) + 10);
  var slider_value5 = Math.floor((3 * Math.sqrt(slider_value2)) + 10);
  var slider_value6 = Math.floor((3 * Math.sqrt(slider_value3)) + 10);
  document.getElementById("skill1").innerHTML = slider_value1;
  document.getElementById("skill2").innerHTML = slider_value2;
  document.getElementById("skill3").innerHTML = slider_value3;
  document.getElementById("slope1").innerHTML = slider_value4;
  document.getElementById("slope2").innerHTML = slider_value5;
  document.getElementById("slope3").innerHTML = slider_value6;
});