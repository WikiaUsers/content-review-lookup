'use strict';

function startTeamBuilder() {
    loadData([['Unit'], ['Skill', 'zh-hant']], teamBuilderInit);
    //teamBuilderInit();
}

//------------------------------------------------------------------------------
//{{{ Units --------------------------------------------------------------------

/// Returns whether the unit's element or race is the same as `cond`.
function condSat(cond, unit) {
    return cond == '任何' || unit.elem == cond || unit.race == cond || unit.subrace == cond;
}

/// Evaluate the attribute ('hp', 'atk', etc.) of a unit at a given level.
function evalCurve(unit, attr, lv) {
    var curve = unit[attr];
    if (lv == unit.lv) {
        return curve[1];
    }
    var min = curve[0];
    var diff = curve[1] - min;
    var ratio = Math.pow((lv - 1) / (unit.lv - 1), curve[2]);
    return (min + diff * ratio) | 0;
}

/// Format a number as a ≥3-digit unit ID.
function formatUnitID(number) {
    number = number|0;
    return number < 10 ? '00' + number : number < 100 ? '0' + number : number;
}

//}}}
//------------------------------------------------------------------------------
//{{{ Skills -------------------------------------------------------------------

/// Get the skill structure from the unit.
/// SkillKind should be 'ls', 'as', 'ns1', 'ns2' or 'ps'.
function getSkill(unit, skillKind) {
    var skillNum = unit[skillKind];
    return $.Skill[skillKind.substr(0, 2)][skillNum];
}

/// Obtain the HP multiple applicable for the specific unit.
/// Only leader skills can modify the HP.
function getSkillHpMultiple(sk, unit) {
    if (sk) {
        var p = sk.params;
        switch (sk.type) {
            default:
                break;

            case 'LS屬性能力提升':
            case 'LS種族能力提升':
                if (condSat(p[0], unit) && p[1].indexOf('HP') >= 0) {
                    return p[2];
                }
                break;

            case 'LS能力提升': {
                var allMatch = true;
                var someMatch = false;
                $.each(p[0], function (k, v) {
                    if (condSat(v, unit)) {
                        someMatch = true;
                    } else {
                        allMatch = false;
                    }
                });
                if ((p[1] && allMatch) || (!p[1] && someMatch)) {
                    return p[2];
                }
                break;
            }
        }
    }

    return 1;
}

/// Obtain the ATK multiple applicable for the specific unit.
///
/// Leader skills & active skills can affect all units. Passive skills only
/// affect the itself.
///
/// The return value is a pair `[mult, nsOnly]`. If `nsOnly` is true, the
/// multiple applies to normal skills only.
function getSkillAtkMultiple(sk, unit) {
    if (sk) {
        if (sk.ailments && /我方/.test(sk.ailment_target)) {
            var totalMult = 1;
            $.each(sk.ailments, function (k, v) {
                totalMult *= getSkillAtkMultiple($.Skill.sa[v], unit)[0];
            });
            return [totalMult, false];
        }

        var p = sk.params;
        switch (sk.type) {
            default:
                break;

            case 'LS屬性能力提升':
            case 'LS種族能力提升':
                if (condSat(p[0], unit) && p[1].indexOf('ATK') >= 0) {
                    return [p[2], false];
                }
                break;

            case 'LS能力提升': {
                var allMatch = true;
                var someMatch = false;
                $.each(p[0], function (k, v) {
                    if (condSat(v, unit)) {
                        someMatch = true;
                    } else {
                        allMatch = false;
                    }
                });
                if ((p[1] && allMatch) || (!p[1] && someMatch)) {
                    return [p[3], false];
                }
                break;
            }

            case 'LS高HP攻擊增強':
            case 'LS低HP攻擊增強':
            case 'PS高HP攻擊增強':
            case 'PS低HP攻擊增強':
                return [p[1], false];

            case 'LS屬性組合攻擊增強':
                return [p[1], true];

            case 'PS種族能力提升':
            case 'SA減弱':
                if (condSat(p[0], unit)) {
                    return [p[1]/100, false];
                }
                break;
        }
    }

    return [1, false];
}

/// Obtain the damage reduction modified by the skill from the enemy.
///
/// The reductions are multiplicative in general, but additive among passive
/// skills.
///
/// The result a number if the reduction applies to all enemy elements, or
/// `[elem, multiple]` if it only applies to a specific element.
///
/// The reduction is given in percentages. Returning 75 means the actual damage
/// is 25% of original, for instance.
function getSkillDamageReduction(sk) {
    if (sk) {
        if (sk.ailments && /我方/.test(sk.ailment_target)) {
            for (var i = 0; i < sk.ailments.length; ++ i) {
                var red = getSkillDamageReduction($.Skill.sa[sk.ailments[i]]);
                if (red != 0) {
                    return red;
                }
            }
        }    
        var p = sk.params;
        switch (sk.type) {
            default: break;
            case 'LS減傷':
            case 'PS屬性減傷': return p;
            case 'LS高HP減傷':
            case 'PS種族減傷': return p[1];
            case 'SA減傷': return p[0] == '任何' ? p[1] : p;
        }
    }

    return 0;
}

