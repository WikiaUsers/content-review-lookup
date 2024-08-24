/*** Modification de la page d'import de fichier - Texte pré-inséré - Adaptation par Rezaqs ***/
$(function() {
	if (mw.config.get('wgPageName') != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|Description=<!--Décrire l'image-->\r\n|Source=<!--Insérer la provenance de l'image. Dans la majorité des cas, juste insérer un lien.-->\r\n|Auteur=<!--Insérer l'auteur de l'image ainsi que le logiciel (si possible)-->\r\n|Date=<!--Insérer la date de l'image (prise en photo, ...)-->\r\n|Localisation=<!--Insérer la localisation de l'image (ville, paysage, ...)-->\r\n|Licence=<!--Insérer simplement le nom de la licence; ne pas remplir si la licence est inconnue-->\r\n|Divers=<!--Facultatif-->\r\n|Voir aussi=<!--Insérer un ou plusieurs liens vers d'autres fichiers du même genre (personnage, lieu, ...)-->\r\n}}");
	$('.mw-htmlform-field-HTMLTextAreaField .mw-input').append('<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="Tèxte en gras" title="Tèxte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="Tèxte en italica" title="Tèxte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam intèrne" title="Ligam intèrne" id="button-link" style="width: 23px; height: 22px;">');
	$('#button-italic').click(function() {
		richEditor("\'\'", "\'\'");
	});
	$('#button-bold').click(function() {
		richEditor("\'\'\'", "\'\'\'");
	});
	$('#button-link').click(function() {
		richEditor("[[", "]]");
	});

	function richEditor(primier, segond) {
		var textarea = document.getElementById("wpUploadDescription");
		if ('selectionStart' in textarea) {
			if (textarea.selectionStart != textarea.selectionEnd) {
				var newText = textarea.value.substring (0, textarea.selectionStart) + 
								primier + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + segond +
								textarea.value.substring (textarea.selectionEnd);
				textarea.value = newText;
			}
		}
		else {
			var textRange = document.selection.createRange ();
			var rangeParent = textRange.parentElement ();
			if (rangeParent === textarea) {
				textRange.text = primier + textRange.text + segond;
			}
		}
	}
});