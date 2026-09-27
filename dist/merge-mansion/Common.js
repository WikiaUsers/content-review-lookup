/* Any JavaScript here will be loaded for all users on every page load. */
console.log("COMMON.JS Executed");
importScript('MediaWiki:DynamicRemainingItemsTable.js');
importScript('MediaWiki:TaskTableFeatures.js');
importScript('MediaWiki:UsesTableFeatures.js');
importScript('MediaWiki:SeasonPassFeatures.js');
importScript('MediaWiki:Events.js');

(function () {
  console.log("Searching for Checkbox tracker (robust v2)");

  var SWAP_FLAG = "riTrackerSwapped";
  var signalFired = false;

  function swapColumns(root) {
    var context = (root && root.querySelectorAll) ? root : document;
    var tables = context.querySelectorAll('.last-column table.table-progress-tracking');
    var swappedTables = 0;

    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];

      // Skip if already processed
      if (table.dataset && table.dataset[SWAP_FLAG] === "1") {
        continue;
      }

      // Move header cell (first TH in the first row) to the end
      var headerRow = table.querySelector('tr');
      if (headerRow) {
        var firstHeader = headerRow.querySelector('th:first-child');
        if (firstHeader) {
          headerRow.appendChild(firstHeader);
        }
      }

      // Move first TD in each row to the end
      var rows = table.querySelectorAll('tr');
      for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        var firstCell = row.querySelector('td:first-child');
        if (firstCell) {
          row.appendChild(firstCell);
        }
      }

      if (table.dataset) {
        table.dataset[SWAP_FLAG] = "1";
      }
      swappedTables++;
    }

    if (swappedTables > 0 && !signalFired) {
      signalFired = true;
      console.log("Progress tracking column swapped on " + swappedTables + " table(s). Dispatching event…");

      var detail = {
        tables: swappedTables,
        timestamp: Date.now()
      };

      var ev;
      try {
        ev = new CustomEvent("ProgressTrackingColumnSwapped", { detail: detail });
      } catch (e) {
        // Old browsers fallback
        ev = document.createEvent("CustomEvent");
        ev.initCustomEvent("ProgressTrackingColumnSwapped", false, false, detail);
      }
      window.dispatchEvent(ev);
    }

    return swappedTables;
  }

  function initialAttempt() {
    var swapped = swapColumns(document);
    if (swapped > 0) {
      // Done; no need to observe further
      return;
    }
    // If nothing was swapped yet, start observing DOM mutations
    setupMutationObserver();
  }

  function setupMutationObserver() {
    if (!document.body) {
      // Body not yet available – retry once DOM is ready
      if (document.readyState === "loading") {
        var onReady = function () {
          document.removeEventListener("DOMContentLoaded", onReady);
          initialAttempt();
        };
        document.addEventListener("DOMContentLoaded", onReady);
      } else {
        setTimeout(initialAttempt, 0);
      }
      return;
    }

    var observer = new MutationObserver(function (mutations) {
      if (signalFired) {
        observer.disconnect();
        return;
      }

      var shouldCheck = false;

      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        for (var j = 0; j < m.addedNodes.length; j++) {
          var node = m.addedNodes[j];
          if (!(node instanceof HTMLElement)) {
            continue;
          }

          var matchesLastColumn = node.matches && node.matches('.last-column');
          var matchesTable = node.matches && node.matches('table.table-progress-tracking');
          var hasInnerTable = node.querySelector && node.querySelector('.last-column table.table-progress-tracking');

          if (matchesLastColumn || matchesTable || hasInnerTable) {
            shouldCheck = true;
            break;
          }
        }
        if (shouldCheck) {
          break;
        }
      }

      if (shouldCheck) {
        var swapped = swapColumns(document);
        if (signalFired || swapped > 0) {
          observer.disconnect();
        }
      }
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });
  }

  // Hook into MediaWiki's wikipage.content if available (Fandom / MediaWiki SPA loads)
  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(function ($content) {
      if (signalFired) {
        return;
      }
      var root = ($content && $content[0]) ? $content[0] : document;
      var swapped = swapColumns(root);
      if (!signalFired && swapped === 0) {
        setupMutationObserver();
      }
    });
  } else {
    // Fallback: wait for DOM ready, then attempt + observer
    if (document.readyState === "loading") {
      var onReady2 = function () {
        document.removeEventListener("DOMContentLoaded", onReady2);
        initialAttempt();
      };
      document.addEventListener("DOMContentLoaded", onReady2);
    } else {
      initialAttempt();
    }
  }
})();


