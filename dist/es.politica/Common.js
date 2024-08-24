// Plantilla:UserNick
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
// Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'El artículo no se relaciona al tema del wiki',
  'accesskey': '1',
  'label': 'Sin relación'};
fdButtons[fdButtons.length] = {
  'summary': 'Su contenido era considerado basura total o parcialmente',
  'accesskey': '2',
  'label': 'Basura'};
fdButtons[fdButtons.length] = {
  'summary': 'Tenía contenidos no aprobados por los Términos de Uso o por las normas del wiki',
  'accesskey': '3',
  'label': 'Inapropiado'};
fdButtons[fdButtons.length] = {
  'summary': 'El autor solicito su borrado',
  'accesskey': '4',
  'label': 'Autor'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido publicado no estaba confirmado, pudiendo ser especulaciones',
  'accesskey': '5',
  'label': 'Confirmación'};
fdButtons[fdButtons.length] = {
  'summary': 'El escrito era contenido inventado por el autor, para contenidos fanon visítese [[w:c:es.fanon|Fanon Wiki]]',
  'accesskey': '6',
  'label': 'Fanon'};
fdButtons[fdButtons.length] = {
  'summary': 'El artículo era excesivamente corto. Puedes crear este artículo siempre y cuando tenga la información suficiente.',
  'accesskey': '7',
  'label': 'Infra-esbozo'};
fdButtons[fdButtons.length] = {
  'summary': 'Limpiando.',
  'accesskey': '8',
  'label': 'Limpieza'};
importArticle({type: 'script', article: 'w:c:es.pintorsmeargle:MediaWiki:Common.js/borradoRápido.js'});
/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');