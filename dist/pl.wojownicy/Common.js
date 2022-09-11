var countDownDate = new Date("Dec 1, 2022 0:0:0").getTime();
var countDownDate2 = new Date("Nov 9, 2022, 0:0:0").getTime();
 
var x = setInterval(function() {
  var now = new Date().getTime();
 
  var distance = countDownDate - now;
  var distance2 = countDownDate2 - now;
 
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
  var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
  var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
 
  document.getElementById("timer1-d").innerHTML = days;
  document.getElementById("timer1-h").innerHTML = hours;
  document.getElementById("timer1-m").innerHTML = minutes;
  document.getElementById("timer1-s").innerHTML = seconds;
 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer1").innerHTML = "Książka wydana!";
  }
  
}, 1000);

var y = setInterval(function() {
	var now = new Date().getTime();
    
    var distance2 = countDownDate2 - now;
    
    var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
    
    document.getElementById("timer2-d").innerHTML = days2;
    document.getElementById("timer2-h").innerHTML = hours2;
    document.getElementById("timer2-m").innerHTML = minutes2;
    document.getElementById("timer2-s").innerHTML = seconds2;
    
    if (distance < 0) {
      clearInterval(y);
      document.getElementById("timer2").innerHTML = "Książka wydana!";
    }
}, 1000);