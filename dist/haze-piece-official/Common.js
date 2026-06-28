// Add this helper function at the top level of your script

$(document).ready(function () {
    // Isolated top timer logic
    function updateTopStockTimer() {
        const now = new Date();
        const utcMs = now.getTime();
        const cycle = 2 * 60 * 60 * 1000;
        let nextReset = Math.ceil(utcMs / cycle) * cycle;

        const currentHour = Math.floor(utcMs / (60 * 60 * 1000));
        const resetHour = Math.floor(nextReset / (60 * 60 * 1000));
        if (resetHour === currentHour) {
            nextReset += cycle;
        }

        const diff = nextReset - utcMs;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        $(".stock-timer").each(function () {
            this.innerHTML = "Next Stock Reset: " + hours + "h " + minutes + "m " + seconds + "s";
        });
    }
    updateTopStockTimer();
    setInterval(updateTopStockTimer, 1000);
});
/* changes before sword*/
(function($, mw) {
	
	function openAllItemsModal(itemType) {
    const isAccessory = itemType === 'Accessory';
    const dataset = isAccessory ? Accessories : Swords;
    const modalId = 'wiki-hud-modal';
    
    // Build the grid items dynamically using flex
    let listHtml = dataset.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#1c2127; padding:12px 15px; border-radius:6px; margin-bottom:8px; border-left:4px solid #fca311;">
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${getFandomImageUrl(item.image)}" width="45" style="border-radius:4px;" />
                <div>
                    <strong style="color:#ffffff; font-size:1.1em; display:block;">${item.name}</strong>
                    <span style="font-size:0.85em; color:${uiStyles.rarityColors[item.Rarity]};">${item.Rarity}</span>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:0.85em; color:#8a929a;">Source: ${item.source}</div>
                <div style="font-size:0.85em; color:#ffffff;">Level: ${item.level}</div>
            </div>
        </div>
    `).join('');

    // Modal structure
    let modalHtml = `
    <div id="${modalId}" class="hud-modal-overlay">
        <div class="hud-modal-content">
            <div class="hud-modal-header" style="display:flex; justify-content:space-between; padding-bottom:15px; border-bottom:1px solid #333; margin-bottom:15px;">
                <h2 style="color:#fca311; margin:0;">${itemType.toUpperCase()} ARCHIVE</h2>
                <button class="hud-modal-close" style="background:none; border:none; color:#fff; font-size:1.5em; cursor:pointer;">×</button>
            </div>
            <div class="hud-modal-scroll" style="max-height: 60vh; overflow-y: auto; padding-right:10px;">
                ${listHtml}
            </div>
        </div>
    </div>`;

    $('body').append(modalHtml);
    $('.hud-modal-close').on('click', function() { $('#' + modalId).remove(); });
}
	
    // Unified Catalogs
    const Accessories = [
        {name: 'Night Necklace', Rarity: 'Mythical', Sea: 3, image: 'Night_Necklace.png', level: '1200', source: 'Boss Drop', description: 'A mystical amulet humming with spiritual energy.'},
        {name: 'Abyssal Necklace', Rarity: 'Mythical', Sea: 3, image: 'Abyssal_Necklace.png', level: '1200', source: 'Boss Drop', description: 'A deeply cursed necklace recovered from the trenches.'},
        {name: 'Dominus Messor', Rarity: 'Mythical', Sea: 3, image: 'Dominus_Messor.png', level: '1200', source: 'Event Drop', description: 'The grand crown of the harvest reaper.'}
    ];

    const Swords = [
        {name: 'Dark Blade', Rarity: 'Mythical', Sea: 3, image: 'Dark_Blade.png', level: '1200', source: 'Mihawk', type: 'Sword', description: 'A blade forged in darkness. It absorbs the life force of its enemies.'},
        {name: 'Gryphon', Rarity: 'Legendary', Sea: 3, image: 'Gryphon.png', level: '1150', source: 'Gryphon', type: 'Katana', description: 'A pristine, elegant saber wielded by legendary sea captains.'},
        {name: 'Golden Staff V2', Rarity: 'Legendary', Sea: 3, image: 'Golden_Staff_V2.png', level: '1100', source: 'Heaven Trial', type: 'Greatsword', description: 'Upgraded staff flowing with static electricity charges.'},
        {name: 'Dual Dark Blade', Rarity: 'Epic', Sea: 3, image: 'Dual_Dark_Blade.png', level: '950', source: 'Dark Chest', type: 'Dual Blade', description: 'Twin blades reflecting ultimate dark energy.'},
        {name: 'Ace', Rarity: 'Legendary', Sea: 3, image: 'Ace.png', level: '900', source: 'Port City', type: 'Sword', description: 'A renowned cutlass prized for its swift, slashing motion.'},
        {name: 'Krampus', Rarity: 'Legendary', Sea: 2, image: 'Krampus.png', level: '850', source: 'Krampus Raid', type: 'Sword', description: 'A winter event blade adorned with chilling spikes.'},
        {name: 'Rengoku', Rarity: 'Epic', Sea: 2, image: 'Rengoku.png', level: '800', source: 'Demon Island', type: 'Katana', description: 'A burning katana imbued with deep crimson fire essence.'},
        {name: 'Frostbite', Rarity: 'Rare', Sea: 2, image: 'Frostbite.png', level: '650', source: 'Ice Castle', type: 'Sword', description: 'A frozen rapier that slows enemies down on impact.'},
        {name: 'Iron Blade', Rarity: 'Uncommon', Sea: 1, image: 'Iron_Blade.png', level: '1', source: 'Starter Island', type: 'Sword', description: 'A simple iron sword issued to novice adventurers.'},
        {name: 'Rusty Sword', Rarity: 'Common', Sea: 1, image: 'Rusty_Sword.png', level: '1', source: 'Starter Island', type: 'Sword', description: 'An old, oxidized blade left behind in safe zones.'}
    ];

    const uiStyles = {
        rarityColors: { 
            Mythical: '#ff3333', Legendary: '#ffac38', Epic: '#ab47bc', 
            Rare: '#2196f3', Uncommon: '#4caf50', Common: '#9e9e9e' 
        }
    };
    
    

    function getFandomImageUrl(filename) {
        return mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=Special:FilePath/' + encodeURIComponent(filename.replace(/ /g, '_'));
    }

    // Centrally managed state filters
    let filterStates = {
        Accessory: { sea: 'AllSeas', rarity: 'AllRarities', query: '' },
        Sword: { sea: 'AllSeasS', rarity: 'AllRaritiesS', type: 'AllTypes', query: '' }
    };

    let selectedItems = {
        Accessory: null,
        Sword: null
    };

    function processFilterAction(itemType, parentId) {
        const state = filterStates[itemType];
        const dataset = (itemType === 'Accessory') ? Accessories : Swords;

        const filtered = dataset.filter(item => {
            const matchesSea = (state.sea.includes('All') || item.Sea.toString() === state.sea);
            const matchesRarity = (state.rarity.includes('All') || item.Rarity === state.rarity);
            const matchesType = (itemType === 'Accessory' || state.type.includes('All') || item.type === state.type);
            const matchesSearch = item.name.toLowerCase().includes(state.query.toLowerCase());
            return matchesSea && matchesRarity && matchesType && matchesSearch;
        });

        if (selectedItems[itemType] && !filtered.some(i => i.name === selectedItems[itemType].name)) {
            selectedItems[itemType] = null;
        }

        renderHUDLayout(filtered, parentId, itemType, dataset);
    }

    function renderHUDLayout(data, parentId, itemType, fullDataset) {
        const $container = $(parentId);
        if (!$container.length) return;

        const isAccessory = itemType === 'Accessory';
        const state = filterStates[itemType];
        
        if (!selectedItems[itemType]) {
            selectedItems[itemType] = data.length > 0 ? data[0] : (isAccessory ? Accessories[0] : Swords[0]);
        }
        
        const featuredItem = selectedItems[itemType];
        const featuredColor = uiStyles.rarityColors[featuredItem.Rarity] || '#ff3333';

        // Sidebar content dynamic calculators
        let counts = { sea1: 0, sea2: 0, sea3: 0, sword: 0, katana: 0, great: 0, dual: 0 };
        fullDataset.forEach(i => {
            if (i.Sea === 1) counts.sea1++;
            if (i.Sea === 2) counts.sea2++;
            if (i.Sea === 3) counts.sea3++;
            if (!isAccessory) {
                if (i.type === 'Sword') counts.sword++;
                if (i.type === 'Katana') counts.katana++;
                if (i.type === 'Greatsword') counts.great++;
                if (i.type === 'Dual Blade') counts.dual++;
            }
        });

        let html = `
        <div class="wiki-hud-container">
            <div class="hud-featured-showcase" style="border: 1px solid ${featuredColor}44;">
                <div class="featured-left-graphic" style="background: radial-gradient(circle, ${featuredColor}25 0%, transparent 70%);">
                    <img src="${getFandomImageUrl(featuredItem.image)}" alt="${featuredItem.name}" />
                </div>
                <div class="featured-right-info">
                    <span class="featured-tag" style="background: ${featuredColor}22; color: ${featuredColor};">★ FEATURED ${itemType.toUpperCase()}</span>
                    <h2 style="color: ${featuredColor};">${featuredItem.name}</h2>
                    <span class="featured-rarity-label" style="color: ${featuredColor};">${featuredItem.Rarity} RANK</span>
                    <p class="featured-desc">${featuredItem.description}</p>
                    
                    <div class="featured-stats-row">
                        <div><span>📊 LEVEL</span><strong>${featuredItem.level}</strong></div>
                        <div><span>💀 DROPPED BY</span><strong>${featuredItem.source}</strong></div>
                        <div><span>📍 LOCATION</span><strong>${featuredItem.Sea === 1 ? 'First Sea' : featuredItem.Sea === 2 ? 'Second Sea' : 'Third Sea'}</strong></div>
                    </div>
                </div>
                <button class="hud-view-page-btn" onclick="window.location.href='/wiki/${encodeURIComponent(featuredItem.name)}'">VIEW PAGE</button>
            </div>

            <div class="hud-controls-filter-bar">
                <div class="filter-inputs-group">
                    <select class="hud-filter-trigger" data-field="sea">
                        <option value="${isAccessory ? 'AllSeas' : 'AllSeasS'}" ${state.sea.includes('All') ? 'selected' : ''}>All Seas</option>
                        <option value="1" ${state.sea === '1' ? 'selected' : ''}>First Sea</option>
                        <option value="2" ${state.sea === '2' ? 'selected' : ''}>Second Sea</option>
                        <option value="3" ${state.sea === '3' ? 'selected' : ''}>Third Sea</option>
                    </select>
                    <select class="hud-filter-trigger" data-field="rarity">
                        <option value="${isAccessory ? 'AllRarities' : 'AllRaritiesS'}" ${state.rarity.includes('All') ? 'selected' : ''}>All Rarities</option>
                        <option value="Mythical" ${state.rarity === 'Mythical' ? 'selected' : ''}>Mythical</option>
                        <option value="Legendary" ${state.rarity === 'Legendary' ? 'selected' : ''}>Legendary</option>
                        <option value="Epic" ${state.rarity === 'Epic' ? 'selected' : ''}>Epic</option>
                        <option value="Rare" ${state.rarity === 'Rare' ? 'selected' : ''}>Rare</option>
                        <option value="Uncommon" ${state.rarity === 'Uncommon' ? 'selected' : ''}>Uncommon</option>
                        <option value="Common" ${state.rarity === 'Common' ? 'selected' : ''}>Common</option>
                    </select>
                    ${!isAccessory ? `
                    <select class="hud-filter-trigger" data-field="type">
                        <option value="AllTypes" ${state.type === 'AllTypes' ? 'selected' : ''}>All Types</option>
                        <option value="Sword" ${state.type === 'Sword' ? 'selected' : ''}>Sword</option>
                        <option value="Katana" ${state.type === 'Katana' ? 'selected' : ''}>Katana</option>
                        <option value="Greatsword" ${state.type === 'Greatsword' ? 'selected' : ''}>Greatsword</option>
                        <option value="Dual Blade" ${state.type === 'Dual Blade' ? 'selected' : ''}>Dual Blade</option>
                    </select>` : ''}
                    <div class="hud-search-box-wrapper">
                        <input type="text" class="hud-search-trigger" placeholder="Search ${itemType.toLowerCase()}s..." value="${state.query}">
                        <span class="hud-search-icon">🔍</span>
                    </div>
                </div>
                <div class="results-counter-hud">Found ${data.length} ${itemType.toLowerCase()}s</div>
            </div>

            <div class="hud-main-split">
                <div class="hud-left-grid-column">
        `;

        if (data.length === 0) {
            html += `<p class="hud-no-results-msg">No entries found matching your criteria.</p>`;
        } else {
            html += data.map(item => {
                const color = uiStyles.rarityColors[item.Rarity] || '#9e9e9e';
                const isSelected = item.name === featuredItem.name;
                
                return `
                <div class="hud-item-card ${isSelected ? 'active-hud-selection' : ''}" data-name="${encodeURIComponent(item.name)}" style="border: 1px solid ${isSelected ? color : color + '44'}; background-color: ${isSelected ? '#171923' : '#12141c'};">
                    <div class="card-header-tier">
                        <span style="color: ${color};">★ ${item.Rarity.toUpperCase()}</span>
                        <span class="card-star-fav">${isSelected ? '★' : '☆'}</span>
                    </div>
                    <div class="card-image-wrap">
                        <img src="${getFandomImageUrl(item.image)}" alt="${item.name}" />
                    </div>
                    <div class="card-item-title">${item.name}</div>
                    <div class="card-footer-stats">
                        <span>📊 ${item.level}</span>
                        <span>💀 ${item.source}</span>
                    </div>
                </div>
                `;
            }).join('');
        }

        html += `
                </div>

                <div class="hud-right-sidebar-column">
                    <div class="sidebar-widget">
                        <h3>RARITY GUIDE</h3>
                        <div class="widget-row"><span style="color:#ff3333; font-weight:bold;">Mythical</span><span>5%</span></div>
                        <div class="widget-row"><span style="color:#ffac38; font-weight:bold;">Legendary</span><span>15%</span></div>
                        <div class="widget-row"><span style="color:#ab47bc; font-weight:bold;">Epic</span><span>25%</span></div>
                        <div class="widget-row"><span style="color:#2196f3; font-weight:bold;">Rare</span><span>30%</span></div>
                        <div class="widget-row"><span style="color:#4caf50; font-weight:bold;">Uncommon</span><span>20%</span></div>
                        <div class="widget-row"><span style="color:#9e9e9e; font-weight:bold;">Common</span><span>5%</span></div>
                    </div>

                    <div class="sidebar-widget">
                        <h3>SEAS</h3>
                        <div class="widget-row"><span>🌐 First Sea</span><strong>${counts.sea1}</strong></div>
                        <div class="widget-row"><span>🌐 Second Sea</span><strong>${counts.sea2}</strong></div>
                        <div class="widget-row"><span>🌐 Third Sea</span><strong>${counts.sea3}</strong></div>
                    </div>

                    ${!isAccessory ? `
                    <div class="sidebar-widget">
                        <h3>TYPES</h3>
                        <div class="widget-row"><span>⚔️ Sword</span><strong>${counts.sword}</strong></div>
                        <div class="widget-row"><span>⚔️ Katana</span><strong>${counts.katana}</strong></div>
                        <div class="widget-row"><span>⚔️ Greatsword</span><strong>${counts.great}</strong></div>
                        <div class="widget-row"><span>⚔️ Dual Blade</span><strong>${counts.dual}</strong></div>
                    </div>` : ''}
					<button class="hud-sidebar-action-footer-btn open-modal-trigger" data-type="${itemType}">
    				⚔️ VIEW ALL ${itemType.toUpperCase()}S
					</button>
                </div>
            </div>
        </div>
        `;

        $container.html(html);

        const $input = $container.find('.hud-search-trigger');
        if ($input.length && state.query) {
            const el = $input[0];
            el.focus();
            const len = el.value.length;
            el.setSelectionRange(len, len);
        }
    }

    mw.hook('wikipage.content').add(function($content) {
        const $accDiv = $content.find('#accessoriesBackground');
        const $swdDiv = $content.find('#swordsBackground');
        const $titleDiv = $content.find('#titles-wiki-app-root'); // Add this
        
        if ($titleDiv.length) {
        // You would need to add logic here to render your content 
        // into #titles-wiki-app-root
        console.log("Titles app root found!");
		 }

        if ($accDiv.length) {
            $accDiv.css({"background":"none","border":"none","padding":"0"});
            
            $accDiv.off('change', '.hud-filter-trigger').on('change', '.hud-filter-trigger', function() {
                filterStates.Accessory[$(this).data('field')] = $(this).val();
                processFilterAction('Accessory', '#accessoriesBackground');
            });
            $accDiv.off('input', '.hud-search-trigger').on('input', '.hud-search-trigger', function() {
                filterStates.Accessory.query = $(this).val();
                processFilterAction('Accessory', '#accessoriesBackground');
            });
            $accDiv.off('click', '.hud-item-card').on('click', '.hud-item-card', function() {
                const targetName = decodeURIComponent($(this).data('name'));
                selectedItems.Accessory = Accessories.find(i => i.name === targetName);
                processFilterAction('Accessory', '#accessoriesBackground');
            });

            processFilterAction('Accessory', '#accessoriesBackground');
        }

        if ($swdDiv.length) {
            $swdDiv.css({"background":"none","border":"none","padding":"0"});

            $swdDiv.off('change', '.hud-filter-trigger').on('change', '.hud-filter-trigger', function() {
                filterStates.Sword[$(this).data('field')] = $(this).val();
                processFilterAction('Sword', '#swordsBackground');
            });
            $swdDiv.off('input', '.hud-search-trigger').on('input', '.hud-search-trigger', function() {
                filterStates.Sword.query = $(this).val();
                processFilterAction('Sword', '#swordsBackground');
            });
            $swdDiv.off('click', '.hud-item-card').on('click', '.hud-item-card', function() {
                const targetName = decodeURIComponent($(this).data('name'));
                selectedItems.Sword = Swords.find(i => i.name === targetName);
                processFilterAction('Sword', '#swordsBackground');
            });

            processFilterAction('Sword', '#swordsBackground');
        }
    });
  // Updated Listener with Debugging
$(document).on('click', '.open-modal-trigger', function(e) {
    e.preventDefault(); // Stop any default link behavior
    
    const itemType = $(this).data('type');
    console.log("Trigger clicked for:", itemType); // Check console for this
    
    const dataset = (itemType === 'Accessory') ? Accessories : Swords;
    
    if (typeof openAllItemsModal === 'function') {
        openAllItemsModal(itemType, dataset);
        console.log("Modal function called");
    } else {
        console.error("openAllItemsModal is not defined!");
    }
});
})(window.jQuery, window.mediaWiki);
/*AFTER SWORD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/* -------------------------------------------------------------------------------------TITLES -----------------------------------------------------------------------------------------------*/

$(document).ready(function () {
    // Only execute if our target canvas app root exists on the current page
    if (!$('#titles-wiki-app-root').length) return;

    // --- FULL DATA ARCHIVE FROM WIKI DOCUMENTATION ---
    const titlesData = [
        // Level
        { title: "Sailor", color: "Pastel Yellow", category: "Level", hex: "#ffd166", desc: "Reach Level 500", req: "Obtain 10 Titles", progress: "0 / 500", locked: false },
        { title: "Explorer", color: "Brown", category: "Level", hex: "#b5835a", desc: "Reach Level 1,000", req: "Obtain 20 Titles", progress: "0 / 1000", locked: false },
        { title: "Voyager", color: "Light Purple", category: "Level", hex: "#c8b6ff", desc: "Reach Level 2,000", req: "Obtain 30 Titles", progress: "0 / 2000", locked: false },
        { title: "Bold", color: "Gray", category: "Level", hex: "#adb5bd", desc: "Reach Level 3,000", req: "Obtain 40 Titles", progress: "0 / 3000", locked: false },
        { title: "Pioneer", color: "Orange", category: "Level", hex: "#f77f00", desc: "Reach Level 4,000", req: "Obtain 50 Titles", progress: "0 / 4000", locked: false },

        // Collector
        { title: "P2W", color: "Pastel Yellow", category: "Collector", hex: "#ffd166", desc: "Own 5+ gamepasses", req: "Obtain 10 Titles", progress: "0 / 5", locked: false },
        { title: "Gift Collector", color: "Brown", category: "Collector", hex: "#b5835a", desc: "Collect the final gift in playtime rewards", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Sword Collector", color: "Light Purple", category: "Collector", hex: "#c8b6ff", desc: "Collect 20 swords", req: "Obtain 30 Titles", progress: "0 / 20", locked: false },
        { title: "Doughnut Collector", color: "Gray", category: "Collector", hex: "#adb5bd", desc: "Have 50 Doughnuts in your inventory", req: "Obtain 40 Titles", progress: "0 / 50", locked: false },
        { title: "Accessory Collector", color: "Orange", category: "Collector", hex: "#f77f00", desc: "Collect at least 23 accessories", req: "Obtain 50 Titles", progress: "0 / 23", locked: false },
        { title: "Title Collector", color: "Pastel Yellow", category: "Collector", hex: "#ffd166", desc: "Collect at least 20 titles", req: "Obtain 10 Titles", progress: "0 / 20", locked: false },
        { title: "Colorbearer", color: "Brown", category: "Collector", hex: "#b5835a", desc: "Unlock a Haki Color!", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Aura Seeker", color: "Light Purple", category: "Collector", hex: "#c8b6ff", desc: "Unlock 12 Haki Colors!", req: "Obtain 30 Titles", progress: "0 / 12", locked: false },
        { title: "LGBTQ", color: "Green", category: "Collector", hex: "#2ec4b6", desc: "Collect at least 100 titles", req: "Obtain 100 Titles", progress: "0 / 100", locked: false },
        { title: "Bearer of Dark Pacts", color: "Mint", category: "Collector", hex: "#99eedf", desc: "Obtain demon spawner", req: "Obtain 60 Titles", progress: "0 / 1", locked: false },
        { title: "Scale Hunter", color: "Yellow", category: "Collector", hex: "#ffeb3b", desc: "Roll for 5 dragon skins", req: "Obtain 70 Titles", progress: "0 / 5", locked: false },
        { title: "The Chromatic Dragon", color: "Deep Purple", category: "Collector", hex: "#7209b7", desc: "Roll for 20 dragon skins", req: "Obtain 80 Titles", progress: "0 / 20", locked: false },

        // Unlock
        { title: "D. Clan", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock D. Clan race", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Adventurer", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Unlock Sea 2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Gear 4th!", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Awaken G4", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Joyboy", color: "Red", category: "Unlock", hex: "#ef476f", desc: "Awaken G5 completely", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },
        { title: "Fleshbound", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock Human V2", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Feral", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Unlock Beastborne V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Tideborn", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Unlock Fishborne V2", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Celestial", color: "Gray", category: "Unlock", hex: "#adb5bd", desc: "Unlock Skyborne V2", req: "Obtain 40 Titles", progress: "0 / 1", locked: false },
        { title: "Shadowborn", color: "Orange", category: "Unlock", hex: "#f77f00", desc: "Unlock Demon V2", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Dragonkin", color: "Mint", category: "Unlock", hex: "#99eedf", desc: "Unlock Dragonborne V2", req: "Obtain 60 Titles", progress: "0 / 1", locked: false },
        { title: "Guardian Of Humanity", color: "Yellow", category: "Unlock", hex: "#ffeb3b", desc: "Unlock D.Clan V2", req: "Obtain 70 Titles", progress: "0 / 1", locked: false },
        { title: "The Uncharted", color: "Deep Purple", category: "Unlock", hex: "#7209b7", desc: "Unlock Sea 3", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Edge Sovereign", color: "Blue", category: "Unlock", hex: "#4361ee", desc: "Reach Max Mastery (Level 500) on any Sword.", req: "Obtain 90 Titles", progress: "0 / 500", locked: false },
        { title: "Archon of Power", color: "Green", category: "Unlock", hex: "#2ec4b6", desc: "Reach Max Mastery (Level 500) on any Fruit.", req: "Obtain 100 Titles", progress: "0 / 500", locked: false },
        { title: "Supreme Brawler", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Reach Max Mastery (Level 500) on any Fighting Style.", req: "Obtain 10 Titles", progress: "0 / 500", locked: false },
        { title: "Avatar of Combat", color: "Red", category: "Unlock", hex: "#ef476f", desc: "Reach Max Mastery on at least 5 Fighting Styles.", req: "Obtain 110 Titles", progress: "0 / 5", locked: false },
        { title: "Warlord of Blades", color: "Pink", category: "Unlock", hex: "#ff0a54", desc: "Reach Max Mastery on at least 5 Swords.", req: "Obtain 120 Titles", progress: "0 / 5", locked: false },
        { title: "Harbinger of Power", color: "Black", category: "Unlock", hex: "#1e1e24", desc: "Reach Max Mastery on at least 5 Fruits.", req: "Obtain 130 Titles", progress: "0 / 5", locked: false },
        { title: "Thunderlord", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Unlock Electro V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Steel Titan", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Unlock Cyborg V2", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Tidal Striker", color: "Gray", category: "Unlock", hex: "#adb5bd", desc: "Unlock Fishman V2", req: "Obtain 40 Titles", progress: "0 / 1", locked: false },
        { title: "Leg of Fury", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock Black Leg V2", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dragonic Master", color: "Orange", category: "Unlock", hex: "#f77f00", desc: "Unlock Dragon Claw V2", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Master of the Styles", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Unlock 5 Fighting Styles", req: "Obtain 10 Titles", progress: "0 / 5", locked: false },
        { title: "Grandmaster of the Styles", color: "Mint", category: "Unlock", hex: "#99eedf", desc: "Evolve 5 Fighting Styles to V2", req: "Obtain 60 Titles", progress: "0 / 5", locked: false },
        { title: "The One Who Found Him", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Find and make a deal with the traveling merchant", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Black Market Hunter", color: "Yellow", category: "Unlock", hex: "#ffeb3b", desc: "Find and make a deal 10 times with the traveling merchant", req: "Obtain 70 Titles", progress: "0 / 10", locked: false },
        { title: "Touched the Forge", color: "Brown", category: "Unlock", hex: "#b5835a", desc: "Craft 5 things from Doran the Forge", req: "Obtain 20 Titles", progress: "0 / 5", locked: false },
        { title: "First Ascension", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Awaken at least one skill of any fruit", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Master of Ascension", color: "Deep Purple", category: "Unlock", hex: "#7209b7", desc: "Awaken at least 4 fruits entirely", req: "Obtain 80 Titles", progress: "0 / 4", locked: false },
        { title: "Dragon Scales", color: "Blue", category: "Unlock", hex: "#4361ee", desc: "Awaken Dragon Hybrid entirely", req: "Obtain 90 Titles", progress: "0 / 1", locked: false },
        { title: "Gear Second!", color: "Pastel Yellow", category: "Unlock", hex: "#ffd166", desc: "Awaken Gear 2nd for Gum fruit", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "God Of Thunder", color: "Light Purple", category: "Unlock", hex: "#c8b6ff", desc: "Awaken Electricity Fruit entirely", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },

        // Money
        { title: "Non-Brokey", color: "Pastel Yellow", category: "Money", hex: "#ffd166", desc: "Have 5M$+", req: "Obtain 10 Titles", progress: "0 / 5M", locked: false },
        { title: "RICH", color: "Gray", category: "Money", hex: "#adb5bd", desc: "Have 10M$+", req: "Obtain 40 Titles", progress: "0 / 10M", locked: false },
        { title: "RICHEST", color: "Deep Purple", category: "Money", hex: "#7209b7", desc: "Have 50M$+", req: "Obtain 80 Titles", progress: "0 / 50M", locked: false },

        // Bounty
        { title: "Bounty Hunter", color: "Pastel Yellow", category: "Bounty", hex: "#ffd166", desc: "Gain 1M+ Bounty", req: "Obtain 10 Titles", progress: "0 / 1M", locked: false },
        { title: "Sea Tyrant", color: "Light Purple", category: "Bounty", hex: "#c8b6ff", desc: "Gain 3M+ Bounty", req: "Obtain 30 Titles", progress: "0 / 3M", locked: false },
        { title: "Sea Warlord", color: "Yellow", category: "Bounty", hex: "#ffeb3b", desc: "Gain 10M+ Bounty", req: "Obtain 70 Titles", progress: "0 / 10M", locked: false },
        { title: "Sea Emperor", color: "Red", category: "Bounty", hex: "#ef476f", desc: "Gain 20M+ Bounty", req: "Obtain 110 Titles", progress: "0 / 20M", locked: false },

        // Kills
        { title: "Beast Slayer", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Defeat a Sea Beast", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dragon Slayer", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat the Dragon Boss", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Beast Overlord", color: "Orange", category: "Kills", hex: "#f77f00", desc: "Defeat 50 Sea Beasts", req: "Obtain 50 Titles", progress: "0 / 50", locked: false },
        { title: "Strong Swordsman", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat the Dark Blade Boss", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Dough Slayer", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Defeat the Dough Boss", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dreadful Shogun", color: "Gray", category: "Kills", hex: "#adb5bd", desc: "Defeat the Enma Boss", req: "Obtain 40 Titles", progress: "0 / 1", locked: false },
        { title: "Flame Fist", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat Fire Fist boss once", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Earthshaker", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat Tremor Girl", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Bonebreaker", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Defeat Mace Boss in Sea 1", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Bladebreaker", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat Dual Swordsman once", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Fallen Challenger", color: "Orange", category: "Kills", hex: "#f77f00", desc: "Die to any superboss", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Subjugated", color: "Pastel Yellow", category: "Kills", hex: "#ffd166", desc: "Die to any island boss", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Phantom Hunter", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat 1 Ghost Ship", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Reaper of Lost Souls", color: "Yellow", category: "Kills", hex: "#ffeb3b", desc: "Defeat 10 Ghost Ships", req: "Obtain 70 Titles", progress: "0 / 10", locked: false },
        { title: "Hybrid Slayer", color: "Brown", category: "Kills", hex: "#b5835a", desc: "Defeat dragon hybrid boss", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "God's Judgement", color: "Light Purple", category: "Kills", hex: "#c8b6ff", desc: "Defeat Raijin Boss", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Authority Denied", color: "Orange", category: "Kills", hex: "#f77f00", desc: "Defeat Saturn Boss", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Dominion Over Red", color: "Green", category: "Kills", hex: "#2ec4b6", desc: "Defeat Red Emperor", req: "Obtain 100 Titles", progress: "0 / 1", locked: false },
        { title: "Slayer of the Abyss", color: "Deep Purple", category: "Kills", hex: "#7209b7", desc: "Defeat Cthulhu", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Emperor of the Abyss", color: "Red", category: "Kills", hex: "#ef476f", desc: "Defeat Cthulhu 10 times", req: "Obtain 110 Titles", progress: "0 / 10", locked: false },

        // Death
        { title: "Disgrace", color: "Pastel Yellow", category: "Death", hex: "#ffd166", desc: "Die to a Boss", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Dishonored", color: "Orange", category: "Death", hex: "#f77f00", desc: "Die to a Super Boss", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },

        // PVP
        { title: "Demonitizator", color: "Orange", category: "PVP", hex: "#f77f00", desc: "Defeat a Player with Content Creator title", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Admin Slayer", color: "Red", category: "PVP", hex: "#ef476f", desc: "Defeat a developer or staff", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },
        { title: "Ruthless", color: "Pastel Yellow", category: "PVP", hex: "#ffd166", desc: "Have 10 player kills", req: "Obtain 10 Titles", progress: "0 / 10", locked: false },
        { title: "PKer", color: "Deep Purple", category: "PVP", hex: "#7209b7", desc: "Have 200 player kills!", req: "Obtain 80 Titles", progress: "0 / 200", locked: false },

        // Fishing
        { title: "Fisherman", color: "Pastel Yellow", category: "Fishing", hex: "#ffd166", desc: "Catch 100 Fishes", req: "Obtain 10 Titles", progress: "0 / 100", locked: false },
        { title: "Mythical Fisher", color: "Red", category: "Fishing", hex: "#ef476f", desc: "Catch a Mythical Fish", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },

        // Playtime
        { title: "Dedicated", color: "Light Purple", category: "Playtime", hex: "#c8b6ff", desc: "Have 100 hours playtime on Haze Seas", req: "Obtain 30 Titles", progress: "0 / 100h", locked: false },
        { title: "No-Life", color: "Red", category: "Playtime", hex: "#ef476f", desc: "Have 1,000 hours playtime on Haze Seas", req: "Obtain 110 Titles", progress: "0 / 1000h", locked: false },

        // Gems
        { title: "Gem Collector", color: "Pastel Yellow", category: "Gems", hex: "#ffd166", desc: "Have 1,000 Gems", req: "Obtain 10 Titles", progress: "0 / 1000", locked: false },
        { title: "Gem Hoarder", color: "Deep Purple", category: "Gems", hex: "#7209b7", desc: "Have 10,000 Gems", req: "Obtain 80 Titles", progress: "0 / 10000", locked: false },

        // Trade
        { title: "Trader", color: "Pastel Yellow", category: "Trade", hex: "#ffd166", desc: "Complete a trade atleast once", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "The Trader", color: "Green", category: "Trade", hex: "#2ec4b6", desc: "Complete 100 trades successfully", req: "Obtain 100 Titles", progress: "0 / 100", locked: false },

        // Event
        { title: "Winter 2023", color: "Light Purple", category: "Event", hex: "#c8b6ff", desc: "Played the 2023 XMAS Event", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },

        // Achievement
        { title: "Pirate King", color: "Red", category: "Achievement", hex: "#ef476f", desc: "Be in a crew on the Top 10", req: "Obtain 110 Titles", progress: "0 / 1", locked: false },
        { title: "Realm Of Mythics", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Eat or use a mythical fruit atleast once.", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Gambler", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Spin for a fruit 10 times", req: "Obtain 10 Titles", progress: "0 / 10", locked: false },
        { title: "Lucky Gambler", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Spin a Mythical once", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Venom Dweller", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Have Venom Crown being a Venom Fruit User", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Shrine Plunderer", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Deal atleast 10% damage to shrine chest!", req: "Obtain 10 Titles", progress: "0 / 10%", locked: false },
        { title: "Shrine Conqueror", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Destroy 20 shrine chests!", req: "Obtain 20 Titles", progress: "0 / 20", locked: false },
        { title: "Relic Raider", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Destroy 100 shrine chests!", req: "Obtain 80 Titles", progress: "0 / 100", locked: false },
        { title: "Quest Master", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Complete all infinite quests!", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Mission Accomplished", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Complete all daily quests!", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Rogue", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Hunt 1 player successfully!", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Predator", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Hunt 10 player successfully!", req: "Obtain 20 Titles", progress: "0 / 10", locked: false },
        { title: "Bloodhound", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Hunt 50 player successfully!", req: "Obtain 50 Titles", progress: "0 / 50", locked: false },
        { title: "Apex Predator", color: "Blue", category: "Achievement", hex: "#4361ee", desc: "Hunt 500 player successfully!", req: "Obtain 90 Titles", progress: "0 / 500", locked: false },
        { title: "Prismatic Keymaster", color: "Prismatic", category: "Achievement", hex: "#ff758f", desc: "Unlock the Rainbow Haki!", req: "Forged by Doran", progress: "0 / 1", locked: false },
        { title: "Marine Officer", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Obtain 1M reputation", req: "Obtain 10 Titles", progress: "0 / 1M", locked: false },
        { title: "Marine Captain", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Obtain 3M reputation", req: "Obtain 20 Titles", progress: "0 / 3M", locked: false },
        { title: "Marine Admiral", color: "Yellow", category: "Achievement", hex: "#ffeb3b", desc: "Obtain 10M reputation", req: "Obtain 70 Titles", progress: "0 / 10M", locked: false },
        { title: "Fleet Admiral", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain 20M reputation", req: "Obtain 120 Titles", progress: "0 / 20M", locked: false },
        { title: "Clairvoyant", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Have observation level 1", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "The All-Seeing", color: "Mint", category: "Achievement", hex: "#99eedf", desc: "Obtain observation level 6", req: "Obtain 60 Titles", progress: "0 / 6", locked: false },
        { title: "Ultra Instinct", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Have the ultra instinct skin", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Void-Forged Arms", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Upgrade Armament Haki to level 5", req: "Obtain 50 Titles", progress: "0 / 5", locked: false },
        { title: "Revisiting Memories", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Replay the cutscene by speaking to the fisherman in sea 1", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Vaultbreaker", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Open 25 Chests", req: "Obtain 20 Titles", progress: "0 / 25", locked: false },
        { title: "Treasure Hunter", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Open 250 Chests", req: "Obtain 80 Titles", progress: "0 / 250", locked: false },
        { title: "Chosen of Fate", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Open a Mythical Chest", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Lured by Loot", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Open a Mimic Chest", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "King's Fortune", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain the Ace sword from a quest reward", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Midnight Executioner", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Obtain Dark Blade V2", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Bearer of the Eternal Night", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain Dual Dark Blade", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Trinity Ascendant", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain 3 Sword Style", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Triple Blade Demon", color: "Orange", category: "Achievement", hex: "#f77f00", desc: "Obtain 3 Sword Style V2", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "The Skullcrusher", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Obtain Mace V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Ocean's Wrath", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain SeaBeast Hammer V2", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "The Groundsplitter", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Obtain Bisento V2", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Swords of Balance", color: "Brown", category: "Achievement", hex: "#b5835a", desc: "Obtain 2 Sword Style V2", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Vanquisher's Edge", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain Gryphon", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Swift Windcutter", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain Zenith", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Earned, Not Bought", color: "Pastel Yellow", category: "Achievement", hex: "#ffd166", desc: "Obtain Dark Blade without paying Robux", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Ghastly Aura", color: "Light Purple", category: "Achievement", hex: "#c8b6ff", desc: "Obtain the Ghastly Haki color from a Ghost Ship chest", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Knight of the Stagnant Abyss", color: "Deep Purple", category: "Achievement", hex: "#7209b7", desc: "Deal the most damage to Cthulhu", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Bearer of the Abyss", color: "Pink", category: "Achievement", hex: "#ff0a54", desc: "Obtain the Abyssal Haki color", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },

        // Regular
        { title: "Swiftstep", color: "Pastel Yellow", category: "Regular", hex: "#ffd166", desc: "Unlock flashstep", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Race Reborn", color: "Brown", category: "Regular", hex: "#b5835a", desc: "Purchase any race spins for gems", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Attribute Strategist", color: "Light Purple", category: "Regular", hex: "#c8b6ff", desc: "Purchase a stat refund for gems", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },
        { title: "Fruitless Soul", color: "Deep Purple", category: "Regular", hex: "#7209b7", desc: "Purchase a fruit reset for gems", req: "Obtain 80 Titles", progress: "0 / 1", locked: false },
        { title: "Title Hoarder", color: "Orange", category: "Regular", hex: "#f77f00", desc: "Collect at least 80 titles", req: "Obtain 50 Titles", progress: "0 / 80", locked: false },
        { title: "Devil's Luck", color: "Pink", category: "Regular", hex: "#ff0a54", desc: "Find and pick up a fruit that spawned naturally", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Treasure Dealer", color: "Pastel Yellow", category: "Regular", hex: "#ffd166", desc: "Purchase a fruit for $ from the fruit stock", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Windwalker", color: "Brown", category: "Regular", hex: "#b5835a", desc: "Obtain level 1 skywalk", req: "Obtain 20 Titles", progress: "0 / 1", locked: false },
        { title: "Despaired", color: "Orange", category: "Regular", hex: "#f77f00", desc: "Die with a fruit in your toolbar", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },
        { title: "Ironfist", color: "Light Purple", category: "Regular", hex: "#c8b6ff", desc: "Unlock level 1 buso", req: "Obtain 30 Titles", progress: "0 / 1", locked: false },

        // Shrine
        { title: "The MVP", color: "Pink", category: "Shrine", hex: "#ff0a54", desc: "Get a fruit from the shrine raid (meaning you did the most damage)", req: "Obtain 120 Titles", progress: "0 / 1", locked: false },
        { title: "Shrine Plunderer", color: "Pastel Yellow", category: "Shrine", hex: "#ffd166", desc: "defeat 1 shrine", req: "Obtain 10 Titles", progress: "0 / 1", locked: false },
        { title: "Shrine Conqueror", color: "Brown", category: "Shrine", hex: "#b5835a", desc: "defeat 20 shrines", req: "Obtain 20 Titles", progress: "0 / 20", locked: false },
        { title: "Relic Raider", color: "Deep Purple", category: "Shrine", hex: "#7209b7", desc: "defeat 100 shrines", req: "Obtain 80 Titles", progress: "0 / 100", locked: false },
        { title: "Drowned", color: "Orange", category: "Shrine", hex: "#f77f00", desc: "Die to shrine by drowning", req: "Obtain 50 Titles", progress: "0 / 1", locked: false },

        // Role
        { title: "VIP", color: "Pastel Yellow", category: "Role", hex: "#ffd166", desc: "Own the VIP Gamepass!", req: "Obtain 10 Titles", progress: "1 / 1", locked: false },
        { title: "Tester", color: "Light Purple", category: "Role", hex: "#c8b6ff", desc: "Be a Tester!", req: "Obtain 30 Titles", progress: "1 / 1", locked: false },
        { title: "Content Creator", color: "Deep Purple", category: "Role", hex: "#7209b7", desc: "Be a Content Creator!", req: "Obtain 80 Titles", progress: "1 / 1", locked: false },
        { title: "Staff", color: "Locked", category: "Role", hex: "#4a525a", desc: "Be a Staff for Haze Studios!", req: "Secret Authority Rank", progress: "0 / 1", locked: true },
        { title: "DEV", color: "Locked", category: "Role", hex: "#4a525a", desc: "Get back to work!", req: "Lead Systems Developer", progress: "0 / 1", locked: true }
    ];

    // --- PAGINATION STATE VARIABLES ---
    let currentPage = 1;
    const itemsPerPage = 12; // Adjust this number if you want more/less cards per page
    let currentFilteredData = titlesData;

    // --- MAIN CORE FRAMEWORK APP STRUCTURE INJECTION ---
    let mainLayoutHtml = `
    <div class="titles-dashboard">
        <center><h1 style="margin-top:0;">Titles</h1></center>
        <p style="color: #8a929a; margin-bottom: 25px; text-align: center;">Complete challenges and earn unique titles to show off your journey across Haze Seas.</p>

        <div class="titles-section-banner" style="color: #ffffff;">Title Colors</div>
        <div class="title-colors-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 30px;">
            <div class="color-progress-card" style="border: 1px solid #ffd166; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Pastel Yellow</h4><div style="font-size:0.75em; color:#8a929a;">10 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #b5835a; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Brown</h4><div style="font-size:0.75em; color:#8a929a;">20 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #c8b6ff; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Light Purple</h4><div style="font-size:0.75em; color:#8a929a;">30 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #adb5bd; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Gray</h4><div style="font-size:0.75em; color:#8a929a;">40 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #f77f00; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Orange</h4><div style="font-size:0.75em; color:#8a929a;">50 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #99eedf; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Mint</h4><div style="font-size:0.75em; color:#8a929a;">60 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ffeb3b; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Yellow</h4><div style="font-size:0.75em; color:#8a929a;">70 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #7209b7; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Deep Purple</h4><div style="font-size:0.75em; color:#8a929a;">80 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #4361ee; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Blue</h4><div style="font-size:0.75em; color:#8a929a;">90 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #2ec4b6; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Green</h4><div style="font-size:0.75em; color:#8a929a;">100 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ef476f; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Red</h4><div style="font-size:0.75em; color:#8a929a;">110 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ff0a54; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Pink</h4><div style="font-size:0.75em; color:#8a929a;">120 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #1e1e24; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Black</h4><div style="font-size:0.75em; color:#8a929a;">130 Titles</div></div>
            <div class="color-progress-card" style="border: 1px solid #ff758f; padding: 10px; border-radius: 6px; background: #1c2127;"><h4>★ Prismatic</h4><div style="font-size:0.75em; color:#fca311;">Forge: Doran</div></div>
        </div>

        <div class="titles-section-banner" style="color: #ffffff;">Title List</div>
        <div class="titles-main-content">
            <div class="titles-left-side">
                <div class="filter-bar">
                    <select class="filter-select" id="filter-color-dropdown"></select>
                    <select class="filter-select" id="filter-category-dropdown"></select>
                    <span id="titles-counter-display" style="margin-left: auto; color:#8a929a; font-size:0.9em;">Found ${titlesData.length} titles</span>
                </div>
                
                <div class="titles-grid" id="titles-grid-hook"></div>
                
                <!-- NEW PAGINATION CONTROLS -->
                <div class="pagination-controls" style="display: flex; justify-content: center; gap: 15px; margin-top: 25px; align-items: center; background: #1c2127; padding: 10px; border-radius: 8px;">
                    <button id="prev-page-btn" style="background: #2c3239; color: #fff; border: 1px solid #4a525a; padding: 8px 20px; border-radius: 4px; cursor: pointer; transition: 0.2s;">⬅ Previous</button>
                    <span id="page-indicator" style="color: #ffffff; font-weight: bold; font-size: 1.1em;">Page 1 / 1</span>
                    <button id="next-page-btn" style="background: #2c3239; color: #fff; border: 1px solid #4a525a; padding: 8px 20px; border-radius: 4px; cursor: pointer; transition: 0.2s;">Next ➡</button>
                </div>

            </div>
            <div class="titles-sidebar" id="titles-sidebar-hook"></div>
        </div>

        <div class="info-footer-banner">
            <span style="color:#fca311; font-size:1.3em;">ⓘ</span>
            <div>Titles not only show off your achievements, but some may unlock special perks in the future!</div>
        </div>
    </div>

    <!-- FULL SCREEN INTERACTIVE MODAL OVERLAY -->
    <div id="titles-popup-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:99999; justify-content:center; align-items:center; font-family:sans-serif;">
        <div style="background:#13171c; width:95%; max-width:700px; border:2px solid #fca311; border-radius:8px; padding:25px; max-height:85vh; overflow-y:auto; position:relative; box-shadow: 0px 0px 20px rgba(252,163,17,0.3);">
            <span id="close-titles-popup" style="position:absolute; top:12px; right:20px; color:#8a929a; font-size:28px; cursor:pointer; font-weight:bold;">&times;</span>
            <h2 style="color:#ffffff; margin-top:0; border-bottom:1px solid #222831; padding-bottom:12px; font-size:1.5em;">All Available Titles Master List</h2>
            <div id="popup-list-content-hook" style="display:flex; flex-direction:column; gap:12px; margin-top:15px;"></div>
        </div>
    </div>`;

    $('#titles-wiki-app-root').html(mainLayoutHtml);

    // --- GENERATE ALL AVAILABLE DROP DOWN SELECT TARGET FILTERS ---
    let uniqueColors = new Set(['All Colors']);
    let uniqueCategories = new Set(['All Categories']);
    titlesData.forEach(item => {
        if (!item.locked) uniqueColors.add(item.color);
        uniqueCategories.add(item.category);
    });
    let colorOpts = '';
    uniqueColors.forEach(c => colorOpts += `<option value="${c}">${c}</option>`);
    $('#filter-color-dropdown').html(colorOpts);

    let catOpts = '';
    uniqueCategories.forEach(cat => catOpts += `<option value="${cat}">${cat}</option>`);
    $('#filter-category-dropdown').html(catOpts);

    // --- CARDS SYSTEM ENGINE WITH PAGINATION ---
    function renderCardsGrid(filteredItems) {
        currentFilteredData = filteredItems;
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
        
        // Failsafe bounds
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        // Slice array based on current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filteredItems.slice(startIndex, endIndex);

        let gridHtml = '';
        pageItems.forEach((item) => {
            // Find global index so the right sidebar works no matter the page
            let globalIndex = titlesData.findIndex(t => t.title === item.title);
            
            if (item.locked) {
                gridHtml += `
                <div class="title-card locked" data-index="${globalIndex}">
                    <div>
                        <span style="color:#4a525a; font-size:1.2em;">★</span>
                        <h3>${item.title}</h3>
                        <span class="badge">Locked</span>
                        <div class="desc">${item.desc}</div>
                    </div>
                    <button class="view-btn" style="background:#2c3239; color:#8a929a;" disabled>🔒 Locked</button>
                </div>`;
            } else {
                gridHtml += `
                <div class="title-card unlocked" style="--theme-color: ${item.hex}; border-color: ${item.hex};" data-index="${globalIndex}">
                    <div>
                        <span style="color:${item.hex}; font-size:1.2em;">★</span>
                        <h3 style="color: ${item.hex};">${item.title}</h3>
                        <span class="badge" style="background: ${item.hex}; color: #000;">${item.color}</span>
                        <div class="desc">${item.desc}</div>
                    </div>
                    <button class="view-btn" style="background: var(--theme-color);">View Details</button>
                </div>`;
            }
        });
        
        $('#titles-grid-hook').html(gridHtml);
        $('#titles-counter-display').text(`Found ${filteredItems.length} titles`);
        
        // Update pagination UI numbers & buttons
        $('#page-indicator').text(`Page ${currentPage} / ${totalPages}`);
        $('#prev-page-btn').prop('disabled', currentPage === 1).css('opacity', currentPage === 1 ? '0.4' : '1');
        $('#next-page-btn').prop('disabled', currentPage === totalPages).css('opacity', currentPage === totalPages ? '0.4' : '1');
    }

    // --- PROFILE ROW BAR INSPECTOR SYSTEM ENGINE ---
    function updateInspectorPanel(item) {
        let inspectorHtml = `
        <div class="sidebar-preview-card" id="sidebar-preview-card" style="border-color: ${item.hex};">
            <span style="color:${item.hex}; font-size: 2em;">★</span>
            <h2 style="color:${item.hex}; margin: 10px 0 5px 0;">${item.title}</h2>
            <span class="badge" style="background:${item.hex}; color:black; padding:4px 12px;">${item.color}</span>
            <p style="font-size:0.85em; color:#b0b5bc; margin-top:15px;">${item.desc}</p>
        </div>
        <div class="sidebar-info-row"><div class="sidebar-label">🎨 Display Color</div><div class="sidebar-value" style="color:${item.hex};">${item.color}</div></div>
        <div class="sidebar-info-row"><div class="sidebar-label">🎯 How To Obtain</div><div class="sidebar-value">${item.desc}</div></div>
        <div class="sidebar-info-row"><div class="sidebar-label">⭐ Color Unlock Requirement</div><div class="sidebar-value" style="color:${item.hex};">${item.req}</div></div>
        <div class="sidebar-info-row"><div class="sidebar-label">🗂️ Category</div><div class="sidebar-value">${item.category}</div></div>
        <div class="sidebar-info-row" style="border:none;">
            <div class="sidebar-label">📈 Progress</div>
            <div class="progress-container" style="margin-top:8px;"><div class="progress-bar" style="background: ${item.hex}; width: 100%;"></div></div>
            <div style="text-align:right; font-size:0.8em; font-weight:bold; margin-top:4px;">${item.progress}</div>
        </div>
        <button class="view-btn open-titles-popup-trigger" style="width:100%; padding:10px; margin-top:10px;">See All Titles</button>`;
        
        $('#titles-sidebar-hook').html(inspectorHtml);
    }

    // Startup Init Execution
    renderCardsGrid(titlesData);
    updateInspectorPanel(titlesData[0]);

    // --- ROUTER ENGINE FOR CLICK LOGIC CONTROLS ---

    // Filters
    $('.filter-select').on('change', function() {
        const selColor = $('#filter-color-dropdown').val();
        const selCat = $('#filter-category-dropdown').val();
        let filtered = titlesData.filter(item => {
            return (selColor === 'All Colors' || item.color === selColor) && (selCat === 'All Categories' || item.category === selCat);
        });
        
        currentPage = 1; // Reset to page 1 on new filter
        renderCardsGrid(filtered);
    });

    // Pagination Buttons
    $(document).on('click', '#prev-page-btn', function() {
        if (currentPage > 1) {
            currentPage--;
            renderCardsGrid(currentFilteredData);
        }
    });

    $(document).on('click', '#next-page-btn', function() {
        const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderCardsGrid(currentFilteredData);
        }
    });

    // Sidebar view click
    $(document).on('click', '.title-card .view-btn', function(e) {
        e.preventDefault();
        let idx = $(this).closest('.title-card').attr('data-index');
        if (idx !== undefined) updateInspectorPanel(titlesData[idx]);
    });

    // --- MASTER POPUP GENERATOR HOOK LOGIC ---
    $(document).on('click', '.open-titles-popup-trigger', function(e) {
        e.preventDefault();
        let listHtml = '';
        titlesData.forEach(item => {
            listHtml += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#1c2127; padding:12px 15px; border-radius:6px; border-left:4px solid ${item.hex};">
                <div>
                    <strong style="color:${item.hex}; font-size:1.05em; display:block;">★ ${item.title}</strong>
                    <span style="font-size:0.8em; color:#8a929a;">Category: ${item.category} | Color: ${item.color}</span>
                </div>
                <div style="text-align:right; max-width:65%;">
                    <div style="font-size:0.85em; color:#ffffff;">${item.desc}</div>
                </div>
            </div>`;
        });
        $('#popup-list-content-hook').html(listHtml);
        $('#titles-popup-modal').css('display', 'flex');
    });

    $(document).on('click', '#close-titles-popup', function() {
        $('#titles-popup-modal').css('display', 'none');
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#titles-popup-modal')) {
            $('#titles-popup-modal').css('display', 'none');
        }
    });
});
/* Time to get back on Races*/

