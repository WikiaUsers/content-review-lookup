/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/
/* Dodatkowe przyciski w pasku edycji */
//importScript('MediaWiki:Common.js/przyciski.js');
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Dodaj ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Dodaj ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
}

/* IMPORT */
importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/chatango.js", /* Chatango */
      "w:c:pl.bleach:MediaWiki:Common.js/przełączanie.js", /* przełączanie */
    ]
});

/* Uzasadnienie dowolonego użytku */
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

/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */