/**
 * CodeQuickLinks/code.js
 * @file Adds modules containing quick links to personal and wiki code files
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.util"
 * @external "I18n-js"
 */

/**
 * <pre>
 * <em>Table of contents</em>        <em>Summary</em>
 * - Pseudo-enums                    Storage for CodeQuickLinks utility consts
 * - Utility methods                 Helper methods for validation, etc.
 * - Assembly methods                Builder functions assembling on-page HTML
 * - Main methods                    Main functionality/app logic methods
 * - Setup methods                   Initialization methods for loading, setup
 * </pre>
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (
    !window || !$ || !mw || module.isLoaded || window.isCodeQuickLinksLoaded ||
    $("body").hasClass("mainpage")
  ) {
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
            TYPE: "script",
          }),
          Object.freeze({
            DEV: null,
            HOOK: null,
            ARTICLE: "u:dev:MediaWiki:CodeQuickLinks.css",
            TYPE: "style",
          }),
        ]),
        MODULES: Object.freeze([
          "mediawiki.util",
        ]),
      }),
    },

    /**
     * @description This pseudo-enum of the <code>main</code> namespace object
     * is used to store all CSS selectors in a single place in the event that
     * one or more need to be changed. The formatting of the object literal key
     * naming is type (id or class), location (placement, modal, content,
     * preview), and either the name for ids or the type of element (div, span,
     * etc.). This system was adopted, like many aspects of this script, from
     * the author's MassEdit script.
     *
     * @readonly
     * @enum {object}
     */
    Selectors: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({

        // ID selectors
        ID_MODULE_WRAPPER: "cql-module",
        ID_LISTING_USERFILES: "cql-listing-user",
        ID_LISTING_SITEFILES: "cql-listing-site",

        // Ad slot <div> containers
        ID_AD_BOXAD: "top_boxad",
        ID_AD_BOXAD_WRAPPER: "top-boxad-wrapper",
        ID_AD_BOXAD_RIGHT: "top-right-boxad-wrapper",
        ID_AD_TABOOLA: "NATIVE_TABOOLA_RAIL",

        // General purpose id/class selectors
        ID_WIKIA_RAIL: "WikiaRail",
        CLASS_RAIL_MODULE: "rail-module",
        CLASS_HAS_ICON: "has-icon",
        CLASS_WDS_ICON: "wds-icon",
        CLASS_WDS_ICON_SMALL: "wds-icon-small",

        // Module selectors
        CLASS_MODULE_HEADER: "cql-module-header",
        CLASS_MODULE_CONTENT: "cql-module-content",

        // Column selectors
        CLASS_LISTING_CONTAINER: "cql-listing",
        CLASS_LISTING_HEADER: "cql-listing-header",
        CLASS_LISTING_CONTENT: "cql-listing-content",
        CLASS_LISTING_LIST: "cql-listing-list",
        CLASS_LISTING_ENTRY: "cql-listing-entry",
        CLASS_LISTING_LINK: "cql-listing-link",
      }),
    },

    /**
     * @description This pseudo-enum contains <code>svg</code> and
     * <code>path</code> attributes that are applied to their relevant elements
     * during the <code>this.buildRailModule</code> module construction
     * operation. The icon is optional and its display is mediated by means of
     * the <code>showIcon</code> user config flag. The use of an icon to match
     * the updated rail module appearance was initially suggested by User:Ursuul
     * over two years prior to the feature's integration into the script, yet
     * another example of the speed and alacrity with which the author updates
     * his code.
     * <br />
     * <br />
     * <span style="font-family:Comic Sans MS; color:yellow; font-size:95px;">
     * thx urthphuul.</span>
     *
     * @see <a href="https://eizen.fandom.com/Thread:319">Thread:319</a>
     * @author Ursuul <dev.fandom.com/wiki/User_talk:Ursuul>
     * @readonly
     * @enum {object}
     */
    Icon: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SVG: Object.freeze({
          "width": "18",
          "version": "1.1",
          "viewBox": "0 0 18 17.999597",
          "xmlns": "http://www.w3.org/2000/svg"
        }),
        PATH: Object.freeze({
          "d": "m18 10.165v-2.4452l-5.5074-4.4862v2.7726l3.5842 " +
            "2.9266-3.5842 2.8881v2.8111zm-11.958 " +
            "6.8351h2.1272l3.4968-16h-2.1563zm-0.53408-2.3682v-2.8111l-" +
            "3.5842-2.8881 3.5842-2.9266v-2.7726l-5.5074 4.4862v2.4452z",
          "style": "font-feature-settings:normal;font-variant-caps:normal;" +
            "font-variant-ligatures:normal;font-variant-numeric:normal",
        }),
      }),
    },

    /**
     * @description This pseudo-enum is used to store various data related to
     * the construction of the default link objects displayed in the
     * CodeQuickLinks rail module in most cases. It contains an array-populated
     * <code>object</code>, <code>NAMES</code>, and a pair of arrays, namely
     * <code>SUFFIXES</code> and <code>DIVISIONS</code>. <code>NAMES</code>
     * holds the names of common MediaWiki/MyPage files commonly encountered on
     * most wikis, while <code>SUFFIXES</code> holds the accepted file suffixes
     * for CSS and JavaScript files. <code>DIVISIONS</code> houses the names of
     * properties that are used in <code>this.buildDefaultFiles</code> to
     * organize the assembled files object.
     *
     * @readonly
     * @enum {object}
     */
    Files: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        NAMES: Object.freeze({
          STANDARD: Object.freeze([
            "Common",
            "Fandomdesktop"
          ]),
          CUSTOM: Object.freeze([
            "Global",
            "ImportJS",
            "JSPages"
          ]),
        }),
        SUFFIXES: Object.freeze([
          ".css",
          ".js"
        ]),
        DIVISIONS: Object.freeze([
          "siteFiles",
          "userFiles",
        ])
      })
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
     * @enum {object}
     */
    Globals: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze([
        "wgFormattedNamespaces"
      ]),
    },

    /**
     * @description The <code>Config</code> pseudo-enum is used primarily by
     * <code>this.validateConfig</code> to ensure that the user's input config
     * (if applicable) is well-formed and properly defined prior to its usage
     * by the script. If the user has chosen not to include certain properties
     * in the config object, the default values established in this enum are
     * applied instead as default values. The enum contains three data
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
        REPLACE: Object.freeze({
          NAME: "replaceAllDefaultLinks",
          DEFAULT: false,
        }),
        SHOW_ICON: Object.freeze({
          NAME: "showIcon",
          DEFAULT: true,
        }),
        LINKS: Object.freeze({
          NAME: "linkSet",
          DEFAULT: {},
        }),
      }),
    },

    /**
     * @description This catchall pseudo-enum of the <code>init</code< namespace
     * object is used to house assorted values of various data types that don't
     * fit well into other pseudo-enums. It contains the I18n-js language cache
     * version <code>number</code>, a <code>string</code> constant denoting the
     * name of the script, another <code>string</code> for the name of the
     * <code>mw.hook</code> event, and a Boolean flag for debug mode.
     *
     * @readonly
     * @enum {string|boolean|number}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SCRIPT: "CodeQuickLinks",
        HOOK_NAME: "dev.cql",
        CACHE_VERSION: 1,
        DEBUG: false
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
   * @description This helper function, based on MassEdit's assorted validation
   * methods, is used to ensure that the user's inputted config has properties
   * of the proper data type, i.e. <code>boolean</code> for the
   * <code>replaceAllDefaultLinks</code> flag and <code>object</code> for
   * <code>linkSet</code>. If no property exists or if the wrong data type is
   * detected, the default value specified in <code>this.Config</code> is
   * applied instead.
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
   * @description This self-contained assembly function is used to assemble the
   * rail module from the links <code>object</code> passed as a parameter. This
   * object should possess a pair of arrays, namely <code>userFiles</code>
   * and <code>siteFiles</code>, that contain objects with properties
   * <code>name</code> and <code>href</code> representing each link to be added
   * to the module in one of the two columns. Originally, this method made use
   * of three helper functions for the construction of links, columns, and the
   * rail module itself, though these were eventually merged into a single
   * method for readability's sake. This approach, using MassEdit's recursive
   * <code>assembleElement</code> method, replaces the previous approach, which
   * saw the script fix affix the rail module to the rail before populating its
   * contents with columns and links.
   *
   * @param {object} paramLinks - <code>object</code> containing link href/names
   * @returns {string} - Assembled <code>string</code> HTML
   */
  this.buildRailModule = function (paramLinks) {
    return this.assembleElement(
      ["section", {
        "class": this.Selectors.CLASS_RAIL_MODULE,
        "id": this.Selectors.ID_MODULE_WRAPPER,
      },
        ["h2", {
          "class": this.Selectors.CLASS_MODULE_HEADER +
            ((this.config.showIcon) ? " " + this.Selectors.CLASS_HAS_ICON : ""),
        },
          ((this.config.showIcon)
            ? ["svg", $.extend({
                "class": this.Selectors.CLASS_WDS_ICON + " " +
                  this.Selectors.CLASS_WDS_ICON_SMALL
                }, this.Icon.SVG),
                ["path", $.extend({}, this.Icon.PATH)],
              ]
            : ""
          ),
          this.i18n.msg("title").plain(),
        ],
        ["div", {"class": this.Selectors.CLASS_MODULE_CONTENT,},
          Object.keys(paramLinks).map(function (paramColumn) {
            return this.assembleElement(
              ["div", {
                "class": this.Selectors.CLASS_LISTING_CONTAINER,
                "id": this.Selectors["ID_LISTING_" + paramColumn.toUpperCase()],
               },
                ["h4", {"class": this.Selectors.CLASS_LISTING_HEADER,},
                  this.i18n.msg(
                    (paramColumn === "userFiles") ? "personal" : "local"
                  ).plain()
                ],
                ["div", {"class": this.Selectors.CLASS_LISTING_CONTENT,},
                  ["ul", {"class": this.Selectors.CLASS_LISTING_LIST,},
                    paramLinks[paramColumn].map(function (paramLink) {
                      return this.assembleElement(
                        ["li", {"class": this.Selectors.CLASS_LISTING_ENTRY,},
                          ["a", {
                            "class": this.Selectors.CLASS_LISTING_LINK,
                            "href": paramLink.href,
                            "title": paramLink.name,
                          },
                            paramLink.name,
                          ],
                        ]
                      );
                    }.bind(this)).join(""),
                  ],
                ],
              ]
            );
          }.bind(this)).join(""),
        ],
      ]
    );
  };

  /****************************************************************************/
  /*                              Main methods                                */
  /****************************************************************************/

  /**
   * @description A method more or less just copied and reformatted from the
   * previous incarnation of CodeQuickLinks, this function serves as the primary
   * means by which default link <code>object</code>s possessing the properties
   * <code>name</code> and <code>href</code> are assembled from the
   * <code>string</code> names listed in <code>this.Files.NAMES</code>. The
   * method is not very efficient or optimized and will require a refactor and
   * simplification in the future once a better way is developed by the author.
   * <br />
   * <br />
   * The method takes the names specified in <code>this.Files.NAMES</code> and
   * constructs link objects that are subsequently converted to actual links for
   * display in the rail module by <code>this.buildRailModule</code>. For non-
   * rule-breaking links, personal "Special:MyPage" and MediaWiki namespace
   * versions of each link are constructed for both CSS and JS pages, while
   * rulebreakers like <code>MediaWiki:ImportJS</code> that lack personal
   * equivalents or suffixes are handled separately. All entries are sorted
   * prior to their return from the method.
   *
   * @returns {object} assembledFiles - Built from <code>this.Files.NAMES</code>
   */
  this.buildDefaultFiles = function () {

    // Declarations
    var assembledFiles, fileNames, prefix, suffixes, prefixes, divisions;

    // Definitions
    assembledFiles = {};

    // Define prefixes using wgFormattedNamespaces
    $.each(prefixes = {mw: 8, sp: -1}, function (paramName, paramId) {
      prefixes[paramName] = this.globals.wgFormattedNamespaces[paramId] + ":";
    }.bind(this));

    // Custom prefixes
    prefixes.my = prefixes.sp + "MyPage/";
    prefixes.cc = "//community.fandom.com/wiki/Special:MyPage/";

    // Aliases
    fileNames = this.Files.NAMES;
    suffixes = this.Files.SUFFIXES;
    divisions = this.Files.DIVISIONS;

    // Populate files object with container arrays
    divisions.forEach(function (paramColumn) {
      assembledFiles[paramColumn] = [];
    });

    // Assemble non-rulebreaking file names
    fileNames.STANDARD.forEach(function (paramFile) {
      divisions.forEach(function (paramColumn) {
        prefix = prefixes[(paramColumn === "siteFiles") ? "mw" : "my"];

        suffixes.forEach(function (paramSuffix) {
          assembledFiles[paramColumn].push({
            name: paramFile + paramSuffix,
            href: mw.util.getUrl(prefix + paramFile.toLowerCase() + paramSuffix)
          });
        });
      });
    }.bind(this));

    // Handle rule-breakers
    fileNames.CUSTOM.forEach(function (paramFile) {
      if (paramFile === "Global") {
        suffixes.forEach(function (paramSuffix) {
          assembledFiles.userFiles.push({
            name: paramFile + paramSuffix,
            href: prefixes.cc + paramFile.toLowerCase() + paramSuffix
          });
        }.bind(this));
      } else {
        prefix = prefixes[(paramFile === "ImportJS") ? "mw" : "sp"];

        assembledFiles.siteFiles.push({
          name: paramFile,
          href: mw.util.getUrl(prefix + paramFile)
        });
      }
    }.bind(this));

    // Sort entries alphabetically
    $.each(assembledFiles, function (paramColumn, paramFiles) {
      paramFiles.sort(function (paramA, paramB) {
        return paramA.name.localeCompare(paramB.name);
      });
    });

    return assembledFiles;
  };

  /**
   * @description The <code>main</code> method is called by
   * <code>this.init</code> once the initialization process is complete and the
   * <code>mw.hook</code> event triggered. The main method is used to assemble
   * all the link objects denoting list elements existing in the rail module's
   * columns, using the user's input if it exists. Once the link config objects
   * have been assembled, the method assembles a rail module via
   * <code>this.buildRailModule</code> and prepends it to the top of the Wikia
   * rail.
   *
   * @returns {void}
   */
  this.main = function () {

    // Declarations
    var userLinks, assembledFiles, railModule, $adSlot;

    // Definitions/aliases
    userLinks = this.config.linkSet;

    if (this.config.replaceAllDefaultLinks && userLinks) {
      assembledFiles = userLinks;
    } else {
      // Assemble default page names
      assembledFiles = this.buildDefaultFiles();

      if (Object.keys(userLinks).length) {
        $.each(userLinks, function (paramColumn, paramLinks) {
          $.merge(assembledFiles[paramColumn], paramLinks);
        });
      }
    }

    // Place module after last extant ad slot
    $adSlot = $([
      "ID_AD_BOXAD",
      "ID_AD_BOXAD_WRAPPER",
      "ID_AD_BOXAD_RIGHT",
      "ID_AD_TABOOLA",
    ].map(function (paramAdSelector) {
      return "#" + this.Selectors[paramAdSelector];
    }.bind(this)).join(", ")).last();

    // Assemble string HTML module
    railModule = this.buildRailModule(assembledFiles);

    // Prepend to rail only if ad slot is not found
    if ($adSlot.length) {
      $adSlot.after(railModule);
    } else {
      $("#" + this.Selectors.ID_WIKIA_RAIL).prepend(railModule);
    }
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
   * CodeQuickLinks <code>mw.hook</code> event and attaching
   * <code>this.main</code> as a listener callback.
   *
   * @param {undefined|function} paramRequire - Either function or undefined
   * @param {object} paramLang - I18n-js data content
   * @returns {void}
   */
  this.init = function (paramRequire, paramLang) {

    // Validate user-input config elements
    this.config = this.validateConfig(window.customCodeQuickLinks || {});

    // Add i18n data as local property
    (this.i18n = paramLang).useContentLang();

    // Fetch, define, and cache globals
    this.globals = Object.freeze(mw.config.get(this.Globals));

    // Expose public methods for external debugging
    Object.defineProperty(module, "exports", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        observeScript: window.console.dir.bind(this, this),
      })
    });

    // Dispatch hook with window.dev.cql once initialization is complete
    mw.hook(this.Utility.HOOK_NAME).fire(module).add(this.main.bind(this));
  };

  /**
   * @description Over its lifetime, the <code>load</code> function has
   * undergone a number of changes and evolutions to account for the transition
   * from Wikia's fork of MediaWiki 1.19 to the current MediaWiki 1.33 UCP
   * platform. During the transition period in which <code>importArticles</code>
   * only worked for legacy wikis, the function made use of a fallback approach
   * that created new ResourceLoader modules from external dependencies,
   * permitting an alternate means of loading required resources. However, with
   * the reinstitution of <code>importArticles</code> functionality to the UCP,
   * this approach was scrapped and a simpler implementation employed instead to
   * load Dev resources via several <code>importArticles</code> calls.
   *
   * @param {object} paramDeferred - <code>$.Deferred</code> instance
   * @returns {void}
   */
  this.load = function (paramDeferred) {

    // Declarations
    var articles, numArticles, unloadedScripts, isLoaded;

    // Definitions
    articles = this.Dependencies.ARTICLES;
    numArticles = articles.length;

    /**
     * @description To collate a listing of unloaded scripts to import en bulk,
     * three chained higher-order looping functions are called in conjunction.
     * In addition to assembly a list of unloaded scripts with hooks, these
     * function callbacks likewise address and handle cases of already-loaded
     * scripts with hooks, unloaded scripts without hooks, and CSS stylesheets.
     * The higher-order functions called are a pair of
     * <code>Array.prototype.filter</code> invocations and a final
     * <code>Array.prototype.map</code> call.
     */
    unloadedScripts = articles.filter(function (current) {

      // Determine if the script has been loaded
      isLoaded = Boolean(
        (current.DEV && window.dev.hasOwnProperty(current.DEV)) ||
        (current.WINDOW && window.hasOwnProperty(current.WINDOW))
      );

      // If script has been loaded and has a dedicated hook
      if (isLoaded && current.HOOK) {
        if (this.Utility.DEBUG) {
          window.console.log("isLoaded", current.ARTICLE);
        }

        // Use progress as handler
        // (coerce to task from microtask w/ setTimeout of 0)
        mw.hook(current.HOOK).add(window.setTimeout.bind(null,
          paramDeferred.notify.bind(null, current.ARTICLE)
        ));
      }

      // Pass along unloaded scripts
      return !isLoaded;
    }.bind(this)).filter(function (current) {

      // Unloaded scripts with dedicated hooks are passed along to map
      if (current.TYPE === "script" && current.HOOK) {

        // Use progress as handler
        // (coerce to task from microtask w/ setTimeout of 0)
        return mw.hook(current.HOOK).add(window.setTimeout.bind(null,
          paramDeferred.notify.bind(null, current.ARTICLE)
        ));
      }

      // Unloaded scripts w/o hooks and stylesheets imported here
      window.importArticle({
        type: current.TYPE,
        article: current.ARTICLE
      }).then(paramDeferred.notify.bind(null, current.ARTICLE));
    }.bind(this)).map(function (current) {
      return current.ARTICLE;
    });

    // Unloaded scripts with hooks are imported en bulk here
    if (unloadedScripts.length) {
      if (this.Utility.DEBUG) {
        window.console.log("unloadedScripts", unloadedScripts);
      }

      window.importArticles({
        type: "script",
        articles: unloadedScripts
      });
    }

    /**
     * @description The <code>$.Deferred.progress</code> handler is responsible
     * for determining whether all required external Dev dependencies have been
     * loaded, thus allowing for the resolution of the <code>$.Deferred</code>
     * and permitting execution to continue to <code>this.init</code>.
     */
    paramDeferred.progress(function (paramArticle) {
      if (this.Utility.DEBUG) {
        window.console.log(paramArticle, numArticles);
      }

      if (--numArticles === 0) {
        window.dev.i18n.loadMessages(this.Utility.SCRIPT, {
          cacheVersion: this.Utility.CACHE_VERSION,
        }).then(paramDeferred.resolve).fail(paramDeferred.reject);
      }
    }.bind(this));
  };

  $.when(
    mw.loader.using(this.Dependencies.MODULES),
    new $.Deferred(this.load.bind(this)).promise())
  .then(this.init.bind(this))
  .fail(window.console.error);

}.call(Object.create(null), (this.dev = this.dev || {}).cql =
  this.dev.cql || {}, this, this.jQuery, this.mediaWiki));