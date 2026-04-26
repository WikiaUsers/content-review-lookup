(function () {
  function initAutoCalendar() {
    var roots = document.querySelectorAll('.rs-auto-calendar');
    if (!roots.length) return;

    roots.forEach(function (root) {
      var today = new Date();
      var viewYear = today.getFullYear();
      var viewMonth = today.getMonth();

      var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      function render() {
        var firstDay = new Date(viewYear, viewMonth, 1);
        var startDay = firstDay.getDay();
        var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        var prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

        var html = '';

        html += '<div style="background:#2B2B2F;border-radius:12px;overflow:hidden;margin-bottom:16px;">';

        html += '<div style="display:grid;grid-template-columns:40px 1fr 40px;background:#EFEFEF;border-bottom:1px solid #D0D0D0;">';
        html += '<button class="rs-cal-prev-year" style="border:0;background:#EFEFEF;padding:8px 0;font-weight:700;cursor:pointer;color:#333;">◀</button>';
        html += '<div style="text-align:center;padding:8px 0;font-weight:700;color:#333;">' + viewYear + '</div>';
        html += '<button class="rs-cal-next-year" style="border:0;background:#EFEFEF;padding:8px 0;font-weight:700;cursor:pointer;color:#333;">▶</button>';
        html += '</div>';

        html += '<div style="display:grid;grid-template-columns:40px 1fr 40px;background:#F4F4F4;border-bottom:1px solid #D0D0D0;">';
        html += '<button class="rs-cal-prev-month" style="border:0;background:#F4F4F4;padding:8px 0;font-weight:700;cursor:pointer;color:#333;">◀</button>';
        html += '<div style="text-align:center;padding:8px 0;font-weight:700;color:#333;">' + monthNames[viewMonth] + '</div>';
        html += '<button class="rs-cal-next-month" style="border:0;background:#F4F4F4;padding:8px 0;font-weight:700;cursor:pointer;color:#333;">▶</button>';
        html += '</div>';

        html += '<table style="width:100%;border-collapse:collapse;table-layout:fixed;background:#FFFFFF;font-size:92%;">';
        html += '<tr>';

        ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(function (dayName) {
          html += '<th style="border:1px solid #D6D6D6;padding:7px 0;background:#F2F2F2;color:#222;font-weight:700;">' + dayName + '</th>';
        });

        html += '</tr>';

        var day = 1;
        var nextDay = 1;

        for (var row = 0; row < 6; row++) {
          html += '<tr>';

          for (var col = 0; col < 7; col++) {
            var index = row * 7 + col;
            var text = '';
            var isOtherMonth = false;
            var isToday = false;

            if (index < startDay) {
              text = prevMonthDays - startDay + index + 1;
              isOtherMonth = true;
            } else if (day > daysInMonth) {
              text = nextDay++;
              isOtherMonth = true;
            } else {
              text = day;
              isToday =
                viewYear === today.getFullYear() &&
                viewMonth === today.getMonth() &&
                day === today.getDate();
              day++;
            }

            if (isToday) {
              html += '<td style="border:1px solid #E0E0E0;text-align:center;padding:9px 0;background:#4C72FF;color:#FFFFFF;font-weight:700;">' + text + '</td>';
            } else if (isOtherMonth) {
              html += '<td style="border:1px solid #E0E0E0;text-align:center;padding:9px 0;color:#B3B3B3;background:#F7F7F7;">' + text + '</td>';
            } else {
              html += '<td style="border:1px solid #E0E0E0;text-align:center;padding:9px 0;color:#333;background:#FFFFFF;">' + text + '</td>';
            }
          }

          html += '</tr>';
        }

        html += '</table>';
        html += '</div>';

        root.innerHTML = html;

        root.querySelector('.rs-cal-prev-year').onclick = function () {
          viewYear--;
          render();
        };

        root.querySelector('.rs-cal-next-year').onclick = function () {
          viewYear++;
          render();
        };

        root.querySelector('.rs-cal-prev-month').onclick = function () {
          viewMonth--;
          if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
          }
          render();
        };

        root.querySelector('.rs-cal-next-month').onclick = function () {
          viewMonth++;
          if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
          }
          render();
        };
      }

      render();
    });
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(initAutoCalendar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoCalendar);
  } else {
    initAutoCalendar();
  }
})();


