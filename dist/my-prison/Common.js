/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function ($content) {
  var pageName = (mw.config.get('wgPageName') || '').toLowerCase();
  if (!pageName.includes('change_log') && !pageName.includes('game_updates')) return;

  // --- CONFIGURATION ---
  // Choose where to place the search bar:
  // "top"      = before the page content
  // "bottom"   = after the page content
  // "afterH1"  = right after the first main heading
  // "manual"   = replaces <div id="search-placeholder"></div> if present
  var searchPlacement = "top";
  // ---------------------

  // avoid injecting twice
  if ($content.find('#inpage-search').length) return;

  // create search UI
  var $container = $('<div id="inpage-search" style="margin:10px 0;text-align:left;"></div>');
  var $input = $('<input id="pageSearchInput" type="search" placeholder="Search this page..." style="width:60%;padding:8px;border:1px solid #ccc;border-radius:6px;">');
  var $clear = $('<button id="pageSearchClear" style="margin-left:6px;padding:6px 8px;border:1px solid #ccc;border-radius:4px;background:#f9f9f9;">Clear</button>');
  $container.append($input).append($clear);

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

  // clear previous highlights
  function clearHighlightsIn($group) {
    $group.find('span.page-search-highlight').each(function () {
      $(this).replaceWith($(this).text());
    });
  }

  // highlight matching terms
  function highlightIn($group, term) {
    if (!term) return;
    var safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var re = new RegExp('(' + safe + ')', 'ig');

    $group.find('h1,h2,h3,h4,h5,h6,p,li,td,th,div').each(function () {
      $(this).contents().filter(function () { return this.nodeType === 3; }).each(function () {
        var txt = this.nodeValue;
        if (!txt || !re.test(txt)) return;
        var frag = document.createDocumentFragment();
        var last = 0;
        txt.replace(re, function (m, g, offset) {
          if (offset > last) frag.appendChild(document.createTextNode(txt.slice(last, offset)));
          var span = document.createElement('span');
          span.className = 'page-search-highlight';
          span.textContent = g;
          frag.appendChild(span);
          last = offset + g.length;
        });
        if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
        this.parentNode.replaceChild(frag, this);
      });
    });
  }

  // perform search
  function doSearch() {
    var q = ($input.val() || '').trim().toLowerCase();
    groups.forEach(function ($g) {
      clearHighlightsIn($g);
      $g.each(function () { $(this).show(); });
    });
    if (!q) return;
    groups.forEach(function ($g) {
      var text = ($g.text() || '').toLowerCase();
      if (text.indexOf(q) !== -1) {
        $g.each(function () { $(this).show(); });
        highlightIn($g, q);
      } else {
        $g.each(function () { $(this).hide(); });
      }
    });
  }

  // events
  $input.on('input', doSearch);
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