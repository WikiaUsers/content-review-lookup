/* Sostituisce {{USERNAME}} col nome dell'utente che lo visualizza.
   Richiede il Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
$(UserNameReplace);
/* End of the {{USERNAME}} replacement */

 /* Funzione copiata da http://nonciclopedia.wikia.com */
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
 
 importArticles({
    type: 'script',
    articles: [
        'u:kocka:MediaWiki:AjaxThreadDelete/code.js'
    ]
});
     
$(alertLoad)

window.ImprovedTabbers = {
        HideHeaderTitle: true,
        HideContentTitle: true,
        HumanReadableAnchor: true,
        SynchroInfoboxes: false,
        SynchroTabbers: false,
};