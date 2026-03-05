/**
 * Heroes & Dragons - Damage Calculator: UI Module
 * Part 3 of 3 - Load order: calculationEngine.js → DamageCalculator_Core.js → DamageCalculator_UI.js
 *
 * Calculation execution, results display, formula breakdown, and initialization.
 * Exports: window.damageCalcCalculate (callback for triggering calculations)
 */
(function() {
    'use strict';

    // Import from calculationEngine.js
    var getClassAdvantage = window.CalcEngine.getClassAdvantage;
    var calculateDamage = window.CalcEngine.calculateDamage;
    var formatNumber = window.CalcEngine.formatNumber;

    // Import from DamageCalculator_Core.js
    var DC = window.DamageCalcCore;
    var EQUIPMENT_SETS = DC.EQUIPMENT_SETS;
    var OFFENSIVE_TALENTS = DC.OFFENSIVE_TALENTS;
    var DEFENSIVE_TALENTS = DC.DEFENSIVE_TALENTS;
    var calculateSetBonuses = DC.calculateSetBonuses;
    var isBuffActive = DC.isBuffActive;
    var isTalentActive = DC.isTalentActive;
    var buildCalculatorUI = DC.buildCalculatorUI;

    // ============================================
    // CALCULATE AND DISPLAY RESULTS
    // ============================================

    /**
     * Get base stat value (reads from input if in custom mode, otherwise from stored value)
     */
    function getBaseStat(side, stat) {
        var el = document.getElementById(side + '-' + stat + '-base');
        if (el && el.tagName === 'INPUT') {
            // Custom mode - read from input
            return parseFloat(el.value) || 0;
        } else {
            // Normal mode - read from stored baseStats
            var baseStats = side === 'attacker' ? window.attackerBaseStats : window.defenderBaseStats;
            return baseStats ? (baseStats[stat] || 0) : 0;
        }
    }

    function calculate() {
        // Get base stats (from inputs if custom mode, otherwise from stored values)
        var baseStats = {
            hp: getBaseStat('attacker', 'hp'),
            atk: getBaseStat('attacker', 'atk'),
            def: getBaseStat('attacker', 'def'),
            pierce: getBaseStat('attacker', 'pierce'),
            cDmg: getBaseStat('attacker', 'cDmg'),
            cRate: getBaseStat('attacker', 'cRate'),
            bDmg: getBaseStat('attacker', 'bDmg'),
            bRate: getBaseStat('attacker', 'bRate'),
            shield: getBaseStat('attacker', 'shield'),
            walkRange: getBaseStat('attacker', 'walkRange'),
            skillRange: getBaseStat('attacker', 'skillRange')
        };

        // Get equipment set modifiers for attacker
        var attackerSetModifiers = calculateSetBonuses('attacker');

        // Get equipment set modifiers for defender
        var defenderSetModifiers = calculateSetBonuses('defender');

        // Helper to read bonus value from input
        var getBonusValue = function(statId) {
            var el = document.getElementById('attacker-' + statId + '-bonus');
            return el ? (parseFloat(el.value) || 0) : 0;
        };

        // Read all editable bonus values (green inputs)
        var bonusValues = {
            hp: getBonusValue('hp'),
            atk: getBonusValue('atk'),
            def: getBonusValue('def'),
            pierce: getBonusValue('pierce'),
            cDmg: getBonusValue('cDmg'),
            cRate: getBonusValue('cRate'),
            bDmg: getBonusValue('bDmg'),
            bRate: getBonusValue('bRate'),
            shield: getBonusValue('shield')
        };

        // Calculate totals (base + bonus)
        var totalStats = {
            hp: baseStats.hp + bonusValues.hp,
            atk: baseStats.atk + bonusValues.atk,
            def: baseStats.def + bonusValues.def,
            pierce: baseStats.pierce + bonusValues.pierce,
            cDmg: baseStats.cDmg + bonusValues.cDmg,
            cRate: baseStats.cRate + bonusValues.cRate,
            bDmg: baseStats.bDmg + bonusValues.bDmg,
            bRate: baseStats.bRate + bonusValues.bRate,
            shield: baseStats.shield + bonusValues.shield,
            walkRange: baseStats.walkRange,
            skillRange: baseStats.skillRange
        };

        // Update total displays (yellow column)
        var updateTotal = function(statId, value, isPercent) {
            var el = document.getElementById('attacker-' + statId + '-total');
            if (el) el.textContent = isPercent ? value + '%' : formatNumber(value);
        };

        // Update attacker total displays (base + bonus, NO buffs)
        updateTotal('hp', totalStats.hp, false);
        updateTotal('atk', totalStats.atk, false);
        updateTotal('def', totalStats.def, false);
        updateTotal('pierce', totalStats.pierce, true);
        updateTotal('walkRange', totalStats.walkRange, false);
        updateTotal('skillRange', totalStats.skillRange, false);
        updateTotal('cDmg', totalStats.cDmg, false);
        updateTotal('cRate', totalStats.cRate, true);
        updateTotal('bDmg', totalStats.bDmg, false);
        updateTotal('bRate', totalStats.bRate, true);
        updateTotal('shield', totalStats.shield, true);

        // Auto-calculate class advantage
        var attackerClass = document.getElementById('attacker-class').value;
        var defenderClass = document.getElementById('defender-class').value;
        var classAdv = getClassAdvantage(attackerClass, defenderClass);

        // ========================================
        // APPLY ATTACKER BUFFS/DEBUFFS TO STATS (for calculation only, not display)
        // ========================================

        // Create buffed copies for calculation
        var buffedAtk = totalStats.atk;
        var buffedCDmg = totalStats.cDmg;
        var buffedCRate = totalStats.cRate;

        // ATK: highest buff stacks with worst debuff (they sum together)
        // e.g., Increase ATK (+20%) + Shattered ATK (-60%) = -40% total
        var atkBuffBonus = 0; // from buffs (only highest applies)
        var atkDebuffPenalty = 0; // from debuffs (only worst applies)

        if (isBuffActive('buff-ultraATK')) {
            atkBuffBonus = Math.max(atkBuffBonus, 60); // Ultra ATK +60%
        }
        if (isBuffActive('buff-increaseATK')) {
            atkBuffBonus = Math.max(atkBuffBonus, 20); // Increase ATK +20%
        }
        if (isBuffActive('debuff-decreaseATK')) {
            atkDebuffPenalty = Math.max(atkDebuffPenalty, 20); // Decrease ATK -20%
        }
        if (isBuffActive('debuff-shatteredATK')) {
            atkDebuffPenalty = Math.max(atkDebuffPenalty, 60); // Shattered ATK -60%
        }

        var atkBuffModifier = 100 + atkBuffBonus - atkDebuffPenalty;
        buffedAtk = Math.max(1, Math.round(buffedAtk * (atkBuffModifier / 100)));

        // C.DMG: only highest buff applies
        var cDmgBuffModifier = 100;
        if (isBuffActive('buff-ultraCDMG')) {
            cDmgBuffModifier = Math.max(cDmgBuffModifier, 200); // Ultra C.DMG +100%
        }
        if (isBuffActive('buff-increaseCDMG')) {
            cDmgBuffModifier = Math.max(cDmgBuffModifier, 140); // Increase C.DMG +40%
        }
        buffedCDmg = Math.round(buffedCDmg * (cDmgBuffModifier / 100));

        // C.RATE: only highest buff applies
        var cRateBuffModifier = 100;
        var maxCRate = isBuffActive('buff-maxCRATE');
        if (maxCRate) {
            buffedCRate = 100; // Max C.RATE sets to 100%
        } else {
            if (isBuffActive('buff-ultraCRATE')) {
                cRateBuffModifier = Math.max(cRateBuffModifier, 185); // Ultra C.RATE +85%
            }
            if (isBuffActive('buff-increaseCRATE')) {
                cRateBuffModifier = Math.max(cRateBuffModifier, 130); // Increase C.RATE +30%
            }
            buffedCRate = Math.min(100, buffedCRate * (cRateBuffModifier / 100)); // Cap at 100%
        }

        // Build attacker stats (use BUFFED stats for calculation)
        var skillMultPercent = parseFloat(document.getElementById('attacker-skillMult').value) || 0;
        var atkDmgRatioPercent = parseFloat(document.getElementById('attacker-atkDmgRatio').value) || 100;

        var attacker = {
            atk: buffedAtk,  // Use buffed value for calculation
            baseAtk: totalStats.atk,  // Pre-buff value for formula display
            atkBuffBonus: atkBuffBonus,
            atkDebuffPenalty: atkDebuffPenalty,
            atkBuffModifier: atkBuffModifier,
            skillMult: 1 + (skillMultPercent / 100),  // Convert % to multiplier (0% = 1.0, 25% = 1.25)
            atkDmgRatio: atkDmgRatioPercent / 100,    // Convert % to decimal (100% = 1.0, 70% = 0.70)
            cDmg: buffedCDmg,  // Use buffed value for calculation
            baseCDmg: totalStats.cDmg,  // Pre-buff value for formula display
            cDmgBuffModifier: cDmgBuffModifier,
            cRate: buffedCRate,  // Use buffed value for calculation
            baseCRate: totalStats.cRate,  // Pre-buff value for formula display
            cRateBuffModifier: cRateBuffModifier,
            maxCRate: maxCRate,  // Boolean: Max C.RATE buff active
            pierce: totalStats.pierce,
            numHits: parseInt(document.getElementById('attacker-numHits').value) || 1,
            ignoreDef: attackerSetModifiers.ignoreDef,
            giantSlayer: attackerSetModifiers.giantSlayer,
            hasClassAdv: classAdv.attackerHasAdvantage
        };

        // Get defender base stats (from inputs if custom mode, otherwise from stored values)
        var defenderBaseStats = {
            hp: getBaseStat('defender', 'hp'),
            atk: getBaseStat('defender', 'atk'),
            def: getBaseStat('defender', 'def'),
            pierce: getBaseStat('defender', 'pierce'),
            cDmg: getBaseStat('defender', 'cDmg'),
            cRate: getBaseStat('defender', 'cRate'),
            bDmg: getBaseStat('defender', 'bDmg'),
            bRate: getBaseStat('defender', 'bRate'),
            shield: getBaseStat('defender', 'shield'),
            walkRange: getBaseStat('defender', 'walkRange'),
            skillRange: getBaseStat('defender', 'skillRange')
        };

        // Helper to read defender bonus value
        var getDefenderBonusValue = function(statId) {
            var el = document.getElementById('defender-' + statId + '-bonus');
            return el ? (parseFloat(el.value) || 0) : 0;
        };

        // Read all editable defender bonus values
        var defenderBonusValues = {
            hp: getDefenderBonusValue('hp'),
            def: getDefenderBonusValue('def'),
            bDmg: getDefenderBonusValue('bDmg'),
            bRate: getDefenderBonusValue('bRate'),
            shield: getDefenderBonusValue('shield')
        };

        // Calculate defender totals
        var defenderTotalStats = {
            hp: defenderBaseStats.hp + defenderBonusValues.hp,
            def: defenderBaseStats.def + defenderBonusValues.def,
            bDmg: defenderBaseStats.bDmg + defenderBonusValues.bDmg,
            bRate: defenderBaseStats.bRate + defenderBonusValues.bRate,
            shield: defenderBaseStats.shield + defenderBonusValues.shield
        };

        // Update defender total displays
        var updateDefenderTotal = function(statId, value, isPercent) {
            var el = document.getElementById('defender-' + statId + '-total');
            if (el) el.textContent = isPercent ? value + '%' : formatNumber(value);
        };

        // Update defender total displays (base + bonus, NO buffs)
        updateDefenderTotal('hp', defenderTotalStats.hp, false);
        updateDefenderTotal('atk', defenderBaseStats.atk, false);
        updateDefenderTotal('def', defenderTotalStats.def, false);
        updateDefenderTotal('pierce', defenderBaseStats.pierce, true);
        updateDefenderTotal('walkRange', defenderBaseStats.walkRange, false);
        updateDefenderTotal('skillRange', defenderBaseStats.skillRange, false);
        updateDefenderTotal('cDmg', defenderBaseStats.cDmg, false);
        updateDefenderTotal('cRate', defenderBaseStats.cRate, true);
        updateDefenderTotal('bDmg', defenderTotalStats.bDmg, false);
        updateDefenderTotal('bRate', defenderTotalStats.bRate, true);
        updateDefenderTotal('shield', defenderTotalStats.shield, true);

        // ========================================
        // APPLY DEFENDER BUFFS/DEBUFFS TO STATS (for calculation only, not display)
        // ========================================

        // Create buffed copies for calculation
        var buffedDef = defenderTotalStats.def;
        var buffedBDmg = defenderTotalStats.bDmg;
        var buffedBRate = defenderTotalStats.bRate;

        // DEF: highest buff stacks with worst debuff (they sum together)
        // Cold debuffs (Chilled/Frozen) also stack additively with DEF debuffs
        var defBuffBonus = 0;
        var defDebuffPenalty = 0;
        var coldDebuffPenalty = 0;

        if (isBuffActive('defender-buff-ultraDEF')) {
            defBuffBonus = Math.max(defBuffBonus, 80); // Ultra DEF +80%
        }
        if (isBuffActive('defender-buff-increaseDEF')) {
            defBuffBonus = Math.max(defBuffBonus, 30); // Increase DEF +30%
        }
        if (isBuffActive('defender-debuff-decreaseDEF')) {
            defDebuffPenalty = Math.max(defDebuffPenalty, 25); // Decrease DEF -25%
        }
        if (isBuffActive('defender-debuff-shatteredDEF')) {
            defDebuffPenalty = Math.max(defDebuffPenalty, 75); // Shattered DEF -75%
        }

        // Cold debuffs stack additively with DEF debuffs (Chilled/Frozen are mutually exclusive)
        if (isBuffActive('defender-debuff-chilled') || isBuffActive('defender-debuff-frozen')) {
            coldDebuffPenalty = 25; // -25%
        }

        var defBuffModifier = 100 + defBuffBonus - defDebuffPenalty - coldDebuffPenalty;
        buffedDef = Math.max(1, Math.round(buffedDef * (defBuffModifier / 100)));

        // B.DMG: highest buff stacks with worst debuff (they sum together)
        var bDmgBuffBonus = 0;
        var bDmgDebuffPenalty = 0;

        if (isBuffActive('defender-buff-ultraBDMG')) {
            bDmgBuffBonus = Math.max(bDmgBuffBonus, 75); // Ultra B.DMG +75%
        }
        if (isBuffActive('defender-buff-increaseBDMG')) {
            bDmgBuffBonus = Math.max(bDmgBuffBonus, 40); // Increase B.DMG +40%
        }
        if (isBuffActive('defender-debuff-decreaseBDMG')) {
            bDmgDebuffPenalty = Math.max(bDmgDebuffPenalty, 30); // Decrease B.DMG -30%
        }

        var bDmgBuffModifier = 100 + bDmgBuffBonus - bDmgDebuffPenalty;
        buffedBDmg = Math.round(buffedBDmg * (bDmgBuffModifier / 100));

        // B.RATE: Check for Paralyzed first (overrides everything)
        var paralyzed = isBuffActive('defender-debuff-paralyzed');
        if (paralyzed) {
            buffedBRate = 0; // Paralyzed sets to 0%
        } else {
            var maxBRate = isBuffActive('defender-buff-maxBRATE');
            var noBRate = isBuffActive('defender-debuff-noBRATE');

            if (noBRate) {
                buffedBRate = 0; // No B.RATE sets to 0%
            } else if (maxBRate) {
                buffedBRate = 100; // Max B.RATE sets to 100%
            } else {
                // Apply standard buffs/debuffs (highest buff stacks with worst debuff)
                var bRateBuffBonus = 0;
                var bRateDebuffPenalty = 0;

                if (isBuffActive('defender-buff-ultraBRATE')) {
                    bRateBuffBonus = Math.max(bRateBuffBonus, 85); // Ultra B.RATE +85%
                }
                if (isBuffActive('defender-buff-increaseBRATE')) {
                    bRateBuffBonus = Math.max(bRateBuffBonus, 30); // Increase B.RATE +30%
                }
                if (isBuffActive('defender-debuff-decreaseBRATE')) {
                    bRateDebuffPenalty = Math.max(bRateDebuffPenalty, 30); // Decrease B.RATE -30%
                }
                if (isBuffActive('defender-debuff-shatteredBRATE')) {
                    bRateDebuffPenalty = Math.max(bRateDebuffPenalty, 85); // Shattered B.RATE -85%
                }

                var bRateBuffModifier = 100 + bRateBuffBonus - bRateDebuffPenalty;

                // Apply Stun separately (stacks with above)
                var stunModifier = 100;
                if (isBuffActive('defender-debuff-stun')) {
                    stunModifier = 75; // Stun -25%
                }

                buffedBRate = Math.min(100, buffedBRate * (bRateBuffModifier / 100) * (stunModifier / 100)); // Cap at 100%
            }
        }

        // Determine if defender is a hero (not Custom mode)
        var defenderHeroSelect = document.getElementById('defender-hero');
        var defenderIsHero = defenderHeroSelect && defenderHeroSelect.value && defenderHeroSelect.value !== '--custom--';

        // Build defender object for calculation (using BUFFED stats)
        var defender = {
            hp: defenderTotalStats.hp,
            def: buffedDef,  // Use buffed value for calculation
            baseDef: defenderTotalStats.def,  // Pre-buff value for formula display
            defBuffBonus: defBuffBonus,
            defDebuffPenalty: defDebuffPenalty,
            defBuffModifier: defBuffModifier,
            coldDebuffPenalty: coldDebuffPenalty,
            bDmg: buffedBDmg,  // Use buffed value for calculation
            baseBDmg: defenderTotalStats.bDmg,  // Pre-buff value for formula display
            bDmgBuffModifier: bDmgBuffModifier,
            bRate: buffedBRate,  // Use buffed value for calculation
            baseBRate: defenderTotalStats.bRate,  // Pre-buff value for formula display
            paralyzed: paralyzed,
            maxBRate: typeof maxBRate !== 'undefined' && maxBRate,
            noBRate: typeof noBRate !== 'undefined' && noBRate,
            shield: defenderTotalStats.shield,
            hasClassAdv: classAdv.defenderHasAdvantage,
            isHero: defenderIsHero  // True if a hero is selected, false for Custom (non-hero enemies)
        };

        // Build modifiers
        var shieldCountInput = document.getElementById('mod-shieldCount');
        var shieldCount = shieldCountInput ? Math.max(0, Math.min(5, parseInt(shieldCountInput.value) || 0)) : 0;

        var modifiers = {
            rangedDefense: defenderSetModifiers.rangedDefense,  // From equipment set
            wardingDefense: defenderSetModifiers.wardingDefense,  // From equipment set
            goblinSkin: document.getElementById('mod-goblinSkin').checked,
            hidden: isBuffActive('defender-buff-hidden'),  // From defender buff icons
            highGround: document.getElementById('mod-highGround').checked,
            allyProtection: isBuffActive('defender-buff-allyProtection'),  // From defender buff icons
            shieldPercent: defenderTotalStats.shield,  // Shield% stat determines reduction per shield
            shieldCount: shieldCount  // Number of active shields (0-5), each absorbs 1 hit
        };

        // Helper to read inline count input for perAlly/perDead/threshold talents
        function getTalentCount(prefix, talentId) {
            var countInput = document.getElementById(prefix + '-talent-' + talentId + '-count');
            return countInput ? (parseInt(countInput.value) || 0) : 0;
        }

        // Get defender role for talent evaluation
        var defenderRole = document.getElementById('defender-role').value || '';
        var attackerRole = document.getElementById('attacker-role').value || '';

        // Evaluate defender talents based on conditions
        // With the new UI approach:
        // - All talents have checkboxes to enable/disable
        // - For perAlly/perDead/threshold: use inline count input
        // - For binary conditions (attackerType, attackType): if checkbox checked, assume condition is met
        var defTalents = DEFENSIVE_TALENTS[defenderRole] || [];

        // Read count inputs for perAlly/perDead/threshold talents
        var vengefulResilienceCount = getTalentCount('defender', 'vengefulResilience');
        var defensiveCohesionCount = getTalentCount('defender', 'defensiveCohesion');
        var steadfastPresenceCount = getTalentCount('defender', 'steadfastPresence');

        var talents = {
            // Checkbox-based talents (manual selection)
            survivalInstincts: isTalentActive('defender', 'survivalInstincts'),
            healthyDefender: isTalentActive('defender', 'healthyDefender'),
            cooperativeDefense: isTalentActive('defender', 'cooperativeDefense'),
            advancedCamouflage: isTalentActive('defender', 'advancedCamouflage'),

            // perDead talents - checkbox + inline count input
            vengefulResilience: isTalentActive('defender', 'vengefulResilience') && vengefulResilienceCount > 0,
            vengefulResilienceDeadAllies: Math.min(vengefulResilienceCount, 7),

            // perAlly talents - checkbox + inline count input
            defensiveCohesion: isTalentActive('defender', 'defensiveCohesion') && defensiveCohesionCount > 0,
            defensiveCohesionAllies: Math.min(defensiveCohesionCount, 7),

            // threshold talents - checkbox + inline count input (need threshold to be met)
            steadfastPresence: isTalentActive('defender', 'steadfastPresence') && steadfastPresenceCount >= 3,

            // Binary condition talents (attackerType) - if checkbox checked, assume condition is met
            heroDefense: isTalentActive('defender', 'heroDefense'),
            bossParry: isTalentActive('defender', 'bossParry'),
            giantsGuard: isTalentActive('defender', 'giantsGuard'),
            minionProtection: isTalentActive('defender', 'minionProtection'),

            // Binary condition talents (attackType) - if checkbox checked, assume condition is met
            spreadOut: isTalentActive('defender', 'spreadOut'),
            afflictionResistance: isTalentActive('defender', 'afflictionResistance'),

            // classDisadvantage talents - if checkbox checked, assume attacking with class advantage
            classBlock: isTalentActive('defender', 'classBlock')
        };

        // Evaluate attacker talents based on conditions
        // With the new UI approach:
        // - All talents have checkboxes to enable/disable
        // - For perAlly/threshold: use inline count input
        // - For binary conditions (targetType): if checkbox checked, assume condition is met
        var atkTalents = OFFENSIVE_TALENTS[attackerRole] || [];

        // Read count inputs for perAlly/threshold talents
        var standAgainstManyCount = getTalentCount('attacker', 'standAgainstMany');
        var tacticalSynergyCount = getTalentCount('attacker', 'tacticalSynergy');

        var attackerTalents = {
            // Checkbox-based talents (manual selection)
            loneSurvivor: isTalentActive('attacker', 'loneSurvivor'),
            lastOneStanding: isTalentActive('attacker', 'lastOneStanding'),
            flawlessExecution: isTalentActive('attacker', 'flawlessExecution'),
            engagedCombatant: isTalentActive('attacker', 'engagedCombatant'),
            firstStone: isTalentActive('attacker', 'firstStone'),
            relentlessAttacker: isTalentActive('attacker', 'relentlessAttacker'),
            shieldedVigor: isTalentActive('attacker', 'shieldedVigor'),
            empoweringEnvy: isTalentActive('attacker', 'empoweringEnvy'),
            desperateStrikes: isTalentActive('attacker', 'desperateStrikes'),
            loneWolf: isTalentActive('attacker', 'loneWolf'),
            expertAim: isTalentActive('attacker', 'expertAim'),
            desperateStrength: isTalentActive('attacker', 'desperateStrength'),
            unbrokenAssault: isTalentActive('attacker', 'unbrokenAssault'),
            healthyAdvantage: isTalentActive('attacker', 'healthyAdvantage'),

            // threshold talents - checkbox + inline count input (need threshold to be met)
            standAgainstMany: isTalentActive('attacker', 'standAgainstMany') && standAgainstManyCount >= 4,

            // perAlly talents - checkbox + inline count input
            tacticalSynergy: isTalentActive('attacker', 'tacticalSynergy') && tacticalSynergyCount > 0,
            tacticalSynergyAllies: Math.min(tacticalSynergyCount, 7),

            // Binary condition talents (targetType) - if checkbox checked, assume condition is met
            herosWrath: isTalentActive('attacker', 'herosWrath'),
            kingslayer: isTalentActive('attacker', 'kingslayer'),
            theBiggerTheyAre: isTalentActive('attacker', 'theBiggerTheyAre'),
            exterminator: isTalentActive('attacker', 'exterminator'),

            // classAdvantage talents - if checkbox checked, assume attacking with class advantage
            exploitVulnerability: isTalentActive('attacker', 'exploitVulnerability')
        };

        var buffsDebuffs = {}; // No longer used - buffs applied directly to stats earlier

        // Calculate damage
        var result = calculateDamage(attacker, defender, modifiers, talents, attackerTalents, buffsDebuffs);

        // Display results
        displayResults(result, classAdv);

        // Display formula breakdown
        displayFormulaBreakdown(result);
    }

    function displayResults(result, classAdv) {
        var container = document.getElementById('calc-results-content');
        if (!container) return;

        var inputs = result.inputs || {};
        var attacker = inputs.attacker || {};
        var defender = inputs.defender || {};

        var html = '';

        // ========== FINAL DAMAGE ==========
        html += '<div class="result-section">';
        html += '<div class="result-section-header">Final Damage</div>';
        html += '<div class="result-grid">';

        html += '<div class="result-item result-highlight">';
        html += '<span class="result-label">Total Expected:</span>';
        html += '<span class="result-value">' + formatNumber(result.totalExpectedDamage) + '</span>';
        html += '</div>';

        html += '<div class="result-item">';
        html += '<span class="result-label">Total Min:</span>';
        html += '<span class="result-value">' + formatNumber(result.totalMinDamage) + '</span>';
        html += '</div>';

        html += '<div class="result-item">';
        html += '<span class="result-label">Total Max:</span>';
        html += '<span class="result-value">' + formatNumber(result.totalMaxDamage) + '</span>';
        html += '</div>';

        // Per-hit damage (if multi-hit)
        if (attacker.numHits > 1) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Per Hit (Expected):</span>';
            html += '<span class="result-value">' + formatNumber(result.expectedDamagePerHit) + '</span>';
            html += '</div>';
        }

        html += '</div></div>';

        // ========== ATTACKER STATS ==========
        html += '<div class="result-section">';
        html += '<div class="result-section-header">Attacker Stats</div>';
        html += '<div class="result-grid">';

        // ATK with buff info
        var hasAtkBuffs = attacker.atkBuffModifier && attacker.atkBuffModifier !== 100;
        if (hasAtkBuffs) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Base ATK:</span>';
            html += '<span class="result-value">' + formatNumber(attacker.baseAtk) + '</span>';
            html += '</div>';
            html += '<div class="result-item">';
            html += '<span class="result-label">ATK Modifier:</span>';
            var atkModClass = attacker.atkBuffModifier > 100 ? 'result-buff' : 'result-debuff';
            html += '<span class="result-value ' + atkModClass + '">×' + (attacker.atkBuffModifier / 100).toFixed(2) + '</span>';
            html += '</div>';
        }
        html += '<div class="result-item">';
        html += '<span class="result-label">Total ATK:</span>';
        html += '<span class="result-value">' + formatNumber(attacker.atk) + '</span>';
        html += '</div>';

        html += '<div class="result-item">';
        html += '<span class="result-label">Skill Damage:</span>';
        html += '<span class="result-value">' + formatNumber(result.baseDamage) + '</span>';
        html += '</div>';

        // Crit stats with buff info
        var hasCRateBuffs = attacker.cRateBuffModifier && attacker.cRateBuffModifier !== 100;
        html += '<div class="result-item">';
        html += '<span class="result-label">Crit Rate:</span>';
        if (attacker.maxCRate) {
            html += '<span class="result-value result-buff">' + (result.critRateDecimal * 100).toFixed(0) + '% (Max)</span>';
        } else if (hasCRateBuffs) {
            var cRateModClass = attacker.cRateBuffModifier > 100 ? 'result-buff' : 'result-debuff';
            html += '<span class="result-value ' + cRateModClass + '">' + (result.critRateDecimal * 100).toFixed(0) + '%</span>';
        } else {
            html += '<span class="result-value">' + (result.critRateDecimal * 100).toFixed(0) + '%</span>';
        }
        html += '</div>';

        var hasCDmgBuffs = attacker.cDmgBuffModifier && attacker.cDmgBuffModifier !== 100;
        html += '<div class="result-item">';
        html += '<span class="result-label">Crit Damage:</span>';
        if (hasCDmgBuffs) {
            var cDmgModClass = attacker.cDmgBuffModifier > 100 ? 'result-buff' : 'result-debuff';
            html += '<span class="result-value ' + cDmgModClass + '">' + formatNumber(attacker.cDmg) + '</span>';
        } else {
            html += '<span class="result-value">' + formatNumber(attacker.cDmg) + '</span>';
        }
        html += '</div>';

        html += '<div class="result-item">';
        html += '<span class="result-label">Pierce:</span>';
        html += '<span class="result-value">' + Math.min(attacker.pierce, 100) + '%</span>';
        html += '</div>';

        if (attacker.numHits > 1) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Hits:</span>';
            html += '<span class="result-value">' + attacker.numHits + '</span>';
            html += '</div>';
        }

        html += '</div></div>';

        // ========== DEFENDER STATS ==========
        html += '<div class="result-section">';
        html += '<div class="result-section-header">Defender Stats</div>';
        html += '<div class="result-grid">';

        // Defense with buff info
        var hasDefBuffs = defender.defBuffModifier && defender.defBuffModifier !== 100;
        var hasColdDebuff = defender.coldDebuffPenalty && defender.coldDebuffPenalty > 0;
        if (hasDefBuffs || hasColdDebuff) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Base DEF:</span>';
            html += '<span class="result-value">' + formatNumber(defender.baseDef) + '</span>';
            html += '</div>';
        }
        html += '<div class="result-item">';
        html += '<span class="result-label">Effective DEF:</span>';
        if (hasDefBuffs || hasColdDebuff) {
            var defModClass = result.defense > defender.baseDef ? 'result-buff' : 'result-debuff';
            html += '<span class="result-value ' + defModClass + '">' + formatNumber(result.defense) + '</span>';
        } else {
            html += '<span class="result-value">' + formatNumber(result.defense) + '</span>';
        }
        html += '</div>';

        // Block stats
        var hasBRateBuffs = defender.bRate !== defender.baseBRate;
        html += '<div class="result-item">';
        html += '<span class="result-label">Block Rate:</span>';
        if (defender.paralyzed || defender.noBRate) {
            html += '<span class="result-value result-debuff">0% (Disabled)</span>';
        } else if (defender.maxBRate) {
            html += '<span class="result-value result-buff">100% (Max)</span>';
        } else if (hasBRateBuffs) {
            var bRateModClass = defender.bRate > defender.baseBRate ? 'result-buff' : 'result-debuff';
            html += '<span class="result-value ' + bRateModClass + '">' + (result.blockRateDecimal * 100).toFixed(0) + '%</span>';
        } else {
            html += '<span class="result-value">' + (result.blockRateDecimal * 100).toFixed(0) + '%</span>';
        }
        html += '</div>';

        var hasBDmgBuffs = defender.bDmgBuffModifier && defender.bDmgBuffModifier !== 100;
        html += '<div class="result-item">';
        html += '<span class="result-label">Block Damage:</span>';
        if (hasBDmgBuffs) {
            var bDmgModClass = defender.bDmgBuffModifier > 100 ? 'result-buff' : 'result-debuff';
            html += '<span class="result-value ' + bDmgModClass + '">' + formatNumber(defender.bDmg) + '</span>';
        } else {
            html += '<span class="result-value">' + formatNumber(defender.bDmg) + '</span>';
        }
        html += '</div>';

        if (result.avgBlockReduction > 0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Avg Block Reduction:</span>';
            html += '<span class="result-value">' + formatNumber(result.avgBlockReduction) + '</span>';
            html += '</div>';
        }

        html += '</div></div>';

        // ========== CALCULATION PATH ==========
        html += '<div class="result-section">';
        html += '<div class="result-section-header">Calculation Details</div>';
        html += '<div class="result-grid">';

        html += '<div class="result-item">';
        html += '<span class="result-label">Path Used:</span>';
        if (result.pathVariesWithCrit) {
            html += '<span class="result-value">' + result.pathNoCrit + ' / ' + result.pathWithCrit + ' (crit)</span>';
        } else {
            html += '<span class="result-value">' + result.path + '</span>';
        }
        html += '</div>';

        // Class matchup
        html += '<div class="result-item">';
        html += '<span class="result-label">Class Matchup:</span>';
        html += '<span class="result-value">';
        if (classAdv && classAdv.attackerHasAdvantage) {
            html += '<span class="result-buff">+20% (Advantage)</span>';
        } else if (classAdv && classAdv.defenderHasAdvantage) {
            html += '<span class="result-debuff">-20% (Disadvantage)</span>';
        } else {
            html += 'Neutral';
        }
        html += '</span>';
        html += '</div>';

        // Offensive talents
        if (result.offensiveTalentsMultiplier !== 1.0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Offensive Talents:</span>';
            html += '<span class="result-value result-buff">×' + result.offensiveTalentsMultiplier.toFixed(2) + '</span>';
            html += '</div>';
        }

        // Defensive talents
        if (result.talentsMultiplier !== 1.0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Defensive Talents:</span>';
            html += '<span class="result-value result-debuff">×' + result.talentsMultiplier.toFixed(2) + '</span>';
            html += '</div>';
        }

        // Special modifiers
        if (result.specialModifiersMultiplier !== 1.0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Special Modifiers:</span>';
            html += '<span class="result-value">×' + result.specialModifiersMultiplier.toFixed(2) + '</span>';
            html += '</div>';
        }

        // Giant Slayer
        if (result.giantSlayerBonus && result.giantSlayerBonus > 0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Giant Slayer:</span>';
            html += '<span class="result-value result-buff">+' + result.giantSlayerBonus + '%</span>';
            html += '</div>';
        }

        // High Ground
        if (result.highGroundEffect !== 1.0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">High Ground:</span>';
            html += '<span class="result-value result-buff">+50%</span>';
            html += '</div>';
        }

        // Ally Protection
        if (result.allyProtectionMult !== 1.0) {
            html += '<div class="result-item">';
            html += '<span class="result-label">Ally Protection:</span>';
            html += '<span class="result-value result-debuff">-50%</span>';
            html += '</div>';
        }

        html += '</div></div>';

        // ========== SHIELD INFO (if active and shield% > 0) ==========
        if (result.shieldCount > 0 && inputs.modifiers && inputs.modifiers.shieldPercent > 0) {
            html += '<div class="result-section">';
            html += '<div class="result-section-header">Shield Absorption</div>';
            html += '<div class="result-grid">';

            html += '<div class="result-item">';
            html += '<span class="result-label">Active Shields:</span>';
            html += '<span class="result-value">' + result.shieldCount + '</span>';
            html += '</div>';

            html += '<div class="result-item">';
            html += '<span class="result-label">Shielded Hits:</span>';
            html += '<span class="result-value">' + result.shieldedHits + ' / ' + attacker.numHits + '</span>';
            html += '</div>';

            html += '<div class="result-item">';
            html += '<span class="result-label">Shield Reduction:</span>';
            html += '<span class="result-value">' + ((1 - result.shieldMultiplier) * 100).toFixed(0) + '%</span>';
            html += '</div>';

            html += '</div></div>';
        }

        // ========== SURVIVAL INFO ==========
        html += '<div class="result-section">';
        html += '<div class="result-section-header">Survival</div>';
        html += '<div class="result-grid">';

        html += '<div class="result-item">';
        html += '<span class="result-label">Defender HP:</span>';
        html += '<span class="result-value">' + formatNumber(defender.hp) + '</span>';
        html += '</div>';

        html += '<div class="result-item">';
        html += '<span class="result-label">HP After Attack:</span>';
        var hpAfter = Math.max(0, result.hpRemaining);
        html += '<span class="result-value ' + (result.survives ? '' : 'result-debuff') + '">' + formatNumber(hpAfter) + '</span>';
        html += '</div>';

        html += '<div class="result-item">';
        html += '<span class="result-label">Survives:</span>';
        html += '<span class="result-value ' + (result.survives ? 'result-buff' : 'result-debuff') + '">' + (result.survives ? 'Yes' : 'No') + '</span>';
        html += '</div>';

        html += '</div></div>';

        container.innerHTML = html;

        // Update live region for screen readers
        var liveRegion = document.getElementById('calc-live-region');
        if (liveRegion) {
            liveRegion.textContent = 'Damage calculated: ' + formatNumber(result.totalExpectedDamage) + ' expected damage';
        }
    }

    // ============================================
    // FORMULA BREAKDOWN DISPLAY
    // ============================================

    /**
     * Display visual formula breakdown
     *
     * Shows ONE comprehensive formula view with interactive hover tooltips.
     * Each component is clearly explained when hovered.
     */
    function displayFormulaBreakdown(result) {
        var container = document.getElementById('formula-visualization');
        if (!container) return;

        if (!result.inputs) {
            container.innerHTML = '<div style="padding: 20px; text-align: center; color: #e74c3c;">' +
                '<p><strong>Formula breakdown requires updated calculationEngine.js</strong></p>' +
                '<p>Please refresh your browser (Ctrl+Shift+R or Cmd+Shift+R) to clear cache.</p>' +
                '</div>';
            return;
        }

        var html = '';
        var inputs = result.inputs;

        // Cap pierce display at 100%
        var effectivePierce = Math.min(inputs.attacker.pierce, 100);

        // ========================================
        // SECTION 1: SKILL DAMAGE (Base Damage)
        // ========================================
        html += '<div class="formula-section">';
        html += '<div class="formula-section-header">Skill Damage</div>';
        html += '<div class="formula-section-desc">Your attack stat combined with skill scaling</div>';

        // Skill damage calculation
        var skillDamageBeforeTalents = result.baseDamage / result.offensiveTalentsMultiplier;

        // Check if ATK buffs/debuffs are active
        var hasAtkBuffs = inputs.attacker.atkBuffModifier && inputs.attacker.atkBuffModifier !== 100;
        var baseAtk = inputs.attacker.baseAtk || inputs.attacker.atk;

        // Show ATK buff calculation if buffs are active
        if (hasAtkBuffs) {
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">ATK with Buffs:</span>';
            html += createHoverValue(formatNumber(baseAtk), 'atk',
                'Base Attack',
                'Attack stat before buffs/debuffs');
            html += '<span class="formula-op">×</span>';
            var atkBuffTooltip = buildAtkBuffTooltip(inputs.attacker);
            var atkModCategory = inputs.attacker.atkBuffModifier >= 100 ? 'buff' : 'debuff';
            html += createHoverValue((inputs.attacker.atkBuffModifier / 100).toFixed(2), atkModCategory,
                'ATK Modifier',
                atkBuffTooltip);
            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-atk">' + formatNumber(inputs.attacker.atk) + '</span>';
            html += '</div>';
        }

        // Main skill damage calculation
        html += '<div class="formula-line">';
        if (hasAtkBuffs) {
            // Reference the buffed ATK calculated above
            html += createHoverValue(formatNumber(inputs.attacker.atk), 'atk',
                'Buffed Attack',
                'Attack after buffs: ' + formatNumber(baseAtk) + ' × ' + (inputs.attacker.atkBuffModifier / 100).toFixed(2));
        } else {
            html += createHoverValue(formatNumber(inputs.attacker.atk), 'atk',
                'Total Attack',
                'Attack stat (no buffs/debuffs active)');
        }
        html += '<span class="formula-op">×</span>';
        html += createHoverValue((inputs.attacker.atkDmgRatio * 100).toFixed(0) + '%', 'ratio',
            'Skill Ratio',
            'Attack-to-Damage ratio from the skill (e.g., 100% means full attack converts to damage)');
        html += '<span class="formula-op">×</span>';
        html += createHoverValue(inputs.attacker.skillMult.toFixed(2), 'mult',
            'Skill Level Bonus',
            inputs.attacker.skillMult > 1 ? '+' + ((inputs.attacker.skillMult - 1) * 100).toFixed(0) + '% bonus from skill level upgrades' : 'No skill level bonus');
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-base">' + formatNumber(skillDamageBeforeTalents) + '</span>';
        html += '</div>';

        // Offensive talents (if active)
        if (result.offensiveTalentsMultiplier !== 1.0) {
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">With Offensive Talents:</span>';
            html += createHoverValue(formatNumber(skillDamageBeforeTalents), 'base', 'Skill Damage', 'Base skill damage before talents');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(result.offensiveTalentsMultiplier.toFixed(2), 'talent',
                'Talent Multiplier',
                buildTalentTooltip(inputs.attackerTalents, 'offensive'));
            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-base">' + formatNumber(result.baseDamage) + '</span>';
            html += '</div>';
        }
        html += '</div>';

        // ========================================
        // SECTION 2: PATH SELECTION
        // ========================================
        var pathHeaderText = result.pathVariesWithCrit
            ? 'Path Selection: ' + result.pathNoCrit + ' (no crit) / ' + result.pathWithCrit + ' (crit)'
            : 'Path Selection: ' + result.path;
        html += '<div class="formula-section formula-section-' + (result.usedPierce ? 'pierce' : 'defense') + '">';
        html += '<div class="formula-section-header">' + pathHeaderText + '</div>';
        var pathDesc = '';
        if (result.pathVariesWithCrit) {
            pathDesc = 'Path varies depending on crit! Without crit: ' + result.pathNoCrit + ' path is better. ' +
                'With crit: ' + result.pathWithCrit + ' path is better (crit damage is added after pierce reduction, making it unaffected by pierce).';
        } else if (result.usedPierce) {
            pathDesc = 'Pierce path bypasses defense entirely. Damage is reduced by pierce %, but crit damage is unaffected.';
        } else {
            pathDesc = 'Defense path subtracts enemy defense from your damage.';
        }
        html += '<div class="formula-section-desc">' + pathDesc + '</div>';

        html += '<div class="formula-line">';

        // Check for C.DMG buffs
        var hasCDmgBuffs = inputs.attacker.cDmgBuffModifier && inputs.attacker.cDmgBuffModifier !== 100;
        var baseCDmg = inputs.attacker.baseCDmg || inputs.attacker.cDmg;
        var cDmgTooltip = hasCDmgBuffs
            ? 'Base: ' + formatNumber(baseCDmg) + ' × ' + (inputs.attacker.cDmgBuffModifier / 100).toFixed(2) +
              ' (' + (inputs.attacker.cDmgBuffModifier === 200 ? 'Ultra C.DMG' : 'Increase C.DMG') + ') = ' + formatNumber(inputs.attacker.cDmg)
            : 'Flat crit damage (no buffs active)';

        if (result.usedPierce) {
            // Pierce Path: (BaseDmg × Pierce%) + CritDmg) × ClassAdv
            html += '<span class="formula-group">(</span>';
            html += createHoverValue(formatNumber(result.baseDamage), 'base', 'Skill Damage', 'Damage from attack and skill calculation');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(effectivePierce + '%', 'pierce',
                'Pierce',
                'Pierce reduces base damage to ' + effectivePierce + '% but completely bypasses enemy defense. Capped at 100%.');
            if (inputs.attacker.cDmg > 0) {
                html += '<span class="formula-op">+</span>';
                html += createHoverValue(formatNumber(inputs.attacker.cDmg), 'crit',
                    'Critical Damage',
                    cDmgTooltip + '. Added AFTER pierce reduction (pierce never reduces crit damage).');
            }
            html += '<span class="formula-group">)</span>';
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(result.classAdvMultiplier.toFixed(1), 'class',
                'Class Advantage',
                result.classAdvMultiplier > 1 ? 'Attacker has class advantage: +20% damage' : 'No class advantage bonus');
        } else {
            // Defense Path: (BaseDmg + CritDmg) × ClassAdv - Defense
            html += '<span class="formula-group">(</span>';
            html += createHoverValue(formatNumber(result.baseDamage), 'base', 'Skill Damage', 'Damage from attack and skill calculation');
            if (inputs.attacker.cDmg > 0) {
                html += '<span class="formula-op">+</span>';
                html += createHoverValue(formatNumber(inputs.attacker.cDmg), 'crit',
                    'Critical Damage',
                    cDmgTooltip);
            }
            html += '<span class="formula-group">)</span>';
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(result.classAdvMultiplier.toFixed(1), 'class',
                'Class Advantage',
                result.classAdvMultiplier > 1 ? 'Attacker has class advantage: +20% damage' : 'No class advantage bonus');
            html += '<span class="formula-op">−</span>';
            html += createHoverValue(formatNumber(result.defense), 'def',
                'Effective Defense',
                buildDefenseTooltip(inputs));
        }

        var pathResult = result.usedPierce ? result.dmgPierceWithCrit : result.dmgVsDefWithCrit;
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-path">' + formatNumber(pathResult) + '</span>';
        html += '</div>';

        // Show both path results when paths vary
        if (result.pathVariesWithCrit) {
            var pathResultNoCrit = result.pathNoCrit === 'Pierce' ? result.dmgPierceNoCrit : result.dmgVsDefNoCrit;
            var pathResultWithCrit = result.pathWithCrit === 'Pierce' ? result.dmgPierceWithCrit : result.dmgVsDefWithCrit;
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">Without crit (' + result.pathNoCrit + '):</span>';
            html += '<span class="formula-result cat-dmg-normal">' + formatNumber(pathResultNoCrit) + '</span>';
            html += '</div>';
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">With crit (' + result.pathWithCrit + '):</span>';
            html += '<span class="formula-result cat-dmg-crit">' + formatNumber(pathResultWithCrit) + '</span>';
            html += '</div>';
        }

        html += '</div>';

        // ========================================
        // SECTION 3: PRE-VARIANCE MODIFIERS (if any active)
        // ========================================
        var modifiersList = buildModifiersList(inputs, result);
        // Calculate pre-variance damage (after modifiers, before variance roll)
        var preVarianceDamage = pathResult * result.specialModifiersMultiplier * result.talentsMultiplier * result.highGroundEffect;

        if (modifiersList.length > 0) {
            html += '<div class="formula-section formula-section-modifiers">';
            html += '<div class="formula-section-header">Pre-Variance Modifiers</div>';
            html += '<div class="formula-section-desc">Equipment sets, talents, and positional effects applied before shield reduction and random variance</div>';

            html += '<div class="formula-line">';
            html += createHoverValue(formatNumber(pathResult), 'path', 'Path Result', 'Damage after path selection');

            modifiersList.forEach(function(mod) {
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(mod.value, mod.category, mod.label, mod.tooltip);
            });

            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-preblock">' + formatNumber(preVarianceDamage) + '</span>';
            html += '</div>';
            html += '</div>';
        }

        // ========================================
        // SECTION 4: SHIELD REDUCTION (if shields active)
        // ========================================
        var hasShields = result.shieldCount > 0 && result.shieldMultiplier < 1;

        if (hasShields) {
            html += '<div class="formula-section formula-section-shield">';
            html += '<div class="formula-section-header">Shield Reduction</div>';
            html += '<div class="formula-section-desc">' + result.shieldCount + ' shield(s) active, each absorbing ' +
                ((1 - result.shieldMultiplier) * 100).toFixed(0) + '% damage per hit</div>';

            html += '<div class="formula-line">';
            html += createHoverValue(formatNumber(result.preShieldDamageNoCrit), 'preblock', 'Pre-Shield (No Crit)', 'Damage before shield reduction');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(result.shieldMultiplier.toFixed(2), 'shield', 'Shield Mult',
                'Shield absorbs ' + ((1 - result.shieldMultiplier) * 100).toFixed(0) + '% of damage');
            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-shield">' + formatNumber(result.preBlockDamageNoCrit) + '</span>';
            html += '</div>';

            if (result.critRateDecimal > 0 && result.preShieldDamageWithCrit !== result.preShieldDamageNoCrit) {
                html += '<div class="formula-line">';
                html += createHoverValue(formatNumber(result.preShieldDamageWithCrit), 'dmg-crit', 'Pre-Shield (Crit)', 'Damage with crit before shield');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.shieldMultiplier.toFixed(2), 'shield', 'Shield Mult',
                    'Shield absorbs ' + ((1 - result.shieldMultiplier) * 100).toFixed(0) + '% of damage');
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-dmg-crit">' + formatNumber(result.preBlockDamageWithCrit) + '</span>';
                html += '</div>';
            }

            html += '</div>';
        }

        // ========================================
        // SECTION 5: DAMAGE VARIANCE (±20% random roll)
        // ========================================
        html += '<div class="formula-section formula-section-variance">';
        html += '<div class="formula-section-header">Damage Variance</div>';
        html += '<div class="formula-section-desc">';
        html += 'The game applies a random ±20% variance to damage (independent of crit). ';
        var minCritText = result.guaranteedCrit ? 'guaranteed crit' : 'no crit';
        var maxBlockText = result.guaranteedBlock ? 'guaranteed block' : 'no block';
        html += 'Min = worst case (' + minCritText + ' + low roll + block). Max = best case (crit + high roll + ' + maxBlockText + ').';
        html += '</div>';

        // Use the actual pre-block values from the calculation engine
        // These include shield reduction if shields are active
        var preVarianceNoCrit = result.preBlockDamageNoCrit;
        var preVarianceWithCrit = result.preBlockDamageWithCrit;
        var hasCrit = result.critRateDecimal > 0 && preVarianceWithCrit !== preVarianceNoCrit;

        // Show pre-variance values
        if (hasCrit) {
            html += '<div class="formula-line">';
            html += '<span class="formula-label">Pre-variance (no crit):</span>';
            html += '<span class="formula-result cat-dmg-normal">' + formatNumber(preVarianceNoCrit) + '</span>';
            html += '</div>';
            html += '<div class="formula-line">';
            html += '<span class="formula-label">Pre-variance (with crit):</span>';
            html += '<span class="formula-result cat-dmg-crit">' + formatNumber(preVarianceWithCrit) + '</span>';
            html += '</div>';
        } else {
            html += '<div class="formula-line">';
            html += '<span class="formula-label">Pre-variance damage:</span>';
            html += '<span class="formula-result cat-preblock">' + formatNumber(preVarianceNoCrit) + '</span>';
            html += '</div>';
        }

        // Min path (0.8x, no crit unless guaranteed) - worst case for attacker
        var minPreVariance = result.guaranteedCrit ? preVarianceWithCrit : preVarianceNoCrit;
        var varianceMin = minPreVariance * 0.8;
        html += '<div class="formula-line formula-sub">';
        if (hasCrit) {
            if (result.guaranteedCrit) {
                html += '<span class="formula-label">Min (guaranteed crit × 0.8):</span>';
                html += createHoverValue(formatNumber(preVarianceWithCrit), 'dmg-crit', 'Guaranteed Crit', 'Crit always triggers at 100% crit rate');
            } else {
                html += '<span class="formula-label">Min (no crit × 0.8):</span>';
                html += createHoverValue(formatNumber(preVarianceNoCrit), 'dmg-normal', 'No Crit Damage', 'Damage without crit bonus');
            }
        } else {
            html += '<span class="formula-label">Min (× 0.8):</span>';
            html += createHoverValue(formatNumber(preVarianceNoCrit), 'preblock', 'Pre-Variance', 'Damage before variance');
        }
        html += '<span class="formula-op">×</span>';
        html += createHoverValue('0.80', 'debuff', 'Low Roll', 'Minimum variance: -20% damage');
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-debuff">' + formatNumber(varianceMin) + '</span>';
        html += '</div>';

        // Expected path (weighted by crit rate, 1.0x variance average)
        var expectedPreVariance = preVarianceWithCrit * result.critRateDecimal + preVarianceNoCrit * (1 - result.critRateDecimal);
        var varianceExpected = expectedPreVariance; // × 1.0 (variance averages out)
        html += '<div class="formula-line formula-sub">';
        if (hasCrit) {
            html += '<span class="formula-label">Expected (crit-weighted):</span>';
            html += createHoverValue(formatNumber(expectedPreVariance), 'expected', 'Crit-Weighted Avg',
                formatNumber(preVarianceWithCrit) + ' × ' + (result.critRateDecimal * 100).toFixed(0) + '% + ' +
                formatNumber(preVarianceNoCrit) + ' × ' + ((1 - result.critRateDecimal) * 100).toFixed(0) + '% (variance averages to ×1.0)');
        } else {
            html += '<span class="formula-label">Expected (× 1.0):</span>';
            html += createHoverValue(formatNumber(preVarianceNoCrit), 'preblock', 'Pre-Variance', 'Damage before variance');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue('1.00', 'expected', 'Avg Roll', 'Variance averages to ×1.0');
        }
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-expected">' + formatNumber(varianceExpected) + '</span>';
        html += '</div>';

        // Max path (1.2x, WITH crit) - best case for attacker
        // Note: Engine always uses preBlockDamageWithCrit * 1.2 for max, even if crit rate is 0
        var varianceMax = preVarianceWithCrit * 1.2;
        html += '<div class="formula-line formula-sub">';
        if (hasCrit) {
            html += '<span class="formula-label">Max (crit × 1.2):</span>';
            html += createHoverValue(formatNumber(preVarianceWithCrit), 'dmg-crit', 'Crit Damage', 'Damage with crit bonus');
        } else {
            html += '<span class="formula-label">Max (× 1.2):</span>';
            html += createHoverValue(formatNumber(preVarianceWithCrit), 'preblock', 'Pre-Variance', 'Damage before variance');
        }
        html += '<span class="formula-op">×</span>';
        html += createHoverValue('1.20', 'buff', 'High Roll', 'Maximum variance: +20% damage');
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-buff">' + formatNumber(varianceMax) + '</span>';
        html += '</div>';

        html += '</div>';

        // ========================================
        // SECTION 6: BLOCK REDUCTION (three paths)
        // ========================================
        var hasBlock = result.blockRateDecimal > 0 && inputs.defender.bDmg > 0;

        html += '<div class="formula-section formula-section-block">';
        html += '<div class="formula-section-header">Block Reduction</div>';

        // Explain the block mechanic
        if (hasBlock) {
            html += '<div class="formula-section-desc">';
            html += 'Block Rate: ' + (result.blockRateDecimal * 100).toFixed(0) + '% chance to reduce damage by ' + formatNumber(inputs.defender.bDmg) + '. ';
            if (result.guaranteedBlock) {
                html += 'Block always triggers at 100% block rate. All paths subtract full block damage.';
            } else {
                html += 'Min path assumes block triggers (worst case). Max path assumes no block (best case). Expected uses average reduction.';
            }
            html += '</div>';
        } else {
            html += '<div class="formula-section-desc">No block reduction (block rate is 0% or block damage is 0)</div>';
        }

        // Calculate post-block values for each path
        var postBlockMin = varianceMin - inputs.defender.bDmg; // Min: low roll + full block
        var postBlockExpected = varianceExpected - result.avgBlockReduction; // Expected: avg roll + avg block
        // Max: high roll + no block, unless block is guaranteed (100% block rate)
        var maxBlockReduction = result.guaranteedBlock ? inputs.defender.bDmg : 0;
        var postBlockMax = varianceMax - maxBlockReduction;

        // Min path
        html += '<div class="formula-line formula-sub">';
        html += '<span class="formula-label">Min Path:</span>';
        html += createHoverValue(formatNumber(varianceMin), 'debuff', 'After Variance (Min)', 'Damage after -20% variance roll');
        if (hasBlock) {
            html += '<span class="formula-op">−</span>';
            html += createHoverValue(formatNumber(inputs.defender.bDmg), 'block', 'Full Block', 'Block triggers (worst case): full ' + formatNumber(inputs.defender.bDmg) + ' reduction');
        }
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-debuff">' + formatNumber(Math.max(1, postBlockMin)) + '</span>';
        html += '</div>';

        // Expected path
        html += '<div class="formula-line formula-sub">';
        html += '<span class="formula-label">Expected Path:</span>';
        html += createHoverValue(formatNumber(varianceExpected), 'expected', 'After Variance (Avg)', 'Damage after average variance (1.0×)');
        if (hasBlock) {
            html += '<span class="formula-op">−</span>';
            html += createHoverValue(formatNumber(result.avgBlockReduction), 'block', 'Avg Block',
                'Average block reduction: ' + (result.blockRateDecimal * 100).toFixed(0) + '% × ' + formatNumber(inputs.defender.bDmg) + ' = ' + formatNumber(result.avgBlockReduction));
        }
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-expected">' + formatNumber(Math.max(1, postBlockExpected)) + '</span>';
        html += '</div>';

        // Max path
        html += '<div class="formula-line formula-sub">';
        html += '<span class="formula-label">Max Path:</span>';
        html += createHoverValue(formatNumber(varianceMax), 'buff', 'After Variance (Max)', 'Damage after +20% variance roll');
        if (hasBlock) {
            html += '<span class="formula-op">−</span>';
            if (result.guaranteedBlock) {
                html += createHoverValue(formatNumber(inputs.defender.bDmg), 'block', 'Guaranteed Block', 'Block always triggers at 100% block rate: full ' + formatNumber(inputs.defender.bDmg) + ' reduction');
            } else {
                html += createHoverValue('0', 'block', 'No Block', 'Block does not trigger (best case): no reduction');
            }
        }
        html += '<span class="formula-op">=</span>';
        html += '<span class="formula-result cat-buff">' + formatNumber(Math.max(1, postBlockMax)) + '</span>';
        html += '</div>';

        html += '</div>';

        // ========================================
        // SECTION 7: FINAL ADJUSTMENTS (opposite class adv, ally protection)
        // ========================================
        var hasFinalAdjustments = result.oppositeClassAdv !== 1.0 || result.allyProtectionMult !== 1.0;

        if (hasFinalAdjustments) {
            html += '<div class="formula-section formula-section-final">';
            html += '<div class="formula-section-header">Final Adjustments</div>';
            html += '<div class="formula-section-desc">';
            if (result.oppositeClassAdv !== 1.0) {
                html += 'Defender has class advantage: -20% damage. ';
            }
            if (result.allyProtectionMult !== 1.0) {
                html += 'Ally protection active: 50% damage split. ';
            }
            html += '</div>';

            var finalMultiplier = result.oppositeClassAdv * result.allyProtectionMult;
            var finalMin = Math.max(1, postBlockMin) * finalMultiplier;
            var finalExpected = Math.max(1, postBlockExpected) * finalMultiplier;
            var finalMax = Math.max(1, postBlockMax) * finalMultiplier;

            // Build multiplier display
            var multParts = [];
            if (result.oppositeClassAdv !== 1.0) multParts.push('0.80 (Class Adv)');
            if (result.allyProtectionMult !== 1.0) multParts.push('0.50 (Ally Prot)');
            var multDisplay = multParts.join(' × ');

            // Min path
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">Min Path:</span>';
            html += createHoverValue(formatNumber(Math.max(1, postBlockMin)), 'debuff', 'After Block (Min)', 'Minimum damage after block');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(finalMultiplier.toFixed(2), 'class', 'Final Mult', multDisplay);
            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-debuff">' + formatNumber(Math.max(1, finalMin)) + '</span>';
            html += '</div>';

            // Expected path
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">Expected Path:</span>';
            html += createHoverValue(formatNumber(Math.max(1, postBlockExpected)), 'expected', 'After Block (Avg)', 'Expected damage after block');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(finalMultiplier.toFixed(2), 'class', 'Final Mult', multDisplay);
            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-expected">' + formatNumber(Math.max(1, finalExpected)) + '</span>';
            html += '</div>';

            // Max path
            html += '<div class="formula-line formula-sub">';
            html += '<span class="formula-label">Max Path:</span>';
            html += createHoverValue(formatNumber(Math.max(1, postBlockMax)), 'buff', 'After Block (Max)', 'Maximum damage after block');
            html += '<span class="formula-op">×</span>';
            html += createHoverValue(finalMultiplier.toFixed(2), 'class', 'Final Mult', multDisplay);
            html += '<span class="formula-op">=</span>';
            html += '<span class="formula-result cat-buff">' + formatNumber(Math.max(1, finalMax)) + '</span>';
            html += '</div>';

            html += '</div>';

            // Update values for total damage section
            postBlockMin = finalMin;
            postBlockExpected = finalExpected;
            postBlockMax = finalMax;
        }

        // ========================================
        // SECTION 8: TOTAL DAMAGE (only for multi-hit skills)
        // ========================================
        var numHits = inputs.attacker.numHits;
        var mixedShieldHits = result.shieldedHits > 0 && result.unshieldedHits > 0;

        // Only show this section for multi-hit skills
        if (numHits > 1 || mixedShieldHits) {
            html += '<div class="formula-section formula-section-total">';
            html += '<div class="formula-section-header">Total Damage</div>';

            // Use the engine's actual calculated values for accuracy
            var totalMin = result.totalMinDamage;
            var totalExpected = result.totalExpectedDamage;
            var totalMax = result.totalMaxDamage;

            // Per-hit values from engine
            var minPerHit = result.minDamagePerHit;
            var expectedPerHit = result.expectedDamagePerHit;
            var maxPerHit = result.maxDamagePerHit;

            if (mixedShieldHits) {
                html += '<div class="formula-section-desc">' + result.shieldCount + ' shield(s) absorb first ' +
                    result.shieldedHits + ' hit(s), remaining ' + result.unshieldedHits + ' hit(s) are unshielded.</div>';

                // Mixed shielded/unshielded hits - show breakdown with both damage types
                // Min: (shielded min × shielded hits) + (unshielded min × unshielded hits)
                html += '<div class="formula-line formula-sub">';
                html += '<span class="formula-label">Min Total:</span>';
                html += '<span class="formula-group">(</span>';
                html += createHoverValue(formatNumber(result.minPerHit_Shielded), 'shield', 'Shielded Min', 'Min damage per shielded hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.shieldedHits, 'shield', 'Shielded Hits', 'Hits absorbed by shields');
                html += '<span class="formula-group">)</span>';
                html += '<span class="formula-op">+</span>';
                html += '<span class="formula-group">(</span>';
                html += createHoverValue(formatNumber(result.minPerHit_Unshielded), 'debuff', 'Unshielded Min', 'Min damage per unshielded hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.unshieldedHits, 'mult', 'Unshielded Hits', 'Hits without shield');
                html += '<span class="formula-group">)</span>';
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-debuff">' + formatNumber(totalMin) + '</span>';
                html += '</div>';

                // Expected: (shielded per hit × shielded hits) + (unshielded per hit × unshielded hits)
                html += '<div class="formula-line formula-sub">';
                html += '<span class="formula-label">Expected Total:</span>';
                html += '<span class="formula-group">(</span>';
                html += createHoverValue(formatNumber(result.expectedPerHit_Shielded), 'shield', 'Shielded', 'Expected damage per shielded hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.shieldedHits, 'shield', 'Shielded Hits', 'Hits absorbed by shields');
                html += '<span class="formula-group">)</span>';
                html += '<span class="formula-op">+</span>';
                html += '<span class="formula-group">(</span>';
                html += createHoverValue(formatNumber(result.expectedPerHit_Unshielded), 'expected', 'Unshielded', 'Expected damage per unshielded hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.unshieldedHits, 'mult', 'Unshielded Hits', 'Hits without shield');
                html += '<span class="formula-group">)</span>';
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-expected">' + formatNumber(totalExpected) + '</span>';
                html += '</div>';

                // Max: (shielded max × shielded hits) + (unshielded max × unshielded hits)
                html += '<div class="formula-line formula-sub">';
                html += '<span class="formula-label">Max Total:</span>';
                html += '<span class="formula-group">(</span>';
                html += createHoverValue(formatNumber(result.maxPerHit_Shielded), 'shield', 'Shielded Max', 'Max damage per shielded hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.shieldedHits, 'shield', 'Shielded Hits', 'Hits absorbed by shields');
                html += '<span class="formula-group">)</span>';
                html += '<span class="formula-op">+</span>';
                html += '<span class="formula-group">(</span>';
                html += createHoverValue(formatNumber(result.maxPerHit_Unshielded), 'buff', 'Unshielded Max', 'Max damage per unshielded hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(result.unshieldedHits, 'mult', 'Unshielded Hits', 'Hits without shield');
                html += '<span class="formula-group">)</span>';
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-buff">' + formatNumber(totalMax) + '</span>';
                html += '</div>';

            } else {
                // All hits same type (all shielded or all unshielded)
                html += '<div class="formula-section-desc">Skill hits ' + numHits + ' times.</div>';

                // Min total
                html += '<div class="formula-line formula-sub">';
                html += '<span class="formula-label">Min Total:</span>';
                var minCritTooltip = result.guaranteedCrit ? 'guaranteed crit' : 'no crit';
                html += createHoverValue(formatNumber(minPerHit), 'debuff', 'Min Per Hit', 'Minimum damage per hit (' + minCritTooltip + ' + low roll + block)');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(numHits, 'mult', 'Hits', 'Number of hits');
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-debuff">' + formatNumber(totalMin) + '</span>';
                html += '</div>';

                // Expected total
                html += '<div class="formula-line formula-sub">';
                html += '<span class="formula-label">Expected Total:</span>';
                html += createHoverValue(formatNumber(expectedPerHit), 'expected', 'Expected Per Hit', 'Average damage per hit');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(numHits, 'mult', 'Hits', 'Number of hits');
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-expected">' + formatNumber(totalExpected) + '</span>';
                html += '</div>';

                // Max total
                html += '<div class="formula-line formula-sub">';
                html += '<span class="formula-label">Max Total:</span>';
                var maxBlockTooltip = result.guaranteedBlock ? 'guaranteed block' : 'no block';
                html += createHoverValue(formatNumber(maxPerHit), 'buff', 'Max Per Hit', 'Maximum damage per hit (crit + high roll + ' + maxBlockTooltip + ')');
                html += '<span class="formula-op">×</span>';
                html += createHoverValue(numHits, 'mult', 'Hits', 'Number of hits');
                html += '<span class="formula-op">=</span>';
                html += '<span class="formula-result cat-buff">' + formatNumber(totalMax) + '</span>';
                html += '</div>';
            }

            html += '</div>';
        }

        container.innerHTML = html;
        initializeFormulaInteractivity();
    }

    /**
     * Create a hoverable value with tooltip
     */
    function createHoverValue(value, category, label, tooltip) {
        var escapedTooltip = tooltip.replace(/"/g, '&quot;');
        return '<span class="formula-val cat-' + category + '" data-tooltip="' + escapedTooltip + '" data-label="' + label + '">' + value + '</span>';
    }

    /**
     * Build tooltip for offensive talents
     */
    function buildTalentTooltip(talents, type) {
        var parts = [];
        if (type === 'offensive') {
            if (talents.loneSurvivor) parts.push('Lone Survivor: +10%');
            if (talents.lastOneStanding) parts.push('Last One Standing: +10%');
            if (talents.exploitVulnerability) parts.push('Exploit Vulnerability: +15%');
            if (talents.tacticalSynergy) parts.push('Tactical Synergy: +' + (talents.tacticalSynergyAllies * 5) + '%');
        }
        return parts.length > 0 ? parts.join(', ') : 'No offensive talents active';
    }

    /**
     * Build tooltip for ATK buff modifiers
     */
    function buildAtkBuffTooltip(attacker) {
        var parts = [];
        var modifier = attacker.atkBuffModifier || 100;
        var buffBonus = attacker.atkBuffBonus || 0;
        var debuffPenalty = attacker.atkDebuffPenalty || 0;

        if (buffBonus > 0) {
            if (buffBonus === 60) {
                parts.push('Ultra ATK: +60%');
            } else if (buffBonus === 20) {
                parts.push('Increase ATK: +20%');
            }
        }
        if (debuffPenalty > 0) {
            if (debuffPenalty === 60) {
                parts.push('Shattered ATK: -60%');
            } else if (debuffPenalty === 20) {
                parts.push('Decrease ATK: -20%');
            }
        }

        var netChange = buffBonus - debuffPenalty;
        if (netChange !== 0) {
            parts.push('Net: ' + (netChange >= 0 ? '+' : '') + netChange + '%');
        }

        parts.push('Modifier: ' + modifier + '%');
        return parts.join(' | ');
    }

    /**
     * Build tooltip explaining effective defense
     */
    function buildDefenseTooltip(inputs) {
        var defender = inputs.defender;
        var baseDef = defender.baseDef || defender.def;
        var finalDef = defender.def;
        var lines = [];
        lines.push('Base DEF: ' + formatNumber(baseDef));

        // Show buff modifiers if any active
        var hasDefBuffs = defender.defBuffModifier && defender.defBuffModifier !== 100;
        var hasCold = defender.coldDebuffPenalty && defender.coldDebuffPenalty > 0;

        if (hasDefBuffs || hasCold) {
            if (defender.defBuffBonus > 0) {
                var buffName = defender.defBuffBonus === 80 ? 'Ultra DEF' : 'Increase DEF';
                lines.push(buffName + ': +' + defender.defBuffBonus + '%');
            }
            if (defender.defDebuffPenalty > 0) {
                var debuffName = defender.defDebuffPenalty === 75 ? 'Shattered DEF' : 'Decrease DEF';
                lines.push(debuffName + ': -' + defender.defDebuffPenalty + '%');
            }
            if (hasCold) {
                lines.push('Chilled/Frozen: -' + defender.coldDebuffPenalty + '%');
            }
            lines.push('Final DEF: ' + formatNumber(finalDef) + ' (min 1)');
        }

        // Check for ignore defense from attacker
        var ignoreDef = inputs.attacker.ignoreDef || 0;
        if (ignoreDef > 0) {
            lines.push('Ignore DEF: ' + ignoreDef + '% (attacker)');
            var afterIgnore = Math.round(finalDef * (1 - ignoreDef / 100));
            lines.push('After Ignore: ' + formatNumber(afterIgnore));
        }

        return lines.join(' | ');
    }

    /**
     * Build list of active damage modifiers
     */
    function buildModifiersList(inputs, result) {
        var mods = [];

        // Attacker equipment sets
        if (result.giantSlayerBonus && result.giantSlayerBonus > 0) {
            mods.push({
                value: (1 + result.giantSlayerBonus / 100).toFixed(2),
                category: 'atk',
                label: 'Giant Slayer',
                tooltip: 'Equipment set: +' + result.giantSlayerBonus + '% damage vs non-hero enemies'
            });
        }

        // Special modifiers (defender-side)
        if (inputs.modifiers.rangedDefense && inputs.modifiers.rangedDefense > 0) {
            mods.push({
                value: (1 - inputs.modifiers.rangedDefense / 100).toFixed(2),
                category: 'def',
                label: 'Ranged Defense',
                tooltip: 'Equipment set reduces damage from ranged attacks by ' + inputs.modifiers.rangedDefense + '%'
            });
        }
        if (inputs.modifiers.wardingDefense && inputs.modifiers.wardingDefense > 0) {
            mods.push({
                value: (1 - inputs.modifiers.wardingDefense / 100).toFixed(2),
                category: 'def',
                label: 'Warding',
                tooltip: 'Equipment set reduces damage from non-adjacent attacks by ' + inputs.modifiers.wardingDefense + '%'
            });
        }
        if (inputs.modifiers.goblinSkin) {
            mods.push({ value: '0.90', category: 'def', label: 'Goblin Skin', tooltip: 'Passive ability reduces all damage by 10%' });
        }
        // Note: Shield is NOT included here - it has its own dedicated section (SECTION 4: SHIELD REDUCTION)
        // because shield reduction is applied per-hit, not as a global pre-variance multiplier
        if (inputs.modifiers.hidden) {
            mods.push({ value: '0.50', category: 'def', label: 'Hidden', tooltip: 'Hidden status reduces incoming damage by 50%' });
        }

        // Defensive talents - dynamically derived from DEFENSIVE_TALENTS config
        if (inputs.talents) {
            var talentMap = {};
            Object.keys(DEFENSIVE_TALENTS).forEach(function(role) {
                DEFENSIVE_TALENTS[role].forEach(function(talent) {
                    if (!talentMap[talent.id]) talentMap[talent.id] = talent;
                });
            });
            Object.keys(talentMap).forEach(function(id) {
                var talent = talentMap[id];
                if (!inputs.talents[id]) return;
                var mult, tooltip;
                if (talent.condition === 'perDead') {
                    var count = inputs.talents[id + 'DeadAllies'] || 0;
                    if (count <= 0) return;
                    mult = (1 - talent.value / 100 * count).toFixed(2);
                    tooltip = talent.name + ': -' + talent.value + '% per dead ally (' + count + ' dead)';
                } else if (talent.condition === 'perAlly') {
                    var count = inputs.talents[id + 'Allies'] || 0;
                    if (count <= 0) return;
                    mult = (1 - talent.value / 100 * count).toFixed(2);
                    tooltip = talent.name + ': -' + talent.value + '% per ally (' + count + ' allies)';
                } else {
                    mult = (1 - talent.value / 100).toFixed(2);
                    tooltip = talent.description;
                }
                mods.push({ value: mult, category: 'talent', label: talent.name, tooltip: tooltip });
            });
        }

        // Positional effects (high ground only - opposite class adv and ally protection come after block)
        if (result.highGroundEffect !== 1.0) {
            mods.push({ value: '1.50', category: 'pos', label: 'High Ground', tooltip: 'Attacker on elevated position deals +50% damage' });
        }
        // Note: oppositeClassAdv and allyProtectionMult are applied AFTER block, shown in Final Adjustments section

        return mods;
    }

    /**
     * Initialize hover interactions for formula values
     */
    function initializeFormulaInteractivity() {
        // Create tooltip element if it doesn't exist
        var tooltip = document.getElementById('formula-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'formula-tooltip';
            document.body.appendChild(tooltip);
        }

        // Get all interactive values
        var values = document.querySelectorAll('.formula-val[data-tooltip]');

        values.forEach(function(val) {
            val.addEventListener('mouseenter', function(e) {
                var desc = this.getAttribute('data-tooltip');
                var label = this.getAttribute('data-label') || '';

                // Build tooltip content
                var html = '';
                if (label) {
                    html += '<div class="tooltip-label">' + label + '</div>';
                }
                html += '<div class="tooltip-desc">' + desc + '</div>';
                tooltip.innerHTML = html;

                var rect = this.getBoundingClientRect();

                // Position tooltip above the element
                tooltip.style.display = 'block';
                tooltip.classList.remove('visible');
                var tooltipRect = tooltip.getBoundingClientRect();

                var left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                var top = rect.top - tooltipRect.height - 12;

                // Keep tooltip on screen
                var maxLeft = window.innerWidth - tooltipRect.width - 10;
                var finalLeft = Math.max(10, Math.min(left, maxLeft));

                // If tooltip would go above viewport, show below instead
                if (top < 10) {
                    top = rect.bottom + 12;
                }

                tooltip.style.left = finalLeft + 'px';
                tooltip.style.top = top + 'px';
                tooltip.classList.add('visible');
            });

            val.addEventListener('mouseleave', function() {
                tooltip.classList.remove('visible');
            });
        });
    }

    // Register calculate as global callback for Core module
    window.damageCalcCalculate = calculate;

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        var container = document.getElementById('damage-calculator');
        if (!container) {
            console.log('Damage calculator container not found');
            return;
        }

        // Build the calculator UI (replaces any fallback content in the container)
        buildCalculatorUI(container);
    }

    // Browser initialization (skip in Node.js/Jest)
    if (typeof document !== 'undefined') {
        // Wait for DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // Also hook into MediaWiki's content loading
        if (typeof mw !== 'undefined' && mw.hook) {
            mw.hook('wikipage.content').add(function() {
                init();
            });
        }
    }

    // Export for testing (Node.js/Jest) - remove this block before wiki upload
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            getClassAdvantage: getClassAdvantage,
            calculateEquipmentBonuses: calculateEquipmentBonuses,
            calculateDamage: calculateDamage,
            formatNumber: formatNumber
        };
    }

})();