/**
 * AjaxEditPreview
 *
 * @description Implements 'edit preview' modal for UCP's 2010 wikitext editor
 * @version 0.1
 * @author TheNozomi
 *
*/

mw.loader.using(['mediawiki.api', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
  'use strict';

  if (window.ajaxEditPreviewLoaded) return;

  var wgConf = mw.config.get([
    'skin',
    'wgAction',
    'wgPageContentModel',
    'wgPageName',
    'wgUserLanguage'
  ]);

  if (
    !(['edit', 'submit'].includes(wgConf.wgAction)) ||
    wgConf.wgPageContentModel !== 'wikitext'
  ) return;

  var editPreviewModal = null,
    lastWikitext = null;

  var $editArea = $('#wpTextbox1'),
    previewButton = document.getElementById('wpPreview'),
    saveButton = document.getElementById('wpSave');

  var api = new mw.Api();

  function onPreviewButtonClick (e) {
    if (e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if ($editArea.val() === lastWikitext) {
      return editPreviewModal.show();
    }

    editPreviewModal.setContent({
      type: 'div',
      classes: ['loading-spinner'],
      children: [
        {
          type: 'svg',
          classes: ['wds-spinner', 'wds-spinner__block'],
          attr: {
            width: 66,
            height: 66,
            viewBox: '0 0 66 66',
            xmlns: 'http://www.w3.org/2000/svg'
          },
          children: [
            {
              type: 'g',
              attr: {
                transform: 'translate(33, 33)'
              },
              children: [
                {
                  type: 'circle',
                  classes: ['wds-spinner__stroke'],
                  attr: {
                    fill: 'none',
                    r: 30,
                    'stroke-dasharray': 188.49555921538757,
                    'stroke-dashoffset': 188.49555921538757,
                    'stroke-linecap': 'round',
                    'stroke-width': 2
                  }
                }
              ]
            }
          ]
        }
      ]
    });

    editPreviewModal.show();

    api.post({
      formatversion: 2,
      action: 'parse',
      contentmodel: 'wikitext',
      title: wgConf.wgPageName,
      text: $editArea.val(),
      pst: '',
      prop: 'text|modules|jsconfigvars',
      preview: true,
      disableeditsection: true,
      useskin: wgConf.skin,
      uselang: wgConf.wgUserLanguage
    }).done(function(res) {
      lastWikitext = $editArea.val();
      if (res.parse.jsconfigvars) {
        mw.config.set(res.parse.jsconfigvars);
      }
      var modules = res.parse.modules.concat(
        res.parse.modulescripts,
        res.parse.modulestyles
      );
      mw.loader.using(modules).then(function() {
        editPreviewModal.setContent({
          type: 'div',
          attr: {
            id: 'mw-content-text'
          },
          children: [
            {
              type: 'div',
              classes: ['ontop'],
              attr: {
                id: 'wikiPreview'
              },
              children: [
                {
                  type: 'div',
                  classes: ['mw-content-ltr'],
                  attr: {
                    lang: 'en',
                    dir: 'ltr'
                  },
                  html: res.parse.text
                }
              ]
            }
          ]
        });
        mw.hook('wikipage.content').fire($('#AjaxEditPreview #mw-content-text'));
      });
    }).fail(function(err) {
      console.error(err);
      editPreviewModal.setContent({
        type: 'div',
        classes: ['preview-error'],
        text: 'Error: ' + err.message
      });
    });
  }

  function init(modal) {
    api.loadMessagesIfMissing([
      'visualeditor-savedialog-title-preview',
      'savechanges'
    ]).then(function() {
      editPreviewModal = new modal.Modal({
        content: '',
        id: 'AjaxEditPreview',
        size: 'large',
        title: mw.msg('visualeditor-savedialog-title-preview'),
        buttons: [
          {
            event: 'savePage',
            primary: true,
            text: mw.msg('savechanges')
          }
        ],
        events: {
          savePage: function() {
            saveButton.click();
          }
        }
      });
      editPreviewModal.create();
      previewButton.addEventListener('click', onPreviewButtonClick);
    });
  }

  mw.hook('dev.modal').add(init);

  importArticles({
    type: 'script',
    articles: [
      'u:dev:MediaWiki:UI-js/code.js',
      'u:dev:MediaWiki:Modal.js'
    ]
  });

  importArticle({
    type: 'style',
    article: 'u:dev:MediaWiki:AjaxEditPreview.css'
  });

  window.ajaxEditPreviewLoaded = true;
});