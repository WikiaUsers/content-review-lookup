/* global mw, $ */
/* <nowiki> */
(function () {
  console.log('Replace.js split-trigger loaded (tempered regex)');

  'use strict';
  if (!mw || mw.config.get('wgAction') !== 'view') return;

  // Escape for literal use inside RegExp
  function reEsc(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Match exactly ONE template invocation whose id=... appears BEFORE its first }}
  // Example match: {{ Replace ... id=foo ... }}
  function tplRegexSingle(tplName, id) {
    var name = reEsc(tplName);
    var eid  = reEsc(id);
    // (?!\}\}) tempered dot: consume anything that is not the closing '}}'
    return new RegExp(
      '\\{\\{\\s*(?:Template:)?' + name + '\\b' +
      '(?:(?!\\}\\})[\\s\\S])*?\\bid\\s*=\\s*' + eid +
      '(?:(?!\\}\\})[\\s\\S])*?\\}\\}',
      'i'
    );
  }

  // Same as above, but for ANY of several template names (e.g., With or Replace/b)
  function tplRegexAnySingle(tplNames, id) {
    var alt = tplNames.map(reEsc).join('|'); // e.g., With|Replace\/b
    var eid = reEsc(id);
    return new RegExp(
      '\\{\\{\\s*(?:Template:)?(?:' + alt + ')\\b' +
      '(?:(?!\\}\\})[\\s\\S])*?\\bid\\s*=\\s*' + eid +
      '(?:(?!\\}\\})[\\s\\S])*?\\}\\}',
      'i'
    );
  }

  function apiGetPage(title) {
    var api = new mw.Api();
    return api.get({
      action: 'query',
      prop: 'revisions',
      rvprop: ['content', 'timestamp'],
      rvslots: 'main',
      titles: title,
      formatversion: 2
    });
  }

  // Do the actual wikitext swap for one id
  function performSwap(title, id, finalText, buttonRaw) {
    var api = new mw.Api();
    var TRIGGER_TPLS = ['With', 'Replace/b']; // support both

    return apiGetPage(title).then(function (res) {
      var page = res.query.pages && res.query.pages[0];
      if (!page || page.missing) return $.Deferred().reject('Page missing').promise();

      var content = (page.revisions && page.revisions[0] && page.revisions[0].slots.main.content) || '';
      var ts = page.revisions[0].timestamp;

      var reReplace = tplRegexSingle('Replace', id);
      var reTrigger = tplRegexAnySingle(TRIGGER_TPLS, id);

      if (!reReplace.test(content)) {
        return $.Deferred().reject('Could not find {{Replace}} id=' + id).promise();
      }
      if (!reTrigger.test(content)) {
        return $.Deferred().reject('Could not find trigger ({{With}} or {{Replace/b}}) id=' + id).promise();
      }

      // Replace exactly one Replace and exactly one trigger, without touching others
      var newText = content.replace(reReplace, finalText).replace(reTrigger, buttonRaw);

      return api.postWithToken('csrf', {
        action: 'edit',
        title: title,
        text: newText,
        summary: 'Replace: completed (' + id + ')',
        basetimestamp: ts,
        minor: true
      });
    });
  }

  // Click handler for {{With}} or {{Replace/b}}
  function onTriggerClick(e) {
    e.preventDefault();

    var $tr = $(this).closest('.mw-replace-trigger'); // emitted by trigger template
    if (!$tr.length) return;

    var id        = String($tr.data('id') || '');
    var buttonRaw = String($tr.data('raw') || '');
    if (!id) { mw.notify('Trigger needs id=', { type: 'warn' }); return; }

    // Find the matching {{Replace … id=…}} in rendered DOM to read final text
    var $target = $('.mw-replace-target').filter(function () {
      return String($(this).data('id')) === id;
    }).first();

    var finalText = String($target.data('replacement') || '');
    if (!finalText) { mw.notify('Replace id=' + id + ' is missing its final text.', { type: 'warn' }); return; }

    var $link = $tr.find('a').first();
    $link.attr('aria-disabled', 'true').text('Saving…');

    performSwap(mw.config.get('wgPageName'), id, finalText, buttonRaw).then(function () {
      // Reflect the saved state immediately
      $target.replaceWith(document.createTextNode(finalText));
      $tr.replaceWith(document.createTextNode(buttonRaw));
      mw.notify('Saved: ' + id, { type: 'success' });
    }).fail(function (err) {
      console.error(err);
      $link.removeAttr('aria-disabled').text(buttonRaw);
      var info = (err && err.error && err.error.info) ? err.error.info : String(err);
      mw.notify('Could not save: ' + info, { type: 'error' });
    });
  }

  function bind($root) {
    // Delegate to the anchor inside the trigger template output
    $root.on('click', '.mw-replace-trigger a', onTriggerClick);
  }

  mw.loader.using(['mediawiki.api']).then(function () {
    bind($(document));
    mw.hook('wikipage.content').add(function ($c) { bind($c); });
  });
})();
/* </nowiki> */