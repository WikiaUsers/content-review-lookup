/* Any JavaScript here will be loaded for all users on every page load. */
function myFunction() {
  var x, time, minutes;

  x = document.getElementById("numb").value;
  time = (x/5)*2;
  minutes = time;
 
  document.getElementById("demo").innerHTML = "To passively earn " + x + " Shooms, it will take about " + minutes + " minutes.";
}

$(function () {
  if ($('#shoom-calc').length) {
    document.getElementById('shoom-calc').innerHTML =
      '<p>Please input the desired amount of Shooms:</p>' +
      '<input id="numb" type="number" style="width: 130px">' +
      '<button type="button" onclick="myFunction()">Submit</button>' +
      '<p><p id="demo"></p></p>';
  }
});