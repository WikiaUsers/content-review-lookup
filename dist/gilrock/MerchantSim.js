/*  gilrock merchant simulator - a tool used to generate merchant shop seeds with a single click
	ores, items and consumables sourced from lua module
	
	template: https://gilrock.fandom.com/wiki/Template:MerchantSim
	lua module: https://gilrock.fandom.com/wiki/Module:MerchantData
	css: https://gilrock.fandom.com/wiki/MediaWiki:MerchantSim.css
*/
mw.hook('wikipage.content').add(function($content) {
    var $container = $content.find('.merchant-container');
    if ($container.length === 0) return;
    
    setTimeout(function() {
        initMerchantSimulator($container);
    }, 100);
});

function initMerchantSimulator($container) {
    var $allItems = $container.find('.merchant-item');
    if ($allItems.length === 0) return;
    
    $allItems.hide();
    $container.find('#merchant-stats').addClass('visible');
    
    $container.find('#merchant-generate-btn').off('click').on('click', function(e) {
        e.preventDefault();
        generateMerchantSelection($container);
    });
    
    setTimeout(function() {
        generateMerchantSelection($container);
    }, 500);
}

function generateMerchantSelection($container) {
    var $allItems = $container.find('.merchant-item');
    $allItems.hide().removeClass('visible');
    
    var itemsByCategory = { 
        ores: {}, 
        items: {}, 
        consumables: {} 
    };
    
    $allItems.each(function() {
        var $item = $(this),
            category = $item.data('category'),
            tier = $item.data('tier');
        
        if (!category || !tier) return;
        
        var categoryLower = category.toLowerCase();
        if (!itemsByCategory[categoryLower]) return;
        
        if (!itemsByCategory[categoryLower][tier]) {
            itemsByCategory[categoryLower][tier] = [];
        }
        itemsByCategory[categoryLower][tier].push($item);
    });
    
    var chances = {
        ores: { common: 15, uncommon: 25, rare: 15, epic: 10, legendary: 3, mythic: 2, godly: 0.5 },
        items: { common: 30, uncommon: 20, rare: 15, epic: 8, legendary: 5, mythic: 1, godly: 0.1 },
        consumables: { common: 50, uncommon: 30, rare: 10, epic: 5, legendary: 3, mythic: 1, godly: 0.5 }
    };
    
    var guaranteedCommons = { ores: 7, items: 2, consumables: 2 };
    var selectedItems = [];
    
    var guaranteedSelected = { ores: [], items: [], consumables: [] };
    
    ['ores', 'items', 'consumables'].forEach(function(category) {
        var commons = itemsByCategory[category] ? (itemsByCategory[category].common || []) : [];
        if (commons.length > 0) {
            var shuffled = commons.sort(function() { return 0.5 - Math.random(); });
            var count = Math.min(guaranteedCommons[category], shuffled.length);
            for (var i = 0; i < count; i++) {
                selectedItems.push(shuffled[i]);
                guaranteedSelected[category].push(shuffled[i].data('item-id') || shuffled[i].attr('id') || i);
            }
        }
    });
    
    ['ores', 'items', 'consumables'].forEach(function(category) {
        for (var tier in chances[category]) {
            var tierItems = itemsByCategory[category] ? (itemsByCategory[category][tier] || []) : [];
            
            tierItems.forEach(function($item) {
                if (tier === 'common') {
                    var itemId = $item.data('item-id') || $item.attr('id') || '';
                    if (guaranteedSelected[category].includes(itemId)) {
                        return; 
                    }
                }
                
                if (Math.random() * 100 <= chances[category][tier]) {
                    selectedItems.push($item);
                }
            });
        }
    });
    
    var uniqueSelectedItems = [];
    var seenIds = new Set();
    
    selectedItems.forEach(function($item) {
        var itemId = $item.data('item-id') || $item.attr('id') || Math.random();
        if (!seenIds.has(itemId)) {
            seenIds.add(itemId);
            uniqueSelectedItems.push($item);
        }
    });
    
    uniqueSelectedItems.forEach(function($item, index) {
        setTimeout(function() {
            $item.show().addClass('visible');
        }, index * 20);
    });
    
    updateCounters($container, uniqueSelectedItems);
}

function updateCounters($container, selectedItems) {
    var counts = { ores: 0, items: 0, consumables: 0 };
    
    selectedItems.forEach(function($item) {
        var category = $item.data('category');
        if (category) {
            var categoryLower = category.toLowerCase();
            if (counts[categoryLower] !== undefined) {
                counts[categoryLower]++;
            }
        }
    });
    
    $container.find('#total-count').text(selectedItems.length);
    $container.find('#ores-count').text(counts.ores);
    $container.find('#items-count').text(counts.items);
    $container.find('#consumables-count').text(counts.consumables);
}