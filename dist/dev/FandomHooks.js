function _createForOfIteratorHelper(r, e) {
  var t =
    ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
  if (!t) {
    if (
      Array.isArray(r) ||
      (t = _unsupportedIterableToArray(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
        },
        e: function e(r) {
          throw r;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return (a = r.done), r;
    },
    e: function e(r) {
      (u = !0), (o = r);
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    },
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return (
      "Object" === t && r.constructor && (t = r.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(r)
        : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? _arrayLikeToArray(r, a)
          : void 0
    );
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
/// <reference types="./index.d.ts" />
(function (window, mw) {
  "use strict";

  window.dev = window.dev || {};
  window.dev.fandomHooks = window.dev.fandomHooks || {
    hasRan: false,
    disabled: false,
    _util: {
      log: function log() {
        var _FandomHooks;
        console.log(
          (_FandomHooks = "[FandomHooks] ").concat.apply(
            _FandomHooks,
            arguments
          )
        );
      },
      debug: function debug() {
        var _FandomHooksDebug;
        console.debug(
          (_FandomHooksDebug = "[FandomHooks] (debug) ").concat.apply(
            _FandomHooksDebug,
            arguments
          )
        );
      },
      warn: function warn() {
        var _FandomHooks2;
        console.warn(
          (_FandomHooks2 = "[FandomHooks] ").concat.apply(
            _FandomHooks2,
            arguments
          )
        );
      },
    },
  };

  /** Double-run check */
  if (window.dev.fandomHooks.hasRan || window.dev.fandomHooks.disabled) return;
  window.dev.fandomHooks.hasRan = true;

  // var cfg = mw.config.get(['wgNamespaceNumber'])

  var con = {
    log: window.dev.fandomHooks._util.log,
    dbg: window.dev.fandomHooks._util.debug,
    warn: window.dev.fandomHooks._util.warn,
  };

  /**
   * Element selectors that we want to look for
   */
  var elemSelectors = {
    COMMENTS: ".article-comments-app",
    MASTHEAD: "#userProfileApp",
  };

  /**
   * Parent elements of the elements that we want to watch.
   */
  var parentElems = {
    mastheadParent: document.getElementsByClassName("page__main")[0],
    commentsParent: document.getElementById("articleComments"),
  };

  /**
   * Hook objects
   */
  var Hooks = {
    COMMENTS: mw.hook("fandom.comments"),
    MASTHEAD: mw.hook("fandom.masthead"),
  };

  /**
   * The observer itself. Yes, the entire callback is jammed in here
   */
  var observer = new MutationObserver(function (mutations, observerInstance) {
    // first for...of
    var _iterator = _createForOfIteratorHelper(mutations),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var mutation = _step.value;
        con.dbg(JSON.stringify(mutation));
        for (
          var _i = 0, _Array$from = Array.from(mutation.addedNodes);
          _i < _Array$from.length;
          _i++
        ) {
          var addedNode = _Array$from[_i];
          var mutatedNode = addedNode;

          /**
           * TODO: extract checks for easier modification in the future, perhaps a match list
           * TODO: DRY this
           */
          if (mutatedNode.matches(elemSelectors.COMMENTS)) {
            con.dbg("Found comments section. Firing hook. Goodbye");
            Hooks.COMMENTS.fire(document.querySelector(elemSelectors.COMMENTS));
            observerInstance.disconnect();
            return;
          }
          if (mutatedNode.matches(elemSelectors.MASTHEAD)) {
            con.dbg("Found masthead. Firing hook. Goodbye");
            Hooks.MASTHEAD.fire(document.querySelector(elemSelectors.MASTHEAD));
            observerInstance.disconnect();
            return;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  var observationFailed = false;
  Object.values(parentElems).forEach(function (parentElem, i) {
    if (parentElem) {
      try {
        observer.observe(parentElem, {
          childList: true,
        });
        con.log(
          "Watching '".concat(Object.keys(parentElems)[i], "' for children")
        );
      } catch (error) {
        observationFailed = true;
        con.warn(
          "Failed to observe '"
            .concat(Object.keys(parentElems)[i], "': ")
            .concat(error)
        );
      }
    } else {
      con.warn("Element: '".concat(Object.keys(parentElems)[i], "' not found"));
    }
    if (observationFailed)
      con.warn("Some observers failed to watch elements. Hooks may not fire");
  });
  // @ts-expect-error
})(this, mediaWiki);