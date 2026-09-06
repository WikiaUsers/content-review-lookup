/* ══ Witcher TR Yan Görev Navigasyon Kutusu JS ══ */
$(document).ready(function() {
  $(document).on('click', '.wt-nb-cell', function() {
    var $nb = $(this).closest('.wt-nb');
    var idx = $nb.find('.wt-nb-cell').index(this);
    var isOpen = $(this).hasClass('wt-nb-open');
    $nb.find('.wt-nb-cell').removeClass('wt-nb-open');
    $nb.find('.wt-nb-panel').removeClass('wt-nb-open');
    if (!isOpen) {
      $(this).addClass('wt-nb-open');
      $nb.find('.wt-nb-panel').eq(idx).addClass('wt-nb-open');
    }
  });
});

/* ══ INFOBOX KARAKTER JS ══ */
$(function() {

  var chipSources = {
    'Irk':      { sources: ['Irk','Race','race'],                     accent: false },
    'Meslek':   { sources: ['Meslek','Profession','profession'],       accent: true  },
    'Cinsiyet': { sources: ['Cinsiyet','Gender','gender'],             accent: false },
    'Durum':    { sources: ['Durum','Status','status'],                accent: false }
  };

  function getValBySources(infobox, sources) {
    var result = '';
    sources.forEach(function(src) {
      if (result) return;
      var el = infobox.find('.pi-data[data-source="' + src + '"] .pi-data-value');
      if (el.length && el.text().trim()) {
        result = el.text().trim();
      }
    });
    return result;
  }

  function buildChips(infobox) {
    var chips = [];
    $.each(chipSources, function(key, cfg) {
      var val = getValBySources(infobox, cfg.sources);
      if (val) chips.push({ text: val, accent: cfg.accent });
    });

    if (chips.length === 0) return;

    var row = $('<div class="wt-ib-chips"></div>');
    chips.forEach(function(c) {
      row.append('<span class="wt-ib-chip' + (c.accent ? ' accent' : '') + '">' + c.text + '</span>');
    });

    var img = infobox.find('.pi-image');
    if (img.length) {
      img.after(row);
    } else {
      infobox.find('.pi-title').after(row);
    }

    $.each(chipSources, function(key, cfg) {
      cfg.sources.forEach(function(src) {
        infobox.find('.pi-data[data-source="' + src + '"]').hide();
      });
    });
  }

  function hideEmptyHeaders(infobox) {
    infobox.find('.pi-header').each(function() {
      var $group = $(this).closest('.pi-group');
      var hasVisible = $group.find('.pi-data').filter(function() {
        return $(this).is(':visible') && $(this).find('.pi-data-value').text().trim() !== '';
      }).length > 0;
      if (!hasVisible) $(this).closest('.pi-group').hide();
    });
  }

  $('.pi-theme-wt-ib-w').each(function() {
    var ib = $(this);
    buildChips(ib);
    hideEmptyHeaders(ib);
  });

});

/* ══════════════════════════════════════════════════
   INFOBOX LOCATION — loc-e JS
   ══════════════════════════════════════════════════ */

