/* For CSS modules and Template: CSS */
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		mw.util.addCSS($(this).attr("data-css"));
	});
});

window.DiscussionTemplates = {
    templates: {
        'item-1': {
            name: 'Template:Staff',
            title: 'Staff'
        }
    },
    allowedGroups: ['bureaucrat','sysop', 'content-moderator', 'threadmoderator', 'rollback']
};
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		wikimanager: {u:'Wiki Manager', order: -1/0},
		forummanager: {u:'Forums Manager', order: -1/0},
		creator: {u:'The CSS Guy', order: -1e76},
		montheditor: { u:'Editor of the Month', order: -1e75},
		cool: { u:'Certified Cool Kid', order: -1e70},
		former: {u:'Former Staff', order: -1e50},
		formerowner: {u:'Former Owner', order: -1e69},
		god: {u:'God of the Wiki', order: -1e100},
		nothing: {u: '⠀⠀⠀', order: -1e100},
		bureaureal: {u: 'BUREAUREAL', order: -1e110},
	}
};
UserTagsJS.modules.custom = {
	'YataDev': ['cool', 'formerowner'],
	'Sanjay2133': ['wikimanager', 'creator', 'cool'],
	'Oh Noez! Oh Noez!': ['forumsmanager'],
	'SodafizzIGuess': ['former'],
	'IdklolXDXDXD': ['former'],
	'TheOquas': ['former'],
	'YourNuglyguy': ['formerowner', 'god'],
	'Ferdinandloveslegos': ['formerowner'],
	'The Difficulty Enthusiast': ['formerowner'],
	'OrbentuneAlt': ['nothing'],
	'Jtohisgoodimo': ['bureaureal'],
	'Touchgrass210779': ['montheditor'],
	'MapleIsNotAMapleLeaf': ['montheditor'],
};
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 180;
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'TemplateUserPage}}',
        3: false,
        1202: false
    },
    summary: 'Creating user page',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

// Audio Thing
(function () {
  function findAudio() {
    var audios = document.querySelectorAll("audio");
    if (audios.length) return audios[0];
    return null;
  }

  function setButtonText(button, text) {
    var span = button.querySelector(".audio-start-text");

    if (span) {
      span.textContent = text;
    } else {
      button.textContent = text;
    }
  }

  function getText(button, name, fallback) {
    return button.getAttribute(name) || fallback;
  }

  function tryPlay(button) {
    var tries = 0;

    function attempt() {
      var audio = findAudio();

      if (!audio) {
        tries++;

        if (tries < 40) {
          setTimeout(attempt, 150);
        } else {
          setButtonText(button, getText(button, "data-missing-text", "Audio Not Found"));
        }

        return;
      }

      audio.loop = true;

      audio.play().then(function () {
        setButtonText(button, getText(button, "data-playing-text", "Music Started"));
        button.classList.add("started");
      }).catch(function () {
        setButtonText(button, getText(button, "data-failed-text", "Click Again"));
      });
    }

    attempt();
  }

  document.addEventListener("click", function (e) {
    var button = e.target.closest(".audio-start");
    if (!button) return;

    tryPlay(button);
  }, true);
})();

