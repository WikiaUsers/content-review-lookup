/* Augments the core Media Wiki TOC boxes to allow an optionally floatible version. */

/**************************************************************************************

* This 'MediaWiki/FloatingToc/code.js' is included by MediaWiki/Common.js, and is
loaded after MW / Oasis, 'Common' and 'Wikia', will be loaded via import as 'load.php'
which appears at the *bottom* of the page.

* All files will be checked and minified nearly the same.

* This version stabilizes aspects of the original work, for high volume site.

* Attribution: Author Pecoes http://dev.wikia.com/FloatingToc.

* The deal breaker was not being able to fix wiggle because of "inline-block" set on
#toc-wrapper, where #toc has 'block' naturally, and the em margin mesurements meant
no matter which one you override to make same, it will either harm MW toc mechanics or
wiggle in-transition for either title line-height or differences in meaning for em on
margin. Now is being cleaned up to be more performant and seriviceable in general.

***************************************************************************************/

/**
* TODO:
* - resize constraint
* - auto-open option
*/

//__NOWYSIWYG__ <source lang="javascript">
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
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

  // Dont rely on load order, assuptions on display state, or validity of js reference.
  //  Use these for each set of code instead of global var. 
  function getpagetoc() { return $('#toc'); }
  function getdialogtoc() { return $('#tocDialogNav'); }
  function gettoclist(toc) { return toc.find('ol:first') || toc.find('ul:first') }

  /*
  function initStyles() {

  if ($("style:contains('FloatingToc')").length < 1) { // check marker style. if not exist then add styles

  $.getScript('/load.php?mode=articles&only=scripts&debug=false&articles=u:dev:Colors/code.js')
  .done(function () {
  // ---------- function
  var styles = "";
  var pageBright = window.dev.colors.parse(window.dev.colors.wikia.page).isBright(),
  menuBright = window.dev.colors.parse(window.dev.colors.wikia.menu).isBright();
  var icons = {
  white: '//images.wikia.com/dev/images/c/c2/Ui-icons_ffffff_256x240.png',
  black: '//images.wikia.com/dev/images/a/aa/Ui-icons_222222_256x240.png',
  lightGray: '//images.wikia.com/dev/images/4/48/Ui-icons_cccccc_256x240.png',
  darkGray: '//images.wikia.com/dev/images/8/89/Ui-icons_666666_256x240.png',
  url: function (color) { return 'url("' + this[color] + '");'; }
  };
  styles = '.FloatingToc{text-align:center};#tocDialog.toc ul ul{margin:0 0 0 2em}' +
  '#tocDialog{margin-top:0;border:none!important;left:auto;right:auto;top:auto;bottom:auto;height:auto;width:auto;float:none!important}' +
  '.toc-dialog{border:2px solid $border;z-index:20000002 !important}' + '.toc-dialog .ui-corner-all{border-radius:6px 6px 6px 6px}' +
  '.toc-dialog .ui-dialog-titlebar,#open-toc-win.ui-state-hover{background:$menu;background:-moz-linear-gradient(top,$gradient 35%,$menu 65%);background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,$gradient),color-stop(65%,$menu));background:-webkit-linear-gradient(top,$gradient 35%,$menu 65%);background:-o-linear-gradient(top,$gradient 35%,$menu 65%);background:-ms-linear-gradient(top,$gradient 35%,$menu 65%);background:linear-gradient(to bottom,$gradient 35%,$menu 65%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="$gradient",endColorstr="$menu",GradientType=0)}' +
  '#open-toc-win.ui-state-hover{border:1px solid $page-border-gray}' +
  '.toc-dialog .ui-dialog-titlebar{border:1px solid $menu;color:$contrast;font-weight:normal;padding:.25em 1em}' +
  '.toc-dialog,.toc-dialog .toc{background-color:$page;color $text}' +
  '#toc-back,#toc-maximize{background:transparent;border:0;height:20px;position:absolute;top:2px;width:22px}' +
  '#toc-back{right:50px}' + '#toc-maximize{right:25px}' + '#tocDialog a{color:$link;font-size:85%}' +
  '#open-toc-win{background:transparent;border:1px solid $page-border-gray;height:18px;width:18px;position:absolute;top:4px;right:4px;}' +
  //'#open-toc-win{background:transparent;border:1px solid $page-border-gray;height:18px;margin:0 4px;vertical-align:middle;width:18px;display:inline-block}' +
  '#toc.tochidden #open-toc-win{display:none}' + '.toc-dialog.ui-widget-content .ui-icon{background-image:$menu-gray-icons}' +
  '#open-toc-win .ui-icon{background-image:$page-gray-icons}' +
  '#open-toc-win.ui-state-hover .ui-icon,.toc-dialog .ui-dialog-titlebar .ui-icon{background-image:$menu-bw-icons}' +
  '.toc-dialog .ui-dialog-titlebar-close.ui-state-hover,#toc-maximize.ui-state-hover,#toc-back.ui-state-hover{background:$contrast;background:-moz-linear-gradient(top,$menu 35%,$gradient 65%);background:-webkit-gradient(linear,left top,left bottom,color-stop(35%,$menu),color-stop(65%,$gradient));background:-webkit-linear-gradient(top,$menu 35%,$gradient 65%);background:-o-linear-gradient(top,$menu 35%,$gradient 65%);background:-ms-linear-gradient(top,$menu 35%,$gradient 65%);background:linear-gradient(to bottom,$menu 35%,$gradient 65%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="$menu",endColorstr="$gradient",GradientType=0);border:1px solid $gradient}' +
  'body.mediawiki.scroll-lock{overflow:hidden !important;}' + 'body.mediawiki.adjust-scroll{margin-left: -16px !important;}' +
  '.toc-link{ display:inline-block;height:12px;margin-left:12px;opacity:.8;position:relative;vertical-align:baseline;width:12px;}' +
  '.page-dark .toc-link{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAIklEQVR42mJgRAIMjAwgBAYQDkKGHGUgAqISziHFNIAAAwAgIwBoFh42eAAAAABJRU5ErkJggg==") repeat scroll 0 0 transparent}' +
  '.page-bright .toc-link{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAIklEQVR42mJgRAIMjAwgBAYQDkKGHGUgAqISziHFNIAAAwAgIwBoFh42eAAAAABJRU5ErkJggg==") repeat scroll 0 0 transparent}'
  ;
  styles = '<style type="text/css">' +
  window.dev.colors.replace(styles, {
  'page-border-gray': pageBright ? '#CCCCCC' : '#666666',
  'menu-gray-icons': menuBright ? icons.url('darkGray') : icons.url('lightGray'),
  'page-gray-icons': pageBright ? icons.url('lightGray') : icons.url('darkGray'),
  'menu-bw-icons': menuBright ? icons.url('black') : icons.url('white')
  }) +
  '</style>';
  $(window.document.head).append(styles);
  // ---------- function
  });

  }

  //$(document.body).removeClass('TOC_hide');  // i think now uses 'tochidden', this no work for long time.
  }
  */

  function initToc() {

    //*******************
    // new code

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

    //***************************************************************
    //  OLD CODE

    /*
    var root = $('#toc'),               // this is what will be wrapped
    offset = root.offset(),
    tocList = root.find('ul:first'),
    tocTitle = $('#toctitle'),
    tocButton, wrapper;

    function contents() {
    return tocList.html();              // this exists at parse from above
    }

    function show() {
    wrapper.slideDown(SPEED);        // this 'wrapper' wont exist until the end of this init
    }
    
    css = {
    fontSize: parseInt(root.css('font-size'), 10) + 'px'
    };

    tocTitle.css('white-space', 'nowrap');      // should be optional. however in our case we are fixing the button to upper right so is gone

    root.wrap('<div id="toc-wrapper"></div>');  // this would do the wrap immediately and browser would act, leaving big delay before styled
    wrapper = $('#toc-wrapper');

    tocButton = $('<button id="open-toc-win"></button>')
    .appendTo(tocTitle)
    .button({
    icons: {
    primary: "ui-icon-newwin"
    },
    text: false
    })
    .attr('title', i18n.open)
    .one('click', function () {
    toc.width = tocList.width();
    toc.height = tocList.height();
    })
    .click(function () {
    wrapper.slideUp(SPEED);
    tocLinks.css('display', 'none');
    });

    wrapper
    .css({
    display: 'inline-block',
    marginTop: root.css('margin-top'),
    marginBottom: root.css('margin-bottom'),
    maxWidth: root.outerWidth()
    });

    root.css('margin', '0');

    toc = {
    top: offset.top,
    left: offset.left,
    button: tocButton,
    show: show,
    contents: contents,
    css: css
    };
    */

    //   OLD CODE
    //***************************************************************
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

      $(window.document.head).append(     // let browser start this asap
        '<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />'
      );

      win = $(window);
      page = $('#WikiaPage');
      i18n = translations[module.lang || mw.config.get('wgContentLanguage')] || translations.en;

      //$.getScript('/load.php?mode=articles&only=scripts&debug=false&articles=u:dev:Colors/code.js')
      //  .done(initStyles);
      mw.loader.using(['jquery.ui.dialog', 'jquery.effects.slide'], function () {
        //initStyles();   // using generated static styles
        initToc();
        initDialog();
      });
    }
  });

} ((window.dev = window.dev || {}).floatingToc = window.dev.floatingToc || {}, mediaWiki, jQuery, window));
//</source>