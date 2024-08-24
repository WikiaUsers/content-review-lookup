/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// 23:19, January 5, 2012 (UTC)
// <source lang="JavaScript">
// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
// </source>

AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');