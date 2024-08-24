/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
////////////////////////////////////////////////////////////////
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Code courtesy of "pcj" of WoWWiki.
////////////////////////////////////////////////////////////////

ajaxPages = new Array("Especial:CambiosRecientes", "Especial:Seguimiento", "Especial:Registro");

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

function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 60000;
function preloadAJAXRC() {
if (skin == "monaco") {
s = 1;
} else {
s = 0;
}
ajaxRCCookie = (getCookie("ajaxload-"+wgPageName)=="on") ? true:false;
document.getElementsByTagName("h1")[0].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Activar auto-refrescante cargas de la página">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxload-"+wgPageName)=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxload-"+wgPageName, "on", 30);
loadRCData();
} else {
setCookie("ajaxload-"+wgPageName, "off", 30);
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/" + wgPageName + location.search;
} else {
rcURL = "http://" + location.hostname + "/" + wgPageName + location.search;
}
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

for (x in ajaxPages) {
if (wgPageName == ajaxPages[x]) addOnloadHook(preloadAJAXRC);
}

// == Código para artículos destacados ==
 
function Bueno()
{
   // iterate over all <span>-elements
   for (var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      // if found a FA span
      if(a.className == "destacado") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a FA link
            if (b.className == "interwiki-" + a.id) {
               b.className += " destacado";
               b.title = "Este es un artículo destacado en esta Wikipedia.";
            }
         }
      }
   }
}
 
if (window.addEventListener) window.addEventListener("load",LinkFA,false);
else if (window.attachEvent) window.attachEvent("onload",LinkFA);
 
 
function LinkAB() 
{
   // iterate over all <span>-elements
   for (var i=0; a = document.getElementsByTagName("span")[i]; i++) {
      if(a.className == "bueno") {
         // iterate over all <li>-elements
         for(var j=0; b = document.getElementsByTagName("li")[j]; j++) {
            // if found a AB link
            if (b.className == "interwiki-" + a.id) {
               b.className += " bueno";
               b.title = "Este es un artículo bueno en esta Wikipedia.";
            }
         }
      }
   }
}
 
if (window.addEventListener) window.addEventListener("load",LinkAB,false);
else if (window.attachEvent) window.attachEvent("onload",LinkAB);


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// FIN DE AJAX AUTO-REFRESH

///////////////////////////////////////////////////////////////////////////////////////////////////////////