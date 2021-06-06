/**
 * PageCreator/code.js
 * @file Displays information related to page's creator
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.util"
 * @external "I18n-js"
 */

/**
 * <pre>
 * <em>Table of contents</em>        <em>Summary</em>
 * - Pseudo-enums                    Storage for PageCreator utility consts
 * - Utility methods                 Helper methods for validation, etc.
 * - Assembly methods                Builder functions assembling on-page HTML
 * - Main method                     Main functionality/app logic method
 * - Setup methods                   Initialization methods for loading, setup
 * </pre>
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true,
   bitwise: false */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isPageCreatorLoaded) {
    return;
  }
  module.isLoaded = true;

  /****************************************************************************/
  /*                              Pseudo-enums                                */
  /****************************************************************************/

  // Namespace protected properties
  Object.defineProperties(this, {

    /**
     * @description This pseudo-enum used to initialize the script stores data
     * related to the external dependencies and core modules required by the
     * script. It consists of two properties. The former, a constant
     * <code>object</code> called "ARTICLES," originally contained key/value
     * pairs wherein the key was the specific name of the <code>mw.hook</code>
     * and the value was the script's location for use by
     * <code>importArticles.articles</code>. However, this system was eventually
     * replaced in favor of an array of <code>object</code>s containing
     * properties for hook, <code>window.dev</code> alias, and script for more
     * efficient, readable loading of dependencies. The latter array, a constant
     * array named <code>MODULES</code>, contains a listing of the core modules
     * required for use by <code>mw.loader.using</code>.
     * <br />
     * <br />
     * The key for the <code>ARTICLES</code> array entries is as follows:
     * <pre>
     * - DEV/WINDOW: The name and location of the <code>window</code> property
     * - HOOK: The name of the <code>mw.hook</code> event
     * - ARTICLE: The location of the script or stylesheet on the Dev wiki
     * - TYPE: Either "script" for JS scripts or "style" for CSS stylesheets
     * </pre>
     *
     * @readonly
     * @enum {object}
     */
    Dependencies: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        ARTICLES: Object.freeze([
          Object.freeze({
            DEV: "i18n",
            HOOK: "dev.i18n",
            ARTICLE: "u:dev:MediaWiki:I18n-js/code.js",
            TYPE: "script"
          }),
          Object.freeze({
            DEV: null,
            HOOK: null,
            ARTICLE: "u:dev:MediaWiki:PageCreator.css",
            TYPE: "style"
          }),
        ]),
        MODULES: Object.freeze([
          "mediawiki.util",
        ]),
      }),
    },

    /**
     * @description This pseudo-enum of the <code>this</code> namespace object
     * is used to store all CSS selectors in a single place in the event that
     * one or more need to be changed. The formatting of the object literal key
     * naming is type (id or class), location (placement, modal, content,
     * preview), and either the name for ids or the type of element (div, span,
     * etc.). This system was adopted, like many aspects of this script, from
     * the author's MassEdit script.
     *
     * @readonly
     * @enum {string}
     */
    Selectors: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        ID_LASTEDITED_WRAPPER: "lastEdited",
        ID_PAGECREATOR_WRAPPER: "page-creator", // Legacy, bleh
        ID_PAGECREATOR_USERPAGE: "pageCreator-userpage",
        ID_PAGECREATOR_TALKPAGE: "pageCreator-talkpage",
        ID_PAGECREATOR_CONTRIBUTIONS: "pageCreator-contribs",
        ID_PAGECREATOR_TIMESTAMP: "pageCreator-timestamp",

        CLASS_PAGEHEADER_WRAPPER: "page-header",
        CLASS_PAGECREATOR_WRAPPER: "pageCreator",
        CLASS_PAGECREATOR_IMAGE: "pageCreator-image",
        CLASS_PAGECREATOR_LINK: "pageCreator-link",
        CLASS_MW_USERTOOLLINKS: "mw-usertoollinks",
        CLASS_PAGEHEADER_TITLE: "page-header__title",
        CLASS_USERPAGE_BUTTON: "UserProfileActionButton",
      }),
    },

    /**
     * @description This pseudo-enum is used to store the <code>string</code>
     * names of the various <code>WikipediaGlobal</code> (wg) variables required
     * for use in the script. These are fetched within the body of the
     * <code>this.preload</code> function via a <code>mw.config.get</code>
     * invocation and stored in a namespace property named <code>globals</code>
     * for subsequent usage. This approach replaces the deprecated approach
     * previously used in the script of assuming the relevant wg variables exist
     * as properties of the <code>window</code> object, an assumption that is
     * discouraged in more recent versions of MediaWiki.
     *
     * @readonly
     * @enum {string}
     */
    Globals: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze([
        "wgAction",
        "wgArticleId",
        "wgArticlePath",
        "wgFormattedNamespaces",
        "wgLoadScript",
        "wgNamespaceNumber",
        "wgPageName",
        "wgVersion",
      ]),
    },

    /**
     * @description This pseudo-enum is used to store information related to the
     * various custom config options available for use and their associated
     * default values. Originally, custom config was specified by individual
     * fields that were attached to the <code>window</code> object as properties
     * in their own right. However, this system was eventually replaced by the
     * bundling of all config options into a single <code>window</code> property
     * called <code>pageCreatorConfig</code>. To ensure that both the updated
     * and legacy config formats are respected and supported, each option housed
     * in this pseudo-enum has both its <code>pageCreatorConfig</code> property
     * name and legacy <code>window</code> property name so that the validator
     * function <code>this.generateValidConfig</code> can check both formats for
     * user config before assigning the default value if no config is found for
     * that particular field.
     *
     * @readonly
     * @enum {object}
     */
    Config: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze([
        Object.freeze({
          PROPERTY_NAME: "namespaces",
          LEGACY_NAME: "pageCreatorNamespaces",
          DEFAULT_VALUE: Object.freeze([0, 4, 8, 10, 14]),
        }),
        Object.freeze({
          PROPERTY_NAME: "useAvatar",
          LEGACY_NAME: "pageCreatorAvatar",
          DEFAULT_VALUE: true,
        }),
        Object.freeze({
          PROPERTY_NAME: "useTimestamp",
          LEGACY_NAME: "pageCreatorTimestamp",
          DEFAULT_VALUE: true,
        }),
        Object.freeze({
          PROPERTY_NAME: "useUTC",
          LEGACY_NAME: "pageCreatorUTC",
          DEFAULT_VALUE: true,
        }),
        Object.freeze({
          PROPERTY_NAME: "useTimeago",
          LEGACY_NAME: null,
          DEFAULT_VALUE: false,
        }),
        Object.freeze({
          PROPERTY_NAME: "avatarsize",
          LEGACY_NAME: null,
          DEFAULT_VALUE: 15,
        }),
      ]),
    },

    /**
     * @description This catchall pseudo-enum of the <code>this</code> namespace
     * object is used to house assorted values of various data types that don't
     * fit well into other pseudo-enums. It contains the I18n-js language cache
     * version <code>number</code>, a <code>string</code> constant denoting the
     * name of the script, another <code>string</code> for the name of the
     * <code>mw.hook</code> event, and a <code>boolean</code> flag setting the
     * default value for debug mode.
     *
     * @readonly
     * @enum {string|boolean|number}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SCRIPT: "PageCreator",
        HOOK_NAME: "PageCreator.render",
        DEBUG: false,
        CACHE_VERSION: 1,
      }),
    },
  });

  /****************************************************************************/
  /*                           Utility methods                                */
  /****************************************************************************/

  /**
   * @description As the name implies, this helper function capitalizes the
   * first character of the input string and returns the altered, adjusted
   * string. it is generally used in the dynamic construction of i18n messages
   * in various assembly methods.
   *
   * @param {string} paramTarget - <code>string</code> to be capitalized
   * @returns {string} - Capitalized <code>string</code>
   */
  this.capitalize = function (paramTarget) {
    return paramTarget.charAt(0).toUpperCase() + paramTarget.slice(1);
  };

  /**
   * @description This helper method is used to check whether the target object
   * is one of several types of <code>object</code>. It is most often used to
   * determine if the target is an <code>array</code> or a straight-up
   * <code>object</code>.
   *
   * @param {string} paramType - Either "Object" or "Array"
   * @param {string} paramTarget - Target to check
   * @returns {boolean} - Flag denoting the nature of the target
   */
  this.isThisAn = function (paramType, paramTarget) {
    return Object.prototype.toString.call(paramTarget) === "[object " +
      this.capitalize.call(this, paramType.toLowerCase()) + "]";
  };

  /**
   * @description This method is used to query the API for information
   * pertaining to the initial revision of the page being viewed. In the event
   * that the user wants to display the full range of information pertaining to
   * the page creator, timestamp data is returned alongwith the userid value
   * used to fetch and display the page creator's avatar in the appropriate
   * <code>this.buildAvatar</code> method.
   *
   * @returns {object} - <code>$.Deferred</code> instance
   */
  this.getRevisions = function () {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "query",
        prop: "revisions",
        titles: this.globals.wgPageName,
        rvprop: "ids|timestamp|user|userid",
        rvlimit: "1",
        rvdir: "newer",
        format: "json"
      }
    });
  };

  /**
   * @description This helper function is used to automatically generate an
   * appropriate contrived ResourceLoader module name for use in loading scripts
   * via <code>mw.loader.implement</code> on UCP wikis. The use of this function
   * replaces the previous approach that saw the inclusion of hardcoded module
   * names as properties of the relevant dependency <code>object</code>s stored
   * in <code>this.Dependencies.ARTICLES</code>. When passed an argument
   * formatted as <code>u:dev:MediaWiki:Test/code.js</code>, the function will
   * extract the subdomain name ("dev") and join it to the name of the script
   * ("Test") with the article type ("script") as <code>script.dev.Test</code>.
   *
   * @param {string} paramType - Either "script" or "style"
   * @param {string} paramPage - Article formatted as "u:dev:MediaWiki:Test.js"
   * @returns {string} - ResourceLoader module name formatted "script.dev.Test"
   */
  this.generateModuleName = function (paramType, paramPage) {
    return $.merge([paramType], paramPage.split(/[\/.]+/)[0].split(":").filter(
      function (paramItem) {
        return !paramItem.match(/^u$|^mediawiki$/gi);
      }
    )).join(".");
  };

  /**
   * @description This helper method is used to assemble a wellformed user
   * config <code>object</code> containing properties related to the display of
   * certain functionality. The method validates any inputted user config
   * conformant to either the modern or legacy formats and applies the default
   * value specified in the <code>this.Config</code> pseudo-enum if no
   * appropriate values are found.
   * <br />
   * <br />
   * Modern config objects are formatted as follows:
   * <br />
   * <pre>
   * window.pageCreatorConfig = {
   *   namespaces: [0, 4, 8, 10, 14],
   *   useAvatar: false,
   *   useTimestamp: false,
   *   useUTC: false,
   *   useTimeago: false
   * };
   * </pre>
   * <br />
   * <br />
   * Legacy config is formatted as follows:
   * <br />
   * <pre>
   * window.pageCreatorNamespaces = [0, 4, 8, 10, 14];
   * window.pageCreatorAvatar = false;
   * window.pageCreatorTimestamp = false;
   * window.pageCreatorUTC = false;
   * </pre>
   *
   * @returns {object} results - A wellformed user config <code>object</code>
   */
  this.generateValidConfig = function () {

    // Declarations
    var i, n, results, defaults, userConfig, options, input;

    // Definitions
    results = {};
    defaults = this.Config;
    userConfig = window.pageCreatorConfig || {};

    if (this.Utility.DEBUG) {
      window.console.log("window.pageCreatorConfig:", userConfig);
    }

    for (i = 0, n = defaults.length; i < n; i++) {
      options = defaults[i];

      // Check for both modern config and legacy window property approach
      input = (userConfig[options.PROPERTY_NAME] != null)
        ? userConfig[options.PROPERTY_NAME]
        : window[options.LEGACY_NAME];

      if (this.Utility.DEBUG) {
        window.console.log(
          options.PROPERTY_NAME,
          userConfig[options.PROPERTY_NAME],
          window[options.LEGACY_NAME],
          input
        );
      }

      // Handle namespaces rulebreaker/check for type equivalence, apply default
      results[options.PROPERTY_NAME] =
        (options.PROPERTY_NAME === "namespaces" && input === "all")
          ? Object.keys(this.globals.wgFormattedNamespaces).map(Number)
          : (typeof input === typeof options.DEFAULT_VALUE)
            ? input
            : options.DEFAULT_VALUE;
    }

    if (this.Utility.DEBUG) {
      window.console.log("results:", results);
    }

    return results;
  };

  /****************************************************************************/
  /*                          Assembly methods                                */
  /****************************************************************************/

  /**
   * @description This function is a simple recursive <code>string</code> HTML
   * generator that makes use of <code>mw.html</code>'s assembly methods to
   * construct wellformed HTML strings from a set of nested input arrays. This
   * allows for a more readable means of producing proper HTML than the default
   * <code>jQuery</code> approach or the hardcoded HTML <code>string</code>
   * approach employed in earlier iterations of this script. Through the use of
   * nested arrays, this function permits the laying out of parent/child DOM
   * nodes in array form in a fashion similar to actual HTML, enhancing both
   * readability and usability.
   * <br />
   * <br />
   * Furthermore, as the <code>assembleElement</code> function returns a
   * <code>string</code>, nested invocations of the method within parameter
   * arrays is permitted, as evidenced in certain, more specialized assembly
   * methods elsewhere in the script.
   * <br />
   * <br />
   * An example of wellformed input is shown below:
   * <br />
   * <pre>
   * this.assembleElement(
   *   ["div", {id: "foo-id", class: "foo-class"},
   *     ["button", {id: "bar-id", class: "bar-class"},
   *       "Button text",
   *     ],
   *     ["li", {class: "overflow"},
   *       ["a", {href: "#"},
   *         "Link text",
   *       ],
   *     ],
   *   ],
   * );
   * </pre>
   *
   * @param {Array<string>} paramArray - Wellformed array representing DOM nodes
   * @returns {string} - Assembled <code>string</code> HTML
   */
  this.assembleElement = function (paramArray) {

    // Declarations
    var type, attributes, counter, content;

    // Make sure input argument is a well-formatted array
    if (!this.isThisAn("Array", paramArray)) {
      return this.assembleElement.call(this,
        Array.prototype.slice.call(arguments));
    }

    // Definitions
    counter = 0;
    content = "";
    type = paramArray[counter++];

    // mw.html.element requires an object for the second param
    attributes = (this.isThisAn("Object", paramArray[counter]))
      ? paramArray[counter++]
      : {};

    while (counter < paramArray.length) {

      // Check if recursive assembly is required for another inner DOM element
      content += (this.isThisAn("Array", paramArray[counter]))
        ? this.assembleElement(paramArray[counter++])
        : paramArray[counter++];
    }

    return mw.html.element(type, attributes, new mw.html.Raw(content));
  };

  /**
   * @description This builder function is used to assemble the optional infobar
   * module related to the display of the page creator's avatar, one of the
   * various bits of optional functionality available to users via the script's
   * custom options config. This method makes use of a somewhat-antiquated "pure
   * HTML" approach to handle cases of nonexistent/corrupted avatar URLs and/or
   * failed query requests. The address linking to the page creator's avatar is
   * contained in a <code>object</code> tag; if this image is not found, the
   * inner contained <code>img</code> tag displays the default
   * <code>Avatar.jpg</code> image shown for anons and users who have not set an
   * avatar. An alternative, JS approach that might be implemented in future
   * would involve using jQuery or the vanilla <code>onerror</code>
   * <code>img</code> attribute to load the default avatar if an error is
   * encountered in the display of the actual avatar.
   *
   * @param {string} paramUserId - The page creator's userid (data.userid)
   * @returns {string} - Assembled modular <code>string</code> HTML
   */
  this.buildAvatar = function (paramUserId) {
    return this.assembleElement(
      ["object", {
        class: this.Selectors.CLASS_PAGECREATOR_IMAGE,
        data: "https://services.fandom.com/user-avatar/user/" + paramUserId +
          "/avatar",
        type: "image/png",
        width: this.config.avatarsize,
        height: this.config.avatarsize,
      },
        ["img", {
          class: this.Selectors.CLASS_PAGECREATOR_IMAGE,
          src: "https://vignette.wikia.nocookie.net/messaging/" +
            "images/1/19/Avatar.jpg/revision/latest",
          width: this.config.avatarsize,
          height: this.config.avatarsize,
        }]
      ]
    );
  };

  /**
   * @description This builder function is responsible for assembling the
   * optional-but-not-actually-optional <code>mw-usertoollinks</code>
   * parenthetical section containing links to the page creator's talk page and
   * associated contributions page. This section, though treated like one of the
   * optional infobar modules like avatar and timestamp, will always be added to
   * the infobar framework; if not built by <code>this.main</code> for some
   * reason, the builder method will be invoked by
   * <code>this.buildFramework</code> as a precaution to ensure that these links
   * are always displayed.
   *
   * @param {string} paramUser - The page creator's <code>string</code> username
   * @returns {string} - Assembled modular <code>string</code> HTML
   */
  this.buildUserToolLinks = function (paramUser) {
    return this.assembleElement(
      ["span", {class: this.Selectors.CLASS_MW_USERTOOLLINKS},
        "(",
        ["a", {
          id: this.Selectors.ID_PAGECREATOR_TALKPAGE,
          class: this.Selectors.CLASS_PAGECREATOR_LINK,
          href: mw.util.getUrl(this.globals.wgFormattedNamespaces[3] + ":" +
            paramUser),
          title: this.i18n.msg("talk").plain()
        },
          this.i18n.msg("talk").plain(),
        ],
        "&nbsp;|&nbsp;",
        ["a", {
          id: this.Selectors.ID_PAGECREATOR_CONTRIBUTIONS,
          class: this.Selectors.CLASS_PAGECREATOR_LINK,
          href: mw.util.getUrl("Special:Contributions/" + paramUser),
          title: this.i18n.msg("contribs").plain()
        },
          this.i18n.msg("contribs").plain(),
        ],
        ")",
      ]
    );
  };

  /**
   * @description This builder function handles the assembly of the optional
   * timestamp link, a module of the infobar framework that displays either a
   * <code>$.timeago</code>-generated estimation of the time since the page's
   * initial revision or the exact time and date of creation depending on the
   * user's preference. On UCP wikis, the exact time/date combo is always
   * displayed, as <code>$.timeago</code> always returns <code>undefined</code>
   * when invoked with a well-formed timestamp. Regardless of which version is
   * displayed, the timestamp will also serve as a link to the initial revision
   * of the page.
   *
   * @param {string} paramDate - Formatted timestamp for display
   * @param {string} paramRevision - Initial revision id/url
   * @returns {string} - Assembled modular <code>string</code> HTML
   */
  this.buildTimestamp = function (paramDate, paramRevision) {

    // Declarations
    var shouldUseTimeago, linkText, revisionLink;

    // $.timeago will not work as intended on UCP wikis
    shouldUseTimeago = (this.config.useTimeago && !this.info.isUCP);

    if (this.Utility.DEBUG) {
      window.console.log("shouldUseTimeago:", shouldUseTimeago);
    }

    // Definitions
    linkText = (shouldUseTimeago) ? $.timeago(paramDate) : paramDate;
    revisionLink = this.assembleElement(
      ["a", {
        id: this.Selectors.ID_PAGECREATOR_TIMESTAMP,
        class: this.Selectors.CLASS_PAGECREATOR_LINK,
        href: this.globals.wgArticlePath.replace(/\$1/g, paramRevision),
        title: linkText,
      },
        linkText
      ]
    );

    if (this.Utility.DEBUG) {
      window.console.log("linkText:", linkText);
    }

    // Non-timeago estimations are prefixed with "on"
    return (shouldUseTimeago)
      ? revisionLink
      : this.i18n.msg("on").escape().replace(/\$2/g, revisionLink);
  };

  /**
   * @description As the name implies, this builder function is used to build
   * the basic framework of the PageCreator infobar thingie to which are added
   * as modules various optional pieces like the avatar and timestamp depending
   * on the preferences of the user. It follows the same basic layout as its
   * older cousin, LastEdited, though it manifests a few basic formatting
   * differences. The only module it will always build is the default
   * <code>mw-usertoollinks</code> parenthetical section containing links to the
   * page creator's talk page and associated contributions page; if this module
   * is somehow not built by <code>this.main</code>, the framework builder will
   * construct it and add it regardless.
   *
   * @param {string} paramUser - Username of the page creator
   * @param {object} paramArgs - <code>object</code> containing modules
   * @returns {string} - Formatted <code>string</code> HTML for appending, etc.
   */
  this.buildFramework = function (paramUser, paramArgs) {
    return this.assembleElement(
      ["div", {
        id: this.Selectors.ID_PAGECREATOR_WRAPPER,
        class: this.Selectors.CLASS_PAGECREATOR_WRAPPER,
      },
        this.i18n.msg("main").escape().replace(/\$1/g,
          ((paramArgs.hasOwnProperty("avatar"))
            ? paramArgs.avatar + "&nbsp;"
            : "") +
          this.assembleElement(
            ["a", {
              id: this.Selectors.ID_PAGECREATOR_USERPAGE,
              class: this.Selectors.CLASS_PAGECREATOR_LINK,
              href: mw.util.getUrl(this.globals.wgFormattedNamespaces[2] +
                ":" + paramUser),
              title: paramUser,
            },
              paramUser
            ]
          )
        ),
        "&nbsp;",
        (paramArgs.links || this.buildUserToolLinks(paramUser)),
        ((paramArgs.hasOwnProperty("timestamp"))
          ? "&nbsp;" + paramArgs.timestamp
          : "")
      ]
    );
  };

  /****************************************************************************/
  /*                               Main method                                */
  /****************************************************************************/

  /**
   * @description The main method is invoked as the associated callback handler
   * that is called once <code>this.getRevisions</code> successfully resolves
   * with data pertaining to the earliest revision of the viewed page and its
   * initial author, the page creator. Using this data passed as an argument,
   * the <code>this.main</code> function coordinates the validation of this
   * data and the construction of the page header infobar to display the desired
   * information indicated by the user's <code>window</code> config object. The
   * method is responsible for formatting the timestamp (if desired), building
   * the optional avatar, and appending the completed result to the page header
   * atop LastEdited (if loaded).
   *
   * @param {object} paramData - Returned from <code>this.getRevisions</code>
   * @returns {void}
   */
  this.main = function (paramData) {

    // Declarations
    var data, revisionURL, infobar, time, formattedDate, args;

    // Definitions
    args = {};
    data = paramData.query.pages[this.globals.wgArticleId].revisions[0];

    // Link to first revision page
    revisionURL = this.globals.wgPageName + "?" + $.param({
      oldid: data.revid,
    });

    if (this.Utility.DEBUG) {
      window.console.log(revisionURL);
    }

    // Build parenthetical links section
    args.links = this.buildUserToolLinks(data.user);

    // Avatar is optional, now displayed by default to match LastEdited
    if (this.config.useAvatar) {
      args.avatar = this.buildAvatar(data.userid);
    }

    // Optional timestamp includes link to first revision
    if (this.config.useTimestamp) {

      // Timestamp in either local or UTC time
      time = new Date(data.timestamp)[
        (this.config.useUTC) ? "toUTCString" : "toString"
      ]();

      // Formatted creation date
      formattedDate = (this.config.useUTC)
        ? time.slice(0, 3) + ", " + time.slice(4, 16) + ", " +
          time.slice(17, 25) + " (" + time.slice(26) + ")"
        : time.slice(0, 3) + ", " + time.slice(4, 15) + ", " +
          time.slice(16, 24) + " " + time.slice(34);

      if (this.Utility.DEBUG) {
        window.console.log(time, formattedDate);
      }

      // this.buildTimestamp handles use of $.timeago, not this.main
      args.timestamp = this.buildTimestamp(formattedDate, revisionURL);
    }

    // Depending on user's preferences, args may be of length 1
    infobar = this.buildFramework(data.user, args);

    // PageCreator should always precede LastEdited if that script is loaded
    if ($("#" + this.Selectors.ID_LASTEDITED_WRAPPER).length) {
      $(infobar).insertBefore("#" + this.Selectors.ID_LASTEDITED_WRAPPER);
    } else {
      $(infobar).insertAfter(
        "." + this.Selectors.CLASS_PAGEHEADER_WRAPPER + " " +
        "." + this.Selectors.CLASS_PAGEHEADER_TITLE + ", " +
        "." + this.Selectors.CLASS_USERPAGE_BUTTON
      );
    }

    // Fire render hook once added - legacy
    mw.hook(this.Utility.HOOK_NAME).fire(
      $("#" + this.Selectors.ID_PAGECREATOR_WRAPPER));
  };

  /****************************************************************************/
  /*                             Setup methods                                */
  /****************************************************************************/

  /**
   * @description The <code>this.init</code> initialization method is called
   * once all external dependencies and ResourceLoader modules have been loaded.
   * The method is responsible for validating the user's config (if applicable),
   * setting the i18n language for the script, and defining a new protected
   * <code>module</code> property <code>exports</code> containing exposed public
   * methods for post-load invocation. At present, the only method publicly
   * accessible is <code>observeScript</code>, which allows the user to view the
   * layout of the script and the namespace object's various properties via a
   * <code>console.dir</code> invocation. The method returns after firing the
   * PageCreator <code>mw.hook</code> event, querying the API for information
   * pertaining to the page's earliest revision, and attaching
   * <code>this.main</code> as a listener callback.
   *
   * @param {undefined|function} paramRequire - Either function or undefined
   * @param {object} paramLang - I18n-js data content
   * @returns {void}
   */
  this.init = function (paramRequire, paramLang) {

    // Validate user-input config elements
    this.config = Object.freeze(this.generateValidConfig());

    if (
      this.globals.wgNamespaceNumber === -1 ||
      this.globals.wgArticleId === 0 ||
      this.globals.wgAction === "edit" ||
      $("#" + this.Selectors.ID_PAGECREATOR_WRAPPER).length ||
      $.inArray(this.globals.wgNamespaceNumber, this.config.namespaces) === -1
    ) {
      return;
    }

    // Add i18n data as local property
    (this.i18n = paramLang).useContentLang();

    // Expose public methods for external debugging
    Object.defineProperty(module, "exports", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        observeScript: window.console.dir.bind(this, this),
      })
    });

    // Get data related to initial revision and its author
    this.getRevisions()
      .then(this.main.bind(this))
      .fail(window.console.error.bind(null, this.Utility.SCRIPT));
  };

  /**
   * @description Originally a pair of functions called <code>init.load</code>
   * and <code>init.preload</code>, this function is used to load all required
   * external dependencies from Dev and attach <code>mw.hook</code> listeners.
   * Once all scripts have been loaded and their events fired, the I18n-js
   * method <code>loadMessages</code> is invoked, the <code>$.Deferred</code>
   * promise resolved, and the resultant i18n data passed for subsequent usage
   * in <code>init.main</code>.
   * <br />
   * <br />
   * As an improvement to the previous manner of loading scripts, this function
   * first checks to see if the relevant <code>window.dev</code> property of
   * each script already exists, thus signaling that the script has already been
   * loaded elsewhere. In such cases, this function will skip that import and
   * move on to the next rather than blindly reimport the script again as it
   * did in the previous version.
   * <br />
   * <br />
   * As of the 1st of July update, an extendable framework for the loading of
   * ResourceLoader modules and Dev external dependencies (scripts and
   * stylesheets alike) on both UCP wikis and legacy 1.19 wikis has been put
   * into place, pending UCPification of the aforementioned Dev scripts or the
   * importation of legacy features to the UCP codebase. To handle the lack of
   * async callbacks in <code>mw.loader.load</code>, this framework invokes
   * <code>mw.loader.implement</code> to create temporary, local RL modules that
   * can then be asynchronously loaded via <code>mw.loader.using</code> and
   * handled by a dedicated callback.
   *
   * @param {object} paramDeferred - <code>$.Deferred</code> instance
   * @returns {void}
   */
  this.load = function (paramDeferred) {

    // Declarations
    var articles, counter, numArticles, $loadNext, current, isLoaded, article,
      server, params, resource, moduleName;

    // Definitions
    counter = 0;
    articles = this.Dependencies.ARTICLES;
    numArticles = articles.length;
    $loadNext = new $.Deferred();

    /**
     * @description The passed <code>$.Deferred</code> argument instance called
     * <code>paramDeferred</code> is variously notified during the loading of
     * dependencies by the <code>$loadNext</code> promise whenever a dependency
     * has been successfully imported by <code>window.importArticles</code> or
     * <code>mw.loader.using</code>. The <code>progress</code> handler checks if
     * all dependencies have been successfully loaded for use before loading the
     * latest version of cached <code>i18n</code> messages and resolving itself
     * to pass program execution on to <code>init.main</code>.
     */
    paramDeferred.notify().progress(function () {
      if (counter === numArticles) {
        // Resolve helper $.Deferred instance
        $loadNext.resolve();
        if (this.Utility.DEBUG) {
          window.console.log("$loadNext", $loadNext.state());
        }

        // Load latest version of cached i18n messages
        window.dev.i18n.loadMessages(this.Utility.SCRIPT, {
          cacheVersion: this.Utility.CACHE_VERSION,
        }).then(paramDeferred.resolve).fail(paramDeferred.reject);
      } else {
        if (this.Utility.DEBUG) {
          window.console.log((counter + 1) + "/" + numArticles);
        }

        // Load next
        $loadNext.notify(counter++);
      }
    }.bind(this));

    /**
    * @description The <code>$loadNext</code> helper <code>$.Deferred</code>
    * instance is used to load each dependency using methods appropriate to the
    * version of MediaWiki detected on the wiki. While the standard
    * <code>importArticle</code> method is used for legacy 1.19 wikis, a local
    * ResourceLoader module is defined via <code>mw.loader.implement</code> and
    * loaded via <code>mw.loader.using</code> to sidestep the fact that the
    * <code>mw.loader.load</code> method traditionally used to load dependencies
    * has no callback or promise. Once all imports are loaded, the handler
    * applies a callback to any extant <code>mw.hook</code> events and notifies
    * the main <code>paramDeferred.progress</code> handler to check if all
    * dependencies have been loaded.
    */
    $loadNext.progress(function (paramCounter) {

      // Selected dependency to load next
      current = articles[paramCounter];

      // If window has property related to dependency indicating load status
      isLoaded =
        (current.DEV && window.dev.hasOwnProperty(current.DEV)) ||
        (current.WINDOW && window.hasOwnProperty(current.WINDOW));

      // Add hook if loaded; dependencies w/o hooks must always be loaded
      if (isLoaded && current.HOOK) {
        if (this.Utility.DEBUG) {
          window.console.log("isLoaded", current.ARTICLE);
        }
        return mw.hook(current.HOOK).add(paramDeferred.notify);
      }

      // Use standard importArticle approach if legacy wiki
      if (!this.info.isUCP) {
        article = window.importArticle({
          type: current.TYPE,
          article: current.ARTICLE,
        });

        if (this.Utility.DEBUG) {
          window.console.log("importArticle", article);
        }

        // Styles won't have hooks; notify status with load event if styles
        return (current.HOOK)
          ? mw.hook(current.HOOK).add(paramDeferred.notify)
          : $(article).on("load", paramDeferred.notify);
      }

      // Build url with REST params
      server = "https://dev.fandom.com";
      params = "?" + $.param({
        mode: "articles",
        only: current.TYPE + "s",
        articles: current.ARTICLE,
      });
      resource = server + this.globals.wgLoadScript + params;
      moduleName = this.generateModuleName(current.TYPE, current.ARTICLE);

      // Ensure wellformed module name
      if (this.Utility.DEBUG) {
        window.console.log(moduleName);
      }

      // Define temp local modules to sidestep mw.loader.load's lack of callback
      try {
        mw.loader.implement.apply(null, $.merge([moduleName],
          (current.TYPE === "script")
            ? [[resource]]
            : [null, {"url": {"all": [resource]}}]
        ));
      } catch (paramError) {
        if (this.Utility.DEBUG) {
          window.console.error(paramError);
        }
      }

      // Load script/stylesheet once temporary module has been defined
      mw.loader.using(moduleName)
        .then((current.HOOK)
          ? mw.hook(current.HOOK).add(paramDeferred.notify)
          : paramDeferred.notify)
        .fail(paramDeferred.reject);
    }.bind(this));
  };

  /**
   * @description This particular loading function is used simply to calculate
   * and inject some pre-load <code>init</code> object properties prior to the
   * loading of required external dependencies or ResourceLoader modules. As the
   * loading process depends on this function's set informational properies, the
   * function is called prior to the initial <code>init.load</code> invocation
   * at the start of the script's execution and returns a reference to the
   * <code>init</code> object (presumably) for use in subsequent method chaining
   * purposes.
   *
   * @returns {object} init - Reference to <code>init</code> object for chaining
   */
  this.preload = function () {

    // Fetch, define, and cache globals for use in init and MassEdit instance
    this.globals = Object.freeze(mw.config.get(this.Globals));

    // Object for informational booleans (extended in MassEdit init method)
    this.info = {
      isUCP: window.parseFloat(this.globals.wgVersion) > 1.19,
    };

    // Return reference for method chaining purposes
    return this;
  };

  // Coordinate loading of all relevant dependencies
  $.when(
    mw.loader.using((this.preload.call(this)).Dependencies.MODULES),
    new $.Deferred(this.load.bind(this)).promise())
  .then(this.init.bind(this))
  .fail(window.console.error.bind(null, this.Utility.SCRIPT));

}.call(Object.create(null), (this.dev = this.dev || {}).pageCreator =
  this.dev.pageCreator || {}, this, this.jQuery, this.mediaWiki));