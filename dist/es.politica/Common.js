// Plantilla:UserNick
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
// Borrado r�pido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'El art�culo no se relaciona al tema del wiki',
  'accesskey': '1',
  'label': 'Sin relaci�n'};
fdButtons[fdButtons.length] = {
  'summary': 'Su contenido era considerado basura total o parcialmente',
  'accesskey': '2',
  'label': 'Basura'};
fdButtons[fdButtons.length] = {
  'summary': 'Ten�a contenidos no aprobados por los T�rminos de Uso o por las normas del wiki',
  'accesskey': '3',
  'label': 'Inapropiado'};
fdButtons[fdButtons.length] = {
  'summary': 'El autor solicito su borrado',
  'accesskey': '4',
  'label': 'Autor'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido publicado no estaba confirmado, pudiendo ser especulaciones',
  'accesskey': '5',
  'label': 'Confirmaci�n'};
fdButtons[fdButtons.length] = {
  'summary': 'El escrito era contenido inventado por el autor, para contenidos fanon vis�tese [[w:c:es.fanon|Fanon Wiki]]',
  'accesskey': '6',
  'label': 'Fanon'};
fdButtons[fdButtons.length] = {
  'summary': 'El art�culo era excesivamente corto. Puedes crear este art�culo siempre y cuando tenga la informaci�n suficiente.',
  'accesskey': '7',
  'label': 'Infra-esbozo'};
fdButtons[fdButtons.length] = {
  'summary': 'Limpiando.',
  'accesskey': '8',
  'label': 'Limpieza'};
importArticle({type: 'script', article: 'w:c:es.pintorsmeargle:MediaWiki:Common.js/borradoR�pido.js'});
/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');