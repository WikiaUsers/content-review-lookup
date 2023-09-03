/* Das folgende JavaScript wird für alle Benutzer geladen. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});

document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById("container");

  container.addEventListener("click", function() {
    window.location.href = "https://jaradans-test.fandom.com/de/wiki/";
  });
});