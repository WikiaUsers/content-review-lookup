/*
 * Name: InfoboxEditorPreview
 * Description: Adds a preview dialog for trying out your infobox markup with existing articles.
 * Author: Pogodaanton
 */
(function (window) {
  "use strict";
  window.dev = window.dev || {};

  if (
    typeof window.dev.infoboxEditorPreview !== "undefined" ||
    mw.config.get("wgNamespaceNumber") !== 10
  ) {
    return;
  }
  if (!mw.config.get("wgIsPortableInfoboxTemplate")) return;
  mw.loader.using("ext.visualEditor.desktopArticleTarget.init").then(function () {
    window.importArticle({
      type: "script",
      article: "u:dev:MediaWiki:InfoboxEditorPreview/ucp.js",
    });
  });
})(window);