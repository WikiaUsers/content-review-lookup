// ADD "last Updated:" NOTE TO ALL PAGES (that has a specific gif)
(function () {
  'use strict';

  var TEMPLATE_WIKITEXT = '{{UpdatedNote}}';
  var NOTE_ID = 'updated-note-js';
  var REQUIRED_IMAGE_KEY = 'Gayotic.gif'; // match data-image-key

  function shouldRun($content) {
    // Only main/article namespace (namespace 0)
    if (mw.config.get('wgNamespaceNumber') !== 0) return false;

    // Extra guard: skip special pages (usually namespace -1 anyway)
    if (mw.config.get('wgCanonicalSpecialPageName')) return false;

    // Only pages that include the specific file (as rendered in the HTML)
    return $content.find('img[data-image-key="' + REQUIRED_IMAGE_KEY + '"]').length > 0;
  }

  function insertUpdatedNote($content) {
    // Avoid duplicates
    if ($content.find('#' + NOTE_ID).length) return;

    if (!shouldRun($content)) return;

    var api = new mw.Api();

    api.post({
      action: 'parse',
      format: 'json',
      text: TEMPLATE_WIKITEXT,
      contentmodel: 'wikitext',
      // Set context so things like {{FULLPAGENAME}} resolve to *this* page
      title: mw.config.get('wgPageName'),
      prop: 'text'
    }).done(function (data) {
      var html = data && data.parse && data.parse.text && data.parse.text['*'];
      if (!html) return;

      // Wrap it so we can detect it later and not double-insert
      var $note = $('<div>').attr('id', NOTE_ID).html(html);

      $content.find('.mw-body-content').first().prepend($note);
    });
  }

  // Run on initial load + whenever Fandom swaps page content
  mw.hook('wikipage.content').add(function ($content) {
    insertUpdatedNote($content);
  });
})();