// 12:24, July 31, 2013 (UTC)
// @author: UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
// <source lang = javascript>
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload') {
	jQuery(function ($) {
		"use strict";
		var $desc = $('#wpUploadDescription');
		if ($desc.val()) return; // If not empty then don't do anything (i.e. error message confirm page)
		$desc.val('{{Informações da Imagem\n' + '|Descrição   = \n' + '|Fonte   = \n' + '|Propósito   = \n' + '|Porção   = \n' + '|Substituível?   = \n' + '|Resolução   = \n' + '|Outra informação   = \n' + '}}');
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

			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Fonte:</td><td class="mw-input"><textarea id="sourceBox" placeholder="De onde esta imagem é, o capítulo exato ou número do episódio." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Descrição:</td><td class="mw-input"><textarea id="descriptionBox" placeholder="Descreva o que está acontecendo e por que é importante." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');

			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Propósito:</td><td class="mw-input"><textarea id="purposeBox" placeholder="[OPCIONAL] Propósito desta imagem." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Portion Used:</td><td class="mw-input"><textarea id="portionBox" placeholder="[OPCIONAL] Porção usada." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Substituível?:</td><td class="mw-input"><textarea id="replaceBox" placeholder="[OPCIONAL] Esta imagem é substituível?" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Resolução:</td><td class="mw-input"><textarea id="resolutionBox" placeholder="[OPCIONAL] Resolução da imagem." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Outra informação:</td><td class="mw-input"><textarea id="otherinfoBox" placeholder="[OPCIONAL] Qualquer outra informação sobre a imagem." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
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
			strBuilder += '{{Informações da Imagem\r\n';
			strBuilder += '|Descrição=' + $('#descriptionBox').val() + '\r\n';
			strBuilder += '|Fonte=' + $('#sourceBox').val() + '\r\n';
			strBuilder += '|Propósito=' + $('#purposeBox').val() + '\r\n';
			strBuilder += '|Porção=' + $('#portionBox').val() + '\r\n';
			strBuilder += '|Substituível?=' + $('#replaceBox').val() + '\r\n';
			strBuilder += '|Resolução=' + $('#resolutionBox').val() + '\r\n';
			strBuilder += '|Outra informação=' + $('#otherinfoBox').val() + '\r\n';
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