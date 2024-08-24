// 12:24, July 31, 2013 (UTC)
// @author: UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
// <source lang = javascript>
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	jQuery(function ($) {
		"use strict";
		var $desc = $('#wpUploadDescription');
		if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
		$desc.val('{{Informa��es da Imagem\n' + '|Descri��o   = \n' + '|Fonte   = \n' + '|Prop�sito   = \n' + '|Por��o   = \n' + '|Substitu�vel?   = \n' + '|Resolu��o   = \n' + '|Outra informa��o   = \n' + '}}');
	});
}

/**
 * Start upload form customisations
 */

if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
	$(function ($) {
		if (!(/(?:^\?|&)wpForReUpload=(?:[^0&]|0[^&])/).test(window.location.search)) {
			$('#mw-htmlform-description').css('width', '100%');

			// Bind upload button to verify function
			$('#mw-upload-form').bind('submit', verifySummary);
			var rows = $('#mw-htmlform-description').find('tr');
			$('tr.mw-htmlform-field-HTMLTextAreaField').hide();
			$('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();

			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Fonte:</td><td class="mw-input"><textarea id="sourceBox" placeholder="De onde esta imagem �, o cap�tulo exato ou n�mero do epis�dio." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Descri��o:</td><td class="mw-input"><textarea id="descriptionBox" placeholder="Descreva o que est� acontecendo e por que � importante." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');

			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Prop�sito:</td><td class="mw-input"><textarea id="purposeBox" placeholder="[OPCIONAL] Prop�sito desta imagem." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Portion Used:</td><td class="mw-input"><textarea id="portionBox" placeholder="[OPCIONAL] Por��o usada." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Substitu�vel?:</td><td class="mw-input"><textarea id="replaceBox" placeholder="[OPCIONAL] Esta imagem � substitu�vel?" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Resolu��o:</td><td class="mw-input"><textarea id="resolutionBox" placeholder="[OPCIONAL] Resolu��o da imagem." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Outra informa��o:</td><td class="mw-input"><textarea id="otherinfoBox" placeholder="[OPCIONAL] Qualquer outra informa��o sobre a imagem." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		}


		function verifySummary() {

			if (!$('#wpLicense').val()) {
				alert('O licenciamento deve ser completado.');
				return false;
			}

			var template = "",
				resolution = $('#resolutionBox').val();
			if (/1080p/i.test(resolution)) {
				template = "{{1080p upload}}";
			} else if (/720p/i.test(resolution)) {
				template = "{{720p upload}}";
			}

			var strBuilder = template + '\r\n';
			strBuilder += '{{Informa��es da Imagem\r\n';
			strBuilder += '|Descri��o=' + $('#descriptionBox').val() + '\r\n';
			strBuilder += '|Fonte=' + $('#sourceBox').val() + '\r\n';
			strBuilder += '|Prop�sito=' + $('#purposeBox').val() + '\r\n';
			strBuilder += '|Por��o=' + $('#portionBox').val() + '\r\n';
			strBuilder += '|Substitu�vel?=' + $('#replaceBox').val() + '\r\n';
			strBuilder += '|Resolu��o=' + $('#resolutionBox').val() + '\r\n';
			strBuilder += '|Outra informa��o=' + $('#otherinfoBox').val() + '\r\n';
			strBuilder += '}}';
			$('#wpUploadDescription').val(strBuilder);
			return true;
		}

		// Autocomplete for some fields
		mw.loader.using('jquery.ui.autocomplete', function () {
			$('#characterBox, #jutsuBox').autocomplete({
				minLength: 2,
				source: function (request, response) {
					$.getJSON(
					mw.util.wikiScript('api'), {
						format: 'json',
						action: 'opensearch',
						search: request.term
					}, function (arr) {
						if (arr && arr.length > 1) {
							response(arr[1]);
						} else {
							response([]);
						}
					});
				}
			});
		});

	});
}

// </source>