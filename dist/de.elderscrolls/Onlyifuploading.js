// Lädt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen direkt im Beschreibungsfeld. Ist über [[MediaWiki:ImportJS|ImportJS]] eingebunden.
var conf = mw.config.get([
		'wgCanonicalSpecialPageName'
	]);
	
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
                  + "}"+"}"
                  + "\n{"+"{Vorlage:BildPrüfen}}\n";
}
$(setSpecialUploadTemplate);