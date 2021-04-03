/**
 * <nowiki>
 * MassEdit
 * @file Essentially "bot software lite"; task automation and bulk editi
ng tool
 * @author Eizen <dev.wikia.com/wiki/User_talk:Eizen>
 * @license CC-BY-SA 3.0
 * @external "ext.wikia.LinkSuggest"
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
 * - Prototype/Setup namespaces      Namespace object declarations/defin
itions
 * - Prototype pseudo-enums          Storage for MassEdit utility consta
nts
 * - Setup pseudo-enums              Storage for <code>init</code> const
ants
 * - Prototype Utility methods       General purpose helper functions
 * - Prototype Dynamic Timer         Custom <code>setTimeout</code> iter
ator
 * - Prototype Quicksort             Fast Quicksort algorithm for member
 pages
 * - Prototype API methods           Assorted GET/POST handlers and page
 listers
 * - Prototype Generator methods     Functionality methods to build page
 lists
 * - Prototype Assembly methods      Methods returning <code>string</cod
e> HTML
 * - Prototype Modal methods         All methods related to displaying i
nterface
 *   - Utility methods               General modal-specific helper funct
ions
 *   - Preview methods               Methods related to the preview pseu
do-scene
 *   - Modal methods                 More general modal builders, handle
rs, etc.
 * - Prototype Event handlers        Handlers for clicks of modal button
s
 * - Prototype Pseudo-constructor    MassEdit <code>constructor</code> m
ethod
 * - Setup Helper methods            Methods to validate user input
 * - Setup Primary methods           Methods to load external dependenci
es
 * </pre>
 */

/* jshint -W030, undef: true, unused: true, eqnull: true, laxbreak: true
,
   bitwise: false */

