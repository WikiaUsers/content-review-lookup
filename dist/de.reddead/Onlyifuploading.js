 // L�dt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist �ber [[MediaWiki:ImportJS|ImportJS]] eingebunden.

function setSpecialUploadTemplate() {
    var editbox = document.getElementById('wpUploadDescription');
    if (conf.wgCanonicalSpecialPageName != "Upload" && conf.wgCanonicalSpecialPageName != "MultipleUpload" || !editbox) return;
    if (editbox.value !== '') return;
    editbox.value = "{"+"{Dateiinfo\n"
                  + "|Beschreibung = \n"
                  + "|Datum = \n"
                  + "|Autor = \n"
                  + "|Quelle = \n"
                  + "|Lizenz = \n"
                  + "}"+"}";
}
$(setSpecialUploadTemplate);