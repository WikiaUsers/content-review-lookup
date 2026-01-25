const Buffs = {
    Rage: {
        damageMultiplier: 1.5
    },
    
    Haste: {
        attackSpeedMultiplier: 0.67,
        movementSpeedMultiplier: 1.33
    },
    
    Spirit: {
        healthMultiplier: 1.4,
        minHealthBonus: 100,
        maxHealthBonus: 350
    },

    BarrelShield: {
        flatHealthBonus: 60,
        movementSpeedFlat: -2
    },

    GiantGrowth: {
        damageMultiplier: 1.2,
        healthMultiplier: 1.2
    },
    
    Marksmanship: {
        flatRangeBonus: 2
    },
    
    ManaSurge: {
        attackSpeedMultiplier: 0.75
    }
};


// Filter States
var activeFilters = {
        faction: ['all'],
        rarity: ['all'],
        manacost: ['all'],
        aoe: ['all'],
        attacktype: ['all'],
        targets: ['all']
    };

// Result Counter
function updateResultCount() {
    // Find the currently visible table
    var $activeTable = $('.type-table:visible');

    if ($activeTable.length === 0) {
        $('#visible-count').text(0);
        return;
    }

    var $rows = $activeTable.find('tbody tr');
    var visibleRows = $rows.filter(':visible').length;

    $('#visible-count').text(visibleRows);
}

//Apply Filters
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
    updateResultCount();
}
	
