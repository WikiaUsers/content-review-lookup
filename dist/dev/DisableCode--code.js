/**
 * <nowiki>
 * DisableCode
 * @file DisableCode is a JavaScript userscript that adds a number of buttons to
 * the user's "My Tools" menu that permit the addition/removal of query strings
 * in the URL. These query strings are used to deactivate various user/site
 * JavaScript/CSS code for testing purposes.
 * @author Eizen <dev.wikia.com/eizen>
 * @author Parkour2906 <dev.fandom.com/User:Parkour2906>
 */

;(function (module, window, $, mw) {
  "use strict";

  // Respect prior double-load protection convention
  if (!window || !$ || !mw || module.isLoaded || window.isDisableCodeLoaded) {
    return;
  }
  module.isLoaded = window.isDisableCodeLoaded = true;

  // Namespace protected properties
  Object.defineProperties(this, {

    /**
     * @description The <code>Selectors</code> pseudo-enum is used to store the
     * <code>string</code> names of custom selectors applied to the script's
     * generated HTML elements and extant selectors of element already existing
     * on the page for targetting purposes.
     *
     * @readonly
     * @enum {Object}
     */
    Selectors: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        CLASS_OVERFLOW: "overflow",
        CLASS_LIST: "disableCode-li",
        CLASS_LINK: "disableCode-a",
        ID_BAR: "WikiaBar",
        ID_MY_TOOLS: "my-tools-menu",
        ID_LIST: "disableCode",
        ID_LINK_PREFIX: "disableCode-",
      })
    },

    /**
     * @description The <code>Params</code> pseudo-enum is used to store
     * individual <code>Object</code>s related to each of the types of query
     * strings available for insertion into the URL. These include strings for
     * activation/deactivation of user CSS and JavaScipt and a catchall
     * "safemode" setting that deactivates all custom code on the viewed wiki.
     *
     * @readonly
     * @enum {Object}
     */
    Params: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SAFE_MODE: Object.freeze({
          QUERY: "safemode",
          VALUE: 1,
          MESSAGE: "safemode"
        }),
        USERJS: Object.freeze({
          QUERY: "useuserjs",
          VALUE: 0,
          MESSAGE: "userJS"
        }),
        USERCSS: Object.freeze({
          QUERY: "useusercss",
          VALUE: 0,
          MESSAGE: "userCSS"
        })
      })
    },

    /**
     * @description The <code>Utility</code> pseudo-enum is a catchall enum used
     * store various values that see use in the script. These include the
     * name of the script in <code>string</code> form, the I18n-js messages
     * cache value, and the name of the hook that is fired at the end of the
     * script initialization.
     *
     * @readonly
     * @enum {Object}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SCRIPT: "DisableCode",
        CACHE_VERSION: 2,
        HOOK_NAME: "dev.disableCode"
      }),
    },
  });

  /**
   * @description As the name implies, the <code>assembleLink</code> method is
   * used to construct a simple custom link element for inclusion into the
   * containing list element in the "My Tools" dropdown menu. It applies a
   * number of custom selectors and attaches the desired href location before
   * determining the display text by means of I18n-js.
   *
   * @function
   * @param {string} message - The name of the I18n-js message to display
   * @param {string} href - The link location to which the button points
   * @returns {string} - The assembled <code>string</code> HTML output
   */
  this.assembleLink = function (message, href) {
    return mw.html.element("a", {
      "id": this.Selectors.ID_LINK_PREFIX + message.toLowerCase(),
      "class": this.Selectors.CLASS_LINK,
      "href": href,
      "title": this.i18n.msg(message).plain()
    }, this.i18n.msg(message).plain());
  };

  /**
   * @description The <code>defineResetLocation</code> method is used to remove
   * any vestigial query strings added by this script from the URL. The
   * resultant target URL is the href of the "reset" button's link element. The
   * idea of using regex for this part was initially developed by Parkour2906,
   * with Eizen simplifying the regex slightly.
   *
   * @function
   * @returns {string} - The href to which the "reset" button will point
   */
  this.defineResetLocation = function () {
    return this.config.wgArticlePath.replace("$1", this.config.wgPageName +
      window.location.search.replace(
        new RegExp("([?&])" + Object.values(this.Params).map(function (entry) {
          return entry.QUERY + "[^&]*(?:&|$)";
        }).join("|"), "gmi"), "$1"
      )
    );
  };

  /**
   * @description The <code>init</code> function serves as the beating heart of
   * the script, serving to configure i18n data, define the script-global
   * scope's own properties, build and add the list container element to the
   * "My Tools" menu, fire the hook, and establish an <code>exports</code>
   * property for the <code>module</code>.
   * <br />
   * <br />
   * In the script's original implementation, a custom "My Tools" clone was
   * added to the toolbar. However, Parkour2906 scrapped this (admittedly
   * janky) approach in favor of adding the various buttons to one sole overflow
   * list element that would constitute a single entry in the "My Tools" menu,
   * a design choice retained by Eizen.
   *
   * @function
   * @param {Object} paramLang - i18n <code>Object</code> belonging to I18n-js
   * @returns {void}
   */
  this.init = function (paramLang) {

    // Declarations
    var content, target, search;

    // Add i18n data as local property
    (this.i18n = paramLang).useContentLang();

    // Cache globals as object property
    this.config = mw.config.get([
      "wgArticlePath",
      "wgPageName"
    ]);

    // Definitions
    target = "#" + this.Selectors.ID_BAR + " #" + this.Selectors.ID_MY_TOOLS;
    search = (window.location.search.length) ? "&" : "?";

    // Build tools list element and populate with buttons
    content = mw.html.element("li", {
      "id": this.Selectors.ID_LIST,
      "class": [
        this.Selectors.CLASS_OVERFLOW,
        this.Selectors.CLASS_LIST
      ].join(" ")
    }, new mw.html.Raw(
      this.assembleLink("reset", this.defineResetLocation()) +
      Object.values(this.Params).map(function (entry) {
        return this.assembleLink(
          entry.MESSAGE,
          this.config.wgArticlePath.replace("$1", this.config.wgPageName +
            window.location.search + search + entry.QUERY + "=" + entry.VALUE)
        );
      }.bind(this)).join("")
    ));

    // Add to "My Tools" menu
    $(target).prepend(content);

    // Expose public methods for external debugging
    Object.defineProperty(module, "exports", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        observeScript: window.console.dir.bind(this, this),
      })
    });

    // Attach hook once complete
    mw.hook(this.Utility.HOOK_NAME).fire(module);
  };

  // Attach hook listener, load script's messages, then pass to init
  mw.hook("dev.i18n").add(function (i18n) {
    $.when(
      i18n.loadMessages(this.Utility.SCRIPT, {
        cacheVersion: this.Utility.CACHE_VERSION,
      }),
      $.ready
    )
    .done(this.init.bind(this))
    .fail(window.console.error.bind(null, this.Utility.SCRIPT));
  }.bind(this));

  // Import I18n-js if not already loaded
  if (!window.dev || !window.dev.i18n) {
    window.importArticle({
      type: "script",
      article: "u:dev:MediaWiki:I18n-js/code.js"
    });
  }

}.call(Object.create(null), (this.dev = this.dev || {}).disableCode =
  this.dev.disableCode || {}, this, this.jQuery, this.mediaWiki));