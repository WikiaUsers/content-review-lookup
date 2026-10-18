(function () {
  var W = 230;
  var GAP = 10;
  var tip = null;
  var current = null;
  window.dfGridLoaded = true;

  function getTip(card) {
    var host = $(card).closest('.mw-parser-output')[0] || document.body;
    if (!tip || tip.parentNode !== host) {
      if (tip && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }
      tip = document.createElement('div');
      tip.className = 'df-tip';
      tip.style.cssText = 'position:fixed;display:none;z-index:9999;width:' + W + 'px;pointer-events:none;';
      host.appendChild(tip);
    }
    return tip;
  }

  function sourceOf(card) {
    var $card = $(card);
    if ($card.hasClass('df-fcard')) {
      return card.querySelector($card.hasClass('flipped') ? '.df-fcard-info-s' : '.df-fcard-info-n');
    }
    return card.querySelector('.df-gpop');
  }

  function show(card) {
    var isFlip = $(card).hasClass('df-fcard');
    if (window.innerWidth <= 700 && !isFlip) {
      return;
    }
    var source = sourceOf(card);
    if (!source) {
      return;
    }
    current = card;
    var t = getTip(card);
    t.innerHTML = source.innerHTML;
    t.style.display = 'block';

    var rect = card.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;

    var left = rect.right + GAP;
    if (left + W > vw - 5) {
      left = rect.left - W - GAP;
    }
    if (left < 5) {
      left = Math.max(5, Math.min(vw - W - 5, rect.left + rect.width / 2 - W / 2));
    }

    var top = rect.top - 8;
    var height = t.offsetHeight;
    if (top + height > vh - 5) {
      top = vh - height - 5;
    }
    if (top < 5) {
      top = 5;
    }

    t.style.left = left + 'px';
    t.style.top = top + 'px';
  }

  function hide() {
    current = null;
    if (tip) {
      tip.style.display = 'none';
    }
  }

  $(document).on('mouseenter', '.df-gcard, .df-fcard', function () {
    show(this);
  });
  $(document).on('mouseleave', '.df-gcard, .df-fcard', hide);
  $(window).on('scroll', hide);

  function toggleFlip($card) {
    var flipped = $card.toggleClass('flipped').hasClass('flipped');
    $card.attr('aria-pressed', flipped ? 'true' : 'false');
    show($card[0]);
  }

  $(document).on('click', '.df-fcard', function (e) {
    if ($(e.target).closest('a').length) {
      return;
    }
    toggleFlip($(this));
  });

  $(document).on('keydown', '.df-fcard', function (e) {
    if ($(e.target).closest('a').length) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip($(this));
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.df-fcard').length) {
      hide();
    }
  });
})();

