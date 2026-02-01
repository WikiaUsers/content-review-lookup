const Buffs = {
    Rage: {
        damageMultiplier: 1.5
    },
    
    BerserkerRage: {
        damageMultiplier: 2
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
    },
    
    Marked: {
        damageMultiplier: 1.35
    },
    
    Slow: {
    	attackSpeedMultiplier: 1.2,
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
    "High-Mage Leiliel": [ Buffs.Marksmanship, { flatManaBonus: 2 }],
    "Resonating Construct": { flatManaBonus: 2 },
    "Crystal Construct": Buffs.Haste,
    "Leiliel's Vortex": { flatManaBonus: 1 },
    "Arcane Barrage": [{ flatManaBonus: 1 }, { damageMultiplier: 3 }],
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
	"Lone Scout": { flatManaBonus: -1 },
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
	"Arcane Barrage": { damageMultiplier: 3.33 },
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
	"Soul Stealer": {attackSpeedMultiplier: 0.197},
	"Rabid Prowler": Buffs.Haste,
	"Impatient Statue": Buffs.Haste,
	"Empowered Soul Stealer": {attackSpeedMultiplier: 0.197},
	"Poison Strike": { poisonDuration: 8, poisonTickDamage: 10 },
	//Stoutheart
	"Woodsman": Buffs.Haste,
	"Groggy Woodsman": [Buffs.Haste, {attackSpeedMultiplier: 0.833}, {movementSpeedMultiplier: 1.2}],
	"Adventuring Party": [Buffs.Haste, {attackSpeedMultiplier: 0.833}, {movementSpeedMultiplier: 1.2}, { flatManaBonus: 2 }],
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
	"Battle Shi-Hou": {attackSpeedMultiplier: 0.222},
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

    
};

const activatedMultiUnits = {
    "Lord-Sentinel Thelec": [
        { unit: "Crystal Archers", count: 6 }
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
		if (Number.isFinite(mana)) mana = Math.max(1, Math.round(mana));
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
	    $(".cargoTable tbody tr").each(function () {
	        $("#btn-base-stats").addClass("active");
	        $("#btn-activated-stats").removeClass("active");
	        recalcRow($(this), false);
	    });
	
	    resortCargoTable();
	});
	
	$("#btn-activated-stats").on("click", function () {
	    $(".cargoTable tbody tr").each(function () {
	        $("#btn-activated-stats").addClass("active");
	        $("#btn-base-stats").removeClass("active");
	        recalcRow($(this), true);
	    });
	
	    resortCargoTable();
	});


    // ---- Initial load: show base stats WITH innate b
	 $(".cargoTable tbody tr").each(function () {
	        recalcRow($(this), false);
	    });
	 //2nd recalc so cards that rely on other card's stats can use them 
	 $(".cargoTable tbody tr").each(function () {
	        recalcRow($(this), false);
	    });
	
	});