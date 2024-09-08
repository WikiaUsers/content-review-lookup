 // Lädt die Vorlage:Dateiinfo beim Hochladen direkt im Beschreibungsfeld.

 $(function setSpecialUploadTemplate() {
	if ( wgCanonicalSpecialPageName != "Upload" ) return;
	var editbox = document.getElementById('wpUploadDescription');
	if (!editbox)            return;
	if (editbox.value != '') return;
	editbox.value = "{"+"{Dateiinfo\n"
	                   + "|Beschreibung = \n"
	                   + "|Datum = \n"
	                   + "|Autor = \n"
	                   + "|Quelle = \n"
	                   + "|Lizenz = Bildzitat \n"
	                   + "}"+"}";
 });