// Filter Buttons
$(function () {
    
    
    $(document).on(
	 'click',
	 '.filter-toggle-buttons[data-filter] .filter-btn:not(.type-switch .filter-btn):not(#btn-base-stats):not(#btn-activated-stats)',
	  function () {
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
    applyFilters();
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
            'field_Master_Damage': function($td, name) { return name + ' - Master Damage: ' + $td.text().trim(); },
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

// ---------------------------
// Default Buffs per Unit
// ---
const innateEffects = {
    "High-Mage Leiliel": [ Buffs.Marksmanship, { flatManaBonus: 2 }]
};


// ---------------------------
// Activated Buffs per Unit
// ---------------------------
const activatedEffects = {
	"High-Mage Leiliel": Buffs.ManaSurge,
	"Boom Buggy": Buffs.Marksmanship,
	"Skeleton Crew": { flatCountBonus: 2 },
	"Lone Scout": { flatManaBonus: -1 },
	"Spirit Vessel": Buffs.Spirit,
	'"Armored" Scrats': Buffs.BarrelShield,
    "Dragon Whelp": Buffs.Rage,
    "Tantrum Throwers": Buffs.Rage,
    "Sewer Scrat": Buffs.BarrelShield,
    "Rocket Scrat": Buffs.BarrelShield,
    "Ravenous Swarmers": [ Buffs.Rage, Buffs.Haste]
};

// ---------------------------
// Unified Stat Recalculation System
// ---------------------------
$(function () {

    function storeRaw($cell) {
        if ($cell.length && $cell.data("raw") === undefined) {
            $cell.data("raw", parseFloat($cell.text()));
        }
    }

    function recalcRow($row, includeActivated) {
        const name = $row.find("td:first-child").text().trim();

        // ---- Cells
        const dmgCell   = $row.find(".field_Damage");
        const atkCell   = $row.find(".field_Attack_Speed");
        const hpCell    = $row.find(".field_Health");
        const manaCell  = $row.find(".field_Mana");
        const countCell = $row.find(".field_Count");
        const rangeCell = $row.find(".field_Range");
        const moveCell  = $row.find(".field_Move_Speed");

        const dpsCell   = $row.find(".field_DPS");
        const apsCell   = $row.find(".field_attacksPerSecond");

        const totalDpsCell        = $row.find(".field_totalDps");
        const dpsPerManaCell      = $row.find(".field_dpsPerMana");
        const totalDpsPerManaCell = $row.find(".field_totalDpsPerMana");

        const totalHpCell         = $row.find(".field_totalHp");
        const hpPerManaCell       = $row.find(".field_hpPerMana");
        const totalHpPerManaCell  = $row.find(".field_totalHpPerMana");

        // ---- Store RAW values
        [
            dmgCell, atkCell, hpCell, manaCell, countCell, rangeCell, moveCell,
            dpsCell, apsCell, totalDpsCell, dpsPerManaCell,
            totalDpsPerManaCell, totalHpCell, hpPerManaCell, totalHpPerManaCell
        ].forEach(storeRaw);

        // ---- Pull RAW
        let damage = dmgCell.data("raw");
        let atk    = atkCell.data("raw");
        let hp     = hpCell.data("raw");
        let mana   = manaCell.data("raw");
        let count  = countCell.data("raw");
        let range  = rangeCell.length ? rangeCell.data("raw") : null;
        let move   = moveCell.length ? moveCell.data("raw") : null;

        // ---- Collect buffs
        const innate = innateEffects[name]
            ? (Array.isArray(innateEffects[name]) ? innateEffects[name] : [innateEffects[name]])
            : [];

        const activated = includeActivated && activatedEffects[name]
            ? (Array.isArray(activatedEffects[name]) ? activatedEffects[name] : [activatedEffects[name]])
            : [];

        const effects = [...innate, ...activated];

        // ---- Apply buffs
        effects.forEach(buff => {
            if (buff.damageMultiplier) damage *= buff.damageMultiplier;
            if (buff.attackSpeedMultiplier) atk *= buff.attackSpeedMultiplier;

            if (buff.healthMultiplier) {
                let scaled = hp * buff.healthMultiplier;
                if (buff.minHealthBonus || buff.maxHealthBonus) {
                    let bonus = scaled - hp;
                    if (buff.minHealthBonus) bonus = Math.max(bonus, buff.minHealthBonus);
                    if (buff.maxHealthBonus) bonus = Math.min(bonus, buff.maxHealthBonus);
                    hp += bonus;
                } else {
                    hp = scaled;
                }
            }

            if (buff.flatHealthBonus) hp += buff.flatHealthBonus;
            if (buff.flatManaBonus) mana += buff.flatManaBonus;
            if (buff.flatCountBonus) count += buff.flatCountBonus;
            if (buff.flatRangeBonus && range !== null) range += buff.flatRangeBonus;
            if (buff.movementSpeedMultiplier && move !== null) move *= buff.movementSpeedMultiplier;
            if (buff.movementSpeedFlat && move !== null) move += buff.movementSpeedFlat;
        });

        // ---- Safety clamps
        damage = Math.round(damage);
        atk    = Math.max(0.1, +atk.toFixed(2));
        hp     = Math.max(1, Math.round(hp));
        mana   = Math.max(1, Math.round(mana));
        count  = Math.max(1, Math.round(count));
        if (range !== null) range = Math.max(0, Math.round(range));
        if (move !== null)  move  = Math.round(move);

        // ---- Derived
        const aps = 1 / atk;
        const dps = damage / atk;

        // ---- Write back
        dmgCell.text(damage);
        atkCell.text(atk.toFixed(2));
        apsCell.text(aps.toFixed(2));
        dpsCell.text(dps.toFixed(2));

        hpCell.text(hp);
        manaCell.text(mana);
        countCell.text(count);
        if (rangeCell.length) rangeCell.text(range);
        if (moveCell.length)  moveCell.text(move);

        if (totalDpsCell.length)        totalDpsCell.text((dps * count).toFixed(2));
        if (dpsPerManaCell.length)      dpsPerManaCell.text((dps / mana).toFixed(2));
        if (totalDpsPerManaCell.length) totalDpsPerManaCell.text(((dps * count) / mana).toFixed(2));

        if (totalHpCell.length)         totalHpCell.text((hp * count).toFixed(0));
        if (hpPerManaCell.length)       hpPerManaCell.text((hp / mana).toFixed(2));
        if (totalHpPerManaCell.length)  totalHpPerManaCell.text(((hp * count) / mana).toFixed(2));
    }

    // ---- Buttons
    $("#btn-base-stats").on("click", function () {
        $(".cargoTable tbody tr").each(function () {
        	$("#btn-base-stats").addClass("active");
    		$("#btn-activated-stats").removeClass("active");
            recalcRow($(this), false); // raw + innate
        });
    });

    $("#btn-activated-stats").on("click", function () {
        $(".cargoTable tbody tr").each(function () {
        	$("#btn-activated-stats").addClass("active");
			$("#btn-base-stats").removeClass("active");
            recalcRow($(this), true); // raw + innate + activated
        });
    });

    // ---- Initial load: show base stats WITH innate b
	 $(".cargoTable tbody tr").each(function () {
	        recalcRow($(this), false);
	    });
	
	});