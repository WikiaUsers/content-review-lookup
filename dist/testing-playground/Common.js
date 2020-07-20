function Toggle(objID) { var check = document.getElementById(objID); if (check.innerHTML == '+') { check.innerHTML = "–"; } else { check.innerHTML = "+"; } }


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var Cat_1 = getUrlVars()["fname"];

/*-Makes tables sortable-------------------------------------/
/------------------Activated on tables with class="sortable"-/
/--------Removes effect from columns with class="unsortable"-/
/-----------------------------------------------------------*/
function ts_makeSortable(table){
	var firstRow;
	if(table.rows&&table.rows.length>0){
		if(table.tHead&&table.tHead.rows.length>0){
			firstRow=table.tHead.rows[table.tHead.rows.length-1];
		}else{
			firstRow=table.rows[0];
		}
	}
	if(!firstRow)
		return;
	for(var i=0;i<firstRow.cells.length;i++){
		var cell=firstRow.cells[i];
		if((" "+cell.className+" ").indexOf(" unsortable ")==-1){
			cell.innerHTML+=' '
					+'<a href="#" class="sortheader" '
					+'onclick="ts_resortTable(this);return false;">'
					+'<span class="sortarrow">'
					+'<img src="'
					+ts_image_path
					+ts_image_none
					+'" alt="↓"/></span></a>';
		}
	}
	if(ts_alternate_row_colors){
		ts_alternate(table);
	}
}
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
 
/*-Makes tables filterable-----------------------------------/
/----------------Activated on tables with class="filterable"-/
/------Removes effect from columns with class="unfilterable"-/
/-----------------------------------------------------------*/

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

/* Any JavaScript here will be loaded for all users on every page load. */

/*-     Itenion         -------------------------------------/
/------------------------------------------------------------/
/------------------------------------------------------------/
/-----------------------------------------------------------*/
 
$('.show_L2').click(function () {for ( var hide_L2 = 0; hide_L2 < 11; hide_L2++ ) {$('.div_L2_' + hide_L2 ).hide();};$('.div_L2_' + ( $(this).attr('id') ) ).show();});
$('.show_cont').click(function () {for ( var hide_cont = 0; hide_cont < 10; hide_cont++ ) {for ( var hide_cont1 = 0; hide_cont1 < 10; hide_cont1++ ) {$('.div_cont_' + hide_cont1 + '_' + hide_cont ).hide(); }; }; $('.div_cont_' + ( $(this).attr('id') ) ).show(); });
$('.show_sub').click(function () {for ( var hide_sub = 0; hide_sub < 10; hide_sub++ ) {$('.div_sub_' + hide_sub ).hide();};$('.div_sub_' + ( $(this).attr('id') ) ).show();});
$('.hide_ST').click(function () { $('.ST_left').hide(); $('.ST_top').show(); $('.ST_right').css({ 'left': '10px' }); $('.ST_right').css({ 'top': '30px' }); $('.ST_right').css({ 'width': '-webkit-calc(100% - 10px)' }); $('.ST_right').css({ 'width': '-o-calc(100% - 10px)' }); $('.ST_right').css({ 'width': '-moz-calc(100% - 10px)' }); $('.ST_right').css({ 'width': 'calc(100% - 10px)' }); $('.hide_ST').hide(); $('.show_ST').show(); });
$('.show_ST').click(function () { $('.ST_left').show(); $('.ST_top').hide(); $('.ST_right').css({ 'left': '245px' }); $('.ST_right').css({ 'top': '0px' }); $('.ST_right').css({ 'width': '-webkit-calc(100% - 250px)' }); $('.ST_right').css({ 'width': '-o-calc(100% - 250px)' }); $('.ST_right').css({ 'width': '-moz-calc(100% - 250px)' }); $('.ST_right').css({ 'width': 'calc(100% - 250px)' }); $('.hide_ST').show(); $('.show_ST').hide(); });

/*-     Countdown Timer      --------------------------------/
/------------------------------------------------------------/
/------------------------------------------------------------/
/-----------------------------------------------------------*/



