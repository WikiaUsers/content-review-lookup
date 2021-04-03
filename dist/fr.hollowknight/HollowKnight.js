!(function ($, mw) {
  var p = mw.config.get("wgTitle");
  var categories = mw.config.get("wgCategories");
  var ignoredCategories = [
    "Rêves Cachés",
    "La Troupe Grimm",
    "Sang-de-vie",
    "Chercheur de Dieux",
    "Hollow Knight: Silksong",
    "Wiki",
    "Contenu additionnel (Hollow Knight)",
  ];
  var a = ["Hollow Knight (jeu)", "Quirrel"];

  function containsHollowKnight(cat) {
    return cat.indexOf("Hollow Knight") != -1;
  }

  function isIgnored(cat) {
    return ignoredCategories.indexOf(cat) != -1;
  }

  if (categories.some(isIgnored)) {
    return;
  }
  if (
    a.indexOf(p) !== -1 ||
    containsHollowKnight(p) ||
    categories.some(containsHollowKnight) ||
    categories.indexOf("Charmes") != -1
  ) {
    importArticle({
      type: "style",
      article: "MediaWiki:HollowKnight.css",
    });
  }
})(jQuery, mediaWiki);