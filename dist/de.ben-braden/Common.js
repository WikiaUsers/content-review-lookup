/* Jedes JavaScript hier wird f�r alle Benutzer f�r jede Seite geladen. */
if (mw.config.get('wgPageName') == 'Hauptseite') { new BannerNotification('[[Schlacht von Umbara|Hier]] klicken', 'confirm'); }

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});