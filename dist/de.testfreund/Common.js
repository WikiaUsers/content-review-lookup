@import url('/load.php?debug=false&lang=en&mode=articles&articles=u:dev:MediaWiki:ModernWikiActivity.css&only=styles');

/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:MediaWiki/TopEditors/code.js'
    ]
});