/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
// 23:19, January 5, 2012 (UTC)
// <source lang="JavaScript">
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
// </source>

AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');