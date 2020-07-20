/* Es carregarà per a tots els usuaris, i per a qualsevol pàgina, el codi JavaScript que hi hagi després ďaquesta línia. */
 
AjaxRCRefreshText = 'Act. automàt.';
AjaxRCRefreshHoverText = 'Refresca aquesta pàgina automàticament';
ajaxPages = ["Especial:Canvis_recents","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');