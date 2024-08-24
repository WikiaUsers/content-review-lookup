//Stat Calculator
importScript('MediaWiki:Common.js/StatCalc.js');

//Countdown feature
if ($('.page-Missions').length > 0){

$(document).ready(function startTime() {

var d= new Date();
var ms = d.getTime();
var ms1 = ms - 33600000;
var ms2 = 43200000 - (ms1 % 43200000);
var h = Math.floor(ms2 / 3600000);
var m = Math.floor((ms2 % 3600000) / 60000);
var s = Math.floor(((ms2 % 3600000) % 60000) / 1000);
m = checkTime(m);
s = checkTime(s);
document.getElementById('CountdownTimer').innerHTML = h + ":" + m + ":" + s;
t=setTimeout(function(){startTime()},500);

function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
});
}

//AutoRefreshing RecentChanges and WikiActivity
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar página automaticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
var ajaxRefresh = 30000;
importScriptPage('AjaxRC/code.js', 'dev');