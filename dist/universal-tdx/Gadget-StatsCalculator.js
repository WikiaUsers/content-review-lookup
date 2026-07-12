(function (window, $, mw) {
    'use strict';

    var CONTAINER_SELECTOR = '#utdx-stats-calculator, .utdx-stats-calculator';
    var stateById = {};
    var MAIN_STATS_BY_SLOT = {
        Top: ['Damage', 'Cooldown', 'Range', 'CritRate', 'CritDamage', 'DamageOverTime', 'BuffPotency', 'HyperArmorDamage', 'EffectRes'],
        Bottom: ['Damage', 'Cooldown', 'Range', 'CritRate', 'CritDamage', 'DamageOverTime', 'BuffPotency', 'HyperArmorDamage', 'EffectRes'],
        Accessory: ['ElementDamage', 'BuffPotency']
    };
    var MAIN_STAT_BASE_VALUES = {
        Damage: 4.665,
        Cooldown: 1.5,
        Range: 2,
        CritRate: 2.5,
        CritDamage: 8,
        DamageOverTime: 6.6,
        BuffPotency: 3,
        HyperArmorDamage: 6.6,
        EffectRes: 5,
        ElementDamage: 2
    };
    var DEFAULT_RELIC_CATALOG = {
        Top: [
            { name: 'Berserk Shinigami Uniform', set: 'BerserkShinigami', rarity: 'Variable' },
            { name: 'Biju Cloak', set: 'Bijuu', rarity: 'Variable' },
            { name: 'Bio-Android Chestplate', set: 'BioAndroid', rarity: 'Variable' },
            { name: 'Ex Captain Uraharo Cloak', set: 'ExCaptain', rarity: 'Variable' },
            { name: 'Fused Warrior Top', set: 'FusedWarrior', rarity: 'Raid' },
            { name: 'Fusion Vest', set: 'Fusion', rarity: 'Variable' },
            { name: 'Great Mage Top', set: 'GreatMage', rarity: 'Variable' },
            { name: 'Junior Ninja Jacket', set: 'JuniorNinja', rarity: 'Variable' },
            { name: 'Laughing Captain Shirt', set: 'Captain', rarity: 'Variable' },
            { name: 'Master Ninja Coat', set: 'MasterNinja', rarity: 'Variable' },
            { name: 'Mochi Cloak', set: 'Dough_Commander', rarity: 'Variable' },
            { name: 'Monarch Cloak', set: 'Monarch', rarity: 'Raid' },
            { name: 'Reanimated Armor', set: 'ReanimatedNinja', rarity: 'Variable' },
            { name: 'Reaper Shirt', set: 'Reaper', rarity: 'Raid' },
            { name: 'Rebellious Shinobi Top', set: 'RebelliousShinobi', rarity: 'Raid' },
            { name: 'Shadow Reaper Shirt', set: 'ShadowReaper', rarity: 'Raid' },
            { name: 'Sorcerer Hunter Shirt', set: 'SorcererHunter', rarity: 'Variable' },
            { name: 'Strongest Sorcerer Shirt', set: 'StrongestSorcerer', rarity: 'Variable' },
            { name: 'Sun God Shirt', set: 'SunGod', rarity: 'Variable' },
            { name: 'Super Roku Shirt', set: 'SuperRoku', rarity: 'Variable' },
            { name: 'Warlord Top', set: 'Warlord Outfit', rarity: 'Raid' }
        ],
        Bottom: [
            { name: 'Berserk Shinigami Pants', set: 'BerserkShinigami', rarity: 'Variable' },
            { name: 'Biju Pants', set: 'Bijuu', rarity: 'Variable' },
            { name: 'Bio-Android Pants', set: 'BioAndroid', rarity: 'Variable' },
            { name: 'Ex Captain Uraharo Pants', set: 'ExCaptain', rarity: 'Variable' },
            { name: 'Fused Warrior Bottom', set: 'FusedWarrior', rarity: 'Raid' },
            { name: 'Fusion Pants', set: 'Fusion', rarity: 'Variable' },
            { name: 'Great Mage Pants', set: 'GreatMage', rarity: 'Variable' },
            { name: 'Junior Ninja Pants', set: 'JuniorNinja', rarity: 'Variable' },
            { name: 'Laughing Captain Pants', set: 'Captain', rarity: 'Variable' },
            { name: 'Master Ninja Pants', set: 'MasterNinja', rarity: 'Variable' },
            { name: 'Mochi Pants', set: 'Dough_Commander', rarity: 'Variable' },
            { name: 'Monarch Pants', set: 'Monarch', rarity: 'Raid' },
            { name: 'Reanimated Pants', set: 'ReanimatedNinja', rarity: 'Variable' },
            { name: 'Reaper Pants', set: 'Reaper', rarity: 'Raid' },
            { name: 'Rebellious Shinobi Pants', set: 'RebelliousShinobi', rarity: 'Raid' },
            { name: 'Shadow Reaper Pants', set: 'ShadowReaper', rarity: 'Raid' },
            { name: 'Sorcerer Hunter Pants', set: 'SorcererHunter', rarity: 'Variable' },
            { name: 'Strongest Sorcerer Pants', set: 'StrongestSorcerer', rarity: 'Variable' },
            { name: 'Sun God Pants', set: 'SunGod', rarity: 'Variable' },
            { name: 'Super Roku Pants', set: 'SuperRoku', rarity: 'Variable' },
            { name: 'Warlord Skirt', set: 'Warlord Outfit', rarity: 'Raid' }
        ],
        Accessory: [
            { name: 'Berserk Shinigami\'s Eyepatch', set: 'BerserkShinigamiPatch', rarity: 'Variable' },
            { name: 'Berserker\'s Cleaver', set: 'KenpachiSword', rarity: 'Exclusive' },
            { name: 'Biju Energy', set: 'BijuuEnergy', rarity: 'Variable' },
            { name: 'Bio-Android Helmet', set: 'BioAndroidHelmet', rarity: 'Variable' },
            { name: 'Bloodline Eye', set: 'BloodlineEye', rarity: 'Raid' },
            { name: 'Dragon Guy Halo', set: 'RagnaHalo', rarity: 'Exclusive' },
            { name: 'Ex Captain Uraharo Hat', set: 'ExCaptainHat', rarity: 'Variable' },
            { name: 'Fused Warrior Earrings', set: 'FusedWarriorEarrings', rarity: 'Raid' },
            { name: 'Fusion Aura', set: 'FusionAura', rarity: 'Variable' },
            { name: 'Great Mage Ring', set: 'GreatMageRing', rarity: 'Variable' },
            { name: 'Junior Ninja Headband', set: 'JuniorNinjaHeadband', rarity: 'Variable' },
            { name: 'Koyote\'s Sword', set: 'StarrkGun', rarity: 'Exclusive' },
            { name: 'Kriatu Swords', set: 'KiritoSwords', rarity: 'Exclusive' },
            { name: 'Master Ninja Hat', set: 'MasterNinjaHat', rarity: 'Variable' },
            { name: 'Mochi Commander Scarf', set: 'Dough_Cloth', rarity: 'Variable' },
            { name: 'Monarch Cape', set: 'MonarchCape', rarity: 'Raid' },
            { name: 'Nellee Spear', set: 'NellielSpear', rarity: 'Exclusive' },
            { name: 'Panther Claws', set: 'GrimmjowHand', rarity: 'Exclusive' },
            { name: 'Reaper Necklace', set: 'Reaper', rarity: 'Raid' },
            { name: 'Rohan Cape', set: 'GohanCape', rarity: 'Exclusive' },
            { name: 'Scarlet Maid Plushie', set: 'SakuyaPlushie', rarity: 'Exclusive' },
            { name: 'Shadow Reaper Necklace', set: 'ShadowReaper', rarity: 'Raid' },
            { name: 'Sharpshooter Sniper', set: 'ShinoSniper', rarity: 'Exclusive' },
            { name: 'Sorcerer Hunter Spirit', set: 'SorcererHunterSpirit', rarity: 'Variable' },
            { name: 'Spade Donut', set: 'SpadeDonut', rarity: 'Exclusive' },
            { name: 'Spirit Armor', set: 'ReanimatedNinjaHat', rarity: 'Variable' },
            { name: 'Strawhat', set: 'Strawhat', rarity: 'Variable' },
            { name: 'Strongest Sorcerer Glasses', set: 'StrongestSorcererGlasses', rarity: 'Variable' },
            { name: 'Sun God Divine Smoke', set: 'SunGodSmoke', rarity: 'Variable' },
            { name: 'Super Roku Bracelets', set: 'SuperRokuBracelet', rarity: 'Variable' },
            { name: 'Tierabel Mask', set: 'HarribelMask', rarity: 'Exclusive' },
            { name: 'Ultiorra\'s Wings', set: 'UlquiorraSpear', rarity: 'Exclusive' },
            { name: 'Warlord Hat', set: 'Warlord Hat', rarity: 'Raid' }
        ]
    };

    function numberValue(value, fallback) {
        if (value === undefined || value === null || value === '') {
            return fallback;
        }
        if (typeof value === 'number') {
            return isNaN(value) ? fallback : value;
        }
        var parsed = parseFloat(String(value).replace(',', '.').replace('%', '').replace('+', ''));
        return isNaN(parsed) ? fallback : parsed;
    }

    function booleanValue(value, fallback) {
        if (value === undefined || value === null || value === '') {
            return fallback;
        }
        var text = String(value).toLowerCase();
        if (text === '1' || text === 'yes' || text === 'true' || text === 'on') {
            return true;
        }
        if (text === '0' || text === 'no' || text === 'false' || text === 'off') {
            return false;
        }
        return fallback;
    }

    function roundNumber(value, digits) {
        if (value === undefined || value === null || isNaN(value)) {
            return null;
        }
        digits = digits === undefined ? 2 : digits;
        digits = Math.min(digits, 2);
        if (Math.abs(value) > 1000000000000) {
            digits = 0;
        }
        var scale = Math.pow(10, digits);
        return value >= 0 ? Math.floor(value * scale + 0.5) / scale : Math.ceil(value * scale - 0.5) / scale;
    }

    function formatNumber(value, digits) {
        var rounded = roundNumber(value, digits);
        if (rounded === null) {
            return '-';
        }
        if (Math.abs(rounded - Math.floor(rounded + 0.5)) < 0.0000001) {
            return String(Math.floor(rounded + 0.5));
        }
        return String(rounded).replace(/(\..*?)0+$/, '$1').replace(/\.$/, '');
    }

    function formatPercent(multiplier) {
        return (multiplier >= 1 ? '+' : '') + formatNumber((multiplier - 1) * 100, 2) + '%';
    }

    function cleanNote(value) {
        return String(value || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    }

    function asArray(value) {
        var result = [];
        if ($.isArray(value)) {
            return value;
        }
        $.each(value || {}, function (_, item) {
            result.push(item);
        });
        return result;
    }

    function escapeText(value) {
        return $('<div>').text(value === undefined || value === null ? '' : String(value)).html();
    }

    function addBreakdown(rows, source, stat, before, after, note) {
        rows.push({
            source: source,
            stat: stat,
            before: before,
            after: after,
            delta: before !== undefined && before !== null && after !== undefined && after !== null ? after - before : null,
            note: note || ''
        });
    }

    function addStat(base, multiplier) {
        return base * (multiplier - 1);
    }

    function calculateStatPointMultiplier(data, stat, points) {
        var base = data.formulas.statPointBase;
        if (stat === 'Cooldown') {
            return 1 / Math.pow(base, points || 0);
        }
        return Math.pow(base, points || 0);
    }

    function calculateStat(data, stat, value) {
        if (value === undefined || value === null) {
            return value;
        }
        if (stat === 'Range' && value > data.formulas.rangeDiminishingStart) {
            return Math.log(value + Math.pow(value, 6)) / Math.log(1.5);
        }
        if (stat === 'Cooldown') {
            return Math.max(value, data.formulas.cooldownMin);
        }
        return value;
    }

    function applyMultiplier(stats, rows, stat, multiplier, source, note) {
        if (stats[stat] === undefined || stats[stat] === null || multiplier === undefined || multiplier === null || multiplier === 1) {
            return;
        }
        var before = stats[stat];
        stats[stat] = stats[stat] + addStat(stats[stat], multiplier);
        addBreakdown(rows, source, stat, before, stats[stat], note || ('x' + formatNumber(multiplier, 4)));
    }

    function applyFlat(stats, rows, stat, value, source, note) {
        if (!value) {
            return;
        }
        var before = stats[stat] || 0;
        stats[stat] = before + value;
        addBreakdown(rows, source, stat, before, stats[stat], note || 'flat');
    }

    function availablePoints(data, unitLevel, etherealLevel) {
        var points = Math.max(0, Math.floor(unitLevel || 1) - data.statPointRules.noPointAtUnitLevel);
        $.each(data.statPointRules.etherealBonusLevels, function (level, bonus) {
            if ((etherealLevel || 0) >= Number(level)) {
                points += bonus;
            }
        });
        return points;
    }

    function getMaxUpgrade(unit) {
        var max = null;
        $.each(unit.upgrades || {}, function (key) {
            var index = Number(key);
            if (!isNaN(index) && (max === null || index > max)) {
                max = index;
            }
        });
        return max;
    }

    function getBaseStats(unit, upgradeIndex) {
        var upgrade = (unit.upgrades || {})[String(upgradeIndex)] || {};
        return {
            Damage: numberValue(upgrade.damage !== undefined ? upgrade.damage : upgrade.atk, 0),
            Cooldown: numberValue(upgrade.cooldown !== undefined ? upgrade.cooldown : upgrade.spa, 0),
            Range: numberValue(upgrade.range, 0),
            Money: numberValue(upgrade.money, null),
            Cost: numberValue(upgrade.cost, null)
        };
    }

    function normalizeStatName(value) {
        var key = String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
        var map = {
            dmg: 'Damage',
            damage: 'Damage',
            atk: 'Damage',
            attack: 'Damage',
            spa: 'Cooldown',
            cooldown: 'Cooldown',
            cd: 'Cooldown',
            range: 'Range',
            rng: 'Range',
            critrate: 'CritRate',
            cr: 'CritRate',
            critdamage: 'CritDamage',
            cdmg: 'CritDamage',
            dot: 'DamageOverTime',
            damageovertime: 'DamageOverTime',
            buffpotency: 'BuffPotency',
            elementdamage: 'ElementDamage',
            elementaldamage: 'ElementDamage',
            hyperarmordamage: 'HyperArmorDamage',
            effectres: 'EffectRes'
        };
        return map[key] || value;
    }

    function relicDecimal(value) {
        var number = numberValue(value, null);
        if (number === null) {
            return null;
        }
        return Math.abs(number) > 1 ? number * 0.01 : number;
    }

    function starMultiplier(data, rarity, stars) {
        if (rarity !== 'Raid') {
            return 1;
        }
        var star = Math.max(1, Math.min(3, Math.floor(numberValue(stars, 1))));
        var multipliers = (((data.relics.rarities || {}).Raid || {}).starMultiplier || {});
        return multipliers[String(star)] || multipliers[star - 1] || 1;
    }

    function mainStatValue(data, slot, stat, level, stars, rarity) {
        return ((((data.relics.mainStatPool || {})[slot] || {})[stat] || MAIN_STAT_BASE_VALUES[stat] || 0)) * (level || 0) * starMultiplier(data, rarity, stars);
    }

    function subStatValue(data, stat, rolls, stars, rarity) {
        return ((data.relics.subStatPool || {})[stat] || 0) * (rolls || 0) * starMultiplier(data, rarity, stars);
    }

    function normalizeData(data) {
        data.relics = data.relics || {};
        data.relics.slots = data.relics.slots || ['Top', 'Bottom', 'Accessory'];
        var catalog = data.relics.catalog || {};
        var hasCatalog = false;
        $.each(data.relics.slots, function (_, slot) {
            if (asArray(catalog[slot]).length) {
                hasCatalog = true;
            }
        });
        if (!hasCatalog) {
            catalog = { Top: [], Bottom: [], Accessory: [] };
            $.each(data.relics.sets || {}, function (setId, set) {
                $.each((set && set.slots) || {}, function (slot, name) {
                    if (catalog[slot]) {
                        catalog[slot].push({ name: name, set: setId, rarity: set.rarity || 'Variable' });
                    }
                });
            });
        }
        $.each(DEFAULT_RELIC_CATALOG, function (slot, entries) {
            catalog[slot] = asArray(catalog[slot]).concat(entries);
        });
        $.each(data.relics.slots, function (_, slot) {
            var seen = {};
            catalog[slot] = asArray(catalog[slot]).filter(function (entry) {
                if (!entry || !entry.name) {
                    return false;
                }
                var key = entry.name + '|' + (entry.set || '');
                if (seen[key]) {
                    return false;
                }
                seen[key] = true;
                return true;
            }).sort(function (a, b) {
                return String(a.name).localeCompare(String(b.name));
            });
        });
        data.relics.catalog = catalog;
        return data;
    }

    function relicCatalog(data, slot) {
        return asArray(((data.relics || {}).catalog || {})[slot]);
    }

    function findRelicEntry(data, slot, name) {
        var found = null;
        $.each(relicCatalog(data, slot), function (_, entry) {
            if (entry.name === name) {
                found = entry;
                return false;
            }
        });
        return found;
    }

    function rarityMaxLevel(data, rarity) {
        return (((data.relics.rarities || {})[rarity] || {}).maxLevel) || 15;
    }

    function aggregateRelics(data, input) {
        var totals = {};
        var details = [];
        $.each(data.relics.slots, function (_, slot) {
            var relic = input.relics[slot];
            if (!relic) {
                return;
            }
            var rarity = relic.rarity || 'Raid';
            var stars = relic.stars || 1;
            var level = relic.level || 15;
            if (relic.mainStat) {
                var mainStat = normalizeStatName(relic.mainStat);
                var mainValue = relicDecimal(relic.mainPercent);
                if (mainValue === null) {
                    mainValue = mainStatValue(data, slot, mainStat, level, stars, rarity) * 0.01;
                }
                totals[mainStat] = (totals[mainStat] || 0) + mainValue;
                details.push({ slot: slot, stat: mainStat, value: mainValue, source: 'main stat' });
            }
            $.each(relic.subStats || [], function (_, sub) {
                var stat = normalizeStatName(sub.stat);
                if (!stat) {
                    return;
                }
                var value = relicDecimal(sub.percent);
                if (value === null) {
                    value = subStatValue(data, stat, sub.rolls || 0, stars, rarity) * 0.01;
                }
                totals[stat] = (totals[stat] || 0) + value;
                details.push({ slot: slot, stat: stat, value: value, source: 'sub stat' });
            });
        });
        return { totals: totals, details: details };
    }

    function applyRelicStats(stats, rows, relicStats, relicGainMult, details) {
        var byStat = {};
        $.each(details || [], function (_, detail) {
            byStat[detail.stat] = byStat[detail.stat] || [];
            byStat[detail.stat].push(detail.slot + ' ' + detail.source + ' ' + formatNumber(detail.value * 100, 2) + '%');
        });
        $.each(relicStats || {}, function (stat, value) {
            if (!value) {
                return;
            }
            var detailNote = byStat[stat] && byStat[stat].length ? byStat[stat].join(', ') : '';
            var before = stats[stat];
            if (before !== undefined && before !== null) {
                if (stat === 'Cooldown') {
                    stats[stat] = before * (1 - value * relicGainMult);
                    addBreakdown(rows, 'Relics', stat, before, stats[stat], '-' + formatNumber(value * 100 * relicGainMult, 2) + '% total. ' + detailNote);
                } else {
                    var multiplier = (value + 1) * relicGainMult;
                    stats[stat] = before + addStat(before, multiplier);
                    addBreakdown(rows, 'Relics', stat, before, stats[stat], '+' + formatNumber((multiplier - 1) * 100, 2) + '% total. ' + detailNote);
                }
            } else {
                stats[stat] = value * relicGainMult;
                addBreakdown(rows, 'Relics', stat, 0, stats[stat], 'Created stat. ' + detailNote);
            }
        });
    }

    function unitHasTag(unit, tag) {
        var tags = unit.tags || [];
        if (typeof tags === 'string') {
            tags = tags.split(',');
        }
        tag = String(tag || '').toLowerCase();
        for (var i = 0; i < tags.length; i++) {
            if ($.trim(String(tags[i])).toLowerCase() === tag) {
                return true;
            }
        }
        return false;
    }

    function applyRelicBonus(stats, rows, stat, value, source, note) {
        stat = normalizeStatName(stat);
        if (stat === 'CritRate' || stat === 'CritDamage') {
            applyFlat(stats, rows, stat, value < 1 ? value : value - 1, source, note);
            return;
        }
        if (stats[stat] === undefined || stats[stat] === null) {
            stats[stat] = value;
            addBreakdown(rows, source, stat, 0, value, note || 'created stat');
            return;
        }
        applyMultiplier(stats, rows, stat, value, source, note);
    }

    function getActiveRelicSets(data, input) {
        var active = {};
        var top = input.relics.Top;
        var bottom = input.relics.Bottom;
        var accessory = input.relics.Accessory;
        if (top && bottom && top.set && top.set === bottom.set) {
            active[top.set] = true;
        }
        if (accessory && accessory.set) {
            active[accessory.set] = true;
        }
        return active;
    }

    function applyAutomaticRelicBonuses(data, stats, rows, input, unit) {
        var active = getActiveRelicSets(data, input);
        $.each(active, function (setId) {
            var set = (data.relics.sets || {})[setId];
            if (!set) {
                return;
            }
            $.each(set.effects || [], function (_, effect) {
                if (effect.multiplier !== undefined) {
                    applyMultiplier(stats, rows, effect.stat, effect.multiplier, 'Full set', effect.source || set.name);
                } else if (effect.flat !== undefined) {
                    applyFlat(stats, rows, effect.stat, effect.flat, 'Full set', effect.source || set.name);
                }
            });
            $.each(set.groups || {}, function (tag, group) {
                if (!unitHasTag(unit, tag)) {
                    return;
                }
                $.each(group.bonus || {}, function (stat, value) {
                    applyRelicBonus(stats, rows, stat, value, 'Tag perk: ' + tag, group.text || set.name);
                });
            });
        });
    }

    function calculate(data, input) {
        var unit = data.units[input.unit];
        if (!unit) {
            return { ok: false, error: 'Unknown unit: ' + input.unit };
        }
        var rarity = unit.rarity || 'Rare';
        var levelCap = (data.statPointRules.levelCapsByRarity || {})[rarity] || data.statPointRules.defaultUnitLevelCap;
        var unitLevel = numberValue(input.unitLevel, levelCap);
        var etherealLevel = numberValue(input.etherealLevel, 0);
        var available = availablePoints(data, unitLevel, etherealLevel);
        var upgradeIndex = input.upgrade === 'max' ? getMaxUpgrade(unit) : numberValue(input.upgrade, getMaxUpgrade(unit));
        var stats = getBaseStats(unit, upgradeIndex);
        var rows = [];
        var warnings = [];

        addBreakdown(rows, 'Base stats', 'Damage', null, stats.Damage, 'Damage at selected upgrade ' + upgradeIndex);
        addBreakdown(rows, 'Base stats', 'Cooldown', null, stats.Cooldown, 'Cooldown at selected upgrade ' + upgradeIndex);
        addBreakdown(rows, 'Base stats', 'Range', null, stats.Range, 'Range at selected upgrade ' + upgradeIndex);

        $.each(data.stats, function (_, stat) {
            applyMultiplier(stats, rows, stat, input.statMultipliers[stat] || 1, 'Unit stat roll', input.statRollLabels[stat]);
        });

        var traitName = input.trait || 'None';
        var trait = data.traits[traitName] || data.traits.None;
        var relicGainMult = 1;
        $.each(trait.stats || {}, function (stat, value) {
            if (stat === 'RelicGain') {
                var before = relicGainMult;
                relicGainMult *= value;
                addBreakdown(rows, 'Trait: ' + traitName, stat, before, relicGainMult, 'relic gain multiplier');
            } else if (stat === 'CritRate' || stat === 'CritDamage') {
                applyFlat(stats, rows, stat, value, 'Trait: ' + traitName, 'flat');
            } else if (stats[stat] !== undefined && typeof value === 'number') {
                applyMultiplier(stats, rows, stat, value, 'Trait: ' + traitName);
            } else if (typeof value !== 'object') {
                addBreakdown(rows, 'Trait: ' + traitName, stat, null, null, 'special/runtime stat');
            }
        });
        if (trait.uncertainRuntime) {
            addBreakdown(rows, 'Trait: ' + traitName, '-', null, null, cleanNote(trait.uncertainRuntime));
        }

        var used = 0;
        $.each(data.stats, function (_, stat) {
            used += numberValue(input.statPoints[stat], 0);
        });
        if (used > available) {
            warnings.push('Allocated stat points (' + used + ') exceed available points (' + available + ').');
        }
        $.each(data.stats, function (_, stat) {
            var points = numberValue(input.statPoints[stat], 0);
            if (points && stats[stat] !== undefined) {
                applyMultiplier(stats, rows, stat, calculateStatPointMultiplier(data, stat, points), 'Stat points', points + ' points');
            }
        });

        var relicResult = aggregateRelics(data, input);
        applyRelicStats(stats, rows, relicResult.totals, relicGainMult, relicResult.details);

        $.each(unit.etherealization || {}, function (level, text) {
            if (Number(level) <= etherealLevel) {
                addBreakdown(rows, 'Ethereal level ' + level, '-', null, null, cleanNote(text));
            }
        });

        applyAutomaticRelicBonuses(data, stats, rows, input, unit);

        $.each({ Damage: stats.Damage, Cooldown: stats.Cooldown, Range: stats.Range }, function (stat, value) {
            var after = calculateStat(data, stat, value);
            if (after !== value) {
                stats[stat] = after;
                addBreakdown(rows, 'Post-processing', stat, value, after, 'CalculateStat');
            }
        });

        return {
            ok: true,
            unit: unit,
            unitKey: input.unit,
            unitLevel: unitLevel,
            etherealLevel: etherealLevel,
            availablePoints: available,
            usedPoints: used,
            trait: traitName,
            stats: stats,
            dps: stats.Damage && stats.Cooldown > 0 ? stats.Damage / stats.Cooldown : null,
            breakdown: rows,
            warnings: warnings
        };
    }

    function optionList(values, selected) {
        return values.map(function (value) {
            return '<option value="' + escapeText(value) + '"' + (value === selected ? ' selected' : '') + '>' + escapeText(value) + '</option>';
        }).join('');
    }

    function statOptionList(selected) {
        var values = ['Damage', 'Cooldown', 'Range', 'CritRate', 'CritDamage', 'DamageOverTime', 'BuffPotency', 'ElementDamage', 'HyperArmorDamage', 'EffectRes'];
        return optionList(values, selected || '');
    }

    function gradeOptionList(data, selected) {
        return optionList(data.unitGradeTiers.order, selected || 'F');
    }

    function relicBlock(data, slot) {
        var key = slot.toLowerCase();
        var catalog = relicCatalog(data, slot).map(function (entry) {
            return entry.name;
        });
        var mainStats = MAIN_STATS_BY_SLOT[slot] || Object.keys((data.relics.mainStatPool || {})[slot] || {});
        var html = '';
        html += '<fieldset class="utdx-sc-card utdx-sc-relic" data-slot="' + escapeText(slot) + '">';
        html += '<legend>' + escapeText(slot) + ' relic</legend>';
        html += '<label>Relic<select data-field="' + key + 'Id"><option value=""></option>' + optionList(catalog, '') + '</select></label>';
        html += '<div class="utdx-sc-meta" data-role="' + key + 'Meta">Rarity: -</div>';
        html += '<label class="utdx-sc-rarity" data-role="' + key + 'RarityWrap">Rarity<select data-field="' + key + 'Rarity">' + optionList(['Rare', 'Epic', 'Legendary', 'Mythic'], 'Mythic') + '</select></label>';
        html += '<label class="utdx-sc-stars" data-role="' + key + 'StarsWrap">Stars<select data-field="' + key + 'Stars">' + optionList(['1', '2', '3'], '3') + '</select></label>';
        html += '<label>Level<input type="number" min="0" max="15" value="15" data-field="' + key + 'Level"></label>';
        html += '<div class="utdx-sc-subgrid">';
        html += '<label>Main stat<select data-field="' + key + 'MainStat">' + optionList(mainStats, mainStats[0] || '') + '</select></label>';
        html += '<label>Main %<input type="number" step="0.01" value="0" data-field="' + key + 'MainPercent"></label>';
        html += '</div>';
        html += '<div class="utdx-sc-substats" data-substats="' + key + '">';
        for (var i = 1; i <= 5; i++) {
            html += '<div class="utdx-sc-subgrid">';
            html += '<label>Sub ' + i + ' stat<select data-field="' + key + 'Sub' + i + 'Stat"><option value=""></option>' + statOptionList('') + '</select></label>';
            html += '<label>Sub ' + i + ' %<input type="number" step="0.01" data-field="' + key + 'Sub' + i + 'Percent"></label>';
            html += '</div>';
        }
        html += '</div>';
        html += '</fieldset>';
        return html;
    }

    function buildInterface($container, data) {
        var unitNames = Object.keys(data.units || {}).sort();
        var traitNames = Object.keys(data.traits || {}).filter(function (name) {
            return name !== 'aliases';
        }).sort();
        var firstUnit = $container.attr('data-unit') || unitNames[0] || '';
        var hasRelics = false;
        $.each(data.relics.slots, function (_, slot) {
            if (relicCatalog(data, slot).length) {
                hasRelics = true;
            }
        });
        var html = '';
        html += '<div class="utdx-sc">';
        if (!hasRelics) {
            html += '<div class="utdx-sc-error">Relic data is missing. Update Module:StatsCalculator/RelicsData, regenerate Gadget-StatsCalculatorData.js, then purge the wiki page cache.</div>';
        }
        html += '<div class="utdx-sc-grid">';
        html += '<fieldset class="utdx-sc-card">';
        html += '<legend>Unit</legend>';
        html += '<label>Unit<select data-field="unit">' + optionList(unitNames, firstUnit) + '</select></label>';
        html += '<label>Upgrade<select data-field="upgrade"><option value="max">Max</option></select></label>';
        html += '<label>Level<input type="number" min="1" max="100" value="' + escapeText($container.attr('data-level') || '70') + '" data-field="unitLevel"></label>';
        html += '<label class="utdx-sc-toggle"><input type="checkbox" data-field="fullEthereal" checked> Full Ethereal (+30 stat points)</label>';
        html += '<label>Trait<select data-field="trait">' + optionList(traitNames, 'None') + '</select></label>';
        html += '<div class="utdx-sc-unit-info" data-role="unitInfo"></div>';
        html += '</fieldset>';
        html += '<fieldset class="utdx-sc-card">';
        html += '<legend>Unit stat rolls</legend>';
        $.each(data.stats, function (_, stat) {
            var lower = stat.toLowerCase();
            html += '<div class="utdx-sc-subgrid">';
            html += '<label>' + stat + ' grade<select data-field="' + lower + 'Grade">' + gradeOptionList(data, stat === 'Cooldown' ? 'SS' : 'S') + '</select></label>';
            html += '<label>' + stat + ' %<input type="number" step="0.01" value="0" data-field="' + lower + 'Percent"></label>';
            html += '</div>';
        });
        html += '</fieldset>';
        html += '<fieldset class="utdx-sc-card">';
        html += '<legend>Stat points</legend>';
        html += '<div class="utdx-sc-points">Available: <strong data-role="availablePoints">0</strong> Used: <strong data-role="usedPoints">0</strong></div>';
        $.each(data.stats, function (_, stat) {
            html += '<label>' + stat + ' points<input type="number" min="0" step="1" value="0" data-field="' + stat.toLowerCase() + 'Points"></label>';
        });
        html += '<div class="utdx-sc-warning" data-role="pointWarning"></div>';
        html += '</fieldset>';
        html += '</div>';
        html += '<div class="utdx-sc-relics">';
        html += relicBlock(data, 'Top');
        html += relicBlock(data, 'Bottom');
        html += relicBlock(data, 'Accessory');
        html += '</div>';
        html += '<div class="utdx-sc-results" data-role="results"></div>';
        html += '</div>';
        $container.html(html);
    }

    function setUpgradeOptions($container, data) {
        var unitName = $container.find('[data-field="unit"]').val();
        var unit = data.units[unitName];
        var $upgrade = $container.find('[data-field="upgrade"]');
        var current = $upgrade.val() || 'max';
        var html = '<option value="max">Max</option>';
        $.each(unit && unit.upgrades ? unit.upgrades : {}, function (key) {
            html += '<option value="' + escapeText(key) + '">Upgrade ' + escapeText(key) + '</option>';
        });
        $upgrade.html(html).val(current);
        if (!$upgrade.val()) {
            $upgrade.val('max');
        }
    }

    function updateRelicFields($container, data) {
        $.each(data.relics.slots, function (_, slot) {
            var key = slot.toLowerCase();
            var relicName = $container.find('[data-field="' + key + 'Id"]').val();
            var entry = findRelicEntry(data, slot, relicName);
            var rarity = entry ? entry.rarity : '-';
            var selectedRarity = rarity === 'Variable' ? $container.find('[data-field="' + key + 'Rarity"]').val() : rarity;
            var $level = $container.find('[data-field="' + key + 'Level"]');
            var maxLevel = rarityMaxLevel(data, selectedRarity);
            $container.find('[data-role="' + key + 'Meta"]').text(rarity === 'Variable' ? 'Rarity: choose your relic rarity' : 'Rarity: ' + rarity);
            $container.find('[data-role="' + key + 'RarityWrap"]').toggle(rarity === 'Variable');
            $container.find('[data-role="' + key + 'StarsWrap"]').toggle(rarity === 'Raid');
            $level.attr('max', maxLevel);
            if (entry && numberValue($level.val(), 0) > maxLevel) {
                $level.val(maxLevel);
            }
        });
    }

    function readInput($container, data) {
        function val(field) {
            return $container.find('[data-field="' + field + '"]').val();
        }
        function checked(field) {
            return $container.find('[data-field="' + field + '"]').is(':checked');
        }
        var fullEthereal = checked('fullEthereal');
        var input = {
            unit: val('unit'),
            upgrade: val('upgrade') || 'max',
            unitLevel: numberValue(val('unitLevel'), 70),
            etherealLevel: fullEthereal ? 6 : 0,
            trait: val('trait') || 'None',
            statMultipliers: {},
            statRollLabels: {},
            statPoints: {},
            relics: {}
        };
        $.each(data.stats, function (_, stat) {
            var lower = stat.toLowerCase();
            var percent = numberValue(val(lower + 'Percent'), null);
            var grade = val(lower + 'Grade');
            input.statMultipliers[stat] = percent !== null ? 1 + percent / 100 : (((data.unitGradeTiers[stat] || {})[grade]) || 1);
            input.statRollLabels[stat] = percent !== null ? 'Manual roll ' + (percent >= 0 ? '+' : '') + formatNumber(percent, 2) + '%' : 'Grade ' + grade + ' gives ' + formatPercent(input.statMultipliers[stat]);
            input.statPoints[stat] = numberValue(val(lower + 'Points'), 0);
        });
        $.each(data.relics.slots, function (_, slot) {
            var key = slot.toLowerCase();
            var relic = {
                id: val(key + 'Id'),
                rarity: 'Variable',
                set: null,
                stars: numberValue(val(key + 'Stars'), 1),
                level: numberValue(val(key + 'Level'), 15),
                mainStat: val(key + 'MainStat'),
                mainPercent: val(key + 'MainPercent'),
                subStats: []
            };
            var entry = findRelicEntry(data, slot, relic.id);
            if (entry) {
                relic.rarity = entry.rarity === 'Variable' ? (val(key + 'Rarity') || 'Mythic') : (entry.rarity || 'Variable');
                relic.set = entry.set || null;
            }
            for (var i = 1; i <= 5; i++) {
                var stat = val(key + 'Sub' + i + 'Stat');
                var percentValue = val(key + 'Sub' + i + 'Percent');
                if (stat || percentValue) {
                    relic.subStats.push({ stat: stat, percent: percentValue });
                }
            }
            if (relic.id || relic.mainStat || relic.subStats.length) {
                input.relics[slot] = relic;
            }
        });
        return input;
    }

    function renderResult($container, data, result) {
        if (!result.ok) {
            $container.find('[data-role="results"]').html('<div class="utdx-sc-error">' + escapeText(result.error) + '</div>');
            return;
        }
        var unit = result.unit;
        var info = '<div><strong>Element:</strong> ' + escapeText(unit.element || '-') + '</div>';
        info += '<div><strong>Tags:</strong> ' + escapeText((unit.tags || []).join ? (unit.tags || []).join(', ') : (unit.tags || '-')) + '</div>';
        info += '<div><strong>Base damage:</strong> ' + formatNumber(result.breakdown[0].after, 2) + '</div>';
        info += '<div><strong>Base cooldown:</strong> ' + formatNumber(result.breakdown[1].after, 3) + '</div>';
        info += '<div><strong>Base range:</strong> ' + formatNumber(result.breakdown[2].after, 2) + '</div>';
        $container.find('[data-role="unitInfo"]').html(info);
        $container.find('[data-role="availablePoints"]').text(formatNumber(result.availablePoints, 0));
        $container.find('[data-role="usedPoints"]').text(formatNumber(result.usedPoints, 0));
        $container.find('[data-role="pointWarning"]').text(result.usedPoints > result.availablePoints ? 'Too many stat points.' : '');
        var html = '';
        var notes = [];
        var breakdownRows = [];
        $.each(result.breakdown, function (_, row) {
            if (row.before === null && row.after === null) {
                if (!(row.source.indexOf('Ethereal') === 0 && cleanNote(row.note).indexOf('Stat Points') !== -1)) {
                    notes.push(row);
                }
            } else {
                breakdownRows.push(row);
            }
        });
        html += '<section class="utdx-sc-section">';
        html += '<h3>Final stats</h3>';
        html += '<p class="utdx-sc-help">These are the final calculated stats after unit rolls, trait, stat points, relic stats, full set perks and tag perks.</p>';
        html += '<div class="utdx-sc-final">';
        html += '<div><span>Damage</span><strong>' + formatNumber(result.stats.Damage, 2) + '</strong></div>';
        html += '<div><span>Cooldown</span><strong>' + formatNumber(result.stats.Cooldown, 3) + '</strong></div>';
        html += '<div><span>Range</span><strong>' + formatNumber(result.stats.Range, 2) + '</strong></div>';
        html += '<div><span>DPS</span><strong>' + formatNumber(result.dps, 2) + '</strong></div>';
        html += '</div>';
        html += '</section>';
        html += '<section class="utdx-sc-section">';
        html += '<h3>Ethereal</h3>';
        html += '<p class="utdx-sc-help">Full Ethereal currently adds the confirmed stat point bonuses at ethereal levels 1, 3 and 5. Passive texts below are informational when the unit data contains them.</p>';
        html += '<div class="utdx-sc-meta">Ethereal level used: ' + formatNumber(result.etherealLevel, 0) + '</div>';
        html += '</section>';
        if (notes.length) {
            html += '<section class="utdx-sc-section">';
            html += '<h3>Notes and passive effects</h3>';
            html += '<div class="utdx-sc-notes">';
            $.each(notes, function (_, row) {
                html += '<div><strong>' + escapeText(row.source) + '</strong><span>' + escapeText(cleanNote(row.note)) + '</span></div>';
            });
            html += '</div>';
            html += '</section>';
        }
        if (result.warnings.length) {
            html += '<div class="utdx-sc-warning">' + result.warnings.map(escapeText).join('<br>') + '</div>';
        }
        html += '<section class="utdx-sc-section">';
        html += '<h3>Calculation breakdown</h3>';
        html += '<p class="utdx-sc-help">Each row is one numeric step. Starting value is the stat before this step, result is the stat after this step, and change is the difference added or removed by this step.</p>';
        html += '<table class="utdx-sc-breakdown"><thead><tr><th>Step</th><th>Stat</th><th>Starting value</th><th>Result</th><th>Change</th><th>Explanation</th></tr></thead><tbody>';
        $.each(breakdownRows, function (_, row) {
            html += '<tr>';
            html += '<td>' + escapeText(row.source) + '</td>';
            html += '<td>' + escapeText(row.stat) + '</td>';
            html += '<td>' + formatNumber(row.before, 2) + '</td>';
            html += '<td>' + formatNumber(row.after, 2) + '</td>';
            html += '<td>' + formatNumber(row.delta, 2) + '</td>';
            html += '<td>' + escapeText(cleanNote(row.note)) + '</td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        html += '</section>';
        $container.find('[data-role="results"]').html(html);
    }

    function recalculate($container, data) {
        setUpgradeOptions($container, data);
        updateRelicFields($container, data);
        renderResult($container, data, calculate(data, readInput($container, data)));
    }

    function dataUrl($container) {
        var custom = $container.attr('data-source');
        if (custom) {
            return custom;
        }
        return null;
    }

    function loadData($container) {
        var id = $container.attr('id') || String(Math.random()).slice(2);
        if (stateById[id] && stateById[id].data) {
            return $.Deferred().resolve(stateById[id].data).promise();
        }
        if (window.utdxStatsCalculatorData) {
            var normalized = normalizeData(window.utdxStatsCalculatorData);
            stateById[id] = { data: normalized };
            return $.Deferred().resolve(normalized).promise();
        }
        if (!dataUrl($container)) {
            return $.Deferred().reject().promise();
        }
        return $.getJSON(dataUrl($container)).then(function (data) {
            data = normalizeData(data);
            stateById[id] = { data: data };
            return data;
        });
    }

    function initContainer(_, element) {
        var $container = $(element);
        if ($container.data('utdxStatsCalculatorReady')) {
            return;
        }
        $container.data('utdxStatsCalculatorReady', true);
        $container.addClass('utdx-sc-loading').text('Loading stats calculator...');
        loadData($container).then(function (data) {
            $container.removeClass('utdx-sc-loading');
            buildInterface($container, data);
            setUpgradeOptions($container, data);
            updateRelicFields($container, data);
            $container.on('input change', 'input, select', function () {
                recalculate($container, data);
            });
            recalculate($container, data);
        }, function () {
            $container.removeClass('utdx-sc-loading').addClass('utdx-sc-error').text('Stats calculator data could not be loaded.');
        });
    }

    $(function () {
        $(CONTAINER_SELECTOR).each(initContainer);
    });
}(this, jQuery, mediaWiki));