/* Any JavaScript here will be loaded for all users on every page load. */

  // ============================================ Search Bar
mw.hook('wikipage.content').add(function ($content) {
    var $placeholder = $('#search-placeholder');
    if (!$placeholder.length || $('#inpage-search').length || window.location.href.includes('action=')) return;

    var debounceTimer;

    // SEARCH BAR UI
    var $container = $('<div id="inpage-search" style="margin: 15px 0; padding: 15px; background: var(--theme-page-background-color--secondary); border: 1px solid var(--theme-border-color); border-radius: 8px;"></div>');
    var $input = $('<input type="search" id="pageSearchInput" placeholder="Filter Change Log (e.g., Winter, V74, Fixed)..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background: var(--theme-page-background-color); color: var(--theme-page-text-color); box-sizing: border-box;">');
    var $status = $('<div id="searchStatus" style="font-size: 12px; margin-top: 8px; color: var(--theme-page-text-color); opacity: 0.8; font-weight: bold;"></div>');
    
    $container.append($input, $status);
    $placeholder.replaceWith($container);

    function getUpdateGroups() {
        var groups = [];
        // Map only versions (H3)
        $('.mw-parser-output > h3').each(function() {
            var $header = $(this);
            var $contentBetween = $header.nextUntil('h3, h2'); // For the next H3 or next YEAR (H2)
            groups.push({
                header: $header,
                content: $contentBetween,
                fullText: ($header.text() + ' ' + $contentBetween.text()).toLowerCase()
            });
        });
        return groups;
    }

    function clearHighlights() {
        $('.page-search-highlight').each(function() {
            var parent = this.parentNode;
            $(this).replaceWith(this.textContent);
            if (parent) parent.normalize();
        });
    }

    function applyHighlight($elements, term) {
        var regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        
        $elements.find('span, li, b, i, code, h3').addBack('h3').not('h2').contents().filter(function() {
            return this.nodeType === 3 && this.textContent.match(regex);
        }).each(function() {
            var highlightedText = this.textContent.replace(regex, '<span class="page-search-highlight">$1</span>');
            $(this).replaceWith(highlightedText);
        });
    }

    function executeSearch() {
        var query = $input.val().trim().toLowerCase();
        var groups = getUpdateGroups();
        var matchCount = 0;

        clearHighlights();

        if (!query) {
            $('.mw-parser-output > *').show();
            $status.text('');
            return;
        }

        $('.mw-parser-output > *').not('#inpage-search, .log-header, .noprint').hide();
        // Keeps the years (H2) visible only as divisors (without counting as a result)
        $('.mw-parser-output > h2').show(); 

        groups.forEach(function(group) {
            // Check if the term is in the version title (H3) or in the items below it
            if (group.fullText.indexOf(query) !== -1) {
                group.header.show();
                group.content.show();
                applyHighlight(group.header.add(group.content), query);
                matchCount++; // It only counts if the term is in H3 or in the content of the version
            }
        });

        $status.text(matchCount > 0 ? 'Found ' + matchCount + ' corresponding versions.' : 'No results found.');
    }

    $input.on('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(executeSearch, 250);
    });

    if (!$('#page-search-highlight-style').length) {
        $('<style id="page-search-highlight-style">')
            .text('.page-search-highlight { background: #fff176 !important; color: #000 !important; border-radius: 2px; padding: 0 1px; }')
            .appendTo('head');
    }
});

  // ============================================= Auto create user page
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{NewUser}}',
    },
    summary: 'Automatically creating user page',
    notify: true
};

  // ============================================= Calculator