$(document).ready(function() {
    // 1. Race Data (Updated with exact V2 Table Data as arrays for bullets)
    const raceContent = {
        "Human": { 
            image: "Human_Neon.png", themeColor: "#ced6d9", rarity: "Common", desc: "Well-balanced with no major weakness.",
            v1: ["+25% Walk Speed under 70% health"], 
            v2: ["+1 Observation Haki", "+50% Walk Speed under 70% health"], 
            v3: ["Special ability recovers up to 4 Observation Haki dodges instantly.", "Hell circle summoning when dashing"] 
        },
        "BeastBorne": { 
            image: "Beastborne_Neon.png", themeColor: "#0cc242", rarity: "Uncommon", desc: "Enhanced senses and instincts.",
            v1: ["+20% Walk Speed", "+5% Stamina"], 
            v2: ["+50% Walk Speed", "+10% Stamina"], 
            v3: ["Special ability gives player 3x speed boost for 7 seconds.", "Hell circle summoning ability when dashing"] 
        },
        "Skyborne": { 
            image: "Skyborne_Neon.png", themeColor: "#0cc242", rarity: "Uncommon", desc: "Blessed by the skies, agile and swift.",
            v1: ["First Skywalk is 50% more powerful"], 
            v2: ["First Skywalk is now 2x more powerful.", "Player now has glide ability (Hold Space to fall slower)"], 
            v3: ["Special ability recovers up to 100 Stamina instantly and doubles Sky Jump distance for 7 seconds.", "Hellfire summoning circle ability when dashing"] 
        },
        "Fishborne": { 
            image: "Fishborne_Neon.png", themeColor: "#0cc242", rarity: "Uncommon", desc: "Born to thrive in the waters.",
            v1: ["+50% Swim Speed"], 
            v2: ["Water immunity (fruit users)", "x2 Walk Speed for 4 seconds when coming out of the water"], 
            v3: ["Special ability heals 25% of the player's maximum health for 7 seconds.", "Hellfire circle summoning when dashing"] 
        },
        "Demon": { 
            image: "Demon_Neon.png", themeColor: "#a60cc4", rarity: "Rare", desc: "Wield destructive power from the darkness.",
            v1: ["+2.5% Life Steal"], 
            v2: ["+3% Life Steal", "+10% Hellfire circle chance"], 
            v3: ["+20% Life Steal for 7 seconds (but drains 100 Stamina).", "Hellfire circle summoning ability when dashing"] 
        },
        "Dragonborne": { 
            image: "Dragonborne_Neon.png", themeColor: "#e0dd0b", rarity: "Legendary", desc: "Descendants of dragons with immense power.",
            v1: ["+10% Health", "+10% Health Regeneration", "First Skywalk is 25% more powerful"], 
            v2: ["+20% Health", "+10% Health Regeneration", "+50% Walk Speed under 50% health", "Glide ability (Hold Space to fall slower)"], 
            v3: ["Gets a 25% Max Health shield for 7 seconds.", "+50% Speed boost while under 50% HP.", "Hellfire summoning circle ability when dashing"] 
        },
        "D.Clan": { 
            image: "DClan_Neon.png", themeColor: "#e80707", rarity: "Mythical", desc: "Members of an ancient and secret clan.",
            v1: ["+5% Stamina", "+5% Health", "Free Conqueror's Haki (cost 250 Stamina)"], 
            v2: ["+10% Stamina", "+10% Health", "Conqueror's Haki cost 50 less Stamina (cost 200 Stamina)"], 
            v3: ["Damage amplification by 25% for 7 seconds.", "Conqueror's Haki cost 0 Stamina if ability is in use.", "Hellfire summoning circle when dashing"] 
        }
    };

    const container = $('#race-info');
    if (!container.length) return;
    
    // 2. Build the Top Selectors (Fixed variable name to --theme-color)
    let html = `
        <div class="version-selector-container">
            <div class="ver-btn active" data-ver="v1" style="--theme-color: #ffe100;">
                <div class="ver-btn-top"><div class="ver-icon">V1</div>
                <div class="ver-text"><h4>OVERVIEW</h4><p>Basic overview of each race.</p></div></div>
                <div class="ver-btn-bottom">Showing: <span class="highlight">Cards & Buffs</span></div>
            </div>
            <div class="ver-btn" data-ver="v2" style="--theme-color: #04ff00;"> <div class="ver-btn-top"><div class="ver-icon">V2</div>
                <div class="ver-text"><h4>DETAILED</h4><p>How to obtain and key details.</p></div></div>
                <div class="ver-btn-bottom">Showing: <span class="highlight">All in V1 + Obtaining</span></div>
            </div>
            <div class="ver-btn" data-ver="v3" style="--theme-color: #b042ff;">
                <div class="ver-btn-top"><div class="ver-icon">V3</div>
                <div class="ver-text"><h4>COMPLETE</h4><p>Full breakdown with stats.</p></div></div>
                <div class="ver-btn-bottom">Showing: <span class="highlight">All in V2 + Values & More</span></div>
            </div>
        </div>
        <div id="dynamic-race-view"></div>`; // Container that changes based on click
    
    container.html(html);

    // --- Render Functions ---
    
    // Renders the Grid of Cards (For V1 and V3)
    function renderCardGrid(version) {
        let gridHtml = `<div class="hz-race-grid">`;
        for (let race in raceContent) {
            let d = raceContent[race];
            let buffs = d[version].map(b => `<li>${b}</li>`).join("");
            gridHtml += `
                <div class="hz-race-card" style="--theme-color: ${d.themeColor};">
                    <div class="hz-card-top">
                        <div class="hz-card-image"><img src="/Special:FilePath/${d.image}" onerror="this.style.display='none'"></div>
                        <div class="hz-card-title-area">
                            <h3 class="hz-card-title">${race}</h3>
                            <span class="hz-badge ${d.rarity.toLowerCase()}">${d.rarity}</span>
                        </div>
                    </div>
                    <div class="hz-desc">${d.desc}</div>
                    <div class="hz-divider"></div>
                    <ul class="hz-buff-list">${buffs}</ul>
                </div>`;
        }
        gridHtml += `</div>`;
        $('#dynamic-race-view').html(gridHtml);
    }

    // Renders the Specific V2 Dashboard (From Image #2)
    function renderV2Dashboard() {
        let dashHtml = `
        <div class="hz-v2-dashboard">
            <h3 class="hz-section-title">HOW TO OBTAIN RACE V2</h3>
            <div class="hz-obtain-panel">
                <div class="hz-npc-box">
                    <img src="/Special:FilePath/BloodlineScientist.png" onerror="this.style.display='none'">
                    <p>Talk to the <br><span class="hz-gold-text">Bloodline Scientist</span><br>to do quests.</p>
                </div>
                <div class="hz-quest-box">
                    <div class="hz-quest-item"><span class="q-num">1</span> <div class="q-text"><strong>QUEST 1</strong><br>Defeat a sea beast.</div></div>
                    <div class="hz-quest-item"><span class="q-num">2</span> <div class="q-text"><strong>QUEST 2</strong><br>Collect 50 Chests around the map.</div></div>
                    <div class="hz-quest-item"><span class="q-num">3</span> <div class="q-text"><strong>QUEST 3</strong><br>Defeat Zenith Boss (he only spawns during a storm at the Shadow Island).</div></div>
                </div>
                <div class="hz-req-box">
                    <div class="hz-req-title">REQUIREMENT</div>
                    <div class="hz-req-cost"><span style="color:#2ecc71;">💵 $1,000,000</span><br><span style="color:#9b59b6;">💎 100 Gems</span></div>
                    <div class="hz-req-title" style="margin-top:15px;">REWARD</div>
                    <div class="hz-reward-icon">V2</div>
                    <div style="color:#ffaa00; font-size:0.8rem;">Unlock Race V2</div>
                </div>
            </div>
            <div class="hz-info-banner"><span>ℹ️</span> Afterwards pay <strong>1M$ + 100 Gems</strong> to unlock Race V2. This Quest can be repeated for any other races.</div>

            <h3 class="hz-section-title" style="margin-top:30px;">RACE V2 – KEY DETAILS</h3>
            <div class="hz-v2-table">
                <div class="hz-th-row">
                    <div></div><div class="hz-col-head" style="color:#00aaff;">V1</div><div class="hz-col-head" style="color:#b042ff;">V2</div><div class="hz-col-head" style="color:#ffaa00;">V3</div>
                </div>`;
        
        for (let race in raceContent) {
            let d = raceContent[race];
            dashHtml += `
                <div class="hz-tr-row" style="--theme-color: ${d.themeColor};">
                    <div class="hz-td-name">
                        <div class="hz-table-img"><img src="/Special:FilePath/${d.image}" onerror="this.style.display='none'"></div>
                        <span style="color:var(--theme-color); font-weight:bold;">${race}</span>
                    </div>
                    <div class="hz-td-list"><ul>${d.v1.map(b=>`<li>${b}</li>`).join('')}</ul></div>
                    <div class="hz-td-list"><ul>${d.v2.map(b=>`<li>${b}</li>`).join('')}</ul></div>
                    <div class="hz-td-list"><ul>${d.v3.map(b=>`<li>${b}</li>`).join('')}</ul></div>
                </div>`;
        }
        dashHtml += `</div></div>`;
        $('#dynamic-race-view').html(dashHtml);
    }

    // 3. Click Logic
    $('.ver-btn').on('click', function() {
        $('.ver-btn').removeClass('active');
        $(this).addClass('active');
        const ver = $(this).data('ver');

        // Fade out, load new content, fade in
        $('#dynamic-race-view').css('opacity', 0);
        setTimeout(() => {
            if (ver === 'v2') {
                renderV2Dashboard();
            } else {
                renderCardGrid(ver);
            }
            $('#dynamic-race-view').css('opacity', 1);
        }, 200);
    });

    // Initial Load
    renderCardGrid('v1');
});