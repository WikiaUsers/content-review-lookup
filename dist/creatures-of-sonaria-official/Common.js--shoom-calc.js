/* Any JavaScript here will be loaded for all users on every page load. */
$( "#submit" ).click(function() {

  var input = document.getElementById("numb").value;
  var minutes = (input/5)*2;
  
  document.getElementById("output").innerHTML = "To passively earn " + x + " Shooms, it will take " + minutes + " minutes.";
});

$(function () {
	if ($('#target').length) {
    	document.getElementById('target').innerHTML =
      '<input id="numb" type="number" style="width: 130px">';
  }
});