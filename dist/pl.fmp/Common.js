/*<pre>*/
/* Przesyłanie plików */
function preloadUploadDescAddSummary(field) {
	if(field && !field.summaryAdded) {
		field.appendChild(document.createTextNode("[[Kategoria:Pliki]]"));
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
/* END Przesyłanie plików */
/*</pre>*/