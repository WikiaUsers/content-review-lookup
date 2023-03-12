/* <pre style="overflow: scroll; height: 25em"><nowiki> */

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

			// Source
			newRow = tbody1.insertRow(6);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowLabel.style.width = '125px';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Source:</label>';
			newRowControl.innerHTML = '<textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
  
			// Description
			newRow = tbody1.insertRow(7);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Description:</label>';
			newRowControl.innerHTML = '<textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';

			// Show/hide optional fields
			newRow = tbody1.insertRow(8);
			newRowLabel = newRow.insertCell(0);
			newRowLabel.colSpan = '2';
			newRowLabel.style.textAlign = 'center';
			newRowLabel.innerHTML = 'Optional fields <span class="hidable-button"></span>';

			// Author
			newRow = tbody2.insertRow(1);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Original designer / artist:</label>';
			newRowControl.innerHTML = '<textarea id="authorBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';

			// Other versions
			newRow = tbody2.insertRow(3);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Other versions / source images:</label>';
			newRowControl.innerHTML = '<textarea id="versionsBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';

			// Artist cat
			newRow = tbody2.insertRow(4);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Artist categories:</label>';
			newRowControl.innerHTML = '<textarea id="catartistBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';

			// Licensee cat
			newRow = tbody2.insertRow(5);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Licensee categories:</label>';
			newRowControl.innerHTML = '<textarea id="catlicenseeBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';

			// Subject cat
			newRow = tbody2.insertRow(6);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Subject categories:</label>';
			newRowControl.innerHTML = '<textarea id="catsubjectBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';

			// Type cat
			newRow = tbody2.insertRow(7);
			newRowLabel = newRow.insertCell(0);
			newRowControl = newRow.insertCell(1);
			newRowLabel.className = 'mw-label';
			newRowControl.className = 'mw-input';
			newRowLabel.innerHTML = '<label>Type categories:</label>';
			newRowControl.innerHTML = '<textarea id="cattypeBox" cols="60" rows="2" style="overflow: auto;" tabindex="5" onfocus="document.editform.wpTextbox1 = this;"></textarea>';
		} else {
			// Old style form just needs Information template in the summary box
			document.getElementById('wpUploadDescription').value = '==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}';
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

	var strBuilder = '==Summary==\r\n{{summary\r\n';
        strBuilder += '|description=' + document.getElementById('descriptionBox').value + '\r\n';
	strBuilder += '|date=' + document.getElementById('sourceBox').value + '\r\n';
	strBuilder += '|uploaded=' + document.getElementById('authorBox').value + '\r\n';
	strBuilder += '|author=' + document.getElementById('filespecsBox').value + '\r\n';
	strBuilder += '|usage=' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
	strBuilder += '|similar=' + document.getElementById('versionsBox').value + '\r\n';
	strBuilder += '}}';

	document.getElementById('wpUploadDescription').value = strBuilder;

	wpLicense.selectedIndex = 0;

	return true;
}

/* </nowiki></pre> */