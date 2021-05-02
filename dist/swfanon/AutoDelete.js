// <pre><nowiki>
/**
 * @file <code>MediaWiki:AutoDelete.js</code> is a sysop-exclusive JavaScript
 * script used to easily delete policy-violating articles that are marked for
 * deletion via the <code>Comply</code> template. That script grabs the pending
 * pages from the relevant category & checks if the supplied deletion date
 * matches the current date, & deletes the page if so. All reports of
 * functionality loss or bugs should be directed to current maintainer
 * User:Sebolto.
 *
 * @author Sebolto <swf.wikia.com/sebolto>
 * @license CC-BY-SA 3.0
 *
 * @external "window"
 * @external "window.mediaWiki"
 * @external "window.jQuery"
 * @external "mediawiki.user"
 * @external "mediawiki.util"
 * @external "oojs-ui-core"
 * @external "oojs-ui-windows"
 */

/* jshint -W030, undef: true, unused: false, eqnull: true, laxbreak: true,
   bitwise: false */

;(function (window, mw, $) {
  "use strict";

  if (
    !window || !mw || !$ || window["4175746f44656c657465"] ||
    !(new window.RegExp("sysop").test(mw.config.get("wgUserGroups").join(" ")))
  ) {
    return;
  }
  window["4175746f44656c657465"] = true;

  // Only run once ResourceLoader modules are loaded & document ready
  $.when($.ready, mw.loader.using([
    "mediawiki.user",
    "mediawiki.util",
    "oojs-ui-core",
    "oojs-ui-windows"
  ])).done(function ($init, require) {
    var Dialog, manager, dialog, $body, $target, $tool;

    /**
     * @description The <code>Dialog</code> constructor is used to instantiate
     * new class objects. The subclass extends the <code>ProcessDialog</code>
     * class, one of the default modal dialog options present in OOUI/OOJS. The
     * author originally considered using the more aesthetically pleasing
     * <code>MessageDialog</code>, but eventually decided against the idea after
     * facing difficulty configuring the modal title component.
     *
     * @class
     * @param {object} config - Configuration object (optional)
     * @returns {undefined}
     */
    Dialog = function (config) {
      Dialog.super.call(this, config);
      this.data = this.data || {};
    };

    // Set static properties (required & messy; someone should feel bad)
    window.OO.inheritClass(Dialog, window.OO.ui.ProcessDialog);
    Dialog.static.name = "auto-delete";
    Dialog.static.title = "AutoDelete";
    Dialog.static.size = "medium";
    Dialog.static.actions = [
      {
        flags: "primary",
        label: "Continue",
        action: "continue"
      },
      {
        flags: "safe",
        label: "Close",
        action: "close"
       }
    ];

    /**
     * @description This function is responsible for defining the various OOUI
     * components that make up the UI. The UI takes the form of a dropdown menu
     * & two input textareas with associated labels. The second input textfield
     * is used as a jury-rigged status log to which the script adds status
     * updates as operations are undertaken.
     *
     * @returns {undefined}
     */
    Dialog.prototype.initialize = function () {
      Dialog.super.prototype.initialize.call(this);

      this.panel = new window.OO.ui.PanelLayout({
        padded: true,
        expanded: false,
      });

      this.log = new window.OO.ui.MultilineTextInputWidget({
        id: Dialog.static.name + "-log",
        disabled: true
      });

      this.logLabel = new window.OO.ui.FieldLayout(this.log, {
        label: "Status log",
        align: "top"
      });

      this.content = new window.OO.ui.FieldsetLayout();
      this.content.addItems([this.logLabel]);
      this.panel.$element.append(this.content.$element);
      this.$body.append(this.panel.$element);
    };

    /**
     * @description The default <code>getActionProcess</code> method is used to
     * specify a process to handle UI button actions. Making use of a
     * <code>switch</code> statement, this function invokes new
     * <code>Process</code>es for the two accepted actions & invokes the default
     * parent handler as a fallback.
     *
     * @param {string} action - Name of action associated w/ the pressed button
     * @returns {object} - Returns a new <code>Process</code> object
     */
    Dialog.prototype.getActionProcess = function (action) {
      switch (action) {
        case "continue":
          return new window.OO.ui.Process(this.continue, this);
        case "close":
          return new window.OO.ui.Process(this.close, this);
        default:
          return Dialog.super.prototype.getActionProcess.call(this, action);
      }
    };

    /**
     * @description The <code>getBodyHeight</code> method is used simply to
     * define the dialog height. This only works as expected if the key/value
     * pair <code>expanded: false</code> is set for the dialog's main
     * <code>PanelLayout</code> component.
     *
     * @returns {number} - The height of the main <code>PanelLayout</code>
     */
    Dialog.prototype.getBodyHeight = function () {
      return this.panel.$element.outerHeight(true);
    };

    /**
     * @description The first of the custom subclass-specific methods, this
     * function is used simply to add new messages to the jury-rigged disabled
     * input textfield that serves as the de facto status log. It adds the
     * latest message to the top of the input for convenience.
     *
     * @param {string} entry - The message to be added to the log
     * @returns {undefined}
     */
    Dialog.prototype.addLogEntry = function (entry) {
      this.log.setValue(entry + (this.log.getValue().length
        ? "\n" + this.log.getValue()
        : "")
      );
    };

    /**
     * @description This helper function is used to standardize the display of
     * year, month, and day information as derived from <code>Date</code>
     * <code>object</code>s. The date is formatted as a <code>string</code>
     * following the format "yyyy/mm/dd" for easier comparisons.
     *
     * @param {object} date - A <code>Date</code> <code>object</code> to format
     * @returns {string} - String date following format "yyyy/m/d"
     */
    Dialog.prototype.formatDate = function (date) {
      if (Object.prototype.toString.call(date) !== "[object Date]") {
        date = new Date(date);
      }

      return date.getUTCFullYear() + "/" + (date.getUTCMonth() + 1) + "/" +
        date.getUTCDate();
    };

    /**
     * @description This method is used to assemble <code>string</code> HTML
     * using <code>mw.html</code> that will be appended to the toolbar as an
     * interactive button. It consists of a link included inside of an outer
     * list element with the <code>overflow</code> class.
     *
     * @param {string} displayText - Button text to be displayed
     * @param {string} toolName - CSS selector fragment
     * @returns {string}
     */
    Dialog.prototype.buildButton = function (displayText, toolName) {
      return mw.html.element("li", {
        "class": "overflow",
        "id": toolName + "-li"
      }, new mw.html.Raw(
        mw.html.element("a", {
          "id": toolName + "-a",
          "href": "#",
          "title": displayText
        }, displayText)
      ));
    };

    /**
     * @description As the name implies, <code>wait</code> is a somewhat wonky
     * means of forcing a pause to ongoing operations to ensure that the rate
     * limit does not come into play & interrupt ongoing comment closing
     * operations. It consists of a <code>setTimeout</code> invocation within a
     * <code>$.Deferred</code> promise, the latter of which resolves once the
     * interval is complete.
     *
     * @param {number} interval - The requisite wait period
     * @returns {object} - <code>$.Deferred</code> instance
     */
    Dialog.prototype.wait = function (interval) {
      return new $.Deferred(function ($deferred) {
        window.setTimeout($deferred.resolve.bind($), interval);
        return $deferred.promise();
      }).promise();
    };

    /**
     * @description This function is used simply to delete a page by means of
     * <code>action=delete</code>. It <code>POST</code>s to the server and
     * returns the <code>$.Deferred</code> instance.
     *
     * @param {string} page - Name of the page to be deleted
     * @param {string} reason - Deletion summary
     * @returns {object} - <code>$.Deferred</code> instance
     */
    Dialog.prototype.deletePage = function (page, reason) {
      return $.ajax({
        type: "POST",
        url: mw.util.wikiScript("api"),
        data: {
          token: mw.user.tokens.get("editToken"),
          action: "delete",
          title: page,
          reason: reason,
          format: "json"
        }
      });
    };

    /**
     * @description This function is used to return the wikitext content of the
     * page specified via the <code>page</code> parameter. Originally, this
     * method employed the <code>API:Revisions</code> endpoint, though this was
     * replaced with <code>action=parse</code> for increased ease of useability.
     * An empty <code>string</code> is returned if no wikitext is retrieved.
     *
     * @param {string} page - Name of the page whose wikitext is desired
     * @returns {object} - <code>$.Deferred</code> instance
     */
    Dialog.prototype.getPageContent = function (page) {
      return $.ajax({
        type: "GET",
        url: mw.util.wikiScript("api"),
        data: {
          action: "parse",
          prop: "wikitext",
          page: page,
          format: "json"
        }
      }).then(
        function (data) {
          return data.parse.wikitext["*"];
        },
        function () {
          return "";
        }
      );
    };

    /**
     * @description Rather than rely on hardcoded calculated rate limit values,
     * this function acquires rate limit data from the API & performs the
     * calculation itself depending on the user's permissions & associated rate
     * limit values. The calculated value is returned via a
     * <code>$.Deferred</code> promise.
     *
     * @returns {object} - <code>$.Deferred</code> instance
     */
    Dialog.prototype.getRateLimitInterval = function () {
      var info, limits, interval, defaultInterval;

      defaultInterval = 1500;
      return $.ajax({
        type: "GET",
        url: mw.util.wikiScript("api"),
        data: {
          action: "query",
          meta: "userinfo",
          uiprop: "ratelimits",
          format: "json"
        }
      }).then(
        function (data) {
          info = data.query.userinfo;
          if (info.name !== mw.config.get("wgUserName")) {
            return defaultInterval;
          }

          limits = info.ratelimits.edit.user;
          interval = (limits.seconds / limits.hits) * 1000;

          // Define as class instance property of data
          (this.data = this.data || {}).interval = interval;
          return interval;
        }.bind(this),

        function () {
          return defaultInterval;
        }
      );
    };

    /**
     * @description This method is used to return a listing of article pages
     * existing as members of the categories specified in the parameter
     * <code>categories</code>. This parameter may be either an array of
     * category <code>string</code>s or a single <code>string</code> for single
     * category member lookups. The optional parameter, <code>interval</code>,
     * is the interval the function waits using <code>setTimeout</code> between
     * continuation operations so as to avoid rate limiting.
     *
     * @param {Array<string>|string} categories
     * @param {number} interval - Rate limit interval (optional)
     * @returns {object} - <code>$.Deferred</code> instance
     */
    Dialog.prototype.getCategoryMembers = function (categories, interval) {
      var prefix, $getMembers, counter, defaultInterval, getMembers;

      // Can input a single category as a string
      if (typeof categories === "string" || categories instanceof String) {
        categories = [categories];
      }

      // If the input is neither a string or an array object, return
      if (typeof categories !== "object" || categories.constructor !== Array) {
        return [];
      }

      // Definitions
      prefix = mw.config.get("wgFormattedNamespaces")[14] + ":";
      $getMembers = new $.Deferred();
      counter = 0;
      defaultInterval = 1500;
      getMembers = function self (interval, config, members) {
        members = members || [];

        return $.ajax({
          type: "GET",
          url: mw.util.wikiScript("api"),
          data: $.extend({
            action: "query",
            list: "categorymembers",
            cmnamespace: "*",
            cmprop: "title",
            cmdir: "desc",
            cmlimit: "max",
            rawcontinue: true,
            format: "json",
          }, config)
        }).then(function (data) {
          if (!data.error) {
            data.query.categorymembers.forEach(function (member) {
              members.push(member.title);
            });

            // If more, wait interval then recursively invoke getCategoryMembers
            if (data.hasOwnProperty("query-continue")) {
              return this.wait(interval).then(self.bind(null, interval,
                $.extend(config, {
                  cmcontinue: data["query-continue"].categorymembers.cmcontinue
                }), members)
              );
            }
          }

          return members.sort();
        }.bind(this),

        function () {
          return members.sort();
        });
      };

      // Sanitize input array entries w/ prefix
      categories = categories.map(function (category) {
        if (category.substring(0, 0 + prefix.length) !== prefix) {
          category = prefix + category;
        }

        return category;
      });

      /**
       * @description If an rate limit-friendly interval parameter is not
       * included or is not of the <code>number</code> data type, the API is
       * queried & an appropriate value calculated.
       */
      ((typeof interval === "number" && window.isFinite(interval))
        ? new $.Deferred().resolve(interval).promise()
        : this.getRateLimitInterval()
      ).then(
        function (interval) {
          this.data.interval = interval;
          return interval;
        }.bind(this),

        function () {
          this.data.interval = defaultInterval;
          return defaultInterval;
        }.bind(this)
      ).then(
        $getMembers.notify
      );

      /**
       * @description Once the rate limit interval has been calculated and
       * returned for use, the category members are retrieved for all inputted
       * categories and added to the holding array for return and usage
       * elsewhere.
       */
      $getMembers.progress(function (interval, catMembers) {
        catMembers = catMembers || [];

        if (counter === categories.length) {
          $getMembers.resolve(catMembers);
        } else {
          getMembers(interval, {
            cmtitle: categories[counter++]
          }).then(function (pages) {
            if (pages && pages.length) {
              pages.forEach(function (page) {
                catMembers.push(page);
              });
            }

            $getMembers.notify(interval, catMembers);
          });
        }
      }.bind(this));

      return $getMembers.promise();
    };

    /**
     * @description Arguably the most important method of the subclass, the
     * <code>continue</code> method is invoked when the user presses the
     * "Continue" UI button to commence the comment-toggling operation. The
     * method is responsible for passing pending deletion article data off to
     * the API query methods, & coordinating the associated date comparison and
     * deletion operations while logging status entries in the UI's status log.
     * The method makes use of a number of <code>$.Deferred</code> promises to
     * handle the coordination process as cleanly as possible.
     *
     * @returns {undefined}
     */
    Dialog.prototype.continue = function () {
      var lang, $deleteArticles, counter, defaultInterval, defaultCategory,
        defaultReason, current, currentDate, deletionDate, templateParam;

      lang = {
        eMembers: "Error: Unable to acquire category members",
        eMissing: "Error: No members found in category",
        eAPI: "Error: Error $1 encountered",
        eGeneral: "Error: Unable to perform operation",
        eDelete: "Error: Unable to delete article",
        sBegin: "Beginning operation...",
        sDone: "Success: All deletions complete",
        sAPI: "Success: $1 deleted",
      };

      // "Beginning operation..."
      this.addLogEntry(lang.sBegin);

      // Default definitions
      $deleteArticles = new $.Deferred();
      counter = 0;

      // Defaults
      defaultInterval = 1500;
      defaultCategory = "Category:Articles pending deletion";
      defaultReason = "Fails article guidelines";

      // Get current date
      currentDate = this.formatDate(new Date());

      /**
       * @description The acquisition promise chain handles the series of
       * <code>GET</code> requests that acquire all the pages on which the
       * Comply template is transcluded with deletion dates. The process begins
       * with the calculation & acquisition of a rate limit-friendly interval
       * used to pause operations at intermittent intervals. If a stored value
       * is found in <code>this.data</code> that value is passed along in a
       * resolved <code>$.Deferred</code>.
       * <br />
       * <br />
       * Once an interval has been established, the API is queried to retrieve
       * member pages in the pending deletion category. Those pages are then
       * joined into a pipe-delimited <code>string</code> & queried for their
       * wikitext content, from which their deletion dates are derived. Those
       * are thereafter compared to the current date and possibly deleted.
       */
      ((this.data.hasOwnProperty("interval"))
        ? new $.Deferred().resolve(this.data.interval).promise()
        : this.getRateLimitInterval()
      ).then(
        function (interval) {
          this.data.interval = interval;
          return interval;
        }.bind(this),

        function () {
          this.data.interval = defaultInterval;
          return defaultInterval;
        }.bind(this)
      ).then(
        function (interval) {
          return this.getCategoryMembers(defaultCategory, interval);
        }.bind(this)
      ).then(
        function (members) {
          members = members || [];
          if (!members.length) {
            return $deleteArticles.reject(lang.eMissing);
          } else {
            return $deleteArticles.notify(members);
          }
        }.bind(this),
        this.addLogEntry.bind(this, lang.eMembers)
      );

      /**
       * @description With category members in hand, the acquisition of wikitext
       * is undertaken, and the pending deletion dates retrieved for each. Those
       * pages whose dates match the present date are deleted. Relevant log
       * entries are added to the status log during the process before
       * completion resolves the promise in conclusion.
       */
      $deleteArticles.progress(function (members) {
        members = members || [];

        if (counter === members.length) {
          if (!members.length) {
            return $deleteArticles.reject(lang.eGeneral);
          } else {
            return $deleteArticles.resolve(lang.sDone);
          }
        }

        current = members[counter++];
        this.getPageContent(current).then(function (wikitext) {

          // Get date parameter of Comply template
          templateParam = wikitext.match(/{{Comply\|(.*)}}/)[1];

          // Format date in consistent format for comparison to current date
          deletionDate = this.formatDate(new Date(templateParam));

          // Log dates for review
          window.console.log(
            "Page: " + current + "\n",
            "Today: " + currentDate + "\n",
            "Deletion date: " + deletionDate + "\n"
          );

          // Disregard if current date is not deletion date
          if (currentDate !== deletionDate) {
            return $deleteArticles.notify(members);
          }

          // Only delete pages for which the current date is the deletion date
          this.deletePage(current, defaultReason).then(function (data) {
            this.addLogEntry((data.error)
              ? lang.eAPI.replace("$1", data.error.code)
              : lang.sAPI.replace("$1", current)
            );

            this.wait(this.data.interval).then(
              $deleteArticles.notify.bind(this, members));
          }.bind(this), $deleteArticles.reject.bind(null, lang.eDelete));

        }.bind(this), $deleteArticles.reject.bind(null, lang.eGeneral));
      }.bind(this));

      /**
       * @description In all cases, once the <code>$deleteArticles</code> is
       * either resolved or rejected, the UI fields are reenabled & a final
       * message logged in the status log.
       */
      $deleteArticles.always(this.addLogEntry.bind(this));
    };

    // New instances
    manager = new window.OO.ui.WindowManager();
    dialog = new Dialog();

    // jQuery definitions
    $body = $(document.body);
    $target = $(".toolbar .tools");
    $tool = $(dialog.buildButton(Dialog.static.title, Dialog.static.name));

    // Append window manager to document body
    $body.append(manager.$element);
    manager.addWindows([dialog]);

    // Toggle modal on toolbar button clicks
    $tool.appendTo($target).click(manager.openWindow.bind(manager, dialog));
  }).fail(window.console.error);
})(this, this.mediaWiki, this.jQuery);