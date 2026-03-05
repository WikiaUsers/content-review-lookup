/* Any JavaScript here will be loaded for all users on every page load */
$(function () {
  // 1. Build the Search Box
  if ($('#search').length) {
    $('#search').html('<input id="searchInput" class="rsw-search" placeholder="Filter name..." style="padding: 8px; width: 250px; border-radius: 6px; border: 1px solid #444; background: #1a1a1a; color: white; font-size: 14px;">');
  }

// 2. Build the Rarity Dropdown Configuration
const filtersConfig = {
    rarity: { attr: 'rarity', options: [['','All Rarities'],['paradox','Paradox'],['secret','Secret'],['exclusive','Exclusive'],['mythic','Mythic'],['legendary','Legendary'],['epic','Epic'],['rare','Rare']] }
  };

  // 3. Inject the Dropdown Menu
  Object.entries(filtersConfig).forEach(([key, cfg]) => {
    const selectId = `sel-${key}`;
    if ($(`#filter-${key}`).length) {
      const html = `<select id="${selectId}" class="rsw-filter" style="padding: 8px; border-radius: 6px; background: #1a1a1a; color: white; border: 1px solid #444; font-size: 14px; cursor: pointer;">` +
        cfg.options.map(([val, label]) => `<option value="${val}">${label}</option>`).join('') +
        `</select>`;
      $(`#filter-${key}`).html(html);
    }
  });

  // 4. The Filtering Logic
  function filterItems () {
    const search = ($('#searchInput').val() || '').trim().toLowerCase();
    const activeRarity = $('#sel-rarity').val() || '';

    $('#itemList > div').each(function () {
      const $t = $(this);
      
      // Text Search
      const textOk = !search || ($t.attr('id') || '').toLowerCase().includes(search) || $t.text().toLowerCase().includes(search);
      
      // Rarity Filter
      const itemRarity = ($t.data('rarity') || '').toString().toLowerCase();
      const rarityOk = !activeRarity || itemRarity === activeRarity.toLowerCase();

      $t.toggle(textOk && rarityOk);
    });
  }

  // 5. Trigger filter when typing or clicking
  $(document).on('input change', '#searchInput, .rsw-filter', filterItems);
  
  // Run once on page load
  setTimeout(filterItems, 100); 
});