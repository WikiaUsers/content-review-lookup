 // Lädt die Informationsvorlage beim Hochladen direkt im Beschreibungsfeld
 // wird in [[MediaWiki:Monobook.js]] ganz unten eingebunden

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Information\n"
                   + "|Beschreibung= \n"
                   + "|Quelle= \n"
                   + "|Urheber= \n"
                   + "|Datum= \n"
                   + "|Genehmigung= \n"
                   + "|Andere Versionen= \n"
                   + "|Anmerkungen= \n"
                   + "}}\n";
 }
 addOnloadHook(setSpecialUploadTemplate);