// 1. AutoRefreshing RecentChanges and WikiActivity -tomado de Ben10 wiki-
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');



// 2. displayTimer (Mejorado con el nuevo header) -tomado de Ben10 wiki-
importScript('MediaWiki:Common.js/displayTimer.js');