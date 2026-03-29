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