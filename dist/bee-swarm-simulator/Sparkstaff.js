/*Spark Staff collection pattern*/
  if (window.location.pathname == "/wiki/Spark_Staff") {
  document.getElementById("collector").className = "wikitable toolbackground";
    var sparkrange = $("#collector").find("tr:nth-child(1) td:nth-child(6), tr:nth-child(11) td:nth-child(6), tr:nth-child(6) td:nth-child(11), tr:nth-child(6) td:nth-child(1), tr:nth-child(n+3):nth-child(-n+9) td:nth-child(n+2):nth-child(-n+10),tr:nth-child(2) td:nth-child(n+3):nth-child(-n+9), tr:nth-child(10) td:nth-child(n+3):nth-child(-n+9)");
var sparkanim1 = setInterval(sparkcollect, 600);
var sparkanim2 = setInterval(sparkreset, 5000);
function sparkcollect() {
  sparkrange[Math.floor(Math.random() * 81)].style.background = "rgb(63, 105, 63)";
  sparkrange[Math.floor(Math.random() * 81)].style.background = "rgb(63, 105, 63)";
  sparkrange[Math.floor(Math.random() * 81)].style.background = "rgb(63, 105, 63)";
}
function sparkreset() {
  sparkrange.css("background", "url(https://vignette.wikia.nocookie.net/bss-test-realm/images/0/07/Flowerfaded_%281%29.jpg/revision/latest?cb=20200601212849) center");
}

  }