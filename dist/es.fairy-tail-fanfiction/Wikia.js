// Etiquetas de permisos adicionales
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
 
// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
// No ocultar TOC por defecto para anónimos
window.TOCimprovementsEnabled = undefined; 

// 8. Plegado y desplegado
 
importScriptPage('ShowHide/code.js', 'dev');

// Add Hide Rail

importScriptPage('HideRail/code.js', 'dev');

// Add Purge Button
PurgeButtonText = 'Refrescar';
importScriptPage('PurgeButton/code.js', 'dev');

// Add EditIntroButton
EditIntroButtonText = 'Princ';
importScriptPage( 'EditIntroButton2/code.js', 'dev' );