(function () {
  var ORDER = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Secret', 'Exotic', 'Exclusive'];
  window.dfwLoaded = true;

  function nodesOf($box) {
    var stop = $box.hasClass('df-world-sub') ? '.df-world' : '.df-world:not(.df-world-sub)';
    return $box.nextUntil(stop);
  }

  function refreshFold($root) {
    $root.find('.dfw-hidden').removeClass('dfw-hidden');
    $root.find('.df-world.dfw-folded').each(function () {
      nodesOf($(this)).addClass('dfw-hidden');
    });
  }

  function setBox($box, folded) {
    $box.toggleClass('dfw-folded', folded);
    $box.attr('aria-expanded', folded ? 'false' : 'true');
  }

  function buildFilter($root, $f) {
    if ($f.data('dftBuilt')) {
      return;
    }
    $f.data('dftBuilt', true);

    var noun = $f.attr('data-noun') || 'items';
    var placeholder = $f.attr('data-placeholder') || 'Search...';
    var cards = $root.find('.df-gcard, .df-fcard').toArray();

    var info = cards.map(function (card) {
      var $c = $(card);
      var rarity = $.trim($c.find('.df-gpop-rar, .df-fcard-rar').first().text());
      var $grid = $c.closest('.df-grid, .df-fgrid');
      var world = $.trim($grid.prevAll('.df-world:not(.df-world-sub)').first().find('.df-world-name').text());
      return {
        el: card,
        rarity: rarity,
        world: world,
        text: ($c.text() + ' ' + world).toLowerCase()
      };
    });

    var worlds = [];
    var rarities = [];
    info.forEach(function (it) {
      if (it.world && worlds.indexOf(it.world) === -1) {
        worlds.push(it.world);
      }
      if (it.rarity && rarities.indexOf(it.rarity) === -1) {
        rarities.push(it.rarity);
      }
    });
    rarities.sort(function (a, b) {
      var ia = ORDER.indexOf(a);
      var ib = ORDER.indexOf(b);
      if (ia === -1) { ia = 99; }
      if (ib === -1) { ib = 99; }
      return ia - ib || (a < b ? -1 : 1);
    });

    var $search = $('<div class="dft-search"></div>');
    var $input = $('<input type="text" class="dft-input">').attr('placeholder', placeholder);
    $search.append($input);

    var $world = $('<select class="dft-select"></select>').attr('aria-label', 'World')
      .append('<option value="">All worlds</option>');
    worlds.forEach(function (w) {
      $world.append($('<option></option>').attr('value', w).text(w));
    });

    var $rarity = $('<select class="dft-select"></select>').attr('aria-label', 'Rarity')
      .append('<option value="">All rarities</option>');
    rarities.forEach(function (r) {
      $rarity.append($('<option></option>').attr('value', r).text(r));
    });

    var $clear = $('<span class="dft-btn" role="button" tabindex="0">Clear</span>');
    var $fold = $('<span class="dft-btn dft-btn-main" role="button" tabindex="0">Collapse all</span>');
    var $count = $('<div class="dft-count"></div>');

    $f.removeClass('df-filter').addClass('dft-bar').empty()
      .append($search, $world, $rarity, $clear, $fold, $count);

    function syncFoldLabel() {
      var anyOpen = $root.find('.df-world.dfw-fold').not('.dfw-folded').length > 0;
      $fold.text(anyOpen ? 'Collapse all' : 'Expand all');
    }

    function run() {
      var q = $.trim($input.val()).toLowerCase();
      var tokens = q ? q.split(/\s+/) : [];
      var w = $world.val();
      var r = $rarity.val();
      var shown = 0;

      info.forEach(function (it) {
        var ok = (!w || it.world === w) && (!r || it.rarity === r);
        for (var i = 0; ok && i < tokens.length; i++) {
          if (it.text.indexOf(tokens[i]) === -1) {
            ok = false;
          }
        }
        $(it.el).toggleClass('dft-hide', !ok);
        if (ok) {
          shown++;
        }
      });

      var active = !!(q || w || r);
      if (active) {
        $count.html('Showing <b>' + shown + '</b> of ' + info.length + ' ' + mw.html.escape(noun));
      } else {
        $count.html('<b>' + info.length + '</b> ' + mw.html.escape(noun) + ' in total');
      }

      $root.find('.dft-nomatch').removeClass('dft-nomatch');
      if (active) {
        $root.find('.df-world').each(function () {
          var $box = $(this);
          var $nodes = nodesOf($box);
          var matches = $nodes.find('.df-gcard, .df-fcard').not('.dft-hide').length;
          if (matches === 0) {
            $box.addClass('dft-nomatch');
            $nodes.addClass('dft-nomatch');
          } else {
            setBox($box, false);
          }
        });
        refreshFold($root);
      }
      syncFoldLabel();
    }

    $input.on('input keyup', run);
    $world.on('change', run);
    $rarity.on('change', run);

    $clear.on('click', function () {
      $input.val('');
      $world.val('');
      $rarity.val('');
      run();
    });

    $fold.on('click', function () {
      var anyOpen = $root.find('.df-world.dfw-fold').not('.dfw-folded').length > 0;
      $root.find('.df-world.dfw-fold').each(function () {
        setBox($(this), anyOpen);
      });
      refreshFold($root);
      syncFoldLabel();
    });

    $clear.add($fold).on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });

    $root.on('click', '.dfw-fold', syncFoldLabel);

    run();
  }

  function initRoot($root, $f) {
    if (!$root.data('dfwInit')) {
      $root.data('dfwInit', true);

      $root.find('.df-world').each(function () {
        var $b = $(this);
        $b.addClass('dfw-fold').attr({ tabindex: '0', role: 'button', 'aria-expanded': 'true' });
        if (!$b.children('.dfw-toggle').length) {
          $b.append('<span class="dfw-toggle"></span>');
        }
      });

      $root.on('click', '.dfw-fold', function () {
        var $b = $(this);
        setBox($b, !$b.hasClass('dfw-folded'));
        refreshFold($root);
      });

      $root.on('keydown', '.dfw-fold', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          $(this).trigger('click');
        }
      });
    }
    buildFilter($root, $f);
  }

  function openHash() {
    var id = '';
    try {
      id = decodeURIComponent((window.location.hash || '').slice(1));
    } catch (err) {
      return;
    }
    if (!id) {
      return;
    }
    var $box = $(document.getElementById(id));
    if ($box.hasClass('dfw-folded')) {
      setBox($box, false);
      refreshFold($box.closest('.mw-parser-output'));
    }
  }

  $(window).on('hashchange', openHash);

  mw.hook('wikipage.content').add(function ($content) {
    $content.find('.df-filter').each(function () {
      var $f = $(this);
      var $root = $f.closest('.mw-parser-output');
      if (!$root.length) {
        $root = $f.parent();
      }
      initRoot($root, $f);
    });
    openHash();
  });
})();