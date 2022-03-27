/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */


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