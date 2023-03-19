var special = {
    keys: {
        _sanchezname: {
            func: function () {
                var consonants = ['B', 'Z', 'R', 'V'];
                var vowels = ['y', 'e', 'n', 'r'];
                var conso2 = ['n', 'm', 'g', 'k'];

                return randomChoice(consonants) + randomChoice(vowels) + randomChoice(conso2) + randomChoice(vowels) + randomChoice(conso2);
            }
        },

        _sancheztext: {
            func: function () {
                var c1 = ['r', 'gr', 'yell', 'bl', 'or', 's'];
                var c2 = ['ed', 'een', 'ow', 'eige', 'urple', 'ange', 'ilver'];
                var s = [];

                for (var i = 0; i < 5; i++) {
                    s.push(randomChoice(c1) + randomChoice(c2));
                }

                return s.join('');
            }
        }
    },

    functions: {
        choice: {
            func: function (matches) {
                var word = matches[1];
                var split = splitKeyFunc(word);
                return randomChoice(split);
            },

            raw: true
        }
    }
};

function getKeyFunc(string, options) {
    options = options || {};
    extrakeys = options.extrakeys || {};
    extrafuncs = options.extrafuncs || {};
    var lastParenthesesIndex = -1;
    var llastParenthesesIndex = -1;
    var rawParenthesesIndex = -1;
    var rawrequired = 0;
    var keyindex = -1;
    var parindex = -1;
    var parenthesesGoal = [];
    var potentialindexes = [];
    var rawMatch;

    var keylist = special.keys;
    var funclist = special.functions;
    var pkeylist = [];
    var pfunclist = [];

    for (var k in keylist) {
        if (keylist[k].potential) {
            if (keylist[k].potential.keys) {
                for (var kk in keylist[k].potential.keys) {
                    pkeylist[kk] = keylist[k].potential.keys[kk];
                }
            }

            if (keylist[k].potential.funcs) {
                for (var ff in keylist[k].potential.funcs) {
                    pfunclist[ff] = keylist[k].potential.funcs[ff];
                }
            }
        }
    }
    for (var k in extrakeys) keylist[k] = extrakeys[k];

    for (var f in funclist) {
        if (funclist[f].potential) {
            if (funclist[f].potential.keys) {
                for (var kk in funclist[f].potential.keys) {
                    pkeylist[kk] = funclist[f].potential.keys[kk];
                }
            }

            if (funclist[f].potential.funcs) {
                for (var ff in funclist[f].potential.funcs) {
                    pfunclist[ff] = funclist[f].potential.funcs[ff];
                }
            }
        }
    }
    for (var f in extrafuncs) funclist[f] = extrafuncs[f];

    var keys = Object.keys(keylist);
    var funcs = Object.keys(funclist);
    var pfuncs = Object.keys(pfunclist);

    function isParIndex(goal) {
        return parindex == goal;
    }

    for (var i in string) {
        var char = string[i];

        switch (char) {
            case '(':
                var funcmatch = (string.substring(0, i)).match(new RegExp('(' + funcs.map(regexClean).join('|') + ')$', 'i'));
                var pfuncmatch = (string.substring(0, i)).match(new RegExp('(' + (parenthesesGoal.length <= 0 ? pfuncs.map(regexClean).join('|') : '') + ')$', 'i'));

                if (funcmatch) {
                    parindex++;
                    lastParenthesesIndex = i;
                    if (!rawMatch) {
                        var func = funclist[funcmatch[0].toLowerCase()];
                        if (func) {
                            if (func.raw) {
                                rawParenthesesIndex = i;
                                rawrequired++;
                                rawMatch = funcmatch[0].toLowerCase();
                            }
                            if (func.parentheses) {
                                parenthesesGoal.push(parindex - 1);
                            }
                        }
                    } else {
                        rawrequired++;
                    }
                } else if (pfuncmatch) {
                    parindex++;
                    potentialindexes.push(parindex);
                }
                break;

            case ')':
                var funcmatch = (string.substring(0, lastParenthesesIndex)).match(new RegExp('(' + funcs.map(regexClean).join('|') + ')$', 'i'));

                if (funcmatch && string[i - 1] !== '\\') {
                    if (parenthesesGoal.find(isParIndex)) {
                        parenthesesGoal.splice(parenthesesGoal.findIndex(isParIndex), 1);
                    }
                    if (potentialindexes.find(isParIndex)) {
                        potentialindexes.splice(potentialindexes.findIndex(isParIndex), 1);
                    } else {
                        if (!rawMatch) {
                            lastParenthesesIndex++;
                            return {
                                match: [funcmatch[0].toLowerCase(), string.substring(lastParenthesesIndex, i)],
                                type: 'func'
                            };
                        } else {
                            rawrequired--;
                            llastParenthesesIndex = i;
                            if (rawrequired <= 0) {
                                rawParenthesesIndex++;
                                return {
                                    match: [rawMatch, string.substring(rawParenthesesIndex, i)],
                                    type: 'func'
                                };
                            }
                        }
                    }
                    parindex--;
                }
                break;
        }

        var keymatch = string.substring(i).match(new RegExp('^(' + keys.map(regexClean).join('|') + ')', 'i'));
        if (keymatch) {
            keyindex = i;
            if (rawrequired <= 0) return {
                match: keymatch[0].toLowerCase(),
                type: 'key'
            };
        }
    }

    if (llastParenthesesIndex > -1) {
        var funcmatch = string.substring(0, lastParenthesesIndex).match(new RegExp('(' + funcs.map(regexClean).join('|') + ')$', 'i'));

        lastParenthesesIndex++;
        return {
            match: [funcmatch[0].toLowerCase(), string.substring(lastParenthesesIndex, llastParenthesesIndex)],
            type: 'func'
        };
    }

    if (keyindex > -1) {
        var keymatch = string.substring(keyindex).match(new RegExp('^(' + keys.map(regexClean).join('|') + ')', 'i'));

        return {
            match: keymatch[0].toLowerCase(),
            type: 'key'
        };
    }

    return false;
};

