 // L�dt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist �ber [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Dateiinfo\n"
                   + "|Beschreibung = \n"
                   + "|Autor = \n"
		   + "|Quelle = \n"
                   + "|Lizenz = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);

 importScriptPage('MediaWiki:Gadget-Hotcat.js');