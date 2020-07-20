/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Licencje plików
var LicenseOptions = {
   '{{Brak_licencji}}': 'Nie znam licencji',
   '{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
   '{{Art}}': 'fanart bądź art (rysunki, szkice, itp.)',
   '{{Komiks}}': 'Strona i/lub okładka komiksu Żywe Trupy.',
   '{{Screenshot}}': 'screenshot z serialu, filmu lub gry',
   '{{Screenshot-Web}}': 'screenshot ze strony internetowej',
   '{{CC-BY-SA}}': 'Pliki na licencji Creative Commons',
   '{{Copyright}}': 'Zastrzeżone prawa autorskie',
   '{{PD}}': 'Plik znajduje się w domenie publicznej',
   '{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};

// Import
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});


// Licznik by Nanaki
function getTimeCountText(time) {
    amount = Math.floor((time - new Date().getTime())/1000);
    if(amount < 0) return false;
 
    var days = Math.floor(amount / 86400);
    amount = amount % 86400;
    var hours = Math.floor(amount / 3600);
    amount = amount % 3600;
    var mins = Math.floor(amount / 60);
    amount = amount % 60;
    var secs = Math.floor(amount);
 
    var list = [];
    if (days > 0) {
        list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
    }
    if (hours > 0) {
        list.push('<span span="hours">' + hours + ' h</span>');
    }
    list.push('<span span="minutes">' + mins + ' m</span>');
    list.push('<span span="seconds">' + secs + ' s</span>');
 
    return list.join(' ');
}
function countBoxTick(box) {
    console.log(this)
    var time = box.data('time');
    var res = getTimeCountText(time);
    if(res) {
        box.html(res);
        setTimeout(function() {
            countBoxTick(box)
        }, 1000);
    } else {
        box.html('Oczekuj!');
    }
}
$('.countbox').each(function() {
    if($(this).data('date')) {
        var time = new Date($(this).data('date')).getTime();
        if(!isNaN(time)) {
            $(this).data('time', time);
            countBoxTick($(this));
        } else {
            $(this).html('Niepoprawna data')
        }
    }
});

// Komunikat licencji
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została dodana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji mogą zostać usunięte przez administrację po 3 dniach od ich wstawienia."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});

///[[Szablon:Użytkownik]]
if (wgUserName != null/* && span.insertusername != undefined*/) {
    $(".insertusername").html(wgUserName);
}

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