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