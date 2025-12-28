// Multi-category filter system
$(function () {
    var activeFilters = {
        faction: ['all'],
        rarity: ['all'],
        manacost: ['all'],
        aoe: ['all'],
        attacktype: ['all'],
        targets: ['all']
    };
    
    $(document).on('click', '.filter-btn', function () {
        var $btn = $(this);
        var $buttonGroup = $btn.closest('.filter-toggle-buttons');
        var filterType = $buttonGroup.data('filter');
        var value = String($btn.data('value'));

        
        if (value === 'all') {
            $buttonGroup.find('.filter-btn').removeClass('active');
            $btn.addClass('active');
            activeFilters[filterType] = ['all'];
        } else {
            $btn.toggleClass('active');
            
            $buttonGroup.find('.filter-btn').filter(function() {
                var btnVal = String($(this).data('value') || '');
                return btnVal === 'all';
            }).removeClass('active');
            
            var activeValues = [];
            $buttonGroup.find('.filter-btn.active').each(function () {
                var v = String($(this).data('value'));

                if (v !== 'all') {
                    activeValues.push(v);
                }
            });
            
            if (activeValues.length === 0) {
                $buttonGroup.find('.filter-btn').filter(function() {
                    var btnVal = String($(this).data('value') || '');
                    return btnVal === 'all';
                }).addClass('active');
                activeFilters[filterType] = ['all'];
            } else {
                activeFilters[filterType] = activeValues;
            }
        }
        
        applyFilters();
    });
    
    function applyFilters() {
    $('.cargoTable tbody tr').each(function () {
        var $row = $(this);
        var rowFaction = $row.find('td.field_Faction').text().trim();
        var rowRarity = $row.find('td.field_Rarity').text().trim();
        var rowManaCost = $row.find('td.field_Mana').text().trim();
        var rowRadius = $row.find('td.field_AOE_Radius').text().trim();
        var rowIsRanged = $row.find('td.field_isRanged').text().trim();
        var rowTargets = $row.find('td.field_Targets').text().trim();


        
        // 
        var rowAOE = (rowRadius !== '' && rowRadius !== '0') ? 'Yes' : 'No';
        var rowAttackType = rowIsRanged === "Yes" ? "Yes" : "No";
        
        var showRow = true;
        
        // Check faction filter
        if (!activeFilters.faction.includes('all')) {
            if (!activeFilters.faction.includes(rowFaction)) {
                showRow = false;
            }
        }
        
        // Check rarity filter
        if (!activeFilters.rarity.includes('all')) {
            if (!activeFilters.rarity.includes(rowRarity)) {
                showRow = false;
            }
        }
        
        // Check mana cost filter
        if (!activeFilters.manacost.includes('all')) {
            if (!activeFilters.manacost.includes(rowManaCost)) {
                showRow = false;
            }
        }
        
        // Check AOE filter 
        if (!activeFilters.aoe.includes('all')) {
            if (!activeFilters.aoe.includes(rowAOE)) {
                showRow = false;
            }
        }
        
        // Check Attack Type filter 
        if (!activeFilters.attacktype.includes('all')) {
        	if (!activeFilters.attacktype.includes(rowAttackType)) {
        		showRow = false;
    		}
		}
		
		// Check Targets filter
		if (!activeFilters.targets.includes('all')) {
    		if (!activeFilters.targets.includes(rowTargets)) {
        		showRow = false;
			 }
		}

        
        if (showRow) {
            $row.show();
        } else {
            $row.hide();
        }
    });
	}
});

// Switch table for type
$(document).on('click', '.type-switch .filter-btn', function () {
    var type = $(this).data('type');

    $('.type-switch .filter-btn').removeClass('active');
    $(this).addClass('active');

    $('.type-table').hide();
    $('.type-table[data-type="' + type + '"]').show();

    applyFilters(); // apply existing Filter again
});