// Command terminal
(function () {
  "use strict";

  function norm(str) {
    return String(str || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function appendLine(out, text) {
    const div = document.createElement("div");
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function revealForCommand(cmd) {
    const key = norm(cmd);
    let revealed = 0;

    document.querySelectorAll("[data-cmd-secret][data-cmd]").forEach((el) => {
      if (norm(el.getAttribute("data-cmd")) === key) {
        el.style.display = "";
        revealed++;
      }
    });

    return revealed;
  }

  function getCfg(term) {
    // Per-terminal config read from wikitext attributes
    const helpCmd = norm(term.getAttribute("data-help-cmd") || "help");
    const unlockCmd = norm(term.getAttribute("data-help-unlock-cmd") || "");
    const lockedMsg = term.getAttribute("data-help-locked-msg") || "UNKNOWN COMMAND";

    // Up to 6 help lines; add more if you want
    const helpLines = [];
    for (let i = 1; i <= 6; i++) {
      const v = term.getAttribute(`data-help-unlocked-msg${i}`);
      if (v) helpLines.push(v);
    }
    if (!helpLines.length) helpLines.push("No help text configured.");

    return { helpCmd, unlockCmd, lockedMsg, helpLines };
  }

  function runTerminal(term, rawCmd) {
    const out = term.querySelector("[data-cmd-output]");
    if (!out) return;

    const cmd = norm(rawCmd);
    if (!cmd) return;

    appendLine(out, "> " + rawCmd);

    // terminal-scoped state
    term._helpUnlocked = !!term._helpUnlocked;

    const cfg = getCfg(term);

    // Unlock help (only if an unlock command is configured)
    if (cfg.unlockCmd && cmd === cfg.unlockCmd) {
      term._helpUnlocked = true;
      appendLine(out, "AUTH ACCEPTED");
      return;
    }

    // Optional help command (configurable from wikitext)
    if (cmd === cfg.helpCmd) {
      if (!term._helpUnlocked && cfg.unlockCmd) {
        appendLine(out, cfg.lockedMsg);
        return;
      }
      cfg.helpLines.forEach((line) => appendLine(out, line));
      return;
    }

    // Normal command reveal
    const count = revealForCommand(rawCmd);
    appendLine(out, count > 0 ? "ACCESS GRANTED" : "ACCESS DENIED");
  }

  function buildInputUI(term) {
    const row = term.querySelector("[data-cmd-row]");
    const out = term.querySelector("[data-cmd-output]");
    if (!row || !out) return;

    const prompt = document.createElement("span");
    prompt.textContent = ">";
    prompt.className = "cmd-prompt";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "cmd-input";
    input.placeholder = "enter command…";
    input.autocomplete = "off";
    input.spellcheck = false;

    const btn = document.createElement("button");
    btn.textContent = "RUN";
    btn.className = "cmd-btn";
    btn.type = "button";

    const execute = () => {
      const v = input.value;
      input.value = "";
      runTerminal(term, v);
      input.focus();
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") execute();
    });
    btn.addEventListener("click", execute);

    row.appendChild(prompt);
    row.appendChild(input);
    row.appendChild(btn);
  }

  function init() {
    document.querySelectorAll("[data-cmd-terminal]").forEach(buildInputUI);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// Inventory system for pages
(function () {
  "use strict";

  // Expose early for debugging
  window.FandomInventory = window.FandomInventory || {};

  try {
    var mwExists = (typeof mw !== "undefined") && mw && mw.config;
    var dbname = mwExists ? mw.config.get("wgDBname") : "fandom";
    var STORAGE_KEY = dbname + ":item_inventory_v2";

    function toNum(x, fallback) {
      var n = Number(x);
      return isNaN(n) ? fallback : n;
    }

    function readInv() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        var data = raw ? JSON.parse(raw) : {};
        return (data && typeof data === "object") ? data : {};
      } catch (e) {
        return {};
      }
    }

    function writeInv(inv) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inv));
    }

    function hasItem(inv, id, minQty) {
      minQty = toNum(minQty, 1);
      return !!inv[id] && toNum(inv[id].qty, 1) >= minQty;
    }

    function addItem(id, qty) {
      qty = toNum(qty, 1);
      var inv = readInv();
      if (!inv[id]) inv[id] = { t: Date.now(), qty: 0 };
      inv[id].qty += qty;
      writeInv(inv);
      document.dispatchEvent(new CustomEvent("inv:changed", { detail: { inv: inv } }));
      return inv;
    }

    function removeItem(id, qty) {
      qty = toNum(qty, 1);
      var inv = readInv();
      if (!inv[id]) return inv;
      inv[id].qty -= qty;
      if (inv[id].qty <= 0) delete inv[id];
      writeInv(inv);
      document.dispatchEvent(new CustomEvent("inv:changed", { detail: { inv: inv } }));
      return inv;
    }

    function clearInv() {
      localStorage.removeItem(STORAGE_KEY);
      document.dispatchEvent(new CustomEvent("inv:changed", { detail: { inv: {} } }));
    }

    function parseCSV(value) {
      value = value || "";
      return value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    }

    function setVisible(el, visible) {
      el.hidden = !visible;
    }

    // Optional pretty-label registry (define on same page as the panel)
    function buildRegistry(root) {
      var registry = {};
      var defs = root.querySelectorAll(".inv-def[data-item]");
      for (var i = 0; i < defs.length; i++) {
        var def = defs[i];
        var id = def.getAttribute("data-item");
        registry[id] = {
          label: def.getAttribute("data-label") || id,
          showQty: def.getAttribute("data-show-qty") !== "false"
        };
      }
      return registry;
    }

    function formatLine(id, data, registry) {
      var info = registry[id] || {};
      var label = info.label || id;
      var qty = toNum(data.qty, 1);
      var showQty = (info.showQty !== false) && (qty !== 1);
      return label + (showQty ? (" ×" + qty) : "");
    }

    function updateCollectStates(root) {
      var inv = readInv();
      var els = root.querySelectorAll(".inv-collect[data-item]");
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var id = el.getAttribute("data-item");
        var once = el.getAttribute("data-once") === "true";
        var minQty = toNum(el.getAttribute("data-min-qty"), 1);
        var collected = hasItem(inv, id, minQty);

        var collectText = el.getAttribute("data-collect-text") || el.textContent || "Collect";
        var collectedText = el.getAttribute("data-collected-text") || "Collected";

        el.classList.toggle("is-collected", collected);
        el.setAttribute("aria-disabled", (once && collected) ? "true" : "false");
        el.textContent = (once && collected) ? collectedText : collectText;
      }
    }

    function updateLocks(root) {
      var inv = readInv();

      var reqBlocks = root.querySelectorAll(".inv-requires");
      for (var i = 0; i < reqBlocks.length; i++) {
        var b = reqBlocks[i];
        var all = parseCSV(b.getAttribute("data-requires"));
        var any = parseCSV(b.getAttribute("data-requires-any"));
        var minQty = toNum(b.getAttribute("data-min-qty"), 1);

        var ok = true;
        if (all.length) ok = all.every(function (id) { return hasItem(inv, id, minQty); });
        if (ok && any.length) ok = any.some(function (id) { return hasItem(inv, id, minQty); });

        setVisible(b, ok);
      }

      var reqNotBlocks = root.querySelectorAll(".inv-requires-not");
      for (var j = 0; j < reqNotBlocks.length; j++) {
        var n = reqNotBlocks[j];
        var none = parseCSV(n.getAttribute("data-requires-not"));
        var minQty2 = toNum(n.getAttribute("data-min-qty"), 1);

        var ok2 = none.every(function (id) { return !hasItem(inv, id, minQty2); });
        setVisible(n, ok2);
      }
    }

    function renderPanels(root) {
      var inv = readInv();
      var registry = buildRegistry(root);

      var panels = root.querySelectorAll(".inv-panel");
      for (var i = 0; i < panels.length; i++) {
        var p = panels[i];
        var emptyText = p.getAttribute("data-empty-text") || "Nothing collected.";
        var prefix = p.getAttribute("data-prefix") || "Inventory:";
        var only = parseCSV(p.getAttribute("data-only"));
        var sort = p.getAttribute("data-sort") || "alpha";
        var showClear = p.getAttribute("data-show-clear") === "true";
        var clearText = p.getAttribute("data-clear-text") || "Reset inventory";

        var ids = Object.keys(inv).filter(function (id) {
          return only.length ? (only.indexOf(id) !== -1) : true;
        });

        if (sort === "alpha") {
          ids.sort(function (a, b) {
            var la = (registry[a] && registry[a].label) ? registry[a].label : a;
            var lb = (registry[b] && registry[b].label) ? registry[b].label : b;
            return la.localeCompare(lb);
          });
        } else if (sort === "newest") {
          ids.sort(function (a, b) {
            return toNum(inv[b].t, 0) - toNum(inv[a].t, 0);
          });
        }

        // Render
        p.innerHTML = "";

        var title = document.createElement("div");
        title.className = "inv-title";
        title.textContent = prefix;
        p.appendChild(title);

        if (!ids.length) {
          var empty = document.createElement("div");
          empty.className = "inv-empty";
          empty.textContent = emptyText;
          p.appendChild(empty);
        } else {
          var ul = document.createElement("ul");
          ul.className = "inv-list";
          for (var k = 0; k < ids.length; k++) {
            var id = ids[k];
            var li = document.createElement("li");
            li.className = "inv-li";
            li.textContent = formatLine(id, inv[id], registry);
            ul.appendChild(li);
          }
          p.appendChild(ul);
        }

        if (showClear) {
          // IMPORTANT: class inv-clear-all so delegated click works
          var btn = document.createElement("span");
          btn.className = "inv-btn inv-clear-all";
          btn.setAttribute("role", "button");
          btn.setAttribute("tabindex", "0");
          btn.textContent = clearText;
          p.appendChild(btn);
        }
      }
    }

    function refresh(root) {
      updateCollectStates(root);
      updateLocks(root);
      renderPanels(root);
    }

    // Delegated click handling (fixes your reset issue)
    function installDelegatedHandlers(root) {
      if (root.__invDelegated) return;
      root.__invDelegated = true;

      function closestMatch(node, selector) {
        while (node && node !== root) {
          if (node.matches && node.matches(selector)) return node;
          node = node.parentNode;
        }
        return null;
      }

      function activate(el) {
        // for keyboard activation on spans
        el.click();
      }

      root.addEventListener("click", function (e) {
        var collectEl = closestMatch(e.target, ".inv-collect[data-item]");
        if (collectEl) {
          var id = collectEl.getAttribute("data-item");
          var qty = toNum(collectEl.getAttribute("data-qty"), 1);
          var once = collectEl.getAttribute("data-once") === "true";
          var minQty = toNum(collectEl.getAttribute("data-min-qty"), 1);

          var inv = readInv();
          if (once && hasItem(inv, id, minQty)) return; // prevent double-collect

          addItem(id, qty);

          var toast = collectEl.getAttribute("data-toast");
          if (toast) {
            if (mwExists && mw.notify) mw.notify(toast);
            else alert(toast);
          }
          return;
        }

        var removeEl = closestMatch(e.target, ".inv-remove[data-item]");
        if (removeEl) {
          removeItem(removeEl.getAttribute("data-item"), removeEl.getAttribute("data-qty"));
          return;
        }

        var clearEl = closestMatch(e.target, ".inv-clear-all");
        if (clearEl) {
          clearInv();
          return;
        }
      });

      root.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        var btn = closestMatch(e.target, ".inv-btn, .inv-collect, .inv-remove, .inv-clear-all");
        if (!btn) return;
        e.preventDefault();
        activate(btn);
      });
    }

    function init() {
      var root = document.getElementById("mw-content-text") || document.body;
      installDelegatedHandlers(root);
      refresh(root);

      document.addEventListener("inv:changed", function () {
        var r = document.getElementById("mw-content-text") || document.body;
        refresh(r);
      });

      if (mwExists && mw.hook) {
        mw.hook("wikipage.content").add(function ($content) {
          var node = ($content && $content[0]) ? $content[0] : (document.getElementById("mw-content-text") || document.body);
          installDelegatedHandlers(node);
          refresh(node);
        });
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    // Debug API
    window.FandomInventory.read = readInv;
    window.FandomInventory.add = function (id, opts) { return addItem(id, opts && opts.qty); };
    window.FandomInventory.remove = function (id, opts) { return removeItem(id, opts && opts.qty); };
    window.FandomInventory.clear = clearInv;

  } catch (err) {
    console.error("Item system crashed ❌", err);
  }
})();

