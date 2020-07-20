// ***********************************************************************************
// ****    Cookies    ****************************************************************
// ***********************************************************************************
 
function setCookie(cname,cvalue,hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
 
function getCookie(cname) {
    var Datum = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(Datum) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
 
// ***********************************************************************************
// ****    CountDown    **************************************************************
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
 
    var Stage1 = new Date("September 1, 2014 18:00:00");
    var Stage1_Diff = Stage1 - Now;
 
    var Stage2 = new Date("September 8, 2014 18:00:00");
    var Stage2_Diff = Stage2 - Now;
 
    var Stage3 = new Date("September 29, 2014 18:00:00");
    var Stage3_Diff = Stage3 - Now;
 
    var PtP=getCookie("PtP");
    if (PtP != "") {
        var PtP1 = PtP.substring(4);
        var PtP_Diff = (new Date(PtP1)) - Now;
        document.getElementById("PtP").innerHTML = msToTime(PtP_Diff);
        document.getElementById("PtP_Active").style.display = 'block';
        document.getElementById("PtP_Available").style.display = 'none';
        document.getElementById("ptp_start").disabled = true;
        document.getElementById("ptp_stop").disabled = false;
    } else {
        document.getElementById("PtP_Active").style.display = 'none';
        document.getElementById("PtP_Available").style.display = 'block';
        document.getElementById("ptp_start").disabled = false;
        document.getElementById("ptp_stop").disabled = true;
    }
 
    var Adv=getCookie("Adv");
    if (Adv != "") {
        var Adv1 = Adv.substring(4);
        var Adv_Diff = (new Date(Adv1)) - Now;
        document.getElementById("Adv").innerHTML = msToTime(Adv_Diff);
        document.getElementById("Adv_Active").style.display = 'block';
        document.getElementById("Adv_Available").style.display = 'none';
        document.getElementById("adv_start").disabled = true;
        document.getElementById("adv_stop").disabled = false;
    } else {
        document.getElementById("Adv_Active").style.display = 'none';
        document.getElementById("Adv_Available").style.display = 'block';
        document.getElementById("adv_start").disabled = false;
        document.getElementById("adv_stop").disabled = true;
    }
 
    document.getElementById("Stage1").innerHTML = msToTime(Stage1_Diff);
    document.getElementById("Stage2").innerHTML = msToTime(Stage2_Diff);
    document.getElementById("Stage3").innerHTML = msToTime(Stage3_Diff);
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

// ***********************************************************************************
// ****    Create Buttons    *********************************************************
// ***********************************************************************************

// ****    PtP Buttons    ************************************************************
/*
ptp_start_btn = document.createElement("input");
ptp_start_btn.type = "button";
ptp_start_btn.value = "Start";
ptp_start_btn.id = "ptp_start";
ptp_start_btn.style = "font-size:16px; width:75px; height:25px;";
placeHolder = document.getElementById("PtP_Btns");
placeHolder.appendChild(ptp_start_btn);

document.getElementById("PtP_Btns").innerHTML = document.getElementById("PtP_Btns").innerHTML + "&nbsp;&nbsp;&nbsp;";

ptp_reset_btn = document.createElement("input");
ptp_reset_btn.type = "button";
ptp_reset_btn.value = "Reset";
ptp_reset_btn.id = "ptp_stop";
ptp_reset_btn.style = "font-size:16px; width:75px; height:25px;";
placeHolder = document.getElementById("PtP_Btns");
placeHolder.appendChild(ptp_reset_btn);
*/
// ****    Adv Buttons    ************************************************************
/*
adv_start_btn = document.createElement("input");
adv_start_btn.type = "button";
adv_start_btn.value = "Start";
adv_start_btn.id = "adv_start";
adv_start_btn.style = "font-size:16px; width:75px; height:25px;";
placeHolder = document.getElementById("Adv_Btns");
placeHolder.appendChild(adv_start_btn);

document.getElementById("Adv_Btns").innerHTML = document.getElementById("Adv_Btns").innerHTML + "&nbsp;&nbsp;&nbsp;";

adv_reset_btn = document.createElement("input");
adv_reset_btn.type = "button";
adv_reset_btn.value = "Reset";
adv_reset_btn.id = "adv_stop";
adv_reset_btn.style = "font-size:16px; width:75px; height:25px;";
placeHolder = document.getElementById("Adv_Btns");
placeHolder.appendChild(adv_reset_btn);
*/
// ***********************************************************************************
// ****    Button Events    **********************************************************
// ***********************************************************************************

// ****    PtP Buttons    ************************************************************

var start = document.getElementById('ptp_start');
ptp_start.onclick = function() {
    var Datum = new Date();
    Datum.setTime(Datum.getTime() + (3*60*60*1000));
 
    setCookie("PtP", Datum, 3);
}
 
var stop = document.getElementById('ptp_stop');
ptp_stop.onclick = function() {
    var Datum = new Date();
    Datum.setTime(Datum.getTime() + (0));
 
    setCookie("PtP", Datum, 0);
}
 
// ****    Adv Buttons    ************************************************************

var start = document.getElementById('adv_start');
adv_start.onclick = function() {
    var Datum = new Date();
    Datum.setTime(Datum.getTime() + (3*60*60*1000));
 
    setCookie("Adv", Datum, 3);
}
 
var stop = document.getElementById('adv_stop');
adv_stop.onclick = function() {
    var Datum = new Date();
    Datum.setTime(Datum.getTime() + (0));
 
    setCookie("Adv", Datum, 0);
}