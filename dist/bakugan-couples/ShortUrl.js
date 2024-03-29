/**
 * @name ShortUrl
 * @author 机智的小鱼君
 *
 * @desc Get the "fake" short link provided by MediaWiki.
 *       Solve the very long link of the pages that name contain non-ASCII words.
 */
;(function($, mw, dev) {
  'use strict';
  // Cache config
  var conf = mw.config.get();

  // Shoud load?
  if (conf.wgArticleId < 1) return;
  if (dev.shortUrl !== undefined) return;

  // Variables
  var baseURL = window.shortUrlBase || conf.wgServer + conf.wgScript;
  var revision = conf.wgCurRevisionId;
  var oldid = Number(mw.util.getParamValue('oldid'));
  var diff = mw.util.getParamValue('diff');
  var curid = conf.wgArticleId;
  var threadId = mw.util.getParamValue('threadId');

  // Make query string
  var query = {};
  if (diff && oldid !== diff) {
    query.diff = diff;
    // oldid is prev?
    if (oldid && $('.diff-multi').length) {
      query.oldid = oldid;
    }
  } else if (oldid && oldid !== revision) {
    query.oldid = oldid;
  } else {
    query.curid = curid;
  }
  if (threadId) query.threadId = threadId;

  var shortUrl = baseURL + '?' + $.param(query);
  dev.shortUrl = shortUrl;

  // Add side tool
  function init(ctx) {
    var i18n = ctx[0];
    var addSideTool = ctx[1];
    var $tooltipContent = $('<span>').append(
      $('<strong>', { text: shortUrl }),
      $('<span>', { class: 'copyState', text: i18n.msg('copy').parse() })
    );

    var tool = addSideTool(
      '<svg class="wds-icon wds-icon-small" style="pointer-events: none"><path d="M9.605 6.98a.999.999 0 0 1 1.414 0 5.183 5.183 0 0 1 0 7.322l-1.181 1.181A5.148 5.148 0 0 1 6.177 17a5.144 5.144 0 0 1-3.66-1.517A5.142 5.142 0 0 1 1 11.823a5.14 5.14 0 0 1 1.517-3.66.999.999 0 1 1 1.414 1.413A3.155 3.155 0 0 0 3 11.822c0 .85.331 1.647.931 2.248 1.2 1.2 3.293 1.2 4.493 0l1.181-1.181a3.181 3.181 0 0 0 0-4.494.999.999 0 0 1 0-1.414zm5.89-4.476A5.104 5.104 0 0 1 17 6.134a5.103 5.103 0 0 1-1.504 3.633 1 1 0 0 1-1.414-1.414c.592-.593.918-1.38.918-2.218 0-.837-.326-1.624-.918-2.217-1.185-1.184-3.25-1.184-4.434 0l-1.17 1.17a3.114 3.114 0 0 0-.918 2.217c0 .838.326 1.625.918 2.217a.999.999 0 1 1-1.414 1.414A5.099 5.099 0 0 1 5.56 7.305c0-1.371.534-2.661 1.504-3.631l1.17-1.17A5.102 5.102 0 0 1 11.864 1a5.1 5.1 0 0 1 3.632 1.504z"></path></svg>',
      $tooltipContent
    );

    tool.$button.on('click', function() {
      // Create input element, exec copy, then destroy it
      var $tooltip = tool.$tooltip,
        $copyState = $tooltipContent.find('.copyState'),
        $input = $('<input>', {
          id: 'shortUrl-copy',
          value: shortUrl,
          style: 'z-index: -1; opacity: 0; position: absolute; left: -200vw;',
          readonly: 'readonly',
        });
      $tooltip.append($input);
      $input.trigger('select');
      document.execCommand('copy');
      $input.remove();
      $copyState.text(i18n.msg('copied').parse());
      setTimeout(function() {
        $copyState.text(i18n.msg('copy').parse());
      }, 1500);
    });

    mw.hook('dev.shortUrl').fire({
      shortUrl: shortUrl,
      sideTool: tool,
    });
  }

  // Insert short URL into article
  $('.shortUrl').text(shortUrl);
  $('.shortUrl-link, .shortUrlLink')
    .html('')
    .append($('<a>', { href: shortUrl, text: shortUrl }));

  // Dependencies
  importArticles({
    type: 'script',
    articles: [
      'u:dev:MediaWiki:I18n-js/code.js',
      'u:dev:MediaWiki:AddSideTool.js',
    ],
  });

  Promise.all([
    new Promise(function(next) {
      mw.hook('dev.i18n').add(function(data) {
        data.loadMessages('ShortUrl').then(function(i18n) {
          next(i18n);
        });
      });
    }),
    new Promise(function(next) {
      mw.hook('dev.addSideTool').add(next);
    }),
  ]).then(init);
})(
  window.jQuery,
  window.mediaWiki,
  (function() {
    window.dev = window.dev || {};
    return window.dev;
  })()
);