$(function () {
    'use strict';

    $('.pi-theme-loc-e').each(function () {
        var $box = $(this);

        // ── 1. BAŞLIK SATIRINI YENİDEN KUR ──────────────────
        var $origTitle = $box.find('.pi-title');
        var titleHtml  = $origTitle.html() || '';

        var $badgeData = $box.find('.pi-data[data-source="Badge"]');
        var badgeHtml  = $badgeData.find('.pi-data-value').html() || '';
        var hasBadge   = badgeHtml.trim().length > 0;

        var $titleRow = $('<div class="loc-e-titlerow"></div>');
        var $left     = $('<div class="loc-e-titlerow-left"><div class="loc-e-name">' + titleHtml + '</div></div>');
        $titleRow.append($left);

        if (hasBadge) {
            var $right = $('<div class="loc-e-titlerow-right">' + badgeHtml + '</div>');
            $titleRow.append($right);
        }

        var $img = $box.find('.pi-image').first();
        if ($img.length) {
            $img.after($titleRow);
        } else {
            $box.prepend($titleRow);
        }

        // ── 2. HARİTA TABBER'I KUR ──────────────────────────
        var $geoData  = $box.find('.pi-data[data-source="Geo_map"]');
        var $cityData = $box.find('.pi-data[data-source="City_map"]');

        var geoHtml  = $geoData.find('.pi-data-value').html()  || '';
        var cityHtml = $cityData.find('.pi-data-value').html() || '';

        var hasGeo  = geoHtml.trim().length  > 0;
        var hasCity = cityHtml.trim().length > 0;

        var $mapHeader = $box.find('.pi-header').filter(function () {
            return $(this).text().trim().toUpperCase().indexOf('HAR') === 0;
        }).first();

        if (hasGeo || hasCity) {
            var $mapWrap = $('<div class="loc-e-map-wrap"></div>');

            if (hasGeo && hasCity) {
                var $tabs      = $('<div class="loc-e-map-tabs"></div>');
                var $tabDunya  = $('<div class="loc-e-map-tab active">Dünya</div>');
                var $tabBolge  = $('<div class="loc-e-map-tab">Bölge</div>');
                $tabs.append($tabDunya, $tabBolge);

                var $panelDunya = $('<div class="loc-e-map-panel active">' + geoHtml  + '</div>');
                var $panelBolge = $('<div class="loc-e-map-panel">'        + cityHtml + '</div>');

                $tabDunya.on('click', function () {
                    $tabs.find('.loc-e-map-tab').removeClass('active');
                    $mapWrap.find('.loc-e-map-panel').removeClass('active');
                    $tabDunya.addClass('active');
                    $panelDunya.addClass('active');
                });
                $tabBolge.on('click', function () {
                    $tabs.find('.loc-e-map-tab').removeClass('active');
                    $mapWrap.find('.loc-e-map-panel').removeClass('active');
                    $tabBolge.addClass('active');
                    $panelBolge.addClass('active');
                });

                $mapWrap.append($tabs, $panelDunya, $panelBolge);

            } else {
                var singleHtml = hasGeo ? geoHtml : cityHtml;
                var $single    = $('<div class="loc-e-map-single">' + singleHtml + '</div>');
                $mapWrap.append($single);
            }

            if ($mapHeader.length) {
                var $mapGroup = $mapHeader.closest('.pi-group');
                $mapGroup.after($mapWrap);
            } else {
                var $coll = $box.find('.pi-collapse-button, .pi-section-collapsed-heading').first();
                if ($coll.length) {
                    $coll.before($mapWrap);
                } else {
                    $box.append($mapWrap);
                }
            }
        } else {
            if ($mapHeader.length) {
                $mapHeader.closest('.pi-group').hide();
            }
        }

        // ── 3. COLLAPSE="CLOSED" GRUPLARINI ZORLA KAPAT ─────
        $box.find('.pi-group.pi-collapse').each(function () {
            var $g = $(this);
            if (!$g.hasClass('pi-collapse-closed')) {
                $g.addClass('pi-collapse-closed');
                $g.find('.pi-data, .pi-item-spacing').hide();
            }
        });
    });
});

/* ══ ANASAYFA (GÖRSEL 3) SIDEBAR NAVİGASYON JS ══ */
$(function() {
  $(document).on('click', '.wt-h3-item', function() {
    var $wrap = $(this).closest('.wt-h3-wrap');
    var view = $(this).data('view');
    $wrap.find('.wt-h3-item').removeClass('wt-h3-active');
    $(this).addClass('wt-h3-active');
    $wrap.find('.wt-h3-view').removeClass('wt-h3-view-active');
    $wrap.find('.wt-h3-view[data-view-panel="' + view + '"]').addClass('wt-h3-view-active');
  });
});

/* ══ SON AKTİVİTE — DİNAMİK ══ */
$(function() {
  var $box = $('#wt-recent-activity');
  if (!$box.length) return;

  function wtTimeAgo(iso) {
    var diffMin = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (diffMin < 1) return 'az önce';
    if (diffMin < 60) return diffMin + ' dk önce';
    var diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return diffH + ' saat önce';
    return Math.floor(diffH / 24) + ' gün önce';
  }

  $.get(mw.util.wikiScript('api'), {
    action: 'query',
    list: 'recentchanges',
    rcprop: 'title|timestamp|type',
    rclimit: 5,
    rcnamespace: 0,
    rcshow: '!bot',
    format: 'json'
  }).done(function(data) {
    var changes = data.query && data.query.recentchanges;
    if (!changes || !changes.length) {
      $box.html('<div class="wt-h3-activity-empty">Henüz aktivite yok.</div>');
      return;
    }
    $box.empty();
    changes.forEach(function(rc) {
      var label = (rc.type === 'new' ? 'Yeni sayfa: ' : 'Güncellendi: ') + rc.title;
      var $item = $('<div class="wt-h3-activity-item"></div>');
      var $link = $('<a></a>').attr('href', mw.util.getUrl(rc.title))
        .append($('<span class="wt-h3-activity-name"></span>').text(label));
      var $time = $('<span class="wt-h3-activity-time"></span>').text(wtTimeAgo(rc.timestamp));
      $item.append($link, $time);
      $box.append($item);
    });
  }).fail(function() {
    $box.html('<div class="wt-h3-activity-empty">Aktivite yüklenemedi.</div>');
  });
});