/*
$(function(){
	importArticles({
		type: "script",
		articles: ["MediaWiki:CountDown.js"]
	});
});

$(function(){importArticles({type: "script",articles: ["w:gotascent:MediaWiki:Common.js"]});});
*/


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
	AddButtons('AddButtons');
}
 
function myFunction() {
    var Now = new Date();
    var UTC = new Date(Now.getTime() + Now.getTimezoneOffset() * 60000);
 
    var Stage1 = new Date("September 1, 2014 16:00:00");
    var Stage1_Diff = Stage1 - UTC;
 
    var Stage2 = new Date("September 8, 2014 16:00:00");
    var Stage2_Diff = Stage2 - UTC;
 
    var Stage3 = new Date("September 29, 2014 16:00:00");
    var Stage3_Diff = Stage3 - UTC;
 

    if (Stage1_Diff > 0) {
        document.getElementById("Stage1").innerHTML = msToTime(Stage1_Diff);
        document.getElementById("Stage1_Counter").style.display = 'block';
        document.getElementById("Stage1_Active").style.display = 'none';
        document.getElementById("Stage1_Finished").style.display = 'none';
    } else if (Stage1_Diff > -7*24*60*60*1000) {
        document.getElementById("Stage1_Counter").style.display = 'none';
        document.getElementById("Stage1_Active").style.display = 'block';
        document.getElementById("Stage1_Finished").style.display = 'none';
    } else {
        document.getElementById("Stage1_Counter").style.display = 'none';
        document.getElementById("Stage1_Active").style.display = 'none';
        document.getElementById("Stage1_Finished").style.display = 'block';
    }

    if (Stage2_Diff > 0) {
        document.getElementById("Stage2").innerHTML = msToTime(Stage2_Diff);
        document.getElementById("Stage2_Counter").style.display = 'block';
        document.getElementById("Stage2_Active").style.display = 'none';
        document.getElementById("Stage2_Finished").style.display = 'none';
    } else if (Stage2_Diff > -21*24*60*60*1000) {
        document.getElementById("Stage2_Counter").style.display = 'none';
        document.getElementById("Stage2_Active").style.display = 'block';
        document.getElementById("Stage2_Finished").style.display = 'none';
    } else {
        document.getElementById("Stage2_Counter").style.display = 'none';
        document.getElementById("Stage2_Active").style.display = 'none';
        document.getElementById("Stage2_Finished").style.display = 'block';
    }

    if (Stage3_Diff > 0) {
        document.getElementById("Stage3").innerHTML = msToTime(Stage3_Diff);
        document.getElementById("Stage3_Counter").style.display = 'block';
        document.getElementById("Stage3_Active").style.display = 'none';
        document.getElementById("Stage3_Finished").style.display = 'none';
    } else if (Stage3_Diff > -7*24*60*60*1000) {
        document.getElementById("Stage3_Counter").style.display = 'none';
        document.getElementById("Stage3_Active").style.display = 'block';
        document.getElementById("Stage3_Finished").style.display = 'none';
    } else {
        document.getElementById("Stage3_Counter").style.display = 'none';
        document.getElementById("Stage3_Active").style.display = 'none';
        document.getElementById("Stage3_Finished").style.display = 'block';
    }

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

function AddButtons() {

// ****    PtP Buttons    ************************************************************
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

	ptp_start.onclick = function() {
		var Datum = new Date();
		Datum.setTime(Datum.getTime() + (3*60*60*1000));
		setCookie("PtP", Datum, 3);
	}
	ptp_stop.onclick = function() {
		var Datum = new Date();
		Datum.setTime(Datum.getTime() + (0));
		setCookie("PtP", Datum, 0);
	}
// ****    Adv Buttons    ************************************************************

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

	adv_stop.onclick = function() {
		var Datum = new Date();
		Datum.setTime(Datum.getTime() + (0));
		setCookie("Adv", Datum, 0);
	}
	adv_start.onclick = function() {
		var Datum = new Date();
		Datum.setTime(Datum.getTime() + (3*60*60*1000));
		setCookie("Adv", Datum, 3);
	}
}

document.getElementById('tools').addEventListener('click', function() { window.open('http://gota.jeraj.si') }, false);

function PgTitle(e) {
    document.title = e;
}