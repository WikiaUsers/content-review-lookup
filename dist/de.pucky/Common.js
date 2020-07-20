var Balken1=document.createElement("div");
Balken1.classList.add("BalkenGrau");
$(".wikiaPhotoGallery-slider-body .description-background").prepend(Balken1);

var Balken2=document.createElement("div");
Balken2.classList.add("Roterbalken");
$(".BalkenGrau").append(Balken2);

/** Username replace function
 * Inserts user name into <span class="insertusername"></span>
 * By Splarka */
 
function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
}
$(UserNameReplace);

/* AjaxRC */
ajaxPages = ['Spezial:Letzte_Änderungen'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');