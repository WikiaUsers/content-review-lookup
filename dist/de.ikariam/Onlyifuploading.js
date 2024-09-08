 // Lädt die [[Vorlage:Dateiinfo|Dateiinfovorlage]] beim Hochladen von Bildern direkt im Beschreibungsfeld.
 
 if(wgCanonicalSpecialPageName == "Upload") {
 	function setSpecialUploadTemplate() {
 		var editbox = document.getElementById('wpUploadDescription');
 		
 		if(!editbox) {
 			return;
 		}
 		
 		if(editbox.value != '') {
 			return;
 		}
 		
 		editbox.value = "{"+"{Dateiinfo\n"
 			+ "|Beschreibung = \n"
 			+ "|Datum = \n"
 			+ "|Autor = \n"
 			+ "|Quelle = \n"
 			+ "|Lizenz = \n"
 			+ "}"+"}";
 	}
 	
 	addOnloadHook(setSpecialUploadTemplate);
 }