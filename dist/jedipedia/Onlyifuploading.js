 // L�dt die [[Vorlage:Hochladen|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist �ber [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Hochladen\n"
                   + "|Beschreibung = \n"
                   + "|Quelle       = \n"
                   + "|K�nstler     = \n"
                   + "|Kategorien   = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);