// FROM THE GOOGOLOGY WIKI!!
// Load MathJax, originally written by Emk for Japanese Gwiki
// by adapting the code for UCP from the code by Aycabta for the classic wiki 
//
// Latest version of MathJax 3 is loaded when following 3 conditions are satisfied.
//
// * Namespace is not Special
// * Namespace is not MediaWiki
// * Body of the article is displayed, i.e., it is not history
if ((mw.config.get('wgCanonicalNamespace') !== "Special") && (mw.config.get('wgCanonicalNamespace') !== "MediaWiki") && mw.config.get('wgIsArticle')) {
  // Show log for debug
  console.log("Applying MathJax...");

  var script_2 = document.createElement('script');
  script_2.id = "MathJax-script";
  // Load the latest version of MathJax 3
  script_2.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script_2.async = true;
  document.head.appendChild(script_2);

// Finish of code for MathJax by Emk

//Fixing out-of-alignment ol's with high numbers
var ols=document.getElementsByTagName("ol");
for(var i=0;i<ols.length;i++){
    var maxnum=ols[i].start+ols[i].childElementCount-1;
    if(maxnum>999){
        ols[i].style.paddingLeft=(-1+Math.floor(Math.log10(maxnum)*2)/4)+"em";
    }
}

var spacer = document.getElementsByClassName("paginator-spacer")[0];

if (spacer) {
    var pageLocation = window.location.href.split('?')[0];
    spacer.innerHTML = '...&nbsp;<a href="#" id="custom-paginator-jump">#</a>&nbsp;...';
    document.getElementById("custom-paginator-jump").addEventListener("click", function(e) {
        e.preventDefault();
        var pageToScrollTo = prompt('Page number?');
        if (pageToScrollTo && !isNaN(pageToScrollTo)) {
            window.location.href = pageLocation + '?page=' + encodeURIComponent(pageToScrollTo.trim());
        }
    });
} else {
    console.warn("Could not find an element with the class 'paginator-spacer'.");
}

  // Apply MathJax to comment (not working?)
  (function() {
    'use strict';
    // Modified a sample from https://docs.mathjax.org/en/latest/web/typeset.html
    function typeset(nodes) {
        MathJax.startup.promise = MathJax.startup.promise
            .then(function() {return MathJax.typesetPromise(nodes);})
            .catch(function(err) {console.log('Typeset failed: ' + err.message);});
        return MathJax.startup.promise;
    }
    new MutationObserver(function(mutations) {
        if (typeof MathJax === "undefined") return;
        /* global MathJax:false */
        var nodes = [];
        for (var i = 0; i < mutations.length; ++i) {
			var mutation = mutations[i];
            for (var j = 0; j < mutation.addedNodes.length; ++j) {
				var node = mutation.addedNodes[j];
                if (!node.querySelectorAll) continue;
                nodes = nodes.concat(node.querySelectorAll(".entity-content"));
            }
        }
        if (nodes.length > 0) typeset(nodes);
	});

	var commentsContainer = document.querySelector("#articleComments");
    if (commentsContainer) {
        var observer = new MutationObserver(function(mutations) {
            if (typeof MathJax === "undefined") return;
            var nodes = [];
            for (var i = 0; i < mutations.length; ++i) {
                var mutation = mutations[i];
                for (var j = 0; j < mutation.addedNodes.length; ++j) {
                    var node = mutation.addedNodes[j];
                    if (!node.querySelectorAll) continue;
                    nodes = nodes.concat(Array.from(node.querySelectorAll(".entity-content")));
                }
            }
            if (nodes.length > 0) typeset(nodes);
        });

        observer.observe(commentsContainer, {
            childList: true,
            subtree: true
        });
    } else {
        console.log("#articleComments not found on this page; skipping observer.");
    }
})();
}
// Rating System hopefully
mw.loader.using(['mediawiki.api']).then(function () {
	    if (document.body.classList.contains('is-mobile') || window.innerWidth < 768) {
        console.log("[EJT Ratings] Mobile view detected.");
        return;
    }
    console.log("[EJT Ratings].");

    const pageName = mw.config.get('wgPageName');
    const userName = mw.config.get('wgUserName'); 
    const api = new mw.Api();
    
    const namespace = mw.config.get('wgNamespaceNumber');
    if (namespace !== 0 && namespace !== 2) {
        console.log("[EJT Ratings] Hidden on non-article namespace pages.");
        return; 
    }

    const globalLedgerTitle = 'Project:Sitewide_Ratings_Data_Matrix';
    let isProcessing = false;
    let masterLedger = null;
    let userExistingVote = 0;

    if (!document.getElementById('ejt-ratings-responsive-style')) {
        const styleBlock = document.createElement('style');
        styleBlock.id = 'ejt-ratings-responsive-style';
        styleBlock.innerHTML = `
            .ejt-rating-tab { margin-left: auto; display: inline-flex; align-items: center; padding: 0 10px; }
            
            .ejt-rating-wrapper {
                position: relative;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-family: 'Rubik', sans-serif;
                font-size: 13px;
                font-weight: bold;
                border: none;
                background: none;
                padding: 0 14px;
                height: 30px;
                margin-top: 6px;
                border-radius: 4px;
                overflow: hidden;
            }

            .ejt-rating-wrapper::before {
                content: "";
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background-image: radial-gradient(rgba(255, 255, 255, 1) 50%, transparent 50%);
                background-size: 4px 4px;
                opacity: 0.15;
                z-index: -1;
                transition: opacity 0.3s ease-in-out !important; /* Smoothly fade opacity values */
            }
            
            .ejt-rating-wrapper:hover::before {
                opacity: 0.4;
            }
            
            @media screen and (max-width: 1100px) {
                .fandom-community-header__local-navigation .wds-tabs { flex-wrap: wrap !important; height: auto !important; }
                .ejt-rating-tab { margin-left: 0 !important; padding: 4px 10px !important; width: 100%; justify-content: flex-start; }
                .ejt-rating-tab div { margin-top: 4px !important; margin-bottom: 6px !important; }
            }
        `;
        document.head.appendChild(styleBlock);
    }

    
    function injectIntoMenu(tabsList) {
        if (tabsList.querySelector('.ejt-rating-tab')) return;

        const containerListItem = document.createElement('li');
        containerListItem.className = 'wds-tabs__tab ejt-rating-tab';
        containerListItem.style.cssText = `
            margin-left: auto;
            display: inline-flex;
            align-items: center;
            padding: 0 10px;
        `;
        
        tabsList.appendChild(containerListItem);
        renderItemInterface(containerListItem);
    }

    function renderItemInterface(item) {
        if (!userName) {
            item.innerHTML = "<span style='color: #888; font-size: 11px; font-family: \"Rubik\", sans-serif; opacity: 0.7;'>Log in to rate</span>";
            return;
        }

        if (!masterLedger) {
            item.innerHTML = "<span style='color: #666; font-size: 11px; font-family: \"Rubik\", sans-serif;'>Loading...</span>";
            return;
        }

        let pageData = masterLedger[pageName] || { score: 0 };
        const upActiveColor = userExistingVote === 1 ? '#28a745' : '#bbb';
        const downActiveColor = userExistingVote === -1 ? '#dc3545' : '#bbb';

        item.innerHTML = `
            <div class="ejt-rating-wrapper">
                <span style="color: #fff; font-weight: normal; margin-right: 4px; line-height: 30px; font-family: 'Rubik', sans-serif; -webkit-text-stroke: 2px #000; paint-order: stroke fill; font-weight: bold;">Rating:</span>
                <button class="ejt-up-btn" style="cursor:pointer; background:none; border:none; padding:2px; font-weight:bold; color: ${upActiveColor}; transition: color 0.2s; font-family: 'Rubik', sans-serif; line-height: 30px; -webkit-text-stroke: 4px #000; paint-order: stroke fill;">+1</button>
                <span class="ejt-score-val" style="color: #fff; min-width: 14px; text-align: center; line-height: 30px; font-family: 'Rubik', sans-serif; -webkit-text-stroke: 2px #000; paint-order: stroke fill;">${pageData.score >= 0 ? '+' + pageData.score : pageData.score}</span>
                <button class="ejt-down-btn" style="cursor:pointer; background:none; border:none; padding:2px; font-weight:bold; color: ${downActiveColor}; transition: color 0.2s; font-family: 'Rubik', sans-serif; line-height: 30px; -webkit-text-stroke: 4px #000; paint-order: stroke fill;">-1</button>
            </div>
        `;

        item.querySelector('.ejt-up-btn').addEventListener('click', function() { processVote(1); });
        item.querySelector('.ejt-down-btn').addEventListener('click', function() { processVote(-1); });
    }

    function refreshAllInterfaces() {
        document.querySelectorAll('.ejt-rating-tab').forEach(renderItemInterface);
    }

    const observer = new MutationObserver(function () {
        document.querySelectorAll('.wds-tabs').forEach(function (tabsList) {
            if (tabsList.closest('.fandom-community-header') || tabsList.closest('.sticky-header')) {
                injectIntoMenu(tabsList);
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    api.get({
        action: 'query',
        prop: 'revisions',
        titles: globalLedgerTitle,
        rvprop: 'content',
        formatversion: 2,
        cb: Date.now()
    }).done(function (data) {
        try {
            const page = data.query.pages[0];
            if (page && page.revisions && page.revisions[0]) {
                masterLedger = JSON.parse(page.revisions[0].content);
            }
        } catch (e) {
            console.log("[EJT Ratings] Failed to read ledger, initializing blank array map", e);
            masterLedger = {};
        }

        if (!masterLedger) masterLedger = {};
        if (!masterLedger[pageName]) {
            masterLedger[pageName] = { score: 0, users: {} };
        } else if (typeof masterLedger[pageName] === 'number') {
            masterLedger[pageName] = { score: masterLedger[pageName], users: {} };
        }

        userExistingVote = masterLedger[pageName].users[userName] || 0;
        refreshAllInterfaces(); 
    });

    function processVote(targetVote) {
        if (isProcessing || !masterLedger) return;
        let pageData = masterLedger[pageName];
        
        if (userExistingVote === targetVote) {
            pageData.score -= targetVote;
            delete pageData.users[userName];
            userExistingVote = 0;
        } 
        else if (userExistingVote !== 0) {
            pageData.score += (targetVote * 2); 
            pageData.users[userName] = targetVote;
            userExistingVote = targetVote;
        } 
        else {
            pageData.score += targetVote;
            pageData.users[userName] = targetVote;
            userExistingVote = targetVote;
        }

        isProcessing = true;
        document.querySelectorAll('.ejt-rating-tab').forEach(el => { el.style.opacity = "0.5"; });

        api.postWithToken('csrf', {
            action: 'edit',
            title: globalLedgerTitle,
            summary: `Rating update for [[${pageName}]] by User:${userName}`,
            text: JSON.stringify(masterLedger, null, 2)
        }).done(function () {
            refreshAllInterfaces(); 
        }).fail(function (err) {
            alert("Error saving vote adjustments: " + err);
        }).always(function () {
            isProcessing = false;
            document.querySelectorAll('.ejt-rating-tab').forEach(el => { el.style.opacity = "1"; });
        });
    }
});
// Popular Pages
(function() {
    var targetPage = "JToH's_Joke_Towers_Wiki:Popular_Pages"; 
    if (mw.config.get('wgPageName') !== targetPage) return;

    var container = document.getElementById('dynamic-top-tabber');
    if (!container) return;

    var wikiSubdomain = window.location.origin;
    var jsonUrl = wikiSubdomain + '/wiki/JToH\'s_Joke_Towers_Wiki:Popular_Pages/data.json?action=raw';

    fetch(jsonUrl)
        .then(function(response) {
            if (!response.ok) throw new Error('HTTP Status ' + response.status);
            return response.json();
        })
        .then(function(allArticles) {
            if (!Array.isArray(allArticles) || allArticles.length === 0) return;

            var totalItems = allArticles.slice(0, 250);
            var chunks = [];
            for (var i = 0; i < totalItems.length; i += 50) {
                chunks.push(totalItems.slice(i, i + 50));
            }

            var tabsHTML = '<div class="top-tab-buttons" style="display: grid; grid-template-columns: repeat(5, 1fr); align-items: end; position: relative; z-index: 2; background: transparent; border-bottom: 4px solid #76654a;">';
            var panesHTML = '<div class="top-tab-panes" style="border: 4px solid #76654a; border-top: none; background: #fff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">';

            chunks.forEach(function(chunk, index) {
                var startNum = (index * 50) + 1;
                var endNum = startNum + chunk.length - 1;
                var label = 'Pages ' + startNum + '-' + endNum;
                var isActive = index === 0;

                var bg = isActive ? 'color-mix(in oklab, var(--theme-link-color) 80%, transparent)' : 'color-mix(in oklab, var(--theme-accent-color) 80%, transparent)';
                var color = isActive ? '#fff' : '#000';
                var padding = isActive ? '20px 8px 16px 8px' : '10px 8px';
                
                var borderLeft = '4px solid #76654a';
                var borderRight = '4px solid #76654a';
                var zIndex = isActive ? '3' : '1';
                
                var isLast = (index === chunks.length - 1);
                var marginRight = isLast ? '0px' : '-4px';

                tabsHTML += '<button class="top-tab-btn" data-tab="' + index + '" style="' +
                    'padding: ' + padding + ';' +
                    'cursor: pointer;' +
                    'border: none;' +
                    'border-top: 4px solid #76654a;' +
                    'border-left: ' + borderLeft + ';' +
                    'border-right: ' + borderRight + ';' +
                    'background: ' + bg + ';' +
                    'color: ' + color + ';' +
                    'font-family: inherit;' +
                    'font-weight: 500;' +
                    'font-size: 14px;' +
                    'text-align: center;' +
                    'outline: none;' +
                    'position: relative;' +
                    'z-index: ' + zIndex + ';' +
                    'transition: padding 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s, color 0.2s;' +
                    'box-sizing: border-box;' +
                    'margin-right: ' + marginRight + ';' +
                    '">' + label + '</button>';
                
                panesHTML += '<div class="top-tab-pane" id="top-pane-' + index + '" style="display: ' + (isActive ? 'block' : 'none') + ';">';
                panesHTML += '<ol start="' + startNum + '" style="padding-left: 25px; line-height: 1.8; margin: 0;">';
                
                chunk.forEach(function(itemTitle) {
                    if (!itemTitle) return;
                    var safeTitle = encodeURIComponent(itemTitle.trim());
                    panesHTML += '<li style="margin-bottom: 8px;"><a href="/wiki/' + safeTitle + '" style="color: var(--theme-link-color, #0645ad); font-weight: 500; text-decoration: none;">' + itemTitle + '</a></li>';
                });
                
                panesHTML += '</ol></div>';
            });

            tabsHTML += '</div>';
            panesHTML += '</div>';

            container.innerHTML = tabsHTML + panesHTML;

            var buttons = container.querySelectorAll('.top-tab-btn');
            var panes = container.querySelectorAll('.top-tab-pane');

            buttons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var clickedTab = this.getAttribute('data-tab');
                    
                    buttons.forEach(function(b, idx) {
                        if (idx == clickedTab) {
                            b.style.background = '#96815b';
                            b.style.color = '#fff';
                            b.style.padding = '20px 8px 16px 8px';
                            b.style.zIndex = '3';
                        } else {
                            b.style.background = '#fff';
                            b.style.color = '#000';
                            b.style.padding = '10px 8px';
                            b.style.zIndex = '1';
                        }
                    });
                    
                    panes.forEach(function(pane, idx) {
                        pane.style.display = idx == clickedTab ? 'block' : 'none';
                    });
                });

                btn.addEventListener('mouseenter', function() {
                    if (this.style.background !== 'rgb(150, 129, 91)' && this.style.background !== '#96815b') {
                        this.style.background = '#76654a';
                        this.style.color = '#fff';
                        if(this.style.zIndex !== '3') this.style.zIndex = '2'; 
                    }
                });

                btn.addEventListener('mouseleave', function() {
                    if (container.querySelectorAll('.top-tab-pane')[this.getAttribute('data-tab')].style.display !== 'block') {
                        this.style.background = '#fff';
                        this.style.color = '#000';
                        this.style.zIndex = '1';
                    }
                });
            });
        })
        .catch(function(err) {
            console.error('Tabber Error: ', err);
        });
})();