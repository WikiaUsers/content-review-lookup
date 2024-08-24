/* <pre style="overflow: scroll; height: 25em"><nowiki> */

 
function setupUploadForm(){
	// Check if cookie has been set for form style. Overrides URL parameter if set.
	var formstyle = getCookie("uploadform");
 
	$("#uploadBasicLinkJS").show();
	$("#uploadTemplateNoJS").hide();
 
	var wpLicense = $('#wpLicense');
 
	if ( wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1){
		if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)){
			// Add link to basic form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://es.claymore.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Cambiar a la forma básica</a></div>');
 
			// Stretch table to full width
			$('#mw-htmlform-description').css('width', '100%');
 
			// Bind upload button to verify function
			$('#mw-upload-form').bind('submit', verifySummary);
 
			// Hide existing rows
			var rows = $('#mw-htmlform-description').find('tr');
			rows.eq(2).hide();
			rows.eq(3).detach();
 
			$('#mw-htmlform-description').addClass('hidable start-hidden');
 
			// Add new required rows
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Fuente:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Descripción:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody1.append('<tr><td colspan="2" style="text-align: center;">Campos adicionales <span class="hidable-button"></span></td></tr>');
 
			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Atención:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Diseñador original / artista:</td><td class="mw-input"><textarea id="authorBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Información de cambios / conversiones:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Otras versiones:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categorías de artista:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categorías de licencia:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categorías de sujeto:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Type categories:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('==Sumario==\r\n{{Información\r\n|atención=\r\n|descripcion=\r\n|fuente=\r\n|autor=\r\n|filespecs=\r\n|licencia=\r\n|otras versiones=\r\n|cat artista=\r\n|cat licencia=\r\n|cat sujeto=\r\n|cat tipo=\r\n}}');
 
			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://es.claymore.wikia.com/index.php?title=Special:Upload" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Switch to guided upload form</a></div>');
		}
	}
}
 
function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
 
	// Check for licensing
	if ( wpLicense.value == "" ){
		alert('Licensing must be completed.');
		return false;
	}
 
	// Check for source
	if ( document.getElementById('sourceBox').value == "" ){
		alert('Source must be completed.');
		return false;
	}
 
	var strBuilder = '==Sumario==\r\n{{Información\r\n';
	strBuilder += '|atención=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|descripcion=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|fuente=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|autor=' + document.getElementById('authorBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licencia=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|otras versiones=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artista=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat licencia=' + document.getElementById('catlicenseeBox').value + '\r\n';
	strBuilder += '|cat sujeto=' + document.getElementById('catsubjectBox').value + '\r\n';
	strBuilder += '|cat tipo=' + document.getElementById('cattypeBox').value + '\r\n';
	strBuilder += '}}';
 
	document.getElementById('wpUploadDescription').value = strBuilder;
 
	wpLicense.selectedIndex = 0;
 
	return true;
}
 
/**
 * End upload form customisations
 */
// </nowiki></pre>