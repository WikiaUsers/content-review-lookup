/* Any JavaScript here will be loaded for all users on every page load. */
// 12:24, July 31, 2013 (UTC)
// @Original Author: UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
// @Modified By: SimAnt
// <source lang = javascript>
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
	$(function ($) {
                "use strict";
		if (!(/(?:^\?|&)wpForReUpload=(?:[^0&]|0[^&])/).test(window.location.search)) {
			$('#mw-htmlform-description').css('width', '100%');
 
			// Bind upload button to verify function
			$('#mw-upload-form').on('submit', verifySummary);
			var rows = $('#mw-htmlform-description').find('tr');
			$('tr.mw-htmlform-field-HTMLTextAreaField').hide();
			$('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();
 
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Source (URL Preferred):</td><td class="mw-input"><textarea id="sourceBox" placeholder="Where this is from, the exact chapter or episode number." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Description:</td><td class="mw-input"><textarea id="descriptionBox" placeholder="Describe what is happening and why it\'s important." required="true" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
 
			// Add new rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Purpose:</td><td class="mw-input"><textarea id="purposeBox" placeholder="[OPTIONAL] Purpose of this image." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Portion Used:</td><td class="mw-input"><textarea id="portionBox" placeholder="[OPTIONAL] Portion of the copyright used." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Replaceable?:</td><td class="mw-input"><textarea id="replaceBox" placeholder="[OPTIONAL] Is the image replaceable?" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Resolution:</td><td class="mw-input"><textarea id="resolutionBox" placeholder="[OPTIONAL] Resolution of the image." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Other Information:</td><td class="mw-input"><textarea id="otherinfoBox" placeholder="[OPTIONAL] Any other information about the image." cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		}
 
 
		function verifySummary() {
 
			if (!$('#wpLicense').val()) {
				alert('Licensing must be completed.');
				return false;
			}else if ((/^[0-9]+\.(png|gif|jpg|jpeg|ico|pdf|svg)$/).test($('#wpDestFile').val()) || $('#wpDestFile').val().length < 8) {
				alert('Enter a more descriptive filename.');
				return false;
			}else if (!$('#sourceBox').val()) {
				alert('Source must be entered');
				return false;
			}
			var strBuilder = '\r\n';
			strBuilder += '{{File Information\r\n';
			strBuilder += '|Description=' + $('#descriptionBox').val() + '\r\n';
			strBuilder += '|Source=' + $('#sourceBox').val() + '\r\n';
			strBuilder += '|Purpose=' + $('#purposeBox').val() + '\r\n';
			strBuilder += '|Portion=' + $('#portionBox').val() + '\r\n';
			strBuilder += '|Replaceability=' + $('#replaceBox').val() + '\r\n';
			strBuilder += '|Resolution=' + $('#resolutionBox').val() + '\r\n';
			strBuilder += '|Other Information=' + $('#otherinfoBox').val() + '\r\n';
			strBuilder += '}}';
			$('#wpUploadDescription').val(strBuilder);
			return true;
		}
	});
}