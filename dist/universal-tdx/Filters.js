mw.hook('wikipage.content').add(function ($content) {

    // Expand button logic for Mobile
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
        if ($(window).width() <= 768) return; 
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
            
            if (window.innerWidth && x + w > window.innerWidth) { x = e.clientX - w - 15; }
            if (window.innerHeight && y + h > window.innerHeight) { y = window.innerHeight - h - 15; }
            
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
                var label = (t === 'Money') ? 'Currencies' : t;
                $('<div class="ao-filter-button"></div>')
                    .text(label).attr('data-type', t)
                    .addClass(t === 'All' ? 'is-active' : '')
                    .appendTo($bar);
            });
            var $search = $('<div class="ao-search-wrap"><div class="ao-search-icon">🔍</div><input class="ao-search-input" type="text" placeholder="Search items or sets..." /></div>');
            $hostItems.empty();
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
                    $sec.find('.ao-set-section, .ao-source-section').each(function () {
                        var $set = $(this);
                        var setVisible = false;
                        $set.find('.ao-item-card').each(function () {
                            var $card = $(this);
                            var cardName = ($card.attr('data-ao-name') || '').toLowerCase();
                            var cardSet = ($card.attr('data-ao-set') || '').toLowerCase();
                            var matchesType = (type === 'All' || $card.attr('data-ao-type') === type);
                            var matchesSearch = (cardName.indexOf(query) !== -1 || cardSet.indexOf(query) !== -1);

                            if (matchesType && matchesSearch) { $card.show(); setVisible = true; secVisible = true; }
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

                        if (mSearch && mRarity && mElement) { $card.show(); secHasVisibleCards = true; } 
                        else { $card.hide(); }
                    });
                    if (secHasVisibleCards) { $sec.show(); } else { $sec.hide(); }
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

  // =====================================================================
    // DPS CALCULATOR UPDATED SCRIPT
    // =====================================================================
// =====================================================================
    // DPS CALCULATOR (UNIVERSAL TD OPTIMIZER MATH)
    // =====================================================================
    $content.find('.utdx-dps-calculator').each(function () {
        var $calc = $(this);
        if ($calc.data('initialized')) return;
        $calc.data('initialized', true);

        var raw = $calc.attr('data-utdx-calc') || '{}';
        var data;
        try { data = JSON.parse(raw); } catch (err) { data = null; }
        if (!data || !data.unit) {
            $calc.find('.utdx-dps-control-host').html('<div style="color:red; padding:10px;">Data failed to load.</div>');
            return;
        }

        function num(v, fallback) {
            var n = parseFloat(v);
            return isFinite(n) ? n : (fallback || 0);
        }

        function findById(list, id) {
            list = list || [];
            for (var i = 0; i < list.length; i++) {
                if (String(list[i].id) === String(id)) return list[i];
            }
            return list[0] || {};
        }

        function hasTag(tag) {
            var tags = data.unit.tags || [];
            var wanted = String(tag || '').toLowerCase();
            for (var i = 0; i < tags.length; i++) {
                if (String(tags[i]).toLowerCase() === wanted) return true;
            }
            return false;
        }

        function formatNumber(value) {
            value = num(value, 0);
            var abs = Math.abs(value);
            if (abs >= 1000000000) return (value / 1000000000).toFixed(2).replace(/\.?0+$/, '') + 'B';
            if (abs >= 1000000) return (value / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M';
            if (abs >= 1000) return (value / 1000).toFixed(1).replace(/\.?0+$/, '') + 'K';
            return value.toFixed(1).replace(/\.?0+$/, '');
        }

        function pct(value) { return formatNumber(value) + '%'; }

        // --- MATH ENGINE (From Optimizer Source) ---
        function calculate() {
            var unit = data.unit;
            
            // Get Inputs safely
            var set = $calc.find('[data-calc="set"]').val() || 'none';
            var head = $calc.find('[data-calc="head"]').val() || 'none';
            var traitId = $calc.find('[data-calc="trait"]').val() || 'none';
            var trait = findById(data.traits, traitId);
            var placement = Math.min(num(unit.placement, 1), trait.limitPlace ? num(trait.limitPlace, 1) : num(unit.placement, 1));

            var dmgPoints = num($calc.find('[data-calc="dmgPoints"]').val(), 0);
            var spaPoints = num($calc.find('[data-calc="spaPoints"]').val(), 0);
            var rangePoints = num($calc.find('[data-calc="rangePoints"]').val(), 0);
            
            var rankDmg = num($calc.find('[data-calc="rankDmg"]').val(), 20);
            var rankSpa = num($calc.find('[data-calc="rankSpa"]').val(), 8);
            var rankRange = num($calc.find('[data-calc="rankRange"]').val(), 20);

            // Fetch Relic Substats
            var relic = { dmg: 0, spa: 0, range: 0, cm: 0, cf: 0, dot: 0 };
            
            var bodyMainId = $calc.find('[data-calc="bodyMain"]').val();
            var legsMainId = $calc.find('[data-calc="legsMain"]').val();
            
            var bodyMainObj = findById(data.bodyMain, bodyMainId);
            var legsMainObj = findById(data.legsMain, legsMainId);
            
            if (bodyMainObj.value) relic[bodyMainId] += num(bodyMainObj.value, 0);
            if (legsMainObj.value) relic[legsMainId] += num(legsMainObj.value, 0);

            $calc.find('.utdx-dps-sub').each(function () {
                var $input = $(this);
                // Disable conflicting main stats
                var slot = $input.attr('data-slot');
                var stat = $input.attr('data-stat');
                var isBlocked = (slot === 'body' && stat === bodyMainId) || (slot === 'legs' && stat === legsMainId);
                $input.prop('disabled', isBlocked);
                
                if (!isBlocked) {
                    relic[stat] += num($input.val(), 0);
                } else {
                    $input.val(0);
                }
            });

            // 1. Base Level Stats (Optimizer Formula)
            var lvDmg = num(unit.atk, 0) * Math.pow(1.0045125, dmgPoints) * (1 + rankDmg / 100);
            var lvSpa = num(unit.spa, 1) * Math.pow(0.9954875, spaPoints) * (1 - rankSpa / 100);
            var lvRange = num(unit.range, 0) * Math.pow(1.0045125, rangePoints) * (1 + rankRange / 100);

            // 2. Set & Tag Bonuses
            var sBonus = { dmg: 0, spa: 0, range: 0, cm: 0, cf: 0, dot: 0 };
            var setInfo = findById(data.sets, set);
            if (setInfo && setInfo.bonus) {
                for (var k in sBonus) sBonus[k] = num(setInfo.bonus[k], 0);
            }

            var element = String(unit.element || '').toLowerCase();
            if (head === 'reaper_necklace' && set !== 'reaper_set') { sBonus.spa += 7.5; sBonus.range += 15; }
            if (head === 'shadow_reaper_necklace' && set !== 'shadow_reaper') { sBonus.dmg += 2.5; sBonus.range += 10; sBonus.cf += 5; sBonus.cm += 5; }
            if (set === 'ninja' && ['dark','rose','fire'].indexOf(element) !== -1) sBonus.dmg += 10;
            if (set === 'sun_god' && ['ice','light','water'].indexOf(element) !== -1) sBonus.dmg += 10;
            if (set === 'rebellious_set' && unit.hasCC) sBonus.dmg += 30;
            
            // Tag Checks
            if (set === 'shadow_reaper' && hasTag('Peroxide')) sBonus.spa += 10;
            if (set === 'shadow_reaper' && hasTag('Reaper')) { sBonus.dmg += 25; sBonus.spa += 12.5; }
            if (set === 'reaper_set' && hasTag('Peroxide')) { sBonus.dmg += 10; sBonus.dot += 5; sBonus.cm += 8.5; }
            if (set === 'reaper_set' && hasTag('Reaper')) { sBonus.range += 15; }

            // 3. Relic Buffs (Artificer)
            var baseR = { dmg: relic.dmg, spa: relic.spa, range: relic.range, cm: relic.cm, cf: relic.cf, dot: relic.dot };
            if (trait.relicBuff) {
                var mult = num(trait.relicBuff, 1);
                baseR.dmg = ((1 + baseR.dmg / 100) * mult - 1) * 100;
                baseR.range = ((1 + baseR.range / 100) * mult - 1) * 100;
                baseR.spa *= mult; baseR.cm *= mult; baseR.cf *= mult; baseR.dot *= mult;
            }

            var passiveDmg = num(unit.passiveDmg, 0);
            var passiveSpa = num(unit.passiveSpa, 0);
            var passiveRange = num(unit.passiveRange, 0);
            
            var eternalDmg = 0; var eternalRange = 0;
            if (trait.isEternal) {
                eternalDmg = 12 * 5; // Capped at wave 12
                eternalRange = 12 * 2.5;
                passiveDmg += eternalDmg;
            }

            // 4. Final SPA & Range
            var totalAdditiveRange = sBonus.range + passiveRange + eternalRange;
            var finalRange = lvRange * (1 + num(trait.range, 0) / 100) * (1 + baseR.range / 100) * (1 + totalAdditiveRange / 100);

            var spaAfterRelic = lvSpa * (1 - num(trait.spa, 0) / 100) * (1 - baseR.spa / 100);
            var rawSpa = spaAfterRelic * (1 - (sBonus.spa + passiveSpa) / 100);
            var finalSpa = Math.max(rawSpa, num(unit.spaCap, 0.1));

            // 5. Head Dynamic Buffs
            var headDmgBase = 0, headDmgPassive = 0, headDotBuff = 0, noCrits = false;
            if (head === 'sun_god') {
                var buffAttacks = Math.floor(7 / Math.max(finalSpa, 0.1));
                var uptime = buffAttacks > 0 ? buffAttacks / (6 + buffAttacks) : 0;
                headDmgBase = finalRange * uptime;
            } else if (head === 'ninja') {
                var ninjaUp = 10 / (10 + (5 * Math.max(finalSpa, 0.1)));
                headDotBuff = 20 * ninjaUp;
            } else if (head === 'biju_head' && String(unit.name).toLowerCase().indexOf('sasuke') !== -1) {
                var bUp = Math.min(1, 10 / (3 * Math.max(finalSpa, 0.1)));
                headDmgPassive = 70 * bUp;
            } else if (head === 'reanimated_head') {
                var rAttacks = Math.floor(10 / Math.max(finalSpa, 0.1));
                var rUp = rAttacks > 0 ? rAttacks / (5 + rAttacks) : 0;
                headDotBuff = finalRange * rUp;
            } else if (head === 'sorcerer_hunter_spirit') {
                headDmgBase = 60; noCrits = true;
            } else if (head === 'strongest_sorcerer_glasses' && (String(unit.name).toLowerCase().indexOf('strongest') !== -1 || String(unit.name).toLowerCase().indexOf('gojo') !== -1)) {
                headDmgPassive = 50;
            } else if (head === 'bloodline_head' && hasTag('Bloodline')) {
                headDmgPassive = 30;
            }

            // 6. Hit DPS
            var additiveDmg = sBonus.dmg + passiveDmg + headDmgBase + headDmgPassive;
            var finalDmg = lvDmg * (1 + num(trait.dmg, 0) / 100) * (1 + baseR.dmg / 100) * (1 + additiveDmg / 100);

            var finalCdmg = num(unit.cdmg, 150) + sBonus.cm + baseR.cm + num(unit.passiveCdmg, 0);
            var finalCrit = Math.min(100, num(unit.crit, 0) + num(trait.critRate, 0) + sBonus.cf + baseR.cf + num(unit.passiveCrit, 0));
            if (noCrits) finalCrit = 0;

            var avgCritMult = 1 + ((finalCdmg / 100) * (finalCrit / 100));
            var avgHit = finalDmg * avgCritMult;
            var hitDps = (avgHit / Math.max(finalSpa, 0.1)) * placement;

            // 7. DoT DPS
            var traitDotBonus = num(trait.dotBuff, 0) + num(unit.passiveDot, 0);
            var gearDotBonus = baseR.dot + headDotBuff + sBonus.dot;
            var traitMult = 1 + traitDotBonus / 100;
            var gearMult = 1 + gearDotBonus / 100;
            var canStack = trait.allowDotStack;
            
            var nativeDps = 0;
            if (num(unit.dot, 0) > 0) {
                var tickPct = num(unit.dot, 0) * traitMult * gearMult;
                var totalDotDmg = finalDmg * (tickPct / 100); // DoT does not crit in base engine
                var dotDur = num(unit.dotDuration, 0);
                var interval = canStack ? finalSpa : (dotDur > 0 ? Math.ceil(dotDur / Math.max(finalSpa, 0.1)) * finalSpa : finalSpa);
                nativeDps = totalDotDmg / Math.max(interval, 0.1);
            }

            var radDps = 0;
            if (trait.hasRadiation) {
                var radPct = num(trait.radiationPct, 20) * traitMult * gearMult;
                radDps = (finalDmg * (radPct / 100)) / 10;
            }

            var dotDps = (nativeDps + radDps) * (canStack ? placement : 1);
            var totalDps = hitDps + dotDps;

            // 8. Output to UI
            $calc.find('[data-result="total"]').text(formatNumber(totalDps));
            $calc.find('[data-result="hit"]').text(formatNumber(hitDps));
            $calc.find('[data-result="dot"]').html(dotDps > 0 ? formatNumber(dotDps) : '-<br><span style="font-size:0.6rem; color:#555;">No DoT</span>');
            $calc.find('[data-result="damage"]').text(formatNumber(finalDmg));
            $calc.find('[data-result="spa"]').text(finalSpa.toFixed(2) + 's');
            $calc.find('[data-result="range"]').text(formatNumber(finalRange));
            
            // Breakdowns
            $calc.find('[data-result="crit-combo"]').html('<span style="color:#55ff55;">' + Math.floor(finalCrit) + '%</span> <span style="color:#a0a0b8; margin:0 5px;">|</span> <span style="color:#55ffff;">x' + avgCritMult.toFixed(2) + '</span>');
            $calc.find('[data-result="atk-rate"]').html(finalSpa.toFixed(2) + 's');
            
            $calc.find('[data-result="traitBreakdown"]').text('Trait: +' + pct(num(trait.dmg, 0)) + ' Dmg, -' + pct(num(trait.spa, 0)) + ' SPA, +' + pct(num(trait.range, 0)) + ' Range');
            $calc.find('[data-result="relicBreakdown"]').text('Relics: +' + pct(baseR.dmg) + ' Dmg, -' + pct(baseR.spa) + ' SPA, +' + pct(baseR.range) + ' Range');
            $calc.find('[data-result="critBreakdown"]').text('Crit: ' + pct(finalCrit) + ' / ' + pct(finalCdmg) + ' CDmg');
        }

        // Attach event listeners correctly to inputs
        $calc.on('input change', '.utdx-calc-input, .utdx-calc-select, .gear-select', calculate);
        
        // Run initial calculation
        setTimeout(calculate, 100);
    });