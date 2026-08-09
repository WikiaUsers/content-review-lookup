// Please tell us the line if theres any problem thank you!
/* Load Playfair Display font */
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
        
        function resolveImageSrc(card, d) {
            var direct = safeImageSrc(d.image);
            if (direct) return direct;
            var thumb = card.querySelector('.isd-grid-img img, .isd-item-card img');
            return thumb ? safeImageSrc(thumb.src) : '';
        }

        function setCardImage(wrapEl, imgEl, src) {
            imgEl.onerror = null;
            if (!src) {
                wrapEl.classList.add('isd-no-image');
                imgEl.removeAttribute('src');
                return;
            }
            wrapEl.classList.remove('isd-no-image');
            imgEl.onerror = function () {
                wrapEl.classList.add('isd-no-image');
            };
            imgEl.src = src;
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

        //  modal
        var overlay = document.createElement('div');
        overlay.className = 'isd-item-modal-overlay';
        overlay.innerHTML =
            '<div class="isd-item-modal">' +
                '<div class="isd-item-modal-header">' +
                    '<span class="isd-item-modal-title"></span>' +
                    '<span class="isd-item-modal-close">&times;</span>' +
                '</div>' +
                '<div class="isd-item-modal-img-wrap">' +
                    '<img class="isd-item-modal-img" src="" alt="">' +
                    '<div class="isd-item-modal-img-fallback">No image yet</div>' +
                '</div>' +
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
            setCardImage(
                overlay.querySelector('.isd-item-modal-img-wrap'),
                overlay.querySelector('.isd-item-modal-img'),
                resolveImageSrc(card, d)
            );
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

        // Hover
        var tooltip = document.createElement('div');
        tooltip.className = 'isd-item-tooltip';
        tooltip.innerHTML =
            '<div class="isd-item-tooltip-header"></div>' +
            '<div class="isd-item-tooltip-img-wrap">' +
                '<img src="" alt="">' +
                '<div class="isd-item-tooltip-img-fallback">No image yet</div>' +
            '</div>' +
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
            setCardImage(
                tooltip.querySelector('.isd-item-tooltip-img-wrap'),
                tooltip.querySelector('.isd-item-tooltip-img-wrap img'),
                resolveImageSrc(card, d)
            );

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

            // vertical clamp
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

        // For each grid attach card clicks + build a toolbar above it 
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

/* sidebar */
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

/* Copy Code Button */
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

/* Expired Codes dropdown */
mw.hook('wikipage.content').add(function ($content) {
    $content.on('click', '.isd-expired-header', function () {
        var $header = $(this);
        $header.toggleClass('isd-expired-open');
        $header.next('.isd-expired-body').toggleClass('isd-expired-open');
    });
});

(function () {
    function initSkillTree() {
        var wrap = document.getElementById('isd-skills-wrap');
        if (!wrap) return;

        var slots = wrap.querySelectorAll('.isd-skill-slot');

        slots.forEach(function (slot) {
            slot.addEventListener('click', function (e) {
                e.stopPropagation();
                var isActive = slot.classList.contains('isd-skill-active');
                slots.forEach(function (s) {
                    s.classList.remove('isd-skill-active');
                });
                if (!isActive) {
                    slot.classList.add('isd-skill-active');
                }
            });
        });

        document.addEventListener('click', function () {
            slots.forEach(function (s) {
                s.classList.remove('isd-skill-active');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkillTree);
    } else {
        initSkillTree();
    }
})();

(function () {
    function initShop() {
        var root = document.getElementById('isd-shop-root');
        if (!root) return;

        var tabs = root.querySelectorAll('.isd-shop-tab');
        var panels = root.querySelectorAll('.isd-shop-panel');
        var toolbar = document.getElementById('isd-shop-toolbar');

        // Build search input + category dropdown via DOM (never raw HTML in wikitext)
        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'isd-shop-search-input';
        searchInput.placeholder = 'Search items...';

        var categorySelect = document.createElement('select');
        categorySelect.className = 'isd-shop-category-select';
        var categories = ['All', 'Potions', 'Ores', 'Items'];
        categories.forEach(function (cat) {
            var opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            categorySelect.appendChild(opt);
        });

        toolbar.appendChild(searchInput);
        toolbar.appendChild(categorySelect);

        function getActivePanel() {
            return root.querySelector('.isd-shop-panel[data-panel="' +
                root.querySelector('.isd-shop-tab-active').getAttribute('data-tab') + '"]');
        }

        function applyFilters() {
            var query = searchInput.value.trim().toLowerCase();
            var cat = categorySelect.value;
            var panel = getActivePanel();
            if (!panel) return;

            var cards = panel.querySelectorAll('.isd-shop-card');
            var visibleCount = 0;

            cards.forEach(function (card) {
                var name = (card.getAttribute('data-name') || '').toLowerCase();
                var cardCat = card.getAttribute('data-category') || '';
                var matchesSearch = name.indexOf(query) !== -1;
                var matchesCat = (cat === 'All') || (cardCat === cat);

                if (matchesSearch && matchesCat) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            var emptyMsg = panel.querySelector('.isd-shop-empty-msg');
            if (emptyMsg) {
                emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('isd-shop-tab-active'); });
                tab.classList.add('isd-shop-tab-active');

                var target = tab.getAttribute('data-tab');
                panels.forEach(function (panel) {
                    panel.style.display = (panel.getAttribute('data-panel') === target) ? '' : 'none';
                });

                applyFilters();
            });
        });

        searchInput.addEventListener('input', applyFilters);
        categorySelect.addEventListener('change', applyFilters);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShop);
    } else {
        initShop();
    }
})();