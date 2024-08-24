/* Artikelimport für Countdowns + Zugehörigkeitsboxen */
importArticles({
    type: 'script',
    articles: [
        'u:dev:PurgeButton/code.js',
        'u:dev:WallGreetingButton/code.js',
        'w:c:dev:Countdown/code.js',
        'w:c:de.harry-grangers-test:MediaWiki:Labels.js'
    ]
});

/* Auto-refreshing recent changes */
ajaxPages = ["Spezial:WikiActivity","Spezial:Letzte_Änderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beiträge"];
AjaxRCRefreshText = 'Aktualisierung';
AjaxRCRefreshHoverText = 'Aktualisiert die Seite automatisch';
importScriptPage('AjaxRC/code.js', 'dev');

/* Countdownkategorisierung bei Ablaufdatum */
window.countdownTimer = {
    CounterStop: function (i) {
       switch ($(this).attr('data-afterEnd')) {
            case 'remove':
                $(this).remove();
                return true;
            case 'stop':
                output(i, 0);
                return true;
            case 'toggle':
                var toggle = $(this).attr('data-toggle');
                if (toggle && $(toggle).length) {
                    $(toggle).css('display', 'inline');
                    $(this).css('display', 'none');
                    return true;
                }
                break;
         }
         countdowns[i].countup = true;
         output(i, 0);
         return false;
    }
}