 // L�dt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist �ber [[MediaWiki:Common.js|Common.js]] eingebunden.

 function setSpecialUploadTemplate() {
    if(wgCanonicalSpecialPageName == "Upload" && !!$('#wpUploadDescription').length && $('#wpUploadDescription').val()) {
        $('#wpUploadDescription').val(
            "{"+"{Information\n"
               + "|Beachten=\n"
               + "|Beschreibung=\n"
               + "|Quelle=\n"
               + "|Autor=\n"
               + "|Dateispezis=\n"
               + "|Lizenz = \n"
               + "|Andere Versionen=\n"
               + "|Kategorien=\n"
               + "}"+"}"
        )
    }
 }
 addOnloadHook(setSpecialUploadTemplate);