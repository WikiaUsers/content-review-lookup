	alertLink();
	setTimeout(alertLoad, 1);
	alertUnload();
/* Generatori di alert */

/* Carica un alert su un link prima di caricare la nuova pagina, oppure su un link "fasullo", senza caricare nessuna nuova pagina*/
function alertLink() {
 for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
  if((Elem.getAttribute('id') == "alert-link") || (Elem.getAttribute('id') == "alert-nolink")) {
   var Link = Elem.firstChild;
   var Testo = Elem.title;
   Link.setAttribute('onclick', 'alert("' + Testo + '");');
   if(Elem.getAttribute('id') == "alert-nolink") {
    Link.removeAttribute('href',0);
   }
  }
 }
}

/* Carica uno o più alert al caricamento della pagina */
var disablealertLoad = 0;
function alertLoad() {
 if (disablealertLoad) return;
 for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
  if(Elem.getAttribute('id') == "alert-load") {
   var Testo = Elem.innerText || Elem.textContent;
   alert(Testo);
  }
 }
}


/* Carica uno o più alert all'uscita dalla pagina */
function alertUnload() {
 if (disablealertLoad) return;
 for(var i=0; Elem = document.getElementsByTagName("span")[i]; i++) {
  if(Elem.getAttribute('id') == "alert-unload") {
   var Testo = Elem.innerText || Elem.textContent;
   var temp = document.getElementsByTagName("body")[0].getAttribute('onUnload');
   if (temp) document.getElementsByTagName("body")[0].setAttribute('onUnload', temp + 'alert("' + Testo + '");');
    else document.getElementsByTagName("body")[0].setAttribute('onUnload', 'alert("' + Testo + '");');
  }
 }
}

/* Carica stile redirect */
ottieniDiv = document.getElementsByTagName("div");
if(ottieniDiv.indexOf == "#RINVIA") {
alert("ciao")
}