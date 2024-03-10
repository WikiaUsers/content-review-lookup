/*
Country Flag Emoji Polyfill v0.1.4
https://www.npmjs.com/package/country-flag-emoji-polyfill

Flag Emojis do not get displayed on chromium based browsers on desktop.
Every other browser on desktop and mobile can display these.
This Javascript module is a polyfill that ensures that flag emojis get displayed
on chromium based browsers using a custom font.

This Javascript module was bundled using browserify to make it usable on MediaWiki
https://www.npmjs.com/package/browserify
*/

(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    1: [function(require, module, exports) {
        var module = require('country-flag-emoji-polyfill');
        module.polyfillCountryFlagEmojis(fontName = 'Twemoji Country Flags', fontUrl = 'https://cdn.jsdelivr.net/npm/country-flag-emoji-polyfill@0.1.4/dist/TwemojiCountryFlags.woff2');
    }, {
        "country-flag-emoji-polyfill": 2
    }],
    2: [function(require, module, exports) {
        var o = require("is-emoji-supported");
        exports.polyfillCountryFlagEmojis = function(e, n) {
            if (void 0 === e && (e = "Twemoji Country Flags"), void 0 === n && (n = "https://cdn.jsdelivr.net/npm/country-flag-emoji-polyfill@0.1/dist/TwemojiCountryFlags.woff2"), o.isEmojiSupported("😊") && !o.isEmojiSupported("🇨🇭")) {
                var t = document.createElement("style");
                return t.textContent = '@font-face {\n      font-family: "' + e + "\";\n      unicode-range: U+1F1E6-1F1FF, U+1F3F4, U+E0062-E0063, U+E0065, U+E0067,\n        U+E006C, U+E006E, U+E0073-E0074, U+E0077, U+E007F;\n      src: url('" + n + "') format('woff2');\n      font-display: swap;\n    }", document.head.appendChild(t), !0
            }
            return !1
        };
    }, {
        "is-emoji-supported": 3
    }],
    3: [function(require, module, exports) {
        (function(global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.isSupportedEmoji = {}));
        }(this, (function(exports) {
            'use strict';
            /**
             * @var {Object} cache
             */
            var cache = new Map();
            /**
             * Check if emoji is supported with cache
             *
             * @params {string} unicode
             * @returns {boolean}
             */
            function isEmojiSupported(unicode) {
                if (cache.has(unicode)) {
                    return cache.get(unicode);
                }
                var supported = isSupported(unicode);
                cache.set(unicode, supported);
                return supported;
            }
            /**
             * Request to handle cache directly
             *
             * @params {Map} store
             */
            function setCacheHandler(store) {
                cache = store;
            }
            /**
             * Check if the two pixels parts are perfectly the sames
             *
             * @params {string} unicode
             * @returns {boolean}
             */
            var isSupported = (function() {
                var ctx = null;
                try {
                    ctx = document.createElement('canvas').getContext('2d');
                } catch (_a) {}
                // Not in browser env
                if (!ctx) {
                    return function() {
                        return false;
                    };
                }
                var CANVAS_HEIGHT = 25;
                var CANVAS_WIDTH = 20;
                var textSize = Math.floor(CANVAS_HEIGHT / 2);
                // Initialize convas context
                ctx.font = textSize + 'px Arial, Sans-Serif';
                ctx.textBaseline = 'top';
                ctx.canvas.width = CANVAS_WIDTH * 2;
                ctx.canvas.height = CANVAS_HEIGHT;
                return function(unicode) {
                    ctx.clearRect(0, 0, CANVAS_WIDTH * 2, CANVAS_HEIGHT);
                    // Draw in red on the left
                    ctx.fillStyle = '#FF0000';
                    ctx.fillText(unicode, 0, 22);
                    // Draw in blue on right
                    ctx.fillStyle = '#0000FF';
                    ctx.fillText(unicode, CANVAS_WIDTH, 22);
                    var a = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
                    var count = a.length;
                    var i = 0;
                    // Search the first visible pixel
                    for (; i < count && !a[i + 3]; i += 4);
                    // No visible pixel
                    if (i >= count) {
                        return false;
                    }
                    // Emoji has immutable color, so we check the color of the emoji in two different colors
                    // the result show be the same.
                    var x = CANVAS_WIDTH + ((i / 4) % CANVAS_WIDTH);
                    var y = Math.floor(i / 4 / CANVAS_WIDTH);
                    var b = ctx.getImageData(x, y, 1, 1).data;
                    if (a[i] !== b[0] || a[i + 2] !== b[2]) {
                        return false;
                    }
                    // Some emojis are a contraction of different ones, so if it's not
                    // supported, it will show multiple characters
                    if (ctx.measureText(unicode).width >= CANVAS_WIDTH) {
                        return false;
                    }
                    // Supported
                    return true;
                };
            })();
            exports.isEmojiSupported = isEmojiSupported;
            exports.setCacheHandler = setCacheHandler;
            Object.defineProperty(exports, '__esModule', {
                value: true
            });
        })));
    }, {}]
}, {}, [1]);