var elemMultMap = {
    // attacker -> defenser
    '火水': 0.5,
    '水火': 2,
    '風火': 0.5,
    '风火': 0.5,
    '火風': 2,
    '火风': 2,
    '水風': 0.5,
    '水风': 0.5,
    '風水': 2,
    '风水': 2,
    '光闇': 2,
    '光暗': 2,
    '闇光': 2,
    '暗光': 2,
};

//}}}
//------------------------------------------------------------------------------
//{{{ Targets ------------------------------------------------------------------

var selectedUnits = {f:'001', 4:'001', 3:'001', 2:'001', 1:'001', 0:'001'};
var unitsEnabled = {f:true, 4:false, 3:true, 2:true, 1:true, 0:true};

/// Returns whether the target is can have leader skill.
function isLeader(target) {
    return target == 0 || target == 'f';
}

/// Copy all unit structures for the enabled units.
function copyUnits() {
    var res = {};
    for (var k in selectedUnits) {
        if (selectedUnits.hasOwnProperty(k) && unitsEnabled[k]) {
            var unitId = selectedUnits[k];
            res[k] = $.Unit[unitId];
        }
    }
    return res;
}

/// Get the ID of the toggle checkbox for a particular skill.
function getCheckboxId(target, skillKind) {
    if (skillKind == 'ps') {
        return 'ns2-enabled-' + target;
    } else {
        return skillKind + '-enabled-' + target;
    }
}

/// Obtain the skill structure for a target.
/// SkillKind should be 'ls', 'as', 'ns1', 'ns2' or 'ps'.
function getEnabledSkill(target, skillKind) {
    if (!unitsEnabled[target]) { return null; }

    var checkbox = document.getElementById(getCheckboxId(target, skillKind));
    if (!checkbox.checked) { return null; }

    var unit = $.Unit[selectedUnits[target]];
    return getSkill(unit, skillKind);
}

//}}}
//------------------------------------------------------------------------------
//{{{ Chinese ------------------------------------------------------------------

var tradChi;

var tradToSimpMap = {
    '風': '风',
    '闇': '暗',
    '無': '无',
    '絕': '绝',
    '單': '单',
    '體': '体',
    '類': '类',
    '機': '机',
    '強': '强',
    '龍': '龙',
    '獸': '兽',
    '復': '复',
    '擊': '击',
    '發': '发',
    '動': '动',
    '嚇': '吓',
    '減': '减',
    '傷': '伤',
    '縮': '缩',
    '終': '终',
    '點': '点',
    '開': '开',
    '門': '门',
    '態': '态',
    '戰': '战',
    '鬥': '斗',
    '滿': '满',
    '敵': '敌',
};

var tradToSimpRegex = [];
for (var k in tradToSimp) {
    if (tradToSimp.hasOwnProperty(k)) {
        tradToSimpRegex.push(k);
    }
}
tradToSimpRegex = new RegExp('[' + tradToSimpRegex.join('') + ']', 'g');

/// Convert a string from Traditional Chinese to Simplified Chinese.
function tradToSimp(string) {
    return string.replace(tradToSimpRegex, function (s) {
        return tradToSimpMap[s];
    });
};

//}}}
//------------------------------------------------------------------------------
//{{{ User rank ----------------------------------------------------------------

var rankLookupTable = [
    [20, 1],    [22, 2],    [24, 5],    [26, 8],    [28, 11],   [30, 14],
    [32, 17],   [37, 20],   [39, 23],   [41, 26],   [43, 29],   [45, 32],
    [47, 35],   [49, 38],   [51, 41],   [53, 44],   [55, 47],   [60, 50],
    [62, 53],   [64, 56],   [66, 59],   [68, 62],   [70, 65],   [72, 68],
    [77, 70],   [79, 72],   [81, 74],   [83, 76],   [85, 78],   [90, 80],
    [92, 82],   [94, 84],   [96, 86],   [98, 88],   [103, 90],  [105, 92],
    [107, 94],  [109, 96],  [111, 98],  [116, 100],
];

/// Find the minimal rank that is capable of a team of the given cost.
function lookUpRank(cost) {
    if (cost > 116) {
        return ((cost-1)|1) - 15;
    } else {
        for (var i = 0, entry; entry = rankLookupTable[i]; ++ i) {
            if (cost <= entry[0]) {
                return entry[1];
            }
        }
        return 0;
    }
}

//}}}
//------------------------------------------------------------------------------
//{{{ Panel image

