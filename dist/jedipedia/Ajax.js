/*-----------------------------------------------------------------*\
||   Automatische Aktualisierung der Letzten Änderungen mit AJAX   ||
||                                                                 ||
|| Funktionsliste:                                                 ||
|| ajaxRC.init()         Initialisiert das Skript                  ||
|| ajaxRC.toggle();      Wenn das Kästchen angeklickt wird         ||
|| ajaxRC.load();        Lade den Code der Seite neu               ||
|| ajaxRC.parse();       Aktualisiere die Anzeige der Seite        ||
|| ajaxRC.disable();     Skript wird bei Inaktivität ausgeschaltet ||
|| ajaxRC.disableCheck();Skript wird bei Inaktivität ausgeschaltet ||
\*-----------------------------------------------------------------*/

//Setze Cookie, damit das Kästchen in Zukunft automatisch aktiviert ist
function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function getCookie(c_name) {
	if (document.cookie.length>0) {
		var c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1;
			var c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

var ajaxRC=new Object();
// CONFIG //
ajaxRC.ajaxPages=new Array("Special:RecentChanges", "Spezial:Letzte_Änderungen", "Spezial:Letzte Änderungen",
	"Special:Watchlist", "Spezial:Beobachtungsliste",
	"Special:Log", "Spezial:Logbuch",
	"Special:Contributions", "Spezial:Beiträge",
	"Special:Statistics", "Spezial:Statistik");//Seiten, die aktualisiert werden sollen
ajaxRC.refresh=30*1000;//Nach wie vielen Millisekunden die Seite erneut geladen werden soll
ajaxRC.regexp_crlf=new RegExp('\r|\n', "gm");
ajaxRC.regexp_start=new RegExp('.*<div id="bodyContent">', "mi");
ajaxRC.regexp_end=new RegExp('<div class="visualClear">.*', "mi");
// INIT-VARIABLES //
ajaxRC.activated=false;
ajaxRC.disabled=false;
ajaxRC.request=null;
ajaxRC.interval=null;
ajaxRC.disableTimeout=null;
ajaxRC.checkbox=null;
ajaxRC.spinner=null;
// FUNCTIONS //
ajaxRC.init=function() {//Fügt das Ankreuzkästchen am Anfang der Seite hinzu
	document.getElementById("firstHeading").innerHTML+='<div style="float:right;"><span id="ajaxspinner" style="visibility: hidden; vertical-align: -30%;"><sup><img src="/wiki/images/Ajax-loader.gif" alt="Inhalt wird aktualisiert..."></sup></span>&nbsp;<span style="font-size: xx-small; vertical-align: 12%;">Automatische Aktualisierung:</span> <input type="checkbox" id="ajaxRCtoggle" onClick="ajaxRC.toggle();"></div>';
	ajaxRC.checkbox=document.getElementById("ajaxRCtoggle");
	ajaxRC.spinner=document.getElementById("ajaxspinner");
	if (getCookie("ajaxload-"+wgPageName) == "on") {
		ajaxRC.checkbox.checked=true;
		ajaxRC.toggle();
	}
}
ajaxRC.toggle=function() {//Kästchen wurde angeklickt (sowohl Aktivierung wie auch Deaktivierung)
	ajaxRC.activated=ajaxRC.checkbox.checked;
	if (ajaxRC.activated==true) {//Aktivierung
		setCookie("ajaxload-"+wgPageName, "on", 30);
		ajaxRC.load();
		ajaxRC.interval=window.setInterval(ajaxRC.load, ajaxRC.refresh);
	} else {//Deaktvierung
		ajaxRC.request=null;
		ajaxRC.spinner.style.visibility="hidden";
		setCookie("ajaxload-"+wgPageName, "off", 30);
		window.clearInterval(ajaxRC.interval);
	}
}
ajaxRC.load=function() {//Starte eine Anfrage nach neuen Inhalten
	ajaxRC.request=getXmlHttpRequestObject();
	if (ajaxRC.request.readyState==0 || ajaxRC.request.readyState==4) {
		ajaxRC.spinner.style.visibility="visible";
		ajaxRC.request.onreadystatechange=ajaxRC.parse;
		ajaxRC.request.open("GET", document.URL, true);
		ajaxRC.request.send(null);
	}
}
ajaxRC.parse=function() {//Wenn Antwort kommt
	if (ajaxRC.request.readyState==4) {
		ajaxRC.spinner.style.visibility="hidden";
		document.getElementById("bodyContent").innerHTML=ajaxRC.request.responseText.replace(ajaxRC.regexp_crlf,"").replace(ajaxRC.regexp_start,"").replace(ajaxRC.regexp_end,"");
	}
}
ajaxRC.disable=function() {//Wenn die Seite nicht mehr angesehen wird
	ajaxRC.disabled=true;
	window.clearInterval(ajaxRC.interval);//Stoppe Aktualisierung
}
ajaxRC.disableCheck=function() {//Wenn die Maus 
	if (ajaxRC.activated==true) {
		if (ajaxRC.disabled==true) {
			ajaxRC.disabled=false;
			ajaxRC.load();
			ajaxRC.interval=window.setInterval(ajaxRC.load, ajaxRC.refresh);
		}
		window.clearTimeout(ajaxRC.disableTimeout);
		ajaxRC.disableTimeout=window.setTimeout(ajaxRC.disable,100*60*5);//5 Minuten
	}
}

for (var j=0; j<ajaxRC.ajaxPages.length; j++) {//Prüft, ob aktuelle Seite AJAX-Aktualisierung enthalten soll, und fügt, falls ja, ein Kästchen ein
	if (wgPageName == ajaxRC.ajaxPages[j]) {
		addOnloadHook(ajaxRC.init);
		window.onmousemove=ajaxRC.disableCheck();
		break;
	}
}