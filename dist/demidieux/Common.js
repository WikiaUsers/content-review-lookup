/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

/* Substitute Template:Information into upload page */
$(document).ready(function() {

	if (wgPageName != 'Spécial:Téléverser') {
		return;
	}

	$('#wpUploadDescription').text("==Description==\r\n{{Fichier\r\n|Description=\r\n|Date=\r\n|Auteur=\r\n|Source=\r\n|Licence=\r\n|Et plus=\r\n}}");

});