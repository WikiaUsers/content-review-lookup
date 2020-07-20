// Impedir el renombrado de página de usuario (Obtenido de [[w:c:es.pokemon:Wikidex]])
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