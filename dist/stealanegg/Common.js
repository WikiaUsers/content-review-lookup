(function () {
    function initSaeGalleryFilter() {
        var wraps = document.querySelectorAll('.sae-gallery-wrap');
        if (!wraps.length) return;

        wraps.forEach(function (wrap) {
            if (wrap.dataset.filterReady) return;
            wrap.dataset.filterReady = '1';

            var searchBox = wrap.querySelector('.sae-gallery-search');
            var chips = wrap.querySelectorAll('.sae-filter-chip');
            var cards = wrap.querySelectorAll('.sae-item-card');
            var emptyMsg = wrap.querySelector('.sae-gallery-empty');
            var activeRarity = 'all';

            if (searchBox) {
                searchBox.setAttribute('contenteditable', 'true');
                searchBox.setAttribute('tabindex', '0');
            }

            function applyFilters() {
                var query = (searchBox ? searchBox.textContent : '').trim().toLowerCase();
                var visibleCount = 0;

                cards.forEach(function (card) {
                    var name = (card.dataset.name || '').toLowerCase();
                    var rarity = card.dataset.rarity || '';

                    var matchesSearch = !query || name.indexOf(query) !== -1;
                    var matchesRarity = activeRarity === 'all' || rarity === activeRarity;

                    if (matchesSearch && matchesRarity) {
                        card.classList.remove('sae-hidden');
                        visibleCount++;
                    } else {
                        card.classList.add('sae-hidden');
                    }
                });

                if (emptyMsg) {
                    emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            }

            if (searchBox) {
                searchBox.addEventListener('input', applyFilters);
                searchBox.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') e.preventDefault();
                });
            }

            chips.forEach(function (chip) {
                chip.addEventListener('click', function () {
                    chips.forEach(function (c) { c.classList.remove('sae-filter-active'); });
                    chip.classList.add('sae-filter-active');
                    activeRarity = chip.dataset.rarity;
                    applyFilters();
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaeGalleryFilter);
    } else {
        initSaeGalleryFilter();
    }
    mw.hook('wikipage.content').add(initSaeGalleryFilter);
})();

(function () {
    var rarityColors = {
        Basic: '#d4d4d8', Common: '#9ca3af', Uncommon: '#4ade80', Rare: '#38bdf8',
        SuperRare: '#22d3ee', Epic: '#a855f7', Mythic: '#ec4899', Mythical: '#fb7185',
        Legendary: '#eab308', Exotic: '#2dd4bf', Titan: '#94a3b8', Limited: '#fb923c',
        Eternal: '#ff9900', Celestial: '#7dd3fc', Divine: '#ffe28a', Cosmic: '#a5b4fc',
        Superior: '#fbbf24', Secret: '#f5f5f5', Exclusive: '#ef4444', BrainrotGod: '#7bc450',
        Transcendent: '#ffffff', Rainbow: '#ff8fd6', Prismatic: '#c4b5fd', Event: '#fb923c'
    };

    var popupInitialized = false;

    function initSaePopups() {
        var cards = document.querySelectorAll('.sae-item-card');
        if (!cards.length) return;

        if (!popupInitialized) {
            popupInitialized = true;

            var popup = document.createElement('div');
            popup.className = 'sae-fixed-popup';
            popup.innerHTML =
                '<div class="sae-fixed-popup-title"></div>' +
                '<hr class="sae-fixed-popup-rule">' +
                '<div class="sae-fixed-popup-rarity"></div>' +
                '<div class="sae-fixed-popup-income"></div>' +
                '<div class="sae-fixed-popup-biome"></div>';
            document.body.appendChild(popup);

            var titleEl = popup.querySelector('.sae-fixed-popup-title');
            var rarityEl = popup.querySelector('.sae-fixed-popup-rarity');
            var incomeEl = popup.querySelector('.sae-fixed-popup-income');
            var biomeEl = popup.querySelector('.sae-fixed-popup-biome');

            function showPopup(card) {
                var d = card.dataset;
                titleEl.textContent = d.name || '';
                rarityEl.textContent = d.rarity || '';
                rarityEl.style.color = rarityColors[d.rarity] || '#eef2e6';
                incomeEl.textContent = d.income || '';
                biomeEl.textContent = d.biome ? 'Found in: ' + d.biome : '';

                var rect = card.getBoundingClientRect();
                var popupWidth = 190;
                var gap = 10;
                var left = rect.right + gap;

                if (left + popupWidth > window.innerWidth) {
                    left = rect.left - popupWidth - gap;
                }
                if (left < 5) left = 5;

                popup.style.left = left + 'px';
                popup.style.top = rect.top + 'px';
                popup.classList.add('sae-active');

                var popupRect = popup.getBoundingClientRect();
                var top = rect.top;
                if (popupRect.bottom > window.innerHeight) {
                    top = window.innerHeight - popupRect.height - 10;
                }
                if (top < 5) top = 5;
                popup.style.top = top + 'px';
            }

            function hidePopup() {
                popup.classList.remove('sae-active');
            }

            window.saeShowPopup = showPopup;
            window.saeHidePopup = hidePopup;
        }

        cards.forEach(function (card) {
            if (card.dataset.popupBound) return;
            card.dataset.popupBound = '1';

            var img = card.querySelector('img');
            if (img) img.setAttribute('draggable', 'false');

            card.addEventListener('mouseenter', function () { window.saeShowPopup(card); });
            card.addEventListener('mouseleave', function () { window.saeHidePopup(); });

            card.addEventListener('click', function (e) {
                if (window.matchMedia('(hover: hover)').matches) return;
                e.preventDefault();
                window.saeShowPopup(card);
                setTimeout(function () {
                    document.addEventListener('click', function closeOnce(ev) {
                        if (!ev.target.closest('.sae-item-card')) {
                            window.saeHidePopup();
                        }
                        document.removeEventListener('click', closeOnce);
                    });
                }, 0);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaePopups);
    } else {
        initSaePopups();
    }
    mw.hook('wikipage.content').add(initSaePopups);
})();
/* SAE Update*/
(function () {
    var newsInitialized = false;

    function initSaeNews() {
        if (newsInitialized) return;

        var panel = document.querySelector('.sae-news-panel');
        if (!panel) return;

        var items = panel.querySelectorAll('.sae-news-item');
        var articles = panel.querySelectorAll('.sae-news-article');
        if (!items.length) return;

        newsInitialized = true;

        items.forEach(function (item) {
            item.addEventListener('click', function () {
                var target = item.getAttribute('data-news');

                items.forEach(function (i) { i.classList.remove('sae-news-item-active'); });
                item.classList.add('sae-news-item-active');

                articles.forEach(function (a) {
                    a.classList.toggle('sae-news-active', a.getAttribute('data-news') === target);
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaeNews);
    } else {
        initSaeNews();
    }
    mw.hook('wikipage.content').add(initSaeNews);
})();
/* SAE weekly recurring countdown timer */
(function () {
    function initSaeCountdown() {
        var box = document.getElementById('sae-countdown-target');
        if (!box || box.dataset.countdownReady) return;
        box.dataset.countdownReady = '1';

        var anchor = new Date(box.getAttribute('data-target')).getTime();
        var weekMs = 7 * 24 * 60 * 60 * 1000;

        var daysEl = box.querySelector('.sae-cd-days');
        var hoursEl = box.querySelector('.sae-cd-hours');
        var minutesEl = box.querySelector('.sae-cd-minutes');
        var secondsEl = box.querySelector('.sae-cd-seconds');

        function tick() {
            var now = Date.now();
            var target = anchor;

            while (target <= now) {
                target += weekMs;
            }

            var diff = target - now;

            var days = Math.floor(diff / (24 * 60 * 60 * 1000));
            var hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            var minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
            var seconds = Math.floor((diff % (60 * 1000)) / 1000);

            if (daysEl) daysEl.textContent = days;
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        tick();
        setInterval(tick, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaeCountdown);
    } else {
        initSaeCountdown();
    }
    mw.hook('wikipage.content').add(initSaeCountdown);
})();
/* SAE Treadmill */
(function () {
    var rarityColors = {
        Common: '#979797', Basic: '#979797', Uncommon: '#00ff00', Celestial: '#00dd42',
        SuperRare: '#19d8fa', Rare: '#1990ff', Epic: '#c402ff', Legendary: '#ff8522',
        BrainrotGod: '#ac00c6', Mythical: '#ff2b64', Mythic: '#ff2b64', Rainbow: '#f0229d',
        Prismatic: '#f0229d', Exclusive: '#ad4fff', Admin: '#ad4fff', Cosmic: '#8a7bff',
        Secret: '#f0f0f0', Exotic: '#ff1dfb', Limited: '#ad4fff', Eternal: '#ff8fed',
        Superior: '#c3ffff', Transcendent: '#c3ffff', Divine: '#fbff8a', Titan: '#ff4040'
    };

    var popupInitialized = false;

    function initTreadmillPopups() {
        var cards = document.querySelectorAll('.sae-tm-card');
        if (!cards.length) return;

        if (!popupInitialized) {
            popupInitialized = true;

            var popup = document.createElement('div');
            popup.className = 'sae-tm-fixed-popup';
            popup.innerHTML =
                '<div class="sae-tm-popup-title"></div>' +
                '<hr class="sae-tm-popup-rule">' +
                '<div class="sae-tm-popup-rarity"></div>' +
                '<div class="sae-tm-popup-multiplier"></div>' +
                '<div class="sae-tm-popup-price"></div>';
            document.body.appendChild(popup);

            var titleEl = popup.querySelector('.sae-tm-popup-title');
            var rarityEl = popup.querySelector('.sae-tm-popup-rarity');
            var multEl = popup.querySelector('.sae-tm-popup-multiplier');
            var priceEl = popup.querySelector('.sae-tm-popup-price');

            function showPopup(card) {
                var d = card.dataset;
                titleEl.textContent = d.name || '';
                rarityEl.textContent = d.rarity || '';
                rarityEl.style.color = rarityColors[d.rarity] || '#eef2e6';
                multEl.textContent = d.multiplier ? d.multiplier + ' Speed Multiplier' : '';
                priceEl.textContent = d.price ? 'Price: ' + d.price : '';

                var rect = card.getBoundingClientRect();
                var popupWidth = 200;
                var gap = 10;
                var left = rect.right + gap;

                if (left + popupWidth > window.innerWidth) {
                    left = rect.left - popupWidth - gap;
                }
                if (left < 5) left = 5;

                popup.style.left = left + 'px';
                popup.style.top = rect.top + 'px';
                popup.classList.add('sae-tm-active');

                var popupRect = popup.getBoundingClientRect();
                var top = rect.top;
                if (popupRect.bottom > window.innerHeight) {
                    top = window.innerHeight - popupRect.height - 10;
                }
                if (top < 5) top = 5;
                popup.style.top = top + 'px';
            }

            function hidePopup() {
                popup.classList.remove('sae-tm-active');
            }

            window.saeShowTreadmillPopup = showPopup;
            window.saeHideTreadmillPopup = hidePopup;
        }

        cards.forEach(function (card) {
            if (card.dataset.popupBound) return;
            card.dataset.popupBound = '1';

            var img = card.querySelector('img');
            if (img) img.setAttribute('draggable', 'false');

            card.addEventListener('mouseenter', function () { window.saeShowTreadmillPopup(card); });
            card.addEventListener('mouseleave', function () { window.saeHideTreadmillPopup(); });

            card.addEventListener('click', function (e) {
                if (window.matchMedia('(hover: hover)').matches) return;
                e.preventDefault();
                window.saeShowTreadmillPopup(card);
                setTimeout(function () {
                    document.addEventListener('click', function closeOnce(ev) {
                        if (!ev.target.closest('.sae-tm-card')) {
                            window.saeHideTreadmillPopup();
                        }
                        document.removeEventListener('click', closeOnce);
                    });
                }, 0);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTreadmillPopups);
    } else {
        initTreadmillPopups();
    }
    mw.hook('wikipage.content').add(initTreadmillPopups);
})();
/* SAE Items card */
(function () {
    var itemsTooltipInitialized = false;

    var rarityColors = {
        Common: '#9ca3af', Uncommon: '#4ade80', Rare: '#38bdf8',
        Epic: '#a855f7', Legendary: '#eab308'
    };

    function initItemsTooltip() {
        if (itemsTooltipInitialized) return;

        var cards = document.querySelectorAll('.sae-items-card');
        if (!cards.length) return;

        itemsTooltipInitialized = true;

        var tooltip = document.createElement('div');
        tooltip.className = 'sae-items-tooltip';
        tooltip.innerHTML =
            '<div class="sae-items-tooltip-header"></div>' +
            '<div class="sae-items-tooltip-rarity"></div>' +
            '<div class="sae-items-tooltip-mps"></div>' +
            '<div class="sae-items-tooltip-rewards"></div>';
        document.body.appendChild(tooltip);

        var headerEl = tooltip.querySelector('.sae-items-tooltip-header');
        var rarityEl = tooltip.querySelector('.sae-items-tooltip-rarity');
        var mpsEl = tooltip.querySelector('.sae-items-tooltip-mps');
        var rewardsEl = tooltip.querySelector('.sae-items-tooltip-rewards');

        function showTooltip(card) {
            var d = card.dataset;
            headerEl.textContent = d.name || '';
            rarityEl.textContent = d.rarity || '';
            rarityEl.style.color = rarityColors[d.rarity] || '#eef2e6';
            mpsEl.textContent = d.mps || '';
            rewardsEl.textContent = d.rewards ? 'Rewards: ' + d.rewards : '';

            var rect = card.getBoundingClientRect();
            var tooltipWidth = 200;
            var gap = 12;
            var left = rect.right + gap;

            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - gap;
            }
            if (left < 5) left = 5;

            tooltip.style.left = left + 'px';
            tooltip.style.top = rect.top + 'px';
            tooltip.classList.add('sae-items-active');

            var tooltipRect = tooltip.getBoundingClientRect();
            var top = rect.top;
            if (tooltipRect.bottom > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }
            if (top < 5) top = 5;
            tooltip.style.top = top + 'px';
        }

        function hideTooltip() {
            tooltip.classList.remove('sae-items-active');
        }

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () { showTooltip(card); });
            card.addEventListener('mouseleave', hideTooltip);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initItemsTooltip);
    } else {
        initItemsTooltip();
    }
    mw.hook('wikipage.content').add(initItemsTooltip);
})();
var rarityColors = {
    Basic: '#979797', Common: '#979797', Uncommon: '#00ff00', Celestial: '#00dd42',
    SuperRare: '#19d8fa', Rare: '#1990ff', Epic: '#c402ff', Legendary: '#ff8522',
    Mythical: '#ff2b64', Mythic: '#ff2b64', Cosmic: '#8a7bff', Exclusive: '#ad4fff',
    Admin: '#ad4fff', Limited: '#ad4fff', Exotic: '#ff8ffa', Secret: '#f0f0f0',
    Superior: '#c3ffff', Transcendent: '#c3ffff', Eternal: '#ff8fed', Divine: '#fbff8a',
    Titan: '#ff9999', BrainrotGod: '#e090ff', Rainbow: '#ff8fd6', Prismatic: '#ff8fd6'
};
/* SAE Pet dropdown*/
(function () {
    function initSaeGalleryFilter() {
        var wraps = document.querySelectorAll('.sae-gallery-wrap');
        if (!wraps.length) return;

        wraps.forEach(function (wrap) {
            var searchBox = wrap.querySelector('.sae-gallery-search');
            var cards = wrap.querySelectorAll('.sae-item-card');
            var emptyMsg = wrap.querySelector('.sae-gallery-empty');
            var dropdowns = wrap.querySelectorAll('.sae-dropdown');

            if (!wrap.dataset.filterState) {
                wrap.dataset.filterState = JSON.stringify({ rarity: 'all', biome: 'all' });
            }

            function getState() {
                return JSON.parse(wrap.dataset.filterState);
            }
            function setState(state) {
                wrap.dataset.filterState = JSON.stringify(state);
            }

            if (searchBox && !searchBox.dataset.bound) {
                searchBox.dataset.bound = '1';
                searchBox.setAttribute('contenteditable', 'true');
                searchBox.setAttribute('tabindex', '0');
                searchBox.addEventListener('input', applyFilters);
                searchBox.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') e.preventDefault();
                });
            }

            function applyFilters() {
                var state = getState();
                var query = (searchBox ? searchBox.textContent : '').trim().toLowerCase();
                var visibleCount = 0;

                cards.forEach(function (card) {
                    var name = (card.dataset.name || '').toLowerCase();
                    var rarity = card.dataset.rarity || '';
                    var biome = card.dataset.biome || '';

                    var matchesSearch = !query || name.indexOf(query) !== -1;
                    var matchesRarity = state.rarity === 'all' || rarity === state.rarity;
                    var matchesBiome = state.biome === 'all' || biome === state.biome;

                    if (matchesSearch && matchesRarity && matchesBiome) {
                        card.classList.remove('sae-hidden');
                        visibleCount++;
                    } else {
                        card.classList.add('sae-hidden');
                    }
                });

                if (emptyMsg) {
                    emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            }

            dropdowns.forEach(function (dd) {
                if (dd.dataset.bound) return;
                dd.dataset.bound = '1';

                var filterType = dd.dataset.filter;
                var toggle = dd.querySelector('.sae-dropdown-toggle');
                var options = dd.querySelectorAll('.sae-dropdown-option');
                var label = filterType === 'rarity' ? 'Rarity' : 'Biome';

                toggle.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var wasOpen = dd.classList.contains('sae-dropdown-open');
                    document.querySelectorAll('.sae-dropdown-open').forEach(function (d) {
                        d.classList.remove('sae-dropdown-open');
                    });
                    if (!wasOpen) dd.classList.add('sae-dropdown-open');
                });

                options.forEach(function (opt) {
                    opt.addEventListener('click', function (e) {
                        e.stopPropagation();
                        options.forEach(function (o) { o.classList.remove('sae-dropdown-active'); });
                        opt.classList.add('sae-dropdown-active');

                        var value = opt.dataset.value;
                        toggle.textContent = label + ': ' + opt.textContent + ' ▾';
                        dd.classList.remove('sae-dropdown-open');

                        var state = getState();
                        state[filterType] = value;
                        setState(state);
                        applyFilters();
                    });
                });
            });
        });
    }

    document.addEventListener('click', function () {
        document.querySelectorAll('.sae-dropdown-open').forEach(function (d) {
            d.classList.remove('sae-dropdown-open');
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaeGalleryFilter);
    } else {
        initSaeGalleryFilter();
    }
    mw.hook('wikipage.content').add(initSaeGalleryFilter);
})();
/* SAE Events */
(function () {
    var eventsSliderInitialized = false;
    function initSaeEventsSlider() {
        if (eventsSliderInitialized) return;
        var slider = document.querySelector('.sae-events-slider');
        if (!slider) return;
        var slides = slider.querySelectorAll('.sae-events-slide');
        var dots = document.querySelectorAll('.sae-events-dot');
        if (slides.length < 2) return;
        eventsSliderInitialized = true;
        var current = 0;
        function goTo(index) {
            slides.forEach(function (s) { s.classList.remove('sae-slide-active'); });
            dots.forEach(function (d) { d.classList.remove('sae-dot-active'); });
            slides[index].classList.add('sae-slide-active');
            dots[index].classList.add('sae-dot-active');
            current = index;
        }
        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () { goTo(i); });
        });
        setInterval(function () {
            goTo((current + 1) % slides.length);
        }, 5000);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaeEventsSlider);
    } else {
        initSaeEventsSlider();
    }
    mw.hook('wikipage.content').add(initSaeEventsSlider);
})();
/* SAE slider */
(function () {
    var eventsSliderInitialized = false;
    function initSaeEventsSlider() {
        if (eventsSliderInitialized) return;
        var slider = document.querySelector('.sae-events-slider');
        if (!slider) return;
        var slides = slider.querySelectorAll('.sae-events-slide');
        var dots = document.querySelectorAll('.sae-events-dot');
        var leftArrow = slider.querySelector('.sae-events-arrow-left');
        var rightArrow = slider.querySelector('.sae-events-arrow-right');
        if (slides.length < 2) return;
        eventsSliderInitialized = true;
        var current = 0;
        var timer;

        function goTo(index) {
            slides.forEach(function (s) { s.classList.remove('sae-slide-active'); });
            dots.forEach(function (d) { d.classList.remove('sae-dot-active'); });
            slides[index].classList.add('sae-slide-active');
            dots[index].classList.add('sae-dot-active');
            current = index;
        }

        function next() {
            goTo((current + 1) % slides.length);
        }
        function prev() {
            goTo((current - 1 + slides.length) % slides.length);
        }

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(next, 5000);
        }

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                goTo(i);
                resetTimer();
            });
        });

        if (leftArrow) {
            leftArrow.addEventListener('click', function () {
                prev();
                resetTimer();
            });
        }
        if (rightArrow) {
            rightArrow.addEventListener('click', function () {
                next();
                resetTimer();
            });
        }

        resetTimer();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaeEventsSlider);
    } else {
        initSaeEventsSlider();
    }
    mw.hook('wikipage.content').add(initSaeEventsSlider);
})();


//sae calc
(function(){
var root = document.getElementById("sae-income-calculator-root");
if(!root) return;

var SAE_PETS = [];
try {
    SAE_PETS = JSON.parse(root.getAttribute('data-pets') || '[]');
} catch(e) {
    SAE_PETS = [];
}

var RARITY_ORDER = ["Common","Uncommon","Rare","Epic","Legendary","Mythic","Cosmic","Secret","Eternal","Divine","Brainrot","Monster"];

root.innerHTML = '<div class="sae-calc">'+
'<div class="sae-header">Steal an Egg &mdash; Income Calculator</div>'+
'<div class="sae-grid">'+
'<div class="sae-panel">'+
'<h3>Calculator Inputs</h3>'+
'<input class="sae-search" id="saeSearch" placeholder="Search pets by name...">'+
'<select class="sae-rarity-select" id="saeRaritySelect"></select>'+
'<div class="sae-petgrid" id="saePetGrid"></div>'+
'<div class="sae-selected-card">'+
'<div class="sae-pet-icon" id="saeSelIcon" style="background:#333"></div>'+
'<div><div class="sae-selected-name" id="saeSelName">Select a pet</div>'+
'<div class="sae-selected-meta" id="saeSelMeta">-</div></div>'+
'</div>'+
'<div class="sae-field"><label>Actual Weight (kg)</label>'+
'<div class="sae-weight-row"><input type="number" id="saeWeightInput" min="0" step="0.01" value="0"></div>'+
'<input type="range" class="sae-slider" id="saeWeightSlider" min="0" max="100" value="0" step="0.1">'+
'</div>'+
'<div class="sae-field"><label>Variant (choose any)</label>'+
'<div class="sae-tiles" id="saeVariantTiles"></div></div>'+
'<div class="sae-field"><label>Mutations (choose any)</label>'+
'<div class="sae-tiles" id="saeMutationTiles"></div></div>'+
'</div>'+
'<div class="sae-panel">'+
'<h3>Final Income</h3>'+
'<div class="sae-result-card">'+
'<div class="sae-result-label">Final Income</div>'+
'<div class="sae-result-value" id="saeResultValue">$0/s</div>'+
'<div class="sae-result-badge">Income Output</div>'+
'</div>'+
'<div class="sae-breakdown-toggle" id="saeBreakdownToggle">\u25b8 Stat Breakdown</div>'+
'<div class="sae-breakdown" id="saeBreakdown" style="display:none"></div>'+
'</div>'+
'</div>'+
'</div>';

var RARITY_COLORS = {
Common:"#9e9e9e",Uncommon:"#4caf50",Rare:"#2196f3",Epic:"#9c27b0",
Legendary:"#ff9800",Mythic:"#e91e63",Cosmic:"#673ab7",Secret:"#263238",
Eternal:"#00bcd4",Divine:"#ffca28",Brainrot:"#795548",Monster:"#c62828"
};

var VARIANTS = [
{id:"none",label:"None",mult:1},
{id:"silver",label:"Silver",mult:1.2},
{id:"golden",label:"Golden",mult:2.5},
{id:"rainbow",label:"Rainbow",mult:3.5}
];

var MUTATIONS = [
{id:"bloom",label:"Bloom",mult:1.25},
{id:"spiritbloom",label:"Spirit Bloom",mult:2.5},
{id:"fractured",label:"Fractured",mult:2.75},
{id:"scrambled",label:"Scrambled",mult:2.75},
{id:"parasite",label:"Parasite",mult:3}
];

var state = {rarity:"All", search:"", selected:null, weight:0, variant:"none", mutations:[]};

function fmtMoney(n){
if(n>=1e12) return "$"+(n/1e12).toFixed(2)+"T/s";
if(n>=1e9) return "$"+(n/1e9).toFixed(2)+"B/s";
if(n>=1e6) return "$"+(n/1e6).toFixed(2)+"M/s";
if(n>=1e3) return "$"+(n/1e3).toFixed(2)+"K/s";
return "$"+n.toFixed(2)+"/s";
}

function iconStyle(pet){
if(pet.img){
    return 'background-image:url(\''+pet.img+'\');background-color:'+(RARITY_COLORS[pet.r]||'#333');
}
return 'background:'+(RARITY_COLORS[pet.r]||'#333');
}

function renderRaritySelect(){
var el = document.getElementById("saeRaritySelect");
var options = ["All"].concat(RARITY_ORDER.filter(function(r){
    return SAE_PETS.some(function(p){ return p.r === r; });
}));
el.innerHTML = options.map(function(r){
    return '<option value="'+r+'"'+(r===state.rarity?' selected':'')+'>'+r+'</option>';
}).join("");
el.onchange = function(){
    state.rarity = el.value;
    renderPetGrid();
};
}

function renderPetGrid(){
var el = document.getElementById("saePetGrid");
var list = SAE_PETS.filter(function(p){
return (state.rarity==="All"||p.r===state.rarity) && p.n.toLowerCase().indexOf(state.search.toLowerCase())!==-1;
});
list.sort(function(a,b){
var ai = RARITY_ORDER.indexOf(a.r);
var bi = RARITY_ORDER.indexOf(b.r);
if(ai === -1) ai = RARITY_ORDER.length;
if(bi === -1) bi = RARITY_ORDER.length;
if(ai !== bi) return ai - bi;
return a.n.localeCompare(b.n);
});
el.innerHTML = list.map(function(p){
var sel = state.selected && state.selected.n===p.n ? "selected" : "";
return '<div class="sae-pet '+sel+'" data-n="'+p.n+'">'+
    '<div class="sae-pet-icon" style="'+iconStyle(p)+'"></div>'+
    '<div class="sae-pet-name">'+p.n+'</div>'+
'</div>';
}).join("");
var els = el.querySelectorAll(".sae-pet");
for(var i=0;i<els.length;i++){
els[i].onclick = (function(node){return function(){
var pet = SAE_PETS.filter(function(x){return x.n===node.dataset.n;})[0];
selectPet(pet);
};})(els[i]);
}
}

function selectPet(pet){
state.selected = pet;
state.weight = pet.w;
document.getElementById("saeSelIcon").setAttribute('style', iconStyle(pet));
document.getElementById("saeSelName").textContent = pet.n;
document.getElementById("saeSelMeta").textContent = pet.r+" \u2022 "+pet.b+" \u2022 Base "+fmtMoney(pet.i)+" \u2022 Base Weight "+pet.w+"kg";
document.getElementById("saeWeightInput").value = pet.w;
var slider = document.getElementById("saeWeightSlider");
slider.max = Math.max(pet.w*20,10);
slider.value = pet.w;
renderPetGrid();
compute();
}

function renderTiles(){
var vEl = document.getElementById("saeVariantTiles");
vEl.innerHTML = VARIANTS.map(function(v){
return '<div class="sae-tile '+(state.variant===v.id?'active':'')+'" data-id="'+v.id+'">'+v.label+'<span class="sae-tile-mult">'+v.mult+'x</span></div>';
}).join("");
var vt = vEl.querySelectorAll(".sae-tile");
for(var i=0;i<vt.length;i++){
vt[i].onclick = (function(node){return function(){state.variant=node.dataset.id;renderTiles();compute();};})(vt[i]);
}

var mEl = document.getElementById("saeMutationTiles");
mEl.innerHTML = MUTATIONS.map(function(m){
var active = state.mutations.indexOf(m.id) !== -1;
return '<div class="sae-tile '+(active?'active':'')+'" data-id="'+m.id+'">'+m.label+'<span class="sae-tile-mult">'+m.mult+'x</span></div>';
}).join("");
var mt = mEl.querySelectorAll(".sae-tile");
for(var i=0;i<mt.length;i++){
mt[i].onclick = (function(node){return function(){
var id = node.dataset.id;
var idx = state.mutations.indexOf(id);
if(idx === -1){
    state.mutations.push(id);
} else {
    state.mutations.splice(idx,1);
}
renderTiles();
compute();
};})(mt[i]);
}
}

function weightMultiplier(actualWeight, baseWeight){
if(baseWeight<=0) return {mult:1,formula:"n/a", branch:"n/a", ratio:0};
var ratio = actualWeight/baseWeight;
if(ratio<1){
    return {
        mult:Math.pow(ratio,5/3),
        formula:"(Weight \u00f7 Base)^(5/3)",
        branch:"underweight (below base weight)",
        ratio:ratio
    };
} else if(ratio<=125){
    return {
        mult:Math.pow(ratio,37/60),
        formula:"(Weight \u00f7 Base)^(37/60)",
        branch:"standard (at or above base weight, \u2264125\u00d7)",
        ratio:ratio
    };
} else {
    return {
        mult:Math.pow(ratio,2/5)*Math.pow(125,13/60),
        formula:"(Weight \u00f7 Base)^(2/5) \u00d7 125^(13/60)",
        branch:"post-cap (>125\u00d7 base weight)",
        ratio:ratio
    };
}
}

function combinedBonus(variant, mutations){
var parts = [];
var bonusSum = 0;

if(variant && variant.mult > 1){
    var vBonus = variant.mult - 1;
    bonusSum += vBonus;
    parts.push({label: variant.label, raw: variant.mult, bonus: vBonus});
}

mutations.forEach(function(id){
    var m = MUTATIONS.filter(function(x){return x.id===id;})[0];
    if(m){
        var mBonus = m.mult - 1;
        bonusSum += mBonus;
        parts.push({label: m.label, raw: m.mult, bonus: mBonus});
    }
});

return {mult: 1 + bonusSum, parts: parts};
}

function compute(){
var bd = document.getElementById("saeBreakdown");
if(!state.selected){
document.getElementById("saeResultValue").textContent = "$0/s";
bd.innerHTML = "";
return;
}
var pet = state.selected;
var w = state.weight;
var wm = weightMultiplier(w, pet.w);
var variant = VARIANTS.filter(function(v){return v.id===state.variant;})[0];

var cb = combinedBonus(variant, state.mutations);

var afterBase = pet.i;
var afterWeight = afterBase * wm.mult;
var final = afterWeight * cb.mult;

document.getElementById("saeResultValue").textContent = fmtMoney(final);

var partsRows = cb.parts.length === 0
    ? '<div class="sae-break-sub-row"><span>None selected</span><span class="sae-break-sub-val">+0%</span></div>'
    : cb.parts.map(function(p){
        return '<div class="sae-break-sub-row"><span>'+p.label+' ('+p.raw+'x)</span><span class="sae-break-sub-val">+'+(p.bonus*100).toFixed(0)+'%</span></div>';
      }).join('');

var bonusFormulaParts = cb.parts.map(function(p){ return '('+p.raw+' \u2212 1)'; }).join(' + ');
if(bonusFormulaParts === '') bonusFormulaParts = '0';

bd.innerHTML =
'<div class="sae-break-row"><span class="sae-break-label">1. Base Income<span class="sae-break-sub">'+pet.n+' at '+pet.w+'kg, no bonuses</span></span><span class="sae-break-val">'+fmtMoney(afterBase)+'</span></div>'+

'<div class="sae-break-row"><span class="sae-break-label">2. Weight Multiplier<span class="sae-break-sub">'+w+'kg / '+pet.w+'kg base &mdash; '+wm.branch+'</span></span><span class="sae-break-val">'+wm.mult.toFixed(4)+'x</span></div>'+
'<div class="sae-break-formula">ratio = '+w+' \u00f7 '+pet.w+' = '+wm.ratio.toFixed(4)+'<br>weight_mult = '+wm.formula+' = '+wm.ratio.toFixed(4)+'^exp = '+wm.mult.toFixed(4)+'x</div>'+
'<div class="sae-break-sub-row"><span>Income after weight (Base &times; Weight Mult.)</span><span class="sae-break-sub-val">'+fmtMoney(afterWeight)+'</span></div>'+

'<div class="sae-break-row"><span class="sae-break-label">3. Combined Bonus<span class="sae-break-sub">Variant + mutations stack additively: 1 + &Sigma;(each multiplier &minus; 1)</span></span><span class="sae-break-val">'+cb.mult.toFixed(3)+'x</span></div>'+
'<div class="sae-break-formula">combined = 1 + '+bonusFormulaParts+' = '+cb.mult.toFixed(3)+'x</div>'+
partsRows+

'<div class="sae-break-row"><span class="sae-break-label" style="font-weight:700;color:#e8f7ec">Final Income<span class="sae-break-sub">'+fmtMoney(afterWeight)+' &times; '+cb.mult.toFixed(3)+'x</span></span><span class="sae-break-val" style="font-size:16px">'+fmtMoney(final)+'</span></div>';
}

document.getElementById("saeSearch").oninput = function(e){state.search=e.target.value;renderPetGrid();};
document.getElementById("saeWeightInput").oninput = function(e){state.weight=parseFloat(e.target.value)||0;document.getElementById("saeWeightSlider").value=state.weight;compute();};
document.getElementById("saeWeightSlider").oninput = function(e){state.weight=parseFloat(e.target.value)||0;document.getElementById("saeWeightInput").value=state.weight;compute();};

var toggle = document.getElementById("saeBreakdownToggle");
toggle.onclick = function(){
var bdEl = document.getElementById("saeBreakdown");
var open = bdEl.style.display !== "none";
bdEl.style.display = open ? "none" : "block";
toggle.textContent = (open ? "\u25b8" : "\u25be") + " Stat Breakdown";
};

renderRaritySelect();
renderPetGrid();
renderTiles();
})();