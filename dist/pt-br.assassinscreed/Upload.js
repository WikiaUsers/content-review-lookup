/* <pre style="overflow: scroll; height: 25em"><nowiki> */

function setupUploadForm()
{
  var wpLicense = document.getElementById('wpLicense');
  var mwUploadTable = document.getElementById('mw-upload-table');

  if (wpLicense)
  {
    if (window.location.search.indexOf('basic=true') == -1)
    {
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

      // Fonte
      newRow = tbody1.insertRow(6);
      newRowLabel = newRow.insertCell(0);
      newRowControl = newRow.insertCell(1);
      newRowLabel.className = 'mw-label';
      newRowLabel.style.width = '125px';
      newRowControl.className = 'mw-input';
      newRowLabel.innerHTML = '<label>Fonte:</label>';
      newRowControl.innerHTML = '<textarea id="sourceBox" cols="60" rows="2" style="overflow: auto;" tabindex="5"></textarea>';
  
      // Descrição
      newRow = tbody1.insertRow(7);
      newRowLabel = newRow.insertCell(0);
      newRowControl = newRow.insertCell(1);
      newRowLabel.className = 'mw-label';
      newRowControl.className = 'mw-input';
      newRowLabel.innerHTML = '<label>Descrição:</label>';
      newRowControl.innerHTML = '<textarea id="descriptionBox" cols="60" rows="2" style="overflow: auto;" tabindex="5"></textarea>';

      // Exibir/ocultar campos opcionais
      newRow = tbody1.insertRow(8);
      newRowLabel = newRow.insertCell(0);
      newRowLabel.colSpan = '2';
      newRowLabel.style.textAlign = 'center';
      newRowLabel.innerHTML = 'Campos opcionais <span class="hidable-button"></span>';

      // Atenção
      newRow = tbody2.insertRow(0);
      newRowLabel = newRow.insertCell(0);
      newRowControl = newRow.insertCell(1);
      newRowLabel.className = 'mw-label';
      newRowControl.className = 'mw-input';
      newRowLabel.innerHTML = '<label>Atenção:</label>';
      newRowControl.innerHTML = '<textarea id="attentionBox" cols="60" rows="2" style="overflow: auto;" tabindex="5"></textarea>';

      // Autor
      newRow = tbody2.insertRow(1);
      newRowLabel = newRow.insertCell(0);
      newRowControl = newRow.insertCell(1);
      newRowLabel.className = 'mw-label';
      newRowControl.className = 'mw-input';
      newRowLabel.innerHTML = '<label>Designer / artista original:</label>';
      newRowControl.innerHTML = '<textarea id="authorBox" cols="60" rows="2" style="overflow: auto;" tabindex="5"></textarea>';

      // Especifícações do arquivo
      newRow = tbody2.insertRow(2);
      newRowLabel = newRow.insertCell(0);
      newRowControl = newRow.insertCell(1);
      newRowLabel.className = 'mw-label';
      newRowControl.className = 'mw-input';
      newRowLabel.innerHTML = '<label>Informações sobre conversão / edição / envio:</label>';
      newRowControl.innerHTML = '<textarea id="filespecsBox" cols="60" rows="2" style="overflow: auto;" tabindex="5"></textarea>';
    }
    else
    {
      // Old style form just needs Information template in the summary box
      document.getElementById('wpUploadDescription').value = '{{Informações\r\n|atenção         =\r\n|descrição       =\r\n|fonte           =\r\n|autor           =\r\n|especsdoarquivo =\r\n|licenciamento   =\r\n}}';
    }
  }
}

function verifySummary()
{
  var wpLicense = document.getElementById('wpLicense');

  // Check for licensing
  if (wpLicense.value == "")
  {
    alert('O licenciamento deve ser preenchido.');
    return false;
  }

  // Check for source
  if (document.getElementById('sourceBox').value == "")
  {
    alert(' A fonte deve ser preenchida.');
    return false;
  }

  var strBuilder = '{{Informações\r\n';
  strBuilder += '|atenção         =' + document.getElementById('attentionBox').value + '\r\n';
  strBuilder += '|descrição       =' + document.getElementById('descriptionBox').value + '\r\n';
  strBuilder += '|fonte           =' + document.getElementById('sourceBox').value + '\r\n';
  strBuilder += '|autor           =' + document.getElementById('authorBox').value + '\r\n';
  strBuilder += '|especsdoarquivo =' + document.getElementById('filespecsBox').value + '\r\n';
  strBuilder += '|licenciamento   =' + wpLicense.options[wpLicense.selectedIndex].title + '\r\n';
  strBuilder += '}}';

  document.getElementById('wpUploadDescription').value = strBuilder;

  wpLicense.selectedIndex = 0;

  return true;
}

/* </nowiki></pre> */