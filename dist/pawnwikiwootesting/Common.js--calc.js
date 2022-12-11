function myFunction() {
  var x, time, hours, minutes, seconds, track;

  x = document.getElementById("numb").value;
  time = (x/5)*2;
  
  seconds = (time*60)%60;
  hours = (time*60)/60;
  minutes = hours%60;
  hours = hours/60;
  
  document.getElementById("demo").innerHTML = "To passively earn " + x + " Shooms, it will take about " + time + " minutes.";
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