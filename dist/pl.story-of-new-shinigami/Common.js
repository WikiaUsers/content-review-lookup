/*<pre>*/
/* Początek Common.js */

/* Import skryptów */
importArticles({
    type: "script",
    articles: [
      "w:c:dev:SearchButtonV2/code.js", /* Nowe opcje wyszukiwania */
      "w:c:dev:DupImageList/code.js" /* Lista duplikatów obrazków */
   ]
});
/* Koniec importu skryptów */

/* Zmiana "użytkownik wikii" na numer IP, tylko dla modów, adminów i biuroli */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');
/* END Zmiana "użytkownik wikii" na numer IP */

/* Koniec Common.js */
/*</pre>*/