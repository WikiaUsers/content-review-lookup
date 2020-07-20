/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Dodatkowe przyciski w pasku edycji */
if ( mwCustomEditButtons ) {
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
}

/* IMPORT */
importArticles({
    type: "script",
    articles: [
      'w:c:pl.sailormoon:MediaWiki:Common.js/ajax.js', /* Automatyczne odświeżanie */
      'w:c:dev:ReferencePopups/code.js', /* Wyskakujące przypisy */
    ]
});
 
/* Komunikat o niewybraniu licencji do przesłanego pliku */
function emptyLicenseAlert(form) {
        var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
        if(window.emptyLicenseWarningDelivered) return true;
        if($('#wpLicense').val() == '') {
                alert(msg);
                window.emptyLicenseWarningDelivered = true
                return false
        }
        return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});