var panelImages = {
    '火': 'https://images.wikia.nocookie.net/__cb20140218121757/divine-gate/zh/images/thumb/2/2e/%E7%81%AB.png/20px-%E7%81%AB.png',
    '水': 'https://images.wikia.nocookie.net/__cb20140218121756/divine-gate/zh/images/thumb/a/a9/%E6%B0%B4.png/20px-%E6%B0%B4.png',
    '風': 'https://images.wikia.nocookie.net/__cb20140218121901/divine-gate/zh/images/thumb/a/a6/%E9%A2%A8.png/20px-%E9%A2%A8.png',
    '光': 'https://images.wikia.nocookie.net/__cb20140218121755/divine-gate/zh/images/thumb/c/ce/%E5%85%89.png/20px-%E5%85%89.png',
    '闇': 'https://images.wikia.nocookie.net/__cb20140218121859/divine-gate/zh/images/thumb/9/9e/%E9%97%87.png/20px-%E9%97%87.png',
    '無': 'https://images.wikia.nocookie.net/__cb20140218121758/divine-gate/zh/images/thumb/b/be/%E7%84%A1.png/20px-%E7%84%A1.png',
    '心': 'https://images.wikia.nocookie.net/__cb20140218121756/divine-gate/zh/images/thumb/a/a7/%E5%BF%83.png/20px-%E5%BF%83.png',
};

/// Convert the NS conditions e.g. '心火火' into the corresponding HTML images.
function formatPanels(nscost) {
    var res = [];
    for (var i = 0; i < nscost.length; ++ i) {
        var elem = nscost.charAt(i);
        res.push('<img src="', panelImages[elem], '">');
    }
    return res.join('');
}

//}}}
//------------------------------------------------------------------------------
//{{{ Skill formatting

var truncTextMap = {
    'ATK': '攻',
    'HP': '血',
    'ATK及HP': '血攻',

    '單體1': '小',
    '單體1.6': '中',
    '單體2.3': '大',
    '單體3': '特大',
    '單體4.5': '超特大',
    '單體6': '絕大',
    '單體8': '超絕大',
    '全體1': '小',
    '全體1.6': '中',
    '全體1.8': '大',
    '全體2.5': '特大',
    '全體2.8': '超特大',
    '全體3': '絕大',
    '全體4': '超絕大',

    '人類': '人',
    '魔物': '魔',
    '妖精': '妖',
    '機械': '機',
    '強化合成用': '強',

    '我方': '',
    '全體敵人': '全體',
    '單體敵人': '單體',
    '全體敵人及我方': '全場',
};

/// Create a placeholder tag which will be filled with actual attack numbers
/// later. The `elem` can be an empty string for element-less attack (e.g.
/// poison)
function atkRelTag(target, mult, isNs, elem) {
    return '<span class=atk-relative data-target=' + target +
            ' data-mult="' + mult + '" data-is-ns=' + isNs + ' data-elem="' +
            elem + '">' + mult + '×</span>';
}

/// Format the number of rounds of AS parameter.
function formatRounds(p) {
    if (p[0] == p[1]) {
        return p[0] + '回合';
    } else {
        return p[0] + '–' + p[1] + '回合';
    }
}

/// Format an active skill.
function formatAS(sk, target) {
    if (!sk) {
        return '-';
    }

    var effects = [];
    if (sk.ailments) {
        for (var i = 0; i < sk.ailments.length; ++ i) {
            var effect = formatSkill($.Skill.sa[sk.ailments[i]], target);
            if (i == 0) {
                effect = truncTextMap[sk.ailment_target] + effect;
            }
            effects.push(effect);
        }
    }

    if (sk.extra) {
        var prefix = '';
        if (sk.extra.suicide) {
            if (sk.extra.suicide == 100) {
                prefix = 'HP1.';
            } else {
                prefix = 'HP-' + sk.extra.suicide + '%.'
            }
        }
         
        var action = '重擊';
        if (sk.extra.absorb) {
            action = '吸血';
            if (sk.extra.absorb != 100) {
                action += sk.extra.absorb + '%';
            }
        }

        if (sk.extra.through) {
            if (action == '重擊') {
                action = '穿防';
            } else {
                action += '穿防';
            }
        }

        action = prefix + sk.target + sk.elem + action;
        var noEffects = true;

        if (sk.extra.atk) {
            effects.push(action + '<br>' + atkRelTag(target, sk.extra.atk, false, sk.elem));
            noEffects = false;
        }
        if (sk.extra.atk_fix && !(sk.extra.atk_fix == 1 && sk.type == 'AS擊倒')) {
            effects.push(action + '<br>' + sk.extra.atk_fix);
            noEffects = false;
        }
        if (sk.extra.gravity) {
            effects.push(prefix + sk.target + '重力' + sk.extra.gravity + '%');
            noEffects = false;
        }
        if (noEffects) {
            effects.unshift(prefix);
        }
    }

    var mainEffect = formatSkill(sk, target);
    if (mainEffect) {
        effects.unshift(mainEffect);
    }

    return effects.join('、<br>');
}

