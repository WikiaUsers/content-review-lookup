/* Daily Quests Board - Scoped Column Controller */
mw.hook('wikipage.content').add(function($content) {
    // Utilize .off() to prevent Fandom's lazy-loading from binding clicks multiple times
    $content.find('.pb-dot').off('click.quests').on('click.quests', function() {
        var $thisDot = $(this);
        var targetTier = $thisDot.attr('data-target-tier');
        
        if (!targetTier) return;

        // Locate the parent slot container to rigidly isolate the UI scope
        var $parentSlot = $thisDot.closest('.pb-slot-container');

        // Reset all dots in THIS specific column only, then activate the clicked one
        $parentSlot.find('.pb-dot').removeClass('active');
        $thisDot.addClass('active');

        // Hide all tier panels in THIS specific column only, then show the target
        $parentSlot.find('.pb-tier-panel').removeClass('active');
        $parentSlot.find('.pb-tier-panel[data-tier="' + targetTier + '"]').addClass('active');
    });
});


importScript('MediaWiki:List.js');


mw.loader.using(['jquery']).then(function () {
    if (mw.config.get('wgAction') !== 'view') return;

    // SFX remains in JS, as requested!
    const sfxUrl = 'https://static.wikitide.net/animeoverloadwiki/images/d/dd/SFX.mp3'; 

    // Pure HTML Skeleton. NO TEXT. NO IMAGES.
    const loadingHTML = `
        <div id="custom-loading-screen">
            <div class="loading-logo"></div>
            <div class="loading-text-wrapper">
                <span class="base-text"></span><span class="overload-highlight"></span>
            </div>
            <div class="icon-container">
                <div class="wave-icon icon-1"></div>
                <div class="wave-icon icon-2"></div>
                <div class="wave-icon icon-3"></div>
                <div class="wave-icon icon-4"></div>
                <div class="wave-icon icon-5"></div>
                <div class="wave-icon icon-6"></div>
                <div class="wave-icon icon-7"></div>
                <div class="wave-icon icon-8"></div>
                <div class="wave-icon icon-9"></div>
                <div class="wave-icon icon-10"></div>
                <div class="wave-icon icon-11"></div>
            </div>
        </div>
    `;

    $('body').append(loadingHTML);

    const popSound = new Audio(sfxUrl);
    popSound.volume = 0.5;

    // Nuclear Click Interceptor
    document.addEventListener('click', function(e) {
        
        const link = e.target.closest('a');
        if (!link) return;

        console.log("RADAR TRIGGERED! A link was clicked.");

        const targetUrl = link.getAttribute('href');
        const targetAttr = link.getAttribute('target');
        if (!targetUrl) return;

        const currentDomain = window.location.hostname;
        const isInternalLink = targetUrl.startsWith('/') || targetUrl.includes(currentDomain);
        const isAnchor = targetUrl.startsWith('#') || targetUrl.includes('javascript:');
        const isEditAction = targetUrl.includes('action=') || targetUrl.includes('diff=');
        const isNewTab = (targetAttr === '_blank');

        if (isInternalLink && !isAnchor && !isEditAction && !isNewTab) {
            
            console.log("CHECKS PASSED! Firing loading screen for URL: " + targetUrl);
            e.preventDefault(); 

            popSound.currentTime = 0; 
            popSound.play().catch(err => console.log("Audio blocked by browser restrictions"));

            $('#custom-loading-screen').addClass('show-loading'); 

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 2000); 
        }
    }, true); 
});

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