/**
 * UserAccountAge/code2.js
 * @file Appends user tag to masthead with time since account's creation
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @external "mediawiki.util"
 * @external "window.jQuery"
 * @external "window.mediaWiki"
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true,
   bitwise: false */

;(function (module, namespace, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isUAALoaded) {
    return;
  }
  module.isLoaded = true;

  // Protected namespace pseudo-enums
  Object.defineProperties(namespace, {

    /**
     * @description Inspired by the author's <code>MassEdit</code> flagship
     * script's organizational design pattern, the UserAccountAge script also
     * has a number of pseudo-enums containing immutable protected data. As with
     * MassEdit, the script has a dedicated <code>Selectors</code> enum housing
     * the various element class and id selector names on both legacy MW 1.19
     * wikis and newer UCP wikis for use in appending the user tag to the right
     * location on the userpage masthead.
     *
     * @readonly
     * @enum {string}
     */
    Selectors: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({

        // Custom tag IDs
        ID_TAG_SPAN: "userAccountAge-span",
        ID_UAA_LINK: "userAccountAge-a",

        // MW 1.19 legacy selector names
        CLASS_LEGACY_MASTHEAD_WRAPPER: "UserProfileMasthead",
        CLASS_LEGACY_MASTHEAD_HEADER: "masthead-info h1",
        CLASS_LEGACY_MASTHEAD_TAGS: "masthead-info hgroup",
        CLASS_LEGACY_MASTHEAD_TAG: "tag",

        // Modern UCP selector names
        CLASS_UCP_MASTHEAD_WRAPPER: "user-identity-box__wrapper",
        CLASS_UCP_MASTHEAD_HEADER: "user-identity-header__attributes h1",
        CLASS_UCP_MASTHEAD_TAGS: "user-identity-header__attributes",
        CLASS_UCP_MASTHEAD_TAG: "user-identity-header__tag",
      }),
    },

    /**
     * @description As its name implies, the <code>Utility</code> enum houses a
     * variety of protected default values not belonging to one specific data
     * type. At present, it holds the <code>number</code> value related to the
     * rate at which the lazy-loaded masthead is scanned on UCP wikis, a
     * <code>booleam</code> flag related to the debugging of the application via
     * <code>console.log</code> invocations, and an array containing the
     * ResourceLoader modules required to run the script.
     *
     * @readonly
     * @enum {number|boolean|object}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        INTERVAL_RATE: 200,
        DEBUG: false,
        MODULES: Object.freeze(["mediawiki.util"]),
      }),
    }
  });

  /**
   * @description This assembly method is used to assemble a link element within
   * an enclosing <code>span</code> exhibiting the requisite user tag class/id
   * selectors specific to the version of MediaWiki in use on the wiki.. The
   * inner <code>a</code> link element exhibits a <code>timeago</code> class
   * selector for use with <code>$.fn.timeago</code>, a function used to convert
   * long-form formatted dates to shorter, generalized variants more friendly to
   * inclusion in a user tag.
   *
   * @param {string} paramText - User tag text displayed
   * @param {string} paramTitle - User tag title on hover
   * @param {string} paramAddress - Link to API query confirming registration
   * @returns {string} - Assembled <code>string</code> HTML for appending
   */
  namespace.assembleUserTag = function (paramText, paramTitle, paramAddress) {
    return mw.html.element("span", {
      "class": this.elements.tag,
      "id": this.Selectors.ID_TAG_SPAN,
    }, new mw.html.Raw(
      mw.html.element("a", {
        "id": this.Selectors.ID_UAA_LINK,
        "href": paramAddress,
        "title": paramTitle,
      }, paramText)
    ));
  };

  /**
   * @description The <code>getRegistrationData</code> method of the
   * <code>namespace</code> object returns a <code>$.Deferred</code> that passes
   * <code>namespace.main</code> user registration data upon a successful
   * resolve. It is invoked within the body of <code>namespace.init</code> and
   * is passed the username of the user as retrieved from the header of the page
   * masthead.
   *
   * @param {string} paramUsername - Username about whom to retrieve data
   * @returns {object} - <code>$>Deferred</code> promise object
   */
  namespace.getRegistrationData = function (paramUsername) {
    return $.ajax({
      type: "POST",
      url: mw.util.wikiScript("api"),
      data: {
        token: mw.user.tokens.get("editToken"),
        action: "query",
        list: "users",
        usprop: "registration",
        ususers: paramUsername,
        format: "json"
      }
    });
  };

  /**
   * @description The <code>namespace.main</code> method is responsible for
   * handling a successful retrieval of user registration data made via
   * <code>namespace.init</code>'s invocation of
   * <code>namespace.getRegistrationData</code>. After ensuring that retrieved
   * data is not error-ridden or malformed, the method formats the date of
   * registration in a readable format, creates a link to a REST query
   * confirming the date, and builds the user tag accordingly via a call to
   * <code>namespace.assembleUserTag</code>. If the masthead is lazy-loaded (per
   * UCP), a series of <code>setInterval</code> invocations are made until the
   * masthead is loaded, after which the user tag is added to the relevant
   * location.
   *
   * @param {object} paramData - Data from <code>getRegistrationData</code>
   * @returns {void}
   */
  namespace.main = function (paramData) {

    // Declarations
    var userData, date, dateString, $timeago, formattedDate, dateInfo, address,
      tagText, tag, interval, $helper;

    // Initial definitions
    userData = paramData.query.users[0];
    $helper = new $.Deferred();
    interval = null;

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
      console.log(userData.registration);
    }

    // Date definitions
    date = new Date(userData.registration);
    $timeago = $.timeago(date); // Returns undefined on UCP
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
     * word-based summary), the UCP user tag should display a shortened version
     * of the formattedDate so the tag isn't rendered too long.
     */
    tagText = (this.isUCP) ? dateInfo.dayCalendar : $timeago;

    // Assemble link to formatted JSON data confirming registration
    address = mw.util.wikiScript("api") + "?" + $.param({
      format: "jsonfm",
      action: "query",
      list: "users",
      usprop: "registration",
      ususers: userData.name,
    });

    // Inject CSS styling after assembly and prior to appending
    mw.util.addCSS(
      "#" + this.Selectors.ID_UAA_LINK + "{" +
        "color: inherit !important;" +
      "}"
    );

    // Handle fact that UCP masthead is lazy-loaded
    if (this.isUCP) {
      interval = window.setInterval($helper.notify, this.Utility.INTERVAL_RATE);
    } else {
      $helper.notify();
    }

    /**
     * @description The helper <code>$.Deferred</code> instance helpfully titled
     * <code>$helper</code> is notified once the userpage masthead has been
     * successfully loaded. It is tasked with appending the custom UAA user tag
     * to the specified, version-dependent location. For legacy wikis, the
     * masthead is available immediately after DOM load; however, as UCP wikis
     * lazy-load the masthead, a <code>setInterval</code> invocation is used to
     * wait until the masthead exists before notifying <code>$helper</code>.
     */
    $helper.progress(function () {
      if (!$("." + this.elements.wrapper).length) {
        return;
      } else if (interval) {
        window.clearInterval(interval);
      }

      // Build and log user tag
      tag = this.assembleUserTag(tagText, formattedDate, address);
      if (this.Utility.DEBUG) {
        console.log(tag);
      }

      // Add tag to tags group
      $("." + this.elements.tags).append(tag);
    }.bind(this));
  };

  /**
   * @description As its name implies, the <code>init</code> method is used
   * primarily to initialize the UserAccountAge script, defining and setting
   * custom <code>namespace</code> object properties used throughout the various
   * methods as needed before querying the API for username registration data
   * via <code>namespace.getRegistrationData</code> and passing its data on to
   * <code>namespace.main</code>. As of the fifth of July update, the author is
   * particularly dissatisfied with the <code>elements</code> object and the
   * means by which legacy/UCP selectors are chosen. There will likely be
   * subsequent revisions to this approach that are more elegant and refined in
   * future.
   *
   * @returns {void}
   */
  namespace.init = function () {

    // Assemble custom namespace object properties
    this.isUCP = window.parseFloat(mw.config.get("wgVersion")) > 1.19;
    this.elements = {
      wrapper: this.Selectors[(this.isUCP)
        ? "CLASS_UCP_MASTHEAD_WRAPPER"
        : "CLASS_LEGACY_MASTHEAD_WRAPPER"
      ],
      header: this.Selectors[(this.isUCP)
        ? "CLASS_UCP_MASTHEAD_HEADER"
        : "CLASS_LEGACY_MASTHEAD_HEADER"
      ],
      tags: this.Selectors[(this.isUCP)
        ? "CLASS_UCP_MASTHEAD_TAGS"
        : "CLASS_LEGACY_MASTHEAD_TAGS"
      ],
      tag: this.Selectors[(this.isUCP)
        ? "CLASS_UCP_MASTHEAD_TAG"
        : "CLASS_LEGACY_MASTHEAD_TAG"
      ]
    };

    // Exit if masthead not present
    if (!$("." + this.elements.wrapper).length) {
      return;
    }

    // Log script layout for debugging
    if (this.Utility.DEBUG) {
      console.dir(this);
    }

    // Grab specific user's registration data and proceed to main
    this.getRegistrationData($("." + this.elements.header).text())
      .then(this.main.bind(this))
      .fail(window.console.error);
  };

  // Load single RL module dependency prior to start
  mw.loader.using(namespace.Utility.MODULES)
    .then(namespace.init.bind(namespace))
    .fail(window.console.error.bind(window.console));

}((this.dev = this.dev || {}).uaa = this.dev.uaa || {}, {}, this, this.jQuery,
  this.mediaWiki));