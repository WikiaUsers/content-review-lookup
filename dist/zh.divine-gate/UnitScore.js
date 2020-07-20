'use strict';

$.computeScore = function(unitInfo) {
    var unitData = unitInfo.unit;
    var skillData = unitInfo.skills;
    var unit;
    for (var unitId in unitData) {
        if (unitData.hasOwnProperty(unitId)) {
            unit = unitData[unitId];
            break;
        }
    }
    var ls = skillData.ls[unit.ls];
    var as = skillData.as[unit.as];
    var ns1 = skillData.ns[unit.ns1];
    var ns2 = skillData.ns[unit.ns2];
    var ps = skillData.ps[unit.ps];

    /* Assume unit is leveled to 2,700,000 EXP, and have total 26 +'s. */
    var unitExp = Math.min(2700000, unit.expmax);
    var lvRatio = Math.pow(Math.min(1, unitExp / unit.expmax), 1 / unit.exppow);
    var baseHp = 130 + unit.hpmin + ((unit.hpmax - unit.hpmin) * Math.pow(lvRatio, unit.hppow))|0;
    var baseAtk = 65 + unit.atkmin + ((unit.atkmax - unit.atkmin) * Math.pow(lvRatio, unit.atkpow))|0;

    var enemyHp = 2500000;
    var enemyDef = 0;

    var ls2 = 0.25;
    var ls1 = 0.5;
    var ls0 = 0.25;

    /* Step 1: Compute cards count. */
    var cardsCount = 17.5;
    if (ls) switch (ls.type) {
        case 'LS延時': cardsCount += 3.5 * (ls2*2 + ls1) * ls.params[0]; break;
        default: break;
    }
    if (as) switch (as.type) {
        case 'AS延時': cardsCount += 3.5 * as.params[0] * as.params[2] / as.cd; break;
        default: break;
    }
    if (cardsCount > 25) cardsCount = 25;

    /* Step 2: Compute standard rates */
    var rates = {
        '火': 0.14, '水': 0.14, '風': 0.14,
        '光': 0.14, '闇': 0.14, '無': 0.14, '心': 0.16,
    };

    if (ls) switch (ls.type) {
        case 'LS持續轉色':
            var delta = (ls2 + ls1) * rates[ls.params[0]];
            rates[ls.params[1]] += delta;
            rates[ls.params[0]] -= delta;
            break;
        default: break;
    }
    if (as) switch (as.type) {
        case 'AS轉色': {
            var factor = Math.min(1, 5 / (as.cd * cardsCount));
            var delta = factor * rates[as.params[0]];
            rates[as.params[1]] += delta;
            rates[as.params[0]] -= delta;
            break;
        }
        case 'AS全部轉色': {
            var factor = Math.min(1, 5 / (as.cd * cardsCount));
            for (var k in rates) if (rates.hasOwnProperty(k)) {
                rates[k] *= (1 - factor);
            }
            for (var i = 0; i < 5; ++ i) {
                rates[as.params[i]] += factor / 5;
            }
            break;
        }
        case 'AS持續轉色':
        case 'AS持續全部轉色':
            throw 'Unsupported Skill!';
        default: break;
    }

    /* Step 3: Compute the enemy ATK and DEF reduction. */
    var enemyAtkEffect = 1;
    if (ls) switch (ls.type) {
        case 'LS減傷':
        case 'LS高HP減傷': {
            var ratio = 1 - ls.params[1] * 0.01;
            enemyAtkEffect *= ls2*ratio*ratio + ls1*ratio + ls0;
            break;
        }
        default: break;
    }
    if (ps) switch (ps.type) {
        case 'PS屬性減傷':
        case 'PS種族減傷': {
            var ratio = 1 - ps.params[1] * 0.01;
            enemyAtkEffect *= ratio;
            break;
        }
        default: break;
    }
    if (as) switch (as.type) {
        case 'AS破防': {
            enemyDef *= 1 - 0.01 * as.params[0] * as.params[2] / as.cd;
            break;
        }
        case 'AS威嚇': {
            enemyAtkEffect *= Math.max(1/(as.params[0] + 1), 1 - as.params[0]/as.cd);
            break;
        }
        case 'AS減傷': {
            enemyAtkEffect *= 1 - 0.01 * as.params[0] * as.params[2] / as.cd;
            break;
        }
        case 'AS指定屬性減傷':
            throw 'Unsupported skill!';
            break;
        default: break;
    }

    /* Step 4: Compute our HP and ATK enhancement. */
    var atkFactor = 1;

    if (ls) switch (ls.type) {
        case 'LS屬性組合攻擊增強':
        case 'LS組合數量攻擊增強':
        case 'LS低HP攻擊增強':
        case 'LS高HP攻擊增強':
            atkFactor *= ls2*ls.params[1]*ls.params[1] + ls1*ls.params[1] + ls0;
            break;
        case 'LS屬性能力提升':
        case 'LS種族能力提升': {
            var ratio = ls2*ls.params[2]*ls.params[2] + ls1*ls.params[2] + ls0;
            var type = ls.params[1]|0;
            if (type == 1||type == 3) atkFactor *= ratio;
            if (type == 2||type == 3) baseHp *= ratio;
            break;
        }
        case 'LS能力提升': {
            atkFactor *= ls2*ls.params[12]*ls.params[12] + ls1*ls.params[12] + ls0;
            baseHp *= ls2*ls.params[11]*ls.params[11] + ls1*ls.params[11] + ls0;
            break;
        }
    }
    if (as) switch (as.type) {
        case 'AS屬性增強':
        case 'AS種族增強':
            atkFactor *= 1 + (as.params[3] - 1) * as.params[0] / as.cd;
            break;
        case 'AS增強':
            atkFactor *= 1 + (as.params[2] - 1) * as.params[0] / as.cd;
            break;
        default: break;
    }
    if (ps) switch (ps.type) {
        case 'PS低HP攻擊增強':
        case 'PS高HP攻擊增強':
            atkFactor *= ps.params[1];
            break;
        case 'PS種族能力提升': {
            var ratio = ps.params[2];
            var type = ps.params[1]|0;
            if (type == 1||type == 3) atkFactor *= ratio;
            if (type == 2||type == 3) baseHp *= ratio;
        }
        default: break;
    }

    baseAtk *= atkFactor;

    /* Step 5: Count number of Boosts */
    var boostCount = 0.5;
    if (as) switch (as.type) {
        case 'AS全部Boost':
            boostCount += 5 / as.cd;
            break;
        default: break;
    }
    if (ps) switch (ps.type) {
        case 'PS增加Boost格數':
            boostCount += (ps.params[0] - 1) * 0.5;
            break;
        default: break;
    }
    var boostFactor = 1 + 1.5 * boostCount;

    /* Step 6: Compute average ATKs and RCVs introduced by NSs. */
    var subDef = function (atk, ignoreDef) {
        if (ignoreDef == 'yes' || atk <= 0) {
            return atk;
        } else {
            return Math.max(1, atk - enemyDef);
        }
    }

    var getNsAtkRcv = function (ns) {
        if (!ns) return [0, 0, 0];

        var nsDifficulty = computeNsDifficulty(ns.cost, rates);
        var count = cardsCount / nsDifficulty[0];

        switch (ns.type) {
        case '單體':
        case '全體': {
            return [baseAtk * ns.value * boostFactor * count, 0];
        }
        case '回復':
            return [0, baseHp * 0.01 * ns.value * boostFactor * count];
        }
    }

    var allNs = [ns1, ns2, {type:'回復',cost:'心心',value:15},
                           {type:'回復',cost:'心心心',value:15},
                           {type:'回復',cost:'心心心心',value:15},
                           {type:'回復',cost:'心心心心心',value:40}];

    var contribs = [];
    var combos = 0;
    for (var i = 0; i < 6; ++ i) {
        contribs[i] = getNsAtkRcv(allNs[i]);
    }

    var nsAtk = 0, nsRcv = 0;
    for (var i = 0; i < 6; ++ i) {
        nsAtk += subDef(contribs[i][0]); /* * comboFactor); */
        nsRcv += contribs[i][1];
    }

    /* Step 7: Insert the ATKs and RCVs introduced by ASs and LSs. */
    if (ls) switch (ls.type) {
        case 'LS追擊':
            nsAtk += (ls2*2 + ls1) * subDef(baseAtk * ls.params[1]);
            break;
        case 'LS攻擊時回復':
        case 'LS戰鬥時回復':
        case 'LS回復力提升':
            nsRcv += 0.01 * (ls2*2 + ls1) * baseHp * ls.params[0];
            break;
        default: break;
    }
    if (as) switch (as.type) {
        case 'AS攻擊':
            nsAtk += subDef(baseAtk * as.params[0]) / as.cd;
            break;
        case 'AS指定屬性攻擊':
            nsAtk += subDef(baseAtk * as.params[1], as.params[2]) / as.cd;
            break;
        case 'AS攻擊並回復': {
            var value = subDef(baseAtk * as.params[0]) / as.cd;
            nsAtk += value;
            nsRcv += value;
            break;
        }
        case 'AS自殺式攻擊':
            nsAtk += subDef(baseAtk * as.params[0]) / as.cd;
            nsRcv -= (baseHp - 1) / as.cd;
            break;
        case 'AS擊倒':
            nsAtk += 0.01 * as.params[0] * enemyHp / as.cd;
            break;
        case 'AS固定傷害攻擊':
            nsAtk += subDef(as.params[0], as.params[1]) / as.cd;
            break;
        case 'AS自殺式固定傷害攻擊':
            nsAtk += subDef(as.params[0], as.params[1]) / as.cd;
            nsRcv -= (baseHp - 1) / as.cd;
            break;
        case 'AS指定屬性固定傷害攻擊':
            nsAtk += subDef(as.params[0], as.params[2]) / as.cd;
            break;
        case 'AS重力': {
            var n = as.params[0] * 0.01;
            nsAtk += n * enemyHp / as.cd;
            break;
        }
        case 'AS毒':
            nsAtk += as.params[0] * baseAtk * as.params[2] / as.cd;
            break;
        case 'AS固定回復':
            nsRcv += as.params[0] / as.cd;
            break;
        case 'AS回復':
            nsRcv += 0.01 * baseHp * as.params[0] / as.cd;
            break;
        default: break;
    }

    /* Step 7: Compute ATK due to enemy attack. */
    var counterAttackFactor = 0;
    if (ps) switch (ps.type) {
        case 'PS反擊':
            counterAttackFactor += 1e-4 * atkFactor * ps.params[0] * ps.params[1];
            break;
        default: break;
    }
    if (as) switch (as.type) {
        case 'AS反擊':
            counterAttackFactor += 0.01 * as.params[3] * as.params[0] / as.cd;
            break;
        default: break;
    }

    var enemyAtk = (nsAtk * baseHp + enemyHp * nsRcv) / (enemyHp - counterAttackFactor * baseHp);
    var actualAtk = nsAtk + enemyAtk * counterAttackFactor;

    var utility = 0;
    if (as) switch (as.type) {
        case 'ASSP回復':
            utility += as.params[0] / as.cd;
            break;
        case 'AS瞬間移動':
            utility += 8 / as.cd;
            break;
        case 'AS加速冷卻':
            utility += as.params[0] / as.cd;
            break;
        case 'AS開錠':
            utility += 8 / as.cd;
            break;
    }
    if (ps) switch (ps.type) {
        case 'PS陷阱迴避':
            utility += ((ps.params[1] == '所有' ? 4 : 1) << ps.params[0]) / 64;
            break;
        case 'PS改變偷襲機率':
            utility += (1 - ps.params[0]) * 0.3;
            break;
    }

    
    var ranks = ['F', 'E', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+', 'S', 'S+', 'SS', 'SS+'];
    var rankStep = 4/9;

    var score = (Math.log(enemyAtk + actualAtk*0.5) - 5.9 + utility) * 2.25;
    var rank = ranks[score|0];

    return [actualAtk, enemyAtk, rank];
}