mw.hook('wikipage.content').add(function ($content) {
    if ($('#calc-js-loaded').length) return;
    var $placeholder = $('#prison-calc-placeholder');
    var $dataJson = $('#calc-data-json');
    if (!$placeholder.length || !$dataJson.length) return;

    var data = JSON.parse($dataJson.text());

    // --- Main Container ---
    var $container = $('<div id="prison-calc-container" style="padding: 20px; border: 2px solid var(--theme-border-color); border-radius: 10px; color: var(--theme-page-text-color); background: var(--theme-page-background-color--secondary);"></div>');
    $container.append('<h2 style="margin-top:0;">Prison Management Suite</h2>');

    // 1. Inputs Section
    var $inputSection = $('<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"></div>');
    function createInputHTML(id, label) {
        var div = $('<div></div>');
        div.append('<label style="display:block;font-size:12px;">' + label + '</label>');
        div.append('<input type="number" id="' + id + '" value="0" min="0" style="width:100%;padding:5px;box-sizing:border-box;">');
        return div;
    }
    $inputSection.append(createInputHTML('inp-low', 'Small Security'));
    $inputSection.append(createInputHTML('inp-med', 'Medium Security'));
    $inputSection.append(createInputHTML('inp-high', 'High Security'));
    $container.append($inputSection);

    // 2. Options Grid (Theme & Sports)
    var $optionsGrid = $('<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;"></div>');
    var $themeDiv = $('<div><label style="display:block; font-size:12px;">Furniture Theme:</label></div>');
    var $selectTheme = $('<select id="theme-selector" style="width:100%;padding:5px;"><option value="cheap">Cheap / Legacy</option><option value="standard">Standard</option><option value="modern">Modern / Premium</option></select>');
    $themeDiv.append($selectTheme);
    var $sportsDiv = $('<div id="sports-ui" style="display:none;"><label style="display:block; font-size:12px;">Small Sec. Sports Quality:</label></div>');
    var $selectSports = $('<select id="sports-price-selector" style="width:100%;padding:5px;"><option value="150">$150 (Basic)</option><option value="350">$350 (Advanced)</option></select>');
    $sportsDiv.append($selectSports);
    $optionsGrid.append($themeDiv, $sportsDiv);
    $container.append($optionsGrid);

    // --- TOOL 1: Financial Dashboard ---
    var $dashboard = $('<div style="margin-top: 20px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 5px; background: rgba(0,0,0,0.1);"></div>');
    $dashboard.append('<h3 style="margin-top:0; font-size:16px;">Tool 1: Financial Summary</h3>');
    function createResultLine(label, id, suffix) {
        return $('<p style="margin: 5px 0;"><strong>' + label + ': </strong><span id="' + id + '">0</span> ' + (suffix || '') + '</p>');
    }
    $dashboard.append(createResultLine('Total Prisoners', 'res-total'));
    $dashboard.append(createResultLine('Net Hourly Profit', 'res-profit', '$'));
    $dashboard.append('<div id="warning-msg" style="color: #ff4444; font-weight: bold; font-size: 12px; margin-top: 5px;"></div>');
    $container.append($dashboard);

    // --- TOOL 2: Shopping List ---
    var $infraReport = $('<div style="margin-top: 20px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); border-radius: 5px; background: rgba(0,0,0,0.05);"></div>');
    $infraReport.append('<h3 style="margin-top:0; font-size:16px;">Tool 2: Required Items & Staff</h3>');
    var $itemTable = $('<table style="width:100%; border-collapse: collapse; font-size: 13px; margin-top:10px;">' +
                        '<thead><tr style="border-bottom: 2px solid var(--theme-border-color); text-align: left;">' +
                        '<th style="padding: 5px;">Requirement</th><th style="padding: 5px;">Qty</th><th style="padding: 5px;">Setup Cost</th></tr></thead>' +
                        '<tbody id="item-list-body"></tbody>' +
                        '<tfoot><tr style="border-top: 2px solid var(--theme-border-color); font-weight:bold;">' +
                        '<td style="padding: 10px 5px;">Total Investment</td><td></td><td id="res-total-infra" style="padding: 10px 5px;">$0</td></tr></tfoot></table>');
    $infraReport.append($itemTable);
    $container.append($infraReport);
    
    $placeholder.replaceWith($container);

    function updateCalculations() {
        var low = parseInt($('#inp-low').val()) || 0;
        var med = parseInt($('#inp-med').val()) || 0;
        var high = parseInt($('#inp-high').val()) || 0;
        var total = low + med + high;
        var theme = $('#theme-selector').val();
        
        low > 0 ? $('#sports-ui').show() : $('#sports-ui').hide();

        // 1. Calculations Base
        var guards = total >= 4 ? Math.ceil(total / data.config.staff.guard.ratio) : 0;
        var chefs = total >= 5 ? Math.ceil(total / data.config.staff.chef.ratio) : 0;
        
        // 2. Financial Update (Tool 1)
        var income = (low * data.config.income_per_hour.low) + (med * data.config.income_per_hour.medium) + (high * data.config.income_per_hour.high);
        var wages = (guards * data.config.staff.guard.salary_per_hour) + (chefs * data.config.staff.chef.salary_per_hour);
        var profit = income - wages;

        $('#res-total').text(total);
        $('#res-profit').text(profit.toLocaleString()).css('color', profit >= 0 ? '#44ff44' : '#ff4444');
        $('#warning-msg').text(total > data.config.max_capacity ? 'Reminder: Maximum capacity is (' + data.config.max_capacity + ')' : '');

        // 3. Infrastructure & Shopping List (Tool 2)
        var listHTML = "";
        var setupTotal = 0;

        // Staff Hire
        if (guards > 0) {
            var gCost = guards * data.config.staff.guard.hire_cost;
            setupTotal += gCost;
            listHTML += `<tr><td>Guards (Hire)</td><td>${guards}</td><td>$${gCost.toLocaleString()}</td></tr>`;
        }
        if (chefs > 0) {
            var cCost = chefs * data.config.staff.chef.hire_cost;
            setupTotal += cCost;
            listHTML += `<tr><td>Chefs (Hire)</td><td>${chefs}</td><td>$${cCost.toLocaleString()}</td></tr>`;
        }

        // Basic Items
        $.each(data.items, function(key, item) {
            var rel = total;
            if (item.name.includes("Isolation")) rel = med + high;
            if (item.name.includes("Tower")) rel = high;
            if (rel > 0) {
                var qty = Math.ceil(rel / item.ratio);
                var cost = qty * (item.variants[theme] || 0);
                setupTotal += cost;
                listHTML += `<tr><td>${item.name}</td><td>${qty}</td><td>$${cost.toLocaleString()}</td></tr>`;
            }
        });

        // Sports Logic
        if (low > 0) {
            var sPrice = parseInt($('#sports-price-selector').val());
            var sQty = Math.ceil(low / data.sports.small_security.ratio);
            var sCost = (sQty * sPrice) * 4;
            setupTotal += sCost;
            listHTML += `<tr><td>Small Sec. Sports Set</td><td>${sQty}</td><td>$${sCost.toLocaleString()}</td></tr>`;
        }
        if (med > 0) {
            var mQty = Math.ceil(med / data.sports.medium_security.ratio);
            var mCost = mQty * data.sports.medium_security.items[0].price;
            setupTotal += mCost;
            listHTML += `<tr><td>Push-up Mat (Med)</td><td>${mQty}</td><td>$${mCost.toLocaleString()}</td></tr>`;
        }
        if (high > 0) {
            var hQty = Math.ceil(high / data.sports.high_security.ratio);
            var hCost = hQty * data.sports.high_security.items[0].price;
            setupTotal += hCost;
            listHTML += `<tr><td>Pull-up Bar (High)</td><td>${hQty}</td><td>$${hCost.toLocaleString()}</td></tr>`;
        }

        $('#item-list-body').html(listHTML || '<tr><td colspan="3" style="text-align:center; padding:10px;">No requirements for 0 prisoners.</td></tr>');
        $('#res-total-infra').text('$' + setupTotal.toLocaleString());
    }

    $('#inp-low, #inp-med, #inp-high, #theme-selector, #sports-price-selector').on('input change', updateCalculations);
    updateCalculations();
});