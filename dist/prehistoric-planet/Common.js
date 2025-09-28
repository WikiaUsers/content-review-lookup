window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 28;

(function ($, mw) {
  'use strict';

  // Set attributes on extiw anchors inside `root`
  function ensureExtiwTargets(root) {
    root = root || document;
    var $els;
    // If root is document or documentFragment treat as whole document
    if (root.nodeType === 9 || root.nodeType === 11) {
      $els = $('a.extiw');
    } else {
      $els = $(root).is('a.extiw') ? $(root) : $(root).find('a.extiw');
    }
    if ($els.length) {
      $els.attr('target', '_blank').attr('rel', 'noopener noreferrer');
    }
  }

  // Quick check for hrefs we should not open
  function isNavigableHref(href) {
    if (!href) return false;
    if (href.charAt(0) === '#') return false;
    if (/^\s*javascript:/i.test(href)) return false;
    if (/^\s*mailto:/i.test(href)) return false;
    return true;
  }

  $(function () {
    // 1) initial pass
    ensureExtiwTargets(document);

    // 2) run when MediaWiki replaces content (common hook for content replace)
    if (mw && mw.hook && mw.hook('wikipage.content')) {mw.hook('wikipage.content').add(ensureExtiwTargets);}

    // 3) MutationObserver fallback for any DOM nodes added later
    try {
      var mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, function (node) {
            if (node.nodeType === 1) ensureExtiwTargets(node);
          });
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch (e) { }

    // Open "extiw" links in new tab on left click
    //    Using capture helps run before other bubble-phase handlers that might intercept clicks.
    document.addEventListener('click', function (e) {
      // left button only
      if (e.button !== 0) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // let user modifiers work
      var a = e.target && e.target.closest ? e.target.closest('a.extiw') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (!isNavigableHref(href)) return;
      try {
        window.open(href, '_blank');
      } catch (err) {
        //popup blocked, fail silently
      }
      e.preventDefault();
    }, true); //capture

    // Double right-click link to open in new tab
	(function () {
      var lastRightClickTime = 0;
      var doubleClickThreshold = 400; // ms, adjust to taste

      document.addEventListener('contextmenu', function (e) {
        var now = Date.now();
        var a = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!a) {
          lastRightClickTime = now;
          return;
        }
        var href = a.getAttribute('href') || '';
        if (!isNavigableHref(href)) {
          lastRightClickTime = now;
          return;
        }

        if (now - lastRightClickTime < doubleClickThreshold) {
          try {
            window.open(href, '_blank');
          } catch (err) { /* ignore popup blocker */ }
          lastRightClickTime = 0; // reset
        } else {
          lastRightClickTime = now;
        }
        // don’t preventDefault → keep the normal context menu visible
      }, false);
    })();
  });
})(jQuery, mw);