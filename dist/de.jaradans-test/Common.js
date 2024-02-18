/* Das folgende JavaScript wird für alle Benutzer geladen. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});

div = document.getElementById('LINKA');

if (div) {
  div.addEventListener('click', function() {
    window.location.href = 'https://pikmin.fandom.com/de/wiki/Hauptseite';
  });
}