// Cualquier código insertado aquí JavaScript será cargado para todos los usuarios
// ------------------------------------------------------------------------------------

// 1. Subir
importScriptPage('MediaWiki:Common.js/subir.js');

// 2. NOMBREUSUARIO
importScriptPage('MediaWiki:Common.js/nombreUsuario.js');

// 3. Cuenta regresiva
importScriptPage('MediaWiki:Common.js/cuentaRegresiva.js');
 
// 4. Botones extras
importScript('MediaWiki:Common.js/botonesExtras.js');

// 5. Mostrar enlace a Ben 10 Wiki
importScript('MediaWiki:Common.js/cambiarwiki.js');

// 6. Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Vandalismo',
  'accesskey': '1',
  'label': 'V'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo/Archivo Duplicado',
  'accesskey': '2',
  'label': 'D'};
fdButtons[fdButtons.length] = {
  'summary': 'Sin consentimiento del autor',
  'accesskey': '3',
  'label': 'SC'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo demasiado corto (Infraesbozo)',
  'accesskey': '4',
  'label': 'E'};
fdButtons[fdButtons.length] = {
  'summary': 'Contenido no permitido',
  'accesskey': '5',
  'label': 'NP'};
fdButtons[fdButtons.length] = {
  'summary': 'A petición del mismo autor',
  'accesskey': '6',
  'label': 'P'};
fdButtons[fdButtons.length] = {
  'summary': 'Redirección doble/dañada ',
  'accesskey': '7',
  'label': 'RD'};
importScriptPage('MediaWiki:Common.js/borradoRápido.js', 'es.ben10');

// 7. Refrescar automáticamente páginas específicas
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:PáginasNuevas"];
importScriptPage('AjaxRC/code.js', 'dev');

// 8. ShowHide
importScriptPage('ShowHide/code.js', 'dev');

// 9. Mensaje solo visible para admins
importScriptPage('MediaWiki:Common.js/soloAdmin.js');

// 10. Borrado masivo (runescape)
if(wgPageName == 'Ben_10_fanon_Wiki:Borrado_masivo')
    importScript('MediaWiki:Common.js/massdelete.js');

// 11. Chat
importScriptPage('MediaWiki:Chat.js');