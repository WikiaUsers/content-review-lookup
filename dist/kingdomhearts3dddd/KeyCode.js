/*************
 * KeyCode.js
 * -----------
 * Created by Ultimate Dark Carnage
 *************/
 
var KeyCode = String(void 0) !== typeof KeyCode ? KeyCode : {
    codes: {
        // Letter Keys
        'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,
        // Numpad Keys
        'numpad-0': 96, 'numpad-1': 97, 'numpad-2': 98, 'numpad-3': 99, 'numpad-4': 100, 'numpad-5': 101, 'numpad-6': 102, 'numpad-7': 103, 'numpad-8': 104, 'numpad-9': 105,
        // Function Keys
        'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119, 'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123, 'pause/break': 19,
        // Navigation Keys
        'page-up': 33, 'page-down': 34, 'end': 35, 'home': 36, 'left-arrow': 37, 'up-arrow': 38, 'right-arrow': 39, 'down-arrow': 40,
        // Editing Keys
        'backspace': 8, 'tab': 9, 'enter': 13, 'shift': 16, 'ctrl': 17, 'alt': 18, 'caps-lock': 20, 'escape': 27, 'num-lock': 144, 'scroll-lock': 145,
        // Character Keys
        '*': 106, '+': 107, 'subtract': 109, 'decimal': 110, ';': 186, '=': 187, ',': 188, '-': 189, '.': 190, '/': 191, '`': 192, '[': 219, ']': 221, '\\': 220, '\'': 222,
        // Aliases
        'asterisk': 106, 'plus': 107, 'full-stop': 110, 'control': 17
    },
    pressedKeys: [],
    _add: function(key_code, event){
        let pressedKeys = KeyCode.pressedKeys;
        if (pressedKeys.indexOf(key_code) > -1) return;
        pressedKeys[key_code] = event.type == "keydown";
        KeyCode.pressedKeys = pressedKeys;
    },
    _clear: function(){
        let pressedKeys = KeyCode.pressedKeys;
        if (pressedKeys.length === 0) return;
        pressedKeys = [];
        KeyCode.pressedKeys = pressedKeys;
    },
    _fetch: KeyCode._get,
    _get: function(key, callback){
        key = String.prototype.toLowerCase.call(key);
        let codes = KeyCode.codes;
        if (key in codes || Object.keys(codes).indexOf(key) > -1){
            let value = codes[key];
            if ("function" === typeof callback)
                Function.prototype.apply.call(callback, this, [KeyCode]);
            return value;
        } else {
            let value = null;
            return value;
        }
    },
    _insert: KeyCode._add,
    _is: function(key, key_code){
        key = String.prototype.toLowerCase.call(key);
        let codes = KeyCode.codes;
        if (String(void 0) === typeof key_code || !(key in codes || Object.keys(codes).indexOf(key) > -1)) return void key;
        return codes[key] === key_code;
    },
    _map: function(callback){
        let _l = KeyCode.pressedKeys.length,
            keys = KeyCode.pressedKeys,
            i = 0;
        
        for (; i < _l; i++){
            if (_   )
        }
    },
    _matches: KeyCode._is
};