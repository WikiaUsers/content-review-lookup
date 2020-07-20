/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129094&counter=26' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129094&counter=26' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});

/* 
------------------
NOMBRE DEL USUARIO
------------------
Inserta el nombre del usuario donde esté "<span class="insertusername"></span>"
  o la [[Plantilla:NOMBREUSUARIO]]

Traída de Inciclopedia, inicialmente de Uncyclopedia y corregida por uncyclopedia:es:user:Ciencia Al Poder, para que funcione correctamente usando ''class='' en vez de ''id=''.
*/

function UserNameReplace() {
  if (wgUserName) {
    var spans = getElementsByClassName(document, "span", "insertusername");
    for (var i = 0; i < spans.length; i++) {
      spans[i].innerHTML = wgUserName;
    };
  };
};

addOnloadHook(UserNameReplace);

// 1. Borrado rápido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'VANDALISMO',
  'accesskey': '1',
  'label': 'V'};
fdButtons[fdButtons.length] = {
  'summary': 'BASURA (SPAM)',
  'accesskey': '2',
  'label': 'S'};
fdButtons[fdButtons.length] = {
  'summary': 'REDIRECCIÓN ROTA',
  'accesskey': '3',
  'label': 'R'};
fdButtons[fdButtons.length] = {
  'summary': 'Violación de Copyright',
  'accesskey': '4',
  'label': 'Y'};
fdButtons[fdButtons.length] = {
  'summary': 'A petición del mismo autor',
  'accesskey': '5',
  'label': 'A'};
fdButtons[fdButtons.length] = {
  'summary': 'Artículo demasiado corto (Infraesbozo)',
  'accesskey': '6',
  'label': 'E'};
fdButtons[fdButtons.length] = {
  'summary': 'Innecesario',
  'accesskey': '7',
  'label': 'I'};

importScriptPage('MediaWiki:Common.js/borradoRápido.js');