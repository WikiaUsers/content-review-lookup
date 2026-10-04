(function () {
    'use strict';

    /* =========================================================
     * SHARED GAME DATA
     * ========================================================= */

    var TIER_SCALER = Math.sqrt(10);
    var LEVEL_SCALER = 0.015;
    var relics = { maxLevel: 11 };

    /*
     * Normal gear:
     *
     * Common    = 0
     * Uncommon  = 1
     * ...
     * Divine    = 9
     */
    var tiers = [
        { name: 'Common',    value: 0 },
        { name: 'Uncommon',  value: 1 },
        { name: 'Rare',      value: 2 },
        { name: 'Epic',      value: 3 },
        { name: 'Legendary', value: 4 },
        { name: 'Mythic',    value: 5 },
        { name: 'Artifact',  value: 6 },
        { name: 'Ancient',   value: 7 },
        { name: 'Immortal',  value: 8 },
        { name: 'Divine',    value: 9 }
    ];

    /*
     * Cape rarity multipliers.
     *
     * Only tiers for which we currently have confirmed data
     * are included.
     */
    var capeTiers = [
        { name: 'Common',    value: 'common',    multiplier: 1 },
        { name: 'Uncommon',  value: 'uncommon',  multiplier: 2 },
        { name: 'Rare',      value: 'rare',      multiplier: 3 },
        { name: 'Epic',      value: 'epic',      multiplier: 4 },
        { name: 'Legendary', value: 'legendary', multiplier: 6 },
        { name: 'Mythic',    value: 'mythic',    multiplier: 10 }
    ];

    /*
     * Normal gear.
     *
     * If the game/wiki calls "Backpack" something else,
     * only change the "name" text below.
     */
    var gear = [
        {
            id: 'weapon',
            name: 'Weapon',
            stat: 'damage',
            weapon: true
        },
        {
            id: 'helmet',
            name: 'Helmet',
            stat: 'health',
            base: 45
        },
        {
            id: 'gloves',
            name: 'Gloves',
            stat: 'damage',
            base: 6
        },
        {
            id: 'backpack',
            name: 'Backpack',
            stat: 'health',
            base: 30
        },
        {
            id: 'necklace',
            name: 'Necklace',
            stat: 'health',
            base: 20
        },
        {
            id: 'ring',
            name: 'Ring',
            stat: 'damage',
            base: 6
        }
    ];

    var weaponTypes = [
        { name: 'Melee',  value: 9 },
        { name: 'Ranged', value: 7 }
    ];

    var wings = {
        health: 30,
        damage: 9,
        tierOffset: 1,
        maxLevel: 100
    };

    /* Pet growth inferred from sources/pets snapshot.txt; see sources/pet-formulas.md.
     * All pets start at level 1; calculate stats from the entered level. */
    var pets = [
        { rarity:'Common',    animal:'Monkey',           name:'Ember Fist',      icon:'ember-fist', level:1, damagePerLevel:0.5, healthPerLevel:1.5 },
        { rarity:'Common',    animal:'Sheep',            name:'Magic Wool',      icon:'magic-wool', level:1, damagePerLevel:0.25, healthPerLevel:2.5 },
        { rarity:'Common',    animal:'Mouse',            name:'Spark Mouse',     icon:'spark-mouse', level:1, damagePerLevel:0.75, healthPerLevel:1 },
        { rarity:'Uncommon',  animal:'Red bird',         name:'Flame Wing',      icon:'flame-wing', level:1, damagePerLevel:2.25, healthPerLevel:3 },
        { rarity:'Uncommon',  animal:'Deer',             name:'Life Horn',       icon:'life-horn', level:1, damagePerLevel:0.75, healthPerLevel:7.5 },
        { rarity:'Uncommon',  animal:'Snow Fox',         name:'Snow Fang',       icon:'snow-fang', level:1, damagePerLevel:1.5, healthPerLevel:4.5 },
        { rarity:'Rare',      animal:'Fire Fox',         name:'Blaze Tail',     icon:'blaze-tail', level:1, damagePerLevel:22.5, healthPerLevel:30 },
        { rarity:'Rare',      animal:'Polar Bear',       name:'Frost Claw',      icon:'frost-claw', level:1, damagePerLevel:7.5, healthPerLevel:75 },
        { rarity:'Rare',      animal:'Yellow cat horns', name:'Storm Eye',       icon:'storm-eye', level:1, damagePerLevel:15, healthPerLevel:45 },
        { rarity:'Epic',      animal:'Purple 3-eyed',    name:'Arcane Paw',      icon:'arcane-paw', level:1, damagePerLevel:225, healthPerLevel:300 },
        { rarity:'Epic',      animal:'Yeti',             name:'Glacier Fist',    icon:'glacier-fist', level:1, damagePerLevel:150, healthPerLevel:450 },
        { rarity:'Epic',      animal:'Green insect',     name:'Vital Root',      icon:'vital-root', level:1, damagePerLevel:75, healthPerLevel:750 },
        { rarity:'Legendary', animal:'Bat',              name:'Echo Wing',       icon:'echo-wing', level:1, damagePerLevel:2250, healthPerLevel:3000 },
        { rarity:'Legendary', animal:'Green elemental',  name:'Phantom Gaze',    icon:'phantom-gaze', level:1, damagePerLevel:1500, healthPerLevel:4500 },
        { rarity:'Legendary', animal:'Phoenix',          name:'Star Feather',    icon:'star-feather', level:1, damagePerLevel:750, healthPerLevel:7500 },
        { rarity:'Mythic',    animal:'Alien',            name:'Celestial Mind',  icon:'celestial-mind', level:1, damagePerLevel:6750, healthPerLevel:9000 },
        { rarity:'Mythic',    animal:'Rabbit',           name:'Halo Hare',       icon:'halo-hare', level:1, damagePerLevel:4500, healthPerLevel:13500 },
        { rarity:'Mythic',    animal:'Dragon',           name:'Radiant Talon',   icon:'radiant-talon', level:1, damagePerLevel:2250, healthPerLevel:22500 }
    ];

    /* =========================================================
     * SHARED FORMULAS
     *
     * Pure calculations: no DOM access or display rounding.
     * ========================================================= */

    function itemStat(baseStat, tier, level, tierOffset) {
        tierOffset = tierOffset || 0;

        return baseStat *
            Math.pow(TIER_SCALER, tier + tierOffset) *
            (1 + LEVEL_SCALER * level);
    }

    /*
     * Relic:
     *
     * Lv1  = +1%
     * Lv2  = +4%
     * ...
     * Lv11 = +121%
     */
    function relicBonusPercent(level) {
        return level * level;
    }

    function relicMultiplier(level) {
        return 1 + relicBonusPercent(level) / 100;
    }

    /*
     * Value expressed as number of level-1 relics.
     *
     * Lv1 = 1
     * Lv2 = 3
     * Lv3 = 9
     * ...
     */
    function relicValue(level) {
        if (level <= 0) {
            return 0;
        }

        return Math.pow(3, level - 1);
    }

    /*
     * Cape:
     *
     * Common:
     * Lv1   = 5.0%
     * Lv50  = 9.9%
     * Lv100 = 14.9%
     *
     * Other rarities multiply that base progression.
     */
    function capeBonus(rarity, level) {
        var multiplier = 1;

        capeTiers.forEach(function (tier) {
            if (tier.value === rarity) {
                multiplier = tier.multiplier;
            }
        });

        return ((49 + level) / 10) * multiplier;
    }

    /* Equipment helpers accept an optional relic level (default: empty). */
    function gearStat(baseStat, tier, level, relicLevel) {
        return itemStat(baseStat, tier, level) *
            relicMultiplier(relicLevel || 0);
    }

    /* Wings use the normal item formula with a +1 tier offset. */
    function wingsStats(tier, level, relicLevel) {
        level = Math.min(level, wings.maxLevel);
        var multiplier = relicMultiplier(relicLevel || 0);

        return {
            health: itemStat(wings.health, tier, level, wings.tierOffset) * multiplier,
            damage: itemStat(wings.damage, tier, level, wings.tierOffset) * multiplier
        };
    }

    /* A relic boosts the cape percentage, which applies to all other gear. */
    function capeStats(rarity, level, relicLevel) {
        var baseBonus = capeBonus(rarity, level);
        var effectiveBonus = baseBonus * relicMultiplier(relicLevel || 0);

        return {
            baseBonus: baseBonus,
            effectiveBonus: effectiveBonus,
            multiplier: 1 + effectiveBonus / 100
        };
    }

    /* Enchantment uses the same square-level bonus as relics. */
    function enchantmentBonus(baseValue, level) {
        return baseValue * relicBonusPercent(level || 0) / 100;
    }

    // Return unrounded stats. All observed pets follow coefficient * (level + 20).
    function petStats(pet, level) {
        var value = Number(level === undefined ? pet.level : level);
        var effectiveLevel = isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
        return {
            level: effectiveLevel,
            damage: effectiveLevel > 0 ? pet.damagePerLevel * (effectiveLevel + 20) : 0,
            health: effectiveLevel > 0 ? pet.healthPerLevel * (effectiveLevel + 20) : 0
        };
    }

    /*
     * Character totals. Equipment uses zero-based tiers and relicLevel
     * for the enchantment level; callers validate their input fields.
     * Pet levels use the shared growth formula and retain fractional stats.
     */
    function characterStats(loadout) {
        var result = { gear: {}, pets: [], gearDamage: 0, gearHealth: 0, petDamage: 0, petHealth: 0 };
        var selectedWeapon = loadout.weaponType === 'melee' ? weaponTypes[0] : weaponTypes[1];
        var bonuses = loadout.bonuses || {};

        function equipment(slot) {
            return (loadout.gear || {})[slot] || { tier: 0, level: 1, relicLevel: 0 };
        }

        gear.forEach(function (item) {
            var settings = equipment(item.id);
            var baseValue = item.weapon ? selectedWeapon.value : item.base;
            var base = itemStat(baseValue, settings.tier, settings.level);
            var total = gearStat(baseValue, settings.tier, settings.level, settings.relicLevel);

            result.gear[item.id] = {
                base: base,
                bonus: enchantmentBonus(base, settings.relicLevel),
                total: total
            };
            if (item.stat === 'health') {
                result.gearHealth += total;
            } else {
                result.gearDamage += total;
            }
        });

        var wingSettings = equipment('wings');
        var baseWings = wingsStats(wingSettings.tier, wingSettings.level);
        var totalWings = wingsStats(wingSettings.tier, wingSettings.level, wingSettings.relicLevel);
        result.wings = {
            base: baseWings,
            bonus: {
                health: enchantmentBonus(baseWings.health, wingSettings.relicLevel),
                damage: enchantmentBonus(baseWings.damage, wingSettings.relicLevel)
            },
            total: totalWings
        };
        result.gearHealth += totalWings.health;
        result.gearDamage += totalWings.damage;

        var capeSettings = loadout.cape || { rarity: 'common', level: 1, relicLevel: 0 };
        result.cape = capeStats(capeSettings.rarity, capeSettings.level, capeSettings.relicLevel);
        result.cape.bonus = enchantmentBonus(result.cape.baseBonus, capeSettings.relicLevel);

        pets.forEach(function (pet, index) {
            var stats = petStats(pet, (loadout.petLevels || [])[index]);
            result.pets.push(stats);
            if (!loadout.petsActive || loadout.petsActive[index]) {
                result.petDamage += stats.damage;
                result.petHealth += stats.health;
            }
        });

        var weaponBonus = loadout.weaponType === 'melee' ? bonuses.melee : bonuses.ranged;
        result.damageMultiplier = 1 + ((bonuses.damage || 0) + (weaponBonus || 0) +
            result.cape.effectiveBonus) / 100;
        result.healthMultiplier = 1 + ((bonuses.health || 0) + result.cape.effectiveBonus) / 100;
        result.damage = (result.gearDamage + result.petDamage) * result.damageMultiplier;
        result.health = (result.gearHealth + result.petHealth) * result.healthMultiplier;
        result.criticalDamage = result.damage * (105 + (bonuses.crit || 0)) / 100;
        return result;
    }

    // Fraction of damage received; both defense types use the same formula.
    function defenseMultiplier(defense) {
        var value = Number(defense);
        return 100 / (100 + Math.abs(isFinite(value) ? value : 0));
    }

    /*
     * Hit resolution from the supplied damage calculator.
     * Chances are percentages. Mega crit takes priority over crit;
     * triple hit takes priority over double hit.
     */
    function damageStats(input) {
        function number(key) {
            var value = Number(input[key]);
            return isFinite(value) ? Math.max(0, value) : 0;
        }

        function chance(key) {
            return Math.min(1, number(key) / 100);
        }

        var baseDamage = number('baseDamage');
        var defense = input.weaponType === 'melee' ? number('meleeDefense') : number('rangedDefense');
        var receivedMultiplier = defenseMultiplier(defense);
        var criticalDefense = Math.min(100, number('criticalDefense'));
        var criticalMultiplier = 1.05 + number('criticalDamage') / 100;
        var effectiveCriticalMultiplier = 1 + (criticalMultiplier - 1) * (1 - criticalDefense / 100);
        var megaChance = chance('megaChance');
        var critChance = (1 - megaChance) * chance('criticalChance');
        var normalChance = 1 - megaChance - critChance;
        var tripleChance = chance('tripleChance');
        var doubleChance = (1 - tripleChance) * chance('doubleChance');
        var singleChance = 1 - tripleChance - doubleChance;
        var expectedHitMultiplier = normalChance + critChance * effectiveCriticalMultiplier +
            megaChance * 2 * effectiveCriticalMultiplier;
        var expectedDamagePerHit = baseDamage * expectedHitMultiplier * receivedMultiplier;
        var expectedHits = tripleChance * 3 + doubleChance * 2 + singleChance;
        var targetHealth = number('targetHealth');
        var lethal = targetHealth > 0 && expectedDamagePerHit >= targetHealth;
        var appliedDamage = targetHealth > 0 ?
            Math.min(expectedDamagePerHit, targetHealth) : expectedDamagePerHit;

        return {
            defense: defense,
            criticalDefense: criticalDefense,
            criticalMultiplier: criticalMultiplier,
            effectiveCriticalMultiplier: effectiveCriticalMultiplier,
            normalHit: baseDamage * receivedMultiplier,
            criticalHit: baseDamage * effectiveCriticalMultiplier * receivedMultiplier,
            megaHit: baseDamage * 2 * effectiveCriticalMultiplier * receivedMultiplier,
            normalChance: normalChance,
            criticalChance: critChance,
            megaChance: megaChance,
            singleChance: singleChance,
            doubleChance: doubleChance,
            tripleChance: tripleChance,
            expectedHitMultiplier: expectedHitMultiplier,
            expectedDamagePerHit: expectedDamagePerHit,
            expectedHits: expectedHits,
            expectedDamagePerAttack: expectedHits * expectedDamagePerHit * (1 - chance('blockChance')),
            blockChance: chance('blockChance'),
            knockbackChance: chance('knockbackChance'),
            appliedDamage: appliedDamage,
            lethal: lethal,
            lifestealHeal: expectedDamagePerHit * chance('lifesteal'),
            thornsReflect: lethal ? 0 : appliedDamage * chance('thorns')
        };
    }

    /* Normalize both stats to the shared wings ratio: 30 health = 9 damage. */
    function powerScore(health, damage) {
        return health / wings.health + damage / wings.damage;
    }

    /*
     * Exact relic allocation for the entered equipment, excluding pets/bonuses.
     * A level-L relic costs 3^(L-1) level-1 equivalents (empty costs zero).
     *
     * Within damage-only or health-only gear, larger relics always belong on
     * larger base stats. Enumerate those sorted assignments and retain only
     * states whose gain improves on all cheaper states. For every wings/cape
     * pair, scan damage states against the best affordable health state.
     * This covers the optimum without enumerating all 12^8 assignments.
     */
    function recommendRelics(loadout, objective, spareValue) {
        objective = objective || 'power';
        if (['power', 'damage', 'health'].indexOf(objective) === -1) {
            throw new Error('Choose a valid distribution objective.');
        }

        var healthItems = [];
        var damageItems = [];
        var current = {};
        var budget = spareValue === undefined ? 0 : spareValue;
        var currentValue = 0;
        var baseHealth = 0;
        var baseDamage = 0;
        var costs = [];
        var bonuses = [];
        var capeMultipliers = [];
        var level;

        if (!isFinite(budget) || budget < 0 || Math.floor(budget) !== budget) {
            throw new Error('Unassigned relic value must be a non-negative whole number.');
        }

        function settings(id) {
            return (loadout.gear || {})[id] || { tier: 0, level: 1, relicLevel: 0 };
        }

        function rememberRelic(id, value) {
            value = value === undefined ? 0 : value;
            if (!isFinite(value) || Math.floor(value) !== value || value < 0 || value > relics.maxLevel) {
                throw new Error('Relic levels must be between 0 and ' + relics.maxLevel + '.');
            }
            current[id] = value;
            currentValue += relicValue(value);
        }

        gear.forEach(function (item, index) {
            var input = settings(item.id);
            var base = item.weapon ?
                (loadout.weaponType === 'melee' ? weaponTypes[0].value : weaponTypes[1].value) : item.base;
            var raw = itemStat(base, input.tier, input.level);
            if (!isFinite(raw) || raw < 0) {
                throw new Error('Enter valid gear tiers and levels before distributing relics.');
            }
            rememberRelic(item.id, input.relicLevel);
            var entry = { id: item.id, base: raw, index: index };
            if (item.stat === 'health') {
                healthItems.push(entry);
                baseHealth += raw;
            } else {
                damageItems.push(entry);
                baseDamage += raw;
            }
        });

        var wingInput = settings('wings');
        var wingBase = wingsStats(wingInput.tier, wingInput.level);
        var capeInput = loadout.cape || { rarity: 'common', level: 1, relicLevel: 0 };
        rememberRelic('wings', wingInput.relicLevel);
        rememberRelic('cape', capeInput.relicLevel);
        budget += currentValue;
        if (!isFinite(budget) || budget > Number.MAX_SAFE_INTEGER) {
            throw new Error('The relic budget is too large.');
        }

        baseHealth += wingBase.health;
        baseDamage += wingBase.damage;
        for (level = 0; level <= relics.maxLevel; level++) {
            costs[level] = relicValue(level);
            bonuses[level] = relicBonusPercent(level) / 100;
            capeMultipliers[level] = capeStats(capeInput.rarity, capeInput.level, level).multiplier;
        }

        function totals(healthGain, damageGain, wingLevel, capeLevel) {
            var multiplier = capeMultipliers[capeLevel];
            var health = (baseHealth + healthGain + wingBase.health * bonuses[wingLevel]) * multiplier;
            var damage = (baseDamage + damageGain + wingBase.damage * bonuses[wingLevel]) * multiplier;
            return {
                health: health,
                damage: damage,
                score: objective === 'health' ? health : objective === 'damage' ? damage : powerScore(health, damage),
                secondary: objective === 'health' ? damage : objective === 'damage' ? health : 0
            };
        }

        function currentGain(items) {
            return items.reduce(function (sum, item) {
                return sum + item.base * bonuses[current[item.id]];
            }, 0);
        }

        var before = totals(currentGain(healthItems), currentGain(damageItems), current.wings, current.cape);
        if (!isFinite(before.health) || !isFinite(before.damage) || !isFinite(before.score) ||
                before.health < 0 || before.damage < 0) {
            throw new Error('Enter finite, non-negative equipment stats before distributing relics.');
        }
        var best = { levels: current, value: currentValue, totals: before, changes: 0 };

        function frontier(items) {
            items.sort(function (a, b) {
                return b.base - a.base || current[b.id] - current[a.id] || a.index - b.index;
            });
            var states = [];
            var levels = [];

            function visit(index, maximum, value, gain, changes) {
                if (index === items.length) {
                    states.push({ value: value, gain: gain, levels: levels.slice(), changes: changes });
                    return;
                }
                for (var relicLevel = 0; relicLevel <= maximum; relicLevel++) {
                    var nextValue = value + costs[relicLevel];
                    if (nextValue > budget) {
                        break;
                    }
                    levels[index] = relicLevel;
                    visit(index + 1, relicLevel, nextValue, gain + items[index].base * bonuses[relicLevel],
                        changes + (current[items[index].id] === relicLevel ? 0 : 1));
                }
            }
            visit(0, relics.maxLevel, 0, 0, 0);
            states.sort(function (a, b) {
                return a.value - b.value || b.gain - a.gain || a.changes - b.changes;
            });
            var result = [];
            var maximumGain = -1;
            states.forEach(function (state) {
                if (state.gain > maximumGain) {
                    result.push(state);
                    maximumGain = state.gain;
                }
            });
            return result;
        }

        var healthStates = frontier(healthItems);
        var damageStates = frontier(damageItems);

        // Treat floating-point roundoff as a tie, not an improvement.
        function compare(a, b) {
            var tolerance = 1e-12 * Math.max(1, Math.abs(a), Math.abs(b));
            return a > b + tolerance ? 1 : a < b - tolerance ? -1 : 0;
        }

        for (var capeLevel = 0; capeLevel <= relics.maxLevel; capeLevel++) {
            for (var wingLevel = 0; wingLevel <= relics.maxLevel; wingLevel++) {
                var available = budget - costs[capeLevel] - costs[wingLevel];
                if (available < 0) {
                    break;
                }
                var healthIndex = healthStates.length - 1;
                for (var damageIndex = 0; damageIndex < damageStates.length; damageIndex++) {
                    var damageState = damageStates[damageIndex];
                    while (healthIndex >= 0 && healthStates[healthIndex].value + damageState.value > available) {
                        healthIndex--;
                    }
                    if (healthIndex < 0) {
                        break;
                    }
                    var healthState = healthStates[healthIndex];
                    var candidate = totals(healthState.gain, damageState.gain, wingLevel, capeLevel);
                    var value = healthState.value + damageState.value + costs[wingLevel] + costs[capeLevel];
                    var changes = healthState.changes + damageState.changes +
                        (current.wings === wingLevel ? 0 : 1) + (current.cape === capeLevel ? 0 : 1);
                    var comparison = compare(candidate.score, best.totals.score) ||
                        compare(candidate.secondary, best.totals.secondary);
                    if (comparison > 0 || (comparison === 0 &&
                            (value < best.value || (value === best.value && changes < best.changes)))) {
                        var distribution = { wings: wingLevel, cape: capeLevel };
                        healthItems.forEach(function (item, index) {
                            distribution[item.id] = healthState.levels[index];
                        });
                        damageItems.forEach(function (item, index) {
                            distribution[item.id] = damageState.levels[index];
                        });
                        best = { levels: distribution, value: value, totals: candidate, changes: changes };
                    }
                }
            }
        }

        return {
            objective: objective,
            levels: best.levels,
            budget: budget,
            usedValue: best.value,
            remainingValue: budget - best.value,
            health: best.totals.health,
            damage: best.totals.damage,
            score: best.totals.score,
            before: { health: before.health, damage: before.damage, score: before.score }
        };
    }

    /* =========================================================
     * SHARED UI HELPERS
     * ========================================================= */

    /* Shared controls and output helpers, scoped to each calculator's container. */
    function calculatorUI(root) {
        function element(name) {
            return root.querySelector('#dr-' + name);
        }

        function number(name, minimum, integer) {
            var value = parseFloat(element(name).value);
            if (!isFinite(value)) {
                value = minimum === undefined ? 0 : minimum;
            }
            if (integer) {
                value = Math.floor(value);
            }
            return minimum === undefined ? value : Math.max(minimum, value);
        }

        function output(name, value) {
            element(name).textContent = value;
        }

        function field(name, label, value, minimum, step) {
            return '<label for="dr-' + name + '">' + label +
                '<input class="gear-calc-input" type="number" id="dr-' + name + '"' +
                ' value="' + value + '" step="' + (step || '0.01') + '"' +
                (minimum === undefined ? '' : ' min="' + minimum + '"') + '></label>';
        }

        function weaponField(name) {
            return '<label for="dr-' + name + '">Weapon type' +
                '<select id="dr-' + name + '">' +
                weaponTypes.map(function (type) {
                    var key = type.name.toLowerCase();
                    return '<option value="' + key + '"' + (key === 'ranged' ? ' selected' : '') +
                        '>' + type.name + '</option>';
                }).join('') + '</select></label>';
        }

        function detail(label, name) {
            return '<div>' + label + ': <span id="dr-' + name + '">0</span></div>';
        }

        function card(label, name, details, compact) {
            return '<div class="gear-calc-result"><span>' + label + '</span>' +
                '<strong id="dr-' + name + '">0</strong>' +
                (compact ? '<small id="dr-' + name + '-compact"></small>' : '') +
                '<div class="gear-calc-breakdown">' + details + '</div></div>';
        }

        return { element: element, number: number, output: output, field: field,
            weaponField: weaponField, detail: detail, card: card };
    }

    function makeOptions(options) {
        return options.map(function (option) {
            return '<option value="' + option.value + '">' + option.name + '</option>';
        }).join('');
    }

    function formatNumber(value, decimals) {
        if (!isFinite(value)) {
            return '\u2013';
        }
        if (decimals === undefined) {
            decimals = 2;
        }
        return value.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    function formatCompact(value) {
        var magnitude = Math.abs(value);
        var divisor = magnitude >= 1e9 ? 1e9 : magnitude >= 1e6 ? 1e6 : magnitude >= 1e3 ? 1e3 : 0;
        var suffix = divisor === 1e9 ? 'B' : divisor === 1e6 ? 'M' : 'K';
        return divisor ? (value / divisor).toLocaleString('en-US', { maximumFractionDigits: 2 }) + suffix : '';
    }

    /* Available to every calculator, even on pages without the relic UI. */
    var dungeonRush = window.DungeonRush = window.DungeonRush || {};

    dungeonRush.data = {
        tiers: tiers,
        capeTiers: capeTiers,
        gear: gear,
        weaponTypes: weaponTypes,
        wings: wings,
        pets: pets,
        relics: relics
    };

    dungeonRush.formulas = {
        itemStat: itemStat,
        gearStat: gearStat,
        wingsStats: wingsStats,
        capeBonus: capeBonus,
        capeStats: capeStats,
        relicBonusPercent: relicBonusPercent,
        relicMultiplier: relicMultiplier,
        relicValue: relicValue,
        enchantmentBonus: enchantmentBonus,
        characterStats: characterStats,
        petStats: petStats,
        damageStats: damageStats,
        defenseMultiplier: defenseMultiplier,
        recommendRelics: recommendRelics,
        powerScore: powerScore
    };

    /* =========================================================
     * RELIC CALCULATOR UI
     * ========================================================= */

    function initRelicCalculator() {
        var root = document.getElementById('relic-calculator');

        if (!root) {
            return;
        }

        if (root.getAttribute('data-initialized') === 'true') {
            return;
        }

        root.setAttribute('data-initialized', 'true');
        root.classList.add('dr-calculator');

        /* =========================================================
         * HTML HELPERS
         * ========================================================= */

        function makeRelicOptions() {
            var html =
                '<option value="0">Empty (+0%)</option>';

            var level;

            for (level = 1; level <= relics.maxLevel; level++) {
                html +=
                    '<option value="' + level + '">' +
                    'Lv. ' + level +
                    ' (+' + relicBonusPercent(level) + '%)' +
                    '</option>';
            }

            return html;
        }

        var tierOptions = makeOptions(tiers);
        var capeTierOptions = makeOptions(capeTiers);
        var relicOptions = makeRelicOptions();

        /* =========================================================
         * BUILD NORMAL GEAR ROWS
         * ========================================================= */

        var rows = '';

        gear.forEach(function (item) {
            var extra = '';

            if (item.weapon) {
                extra =
                    '<div class="gear-calc-weapon-type" role="radiogroup" aria-label="Weapon type">' +
                        '<label><input type="radio" name="gear-calc-weapon-type" value="ranged" checked>Ranged</label>' +
                        '<label><input type="radio" name="gear-calc-weapon-type" value="melee">Melee</label>' +
                    '</div>';
            }

            rows +=
                '<tr>' +
                    '<th scope="row">' +
                        '<div>' + item.name + '</div>' +
                        extra +
                    '</th>' +
                    '<td>' +
                        '<select ' +
                            'class="gear-calc-tier" ' +
                            'data-slot="' + item.id + '">' +
                            tierOptions +
                        '</select>' +
                    '</td>' +
                    '<td>' +
                        '<input ' +
                            'class="gear-calc-input gear-calc-level" ' +
                            'type="number" ' +
                            'min="1" ' +
                            'step="1" ' +
                            'value="1" ' +
                            'data-slot="' + item.id + '">' +
                    '</td>' +
                    '<td>' +
                        '<select ' +
                            'class="gear-calc-relic" ' +
                            'data-slot="' + item.id + '">' +
                            relicOptions +
                        '</select>' +
                    '</td>' +
                    '<td ' +
                        'class="gear-calc-stat" ' +
                        'id="gear-calc-result-' + item.id + '">' +
                        '—' +
                    '</td>' +
                '</tr>';
        });

        /* =========================================================
         * WINGS
         * ========================================================= */

        rows +=
            '<tr>' +
                '<th scope="row">Wings<small class="gear-calc-note">Level cap: ' + wings.maxLevel + '</small></th>' +
                '<td>' +
                    '<select id="gear-calc-wings-tier">' +
                        tierOptions +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<input ' +
                        'id="gear-calc-wings-level" ' +
                        'max="' + wings.maxLevel + '" ' +
                        'class="gear-calc-input" ' +
                        'type="number" ' +
                        'min="1" ' +
                        'step="1" ' +
                        'value="1">' +
                '</td>' +
                '<td>' +
                    '<select ' +
                        'id="gear-calc-wings-relic" ' +
                        'class="gear-calc-relic">' +
                        relicOptions +
                    '</select>' +
                '</td>' +
                '<td ' +
                    'class="gear-calc-stat" ' +
                    'id="gear-calc-result-wings">' +
                    '—' +
                '</td>' +
            '</tr>';

        /* =========================================================
         * CAPE
         * ========================================================= */

        rows +=
            '<tr>' +
                '<th scope="row">Cape</th>' +
                '<td>' +
                    '<select id="gear-calc-cape-tier">' +
                        capeTierOptions +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<input ' +
                        'id="gear-calc-cape-level" ' +
                        'class="gear-calc-input" ' +
                        'type="number" ' +
                        'min="1" ' +
                        'step="1" ' +
                        'value="1">' +
                '</td>' +
                '<td>' +
                    '<select ' +
                        'id="gear-calc-cape-relic" ' +
                        'class="gear-calc-relic">' +
                        relicOptions +
                    '</select>' +
                '</td>' +
                '<td ' +
                    'class="gear-calc-stat" ' +
                    'id="gear-calc-result-cape">' +
                    '—' +
                '</td>' +
            '</tr>';

        /* =========================================================
         * MAIN HTML
         * ========================================================= */

        root.innerHTML =
            '<div class="gear-calc">' +
                '<table class="gear-calc-table gear-calc-equipment">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>Item</th>' +
                            '<th><div class="gear-calc-tier-heading">Tier' +
                                '<select id="gear-calc-all-tiers" aria-label="Set all gear tiers (except cape)" title="Set all gear tiers (except cape)">' +
                                    '<option value="" disabled>Mixed</option>' + tierOptions +
                                '</select>' +
                            '</div></th>' +
                            '<th>Level</th>' +
                            '<th>Relic</th>' +
                            '<th>Calculated stat</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                        rows +
                    '</tbody>' +
                '</table>' +
                '<div class="gear-calc-actions gear-calc-distribution">' +
                    '<label for="gear-calc-objective">Optimize for' +
                        '<select id="gear-calc-objective">' +
                            '<option value="power">Most power</option>' +
                            '<option value="damage">Most Damage</option>' +
                            '<option value="health">Most Health</option>' +
                        '</select>' +
                    '</label>' +
                    '<button type="button" class="wds-button gear-calc-primary" id="gear-calc-recommend">Recommended distribution</button>' +
                '</div>' +
                '<p class="gear-calc-note">Most power uses the wings ratio: Health / ' + wings.health + ' + Damage / ' + wings.damage + '. ' +
                    'Relics can be split or merged at 3:1; gear stays unchanged.</p>' +
                '<p class="gear-calc-note" id="gear-calc-recommend-status" role="status" aria-live="polite"></p>' +
                '<p class="gear-calc-note" id="gear-calc-unassigned" hidden></p>' +
                '<div class="gear-calc-results">' +
                    '<div class="gear-calc-result">' +
                        '<span>Total Health</span>' +
                        '<strong id="gear-calc-total-health">0</strong>' +
                    '</div>' +
                    '<div class="gear-calc-result">' +
                        '<span>Total Damage</span>' +
                        '<strong id="gear-calc-total-damage">0</strong>' +
                    '</div>' +
                    '<div class="gear-calc-result">' +
                        '<span>Relic Value</span>' +
                        '<strong id="gear-calc-relic-value">0</strong>' +
                        '<small>level-1 relic equivalents</small>' +
                    '</div>' +
                '</div>' +
            '</div>';

        /* =========================================================
         * INPUT HELPERS
         * ========================================================= */

        function getLevel(selector) {
            var element = root.querySelector(selector);

            if (!element) {
                return 1;
            }

            var value = parseInt(element.value, 10);

            if (isNaN(value) || value < 1) {
                return 1;
            }

            return value;
        }

        function getInteger(selector) {
            var element = root.querySelector(selector);

            if (!element) {
                return 0;
            }

            return parseInt(element.value, 10) || 0;
        }

        function getValue(selector) {
            var element = root.querySelector(selector);

            if (!element) {
                return '';
            }

            return element.value;
        }

        /* =========================================================
         * DISPLAY HELPERS
         * ========================================================= */

        function formatStat(value) {
            return Math.round(value).toLocaleString();
        }

        function formatPercent(value) {
            var rounded = Math.round(value * 100) / 100;

            return rounded.toLocaleString() + '%';
        }

        /* =========================================================
         * CALCULATION
         * ========================================================= */

        function calculate() {
            var health = 0;
            var damage = 0;
            var totalRelicValue = 0;

            /* -----------------------------------------------------
             * NORMAL GEAR
             * ----------------------------------------------------- */

            gear.forEach(function (item) {
                var tier = getInteger(
                    '.gear-calc-tier[data-slot="' +
                    item.id +
                    '"]'
                );

                var level = getLevel(
                    '.gear-calc-level[data-slot="' +
                    item.id +
                    '"]'
                );

                var relicLevel = getInteger(
                    '.gear-calc-relic[data-slot="' +
                    item.id +
                    '"]'
                );

                var baseStat = item.base;

                if (item.weapon) {
                    baseStat = weaponTypes[getWeaponType() === 'melee' ? 0 : 1].value;
                }

                var finalStat = gearStat(
                    baseStat,
                    tier,
                    level,
                    relicLevel
                );

                totalRelicValue += relicValue(relicLevel);

                if (item.stat === 'health') {
                    health += finalStat;
                } else {
                    damage += finalStat;
                }

                var result =
                    root.querySelector(
                        '#gear-calc-result-' + item.id
                    );

                result.textContent =
                    (item.stat === 'health'
                        ? 'Health: '
                        : 'Damage: ') +
                    formatStat(finalStat);
            });

            /* -----------------------------------------------------
             * WINGS
             * ----------------------------------------------------- */

            var wingsTier =
                getInteger('#gear-calc-wings-tier');

            var wingsLevel =
                getLevel('#gear-calc-wings-level');

            var wingsRelic =
                getInteger('#gear-calc-wings-relic');

            var calculatedWings =
                wingsStats(wingsTier, wingsLevel, wingsRelic);

            health += calculatedWings.health;
            damage += calculatedWings.damage;

            totalRelicValue +=
                relicValue(wingsRelic);

            root.querySelector(
                '#gear-calc-result-wings'
            ).innerHTML =
                '<div>Health: ' +
                    formatStat(calculatedWings.health) +
                '</div>' +
                '<div>Damage: ' +
                    formatStat(calculatedWings.damage) +
                '</div>';

            /* -----------------------------------------------------
             * CAPE
             *
             * Cape adds a percentage of all other health/damage.
             *
             * Relic boosts the cape's percentage itself.
             * ----------------------------------------------------- */

            var capeTier =
                getValue('#gear-calc-cape-tier');

            var capeLevel =
                getLevel('#gear-calc-cape-level');

            var capeRelic =
                getInteger('#gear-calc-cape-relic');

            var calculatedCape =
                capeStats(capeTier, capeLevel, capeRelic);

            totalRelicValue +=
                relicValue(capeRelic);

            root.querySelector(
                '#gear-calc-result-cape'
            ).innerHTML =
                '<div>Base: ' +
                    formatPercent(calculatedCape.baseBonus) +
                '</div>' +
                '<div>With relic: ' +
                    formatPercent(calculatedCape.effectiveBonus) +
                '</div>';

            /*
             * Cape applies after all other equipment has been added.
             */
            health *= calculatedCape.multiplier;
            damage *= calculatedCape.multiplier;

            /* -----------------------------------------------------
             * TOTALS
             * ----------------------------------------------------- */

            root.querySelector(
                '#gear-calc-total-health'
            ).textContent =
                formatStat(health);

            root.querySelector(
                '#gear-calc-total-damage'
            ).textContent =
                formatStat(damage);

            root.querySelector(
                '#gear-calc-relic-value'
            ).textContent =
                totalRelicValue.toLocaleString();
        }

        /* =========================================================
         * EVENTS
         * ========================================================= */

        var unassignedRelicValue = 0;
        var highlightTimer;
        var allTiers = root.querySelector('#gear-calc-all-tiers');
        var gearTiers = root.querySelectorAll('.gear-calc-tier, #gear-calc-wings-tier');
        var recommendationStatus = root.querySelector('#gear-calc-recommend-status');
        var unassignedStatus = root.querySelector('#gear-calc-unassigned');

        function showUnassigned() {
            unassignedStatus.hidden = unassignedRelicValue === 0;
            unassignedStatus.textContent = 'Unassigned relic value: ' + unassignedRelicValue.toLocaleString() +
                ' level-1 equivalents. Included in your next recommendation; editing a relic resets this reserve.';
        }

        function getWeaponType() {
            return getValue('input[name="gear-calc-weapon-type"]:checked') || 'ranged';
        }

        function syncAllTiers() {
            var tier = gearTiers[0].value;
            Array.prototype.forEach.call(gearTiers, function (select) {
                if (select.value !== tier) {
                    tier = '';
                }
            });
            allTiers.value = tier;
        }

        function highlightRelics() {
            window.clearTimeout(highlightTimer);
            root.classList.add('gear-calc-relics-updated');
            highlightTimer = window.setTimeout(function () {
                root.classList.remove('gear-calc-relics-updated');
            }, 3000);
        }

        function readRelicLoadout() {
            var loadout = {
                weaponType: getWeaponType(),
                gear: {},
                cape: {
                    rarity: getValue('#gear-calc-cape-tier'),
                    level: getLevel('#gear-calc-cape-level'),
                    relicLevel: getInteger('#gear-calc-cape-relic')
                }
            };
            gear.forEach(function (item) {
                var slot = '[data-slot="' + item.id + '"]';
                loadout.gear[item.id] = {
                    tier: getInteger('.gear-calc-tier' + slot),
                    level: getLevel('.gear-calc-level' + slot),
                    relicLevel: getInteger('.gear-calc-relic' + slot)
                };
            });
            loadout.gear.wings = {
                tier: getInteger('#gear-calc-wings-tier'),
                level: getLevel('#gear-calc-wings-level'),
                relicLevel: getInteger('#gear-calc-wings-relic')
            };
            return loadout;
        }

        root.querySelector('#gear-calc-recommend').addEventListener('click', function () {
            var result;
            try {
                result = recommendRelics(readRelicLoadout(), getValue('#gear-calc-objective'), unassignedRelicValue);
            } catch (error) {
                recommendationStatus.textContent = error.message;
                return;
            }

            // Apply only the relic choices. Gear and weapon inputs are untouched.
            gear.forEach(function (item) {
                root.querySelector('.gear-calc-relic[data-slot="' + item.id + '"]').value = result.levels[item.id];
            });
            root.querySelector('#gear-calc-wings-relic').value = result.levels.wings;
            root.querySelector('#gear-calc-cape-relic').value = result.levels.cape;
            unassignedRelicValue = result.remainingValue;
            calculate();
            showUnassigned();

            if (result.budget === 0) {
                recommendationStatus.textContent = 'No relics to distribute. Select your current relics first.';
                return;
            }

            highlightRelics();
            var gain = result.before.score > 0 ? (result.score / result.before.score - 1) * 100 : 0;
            var target = result.objective === 'power' ? 'Power (Health / ' + wings.health + ' + Damage / ' + wings.damage + ')' :
                result.objective === 'damage' ? 'Damage' : 'Health';
            recommendationStatus.textContent = target + ': +' + formatPercent(Math.max(0, gain)) +
                '. Assigned ' + result.usedValue.toLocaleString() + ' of ' +
                result.budget.toLocaleString() + ' level-1 relic equivalents.';
        });

        function handleInput(event) {
            if (event.target === allTiers && allTiers.value !== '') {
                Array.prototype.forEach.call(gearTiers, function (select) {
                    select.value = allTiers.value;
                });
            }
            syncAllTiers();
            if (event.target.classList.contains('gear-calc-relic')) {
                // Manual relic edits define a new inventory, rather than adding to the old one.
                unassignedRelicValue = 0;
            }
            recommendationStatus.textContent = '';
            showUnassigned();
            calculate();
        }

        root.addEventListener('input', handleInput);
        root.addEventListener('change', handleInput);

        syncAllTiers();
        calculate();
    }

    /* =========================================================
     * INDEPENDENT STAT AND DAMAGE CALCULATOR UIs
     *
     * Article roots: stat-calculator and damage-calculator.
     * dungeon-rush-calculator remains a legacy alias for the stat calculator.
     * ========================================================= */

    function initStatCalculator() {
        var root = document.getElementById('stat-calculator') || document.getElementById('dungeon-rush-calculator');
        if (!root || root.getAttribute('data-initialized') === 'true') {
            return;
        }
        root.classList.add('dr-calculator');

        var ui = calculatorUI(root);
        var element = ui.element, number = ui.number, output = ui.output;
        var field = ui.field, weaponField = ui.weaponField, detail = ui.detail, card = ui.card;

        function equipmentRow(id, label, options, minimum, maximum) {
            var prefix = 'dr-stat-' + id;
            return '<tr><th scope="row">' + label + '</th>' +
                '<td><select id="' + prefix + '-tier" aria-label="' + id + ' tier">' +
                makeOptions(options) + '</select></td>' +
                '<td><input class="gear-calc-input" type="number" id="' + prefix + '-level"' +
                ' aria-label="' + id + ' level" min="' + minimum + '" step="1" value="1"' +
                (maximum ? ' max="' + maximum + '"' : '') + '></td>' +
                '<td><input class="gear-calc-input" type="number" id="' + prefix + '-enchantment"' +
                ' aria-label="' + id + ' enchantment" min="0" step="1" value="0"></td>' +
                '<td class="gear-calc-stat" id="' + prefix + '-result"></td></tr>';
        }

        var equipmentRows = gear.map(function (item) {
            return equipmentRow(item.id, item.name, tiers, 1);
        }).join('');
        equipmentRows += equipmentRow('wings',
            'Wings<small class="gear-calc-note">Level cap: ' + wings.maxLevel + '</small>',
            tiers, 1, wings.maxLevel);
        equipmentRows += equipmentRow('cape', 'Cape (cloak)', capeTiers, 1);

        var bonusFields = [
            ['damage', 'Damage (%)'], ['health', 'Health (%)'], ['ranged', 'Ranged (%)'],
            ['melee', 'Melee (%)'], ['crit', 'Critical damage (%)']
        ];

        var lastPetLevels = pets.map(function (pet) { return pet.level; });
        var petTiles = pets.map(function (pet, index) {
            return '<div class="gear-calc-pet" id="dr-pet-tile-' + index + '" role="group"' +
                    ' aria-labelledby="dr-pet-name-' + index + '">' +
                '<input class="gear-calc-pet-active" type="checkbox" id="dr-pet-' + index + '" checked' +
                    ' data-pet-toggle="' + index + '" aria-label="Include ' + pet.name + '">' +
                '<label class="gear-calc-pet-portrait" for="dr-pet-' + index + '">' +
                    '<span class="dr-calc-icon dr-calc-icon-' + pet.icon + '" aria-hidden="true"></span></label>' +
                '<input type="number" id="dr-pet-level-' + index + '" min="0" step="1" value="' + pet.level + '"' +
                    ' data-pet-level="' + index + '" aria-label="' + pet.name + ' level"' +
                    ' aria-describedby="dr-pet-details-' + index + '">' +
                '<label class="gear-calc-note" id="dr-pet-name-' + index + '" for="dr-pet-level-' + index + '">' + pet.name + '</label>' +
                '<span id="dr-pet-details-' + index + '" hidden>' + pet.rarity + '. Damage: ' +
                    '<span id="dr-pet-damage-' + index + '"></span>. Health: ' +
                    '<span id="dr-pet-health-' + index + '"></span>.</span></div>';
        }).join('');

        root.innerHTML = '<div class="gear-calc">' +
                '<section class="gear-calc-section"><h3>Bonuses</h3>' +
                    '<p>Additional percentage bonuses from talents, runes, guild, and other sources.</p>' +
                    '<div class="gear-calc-fields">' + weaponField('stat-weapon') +
                    bonusFields.map(function (definition) {
                        return field('bonus-' + definition[0], definition[1], 0);
                    }).join('') + '</div></section>' +
                '<section class="gear-calc-section"><h3>Gear, wings, and cape</h3>' +
                    '<p>Enter the tier, level, and enchantment for each slot. Wings provide both stats; ' +
                        'the cape adds a percentage bonus.</p>' +
                    '<div class="gear-calc-scroll"><table class="gear-calc-table gear-calc-equipment gear-calc-stat-equipment">' +
                        '<thead><tr><th scope="col">Item</th><th scope="col">Tier</th>' +
                            '<th scope="col">Level</th><th scope="col">Enchantment</th>' +
                            '<th scope="col">Calculated stat</th></tr></thead>' +
                        '<tbody>' + equipmentRows + '</tbody></table></div></section>' +
                '<section class="gear-calc-section" id="dr-pet-section"><h3>Pets</h3>' +
                    '<p class="gear-calc-note">Set pet levels below. Level 0 switches a pet off; uncheck to temporarily exclude it.</p>' +
                    '<div class="gear-calc-actions">' +
                        '<button type="button" id="dr-pets-all">Select all</button>' +
                        '<button type="button" id="dr-pets-none">Deselect all</button></div>' +
                    '<div class="gear-calc-pets">' + petTiles + '</div>' +
                    '<div class="gear-calc-pet-totals" aria-label="Selected pet totals">' +
                        '<span>Selected pets — Damage: <strong id="dr-pets-damage"></strong></span>' +
                        '<span>Health: <strong id="dr-pets-health"></strong></span></div></section>' +
                '<section class="gear-calc-section"><h3>Totals</h3>' +
                    '<div class="gear-calc-results">' +
                    card('Total Damage', 'total-damage',
                        detail('Gear', 'gear-damage') + detail('Pets', 'pet-damage') +
                        detail('Multiplier', 'damage-multiplier'), true) +
                    card('Total Health', 'total-health',
                        detail('Gear', 'gear-health') + detail('Pets', 'pet-health') +
                        detail('Multiplier', 'health-multiplier'), true) +
                    card('Damage on critical hit', 'total-critical',
                        'Base: 105% + critical damage bonus', true) +
                    '</div></section>' +
            '</div>';

        var lastTotals;

        function readEquipment(id) {
            return {
                tier: number('stat-' + id + '-tier', 0, true),
                level: number('stat-' + id + '-level', 1, true),
                relicLevel: number('stat-' + id + '-enchantment', 0, true)
            };
        }

        function breakdown(label, base, bonus, total, percent, extra) {
            var suffix = percent ? '%' : '';
            return '<div>Base ' + label.toLowerCase() + ': ' + formatNumber(base) + suffix +
                ' + ' + formatNumber(bonus) + suffix + '</div>' +
                '<div><b>Total: ' + formatNumber(total) + suffix + '</b></div>' +
                (extra ? '<div>(' + extra + ')</div>' : '');
        }

        function calculateStats() {
            var loadout = { weaponType: element('stat-weapon').value, gear: {}, bonuses: {}, petsActive: [], petLevels: [] };
            gear.forEach(function (item) {
                loadout.gear[item.id] = readEquipment(item.id);
            });
            loadout.gear.wings = readEquipment('wings');
            loadout.cape = {
                rarity: element('stat-cape-tier').value,
                level: number('stat-cape-level', 1, true),
                relicLevel: number('stat-cape-enchantment', 0, true)
            };
            bonusFields.forEach(function (definition) {
                loadout.bonuses[definition[0]] = number('bonus-' + definition[0]);
            });
            pets.forEach(function (pet, index) {
                var level = number('pet-level-' + index, 0, true);
                var checkbox = element('pet-' + index);
                if (level === 0) {
                    checkbox.checked = false;
                }
                loadout.petsActive[index] = checkbox.checked;
                loadout.petLevels[index] = level;
                element('pet-tile-' + index).classList.toggle('is-inactive', !checkbox.checked);
            });

            lastTotals = characterStats(loadout);
            gear.forEach(function (item) {
                var stats = lastTotals.gear[item.id];
                element('stat-' + item.id + '-result').innerHTML = breakdown(
                    item.stat === 'health' ? 'Health' : 'Damage', stats.base, stats.bonus, stats.total);
            });
            var wingStats = lastTotals.wings;
            element('stat-wings-result').innerHTML =
                breakdown('Health', wingStats.base.health, wingStats.bonus.health, wingStats.total.health) +
                breakdown('Damage', wingStats.base.damage, wingStats.bonus.damage, wingStats.total.damage);
            // Show the cape's contribution from equipped gear and wings, before other bonuses.
            var capeRate = lastTotals.cape.effectiveBonus / 100;
            element('stat-cape-result').innerHTML = breakdown('Bonus',
                lastTotals.cape.baseBonus, lastTotals.cape.bonus, lastTotals.cape.effectiveBonus, true,
                '+' + formatNumber(lastTotals.gearHealth * capeRate) + ' health, +' +
                formatNumber(lastTotals.gearDamage * capeRate) + ' damage');

            lastTotals.pets.forEach(function (stats, index) {
                output('pet-damage-' + index, formatNumber(stats.damage, stats.damage % 1 ? 2 : 0));
                output('pet-health-' + index, formatNumber(stats.health, stats.health % 1 ? 2 : 0));
                element('pet-tile-' + index).title = pets[index].name + ' (' + pets[index].rarity + ')\n' +
                    element('pet-details-' + index).textContent + (loadout.petsActive[index] ? '' : '\nInactive');
            });
            output('pets-damage', formatNumber(lastTotals.petDamage, lastTotals.petDamage % 1 ? 2 : 0));
            output('pets-health', formatNumber(lastTotals.petHealth, lastTotals.petHealth % 1 ? 2 : 0));
            ['damage', 'health'].forEach(function (stat) {
                var title = stat === 'damage' ? 'Damage' : 'Health';
                output('total-' + stat, formatNumber(lastTotals[stat], 0));
                output('total-' + stat + '-compact', formatCompact(lastTotals[stat]));
                output('gear-' + stat, formatNumber(lastTotals['gear' + title], 0));
                output('pet-' + stat, formatNumber(lastTotals['pet' + title], 0));
                output(stat + '-multiplier', '\u00d7' + formatNumber(lastTotals[stat + 'Multiplier']));
            });
            element('total-damage').setAttribute('data-damage', lastTotals.damage);
            output('total-critical', formatNumber(lastTotals.criticalDamage, 0));
            output('total-critical-compact', formatCompact(lastTotals.criticalDamage));
        }

        function setPetActive(index, active) {
            if (active && number('pet-level-' + index, 0, true) === 0) {
                element('pet-level-' + index).value = lastPetLevels[index] || 1;
            }
            element('pet-' + index).checked = active;
        }

        function handleStatsInput(event) {
            var target = event.target;
            if (target.hasAttribute('data-pet-level')) {
                var index = Number(target.getAttribute('data-pet-level'));
                var level = number('pet-level-' + index, 0, true);
                element('pet-' + index).checked = level > 0;
                if (level > 0) {
                    lastPetLevels[index] = level;
                }
            } else if (target.hasAttribute('data-pet-toggle')) {
                setPetActive(Number(target.getAttribute('data-pet-toggle')), target.checked);
            }
            calculateStats();
        }

        ['input', 'change'].forEach(function (event) {
            root.addEventListener(event, handleStatsInput);
        });

        function selectPets(active) {
            pets.forEach(function (pet, index) {
                setPetActive(index, active);
            });
            calculateStats();
        }
        element('pets-all').addEventListener('click', function () { selectPets(true); });
        element('pets-none').addEventListener('click', function () { selectPets(false); });
        calculateStats();
        root.setAttribute('data-initialized', 'true');
    }

    function initDamageCalculator() {
        var root = document.getElementById('damage-calculator');
        if (!root || root.getAttribute('data-initialized') === 'true') {
            return;
        }
        root.classList.add('dr-calculator');

        var ui = calculatorUI(root);
        var element = ui.element, number = ui.number, output = ui.output;
        var field = ui.field, weaponField = ui.weaponField, detail = ui.detail, card = ui.card;

        var attackerFields = [
            ['baseDamage', 'Base damage (before crit and defense)', 1000, 1],
            ['criticalChance', 'Critical chance (%)', 0],
            ['megaChance', 'Mega crit chance (%)', 0],
            ['criticalDamage', 'Critical damage bonus (%)', 300],
            ['tripleChance', 'Triple hit chance (%)', 0],
            ['doubleChance', 'Double hit chance (%)', 0],
            ['knockbackChance', 'Knockback chance (%)', 0],
            ['lifesteal', 'Lifesteal (%)', 0]
        ];
        var targetFields = [
            ['meleeDefense', 'Melee defense', 0],
            ['rangedDefense', 'Ranged defense', 0],
            ['criticalDefense', 'Critical defense (capped at 100)', 100],
            ['blockChance', 'Block chance (%)', 0],
            ['thorns', 'Thorns (%)', 0],
            ['targetHealth', 'Current HP (optional)', '', 1]
        ];

        function damageFields(fields) {
            return fields.map(function (definition) {
                return field('damage-' + definition[0], definition[1], definition[2], 0, definition[3]);
            }).join('');
        }

        root.innerHTML = '<div class="gear-calc">' +
                '<section class="gear-calc-section"><h3>Attacker</h3>' +
                    '<div class="gear-calc-fields">' + weaponField('damage-weapon') +
                        damageFields(attackerFields) + '</div>' +
                    '<div class="gear-calc-actions" id="dr-stat-damage-transfer" hidden><button type="button" id="dr-use-stat-damage">' +
                        'Use Total Damage from Stat Calculator</button></div></section>' +
                '<section class="gear-calc-section"><h3>Target</h3>' +
                    '<p>The attacker\'s weapon type selects the defense used. Leave Current HP blank to ignore overkill.</p>' +
                    '<div class="gear-calc-fields">' + damageFields(targetFields) + '</div></section>' +
                '<section class="gear-calc-section"><h3>Resolved hit</h3>' +
                    '<p>Critical multipliers apply before defense. These single-hit figures assume the hit is not blocked.</p>' +
                    '<div class="gear-calc-results">' +
                    card('Critical multiplier', 'crit-multiplier',
                        detail('Effective against target', 'effective-crit-multiplier') +
                        detail('Critical defense used', 'crit-defense-used')) +
                    card('Normal hit after defense', 'normal-hit',
                        detail('Critical hit', 'critical-hit') + detail('Mega crit', 'mega-hit') +
                        detail('Defense used', 'defense-used')) +
                    card('Applied damage (expected hit)', 'applied-damage',
                        '<div id="dr-lethal-note"></div>' + detail('Lifesteal heal', 'lifesteal-heal') +
                        detail('Thorns reflected', 'thorns-reflect')) +
                    '</div></section>' +
                '<section class="gear-calc-section"><h3>Expected damage per attack</h3>' +
                    '<div class="gear-calc-results">' +
                    card('Expected hit multiplier', 'hit-multiplier',
                        detail('Normal', 'normal-chance') + detail('Critical', 'critical-chance') +
                        detail('Mega crit', 'mega-chance')) +
                    card('Expected hits per attack', 'expected-hits',
                        detail('Single', 'single-chance') + detail('Double', 'double-chance') +
                        detail('Triple', 'triple-chance')) +
                    card('Expected damage', 'expected-damage',
                        detail('Block chance applied', 'block-used') + detail('Knockback chance', 'knockback-used'), true) +
                    '</div>' +
                    '<p class="gear-calc-note">Mega crit is rolled before critical; triple hit before double. ' +
                        'Block reduces expected damage per attack. Knockback is shown separately and requires a surviving target. ' +
                        'Lifesteal includes overkill; thorns does not trigger on a killing blow. ' +
                        'The applied-damage estimate uses the expected damage per hit.</p></section>' +
            '</div>';

        function calculateDamage() {
            var input = { weaponType: element('damage-weapon').value };
            attackerFields.concat(targetFields).forEach(function (definition) {
                input[definition[0]] = number('damage-' + definition[0], 0);
            });
            var result = damageStats(input);

            output('crit-multiplier', formatNumber(result.criticalMultiplier) + '\u00d7');
            output('effective-crit-multiplier', formatNumber(result.effectiveCriticalMultiplier) + '\u00d7');
            output('crit-defense-used', formatNumber(result.criticalDefense, 0) +
                (input.criticalDefense > 100 ? ' (capped from ' + formatNumber(input.criticalDefense, 0) + ')' : ''));
            [
                ['normal-hit', 'normalHit'], ['critical-hit', 'criticalHit'], ['mega-hit', 'megaHit'],
                ['applied-damage', 'appliedDamage'], ['lifesteal-heal', 'lifestealHeal'],
                ['thorns-reflect', 'thornsReflect'], ['expected-damage', 'expectedDamagePerAttack']
            ].forEach(function (entry) {
                output(entry[0], formatNumber(result[entry[1]], 0));
            });
            output('defense-used', formatNumber(result.defense, 0) +
                (input.weaponType === 'melee' ? ' (Melee)' : ' (Ranged)'));
            output('lethal-note', input.targetHealth > 0 ?
                (result.lethal ? 'Lethal \u2014 thorns will not trigger' : 'Target survives') :
                'Using expected damage per hit');
            [
                ['normal-chance', 'normalChance'], ['critical-chance', 'criticalChance'],
                ['mega-chance', 'megaChance'], ['single-chance', 'singleChance'],
                ['double-chance', 'doubleChance'], ['triple-chance', 'tripleChance'],
                ['block-used', 'blockChance'], ['knockback-used', 'knockbackChance']
            ].forEach(function (entry) {
                output(entry[0], formatNumber(result[entry[1]] * 100, 1) + '%');
            });
            output('hit-multiplier', '\u00d7' + formatNumber(result.expectedHitMultiplier));
            output('expected-hits', formatNumber(result.expectedHits));
            output('expected-damage-compact', formatCompact(result.expectedDamagePerAttack));
        }

        ['input', 'change'].forEach(function (event) {
            root.addEventListener(event, calculateDamage);
        });

        // The copy action is available only when a stat calculator is also present.
        element('stat-damage-transfer').hidden = !document.getElementById('dr-total-damage');
        element('use-stat-damage').addEventListener('click', function () {
            var source = document.getElementById('dr-total-damage');
            if (!source) {
                return;
            }
            var damage = Number(source.getAttribute('data-damage'));
            if (isFinite(damage)) {
                element('damage-baseDamage').value = Math.round(damage * 100) / 100;
                calculateDamage();
            }
        });

        calculateDamage();
        root.setAttribute('data-initialized', 'true');
    }

    function initDefenseCalculator() {
        var root = document.getElementById('defense-calculator');
        if (!root || root.getAttribute('data-initialized') === 'true') {
            return;
        }
        root.classList.add('dr-calculator');
        root.innerHTML =
            '<div class="gear-calc gear-calc-defense">' +
                '<div class="gear-calc-fields">' +
                    '<label for="defense-calc-value">Defense' +
                        '<input type="number" id="defense-calc-value" step="any" value="0" aria-describedby="defense-calc-help">' +
                    '</label>' +
                '</div>' +
                '<div class="gear-calc-result" role="status" aria-live="polite">' +
                    '<span>Damage multiplier</span>' +
                    '<strong id="defense-calc-multiplier"></strong>' +
                    '<small>Percentage of damage received</small>' +
                '</div>' +
                '<p class="gear-calc-note" id="defense-calc-help">Applies to melee and ranged defense. ' +
                    'Multiplier = 100 / (100 + |Defense|), shown as a percentage.</p>' +
            '</div>';
        var input = root.querySelector('#defense-calc-value');
        var result = root.querySelector('#defense-calc-multiplier');
        function calculate() {
            result.textContent = formatNumber(defenseMultiplier(input.value) * 100) + '%';
        }
        input.addEventListener('input', calculate);
        input.addEventListener('change', calculate);
        calculate();
        root.setAttribute('data-initialized', 'true');
    }

    function initCalculators() {
        initRelicCalculator();
        initStatCalculator();
        initDamageCalculator();
        initDefenseCalculator();
    }

    /*
     * Wait until the article DOM exists.
     */
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initCalculators
        );
    } else {
        initCalculators();
    }

}());