  /**
  * Lädt die Informationsvorlage beim Hochladen direkt im Beschreibungsfeld
  * wird in [[MediaWiki:Common.js]] eingebunden
  */
 addOnloadHook(function() {

    //*** Wenn keine Lizenz gewählt [[Vorlage:Dateiüberprüfung]] einbinden 
    var select = document.getElementById("wpLicense");
    if (select && select.length > 8) {
        select.remove(0);
        select.selectedIndex = 7;
        licenseSelectorCheck();
    }
     
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value !== '') return;
     editbox.value = "{"+"{Information\n"
                   + "|Beschreibung = \n"
                   + "|Quelle = \n"
                   + "|Urheber = \n"
                   + "|Datum = \n"
                   + "|Genehmigung = \n"
                   + "|Andere Versionen = \n"
                   + "|Anmerkungen = \n"
                   + "}"+"}";
 });