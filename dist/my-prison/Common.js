/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function ($content) {
  var pageName = (mw.config.get('wgPageName') || '').toLowerCase();
  if (!pageName.includes('change_log') && !pageName.includes('game_updates')) return;

  // --- CONFIGURATION ---
  var searchPlacement = "top"; // "top" | "bottom" | "afterH1" | "manual"
  var debounceMs = 150;
  var matchWholeWord = false; // set true to match whole words only
  // ---------------------

  // avoid injecting twice
  if ($content.find('#inpage-search').length) return;

  // create search UI
  var $container = $('<div id="inpage-search" style="margin:10px 0;text-align:left;"></div>');
  var $input = $('<input id="pageSearchInput" type="search" placeholder="Search this page..." style="width:60%;padding:8px;border:1px solid #ccc;border-radius:6px;">');
  var $clear = $('<button id="pageSearchClear" style="margin-left:6px;padding:6px 8px;border:1px solid #ccc;border-radius:4px;background:#f9f9f9;">Clear</button>');
  var $meta = $('<span id="pageSearchMeta" style="margin-left:12px;font-size:0.95em;color:#444;"></span>');
  $container.append($input).append($clear).append($meta);

  // place according to configuration
  if (searchPlacement === "bottom") {
    $content.append($container);
  } else if (searchPlacement === "afterH1" && $content.find('h1').length) {
    $content.find('h1').first().after($container);
  } else if (searchPlacement === "manual" && $('#search-placeholder').length) {
    $('#search-placeholder').replaceWith($container);
  } else {
    $content.prepend($container);
  }

  // find update groups
  var groups = [];
  var $entries = $content.find('.log-entry');
  if ($entries.length) {
    $entries.each(function () { groups.push($(this)); });
  } else {
    $content.find('h2, h3, h4').each(function () {
      var $h = $(this);
      var $grp = $h.add($h.nextUntil('h2,h3,h4'));
      groups.push($grp);
    });
    if (!groups.length) {
      var $all = $content.find('.mw-parser-output').children();
      if ($all.length) groups.push($all);
    }
  }

  // helper: debounce
  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  // clear previous highlights
  function clearHighlightsIn($group) {
    $group.find('span.page-search-highlight').each(function () {
      $(this).replaceWith($(this).text());
    });
  }

  // normalize text: lowercase + remove diacritics
  function normalizeText(s) {
    if (!s) return '';
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // highlight matching terms using an already-normalized term to avoid mismatch
  function highlightIn($group, term, normTerm) {
    if (!term) return;
    var normTermLocal = typeof normTerm !== 'undefined' ? normTerm : normalizeText(term);
    var termLen = normTermLocal.length;
    if (!termLen) return;

    var useWhole = !!matchWholeWord;

    $group.find('h1,h2,h3,h4,h5,h6,p,li,td,th,div').each(function () {
      // only process text nodes inside this element
      $(this).contents().filter(function () { return this.nodeType === 3; }).each(function () {
        var txt = this.nodeValue;
        if (!txt) return;

        // build mapping from normalized indices to original indices
        var norm = '';
        var map = [];
        for (var i = 0; i < txt.length; i++) {
          var ch = txt[i];
          var nch = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          if (nch.length === 0) continue;
          for (var k = 0; k < nch.length; k++) {
            norm += nch[k].toLowerCase();
            map.push(i);
          }
        }
        if (!norm) return;

        var startIndex = 0;
        var foundAny = false;
        var frag = document.createDocumentFragment();
        var lastOrig = 0;

        while (true) {
          var pos = norm.indexOf(normTermLocal, startIndex);
          if (pos === -1) break;

          // if whole-word required, check boundaries in the normalized string
          if (useWhole) {
            var before = pos - 1;
            var after = pos + termLen;
            var okBefore = before < 0 || !(/[a-z0-9_]/i).test(norm[before]);
            var okAfter = after >= norm.length || !(/[a-z0-9_]/i).test(norm[after]);
            if (!(okBefore && okAfter)) {
              startIndex = pos + 1;
              continue;
            }
          }

          foundAny = true;
          var origStart = map[pos];
          var origEnd = map[pos + termLen - 1] + 1; // slice end

          // append text between lastOrig and origStart
          if (origStart > lastOrig) {
            frag.appendChild(document.createTextNode(txt.slice(lastOrig, origStart)));
          }
          // create highlight span for matched original substring
          var span = document.createElement('span');
          span.className = 'page-search-highlight';
          span.textContent = txt.slice(origStart, origEnd);
          frag.appendChild(span);

          lastOrig = origEnd;
          startIndex = pos + termLen;
        }

        if (!foundAny) return; // return from this text-node callback (equivalent to continue)

        if (lastOrig < txt.length) frag.appendChild(document.createTextNode(txt.slice(lastOrig)));
        this.parentNode.replaceChild(frag, this);
      });
    });
  }

  // perform search
  function doSearch() {
    var q = ($input.val() || '').trim();
    var normQ = normalizeText(q);

    // reset groups
    groups.forEach(function ($g) {
      clearHighlightsIn($g);
      $g.each(function () { $(this).show(); });
    });

    if (!normQ) {
      $meta.text('');
      return;
    }

    var totalMatches = 0;
    var firstMatchedGroup = null;

    groups.forEach(function ($g) {
      var text = ($g.text() || '');
      if (!text) {
        $g.each(function () { $(this).hide(); });
        return;
      }
      var normText = normalizeText(text);
      if (normText.indexOf(normQ) !== -1) {
        $g.each(function () { $(this).show(); });
        highlightIn($g, q, normQ); // use same normalized query for highlighting
        totalMatches++;
        if (!firstMatchedGroup) firstMatchedGroup = $g;
      } else {
        $g.each(function () { $(this).hide(); });
      }
    });

    $meta.text(totalMatches ? (totalMatches + ' group(s) matched') : 'No matches');

    // scroll to first matched group only when query is at least 2 chars (avoids jumping on first letter)
    if (firstMatchedGroup && normQ && normQ.length >= 2 && firstMatchedGroup.length) {
      var el = firstMatchedGroup.first()[0];
      if (el && el.scrollIntoView) {
        try {
          var y = $(el).offset().top - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } catch (e) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  // events
  $input.on('input', debounce(doSearch, debounceMs));
  $input.on('keyup', function (e) {
    if (e.key === 'Escape') { $input.val(''); doSearch(); }
  });
  $clear.on('click', function () {
    $input.val(''); doSearch(); $input.focus();
  });

  // highlight CSS (only once)
  if (!document.getElementById('page-search-highlight-style')) {
    var css = '.page-search-highlight{background:#fff176;color:#000;padding:0 2px;border-radius:2px;}';
    var style = document.createElement('style'); style.id = 'page-search-highlight-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
});