/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */
importArticles( { 
        type: 'script',
        articles: [
                'u:dev:AjaxRC/code.js'
        ]
});

/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */
 
importArticles({
    type: 'script',
    articles: [
         'u:dev:AjaxRC/code.js',
    ]
});

var ajaxPages = ["Spezial:Letzte_�nderungen", "Spezial:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Aktualisierung';

 $(function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
});