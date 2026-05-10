mw.hook('wikipage.content').add(function ($content) {

    // Expand button logic for Mobile - global to all cards
    $content.off('click', '.ao-expand-btn').on('click', '.ao-expand-btn', function (e) {
        e.preventDefault();
        var $btn = $(this);
        var $card = $btn.closest('.ao-item-card');

        if ($card.hasClass('is-expanded')) {
            $card.removeClass('is-expanded');
            $btn.text('[Expand]');
        } else {
            $card.addClass('is-expanded');
            $btn.text('[Collapse]');
        }
    });

    // Tooltip follow mouse logic for Desktop
    $content.off('mouseenter', '.ao-item-card').on('mouseenter', '.ao-item-card', function () {
        if ($(window).width() <= 768) return; // Skip on mobile
        $('.ao-cloned-tooltip').remove();
        var $orig = $(this).find('.ao-item-tooltip');
        if ($orig.length) {
            $orig.clone().addClass('ao-cloned-tooltip').appendTo('body');
        }
    });

    $content.off('mouseleave', '.ao-item-card').on('mouseleave', '.ao-item-card', function () {
        $('.ao-cloned-tooltip').remove();
    });

    $content.off('mousemove', '.ao-item-card').on('mousemove', '.ao-item-card', function (e) {
        if ($(window).width() <= 768) return;
        var $tooltip = $('.ao-cloned-tooltip');
        if ($tooltip.length) {
            var x = e.clientX + 15;
            var y = e.clientY + 15;
            
            var w = $tooltip.outerWidth() || 260;
            var h = $tooltip.outerHeight() || 150;
            
            if (window.innerWidth && x + w > window.innerWidth) {
                x = e.clientX - w - 15;
            }
            if (window.innerHeight && y + h > window.innerHeight) {
                y = window.innerHeight - h - 15;
            }
            
            $tooltip.css({
                left: x + 'px',
                top: y + 'px',
                transform: 'none',
                margin: '0'
            });
        }
    });

    var $browserItems = $content.find('.ao-items-browser');
    if ($browserItems.length) {
        var $hostItems = $browserItems.find('.ao-filter-host');
        if ($hostItems.length && !$hostItems.data('initialized')) {
            $hostItems.data('initialized', true);

            var types = ['All'];
            $browserItems.find('.ao-item-card').each(function () {
                var t = $(this).attr('data-ao-type');
                if (t && types.indexOf(t) === -1) types.push(t);
            });

            var $bar = $('<div class="ao-filter-bar"></div>');
            $.each(types, function (i, t) {
                $('<div class="ao-filter-button"></div>')
                    .text(t).attr('data-type', t)
                    .addClass(t === 'All' ? 'is-active' : '')
                    .appendTo($bar);
            });

            var $search = $('<div class="ao-search-wrap"><div class="ao-search-icon">🔍</div><input class="ao-search-input" type="text" placeholder="Search items..." /></div>');
            $bar.append($search).appendTo($hostItems);

            var $buttons = $bar.find('.ao-filter-button');
            var $input = $bar.find('.ao-search-input');
            var $sections = $browserItems.find('.ao-type-section');

            function filterItems() {
                var type = $bar.find('.is-active').attr('data-type');
                var query = $input.val().toLowerCase();

                $sections.each(function () {
                    var $sec = $(this);
                    var secVisible = false;

                    $sec.find('.ao-set-section').each(function () {
                        var $set = $(this);
                        var setVisible = false;

                        $set.find('.ao-item-card').each(function () {
                            var $card = $(this);
                            var matches = (type === 'All' || $card.attr('data-ao-type') === type) &&
                                ($card.attr('data-ao-name').toLowerCase().indexOf(query) !== -1);

                            if (matches) { $card.show(); setVisible = true; secVisible = true; }
                            else { $card.hide(); }
                        });
                        $set.toggle(setVisible);
                    });
                    $sec.toggle(secVisible);
                });
            }

            $buttons.on('click', function () {
                $buttons.removeClass('is-active');
                $(this).addClass('is-active');
                filterItems();
            });

            $input.on('input', filterItems);
        }
    }

    var $browserUnits = $content.find('.utdx-units-browser');
    if ($browserUnits.length) {
        var $hostUnits = $browserUnits.find('.utdx-filter-host');
        if ($hostUnits.length && !$hostUnits.data('initialized')) {
            $hostUnits.data('initialized', true);

            var rarities = ["Boundless", "Secret", "Exclusive", "Mythic", "Legendary", "Epic", "Rare"];
            var elements = ["Physical", "Magic", "Fire", "Water", "Wind", "Light", "Dark", "Ice", "Rose"];

            $browserUnits.find('.utdx-list-card').each(function () {
                var eStr = $(this).attr('data-utdx-element') || "";
                eStr.split(/,\s*/).forEach(function (el) {
                    el = el.trim();
                    if (el && elements.indexOf(el) === -1) elements.push(el);
                });
            });

            var $main = $('<div class="utdx-filter-main"></div>');
            var $searchWrap = $('<div class="utdx-search-wrap"></div>');

            $searchWrap.append('<div class="utdx-search-icon"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg></div>');
            var $uInput = $('<input class="utdx-search-input" type="text" placeholder="Search..." />');
            $searchWrap.append($uInput);

            var svgFunnel = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3 5a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1zm3 5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"/></svg>';
            var $filterToggle = $('<div class="utdx-action-btn" title="Toggle Filters">' + svgFunnel + '</div>');

            $main.append($searchWrap, $filterToggle).appendTo($hostUnits);
            var $menus = $('<div class="utdx-filter-menus"></div>').appendTo($hostUnits);

            function buildGroup(title, list, attr, isMulti) {
                var $group = $('<div class="utdx-filter-group"></div>');
                $('<div class="utdx-filter-group-title"></div>').text(title).appendTo($group);
                var $btns = $('<div class="utdx-filter-buttons"></div>').appendTo($group);

                $.each(list, function (i, val) {
                    var totalCount = 0;
                    $browserUnits.find('.utdx-list-card').each(function () {
                        var itemVal = $(this).attr(attr) || "";
                        if (isMulti) { if (itemVal.split(/,\s*/).indexOf(val) !== -1) totalCount++; }
                        else { if (itemVal === val) totalCount++; }
                    });

                    var countSpan = '<span class="utdx-count ' + (totalCount > 0 ? 'has-items' : 'no-items') + '">' + totalCount + '</span>';
                    $('<div class="utdx-filter-btn"></div>')
                        .attr('data-filter', val).attr('data-attr', attr)
                        .html(val + '(' + countSpan + ')')
                        .appendTo($btns);
                });
                return $group;
            }

            $menus.append(buildGroup("Rarity", rarities, "data-utdx-rarity", false));
            $menus.append(buildGroup("Elements", elements, "data-utdx-element", true));

            var $uCards = $browserUnits.find('.utdx-list-card');
            var $uFilterBtns = $menus.find('.utdx-filter-btn');

            function updateUnitFilters() {
                var query = $uInput.val().toLowerCase().trim();
                var activeRarity = $menus.find('.utdx-filter-btn.is-active[data-attr="data-utdx-rarity"]').attr('data-filter');
                var activeElement = $menus.find('.utdx-filter-btn.is-active[data-attr="data-utdx-element"]').attr('data-filter');

                $browserUnits.find('.utdx-list-sec').each(function () {
                    var $sec = $(this);
                    var secHasVisibleCards = false;

                    $sec.find('.utdx-list-card').each(function () {
                        var $card = $(this);
                        var name = $card.attr('data-utdx-name') || "";
                        var rarity = $card.attr('data-utdx-rarity') || "";
                        var element = $card.attr('data-utdx-element') || "";

                        var mSearch = !query || name.indexOf(query) !== -1;
                        var mRarity = !activeRarity || rarity === activeRarity;
                        var mElement = !activeElement || element.split(/,\s*/).indexOf(activeElement) !== -1;

                        if (mSearch && mRarity && mElement) { 
                            $card.show(); 
                            secHasVisibleCards = true; 
                        } else { 
                            $card.hide(); 
                        }
                    });

                    if (secHasVisibleCards) {
                        $sec.show();
                    } else {
                        $sec.hide();
                    }
                });
            }

            $filterToggle.on('click', function () {
                $(this).toggleClass('is-active');
                $menus.slideToggle(250);
            });

            $uFilterBtns.on('click', function () {
                var $btn = $(this);
                var attr = $btn.attr('data-attr');

                if ($btn.hasClass('is-active')) { $btn.removeClass('is-active'); }
                else {
                    $menus.find('.utdx-filter-btn.is-active[data-attr="' + attr + '"]').removeClass('is-active');
                    $btn.addClass('is-active');
                }
                updateUnitFilters();
            });

            $uInput.on('input', updateUnitFilters);
        }
    }
});