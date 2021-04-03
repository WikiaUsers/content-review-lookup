/* Auto-odświeżanie OZ i nie tylko */
/* Z dev.wikia.com */
ajaxPages = ["Specjalna:Ostatnie_zmiany","Specjalna:Rejestr","Specjalna:Wkład"];
AjaxRCRefreshText = 'Autoodświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie odświeża stronę';

importArticles({type: 'script', articles: ['u:dev:MediaWiki:AjaxRC.js']});