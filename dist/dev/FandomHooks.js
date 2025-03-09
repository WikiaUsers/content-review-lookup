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
  var cfg = mw.config.get(["wgNamespaceNumber"]);
  var con = {
    log: window.dev.fandomHooks._util.log,
    dbg: window.dev.fandomHooks._util.debug,
    warn: window.dev.fandomHooks._util.warn,
  };

  /** PART 1: LAZY-LOAD ELEMENT DETECTION */

  /**
   * Element selectors that we want to look for
   * @enum {string}
   */
  var elemSelectors = {
    COMMENTS: ".article-comments-app",
    MASTHEAD: "#userProfileApp",
  };

  /**
   * Parent elements of the elements that we want to watch.
   * @enum {HTMLElement}
   */
  var parentElems = {
    mastheadParent: document.getElementsByClassName("page__main")[0],
    commentsParent: document.getElementById("articleComments"),
  };

  /**
   * Hook objects
   * @enum {mw.hook}
   */
  var Hooks = {
    COMMENTS: mw.hook("fandom.comments"),
    MASTHEAD: mw.hook("fandom.masthead"),
  };

  /**
   * The observer itself. Yes, the entire callback is jammed in here
   * @type {MutationObserver}
   */
  var observer = new MutationObserver(function (mutations, observerInstance) {
    mutations.forEach(function (mutation) {
      con.dbg(JSON.stringify(mutation));
      mutation.addedNodes.forEach(function (addedNode) {
        var mutatedNode = addedNode;
        var selectorKeys = Object.keys(elemSelectors);
        var selectorValues = Object.values(elemSelectors);
        selectorValues.forEach(function (selector, k) {
          if (mutatedNode.matches(selector)) {
            con.dbg(
              "Found element selector: '".concat(
                selectorKeys[k],
                "'. Firing hook and saying goodbye"
              )
            );
            Hooks[selectorKeys[k]].fire(document.querySelector(selector));
            observerInstance.disconnect();
            return;
          }
        });
      });
    });
  });
  var observationFailed = false;
  Object.values(parentElems).forEach(function (parentElem, i) {
    if (parentElem) {
      try {
        /** skip checking other elements if we're in a userpage */
        if (
          cfg.wgNamespaceNumber === 2 &&
          Object.keys(parentElems)[i] !== "mastheadParent"
        )
          return;
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

  /** PART 2: FANDOM MOBILE SKIN DETECTION */
  if (document.body.classList.contains("skin-fandommobile"))
    mw.hook("fandom.mobile").fire(document.body);

  // @ts-expect-error
})(this, mediaWiki);