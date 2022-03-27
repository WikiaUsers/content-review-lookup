/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

AjaxRCRefreshText = 'Act. automatique';
AjaxRCRefreshHoverText = 'Actualiser automatiquement la page';
ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 

 
 // END import Onlyifediting-functions
 // ============================================================