;(function (module, window, $, mw) {
  "use strict";

  // Prevent double loads and respect prior double load check formatting
  if (!window || !$ || !mw || module.isLoaded || window.isMassEditLoaded
) {
    return;
  }
  module.isLoaded = true;

  /*********************************************************************
*******/
  /*                       Prototype/Setup namespaces
      */
  /*********************************************************************
*******/

  /**
   * @description All script functionality is contained in a pair of nam
espace
   * objects housed in the module-global scope. Originally declared as E
S2015
   * <code>const</code>s due to JSMinPlus treating the keyword as permis
sible,
   * the namespaces were subsequently redeclared with <code>var</code> f
or the
   * purposes of ensuring ES5 consistency/compatibility.
   */
  var main, init;

  /**
   * @description The <code>main</code> namespace object is used as a cl
ass
   * prototype for the MassEdit class instance created by <code>init</co
de>. It
   * contains methods and properties related to the actual MassEdit
   * functionality and application logic, keeping in a separate object a
ll the
   * methods used to load and initialize the script itself.
   */
  main = {};

  /**
   * @description The <code>init</code> namespace object contains method
s and
   * properties related to the setup/initialization of the MassEdit scri
pt. The
   * methods in this namespace object are responsible for loading extern
al
   * dependencies, validating user input, setting config, and creating a
 new
   * MassEdit instance once script setup is complete.
   */
  init = {};

  /*********************************************************************
*******/
  /*                         Prototype pseudo-enums
      */
  /*********************************************************************
*******/

  // Protected pseudo-enums of prototype
  Object.defineProperties(main, {

    /**
     * @description This pseudo-enum of the <code>main</code> namespace
object
     * is used to store all CSS selectors in a single place in the event
 that
     * one or more need to be changed. The formatting of the object lite
ral key
     * naming is type (id or class), location (placement, modal, content
,
     * preview), and either the name for ids or the type of element (div
, span,
     * etc.). Originally, these were all divided into nested object lite
rals as
     * seen in Message.js. However, this system became too unreadable in
 the
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
     * @description This pseudo-enum of the <code>main</code> namespace
object
     * is used to store a pair of arrays denoting which user groups are
     * permitted to make use of the editing and messaging functionality
(all
     * users are permitted to generate lists). For the purposes of forst
alling
     * the use of the script for vandalism or spam, its use is limited t
o
     * certain members of local staff, various global groups, and Fandom
 Staff.
     * The only major local group prevented from using the editing funct
ion is
     * the <code>threadmoderator</code> group, as these can be viewed as
     * standard users with /d and thread-specific abilities. However, th
ese
     * users are permitted to make use of the mass-messaging functionali
ty and
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
        CAN_EDIT: Object.freeze(
          "sysop",
          "content-moderator",
          "bot",
          "bot-global",
          "staff",
          "soap",
          "helper",
          "vanguard",
          "wiki-manager",
          "content-team-member",
          "content-volunteer",
        ]),
        CAN_MESSAGE: Object.freeze(
          "global-discussions-moderator",
          "threadmoderator",
        ]),
      }),
    },

    /**
     * @description The <code>Scenes</code> pseudo-enum is used to store
 data
     * and names related to building the four major operations supported
 by the
     * MassEdit script, namely find-and-replace, append/prepend content,
 message
     * users, and generation of page listings. Originally, this enum was
 an
     * array used to store the <code>string</code> names of the four mai
n scenes
     * in the order that determined their placement in the associated op
eration
     * dropdown menu. The actual design schema used to dynamically build
 the
     * <code>string</code> HTML from builder functions was stored within
 a
     * since-removed method called <code>main.buildModalScenes</code> th
at built
     * all the scenes at once on program initialization.
     * <br />
     * <br />
     * However, with the decision to revise this messy approach in favor
 of
     * lazy-building scenes only when requested by the user, the scene s
chema
     * was moved to this enum and rearranged into <code>object</code> fo
rm. The
     * author was forced to make use of many nested <code>Object.freeze<
/code>
     * invocations due to the inability to deep-freeze the whole object,
 though
     * alternate approaches are being researched to de-uglify the enum i
n a
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
          SCHEMA: Object.freeze(
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze(
                Object.freeze(["type",
                  Object.freeze(["pages", "categories", "namespaces"])
                ]),
                Object.freeze(["case",
                  Object.freeze(["sensitive", "insensitive"])
                ]),
                Object.freeze(["match",
                  Object.freeze(["plain", "regex"])
                ]),
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze(
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
          SCHEMA: Object.freeze(
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze(
                Object.freeze(["action",
                  Object.freeze(["prepend", "append"])
                ]),
                Object.freeze(["type",
                  Object.freeze(["pages", "categories", "namespaces"])
                ])
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze(
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
          SCHEMA: Object.freeze(
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze(
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
          SCHEMA: Object.freeze(
            Object.freeze({
              HANDLER: "assembleDropdown",
              PARAMETER_ARRAYS: Object.freeze(
                Object.freeze(["type",
                  Object.freeze(["categories", "namespaces", "templates"
])
                ])
              ])
            }),
            Object.freeze({
              HANDLER: "assembleTextfield",
              PARAMETER_ARRAYS: Object.freeze(
                Object.freeze(["pages", "textarea"]),
                Object.freeze(["members", "textarea"]),
              ])
            })
          ]),
        }),
      }),
    },

    /**
     * @description The <code>Buttons</code> pseudo-enum stores all seve
n config
     * <code>object</code>s used to assemble <code>ModalButton</code> in
stances
     * during the Modal creation process. Prior to UCP update 3, this da
ta was
     * stored in a static fashion within <code>main.buildModal</code>. H
owever,
     * due to the need to maintain a static default <code>disabled</code
> flag
     * for use in toggling buttons elements within the body of
     * <code>main.toggleModalComponentsDisable</code>, the associated co
nfig
     * objects were removed from the <code>buildModal</code> method and
provided
     * their own dedicated pseudo-enum. The modal builder function now u
ses this
     * data to dynamically assemble the buttons and modal in an automati
c
     * fashion.
     * <br />
     * <br />
     * The key for each <code>Buttons</code> object entry is as follows:
     * <pre>
     * - HANDLER: Click handler function, a property of MassEdit instanc
e
     * - TEXT: <code>i18n</code> message name for button text
     * - EVENT: Name of related click event (should be same as object ke
y name)
     * - PRIMARY: <code>boolean</code> flag for primary styling
     * - DISABLED: <code>boolean</code> flag for default disabled behavi
or
     * - ID: Name of <code>Selectors</code> key related to element id
     * - CLASSES: Array of <code>Selectors</code> keys for class selecto
rs
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
          CLASSES: Object.freeze(
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
          CLASSES: Object.freeze(
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
          CLASSES: Object.freeze(
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
          CLASSES: Object.freeze(
            "CLASS_MODAL_BUTTON",
          ])
        }),
        CLOSE: Object.freeze({
          TEXT: "buttonClose",
          EVENT: "close",
          PRIMARY: false,
          DISABLED: false,
          ID: "ID_MODAL_CLOSE",
          CLASSES: Object.freeze(
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
          CLASSES: Object.freeze(
            "CLASS_MODAL_BUTTON",
            "CLASS_MODAL_LEFT",
            "CLASS_MODAL_OPTION"
          ])
        }),
      }),
    },

    /**
     * @description This pseudo-enum replaces the previous pair of
     * <code>boolean</code> constants housed in the script-global execut
ion
     * context, namely <code>DEBUG</code> and <code>TESTING</code>. This
 enum
     * houses the default values of these flags, the value of which are
applied
     * to the properties of the MassEdit instance's <code>flags</code> l
ocal
     * variable. This system allows for the exposing of certain public m
ethods
     * that permit post-load toggling of the debug and test modes for mo
re
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
     * <code>main</code> namespace object is used to store various const
ants for
     * general use in a variety of contexts. The constants of the
     * <code>number</code> data type are related to standardizing edit i
nterval
     * rates and edit delays in cases of rate limiting. Originally, thes
e were
     * housed in a <code>const</code> object in the script-global namesp
ace,
     * though their exclusive use by the MassEdit class instance made th
eir
     * inclusion into <code>main</code> seem like a more sensible placem
ent
     * decision.
     * <br />
     * <br />
     * The two <code>string</code> data type members are the key name us
ed to
     * store HTML "scenes" (operation interfaces) in the browser's
     * <code>localStorage</code> and the name of the "scene" serving as
the
     * first interface built and displayed to the user upon initializati
on. By
     * convention, this is the "Find and replace" scene, though any scen
e could
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
        FIRST_SCENE: "REPLACE",
        MAX_USERS: 500,
        MAX_SUMMARY_CHARS: 800,
        FADE_INTERVAL: 1000,
        DELAY: 35000,
        BOTTOM_PADDING: 15,
      }),
    },
  });

  /*********************************************************************
*******/
  /*                           Setup pseudo-enums
      */
  /*********************************************************************
*******/

  // Protected pseudo-enums of script setup object
  Object.defineProperties(init, {

    /**
     * @description This pseudo-enum of the <code>init</code> namespace
object
     * used to initialize the script stores data related to the external
     * dependencies and core modules required by the script. It consists
 of two
     * properties. The former, a constant <code>object</code> called "AR
TICLES,"
     * originally contained key/value pairs wherein the key was the spec
ific
     * name of the <code>mw.hook</code> and the value was the script's l
ocation
     * for use by <code>importArticles.articles</code>. However, this sy
stem
     * was eventually replaced in favor of an array of <code>object</cod
e>s
     * containing properties for hook, <code>window.dev</code> alias, an
d script
     * for more efficient, readable loading of dependencies.
     * <br />
     * <br />
     * The latter array, a constant array named <code>MODULES</code>, co
ntains a
     * listing of the core modules required for use by
     * <code>mw.loader.using</code>. It may be worth noting for future r
eference
     * that <code>ext.wikia.LinkSuggest</code> doesn't exist yet in the
UCP, so
     * an error will be thrown somewhere if the script is loaded on a UC
P wiki.
     * <br />
     * <br />
     * The key for the <code>ARTICLES</code> array entries is as follows
:
     * <pre>
     * - DEV/WINDOW: The name and location of the <code>window</code> pr
operty
     * - HOOK: The name of the <code>mw.hook</code> event
     * - ARTICLE: The location of the script or stylesheet on the Dev wi
ki
     * - TYPE: Either "script" for JS scripts or "style" for CSS stylesh
eets
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
        ARTICLES: Object.freeze(
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
        MODULES: Object.freeze(
          "ext.wikia.LinkSuggest",
          "mediawiki.user",
          "mediawiki.util",
        ]),
      }),
    },

    /**
     * @description This pseudo-enum of the <code>init</code> namespace
object
     * is used to store default data pertaining to the Placement.js exte
rnal
     * dependency. It includes an <code>object</code> denoting the defau
lt
     * placement location for the script in the event of the user not in
cluding
     * any user config and an array containing the two valid placement t
ypes. By
     * default, the script tool element as built in <code>main.init</cod
e> is
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
        VALID_TYPES: Object.freeze(
          "append",
          "prepend",
        ]),
      }),
    },

    /**
     * @description This pseudo-enum is used to store the <code>string</
code>
     * names of the various <code>WikipediaGlobal</code> (wg) variables
required
     * by the main MassEdit class instance and <code>init</code> object.
 These
     * are fetched within the body of the <code>init.preload</code> func
tion via
     * a <code>mw.config.get</code> invocation and stored in an instance
     * variable property named <code>globals</code> for subsequent usage
. This
     * approach replaces the deprecated approach previously used in the
script
     * of assuming the relevant wg variables exist as properties of the
     * <code>window</code> object, an assumption that is discouraged in
more
     * recent version of MediaWiki.
     *
     * @readonly
     * @enum {object}
     */
    Globals: {
      enumerable: true,
      writable: false,
      configurable: false,
      value: Object.freeze(
        "wgFormattedNamespaces",
        "wgLegalTitleChars",
        "wgLoadScript",
        "wgUserGroups",
        "wgVersion",
      ]),
    },

    /**
     * @description This catchall pseudo-enum of the <code>init</code< n
amespace
     * object is used to house assorted values of various data types tha
t don't
     * fit well into other pseudo-enums. It contains the interval rates
     * calculated from the edit restrictions imposed upon normal users a
nd bots.
     * additionally, it contains a <code>string</code> constant denoting
 the
     * name of the script and another <code>string</code> for the name o
f the
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
        CACHE_VERSION: 3,
      }),
    }
  });

  /*********************************************************************
*******/
  /*                      Prototype Utility methods
      */
  /*********************************************************************
*******/

  /**
   * @description As the name implies, this helper function capitalizes
the
   * first character of the input string and returns the altered, adjust
ed
   * string. it is generally used in the dynamic construction of i18n me
ssages
   * in various assembly methods.
   *
   * @param {string} paramTarget - <code>string</code> to be capitalized
   * @returns {string} - Capitalized <code>string</code>
   */
  main.capitalize = function (paramTarget) {
    return paramTarget.charAt(0).toUpperCase() + paramTarget.slice(1);
  };

  /**
   * @description This helper method is used to check whether the target
 object
   * is one of several types of <code>object</code>. It is most often us
ed to
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
   * @description This function is used to determine whether or not the
input
   * <code>string</code> contains restricted characters as denoted by Wi
kia's
   * <code>wgLegalTitleChars</code>. Legal characters are defined as fol
lows:
   * <code> %!"$&'()*,\-./0-9:;=?@A-Z\\\^_`a-z~+\u0080-\uFFFF</code>
   *
   * @param {string} paramString Content string to be checked
   * @return {boolean} - Flag denoting the nature of the paramString
   */
  main.isLegalInput = function (paramString) {
    return new RegExp("^[" + this.globals.wgLegalTitleChars +
      "]*$").test(paramString);
  };

  /**
   * @description This helper function uses simple regex to determine wh
ether
   * the parameter <code>string</code> or <code>number</code> is an inte
ger
   * value. It is primarily used to determine if the user has inputted a
 proper
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
   * implementation of <code>String.prototype.startsWith</code>, a metho
d
   * introduced in ES2015 and unavailable to IE 11 and earlier. It is ba
sed off
   * the polyfill available on the method's Mozilla.org documentation pa
ge.
   *
   * @param {string} paramTarget - <code>string</code> to be checked
   * @param {string} paramSearch - <code>string</code> target
   * @returns {boolean} - Flag denoting a match
   */
  main.startsWith = function (paramTarget, paramSearch) {
    return paramTarget.substring(0, 0 + paramSearch.length) === paramSea
rch;
  };

  /**
   * @description This utility method is used to check whether the user
   * attempting to use the script is in the proper usergroup. Only certa
in local
   * staff and members of select global groups are permitted the use of
the
   * editing and messaging functionality so as to prevent potential vand
alism,
   * though any users are permitted to generate lists of category member
s.
   *
   * @param {boolean} paramMessaging - Whether to include messaging grou
ps
   * @return {boolean} - Flag denoting user's ability to use the script
   */
  main.hasRights = function (paramMessaging) {
    return new RegExp(["(" + this.UserGroups.CAN_EDIT.join("|") +
      ((paramMessaging) ? "|" + this.UserGroups.CAN_MESSAGE.join("|") :
"") +
      ")"].join("")).test(this.globals.wgUserGroups.join(" ")) ||
      this.flags.testing;
  };

  /**
   * @description This helper method serves as the primary means by whic
h all
   * external post-load toggling of the debug and test modes may be unde
rtaken.
   * This particular implementation makes use of the bitwise XOR operato
r to
   * toggle the <code>number</code> representation of the flag's
   * <code>boolean<code> value between 0 and 1 prior to type coercing th
e result
   * back to the <code>boolean</code> data type.
   *
   * @param {string} paramFlagName - <code>string</code> name of desired
 flag
   * @returns {void}
   */
  main.toggleFlag = function (paramFlagName) {
    if (
      typeof paramFlagName !== "string" ||
      $.inArray(paramFlagName.toUpperCase(), Object.keys(this.Flags)) ==
= -1
    ) {
      return;
    }

    // Check for boolean flag's existence and add default if undefined
    (this.flags = this.flags || {})[paramFlagName] =
      this.flags[paramFlagName] || this.Flags[paramFlagName];

    // Toggle via bitwise then type cast back to boolean before redefini
ng
    window.console.log(paramFlagName + ":",
      this.flags[paramFlagName] = Boolean(this.flags[paramFlagName] ^ 1)
);
  };

  /**
   * @description This utility method is used to remove duplicate entrie
s from
   * an array prior to the usage of the Quicksort implementation include
d in
   * the sections below. Unlike other duplicate-removal implementations,
 this
   * version makes no use of <code>Object.prototype.hasOwnProperty</code
> or any
   * value comparisons to determine if elements are already in a tempora
ry
   * storage structure. Instead, each element of the parameter array is
simply
   * added to the temporary object as a key, overwriting any previously
added
   * keys of the same value. This results in an object with unique keys
that can
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
   * @description Originally, this function returned an ammended string
adjusted
   * to exhibit the user's desired content changes. The function was cal
led for
   * every individual page or category/namespace member inputted by the
user.
   * The author eventually noticed that all but one of the input argumen
ts
   * passed were unchanged from invocation to invocation and that the sa
me
   * internal operations were being undertaken and performed each time d
espite
   * the unchanged arguments.
   * <br />
   * <br />
   * As an improvement, the author refactored the method to use a closur
e,
   * allowing the main outer function to be called only once to initiali
ze
   * internal fields with the unchanged arguments. Thanks to the closure
, the
   * returned inner function can be assigned to a local variable elsewhe
re and
   * invoked as many times as needed while still making use of preserved
 closure
   * variables housed in heap memory after the main function's frame is
popped
   * off the stack.
   *
   * @param {boolean} paramIsCaseSensitive - If case sensitivity is desi
red
   * @param {boolean} paramIsUserRegex - If user has input own regex
   * @param {string} paramTarget - Text to be replaced
   * @param {string} paramReplacement - Text to be inserted
   * @param {Array<number>} paramInstances - Indices at which to replace
 text
   * @returns {function} - A closure function to be invoked separately
   */
  main.replaceOccurrences = function (paramIsCaseSensitive, paramIsUserR
egex,
      paramTarget, paramReplacement, paramInstances) {

    // Declarations
    var regex, replacement, counter;

    // Sanitize input param
    paramInstances = (paramInstances != null) ? paramInstances : [];

    // First parameter of the String.prototype.replace invocation
    regex = new RegExp((paramIsUserRegex)
      ? paramTarget // Example formatting: ([A-Z])\w+
      : paramTarget
        .replace(/\r/gi, "")
        .replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
      ((paramIsCaseSensitive) ? "g" : "gi") + "m"
    );

    // Second parameter of the String.prototype.replace invocation
    replacement = (!paramInstances.length)
      ? paramReplacement
      : function (paramMatch) {
          return ($.inArray(++counter, paramInstances) !== -1)
            ? paramReplacement
            : paramMatch;
        };

    // Closure so above operations are only undertaken once per submissi
on op
    return function (paramString) {

      // Log regex and intended replacement
      if (this.flags.debug) {
        window.console.log(regex, replacement);
      }

      // Init counter in case of replace function
      counter = 0;

      // Replace using regex and either paramReplacement or anon functio
n
      return paramString.replace(regex, replacement);
    }.bind(this);
  };

  /**
   * @description This (admittedly messy) handler is used for both retur
ning
   * scene data from storage and for adding new scene data to storage fo
r reuse.
   * <code>localStorage</code> is accessed safely via the jQuery store p
lugin
   * <code>$.store</code> and placed within a <code>try...catch</code> b
lock to
   * handle any additional thrown errors not handled by <code>$.store</c
ode>. A
   * local object stored in <code>main.modal</code> is used as a fallbac
k in the
   * event of an error being thrown.
   *
   * @see <a href="https://git.io/JfrsN">Wikia's jquery.store.js</a>
   * @param {string} paramSceneName - Name for requested scene
   * @param {string} paramSceneData - Content of scene for setting (opti
onal)
   * @returns {string|null} - Returns scene content or <code>null</code>
   */
  main.queryStorage = function (paramSceneName, paramSceneData) {

    // Declarations
    var isSetting, scenes;

    // Handler can be used for both getting and setting, so check for wh
ich
    isSetting = (Array.prototype.slice.call(arguments).length == 2 &&
      paramSceneData != null);

    // Apply localStorage data to this.modal.scenes and local scenes var
iable
    try {
      scenes = this.modal.scenes = ((this.info.isUCP)
        ? JSON.parse(mw.storage.get(this.Utility.LS_KEY))
        : $.storage.get(this.Utility.LS_KEY)) || {};
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

      // Simultaneously adds to both scenes variable and this.modal.scen
es
      scenes[paramSceneName] = paramSceneData;

      // Add to localStorage
      try {
        (this.info.isUCP)
          ? mw.storage.set(this.Utility.LS_KEY, JSON.stringify(scenes))
          : $.storage.set(this.Utility.LS_KEY, scenes);
      } catch (paramError) {}

      // Make sure new scenes are added to both localStorage and modal.s
cenes
      if (this.flags.debug) {
        try {
          window.console.log("modal.scenes: ", this.modal.scenes);
          window.console.log("localStorage: ",
            JSON.parse(window.localStorage.getItem(this.Utility.LS_KEY))
);
        } catch (paramError) {}
      }
    }

    return scenes[paramSceneName];
  };

  /*********************************************************************
*******/
  /*                       Prototype Dynamic Timer
      */
  /*********************************************************************
*******/

  /**
   * @description This function serves as a pseudo-constructor for the p
ausable
   * <code>setDynamicTimeout</code> iterator. It accepts a function as a
   * callback and an edit interval, setting these as publically accessib
le
   * function properties alongside other default flow control
   * <code>boolean</code>s. The latter are used elsewhere in the program
 to
   * determine whether or not event listener handlers can be run, as cer
tain
   * handlers should not be accessible if an editing operation is in pro
gress.
   *
   * @param {function} paramCallback - Function to run after interval co
mplete
   * @param {number} paramInterval - Rate at which timeout is handled
   * @returns {object} self - Inner object return for external assignmen
t
   */
  main.setDynamicTimeout = function self (paramCallback, paramInterval)
{

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
   * @description This internal method of the <code>setDynamicTimeout</c
ode>
   * function is used to cancel any ongoing editing operation by clearin
g the
   * current timeout and setting the <code>isComplete</code> flow contro
l
   * <code>boolean</code> to true. This lets external handlers know that
 the
   * editing operation is complete, enabling or disabling them in turn.
   *
   * @returns {void}
   */
  main.setDynamicTimeout.cancel = function () {
    this.isComplete = true;
    window.clearTimeout(this.identify);
  };

  /**
   * @description This internal method of the <code>setDynamicTimeout</c
ode>
   * function is used to pause any ongoing editing operation by setting
the
   * <code>isPaused</code> flow control <code>boolean</code> and clearin
g the
   * current <code>setTimeouT</code> identified <code>number</code>. Thi
s is
   * called whenever the user presses the <code>Pause</code> modal butto
n.
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
   * @description This internal method of the <code>setDynamicTimeout</c
ode>
   * function is used to resume any ongoing and paused editing operation
 by
   * setting the <code>isPaused</code> flow control <code>boolean</code>
 to
   * <code>false</code> and calling the <code>iterate</code> method to p
roceed
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
   * @description This internal method of the <code>setDynamicTimeout</c
ode>
   * function is used to proceed on to the next iteration by resetting t
he
   * <code>identify</code> function property to the value returned by a
new
   * <code>setTimeout</code> invocation. The function accepts as an opti
onal
   * parameter an interval rate greater than that defined as in the func
tion
   * instance property <code>interval</code> for cases of ratelimiting.
In such
   * a case, the rate is extended to 35 seconds before the callback is c
alled.
   *
   * @param {number} paramInterval - Optional interval rate parameter
   * @returns {void}
   */
  main.setDynamicTimeout.iterate = function (paramInterval) {
    if (this.isPaused || this.isComplete) {
      return;
    }

    // Interval should only be greater than instance interval
    paramInterval = (paramInterval < this.interval || paramInterval == n
ull)
      ? this.interval
      : paramInterval;

    // Define the identifier
    this.identify = window.setTimeout(this.callback, paramInterval);
  };

  /*********************************************************************
*******/
  /*                           Prototype Quicksort
      */
  /*********************************************************************
*******/

  /**
   * @description This implementation of the classic Quicksort algorithm
 is used
   * to quickly sort through a listing of category or namespace member p
ages
   * prior to iteration or display. Originally, the author went with the
 default
   * <code>Array.prototype.sort</code> native code. However, after runni
ng speed
   * tests between Chrome's V8 native implementation and a few custom Qu
icksort
   * algorithms, the author decided to go with a custom implementation.
Current
   * speed tests for the native code generally result in sorting times o
f
   * 700-900 ms for an array of 1,000,000 <code>number</code>s, while th
is
   * custom implementation averages between 150-350 ms for the same data
 set.
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
   * @description One of two main helper functions of the Quicksort algo
rithm,
   * <code>main.sort.swap</code> is used, as the name implies, to swap t
he
   * elements included in the parameter array at the indices specified b
y
   * <code>paramLeft</code> and <code>paramRight</code>. A temporary loc
al
   * variable, <code>swapped</code>, is used to faciliate the switch and
 store
   * the left pointer's value while the element at the right index is as
signed
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
   * @description The second of two such helper functions of the Quickso
rt
   * algorithm, <code>main.sort.partition</code>,as its name implies, is
 used to
   * divide the parameter array based on the values of the <code>number<
/code>
   * index pointers. It is called often during <code>main.sort</code>'s
set of
   * divide-and-conquer recursive calls to further adjust the pointer va
lues and
   * swap values accordingly while the left pointer value is less than t
he right
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

  /*********************************************************************
*******/
  /*                        Prototype API methods
      */
  /*********************************************************************
*******/

  /**
   * @description Prior to UCP update 2, this method employed the Nirvan
a
   * controller <code>UserProfilePage.renderUserIdentityBox</code> to ch
eck a
   * single username for the status of its user account. With subsequent
   * reworking of the calling method <code>main.getExtantUsernames</code
> to
   * query usernames in bulk groups of 500, this method was adjusted and
   * UCPified to use API:Users and pass pipe-delimited lists of users to
 limit
   * the number of total calls needed to start the actual messaging proc
ess.
   *
   * @param {string} paramUsers - A pipe-delimited list of usernames to
query
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getUsernameData = function (paramUsers) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: {
        action: "query",
        list: "users",
        ususers: (this.isThisAn("Array", paramUsers))
          ? paramUsers.join("|")
          : paramUsers,
        format: "json",
      }
    });
  };

  /**
   * @description One of two such methods, this function is used to post
 an
   * individual thread to the selected user's message wall. Returning a
resolved
   * <code>jQuery</code> promise, the function provides the data for tes
ting and
   * logging purposes on a successful edit and returns the associated er
ror if
   * the operation was unsuccessful. This function is called from within
 the
   * main submission handler <code>main.handleSubmit</code>'s assorted
   * <code>$.prototype.Deferred</code> handlers if message walls are ena
bled
   * on-wiki.
   * <br />
   * <br />
   * Due to the deprecation of the old Message Walls and the loss of the
ir
   * associated Nirvana controllers and methods, the Message Wall postin
g and
   * previewing functions now return rejected <code>$.Deferred</code> pr
omises
   * and error codes until such time as a means of external posting to t
he new
   * UCP Message Walls is found.
   *
   * @param {object} paramConfig - <code>object</code> with varying prop
erties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.postMessageWallThread = function (paramConfig) {
    return (this.info.isUCP)
      ? new $.Deferred().reject({error: {code: "ucpmessagewall"}}).promi
se()
      : $.nirvana.postJson("WallExternal", "postNewMessage",
          $.extend(false, {
            token: mw.user.tokens.get("editToken"),
            pagenamespace: 1200,
          }, paramConfig)
        );
  };

  /**
   * @description The second such method, this function is responsible f
or
   * posting a new talk topic to the talk page of the selected user. Lik
e the
   * function above, it returns a resolved <code>jQuery</code> promise a
nd
   * provides the data for testing and logging purposes on success and t
he
   * associated error on failed operations. It too is called from within
 the
   * main submission handler <code>main.handleSubmit</code>'s assorted
   * <code>$.prototype.Deferred</code> handlers if message walls are not
 enabled
   * on the wiki in question.
   *
   * @param {object} paramConfig - <code>object</code> with varying prop
erties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.postTalkPageTopic = function (paramConfig) {
    return $.ajax({
      type: "POST",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        token: mw.user.tokens.get("editToken"),
        action: "edit",
        section: "new",
        format: "json",
      }, paramConfig),
    });
  };

  /**
   * @description This function is one of two that handle the previewing
 of a
   * formatted message, with this specific function used if message wall
s are
   * enabled on the wiki. Like all of the data request functions in the
script,
   * it returns a resolved <code>jQuery</code> promise that provides the
   * invoking handler <code>main.handlePreviewing</code> with the parsed
   * contents of the message in question on successful preview operation
s or the
   * associated error on failed operations.
   * <br />
   * <br />
   * Due to the deprecation of the old Message Walls and the loss of the
ir
   * associated Nirvana controllers and methods, the Message Wall postin
g and
   * previewing functions now return rejected <code>$.Deferred</code> pr
omises
   * and error codes until such time as a means of external posting to t
he new
   * UCP Message Walls is found.
   *
   * @param {string} paramBody - Content of the message
   * @returns {object} - <code>$.Deferred</code> object
   */
  main.previewMessageWallThread = function (paramBody) {
    return (this.info.isUCP)
      ? new $.Deferred().reject({error: {code: "ucpmessagewall"}}).promi
se()
      : $.nirvana.postJson("WallExternal", "preview", {
          body: paramBody,
        });
  };

  /**
   * @description Like its matched function above, this function is used
 to
   * handle previewing of messages on wikis that do not have message wal
ls
   * enabled. Like the rest of the querying functions, this particular i
nstance
   * returns a resolved <code>jQuery</code> promise that provides the in
voking
   * handler function, namely <code>main.handlePreviewing</code>, with t
he
   * parsed contents of the message in question returned on successful
   * previewing operations or the relevant error on failed operations.
   *
   * @param {string} paramBody Content of the message
   * @returns {object} - <code>$.Deferred</code> object
   */
  main.previewTalkPageTopic = function (paramBody) {
    return $.ajax({
      type: "POST",
      url: mw.util.wikiScript("index"),
      data: {
        action: "ajax",
        rs: "EditPageLayoutAjax",
        page: "SpecialCustomEditPage",
        method: "preview",
        content: paramBody,
      }
    });
  };

  /**
   * @description In lieu of the custom preview handlers
   * <code>main.previewMessageWallThread</code> and
   * <code>main.previewTalkPageTopic</code> used on legacy wikis to pars
e and
   * display wikitext message content intended for user talk pages or ol
d-style
   * Message Walls, a general-purpose wikitext parse method is used to h
andle
   * such tasks on UCP wikis. For now, this approach should work as expe
cted, as
   * wikitext still serves as the default content type for user talk pag
es,
   * though not for new-style Message Walls.
   *
   * @param {string} paramText - Wikitext content to be parsed
   * @returns {object} - <code>$.Deferred</code> object
   */
  main.parseWikitextContent = function (paramText) {
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
   * @description This function queries the API for member pages of a sp
ecific
   * namespace, the id of which is included as a property of the paramet
er
   * <code>object</code>. This argument is merged with the default
   * <code>$.ajax</code> parameter object and can sometimes include prop
erties
   * related to <code>query-continue</code> requests for additional memb
ers
   * beyond the default 5000 max. The method returns a resolved
   * <code>$.Deferred</code> promise for use in attaching related callba
cks to
   * handle the member pages.
   *
   * @param {object} paramConfig - <code>object</code> with varying prop
erties
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
   * @description This function queries the API for member pages of a sp
ecific
   * category, the id of which is included as a property of the paramete
r
   * <code>object</code>. This argument is merged with the default
   * <code>$.ajax</code> parameter object and can sometimes include prop
erties
   * related to <code>query-continue</code> requests for additional memb
ers
   * beyond the default 5000 max. The method returns a resolved
   * <code>$.Deferred</code> promise for use in attaching related callba
cks to
   * handle the member pages.
   *
   * @param {object} paramConfig - <code>object</code> with varying prop
erties
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
   * @description This function queries the API for data related to page
s that
   * transclude/embed a given template somewhere. This argument is merge
d with
   * the default <code>$.ajax</code> parameter object and can sometimes
include
   * properties related to <code>query-continue</code> requests for addi
tional
   * members beyond the default 5000 max. The method returns a resolved
   * <code>$.Deferred</code> promise for use in attaching related callba
cks to
   * handle the member pages.
   *
   * @param {object} paramConfig - <code>object</code> with varying prop
erties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.getTemplateTransclusions = function (paramConfig) {
    return $.ajax({
      type: "GET",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        token: mw.user.tokens.get("editToken"),
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
   * @description This function is used in cases of content find-and-rep
lace to
   * acquire the parameter page's text content. As with all <code>$.ajax
</code>
   * invocations, it returns a resolved <code>$.Deferred</code> promise
for use
   * in attaching handlers tasked with combing through the page's conten
t once
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
   * @description This function is the primary means by which all edits
are
   * committed to the database for display on the page. As with several
of the
   * other API methods, this function is passed a config <code>object</c
ode> for
   * merging with the default API parameter object, with parameter prope
rties
   * differing depending on the operation being undertaken. Though it ma
kes no
   * difference for the average editor, the <code>bot</code> property is
 set to
   * <code>true</code>. The function returns a resolved <code>$.Deferred
</code>
   * promise for use in attaching handlers post-edit.
   *
   * @param {object} paramConfig - <code>object</code> with varying prop
erties
   * @returns {object} - <code>$.Deferred</code> resolved promise
   */
  main.postPageContent = function (paramConfig) {
    return $.ajax({
      type: "POST",
      url: mw.util.wikiScript("api"),
      data: $.extend(false, {
        token: mw.user.tokens.get("editToken"),
        action: "edit",
        minor: true,
        bot: true,
        format: "json",
      }, paramConfig)
    });
  };

  /*********************************************************************
*******/
  /*                    Prototype Generator methods
      */
  /*********************************************************************
*******/

  /**
   * @description Originally a part of the <code>getMemberPages</code> f
unction,
   * this method is used to return a <code>$>Deferred</code> object that
 passes
   * back either an error message for display in the modal status log or
 an
   * array containing wellformed titles of individual loose pages, categ
ories,
   * or namespaces. If the type of entries contained with the parameter
array is
   * either pages, usernames, or categories, the function checks that th
eir
   * titles are comprised of legal characters. If the type is namespace,
 it
   * checks that the number passed is a legitimate integer. It also prep
ends the
   * appropriate namespace prefix as applicable as denoted in
   * <code>wgFormattedNamespaces</code>.
   * <br />
   * <br />
   * The function returns a <code>$.Deferred</code> promise instead of a
n array
   * due to the function's use in conjunction with <code>getMemberPages<
/code>
   * in the body of <code>handleSubmit</code> and due to the desire to o
nly
   * permit handlers to add log entries and adjust the view. Originally,
 this
   * function itself added log entries, which the author felt should be
the sole
   * responsibility of the handlers attached to user-facing modal button
s rather
   * than helper functions like this and <code>getMemberPages</code>.
   *
   * @param {Array<string>} paramEntries - Array of pages/cats/ns
   * @param {string} paramType - categories, templates, namespaces, reci
pients
   * @returns {object} $deferred - Promise returned for use w/ <code>the
n</code>
   */
  main.getValidatedEntries = function (paramEntries, paramType) {

    // Declarations
    var i, n, entry, results, $deferred, prefix;

    // Returnable array of valid pages
    results = [];

    // Returned $.Deferred
    $deferred = new $.Deferred();

    // Cats and templates get prefixes
    prefix = this.globals.wgFormattedNamespaces[{
      categories: 14,
      namespaces: 0,
      templates: 10,
    }[paramType]] || "";

    for (i = 0, n = paramEntries.length; i < n; i++) {

      // Cache value to prevent multiple map lookups
      entry = this.capitalize(paramEntries[i].trim());

      if (
        paramType === "recipients" &&
        this.startsWith(entry, this.globals.wgFormattedNamespaces[2])
      ) {
        entry = entry.split(this.globals.wgFormattedNamespaces[2] + ":")
[1];
      }

      [2] https://www.fandom.com/licensing
      [2] https://www.fandom.com/licensing
      [1] https://dev.fandom.com/opensearch_desc.php

      // If requires prefix but entry does not have prefix
      if (!this.startsWith(entry, prefix)) {
        entry = prefix + ":" + entry;
      }

      // If legal page/category name, push into names array
      if (
        (paramType !== "namespaces" && this.isLegalInput(entry)) ||
        (paramType === "namespaces" && this.isInteger(entry))
      ) {
        results.push(entry);
      } else {
        // Error: Use of some characters is prohibited by wgLegalTitleCh
ars
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
   * @description This method is used during the user messaging operatio
n to
   * ensure that the user accounts being messaged actually exist so as t
o avoid
   * the intentional or unintentional addition of messages to the walls/
talk
   * pages of nonexistant users. Future updates to this functionality ma
y
   * eventually include checks for users with edit counts of 0, indicati
ng that
   * the user in question exists but does not contribute to the wiki in
on
   * which the script is being used. In such cases, perhaps the username
 will be
   * removed.
   * <br />
   * <br />
   * As of UCP update 2, the mechanism by which usernames are checked to
 ensure
   * they belong to extant user accounts has changed. Previously, each u
sername
   * was checked via the <code>UserProfilePage.renderUserIdentityBox</co
de>
   * Nirvana controller individually, resulting in as many API queries a
s
   * intended message recipients. This was eventually replaced in favor
of bulk
   * queries to API:Users in groups of 500, thus expediting the validati
on
   * process and rendering the approach more efficient overall.
   *
   * @param {Array<string>} paramEntries - Array of usernames to check
   * @returns {object} - $.Deferred promise object
   */
  main.getExtantUsernames = function (paramEntries) {

    // Declarations
    var i, n, counter, entries, groups, $getData, $getUsers, $addUsers,
      $returnUsers, wallPrefix, userData, user;

    // Deferred definitions
    $addUsers = new $.Deferred();
    $returnUsers = new $.Deferred();

    // Group iterator counter
    counter = 0;

    // Message Wall or User talk
    wallPrefix = this.globals.wgFormattedNamespaces
      (this.info.hasMessageWalls)
        ? 1200
        : 3
    ] + ":";

    // Array of extant usernames with prefix
    entries = [];

    // Get wellformed, formatted usernames
    $getUsers = this.getValidatedEntries(paramEntries, "recipients");

    /**
     * @description Upon the acquisition of validated usernames containi
ng only
     * permissible characters, the associated <code>then</code> callback
s are
     * invoked, either rejecting <code>$returnUsers</code> or continuing
 with
     * the sorting and querying process if successful. If names have bee
n
     * returned, they are divided into groups of 500 that are individual
ly
     * provided to <code>main.getUsernameData</code> due to the absence
of any
     * sort of API:Users continuation option (<code>uscontinue</code>, e
tc.)
     * <br />
     * <br />
     * This replaces the much less efficient method previously employed,
 in
     * which the <code>UserProfilePage.renderUserIdentityBox</code> Nirv
ana
     * controller was queried for each individual username to determine
if the
     * account exists. In the new approach, usernames are queried and ch
ecked in
     * bulk, resulting in a more efficent system.
     */
    $getUsers.then(function (paramNames) {

      // API:Users has no "uscontinue" property for continuing queries o
ver 500
      groups = paramNames.map(function (paramEntry, paramIndex) {
        return (paramIndex % this.Utility.MAX_USERS === 0)
          ? paramNames.slice(paramIndex, paramIndex + this.Utility.MAX_U
SERS)
          : null;
      }.bind(this)).filter(function (paramEntry) {
        return paramEntry;
      });

      // Log paramResults
      if (this.flags.debug) {
        window.console.log(paramEntries, paramNames, groups);
      }

      // Iterate over provided groups of usernames
      this.timer = this.setDynamicTimeout(function () {
        if (counter === groups.length) {
          return $addUsers.resolve(entries);
        }

        // Indicate checking is in progress
        $returnUsers.notify("logStatusCheckingUsernames");

        // Acquire user data
        $getData = $.when(this.getUsernameData(groups[counter++].join("|
")));

        // Once acquired, add pages to array
        $getData.always($addUsers.notify);

      }.bind(this), this.config.interval);
    }.bind(this), $returnUsers.reject.bind(null));

    /**
     * @description The <code>progress</code> callback is notified and i
nvoked
     * for each group of 500 usernames. The individual user data objects
 are
     * checked to determine if they possess the <code>missing</code> pro
perty
     * (indicating a nonexistent or malformed account) or the
     * <code>userid</code> property (possessed by all extant accounts).
A status
     * message is logged for each username depending on its status, thou
gh this
     * may need some adjustment in the future.
     */
    $addUsers.progress(function (paramResults, paramStatus, paramXHR) {
      if (this.flags.debug) {
        window.console.log(paramResults, paramStatus, paramXHR);
      }

      if (paramStatus !== "success" || paramXHR.status !== 200) {
        // Error: Unable to acquire user data for user $1
        $returnUsers.notify("logErrorNoUserData", user.name);
        return this.timer.iterate();
      }

      // Array of user data objects
      userData = paramResults.query.users;

      // Iterate over all usernames and post status log entries for each
      for (i = 0, n = userData.length; i < n; i++) {
        user = userData[i];

        if (user.hasOwnProperty("userid") && !user.hasOwnProperty("missi
ng")) {
          // Success: Username $1 is valid
          $returnUsers.notify("logSuccessUserExists", user.name);
          entries.push(wallPrefix + user.name);
        } else {
          // Error: Unable to acquire user data for user $1
          $returnUsers.notify("logErrorNoUserData", user.name);
        }
      }

      return this.timer.iterate();
    }.bind(this));

    /**
     * @description Once all usernames have been checked for their extan
t status
     * in groups of 500, the <code>done</code> callback of the resolved
     * <code>$addUsers</code> <code>$.Deferred</code> checks if there ar
e any
     * wellformed, extant usernames able to be messaged. If there are, t
his list
     * is returned via resolved promise. Otherwise, an error i18n proper
ty name
     * is returned via rejected promise.
     */
    $addUsers.done(function () {
      if (entries.length) {
        // Return Quicksorted entries
        return $returnUsers.resolve(this.sort(entries)).promise();
      } else {
        // Error: No wellformed pages exist to edit
        return $returnUsers.reject("logErrorNoWellformedUsernames").prom
ise();
      }
    }.bind(this));

    return $returnUsers.promise();
  };

  /**
   * @description This function is used to return a jQuery <code>Deferre
d</code>
   * object providing a <code>then</code> or <code>always</code> invocat
ion with
   * an array of wellformed pages for editing. It accepts as input an ar
ray
   * containing titles of either categories, namespaces, or templates fr
om which
   * to acquire member pages or transclusions. In such cases, a number o
f API
   * calls are made requesting the relevant members contained in the inp
ut
   * categories or namespaces. These are checked and pushed into an entr
ies
   * array. Once complete, the entries array is returned by means of a r
esolved
   * <code>Deferred.prototype.promise</code>.
   * <br />
   * <br />
   * Originally, this function also served to validate loose pages passe
d in the
   * parameter array, running them against the legl characters and retur
ning the
   * <code>entries</code> array for use. However, per the single respons
ibility
   * principle, this functionality was eventually removed into a separat
e method
   * called <code>getValidatedEntries</code> that is called by this meth
od to
   * ensure that the category/namespace titles are wellformed prior to m
aking
   * API queries.
   *
   * @param {Array<string>} paramEntries - Array of user input pages
   * @param {string} paramType - <code>string</code> denoting cat, ns, o
r tl
   * @returns {object} $returnPages - $.Deferred promise object
   */
  main.getMemberPages = function (paramEntries, paramType) {

    // Declarations
    var i, n, names, data, entries, parameters, counter, config, $getPag
es,
      $addPages, $getEntries, $returnPages;

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
        continuer: (this.info.isUCP) ? "apcontinue" : "apfrom",
        target: "apnamespace",
      },
      templates: {
        query: "embeddedin",
        handler: "getTemplateTransclusions",
        continuer: "eicontinue",
        target: "eititle",
      },
    }[paramType];

    // Get wellformed, formatted namespace numbers, category names, or t
emplates
    $getEntries = this.getValidatedEntries(paramEntries, paramType);

    // Once acquired, apply to names array or pass along rejection messa
ge
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
          return $returnPages.reject("logErrorNoWellformedPages").promis
e();
        }
      }

      // Set parameter target page
      parameters[config.target] = names[counter];

      // Fetching member pages of $1 or Fetching transclusions of $1
      $returnPages.notify((paramType === "templates")
        ? "logStatusFetchingTransclusions"
        : "logStatusFetchingMembers", names[counter]);

      // Acquire member pages of cat or ns or transclusions of templates
      $getPages = $.when(this[config.handler](parameters));

      // Once acquired, add pages to array
      $getPages.always($addPages.notify);

    }.bind(this), this.config.interval);

    /**
     * @description Once the member pages from the specific category or
     * namespace have been returned following a successful API query, th
e
     * $addPages <code>$.Deferred</code> is notified, allowing for this
callback
     * function to sanitize the returned data and push the wellformed me
mber
     * page titles into the <code>entries</code> array. If there are sti
ll
     * remaining pages as indicated by a "query-continue" property, the
counter
     * is left unincremented and the relevant continuer parameter added
to the
     * <code>parameters</code> object. In any case, the function ends wi
th a
     * call to iterate the timer.
     */
    $addPages.progress(function (paramResults, paramStatus, paramXHR) {
      if (this.flags.debug) {
        window.console.log(paramResults, paramStatus, paramXHR);
      }

      if (paramStatus !== "success" || paramXHR.status !== 200) {
        $returnPages.notify("logErrorFailedFetch", names[counter++]);
        return this.timer.iterate();
      }

      // Define data
      data = paramResults.query[config.query];

      // If page doesn't exist, add log entry and continue to next itera
tion
      if (data == null || data.length === 0) {
        $returnPages.notify("logErrorNoSuchPage", names[counter++]);
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
          paramResults["query-continue"][config.query][config.continuer]
;
      } else {
        parameters = {};
        counter++;
      }

      // On to the next iteration
      return this.timer.iterate();
    }.bind(this));

    return $returnPages.promise();
  };

  /*********************************************************************
*******/
  /*                      Prototype Assembly methods
      */
  /*********************************************************************
*******/

  /**
   * @description This function is a simple recursive <code>string</code
> HTML
   * generator that makes use of <code>mw.html</code>'s assembly methods
 to
   * construct wellformed HTML strings from a set of nested input arrays
. This
   * allows for a more readable means of producing proper HTML than the
default
   * <code>jQuery</code> approach or the hardcoded HTML <code>string</co
de>
   * approach employed in earlier iterations of this script. Through the
 use of
   * nested arrays, this function permits the laying out of parent/child
 DOM
   * nodes in array form in a fashion similar to actual HTML, enhancing
both
   * readability and usability.
   * <br />
   * <br />
   * Furthermore, as the <code>assembleElement</code> function returns a
   * <code>string</code>, nested invocations of the method within parame
ter
   * arrays is permitted, as evidenced in certain, more specialized asse
mbly
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
   * @param {Array<string>} paramArray - Wellformed array representing D
OM nodes
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

      // Check if recursive assembly is required for another inner DOM e
lement
      content += (this.isThisAn("Array", paramArray[counter]))
        ? this.assembleElement(paramArray[counter++])
        : paramArray[counter++];
    }

    return mw.html.element(type, attributes, new mw.html.Raw(content));
  };

  /**
   * @description This specialized assembly function is used to create a
 tool
   * link to inclusion at the location specified via the <code>placement
</code>
   * instance property. Like the <code>overflow</code> toolbar button on
 which
   * it is based, the element (in <code>string</code> form) returned fro
m this
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
   * @description This function is one of two similar specialized assemb
ly
   * functions used to automate the construction of several reoccuring
   * components in the modal content body. This function builds two type
s of
   * textfield, namely <code>input</code>s and <code>textarea</code>s. T
he
   * components may be disabled at creation via parameter <code>boolean<
/code>.
   * The function also automatically assembles element selector names an
d
   * I18n message titles as needed.
   *
   * @param {string} paramName - Name for message, id/classname generati
on
   * @param {string} paramType - <code>input</code> or <code>textarea</c
ode>
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
   * @description This function is one of two similar specialized assemb
ly
   * functions used to automate the construction of several reoccuring
   * components in the modal content body. This function is used to buil
d
   * dropdown menus from a default value and an array of required
   * <code>option</code>s. As with <code>assembleTextfield</code>, it al
so
   * assembles element selector names and I18n message names for all ele
ments.
   * Per a recent update, the default dropdown option has been removed i
n favor
   * of a default option denoted by the <code>paramIndex</code> paramete
r.
   *
   * @param {string} paramName - <code>string</code> name of the dropdow
n
   * @param {Array<string>} paramValues - Array of dropdown options
   * @param {number} paramIndex - Optional selected index
   * @returns {string} - Assembled <code>string</code> HTML
   */
  main.assembleDropdown = function (paramName, paramValues, paramIndex)
{

    // Declarations
    var i, n, titleMessage, optionMessage, prefix, options, value, attri
butes,
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

  /*********************************************************************
*******/
  /*                        Prototype Modal methods
      */
  /*********************************************************************
*******/

  // Utility methods

  /**
   * @description This modal helper function is used simply to inject mo
dal
   * styling prior to the creation of the new <code>Modal</code> instanc
e. It is
   * used to style scene-specific elements as well as the messaging prev
iew
   * pseudo-scene displayed when the user attempts to parse the message
content.
   * While the styles could be stored in a separate, dedicated
   * <code>MediaWiki:MassEdit/code.css</code> file on Dev, their inclusi
on here
   * allows for fast adjustment of selector names without the hassle of
editing
   * the contents of multiple files. due to the use of a <code>Selectors
</code>
   * object collating all ids and classes evidenced in the modal in a si
ngle
   * place.
   * <br />
   * <br />
   * As of UCP update 2, the previous <code>mw.util.addCSS</code> approa
ch has
   * been augmented and adjusted via the inclusion of the external depen
dency
   * <code>Colors.js</code> and its related methods used to inject wiki-
specific
   * default styling depending on the site theme. This allows for a more
 unified
   * appearance across wikis and ensures that the modal looks more or le
ss the
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
      logColor: "#757575", // Common ::placeholder text color in shadow
DOM
      textfieldBackground: "#FFFFFF",
      textfieldColor: "#000000",
      modalBorder: (this.info.isUCP)
        ? "var(--themed-border-color)"        // UCP has dedicated 2nd b
order
        : colors.parse(colors.wikia.border)   // Just use Colors' border
 styling
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
        "padding-bottom: " + this.Utility.BOTTOM_PADDING + "px !importan
t;" +
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
   * @description This one-size-fits-all helper function is used to log
entries
   * in the status log on the completion of some operation or other. Ori
ginally,
   * three separate loggers were used following a Java-esque method over
loading
   * approach. However, this was eventually abandoned in favor of a sing
le
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
   * @description This helper function is a composite of several previou
sly
   * extant shorter utility functions used to reset the form element,
   * enable/disable various modal buttons, and log messages. It is calle
d in a
   * variety of contexts at the close of editing operations,
   * failed API requests, and the like. Though it does not accept any fo
rmal
   * parameters, it does permit an indeterminate number of arguments to
be
   * passed if the invoking function wishes to log a status message. In
such
   * cases, the collated arguments are bound to a shallow array and pass
ed to
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
   * @description This helper function is used to disable certain elemen
ts and
   * enable others depending on the operation being performed. It is use
d
   * primarily during editing to disable one of several element groups r
elated
   * to either replace fields or the fieldset/modal buttons in order to
prevent
   * illegitimate mid-edit changes to input. If the fieldset, etc. is di
sabled,
   * the method enables the buttons related to pausing and canceling the
 editing
   * operation, and vice versa. Likewise, the preview button is only dis
played
   * when the messaging scene is being viewed, and only when the editing
   * operation is not running.
   * <br />
   * <br />
   * As of UCP update 2, this function received several significant over
hauls.
   * The accepted version iterates through <code>this.modal.modal<code>'
s
   * <code>buttons</code> array and sets the current disabled/enabled st
atus of
   * the button using XOR exclusive disjunction between the
   * <code>paramDisable</code> flag and the initial baseline via of the
button
   * specified in <code>button.disabled</code>. The preview button remai
ns
   * disabled unless the scene is the messaging scene as before.
   * <br />
   * <br />
   * As of UCP update 3, a few minor changes were made to this method, m
ost
   * notable of which was the removal of an "all" + "false" option, in w
hich all
   * buttons may be simultaneously enabled. This behavior should never m
anifest,
   * so in all "all" cases, the buttons will now bulk-disable for use in
 scene
   * transition. Also, given the removal of <code>ModalButton</code> con
fig data
   * to a separate pseudo-enum, the use of a static default <code>boolea
n</code>
   * for disabled status now allows for better XOR comparisons in "parti
al"
   * use cases.
   *
   * @param {string} paramOption - Either "all" or "partial"
   * @param {boolean} paramDisable - Whether to disable the select eleme
nts
   * @returns {void}
   */
  main.toggleModalComponentsDisable = function (paramOption, paramDisabl
e) {
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
    isMessaging = ($scene.value === "message" && $scene.selectedIndex ==
= 2);
    isAll = paramOption === "all";
    buttons = this.modal.modal.buttons;

    // Use each button's disabled prop as default baseline to compare ag
ainst
    for (i = 0, n = buttons.length; i < n; i++) {
      button = buttons[i];
      defaultDisable = this.Buttons[button.event.toUpperCase()].DISABLED
;

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
   * @description Like the similar modal method <code>attachModalEvents<
/code>,
   * this function is invoked once the preview has been displayed to the
 user to
   * ensure that all interactive elements are properly attached to their
   * relevant listeners. It supports messages containing collapsible con
tent and
   * adds a relevant handler for the close button which removes the temp
orary
   * preview container element and redisplays the message scene again on
ce
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
      after: this.toggleModalComponentsDisable.bind(this, "partial", fal
se)
    }));
  };

  /**
   * @description Like the similar modal builder <code>buildModalContent
</code>,
   * this function returns a <code>string</code> HTML framework for the
message
   * preview functionality to which the contents of the message and titl
e are
   * added. Rather than recreate this <code>string</code> each time the
user
   * wants to preview a new message, the contents of this function are s
tored to
   * the <code>modal.preview</code> object property for caching and easi
er
   * retrieval.
   *
   * @returns {string} - The assembled <code>string</code> of preview HT
ML
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
   * @description Like the similar modal function <code>displayModal</co
de>,
   * this function is used to display the preview container in the messa
ging
   * modal scene on presses of the "Preview" modal button. Rather than r
eset the
   * contents of the modal itself by means of
   * <code>Modal.prototype.setContent</code>, an action which would dele
te the
   * data used to construct the preview and require that the user reente
r the
   * content on exiting out of the preview scene, this function instead
hides
   * the main messaging scene and appends a temporary <code>div</code> t
o the
   * modal that is removed once the user closes the preview by means of
the
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
    isMessaging = ($scene.value === "message" && $scene.selectedIndex ==
= 2);
    $byline = $("#" + this.Selectors.ID_CONTENT_BYLINE).val();
    $messaging = $("#" + this.Selectors.ID_CONTENT_MESSAGE);

    // Modal targets
    modalBodyTarget = (this.info.isUCP)
      ? " ." + this.Selectors.CLASS_OOUI_BODY
      : " > section";
    $modal = $("#" + this.Selectors.ID_MODAL_CONTAINER + modalBodyTarget
);

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
   * <code>attachPreviewEvents</code>, this function serves the purposes
 of
   * ensuring that all interactive elements in the various modal scenes
are
   * provided their appropriate listeners. This function handles the dis
abling
   * of various components based on the actions performed and invokes
   * <code>jQuery.prototype.linksuggest</code> for various elements that
 may
   * have wikitext link content on each scene change. As of UCP update 2
, the
   * handler also handles the enabling of the handler attached to the sc
ene-
   * selection dropdown that mediates scene changing.
   *
   * @returns {void}
   */
  main.attachModalEvents = function () {

    // Declarations
    var i, n, element, elements, height;

    // Definitions
    height = 0;
    elements = 
      
        "ID_CONTENT_TARGET",        // Target replacement content
        "ID_CONTENT_CONTENT",       // New content to be added
        "ID_CONTENT_SUMMARY",       // Edit summary
        "ID_CONTENT_BODY",          // Message body
      ],
      
        "CLASS_OOUI_HEAD",          // UCP modal header
        "CLASS_OOUI_FOOT",          // UCP modal footer
        "CLASS_CONTENT_CONTAINER",  // Inner modal body content
      ]
    ][+this.info.isUCP];

    // Apply linksuggest to each element on focus event if legacy wiki
    if (!this.info.isUCP) {
      for (i = 0, n = elements.length; i < n; i++) {
        element = "#" + this.Selectors[elements[i]];

        $(document).on("focus", element,
          $.prototype.linksuggest.bind($(element)));
      }

    // Dynamically adjust modal height on UCP wikis (hacky)
    } else {
      for (i = 0, n = elements.length; i < n; i++) {
        element = "." + this.Selectors[elements[i]];
        height += $(element).height();
      }

      $("." + this.Selectors.CLASS_OOUI_FRAME).height(height +
        (this.Utility.BOTTOM_PADDING * 2));
    }

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
   * <code>buildPreviewContent</code>, this method builds a <code>string
</code>
   * HTML framework to which will be added scene-specific element select
ors and
   * body content. As with <code>buildPreviewContent</code>, this conten
t is
   * only created once within the body of <code>buildModalScenes</code>,
 its
   * value cached in a local variable for use with all scenes requiring
   * assembly and used in conjunction with <code>String.prototype.replac
e</code>
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
   * <code>main.buildModalScenes</code>, this function was used to assem
ble all
   * four main so-called "scenes" that make up the body content of the
   * <code>Modal</code> instance and serve as the user interfaces for th
e
   * associated operations. However, the method was inherently inefficie
nt for
   * building all four scenes every time MassEdit was initialized by the
 user.
   * Though the scenes were temporarily cached in a local
   * <code>main.modal.scenes</code> storage <code>object</code>, they we
re not
   * added to <code>localStorage</code> and thus were rebuilt every time
 the
   * user navigated away from the page on which MassEdit was loaded.
   * <br />
   * <br />
   * To fix this inefficiency and improve the process, the author eventu
ally
   * replaced this approach with a lazy-load-style system that only buil
ds
   * scenes as they are needed and stores preassembled scenes in the bro
wser
   * <code>localStorage</code> object via <code>$.store</code> for subse
quent
   * reuse. To accomplish this, this function was stripped down and rewr
itten.
   * Under its present design, the function first checks storage to see
if the
   * scene has already been built, returning the scene from storage if i
t has
   * been assembled before. Otherwise, the method builds the string HTML
 from
   * design schema housed in <code>main.Scenes</code>, adds that HTML to
   * storage, and returns the result.
   *
   * @param {string} paramScene - Name of the desired scene to build
   * @returns {string} - Assembled string HTML of the desired scene
   */
  main.buildModalScene = function (paramScene) {

    // Declarations
    var i, j, m, n, tempScene, sceneNames, assembledScene, framework, en
umScene,
      dropdownArgs, elements, enumSchema, enumArrays, selector, storedRe
sults;

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

    // Temporary array for scene names used to construct dropdown option
s
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

    // Use schema to dynamically construct string HTML from builder func
tions
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
   * instance that serves as the primary interface of the script. It set
s all
   * click events, defines all modal <code>footer</code> buttons in the
modal,
   * and assembles all the so-called "scenes" related to the various ope
rations
   * supported by MassEdit. Originally, this function also injected the
modal
   * CSS styling prior to creation of the modal, though for the purposes
 of
   * ensuring single responsibility for all functions, the styling was m
oved
   * into a separate function, namely <code>injectModalStyles</code>.
   * <br />
   * <br />
   * As of UCP update 3, this method has been refactored significantly.
All
   * <code>ModalButton</code> config objects have been moved to a dedica
ted
   * <code>main</code> pseudo-enum, <code>Buttons</code>, leaving this f
unction
   * to handle the automatic generation of buttons and associated click
events
   * on a dynamic basis. This replaces the previous approach, in which t
he new
   * <code>Modal</code> instance was created from static data stored wit
hin the
   * function itself.
   *
   * @returns {object} - A new <code>Modal</code> instance
   */
  main.buildModal = function () {

    // Declaration
    var modal;

    // Base Modal config object definition
    modal = {
      content: this.buildModalScene(this.Scenes[this.Utility.FIRST_SCENE
].NAME),
      id: this.Selectors.ID_MODAL_CONTAINER,
      size: this.info.isUCP ? "large" : "medium",
      title: this.i18n.msg("buttonScript").escape(),
    };

    // Auto-generate button config objects from Buttons pseudo-enum
    modal.buttons = Object.values(this.Buttons).map(function (paramButto
n) {
      if (paramButton.hasOwnProperty("HANDLER")) {
        (modal.events = modal.events || {})[paramButton.EVENT] =
          this[paramButton.HANDLER].bind(this);
      }

      return {
        text: this.i18n.msg(paramButton.TEXT).escape(),
        event: paramButton.EVENT,
        primary: paramButton.PRIMARY && !this.info.isUCP,
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
   * @description This method is the primary mechanism by which the moda
l is
   * displayed to the user. If the modal has not been previously assembl
ed, the
   * function constructs a new <code>Modal</code> instance via an invoca
tion of
   * <code>buildModal</code>, creates the modal, and attaches all the re
quisite
   * event listeners related to enabling <code>linksuggest</code> and fi
nd-and-
   * replace-specific modal elements (linksuggest is enabled for the con
tent
   * <code>textarea</code> and the edit summary <code>input</code>).
   * <br />
   * <br />
   * Once all listeners have been attached, the new modal is displayed t
o the
   * user. If the modal has been assembled prior to method invocation, t
he
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
    if (this.info.isUCP) {
      this.modal.modal.buttons.pop();
    }

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

  /*********************************************************************
*******/
  /*                      Prototype Event handlers
      */
  /*********************************************************************
*******/

  /**
   * @description Arguably the most important method of the program, thi
s
   * function coordinates the entire mass editing process from the initi
al press
   * of the "Submit" button to the conclusion of the editing operation.
The
   * entire workings of the process were contained within a single metho
d to
   * assist in maintaining readability when it comes time to invariably
repair
   * bugs and broken functionality. The other two major methods used by
this
   * function are <code>getMemberPages</code> and
   * <code>getValidatedEntries</code>, both of which are used to sanitiz
e input
   * and return wellformed loose member pages if applicable.
   * <br />
   * <br />
   * The function collates all extant user input added via <code>textare
a</code>
   * and <code>input</code> fields before running through a set of condi
tional
   * checks to determine if the user can continue with the requested edi
ting
   * operation. If the user may proceed, the function makes use of a num
ber of
   * <code>$.Deferred</code> promises to coordinate the necessary acquis
ition of
   * wellformed pages for editing. In cases of categories/namespaces, me
mber
   * pages are retrieved and added to the editing queue for processing.
   * <br />
   * <br />
   * As of the latest update implementing additional editing functionali
ty, this
   * method was temporarily separated into four separate methods related
 to each
   * of the four scenes. However, as the same progression of sanitizing
input,
   * acquiring pages, iterating over pages, and logging accordingly was
   * evidenced in all operations, these handlers were once again merged
into
   * this single method to prevent copious amounts of copy/pasta. The on
ly
   * operation that exits early and does not iterate is the listing oper
ation,
   * which merely acquires lists of category members and prepends them t
o an
   * element.
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
    var $action, $type, $case, $match, $content, $target, $indices, indi
ces,
      $pages, pages, $byline, $summary, counter, config, data, pageIndex
,
      newText, $getPages, $postPages, $getNextPage, $getPageContent,
      $postPageContent, error, $scene, isCaseSensitive, isUserRegex, isR
eplace,
      isAddition, isMessaging, isListing, $members, $selected, $body, pa
gesType,
      replaceOccurrences;

    // Dropdowns
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];
    $action = $("#" + this.Selectors.ID_CONTENT_ACTION)[0];
    $type = $("#" + this.Selectors.ID_CONTENT_TYPE)[0];
    $case = $("#" + this.Selectors.ID_CONTENT_CASE)[0];
    $match = $("#" + this.Selectors.ID_CONTENT_MATCH)[0];

    // Textareas/inputs
    $target = $("#" + this.Selectors.ID_CONTENT_TARGET).val();
    $indices = $("#" + this.Selectors.ID_CONTENT_INDICES).val();
    $content = $("#" + this.Selectors.ID_CONTENT_CONTENT).val();
    $pages = $("#" + this.Selectors.ID_CONTENT_PAGES).val();
    $summary = $("#" + this.Selectors.ID_CONTENT_SUMMARY).val();

    // For acquiring text of selected option
    $selected = $("#" + this.Selectors.ID_CONTENT_TYPE + " option:select
ed");

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

    // Substitute for $1 in logErrorNoPages
    pagesType = ((isMessaging)
      ? this.i18n.msg("modalTypeUsernames").escape()
      : $selected.text()).toLowerCase();

    // If no scene selected (should not happen)
    if (!isReplace && !isAddition && !isMessaging && !isListing) {
      return;

    // Is not in the proper rights group
    } else if (!isListing && !this.hasRights(isMessaging)) {
      this.resetModal("logErrorUserRights");
      return;

    // Is either append/prepend with no content input included
    } else if (isAddition && !$content) {
      this.addModalLogEntry("logErrorNoContent");
      return;

    // Is find-and-replace with no target content included
    } else if (isReplace && !$target) {
      this.addModalLogEntry("logErrorNoTarget");
      return;

    // No pages included
    } else if (!$pages) {
      this.addModalLogEntry("logErrorNoPages", pagesType);
      return;

    // If edit summary is greater than permitted max of 800 characters
    } else if ($summary && $summary.length > this.Utility.MAX_SUMMARY_CH
ARS) {
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

    // Find-and-replace specific variable definitions
    if (isReplace) {

      // Only wellformed integers should be included as f-n-r indices
      indices = $indices.split(",").map(function (paramEntry) {
        if (this.isInteger(paramEntry.trim())) {
                      return window.parseInt(paramEntry, 10);
        }
      }.bind(this)).filter(function (paramEntry) {
        return paramEntry != null; // Avoid cases of [undefined]
      });

      // Whether not search and replace is case sensitive
      isCaseSensitive = ($case.selectedIndex === 0 &&
        $case.value === "sensitive");

      // Whether user has input regex for finding & replacing
      isUserRegex = ($match.selectedIndex === 1 &&
        $match.value === "regex");

      // Define regex, etc. only once per submission operation using clo
sure
      replaceOccurrences = this.replaceOccurrences(isCaseSensitive,
        isUserRegex, $target, $content, indices);

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

    // New pending status Deferreds
    $postPages = new $.Deferred();
    $getNextPage = new $.Deferred();

    // Log flag for inspection
    if (this.flags.debug) {
      window.console.log("hasMessageWalls: ", this.info.hasMessageWalls)
;
    }

    /**
     * @description The <code>$getPages</code> <code>$.Deferred</code> i
s used
     * to acquire either wellformed loose page titles or the titles of m
ember
     * pages belonging to input categories or namespaces. In cases of us
er
     * messaging, the function makes use of <code>WgMessageWallsExist</c
ode>
     * functionality to determine whether the wiki on which the script i
s being
     * used has enabled message walls. This knowledge is required as the
 prefix
     * applied to username input will differ ("Message Wall:" vs "User t
alk:")
     * accordingly. Similar functionality can be glimpsed in
     * <code>handlePreview</code>.
     */
    $getPages = new $.Deferred(function ($paramOuter) {
      new $.Deferred(function ($paramInner) {
        (!isMessaging || this.info.hasMessageWalls != null)
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
            this.info.hasMessageWalls = paramHasWalls;
          }

          // Get list of wellformed pages/usernames or member pages
          return this
            (isListing || (!isMessaging && $type.value !== "pages"))
              ? "getMemberPages"
              : (isMessaging)
                ? "getExtantUsernames"
                : "getValidatedEntries"
          ](pages, ($type != null) ? $type.value : null);
        }.bind(this)
      ).then(
        $paramOuter.resolve.bind($), // $getPages.done
        $paramOuter.reject.bind($),  // $getPages.fail
        $paramOuter.notify.bind($)   // $getPages.progress
      );
    }.bind(this));

    /**
     * @description The resolved <code>$getPages</code> returns an array
 of
     * loose pages from a namespace or category, or returns an array of
checked
     * loose pages if the individual pages option is selected or usename
s are
     * inputted. Once resolved, assuming the user is not simply generati
ng a
     * pages list, <code>$getPages</code> uses a <code>setDynamicTimeout
</code>
     * to iterate over the pages, optionally acquiring page content for
     * find-and-replace. Once done, an invocation of <code>notify</code>
 calls
     * <code>$postPages.progress</code> to assemble the parameters neede
d to
     * edit the page in question. Once all pages have been edited, the p
ending
     * <code>$.Deferred</code>s are resolved and the timer exited.
     */
    $getPages.done(function (paramResults) {
      pages = paramResults;

      // Log pages list (members or wellformed pages)
      if (this.flags.debug) {
        window.console.log("$getPages: ", pages);
      }

      // Listing activities end once members are acquired and shown to t
he user
      if (isListing) {
        // Add category members to textarea
        $members.text(pages.join("\n"));

        $getNextPage.resolve();
        $postPages.resolve("logSuccessListingComplete");
        return;
      }

      // Iterate over pages
      this.timer = this.setDynamicTimeout(function () {
        if (counter === pages.length) {
          $getNextPage.resolve();
          $postPages.resolve("logSuccessEditingComplete");
        } else {
          $getPageContent = (isReplace || isAddition)
            ? this.getPageContent(pages[counter])
            : new $.Deferred().resolve({}).promise();

          // Grab data, extend parameters, then edit the page
          $getPageContent.always($postPages.notify);
        }
      }.bind(this), this.config.interval);
    }.bind(this));

    /**
     * @description In the cases of failed loose page acquisitions, eith
er from
     * a failed API GET request or from a lack of wellformed input loose
 pages,
     * the relevant log entry returned from the getter function's
     * <code>$.Deferred</code> is logged, the timer canceled, and the mo
dal form
     * re-enabled by means of <code>resetModal</code>.
     */
    $getPages.fail(this.resetModal.bind(this));

    /**
     * @description Whenever the getter function (<code>getMemberPages</
code> or
     * <code>getValidatedEntries</code>) needs to notify its invoking fu
nction
     * of a new ongoing category/namespace member acquisition operation,
 the
     * returned status message is acquired and added to the modal log.
     */
    $getPages.progress(this.addModalLogEntry.bind(this));

    /**
     * @description Once the <code>$postPages</code> <code>Deferred</cod
e> is
     * resolved, indicating the completion of the requested mass edits,
a final
     * status message is logged, the form reenabled and reset for a new
     * round, and the <code>setDynamicTimeout</code> timer canceled by m
eans of
     * <code>resetModal</code>.
     */
    $postPages.always(this.resetModal.bind(this));

    /**
     * @description The <code>progress</code> handler is used to extend
the
     * <code>parameters</code> object with properties relevant to the ac
tion
     * being performed (i.e. addition, replace, or messaging). Once comp
lete,
     * the modified page content is committed and the edit made by means
 of
     * a scene-specific handler, namely either <code>postPageContent</co
de>,
     * <code>postTalkPageTopic</code>, or <code>postMessageWallThread</c
ode>.
     * Once the edit is complete and a resolved promise returned,
     * <code>$postPageContent</code> pings the pending <code>$getNextPag
e</code>
     * <code>$.Deferred</code> to log the relevant messages and iterate
on to
     * the next page to be edited.
     */
    $postPages.progress(function (paramResults) {
      if (this.flags.debug) {
        window.console.log("$postPages results: ", paramResults);
      }

      // Reduce some code repetition via consolidation of shared code
      if (isAddition || isReplace) {

        // Make sure returned results have a "query" property
        if (
          paramResults.query == null ||
          !paramResults.hasOwnProperty("query")
        ) {
          this.addModalLogEntry("logErrorEditing", pages[counter++]);
          return this.timer.iterate();
        }

        // Default config parameters
        config = {
          handler: "postPageContent",
          parameters: {
            title: pages[counter],
            token: mw.user.tokens.get("editToken"),
            summary: $summary,
          }
        };

        // Definitions
        pageIndex = Object.keys(paramResults.query.pages)[0];
        data = paramResults.query.pages[pageIndex];

        // Only add undoc'ed param if commenting is enabled
        if (
          this.info.isUCP &&
          $.inArray("comment", data.protection.map(function (paramProtec
tion) {
            return paramProtection.type;
          })) === -1
        ) {
          config.parameters.wpIsCommentingEnabled = null;
        }
      }

      // Addition-specific parameters
      if (isAddition) {

        // "appendtext" or "prependtext"
        if (!this.flags.testing) {
          config.parameters[$action.value.toLowerCase() + "text"] = $con
tent;
        }

      // Find-and-replace parameters
      } else if (isReplace) {

        // Shim to handle ArticleComments that do not have revision hist
ory
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

        // isReplace-specific parameter
        config.parameters.text = data.revisions[0]["*"];

        // Replace instances of chosen text with inputted new text
        newText = replaceOccurrences(config.parameters.text);

        // Return if old & new revisions are identical in content
        if (newText === config.parameters.text) {
          // Error: No instances of $1 found in $2.
          this.addModalLogEntry("logErrorNoMatch", $target, pages[counte
r++]);
          return this.timer.iterate();
        } else {
          if (!this.flags.testing) {
            config.parameters.text = newText;
          }
        }

      // Messaging parameters
      } else if (isMessaging) {
        config = 
          {
            handler: "postTalkPageTopic",
            parameters: (this.flags.testing) ? {} : {
              sectiontitle: $byline,
              text: $body,
              title: pages[counter],
            }
          },
          {
            handler: "postMessageWallThread",
            parameters: (this.flags.testing) ? {} : {
              messagetitle: $byline,
              body: $body,
              pagetitle: pages[counter],
            }
          },
        ][+this.info.hasMessageWalls];
      }

      // Log all config handlers and parameters
      if (this.flags.debug) {
        window.console.log("Config: ", config);
      }

      // Deferred attached to posting of data
      $postPageContent = this[config.handler](config.parameters);
      $postPageContent.always($getNextPage.notify);

    }.bind(this));

    /**
     * @description The pending state <code>$getNextPage</code>
     * <code>$.Deferred</code> is pinged by <code>$postPageContent</code
> once
     * an POST request is made and a resolved status <code>$.Deferred</c
ode>
     * returned. The <code>progress</code> callback takes the resultant
success/
     * failure data and logs the relevant messages before moving the ope
ration
     * on to the iteration of the <code>setDynamicTimeout</code> timer.
If the
     * user has somehow been ratelimited, the function introduces a 35 s
econd
     * cooldown period before undertaking the next edit and pushes the u
nedited
     * page back onto the <code>pages</code> stack.
     */
    $getNextPage.progress(function (paramData) {
      if (this.flags.debug) {
        window.console.log("$getNextPage results: ", paramData);
      }

      error = (paramData.error && paramData.error.code)
        ? paramData.error.code
        : "unknownerror";

      // Success differs depending on status of message walls on wiki
      if (
        (
          (!isMessaging || (isMessaging && !this.info.hasMessageWalls))
&&
          paramData.edit &&
          paramData.edit.result === "Success"
        ) ||
        (
          isMessaging && this.info.hasMessageWalls && paramData.status &
&
          paramData.statusText !== "error"
        )
      ) {
        this.addModalLogEntry("logSuccessEditing", pages[counter++]);
      } else if (error === "ratelimited") {

        // Show ratelimit message with the delay in seconds
        this.addModalLogEntry("logErrorRatelimited",
          (this.Utility.DELAY / 1000).toString());

        // Push the unedited page back on the stack
        pages.push(pages[counter++]);
      } else {
        // Error: $1 not edited. Please try again.
        this.addModalLogEntry("logErrorEditing", pages[counter++]);
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
   * @description This function serves as the primary event listener for
 presses
   * of the "Preview" button available to users who are seeking to mass-
message
   * other users. From the end user's perspective, the button press shou
ld be
   * met with the fading out of the messaging modal scene and the displa
y of a
   * parsed version of the title and associated message. On presses of t
he close
   * button, the preview should fade out and be replaced by the messagin
g modal
   * with all of the user's messaging input still displayed in the textf
ields.
   * <br />
   * <br />
   * This function accomplishes this by checking the user's input and qu
erying
   * the database via <code>wgMessageWallsExist</code> to determine whet
her the
   * wiki on which the script is being used has enabled message walls. D
epending
   * on this query, the methods used to render and display the preview w
ill
   * change though the end results will be the same. The function will f
ade in
   * and out using <code>handleClear</code> and invoke the requisite
   * <code>displayPreview</code> to show the preview <code>div</code> an
d
   * <code>attachPreviewEvents</code> to handle collapsibles and other e
vents.
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
    isMessaging = ($scene.value === "message" && $scene.selectedIndex ==
= 2);

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
     * @description <code>$previewMessage</code> handles the acquisition
 of
     * parsed HTML content related to the user's input message body and
title.
     * Naturally, in order to ensure that the proper API methods are inv
oked,
     * the script must determine if the wiki on which MassEdit is being
used
     * has enabled message walls. Once the proper method has been invoke
d, the
     * resultant <code>object</code> containing the message body HTML is
 passed
     * to <code>$previewMessage.done</code>.
     */
    $previewMessage = new $.Deferred(function ($paramOuter) {
      new $.Deferred(function ($paramInner) {
        (this.info.hasMessageWalls != null)
          ? $paramInner.resolve(this.info.hasMessageWalls).promise()
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
          if (this.info.hasMessageWalls == null) {
            this.info.hasMessageWalls = paramHasWalls;
          }

          // Use general-purpose parser for UCP wikis
          return this[(this.info.isUCP)
            ? "parseWikitextContent"
            : (paramHasWalls)
              ? "previewMessageWallThread"
              : "previewTalkPageTopic"
          ]($body);
        }.bind(this)
      ).then(
        $paramOuter.resolve.bind($), // $previewMessage.done
        $paramOuter.reject.bind($)   // $previewMessage.fail
      );
    }.bind(this));

    /**
     * @description Upon successful completion of the preview request op
eration,
     * the results are logged and the <code>handleClear</code> scene tra
nsition
     * method invoked. In such cases, <code>displayPreview</code> is inv
oked
     * following the fade out to hide the messaging scene and append a p
review
     * <code>div</code> and <code>attachPreviewEvents</code> is invoked
     * following the post appending fade-in.
     */
    $previewMessage.done(function (paramResults) {
      if (this.flags.debug) {
        window.console.log("$previewMessage results: ", paramResults);
      }

      // The string HTML for display as preview modal body
      contents = (this.info.isUCP)
        ? paramResults.parse.text["*"]
        : paramResults[(this.info.hasMessageWalls) ? "body" : "html"];

      // Bypass handleClear's default functionality via the functions ob
ject
      this.handleClear({
        before: this.displayPreview.bind(this, contents),
        after: this.attachPreviewEvents.bind(this),
      });
    }.bind(this));

    /**
     * @description In cases wherein the message preview has failed for
some
     * reason, the message scene doesn't change. The only alteration is
the
     * addition of a relevant status log message denoting a failed previ
ew
     * request.
     */
    $previewMessage.fail(this.addModalLogEntry.bind(this, "logErrorNoPre
view"));
  };

  /**
   * @description The <code>handleToggle</code> is the primary click han
dler for
   * the "Pause/Resume" button used to toggle the iteration timer. Depen
ding on
   * whether or not the timer is in use in iterating through collated pa
ges
   * requiring editing, the text of the button will change accordingly.
Once
   * invoked, the method will either restart the timer during an iterati
on or
   * pause it indefinitely. If the timer is not running, the method will
 exit.
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
    toggle = "#" + this.Selectors.ID_MODAL_TOGGLE +
      ((this.info.isUCP) ? " ." + this.Selectors.CLASS_OOUI_LABEL : "");
    config = 
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
   * @description Similar to <code>handleToggle</code>, this function is
 used to
   * cancel the timer used to iterate through pages requiring editing. A
s such,
   * it cancels the timer, adds a relevant status log entry, and re-enab
les the
   * standard editing buttons in the modal <code>footer</code>. If the t
imer is
   * presently not running, the method simply returns and exits. The tim
er is
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
   * @description As the name implies, the <code>handleClear</code> list
ener is
   * mainly used to clear modal contents and reset the <code>form</code>
 HTML
   * element. Rather than simply invoke the helper function
   * <code>resetModal</code>, however, this function adds some animation
 by
   * disabling the button set and fading in and out of the modal body du
ring the
   * clearing operation, displaying a status message in the log upon com
pletion.
   * <br />
   * <br />
   * In addition to its main responsibility of clearing the modal fields
 of
   * content, the function is also used as the primary means of transiti
oning
   * between scenes on changes to the scene dropdown. It can even accept
 in
   * place of a "transitioning" <code>boolean</code> input flag a dedica
ted
   * functions <code>object</code> containing handlers for the fade-in/f
ade-out
   * progression, bypassing all other internal functionality apart from
the
   * core fade operation.
   *
   * @param {boolean|object} paramInput - Flag or handler <code>object</
code>
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
    var $scene, functions, visible, hidden, isTransitioning, modalBodyTa
rget;

    // Whether the function is being used to reset or scene transition
    isTransitioning = (typeof paramInput !== "boolean") ? false : paramI
nput;

    // Scene dropdown element
    $scene = $("#" + this.Selectors.ID_CONTENT_SCENE)[0];

    // Part of the modal containing the content body
    modalBodyTarget = (this.info.isUCP)
      ? " ." + this.Selectors.CLASS_OOUI_BODY
      : " > section";

    // $.prototype.animate objects
    visible = {opacity: 1};
    hidden = {opacity: 0};

    // Define listeners for fade-in and fade-out (either custom or defau
lts)
    functions = (
      this.isThisAn("Object", paramInput) &&
      paramInput.hasOwnProperty("before") &&
      paramInput.hasOwnProperty("after")
    )
      ? paramInput
      : 
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

  /*********************************************************************
*******/
  /*                     Prototype Pseudo-constructor
      */
  /*********************************************************************
*******/

  /**
   * @description The confusingly named <code>main.init</code> function
serves
   * as a pseudo-constructor of the MassEdit class instance .Through the
   * <code>descriptor</code> passed to <code>init.main</code>'s invocati
on of
   * <code>Object.create</code> sets the <code>i18n</code>, <code>config
</code>,
   * <code>interval</code>, and <code>placement</code> instance properti
es, this
   * function sets default values for <code>modal</code>, <code>timer</c
ode>,
   * <code>globals</code>, <code>flags</code>, and <code>info</code> pro
perties
   * and defines the toolbar element and its associated event listener,
namely
   * <code>displayModal</code>. The method also populates and returns an
   * <code>object</code> containing methods and aliases for addition to
   * <code>window.dev.massEdit.exports</code>, a container for public, e
xposed
   * methods externally accessible for post-load debugging purposes.
   * <br />
   * <br />
   * Following this function's invocation, the MassEdit class instance w
ill have
   * a total of seven instance variables, namely, <code>i18n</code>,
   * <code>config</code>, <code>flags</code>, <code>globals</code>,
   * <code>modal</code>, <code>timer</code>, and <code>info</code>. All
other
   * functionality related to MassEdit is stored in the class instance
   * prototype, the <code>main</code> namespace object, for convenience.
   *
   * @returns {object} exports - Methods exposed via <code>module.export
s</code>
   */
  main.init = function () {

    // Declarations
    var i, n, $toolItem, toolText, exports, flags, flag, publicMethod;

    // Definitions
    exports = {};
    flags = Object.keys(this.Flags);

    // I18n config for wiki's content language
    this.i18n.useContentLang();

    // Initialize new modal property
    this.modal = {};

    // Initialize a new dynamic timer object
    this.timer = null;

    // Set default null placeholder value
    this.info.hasMessageWalls = null;

    // Replacement for previous script-global constants; apply default v
alues
    this.flags = {
      debug: this.Flags.DEBUG,
      testing: this.Flags.TESTING,
    };

    // Text to display in the tool element
    toolText = this.i18n.msg("buttonScript").plain();

    // Build tool item (nested link inside list element)
    $toolItem = $(this.assembleOverflowElement(toolText));

    // Display the modal on click
    $toolItem.on("click", this.displayModal.bind(this));

    // Either append or prepend the tool to the target
    $(this.config.placement.element)[this.config.placement.type]($toolIt
em);

    // Assemble MassEdit instance's public methods for module.exports
    for (i = 0, n = flags.length; i < n; i++) {
      flag = flags[i].toLowerCase();
      publicMethod = "toggle" + this.capitalize(flag);
      exports[publicMethod] = this.toggleFlag.bind(this, flag);
    }

    // Return public methods to be added to module.exports object
    return exports;
  };

  /*********************************************************************
*******/
  /*                         Setup Helper methods
      */
  /*********************************************************************
*******/

  /**
   * @description This helper function is used to automatically generate
 an
   * appropriate contrived ResourceLoader module name for use in loading
 scripts
   * via <code>mw.loader.implement</code> on UCP wikis. The use of this
function
   * replaces the previous approach that saw the inclusion of hardcoded
module
   * names as properties of the relevant dependency <code>object</code>s
 stored
   * in <code>init.Dependencies.ARTICLES</code>. When passed an argument
   * formatted as <code>u:dev:MediaWiki:Test/code.js</code>, the functio
n will
   * extract the subdomain name ("dev") and join it to the name of the s
cript
   * ("Test") with the article type ("script") as <code>script.dev.Test<
/code>.
   *
   * @param {string} paramType - Either "script" or "style"
   * @param {string} paramPage - Article formatted as "u:dev:MediaWiki:T
est.js"
   * @returns {string} - ResourceLoader module name formatted "script.de
v.Test"
   */
  init.generateModuleName = function (paramType, paramPage) {
    return $.merge([paramType], paramPage.split(/[\/.]+/)[0].split(":").
filter(
      function (paramItem) {
        return !paramItem.match(/^u$|^mediawiki$/gi);
      }
    )).join(".");
  };

  /**
   * @description The first of two user input validators, this function
is used
   * to ensure that the user's included config details related to Placem
ent.js
   * are wellformed and legitimate. MassEdit.js offers support for all o
f
   * Placement.js's default element locations, though as a nod to the pr
evious
   * incarnation of the script, the default placement element is the too
lbar and
   * the default type is "append." In the event of an error being caught
 due to
   * a malformed element location or a missing type, the default config
options
   * housed in <code>Message.utility.defaultConfig</code> are used inste
ad to
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
      validatedConfig.element = loader.element(this.Placement.DEFAULTS.E
LEMENT);
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
   * @description The second of the two validator functions used to chec
k that
   * user input is wellformed and legitimate, this function checks the u
ser's
   * edit interval value against the permissible values for standard use
rs and
   * flagged bot accounts. In order to ensure that the operations are ca
rried
   * out smoothly, the user's rate is adjusted if it exceeds the edit
   * restrictions placed upon accounts of different user rights levels.
The
   * original incarnation of this method came from a previous version of
   * MassEdit which made use of a similar, jankier system to ensure the
smooth
   * progression through all included pages without loss of required edi
ts.
   *
   * @see <a href="https://git.io/fA4Jk">SUS-4775</a>
   * @see <a href="https://git.io/fA4eQ">VariablesBase.php</a>
   * @param {number} paramInterval - User's input interval value
   * @return {number} - Adjusted interval
   */
  init.defineInterval = function (paramInterval) {

    // Declaration
    var isNumber;

    // Definition
    isNumber = (typeof value === "number" && window.isFinite(paramInterv
al) &&
      !window.isNaN(paramInterval));

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

  /*********************************************************************
*******/
  /*                          Setup Primary methods
      */
  /*********************************************************************
*******/

  /**
   * @description The confusingly named <code>init.main</code> function
is used
   * to coordinate the script setup madness in a single method, validati
ng all
   * user input by means of helper method invocation and setting all ins
tance
   * properties of the MassEdit class instance. Once the <code>descripto
r</code>
   * <code>object</code> has been assembled containing the relevant inst
ance
   * variables for placement, edit interval, and i18n messages, the meth
od calls
   * <code>Object.create</code> to construct a new MassEdit class instan
ce,
   * passing the <code>descriptor</code> and the <code>main</code> names
pace
   * <code>object</code> as the instance's prototype. Once the new insta
nce is
   * created and added as a property of the <code>init</code> object, th
e method
   * creates a new protected property of <code>window.dev.massEdit</code
> called
   * <code>exports</code> used to store exposed public methods for use i
n
   * post-load debugging. At the method's end, a <code>mw.hook</code> is
 fired
   * for potential coordination with other scripts or user code.
   * <br />
   * <br />
   * The separation of setup code and MassEdit functionality code into d
istinct
   * namespace <code>object</code>s helped to ensure that code was logic
ally
   * organized per the single responsibility principle and more readable
 by
   * virtue of the fact that each namespace handles distinctly different
 tasks.
   * This will assist in debugging should an issue arise with either the
 setup
   * or the script's functionality itself.
   *
   * @param {undefined|function} paramRequire - Via <code>mw.loader.usin
g</code>
   * @param {object} paramLang - i18n <code>object</code> returned from
hook
   * @returns {void}
   */
  init.main = function (paramRequire, paramLang) {

    // Declarations
    var i, n, configTypes, descriptor, parameter, lowercase, method, pro
perty,
      descriptorProperties, userConfig, field, instanceFields, initExpor
ts,
      instanceExports;

    // Cleanup init namespace by deleting temp variables
    delete this.modules;

    // Two types of config object property
    configTypes = ["Interval", "Placement"];

    // MassEdit object instance's local fields and values
    instanceFields = 
      {
        name: "i18n",
        value: paramLang,
      },
      {
        name: "config",
        value: {},
      },
      {
        name: "info",
        value: $.extend({}, this.info),
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

    // Create MassEdit instance, keep for future observation, and store
exports
    instanceExports = (this.instance = Object.create(main, descriptor)).
init();

    // Once instance is created, expose public methods for external debu
gging
    Object.defineProperty(module, "exports",
      $.extend($.extend({}, descriptorProperties), {
        value: Object.freeze($.extend(initExports, instanceExports)),
      })
    );

    // Dispatch hook with window.dev.massEdit once initialization is com
plete
    mw.hook(this.Utility.HOOK_NAME).fire(module);
  };

  /**
   * @description Originally a pair of functions called <code>init.load<
/code>
   * and <code>init.preload</code>, this function is used to load all re
quired
   * external dependencies from Dev and attach <code>mw.hook</code> list
eners.
   * Once all scripts have been loaded and their events fired, the I18n-
js
   * method <code>loadMessages</code> is invoked, the <code>$.Deferred</
code>
   * promise resolved, and the resultant i18n data passed for subsequent
 usage
   * in <code>init.main</code>.
   * <br />
   * <br />
   * As an improvement to the previous manner of loading scripts, this f
unction
   * first checks to see if the relevant <code>window.dev</code> propert
y of
   * each script already exists, thus signaling that the script has alre
ady been
   * loaded elsewhere. In such cases, this function will skip that impor
t and
   * move on to the next rather than blindly reimport the script again a
s it
   * did in the previous version.
   * <br />
   * <br />
   * As of the 1st of July update, an extendable framework for the loadi
ng of
   * ResourceLoader modules and Dev external dependencies (scripts and
   * stylesheets alike) on both UCP wikis and legacy 1.19 wikis has been
 put
   * into place, pending UCPification of the aforementioned Dev scripts
or the
   * importation of legacy features to the UCP codebase. To handle the l
ack of
   * async callbacks in <code>mw.loader.load</code>, this framework invo
kes
   * <code>mw.loader.implement</code> to create temporary, local RL modu
les that
   * can then be asynchronously loaded via <code>mw.loader.using</code>
and
   * handled by a dedicated callback.
   *
   * @param {object} paramDeferred - <code>$.Deferred</code> instance
   * @returns {void}
   */
  init.load = function (paramDeferred) {

    // Declarations
    var debug, articles, counter, numArticles, $loadNext, current, isLoa
ded,
      article, server, params, resource, moduleName;

    // Definitions
    debug = false;
    counter = 0;
    articles = this.Dependencies.ARTICLES;
    numArticles = articles.length;
    $loadNext = new $.Deferred();

    /**
     * @description The passed <code>$.Deferred</code> argument instance
 called
     * <code>paramDeferred</code> is variously notified during the loadi
ng of
     * dependencies by the <code>$loadNext</code> promise whenever a dep
endency
     * has been successfully imported by <code>window.importArticles</co
de> or
     * <code>mw.loader.using</code>. The <code>progress</code> handler c
hecks if
     * all dependencies have been successfully loaded for use before loa
ding the
     * latest version of cached <code>i18n</code> messages and resolving
 itself
     * to pass program execution on to <code>init.main</code>.
     */
    paramDeferred.notify().progress(function (paramResponse) {

      // Examine returned contents from mw.hooks
      if (paramResponse != null) {
        // Wrap in Promise to gracefully handle WgMessageWallsExist reje
ctions
        window.Promise.resolve(paramResponse).then(function (paramRespon
se) {
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
    * @description The <code>$loadNext</code> helper <code>$.Deferred</c
ode>
    * instance is used to load each dependency using methods appropriate
 to the
    * version of MediaWiki detected on the wiki. While the standard
    * <code>importArticle</code> method is used for legacy 1.19 wikis, a
 local
    * ResourceLoader module is defined via <code>mw.loader.implement</co
de> and
    * loaded via <code>mw.loader.using</code> to sidestep the fact that
the
    * <code>mw.loader.load</code> method traditionally used to load depe
ndencies
    * has no callback or promise. Once all imports are loaded, the handl
er
    * applies a callback to any extant <code>mw.hook</code> events and n
otifies
    * the main <code>paramDeferred.progress</code> handler to check if a
ll
    * dependencies have been loaded.
    */
    $loadNext.progress(function (paramCounter) {

      // Selected dependency to load next
      current = articles[paramCounter];

      // If window has property related to dependency indicating load st
atus
      isLoaded =
        (current.DEV && window.dev.hasOwnProperty(current.DEV)) ||
        (current.WINDOW && window.hasOwnProperty(current.WINDOW));

      // Add hook if loaded; dependencies w/o hooks must always be loade
d
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

        // Styles won't have hooks; notify status with load event if sty
les
        return (current.HOOK)
          ? mw.hook(current.HOOK).add(paramDeferred.notify)
          : $(article).on("load", paramDeferred.notify);

      } catch (paramError) {
        if (debug) {
          window.console.error(this.Utility.SCRIPT, paramError);
        }

        // Build url with REST params
        server = "https://dev.fandom.com";
        params = "?" + $.param({
          mode: "articles",
          only: current.TYPE + "s",
          articles: current.ARTICLE,
        });
        resource = server + this.globals.wgLoadScript + params;
        moduleName = this.generateModuleName(current.TYPE, current.ARTIC
LE);

        // Ensure wellformed module name
        if (debug) {
          window.console.log(moduleName);
        }

        // Define local modules to sidestep mw.loader.load's lack of cal
lback
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

  /**
   * @description This particular loading function is used simply to cal
culate
   * and inject some pre-load <code>init</code> object properties prior
to the
   * loading of required external dependencies or ResourceLoader modules
. As the
   * loading process depends on this function's set informational proper
ies, the
   * function is called prior to the initial <code>init.load</code> invo
cation
   * at the start of the script's execution and returns a reference to t
he
   * <code>init</code> object (presumably) for use in subsequent method
chaining
   * purposes.
   *
   * @returns {object} init - Reference to <code>init</code> object for
chaining
   */
  init.preload = function () {

    // Fetch, define, and cache globals for use in init and MassEdit ins
tance
    this.globals = Object.freeze(mw.config.get(this.Globals));

    // Object for informational booleans (extended in MassEdit init meth
od)
    this.info = {
      isUCP: window.parseFloat(this.globals.wgVersion) > 1.19,
    };

    // Which default ResourceLoader modules to load (UCP-dependent)
    this.modules = this.Dependencies.MODULES.slice(+this.info.isUCP);

    // Return reference for method chaining purposes
    return this;
  };

  // Coordinate loading of all relevant dependencies
  $.when(
    mw.loader.using((init.preload.call(init)).modules),
    new $.Deferred(init.load.bind(init)).promise())
  .then(init.main.bind(init))
  .fail(window.console.error.bind(window.console, init.Utility.SCRIPT));

}((this.dev = this.dev || {}).massEdit = this.dev.massEdit || {}, this,
  this.jQuery, this.mediaWiki));