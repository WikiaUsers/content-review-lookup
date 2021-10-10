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
          ID_UAA_SPAN: "userAccountAge-span",
          ID_UAA_LINK: "userAccountAge-a",
          CLASS_MASTHEAD_TAG: "user-identity-header__tag",
        }),
        TARGETS: Object.freeze({
          UCP_MASTHEAD_TAGS: ".user-identity-header__attributes",
        })
      }),
    },

    /**
     * @description The <code>Config</code> pseudo-enum is used primarily by
     * <code>this.validateConfig</code> to ensure that the user's input config
     * (if applicable) is well-formed and properly defined prior to its usage
     * by the script. If the user has chosen not to include certain properties
     * in the config object, the default values established in this enum are
     * applied instead as default values. The enum contains a single data
     * <code>object</code> establishing both the formal name of the property as
     * it exists in the config object and its associated default value.
     *
     * @readonly
     * @enum {object}
     */
    Config: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SHOW_FULL_DATE: Object.freeze({
          NAME: "showFullDate",
          DEFAULT: false,
        }),
      }),
    },

    /**
     * @description The <code>Modules</code> pseudo-enum is a
     * <code>string</code> array containing the names of the ResourceLoader
     * modules that are loaded via <code>mw.loader.using</code> at the start of
     * the program's execution. Previously, this pseudo-enum was named
     * <code>Dependencies</code> and likewise included an array of window
     * properties named <code>GLOBALS</code> fetched via
     * <code>mw.config.get</code> and cached for subsequent use.
     *
     * @readonly
     * @enum {object}
     */
    Modules: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze([
        "mediawiki.api",
        "mediawiki.util"
      ])
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
   * @description This helper function, based on MassEdit's assorted validation
   * methods, is used to ensure that the user's inputted config has properties
   * of the proper data type, i.e. <code>boolean</code> for the
   * <code>showFullDate</code> flag. If no property exists or if the wrong data
   * type is detected, the default value specified in <code>this.Config</code>
   * is applied instead.
   *
   * @param {object} paramConfig - User config <code>object</code> to validate
   * @returns {object} config - Frozen well-formed config <code>object</code>
   */
  this.validateConfig = function (paramConfig) {

    // Declarations
    var element, entry, fields, config;

    // Definitions
    config = {};
    fields = this.Config;

    // Set to default if user input doesn't exist or if wrong data type
    for (element in fields) {
      if (!fields.hasOwnProperty(element)) {
        continue;
      }
      entry = fields[element];

      // Define with default if no property or if input is of wrong data type
      config[entry.NAME] = (!paramConfig.hasOwnProperty(entry.NAME) ||
        typeof paramConfig[entry.NAME] !== typeof entry.DEFAULT)
          ? entry.DEFAULT
          : paramConfig[entry.NAME];
    }

    return Object.freeze(config);
  };

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
      "id": this.Selectors.NAMES.ID_UAA_SPAN,
      "class": this.Selectors.NAMES.CLASS_MASTHEAD_TAG
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
   * @description The <code>buildTimeago</code> function is a helper method that
   * is little more than a UCP-friendly adapation of the standard
   * <code>$.timeago.inWords</code> function provided by default. For whatever
   * reason, the UCP version of this function includes a conditional check for
   * time values and only provides a fuzzy date for values smaller than 30 days.
   * To work around this, this function provides the same functionality without
   * the conditional, a method used in LastEdit to likewise circumvent this
   * restriction.
   *
   * @param {string} paramDate The date timestamp to be fuzzyified
   * @returns {string} Fuzzy date to be displayed as first revision link text
   */
  this.buildTimeago = function (paramDate) {

    // Declarations
    var t, e, r, a, i, n, o;

    // Definitions 1
    t = new Date().getTime() - $.timeago.parse(paramDate).getTime();
    e = false;

    // Determine if system clock is not synced (10 minutes from now)
    $.timeago.settings.allowFuture && (t < 0 && (e = !0), t = Math.abs(t));

    // Definitions 2
    r = t / 1e3;
    a = r / 60;
    i = a / 60;
    n = i / 24;
    o = n / 365;

    // Helper function for mw.message fetching
    function u(t, r) {
      return mw.message(e
        ? "timeago-" + t + "-from-now"
        : "timeago-" + t, r
      ).text();
    }

    return (
      r < 45 && u("second", Math.round(r)) ||
      r < 90 && u("minute", 1) ||
      a < 45 && u("minute", Math.round(a)) ||
      a < 90 && u("hour", 1) ||
      i < 24 && u("hour", Math.round(i)) ||
      i < 48 && u("day", 1) ||
      n < 30 && u("day", Math.floor(n)) ||
      n < 60 && u("month", 1) ||
      n < 365 && u("month", Math.floor(n / 30)) ||
      o < 2 && u("year", 1) ||
      u("year", Math.floor(o))
    );
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
    var $helper, $getEssentials, interval, target, user, dateString, dateInfo,
      formattedDate, tagText, address, tag;

    // Definitions
    $helper = new $.Deferred();
    interval = null;
    target = this.Selectors.TARGETS.UCP_MASTHEAD_TAGS;

    if (this.Utility.DEBUG) {
      window.console.log("target:", target);
    }

    // Make initial call to progress before interval in case masthead exists
    $getEssentials = $.when(
      this.getRegistrationData(this.info.userName),
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
     * masthead has been loaded and the registration data of the current user
     * has been successfully retrieved, the custom user tag is created via
     * <code>this.assembleUserTag</code> and appended to the tags group.
     */
    $getEssentials.then(function (paramData) {
      if (this.Utility.DEBUG) {
        window.console.log(paramData);
      }

      // Specific user registration data
      user = paramData[0].query.users[0];

      // Reject malformed data or errors
      if (
        paramData.error ||
        user.registration == null ||
        user.hasOwnProperty("missing") ||
        user.hasOwnProperty("invalid")
      ) {
        return;
      }

      if (this.Utility.DEBUG) {
        window.console.log(user.registration);
      }

      // Date definition
      dateString = new Date(user.registration).toString();

      // Store date partials in object for piecemeal usage
      dateInfo = {
        dayWeek: dateString.slice(0, 3),       // "Fri"
        dayCalendar: dateString.slice(4, 15),  // "Sep 01 2017"
        time: dateString.slice(16, 24),        // "19:37:07"
      };

      // Example: "Fri, Sep 01 2017, 19:37:07"
      formattedDate = dateInfo.dayWeek + ", " + dateInfo.dayCalendar + ", " +
        dateInfo.time;

      /* On UCP wikis, $.timeago no longer works properly for dates beyond 30
       * days on account of a conditional check that wasn't present on legacy
       * wikis. To circumvent this and coerce a fuzzy date for dates with values
       * greater than 30 days, the $.timeago.inWords function has been recreated
       * here as is.buildTimeago without the aforementioned check.
       */
      tagText = (this.info.config.showFullDate)
        ? dateInfo.dayCalendar
        : this.buildTimeago(user.registration);

      // Assemble link to formatted JSON data confirming registration
      address = mw.util.wikiScript("api") + "?" + $.param({
        format: "jsonfm",
        action: "query",
        list: "users",
        usprop: "registration",
        ususers: user.name,
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

    // Validate any user config
    this.info.config = this.validateConfig(window.customUserAccountAge || {});

    // Username if user page (UCP et al.)
    this.info.userName = mw.config.get("profileUserName");

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
  $.when(mw.loader.using(this.Modules), $.ready)
    .done(this.init.bind(this))
    .fail(window.console.error.bind(null, this.Utility.SCRIPT));

}.call(Object.create(null), (this.dev = this.dev || {}).userAccountAge =
  this.dev.userAccountAge || {}, this, this.jQuery, this.mediaWiki));