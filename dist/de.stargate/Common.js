/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */
importArticles({
    type: 'style',
    articles: [
        'MediaWiki:MainPage.css'
    ]
});

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

if(wgNamespaceNumber == 8 || wgNamespaceNumber == 10) {
    PurgeButtonText = 'Neuladen';
     
    importArticles({
        type: 'script',
        articles: [
            'u:dev:PurgeButton/code.js'
        ]
    });
}

$('map area').hover(function() {
   $(this).append($('<span />').attr('title',$(this).attr('title')).css({
       backgroundColor: 'rgba(0,0,0,0.6)',
       color: 'white',
       position: 'absolute',
       zIndex: 1000
   }).text($(this).attr('title')));
});

$('map area').mouseleave(function() {
    $('span[title="' + $(this).attr('title') + '"').hide();
});

/* Automatisches Aktualisieren der Seite (Refresh) */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'automatisches Aktualisieren ohne Neuladen der kompletten Seite';
window.ajaxPages = ["Spezial:Letzte_�nderungen", "Spezial:WikiActivity", "Spezial:Beobachtungsliste"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Fix f�r Stargate-Schrift */
/*$('body > *:contains(�), body > *:contains(�), body > *:contains(�)').each(function(key,val) {
  console.log($(val).text());
  $(val).text($(val).text().replace('�','ae').replace('�','ue').replace('�','oe'));
});*/