(function () {
  function initGearFilters() {
    const page = document.querySelector('.rs-gear-page');
    if (!page) return;

    if (page.dataset.rsGearFilterReady === '1') return;
    page.dataset.rsGearFilterReady = '1';

    const buttons = Array.from(page.querySelectorAll('.rs-filter-btn'));
    const rows = Array.from(page.querySelectorAll('.rs-gear-row'));
    const countEl = page.querySelector('#rs-gear-visible-count');
    const noResultsEl = page.querySelector('#rs-gear-no-results');

    const state = {
      rarity: null,
      category: null,
      faction: null
    };

    function updateButtons() {
      buttons.forEach(function (btn) {
        const group = btn.dataset.group;
        const value = btn.dataset.value;

        if (group === 'all') {
          const anyActive = Object.values(state).some(Boolean);
          btn.classList.toggle('is-active', !anyActive);
          return;
        }

        btn.classList.toggle('is-active', state[group] === value);
      });
    }

    function matchesRow(row) {
      const rarity = row.dataset.rarity || '';
      const category = row.dataset.category || '';
      const faction = row.dataset.faction || '';

      if (state.rarity && rarity !== state.rarity) return false;
      if (state.category && category !== state.category) return false;
      if (state.faction && faction !== state.faction) return false;

      return true;
    }

    function applyFilters() {
      let visible = 0;

      rows.forEach(function (row) {
        const show = matchesRow(row);
        row.classList.toggle('is-hidden', !show);
        if (show) visible += 1;
      });

      if (countEl) countEl.textContent = String(visible);
      if (noResultsEl) noResultsEl.classList.toggle('is-hidden', visible !== 0);
    }

    function handleFilter(btn) {
      const group = btn.dataset.group;
      const value = btn.dataset.value;

      if (group === 'all' && value === 'all') {
        state.rarity = null;
        state.category = null;
        state.faction = null;
        updateButtons();
        applyFilters();
        return;
      }

      if (!Object.prototype.hasOwnProperty.call(state, group)) return;

      const current = state[group];
      state[group] = current === value ? null : value;

      updateButtons();
      applyFilters();
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        handleFilter(btn);
      });

      btn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleFilter(btn);
        }
      });
    });

    updateButtons();
    applyFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGearFilters);
  } else {
    initGearFilters();
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(function () {
      initGearFilters();
    });
  }
})();


(function () {
  function initGearAffixPage() {
    var page = document.querySelector('.ga-page');
    if (!page) return;

    var rows = Array.prototype.slice.call(page.querySelectorAll('.ga-row'));
    var buttons = Array.prototype.slice.call(page.querySelectorAll('.ga-filter-btn'));
    var countEl = page.querySelector('.ga-visible-count');
    var noResultsEl = page.querySelector('.ga-no-results');

    var state = {
      faction: 'all',
      slot: 'all'
    };

    function matchesRow(row) {
      var rowFaction = row.getAttribute('data-faction') || '';
      var rowSlots = (row.getAttribute('data-slots') || '').split('|');

      var factionOk = state.faction === 'all' || rowFaction === state.faction;
      var slotOk = state.slot === 'all' || rowSlots.indexOf(state.slot) !== -1;

      return factionOk && slotOk;
    }

    function updateButtons() {
      buttons.forEach(function (btn) {
        var group = btn.getAttribute('data-group');
        var value = btn.getAttribute('data-value');

        if (group === 'reset') {
          var active = state.faction === 'all' && state.slot === 'all';
          btn.classList.toggle('is-active', active);
          return;
        }

        var active = state[group] === value;
        btn.classList.toggle('is-active', active);
      });
    }

    function render() {
      var visibleCount = 0;

      rows.forEach(function (row) {
        var show = matchesRow(row);
        row.classList.toggle('ga-hidden', !show);
        if (show) visibleCount += 1;
      });

      if (countEl) countEl.textContent = String(visibleCount);
      if (noResultsEl) noResultsEl.classList.toggle('is-visible', visibleCount === 0);

      updateButtons();
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.getAttribute('data-group');
        var value = btn.getAttribute('data-value');

        if (group === 'reset') {
          state.faction = 'all';
          state.slot = 'all';
          render();
          return;
        }

        if (group === 'faction' || group === 'slot') {
          state[group] = value;
          render();
        }
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGearAffixPage);
  } else {
    initGearAffixPage();
  }
})();

