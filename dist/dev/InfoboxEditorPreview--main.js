/*
 * Name: InfoboxEditorPreview
 * Description: Adds a preview dialog for trying out your infobox markup with existing articles.
 * Author: Pogodaanton
 * <nowiki>
 */
require(['wikia.window', 'jquery', 'mw', 'wikia.mustache', 'wikia.ace.editor', 'wikia.nirvana'], function (window, $, mw, mustache, editarea, nirvana) {
  window.dev = window.dev || {};

  function InfoboxEditorPreview () {
    this.api = new mw.Api();
    this.wg = mw.config.get(['wgIsDarkTheme', 'wgEditedTitle', 'wgArticlePath']);
    this.infoboxTitle = this.wg.wgEditedTitle;
    this.embedTitle = this.infoboxTitle;
    this.previewTitle = null;
    this.previewEditor = null;
    this.embeddedInCache = [];
    this.isDraftBypassEnabled = false;
    this.$ipInner = null;
    this.$throbber = null;
    this.infoboxArgs = {};
    this.mwmsg = {};

    mw.hook('dev.fetch').add(this.cacheMWMessages.bind(this));
    mw.hook('dev.i18n').add(this.loadi18nMessages.bind(this));
    mw.hook('dev.wds').add(this.libraries.$handle.bind({ referrer: this, library: 'wds' }));
    mw.hook('dev.colors').add(this.libraries.$handle.bind({ referrer: this, library: 'colors' }));

    $.when(this.libraries.$wdsPromise, this.libraries.$fetchPromise, this.libraries.$colorsPromise, this.libraries.$i18nPromise)
      .then(this.cacheEmbeddedInList.bind(this))
      .then(this.addEditorUI.bind(this));

    window.importArticle({
      type: 'script',
      articles: [
        'u:dev:WDSIcons/code.js',
        'u:dev:Colors/code.js',
        'u:dev:MediaWiki:Fetch.js',
        'u:dev:MediaWiki:I18n-js/code.js'
      ]
    },
    {
      type: 'style',
      articles: [
        'u:dev:MediaWiki:InfoboxEditorPreview/style.css'
      ]
    });
  }

  /**
   * Returns an array with function names which will be executed on conversion when selected by the user.
   * The function expects that i18n-js is already in scope when executed.
   */
  InfoboxEditorPreview.prototype.getAlgorithms = function () {
    if (typeof this.i18n === 'undefined') throw new Error('[InfoboxEditorPreview] i18n-js has not been loaded yet!');
    return [
      { key: 'accurate', title: this.i18n.msg('algaccurate').escape() },
      { key: 'fast', title: this.i18n.msg('algfast').escape() }
    ];
  };

  // Library cache, promises & hook handler
  InfoboxEditorPreview.prototype.libraries = {
    $handle: function (data) {
      this.referrer[this.library] = data;
      this.referrer.libraries['$' + this.library + 'Promise'].resolve();
    },
    $wdsPromise: $.Deferred(),
    $fetchPromise: $.Deferred(),
    $colorsPromise: $.Deferred(),
    $i18nPromise: $.Deferred()
  };

  /**
   * Caches needed MediaWiki messages and fires fetch library handler afterwards.
   * @param {Function} fetch Function that comes with the 'dev.fetch' hook.
   */
  InfoboxEditorPreview.prototype.cacheMWMessages = function (fetch) {
    var self = this;
    fetch(['templatedraft-subpage', 'template-classification-type-infobox']).then(function (msg) {
      var messages = msg();
      self.mwmsg.draft = messages[0];
      self.mwmsg.infobox = messages[1];
      self.isInfoboxDraft = self.infoboxTitle.indexOf('/' + self.mwmsg.draft) > -1;
      self.libraries.$handle.call({ referrer: self, library: 'fetch' }, fetch);
    });
  };

  /**
   * Loads all custom messages via i18n-js.
   * @param {Function} i18n Function that comes with the 'dev.i18n' hook.
   */
  InfoboxEditorPreview.prototype.loadi18nMessages = function (i18n) {
    i18n.loadMessages('InfoboxEditorPreview', { cacheVersion: 2 }).done(this.libraries.$handle.bind({ referrer: this, library: 'i18n' }));
  };

  /**
   * Displays an error in the infobox preview.
   * This should only be called when the dialog is already opened.
   * @param {String} msg Error message.
   * @param ...rest Output to the console.
   */
  InfoboxEditorPreview.prototype.setInfoboxError = function () {
    var msg = arguments[0] || 'Unknown Error';

    if (typeof this.$ipInner === 'undefined' || typeof this.$ipInner.html === 'undefined') {
      console.error('[InfoboxEditorPreview] An error happened while not in previewing mode:');
    } else {
      console.error('[InfoboxEditorPreview] An error happened while previewing:')
    }

    for (var i = 0; i < arguments.length; i++) console.error(arguments[i]);

    this.$ipInner.html('<p class="pi-error-info">' + this.i18n.msg('errorpi').escape() + '</br>' + msg + '</p>');
    this.$throbber.stopThrobbing();
  };

  /**
   * Initial UI creation; Inserts the preview button and custom CSS
   */
  InfoboxEditorPreview.prototype.addEditorUI = function () {
    var self = this;
    var previewIcon = this.wds.icon('pages').outerHTML;
    var $editPage = $('#EditPage');

    // Adding CSS with custom parameters
    var cssVariables = [
      '--wdsBackground:' + this.colors.wikia.menu,
      '--wdsHoverBackground:' + this.colors.parse(this.colors.wikia.menu).lighten(20),
      '--wdsColor:' + this.colors.wikia.contrast
    ];
    mw.util.addCSS(':root {' + cssVariables.join(';') + '}');

    // Removing Mobile preview and adding custom button
    $('#wpPreviewMobile').remove();
    $('<a/>')
      .attr({
        id: 'wpPreviewInfobox',
        class: 'preview_infobox preview_icon',
        href: '#'
      })
      .html(previewIcon + '<p>' + this.mwmsg.infobox + '</p>')
      .on('click', this.createDialog.bind(this))
      .popover({
        placement: 'top',
        trigger: 'manual'
      })
      .on('mouseenter', function (e) {
        var modifiers = e.ctrlKey || e.metaKey;
        if (modifiers && self.isInfoboxDraft) {
          $(this).attr('data-original-title', self.i18n.msg('draftbypasstooltip').plain()).popover('show');
        } else if ($editPage.hasClass('editpage-sourcewidemode-on')) {
          $(this).attr('data-original-title', self.mwmsg.infobox).popover('show');
        }
      })
      .on('mouseleave', function () { $(this).popover('hide'); })
      .insertBefore('#wpPreview');
  };

  /**
   * Checks whether the provided click event also triggered draftBypass.
   * In such cases the embeddedInCache needs to be rebuilt.
   * @param {Object} e The click event from #wpPreviewInfobox.
   * @returns Deferred promise object.
   */
  InfoboxEditorPreview.prototype.checkCache = function (e) {
    if (e.ctrlKey || e.metaKey) {
      this.isDraftBypassEnabled = true;
      return this.cacheEmbeddedInList();
    } else if (this.isDraftBypassEnabled) {
      this.isDraftBypassEnabled = false;
      return this.cacheEmbeddedInList();
    } else if (this.cacheEmbeddedInList.length <= 0) {
      return this.cacheEmbeddedInList();
    }

    return $.Deferred().resolve();
  };

  /**
   * Caches a list of articles transcluding the previewed infobox.
   * If the previewed infobox is a draft, the script will automatically request the linklist of its parent template.
   */
  InfoboxEditorPreview.prototype.cacheEmbeddedInList = function () {
    var promise = $.Deferred();
    var self = this;

    // Removing "/draft" for better results
    if (
      !this.isDraftBypassEnabled &&
      this.isInfoboxDraft
    ) {
      this.embedTitle = this.embedTitle.replace('/' + this.mwmsg.draft, '');
    } else {
      this.embedTitle = this.infoboxTitle;
    }

    // Requesting linklist and pushing page names to an array
    this.api.get({
      action: 'query',
      list: 'embeddedin',
      eititle: this.embedTitle,
      einamespace: '0|2|500|502|12|4',
      eilimit: 15,
      format: 'json'
    }).done(function (data) {
      if (typeof data.query.embeddedin !== 'undefined') {
        var embeddedin = data.query.embeddedin;
        self.embeddedInCache = [];

        for (var i = 0; i < embeddedin.length; i++) self.embeddedInCache.push({ val: embeddedin[i].title });
        self.embeddedInCache.push({ 'break': true });
        self.embeddedInCache.push({ val: self.infoboxTitle });
        if (self.infoboxTitle !== self.embedTitle) self.embeddedInCache.push({ val: self.embedTitle });

        promise.resolve();
      }
    }).fail(promise.reject);

    return promise;
  };

  /**
   * Creates the preview dialog.
   * @param {Object} e jQuery ClickEvent
   */
  InfoboxEditorPreview.prototype.createDialog = function (e) {
    var self = this;
    this.infoboXML = editarea.getContent().match(/<infobox([\s\S]*)\/infobox>/g)[0];
    var parseIcon = this.wds.icon('play', { class: 'wds-icon-small' }).outerHTML;
    var refreshIcon = this.wds.icon('refresh', { class: 'wds-icon-small' }).outerHTML;

    if (typeof e !== 'undefined') e.preventDefault();

    $.showCustomModal(this.i18n.msg('dialogtitle').escape(), '<div class="ip-container"><div id="ipEditor"></div><div class="ip-inner"></div></div>', {
      id: 'InfoboxPreviewDialog',
      width: self.getPreviewDialogWidth(),
      buttons: [{
        id: 'close',
        message: 'Close',
        handler: function () {
          $('#InfoboxPreviewDialog').closeModal();
        }
      }],
      callback: function () {
        var $dialog = $('#InfoboxPreviewDialog');
        self.$throbber = $dialog.find('.ip-container');
        self.$ipInner = $dialog.find('.ip-inner');

        // Rewriting throbber functions to disable dropdown while throbbing
        self.$throbber.startThrobbing = (function () {
          var cachedFunc = self.$throbber.startThrobbing;
          return function () {
            $('#embedPageDropdown, #algorithmDropdown').attr('disabled', true);
            $('form .wds-button-group').addClass('wds-disabled');
            return cachedFunc.apply(this, arguments);
          };
        })();

        self.$throbber.stopThrobbing = (function () {
          var cachedFunc = self.$throbber.stopThrobbing;
          return function () {
            $('#embedPageDropdown, #algorithmDropdown').attr('disabled', false);
            $('form .wds-button-group').removeClass('wds-disabled');
            return cachedFunc.apply(this, arguments);
          };
        })();

        self.$throbber.startThrobbing();

        // Rebuild cache if draftBypass has been toggled
        self.checkCache.call(self, e)
          .done(function () {
            // Resize dialog
            $dialog.find('.ip-container, #ipEditor').css({ height: $(window).height() - 280 });

            // Render examples/algorithms dropdown
            var rendered = mustache.render('<form><select id="embedPageDropdown">{{#options}}{{#break}}<option disabled>──────</option>{{/break}}{{^break}}<option value="{{val}}">{{val}}</option>{{/break}}{{/options}}</select><select id="algorithmDropdown">{{#algorithms}}<option value="{{key}}">{{title}}</option>{{/algorithms}}</select><div class="flex-fill"></div><div class="wds-button-group"></div></form>', {
              options: self.embeddedInCache,
              algorithms: self.getAlgorithms.call(self)
            });
            $(rendered).insertBefore($dialog.find('.ip-container'));
            $('#embedPageDropdown, #algorithmDropdown').on('change', self.startAutoconversion.bind(self));

            // Choose description tooltip
            $('<span/>')
              .text('?')
              .attr({
                class: 'tooltip-icon',
                rel: 'tooltip',
                title: self.i18n.msg('choosedescription').escape()
              })
              .tooltip({ placement: 'bottom' })
              .insertAfter('#embedPageDropdown');

            // Choose algorithm tooltip
            $('<span/>')
              .text('?')
              .attr({
                class: 'tooltip-icon',
                rel: 'tooltip',
                title: self.i18n.msg('choosealgorithm').escape()
              })
              .tooltip({ placement: 'bottom' })
              .insertAfter('#algorithmDropdown');

            // Adding refresh button
            $('<a/>')
              .attr({
                id: 'parsePreviewButton',
                class: 'wds-button',
                href: '#',
                title: self.i18n.msg('parsedisclaimer').plain()
              })
              .tooltip({ placement: 'bottom' })
              .html(parseIcon + '<span>' + self.i18n.msg('parse').escape() + '</span>')
              .on('click', self.parseInvocationToInfobox.bind(self))
              .appendTo('form .wds-button-group');

            // Adding refresh button
            $('<a/>')
              .attr({
                id: 'refreshPreviewButton',
                class: 'wds-button wds-is-secondary',
                href: '#'
              })
              .html(refreshIcon + '<span>' + self.i18n.msg('reload').escape() + '</span>')
              .on('click', self.startAutoconversion.bind(self))
              .appendTo('form .wds-button-group');

            // Initialise ace editor
            self.previewEditor = window.ace.edit('ipEditor');
            self.previewEditor.setTheme('ace/theme/' + (self.wg.wgIsDarkTheme ? 'solarized_dark' : 'solarized_light'));
            self.previewEditor.session.setMode('ace/mode/' + window.codePageType);

            // Starting first preview
            self.startAutoconversion.apply(self);
            // self.parsePageWikitextToInfobox.apply(self);
          })
          .fail(function (err) {
            self.setInfoboxError(self.i18n.msg('errorlinklist').escape(), err);
          });
      }
    });
  };

  /**
   * Returns a suitable width for the preview dialog according to window.innerWidth
   */
  InfoboxEditorPreview.prototype.getPreviewDialogWidth = function () {
    var pageWidth = $(window).width();
    if (pageWidth < 1024) return pageWidth - 120;
    if (pageWidth < 1184) return pageWidth - 190;
    return pageWidth - 350;
  };

  /**
   * Retrieves the selected algorithm to work with and starts the conversion.
   */
  InfoboxEditorPreview.prototype.startAutoconversion = function () {
    this.previewTitle = $('#embedPageDropdown').val();
    this.$throbber.startThrobbing();
    this[$('#algorithmDropdown').val() + 'Convert'].call(this);
  };

  /**
   * Retrieves the infobox parameters of a specified page via Nirvana and creates an infobox preview.
   */
  InfoboxEditorPreview.prototype.fastConvert = function () {
    var self = this;
    this.getArticleMetadata(this.previewTitle)
      .done(function (res) {
        var embedding = self.getTemplateEmbedFromMetadata.call(self, res);

        try {
          if (!embedding) {
            self.setInfoboxError(self.i18n.msg('errorinvocation').escape(), embedding);
            return;
          }

          var params = self.trimValues(embedding.parameters);
          self.previewEditor.setValue(self.parseInfoboxParametersToWikitext.call(self, params));
          self.createInfobox.call(self, params);
        } catch (err) {
          self.setInfoboxError(err.toString(), embedding);
        }
      })
      .fail(console.error);
  };

  /**
   * Combines Nirvana infobox parameter output and raw wikitext of the specified page to bring better results.
   */
  InfoboxEditorPreview.prototype.accurateConvert = function () {
    var self = this;
    var getArticleWikitext = $.get(this.wg.wgArticlePath.replace('$1', this.previewTitle), { action: 'raw' });

    $.when(this.getArticleMetadata.call(this, this.previewTitle), getArticleWikitext)
      .done(function (resNirvana, resMw) {
        var embedding = self.getTemplateEmbedFromMetadata.call(self, resNirvana[0]);
        var invocation = self.getTemplateEmbedFromWikitext.call(self, resMw[0]);

        try {
          if (!embedding || !invocation) {
            self.setInfoboxError(self.i18n.msg('errorinvocation').escape(), embedding, invocation);
            return;
          }

          var invocationParamPositions = [];
          var nirvanaParams = embedding.parameters;
          var combinedParams = {};

          // Gathering the positions of all infobox parameters with the help of nirvanaParams
          $.each(nirvanaParams, function (key) {
              var i = invocation.match(new RegExp('\\|\\s*' + self.escapeRegex(key.trim()) + '\\b\\s*=')).index;
              if (i > 0) invocationParamPositions.push(i);
          });

          for (var i = 0; i < invocationParamPositions.length; i++) {
              var paramPos = invocationParamPositions[i];
              var nextParamPos = invocationParamPositions[i + 1] || invocation.length;
              var paramString = invocation.slice(paramPos, nextParamPos);

              var splitPos = paramString.indexOf('=');
              var key = paramString.slice(1,splitPos).trim();
              var value = paramString.slice(splitPos + 1).trim();
              combinedParams[key] = value;
          }

          self.previewEditor.setValue(self.parseInfoboxParametersToWikitext.call(self, combinedParams));
          self.createInfobox.call(self, combinedParams);
        } catch (err) {
          self.setInfoboxError(err.toString(), embedding);
        }
      })
      .fail(console.error);
  };

  /**
   * Retrieves metadata of an article from Nirvana.
   * @param {String} pageTitle Title of the article.
   * @returns {$.Deferred} A jQuery deferred object.
   */
  InfoboxEditorPreview.prototype.getArticleMetadata = function (pageTitle) {
    var promise = $.Deferred();
    nirvana.getJson('TemplatesApi', 'getMetadata', { title: pageTitle }, promise.resolve, promise.reject);
    return promise;
  };

  /**
   * Trims the value of each object item.
   * @param {Object} obj An object with strings as values.
   * @returns {Object}
   */
  InfoboxEditorPreview.prototype.trimValues = function (obj) {
    $.each(obj, function (key, value) { obj[key] = value.trim(); });
    return obj;
  };

  /**
   * Escapes regex patterns in a string
   * @param {String} str An unescaped string
   * @returns {String} Escaped string that can be put into a regex
   */
  InfoboxEditorPreview.prototype.escapeRegex = function (str) {
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  }

  /**
   * Creates a wikitext invocation of the infobox
   * @param {Object} params An object with infobox parameters (key) and values.
   * @returns {String} Multiline wikitext string.
   */
  InfoboxEditorPreview.prototype.parseInfoboxParametersToWikitext = function (params) {
    var rows = [];
    rows.push('{{' + this.embedTitle);
    $.each(params, function (key, value) { rows.push('| ' + key + ' = ' + value); });
    rows.push('}}');

    return rows.join('\n');
  };

  /**
   * Processes Nirvana metadata object.
   * @param {Object} res Nirvana response object.
   * @returns {Object} Template object
   */
  InfoboxEditorPreview.prototype.getTemplateEmbedFromMetadata = function (res) {
    var templates = res.templates;
    var embedTitleNoNamespace = this.embedTitle.replace(/^[^:]+:/g, '');

    for (var i = 0; i < templates.length; i++) {
      if (templates[i].type === 'infobox' && templates[i].name === embedTitleNoNamespace) {
        return templates[i];
      }
    }

    return null;
  };

  /**
   * Processes the wikitext and returns the first embedding of the infobox that is being looked for.
   * @param {String} wikitext Raw wikitext.
   * @returns {String} Invocation wikitext.
   */
  InfoboxEditorPreview.prototype.getTemplateEmbedFromWikitext = function (wikitext) {
    var embedTitleNoNamespace = this.embedTitle.replace(/^[^:]+:/g, '');
    var invocationStartMatch = wikitext.match(new RegExp('{{{1}(\s*|.*:\s*)' + this.escapeRegex(embedTitleNoNamespace)));
    if (typeof invocationStartMatch !== 'object' || invocationStartMatch === null) return wikitext;

    // The last two characters are most probably the closing curly braces for the invocation, we don't need them.
    var invocationEnd = this.matchClosingBraces(wikitext, invocationStartMatch.index) - 1;
    return invocationEnd > -1 ? wikitext.slice(invocationStartMatch.index, invocationEnd) : wikitext;
  };

  /**
   * Looks for the matching closing curly braces to the opening one in a string.
   * @param {String} str The string to look into.
   * @param {Number} startPos The position of the opening curly brace.
   * @returns {Number} If > -1: Position of the matching closing curly brace.
   */
  InfoboxEditorPreview.prototype.matchClosingBraces = function (str, startPos) {
      if (str.charAt(startPos) !== '{') throw new Error('[InfoboxEditorPreview] Char at position ' + startPos + ' is not "{"!')
      var braceCount = 1;

      for (var pos = startPos + 1; pos < str.length; pos++) {
        if (str.charAt(pos) === '{') braceCount++;
        else if (str.charAt(pos) === '}') {
          braceCount--;
          if (braceCount <= 0) return pos;
        }
      }

      return -1;
  }

  /**
   * Parses the custom invocation in the ace editor and creates an infobox out of its parameters.
   */
  InfoboxEditorPreview.prototype.parseInvocationToInfobox = function () {
    var splitToNewline = this.previewEditor.getValue().trim().replace(/}{2}$/g, '').split('\n|').slice(1);
    var embedObj = {};

    this.$throbber.startThrobbing();

    try {
      for (var i = 0; i < splitToNewline.length; i++) {
        var line = splitToNewline[i];
        var separator = line.indexOf('=');
        if (separator > -1) {
          var key = line.slice(0, separator).trim();
          var value = line.slice(separator + 1).trim();
          embedObj[key] = value;
        }
      }
    } catch (e) {
      this.setInfoboxError(this.i18n.msg('errorinvocation').escape());
      return;
    }

    this.createInfobox.call(this, embedObj);
  };

  /**
   * Creates an infobox via api.php and passes the result to the preview dialog.
   * @param {Object} parameters An object with infobox parameters (key) and values.
   */
  InfoboxEditorPreview.prototype.createInfobox = function (parameters) {
    if (typeof parameters !== 'object') return;

    this.api.post({
      action: 'infobox',
      text: this.infoboXML,
      args: JSON.stringify(parameters),
      title: this.previewTitle,
      format: 'json'
    }).done(this.handleCreateInfoboxRes.bind(this)).error(this.handleCreateInfoboxRes.bind(this));
  };

  /**
   * Handles the result from this.createInfobox()
   * @param {Object} data Response data from api.php
   * @param {Number} code Response code from api.php
   * @param {String} msg Response message from api.php
   */
  InfoboxEditorPreview.prototype.handleCreateInfoboxRes = function (data, code, msg) {
    if (typeof data.error !== 'undefined') {
      this.setInfoboxError('Code: ' + data.error.code || msg);
      return;
    } else if (typeof data.infobox.text['*'] === 'undefined') {
      this.setInfoboxError(this.i18n.msg('errorresponse').escape());
      return;
    }

    this.$ipInner.html(data.infobox.text['*']);
    mw.hook('wikipage.content').fire(this.$ipInner);
    this.$throbber.stopThrobbing();
  };

  window.dev.infoboxEditorPreview = new InfoboxEditorPreview();
});
/* </nowiki> */