/**
 * Heroes & Dragons - Damage Calculator: Core Module
 * Part 2 of 3 - Load order: calculationEngine.js → DamageCalculator_Core.js → DamageCalculator_UI.js
 *
 * Configuration, UI helpers, hero data loading, and main UI building.
 * Exports: window.DamageCalcCore
 */
(function() {
    'use strict';

    var getClassAdvantage = window.CalcEngine.getClassAdvantage;
    var calculateEquipmentBonuses = window.CalcEngine.calculateEquipmentBonuses;
    var calculateDamage = window.CalcEngine.calculateDamage;
    var formatNumber = window.CalcEngine.formatNumber;

    // Callback for calculate() - set by UI module
    function triggerCalculate() {
        if (window.damageCalcCalculate) {
            window.damageCalcCalculate();
        }
    }

    // CONFIGURATION

    // Equipment set definitions
    var EQUIPMENT_SETS = {
        // Attacker sets
        cruel: {
            name: 'Cruel',
            slots: 1,
            bonus: { modifier: 'ignoreDef', value: 5, isPercent: true },
            description: '+5% Ignore DEF',
            side: 'attacker'
        },
        giantSlayer: {
            name: 'Giant Slayer',
            slots: 2,
            bonus: { modifier: 'giantSlayer', value: 25, isPercent: true },
            description: '+25% Damage vs Large Bosses',
            side: 'attacker'
        },
        // Defender sets
        rangedDefender: {
            name: 'Ranged Defender',
            slots: 1,
            bonus: { modifier: 'rangedDefense', value: 15, isPercent: true },
            description: '-15% Damage from non-adjacent positions',
            side: 'defender'
        },
        warding: {
            name: 'Warding',
            slots: 2,
            bonus: { modifier: 'wardingDefense', value: 20, isPercent: true },
            description: '-20% Damage from non-adjacent positions',
            side: 'defender'
        }
    };

    // Slot configuration
    var TOTAL_EQUIPMENT_SLOTS = 3;

    // Role category mapping (hero role -> category)
    var ROLE_CATEGORIES = {
        // Tank roles
        'Crusader': 'Tank',
        'Enforcer': 'Tank',
        'Protector': 'Tank',
        // Melee roles
        'Warrior': 'Melee',
        'Hunter': 'Melee',
        'Slayer': 'Melee',
        'Thief': 'Melee',
        // Ranged roles
        'Sharpshooter': 'Ranged',
        'Sorcerer': 'Ranged',
        'Duelist': 'Ranged',
        'Marksman': 'Ranged',
        // Support roles
        'Summoner': 'Support',
        'Healer': 'Support',
        'Wizard': 'Support',
        'Leader': 'Support'
    };

    // Role category options for dropdown
    var ROLE_CATEGORY_OPTIONS = [
        { value: 'Tank', label: 'Tank' },
        { value: 'Melee', label: 'Melee' },
        { value: 'Ranged', label: 'Ranged' },
        { value: 'Support', label: 'Support' }
    ];

    // Offensive talents that increase damage dealt (by role)
    // condition: 'none' = always active, 'input' = needs numeric input, 'checkbox' = needs condition met
    var OFFENSIVE_TALENTS = {
        Melee: [
            { id: 'flawlessExecution', name: 'Flawless Execution', effect: '+10%', value: 10, description: 'While this Hero has full HP, +10% Damage when attacking any target.', tier: 4, condition: 'checkbox', conditionId: 'attackerFullHp', conditionLabel: 'Attacker at full HP' },
            { id: 'engagedCombatant', name: 'Engaged Combatant', effect: '+10%', value: 10, description: 'While this hero is adjacent to 2 or more enemies, +10% Damage when attacking any target.', tier: 5, condition: 'checkbox', conditionId: 'adjacentToEnemies', conditionLabel: 'Adjacent to 2+ enemies' },
            { id: 'firstStone', name: 'First Stone', effect: '+10%', value: 10, description: "If the Hero didn't attack this round, +10% Damage when attacking enemies.", tier: 5, condition: 'checkbox', conditionId: 'firstAttack', conditionLabel: "Didn't attack this round" },
            { id: 'relentlessAttacker', name: 'Relentless Attacker', effect: '+10%', value: 10, description: '+10% Damage when this hero retaliates or acts as a result of another hero.', tier: 6, condition: 'checkbox', conditionId: 'isRetaliation', conditionLabel: 'Is retaliation/assist' },
            { id: 'loneSurvivor', name: 'Lone Survivor', effect: '+10%', value: 10, description: 'While there is exactly one enemy on the battlefield, +10% Damage when attacking any target.', tier: 10, condition: 'checkbox', conditionId: 'oneEnemy', conditionLabel: 'Exactly 1 enemy' },
            { id: 'standAgainstMany', name: 'Stand Against Many', effect: '+5%', value: 5, description: 'While there are 4 or more allies on the battlefield, +5% Damage when attacking any target.', tier: 10, condition: 'threshold', conditionId: 'attackerLiveAllies', threshold: 4 },
            { id: 'shieldedVigor', name: 'Shielded Vigor', effect: '+5%', value: 5, description: 'While this hero has a shield, +5% Damage when attacking any target.', tier: 11, condition: 'checkbox', conditionId: 'attackerHasShield', conditionLabel: 'Attacker has shield' },
            { id: 'lastOneStanding', name: 'Last One Standing', effect: '+10%', value: 10, description: 'While this is the only living ally, +10% Damage when attacking any target.', tier: 11, condition: 'checkbox', conditionId: 'onlyAlly', conditionLabel: 'Only living ally' },
            { id: 'herosWrath', name: "Hero's Wrath", effect: '+3%', value: 3, description: '+3% Damage when attacking other heroes.', tier: 12, condition: 'targetType', targetType: 'hero' },
            { id: 'kingslayer', name: 'Kingslayer', effect: '+5%', value: 5, description: '+5% Damage when attacking regular-sized bosses.', tier: 12, condition: 'targetType', targetType: 'regularBoss' },
            { id: 'theBiggerTheyAre', name: 'The Bigger They Are...', effect: '+5%', value: 5, description: '+5% Damage when attacking large-sized bosses.', tier: 12, condition: 'targetType', targetType: 'largeBoss' },
            { id: 'exterminator', name: 'Exterminator', effect: '+20%', value: 20, description: '+20% Damage when attacking Minions (summoned creatures).', tier: 12, condition: 'targetType', targetType: 'minion' },
            { id: 'tacticalSynergy', name: 'Tactical Synergy', effect: '+5%/ally', value: 5, description: '+5% Damage per each live ally to a max of 7 allies.', tier: 17, condition: 'perAlly', conditionId: 'attackerLiveAllies', maxAllies: 7 },
            { id: 'exploitVulnerability', name: 'Exploit Vulnerability', effect: '+15%', value: 15, description: '+15% Damage inflicted when attacking with class advantage.', tier: 17, condition: 'classAdvantage' },
            { id: 'empoweringEnvy', name: 'Empowering Envy', effect: '+5%', value: 5, description: '+5% Damage when attacking enemies with higher max HP.', tier: 17, condition: 'checkbox', conditionId: 'targetHigherHp', conditionLabel: 'Target has higher Max HP' }
        ],
        Ranged: [
            { id: 'flawlessExecution', name: 'Flawless Execution', effect: '+10%', value: 10, description: 'While this Hero has full HP, +10% Damage when attacking any target.', tier: 4, condition: 'checkbox', conditionId: 'attackerFullHp', conditionLabel: 'Attacker at full HP' },
            { id: 'desperateStrikes', name: 'Desperate Strikes', effect: '+10%', value: 10, description: 'While this Hero has below 33% HP, +10% Damage when attacking any target.', tier: 4, condition: 'checkbox', conditionId: 'attackerLowHp33', conditionLabel: 'Attacker below 33% HP' },
            { id: 'loneWolf', name: 'Lone Wolf', effect: '+10%', value: 10, description: 'While this hero is not adjacent to any character, +10% Damage when attacking any target.', tier: 5, condition: 'checkbox', conditionId: 'notAdjacent', conditionLabel: 'Not adjacent to anyone' },
            { id: 'firstStone', name: 'First Stone', effect: '+10%', value: 10, description: "If the Hero didn't attack this round, +10% Damage when attacking enemies.", tier: 5, condition: 'checkbox', conditionId: 'firstAttack', conditionLabel: "Didn't attack this round" },
            { id: 'relentlessAttacker', name: 'Relentless Attacker', effect: '+10%', value: 10, description: '+10% Damage when this hero retaliates or acts as a result of another hero.', tier: 6, condition: 'checkbox', conditionId: 'isRetaliation', conditionLabel: 'Is retaliation/assist' },
            { id: 'loneSurvivor', name: 'Lone Survivor', effect: '+10%', value: 10, description: 'While there is exactly one enemy on the battlefield, +10% Damage when attacking any target.', tier: 10, condition: 'checkbox', conditionId: 'oneEnemy', conditionLabel: 'Exactly 1 enemy' },
            { id: 'standAgainstMany', name: 'Stand Against Many', effect: '+5%', value: 5, description: 'While there are 4 or more allies on the battlefield, +5% Damage when attacking any target.', tier: 10, condition: 'threshold', conditionId: 'attackerLiveAllies', threshold: 4 },
            { id: 'expertAim', name: 'Expert Aim', effect: '+10%', value: 10, description: '+10% Damage when attacking an enemy with a shield.', tier: 11, condition: 'checkbox', conditionId: 'targetHasShield', conditionLabel: 'Target has shield' },
            { id: 'lastOneStanding', name: 'Last One Standing', effect: '+10%', value: 10, description: 'While this is the only living ally, +10% Damage when attacking any target.', tier: 11, condition: 'checkbox', conditionId: 'onlyAlly', conditionLabel: 'Only living ally' },
            { id: 'herosWrath', name: "Hero's Wrath", effect: '+3%', value: 3, description: '+3% Damage when attacking other heroes.', tier: 12, condition: 'targetType', targetType: 'hero' },
            { id: 'kingslayer', name: 'Kingslayer', effect: '+5%', value: 5, description: '+5% Damage when attacking regular-sized bosses.', tier: 12, condition: 'targetType', targetType: 'regularBoss' },
            { id: 'theBiggerTheyAre', name: 'The Bigger They Are...', effect: '+5%', value: 5, description: '+5% Damage when attacking large-sized bosses.', tier: 12, condition: 'targetType', targetType: 'largeBoss' },
            { id: 'exterminator', name: 'Exterminator', effect: '+20%', value: 20, description: '+20% Damage when attacking Minions (summoned creatures).', tier: 12, condition: 'targetType', targetType: 'minion' },
            { id: 'tacticalSynergy', name: 'Tactical Synergy', effect: '+5%/ally', value: 5, description: '+5% Damage per each live ally to a max of 7 allies.', tier: 17, condition: 'perAlly', conditionId: 'attackerLiveAllies', maxAllies: 7 },
            { id: 'exploitVulnerability', name: 'Exploit Vulnerability', effect: '+15%', value: 15, description: '+15% Damage inflicted when attacking with class advantage.', tier: 17, condition: 'classAdvantage' },
            { id: 'empoweringEnvy', name: 'Empowering Envy', effect: '+5%', value: 5, description: '+5% Damage when attacking enemies with higher max HP.', tier: 17, condition: 'checkbox', conditionId: 'targetHigherHp', conditionLabel: 'Target has higher Max HP' }
        ],
        Tank: [
            { id: 'desperateStrength', name: 'Desperate Strength', effect: '+25%', value: 25, description: 'While this Hero has below 25% HP, +25% Damage when attacking any target.', tier: 4, condition: 'checkbox', conditionId: 'attackerLowHp25', conditionLabel: 'Attacker below 25% HP' },
            { id: 'engagedCombatant', name: 'Engaged Combatant', effect: '+10%', value: 10, description: 'While this hero is adjacent to 2 or more enemies, +10% Damage when attacking any target.', tier: 5, condition: 'checkbox', conditionId: 'adjacentToEnemies', conditionLabel: 'Adjacent to 2+ enemies' },
            { id: 'relentlessAttacker', name: 'Relentless Attacker', effect: '+10%', value: 10, description: '+10% Damage when this hero retaliates or acts as a result of another hero.', tier: 6, condition: 'checkbox', conditionId: 'isRetaliation', conditionLabel: 'Is retaliation/assist' },
            { id: 'unbrokenAssault', name: 'Unbroken Assault', effect: '+5%', value: 5, description: 'While this hero does not have any Debuffs, +5% Damage when attacking any target.', tier: 8, condition: 'checkbox', conditionId: 'noDebuffs', conditionLabel: 'No debuffs on attacker' },
            { id: 'healthyAdvantage', name: 'Healthy Advantage', effect: '+10%', value: 10, description: 'While this Hero has full HP, +10% Damage when attacking any target.', tier: 9, condition: 'checkbox', conditionId: 'attackerFullHp', conditionLabel: 'Attacker at full HP' },
            { id: 'loneSurvivor', name: 'Lone Survivor', effect: '+10%', value: 10, description: 'While there is exactly one enemy on the battlefield, +10% Damage when attacking any target.', tier: 10, condition: 'checkbox', conditionId: 'oneEnemy', conditionLabel: 'Exactly 1 enemy' },
            { id: 'expertAim', name: 'Expert Aim', effect: '+10%', value: 10, description: '+10% Damage when attacking an enemy with a shield.', tier: 11, condition: 'checkbox', conditionId: 'targetHasShield', conditionLabel: 'Target has shield' },
            { id: 'lastOneStanding', name: 'Last One Standing', effect: '+10%', value: 10, description: 'While this is the only living ally, +10% Damage when attacking any target.', tier: 11, condition: 'checkbox', conditionId: 'onlyAlly', conditionLabel: 'Only living ally' },
            { id: 'tacticalSynergy', name: 'Tactical Synergy', effect: '+5%/ally', value: 5, description: '+5% Damage per each live ally to a max of 7 allies.', tier: 17, condition: 'perAlly', conditionId: 'attackerLiveAllies', maxAllies: 7 },
            { id: 'exploitVulnerability', name: 'Exploit Vulnerability', effect: '+15%', value: 15, description: '+15% Damage inflicted when attacking with class advantage.', tier: 17, condition: 'classAdvantage' }
        ],
        Support: [
            { id: 'engagedCombatant', name: 'Engaged Combatant', effect: '+10%', value: 10, description: 'While this hero is adjacent to 2 or more enemies, +10% Damage when attacking any target.', tier: 5, condition: 'checkbox', conditionId: 'adjacentToEnemies', conditionLabel: 'Adjacent to 2+ enemies' },
            { id: 'unbrokenAssault', name: 'Unbroken Assault', effect: '+5%', value: 5, description: 'While this hero does not have any Debuffs, +5% Damage when attacking any target.', tier: 8, condition: 'checkbox', conditionId: 'noDebuffs', conditionLabel: 'No debuffs on attacker' },
            { id: 'healthyAdvantage', name: 'Healthy Advantage', effect: '+10%', value: 10, description: 'While this Hero has full HP, +10% Damage when attacking any target.', tier: 9, condition: 'checkbox', conditionId: 'attackerFullHp', conditionLabel: 'Attacker at full HP' },
            { id: 'loneSurvivor', name: 'Lone Survivor', effect: '+10%', value: 10, description: 'While there is exactly one enemy on the battlefield, +10% Damage when attacking any target.', tier: 10, condition: 'checkbox', conditionId: 'oneEnemy', conditionLabel: 'Exactly 1 enemy' },
            { id: 'expertAim', name: 'Expert Aim', effect: '+10%', value: 10, description: '+10% Damage when attacking an enemy with a shield.', tier: 11, condition: 'checkbox', conditionId: 'targetHasShield', conditionLabel: 'Target has shield' },
            { id: 'lastOneStanding', name: 'Last One Standing', effect: '+10%', value: 10, description: 'While this is the only living ally, +10% Damage when attacking any target.', tier: 11, condition: 'checkbox', conditionId: 'onlyAlly', conditionLabel: 'Only living ally' },
            { id: 'exploitVulnerability', name: 'Exploit Vulnerability', effect: '+15%', value: 15, description: '+15% Damage inflicted when attacking with class advantage.', tier: 17, condition: 'classAdvantage' }
        ]
    };

    // Defensive talents that reduce damage received (by role)
    // condition: 'none' = always active, 'perAlly/perDead' = scales with count, 'checkbox' = needs condition met, 'attackerType' = depends on attacker type
    var DEFENSIVE_TALENTS = {
        Melee: [
            { id: 'spreadOut', name: 'Spread Out', effect: '-10%', value: 10, description: '-10% Damage received by indirect attacks (AOE / Chain / Mass and others).', tier: 3, condition: 'attackType', attackType: 'indirect' },
            { id: 'afflictionResistance', name: 'Affliction Resistance', effect: '-25%', value: 25, description: '-25% Damage received by statuses such as Burn, Poison, Toxicated or Bleeding.', tier: 5, condition: 'attackType', attackType: 'status' },
            { id: 'steadfastPresence', name: 'Steadfast Presence', effect: '-5%', value: 5, description: 'While there are 3 or more allies on the battlefield, -5% Damage received when attacked by any actor.', tier: 6, condition: 'threshold', conditionId: 'defenderLiveAllies', threshold: 3 },
            { id: 'vengefulResilience', name: 'Vengeful Resilience', effect: '-5%/dead', value: 5, description: '-5% Damage received per each dead ally (Summoned minions not included).', tier: 6, condition: 'perDead', conditionId: 'defenderDeadAllies', maxAllies: 7 },
            { id: 'cooperativeDefense', name: 'Cooperative Defense', effect: '-5%', value: 5, description: 'While this hero is adjacent to 1 or more allies, -5% Damage received when attacked by any actor.', tier: 11, condition: 'checkbox', conditionId: 'adjacentToAllies', conditionLabel: 'Adjacent to 1+ allies' },
            { id: 'defensiveCohesion', name: 'Defensive Cohesion', effect: '-5%/ally', value: 5, description: '-5% Damage received per each live ally to a max of 7 allies.', tier: 17, condition: 'perAlly', conditionId: 'defenderLiveAllies', maxAllies: 7 }
        ],
        Ranged: [
            { id: 'spreadOut', name: 'Spread Out', effect: '-10%', value: 10, description: '-10% Damage received by indirect attacks (AOE / Chain / Mass and others).', tier: 3, condition: 'attackType', attackType: 'indirect' },
            { id: 'afflictionResistance', name: 'Affliction Resistance', effect: '-25%', value: 25, description: '-25% Damage received by statuses such as Burn, Poison, Toxicated or Bleeding.', tier: 5, condition: 'attackType', attackType: 'status' },
            { id: 'steadfastPresence', name: 'Steadfast Presence', effect: '-5%', value: 5, description: 'While there are 3 or more allies on the battlefield, -5% Damage received when attacked by any actor.', tier: 6, condition: 'threshold', conditionId: 'defenderLiveAllies', threshold: 3 },
            { id: 'vengefulResilience', name: 'Vengeful Resilience', effect: '-5%/dead', value: 5, description: '-5% Damage received per each dead ally (Summoned minions not included).', tier: 6, condition: 'perDead', conditionId: 'defenderDeadAllies', maxAllies: 7 },
            { id: 'advancedCamouflage', name: 'Advanced Camouflage', effect: '-10%', value: 10, description: 'While this hero has Hidden, -10% Damage modifier received by attacks from non-adjacent positions.', tier: 8, condition: 'checkbox', conditionId: 'hasHiddenNonAdjacent', conditionLabel: 'Has Hidden + non-adjacent attack' },
            { id: 'cooperativeDefense', name: 'Cooperative Defense', effect: '-5%', value: 5, description: 'While this hero is adjacent to 1 or more allies, -5% Damage received when attacked by any actor.', tier: 11, condition: 'checkbox', conditionId: 'adjacentToAllies', conditionLabel: 'Adjacent to 1+ allies' },
            { id: 'defensiveCohesion', name: 'Defensive Cohesion', effect: '-5%/ally', value: 5, description: '-5% Damage received per each live ally to a max of 7 allies.', tier: 17, condition: 'perAlly', conditionId: 'defenderLiveAllies', maxAllies: 7 }
        ],
        Tank: [
            { id: 'spreadOut', name: 'Spread Out', effect: '-10%', value: 10, description: '-10% Damage received by indirect attacks (AOE / Chain / Mass and others).', tier: 3, condition: 'attackType', attackType: 'indirect' },
            { id: 'survivalInstincts', name: 'Survival Instincts', effect: '-10%', value: 10, description: 'While this Hero has below 33% HP, -10% Damage received when attacked by any actor.', tier: 4, condition: 'checkbox', conditionId: 'defenderLowHp33', conditionLabel: 'Defender below 33% HP' },
            { id: 'afflictionResistance', name: 'Affliction Resistance', effect: '-25%', value: 25, description: '-25% Damage received by statuses such as Burn, Poison, Toxicated or Bleeding.', tier: 5, condition: 'attackType', attackType: 'status' },
            { id: 'healthyDefender', name: 'Healthy Defender', effect: '-10%', value: 10, description: 'While this Hero has full HP, -10% Damage received when attacked by any actor.', tier: 5, condition: 'checkbox', conditionId: 'defenderFullHp', conditionLabel: 'Defender at full HP' },
            { id: 'steadfastPresence', name: 'Steadfast Presence', effect: '-5%', value: 5, description: 'While there are 3 or more allies on the battlefield, -5% Damage received when attacked by any actor.', tier: 6, condition: 'threshold', conditionId: 'defenderLiveAllies', threshold: 3 },
            { id: 'vengefulResilience', name: 'Vengeful Resilience', effect: '-5%/dead', value: 5, description: '-5% Damage received per each dead ally (Summoned minions not included).', tier: 6, condition: 'perDead', conditionId: 'defenderDeadAllies', maxAllies: 7 },
            { id: 'cooperativeDefense', name: 'Cooperative Defense', effect: '-5%', value: 5, description: 'While this hero is adjacent to 1 or more allies, -5% Damage received when attacked by any actor.', tier: 11, condition: 'checkbox', conditionId: 'adjacentToAllies', conditionLabel: 'Adjacent to 1+ allies' },
            { id: 'heroDefense', name: 'Hero Defense', effect: '-3%', value: 3, description: '-3% Damage received when attacked by other heroes.', tier: 12, condition: 'attackerType', attackerType: 'hero' },
            { id: 'bossParry', name: 'Boss Parry', effect: '-5%', value: 5, description: '-5% Damage received when attacked by regular-sized bosses.', tier: 12, condition: 'attackerType', attackerType: 'regularBoss' },
            { id: 'giantsGuard', name: "Giant's Guard", effect: '-5%', value: 5, description: '-5% Damage received when attacked by large-sized bosses.', tier: 12, condition: 'attackerType', attackerType: 'largeBoss' },
            { id: 'minionProtection', name: 'Minion Protection', effect: '-20%', value: 20, description: '-20% Damage received when attacked by Minions (summoned creatures).', tier: 12, condition: 'attackerType', attackerType: 'minion' },
            { id: 'classBlock', name: 'Class Block', effect: '-15%', value: 15, description: '-15% Damage received when attacked by an enemy with a class advantage.', tier: 17, condition: 'classDisadvantage' }
        ],
        Support: [
            { id: 'spreadOut', name: 'Spread Out', effect: '-10%', value: 10, description: '-10% Damage received by indirect attacks (AOE / Chain / Mass and others).', tier: 3, condition: 'attackType', attackType: 'indirect' },
            { id: 'survivalInstincts', name: 'Survival Instincts', effect: '-10%', value: 10, description: 'While this Hero has below 33% HP, -10% Damage received when attacked by any actor.', tier: 4, condition: 'checkbox', conditionId: 'defenderLowHp33', conditionLabel: 'Defender below 33% HP' },
            { id: 'afflictionResistance', name: 'Affliction Resistance', effect: '-25%', value: 25, description: '-25% Damage received by statuses such as Burn, Poison, Toxicated or Bleeding.', tier: 5, condition: 'attackType', attackType: 'status' },
            { id: 'healthyDefender', name: 'Healthy Defender', effect: '-10%', value: 10, description: 'While this Hero has full HP, -10% Damage received when attacked by any actor.', tier: 5, condition: 'checkbox', conditionId: 'defenderFullHp', conditionLabel: 'Defender at full HP' },
            { id: 'steadfastPresence', name: 'Steadfast Presence', effect: '-5%', value: 5, description: 'While there are 3 or more allies on the battlefield, -5% Damage received when attacked by any actor.', tier: 6, condition: 'threshold', conditionId: 'defenderLiveAllies', threshold: 3 },
            { id: 'vengefulResilience', name: 'Vengeful Resilience', effect: '-5%/dead', value: 5, description: '-5% Damage received per each dead ally (Summoned minions not included).', tier: 6, condition: 'perDead', conditionId: 'defenderDeadAllies', maxAllies: 7 },
            { id: 'cooperativeDefense', name: 'Cooperative Defense', effect: '-5%', value: 5, description: 'While this hero is adjacent to 1 or more allies, -5% Damage received when attacked by any actor.', tier: 11, condition: 'checkbox', conditionId: 'adjacentToAllies', conditionLabel: 'Adjacent to 1+ allies' },
            { id: 'heroDefense', name: 'Hero Defense', effect: '-3%', value: 3, description: '-3% Damage received when attacked by other heroes.', tier: 12, condition: 'attackerType', attackerType: 'hero' },
            { id: 'bossParry', name: 'Boss Parry', effect: '-5%', value: 5, description: '-5% Damage received when attacked by regular-sized bosses.', tier: 12, condition: 'attackerType', attackerType: 'regularBoss' },
            { id: 'giantsGuard', name: "Giant's Guard", effect: '-5%', value: 5, description: '-5% Damage received when attacked by large-sized bosses.', tier: 12, condition: 'attackerType', attackerType: 'largeBoss' },
            { id: 'minionProtection', name: 'Minion Protection', effect: '-20%', value: 20, description: '-20% Damage received when attacked by Minions (summoned creatures).', tier: 12, condition: 'attackerType', attackerType: 'minion' },
            { id: 'classBlock', name: 'Class Block', effect: '-15%', value: 15, description: '-15% Damage received when attacked by an enemy with a class advantage.', tier: 17, condition: 'classDisadvantage' }
        ]
    };

    // Target type options for attacker talents
    var TARGET_TYPE_OPTIONS = [
        { value: 'hero', label: 'Hero' },
        { value: 'regularBoss', label: 'Regular Boss' },
        { value: 'largeBoss', label: 'Large Boss' },
        { value: 'minion', label: 'Minion' }
    ];

    // Attack type options for defender talents
    var ATTACK_TYPE_OPTIONS = [
        { value: 'direct', label: 'Direct Attack' },
        { value: 'indirect', label: 'Indirect (AOE/Chain)' },
        { value: 'status', label: 'Status Damage (Burn/Poison)' }
    ];

    // Buff/Debuff configuration for data-driven UI generation
    // exclusiveGroup: items with same group are mutually exclusive; no group = stacks with all
    var ATTACKER_BUFF_SECTIONS = [
        { header: 'Attack', items: [
            { id: 'buff-increaseATK', icon: 'increase_attack', label: 'Increase ATK', effect: '+20%', exclusiveGroup: 'atk-buff', desc: 'Increases Attack by 20%' },
            { id: 'buff-ultraATK', icon: 'ultra_attack', label: 'Ultra ATK', effect: '+60%', exclusiveGroup: 'atk-buff', desc: 'Increases Attack by 60%' },
            { id: 'debuff-decreaseATK', icon: 'decrease_attack', label: 'Decrease ATK', effect: '-20%', exclusiveGroup: 'atk-debuff', desc: 'Decreases Attack by 20%' },
            { id: 'debuff-shatteredATK', icon: 'shattered_attack', label: 'Shattered ATK', effect: '-60%', exclusiveGroup: 'atk-debuff', desc: 'Decreases Attack by 60%' }
        ]},
        { header: 'Critical Damage', items: [
            { id: 'buff-increaseCDMG', icon: 'increase_cdmg', label: 'Increase C.DMG', effect: '+40%', exclusiveGroup: 'cdmg-buff', desc: 'Increases Critical Damage by 40%' },
            { id: 'buff-ultraCDMG', icon: 'ultra_cdmg', label: 'Ultra C.DMG', effect: '+100%', exclusiveGroup: 'cdmg-buff', desc: 'Increases Critical Damage by 100%' }
        ]},
        { header: 'Critical Rate', items: [
            { id: 'buff-increaseCRATE', icon: 'increase_crate', label: 'Increase C.RATE', effect: '+30%', exclusiveGroup: 'crate-buff', desc: 'Increases Critical Rate by 30%' },
            { id: 'buff-ultraCRATE', icon: 'ultra_crate', label: 'Ultra C.RATE', effect: '+85%', exclusiveGroup: 'crate-buff', desc: 'Increases Critical Rate by 85%' },
            { id: 'buff-maxCRATE', icon: 'max_crate', label: 'Max C.RATE', effect: '100%', exclusiveGroup: 'crate-buff', desc: 'Sets Critical Rate to 100%' }
        ]}
    ];

    var DEFENDER_BUFF_SECTIONS = [
        { header: 'Defense', items: [
            { id: 'defender-buff-increaseDEF', icon: 'increase_def', label: 'Increase DEF', effect: '+30%', exclusiveGroup: 'def-buff', desc: 'Increases Defense by 30%' },
            { id: 'defender-buff-ultraDEF', icon: 'ultra_def', label: 'Ultra DEF', effect: '+80%', exclusiveGroup: 'def-buff', desc: 'Increases Defense by 80%' },
            { id: 'defender-debuff-decreaseDEF', icon: 'decrease_def', label: 'Decrease DEF', effect: '-25%', exclusiveGroup: 'def-debuff', desc: 'Decreases Defense by 25%' },
            { id: 'defender-debuff-shatteredDEF', icon: 'shattered_defense', label: 'Shattered DEF', effect: '-75%', exclusiveGroup: 'def-debuff', desc: 'Decreases Defense by 75%' },
            { id: 'defender-debuff-chilled', icon: 'chilled', label: 'Chilled', effect: '-25%', exclusiveGroup: 'cold-debuff', desc: 'Decreases Defense by 25% (stacks with DEF debuffs)' },
            { id: 'defender-debuff-frozen', icon: 'frozen', label: 'Frozen', effect: '-25%', exclusiveGroup: 'cold-debuff', desc: 'Decreases Defense by 25% (stacks with DEF debuffs)' }
        ]},
        { header: 'Block Damage', items: [
            { id: 'defender-buff-increaseBDMG', icon: 'increase_bdmg', label: 'Increase B.DMG', effect: '+40%', exclusiveGroup: 'bdmg-buff', desc: 'Increases Block Damage by 40%' },
            { id: 'defender-buff-ultraBDMG', icon: 'ultra_bdmg', label: 'Ultra B.DMG', effect: '+75%', exclusiveGroup: 'bdmg-buff', desc: 'Increases Block Damage by 75%' },
            { id: 'defender-debuff-decreaseBDMG', icon: 'decrease_bdmg', label: 'Decrease B.DMG', effect: '-30%', exclusiveGroup: 'bdmg-debuff', desc: 'Decreases Block Damage by 30%' }
        ]},
        { header: 'Block Rate', items: [
            { id: 'defender-buff-increaseBRATE', icon: 'increase_brate', label: 'Increase B.RATE', effect: '+30%', exclusiveGroup: 'brate-buff', desc: 'Increases Block Rate by 30%' },
            { id: 'defender-buff-ultraBRATE', icon: 'ultra_brate', label: 'Ultra B.RATE', effect: '+85%', exclusiveGroup: 'brate-buff', desc: 'Increases Block Rate by 85%' },
            { id: 'defender-buff-maxBRATE', icon: 'max_brate', label: 'Max B.RATE', effect: '100%', exclusiveGroup: 'brate-buff', desc: 'Sets Block Rate to 100%' },
            { id: 'defender-debuff-decreaseBRATE', icon: 'decrease_brate', label: 'Decrease B.RATE', effect: '-30%', exclusiveGroup: 'brate-debuff', desc: 'Decreases Block Rate by 30%' },
            { id: 'defender-debuff-shatteredBRATE', icon: 'shattered_brate', label: 'Shattered B.RATE', effect: '-85%', exclusiveGroup: 'brate-debuff', desc: 'Decreases Block Rate by 85%' },
            { id: 'defender-debuff-noBRATE', icon: 'no_brate', label: 'No B.RATE', effect: '0%', exclusiveGroup: 'brate-debuff', desc: 'Sets Block Rate to 0%' },
            { id: 'defender-debuff-stun', icon: 'stun', label: 'Stun', effect: '-25%', desc: 'Decreases Block Rate by 25% (stacks with B.RATE debuffs)' },
            { id: 'defender-debuff-paralyzed', icon: 'paralyzed', label: 'Paralyzed', effect: '0%', desc: 'Sets Block Rate to 0% (stacks with B.RATE debuffs)' }
        ]},
        { header: 'Damage Reduction', items: [
            { id: 'defender-buff-hidden', icon: 'hidden', label: 'Hidden', effect: '-50%', desc: 'Reduces damage taken by 50% from non-adjacent attackers' },
            { id: 'defender-buff-allyProtection', icon: 'ally_protection', label: 'Ally Protection', effect: '-50%', desc: 'Reduces damage taken by 50% when protected by an ally' }
        ]}
    ];

    // Stat row configuration for data-driven UI generation
    var ATTACKER_STATS = [
        { id: 'hp', label: 'HP', hasBonus: false, isPercent: false },
        { id: 'atk', label: 'Attack', hasBonus: true, isPercent: false },
        { id: 'def', label: 'Defense', hasBonus: false, isPercent: false },
        { id: 'pierce', label: 'Pierce', hasBonus: true, isPercent: true },
        { id: 'walkRange', label: 'Walk Range', hasBonus: false, isPercent: false },
        { id: 'skillRange', label: 'Skill Range', hasBonus: false, isPercent: false },
        { id: 'cDmg', label: 'C. Damage', hasBonus: true, isPercent: false },
        { id: 'cRate', label: 'C. Rate', hasBonus: true, isPercent: true },
        { id: 'bDmg', label: 'B. Damage', hasBonus: false, isPercent: false },
        { id: 'bRate', label: 'B. Rate', hasBonus: false, isPercent: true },
        { id: 'shield', label: 'Shield%', hasBonus: false, isPercent: true }
    ];

    var DEFENDER_STATS = [
        { id: 'hp', label: 'HP', hasBonus: true, isPercent: false },
        { id: 'atk', label: 'Attack', hasBonus: false, isPercent: false },
        { id: 'def', label: 'Defense', hasBonus: true, isPercent: false },
        { id: 'pierce', label: 'Pierce', hasBonus: false, isPercent: true },
        { id: 'walkRange', label: 'Walk Range', hasBonus: false, isPercent: false },
        { id: 'skillRange', label: 'Skill Range', hasBonus: false, isPercent: false },
        { id: 'cDmg', label: 'C. Damage', hasBonus: false, isPercent: false },
        { id: 'cRate', label: 'C. Rate', hasBonus: false, isPercent: true },
        { id: 'bDmg', label: 'B. Damage', hasBonus: true, isPercent: false },
        { id: 'bRate', label: 'B. Rate', hasBonus: true, isPercent: true },
        { id: 'shield', label: 'Shield%', hasBonus: true, isPercent: true }
    ];

    // Hero data will be loaded here
    var heroData = {};

    // ============================================
    // DAMAGE CALCULATION
    // ============================================
    // NOTE: calculateDamage() and other calculation functions are defined
    // above in the CALCULATION ENGINE section.

    // ============================================
    // EQUIPMENT SET BONUSES
    // ============================================

    /**
     * Calculate modifiers from active equipment sets (with quantities)
     * Returns object with modifier bonuses (ignoreDef%, giantSlayer%, etc.)
     * @param {string} side - 'attacker' or 'defender'
     */
    function calculateSetBonuses(side) {
        var modifiers = {
            ignoreDef: 0,
            giantSlayer: 0,
            rangedDefense: 0,
            wardingDefense: 0
        };

        // Sum up bonuses from each equipped set
        Object.keys(EQUIPMENT_SETS).forEach(function(setKey) {
            var set = EQUIPMENT_SETS[setKey];

            // Only process sets for this side
            if (set.side !== side) return;

            var dropdown = document.getElementById(side + '-set-' + setKey);
            if (!dropdown) return;

            var quantity = parseInt(dropdown.value) || 0;
            if (quantity > 0) {
                var modifier = set.bonus.modifier;
                modifiers[modifier] += set.bonus.value * quantity;  // multiply by quantity
            }
        });

        return modifiers;
    }

    /**
     * Calculate total slots used for equipment sets
     * @param {string} side - 'attacker' or 'defender'
     * @returns {number} Total slots used
     */
    function calculateSlotsUsed(side) {
        var totalSlots = 0;

        Object.keys(EQUIPMENT_SETS).forEach(function(setKey) {
            var set = EQUIPMENT_SETS[setKey];
            if (set.side !== side) return;

            var dropdown = document.getElementById(side + '-set-' + setKey);
            if (!dropdown) return;

            var quantity = parseInt(dropdown.value) || 0;
            totalSlots += set.slots * quantity;
        });

        return totalSlots;
    }

    /**
     * Update slot indicator UI and dropdown options
     * @param {string} side - 'attacker' or 'defender'
     */
    function updateEquipmentSlots(side) {
        var usedSlots = calculateSlotsUsed(side);
        var remainingSlots = TOTAL_EQUIPMENT_SLOTS - usedSlots;

        // Update slot indicator
        var slotIndicator = document.getElementById(side + '-slot-indicator');
        if (slotIndicator) {
            var html = '';
            for (var i = 0; i < TOTAL_EQUIPMENT_SLOTS; i++) {
                html += '<span class="calc-slot ' + (i < usedSlots ? 'calc-slot-filled' : 'calc-slot-empty') + '"></span>';
            }
            html += '<span class="calc-slot-counter">' + usedSlots + '/' + TOTAL_EQUIPMENT_SLOTS + '</span>';
            slotIndicator.innerHTML = html;
        }

        // Update dropdown options based on remaining slots
        Object.keys(EQUIPMENT_SETS).forEach(function(setKey) {
            var set = EQUIPMENT_SETS[setKey];
            if (set.side !== side) return;

            var dropdown = document.getElementById(side + '-set-' + setKey);
            if (!dropdown) return;

            var currentQty = parseInt(dropdown.value) || 0;

            // Calculate max possible: current quantity + (remaining slots / slot cost)
            var slotsFreedIfRemoved = set.slots * currentQty;
            var totalAvailableSlots = remainingSlots + slotsFreedIfRemoved;
            var maxPossible = Math.floor(totalAvailableSlots / set.slots);

            // Rebuild dropdown options
            var previousValue = dropdown.value;
            dropdown.innerHTML = '';
            for (var i = 0; i <= maxPossible; i++) {
                var option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                dropdown.appendChild(option);
            }

            // Restore previous value if still valid
            if (parseInt(previousValue) <= maxPossible) {
                dropdown.value = previousValue;
            }

            // Update effect display
            var effectSpan = document.getElementById(side + '-effect-' + setKey);
            if (effectSpan) {
                var totalBonus = set.bonus.value * currentQty;
                var effectText = totalBonus > 0 ? '+' + totalBonus + '%' : '0%';
                effectSpan.textContent = effectText;
            }
        });
    }

    // ============================================
    // UI HELPERS
    // ============================================

    // formatNumber is provided by calculationEngine.js

    /**
     * Create clickable buff/debuff icon button with mutual exclusivity
     * @param {string} id - Button ID
     * @param {string} iconName - Icon filename (e.g., "increase_attack")
     * @param {string} label - Display label
     * @param {string} effectText - Effect description (e.g., "+20%")
     * @param {Array<string>} exclusiveGroup - IDs that are mutually exclusive
     */
    function createBuffIcon(id, iconName, label, effectText, exclusiveGroup, description) {
        var wrapper = document.createElement('div');
        wrapper.className = 'calc-buff-icon-wrapper';

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'calc-buff-icon';
        button.id = id;
        button.dataset.active = 'false';

        // Construct icon URL using Fandom wiki Special:Filepath
        // Determine prefix: Debuff_ for debuffs, Buff_ for buffs
        var prefix = id.includes('debuff') ? 'Debuff_' : 'Buff_';
        var iconUrl = 'https://heroes-dragons-knowledge-vault.fandom.com/wiki/Special:Filepath/' + prefix +
                      iconName + '.png';

        // Icon image
        var img = document.createElement('img');
        img.src = iconUrl;
        img.alt = label;
        img.className = 'calc-buff-icon-img';
        img.onerror = function() {
            // Fallback to text if icon fails to load
            this.style.display = 'none';
            button.classList.add('calc-buff-icon-no-image');
        };

        // Effect text (no label - shown in tooltip on hover)
        var effectDiv = document.createElement('div');
        effectDiv.className = 'calc-buff-icon-effect';
        effectDiv.textContent = effectText;

        button.appendChild(img);
        button.appendChild(effectDiv);

        // Tooltip
        var tooltip = document.createElement('div');
        tooltip.className = 'calc-buff-tooltip';
        tooltip.innerHTML = '<div class="tooltip-title">' + label + ' <span class="tooltip-effect">' + effectText + '</span></div>' +
                           '<div class="tooltip-desc">' + (description || '') + '</div>';

        wrapper.appendChild(button);
        wrapper.appendChild(tooltip);

        // Click handler with mutual exclusivity
        button.onclick = function() {
            var isActive = this.dataset.active === 'true';

            if (isActive) {
                // Deactivate this button
                this.dataset.active = 'false';
                this.classList.remove('calc-buff-icon-active');
            } else {
                // Deactivate all others in group, activate this one
                exclusiveGroup.forEach(function(otherId) {
                    var other = document.getElementById(otherId);
                    if (other) {
                        other.dataset.active = 'false';
                        other.classList.remove('calc-buff-icon-active');
                    }
                });
                this.dataset.active = 'true';
                this.classList.add('calc-buff-icon-active');
            }

            triggerCalculate();
        };

        return wrapper;
    }

    /**
     * Check if a buff icon is active
     * @param {string} id - Button ID
     * @returns {boolean}
     */
    function isBuffActive(id) {
        var btn = document.getElementById(id);
        return btn && btn.dataset.active === 'true';
    }

    /**
     * Build buff sections from configuration array
     * @param {HTMLElement} container - Container to append sections to
     * @param {Array} sections - Array of section configs from ATTACKER_BUFF_SECTIONS or DEFENDER_BUFF_SECTIONS
     */
    function buildBuffSections(container, sections) {
        sections.forEach(function(section) {
            var header = document.createElement('div');
            header.className = 'calc-buff-category-header';
            header.textContent = section.header;
            container.appendChild(header);

            var row = document.createElement('div');
            row.className = 'calc-buff-icon-grid';

            // Build exclusive groups from exclusiveGroup field
            // Items with same exclusiveGroup are mutually exclusive
            // Items without exclusiveGroup stack with everything
            var exclusiveGroups = {};
            section.items.forEach(function(item) {
                if (item.exclusiveGroup) {
                    if (!exclusiveGroups[item.exclusiveGroup]) {
                        exclusiveGroups[item.exclusiveGroup] = [];
                    }
                    exclusiveGroups[item.exclusiveGroup].push(item.id);
                }
            });

            section.items.forEach(function(item) {
                // Get the group for this item, or empty array if it stacks with all
                var group = item.exclusiveGroup ? exclusiveGroups[item.exclusiveGroup] : [];
                row.appendChild(createBuffIcon(item.id, item.icon, item.label, item.effect, group, item.desc));
            });
            container.appendChild(row);
        });
    }

    /**
     * Build stat rows from configuration array
     * @param {string} prefix - ID prefix ('attacker' or 'defender')
     * @param {Array} stats - Array of stat configs from ATTACKER_STATS or DEFENDER_STATS
     * @returns {string} HTML string for stat rows
     */
    function buildStatRows(prefix, stats) {
        return stats.map(function(stat) {
            return createStatRow(prefix + '-' + stat.id, stat.label, 0, stat.hasBonus, stat.isPercent);
        }).join('');
    }

    /**
     * Extract attack percentage from skill description
     * @param {string} description - Skill description text
     * @returns {number|null} - Attack percentage as decimal (1.35 for 135%), or null if not found
     */
    function parseAttackPercentage(description) {
        if (!description) return null;

        // Pattern: (X% Attack) or (X% of Attack) - with or without wiki markup '''
        var pattern = /(?:''')?[\(\[](\d+(?:\.\d+)?)%\s+(?:of\s+)?Attack[\)\]](?:''')?/i;
        var match = description.match(pattern);

        if (match && match[1]) {
            return parseFloat(match[1]) / 100;  // Convert 135% to 1.35
        }

        return null;
    }

    /**
     * Creates a three-column stat display row
     * @param {string} id - Base ID for the stat
     * @param {string} label - Display label (e.g., "HP", "Attack")
     * @param {number} baseValue - Base stat value (white)
     * @param {boolean} canHaveBonus - Whether this stat can get equipment bonuses
     * @param {boolean} isPercent - Whether this stat is a percentage
     * @param {boolean} editableBase - Whether the base stat should be editable (for Custom mode)
     */
    function createStatRow(id, label, baseValue, canHaveBonus, isPercent, editableBase) {
        var html = '';
        html += '<div class="calc-stat-row">';
        html += '<label class="calc-stat-label">' + label + '</label>';

        // Column 1: Base stat (white, editable in custom mode)
        if (editableBase) {
            html += '<input type="number" class="calc-stat-base-input" id="' + id + '-base" value="' + (baseValue || 0) + '" step="any" />';
        } else {
            var displayBase = isPercent ? (baseValue || 0) + '%' : formatNumber(baseValue);
            html += '<span class="calc-stat-base" id="' + id + '-base">' + displayBase + '</span>';
        }

        // Column 2: Bonus (green, EDITABLE input with + prefix)
        if (canHaveBonus) {
            html += '<div class="calc-stat-bonus-wrapper">';
            html += '<span class="calc-stat-bonus-prefix">+</span>';
            html += '<input type="number" class="calc-stat-bonus-input" id="' + id + '-bonus" value="0" step="any" />';
            html += '</div>';
        } else {
            html += '<span class="calc-stat-bonus-empty">—</span>';
        }

        // Column 3: Total (yellow, calculated)
        var displayTotal = isPercent ? (baseValue || 0) + '%' : formatNumber(baseValue);
        html += '<span class="calc-stat-total" id="' + id + '-total">' + displayTotal + '</span>';

        html += '</div>';
        return html;
    }

    function createInput(id, label, defaultValue, type, tooltip, options) {
        type = type || 'number';
        options = options || {};
        var wrapper = document.createElement('div');
        wrapper.className = 'calc-input-group';

        var labelWrapper = document.createElement('div');
        labelWrapper.className = 'calc-input-label-wrapper';

        var labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;
        labelWrapper.appendChild(labelEl);

        // Add info icon with tooltip if provided
        if (tooltip) {
            var infoIcon = document.createElement('span');
            infoIcon.className = 'calc-info-icon';
            infoIcon.textContent = 'i';

            var tooltipEl = document.createElement('div');
            tooltipEl.className = 'calc-tooltip calc-info-tooltip';
            tooltipEl.textContent = tooltip;
            infoIcon.appendChild(tooltipEl);

            labelWrapper.appendChild(infoIcon);
        }

        var input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.value = defaultValue;
        if (type === 'number') {
            input.step = 'any';
        }
        if (options.wide) {
            input.className = 'calc-input-wide';
        }

        wrapper.appendChild(labelWrapper);

        // Add Max button if specified in options
        if (options.maxButton) {
            var inputWrapper = document.createElement('div');
            inputWrapper.className = 'calc-input-with-button';
            inputWrapper.appendChild(input);

            var maxBtn = document.createElement('button');
            maxBtn.type = 'button';
            maxBtn.className = 'calc-max-button';
            maxBtn.textContent = 'Max';
            maxBtn.onclick = function() {
                input.value = options.maxButton.value;
                input.dispatchEvent(new Event('change'));
                triggerCalculate();
            };
            inputWrapper.appendChild(maxBtn);
            wrapper.appendChild(inputWrapper);
        } else {
            wrapper.appendChild(input);
        }

        return wrapper;
    }

    function createCheckbox(id, label, defaultChecked) {
        var wrapper = document.createElement('div');
        wrapper.className = 'calc-checkbox-group';

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = id;
        input.checked = defaultChecked || false;

        var labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;

        wrapper.appendChild(input);
        wrapper.appendChild(labelEl);
        return wrapper;
    }

    /**
     * Create a talent UI element - checkbox for all, with inline number input for perAlly/perDead/threshold
     * @param {string} prefix - 'attacker' or 'defender'
     * @param {object} talent - Talent object with id, name, effect, description, tier, condition
     */
    function createTalentCheckbox(prefix, talent) {
        var wrapper = document.createElement('div');
        wrapper.className = 'calc-talent-item';

        // Create tooltip (used by all types)
        var tooltip = document.createElement('div');
        tooltip.className = 'calc-tooltip calc-talent-tooltip';
        tooltip.innerHTML = '<div class="tooltip-title">' + talent.name + ' <span class="tooltip-tier">(Tier ' + talent.tier + ')</span></div>' +
                           '<div class="tooltip-desc">' + talent.description + '</div>';

        // All talents get a checkbox
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = prefix + '-talent-' + talent.id;
        input.checked = false;
        // Store tier and prefix as data attributes for tier exclusivity
        input.dataset.tier = talent.tier;
        input.dataset.prefix = prefix;

        var labelEl = document.createElement('label');
        labelEl.htmlFor = input.id;
        labelEl.innerHTML = '<span class="talent-name">' + talent.name + '</span> <span class="talent-effect">(' + talent.effect + ')</span>';

        wrapper.appendChild(input);
        wrapper.appendChild(labelEl);

        // For perAlly/perDead/threshold talents, add an inline number input
        if (talent.condition === 'perAlly' || talent.condition === 'perDead' || talent.condition === 'threshold') {
            var countInput = document.createElement('input');
            countInput.type = 'number';
            countInput.id = prefix + '-talent-' + talent.id + '-count';
            countInput.className = 'talent-count-input';
            countInput.min = '0';
            countInput.max = talent.maxAllies || '7';
            countInput.value = '0';

            var countLabel = document.createElement('span');
            countLabel.className = 'talent-count-label';
            if (talent.condition === 'perAlly') {
                countLabel.textContent = ' Allies: ';
            } else if (talent.condition === 'perDead') {
                countLabel.textContent = ' Dead: ';
            } else if (talent.condition === 'threshold') {
                countLabel.textContent = ' Allies (need ' + talent.threshold + '+): ';
            }

            wrapper.appendChild(countLabel);
            wrapper.appendChild(countInput);

            countInput.onchange = function() { triggerCalculate(); };
            countInput.oninput = function() { triggerCalculate(); };
        }

        wrapper.appendChild(tooltip);

        // Add change handler for checkbox - implements tier exclusivity
        input.onchange = function() {
            // If this checkbox was just checked, uncheck other talents from the same tier
            if (input.checked) {
                var tier = input.dataset.tier;
                var currentPrefix = input.dataset.prefix;
                // Find all talent checkboxes with the same prefix and tier
                var allTalentCheckboxes = document.querySelectorAll('.calc-talent-item input[type="checkbox"]');
                allTalentCheckboxes.forEach(function(cb) {
                    if (cb !== input && cb.dataset.prefix === currentPrefix && cb.dataset.tier === tier) {
                        cb.checked = false;
                    }
                });
            }
            triggerCalculate();
        };

        return wrapper;
    }

    /**
     * Build talent section for a given role
     * @param {HTMLElement} container - Container to append talents to
     * @param {string} prefix - 'attacker' or 'defender'
     * @param {string} role - 'Tank', 'Melee', 'Ranged', or 'Support'
     * @param {string} type - 'offensive' or 'defensive'
     */
    function buildTalentSection(container, prefix, role, type) {
        container.innerHTML = '';

        if (!role) {
            container.innerHTML = '<div class="calc-talent-placeholder">Select a role to see available talents</div>';
            return;
        }

        var talents = type === 'offensive' ? OFFENSIVE_TALENTS[role] : DEFENSIVE_TALENTS[role];
        if (!talents || talents.length === 0) {
            container.innerHTML = '<div class="calc-talent-placeholder">No ' + type + ' talents for this role</div>';
            return;
        }

        // Add talent checkboxes (with inline inputs for perAlly/perDead/threshold talents)
        talents.forEach(function(talent) {
            container.appendChild(createTalentCheckbox(prefix, talent));
        });
    }

    /**
     * Check if a talent checkbox is checked
     * @param {string} prefix - 'attacker' or 'defender'
     * @param {string} talentId - Talent ID
     * @returns {boolean}
     */
    function isTalentActive(prefix, talentId) {
        var checkbox = document.getElementById(prefix + '-talent-' + talentId);
        return checkbox && checkbox.checked;
    }

    function createSelect(id, label, options, defaultValue) {
        var wrapper = document.createElement('div');
        wrapper.className = 'calc-select-group';

        var labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;

        var select = document.createElement('select');
        select.id = id;

        var emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- None --';
        select.appendChild(emptyOption);

        options.forEach(function(opt) {
            var option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            if (opt.value === defaultValue) option.selected = true;
            select.appendChild(option);
        });

        wrapper.appendChild(labelEl);
        wrapper.appendChild(select);
        return wrapper;
    }

    /**
     * Create collapsible section
     * @param {string|HTMLElement} titleOrElement - String title or DOM element for header
     * @param {HTMLElement} content - Content DOM element
     * @returns {HTMLElement}
     */
    function createCollapsible(titleOrElement, content) {
        var wrapper = document.createElement('div');
        wrapper.className = 'calc-collapsible';

        var header = document.createElement('div');
        header.className = 'calc-collapsible-header';

        var arrow = document.createElement('span');
        arrow.textContent = ' ▼';
        arrow.className = 'calc-collapsible-arrow';

        if (typeof titleOrElement === 'string') {
            header.textContent = titleOrElement;
            header.appendChild(arrow);
        } else {
            header.appendChild(titleOrElement);
            header.appendChild(arrow);
        }

        header.onclick = function() {
            var body = wrapper.querySelector('.calc-collapsible-body');
            var isHidden = body.style.display === 'none';
            body.style.display = isHidden ? 'block' : 'none';
            arrow.textContent = isHidden ? ' ▲' : ' ▼';
        };

        var body = document.createElement('div');
        body.className = 'calc-collapsible-body';
        body.style.display = 'none';
        body.appendChild(content);

        wrapper.appendChild(header);
        wrapper.appendChild(body);
        return wrapper;
    }

    // Alias for backwards compatibility
    var createCollapsibleWithHTML = createCollapsible;

    // ============================================
    // HERO DATA LOADING
    // ============================================

    function loadHeroData(callback) {
        // Try to load from embedded JSON (generated by Module:HeroDataJSON)
        var jsonElement = document.getElementById('hero-data-json');

        if (jsonElement) {
            try {
                heroData = JSON.parse(jsonElement.textContent);
                console.log('Loaded ' + Object.keys(heroData).length + ' heroes from embedded data');
                callback(null, heroData);
                return;
            } catch (e) {
                console.warn('Failed to parse embedded hero data:', e);
            }
        }

        // Fallback: try API call to get hero data via Lua module
        if (typeof mw !== 'undefined' && mw.config) {
            var api = new mw.Api();
            api.get({
                action: 'expandtemplates',
                text: '{{#invoke:HeroDataJSON|getAll}}',
                prop: 'wikitext'
            }).done(function(response) {
                if (response.expandtemplates && response.expandtemplates.wikitext) {
                    // Extract JSON from script tag
                    var match = response.expandtemplates.wikitext.match(/<script[^>]*>([\s\S]*?)<\/script>/);
                    if (match) {
                        try {
                            heroData = JSON.parse(match[1]);
                            console.log('Loaded ' + Object.keys(heroData).length + ' heroes via API');
                            callback(null, heroData);
                            return;
                        } catch (e) {
                            console.warn('Failed to parse API hero data:', e);
                        }
                    }
                }
                heroData = {};
                callback(null, {});
            }).fail(function() {
                console.warn('Could not load hero data');
                heroData = {};
                callback(null, {});
            });
        } else {
            // No MediaWiki environment, use empty data
            heroData = {};
            callback(null, {});
        }
    }

    function populateHeroDropdown(selectId, side) {
        var select = document.getElementById(selectId);
        if (!select) return;

        // Clear existing options except first (-- None --)
        while (select.options.length > 1) {
            select.remove(1);
        }

        // Add "-- Custom --" option as second option
        var customOption = document.createElement('option');
        customOption.value = '--custom--';
        customOption.textContent = '-- Custom --';
        select.appendChild(customOption);

        // Add heroes sorted alphabetically
        var heroes = Object.keys(heroData).sort();
        heroes.forEach(function(heroName) {
            var option = document.createElement('option');
            option.value = heroName;
            option.textContent = heroName;
            select.appendChild(option);
        });
    }

    /**
     * Populate skill dropdown with skills that have attack scaling
     * @param {string} heroName - Selected hero name
     */
    function populateSkillDropdown(heroName) {
        var select = document.getElementById('attacker-skill');
        if (!select) return;

        // Clear existing options except first ("Select Skill")
        while (select.options.length > 1) {
            select.remove(1);
        }

        if (!heroName || !heroData[heroName]) return;

        var hero = heroData[heroName];
        if (!hero.skills || hero.skills.length === 0) return;

        // Filter skills with attack scaling
        hero.skills.forEach(function(skill, index) {
            var attackPct = parseAttackPercentage(skill.description);

            if (attackPct !== null) {
                var option = document.createElement('option');
                option.value = index;  // Store skill index

                // Display format: "Blade's Fury - 70% Attack (2 hits)"
                var displayText = skill.name + ' - ' + Math.round(attackPct * 100) + '% Attack';
                if (skill.hits && skill.hits > 1) {
                    displayText += ' (' + skill.hits + ' hits)';
                }

                option.textContent = displayText;
                option.dataset.attackPct = attackPct;  // Store parsed percentage
                option.dataset.hits = skill.hits || 1;

                select.appendChild(option);
            }
        });

        // Auto-select first skill if available
        if (select.options.length > 1) {
            select.selectedIndex = 1;  // Select first skill (index 0 is "Select Skill")
            var firstSkillIndex = parseInt(select.options[1].value);
            onSkillSelect(heroName, firstSkillIndex);
        }
    }

    /**
     * Handle skill selection - auto-fill ATK to Dmg Ratio and Number of Hits
     * @param {string} heroName - Currently selected hero
     * @param {number} skillIndex - Selected skill index
     */
    function onSkillSelect(heroName, skillIndex) {
        if (!heroName || !heroData[heroName]) return;

        var hero = heroData[heroName];
        if (!hero.skills || !hero.skills[skillIndex]) return;

        var skill = hero.skills[skillIndex];
        var attackPct = parseAttackPercentage(skill.description);

        if (attackPct !== null) {
            // Auto-fill ATK to Dmg Ratio % (convert decimal to percentage)
            var ratioInput = document.getElementById('attacker-atkDmgRatio');
            if (ratioInput) {
                ratioInput.value = Math.round(attackPct * 100);
            }

            // Auto-fill Number of Hits
            var hitsInput = document.getElementById('attacker-numHits');
            if (hitsInput && skill.hits) {
                hitsInput.value = skill.hits;
            }

            // Trigger recalculation
            triggerCalculate();
        }
    }

    /**
     * Enable/disable custom mode for a side
     * Custom mode makes base stats editable ONLY for fields that normally accept bonuses
     */
    function setCustomMode(side, isCustom) {
        // Define which stats can be edited in custom mode (only those that have bonus inputs)
        var editableStats = side === 'attacker'
            ? ['atk', 'pierce', 'cDmg', 'cRate']  // Attacker editable fields
            : ['hp', 'def', 'bDmg', 'bRate', 'shield'];  // Defender editable fields

        var percents = {pierce: true, cRate: true, bRate: true, shield: true};

        editableStats.forEach(function(stat) {
            var baseEl = document.getElementById(side + '-' + stat + '-base');
            if (!baseEl) return;

            var currentValue = baseEl.tagName === 'INPUT' ? baseEl.value : (parseFloat(baseEl.textContent.replace(/,/g, '').replace('%', '')) || 0);

            if (isCustom && baseEl.tagName !== 'INPUT') {
                // Replace span with input
                var input = document.createElement('input');
                input.type = 'number';
                input.className = 'calc-stat-base-input';
                input.id = side + '-' + stat + '-base';
                input.value = currentValue;
                input.step = 'any';
                input.addEventListener('input', triggerCalculate);
                input.addEventListener('change', triggerCalculate);
                baseEl.parentNode.replaceChild(input, baseEl);
            } else if (!isCustom && baseEl.tagName === 'INPUT') {
                // Replace input with span
                var span = document.createElement('span');
                span.className = 'calc-stat-base';
                span.id = side + '-' + stat + '-base';
                span.textContent = percents[stat] ? currentValue + '%' : formatNumber(currentValue);
                baseEl.parentNode.replaceChild(span, baseEl);
            }
        });
    }

    function onHeroSelect(heroName, side) {
        var prefix = side + '-';

        // Handle Custom mode
        if (heroName === '--custom--') {
            setCustomMode(side, true);

            // Reset all base stats to 0
            if (side === 'attacker') {
                // Reset attacker base stats (editable ones in custom mode)
                var atkBase = document.getElementById('attacker-atk-base');
                if (atkBase) atkBase.value = 0;

                var pierceBase = document.getElementById('attacker-pierce-base');
                if (pierceBase) pierceBase.value = 0;

                var cDmgBase = document.getElementById('attacker-cDmg-base');
                if (cDmgBase) cDmgBase.value = 0;

                var cRateBase = document.getElementById('attacker-cRate-base');
                if (cRateBase) cRateBase.value = 0;

                // Reset non-editable display stats to 0
                var updateBase = function(statId, value, isPercent) {
                    var el = document.getElementById('attacker-' + statId + '-base');
                    if (el && el.tagName !== 'INPUT') {
                        el.textContent = isPercent ? value + '%' : formatNumber(value);
                    }
                };
                updateBase('hp', 0, false);
                updateBase('def', 0, false);
                updateBase('walkRange', 0, false);
                updateBase('skillRange', 0, false);
                updateBase('bDmg', 0, false);
                updateBase('bRate', 0, true);
                updateBase('shield', 0, true);
            } else {
                // Reset defender base stats (editable ones in custom mode)
                var hpBase = document.getElementById('defender-hp-base');
                if (hpBase) hpBase.value = 0;

                var defBase = document.getElementById('defender-def-base');
                if (defBase) defBase.value = 0;

                var bDmgBase = document.getElementById('defender-bDmg-base');
                if (bDmgBase) bDmgBase.value = 0;

                var bRateBase = document.getElementById('defender-bRate-base');
                if (bRateBase) bRateBase.value = 0;

                var shieldBase = document.getElementById('defender-shield-base');
                if (shieldBase) shieldBase.value = 0;

                // Reset non-editable display stats to 0
                var updateDefenderBase = function(statId, value, isPercent) {
                    var el = document.getElementById('defender-' + statId + '-base');
                    if (el && el.tagName !== 'INPUT') {
                        el.textContent = isPercent ? value + '%' : formatNumber(value);
                    }
                };
                updateDefenderBase('atk', 0, false);
                updateDefenderBase('pierce', 0, true);
                updateDefenderBase('walkRange', 0, false);
                updateDefenderBase('skillRange', 0, false);
                updateDefenderBase('cDmg', 0, false);
                updateDefenderBase('cRate', 0, true);
            }

            // Clear hero image
            updateHeroImage(null, side);

            // Reset class and role to empty
            var classSelect = document.getElementById(prefix + 'class');
            if (classSelect) classSelect.value = '';
            var roleSelect = document.getElementById(prefix + 'role');
            if (roleSelect) roleSelect.value = '';
            updateHeroImageBorder(side, '');

            // Reset skill dropdown and related inputs for attacker
            if (side === 'attacker') {
                var skillSelect = document.getElementById('attacker-skill');
                if (skillSelect) {
                    while (skillSelect.options.length > 1) {
                        skillSelect.remove(1);
                    }
                    skillSelect.selectedIndex = 0;
                }
                setInputValue('attacker-atkDmgRatio', 100);
                setInputValue('attacker-numHits', 1);
            }

            triggerCalculate();
            return;
        }

        // Disable custom mode when selecting a hero
        setCustomMode(side, false);

        // If no hero selected, reset all fields for this side
        if (!heroName || !heroData[heroName]) {
            var classSelect = document.getElementById(prefix + 'class');
            if (classSelect) classSelect.value = '';
            var roleSelect = document.getElementById(prefix + 'role');
            if (roleSelect) roleSelect.value = '';
            updateHeroImageBorder(side, '');

            if (side === 'attacker') {
                setInputValue(prefix + 'atk', 5000);

                // Reset skill dropdown
                var skillSelect = document.getElementById('attacker-skill');
                if (skillSelect) {
                    while (skillSelect.options.length > 1) {
                        skillSelect.remove(1);
                    }
                    skillSelect.selectedIndex = 0;
                }

                // Reset skill-related inputs to defaults
                setInputValue('attacker-atkDmgRatio', 100);
                setInputValue('attacker-numHits', 1);
            } else {
                setInputValue(prefix + 'hp', 25000);
                setInputValue(prefix + 'def', 1500);
            }

            // Clear hero image
            updateHeroImage(null, side);

            triggerCalculate();
            return;
        }

        var hero = heroData[heroName];

        // Fill in stats from hero data
        if (hero.stats && side === 'attacker') {
            // Store base stats for calculation (with defaults for common stats)
            window.attackerBaseStats = {
                hp: hero.stats.hp || 0,
                atk: hero.stats.attack || 0,
                def: hero.stats.defense || 0,
                pierce: hero.stats.pierce || 0,
                cDmg: hero.stats.criticalDamage || 766,
                cRate: hero.stats.criticalRate || 15,
                bDmg: hero.stats.blockDamage || 766,
                bRate: hero.stats.blockRate || 15,
                shield: hero.stats.shield || 50,
                walkRange: hero.stats.walkRange || 0,
                skillRange: hero.stats.skillRange || 0
            };

            // Update base stat displays (white column)
            var updateBase = function(statId, value, isPercent) {
                var el = document.getElementById('attacker-' + statId + '-base');
                if (el) el.textContent = isPercent ? value + '%' : formatNumber(value);
            };

            updateBase('hp', window.attackerBaseStats.hp, false);
            updateBase('atk', window.attackerBaseStats.atk, false);
            updateBase('def', window.attackerBaseStats.def, false);
            updateBase('pierce', window.attackerBaseStats.pierce, true);
            updateBase('walkRange', window.attackerBaseStats.walkRange, false);
            updateBase('skillRange', window.attackerBaseStats.skillRange, false);
            updateBase('cDmg', window.attackerBaseStats.cDmg, false);
            updateBase('cRate', window.attackerBaseStats.cRate, true);
            updateBase('bDmg', window.attackerBaseStats.bDmg, false);
            updateBase('bRate', window.attackerBaseStats.bRate, true);
            updateBase('shield', window.attackerBaseStats.shield, true);
        } else if (hero.stats && side === 'defender') {
            // Store base stats for calculation
            window.defenderBaseStats = {
                hp: hero.stats.hp || 0,
                atk: hero.stats.attack || 0,
                def: hero.stats.defense || 0,
                pierce: hero.stats.pierce || 0,
                cDmg: hero.stats.criticalDamage || 766,
                cRate: hero.stats.criticalRate || 15,
                bDmg: hero.stats.blockDamage || 766,
                bRate: hero.stats.blockRate || 15,
                shield: hero.stats.shield || 50,
                walkRange: hero.stats.walkRange || 0,
                skillRange: hero.stats.skillRange || 0
            };

            // Update base stat displays (white column)
            var updateDefenderBase = function(statId, value, isPercent) {
                var el = document.getElementById('defender-' + statId + '-base');
                if (el) el.textContent = isPercent ? value + '%' : formatNumber(value);
            };

            updateDefenderBase('hp', window.defenderBaseStats.hp, false);
            updateDefenderBase('atk', window.defenderBaseStats.atk, false);
            updateDefenderBase('def', window.defenderBaseStats.def, false);
            updateDefenderBase('pierce', window.defenderBaseStats.pierce, true);
            updateDefenderBase('walkRange', window.defenderBaseStats.walkRange, false);
            updateDefenderBase('skillRange', window.defenderBaseStats.skillRange, false);
            updateDefenderBase('cDmg', window.defenderBaseStats.cDmg, false);
            updateDefenderBase('cRate', window.defenderBaseStats.cRate, true);
            updateDefenderBase('bDmg', window.defenderBaseStats.bDmg, false);
            updateDefenderBase('bRate', window.defenderBaseStats.bRate, true);
            updateDefenderBase('shield', window.defenderBaseStats.shield, true);
        }

        // Set class for class advantage calculation
        var classSelect = document.getElementById(prefix + 'class');
        if (classSelect) {
            classSelect.value = hero.class || '';
            // Update hero image border based on class
            updateHeroImageBorder(side, hero.class || '');
        }

        // Set role category based on hero's role and rebuild talents
        var roleSelect = document.getElementById(prefix + 'role');
        if (roleSelect && hero.role) {
            var roleCategory = ROLE_CATEGORIES[hero.role] || '';
            roleSelect.value = roleCategory;

            // Rebuild talents for the new role
            var talentType = (side === 'attacker') ? 'offensive' : 'defensive';
            var containerId = (side === 'attacker') ? 'attacker-offensive-talents' : 'defender-defensive-talents';
            var container = document.getElementById(containerId);
            if (container) {
                buildTalentSection(container, side, roleCategory, talentType);
            }
        }

        // Update hero image
        updateHeroImage(heroName, side);

        // Populate skill dropdown for attacker
        if (side === 'attacker') {
            populateSkillDropdown(heroName);
        }

        // Trigger recalculation
        triggerCalculate();
    }

    function updateHeroImage(heroName, side) {
        var imageContainer = document.getElementById(side + '-hero-image');

        if (!imageContainer) return;

        // Always keep container visible
        imageContainer.style.display = 'block';

        // Show placeholder if no hero selected
        if (!heroName || !heroData[heroName]) {
            imageContainer.innerHTML = '<div class="calc-hero-placeholder">Select Hero</div>';
            return;
        }

        // Construct image URL from hero name
        var imageName = heroName.replace(/ /g, '_') + '_Head.png';
        var imageUrl = 'https://heroes-dragons-knowledge-vault.fandom.com/wiki/Special:Filepath/' + imageName;

        // Create img element
        var img = document.createElement('img');
        img.src = imageUrl;
        img.alt = heroName;

        // Handle image load success
        img.onload = function() {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
        };

        // Handle image load failure (show placeholder instead)
        img.onerror = function() {
            imageContainer.innerHTML = '<div class="calc-hero-placeholder">Image Not Found</div>';
        };

        // Clear previous image and add new one
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);
    }

    /**
     * Update hero image border color based on class
     * @param {string} side - 'attacker' or 'defender'
     * @param {string} heroClass - 'Faith', 'Force', 'Wisdom', 'Valor', or ''
     */
    function updateHeroImageBorder(side, heroClass) {
        var imageContainer = document.getElementById(side + '-hero-image');
        if (!imageContainer) return;

        // Class color mapping
        var classColors = {
            'Faith': '#699132',    // Green
            'Force': '#cc5344',    // Red
            'Wisdom': '#324b73',   // Navy blue
            'Valor': '#764499'     // Purple
        };

        // Get color or default to gray
        var borderColor = classColors[heroClass] || '#666';

        // Apply border color
        imageContainer.style.borderColor = borderColor;
    }

    function setInputValue(id, value) {
        var input = document.getElementById(id);
        if (input) input.value = value;
    }

    // getClassAdvantage is provided by calculationEngine.js

    // ============================================
    // BUILD UI
    // ============================================

    /**
     * Create equipment sets UI for attacker or defender
     * @param {string} side - 'attacker' or 'defender'
     * @returns {HTMLElement} Equipment sets container
     */
    function createEquipmentSetsUI(side) {
        var container = document.createElement('div');
        container.className = 'calc-equipment-sets';

        // Create set items for this side (compact single-line layout)
        Object.keys(EQUIPMENT_SETS).forEach(function(setKey) {
            var set = EQUIPMENT_SETS[setKey];
            if (set.side !== side) return;

            var setItem = document.createElement('div');
            setItem.className = 'calc-set-item-compact';

            // Dropdown selector
            var dropdown = document.createElement('select');
            dropdown.id = side + '-set-' + setKey;
            dropdown.className = 'calc-set-dropdown-compact';
            dropdown.innerHTML = '<option value="0">0</option>';
            dropdown.onchange = function() {
                updateEquipmentSlots(side);
                triggerCalculate();
            };
            setItem.appendChild(dropdown);

            // Set name + effect (first line)
            var setLabel = document.createElement('div');
            setLabel.className = 'calc-set-label-compact';

            // Format: SetName - Effect
            var nameSpan = document.createElement('span');
            nameSpan.className = 'calc-set-name-inline';
            nameSpan.textContent = set.name;
            setLabel.appendChild(nameSpan);

            setLabel.appendChild(document.createTextNode(' - '));

            var effectSpan = document.createElement('span');
            effectSpan.id = side + '-effect-' + setKey;
            effectSpan.className = 'calc-set-effect-inline';
            effectSpan.textContent = '0';
            setLabel.appendChild(effectSpan);

            setItem.appendChild(setLabel);

            // Description (second line)
            var descDiv = document.createElement('div');
            descDiv.className = 'calc-set-description-compact';
            descDiv.textContent = set.description;
            setItem.appendChild(descDiv);
            container.appendChild(setItem);
        });

        return container;
    }

    /**
     * Create tab navigation for mobile (Attacker/Defender)
     */
    function createTabNavigation() {
        var nav = document.createElement('div');
        nav.className = 'calc-tab-nav';

        var attackerTab = document.createElement('button');
        attackerTab.className = 'calc-tab calc-tab-active';
        attackerTab.dataset.tab = 'attacker';
        attackerTab.textContent = 'Attacker';
        attackerTab.type = 'button';
        attackerTab.onclick = function() { switchTab('attacker'); };

        var defenderTab = document.createElement('button');
        defenderTab.className = 'calc-tab';
        defenderTab.dataset.tab = 'defender';
        defenderTab.textContent = 'Defender';
        defenderTab.type = 'button';
        defenderTab.onclick = function() { switchTab('defender'); };

        nav.appendChild(attackerTab);
        nav.appendChild(defenderTab);

        return nav;
    }

    /**
     * Switch active tab (mobile only)
     */
    function switchTab(tabName) {
        // Update button states
        var tabs = document.querySelectorAll('.calc-tab');
        tabs.forEach(function(tab) {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('calc-tab-active');
            } else {
                tab.classList.remove('calc-tab-active');
            }
        });

        // Show/hide content sections
        var contents = document.querySelectorAll('.calc-tab-content');
        contents.forEach(function(content) {
            if (content.dataset.tab === tabName) {
                content.classList.add('calc-tab-content-active');
            } else {
                content.classList.remove('calc-tab-content-active');
            }
        });
    }

    function buildCalculatorUI(container) {
        container.innerHTML = '';
        // Default to narrow mode (tabs) - removed if container width >= threshold
        container.className = 'damage-calculator calc-narrow-mode';

        // Switch to tabbed layout when content area is too narrow for 2 columns
        var NARROW_MODE_THRESHOLD = 1000;
        function checkContentWidth() {
            var rect = container.getBoundingClientRect();
            var width = rect.width;
            if (width < NARROW_MODE_THRESHOLD) {
                container.classList.add('calc-narrow-mode');
            } else {
                container.classList.remove('calc-narrow-mode');
            }
        }

        // Check if Fandom's expand button exists and content is NOT already expanded
        function updateExpandState() {
            var btn = document.querySelector('button.content-size-toggle, button[name="content-size-toggle"]');
            if (!btn) return;

            // If aria-label is "Expand", content can be expanded - show tip
            // If aria-label is "Collapse", content is already expanded - hide tip
            if (btn.getAttribute('aria-label') === 'Expand') {
                container.classList.add('calc-can-expand');
            } else {
                container.classList.remove('calc-can-expand');
            }
        }

        // NOTE: Observers and initial width check are set up at the end of this function
        // after the UI is fully built, so we can find the correct parent elements

        // Title
        var title = document.createElement('h2');
        title.textContent = 'Damage Calculator';
        container.appendChild(title);

        // Expand tip (shown when content area is constrained)
        var expandTip = document.createElement('div');
        expandTip.className = 'calc-expand-tip';
        expandTip.textContent = 'For the best experience, click the expand button in the top-left corner to widen the content area.';
        container.appendChild(expandTip);

        // Tab Navigation (for narrow mode)
        var tabNav = createTabNavigation();
        container.appendChild(tabNav);

        // Main layout
        var mainLayout = document.createElement('div');
        mainLayout.className = 'calc-main-layout';

        // ---- ATTACKER TAB CONTENT ----
        var attackerTabContent = document.createElement('div');
        attackerTabContent.className = 'calc-tab-content calc-tab-content-active';
        attackerTabContent.dataset.tab = 'attacker';

        // ---- ATTACKER SECTION ----
        var attackerSection = document.createElement('div');
        attackerSection.className = 'calc-section calc-attacker';

        var attackerTitle = document.createElement('h3');
        attackerTitle.textContent = 'Attacker';
        attackerSection.appendChild(attackerTitle);

        // Hero select for attacker
        var attackerHeroSelect = createSelect('attacker-hero', 'Select Hero', [], '');
        attackerHeroSelect.querySelector('select').onchange = function(e) {
            onHeroSelect(e.target.value, 'attacker');
        };
        attackerSection.appendChild(attackerHeroSelect);

        // Class select for attacker
        var attackerClassSelect = createSelect('attacker-class', 'Class', [
            {value: 'Faith', label: 'Faith'},
            {value: 'Force', label: 'Force'},
            {value: 'Wisdom', label: 'Wisdom'},
            {value: 'Valor', label: 'Valor'}
        ], '');
        attackerClassSelect.querySelector('select').onchange = function(e) {
            updateHeroImageBorder('attacker', e.target.value);
            triggerCalculate();
        };
        attackerSection.appendChild(attackerClassSelect);

        // Role category select for attacker
        var attackerRoleSelect = createSelect('attacker-role', 'Role', ROLE_CATEGORY_OPTIONS, '');
        attackerRoleSelect.querySelector('select').onchange = function(e) {
            var role = e.target.value;
            var container = document.getElementById('attacker-offensive-talents');
            if (container) {
                buildTalentSection(container, 'attacker', role, 'offensive');
            }
            triggerCalculate();
        };
        attackerSection.appendChild(attackerRoleSelect);

        // Hero image for attacker
        var attackerHeroImage = document.createElement('div');
        attackerHeroImage.className = 'calc-hero-image calc-hero-image-attacker';
        attackerHeroImage.id = 'attacker-hero-image';
        attackerHeroImage.innerHTML = '<div class="calc-hero-placeholder">Select Hero</div>';
        attackerSection.appendChild(attackerHeroImage);

        // Equipment Sets (new slot-based system) - compact with slot indicator in header
        var attackerSetsUI = createEquipmentSetsUI('attacker');
        var attackerSetsHeader = document.createElement('div');
        attackerSetsHeader.style.display = 'flex';
        attackerSetsHeader.style.justifyContent = 'space-between';
        attackerSetsHeader.style.alignItems = 'center';
        attackerSetsHeader.style.flex = '1';

        var setsLabel = document.createElement('span');
        setsLabel.textContent = 'Equipment Sets';
        attackerSetsHeader.appendChild(setsLabel);

        var slotIndicator = document.createElement('div');
        slotIndicator.className = 'calc-slot-indicator';
        slotIndicator.id = 'attacker-slot-indicator';
        slotIndicator.innerHTML = '<span class="calc-slot calc-slot-empty"></span>' +
                                 '<span class="calc-slot calc-slot-empty"></span>' +
                                 '<span class="calc-slot calc-slot-empty"></span>' +
                                 '<span class="calc-slot-counter">0/3</span>';
        attackerSetsHeader.appendChild(slotIndicator);

        var attackerSetsCollapsible = createCollapsibleWithHTML(attackerSetsHeader, attackerSetsUI);
        attackerSection.appendChild(attackerSetsCollapsible);

        // Attacker stats (three-column display) - data-driven
        var statsContainer = document.createElement('div');
        statsContainer.className = 'calc-stats-container';
        statsContainer.innerHTML = buildStatRows('attacker', ATTACKER_STATS);
        attackerSection.appendChild(statsContainer);

        // Skill selector dropdown (above other inputs)
        var skillSelect = createSelect('attacker-skill', 'Select Skill', [], '');
        skillSelect.querySelector('select').onchange = function(e) {
            var heroName = document.getElementById('attacker-hero').value;
            var skillIndex = parseInt(e.target.value);
            if (!isNaN(skillIndex)) {
                onSkillSelect(heroName, skillIndex);
            }
        };
        attackerSection.appendChild(skillSelect);

        // Additional inputs (percentages for skill multipliers)
        attackerSection.appendChild(createInput('attacker-skillMult', 'Skill Mult %', 0, 'number', 'Skill level upgrade bonus (typically 25% for max upgrade)', { maxButton: { value: 25 } }));
        attackerSection.appendChild(createInput('attacker-atkDmgRatio', 'ATK to Dmg Ratio %', 100, 'number', 'Attack scaling from skill (auto-filled when selecting skill)', { wide: true }));
        attackerSection.appendChild(createInput('attacker-numHits', 'Number of Hits', 1, 'number', null, { wide: true }));

        // Modifiers section (collapsible) - includes positional and buffs/debuffs
        var buffsContent = document.createElement('div');
        buffsContent.className = 'calc-buffs-container';

        // High Ground at the top
        buffsContent.appendChild(createCheckbox('mod-highGround', 'High Ground (+50%)', false));

        // Then the regular buff sections
        buildBuffSections(buffsContent, ATTACKER_BUFF_SECTIONS);

        attackerSection.appendChild(createCollapsible('Modifiers', buffsContent));

        // Offensive Talents section (collapsible) - dynamically populated based on role
        var offensiveTalentsContent = document.createElement('div');
        offensiveTalentsContent.id = 'attacker-offensive-talents';
        offensiveTalentsContent.className = 'calc-talents-container';
        offensiveTalentsContent.innerHTML = '<div class="calc-talent-placeholder">Select a role to see available talents</div>';

        attackerSection.appendChild(createCollapsible('Offensive Talents', offensiveTalentsContent));

        attackerTabContent.appendChild(attackerSection);
        mainLayout.appendChild(attackerTabContent);

        // ---- DEFENDER TAB CONTENT ----
        var defenderTabContent = document.createElement('div');
        defenderTabContent.className = 'calc-tab-content';
        defenderTabContent.dataset.tab = 'defender';

        // ---- DEFENDER SECTION ----
        var defenderSection = document.createElement('div');
        defenderSection.className = 'calc-section calc-defender';

        var defenderTitle = document.createElement('h3');
        defenderTitle.textContent = 'Defender';
        defenderSection.appendChild(defenderTitle);

        // Hero select for defender
        var defenderHeroSelect = createSelect('defender-hero', 'Select Hero', [], '');
        defenderHeroSelect.querySelector('select').onchange = function(e) {
            onHeroSelect(e.target.value, 'defender');
        };
        defenderSection.appendChild(defenderHeroSelect);

        // Class select for defender
        var defenderClassSelect = createSelect('defender-class', 'Class', [
            {value: 'Faith', label: 'Faith'},
            {value: 'Force', label: 'Force'},
            {value: 'Wisdom', label: 'Wisdom'},
            {value: 'Valor', label: 'Valor'}
        ], '');
        defenderClassSelect.querySelector('select').onchange = function(e) {
            updateHeroImageBorder('defender', e.target.value);
            triggerCalculate();
        };
        defenderSection.appendChild(defenderClassSelect);

        // Role category select for defender
        var defenderRoleSelect = createSelect('defender-role', 'Role', ROLE_CATEGORY_OPTIONS, '');
        defenderRoleSelect.querySelector('select').onchange = function(e) {
            var role = e.target.value;
            var container = document.getElementById('defender-defensive-talents');
            if (container) {
                buildTalentSection(container, 'defender', role, 'defensive');
            }
            triggerCalculate();
        };
        defenderSection.appendChild(defenderRoleSelect);

        // Hero image for defender
        var defenderHeroImage = document.createElement('div');
        defenderHeroImage.className = 'calc-hero-image calc-hero-image-defender';
        defenderHeroImage.id = 'defender-hero-image';
        defenderHeroImage.innerHTML = '<div class="calc-hero-placeholder">Select Hero</div>';
        defenderSection.appendChild(defenderHeroImage);

        // Equipment Sets (new slot-based system) - compact with slot indicator in header
        var defenderSetsUI = createEquipmentSetsUI('defender');
        var defenderSetsHeader = document.createElement('div');
        defenderSetsHeader.style.display = 'flex';
        defenderSetsHeader.style.justifyContent = 'space-between';
        defenderSetsHeader.style.alignItems = 'center';
        defenderSetsHeader.style.flex = '1';

        var setsLabel = document.createElement('span');
        setsLabel.textContent = 'Equipment Sets';
        defenderSetsHeader.appendChild(setsLabel);

        var slotIndicator = document.createElement('div');
        slotIndicator.className = 'calc-slot-indicator';
        slotIndicator.id = 'defender-slot-indicator';
        slotIndicator.innerHTML = '<span class="calc-slot calc-slot-empty"></span>' +
                                 '<span class="calc-slot calc-slot-empty"></span>' +
                                 '<span class="calc-slot calc-slot-empty"></span>' +
                                 '<span class="calc-slot-counter">0/3</span>';
        defenderSetsHeader.appendChild(slotIndicator);

        var defenderSetsCollapsible = createCollapsibleWithHTML(defenderSetsHeader, defenderSetsUI);
        defenderSection.appendChild(defenderSetsCollapsible);

        // Defender stats (three-column display) - data-driven
        var defenderStatsContainer = document.createElement('div');
        defenderStatsContainer.className = 'calc-stats-container';
        defenderStatsContainer.innerHTML = buildStatRows('defender', DEFENDER_STATS);
        defenderSection.appendChild(defenderStatsContainer);

        // Modifiers section (collapsible) - includes special modifiers and buffs/debuffs
        var defenderBuffsContent = document.createElement('div');
        defenderBuffsContent.className = 'calc-buffs-container';

        // Goblin Skin at the top
        defenderBuffsContent.appendChild(createCheckbox('mod-goblinSkin', 'Goblin Skin (-10%)', false));

        // Shield count input (styled like talent count inputs)
        var shieldCountDiv = document.createElement('div');
        shieldCountDiv.className = 'calc-shield-count';
        shieldCountDiv.innerHTML =
            '<span class="shield-label">Active Shields:</span>' +
            '<input type="number" id="mod-shieldCount" class="shield-count-input" min="0" max="5" value="0" />' +
            '<span class="shield-help" title="Each shield absorbs damage for 1 hit. Shield% stat determines reduction amount.">/ 5</span>';
        defenderBuffsContent.appendChild(shieldCountDiv);

        // Then the regular buff sections
        buildBuffSections(defenderBuffsContent, DEFENDER_BUFF_SECTIONS);
        defenderSection.appendChild(createCollapsible('Modifiers', defenderBuffsContent));

        // Defensive Talents (collapsible) - dynamically populated based on role
        var defTalentsContent = document.createElement('div');

        // Role-based talents container
        var defensiveTalentsContainer = document.createElement('div');
        defensiveTalentsContainer.id = 'defender-defensive-talents';
        defensiveTalentsContainer.className = 'calc-talents-container';
        defensiveTalentsContainer.innerHTML = '<div class="calc-talent-placeholder">Select a role to see available talents</div>';
        defTalentsContent.appendChild(defensiveTalentsContainer);

        defenderSection.appendChild(createCollapsible('Defensive Talents', defTalentsContent));

        defenderTabContent.appendChild(defenderSection);
        mainLayout.appendChild(defenderTabContent);

        // ---- RESULTS SECTION (3rd column in wide mode, below tabs in narrow mode) ----
        var resultsSection = document.createElement('div');
        resultsSection.className = 'calc-section calc-results';

        var resultsTitle = document.createElement('h3');
        resultsTitle.textContent = 'Results';
        resultsSection.appendChild(resultsTitle);

        var resultsContent = document.createElement('div');
        resultsContent.id = 'calc-results-content';
        resultsContent.innerHTML = '<p>Enter values and results will appear here.</p>';
        resultsSection.appendChild(resultsContent);

        // Live region for screen reader announcements
        var liveRegion = document.createElement('div');
        liveRegion.id = 'calc-live-region';
        liveRegion.className = 'calc-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        resultsSection.appendChild(liveRegion);

        // Add Results to mainLayout as 3rd column (not wrapped in tab-content)
        mainLayout.appendChild(resultsSection);

        container.appendChild(mainLayout);

        // ---- FORMULA BREAKDOWN SECTION ----
        var formulaBreakdown = document.createElement('div');
        formulaBreakdown.className = 'calc-formula-breakdown';

        var formulaTitle = document.createElement('h3');
        formulaTitle.textContent = 'Damage Calculation Breakdown';
        formulaBreakdown.appendChild(formulaTitle);

        var formulaViz = document.createElement('div');
        formulaViz.id = 'formula-visualization';
        formulaBreakdown.appendChild(formulaViz);

        container.appendChild(formulaBreakdown);

        // Add event listeners for auto-calculation
        container.querySelectorAll('input, select').forEach(function(el) {
            el.addEventListener('change', triggerCalculate);
            if (el.type === 'number' || el.type === 'text') {
                el.addEventListener('input', triggerCalculate);
                // Blur input on Enter key for better mobile UX
                el.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        el.blur();
                    }
                });
            }
        });

        // Load hero data and populate dropdowns
        loadHeroData(function() {
            populateHeroDropdown('attacker-hero', 'attacker');
            populateHeroDropdown('defender-hero', 'defender');
        });

        // Initialize equipment slots
        updateEquipmentSlots('attacker');
        updateEquipmentSlots('defender');

        // Initial calculation
        triggerCalculate();

        // ========================================
        // SET UP WIDTH DETECTION (after UI is built)
        // ========================================

        // Use ResizeObserver to detect container width changes
        if (typeof ResizeObserver !== 'undefined') {
            var resizeObserver = new ResizeObserver(function() {
                checkContentWidth();
            });
            resizeObserver.observe(container);

            // Also observe parent content areas (Fandom's content wrappers)
            var contentWrapper = container.closest('.page-content') ||
                                 container.closest('#mw-content-text') ||
                                 container.closest('.mw-parser-output') ||
                                 container.parentElement;
            if (contentWrapper && contentWrapper !== container) {
                resizeObserver.observe(contentWrapper);
            }

            // Also observe the main content container that Fandom toggles
            var mainContainer = document.querySelector('.main-container') ||
                               document.querySelector('.page') ||
                               document.querySelector('#content');
            if (mainContainer && mainContainer !== container && mainContainer !== contentWrapper) {
                resizeObserver.observe(mainContainer);
            }
        }

        // Watch for class changes on parent elements (Fandom may toggle classes to expand/collapse)
        if (typeof MutationObserver !== 'undefined') {
            var mutationObserver = new MutationObserver(function(mutations) {
                // Check if any mutation involves class or style changes
                var shouldCheck = mutations.some(function(m) {
                    return m.attributeName === 'class' || m.attributeName === 'style';
                });
                if (shouldCheck) {
                    // Delay to let CSS transitions start
                    setTimeout(checkContentWidth, 50);
                    setTimeout(checkContentWidth, 200);
                }
            });

            // Observe class/style changes on ancestors up to body
            var ancestor = container.parentElement;
            while (ancestor && ancestor !== document.body) {
                mutationObserver.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style'] });
                ancestor = ancestor.parentElement;
            }
        }

        // Fallback: always add resize listener for viewport changes
        window.addEventListener('resize', checkContentWidth);

        // Listen for clicks on the expand button to update state
        var expandBtn = document.querySelector('button.content-size-toggle, button[name="content-size-toggle"]');
        if (expandBtn) {
            expandBtn.addEventListener('click', function() {
                // Multiple checks to catch CSS transitions
                updateExpandState();
                checkContentWidth();
                setTimeout(function() {
                    updateExpandState();
                    checkContentWidth();
                }, 100);
                setTimeout(checkContentWidth, 300);
                setTimeout(checkContentWidth, 500);
            });
        }

        // Initial width check using requestAnimationFrame to ensure layout is complete
        requestAnimationFrame(function() {
            checkContentWidth();
            updateExpandState();
            setTimeout(checkContentWidth, 50);
        });
    }


    // Export to window for Part 2
    window.DamageCalcCore = {
        EQUIPMENT_SETS: EQUIPMENT_SETS,
        TOTAL_EQUIPMENT_SLOTS: TOTAL_EQUIPMENT_SLOTS,
        ROLE_CATEGORIES: ROLE_CATEGORIES,
        ROLE_CATEGORY_OPTIONS: ROLE_CATEGORY_OPTIONS,
        OFFENSIVE_TALENTS: OFFENSIVE_TALENTS,
        DEFENSIVE_TALENTS: DEFENSIVE_TALENTS,
        TARGET_TYPE_OPTIONS: TARGET_TYPE_OPTIONS,
        ATTACK_TYPE_OPTIONS: ATTACK_TYPE_OPTIONS,
        ATTACKER_BUFF_SECTIONS: ATTACKER_BUFF_SECTIONS,
        DEFENDER_BUFF_SECTIONS: DEFENDER_BUFF_SECTIONS,
        ATTACKER_STATS: ATTACKER_STATS,
        DEFENDER_STATS: DEFENDER_STATS,
        heroData: heroData,
        calculateSetBonuses: calculateSetBonuses,
        calculateSlotsUsed: calculateSlotsUsed,
        updateEquipmentSlots: updateEquipmentSlots,
        createBuffIcon: createBuffIcon,
        isBuffActive: isBuffActive,
        buildBuffSections: buildBuffSections,
        buildStatRows: buildStatRows,
        parseAttackPercentage: parseAttackPercentage,
        createStatRow: createStatRow,
        loadHeroData: loadHeroData,
        populateHeroDropdown: populateHeroDropdown,
        buildCalculatorUI: buildCalculatorUI,
        createCollapsible: createCollapsible,
        createCheckbox: createCheckbox,
        createTalentCheckbox: createTalentCheckbox,
        isTalentActive: isTalentActive,
        triggerCalculate: triggerCalculate
    };
})();