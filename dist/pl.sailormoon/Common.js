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
      "MediaWiki:Common.js/ajax.js", /* Automatyczne odświeżanie */
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

 /* Komunikat */
 /*var WikiaNotificationMessage = '18 września 2015 roku bedzie miał swoją premierę musical „Un Nouveau Voyage”.';
 var expiry = 12; 
 
 importArticles({ 
     type: "script", 
     articles: [ 
         "u:dev:WikiaNotification/code.js" 
     ] 
 }); */

/* Blokada starych blogów i wątków */
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Nikt nie napisał tu żadnego postu od ponad 30 dni, więc dalsze komentowanie zostało automatycznie wyłączone, ponieważ ewentualne nowe wpisy zostałyby prawdopodobnie uznane za odkopywanie starych dyskusji. Jeśli masz coś ważnego do przekazania na dany temat, załóż nowy wątek.",
    forumName: "Forum" 
};
 
/* window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Nikt nie skomentował tego blogu od ponad 30 dni. Nowy komentarz zostałby i tak prawdopodobnie uznany za odkopywanie starych dyskusji, więc możliwość komentowania została automatycznie wyłączona. Jeśli jesteś autorem bloga i chcesz, aby komentowanie zawsze było możliwe, dodaj kategorię „Blogi zawsze aktualne”.",
    nonexpiryCategory: "Blogi zawsze aktualne"
}; */