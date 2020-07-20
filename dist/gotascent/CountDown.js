// ***********************************************************************************
// ****    Cookies
// ***********************************************************************************
 
function setCookie(cname,cvalue,hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
 
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
 
function checkCookie() {
    var Datum=getCookie("PtP");
    if (user != "") {
        alert(Datum);
    } else {
        // else condition
    }
}
 
// ***********************************************************************************
// ****    CountDown
// ***********************************************************************************
 
window.onload = function() {
		countdown('countdown');
}
 
function countdown(element) {
	interval = setInterval(function() {
		myFunction('myFunction');
	}, 1000);
}
 
function myFunction() {
    var Now = new Date();
 
    var Stage1 = new Date("September 8, 2014 18:00:00");
    var Stage1_Diff = Stage1 - Now;
 
    var Stage2 = new Date("September 29, 2014 18:00:00");
    var Stage2_Diff = Stage2 - Now;
 
    var Stage3 = new Date("October 6, 2014 18:00:00");
    var Stage3_Diff = Stage3 - Now;
 
    var PtP = new Date();
    var PtP_Diff = PtP - Now;
 
    var Adv = new Date();
    var Adv_Diff = PtP - Now;
 
    var n = Stage2.getUTCHours();
    document.getElementById("Stage1").innerHTML = msToTime(Stage1_Diff);
    document.getElementById("Stage2").innerHTML = msToTime(Stage2_Diff);
    document.getElementById("Stage3").innerHTML = msToTime(Stage3_Diff);
    document.getElementById("PtP").innerHTML = msToTime(PtP_Diff);
    document.getElementById("Adv").innerHTML = msToTime(Adv_Diff);
}
 
function msToTime(s) {
  function addZ(n) {
    return (n<10? '0':'') + n;
  }
 
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  s = (s - mins) / 60
  var hrs = s % 24;
  var days = (s - hrs) / 24
 
  return addZ(days) + ':' + addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs);
}
 
var start = document.getElementById('start');
start.onclick = function() {
    var Datum = new Date();
    setCookie("PtP", Datum, 4);
}
 
var stop = document.getElementById('stop');
stop.onclick = function() {
    checkCookie()
}