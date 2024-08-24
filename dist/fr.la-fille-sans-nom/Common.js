/*** Modification de la page d'import de fichier - Texte pr�-ins�r� - Adaptation par Rezaqs ***/
$(function() {
	if (mw.config.get('wgPageName') != 'Sp�cial:T�l�verser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|Description=<!--D�crire l'image-->\r\n|Source=<!--Ins�rer la provenance de l'image. Dans la majorit� des cas, juste ins�rer un lien.-->\r\n|Auteur=<!--Ins�rer l'auteur de l'image ainsi que le logiciel (si possible)-->\r\n|Date=<!--Ins�rer la date de l'image (prise en photo, ...)-->\r\n|Localisation=<!--Ins�rer la localisation de l'image (ville, paysage, ...)-->\r\n|Licence=<!--Ins�rer simplement le nom de la licence; ne pas remplir si la licence est inconnue-->\r\n|Divers=<!--Facultatif-->\r\n|Voir aussi=<!--Ins�rer un ou plusieurs liens vers d'autres fichiers du m�me genre (personnage, lieu, ...)-->\r\n}}");
	$('.mw-htmlform-field-HTMLTextAreaField .mw-input').append('<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Button_bold.png" alt="T�xte en gras" title="T�xte en gras" id="button-bold" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Button_italic.png" alt="T�xte en italica" title="T�xte en italica" id="button-italic" style="width: 23px; height: 22px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Button_link.png" alt="Ligam int�rne" title="Ligam int�rne" id="button-link" style="width: 23px; height: 22px;">');
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