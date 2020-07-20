/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/
/* Dodatkowe przyciski w pasku edycji */
if (mwCustomEditButtons) {
    switch(mw.config.get("skin")) {
        case "oasis":
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://vignette.wikia.nocookie.net/deathnote/images/9/90/A_Accent_ButtonOasis.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj ā",
                "tagOpen": "ā",
                "tagClose": "",
                "sampleText": ""};
                
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://vignette.wikia.nocookie.net/deathnote/images/6/69/E_Accent_ButtonOasis.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj ē",
                "tagOpen": "ē",
                "tagClose": "",
                "sampleText": ""};
                
            mwCustomEditButtons[mwCustomEditButtons.length] = { 
                "imageFile": "https://vignette.wikia.nocookie.net/deathnote/images/5/58/I_Accent_ButtonOasis.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj ī",
                "tagOpen": "ī",
                "tagClose": "",
                "sampleText": ""};
                
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://vignette.wikia.nocookie.net/deathnote/images/0/08/O_Accent_ButtonOasis.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj ō",
                "tagOpen": "ō",
                "tagClose": "",
                "sampleText": ""};
         
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://vignette.wikia.nocookie.net/deathnote/images/4/4a/U_Accent_ButtonOasis.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj ū",
                "tagOpen": "ū",
                "tagClose": "",
                "sampleText": ""};
             
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://vignette.wikia.nocookie.net/deathnote/images/9/98/Kropka_ButtonOasis.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj •",
                "tagOpen": "•",
                "tagClose": "",
                "sampleText": ""};
        break;
        
        case "monobook":
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
                "speedTip": "Dodaj ō",
                "tagOpen": "ō",
                "tagClose": "",
                "sampleText": ""};
         
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
                "speedTip": "Dodaj ū",
                "tagOpen": "ū",
                "tagClose": "",
                "sampleText": ""};
             
            mwCustomEditButtons[mwCustomEditButtons.length] = {
                "imageFile": "https://vignette.wikia.nocookie.net/rejwena/images/3/34/Kropka_Button.png/revision/latest?path-prefix=pl",
                "speedTip": "Dodaj •",
                "tagOpen": "•",
                "tagClose": "",
                "sampleText": ""};
        break;
    }
}
/* END Dodatkowe przyciski w pasku edycji */

/* Link powrotu z galerii */
if(mw.config.get("wgCanonicalNamespace") === "Galeria") {
    var pageTitle = mw.config.get("wgTitle");
    
    switch(mw.config.get("skin")) {
        case "oasis":
            $(".page-header__title").after('<div class="page-header__page-subtitle">&lt; <a href="/wiki/' + pageTitle + '" title="' + pageTitle + '">' + pageTitle + '</a></div>');
        break;
        case "monobook":
            $("#firstHeading").after('<span class="subpages">&lt; <a href="/wiki/' + pageTitle + '" title="' + pageTitle + '">' + pageTitle + '</a></span>');
        break;
    }
}

/* jQuery UI */
$.getScript( 'http://pl.bleach.wikia.com/index.php?title=MediaWiki:Common.js/jqueryui.js&action=raw&ctype=text/javascript');

/* Konfiguracja importów */
AjaxRCRefreshText = 'Automatyczne odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie odświeża stronę';

// Opis pliku
function preloadUploadDescAddSummary(field) {
	if(field && !field.summaryAdded) {
		field.appendChild(document.createTextNode("{{Uzasadnienie dozwolonego użytku| opis                 = \r| źródło               = \r| część                = \r| cel                  = \r| rozmiar              = \r| wymienny             = \r| pozostałe informacje = \r}}"));
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

// Licencje
var options = {
	'{{Dozwolony_użytek|comic}}': 'Plik jest skanem z mangi',
	'{{Dozwolony_użytek|tv-screenshot}}': 'Plik jest zrzutem ekranu z anime',
	'{{CC-BY-SA}}': 'CC-BY-SA',
	'{{Copyright}}': 'Plik objęty prawami autorskimi',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik pochodzi z jednego z projektów Wikimedia'
};