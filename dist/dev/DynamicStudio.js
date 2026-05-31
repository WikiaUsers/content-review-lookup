// LZString - compression library (readable version)
// Copyright (c) 2013 pieroxy <pieroxy@pieroxy.net>
// MIT License
var LZString = (function() {
    var f = String.fromCharCode;
    var keyStrBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var baseReverseDic = {};

    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i = 0; i < alphabet.length; i++) {
                baseReverseDic[alphabet][alphabet.charAt(i)] = i;
            }
        }
        return baseReverseDic[alphabet][character];
    }

    function _compress(uncompressed, bitsPerChar, getCharFromInt) {
        if (uncompressed === null) return '';
        var i, value,
            context_dictionary = {},
            context_dictionaryToCreate = {},
            context_c = '',
            context_wc = '',
            context_w = '',
            context_enlargeIn = 2,
            context_dictSize = 3,
            context_numBits = 2,
            context_data = [],
            context_data_val = 0,
            context_data_position = 0,
            ii;

        for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                context_dictionary[context_c] = context_dictSize++;
                context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                context_w = context_wc;
            } else {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                        }
                        value = context_w.charCodeAt(0);
                        for (i = 0; i < 8; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    } else {
                        value = 1;
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for (i = 0; i < 16; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
                context_dictionary[context_wc] = context_dictSize++;
                context_w = String(context_c);
            }
        }
        if (context_w !== '') {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 8; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                } else {
                    value = 1;
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | value;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = 0;
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 16; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
            } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                    context_data_val = (context_data_val << 1) | (value & 1);
                    if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
            }
        }
        value = 2;
        for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
            } else {
                context_data_position++;
            }
            value = value >> 1;
        }
        while (true) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar - 1) {
                context_data.push(getCharFromInt(context_data_val));
                break;
            } else {
                context_data_position++;
            }
        }
        return context_data.join('');
    }

    function _decompress(length, resetValue, getNextValue) {
        var dictionary = [],
            next,
            enlargeIn = 4,
            dictSize = 4,
            numBits = 3,
            entry = '',
            result = [],
            i,
            w,
            bits, resb, maxpower, power,
            c,
            data = { val: getNextValue(0), position: resetValue, index: 1 };

        for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
        }
        bits = 0;
        maxpower = Math.pow(2, 2);
        power = 1;
        while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
        }
        switch (next = bits) {
            case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                c = f(bits);
                break;
            case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                c = f(bits);
                break;
            case 2:
                return '';
        }
        dictionary[3] = c;
        w = c;
        result.push(c);
        while (true) {
            if (data.index > length) {
                return '';
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch (c = bits) {
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2, 8);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    dictionary[dictSize++] = f(bits);
                    c = dictSize - 1;
                    enlargeIn--;
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2, 16);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    dictionary[dictSize++] = f(bits);
                    c = dictSize - 1;
                    enlargeIn--;
                    break;
                case 2:
                    return result.join('');
            }
            if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
            }
            if (dictionary[c]) {
                entry = dictionary[c];
            } else {
                if (c === dictSize) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
            }
            w = entry;
        }
    }

    return {
        compressToBase64: function(input) {
            if (input === null) return '';
            var res = _compress(input, 6, function(a) { return keyStrBase64.charAt(a); });
            switch (res.length % 4) {
                default:
                case 0: return res;
                case 1: return res + '===';
                case 2: return res + '==';
                case 3: return res + '=';
            }
        },
        decompressFromBase64: function(input) {
            if (input === null) return '';
            if (input === '') return null;
            return _decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrBase64, input.charAt(index));
            });
        }
    };
}());

