(function(window, $){
    var Keys = {
        capsLock: false,
        shiftKey: false,
        ctrlKey: false,
        altKey: false,
        metaKey: false,
        caseSensitive: false,
        strict: false,
        cache: [],
        handlers: {},
        aliases: {},
        // Key types
        navigationKeys: {},
        editingKeys: {},
        alphaNumericKeys: {},
        symbolKeys: {},
        modifierKeys: {},
        whitespaceKeys: {},
        fnKeys: {},
        uiKeys: {},
        // All keys
        keys: {}
    };
    
    // Navigation keys
    $.extend(Keys.navigationKeys, {
       "Left": { name: "ArrowLeft", keyCode: 37 },
       "Right": { name: "ArrowRight", keyCode: 39 },
       "Down": { name: "ArrowDown", keyCode: 40 },
       "Up": { name: "ArrowUp", keyCode: 38 },
       "End": { keyCode: 35 },
       "Home": { keyCode: 36 },
       "Page Up": { name: "PageUp", keyCode: 33 },
       "Page Down": { name: "PageDown", keyCode: 34 }
    });
    
    // Editing keys
    $.extend(Keys.editingKeys, {
        "Backspace": { keyCode: 8 },
        "Delete": { keyCode: 46 },
        "Insert": { keyCode: 45 }
    });
    
    // Alphanumeric keys
    $.extend(Keys.alphaNumericKeys, {
        // Letters
        "A": { pattern: /A/i, code: "KeyA", keyCode: 65 },
        "B": { pattern: /B/i, code: "KeyB", keyCode: 66 },
        "C": { pattern: /C/i, code: "KeyC", keyCode: 67 },
        "D": { pattern: /D/i, code: "KeyD", keyCode: 68 },
        "E": { pattern: /E/i, code: "KeyE", keyCode: 69 },
        "F": { pattern: /F/i, code: "KeyF", keyCode: 70 },
        "G": { pattern: /G/i, code: "KeyG", keyCode: 71 },
        "H": { pattern: /H/i, code: "KeyH", keyCode: 72 },
        "I": { pattern: /I/i, code: "KeyI", keyCode: 73 },
        "J": { pattern: /J/i, code: "KeyJ", keyCode: 74 },
        "K": { pattern: /K/i, code: "KeyK", keyCode: 75 },
        "L": { pattern: /L/i, code: "KeyL", keyCode: 76 },
        "M": { pattern: /M/i, code: "KeyM", keyCode: 77 },
        "N": { pattern: /N/i, code: "KeyN", keyCode: 78 },
        "O": { pattern: /O/i, code: "KeyO", keyCode: 79 },
        "P": { pattern: /P/i, code: "KeyP", keyCode: 80 },
        "Q": { pattern: /Q/i, code: "KeyQ", keyCode: 81 },
        "R": { pattern: /R/i, code: "KeyR", keyCode: 82 },
        "S": { pattern: /S/i, code: "KeyS", keyCode: 83 },
        "T": { pattern: /T/i, code: "KeyT", keyCode: 84 },
        "U": { pattern: /U/i, code: "KeyU", keyCode: 85 },
        "V": { pattern: /V/i, code: "KeyV", keyCode: 86 },
        "W": { pattern: /W/i, code: "KeyW", keyCode: 87 },
        "X": { pattern: /X/i, code: "KeyX", keyCode: 88 },
        "Y": { pattern: /Y/i, code: "KeyY", keyCode: 89 },
        "Z": { pattern: /Z/i, code: "KeyZ", keyCode: 90 },
        // Number keys
        "0": { code: ["Digit0", "Numpad0"], keyCode: [48, 96] },
        "1": { code: ["Digit1", "Numpad1"], keyCode: [49, 97] },
        "2": { code: ["Digit2", "Numpad2"], keyCode: [50, 98] },
        "3": { code: ["Digit3", "Numpad3"], keyCode: [51, 99] },
        "4": { code: ["Digit4", "Numpad4"], keyCode: [52, 100] },
        "5": { code: ["Digit5", "Numpad5"], keyCode: [53, 101] },
        "6": { code: ["Digit6", "Numpad6"], keyCode: [54, 102] },
        "7": { code: ["Digit7", "Numpad7"], keyCode: [55, 103] },
        "8": { code: ["Digit8", "Numpad8"], keyCode: [56, 104] },
        "9": { code: ["Digit9", "Numpad9"], keyCode: [57, 105] }
    });
    
    // Symbol keys
    $.extend(Keys.symbolKeys, {
        ",": { name: [",", "<"], code: "Comma", keyCode: 188 },
        ".": { name: [".", ">"], code: ["Period", "NumpadDecimal"], keyCode: [190, 46] },
        "/": { name: ["/", "?"], code: ["Slash", "NumpadDivide"], keyCode: [191, 111] },
        ";": { name: [";", ":"], code: "Semicolon", keyCode: 186 },
        "'": { name: ["'", "\""], code: "Quote", keyCode: 222 },
        "[": { name: ["[", "{"], code: "BracketLeft", keyCode: 219 },
        "]": { name: ["]", "}"], code: "BracketRight", keyCode: 221 },
        "\\": { name: ["\\", "|"], code: "Backslash", keyCode: 220 },
        "-": { name: ["-", "_"], code: ["Minus", "NumpadSubtract"], keyCode: [189, 109] },
        "=": { name: ["=", "+"], code: "Equal", keyCode: 187 },
        "`": { name: ["`", "~"], code: "Backquote", keyCode: 192 },
        "+": { code: "NumpadAdd", keyCode: 107 },
        "*": { code: "NumpadMultiply", keyCode: 106 }
    });
    
    // Modifier keys
    $.extend(Keys.modifierKeys, {
        "Alt": { code: ["AltLeft", "AltRight"], keyCode: 18 },
        "Control": { code: ["ControlLeft", "ControlRight"], keyCode: 17 },
        "Caps Lock": { name: "CapsLock", keyCode: 20 },
        "Meta": { name: ["Meta", "OS"], code: ["MetaLeft", "MetaRight"], keyCode: 91 },
        "Num Lock": { name: "NumLock", keyCode: 144 },
        "Scroll Lock": { name: ["Scroll", "ScrollLock"], keyCode: 145 },
        "Shift": { code: ["ShiftLeft", "ShiftRight"], keyCode: 16 }
    });
    
    // Whitespace keys
    $.extend(Keys.whitespaceKeys, {
        "Enter": { code: ["Enter", "NumpadEnter"], keyCode: 13 },
        "Tab": { keyCode: 9 },
        " ": { code: "Space", keyCode: 32 }
    });-
    
    // Function keys
    $.extend(Keys.fnKeys, {
        "F1": { keyCode: 112 },
        "F2": { keyCode: 113 },
        "F3": { keyCode: 114 },
        "F4": { keyCode: 115 },
        "F5": { keyCode: 116 },
        "F6": { keyCode: 117 },
        "F7": { keyCode: 118 },
        "F8": { keyCode: 119 },
        "F9": { keyCode: 120 },
        "F10": { keyCode: 121 },
        "F11": { keyCode: 122 },
        "F12": { keyCode: 123 },
        "F13": { keyCode: 124 },
        "F14": { keyCode: 125 },
        "F15": { keyCode: 126 }
    });
    
    // UI keys
    $.extend(Keys.uiKeys, {
        "Escape": { keyCode: 27 } 
    });
    
    $.extend(true, Keys.keys, Keys.navigationKeys, Keys.editingKeys,
        Keys.alphaNumericKeys, Keys.symbolKeys, Keys.whitespaceKeys,
        Keys.modifierKeys, Keys.fnKeys, Keys.uiKeys);
    
    $.extend(true, Keys, {
        addToCache: function(key){
            var name = key.name || key, inCache = false, cache = [].concat(Keys.cache);
            while (cache.length){
                var item = cache.shift();
                if (item.name === key){ inCache = true; break;}
            }
            
            if (inCache) return;
            var obj = { name: name, active: false };
            Keys.cache.push(obj);
        },
        parse: function(string){
            var split = string.split(/\+/g), res = [];
            while (split.length){
                var item = split.shift();
                if (!Keys.keys.hasOwnProperty(item)){
                    if (Keys.aliases.hasOwnProperty(item)){
                        item = Keys.aliases[item];
                        if (!Keys.keys.hasOwnProperty(item)) continue;
                        res.push(item);
                    } else continue;
                }
                res.push(item);
            }
            return res;
        },
        get: function(){
            var args = Array.from ? Array.from(arguments) : [].slice.call(arguments),
                context = this, item, res, split, name, k, v,
                kPattern = /([^\[\]]*)\[([^\[\]]*)\]/gi,
                qPattern = /(?:\"([^\"]*)\"|\'([^\']*)\')/gi;
            if (args.length === 1){
                item = args[0];
                if (item.indexOf('.') === -1) return context[item] !== void 0 ? context[item] : null;
                split = item.split('.');
                res = context;
                while (split.length && (res instanceof Object || res !== void 0)){
                    name = split.shift();
                    if (kPattern.test(name)){
                        k = name.replace(kPattern, '$1');
                        v = name.replace(kPattern, '$2');
                        if (!isNaN(v) && !qPattern.test(v)) v = parseInt(v, 10);
                        else v = v.replace(qPattern, '$1');
                        res = res[k];
                        if (res[v] !== void 0) res = res[v];
                        else break;
                    } else {
                        res = res[name];
                    }
                }
                return res !== void 0 ? res : null;
            } else {
                var key, value, lastIndex;
                res = {};
                while (args.length){
                    key = args.shift();
                    if (key.indexOf('.') === -1){
                        res[key] = context[key] !== void 0 ? context[key] : null;
                        continue;
                    }
                    split = key.split('.');
                    lastIndex = split.length - 1;
                    value = context;
                    while (split.length && (value instanceof Object || value !== void 0)){
                        name = split.shift(), k, v;
                        if (kPattern.test(name)){
                            k = name.replace(kPattern, '$1');
                            v = name.replace(kPattern, '$2');
                            if (!isNaN(v) && !qPattern.test(v)) v = parseInt(v, 10);
                            else v = v.replace(qPattern, '$1');
                            value = value[k];
                            if (value[v] !== void 0) value = value[v];
                        } else {
                            value = value[name];
                        }
                    }
                    res[split[lastIndex]] = value;
                }
                return res;
            }
        },
        set: function(){
            
        }
    });
}(this, jQuery));