function splitKeyFunc(string, options) {
    options = options || {};
    extrafuncs = options.extrafuncs || {};
    args = options.args || Infinity;
    var lastParenthesesIndex = -1;
    var lastSplitIndex = 0;
    var parenthesesrequired = 0;
    var parenthesesGoal = [];
    var barfound = 0;
    var split = [];

    var funclist = special.functions;
    var pfunclist = [];

    for (var f in funclist) {
        if (funclist[f].potential) {
            if (funclist[f].potential.keys) {
                for (var kk in funclist[f].potential.keys) {
                    pkeylist[kk] = funclist[f].potential.keys[kk];
                }
            }

            if (funclist[f].potential.funcs) {
                for (var ff in funclist[f].potential.funcs) {
                    pfunclist[ff] = funclist[f].potential.funcs[ff];
                }
            }
        }
    }
    for (var f in extrafuncs) funclist[f] = extrafuncs[f];

    var funcs = Object.keys(funclist);
    var pfuncs = Object.keys(pfunclist);
    var afuncs = funcs.concat(pfuncs);

    function isParRequired(goal) {
        return parenthesesrequired == goal;
    }

    function barReplace(val) {
        return val.replace(/\\\|/, '|');
    }

    for (var i in string) {
        var char = string[i];
        i = Number(i);

        switch (char) {
            case '(':
                var funcmatch = (string.substring(0, i)).match(new RegExp('(' + (parenthesesGoal.length <= 0 ? afuncs.map(regexClean).join('|') : '') + ')$', 'i'));
                if (funcmatch) {
                    lastParenthesesIndex = i;
                    parenthesesrequired++;
                    var func = funclist[funcmatch[0].toLowerCase()];
                    if (func) {
                        if (func.parentheses) {
                            parenthesesGoal.push(parenthesesrequired - 1);
                        }
                    }
                }
                break;

            case '|':
                if (parenthesesrequired <= 0 && string[i - 1] !== '\\') {
                    split.push(string.substring(lastSplitIndex, i - (string[i - 1] === ' ' ? 1 : 0)));
                    lastSplitIndex = i + (string[i + 1] === ' ' ? 2 : 1);
                    barfound++;
                }
                break;

            case ')':
                var funcmatch = (string.substring(0, lastParenthesesIndex)).match(new RegExp('(' + (parenthesesGoal.length <= 0 ? afuncs.map(regexClean).join('|') : '') + ')$', 'i'));
                if (funcmatch && string[i - 1] !== '\\') {
                    if (parenthesesGoal.find(isParRequired)) {
                        parenthesesGoal.splice(parenthesesGoal.findIndex(isParRequired), 1);
                    }
                    parenthesesrequired--;
                }
                break;
        }

        if (barfound == args - 1) {
            break;
        }
    }

    split.push(string.substring(lastSplitIndex));

    return split.map(barReplace);
};

window.getKeywordsFor = function(string, options) {
    options = options || {};
    extrakeys = options.extrakeys || {};
    extrafuncs = options.extrafuncs || {};

    while (getKeyFunc(string, { extrakeys: extrakeys, extrafuncs: extrafuncs }) !== false) {
        var keydata = getKeyFunc(string, { extrakeys: extrakeys, extrafuncs: extrafuncs });

        switch (keydata.type) {
            case 'key':
                var key = special.keys[keydata.match] || extrakeys[keydata.match];
                var func = key.func;
                var change = func(string);
                string = typeof (change) === 'object' && change[1] === true ? change[0] : string.replace(new RegExp(regexClean(keydata.match), 'i'), change);
                break;

            case 'func':
                var funcmatch = keydata.match;
                var funcName = funcmatch[0];
                var match = funcmatch[1];
                var mod = special.functions[funcName] || extrafuncs[funcName];
                var func = mod.func;
                var m = match;
                if (!mod.raw) {
                    match = getKeywordsFor(match, msg, isBot, { extrakeys: extrakeys, extrafuncs: extrafuncs });
                }
                match = match.replace(/\\\)/g, ')');
                if (!mod.raw) {
                    string = string.replace(m, match);
                }
                var change = func([funcName, match], string);
                string = typeof (change) === 'object' && change[1] === true ? change[0] : string.replace(new RegExp(regexClean(funcName + '(' + match + ')'), 'i'), change);
                break;
        }
    }

    return string;
};