mw.hook('wikipage.content').add(function() {

    var username = mw.config.get('wgUserName');
    if (!username) return;

    var isDark = document.body.classList.contains('theme-fandomdesktop-dark');
    var STORAGE_KEY = 'dynamicstudio_' + username;
    var POS_KEY = 'dynamicstudio_pos_' + username;

    var editorColors = isDark ? {
        bg:         '#141414',
        gutter:     '#232323',
        lineNum:    '#72777d',
        activeLine: 'rgba(221, 240, 255, 0.20)',
        text:       '#f8f8f8'
    } : {
        bg:         '#f9f9f9',
        gutter:     '#ebebeb',
        lineNum:    '#72777d',
        activeLine: '#dcdcdc',
        text:       '#080808'
    };

    if (!window.DynamicStudioCSSLoaded) {
        window.DynamicStudioCSSLoaded = true;
        mw.util.addCSS([
            '.ds-container {',
            '    position: fixed;',
            '    z-index: 666666;',
            '    width: 500px;',
            '    background-color: var(--theme-page-background-color);',
            '    font-family: sans-serif;',
            '    box-shadow: 0 4px 16px rgba(0,0,0,0.4);',
            '    display: none;',
            '    flex-direction: column;',
            '    border-radius: 0 6px 6px 6px;',
            '    border: 2px solid var(--theme-page-background-color--secondary);',
            '    min-width: 300px;',
            '    min-height: 200px;',
            '}',
            '.ds-container.ds-open { display: flex; }',
            '.ds-tabs {',
            '    display: flex;',
            '    flex-direction: row;',
            '    position: absolute;',
            '    top: -34px;',
            '    left: -2px;',
            '    align-items: flex-end;',
            '}',
            '.ds-tab {',
            '    padding: 6px 18px;',
            '    cursor: pointer;',
            '    border-radius: 6px 6px 0 0;',
            '    border: 2px solid var(--theme-page-background-color--secondary);',
            '    border-bottom: none;',
            '    font-size: 13px;',
            '    font-weight: bold;',
            '    user-select: none;',
            '    transition: filter 0.15s;',
            '    height: 26px;',
            '    box-sizing: border-box;',
            '    display: flex;',
            '    align-items: center;',
            '    position: relative;',
            '    filter: brightness(0.65);',
            '    margin-right: 3px;',
            '    margin-bottom: -2px;',
            '}',
            '.ds-tab.ds-active {',
            '    filter: brightness(1);',
            '    height: 34px;',
            '    margin-bottom: -2px;',
            '    z-index: 2;',
            '}',
            '.ds-tab:hover:not(.ds-active) { filter: brightness(0.8); }',
            '.ds-tab-notes { background-color: #2e7d32; color: #ffffff; }',
            '.ds-tab-css   { background-color: #f9a825; color: #000000; }',
            '.ds-tab-js    { background-color: #c62828; color: #ffffff; }',
            '.ds-header {',
			'    padding: 8px 12px;',
			'    font-weight: bold;',
			'    font-size: 14px;',
			'    display: flex;',
			'    justify-content: space-between;',
			'    align-items: center;',
			'    cursor: move;',
			'    transition: background-color 0.15s;',
			'    flex-shrink: 0;',
			'    user-select: none;',
			'    position: relative;',
			'    background-color: var(--fandom-image-empty-state-color);',
			'    color: ' + (isDark ? '#ffffff' : '#000000') + ';',
			'}',
			'.ds-header-buttons { display: flex; gap: 6px; align-items: center; flex-shrink: 0; }',
			'.ds-header-tabs {',
			'    display: none;',
			'    gap: 12px;',
			'    align-items: center;',
			'    font-size: 13px;',
			'    font-weight: normal;',
			'    color: ' + (isDark ? '#ffffff' : '#000000') + ';',
			'    margin-left: auto;',
			'    margin-right: 8px;',
			'}',
			'.ds-header-tab {',
			'    cursor: pointer;',
			'    opacity: 0.6;',
			'    transition: opacity 0.15s;',
			'    user-select: none;',
			'    color: ' + (isDark ? '#ffffff' : '#000000') + ';',
			'}',
			'.ds-header-tab:hover { opacity: 1; }',
            '.ds-btn {',
            '    padding: 3px 10px;',
            '    border: none;',
            '    border-radius: 4px;',
            '    cursor: pointer;',
            '    font-size: 12px;',
            '    font-weight: bold;',
            '}',
            '.ds-btn-close, .ds-btn-io, .ds-btn-menu {',
            '    background-color: rgba(0,0,0,0.25);',
            '    color: #fff;',
            '    border: 1px solid rgba(255,255,255,0.3);',
            '}',
            '.ds-btn-close:hover, .ds-btn-io:hover, .ds-btn-menu:hover {',
            '    background-color: rgba(0,0,0,0.4);',
            '}',
            '.ds-btn-close { padding: 3px 8px; }',
            '.ds-btn-menu { font-size: 14px; padding: 2px 8px; letter-spacing: 1px; }',
            '.ds-status { font-size: 11px; opacity: 0.8; font-style: italic; }',
            '.ds-dropdown {',
            '    position: absolute;',
            '    top: 100%;',
            '    right: 0;',
            '    z-index: 10;',
            '    background-color: var(--theme-page-background-color);',
            '    border: 1px solid var(--theme-page-background-color--secondary);',
            '    border-radius: 4px;',
            '    box-shadow: 0 4px 12px rgba(0,0,0,0.3);',
            '    min-width: 160px;',
            '    display: none;',
            '    flex-direction: column;',
            '    overflow: hidden;',
            '}',
            '.ds-dropdown.ds-dropdown-open { display: flex; }',
            '.ds-dropdown-item {',
            '    padding: 8px 14px;',
            '    font-size: 12px;',
            '    cursor: pointer;',
            '    color: var(--theme-page-text-color);',
            '    white-space: nowrap;',
            '    user-select: none;',
            '    border: none;',
            '    background: none;',
            '    text-align: left;',
            '    width: 100%;',
            '    box-sizing: border-box;',
            '}',
            '.ds-dropdown-item:hover { background-color: var(--theme-page-background-color--secondary); }',
            '.ds-dropdown-sep {',
            '    height: 1px;',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    margin: 2px 0;',
            '}',
            '.ds-editor-area {',
            '    display: flex;',
            '    flex-direction: column;',
            '    overflow: hidden;',
            '    flex-shrink: 0;',
            '    width: 100%;',
            '    box-sizing: border-box;',
            '    min-width: 156px;',
            '}',
            '.ds-panel {',
            '    display: none;',
            '    flex: 1;',
            '    flex-direction: column;',
            '    overflow: hidden;',
            '    width: 100%;',
            '    box-sizing: border-box;',
            '    position: relative;',
            '}',
            '.ds-panel.ds-panel-active { display: flex; }',
            '.ds-find-panel {',
            '    position: absolute;',
            '    top: 8px;',
            '    right: 12px;',
            '    z-index: 10;',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    border: 1px solid ' + (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)') + ';',
            '    border-radius: 6px;',
            '    padding: 8px 10px;',
            '    display: none;',
            '    flex-direction: column;',
            '    gap: 6px;',
            '    box-shadow: 0 4px 16px rgba(0,0,0,0.3);',
            '    min-width: 280px;',
            '}',
            '.ds-find-panel.ds-find-open { display: flex; }',
            '.ds-find-row { display: flex; gap: 5px; align-items: center; }',
            '.ds-find-input {',
            '    flex: 1;',
            '    padding: 3px 7px;',
            '    font-size: 11px;',
            '    font-family: monospace;',
            '    border: 1px solid ' + (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)') + ';',
            '    border-radius: 3px;',
            '    background: var(--theme-page-background-color);',
            '    color: var(--theme-page-text-color);',
            '    outline: none;',
            '}',
            '.ds-find-input.ds-find-nomatch { border-color: rgba(198,40,40,0.6); }',
            '.ds-find-btn {',
            '    padding: 3px 7px;',
            '    font-size: 11px;',
            '    border: 1px solid ' + (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)') + ';',
            '    border-radius: 3px;',
            '    background: var(--theme-page-background-color);',
            '    color: var(--theme-page-text-color);',
            '    cursor: pointer;',
            '    white-space: nowrap;',
            '}',
            '.ds-find-btn:hover { opacity: 0.75; }',
            '.ds-find-count { font-size: 10px; opacity: 0.5; white-space: nowrap; font-family: monospace; min-width: 40px; text-align: right; }',
            '.ds-hl-match { background: rgba(255,200,0,0.35); border-radius: 2px; }',
            '.ds-hl-match-current { background: rgba(255,140,0,0.55); border-radius: 2px; }',
            '.ds-textarea {',
            '    flex: 1;',
            '    width: 100%;',
            '    box-sizing: border-box;',
            '    resize: none;',
            '    border: none;',
            '    outline: none;',
            '    padding: 10px;',
            '    font-size: 13px;',
            '    line-height: 21px;',
            '    background-color: var(--theme-page-background-color);',
            '    color: var(--theme-page-text-color);',
            '    font-family: sans-serif;',
            '    overflow-y: auto;',
            '}',
            '.ds-wikitext-wrap {',
            '    display: flex;',
            '    flex-direction: row;',
            '    flex: 1;',
            '    overflow: hidden;',
            '    position: relative;',
            '    min-height: 0;',
            '}',
            '.ds-wikitext-input-pane {',
            '    display: flex;',
            '    flex-direction: column;',
            '    overflow: hidden;',
            '    min-width: 0;',
            '    flex-shrink: 0;',
            '}',
            '.ds-wikitext-slider {',
            '    width: 6px;',
            '    flex-shrink: 0;',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    cursor: col-resize;',
            '    transition: background-color 0.15s;',
            '    position: relative;',
            '    z-index: 1;',
            '}',
            '.ds-wikitext-slider:hover, .ds-wikitext-slider.ds-slider-dragging {',
            '    background-color: var(--theme-link-color, #3366cc);',
            '}',
            '.ds-wikitext-slider::after {',
            '    content: "";',
            '    position: absolute;',
            '    top: 50%;',
            '    left: 50%;',
            '    transform: translate(-50%, -50%);',
            '    width: 2px;',
            '    height: 24px;',
            '    border-left: 2px dotted rgba(128,128,128,0.5);',
            '    border-right: 2px dotted rgba(128,128,128,0.5);',
            '    border-left-width: 0;',
            '    border-right-width: 0;',
            '    background: repeating-linear-gradient(to bottom, rgba(128,128,128,0.5) 0px, rgba(128,128,128,0.5) 2px, transparent 2px, transparent 4px);',
            '    border-radius: 1px;',
            '}',
            '.ds-wikitext-output-pane {',
            '    flex: 1;',
            '    overflow-y: auto;',
            '    overflow-x: hidden;',
            '    min-width: 0;',
            '    padding: 24px 36px;',
            '    font-size: 13px;',
            '    background-color: var(--theme-page-background-color);',
            '    color: var(--theme-page-text-color);',
            '    box-sizing: border-box;',
            '    border-left: 1px solid var(--theme-page-background-color--secondary);',
            '    overflow-wrap: break-word;',
            '    word-break: break-word;',
            '}',
            '.ds-wikitext-output-pane .mw-parser-output ul:not(.toc *) {',
            '    list-style: disc;',
            '    margin: 6px 0 18px 36px;',
            '}',
            '.ds-wikitext-output-pane .mw-parser-output ol:not(.toc *) {',
            '    list-style: decimal;',
            '    margin: 6px 0 18px 36px;',
            '}',
            '.ds-wikitext-output-pane .mw-parser-output ul ul:not(.toc *),',
            '.ds-wikitext-output-pane .mw-parser-output ol ul:not(.toc *),',
            '.ds-wikitext-output-pane .mw-parser-output ul ol:not(.toc *),',
            '.ds-wikitext-output-pane .mw-parser-output ol ol:not(.toc *) {',
            '    margin-bottom: 4px;',
            '}',
            '.ds-wikitext-output-pane .toc ul,',
            '.ds-wikitext-output-pane .toc ol {',
            '    list-style: none;',
            '    margin: 0;',
            '    padding: 0;',
            '}',
            '.ds-wikitext-output-pane.ds-output-loading {',
            '    opacity: 0.5;',
            '}',
            '.ds-wikitext-output-empty {',
            '    color: var(--theme-page-text-color);',
            '    opacity: 0.4;',
            '    font-style: italic;',
            '    font-size: 12px;',
            '    margin-top: 4px;',
            '}',
            '.ds-code-wrap {',
            '    flex: 1;',
            '    display: flex;',
            '    overflow-x: hidden;',
            '    overflow-y: auto;',
            '    position: relative;',
            '    background-color: ' + editorColors.bg + ';',
            '    width: 100%;',
            '    box-sizing: border-box;',
            '}',
            '.ds-gutter {',
            '    width: 44px;',
            '    min-width: 44px;',
            '    background-color: ' + editorColors.gutter + ';',
            '    flex-shrink: 0;',
            '    z-index: 1;',
            '    height: fit-content;',
            '    min-height: 100%;',
            '}',
            '.ds-line-numbers {',
            '    font-family: monospace;',
            '    font-size: 13px;',
            '    line-height: 21px;',
            '    color: ' + editorColors.lineNum + ';',
            '    user-select: none;',
            '    padding-top: 10px;',
            '}',
            '.ds-ln-row {',
            '    display: flex;',
            '    align-items: flex-start;',
            '    justify-content: space-between;',
            '    box-sizing: border-box;',
            '    width: 44px;',
            '    position: relative;',
            '    overflow: hidden;',
            '}',
            '.ds-ln-row.ds-ln-error { }',
            '.ds-ln-row.ds-ln-current { background-color: rgba(255, 255, 255, 0.031); }',
            '.ds-ln-icon {',
            '    flex-shrink: 0;',
            '    width: 18px;',
            '    height: 21px;',
            '    display: none;',
            '    align-items: center;',
            '    justify-content: center;',
            '}',
            '.ds-ln-row.ds-ln-error .ds-ln-icon { display: flex; }',
            '.ds-ln-num {',
            '    flex: 1;',
            '    text-align: right;',
            '    padding-right: 2px;',
            '    line-height: 21px;',
            '    white-space: nowrap;',
            '}',
            '.ds-ln-fold {',
            '    flex-shrink: 0;',
            '    width: 14px;',
            '    height: 21px;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '    cursor: pointer;',
            '    font-size: 9px;',
            '    opacity: 0.25;',
            '    user-select: none;',
            '    color: inherit;',
            '    line-height: 21px;',
            '}',
            '.ds-ln-row:hover .ds-ln-fold { opacity: 0.7; }',
            '.ds-code-inner {',
            '    flex: 1;',
            '    position: relative;',
            '    min-width: 0;',
            '    width: 100%;',
            '    overflow-y: auto;',
            '    overflow-x: hidden;',
            '}',
            '.ds-measure {',
            '    position: absolute;',
            '    visibility: hidden;',
            '    pointer-events: none;',
            '    font-family: monospace;',
            '    font-size: 13px;',
            '    line-height: 21px;',
            '    padding: 0 10px;',
            '    box-sizing: border-box;',
            '    white-space: pre-wrap;',
            '    word-wrap: break-word;',
            '    top: 0; left: 0; right: 0;',
            '}',
            '.ds-code-highlight {',
            '    position: absolute;',
            '    top: 0; left: 0; right: 0;',
            '    width: 100%;',
            '    pointer-events: none;',
            '    padding: 10px 10px 0 10px;',
            '    box-sizing: border-box;',
            '}',
            '.ds-hl-line {',
            '    display: block;',
            '    width: 100%;',
            '    border-radius: 2px;',
            '}',
            '.ds-hl-line.ds-hl-current { background: ' + editorColors.activeLine + '; }',
            '.ds-code-textarea {',
            '    position: absolute;',
            '    top: 0; left: 0; right: 0; bottom: 0;',
            '    width: 100%;',
            '    height: 100%;',
            '    border: none;',
            '    outline: none;',
            '    padding: 10px;',
            '    font-family: monospace;',
            '    font-size: 13px;',
            '    line-height: 21px;',
            '    resize: none;',
            '    tab-size: 4;',
            '    box-sizing: border-box;',
            '    background: transparent;',
            '    color: ' + editorColors.text + ';',
            '    white-space: pre-wrap;',
            '    word-wrap: break-word;',
            '    overflow: hidden;',
            '}',
            '.ds-corner {',
            '    position: absolute;',
            '    width: 14px;',
            '    height: 14px;',
            '    z-index: 10;',
            '}',
            '.ds-corner-nw { top: -2px; left: -2px; cursor: nw-resize; }',
            '.ds-corner-ne { top: -2px; right: -2px; cursor: ne-resize; }',
            '.ds-corner-sw { bottom: -2px; left: -2px; cursor: sw-resize; }',
            '.ds-corner-se { bottom: -2px; right: -2px; cursor: se-resize; }',
            '.ds-io-overlay {',
            '    position: fixed;',
            '    top: 0; left: 0; right: 0; bottom: 0;',
            '    background: rgba(0,0,0,0.55);',
            '    z-index: 777777776;',
            '    display: none;',
            '    align-items: center;',
            '    justify-content: center;',
            '}',
            '.ds-io-overlay.ds-io-open { display: flex; }',
            '.ds-io-modal {',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    color: var(--theme-page-text-color);',
            '    border-radius: 8px;',
            '    padding: 24px;',
            '    width: 480px;',
            '    max-width: 92vw;',
            '    font-size: 13px;',
            '    display: flex;',
            '    flex-direction: column;',
            '    gap: 14px;',
            '    box-shadow: 0 8px 32px rgba(0,0,0,0.4);',
            '}',
            '.ds-io-modal-title {',
            '    font-size: 15px;',
            '    font-weight: bold;',
            '    margin-bottom: 2px;',
            '}',
            '.ds-io-modal-desc {',
            '    font-size: 12px;',
            '    opacity: 0.65;',
            '    line-height: 18px;',
            '    margin-top: -6px;',
            '}',
            '.ds-io-section {',
            '    display: flex;',
            '    flex-direction: column;',
            '    gap: 6px;',
            '}',
            '.ds-io-section-label {',
            '    font-size: 11px;',
            '    font-weight: bold;',
            '    text-transform: uppercase;',
            '    letter-spacing: 0.06em;',
            '    opacity: 0.5;',
            '}',
            '.ds-io-row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }',
            '.ds-io-label { font-size: 12px; color: var(--theme-page-text-color); opacity: 0.7; min-width: 60px; }',
            '.ds-io-btn {',
            '    padding: 3px 8px;',
            '    border: 1px solid var(--theme-page-background-color--secondary);',
            '    border-radius: 4px;',
            '    cursor: pointer;',
            '    font-size: 11px;',
            '    font-weight: bold;',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    color: var(--theme-page-text-color);',
            '}',
            '.ds-io-btn:hover { opacity: 0.8; }',
            '.ds-io-input {',
            '    flex: 1;',
            '    padding: 4px 8px;',
            '    border: 1px solid rgba(128,128,128,0.25);',
            '    border-radius: 4px;',
            '    font-size: 11px;',
            '    background-color: var(--theme-page-background-color);',
            '    color: var(--theme-page-text-color);',
            '    font-family: monospace;',
            '    outline: none;',
            '    width: 100%;',
            '    box-sizing: border-box;',
            '}',
            '.ds-io-close {',
            '    align-self: flex-start;',
            '    background: none;',
            '    border: none;',
            '    color: var(--theme-page-text-color);',
            '    font-size: 18px;',
            '    cursor: pointer;',
            '    opacity: 0.5;',
            '    padding: 0;',
            '    line-height: 1;',
            '}',
            '.ds-io-close:hover { opacity: 1; }',
            '.ds-status-bar {',
            '    display: flex;',
            '    align-items: center;',
            '    height: 22px;',
            '    font-size: 11px;',
            '    font-family: monospace;',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    color: ' + (isDark ? '#ffffff' : '#000000') + ';',
            '    border-top: 1px solid ' + (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.10)') + ';',
            '    flex-shrink: 0;',
            '    user-select: none;',
            '    overflow: hidden;',
            '}',
            '.ds-status-left {',
            '    display: flex;',
            '    align-items: center;',
            '    gap: 0;',
            '    flex-shrink: 0;',
            '    height: 100%;',
            '    border-right: 1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)') + ';',
            '}',
            '.ds-status-counter {',
            '    display: flex;',
            '    align-items: center;',
            '    gap: 3px;',
            '    padding: 0 8px;',
            '    height: 100%;',
            '    cursor: pointer;',
            '    opacity: 0.45;',
            '    font-size: 11px;',
            '    border-right: 1px solid ' + (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)') + ';',
            '}',
            '.ds-status-counter:last-child { border-right: none; }',
            '.ds-status-counter:hover { opacity: 0.85; background: rgba(128,128,128,0.1); }',
            '.ds-status-counter.ds-status-has-errors { opacity: 1; }',
            '.ds-status-counter-icon { font-size: 12px; line-height: 1; }',
            '.ds-status-msg {',
            '    flex: 1;',
            '    padding: 0 10px;',
            '    overflow: hidden;',
            '    white-space: nowrap;',
            '    text-overflow: ellipsis;',
            '    opacity: 0;',
            '    font-size: 11px;',
            '    transition: opacity 0.15s;',
            '}',
            '.ds-status-msg.ds-status-msg-visible { opacity: 1; }',
            '.ds-status-pos {',
            '    flex-shrink: 0;',
            '    padding: 0 10px;',
            '    opacity: 0.4;',
            '    white-space: nowrap;',
            '    border-left: 1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)') + ';',
            '    height: 100%;',
            '    display: flex;',
            '    align-items: center;',
            '}',
            '#ds-toolbar-link { cursor: pointer; color: inherit !important; }',
            '.ds-warning-overlay {',
            '    position: fixed;',
            '    top: 0; left: 0; right: 0; bottom: 0;',
            '    background: rgba(0,0,0,0.6);',
            '    z-index: 777777777;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '}',
            '.ds-warning-box {',
            '    background-color: var(--theme-page-background-color--secondary);',
            '    color: var(--theme-page-text-color);',
            '    border-radius: 8px;',
            '    padding: 24px;',
            '    max-width: 420px;',
            '    width: 90%;',
            '    font-size: 13px;',
            '    line-height: 21px;',
            '    display: flex;',
            '    flex-direction: column;',
            '    gap: 12px;',
            '}',
            '.ds-warning-title {',
            '    font-size: 22px;',
            '    font-weight: bold;',
            '    color: var(--theme-alert-color--secondary);',
            '    text-align: center;',
            '    text-transform: uppercase;',
            '    letter-spacing: 1px;',
            '}',
            '.ds-warning-body { font-size: 13px; line-height: 21px; }',
            '.ds-warning-actions { display: flex; justify-content: space-between; margin-top: 8px; }',
            '.ds-warning-confirm {',
            '    padding: 6px 14px;',
            '    background: transparent;',
            '    color: var(--theme-success-color--secondary);',
            '    border: none;',
            '    cursor: not-allowed;',
            '    font-weight: bold;',
            '    font-size: 13px;',
            '    opacity: 0.4;',
            '}',
            '.ds-warning-confirm.ds-ready { cursor: pointer; opacity: 1; }',
            '.ds-warning-back {',
            '    padding: 6px 14px;',
            '    background: transparent;',
            '    color: var(--theme-alert-color--secondary);',
            '    border: none;',
            '    cursor: pointer;',
            '    font-weight: bold;',
            '    font-size: 13px;',
            '}'
        ].join('\n'));
    }

    var dsConfigEl = document.createElement('div');
    dsConfigEl.className = 'dynamic-studio';
    dsConfigEl.style.display = 'none';
    document.body.appendChild(dsConfigEl);

    function getDSProp(prop) {
        return getComputedStyle(dsConfigEl).getPropertyValue(prop).trim().replace(/['"]/g, '');
    }

    var KNOWN_PRESETS = ['Default', 'Folders', 'Notepad', 'Minimal'];

    function getPreset() {
        var val = getDSProp('--ds-style-preset');
        return KNOWN_PRESETS.indexOf(val) !== -1 ? val : 'Default';
    }

    function getFolderTabColor(tabId) {
        var defaults = { notes: '#2e7d32', css: '#f9a825', js: '#c62828' };
        var val = getDSProp('--ds-tab-color-' + tabId);
        return val || defaults[tabId];
    }

    function getFolderTabText(tabId) {
        var col = getFolderTabColor(tabId);
        var val = getDSProp('--ds-tab-text-' + tabId);
        if (val) return val;
        return tabId === 'css' ? '#000000' : '#ffffff';
    }

    function getNotepadProp(prop, fallback) {
        var val = getDSProp('--ds-notepad-' + prop);
        return val || fallback;
    }

    function savePos() {
        try {
            localStorage.setItem(POS_KEY, JSON.stringify({
                left: container.style.left, top: container.style.top,
                width: container.offsetWidth, height: editorArea.offsetHeight
            }));
        } catch(e) {}
    }

    function loadPos() {
        try { var r = localStorage.getItem(POS_KEY); return r ? JSON.parse(r) : null; }
        catch(e) { return null; }
    }

    var storageWarningShown = false;
    var storageWarnEls = [];

    function saveLocal() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                wikitext: notesTextarea ? notesTextarea.value : '',
                css:   cssEditor ? cssEditor.getValue() : '',
                js:    jsEditor  ? jsEditor.getValue()  : ''
            }));
        } catch(e) {
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                storageWarnEls.forEach(function(el) { el.style.display = ''; });
                if (!storageWarningShown) {
                    storageWarningShown = true;
                    showWarning('storage', function() {}, null);
                }
            }
        }
    }

    function loadLocal() {
        try { var r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; }
        catch(e) { return null; }
    }

    function exportData(type) {
        var data = {}, prefix = '';
        if (type === 'all')   { prefix = 'DSALLV1'; data = { wikitext: notesTextarea.value, css: cssEditor.getValue(), js: jsEditor.getValue() }; }
        if (type === 'notes') { prefix = 'DSWKTV1'; data = { wikitext: notesTextarea.value }; }
        if (type === 'css')   { prefix = 'DSCSSV1'; data = { css: cssEditor.getValue() }; }
        if (type === 'js')    { prefix = 'DSJSV1';  data = { js:  jsEditor.getValue()  }; }
        return prefix + ':' + LZString.compressToBase64(JSON.stringify(data));
    }

    function importData(str, callback) {
        str = str.trim();
        var ci = str.indexOf(':');
        if (ci === -1) return false;
        var prefix = str.substring(0, ci), data;
        try {
            var decompressed = LZString.decompressFromBase64(str.substring(ci + 1));
            if (!decompressed) {
                decompressed = decodeURIComponent(escape(atob(str.substring(ci + 1))));
            }
            data = JSON.parse(decompressed);
        } catch(e) { return false; }
        var hasJS = data && typeof data.js === 'string' && data.js.trim().length > 0;
        if (hasJS) {
            showWarning('import', function() { applyImport(prefix, data); callback(true); }, function() { callback(false); });
            return 'pending';
        }
        applyImport(prefix, data);
        return true;
    }

    function applyImport(prefix, data) {
        if (prefix === 'DSALLV1') {
            if (data.wikitext !== undefined) setNotesValue(data.wikitext);
            if (data.css   !== undefined) cssEditor.setValue(data.css);
            if (data.js    !== undefined) jsEditor.setValue(data.js);
        } else if (prefix === 'DSWKTV1' || prefix === 'DSNTSV1') {
            var wt = data.wikitext !== undefined ? data.wikitext : data.notes;
            if (wt !== undefined) setNotesValue(wt);
        } else if (prefix === 'DSCSSV1') {
            if (data.css !== undefined) cssEditor.setValue(data.css);
        } else if (prefix === 'DSJSV1') {
            if (data.js !== undefined) jsEditor.setValue(data.js);
        }
        saveLocal();
    }

    function showWarning(type, onConfirm, onBack) {
        var overlay = document.createElement('div');
        overlay.className = 'ds-warning-overlay';
        var box = document.createElement('div');
        box.className = 'ds-warning-box';
        var titleEl = document.createElement('div');
        titleEl.className = 'ds-warning-title';
        var body = document.createElement('div');
        body.className = 'ds-warning-body';
        if (type === 'import') {
            titleEl.textContent = 'Importing JS';
            body.innerHTML = 'This string includes JavaScript that could be potentially harmful.<br><br>Imported JavaScript runs with the same permissions as your account.<br>Malicious code could compromise your account, manipulate site content, or perform other harmful actions without your knowledge.<br><br>Review the code before importing.<br><small>(<b>do not</b> import scripts you do not understand, always attempt to get a trustworthy middleman to read code if you do not understand it, if a user is pressuring you to run javascript in a certain amount of time, do not trust them. There is no need to rush.)</small>';
        }
        if (type === 'run') {
            titleEl.textContent = 'Running JS';
            body.innerHTML = 'You are about to execute JavaScript.<br>This will be executed on the page you\'re currently on.<br><br>Every effect caused by JavaScript can be undone by reloading the page.<br><br>Are you sure you want to execute this JavaScript right now?';
        }
        if (type === 'storage') {
            titleEl.textContent = 'Storage Limit Reached';
            body.innerHTML = 'DynamicStudio has hit the browser\'s localStorage limit and <b>your changes are no longer being saved automatically.</b><br><br>To avoid losing your work:<br><br><b>Export your data</b> using the ⇅ button in the toolbar before closing this tab.<br><br>You can clear space by exporting and then clearing your browser\'s site data for Fandom, or by removing other stored data.';
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'I understand';
            confirmBtn.classList.add('ds-ready');
            clearInterval(timer);
            backBtn.style.display = 'none';
        }
        var actions = document.createElement('div');
        actions.className = 'ds-warning-actions';
        var confirmBtn = document.createElement('button');
        confirmBtn.className = 'ds-warning-confirm';
        confirmBtn.disabled = true;
        var backBtn = document.createElement('button');
        backBtn.className = 'ds-warning-back';
        backBtn.textContent = 'Back';
        var remaining = 10;
        confirmBtn.textContent = 'Confirm (' + remaining + ')';
        var timer = setInterval(function() {
            remaining--;
            if (remaining > 0) { confirmBtn.textContent = 'Confirm (' + remaining + ')'; }
            else { clearInterval(timer); confirmBtn.disabled = false; confirmBtn.textContent = 'Confirm'; confirmBtn.classList.add('ds-ready'); }
        }, 1000);
        backBtn.onclick = function() { clearInterval(timer); document.body.removeChild(overlay); if (onBack) onBack(); };
        confirmBtn.onclick = function() { if (confirmBtn.disabled) return; clearInterval(timer); document.body.removeChild(overlay); onConfirm(); };
        actions.appendChild(confirmBtn);
        actions.appendChild(backBtn);
        box.appendChild(titleEl);
        box.appendChild(body);
        box.appendChild(actions);
        overlay.appendChild(box);
        document.body.appendChild(overlay);
    }

    function getCSSErrorLines(code) {
        var errorLines = [], lines = code.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line || line.indexOf('{') !== -1 || line.indexOf('}') !== -1 ||
                line.indexOf('/*') !== -1 || line.indexOf('*/') !== -1 || line.indexOf('@') === 0) continue;
            if (line.indexOf(':') !== -1) {
                var ci = line.indexOf(':');
                var prop = line.substring(0, ci).trim();
                var val  = line.substring(ci + 1).trim().replace(/;$/, '').trim();
                if (prop && val && !CSS.supports(prop, val)) {
                    errorLines.push({ line: i, message: 'Unknown property or value: ' + prop + ': ' + val });
                }
            } else if (line !== '' && line !== ';') {
                errorLines.push({ line: i, message: 'Unexpected token: ' + line });
            }
        }
        return errorLines;
    }

    function getJSErrorLine(code) {
        try { new Function(code); } catch(e) { return extractJSErrorLine(e); }
        try {
            new Function('"use strict";\nconst alert=function(){};\nconst confirm=function(){};\nconst prompt=function(){};\n' + code);
        } catch(e) { return extractJSErrorLine(e); }
        return { line: -1, message: '' };
    }

    function extractJSErrorLine(e) {
        var line = 0;
        if (typeof e.lineNumber === 'number') line = e.lineNumber - 1;
        else if (typeof e.line === 'number') line = e.line - 1;
        else if (e.stack) {
            var m = e.stack.match(/<anonymous>:(\d+):\d+/);
            if (m) line = parseInt(m[1], 10) - 2;
        }
        return { line: line, message: e.message || '' };
    }

    function cssBeautify(code) {
        var result = '', depth = 0, indent = '    ';
        var i = 0, len = code.length, ch, buf = '';

        function pad() {
            var s = '';
            for (var d = 0; d < depth; d++) s += indent;
            return s;
        }

        while (i < len) {
            ch = code[i];
            if (ch === '/' && code[i+1] === '*') {
                var end = code.indexOf('*/', i + 2);
                if (end === -1) end = len - 2;
                result += pad() + code.slice(i, end + 2).trim() + '\n';
                i = end + 2;
                continue;
            }
            if (ch === '{') { result += ' {\n'; depth++; buf = ''; i++; continue; }
            if (ch === '}') {
                if (buf.trim()) result += pad() + buf.trim() + '\n';
                buf = '';
                depth = Math.max(0, depth - 1);
                result += pad() + '}\n\n';
                i++;
                continue;
            }
            if (ch === ';') { result += pad() + buf.trim() + ';\n'; buf = ''; i++; continue; }
            if (ch === '\n' || ch === '\r') { i++; continue; }
            buf += ch;
            i++;
        }
        if (buf.trim()) result += buf.trim() + '\n';
        return result.replace(/\n{3,}/g, '\n\n').trim();
    }

    function cssMinify(code) {
        return code
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\s+/g, ' ')
            .replace(/\s*{\s*/g, '{')
            .replace(/\s*}\s*/g, '}')
            .replace(/\s*:\s*/g, ':')
            .replace(/\s*;\s*/g, ';')
            .replace(/\s*,\s*/g, ',')
            .trim();
    }

    function jsBeautify(code) {
        var lines = code.split('\n');
        var result = [], depth = 0, indent = '    ';

        function pad(d) {
            var s = '';
            for (var i = 0; i < d; i++) s += indent;
            return s;
        }

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) { result.push(''); continue; }
            var closes = (line.match(/^[}\])]/) || []).length;
            if (closes) depth = Math.max(0, depth - closes);
            line = line
                .replace(/([^=!<>])=([^=])/g, '$1 = $2')
                .replace(/([^<>!])===|==([^>])/g, function(m) { return ' ' + m.trim() + ' '; })
                .replace(/,(?!\s)/g, ', ')
                .replace(/\s+/g, ' ')
                .trim();
            result.push(pad(depth) + line);
            var open  = (line.match(/[{[(]/g) || []).length;
            var close = (line.match(/[}\])]/g) || []).length;
            depth = Math.max(0, depth + open - close);
        }
        return result.join('\n');
    }

    function jsMinify(code) {
        code = code.replace(/\/\*[\s\S]*?\*\//g, '');
        code = code.replace(/([^:])\/\/.*$/mg, '$1');
        code = code.replace(/\s+/g, ' ');
        code = code.replace(/\s*([{};,=+\-*/<>!&|?:])\s*/g, '$1');
        return code.trim();
    }

    function addImportant(text) {
        return text.replace(/:\s*([^;{}]+?)(\s*!important)?\s*;/g, function(m, val) {
            return ': ' + val.trim() + ' !important;';
        });
    }

    function removeImportant(text) {
        return text.replace(/\s*!important/gi, '');
    }

    function buildCodeEditor(type) {
        var panel = document.createElement('div');
        panel.className = 'ds-panel';
        panel.dataset.panel = type;

        var wrap = document.createElement('div');
        wrap.className = 'ds-code-wrap';

        var gutter = document.createElement('div');
        gutter.className = 'ds-gutter';
        var lineNumbers = document.createElement('div');
        lineNumbers.className = 'ds-line-numbers';
        gutter.appendChild(lineNumbers);

        var inner = document.createElement('div');
        inner.className = 'ds-code-inner';
        var measure = document.createElement('div');
        measure.className = 'ds-measure';
        inner.appendChild(measure);

        var highlight = document.createElement('div');
        highlight.className = 'ds-code-highlight';
        var textarea = document.createElement('textarea');
        textarea.className = 'ds-code-textarea';
        textarea.spellcheck = false;
        inner.appendChild(highlight);
        inner.appendChild(textarea);

        var statusBar = document.createElement('div');
        statusBar.className = 'ds-status-bar';

        var statusLeft = document.createElement('div');
        statusLeft.className = 'ds-status-left';

        var errorCounter = document.createElement('span');
        errorCounter.className = 'ds-status-counter';
        errorCounter.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==" width="14" height="14" style="vertical-align:middle;margin-right:3px;"> <span class="ds-status-counter-num">0</span>';
        errorCounter.title = 'Errors - click to cycle';
        statusLeft.appendChild(errorCounter);

        var statusMsg = document.createElement('span');
        statusMsg.className = 'ds-status-msg';

        var statusRight = document.createElement('div');
        statusRight.style.cssText = 'display:flex; align-items:center; gap:0; margin-left:auto; flex-shrink:0;';

        var statusStorageWarn = document.createElement('span');
        statusStorageWarn.style.cssText = 'font-size:10px; color:#ff6b6b; font-family:monospace; padding:0 8px; display:none; border-right:1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)') + ';';
        statusStorageWarn.textContent = '! unsaved';
        statusStorageWarn.title = 'Storage limit reached - changes are not being saved!';
        storageWarnEls.push(statusStorageWarn);

        var statusKB = document.createElement('span');
        statusKB.style.cssText = 'font-size:10px; font-family:monospace; opacity:0.35; padding:0 8px; border-right:1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)') + ';';

        var statusPos = document.createElement('span');
        statusPos.className = 'ds-status-pos';
        statusPos.textContent = '1:1';

        statusRight.appendChild(statusStorageWarn);
        statusRight.appendChild(statusKB);
        statusRight.appendChild(statusPos);

        statusBar.appendChild(statusLeft);
        statusBar.appendChild(statusMsg);
        statusBar.appendChild(statusRight);

        wrap.appendChild(gutter);
        wrap.appendChild(inner);
        panel.appendChild(wrap);
        panel.appendChild(statusBar);

        var currentCSSErrors = [];
        var currentJSError = -1;
        var foldedLines = {};
        var unfoldedValue = '';

        function applyFolds() {
            var lines = unfoldedValue.split('\n');
            var hiddenLines = {};
            var openerCloser = {};
            for (var openerIdx in foldedLines) {
                if (!foldedLines[openerIdx]) continue;
                var oi = parseInt(openerIdx, 10);
                var range = getFoldRange(lines, oi);
                if (range) {
                    for (var li = range.start; li <= range.end; li++) hiddenLines[li] = true;
                    openerCloser[oi] = lines[range.end].trim();
                }
            }

            var visibleLines = [];
            for (var i = 0; i < lines.length; i++) {
                if (hiddenLines[i]) continue;
                if (openerCloser[i] !== undefined) {
                    var openerTrimmed = lines[i].trimRight();
                    visibleLines.push(openerTrimmed + ' \u2026 ' + openerCloser[i]);
                } else {
                    visibleLines.push(lines[i]);
                }
            }
            textarea.value = visibleLines.join('\n');
            refresh();
        }

        var errorCycleIdx = 0;

        function getAllErrors() {
            if (type === 'css') return currentCSSErrors.map(function(e) { return e.line; });
            return currentJSError >= 0 ? [currentJSError] : [];
        }

        errorCounter.addEventListener('click', function() {
            var errs = getAllErrors();
            if (errs.length === 0) return;
            errorCycleIdx = (errorCycleIdx + 1) % errs.length;
            var spans = highlight.querySelectorAll('.ds-hl-line');
            if (spans[errs[errorCycleIdx]]) spans[errs[errorCycleIdx]].scrollIntoView({ block: 'center' });
        });

        function updateErrorBar(cssErrors, jsError, jsMsg) {
            currentCSSErrors = cssErrors;
            currentJSError = jsError;
            errorCycleIdx = 0;

            var errs = type === 'css' ? cssErrors : (jsError >= 0 ? [{ line: jsError }] : []);
            var numEl = errorCounter.querySelector('.ds-status-counter-num');
            numEl.textContent = errs.length;
            if (errs.length > 0) {
                errorCounter.classList.add('ds-status-has-errors');
                errorCounter.title = errs.length + ' error' + (errs.length > 1 ? 's' : '') + ' - click to cycle';
            } else {
                errorCounter.classList.remove('ds-status-has-errors');
                errorCounter.title = 'No errors';
            }
            updateStatusMsg(jsMsg);
        }

        function updateStatusMsg(jsMsg) {
            var curLine = textarea.value.substring(0, textarea.selectionStart).split('\n').length - 1;
            var msg = '';
            if (type === 'css') {
                var match = currentCSSErrors.filter(function(e) { return e.line === curLine; })[0];
                if (match) msg = match.message;
            } else {
                if (currentJSError === curLine) msg = jsMsg || ('Syntax error on line ' + (curLine + 1));
            }
            statusMsg.textContent = msg;
            if (msg) statusMsg.classList.add('ds-status-msg-visible');
            else statusMsg.classList.remove('ds-status-msg-visible');
        }

        function updateStatusPos() {
            var before = textarea.value.substring(0, textarea.selectionStart);
            var lines = before.split('\n');
            statusPos.textContent = lines.length + ':' + (lines[lines.length - 1].length + 1);
            updateStatusMsg(currentJSMsg);

            try {
                var val = localStorage.getItem(STORAGE_KEY);
                statusKB.textContent = val ? (val.length / 1024).toFixed(1) + ' KB' : '0 KB';
            } catch(e) {}
        }

        var currentJSMsg = '';

        textarea.addEventListener('click', updateStatusPos);
        textarea.addEventListener('keyup', updateStatusPos);

        function getFoldRange(lines, openerIdx) {
            var openerLine = lines[openerIdx];
            var OPENERS = ['{', '[', '('];
            var CLOSERS = ['}', ']', ')'];
            var openChar = null, closeChar = null;
            for (var k = openerLine.length - 1; k >= 0; k--) {
                var ci = OPENERS.indexOf(openerLine[k]);
                if (ci !== -1) { openChar = OPENERS[ci]; closeChar = CLOSERS[ci]; break; }
            }
            if (!openChar) return null;
            var depth = 0;
            for (var i = openerIdx; i < lines.length; i++) {
                for (var c = 0; c < lines[i].length; c++) {
                    if (lines[i][c] === openChar) depth++;
                    else if (lines[i][c] === closeChar) {
                        depth--;
                        if (depth === 0) {
                            if (i === openerIdx) return null;
                            return { start: openerIdx + 1, end: i };
                        }
                    }
                }
            }
            return null;
        }

        var lineHeightCache = {};
        var lastContainerWidth = 0;
        var cachedLineH = null;

        function measureLineHeight(text, lineIndex, isCurrentLine) {
            var containerWidth = inner.offsetWidth;

            if (containerWidth !== lastContainerWidth) {
                lineHeightCache = {};
                cachedLineH = null;
                lastContainerWidth = containerWidth;
            }

            if (!cachedLineH) {
                var wasHiddenInit = !panel.classList.contains('ds-panel-active');
                if (wasHiddenInit) {
                    inner.style.visibility = 'hidden';
                    inner.style.position = 'fixed';
                    inner.style.display = 'block';
                }
                measure.style.width = containerWidth + 'px';
                measure.textContent = '\u200b';
                cachedLineH = measure.offsetHeight || 21;
                if (wasHiddenInit) {
                    inner.style.visibility = '';
                    inner.style.position = '';
                    inner.style.display = '';
                }
            }

            if (!isCurrentLine && lineHeightCache[lineIndex] !== undefined) {
                return lineHeightCache[lineIndex];
            }

            var wasHidden = !panel.classList.contains('ds-panel-active');
            if (wasHidden) {
                inner.style.visibility = 'hidden';
                inner.style.position = 'fixed';
                inner.style.display = 'block';
            }
            measure.style.width = containerWidth + 'px';
            measure.textContent = text + '\u200b';
            var h = measure.offsetHeight || cachedLineH || 21;
            if (wasHidden) {
                inner.style.visibility = '';
                inner.style.position = '';
                inner.style.display = '';
            }

            lineHeightCache[lineIndex] = h;
            return h;
        }

        function refresh() {
            var code = textarea.value;
            var lines = code.split('\n');
            var total = lines.length;
            var currentLine = code.substring(0, textarea.selectionStart).split('\n').length - 1;

            var cssErrors = type === 'css' ? getCSSErrorLines(code) : [];
            var jsErrorObj = type === 'js'  ? getJSErrorLine(code)  : { line: -1, message: '' };
            var jsError    = jsErrorObj.line;
            var jsErrorMsg = jsErrorObj.message;

            var heights = new Array(total);
            for (var j = 0; j < total; j++) {
                heights[j] = measureLineHeight(lines[j], j, j === currentLine);
            }

            var totalHeight = 0;
            for (var j = 0; j < total; j++) totalHeight += heights[j];
            totalHeight += 20;

            inner.style.minHeight = totalHeight + 'px';
            gutter.style.height = totalHeight + 'px';
            textarea.style.minHeight = totalHeight + 'px';

            var scrollTop = inner.scrollTop || 0;
            var viewHeight = inner.clientHeight || 600;
            var OVERSCAN = 5;

            var cumH = 10;
            var rowTops = new Array(total);
            var visStart = 0, visEnd = total - 1;
            for (var j = 0; j < total; j++) {
                rowTops[j] = cumH;
                cumH += heights[j];
            }

            for (var j = 0; j < total; j++) {
                if (rowTops[j] + heights[j] >= scrollTop) { visStart = Math.max(0, j - OVERSCAN); break; }
            }

            for (var j = visStart; j < total; j++) {
                if (rowTops[j] > scrollTop + viewHeight) { visEnd = Math.min(total - 1, j + OVERSCAN); break; }
            }

            var topSpacerH = rowTops[visStart] - 10;
            var botSpacerH = totalHeight - 20 - rowTops[visEnd] - heights[visEnd];

            highlight.innerHTML = '';
            lineNumbers.innerHTML = '';

            if (topSpacerH > 0) {
                var hlTop = document.createElement('span');
                hlTop.className = 'ds-hl-line';
                hlTop.style.height = topSpacerH + 'px';
                highlight.appendChild(hlTop);
                var lnTop = document.createElement('div');
                lnTop.className = 'ds-ln-row';
                lnTop.style.height = topSpacerH + 'px';
                lineNumbers.appendChild(lnTop);
            }

            var unfoldedLines = unfoldedValue ? unfoldedValue.split('\n') : lines;
            var hiddenSet = {};
            for (var oi in foldedLines) {
                if (!foldedLines[oi]) continue;
                var r = getFoldRange(unfoldedLines, parseInt(oi, 10));
                if (r) { for (var li = r.start; li <= r.end; li++) hiddenSet[li] = true; }
            }

            for (var j = visStart; j <= visEnd; j++) {
                var h = heights[j];
                var cssErrObj = type === 'css' ? cssErrors.filter(function(e) { return e.line === j; })[0] : null;
                var isError = cssErrObj !== null && cssErrObj !== undefined ? true : j === jsError;

                var span = document.createElement('span');
                span.className = 'ds-hl-line';
                span.style.height = h + 'px';
                if (j === currentLine) {
                    var lineText = lines[j];
                    var colInLine = textarea.value.substring(0, textarea.selectionStart).split('\n')[currentLine].length;
                    measure.style.width = inner.offsetWidth + 'px';
                    measure.textContent = lineText.substring(0, colInLine) + '\u200b';
                    var rowOffset = Math.min(measure.offsetHeight - cachedLineH, h - cachedLineH);
                    rowOffset = Math.max(0, rowOffset);
                    var color = editorColors.activeLine;
                    if (h === cachedLineH) {
                        span.style.background = color;
                    } else {
                        var pctTop = (rowOffset / h * 100).toFixed(2);
                        var pctBot = ((rowOffset + cachedLineH) / h * 100).toFixed(2);
                        span.style.background = 'linear-gradient(to bottom, transparent ' + pctTop + '%, ' + color + ' ' + pctTop + '%, ' + color + ' ' + pctBot + '%, transparent ' + pctBot + '%)';
                    }
                }
                highlight.appendChild(span);

                var ln = document.createElement('div');
                ln.className = 'ds-ln-row';
                ln.style.height = h + 'px';
                if (j === currentLine) ln.classList.add('ds-ln-current');

                var icon = document.createElement('img');
                icon.className = 'ds-ln-icon';
                icon.width = 18; icon.height = 21;
                icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==';
                if (isError) {
                    ln.classList.add('ds-ln-error');
                    var errMsg = type === 'css'
                        ? (cssErrObj ? cssErrObj.message : 'CSS error on line ' + (j + 1))
                        : (jsErrorMsg || ('Syntax error on line ' + (j + 1)));
                    icon.title = errMsg;
                    ln.title = errMsg;
                }
                ln.appendChild(icon);

                var lineNumSpan = document.createElement('span');
                lineNumSpan.className = 'ds-ln-num';
                lineNumSpan.textContent = j + 1;
                ln.appendChild(lineNumSpan);

                var unfoldedIdx = (function(visibleIdx) {
                    var vi = 0;
                    for (var ui = 0; ui < unfoldedLines.length; ui++) {
                        if (hiddenSet[ui]) continue;
                        if (vi === visibleIdx) return ui;
                        vi++;
                    }
                    return visibleIdx;
                })(j);
                var foldRange = getFoldRange(unfoldedLines, unfoldedIdx);
                if (foldRange) {
                    var foldBtn = document.createElement('span');
                    foldBtn.className = 'ds-ln-fold';
                    foldBtn.textContent = foldedLines[unfoldedIdx] ? '\u25b6' : '\u25bc';
                    foldBtn.title = foldedLines[unfoldedIdx] ? 'Unfold block' : 'Fold block';
                    (function(uIdx) {
                        foldBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            foldedLines[uIdx] = !foldedLines[uIdx];
                            applyFolds();
                        });
                    })(unfoldedIdx);
                    ln.appendChild(foldBtn);
                }

                lineNumbers.appendChild(ln);
            }

            if (botSpacerH > 0) {
                var hlBot = document.createElement('span');
                hlBot.className = 'ds-hl-line';
                hlBot.style.height = botSpacerH + 'px';
                highlight.appendChild(hlBot);
                var lnBot = document.createElement('div');
                lnBot.className = 'ds-ln-row';
                lnBot.style.height = botSpacerH + 'px';
                lineNumbers.appendChild(lnBot);
            }

            currentJSMsg = jsErrorMsg;
            updateErrorBar(cssErrors, jsError, jsErrorMsg);
            try {
                var val = localStorage.getItem(STORAGE_KEY);
                statusKB.textContent = val ? (val.length / 1024).toFixed(1) + ' KB' : '0 KB';
            } catch(e) {}
            saveLocal();
        }

        var history = [];
        var historyIdx = -1;
        var historyDebounce = null;
        var HISTORY_LIMIT = 200;

        function pushHistory(value, selStart, selEnd) {
            history = history.slice(0, historyIdx + 1);
            if (history.length > 0 && history[historyIdx].value === value) return;
            history.push({ value: value, selStart: selStart || 0, selEnd: selEnd || 0 });
            if (history.length > HISTORY_LIMIT) history.shift();
            historyIdx = history.length - 1;
        }

        function restoreHistory(entry) {
            unfoldedValue = entry.value;
            foldedLines = {};
            textarea.value = entry.value;
            textarea.selectionStart = entry.selStart;
            textarea.selectionEnd = entry.selEnd;
            refresh();
        }

        pushHistory('', 0, 0);

        textarea.addEventListener('input', function() {
            unfoldedValue = textarea.value;
            foldedLines = {};
            clearTimeout(historyDebounce);
            historyDebounce = setTimeout(function() {
                pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
            }, 400);
            refresh();
        });
        textarea.addEventListener('keyup', refresh);
        textarea.addEventListener('click', refresh);
        textarea.addEventListener('blur', refresh);
        inner.addEventListener('scroll', refresh);
        textarea.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                clearTimeout(historyDebounce);
              
                if (textarea.value !== (history[historyIdx] && history[historyIdx].value)) {
                    pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
                }
                if (historyIdx > 0) {
                    historyIdx--;
                    restoreHistory(history[historyIdx]);
                }
                return;
            }

            if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
                e.preventDefault();
                if (historyIdx < history.length - 1) {
                    historyIdx++;
                    restoreHistory(history[historyIdx]);
                }
                return;
            }
            if (e.key === 'Tab') {
                e.preventDefault();
                var s = textarea.selectionStart, end = textarea.selectionEnd, val = textarea.value;
                if (!e.shiftKey) {
                    if (s === end) {
                        textarea.value = val.substring(0, s) + '    ' + val.substring(end);
                        textarea.selectionStart = textarea.selectionEnd = s + 4;
                    } else {
                        var ls = val.lastIndexOf('\n', s - 1) + 1;
                        var sel = val.substring(ls, end);
                        var ind = sel.replace(/^/mg, '    ');
                        textarea.value = val.substring(0, ls) + ind + val.substring(end);
                        textarea.selectionStart = ls;
                        textarea.selectionEnd = ls + ind.length;
                    }
                } else {
                    var ls = val.lastIndexOf('\n', s - 1) + 1;
                    var sel = val.substring(ls, end);
                    var ded = sel.replace(/^ {1,4}/mg, '');
                    textarea.value = val.substring(0, ls) + ded + val.substring(end);
                    textarea.selectionStart = ls;
                    textarea.selectionEnd = ls + ded.length;
                }
                unfoldedValue = textarea.value;
                foldedLines = {};
                pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
                refresh();
                return;
            }

            var PAIRS = { '{': '}', '(': ')', '[': ']', "'": "'" };
            var CLOSERS = new Set(['}', ')', ']', "'"]);

            if (CLOSERS.has(e.key)) {
                var s = textarea.selectionStart, val = textarea.value;
                if (val[s] === e.key) {
                    e.preventDefault();
                    textarea.selectionStart = textarea.selectionEnd = s + 1;
                    refresh();
                    return;
                }
            }

            if (PAIRS[e.key] && textarea.selectionStart === textarea.selectionEnd) {
                e.preventDefault();
                var s = textarea.selectionStart, val = textarea.value;
                var closer = PAIRS[e.key];
                textarea.value = val.substring(0, s) + e.key + closer + val.substring(s);
                textarea.selectionStart = textarea.selectionEnd = s + 1;
                unfoldedValue = textarea.value;
                foldedLines = {};
                pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
                refresh();
                return;
            }

            if (e.key === 'Backspace' && textarea.selectionStart === textarea.selectionEnd) {
                var s = textarea.selectionStart, val = textarea.value;
                var prev = val[s - 1], next = val[s];
                if (prev && next && PAIRS[prev] === next) {
                    e.preventDefault();
                    textarea.value = val.substring(0, s - 1) + val.substring(s + 1);
                    textarea.selectionStart = textarea.selectionEnd = s - 1;
                    unfoldedValue = textarea.value;
                    foldedLines = {};
                    pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
                    refresh();
                    return;
                }
            }

            if (e.key === 'Enter' && textarea.selectionStart === textarea.selectionEnd) {
                var s = textarea.selectionStart, val = textarea.value;
                var lineStart = val.lastIndexOf('\n', s - 1) + 1;
                var currentLine = val.substring(lineStart, s);
                var indentMatch = currentLine.match(/^(\s*)/);
                var indent = indentMatch ? indentMatch[1] : '';
                var prevChar = val[s - 1];
                var nextChar = val[s];

                if (prevChar && nextChar && PAIRS[prevChar] === nextChar) {
                    e.preventDefault();
                    var newIndent = indent + '    ';
                    var insertion = '\n' + newIndent + '\n' + indent;
                    textarea.value = val.substring(0, s) + insertion + val.substring(s);
                    textarea.selectionStart = textarea.selectionEnd = s + newIndent.length + 1;
                    unfoldedValue = textarea.value;
                    foldedLines = {};
                    pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
                    refresh();
                    return;
                }

                if (indent) {
                    e.preventDefault();
                    textarea.value = val.substring(0, s) + '\n' + indent + val.substring(s);
                    textarea.selectionStart = textarea.selectionEnd = s + 1 + indent.length;
                    unfoldedValue = textarea.value;
                    foldedLines = {};
                    pushHistory(textarea.value, textarea.selectionStart, textarea.selectionEnd);
                    refresh();
                    return;
                }
            }
        });

        var findPanel = document.createElement('div');
        findPanel.className = 'ds-find-panel';

        var findRow = document.createElement('div');
        findRow.className = 'ds-find-row';
        var findInput = document.createElement('input');
        findInput.className = 'ds-find-input';
        findInput.placeholder = 'Find...';
        findInput.type = 'text';
        var findCount = document.createElement('span');
        findCount.className = 'ds-find-count';
        var findPrev = document.createElement('button');
        findPrev.className = 'ds-find-btn';
        findPrev.textContent = '\u2191';
        findPrev.title = 'Previous match';
        var findNext = document.createElement('button');
        findNext.className = 'ds-find-btn';
        findNext.textContent = '\u2193';
        findNext.title = 'Next match';
        var findClose = document.createElement('button');
        findClose.className = 'ds-find-btn';
        findClose.textContent = '\u2715';
        findClose.title = 'Close';
        findRow.appendChild(findInput);
        findRow.appendChild(findCount);
        findRow.appendChild(findPrev);
        findRow.appendChild(findNext);
        findRow.appendChild(findClose);

        var replaceRow = document.createElement('div');
        replaceRow.className = 'ds-find-row';
        var replaceInput = document.createElement('input');
        replaceInput.className = 'ds-find-input';
        replaceInput.placeholder = 'Replace...';
        replaceInput.type = 'text';
        var replaceOne = document.createElement('button');
        replaceOne.className = 'ds-find-btn';
        replaceOne.textContent = 'Replace';
        var replaceAll = document.createElement('button');
        replaceAll.className = 'ds-find-btn';
        replaceAll.textContent = 'All';
        replaceRow.appendChild(replaceInput);
        replaceRow.appendChild(replaceOne);
        replaceRow.appendChild(replaceAll);

        findPanel.appendChild(findRow);
        findPanel.appendChild(replaceRow);
        panel.appendChild(findPanel);

        findPanel.addEventListener('mousedown', function(e) {
            if (e.target !== findInput && e.target !== replaceInput) {
                e.preventDefault();
            }
        });

        var findMatches = [];
        var findMatchIdx = 0;

        function findAll() {
            var term = findInput.value;
            findMatches = [];
            findMatchIdx = 0;
            if (!term) { findCount.textContent = ''; findInput.classList.remove('ds-find-nomatch'); refresh(); return; }
            var val = textarea.value;
            var idx = 0;
            var lower = val.toLowerCase();
            var termLower = term.toLowerCase();
            while ((idx = lower.indexOf(termLower, idx)) !== -1) {
                findMatches.push(idx);
                idx += term.length;
            }
            findInput.classList.toggle('ds-find-nomatch', findMatches.length === 0);
            findCount.textContent = findMatches.length ? (findMatchIdx + 1) + '/' + findMatches.length : '0/0';
            highlightMatches();
        }

        function highlightMatches() {
            var term = findInput.value;
            var spans = highlight.querySelectorAll('.ds-hl-line');
            if (!term || findMatches.length === 0) { spans.forEach(function(s) { s.style.background = s.classList.contains('ds-hl-current') ? editorColors.activeLine : ''; }); return; }
            var val = textarea.value;
            var lines = val.split('\n');
            var lineStart = 0;
            
            for (var li = 0; li < lines.length; li++) {
                var lineEnd = lineStart + lines[li].length;
                var lineMatches = findMatches.filter(function(m) { return m >= lineStart && m < lineEnd; });
                if (lineMatches.length && spans[li]) {
                    var gradParts = [];
                    lineMatches.forEach(function(m, mi) {
                        var isCurrent = findMatches[findMatchIdx] === m;
                        var color = isCurrent ? 'rgba(255,140,0,0.55)' : 'rgba(255,200,0,0.35)';
                        gradParts.push(color);
                    });
                    spans[li].style.background = gradParts[0];
                } else if (spans[li]) {
                    spans[li].style.background = spans[li].classList.contains('ds-hl-current') ? editorColors.activeLine : '';
                }
                lineStart = lineEnd + 1;
            }
        }

        function jumpToMatch(idx) {
            if (!findMatches.length) return;
            findMatchIdx = ((idx % findMatches.length) + findMatches.length) % findMatches.length;
            findCount.textContent = (findMatchIdx + 1) + '/' + findMatches.length;
            var pos = findMatches[findMatchIdx];
            textarea.focus();
            textarea.selectionStart = pos;
            textarea.selectionEnd = pos + findInput.value.length;
            var before = textarea.value.substring(0, pos);
            var lineNum = before.split('\n').length - 1;
            var spans = highlight.querySelectorAll('.ds-hl-line');
            if (spans[lineNum]) spans[lineNum].scrollIntoView({ block: 'center' });
            highlightMatches();
        }

        findInput.addEventListener('input', findAll);
        findPrev.addEventListener('click', function() { jumpToMatch(findMatchIdx - 1); });
        findNext.addEventListener('click', function() { jumpToMatch(findMatchIdx + 1); });
        findInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.shiftKey ? jumpToMatch(findMatchIdx - 1) : jumpToMatch(findMatchIdx + 1); }
            if (e.key === 'Escape') { findPanel.classList.remove('ds-find-open'); }
        });
        replaceInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') { findPanel.classList.remove('ds-find-open'); }
        });

        replaceOne.addEventListener('click', function() {
            if (!findMatches.length) return;
            var pos = findMatches[findMatchIdx];
            var term = findInput.value;
            var rep = replaceInput.value;
            var val = textarea.value;
            var newVal = val.substring(0, pos) + rep + val.substring(pos + term.length);
            textarea.value = newVal;
            unfoldedValue = newVal;
            pushHistory(newVal, pos + rep.length, pos + rep.length);
            findAll();
            jumpToMatch(findMatchIdx);
            refresh();
        });

        replaceAll.addEventListener('click', function() {
            if (!findMatches.length) return;
            var term = findInput.value;
            var rep = replaceInput.value;
            var newVal = textarea.value.split(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')).join(rep);
            textarea.value = newVal;
            unfoldedValue = newVal;
            pushHistory(newVal, 0, 0);
            findAll();
            refresh();
            setStatus('Replaced all!');
        });

        findClose.addEventListener('click', function() {
            findPanel.classList.remove('ds-find-open');
            findInput.value = '';
            replaceInput.value = '';
            findMatches = [];
            findCount.textContent = '';
            refresh();
        });

        textarea.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                findPanel.classList.toggle('ds-find-open');
                if (findPanel.classList.contains('ds-find-open')) {
                    findInput.focus();
                    findInput.select();
                }
            }
        });

        return {
            panel: panel, textarea: textarea,
            getValue: function() { return unfoldedValue || textarea.value; },
            setValue: function(v) {
                var cur = unfoldedValue || textarea.value;
                if (cur && cur !== v) pushHistory(cur, textarea.selectionStart, textarea.selectionEnd);
                unfoldedValue = v; foldedLines = {}; textarea.value = v;
                pushHistory(v, 0, 0);
                refresh();
            },
            refresh: refresh
        };
    }

    var container = document.createElement('div');
    container.className = 'ds-container';

    ['nw','ne','sw','se'].forEach(function(dir) {
        var corner = document.createElement('div');
        corner.className = 'ds-corner ds-corner-' + dir;
        corner.dataset.dir = dir;
        container.appendChild(corner);
    });

    var tabsEl = document.createElement('div');
    tabsEl.className = 'ds-tabs';
    [{id:'notes',label:'Wikitext',cls:'ds-tab-notes'},
     {id:'css',  label:'CSS',  cls:'ds-tab-css'  },
     {id:'js',   label:'JS',   cls:'ds-tab-js'   }
    ].forEach(function(t) {
        var tab = document.createElement('div');
        tab.className = 'ds-tab ' + t.cls;
        tab.textContent = t.label;
        tab.dataset.tab = t.id;
        tabsEl.appendChild(tab);
    });
    container.appendChild(tabsEl);

    var header = document.createElement('div');
    header.className = 'ds-header';

    var titleEl = document.createElement('span');
	titleEl.textContent = 'DynamicStudio';
	titleEl.style.minWidth = '0';
	titleEl.style.overflow = 'hidden';
	titleEl.style.textOverflow = 'ellipsis';
	titleEl.style.whiteSpace = 'nowrap';
	titleEl.style.flex = '1';

    var headerTabsEl = document.createElement('div');
    headerTabsEl.className = 'ds-header-tabs';

    var headerButtons = document.createElement('div');
    headerButtons.className = 'ds-header-buttons';

    var statusEl = document.createElement('span');
    statusEl.className = 'ds-status';

    var ioBtn = document.createElement('button');
    ioBtn.className = 'ds-btn ds-btn-io';
    ioBtn.textContent = '⇅';
    ioBtn.title = 'Import / Export';

    var menuWrap = document.createElement('div');
    menuWrap.style.position = 'relative';

    var menuBtn = document.createElement('button');
    menuBtn.className = 'ds-btn ds-btn-menu';
    menuBtn.textContent = '≡';
    menuBtn.title = 'Code actions';

    var dropdown = document.createElement('div');
    dropdown.className = 'ds-dropdown';

    var dropdownLocked = false;
    var dropdownHoverTimeout = null;

    function openDropdown() { dropdown.classList.add('ds-dropdown-open'); }
    function closeDropdown() { dropdown.classList.remove('ds-dropdown-open'); dropdownLocked = false; }

    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (dropdownLocked) { closeDropdown(); }
        else { openDropdown(); dropdownLocked = true; }
    });
    menuWrap.addEventListener('mouseenter', function() { clearTimeout(dropdownHoverTimeout); openDropdown(); });
    menuWrap.addEventListener('mouseleave', function() { if (!dropdownLocked) { dropdownHoverTimeout = setTimeout(closeDropdown, 300); } });
    document.addEventListener('click', function() { closeDropdown(); });
    dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

    menuWrap.appendChild(menuBtn);
    menuWrap.appendChild(dropdown);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'ds-btn ds-btn-close';
    closeBtn.textContent = '✕';

    headerButtons.appendChild(statusEl);
    headerButtons.appendChild(ioBtn);
    headerButtons.appendChild(menuWrap);
    headerButtons.appendChild(closeBtn);
    header.appendChild(titleEl);
    header.appendChild(headerTabsEl);
    header.appendChild(headerButtons);
    container.appendChild(header);

    var editorArea = document.createElement('div');
    editorArea.className = 'ds-editor-area';

    var notesPanel = document.createElement('div');
    notesPanel.className = 'ds-panel ds-panel-active';
    notesPanel.dataset.panel = 'notes';

    var wikitextWrap = document.createElement('div');
    wikitextWrap.className = 'ds-wikitext-wrap';

    var inputPane = document.createElement('div');
    inputPane.className = 'ds-wikitext-input-pane';

    var notesTextarea = document.createElement('textarea');
    notesTextarea.className = 'ds-textarea';
    notesTextarea.placeholder = 'Write your wikitext here...';
    inputPane.appendChild(notesTextarea);

    var notesFindPanel = document.createElement('div');
    notesFindPanel.className = 'ds-find-panel';
    var notesFindRow = document.createElement('div');
    notesFindRow.className = 'ds-find-row';
    var notesFindInput = document.createElement('input');
    notesFindInput.className = 'ds-find-input'; notesFindInput.placeholder = 'Find...'; notesFindInput.type = 'text';
    var notesFindCount = document.createElement('span');
    notesFindCount.className = 'ds-find-count';
    var notesFindPrev = document.createElement('button');
    notesFindPrev.className = 'ds-find-btn'; notesFindPrev.textContent = '\u2191'; notesFindPrev.title = 'Previous';
    var notesFindNext = document.createElement('button');
    notesFindNext.className = 'ds-find-btn'; notesFindNext.textContent = '\u2193'; notesFindNext.title = 'Next';
    var notesFindClose = document.createElement('button');
    notesFindClose.className = 'ds-find-btn'; notesFindClose.textContent = '\u2715';
    notesFindRow.appendChild(notesFindInput); notesFindRow.appendChild(notesFindCount);
    notesFindRow.appendChild(notesFindPrev); notesFindRow.appendChild(notesFindNext); notesFindRow.appendChild(notesFindClose);
    var notesReplaceRow = document.createElement('div');
    notesReplaceRow.className = 'ds-find-row';
    var notesReplaceInput = document.createElement('input');
    notesReplaceInput.className = 'ds-find-input'; notesReplaceInput.placeholder = 'Replace...'; notesReplaceInput.type = 'text';
    var notesReplaceOne = document.createElement('button');
    notesReplaceOne.className = 'ds-find-btn'; notesReplaceOne.textContent = 'Replace';
    var notesReplaceAll = document.createElement('button');
    notesReplaceAll.className = 'ds-find-btn'; notesReplaceAll.textContent = 'All';
    notesReplaceRow.appendChild(notesReplaceInput); notesReplaceRow.appendChild(notesReplaceOne); notesReplaceRow.appendChild(notesReplaceAll);
    notesFindPanel.appendChild(notesFindRow); notesFindPanel.appendChild(notesReplaceRow);
    notesPanel.appendChild(notesFindPanel);

    notesFindPanel.addEventListener('mousedown', function(e) {
        if (e.target !== notesFindInput && e.target !== notesReplaceInput) {
            e.preventDefault();
        }
    });

    var notesFindMatches = [], notesFindIdx = 0;
    function notesFindAll() {
        var term = notesFindInput.value;
        notesFindMatches = []; notesFindIdx = 0;
        if (!term) { notesFindCount.textContent = ''; notesFindInput.classList.remove('ds-find-nomatch'); return; }
        var val = notesTextarea.value, lower = val.toLowerCase(), termLower = term.toLowerCase(), idx = 0;
        while ((idx = lower.indexOf(termLower, idx)) !== -1) { notesFindMatches.push(idx); idx += term.length; }
        notesFindInput.classList.toggle('ds-find-nomatch', notesFindMatches.length === 0);
        notesFindCount.textContent = notesFindMatches.length ? (notesFindIdx + 1) + '/' + notesFindMatches.length : '0/0';
    }
    function notesJumpToMatch(idx) {
        if (!notesFindMatches.length) return;
        notesFindIdx = ((idx % notesFindMatches.length) + notesFindMatches.length) % notesFindMatches.length;
        notesFindCount.textContent = (notesFindIdx + 1) + '/' + notesFindMatches.length;
        var pos = notesFindMatches[notesFindIdx];
        var termLen = notesFindInput.value.length;
        notesTextarea.setSelectionRange(pos, pos + termLen);
        notesTextarea.focus();
        var cs = getComputedStyle(notesTextarea);
        var mirror = document.createElement('div');
        mirror.style.cssText = [
            'position:absolute', 'visibility:hidden', 'pointer-events:none',
            'white-space:pre-wrap', 'word-wrap:break-word',
            'width:' + notesTextarea.clientWidth + 'px',
            'font-family:' + cs.fontFamily,
            'font-size:' + cs.fontSize,
            'line-height:' + cs.lineHeight,
            'padding:' + cs.padding,
            'border:' + cs.border,
            'box-sizing:' + cs.boxSizing
        ].join(';');
        document.body.appendChild(mirror);

        var before = document.createElement('span');
        before.textContent = notesTextarea.value.substring(0, pos);
        var marker = document.createElement('span');
        marker.textContent = notesTextarea.value.substring(pos, pos + termLen) || '|';
        mirror.appendChild(before);
        mirror.appendChild(marker);
        var matchTop = marker.offsetTop;
        var matchHeight = marker.offsetHeight;
        document.body.removeChild(mirror);

        notesTextarea.scrollTop = Math.max(0, matchTop - (notesTextarea.clientHeight / 2) + (matchHeight / 2));
    }
    notesFindInput.addEventListener('input', notesFindAll);
    notesFindPrev.addEventListener('click', function() { notesJumpToMatch(notesFindIdx - 1); });
    notesFindNext.addEventListener('click', function() { notesJumpToMatch(notesFindIdx + 1); });
    notesFindInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.shiftKey ? notesJumpToMatch(notesFindIdx - 1) : notesJumpToMatch(notesFindIdx + 1); }
        if (e.key === 'Escape') { notesFindPanel.classList.remove('ds-find-open'); }
    });
    notesReplaceOne.addEventListener('click', function() {
        if (!notesFindMatches.length) return;
        var pos = notesFindMatches[notesFindIdx], term = notesFindInput.value, rep = notesReplaceInput.value;
        var newVal = notesTextarea.value.substring(0, pos) + rep + notesTextarea.value.substring(pos + term.length);
        setNotesValue(newVal); notesTextarea.value = newVal;
        notesFindAll(); notesJumpToMatch(notesFindIdx);
    });
    notesReplaceAll.addEventListener('click', function() {
        if (!notesFindMatches.length) return;
        var term = notesFindInput.value, rep = notesReplaceInput.value;
        var newVal = notesTextarea.value.split(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')).join(rep);
        setNotesValue(newVal); notesTextarea.value = newVal;
        notesFindAll(); setStatus('Replaced all!');
    });
    notesFindClose.addEventListener('click', function() {
        notesFindPanel.classList.remove('ds-find-open');
        notesFindInput.value = ''; notesReplaceInput.value = ''; notesFindMatches = []; notesFindCount.textContent = '';
    });

    var sliderHandle = document.createElement('div');
    sliderHandle.className = 'ds-wikitext-slider';
    sliderHandle.title = 'Drag to adjust panes';

    var outputPane = document.createElement('div');
    outputPane.className = 'ds-wikitext-output-pane';
    outputPane.innerHTML = '<span class="ds-wikitext-output-empty">← Drag the divider to preview wikitext</span>';

    wikitextWrap.appendChild(inputPane);
    wikitextWrap.appendChild(sliderHandle);
    wikitextWrap.appendChild(outputPane);
    notesPanel.appendChild(wikitextWrap);

    var notesStatusBar = document.createElement('div');
    notesStatusBar.className = 'ds-status-bar';
    var notesStatusLeft = document.createElement('span');
    notesStatusLeft.style.cssText = 'flex:1; font-size:11px; font-family:monospace; opacity:0.5; padding:0 10px;';
    var notesStatusPos = document.createElement('span');
    notesStatusPos.className = 'ds-status-pos';
    notesStatusPos.textContent = '1:1';
    notesStatusBar.appendChild(notesStatusLeft);
    notesStatusBar.appendChild(notesStatusPos);
    notesPanel.appendChild(notesStatusBar);

    function updateNotesStatus() {
        var val = notesTextarea.value;
        var words = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
        var chars = val.length;
        notesStatusLeft.textContent = words + ' words, ' + chars + ' chars';
        var before = val.substring(0, notesTextarea.selectionStart);
        var lines = before.split('\n');
        notesStatusPos.textContent = lines.length + ':' + (lines[lines.length - 1].length + 1);
    }

    notesTextarea.addEventListener('input', updateNotesStatus);
    notesTextarea.addEventListener('click', updateNotesStatus);
    notesTextarea.addEventListener('keyup', updateNotesStatus);

    var sliderDragging = false;
    var sliderStartX, sliderStartInputWidth;
    var SLIDER_WIDTH = 6;
    var wikitextSplitRatio = 1.0;

    function applySliderRatio(ratio) {
        var totalW = wikitextWrap.offsetWidth - SLIDER_WIDTH;
        if (totalW > 0) {
            var minRatio = 0;
            var maxRatio = 1;
            ratio = Math.max(minRatio, Math.min(maxRatio, ratio));
        }
        wikitextSplitRatio = ratio;
        if (totalW <= 0) return;
        var inputW = Math.round(totalW * wikitextSplitRatio);
        var outputW = totalW - inputW;
        inputPane.style.width = inputW + 'px';
        outputPane.style.width = outputW + 'px';
        if (wikitextSplitRatio >= 1) {
            outputPane.style.display = 'none';
        } else {
            outputPane.style.display = '';
            triggerWikitextPreview();
        }
    }

    sliderHandle.style.display = 'block';

    function initSlider() {
        var totalW = wikitextWrap.offsetWidth - SLIDER_WIDTH;
        if (totalW <= 0) { setTimeout(initSlider, 50); return; }
        inputPane.style.width = totalW + 'px';
        outputPane.style.display = 'none';
    }
    setTimeout(initSlider, 0);

    if (window.ResizeObserver) {
        new ResizeObserver(function() {
            applySliderRatio(wikitextSplitRatio);
        }).observe(wikitextWrap);
    }

    sliderHandle.addEventListener('mousedown', function(e) {
        sliderDragging = true;
        sliderStartX = e.clientX;
        sliderStartInputWidth = inputPane.offsetWidth;
        sliderHandle.classList.add('ds-slider-dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!sliderDragging) return;
        var totalW = wikitextWrap.offsetWidth - SLIDER_WIDTH;
        if (totalW <= 0) return;
        var dx = e.clientX - sliderStartX;
        var newInputW = sliderStartInputWidth + dx;
        var ratio = newInputW / totalW;
        applySliderRatio(ratio);
    });

    document.addEventListener('mouseup', function() {
        if (sliderDragging) {
            sliderDragging = false;
            sliderHandle.classList.remove('ds-slider-dragging');
        }
    });

    var wikitextDebounceTimer = null;
    var wikitextLastText = null;

    function triggerWikitextPreview() {
        var text = notesTextarea.value;
        if (text === wikitextLastText) return;
        wikitextLastText = text;
        clearTimeout(wikitextDebounceTimer);
        wikitextDebounceTimer = setTimeout(function() {
            fetchWikitextPreview(text);
        }, 600);
    }

    function fetchWikitextPreview(text) {
        if (wikitextSplitRatio >= 1) return;
        outputPane.classList.add('ds-output-loading');
        var apiBase = (mw.config.get('wgServer') || '') + '/api.php';
        var pageTitle = mw.config.get('wgPageName') || '';
        var body = new URLSearchParams({
            action: 'parse',
            format: 'json',
            origin: '*',
            text: text,
            contentmodel: 'wikitext',
            title: pageTitle,
            prop: 'text|modulestyles|modules',
            disablelimitreport: '1',
            disableeditsection: '1'
        });
        fetch(apiBase, { method: 'POST', body: body })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                outputPane.classList.remove('ds-output-loading');
                if (data && data.parse && data.parse.text) {
                    if (mw.loader) {
                        if (data.parse.modulestyles && data.parse.modulestyles.length) {
                            mw.loader.load(data.parse.modulestyles);
                        }
                        if (data.parse.modules && data.parse.modules.length) {
                            mw.loader.load(data.parse.modules);
                        }
                    }
                    outputPane.innerHTML = '<div class="mw-parser-output">' + (data.parse.text['*'] || '') + '</div>';

                    if (mw.loader) {
                        mw.loader.using('jquery.makeCollapsible', function() {
                            outputPane.querySelectorAll('.mw-collapsible').forEach(function(el) {
                                $(el).makeCollapsible();
                            });
                        });
                    }
                } else {
                    outputPane.innerHTML = '<span class="ds-wikitext-output-empty">No output.</span>';
                }
            })
            .catch(function() {
                outputPane.classList.remove('ds-output-loading');
                outputPane.innerHTML = '<span class="ds-wikitext-output-empty">Preview unavailable.</span>';
            });
    }

    var notesHistory = [''];
    var notesHistoryIdx = 0;
    var notesDebounce = null;

    function pushNotesHistory(value, selStart, selEnd) {
        notesHistory = notesHistory.slice(0, notesHistoryIdx + 1);
        if (notesHistory[notesHistoryIdx] && notesHistory[notesHistoryIdx].value === value) return;
        notesHistory.push({ value: value, selStart: selStart || 0, selEnd: selEnd || 0 });
        if (notesHistory.length > 200) notesHistory.shift();
        notesHistoryIdx = notesHistory.length - 1;
    }

    function setNotesValue(v) {
        var cur = notesTextarea.value;
        if (cur !== v) pushNotesHistory(cur, notesTextarea.selectionStart, notesTextarea.selectionEnd);
        notesTextarea.value = v;
        pushNotesHistory(v, 0, 0);
    }

    pushNotesHistory('', 0, 0);

    notesTextarea.addEventListener('input', function() {
        saveLocal();
        clearTimeout(notesDebounce);
        notesDebounce = setTimeout(function() {
            pushNotesHistory(notesTextarea.value, notesTextarea.selectionStart, notesTextarea.selectionEnd);
        }, 400);
        if (wikitextSplitRatio < 1) triggerWikitextPreview();
    });
    
    var SELF_CLOSING_TAGS = ['br','img','hr','input','meta','link','area','base','col','embed','param','source','track','wbr'];
    
    function isInsideTemplate(before) {
	    var depth = 0;
	    for (var i = 0; i < before.length - 1; i++) {
	        if (before[i] === '{' && before[i+1] === '{') { depth++; i++; }
	        else if (before[i] === '}' && before[i+1] === '}') { depth--; i++; }
	    }
	    return depth > 0;
	}
	
    notesTextarea.addEventListener('keydown', function(e) {
    	var wpS, wpVal, wpBefore, wpCloser, wpTagMatch, wpTagName, wpInsertion, wpPrev;
		
		if ((e.key === '[' || e.key === '{') && !e.ctrlKey && !e.metaKey) {
		    wpS = notesTextarea.selectionStart;
		    wpVal = notesTextarea.value;
		    wpPrev = wpVal[wpS - 1];
		    if (wpPrev === e.key) {
			    e.preventDefault();
			    wpCloser = e.key === '[' ? ']]' : '}}';
			    notesTextarea.value = wpVal.substring(0, wpS) + e.key + wpCloser + wpVal.substring(wpS);
			    notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS + 1;
			    saveLocal();
			    return;
			}
		}
		
		if (e.key === "'" && !e.ctrlKey && !e.metaKey) {
		    wpS = notesTextarea.selectionStart;
		    wpVal = notesTextarea.value;
		    wpPrev = wpVal[wpS - 1];
		    if (wpPrev === "'") {
		        e.preventDefault();
		        notesTextarea.value = wpVal.substring(0, wpS) + "'" + "''" + wpVal.substring(wpS);
		        notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS + 1;
		        saveLocal();
		        return;
		    }
		}
		
		if (e.key === '>' && !e.ctrlKey && !e.metaKey && notesTextarea.selectionStart === notesTextarea.selectionEnd) {
		    wpS = notesTextarea.selectionStart;
		    wpVal = notesTextarea.value;
		    wpBefore = wpVal.substring(0, wpS);
		    wpTagMatch = wpBefore.match(/<([a-zA-Z][a-zA-Z0-9]*)([^<]*)$/);
		    if (wpTagMatch) {
		        wpTagName = wpTagMatch[1].toLowerCase();
		        if (SELF_CLOSING_TAGS.indexOf(wpTagName) === -1) {
		            e.preventDefault();
		            wpCloser = '></' + wpTagName + '>';
		            notesTextarea.value = wpVal.substring(0, wpS) + wpCloser + wpVal.substring(wpS);
		            notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS + 1;
		            saveLocal();
		            return;
		        }
		    }
		}
		
    	if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && notesTextarea.selectionStart === notesTextarea.selectionEnd) {
	        wpS = notesTextarea.selectionStart;
	        wpVal = notesTextarea.value;
	        wpBefore = wpVal.substring(0, wpS);
	
	        if (isInsideTemplate(wpBefore)) {
	            e.preventDefault();
	            var wpAfter = wpVal.substring(wpS);
	            var wpOnParamLine = wpBefore.match(/\|\s*[^\s]/);
	            wpInsertion = wpOnParamLine ? '\n  | ' : '\n  | \n}}';
	            if (wpInsertion === '\n  | \n}}') {
	                wpAfter = wpAfter.replace(/^\}\}/, '');
	            }
	            notesTextarea.value = wpVal.substring(0, wpS) + wpInsertion + wpAfter;
	            notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS + 5;
	            saveLocal();
	            return;
	        }
    	}
        
		if (e.key === 'Backspace' && notesTextarea.selectionStart === notesTextarea.selectionEnd) {
		    wpS = notesTextarea.selectionStart;
		    wpVal = notesTextarea.value;
		    wpPrev = wpVal[wpS - 1];
		    wpNext = wpVal[wpS];
		
		    var wpTagClose = wpVal.substring(wpS).match(/^<\/([a-zA-Z][a-zA-Z0-9]*)>/);
		    var wpTagOpen = wpVal.substring(0, wpS).match(/<([a-zA-Z][a-zA-Z0-9]*)>$/);
		    if (wpTagClose && wpTagOpen && wpTagClose[1].toLowerCase() === wpTagOpen[1].toLowerCase()) {
		        e.preventDefault();
		        var wpOpenTag = wpTagOpen[0];
		        var wpCloseTag = wpTagClose[0];
		        notesTextarea.value = wpVal.substring(0, wpS - wpOpenTag.length) + wpVal.substring(wpS + wpCloseTag.length);
		        notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS - wpOpenTag.length;
		        saveLocal();
		        return;
		    }
		
		    var wpOpenTagEdit = wpVal.substring(0, wpS).match(/<([a-zA-Z][a-zA-Z0-9]*)$/);
		    var wpCloseTagAhead = wpVal.substring(wpS).match(/^<\/([a-zA-Z][a-zA-Z0-9]*)>/);
		    if (wpOpenTagEdit && wpCloseTagAhead) {
		        e.preventDefault();
		        var wpNewName = wpOpenTagEdit[1].slice(0, -1);
		        var wpBefore2 = wpVal.substring(0, wpS - 1);
		        var wpAfter = wpVal.substring(wpS);
		        if (wpNewName.length === 0) {
		            wpAfter = wpAfter.replace(/^<\/[a-zA-Z][a-zA-Z0-9]*>/, '');
		        } else {
		            wpAfter = wpAfter.replace(/^<\/[a-zA-Z][a-zA-Z0-9]*>/, '</' + wpNewName + '>');
		        }
		        notesTextarea.value = wpBefore2 + wpAfter;
		        notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS - 1;
		        saveLocal();
		        return;
		    }
		
		    var wpDoublePrev = wpVal.substring(wpS - 2, wpS);
		    var wpDoubleNext = wpVal.substring(wpS, wpS + 2);
		    if (wpDoublePrev === '[[' && wpDoubleNext === ']]') {
			    e.preventDefault();
			    notesTextarea.value = wpVal.substring(0, wpS - 2) + wpVal.substring(wpS + 2);
			    notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS - 2;
			    saveLocal();
			    return;
			}
			
			var wpMTOpenIdx = wpVal.lastIndexOf('{{', wpS - 1);
			var wpMTCloseIdx = wpVal.indexOf('}}', wpS);
			if (wpMTOpenIdx !== -1 && wpMTCloseIdx !== -1 && wpVal.substring(wpMTOpenIdx, wpS).indexOf('}}') === -1) {
			    if (wpDoublePrev === '{{' || wpDoubleNext === '}}') {
			        e.preventDefault();
			        notesTextarea.value = wpVal.substring(0, wpMTOpenIdx) + wpVal.substring(wpMTCloseIdx + 2);
			        notesTextarea.selectionStart = notesTextarea.selectionEnd = wpMTOpenIdx;
			        saveLocal();
			        return;
			    }
			}
		
		    var wpNotePairs = { '(': ')', "'": "'" };
		    if (wpPrev && wpNext && wpNotePairs[wpPrev] === wpNext) {
		        e.preventDefault();
		        notesTextarea.value = wpVal.substring(0, wpS - 1) + wpVal.substring(wpS + 1);
		        notesTextarea.selectionStart = notesTextarea.selectionEnd = wpS - 1;
		        saveLocal();
		        return;
		    }
		}

        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            clearTimeout(notesDebounce);
            if (notesTextarea.value !== (notesHistory[notesHistoryIdx] && notesHistory[notesHistoryIdx].value)) {
                pushNotesHistory(notesTextarea.value, notesTextarea.selectionStart, notesTextarea.selectionEnd);
            }
            if (notesHistoryIdx > 0) {
                notesHistoryIdx--;
                var entry = notesHistory[notesHistoryIdx];
                notesTextarea.value = entry.value;
                notesTextarea.selectionStart = entry.selStart;
                notesTextarea.selectionEnd = entry.selEnd;
                saveLocal();
                if (wikitextSplitRatio < 1) triggerWikitextPreview();
            }
            return;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
            e.preventDefault();
            if (notesHistoryIdx < notesHistory.length - 1) {
                notesHistoryIdx++;
                var entry = notesHistory[notesHistoryIdx];
                notesTextarea.value = entry.value;
                notesTextarea.selectionStart = entry.selStart;
                notesTextarea.selectionEnd = entry.selEnd;
                saveLocal();
                if (wikitextSplitRatio < 1) triggerWikitextPreview();
            }
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            notesFindPanel.classList.toggle('ds-find-open');
            if (notesFindPanel.classList.contains('ds-find-open')) { notesFindInput.focus(); notesFindInput.select(); }
            return;
        }
    });

    var cssEditor = buildCodeEditor('css');
    var jsEditor  = buildCodeEditor('js');

    editorArea.appendChild(notesPanel);
    editorArea.appendChild(cssEditor.panel);
    editorArea.appendChild(jsEditor.panel);
    container.appendChild(editorArea);

    var ioOverlay = document.createElement('div');
    ioOverlay.className = 'ds-io-overlay';

    var ioModal = document.createElement('div');
    ioModal.className = 'ds-io-modal';

    var ioHeader = document.createElement('div');
    ioHeader.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;';
    var ioTitleWrap = document.createElement('div');
    var ioTitle = document.createElement('div');
    ioTitle.className = 'ds-io-modal-title';
    ioTitle.textContent = 'Import / Export';
    var ioDesc = document.createElement('div');
    ioDesc.className = 'ds-io-modal-desc';
    ioDesc.textContent = 'Export your editors to a compressed string you can share or back up. Paste a string below to import.';
    ioTitleWrap.appendChild(ioTitle);
    ioTitleWrap.appendChild(ioDesc);
    var ioClose = document.createElement('button');
    ioClose.className = 'ds-io-close';
    ioClose.textContent = '✕';
    ioClose.addEventListener('click', function() { ioOverlay.classList.remove('ds-io-open'); });
    ioHeader.appendChild(ioTitleWrap);
    ioHeader.appendChild(ioClose);

    var exportSection = document.createElement('div');
    exportSection.className = 'ds-io-section';
    var exportSectionLabel = document.createElement('div');
    exportSectionLabel.className = 'ds-io-section-label';
    exportSectionLabel.textContent = 'Export';
    var exportRow = document.createElement('div');
    exportRow.className = 'ds-io-row';
    var ioInput = document.createElement('input');
    ioInput.className = 'ds-io-input';
    ioInput.placeholder = 'Exported string will appear here...';
    ioInput.type = 'text';
    ioInput.readOnly = true;
    ['all','notes','css','js'].forEach(function(type) {
        var btn = document.createElement('button');
        btn.className = 'ds-io-btn';
        btn.textContent = type === 'notes' ? 'Wikitext' : type.toUpperCase();
        btn.title = 'Export ' + (type === 'all' ? 'everything' : type === 'notes' ? 'wikitext' : type.toUpperCase());
        btn.addEventListener('click', function() {
            var str = exportData(type);
            ioInput.readOnly = false;
            ioInput.value = str;
            ioInput.readOnly = true;
            importInput.value = '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(str).then(function() { setStatus('Copied!'); }).catch(function() {
                    ioInput.select(); document.execCommand('copy'); setStatus('Copied!');
                });
            } else {
                ioInput.select(); document.execCommand('copy'); setStatus('Copied!');
            }
        });
        exportRow.appendChild(btn);
    });
    exportSection.appendChild(exportSectionLabel);
    exportSection.appendChild(exportRow);
    exportSection.appendChild(ioInput);

    var importSection = document.createElement('div');
    importSection.className = 'ds-io-section';
    var importSectionLabel = document.createElement('div');
    importSectionLabel.className = 'ds-io-section-label';
    importSectionLabel.textContent = 'Import';
    var importInput = document.createElement('input');
    importInput.className = 'ds-io-input';
    importInput.placeholder = 'Paste an import string here...';
    importInput.type = 'text';
    var importBtn = document.createElement('button');
    importBtn.className = 'ds-io-btn';
    importBtn.textContent = 'Import';
    importBtn.style.alignSelf = 'flex-start';
    importBtn.addEventListener('click', function() {
        var result = importData(importInput.value, function(ok) {
            setStatus(ok ? 'Imported!' : 'Cancelled.');
            if (ok) { importInput.value = ''; ioOverlay.classList.remove('ds-io-open'); }
        });
        if (result === true)  { setStatus('Imported!'); importInput.value = ''; ioOverlay.classList.remove('ds-io-open'); }
        if (result === false) { setStatus('Invalid string!'); }
    });
    importSection.appendChild(importSectionLabel);
    importSection.appendChild(importInput);
    importSection.appendChild(importBtn);

    ioModal.appendChild(ioHeader);
    ioModal.appendChild(exportSection);
    ioModal.appendChild(importSection);
    ioOverlay.appendChild(ioModal);

    ioOverlay.addEventListener('click', function(e) {
        if (e.target === ioOverlay) ioOverlay.classList.remove('ds-io-open');
    });

    document.body.appendChild(ioOverlay);

    document.body.appendChild(container);

    var liveStyle = document.createElement('style');
    liveStyle.id = 'ds-live-css';
    document.head.appendChild(liveStyle);

    function makeItem(label, onClick) {
        var btn = document.createElement('button');
        btn.className = 'ds-dropdown-item';
        btn.textContent = label;
        btn.addEventListener('click', function() { onClick(); closeDropdown(); });
        return btn;
    }

    function makeSep() {
        var d = document.createElement('div');
        d.className = 'ds-dropdown-sep';
        return d;
    }

    var dropdownItems = {
        css: [
            makeItem('▶ Run', function() {
                var errors = getCSSErrorLines(cssEditor.getValue());
                if (errors.length > 0) { setStatus('Fix CSS errors first!'); return; }
                liveStyle.textContent = cssEditor.getValue();
                setStatus('CSS applied!');
            }),
            makeSep(),
            makeItem('✦ Beautify', function() { cssEditor.setValue(cssBeautify(cssEditor.getValue())); setStatus('Beautified!'); }),
            makeItem('⬡ Minify',   function() { cssEditor.setValue(cssMinify(cssEditor.getValue()));   setStatus('Minified!');   }),
            makeSep(),
            makeItem('+ Add !important', function() {
                var ta = cssEditor.textarea;
                var s = ta.selectionStart, e = ta.selectionEnd;
                if (s !== e) {
                    cssEditor.setValue(ta.value.substring(0, s) + addImportant(ta.value.substring(s, e)) + ta.value.substring(e));
                } else {
                    cssEditor.setValue(addImportant(cssEditor.getValue()));
                }
                setStatus('!important added!');
            }),
            makeItem('− Remove !important', function() {
                var ta = cssEditor.textarea;
                var s = ta.selectionStart, e = ta.selectionEnd;
                if (s !== e) {
                    cssEditor.setValue(ta.value.substring(0, s) + removeImportant(ta.value.substring(s, e)) + ta.value.substring(e));
                } else {
                    cssEditor.setValue(removeImportant(cssEditor.getValue()));
                }
                setStatus('!important removed!');
            })
        ],
        js: [
            makeItem('▶ Run', function() {
                var warned = localStorage.getItem('ds_js_run_warned') === '1';
                if (!warned) {
                    showWarning('run', function() {
                        localStorage.setItem('ds_js_run_warned', '1');
                        try { eval(jsEditor.getValue()); setStatus('JS ran!'); }
                        catch(e) { setStatus('Runtime error: ' + e.message); }
                    }, function() { setStatus('Cancelled.'); });
                    return;
                }
                try { eval(jsEditor.getValue()); setStatus('JS ran!'); }
                catch(e) { setStatus('Runtime error: ' + e.message); }
            }),
            makeSep(),
            makeItem('✦ Beautify', function() { jsEditor.setValue(jsBeautify(jsEditor.getValue())); setStatus('Beautified!'); }),
            makeItem('⬡ Minify',   function() { jsEditor.setValue(jsMinify(jsEditor.getValue()));   setStatus('Minified!');   })
        ]
    };

    var activeTab = 'notes';

    function applyHeaderColor(tabId) {
        var preset = getPreset();
        if (preset === 'Folders') {
            header.style.backgroundColor = getFolderTabColor(tabId);
            header.style.color = getFolderTabText(tabId);
        } else {
            header.style.backgroundColor = '';
            header.style.color = '';
        }
    }

    function updateDropdown(tabId) {
        dropdown.innerHTML = '';
        var items = dropdownItems[tabId];
        if (items) {
            menuWrap.style.display = '';
            items.forEach(function(el) { dropdown.appendChild(el); });
        } else {
            menuWrap.style.display = 'none';
        }
    }

    function updateDefaultHeaderTabs(tabId) {
        headerTabsEl.innerHTML = '';
        var allTabs = [{id:'notes',label:'Wikitext'},{id:'css',label:'CSS'},{id:'js',label:'JS'}];
        allTabs.forEach(function(t) {
            if (t.id === tabId) return;
            var el = document.createElement('span');
            el.className = 'ds-header-tab';
            el.textContent = t.label;
            el.addEventListener('click', function() { switchTab(t.id); });
            headerTabsEl.appendChild(el);
        });
        var tabLabels = { notes: 'Wikitext', css: 'CSS', js: 'JS' };
        titleEl.textContent = 'DynamicStudio/' + (tabLabels[tabId] || tabId);
    }

    function applyFolderTabStyles() {
        tabsEl.querySelectorAll('.ds-tab').forEach(function(tab) {
            var tid = tab.dataset.tab;
            tab.style.backgroundColor = getFolderTabColor(tid);
            tab.style.color = getFolderTabText(tid);
        });
    }

    function applyNotepadStyle() {
        var lineColor   = getNotepadProp('line-color',   isDark ? 'rgba(100,140,255,0.6)' : 'rgba(60,100,220,0.4)');
        var marginColor = getNotepadProp('margin-color', isDark ? 'rgba(220,80,80,0.7)'   : 'rgba(180,30,30,0.6)');
        var bgColor     = getNotepadProp('bg-color',     isDark ? '#0d0d0d' : '#ffffff');
        var lineH       = 21;
        var pad         = 10;

        [cssEditor, jsEditor].forEach(function(ed) {
            applyNotepadToEditor(ed, lineColor, marginColor, bgColor, lineH, pad);
        });
        applyNotepadToNotes(lineColor, marginColor, bgColor, lineH, pad);

        header.style.backgroundColor = bgColor;
        header.style.padding         = '8px 12px 8px 46px';
        header.style.borderBottom     = '1px solid ' + lineColor;
        header.style.boxShadow = bgColor + ' 42px 0px 0px 0px inset, ' +
                                  marginColor + ' 44px 0px 0px 0px inset, ' +
                                  bgColor + ' 46px 0px 0px 0px inset';
    }

    function applyNotepadToEditor(ed, lineColor, marginColor, bgColor, lineH, pad) {
        var pad = 0;
        var wrap   = ed.panel.querySelector('.ds-code-wrap');
        var inner  = ed.panel.querySelector('.ds-code-inner');
        var gutter = ed.panel.querySelector('.ds-gutter');
        if (!wrap || !inner || !gutter) return;

        var offset = pad + lineH - 1;

        wrap.style.backgroundColor   = bgColor;
        gutter.style.backgroundColor = bgColor;
        inner.style.backgroundColor  = bgColor;

        inner.style.backgroundImage      = 'linear-gradient(' + lineColor + ' 1px, transparent 1px)';
        inner.style.backgroundSize       = '100% ' + lineH + 'px';
        inner.style.backgroundPositionY  = offset + 'px';
        inner.style.backgroundRepeat     = 'repeat';
        inner.style.backgroundAttachment = 'local';

        gutter.style.backgroundImage      = 'linear-gradient(' + lineColor + ' 1px, transparent 1px)';
        gutter.style.backgroundSize       = '100% ' + lineH + 'px';
        gutter.style.backgroundPositionY  = offset + 'px';
        gutter.style.backgroundRepeat     = 'repeat';
        gutter.style.backgroundAttachment = 'local';

        gutter.style.boxShadow = 'inset -2px 0 0 0 ' + marginColor;
        gutter.style.boxSizing = 'border-box';

        var ta = ed.panel.querySelector('.ds-code-textarea');
        if (ta) ta.style.padding = '0px 10px 10px 10px';
        var hl = ed.panel.querySelector('.ds-code-highlight');
        if (hl) hl.style.padding = '0 10px 0 10px';
        var ln = ed.panel.querySelector('.ds-line-numbers');
        if (ln) ln.style.paddingTop = '0';
        var font = getNotepadProp('font', '');
        if (font && ta) ta.style.fontFamily = font;
    }

    function applyNotepadToNotes(lineColor, marginColor, bgColor, lineH, pad) {
        var pad = 0;
        var offset = pad + lineH - 1;

        inputPane.style.backgroundColor = bgColor;
        notesTextarea.style.backgroundColor    = 'transparent';
        notesTextarea.style.backgroundImage    = 'linear-gradient(' + lineColor + ' 1px, transparent 1px)';
        notesTextarea.style.backgroundSize     = '100% ' + lineH + 'px';
        notesTextarea.style.backgroundPositionY = offset + 'px';
        notesTextarea.style.backgroundRepeat   = 'repeat';
        notesTextarea.style.backgroundAttachment = 'local';
        inputPane.style.boxShadow = bgColor + ' 42px 0px 0px 0px inset, ' +
                                    marginColor + ' 44px 0px 0px 0px inset, ' +
                                    bgColor + ' 46px 0px 0px 0px inset';
        notesTextarea.style.borderLeft  = '';
        notesTextarea.style.padding = '0px 10px 10px 46px';
        var font = getNotepadProp('font', '');
        if (font) notesTextarea.style.fontFamily = font;
    }

    function clearNotepadStyle() {
        [cssEditor, jsEditor].forEach(function(ed) {
            var wrap   = ed.panel.querySelector('.ds-code-wrap');
            var inner  = ed.panel.querySelector('.ds-code-inner');
            var gutter = ed.panel.querySelector('.ds-gutter');
            if (wrap)  { wrap.style.backgroundColor = ''; }
            var ta = ed.panel.querySelector('.ds-code-textarea');
            if (ta) { ta.style.padding = ''; }
            var hl = ed.panel.querySelector('.ds-code-highlight');
            if (hl) { hl.style.padding = ''; }
            var ln = ed.panel.querySelector('.ds-line-numbers');
            if (ln) { ln.style.paddingTop = ''; }
            if (inner) {
                inner.style.backgroundColor = '';
                inner.style.backgroundImage = '';
                inner.style.backgroundSize = '';
                inner.style.backgroundPositionY = '';
                inner.style.backgroundRepeat = '';
                inner.style.backgroundAttachment = '';
            }
            if (gutter) {
                gutter.style.backgroundColor = '';
                gutter.style.backgroundImage = '';
                gutter.style.backgroundSize = '';
                gutter.style.backgroundPositionY = '';
                gutter.style.backgroundRepeat = '';
                gutter.style.backgroundAttachment = '';
                gutter.style.boxShadow = '';
                gutter.style.boxSizing = '';
            }
        });
        notesTextarea.style.backgroundColor = '';
        notesTextarea.style.backgroundImage = '';
        notesTextarea.style.backgroundSize = '';
        notesTextarea.style.backgroundPositionY = '';
        notesTextarea.style.backgroundRepeat = '';
        notesTextarea.style.backgroundAttachment = '';
        notesTextarea.style.borderLeft = '';
        notesTextarea.style.padding = '';
        notesTextarea.style.fontFamily = '';
        header.style.backgroundColor = '';
        header.style.borderBottom    = '';
        header.style.padding         = '';
        header.style.boxShadow       = '';
        inputPane.style.backgroundColor = '';
        inputPane.style.boxShadow = '';
        notesTextarea.style.backgroundColor = '';
        notesTextarea.style.borderLeft = '';
        notesTextarea.style.paddingLeft = '';
    }

    function applyMinimalStyle() {
        var gutterColor = getDSProp('--ds-minimal-gutter-color');
        [cssEditor, jsEditor].forEach(function(ed) {
            var gutter = ed.panel.querySelector('.ds-gutter');
            var wrap   = ed.panel.querySelector('.ds-code-wrap');
            if (gutter) gutter.style.backgroundColor = gutterColor || 'transparent';
            if (wrap)   wrap.style.backgroundColor   = 'transparent';
        });
    }

    function clearMinimalStyle() {
        [cssEditor, jsEditor].forEach(function(ed) {
            var gutter = ed.panel.querySelector('.ds-gutter');
            var wrap   = ed.panel.querySelector('.ds-code-wrap');
            if (gutter) gutter.style.backgroundColor = '';
            if (wrap)   wrap.style.backgroundColor   = '';
        });
    }

    function applyPreset() {
        var preset = getPreset();
        if (preset === 'Folders') {
            tabsEl.style.display = '';
            headerTabsEl.style.display = 'none';
            titleEl.textContent = 'DynamicStudio';
            applyFolderTabStyles();
            clearNotepadStyle();
            clearMinimalStyle();
        } else if (preset === 'Notepad') {
            tabsEl.style.display = 'none';
            headerTabsEl.style.display = 'flex';
            updateDefaultHeaderTabs(activeTab);
            clearNotepadStyle();
            clearMinimalStyle();
            setTimeout(applyNotepadStyle, 0);
        } else if (preset === 'Minimal') {
            tabsEl.style.display = 'none';
            headerTabsEl.style.display = 'flex';
            updateDefaultHeaderTabs(activeTab);
            clearNotepadStyle();
            setTimeout(applyMinimalStyle, 0);
        } else {
            tabsEl.style.display = 'none';
            headerTabsEl.style.display = 'flex';
            updateDefaultHeaderTabs(activeTab);
            clearNotepadStyle();
            clearMinimalStyle();
        }
    }

    function switchTab(tabId) {
        activeTab = tabId;
        tabsEl.querySelectorAll('.ds-tab').forEach(function(t) {
            t.classList.toggle('ds-active', t.dataset.tab === tabId);
        });
        editorArea.querySelectorAll('.ds-panel').forEach(function(p) {
            p.classList.toggle('ds-panel-active', p.dataset.panel === tabId);
        });
        applyHeaderColor(tabId);
        updateDropdown(tabId);
        var preset = getPreset();
        if (preset === 'Folders') {
            applyFolderTabStyles();
        } else {
            updateDefaultHeaderTabs(tabId);
        }
        if (tabId === 'css') cssEditor.refresh();
        if (tabId === 'js')  jsEditor.refresh();
        if (tabId === 'notes') setTimeout(initSlider, 0);
        if (preset === 'Notepad') setTimeout(applyNotepadStyle, 0);
        if (preset === 'Minimal') setTimeout(applyMinimalStyle, 0);
    }

    applyPreset();
    switchTab('notes');

    tabsEl.querySelectorAll('.ds-tab').forEach(function(tab) {
        tab.addEventListener('click', function() { switchTab(tab.dataset.tab); });
    });

    function setStatus(msg) {
        if (!statusEl) { setTimeout(function() { setStatus(msg); }, 500); return; }
        statusEl.textContent = msg;
        setTimeout(function() { if (statusEl) statusEl.textContent = ''; }, 3000);
    }

    ioBtn.addEventListener('click', function() { ioOverlay.classList.toggle('ds-io-open'); });

    var saved = loadLocal();
    if (saved) {
        if (saved.wikitext !== undefined) notesTextarea.value = saved.wikitext;
        if (saved.css   !== undefined) cssEditor.setValue(saved.css);
        if (saved.js    !== undefined) jsEditor.setValue(saved.js);
    }

    var maxW = window.innerWidth  - 20;
    var maxH = window.innerHeight - 20;
    var savedPos = loadPos();

    if (savedPos && savedPos.left && savedPos.top) {
        container.style.left = savedPos.left;
        container.style.top  = savedPos.top;
        if (savedPos.width)  container.style.width  = Math.min(savedPos.width,  maxW) + 'px';
        if (savedPos.height) editorArea.style.height = Math.min(Math.max(156, savedPos.height), maxH) + 'px';
    } else {
        container.style.left = Math.max(0, (window.innerWidth  - 500) / 2) + 'px';
        container.style.top  = Math.max(0, (window.innerHeight - 350) / 2) + 'px';
    }

    var dragging = false, dragOffsetX, dragOffsetY;
    var resizing = false, resizeDir, resizeStartX, resizeStartY, resizeStartW, resizeStartH, resizeStartLeft, resizeStartTop;

    header.addEventListener('mousedown', function(e) {
        if (e.target !== header && e.target !== titleEl && e.target !== headerTabsEl) return;
        dragging = true;
        dragOffsetX = e.clientX - container.getBoundingClientRect().left;
        dragOffsetY = e.clientY - container.getBoundingClientRect().top;
        e.preventDefault();
    });

    container.querySelectorAll('.ds-corner').forEach(function(corner) {
        corner.addEventListener('mousedown', function(e) {
            resizing = true;
            resizeDir    = corner.dataset.dir;
            resizeStartX    = e.clientX;
            resizeStartY    = e.clientY;
            resizeStartW    = container.offsetWidth;
            resizeStartH    = editorArea.offsetHeight;
            resizeStartLeft = container.getBoundingClientRect().left;
            resizeStartTop  = container.getBoundingClientRect().top;
            e.preventDefault();
            e.stopPropagation();
        });
    });

    document.addEventListener('mousemove', function(e) {
        if (dragging) {
            var HEADER_H = 36;
            var newLeft = e.clientX - dragOffsetX;
            var newTop  = e.clientY - dragOffsetY;
            newLeft = Math.max(-(container.offsetWidth - 60), Math.min(window.innerWidth - 60, newLeft));
            newTop  = Math.max(0, Math.min(window.innerHeight - HEADER_H, newTop));
            container.style.left = newLeft + 'px';
            container.style.top  = newTop  + 'px';
            savePos();
        }
        if (resizing) {
            var dx = e.clientX - resizeStartX, dy = e.clientY - resizeStartY;
            var newW = resizeStartW, newH = resizeStartH, newLeft = resizeStartLeft, newTop = resizeStartTop;
            if (resizeDir === 'se') { newW = resizeStartW + dx; newH = resizeStartH + dy; }
            if (resizeDir === 'sw') { newW = resizeStartW - dx; newH = resizeStartH + dy; newLeft = resizeStartLeft + dx; }
            if (resizeDir === 'ne') { newW = resizeStartW + dx; newH = resizeStartH - dy; newTop = resizeStartTop + dy; }
            if (resizeDir === 'nw') { newW = resizeStartW - dx; newH = resizeStartH - dy; newLeft = resizeStartLeft + dx; newTop = resizeStartTop + dy; }

            var minH = 156;
            var curMaxW = window.innerWidth  - 20;
            var curMaxH = window.innerHeight - 20;

            var HEADER_H = 36;
            newLeft = Math.max(-(newW - 60), Math.min(window.innerWidth - 60, newLeft));
            newTop  = Math.max(0, Math.min(window.innerHeight - HEADER_H, newTop));

            if (newW >= 300 && newW <= curMaxW) {
                container.style.width = newW + 'px';
                container.style.left  = newLeft + 'px';
            }

            if (newH >= minH && newH <= curMaxH) {
                editorArea.style.height = newH + 'px';
                container.style.top = newTop + 'px';
            } else if (resizeDir === 'ne' || resizeDir === 'nw') {
                editorArea.style.height = minH + 'px';
                container.style.top = Math.max(0, Math.min(window.innerHeight - HEADER_H, resizeStartTop + resizeStartH - minH)) + 'px';
            }

            savePos();
        }
    });

    document.addEventListener('mouseup', function() { dragging = false; resizing = false; });

    function toggle() {
        var opening = !container.classList.contains('ds-open');
        container.classList.toggle('ds-open');
        try { localStorage.setItem('ds_closed_' + username, opening ? '0' : '1'); } catch(e) {}
    }

    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
        if (e.key === 'q' && !e.altKey && !e.ctrlKey && !e.metaKey) { e.preventDefault(); toggle(); }
    });

    closeBtn.addEventListener('click', function() {
        container.classList.remove('ds-open');
        try { localStorage.setItem('ds_closed_' + username, '1'); } catch(e) {}
    });

    try {
        if (localStorage.getItem('ds_closed_' + username) !== '1') {
            container.classList.add('ds-open');
        }
    } catch(e) {}

	var toolbarLink = document.createElement('a');
    toolbarLink.id = 'ds-toolbar-link';
    toolbarLink.textContent = 'DynamicStudio';
    toolbarLink.title = 'DynamicStudio (Q)';
    toolbarLink.style.cursor = 'pointer';
    toolbarLink.addEventListener('click', toggle);

    var toolbarLi = document.createElement('li');
    toolbarLi.appendChild(toolbarLink);

    var toolbarUl = document.querySelector('#WikiaBar .tools');
    if (toolbarUl) {
        var overflowMenu = toolbarUl.querySelector('li.menu.overflow-menu.wds-dropdown');
        if (overflowMenu) {
            toolbarUl.insertBefore(toolbarLi, overflowMenu);
        } else {
            toolbarUl.appendChild(toolbarLi);
        }
    }
});