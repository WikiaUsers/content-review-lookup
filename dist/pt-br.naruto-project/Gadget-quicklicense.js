/* Quick image license - contains the most commonly used licensing criteria - fixed for Oasis */
function QLicenseUI() {
	var options = {
		'': '',
		'== Licenciamento ==\n{{Fair use|cartaz-filme}}': 'Cartazes de Filme',
		'== Licenciamento ==\n{{Fair use|captura de tela-filme}}': 'Capturas de tela de Filme',
                '== Licenciamento ==\n{{Fair use|captura de tela-tv}}': 'Capturas de tela de TV
',
                '== Licenciamento ==\n{{Fair use|captura de tela-vídeo}}': 'Capturas de tela de Outros Vídeos',
                '== Licenciamento ==\n{{Fair use|captura de tela-game}}': 'Capturas de tela de Game',
                '== Licenciamento ==\n{{Fair use|capa-dvd}}': 'Capas de DVD',
                '== Licenciamento ==\n{{Fair use|quadrinho}}': 'Capas de Game',
		'== Licenciamento ==\n{{Fair use|personagem}}': 'Quadrinhos/Scans Maga/Capturas',
                '== Licenciamento ==\n{{Fair use|logotipo}}': 'Logos',
                '== Licenciamento ==\n{{Fair use|CC|mod=sa|v=3.0}}': 'CC-by-sa Atribuição-Compartilhamento pela mesma licença 3.0',
		'== Licenciamento ==\n{{Fair use|CC|mod=sa|v=3.0|ao mesmo}}': 'CC-by-sa Atribuição-Compartilhamento pela mesma licença 3.0 - ao mesmo',
                '== Licenciamento ==\n{{PD}}': 'Public Domain Generic',
                '== Licenciamento ==\n{{PD|ao mesmo}}': 'Liberando o próprio trabalho',
                '== Licenciamento ==\n{{PD|antigo}}': 'Antigo/Copyright Expirado',
                '== Licenciamento ==\n{{PD|abrir clipart}}': 'Imagem PD da Biblioteca Aberta de Clipart',
                '== Licenciamento ==\n{{FS|FAL}}': 'Licença da Arte Livre (FAL)',
                '== Licenciamento ==\n{{FS|FAL|próprio}}': 'Licença da Arte Livre (FAL) - ao mesmo',
                '== Licenciamento ==\n{{FS|ART-2}}': 'Artístico-2',
                '== Licenciamento ==\n{{FS|ART-2|ao mesmo}}': 'Artístico-2 - ao mesmo',
                '== Licenciamento ==\n{{Copyrighted|qualquer uso}}': 'Uso de Copyrighted Gratuito',
                '== Licenciamento ==\n{{Copyrighted|atribuição}}': 'Uso de Copyrighted Gratuito com atribuição',
		};
	var optstr = '';
	for ( i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Adicione a licença</a>';
	if($('#LicensedFile').length || $('#Licensing').length) {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">Este arquivo está licenciado.</span></p>';
	} else {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">Este arquivo não está licenciado.</span></p>';
	}
	$('#WikiaPageHeader').append(html);
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Licensing image."}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}
 
if (wgCanonicalNamespace == 'File') {
	addOnloadHook(QLicenseUI);
}