function preloadUploadDescAddSummary(field) {
	if(field && !field.summaryAdded) {
		field.appendChild(document.createTextNode("{{Uzasadnienie dozwolonego użytku\r| opis                 = \r| źródło               = \r| część                = \r| cel                  = \r| rozmiar              = \r| wymienny             = \r| pozostałe informacje = \r}}"));
		field.summaryAdded = true;
	}
}
function preloadUploadDesc() {
	if (wgPageName.toLowerCase() == 'specjalna:prześlij')
		preloadUploadDescAddSummary(document.getElementById('wpUploadDescription'));
 
	UploadPhotos.destFileSetRedir = UploadPhotos.destFileSet
	UploadPhotos.destFileSet = function() {
		preloadUploadDescAddSummary(UploadPhotos.d.find('form')[0].wpUploadDescription);
		return UploadPhotos.destFileSetRedir();
	}
}
addOnloadHook(preloadUploadDesc)