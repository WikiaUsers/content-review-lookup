/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
     "speedTip": "Zgłoś do usunięcia",
     "tagOpen": "\{\{ek|",
     "tagClose": "\}\}",
     "sampleText": "tu wpisz swój powód"};
/* Import skryptów */
importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/es.js",                /* Rozwijane opisy zmian */
      "MediaWiki:Common.js/showhide.js",          /* Zwijane tabele */
      "MediaWiki:Common.js/wandalizm.js",         /* Skrypt odpowiadający za system zgłaszania wandali - oryginał by RuneScape Wiki */
      "MediaWiki:Common.js/extraRollbacks.js",    /* Dodatkowe przyciski szybkiego cofania zmian - by Monchoman45 */ 
      "w:c:dev:DupImageList/code.js",             /* Lista duplikatów obrazków */
   ]
});
/* Koniec importu skryptów */
/* Zmiana "użytkownik wikii" na numer IP, tylko dla modów, adminów i biuroli */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');
/* END Zmiana "użytkownik wikii" na numer IP */