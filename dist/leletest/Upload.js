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
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:setCookie(\'uploadform\', \'basic\', 30)">Trocar para formulário de carregamento básico</a></div>');
 
			// Stretch table to full width
			$('#mw-htmlform-description').css('width', '100%');
 
			// Bind upload button to verify function
			$('#mw-upload-form').bind('submit', verifySummary);
 
			// Hide existing rows
			var rows = $('#mw-htmlform-description').find('tr');
			$('tr.mw-htmlform-field-HTMLTextAreaField').hide();
			$('tr.mw-htmlform-field-HTMLTextAreaField').next().detach();
 
			$('#mw-htmlform-description').addClass('hidable start-hidden');
 
			// Add new required rows
			rows.eq(1).after('<tr><td class="mw-label" style="width: 125px;">Fonte:</td><td class="mw-input"><textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			$('#mw-htmlform-description').append('<tbody class="hidable-content"></tbody>');
			var tbody1 = $('#mw-htmlform-description').children('tbody').eq(0);
			tbody1.append('<tr><td class="mw-label" style="width: 125px;">Descrição:</td><td class="mw-input"><textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody1.append('<tr><td colspan="2" style="text-align: center;">Campos opcionais <span class="hidable-button"></span></td></tr>');
 
			// Add new optional rows
			var tbody2 = $('#mw-htmlform-description').children('tbody').eq(1);
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Atenção:</td><td class="mw-input"><textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Designer original / artista:</td><td class="mw-input"><textarea id="authorBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Conversão / edição / informações de carregamento:</td><td class="mw-input"><textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Outras versões / imagens fonte:</td><td class="mw-input"><textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categorias de artista:</td><td class="mw-input"><textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categoria de licenciador:</td><td class="mw-input"><textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categorias dos objetos / pessoas / locais:</td><td class="mw-input"><textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
			tbody2.append('<tr><td class="mw-label" style="width: 125px;">Categorias de tipo:</td><td class="mw-input"><textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;"></textarea></td></tr>');
		} else {
			// Old style form just needs Information template in the summary box
			$('#wpUploadDescription').val('==Resumo==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}');
 
			// Add link to guided form
			$("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload" onclick="javascript:setCookie(\'uploadform\', \'guided\', 30)">Trocar para formulário de carregamento guiado</a></div>');
		}
	}
}
 
function verifySummary(){
	var wpLicense = document.getElementById('wpLicense');
 

 
	var strBuilder = '==Summary==\r\n{{Information\r\n';
	strBuilder += '|attention=' + document.getElementById('attentionBox').value + '\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|author=' + document.getElementById('authorBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|other versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|cat artist=' + document.getElementById('catartistBox').value + '\r\n';
	strBuilder += '|cat licensee=' + document.getElementById('catlicenseeBox').value + '\r\n';
	strBuilder += '|cat subject=' + document.getElementById('catsubjectBox').value + '\r\n';
	strBuilder += '|cat type=' + document.getElementById('cattypeBox').value + '\r\n';
	strBuilder += '}}';
 
	document.getElementById('wpUploadDescription').value = strBuilder;
 
	wpLicense.selectedIndex = 0;
 
	return true;
}
 
/* </nowiki></pre> */