/* Uses table sticky-header state: toggle .mm-uses-stuck on the table while its
   sticky column header is actually stuck under the Fandom bar, so header-icon
   tooltips flip below the icon ONLY when scrolled (Common.css handles the flip).
   Sentinel + IntersectionObserver at the sticky offset; no per-scroll cost. */
(function () {
  var OFFSET = 45; // must match Common.css: .itemUsesTable th top calc(46px - 1px)
  function initUsesStuck(root) {
    var scope = root || document;
    var tables = scope.querySelectorAll ? scope.querySelectorAll(".itemUsesTable") : [];
    Array.prototype.forEach.call(tables, function (table) {
      if (table.dataset.mmStuckInit) return;
      table.dataset.mmStuckInit = "1";
      var sentinel = document.createElement("div");
      sentinel.className = "mm-uses-sentinel";
      sentinel.style.cssText = "position:relative;height:0;margin:0;padding:0;border:0;";
      table.parentNode.insertBefore(sentinel, table);
      var io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        var stuck = e.intersectionRatio === 0 && e.boundingClientRect.top < OFFSET;
        table.classList.toggle("mm-uses-stuck", stuck);
      }, { threshold: [0], rootMargin: "-" + OFFSET + "px 0px 0px 0px" });
      io.observe(sentinel);
      wideTables.push(table);
    });
    scheduleWide();
  }

  /* Wide tables: FandomDesktop wraps a too-wide table into an overflow-x:auto div,
     which traps position:sticky (the header sits OFFSET px below the wrapper's top
     for good). Such tables get .mm-uses-jssticky (Common.css turns native sticky off)
     and the header cells follow the page scroll via translateY instead. Re-checked
     on every frame of scroll/resize, since the wrapper comes and goes with width. */
  var wideTables = [];
  var wideQueued = false;
  function clippingAncestor(table) {
    for (var el = table.parentElement; el && el !== document.body; el = el.parentElement) {
      if (el.classList.contains("page-content")) return null;
      if (getComputedStyle(el).overflowX !== "visible") return el;
    }
    return null;
  }
  function updateWide() {
    wideQueued = false;
    wideTables.forEach(function (table) {
      var cells = table.querySelectorAll(":scope > * > tr > th");
      if (!cells.length) return;
      var wrapped = !!clippingAncestor(table);
      table.classList.toggle("mm-uses-jssticky", wrapped);
      var dy = 0;
      if (wrapped) {
        var rect = table.getBoundingClientRect();
        var headH = cells[0].parentNode.offsetHeight;
        dy = Math.max(0, Math.min(OFFSET - rect.top, rect.height - headH));
      }
      var t = dy ? "translateY(" + dy + "px)" : "";
      Array.prototype.forEach.call(cells, function (th) { th.style.transform = t; });
    });
  }
  function scheduleWide() {
    if (wideQueued || !wideTables.length) return;
    wideQueued = true;
    requestAnimationFrame(updateWide);
  }
  window.addEventListener("scroll", scheduleWide, { passive: true });
  window.addEventListener("resize", scheduleWide);
  window.addEventListener("load", scheduleWide); // the wrapper may appear after init

  if (window.mw && mw.hook) {
    mw.hook("wikipage.content").add(function ($content) {
      initUsesStuck(($content && $content[0]) ? $content[0] : document);
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { initUsesStuck(document); });
  } else {
    initUsesStuck(document);
  }
})();

console.log("COMMON.JS END");