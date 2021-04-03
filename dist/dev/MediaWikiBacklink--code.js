/**
 * MediaWikiBacklink/code.js
 * @file Adds backlink to doc page from MediaWiki/Module/GLM page if it exists
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.util"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isMWBacklinkLoaded) {
    return;
  }
  module.isLoaded = true;

  /**
   * @description Though the author usually separates protected constant values
   * used throughout the script into separate pseudo-enums, MediaWikiBacklink's
   * relatively small size and lack of complexity ultimately compelled the
   * author to simply group the handful of module-global constants into a single
   * pseudo-enum called Utility. This enum contains a <code>boolean</code> flag
   * for debug mode; a number of <code>string</code>s establishing the script
   * name, hook event name, Dev wiki id value, and various selectors; and a few
   * arrays denoting permissible namespaces on which the script may run, core
   * page titles that will never have matching mainspace doc pages, various wg
   * global constants to be fetched and cached, and required ResourceLoader
   * modules to be loaded prior to initialization completion.
   *
   * @readonly
   * @enum {boolean|string|object}
   */
  Object.defineProperty(this, "Utility", {
    enumerable: true,
    writable: false,
    configurable: false,
    value: Object.freeze({
      DEBUG: false,
      SCRIPT: "MediaWikiBacklink",
      HOOK_NAME: "dev.mediaWikiBacklink",
      GLM_PREFIX: "Global_Lua_Modules/",
      DEV_WIKI_ID: "7931",
      TARGET_SELECTOR: "page-header__page-subtitle",
      TARGET_SELECTOR_PARENT: "page-header__main",
      PROP_NS: Object.freeze([8, 828]),
      GLOBALS: Object.freeze(["wgCityId", "wgNamespaceNumber", "wgPageName"]),
      MODULES: Object.freeze(["mediawiki.util"]),
      WITHOUT: Object.freeze(["Chat", "Common", "Monobook", "Wikia"]),
    }),
  });

  /**
   * @description This method returns the resolved/rejected
   * <code>$.Deferred</code> response Promise that is used to check if a
   * documentation page exists for the currently viewed plugin/tool/module on
   * the main namespace. A list of backlinks is returned as part of the
   * response, the contents of which are checked against the core name of the
   * current code page by <code>this.main</code> to establish the connection
   * between code and documentation.
   *
   * @param {string} paramPage - Page to which backlinks will link
   * @returns {object} - <code>$.Deferred</code> object
   */
  this.getBacklinks = function (paramPage) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "query",
        list: "backlinks",
        bltitle: paramPage,
        blnamespace: 0,
        format: "json",
      }
    });
  };

  /**
   * @description This method is used only in cases in which a backlink matching
   * the assumed plugin name derived from the core name of the currently viewed
   * code page has not been found or if a network error or something has
   * prevented a list of backlinks from being returned for sorting. In such
   * cases, this method is used and provided the value of the assumed plugin
   * name to determine whether a page with that name actually exists on the
   * wiki. This covers cases in which a doc page on Dev may not actually link to
   * redirect code pages like <code>MediaWiki:ChatBlockButton/code.3.js</code>
   * which were previous versions of scripts that were either merged into the
   * main branch or converted to redirects due to being outdated versions.
   *
   * @param {string} paramPage - Page to be status-checked (assumed plugin name)
   * @returns {object} - <code>$.Deferred</code> object
   */
  this.getStatusOf = function (paramPage) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "query",
        titles: paramPage,
        format: "json",
      }
    });
  };

  /**
   * @description The <code>main</code> method, the principle application logic
   * method of the script, is used to find the relevant mainspace documentation
   * page via a series of API calls and add a link to the page header subtitle
   * section if found. Program flow execution is undertaken by a number of
   * helper <code>$.Deferred</code>s that coordinate the API calls as they are
   * needed. The method first queries the API via <code>this.getBacklinks</code>
   * to get a list of backlinks on the main namespace that link to the currently
   * viewed code page. If such links exist, their titles are compared to the
   * assumed plugin name derived from the core name of the code page. If a match
   * is found, the link to that page is added to the page header subtitle
   * section.
   * <br />
   * <br /.
   * If no backlinks exist or if a network error is encountered during the
   * backlinks query, the method will query using <code>this.getStatusOf</code>
   * to determine if the assumed plugin name exists on the wiki as a legitimate
   * page. In all likelihood, this is the documentation page for the code page,
   * so a link is added accordingly. This secondary, last-ditch check was added
   * to handle edge cases of code pages at secondary titles that were previously
   * linked on the doc page but subsequently merged with the main branch and
   * replaced with redirects importing the supported version of the script. Even
   * if such legacy code pages are no longer worth linking on the main doc page,
   * they should still have a backlink for convenience's sake.
   * <br />
   * <br />
   * As of July 2020, a relevant example of such an edge case page would be
   * <code>MediaWiki:ChatBlockButton/code.3.js</code>, a code page that once
   * held a fork of the main ChatBlockButton script. Currently, the page is not
   * backlinked to on the ChatBlockButton doc page due to the fact that it only
   * serves to import the main version of the script. However, for ease of
   * navigation, it should still link to the main doc page, hence the rationale
   * for this additional API query.
   *
   * @returns {void}
   */
  this.main = function () {

    // Declarations
    var i, n, backlinks, current, backlink, target, $getBacklinks, $findDoc,
      $getDoc;

    // Define $.Deferreds
    $findDoc = new $.Deferred();
    $getDoc = new $.Deferred();

    // Acquire array of backlinks linking to current code page
    $getBacklinks = this.getBacklinks(this.config.wgPageName);

    /**
     * @description If a query for relevant backlinks to the current page is
     * successful, the <code>done</code> handler sorts through the listing of
     * backlinks for one that matches the assumed plugin name. If one is found,
     * subsequent checks are unnecessary and are thus bypassed, leading program
     * flow to the handler responsible for constructing the header subtitle link
     * and prepending it to the header accordingly.
     * <br />
     * <br />
     * If the request for relevant backlinks is rendered unsuccessful due to a
     * network error or something to that effect, the <code>$.Deferred</code>
     * tasked with finding a documentation backlink is rejected and provided the
     * assumed plugin name value as a backup instead. The <code>fail</code>
     * callback will attempt a last-ditch check for this page's status as an
     * extant page on the wiki and add a link to that page if it exists.
     */
    $getBacklinks.then(function (paramData) {
      if (paramData.error) {
        if (this.Utility.DEBUG) {
          window.console.log(paramData.error);
        }
        return;
      }

      // Extant backlinks (could be multiple)
      backlinks = paramData.query.backlinks;

      if (this.Utility.DEBUG) {
        window.console.log(backlinks);
      }

      // Check all backlinks for matching doc page
      for (i = 0, n = backlinks.length; i < n; i++) {
        current = backlinks[i];

        if (this.Utility.DEBUG) {
          window.console.log(current);
        }

        // Only look for pages on the mainspace whose titles match script's
        if (
          current.ns === 0 && (
            current.title === this.name ||
            current.title.replace(/ /g, "_") === this.name
          )
        ) {
          return $findDoc.resolve(current.title);
        }
      }

      // If empty backlinks array or no match, go with assumed name as value
      return $findDoc.reject(this.name);
    }.bind(this), $findDoc.reject.bind(null, this.name));

    /**
     * @description If the <code>$.Deferred</code> tasked with finding a
     * relevant backlink is resolved successfully, meaning that a page with a
     * title matching that of the assumed plugin name has been found, program
     * flow proceeds to the callback tasked with adding a link to that page to
     * the page header as a subtitle. No further API calls are required at this
     * stage.
     * <br />
     * <br />
     * In the event that a documentation page backlinking to the currently
     * viewed code page is not found among the queried backlinks, or if a
     * network error was encountered that prevented a listing from being
     * generated, the <code>fail</code> callback is invoked and provided the
     * assumed plugin name derived from the core name of the code page as the
     * default value. A last-ditch query is made to determine if this assumed
     * page actually exists on the wiki. If it does, program flow passes to the
     * handler responsible for adding a link to the header. If it doesn't, the
     * execution ends via a rejected <code>$.Deferred</code> and nothing further
     * occurs.
     */
    $findDoc.then($getDoc.resolve, this.getStatusOf).then(function (paramData) {
      if (this.Utility.DEBUG) {
        window.console.log(paramData);
      }

      // Only proceed if previously made call to this.getStatusOf
      if (typeof paramData !== "object" || !paramData.hasOwnProperty("query")) {
        return $getDoc.reject();
      }

      // Check that page actually exists as indicated by properties
      $.each(paramData.query.pages, function (paramKey, paramValue) {
        if (paramKey !== -1 && !paramValue.hasOwnProperty("missing")) {
          $getDoc.resolve(paramValue.title);
        }
      });
    }.bind(this), $getDoc.reject);

    /**
     * @description In the event that a suitable documentation has been found,
     * either via a matching backlink or a last-ditch query indicating that the
     * assumed plugin name is an actual page on the wiki, the <code>done</code>
     * callback is invoked to add a link to the page header in the subtitle
     * section. If the subtitle section doesn't actually exists (in the case of
     * Lua modules, for the most part), that section is created first prior to
     * the link's addition to the DOM.
     */
    $getDoc.then(function (paramTitle) {

      // Constuct backlink HTML link
      backlink = "&lt;&nbsp;" + mw.html.element("a", {
        href: mw.util.getUrl(paramTitle),
        title: paramTitle,
      }, paramTitle);

      // Page subtitle
      target = "." + this.Utility.TARGET_SELECTOR;

      // If module ns and target subtitle doesn't exist, create subtitle first
      if (this.config.wgNamespaceNumber === 828 && !$(target).length) {
        $("." + this.Utility.TARGET_SELECTOR_PARENT).append(
          mw.html.element("div", {
            class: this.Utility.TARGET_SELECTOR,
          })
        );
      } else {
        backlink = backlink + "&nbsp;|&nbsp;";
      }

      // Add to subtitle section
      $(target).prepend(backlink);
    }.bind(this));
  };

  /**
   * @description The <code>init</code> method is invoked to initialize the
   * script once the requisite ResourceLoader modules specified in
   * <code>this.Utility.MODULES</code> have been loaded. The method is primarily
   * responsible for ensuring that the script only runs on the proper namespace,
   * determine the name of the plugin/tool from a redaction of the value of
   * <code>wgPageName</code>, and finally fire the related hook event, to which
   * is attached an invocation of the main handler <code>this.main</code>. The
   * <code>init</code> method also defines a <code>exports</code> property on
   * <code>window.dev.mediawikiBacklink</code> containing exposed public methods
   * and properties for external, post-load usage.
   *
   * @returns {void}
   */
  this.init = function () {

    // Cache wg variables
    this.config = Object.freeze(mw.config.get(this.Utility.GLOBALS));

    // Should only run on MediaWiki and Module namespaces
    if ($.inArray(this.config.wgNamespaceNumber, this.Utility.PROP_NS) === -1) {
      return;
    }

    // Formatted page name (presumably documentation mainspace page title)
    this.name =
      ((this.config.wgCityId === this.Utility.DEV_WIKI_ID &&
        this.config.wgNamespaceNumber === 828)
          ? this.Utility.GLM_PREFIX
          : "") +
      this.config.wgPageName
        // Remove "MediaWiki" or "MediaWiki:Custom-" prefixes
        .split(/:(?:Custom\-)?(.+)/)[1]
        // Remove "/code.js", etc. suffixes to leave plugin name alone
        .split(/[\/.]+/)[0];

    // A page like MediaWiki:Chat.js isn't gonna have a doc page called "Chat"
    if ($.inArray(this.name, this.Utility.WITHOUT) !== -1) {
      return;
    }

    if (this.Utility.DEBUG) {
      window.console.log("this.name:", this.name);
    }

    // Expose public methods for external debugging
    Object.defineProperty(module, "exports", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        observeScript: window.console.dir.bind(this, this),
      })
    });

    // Dispatch hook with window.dev.mediaWikiBacklink once init is complete
    mw.hook(this.Utility.HOOK_NAME).fire(module).add(this.main.bind(this));
  };

  // Coordinate loading of all relevant dependencies
  $.when(mw.loader.using(this.Utility.MODULES), $.ready)
    .done(this.init.bind(this))
    .fail(window.console.error.bind(null, this.Utility.SCRIPT));

}.call(Object.create(null), (this.dev = this.dev || {}).mediaWikiBacklink =
  this.dev.mediaWikiBacklink || {}, this, this.jQuery, this.mediaWiki));