(function () {
  function titleCase(text) {
    return (text || '')
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  }

  function slotMatches(rowSlots, slot) {
    return (rowSlots || '').split('|').includes(slot);
  }

  function buildPoolPanel(title, rows) {
    var panel = document.createElement('div');
    panel.className = 'rs-gear-affix-panel';

    var html = ''
      + '<div class="rs-gear-affix-panel-title">' + title + '</div>'
      + '<div class="rs-gear-affix-panel-body">'
      +   '<table class="rs-gear-affix-mini-table">'
      +     '<tr>'
      +       '<th>Affix</th>'
      +       '<th>Restricted Slot</th>'
      +       '<th>Min</th>'
      +       '<th>Max</th>'
      +     '</tr>'
      +   '</table>'
      + '</div>';

    panel.innerHTML = html;

    var table = panel.querySelector('.rs-gear-affix-mini-table');

    rows.forEach(function (row) {
      var tr = document.createElement('tr');

      var affix = row.querySelector('.ga-affix-text');
      var slot = row.querySelector('.ga-col-slot');
      var min = row.querySelector('.ga-col-min');
      var max = row.querySelector('.ga-col-max');

      tr.innerHTML =
        '<td>' + (affix ? affix.innerHTML : '') + '</td>' +
        '<td>' + (slot ? slot.innerHTML : '') + '</td>' +
        '<td>' + (min ? min.textContent : '') + '</td>' +
        '<td>' + (max ? max.textContent : '') + '</td>';

      table.appendChild(tr);
    });

    return panel;
  }

  function initGearAffixEmbed() {
    var blocks = document.querySelectorAll('.rs-gear-affix-embed');
    if (!blocks.length) return;

    blocks.forEach(function (block) {
      var faction = block.dataset.faction || 'general';
      var factionLabel = block.dataset.factionLabel || titleCase(faction);
      var slot = (block.dataset.slot || '').toLowerCase();

      var source = block.querySelector('.rs-gear-affix-source');
      if (!source) return;

      var rows = Array.from(source.querySelectorAll('.ga-row'));

      var generalRows = rows.filter(function (row) {
        return row.dataset.faction === 'general' && slotMatches(row.dataset.slots, slot);
      });

      var factionRows = rows.filter(function (row) {
        return row.dataset.faction === faction && slotMatches(row.dataset.slots, slot);
      });

      var generalTarget = block.querySelector('.rs-gear-affix-target-general');
      var factionTarget = block.querySelector('.rs-gear-affix-target-faction');

      if (generalTarget && generalRows.length) {
        generalTarget.appendChild(
          buildPoolPanel('Standard ' + titleCase(slot) + ' Affix Pool', generalRows)
        );
      }

      if (factionTarget && factionRows.length) {
        factionTarget.appendChild(
          buildPoolPanel(factionLabel + ' Exclusive ' + titleCase(slot) + ' Affix Pool', factionRows)
        );
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGearAffixEmbed);
  } else {
    initGearAffixEmbed();
  }
})();

(function () {
  function initGearSourceList() {
    var boxes = document.querySelectorAll('.rs-gear-source-plain');
    if (!boxes.length) return;

    boxes.forEach(function (box) {
      if (box.dataset.enhanced === '1') return;
      if (box.querySelector('ul, ol, li, br')) return;

      var raw = box.textContent.trim();
      if (!raw || raw.indexOf(' / ') === -1) return;

      var items = raw.split(/\s*\/\s*/).map(function (s) {
        return s.trim();
      }).filter(Boolean);

      if (items.length < 2) return;

      var ul = document.createElement('ul');
      ul.className = 'rs-gear-source-list';

      items.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });

      box.innerHTML = '';
      box.appendChild(ul);
      box.dataset.enhanced = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGearSourceList);
  } else {
    initGearSourceList();
  }
})();

(function () {
  function initCharacterSkinSwitch(root) {
    root = root || document;

    root.querySelectorAll('.rs-skin-tabs:not([data-rs-ready])').forEach(function (tabBar) {
      tabBar.setAttribute('data-rs-ready', '1');

      var heroLeft = tabBar.closest('.rs-char-hero-left');
      if (!heroLeft) return;

      var buttons = Array.from(tabBar.querySelectorAll('.rs-skin-option'));
      var arts = Array.from(heroLeft.querySelectorAll('.rs-skin-art'));

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-skin');

          buttons.forEach(function (b) {
            b.classList.toggle('is-active', b.getAttribute('data-skin') === target);
          });

          arts.forEach(function (art) {
            art.classList.toggle('is-active', art.getAttribute('data-skin') === target);
          });
        });
      });
    });
  }

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(function ($content) {
      initCharacterSkinSwitch($content[0] || document);
    });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initCharacterSkinSwitch(document);
    });
  }
})();