/// Format a skill.
function formatSkill(sk, target) {
    if (!sk) {
        return '-';
    }

    var p = sk.params;
    switch (sk.type) {
        //== NS ================================================================

        case '回復':
            return formatPanels(sk.cost) + '<br>' + sk.elem + '回復' + sk.value + '%';

        case '單體':
        case '全體':
            return formatPanels(sk.cost) + '<br>' + sk.type + sk.elem + truncTextMap[sk.type + sk.value] +
                    '<br>' + atkRelTag(target, sk.value, true, sk.elem);

        //== AS & SA ===========================================================

        case 'AS攻擊': 
        case 'AS攻擊並回復':
        case 'AS指定屬性攻擊':
        case 'AS自殺式攻擊':
        case 'AS固定傷害攻擊':
        case 'AS自殺式固定傷害攻擊':
        case 'AS指定屬性固定傷害攻擊':
        case 'AS重力':
        case 'AS毒':
        case 'AS破防':
        case 'AS威嚇':
        case 'AS減傷':
        case 'AS增強':
        case 'AS屬性增強':
        case 'AS延時':
        case 'AS指定屬性減傷':
        case 'AS種族增強':
            return null;

        case 'AS回復': return '回復' + p[0] + '%';
        case 'AS指定屬性攻擊': return p[0];
        case 'AS擊倒': return sk.target + '擊倒 (' + p[0] + '%發動)';
        case 'SA破防': return sk.duration + '回合破防' + (100-p[0]) + '%';
        case 'SA毒': return sk.duration + '回合毒<br>' + atkRelTag(target, p[0]/100, false, '');
        case 'SA威嚇': return p[0] + '回合威嚇';
        case 'SA延時': return sk.duration + '回合 +' + p[0] + '秒';
        case 'SA減傷': return sk.duration + '回合減' + (p[0] == '任何' ? '' : p[0]) + '傷' + p[1] + '%';
        case 'SA減弱': return sk.duration + '回合<br>' + (p[0] == '任何' ? '全體' : p[0]) + ' ×' + (p[1]/100) + '攻';
        case 'AS反擊': return formatRounds(p) + '<br>' + p[2] + '反擊' + p[3] + '×';
        case 'AS持續轉色': return formatRounds(p) + '<br>' + p[2] + '板→' + p[3] + '板';
        case 'AS轉色': return '手牌 ' + p[0] + '→' + p[1];
        case 'AS刷新': return '刷新手牌';
        case 'AS固定回復': return '回復' + p[0] + '.';
        case 'ASSP回復': return '+' + p[0] + ' SP';
        case 'AS全部Boost': return '全部Boost';
        case 'AS全部轉色': {
            if (p[0] == p[1] && p[1] == p[2] && p[2] == p[3] && p[3] == p[4]) {
                return '手牌 全部→' + p[0];
            } else if (p[0] == p[1] && p[1] == p[2] && p[2] == p[3] && !p[4]) {
                return '手牌 左4→' + p[0];
            } else if (p[0] == p[1] && p[1] == p[2] && !p[3] && !p[4]) {
                return '手牌 左3→' + p[0];
            } else if (p[0] == p[1] && !p[2] && !p[3] && !p[4]) {
                return '手牌 左2→' + p[0];
            } else {
                return '手牌→<br>' + p.join('');
            }
        }
        case 'AS加速冷卻': return p[0] + '回合短縮';
        case 'AS瞬間移動': return '跳到終點';
        case 'AS開錠': return '開門';
        case 'AS回復並消除狀態異常': return '回復' + p[0] + '%<br>消狀態';
        case 'SAAS禁止': return sk.duration + '回合封技';

        //== LS ================================================================

        case 'LS屬性能力提升':
        case 'LS種族能力提升': return p[0] + ' ×' + p[2] + truncTextMap[p[1]];
        case 'LS追擊': return p[0] + '追擊' + atkRelTag(target, p[1], false, p[0]);
        case 'LS減傷': return '減' + p[0] + '傷' + p[1] + '%';
        case 'LS移動時回復': return '移動回復' + p[0] + '%';
        case 'LS戰鬥時回復': return '戰鬥回復' + p[0] + '%';
        case 'LS攻擊時回復': return '攻擊回復' + p[0] + '%';
        case 'PS延時':
        case 'LS延時': return '+' + p[0] + '秒'
        case 'LS回復力提升': return '×' + (p[1]/100) + '回復力';
        case 'PS高HP攻擊增強':
        case 'LS高HP攻擊增強': return '滿HP ×' + p[1] + '攻';
        case 'PS低HP攻擊增強':
        case 'LS低HP攻擊增強': return 'HP≤' + p[0] + ' ×' + p[1] + '攻';
        case 'LS板塊之力': return '板塊之力';
        case 'LS根性': return 'HP≥' + p[0] + '%根性';
        case 'LS高HP減傷': return '滿HP減傷' + p[1] + '%';
        case 'LS持續轉色': return p[0] + '板→' + p[1] + '板';
        case 'LS屬性組合攻擊增強': return p[0] + '色 ×' + p[1] + '攻';

        case 'LS能力提升': {
            var conds = $.map(p[0], function (x) { return truncTextMap[x] || x; });
            conds = conds.join(p[1] ? '&' : '/') + ' ×';
            if (p[2] == p[3]) {
                return conds + p[2] + '血攻';
            } else if (p[2] == 1) {
                return conds + p[3] + '攻';
            } else if (p[3] == 1) {
                return conds + p[2] + '血';
            } else {
                return conds + p[2] + '血' + p[3] + '攻';
            }
        }

        //== PS ================================================================

        case 'PS陷阱迴避': return '防Lv' + p[0] + p[1] + '陷阱';
        case 'PS種族能力提升': return '敵=' + p[0] + ' ×' + p[2] + '攻';
        case 'PS反擊': return p[2] + '反擊' + p[1] + '% (' + p[0] + '%發動)';
        case 'PS受傷時回復': return '受傷回復' + p[1] + '% (' + p[0] + '%發動)';
        case 'PS增加Boost格數': return p[0] + '格Boost';
        case 'PS改變偷襲機率': return 'BA=' + p[0] + '%';
        case 'PS種族減傷': {
            var res = (p[1] < 0) ? '增' : '減';
            if (p[0] != '任何') {
                res += p[0];
            }
            return res + '傷' + Math.abs(p[1]) + '%';
        }
        case 'PS屬性減傷': return '減' + p[0] + '傷' + p[1] + '%';
        case 'PS改變板塊出現機率': {
            var table = {};
            $.each(p[0], function (k, v) {
                if (v != 1) {
                    var r = table[v];
                    if (r) {
                        r.push(k);
                    } else {
                        table[v] = [k];
                    }
                }
            });
            var res = [];
            $.each(table, function (rate, panels) {
                res.push(panels.join('/') + '板×' + rate);
            });
            return res.join('、');
        }
        case 'PS板塊防禦': {
            return '1' + p[0] + '板=<br>' + (p[1] < 0 ? '增傷' : '減傷') + Math.abs(p[1]) + '%';
        }
        case 'PS組合數量回復': {
            return (p[0] ? '≥' : '=') + p[1] + ' Hands<br>回復' + p[3] + (p[2] ? '.' : '%');
        }
        case 'PS組合倍率': {
            return 'Hit Rate ' + (p[0] >= 0 ? '+' : '') + p[0]; 
        }

        default:
            console.log(sk.type, p);
            return '?';
    }
}

