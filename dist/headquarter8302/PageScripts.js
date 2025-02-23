"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// @ts-check
(function (window, mw, _window$dev) {
  "use strict";

  ((_window$dev = window.dev) !== null && _window$dev !== void 0 ? _window$dev : window.dev = {}).pageScripts = window.dev.pageScripts || {
    hasRan: false,
    disabled: false,
    _util: {
      /**
       * Format messages with a proper prefix
       * @param {string[]} msg The data to format
       * @returns {string}
       */
      msgFmt: function msgFmt() {
        var _PageScripts;
        return (_PageScripts = "[PageScripts] ").concat.apply(_PageScripts, arguments);
      }
    },
    /**
     * List of full page titles to exclude execution at all, even if it's included in the `scripts` and `globalScripts` arrays.
     *
     * By default, these pages are blacklisted:
     * 1. Special:Version
     * 2. Special:Analytics
     * 3. Special:ThemeDesigner
     * 4. Special:Statistics
     *
     * Note that changes made further down the execution queue that redefines this property will _overwrite_ the previous list. Make sure to avoid accidentally overwriting the default blacklist
     * @type {string[]}
     */
    blacklist: ["Special:Version", "Special:Analytics", "Special:ThemeDesigner", "Special:Statistics"],
    /**
     * DEFINE THIS BEFORE THE SCRIPT LOADS
     *
     * List of fully-qualified script titles to load in every page
     */
    globalScripts: [],
    /**
     * DEFINE THIS BEFORE THE SCRIPT LOADS
     *
     * List of scripts for PageScripts to read. `PageScriptObj`'s format is:
     * ```ts
     * { page: string, scripts: string[] }
     * ```
     * Where:
     * 1. `page` is the full page name. No special formatting or wildcards or arrays
     * 2. `scripts` is an array of fully-qualified script titles to load in said page
     * @type {{ page: string, scripts: string[] }[]}
     */
    pageScripts: []
  };

  /** @enum {number} */
  var ExitReasons = {
    HasRan: 0,
    Disabled: 1
  };
  var log = window.dev.pageScripts._util.msgFmt;
  var exitReason;
  if (window.dev.pageScripts.hasRan) {
    exitReason = ExitReasons.HasRan;
  } else if (window.dev.pageScripts.disabled) {
    exitReason = ExitReasons.Disabled;
  }
  if (exitReason !== undefined) switch (exitReason) {
    case ExitReasons.HasRan:
      console.warn(log("Script already ran!"));
      return;
    case ExitReasons.Disabled:
      console.warn(log("Script was disabled!"));
      return;
  }

  /** @type {{ wgPageName: string }} */
  var conf = mw.config.get(["wgPageName"]);

  /** @type {{ page: string, scripts: string[] }[]} */
  var pageScriptList = window.dev.pageScripts.pageScripts;

  /** @type {string[]} */
  var globalScriptList = window.dev.pageScripts.globalScripts;

  /** @type {string[]} */
  var blacklist = window.dev.pageScripts.blacklist;

  /**
   * Initialize the script
   * @returns {void}
   */
  function init() {
    /** @type {string[]} */
    var scriptsToLoad = [];
    if (!blacklist.includes(conf.wgPageName)) {
      var _iterator = _createForOfIteratorHelper(pageScriptList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var script = _step.value;
          if (script.page === conf.wgPageName) scriptsToLoad.push.apply(scriptsToLoad, _toConsumableArray(script.scripts));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(globalScriptList),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _script = _step2.value;
          scriptsToLoad.push(_script);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (scriptsToLoad.length > 0) {
        // @ts-expect-error
        importArticles({
          type: 'script',
          articles: scriptsToLoad
        });
      }
    }
  }

  /**
   * Bypasses the whole point of the script, and loads everything, _except_ the ones already in the script list
   * @param {string[]} scriptList Array of script titles to be passed into `importArticles`
   * @returns {void}
   */
  function loadRest(scriptList) {
    /** @type {string[]} */
    var extractedScripts = [];

    /** @type {string[]} */
    var scriptsToLoad = [];
    var _iterator3 = _createForOfIteratorHelper(pageScriptList),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var pageScript = _step3.value;
        var _iterator4 = _createForOfIteratorHelper(pageScript.scripts),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _script2 = _step4.value;
            extractedScripts.push(_script2);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    for (var _i = 0, _extractedScripts = extractedScripts; _i < _extractedScripts.length; _i++) {
      var script = _extractedScripts[_i];
      if (!scriptList.includes(script)) scriptsToLoad.push(script);
    }

    // @ts-expect-error
    importArticles({
      type: "script",
      articles: scriptsToLoad
    });
  }
  window.dev.pageScripts = _objectSpread(_objectSpread({}, window.dev.pageScripts), {}, {
    init: init,
    loadRest: loadRest
  });

  init();
  // @ts-expect-error
})(void 0, mediaWiki);