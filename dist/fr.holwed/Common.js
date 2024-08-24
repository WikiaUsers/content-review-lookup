SpoilerAlert = {
  categories: "Spoiler",
  question: 'ATTENTION ! Cette page contient des Spoilers. �tes-vous s�r de vouloir continuer ?',
  yes: 'Oui',
  no: 'Non',
  isSpoiler: function () {
      return Boolean($('#spoiler').length);
  }
}
importScriptPage('SpoilerAlert/code.js', 'dev');
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});