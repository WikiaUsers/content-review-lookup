/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* displayTimer */
importScript('MediaWiki:Common.js/displayTimer.js');

importScript('MediaWiki:Chat.js');

// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129428&counter=26' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES DESDE EL<br />1º  DE ENERO DE 2012</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1129428&counter=26' alt='Contador' border=0 /></a></td></tr></table></div></div>";
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