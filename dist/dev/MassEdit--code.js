/**
 * <nowiki>
 * MassEdit
 * @file Essentially "bot software lite"; task automation and bulk editing tool
 * @author Eizen <dev.fandom.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "mediawiki.user"
 * @external "mediawiki.util"
 * @external "Colors"
 * @external "I18n-js"
 * @external "Modal"
 * @external "Placement"
 * @external "WgMessageWallsExist"
 */

/**
 * <pre>
 * <em>Table of contents</em>        <em>Summary</em>
 * - Prototype/Setup namespaces      Namespace object declarations/definitions
 * - Prototype pseudo-enums          Storage for MassEdit utility constants
 * - Setup pseudo-enums              Storage for <code>init</code> constants
 * - Prototype Utility methods       General purpose helper functions
 * - Prototype Dynamic Timer         Custom <code>setTimeout</code> iterator
 * - Prototype Quicksort             Fast Quicksort algorithm for member pages
 * - Prototype API methods           Assorted GET/POST handlers and page listers
 * - Prototype Generator methods     Functionality methods to build page lists
 * - Prototype Assembly methods      Methods returning <code>string</code> HTML
 * - Prototype Modal methods         All methods related to displaying interface
 *   - Utility methods               General modal-specific helper functions
 *   - Preview methods               Methods related to the preview pseudo-scene
 *   - Modal methods                 More general modal builders, handlers, etc.
 * - Prototype Event handlers        Handlers for clicks of modal buttons
 * - Prototype Pseudo-constructor    MassEdit <code>constructor</code> method
 * - Setup Helper methods            Methods to validate user input
 * - Setup Primary methods           Methods to load external dependencies
 * </pre>
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true,
   bitwise: false */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isMassEditLoaded) {
    return;
  }
  module.isLoaded = true;

  /****************************************************************************/
  /*                       Prototype/Setup namespaces                         */
  /****************************************************************************/

  /**
   * @description All script functionality is contained in a pair of namespace
   * objects housed in the module-global scope. Originally declared as ES2015
   * <code>const</code>s due to JSMinPlus treating the keyword as permissible,
   * the namespaces were subsequently redeclared with <code>var</code> for the
   * purposes of ensuring ES5 consistency/compatibility.
   */
  var main, init;

  /**
   * @description The <code>main</code> namespace object is used as a class
   * prototype for the MassEdit class instance created by <code>init</code>. It
   * contains methods and properties related to the actual MassEdit
   * functionality and application logic, keeping in a separate object all the
   * methods used to load and initialize the script itself.
   */
  main = {};

  /**
   * @description The <code>init</code> namespace object contains methods and
   * properties related to the setup/initialization of the MassEdit script. The
   * methods in this namespace object are responsible for loading external
   * dependencies, validating user input, setting config, and creating a new
   * MassEdit instance once script setup is complete.
   */
  init = {};

  /****************************************************************************/
  /*                         Prototype pseudo-enums                           */
  /****************************************************************************/

  // Protected pseudo-enums of prototype
  Object.defineProperties(main, {

    /**
     * @description This pseudo-enum of the <code>main</code> namespace object
     * is used to store all CSS selectors in a single place in the event that
     * one or more need to be changed. The formatting of the object literal key
     * naming is type (id or class), location (placement, modal, content,
     * preview), and either the name for ids or the type of element (div, span,
     * etc.). Originally, these were all divided into nested object literals as
     * seen in Message.js. However, this system became too unreadable in the
     * body of the script, necessitating a simpler system.
     *
     * @readonly
     * @enum {string}
     */
    Selectors: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({

        // Toolbar placement ids
        ID_PLACEMENT_LIST: "massedit-placement-list",
        ID_PLACEMENT_LINK: "massedit-placement-link",

        // Modal footer ids
        ID_MODAL_CONTAINER: "massedit-modal-container",
        ID_MODAL_SUBMIT: "massedit-modal-submit",
        ID_MODAL_TOGGLE: "massedit-modal-toggle",
        ID_MODAL_CANCEL: "massedit-modal-cancel",
        ID_MODAL_PREVIEW: "massedit-modal-preview",
        ID_MODAL_CLEAR: "massedit-modal-clear",
        ID_MODAL_CLOSE: "massedit-modal-close",

        // Modal body ids
        ID_CONTENT_REPLACE: "massedit-content-replace",
        ID_CONTENT_ADD: "massedit-content-add",
        ID_CONTENT_MESSAGE: "massedit-content-message",
        ID_CONTENT_LIST: "massedit-content-list",
        ID_CONTENT_FIND: "massedit-content-find",
        ID_CONTENT_PREVIEW: "massedit-content-preview",

        ID_CONTENT_FORM: "massedit-content-form",
        ID_CONTENT_FIELDSET: "massedit-content-fieldset",
        ID_CONTENT_CONTENT: "massedit-content-content",
        ID_CONTENT_TARGET: "massedit-content-target",
        ID_CONTENT_INDICES: "massedit-content-indices",
        ID_CONTENT_PAGES: "massedit-content-pages",
        ID_CONTENT_SUMMARY: "massedit-content-summary",
        ID_CONTENT_SCENE: "massedit-content-scene",
        ID_CONTENT_ACTION: "massedit-content-action",
        ID_CONTENT_TYPE: "massedit-content-type",
        ID_CONTENT_CASE: "massedit-content-case",
        ID_CONTENT_MATCH: "massedit-content-match",
        ID_CONTENT_FILTER: "massedit-content-filter",
        ID_CONTENT_LOG: "massedit-content-log",
        ID_CONTENT_BYLINE: "massedit-content-byline",
        ID_CONTENT_BODY: "massedit-content-body",
        ID_CONTENT_MEMBERS: "massedit-content-members",

        // Preview modal elements
        ID_PREVIEW_CONTAINER: "massedit-preview-container",
        ID_PREVIEW_TITLE: "massedit-preview-title",
        ID_PREVIEW_BODY: "massedit-preview-body",
        ID_PREVIEW_CLOSE: "massedit-preview-close",
        ID_PREVIEW_BUTTON: "massedit-preview-button",

        // Toolbar placement classes
        CLASS_PLACEMENT_OVERFLOW: "overflow",

        // Preview classes
        CLASS_PREVIEW_BUTTON: "massedit-preview-button",

        // UCP OO-UI classes
        CLASS_OOUI_FRAME: "oo-ui-window-frame",
        CLASS_OOUI_HEAD: "oo-ui-window-head",
        CLASS_OOUI_BODY: "oo-ui-window-body",
        CLASS_OOUI_FOOT: "oo-ui-window-foot",
        CLASS_OOUI_LABEL: "oo-ui-labelElement-label",

        // Modal footer classes
        CLASS_MODAL_CONTAINER: "massedit-modal-container",
        CLASS_MODAL_BUTTON: "massedit-modal-button",
        CLASS_MODAL_LEFT: "massedit-modal-left",
        CLASS_MODAL_OPTION: "massedit-modal-option",
        CLASS_MODAL_TIMER: "massedit-modal-timer",

        // Modal body classes
        CLASS_CONTENT_CONTAINER: "massedit-content-container",
        CLASS_CONTENT_FORM: "massedit-content-form",
        CLASS_CONTENT_FIELDSET: "massedit-content-fieldset",
        CLASS_CONTENT_TEXTAREA: "massedit-content-textarea",
        CLASS_CONTENT_INPUT: "massedit-content-input",
        CLASS_CONTENT_DIV: "massedit-content-div",
        CLASS_CONTENT_SPAN: "massedit-content-span",
        CLASS_CONTENT_SELECT: "massedit-content-select",
      }),
    },

    /**
     * @description This pseudo-enum of the <code>main</code> namespace object
     * is used to store a pair of arrays denoting which user groups are
     * permitted to make use of the editing and messaging functionality (all
     * users are permitted to generate lists). For the purposes of forstalling
     * the use of the script for vandalism or spam, its use is limited to
     * certain members of local staff, various global groups, and Fandom Staff.
     * The only major local group prevented from using the editing function is
     * the <code>threadmoderator</code> group, as these can be viewed as
     * standard users with /d and thread-specific abilities. However, these
     * users are permitted to make use of the mass-messaging functionality and
     * can generate lists like other users.
     *
     * @readonly
     * @enum {Array<string>}
     */
    UserGroups: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        CAN_EDIT: Object.freeze([
          "sysop",
          "content-moderator",
          "bot",
          "bot-global",
          "staff",
          "soap",
          "wiki-specialist",
          "content-volunteer",
          "global-edit-reviewer",
        ]),
        CAN_MESSAGE: Object.freeze([
          "global-discussions-moderator",
          "threadmoderator",
        ]),
      }),
    },

    /**
     * @description The <code>Scenes</code> pseudo-enum is used to store data
     * and names related to building the four major operations supported by the
     * MassEdit script, namely find-and-replace, append/prepend content, message
     * users, and generation of page listings. Originally, this enum was an
     * array used to store the <code>string</code> names of the four main scenes
     * in the order that determined their placement in the associated operation
     * dropdown menu. The actual design schema used to dynamically build the
     * <code>string</code> HTML from builder functions was stored within a
     * since-removed method called <code>main.buildModalScenes</code> that built
     * all the scenes at once on program initialization.
     * <br />
     * <br />
     * However, with the decision to revise this messy approach in favor of
     * lazy-building scenes only when requested by the user, the scene schema
     * was moved to this enum and rearranged into <code>object</code> form. The
     * author was forced to make use of many nested <code>Object.freeze</code>
     * invocations due to the inability to deep-freeze the whole object, though
     * alternate approaches are being researched to de-uglify the enum in a
     * future update.
     *
     * @readonly
     * @enum {object}
     */
    Scenes: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({

        // Find-and-replace (1st scene, default)
        REPLACE: Object.freeze({
          NAME: "replace",
          POSITION: 0,
          SCHEMA: Object.freeze([
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["type",
                  Object.freeze(["pages", "categories", "namespaces"])
                ]),
                Object.freeze(["case",
                  Object.freeze(["sensitive", "insensitive"])
                ]),
                Object.freeze(["match",
                  Object.freeze(["plain", "regex"])
                ]),
                Object.freeze(["filter",
                  Object.freeze(["all", "nonredirects", "redirects"])
                ]),
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["target", "textarea"]),
                Object.freeze(["indices", "input"]),
                Object.freeze(["content", "textarea"]),
                Object.freeze(["pages", "textarea"]),
                Object.freeze(["summary", "input"]),
              ])
            })
          ]),
        }),

        // Append/prepend content (2nd scene)
        ADD: Object.freeze({
          NAME: "add",
          POSITION: 1,
          SCHEMA: Object.freeze([
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["action",
                  Object.freeze(["prepend", "append"])
                ]),
                Object.freeze(["type",
                  Object.freeze(["pages", "categories", "namespaces"])
                ]),
                Object.freeze(["filter",
                  Object.freeze(["all", "nonredirects", "redirects"])
                ]),
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["content", "textarea"]),
                Object.freeze(["pages", "textarea"]),
                Object.freeze(["summary", "input"]),
              ])
            })
          ]),
        }),

        // Mass-message users (3rd scene)
        MESSAGE: Object.freeze({
          NAME: "message",
          POSITION: 2,
          SCHEMA: Object.freeze([
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["pages", "textarea"]),
                Object.freeze(["byline", "input"]),
                Object.freeze(["body", "textarea"]),
              ])
            })
          ]),
        }),

        // List cat/ns members (4th scene)
        LIST: Object.freeze({
          NAME: "list",
          POSITION: 3,
          SCHEMA: Object.freeze([
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["type",
                  Object.freeze(["categories", "namespaces", "templates"])
                ]),
                Object.freeze(["filter",
                  Object.freeze(["all", "nonredirects", "redirects"])
                ]),
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["pages", "textarea"]),
                Object.freeze(["members", "textarea"]),
              ])
            })
          ]),
        }),

        // Find pages containing specific target text (5th scene)
        FIND: Object.freeze({
          NAME: "find",
          POSITION: 4,
          SCHEMA: Object.freeze([
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["type",
                  Object.freeze(["pages", "categories", "namespaces"])
                ]),
                Object.freeze(["case",
                  Object.freeze(["sensitive", "insensitive"])
                ]),
                Object.freeze(["match",
                  Object.freeze(["plain", "regex"])
                ]),
                Object.freeze(["filter",
                  Object.freeze(["all", "nonredirects", "redirects"])
                ]),
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze([
                Object.freeze(["target", "textarea"]),
                Object.freeze(["pages", "textarea"]),
                Object.freeze(["members", "textarea"]),
              ])
            })
          ]),
        }),
      }),
    },

    /**
     * @description The <code>Buttons</code> pseudo-enum stores all seven config
     * <code>object</code>s used to assemble <code>ModalButton</code> instances
     * during the Modal creation process. Prior to UCP update 3, this data was
     * stored in a static fashion within <code>main.buildModal</code>. However,
     * due to the need to maintain a static default <code>disabled</code> flag
     * for use in toggling buttons elements within the body of
     * <code>main.toggleModalComponentsDisable</code>, the associated config
     * objects were removed from the <code>buildModal</code> method and provided
     * their own dedicated pseudo-enum. The modal builder function now uses this
     * data to dynamically assemble the buttons and modal in an automatic
     * fashion.
     * <br />
     * <br />
     * The key for each <code>Buttons</code> object entry is as follows:
     * <pre>
     * - HANDLER: Click handler function, a property of MassEdit instance
     * - TEXT: <code>i18n</code> message name for button text
     * - EVENT: Name of related click event (should be same as object key name)
     * - PRIMARY: <code>boolean</code> flag for primary styling
     * - DISABLED: <code>boolean</code> flag for default disabled behavior
     * - ID: Name of <code>Selectors</code> key related to element id
     * - CLASSES: Array of <code>Selectors</code> keys for class selectors
     * </pre>
     *
     * @readonly
     * @enum {object}
     */
    Buttons: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SUBMIT: Object.freeze({
          HANDLER: "handleSubmit",
          TEXT: "buttonSubmit",
          EVENT: "submit",
          PRIMARY: true,
          DISABLED: false,
          ID: "ID_MODAL_SUBMIT",
          CLASSES: Object.freeze([
            "CLASS_MODAL_BUTTON",
            "CLASS_MODAL_OPTION",
          ])
        }),
        TOGGLE: Object.freeze({
          HANDLER: "handleToggle",
          TEXT: "buttonPause",
          EVENT: "toggle",
          PRIMARY: true,
          DISABLED: true,
          ID: "ID_MODAL_TOGGLE",
          CLASSES: Object.freeze([
            "CLASS_MODAL_BUTTON",
            "CLASS_MODAL_TIMER",
          ])
        }),
        CANCEL: Object.freeze({
          HANDLER: "handleCancel",
          TEXT: "buttonCancel",
          EVENT: "cancel",
          PRIMARY: true,
          DISABLED: true,
          ID: "ID_MODAL_CANCEL",
          CLASSES: Object.freeze([
            "CLASS_MODAL_BUTTON",
            "CLASS_MODAL_TIMER",
          ])
        }),
        PREVIEW: Object.freeze({
          HANDLER: "handlePreviewing",
          TEXT: "buttonPreview",
          EVENT: "preview",
          PRIMARY: true,
          DISABLED: true,
          ID: "ID_MODAL_PREVIEW",
          CLASSES: Object.freeze([
            "CLASS_MODAL_BUTTON",
          ])
        }),
        CLOSE: Object.freeze({
          TEXT: "buttonClose",
          EVENT: "close",
          PRIMARY: false,
          DISABLED: false,
          ID: "ID_MODAL_CLOSE",
          CLASSES: Object.freeze([
            "CLASS_MODAL_BUTTON",
            "CLASS_MODAL_LEFT",
            "CLASS_MODAL_OPTION"
          ])
        }),
        CLEAR: Object.freeze({
          HANDLER: "handleClear",
          TEXT: "buttonClear",
          EVENT: "clear",
          PRIMARY: false,
          DISABLED: false,
          ID: "ID_MODAL_CLEAR",
          CLASSES: Object.freeze([
            "CLASS_MODAL_BUTTON",
            "CLASS_MODAL_LEFT",
            "CLASS_MODAL_OPTION"
          ])
        }),
      }),
    },

    /**
     * @description This pseudo-enum replaces the previous pair of
     * <code>boolean</code> constants housed in the script-global execution
     * context, namely <code>DEBUG</code> and <code>TESTING</code>. This enum
     * houses the default values of these flags, the value of which are applied
     * to the properties of the MassEdit instance's <code>flags</code> local
     * variable. This system allows for the exposing of certain public methods
     * that permit post-load toggling of the debug and test modes for more
     * dynamic debugging.
     *
     * @readonly
     * @enum {boolean}
     */
    Flags: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        DEBUG: false,
        TESTING: false,
      }),
    },

    /**
     * @description The <code>Utility</code> pseudo-enum of the
     * <code>main</code> namespace object is used to store various constants for
     * general use in a variety of contexts. The constants of the
     * <code>number</code> data type are related to standardizing edit interval
     * rates and edit delays in cases of rate limiting. Originally, these were
     * housed in a <code>const</code> object in the script-global namespace,
     * though their exclusive use by the MassEdit class instance made their
     * inclusion into <code>main</code> seem like a more sensible placement
     * decision.
     * <br />
     * <br />
     * The two <code>string</code> data type members are the key name used to
     * store HTML "scenes" (operation interfaces) in the browser's
     * <code>localStorage</code> and the name of the "scene" serving as the
     * first interface built and displayed to the user upon initialization. By
     * convention, this is the "Find and replace" scene, though any scene could
     * have been used.
     *
     * @readonly
     * @enum {string|number}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        LS_KEY: "MassEdit-cache-scenes",
        LS_PREFIX: "MassEdit-cache-scenes-",
        FIRST_SCENE: "REPLACE",
        DAYS_ACTIVE: 90,
        MAX_SUMMARY_CHARS: 800,
        FADE_INTERVAL: 1000,
        DELAY: 35000,
        BOTTOM_PADDING: 15,
      }),
    },
  });

  /****************************************************************************/
  /*                           Setup pseudo-enums                             */
  /****************************************************************************/

  // Protected pseudo-enums of script setup object
  Object.defineProperties(init, {

    /**
     * @description This pseudo-enum of the <code>init</code> namespace object
     * used to initialize the script stores data related to the external
     * dependencies and core modules required by the script. It consists of two
     * properties. The former, a constant <code>object</code> called "ARTICLES,"
     * originally contained key/value pairs wherein the key was the specific
     * name of the <code>mw.hook</code> and the value was the script's location
     * for use by <code>importArticles.articles</code>. However, this system
     * was eventually replaced in favor of an array of <code>object</code>s
     * containing properties for hook, <code>window.dev</code> alias, and script
     * for more efficient, readable loading of dependencies.
     * <br />
     * <br />
     * The latter array, a constant array named <code>MODULES</code>, contains a
     * listing of the core modules required for use by
     * <code>mw.loader.using</code>.
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
            DEV: "colors",
            HOOK: "dev.colors",
            ARTICLE: "u:dev:MediaWiki:Colors/code.js",
            TYPE: "script",
          }),
          Object.freeze({
            DEV: "i18n",
            HOOK: "dev.i18n",
            ARTICLE: "u:dev:MediaWiki:I18n-js/code.js",
            TYPE: "script",
          }),
          Object.freeze({
            DEV: "modal",
            HOOK: "dev.modal",
            ARTICLE: "u:dev:MediaWiki:Modal.js",
            TYPE: "script",
          }),
          Object.freeze({
            DEV: "placement",
            HOOK: "dev.placement",
            ARTICLE: "u:dev:MediaWiki:Placement.js",
            TYPE: "script",
          }),
          Object.freeze({
            WINDOW: "wgMessageWallsExist",
            HOOK: "dev.enablewallext",
            ARTICLE: "u:dev:MediaWiki:WgMessageWallsExist.js",
            TYPE: "script",
          }),
        ]),
        MODULES: Object.freeze([
          "mediawiki.user",
          "mediawiki.util",
        ]),
      }),
    },

    /**
     * @description This pseudo-enum of the <code>init</code> namespace object
     * is used to store default data pertaining to the Placement.js external
     * dependency. It includes an <code>object</code> denoting the default
     * placement location for the script in the event of the user not including
     * any user config and an array containing the two valid placement types. By
     * default, the script tool element as built in <code>main.init</code> is
     * appended to the user toolbar.
     *
     * @readonly
     * @enum {object}
     */
    Placement: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        DEFAULTS: Object.freeze({
          ELEMENT: "tools",
          TYPE: "prepend",
        }),
        VALID_TYPES: Object.freeze([
          "append",
          "prepend",
        ]),
      }),
    },

    /**
     * @description This pseudo-enum is used to store the <code>string</code>
     * names of the various <code>WikipediaGlobal</code> (wg) variables required
     * by the main MassEdit class instance and <code>init</code> object. These
     * are fetched within the body of the <code>init.preload</code> function via
     * a <code>mw.config.get</code> invocation and stored in an instance
     * variable property named <code>globals</code> for subsequent usage. This
     * approach replaces the deprecated approach previously used in the script
     * of assuming the relevant wg variables exist as properties of the
     * <code>window</code> object, an assumption that is discouraged in more
     * recent version of MediaWiki.
     *
     * @readonly
     * @enum {object}
     */
    Globals: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze([
        "wgFormattedNamespaces",
        "wgLegalTitleChars",
        "wgScriptPath",
        "wgServer",
        "wgUserGroups",
        "wgUserLanguage",
        "wgVersion",
      ]),
    },

    /**
     * @description This catchall pseudo-enum of the <code>init</code< namespace
     * object is used to house assorted values of various data types that don't
     * fit well into other pseudo-enums. It contains the interval rates
     * calculated from the edit restrictions imposed upon normal users and bots.
     * additionally, it contains a <code>string</code> constant denoting the
     * name of the script and another <code>string</code> for the name of the
     * <code>mw.hook</code> event.
     *
     * @see <a href="https://git.io/fA4Jk">SUS-4775</a>
     * @see <a href="https://git.io/fA4eQ">VariablesBase.php</a>
     * @readonly
     * @enum {string|number}
     */
    Utility: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze({
        SCRIPT: "MassEdit",
        HOOK_NAME: "dev.massEdit",
        STD_INTERVAL: 1500,
        BOT_INTERVAL: 750,
        CACHE_VERSION: 6,
      }),
    }
  });

  /****************************************************************************/
  /*                      Prototype Utility methods                           */
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
  main.capitalize = function (paramTarget) {
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
  main.isThisAn = function (paramType, paramTarget) {
    return Object.prototype.toString.call(paramTarget) === "[object " +
      this.capitalize.call(this, paramType.toLowerCase()) + "]";
  };

  /**
   * @description This function is used to determine whether or not the input
   * <code>string</code> contains restricted characters as denoted by Wikia's
   * <code>wgLegalTitleChars</code>. Legal characters are defined as follows:
   * <code> %!"$&'()*,\-./0-9:;=?@A-Z\\\^_`a-z~+\u0080-\uFFFF</code>
   *
   * @param {string} paramString Content string to be checked
   * @returns {boolean} - Flag denoting the nature of the paramString
   */
  main.isLegalInput = function (paramString) {
    return new RegExp("^[" + this.globals.wgLegalTitleChars +
      "]*$").test(paramString);
  };

  /**
   * @description This helper function uses simple regex to determine whether
   * the parameter <code>string</code> or <code>number</code> is an integer
   * value. It is primarily used to determine if the user has inputted a proper
   * namespace number if mass editing by namespace.
   *
   * @param {string|number} paramEntry - Namespace number
   * @returns {boolean} - Flag denoting the nature of the paramEntry
   */
  main.isInteger = function (paramEntry) {
    return new RegExp(/^[0-9]+$/).test(paramEntry.toString());
  };

  /**
   * @description This function serves as an Internet Explorer-friendly
   * implementation of <code>String.prototype.startsWith</code>, a method
   * introduced in ES2015 and unavailable to IE 11 and earlier. It is based off
   * the polyfill available on the method's Mozilla.org documentation page.
   *
   * @param {string} paramTarget - <code>string</code> to be checked
   * @param {string} paramSearch - <code>string</code> target
   * @returns {boolean} - Flag denoting a match
   */
  main.startsWith = function (paramTarget, paramSearch) {
    return paramTarget.substring(0, 0 + paramSearch.length) === paramSearch;
  };

  /**
   * @description This utility method is used to check whether the user
   * attempting to use the script is in the proper usergroup. Only certain local
   * staff and members of select global groups are permitted the use of the
   * editing and messaging functionality so as to prevent potential vandalism,
   * though any users are permitted to generate lists of category members.
   *
   * @param {boolean} paramMessaging - Whether to include messaging groups
   * @returns {boolean} - Flag denoting user's ability to use the script
   */
  main.hasRights = function (paramMessaging) {
    return new RegExp(["(" + this.UserGroups.CAN_EDIT.join("|") +
      ((paramMessaging) ? "|" + this.UserGroups.CAN_MESSAGE.join("|") : "") +
      ")"].join("")).test(this.globals.wgUserGroups.join(" ")) ||
      this.flags.testing;
  };

  /**
   * @description This helper function simply serves to expand out standard
   * local wiki links to their full URLs, converting all <code>/wiki/$1</code>
   * links generated by the API's parse endpoint to the more verbose
   * <code>https://eizen.fandom.com/wiki/$1</code> equivalents. This is required
   * by the new post-UCP Message Wall thread posting functionality and is used
   * prior to the development of the jsonModel representation by the
   * <code>main.buildJsonModel</code> function.
   *
   * @param {string} paramParsedHTML - Wikitext-to-HTML string to be modified
   * @returns {string} - Modified HTML string with expanded links
   */
  main.expandLinkAddress = function (paramParsedHTML) {
    return paramParsedHTML.replace(
      /href="\/wiki/g,
      "href=\"" + this.globals.wgServer + this.globals.wgScriptPath + "/wiki"
    );
  };

  /**
   * @description This helper function was previously a part of
   * <code>main.replaceOccurrences</code> and was moved to a separate, dedicated
   * helper function due to its use in both the find-and-replace functionality
   * and the search functionality. The function is now called within
   * <code>main.handleSubmit</code> and its resultant <code>RegExp</code>
   * object passed to <code>replaceOccurrences</code> as a parameter.
   *
   * @param {string} paramTarget - The target text be RegExpified
   * @param {boolean} paramIsRegex - A flag denoting whether target is already
                      regex
   * @param {boolean} paramCaseSensitive - A flag denoting whether regex should
                      be case sensitive or not
   * @returns {object} - A new <code>RegExp</code> object
   */
  main.buildRegExp = function (paramTarget, paramIsRegex, paramCaseSensitive) {
    return new RegExp((paramIsRegex)
      ? paramTarget // Example formatting: ([A-Z])\w+
      : paramTarget
        .replace(/\r/gi, "")
        .replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
      ((paramCaseSensitive) ? "g" : "gi") + "m"
    );
  };

  /**
   * @description This helper method serves as the primary means by which all
   * external post-load toggling of the debug and test modes may be undertaken.
   * This particular implementation makes use of the bitwise XOR operator to
   * toggle the <code>number</code> representation of the flag's
   * <code>boolean<code> value between 0 and 1 prior to type coercing the result
   * back to the <code>boolean</code> data type.
   *
   * @param {string} paramFlagName - <code>string</code> name of desired flag
   * @returns {void}
   */
  main.toggleFlag = function (paramFlagName) {
    if (
      typeof paramFlagName !== "string" ||
      $.inArray(paramFlagName.toUpperCase(), Object.keys(this.Flags)) === -1
    ) {
      return;
    }

    // Check for boolean flag's existence and add default if undefined
    (this.flags = this.flags || {})[paramFlagName] =
      this.flags[paramFlagName] || this.Flags[paramFlagName];

    // Toggle via bitwise then type cast back to boolean before redefining
    window.console.log(paramFlagName + ":",
      this.flags[paramFlagName] = Boolean(this.flags[paramFlagName] ^ 1));
  };

  /**
   * @description This utility method is used to remove duplicate entries from
   * an array prior to the usage of the Quicksort implementation included in
   * the sections below. Unlike other duplicate-removal implementations, this
   * version makes no use of <code>Object.prototype.hasOwnProperty</code> or any
   * value comparisons to determine if elements are already in a temporary
   * storage structure. Instead, each element of the parameter array is simply
   * added to the temporary object as a key, overwriting any previously added
   * keys of the same value. This results in an object with unique keys that can
   * be collated into an array and returned from the function.
   *
   * @param {Array<string>} paramArray - Array with potential duplicates
   * @returns {Array<string>} - Duplicate-free array ready for sorting
   */
  main.replaceDuplicates = function (paramArray) {

    // Declarations
    var i, n, tempObject;

    // Add unique elements as keys of local object
    for (i = 0, n = paramArray.length, tempObject = {}; i < n; i++) {
      tempObject[paramArray[i]] = true;
    }

    // Grab unique keys from tempObject as array
    return Object.keys(tempObject);
  };

  /**
   * @description The <code>buildJsonModel</code> function serves as the master
   * function that is externally invoked when a ProseMirror-style "jsonModel" is
   * required to represent a user's message in the posting of a new post-UCP
   * Message Wall thread. The method takes an HTML string (obtained from parsing
   * wikitext via the API), expands its linked from <code>"/wiki/$1"</code> to
   * <code>https://eizen.fandom.com/wiki/$1</code>, calls
   * <code>$.parseHTML</code> on the outer <code>mw-parser-output</code> wrapper
   * <code>div</code>, and invokes the recursive
   * <code>main.assembleJsonModelObject</code> function on the wrapper, passing
   * a base jsonModel object and a pair of empty arrays to serve as stacks for
   * paragraph and link element objects. A stringified JSON object is returned
   * for use in posting the Message Wall thread.
   *
   * @param {string} paramHTML - Parsed string HTML parsed from wikitext
   * @returns {string} - A jsonModel JSON object in string form
   */
  main.buildJsonModel = function (paramHTML) {
    return JSON.stringify(this.assembleJsonModelObject(
      $.parseHTML(this.expandLinkAddress(paramHTML))[0], {
        "type": "doc",
        "content": []
      }, [], []
    ));
  };

  /**
   * @description The <code>main.assembleJsonModelObject</code> function is used
   * as a helper function by <code>main.buildJsonModel</code> for the purposes
   * of traversing the HTML constituting the user's intended Message Wall thread
   * body and building a representational ProseMirror-style "jsonModel" required
   * by the relevant post-Nirvana API controller.
   * <br />
   * <br />
   * At present, the function only pays attention to paragraph differentiations
   * and links, ignoring any and all other elements present in the HTML.
   * Additional functionality may be included in future, but this constitutes
   * the baseline functionality required by most messages in most use cases.
   * <br />
   * <br />
   * The HTML-to-jsonModel conversion implementation used here is an adaptation
   * of a cleaner approach the author first developed in Python using the
   * <code>html.parser</code> module and <code>html.parser.HTMLParser</code>
   * class.
   *
   * @param {Node} paramElement - The element to parse and evaluate
   * @param {object} paramJsonModel - The main jsonModel object
   * @param {Array<object>} paramStackP - Stack for paragraph elements
   * @param {Array<object>} paramStackA - Stack for link elements
   * @returns {string} paramJsonModel - Expanded jsonModel parameter
   */
  main.assembleJsonModelObject = function (paramElement, paramJsonModel,
      paramStackP, paramStackA) {

    // Text node
    if (paramElement.nodeType === 3) {

      // If there's an active link object in the stack...
      if (paramStackA.length) {

        // ... apply this text node to the link as its text
        paramStackA[paramStackA.length - 1].text = paramElement.nodeValue;

      // If there's an active paragraph object in the stack...
      } else if (paramStackP.length) {

        // Add a nested paragraph to the outer paragraph's content array
        paramStackP[paramStackP.length - 1].content.push({
          "type": "text",
          "text": paramElement.nodeValue
        });
      }

    // Element tags
    } else if (paramElement.nodeType === 1) {

      // Declarations
      var tag, child, attr, attrs, newLink;

      // Grab tag name
      tag = paramElement.nodeName.toLowerCase();

      // Only care about paragraphs and links at present
      if (tag === "p") {

        // Push a new paragraph object to the active stack
        paramStackP.push({
          "type": "paragraph",
          "content": []
        });
      } else if (tag === "a") {

        // Create new link object
        newLink = {
          "type": "text",
          "marks": [
            {
              "type": "link",
              "attrs": {}
            }
          ]
        };

        // Create object of link's attributes for perusal
        attrs = Array.prototype.slice.call(paramElement.attributes).reduce(
          function (attributes, attribute) {
            attributes[attribute.name] = attribute.value;
            return attributes;
          }, Object.create(null)
        );

        // jsonModel only cares for href and title link attributes
        for (attr in attrs) {
          if (attr === "href" || attr === "title") {
            newLink.marks[0].attrs[attr] = attrs[attr];
          }
        }

        // Push new link object to the active stack
        paramStackA.push(newLink);

        // Add link object to latest paragraph node
        paramStackP[paramStackP.length - 1].content.push(newLink);
      }

      // Check for nested nodes, use recursive approach to iterate
      if (paramElement.hasChildNodes()) {
        child = paramElement.firstChild;
        while (child) {
          paramJsonModel = this.assembleJsonModelObject(child, paramJsonModel,
            paramStackP, paramStackA);
          child = child.nextSibling;
        }
      }

      // Operations for closing tags
      if (tag === "p") {

        // Add latest paragraph to jsonModel
        paramJsonModel.content.push(paramStackP.pop());
      } else if (tag === "a") {

        // Remove link object
        paramStackA.pop();
      }
    }

    return paramJsonModel;
  };

  /**
   * @description Originally, this function returned an ammended string adjusted
   * to exhibit the user's desired content changes. The function was called for
   * every individual page or category/namespace member inputted by the user.
   * The author eventually noticed that all but one of the input arguments
   * passed were unchanged from invocation to invocation and that the same
   * internal operations were being undertaken and performed each time despite
   * the unchanged arguments.
   * <br />
   * <br />
   * As an improvement, the author refactored the method to use a closure,
   * allowing the main outer function to be called only once to initialize
   * internal fields with the unchanged arguments. Thanks to the closure, the
   * returned inner function can be assigned to a local variable elsewhere and
   * invoked as many times as needed while still making use of preserved closure
   * variables housed in heap memory after the main function's frame is popped
   * off the stack.
   * <br />
   * <br />
   * Further modifications to the function made with the addition of dedicated
   * target search functionality saw the removal of the function's former
   * <code>RegExp</code> assembler to a separate function titled
   * <code>main.buildRegExp</code>. The result of that function is now passed to
   * this function by <code>main.handleSubmit</code> as the first parameter.
   *
   * @param {object} paramRegExp - <code>RegExp</code> object constituting
                     target to be replaced
   * @param {string} paramReplacement - Text to be inserted
   * @param {Array<number>} paramInstances - Indices at which to replace text
   * @returns {function} - A closure function to be invoked separately
   */
  main.replaceOccurrences = function (paramRegExp, paramReplacement,
      paramInstances) {

    // Declarations
    var replacement, counter;

    // Sanitize input param
    paramInstances = (paramInstances != null) ? paramInstances : [];

    // Second parameter of the String.prototype.replace invocation
    replacement = (!paramInstances.length)
      ? paramReplacement
      : function (paramMatch) {
          return ($.inArray(++counter, paramInstances) !== -1)
            ? paramReplacement
            : paramMatch;
        };

    // Closure so above operations are only undertaken once per submission op
    return function (paramString) {

      // Log regex and intended replacement
      if (this.flags.debug) {
        window.console.log(paramRegExp, replacement);
      }

      // Init counter in case of replace function
      counter = 0;

      // Replace using regex and either paramReplacement or anon function
      return paramString.replace(paramRegExp, replacement);
    }.bind(this);
  };

  /**
   * @description This (admittedly messy) handler is used for both returning
   * scene data from storage and for adding new scene data to storage for reuse.
   * <code>localStorage</code> is accessed safely via <code>mw.storage</code>
   * and placed within a <code>try...catch</code> block to handle any additional
   * thrown errors. A local object stored in <code>main.modal</code> is used as
   * a fallback in the event of an error being thrown.
   * <br />
   * <br />
   * Previously, prior to the various UCP updates, this method made use of the
   * <code>$.store</code> jQuery plugin to handle errors and store data. This
   * was removed during the UCP conversion, necessitating the use of the current
   * <code>mw.storage</code> approach instead.
   *
   * @see <a href="https://git.io/JfrsN">Wikia's jquery.store.js (pre-UCP)</a>
   * @param {string} paramSceneName - Name for requested scene
   * @param {string} paramSceneData - Content of scene for setting (optional)
   * @returns {string|null} - Returns scene content or <code>null</code>
   */
  main.queryStorage = function (paramSceneName, paramSceneData) {

    // Declarations
    var isSetting, lsKey, scenes;

    // Handler can be used for both getting and setting, so check for which
    isSetting = (Array.prototype.slice.call(arguments).length == 2 &&
      paramSceneData != null);

    // Handle i18n for user language preference and uselang URL parameter
    lsKey = this.Utility.LS_PREFIX + this.globals.wgUserLanguage;

    // Apply localStorage data to this.modal.scenes and local scenes variable
    try {
      scenes = this.modal.scenes =
        JSON.parse(mw.storage.get(lsKey)) || {};
    } catch (paramError) {
      if (this.flags.debug) {
        window.console.error(paramError);
      }

      // Use fallback if localStorage throws
      scenes = this.modal.scenes = this.modal.scenes || {};
    }

    // Return string HTML of requested scene or explicit null
    if (!isSetting) {
      return (scenes.hasOwnProperty(paramSceneName))
        ? scenes[paramSceneName]
        : null;
    }

    // Add to storage if no property with this name exists
    if (!scenes.hasOwnProperty(paramSceneName)) {

      // Simultaneously adds to both scenes variable and this.modal.scenes
      scenes[paramSceneName] = paramSceneData;

      // Add to localStorage
      try {
        mw.storage.set(lsKey, JSON.stringify(scenes));
      } catch (paramError) {}

      // Make sure new scenes are added to both localStorage and modal.scenes
      if (this.flags.debug) {
        try {
          window.console.log("modal.scenes: ", this.modal.scenes);
          window.console.log("localStorage: ",
            JSON.parse(window.localStorage.getItem(lsKey)));
        } catch (paramError) {}
      }
    }

    return scenes[paramSceneName];
  };

  /****************************************************************************/
  /*                       Prototype Dynamic Timer                            */
  /****************************************************************************/

  /**
   * @description This function serves as a pseudo-constructor for the pausable
   * <code>setDynamicTimeout</code> iterator. It accepts a function as a
   * callback and an edit interval, setting these as publically accessible
   * function properties alongside other default flow control
   * <code>boolean</code>s. The latter are used elsewhere in the program to
   * determine whether or not event listener handlers can be run, as certain
   * handlers should not be accessible if an editing operation is in progress.
   *
   * @param {function} paramCallback - Function to run after interval complete
   * @param {number} paramInterval - Rate at which timeout is handled
   * @returns {object} self - Inner object return for external assignment
   */
  main.setDynamicTimeout = function self (paramCallback, paramInterval) {

    // Define pseudo-instance properties from args
    self.callback = paramCallback;
    self.interval = paramInterval;

    // Set flow control booleans
    self.isPaused = false;
    self.isComplete = false;

    // Set default value for id
    self.identify = -1;

    // Begin first iterate and define id
    self.iterate();

    // Return for definition to local variable
    return self;
  };

  /**
   * @description This internal method of the <code>setDynamicTimeout</code>
   * function is used to cancel any ongoing editing operation by clearing the
   * current timeout and setting the <code>isComplete</code> flow control
   * <code>boolean</code> to true. This lets external handlers know that the
   * editing operation is complete, enabling or disabling them in turn.
   *
   * @returns {void}
   */
  main.setDynamicTimeout.cancel = function () {
    this.isComplete = true;
    window.clearTimeout(this.identify);
  };

  /**
   * @description This internal method of the <code>setDynamicTimeout</code>
   * function is used to pause any ongoing editing operation by setting the
   * <code>isPaused</code> flow control <code>boolean</code> and clearing the
   * current <code>setTimeouT</code> identified <code>number</code>. This is
   * called whenever the user presses the <code>Pause</code> modal button.
   *
   * @returns {void}
   */
  main.setDynamicTimeout.pause = function () {
    if (this.isPaused || this.isComplete) {
      return;
    }

    this.isPaused = true;
    window.clearTimeout(this.identify);
  };

  /**
   * @description This internal method of the <code>setDynamicTimeout</code>
   * function is used to resume any ongoing and paused editing operation by
   * setting the <code>isPaused</code> flow control <code>boolean</code> to
   * <code>false</code> and calling the <code>iterate</code> method to proceed
   * to the next iteration. It is called when the user presses "Resume."
   *
   * @returns {void}
   */
  main.setDynamicTimeout.resume = function () {
    if (!this.isPaused || this.isComplete) {
      return;
    }

    this.isPaused = false;
    this.iterate();
  };

  /**
   * @description This internal method of the <code>setDynamicTimeout</code>
   * function is used to proceed on to the next iteration by resetting the
   * <code>identify</code> function property to the value returned by a new
   * <code>setTimeout</code> invocation. The function accepts as an optional
   * parameter an interval rate greater than that defined as in the function
   * instance property <code>interval</code> for cases of ratelimiting. In such
   * a case, the rate is extended to 35 seconds before the callback is called.
   *
   * @param {number} paramInterval - Optional interval rate parameter
   * @returns {void}
   */
  main.setDynamicTimeout.iterate = function (paramInterval) {
    if (this.isPaused || this.isComplete) {
      return;
    }

    // Interval should only be greater than instance interval
    paramInterval = (paramInterval < this.interval || paramInterval == null)
      ? this.interval
      : paramInterval;

    // Define the identifier
    this.identify = window.setTimeout(this.callback, paramInterval);
  };

  /****************************************************************************/
  /*                           Prototype Quicksort                            */
  /****************************************************************************/

  /**
   * @description This implementation of the classic Quicksort algorithm is used
   * to quickly sort through a listing of category or namespace member pages
   * prior to iteration or display. Originally, the author went with the default
   * <code>Array.prototype.sort</code> native code. However, after running speed
   * tests between Chrome's V8 native implementation and a few custom Quicksort
   * algorithms, the author decided to go with a custom implementation. Current
   * speed tests for the native code generally result in sorting times of
   * 700-900 ms for an array of 1,000,000 <code>number</code>s, while this
   * custom implementation averages between 150-350 ms for the same data set.
   *
   * @param {Array<string>} paramArray - Array of <code>string</code>s
   * @param {number} paramLeft - Parameter left index
   * @param {number} paramRight - Parameter right index
   * @returns {Array<string>} paramArray - Sorted array
   */
  main.sort = function self (paramArray, paramLeft, paramRight) {

    // Declarations
    var args, index;

    // Convert to proper array
    args = Array.prototype.slice.call(arguments);

    // Failsafe to ensure all parameters have initial values
    if (args.length === 1 && this.isThisAn("Array", args[0])) {
      paramArray = args[0];
      paramLeft = 0;
      paramRight = paramArray.length - 1;
    }

    // Recursively partition and call self until sorted
    if (paramArray.length) {
      index = self.partition(paramArray, paramLeft, paramRight);

      if (paramLeft < index - 1) {
        self(paramArray, paramLeft, index - 1);
      }

      if (index < paramRight) {
        self(paramArray, index, paramRight);
      }
    }

    return paramArray;
  };

  /**
   * @description One of two main helper functions of the Quicksort algorithm,
   * <code>main.sort.swap</code> is used, as the name implies, to swap the
   * elements included in the parameter array at the indices specified by
   * <code>paramLeft</code> and <code>paramRight</code>. A temporary local
   * variable, <code>swapped</code>, is used to faciliate the switch and store
   * the left pointer's value while the element at the right index is assigned
   * as the new left pointer's value.
   *
   * @param {Array<string>} paramArray - Array of <code>string</code>s
   * @param {number} paramLeft - Parameter left array index
   * @param {number} paramRight - Parameter right array index
   * @returns {void}
   */
  main.sort.swap = function (paramArray, paramLeft, paramRight) {

    // Declaration
    var swapped;

    // Temporarily store left pointer's value
    swapped = paramArray[paramLeft];

    // Set right pointer's value as new value at left index
    paramArray[paramLeft] = paramArray[paramRight];

    // Former left value now set to the right
    paramArray[paramRight] = swapped;
  };

  /**
   * @description The second of two such helper functions of the Quicksort
   * algorithm, <code>main.sort.partition</code>,as its name implies, is used to
   * divide the parameter array based on the values of the <code>number</code>
   * index pointers. It is called often during <code>main.sort</code>'s set of
   * divide-and-conquer recursive calls to further adjust the pointer values and
   * swap values accordingly while the left pointer value is less than the right
   * pointer index.
   *
   * @param {Array<string>} paramArray - Array of <code>string</code>s
   * @param {number} paramLeft - Parameter left index
   * @param {number} paramRight - Parameter right index
   * @returns {number} leftPointer - Leftmost pointer index
   */
  main.sort.partition = function (paramArray, paramLeft, paramRight) {

    // Declarations
    var pivot, leftPointer, rightPointer;

    // Middlemost pivot element
    pivot = paramArray[Math.floor((paramLeft + paramRight) / 2)];

    // Initial pointer definitions
    leftPointer = paramLeft;
    rightPointer = paramRight;

    while (leftPointer <= rightPointer) {

      // Adjust left pointer index
      while (paramArray[leftPointer] < pivot) {
        leftPointer++;
      }

      // Adjust right pointer index
      while (paramArray[rightPointer] > pivot) {
        rightPointer--;
      }

      // Switch the elements at the present point indices
      if (leftPointer <= rightPointer) {
        this.swap(paramArray, leftPointer++, rightPointer--);
      }
    }

    // For use as "index" local var in main.sort
    return leftPointer;
  };

  /****************************************************************************/
  /*                        Prototype API methods                             */
  /****************************************************************************/

  /**
   * @description Prior to UCP update 2, this method employed the Nirvana
   * controller <code>UserProfilePage.renderUserIdentityBox</code> to check a
   * single username for the status of its user account. With subsequent
   * reworking of the calling method <code>main.getActiveUsersData</code> to
   * query usernames in bulk groups of 500, this method was adjusted and
   * UCPified to use API:Users and pass pipe-delimited lists of users to limit
   * the number of total calls needed to start the actual messaging process.
   * <br />
   * <br />
   * However, with the 4/10/2021 update, the previous "check each user one at a
   * time" approach was resurrected on account of the need to consume data from
   * the <code>usercontribs</code> and <code>logevents</code> endpoints as well
   * to ensure the messaging functionality is only used on active users who
   * actually contribute to the community on which the script is being used.
   *
   * @param {string} paramUsername -Username about whom to query
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getUserData = function (paramUsername) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "query",
        list: "users|usercontribs|logevents",
        usprop: "editcount",
        ucprop: "timestamp",
        uclimit: "1",
        lelimit: "1",
        ususers: paramUsername,
        ucuser: paramUsername,
        leuser: paramUsername,
        format: "json"
      }
    });
  };

  /**
   * @description One of two such methods, this function is used to post an
   * individual thread to the selected user's message wall. Returning a resolved
   * <code>jQuery</code> promise, the function provides the data for testing and
   * logging purposes on a successful edit and returns the associated error if
   * the operation was unsuccessful. This function is called from within the
   * main submission handler <code>main.handleSubmit</code>'s assorted
   * <code>$.prototype.Deferred</code> handlers if message walls are enabled
   * on-wiki.
   * <br />
   * <br />
   * Due to the deprecation of the old Message Walls and the loss of their
   * associated Nirvana controllers and methods, the Message Wall posting and
   * previewing functions returned rejected <code>$.Deferred</code> promises
   * and error codes for some time until the <code>createThread</code> endpoint
   * was discovered. Unlike previous methods, the new approach requires that
   * message data wikitext be parsed to HTML and subsequent parsed into a
   * ProseMirror-style "jsonModel" used to store representations of user input.
   *
   * @param {object} paramConfig - <code>object</code> with varying properties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.postMessageWallThread = function (paramConfig) {
    return $.ajax({
      method: "POST",
      url: mw.util.wikiScript("wikia") + "?" + $.param({
        controller: "Fandom\\MessageWall\\MessageWall",
        method: "createThread",
        format: "json",
      }),
      data: $.extend(false, {
        token: mw.user.tokens.get("csrfToken"),
        attachments:
          "{\"contentImages\":[],\"openGraphs\":[],\"atMentions\":[]}"
      }, paramConfig),
    });
  };

  /**
   * @description The second such method, this function is responsible for
   * posting a new talk topic to the talk page of the selected user. Like the
   * function above, it returns a resolved <code>jQuery</code> promise and
   * provides the data for testing and logging purposes on success and the
   * associated error on failed operations. It too is called from within the
   * main submission handler <code>main.handleSubmit</code>'s assorted
   * <code>$.prototype.Deferred</code> handlers if message walls are not enabled
   * on the wiki in question.
   *
   * @param {object} paramConfig - <code>object</code> with varying properties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.postTalkPageTopic = function (paramConfig) {
    return $.ajax({
      type: "POST",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        token: mw.user.tokens.get("csrfToken"),
        action: "edit",
        section: "new",
        format: "json",
      }, paramConfig),
    });
  };

  /**
   * @description In lieu of the now-removed custom preview handlers
   * <code>main.previewMessageWallThread</code> and
   * <code>main.previewTalkPageTopic</code> used on legacy wikis to parse and
   * display wikitext message content intended for user talk pages or old-style
   * Message Walls, a general-purpose wikitext parse method is used to handle
   * such tasks on UCP wikis. For now, this approach should work as expected, as
   * wikitext still serves as the default content type for user talk pages,
   * though not for new-style Message Walls.
   * <br />
   * <br />
   * As of the 4/10/2021 update series, this function is likewise used during
   * the Message Wall thread posting progression for the purposes of converting
   * the user's input wikitext to HTML, which is then further converted to a
   * ProseMirror-style "jsonModel" representation and passed to the current
   * thread-posting endpoint as message body data.
   *
   * @param {string} paramText - Wikitext content to be parsed
   * @returns {object} - <code>$.Deferred</code> object
   */
  main.getParsedWikitextContent = function (paramText) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "parse",
        title: "API",
        text: paramText,
        contentmodel: "wikitext",
        preview: true,
        format: "json"
      }
    });
  };

  /**
   * @description This function queries the API for member pages of a specific
   * namespace, the id of which is included as a property of the parameter
   * <code>object</code>. This argument is merged with the default
   * <code>$.ajax</code> parameter object and can sometimes include properties
   * related to <code>query-continue</code> requests for additional members
   * beyond the default 5000 max. The method returns a resolved
   * <code>$.Deferred</code> promise for use in attaching related callbacks to
   * handle the member pages.
   *
   * @param {object} paramConfig - <code>object</code> with varying properties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getNamespaceMembers = function (paramConfig) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        action: "query",
        list: "allpages",
        apnamespace: "*",
        aplimit: (this.flags.debug) ? 5 : "max",
        rawcontinue: true,
        format: "json",
      }, paramConfig)
    });
  };

  /**
   * @description This function queries the API for member pages of a specific
   * category, the id of which is included as a property of the parameter
   * <code>object</code>. This argument is merged with the default
   * <code>$.ajax</code> parameter object and can sometimes include properties
   * related to <code>query-continue</code> requests for additional members
   * beyond the default 5000 max. The method returns a resolved
   * <code>$.Deferred</code> promise for use in attaching related callbacks to
   * handle the member pages.
   *
   * @param {object} paramConfig - <code>object</code> with varying properties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getCategoryMembers = function (paramConfig) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        action: "query",
        list: "categorymembers",
        cmnamespace: "*",
        cmprop: "title",
        cmdir: "desc",
        cmlimit: (this.flags.debug) ? 5 : "max",
        rawcontinue: true,
        format: "json",
      }, paramConfig)
    });
  };

  /**
   * @description This function queries the API for data related to pages that
   * transclude/embed a given template somewhere. This argument is merged with
   * the default <code>$.ajax</code> parameter object and can sometimes include
   * properties related to <code>query-continue</code> requests for additional
   * members beyond the default 5000 max. The method returns a resolved
   * <code>$.Deferred</code> promise for use in attaching related callbacks to
   * handle the member pages.
   *
   * @param {object} paramConfig - <code>object</code> with varying properties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getTemplateTransclusions = function (paramConfig) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        token: mw.user.tokens.get("csrfToken"),
        action: "query",
        list: "embeddedin",
        einamespace: "*",
        eilimit: (this.flags.debug) ? 5 : "max",
        rawcontinue: true,
        format: "json",
      }, paramConfig)
    });
  };

  /**
   * @description This function is used in cases of content find-and-replace to
   * acquire the parameter page's text content. As with all <code>$.ajax</code>
   * invocations, it returns a resolved <code>$.Deferred</code> promise for use
   * in attaching handlers tasked with combing through the page's content once
   * returned.
   *
   * @param {string} paramPage - <code>string</code> title of the page
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getPageContent = function (paramPage) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "query",
        prop: "info|revisions",
        titles: paramPage,
        inprop: "protection",
        rvprop: "content|timestamp",
        //rvslots: "*",
        rvlimit: "1",
        indexpageids: "true",
        format: "json"
      }
    });
  };

  /**
   * @description This function is the primary means by which all edits are
   * committed to the database for display on the page. As with several of the
   * other API methods, this function is passed a config <code>object</code> for
   * merging with the default API parameter object, with parameter properties
   * differing depending on the operation being undertaken. Though it makes no
   * difference for the average editor, the <code>bot</code> property is set to
   * <code>true</code>. The function returns a resolved <code>$.Deferred</code>
   * promise for use in attaching handlers post-edit.
   *
   * @param {object} paramConfig - <code>object</code> with varying properties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.postPageContent = function (paramConfig) {
    return $.ajax({
      type: "POST",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        token: mw.user.tokens.get("csrfToken"),
        action: "edit",
        minor: true,
        bot: true,
        format: "json",
      }, paramConfig)
    });
  };

  /****************************************************************************/
  /*                    Prototype Generator methods                           */
  /****************************************************************************/

  /**
   * @description Originally a part of the <code>getMemberPages</code> function,
   * this method is used to return a <code>$>Deferred</code> object that passes
   * back either an error message for display in the modal status log or an
   * array containing wellformed titles of individual loose pages, categories,
   * or namespaces. If the type of entries contained with the parameter array is
   * either pages, usernames, or categories, the function checks that their
   * titles are comprised of legal characters. If the type is namespace, it
   * checks that the number passed is a legitimate integer. It also prepends the
   * appropriate namespace prefix as applicable as denoted in
   * <code>wgFormattedNamespaces</code>.
   * <br />
   * <br />
   * The function returns a <code>$.Deferred</code> promise instead of an array
   * due to the function's use in conjunction with <code>getMemberPages</code>
   * in the body of <code>handleSubmit</code> and due to the desire to only
   * permit handlers to add log entries and adjust the view. Originally, this
   * function itself added log entries, which the author felt should be the sole
   * responsibility of the handlers attached to user-facing modal buttons rather
   * than helper functions like this and <code>getMemberPages</code>.
   *
   * @param {Array<string>} paramEntries - Array of pages/cats/ns
   * @param {object} paramParameters - obj w/ type prop that may be categories,
   *                                   templates, namespaces, recipients
   * @returns {object} $deferred - Promise returned for use w/ <code>then</code>
   */
  main.getValidatedEntries = function (paramEntries, paramParameters) {

    // Declarations
    var i, n, type, entry, results, $deferred, prefix;

    // Alias
    type = paramParameters.type;

    // Returnable array of valid pages
    results = [];

    // Returned $.Deferred
    $deferred = new $.Deferred();

    // Cats and templates get prefixes
    prefix = this.globals.wgFormattedNamespaces[{
      categories: 14,
      namespaces: 0,
      templates: 10,
    }[type]] || "";

    for (i = 0, n = paramEntries.length; i < n; i++) {

      // Cache value to prevent multiple map lookups
      entry = this.capitalize(paramEntries[i].trim());

      if (
        type === "recipients" &&
        this.startsWith(entry, this.globals.wgFormattedNamespaces[2])
      ) {
        entry = entry.split(this.globals.wgFormattedNamespaces[2] + ":")[1];
      }

      // If requires prefix but entry does not have prefix
      if (!this.startsWith(entry, prefix)) {
        entry = prefix + ":" + entry;
      }

      // If legal page/category name, push into names array
      if (
        (type !== "namespaces" && this.isLegalInput(entry)) ||
        (type === "namespaces" && this.isInteger(entry))
      ) {
        results.push(entry);
      } else {
        // Error: Use of some characters is prohibited by wgLegalTitleChars
        return $deferred.reject("logErrorSecurity");
      }
    }

    if (!results.length) {
      // Error: No wellformed pages exist to edit
      $deferred.reject("logErrorNoWellformedPages");
    } else {
      $deferred.resolve(results);
    }

    return $deferred.promise();
  };

  /**
   * @description This method is used during the user messaging operation to
   * ensure that the user accounts being messaged actually exist so as to avoid
   * the intentional or unintentional addition of messages to the walls/talk
   * pages of nonexistant users. Future updates to this functionality may
   * eventually include checks for users with edit counts of 0, indicating that
   * the user in question exists but does not contribute to the wiki in on
   * which the script is being used. In such cases, perhaps the username will be
   * removed (implemented in update 4).
   * <br />
   * <br />
   * As of UCP update 2, the mechanism by which usernames are checked to ensure
   * they belong to extant user accounts has changed. Previously, each username
   * was checked via the <code>UserProfilePage.renderUserIdentityBox</code>
   * Nirvana controller individually, resulting in as many API queries as
   * intended message recipients. This was eventually replaced in favor of bulk
   * queries to API:Users in groups of 500, thus expediting the validation
   * process and rendering the approach more efficient overall.
   * <br />
   * <br />
   * As of the 4/10/2021 update (I guess we can call this UCP update 4?), the
   * approach evidenced herein has reverted to a variation of that used prior to
   * update 2, in which each username is once again checked individually prior
   * to the parsing of the wikitext and posting of the message. This was
   * required on account of the newfound need to consult data provided by the
   * <code>usercontribs</code> and <code>logevents</code> endpoints/controllers
   * to ensure the user being messaged is not only extant, but also actually
   * present and active on the wiki on which the script is being used.
   * <br />
   * <br />
   * Per the current approach, if a user has no edits on the wiki in question,
   * the user is not included as one of the recipients. If the user has edits
   * (indicating prior contributions of some sort) but has not been active in
   * the last 90 days (per the Announcements feature), the user is not included
   * as a message recipient. This approach ensures the script cannot be used to
   * spam users en mass—users cannot simply create a new wiki on which they have
   * the rights to use this script and spam users' message walls/talk pages with
   * impunity. The approach used here ensures only users who may benefit from
   * the message (active, engaged users) receive the message.
   *
   * @param {Array<string>} paramEntries - Array of usernames to check
   * @returns {object} - $.Deferred promise object
   */
  main.getActiveUsersData = function (paramEntries) {

    // Declarations
    var counter, entries, names, $getData, $getUsers, $addUsers, $returnUsers,
      wallPrefix, user, usercontribs, logevents, lastEditDate, nDaysAgo;

    // Deferred definitions
    $addUsers = new $.Deferred();
    $returnUsers = new $.Deferred();

    // paramNames iterator counter
    counter = 0;

    // Message Wall or User talk
    wallPrefix = this.globals.wgFormattedNamespaces[
      (this.flags.hasMessageWalls)
        ? 1200
        : 3
    ] + ":";

    // Array of extant usernames with prefix
    entries = [];

    // Get wellformed, formatted usernames
    $getUsers = this.getValidatedEntries(paramEntries, {
      type: "recipients"
    });

    /**
     * @description Upon the acquisition of validated usernames containing only
     * permissible characters, the associated <code>then</code> callbacks are
     * invoked, either rejecting <code>$returnUsers</code> or continuing with
     * the sorting and querying process if successful. If names have been
     * returned, they are individually checked to ensure their owners have
     * actually contributed previously to the wiki on which the script is being
     * used and are presently active on the wiki.
     * <br />
     * <br />
     * Previously, per the UCP update 2, usernames were divided into groups of
     * 500 that werew individually provided to a
     * <code>main.getUsernameData</code> function and checked in bulk. This in
     * turn replaced a much less efficient method previously employed, in
     * which the <code>UserProfilePage.renderUserIdentityBox</code> Nirvana
     * controller was queried for each individual username to determine if the
     * account exists.
     */
    $getUsers.then(function (paramNames) {

      // Log paramResults
      if (this.flags.debug) {
        window.console.log(paramEntries, paramNames);
      }

      // Cache names for external usage
      names = paramNames;

      // Indicate checking is in progress
      $returnUsers.notify("logStatusCheckingUsernames");

      // Iterate over provided groups of usernames
      this.timer = this.setDynamicTimeout(function () {
        if (counter === names.length) {
          return $addUsers.resolve(entries);
        }

        // Acquire user data
        $getData = $.when(this.getUserData(names[counter++]));

        // Once acquired, add page to array
        $getData.always($addUsers.notify);

      }.bind(this), this.config.interval);
    }.bind(this), $returnUsers.reject.bind(null));

    /**
     * @description The <code>progress</code> callback is notified and invoked
     * for each username, checking that each user in question constitutes a
     * legitimate recipient. To ensure the script is not used for the purposes
     * of spam by users who create a new wiki on which they have messaging
     * permissions, a number of restrictions have been introduced in the
     * 4/10/2021 update (UCP update 4) to ensure only active users who have
     * contributed recently are messaged.
     * <br />
     * <br />
     * The callback forbids users with editcounts of 0 or empty
     * <code>usercontribs</code> and <code>logevents</code> listings (indicating
     * users who have never edited on the wiki on which the script is being
     * used) from being messaged, thus ensuring users cannot simply create a new
     * wiki on which they have messaging permissions and spam anyone they please
     * with impunity. Further, the callback forbids users who have edited the
     * wiki previously but who have not been active in the last 90 days (a
     * number derived from the Announcements feature) from being messaged,
     * ensuring that only invested, active users may be messaged.
     */
    $addUsers.progress(function (paramResult, paramStatus, paramXHR) {
      if (this.flags.debug) {
        window.console.log(paramResult, paramStatus, paramXHR);
      }

      if (
        paramStatus !== "success" ||
        !(paramXHR.status >= 200 && paramXHR.status < 300)
      ) {
        // Error: Unable to acquire user data for user $1
        $returnUsers.notify("logErrorNoUserData", names[counter - 1]);
        return this.timer.iterate();
      }

      // Definitions
      user = paramResult.query.users[0];
      usercontribs = paramResult.query.usercontribs;
      logevents = paramResult.query.logevents;

      if (!user.hasOwnProperty("userid") || user.hasOwnProperty("missing")) {
        // Error: Unable to acquire user data for user $1
        $returnUsers.notify("logErrorNoUserData", names[counter - 1]);
        return this.timer.iterate();
      }

      // Users who have never edited on the wiki may not be messaged
      if (
        user.editcount === 0 ||
        (!usercontribs.length && !logevents.length)
      ) {
        // Error: $1 has never edited on this wiki
        this.addModalLogEntry("logErrorNotAnEditor", names[counter - 1]);
        return this.timer.iterate();
      }

      // Date of user's last edit
      lastEditDate = new Date(usercontribs[0].timestamp);

      // Get date at start of required activity period (90 days ago)
      nDaysAgo = new Date();
      nDaysAgo.setDate(nDaysAgo.getDate() - this.Utility.DAYS_ACTIVE);

      if (this.flags.debug) {
        window.console.log("nDaysAgo:", nDaysAgo.toLocaleString());
        window.console.log("lastEditDate:", lastEditDate.toLocaleString());
      }

      // Only users who have edited within the last 90 days may be messaged
      if (nDaysAgo > lastEditDate) {
        // Error: $1 is not presently active on this wiki
        this.addModalLogEntry("logErrorInactiveEditor", names[counter - 1]);
        return this.timer.iterate();
      }

      // Success: Username $1 is valid
      $returnUsers.notify("logSuccessUserExists", user.name);
      entries.push({
        name: wallPrefix + user.name,
        userid: user.userid
      });

      return this.timer.iterate();
    }.bind(this));

    /**
     * @description Once all usernames have been checked for their extant status
     * in groups of 500, the <code>done</code> callback of the resolved
     * <code>$addUsers</code> <code>$.Deferred</code> checks if there are any
     * wellformed, extant usernames able to be messaged. If there are, this list
     * is returned via resolved promise. Otherwise, an error i18n property name
     * is returned via rejected promise.
     */
    $addUsers.done(function () {
      if (entries.length) {
        // Return Quicksorted entries
        return $returnUsers.resolve(this.sort(entries)).promise();
      } else {
        // Error: No wellformed pages exist to edit
        return $returnUsers.reject("logErrorNoWellformedUsernames").promise();
      }
    }.bind(this));

    return $returnUsers.promise();
  };

  /**
   * @description This function is used to return a jQuery <code>Deferred</code>
   * object providing a <code>then</code> or <code>always</code> invocation with
   * an array of wellformed pages for editing. It accepts as input an array
   * containing titles of either categories, namespaces, or templates from which
   * to acquire member pages or transclusions. In such cases, a number of API
   * calls are made requesting the relevant members contained in the input
   * categories or namespaces. These are checked and pushed into an entries
   * array. Once complete, the entries array is returned by means of a resolved
   * <code>Deferred.prototype.promise</code>.
   * <br />
   * <br />
   * Originally, this function also served to validate loose pages passed in the
   * parameter array, running them against the legl characters and returning the
   * <code>entries</code> array for use. However, per the single responsibility
   * principle, this functionality was eventually removed into a separate method
   * called <code>getValidatedEntries</code> that is called by this method to
   * ensure that the category/namespace titles are wellformed prior to making
   * API queries.
   *
   * @param {Array<string>} paramEntries - Array of user input pages
   * @param {object} paramParameters - type (cat, ns, or tl) and/or filter
   *                                   (all, nonredirect, redirects)
   * @returns {object} $returnPages - $.Deferred promise object
   */
  main.getMemberPages = function (paramEntries, paramParameters) {

    // Declarations
    var i, n, type, filter, names, data, entries, parameters, counter, config,
      $getPages, $addPages, $getEntries, $returnPages;

    // Aliases for param properties
    type = paramParameters.type;
    filter = paramParameters.filter;

    // New pending Deferred objects
    $returnPages = new $.Deferred();
    $addPages = new $.Deferred();

    // Iterator index for setTimeout
    counter = 0;

    // getCategoryMembers or getNamespaceMembers param object
    parameters = {};

    // Arrays
    names = [];     // Store names of user entries
    entries = [];   // New entries to be returned

    config = {
      categories: {
        query: "categorymembers",
        handler: "getCategoryMembers",
        continuer: "cmcontinue",
        target: "cmtitle",
      },
      namespaces: {
        query: "allpages",
        handler: "getNamespaceMembers",
        continuer: "apcontinue",
        target: "apnamespace",
      },
      templates: {
        query: "embeddedin",
        handler: "getTemplateTransclusions",
        continuer: "eicontinue",
        target: "eititle",
      },
    }[type];

    // Get wellformed, formatted namespace numbers, category names, or templates
    $getEntries = this.getValidatedEntries(paramEntries, paramParameters);

    // Once acquired, apply to names array or pass along rejection message
    $getEntries.then(function (paramResults) {
      names = paramResults;
    }, $returnPages.reject.bind($));

    // Iterate over user input entries
    this.timer = this.setDynamicTimeout(function () {
      if (counter === names.length) {
        $addPages.resolve();

        if (entries.length) {

          // Remove all duplicates prior to sorting
          entries = this.sort(this.replaceDuplicates(entries));

          // Return Quicksorted entries bereft of duplicates
          return $returnPages.resolve(entries).promise();
        } else {
          // Error: No wellformed pages exist to edit
          return $returnPages.reject("logErrorNoWellformedPages").promise();
        }
      }

      // Set parameter target page
      parameters[config.target] = names[counter];

      // For namespaces, include filter value
      if (type === "namespaces" && filter != null) {
        parameters.apfilterredir = filter;
      }

      // Fetching member pages of $1 or Fetching transclusions of $1
      $returnPages.notify((type === "templates")
        ? "logStatusFetchingTransclusions"
        : "logStatusFetchingMembers", names[counter]);

      // Acquire member pages of cat or ns or transclusions of templates
      $getPages = $.when(this[config.handler](parameters));

      // Once acquired, add pages to array
      $getPages.always($addPages.notify);

    }.bind(this), this.config.interval);

    /**
     * @description Once the member pages from the specific category or
     * namespace have been returned following a successful API query, the
     * $addPages <code>$.Deferred</code> is notified, allowing for this callback
     * function to sanitize the returned data and push the wellformed member
     * page titles into the <code>entries</code> array. If there are still
     * remaining pages as indicated by a "query-continue" property, the counter
     * is left unincremented and the relevant continuer parameter added to the
     * <code>parameters</code> object. In any case, the function ends with a
     * call to iterate the timer.
     */
    $addPages.progress(function (paramResults, paramStatus, paramXHR) {
      if (this.flags.debug) {
        window.console.log(paramResults, paramStatus, paramXHR);
      }

      if (
        paramStatus !== "success" ||
        !(paramXHR.status >= 200 && paramXHR.status < 300)
      ) {
        $returnPages.notify("logErrorFailedFetch", names[counter++]);
        return this.timer.iterate();
      }

      // Define data
      data = paramResults.query[config.query];

      // If page doesn't exist, add log entry and continue to next iteration
      if (data == null || data.length === 0) {

        /*
         * NOTE: Data array returned may be empty if no pages matching filter
         * target are found in that batch of pages.
         *
         * <code>data.query.allpages</code> will be an empty array if user is
         * looking for redirects and none exist in current batch of pages, for
         * example.
         */

        // "Error: No matching member pages found in current batch for $1"
        $returnPages.notify("logErrorNoPagesInBatch", names[counter++]);
        return this.timer.iterate();
      }

      // Add extant page titles to the appropriate submission property
      for (i = 0, n = data.length; i < n; i++) {
        entries.push(data[i].title);
      }

      // Only iterate counter if current query has no more extant pages
      if (
        paramResults["query-continue"] ||
        paramResults.hasOwnProperty("query-continue")
      ) {
        parameters[config.continuer] =
          paramResults["query-continue"][config.query][config.continuer];
      } else {
        parameters = {};
        counter++;
      }

      // On to the next iteration
      return this.timer.iterate();
    }.bind(this));

    return $returnPages.promise();
  };

  /****************************************************************************/
  /*                      Prototype Assembly methods                          */
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
  main.assembleElement = function (paramArray) {

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
   * @description This specialized assembly function is used to create a tool
   * link to inclusion at the location specified via the <code>placement</code>
   * instance property. Like the <code>overflow</code> toolbar button on which
   * it is based, the element (in <code>string</code> form) returned from this
   * function constitutes a link element enclosed within a list element.
   *
   * @param {string} paramText - Title/item text <code>string</code>
   * @returns {string} - Assembled <code>string</code> HTML
   */
  main.assembleOverflowElement = function (paramText) {
    return this.assembleElement(
      ["li", {
        "class": this.Selectors.CLASS_PLACEMENT_OVERFLOW,
        "id": this.Selectors.ID_PLACEMENT_LIST,
       },
        ["a", {
          "id": this.Selectors.ID_PLACEMENT_LINK,
          "href": "#",
          "title": paramText,
        },
          paramText,
        ],
      ]
    );
  };

  /**
   * @description This function is one of two similar specialized assembly
   * functions used to automate the construction of several reoccuring
   * components in the modal content body. This function builds two types of
   * textfield, namely <code>input</code>s and <code>textarea</code>s. The
   * components may be disabled at creation via parameter <code>boolean</code>.
   * The function also automatically assembles element selector names and
   * I18n message titles as needed.
   *
   * @param {string} paramName - Name for message, id/classname generation
   * @param {string} paramType - <code>input</code> or <code>textarea</code>
   * @returns {string} - Assembled <code>string</code> HTML
   */
  main.assembleTextfield = function (paramName, paramType) {

    // Declarations
    var elementId, elementClass, prefix, placeholder, title, attributes;

    // Sanitize parameters
    paramName = paramName.toLowerCase();
    paramType = paramType.toLowerCase();

    // Definitions
    elementId = "ID_CONTENT_" + paramName.toUpperCase();
    elementClass = "CLASS_CONTENT_" + paramType.toUpperCase();

    // Message definitions
    prefix = "modal" + this.capitalize(paramName);
    placeholder = prefix + "Placeholder";
    title = prefix + "Title";

    attributes = {
      id: this.Selectors[elementId],
      class: this.Selectors[elementClass],
      placeholder: this.i18n.msg(placeholder).plain(),
    };

    if (paramType === "input") {
      attributes.type = "textbox";
    }

    return this.assembleElement(
      ["div", {class: this.Selectors.CLASS_CONTENT_DIV},
        ["span", {class: this.Selectors.CLASS_CONTENT_SPAN},
          this.i18n.msg(title).escape(),
        ],
        [paramType, attributes],
      ]
    );
  };

  /**
   * @description This function is one of two similar specialized assembly
   * functions used to automate the construction of several reoccuring
   * components in the modal content body. This function is used to build
   * dropdown menus from a default value and an array of required
   * <code>option</code>s. As with <code>assembleTextfield</code>, it also
   * assembles element selector names and I18n message names for all elements.
   * Per a recent update, the default dropdown option has been removed in favor
   * of a default option denoted by the <code>paramIndex</code> parameter.
   *
   * @param {string} paramName - <code>string</code> name of the dropdown
   * @param {Array<string>} paramValues - Array of dropdown options
   * @param {number} paramIndex - Optional selected index
   * @returns {string} - Assembled <code>string</code> HTML
   */
  main.assembleDropdown = function (paramName, paramValues, paramIndex) {

    // Declarations
    var i, n, titleMessage, optionMessage, prefix, options, value, attributes,
      selectedIndex;

    // Sanitize input
    paramName = paramName.toLowerCase();

    // Set parameter value or first option as index
    selectedIndex = window.parseInt(paramIndex, 10) || 0;

    // Listing of selectable dropdown options
    options = "";

    // Prefix used in title and default dropdown option
    prefix = "modal" + this.capitalize(paramName);

    // Message for span title
    titleMessage = this.i18n.msg(prefix).escape();

    // Assemble array of HTML option strings
    for (i = 0, n = paramValues.length; i < n; i++) {

      // Sanitize parameter
      value = paramValues[i].toLowerCase();

      // Option-specific message
      optionMessage = prefix + this.capitalize(value);

      // Attributes for option element
      attributes = {
        value: value,
      };

      // Choose which element to list as selected
      if (i === selectedIndex) {
        attributes.selected = "selected";
      }

      options += this.assembleElement(
        ["option", attributes,
          this.i18n.msg(optionMessage).escape(),
        ]
      );
    }

    return this.assembleElement(
      ["div", {class: this.Selectors.CLASS_CONTENT_DIV},
        ["span", {class: this.Selectors.CLASS_CONTENT_SPAN},
          titleMessage,
        ],
        ["select", {
          size: "1",
          name: paramName,
          id: this.Selectors["ID_CONTENT_" + paramName.toUpperCase()],
          class: this.Selectors.CLASS_CONTENT_SELECT,
        },
          options,
        ],
      ]
    );
  };

  /****************************************************************************/
  /*                        Prototype Modal methods                           */
  /****************************************************************************/

  // Utility methods

  /**
   * @description This modal helper function is used simply to inject modal
   * styling prior to the creation of the new <code>Modal</code> instance. It is
   * used to style scene-specific elements as well as the messaging preview
   * pseudo-scene displayed when the user attempts to parse the message content.
   * While the styles could be stored in a separate, dedicated
   * <code>MediaWiki:MassEdit/code.css</code> file on Dev, their inclusion here
   * allows for fast adjustment of selector names without the hassle of editing
   * the contents of multiple files. due to the use of a <code>Selectors</code>
   * object collating all ids and classes evidenced in the modal in a single
   * place.
   * <br />
   * <br />
   * As of UCP update 2, the previous <code>mw.util.addCSS</code> approach has
   * been augmented and adjusted via the inclusion of the external dependency
   * <code>Colors.js</code> and its related methods used to inject wiki-specific
   * default styling depending on the site theme. This allows for a more unified
   * appearance across wikis and ensures that the modal looks more or less the
   * same when viewed on legacy wikis and UCP wikis alike.
   *
   * @returns {void}
   */
  main.injectModalStyles = function () {

    // Declarations
    var selectors, colors, stringCSS, customColors;

    // Temporary aliases
    selectors = this.Selectors;
    colors = window.dev.colors;

    // Custom colors to augment dev.colors.wikia defaults
    customColors = {
      logColor: "#757575", // Common ::placeholder text color in shadow DOM
      textfieldBackground: "#FFFFFF",
      textfieldColor: "#000000",
      modalBorder: "var(--theme-border-color)"   // UCP has dedicated 2nd border
    };

    // String CSS using default wikia colors and customs
    stringCSS =
      "." + selectors.CLASS_CONTENT_CONTAINER + " {" +
        "margin: auto !important;" +
        "position: relative !important;" +
        "width: 96% !important;" +
      "}" +

      "." + selectors.CLASS_OOUI_BODY + " " +
      "." + selectors.CLASS_CONTENT_CONTAINER + " {" +
        "padding-bottom: " + this.Utility.BOTTOM_PADDING + "px !important;" +
      "}" +

      "#" + selectors.ID_CONTENT_LOG + "," +
      "." + selectors.CLASS_CONTENT_SELECT + "," +
      "." + selectors.CLASS_CONTENT_TEXTAREA + "," +
      "." + selectors.CLASS_CONTENT_INPUT + " {" +
        "width: 99.6% !important;" +
        "padding: 0 !important;" +
        "resize: none !important;" +
        "background-color: $textfieldBackground !important;" +
        "color: $textfieldColor !important;" +
        "border: 1px solid !important;" +
        "border-color: $modalBorder !important;" +
      "}" +

      // Status log and textareas have monospace font and same height
      "#" + selectors.ID_CONTENT_LOG + "," +
      "." + selectors.CLASS_CONTENT_TEXTAREA + " {" +
        "font-family: monospace !important;" +
        "height: 45px !important;" +
      "}" +

      // Message and List scenes have taller textareas
      "#" + selectors.ID_CONTENT_MESSAGE + " " +
      "." + selectors.CLASS_CONTENT_TEXTAREA + "," +
      "#" + selectors.ID_CONTENT_LIST + " " +
      "." + selectors.CLASS_CONTENT_TEXTAREA + " {" +
        "height: 85px !important;" +
      "}" +

      // Append/prepend textareas are the tallest
      "#" + selectors.ID_CONTENT_ADD + " " +
      "." + selectors.CLASS_CONTENT_TEXTAREA + " {" +
        "height: 65px !important;" +
      "}" +

      // Set placeholder color for status log messages
      "#" + selectors.ID_CONTENT_LOG + " {" +
        "color: $logColor !important;" +
        "overflow: auto !important;" +
      "}" +

      "." + selectors.CLASS_MODAL_BUTTON + " {" +
        "float: right !important;" +
        "margin-left: 5px !important;" +
        "font-size: 8pt !important;" +
      "}" +

      "span." + selectors.CLASS_MODAL_BUTTON + "[disabled] {" +
        "display: none;" +
      "}" +

      "." + selectors.CLASS_MODAL_LEFT + " {" +
        "float: left !important;" +
        "margin-left: 0px !important;" +
        "margin-right: 5px !important;" +
      "}" +

      "." + selectors.CLASS_OOUI_BODY + " " +
      "#" + selectors.ID_PREVIEW_CONTAINER + " {" +
        "margin: 20px !important;" +
      "}" +

      "#" + selectors.ID_PREVIEW_CONTAINER + " {" +
        "border: 1px solid $modalBorder;" +
        "padding: 10px !important;" +
        "overflow: auto !important;" +
        "min-height: 250px !important;" +
      "}" +

      "#" + selectors.ID_PREVIEW_BODY + " .pagetitle {" +
        "display: none !important;" +
      "}" +

      "#" + selectors.ID_PREVIEW_TITLE + " h2 {" +
        "display: inline-block !important;" +
      "}" +

      "#" + selectors.ID_PREVIEW_CLOSE + " {" +
        "display: inline-block !important;" +
        "float: right !important;" +
      "}" +

      "." + selectors.CLASS_PREVIEW_BUTTON + " {" +
        "border: none !important;" +
        "background: none !important;" +
        "color: $link !important;" +
        "cursor: pointer !important;" +
      "}" +

      "." + selectors.CLASS_PREVIEW_BUTTON + ":hover," +
      "." + selectors.CLASS_PREVIEW_BUTTON + ":focus," +
      "." + selectors.CLASS_PREVIEW_BUTTON + ":active {" +
        "outline: none !important;" +
        "background: none !important;" +
        "text-decoration: underline !important;" +
      "}";

    // Append new stylesheet to the head and return
    return colors.css(stringCSS, customColors);
  };

  /**
   * @description This one-size-fits-all helper function is used to log entries
   * in the status log on the completion of some operation or other. Originally,
   * three separate loggers were used following a Java-esque method overloading
   * approach. However, this was eventually abandoned in favor of a single
   * method that takes an indeterminate number of arguments at any time.
   *
   * @returns {void}
   */
  main.addModalLogEntry = function () {
    $("#" + this.Selectors.ID_CONTENT_LOG).prepend(
      this.i18n.msg.apply(this,
        (arguments.length === 1 && arguments[0] instanceof Array)
          ? arguments[0]
          : Array.prototype.slice.call(arguments)
      ).escape() + "<br />");
  };

  /**
   * @description This helper function is a composite of several previously
   * extant shorter utility functions used to reset the form element,
   * enable/disable various modal buttons, and log messages. It is called in a
   * variety of contexts at the close of editing operations,
   * failed API requests, and the like. Though it does not accept any formal
   * parameters, it does permit an indeterminate number of arguments to be
   * passed if the invoking function wishes to log a status message. In such
   * cases, the collated arguments are bound to a shallow array and passed to
   * <code>addModalLogEntry</code> for logging.
   *
   * @returns {void}
   */
  main.resetModal = function () {

    // Cancel the extant timer if applicable
    if (this.timer && !this.timer.isComplete) {
      this.timer.cancel();
    }

    // Add log message if i18n parameters passed
    if (arguments.length) {
      this.addModalLogEntry(Array.prototype.slice.call(arguments));
    }

    // Reset the form
    $("#" + this.Selectors.ID_CONTENT_FORM)[0].reset();

    // Re-enable modal buttons and fieldset
    this.toggleModalComponentsDisable("partial", false);
  };

  /**
   * @description This helper function is used to disable certain elements and
   * enable others depending on the operation being performed. It is used
   * primarily during editing to disable one of several element groups related
   * to either replace fields or the fieldset/modal buttons in order to prevent
   * illegitimate mid-edit changes to input. If the fieldset, etc. is disabled,
   * the method enables the buttons related to pausing and canceling the editing
   * operation, and vice versa. Likewise, the preview button is only displayed
   * when the messaging scene is being viewed, and only when the editing
   * operation is not running.
   * <br />
   * <br />
   * As of UCP update 2, this function received several significant overhauls.
   * The accepted version iterates through <code>this.modal.modal<code>'s
   * <code>buttons</code> array and sets the current disabled/enabled status of
   * the button using XOR exclusive disjunction between the
   * <code>paramDisable</code> flag and the initial baseline via of the button
   * specified in <code>button.disabled</code>. The preview button remains
   * disabled unless the scene is the messaging scene as before.
   * <br />
   * <br />
   * As of UCP update 3, a few minor changes were made to this method, most
   * notable of which was the removal of an "all" + "false" option, in which all
   * buttons may be simultaneously enabled. This behavior should never manifest,
   * so in all "all" cases, the buttons will now bulk-disable for use in scene
   * transition. Also, given the removal of <code>ModalButton</code> config data
   * to a separate pseudo-enum, the use of a static default <code>boolean</code>
   * for disabled status now allows for better XOR comparisons in "partial"
   * use cases.
   *
   * @param {string} paramOption - Either "all" or "partial"
   * @param {boolean} paramDisable - Whether to disable the select elements
   * @returns {void}
   */
  main.toggleModalComponentsDisable = function (paramOption, paramDisable) {
    if ($.inArray(paramOption, ["all", "partial"]) === -1) {
      return;
    }

    // Sanitize boolean argument; "all"s should always bulk-disable
    paramDisable =
      (paramOption === "all" || typeof paramDisable !== "boolean") ||
      paramDisable;

    // Debug sanitized input
    if (this.flags.debug) {
      window.console.log(paramOption, paramDisable);
    }

    // Declarations
    var i, n, $scene, isMessaging, buttons, button, $fieldset, isAll,
      defaultDisable;

    // Definitions
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];
    $fieldset = $("#" + this.Selectors.ID_CONTENT_FIELDSET);
    isMessaging = ($scene.value === "message" && $scene.selectedIndex === 2);
    isAll = paramOption === "all";
    buttons = this.modal.modal.buttons;

    // Use each button's disabled prop as default baseline to compare against
    for (i = 0, n = buttons.length; i < n; i++) {
      button = buttons[i];
      defaultDisable = this.Buttons[button.event.toUpperCase()].DISABLED;

      // Disabled if "all" or if behavior is expected for "partial"
      button.setDisabled(isAll || (button.event === "preview")
        ? (!isMessaging || paramDisable)
        : Boolean(paramDisable ^ defaultDisable)); // Toggle mechanism
      $("#" + button.id).attr("disabled", button.disabled);
    }

    // Fieldset is disabled independently of buttons
    $fieldset.attr("disabled", isAll || paramDisable);
  };

  // Preview methods

  /**
   * @description Like the similar modal method <code>attachModalEvents</code>,
   * this function is invoked once the preview has been displayed to the user to
   * ensure that all interactive elements are properly attached to their
   * relevant listeners. It supports messages containing collapsible content and
   * adds a relevant handler for the close button which removes the temporary
   * preview container element and redisplays the message scene again once
   * clicked.
   *
   * @returns {void}
   */
  main.attachPreviewEvents = function () {

    // Declarations
    var container, $button, $messaging;

    // Definitions
    container = "#" + this.Selectors.ID_PREVIEW_CONTAINER;
    $button = $("#" + this.Selectors.ID_PREVIEW_BUTTON);
    $messaging = $("#" + this.Selectors.ID_CONTENT_MESSAGE);

    // Support collapsibles
    mw.hook("wikipage.content").fire(
      // mw.util.$content[0].id vs mw.util.$content.selector
      $(container + " #" + mw.util.$content[0].id));

    // Fade out of preview on click
    $button.on("click", this.handleClear.bind(this, {
      before:
        function () {
          $(container).remove();
          $messaging.show();
        }.bind(this),
      after: this.toggleModalComponentsDisable.bind(this, "partial", false)
    }));
  };

  /**
   * @description Like the similar modal builder <code>buildModalContent</code>,
   * this function returns a <code>string</code> HTML framework for the message
   * preview functionality to which the contents of the message and title are
   * added. Rather than recreate this <code>string</code> each time the user
   * wants to preview a new message, the contents of this function are stored to
   * the <code>modal.preview</code> object property for caching and easier
   * retrieval.
   *
   * @returns {string} - The assembled <code>string</code> of preview HTML
   */
  main.buildPreviewContent = function () {
    return this.assembleElement(
      ["div", {id: this.Selectors.ID_PREVIEW_CONTAINER},
        ["div", {id: this.Selectors.ID_PREVIEW_TITLE},
          ["h2", {},
            "$1",
          ],
          ["div", {id: this.Selectors.ID_PREVIEW_CLOSE},
            ["button", {
              class: this.Selectors.CLASS_PREVIEW_BUTTON,
              id: this.Selectors.ID_PREVIEW_BUTTON
            },
              "(" + this.i18n.msg("buttonClose").escape() + ")",
            ]
          ]
        ],
        ["hr"],
        ["div", {id: this.Selectors.ID_PREVIEW_BODY},
         "$2",
        ],
      ]
    );
  };

  /**
   * @description Like the similar modal function <code>displayModal</code>,
   * this function is used to display the preview container in the messaging
   * modal scene on presses of the "Preview" modal button. Rather than reset the
   * contents of the modal itself by means of
   * <code>Modal.prototype.setContent</code>, an action which would delete the
   * data used to construct the preview and require that the user reenter the
   * content on exiting out of the preview scene, this function instead hides
   * the main messaging scene and appends a temporary <code>div</code> to the
   * modal that is removed once the user closes the preview by means of the
   * exit button.
   *
   * @param {string} paramBody - The contents of the message preview
   * @returns {void}
   */
  main.displayPreview = function (paramBody) {

    // Declarations
    var $scene, previewScene, contents, $byline, $messaging, $modal,
      isMessaging, modalBodyTarget;

    // Definitions
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];
    isMessaging = ($scene.value === "message" && $scene.selectedIndex === 2);
    $byline = $("#" + this.Selectors.ID_CONTENT_BYLINE).val();
    $messaging = $("#" + this.Selectors.ID_CONTENT_MESSAGE);

    // Modal targets
    modalBodyTarget = " ." + this.Selectors.CLASS_OOUI_BODY;
    $modal = $("#" + this.Selectors.ID_MODAL_CONTAINER + modalBodyTarget);

    // Ensure messaging scene is shown
    if (!isMessaging || !this.modal.modal) {
      return;
    }

    // See if the preview scene has been saved to storage
    previewScene = this.queryStorage("preview");

    // Preview modal scene contents
    contents = ((previewScene != null)
      ? previewScene
      : this.queryStorage("preview", this.buildPreviewContent())
    ).replace("$1", $byline).replace("$2", paramBody);

    // Hide the messaging rather than reset the modal contents
    $messaging.hide();

    // Add the preview container
    $modal.append(contents);
  };

  // Modal methods

  /**
   * @description As with the preview-specific function above, namely
   * <code>attachPreviewEvents</code>, this function serves the purposes of
   * ensuring that all interactive elements in the various modal scenes are
   * provided their appropriate listeners. This function handles the disabling
   * of various components based on the actions performed and invokes
   * <code>jQuery.prototype.linksuggest</code> for various elements that may
   * have wikitext link content on each scene change. As of UCP update 2, the
   * handler also handles the enabling of the handler attached to the scene-
   * selection dropdown that mediates scene changing.
   *
   * @returns {void}
   */
  main.attachModalEvents = function () {

    // Declarations
    var i, n, element, elements, height;

    // Definitions
    height = 0;
    elements = [
      "CLASS_OOUI_HEAD",          // UCP modal header
      "CLASS_OOUI_FOOT",          // UCP modal footer
      "CLASS_CONTENT_CONTAINER",  // Inner modal body content
    ];

    // Dynamically adjust modal height on UCP wikis (hacky)
    for (i = 0, n = elements.length; i < n; i++) {
      element = "." + this.Selectors[elements[i]];
      height += $(element).height();
    }

    $("." + this.Selectors.CLASS_OOUI_FRAME).height(height +
      (this.Utility.BOTTOM_PADDING * 2));

    // Apply listener to scene-selection dropdown prior to init end
    if (!this.modal.isReady) {
      $(document).on("change", "#" + this.Selectors.ID_CONTENT_SCENE,
        this.handleClear.bind(this, true));
    }

    // Disable certain components
    this.toggleModalComponentsDisable("partial", false);
  };

  /**
   * @description As with the similar preview-specific function
   * <code>buildPreviewContent</code>, this method builds a <code>string</code>
   * HTML framework to which will be added scene-specific element selectors and
   * body content. As with <code>buildPreviewContent</code>, this content is
   * only created once within the body of <code>buildModalScenes</code>, its
   * value cached in a local variable for use with all scenes requiring
   * assembly and used in conjunction with <code>String.prototype.replace</code>
   * to make scene-specific adjustments.
   *
   * @returns {string} - Assembled HTML string framework
   */
  main.buildModalContent = function () {
    return this.assembleElement(
      ["section", {
        id: "$1",
        class: this.Selectors.CLASS_CONTENT_CONTAINER,
      },
        ["form", {
          id: this.Selectors.ID_CONTENT_FORM,
          class: this.Selectors.CLASS_CONTENT_FORM,
        },
          ["fieldset", {id: this.Selectors.ID_CONTENT_FIELDSET},
            "$2",
            "$3",
          ],
          ["hr"],
        ],
        ["div", {class: this.Selectors.CLASS_CONTENT_DIV},
          ["span", {class: this.Selectors.CLASS_CONTENT_SPAN},
            this.i18n.msg("modalLog").escape(),
          ],
          ["div", {
            id: this.Selectors.ID_CONTENT_LOG,
            class: this.Selectors.CLASS_CONTENT_DIV,
          }],
        ],
      ]
    );
  };

  /**
   * @description In its initial incarnation under the original title of
   * <code>main.buildModalScenes</code>, this function was used to assemble all
   * four main so-called "scenes" that make up the body content of the
   * <code>Modal</code> instance and serve as the user interfaces for the
   * associated operations. However, the method was inherently inefficient for
   * building all four scenes every time MassEdit was initialized by the user.
   * Though the scenes were temporarily cached in a local
   * <code>main.modal.scenes</code> storage <code>object</code>, they were not
   * added to <code>localStorage</code> and thus were rebuilt every time the
   * user navigated away from the page on which MassEdit was loaded.
   * <br />
   * <br />
   * To fix this inefficiency and improve the process, the author eventually
   * replaced this approach with a lazy-load-style system that only builds
   * scenes as they are needed and stores preassembled scenes in the browser
   * <code>localStorage</code> object via <code>$.store</code> for subsequent
   * reuse. To accomplish this, this function was stripped down and rewritten.
   * Under its present design, the function first checks storage to see if the
   * scene has already been built, returning the scene from storage if it has
   * been assembled before. Otherwise, the method builds the string HTML from
   * design schema housed in <code>main.Scenes</code>, adds that HTML to
   * storage, and returns the result.
   *
   * @param {string} paramScene - Name of the desired scene to build
   * @returns {string} - Assembled string HTML of the desired scene
   */
  main.buildModalScene = function (paramScene) {

    // Declarations
    var i, j, m, n, tempScene, sceneNames, assembledScene, framework, enumScene,
      dropdownArgs, elements, enumSchema, enumArrays, selector, storedResults;

    // See if a copy of this scene already exists in storage
    storedResults = this.queryStorage(paramScene);

    // If the scene exists in storage, return that copy
    if (storedResults != null && storedResults.length) {
      return storedResults;
    }

    // Basic modal form framework
    framework = this.buildModalContent();

    // Grab scene config object associated with input argument string
    enumScene = this.Scenes[paramScene.toUpperCase()];

    // Temporary array for scene names used to construct dropdown options
    sceneNames = [];

    // Better than Object.keys(this.Scenes) since key names could change
    for (tempScene in this.Scenes) {
      if (this.Scenes.hasOwnProperty(tempScene)) {
        sceneNames.push(this.Scenes[tempScene].NAME);
      }
    }

    // Make copy of defaults and add the index
    dropdownArgs = ["scene", sceneNames, enumScene.POSITION];

    // New defaultArgs object logged
    if (this.flags.debug) {
      window.console.log(dropdownArgs);
    }

    // Init string HTML
    elements = "";

    // ID selector
    selector = "ID_CONTENT_" + enumScene.NAME.toUpperCase();

    // Use schema to dynamically construct string HTML from builder functions
    for (i = 0, n = enumScene.SCHEMA.length; i < n; i++) {
      enumSchema = enumScene.SCHEMA[i];
      enumArrays = enumSchema.PARAMETER_ARRAYS;
      for (j = 0, m = enumArrays.length; j < m; j++) {
        elements += this[enumSchema.HANDLER].apply(this, enumArrays[j]);
      }
    }

    // Make use of modal framework to insert scene-specific HTML
    assembledScene =
      framework
        .replace("$1", this.Selectors[selector])
        .replace("$2", this.assembleDropdown.apply(this, dropdownArgs))
        .replace("$3", elements);

    // Add this scene to storage for subsequent usage
    this.queryStorage(paramScene, assembledScene);

    // Return scene HTML
    return assembledScene;
  };

  /**
   * @description This method is used to create a new <code>Modal</code>
   * instance that serves as the primary interface of the script. It sets all
   * click events, defines all modal <code>footer</code> buttons in the modal,
   * and assembles all the so-called "scenes" related to the various operations
   * supported by MassEdit. Originally, this function also injected the modal
   * CSS styling prior to creation of the modal, though for the purposes of
   * ensuring single responsibility for all functions, the styling was moved
   * into a separate function, namely <code>injectModalStyles</code>.
   * <br />
   * <br />
   * As of UCP update 3, this method has been refactored significantly. All
   * <code>ModalButton</code> config objects have been moved to a dedicated
   * <code>main</code> pseudo-enum, <code>Buttons</code>, leaving this function
   * to handle the automatic generation of buttons and associated click events
   * on a dynamic basis. This replaces the previous approach, in which the new
   * <code>Modal</code> instance was created from static data stored within the
   * function itself.
   *
   * @returns {object} - A new <code>Modal</code> instance
   */
  main.buildModal = function () {

    // Declaration
    var modal;

    // Base Modal config object definition
    modal = {
      content: this.buildModalScene(this.Scenes[this.Utility.FIRST_SCENE].NAME),
      id: this.Selectors.ID_MODAL_CONTAINER,
      size: "large",
      title: this.i18n.msg("buttonScript").escape(),
    };

    // Auto-generate button config objects from Buttons pseudo-enum
    modal.buttons = Object.values(this.Buttons).map(function (paramButton) {
      if (paramButton.hasOwnProperty("HANDLER")) {
        (modal.events = modal.events || {})[paramButton.EVENT] =
          this[paramButton.HANDLER].bind(this);
      }

      return {
        text: this.i18n.msg(paramButton.TEXT).escape(),
        event: paramButton.EVENT,
        primary: false,
        //disabled: paramButton.DISABLED,
        id: this.Selectors[paramButton.ID],
        classes: paramButton.CLASSES.map(function (paramClass) {
          return this.Selectors[paramClass];
        }.bind(this)),
      };
    }.bind(this));

    // Return new Modal instance
    return new window.dev.modal.Modal(modal);
  };

  /**
   * @description This method is the primary mechanism by which the modal is
   * displayed to the user. If the modal has not been previously assembled, the
   * function constructs a new <code>Modal</code> instance via an invocation of
   * <code>buildModal</code>, creates the modal, and attaches all the requisite
   * event listeners related to enabling <code>linksuggest</code> and find-and-
   * replace-specific modal elements (linksuggest is enabled for the content
   * <code>textarea</code> and the edit summary <code>input</code>).
   * <br />
   * <br />
   * Once all listeners have been attached, the new modal is displayed to the
   * user. If the modal has been assembled prior to method invocation, the
   * instance is displayed to the user and the method exits.
   *
   * @returns {void}
   */
  main.displayModal = function () {
    if (this.modal.modal != null) {
      this.modal.modal.show();
      return;
    }

    // Apply modal CSS styles prior to creation
    this.injectModalStyles();

    // Construct new Modal instance
    this.modal.modal = this.buildModal();

    // Remove duplicative close button on UCP wikis
    this.modal.modal.buttons.pop();

    // Create, then apply all relevant listeners and events
    this.modal.modal.create()
      .then(this.modal.modal.show.bind(this.modal.modal))
      .then(this.attachModalEvents.bind(this))
      .then(function () {

        // Indicate that modal initialization is complete
        this.modal.isReady = true;

        // Log modal instance variable
        if (this.flags.debug) {
          window.console.log("this.modal: ", this.modal);
        }
      }.bind(this));
  };

  /****************************************************************************/
  /*                      Prototype Event handlers                            */
  /****************************************************************************/

  /**
   * @description Arguably the most important method of the program, this
   * function coordinates the entire mass editing process from the initial press
   * of the "Submit" button to the conclusion of the editing operation. The
   * entire workings of the process were contained within a single method to
   * assist in maintaining readability when it comes time to invariably repair
   * bugs and broken functionality. The other two major methods used by this
   * function are <code>getMemberPages</code> and
   * <code>getValidatedEntries</code>, both of which are used to sanitize input
   * and return wellformed loose member pages if applicable.
   * <br />
   * <br />
   * The function collates all extant user input added via <code>textarea</code>
   * and <code>input</code> fields before running through a set of conditional
   * checks to determine if the user can continue with the requested editing
   * operation. If the user may proceed, the function makes use of a number of
   * <code>$.Deferred</code> promises to coordinate the necessary acquisition of
   * wellformed pages for editing. In cases of categories/namespaces, member
   * pages are retrieved and added to the editing queue for processing.
   * <br />
   * <br />
   * As of the latest update implementing additional editing functionality, this
   * method was temporarily separated into four separate methods related to each
   * of the four scenes. However, as the same progression of sanitizing input,
   * acquiring pages, iterating over pages, and logging accordingly was
   * evidenced in all operations, these handlers were once again merged into
   * this single method to prevent copious amounts of copy/pasta. The only
   * operation that exits early and does not iterate is the listing operation,
   * which merely acquires lists of category members and prepends them to an
   * element.
   * <br />
   * <br />
   * In edit to the last sentence of the previous paragraph, the most recent
   * update to the function added a find feature that like the find-and-replace
   * functionality iterates over a list of pages in search for a specific target
   * <code>string</code>. However, like the listing functionality, the find
   * feature exits early and does not edit the pages it collates and peruses,
   * making it safe for any user to access regardless of user rights. There are
   * likely more efficient and better optimized ways than that employed to bring
   * this feature to life, but at present, the use of regex is sufficient to
   * provide the desired search and locate feature.
   *
   * @returns {void}
   */
  main.handleSubmit = function () {
    if (this.timer && !this.timer.isComplete) {
      if (this.flags.debug) {
        window.console.dir(this.timer);
      }
      return;
    }

    // Declarations
    var $action, $type, $case, $match, $filter, $content, $target, $indices,
      indices, $pages, pages, results, $byline, $summary, counter, config, data,
      pageIndex, newText, $getPages, $postPages, $getNextPage, $getPageContent,
      $postPageContent, error, $scene, isCaseSensitive, isUserRegex, isReplace,
      isAddition, isMessaging, isListing, isFinding, $members, $selected, $body,
      pagesType, replaceOccurrences, newRegExp, timerInterval, getterParameters,
      isWikitextParsed;

    // Dropdowns
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];
    $action = $("#" + this.Selectors.ID_CONTENT_ACTION)[0];
    $type = $("#" + this.Selectors.ID_CONTENT_TYPE)[0];
    $case = $("#" + this.Selectors.ID_CONTENT_CASE)[0];
    $match = $("#" + this.Selectors.ID_CONTENT_MATCH)[0];
    $filter = $("#" + this.Selectors.ID_CONTENT_FILTER)[0];

    // Textareas/inputs
    $target = $("#" + this.Selectors.ID_CONTENT_TARGET).val();
    $indices = $("#" + this.Selectors.ID_CONTENT_INDICES).val();
    $content = $("#" + this.Selectors.ID_CONTENT_CONTENT).val();
    $pages = $("#" + this.Selectors.ID_CONTENT_PAGES).val();
    $summary = $("#" + this.Selectors.ID_CONTENT_SUMMARY).val();

    // For acquiring text of selected option
    $selected = $("#" + this.Selectors.ID_CONTENT_TYPE + " option:selected");

    // Messaging exclusives
    $body = $("#" + this.Selectors.ID_CONTENT_BODY).val();
    $byline = $("#" + this.Selectors.ID_CONTENT_BYLINE).val();

    // Listing exclusive
    $members = $("#" + this.Selectors.ID_CONTENT_MEMBERS);

    // Cache frequently used boolean flags
    isReplace =
      ($scene.value === "replace" && $scene.selectedIndex === 0);
    isAddition =
      ($scene.value === "add" && $scene.selectedIndex === 1);
    isMessaging =
      ($scene.value === "message" && $scene.selectedIndex === 2);
    isListing =
      ($scene.value === "list" && $scene.selectedIndex === 3);
    isFinding =
      ($scene.value === "find" && $scene.selectedIndex === 4);

    // Substitute for $1 in logErrorNoPages
    pagesType = ((isMessaging)
      ? this.i18n.msg("modalTypeUsernames").escape()
      : $selected.text()).toLowerCase();

    // If no scene selected (should not happen)
    if (!isReplace && !isAddition && !isMessaging && !isListing && !isFinding) {
      return;

    // Is not in the proper rights group
    } else if (!isListing && !isFinding && !this.hasRights(isMessaging)) {
      this.resetModal("logErrorUserRights");
      return;

    // Is either append/prepend with no content input included
    } else if (isAddition && !$content) {
      this.addModalLogEntry("logErrorNoContent");
      return;

    // Is find-and-replace or search with no target content included
    } else if ((isReplace || isFinding) && !$target) {
      this.addModalLogEntry("logErrorNoTarget");
      return;

    // No pages included
    } else if (!$pages) {
      this.addModalLogEntry("logErrorNoPages", pagesType);
      return;

    // If edit summary is greater than permitted max of 800 characters
    } else if ($summary && $summary.length > this.Utility.MAX_SUMMARY_CHARS) {
      this.addModalLogEntry("logErrorOverlongSummary");
      return;

    // If message title is not legal
    } else if (isMessaging && !this.isLegalInput($byline)) {
      this.addModalLogEntry("logErrorSecurity");
      return;

    // If no message body is included
    } else if (isMessaging && !$body) {
      this.addModalLogEntry("logErrorMissingBody");
      return;
    }

    // Status log message, scene-dependent
    this.addModalLogEntry(
      (isReplace || isAddition)
        ? "logStatusEditing"
        : (isMessaging)
          ? "logStatusMessaging"
          : "logStatusGenerating"
    );
    this.toggleModalComponentsDisable("partial", true);

    // Find and find-and-replace-specific variable definitions
    if (isReplace || isFinding) {

      // Whether not search and replace is case sensitive
      isCaseSensitive = ($case.selectedIndex === 0 &&
        $case.value === "sensitive");

      // Whether user has input regex for finding & replacing
      isUserRegex = ($match.selectedIndex === 1 &&
        $match.value === "regex");

      // Build new RegExp object from target text
      newRegExp = this.buildRegExp($target, isUserRegex, isCaseSensitive);
    }

    // Find-and-replace specific variable definition
    if (isReplace) {

      // Only wellformed integers should be included as f-n-r indices
      indices = $indices.split(",").map(function (paramEntry) {
        if (this.isInteger(paramEntry.trim())) {
          return window.parseInt(paramEntry, 10);
        }
      }.bind(this)).filter(function (paramEntry) {
        return paramEntry != null; // Avoid cases of [undefined]
      });

      // Define regex, etc. only once per submission operation using closure
      try {
        replaceOccurrences =
          this.replaceOccurrences(newRegExp, $content, indices);
      } catch (paramError) {
        // Catch malformed regex in target field
        this.resetModal("logErrorSecurity");

        if (this.flags.debug) {
          window.console.error(paramError);
        }
        return;
      }

      // Check closure scope's variables under [[Scopes]]
      if (this.flags.debug) {
        window.console.dir(replaceOccurrences);
      }
    }

    // Array of pages/categories/namespaces
    pages = $pages.split(/[\n]+/).filter(function (paramEntry) {
      return paramEntry !== "";
    });

    // Page counter for setInterval
    counter = 0;

    // Default page editing parameters
    config = {};

    // Interval for this.timer
    /*
     * Note: No apparent rate limit for an operation composed solely of GET
     * requests. Tested find functionality in a program test run that submitted
     * over 20,000 GET requests over a span of several hours with the timer
     * interval set to 0. No throttling was observed, so I guess it's fine?
     * Investigate further at some point.
     */
    timerInterval = (isFinding) ? 0 : this.config.interval;

    // New pending status Deferreds
    $postPages = new $.Deferred();
    $getNextPage = new $.Deferred();

    // Log flag for inspection
    if (this.flags.debug) {
      window.console.log("hasMessageWalls: ", this.flags.hasMessageWalls);
    }

    /**
     * @description The <code>$getPages</code> <code>$.Deferred</code> is used
     * to acquire either wellformed loose page titles or the titles of member
     * pages belonging to input categories or namespaces. In cases of user
     * messaging, the function makes use of <code>WgMessageWallsExist</code>
     * functionality to determine whether the wiki on which the script is being
     * used has enabled message walls. This knowledge is required as the prefix
     * applied to username input will differ ("Message Wall:" vs "User talk:")
     * accordingly. Similar functionality can be glimpsed in
     * <code>handlePreview</code>.
     */
    $getPages = new $.Deferred(function ($paramOuter) {
      new $.Deferred(function ($paramInner) {
        (!isMessaging || this.flags.hasMessageWalls != null)
          ? $paramInner.resolve().promise()
          : mw.config.get("wgMessageWallsExist").then(
              function () {
                return $paramInner.resolve(true).promise();
              }.bind(this),

              function () {
                return $paramInner.resolve(false).promise();
              }.bind(this)
            );
      }.bind(this)).then(
        function (paramHasWalls) {
          if (paramHasWalls != null) {
            this.flags.hasMessageWalls = paramHasWalls;
          }

          getterParameters = {};
          if (!isMessaging) {
            getterParameters.type = ($type != null) ? $type.value : null;
            getterParameters.filter = ($filter != null) ? $filter.value : null;
          }

          // Get list of wellformed pages/usernames or member pages
          return this[
            (isListing || (!isMessaging && $type.value !== "pages"))
              ? "getMemberPages"
              : (isMessaging)
                ? "getActiveUsersData"
                : "getValidatedEntries"
          ](pages, getterParameters);
        }.bind(this)
      ).then(
        $paramOuter.resolve.bind($), // $getPages.done
        $paramOuter.reject.bind($),  // $getPages.fail
        $paramOuter.notify.bind($)   // $getPages.progress
      );
    }.bind(this));

    /**
     * @description The resolved <code>$getPages</code> returns an array of
     * loose pages from a namespace or category, or returns an array of checked
     * loose pages if the individual pages option is selected or usenames are
     * inputted. Once resolved, assuming the user is not simply generating a
     * pages list, <code>$getPages</code> uses a <code>setDynamicTimeout</code>
     * to iterate over the pages, optionally acquiring page content for
     * find-and-replace. Once done, an invocation of <code>notify</code> calls
     * <code>$postPages.progress</code> to assemble the parameters needed to
     * edit the page in question. Once all pages have been edited, the pending
     * <code>$.Deferred</code>s are resolved and the timer exited.
     */
    $getPages.done(function (paramResults) {
      pages = paramResults;

      // Log pages list (members or wellformed pages)
      if (this.flags.debug) {
        window.console.log("$getPages: ", pages);
      }

      // Listing activities end once members are acquired and shown to the user
      if (isListing) {
        // Add category members to textarea
        $members.text(pages.join("\n"));

        $getNextPage.resolve();
        $postPages.resolve("logSuccessListingComplete");
        return;
      }

      // When finding, create array for pages with target text in content
      if (isFinding) {
        results = [];

        this.addModalLogEntry("logStatusGenerating");
      }

      // Iterate over pages
      this.timer = this.setDynamicTimeout(function () {
        if (counter === pages.length) {
          $getNextPage.resolve();

          if (isFinding) {
            results = this.sort(results);

            if (this.flags.debug) {
              window.console.log("results: ", results);
            }

            $members.text(results.join("\n"));
          }

          $postPages.resolve((isFinding)
            ? "logSuccessListingComplete"
            : "logSuccessEditingComplete");
        } else {
          $getPageContent = (!isMessaging)
            ? this.getPageContent(pages[counter])
            : (isMessaging && this.flags.hasMessageWalls && !isWikitextParsed)
              ? this.getParsedWikitextContent($body)
              : new $.Deferred().resolve({}).promise();

          // Grab data, extend parameters, then edit the page
          $getPageContent.always($postPages.notify);
        }
      }.bind(this), timerInterval);
    }.bind(this));

    /**
     * @description In the cases of failed loose page acquisitions, either from
     * a failed API GET request or from a lack of wellformed input loose pages,
     * the relevant log entry returned from the getter function's
     * <code>$.Deferred</code> is logged, the timer canceled, and the modal form
     * re-enabled by means of <code>resetModal</code>.
     */
    $getPages.fail(this.resetModal.bind(this));

    /**
     * @description Whenever the getter function (<code>getMemberPages</code> or
     * <code>getValidatedEntries</code>) needs to notify its invoking function
     * of a new ongoing category/namespace member acquisition operation, the
     * returned status message is acquired and added to the modal log.
     */
    $getPages.progress(this.addModalLogEntry.bind(this));

    /**
     * @description Once the <code>$postPages</code> <code>Deferred</code> is
     * resolved, indicating the completion of the requested mass edits, a final
     * status message is logged, the form reenabled and reset for a new
     * round, and the <code>setDynamicTimeout</code> timer canceled by means of
     * <code>resetModal</code>.
     */
    $postPages.always(this.resetModal.bind(this));

    /**
     * @description The <code>progress</code> handler is used to extend the
     * <code>parameters</code> object with properties relevant to the action
     * being performed (i.e. addition, replace, or messaging). Once complete,
     * the modified page content is committed and the edit made by means of
     * a scene-specific handler, namely either <code>postPageContent</code>,
     * <code>postTalkPageTopic</code>, or <code>postMessageWallThread</code>.
     * Once the edit is complete and a resolved promise returned,
     * <code>$postPageContent</code> pings the pending <code>$getNextPage</code>
     * <code>$.Deferred</code> to log the relevant messages and iterate on to
     * the next page to be edited.
     * <br />
     * <br />
     * This handler is also home to the core functionality of the find feature.
     * It doesn't really fit here, given that this function is supposed to just
     * assemble parameters for the various POST request functions, but I can't
     * really see where else it should go. The contents of each page are tested
     * against the assembled <code>RegExp</code> object (optimize approach,
     * perhaps?) and added to a <code>results</code> array if a match is found.
     * Program flow ends there. The <code>$getNextPage</code>
     * <code>$.Deferred</code> is never pinged as it is with the other options,
     * as no posting or editing is done by the find feature.
     */
    $postPages.progress(function (paramResults) {
      if (this.flags.debug) {
        window.console.log("$postPages results: ", paramResults);
      }

      // Reduce some code repetition via consolidation of shared code
      if (!isMessaging) {

        // Make sure returned results have a "query" property
        if (
          paramResults.query == null ||
          !paramResults.hasOwnProperty("query")
        ) {
          this.addModalLogEntry("logErrorEditing", pages[counter++]);
          return this.timer.iterate();
        }

        // Definitions
        pageIndex = Object.keys(paramResults.query.pages)[0];
        data = paramResults.query.pages[pageIndex];
      }

      // Set default posting config (unneeded when searching or messaging)
      if (isReplace || isAddition) {
        config = {
          handler: "postPageContent",
          parameters: {
            title: pages[counter],
            token: mw.user.tokens.get("csrfToken"),
            summary: $summary,
          }
        };
      }

      // Addition-specific parameter
      if (isAddition) {

        // "appendtext" or "prependtext"
        if (!this.flags.testing) {
          config.parameters[$action.value.toLowerCase() + "text"] = $content;
        }
      }

      // Find and find-and-replace-specific error checks
      if (isReplace || isFinding) {

        // Shim to handle ArticleComments that do not have revision history
        if (
          !data.hasOwnProperty("revisions") ||
          !this.isThisAn("Array", data.revisions)
        ) {
          this.addModalLogEntry("logErrorEditing", pages[counter++]);
          return this.timer.iterate();
        }

        // Return if page doesn't exist to the server
        if (pageIndex === "-1") {
          this.addModalLogEntry("logErrorNoSuchPage", pages[counter++]);
          return this.timer.iterate();
        }
      }

      // Find-specific check (program flow ends here for finding functionality)
      if (isFinding) {

        // If target text is located in current page, add to list and iterate
        if (newRegExp.test(data.revisions[0]["*"])) {
          results.push(pages[counter]);
        }

        counter++;
        return this.timer.iterate();
      }

      // Find-and-replace parameters
      if (isReplace) {

        // isReplace-specific parameter
        config.parameters.text = data.revisions[0]["*"];

        // Replace instances of chosen text with inputted new text
        newText = replaceOccurrences(config.parameters.text);

        // Return if old & new revisions are identical in content
        if (newText === config.parameters.text) {
          // Error: No instances of $1 found in $2.
          this.addModalLogEntry("logErrorNoMatch", $target, pages[counter++]);
          return this.timer.iterate();
        } else {
          if (!this.flags.testing) {
            config.parameters.text = newText;
          }
        }
      }

      // Messaging parameters
      if (isMessaging) {
        if (
          paramResults.parse != null &&
          paramResults.hasOwnProperty("parse") &&
          !isWikitextParsed
        ) {
          $body = this.buildJsonModel(paramResults.parse.text["*"]);
          if (this.flags.debug) {
            window.console.log("buildJsonModel: ", $body);
          }
        }

        isWikitextParsed = isWikitextParsed || true;
        config = [
          {
            handler: "postTalkPageTopic",
            parameters: (this.flags.testing) ? {} : {
              sectiontitle: $byline,
              text: $body,
              title: pages[counter].name,
            }
          },
          {
            handler: "postMessageWallThread",
            parameters: (this.flags.testing) ? {} : {
              title: $byline,
              jsonModel: $body,
              wallOwnerId: pages[counter].userid,
            }
          },
        ][+this.flags.hasMessageWalls];
      }

      // Log all config handlers and parameters
      if (this.flags.debug) {
        window.console.log("Config: ", config);
      }

      // Deferred attached to posting of data
      $postPageContent = $.when(this[config.handler](config.parameters));
      $postPageContent.always($getNextPage.notify);

    }.bind(this));

    /**
     * @description The pending state <code>$getNextPage</code>
     * <code>$.Deferred</code> is pinged by <code>$postPageContent</code> once
     * an POST request is made and a resolved status <code>$.Deferred</code>
     * returned. The <code>progress</code> callback takes the resultant success/
     * failure data and logs the relevant messages before moving the operation
     * on to the iteration of the <code>setDynamicTimeout</code> timer. If the
     * user has somehow been ratelimited, the function introduces a 35 second
     * cooldown period before undertaking the next edit and pushes the unedited
     * page back onto the <code>pages</code> stack.
     */
    $getNextPage.progress(function (paramData, paramStatus, paramXHR) {
      if (this.flags.debug) {
        window.console.log("$getNextPage results: ", paramData, paramStatus,
          paramXHR);
      }

      error = (paramData.error && paramData.error.code)
        ? paramData.error.code
        : "unknownerror";

      // Success differs depending on status of message walls on wiki
      if (
        (
          (!isMessaging || (isMessaging && !this.flags.hasMessageWalls)) &&
          paramData.edit &&
          paramData.edit.result === "Success"
        ) ||
        (
          isMessaging && this.flags.hasMessageWalls && paramStatus === "success"
            && paramXHR.status >= 200 && paramXHR.status < 300
        )
      ) {
        this.addModalLogEntry("logSuccessEditing", (pages[counter].name == null)
          ? pages[counter++]
          : pages[counter++].name
        );
      } else if (error === "ratelimited") {

        // Show ratelimit message with the delay in seconds
        this.addModalLogEntry("logErrorRatelimited",
          (this.Utility.DELAY / 1000).toString());

        // Push the unedited page back on the stack
        pages.push(pages[counter++]);
      } else {
        // Error: $1 not edited. Please try again.
        this.addModalLogEntry("logErrorEditing", (pages[counter].name == null)
          ? pages[counter++]
          : pages[counter++].name
        );
      }

      // On to the next iteration
      this.timer.iterate(
        (error === "ratelimited")
          ? this.Utility.DELAY
          : null
      );
    }.bind(this));
  };

  /**
   * @description This function serves as the primary event listener for presses
   * of the "Preview" button available to users who are seeking to mass-message
   * other users. From the end user's perspective, the button press should be
   * met with the fading out of the messaging modal scene and the display of a
   * parsed version of the title and associated message. On presses of the close
   * button, the preview should fade out and be replaced by the messaging modal
   * with all of the user's messaging input still displayed in the textfields.
   * <br />
   * <br />
   * This function accomplishes this by checking the user's input and querying
   * the database via <code>wgMessageWallsExist</code> to determine whether the
   * wiki on which the script is being used has enabled message walls. Depending
   * on this query, the methods used to render and display the preview will
   * change though the end results will be the same. The function will fade in
   * and out using <code>handleClear</code> and invoke the requisite
   * <code>displayPreview</code> to show the preview <code>div</code> and
   * <code>attachPreviewEvents</code> to handle collapsibles and other events.
   *
   * @returns {void}
   */
  main.handlePreviewing = function () {
    if (this.timer && !this.timer.isComplete) {
      if (this.flags.debug) {
        window.console.dir(this.timer);
      }
      return;
    }

    // Declarations
    var $scene, $byline, $body, isMessaging, $previewMessage, contents;

    // Definitions
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];
    $byline = $("#" + this.Selectors.ID_CONTENT_BYLINE).val();
    $body = $("#" + this.Selectors.ID_CONTENT_BODY).val();
    isMessaging = ($scene.value === "message" && $scene.selectedIndex === 2);

    // Just in case...
    if (!isMessaging) {
      return;
    }

    // Check for title
    if (!$byline) {
      this.addModalLogEntry("logErrorMissingByline");
      return;

    // Check for body content
    } else if (!$body) {
      this.addModalLogEntry("logErrorMissingBody");
      return;
    }

    /**
     * @description <code>$previewMessage</code> handles the acquisition of
     * parsed HTML content related to the user's input message body and title.
     * Naturally, in order to ensure that the proper API methods are invoked,
     * the script must determine if the wiki on which MassEdit is being used
     * has enabled message walls. Once the proper method has been invoked, the
     * resultant <code>object</code> containing the message body HTML is passed
     * to <code>$previewMessage.done</code>.
     */
    $previewMessage = new $.Deferred(function ($paramOuter) {
      new $.Deferred(function ($paramInner) {
        (this.flags.hasMessageWalls != null)
          ? $paramInner.resolve(this.flags.hasMessageWalls).promise()
          : mw.config.get("wgMessageWallsExist").then(
              function () {
                return $paramInner.resolve(true).promise();
              }.bind(this),

              function () {
                return $paramInner.resolve(false).promise();
              }.bind(this)
            );
      }.bind(this)).then(
        function (paramHasWalls) {
          if (this.flags.hasMessageWalls == null) {
            this.flags.hasMessageWalls = paramHasWalls;
          }

          // Use general-purpose parser for UCP wikis
          return this.getParsedWikitextContent($body);
        }.bind(this)
      ).then(
        $paramOuter.resolve.bind($), // $previewMessage.done
        $paramOuter.reject.bind($)   // $previewMessage.fail
      );
    }.bind(this));

    /**
     * @description Upon successful completion of the preview request operation,
     * the results are logged and the <code>handleClear</code> scene transition
     * method invoked. In such cases, <code>displayPreview</code> is invoked
     * following the fade out to hide the messaging scene and append a preview
     * <code>div</code> and <code>attachPreviewEvents</code> is invoked
     * following the post appending fade-in.
     */
    $previewMessage.done(function (paramResults) {
      if (this.flags.debug) {
        window.console.log("$previewMessage results: ", paramResults);
      }

      // The string HTML for display as preview modal body
      contents = paramResults.parse.text["*"];

      // Bypass handleClear's default functionality via the functions object
      this.handleClear({
        before: this.displayPreview.bind(this, contents),
        after: this.attachPreviewEvents.bind(this),
      });
    }.bind(this));

    /**
     * @description In cases wherein the message preview has failed for some
     * reason, the message scene doesn't change. The only alteration is the
     * addition of a relevant status log message denoting a failed preview
     * request.
     */
    $previewMessage.fail(this.addModalLogEntry.bind(this, "logErrorNoPreview"));
  };

  /**
   * @description The <code>handleToggle</code> is the primary click handler for
   * the "Pause/Resume" button used to toggle the iteration timer. Depending on
   * whether or not the timer is in use in iterating through collated pages
   * requiring editing, the text of the button will change accordingly. Once
   * invoked, the method will either restart the timer during an iteration or
   * pause it indefinitely. If the timer is not running, the method will exit.
   *
   * @returns {void}
   */
  main.handleToggle = function () {
    if (
      !this.timer ||
      (this.timer && this.timer.isComplete)
    ) {
      if (this.flags.debug) {
        window.console.dir(this.timer);
      }
      return;
    }

    // Declarations
    var toggle, config;

    // Definitions
    toggle = "#" + this.Selectors.ID_MODAL_TOGGLE + " ." +
      this.Selectors.CLASS_OOUI_LABEL;
    config = [
      {
        message: "logTimerPaused",
        text: "buttonResume",
        method: "pause",
      },
      {
        message: "logTimerResume",
        text: "buttonPause",
        method: "resume",
      }
    ][+this.timer.isPaused];

    // Add status log entry
    this.addModalLogEntry(config.message);

    // Change the text of the button
    $(toggle).text(this.i18n.msg(config.text).escape());

    // Either resume or pause the setDynamicTimeout
    this.timer[config.method]();
  };

  /**
   * @description Similar to <code>handleToggle</code>, this function is used to
   * cancel the timer used to iterate through pages requiring editing. As such,
   * it cancels the timer, adds a relevant status log entry, and re-enables the
   * standard editing buttons in the modal <code>footer</code>. If the timer is
   * presently not running, the method simply returns and exits. The timer is
   * logged in the console if <code>this.flags.debug</code> is set to
   * <code>true</code>.
   *
   * @returns {void}
   */
  main.handleCancel = function () {
    if (
      !this.timer ||
      (this.timer && this.timer.isComplete)
    ) {
      if (this.flags.debug) {
        window.console.dir(this.timer);
      }
      return;
    } else {
      this.resetModal("logTimerCancel");
    }
  };

  /**
   * @description As the name implies, the <code>handleClear</code> listener is
   * mainly used to clear modal contents and reset the <code>form</code> HTML
   * element. Rather than simply invoke the helper function
   * <code>resetModal</code>, however, this function adds some animation by
   * disabling the button set and fading in and out of the modal body during the
   * clearing operation, displaying a status message in the log upon completion.
   * <br />
   * <br />
   * In addition to its main responsibility of clearing the modal fields of
   * content, the function is also used as the primary means of transitioning
   * between scenes on changes to the scene dropdown. It can even accept in
   * place of a "transitioning" <code>boolean</code> input flag a dedicated
   * functions <code>object</code> containing handlers for the fade-in/fade-out
   * progression, bypassing all other internal functionality apart from the
   * core fade operation.
   *
   * @param {boolean|object} paramInput - Flag or handler <code>object</code>
   * @returns {void}
   */
  main.handleClear = function (paramInput) {
    if (this.timer && !this.timer.isComplete) {
      if (this.flags.debug) {
        window.console.dir(this.timer);
      }
      return;
    }

    // Declarations
    var $scene, functions, visible, hidden, isTransitioning, modalBodyTarget;

    // Whether the function is being used to reset or scene transition
    isTransitioning = (typeof paramInput !== "boolean") ? false : paramInput;

    // Scene dropdown element
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];

    // Part of the modal containing the content body
    modalBodyTarget = " ." + this.Selectors.CLASS_OOUI_BODY;

    // $.prototype.animate objects
    visible = {opacity: 1};
    hidden = {opacity: 0};

    // Define listeners for fade-in and fade-out (either custom or defaults)
    functions = (
      this.isThisAn("Object", paramInput) &&
      paramInput.hasOwnProperty("before") &&
      paramInput.hasOwnProperty("after")
    )
      ? paramInput
      : [
          { // Standard form clear
            before: this.resetModal.bind(this),
            after: this.addModalLogEntry.bind(this, "logSuccessReset"),
          },
          { // Scene transition
            before: this.modal.modal.setContent.bind(this.modal.modal,
              this.buildModalScene($scene.value)),
            after: this.attachModalEvents.bind(this),
          }
        ][+isTransitioning];

    // Disable/hide all modal buttons for duration of fade and reset
    this.toggleModalComponentsDisable("all");

    // Fade out on modal and reset content before fade-in
    $("#" + this.Selectors.ID_MODAL_CONTAINER + modalBodyTarget)
      .animate(hidden, this.Utility.FADE_INTERVAL, functions.before)
      .animate(visible, this.Utility.FADE_INTERVAL, functions.after);
  };

  /****************************************************************************/
  /*                     Prototype Pseudo-constructor                         */
  /****************************************************************************/

  /**
   * @description The confusingly named <code>main.init</code> function serves
   * as a pseudo-constructor of the MassEdit class instance .Through the
   * <code>descriptor</code> passed to <code>init.main</code>'s invocation of
   * <code>Object.create</code> sets the <code>i18n</code>, <code>config</code>,
   * <code>interval</code>, and <code>placement</code> instance properties, this
   * function sets default values for <code>modal</code>, <code>timer</code>,
   * <code>globals</code>, <code>flags</code>, and <code>info</code> properties
   * and defines the toolbar element and its associated event listener, namely
   * <code>displayModal</code>. The method also populates and returns an
   * <code>object</code> containing methods and aliases for addition to
   * <code>window.dev.massEdit.exports</code>, a container for public, exposed
   * methods externally accessible for post-load debugging purposes.
   * <br />
   * <br />
   * Following this function's invocation, the MassEdit class instance will have
   * a total of seven instance variables, namely, <code>i18n</code>,
   * <code>config</code>, <code>flags</code>, <code>globals</code>,
   * <code>modal</code>, <code>timer</code>, and <code>info</code>. All other
   * functionality related to MassEdit is stored in the class instance
   * prototype, the <code>main</code> namespace object, for convenience.
   *
   * @returns {object} exports - Methods exposed via <code>module.exports</code>
   */
  main.init = function () {

    // Declarations
    var i, n, $toolItem, toolText, exports, flags, flag, publicMethod;

    // Definitions
    exports = {};
    flags = Object.keys(this.Flags);

    /*
     * I18n config for user language
     * Search Modal, QuickBar/Toolbar/WikiaBar, editing interface always display
     * in user interface language by default, so it is recommended to use user
     * language.
     *
     * Please note that it used to be set to wiki's site language, which caused
     * several issues for language conversion
     *
     * See "languages with variants" in MediaWiki documentation.
     */
    this.i18n.useUserLang();

    // Initialize new modal property
    this.modal = {};

    // Initialize a new dynamic timer object
    this.timer = null;

    // Replacement for previous script-global constants; apply default values
    this.flags = {
      debug: this.Flags.DEBUG,
      testing: this.Flags.TESTING,
      hasMessageWalls: null
    };

    // Text to display in the tool element
    toolText = this.i18n.msg("buttonScript").plain();

    // Build tool item (nested link inside list element)
    $toolItem = $(this.assembleOverflowElement(toolText));

    // Display the modal on click
    $toolItem.on("click", this.displayModal.bind(this));

    // Either append or prepend the tool to the target
    $(this.config.placement.element)[this.config.placement.type]($toolItem);

    // Assemble MassEdit instance's public methods for module.exports
    for (i = 0, n = flags.length; i < n; i++) {
      flag = flags[i].toLowerCase();
      publicMethod = "toggle" + this.capitalize(flag);
      exports[publicMethod] = this.toggleFlag.bind(this, flag);
    }

    // Return public methods to be added to module.exports object
    return exports;
  };

  /****************************************************************************/
  /*                         Setup Helper methods                             */
  /****************************************************************************/

  /**
   * @description This helper function is used to automatically generate an
   * appropriate contrived ResourceLoader module name for use in loading scripts
   * via <code>mw.loader.implement</code> on UCP wikis. The use of this function
   * replaces the previous approach that saw the inclusion of hardcoded module
   * names as properties of the relevant dependency <code>object</code>s stored
   * in <code>init.Dependencies.ARTICLES</code>. When passed an argument
   * formatted as <code>u:dev:MediaWiki:Test/code.js</code>, the function will
   * extract the subdomain name ("dev") and join it to the name of the script
   * ("Test") with the article type ("script") as <code>script.dev.Test</code>.
   *
   * @param {string} paramType - Either "script" or "style"
   * @param {string} paramPage - Article formatted as "u:dev:MediaWiki:Test.js"
   * @returns {string} - ResourceLoader module name formatted "script.dev.Test"
   */
  init.generateModuleName = function (paramType, paramPage) {
    return $.merge([paramType], paramPage.split(/[\/.]+/)[0].split(":").filter(
      function (paramItem) {
        return !paramItem.match(/^u$|^mediawiki$/gi);
      }
    )).join(".");
  };

  /**
   * @description The first of two user input validators, this function is used
   * to ensure that the user's included config details related to Placement.js
   * are wellformed and legitimate. MassEdit.js offers support for all of
   * Placement.js's default element locations, though as a nod to the previous
   * incarnation of the script, the default placement element is the toolbar and
   * the default type is "append." In the event of an error being caught due to
   * a malformed element location or a missing type, the default config options
   * housed in <code>Message.utility.defaultConfig</code> are used instead to
   * ensure that user input mistakes are handled somewhat gracefully.
   *
   * @param {object} paramConfig - Placement.js-specific config
   * @returns {object} validatedConfig - Adjusted Placement.js config
   */
  init.definePlacement = function (paramConfig) {

    // Declarations
    var validatedConfig, loader;

    // Definitions
    validatedConfig = {};
    loader = window.dev.placement.loader;

    try {
      validatedConfig.element = loader.element(paramConfig.element);
    } catch (e) {
      validatedConfig.element = loader.element(this.Placement.DEFAULTS.ELEMENT);
    }

    try {
      validatedConfig.type = loader.type(
        (this.Placement.VALID_TYPES.indexOf(paramConfig.type) !== -1)
          ? paramConfig.type
          : this.Placement.DEFAULTS.TYPE
      );
    } catch (e) {
      validatedConfig.type = loader.type(this.Placement.DEFAULTS.TYPE);
    }

    // Set script name
    loader.script(this.Utility.SCRIPT);

    return Object.freeze(validatedConfig);
  };

  /**
   * @description The second of the two validator functions used to check that
   * user input is wellformed and legitimate, this function checks the user's
   * edit interval value against the permissible values for standard users and
   * flagged bot accounts. In order to ensure that the operations are carried
   * out smoothly, the user's rate is adjusted if it exceeds the edit
   * restrictions placed upon accounts of different user rights levels. The
   * original incarnation of this method came from a previous version of
   * MassEdit which made use of a similar, jankier system to ensure the smooth
   * progression through all included pages without loss of required edits.
   *
   * @see <a href="https://git.io/fA4Jk">SUS-4775</a>
   * @see <a href="https://git.io/fA4eQ">VariablesBase.php</a>
   * @param {number} paramInterval - User's input interval value
   * @returns {number} - Adjusted interval
   */
  init.defineInterval = function (paramInterval) {

    // Declaration
    var isNumber;

    // Definition
    isNumber = (typeof paramInterval === "number" &&
      window.isFinite(paramInterval) && !window.isNaN(paramInterval));

    if (
      this.globals.wgUserGroups.indexOf("bot") !== -1 &&
      (paramInterval < this.Utility.BOT_INTERVAL || !isNumber)
    ) {
      return this.Utility.BOT_INTERVAL; // Reset to max 80 edits/minute
    } else if (
      this.globals.wgUserGroups.indexOf("user") !== -1 &&
      (paramInterval < this.Utility.STD_INTERVAL || !isNumber)
    ) {
      return this.Utility.STD_INTERVAL; // Reset to max 40 edits/minute
    } else {
      return window.parseInt(paramInterval, 10);
    }
  };

  /****************************************************************************/
  /*                          Setup Primary methods                           */
  /****************************************************************************/

  /**
   * @description The confusingly named <code>init.main</code> function is used
   * to coordinate the script setup madness in a single method, validating all
   * user input by means of helper method invocation and setting all instance
   * properties of the MassEdit class instance. Once the <code>descriptor</code>
   * <code>object</code> has been assembled containing the relevant instance
   * variables for placement, edit interval, and i18n messages, the method calls
   * <code>Object.create</code> to construct a new MassEdit class instance,
   * passing the <code>descriptor</code> and the <code>main</code> namespace
   * <code>object</code> as the instance's prototype. Once the new instance is
   * created and added as a property of the <code>init</code> object, the method
   * creates a new protected property of <code>window.dev.massEdit</code> called
   * <code>exports</code> used to store exposed public methods for use in
   * post-load debugging. At the method's end, a <code>mw.hook</code> is fired
   * for potential coordination with other scripts or user code.
   * <br />
   * <br />
   * The separation of setup code and MassEdit functionality code into distinct
   * namespace <code>object</code>s helped to ensure that code was logically
   * organized per the single responsibility principle and more readable by
   * virtue of the fact that each namespace handles distinctly different tasks.
   * This will assist in debugging should an issue arise with either the setup
   * or the script's functionality itself.
   *
   * @param {undefined|function} paramRequire - Via <code>mw.loader.using</code>
   * @param {object} paramLang - i18n <code>object</code> returned from hook
   * @returns {void}
   */
  init.main = function (paramRequire, paramLang) {

    // Declarations
    var i, n, configTypes, descriptor, parameter, lowercase, method, property,
      descriptorProperties, userConfig, field, instanceFields, initExports,
      instanceExports;

    // Cleanup init namespace by deleting temp variables
    delete this.modules;

    // Two types of config object property
    configTypes = ["Interval", "Placement"];

    // MassEdit object instance's local fields and values
    instanceFields = [
      {
        name: "i18n",
        value: paramLang,
      },
      {
        name: "config",
        value: {},
      },
      {
        name: "globals",
        value: $.extend({}, this.globals),
      },
    ];

    // Support both MassEdit config and legacy Message config
    userConfig = window.MassEditConfig || window.configMessage || {};

    // New Object.create descriptor object
    descriptor = {};

    // Default descriptor access properties
    descriptorProperties = {
      enumerable: true,
      configurable: false,
      writable: false,
    };

    // Assemble new descriptor entries to serve as instance local data
    for (i = 0, n = instanceFields.length; i < n; i++) {
      field = instanceFields[i];

      descriptor[field.name] = $.extend({}, descriptorProperties);
      descriptor[field.name].value = field.value;
    }

    // Define and validate user config input
    for (i = 0, n = configTypes.length; i < n; i++) {

      // Definitions
      property = configTypes[i];
      method = "define" + property;
      lowercase = property.toLowerCase();
      parameter = (userConfig.hasOwnProperty(lowercase))
        ? userConfig[lowercase]
        : null;

      // Define descriptor property value
      Object.defineProperty(descriptor.config.value, lowercase,
        $.extend($.extend({}, descriptorProperties), {
          value: this[method](parameter),
        })
      );
    }

    // Public methods for init object
    initExports = {
      observeScript: window.console.dir.bind(this, this),
      observeUserConfig: window.console.dir.bind(this, userConfig),
    };

    // Create MassEdit instance, keep for future observation, and store exports
    instanceExports = (this.instance = Object.create(main, descriptor)).init();

    // Once instance is created, expose public methods for external debugging
    Object.defineProperty(module, "exports",
      $.extend($.extend({}, descriptorProperties), {
        value: Object.freeze($.extend(initExports, instanceExports)),
      })
    );

    // Dispatch hook with window.dev.massEdit once initialization is complete
    mw.hook(this.Utility.HOOK_NAME).fire(module);
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
  init.load = function (paramDeferred) {

    // Declarations
    var debug, articles, counter, numArticles, $loadNext, current, isLoaded,
      article, server, params, resource, moduleName;

    // Definitions
    debug = false;
    counter = 0;
    articles = this.Dependencies.ARTICLES;
    numArticles = articles.length;
    $loadNext = new $.Deferred();

    // Fetch, define, and cache globals for use in init and MassEdit instance
    this.globals = Object.freeze(mw.config.get(this.Globals));

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
    paramDeferred.notify().progress(function (paramResponse) {

      // Examine returned contents from mw.hooks
      if (paramResponse != null) {
        // Wrap in Promise to gracefully handle WgMessageWallsExist rejections
        window.Promise.resolve(paramResponse).then(function (paramResponse) {
          if (debug) {
            window.console.log("paramResponse, mw.hook", paramResponse);
          }
        }, function (paramError) {
          if (debug) {
            window.console.warn("paramError, mw.hook", paramError);
          }
        });
      }

      // Check if loading is complete
      if (counter === numArticles) {
        // Resolve helper $.Deferred instance
        $loadNext.resolve();
        if (debug) {
          window.console.log("$loadNext", $loadNext.state());
        }

        // Load latest version of cached i18n messages
        window.dev.i18n.loadMessages(this.Utility.SCRIPT, {
          cacheVersion: this.Utility.CACHE_VERSION,
        }).then(paramDeferred.resolve).fail(paramDeferred.reject);
      } else {
        if (debug) {
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
        if (debug) {
          window.console.log("isLoaded", current.ARTICLE);
        }
        return mw.hook(current.HOOK).add(paramDeferred.notify);
      }

      // Try importArticles with pseudo-RL module fallback
      try {
        article = window.importArticle({
          type: current.TYPE,
          article: current.ARTICLE,
        });

        // Log for local debugging (problem spot)
        if (debug) {
          window.console.log("importArticle", article);
        }

        // Styles won't have hooks; notify status with load event if styles
        return (current.HOOK)
          ? mw.hook(current.HOOK).add(paramDeferred.notify)
          : $(article).on("load", paramDeferred.notify);

      } catch (paramError) {
        if (debug) {
          window.console.error(this.Utility.SCRIPT, paramError);
        }

        // Build url with REST params
        server = "https://dev.fandom.com/load.php";
        params = "?" + $.param({
          mode: "articles",
          only: current.TYPE + "s",
          articles: current.ARTICLE,
        });
        resource = server + params;
        moduleName = this.generateModuleName(current.TYPE, current.ARTICLE);

        // Ensure wellformed module name
        if (debug) {
          window.console.log(moduleName);
        }

        // Define local modules to sidestep mw.loader.load's lack of callback
        try {
          mw.loader.implement.apply(null, $.merge([moduleName],
            (current.TYPE === "script")
              ? [[resource]]
              : [null, {"url": {"all": [resource]}}]
          ));
        } catch (paramError) {
          if (debug) {
            window.console.error(paramError);
          }
        }

        // Load script/stylesheet once temporary module has been defined
        mw.loader.using(moduleName)
          .then((current.HOOK)
            ? mw.hook(current.HOOK).add(paramDeferred.notify)
            : paramDeferred.notify)
          .fail(paramDeferred.reject);
      }
    }.bind(this));
  };

  // Coordinate loading of all relevant dependencies
  $.when(
    mw.loader.using(init.Dependencies.MODULES),
    new $.Deferred(init.load.bind(init)).promise())
  .then(init.main.bind(init))
  .fail(window.console.error.bind(window.console, init.Utility.SCRIPT));

}((this.dev = this.dev || {}).massEdit = this.dev.massEdit || {}, this,
  this.jQuery, this.mediaWiki));