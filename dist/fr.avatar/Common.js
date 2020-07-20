/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================

/* Auto-refresh */
AjaxRCRefreshText = 'Actualisation auto.'; 
AjaxRCRefreshHoverText = 'Actualise automatiquement la page'; 
ajaxPages = ["Spécial:RecentChanges","Spécial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

$(document).ready(function () {
 if ( wgCanonicalNamespace == "Fanon" ) {
 $(".wordmark.graphic a:first-child").attr("href","/wiki/Wiki_Le_Dernier_Maître_de_l%27Air:Fanon_Avatar");

}
});