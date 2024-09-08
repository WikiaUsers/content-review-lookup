/*-----------------------------------------------------------------------*/
/*  Lädt die Dateiinfo-Vorlage direkt beim Hochladen in das              */
/*  Beschreibungsfeld. Ist über MediaWiki:Common.js eingebunden          */
/*-----------------------------------------------------------------------*/

 function setSpecialUploadTemplate() {
     var editbox = document.getElementById('wpUploadDescription');
     if (!editbox)            return;
     if (editbox.value != '') return;
     editbox.value = "{"+"{Dateiinfo\n"
                   + "|Beschreibung = \n"
                   + "|Datum = \n"
                   + "|Urheber = \n"
                   + "|Quelle = \n"
                   + "|Lizenz = \n"
                   + "|Anmerkungen = \n"
                   + "}"+"}";
 }
 addOnloadHook(setSpecialUploadTemplate);