//}}}
//------------------------------------------------------------------------------
//{{{ Skill checkbox state

/// Maps the checkbox state for a skill.
/// false => disabled. cannot toggle.
/// true => enabled & by-default checked.
/// function => enabled, checked iff this function returns true for all previous skills.
var checkboxStates = {
    'LS屬性能力提升': true,
    'LS種族能力提升': true,
    'LS減傷': true,
    'LS高HP攻擊增強': function (sk) {
        return sk.type != 'PS低HP攻擊增強' && sk.type != 'LS低HP攻擊增強';
    },
    'LS低HP攻擊增強': function (sk) {
        return sk.type != 'PS高HP攻擊增強' && sk.type != 'LS高HP攻擊增強';
    },
    'LS高HP減傷': true,
    'LS屬性組合攻擊增強': true,
    'LS能力提升': true,

    'PS種族能力提升': true,
    'PS高HP攻擊增強': function (sk) {
        return sk.type != 'PS低HP攻擊增強' && sk.type != 'LS低HP攻擊增強';
    },
    'PS低HP攻擊增強': function (sk) {
        return sk.type != 'PS高HP攻擊增強' && sk.type != 'LS高HP攻擊增強';
    },
    'PS種族減傷': true,
    'PS屬性減傷': true,

    'SA減傷': function (sk) { return false; },
    'SA減弱': function (sk) { return !(sk.type == 'SA減弱' && sk.params[0] == this.params[0]); },
};

/// Update the checkbox state for a single skill.
function updateCheckboxState(skill, prevSkills, checkboxId) {
    var f = skill ? checkboxStates[skill.type] : false;
    var checkbox = document.getElementById(checkboxId);
    if (f === true) {
        checkbox.checked = true;
        checkbox.disabled = false;
    } else if (f) {
        checkbox.disabled = false;
        for (var i = prevSkills.length-1; i >= 0; -- i) {
            if (!f.call(skill, prevSkills[i])) {
                checkbox.checked = false;
                return;
            }
        }
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
        checkbox.disabled = true;
    }
}

/// Update the checkbox state for all skills.
function updateCheckboxStates() {
    var prevSkills = [];

    var update = function (target, unit, skillKind) {
        var skill = getSkill(unit, skillKind);
        var checkboxId = getCheckboxId(target, skillKind);
        updateCheckboxState(skill, prevSkills, checkboxId);
        if (skill) {
            prevSkills.push(skill);
            if (skill.ailments) {
                $.each(skill.ailments, function (k, v) {
                    var sa = $.Skill.sa[v];
                    if (sa.type in checkboxStates) {
                        updateCheckboxState(sa, prevSkills, checkboxId);
                    }
                    prevSkills.push(sa);
                });
            }
        }
    };

    $.each(copyUnits(), function (target, unit) {
        if (isLeader(target)) {
            update(target, unit, 'ls');
        }

        update(target, unit, 'as');
        update(target, unit, 'ns1');
        update(target, unit, unit.ns2 ? 'ns2' : 'ps');
    });
}

//}}}
//------------------------------------------------------------------------------
//{{{ Fill in total HP, ATK and Damage.

var currentEnemyElem = '無';

