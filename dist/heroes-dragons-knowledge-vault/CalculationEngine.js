/**
 * Heroes & Dragons - Damage Calculator: Calculation Engine
 * Part 1 of 3 - Load order: calculationEngine.js → DamageCalculator_Core.js → DamageCalculator_UI.js
 *
 * Pure calculation functions for damage, class advantage, and equipment bonuses.
 * Exports: window.CalcEngine
 */
(function() {
    'use strict';

    function getClassAdvantage(attackerClass, defenderClass) {
        if (!attackerClass || !defenderClass) return { attackerHasAdvantage: false, defenderHasAdvantage: false };
        var a = attackerClass.toLowerCase(), d = defenderClass.toLowerCase();
        if (a === 'valor' || d === 'valor') return { attackerHasAdvantage: false, defenderHasAdvantage: false };
        var aWins = (a === 'wisdom' && d === 'faith') || (a === 'faith' && d === 'force') || (a === 'force' && d === 'wisdom');
        var dWins = (d === 'wisdom' && a === 'faith') || (d === 'faith' && a === 'force') || (d === 'force' && a === 'wisdom');
        return { attackerHasAdvantage: aWins, defenderHasAdvantage: dWins };
    }

    function calculateEquipmentBonuses(selections, STAT_VALUES) {
        var bonuses = { hp: 0, atk: 0, def: 0, pierce: 0, bRate: 0, bDmg: 0, cRate: 0, cDmg: 0, shield: 0 };
        for (var slot in selections) {
            var item = selections[slot];
            if (item && STAT_VALUES[item]) {
                for (var stat in STAT_VALUES[item]) bonuses[stat] = (bonuses[stat] || 0) + STAT_VALUES[item][stat];
            }
        }
        return bonuses;
    }

    function calculateDamage(attacker, defender, modifiers, talents, attackerTalents) {
        var baseDamage = attacker.atk * attacker.skillMult * attacker.atkDmgRatio;
        var offensiveTalentsMultiplier = 1.0;
        if (attackerTalents) {
            if (attackerTalents.loneSurvivor) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.lastOneStanding) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.flawlessExecution) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.engagedCombatant) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.firstStone) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.relentlessAttacker) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.shieldedVigor) offensiveTalentsMultiplier *= 1.05;
            if (attackerTalents.empoweringEnvy) offensiveTalentsMultiplier *= 1.05;
            if (attackerTalents.desperateStrikes) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.loneWolf) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.expertAim) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.desperateStrength) offensiveTalentsMultiplier *= 1.25;
            if (attackerTalents.unbrokenAssault) offensiveTalentsMultiplier *= 1.05;
            if (attackerTalents.healthyAdvantage) offensiveTalentsMultiplier *= 1.10;
            if (attackerTalents.standAgainstMany) offensiveTalentsMultiplier *= 1.05;
            if (attackerTalents.herosWrath) offensiveTalentsMultiplier *= 1.03;
            if (attackerTalents.kingslayer) offensiveTalentsMultiplier *= 1.05;
            if (attackerTalents.theBiggerTheyAre) offensiveTalentsMultiplier *= 1.05;
            if (attackerTalents.exterminator) offensiveTalentsMultiplier *= 1.20;
            if (attackerTalents.tacticalSynergy && attackerTalents.tacticalSynergyAllies > 0)
                offensiveTalentsMultiplier *= (1 + 0.05 * attackerTalents.tacticalSynergyAllies);
            if (attackerTalents.exploitVulnerability && attacker.hasClassAdv) offensiveTalentsMultiplier *= 1.15;
            baseDamage *= offensiveTalentsMultiplier;
        }
        var classAdvMultiplier = attacker.hasClassAdv ? 1.2 : 1.0;
        var defense = defender.def * (1 - attacker.ignoreDef / 100);
        var dmgVsDefWithCrit = (baseDamage + attacker.cDmg) * classAdvMultiplier - defense;
        var dmgVsDefNoCrit = baseDamage * classAdvMultiplier - defense;
        var effectivePierce = Math.min(attacker.pierce, 100);
        var pierceDecimal = effectivePierce / 100;
        var dmgPierceWithCrit = (baseDamage * pierceDecimal + attacker.cDmg) * classAdvMultiplier;
        var dmgPierceNoCrit = (baseDamage * pierceDecimal) * classAdvMultiplier;
        var part1DamageWithCrit = Math.max(dmgVsDefWithCrit, dmgPierceWithCrit);
        var part1DamageNoCrit = Math.max(dmgVsDefNoCrit, dmgPierceNoCrit);
        var usedPierceWithCrit = dmgPierceWithCrit > dmgVsDefWithCrit;
        var usedPierceNoCrit = dmgPierceNoCrit > dmgVsDefNoCrit;
        var usedPierce = usedPierceWithCrit; // Legacy: keep for backwards compatibility
        var pathVariesWithCrit = usedPierceWithCrit !== usedPierceNoCrit;
        var specialModifiersMultiplier = 1.0;
        var giantSlayerBonus = 0;
        if (attacker.giantSlayer && attacker.giantSlayer > 0 && !defender.isHero) {
            giantSlayerBonus = attacker.giantSlayer;
            specialModifiersMultiplier *= (1 + attacker.giantSlayer / 100);
        }
        if (modifiers.rangedDefense && modifiers.rangedDefense > 0) specialModifiersMultiplier *= (1 - modifiers.rangedDefense / 100);
        if (modifiers.wardingDefense && modifiers.wardingDefense > 0) specialModifiersMultiplier *= (1 - modifiers.wardingDefense / 100);
        if (modifiers.goblinSkin) specialModifiersMultiplier *= 0.90;
        if (modifiers.hidden) specialModifiersMultiplier *= 0.50;
        var talentsMultiplier = 1.0;
        if (talents.survivalInstincts) talentsMultiplier *= 0.90;
        if (talents.healthyDefender) talentsMultiplier *= 0.90;
        if (talents.cooperativeDefense) talentsMultiplier *= 0.95;
        if (talents.advancedCamouflage) talentsMultiplier *= 0.90;
        if (talents.vengefulResilience && talents.vengefulResilienceDeadAllies > 0)
            talentsMultiplier *= (1 - 0.05 * talents.vengefulResilienceDeadAllies);
        if (talents.defensiveCohesion && talents.defensiveCohesionAllies > 0)
            talentsMultiplier *= (1 - 0.05 * talents.defensiveCohesionAllies);
        if (talents.steadfastPresence) talentsMultiplier *= 0.95;
        if (talents.heroDefense) talentsMultiplier *= 0.97;
        if (talents.bossParry) talentsMultiplier *= 0.95;
        if (talents.giantsGuard) talentsMultiplier *= 0.95;
        if (talents.minionProtection) talentsMultiplier *= 0.80;
        if (talents.spreadOut) talentsMultiplier *= 0.90;
        if (talents.afflictionResistance) talentsMultiplier *= 0.75;
        if (talents.classBlock) talentsMultiplier *= 0.85;
        var highGroundEffect = modifiers.highGround ? 1.5 : 1.0;
        var oppositeClassAdv = defender.hasClassAdv ? 0.8 : 1.0;
        var allyProtectionMult = modifiers.allyProtection ? 0.5 : 1.0;
        var critRateDecimal = Math.min(attacker.cRate / 100, 1.0);
        var blockRateDecimal = Math.min(defender.bRate / 100, 1.0);
        var avgBlockReduction = defender.bDmg * blockRateDecimal;
        var shieldCount = modifiers.shieldCount || 0;
        var shieldPercent = modifiers.shieldPercent || 0;
        var shieldMultiplier = shieldPercent > 0 ? (1 - shieldPercent / 100) : 1.0;
        var preShieldDamageWithCrit = part1DamageWithCrit * specialModifiersMultiplier * talentsMultiplier * highGroundEffect;
        var preShieldDamageNoCrit = part1DamageNoCrit * specialModifiersMultiplier * talentsMultiplier * highGroundEffect;
        var preBlockDamageWithCrit_Shielded = preShieldDamageWithCrit * shieldMultiplier;
        var preBlockDamageNoCrit_Shielded = preShieldDamageNoCrit * shieldMultiplier;
        var preBlockDamageWithCrit_Unshielded = preShieldDamageWithCrit;
        var preBlockDamageNoCrit_Unshielded = preShieldDamageNoCrit;
        var preBlockDamageWithCrit = shieldCount > 0 ? preBlockDamageWithCrit_Shielded : preBlockDamageWithCrit_Unshielded;
        var preBlockDamageNoCrit = shieldCount > 0 ? preBlockDamageNoCrit_Shielded : preBlockDamageNoCrit_Unshielded;
        var avgDamageWithCrit_Shielded = Math.max(1, (preBlockDamageWithCrit_Shielded - avgBlockReduction) * oppositeClassAdv * allyProtectionMult);
        var avgDamageNoCrit_Shielded = Math.max(1, (preBlockDamageNoCrit_Shielded - avgBlockReduction) * oppositeClassAdv * allyProtectionMult);
        var expectedPerHit_Shielded = avgDamageWithCrit_Shielded * critRateDecimal + avgDamageNoCrit_Shielded * (1 - critRateDecimal);
        var avgDamageWithCrit_Unshielded = Math.max(1, (preBlockDamageWithCrit_Unshielded - avgBlockReduction) * oppositeClassAdv * allyProtectionMult);
        var avgDamageNoCrit_Unshielded = Math.max(1, (preBlockDamageNoCrit_Unshielded - avgBlockReduction) * oppositeClassAdv * allyProtectionMult);
        var expectedPerHit_Unshielded = avgDamageWithCrit_Unshielded * critRateDecimal + avgDamageNoCrit_Unshielded * (1 - critRateDecimal);
        var avgDamageWithCrit = shieldCount > 0 ? avgDamageWithCrit_Shielded : avgDamageWithCrit_Unshielded;
        var avgDamageNoCrit = shieldCount > 0 ? avgDamageNoCrit_Shielded : avgDamageNoCrit_Unshielded;
        var shieldedHits = shieldPercent > 0 ? Math.min(shieldCount, attacker.numHits) : 0;
        var unshieldedHits = attacker.numHits - shieldedHits;
        var expectedDamagePerHit = attacker.numHits === 1
            ? (shieldCount > 0 ? expectedPerHit_Shielded : expectedPerHit_Unshielded)
            : (expectedPerHit_Shielded * shieldedHits + expectedPerHit_Unshielded * unshieldedHits) / attacker.numHits;
        var minPerHit_Shielded = Math.max(1, (preBlockDamageNoCrit_Shielded * 0.8 - defender.bDmg) * oppositeClassAdv * allyProtectionMult);
        var minPerHit_Unshielded = Math.max(1, (preBlockDamageNoCrit_Unshielded * 0.8 - defender.bDmg) * oppositeClassAdv * allyProtectionMult);
        var maxPerHit_Shielded = Math.max(1, (preBlockDamageWithCrit_Shielded * 1.2) * oppositeClassAdv * allyProtectionMult);
        var maxPerHit_Unshielded = Math.max(1, (preBlockDamageWithCrit_Unshielded * 1.2) * oppositeClassAdv * allyProtectionMult);
        var minDamagePerHit = shieldCount > 0 ? minPerHit_Shielded : minPerHit_Unshielded;
        var maxDamagePerHit = shieldCount > 0 ? maxPerHit_Shielded : maxPerHit_Unshielded;
        var totalMinDamage = minPerHit_Shielded * shieldedHits + minPerHit_Unshielded * unshieldedHits;
        var totalExpectedDamage = expectedPerHit_Shielded * shieldedHits + expectedPerHit_Unshielded * unshieldedHits;
        var totalMaxDamage = maxPerHit_Shielded * shieldedHits + maxPerHit_Unshielded * unshieldedHits;
        var healPerTurn = 0;
        if (talents.hasHealSkill) {
            var healMultiplier = talents.healingWinds ? 1.3 * 1.05 : 1.3;
            healPerTurn = defender.hp * 0.5 * healMultiplier;
        }
        var canSustainIndefinitely = talents.hasHealSkill && healPerTurn >= totalExpectedDamage;
        var survives = defender.hp > totalExpectedDamage;
        var survivesWorstCase = defender.hp > totalMaxDamage;
        var hpRemaining = defender.hp - totalExpectedDamage;
        return {
            baseDamage: baseDamage, dmgVsDefWithCrit: dmgVsDefWithCrit, dmgVsDefNoCrit: dmgVsDefNoCrit,
            dmgPierceWithCrit: dmgPierceWithCrit, dmgPierceNoCrit: dmgPierceNoCrit,
            path: usedPierce ? 'Pierce' : 'Defense', usedPierce: usedPierce,
            pathWithCrit: usedPierceWithCrit ? 'Pierce' : 'Defense',
            pathNoCrit: usedPierceNoCrit ? 'Pierce' : 'Defense',
            pathVariesWithCrit: pathVariesWithCrit,
            specialModifiersMultiplier: specialModifiersMultiplier,
            expectedDamagePerHit: expectedDamagePerHit, minDamagePerHit: minDamagePerHit, maxDamagePerHit: maxDamagePerHit,
            totalMinDamage: totalMinDamage, totalExpectedDamage: totalExpectedDamage, totalMaxDamage: totalMaxDamage,
            healPerTurn: healPerTurn, canSustainIndefinitely: canSustainIndefinitely,
            survives: survives, survivesWorstCase: survivesWorstCase, hpRemaining: hpRemaining,
            offensiveTalentsMultiplier: offensiveTalentsMultiplier, classAdvMultiplier: classAdvMultiplier,
            defense: defense, talentsMultiplier: talentsMultiplier, highGroundEffect: highGroundEffect,
            oppositeClassAdv: oppositeClassAdv, allyProtectionMult: allyProtectionMult,
            preBlockDamageWithCrit: preBlockDamageWithCrit, preBlockDamageNoCrit: preBlockDamageNoCrit,
            avgBlockReduction: avgBlockReduction, critRateDecimal: critRateDecimal, blockRateDecimal: blockRateDecimal,
            part1DamageWithCrit: part1DamageWithCrit, part1DamageNoCrit: part1DamageNoCrit,
            avgDamageWithCrit: avgDamageWithCrit, avgDamageNoCrit: avgDamageNoCrit, effectivePierce: effectivePierce,
            shieldCount: shieldCount, shieldedHits: shieldedHits, unshieldedHits: unshieldedHits,
            shieldMultiplier: shieldMultiplier,
            expectedPerHit_Shielded: expectedPerHit_Shielded, expectedPerHit_Unshielded: expectedPerHit_Unshielded,
            minPerHit_Shielded: minPerHit_Shielded, minPerHit_Unshielded: minPerHit_Unshielded,
            maxPerHit_Shielded: maxPerHit_Shielded, maxPerHit_Unshielded: maxPerHit_Unshielded,
            preShieldDamageWithCrit: preShieldDamageWithCrit, preShieldDamageNoCrit: preShieldDamageNoCrit,
            giantSlayerBonus: giantSlayerBonus,
            inputs: { attacker: attacker, defender: defender, modifiers: modifiers, talents: talents, attackerTalents: attackerTalents }
        };
    }

    function formatNumber(num) { return Math.round(num).toLocaleString(); }

    var CalcEngine = {
        getClassAdvantage: getClassAdvantage,
        calculateEquipmentBonuses: calculateEquipmentBonuses,
        calculateDamage: calculateDamage,
        formatNumber: formatNumber
    };

    // Browser: export to window
    if (typeof window !== 'undefined') {
        window.CalcEngine = CalcEngine;
    }

    // Node.js/Jest: export via module.exports
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CalcEngine;
    }
})();