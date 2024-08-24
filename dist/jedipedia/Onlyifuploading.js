 // Lädt die [[Vorlage:Hochladen|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist über [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Hochladen\n"
                   + "|Beschreibung = \n"
                   + "|Quelle       = \n"
                   + "|Künstler     = \n"
                   + "|Kategorien   = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);