var elemEngMap = {
    '火': 'fire',
    '水': 'aqua',
    '風': 'wind',
    '光': 'light',
    '闇': 'dark',
    '無': 'none',
};

/// Obtain the total HP. The individual HP must first be filled in.
///
/// Returns `[premultHP, totalHP]`, the former is the total HP before LS skill
/// boost.
function getTotalHp() {
    var units = copyUnits();
    var lsLeader = getEnabledSkill('0', 'ls');
    var lsFriend = getEnabledSkill('f', 'ls');

    var premultHP = 0;
    var totalHP = 0;

    $.each(units, function (target, unit) {
        var myHP = $('#hp-' + target).text() | 0;
        premultHP += myHP;
        if (lsFriend) { myHP *= getSkillHpMultiple(lsFriend, unit); }
        if (lsLeader) { myHP *= getSkillHpMultiple(lsLeader, unit); }
        totalHP += (myHP | 0);
    });

    return [premultHP, totalHP];
}

function copyPersistentSkills() {
    return $.grep([
        getEnabledSkill('0', 'ls'),
        getEnabledSkill('f', 'ls'),
        getEnabledSkill('0', 'as'),
        getEnabledSkill('1', 'as'),
        getEnabledSkill('2', 'as'),
        getEnabledSkill('3', 'as'),
        getEnabledSkill('4', 'as'),
        getEnabledSkill('f', 'as'),
    ], function (x) { return x !== null; });
}

/// Fill in all ATK-relative tags.
function fillInAtk() {
    // 1. obtain ATKs.
    var units = copyUnits();
    var atks = {};
    var nsatks = {};
    $.each(units, function (target, unit) {
        var lv = $('#lv-' + target).val();
        var baseATK = evalCurve(unit, 'atk', lv);
        var plusATK = $('#plus-atk-' + target).val()*5;
        atks[target] = nsatks[target] = baseATK + plusATK;
    });

    // 2. Apply skills.
    var persistentSkills = copyPersistentSkills();

    $.each(units, function (target, unit) {
        $.each(persistentSkills, function (i, skill) {
            var mult = getSkillAtkMultiple(skill, unit);
            nsatks[target] *= mult[0];
            if (!mult[1]) {
                atks[target] *= mult[0];
            }
        });
        var ps = getEnabledSkill(target, 'ps');
        var mult = getSkillAtkMultiple(ps, unit);
        nsatks[target] *= mult[0];
        if (!mult[1]) {
            atks[target] *= mult[0];
        }
    });

    // 3. Fill in the ATK-Relative values.
    $('.atk-relative').each(function () {
        var $this = $(this);
        var target = $this.data('target');
        var mult = $this.data('mult');
        var elemMult = elemMultMap[$this.data('elem') + currentEnemyElem] || 1;
        var isNs = $this.data('is-ns');
        var atk = isNs ? nsatks[target] : atks[target];
        var damage = (mult * elemMult * atk) | 0;
        $this.text(damage);
    });
}

function fillInDamageOfElem(damage, totalHP, damageType, elemEng) {
    var t = Math.min(damage / totalHP, 1);
    var colorR, colorG, colorB;
    if (t < 0.75) {
        colorR = colorB = (36*t + 186) | 0;
        colorG = (339 - 168*t) | 0;
    } else {
        colorR = (168*t + 87) | 0;
        colorG = colorB = (852 * (1-t)) | 0;
    }

    var color = 'rgb(' + colorR + ', ' + colorG + ', ' + colorB + ')';
    var percentText = t >= 1 ? 'Lose' : '-' + Math.round(t * 100) + '%';

    $('#enemy-' + damageType + '-' + elemEng).text(damage | 0).css('color', color);
    $('#enemy-' + damageType + '-percent-' + elemEng).text(percentText).css('color', color);
}

/// Update the damage inflicted by each element.
function fillInDamage(totalHP) {
    var units = copyUnits();
    var damageMult = {'火': 0, '水': 0, '風': 0, '光': 0, '闇': 0, '無': 0};

    var totalUnitCount = 0;
    $.each(units, function (target, unit) {
        totalUnitCount += 1;
        $.each(damageMult, function (elem, orig) {
            damageMult[elem] += elemMultMap[elem + unit.elem] || 1;
        });
    });
    $.each(damageMult, function (elem, orig) {
        damageMult[elem] /= totalUnitCount;
    });

    var persistentSkills = copyPersistentSkills();
    $.each(persistentSkills, function (i, skill) {
        var red = getSkillDamageReduction(skill);
        if (red instanceof Array) {
            damageMult[red[0]] *= (100 - red[1]) / 100;
        } else if (red) {
            var mult = (100 - red) / 100;
            $.each(damageMult, function (elem, orig) {
                damageMult[elem] *= mult;
            });
        }
    });

    var psRed = {'火': 0, '水': 0, '風': 0, '光': 0, '闇': 0, '無': 0};
    $.each(units, function (target, unit) {
        var ps = getEnabledSkill(target, 'ps');
        var red = getSkillDamageReduction(ps);
        if (red instanceof Array) {
            psRed[red[0]] += red[1];
        } else if (red) {
            $.each(psRed, function (elem, orig) {
                psRed[elem] += red;
            });
        }
    });

    $.each(psRed, function (elem, red) {
        damageMult[elem] *= (100 - red) / 100;
    });

    var baseDamage = +document.getElementById('enemy-atk').value;
    var baseGravity = document.getElementById('enemy-gravity').value / 100;
    $.each(elemEngMap, function (elem, elemEng) {
        var mult = damageMult[elem];
        var atkDamage = mult * baseDamage;
        var gravityDamage = mult * baseGravity * totalHP;

        fillInDamageOfElem(atkDamage, totalHP, 'atk', elemEng);
        fillInDamageOfElem(gravityDamage, totalHP, 'gravity', elemEng);
    });
}

