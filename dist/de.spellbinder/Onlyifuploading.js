 // Lädt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist über [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Dateiinfo\n"
                   + "|Beschreibung = \n"
                   + "|Datum = \n"
                   + "|Autor = \n"
                   + "|Quelle = [[Film Australia]], [[Telewizja Polska]], [[Shanghai Film Studio]]\n"
                   + "|Lizenz = [[Film Australia]], [[Telewizja Polska]], [[Shanghai Film Studio]]\n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);