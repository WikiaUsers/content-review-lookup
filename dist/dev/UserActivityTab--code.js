/**
 * UserActivityTab/code.js
 * @file Adds custom profile tab linking to <code>w:Special:UserActivity</code>
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.api"
 * @external "mediawiki.util"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded ||
      window.isUserActivityTabLoaded) {
    return;
  }
  module.isLoaded = true;

  // Protected pseudo-enums
  Object.defineProperties(this, {

    /**
     * @description This pseudo-enum contains a pair of <code>string</code>
     * <code>object</code> properties containing the names of various element
     * selectors targeted by the script's various methods or applied to the new
     * user profile tab added by the script. The <code>NAMES</code> property
     * contains the names of selectors added the UserActivityTab itself, while
     * the <code>TARGETS</code> <code>object</code> contains jQuery-friendly
     * formatted selectors that are targeted for the retrieval of their text
     * content or used as parent nodes to which is added script-constructed
     * child HTML.
     *
     * @readonly
     * @enum {object}
     */
    Selectors: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        NAMES: Object.freeze({
          DATA_ID_LIST: "user-activity",
          CLASS_USERPAGE_TAB: "user-profile-navigation__link false",
        }),
        TARGETS: Object.freeze({
          MASTHEAD_TABS: ".user-profile-navigation",
        }),
      }),
    },

    /**
     * @description The <code>Dependencies</code> pseudo-enum contains a pair of
     * <code>string</code> arrays as properties. The <code>GLOBALS</code> array
     * contains the various <code>wg</code> globals that are fetched and cached
     * via a <code>mw.config.get</code> invocation later in the application,
     * while the <code>MODULES</code> array contains the names of ResourceLoader
     * modules that are loaded via <code>mw.config.get</code> at the start of
     * the program's execution.
     * <br />
     * <br />
     * Of particular note is the new UCP-specific global called
     * <code>profileUserName</code>. This global, along with its five similarly
     * prefixed cousins, only appears as a property of the <code>window</code>
     * <code>object</code> on pages that display the user masthead. The presence
     * of this global is a clear indication that the user masthead will be lazy-
     * loaded at some point after DOM load, allowing the script to know to
     * <code>setInterval</code> and chill until the masthead deigns to make an
     * appearance on the page.
     *
     * @readonly
     * @enum {object}
     */
    Dependencies: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        GLOBALS: Object.freeze([
          "profileUserName",
          "wgUserLanguage",
          "wgUserName"
        ]),
        MODULES: Object.freeze([
          "mediawiki.api",
          "mediawiki.util"
        ]),
      })
    },

    /**
     * @description The <code>Utility</code> pseudo-enum houses assorted
     * constants of various data types used through the program for various
     * purposes. It contains the <code>setInterval</code> at which the script
     * scans the page for the user masthead, a <code>boolean</code> flag for
     * debug mode, and several <code>string</code> related to the script name,
     * <code>mw.hook</code> event name, custom tab link target, and the name of
     * the <code>mw.message</code> fetched in the user's language.
     *
     * @readonly
     * @enum {number|boolean|string}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        CHECK_RATE: 200,
        DEBUG: false,
        SCRIPT: "UserActivityTab",
        HOOK_NAME: "dev.userActivityTab",
        TAB_LINK: "w:Special:UserActivity",
        MW_MESSAGE_NAME: "user-activity-tab",
      }),
    },
  });

  /**
   * @description As the name implies, the <code>assembleTag</code> method is
   * used to build the custom user tab linking to the user's User Activity page
   * on Community Central. For the purposes of simplicity, the outer containing
   * <code>li</code> list element is provided both the UCP class name(s) and the
   * legacy MW 1.19 <code>data-id</code> attribute. As the UCP class does not
   * apply any styles on legacy wikis, this appears to have no caused any
   * noticable display issues.
   *
   * @param {string} paramText - <code>string</code> message text to display
   * @returns {string} - Formatted <code>string</code> HTML
   */
  this.assembleTab = function (paramText) {
    return mw.html.element("li", {
      "class": this.Selectors.NAMES.CLASS_USERPAGE_TAB,
      "data-id": this.Selectors.NAMES.DATA_ID_LIST,
    }, new mw.html.Raw(
      mw.html.element("a", {
        "href": mw.util.getUrl(this.Utility.TAB_LINK),
        "title": paramText
      }, paramText)
    ));
  };

  /**
   * @description The <code>getMessage</code> method replaces the previous
   * script version's usage of the I18n-js external dependency in favor of
   * simply retrieving the latest versions/translations of the system message
   * via API query. On UCP wikis, this is done very simply via the shorthand
   * invocation of <code>mw.Api.prototype.getMessages</code>. On legacy wikis,
   * however, this requires a proper call to <code>allmessages</code>. For the
   * purposes of simplicity, the method itself sorts through the returned data
   * <code>object</code> for the desired "User Activity" text and returns that
   * <code>string</code> alone in a new <code>$.Deferred</code> promise.
   *
   * @param {string} paramMessage - Internal <code>mw.message</code> name
   * @returns {object} - Resolved/rejected <code>$.Deferred</code>
   */
  this.getMessage = function (paramMessage) {
    return new mw.Api().getMessages([paramMessage], {
      amlang: this.globals.wgUserLanguage,
    }).then(function (paramData) {
      return paramData[paramMessage];
    }.bind(this));
  };

  /**
   * @description The <code>main</code> method is called once the script
   * initialization process handled by <code>init</code> has completed. This
   * method is used to load the latest version/translation of the requisite
   * <code>user-activity-tab</code> <code>mw.message</code> from the API, wait
   * until the masthead has loaded (if UCP), then assemble and apply the custom
   * user profile tab/navigation link to the target element. <code>$.when</code>
   * is used to concurrently coordinate the loading of the message text with the
   * loading of the masthead, the latter of which makes use of
   * <code>setInterval</code> and a helper <code>$.Deferred</code> to ensure
   * that subsequent program flow does not occur until the masthead is loaded.
   *
   * @returns {void}
   */
  this.main = function () {

    // Declarations
    var target, $helper, $getEssentials, interval, tab;

    // Definitions
    $helper = new $.Deferred();
    target = this.Selectors.TARGETS.MASTHEAD_TABS;

    if (this.Utility.DEBUG) {
      window.console.log("target:", target);
    }

    // Make initial call to progress before interval in case masthead exists
    $getEssentials = $.when(
      this.getMessage(this.Utility.MW_MESSAGE_NAME),
      $helper.notify().promise()
    );

    // Continually check for presence of masthead via setInterval
    interval = window.setInterval($helper.notify, this.Utility.CHECK_RATE);

    /**
     * @description The helper <code>$.Deferred</code> is pinged via the use of
     * <code>$.Deferred.notify<code> every time the script needs to check if
     * the targeted masthead exists. On legacy wikis where the masthead is
     * always assembled by the time the DOM is loaded, this will be a single
     * call. However, on UCP wikis where the masthead is lazy-loaded, the
     * callback is pinged every 200 ms by <code>setInterval</code> until the
     * masthead joins the party. Once it exists, <code>$helper</code> is
     * resolved and execution continues to the <code>$.when</code> handler.
     */
    $helper.progress(function () {
      if (this.Utility.DEBUG) {
        window.console.log("$helper.progress");
      }

      // Check for target, or check if interval (hence UCP)
      if (!$(target).length) {
        return;
      } else if (interval) {
        window.clearInterval(interval);
      }

      // Resolve helper $.Deferred once masthead is found
      $helper.resolve();
    }.bind(this));

    /**
     * @description Once <code>$getEssentials</code> resolves or rejects, the
     * associated <code>then</code> handlers are invoked accordingly. If the
     * <code>$.when</code> <code>$.Deferred</code> is resolved, meaning that the
     * masthead has been loaded and the latest translation of the system message
     * has been successfully retrieved, the User Activity tab is created via
     * <code>this.assembleTab</code> and appended to the tabs listing target.
     */
    $getEssentials.then(function (paramMessage) {
      tab = this.assembleTab(paramMessage);

      if (this.Utility.DEBUG) {
        window.console.log(paramMessage, tab);
      }

      // UserActivity is always at the end of the tabs listing
      $(target).append(tab);
    }.bind(this), window.console.error.bind(null, this.Utility.SCRIPT));
  };

  /**
   * @description The <code>init</code> method is called once the requisite
   * ResourceLoader modules have been loaded and is tasked with setting up the
   * script in preparation for the creation and insertion of the custom tab by
   * <code>this.main</code>. In addition to the usual checks for duplicate
   * script loads and fetching/caching of required globals, the method makes use
   * of the new <code>wg</code> global <code>profileUserName</code> to determine
   * if the UCP page being viewed is expected to lazy-load a masthead at some
   * indeterminate point in the future. If the <code>window</code> object has
   * this property (or any of its similarly prefixed cousins), the script can
   * expect that the masthead will appear at some point and plan accordingly to
   * invoke <code>setInterval</code> and wait until the masthead makes an
   * appearance.
   * <br />
   * <br />
   * As an aside, <code>profileUserName</code> is a much cleaner way of getting
   * the username of the user whose page is being viewed than the legacy method,
   * which involves targeting the masthead header with jQuery and stripping the
   * text via <code>jQuery.text</code>. The method uses these two in concert as
   * a means of determining if the masthead will appear&mdash;if the
   * <code>mw.config.get</code>ted value of <code>profileUserName</code> is
   * <code>null</code> and the jQuery-targeted header text is an empty
   * <code>string</code>, the script knows the current page is not a page on
   * which a masthead will appear.
   *
   * @returns {void}
   */
  this.init = function () {

    // Object for storage of informational data
    this.info = {};

    // Cache globals
    this.globals = Object.freeze(mw.config.get(this.Dependencies.GLOBALS));

    // Either username if user page (UCP et al.) or null if no masthead
    this.info.userName = this.globals.profileUserName;

    // Determine if masthead exists (indicates presence of userpage)
    this.info.hasMasthead = !!this.info.userName;

    // Expose public methods for external debugging
    Object.defineProperty(module, "exports", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        observeScript: window.console.dir.bind(this, this),
      })
    });

    // Return if tab exists, if no masthead, or if viewing another user's page
    if (
      $("li[data-id='" + this.Selectors.NAMES.DATA_ID_LIST + "']").length ||
      !this.info.hasMasthead ||
      this.info.userName !== this.globals.wgUserName
    ) {
      if (this.Utility.DEBUG) {
        window.console.log("return;");
      }
      return;
    }

    // Dispatch hook with window.dev.mediaWikiBacklink once init is complete
    mw.hook(this.Utility.HOOK_NAME).fire(module).add(this.main.bind(this));
  };

  // Coordinate loading of all relevant dependencies
  $.when(mw.loader.using(this.Dependencies.MODULES), $.ready)
    .done(this.init.bind(this))
    .fail(window.console.error.bind(null, this.Utility.SCRIPT));

}.call(Object.create(null), (this.dev = this.dev || {}).userActivityTab =
  this.dev.userActivityTab || {}, this, this.jQuery, this.mediaWiki));