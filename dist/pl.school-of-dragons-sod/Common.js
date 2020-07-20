/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
 
//===============================================================================
//   Ostrzeżenie o braku licencji dla plików
//===============================================================================
 
 
//Licznik na żywo - w trakcie optymalizacji
 
function startTime() {
 var c_target = document.getElementById('CountdownTarget');
 var c_timer = document.getElementById('CountdownTimer');
 if(c_target != undefined) {
  var dr = Date.parse(c_target.innerHTML);
  var today=new Date();
  var dt=today.getTime();
  /*var h=today.getHours();
  var m=today.getMinutes();*/
  var s=today.getSeconds();
  var d=Math.floor((dr-dt) / 86400000);
//Teraz następuje sprawdzenie, czy czas do podanej daty już minął i ewentualne zatrzymanie licznika
 if (d<0){
   c_timer.innerHTML = '<center><tr><td>0<br /><span class="CountdownLabel">Dni</span></td><td>0<br /><span class="CountdownLabel">Godzin</span></td><td>00<br /><span  class="CountdownLabel">Minut</span></td><td>00<br /><span class="CountdownLabel">Sekund</span></td></center>';
  }
//Jeśli czas jeszcze nie minął, to skrypt jest kontynuowany
 else {
  var h1=Math.floor((dr-dt) % 86400000 / 3600000)
  var m1=Math.floor((dr-dt) % 86400000 % 3600000 / 60000)
  var s1=59-s;
 
  /*m=checkTime(m);
  s=checkTime(s);*/
  m1=checkTime(m1);
  s1=checkTime(s1);
 
   c_timer.innerHTML = '<center><tr><td>' + d + '<br /><span class="CountdownLabel">' + liczbaMnoga(d, 'Dzień', 'Dni', 'Dni') + '</span></td>' + '<td>' + h1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(h1, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>' + '<td>' + m1 + '<br /><span  class="CountdownLabel">' + liczbaMnoga(m1, 'Minutę', 'Minuty', 'Minut') + '</span></td>' + '<td>' + s1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(s1, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td></center>';
   t=setTimeout('startTime()',500);
 }
}
 }
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
 
 
//Skrypt do obliczania poprawnej formy liczby mnogiej autorstwa Vengira, optymalizowany przez Dj mateooshkę
 
function liczbaMnoga(dana,pojedyncza,mnoga1,mnoga2)
{
  if (dana==1)
  {
    return pojedyncza;
  } else if (dana%10>1&&dana%10<5&&(dana%100<12||dana%100>21)) {
    return mnoga1;
  } else {
    return mnoga2;
  }
}
addOnloadHook(startTime);
 
 
/* Any JavaScript here will be loaded for all users on every page load. */
/* ######################################################################## */
/* ### AJAX RC                                                          ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Automatically refresh "Recent changes" via AJAX     ### */
/* ### Credit:      User:pcj (http://www.wowpedia.org)                  ### */
/* ###              User:Porter21 (fallout.wikia.com)                   ### */
/* ######################################################################## */
 
var indicator = 'https://images.wikia.nocookie.net/__cb20110724185410/prototype/images/d/de/Ajax-loader.gif';
var ajaxPages = new Array("Specjalna:Filmy", "Specjalna:Ostatnie_zmiany", "Specjalna:Aktywność_na_wiki", "Specjalna:Nowe_pliki", "Specjalna:Forum");
var ajaxTimer;
var ajaxRefresh = 30000;
var refreshText = 'Auto-odświeżanie';
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
var refreshHover = 'Włącza automatyczne odświeżanie tej strony.';
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
var doRefresh = true;
 
function setCookie(c_name,value,expiredays) {
   var exdate=new Date()
   exdate.setDate(exdate.getDate()+expiredays)
   document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
 
function getCookie(c_name) {
   if (document.cookie.length>0) {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1) { 
         c_start=c_start + c_name.length+1 
         c_end=document.cookie.indexOf(";",c_start)
         if (c_end==-1) c_end=document.cookie.length
         return unescape(document.cookie.substring(c_start,c_end))
      } 
   }
   return ""
}
 
function preloadAJAXRL() {
   ajaxRLCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
   appTo = ($("#WikiaPageHeader").length)?$("#WikiaPageHeader > h1" ) : ( $( "#AdminDashboardHeader" ).length ? $( "#AdminDashboardHeader > h1" ):$(".firstHeading") );
   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + indicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
   $("#ajaxLoadProgress").ajaxSend(function (event, xhr, settings){
      if (location.href == settings.url) $(this).show();
   }).ajaxComplete (function (event, xhr, settings){
      if (location.href == settings.url) $(this).hide();
   });
   $("#ajaxToggle").click(toggleAjaxReload);
   $("#ajaxToggle").attr("checked", ajaxRLCookie);
   if (getCookie("ajaxload-"+wgPageName)=="on") loadPageData();
}
 
function toggleAjaxReload() {
   if ($("#ajaxToggle").prop("checked") == true) {
      setCookie("ajaxload-"+wgPageName, "on", 30);
      doRefresh = true;
      loadPageData();
   } else {
      setCookie("ajaxload-"+wgPageName, "off", 30);
      doRefresh = false;
      clearTimeout(ajaxTimer);
   }
}
 
function loadPageData() {
   cC = ($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";
   $(cC).load(location.href + " " + cC + " > *", function (data) { 
      if (doRefresh) ajaxTimer = setTimeout("loadPageData();", ajaxRefresh);
   });
}
addOnloadHook(function(){ for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) preloadAJAXRL() } } );
 
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});
 

// Licencje
var LicenseOptions = {
	'{{fairuse}}': 'Screen z filmu/serialu/gry',
	'{{fairuse-inne}}': 'Grafika filmowa LUB ilustracja z powieści',
	'{{copyright}}': 'Fan Art',
        '{{copyright-inne}}': 'Inna praca własnego autorstwa',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
        '{{Screenshot-Web}}': 'Screenshot strony internetowej',
        '{{Brak licencji}}': 'Prawa autorskie nieznane',
};

importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});
 

 
addOnloadHook( createCollapseButtons );