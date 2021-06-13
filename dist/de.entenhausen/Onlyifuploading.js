// Lädt die Vorlage:Dateiinfo beim Hochladen direkt im Beschreibungsfeld.
 
 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Dateiinfo\n"
                   + "|Beschreibung = \n"
                   + "|Datum = \n"
                   + "|Quelle = \n"
                   + "|Lizenz = Bildzitat \n"
                   + "}"+"}\n";
 }
 addOnloadHook(setSpecialUploadTemplate);