//}}}
//------------------------------------------------------------------------------
//{{{ Data update

var disabledUnitIcon = 'https://images.wikia.nocookie.net/__cb20131015144450/divine-gate/zh/images/5/59/Empty.png';

/// Update all basic data that does not involve changing units.
function updateBasicData() {
    var totalCost = 0;

    for (var k in selectedUnits) {
        if (selectedUnits.hasOwnProperty(k)) {
            var unitId = selectedUnits[k];
            var unit = $.Unit[unitId];
            var enabled = unitsEnabled[k];
            $('#icon-@,#small-icon-@'.replace(/@/g, k)).attr('src', enabled ? unit.image : disabledUnitIcon);
            $('#link-' + k).attr('href', './ID:' + unitId + '_' + unit.name);
            var lv = $('#lv-' + k).attr('max', unit.lv);
            if (lv.val() > unit.lv) {
                lv.val(unit.lv);
            }
            lv = lv.val();
            var elemRace = unit.elem + '、' + unit.race;
            if (unit.subrace) { elemRace += '/' + unit.subrace; }
            $('#elem-race-' + k).text(enabled ? tradChi(elemRace) : '');
            if (k != 'f') {
                $('#cost-' + k).text(enabled ? unit.cost : '');
                if (enabled) totalCost += unit.cost;
            }
            var myHP = $('#plus-hp-' + k).val()*10 + evalCurve(unit, 'hp', lv);
            $('#hp-' + k).text(enabled ? myHP : '');

            var lsEnabled = (k == '0' || k == 'f');
            $('#ls-' + k).html(lsEnabled ? tradChi(formatSkill($.Skill.ls[unit.ls], k)) : '-');
            if (enabled) {
                $('#as-' + k).html(tradChi(formatAS($.Skill.as[unit.as], k)));
                $('#ns1-' + k).html(tradChi(formatSkill($.Skill.ns[unit.ns1], k)));
                var skill = unit.ns2 ? $.Skill.ns[unit.ns2] : $.Skill.ps[unit.ps];
                $('#ns2-' + k).html(tradChi(formatSkill(skill, k)));
            } else {
                $('#as-@,#ns1-@,#ns2-@'.replace(/@/g,k)).html('-');
            }
        }
    }
    $('#cost-total').text(totalCost);
    $('#rank-total').text(lookUpRank(totalCost));
    var hpPair = getTotalHp();
    $('.hp-total').text(hpPair[1]);
    fillInAtk();
    fillInDamage(hpPair[1]);

    // Generate link
    window.location.replace(generateLink());
    $('#share-team').val(window.location.href);
}

/// Update everything, that involves changing units.
function updateData() {
    updateCheckboxStates();
    updateBasicData();
}

/// Changed unit.
function updateUnitColumn1() {
    var suffix = this.id.substr(7);
    var unitID = $(this).text().match(/\d+/)[0];
    selectedUnits[suffix] = unitID;
    updateData();
}

/// Toggle unit.
function updateEnabledInputs() {
    var suffix = this.id.substr(7);
    $('.inputs-' + suffix).prop('disabled', !this.checked);
    unitsEnabled[suffix] = this.checked;
    updateData();
}

/// Make sure an input box has valid data, and update everything.
function ensureValidInput() {
    var maxVal = this.max || Infinity;
    var minVal = this.min;
    var value = this.value | 0;
    if (value < minVal) {
        value = minVal;
    } else if (value > maxVal) {
        value = maxVal;
    }
    this.value = value;
    updateBasicData();
}

//}}}
//------------------------------------------------------------------------------
//{{{ Link generation and parsing

