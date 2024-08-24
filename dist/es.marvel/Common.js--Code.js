/* <pre> v204 */
/* == Funciones comunes ==
Funciones compartidas por otros scripts del sitio. Evitar hacer modificaciones importantes: Algunos usuarios pueden estar haciendo uso de ellas. Usos que se tenga constancia: [[MediaWiki:Edit.js]], [[MediaWiki:Mergetables.js]]
</pre> */
{{MediaWiki:Common.js/Clases/UtilityTools-min.js}}
//<pre>
var $UT = UtilityTools;
if (!window.$G){
	window.$G = $UT.get;
}
 
window.bodyContentId = 'bodyContent';
 
/* Compatibilidad, al inicio del resto de carga de elementos. Necesario para que todas las utilidades que funcionan en Monobook y Monaco funcionen en oasis 
* Wikia: ¿Quién tuvo la estupenda idea de no respetar los ID's comunes del wiki? */
function oasisCompatElements() {
	$(document.body).append('<div id="positioned_elements"></div>');
}
 
if (window.skin == 'oasis') {
	window.bodyContentId = 'WikiaArticle';
	$(oasisCompatElements);
}
 
/* == Parches == */
// Está obligando a hacer login para editar si no tiene cookies habilitadas
if (document.cookie.length == 0) {
	wgComboAjaxLogin = false;
}
 
// agregar "ie6" como clase de body. Comentario condicional para IE
/*@cc_on
if (navigator.appVersion.indexOf('MSIE 6') != -1) {
	$(function(){ document.body.className += ' ie6'; });
}
@*/
// Impedir el renombrado de página de usuario
function disableUserpageMove() {
	var url = window.location.toString();
	var pos = url.indexOf(window.wgPageName);
	if (pos == -1) {
		url = decodeURIComponent(url);
	}
	pos = url.indexOf(window.wgPageName);
	if (pos == -1) return; // fail :(
	var page = url.substr(url.indexOf(window.wgPageName)+window.wgPageName.length+1);
	pos = page.indexOf('?');
	if (pos != -1) {
		page = page.substr(0, pos);
	}
	pos = page.indexOf('/');
	if (pos != -1) {
		// Si hay barra es que se está trasladando una subpágina. Ok, lo permitimos
		return;
	}
	// Es página de usuario?
	var re_user = new RegExp('^(user|'+wgFormattedNamespaces['2']+'):', 'i');
	if (re_user.test(page)) {
		// Excluir admin y otros
		for (var i = 0; i < wgUserGroups.length; i++) {
			if (wgUserGroups[i] == 'sysop' || wgUserGroups[i] == 'asistente' || wgUserGroups[i] == 'rollback') {
				return true;
			}
		}
		window.location = wgServer+wgArticlePath.replace('$1', 'Ayuda:Renombrar mi cuenta');
	}
}
 
if (window.wgNamespaceNumber == -1 && window.wgCanonicalSpecialPageName == 'Movepage') {
	disableUserpageMove();
}
 
// Page tracker
try {
	$(function() {
		if (!window._gaq || typeof window._gaq.length == 'undefined') return;
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	});
} catch(e) {window._gaJSerror2 = e;}
// End Page tracker
//</pre>