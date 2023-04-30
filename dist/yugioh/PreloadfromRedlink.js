mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
/**
 * Add a preload depending on the namespace during page creation from redlink.
 */
if (mw.util.getParamValue('redlink')) {
	var vPreloadText = '';
	switch (mNamespace) {
		case 'Card_Tips': // fallthrough
		case 'Card_Trivia': // fallthrough
		case 'Card_Names':
			vPreloadText += '* '; // Deliberate no "\n" at the end.
			break;
		case 'Card_Gallery':
			vPreloadText += '{\{GalleryHeader|lang=en}}\n<gallery widths="175px">\n' +
				'Image.png  | [[Card Number]] ([[Rarity]])<br />\'\'([[Edition]])\'\'<br />[[Set Name]]\n</gallery>\n|}\n\n' +
				'{\{GalleryHeader|lang=jp|set=Anime}}\n<gallery widths="175px">\nImage.png  | [[]]\n</gallery>\n|}\n'
			break;
		case 'Card_Appearances':
			vPreloadText += '* In [[Yu-Gi-Oh! ARC-V - Episode 000|episode 00]], [[character name]] plays this card ' +
				'against [[opponent name]].\n';
			break;
		case 'Card_Errata':
			vPreloadText += '{\{Errata table\n| lore0  = \n| image0 = \n| cap0   = [[Card Number]]<br />' +
				'[[Set Name]]\n\n| lore1  = \n| image1 = \n| cap1   = [[Card Number]]<br />[[Set Name]]\n}}\n';
			break;
		case 'Card_Artworks':
			vPreloadText += '* \n\n{\{ArtworkHeader|lang=jp}}\n<gallery widths="275px">\n' +
				'Image.png  | Japanese\nImage.png  | International\n</gallery>\n|}\n';
			break;
	}
	if (vPreloadText !== '') {
		addOnloadHook(addPreload('{\{Navigation}}\n\n' + vPreloadText));
	}

	function addPreload(pBlankTemplate) {
		$('#wpTextbox1').val(pBlankTemplate);

		$('#wpSave, #wpPreview').mousedown(cleanUpStuff);
		function cleanUpStuff() {
			$('#wpTextbox1').val($('#wpTextbox1').val()
				.replace('{\{Navigation2}}', '{\{Navigation|mode=nonGame}}')
				.replace('{\{Navigation3}}', '{\{Navigation|mode=otherGame}}')
			);
		}

		$('form[name=editform]').submit(function() {
			if ($('#wpTextbox1').val() === pBlankTemplate) {
				alert('You have not made any changes to the template.');
				return false;
			}
		});
	}

}
/* End of mw.loader.using callback; DO NOT ADD CODE BELOW THIS LINE */
});