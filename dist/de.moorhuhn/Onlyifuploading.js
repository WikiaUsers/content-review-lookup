 // Lädt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist über [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Dateiinfo\n"
                   + "|Beschreibung = \n"
                   + "|Herkunft = \n"
                   + "|Bildtyp = \n"
                   + "|Inhaber des Nutzungsrechts = \n"
                   + "|Ersteller = \n"
                   + "}"+"} \n"
                   + "== Lizenz == \n"
                   + "{"+"{Copyright-Phenomedia}"+"}\n\n"
                   + "["+"[Kategorie:\n"
                   + "["+"[Kategorie:";
 }
 addOnloadHook(setSpecialUploadTemplate);