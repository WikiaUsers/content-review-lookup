/*
 * Name: InfoboxEditorPreview - UCP EDITION
 * Description: Adds a preview dialog for trying out your infobox markup with existing articles.
 *              Due to the redesigned editor experience in UCP, the script needed to be rewritten completely.
 *              As such, the legacy version will stay on a separate branch.
 * Author: Pogodaanton
 */

(function (window) {
  function InfoboxEditorPreview() {
    var self = this;
    this.api = new mw.Api();
    this.target = {};
    this.ui = {};
    this.embeddedInCache = [];

    this.userLanguage = mw.config.get("wgUserLanguage");
    this.infoboxName = mw.config.get("wgTitle");
    this.infoboxPath = mw.config.get("wgPageName");
    this.lastSearchTerm = "";

    // Only execute after VisualEditor finished setting up
    mw.hook("ve.activationComplete").add(function () {
      // @see https://lodash.com/docs/
      self.lodashPath = self.getFandomScriptName("lodash");

      mw.loader
        .using([
          "oojs-ui-core",
          "ext.CodeMirror.data",
          "ext.CodeMirror.lib",
          "ext.CodeMirror.mode.mediawiki",
          "mediawiki.jqueryMsg",
          "mediawiki.storage",
          self.lodashPath,
        ])
        .then(self.i18nPreloader.mwMessages)
        .then(self.i18nPreloader.promise)
        .then(self.initializeUIElements.bind(self))
        .then(self.addPreviewButton.bind(self));

      // This script is using i18n-js for custom messages
      // @see this.i18nPreloader
      mw.hook("dev.i18n").add(self.i18nPreloader.hook.bind(self));
      importArticle(
        {
          type: "script",
          article: "u:dev:MediaWiki:I18n-js/code.js",
        },
        {
          type: "style",
          article: "u:dev:MediaWiki:InfoboxEditorPreview/ucp.css",
        }
      );
    });
  }

  /**
   * Fandom appends a hash after some of their script modules.
   * The hash is always 8 characters long.
   * This function searches for the full name that is needed to require a module.
   *
   * @param {string} needle The name of the module in question
   * @returns {string|""} Full name of the requested module
   */
  InfoboxEditorPreview.prototype.getFandomScriptName = function (needle) {
    return mw.loader.getModuleNames().find(function (haystack) {
      // We remove "-[string(8)].js"
      return haystack.slice(0, -12) === needle;
    });
  };

  /**
   * Requests MediaWiki's own and custom i18n data for InfoboxEditorPreview
   * and populates this.i18n with the hook data emitted by i18n-js
   */
  InfoboxEditorPreview.prototype.i18nPreloader = {
    mwMessages: function () {
      // Might later consider using "nstab-template" for "Template" prefix
      return new mw.Api().loadMessagesIfMissing([
        "Visualeditor-dialog-media-info-moreinfo",
        "Previewerrortext",
        "portable-infobox-xml-parse-error-info",
      ]);
    },
    hook: function (i18n) {
      var self = this;
      i18n
        .loadMessages("InfoboxEditorPreview", { cacheVersion: 3 })
        .done(function (i18nObj) {
          self.i18n = i18nObj;
          self.i18nPreloader.promise.resolve();
        });
    },
    promise: $.Deferred(),
  };

  /**
   * Prepends a preview button to "saveAndPreviewGroup".
   * This function is currently not very useful, this might change in the future.
   * @event ve.activationComplete
   */
  InfoboxEditorPreview.prototype.addPreviewButton = function () {
    this.target = ve.init.target;

    // Modify preview dialog
    this.injectPreviewHandler.call(this);
  };

  /**
   * Creates a custom NumberLookup widget which is used in the
   * toolbar for searching and selecting wiki articles.
   */
  InfoboxEditorPreview.prototype.initializeLookupElement = function () {
    var self = this;

    /**
     * Custom lookup-element used to suggest and search for articles
     * which include the given infobox
     *
     * @extends OO.ui.TextInputWidget
     * @mixins OO.ui.mixin.LookupElement
     *
     * @constructor
     * @param {Object} config Custom configuration object equivalent to TextInputWidget & LookupElement configs.
     */
    self.ui.NumberLookupTextInputWidget = function IPNumberLookupTextInputWidget(config) {
      var that = this;

      // Parent constructor
      OO.ui.TextInputWidget.call(
        this,
        $.extend(
          {
            validate: "non-empty",
            indicator: "down",
            placeholder: self.i18n.msg("choosedescription").escape(),
          },
          config
        )
      );
      // Mixin constructors
      OO.ui.mixin.LookupElement.call(
        this,
        $.extend(
          {
            showSuggestionsOnFocus: false,
            allowSuggestionsWhenEmpty: true,
          },
          config
        )
      );

      this.lookupMenu.connect(this, {
        choose: "onLookupMenuSelect",
      });

      this.on("enter", function (e) {
        e.preventDefault();
        that.applySelection.call(that);
      });

      $(this.$overlay).addClass("ip-toolbar-select-overlay");
      $(this.$input).addClass("ip-toolbar-select-input");
    };

    OO.inheritClass(self.ui.NumberLookupTextInputWidget, OO.ui.TextInputWidget);
    OO.mixinClass(self.ui.NumberLookupTextInputWidget, OO.ui.mixin.LookupElement);

    self.ui.NumberLookupTextInputWidget.prototype.getLookupRequest = function () {
      var lookupValue = this.getValue();
      var deferred = $.Deferred();
      var _ = mw.loader.require(self.lodashPath).lodash;

      /**
       * Suggest items differing from the search term.
       *
       * This is used if the user is first focusing on the input
       * or
       */
      function showDefaultSuggestions() {
        var ei = self.embeddedInCache;
        self.lastSearchTerm = "";

        if (ei.length > 10) {
          // We only show the first 8 entries + custom (along with divider)
          deferred.resolve(_.concat(_.slice(ei, 0, 8), _.slice(ei, ei.length - 2)));
        } else {
          deferred.resolve(ei);
        }
      }

      if (lookupValue === self.lastSearchTerm) showDefaultSuggestions();
      else {
        this.getValidity().then(function () {
          lookupValue = _.chain(lookupValue).deburr().lowerCase().value();

          /**
           * Look for search term in embed cache list
           */
          var suggestions = $.grep(self.embeddedInCache, function (obj) {
            if (typeof obj !== "object" || typeof obj.searchable !== "string") {
              return false;
            }
            return obj.searchable.indexOf(lookupValue) > -1;
          });

          deferred.resolve(suggestions);
        }, showDefaultSuggestions);
      }

      return deferred.promise({ abort: function () {} });
    };

    self.ui.NumberLookupTextInputWidget.prototype.getLookupCacheDataFromResponse = function (
      response
    ) {
      return response || [];
    };

    self.ui.NumberLookupTextInputWidget.prototype.getLookupMenuOptionsFromData = function (
      data
    ) {
      var suggestions = [];
      data.forEach(function (obj) {
        if (obj.break) {
          suggestions.push(
            new OO.ui.MenuOptionWidget({
              data: "break",
              label: "\u00a0",
              disabled: true,
              classes: ["ip-lookup-divider"],
            })
          );
        } else {
          var customOptionString = self.i18n.msg("custominvocation").plain();
          suggestions.push(
            new OO.ui.MenuOptionWidget({
              data: obj.title,
              label: obj.title === self.infoboxPath ? customOptionString : obj.title,
            })
          );
        }
      });

      if (this.disabled) return [];
      return suggestions;
    };

    self.ui.NumberLookupTextInputWidget.prototype.onLookupMenuSelect = function () {
      this.applySelection.call(this);
    };

    self.ui.NumberLookupTextInputWidget.prototype.setFirstValue = function () {
      for (var i = 0; i < self.embeddedInCache.length; i++) {
        const obj = self.embeddedInCache[i];
        if (!obj.break) {
          this.setValue(obj.title);
          this.applySelection.call(this);
          return;
        }
      }
    };

    self.ui.NumberLookupTextInputWidget.prototype.applySelection = function () {
      this.getValidity.call(this).then(self.applySelection.bind(self));
    };
  };

  /**
   * Creates a select group composed of two buttons for choosing between
   * algorithms which determine the transclusion parameters on an article.
   */
  InfoboxEditorPreview.prototype.initializeAlgorithmSelectButtons = function () {
    var self = this;
    var lastUsedAlg =
      mw.storage.get("InfoboxEditorPreview-LastUsedAlgorithm") || "parsoid";

    this.ui.algSelect = new OO.ui.ButtonSelectWidget({
      items: [
        new OO.ui.ButtonOptionWidget({
          data: "parsoid",
          icon: "checkAll",
          label: this.i18n.msg("algaccurate").plain(),
          title: this.i18n.msg("algaccurate").plain(),
          selected: lastUsedAlg === "parsoid",
        }),
        new OO.ui.ButtonOptionWidget({
          data: "wikitext",
          icon: "labFlask",
          label: this.i18n.msg("algfast").plain(),
          title: this.i18n.msg("algfast").plain(),
          selected: lastUsedAlg === "wikitext",
        }),
      ],
    });

    this.ui.algSelect.on("select", function (selectedItem) {
      mw.storage.set("InfoboxEditorPreview-LastUsedAlgorithm", selectedItem.data);
      self.applySelection.call(self);
    });

    this.ui.algSelect.getSelectedValue = function () {
      var selectedItem = self.ui.algSelect.findSelectedItem();
      if (selectedItem !== null) return selectedItem.data;
    };
  };

  /**
   * Returns a OOUI widget that serves for informing the user about something
   * when the cursor hovers over it.
   *
   * @param {string} tooltipContent The innerHTML of the tooltip
   */
  InfoboxEditorPreview.prototype.createInfoPopup = function (tooltipContent) {
    return new OO.ui.ButtonWidget({
      icon: "info",
      label: mw.message("Visualeditor-dialog-media-info-moreinfo").text(),
      invisibleLabel: true,
      disabled: true,
      framed: false,
      classes: ["wds-dropdown", "ip-popup-icon"],
      content: [
        new OO.ui.HtmlSnippet(
          '<div class="wds-dropdown__content">' + tooltipContent + "</div>"
        ),
      ],
    });
  };

  /**
   * Creates UI elements for the toolbar
   */
  InfoboxEditorPreview.prototype.initializeUIElements = function () {
    /**
     * Preview container
     */
    this.ui.$ipEditor = $("<div>").addClass("ip-editor");
    this.ui.$ipInner = $("<div>")
      .addClass("ip-inner mw-content-" + mw.config.get("wgVisualEditor").pageLanguageDir)
      .append($("<h1>").addClass("firstHeading").text("You shouldn't see this..."));

    // Progress bar
    this.ui.progressBar = new OO.ui.ProgressBarWidget({
      progress: false,
    });

    // Progress bar backdrop
    this.ui.$progressOverlay = $("<div>")
      .addClass("ip-progress-overlay")
      .append(this.ui.progressBar.$element);

    // Parent container
    this.ui.$ipContainer = $("<div>")
      .height($(window).height() - 280)
      .addClass("ip-container")
      .append(this.ui.$ipEditor)
      .append(this.ui.$ipInner)
      .append(this.ui.$progressOverlay);

    /**
     * Toolbar
     */

    // Lookup field
    this.initializeLookupElement.call(this);

    // Tooltip button for lookup field
    this.ui.lookupInputPopup = this.createInfoPopup(
      this.i18n.msg("choosedescription").escape()
    );

    // Selection row for used algorithm
    this.initializeAlgorithmSelectButtons.call(this);

    // Tooltip widget for selection row
    this.ui.algSelectPopup = this.createInfoPopup(
      this.i18n.msg("choosealgorithm").escape()
    );

    // Parse button with tooltip
    this.ui.parseButton = new OO.ui.ButtonWidget({
      icon: "play",
      label: this.i18n.msg("parse").plain(),
      flags: ["primary", "progressive"],
      classes: ["wds-dropdown", "ip-parse-button"],
      content: [
        new OO.ui.HtmlSnippet(
          '<div class="wds-dropdown__content">' +
            this.i18n.msg("parsedisclaimer").escape() +
            "</div>"
        ),
      ],
    });

    // Reload button
    this.ui.reloadButton = new OO.ui.ButtonWidget({
      icon: "reload",
      label: this.i18n.msg("reload").plain(),
      classes: ["ip-reload-button"],
      framed: false,
    });

    // Button listeners
    this.ui.parseButton.on("click", this.invocationConvert.bind(this));
    this.ui.reloadButton.on("click", this.applySelection.bind(this));

    this.ui.actionGroup = new OO.ui.ButtonGroupWidget().addItems([
      this.ui.reloadButton,
      this.ui.parseButton,
    ]);

    this.ui.$divider = $("<span>").addClass("ip-toolbar-filler").text("\u00a0");

    /**
     * Editor setup; mostly copy-pasted from Fandom's implementation.
     */
    this.ui.mirror = window.CodeMirror(this.ui.$ipEditor[0], {
      mwConfig: mw.config.get("extCodeMirrorConfig"),
      gutters: ["CodeMirror-lint-markers"],
      lineWrapping: true,
      lineNumbers: true,
      specialChars: /^$/,
      viewportMargin: 5,
      gutters: ["CodeMirror-lint-markers"],
      mode: "text/mediawiki",
      tabSize: 2,
      indentWithTabs: false,
      showCursorWhenSelecting: true,
    });
  };

  /**
   * Replaces the preview handler of the save command
   * with a custom one which injects the script's DOM structure
   *
   * NOTE: Fandom might remove the preview button in the infobox editor
   * like they did in the first versions of UCP.
   */
  InfoboxEditorPreview.prototype.injectPreviewHandler = function () {
    var self = this;

    this.target.onSaveDialogPreview = function () {
      // @this = this.target
      var deferred = self.cacheEmbeddedInList();
      self.dialog = this.saveDialog;
      self.dialog.pushPending();

      // Suddenly, NumberLookupWidget started to hate being rerendered.
      // That's why we create a new input each time.
      self.ui.numberLookupInput = new self.ui.NumberLookupTextInputWidget();
      self.ui.$toolbar = $("<form>")
        .addClass("ip-toolbar")
        .append(self.ui.numberLookupInput.$element)
        .append(self.ui.lookupInputPopup.$element)
        .append(self.ui.algSelect.$element)
        .append(self.ui.algSelectPopup.$element)
        .append(self.ui.$divider.clone())
        .append(self.ui.actionGroup.$element);

      self.dialog.$previewViewer
        .empty()
        .append(self.ui.$toolbar)
        .append(self.ui.$ipContainer);

      self.ui.$progressOverlay.show();
      self.setToolbarDisabled.call(self, true);
      self.dialog.swapPanel("preview");
      self.cacheInfoboXML.call(self);

      deferred.done(function () {
        self.ui.numberLookupInput.setFirstValue();
        self.dialog.popPending();
      });
    };
  };

  /**
   * Caches a list of articles transcluding the currently previewed infobox
   */
  InfoboxEditorPreview.prototype.cacheEmbeddedInList = function () {
    var self = this;
    var promise = $.Deferred();

    /*
      Code for removing "/draft" to achieve better results
      UCP currently doesn't have draft "support" implemented.

      if (!this.isDraftBypassEnabled && this.isInfoboxDraft) {
        this.embedTitle = this.embedTitle.replace("/" + this.mwmsg.draft, "");
      } else {
        this.embedTitle = this.infoboxPath;
      }
    */

    // Requesting linklist and pushing page names to an array
    // NOTE: only the first 500 articles are cached, this might change later on
    this.api
      .get({
        action: "query",
        list: "embeddedin",
        eititle: this.infoboxPath,
        einamespace: "0|2|12|4",
        eilimit: 500,
        format: "json",
      })
      .done(function (data) {
        if (typeof data.query.embeddedin !== "undefined") {
          var embeddedin = data.query.embeddedin;
          var _chain = mw.loader.require(self.lodashPath).lodash.chain;
          self.embeddedInCache = [];

          function pushItem(title) {
            self.embeddedInCache.push({
              title: title,
              searchable: _chain(title).deburr().lowerCase().value(),
            });
          }

          for (var i = 0; i < embeddedin.length; i++) pushItem(embeddedin[i].title);
          self.embeddedInCache.push({ break: true });
          pushItem(self.infoboxPath);

          promise.resolve();
        }
      })
      .fail(promise.reject);

    return promise;
  };

  /**
   * Hipeddy-hopeddy, your markup is now my property.
   */
  InfoboxEditorPreview.prototype.cacheInfoboXML = function () {
    this.infoboXML = this.target
      .getSurface()
      .mirror.getValue()
      .match(/<infobox([\s\S]*)\/infobox>/g)[0];
  };

  /**
   * Retrieves the current value in the preview toolbar's lookup input
   * and attempts to generate parameter data and an example infobox
   */
  InfoboxEditorPreview.prototype.applySelection = function () {
    var self = this;
    var pageName = this.ui.numberLookupInput.getValue();
    var selectedAlgorithm = this.ui.algSelect.getSelectedValue();

    this.lastSearchTerm = pageName;
    this.setProgressbarVisibility.call(self, true);

    /**
     * Executed if a conversion method has returned
     * an object containing the parameters for the infobox
     */
    function parameterCallback(params) {
      // Insert new wikitext into CodeMirror
      self.ui.mirror.setValue(self.parseParametersToWikitext.call(self, params));
      self.ui.mirror.refresh();

      // Generate infobox via api.php
      self.createInfobox
        .call(self, params)
        .fail(function (err) {
          // An error occurred while generating the infobox:
          self.handleError.call(self, err, self.i18n.msg("errorpi").plain());
        })
        .done(function () {
          // Show results to user
          // This is intentionally called twice, else weird artifacts stay behind. HELP NEEDED
          self.setProgressbarVisibility.call(self, false);
          self.setProgressbarVisibility.call(self, false);
        });
    }

    // Retrieve parameters from current infobox markup
    if (pageName === this.infoboxPath) {
      this.markupConvert
        .call(this)
        .fail(function (err) {
          // Infobox markup parsing failed:
          self.handleError.call(self, err, self.i18n.msg("errormarkup").plain());
        })
        .done(parameterCallback);
      return;
    }

    // Convert wikitext via parsoid
    //this.parsoidConvert
    this[selectedAlgorithm + "Convert"]
      .call(this, pageName)
      .fail(function (err) {
        // Article data processing failed:
        self.handleError.call(self, err, self.i18n.msg("errorarticledata").plain());
      })
      .done(parameterCallback);
  };

  /**
   * Parses an existing article via api.php and uses the included properties object
   * to return the transclusion parameters of the infobox in question.
   *
   * This method is considerably faster than the alternative with parsoid (below).
   * However, since the properties object contains the whole structure of the depicted infobox,
   * it also has default values already assigned to parameters which were not mentioned in the wikitext.
   *
   * @param {string} pageName Name of the article to be examined
   * @returns {$.Deferred}
   */
  InfoboxEditorPreview.prototype.wikitextConvert = function (pageName) {
    var self = this;
    var promise = $.Deferred();

    if (typeof pageName !== "string")
      return promise.reject('Parameter pageName needs to be typeof "string"');

    this.api
      .get({
        format: "json",
        action: "parse",
        page: pageName,
        prop: "properties|templates",
      })
      .done(function (data) {
        var parameters = {};

        // "The currently selected infobox couldn't be found on the requested page!"
        function throwMissingInvocation() {
          console.log("[InfoboxEditorPreview] WikitextConvert parse data: ", data);
          promise.reject(self.i18n.msg("errorarticlemissinginfobox").plain());
        }

        // I don't know all outcomes of action=parse, thus I try to play safe here
        if (
          typeof data.parse !== "object" ||
          !Array.isArray(data.parse.templates) ||
          !Array.isArray(data.parse.properties) ||
          data.parse.templates.length <= 0 ||
          data.parse.properties.length <= 0
        ) {
          throwMissingInvocation();
          return;
        }

        data = data.parse;

        // Make sure the Infobox in question is actually transcluded on the specified page
        var templatesObj = data.templates.find(function (obj) {
          return obj["*"] === self.infoboxPath;
        });

        if (typeof templatesObj === "undefined") {
          throwMissingInvocation();
          return;
        }

        // Seperate infoboxes from other templates
        var infoboxProperties = data.properties.find(function (obj) {
          return obj["name"] === "infoboxes";
        });

        if (
          typeof infoboxProperties !== "object" ||
          typeof infoboxProperties["*"] !== "string"
        ) {
          throwMissingInvocation();
          return;
        }

        /**
         * Reads a parse data object from the infobox properties object and extracts all
         * parameters.
         *
         * @param {{type: string, data: any}[]} parseData An array with parse data objects
         */
        function addParameterFromDataObj(parseData) {
          parseData.forEach(function (obj) {
            if (typeof obj.type !== "string" || typeof obj.data === "undefined") return;

            // Group value objects are similar to the root parseData one
            if (obj.type === "group") {
              addParameterFromDataObj(obj.data.value);
              return;
            }

            // Make sure parameter name and value exists
            if (
              typeof obj.data.source === "string" &&
              typeof obj.data.value === "string"
            ) {
              parameters[obj.data.source] = obj.data.value;
            }
          });
        }

        // The property objects are in a stringified JSON format
        var infoboxes = JSON.parse(infoboxProperties["*"]);
        if (!Array.isArray(infoboxes) || infoboxes.length <= 0) {
          throwMissingInvocation();
          return;
        }

        // We have no way to determine which item corresponds to which infobox.
        // The majority of articles should not need more than one infobox,
        // So we throw each parameter from every embedded infobox on one pile and hope that it works out.
        infoboxes.forEach(function (infobox) {
          try {
            if (Array.isArray(infobox["data"]) && infobox["data"].length > 0) {
              addParameterFromDataObj(infobox["data"]);
            }
          } catch (error) {
            promise.reject(self.i18n.msg("errorinvocation").plain());
          }
        });

        promise.resolve(parameters);
      })
      .fail(promise.reject);

    return promise.promise();
  };

  /**
   * Retrieves parsoid data of a specific page and searches for the currently
   * previewed infobox. The transclusion parameters are then returned.
   *
   * Using visual editor's data allows us to use an out-of-the-box Wikitext parser
   * which - in theory - should work fairly accurately.
   *
   * It's main drawback is the output speed, which is poor comparing to other past solutions.
   *
   * @param {string} pageName Name of the article to be examined
   * @returns {$.Deferred}
   */
  InfoboxEditorPreview.prototype.parsoidConvert = function (pageName) {
    var self = this;
    var promise = $.Deferred();

    if (typeof pageName !== "string") return promise.reject();

    this.api
      .get({
        format: "json",
        action: "visualeditor",
        paction: "parse",
        uselang: this.userLanguage,
        page: pageName,
      })
      .done(function (data) {
        data = data.visualeditor;
        var $parsoidRes = $.parseHTML(data.content);
        var $infoboxes = $($parsoidRes).find("[typeof*='mw:Extension/infobox']");

        if ($infoboxes.length <= 0) {
          // The currently selected infobox couldn't be found on the requested page!
          promise.reject(self.i18n.msg("errorarticlemissinginfobox").plain());
        }

        var parameters = null;
        $infoboxes.each(function (i, $pi) {
          var mwData = JSON.parse($($pi).attr("data-mw"));

          // If the infobox cannot be rendered, parsoid will separate the transclusion object from
          // the embedding parameters
          if (typeof mwData.parts === "undefined") {
            var transclusionID = $($pi).attr("about");
            var $transclusions = $(
              $($parsoidRes).find(
                "[about='" + transclusionID + "'][typeof='mw:Transclusion']"
              )
            );

            if ($transclusions.length <= 0) return true;
            mwData = JSON.parse($($transclusions[0]).attr("data-mw"));
          }

          // If the infobox is fully rendered, it will only output the embedding parameters
          // We do an additional check shall the set of tasks beforehand not work
          if (typeof mwData.parts !== "undefined") {
            var infoboxPath = mwData.parts[0].template.target.href;

            if (infoboxPath.replace("./", "") === self.infoboxPath) {
              // Returning with parameters set
              parameters = mwData.parts[0].template.params;
              $.each(parameters, function (key, value) {
                parameters[key] = value.wt;
              });
              return true;
            }
          }
        });

        if (parameters === null) {
          promise.reject(self.i18n.msg("errorinvocation").plain());
        }

        promise.resolve(parameters);
      })
      .fail(promise.reject);

    return promise;
  };

  /**
   * Parses the custom invocation in the CodeMirror instance next to the preview
   * and creates an infobox out of its parameters.
   *
   * This rudimentary parser only works if each parameter is on a separate line.
   */
  InfoboxEditorPreview.prototype.invocationConvert = function () {
    var self = this;
    var editorInput = this.ui.mirror.getValue();
    var parameters = {};
    this.setToolbarDisabled(true);

    try {
      var splitToNewline = editorInput.trim().replace(/}{2}$/g, "").split("\n|").slice(1);

      for (var i = 0; i < splitToNewline.length; i++) {
        var line = splitToNewline[i];
        var separator = line.indexOf("=");
        if (separator > -1) {
          var key = line.slice(0, separator).trim();
          var value = line.slice(separator + 1).trim();
          parameters[key] = value;
        }
      }
    } catch (e) {
      // Invocation could not be parsed!
      this.handleError.call(this, err, self.i18n.msg("errorinvocation").plain());
      return;
    }

    this.createInfobox
      .call(this, parameters)
      .fail(function (err) {
        self.handleError.call(self, err, self.i18n.msg("errorpi").plain());
      })
      .done(function () {
        self.setToolbarDisabled(false);
      });
  };

  /**
   * Parses the current infoboXML and retrieves all potential parameters
   * the user could make use of.
   * @returns {$.Deferred}
   */
  InfoboxEditorPreview.prototype.markupConvert = function () {
    var promise = $.Deferred();
    var parameters = {};

    try {
      $.each(this.infoboXML.match(/source="(.*?)"/g), function (index, attribute) {
        var param = attribute.slice(8, attribute.length - 1);
        parameters[param] = "";
      });
    } catch (err) {
      return promise.reject(err);
    }

    return promise.resolve(parameters);
  };

  /**
   * Creates an infobox invocation example out of the provided parameters.
   * @param {Object} parameters An object with infobox parameters (key) and values.
   * @returns {string} Invocation WikiText
   */
  InfoboxEditorPreview.prototype.parseParametersToWikitext = function (parameters) {
    var rows = [];

    rows.push("{{" + this.infoboxName);
    $.each(parameters, function (key, value) {
      rows.push("| " + key + " = " + value);
    });
    rows.push("}}");

    return rows.join("\n");
  };

  /**
   * Creates an infobox via api.php and passes the result to the preview dialog.
   * @param {Object} parameters An object with infobox parameters (key) and values.
   * @returns {$.Deferred}
   */
  InfoboxEditorPreview.prototype.createInfobox = function (parameters) {
    var promise = $.Deferred();
    var self = this;
    if (typeof parameters !== "object") return;

    function handleInfoboxRes(data) {
      if (typeof data.infobox.text["*"] === "undefined") {
        promise.reject(mw.message("portable-infobox-xml-parse-error-info").text());
        return;
      }

      self.ui.$ipInner.html(data.infobox.text["*"]);
      mw.hook("wikipage.content").fire(self.ui.$ipInner);
      promise.resolve();
    }

    this.api
      .post({
        action: "infobox",
        text: this.infoboXML,
        args: JSON.stringify(parameters),
        title: this.previewTitle,
        format: "json",
      })
      .done(handleInfoboxRes.bind(this))
      .fail(function (code, xhr) {
        console.error("[InfoboxEditorPreview] " + code, xhr);
        if (code === "http") promise.reject(xhr.exception);
        else promise.reject(code);
      });

    return promise;
  };

  /**
   * Presents errors to the user and reports them to the console
   * @param {Error|string} err Error object or error message
   * @param {string} title Optional introduction used to specify the procedure that caused the error.
   */
  InfoboxEditorPreview.prototype.handleError = function (err, title) {
    title = title || mw.message("Previewerrortext").text().slice(0, -1) + ": ";

    console.error("[InfoboxEditorPreview] " + title, err);

    this.ui.$ipInner.html('<p class="pi-error-info">' + title + "</br>" + err + "</p>");

    this.setProgressbarVisibility.call(this, false);
    this.setProgressbarVisibility.call(this, false);
  };

  /**
   * Disables/Enables every interactive element in the toolbar
   * @param {boolean} state The disabled state to apply
   */
  InfoboxEditorPreview.prototype.setToolbarDisabled = function (state) {
    this.dialog.$previewViewer.css({ pointerEvents: state ? "none" : "auto" });
    this.ui.parseButton.setDisabled(state);
    this.ui.reloadButton.setDisabled(state);
    this.ui.numberLookupInput.setDisabled(state);
    this.ui.algSelect.setDisabled(state);

    // Pending state
    this.ui.numberLookupInput[(state ? "push" : "pop") + "Pending"]();
  };

  /**
   * Shows/Hides the dialog progress bar and changes the toolbar state appropriately.
   * @param {boolean} state The visibility state to apply
   */
  InfoboxEditorPreview.prototype.setProgressbarVisibility = function (state) {
    if (state) {
      this.setToolbarDisabled.call(this, true);
      this.ui.$progressOverlay.fadeIn(200);
    } else {
      this.setToolbarDisabled.call(this, false);
      this.ui.$progressOverlay.fadeOut(200);
    }
  };

  window.dev.infoboxEditorPreview = new InfoboxEditorPreview();
})(window);