/* ══ YENİ TASARIM — FEATURED CAROUSEL + SON AKTİVİTE ══ */
$(function() {
  $('.wt2-featured').each(function() {
    var $box = $(this);
    var $slides = $box.find('.wt2-feat-slide');
    var $dots = $box.find('.wt2-feat-dot');
    var idx = 0;
    function show(i) {
      idx = (i + $slides.length) % $slides.length;
      $slides.removeClass('wt2-active').eq(idx).addClass('wt2-active');
      $dots.removeClass('wt2-active').eq(idx).addClass('wt2-active');
    }
    $box.find('.wt2-feat-nav').on('click', function() { show(idx + 1); });
    $dots.on('click', function() { show($dots.index(this)); });
    show(0);
  });

  var $box = $('#wt2-recent-activity');
  if ($box.length) {
    function wt2TimeAgo(iso) {
      var m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
      if (m < 1) return 'az önce';
      if (m < 60) return m + ' dk önce';
      var h = Math.floor(m / 60);
      if (h < 24) return h + ' saat önce';
      return Math.floor(h / 24) + ' gün önce';
    }
    $.get(mw.util.wikiScript('api'), {
      action: 'query', list: 'recentchanges', rcprop: 'title|timestamp|type',
      rclimit: 8, rcnamespace: 0, rcshow: '!bot', format: 'json'
    }).done(function(data) {
      var changes = data.query && data.query.recentchanges;
      if (!changes || !changes.length) { $box.html('<div class="wt2-act-loading">Henüz aktivite yok.</div>'); return; }
      $box.empty();
      changes.forEach(function(rc) {
        var label = (rc.type === 'new' ? 'Yeni sayfa: ' : 'Güncellendi: ') + rc.title;
        var $item = $('<div class="wt2-act-item"></div>');
        var $link = $('<a></a>').attr('href', mw.util.getUrl(rc.title)).text(label);
        var $time = $('<span class="wt2-act-time"></span>').text(wt2TimeAgo(rc.timestamp));
        $item.append($link, $time);
        $box.append($item);
      });
    }).fail(function() { $box.html('<div class="wt2-act-loading">Aktivite yüklenemedi.</div>'); });
  }
});

/* ══════════════════════════════════════════════════
   ANA GÖREVLER — AKORDEON + SEVİYE / KARAKTER / BÖLGE FİLTRESİ
   (Common.js'in sonuna eklenecek)
   ══════════════════════════════════════════════════ */
$(function () {
    'use strict';

    var $wrap = $('.wt-mq-wrap');
    if (!$wrap.length) return;

    /* ── 1. Akordeon aç/kapat (mevcut wt-nb / wt-h3 üslubuyla aynı) ── */
    $(document).on('click', '.wt-mq-section-head', function () {
        $(this).closest('.wt-mq-section').toggleClass('wt-mq-open');
    });
    $(document).on('click', '.wt-mq-subsection-head', function (e) {
        e.stopPropagation(); // üst section'ın toggle'ını tetiklemesin
        $(this).closest('.wt-mq-subsection').toggleClass('wt-mq-open');
    });

    /* ── 2. Filtre seçeneklerini satırlardaki data-* değerlerinden topla ── */
    function collectValues(attr) {
        var seen = {};
        $wrap.find('tr[' + attr + ']').each(function () {
            var raw = $(this).attr(attr);
            if (!raw) return;
            raw.split(',').forEach(function (v) {
                v = $.trim(v);
                if (v) seen[v] = true;
            });
        });
        return Object.keys(seen).sort(function (a, b) {
            return a.localeCompare(b, 'tr');
        });
    }

    function fillSelect($select, values) {
        values.forEach(function (v) {
            $select.append($('<option></option>').val(v).text(v));
        });
    }

    fillSelect($wrap.find('[data-filter="level"]'), collectValues('data-level'));
    fillSelect($wrap.find('[data-filter="character"]'), collectValues('data-character'));
    fillSelect($wrap.find('[data-filter="region"]'), collectValues('data-region'));

    /* ── 3. Filtreleme mantığı ── */
    function matchesMulti(raw, val) {
        if (!val) return true; // "Tümü" seçiliyse her zaman geç
        var vals = (raw || '').split(',').map(function (s) { return $.trim(s); });
        return vals.indexOf(val) !== -1;
    }

    function applyFilters() {
        var f = {
            level: $wrap.find('[data-filter="level"]').val(),
            character: $wrap.find('[data-filter="character"]').val(),
            region: $wrap.find('[data-filter="region"]').val()
        };

        $wrap.find('tr[data-level]').each(function () {
            var $row = $(this);
            var ok = matchesMulti($row.attr('data-level'), f.level)
                && matchesMulti($row.attr('data-region'), f.region)
                && matchesMulti($row.attr('data-character'), f.character);
            $row.toggle(ok);
        });

        /* Alt bölüm (2.1 / 2.2 / 2.3) — sayaç + boşsa gizle */
        $wrap.find('.wt-mq-subsection').each(function () {
            var $sub = $(this);
            var visible = $sub.find('tr[data-level]:visible').length;
            $sub.toggle(visible > 0);
            $sub.children('.wt-mq-subsection-head')
                .find('.wt-mq-count').text(visible + ' görev');
        });

        /* Ana bölüm (1 / 2 / 3 / 4) — sayaç + boşsa gizle */
        $wrap.find('.wt-mq-section').each(function () {
            var $sec = $(this);
            var visible = $sec.find('tr[data-level]:visible').length;
            $sec.toggle(visible > 0);
            $sec.children('.wt-mq-section-head')
                .find('.wt-mq-count').text(visible + ' görev');
        });
    }

    $wrap.on('change', '.wt-mq-select', applyFilters);
});