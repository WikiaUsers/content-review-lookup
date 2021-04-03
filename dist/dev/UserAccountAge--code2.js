/**
 * UserAccountAge/code2.js
 * @file Appends user tag to masthead with time since account's creation
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.api"
 * @external "mediawiki.util"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isUAALoaded) {
    return;
  }
  module.isLoaded = true;

  // Protected namespace pseudo-enums
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

          // UAA Id selectors
          ID_TAG_SPAN: "userAccountAge-span",
          ID_UAA_LINK: "userAccountAge-a",

          // Tag class selectors
          CLASS_LEGACY_MASTHEAD_TAG: "tag",
          CLASS_UCP_MASTHEAD_TAG: "user-identity-header__tag",
        }),
        TARGETS: Object.freeze({
          LEGACY_MASTHEAD_HEADER: ".masthead-info h1",
          LEGACY_MASTHEAD_TAGS: ".masthead-info hgroup",
          UCP_MASTHEAD_TAGS: ".user-identity-header__attributes",
        })
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
          "wgVersion",
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
     * debug mode, and several <code>string</code> related to the script name
     * and the related <code>mw.hook</code> event name.
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
        SCRIPT: "UserAccountAge",
        HOOK_NAME: "dev.userAccountAge",
      }),
    }
  });

  /**
   * @description This assembly method is used to assemble a link element within
   * an enclosing <code>span</code> exhibiting the requisite user tag class/id
   * selectors specific to the version of MediaWiki in use on the wiki. For the
   * purposes of simplicity, the outer containing <code>span</code> tag element
   * is provided both the UCP/MW 1.33 and the legacy MW 1.19 class names. As the
   * UCP class does not apply any styles on legacy wikis, this appears to have
   * not caused any noticable display issues.
   *
   * @param {string} paramText - User tag text displayed
   * @param {string} paramTitle - User tag title on hover
   * @param {string} paramAddress - Link to API query confirming registration
   * @returns {string} - Assembled <code>string</code> HTML for appending
   */
  this.assembleUserTag = function (paramText, paramTitle, paramAddress) {
    return mw.html.element("span", {
      "id": this.Selectors.NAMES.ID_TAG_SPAN,
      "class": [
        "CLASS_LEGACY_MASTHEAD_TAG",
        "CLASS_UCP_MASTHEAD_TAG"
      ].map(function (paramName) {
        return this.Selectors.NAMES[paramName];
      }.bind(this)).join(" "),
    }, new mw.html.Raw(
      mw.html.element("a", {
        "id": this.Selectors.NAMES.ID_UAA_LINK,
        "href": paramAddress,
        "title": paramTitle,
      }, paramText)
    ));
  };

  /**
   * @description The <code>getRegistrationData</code> method of the
   * <code>namespace</code> object returns a <code>$.Deferred</code> that passes
   * <code>namespace.main</code> user registration data upon a successful
   * resolve. It is invoked within the body of <code>namespace.main</code> in a
   * <code>$.when</code> and is passed the username of the user as retrieved
   * from the header of the page masthead on legacy wikis or from the wg global
   * <code>window</code> property <code>profileUserName</code> on UCP wikis.
   *
   * @param {string} paramUsername - Username about whom to retrieve data
   * @returns {object} - <code>$>Deferred</code> promise object
   */
  this.getRegistrationData = function (paramUsername) {
    return new mw.Api().get({
      action: "query",
      list: "users",
      usprop: "registration",
      ususers: paramUsername,
      format: "json"
    });
  };

   /**
   * @description The <code>main</code> method is called once the script
   * initialization process handled by <code>init</code> has completed. This
   * method is used to load the registration data related to the currently
   * viewed user from an API query, wait until the masthead has loaded (if UCP),
   * then assemble and apply the custom user tag to the target element.
   * <code>$.when</code> is used to concurrently coordinate the loading of the
   * registration data with the loading of the masthead, the latter of which
   * makes use of <code>setInterval</code> and a helper <code>$.Deferred</code>
   * to ensure that subsequent program flow does not occur until the masthead is
   * loaded.
   *
   * @returns {void}
   */
  this.main = function () {

    // Declarations
    var $helper, $getEssentials, interval, target, userData, date, dateString,
      dateInfo, formattedDate, tagText, address, tag;

    // Definitions
    $helper = new $.Deferred();
    interval = null;
    target = this.Selectors.TARGETS[(this.info.isUCP)
      ? "UCP_MASTHEAD_TAGS"
      : "LEGACY_MASTHEAD_TAGS"
    ];

    if (this.Utility.DEBUG) {
      window.console.log("target:", target);
    }

    // Make initial call to progress before interval in case masthead exists
    $getEssentials = $.when(
      this.getRegistrationData(this.info.userName),
      $helper.notify().promise()
    );

    // Continually check for presence of masthead via setInterval
    if (this.info.isUCP) {
      interval = window.setInterval($helper.notify, this.Utility.CHECK_RATE);
    }

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
     * masthead has been loaded and the registration data of the current user
     * has been successfully retrieved, the custom user tag is created via
     * <code>this.assembleUserTag</code> and appended to the tags group.
     */
    $getEssentials.then(function (paramData) {
      if (this.Utility.DEBUG) {
        window.console.log(paramData);
      }

      // Specific user registration data
      userData = paramData[0].query.users[0];

      // Reject malformed data or errors
      if (
        paramData.error ||
        userData.registration == null ||
        userData.hasOwnProperty("missing") ||
        userData.hasOwnProperty("invalid")
      ) {
        return;
      }

      if (this.Utility.DEBUG) {
        window.console.log(userData.registration);
      }

      // Date definitions
      date = new Date(userData.registration);
      dateString = date.toString();

      // Store date partials in object for piecemeal usage
      dateInfo = {
        dayWeek: dateString.slice(0, 3),       // "Fri"
        dayCalendar: dateString.slice(4, 15),  // "Sep 01 2017"
        time: dateString.slice(16, 24),        // "19:37:07"
      };

      // Example: "Fri, Sep 01 2017, 19:37:07"
      formattedDate = dateInfo.dayWeek + ", " + dateInfo.dayCalendar + ", " +
        dateInfo.time;

      /* For whatever reason, $.timeago when invoked on UCP wikis no longer
       * returns any value apart from "NaN years ago", "a minute ago", or
       * undefined. Until this issue is resolved (once the function returns a
       * word-based summary), the UCP user tag will likely display a shortened
       * version of the formattedDate so the tag isn't rendered too long.
       */
      tagText = $.timeago(date) || dateInfo.dayCalendar;

      // Assemble link to formatted JSON data confirming registration
      address = mw.util.wikiScript("api") + "?" + $.param({
        format: "jsonfm",
        action: "query",
        list: "users",
        usprop: "registration",
        ususers: userData.name,
      });

      // Build and log custom tag
      tag = this.assembleUserTag(tagText, formattedDate, address);
      if (this.Utility.DEBUG) {
        window.console.log(tag);
      }

      // Inject CSS styling after assembly and prior to appending
      mw.util.addCSS(
        "#" + this.Selectors.NAMES.ID_UAA_LINK + "{" +
          "color: inherit !important;" +
        "}"
      );

      // Add tag to target tags group
      $(target).append(tag);
    }.bind(this), window.console.error.bind(null, this.Utility.SCRIPT));
  };

  /**
   * @description The <code>init</code> method is called once the requisite
   * ResourceLoader modules have been loaded and is tasked with setting up the
   * script in preparation for the creation and insertion of the custom tab by
   * <code>this.main</code>. In addition to the usual checks for the user
   * masthead and fetching/caching of required globals, the method makes use of
   * the new <code>wg</code> global <code>profileUserName</code> to determine if
   * the UCP page being viewed is expected to lazy-load a masthead at some
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

    // Determine MW version
    this.info.isUCP = window.parseFloat(this.globals.wgVersion) > 1.19;

    // Either username if user page (UCP et al.) or empty string if no masthead
    this.info.userName = (
      this.globals.profileUserName ||
      $(this.Selectors.TARGETS.LEGACY_MASTHEAD_HEADER).text()
    );

    // Determine if masthead exists (indicates presence of userpage)
    this.info.hasMasthead = !!this.info.userName.length;

    // Expose public methods for external debugging
    Object.defineProperty(module, "exports", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        observeScript: window.console.dir.bind(this, this),
      })
    });

    // Return if no masthead expected to appear or if anon
    if (
      !this.info.hasMasthead ||
      mw.util.isIPv4Address(this.info.userName) ||
      mw.util.isIPv6Address(this.info.userName)
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

}.call(Object.create(null), (this.dev = this.dev || {}).userAccountAge =
  this.dev.userAccountAge || {}, this, this.jQuery, this.mediaWiki));