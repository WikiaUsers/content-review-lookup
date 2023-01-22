/* <pre style="overflow: scroll; height: 25em"><nowiki> */
 
/* Cheers to [[User:Grunny|Grunny]] and [[User:Green tentacle|Green tentacle]] for their help with this! */
/* Original design by [[User:Green tentacle|Green tentacle]].  Alterations by [[User:Grunny|Grunny]] and [[User:Michael von Preußen|Michael von Preußen]] */
 
function setupUploadForm(){
	var wpLicense = document.getElementById('wpLicense');
	var mwUploadTable = document.getElementById('mw-upload-table');
 
	if ( wpLicense ){
		if (window.location.search.indexOf('basic=true') == -1){
			// Hack to get insertTags to work
			document.editform = document.getElementById('mw-upload-form');
 
			// Bind upload button to verify function
			document.getElementById('mw-upload-form').onsubmit = verifySummary;
 
			// Hide row for existing summary box
			var wpUploadDescription = document.getElementById('wpUploadDescription');
			wpUploadDescription.parentNode.parentNode.style.display = 'none';
 
			mwUploadTable.className = 'hidable start-hidden';
 
			// Create new tbodies to allow for hideable bit
			var tbody1 = mwUploadTable.tBodies[0];
			var tbody2 = document.createElement('tbody');
			tbody2.className = 'hidable-content';
			var tbody3 = document.createElement('tbody');
			mwUploadTable.appendChild(tbody2);
			mwUploadTable.appendChild(tbody3);
 
			// Move existing rows to the right tbody
			tbody3.appendChild(tbody1.rows[6]);
			tbody3.appendChild(tbody1.rows[6]);
			tbody3.appendChild(tbody1.rows[6]);
			tbody3.appendChild(tbody1.rows[6]);
 
			var newRow, newRowLabel, newRowControl;
 
			// Additional Licensing
			newRow = tbody1.insertRow(6);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowLabel.style.width = '125px';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Additional license information:</label>';
			newRowControl.innerHTML = '<textarea id="licenseBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Source
			newRow = tbody1.insertRow(7);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowLabel.style.width = '125px';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Source:<br /><span style="font-size:smaller; font-style:italic; color:#888; font-family:serif;">(required)</span></label>';
			newRowControl.innerHTML = '<textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Description
			newRow = tbody1.insertRow(8);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Description:<br /><span style="font-size:smaller; font-style:italic; color:#888; font-family:serif;">(required)</span></label>';
			newRowControl.innerHTML = '<textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Date
			newRow = tbody2.insertRow(0);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Date:</label>';
			newRowControl.innerHTML = '<textarea id="dateBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Author
			newRow = tbody2.insertRow(1);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Author:</label>';
			newRowControl.innerHTML = '<textarea id="authorBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// File specs
			newRow = tbody2.insertRow(2);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Conversion / editing / upload information:</label>';
			newRowControl.innerHTML = '<textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Other versions
			newRow = tbody2.insertRow(3);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Other versions:</label>';
			newRowControl.innerHTML = '<textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Notes
			newRow = tbody2.insertRow(4);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Notes:</label>';
			newRowControl.innerHTML = '<textarea id="notesBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
			// Categories
			newRow = tbody2.insertRow(5);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label><acronym title="Use complete category declarations. Example: [[Category:Images|{{PAGENAME}}]]">Categories</acronym>:</label>';
			newRowControl.innerHTML = '<textarea id="categoriesBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
 
		} else {
			// Old style form just needs Information template in the summary box
			document.getElementById('wpUploadDescription').value = '==Summary==\r\n{{Information\r\n|description=\r\n|date=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other_versions=\r\n|notes=\r\n|categories=\r\n}}';
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
 
	// Check for description
	if ( document.getElementById('descriptionBox').value == "" ){
		alert('Description must be completed.');
		return false;
	}
 
	var strBuilder = '==Summary==\r\n{{Information\r\n';
	strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|date=' + document.getElementById('dateBox').value + '\r\n';
	strBuilder += '|source=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|author=' + document.getElementById('authorBox').value + '\r\n';
	strBuilder += '|filespecs=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title + document.getElementById('licenseBox').value + '\r\n';
	strBuilder += '|other_versions=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '|notes=' + document.getElementById('notesBox').value + '\r\n';
	strBuilder += '|categories=' + document.getElementById('categoriesBox').value + '\r\n';
	strBuilder += '}}';
 
	document.getElementById('wpUploadDescription').value = strBuilder;
 
	wpLicense.selectedIndex = 0;
 
	return true;
}
 
function loadFunc() {
	setupUploadForm();
}
 
$(loadFunc);
/* </nowiki></pre> */