function parseLinkOld() {
    var preSelectOld = window.location.hash.match(/#p=([-\d]+)/);
    if (!preSelectOld) {
        return false;
    }

    var data = preSelectOld[1].split(/-/);

    $('#enable-1,#enable-2,#enable-3').attr('checked', true);

    for (var i = 0; i < 5; ++ i) {
        var target = (i == 4) ? 'f' : i;
        var unitID = formatUnitID(data[4*i]);
        var unit = $.Unit[unitID];
        $('#picker-' + target).html('<img src="' + unit.smallimage + '"> ' + unitID);
        $('#lv-' + target).val(data[4*i+1]);
        $('#plus-hp-' + target).val(data[4*i+2]);
        $('#plus-atk-' + target).val(data[4*i+3]);
        selectedUnits[target] = unitID;
    }

    return true;
}

function parseLink() {
    if (!parseLinkOld()) {
        parseLinkNew();
    }
    updateData();
}

var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._'

// We can safely store numbers up to 2^53, i.e. roughly 9 × 10^15.

function toBase64(number) {
    var res = [];
    while (number > 0) {
        var bottom = number % 64;
        number = (number - bottom) / 64;
        res.push(base64chars.charAt(bottom));
    }
    return res.join('');
}

function fromBase64(string) {
    var number = 0;
    for (var i = string.length-1; i >= 0; -- i) {
        var c = string.charAt(i);
        var bottom = base64chars.indexOf(c);
        number = number * 64 + bottom;
    }
    return number;
}

function encodeListToNumber(lst, base) {
    var res = 0;
    $.each(lst, function (k, v) { res = res * base + v; });
    return res;
}

function decodeListFromNumber(number, base, length) {
    var lst = [];
    for (var i = length-1; i >= 0; -- i) {
        lst[i] = number % base;
        number = (number - lst[i]) / base;
    }
    return lst;
}

var linkEncodeOrder = ['f', 0, 1, 2, 3, 4];
var unitSepBase = 16384;

function parseLinkNew() {
    var preSelectNew = window.location.hash.match(/#t=([-\w.]+)/);
    if (!preSelectNew) {
        return false;
    }

    var data = preSelectNew[1].split(/-/);
    var unitIDs = decodeListFromNumber(fromBase64(data[0]), unitSepBase, 3);
    unitIDs = unitIDs.concat(decodeListFromNumber(fromBase64(data[1]), unitSepBase, 3));
    var levels = decodeListFromNumber(fromBase64(data[2]), 99, 6);
    var plusHp = decodeListFromNumber(fromBase64(data[3]), 100, 6);
    var plusAtk = decodeListFromNumber(fromBase64(data[4]), 100, 6);
    var enabledStates = decodeListFromNumber(fromBase64(data[5]), 2, 4);

    for (var i = 0; i < 6; ++ i) {
        var target = linkEncodeOrder[i]

        var unitID = formatUnitID(unitIDs[i]);
        var unit = $.Unit[unitID];
        $('#picker-' + target).html('<img src="' + unit.smallimage + '"> ' + unitID);
        $('#lv-' + target).val(99 - levels[i]);
        $('#plus-hp-' + target).val(plusHp[i]);
        $('#plus-atk-' + target).val(plusAtk[i]);
        if (target != 0 && target != 'f') {
            var isEnabled = !enabledStates[target - 1];
            $('#enable-' + target)[0].checked = isEnabled;
            unitsEnabled[target] = isEnabled;
        }

        selectedUnits[target] = unitID;
    }

    return true;
}

function generateLink() {
    var combinedUnits1 = toBase64(encodeListToNumber($.map(['f', '0', '1'], function (v) {
        return selectedUnits[v] | 0;
    }), unitSepBase));
    var combinedUnits2 = toBase64(encodeListToNumber($.map(['2', '3', '4'], function (v) {
        return selectedUnits[v] | 0;
    }), unitSepBase));
    var combinedLevels = toBase64(encodeListToNumber($.map(linkEncodeOrder, function (v) {
        return 99 - $('#lv-' + v).val();
    }), 99));
    var combinedPlusHp = toBase64(encodeListToNumber($.map(linkEncodeOrder, function (v) {
        return +$('#plus-hp-' + v).val();
    }), 100));
    var combinedPlusAtk = toBase64(encodeListToNumber($.map(linkEncodeOrder, function (v) {
        return +$('#plus-atk-' + v).val();
    }), 100));
    var enabledStates = toBase64(encodeListToNumber($.map([1, 2, 3, 4], function (v) {
        return $('#enable-' + v)[0].checked ? 0 : 1;
    }), 2));

    var res = [combinedUnits1, combinedUnits2, combinedLevels,
                combinedPlusHp, combinedPlusAtk, enabledStates];

    return '#t=' + res.join('-');
}

//}}}
//---------------------------------

function teamBuilderInit() {
    var exception = null;

    makeUnitPicker($('.picker-button'), updateUnitColumn1);
    document.getElementById('enemy-elem-none').checked = true;

    try {
        $('.enable-checkbox').click(updateEnabledInputs);
        $('.number-fields,#enemy-atk,#enemy-gravity').change(ensureValidInput);
        $('.skill-toggle').click(updateBasicData);
        $('input[name=enemy-elem]').click(function() {
            currentEnemyElem = this.value;
            updateBasicData();
        });
    } catch (e) {
        exception = e;
    }

    switch (mw.user.options.get('variant')) {
        case 'zh-hans':
        case 'zh-cn':
        case 'zh-sg':
        case 'zh-my':
            tradChi = tradToSimp;
            break;
        default:
            tradChi = function (x) { return x; };
            break;
    }

    parseLink();

    if (exception) {
        throw exception;
    }
}