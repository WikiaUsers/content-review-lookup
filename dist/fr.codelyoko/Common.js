/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

AjaxRCRefreshText = 'Act. automatique';
AjaxRCRefreshHoverText = 'Actualiser automatiquement la page';
ajaxPages = ["Spécial:Modifications_récentes","Spécial:WikiActivity"];
importScriptPage('Voice_Dictation/voice.js', 'dev');
importScriptPage('Translator/Translator.js', 'dev');
importScriptPage('Voice_Output/code.js', 'dev');
importScriptPage('PowerPageMaker/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 // END import Onlyifediting-functions
 // ============================================================

/