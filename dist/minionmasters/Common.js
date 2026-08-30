const Buffs = {
    Rage: {
        damageMultiplier: 1.5
    },
    
    BerserkerRage: {
        damageMultiplier: 2
    },
    
    Haste: {
        attackSpeedMultiplier: 1.33 ** -1, // Attackspeed in the Game is defined as Time/Attack, but for Calculations Attack/Time is taken, so it is multiplicated with: 1.33^-1
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
        attackSpeedMultiplier: 1.25 **  -1		// Attackspeed in the Game is defined as Time/Attack, but for Calculations Attack/Time is taken, so it is multiplicated with: 1.25^-1
    },
    
    Marked: {
        damageMultiplier: 1.35
    },
    
    Slow: {
    	attackSpeedMultiplier: 0.8 ** -1,		// Attackspeed in the Game is defined as Time/Attack, but for Calculations Attack/Time is taken, so it is multiplicated with: 0.8^-1
        movementSpeedMultiplier: 0.8
    }
};

// ---------------------------
// Default Buffs per Unit
// ---
const innateEffects = {
	//Accursed
	"Lone Wolf": Buffs.Rage,
	"Spirit Vessel": Buffs.Spirit,
	"Undying Skeleton": { flatCountBonus: 1 },
	//Crystal Elf
	"Sugilite Shield": { flatManaBonus: 1 },
    "High-Mage Leiliel": [ Buffs.Marksmanship, { flatManaBonus: 2 }],
    "Resonating Construct": { flatManaBonus: 2 },
    "Crystal Construct": Buffs.Haste,
    "Leiliel's Vortex": { flatManaBonus: 1 },
    "Arcane Barrage": [{ flatManaBonus: 1 }, { damageMultiplier: 2 }],
    "Resonating Blast Crystal": { flatManaBonus: 2 },
    "Mana Puff Madness": { flatManaBonus: 1 },
    "Border Patrol": { flatManaBonus: 2 },
    //Empyrean
    "Tantrum Throwers": Buffs.Rage,
    //Outlander
    "Vulture Prime A83": Buffs.Marked,
    "A.I.M. Bot": Buffs.Marked,
    //Scrats
    "Zeppelin Bomber": Buffs.BarrelShield,
    '"Armored" Scrats': Buffs.BarrelShield,
    "Sewer Scrat": [Buffs.BarrelShield, { poisonDuration: 2.5, poisonTickDamage: 10 }],
    "Rocket Scrat": Buffs.BarrelShield,
    "Screaming Scrat": Buffs.BarrelShield,
    //Slither
    "Empowered Soul Stealer": Buffs.Rage,
    "An'Kahesh, Desert's Doom": { poisonDuration: 3.5, poisonTickDamage: 10 },
    "Slitherbound Lancer": { poisonDuration: 1.5, poisonTickDamage: 10 },
    "Slitherbound Darter": { poisonDuration: 1.5, poisonTickDamage: 10 },
    "Spiderlings": { poisonDuration: 1.3, poisonTickDamage: 10 },
    "Rabid Prowler": { poisonDuration: 2, poisonTickDamage: 10 },
    "Akinlep's Gong of Pestilence": { poisonDuration: 4, poisonTickDamage: 10 },
    "Poison Strike": { poisonDuration: 8, poisonTickDamage: 10 },
    
    //Stoutheart
    "Groggy Woodsman": [{healthMultiplier: 0.5}, Buffs.Slow],
    "Adventuring Party": [{healthMultiplier: 0.5}, Buffs.Slow],
    //Voidborne
    "Morgrul's Ragers": Buffs.BerserkerRage,
    "Brothers of the Void": Buffs.Rage,
    "Shars'Rakk Twins": Buffs.Rage,
    // Zen-Chi
    "Shen Stormstrike": { attackSpeedMultiplier: 2 },
};


// ---------------------------
// Activated Buffs per Unit
// ---------------------------
const activatedEffects = {
	//Accursed
	"Skeleton Crew": { flatCountBonus: 2 },
	"Skeletons": { flatCountBonus: 3 },
	"The Revenant": [ Buffs.Rage, Buffs.Haste],
	"Tombstone": { flatHealthBonus: 1000 },
	"Harmful Souls": { damageMultiplier: 1.6 },
	//Crystal Elf
	"Lone Scout":  [Buffs.Haste, Buffs.ManaSurge] ,
	"Mana Chaser": [ { flatManaBonus: 3 }, { flatCountBonus: 2 }],
	"Arcane Golem": [{ flatHealthBonus: 250}, {damageMultiplier: 2.67}],	//Milloween Perk
	"Crystal Arcanist": Buffs.ManaSurge,
	"Crystal Archers": Buffs.ManaSurge,
	"High-Mage Leiliel": Buffs.ManaSurge,
	"Spelldancer": [{ flatManaBonus: 2 }, Buffs.ManaSurge],
	"Lady Infray the Spire Warden": Buffs.ManaSurge,
	"Wardancers": Buffs.ManaSurge,
	"Crystal Construct": { flatManaBonus: -1 },
	"Lord-Sentinel Thelec": { flatManaBonus: 2 },
	"Armored Escort": { flatManaBonus: 3 },
	"Arcane Barrage": { damageMultiplier: 5 },
	"Arcane Bolt": { flatManaBonus: 2 },
	"Resonating Blast Crystal": { damageMultiplier: 3 },
	//Empyrean
	"Legionnaires": [{ flatCountBonus: 1 }, { flatManaBonus: 1 }],
	"Shielded Crossbow Dudes": { flatCountBonus: 1 },
	"Zealots of the Burning Fist": [ Buffs.Rage, Buffs.Haste, { flatCountBonus: -1 }],
	"Smite": [{ damageMultiplier: 1.5 }, { flatManaBonus: 1 }, {flatHealBonus: 75}],
	"City Watch": { flatManaBonus: 2 },
	//Outlander
	"Simulacrum": Buffs.Haste,
	"Ion Grenade": { damageMultiplier: 4 },
	"Null Matrix": { damageMultiplier: 1.5 },
	//Scrats
	"Scrat Pack": Buffs.Haste,
	"Jolo the Hero Scrat": Buffs.Haste,
	"Propeller Horde": { flatCountBonus: 1 },
	"Zeppelin Bomber":[ Buffs.Rage, Buffs.Haste, {flatHealthBonus: -60}, {movementSpeedFlat: 2}],
	"Boom Buggy": Buffs.Marksmanship,
	"Zipp's Zappinator": { damageMultiplier: 4 },
	"Wartrack Dreadnaught": [{ flatManaBonus: 4 }, { damageMultiplier: 2 }, { flatHealthBonus: 350}],
	//Slither
	"Taloc, the Vessel": { damageMultiplier: 1.5 },
	"Soul Stealer": {attackSpeedMultiplier: 2.5 ** -1},
	"Rabid Prowler": Buffs.Haste,
	"Impatient Statue": Buffs.Haste,
	"Empowered Soul Stealer": {attackSpeedMultiplier: 2.5 ** -1},
	"Poison Strike": { poisonDuration: 8, poisonTickDamage: 10 },
	//Stoutheart
	"Woodsman": Buffs.Haste,
	"Groggy Woodsman": [Buffs.Haste, {attackSpeedMultiplier: 0.8}, {movementSpeedMultiplier: 1.2}],
	"Adventuring Party": [Buffs.Haste, {attackSpeedMultiplier: 0.8}, {movementSpeedMultiplier: 1.2}, { flatManaBonus: 2 }],
	"Caber Tosser": Buffs.Haste,
	"Urclaw, Protector of the Peaks": [Buffs.BerserkerRage, Buffs.Haste],
	"Fergus Flagon Fighter": {movementSpeedFlat: 2},
	"Mountainshaper": { damageMultiplier: 10 },
	//Voidborne
	"Boomer": { flatManaBonus: -1 },
	"Illusory Dragon Whelp": [ {flatManaBonus: 1} , {flatCountBonus: 2}],
	"Dragon Whelp": Buffs.Rage,
	"Ravenous Swarmers": [ Buffs.Rage, Buffs.Haste],
	"Morgrul's Ragers": { flatManaBonus: 1 },
	"Demon Warrior": [{ damageMultiplier: 2 }, {healthMultiplier: 2}],
	"Flightless Dragons": Buffs.Rage,
	"Dragon Pack": { flatManaBonus: -1 },
	"Gor'Rakk Gate": { flatManaBonus: -1 },
	// Zen-Chi
	"Xiao Long": [Buffs.Rage, Buffs.Haste],
	"Battle Shi-Hou": {attackSpeedMultiplier: 4.5 ** -1},
	"Feng the Wanderer": [Buffs.Rage, Buffs.Spirit, Buffs.GiantGrowth], //Assuming this Buffs-Combination for him
	"Shen Stormstrike": { attackSpeedMultiplier: 0.5 },
	"Red Golem": [Buffs.Rage, Buffs.Spirit],
	"Shen's Shock Stick": { damageMultiplier: 4 },
};

// multi Units
const baseMultiUnits = {
    "Jadespark Watchers": [
        { unit: "Windwalker Shi-Hou", count: 2 },
        { unit: "Jade Flingers", count: 2 }
    ],
    "City Watch": [
        { unit: "Legionnaires", count: 1 },
        { unit: "Crossbow Dudes", count: 2 }
    ],
    "Border Patrol": [
        { unit: "Crystal Sentry", count: 1 },
        { unit: "Crystal Arcanist", count: 1 }
    ],
    "Drone Walker": [
        { unit: "Gn4ts", count: 1 }	
    ],
    "A.I.M. Bot": [
        { unit: "Gn4ts", count: 2 }
    ],
    "High Marshal Rystar": [
        { unit: "Legionnaires", count: 4 }
    ],
    "Lost Legionnaires": [
        { unit: "Legionnaires", count: 1 }
    ],
    "Legionnaires": [
        { unit: "Legionnaires", count: 1 }
    ],
	"Slitherbound": [
        { unit: "Slitherbound Lancer", count: 1 },
        { unit: "Slitherbound Darter", count: 1 }
    ],
    "Lord-Sentinel Thelec": [
        { unit: "Crystal Archers", count: 1 }
    ],

    
};

const activatedMultiUnits = {
    "Lord-Sentinel Thelec": [
        { unit: "Crystal Archers", count: 5 }
    ],
    "City Watch": [
        { unit: "Legionnaires", count: 3 }
    ],
    "Wrecked Walker": [
        { unit: "Gn4ts", count: 2 }
    ],
    "Adventuring Party": [
        { unit: "Priestess", count: 1 },
        { unit: "Crystal Arcanist", count: 1 }
    ],
	"Wartrack Dreadnaught": [
        { unit: "Missile Scrat", count: 1 }
    ],
   
};

// Only these units pass damage multipliers to their child units
const multiUnitBuffInheritance = {
    "A.I.M. Bot": true
};

// Cards that derive their stats from other cards
const statProxies = {
    "Brothers of the Void": {
        base: "Assassin",
        activated: "Fire Imp"
    },
    "Shars'Rakk Twins": {
        base: "Incubus",
        activated: "Succubus"
    },
    "Gor'Rakk Brutes": {
        base: "Rammer",
        activated: "Cleaver"
    },
    "Lone Wolf": {
        base: "Warrior",
        activated: "Werewolf"
    },
        "Chain Gang": {
        base: "Slitherbound Lancer",
        activated: "Slitherbound Darter"
    }
};


// Filter States
var activeFilters = {
        faction: ['all'],
        rarity: ['all'],
        manacost: ['all'],
        aoe: ['all'],
        attacktype: ['all'],
        targets: ['all'],
        wildcards: ['all'],
        count: ['all']
    };
    
// ---------------------------
// Card Stats: dynamic stat filter
// ---------------------------

const statFieldClassMap = {
    "health": "field_Health",
    "damage": "field_Damage",
    "dps": "field_DPS",
    "attackSpeed": "field_Attack_Speed"
};

var tableStatField = "";
var tableStatOperator = ">=";
var tableStatValue = null;

$("#table-stat-filter-container").html(
    '<select id="table-stat-filter-field">' +
        '<option value="">Any stat</option>' +
        '<option value="health">Health</option>' +
        '<option value="damage">Damage</option>' +
        '<option value="dps">DPS</option>' +
        '<option value="attackSpeed">Attack Speed</option>' +
    '</select>' +
    '<select id="table-stat-filter-operator">' +
        '<option value=">=">&ge;</option>' +
        '<option value="<=">&le;</option>' +
        '<option value="=">=</option>' +
    '</select>' +
    '<input type="number" id="table-stat-filter-value" placeholder="Value" />'
);

