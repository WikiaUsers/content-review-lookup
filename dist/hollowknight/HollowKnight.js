!(function ($, mw) {
  var p = mw.config.get("wgTitle");
  var categories = mw.config.get("wgCategories");
  var ignoredCategories = [
    "Hidden Dreams",
    "The Grimm Troupe",
    "Lifeblood",
    "Godmaster",
    "Hollow Knight: Silksong",
    "Wiki",
    "Additional Content (Hollow Knight)",
    "Lore",
  ];
  var a = ["Hollow Knight (game)", "Quirrel"];

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
    categories.indexOf("Charms") != -1
  ) {
    importArticle({
      type: "style",
      article: "MediaWiki:HollowKnight.css",
    });
  }
})(jQuery, mediaWiki);