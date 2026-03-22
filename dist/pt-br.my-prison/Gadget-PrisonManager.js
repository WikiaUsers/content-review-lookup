 // Exportado de My Prison Wiki (EN), traduzido para esta wiki
 // Criado especificamente para o jogo My Prison

mw.hook('wikipage.content').add(function ($content) {
    if ($('#calc-js-loaded').length) return;
    var $placeholder = $('#prison-calc-placeholder');
    var $dataJson = $('#calc-data-json');
    if (!$placeholder.length || !$dataJson.length) return;

    var data = JSON.parse($dataJson.text());

    // --- INTERFACE (UI) ---
    var $container = $('<div id="prison-calc-container"></div>');
    $container.append('<h2 style="margin-top:0;">Gestão da Prisão</h2>');

    // 1. Entrada de Prisioneiros
    var $inputSection = $('<div class="calc-grid-3"></div>');
    function createInputHTML(id, label) {
        return $('<div></div>').append('<label style="display:block;font-size:12px;">' + label + '</label>')
                               .append('<input type="number" id="' + id + '" class="calc-trigger" value="0" min="0" style="width:100%;padding:5px;box-sizing:border-box;">');
    }
    $inputSection.append(
        createInputHTML('inp-low', 'Segurança Baixa'), 
        createInputHTML('inp-med', 'Segurança Média'), 
        createInputHTML('inp-high', 'Segurança Alta')
    );
    $container.append($inputSection);

    // 2. Seletores de Otimização
    var $strategyGrid = $('<div class="calc-strategy-grid"></div>');
    function createSelect(id, label, options) {
        var sel = $('<select id="' + id + '" class="calc-trigger" style="width:100%;padding:4px; font-size:12px;"></select>');
        $.each(options, function(val, text) { sel.append('<option value="'+val+'">'+text+'</option>'); });
        return $('<div><label style="display:block; font-size:11px; font-weight:bold;">' + label + '</label></div>').append(sel);
    }

    $strategyGrid.append(createSelect('sel-sleep', 'Tipo de Cama', { 'bed': 'Camas de Solteiro (1:1)', 'bunk_bed': 'Beliches (1:2)' }));
    $strategyGrid.append(createSelect('sel-happiness', 'Felicidade', { 
        'armchair': 'Poltrona (1:1)', 'couch': 'Sofá (1:2)', 'waiting_bench': 'Banco de Espera (1:3)', 
        'soda_machine': 'Máquina de Refrigerante (1:3.5)', 'phone': 'Telefone (1:1.5)', 'bleacher': 'Arquibancada (1:6)' 
    }));
    $strategyGrid.append(createSelect('sel-theme', 'Tema da Mobília', { 'cheap': 'Legado (Barato)', 'standard': 'Padrão', 'modern': 'Moderno' }));
    
    var $sportsUI = $('<div id="sports-ui" style="display:none;"></div>').append(createSelect('sel-sports-price', 'Esportes (Seg. Baixa)', { 
        '150': '$150 (Banco de Peso, Esteira)', 
        '350': '$350 (Trave de Futebol, Cesta de Basquete)' 
    }));
    $strategyGrid.append($sportsUI);
    $container.append($strategyGrid);

    // 3. Painéis de Resultados (Dashboards)
    $container.append('<div class="calc-dashboard">' +
        '<strong>Salários por Hora: </strong><span id="res-wages">$0</span> | ' +
        '<strong>Lucro Líquido: </strong><span id="res-profit">$0</span>/h | ' +
        '<strong>Investimento: </strong><span id="res-total-infra">$0</span>' +
        '<div id="warning-msg"></div></div>');

    $container.append('<div style="margin-top: 15px;"><h3 style="font-size:14px; margin-bottom:5px;">Lista de itens para este número de Prisioneiros</h3>' +
        '<table class="calc-table">' +
        '<thead><tr><th>Requisito</th><th>Qtd</th><th>Custo de Instalação</th></tr></thead>' +
        '<tbody id="item-list-body"></tbody></table></div>');
    
    $placeholder.replaceWith($container);

    function updateCalculations() {
        var low = parseInt($('#inp-low').val()) || 0, med = parseInt($('#inp-med').val()) || 0, high = parseInt($('#inp-high').val()) || 0;
        var total = low + med + high, theme = $('#sel-theme').val();
        low > 0 ? $('#sports-ui').show() : $('#sports-ui').hide();

        var listHTML = "", setupTotal = 0;

        // Lógica de Funcionários (Staff)
        var guards = total >= 4 ? Math.ceil(total / data.config.staff.guard.ratio) : 0;
        var chefs = total >= 5 ? Math.ceil(total / 15) : 0; 

        var hourlyWages = (guards * data.config.staff.guard.salary_per_hour) + (chefs * data.config.staff.chef.salary_per_hour);

        if (guards > 0) { 
            var gC = guards * 50; setupTotal += gC; 
            listHTML += '<tr><td>Guardas (Contratação)</td><td>' + guards + '</td><td>$' + gC.toLocaleString() + '</td></tr>'; 
        }
        if (chefs > 0) { 
            var cC = chefs * 100; setupTotal += cC; 
            listHTML += '<tr><td>Chefs (Contratação)</td><td>' + chefs + '</td><td>$' + cC.toLocaleString() + '</td></tr>';
            var kitCost = (data.items.kitchen_kit.variants[theme] || 400) * chefs;
            setupTotal += kitCost; 
            listHTML += '<tr><td>Fogões, Pias e Geladeiras</td><td>' + chefs + '</td><td>$' + kitCost.toLocaleString() + '</td></tr>';
        }

        // Função auxiliar para processar itens
        function processItem(key, count, customName) {
            var item = data.items[key];
            if (!item) return;
            var qty = Math.ceil(count / item.ratio);
            var cost = qty * (item.variants[theme] || item.variants.cheap || 0);
            setupTotal += cost;
            var displayName = customName || item.name_pt || item.name; // Usa nome em PT se existir no JSON
            listHTML += '<tr><td>' + displayName + '</td><td>' + qty + '</td><td>$' + cost.toLocaleString() + '</td></tr>';
        }

        // Itens Básicos (Traduções diretas para a tabela)
        $.each([
            {k:'toilet', n:'Vaso Sanitário'}, 
            {k:'shower', n:'Chuveiro'}, 
            {k:'buffet', n:'Buffet de Comida'}, 
            {k:'table', n:'Mesa de Refeitório'}
        ], function(i, obj) { processItem(obj.k, total, obj.n); });
        
        processItem($('#sel-sleep').val(), total, $('#sel-sleep option:selected').text().split(' (')[0]);
        processItem($('#sel-happiness').val(), total, $('#sel-happiness option:selected').text().split(' (')[0]);

        if (med + high > 0) {
            var isoQty = Math.ceil((med + high) / 10), isoCost = isoQty * 5000;
            setupTotal += isoCost; listHTML += '<tr><td>Cadeira de Isolamento</td><td>' + isoQty + '</td><td>$' + isoCost.toLocaleString() + '</td></tr>';
        }

        // Torres de Guarda (Nomes Dinâmicos)
        if (high > 0) {
            var towerNames = { 'cheap': 'Torre de Guarda de Madeira', 'standard': 'Torre de Guarda Antiga', 'modern': 'Torre de Guarda' };
            var tw = data.items.guard_tower;
            var twQty = Math.ceil(high / 15), twCost = twQty * (tw.variants[theme] || 250000);
            setupTotal += twCost; 
            listHTML += '<tr><td>' + towerNames[theme] + '</td><td>' + twQty + '</td><td>$' + twCost.toLocaleString() + '</td></tr>';
        }

        if (low > 0) {
            var sP = parseInt($('#sel-sports-price').val()), sQ = Math.ceil(low / 2.5), sC = (sQ * sP) * 4;
            setupTotal += sC; listHTML += '<tr><td>Conjunto Esportivo (Seg. Baixa)</td><td>' + sQ + '</td><td>$' + sC.toLocaleString() + '</td></tr>';
        }
        if (med > 0) { var mQ = Math.ceil(med / 5), mC = mQ * 2500; setupTotal += mC; listHTML += '<tr><td>Tapete de Flexão (Méd.)</td><td>' + mQ + '</td><td>$' + mC.toLocaleString() + '</td></tr>'; }
        if (high > 0) { var hQ = Math.ceil(high / 3), hC = hQ * 3500; setupTotal += hC; listHTML += '<tr><td>Barra de Elevação (Alt.)</td><td>' + hQ + '</td><td>$' + hC.toLocaleString() + '</td></tr>'; }

        // Atualização Financeira
        var income = (low * 10 + med * 15 + high * 20);
        var profit = income - hourlyWages;

        $('#res-wages').text('$' + hourlyWages.toLocaleString());
        $('#res-profit').text('$' + profit.toLocaleString()).css('color', profit >= 0 ? '#44ff44' : '#ff4444');
        $('#res-total-infra').text('$' + setupTotal.toLocaleString());
        $('#item-list-body').html(listHTML || '<tr><td colspan="3" style="text-align:center;">Vazio</td></tr>');
        $('#warning-msg').text(total > 100 ? '⚠️ O limite de prisioneiros foi excedido' : '');
    }

    $(document).on('input change', '.calc-trigger', updateCalculations);
    updateCalculations();
});