$(document).on("change input", "#table-stat-filter-field, #table-stat-filter-operator, #table-stat-filter-value", function () {
    tableStatField = $("#table-stat-filter-field").val();
    tableStatOperator = $("#table-stat-filter-operator").val();
    const raw = $("#table-stat-filter-value").val();
    tableStatValue = raw === "" ? null : parseFloat(raw);
    applyFilters();
});

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

//helper fuction for unit count
function getUnitCountBucket(val) {
    var num = parseFloat(val);
    if (!isFinite(num)) return '';
    if (num >= 5) return '4+';
    return String(num);
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
        var rowWildcard = $row.find('td.field_CopiesAllowed').text().trim();
        var rowCountRaw = $row.find('td.field_Count').text().trim();
        var rowCount = getUnitCountBucket(rowCountRaw);

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
		
		// Check Wildcards filter
		if (!activeFilters.wildcards.includes('all')) {
		    if (!activeFilters.wildcards.includes(rowWildcard)) {
		        showRow = false;
		    }
		}
		
		// Check Unit Count filter
		if (!activeFilters.count.includes('all')) {
		    if (!activeFilters.count.includes(rowCount)) {
		        showRow = false;
		    }
		}

        // Check dynamic stat filter
        if (tableStatField && tableStatValue !== null) {
            var statClass = statFieldClassMap[tableStatField];
            var rawStat = $row.find('td.' + statClass).text().trim().replace(/,/g, "");
            var statNum = parseFloat(rawStat);

            if (!Number.isFinite(statNum)) {
                showRow = false;
            } else if (tableStatOperator === ">=" && !(statNum >= tableStatValue)) {
                showRow = false;
            } else if (tableStatOperator === "<=" && !(statNum <= tableStatValue)) {
                showRow = false;
            } else if (tableStatOperator === "=" && statNum !== tableStatValue) {
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
        // After filters update, reapply search
		const query = $("#table-search").val().toLowerCase();
		if (query !== "") {
		    applySearch(query);
		}
    });
    applyFilters();
    // After filters update, reapply search
	const query = $("#table-search").val().toLowerCase();
	if (query !== "") {
	    applySearch(query);
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
    // After filters update, reapply search
	const query = $("#table-search").val().toLowerCase();
	if (query !== "") {
	    applySearch(query);
	}
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
            },
            'field_CopiesAllowed': function($td, name) {
			    const raw = $td.text().trim();
			    const num = parseInt(raw, 10);
			    const shown = Number.isFinite(num) ? (num - 1) : raw;
			    return name + ' - Wildcards: ' + shown;
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
// Unified Stat Recalculation System
// ---------------------------
$(function () {

	function storeRaw($cell) {
	    if ($cell.length && $cell.data("raw") === undefined) {
	        let text = $cell.text().trim();
	
	        if (text === "" || text === "-") {
	            $cell.data("raw", null);
	            return;
	        }
	
	        
	        // Remove commas only (thousand separators)
			text = text.replace(/,/g, "");

	
	        const num = parseFloat(text);
	        $cell.data("raw", Number.isFinite(num) ? num : null);
	    }
	}


    
    function storeRawText($cell) {
	    if ($cell.length && $cell.data("rawText") === undefined) {
	        $cell.data("rawText", $cell.text().trim());
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
        const healCell = $row.find(".field_Heal");


        const dpsCell   = $row.find(".field_DPS");
        const apsCell   = $row.find(".field_attacksPerSecond");

        const totalDpsCell        = $row.find(".field_totalDps");
        const dpsPerManaCell      = $row.find(".field_dpsPerMana");
        const totalDpsPerManaCell = $row.find(".field_totalDpsPerMana");

        const totalHpCell         = $row.find(".field_totalHp");
        const hpPerManaCell       = $row.find(".field_hpPerMana");
        const totalHpPerManaCell  = $row.find(".field_totalHpPerMana");

        // ---- Store RAW values once
		[dmgCell, atkCell, hpCell, manaCell, countCell, rangeCell, moveCell,
		 dpsCell, apsCell, totalDpsCell, dpsPerManaCell,
		 totalDpsPerManaCell, totalHpCell, hpPerManaCell, totalHpPerManaCell,
		 healCell
		].forEach(storeRaw);

		    
		    // Store raw text for display-only fields (once)
			storeRawText($row.find(".field_Targets"));
			storeRawText($row.find(".field_isRanged"));
			storeRawText($row.find(".field_AOE_Radius"));



        // ---- Pull RAW
        let damage = dmgCell.data("raw");
        let atk = atkCell.length ? atkCell.data("raw") : null;
        let hp     = hpCell.data("raw");
        let mana   = manaCell.data("raw");
        let count  = countCell.data("raw");
        let range  = rangeCell.length ? rangeCell.data("raw") : null;
        let move   = moveCell.length ? moveCell.data("raw") : null;
        let heal = healCell.length ? healCell.data("raw") : null;
        if (!Number.isFinite(heal)) { heal = 0; }





        
        // ---- Proxy override (safe, no DOM writes)
			let proxyTargets, proxyIsRanged, proxyAOE;
			
			if (statProxies[name]) {
			    const proxyName = includeActivated
			        ? statProxies[name].activated
			        : statProxies[name].base;
			
			    if (proxyName) {
			        const $sourceRow = $('.cargoTable tbody tr').filter(function () {
			            return $(this).find("td:first-child").text().trim() === proxyName;
			        });
			
			        if ($sourceRow.length) {
			
			            // ENSURE RAW IS STORED FOR SOURCE ROW
			            $sourceRow.find("td").each(function () {
			                storeRaw($(this));
			            });
			
			            //  Pull source values from RAW
						let sDmg   = $sourceRow.find(".field_Damage").data("raw");
						let sAtk   = $sourceRow.find(".field_Attack_Speed").data("raw");
						let sHp    = $sourceRow.find(".field_Health").data("raw");
						let sRange = $sourceRow.find(".field_Range").data("raw");
						let sMove  = $sourceRow.find(".field_Move_Speed").data("raw");
						
						// Apply the proxy unit's own buffs (innate + activated) to these stats
						let proxyEffects = [];
						
						if (innateEffects[proxyName]) {
						    proxyEffects = proxyEffects.concat(
						        Array.isArray(innateEffects[proxyName]) ? innateEffects[proxyName] : [innateEffects[proxyName]]
						    );
						}
						
						if (includeActivated && activatedEffects[proxyName]) {
						    proxyEffects = proxyEffects.concat(
						        Array.isArray(activatedEffects[proxyName]) ? activatedEffects[proxyName] : [activatedEffects[proxyName]]
						    );
						}
						
						proxyEffects.forEach(buff => {
						    if (buff.damageMultiplier && Number.isFinite(sDmg)) {
						        sDmg *= buff.damageMultiplier;
						    }
						
						    if (buff.poisonDuration && buff.poisonTickDamage && Number.isFinite(sDmg)) {
						        const ticks = buff.poisonDuration / 0.5;
						        sDmg += ticks * buff.poisonTickDamage;
						    }
						
						    if (buff.healthMultiplier && Number.isFinite(sHp)) {
						        let scaled = sHp * buff.healthMultiplier;
						        if (buff.minHealthBonus || buff.maxHealthBonus) {
						            let bonus = scaled - sHp;
						            if (buff.minHealthBonus) bonus = Math.max(bonus, buff.minHealthBonus);
						            if (buff.maxHealthBonus) bonus = Math.min(bonus, buff.maxHealthBonus);
						            sHp += bonus;
						        } else {
						            sHp = scaled;
						        }
						    }
						
						    if (buff.flatHealthBonus && Number.isFinite(sHp)) sHp += buff.flatHealthBonus;
						    if (buff.flatRangeBonus && Number.isFinite(sRange)) sRange += buff.flatRangeBonus;
						});
						
						// Now assign to the proxy card
						if (Number.isFinite(sDmg))   damage = sDmg;
						if (Number.isFinite(sAtk))   atk    = sAtk;
						if (Number.isFinite(sHp))    hp     = sHp;
						if (Number.isFinite(sRange)) range  = sRange;
						if (Number.isFinite(sMove))  move   = sMove;


						


			
			            // Copy display-only fields from original raw text
						proxyTargets  = $sourceRow.find(".field_Targets").data("rawText");
						proxyIsRanged = $sourceRow.find(".field_isRanged").data("rawText");
						proxyAOE = $sourceRow.find(".field_AOE_Radius").data("rawText");

			        }
			    }
			}


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
            if (buff.damageMultiplier && Number.isFinite(damage)) {
			    damage *= buff.damageMultiplier;
			}
			
			if (buff.attackSpeedMultiplier && Number.isFinite(atk)) {
			    atk *= buff.attackSpeedMultiplier;
			}
			
			if (buff.healthMultiplier && Number.isFinite(hp)) {
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
			
			if (buff.flatHealBonus && Number.isFinite(heal)) {
			    heal += buff.flatHealBonus;
			}
			
			// Poison: damage over time applied per hit
			// Poison applies even if the card has no base damage (e.g., spells)
			if (buff.poisonDuration && buff.poisonTickDamage) {
			
			    // If the unit has no base damage, initialize it to 0
			    if (!Number.isFinite(damage)) {
			        damage = 0;
			    }
			
			    const ticks = buff.poisonDuration / 0.5;
			    const poisonPerHit = ticks * buff.poisonTickDamage;
			    damage += poisonPerHit;
			}



			
			if (buff.flatHealthBonus && Number.isFinite(hp)) hp += buff.flatHealthBonus;
			if (buff.flatManaBonus && Number.isFinite(mana)) mana += buff.flatManaBonus;
			if (buff.flatCountBonus && Number.isFinite(count)) count += buff.flatCountBonus;
			if (buff.flatRangeBonus && Number.isFinite(range)) range += buff.flatRangeBonus;
			
			if (buff.movementSpeedMultiplier && Number.isFinite(move)) {
			    move *= buff.movementSpeedMultiplier;
			}
			
			if (buff.movementSpeedFlat && Number.isFinite(move)) {
			    move += buff.movementSpeedFlat;
			}

        });

        // ---- Safety clamps
        if (Number.isFinite(damage)) damage = Math.round(damage);
		if (Number.isFinite(atk)) atk = Math.max(0.1, +atk.toFixed(2));
		if (Number.isFinite(hp)) hp = Math.max(1, Math.round(hp));
		if (Number.isFinite(mana)) mana = Math.max(0, Math.round(mana));
		if (Number.isFinite(count)) count = Math.max(1, Math.round(count));
		if (Number.isFinite(range)) range = Math.max(0, parseFloat(range.toFixed(2)));
		if (Number.isFinite(move)) move = Math.round(move);







        // ---- Derived
		let aps = null;
		let dps = null;
		
		if (Number.isFinite(atk) && atk > 0) {
		    aps = 1 / atk;
		    dps = Number.isFinite(damage) ? damage / atk : null;
		}




		// ---- Write back
		// Helper to safely format numbers
		const safe = v => Number.isFinite(v) ? v : "";


		// Helper to safely format numbers with decimals
		const safeFixed = v => Number.isFinite(v) ? v.toFixed(2) : "";
		
		
		// Base stats
		dmgCell.text(safe(damage));
		atkCell.text(safeFixed(atk));
		apsCell.text(aps !== null ? aps.toFixed(2) : "");
		dpsCell.text(dps !== null ? dps.toFixed(2) : "");

		
		hpCell.text(safe(hp));
		manaCell.text(safe(mana));
		countCell.text(safe(count));
		
		if (healCell.length) healCell.text(safe(heal));

		
		// Proxy display-only fields (write once)
			if (proxyTargets !== undefined)
			    $row.find(".field_Targets").text(proxyTargets);
			
			if (proxyIsRanged !== undefined)
			    $row.find(".field_isRanged").text(proxyIsRanged);
			
			
			const aoeCell = $row.find(".field_AOE_Radius");
			
			if (proxyAOE !== undefined) {
			    aoeCell.text(proxyAOE);
			} else {
			    aoeCell.text(aoeCell.data("rawText"));
			}



		
		// Optional single-value stats
		if (rangeCell.length) rangeCell.text(safeFixed(range));
		if (moveCell.length)  moveCell.text(safe(move));
		
		
		
		// Determine active multi-unit list
		let activeMultiUnits = [];
		
		if (baseMultiUnits[name]) {
		    activeMultiUnits = activeMultiUnits.concat(baseMultiUnits[name]);
		}
		
		if (includeActivated && activatedMultiUnits[name]) {
		    activeMultiUnits = activeMultiUnits.concat(activatedMultiUnits[name]);
		}

		
		
		// Derived DPS stats
		// ---- Multi-unit TOTAL DPS contribution
		let extraTotalDps = 0;
		
		if (activeMultiUnits.length > 0) {
		    activeMultiUnits.forEach(entry => {
		        const { unit, count: childCount } = entry;
		
		        // Find the child row by name
		        const $sourceRow = $row.closest('.cargoTable').find('tbody tr').filter(function () {
					const rowName = $(this).find("td:first-child").text().trim().toLowerCase();
					return rowName === unit.trim().toLowerCase();
		        });
		
		        if (!$sourceRow.length) return;
		
		        // Read the child's FINAL DPS (already includes buffs, poison, proxies, etc.)
		        const childDpsCell = $sourceRow.find(".field_DPS");
		        let childDps = parseFloat(childDpsCell.text());
		
		        if (!Number.isFinite(childDps)) return;
		
		        // ---- Apply parent → child inheritance (A.I.M. Bot)
		        if (multiUnitBuffInheritance[name]) {
		            effects.forEach(buff => {
		                if (buff.damageMultiplier && Number.isFinite(childDps)) {
		                    childDps *= buff.damageMultiplier;
		                }
		            });
		        }
		
		        // Add to total
		        extraTotalDps += childDps * childCount;
		    });
		}



		
		// ---- Derived DPS stats (with multi-unit bonus)
		if (dps !== null && Number.isFinite(count)) {
		    const baseTotalDps = dps * count;
		    const finalTotalDps = baseTotalDps + extraTotalDps;
		
		    totalDpsCell.text(finalTotalDps.toFixed(2));
		
		    if (Number.isFinite(mana) && mana > 0) {
		        dpsPerManaCell.text((dps / mana).toFixed(2));
		        totalDpsPerManaCell.text((finalTotalDps / mana).toFixed(2));
		    } else {
		        dpsPerManaCell.text("");
		        totalDpsPerManaCell.text("");
		    }
		
		} else if (extraTotalDps > 0) {
		    // Parent has no DPS but children do
		    totalDpsCell.text(extraTotalDps.toFixed(2));
		
		    if (Number.isFinite(mana) && mana > 0) {
		        dpsPerManaCell.text("");
		        totalDpsPerManaCell.text((extraTotalDps / mana).toFixed(2));
		    } else {
		        dpsPerManaCell.text("");
		        totalDpsPerManaCell.text("");
		    }
		
		} else {
		    totalDpsCell.text("");
		    dpsPerManaCell.text("");
		    totalDpsPerManaCell.text("");
		}

		
		// Derived HP stats
		// ---- Multi-unit TOTAL HP contribution
		let extraTotalHp = 0;
		
		if (activeMultiUnits.length > 0) {
		    activeMultiUnits.forEach(entry => {
		        const { unit, count: childCount } = entry;
		
		        const $sourceRow = $row.closest('.cargoTable').find('tbody tr').filter(function () {
				    const rowName = $(this).find("td:first-child").text().trim().toLowerCase();
				    return rowName === unit.toLowerCase();
				});

		
		        if ($sourceRow.length) {
		            const hpCellChild = $sourceRow.find(".field_Health");
		            storeRaw(hpCellChild);
		
		            const childHp = hpCellChild.data("raw");
		
		            if (Number.isFinite(childHp)) {
		                extraTotalHp += childHp * childCount;
		            }
		        }
		    });
		}

		
		// ---- Derived HP stats (with multi-unit bonus)
		if (Number.isFinite(hp) && Number.isFinite(count)) {
		    // Parent has its own HP
		    const baseTotal = hp * count;
		    const finalTotal = baseTotal + extraTotalHp;
		
		    totalHpCell.text(finalTotal.toFixed(0));
		
		    if (Number.isFinite(mana) && mana > 0) {
		        hpPerManaCell.text((hp / mana).toFixed(2));
		        totalHpPerManaCell.text((finalTotal / mana).toFixed(2));
		    } else {
		        hpPerManaCell.text("");
		        totalHpPerManaCell.text("");
		    }
		
		} else if (extraTotalHp > 0) {
		    // Parent has NO HP but DOES have multi-unit HP
		    totalHpCell.text(extraTotalHp.toFixed(0));
		
		    if (Number.isFinite(mana) && mana > 0) {
		        hpPerManaCell.text(""); // no base hp
		        totalHpPerManaCell.text((extraTotalHp / mana).toFixed(2));
		    } else {
		        hpPerManaCell.text("");
		        totalHpPerManaCell.text("");
		    }
		
		} else {
		    // No HP at all
		    totalHpCell.text("");
		    hpPerManaCell.text("");
		    totalHpPerManaCell.text("");
		}

}

function recalcCargoTable(ActivatedStats) {

    for (let i = 0; i < 2; i++) {
        $(".cargoTable tbody tr").each(function () {
            recalcRow($(this), ActivatedStats);
        });
    }
}

    
function resortCargoTable() {
    const $table = $('.type-table:visible');
    if (!$table.length) return;

    const $sortedTh = $table.find('th.headerSortUp, th.headerSortDown').first();
    if (!$sortedTh.length) return;

    // Force Cargo to re-sort by toggling thrice
    $sortedTh.trigger('click');
    $sortedTh.trigger('click');
    $sortedTh.trigger('click');
}


    // ---- Buttons
	$("#btn-base-stats").on("click", function () {
		// Set new Button State
		$("#btn-base-stats").addClass("active");
		$("#btn-activated-stats").removeClass("active");
		// recalctable and sort again
		recalcCargoTable(false);
		resortCargoTable();
	});
	
	$("#btn-activated-stats").on("click", function () {
		// Set new Button State
	    $("#btn-activated-stats").addClass("active");
	    $("#btn-base-stats").removeClass("active");
		// recalctable and sort again
		recalcCargoTable(true);
		resortCargoTable();
	});

    // ---- Initial load: show base stats (with the default buffs applied)
	 recalcCargoTable(false);
});

// Search Function for Seach field
function applySearch(query) {

	 // Start from ALL rows
	    const $rows = $('.type-table:visible tbody tr');
	
	    // Apply filters first (baseline visibility)
	    applyFilters();
	
	    // If search is empty → stop here
	    if (query === "") {
	        updateResultCount();
	        return;
	    }
	
	    // Apply search ONLY to rows that filters kept visible
	    $('.type-table:visible tbody tr:visible').each(function () {
	        const name = $(this).find("td:first-child").text().trim().toLowerCase();
	        $(this).toggle(name.includes(query));
	    });
	
	    updateResultCount();
}


// Search field for Cargo table
$("#table-search-container").html(
    '<input type="text" id="table-search" placeholder="Search cards..." />'
);

$(document).on("input", "#table-search", function () {
    const query = $(this).val().toLowerCase();

    applySearch(query);
});




// ---------------------------
// Deckbuilder Test
// ---------------------------

// ---------------------------
// Deckbuilder Notifications
// ---------------------------

function showNotification(message, type = "info") {
    let notification = document.getElementById("deck-notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "deck-notification";
        document.body.appendChild(notification);
    }

    notification.className = "deck-notification " + type;
    notification.textContent = message;

    // Restart animation if it is already visible
    void notification.offsetWidth;

    notification.classList.add("show");

    clearTimeout(notification._timeout);
    notification._timeout = setTimeout(function () {
        notification.classList.remove("show");
    }, 2500);
}

function showConfirm(message, onConfirm) {
    const overlay = $("<div>", {
        id: "deck-confirm-overlay"
    });

    const modal = $("<div>", {
        id: "deck-confirm-modal"
    });

    const text = $("<div>", {
        class: "deck-confirm-message",
        text: message
    });

    const buttons = $("<div>", {
        class: "deck-confirm-buttons"
    });

    const cancelBtn = $("<button>", {
        class: "deck-confirm-cancel",
        text: "Cancel"
    });

    const confirmBtn = $("<button>", {
        class: "deck-confirm-ok",
        text: "Continue"
    });

    buttons.append(confirmBtn, cancelBtn);
    modal.append(text, buttons);
    overlay.append(modal);
    $("body").append(overlay);

    // Show
    setTimeout(function () {
        overlay.addClass("show");
    }, 10);

    function close() {
        overlay.removeClass("show");

        setTimeout(function () {
            overlay.remove();
        }, 200);
    }

    cancelBtn.on("click", function () {
        close();
    });

    confirmBtn.on("click", function () {
        close();
        onConfirm();
    });

    // Allow Escape to cancel
    $(document).on("keydown.deckConfirm", function (e) {
        if (e.key === "Escape") {
            close();
            $(document).off("keydown.deckConfirm");
        }
    });

    // Clicking outside the modal cancels
    overlay.on("click", function (e) {
        if (e.target === this) {
            close();
        }
    });
}

$(function () {

    const collection = document.getElementById("card-collection");
    const deck = document.getElementById("deck");
    const deckSticky = document.getElementById("deck-sticky");
    let selectedMaster = null;
	let mastersList = [];

    // Only run on the deckbuilder page
    if (!collection) {
        return;
    }
    
    const deckRowEl = document.getElementById("deck-row");
	const deckRowStickyEl = document.getElementById("deck-row-sticky");
	
	if (deckRowEl && deckRowStickyEl) {
	
	    const stickyObserver = new IntersectionObserver(function (entries) {
	        entries.forEach(function (entry) {
	            deckRowStickyEl.classList.toggle("visible", !entry.isIntersecting);
	        });
	    }, { threshold: 0, rootMargin: "350px 0px 0px 0px" });
	
	    stickyObserver.observe(deckRowEl);
	}
    
    // ---------------------------
	// deck-code format 
	// ---------------------------
	
	const DECKCODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+â";
	
	const masterHeroOrder = [
	    "Stormbringer", "Volco", "Mordar", "Ravager", "Ratbo", "King Puff",
	    "Apep", "Settsu", "Milloween", "R3-KT", "Diona", "Morellia",
	    "Valorian", "Tronveir"
	];
	
	const perkBitOrder = ["reserved", "perk1", "perk2", "perk3"]; // confirmed
	
	function intToBits(num, width) {
	    return num.toString(2).padStart(width, "0");
	}
	
	function bitsToDeckCode(bits) {
	    while (bits.length % 6 !== 0) bits += "0";
	    let out = "";
	    for (let i = 0; i < bits.length; i += 6) {
	        out += DECKCODE_ALPHABET[parseInt(bits.substr(i, 6), 2)];
	    }
	    return out;
	}
	
	function deckCodeToBits(code) {
	    let bits = "";
	    for (const ch of code) {
	        const idx = DECKCODE_ALPHABET.indexOf(ch);
	        if (idx === -1) throw new Error("Invalid character in deck code: " + ch);
	        bits += idx.toString(2).padStart(6, "0");
	    }
	    return bits;
	}
	
	function encodeDeckCode(masterName, cardNames, altPerkKeysSelected) {
	    const heroId = masterHeroOrder.indexOf(masterName);
	    if (heroId === -1) throw new Error("Unknown master: " + masterName);
	
	    let bits = intToBits(heroId, 6);
	
	    perkBitOrder.forEach(function (key) {
	        bits += altPerkKeysSelected.includes(key) ? "1" : "0";
	    });
	
	    for (let i = 0; i < 12; i++) {
	        const name = cardNames[i];
	        const id = (name !== undefined) ? cardIdMap[name] : undefined;
	        bits += intToBits((id !== undefined) ? id : 511, 9);
	    }
	
	    bits += "00";
	
	    return bitsToDeckCode(bits);
	}
	
	function decodeDeckCode(code) {
	    if (code.length !== 20) {
	        throw new Error("Deck code must be exactly 20 characters.");
	    }
	    const bits = deckCodeToBits(code);
	    let pos = 0;
	
	    const heroId = parseInt(bits.substr(pos, 6), 2); pos += 6;
	    const masterName = masterHeroOrder[heroId];
	    if (masterName === undefined) throw new Error("Unknown hero id: " + heroId);
	
	    const altPerkKeys = [];
	    perkBitOrder.forEach(function (key) {
	        if (bits[pos] === "1" && key !== "reserved") altPerkKeys.push(key);
	        pos += 1;
	    });
	
	    const idToName = {};
	    Object.keys(cardIdMap).forEach(function (name) {
	        idToName[cardIdMap[name]] = name;
	    });
	
	    const cardNames = [];
	    for (let i = 0; i < 12; i++) {
	        const v = parseInt(bits.substr(pos, 9), 2);
	        pos += 9;
	        if (v !== 511) {
	            cardNames.push(idToName[v] !== undefined ? idToName[v] : ("UnknownCard#" + v));
	        }
	    }
	
	    const altPerkNames = [];
	    if (masterPerks[masterName]) {
	        altPerkKeys.forEach(function (perkKey) {
	            const perkData = masterPerks[masterName][perkKey];
	            if (perkData && perkData.alt) altPerkNames.push(perkData.alt.name);
	        });
	    }
	
	    return { m: masterName, c: cardNames, p: altPerkNames };
	}

	// end of deck code format
	
	// Mapping Cards to ID for sorting
	    const cardIdMap = {
		    "Cleaver": 0,
		    "Warrior": 1,
		    "Plasma Marines": 2,
		    "Grenadier": 3,
		    "Lightning Bolt": 4,
		    "Living Statue": 5,
		    "Dragon Whelp": 6,
		    "Scrat Pack": 7,
		    "Ghost Turret": 8,
		    "Fireball": 9,
		    "Boomer": 10,
		    "Swarmers": 11,
		    "Succubus": 12,
		    "Swarmer Totem": 13,
		    "Demon Warrior": 14,
		    "Cannon Roller": 15,
		    "Ghost": 16,
		    "Last Stand": 17,
		    "Sniper Scrat": 19,
		    "Soul Stealer": 20,
		    "Bridge Shrine": 21,
		    "Assassin": 22,
		    "Blind Date": 23,
		    "Divine Warrior": 24,
		    "Scrat Horde": 25,
		    "Mana Puff": 26,
		    "Defenso Chopper": 27,
		    "Banner Man": 28,
		    "Healing Fireball": 29,
		    "Shock Rock": 30,
		    "Stun Blast": 31,
		    "Wizard Puff": 32,
		    "Priestess": 33,
		    "Re-boomer": 34,
		    "Colossus": 35,
		    "Beam of DOOM!": 36,
		    "Laser Turret": 37,
		    "Whirly Scrat": 38,
		    "Illusory Cleaver": 39,
		    "Troubadour": 40,
		    "Snake Druid": 41,
		    "Dragon Pack": 42,
		    "Scrat Launcher": 43,
		    "Drone Walker": 44,
		    "Legionnaires": 45,
		    "Harbinger": 46,
		    "Annihilator": 47,
		    "Stun Lancers": 48,
		    "Disruptor Puff": 49,
		    "Dragon Nest": 50,
		    "Crossbow Guild": 51,
		    "Future Past": 52,
		    "Call To Arms": 53,
		    "Blood Imps": 54,
		    "Crossbow Dudes": 56,
		    "Black Hole": 57,
		    "Infiltration": 60,
		    "Daggerfall": 61,
		    "Bounty Sniper": 62,
		    "Blastmancer": 63,
		    "Styxi": 64,
		    "Gax the World Bomb": 65,
		    "Rammer": 66,
		    "Zeppelin Bomber": 67,
		    "Blue Golem": 68,
		    "Rampage": 69,
		    "Heal Puff": 70,
		    "Red Golem": 71,
		    "Scrat Tank": 72,
		    "Raging Reinforcements": 73,
		    "Wall": 74,
		    "Spiritmancer": 76,
		    "Undying Skeleton": 77,
		    "Walking Blind Date": 78,
		    "Propeller Scrats": 79,
		    "Tranquil Shi-Hou": 80,
		    "Battle Shi-Hou": 81,
		    "Chain Lightning": 83,
		    "Spear Throwers": 84,
		    "Guardian": 87,
		    "Spirit Vessel": 90,
		    "Xiao Long": 91,
		    "Bazooka Scrat": 93,
		    "Hypnotize": 96,
		    "Magma Storm": 99,
		    "Spirit Infusion": 100,
		    "Fire Imp": 105,
		    "Future Present": 106,
		    "Shielded Crossbow Dudes": 108,
		    "Prowler": 111,
		    "Elite Swarmer": 112,
		    "S.T.INT": 113,
		    "Drone Buzzers": 114,
		    "\"Armored\" Scrats": 115,
		    "Commander Azali": 117,
		    "AtG Drone x8": 119,
		    "Healing Shrine": 122,
		    "Combustion": 123,
		    "Musketeer": 125,
		    "Morgrul the Swarmer King": 128,
		    "Scott The Sensitive Savage": 129,
		    "Flightless Dragons": 133,
		    "Gor'Rakk Sacrifice": 135,
		    "Bridge Buddies": 138,
		    "Cursebearer": 139,
		    "Magma Cannon": 140,
		    "Lost Legionnaires": 142,
		    "Gambler's Ball": 143,
		    "Ravenous Swarmers": 149,
		    "Screaming Scrat": 158,
		    "Gor'Rakk Brutes": 161,
		    "Netherstep": 162,
		    "Incubus": 163,
		    "Brutish Betrayer": 164,
		    "Shars'Rakk Twins": 169,
		    "Dragon Ball": 170,
		    "A.I.M Bot": 172,
		    "Sniper Squad": 173,
		    "Cheese Date": 175,
		    "Sun Burn": 178,
		    "Clear Skies": 180,
		    "Rabid Prowler": 182,
		    "Tantrum Throwers": 183,
		    "Propeller Horde": 184,
		    "Empowered Soul Stealer": 185,
		    "Crystal Archers": 186,
		    "Crystal Arcanist": 187,
		    "Arcane Bolt": 188,
		    "Crystal Sentry": 191,
		    "Armored Escort": 192,
		    "Crystal Construct": 193,
		    "Lord-Sentinel Thelec": 194,
		    "Mana Puff Madness": 195,
		    "Wheel Of Doom": 196,
		    "Nether Bats": 197,
		    "Wolf Among Sheep": 199,
		    "Once Bitten": 201,
		    "Bats Bats Bats!": 202,
		    "Grasping Thorns": 203,
		    "Lone Wolf": 204,
		    "Howling Moon": 209,
		    "Bahra the Witchwolf": 210,
		    "Shieldguard of Light": 211,
		    "Brothers of Light": 212,
		    "Squire Puff": 214,
		    "Gor'Rakk Gate": 215,
		    "Crakgul Doomcleaver": 216,
		    "Morgrul's Ragers": 218,
		    "Shadow Whelp": 219,
		    "Caeleth Dawnhammer": 220,
		    "Stormy": 221,
		    "Shen Stormstrike": 222,
		    "Poison Strike": 224,
		    "Jungle Jumble": 226,
		    "Zap Shrine": 228,
		    "Rock Rivals": 229,
		    "Skeleton Horde": 234,
		    "Jolo the Hero Scrat": 235,
		    "Nyrvir's Breath": 236,
		    "Toll of the Dead": 237,
		    "Lone Scout": 238,
		    "Border Patrol": 239,
		    "Haunting Hugger": 240,
		    "Nyrvir the Fallen": 241,
		    "Spawn of Fury": 242,
		    "Slitherbound": 249,
		    "Wreckinator 9000": 251,
		    "Caged Prowler": 252,
		    "Slithering Summons": 253,
		    "Herald Ah'Mun": 254,
		    "Sewer Scrat": 255,
		    "Scratillery": 257,
		    "Boom Buggy": 258,
		    "Ritual of Servitude": 259,
		    "Woodsman": 260,
		    "High-Mage Leiliel": 261,
		    "Leiliel's Vortex": 262,
		    "Arcane Ring": 263,
		    "Glenn's Brew": 264,
		    "Caber Tosser": 265,
		    "Frostfeathers": 266,
		    "Fergus Flagon Fighter": 267,
		    "Mountainshaper": 268,
		    "Frostfeather Flyby": 269,
		    "Mal'Shar Shadowfork": 270,
		    "Jade Flingers": 271,
		    "Ting, Teng & Tung": 272,
		    "High Inquisitor Ardera": 273,
		    "Brother of the Burning Fist": 274,
		    "Jahun, Keeper of Jadespark": 275,
		    "Jadespark Watchers": 276,
		    "Smite": 277,
		    "Ardent Aegis": 278,
		    "Windwalker Shi-Hou": 279,
		    "Shen's Shock Stick": 280,
		    "Zealots of the Burning Fist": 285,
		    "Wardancers": 286,
		    "The Veilstalker": 287,
		    "Lord Fanriel the Stormcharger": 288,
		    "Dormant Defenders": 289,
		    "Sugilite Shield": 290,
		    "Restless Dead": 291,
		    "Unholy Ground": 292,
		    "Corpse Explosion": 293,
		    "Skeleton Crew": 294,
		    "Resonating Blast Crystal": 295,
		    "Lady Infray the Spire Warden": 297,
		    "Void Altar": 298,
		    "Mar'Dred, Prince of Nightmares": 299,
		    "Illusory Dragon Whelp": 300,
		    "Pincer of Dread": 301,
		    "Brothers of the Void": 302,
		    "Groggy Woodsman": 303,
		    "Mountain Gale": 305,
		    "Shield-Captain Avea": 306,
		    "Rockin' Roller": 308,
		    "Lash of Ah'mun": 309,
		    "Shroom Puff": 310,
		    "Akinlep's Gong of Pestilence": 312,
		    "Jing Long": 314,
		    "Chain Gang": 315,
		    "Ion Grenade": 318,
		    "Scrap Yard": 319,
		    "Vulture Prime A83": 320,
		    "R4Z:0R Squadron": 321,
		    "T.A.A.S.": 322,
		    "Scrat Tunnels": 324,
		    "Coax the Diplomancer": 326,
		    "Chisma BOOMSTICK": 327,
		    "Harmful Souls": 328,
		    "Impatient Statue": 329,
		    "Wrecked Walker": 330,
		    "Bladestar": 331,
		    "Rocket Scrat": 334,
		    "Wild Stonebjorn": 335,
		    "Bounce Berry Flingers": 336,
		    "Kurrrnath Crystalback": 338,
		    "Sapphire Pebble": 339,
		    "Frostberry Bearer": 341,
		    "Urclaw, Protector of the Peaks": 342,
		    "M0nitor Gn4ts": 343,
		    "Siege Imperator Ruby": 344,
		    "A'Zog, Voidfiend of Shars'Rakk": 346,
		    "Arcane Barrage": 348,
		    "Impetus Blast": 349,
		    "Simulacrum": 350,
		    "Rimargaal, Scourge of the Summit": 352,
		    "Frostbearer": 353,
		    "Chief Ice Breaker Bolf": 354,
		    "Adventuring Party": 355,
		    "Snap Freeze": 356,
		    "Rimargaal's Breath": 357,
		    "Idol Of Sacrifice": 358,
		    "Taloc, the Vessel": 359,
		    "Rampant Growth": 360,
		    "Feng the Wanderer": 361,
		    "Zipp's Zappinator": 362,
		    "Cowardly Imps": 364,
		    "Korrrgoth, Tyrant Of Gor'Rakk": 366,
		    "Sanctum of the Cleansing Fire": 367,
		    "Magnetic Bombs": 369,
		    "City Watch": 371,
		    "S1ege Br3aker MK1": 373,
		    "Bearvalanche": 374,
		    "Mana Chaser": 375,
		    "Vuk's Clutchcooker": 376,
		    "Net Blaster": 377,
		    "Spelldancer": 378,
		    "Ghast": 380,
		    "Rendrath the Deathless": 381,
		    "Morgrul's Mark": 382,
		    "Shroomer": 383,
		    "Shroomama Shumi": 384,
		    "Jez'Ra, the Voidmother": 385,
		    "Woggosaur Pup": 388,
		    "Denver, the Last King": 389,
		    "Stormtamer": 390,
		    "Prime Sergeant Raddick": 391,
		    "Rapid Response Reserves": 393,
		    "Highland Huntress": 399,
		    "High Marshal Rystar": 400,
		    "Crossbow Club House": 401,
		    "Spire Stag": 402,
		    "Resonating Construct": 403,
		    "Nezara the Cold Countess": 404,
		    "Kamikazeppelin": 406,
		    "Wartrack Dreadnaught": 407,
		    "Protocol 45.54.55-1N": 408,
		    "Null Matrix": 409,
		    "Frostfang Familiar": 410,
		    "Karmic": 418,
		    "Spiderlings": 419,
		    "An'Kahesh, Desert's Doom": 420,
		    "Bearzerker": 421,
		    "The Revenant": 425
		};

    const deckList = [];
    let allCardsData = [];
    
    const cardTooltip = document.createElement("div");
    cardTooltip.id = "card-info-tooltip";
    document.body.appendChild(cardTooltip);
    
    

    const masterSlot = document.getElementById("master-slot");
    const masterSlotSticky = document.getElementById("master-slot-sticky");
    const masterPicker = document.getElementById("master-picker");
    
    // ---------------------------
	// Perks
	// ---------------------------
	
	let selectedPerkChoices = { perk1: "default", perk2: "default", perk3: "default" };
	
	const perkRowEl = document.getElementById("perk-row");
	
	function resetPerkChoices() {
	    selectedPerkChoices = { perk1: "default", perk2: "default", perk3: "default" };
	}
	
	function renderPerkSelector() {
	
		if (!perkRowEl) return;
		
	    perkRowEl.innerHTML = "";
	
	    if (!selectedMaster || !masterPerks[selectedMaster.name]) {
	        const empty = document.createElement("div");
	        empty.className = "perk-slot-empty";
	        empty.textContent = "Select a Master first";
	        perkRowEl.appendChild(empty);
	        return;
	    }
	
	    const perks = masterPerks[selectedMaster.name];
	
	    ["perk1", "perk2", "perk3"].forEach(function (perkKey) {
	
	        const perkData = perks[perkKey];
	        if (!perkData) return;
	
	        const hasAlt = !!perkData.alt;
	        const choice = selectedPerkChoices[perkKey];
	        const activePerk = (choice === "alt" && hasAlt) ? perkData.alt : perkData.default;
	
	        const slot = document.createElement("div");
	        slot.className = "perk-slot";
	        if (hasAlt) slot.classList.add("has-alt");
	        if (choice === "alt" && hasAlt) slot.classList.add("alt-selected");
	
	        const img = document.createElement("img");
	        img.src = mw.util.getUrl("Special:Redirect/file/" + activePerk.image);
	        img.alt = activePerk.name;
	        
	    	img.addEventListener("mouseenter", function (e) {
	            showPerkTooltip(activePerk, perkKey, e);
	        });

	        img.addEventListener("mousemove", function (e) {
	            positionCardTooltip(e);
	        });

	        img.addEventListener("mouseleave", function () {
	            hideCardTooltip();
	        });

	
	        const xpBadge = document.createElement("div");
	        xpBadge.className = "perk-xp-badge";
	        xpBadge.textContent = perkXpLabels[perkKey];
	
	        slot.appendChild(img);
	        slot.appendChild(xpBadge);
	
	        if (hasAlt) {
	            slot.addEventListener("click", function () {
	                selectedPerkChoices[perkKey] = (selectedPerkChoices[perkKey] === "alt") ? "default" : "alt";
	                renderPerkSelector();
	            });
	        }
	
	        perkRowEl.appendChild(slot);
	    });
	}
	
	renderPerkSelector();
    
    
    
    // ---------------------------
	// Wildcards
	// ---------------------------
	
	const deckWildcards = [null, null]; // each slot: a card object (duplicate) or null
	
	const wildcardRowEl = document.getElementById("wildcard-row");
	
	const wildcardPicker = document.createElement("div");
	wildcardPicker.id = "wildcard-picker";
	document.body.appendChild(wildcardPicker);
	
	function getExtraAllowed(card) {
	    const copies = Number(card.copies);
	    return Number.isFinite(copies) ? Math.max(0, copies - 1) : 0;
	}
	
	function getWildcardUsage(cardName, excludeSlotIndex) {
	    let count = 0;
	    deckWildcards.forEach(function (wc, idx) {
	        if (idx === excludeSlotIndex) return;
	        if (wc && wc.name === cardName) count++;
	    });
	    return count;
	}
	
	function renderWildcardSlots() {
		
		if (!wildcardRowEl) return;
		
	    wildcardRowEl.innerHTML = "";
	
	    for (let i = 0; i < 2; i++) {
	
	        const slot = document.createElement("div");
	        slot.className = "wildcard-slot";
	
	        const card = deckWildcards[i];
	
	        if (card) {
	
	            slot.classList.add("filled");
	
	            const img = document.createElement("img");
	            img.src = mw.util.getUrl("Special:Redirect/file/" + card.image);
	            img.alt = card.name;
	
	            img.addEventListener("mouseenter", function (e) { showCardTooltip(card, e); });
	            img.addEventListener("mousemove", function (e) { positionCardTooltip(e); });
	            img.addEventListener("mouseleave", function () { hideCardTooltip(); });
	
	            slot.appendChild(img);
	
	            slot.addEventListener("click", function () {
	                hideCardTooltip();
	                deckWildcards[i] = null;
	                renderWildcardSlots();
	                updateAvgManaCost();
	            });
	
	        } else {
	
	            slot.textContent = "Click here to select wildcard";

	            slot.addEventListener("click", function () {
	                openWildcardPicker(i, slot);
	            });
	        }
	
	        wildcardRowEl.appendChild(slot);
	    }
	}
	
	function openWildcardPicker(slotIndex, slotEl) {
	
	    const eligibleCards = deckList.filter(function (card) {
	        const extraAllowed = getExtraAllowed(card);
	        if (extraAllowed <= 0) return false;
	        return getWildcardUsage(card.name, slotIndex) < extraAllowed;
	    });
	
	    wildcardPicker.innerHTML = "";
	
	    if (eligibleCards.length === 0) {
	        const msg = document.createElement("div");
	        msg.className = "wildcard-picker-empty";
	        msg.textContent = "No eligible cards (need a card in your deck with Copies Allowed > 1, not already fully used as a wildcard).";
	        wildcardPicker.appendChild(msg);
	    } else {
	        eligibleCards.forEach(function (card) {
	            const img = document.createElement("img");
	            img.src = mw.util.getUrl("Special:Redirect/file/" + card.image);
	            img.alt = card.name;
	
	            img.addEventListener("click", function () {
	                deckWildcards[slotIndex] = card;
	                wildcardPicker.style.display = "none";
	                renderWildcardSlots();
	                updateAvgManaCost();
	            });
	
	            wildcardPicker.appendChild(img);
	        });
	    }
	
	    const rect = slotEl.getBoundingClientRect();
	    wildcardPicker.style.left = (rect.left + window.scrollX) + "px";
	    wildcardPicker.style.top = (rect.bottom + window.scrollY + 6) + "px";
	    wildcardPicker.style.display = "flex";
	}
	
	// Close the picker when clicking anywhere outside it
	$(document).on("click", function (e) {
	    if (
	        wildcardPicker.style.display !== "none" &&
	        !$(e.target).closest("#wildcard-picker").length &&
	        !$(e.target).closest(".wildcard-slot").length
	    ) {
	        wildcardPicker.style.display = "none";
	    }
	});
	
	// Drop any wildcard whose base card is no longer in the deck
	function cleanupWildcards() {
	    let changed = false;
	    deckWildcards.forEach(function (wc, idx) {
	        if (!wc) return;
	        const stillInDeck = deckList.some(function (c) { return c.name === wc.name; });
	        if (!stillInDeck) {
	            deckWildcards[idx] = null;
	            changed = true;
	        }
	    });
	    if (changed) renderWildcardSlots();
	}
	
	renderWildcardSlots();
    
    
    // ---------------------------
	// Deckbuilder Collection Filters
	// Mana Cost
	// ---------------------------
	
	let collectionManaFilters = [];
	let collectionFactionFilters = [];
	let collectionRarityFilters = [];
	let collectionTypeFilters = [];
	let collectionAttackTypeFilters = [];
	let collectionTargetsFilters = [];
	let collectionAoeFilters = [];
	let collectionWildcardsFilters = [];
	let collectionSearchQuery = "";
	let collectionCountFilters = [];
	let collectionStatField = "";
	let collectionStatOperator = ">=";
	let collectionStatValue = null;	
	
	
	function getCardStatValue($card, field) {
	    if (field === "dps") {
	        const dmg = parseFloat($card.data("damage"));
	        const atk = parseFloat($card.data("attackSpeed"));
	        return (Number.isFinite(dmg) && Number.isFinite(atk) && atk > 0) ? dmg / atk : null;
	    }
	    const v = parseFloat($card.data(field));
	    return Number.isFinite(v) ? v : null;
	}
	
	$(document).on("change input", "#stat-filter-field, #stat-filter-operator, #stat-filter-value", function () {
			    collectionStatField = $("#stat-filter-field").val();
			    collectionStatOperator = $("#stat-filter-operator").val();
			    const raw = $("#stat-filter-value").val();
			    collectionStatValue = raw === "" ? null : parseFloat(raw);
			    applyCollectionFilters();
			});
	
	// include Puffs to ground minions
	const typeGroupAliases = {
	    "Minion": ["Minion", "Puff"]
	};
	
	function applyCollectionFilters() {

	    $(collection).find('.card-wrapper').each(function () {
	
	        const $card = $(this);
	
	        const mana = String($card.data('mana')).trim();
	        const faction = String($card.data('faction')).trim();
	        const rarity = String($card.data('rarity')).trim();
	        const type = String($card.data('type')).trim();
	        const attackType = String($card.data('attacktype')).trim();
	        const attackTypeMatch =
			    collectionAttackTypeFilters.length === 0 ||
			    collectionAttackTypeFilters.includes(attackType);
			const targets = String($card.data('targets')).trim();
	        const targetsMatch =
			    collectionTargetsFilters.length === 0 ||
			    collectionTargetsFilters.includes(targets);
	
	        const manaMatch =
	            collectionManaFilters.length === 0 ||
	            collectionManaFilters.includes(mana);
	
	        const factionMatch =
	            collectionFactionFilters.length === 0 ||
	            collectionFactionFilters.includes(faction);
	
	        const rarityMatch =
	            collectionRarityFilters.length === 0 ||
	            collectionRarityFilters.includes(rarity);
	
	        const typeMatch =
			    collectionTypeFilters.length === 0 ||
			    collectionTypeFilters.some(function (filterVal) {
			        const allowedTypes = typeGroupAliases[filterVal] || [filterVal];
			        return allowedTypes.includes(type);
			    });
			    
			const statMatch = (function () {
			    if (!collectionStatField || collectionStatValue === null) return true;
			    const val = getCardStatValue($card, collectionStatField);
			    if (val === null) return false;
			    if (collectionStatOperator === ">=") return val >= collectionStatValue;
			    if (collectionStatOperator === "<=") return val <= collectionStatValue;
			    return val === collectionStatValue;
			})();
	            
	        const aoe = String($card.data('aoe')).trim();
	        const aoeMatch =
			    collectionAoeFilters.length === 0 ||
			    collectionAoeFilters.includes(aoe);
			    
			const wildcard = String($card.data('wildcards')).trim();
	        const wildcardMatch =
			    collectionWildcardsFilters.length === 0 ||
			    collectionWildcardsFilters.includes(wildcard);
			    
			const count = String($card.data('count')).trim();
	        const countMatch =
			    collectionCountFilters.length === 0 ||
			    collectionCountFilters.includes(count);
			    
			const name = String($card.data('name')).trim().toLowerCase();
	        const searchMatch =
			    collectionSearchQuery === "" ||
			    name.includes(collectionSearchQuery);
	
	        $card.toggle(
			    manaMatch &&
			    factionMatch &&
			    rarityMatch &&
			    typeMatch &&
			    attackTypeMatch &&
			    targetsMatch &&
			    aoeMatch &&
			    wildcardMatch &&
			    searchMatch &&
			    countMatch &&
			    statMatch
			);
	    });
	    updateCollectionResultCount();
	}
	// Counter for card collection
	function updateCollectionResultCount() {
	    const visibleCount = $(collection).find('.card-wrapper:visible').length;
	    $('#collection-visible-count').text(visibleCount);
	}
	
	
	// Faction
	$('#deckbuilder-faction-filter .filter-btn').on('click', function () {
	
	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();
	
	    if (value === 'all') {
	
	        // Select All, deselect everything else
	        $('#deckbuilder-faction-filter .filter-btn')
	            .removeClass('active');
	
	        $btn.addClass('active');
	
	        collectionFactionFilters = [];
	
	    } else {
	
	        // Toggle selected faction
	        $btn.toggleClass('active');
	
	        // Remove All
	        $('#deckbuilder-faction-filter .filter-btn[data-value="all"]')
	            .removeClass('active');
	
	        // Get selected factions
	        collectionFactionFilters = [];
	
	        $('#deckbuilder-faction-filter .filter-btn.active').each(function () {
	            const faction = String($(this).data('value')).trim();
	
	            if (faction !== 'all') {
	                collectionFactionFilters.push(faction);
	            }
	        });
	
	        // If nothing is selected, automatically select All
	        if (collectionFactionFilters.length === 0) {
	
	            $('#deckbuilder-faction-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	
	        }
	    }
	
	    applyCollectionFilters();
	});
	
	// Attack Type
	$('#deckbuilder-attacktype-filter .filter-btn').on('click', function () {
	
	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();
	
	    if (value === 'all') {
	
	        // Select All, deselect everything else
	        $('#deckbuilder-attacktype-filter .filter-btn')
	            .removeClass('active');
	
	        $btn.addClass('active');
	
	        collectionAttackTypeFilters = [];
	
	    } else {
	
	        // Toggle selected attack type
	        $btn.toggleClass('active');
	
	        // Remove All
	        $('#deckbuilder-attacktype-filter .filter-btn[data-value="all"]')
	            .removeClass('active');
	
	        // Get selected attack types
	        collectionAttackTypeFilters = [];
	
	        $('#deckbuilder-attacktype-filter .filter-btn.active').each(function () {
	
	            const attackType = String($(this).data('value')).trim();
	
	            if (attackType !== 'all') {
	                collectionAttackTypeFilters.push(attackType);
	            }
	        });
	
	        // Nothing selected → automatically return to All
	        if (collectionAttackTypeFilters.length === 0) {
	
	            $('#deckbuilder-attacktype-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	        }
	    }
	
	    applyCollectionFilters();
	});
	
	// Unit Count
	$('#deckbuilder-count-filter .filter-btn').on('click', function () {

	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();

	    if (value === 'all') {

	        $('#deckbuilder-count-filter .filter-btn')
	            .removeClass('active');

	        $btn.addClass('active');

	        collectionCountFilters = [];

	    } else {

	        $btn.toggleClass('active');

	        $('#deckbuilder-count-filter .filter-btn[data-value="all"]')
	            .removeClass('active');

	        collectionCountFilters = [];

	        $('#deckbuilder-count-filter .filter-btn.active').each(function () {

	            const count = String($(this).data('value')).trim();

	            if (count !== 'all') {
	                collectionCountFilters.push(count);
	            }
	        });

	        if (collectionCountFilters.length === 0) {

	            $('#deckbuilder-count-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	        }
	    }

	    applyCollectionFilters();
	});
	
	// Targets
	$('#deckbuilder-targets-filter .filter-btn').on('click', function () {

	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();

	    if (value === 'all') {

	        $('#deckbuilder-targets-filter .filter-btn')
	            .removeClass('active');

	        $btn.addClass('active');

	        collectionTargetsFilters = [];

	    } else {

	        $btn.toggleClass('active');

	        $('#deckbuilder-targets-filter .filter-btn[data-value="all"]')
	            .removeClass('active');

	        collectionTargetsFilters = [];

	        $('#deckbuilder-targets-filter .filter-btn.active').each(function () {

	            const targets = String($(this).data('value')).trim();

	            if (targets !== 'all') {
	                collectionTargetsFilters.push(targets);
	            }
	        });

	        if (collectionTargetsFilters.length === 0) {

	            $('#deckbuilder-targets-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	        }
	    }

	    applyCollectionFilters();
	});
	
	// AOE
	$('#deckbuilder-aoe-filter .filter-btn').on('click', function () {

	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();

	    if (value === 'all') {

	        $('#deckbuilder-aoe-filter .filter-btn')
	            .removeClass('active');

	        $btn.addClass('active');

	        collectionAoeFilters = [];

	    } else {

	        $btn.toggleClass('active');

	        $('#deckbuilder-aoe-filter .filter-btn[data-value="all"]')
	            .removeClass('active');

	        collectionAoeFilters = [];

	        $('#deckbuilder-aoe-filter .filter-btn.active').each(function () {

	            const aoe = String($(this).data('value')).trim();

	            if (aoe !== 'all') {
	                collectionAoeFilters.push(aoe);
	            }
	        });

	        if (collectionAoeFilters.length === 0) {

	            $('#deckbuilder-aoe-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	        }
	    }

	    applyCollectionFilters();
	});
	
	// Copies Allowed (Wildcards)
	$('#deckbuilder-wildcards-filter .filter-btn').on('click', function () {

	    $(this).toggleClass('active');

	    collectionWildcardsFilters = [];

	    $('#deckbuilder-wildcards-filter .filter-btn.active').each(function () {
	        collectionWildcardsFilters.push(String($(this).data('value')));
	    });

	    applyCollectionFilters();
	});
	
	// Type
	$('#deckbuilder-type-filter .filter-btn').on('click', function () {
	
	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();
	
	    if (value === 'all') {
	
	        // Select All, deselect everything else
	        $('#deckbuilder-type-filter .filter-btn')
	            .removeClass('active');
	
	        $btn.addClass('active');
	
	        collectionTypeFilters = [];
	
	    } else {
	
	        // Toggle selected type
	        $btn.toggleClass('active');
	
	        // Remove All
	        $('#deckbuilder-type-filter .filter-btn[data-value="all"]')
	            .removeClass('active');
	
	        // Get selected types
	        collectionTypeFilters = [];
	
	        $('#deckbuilder-type-filter .filter-btn.active').each(function () {
	
	            const type = String($(this).data('value')).trim();
	
	            if (type !== 'all') {
	                collectionTypeFilters.push(type);
	            }
	        });
	
	        // Nothing selected → return to All
	        if (collectionTypeFilters.length === 0) {
	
	            $('#deckbuilder-type-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	        }
	    }
	
	    applyCollectionFilters();
	});
	
	// Rarity
	$('#deckbuilder-rarity-filter .filter-btn').on('click', function () {
	
	    const $btn = $(this);
	    const value = String($btn.data('value')).trim();
	
	    if (value === 'all') {
	
	        // Select All, deselect everything else
	        $('#deckbuilder-rarity-filter .filter-btn')
	            .removeClass('active');
	
	        $btn.addClass('active');
	
	        collectionRarityFilters = [];
	
	    } else {
	
	        // Toggle selected rarity
	        $btn.toggleClass('active');
	
	        // Remove All
	        $('#deckbuilder-rarity-filter .filter-btn[data-value="all"]')
	            .removeClass('active');
	
	        // Get selected rarities
	        collectionRarityFilters = [];
	
	        $('#deckbuilder-rarity-filter .filter-btn.active').each(function () {
	
	            const rarity = String($(this).data('value')).trim();
	
	            if (rarity !== 'all') {
	                collectionRarityFilters.push(rarity);
	            }
	        });
	
	        // Nothing selected → automatically return to All
	        if (collectionRarityFilters.length === 0) {
	
	            $('#deckbuilder-rarity-filter .filter-btn[data-value="all"]')
	                .addClass('active');
	        }
	    }
	
	    applyCollectionFilters();
	});
	
	
	// Mana
	$('#deckbuilder-mana-filter .filter-btn').on('click', function () {
	
	    $(this).toggleClass('active');
	
	    collectionManaFilters = [];
	
	    $('#deckbuilder-mana-filter .filter-btn.active').each(function () {
	        collectionManaFilters.push(String($(this).data('value')));
	    });
	
	    applyCollectionFilters();
	});
	
	// Search
	$("#collection-search-container").html(
	    '<input type="text" id="collection-search" placeholder="Search cards..." />'
	);
	
	$("#stat-filter-container").html(
	    '<select id="stat-filter-field">' +
	        '<option value="">Any stat</option>' +
	        '<option value="health">Health</option>' +
	        '<option value="damage">Damage</option>' +
	        '<option value="dps">DPS</option>' +
	        '<option value="attackSpeed">Attack Speed</option>' +
	    '</select>' +
	    '<select id="stat-filter-operator">' +
	        '<option value=">=">&ge;</option>' +
	        '<option value="<=">&le;</option>' +
	        '<option value="=">=</option>' +
	    '</select>' +
	    '<input type="number" id="stat-filter-value" placeholder="Value" />'
	);

	$(document).on("input", "#collection-search", function () {
	    collectionSearchQuery = $(this).val().toLowerCase().trim();
	    applyCollectionFilters();
	});
	
	//helper function for attack type
    function isRangedTrue(val) {
        const v = String(val).trim().toLowerCase();
        return v === "1" || v === "yes" || v === "true";
    }
    // helper function for hovering over perk tooltip
        function showPerkTooltip(perkData, perkKey, e) {

	        cardTooltip.innerHTML =
	            "<strong>" + perkData.name + "</strong><br>" +
	            perkXpLabels[perkKey];
	
	        cardTooltip.style.display = "block";
	        positionCardTooltip(e);
	    }
    // helper function for hovering over tooltip
	function showCardTooltip(card, e) {

    const hp = parseFloat(card.health);
    const dmg = parseFloat(card.damage);
    const atk = parseFloat(card.attackSpeed);

    const dps = (Number.isFinite(dmg) && Number.isFinite(atk) && atk > 0)
        ? (dmg / atk).toFixed(2)
        : "-";

    const holdNote = "<span style='opacity:0.7;font-size:11px;'>Hold click to open detailed card info in a new tab</span>";

    if (card.type === "Building") {

        cardTooltip.innerHTML =
            "<strong>" + card.name + "</strong><br>" +
            "Type: " + card.type + "<br>" +
            "Damage: " + (Number.isFinite(dmg) ? dmg : "-") + "<br>" +
            "Attack Speed: " + (Number.isFinite(atk) ? atk.toFixed(2) : "-") + "<br>" +
            "DPS: " + dps + "<br>" +
            "Duration: " + (card.duration !== undefined && card.duration !== "" ? card.duration : "-") + "<br>" +
            "Production Speed: " + (card.productionspeed !== undefined && card.productionspeed !== "" ? card.productionspeed : "-") + "<br>" +
            holdNote;

    } else if (card.type === "Spell") {

        cardTooltip.innerHTML =
            "<strong>" + card.name + "</strong><br>" +
            "Type: " + card.type + "<br>" +
            "Damage: " + (Number.isFinite(dmg) ? dmg : "-") + "<br>" +
            "Master Damage: " + (card.masterdamage !== undefined && card.masterdamage !== "" ? card.masterdamage : "-") + "<br>" +
            "Radius: " + (card.radius !== undefined && card.radius !== "" ? card.radius : "-") + "<br>" +
            "Duration: " + (card.duration !== undefined && card.duration !== "" ? card.duration : "-") + "<br>" +
            holdNote;

    } else {

        // Minion, Flying Minion, and everything else — unchanged
        cardTooltip.innerHTML =
            "<strong>" + card.name + "</strong><br>" +
            "Type: " + card.type + "<br>" +
            "HP: " + (Number.isFinite(hp) ? hp : "-") + "<br>" +
            "Damage: " + (Number.isFinite(dmg) ? dmg : "-") + "<br>" +
            "Attack Speed: " + (Number.isFinite(atk) ? atk.toFixed(2) : "-") + "<br>" +
            "DPS: " + dps + "<br>" +
            "Unit Count: " + card.count + "<br>" +
            holdNote;
    }

    cardTooltip.style.display = "block";
    positionCardTooltip(e);
}

    function positionCardTooltip(e) {
        cardTooltip.style.left = (e.pageX + 15) + "px";
        cardTooltip.style.top = (e.pageY + 15) + "px";
    }

    function hideCardTooltip() {
        cardTooltip.style.display = "none";
    }
    
    //helper function for unit count buckets
    function getCountBucket(val) {
        const num = Number(val);
        if (!Number.isFinite(num)) return '';
        if (num >= 5) return '4+';
        return String(num);
    }
    
    // Query Cargo
    new mw.Api().get({
	    action: "cargoquery",
	    tables: "Cards2",
		fields: "name,image,faction,type,rarity,manaCost,isRanged,targets,radius,copies,count,health,damage,attackSpeed,duration,productionspeed,masterdamage",
	    where: 'rarity="Common" OR rarity="Rare" OR rarity="Supreme" OR rarity="Legendary"',
	    limit: 999,
	    format: "json"
	}).done(function (data) {
	
	    const cards = data.cargoquery.map(function (entry) {
	        return entry.title;
	    });
	
	    // Sort by mana cost
	    cards.sort(function (a, b) {
	        return Number(a.manaCost) - Number(b.manaCost);
	    });
	    
		allCardsData = cards;
	
	    // Render collection
	    let lastManaCost = null;

		cards.forEach(function (card) {
		
		    const currentManaCost = Number(card.manaCost);
		
		    if (lastManaCost !== null && currentManaCost !== lastManaCost) {
		        const breakEl = document.createElement("div");
		        breakEl.className = "mana-row-break";
		        collection.appendChild(breakEl);
		    }
		
		    lastManaCost = currentManaCost;
		
		    const wrapper = document.createElement("div");
		    wrapper.className = "card-wrapper";
		
		    // Store mana cost on the wrapper
		    wrapper.dataset.mana = card.manaCost;
		    wrapper.dataset.faction = card.faction;
		    wrapper.dataset.rarity = card.rarity;
		    wrapper.dataset.type = card.type;
		    wrapper.dataset.targets = card.targets;
		    wrapper.dataset.wildcards = card.copies;
		    wrapper.dataset.count = getCountBucket(card.count);
		    wrapper.dataset.name = card.name;
		    const radiusVal = String(card.radius).trim();
		    wrapper.dataset.aoe =
			    (radiusVal !== '' && radiusVal !== '0' && radiusVal !== 'undefined' && radiusVal !== 'null')
			        ? 'Yes' : 'No';
		    wrapper.dataset.attacktype =
			    isRangedTrue(card.isRanged) ? "Yes" : "No";
			//for dynamic filter
			wrapper.dataset.health = card.health;
			wrapper.dataset.damage = card.damage;
			wrapper.dataset.attackSpeed = card.attackSpeed;



		
		    const img = document.createElement("img");
		
		    img.alt = card.name;
		    img.className = "card-img";
		
		    img.src = mw.util.getUrl(
		        "Special:Redirect/file/" + card.image
		    );
		
		    let holdTimer = null;
			let holdTriggered = false;
			
			img.addEventListener("mousedown", function (e) {
			    if (e.button !== 0) return; // Left mouse button only
			
			    holdTriggered = false;
			
			    holdTimer = setTimeout(function () {
			        holdTriggered = true;
			
			        const pageName = card.name.trim().replace(/ /g, "_");
			        const url = "https://minionmasters.fandom.com/wiki/" +
			            encodeURIComponent(pageName).replace(/%2F/g, "/");
			
			        window.open(url, "_blank");
			    }, 700); // 700ms hold
			});
			
			img.addEventListener("mouseup", function (e) {
			    if (e.button !== 0) return;
			
			    clearTimeout(holdTimer);
			});
			
			img.addEventListener("mouseleave", function () {
			    clearTimeout(holdTimer);
			});
			
			img.addEventListener("click", function (e) {
			    // Don't add the card if this click came from a hold
			    if (holdTriggered) {
			        holdTriggered = false;
			        return;
			    }
			
			    addToDeck(card);
			});
		    
		    img.addEventListener("mouseenter", function (e) {
		        showCardTooltip(card, e);
		    });

		    img.addEventListener("mousemove", function (e) {
		        positionCardTooltip(e);
		    });

		    img.addEventListener("mouseleave", function () {
		        hideCardTooltip();
		    });
		
		    const manaBadge = document.createElement("span");
		    manaBadge.className = "card-mana-badge";
		    manaBadge.textContent = card.manaCost;
		
		    wrapper.appendChild(img);
		    wrapper.appendChild(manaBadge);
		    collection.appendChild(wrapper);
		});
	
	    updateCollectionResultCount();
	
	}).fail(function (error) {
	    console.error("Cargo query failed:", error);
	});


    function addToDeck(card) {

        const existingIndex = deckList.findIndex(function (deckCard) {
            return deckCard.name === card.name;
        });

        if (existingIndex !== -1) {
            deckList.splice(existingIndex, 1);
            renderDeck();
            return;
        }

        if (deckList.length >= 10) {
            return;
        }

        deckList.push(card);

        deckList.sort(function (a, b) {
		    const manaDifference = Number(a.manaCost) - Number(b.manaCost);
		
		    if (manaDifference !== 0) {
		        return manaDifference;
		    }
		
		    const idA = cardIdMap[a.name];
		    const idB = cardIdMap[b.name];
		
		    return idA - idB;
		});

        renderDeck();
    }


        function buildDeckSlot(i) {

		    const wrapper = document.createElement("div");
		    wrapper.className = "deck-card";
		
		    const card = deckList[i];
		
		    if (card) {
		
		        const img = document.createElement("img");
		
		        img.src = mw.util.getUrl("Special:Redirect/file/" + card.image);
		        img.alt = card.name;
		        img.className = "deck-img";
		
		        let deckHoldTimer = null;
		        let deckHoldTriggered = false;
		
		        img.addEventListener("mousedown", function (e) {
		            if (e.button !== 0) return;
		
		            deckHoldTriggered = false;
		
		            deckHoldTimer = setTimeout(function () {
		                deckHoldTriggered = true;
		
		                const pageName = card.name.trim().replace(/ /g, "_");
		                const url = "https://minionmasters.fandom.com/wiki/" +
		                    encodeURIComponent(pageName).replace(/%2F/g, "/");
		
		                window.open(url, "_blank");
		            }, 700);
		        });
		
		        img.addEventListener("mouseup", function (e) {
		            if (e.button !== 0) return;
		            clearTimeout(deckHoldTimer);
		        });
		
		        img.addEventListener("mouseleave", function () {
		            clearTimeout(deckHoldTimer);
		            hideCardTooltip();
		        });
		
		        img.addEventListener("click", function () {
		            if (deckHoldTriggered) {
		                deckHoldTriggered = false;
		                return;
		            }
		
		            hideCardTooltip();
		            deckList.splice(i, 1);
		            renderDeck();
		        });
		
		        img.addEventListener("mouseenter", function (e) {
		            showCardTooltip(card, e);
		        });
		
		        img.addEventListener("mousemove", function (e) {
		            positionCardTooltip(e);
		        });
		
		        const manaBadge = document.createElement("span");
		        manaBadge.className = "card-mana-badge";
		        manaBadge.textContent = card.manaCost;
		
		        wrapper.appendChild(img);
		        wrapper.appendChild(manaBadge);
		
		    } else {
		
		        wrapper.className = "deck-slot-empty";
		
		        if (i === deckList.length) {
		            wrapper.classList.add("deck-slot-next");
		            wrapper.textContent = "Select Card";
		
		            wrapper.addEventListener("click", function () {
		                collection.scrollIntoView({ behavior: "smooth", block: "start" });
		            });
		        }
		    }
		
		    return wrapper;
		}
		
		function fillDeckRow(container) {
		    container.innerHTML = "";
		    for (let i = 0; i < 10; i++) {
		        container.appendChild(buildDeckSlot(i));
		    }
		}
		
		function renderDeck() {
		
		    fillDeckRow(deck);
		    if (deckSticky) fillDeckRow(deckSticky);
		
		    updateAvgManaCost();
		    updateCollectionSelection();
		    cleanupWildcards();
		}
    
    function updateCollectionSelection() {

        const selectedNames = deckList.map(function (c) {
            return c.name;
        });

        $(collection).find('.card-wrapper').each(function () {

            const $card = $(this);
            const name = $card.data('name');

            $card.toggleClass('card-selected', selectedNames.includes(name));
        });
    }
	    
	    if (deck) {
        	renderDeck();
    	}
    	
    	function updateAvgManaCost() {

		    const wildcardCards = deckWildcards.filter(Boolean);
		    const allCards = deckList.concat(wildcardCards);
		
		    if (allCards.length === 0) {
		        $('#deck-avg-mana-value').text("0");
		        return;
		    }
		
		    const total = allCards.reduce(function (sum, card) {
		        return sum + Number(card.manaCost);
		    }, 0);
		
		    const avg = total / allCards.length;
		
		    $('#deck-avg-mana-value').text(avg.toFixed(1));
		}
    	
    
        function fillMasterSlot(container) {

		    container.innerHTML = "";
		
		    if (selectedMaster) {
		
		        container.classList.remove("master-slot-empty");
		
		        const img = document.createElement("img");
		        img.src = mw.util.getUrl("Special:Redirect/file/" + selectedMaster.image);
		        img.alt = selectedMaster.name;
		        img.className = "master-img";
		
		        container.appendChild(img);
		
		    } else {
		        container.classList.add("master-slot-empty");
		        container.textContent = "Select Master";
		    }
		}
		
		function renderMasterSlot() {
		    fillMasterSlot(masterSlot);
		    if (masterSlotSticky) fillMasterSlot(masterSlotSticky);
		}

    function renderMasterPicker() {

        masterPicker.innerHTML = "";

        mastersList.forEach(function (master) {

            const img = document.createElement("img");
            img.src = mw.util.getUrl("Special:Redirect/file/" + master.image);
            img.alt = master.name;
            img.className = "master-picker-img";

            img.addEventListener("click", function () {
                selectedMaster = master;
                renderMasterSlot();
                masterPicker.style.display = "none";
                resetPerkChoices();      
                renderPerkSelector();   
            });

            masterPicker.appendChild(img);
        });
    }


	// helper function to not unselect Masterpicker
	function toggleMasterPicker() {
	    // No master chosen yet → keep the picker open no matter how many times this is clicked.
	    // Once one is selected, allow normal open/close toggling.
	    if (!selectedMaster) {
	        masterPicker.style.display = "flex";
	        return;
	    }

    masterPicker.style.display =
        masterPicker.style.display === "none" ? "flex" : "none";
}

    if (masterSlot && masterPicker) {

	    masterSlot.addEventListener("click", function () {
	        toggleMasterPicker();
	    });
	}
	
	if (masterSlotSticky && masterPicker && deckRowEl) {
	
	    masterSlotSticky.addEventListener("click", function () {
	
	        deckRowEl.scrollIntoView({ behavior: "smooth", block: "start" });
	        toggleMasterPicker();
	    });
	}
    
    
    // Masters (hardcoded — not stored in Cargo)
    const mastersData = [
        { name: "Apep", image: "Apep Icon.png" },
        { name: "Diona", image: "Avatar Diona.jpg" },
        { name: "King Puff", image: "Puff Icon.png" },
        { name: "Milloween", image: "Milloween\u200e Icon.png" },
        { name: "Mordar", image: "Mordar Icon.png" },
        { name: "Morellia", image: "LichQueen_Portrait.jpg" },
        { name: "Ratbo", image: "Ratbo Icon.png" },
        { name: "Ravager", image: "Ravager Icon.png" },
        { name: "Settsu", image: "Settsu Icon.png" },
        { name: "Stormbringer", image: "Storm Icon.png" },
        { name: "Valorian", image: "Valorian.png" },
        { name: "Volco", image: "Volco Icon.png" },
        { name: "R3-KT", image: "R3-KT icon.png" },
        { name: "Tronveir", image: "Tronveir icon.png" }
    ];

    if (masterSlot && masterPicker) {
        mastersList = mastersData;
        renderMasterPicker();
        renderMasterSlot();
    }
    
    

    // ---------------------------
    // Deck Export
    // ---------------------------

    $("#export-deck-output-container").prepend(
	    '<textarea id="export-deck-output" placeholder="Paste a deck code here, or click Export Deck to generate one"></textarea>'
	);

    $(document).on("click", "#export-deck-btn", function () {

	    if (!selectedMaster) {
	    	showNotification("Please select a Master first.", "error");
	        return;
	    }
	
	    if (deckList.length === 0) {
	    	showNotification("Your deck is empty.", "error");
	        return;
	    }
	
	    const wildcardCards = deckWildcards.filter(Boolean);
	    const allCards = deckList.concat(wildcardCards);
	    
	    
	
	    allCards.sort(function (a, b) {
		    const manaDifference = Number(a.manaCost) - Number(b.manaCost);
		
		    if (manaDifference !== 0) {
		        return manaDifference;
		    }
		
		    return a.name.localeCompare(b.name);
		});
	
	    const cardNames = allCards.map(function (c) { return c.name; });
	    
	    // Collect only alt perk selections
	    const altPerkNames = [];
	    if (masterPerks[selectedMaster.name]) {
	        ["perk1", "perk2", "perk3"].forEach(function (perkKey) {
	            const perkData = masterPerks[selectedMaster.name][perkKey];
	            if (perkData && perkData.alt && selectedPerkChoices[perkKey] === "alt") {
	                altPerkNames.push(perkData.alt.name);
	            }
	        });
	    }
	
		const altPerkKeysSelected = [];
		if (masterPerks[selectedMaster.name]) {
		    ["perk1", "perk2", "perk3"].forEach(function (perkKey) {
		        if (selectedPerkChoices[perkKey] === "alt") altPerkKeysSelected.push(perkKey);
		    });
		}
		const code = encodeDeckCode(selectedMaster.name, cardNames, altPerkKeysSelected);
	
	    let exportString = selectedMaster.name;

	    if (altPerkNames.length > 0) {
	        exportString += " (" + altPerkNames.join(", ") + ")";
	    }

	    exportString += ": " + cardNames.join(", ");
	    exportString += " [Code:" + code + "]";
	
	    const $output = $("#export-deck-output");
	    $output.val(exportString);
	    $output[0].focus();
	    $output[0].select();
	});
	
	// import button
	
	        $(document).on("click", "#import-deck-btn", function () {

		        if (!masterSlot || !deck) return;
		
		        const raw = $("#export-deck-output").val().trim();
		        if (!raw) {
		        	showNotification("Please paste a deck code first.", "error");
		            return;
		        }
		
		        const match = raw.match(/\[Code:(.+)\]/);
		        const code = match ? match[1] : raw;
		
		        let payload;
				try {
				    payload = decodeDeckCode(code);
				} catch (e) {
				    showNotification("Invalid deck code.", "error");
				    return;
				}
		
		        const master = mastersData.find(function (m) { return m.name === payload.m; });
		        if (!master) {
		            showNotification("Unknown master: " + payload.m, "error");
		            return;
		        }
		
		        const isEmpty = !selectedMaster && deckList.length === 0;
		
		        const currentCardNames = deckList
		            .concat(deckWildcards.filter(Boolean))
		            .map(function (c) { return c.name; })
		            .sort();
		
		        const importCardNames = (payload.c || []).slice().sort();
		
		        const isSameMaster = selectedMaster && selectedMaster.name === payload.m;
		
		        const isSameCards =
		            currentCardNames.length === importCardNames.length &&
		            currentCardNames.every(function (name, i) { return name === importCardNames[i]; });
		
		        const isSameDeck = isSameMaster && isSameCards;
		
		        function performImport() {
				    selectedMaster = master;
				    resetPerkChoices();
		
		        if (masterPerks[master.name] && Array.isArray(payload.p)) {
		            ["perk1", "perk2", "perk3"].forEach(function (perkKey) {
		                const perkData = masterPerks[master.name][perkKey];
		                if (perkData && perkData.alt && payload.p.includes(perkData.alt.name)) {
		                    selectedPerkChoices[perkKey] = "alt";
		                }
		            });
		        }
		
		        deckList.length = 0;
		        deckWildcards[0] = null;
		        deckWildcards[1] = null;
		
		        const seenCounts = {};
		        let wildcardSlotIndex = 0;
		
		        (payload.c || []).forEach(function (name) {
		
		            const cardData = allCardsData.find(function (c) { return c.name === name; });
		            if (!cardData) return;
		
		            seenCounts[name] = (seenCounts[name] || 0) + 1;
		
		            if (seenCounts[name] === 1) {
		                if (deckList.length < 10) deckList.push(cardData);
		            } else if (wildcardSlotIndex < 2) {
		                deckWildcards[wildcardSlotIndex] = cardData;
		                wildcardSlotIndex++;
		            }
		        });
		
		        deckList.sort(function (a, b) {
		            const manaDifference = Number(a.manaCost) - Number(b.manaCost);
		            if (manaDifference !== 0) return manaDifference;
		                const idA = cardIdMap[a.name];
					    const idB = cardIdMap[b.name];
					
					    return idA - idB;
		        });
		
		        renderMasterSlot();
			    renderPerkSelector();
			    renderDeck();
			    renderWildcardSlots();
			}
			
			if (!isEmpty && !isSameDeck) {
			    showConfirm(
			        "This will overwrite your current deck. Continue?",
			        function () {
			            performImport();
			        }
			    );
			} else {
			    performImport();
			}
			
			});

}); 



// copy clipboard button
$(document).on("click", "#copy-deck-btn", function () {

    const $btn = $(this);
    const $output = $("#export-deck-output");
    const text = $output.val();

    if (!text) {
    	showNotification("Nothing to copy yet — export a deck first.", "error");
        return;
    }

    function showCopiedFeedback() {
        $btn.addClass("copied").text("Copied!");
        setTimeout(function () {
            $btn.removeClass("copied").text("Copy to clipboard");
        }, 1500);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {

        navigator.clipboard.writeText(text).then(function () {
            showCopiedFeedback();
        }).catch(function () {
            fallbackCopy();
        });

    } else {
        fallbackCopy();
    }

    function fallbackCopy() {
        $output[0].focus();
        $output[0].select();

        try {
            const successful = document.execCommand("copy");
            if (successful) {
                showCopiedFeedback();
            } else {
            	showNotification("Couldn't copy automatically — the text is selected, press Ctrl+C (or Cmd+C) to copy manually.", "error");
            }
        } catch (e) {
        	showNotification("Couldn't copy automatically — the text is selected, press Ctrl+C (or Cmd+C) to copy manually.", "error");
        }
    }
});

// Master perks: perk1 (20 XP), perk2 (60 XP), perk3 (120 XP)
// "alt" is null when a perk has no alternate
const masterPerks = {
    "Apep": {
        perk1: { default: { name: "Gift of the Serpent God", image: "Apep Gift.jpg" }, alt: { name: "Slave Driver", image: "Slitherbound.jpg" } },
        perk2: { default: { name: "Shield Totem", image: "Apep ShieldTotem.jpg" }, alt: { name: "Papyrus of the Black Obelisk", image: "Apep AltPerk2.jpg" } },
        perk3: { default: { name: "Greater Gift of the Serpent God", image: "Apep GreaterGift.jpg" }, alt: null }
    },
    "Diona": {
        perk1: { default: { name: "Art of the Hunt", image: "Diona Perk1.jpg" }, alt: null },
        perk2: { default: { name: "Fetch!", image: "Diona Perk2.jpg" }, alt: { name: "The Black Potion", image: "Diona Alt Perk2.jpg" } },
        perk3: { default: { name: "Thrill of the Hunt", image: "Diona Perk3.jpg" }, alt: null }
    },
    "King Puff": {
        perk1: { default: { name: "Trick Swap", image: "KingPuff TrickSwap.png" }, alt: null },
        perk2: { default: { name: "Royal Gifts", image: "KingPuff RoyalGifts.png" }, alt: { name: "Mimic Magic", image: "Squirepuff.jpg" } },
        perk3: { default: { name: "Send Forth The Horde!", image: "Kingpuff SendForthTheHorde.png" }, alt: null }
    },
    "Milloween": {
        perk1: { default: { name: "Arcane Golem", image: "Arcane Golem.jpg" }, alt: null },
        perk2: { default: { name: "Arcane Missiles", image: "Arcane Missiles.jpg" }, alt: { name: "Xanian Spellbook", image: "Milloween Alt perk2.jpg" } },
        perk3: { default: { name: "Xanian Construct", image: "Tome of Lore.jpg" }, alt: null }
    },
    "Mordar": {
        perk1: { default: { name: "Tombstone", image: "Mordar Tombstone.png" }, alt: { name: "Tomb of the Deathless", image: "Mordar alt perk1.png" } },
        perk2: { default: { name: "Vengeful Dead", image: "tombstonemaster.jpg" }, alt: null },
        perk3: { default: { name: "Sepulchre", image: "Mordar Tombstone02.png" }, alt: null }
    },
    "Morellia": {
        perk1: { default: { name: "Book of the Dead", image: "LichQueen Perk1.jpg" }, alt: { name: "Rites of the Dead", image: "Morellia Alt Perk1.jpg" } },
        perk2: { default: { name: "Unholy Bargain", image: "LichQueen Perk2.jpg" }, alt: null },
        perk3: { default: { name: "Queen's Dragon", image: "LichQueen Perk3.jpg" }, alt: null }
    },
    "R3-KT": {
        perk1: { default: { name: "Shadow Dance", image: "Rekt Perk1.png" }, alt: { name: "Gun-Kata", image: "Rekt alternate Perk1.png" } },
        perk2: { default: { name: "Shadow Dance", image: "Rekt Perk2.png" }, alt: null },
        perk3: { default: { name: "One Punch Blast", image: "Rekt Perk3.png" }, alt: { name: "Mass Illusion", image: "Rekt alternate Perk3.png" } }
    },
    "Ratbo": {
        perk1: { default: { name: "Scrats!", image: "Ratbo Rats.png" }, alt: null },
        perk2: { default: { name: "More Dakka!", image: "Ratbo_moreDakka.png" }, alt: { name: "Squeak Attack", image: "Ratbo alt perk2.png" } },
        perk3: { default: { name: "Scrats! Scrats!", image: "Ratbo RatsRats.png" }, alt: null }
    },
    "Ravager": {
        perk1: { default: { name: "Best Buds", image: "Ravager BestBuds.png" }, alt: { name: "Overpower", image: "Ravager alternate Perk1.png" } },
        perk2: { default: { name: "Feeding Frenzy", image: "Ravager Enrage.png" }, alt: null },
        perk3: { default: { name: "TERROR BRUTUS", image: "Ravager TerrorBrutus.png" }, alt: { name: "Onslaught Codex", image: "Ravager alternate Perk3.png" } }
    },
    "Settsu": {
        perk1: { default: { name: "Blast Entry", image: "Settsu BlastEntry.jpg" }, alt: null },
        perk2: { default: { name: "Combat Reload", image: "Settsu CombatReload.jpg" }, alt: null },
        perk3: { default: { name: "High Powered Laser", image: "Settsu HighPoweredLaser.jpg" }, alt: { name: "Air Support", image: "H3LLF1R3.jpg" } }
    },
    "Stormbringer": {
        perk1: { default: { name: "Long Shot", image: "Stormbringer Sniper.png" }, alt: null },
        perk2: { default: { name: "Aerodynamics", image: "Stormbringer Aerodynamics.png" }, alt: { name: "Cloud Cover", image: "Stormbringer alternate Perk2.png" } },
        perk3: { default: { name: "Lightning Reflexes", image: "Stormbringer LightningReflexes.png" }, alt: null }
    },
    "Tronveir": {
        perk1: { default: { name: "Runecarving", image: "Tronveir Perk 1.jpg" }, alt: { name: "Runic Attunement", image: "Tronveir Alt Perk 1.png" } },
        perk2: { default: { name: "Runic Empowerment", image: "Tronveir Perk 2.jpg" }, alt: null },
        perk3: { default: { name: "Runic Mastery", image: "Tronveir Perk 3.jpg" }, alt: null }
    },
    "Valorian": {
        perk1: { default: { name: "Searing Light", image: "ValorianPersk2_small.jpg" }, alt: { name: "Holy Fire", image: "Valorian alt perk1.jpg" } },
        perk2: { default: { name: "Holy Light", image: "ValorianPersk1_small.jpg" }, alt: { name: "Fervor", image: "Valorian alt perk2.jpg" } },
        perk3: { default: { name: "Divine Light", image: "ValorianPersk3_small.jpg" }, alt: null }
    },
    "Volco": {
        perk1: { default: { name: "Tempers Flaring", image: "Volco TempersFlaring2.png" }, alt: null },
        perk2: { default: { name: "Burn The Bridge", image: "Volco BurntheBridges.png" }, alt: null },
        perk3: { default: { name: "Tempers Burning", image: "Volco_TempersBurning.jpg" }, alt: { name: "Endless Rage", image: "Volco alt perk3.png" } }
    }
};

const perkXpLabels = { perk1: "Perk 1", perk2: "Perk 2", perk3: "Perk 3" };