/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Código para la plantilla USERNAME */ function UserNameReplace() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").html(wgUserName); } addOnloadHook(UserNameReplace);
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');
importScriptPage('MediaWiki:ShareMenu/voice.js', 'dev');
importScriptPage('MediaWiki:Voice_Output/voice.js', 'dev');
importScriptPage('MediaWiki:Translator/Translator.js', 'dev');
importScriptPage('MediaWiki:PowerPageMaker/code.js', 'dev');
importScript('MediaWiki:Title.js');