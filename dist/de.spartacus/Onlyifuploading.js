/*-----------------------------------------------------------------------*/
/*  L�dt die Dateiinfo-Vorlage direkt beim Hochladen in das              */
/*  Beschreibungsfeld. Ist �ber MediaWiki:Common.js eingebunden          */
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