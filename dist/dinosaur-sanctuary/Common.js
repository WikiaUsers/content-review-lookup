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

(function ($, mw) {
  'use strict';

  // Function to handle the mobile/desktop class toggle
  function adjustForMobile() {
    if (document.body.classList.contains('skin-fandommobile')) {
      // On mobile skin, remove desktop-only elements
      $('.desktop_only').remove();
    } else {
      // Otherwise, remove mobile-only elements
      $('.mobile_only').remove();
    }
  }

  // Ensure the mobile/desktop adjustment is made when page is ready
  function setupOnce() {
    adjustForMobile();
  }

  $(function () {
    // 1) Initial run when page content is available
    setupOnce();

    // 2) Use mw.hook to handle changes in the page content dynamically
    if (mw && mw.hook && mw.hook('wikipage.content')) {
      mw.hook('wikipage.content').add(setupOnce);
    }

    // 3) MutationObserver to track DOM changes in case the skin changes dynamically
    try {
      var mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, function (node) {
            if (node.nodeType === 1) {
              adjustForMobile();
            }
          });
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch (e) { 
      console.error('Error setting up MutationObserver:', e);
    }
  });
})(jQuery, mw);

(function () {
  const STYLE_ID = "massedit-user-overrides";
  const MAX_HEIGHT = 338;
  const MIN_HEIGHT = 45;

  function injectCSS() {
    const old = document.getElementById(STYLE_ID);
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #massedit-content-log,
      .massedit-content-select,
      .massedit-content-textarea,
      .massedit-content-input {
        background-color: var(--theme-page-background-color) !important;
        color: var(--theme-page-text-color) !important;
      }

      #massedit-content-log,
      #massedit-content-pages {
        height: auto !important;
        min-height: ${MIN_HEIGHT}px !important;
        max-height: ${MAX_HEIGHT}px !important;
        overflow: auto !important;
      }

      #massedit-content-log {
        color: var(--neutral-800) !important;
      }

      .oo-ui-window-foot {
        min-height: 40px !important;
      }

      .oo-ui-processDialog-actions-other {
        height: 40px !important;
      }
    `;
    document.head.appendChild(style);
  }

  function autoResizeTextarea(textarea) {
    function resize() {
      textarea.style.height = "auto";
      const h = Math.min(textarea.scrollHeight, MAX_HEIGHT);
      textarea.style.height = h + "px";
    }

    textarea.addEventListener("input", resize);
    resize();
  }

  function setupOnce() {
    injectCSS();

    const pages = document.getElementById("massedit-content-pages");
    if (pages && !pages.dataset.autosize) {
      pages.dataset.autosize = "1";
      autoResizeTextarea(pages);
    }
  }

  const observer = new MutationObserver((_, obs) => {
    if (document.getElementById("massedit-content-log")) {
      obs.disconnect();
      requestAnimationFrame(setupOnce);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

(function() {
    const navboxes = document.querySelectorAll('.navbox.mw-collapsible');

    navboxes.forEach(navbox => {
        // Listen for clicks on the toggle button
        const toggle = navbox.querySelector('.mw-collapsible-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            setTimeout(() => {
                navbox.style.display = 'none'; navbox.offsetHeight; navbox.style.display = '';
            }, 0);
        });
    });
})();

(function () {

    function runWhenReady() {
        if (!document.body.classList.contains('skin-fandommobile')) return;

        var titleWrapper = document.querySelector('.wiki-page-header__title-wrapper.has-edit-link');
        var tabs = document.querySelector('.mobile_only.tab-group');

        if (!titleWrapper || !tabs) return;

        // Prevent duplicate execution
        if (tabs.dataset.teleported === "true") return;

        var clone = tabs.cloneNode(true);
        tabs.remove();

        // Insert clone after the title wrapper
        titleWrapper.parentNode.insertBefore(clone, titleWrapper.nextSibling);

        clone.dataset.teleported = "true";

        observer.disconnect();
    }

    var observer = new MutationObserver(runWhenReady);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Try immediately in case elements already exist
    runWhenReady();

})();

document.addEventListener("click", function (e) {
  const link = e.target.closest("a[href^='#']");
  if (!link) return;

  const hash = link.getAttribute("href").slice(1);
  if (!hash) return;

  const target = document.getElementById(hash);
  if (!target) return;

  const tabContent = target.closest(".wds-tab__content.miniwiki-tab__content");
  if (!tabContent) return;

  const tabber = tabContent.closest(".wds-tabber");
  if (!tabber) return;

  const miniwiki = tabber.closest(".miniwiki");
  if (!miniwiki) return;

  // If already active, just scroll
  if (tabContent.classList.contains("wds-is-current")) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  // Deactivate contents in this miniwiki
  miniwiki
    .querySelectorAll(".wds-tab__content.miniwiki-tab__content")
    .forEach(c => c.classList.remove("wds-is-current"));

  // Activate the correct content
  tabContent.classList.add("wds-is-current");

  // Sync tab buttons
  const activeHash = tabContent.dataset.hash;
  let activeTab = null;

  miniwiki
    .querySelectorAll(".wds-tabs__tab.miniwiki-tabs__tab")
    .forEach(tab => {
      const isCurrent = activeHash && tab.dataset.hash === activeHash;
      tab.classList.toggle("wds-is-current", isCurrent);
      if (isCurrent) activeTab = tab;
    });

  // Ensure active tab is visible
  if (activeTab) {
    activeTab.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }

  // Ensure tab bar itself is visible
  const tabBar = miniwiki.querySelector(".miniwiki_tabs");
  if (tabBar) {
    tabBar.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Scroll to the anchor target
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});

function initVisibleInfoboxTabs() {
  document.querySelectorAll(".portable-infobox .wds-tabs").forEach(tab => {

    if (tab.dataset.wdsReady) return; // already initialized
    if (!tab.offsetParent) return;    // still hidden

    tab.dataset.wdsReady = "true";

    // trigger WDS measurement
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });

  });
}

function initVisibleInfoboxTabs() {
  document.querySelectorAll(".portable-infobox .wds-tabs").forEach(tab => {

    if (tab.dataset.wdsReady) return; // already initialized
    if (!tab.offsetParent) return;    // still hidden

    tab.dataset.wdsReady = "true";

    // trigger WDS measurement
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });

  });
}

// run once
window.addEventListener("load", initVisibleInfoboxTabs);

// run whenever user interacts (opening tabbers etc.)
document.addEventListener("click", () => {
  setTimeout(initVisibleInfoboxTabs, 120);
});