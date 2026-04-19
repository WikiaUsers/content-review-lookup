(function () {
  if (mw.config.get('wgPageName') !== 'Characters') return;

  function initCharacterFilters() {
    const page = document.querySelector('.rs-char-page');
    if (!page) return;

    const buttons = Array.from(page.querySelectorAll('.rs-filter-btn'));
    const cards = Array.from(page.querySelectorAll('.rs-char-card'));
    const countEl = page.querySelector('#rs-visible-count');
    const noResultsEl = page.querySelector('#rs-no-results');
    const tagToggle = page.querySelector('.rs-tag-toggle');
    const tagList = page.querySelector('.rs-tag-list');

    const state = {
      rarity: null,
      gender: null,
      faction: null,
      tag: null
    };

    function updateButtons() {
      buttons.forEach((btn) => {
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

    function matchesCard(card) {
      const rarity = card.dataset.rarity || '';
      const gender = card.dataset.gender || '';
      const faction = card.dataset.faction || '';
      const tags = (card.dataset.tags || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      if (state.rarity && rarity !== state.rarity) return false;
      if (state.gender && gender !== state.gender) return false;
      if (state.faction && faction !== state.faction) return false;
      if (state.tag && !tags.includes(state.tag)) return false;

      return true;
    }

    function applyFilters() {
      let visible = 0;

      cards.forEach((card) => {
        const show = matchesCard(card);
        card.classList.toggle('is-hidden', !show);
        if (show) visible += 1;
      });

      if (countEl) countEl.textContent = String(visible);
      if (noResultsEl) noResultsEl.classList.toggle('is-hidden', visible !== 0);
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const group = btn.dataset.group;
        const value = btn.dataset.value;

        if (group === 'all' && value === 'all') {
          state.rarity = null;
          state.gender = null;
          state.faction = null;
          state.tag = null;
          updateButtons();
          applyFilters();
          return;
        }

        const current = state[group];
        state[group] = current === value ? null : value;

        updateButtons();
        applyFilters();
      });
    });

    if (tagToggle && tagList) {
      tagToggle.addEventListener('click', function () {
        const collapsed = tagList.classList.toggle('is-collapsed');
        tagToggle.textContent = collapsed ? '[Expand]' : '[Collapse]';
        tagToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
    }

    updateButtons();
    applyFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacterFilters);
  } else {
    initCharacterFilters();
  }
})();