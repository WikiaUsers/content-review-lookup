/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/
/* Dodatkowe przyciski w pasku edycji */
if ( mwCustomEditButtons ) {
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "Zgłoś do usunięcia",
     "tagOpen": "\{\{Ek|powód=",
     "tagClose": "\}\}",
     "sampleText": "podaj powód"};
 
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
/* END Dodatkowe przyciski w pasku edycji */
 
/* jQuery UI */
$.getScript( 'http://pl.bleach.wikia.com/index.php?title=MediaWiki:Common.js/jqueryui.js&action=raw&ctype=text/javascript', function () {
} );

/* IMPORT */
importArticles({
    type: "script",
    articles: [
//      "MediaWiki:Common.js/chatango.js", /* Chatango */
      "w:c:pl.bleach:MediaWiki:Common.js/przełączanie.js", /* przełączanie */
      "MediaWiki:Common.js/ajax.js", /* Odświeżanie */
    ]
});
 
/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */