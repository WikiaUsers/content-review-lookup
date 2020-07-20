/* Augments the core Media Wiki TOC boxes to allow an optionally float-able version. */

/**************************************************************************************

* This 'MediaWiki:FloatingToc/code.js' is included by MediaWiki:Common.js, and is
loaded after MW / Oasis, 'Common' and 'Wikia', will be loaded via import as 'load.php'
which appears at the *bottom* of the page.

* All files will be checked and minified nearly the same.

* This version stabilizes aspects of the original work, for high volume site.

* Attribution: Author Pecoes http://dev.wikia.com/FloatingToc.

* The deal breaker was not being able to fix wiggle because of "inline-block" set on
#toc-wrapper, where #toc has 'block' naturally, and the em margin measurements meant
no matter which one you override to make same, it will either harm MW TOC mechanics or
wiggle in-transition for either title line-height or differences in meaning for em on
margin.hp

***************************************************************************************/

/**
* TODO:
* - resize constraint
* - auto-open option
*/

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

(function (module, mw, $, window) {

  'use strict';

  if (module.loaded) return;
  module.loaded = true;

  var translations = {
    en: {
      contents: 'Contents',
      toc: 'Table of Contents',
      open: 'Open',
      close: 'Close',
      back: 'Back to Top',
      reset: 'Reset'
    },
    de: {
      contents: 'Inhalt',
      toc: 'Inhaltsverzeichnis',
      open: 'Öffnen',
      close: 'Schließen',
      back: 'Seitenanfang',
      reset: 'Zurücksetzen'
    },
    hu: {
      contents: 'Tartalom',
      toc: 'Tartalomjegyzék',
      open: 'Kinyit',
      close: 'Összecsuk',
      back: 'Vissza a tetejére',
      reset: 'Alaphelyzetbe állítás'
    },
    pl: {
      contents: 'Treść',
      toc: 'Spis treści',
      open: 'Otwórz',
      close: 'Zamknij',
      back: 'Powrót na górę',
      reset: 'Reset'
    },
    ca: {
      contents: 'Continguts',
      toc: 'Taula de continguts',
      open: 'Obrir',
      close: 'Tancar',
      back: 'Tornar a dalt',
      reset: 'Restablir configuració'
    },
    es: {
      contents: 'Contenidos',
      toc: 'Tabla de contenidos',
      open: 'Abrir',
      close: 'Cerrar',
      back: 'Volver arriba',
      reset: 'Restablecer configuración'
    },
    ru: {
      contents: 'Содержание',
      toc: 'Вернуться к содержанию',
      open: 'Развернуть',
      close: 'Закрыть',
      back: 'В начало страницы',
      reset: 'Обновить'
    }
  };

  var SPEED = 300;

  var win, page, toc, i18n, tocLinks;

  // Don't rely on load order, assumptions on display state, or validity of js reference.
  //  Use these for each set of code instead of global var. 
  function getpagetoc() { return $('#toc'); }
  function getdialogtoc() { return $('#tocDialogNav'); }
  function gettoclist(toc) { return toc.find('ol:first') || toc.find('ul:first') }

  function initToc() {

    var root = getpagetoc(),               // this is what will be wrapped
      offset = root.offset(),
      tocButton, wrapper;

    function contents() {
      var tocList = gettoclist(getpagetoc())[0];
      return tocList ? tocList.outerHTML : "";              // this exists at parse from above
    }

    function show() {
      wrapper.slideDown(SPEED);        // this 'wrapper' wont exist until the end of this init
    }

    // Build text
    var swrap = '<div id="toc-wrapper"></div>';

    var satop = '<a href="#toc" class="toc-link" title="Table of Contents"></a>';

    // Wrap root and grab references
    root.wrap(swrap);
    wrapper = $('#toc-wrapper');

    //root.append(sbutton);
    tocButton = $('<button id="open-toc-win"></button>')
      .appendTo('#toctitle')
      .button({
        icons: {
          primary: "ui-icon-newwin"
        },
        text: false
      })
      .attr('title', i18n.open)
      .click(function () {
        var tocList = gettoclist(getpagetoc());
        toc.width = tocList.width();            // get these at the last minite, and each time.
        toc.height = tocList.height();          //   cause we need fit whatever current size is
        wrapper.slideUp(SPEED);
        tocLinks.css('display', 'none');
      });

    $(satop)
        .insertBefore($('#mw-content-text').find('h2,h3').find('.editsection'));
    tocLinks = $('.toc-link');

    toc = {
      top: offset.top,
      left: offset.left,
      button: tocButton,
      show: show,
      contents: contents
    };
  }

  function initDialog() {

    var core, panel, resizing = false;

    function fixPosition() {
      if (panel.css('position') === 'fixed') return;
      var offset = panel.offset();
      panel.css({
        top: offset.top - win.scrollTop() + 'px',
        left: offset.left - win.scrollLeft(),
        position: 'fixed'
      });
    }

    function create() {
      /*jshint validthis:true*/

      panel = $(this).parent();

      var closeButton = panel.find('.ui-dialog-titlebar-close')
        .attr('title', i18n.close);

      $(document.body)
        .prepend('<a name="top" style="display: none;"></a>');

      $('<button id="toc-back"></button>')
        .insertBefore(closeButton)
        .button({
          icons: {
            primary: 'ui-icon-arrowreturnthick-1-n'
          },
          text: false
        })
        .attr('title', i18n.back)
        .click(function () {
          window.location.hash = '#top';
          win.scrollTop(0);
        });

      $('<button id="toc-maximize"></button>')
        .insertBefore(closeButton)
        .button({
          icons: {
            primary: 'ui-icon-refresh'
          },
          text: false
        })
        .attr('title', i18n.reset)
        .click(reset);
    }

    function reset() {
      var leftGutter = page.offset().left - toc.width - 30,
        posLeft = leftGutter > 0 ? Math.floor(leftGutter * 0.75) : 'center',
        height = Math.min(toc.height + 30, win.height() - 8),
        topGutter = win.height() - height,
        posTop = topGutter > 200 ? Math.floor(topGutter * 0.2) : 'center';
      core.dialog('option', 'height', height);
      core.dialog('option', 'width', toc.width + 30);
      core.dialog('option', 'position', [posLeft, posTop]);
      var dialogNav = getdialogtoc()[0];
      if (dialogNav) dialogNav.innerHTML = toc.contents();
    }

    function open() {
      panel.css('display', 'none');
      reset();
      panel.slideDown(SPEED);
      window.setTimeout(function () {
        fixPosition();
        core.find('a').blur();
      }, SPEED + 50);
    }

    function beforeClose() {
      panel.css({
        position: 'absolute',
        top: panel.offset().top + 'px',
        left: panel.offset().left + 'px'
      });
      window.location.href = '#toc';
      if (win.scrollTop() > toc.top) {
        if (toc.top + toc.height < win.height()) {
          win.scrollTop(0);
        } else {
          win.scrollTop(toc.top - 20);
        }
      }
      toc.show();
      panel.stop().slideUp(SPEED);
      tocLinks.css('display', 'inline-block');
    }

    function resizeStart() {
      resizing = true;
    }

    function resizeStop() {
      resizing = false;
      fixPosition();
    }

    function init() {

      core.dialog({
        dialogClass: 'toc-dialog',
        height: Math.min(toc.height + 30, win.height() - 8),
        width: toc.width + 30,
        position: { my: 'center', at: 'center', of: toc.root },
        create: create,
        beforeClose: beforeClose,
        open: open,
        resizeStart: resizeStart,
        resizeStop: resizeStop
      });

      panel = core.parent()
        .draggable('option', 'scroll', false)
        .draggable('option', 'containment', 'window');

      toc.button
        .click(function () {
          core.dialog('open');
        });

      var resizeTimeout = false;
      win.resize(function () {
        if (core.dialog('isOpen') && !resizing) {
          panel.css('display', 'none');
          if (resizeTimeout) window.clearTimeout(resizeTimeout);
          resizeTimeout = window.setTimeout(function () {
            reset();
            panel.slideDown(SPEED);
          }, 200);
        }
      });
    }

    // this defines the dialog
    core = $('<div id="tocDialog" class="WikiaArticle" title="' + i18n.contents +
        '" style="display:none;"><nav id="tocDialogNav" class="toc show"></nav></div>')
      .appendTo('#WikiaArticle');

    toc.button
      .one('click', init);
  }

  // Start
  $(function () {
    if (window.document.getElementById('toc')) {

      win = $(window);
      page = $('#WikiaPage');
      i18n = translations[module.lang || mw.config.get('wgContentLanguage')] || translations.en;

      mw.loader.using(['jquery.ui.dialog'], function () { // importing effects directly, effects not depend on ui core
        //mw.loader.using(['jquery.ui.dialog', 'jquery.effects.slide'], function () {
        initToc();
        initDialog();
      });
    }
  });

} ((window.dev = window.dev || {}).floatingToc = window.dev.floatingToc || {}, mediaWiki, jQuery, window));