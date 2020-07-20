/* Any JavaScript here will be loaded for all users on every page load. */

AjaxRCRefreshText = 'Act. automată';
AjaxRCRefreshHoverText = 'Actualizaţi această pagină în mod automat';
ajaxPages = ["Special:Schimbări_recente","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importScript('MediaWiki:Common.js/DisplayTimer.js');