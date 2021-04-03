var conf = mw.config.get([
		'wgCanonicalSpecialPageName'
	]);

// Entferne auf [[Spezial:Hochladen]] „keine Vorauswahl“
$(function remove_no_license_special_upload() {
	if (conf.wgCanonicalSpecialPageName != "Upload" && conf.wgCanonicalSpecialPageName != "MultipleUpload")
		return;
	var license = document.getElementById("wpLicense");
	if (!license)
		return;
	var options = license.getElementsByTagName("option");
	if (!options)
		return;
	license.removeChild(options[0]);
});

// Lädt die Vorlage:Dateiinfo beim Hochladen direkt im Beschreibungsfeld.
function setSpecialUploadTemplate() {
    var editbox = document.getElementById('wpUploadDescription');
    if (conf.wgCanonicalSpecialPageName != "Upload" && conf.wgCanonicalSpecialPageName != "MultipleUpload" || !editbox) return;
    if (editbox.value !== '') return;
    editbox.value = "{"+"{Dateiinfo\n"
                  + "|Beschreibung = \n"
                  + "|Datum = \n"
                  + "|Quelle = \n"
                  + "|Lizenz = \n"
                  + "}"+"}";
}
$(setSpecialUploadTemplate);