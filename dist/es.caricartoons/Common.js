/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
 // 2. Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Vandalismo',
  'label': 'Vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo/Archivo Duplicado',
  'label': 'Duplicado'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo/Archivo Fanon',
  'label': 'Fanon'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo demasiado corto (Infraesbozo)',
  'label': 'InfEsb'};
importScriptPage('MediaWiki:Common.js/BorradoRapido.js');
 
// 3. Bloquear blogs viejos. By: [[User:Joeyaa|Joey Ahmadi]] y viene de c.wikia.com
 
$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .article-comments-li:first .permalink').attr('href');
then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
month--;
month= monthnames[month];
var day = then.match(/\d{2}$/);
then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
old = Math.floor(old/(1000*60*60*24));
if (old > 15) {
$('#article-comm').attr('disabled','disabled').text('Este blog no ha sido comentado en 15 días y está prohibido comentar en ellos.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});
 
/*** Auto-refreshing recent changes ***/
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev')
 
 
/* BOTONES EXTRAS */
/******************/
if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/caricartoons/es/images/1/10/Bot%C3%B3n_Babel.png",
     "speedTip": "Plantilla Babel",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Babel"};
    }
if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/caricartoons/es/images/0/09/Bot%C3%B3n_Babel_Personaje.png",
     "speedTip": "Plantilla Babel Personaje",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Babel Personaje"};
    }
if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/caricartoons/es/images/6/62/Bot%C3%B3n_Borrar.png",
     "speedTip": "Plantilla Borrar",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Borrar"};
    }