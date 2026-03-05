 /* Moved from [[MediaWiki:common.js]] */

mw.hook('wikipage.content').add(function ($content) {
    if ($('#calc-js-loaded').length) return;
    var $placeholder = $('#prison-calc-placeholder');
    var $dataJson = $('#calc-data-json');
    if (!$placeholder.length || !$dataJson.length) return;

    var data = JSON.parse($dataJson.text());

    // --- UI ---
    var $container = $('<div id="prison-calc-container"></div>');
    $container.append('<h2 style="margin-top:0;">Prison Management</h2>');

    // 1. Prisoners Input
    var $inputSection = $('<div class="calc-grid-3"></div>');
    function createInputHTML(id, label) {
        return $('<div></div>').append('<label style="display:block;font-size:12px;">' + label + '</label>')
                               .append('<input type="number" id="' + id + '" class="calc-trigger" value="0" min="0" style="width:100%;padding:5px;box-sizing:border-box;">');
    }
    $inputSection.append(createInputHTML('inp-low', 'Small Security'), createInputHTML('inp-med', 'Medium Security'), createInputHTML('inp-high', 'High Security'));
    $container.append($inputSection);

    // 2. Optimization Selectors
    var $strategyGrid = $('<div class="calc-strategy-grid"></div>');
    function createSelect(id, label, options) {
        var sel = $('<select id="' + id + '" class="calc-trigger" style="width:100%;padding:4px; font-size:12px;"></select>');
        $.each(options, function(val, text) { sel.append('<option value="'+val+'">'+text+'</option>'); });
        return $('<div><label style="display:block; font-size:11px; font-weight:bold;">' + label + '</label></div>').append(sel);
    }

    $strategyGrid.append(createSelect('sel-sleep', 'Bed Type', { 'bed': 'Single Beds (1:1)', 'bunk_bed': 'Bunk Beds (1:2)' }));
    $strategyGrid.append(createSelect('sel-happiness', 'Happiness', { 
        'armchair': 'Armchair (1:1)', 'couch': 'Couch (1:2)', 'waiting_bench': 'Waiting Bench (1:3)', 
        'soda_machine': 'Soda Machine (1:3.5)', 'phone': 'Phone (1:1.5)', 'bleacher': 'Bleacher (1:6)' 
    }));
    $strategyGrid.append(createSelect('sel-theme', 'Furniture Theme', { 'cheap': 'Legacy', 'standard': 'Standard', 'modern': 'Modern' }));
    var $sportsUI = $('<div id="sports-ui" style="display:none;"></div>').append(createSelect('sel-sports-price', 'Small Sec. Sports', { '150': '$150 (Weight Bench, Treadmill)', '350': '$350 (Soccer Goal, Football Goal, Basketball Hoop)' }));
    $strategyGrid.append($sportsUI);
    $container.append($strategyGrid);

    // 3. Dashboards 
    $container.append('<div class="calc-dashboard">' +
        '<strong>Hourly Wages: </strong><span id="res-wages">$0</span> | ' +
        '<strong>Net Profit: </strong><span id="res-profit">$0</span>/h | ' +
        '<strong>Investment: </strong><span id="res-total-infra">$0</span>' +
        '<div id="warning-msg"></div></div>');

    $container.append('<div style="margin-top: 15px;"><h3 style="font-size:14px; margin-bottom:5px;">List of items for this number of Prisoners</h3>' +
        '<table class="calc-table">' +
        '<thead><tr><th>Requirement</th><th>Qty</th><th>Setup Cost</th></tr></thead>' +
        '<tbody id="item-list-body"></tbody></table></div>');
    
    $placeholder.replaceWith($container);

    function updateCalculations() {
        var low = parseInt($('#inp-low').val()) || 0, med = parseInt($('#inp-med').val()) || 0, high = parseInt($('#inp-high').val()) || 0;
        var total = low + med + high, theme = $('#sel-theme').val();
        low > 0 ? $('#sports-ui').show() : $('#sports-ui').hide();

        var listHTML = "", setupTotal = 0;

        // Staff Logic
        var guards = total >= 4 ? Math.ceil(total / data.config.staff.guard.ratio) : 0;
        var chefs = total >= 5 ? Math.ceil(total / 15) : 0; 

        var hourlyWages = (guards * data.config.staff.guard.salary_per_hour) + (chefs * data.config.staff.chef.salary_per_hour);

        if (guards > 0) { 
            var gC = guards * 50; setupTotal += gC; 
            listHTML += '<tr><td>Guards (Hire)</td><td>' + guards + '</td><td>$' + gC.toLocaleString() + '</td></tr>'; 
        }
        if (chefs > 0) { 
            var cC = chefs * 100; setupTotal += cC; 
            listHTML += '<tr><td>Chefs (Hire)</td><td>' + chefs + '</td><td>$' + cC.toLocaleString() + '</td></tr>';
            var kitCost = (data.items.kitchen_kit.variants[theme] || 400) * chefs;
            setupTotal += kitCost; 
            listHTML += '<tr><td>Ovens, Sinks and Refrigerators</td><td>' + chefs + '</td><td>$' + kitCost.toLocaleString() + '</td></tr>';
        }

        // Helper to process items safely
        function processItem(key, count) {
            var item = data.items[key];
            if (!item) return;
            var qty = Math.ceil(count / item.ratio);
            var cost = qty * (item.variants[theme] || item.variants.cheap || 0);
            setupTotal += cost;
            listHTML += '<tr><td>' + item.name + '</td><td>' + qty + '</td><td>$' + cost.toLocaleString() + '</td></tr>';
        }

        $.each(['toilet', 'shower', 'buffet', 'table'], function(i, k) { processItem(k, total); });
        processItem($('#sel-sleep').val(), total);
        processItem($('#sel-happiness').val(), total);

        if (med + high > 0) {
            var isoQty = Math.ceil((med + high) / 10), isoCost = isoQty * 5000;
            setupTotal += isoCost; listHTML += '<tr><td>Isolation Chair</td><td>' + isoQty + '</td><td>$' + isoCost.toLocaleString() + '</td></tr>';
        }

        // Dynamic Guard Tower Naming
        if (high > 0) {
            var towerNames = { 'cheap': 'Wooden Guard Tower', 'standard': 'Old Guard Tower', 'modern': 'Guard Tower' };
            var tw = data.items.guard_tower;
            var twQty = Math.ceil(high / 15), twCost = twQty * (tw.variants[theme] || 250000);
            setupTotal += twCost; 
            listHTML += '<tr><td>' + towerNames[theme] + '</td><td>' + twQty + '</td><td>$' + twCost.toLocaleString() + '</td></tr>';
        }

        if (low > 0) {
            var sP = parseInt($('#sel-sports-price').val()), sQ = Math.ceil(low / 2.5), sC = (sQ * sP) * 4;
            setupTotal += sC; listHTML += '<tr><td>Small Sec Sports Set</td><td>' + sQ + '</td><td>$' + sC.toLocaleString() + '</td></tr>';
        }
        if (med > 0) { var mQ = Math.ceil(med / 5), mC = mQ * 2500; setupTotal += mC; listHTML += '<tr><td>Push-up Mat (Med)</td><td>' + mQ + '</td><td>$' + mC.toLocaleString() + '</td></tr>'; }
        if (high > 0) { var hQ = Math.ceil(high / 3), hC = hQ * 3500; setupTotal += hC; listHTML += '<tr><td>Pull-up Bar (High)</td><td>' + hQ + '</td><td>$' + hC.toLocaleString() + '</td></tr>'; }

        // Finance Update
        var income = (low * 10 + med * 15 + high * 20);
        var profit = income - hourlyWages;

        $('#res-wages').text('$' + hourlyWages.toLocaleString());
        $('#res-profit').text('$' + profit.toLocaleString()).css('color', profit >= 0 ? '#44ff44' : '#ff4444');
        $('#res-total-infra').text('$' + setupTotal.toLocaleString());
        $('#item-list-body').html(listHTML || '<tr><td colspan="3" style="text-align:center;">Empty</td></tr>');
        $('#warning-msg').text(total > 100 ? '⚠️ The prisoner limit has been exceeded' : '');
    }

    $(document).on('input change', '.calc-trigger', updateCalculations);
    updateCalculations();
});