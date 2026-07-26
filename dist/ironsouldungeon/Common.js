/* Iron Soul: Dungeon — Item List filtering + modal */
// Please tell us the line if theres any problem thank you!
/* ── Load Playfair Display font ── */
(function () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap';
    document.head.appendChild(link);
})();

(function () {
    function initItemList() {
        var grids = document.querySelectorAll('.isd-item-grid');
        if (!grids.length) return;

        function safeImageSrc(url) {
            return (typeof url === 'string' && url.indexOf('https://static.wikia.nocookie.net/') === 0)
                ? url
                : '';
        }

        // Falls back to the thumbnail already shown in the grid if a card
        // never had a separate data-image URL set.
        function resolveImageSrc(card, d) {
            var direct = safeImageSrc(d.image);
            if (direct) return direct;
            var thumb = card.querySelector('.isd-grid-img img, .isd-item-card img');
            return thumb ? safeImageSrc(thumb.src) : '';
        }

        function setObtainmentField(el, price, source) {
            el.textContent = '';
            if (price) {
                var priceSpan = document.createElement('span');
                priceSpan.className = 'isd-price';
                priceSpan.textContent = price;
                el.appendChild(priceSpan);
                if (source) {
                    el.appendChild(document.createTextNode(' from '));
                    var sourceSpan = document.createElement('span');
                    sourceSpan.className = 'isd-source';
                    sourceSpan.textContent = source;
                    el.appendChild(sourceSpan);
                }
            } else {
                el.textContent = source || '—';
            }
        }

        // ── Build one shared modal ──
        var overlay = document.createElement('div');
        overlay.className = 'isd-item-modal-overlay';
        overlay.innerHTML =
            '<div class="isd-item-modal">' +
                '<div class="isd-item-modal-header">' +
                    '<span class="isd-item-modal-title"></span>' +
                    '<span class="isd-item-modal-close">&times;</span>' +
                '</div>' +
                '<div class="isd-item-modal-img-wrap"><img class="isd-item-modal-img" src="" alt=""></div>' +
                '<div class="isd-item-modal-section">' +
                    '<div class="isd-item-modal-value isd-item-modal-rarity"></div>' +
                '</div>' +
                '<div class="isd-item-modal-section isd-m-description-section">' +
                    '<div class="isd-item-modal-value isd-m-description"></div>' +
                '</div>' +
                '<div class="isd-item-modal-section isd-m-stats-section">' +
                    '<div class="isd-item-modal-label">Stats</div>' +
                    '<div class="isd-item-modal-value isd-m-stats"></div>' +
                '</div>' +
                '<div class="isd-item-modal-section">' +
                    '<div class="isd-item-modal-label">Obtainment</div>' +
                    '<div class="isd-item-modal-value isd-item-modal-obtainment"></div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        function closeModal() {
            overlay.classList.remove('isd-active');
        }
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
        overlay.querySelector('.isd-item-modal-close').addEventListener('click', closeModal);

        function openModal(card) {
            var d = card.dataset;
            overlay.querySelector('.isd-item-modal-title').textContent = d.name || '';
            overlay.querySelector('.isd-item-modal-img').src = resolveImageSrc(card, d);
            overlay.querySelector('.isd-item-modal-rarity').textContent =
                (d.rarity ? d.rarity.charAt(0).toUpperCase() + d.rarity.slice(1) : '') +
                (d.category ? ' ' + d.category.charAt(0).toUpperCase() + d.category.slice(1) : '');

            var descSection = overlay.querySelector('.isd-m-description-section');
            if (d.description) {
                descSection.style.display = '';
                overlay.querySelector('.isd-m-description').textContent = d.description;
            } else {
                descSection.style.display = 'none';
            }

            var statsSection = overlay.querySelector('.isd-m-stats-section');
            if (d.stats) {
                statsSection.style.display = '';
                overlay.querySelector('.isd-m-stats').textContent = d.stats;
            } else {
                statsSection.style.display = 'none';
            }

            setObtainmentField(overlay.querySelector('.isd-item-modal-obtainment'), d.price, d.obtainment);

            overlay.classList.add('isd-active');
        }

        // ── Hover tooltip (quick preview, no click needed) ──
        var tooltip = document.createElement('div');
        tooltip.className = 'isd-item-tooltip';
        tooltip.innerHTML =
            '<div class="isd-item-tooltip-header"></div>' +
            '<div class="isd-item-tooltip-img-wrap"><img src="" alt=""></div>' +
            '<div class="isd-item-tooltip-section">' +
                '<div class="isd-item-tooltip-rarity"></div>' +
                '<div class="isd-item-tooltip-category"></div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section isd-tt-description-section">' +
                '<div class="isd-item-tooltip-value isd-tt-description"></div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section isd-tt-stats-section">' +
                '<div class="isd-item-tooltip-label">Stats</div>' +
                '<div class="isd-item-tooltip-value isd-tt-stats"></div>' +
            '</div>' +
            '<div class="isd-item-tooltip-section">' +
                '<div class="isd-item-tooltip-label">Obtainment</div>' +
                '<div class="isd-item-tooltip-value isd-tt-obtainment"></div>' +
            '</div>';
        document.body.appendChild(tooltip);

        var rarityColors = {
            common: '#9a9a9a',
            uncommon: '#4caf50',
            rare: '#3b82f6',
            epic: '#a855f7',
            legendary: '#d98c2b',
            mythical: '#ec4899'
        };

        function capitalizeWord(s) {
            return s ? s.split('-').map(function (w) {
                return w.charAt(0).toUpperCase() + w.slice(1);
            }).join(' ') : '';
        }

        function showTooltip(card) {
            var d = card.dataset;
            tooltip.querySelector('.isd-item-tooltip-header').textContent = d.name || '';
            tooltip.querySelector('img').src = resolveImageSrc(card, d);

            var rarityEl = tooltip.querySelector('.isd-item-tooltip-rarity');
            rarityEl.textContent = capitalizeWord(d.rarity);
            rarityEl.style.color = rarityColors[d.rarity] || '#e8ddd4';

            tooltip.querySelector('.isd-item-tooltip-category').textContent = capitalizeWord(d.category);

            var ttDescSection = tooltip.querySelector('.isd-tt-description-section');
            if (d.description) {
                ttDescSection.style.display = '';
                tooltip.querySelector('.isd-tt-description').textContent = d.description;
            } else {
                ttDescSection.style.display = 'none';
            }

            var ttStatsSection = tooltip.querySelector('.isd-tt-stats-section');
            if (d.stats) {
                ttStatsSection.style.display = '';
                tooltip.querySelector('.isd-tt-stats').textContent = d.stats;
            } else {
                ttStatsSection.style.display = 'none';
            }

            setObtainmentField(tooltip.querySelector('.isd-tt-obtainment'), d.price, d.obtainment);
            var rect = card.getBoundingClientRect();
            var tooltipWidth = 260;
            var left = rect.right + 10;
            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - 10;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('isd-active');

            // vertical clamp — measure after showing, then adjust if it overflows the viewport
            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('isd-active');
        }

        // ── For each grid: attach card clicks + build a toolbar above it ──
        grids.forEach(function (grid) {
            var cards = grid.querySelectorAll('.isd-item-card');

            cards.forEach(function (card) {
                card.addEventListener('click', function () { openModal(card); });
                card.addEventListener('mouseenter', function () { showTooltip(card); });
                card.addEventListener('mouseleave', hideTooltip);
            });

            // collect distinct categories present in this grid
            var categories = [];
            cards.forEach(function (card) {
                var c = card.dataset.category;
                if (c && categories.indexOf(c) === -1) categories.push(c);
            });

            function capitalize(s) {
                return s.split('-').map(function (word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ');
            }

            var toolbar = document.createElement('div');
            toolbar.className = 'isd-item-toolbar';

            var categorySelect = null;
            if (categories.length > 1) {
                categorySelect = document.createElement('select');
                categorySelect.className = 'isd-item-filter';
                categorySelect.innerHTML = '<option value="all">All Types</option>';
                categories.forEach(function (c) {
                    var opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = capitalize(c);
                    categorySelect.appendChild(opt);
                });
                toolbar.appendChild(categorySelect);
            }

            var searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'isd-item-search';
            searchInput.placeholder = 'Enter name...';
            toolbar.appendChild(searchInput);

            grid.parentNode.insertBefore(toolbar, grid);

            function applyFilters() {
                var term = searchInput.value.trim().toLowerCase();
                var category = categorySelect ? categorySelect.value : 'all';

                cards.forEach(function (card) {
                    var name = (card.dataset.name || '').toLowerCase();
                    var cardCategory = card.dataset.category || '';

                    var matches =
                        (term === '' || name.indexOf(term) !== -1) &&
                        (category === 'all' || category === cardCategory);

                    card.style.display = matches ? '' : 'none';
                });
            }

            searchInput.addEventListener('input', applyFilters);
            if (categorySelect) categorySelect.addEventListener('change', applyFilters);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initItemList);
    } else {
        initItemList();
    }
})();

/* ── Main Page sidebar float fix ── */
(function () {
    function fixSidebarPosition() {
        var content = document.querySelector('#mw-content-text .mw-parser-output');
        if (!content) return;
        var sidebar = content.querySelector('.isd-sidebar');
        if (!sidebar) return;
        if (content.firstElementChild === sidebar) return; 

        content.insertBefore(sidebar, content.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixSidebarPosition);
    } else {
        fixSidebarPosition();
    }
})();

/* ── Copy Code Button (Codes page) ── */
mw.hook('wikipage.content').add(function ($content) {
    $content.on('click', '.copy-btn', function () {
        var btn = $(this);
        if (btn.hasClass('copied')) return;
        var code = btn.attr('data-code');

        function onSuccess() {
            btn.text('Copied!').addClass('copied');
            setTimeout(function () {
                btn.text('Copy').removeClass('copied');
            }, 2000);
        }

        function onFail() {
            btn.text('Failed!');
            setTimeout(function () { btn.text('Copy'); }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(onSuccess).catch(function () {
                fallbackCopy(code, onSuccess, onFail);
            });
        } else {
            fallbackCopy(code, onSuccess, onFail);
        }
    });

    function fallbackCopy(code, onSuccess, onFail) {
        var temp = $('<textarea>').css({
            position: 'fixed', top: 0, left: 0,
            opacity: 0, pointerEvents: 'none'
        });
        $('body').append(temp);
        temp.val(code).focus().select();
        try {
            document.execCommand('copy');
            onSuccess();
        } catch (e) {
            onFail();
        }
        temp.remove();
    }
});

/* ── Forge Calculator (Forge page) ──
   Renders into <div id="isd-forge-calc"></div>.
   Ore/weapon data below is pulled from the confirmed forge formula:
   Final DMG = WeaponBaseATK × (sum of ore ValueMultipliers ÷ slots used)
   Price = Final DMG × 10
*/
(function () {
    var RARITY = {
        1: { name: 'Common', color: '#9a9a9a' },
        2: { name: 'Uncommon', color: '#4caf50' },
        3: { name: 'Rare', color: '#3b82f6' },
        4: { name: 'Epic', color: '#a855f7' },
        5: { name: 'Legendary', color: '#d98c2b' },
        6: { name: 'Mythic', color: '#ef4444' },
        7: { name: 'Divine', color: '#ec4899' }
    };

    var ORE_NAMES = {
        Kenki: 'Kenki', Apocalypse: 'Apocalypse', DarkBlossom: 'Dark Blossom',
        Hellstone6: 'Rotten Lotus', Gwindel: 'Gwindel', Corundum: 'Corundum',
        Heatshell: 'Heatshell', Hellstone4: 'Witherite', Starfall: 'Starfall',
        Redsunder: 'Redsunder', Earthmaw: 'Earthmaw', VoidcubeCrystal: 'Fluorite',
        RoseTourmaline: 'Ruby', IgneousCore: 'Topaz', SmokyQuartz: 'Magnetite',
        Blackhole: 'BlackHole', BloodHeart: 'Blood Heart', CoralReef: 'Coralreef',
        Hellstone5: 'Eye of Hatred', Glacium: 'Glacium', Hellstone3: 'Torbernite',
        Voidstar: 'Voidstar', Hellstone2: 'Painstone', BerylFragment: 'Opal',
        AmethystCluster: 'Moonstone', IceCrystalOre: 'Frostine',
        Romanstone: 'Romanstone', Aquamarine: 'Aquamarine', Sunflare: 'Sunflare',
        Hellstone1: 'Darkcube', Raindrop: 'Raindrop', Bloodshard: 'Bloodshard',
        Jade: 'Jade', Hexbane: 'Hexbane', Verdanite: 'Verdanite',
        ObsidianChunk: 'Azurite', Pyrite: 'Copper', Sandstone: 'Sand Rock',
        FlameEye: 'Flame Eye', Saturn: 'Saturn', RustyIron: 'Rusty Iron',
        Sunstone: 'Sunstone', Epidote: 'Epidote', Genestone: 'Genestone',
        Rarity7Ore: '??? (Divine)'
    };

    // id|rarity|price|mult|quality|hellweight|trade
    var ORE_RAW = [
        'Kenki|6|240|85|6|0|true',
        'Apocalypse|6|220|76|6|0|true',
        'DarkBlossom|6|200|73|6|0|true',
        'Blackhole|5|180|70|5|0|true',
        'BloodHeart|5|160|68|5|0|true',
        'FlameEye|4|120|60|4|0|true',
        'Saturn|4|110|55|4|0|true',
        'RustyIron|3|94|47|3|0|true',
        'Hellstone6|6|140|66|6|100|false',
        'Gwindel|6|124|63|6|0|true',
        'Corundum|6|114|57|6|0|true',
        'CoralReef|5|104|52|5|0|true',
        'Hellstone5|5|92|46.5|5|100|false',
        'Genestone|5|88|45|5|0|true',
        'Romanstone|4|80|42|4|0|true',
        'Aquamarine|4|72|38|4|0|true',
        'Raindrop|3|64|35|3|0|true',
        'Jade|2|56|31|2|0|true',
        'Hellstone4|6|68|34|6|100|false',
        'Starfall|6|60|30|6|0|true',
        'Redsunder|6|54|27|6|0|true',
        'Glacium|5|50|25|5|0|true',
        'Earthmaw|6|46|23|5|0|true',
        'Hellstone3|5|44|22|5|100|false',
        'Voidstar|5|40|20|4|0|true',
        'Sunflare|4|38|19|4|0|true',
        'Hellstone2|5|26|13|4|100|false',
        'Hexbane|3|22|11|3|0|true',
        'Bloodshard|3|18|9|3|0|true',
        'Verdanite|2|14|7|2|0|true',
        'VoidcubeCrystal|6|24|12|5|0|true',
        'RoseTourmaline|6|20|10|5|0|true',
        'BerylFragment|5|16|8|5|0|true',
        'IgneousCore|6|14|7|4|0|true',
        'AmethystCluster|5|12|6|4|0|true',
        'SmokyQuartz|6|10|5|4|0|true',
        'Hellstone1|4|9|4.5|3|100|false',
        'IceCrystalOre|5|8|4|3|0|true',
        'Sunstone|4|7|3.4|3|0|true',
        'Epidote|3|5|2.6|3|0|true',
        'ObsidianChunk|2|4|2|2|0|true',
        'Pyrite|2|3|1.5|2|0|true',
        'Sandstone|1|2|1.2|1|0|true',
        'Rarity7Ore|7|100|60|6|100|false'
    ];

    // id|class|atk|baseLv|quality|tier|blueprint|special|hell|price
    var WEAPON_RAW = [
        'Single_KnightSword|Sword|6|0.75|1.1|4|false|false|false|65',
        'Single_KnightSword_T3_Justice|Sword|6|0.75|1.1|3|false|false|false|65',
        'Single_KnightSword_T2_Betray|Sword|6|0.75|1.1|2|false|false|false|65',
        'Single_KnightSword_T1_Epiphqny|Sword|6|0.75|1.1|1|false|false|false|65',
        'Single_Ashwarden|Sword|7|0.8|1.4|4|false|false|false|70',
        'Single_AshWarden_T3_Gold|Sword|7|0.8|1.4|3|false|false|false|70',
        'Single_AshWarden_T2_Frost|Sword|7|0.8|1.4|2|false|false|false|70',
        'Single_AshWarden_T1_Star|Sword|7|0.8|1.4|1|false|false|false|70',
        'Single_Gray_T4_Rust|Sword|8|0.85|1.7|4|false|false|false|75',
        'Single_Gray_T3_Halo|Sword|8|0.85|1.7|3|false|false|false|75',
        'Single_Gray|Sword|8|0.85|1.7|2|false|false|false|75',
        'Single_Gray_T1_LK|Sword|8|0.85|1.7|1|false|false|false|75',
        'Single_TwoEdged|Sword|9|0.9|2.1|4|false|false|false|80',
        'Single_TwoEdged_T3_Angel|Sword|9|0.9|2.1|3|false|false|false|80',
        'Single_TwoEdged_T2_Augur|Sword|9|0.9|2.1|2|false|false|false|80',
        'Single_TwoEdged_T1_Shaman|Sword|9|0.9|2.1|1|false|false|false|80',
        'Single_BroadSword_T3_Copper|Sword|5|0.7|0.8|3|false|false|false|60',
        'Single_BroadSword_T2_Dark|Sword|5|0.7|0.8|2|false|false|false|60',
        'Single_BroadSword_T1_Lava|Sword|5|0.7|0.8|1|false|false|false|60',
        'Single_HighHeaven|Sword|10|0.95|1.7|1|false|false|false|85',
        'Single_Hell_T4|Sword|9|0.9|1.1|4|false|false|true|80',
        'Single_Hell_T3|Sword|10|0.95|1.4|3|false|false|true|90',
        'Single_Hell_T2|Sword|11|1|1.7|2|false|false|true|100',
        'Single_Hell_T1|Sword|12|1.05|2.1|1|false|false|true|110',
        'Single_HighHell_T1|Sword|12.5|1.05|2.1|1|false|false|true|115',
        'Single_Genji_T4|Sword|11|1|2.1|4|false|false|false|100',
        'Single_Genji_T3|Sword|11|1|2.1|3|false|false|false|100',
        'Single_Genji_T2|Sword|11|1|2.1|2|false|false|false|100',
        'Single_Genji_T1|Sword|11|1|2.1|1|false|false|false|100',
        'Single_RoseRapier_T2|Sword|9|0.9|2.1|1|false|false|false|80',
        'Single_Claw_Hell_T1|Sword|14|1.06|1.7|1|false|false|true|125',
        'Single_SilverSword_T2|Sword|1|1|1.1|2|false|true|false|65',
        'Single_SkySword_S2|Sword|1|1|1|1|false|true|false|80',
        'DualWield_Dragon_OP|Sword|11|1|1.7|2|true|true|false|80',
        'Heavy_Axe|Heavy|11|0.75|1.1|4|false|false|false|90',
        'Heavy_Axe_T3_Viking|Heavy|11|0.75|1.1|3|false|false|false|90',
        'Heavy_Axe_T2_Thunder|Heavy|11|0.75|1.1|2|false|false|false|90',
        'Heavy_Axe_T1_Odin|Heavy|11|0.75|1.1|1|false|false|false|90',
        'Heavy_TwistedAxe|Heavy|12|0.8|1.4|4|false|false|false|95',
        'Heavy_TwistedAxe_T3_Golem|Heavy|12|0.8|1.4|3|false|false|false|95',
        'Heavy_TwistedAxe_T2_Royal|Heavy|12|0.8|1.4|2|false|false|false|95',
        'Heavy_TwistedAxe_T1_Alchemy|Heavy|12|0.8|1.4|1|false|false|false|95',
        'Heavy_Warhammer|Heavy|13|0.85|1.7|4|false|false|false|100',
        'Heavy_Warhammer_T3_Kitty|Heavy|13|0.85|1.7|3|false|false|false|100',
        'Heavy_Warhammer_T2_MilkShake|Heavy|13|0.85|1.7|2|false|false|false|100',
        'Heavy_Warhammer_T1_Brownie|Heavy|13|0.85|1.7|1|false|false|false|100',
        'Heavy_OrcAxe|Heavy|14|0.9|2.1|4|false|false|false|105',
        'Heavy_OrcAxe_T3_Rust|Heavy|14|0.9|2.1|3|false|false|false|105',
        'Heavy_OrcAxe_T2_Frost|Heavy|14|0.9|2.1|2|false|false|false|105',
        'Heavy_OrcAxe_T1_Demon|Heavy|14|0.9|2.1|1|false|false|false|105',
        'Heavy_Hammer_T3_Rust|Heavy|10|0.7|0.8|3|false|false|false|85',
        'Heavy_Hammer_T2_Abyss|Heavy|10|0.7|0.8|2|false|false|false|85',
        'Heavy_Hammer_T1_Lava|Heavy|10|0.7|0.8|1|false|false|false|85',
        'Heavy_WingHeaven|Heavy|15|1|1.7|1|false|false|false|110',
        'Heavy_Hell_T4|Heavy|13|0.9|1.1|4|false|false|true|95',
        'Heavy_Hell_T3|Heavy|14|0.95|1.4|3|false|false|true|105',
        'Heavy_Hell_T2|Heavy|15|1|1.7|2|false|false|true|120',
        'Heavy_Hell_T1|Heavy|16|1.05|2.1|1|false|false|true|130',
        'Heavy_WingHell_T1|Heavy|16.5|1.05|2.1|1|false|false|true|140',
        'Heavy_Ironman_T4|Heavy|15|1|2.1|4|false|false|false|110',
        'Heavy_Ironman_T3|Heavy|15|1|2.1|3|false|false|false|110',
        'Heavy_Ironman_T2|Heavy|15|1|2.1|2|false|false|false|110',
        'Heavy_Ironman_T1|Heavy|15|1|2.1|1|false|false|false|110',
        'Heavy_Dragon_Warrior|Heavy|15|1|1.7|2|true|true|false|80',
        'Heavy_Claw_Hell_T1|Heavy|17|1.06|1.7|1|false|false|true|150',
        'Staff_Horn_T4_Blue|Staff|9|0.8|1.7|4|false|false|false|80',
        'Staff_Horn_T3_Brown|Staff|9|0.8|1.7|3|false|false|false|80',
        'Staff_Horn_T2_Gold|Staff|9|0.8|1.7|2|false|false|false|80',
        'Staff_Horn_T1_Devil|Staff|9|0.8|1.7|1|false|false|false|80',
        'Staff_Wing_T4_Black|Staff|10|0.85|2.1|4|false|false|false|85',
        'Staff_Wing_T3_Blue|Staff|10|0.85|2.1|3|false|false|false|85',
        'Staff_Wing_T2_Gold|Staff|10|0.85|2.1|2|false|false|false|85',
        'Staff_Wing_T1_Cosmo|Staff|10|0.85|2.1|1|false|false|false|85',
        'Staff_Acient_T3_Yellow|Staff|8|0.75|1.4|3|false|false|false|75',
        'Staff_Acient_T2_Red|Staff|8|0.75|1.4|2|false|false|false|75',
        'Staff_Acient_T1_White|Staff|8|0.75|1.4|1|false|false|false|75',
        'Staff_Priest_T1|Staff|11|0.9|1.4|1|false|false|false|95',
        'Staff_Deer_T4|Staff|12|0.95|2.1|4|false|false|false|95',
        'Staff_Deer_T3|Staff|12|0.95|2.1|3|false|false|false|95',
        'Staff_Deer_T2|Staff|12|0.95|2.1|2|false|false|false|95',
        'Staff_Deer_T1|Staff|12|0.95|2.1|1|false|false|false|95',
        'Staff_Hell_T4|Staff|9|0.8|1.1|4|false|false|true|80',
        'Staff_Hell_T3|Staff|10|0.85|1.4|3|false|false|true|85',
        'Staff_Hell_T2|Staff|11|0.9|1.7|2|false|false|true|95',
        'Staff_Hell_T1|Staff|12|0.95|2.1|1|false|false|true|105',
        'Staff_Lucifer_T1|Staff|12.5|0.95|2.1|1|false|false|true|110',
        'Staff_Claw_Hell_T1|Staff|14|1.06|1.7|1|false|false|true|125',
        'Staff_Dragon_T1|Staff|12|1|2.1|1|false|true|false|85',
        'Sickle_Ordinary_Blue_T4|Sickle|13|0.85|1.1|4|false|false|false|95',
        'Sickle_Ordinary_Green_T3|Sickle|13|0.9|1.4|3|false|false|false|95',
        'Sickle_Ordinary_Purple_T2|Sickle|13|0.95|1.7|2|false|false|false|95',
        'Sickle_Ordinary_red_T1|Sickle|13|1|2.1|1|false|false|false|95',
        'SkywingBow_T4|Bow|1|1|1|4|true|true|false|95',
        'SkywingBow_Limited|Bow|13|1|2.1|4|false|true|false|95',
        'SkywyrmFist_T4|Fist|13|1|1|4|true|false|false|95',
        'Fist_Wild_T4_Volcano|Fist|13|1|1.1|4|false|false|false|95',
        'Fist_Wild_T2_Forest|Fist|13|1|1.7|2|false|false|false|95',
        'Fist_Wild_T1_Ice|Fist|13|1|2.1|1|false|false|false|95'
    ];

    var CLASSES = ['Sword', 'Heavy', 'Staff', 'Sickle', 'Bow', 'Fist'];

    function prettyName(id) {
        var n = id
            .replace(/^(Single_|Heavy_|Staff_|Sickle_|SkywingBow_|SkywyrmFist_|Fist_|DualWield_)/, '')
            .replace(/_T\d+/, '')
            .replace(/_/g, ' ')
            .trim();
        return n || id;
    }

    function parseOre(line) {
        var p = line.split('|');
        var id = p[0];
        return {
            id: id,
            name: ORE_NAMES[id] || id,
            rarity: Number(p[1]),
            price: Number(p[2]),
            mult: Number(p[3]),
            quality: Number(p[4]),
            hell: Number(p[5]) > 0,
            trade: p[6] === 'true'
        };
    }

    function parseWeapon(line) {
        var p = line.split('|');
        return {
            id: p[0],
            name: prettyName(p[0]),
            cls: p[1],
            atk: Number(p[2]),
            baseLv: Number(p[3]),
            quality: Number(p[4]),
            tier: Number(p[5]),
            blueprint: p[6] === 'true',
            special: p[7] === 'true',
            hell: p[8] === 'true',
            price: Number(p[9])
        };
    }

    var ORES = ORE_RAW.map(parseOre).sort(function (a, b) { return b.mult - a.mult; });
    var WEAPONS = WEAPON_RAW.map(parseWeapon);

    function el(tag, className, text) {
        var e = document.createElement(tag);
        if (className) e.className = className;
        if (text !== undefined) e.textContent = text;
        return e;
    }

    function buildForgeCalculator(container) {
        var state = {
            slots: [null, null, null, null],
            oreQuery: '',
            weaponQuery: '',
            activeClass: 'Sword',
            selected: null
        };

        var wrap = el('div', 'isd-forge-wrap');

        // ===== LEFT: preview / weapon list =====
        var preview = el('div', 'isd-forge-col isd-forge-preview');
        var previewHead = el('div', 'isd-forge-head');
        previewHead.appendChild(el('h3', null, 'Preview'));
        var pill = el('span', 'isd-forge-pill', '100% —');
        previewHead.appendChild(pill);
        preview.appendChild(previewHead);

        var tabs = el('div', 'isd-forge-tabs');
        var tabButtons = {};
        CLASSES.forEach(function (c) {
            var btn = el('button', 'isd-forge-tab', c);
            if (c === state.activeClass) btn.classList.add('active');
            btn.addEventListener('click', function () {
                state.activeClass = c;
                Object.keys(tabButtons).forEach(function (k) {
                    tabButtons[k].classList.toggle('active', k === c);
                });
                renderWeaponList();
            });
            tabButtons[c] = btn;
            tabs.appendChild(btn);
        });
        preview.appendChild(tabs);

        var weaponSearchWrap = el('div', 'isd-forge-searchwrap');
        var weaponSearch = el('input', 'isd-forge-search');
        weaponSearch.type = 'text';
        weaponSearch.placeholder = 'Search weapon...';
        weaponSearch.addEventListener('input', function () {
            state.weaponQuery = weaponSearch.value;
            renderWeaponList();
        });
        weaponSearchWrap.appendChild(weaponSearch);
        preview.appendChild(weaponSearchWrap);

        var weaponList = el('div', 'isd-forge-list');
        preview.appendChild(weaponList);

        function renderWeaponList() {
            weaponList.innerHTML = '';
            var q = state.weaponQuery.toLowerCase();
            var items = WEAPONS.filter(function (w) {
                return w.cls === state.activeClass && w.name.toLowerCase().indexOf(q) !== -1;
            });
            if (!items.length) {
                weaponList.appendChild(el('div', 'isd-forge-result-empty', 'No weapons match.'));
                return;
            }
            items.forEach(function (w) {
                var row = el('button', 'isd-forge-row');
                if (state.selected && state.selected.id === w.id) row.classList.add('selected');
                var name = el('span', 'isd-forge-row-name', w.name + (w.hell ? ' \uD83D\uDD25' : ''));
                var tier = el('span', 'isd-forge-row-tier', 'T' + w.tier);
                row.appendChild(name);
                row.appendChild(tier);
                row.addEventListener('click', function () {
                    state.selected = w;
                    pill.textContent = '100% ' + w.cls;
                    renderWeaponList();
                    renderResult();
                });
                weaponList.appendChild(row);
            });
        }

        // ===== CENTER: forge slots + result =====
        var center = el('div', 'isd-forge-col isd-forge-center');

        var slotsRow = el('div', 'isd-forge-slots');
        var slotEls = [];
        for (var i = 0; i < 4; i++) {
            (function (idx) {
                var slot = el('div', 'isd-forge-slot');
                slot.addEventListener('click', function () {
                    if (state.slots[idx]) {
                        state.slots[idx] = null;
                        renderSlots();
                        renderResult();
                    }
                });
                slotEls.push(slot);
                slotsRow.appendChild(slot);
            })(i);
        }
        center.appendChild(slotsRow);

        function renderSlots() {
            state.slots.forEach(function (ore, idx) {
                var slot = slotEls[idx];
                slot.innerHTML = '';
                slot.classList.toggle('filled', !!ore);
                if (!ore) {
                    slot.appendChild(el('span', 'isd-forge-slot-empty', 'Empty'));
                    return;
                }
                var dot = el('span', 'isd-forge-dot');
                dot.style.background = RARITY[ore.rarity].color;
                dot.style.boxShadow = '0 0 6px ' + RARITY[ore.rarity].color;
                var name = el('span', 'isd-forge-slot-name', ore.name);
                var mult = el('span', 'isd-forge-slot-mult', '\u00D7' + ore.mult);
                var x = el('span', 'isd-forge-slot-x', '\u2715');
                slot.appendChild(dot);
                slot.appendChild(name);
                slot.appendChild(mult);
                slot.appendChild(x);
            });
        }

        var readout = el('div', 'isd-forge-readout');
        var multText = el('span', 'isd-forge-mult-text');
        var rarityBadge = el('span', 'isd-forge-rarity');
        var clearBtn = el('button', 'isd-forge-clear', 'Clear all');
        clearBtn.addEventListener('click', function () {
            state.slots = [null, null, null, null];
            renderSlots();
            renderResult();
        });
        readout.appendChild(multText);
        readout.appendChild(rarityBadge);
        readout.appendChild(clearBtn);
        center.appendChild(readout);

        var forgeBtn = el('div', 'isd-forge-btn', 'Forge');
        center.appendChild(forgeBtn);

        var result = el('div', 'isd-forge-result');
        center.appendChild(result);

        function getFilled() {
            return state.slots.filter(function (o) { return !!o; });
        }

        function getAvgMult() {
            var f = getFilled();
            if (!f.length) return 0;
            var sum = f.reduce(function (s, o) { return s + o.mult; }, 0);
            return sum / f.length;
        }

        function getResultRarity() {
            var f = getFilled();
            if (!f.length) return null;
            var rarities = [];
            f.forEach(function (o) { if (rarities.indexOf(o.rarity) === -1) rarities.push(o.rarity); });
            rarities.sort(function (a, b) { return b - a; });
            for (var i = 0; i < rarities.length; i++) {
                var r = rarities[i];
                var atOrAbove = f.filter(function (o) { return o.rarity >= r; }).length;
                if (atOrAbove / f.length >= 0.5) return r;
            }
            return Math.max.apply(null, f.map(function (o) { return o.rarity; }));
        }

        function renderResult() {
            var avgMult = getAvgMult();
            var filled = getFilled();
            var rar = getResultRarity();

            multText.innerHTML = '';
            multText.appendChild(document.createTextNode('Multiplier: '));
            var b = el('b', null, '\u00D7' + avgMult.toFixed(2));
            b.style.color = '#d98c2b';
            multText.appendChild(b);

            rarityBadge.style.display = rar ? 'inline-block' : 'none';
            if (rar) {
                rarityBadge.textContent = RARITY[rar].name;
                rarityBadge.style.color = RARITY[rar].color;
                rarityBadge.style.border = '1px solid ' + RARITY[rar].color + '88';
                rarityBadge.style.background = RARITY[rar].color + '22';
            }

            result.innerHTML = '';
            if (!state.selected) {
                result.appendChild(el('div', 'isd-forge-result-empty',
                    'Tap a weapon on the left to preview its forged stats with the current ore mix.'));
                return;
            }

            var w = state.selected;
            var title = el('h3', 'isd-forge-result-title', w.name);
            result.appendChild(title);

            var tags = el('div', 'isd-forge-result-tags');
            tags.appendChild(el('span', null, w.cls));
            tags.appendChild(el('span', null, 'Tier ' + w.tier));
            if (w.hell) tags.appendChild(el('span', 'isd-forge-hell', '\uD83D\uDD25 Hell'));
            if (w.special) tags.appendChild(el('span', null, '\u2728 Special'));
            result.appendChild(tags);

            var finalDmg = w.atk * avgMult;
            var finalPrice = finalDmg * 10;

            var grid = el('div', 'isd-forge-stat-grid');
            grid.appendChild(makeStat('Base ATK', String(w.atk), false));
            grid.appendChild(makeStat('Ore Multiplier', '\u00D7' + avgMult.toFixed(2), false));
            grid.appendChild(makeStat('Final DMG', filled.length ? finalDmg.toFixed(1) : '\u2014', true));
            grid.appendChild(makeStat('Price', filled.length ? finalPrice.toFixed(0) + 'g' : '\u2014', false));
            result.appendChild(grid);

            result.appendChild(el('p', 'isd-forge-footnote',
                'Assumes a pure ore stack (no mixed-pool variance) and a 100% class match. ' +
                'Final DMG = Base ATK \u00D7 average ore multiplier. Price = Final DMG \u00D7 10.'));
        }

        function makeStat(label, value, highlight) {
            var box = el('div', 'isd-forge-stat');
            box.appendChild(el('span', 'isd-forge-stat-label', label));
            box.appendChild(el('span', 'isd-forge-stat-value' + (highlight ? ' highlight' : ''), value));
            return box;
        }

        // ===== RIGHT: ore list =====
        var oresCol = el('div', 'isd-forge-col isd-forge-ores');
        var oreHead = el('div', 'isd-forge-head');
        oreHead.appendChild(el('h3', null, 'Ores'));
        oresCol.appendChild(oreHead);
        oresCol.appendChild(el('div', 'isd-forge-subtext', 'Tap an ore to drop it into the next empty slot.'));

        var oreSearchWrap = el('div', 'isd-forge-searchwrap');
        var oreSearch = el('input', 'isd-forge-search');
        oreSearch.type = 'text';
        oreSearch.placeholder = 'Search ore...';
        oreSearch.addEventListener('input', function () {
            state.oreQuery = oreSearch.value;
            renderOreList();
        });
        oreSearchWrap.appendChild(oreSearch);
        oresCol.appendChild(oreSearchWrap);

        var oreList = el('div', 'isd-forge-list');
        oresCol.appendChild(oreList);

        function renderOreList() {
            oreList.innerHTML = '';
            var q = state.oreQuery.toLowerCase();
            ORES.filter(function (o) { return o.name.toLowerCase().indexOf(q) !== -1; })
                .forEach(function (ore) {
                    var row = el('button', 'isd-forge-row');
                    var dot = el('span', 'isd-forge-dot');
                    dot.style.background = RARITY[ore.rarity].color;
                    dot.style.boxShadow = '0 0 6px ' + RARITY[ore.rarity].color;
                    var name = el('span', 'isd-forge-row-name', ore.name + (ore.hell ? ' \uD83D\uDD25' : ''));
                    var mult = el('span', 'isd-forge-row-mult', '\u00D7' + ore.mult);
                    row.appendChild(dot);
                    row.appendChild(name);
                    row.appendChild(mult);
                    row.addEventListener('click', function () {
                        var idx = state.slots.indexOf(null);
                        if (idx === -1) return;
                        state.slots[idx] = ore;
                        renderSlots();
                        renderResult();
                    });
                    oreList.appendChild(row);
                });
        }

        wrap.appendChild(preview);
        wrap.appendChild(center);
        wrap.appendChild(oresCol);
        container.appendChild(wrap);

        renderWeaponList();
        renderSlots();
        renderResult();
        renderOreList();
    }

    mw.hook('wikipage.content').add(function () {
        var container = document.getElementById('isd-forge-calc');
        if (container && !container.dataset.isdForgeBuilt) {
            container.dataset.isdForgeBuilt = 'true';
            buildForgeCalculator(container);
        }
    });
})();