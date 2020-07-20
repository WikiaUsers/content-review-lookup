/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*<pre>*/
/* Dodatkowe przyciski w pasku edycji */
//importScript('MediaWiki:Common.js/przyciski.js');
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/66/%C5%8C_button.png",
        "speedTip": "Dodaj ō",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/85/%C5%AA_button.png",
        "speedTip": "Dodaj ū",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/%C4%AA_button.png",
        "speedTip": "Dodaj ī",
        "tagOpen": "ī",
        "tagClose": "",
        "sampleText": ""
    };
}

/* IMPORT */
importArticles({
    type: "script",
    articles: [
      "MediaWiki:Common.js/przełączanie.js", /* przełączanie */
      "MediaWiki:Common.js/ajax.js" /* Automatyczne odświeżanie ostatnich zmian */
    ]
});