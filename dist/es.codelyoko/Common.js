/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* C�digo para la plantilla USERNAME */ function UserNameReplace() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").html(wgUserName); } addOnloadHook(UserNameReplace);
 
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');
importScriptPage('MediaWiki:ShareMenu/voice.js', 'dev');
importScriptPage('MediaWiki:Voice_Output/voice.js', 'dev');
importScriptPage('MediaWiki:Translator/Translator.js', 'dev');
importScriptPage('MediaWiki:PowerPageMaker/code.js', 'dev');
importScript('MediaWiki:Title.js');