// Add tooltips to table rows
$(function() {
    // Wait until table loaded
    setTimeout(function() {
        // Field definitions with explanations
        var fieldTooltips = {
            'field_totalHpPerMana': function($td, name) { return name + ' - Total HP per Mana: ' + $td.text().trim(); },
            'field_totalDpsPerMana': function($td, name) { return name + ' - Total DPS per Mana: ' + $td.text().trim(); },
            'field_totalHp': function($td, name) { return name + ' - Total HP (all units): ' + $td.text().trim(); },
            'field_totalDps': function($td, name) { return name + ' - Total DPS (all units): ' + $td.text().trim(); },
            'field_hpPerMana': function($td, name) { return name + ' - HP per Mana: ' + $td.text().trim(); },
            'field_dpsPerMana': function($td, name) { return name + ' - DPS per Mana: ' + $td.text().trim(); },
            'field_DPS': function($td, name) { return name + ' - DPS: ' + $td.text().trim(); },
            'field_Damage': function($td, name) { return name + ' - Damage per hit: ' + $td.text().trim(); },
            'field_Attack_Speed': function($td, name) { return name + ' - Attack Speed: ' + $td.text().trim() + ' seconds'; },
            'field_attacksPerSecond': function($td, name) { return name + ' - Attacks per Second: ' + $td.text().trim(); },
            'field_Move_Speed': function($td, name) { return name + ' - Movement Speed: ' + $td.text().trim() + ' units/sec'; },
            'field_Range': function($td, name) { return name + ' - Attack Range: ' + $td.text().trim() + ' units'; },
            'field_AOE_Radius': function($td, name) { return name + ' - AOE Radius: ' + $td.text().trim() + ' units'; },
            'field_Health': function($td, name) { return name + ' - Health: ' + $td.text().trim() + ' HP'; },
            'field_Mana': function($td, name) { return name + ' - Mana Cost: ' + $td.text().trim(); },
            'field_Count': function($td, name) { return name + ' - Unit Count: ' + $td.text().trim() + ' spawned'; },
            'field_healingpersecond': function($td, name) { return name + ' - Healing per Second: ' + $td.text().trim(); },
            'field_Duration': function($td, name) { return name + ' - Duration: ' + $td.text().trim() + ' seconds'; },
            'field_Delay': function($td, name) { return name + ' - Delay: ' + $td.text().trim() + ' seconds'; },
            'field_Heal': function($td, name) { return name + ' - Heal Amount: ' + $td.text().trim(); },
            'field_ProductionSpeed': function($td, name) { return name + ' - Production Speed: ' + $td.text().trim() + ' sec per unit'; },
            'field_Summoned_Units': function($td, name) { return name + ' - Summoned Units: ' + $td.text().trim(); },
            'field_Heal_per_sec': function($td, name) { return name + ' - Heal per Second: ' + $td.text().trim(); },
            'field_Type': function($td, name) { return name + ' - Type: ' + $td.text().trim(); },
            'field_Faction': function($td, name) { return name + ' - Faction: ' + $td.text().trim(); },
            'field_Rarity': function($td, name) { return name + ' - Rarity: ' + $td.text().trim(); },
            'field_Targets': function($td, name) { return name + ' - Targets: ' + $td.text().trim(); },
            'field_isRanged': function($td, name) { 
                var val = $td.text().trim();
                return name + ' - ' + (val === 'Yes' ? 'Ranged Attack' : 'Melee Attack');
            }
        };
        
        // Apply tooltips to all matching cells
        $('.cargoTable tbody tr').each(function() {
            var $row = $(this);
            
            // Get the minion name from the first cell (usually field_Name or first <a> link)
            var minionName = $row.find('td:first-child').text().trim();
            // Alternative: if name is in a link
            if (!minionName || minionName === '') {
                minionName = $row.find('td:first-child a').text().trim();
            }
            // Fallback
            if (!minionName || minionName === '') {
                minionName = 'Card';
            }
            
            // Loop through each cell in the row
            $row.find('td').each(function() {
                var $td = $(this);
                var classes = $td.attr('class') || '';
                
                // Check if this cell matches any of our tooltip fields
                for (var fieldClass in fieldTooltips) {
                    if (classes.indexOf(fieldClass) !== -1) {
                        var value = $td.text().trim();
                        // Only add tooltip if there's a value
                        if (value && value !== '' && value !== '-') {
                            var tooltipText = fieldTooltips[fieldClass]($td, minionName);
                            $td.addClass('tooltip-header')
                               .attr('data-tooltip', tooltipText);
                        }
                        break;
                    }
                }
            });
        });
        
    }, 500);
});