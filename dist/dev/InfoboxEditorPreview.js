/*
 * Name: InfoboxEditorPreview
 * Description: Adds a preview dialog for trying out your infobox markup with existing articles.
 * Author: Pogodaanton
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
  'use strict';
  window.dev = window.dev || {};
  var conf = mw.config.get([
    'wgNamespaceNumber',
    'wgIsEditPage'
  ]);

  if (
    typeof window.dev.infoboxEditorPreview !== 'undefined' ||
    conf.wgNamespaceNumber !== 10 ||
    !conf.wgIsEditPage ||
    $('.template-classification-type-text').attr('data-type') !== 'infobox' ||
    typeof window.ace === 'undefined'
  ) {
    return;
  }

  window.importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:InfoboxEditorPreview/main.js'
  });
});