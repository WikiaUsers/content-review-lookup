/*!
 * Chart.js
 * https://www.chartjs.org
 * Version: 2.6.0
 *
 * Copyright 2017 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */

/*
The MIT License (MIT)

Copyright (c) 2013-2017 Nick Downie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
 * Source: https://github.com/chartjs/Chart.js
 * Author: Nick Downie
 * Licence: MIT (https://github.com/chartjs/Chart.js/blob/master/LICENSE.md)
 * Modifications: Converted AMD to standard JS, transpiled
 * Modified by: [[User:Duckey Detective]]
 * Software used:
 *  - AMDclean (Esprima, Escodegen, Estraverse, Lodash)
 *  - Babel.js
 * Special thanks to: Speedit, fngplg
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
  (function () {
    !function (t) {
      var o = t();
      if ('object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) && 'undefined' != typeof module) module.exports = o;else {
        var e;
        e = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this, e.Chart = o;
      }
      if (typeof mw === 'object' && typeof mw.hook === 'function') {
        mw.hook('dev.chart').fire(o);
      }
    }(function () {
      var t;
      return function t(e, n, i) {
        function a(o, s) {
          if (!n[o]) {
            if (!e[o]) {
              var l = 'function' == typeof require && require;
              if (!s && l) return l(o, !0);
              if (r) return r(o, !0);
              var u = new Error('Cannot find module \'' + o + '\'');
              throw u.code = 'MODULE_NOT_FOUND', u;
            }
            var d = n[o] = { exports: {} };
            e[o][0].call(d.exports, function (t) {
              var n = e[o][1][t];
              return a(n ? n : t);
            }, d, d.exports, t, e, n, i);
          }
          return n[o].exports;
        }
        for (var r = 'function' == typeof require && require, o = 0; o < i.length; o++) {
          a(i[o]);
        }return a;
      }({
        1: [function (t, e, n) {
          function i(t) {
            if (t) {
              var e = /^#([a-fA-F0-9]{3})$/,
                  n = /^#([a-fA-F0-9]{6})$/,
                  i = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                  a = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                  r = /(\w+)/,
                  o = [0, 0, 0],
                  s = 1,
                  l = t.match(e);
              if (l) {
                l = l[1];
                for (var u = 0; u < o.length; u++) {
                  o[u] = parseInt(l[u] + l[u], 16);
                }
              } else if (l = t.match(n)) {
                l = l[1];
                for (var u = 0; u < o.length; u++) {
                  o[u] = parseInt(l.slice(2 * u, 2 * u + 2), 16);
                }
              } else if (l = t.match(i)) {
                for (var u = 0; u < o.length; u++) {
                  o[u] = parseInt(l[u + 1]);
                }s = parseFloat(l[4]);
              } else if (l = t.match(a)) {
                for (var u = 0; u < o.length; u++) {
                  o[u] = Math.round(2.55 * parseFloat(l[u + 1]));
                }s = parseFloat(l[4]);
              } else if (l = t.match(r)) {
                if ('transparent' == l[1]) return [0, 0, 0, 0];
                if (o = x[l[1]], !o) return;
              }
              for (var u = 0; u < o.length; u++) {
                o[u] = y(o[u], 0, 255);
              }return s = s || 0 == s ? y(s, 0, 1) : 1, o[3] = s, o;
            }
          }
          function a(t) {
            if (t) {
              var e = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                  n = t.match(e);
              if (n) {
                var i = parseFloat(n[4]),
                    a = y(parseInt(n[1]), 0, 360),
                    r = y(parseFloat(n[2]), 0, 100),
                    o = y(parseFloat(n[3]), 0, 100),
                    s = y(isNaN(i) ? 1 : i, 0, 1);
                return [a, r, o, s];
              }
            }
          }
          function r(t) {
            if (t) {
              var e = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                  n = t.match(e);
              if (n) {
                var i = parseFloat(n[4]),
                    a = y(parseInt(n[1]), 0, 360),
                    r = y(parseFloat(n[2]), 0, 100),
                    o = y(parseFloat(n[3]), 0, 100),
                    s = y(isNaN(i) ? 1 : i, 0, 1);
                return [a, r, o, s];
              }
            }
          }
          function o(t) {
            var e = i(t);
            return e && e.slice(0, 3);
          }
          function s(t) {
            var e = a(t);
            return e && e.slice(0, 3);
          }
          function l(t) {
            var e = i(t);
            return e ? e[3] : (e = a(t)) ? e[3] : (e = r(t)) ? e[3] : void 0;
          }
          function u(t) {
            return '#' + b(t[0]) + b(t[1]) + b(t[2]);
          }
          function d(t, e) {
            return e < 1 || t[3] && t[3] < 1 ? c(t, e) : 'rgb(' + t[0] + ', ' + t[1] + ', ' + t[2] + ')';
          }
          function c(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'rgba(' + t[0] + ', ' + t[1] + ', ' + t[2] + ', ' + e + ')';
          }
          function h(t, e) {
            if (e < 1 || t[3] && t[3] < 1) return f(t, e);
            var n = Math.round(t[0] / 255 * 100),
                i = Math.round(t[1] / 255 * 100),
                a = Math.round(t[2] / 255 * 100);
            return 'rgb(' + n + '%, ' + i + '%, ' + a + '%)';
          }
          function f(t, e) {
            var n = Math.round(t[0] / 255 * 100),
                i = Math.round(t[1] / 255 * 100),
                a = Math.round(t[2] / 255 * 100);
            return 'rgba(' + n + '%, ' + i + '%, ' + a + '%, ' + (e || t[3] || 1) + ')';
          }
          function g(t, e) {
            return e < 1 || t[3] && t[3] < 1 ? p(t, e) : 'hsl(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%)';
          }
          function p(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'hsla(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%, ' + e + ')';
          }
          function m(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'hwb(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%' + (void 0 !== e && 1 !== e ? ', ' + e : '') + ')';
          }
          function v(t) {
            return _[t.slice(0, 3)];
          }
          function y(t, e, n) {
            return Math.min(Math.max(e, t), n);
          }
          function b(t) {
            var e = t.toString(16).toUpperCase();
            return e.length < 2 ? '0' + e : e;
          }
          var x = t(5);
          e.exports = {
            getRgba: i,
            getHsla: a,
            getRgb: o,
            getHsl: s,
            getHwb: r,
            getAlpha: l,
            hexString: u,
            rgbString: d,
            rgbaString: c,
            percentString: h,
            percentaString: f,
            hslString: g,
            hslaString: p,
            hwbString: m,
            keyword: v
          };
          var _ = {};
          for (var k in x) {
            _[x[k]] = k;
          }
        }, { 5: 5 }],
        2: [function (t, e, n) {
          var i = t(4),
              a = t(1),
              r = function r(t) {
            if (t instanceof r) return t;
            if (!(this instanceof r)) return new r(t);
            this.valid = !1, this.values = {
              rgb: [0, 0, 0],
              hsl: [0, 0, 0],
              hsv: [0, 0, 0],
              hwb: [0, 0, 0],
              cmyk: [0, 0, 0, 0],
              alpha: 1
            };
            var e;
            'string' == typeof t ? (e = a.getRgba(t), e ? this.setValues('rgb', e) : (e = a.getHsla(t)) ? this.setValues('hsl', e) : (e = a.getHwb(t)) && this.setValues('hwb', e)) : 'object' == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (e = t, void 0 !== e.r || void 0 !== e.red ? this.setValues('rgb', e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues('hsl', e) : void 0 !== e.v || void 0 !== e.value ? this.setValues('hsv', e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues('hwb', e) : void 0 === e.c && void 0 === e.cyan || this.setValues('cmyk', e));
          };
          r.prototype = {
            isValid: function isValid() {
              return this.valid;
            },
            rgb: function rgb() {
              return this.setSpace('rgb', arguments);
            },
            hsl: function hsl() {
              return this.setSpace('hsl', arguments);
            },
            hsv: function hsv() {
              return this.setSpace('hsv', arguments);
            },
            hwb: function hwb() {
              return this.setSpace('hwb', arguments);
            },
            cmyk: function cmyk() {
              return this.setSpace('cmyk', arguments);
            },
            rgbArray: function rgbArray() {
              return this.values.rgb;
            },
            hslArray: function hslArray() {
              return this.values.hsl;
            },
            hsvArray: function hsvArray() {
              return this.values.hsv;
            },
            hwbArray: function hwbArray() {
              var t = this.values;
              return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb;
            },
            cmykArray: function cmykArray() {
              return this.values.cmyk;
            },
            rgbaArray: function rgbaArray() {
              var t = this.values;
              return t.rgb.concat([t.alpha]);
            },
            hslaArray: function hslaArray() {
              var t = this.values;
              return t.hsl.concat([t.alpha]);
            },
            alpha: function alpha(t) {
              return void 0 === t ? this.values.alpha : (this.setValues('alpha', t), this);
            },
            red: function red(t) {
              return this.setChannel('rgb', 0, t);
            },
            green: function green(t) {
              return this.setChannel('rgb', 1, t);
            },
            blue: function blue(t) {
              return this.setChannel('rgb', 2, t);
            },
            hue: function hue(t) {
              return t && (t %= 360, t = t < 0 ? 360 + t : t), this.setChannel('hsl', 0, t);
            },
            saturation: function saturation(t) {
              return this.setChannel('hsl', 1, t);
            },
            lightness: function lightness(t) {
              return this.setChannel('hsl', 2, t);
            },
            saturationv: function saturationv(t) {
              return this.setChannel('hsv', 1, t);
            },
            whiteness: function whiteness(t) {
              return this.setChannel('hwb', 1, t);
            },
            blackness: function blackness(t) {
              return this.setChannel('hwb', 2, t);
            },
            value: function value(t) {
              return this.setChannel('hsv', 2, t);
            },
            cyan: function cyan(t) {
              return this.setChannel('cmyk', 0, t);
            },
            magenta: function magenta(t) {
              return this.setChannel('cmyk', 1, t);
            },
            yellow: function yellow(t) {
              return this.setChannel('cmyk', 2, t);
            },
            black: function black(t) {
              return this.setChannel('cmyk', 3, t);
            },
            hexString: function hexString() {
              return a.hexString(this.values.rgb);
            },
            rgbString: function rgbString() {
              return a.rgbString(this.values.rgb, this.values.alpha);
            },
            rgbaString: function rgbaString() {
              return a.rgbaString(this.values.rgb, this.values.alpha);
            },
            percentString: function percentString() {
              return a.percentString(this.values.rgb, this.values.alpha);
            },
            hslString: function hslString() {
              return a.hslString(this.values.hsl, this.values.alpha);
            },
            hslaString: function hslaString() {
              return a.hslaString(this.values.hsl, this.values.alpha);
            },
            hwbString: function hwbString() {
              return a.hwbString(this.values.hwb, this.values.alpha);
            },
            keyword: function keyword() {
              return a.keyword(this.values.rgb, this.values.alpha);
            },
            rgbNumber: function rgbNumber() {
              var t = this.values.rgb;
              return t[0] << 16 | t[1] << 8 | t[2];
            },
            luminosity: function luminosity() {
              for (var t = this.values.rgb, e = [], n = 0; n < t.length; n++) {
                var i = t[n] / 255;
                e[n] = i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
              }
              return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
            },
            contrast: function contrast(t) {
              var e = this.luminosity(),
                  n = t.luminosity();
              return e > n ? (e + 0.05) / (n + 0.05) : (n + 0.05) / (e + 0.05);
            },
            level: function level(t) {
              var e = this.contrast(t);
              return e >= 7.1 ? 'AAA' : e >= 4.5 ? 'AA' : '';
            },
            dark: function dark() {
              var t = this.values.rgb,
                  e = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1000;
              return e < 128;
            },
            light: function light() {
              return !this.dark();
            },
            negate: function negate() {
              for (var t = [], e = 0; e < 3; e++) {
                t[e] = 255 - this.values.rgb[e];
              }return this.setValues('rgb', t), this;
            },
            lighten: function lighten(t) {
              var e = this.values.hsl;
              return e[2] += e[2] * t, this.setValues('hsl', e), this;
            },
            darken: function darken(t) {
              var e = this.values.hsl;
              return e[2] -= e[2] * t, this.setValues('hsl', e), this;
            },
            saturate: function saturate(t) {
              var e = this.values.hsl;
              return e[1] += e[1] * t, this.setValues('hsl', e), this;
            },
            desaturate: function desaturate(t) {
              var e = this.values.hsl;
              return e[1] -= e[1] * t, this.setValues('hsl', e), this;
            },
            whiten: function whiten(t) {
              var e = this.values.hwb;
              return e[1] += e[1] * t, this.setValues('hwb', e), this;
            },
            blacken: function blacken(t) {
              var e = this.values.hwb;
              return e[2] += e[2] * t, this.setValues('hwb', e), this;
            },
            greyscale: function greyscale() {
              var t = this.values.rgb,
                  e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2];
              return this.setValues('rgb', [e, e, e]), this;
            },
            clearer: function clearer(t) {
              var e = this.values.alpha;
              return this.setValues('alpha', e - e * t), this;
            },
            opaquer: function opaquer(t) {
              var e = this.values.alpha;
              return this.setValues('alpha', e + e * t), this;
            },
            rotate: function rotate(t) {
              var e = this.values.hsl,
                  n = (e[0] + t) % 360;
              return e[0] = n < 0 ? 360 + n : n, this.setValues('hsl', e), this;
            },
            mix: function mix(t, e) {
              var n = this,
                  i = t,
                  a = void 0 === e ? 0.5 : e,
                  r = 2 * a - 1,
                  o = n.alpha() - i.alpha(),
                  s = ((r * o === -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
                  l = 1 - s;
              return this.rgb(s * n.red() + l * i.red(), s * n.green() + l * i.green(), s * n.blue() + l * i.blue()).alpha(n.alpha() * a + i.alpha() * (1 - a));
            },
            toJSON: function toJSON() {
              return this.rgb();
            },
            clone: function clone() {
              var t,
                  e,
                  n = new r(),
                  i = this.values,
                  a = n.values;
              for (var o in i) {
                i.hasOwnProperty(o) && (t = i[o], e = {}.toString.call(t), '[object Array]' === e ? a[o] = t.slice(0) : '[object Number]' === e ? a[o] = t : console.error('unexpected color value:', t));
              }return n;
            }
          }, r.prototype.spaces = {
            rgb: ['red', 'green', 'blue'],
            hsl: ['hue', 'saturation', 'lightness'],
            hsv: ['hue', 'saturation', 'value'],
            hwb: ['hue', 'whiteness', 'blackness'],
            cmyk: ['cyan', 'magenta', 'yellow', 'black']
          }, r.prototype.maxes = {
            rgb: [255, 255, 255],
            hsl: [360, 100, 100],
            hsv: [360, 100, 100],
            hwb: [360, 100, 100],
            cmyk: [100, 100, 100, 100]
          }, r.prototype.getValues = function (t) {
            for (var e = this.values, n = {}, i = 0; i < t.length; i++) {
              n[t.charAt(i)] = e[t][i];
            }return 1 !== e.alpha && (n.a = e.alpha), n;
          }, r.prototype.setValues = function (t, e) {
            var n,
                a = this.values,
                r = this.spaces,
                o = this.maxes,
                s = 1;
            if (this.valid = !0, 'alpha' === t) s = e;else if (e.length) a[t] = e.slice(0, t.length), s = e[t.length];else if (void 0 !== e[t.charAt(0)]) {
              for (n = 0; n < t.length; n++) {
                a[t][n] = e[t.charAt(n)];
              }s = e.a;
            } else if (void 0 !== e[r[t][0]]) {
              var l = r[t];
              for (n = 0; n < t.length; n++) {
                a[t][n] = e[l[n]];
              }s = e.alpha;
            }
            if (a.alpha = Math.max(0, Math.min(1, void 0 === s ? a.alpha : s)), 'alpha' === t) return !1;
            var u;
            for (n = 0; n < t.length; n++) {
              u = Math.max(0, Math.min(o[t][n], a[t][n])), a[t][n] = Math.round(u);
            }for (var d in r) {
              d !== t && (a[d] = i[t][d](a[t]));
            }return !0;
          }, r.prototype.setSpace = function (t, e) {
            var n = e[0];
            return void 0 === n ? this.getValues(t) : ('number' == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n), this);
          }, r.prototype.setChannel = function (t, e, n) {
            var i = this.values[t];
            return void 0 === n ? i[e] : n === i[e] ? this : (i[e] = n, this.setValues(t, i), this);
          }, 'undefined' != typeof window && (window.Color = r), e.exports = r;
        }, {
          1: 1,
          4: 4
        }],
        3: [function (t, e, n) {
          function i(t) {
            var e,
                n,
                i,
                a = t[0] / 255,
                r = t[1] / 255,
                o = t[2] / 255,
                s = Math.min(a, r, o),
                l = Math.max(a, r, o),
                u = l - s;
            return l == s ? e = 0 : a == l ? e = (r - o) / u : r == l ? e = 2 + (o - a) / u : o == l && (e = 4 + (a - r) / u), e = Math.min(60 * e, 360), e < 0 && (e += 360), i = (s + l) / 2, n = l == s ? 0 : i <= 0.5 ? u / (l + s) : u / (2 - l - s), [e, 100 * n, 100 * i];
          }
          function a(t) {
            var e,
                n,
                i,
                a = t[0],
                r = t[1],
                o = t[2],
                s = Math.min(a, r, o),
                l = Math.max(a, r, o),
                u = l - s;
            return n = 0 == l ? 0 : u / l * 1000 / 10, l == s ? e = 0 : a == l ? e = (r - o) / u : r == l ? e = 2 + (o - a) / u : o == l && (e = 4 + (a - r) / u), e = Math.min(60 * e, 360), e < 0 && (e += 360), i = l / 255 * 1000 / 10, [e, n, i];
          }
          function o(t) {
            var e = t[0],
                n = t[1],
                a = t[2],
                r = i(t)[0],
                o = 1 / 255 * Math.min(e, Math.min(n, a)),
                a = 1 - 1 / 255 * Math.max(e, Math.max(n, a));
            return [r, 100 * o, 100 * a];
          }
          function s(t) {
            var e,
                n,
                i,
                a,
                r = t[0] / 255,
                o = t[1] / 255,
                s = t[2] / 255;
            return a = Math.min(1 - r, 1 - o, 1 - s), e = (1 - r - a) / (1 - a) || 0, n = (1 - o - a) / (1 - a) || 0, i = (1 - s - a) / (1 - a) || 0, [100 * e, 100 * n, 100 * i, 100 * a];
          }
          function l(t) {
            return K[JSON.stringify(t)];
          }
          function u(t) {
            var e = t[0] / 255,
                n = t[1] / 255,
                i = t[2] / 255;
            e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92, n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92, i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92;
            var a = 0.4124 * e + 0.3576 * n + 0.1805 * i,
                r = 0.2126 * e + 0.7152 * n + 0.0722 * i,
                o = 0.0193 * e + 0.1192 * n + 0.9505 * i;
            return [100 * a, 100 * r, 100 * o];
          }
          function d(t) {
            var e,
                n,
                i,
                a = u(t),
                r = a[0],
                o = a[1],
                s = a[2];
            return r /= 95.047, o /= 100, s /= 108.883, r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, o = o > 0.008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, s = s > 0.008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116, e = 116 * o - 16, n = 500 * (r - o), i = 200 * (o - s), [e, n, i];
          }
          function c(t) {
            return Y(d(t));
          }
          function h(t) {
            var e,
                n,
                i,
                a,
                r,
                o = t[0] / 360,
                s = t[1] / 100,
                l = t[2] / 100;
            if (0 == s) return r = 255 * l, [r, r, r];
            n = l < 0.5 ? l * (1 + s) : l + s - l * s, e = 2 * l - n, a = [0, 0, 0];
            for (var u = 0; u < 3; u++) {
              i = o + 1 / 3 * -(u - 1), i < 0 && i++, i > 1 && i--, r = 6 * i < 1 ? e + 6 * (n - e) * i : 2 * i < 1 ? n : 3 * i < 2 ? e + (n - e) * (2 / 3 - i) * 6 : e, a[u] = 255 * r;
            }return a;
          }
          function f(t) {
            var e,
                n,
                i = t[0],
                a = t[1] / 100,
                r = t[2] / 100;
            return 0 === r ? [0, 0, 0] : (r *= 2, a *= r <= 1 ? r : 2 - r, n = (r + a) / 2, e = 2 * a / (r + a), [i, 100 * e, 100 * n]);
          }
          function p(t) {
            return o(h(t));
          }
          function m(t) {
            return s(h(t));
          }
          function v(t) {
            return l(h(t));
          }
          function y(t) {
            var e = t[0] / 60,
                n = t[1] / 100,
                i = t[2] / 100,
                a = Math.floor(e) % 6,
                r = e - Math.floor(e),
                o = 255 * i * (1 - n),
                s = 255 * i * (1 - n * r),
                l = 255 * i * (1 - n * (1 - r)),
                i = 255 * i;
            switch (a) {
              case 0:
                return [i, l, o];
              case 1:
                return [s, i, o];
              case 2:
                return [o, i, l];
              case 3:
                return [o, s, i];
              case 4:
                return [l, o, i];
              case 5:
                return [i, o, s];
            }
          }
          function x(t) {
            var e,
                n,
                i = t[0],
                a = t[1] / 100,
                r = t[2] / 100;
            return n = (2 - a) * r, e = a * r, e /= n <= 1 ? n : 2 - n, e = e || 0, n /= 2, [i, 100 * e, 100 * n];
          }
          function _(t) {
            return o(y(t));
          }
          function k(t) {
            return s(y(t));
          }
          function w(t) {
            return l(y(t));
          }
          function M(t) {
            var e,
                n,
                i,
                a,
                o = t[0] / 360,
                s = t[1] / 100,
                l = t[2] / 100,
                u = s + l;
            switch (u > 1 && (s /= u, l /= u), e = Math.floor(6 * o), n = 1 - l, i = 6 * o - e, 0 != (1 & e) && (i = 1 - i), a = s + i * (n - s), e) {
              default:
              case 6:
              case 0:
                r = n, g = a, b = s;
                break;
              case 1:
                r = a, g = n, b = s;
                break;
              case 2:
                r = s, g = n, b = a;
                break;
              case 3:
                r = s, g = a, b = n;
                break;
              case 4:
                r = a, g = s, b = n;
                break;
              case 5:
                r = n, g = s, b = a;
            }
            return [255 * r, 255 * g, 255 * b];
          }
          function S(t) {
            return i(M(t));
          }
          function D(t) {
            return a(M(t));
          }
          function C(t) {
            return s(M(t));
          }
          function P(t) {
            return l(M(t));
          }
          function T(t) {
            var e,
                n,
                i,
                a = t[0] / 100,
                r = t[1] / 100,
                o = t[2] / 100,
                s = t[3] / 100;
            return e = 1 - Math.min(1, a * (1 - s) + s), n = 1 - Math.min(1, r * (1 - s) + s), i = 1 - Math.min(1, o * (1 - s) + s), [255 * e, 255 * n, 255 * i];
          }
          function I(t) {
            return i(T(t));
          }
          function A(t) {
            return a(T(t));
          }
          function F(t) {
            return o(T(t));
          }
          function O(t) {
            return l(T(t));
          }
          function R(t) {
            var e,
                n,
                i,
                a = t[0] / 100,
                r = t[1] / 100,
                o = t[2] / 100;
            return e = 3.2406 * a + r * -1.5372 + o * -0.4986, n = a * -0.9689 + 1.8758 * r + 0.0415 * o, i = 0.0557 * a + r * -0.204 + 1.057 * o, e = e > 0.0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055 : e *= 12.92, n = n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : n *= 12.92, i = i > 0.0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055 : i *= 12.92, e = Math.min(Math.max(0, e), 1), n = Math.min(Math.max(0, n), 1), i = Math.min(Math.max(0, i), 1), [255 * e, 255 * n, 255 * i];
          }
          function L(t) {
            var e,
                n,
                i,
                a = t[0],
                r = t[1],
                o = t[2];
            return a /= 95.047, r /= 100, o /= 108.883, a = a > 0.008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, o = o > 0.008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, e = 116 * r - 16, n = 500 * (a - r), i = 200 * (r - o), [e, n, i];
          }
          function V(t) {
            return Y(L(t));
          }
          function W(t) {
            var e,
                n,
                i,
                a,
                r = t[0],
                o = t[1],
                s = t[2];
            return r <= 8 ? (n = 100 * r / 903.3, a = 7.787 * (n / 100) + 16 / 116) : (n = 100 * Math.pow((r + 16) / 116, 3), a = Math.pow(n / 100, 1 / 3)), e = e / 95.047 <= 0.008856 ? e = 95.047 * (o / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(o / 500 + a, 3), i = i / 108.883 <= 0.008859 ? i = 108.883 * (a - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - s / 200, 3), [e, n, i];
          }
          function Y(t) {
            var e,
                n,
                i,
                a = t[0],
                r = t[1],
                o = t[2];
            return e = Math.atan2(o, r), n = 360 * e / 2 / Math.PI, n < 0 && (n += 360), i = Math.sqrt(r * r + o * o), [a, i, n];
          }
          function z(t) {
            return R(W(t));
          }
          function N(t) {
            var e,
                n,
                i,
                a = t[0],
                r = t[1],
                o = t[2];
            return i = o / 360 * 2 * Math.PI, e = r * Math.cos(i), n = r * Math.sin(i), [a, e, n];
          }
          function B(t) {
            return W(N(t));
          }
          function E(t) {
            return z(N(t));
          }
          function H(t) {
            return J[t];
          }
          function j(t) {
            return i(H(t));
          }
          function U(t) {
            return a(H(t));
          }
          function G(t) {
            return o(H(t));
          }
          function q(t) {
            return s(H(t));
          }
          function Z(t) {
            return d(H(t));
          }
          function X(t) {
            return u(H(t));
          }
          e.exports = {
            rgb2hsl: i,
            rgb2hsv: a,
            rgb2hwb: o,
            rgb2cmyk: s,
            rgb2keyword: l,
            rgb2xyz: u,
            rgb2lab: d,
            rgb2lch: c,
            hsl2rgb: h,
            hsl2hsv: f,
            hsl2hwb: p,
            hsl2cmyk: m,
            hsl2keyword: v,
            hsv2rgb: y,
            hsv2hsl: x,
            hsv2hwb: _,
            hsv2cmyk: k,
            hsv2keyword: w,
            hwb2rgb: M,
            hwb2hsl: S,
            hwb2hsv: D,
            hwb2cmyk: C,
            hwb2keyword: P,
            cmyk2rgb: T,
            cmyk2hsl: I,
            cmyk2hsv: A,
            cmyk2hwb: F,
            cmyk2keyword: O,
            keyword2rgb: H,
            keyword2hsl: j,
            keyword2hsv: U,
            keyword2hwb: G,
            keyword2cmyk: q,
            keyword2lab: Z,
            keyword2xyz: X,
            xyz2rgb: R,
            xyz2lab: L,
            xyz2lch: V,
            lab2xyz: W,
            lab2rgb: z,
            lab2lch: Y,
            lch2lab: N,
            lch2xyz: B,
            lch2rgb: E
          };
          var J = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
          },
              K = {};
          for (var Q in J) {
            K[JSON.stringify(J[Q])] = Q;
          }
        }, {}],
        4: [function (t, e, n) {
          var i = t(3),
              a = function a() {
            return new u();
          };
          for (var r in i) {
            a[r + 'Raw'] = function (t) {
              return function (e) {
                return 'number' == typeof e && (e = Array.prototype.slice.call(arguments)), i[t](e);
              };
            }(r);
            var o = /(\w+)2(\w+)/.exec(r),
                s = o[1],
                l = o[2];
            a[s] = a[s] || {}, a[s][l] = a[r] = function (t) {
              return function (e) {
                'number' == typeof e && (e = Array.prototype.slice.call(arguments));
                var n = i[t](e);
                if ('string' == typeof n || void 0 === n) return n;
                for (var a = 0; a < n.length; a++) {
                  n[a] = Math.round(n[a]);
                }return n;
              };
            }(r);
          }
          var u = function u() {
            this.convs = {};
          };
          u.prototype.routeSpace = function (t, e) {
            var n = e[0];
            return void 0 === n ? this.getValues(t) : ('number' == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n));
          }, u.prototype.setValues = function (t, e) {
            return this.space = t, this.convs = {}, this.convs[t] = e, this;
          }, u.prototype.getValues = function (t) {
            var e = this.convs[t];
            if (!e) {
              var n = this.space,
                  i = this.convs[n];
              e = a[n][t](i), this.convs[t] = e;
            }
            return e;
          }, ['rgb', 'hsl', 'hsv', 'cmyk', 'keyword'].forEach(function (t) {
            u.prototype[t] = function (e) {
              return this.routeSpace(t, arguments);
            };
          }), e.exports = a;
        }, { 3: 3 }],
        5: [function (t, e, n) {
          e.exports = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
          };
        }, {}],
        6: [function (e, n, i) {
          !function (e, a) {
            'object' == (typeof i === 'undefined' ? 'undefined' : _typeof(i)) && 'undefined' != typeof n ? n.exports = a() : 'function' == typeof t && t.amd ? t(a) : e.moment = a();
          }(this, function () {
            'use strict';

            function t() {
              return _i.apply(null, arguments);
            }
            function i(t) {
              _i = t;
            }
            function a(t) {
              return t instanceof Array || '[object Array]' === Object.prototype.toString.call(t);
            }
            function r(t) {
              return null != t && '[object Object]' === Object.prototype.toString.call(t);
            }
            function o(t) {
              var e;
              for (e in t) {
                return !1;
              }return !0;
            }
            function s(t) {
              return void 0 === t;
            }
            function l(t) {
              return 'number' == typeof t || '[object Number]' === Object.prototype.toString.call(t);
            }
            function u(t) {
              return t instanceof Date || '[object Date]' === Object.prototype.toString.call(t);
            }
            function d(t, e) {
              var n,
                  i = [];
              for (n = 0; n < t.length; ++n) {
                i.push(e(t[n], n));
              }return i;
            }
            function c(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }
            function h(t, e) {
              for (var n in e) {
                c(e, n) && (t[n] = e[n]);
              }return c(e, 'toString') && (t.toString = e.toString), c(e, 'valueOf') && (t.valueOf = e.valueOf), t;
            }
            function f(t, e, n, i) {
              return xe(t, e, n, i, !0).utc();
            }
            function g() {
              return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                meridiem: null,
                rfc2822: !1,
                weekdayMismatch: !1
              };
            }
            function p(t) {
              return null == t._pf && (t._pf = g()), t._pf;
            }
            function m(t) {
              if (null == t._isValid) {
                var e = p(t),
                    n = wi.call(e.parsedDateParts, function (t) {
                  return null != t;
                }),
                    i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
                if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return i;
                t._isValid = i;
              }
              return t._isValid;
            }
            function v(t) {
              var e = f(NaN);
              return null != t ? h(p(e), t) : p(e).userInvalidated = !0, e;
            }
            function y(t, e) {
              var n, i, a;
              if (s(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), s(e._i) || (t._i = e._i), s(e._f) || (t._f = e._f), s(e._l) || (t._l = e._l), s(e._strict) || (t._strict = e._strict), s(e._tzm) || (t._tzm = e._tzm), s(e._isUTC) || (t._isUTC = e._isUTC), s(e._offset) || (t._offset = e._offset), s(e._pf) || (t._pf = p(e)), s(e._locale) || (t._locale = e._locale), Mi.length > 0) for (n = 0; n < Mi.length; n++) {
                i = Mi[n], a = e[i], s(a) || (t[i] = a);
              }return t;
            }
            function b(e) {
              y(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), Si === !1 && (Si = !0, t.updateOffset(this), Si = !1);
            }
            function x(t) {
              return t instanceof b || null != t && null != t._isAMomentObject;
            }
            function _(t) {
              return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
            }
            function k(t) {
              var e = +t,
                  n = 0;
              return 0 !== e && isFinite(e) && (n = _(e)), n;
            }
            function w(t, e, n) {
              var i,
                  a = Math.min(t.length, e.length),
                  r = Math.abs(t.length - e.length),
                  o = 0;
              for (i = 0; i < a; i++) {
                (n && t[i] !== e[i] || !n && k(t[i]) !== k(e[i])) && o++;
              }return o + r;
            }
            function M(e) {
              t.suppressDeprecationWarnings === !1 && 'undefined' != typeof console && console.warn && console.warn('Deprecation warning: ' + e);
            }
            function S(e, n) {
              var i = !0;
              return h(function () {
                if (null != t.deprecationHandler && t.deprecationHandler(null, e), i) {
                  for (var a, r = [], o = 0; o < arguments.length; o++) {
                    if (a = '', 'object' == _typeof(arguments[o])) {
                      a += '\n[' + o + '] ';
                      for (var s in arguments[0]) {
                        a += s + ': ' + arguments[0][s] + ', ';
                      }a = a.slice(0, -2);
                    } else a = arguments[o];
                    r.push(a);
                  }
                  M(e + '\nArguments: ' + Array.prototype.slice.call(r).join('') + '\n' + new Error().stack), i = !1;
                }
                return n.apply(this, arguments);
              }, n);
            }
            function D(e, n) {
              null != t.deprecationHandler && t.deprecationHandler(e, n), Di[e] || (M(n), Di[e] = !0);
            }
            function C(t) {
              return t instanceof Function || '[object Function]' === Object.prototype.toString.call(t);
            }
            function P(t) {
              var e, n;
              for (n in t) {
                e = t[n], C(e) ? this[n] = e : this['_' + n] = e;
              }this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
            }
            function T(t, e) {
              var n,
                  i = h({}, t);
              for (n in e) {
                c(e, n) && (r(t[n]) && r(e[n]) ? (i[n] = {}, h(i[n], t[n]), h(i[n], e[n])) : null != e[n] ? i[n] = e[n] : delete i[n]);
              }for (n in t) {
                c(t, n) && !c(e, n) && r(t[n]) && (i[n] = h({}, i[n]));
              }return i;
            }
            function I(t) {
              null != t && this.set(t);
            }
            function A(t, e, n) {
              var i = this._calendar[t] || this._calendar.sameElse;
              return C(i) ? i.call(e, n) : i;
            }
            function F(t) {
              var e = this._longDateFormat[t],
                  n = this._longDateFormat[t.toUpperCase()];
              return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function (t) {
                return t.slice(1);
              }), this._longDateFormat[t]);
            }
            function O() {
              return this._invalidDate;
            }
            function R(t) {
              return this._ordinal.replace('%d', t);
            }
            function L(t, e, n, i) {
              var a = this._relativeTime[n];
              return C(a) ? a(t, e, n, i) : a.replace(/%d/i, t);
            }
            function V(t, e) {
              var n = this._relativeTime[t > 0 ? 'future' : 'past'];
              return C(n) ? n(e) : n.replace(/%s/i, e);
            }
            function W(t, e) {
              var n = t.toLowerCase();
              Vi[n] = Vi[n + 's'] = Vi[e] = t;
            }
            function Y(t) {
              return 'string' == typeof t ? Vi[t] || Vi[t.toLowerCase()] : void 0;
            }
            function z(t) {
              var e,
                  n,
                  i = {};
              for (n in t) {
                c(t, n) && (e = Y(n), e && (i[e] = t[n]));
              }return i;
            }
            function N(t, e) {
              Wi[t] = e;
            }
            function B(t) {
              var e = [];
              for (var n in t) {
                e.push({
                  unit: n,
                  priority: Wi[n]
                });
              }return e.sort(function (t, e) {
                return t.priority - e.priority;
              }), e;
            }
            function E(e, n) {
              return function (i) {
                return null != i ? (j(this, e, i), t.updateOffset(this, n), this) : H(this, e);
              };
            }
            function H(t, e) {
              return t.isValid() ? t._d['get' + (t._isUTC ? 'UTC' : '') + e]() : NaN;
            }
            function j(t, e, n) {
              t.isValid() && t._d['set' + (t._isUTC ? 'UTC' : '') + e](n);
            }
            function U(t) {
              return t = Y(t), C(this[t]) ? this[t]() : this;
            }
            function G(t, e) {
              if ('object' == (typeof t === 'undefined' ? 'undefined' : _typeof(t))) {
                t = z(t);
                for (var n = B(t), i = 0; i < n.length; i++) {
                  this[n[i].unit](t[n[i].unit]);
                }
              } else if (t = Y(t), C(this[t])) return this[t](e);
              return this;
            }
            function q(t, e, n) {
              var i = '' + Math.abs(t),
                  a = e - i.length,
                  r = t >= 0;
              return (r ? n ? '+' : '' : '-') + Math.pow(10, Math.max(0, a)).toString().substr(1) + i;
            }
            function Z(t, e, n, i) {
              var a = i;
              'string' == typeof i && (a = function a() {
                return this[i]();
              }), t && (Bi[t] = a), e && (Bi[e[0]] = function () {
                return q(a.apply(this, arguments), e[1], e[2]);
              }), n && (Bi[n] = function () {
                return this.localeData().ordinal(a.apply(this, arguments), t);
              });
            }
            function X(t) {
              return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, '') : t.replace(/\\/g, '');
            }
            function J(t) {
              var e,
                  n,
                  i = t.match(Yi);
              for (e = 0, n = i.length; e < n; e++) {
                Bi[i[e]] ? i[e] = Bi[i[e]] : i[e] = X(i[e]);
              }return function (e) {
                var a,
                    r = '';
                for (a = 0; a < n; a++) {
                  r += C(i[a]) ? i[a].call(e, t) : i[a];
                }return r;
              };
            }
            function K(t, e) {
              return t.isValid() ? (e = Q(e, t.localeData()), Ni[e] = Ni[e] || J(e), Ni[e](t)) : t.localeData().invalidDate();
            }
            function Q(t, e) {
              function n(t) {
                return e.longDateFormat(t) || t;
              }
              var i = 5;
              for (zi.lastIndex = 0; i >= 0 && zi.test(t);) {
                t = t.replace(zi, n), zi.lastIndex = 0, i -= 1;
              }return t;
            }
            function $(t, e, n) {
              ra[t] = C(e) ? e : function (t, i) {
                return t && n ? n : e;
              };
            }
            function tt(t, e) {
              return c(ra, t) ? ra[t](e._strict, e._locale) : new RegExp(et(t));
            }
            function et(t) {
              return nt(t.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, a) {
                return e || n || i || a;
              }));
            }
            function nt(t) {
              return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            }
            function it(t, e) {
              var n,
                  i = e;
              for ('string' == typeof t && (t = [t]), l(e) && (i = function i(t, n) {
                n[e] = k(t);
              }), n = 0; n < t.length; n++) {
                oa[t[n]] = i;
              }
            }
            function at(t, e) {
              it(t, function (t, n, i, a) {
                i._w = i._w || {}, e(t, i._w, i, a);
              });
            }
            function rt(t, e, n) {
              null != e && c(oa, t) && oa[t](e, n._a, n, t);
            }
            function ot(t, e) {
              return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
            }
            function st(t, e) {
              return t ? a(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || va).test(e) ? 'format' : 'standalone'][t.month()] : a(this._months) ? this._months : this._months.standalone;
            }
            function lt(t, e) {
              return t ? a(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[va.test(e) ? 'format' : 'standalone'][t.month()] : a(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
            }
            function ut(t, e, n) {
              var i,
                  a,
                  r,
                  o = t.toLocaleLowerCase();
              if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) {
                r = f([2000, i]), this._shortMonthsParse[i] = this.monthsShort(r, '').toLocaleLowerCase(), this._longMonthsParse[i] = this.months(r, '').toLocaleLowerCase();
              }return n ? 'MMM' === e ? (a = ma.call(this._shortMonthsParse, o), a !== -1 ? a : null) : (a = ma.call(this._longMonthsParse, o), a !== -1 ? a : null) : 'MMM' === e ? (a = ma.call(this._shortMonthsParse, o), a !== -1 ? a : (a = ma.call(this._longMonthsParse, o), a !== -1 ? a : null)) : (a = ma.call(this._longMonthsParse, o), a !== -1 ? a : (a = ma.call(this._shortMonthsParse, o), a !== -1 ? a : null));
            }
            function dt(t, e, n) {
              var i, a, r;
              if (this._monthsParseExact) return ut.call(this, t, e, n);
              for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
                if (a = f([2000, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp('^' + this.months(a, '').replace('.', '') + '$', 'i'), this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(a, '').replace('.', '') + '$', 'i')), n || this._monthsParse[i] || (r = '^' + this.months(a, '') + '|^' + this.monthsShort(a, ''), this._monthsParse[i] = new RegExp(r.replace('.', ''), 'i')), n && 'MMMM' === e && this._longMonthsParse[i].test(t)) return i;
                if (n && 'MMM' === e && this._shortMonthsParse[i].test(t)) return i;
                if (!n && this._monthsParse[i].test(t)) return i;
              }
            }
            function ct(t, e) {
              var n;
              if (!t.isValid()) return t;
              if ('string' == typeof e) if (/^\d+$/.test(e)) e = k(e);else if (e = t.localeData().monthsParse(e), !l(e)) return t;
              return n = Math.min(t.date(), ot(t.year(), e)), t._d['set' + (t._isUTC ? 'UTC' : '') + 'Month'](e, n), t;
            }
            function ht(e) {
              return null != e ? (ct(this, e), t.updateOffset(this, !0), this) : H(this, 'Month');
            }
            function ft() {
              return ot(this.year(), this.month());
            }
            function gt(t) {
              return this._monthsParseExact ? (c(this, '_monthsRegex') || mt.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (c(this, '_monthsShortRegex') || (this._monthsShortRegex = xa), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
            }
            function pt(t) {
              return this._monthsParseExact ? (c(this, '_monthsRegex') || mt.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (c(this, '_monthsRegex') || (this._monthsRegex = _a), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
            }
            function mt() {
              function t(t, e) {
                return e.length - t.length;
              }
              var e,
                  n,
                  i = [],
                  a = [],
                  r = [];
              for (e = 0; e < 12; e++) {
                n = f([2000, e]), i.push(this.monthsShort(n, '')), a.push(this.months(n, '')), r.push(this.months(n, '')), r.push(this.monthsShort(n, ''));
              }for (i.sort(t), a.sort(t), r.sort(t), e = 0; e < 12; e++) {
                i[e] = nt(i[e]), a[e] = nt(a[e]);
              }for (e = 0; e < 24; e++) {
                r[e] = nt(r[e]);
              }this._monthsRegex = new RegExp('^(' + r.join('|') + ')', 'i'), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp('^(' + a.join('|') + ')', 'i'), this._monthsShortStrictRegex = new RegExp('^(' + i.join('|') + ')', 'i');
            }
            function vt(t) {
              return yt(t) ? 366 : 365;
            }
            function yt(t) {
              return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
            }
            function bt() {
              return yt(this.year());
            }
            function xt(t, e, n, i, a, r, o) {
              var s = new Date(t, e, n, i, a, r, o);
              return t < 100 && t >= 0 && isFinite(s.getFullYear()) && s.setFullYear(t), s;
            }
            function _t(t) {
              var e = new Date(Date.UTC.apply(null, arguments));
              return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e;
            }
            function kt(t, e, n) {
              var i = 7 + e - n,
                  a = (7 + _t(t, 0, i).getUTCDay() - e) % 7;
              return -a + i - 1;
            }
            function wt(t, e, n, i, a) {
              var r,
                  o,
                  s = (7 + n - i) % 7,
                  l = kt(t, i, a),
                  u = 1 + 7 * (e - 1) + s + l;
              return u <= 0 ? (r = t - 1, o = vt(r) + u) : u > vt(t) ? (r = t + 1, o = u - vt(t)) : (r = t, o = u), {
                year: r,
                dayOfYear: o
              };
            }
            function Mt(t, e, n) {
              var i,
                  a,
                  r = kt(t.year(), e, n),
                  o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
              return o < 1 ? (a = t.year() - 1, i = o + St(a, e, n)) : o > St(t.year(), e, n) ? (i = o - St(t.year(), e, n), a = t.year() + 1) : (a = t.year(), i = o), {
                week: i,
                year: a
              };
            }
            function St(t, e, n) {
              var i = kt(t, e, n),
                  a = kt(t + 1, e, n);
              return (vt(t) - i + a) / 7;
            }
            function Dt(t) {
              return Mt(t, this._week.dow, this._week.doy).week;
            }
            function Ct() {
              return this._week.dow;
            }
            function Pt() {
              return this._week.doy;
            }
            function Tt(t) {
              var e = this.localeData().week(this);
              return null == t ? e : this.add(7 * (t - e), 'd');
            }
            function It(t) {
              var e = Mt(this, 1, 4).week;
              return null == t ? e : this.add(7 * (t - e), 'd');
            }
            function At(t, e) {
              return 'string' != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), 'number' == typeof t ? t : null) : parseInt(t, 10);
            }
            function Ft(t, e) {
              return 'string' == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
            }
            function Ot(t, e) {
              return t ? a(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? 'format' : 'standalone'][t.day()] : a(this._weekdays) ? this._weekdays : this._weekdays.standalone;
            }
            function Rt(t) {
              return t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
            }
            function Lt(t) {
              return t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
            }
            function Vt(t, e, n) {
              var i,
                  a,
                  r,
                  o = t.toLocaleLowerCase();
              if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) {
                r = f([2000, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(r, '').toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(r, '').toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(r, '').toLocaleLowerCase();
              }return n ? 'dddd' === e ? (a = ma.call(this._weekdaysParse, o), a !== -1 ? a : null) : 'ddd' === e ? (a = ma.call(this._shortWeekdaysParse, o), a !== -1 ? a : null) : (a = ma.call(this._minWeekdaysParse, o), a !== -1 ? a : null) : 'dddd' === e ? (a = ma.call(this._weekdaysParse, o), a !== -1 ? a : (a = ma.call(this._shortWeekdaysParse, o), a !== -1 ? a : (a = ma.call(this._minWeekdaysParse, o), a !== -1 ? a : null))) : 'ddd' === e ? (a = ma.call(this._shortWeekdaysParse, o), a !== -1 ? a : (a = ma.call(this._weekdaysParse, o), a !== -1 ? a : (a = ma.call(this._minWeekdaysParse, o), a !== -1 ? a : null))) : (a = ma.call(this._minWeekdaysParse, o), a !== -1 ? a : (a = ma.call(this._weekdaysParse, o), a !== -1 ? a : (a = ma.call(this._shortWeekdaysParse, o), a !== -1 ? a : null)));
            }
            function Wt(t, e, n) {
              var i, a, r;
              if (this._weekdaysParseExact) return Vt.call(this, t, e, n);
              for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
                if (a = f([2000, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(a, '').replace('.', '.?') + '$', 'i'), this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(a, '').replace('.', '.?') + '$', 'i'), this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(a, '').replace('.', '.?') + '$', 'i')), this._weekdaysParse[i] || (r = '^' + this.weekdays(a, '') + '|^' + this.weekdaysShort(a, '') + '|^' + this.weekdaysMin(a, ''), this._weekdaysParse[i] = new RegExp(r.replace('.', ''), 'i')), n && 'dddd' === e && this._fullWeekdaysParse[i].test(t)) return i;
                if (n && 'ddd' === e && this._shortWeekdaysParse[i].test(t)) return i;
                if (n && 'dd' === e && this._minWeekdaysParse[i].test(t)) return i;
                if (!n && this._weekdaysParse[i].test(t)) return i;
              }
            }
            function Yt(t) {
              if (!this.isValid()) return null != t ? this : NaN;
              var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
              return null != t ? (t = At(t, this.localeData()), this.add(t - e, 'd')) : e;
            }
            function zt(t) {
              if (!this.isValid()) return null != t ? this : NaN;
              var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
              return null == t ? e : this.add(t - e, 'd');
            }
            function Nt(t) {
              if (!this.isValid()) return null != t ? this : NaN;
              if (null != t) {
                var e = Ft(t, this.localeData());
                return this.day(this.day() % 7 ? e : e - 7);
              }
              return this.day() || 7;
            }
            function Bt(t) {
              return this._weekdaysParseExact ? (c(this, '_weekdaysRegex') || jt.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (c(this, '_weekdaysRegex') || (this._weekdaysRegex = Ca), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
            }
            function Et(t) {
              return this._weekdaysParseExact ? (c(this, '_weekdaysRegex') || jt.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (c(this, '_weekdaysShortRegex') || (this._weekdaysShortRegex = Pa), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
            }
            function Ht(t) {
              return this._weekdaysParseExact ? (c(this, '_weekdaysRegex') || jt.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (c(this, '_weekdaysMinRegex') || (this._weekdaysMinRegex = Ta), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
            }
            function jt() {
              function t(t, e) {
                return e.length - t.length;
              }
              var e,
                  n,
                  i,
                  a,
                  r,
                  o = [],
                  s = [],
                  l = [],
                  u = [];
              for (e = 0; e < 7; e++) {
                n = f([2000, 1]).day(e), i = this.weekdaysMin(n, ''), a = this.weekdaysShort(n, ''), r = this.weekdays(n, ''), o.push(i), s.push(a), l.push(r), u.push(i), u.push(a), u.push(r);
              }for (o.sort(t), s.sort(t), l.sort(t), u.sort(t), e = 0; e < 7; e++) {
                s[e] = nt(s[e]), l[e] = nt(l[e]), u[e] = nt(u[e]);
              }this._weekdaysRegex = new RegExp('^(' + u.join('|') + ')', 'i'), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp('^(' + l.join('|') + ')', 'i'), this._weekdaysShortStrictRegex = new RegExp('^(' + s.join('|') + ')', 'i'), this._weekdaysMinStrictRegex = new RegExp('^(' + o.join('|') + ')', 'i');
            }
            function Ut() {
              return this.hours() % 12 || 12;
            }
            function Gt() {
              return this.hours() || 24;
            }
            function qt(t, e) {
              Z(t, 0, 0, function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), e);
              });
            }
            function Zt(t, e) {
              return e._meridiemParse;
            }
            function Xt(t) {
              return 'p' === (t + '').toLowerCase().charAt(0);
            }
            function Jt(t, e, n) {
              return t > 11 ? n ? 'pm' : 'PM' : n ? 'am' : 'AM';
            }
            function Kt(t) {
              return t ? t.toLowerCase().replace('_', '-') : t;
            }
            function Qt(t) {
              for (var e, n, i, a, r = 0; r < t.length;) {
                for (a = Kt(t[r]).split('-'), e = a.length, n = Kt(t[r + 1]), n = n ? n.split('-') : null; e > 0;) {
                  if (i = $t(a.slice(0, e).join('-'))) return i;
                  if (n && n.length >= e && w(a, n, !0) >= e - 1) break;
                  e--;
                }
                r++;
              }
              return null;
            }
            function $t(t) {
              var i = null;
              if (!Ra[t] && 'undefined' != typeof n && n && n.exports) try {
                i = Ia._abbr, e('./locale/' + t), te(i);
              } catch (t) {}
              return Ra[t];
            }
            function te(t, e) {
              var n;
              return t && (n = s(e) ? ie(t) : ee(t, e), n && (Ia = n)), Ia._abbr;
            }
            function ee(t, e) {
              if (null !== e) {
                var n = Oa;
                if (e.abbr = t, null != Ra[t]) D('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See https://momentjs.com/guides/#/warnings/define-locale/ for more info.'), n = Ra[t]._config;else if (null != e.parentLocale) {
                  if (null == Ra[e.parentLocale]) return La[e.parentLocale] || (La[e.parentLocale] = []), La[e.parentLocale].push({
                    name: t,
                    config: e
                  }), null;
                  n = Ra[e.parentLocale]._config;
                }
                return Ra[t] = new I(T(n, e)), La[t] && La[t].forEach(function (t) {
                  ee(t.name, t.config);
                }), te(t), Ra[t];
              }
              return delete Ra[t], null;
            }
            function ne(t, e) {
              if (null != e) {
                var n,
                    i = Oa;
                null != Ra[t] && (i = Ra[t]._config), e = T(i, e), n = new I(e), n.parentLocale = Ra[t], Ra[t] = n, te(t);
              } else null != Ra[t] && (null != Ra[t].parentLocale ? Ra[t] = Ra[t].parentLocale : null != Ra[t] && delete Ra[t]);
              return Ra[t];
            }
            function ie(t) {
              var e;
              if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Ia;
              if (!a(t)) {
                if (e = $t(t)) return e;
                t = [t];
              }
              return Qt(t);
            }
            function ae() {
              return Ti(Ra);
            }
            function re(t) {
              var e,
                  n = t._a;
              return n && p(t).overflow === -2 && (e = n[la] < 0 || n[la] > 11 ? la : n[ua] < 1 || n[ua] > ot(n[sa], n[la]) ? ua : n[da] < 0 || n[da] > 24 || 24 === n[da] && (0 !== n[ca] || 0 !== n[ha] || 0 !== n[fa]) ? da : n[ca] < 0 || n[ca] > 59 ? ca : n[ha] < 0 || n[ha] > 59 ? ha : n[fa] < 0 || n[fa] > 999 ? fa : -1, p(t)._overflowDayOfYear && (e < sa || e > ua) && (e = ua), p(t)._overflowWeeks && e === -1 && (e = ga), p(t)._overflowWeekday && e === -1 && (e = pa), p(t).overflow = e), t;
            }
            function oe(t) {
              var e,
                  n,
                  i,
                  a,
                  r,
                  o,
                  s = t._i,
                  l = Va.exec(s) || Wa.exec(s);
              if (l) {
                for (p(t).iso = !0, e = 0, n = za.length; e < n; e++) {
                  if (za[e][1].exec(l[1])) {
                    a = za[e][0], i = za[e][2] !== !1;
                    break;
                  }
                }if (null == a) return void (t._isValid = !1);
                if (l[3]) {
                  for (e = 0, n = Na.length; e < n; e++) {
                    if (Na[e][1].exec(l[3])) {
                      r = (l[2] || ' ') + Na[e][0];
                      break;
                    }
                  }if (null == r) return void (t._isValid = !1);
                }
                if (!i && null != r) return void (t._isValid = !1);
                if (l[4]) {
                  if (!Ya.exec(l[4])) return void (t._isValid = !1);
                  o = 'Z';
                }
                t._f = a + (r || '') + (o || ''), fe(t);
              } else t._isValid = !1;
            }
            function se(t) {
              var e,
                  n,
                  i,
                  a,
                  r,
                  o,
                  s,
                  l,
                  u = {
                ' GMT': ' +0000',
                ' EDT': ' -0400',
                ' EST': ' -0500',
                ' CDT': ' -0500',
                ' CST': ' -0600',
                ' MDT': ' -0600',
                ' MST': ' -0700',
                ' PDT': ' -0700',
                ' PST': ' -0800'
              },
                  d = 'YXWVUTSRQPONZABCDEFGHIKLM';
              if (e = t._i.replace(/\([^\)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s|\s$/g, ''), n = Ea.exec(e)) {
                if (i = n[1] ? 'ddd' + (5 === n[1].length ? ', ' : ' ') : '', a = 'D MMM ' + (n[2].length > 10 ? 'YYYY ' : 'YY '), r = 'HH:mm' + (n[4] ? ':ss' : ''), n[1]) {
                  var c = new Date(n[2]),
                      h = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][c.getDay()];
                  if (n[1].substr(0, 3) !== h) return p(t).weekdayMismatch = !0, void (t._isValid = !1);
                }
                switch (n[5].length) {
                  case 2:
                    0 === l ? s = ' +0000' : (l = d.indexOf(n[5][1].toUpperCase()) - 12, s = (l < 0 ? ' -' : ' +') + ('' + l).replace(/^-?/, '0').match(/..$/)[0] + '00');
                    break;
                  case 4:
                    s = u[n[5]];
                    break;
                  default:
                    s = u[' GMT'];
                }
                n[5] = s, t._i = n.splice(1).join(''), o = ' ZZ', t._f = i + a + r + o, fe(t), p(t).rfc2822 = !0;
              } else t._isValid = !1;
            }
            function le(e) {
              var n = Ba.exec(e._i);
              return null !== n ? void (e._d = new Date(+n[1])) : (oe(e), void (e._isValid === !1 && (delete e._isValid, se(e), e._isValid === !1 && (delete e._isValid, t.createFromInputFallback(e)))));
            }
            function ue(t, e, n) {
              return null != t ? t : null != e ? e : n;
            }
            function de(e) {
              var n = new Date(t.now());
              return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()];
            }
            function ce(t) {
              var e,
                  n,
                  i,
                  a,
                  r = [];
              if (!t._d) {
                for (i = de(t), t._w && null == t._a[ua] && null == t._a[la] && he(t), null != t._dayOfYear && (a = ue(t._a[sa], i[sa]), (t._dayOfYear > vt(a) || 0 === t._dayOfYear) && (p(t)._overflowDayOfYear = !0), n = _t(a, 0, t._dayOfYear), t._a[la] = n.getUTCMonth(), t._a[ua] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) {
                  t._a[e] = r[e] = i[e];
                }for (; e < 7; e++) {
                  t._a[e] = r[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                }24 === t._a[da] && 0 === t._a[ca] && 0 === t._a[ha] && 0 === t._a[fa] && (t._nextDay = !0, t._a[da] = 0), t._d = (t._useUTC ? _t : xt).apply(null, r), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[da] = 24);
              }
            }
            function he(t) {
              var e, n, i, a, r, o, s, l;
              if (e = t._w, null != e.GG || null != e.W || null != e.E) r = 1, o = 4, n = ue(e.GG, t._a[sa], Mt(_e(), 1, 4).year), i = ue(e.W, 1), a = ue(e.E, 1), (a < 1 || a > 7) && (l = !0);else {
                r = t._locale._week.dow, o = t._locale._week.doy;
                var u = Mt(_e(), r, o);
                n = ue(e.gg, t._a[sa], u.year), i = ue(e.w, u.week), null != e.d ? (a = e.d, (a < 0 || a > 6) && (l = !0)) : null != e.e ? (a = e.e + r, (e.e < 0 || e.e > 6) && (l = !0)) : a = r;
              }
              i < 1 || i > St(n, r, o) ? p(t)._overflowWeeks = !0 : null != l ? p(t)._overflowWeekday = !0 : (s = wt(n, i, a, r, o), t._a[sa] = s.year, t._dayOfYear = s.dayOfYear);
            }
            function fe(e) {
              if (e._f === t.ISO_8601) return void oe(e);
              if (e._f === t.RFC_2822) return void se(e);
              e._a = [], p(e).empty = !0;
              var n,
                  i,
                  a,
                  r,
                  o,
                  s = '' + e._i,
                  l = s.length,
                  u = 0;
              for (a = Q(e._f, e._locale).match(Yi) || [], n = 0; n < a.length; n++) {
                r = a[n], i = (s.match(tt(r, e)) || [])[0], i && (o = s.substr(0, s.indexOf(i)), o.length > 0 && p(e).unusedInput.push(o), s = s.slice(s.indexOf(i) + i.length), u += i.length), Bi[r] ? (i ? p(e).empty = !1 : p(e).unusedTokens.push(r), rt(r, i, e)) : e._strict && !i && p(e).unusedTokens.push(r);
              }p(e).charsLeftOver = l - u, s.length > 0 && p(e).unusedInput.push(s), e._a[da] <= 12 && p(e).bigHour === !0 && e._a[da] > 0 && (p(e).bigHour = void 0), p(e).parsedDateParts = e._a.slice(0), p(e).meridiem = e._meridiem, e._a[da] = ge(e._locale, e._a[da], e._meridiem), ce(e), re(e);
            }
            function ge(t, e, n) {
              var i;
              return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n), i && e < 12 && (e += 12), i || 12 !== e || (e = 0), e) : e;
            }
            function pe(t) {
              var e, n, i, a, r;
              if (0 === t._f.length) return p(t).invalidFormat = !0, void (t._d = new Date(NaN));
              for (a = 0; a < t._f.length; a++) {
                r = 0, e = y({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[a], fe(e), m(e) && (r += p(e).charsLeftOver, r += 10 * p(e).unusedTokens.length, p(e).score = r, (null == i || r < i) && (i = r, n = e));
              }h(t, n || e);
            }
            function me(t) {
              if (!t._d) {
                var e = z(t._i);
                t._a = d([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
                  return t && parseInt(t, 10);
                }), ce(t);
              }
            }
            function ve(t) {
              var e = new b(re(ye(t)));
              return e._nextDay && (e.add(1, 'd'), e._nextDay = void 0), e;
            }
            function ye(t) {
              var e = t._i,
                  n = t._f;
              return t._locale = t._locale || ie(t._l), null === e || void 0 === n && '' === e ? v({ nullInput: !0 }) : ('string' == typeof e && (t._i = e = t._locale.preparse(e)), x(e) ? new b(re(e)) : (u(e) ? t._d = e : a(n) ? pe(t) : n ? fe(t) : be(t), m(t) || (t._d = null), t));
            }
            function be(e) {
              var n = e._i;
              s(n) ? e._d = new Date(t.now()) : u(n) ? e._d = new Date(n.valueOf()) : 'string' == typeof n ? le(e) : a(n) ? (e._a = d(n.slice(0), function (t) {
                return parseInt(t, 10);
              }), ce(e)) : r(n) ? me(e) : l(n) ? e._d = new Date(n) : t.createFromInputFallback(e);
            }
            function xe(t, e, n, i, s) {
              var l = {};
              return n !== !0 && n !== !1 || (i = n, n = void 0), (r(t) && o(t) || a(t) && 0 === t.length) && (t = void 0), l._isAMomentObject = !0, l._useUTC = l._isUTC = s, l._l = n, l._i = t, l._f = e, l._strict = i, ve(l);
            }
            function _e(t, e, n, i) {
              return xe(t, e, n, i, !1);
            }
            function ke(t, e) {
              var n, i;
              if (1 === e.length && a(e[0]) && (e = e[0]), !e.length) return _e();
              for (n = e[0], i = 1; i < e.length; ++i) {
                e[i].isValid() && !e[i][t](n) || (n = e[i]);
              }return n;
            }
            function we() {
              var t = [].slice.call(arguments, 0);
              return ke('isBefore', t);
            }
            function Me() {
              var t = [].slice.call(arguments, 0);
              return ke('isAfter', t);
            }
            function Se(t) {
              for (var e in t) {
                if (Ga.indexOf(e) === -1 || null != t[e] && isNaN(t[e])) return !1;
              }for (var n = !1, i = 0; i < Ga.length; ++i) {
                if (t[Ga[i]]) {
                  if (n) return !1;
                  parseFloat(t[Ga[i]]) !== k(t[Ga[i]]) && (n = !0);
                }
              }return !0;
            }
            function De() {
              return this._isValid;
            }
            function Ce() {
              return Ge(NaN);
            }
            function Pe(t) {
              var e = z(t),
                  n = e.year || 0,
                  i = e.quarter || 0,
                  a = e.month || 0,
                  r = e.week || 0,
                  o = e.day || 0,
                  s = e.hour || 0,
                  l = e.minute || 0,
                  u = e.second || 0,
                  d = e.millisecond || 0;
              this._isValid = Se(e), this._milliseconds = +d + 1000 * u + 60000 * l + 1000 * s * 60 * 60, this._days = +o + 7 * r, this._months = +a + 3 * i + 12 * n, this._data = {}, this._locale = ie(), this._bubble();
            }
            function Te(t) {
              return t instanceof Pe;
            }
            function Ie(t) {
              return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t);
            }
            function Ae(t, e) {
              Z(t, 0, 0, function () {
                var t = this.utcOffset(),
                    n = '+';
                return t < 0 && (t = -t, n = '-'), n + q(~~(t / 60), 2) + e + q(~~t % 60, 2);
              });
            }
            function Fe(t, e) {
              var n = (e || '').match(t);
              if (null === n) return null;
              var i = n[n.length - 1] || [],
                  a = (i + '').match(qa) || ['-', 0, 0],
                  r = +(60 * a[1]) + k(a[2]);
              return 0 === r ? 0 : '+' === a[0] ? r : -r;
            }
            function Oe(e, n) {
              var i, a;
              return n._isUTC ? (i = n.clone(), a = (x(e) || u(e) ? e.valueOf() : _e(e).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + a), t.updateOffset(i, !1), i) : _e(e).local();
            }
            function Re(t) {
              return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
            }
            function Le(e, n, i) {
              var a,
                  r = this._offset || 0;
              if (!this.isValid()) return null != e ? this : NaN;
              if (null != e) {
                if ('string' == typeof e) {
                  if (e = Fe(na, e), null === e) return this;
                } else Math.abs(e) < 16 && !i && (e *= 60);
                return !this._isUTC && n && (a = Re(this)), this._offset = e, this._isUTC = !0, null != a && this.add(a, 'm'), r !== e && (!n || this._changeInProgress ? Ke(this, Ge(e - r, 'm'), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this;
              }
              return this._isUTC ? r : Re(this);
            }
            function Ve(t, e) {
              return null != t ? ('string' != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
            }
            function We(t) {
              return this.utcOffset(0, t);
            }
            function Ye(t) {
              return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Re(this), 'm')), this;
            }
            function ze() {
              if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);else if ('string' == typeof this._i) {
                var t = Fe(ea, this._i);
                null != t ? this.utcOffset(t) : this.utcOffset(0, !0);
              }
              return this;
            }
            function Ne(t) {
              return !!this.isValid() && (t = t ? _e(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0);
            }
            function Be() {
              return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
            }
            function Ee() {
              if (!s(this._isDSTShifted)) return this._isDSTShifted;
              var t = {};
              if (y(t, this), t = ye(t), t._a) {
                var e = t._isUTC ? f(t._a) : _e(t._a);
                this._isDSTShifted = this.isValid() && w(t._a, e.toArray()) > 0;
              } else this._isDSTShifted = !1;
              return this._isDSTShifted;
            }
            function He() {
              return !!this.isValid() && !this._isUTC;
            }
            function je() {
              return !!this.isValid() && this._isUTC;
            }
            function Ue() {
              return !!this.isValid() && this._isUTC && 0 === this._offset;
            }
            function Ge(t, e) {
              var n,
                  i,
                  a,
                  r = t,
                  o = null;
              return Te(t) ? r = {
                ms: t._milliseconds,
                d: t._days,
                M: t._months
              } : l(t) ? (r = {}, e ? r[e] = t : r.milliseconds = t) : (o = Za.exec(t)) ? (n = '-' === o[1] ? -1 : 1, r = {
                y: 0,
                d: k(o[ua]) * n,
                h: k(o[da]) * n,
                m: k(o[ca]) * n,
                s: k(o[ha]) * n,
                ms: k(Ie(1000 * o[fa])) * n
              }) : (o = Xa.exec(t)) ? (n = '-' === o[1] ? -1 : 1, r = {
                y: qe(o[2], n),
                M: qe(o[3], n),
                w: qe(o[4], n),
                d: qe(o[5], n),
                h: qe(o[6], n),
                m: qe(o[7], n),
                s: qe(o[8], n)
              }) : null == r ? r = {} : 'object' == (typeof r === 'undefined' ? 'undefined' : _typeof(r)) && ('from' in r || 'to' in r) && (a = Xe(_e(r.from), _e(r.to)), r = {}, r.ms = a.milliseconds, r.M = a.months), i = new Pe(r), Te(t) && c(t, '_locale') && (i._locale = t._locale), i;
            }
            function qe(t, e) {
              var n = t && parseFloat(t.replace(',', '.'));
              return (isNaN(n) ? 0 : n) * e;
            }
            function Ze(t, e) {
              var n = {
                milliseconds: 0,
                months: 0
              };
              return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, 'M').isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, 'M'), n;
            }
            function Xe(t, e) {
              var n;
              return t.isValid() && e.isValid() ? (e = Oe(e, t), t.isBefore(e) ? n = Ze(t, e) : (n = Ze(e, t), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
                milliseconds: 0,
                months: 0
              };
            }
            function Je(t, e) {
              return function (n, i) {
                var a, r;
                return null === i || isNaN(+i) || (D(e, 'moment().' + e + '(period, number) is deprecated. Please use moment().' + e + '(number, period). See https://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'), r = n, n = i, i = r), n = 'string' == typeof n ? +n : n, a = Ge(n, i), Ke(this, a, t), this;
              };
            }
            function Ke(e, n, i, a) {
              var r = n._milliseconds,
                  o = Ie(n._days),
                  s = Ie(n._months);
              e.isValid() && (a = null == a || a, r && e._d.setTime(e._d.valueOf() + r * i), o && j(e, 'Date', H(e, 'Date') + o * i), s && ct(e, H(e, 'Month') + s * i), a && t.updateOffset(e, o || s));
            }
            function Qe(t, e) {
              var n = t.diff(e, 'days', !0);
              return n < -6 ? 'sameElse' : n < -1 ? 'lastWeek' : n < 0 ? 'lastDay' : n < 1 ? 'sameDay' : n < 2 ? 'nextDay' : n < 7 ? 'nextWeek' : 'sameElse';
            }
            function $e(e, n) {
              var i = e || _e(),
                  a = Oe(i, this).startOf('day'),
                  r = t.calendarFormat(this, a) || 'sameElse',
                  o = n && (C(n[r]) ? n[r].call(this, i) : n[r]);
              return this.format(o || this.localeData().calendar(r, this, _e(i)));
            }
            function tn() {
              return new b(this);
            }
            function en(t, e) {
              var n = x(t) ? t : _e(t);
              return !(!this.isValid() || !n.isValid()) && (e = Y(s(e) ? 'millisecond' : e), 'millisecond' === e ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf());
            }
            function nn(t, e) {
              var n = x(t) ? t : _e(t);
              return !(!this.isValid() || !n.isValid()) && (e = Y(s(e) ? 'millisecond' : e), 'millisecond' === e ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf());
            }
            function an(t, e, n, i) {
              return i = i || '()', ('(' === i[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (')' === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n));
            }
            function rn(t, e) {
              var n,
                  i = x(t) ? t : _e(t);
              return !(!this.isValid() || !i.isValid()) && (e = Y(e || 'millisecond'), 'millisecond' === e ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()));
            }
            function on(t, e) {
              return this.isSame(t, e) || this.isAfter(t, e);
            }
            function sn(t, e) {
              return this.isSame(t, e) || this.isBefore(t, e);
            }
            function ln(t, e, n) {
              var i, a, r, o;
              return this.isValid() ? (i = Oe(t, this), i.isValid() ? (a = 60000 * (i.utcOffset() - this.utcOffset()), e = Y(e), 'year' === e || 'month' === e || 'quarter' === e ? (o = un(this, i), 'quarter' === e ? o /= 3 : 'year' === e && (o /= 12)) : (r = this - i, o = 'second' === e ? r / 1000 : 'minute' === e ? r / 60000 : 'hour' === e ? r / 3600000 : 'day' === e ? (r - a) / 86400000 : 'week' === e ? (r - a) / 604800000 : r), n ? o : _(o)) : NaN) : NaN;
            }
            function un(t, e) {
              var n,
                  i,
                  a = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                  r = t.clone().add(a, 'months');
              return e - r < 0 ? (n = t.clone().add(a - 1, 'months'), i = (e - r) / (r - n)) : (n = t.clone().add(a + 1, 'months'), i = (e - r) / (n - r)), -(a + i) || 0;
            }
            function dn() {
              return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
            }
            function cn() {
              if (!this.isValid()) return null;
              var t = this.clone().utc();
              return t.year() < 0 || t.year() > 9999 ? K(t, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : C(Date.prototype.toISOString) ? this.toDate().toISOString() : K(t, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
            function hn() {
              if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)';
              var t = 'moment',
                  e = '';
              this.isLocal() || (t = 0 === this.utcOffset() ? 'moment.utc' : 'moment.parseZone', e = 'Z');
              var n = '[' + t + '("]',
                  i = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY',
                  a = '-MM-DD[T]HH:mm:ss.SSS',
                  r = e + '[")]';
              return this.format(n + i + a + r);
            }
            function fn(e) {
              e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
              var n = K(this, e);
              return this.localeData().postformat(n);
            }
            function gn(t, e) {
              return this.isValid() && (x(t) && t.isValid() || _e(t).isValid()) ? Ge({
                to: this,
                from: t
              }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
            }
            function pn(t) {
              return this.from(_e(), t);
            }
            function mn(t, e) {
              return this.isValid() && (x(t) && t.isValid() || _e(t).isValid()) ? Ge({
                from: this,
                to: t
              }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
            }
            function vn(t) {
              return this.to(_e(), t);
            }
            function yn(t) {
              var e;
              return void 0 === t ? this._locale._abbr : (e = ie(t), null != e && (this._locale = e), this);
            }
            function bn() {
              return this._locale;
            }
            function xn(t) {
              switch (t = Y(t)) {
                case 'year':
                  this.month(0);
                case 'quarter':
                case 'month':
                  this.date(1);
                case 'week':
                case 'isoWeek':
                case 'day':
                case 'date':
                  this.hours(0);
                case 'hour':
                  this.minutes(0);
                case 'minute':
                  this.seconds(0);
                case 'second':
                  this.milliseconds(0);
              }
              return 'week' === t && this.weekday(0), 'isoWeek' === t && this.isoWeekday(1), 'quarter' === t && this.month(3 * Math.floor(this.month() / 3)), this;
            }
            function _n(t) {
              return t = Y(t), void 0 === t || 'millisecond' === t ? this : ('date' === t && (t = 'day'), this.startOf(t).add(1, 'isoWeek' === t ? 'week' : t).subtract(1, 'ms'));
            }
            function kn() {
              return this._d.valueOf() - 60000 * (this._offset || 0);
            }
            function wn() {
              return Math.floor(this.valueOf() / 1000);
            }
            function Mn() {
              return new Date(this.valueOf());
            }
            function Sn() {
              var t = this;
              return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()];
            }
            function Dn() {
              var t = this;
              return {
                years: t.year(),
                months: t.month(),
                date: t.date(),
                hours: t.hours(),
                minutes: t.minutes(),
                seconds: t.seconds(),
                milliseconds: t.milliseconds()
              };
            }
            function Cn() {
              return this.isValid() ? this.toISOString() : null;
            }
            function Pn() {
              return m(this);
            }
            function Tn() {
              return h({}, p(this));
            }
            function In() {
              return p(this).overflow;
            }
            function An() {
              return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
              };
            }
            function Fn(t, e) {
              Z(0, [t, t.length], 0, e);
            }
            function On(t) {
              return Wn.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
            }
            function Rn(t) {
              return Wn.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
            }
            function Ln() {
              return St(this.year(), 1, 4);
            }
            function Vn() {
              var t = this.localeData()._week;
              return St(this.year(), t.dow, t.doy);
            }
            function Wn(t, e, n, i, a) {
              var r;
              return null == t ? Mt(this, i, a).year : (r = St(t, i, a), e > r && (e = r), Yn.call(this, t, e, n, i, a));
            }
            function Yn(t, e, n, i, a) {
              var r = wt(t, e, n, i, a),
                  o = _t(r.year, 0, r.dayOfYear);
              return this.year(o.getUTCFullYear()), this.month(o.getUTCMonth()), this.date(o.getUTCDate()), this;
            }
            function zn(t) {
              return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
            }
            function Nn(t) {
              var e = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 86400000) + 1;
              return null == t ? e : this.add(t - e, 'd');
            }
            function Bn(t, e) {
              e[fa] = k(1000 * ('0.' + t));
            }
            function En() {
              return this._isUTC ? 'UTC' : '';
            }
            function Hn() {
              return this._isUTC ? 'Coordinated Universal Time' : '';
            }
            function jn(t) {
              return _e(1000 * t);
            }
            function Un() {
              return _e.apply(null, arguments).parseZone();
            }
            function Gn(t) {
              return t;
            }
            function qn(t, e, n, i) {
              var a = ie(),
                  r = f().set(i, e);
              return a[n](r, t);
            }
            function Zn(t, e, n) {
              if (l(t) && (e = t, t = void 0), t = t || '', null != e) return qn(t, e, n, 'month');
              var i,
                  a = [];
              for (i = 0; i < 12; i++) {
                a[i] = qn(t, i, n, 'month');
              }return a;
            }
            function Xn(t, e, n, i) {
              'boolean' == typeof t ? (l(e) && (n = e, e = void 0), e = e || '') : (e = t, n = e, t = !1, l(e) && (n = e, e = void 0), e = e || '');
              var a = ie(),
                  r = t ? a._week.dow : 0;
              if (null != n) return qn(e, (n + r) % 7, i, 'day');
              var o,
                  s = [];
              for (o = 0; o < 7; o++) {
                s[o] = qn(e, (o + r) % 7, i, 'day');
              }return s;
            }
            function Jn(t, e) {
              return Zn(t, e, 'months');
            }
            function Kn(t, e) {
              return Zn(t, e, 'monthsShort');
            }
            function Qn(t, e, n) {
              return Xn(t, e, n, 'weekdays');
            }
            function $n(t, e, n) {
              return Xn(t, e, n, 'weekdaysShort');
            }
            function ti(t, e, n) {
              return Xn(t, e, n, 'weekdaysMin');
            }
            function ei() {
              var t = this._data;
              return this._milliseconds = or(this._milliseconds), this._days = or(this._days), this._months = or(this._months), t.milliseconds = or(t.milliseconds), t.seconds = or(t.seconds), t.minutes = or(t.minutes), t.hours = or(t.hours), t.months = or(t.months), t.years = or(t.years), this;
            }
            function ni(t, e, n, i) {
              var a = Ge(e, n);
              return t._milliseconds += i * a._milliseconds, t._days += i * a._days, t._months += i * a._months, t._bubble();
            }
            function ii(t, e) {
              return ni(this, t, e, 1);
            }
            function ai(t, e) {
              return ni(this, t, e, -1);
            }
            function ri(t) {
              return t < 0 ? Math.floor(t) : Math.ceil(t);
            }
            function oi() {
              var t,
                  e,
                  n,
                  i,
                  a,
                  r = this._milliseconds,
                  o = this._days,
                  s = this._months,
                  l = this._data;
              return r >= 0 && o >= 0 && s >= 0 || r <= 0 && o <= 0 && s <= 0 || (r += 86400000 * ri(li(s) + o), o = 0, s = 0), l.milliseconds = r % 1000, t = _(r / 1000), l.seconds = t % 60, e = _(t / 60), l.minutes = e % 60, n = _(e / 60), l.hours = n % 24, o += _(n / 24), a = _(si(o)), s += a, o -= ri(li(a)), i = _(s / 12), s %= 12, l.days = o, l.months = s, l.years = i, this;
            }
            function si(t) {
              return 4800 * t / 146097;
            }
            function li(t) {
              return 146097 * t / 4800;
            }
            function ui(t) {
              if (!this.isValid()) return NaN;
              var e,
                  n,
                  i = this._milliseconds;
              if (t = Y(t), 'month' === t || 'year' === t) return e = this._days + i / 86400000, n = this._months + si(e), 'month' === t ? n : n / 12;
              switch (e = this._days + Math.round(li(this._months)), t) {
                case 'week':
                  return e / 7 + i / 604800000;
                case 'day':
                  return e + i / 86400000;
                case 'hour':
                  return 24 * e + i / 3600000;
                case 'minute':
                  return 1440 * e + i / 60000;
                case 'second':
                  return 86400 * e + i / 1000;
                case 'millisecond':
                  return Math.floor(86400000 * e) + i;
                default:
                  throw new Error('Unknown unit ' + t);
              }
            }
            function di() {
              return this.isValid() ? this._milliseconds + 86400000 * this._days + this._months % 12 * 2592000000 + 31536000000 * k(this._months / 12) : NaN;
            }
            function ci(t) {
              return function () {
                return this.as(t);
              };
            }
            function hi(t) {
              return t = Y(t), this.isValid() ? this[t + 's']() : NaN;
            }
            function fi(t) {
              return function () {
                return this.isValid() ? this._data[t] : NaN;
              };
            }
            function gi() {
              return _(this.days() / 7);
            }
            function pi(t, e, n, i, a) {
              return a.relativeTime(e || 1, !!n, t, i);
            }
            function mi(t, e, n) {
              var i = Ge(t).abs(),
                  a = kr(i.as('s')),
                  r = kr(i.as('m')),
                  o = kr(i.as('h')),
                  s = kr(i.as('d')),
                  l = kr(i.as('M')),
                  u = kr(i.as('y')),
                  d = a <= wr.ss && ['s', a] || a < wr.s && ['ss', a] || r <= 1 && ['m'] || r < wr.m && ['mm', r] || o <= 1 && ['h'] || o < wr.h && ['hh', o] || s <= 1 && ['d'] || s < wr.d && ['dd', s] || l <= 1 && ['M'] || l < wr.M && ['MM', l] || u <= 1 && ['y'] || ['yy', u];
              return d[2] = e, d[3] = +t > 0, d[4] = n, pi.apply(null, d);
            }
            function vi(t) {
              return void 0 === t ? kr : 'function' == typeof t && (kr = t, !0);
            }
            function yi(t, e) {
              return void 0 !== wr[t] && (void 0 === e ? wr[t] : (wr[t] = e, 's' === t && (wr.ss = e - 1), !0));
            }
            function bi(t) {
              if (!this.isValid()) return this.localeData().invalidDate();
              var e = this.localeData(),
                  n = mi(this, !t, e);
              return t && (n = e.pastFuture(+this, n)), e.postformat(n);
            }
            function xi() {
              if (!this.isValid()) return this.localeData().invalidDate();
              var t,
                  e,
                  n,
                  i = Mr(this._milliseconds) / 1000,
                  a = Mr(this._days),
                  r = Mr(this._months);
              t = _(i / 60), e = _(t / 60), i %= 60, t %= 60, n = _(r / 12), r %= 12;
              var o = n,
                  s = r,
                  l = a,
                  u = e,
                  d = t,
                  c = i,
                  h = this.asSeconds();
              return h ? (h < 0 ? '-' : '') + 'P' + (o ? o + 'Y' : '') + (s ? s + 'M' : '') + (l ? l + 'D' : '') + (u || d || c ? 'T' : '') + (u ? u + 'H' : '') + (d ? d + 'M' : '') + (c ? c + 'S' : '') : 'P0D';
            }
            var _i, ki;
            ki = Array.prototype.some ? Array.prototype.some : function (t) {
              for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++) {
                if (i in e && t.call(this, e[i], i, e)) return !0;
              }return !1;
            };
            var wi = ki,
                Mi = t.momentProperties = [],
                Si = !1,
                Di = {};
            t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;
            var Ci;
            Ci = Object.keys ? Object.keys : function (t) {
              var e,
                  n = [];
              for (e in t) {
                c(t, e) && n.push(e);
              }return n;
            };
            var Pi,
                Ti = Ci,
                Ii = {
              sameDay: '[Today at] LT',
              nextDay: '[Tomorrow at] LT',
              nextWeek: 'dddd [at] LT',
              lastDay: '[Yesterday at] LT',
              lastWeek: '[Last] dddd [at] LT',
              sameElse: 'L'
            },
                Ai = {
              LTS: 'h:mm:ss A',
              LT: 'h:mm A',
              L: 'MM/DD/YYYY',
              LL: 'MMMM D, YYYY',
              LLL: 'MMMM D, YYYY h:mm A',
              LLLL: 'dddd, MMMM D, YYYY h:mm A'
            },
                Fi = 'Invalid date',
                Oi = '%d',
                Ri = /\d{1,2}/,
                Li = {
              future: 'in %s',
              past: '%s ago',
              s: 'a few seconds',
              ss: '%d seconds',
              m: 'a minute',
              mm: '%d minutes',
              h: 'an hour',
              hh: '%d hours',
              d: 'a day',
              dd: '%d days',
              M: 'a month',
              MM: '%d months',
              y: 'a year',
              yy: '%d years'
            },
                Vi = {},
                Wi = {},
                Yi = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                zi = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                Ni = {},
                Bi = {},
                Ei = /\d/,
                Hi = /\d\d/,
                ji = /\d{3}/,
                Ui = /\d{4}/,
                Gi = /[+-]?\d{6}/,
                qi = /\d\d?/,
                Zi = /\d\d\d\d?/,
                Xi = /\d\d\d\d\d\d?/,
                Ji = /\d{1,3}/,
                Ki = /\d{1,4}/,
                Qi = /[+-]?\d{1,6}/,
                $i = /\d+/,
                ta = /[+-]?\d+/,
                ea = /Z|[+-]\d\d:?\d\d/gi,
                na = /Z|[+-]\d\d(?::?\d\d)?/gi,
                ia = /[+-]?\d+(\.\d{1,3})?/,
                aa = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
                ra = {},
                oa = {},
                sa = 0,
                la = 1,
                ua = 2,
                da = 3,
                ca = 4,
                ha = 5,
                fa = 6,
                ga = 7,
                pa = 8;
            Pi = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) {
              var e;
              for (e = 0; e < this.length; ++e) {
                if (this[e] === t) return e;
              }return -1;
            };
            var ma = Pi;
            Z('M', ['MM', 2], 'Mo', function () {
              return this.month() + 1;
            }), Z('MMM', 0, 0, function (t) {
              return this.localeData().monthsShort(this, t);
            }), Z('MMMM', 0, 0, function (t) {
              return this.localeData().months(this, t);
            }), W('month', 'M'), N('month', 8), $('M', qi), $('MM', qi, Hi), $('MMM', function (t, e) {
              return e.monthsShortRegex(t);
            }), $('MMMM', function (t, e) {
              return e.monthsRegex(t);
            }), it(['M', 'MM'], function (t, e) {
              e[la] = k(t) - 1;
            }), it(['MMM', 'MMMM'], function (t, e, n, i) {
              var a = n._locale.monthsParse(t, i, n._strict);
              null != a ? e[la] = a : p(n).invalidMonth = t;
            });
            var va = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
                ya = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
                ba = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
                xa = aa,
                _a = aa;
            Z('Y', 0, 0, function () {
              var t = this.year();
              return t <= 9999 ? '' + t : '+' + t;
            }), Z(0, ['YY', 2], 0, function () {
              return this.year() % 100;
            }), Z(0, ['YYYY', 4], 0, 'year'), Z(0, ['YYYYY', 5], 0, 'year'), Z(0, ['YYYYYY', 6, !0], 0, 'year'), W('year', 'y'), N('year', 1), $('Y', ta), $('YY', qi, Hi), $('YYYY', Ki, Ui), $('YYYYY', Qi, Gi), $('YYYYYY', Qi, Gi), it(['YYYYY', 'YYYYYY'], sa), it('YYYY', function (e, n) {
              n[sa] = 2 === e.length ? t.parseTwoDigitYear(e) : k(e);
            }), it('YY', function (e, n) {
              n[sa] = t.parseTwoDigitYear(e);
            }), it('Y', function (t, e) {
              e[sa] = parseInt(t, 10);
            }), t.parseTwoDigitYear = function (t) {
              return k(t) + (k(t) > 68 ? 1900 : 2000);
            };
            var ka = E('FullYear', !0);
            Z('w', ['ww', 2], 'wo', 'week'), Z('W', ['WW', 2], 'Wo', 'isoWeek'), W('week', 'w'), W('isoWeek', 'W'), N('week', 5), N('isoWeek', 5), $('w', qi), $('ww', qi, Hi), $('W', qi), $('WW', qi, Hi), at(['w', 'ww', 'W', 'WW'], function (t, e, n, i) {
              e[i.substr(0, 1)] = k(t);
            });
            var wa = {
              dow: 0,
              doy: 6
            };
            Z('d', 0, 'do', 'day'), Z('dd', 0, 0, function (t) {
              return this.localeData().weekdaysMin(this, t);
            }), Z('ddd', 0, 0, function (t) {
              return this.localeData().weekdaysShort(this, t);
            }), Z('dddd', 0, 0, function (t) {
              return this.localeData().weekdays(this, t);
            }), Z('e', 0, 0, 'weekday'), Z('E', 0, 0, 'isoWeekday'), W('day', 'd'), W('weekday', 'e'), W('isoWeekday', 'E'), N('day', 11), N('weekday', 11), N('isoWeekday', 11), $('d', qi), $('e', qi), $('E', qi), $('dd', function (t, e) {
              return e.weekdaysMinRegex(t);
            }), $('ddd', function (t, e) {
              return e.weekdaysShortRegex(t);
            }), $('dddd', function (t, e) {
              return e.weekdaysRegex(t);
            }), at(['dd', 'ddd', 'dddd'], function (t, e, n, i) {
              var a = n._locale.weekdaysParse(t, i, n._strict);
              null != a ? e.d = a : p(n).invalidWeekday = t;
            }), at(['d', 'e', 'E'], function (t, e, n, i) {
              e[i] = k(t);
            });
            var Ma = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
                Sa = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
                Da = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
                Ca = aa,
                Pa = aa,
                Ta = aa;
            Z('H', ['HH', 2], 0, 'hour'), Z('h', ['hh', 2], 0, Ut), Z('k', ['kk', 2], 0, Gt), Z('hmm', 0, 0, function () {
              return '' + Ut.apply(this) + q(this.minutes(), 2);
            }), Z('hmmss', 0, 0, function () {
              return '' + Ut.apply(this) + q(this.minutes(), 2) + q(this.seconds(), 2);
            }), Z('Hmm', 0, 0, function () {
              return '' + this.hours() + q(this.minutes(), 2);
            }), Z('Hmmss', 0, 0, function () {
              return '' + this.hours() + q(this.minutes(), 2) + q(this.seconds(), 2);
            }), qt('a', !0), qt('A', !1), W('hour', 'h'), N('hour', 13), $('a', Zt), $('A', Zt), $('H', qi), $('h', qi), $('k', qi), $('HH', qi, Hi), $('hh', qi, Hi), $('kk', qi, Hi), $('hmm', Zi), $('hmmss', Xi), $('Hmm', Zi), $('Hmmss', Xi), it(['H', 'HH'], da), it(['k', 'kk'], function (t, e, n) {
              var i = k(t);
              e[da] = 24 === i ? 0 : i;
            }), it(['a', 'A'], function (t, e, n) {
              n._isPm = n._locale.isPM(t), n._meridiem = t;
            }), it(['h', 'hh'], function (t, e, n) {
              e[da] = k(t), p(n).bigHour = !0;
            }), it('hmm', function (t, e, n) {
              var i = t.length - 2;
              e[da] = k(t.substr(0, i)), e[ca] = k(t.substr(i)), p(n).bigHour = !0;
            }), it('hmmss', function (t, e, n) {
              var i = t.length - 4,
                  a = t.length - 2;
              e[da] = k(t.substr(0, i)), e[ca] = k(t.substr(i, 2)), e[ha] = k(t.substr(a)), p(n).bigHour = !0;
            }), it('Hmm', function (t, e, n) {
              var i = t.length - 2;
              e[da] = k(t.substr(0, i)), e[ca] = k(t.substr(i));
            }), it('Hmmss', function (t, e, n) {
              var i = t.length - 4,
                  a = t.length - 2;
              e[da] = k(t.substr(0, i)), e[ca] = k(t.substr(i, 2)), e[ha] = k(t.substr(a));
            });
            var Ia,
                Aa = /[ap]\.?m?\.?/i,
                Fa = E('Hours', !0),
                Oa = {
              calendar: Ii,
              longDateFormat: Ai,
              invalidDate: Fi,
              ordinal: Oi,
              dayOfMonthOrdinalParse: Ri,
              relativeTime: Li,
              months: ya,
              monthsShort: ba,
              week: wa,
              weekdays: Ma,
              weekdaysMin: Da,
              weekdaysShort: Sa,
              meridiemParse: Aa
            },
                Ra = {},
                La = {},
                Va = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                Wa = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                Ya = /Z|[+-]\d\d(?::?\d\d)?/,
                za = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, !1], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, !1], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, !1], ['YYYYDDD', /\d{7}/]],
                Na = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]],
                Ba = /^\/?Date\((\-?\d+)/i,
                Ea = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
            t.createFromInputFallback = S('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to https://momentjs.com/guides/#/warnings/js-date/ for more info.', function (t) {
              t._d = new Date(t._i + (t._useUTC ? ' UTC' : ''));
            }), t.ISO_8601 = function () {}, t.RFC_2822 = function () {};
            var Ha = S('moment().min is deprecated, use moment.max instead. https://momentjs.com/guides/#/warnings/min-max/', function () {
              var t = _e.apply(null, arguments);
              return this.isValid() && t.isValid() ? t < this ? this : t : v();
            }),
                ja = S('moment().max is deprecated, use moment.min instead. https://momentjs.com/guides/#/warnings/min-max/', function () {
              var t = _e.apply(null, arguments);
              return this.isValid() && t.isValid() ? t > this ? this : t : v();
            }),
                Ua = function Ua() {
              return Date.now ? Date.now() : +new Date();
            },
                Ga = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
            Ae('Z', ':'), Ae('ZZ', ''), $('Z', na), $('ZZ', na), it(['Z', 'ZZ'], function (t, e, n) {
              n._useUTC = !0, n._tzm = Fe(na, t);
            });
            var qa = /([\+\-]|\d\d)/gi;
            t.updateOffset = function () {};
            var Za = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
                Xa = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
            Ge.fn = Pe.prototype, Ge.invalid = Ce;
            var Ja = Je(1, 'add'),
                Ka = Je(-1, 'subtract');
            t.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ', t.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
            var Qa = S('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (t) {
              return void 0 === t ? this.localeData() : this.locale(t);
            });
            Z(0, ['gg', 2], 0, function () {
              return this.weekYear() % 100;
            }), Z(0, ['GG', 2], 0, function () {
              return this.isoWeekYear() % 100;
            }), Fn('gggg', 'weekYear'), Fn('ggggg', 'weekYear'), Fn('GGGG', 'isoWeekYear'), Fn('GGGGG', 'isoWeekYear'), W('weekYear', 'gg'), W('isoWeekYear', 'GG'), N('weekYear', 1), N('isoWeekYear', 1), $('G', ta), $('g', ta), $('GG', qi, Hi), $('gg', qi, Hi), $('GGGG', Ki, Ui), $('gggg', Ki, Ui), $('GGGGG', Qi, Gi), $('ggggg', Qi, Gi), at(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (t, e, n, i) {
              e[i.substr(0, 2)] = k(t);
            }), at(['gg', 'GG'], function (e, n, i, a) {
              n[a] = t.parseTwoDigitYear(e);
            }), Z('Q', 0, 'Qo', 'quarter'), W('quarter', 'Q'), N('quarter', 7), $('Q', Ei), it('Q', function (t, e) {
              e[la] = 3 * (k(t) - 1);
            }), Z('D', ['DD', 2], 'Do', 'date'), W('date', 'D'), N('date', 9), $('D', qi), $('DD', qi, Hi), $('Do', function (t, e) {
              return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient;
            }), it(['D', 'DD'], ua), it('Do', function (t, e) {
              e[ua] = k(t.match(qi)[0], 10);
            });
            var $a = E('Date', !0);
            Z('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'), W('dayOfYear', 'DDD'), N('dayOfYear', 4), $('DDD', Ji), $('DDDD', ji), it(['DDD', 'DDDD'], function (t, e, n) {
              n._dayOfYear = k(t);
            }), Z('m', ['mm', 2], 0, 'minute'), W('minute', 'm'), N('minute', 14), $('m', qi), $('mm', qi, Hi), it(['m', 'mm'], ca);
            var tr = E('Minutes', !1);
            Z('s', ['ss', 2], 0, 'second'), W('second', 's'), N('second', 15), $('s', qi), $('ss', qi, Hi), it(['s', 'ss'], ha);
            var er = E('Seconds', !1);
            Z('S', 0, 0, function () {
              return ~~(this.millisecond() / 100);
            }), Z(0, ['SS', 2], 0, function () {
              return ~~(this.millisecond() / 10);
            }), Z(0, ['SSS', 3], 0, 'millisecond'), Z(0, ['SSSS', 4], 0, function () {
              return 10 * this.millisecond();
            }), Z(0, ['SSSSS', 5], 0, function () {
              return 100 * this.millisecond();
            }), Z(0, ['SSSSSS', 6], 0, function () {
              return 1000 * this.millisecond();
            }), Z(0, ['SSSSSSS', 7], 0, function () {
              return 10000 * this.millisecond();
            }), Z(0, ['SSSSSSSS', 8], 0, function () {
              return 100000 * this.millisecond();
            }), Z(0, ['SSSSSSSSS', 9], 0, function () {
              return 1000000 * this.millisecond();
            }), W('millisecond', 'ms'), N('millisecond', 16), $('S', Ji, Ei), $('SS', Ji, Hi), $('SSS', Ji, ji);
            var nr;
            for (nr = 'SSSS'; nr.length <= 9; nr += 'S') {
              $(nr, $i);
            }for (nr = 'S'; nr.length <= 9; nr += 'S') {
              it(nr, Bn);
            }var ir = E('Milliseconds', !1);
            Z('z', 0, 0, 'zoneAbbr'), Z('zz', 0, 0, 'zoneName');
            var ar = b.prototype;
            ar.add = Ja, ar.calendar = $e, ar.clone = tn, ar.diff = ln, ar.endOf = _n, ar.format = fn, ar.from = gn, ar.fromNow = pn, ar.to = mn, ar.toNow = vn, ar.get = U, ar.invalidAt = In, ar.isAfter = en, ar.isBefore = nn, ar.isBetween = an, ar.isSame = rn, ar.isSameOrAfter = on, ar.isSameOrBefore = sn, ar.isValid = Pn, ar.lang = Qa, ar.locale = yn, ar.localeData = bn, ar.max = ja, ar.min = Ha, ar.parsingFlags = Tn, ar.set = G, ar.startOf = xn, ar.subtract = Ka, ar.toArray = Sn, ar.toObject = Dn, ar.toDate = Mn, ar.toISOString = cn, ar.inspect = hn, ar.toJSON = Cn, ar.toString = dn, ar.unix = wn, ar.valueOf = kn, ar.creationData = An, ar.year = ka, ar.isLeapYear = bt, ar.weekYear = On, ar.isoWeekYear = Rn, ar.quarter = ar.quarters = zn, ar.month = ht, ar.daysInMonth = ft, ar.week = ar.weeks = Tt, ar.isoWeek = ar.isoWeeks = It, ar.weeksInYear = Vn, ar.isoWeeksInYear = Ln, ar.date = $a, ar.day = ar.days = Yt, ar.weekday = zt, ar.isoWeekday = Nt, ar.dayOfYear = Nn, ar.hour = ar.hours = Fa, ar.minute = ar.minutes = tr, ar.second = ar.seconds = er, ar.millisecond = ar.milliseconds = ir, ar.utcOffset = Le, ar.utc = We, ar.local = Ye, ar.parseZone = ze, ar.hasAlignedHourOffset = Ne, ar.isDST = Be, ar.isLocal = He, ar.isUtcOffset = je, ar.isUtc = Ue, ar.isUTC = Ue, ar.zoneAbbr = En, ar.zoneName = Hn, ar.dates = S('dates accessor is deprecated. Use date instead.', $a), ar.months = S('months accessor is deprecated. Use month instead', ht), ar.years = S('years accessor is deprecated. Use year instead', ka), ar.zone = S('moment().zone is deprecated, use moment().utcOffset instead. https://momentjs.com/guides/#/warnings/zone/', Ve), ar.isDSTShifted = S('isDSTShifted is deprecated. See https://momentjs.com/guides/#/warnings/dst-shifted/ for more information', Ee);
            var rr = I.prototype;
            rr.calendar = A, rr.longDateFormat = F, rr.invalidDate = O, rr.ordinal = R, rr.preparse = Gn, rr.postformat = Gn, rr.relativeTime = L, rr.pastFuture = V, rr.set = P, rr.months = st, rr.monthsShort = lt, rr.monthsParse = dt, rr.monthsRegex = pt, rr.monthsShortRegex = gt, rr.week = Dt, rr.firstDayOfYear = Pt, rr.firstDayOfWeek = Ct, rr.weekdays = Ot, rr.weekdaysMin = Lt, rr.weekdaysShort = Rt, rr.weekdaysParse = Wt, rr.weekdaysRegex = Bt, rr.weekdaysShortRegex = Et, rr.weekdaysMinRegex = Ht, rr.isPM = Xt, rr.meridiem = Jt, te('en', {
              dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
              ordinal: function ordinal(t) {
                var e = t % 10,
                    n = 1 === k(t % 100 / 10) ? 'th' : 1 === e ? 'st' : 2 === e ? 'nd' : 3 === e ? 'rd' : 'th';
                return t + n;
              }
            }), t.lang = S('moment.lang is deprecated. Use moment.locale instead.', te), t.langData = S('moment.langData is deprecated. Use moment.localeData instead.', ie);
            var or = Math.abs,
                sr = ci('ms'),
                lr = ci('s'),
                ur = ci('m'),
                dr = ci('h'),
                cr = ci('d'),
                hr = ci('w'),
                fr = ci('M'),
                gr = ci('y'),
                pr = fi('milliseconds'),
                mr = fi('seconds'),
                vr = fi('minutes'),
                yr = fi('hours'),
                br = fi('days'),
                xr = fi('months'),
                _r = fi('years'),
                kr = Math.round,
                wr = {
              ss: 44,
              s: 45,
              m: 45,
              h: 22,
              d: 26,
              M: 11
            },
                Mr = Math.abs,
                Sr = Pe.prototype;
            return Sr.isValid = De, Sr.abs = ei, Sr.add = ii, Sr.subtract = ai, Sr.as = ui, Sr.asMilliseconds = sr, Sr.asSeconds = lr, Sr.asMinutes = ur, Sr.asHours = dr, Sr.asDays = cr, Sr.asWeeks = hr, Sr.asMonths = fr, Sr.asYears = gr, Sr.valueOf = di, Sr._bubble = oi, Sr.get = hi, Sr.milliseconds = pr, Sr.seconds = mr, Sr.minutes = vr, Sr.hours = yr, Sr.days = br, Sr.weeks = gi, Sr.months = xr, Sr.years = _r, Sr.humanize = bi, Sr.toISOString = xi, Sr.toString = xi, Sr.toJSON = xi, Sr.locale = yn, Sr.localeData = bn, Sr.toIsoString = S('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', xi), Sr.lang = Qa, Z('X', 0, 0, 'unix'), Z('x', 0, 0, 'valueOf'), $('x', ta), $('X', ia), it('X', function (t, e, n) {
              n._d = new Date(1000 * parseFloat(t, 10));
            }), it('x', function (t, e, n) {
              n._d = new Date(k(t));
            }), t.version = '2.18.1', i(_e), t.fn = ar, t.min = we, t.max = Me, t.now = Ua, t.utc = f, t.unix = jn, t.months = Jn, t.isDate = u, t.locale = te, t.invalid = v, t.duration = Ge, t.isMoment = x, t.weekdays = Qn, t.parseZone = Un, t.localeData = ie, t.isDuration = Te, t.monthsShort = Kn, t.weekdaysMin = ti, t.defineLocale = ee, t.updateLocale = ne, t.locales = ae, t.weekdaysShort = $n, t.normalizeUnits = Y, t.relativeTimeRounding = vi, t.relativeTimeThreshold = yi, t.calendarFormat = Qe, t.prototype = ar, t;
          });
        }, {}],
        7: [function (t, e, n) {
          var i = t(28)();
          t(26)(i), t(40)(i), t(22)(i), t(25)(i), t(30)(i), t(21)(i), t(23)(i), t(24)(i), t(29)(i), t(32)(i), t(33)(i), t(31)(i), t(27)(i), t(34)(i), t(35)(i), t(36)(i), t(37)(i), t(38)(i), t(46)(i), t(44)(i), t(45)(i), t(47)(i), t(48)(i), t(49)(i), t(15)(i), t(16)(i), t(17)(i), t(18)(i), t(19)(i), t(20)(i), t(8)(i), t(9)(i), t(10)(i), t(11)(i), t(12)(i), t(13)(i), t(14)(i);
          var a = [];
          a.push(t(41)(i), t(42)(i), t(43)(i)), i.plugins.register(a), e.exports = i, 'undefined' != typeof window && (window.Chart = i);
        }, {
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20,
          21: 21,
          22: 22,
          23: 23,
          24: 24,
          25: 25,
          26: 26,
          27: 27,
          28: 28,
          29: 29,
          30: 30,
          31: 31,
          32: 32,
          33: 33,
          34: 34,
          35: 35,
          36: 36,
          37: 37,
          38: 38,
          40: 40,
          41: 41,
          42: 42,
          43: 43,
          44: 44,
          45: 45,
          46: 46,
          47: 47,
          48: 48,
          49: 49,
          8: 8,
          9: 9
        }],
        8: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            t.Bar = function (e, n) {
              return n.type = 'bar', new t(e, n);
            };
          };
        }, {}],
        9: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            t.Bubble = function (e, n) {
              return n.type = 'bubble', new t(e, n);
            };
          };
        }, {}],
        10: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            t.Doughnut = function (e, n) {
              return n.type = 'doughnut', new t(e, n);
            };
          };
        }, {}],
        11: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            t.Line = function (e, n) {
              return n.type = 'line', new t(e, n);
            };
          };
        }, {}],
        12: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            t.PolarArea = function (e, n) {
              return n.type = 'polarArea', new t(e, n);
            };
          };
        }, {}],
        13: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            t.Radar = function (e, n) {
              return n.type = 'radar', new t(e, n);
            };
          };
        }, {}],
        14: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = {
              hover: { mode: 'single' },
              scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  id: 'x-axis-1'
                }],
                yAxes: [{
                  type: 'linear',
                  position: 'left',
                  id: 'y-axis-1'
                }]
              },
              tooltips: {
                callbacks: {
                  title: function title() {
                    return '';
                  },
                  label: function label(t) {
                    return '(' + t.xLabel + ', ' + t.yLabel + ')';
                  }
                }
              }
            };
            t.defaults.scatter = e, t.controllers.scatter = t.controllers.line, t.Scatter = function (e, n) {
              return n.type = 'scatter', new t(e, n);
            };
          };
        }, {}],
        15: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.defaults.bar = {
              hover: { mode: 'label' },
              scales: {
                xAxes: [{
                  type: 'category',
                  categoryPercentage: 0.8,
                  barPercentage: 0.9,
                  gridLines: { offsetGridLines: !0 }
                }],
                yAxes: [{ type: 'linear' }]
              }
            }, t.controllers.bar = t.DatasetController.extend({
              dataElementType: t.elements.Rectangle,
              initialize: function initialize() {
                var e,
                    n = this;
                t.DatasetController.prototype.initialize.apply(n, arguments), e = n.getMeta(), e.stack = n.getDataset().stack, e.bar = !0;
              },
              update: function update(t) {
                var e,
                    n,
                    i = this,
                    a = i.getMeta().data;
                for (i._ruler = i.getRuler(), e = 0, n = a.length; e < n; ++e) {
                  i.updateElement(a[e], e, t);
                }
              },
              updateElement: function updateElement(t, n, i) {
                var a = this,
                    r = a.chart,
                    o = a.getMeta(),
                    s = a.getDataset(),
                    l = t.custom || {},
                    u = r.options.elements.rectangle;
                t._xScale = a.getScaleForId(o.xAxisID), t._yScale = a.getScaleForId(o.yAxisID), t._datasetIndex = a.index, t._index = n, t._model = {
                  datasetLabel: s.label,
                  label: r.data.labels[n],
                  borderSkipped: l.borderSkipped ? l.borderSkipped : u.borderSkipped,
                  backgroundColor: l.backgroundColor ? l.backgroundColor : e.getValueAtIndexOrDefault(s.backgroundColor, n, u.backgroundColor),
                  borderColor: l.borderColor ? l.borderColor : e.getValueAtIndexOrDefault(s.borderColor, n, u.borderColor),
                  borderWidth: l.borderWidth ? l.borderWidth : e.getValueAtIndexOrDefault(s.borderWidth, n, u.borderWidth)
                }, a.updateElementGeometry(t, n, i), t.pivot();
              },
              updateElementGeometry: function updateElementGeometry(t, e, n) {
                var i = this,
                    a = t._model,
                    r = i.getValueScale(),
                    o = r.getBasePixel(),
                    s = r.isHorizontal(),
                    l = i._ruler || i.getRuler(),
                    u = i.calculateBarValuePixels(i.index, e),
                    d = i.calculateBarIndexPixels(i.index, e, l);
                a.horizontal = s, a.base = n ? o : u.base, a.x = s ? n ? o : u.head : d.center, a.y = s ? d.center : n ? o : u.head, a.height = s ? d.size : void 0, a.width = s ? void 0 : d.size;
              },
              getValueScaleId: function getValueScaleId() {
                return this.getMeta().yAxisID;
              },
              getIndexScaleId: function getIndexScaleId() {
                return this.getMeta().xAxisID;
              },
              getValueScale: function getValueScale() {
                return this.getScaleForId(this.getValueScaleId());
              },
              getIndexScale: function getIndexScale() {
                return this.getScaleForId(this.getIndexScaleId());
              },
              getStackCount: function getStackCount(t) {
                var e,
                    n,
                    i = this,
                    a = i.chart,
                    r = i.getIndexScale(),
                    o = r.options.stacked,
                    s = void 0 === t ? a.data.datasets.length : t + 1,
                    l = [];
                for (e = 0; e < s; ++e) {
                  n = a.getDatasetMeta(e), n.bar && a.isDatasetVisible(e) && (o === !1 || o === !0 && l.indexOf(n.stack) === -1 || void 0 === o && (void 0 === n.stack || l.indexOf(n.stack) === -1)) && l.push(n.stack);
                }return l.length;
              },
              getStackIndex: function getStackIndex(t) {
                return this.getStackCount(t) - 1;
              },
              getRuler: function getRuler() {
                var t = this,
                    n = t.getIndexScale(),
                    i = n.options,
                    a = t.getStackCount(),
                    r = n.isHorizontal() ? n.width : n.height,
                    o = r / n.ticks.length,
                    s = o * i.categoryPercentage,
                    l = s / a,
                    u = l * i.barPercentage;
                return u = Math.min(e.getValueOrDefault(i.barThickness, u), e.getValueOrDefault(i.maxBarThickness, 1 / 0)), {
                  stackCount: a,
                  tickSize: o,
                  categorySize: s,
                  categorySpacing: o - s,
                  fullBarSize: l,
                  barSize: u,
                  barSpacing: l - u,
                  scale: n
                };
              },
              calculateBarValuePixels: function calculateBarValuePixels(t, e) {
                var n,
                    i,
                    a,
                    r,
                    o,
                    s,
                    l = this,
                    u = l.chart,
                    d = l.getMeta(),
                    c = l.getValueScale(),
                    h = u.data.datasets,
                    f = Number(h[t].data[e]),
                    g = c.options.stacked,
                    p = d.stack,
                    m = 0;
                if (g || void 0 === g && void 0 !== p) for (n = 0; n < t; ++n) {
                  i = u.getDatasetMeta(n), i.bar && i.stack === p && i.controller.getValueScaleId() === c.id && u.isDatasetVisible(n) && (a = Number(h[n].data[e]), (f < 0 && a < 0 || f >= 0 && a > 0) && (m += a));
                }return r = c.getPixelForValue(m), o = c.getPixelForValue(m + f), s = (o - r) / 2, {
                  size: s,
                  base: r,
                  head: o,
                  center: o + s / 2
                };
              },
              calculateBarIndexPixels: function calculateBarIndexPixels(t, e, n) {
                var i = this,
                    a = n.scale,
                    r = i.chart.isCombo,
                    o = i.getStackIndex(t),
                    s = a.getPixelForValue(null, e, t, r),
                    l = n.barSize;
                return s -= r ? n.tickSize / 2 : 0, s += n.fullBarSize * o, s += n.categorySpacing / 2, s += n.barSpacing / 2, {
                  size: l,
                  base: s,
                  head: s + l,
                  center: s + l / 2
                };
              },
              draw: function draw() {
                var t,
                    n = this,
                    i = n.chart,
                    a = n.getMeta().data,
                    r = n.getDataset(),
                    o = a.length,
                    s = 0;
                for (e.canvas.clipArea(i.ctx, i.chartArea); s < o; ++s) {
                  t = r.data[s], null === t || void 0 === t || isNaN(t) || a[s].draw();
                }e.canvas.unclipArea(i.ctx);
              },
              setHoverStyle: function setHoverStyle(t) {
                var n = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    a = t.custom || {},
                    r = t._model;
                r.backgroundColor = a.hoverBackgroundColor ? a.hoverBackgroundColor : e.getValueAtIndexOrDefault(n.hoverBackgroundColor, i, e.getHoverColor(r.backgroundColor)), r.borderColor = a.hoverBorderColor ? a.hoverBorderColor : e.getValueAtIndexOrDefault(n.hoverBorderColor, i, e.getHoverColor(r.borderColor)), r.borderWidth = a.hoverBorderWidth ? a.hoverBorderWidth : e.getValueAtIndexOrDefault(n.hoverBorderWidth, i, r.borderWidth);
              },
              removeHoverStyle: function removeHoverStyle(t) {
                var n = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    a = t.custom || {},
                    r = t._model,
                    o = this.chart.options.elements.rectangle;
                r.backgroundColor = a.backgroundColor ? a.backgroundColor : e.getValueAtIndexOrDefault(n.backgroundColor, i, o.backgroundColor), r.borderColor = a.borderColor ? a.borderColor : e.getValueAtIndexOrDefault(n.borderColor, i, o.borderColor), r.borderWidth = a.borderWidth ? a.borderWidth : e.getValueAtIndexOrDefault(n.borderWidth, i, o.borderWidth);
              }
            }), t.defaults.horizontalBar = {
              hover: { mode: 'label' },
              scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom'
                }],
                yAxes: [{
                  position: 'left',
                  type: 'category',
                  categoryPercentage: 0.8,
                  barPercentage: 0.9,
                  gridLines: { offsetGridLines: !0 }
                }]
              },
              elements: { rectangle: { borderSkipped: 'left' } },
              tooltips: {
                callbacks: {
                  title: function title(t, e) {
                    var n = '';
                    return t.length > 0 && (t[0].yLabel ? n = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (n = e.labels[t[0].index])), n;
                  },
                  label: function label(t, e) {
                    var n = e.datasets[t.datasetIndex].label || '';
                    return n + ': ' + t.xLabel;
                  }
                }
              }
            }, t.controllers.horizontalBar = t.controllers.bar.extend({
              getValueScaleId: function getValueScaleId() {
                return this.getMeta().xAxisID;
              },
              getIndexScaleId: function getIndexScaleId() {
                return this.getMeta().yAxisID;
              }
            });
          };
        }, {}],
        16: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.defaults.bubble = {
              hover: { mode: 'single' },
              scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  id: 'x-axis-0'
                }],
                yAxes: [{
                  type: 'linear',
                  position: 'left',
                  id: 'y-axis-0'
                }]
              },
              tooltips: {
                callbacks: {
                  title: function title() {
                    return '';
                  },
                  label: function label(t, e) {
                    var n = e.datasets[t.datasetIndex].label || '',
                        i = e.datasets[t.datasetIndex].data[t.index];
                    return n + ': (' + t.xLabel + ', ' + t.yLabel + ', ' + i.r + ')';
                  }
                }
              }
            }, t.controllers.bubble = t.DatasetController.extend({
              dataElementType: t.elements.Point,
              update: function update(t) {
                var n = this,
                    i = n.getMeta(),
                    a = i.data;
                e.each(a, function (e, i) {
                  n.updateElement(e, i, t);
                });
              },
              updateElement: function updateElement(n, i, a) {
                var r = this,
                    o = r.getMeta(),
                    s = r.getScaleForId(o.xAxisID),
                    l = r.getScaleForId(o.yAxisID),
                    u = n.custom || {},
                    d = r.getDataset(),
                    c = d.data[i],
                    h = r.chart.options.elements.point,
                    f = r.index;
                e.extend(n, {
                  _xScale: s,
                  _yScale: l,
                  _datasetIndex: f,
                  _index: i,
                  _model: {
                    x: a ? s.getPixelForDecimal(0.5) : s.getPixelForValue('object' == (typeof c === 'undefined' ? 'undefined' : _typeof(c)) ? c : NaN, i, f, r.chart.isCombo),
                    y: a ? l.getBasePixel() : l.getPixelForValue(c, i, f),
                    radius: a ? 0 : u.radius ? u.radius : r.getRadius(c),
                    hitRadius: u.hitRadius ? u.hitRadius : e.getValueAtIndexOrDefault(d.hitRadius, i, h.hitRadius)
                  }
                }), t.DatasetController.prototype.removeHoverStyle.call(r, n, h);
                var g = n._model;
                g.skip = u.skip ? u.skip : isNaN(g.x) || isNaN(g.y), n.pivot();
              },
              getRadius: function getRadius(t) {
                return t.r || this.chart.options.elements.point.radius;
              },
              setHoverStyle: function setHoverStyle(n) {
                var i = this;
                t.DatasetController.prototype.setHoverStyle.call(i, n);
                var a = i.chart.data.datasets[n._datasetIndex],
                    r = n._index,
                    o = n.custom || {},
                    s = n._model;
                s.radius = o.hoverRadius ? o.hoverRadius : e.getValueAtIndexOrDefault(a.hoverRadius, r, i.chart.options.elements.point.hoverRadius) + i.getRadius(a.data[r]);
              },
              removeHoverStyle: function removeHoverStyle(e) {
                var n = this;
                t.DatasetController.prototype.removeHoverStyle.call(n, e, n.chart.options.elements.point);
                var i = n.chart.data.datasets[e._datasetIndex].data[e._index],
                    a = e.custom || {},
                    r = e._model;
                r.radius = a.radius ? a.radius : n.getRadius(i);
              }
            });
          };
        }, {}],
        17: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = t.defaults;
            n.doughnut = {
              animation: {
                animateRotate: !0,
                animateScale: !1
              },
              aspectRatio: 1,
              hover: { mode: 'single' },
              legendCallback: function legendCallback(t) {
                var e = [];
                e.push('<ul class="' + t.id + '-legend">');
                var n = t.data,
                    i = n.datasets,
                    a = n.labels;
                if (i.length) for (var r = 0; r < i[0].data.length; ++r) {
                  e.push('<li><span style="background-color:' + i[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push('</li>');
                }return e.push('</ul>'), e.join('');
              },
              legend: {
                labels: {
                  generateLabels: function generateLabels(t) {
                    var n = t.data;
                    return n.labels.length && n.datasets.length ? n.labels.map(function (i, a) {
                      var r = t.getDatasetMeta(0),
                          o = n.datasets[0],
                          s = r.data[a],
                          l = s && s.custom || {},
                          u = e.getValueAtIndexOrDefault,
                          d = t.options.elements.arc,
                          c = l.backgroundColor ? l.backgroundColor : u(o.backgroundColor, a, d.backgroundColor),
                          h = l.borderColor ? l.borderColor : u(o.borderColor, a, d.borderColor),
                          f = l.borderWidth ? l.borderWidth : u(o.borderWidth, a, d.borderWidth);
                      return {
                        text: i,
                        fillStyle: c,
                        strokeStyle: h,
                        lineWidth: f,
                        hidden: isNaN(o.data[a]) || r.data[a].hidden,
                        index: a
                      };
                    }) : [];
                  }
                },
                onClick: function onClick(t, e) {
                  var n,
                      i,
                      a,
                      r = e.index,
                      o = this.chart;
                  for (n = 0, i = (o.data.datasets || []).length; n < i; ++n) {
                    a = o.getDatasetMeta(n), a.data[r] && (a.data[r].hidden = !a.data[r].hidden);
                  }o.update();
                }
              },
              cutoutPercentage: 50,
              rotation: Math.PI * -0.5,
              circumference: 2 * Math.PI,
              tooltips: {
                callbacks: {
                  title: function title() {
                    return '';
                  },
                  label: function label(t, n) {
                    var i = n.labels[t.index],
                        a = ': ' + n.datasets[t.datasetIndex].data[t.index];
                    return e.isArray(i) ? (i = i.slice(), i[0] += a) : i += a, i;
                  }
                }
              }
            }, n.pie = e.clone(n.doughnut), e.extend(n.pie, { cutoutPercentage: 0 }), t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
              dataElementType: t.elements.Arc,
              linkScales: e.noop,
              getRingIndex: function getRingIndex(t) {
                for (var e = 0, n = 0; n < t; ++n) {
                  this.chart.isDatasetVisible(n) && ++e;
                }return e;
              },
              update: function update(t) {
                var n = this,
                    i = n.chart,
                    a = i.chartArea,
                    r = i.options,
                    o = r.elements.arc,
                    s = a.right - a.left - o.borderWidth,
                    l = a.bottom - a.top - o.borderWidth,
                    u = Math.min(s, l),
                    d = {
                  x: 0,
                  y: 0
                },
                    c = n.getMeta(),
                    h = r.cutoutPercentage,
                    f = r.circumference;
                if (f < 2 * Math.PI) {
                  var g = r.rotation % (2 * Math.PI);
                  g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0);
                  var p = g + f,
                      m = {
                    x: Math.cos(g),
                    y: Math.sin(g)
                  },
                      v = {
                    x: Math.cos(p),
                    y: Math.sin(p)
                  },
                      y = g <= 0 && 0 <= p || g <= 2 * Math.PI && 2 * Math.PI <= p,
                      b = g <= 0.5 * Math.PI && 0.5 * Math.PI <= p || g <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
                      x = g <= -Math.PI && -Math.PI <= p || g <= Math.PI && Math.PI <= p,
                      _ = g <= 0.5 * -Math.PI && 0.5 * -Math.PI <= p || g <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
                      k = h / 100,
                      w = {
                    x: x ? -1 : Math.min(m.x * (m.x < 0 ? 1 : k), v.x * (v.x < 0 ? 1 : k)),
                    y: _ ? -1 : Math.min(m.y * (m.y < 0 ? 1 : k), v.y * (v.y < 0 ? 1 : k))
                  },
                      M = {
                    x: y ? 1 : Math.max(m.x * (m.x > 0 ? 1 : k), v.x * (v.x > 0 ? 1 : k)),
                    y: b ? 1 : Math.max(m.y * (m.y > 0 ? 1 : k), v.y * (v.y > 0 ? 1 : k))
                  },
                      S = {
                    width: 0.5 * (M.x - w.x),
                    height: 0.5 * (M.y - w.y)
                  };
                  u = Math.min(s / S.width, l / S.height), d = {
                    x: (M.x + w.x) * -0.5,
                    y: (M.y + w.y) * -0.5
                  };
                }
                i.borderWidth = n.getMaxBorderWidth(c.data), i.outerRadius = Math.max((u - i.borderWidth) / 2, 0), i.innerRadius = Math.max(h ? i.outerRadius / 100 * h : 0, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), i.offsetX = d.x * i.outerRadius, i.offsetY = d.y * i.outerRadius, c.total = n.calculateTotal(), n.outerRadius = i.outerRadius - i.radiusLength * n.getRingIndex(n.index), n.innerRadius = Math.max(n.outerRadius - i.radiusLength, 0), e.each(c.data, function (e, i) {
                  n.updateElement(e, i, t);
                });
              },
              updateElement: function updateElement(t, n, i) {
                var a = this,
                    r = a.chart,
                    o = r.chartArea,
                    s = r.options,
                    l = s.animation,
                    u = (o.left + o.right) / 2,
                    d = (o.top + o.bottom) / 2,
                    c = s.rotation,
                    h = s.rotation,
                    f = a.getDataset(),
                    g = i && l.animateRotate ? 0 : t.hidden ? 0 : a.calculateCircumference(f.data[n]) * (s.circumference / (2 * Math.PI)),
                    p = i && l.animateScale ? 0 : a.innerRadius,
                    m = i && l.animateScale ? 0 : a.outerRadius,
                    v = e.getValueAtIndexOrDefault;
                e.extend(t, {
                  _datasetIndex: a.index,
                  _index: n,
                  _model: {
                    x: u + r.offsetX,
                    y: d + r.offsetY,
                    startAngle: c,
                    endAngle: h,
                    circumference: g,
                    outerRadius: m,
                    innerRadius: p,
                    label: v(f.label, n, r.data.labels[n])
                  }
                });
                var y = t._model;
                this.removeHoverStyle(t), i && l.animateRotate || (0 === n ? y.startAngle = s.rotation : y.startAngle = a.getMeta().data[n - 1]._model.endAngle, y.endAngle = y.startAngle + y.circumference), t.pivot();
              },
              removeHoverStyle: function removeHoverStyle(e) {
                t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc);
              },
              calculateTotal: function calculateTotal() {
                var t,
                    n = this.getDataset(),
                    i = this.getMeta(),
                    a = 0;
                return e.each(i.data, function (e, i) {
                  t = n.data[i], isNaN(t) || e.hidden || (a += Math.abs(t));
                }), a;
              },
              calculateCircumference: function calculateCircumference(t) {
                var e = this.getMeta().total;
                return e > 0 && !isNaN(t) ? 2 * Math.PI * (t / e) : 0;
              },
              getMaxBorderWidth: function getMaxBorderWidth(t) {
                for (var e, n, i = 0, a = this.index, r = t.length, o = 0; o < r; o++) {
                  e = t[o]._model ? t[o]._model.borderWidth : 0, n = t[o]._chart ? t[o]._chart.config.data.datasets[a].hoverBorderWidth : 0, i = e > i ? e : i, i = n > i ? n : i;
                }return i;
              }
            });
          };
        }, {}],
        18: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              return n.getValueOrDefault(t.showLine, e.showLines);
            }
            var n = t.helpers;
            t.defaults.line = {
              showLines: !0,
              spanGaps: !1,
              hover: { mode: 'label' },
              scales: {
                xAxes: [{
                  type: 'category',
                  id: 'x-axis-0'
                }],
                yAxes: [{
                  type: 'linear',
                  id: 'y-axis-0'
                }]
              }
            }, t.controllers.line = t.DatasetController.extend({
              datasetElementType: t.elements.Line,
              dataElementType: t.elements.Point,
              update: function update(t) {
                var i,
                    a,
                    r,
                    o = this,
                    s = o.getMeta(),
                    l = s.dataset,
                    u = s.data || [],
                    d = o.chart.options,
                    c = d.elements.line,
                    h = o.getScaleForId(s.yAxisID),
                    f = o.getDataset(),
                    g = e(f, d);
                for (g && (r = l.custom || {}, void 0 !== f.tension && void 0 === f.lineTension && (f.lineTension = f.tension), l._scale = h, l._datasetIndex = o.index, l._children = u, l._model = {
                  spanGaps: f.spanGaps ? f.spanGaps : d.spanGaps,
                  tension: r.tension ? r.tension : n.getValueOrDefault(f.lineTension, c.tension),
                  backgroundColor: r.backgroundColor ? r.backgroundColor : f.backgroundColor || c.backgroundColor,
                  borderWidth: r.borderWidth ? r.borderWidth : f.borderWidth || c.borderWidth,
                  borderColor: r.borderColor ? r.borderColor : f.borderColor || c.borderColor,
                  borderCapStyle: r.borderCapStyle ? r.borderCapStyle : f.borderCapStyle || c.borderCapStyle,
                  borderDash: r.borderDash ? r.borderDash : f.borderDash || c.borderDash,
                  borderDashOffset: r.borderDashOffset ? r.borderDashOffset : f.borderDashOffset || c.borderDashOffset,
                  borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : f.borderJoinStyle || c.borderJoinStyle,
                  fill: r.fill ? r.fill : void 0 !== f.fill ? f.fill : c.fill,
                  steppedLine: r.steppedLine ? r.steppedLine : n.getValueOrDefault(f.steppedLine, c.stepped),
                  cubicInterpolationMode: r.cubicInterpolationMode ? r.cubicInterpolationMode : n.getValueOrDefault(f.cubicInterpolationMode, c.cubicInterpolationMode)
                }, l.pivot()), i = 0, a = u.length; i < a; ++i) {
                  o.updateElement(u[i], i, t);
                }for (g && 0 !== l._model.tension && o.updateBezierControlPoints(), i = 0, a = u.length; i < a; ++i) {
                  u[i].pivot();
                }
              },
              getPointBackgroundColor: function getPointBackgroundColor(t, e) {
                var i = this.chart.options.elements.point.backgroundColor,
                    a = this.getDataset(),
                    r = t.custom || {};
                return r.backgroundColor ? i = r.backgroundColor : a.pointBackgroundColor ? i = n.getValueAtIndexOrDefault(a.pointBackgroundColor, e, i) : a.backgroundColor && (i = a.backgroundColor), i;
              },
              getPointBorderColor: function getPointBorderColor(t, e) {
                var i = this.chart.options.elements.point.borderColor,
                    a = this.getDataset(),
                    r = t.custom || {};
                return r.borderColor ? i = r.borderColor : a.pointBorderColor ? i = n.getValueAtIndexOrDefault(a.pointBorderColor, e, i) : a.borderColor && (i = a.borderColor), i;
              },
              getPointBorderWidth: function getPointBorderWidth(t, e) {
                var i = this.chart.options.elements.point.borderWidth,
                    a = this.getDataset(),
                    r = t.custom || {};
                return isNaN(r.borderWidth) ? isNaN(a.pointBorderWidth) ? isNaN(a.borderWidth) || (i = a.borderWidth) : i = n.getValueAtIndexOrDefault(a.pointBorderWidth, e, i) : i = r.borderWidth, i;
              },
              updateElement: function updateElement(t, e, i) {
                var a,
                    r,
                    o = this,
                    s = o.getMeta(),
                    l = t.custom || {},
                    u = o.getDataset(),
                    d = o.index,
                    c = u.data[e],
                    h = o.getScaleForId(s.yAxisID),
                    f = o.getScaleForId(s.xAxisID),
                    g = o.chart.options.elements.point,
                    p = o.chart.data.labels || [],
                    m = 1 === p.length || 1 === u.data.length || o.chart.isCombo;
                void 0 !== u.radius && void 0 === u.pointRadius && (u.pointRadius = u.radius), void 0 !== u.hitRadius && void 0 === u.pointHitRadius && (u.pointHitRadius = u.hitRadius), a = f.getPixelForValue('object' == (typeof c === 'undefined' ? 'undefined' : _typeof(c)) ? c : NaN, e, d, m), r = i ? h.getBasePixel() : o.calculatePointY(c, e, d), t._xScale = f, t._yScale = h, t._datasetIndex = d, t._index = e, t._model = {
                  x: a,
                  y: r,
                  skip: l.skip || isNaN(a) || isNaN(r),
                  radius: l.radius || n.getValueAtIndexOrDefault(u.pointRadius, e, g.radius),
                  pointStyle: l.pointStyle || n.getValueAtIndexOrDefault(u.pointStyle, e, g.pointStyle),
                  backgroundColor: o.getPointBackgroundColor(t, e),
                  borderColor: o.getPointBorderColor(t, e),
                  borderWidth: o.getPointBorderWidth(t, e),
                  tension: s.dataset._model ? s.dataset._model.tension : 0,
                  steppedLine: !!s.dataset._model && s.dataset._model.steppedLine,
                  hitRadius: l.hitRadius || n.getValueAtIndexOrDefault(u.pointHitRadius, e, g.hitRadius)
                };
              },
              calculatePointY: function calculatePointY(t, e, n) {
                var i,
                    a,
                    r,
                    o = this,
                    s = o.chart,
                    l = o.getMeta(),
                    u = o.getScaleForId(l.yAxisID),
                    d = 0,
                    c = 0;
                if (u.options.stacked) {
                  for (i = 0; i < n; i++) {
                    if (a = s.data.datasets[i], r = s.getDatasetMeta(i), 'line' === r.type && r.yAxisID === u.id && s.isDatasetVisible(i)) {
                      var h = Number(u.getRightValue(a.data[e]));
                      h < 0 ? c += h || 0 : d += h || 0;
                    }
                  }var f = Number(u.getRightValue(t));
                  return f < 0 ? u.getPixelForValue(c + f) : u.getPixelForValue(d + f);
                }
                return u.getPixelForValue(t);
              },
              updateBezierControlPoints: function updateBezierControlPoints() {
                function t(t, e, n) {
                  return Math.max(Math.min(t, n), e);
                }
                var e,
                    i,
                    a,
                    r,
                    o,
                    s = this,
                    l = s.getMeta(),
                    u = s.chart.chartArea,
                    d = l.data || [];
                if (l.dataset._model.spanGaps && (d = d.filter(function (t) {
                  return !t._model.skip;
                })), 'monotone' === l.dataset._model.cubicInterpolationMode) n.splineCurveMonotone(d);else for (e = 0, i = d.length; e < i; ++e) {
                  a = d[e], r = a._model, o = n.splineCurve(n.previousItem(d, e)._model, r, n.nextItem(d, e)._model, l.dataset._model.tension), r.controlPointPreviousX = o.previous.x, r.controlPointPreviousY = o.previous.y, r.controlPointNextX = o.next.x, r.controlPointNextY = o.next.y;
                }if (s.chart.options.elements.line.capBezierPoints) for (e = 0, i = d.length; e < i; ++e) {
                  r = d[e]._model, r.controlPointPreviousX = t(r.controlPointPreviousX, u.left, u.right), r.controlPointPreviousY = t(r.controlPointPreviousY, u.top, u.bottom), r.controlPointNextX = t(r.controlPointNextX, u.left, u.right), r.controlPointNextY = t(r.controlPointNextY, u.top, u.bottom);
                }
              },
              draw: function draw() {
                var n = this,
                    i = n.chart,
                    a = n.getMeta(),
                    r = a.data || [],
                    o = i.chartArea,
                    s = r.length,
                    l = 0;
                for (t.canvasHelpers.clipArea(i.ctx, o), e(n.getDataset(), i.options) && a.dataset.draw(), t.canvasHelpers.unclipArea(i.ctx); l < s; ++l) {
                  r[l].draw(o);
                }
              },
              setHoverStyle: function setHoverStyle(t) {
                var e = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    a = t.custom || {},
                    r = t._model;
                r.radius = a.hoverRadius || n.getValueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), r.backgroundColor = a.hoverBackgroundColor || n.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, i, n.getHoverColor(r.backgroundColor)), r.borderColor = a.hoverBorderColor || n.getValueAtIndexOrDefault(e.pointHoverBorderColor, i, n.getHoverColor(r.borderColor)), r.borderWidth = a.hoverBorderWidth || n.getValueAtIndexOrDefault(e.pointHoverBorderWidth, i, r.borderWidth);
              },
              removeHoverStyle: function removeHoverStyle(t) {
                var e = this,
                    i = e.chart.data.datasets[t._datasetIndex],
                    a = t._index,
                    r = t.custom || {},
                    o = t._model;
                void 0 !== i.radius && void 0 === i.pointRadius && (i.pointRadius = i.radius), o.radius = r.radius || n.getValueAtIndexOrDefault(i.pointRadius, a, e.chart.options.elements.point.radius), o.backgroundColor = e.getPointBackgroundColor(t, a), o.borderColor = e.getPointBorderColor(t, a), o.borderWidth = e.getPointBorderWidth(t, a);
              }
            });
          };
        }, {}],
        19: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.defaults.polarArea = {
              scale: {
                type: 'radialLinear',
                angleLines: { display: !1 },
                gridLines: { circular: !0 },
                pointLabels: { display: !1 },
                ticks: { beginAtZero: !0 }
              },
              animation: {
                animateRotate: !0,
                animateScale: !0
              },
              startAngle: -0.5 * Math.PI,
              aspectRatio: 1,
              legendCallback: function legendCallback(t) {
                var e = [];
                e.push('<ul class="' + t.id + '-legend">');
                var n = t.data,
                    i = n.datasets,
                    a = n.labels;
                if (i.length) for (var r = 0; r < i[0].data.length; ++r) {
                  e.push('<li><span style="background-color:' + i[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push('</li>');
                }return e.push('</ul>'), e.join('');
              },
              legend: {
                labels: {
                  generateLabels: function generateLabels(t) {
                    var n = t.data;
                    return n.labels.length && n.datasets.length ? n.labels.map(function (i, a) {
                      var r = t.getDatasetMeta(0),
                          o = n.datasets[0],
                          s = r.data[a],
                          l = s.custom || {},
                          u = e.getValueAtIndexOrDefault,
                          d = t.options.elements.arc,
                          c = l.backgroundColor ? l.backgroundColor : u(o.backgroundColor, a, d.backgroundColor),
                          h = l.borderColor ? l.borderColor : u(o.borderColor, a, d.borderColor),
                          f = l.borderWidth ? l.borderWidth : u(o.borderWidth, a, d.borderWidth);
                      return {
                        text: i,
                        fillStyle: c,
                        strokeStyle: h,
                        lineWidth: f,
                        hidden: isNaN(o.data[a]) || r.data[a].hidden,
                        index: a
                      };
                    }) : [];
                  }
                },
                onClick: function onClick(t, e) {
                  var n,
                      i,
                      a,
                      r = e.index,
                      o = this.chart;
                  for (n = 0, i = (o.data.datasets || []).length; n < i; ++n) {
                    a = o.getDatasetMeta(n), a.data[r].hidden = !a.data[r].hidden;
                  }o.update();
                }
              },
              tooltips: {
                callbacks: {
                  title: function title() {
                    return '';
                  },
                  label: function label(t, e) {
                    return e.labels[t.index] + ': ' + t.yLabel;
                  }
                }
              }
            }, t.controllers.polarArea = t.DatasetController.extend({
              dataElementType: t.elements.Arc,
              linkScales: e.noop,
              update: function update(t) {
                var n = this,
                    i = n.chart,
                    a = i.chartArea,
                    r = n.getMeta(),
                    o = i.options,
                    s = o.elements.arc,
                    l = Math.min(a.right - a.left, a.bottom - a.top);
                i.outerRadius = Math.max((l - s.borderWidth / 2) / 2, 0), i.innerRadius = Math.max(o.cutoutPercentage ? i.outerRadius / 100 * o.cutoutPercentage : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), n.outerRadius = i.outerRadius - i.radiusLength * n.index, n.innerRadius = n.outerRadius - i.radiusLength, r.count = n.countVisibleElements(), e.each(r.data, function (e, i) {
                  n.updateElement(e, i, t);
                });
              },
              updateElement: function updateElement(t, n, i) {
                for (var a = this, r = a.chart, o = a.getDataset(), s = r.options, l = s.animation, u = r.scale, d = e.getValueAtIndexOrDefault, c = r.data.labels, h = a.calculateCircumference(o.data[n]), f = u.xCenter, g = u.yCenter, p = 0, m = a.getMeta(), v = 0; v < n; ++v) {
                  isNaN(o.data[v]) || m.data[v].hidden || ++p;
                }var y = s.startAngle,
                    b = t.hidden ? 0 : u.getDistanceFromCenterForValue(o.data[n]),
                    x = y + h * p,
                    _ = x + (t.hidden ? 0 : h),
                    k = l.animateScale ? 0 : u.getDistanceFromCenterForValue(o.data[n]);
                e.extend(t, {
                  _datasetIndex: a.index,
                  _index: n,
                  _scale: u,
                  _model: {
                    x: f,
                    y: g,
                    innerRadius: 0,
                    outerRadius: i ? k : b,
                    startAngle: i && l.animateRotate ? y : x,
                    endAngle: i && l.animateRotate ? y : _,
                    label: d(c, n, c[n])
                  }
                }), a.removeHoverStyle(t), t.pivot();
              },
              removeHoverStyle: function removeHoverStyle(e) {
                t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc);
              },
              countVisibleElements: function countVisibleElements() {
                var t = this.getDataset(),
                    n = this.getMeta(),
                    i = 0;
                return e.each(n.data, function (e, n) {
                  isNaN(t.data[n]) || e.hidden || i++;
                }), i;
              },
              calculateCircumference: function calculateCircumference(t) {
                var e = this.getMeta().count;
                return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0;
              }
            });
          };
        }, {}],
        20: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.defaults.radar = {
              aspectRatio: 1,
              scale: { type: 'radialLinear' },
              elements: { line: { tension: 0 } }
            }, t.controllers.radar = t.DatasetController.extend({
              datasetElementType: t.elements.Line,
              dataElementType: t.elements.Point,
              linkScales: e.noop,
              update: function update(t) {
                var n = this,
                    i = n.getMeta(),
                    a = i.dataset,
                    r = i.data,
                    o = a.custom || {},
                    s = n.getDataset(),
                    l = n.chart.options.elements.line,
                    u = n.chart.scale;
                void 0 !== s.tension && void 0 === s.lineTension && (s.lineTension = s.tension), e.extend(i.dataset, {
                  _datasetIndex: n.index,
                  _scale: u,
                  _children: r,
                  _loop: !0,
                  _model: {
                    tension: o.tension ? o.tension : e.getValueOrDefault(s.lineTension, l.tension),
                    backgroundColor: o.backgroundColor ? o.backgroundColor : s.backgroundColor || l.backgroundColor,
                    borderWidth: o.borderWidth ? o.borderWidth : s.borderWidth || l.borderWidth,
                    borderColor: o.borderColor ? o.borderColor : s.borderColor || l.borderColor,
                    fill: o.fill ? o.fill : void 0 !== s.fill ? s.fill : l.fill,
                    borderCapStyle: o.borderCapStyle ? o.borderCapStyle : s.borderCapStyle || l.borderCapStyle,
                    borderDash: o.borderDash ? o.borderDash : s.borderDash || l.borderDash,
                    borderDashOffset: o.borderDashOffset ? o.borderDashOffset : s.borderDashOffset || l.borderDashOffset,
                    borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : s.borderJoinStyle || l.borderJoinStyle
                  }
                }), i.dataset.pivot(), e.each(r, function (e, i) {
                  n.updateElement(e, i, t);
                }, n), n.updateBezierControlPoints();
              },
              updateElement: function updateElement(t, n, i) {
                var a = this,
                    r = t.custom || {},
                    o = a.getDataset(),
                    s = a.chart.scale,
                    l = a.chart.options.elements.point,
                    u = s.getPointPositionForValue(n, o.data[n]);
                void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), void 0 !== o.hitRadius && void 0 === o.pointHitRadius && (o.pointHitRadius = o.hitRadius), e.extend(t, {
                  _datasetIndex: a.index,
                  _index: n,
                  _scale: s,
                  _model: {
                    x: i ? s.xCenter : u.x,
                    y: i ? s.yCenter : u.y,
                    tension: r.tension ? r.tension : e.getValueOrDefault(o.lineTension, a.chart.options.elements.line.tension),
                    radius: r.radius ? r.radius : e.getValueAtIndexOrDefault(o.pointRadius, n, l.radius),
                    backgroundColor: r.backgroundColor ? r.backgroundColor : e.getValueAtIndexOrDefault(o.pointBackgroundColor, n, l.backgroundColor),
                    borderColor: r.borderColor ? r.borderColor : e.getValueAtIndexOrDefault(o.pointBorderColor, n, l.borderColor),
                    borderWidth: r.borderWidth ? r.borderWidth : e.getValueAtIndexOrDefault(o.pointBorderWidth, n, l.borderWidth),
                    pointStyle: r.pointStyle ? r.pointStyle : e.getValueAtIndexOrDefault(o.pointStyle, n, l.pointStyle),
                    hitRadius: r.hitRadius ? r.hitRadius : e.getValueAtIndexOrDefault(o.pointHitRadius, n, l.hitRadius)
                  }
                }), t._model.skip = r.skip ? r.skip : isNaN(t._model.x) || isNaN(t._model.y);
              },
              updateBezierControlPoints: function updateBezierControlPoints() {
                var t = this.chart.chartArea,
                    n = this.getMeta();
                e.each(n.data, function (i, a) {
                  var r = i._model,
                      o = e.splineCurve(e.previousItem(n.data, a, !0)._model, r, e.nextItem(n.data, a, !0)._model, r.tension);
                  r.controlPointPreviousX = Math.max(Math.min(o.previous.x, t.right), t.left), r.controlPointPreviousY = Math.max(Math.min(o.previous.y, t.bottom), t.top), r.controlPointNextX = Math.max(Math.min(o.next.x, t.right), t.left), r.controlPointNextY = Math.max(Math.min(o.next.y, t.bottom), t.top), i.pivot();
                });
              },
              setHoverStyle: function setHoverStyle(t) {
                var n = this.chart.data.datasets[t._datasetIndex],
                    i = t.custom || {},
                    a = t._index,
                    r = t._model;
                r.radius = i.hoverRadius ? i.hoverRadius : e.getValueAtIndexOrDefault(n.pointHoverRadius, a, this.chart.options.elements.point.hoverRadius), r.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : e.getValueAtIndexOrDefault(n.pointHoverBackgroundColor, a, e.getHoverColor(r.backgroundColor)), r.borderColor = i.hoverBorderColor ? i.hoverBorderColor : e.getValueAtIndexOrDefault(n.pointHoverBorderColor, a, e.getHoverColor(r.borderColor)), r.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : e.getValueAtIndexOrDefault(n.pointHoverBorderWidth, a, r.borderWidth);
              },
              removeHoverStyle: function removeHoverStyle(t) {
                var n = this.chart.data.datasets[t._datasetIndex],
                    i = t.custom || {},
                    a = t._index,
                    r = t._model,
                    o = this.chart.options.elements.point;
                r.radius = i.radius ? i.radius : e.getValueAtIndexOrDefault(n.pointRadius, a, o.radius), r.backgroundColor = i.backgroundColor ? i.backgroundColor : e.getValueAtIndexOrDefault(n.pointBackgroundColor, a, o.backgroundColor), r.borderColor = i.borderColor ? i.borderColor : e.getValueAtIndexOrDefault(n.pointBorderColor, a, o.borderColor), r.borderWidth = i.borderWidth ? i.borderWidth : e.getValueAtIndexOrDefault(n.pointBorderWidth, a, o.borderWidth);
              }
            });
          };
        }, {}],
        21: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.defaults.global.animation = {
              duration: 1000,
              easing: 'easeOutQuart',
              onProgress: e.noop,
              onComplete: e.noop
            }, t.Animation = t.Element.extend({
              chart: null,
              currentStep: 0,
              numSteps: 60,
              easing: '',
              render: null,
              onAnimationProgress: null,
              onAnimationComplete: null
            }), t.animationService = {
              frameDuration: 17,
              animations: [],
              dropFrames: 0,
              request: null,
              addAnimation: function addAnimation(t, e, n, i) {
                var a,
                    r,
                    o = this.animations;
                for (e.chart = t, i || (t.animating = !0), a = 0, r = o.length; a < r; ++a) {
                  if (o[a].chart === t) return void (o[a] = e);
                }o.push(e), 1 === o.length && this.requestAnimationFrame();
              },
              cancelAnimation: function cancelAnimation(t) {
                var n = e.findIndex(this.animations, function (e) {
                  return e.chart === t;
                });
                n !== -1 && (this.animations.splice(n, 1), t.animating = !1);
              },
              requestAnimationFrame: function requestAnimationFrame() {
                var t = this;
                null === t.request && (t.request = e.requestAnimFrame.call(window, function () {
                  t.request = null, t.startDigest();
                }));
              },
              startDigest: function startDigest() {
                var t = this,
                    e = Date.now(),
                    n = 0;
                t.dropFrames > 1 && (n = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1), t.advance(1 + n);
                var i = Date.now();
                t.dropFrames += (i - e) / t.frameDuration, t.animations.length > 0 && t.requestAnimationFrame();
              },
              advance: function advance(t) {
                for (var n, i, a = this.animations, r = 0; r < a.length;) {
                  n = a[r], i = n.chart, n.currentStep = (n.currentStep || 0) + t, n.currentStep = Math.min(n.currentStep, n.numSteps), e.callback(n.render, [i, n], i), e.callback(n.onAnimationProgress, [n], i), n.currentStep >= n.numSteps ? (e.callback(n.onAnimationComplete, [n], i), i.animating = !1, a.splice(r, 1)) : ++r;
                }
              }
            }, Object.defineProperty(t.Animation.prototype, 'animationObject', {
              get: function get() {
                return this;
              }
            }), Object.defineProperty(t.Animation.prototype, 'chartInstance', {
              get: function get() {
                return this.chart;
              },
              set: function set(t) {
                this.chart = t;
              }
            });
          };
        }, {}],
        22: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.canvasHelpers = {};
            e.drawPoint = function (e, n, i, a, r) {
              var o, s, l, u, d, c;
              if ('object' == (typeof n === 'undefined' ? 'undefined' : _typeof(n)) && (o = n.toString(), '[object HTMLImageElement]' === o || '[object HTMLCanvasElement]' === o)) return void e.drawImage(n, a - n.width / 2, r - n.height / 2, n.width, n.height);
              if (!(isNaN(i) || i <= 0)) {
                switch (n) {
                  default:
                    e.beginPath(), e.arc(a, r, i, 0, 2 * Math.PI), e.closePath(), e.fill();
                    break;
                  case 'triangle':
                    e.beginPath(), s = 3 * i / Math.sqrt(3), d = s * Math.sqrt(3) / 2, e.moveTo(a - s / 2, r + d / 3), e.lineTo(a + s / 2, r + d / 3), e.lineTo(a, r - 2 * d / 3), e.closePath(), e.fill();
                    break;
                  case 'rect':
                    c = 1 / Math.SQRT2 * i, e.beginPath(), e.fillRect(a - c, r - c, 2 * c, 2 * c), e.strokeRect(a - c, r - c, 2 * c, 2 * c);
                    break;
                  case 'rectRounded':
                    var h = i / Math.SQRT2,
                        f = a - h,
                        g = r - h,
                        p = Math.SQRT2 * i;
                    t.helpers.drawRoundedRectangle(e, f, g, p, p, i / 2), e.fill();
                    break;
                  case 'rectRot':
                    c = 1 / Math.SQRT2 * i, e.beginPath(), e.moveTo(a - c, r), e.lineTo(a, r + c), e.lineTo(a + c, r), e.lineTo(a, r - c), e.closePath(), e.fill();
                    break;
                  case 'cross':
                    e.beginPath(), e.moveTo(a, r + i), e.lineTo(a, r - i), e.moveTo(a - i, r), e.lineTo(a + i, r), e.closePath();
                    break;
                  case 'crossRot':
                    e.beginPath(), l = Math.cos(Math.PI / 4) * i, u = Math.sin(Math.PI / 4) * i, e.moveTo(a - l, r - u), e.lineTo(a + l, r + u), e.moveTo(a - l, r + u), e.lineTo(a + l, r - u), e.closePath();
                    break;
                  case 'star':
                    e.beginPath(), e.moveTo(a, r + i), e.lineTo(a, r - i), e.moveTo(a - i, r), e.lineTo(a + i, r), l = Math.cos(Math.PI / 4) * i, u = Math.sin(Math.PI / 4) * i, e.moveTo(a - l, r - u), e.lineTo(a + l, r + u), e.moveTo(a - l, r + u), e.lineTo(a + l, r - u), e.closePath();
                    break;
                  case 'line':
                    e.beginPath(), e.moveTo(a - i, r), e.lineTo(a + i, r), e.closePath();
                    break;
                  case 'dash':
                    e.beginPath(), e.moveTo(a, r), e.lineTo(a + i, r), e.closePath();
                }
                e.stroke();
              }
            }, e.clipArea = function (t, e) {
              t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
            }, e.unclipArea = function (t) {
              t.restore();
            }, e.lineTo = function (t, e, n, i) {
              return n.steppedLine ? ('after' === n.steppedLine ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y), void t.lineTo(n.x, n.y)) : n.tension ? void t.bezierCurveTo(i ? e.controlPointPreviousX : e.controlPointNextX, i ? e.controlPointPreviousY : e.controlPointNextY, i ? n.controlPointNextX : n.controlPointPreviousX, i ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : void t.lineTo(n.x, n.y);
            }, t.helpers.canvas = e;
          };
        }, {}],
        23: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(e) {
              e = e || {};
              var n = e.data = e.data || {};
              return n.datasets = n.datasets || [], n.labels = n.labels || [], e.options = a.configMerge(t.defaults.global, t.defaults[e.type], e.options || {}), e;
            }
            function n(t) {
              var e = t.options;
              e.scale ? t.scale.options = e.scale : e.scales && e.scales.xAxes.concat(e.scales.yAxes).forEach(function (e) {
                t.scales[e.id].options = e;
              }), t.tooltip._options = e.tooltips;
            }
            function i(t) {
              return 'top' === t || 'bottom' === t;
            }
            var a = t.helpers,
                r = t.plugins,
                o = t.platform;
            t.types = {}, t.instances = {}, t.controllers = {}, a.extend(t.prototype, {
              construct: function construct(n, i) {
                var r = this;
                i = e(i);
                var s = o.acquireContext(n, i),
                    l = s && s.canvas,
                    u = l && l.height,
                    d = l && l.width;
                return r.id = a.uid(), r.ctx = s, r.canvas = l, r.config = i, r.width = d, r.height = u, r.aspectRatio = u ? d / u : null, r.options = i.options, r._bufferedRender = !1, r.chart = r, r.controller = r, t.instances[r.id] = r, Object.defineProperty(r, 'data', {
                  get: function get() {
                    return r.config.data;
                  },
                  set: function set(t) {
                    r.config.data = t;
                  }
                }), s && l ? (r.initialize(), void r.update()) : void console.error('Failed to create chart: can\'t acquire context from the given item');
              },
              initialize: function initialize() {
                var t = this;
                return r.notify(t, 'beforeInit'), a.retinaScale(t), t.bindEvents(), t.options.responsive && t.resize(!0), t.ensureScalesHaveIDs(), t.buildScales(), t.initToolTip(), r.notify(t, 'afterInit'), t;
              },
              clear: function clear() {
                return a.clear(this), this;
              },
              stop: function stop() {
                return t.animationService.cancelAnimation(this), this;
              },
              resize: function resize(t) {
                var e = this,
                    n = e.options,
                    i = e.canvas,
                    o = n.maintainAspectRatio && e.aspectRatio || null,
                    s = Math.floor(a.getMaximumWidth(i)),
                    l = Math.floor(o ? s / o : a.getMaximumHeight(i));
                if ((e.width !== s || e.height !== l) && (i.width = e.width = s, i.height = e.height = l, i.style.width = s + 'px', i.style.height = l + 'px', a.retinaScale(e), !t)) {
                  var u = {
                    width: s,
                    height: l
                  };
                  r.notify(e, 'resize', [u]), e.options.onResize && e.options.onResize(e, u), e.stop(), e.update(e.options.responsiveAnimationDuration);
                }
              },
              ensureScalesHaveIDs: function ensureScalesHaveIDs() {
                var t = this.options,
                    e = t.scales || {},
                    n = t.scale;
                a.each(e.xAxes, function (t, e) {
                  t.id = t.id || 'x-axis-' + e;
                }), a.each(e.yAxes, function (t, e) {
                  t.id = t.id || 'y-axis-' + e;
                }), n && (n.id = n.id || 'scale');
              },
              buildScales: function buildScales() {
                var e = this,
                    n = e.options,
                    r = e.scales = {},
                    o = [];
                n.scales && (o = o.concat((n.scales.xAxes || []).map(function (t) {
                  return {
                    options: t,
                    dtype: 'category',
                    dposition: 'bottom'
                  };
                }), (n.scales.yAxes || []).map(function (t) {
                  return {
                    options: t,
                    dtype: 'linear',
                    dposition: 'left'
                  };
                }))), n.scale && o.push({
                  options: n.scale,
                  dtype: 'radialLinear',
                  isDefault: !0,
                  dposition: 'chartArea'
                }), a.each(o, function (n) {
                  var o = n.options,
                      s = a.getValueOrDefault(o.type, n.dtype),
                      l = t.scaleService.getScaleConstructor(s);
                  if (l) {
                    i(o.position) !== i(n.dposition) && (o.position = n.dposition);
                    var u = new l({
                      id: o.id,
                      options: o,
                      ctx: e.ctx,
                      chart: e
                    });
                    r[u.id] = u, n.isDefault && (e.scale = u);
                  }
                }), t.scaleService.addScalesToLayout(this);
              },
              buildOrUpdateControllers: function buildOrUpdateControllers() {
                var e = this,
                    n = [],
                    i = [];
                if (a.each(e.data.datasets, function (a, r) {
                  var o = e.getDatasetMeta(r);
                  if (o.type || (o.type = a.type || e.config.type), n.push(o.type), o.controller) o.controller.updateIndex(r);else {
                    var s = t.controllers[o.type];
                    if (void 0 === s) throw new Error('"' + o.type + '" is not a chart type.');
                    o.controller = new s(e, r), i.push(o.controller);
                  }
                }, e), n.length > 1) for (var r = 1; r < n.length; r++) {
                  if (n[r] !== n[r - 1]) {
                    e.isCombo = !0;
                    break;
                  }
                }return i;
              },
              resetElements: function resetElements() {
                var t = this;
                a.each(t.data.datasets, function (e, n) {
                  t.getDatasetMeta(n).controller.reset();
                }, t);
              },
              reset: function reset() {
                this.resetElements(), this.tooltip.initialize();
              },
              update: function update(t, e) {
                var i = this;
                if (n(i), r.notify(i, 'beforeUpdate') !== !1) {
                  i.tooltip._data = i.data;
                  var o = i.buildOrUpdateControllers();
                  a.each(i.data.datasets, function (t, e) {
                    i.getDatasetMeta(e).controller.buildOrUpdateElements();
                  }, i), i.updateLayout(), a.each(o, function (t) {
                    t.reset();
                  }), i.updateDatasets(), r.notify(i, 'afterUpdate'), i._bufferedRender ? i._bufferedRequest = {
                    lazy: e,
                    duration: t
                  } : i.render(t, e);
                }
              },
              updateLayout: function updateLayout() {
                var e = this;
                r.notify(e, 'beforeLayout') !== !1 && (t.layoutService.update(this, this.width, this.height), r.notify(e, 'afterScaleUpdate'), r.notify(e, 'afterLayout'));
              },
              updateDatasets: function updateDatasets() {
                var t = this;
                if (r.notify(t, 'beforeDatasetsUpdate') !== !1) {
                  for (var e = 0, n = t.data.datasets.length; e < n; ++e) {
                    t.updateDataset(e);
                  }r.notify(t, 'afterDatasetsUpdate');
                }
              },
              updateDataset: function updateDataset(t) {
                var e = this,
                    n = e.getDatasetMeta(t),
                    i = {
                  meta: n,
                  index: t
                };
                r.notify(e, 'beforeDatasetUpdate', [i]) !== !1 && (n.controller.update(), r.notify(e, 'afterDatasetUpdate', [i]));
              },
              render: function render(e, n) {
                var i = this;
                if (r.notify(i, 'beforeRender') !== !1) {
                  var o = i.options.animation,
                      s = function s(t) {
                    r.notify(i, 'afterRender'), a.callback(o && o.onComplete, [t], i);
                  };
                  if (o && ('undefined' != typeof e && 0 !== e || 'undefined' == typeof e && 0 !== o.duration)) {
                    var l = new t.Animation({
                      numSteps: (e || o.duration) / 16.66,
                      easing: o.easing,
                      render: function render(t, e) {
                        var n = a.easingEffects[e.easing],
                            i = e.currentStep,
                            r = i / e.numSteps;
                        t.draw(n(r), r, i);
                      },
                      onAnimationProgress: o.onProgress,
                      onAnimationComplete: s
                    });
                    t.animationService.addAnimation(i, l, e, n);
                  } else i.draw(), s(new t.Animation({
                    numSteps: 0,
                    chart: i
                  }));
                  return i;
                }
              },
              draw: function draw(t) {
                var e = this;
                e.clear(), void 0 !== t && null !== t || (t = 1), e.transition(t), r.notify(e, 'beforeDraw', [t]) !== !1 && (a.each(e.boxes, function (t) {
                  t.draw(e.chartArea);
                }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e.tooltip.draw(), r.notify(e, 'afterDraw', [t]));
              },
              transition: function transition(t) {
                for (var e = this, n = 0, i = (e.data.datasets || []).length; n < i; ++n) {
                  e.isDatasetVisible(n) && e.getDatasetMeta(n).controller.transition(t);
                }e.tooltip.transition(t);
              },
              drawDatasets: function drawDatasets(t) {
                var e = this;
                if (r.notify(e, 'beforeDatasetsDraw', [t]) !== !1) {
                  for (var n = (e.data.datasets || []).length - 1; n >= 0; --n) {
                    e.isDatasetVisible(n) && e.drawDataset(n, t);
                  }r.notify(e, 'afterDatasetsDraw', [t]);
                }
              },
              drawDataset: function drawDataset(t, e) {
                var n = this,
                    i = n.getDatasetMeta(t),
                    a = {
                  meta: i,
                  index: t,
                  easingValue: e
                };
                r.notify(n, 'beforeDatasetDraw', [a]) !== !1 && (i.controller.draw(e), r.notify(n, 'afterDatasetDraw', [a]));
              },
              getElementAtEvent: function getElementAtEvent(e) {
                return t.Interaction.modes.single(this, e);
              },
              getElementsAtEvent: function getElementsAtEvent(e) {
                return t.Interaction.modes.label(this, e, { intersect: !0 });
              },
              getElementsAtXAxis: function getElementsAtXAxis(e) {
                return t.Interaction.modes['x-axis'](this, e, { intersect: !0 });
              },
              getElementsAtEventForMode: function getElementsAtEventForMode(e, n, i) {
                var a = t.Interaction.modes[n];
                return 'function' == typeof a ? a(this, e, i) : [];
              },
              getDatasetAtEvent: function getDatasetAtEvent(e) {
                return t.Interaction.modes.dataset(this, e, { intersect: !0 });
              },
              getDatasetMeta: function getDatasetMeta(t) {
                var e = this,
                    n = e.data.datasets[t];
                n._meta || (n._meta = {});
                var i = n._meta[e.id];
                return i || (i = n._meta[e.id] = {
                  type: null,
                  data: [],
                  dataset: null,
                  controller: null,
                  hidden: null,
                  xAxisID: null,
                  yAxisID: null
                }), i;
              },
              getVisibleDatasetCount: function getVisibleDatasetCount() {
                for (var t = 0, e = 0, n = this.data.datasets.length; e < n; ++e) {
                  this.isDatasetVisible(e) && t++;
                }return t;
              },
              isDatasetVisible: function isDatasetVisible(t) {
                var e = this.getDatasetMeta(t);
                return 'boolean' == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden;
              },
              generateLegend: function generateLegend() {
                return this.options.legendCallback(this);
              },
              destroy: function destroy() {
                var e,
                    n,
                    i,
                    s = this,
                    l = s.canvas;
                for (s.stop(), n = 0, i = s.data.datasets.length; n < i; ++n) {
                  e = s.getDatasetMeta(n), e.controller && (e.controller.destroy(), e.controller = null);
                }l && (s.unbindEvents(), a.clear(s), o.releaseContext(s.ctx), s.canvas = null, s.ctx = null), r.notify(s, 'destroy'), delete t.instances[s.id];
              },
              toBase64Image: function toBase64Image() {
                return this.canvas.toDataURL.apply(this.canvas, arguments);
              },
              initToolTip: function initToolTip() {
                var e = this;
                e.tooltip = new t.Tooltip({
                  _chart: e,
                  _chartInstance: e,
                  _data: e.data,
                  _options: e.options.tooltips
                }, e), e.tooltip.initialize();
              },
              bindEvents: function bindEvents() {
                var t = this,
                    e = t._listeners = {},
                    n = function n() {
                  t.eventHandler.apply(t, arguments);
                };
                a.each(t.options.events, function (i) {
                  o.addEventListener(t, i, n), e[i] = n;
                }), t.options.responsive && (n = function n() {
                  t.resize();
                }, o.addEventListener(t, 'resize', n), e.resize = n);
              },
              unbindEvents: function unbindEvents() {
                var t = this,
                    e = t._listeners;
                e && (delete t._listeners, a.each(e, function (e, n) {
                  o.removeEventListener(t, n, e);
                }));
              },
              updateHoverStyle: function updateHoverStyle(t, e, n) {
                var i,
                    a,
                    r,
                    o = n ? 'setHoverStyle' : 'removeHoverStyle';
                for (a = 0, r = t.length; a < r; ++a) {
                  i = t[a], i && this.getDatasetMeta(i._datasetIndex).controller[o](i);
                }
              },
              eventHandler: function eventHandler(t) {
                var e = this,
                    n = e.tooltip;
                if (r.notify(e, 'beforeEvent', [t]) !== !1) {
                  e._bufferedRender = !0, e._bufferedRequest = null;
                  var i = e.handleEvent(t);
                  i |= n && n.handleEvent(t), r.notify(e, 'afterEvent', [t]);
                  var a = e._bufferedRequest;
                  return a ? e.render(a.duration, a.lazy) : i && !e.animating && (e.stop(), e.render(e.options.hover.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e;
                }
              },
              handleEvent: function handleEvent(t) {
                var e = this,
                    n = e.options || {},
                    i = n.hover,
                    r = !1;
                return e.lastActive = e.lastActive || [], 'mouseout' === t.type ? e.active = [] : e.active = e.getElementsAtEventForMode(t, i.mode, i), i.onHover && i.onHover.call(e, t.native, e.active), 'mouseup' !== t.type && 'click' !== t.type || n.onClick && n.onClick.call(e, t.native, e.active), e.lastActive.length && e.updateHoverStyle(e.lastActive, i.mode, !1), e.active.length && i.mode && e.updateHoverStyle(e.active, i.mode, !0), r = !a.arrayEquals(e.active, e.lastActive), e.lastActive = e.active, r;
              }
            }), t.Controller = t;
          };
        }, {}],
        24: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              return t._chartjs ? void t._chartjs.listeners.push(e) : (Object.defineProperty(t, '_chartjs', {
                configurable: !0,
                enumerable: !1,
                value: { listeners: [e] }
              }), void a.forEach(function (e) {
                var n = 'onData' + e.charAt(0).toUpperCase() + e.slice(1),
                    a = t[e];
                Object.defineProperty(t, e, {
                  configurable: !0,
                  enumerable: !1,
                  value: function value() {
                    var e = Array.prototype.slice.call(arguments),
                        r = a.apply(this, e);
                    return i.each(t._chartjs.listeners, function (t) {
                      'function' == typeof t[n] && t[n].apply(t, e);
                    }), r;
                  }
                });
              }));
            }
            function n(t, e) {
              var n = t._chartjs;
              if (n) {
                var i = n.listeners,
                    r = i.indexOf(e);
                r !== -1 && i.splice(r, 1), i.length > 0 || (a.forEach(function (e) {
                  delete t[e];
                }), delete t._chartjs);
              }
            }
            var i = t.helpers,
                a = ['push', 'pop', 'shift', 'splice', 'unshift'];
            t.DatasetController = function (t, e) {
              this.initialize(t, e);
            }, i.extend(t.DatasetController.prototype, {
              datasetElementType: null,
              dataElementType: null,
              initialize: function initialize(t, e) {
                var n = this;
                n.chart = t, n.index = e, n.linkScales(), n.addElements();
              },
              updateIndex: function updateIndex(t) {
                this.index = t;
              },
              linkScales: function linkScales() {
                var t = this,
                    e = t.getMeta(),
                    n = t.getDataset();
                null === e.xAxisID && (e.xAxisID = n.xAxisID || t.chart.options.scales.xAxes[0].id), null === e.yAxisID && (e.yAxisID = n.yAxisID || t.chart.options.scales.yAxes[0].id);
              },
              getDataset: function getDataset() {
                return this.chart.data.datasets[this.index];
              },
              getMeta: function getMeta() {
                return this.chart.getDatasetMeta(this.index);
              },
              getScaleForId: function getScaleForId(t) {
                return this.chart.scales[t];
              },
              reset: function reset() {
                this.update(!0);
              },
              destroy: function destroy() {
                this._data && n(this._data, this);
              },
              createMetaDataset: function createMetaDataset() {
                var t = this,
                    e = t.datasetElementType;
                return e && new e({
                  _chart: t.chart,
                  _datasetIndex: t.index
                });
              },
              createMetaData: function createMetaData(t) {
                var e = this,
                    n = e.dataElementType;
                return n && new n({
                  _chart: e.chart,
                  _datasetIndex: e.index,
                  _index: t
                });
              },
              addElements: function addElements() {
                var t,
                    e,
                    n = this,
                    i = n.getMeta(),
                    a = n.getDataset().data || [],
                    r = i.data;
                for (t = 0, e = a.length; t < e; ++t) {
                  r[t] = r[t] || n.createMetaData(t);
                }i.dataset = i.dataset || n.createMetaDataset();
              },
              addElementAndReset: function addElementAndReset(t) {
                var e = this.createMetaData(t);
                this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0);
              },
              buildOrUpdateElements: function buildOrUpdateElements() {
                var t = this,
                    i = t.getDataset(),
                    a = i.data || (i.data = []);
                t._data !== a && (t._data && n(t._data, t), e(a, t), t._data = a), t.resyncElements();
              },
              update: i.noop,
              transition: function transition(t) {
                for (var e = this.getMeta(), n = e.data || [], i = n.length, a = 0; a < i; ++a) {
                  n[a].transition(t);
                }e.dataset && e.dataset.transition(t);
              },
              draw: function draw() {
                var t = this.getMeta(),
                    e = t.data || [],
                    n = e.length,
                    i = 0;
                for (t.dataset && t.dataset.draw(); i < n; ++i) {
                  e[i].draw();
                }
              },
              removeHoverStyle: function removeHoverStyle(t, e) {
                var n = this.chart.data.datasets[t._datasetIndex],
                    a = t._index,
                    r = t.custom || {},
                    o = i.getValueAtIndexOrDefault,
                    s = t._model;
                s.backgroundColor = r.backgroundColor ? r.backgroundColor : o(n.backgroundColor, a, e.backgroundColor), s.borderColor = r.borderColor ? r.borderColor : o(n.borderColor, a, e.borderColor), s.borderWidth = r.borderWidth ? r.borderWidth : o(n.borderWidth, a, e.borderWidth);
              },
              setHoverStyle: function setHoverStyle(t) {
                var e = this.chart.data.datasets[t._datasetIndex],
                    n = t._index,
                    a = t.custom || {},
                    r = i.getValueAtIndexOrDefault,
                    o = i.getHoverColor,
                    s = t._model;
                s.backgroundColor = a.hoverBackgroundColor ? a.hoverBackgroundColor : r(e.hoverBackgroundColor, n, o(s.backgroundColor)), s.borderColor = a.hoverBorderColor ? a.hoverBorderColor : r(e.hoverBorderColor, n, o(s.borderColor)), s.borderWidth = a.hoverBorderWidth ? a.hoverBorderWidth : r(e.hoverBorderWidth, n, s.borderWidth);
              },
              resyncElements: function resyncElements() {
                var t = this,
                    e = t.getMeta(),
                    n = t.getDataset().data,
                    i = e.data.length,
                    a = n.length;
                a < i ? e.data.splice(a, i - a) : a > i && t.insertElements(i, a - i);
              },
              insertElements: function insertElements(t, e) {
                for (var n = 0; n < e; ++n) {
                  this.addElementAndReset(t + n);
                }
              },
              onDataPush: function onDataPush() {
                this.insertElements(this.getDataset().data.length - 1, arguments.length);
              },
              onDataPop: function onDataPop() {
                this.getMeta().data.pop();
              },
              onDataShift: function onDataShift() {
                this.getMeta().data.shift();
              },
              onDataSplice: function onDataSplice(t, e) {
                this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2);
              },
              onDataUnshift: function onDataUnshift() {
                this.insertElements(0, arguments.length);
              }
            }), t.DatasetController.extend = i.inherits;
          };
        }, {}],
        25: [function (t, e, n) {
          'use strict';

          var i = t(2);
          e.exports = function (t) {
            function e(t, e, n, a) {
              var r,
                  o,
                  s,
                  l,
                  u,
                  d,
                  c,
                  h,
                  f,
                  g = Object.keys(n);
              for (r = 0, o = g.length; r < o; ++r) {
                if (s = g[r], d = n[s], e.hasOwnProperty(s) || (e[s] = d), l = e[s], l !== d && '_' !== s[0]) {
                  if (t.hasOwnProperty(s) || (t[s] = l), u = t[s], c = typeof d === 'undefined' ? 'undefined' : _typeof(d), c === (typeof u === 'undefined' ? 'undefined' : _typeof(u))) if ('string' === c) {
                    if (h = i(u), h.valid && (f = i(d), f.valid)) {
                      e[s] = f.mix(h, a).rgbString();
                      continue;
                    }
                  } else if ('number' === c && isFinite(u) && isFinite(d)) {
                    e[s] = u + (d - u) * a;
                    continue;
                  }
                  e[s] = d;
                }
              }
            }
            var n = t.helpers;
            t.elements = {}, t.Element = function (t) {
              n.extend(this, t), this.initialize.apply(this, arguments);
            }, n.extend(t.Element.prototype, {
              initialize: function initialize() {
                this.hidden = !1;
              },
              pivot: function pivot() {
                var t = this;
                return t._view || (t._view = n.clone(t._model)), t._start = {}, t;
              },
              transition: function transition(t) {
                var n = this,
                    i = n._model,
                    a = n._start,
                    r = n._view;
                return i && 1 !== t ? (r || (r = n._view = {}), a || (a = n._start = {}), e(a, r, i, t), n) : (n._view = i, n._start = null, n);
              },
              tooltipPosition: function tooltipPosition() {
                return {
                  x: this._model.x,
                  y: this._model.y
                };
              },
              hasValue: function hasValue() {
                return n.isNumber(this._model.x) && n.isNumber(this._model.y);
              }
            }), t.Element.extend = n.inherits;
          };
        }, { 2: 2 }],
        26: [function (t, e, n) {
          'use strict';

          var i = t(2);
          e.exports = function (t) {
            function e(t, e, n) {
              var i;
              return 'string' == typeof t ? (i = parseInt(t, 10), t.indexOf('%') !== -1 && (i = i / 100 * e.parentNode[n])) : i = t, i;
            }
            function n(t) {
              return void 0 !== t && null !== t && 'none' !== t;
            }
            function a(t, i, a) {
              var r = document.defaultView,
                  o = t.parentNode,
                  s = r.getComputedStyle(t)[i],
                  l = r.getComputedStyle(o)[i],
                  u = n(s),
                  d = n(l),
                  c = Number.POSITIVE_INFINITY;
              return u || d ? Math.min(u ? e(s, t, a) : c, d ? e(l, o, a) : c) : 'none';
            }
            var r = t.helpers = {};
            r.each = function (t, e, n, i) {
              var a, o;
              if (r.isArray(t)) {
                if (o = t.length, i) for (a = o - 1; a >= 0; a--) {
                  e.call(n, t[a], a);
                } else for (a = 0; a < o; a++) {
                  e.call(n, t[a], a);
                }
              } else if ('object' == (typeof t === 'undefined' ? 'undefined' : _typeof(t))) {
                var s = Object.keys(t);
                for (o = s.length, a = 0; a < o; a++) {
                  e.call(n, t[s[a]], s[a]);
                }
              }
            }, r.clone = function (t) {
              var e = {};
              return r.each(t, function (t, n) {
                r.isArray(t) ? e[n] = t.slice(0) : 'object' == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && null !== t ? e[n] = r.clone(t) : e[n] = t;
              }), e;
            }, r.extend = function (t) {
              for (var e = function e(_e2, n) {
                t[n] = _e2;
              }, n = 1, i = arguments.length; n < i; n++) {
                r.each(arguments[n], e);
              }return t;
            }, r.configMerge = function (e) {
              var n = r.clone(e);
              return r.each(Array.prototype.slice.call(arguments, 1), function (e) {
                r.each(e, function (e, i) {
                  var a = n.hasOwnProperty(i),
                      o = a ? n[i] : {};
                  'scales' === i ? n[i] = r.scaleMerge(o, e) : 'scale' === i ? n[i] = r.configMerge(o, t.scaleService.getScaleDefaults(e.type), e) : !a || 'object' != (typeof o === 'undefined' ? 'undefined' : _typeof(o)) || r.isArray(o) || null === o || 'object' != (typeof e === 'undefined' ? 'undefined' : _typeof(e)) || r.isArray(e) ? n[i] = e : n[i] = r.configMerge(o, e);
                });
              }), n;
            }, r.scaleMerge = function (e, n) {
              var i = r.clone(e);
              return r.each(n, function (e, n) {
                'xAxes' === n || 'yAxes' === n ? i.hasOwnProperty(n) ? r.each(e, function (e, a) {
                  var o = r.getValueOrDefault(e.type, 'xAxes' === n ? 'category' : 'linear'),
                      s = t.scaleService.getScaleDefaults(o);
                  a >= i[n].length || !i[n][a].type ? i[n].push(r.configMerge(s, e)) : e.type && e.type !== i[n][a].type ? i[n][a] = r.configMerge(i[n][a], s, e) : i[n][a] = r.configMerge(i[n][a], e);
                }) : (i[n] = [], r.each(e, function (e) {
                  var a = r.getValueOrDefault(e.type, 'xAxes' === n ? 'category' : 'linear');
                  i[n].push(r.configMerge(t.scaleService.getScaleDefaults(a), e));
                })) : i.hasOwnProperty(n) && 'object' == _typeof(i[n]) && null !== i[n] && 'object' == (typeof e === 'undefined' ? 'undefined' : _typeof(e)) ? i[n] = r.configMerge(i[n], e) : i[n] = e;
              }), i;
            }, r.getValueAtIndexOrDefault = function (t, e, n) {
              return void 0 === t || null === t ? n : r.isArray(t) ? e < t.length ? t[e] : n : t;
            }, r.getValueOrDefault = function (t, e) {
              return void 0 === t ? e : t;
            }, r.indexOf = Array.prototype.indexOf ? function (t, e) {
              return t.indexOf(e);
            } : function (t, e) {
              for (var n = 0, i = t.length; n < i; ++n) {
                if (t[n] === e) return n;
              }return -1;
            }, r.where = function (t, e) {
              if (r.isArray(t) && Array.prototype.filter) return t.filter(e);
              var n = [];
              return r.each(t, function (t) {
                e(t) && n.push(t);
              }), n;
            }, r.findIndex = Array.prototype.findIndex ? function (t, e, n) {
              return t.findIndex(e, n);
            } : function (t, e, n) {
              n = void 0 === n ? t : n;
              for (var i = 0, a = t.length; i < a; ++i) {
                if (e.call(n, t[i], i, t)) return i;
              }return -1;
            }, r.findNextWhere = function (t, e, n) {
              void 0 !== n && null !== n || (n = -1);
              for (var i = n + 1; i < t.length; i++) {
                var a = t[i];
                if (e(a)) return a;
              }
            }, r.findPreviousWhere = function (t, e, n) {
              void 0 !== n && null !== n || (n = t.length);
              for (var i = n - 1; i >= 0; i--) {
                var a = t[i];
                if (e(a)) return a;
              }
            }, r.inherits = function (t) {
              var e = this,
                  n = t && t.hasOwnProperty('constructor') ? t.constructor : function () {
                return e.apply(this, arguments);
              },
                  i = function i() {
                this.constructor = n;
              };
              return i.prototype = e.prototype, n.prototype = new i(), n.extend = r.inherits, t && r.extend(n.prototype, t), n.__super__ = e.prototype, n;
            }, r.noop = function () {}, r.uid = function () {
              var t = 0;
              return function () {
                return t++;
              };
            }(), r.isNumber = function (t) {
              return !isNaN(parseFloat(t)) && isFinite(t);
            }, r.almostEquals = function (t, e, n) {
              return Math.abs(t - e) < n;
            }, r.almostWhole = function (t, e) {
              var n = Math.round(t);
              return n - e < t && n + e > t;
            }, r.max = function (t) {
              return t.reduce(function (t, e) {
                return isNaN(e) ? t : Math.max(t, e);
              }, Number.NEGATIVE_INFINITY);
            }, r.min = function (t) {
              return t.reduce(function (t, e) {
                return isNaN(e) ? t : Math.min(t, e);
              }, Number.POSITIVE_INFINITY);
            }, r.sign = Math.sign ? function (t) {
              return Math.sign(t);
            } : function (t) {
              return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1;
            }, r.log10 = Math.log10 ? function (t) {
              return Math.log10(t);
            } : function (t) {
              return Math.log(t) / Math.LN10;
            }, r.toRadians = function (t) {
              return t * (Math.PI / 180);
            }, r.toDegrees = function (t) {
              return t * (180 / Math.PI);
            }, r.getAngleFromPoint = function (t, e) {
              var n = e.x - t.x,
                  i = e.y - t.y,
                  a = Math.sqrt(n * n + i * i),
                  r = Math.atan2(i, n);
              return r < -0.5 * Math.PI && (r += 2 * Math.PI), {
                angle: r,
                distance: a
              };
            }, r.distanceBetweenPoints = function (t, e) {
              return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
            }, r.aliasPixel = function (t) {
              return t % 2 === 0 ? 0 : 0.5;
            }, r.splineCurve = function (t, e, n, i) {
              var a = t.skip ? e : t,
                  r = e,
                  o = n.skip ? e : n,
                  s = Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)),
                  l = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
                  u = s / (s + l),
                  d = l / (s + l);
              u = isNaN(u) ? 0 : u, d = isNaN(d) ? 0 : d;
              var c = i * u,
                  h = i * d;
              return {
                previous: {
                  x: r.x - c * (o.x - a.x),
                  y: r.y - c * (o.y - a.y)
                },
                next: {
                  x: r.x + h * (o.x - a.x),
                  y: r.y + h * (o.y - a.y)
                }
              };
            }, r.EPSILON = Number.EPSILON || 1e-14, r.splineCurveMonotone = function (t) {
              var e,
                  n,
                  i,
                  a,
                  o = (t || []).map(function (t) {
                return {
                  model: t._model,
                  deltaK: 0,
                  mK: 0
                };
              }),
                  s = o.length;
              for (e = 0; e < s; ++e) {
                if (i = o[e], !i.model.skip) {
                  if (n = e > 0 ? o[e - 1] : null, a = e < s - 1 ? o[e + 1] : null, a && !a.model.skip) {
                    var l = a.model.x - i.model.x;
                    i.deltaK = 0 !== l ? (a.model.y - i.model.y) / l : 0;
                  }
                  !n || n.model.skip ? i.mK = i.deltaK : !a || a.model.skip ? i.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (n.deltaK + i.deltaK) / 2;
                }
              }var u, d, c, h;
              for (e = 0; e < s - 1; ++e) {
                i = o[e], a = o[e + 1], i.model.skip || a.model.skip || (r.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = a.mK = 0 : (u = i.mK / i.deltaK, d = a.mK / i.deltaK, h = Math.pow(u, 2) + Math.pow(d, 2), h <= 9 || (c = 3 / Math.sqrt(h), i.mK = u * c * i.deltaK, a.mK = d * c * i.deltaK)));
              }var f;
              for (e = 0; e < s; ++e) {
                i = o[e], i.model.skip || (n = e > 0 ? o[e - 1] : null, a = e < s - 1 ? o[e + 1] : null, n && !n.model.skip && (f = (i.model.x - n.model.x) / 3, i.model.controlPointPreviousX = i.model.x - f, i.model.controlPointPreviousY = i.model.y - f * i.mK), a && !a.model.skip && (f = (a.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + f, i.model.controlPointNextY = i.model.y + f * i.mK));
              }
            }, r.nextItem = function (t, e, n) {
              return n ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1];
            }, r.previousItem = function (t, e, n) {
              return n ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1];
            }, r.niceNum = function (t, e) {
              var n,
                  i = Math.floor(r.log10(t)),
                  a = t / Math.pow(10, i);
              return n = e ? a < 1.5 ? 1 : a < 3 ? 2 : a < 7 ? 5 : 10 : a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10, n * Math.pow(10, i);
            };
            var o = r.easingEffects = {
              linear: function linear(t) {
                return t;
              },
              easeInQuad: function easeInQuad(t) {
                return t * t;
              },
              easeOutQuad: function easeOutQuad(t) {
                return -1 * t * (t - 2);
              },
              easeInOutQuad: function easeInOutQuad(t) {
                return (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
              },
              easeInCubic: function easeInCubic(t) {
                return t * t * t;
              },
              easeOutCubic: function easeOutCubic(t) {
                return 1 * ((t = t / 1 - 1) * t * t + 1);
              },
              easeInOutCubic: function easeInOutCubic(t) {
                return (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
              },
              easeInQuart: function easeInQuart(t) {
                return t * t * t * t;
              },
              easeOutQuart: function easeOutQuart(t) {
                return -1 * ((t = t / 1 - 1) * t * t * t - 1);
              },
              easeInOutQuart: function easeInOutQuart(t) {
                return (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
              },
              easeInQuint: function easeInQuint(t) {
                return 1 * (t /= 1) * t * t * t * t;
              },
              easeOutQuint: function easeOutQuint(t) {
                return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
              },
              easeInOutQuint: function easeInOutQuint(t) {
                return (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
              },
              easeInSine: function easeInSine(t) {
                return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
              },
              easeOutSine: function easeOutSine(t) {
                return 1 * Math.sin(t / 1 * (Math.PI / 2));
              },
              easeInOutSine: function easeInOutSine(t) {
                return -0.5 * (Math.cos(Math.PI * t / 1) - 1);
              },
              easeInExpo: function easeInExpo(t) {
                return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
              },
              easeOutExpo: function easeOutExpo(t) {
                return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
              },
              easeInOutExpo: function easeInOutExpo(t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (t - 1)) : 0.5 * (-Math.pow(2, -10 * --t) + 2);
              },
              easeInCirc: function easeInCirc(t) {
                return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
              },
              easeOutCirc: function easeOutCirc(t) {
                return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
              },
              easeInOutCirc: function easeInOutCirc(t) {
                return (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
              },
              easeInElastic: function easeInElastic(t) {
                var e = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (n || (n = 0.3), i < Math.abs(1) ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n)));
              },
              easeOutElastic: function easeOutElastic(t) {
                var e = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (n || (n = 0.3), i < Math.abs(1) ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / n) + 1);
              },
              easeInOutElastic: function easeInOutElastic(t) {
                var e = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === t ? 0 : 2 === (t /= 0.5) ? 1 : (n || (n = 1 * (0.3 * 1.5)), i < Math.abs(1) ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), t < 1 ? -0.5 * (i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n)) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n) * 0.5 + 1);
              },
              easeInBack: function easeInBack(t) {
                var e = 1.70158;
                return 1 * (t /= 1) * t * ((e + 1) * t - e);
              },
              easeOutBack: function easeOutBack(t) {
                var e = 1.70158;
                return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1);
              },
              easeInOutBack: function easeInOutBack(t) {
                var e = 1.70158;
                return (t /= 0.5) < 1 ? 0.5 * (t * t * (((e *= 1.525) + 1) * t - e)) : 0.5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
              },
              easeInBounce: function easeInBounce(t) {
                return 1 - o.easeOutBounce(1 - t);
              },
              easeOutBounce: function easeOutBounce(t) {
                return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : t < 2 / 2.75 ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) : t < 2.5 / 2.75 ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
              },
              easeInOutBounce: function easeInOutBounce(t) {
                return t < 0.5 ? 0.5 * o.easeInBounce(2 * t) : 0.5 * o.easeOutBounce(2 * t - 1) + 0.5;
              }
            };
            r.requestAnimFrame = function () {
              return 'undefined' == typeof window ? function (t) {
                t();
              } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                return window.setTimeout(t, 1000 / 60);
              };
            }(), r.getRelativePosition = function (t, e) {
              var n,
                  i,
                  a = t.originalEvent || t,
                  o = t.currentTarget || t.srcElement,
                  s = o.getBoundingClientRect(),
                  l = a.touches;
              l && l.length > 0 ? (n = l[0].clientX, i = l[0].clientY) : (n = a.clientX, i = a.clientY);
              var u = parseFloat(r.getStyle(o, 'padding-left')),
                  d = parseFloat(r.getStyle(o, 'padding-top')),
                  c = parseFloat(r.getStyle(o, 'padding-right')),
                  h = parseFloat(r.getStyle(o, 'padding-bottom')),
                  f = s.right - s.left - u - c,
                  g = s.bottom - s.top - d - h;
              return n = Math.round((n - s.left - u) / f * o.width / e.currentDevicePixelRatio), i = Math.round((i - s.top - d) / g * o.height / e.currentDevicePixelRatio), {
                x: n,
                y: i
              };
            }, r.addEvent = function (t, e, n) {
              t.addEventListener ? t.addEventListener(e, n) : t.attachEvent ? t.attachEvent('on' + e, n) : t['on' + e] = n;
            }, r.removeEvent = function (t, e, n) {
              t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent ? t.detachEvent('on' + e, n) : t['on' + e] = r.noop;
            }, r.getConstraintWidth = function (t) {
              return a(t, 'max-width', 'clientWidth');
            }, r.getConstraintHeight = function (t) {
              return a(t, 'max-height', 'clientHeight');
            }, r.getMaximumWidth = function (t) {
              var e = t.parentNode,
                  n = parseInt(r.getStyle(e, 'padding-left'), 10),
                  i = parseInt(r.getStyle(e, 'padding-right'), 10),
                  a = e.clientWidth - n - i,
                  o = r.getConstraintWidth(t);
              return isNaN(o) ? a : Math.min(a, o);
            }, r.getMaximumHeight = function (t) {
              var e = t.parentNode,
                  n = parseInt(r.getStyle(e, 'padding-top'), 10),
                  i = parseInt(r.getStyle(e, 'padding-bottom'), 10),
                  a = e.clientHeight - n - i,
                  o = r.getConstraintHeight(t);
              return isNaN(o) ? a : Math.min(a, o);
            }, r.getStyle = function (t, e) {
              return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e);
            }, r.retinaScale = function (t) {
              var e = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
              if (1 !== e) {
                var n = t.canvas,
                    i = t.height,
                    a = t.width;
                n.height = i * e, n.width = a * e, t.ctx.scale(e, e), n.style.height = i + 'px', n.style.width = a + 'px';
              }
            }, r.clear = function (t) {
              t.ctx.clearRect(0, 0, t.width, t.height);
            }, r.fontString = function (t, e, n) {
              return e + ' ' + t + 'px ' + n;
            }, r.longestText = function (t, e, n, i) {
              i = i || {};
              var a = i.data = i.data || {},
                  o = i.garbageCollect = i.garbageCollect || [];
              i.font !== e && (a = i.data = {}, o = i.garbageCollect = [], i.font = e), t.font = e;
              var s = 0;
              r.each(n, function (e) {
                void 0 !== e && null !== e && r.isArray(e) !== !0 ? s = r.measureText(t, a, o, s, e) : r.isArray(e) && r.each(e, function (e) {
                  void 0 === e || null === e || r.isArray(e) || (s = r.measureText(t, a, o, s, e));
                });
              });
              var l = o.length / 2;
              if (l > n.length) {
                for (var u = 0; u < l; u++) {
                  delete a[o[u]];
                }o.splice(0, l);
              }
              return s;
            }, r.measureText = function (t, e, n, i, a) {
              var r = e[a];
              return r || (r = e[a] = t.measureText(a).width, n.push(a)), r > i && (i = r), i;
            }, r.numberOfLabelLines = function (t) {
              var e = 1;
              return r.each(t, function (t) {
                r.isArray(t) && t.length > e && (e = t.length);
              }), e;
            }, r.drawRoundedRectangle = function (t, e, n, i, a, r) {
              t.beginPath(), t.moveTo(e + r, n), t.lineTo(e + i - r, n), t.quadraticCurveTo(e + i, n, e + i, n + r), t.lineTo(e + i, n + a - r), t.quadraticCurveTo(e + i, n + a, e + i - r, n + a), t.lineTo(e + r, n + a), t.quadraticCurveTo(e, n + a, e, n + a - r), t.lineTo(e, n + r), t.quadraticCurveTo(e, n, e + r, n), t.closePath();
            }, r.color = i ? function (e) {
              return e instanceof CanvasGradient && (e = t.defaults.global.defaultColor), i(e);
            } : function (t) {
              return console.error('Color.js not found!'), t;
            }, r.isArray = Array.isArray ? function (t) {
              return Array.isArray(t);
            } : function (t) {
              return '[object Array]' === Object.prototype.toString.call(t);
            }, r.arrayEquals = function (t, e) {
              var n, i, a, o;
              if (!t || !e || t.length !== e.length) return !1;
              for (n = 0, i = t.length; n < i; ++n) {
                if (a = t[n], o = e[n], a instanceof Array && o instanceof Array) {
                  if (!r.arrayEquals(a, o)) return !1;
                } else if (a !== o) return !1;
              }return !0;
            }, r.callback = function (t, e, n) {
              t && 'function' == typeof t.call && t.apply(n, e);
            }, r.getHoverColor = function (t) {
              return t instanceof CanvasPattern ? t : r.color(t).saturate(0.5).darken(0.1).rgbString();
            }, r.callCallback = r.callback;
          };
        }, { 2: 2 }],
        27: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              return t.native ? {
                x: t.x,
                y: t.y
              } : o.getRelativePosition(t, e);
            }
            function n(t, e) {
              var n,
                  i,
                  a,
                  r,
                  o,
                  s = t.data.datasets;
              for (i = 0, r = s.length; i < r; ++i) {
                if (t.isDatasetVisible(i)) for (n = t.getDatasetMeta(i), a = 0, o = n.data.length; a < o; ++a) {
                  var l = n.data[a];
                  l._view.skip || e(l);
                }
              }
            }
            function i(t, e) {
              var i = [];
              return n(t, function (t) {
                t.inRange(e.x, e.y) && i.push(t);
              }), i;
            }
            function a(t, e, i, a) {
              var r = Number.POSITIVE_INFINITY,
                  s = [];
              return a || (a = o.distanceBetweenPoints), n(t, function (t) {
                if (!i || t.inRange(e.x, e.y)) {
                  var n = t.getCenterPoint(),
                      o = a(e, n);
                  o < r ? (s = [t], r = o) : o === r && s.push(t);
                }
              }), s;
            }
            function r(t, n, r) {
              var o = e(n, t),
                  s = function s(t, e) {
                return Math.abs(t.x - e.x);
              },
                  l = r.intersect ? i(t, o) : a(t, o, !1, s),
                  u = [];
              return l.length ? (t.data.datasets.forEach(function (e, n) {
                if (t.isDatasetVisible(n)) {
                  var i = t.getDatasetMeta(n),
                      a = i.data[l[0]._index];
                  a && !a._view.skip && u.push(a);
                }
              }), u) : [];
            }
            var o = t.helpers;
            t.Interaction = {
              modes: {
                single: function single(t, i) {
                  var a = e(i, t),
                      r = [];
                  return n(t, function (t) {
                    if (t.inRange(a.x, a.y)) return r.push(t), r;
                  }), r.slice(0, 1);
                },
                label: r,
                index: r,
                dataset: function dataset(t, n, r) {
                  var o = e(n, t),
                      s = r.intersect ? i(t, o) : a(t, o, !1);
                  return s.length > 0 && (s = t.getDatasetMeta(s[0]._datasetIndex).data), s;
                },
                'x-axis': function xAxis(t, e) {
                  return r(t, e, !0);
                },
                point: function point(t, n) {
                  var a = e(n, t);
                  return i(t, a);
                },
                nearest: function nearest(t, n, i) {
                  var r = e(n, t),
                      o = a(t, r, i.intersect);
                  return o.length > 1 && o.sort(function (t, e) {
                    var n = t.getArea(),
                        i = e.getArea(),
                        a = n - i;
                    return 0 === a && (a = t._datasetIndex - e._datasetIndex), a;
                  }), o.slice(0, 1);
                },
                x: function x(t, i, a) {
                  var r = e(i, t),
                      o = [],
                      s = !1;
                  return n(t, function (t) {
                    t.inXRange(r.x) && o.push(t), t.inRange(r.x, r.y) && (s = !0);
                  }), a.intersect && !s && (o = []), o;
                },
                y: function y(t, i, a) {
                  var r = e(i, t),
                      o = [],
                      s = !1;
                  return n(t, function (t) {
                    t.inYRange(r.y) && o.push(t), t.inRange(r.x, r.y) && (s = !0);
                  }), a.intersect && !s && (o = []), o;
                }
              }
            };
          };
        }, {}],
        28: [function (t, e, n) {
          'use strict';

          e.exports = function () {
            var t = function t(_t2, e) {
              return this.construct(_t2, e), this;
            };
            return t.defaults = {
              global: {
                responsive: !0,
                responsiveAnimationDuration: 0,
                maintainAspectRatio: !0,
                events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                hover: {
                  onHover: null,
                  mode: 'nearest',
                  intersect: !0,
                  animationDuration: 400
                },
                onClick: null,
                defaultColor: 'rgba(0,0,0,0.1)',
                defaultFontColor: '#666',
                defaultFontFamily: '\'Helvetica Neue\', \'Helvetica\', \'Arial\', sans-serif',
                defaultFontSize: 12,
                defaultFontStyle: 'normal',
                showLines: !0,
                elements: {},
                legendCallback: function legendCallback(t) {
                  var e = [];
                  e.push('<ul class="' + t.id + '-legend">');
                  for (var n = 0; n < t.data.datasets.length; n++) {
                    e.push('<li><span style="background-color:' + t.data.datasets[n].backgroundColor + '"></span>'), t.data.datasets[n].label && e.push(t.data.datasets[n].label), e.push('</li>');
                  }return e.push('</ul>'), e.join('');
                }
              }
            }, t.Chart = t, t;
          };
        }, {}],
        29: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              return i.where(t, function (t) {
                return t.position === e;
              });
            }
            function n(t, e) {
              t.forEach(function (t, e) {
                return t._tmpIndex_ = e, t;
              }), t.sort(function (t, n) {
                var i = e ? n : t,
                    a = e ? t : n;
                return i.weight === a.weight ? i._tmpIndex_ - a._tmpIndex_ : i.weight - a.weight;
              }), t.forEach(function (t) {
                delete t._tmpIndex_;
              });
            }
            var i = t.helpers;
            t.layoutService = {
              defaults: {},
              addBox: function addBox(t, e) {
                t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || 'top', e.weight = e.weight || 0, t.boxes.push(e);
              },
              removeBox: function removeBox(t, e) {
                var n = t.boxes ? t.boxes.indexOf(e) : -1;
                n !== -1 && t.boxes.splice(n, 1);
              },
              configure: function configure(t, e, n) {
                for (var i, a = ['fullWidth', 'position', 'weight'], r = a.length, o = 0; o < r; ++o) {
                  i = a[o], n.hasOwnProperty(i) && (e[i] = n[i]);
                }
              },
              update: function update(t, a, r) {
                function o(t) {
                  var e,
                      n = t.isHorizontal();
                  n ? (e = t.update(t.fullWidth ? _ : C, D), P -= e.height) : (e = t.update(S, M), C -= e.width), T.push({
                    horizontal: n,
                    minSize: e,
                    box: t
                  });
                }
                function s(t) {
                  var e = i.findNextWhere(T, function (e) {
                    return e.box === t;
                  });
                  if (e) if (t.isHorizontal()) {
                    var n = {
                      left: Math.max(R, I),
                      right: Math.max(L, A),
                      top: 0,
                      bottom: 0
                    };
                    t.update(t.fullWidth ? _ : C, k / 2, n);
                  } else t.update(e.minSize.width, P);
                }
                function l(t) {
                  var e = i.findNextWhere(T, function (e) {
                    return e.box === t;
                  }),
                      n = {
                    left: 0,
                    right: 0,
                    top: V,
                    bottom: W
                  };
                  e && t.update(e.minSize.width, P, n);
                }
                function u(t) {
                  t.isHorizontal() ? (t.left = t.fullWidth ? h : R, t.right = t.fullWidth ? a - f : R + C, t.top = H, t.bottom = H + t.height, H = t.bottom) : (t.left = E, t.right = E + t.width, t.top = V, t.bottom = V + P, E = t.right);
                }
                if (t) {
                  var d = t.options.layout,
                      c = d ? d.padding : null,
                      h = 0,
                      f = 0,
                      g = 0,
                      p = 0;
                  isNaN(c) ? (h = c.left || 0, f = c.right || 0, g = c.top || 0, p = c.bottom || 0) : (h = c, f = c, g = c, p = c);
                  var m = e(t.boxes, 'left'),
                      v = e(t.boxes, 'right'),
                      y = e(t.boxes, 'top'),
                      b = e(t.boxes, 'bottom'),
                      x = e(t.boxes, 'chartArea');
                  n(m, !0), n(v, !1), n(y, !0), n(b, !1);
                  var _ = a - h - f,
                      k = r - g - p,
                      w = _ / 2,
                      M = k / 2,
                      S = (a - w) / (m.length + v.length),
                      D = (r - M) / (y.length + b.length),
                      C = _,
                      P = k,
                      T = [];
                  i.each(m.concat(v, y, b), o);
                  var I = 0,
                      A = 0,
                      F = 0,
                      O = 0;
                  i.each(y.concat(b), function (t) {
                    if (t.getPadding) {
                      var e = t.getPadding();
                      I = Math.max(I, e.left), A = Math.max(A, e.right);
                    }
                  }), i.each(m.concat(v), function (t) {
                    if (t.getPadding) {
                      var e = t.getPadding();
                      F = Math.max(F, e.top), O = Math.max(O, e.bottom);
                    }
                  });
                  var R = h,
                      L = f,
                      V = g,
                      W = p;
                  i.each(m.concat(v), s), i.each(m, function (t) {
                    R += t.width;
                  }), i.each(v, function (t) {
                    L += t.width;
                  }), i.each(y.concat(b), s), i.each(y, function (t) {
                    V += t.height;
                  }), i.each(b, function (t) {
                    W += t.height;
                  }), i.each(m.concat(v), l), R = h, L = f, V = g, W = p, i.each(m, function (t) {
                    R += t.width;
                  }), i.each(v, function (t) {
                    L += t.width;
                  }), i.each(y, function (t) {
                    V += t.height;
                  }), i.each(b, function (t) {
                    W += t.height;
                  });
                  var Y = Math.max(I - R, 0);
                  R += Y, L += Math.max(A - L, 0);
                  var z = Math.max(F - V, 0);
                  V += z, W += Math.max(O - W, 0);
                  var N = r - V - W,
                      B = a - R - L;
                  B === C && N === P || (i.each(m, function (t) {
                    t.height = N;
                  }), i.each(v, function (t) {
                    t.height = N;
                  }), i.each(y, function (t) {
                    t.fullWidth || (t.width = B);
                  }), i.each(b, function (t) {
                    t.fullWidth || (t.width = B);
                  }), P = N, C = B);
                  var E = h + Y,
                      H = g + z;
                  i.each(m.concat(y), u), E += C, H += P, i.each(v, u), i.each(b, u), t.chartArea = {
                    left: R,
                    top: V,
                    right: R + C,
                    bottom: V + P
                  }, i.each(x, function (e) {
                    e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(C, P);
                  });
                }
              }
            };
          };
        }, {}],
        30: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.defaults.global.plugins = {}, t.plugins = {
              _plugins: [],
              _cacheId: 0,
              register: function register(t) {
                var e = this._plugins;
                [].concat(t).forEach(function (t) {
                  e.indexOf(t) === -1 && e.push(t);
                }), this._cacheId++;
              },
              unregister: function unregister(t) {
                var e = this._plugins;
                [].concat(t).forEach(function (t) {
                  var n = e.indexOf(t);
                  n !== -1 && e.splice(n, 1);
                }), this._cacheId++;
              },
              clear: function clear() {
                this._plugins = [], this._cacheId++;
              },
              count: function count() {
                return this._plugins.length;
              },
              getAll: function getAll() {
                return this._plugins;
              },
              notify: function notify(t, e, n) {
                var i,
                    a,
                    r,
                    o,
                    s,
                    l = this.descriptors(t),
                    u = l.length;
                for (i = 0; i < u; ++i) {
                  if (a = l[i], r = a.plugin, s = r[e], 'function' == typeof s && (o = [t].concat(n || []), o.push(a.options), s.apply(r, o) === !1)) return !1;
                }return !0;
              },
              descriptors: function descriptors(n) {
                var i = n._plugins || (n._plugins = {});
                if (i.id === this._cacheId) return i.descriptors;
                var a = [],
                    r = [],
                    o = n && n.config || {},
                    s = t.defaults.global.plugins,
                    l = o.options && o.options.plugins || {};
                return this._plugins.concat(o.plugins || []).forEach(function (t) {
                  var n = a.indexOf(t);
                  if (n === -1) {
                    var i = t.id,
                        o = l[i];
                    o !== !1 && (o === !0 && (o = e.clone(s[i])), a.push(t), r.push({
                      plugin: t,
                      options: o || {}
                    }));
                  }
                }), i.descriptors = r, i.id = this._cacheId, r;
              }
            }, t.pluginService = t.plugins, t.PluginBase = t.Element.extend({});
          };
        }, {}],
        31: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e, n) {
              return i.isArray(e) ? i.longestText(t, n, e) : t.measureText(e).width;
            }
            function n(e) {
              var n = i.getValueOrDefault,
                  a = t.defaults.global,
                  r = n(e.fontSize, a.defaultFontSize),
                  o = n(e.fontStyle, a.defaultFontStyle),
                  s = n(e.fontFamily, a.defaultFontFamily);
              return {
                size: r,
                style: o,
                family: s,
                font: i.fontString(r, o, s)
              };
            }
            var i = t.helpers;
            t.defaults.scale = {
              display: !0,
              position: 'left',
              gridLines: {
                display: !0,
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1,
                drawBorder: !0,
                drawOnChartArea: !0,
                drawTicks: !0,
                tickMarkLength: 10,
                zeroLineWidth: 1,
                zeroLineColor: 'rgba(0,0,0,0.25)',
                zeroLineBorderDash: [],
                zeroLineBorderDashOffset: 0,
                offsetGridLines: !1,
                borderDash: [],
                borderDashOffset: 0
              },
              scaleLabel: {
                labelString: '',
                display: !1
              },
              ticks: {
                beginAtZero: !1,
                minRotation: 0,
                maxRotation: 50,
                mirror: !1,
                padding: 0,
                reverse: !1,
                display: !0,
                autoSkip: !0,
                autoSkipPadding: 0,
                labelOffset: 0,
                callback: t.Ticks.formatters.values
              }
            }, t.Scale = t.Element.extend({
              getPadding: function getPadding() {
                var t = this;
                return {
                  left: t.paddingLeft || 0,
                  top: t.paddingTop || 0,
                  right: t.paddingRight || 0,
                  bottom: t.paddingBottom || 0
                };
              },
              beforeUpdate: function beforeUpdate() {
                i.callback(this.options.beforeUpdate, [this]);
              },
              update: function update(t, e, n) {
                var a = this;
                return a.beforeUpdate(), a.maxWidth = t, a.maxHeight = e, a.margins = i.extend({
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }, n), a.longestTextCache = a.longestTextCache || {}, a.beforeSetDimensions(), a.setDimensions(), a.afterSetDimensions(), a.beforeDataLimits(), a.determineDataLimits(), a.afterDataLimits(), a.beforeBuildTicks(), a.buildTicks(), a.afterBuildTicks(), a.beforeTickToLabelConversion(), a.convertTicksToLabels(), a.afterTickToLabelConversion(), a.beforeCalculateTickRotation(), a.calculateTickRotation(), a.afterCalculateTickRotation(), a.beforeFit(), a.fit(), a.afterFit(), a.afterUpdate(), a.minSize;
              },
              afterUpdate: function afterUpdate() {
                i.callback(this.options.afterUpdate, [this]);
              },
              beforeSetDimensions: function beforeSetDimensions() {
                i.callback(this.options.beforeSetDimensions, [this]);
              },
              setDimensions: function setDimensions() {
                var t = this;
                t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0;
              },
              afterSetDimensions: function afterSetDimensions() {
                i.callback(this.options.afterSetDimensions, [this]);
              },
              beforeDataLimits: function beforeDataLimits() {
                i.callback(this.options.beforeDataLimits, [this]);
              },
              determineDataLimits: i.noop,
              afterDataLimits: function afterDataLimits() {
                i.callback(this.options.afterDataLimits, [this]);
              },
              beforeBuildTicks: function beforeBuildTicks() {
                i.callback(this.options.beforeBuildTicks, [this]);
              },
              buildTicks: i.noop,
              afterBuildTicks: function afterBuildTicks() {
                i.callback(this.options.afterBuildTicks, [this]);
              },
              beforeTickToLabelConversion: function beforeTickToLabelConversion() {
                i.callback(this.options.beforeTickToLabelConversion, [this]);
              },
              convertTicksToLabels: function convertTicksToLabels() {
                var t = this,
                    e = t.options.ticks;
                t.ticks = t.ticks.map(e.userCallback || e.callback);
              },
              afterTickToLabelConversion: function afterTickToLabelConversion() {
                i.callback(this.options.afterTickToLabelConversion, [this]);
              },
              beforeCalculateTickRotation: function beforeCalculateTickRotation() {
                i.callback(this.options.beforeCalculateTickRotation, [this]);
              },
              calculateTickRotation: function calculateTickRotation() {
                var t = this,
                    e = t.ctx,
                    a = t.options.ticks,
                    r = n(a);
                e.font = r.font;
                var o = a.minRotation || 0;
                if (t.options.display && t.isHorizontal()) for (var s, l, u = i.longestText(e, r.font, t.ticks, t.longestTextCache), d = u, c = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; d > c && o < a.maxRotation;) {
                  var h = i.toRadians(o);
                  if (s = Math.cos(h), l = Math.sin(h), l * u > t.maxHeight) {
                    o--;
                    break;
                  }
                  o++, d = s * u;
                }
                t.labelRotation = o;
              },
              afterCalculateTickRotation: function afterCalculateTickRotation() {
                i.callback(this.options.afterCalculateTickRotation, [this]);
              },
              beforeFit: function beforeFit() {
                i.callback(this.options.beforeFit, [this]);
              },
              fit: function fit() {
                var t = this,
                    a = t.minSize = {
                  width: 0,
                  height: 0
                },
                    r = t.options,
                    o = r.ticks,
                    s = r.scaleLabel,
                    l = r.gridLines,
                    u = r.display,
                    d = t.isHorizontal(),
                    c = n(o),
                    h = 1.5 * n(s).size,
                    f = r.gridLines.tickMarkLength;
                if (d ? a.width = t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : a.width = u && l.drawTicks ? f : 0, d ? a.height = u && l.drawTicks ? f : 0 : a.height = t.maxHeight, s.display && u && (d ? a.height += h : a.width += h), o.display && u) {
                  var g = i.longestText(t.ctx, c.font, t.ticks, t.longestTextCache),
                      p = i.numberOfLabelLines(t.ticks),
                      m = 0.5 * c.size;
                  if (d) {
                    t.longestLabelWidth = g;
                    var v = i.toRadians(t.labelRotation),
                        y = Math.cos(v),
                        b = Math.sin(v),
                        x = b * g + c.size * p + m * p;
                    a.height = Math.min(t.maxHeight, a.height + x), t.ctx.font = c.font;
                    var _ = t.ticks[0],
                        k = e(t.ctx, _, c.font),
                        w = t.ticks[t.ticks.length - 1],
                        M = e(t.ctx, w, c.font);
                    0 !== t.labelRotation ? (t.paddingLeft = 'bottom' === r.position ? y * k + 3 : y * m + 3, t.paddingRight = 'bottom' === r.position ? y * m + 3 : y * M + 3) : (t.paddingLeft = k / 2 + 3, t.paddingRight = M / 2 + 3);
                  } else o.mirror ? g = 0 : g += t.options.ticks.padding, a.width = Math.min(t.maxWidth, a.width + g), t.paddingTop = c.size / 2, t.paddingBottom = c.size / 2;
                }
                t.handleMargins(), t.width = a.width, t.height = a.height;
              },
              handleMargins: function handleMargins() {
                var t = this;
                t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0));
              },
              afterFit: function afterFit() {
                i.callback(this.options.afterFit, [this]);
              },
              isHorizontal: function isHorizontal() {
                return 'top' === this.options.position || 'bottom' === this.options.position;
              },
              isFullWidth: function isFullWidth() {
                return this.options.fullWidth;
              },
              getRightValue: function getRightValue(t) {
                return null === t || 'undefined' == typeof t ? NaN : 'number' != typeof t || isFinite(t) ? 'object' == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) ? t instanceof Date || t.isValid ? t : this.getRightValue(this.isHorizontal() ? t.x : t.y) : t : NaN;
              },
              getLabelForIndex: i.noop,
              getPixelForValue: i.noop,
              getValueForPixel: i.noop,
              getPixelForTick: function getPixelForTick(t, e) {
                var n = this;
                if (n.isHorizontal()) {
                  var i = n.width - (n.paddingLeft + n.paddingRight),
                      a = i / Math.max(n.ticks.length - (n.options.gridLines.offsetGridLines ? 0 : 1), 1),
                      r = a * t + n.paddingLeft;
                  e && (r += a / 2);
                  var o = n.left + Math.round(r);
                  return o += n.isFullWidth() ? n.margins.left : 0;
                }
                var s = n.height - (n.paddingTop + n.paddingBottom);
                return n.top + t * (s / (n.ticks.length - 1));
              },
              getPixelForDecimal: function getPixelForDecimal(t) {
                var e = this;
                if (e.isHorizontal()) {
                  var n = e.width - (e.paddingLeft + e.paddingRight),
                      i = n * t + e.paddingLeft,
                      a = e.left + Math.round(i);
                  return a += e.isFullWidth() ? e.margins.left : 0;
                }
                return e.top + t * e.height;
              },
              getBasePixel: function getBasePixel() {
                return this.getPixelForValue(this.getBaseValue());
              },
              getBaseValue: function getBaseValue() {
                var t = this,
                    e = t.min,
                    n = t.max;
                return t.beginAtZero ? 0 : e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0;
              },
              draw: function draw(e) {
                var a = this,
                    r = a.options;
                if (r.display) {
                  var o,
                      s,
                      l = a.ctx,
                      u = t.defaults.global,
                      d = r.ticks,
                      c = r.gridLines,
                      h = r.scaleLabel,
                      f = 0 !== a.labelRotation,
                      g = d.autoSkip,
                      p = a.isHorizontal();
                  d.maxTicksLimit && (s = d.maxTicksLimit);
                  var m = i.getValueOrDefault(d.fontColor, u.defaultFontColor),
                      v = n(d),
                      y = c.drawTicks ? c.tickMarkLength : 0,
                      b = i.getValueOrDefault(h.fontColor, u.defaultFontColor),
                      x = n(h),
                      _ = i.toRadians(a.labelRotation),
                      k = Math.cos(_),
                      w = a.longestLabelWidth * k;
                  l.fillStyle = m;
                  var M = [];
                  if (p) {
                    if (o = !1, (w + d.autoSkipPadding) * a.ticks.length > a.width - (a.paddingLeft + a.paddingRight) && (o = 1 + Math.floor((w + d.autoSkipPadding) * a.ticks.length / (a.width - (a.paddingLeft + a.paddingRight)))), s && a.ticks.length > s) for (; !o || a.ticks.length / (o || 1) > s;) {
                      o || (o = 1), o += 1;
                    }g || (o = !1);
                  }
                  var S = 'right' === r.position ? a.left : a.right - y,
                      D = 'right' === r.position ? a.left + y : a.right,
                      C = 'bottom' === r.position ? a.top : a.bottom - y,
                      P = 'bottom' === r.position ? a.top + y : a.bottom;
                  if (i.each(a.ticks, function (t, n) {
                    if (void 0 !== t && null !== t) {
                      var s = a.ticks.length === n + 1,
                          l = o > 1 && n % o > 0 || n % o === 0 && n + o >= a.ticks.length;
                      if ((!l || s) && void 0 !== t && null !== t) {
                        var h, g, m, v;
                        n === ('undefined' != typeof a.zeroLineIndex ? a.zeroLineIndex : 0) ? (h = c.zeroLineWidth, g = c.zeroLineColor, m = c.zeroLineBorderDash, v = c.zeroLineBorderDashOffset) : (h = i.getValueAtIndexOrDefault(c.lineWidth, n), g = i.getValueAtIndexOrDefault(c.color, n), m = i.getValueOrDefault(c.borderDash, u.borderDash), v = i.getValueOrDefault(c.borderDashOffset, u.borderDashOffset));
                        var b,
                            x,
                            k,
                            w,
                            T,
                            I,
                            A,
                            F,
                            O,
                            R,
                            L = 'middle',
                            V = 'middle';
                        if (p) {
                          'bottom' === r.position ? (V = f ? 'middle' : 'top', L = f ? 'right' : 'center', R = a.top + y) : (V = f ? 'middle' : 'bottom', L = f ? 'left' : 'center', R = a.bottom - y);
                          var W = a.getPixelForTick(n) + i.aliasPixel(h);
                          O = a.getPixelForTick(n, c.offsetGridLines) + d.labelOffset, b = k = T = A = W, x = C, w = P, I = e.top, F = e.bottom;
                        } else {
                          var Y,
                              z = 'left' === r.position,
                              N = d.padding;
                          d.mirror ? (L = z ? 'left' : 'right', Y = N) : (L = z ? 'right' : 'left', Y = y + N), O = z ? a.right - Y : a.left + Y;
                          var B = a.getPixelForTick(n);
                          B += i.aliasPixel(h), R = a.getPixelForTick(n, c.offsetGridLines), b = S, k = D, T = e.left, A = e.right, x = w = I = F = B;
                        }
                        M.push({
                          tx1: b,
                          ty1: x,
                          tx2: k,
                          ty2: w,
                          x1: T,
                          y1: I,
                          x2: A,
                          y2: F,
                          labelX: O,
                          labelY: R,
                          glWidth: h,
                          glColor: g,
                          glBorderDash: m,
                          glBorderDashOffset: v,
                          rotation: -1 * _,
                          label: t,
                          textBaseline: V,
                          textAlign: L
                        });
                      }
                    }
                  }), i.each(M, function (t) {
                    if (c.display && (l.save(), l.lineWidth = t.glWidth, l.strokeStyle = t.glColor, l.setLineDash && (l.setLineDash(t.glBorderDash), l.lineDashOffset = t.glBorderDashOffset), l.beginPath(), c.drawTicks && (l.moveTo(t.tx1, t.ty1), l.lineTo(t.tx2, t.ty2)), c.drawOnChartArea && (l.moveTo(t.x1, t.y1), l.lineTo(t.x2, t.y2)), l.stroke(), l.restore()), d.display) {
                      l.save(), l.translate(t.labelX, t.labelY), l.rotate(t.rotation), l.font = v.font, l.textBaseline = t.textBaseline, l.textAlign = t.textAlign;
                      var e = t.label;
                      if (i.isArray(e)) for (var n = 0, a = 0; n < e.length; ++n) {
                        l.fillText('' + e[n], 0, a), a += 1.5 * v.size;
                      } else l.fillText(e, 0, 0);
                      l.restore();
                    }
                  }), h.display) {
                    var T,
                        I,
                        A = 0;
                    if (p) T = a.left + (a.right - a.left) / 2, I = 'bottom' === r.position ? a.bottom - x.size / 2 : a.top + x.size / 2;else {
                      var F = 'left' === r.position;
                      T = F ? a.left + x.size / 2 : a.right - x.size / 2, I = a.top + (a.bottom - a.top) / 2, A = F ? -0.5 * Math.PI : 0.5 * Math.PI;
                    }
                    l.save(), l.translate(T, I), l.rotate(A), l.textAlign = 'center', l.textBaseline = 'middle', l.fillStyle = b, l.font = x.font, l.fillText(h.labelString, 0, 0), l.restore();
                  }
                  if (c.drawBorder) {
                    l.lineWidth = i.getValueAtIndexOrDefault(c.lineWidth, 0), l.strokeStyle = i.getValueAtIndexOrDefault(c.color, 0);
                    var O = a.left,
                        R = a.right,
                        L = a.top,
                        V = a.bottom,
                        W = i.aliasPixel(l.lineWidth);
                    p ? (L = V = 'top' === r.position ? a.bottom : a.top, L += W, V += W) : (O = R = 'left' === r.position ? a.right : a.left, O += W, R += W), l.beginPath(), l.moveTo(O, L), l.lineTo(R, V), l.stroke();
                  }
                }
              }
            });
          };
        }, {}],
        32: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.scaleService = {
              constructors: {},
              defaults: {},
              registerScaleType: function registerScaleType(t, n, i) {
                this.constructors[t] = n, this.defaults[t] = e.clone(i);
              },
              getScaleConstructor: function getScaleConstructor(t) {
                return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0;
              },
              getScaleDefaults: function getScaleDefaults(n) {
                return this.defaults.hasOwnProperty(n) ? e.scaleMerge(t.defaults.scale, this.defaults[n]) : {};
              },
              updateScaleDefaults: function updateScaleDefaults(t, n) {
                var i = this.defaults;
                i.hasOwnProperty(t) && (i[t] = e.extend(i[t], n));
              },
              addScalesToLayout: function addScalesToLayout(n) {
                e.each(n.scales, function (e) {
                  e.fullWidth = e.options.fullWidth, e.position = e.options.position, e.weight = e.options.weight, t.layoutService.addBox(n, e);
                });
              }
            };
          };
        }, {}],
        33: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers;
            t.Ticks = {
              generators: {
                linear: function linear(t, n) {
                  var i,
                      a = [];
                  if (t.stepSize && t.stepSize > 0) i = t.stepSize;else {
                    var r = e.niceNum(n.max - n.min, !1);
                    i = e.niceNum(r / (t.maxTicks - 1), !0);
                  }
                  var o = Math.floor(n.min / i) * i,
                      s = Math.ceil(n.max / i) * i;
                  t.min && t.max && t.stepSize && e.almostWhole((t.max - t.min) / t.stepSize, i / 1000) && (o = t.min, s = t.max);
                  var l = (s - o) / i;
                  l = e.almostEquals(l, Math.round(l), i / 1000) ? Math.round(l) : Math.ceil(l), a.push(void 0 !== t.min ? t.min : o);
                  for (var u = 1; u < l; ++u) {
                    a.push(o + u * i);
                  }return a.push(void 0 !== t.max ? t.max : s), a;
                },
                logarithmic: function logarithmic(t, n) {
                  var i,
                      a,
                      r = [],
                      o = e.getValueOrDefault,
                      s = o(t.min, Math.pow(10, Math.floor(e.log10(n.min)))),
                      l = Math.floor(e.log10(n.max)),
                      u = Math.ceil(n.max / Math.pow(10, l));
                  0 === s ? (i = Math.floor(e.log10(n.minNotZero)), a = Math.floor(n.minNotZero / Math.pow(10, i)), r.push(s), s = a * Math.pow(10, i)) : (i = Math.floor(e.log10(s)), a = Math.floor(s / Math.pow(10, i)));
                  do {
                    r.push(s), ++a, 10 === a && (a = 1, ++i), s = a * Math.pow(10, i);
                  } while (i < l || i === l && a < u);
                  var d = o(t.max, s);
                  return r.push(d), r;
                }
              },
              formatters: {
                values: function values(t) {
                  return e.isArray(t) ? t : '' + t;
                },
                linear: function linear(t, n, i) {
                  var a = i.length > 3 ? i[2] - i[1] : i[1] - i[0];
                  Math.abs(a) > 1 && t !== Math.floor(t) && (a = t - Math.floor(t));
                  var r = e.log10(Math.abs(a)),
                      o = '';
                  if (0 !== t) {
                    var s = -1 * Math.floor(r);
                    s = Math.max(Math.min(s, 20), 0), o = t.toFixed(s);
                  } else o = '0';
                  return o;
                },
                logarithmic: function logarithmic(t, n, i) {
                  var a = t / Math.pow(10, Math.floor(e.log10(t)));
                  return 0 === t ? '0' : 1 === a || 2 === a || 5 === a || 0 === n || n === i.length - 1 ? t.toExponential() : '';
                }
              }
            };
          };
        }, {}],
        34: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              var n = l.color(t);
              return n.alpha(e * n.alpha()).rgbaString();
            }
            function n(t, e) {
              return e && (l.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
            }
            function i(t) {
              var e = t._xScale,
                  n = t._yScale || t._scale,
                  i = t._index,
                  a = t._datasetIndex;
              return {
                xLabel: e ? e.getLabelForIndex(i, a) : '',
                yLabel: n ? n.getLabelForIndex(i, a) : '',
                index: i,
                datasetIndex: a,
                x: t._model.x,
                y: t._model.y
              };
            }
            function a(e) {
              var n = t.defaults.global,
                  i = l.getValueOrDefault;
              return {
                xPadding: e.xPadding,
                yPadding: e.yPadding,
                xAlign: e.xAlign,
                yAlign: e.yAlign,
                bodyFontColor: e.bodyFontColor,
                _bodyFontFamily: i(e.bodyFontFamily, n.defaultFontFamily),
                _bodyFontStyle: i(e.bodyFontStyle, n.defaultFontStyle),
                _bodyAlign: e.bodyAlign,
                bodyFontSize: i(e.bodyFontSize, n.defaultFontSize),
                bodySpacing: e.bodySpacing,
                titleFontColor: e.titleFontColor,
                _titleFontFamily: i(e.titleFontFamily, n.defaultFontFamily),
                _titleFontStyle: i(e.titleFontStyle, n.defaultFontStyle),
                titleFontSize: i(e.titleFontSize, n.defaultFontSize),
                _titleAlign: e.titleAlign,
                titleSpacing: e.titleSpacing,
                titleMarginBottom: e.titleMarginBottom,
                footerFontColor: e.footerFontColor,
                _footerFontFamily: i(e.footerFontFamily, n.defaultFontFamily),
                _footerFontStyle: i(e.footerFontStyle, n.defaultFontStyle),
                footerFontSize: i(e.footerFontSize, n.defaultFontSize),
                _footerAlign: e.footerAlign,
                footerSpacing: e.footerSpacing,
                footerMarginTop: e.footerMarginTop,
                caretSize: e.caretSize,
                cornerRadius: e.cornerRadius,
                backgroundColor: e.backgroundColor,
                opacity: 0,
                legendColorBackground: e.multiKeyBackground,
                displayColors: e.displayColors,
                borderColor: e.borderColor,
                borderWidth: e.borderWidth
              };
            }
            function r(t, e) {
              var n = t._chart.ctx,
                  i = 2 * e.yPadding,
                  a = 0,
                  r = e.body,
                  o = r.reduce(function (t, e) {
                return t + e.before.length + e.lines.length + e.after.length;
              }, 0);
              o += e.beforeBody.length + e.afterBody.length;
              var s = e.title.length,
                  u = e.footer.length,
                  d = e.titleFontSize,
                  c = e.bodyFontSize,
                  h = e.footerFontSize;
              i += s * d, i += s ? (s - 1) * e.titleSpacing : 0, i += s ? e.titleMarginBottom : 0, i += o * c, i += o ? (o - 1) * e.bodySpacing : 0, i += u ? e.footerMarginTop : 0, i += u * h, i += u ? (u - 1) * e.footerSpacing : 0;
              var f = 0,
                  g = function g(t) {
                a = Math.max(a, n.measureText(t).width + f);
              };
              return n.font = l.fontString(d, e._titleFontStyle, e._titleFontFamily), l.each(e.title, g), n.font = l.fontString(c, e._bodyFontStyle, e._bodyFontFamily), l.each(e.beforeBody.concat(e.afterBody), g), f = e.displayColors ? c + 2 : 0, l.each(r, function (t) {
                l.each(t.before, g), l.each(t.lines, g), l.each(t.after, g);
              }), f = 0, n.font = l.fontString(h, e._footerFontStyle, e._footerFontFamily), l.each(e.footer, g), a += 2 * e.xPadding, {
                width: a,
                height: i
              };
            }
            function o(t, e) {
              var n = t._model,
                  i = t._chart,
                  a = t._chart.chartArea,
                  r = 'center',
                  o = 'center';
              n.y < e.height ? o = 'top' : n.y > i.height - e.height && (o = 'bottom');
              var s,
                  l,
                  u,
                  d,
                  c,
                  h = (a.left + a.right) / 2,
                  f = (a.top + a.bottom) / 2;
              'center' === o ? (s = function s(t) {
                return t <= h;
              }, l = function l(t) {
                return t > h;
              }) : (s = function s(t) {
                return t <= e.width / 2;
              }, l = function l(t) {
                return t >= i.width - e.width / 2;
              }), u = function u(t) {
                return t + e.width > i.width;
              }, d = function d(t) {
                return t - e.width < 0;
              }, c = function c(t) {
                return t <= f ? 'top' : 'bottom';
              }, s(n.x) ? (r = 'left', u(n.x) && (r = 'center', o = c(n.y))) : l(n.x) && (r = 'right', d(n.x) && (r = 'center', o = c(n.y)));
              var g = t._options;
              return {
                xAlign: g.xAlign ? g.xAlign : r,
                yAlign: g.yAlign ? g.yAlign : o
              };
            }
            function s(t, e, n) {
              var i = t.x,
                  a = t.y,
                  r = t.caretSize,
                  o = t.caretPadding,
                  s = t.cornerRadius,
                  l = n.xAlign,
                  u = n.yAlign,
                  d = r + o,
                  c = s + o;
              return 'right' === l ? i -= e.width : 'center' === l && (i -= e.width / 2), 'top' === u ? a += d : a -= 'bottom' === u ? e.height + d : e.height / 2, 'center' === u ? 'left' === l ? i += d : 'right' === l && (i -= d) : 'left' === l ? i -= c : 'right' === l && (i += c), {
                x: i,
                y: a
              };
            }
            var l = t.helpers;
            t.defaults.global.tooltips = {
              enabled: !0,
              custom: null,
              mode: 'nearest',
              position: 'average',
              intersect: !0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              titleFontStyle: 'bold',
              titleSpacing: 2,
              titleMarginBottom: 6,
              titleFontColor: '#fff',
              titleAlign: 'left',
              bodySpacing: 2,
              bodyFontColor: '#fff',
              bodyAlign: 'left',
              footerFontStyle: 'bold',
              footerSpacing: 2,
              footerMarginTop: 6,
              footerFontColor: '#fff',
              footerAlign: 'left',
              yPadding: 6,
              xPadding: 6,
              caretPadding: 2,
              caretSize: 5,
              cornerRadius: 6,
              multiKeyBackground: '#fff',
              displayColors: !0,
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 0,
              callbacks: {
                beforeTitle: l.noop,
                title: function title(t, e) {
                  var n = '',
                      i = e.labels,
                      a = i ? i.length : 0;
                  if (t.length > 0) {
                    var r = t[0];
                    r.xLabel ? n = r.xLabel : a > 0 && r.index < a && (n = i[r.index]);
                  }
                  return n;
                },
                afterTitle: l.noop,
                beforeBody: l.noop,
                beforeLabel: l.noop,
                label: function label(t, e) {
                  var n = e.datasets[t.datasetIndex].label || '';
                  return n && (n += ': '), n += t.yLabel;
                },
                labelColor: function labelColor(t, e) {
                  var n = e.getDatasetMeta(t.datasetIndex),
                      i = n.data[t.index],
                      a = i._view;
                  return {
                    borderColor: a.borderColor,
                    backgroundColor: a.backgroundColor
                  };
                },
                afterLabel: l.noop,
                afterBody: l.noop,
                beforeFooter: l.noop,
                footer: l.noop,
                afterFooter: l.noop
              }
            }, t.Tooltip = t.Element.extend({
              initialize: function initialize() {
                this._model = a(this._options);
              },
              getTitle: function getTitle() {
                var t = this,
                    e = t._options,
                    i = e.callbacks,
                    a = i.beforeTitle.apply(t, arguments),
                    r = i.title.apply(t, arguments),
                    o = i.afterTitle.apply(t, arguments),
                    s = [];
                return s = n(s, a), s = n(s, r), s = n(s, o);
              },
              getBeforeBody: function getBeforeBody() {
                var t = this._options.callbacks.beforeBody.apply(this, arguments);
                return l.isArray(t) ? t : void 0 !== t ? [t] : [];
              },
              getBody: function getBody(t, e) {
                var i = this,
                    a = i._options.callbacks,
                    r = [];
                return l.each(t, function (t) {
                  var o = {
                    before: [],
                    lines: [],
                    after: []
                  };
                  n(o.before, a.beforeLabel.call(i, t, e)), n(o.lines, a.label.call(i, t, e)), n(o.after, a.afterLabel.call(i, t, e)), r.push(o);
                }), r;
              },
              getAfterBody: function getAfterBody() {
                var t = this._options.callbacks.afterBody.apply(this, arguments);
                return l.isArray(t) ? t : void 0 !== t ? [t] : [];
              },
              getFooter: function getFooter() {
                var t = this,
                    e = t._options.callbacks,
                    i = e.beforeFooter.apply(t, arguments),
                    a = e.footer.apply(t, arguments),
                    r = e.afterFooter.apply(t, arguments),
                    o = [];
                return o = n(o, i), o = n(o, a), o = n(o, r);
              },
              update: function update(e) {
                var n,
                    u,
                    d = this,
                    c = d._options,
                    h = d._model,
                    f = d._model = a(c),
                    g = d._active,
                    p = d._data,
                    m = {
                  xAlign: h.xAlign,
                  yAlign: h.yAlign
                },
                    v = {
                  x: h.x,
                  y: h.y
                },
                    y = {
                  width: h.width,
                  height: h.height
                },
                    b = {
                  x: h.caretX,
                  y: h.caretY
                };
                if (g.length) {
                  f.opacity = 1;
                  var x = [];
                  b = t.Tooltip.positioners[c.position](g, d._eventPosition);
                  var _ = [];
                  for (n = 0, u = g.length; n < u; ++n) {
                    _.push(i(g[n]));
                  }c.filter && (_ = _.filter(function (t) {
                    return c.filter(t, p);
                  })), c.itemSort && (_ = _.sort(function (t, e) {
                    return c.itemSort(t, e, p);
                  })), l.each(_, function (t) {
                    x.push(c.callbacks.labelColor.call(d, t, d._chart));
                  }), f.title = d.getTitle(_, p), f.beforeBody = d.getBeforeBody(_, p), f.body = d.getBody(_, p), f.afterBody = d.getAfterBody(_, p), f.footer = d.getFooter(_, p), f.x = Math.round(b.x), f.y = Math.round(b.y), f.caretPadding = c.caretPadding, f.labelColors = x, f.dataPoints = _, y = r(this, f), m = o(this, y), v = s(f, y, m);
                } else f.opacity = 0;
                return f.xAlign = m.xAlign, f.yAlign = m.yAlign, f.x = v.x, f.y = v.y, f.width = y.width, f.height = y.height, f.caretX = b.x, f.caretY = b.y, d._model = f, e && c.custom && c.custom.call(d, f), d;
              },
              drawCaret: function drawCaret(t, e) {
                var n = this._chart.ctx,
                    i = this._view,
                    a = this.getCaretPosition(t, e, i);
                n.lineTo(a.x1, a.y1), n.lineTo(a.x2, a.y2), n.lineTo(a.x3, a.y3);
              },
              getCaretPosition: function getCaretPosition(t, e, n) {
                var i,
                    a,
                    r,
                    o,
                    s,
                    l,
                    u = n.caretSize,
                    d = n.cornerRadius,
                    c = n.xAlign,
                    h = n.yAlign,
                    f = t.x,
                    g = t.y,
                    p = e.width,
                    m = e.height;
                if ('center' === h) s = g + m / 2, 'left' === c ? (i = f, a = i - u, r = i, o = s + u, l = s - u) : (i = f + p, a = i + u, r = i, o = s - u, l = s + u);else if ('left' === c ? (a = f + d + u, i = a - u, r = a + u) : 'right' === c ? (a = f + p - d - u, i = a - u, r = a + u) : (a = f + p / 2, i = a - u, r = a + u), 'top' === h) o = g, s = o - u, l = o;else {
                  o = g + m, s = o + u, l = o;
                  var v = r;
                  r = i, i = v;
                }
                return {
                  x1: i,
                  x2: a,
                  x3: r,
                  y1: o,
                  y2: s,
                  y3: l
                };
              },
              drawTitle: function drawTitle(t, n, i, a) {
                var r = n.title;
                if (r.length) {
                  i.textAlign = n._titleAlign, i.textBaseline = 'top';
                  var o = n.titleFontSize,
                      s = n.titleSpacing;
                  i.fillStyle = e(n.titleFontColor, a), i.font = l.fontString(o, n._titleFontStyle, n._titleFontFamily);
                  var u, d;
                  for (u = 0, d = r.length; u < d; ++u) {
                    i.fillText(r[u], t.x, t.y), t.y += o + s, u + 1 === r.length && (t.y += n.titleMarginBottom - s);
                  }
                }
              },
              drawBody: function drawBody(t, n, i, a) {
                var r = n.bodyFontSize,
                    o = n.bodySpacing,
                    s = n.body;
                i.textAlign = n._bodyAlign, i.textBaseline = 'top';
                var u = e(n.bodyFontColor, a);
                i.fillStyle = u, i.font = l.fontString(r, n._bodyFontStyle, n._bodyFontFamily);
                var d = 0,
                    c = function c(e) {
                  i.fillText(e, t.x + d, t.y), t.y += r + o;
                };
                l.each(n.beforeBody, c);
                var h = n.displayColors;
                d = h ? r + 2 : 0, l.each(s, function (o, s) {
                  l.each(o.before, c), l.each(o.lines, function (o) {
                    h && (i.fillStyle = e(n.legendColorBackground, a), i.fillRect(t.x, t.y, r, r), i.strokeStyle = e(n.labelColors[s].borderColor, a), i.strokeRect(t.x, t.y, r, r), i.fillStyle = e(n.labelColors[s].backgroundColor, a), i.fillRect(t.x + 1, t.y + 1, r - 2, r - 2), i.fillStyle = u), c(o);
                  }), l.each(o.after, c);
                }), d = 0, l.each(n.afterBody, c), t.y -= o;
              },
              drawFooter: function drawFooter(t, n, i, a) {
                var r = n.footer;
                r.length && (t.y += n.footerMarginTop, i.textAlign = n._footerAlign, i.textBaseline = 'top', i.fillStyle = e(n.footerFontColor, a), i.font = l.fontString(n.footerFontSize, n._footerFontStyle, n._footerFontFamily), l.each(r, function (e) {
                  i.fillText(e, t.x, t.y), t.y += n.footerFontSize + n.footerSpacing;
                }));
              },
              drawBackground: function drawBackground(t, n, i, a, r) {
                i.fillStyle = e(n.backgroundColor, r), i.strokeStyle = e(n.borderColor, r), i.lineWidth = n.borderWidth;
                var o = n.xAlign,
                    s = n.yAlign,
                    l = t.x,
                    u = t.y,
                    d = a.width,
                    c = a.height,
                    h = n.cornerRadius;
                i.beginPath(), i.moveTo(l + h, u), 'top' === s && this.drawCaret(t, a), i.lineTo(l + d - h, u), i.quadraticCurveTo(l + d, u, l + d, u + h), 'center' === s && 'right' === o && this.drawCaret(t, a), i.lineTo(l + d, u + c - h), i.quadraticCurveTo(l + d, u + c, l + d - h, u + c), 'bottom' === s && this.drawCaret(t, a), i.lineTo(l + h, u + c), i.quadraticCurveTo(l, u + c, l, u + c - h), 'center' === s && 'left' === o && this.drawCaret(t, a), i.lineTo(l, u + h), i.quadraticCurveTo(l, u, l + h, u), i.closePath(), i.fill(), n.borderWidth > 0 && i.stroke();
              },
              draw: function draw() {
                var t = this._chart.ctx,
                    e = this._view;
                if (0 !== e.opacity) {
                  var n = {
                    width: e.width,
                    height: e.height
                  },
                      i = {
                    x: e.x,
                    y: e.y
                  },
                      a = Math.abs(e.opacity < 0.001) ? 0 : e.opacity,
                      r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;
                  this._options.enabled && r && (this.drawBackground(i, e, t, n, a), i.x += e.xPadding, i.y += e.yPadding, this.drawTitle(i, e, t, a), this.drawBody(i, e, t, a), this.drawFooter(i, e, t, a));
                }
              },
              handleEvent: function handleEvent(t) {
                var e = this,
                    n = e._options,
                    i = !1;
                if (e._lastActive = e._lastActive || [], 'mouseout' === t.type ? e._active = [] : e._active = e._chart.getElementsAtEventForMode(t, n.mode, n), i = !l.arrayEquals(e._active, e._lastActive), !i) return !1;
                if (e._lastActive = e._active, n.enabled || n.custom) {
                  e._eventPosition = {
                    x: t.x,
                    y: t.y
                  };
                  var a = e._model;
                  e.update(!0), e.pivot(), i |= a.x !== e._model.x || a.y !== e._model.y;
                }
                return i;
              }
            }), t.Tooltip.positioners = {
              average: function average(t) {
                if (!t.length) return !1;
                var e,
                    n,
                    i = 0,
                    a = 0,
                    r = 0;
                for (e = 0, n = t.length; e < n; ++e) {
                  var o = t[e];
                  if (o && o.hasValue()) {
                    var s = o.tooltipPosition();
                    i += s.x, a += s.y, ++r;
                  }
                }
                return {
                  x: Math.round(i / r),
                  y: Math.round(a / r)
                };
              },
              nearest: function nearest(t, e) {
                var n,
                    i,
                    a,
                    r = e.x,
                    o = e.y,
                    s = Number.POSITIVE_INFINITY;
                for (i = 0, a = t.length; i < a; ++i) {
                  var u = t[i];
                  if (u && u.hasValue()) {
                    var d = u.getCenterPoint(),
                        c = l.distanceBetweenPoints(e, d);
                    c < s && (s = c, n = u);
                  }
                }
                if (n) {
                  var h = n.tooltipPosition();
                  r = h.x, o = h.y;
                }
                return {
                  x: r,
                  y: o
                };
              }
            };
          };
        }, {}],
        35: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = t.defaults.global;
            n.elements.arc = {
              backgroundColor: n.defaultColor,
              borderColor: '#fff',
              borderWidth: 2
            }, t.elements.Arc = t.Element.extend({
              inLabelRange: function inLabelRange(t) {
                var e = this._view;
                return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2);
              },
              inRange: function inRange(t, n) {
                var i = this._view;
                if (i) {
                  for (var a = e.getAngleFromPoint(i, {
                    x: t,
                    y: n
                  }), r = a.angle, o = a.distance, s = i.startAngle, l = i.endAngle; l < s;) {
                    l += 2 * Math.PI;
                  }for (; r > l;) {
                    r -= 2 * Math.PI;
                  }for (; r < s;) {
                    r += 2 * Math.PI;
                  }var u = r >= s && r <= l,
                      d = o >= i.innerRadius && o <= i.outerRadius;
                  return u && d;
                }
                return !1;
              },
              getCenterPoint: function getCenterPoint() {
                var t = this._view,
                    e = (t.startAngle + t.endAngle) / 2,
                    n = (t.innerRadius + t.outerRadius) / 2;
                return {
                  x: t.x + Math.cos(e) * n,
                  y: t.y + Math.sin(e) * n
                };
              },
              getArea: function getArea() {
                var t = this._view;
                return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2));
              },
              tooltipPosition: function tooltipPosition() {
                var t = this._view,
                    e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                    n = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                return {
                  x: t.x + Math.cos(e) * n,
                  y: t.y + Math.sin(e) * n
                };
              },
              draw: function draw() {
                var t = this._chart.ctx,
                    e = this._view,
                    n = e.startAngle,
                    i = e.endAngle;
                t.beginPath(), t.arc(e.x, e.y, e.outerRadius, n, i), t.arc(e.x, e.y, e.innerRadius, i, n, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = 'bevel', e.borderWidth && t.stroke();
              }
            });
          };
        }, {}],
        36: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = t.defaults.global;
            t.defaults.global.elements.line = {
              tension: 0.4,
              backgroundColor: n.defaultColor,
              borderWidth: 3,
              borderColor: n.defaultColor,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0,
              borderJoinStyle: 'miter',
              capBezierPoints: !0,
              fill: !0
            }, t.elements.Line = t.Element.extend({
              draw: function draw() {
                var t,
                    i,
                    a,
                    r,
                    o = this,
                    s = o._view,
                    l = o._chart.ctx,
                    u = s.spanGaps,
                    d = o._children.slice(),
                    c = n.elements.line,
                    h = -1;
                for (o._loop && d.length && d.push(d[0]), l.save(), l.lineCap = s.borderCapStyle || c.borderCapStyle, l.setLineDash && l.setLineDash(s.borderDash || c.borderDash), l.lineDashOffset = s.borderDashOffset || c.borderDashOffset, l.lineJoin = s.borderJoinStyle || c.borderJoinStyle, l.lineWidth = s.borderWidth || c.borderWidth, l.strokeStyle = s.borderColor || n.defaultColor, l.beginPath(), h = -1, t = 0; t < d.length; ++t) {
                  i = d[t], a = e.previousItem(d, t), r = i._view, 0 === t ? r.skip || (l.moveTo(r.x, r.y), h = t) : (a = h === -1 ? a : d[h], r.skip || (h !== t - 1 && !u || h === -1 ? l.moveTo(r.x, r.y) : e.canvas.lineTo(l, a._view, i._view), h = t));
                }l.stroke(), l.restore();
              }
            });
          };
        }, {}],
        37: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t) {
              var e = this._view;
              return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2);
            }
            function n(t) {
              var e = this._view;
              return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2);
            }
            var i = t.helpers,
                a = t.defaults.global,
                r = a.defaultColor;
            a.elements.point = {
              radius: 3,
              pointStyle: 'circle',
              backgroundColor: r,
              borderWidth: 1,
              borderColor: r,
              hitRadius: 1,
              hoverRadius: 4,
              hoverBorderWidth: 1
            }, t.elements.Point = t.Element.extend({
              inRange: function inRange(t, e) {
                var n = this._view;
                return !!n && Math.pow(t - n.x, 2) + Math.pow(e - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2);
              },
              inLabelRange: e,
              inXRange: e,
              inYRange: n,
              getCenterPoint: function getCenterPoint() {
                var t = this._view;
                return {
                  x: t.x,
                  y: t.y
                };
              },
              getArea: function getArea() {
                return Math.PI * Math.pow(this._view.radius, 2);
              },
              tooltipPosition: function tooltipPosition() {
                var t = this._view;
                return {
                  x: t.x,
                  y: t.y,
                  padding: t.radius + t.borderWidth
                };
              },
              draw: function draw(e) {
                var n = this._view,
                    o = this._model,
                    s = this._chart.ctx,
                    l = n.pointStyle,
                    u = n.radius,
                    d = n.x,
                    c = n.y,
                    h = t.helpers.color,
                    f = 1.01,
                    g = 0;
                n.skip || (s.strokeStyle = n.borderColor || r, s.lineWidth = i.getValueOrDefault(n.borderWidth, a.elements.point.borderWidth), s.fillStyle = n.backgroundColor || r, void 0 !== e && (o.x < e.left || e.right * f < o.x || o.y < e.top || e.bottom * f < o.y) && (o.x < e.left ? g = (d - o.x) / (e.left - o.x) : e.right * f < o.x ? g = (o.x - d) / (o.x - e.right) : o.y < e.top ? g = (c - o.y) / (e.top - o.y) : e.bottom * f < o.y && (g = (o.y - c) / (o.y - e.bottom)), g = Math.round(100 * g) / 100, s.strokeStyle = h(s.strokeStyle).alpha(g).rgbString(), s.fillStyle = h(s.fillStyle).alpha(g).rgbString()), t.canvasHelpers.drawPoint(s, l, u, d, c));
              }
            });
          };
        }, {}],
        38: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t) {
              return void 0 !== t._view.width;
            }
            function n(t) {
              var n,
                  i,
                  a,
                  r,
                  o = t._view;
              if (e(t)) {
                var s = o.width / 2;
                n = o.x - s, i = o.x + s, a = Math.min(o.y, o.base), r = Math.max(o.y, o.base);
              } else {
                var l = o.height / 2;
                n = Math.min(o.x, o.base), i = Math.max(o.x, o.base), a = o.y - l, r = o.y + l;
              }
              return {
                left: n,
                top: a,
                right: i,
                bottom: r
              };
            }
            var i = t.defaults.global;
            i.elements.rectangle = {
              backgroundColor: i.defaultColor,
              borderWidth: 0,
              borderColor: i.defaultColor,
              borderSkipped: 'bottom'
            }, t.elements.Rectangle = t.Element.extend({
              draw: function draw() {
                function t(t) {
                  return v[(b + t) % 4];
                }
                var e,
                    n,
                    i,
                    a,
                    r,
                    o,
                    s,
                    l = this._chart.ctx,
                    u = this._view,
                    d = u.borderWidth;
                if (u.horizontal ? (e = u.base, n = u.x, i = u.y - u.height / 2, a = u.y + u.height / 2, r = n > e ? 1 : -1, o = 1, s = u.borderSkipped || 'left') : (e = u.x - u.width / 2, n = u.x + u.width / 2, i = u.y, a = u.base, r = 1, o = a > i ? 1 : -1, s = u.borderSkipped || 'bottom'), d) {
                  var c = Math.min(Math.abs(e - n), Math.abs(i - a));
                  d = d > c ? c : d;
                  var h = d / 2,
                      f = e + ('left' !== s ? h * r : 0),
                      g = n + ('right' !== s ? -h * r : 0),
                      p = i + ('top' !== s ? h * o : 0),
                      m = a + ('bottom' !== s ? -h * o : 0);
                  f !== g && (i = p, a = m), p !== m && (e = f, n = g);
                }
                l.beginPath(), l.fillStyle = u.backgroundColor, l.strokeStyle = u.borderColor, l.lineWidth = d;
                var v = [[e, a], [e, i], [n, i], [n, a]],
                    y = ['bottom', 'left', 'top', 'right'],
                    b = y.indexOf(s, 0);
                b === -1 && (b = 0);
                var x = t(0);
                l.moveTo(x[0], x[1]);
                for (var _ = 1; _ < 4; _++) {
                  x = t(_), l.lineTo(x[0], x[1]);
                }l.fill(), d && l.stroke();
              },
              height: function height() {
                var t = this._view;
                return t.base - t.y;
              },
              inRange: function inRange(t, e) {
                var i = !1;
                if (this._view) {
                  var a = n(this);
                  i = t >= a.left && t <= a.right && e >= a.top && e <= a.bottom;
                }
                return i;
              },
              inLabelRange: function inLabelRange(t, i) {
                var a = this;
                if (!a._view) return !1;
                var r = !1,
                    o = n(a);
                return r = e(a) ? t >= o.left && t <= o.right : i >= o.top && i <= o.bottom;
              },
              inXRange: function inXRange(t) {
                var e = n(this);
                return t >= e.left && t <= e.right;
              },
              inYRange: function inYRange(t) {
                var e = n(this);
                return t >= e.top && t <= e.bottom;
              },
              getCenterPoint: function getCenterPoint() {
                var t,
                    n,
                    i = this._view;
                return e(this) ? (t = i.x, n = (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, n = i.y), {
                  x: t,
                  y: n
                };
              },
              getArea: function getArea() {
                var t = this._view;
                return t.width * Math.abs(t.y - t.base);
              },
              tooltipPosition: function tooltipPosition() {
                var t = this._view;
                return {
                  x: t.x,
                  y: t.y
                };
              }
            });
          };
        }, {}],
        39: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              var n = l.getStyle(t, e),
                  i = n && n.match(/^(\d+)(\.\d+)?px$/);
              return i ? Number(i[1]) : void 0;
            }
            function n(t, n) {
              var i = t.style,
                  a = t.getAttribute('height'),
                  r = t.getAttribute('width');
              if (t._chartjs = {
                initial: {
                  height: a,
                  width: r,
                  style: {
                    display: i.display,
                    height: i.height,
                    width: i.width
                  }
                }
              }, i.display = i.display || 'block', null === r || '' === r) {
                var o = e(t, 'width');
                void 0 !== o && (t.width = o);
              }
              if (null === a || '' === a) if ('' === t.style.height) t.height = t.width / (n.options.aspectRatio || 2);else {
                var s = e(t, 'height');
                void 0 !== o && (t.height = s);
              }
              return t;
            }
            function i(t, e, n, i, a) {
              return {
                type: t,
                chart: e,
                native: a || null,
                x: void 0 !== n ? n : null,
                y: void 0 !== i ? i : null
              };
            }
            function a(t, e) {
              var n = u[t.type] || t.type,
                  a = l.getRelativePosition(t, e);
              return i(n, e, a.x, a.y, t);
            }
            function r(t) {
              var e = document.createElement('iframe');
              return e.className = 'chartjs-hidden-iframe', e.style.cssText = 'display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;', e.tabIndex = -1, l.addEvent(e, 'load', function () {
                l.addEvent(e.contentWindow || e, 'resize', t), t();
              }), e;
            }
            function o(t, e, n) {
              var a = t._chartjs = { ticking: !1 },
                  o = function o() {
                a.ticking || (a.ticking = !0, l.requestAnimFrame.call(window, function () {
                  if (a.resizer) return a.ticking = !1, e(i('resize', n));
                }));
              };
              a.resizer = r(o), t.insertBefore(a.resizer, t.firstChild);
            }
            function s(t) {
              if (t && t._chartjs) {
                var e = t._chartjs.resizer;
                e && (e.parentNode.removeChild(e), t._chartjs.resizer = null), delete t._chartjs;
              }
            }
            var l = t.helpers,
                u = {
              touchstart: 'mousedown',
              touchmove: 'mousemove',
              touchend: 'mouseup',
              pointerenter: 'mouseenter',
              pointerdown: 'mousedown',
              pointermove: 'mousemove',
              pointerup: 'mouseup',
              pointerleave: 'mouseout',
              pointerout: 'mouseout'
            };
            return {
              acquireContext: function acquireContext(t, e) {
                'string' == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas);
                var i = t && t.getContext && t.getContext('2d');
                return i && i.canvas === t ? (n(t, e), i) : null;
              },
              releaseContext: function releaseContext(t) {
                var e = t.canvas;
                if (e._chartjs) {
                  var n = e._chartjs.initial;
                  ['height', 'width'].forEach(function (t) {
                    var i = n[t];
                    void 0 === i || null === i ? e.removeAttribute(t) : e.setAttribute(t, i);
                  }), l.each(n.style || {}, function (t, n) {
                    e.style[n] = t;
                  }), e.width = e.width, delete e._chartjs;
                }
              },
              addEventListener: function addEventListener(t, e, n) {
                var i = t.canvas;
                if ('resize' === e) return void o(i.parentNode, n, t);
                var r = n._chartjs || (n._chartjs = {}),
                    s = r.proxies || (r.proxies = {}),
                    u = s[t.id + '_' + e] = function (e) {
                  n(a(e, t));
                };
                l.addEvent(i, e, u);
              },
              removeEventListener: function removeEventListener(t, e, n) {
                var i = t.canvas;
                if ('resize' === e) return void s(i.parentNode, n);
                var a = n._chartjs || {},
                    r = a.proxies || {},
                    o = r[t.id + '_' + e];
                o && l.removeEvent(i, e, o);
              }
            };
          };
        }, {}],
        40: [function (t, e, n) {
          'use strict';

          var i = t(39);
          e.exports = function (t) {
            t.platform = {
              acquireContext: function acquireContext() {},
              releaseContext: function releaseContext() {},
              addEventListener: function addEventListener() {},
              removeEventListener: function removeEventListener() {}
            }, t.helpers.extend(t.platform, i(t));
          };
        }, { 39: 39 }],
        41: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e, n) {
              var i,
                  a = t._model || {},
                  r = a.fill;
              if (void 0 === r && (r = !!a.backgroundColor), r === !1 || null === r) return !1;
              if (r === !0) return 'origin';
              if (i = parseFloat(r, 10), isFinite(i) && Math.floor(i) === i) return '-' !== r[0] && '+' !== r[0] || (i = e + i), !(i === e || i < 0 || i >= n) && i;
              switch (r) {
                case 'bottom':
                  return 'start';
                case 'top':
                  return 'end';
                case 'zero':
                  return 'origin';
                case 'origin':
                case 'start':
                case 'end':
                  return r;
                default:
                  return !1;
              }
            }
            function n(t) {
              var e,
                  n = t.el._model || {},
                  i = t.el._scale || {},
                  a = t.fill,
                  r = null;
              if (isFinite(a)) return null;
              if ('start' === a ? r = void 0 === n.scaleBottom ? i.bottom : n.scaleBottom : 'end' === a ? r = void 0 === n.scaleTop ? i.top : n.scaleTop : void 0 !== n.scaleZero ? r = n.scaleZero : i.getBasePosition ? r = i.getBasePosition() : i.getBasePixel && (r = i.getBasePixel()), void 0 !== r && null !== r) {
                if (void 0 !== r.x && void 0 !== r.y) return r;
                if ('number' == typeof r && isFinite(r)) return e = i.isHorizontal(), {
                  x: e ? r : null,
                  y: e ? null : r
                };
              }
              return null;
            }
            function i(t, e, n) {
              var i,
                  a = t[e],
                  r = a.fill,
                  o = [e];
              if (!n) return r;
              for (; r !== !1 && o.indexOf(r) === -1;) {
                if (!isFinite(r)) return r;
                if (i = t[r], !i) return !1;
                if (i.visible) return r;
                o.push(r), r = i.fill;
              }
              return !1;
            }
            function a(t) {
              var e = t.fill,
                  n = 'dataset';
              return e === !1 ? null : (isFinite(e) || (n = 'boundary'), d[n](t));
            }
            function r(t) {
              return t && !t.skip;
            }
            function o(t, e, n, i, a) {
              var r;
              if (i && a) {
                for (t.moveTo(e[0].x, e[0].y), r = 1; r < i; ++r) {
                  u.canvas.lineTo(t, e[r - 1], e[r]);
                }for (t.lineTo(n[a - 1].x, n[a - 1].y), r = a - 1; r > 0; --r) {
                  u.canvas.lineTo(t, n[r], n[r - 1], !0);
                }
              }
            }
            function s(t, e, n, i, a, s) {
              var l,
                  u,
                  d,
                  c,
                  h,
                  f,
                  g,
                  p = e.length,
                  m = i.spanGaps,
                  v = [],
                  y = [],
                  b = 0,
                  x = 0;
              for (t.beginPath(), l = 0, u = p + !!s; l < u; ++l) {
                d = l % p, c = e[d]._view, h = n(c, d, i), f = r(c), g = r(h), f && g ? (b = v.push(c), x = y.push(h)) : b && x && (m ? (f && v.push(c), g && y.push(h)) : (o(t, v, y, b, x), b = x = 0, v = [], y = []));
              }o(t, v, y, b, x), t.closePath(), t.fillStyle = a, t.fill();
            }
            t.defaults.global.plugins.filler = { propagate: !0 };
            var l = t.defaults,
                u = t.helpers,
                d = {
              dataset: function dataset(t) {
                var e = t.fill,
                    n = t.chart,
                    i = n.getDatasetMeta(e),
                    a = i && n.isDatasetVisible(e),
                    r = a && i.dataset._children || [];
                return r.length ? function (t, e) {
                  return r[e]._view || null;
                } : null;
              },
              boundary: function boundary(t) {
                var e = t.boundary,
                    n = e ? e.x : null,
                    i = e ? e.y : null;
                return function (t) {
                  return {
                    x: null === n ? t.x : n,
                    y: null === i ? t.y : i
                  };
                };
              }
            };
            return {
              id: 'filler',
              afterDatasetsUpdate: function afterDatasetsUpdate(r, o) {
                var s,
                    l,
                    u,
                    d,
                    c = (r.data.datasets || []).length,
                    h = o.propagate,
                    f = [];
                for (l = 0; l < c; ++l) {
                  s = r.getDatasetMeta(l), u = s.dataset, d = null, u && u._model && u instanceof t.elements.Line && (d = {
                    visible: r.isDatasetVisible(l),
                    fill: e(u, l, c),
                    chart: r,
                    el: u
                  }), s.$filler = d, f.push(d);
                }for (l = 0; l < c; ++l) {
                  d = f[l], d && (d.fill = i(f, l, h), d.boundary = n(d), d.mapper = a(d));
                }
              },
              beforeDatasetDraw: function beforeDatasetDraw(t, e) {
                var n = e.meta.$filler;
                if (n) {
                  var i = n.el,
                      a = i._view,
                      r = i._children || [],
                      o = n.mapper,
                      u = a.backgroundColor || l.global.defaultColor;
                  o && u && r.length && s(t.ctx, r, o, a, u, i._loop);
                }
              }
            };
          };
        }, {}],
        42: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t, e) {
              return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth;
            }
            function n(e, n) {
              var i = new t.Legend({
                ctx: e.ctx,
                options: n,
                chart: e
              });
              a.configure(e, i, n), a.addBox(e, i), e.legend = i;
            }
            var i = t.helpers,
                a = t.layoutService,
                r = i.noop;
            return t.defaults.global.legend = {
              display: !0,
              position: 'top',
              fullWidth: !0,
              reverse: !1,
              weight: 1000,
              onClick: function onClick(t, e) {
                var n = e.datasetIndex,
                    i = this.chart,
                    a = i.getDatasetMeta(n);
                a.hidden = null === a.hidden ? !i.data.datasets[n].hidden : null, i.update();
              },
              onHover: null,
              labels: {
                boxWidth: 40,
                padding: 10,
                generateLabels: function generateLabels(t) {
                  var e = t.data;
                  return i.isArray(e.datasets) ? e.datasets.map(function (e, n) {
                    return {
                      text: e.label,
                      fillStyle: i.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor,
                      hidden: !t.isDatasetVisible(n),
                      lineCap: e.borderCapStyle,
                      lineDash: e.borderDash,
                      lineDashOffset: e.borderDashOffset,
                      lineJoin: e.borderJoinStyle,
                      lineWidth: e.borderWidth,
                      strokeStyle: e.borderColor,
                      pointStyle: e.pointStyle,
                      datasetIndex: n
                    };
                  }, this) : [];
                }
              }
            }, t.Legend = t.Element.extend({
              initialize: function initialize(t) {
                i.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1;
              },
              beforeUpdate: r,
              update: function update(t, e, n) {
                var i = this;
                return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize;
              },
              afterUpdate: r,
              beforeSetDimensions: r,
              setDimensions: function setDimensions() {
                var t = this;
                t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                  width: 0,
                  height: 0
                };
              },
              afterSetDimensions: r,
              beforeBuildLabels: r,
              buildLabels: function buildLabels() {
                var t = this,
                    e = t.options.labels,
                    n = e.generateLabels.call(t, t.chart);
                e.filter && (n = n.filter(function (n) {
                  return e.filter(n, t.chart.data);
                })), t.options.reverse && n.reverse(), t.legendItems = n;
              },
              afterBuildLabels: r,
              beforeFit: r,
              fit: function fit() {
                var n = this,
                    a = n.options,
                    r = a.labels,
                    o = a.display,
                    s = n.ctx,
                    l = t.defaults.global,
                    u = i.getValueOrDefault,
                    d = u(r.fontSize, l.defaultFontSize),
                    c = u(r.fontStyle, l.defaultFontStyle),
                    h = u(r.fontFamily, l.defaultFontFamily),
                    f = i.fontString(d, c, h),
                    g = n.legendHitBoxes = [],
                    p = n.minSize,
                    m = n.isHorizontal();
                if (m ? (p.width = n.maxWidth, p.height = o ? 10 : 0) : (p.width = o ? 10 : 0, p.height = n.maxHeight), o) if (s.font = f, m) {
                  var v = n.lineWidths = [0],
                      y = n.legendItems.length ? d + r.padding : 0;
                  s.textAlign = 'left', s.textBaseline = 'top', i.each(n.legendItems, function (t, i) {
                    var a = e(r, d),
                        o = a + d / 2 + s.measureText(t.text).width;
                    v[v.length - 1] + o + r.padding >= n.width && (y += d + r.padding, v[v.length] = n.left), g[i] = {
                      left: 0,
                      top: 0,
                      width: o,
                      height: d
                    }, v[v.length - 1] += o + r.padding;
                  }), p.height += y;
                } else {
                  var b = r.padding,
                      x = n.columnWidths = [],
                      _ = r.padding,
                      k = 0,
                      w = 0,
                      M = d + b;
                  i.each(n.legendItems, function (t, n) {
                    var i = e(r, d),
                        a = i + d / 2 + s.measureText(t.text).width;
                    w + M > p.height && (_ += k + r.padding, x.push(k), k = 0, w = 0), k = Math.max(k, a), w += M, g[n] = {
                      left: 0,
                      top: 0,
                      width: a,
                      height: d
                    };
                  }), _ += k, x.push(k), p.width += _;
                }
                n.width = p.width, n.height = p.height;
              },
              afterFit: r,
              isHorizontal: function isHorizontal() {
                return 'top' === this.options.position || 'bottom' === this.options.position;
              },
              draw: function draw() {
                var n = this,
                    a = n.options,
                    r = a.labels,
                    o = t.defaults.global,
                    s = o.elements.line,
                    l = n.width,
                    u = n.lineWidths;
                if (a.display) {
                  var d,
                      c = n.ctx,
                      h = i.getValueOrDefault,
                      f = h(r.fontColor, o.defaultFontColor),
                      g = h(r.fontSize, o.defaultFontSize),
                      p = h(r.fontStyle, o.defaultFontStyle),
                      m = h(r.fontFamily, o.defaultFontFamily),
                      v = i.fontString(g, p, m);
                  c.textAlign = 'left', c.textBaseline = 'top', c.lineWidth = 0.5, c.strokeStyle = f, c.fillStyle = f, c.font = v;
                  var y = e(r, g),
                      b = n.legendHitBoxes,
                      x = function x(e, n, i) {
                    if (!(isNaN(y) || y <= 0)) {
                      c.save(), c.fillStyle = h(i.fillStyle, o.defaultColor), c.lineCap = h(i.lineCap, s.borderCapStyle), c.lineDashOffset = h(i.lineDashOffset, s.borderDashOffset), c.lineJoin = h(i.lineJoin, s.borderJoinStyle), c.lineWidth = h(i.lineWidth, s.borderWidth), c.strokeStyle = h(i.strokeStyle, o.defaultColor);
                      var r = 0 === h(i.lineWidth, s.borderWidth);
                      if (c.setLineDash && c.setLineDash(h(i.lineDash, s.borderDash)), a.labels && a.labels.usePointStyle) {
                        var l = g * Math.SQRT2 / 2,
                            u = l / Math.SQRT2,
                            d = e + u,
                            f = n + u;
                        t.canvasHelpers.drawPoint(c, i.pointStyle, l, d, f);
                      } else r || c.strokeRect(e, n, y, g), c.fillRect(e, n, y, g);
                      c.restore();
                    }
                  },
                      _ = function _(t, e, n, i) {
                    c.fillText(n.text, y + g / 2 + t, e), n.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(y + g / 2 + t, e + g / 2), c.lineTo(y + g / 2 + t + i, e + g / 2), c.stroke());
                  },
                      k = n.isHorizontal();
                  d = k ? {
                    x: n.left + (l - u[0]) / 2,
                    y: n.top + r.padding,
                    line: 0
                  } : {
                    x: n.left + r.padding,
                    y: n.top + r.padding,
                    line: 0
                  };
                  var w = g + r.padding;
                  i.each(n.legendItems, function (t, e) {
                    var i = c.measureText(t.text).width,
                        a = y + g / 2 + i,
                        o = d.x,
                        s = d.y;
                    k ? o + a >= l && (s = d.y += w, d.line++, o = d.x = n.left + (l - u[d.line]) / 2) : s + w > n.bottom && (o = d.x = o + n.columnWidths[d.line] + r.padding, s = d.y = n.top + r.padding, d.line++), x(o, s, t), b[e].left = o, b[e].top = s, _(o, s, t, i), k ? d.x += a + r.padding : d.y += w;
                  });
                }
              },
              handleEvent: function handleEvent(t) {
                var e = this,
                    n = e.options,
                    i = 'mouseup' === t.type ? 'click' : t.type,
                    a = !1;
                if ('mousemove' === i) {
                  if (!n.onHover) return;
                } else {
                  if ('click' !== i) return;
                  if (!n.onClick) return;
                }
                var r = t.x,
                    o = t.y;
                if (r >= e.left && r <= e.right && o >= e.top && o <= e.bottom) for (var s = e.legendHitBoxes, l = 0; l < s.length; ++l) {
                  var u = s[l];
                  if (r >= u.left && r <= u.left + u.width && o >= u.top && o <= u.top + u.height) {
                    if ('click' === i) {
                      n.onClick.call(e, t.native, e.legendItems[l]), a = !0;
                      break;
                    }
                    if ('mousemove' === i) {
                      n.onHover.call(e, t.native, e.legendItems[l]), a = !0;
                      break;
                    }
                  }
                }
                return a;
              }
            }), {
              id: 'legend',
              beforeInit: function beforeInit(t) {
                var e = t.options.legend;
                e && n(t, e);
              },
              beforeUpdate: function beforeUpdate(e) {
                var r = e.options.legend,
                    o = e.legend;
                r ? (r = i.configMerge(t.defaults.global.legend, r), o ? (a.configure(e, o, r), o.options = r) : n(e, r)) : o && (a.removeBox(e, o), delete e.legend);
              },
              afterEvent: function afterEvent(t, e) {
                var n = t.legend;
                n && n.handleEvent(e);
              }
            };
          };
        }, {}],
        43: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(e, n) {
              var a = new t.Title({
                ctx: e.ctx,
                options: n,
                chart: e
              });
              i.configure(e, a, n), i.addBox(e, a), e.titleBlock = a;
            }
            var n = t.helpers,
                i = t.layoutService,
                a = n.noop;
            return t.defaults.global.title = {
              display: !1,
              position: 'top',
              fullWidth: !0,
              weight: 2000,
              fontStyle: 'bold',
              padding: 10,
              text: ''
            }, t.Title = t.Element.extend({
              initialize: function initialize(t) {
                var e = this;
                n.extend(e, t), e.legendHitBoxes = [];
              },
              beforeUpdate: a,
              update: function update(t, e, n) {
                var i = this;
                return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize;
              },
              afterUpdate: a,
              beforeSetDimensions: a,
              setDimensions: function setDimensions() {
                var t = this;
                t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                  width: 0,
                  height: 0
                };
              },
              afterSetDimensions: a,
              beforeBuildLabels: a,
              buildLabels: a,
              afterBuildLabels: a,
              beforeFit: a,
              fit: function fit() {
                var e = this,
                    i = n.getValueOrDefault,
                    a = e.options,
                    r = t.defaults.global,
                    o = a.display,
                    s = i(a.fontSize, r.defaultFontSize),
                    l = e.minSize;
                e.isHorizontal() ? (l.width = e.maxWidth, l.height = o ? s + 2 * a.padding : 0) : (l.width = o ? s + 2 * a.padding : 0, l.height = e.maxHeight), e.width = l.width, e.height = l.height;
              },
              afterFit: a,
              isHorizontal: function isHorizontal() {
                var t = this.options.position;
                return 'top' === t || 'bottom' === t;
              },
              draw: function draw() {
                var e = this,
                    i = e.ctx,
                    a = n.getValueOrDefault,
                    r = e.options,
                    o = t.defaults.global;
                if (r.display) {
                  var s,
                      l,
                      u,
                      d = a(r.fontSize, o.defaultFontSize),
                      c = a(r.fontStyle, o.defaultFontStyle),
                      h = a(r.fontFamily, o.defaultFontFamily),
                      f = n.fontString(d, c, h),
                      g = 0,
                      p = e.top,
                      m = e.left,
                      v = e.bottom,
                      y = e.right;
                  i.fillStyle = a(r.fontColor, o.defaultFontColor), i.font = f, e.isHorizontal() ? (s = m + (y - m) / 2, l = p + (v - p) / 2, u = y - m) : (s = 'left' === r.position ? m + d / 2 : y - d / 2, l = p + (v - p) / 2, u = v - p, g = Math.PI * ('left' === r.position ? -0.5 : 0.5)), i.save(), i.translate(s, l), i.rotate(g), i.textAlign = 'center', i.textBaseline = 'middle', i.fillText(r.text, 0, 0, u), i.restore();
                }
              }
            }), {
              id: 'title',
              beforeInit: function beforeInit(t) {
                var n = t.options.title;
                n && e(t, n);
              },
              beforeUpdate: function beforeUpdate(a) {
                var r = a.options.title,
                    o = a.titleBlock;
                r ? (r = n.configMerge(t.defaults.global.title, r), o ? (i.configure(a, o, r), o.options = r) : e(a, r)) : o && (t.layoutService.removeBox(a, o), delete a.titleBlock);
              }
            };
          };
        }, {}],
        44: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = { position: 'bottom' },
                i = t.Scale.extend({
              getLabels: function getLabels() {
                var t = this.chart.data;
                return (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels;
              },
              determineDataLimits: function determineDataLimits() {
                var t = this,
                    n = t.getLabels();
                t.minIndex = 0, t.maxIndex = n.length - 1;
                var i;
                void 0 !== t.options.ticks.min && (i = e.indexOf(n, t.options.ticks.min), t.minIndex = i !== -1 ? i : t.minIndex), void 0 !== t.options.ticks.max && (i = e.indexOf(n, t.options.ticks.max), t.maxIndex = i !== -1 ? i : t.maxIndex), t.min = n[t.minIndex], t.max = n[t.maxIndex];
              },
              buildTicks: function buildTicks() {
                var t = this,
                    e = t.getLabels();
                t.ticks = 0 === t.minIndex && t.maxIndex === e.length - 1 ? e : e.slice(t.minIndex, t.maxIndex + 1);
              },
              getLabelForIndex: function getLabelForIndex(t, e) {
                var n = this,
                    i = n.chart.data,
                    a = n.isHorizontal();
                return i.yLabels && !a ? n.getRightValue(i.datasets[e].data[t]) : n.ticks[t - n.minIndex];
              },
              getPixelForValue: function getPixelForValue(t, e, n, i) {
                var a,
                    r = this,
                    o = Math.max(r.maxIndex + 1 - r.minIndex - (r.options.gridLines.offsetGridLines ? 0 : 1), 1);
                if (void 0 !== t && null !== t && (a = r.isHorizontal() ? t.x : t.y), void 0 !== a || void 0 !== t && isNaN(e)) {
                  var s = r.getLabels();
                  t = a || t;
                  var l = s.indexOf(t);
                  e = l !== -1 ? l : e;
                }
                if (r.isHorizontal()) {
                  var u = r.width / o,
                      d = u * (e - r.minIndex);
                  return (r.options.gridLines.offsetGridLines && i || r.maxIndex === r.minIndex && i) && (d += u / 2), r.left + Math.round(d);
                }
                var c = r.height / o,
                    h = c * (e - r.minIndex);
                return r.options.gridLines.offsetGridLines && i && (h += c / 2), r.top + Math.round(h);
              },
              getPixelForTick: function getPixelForTick(t, e) {
                return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e);
              },
              getValueForPixel: function getValueForPixel(t) {
                var e,
                    n = this,
                    i = Math.max(n.ticks.length - (n.options.gridLines.offsetGridLines ? 0 : 1), 1),
                    a = n.isHorizontal(),
                    r = (a ? n.width : n.height) / i;
                return t -= a ? n.left : n.top, n.options.gridLines.offsetGridLines && (t -= r / 2), e = t <= 0 ? 0 : Math.round(t / r);
              },
              getBasePixel: function getBasePixel() {
                return this.bottom;
              }
            });
            t.scaleService.registerScaleType('category', i, n);
          };
        }, {}],
        45: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = {
              position: 'left',
              ticks: { callback: t.Ticks.formatters.linear }
            },
                i = t.LinearScaleBase.extend({
              determineDataLimits: function determineDataLimits() {
                function t(t) {
                  return s ? t.xAxisID === n.id : t.yAxisID === n.id;
                }
                var n = this,
                    i = n.options,
                    a = n.chart,
                    r = a.data,
                    o = r.datasets,
                    s = n.isHorizontal(),
                    l = 0,
                    u = 1;
                n.min = null, n.max = null;
                var d = i.stacked;
                if (void 0 === d && e.each(o, function (e, n) {
                  if (!d) {
                    var i = a.getDatasetMeta(n);
                    a.isDatasetVisible(n) && t(i) && void 0 !== i.stack && (d = !0);
                  }
                }), i.stacked || d) {
                  var c = {};
                  e.each(o, function (r, o) {
                    var s = a.getDatasetMeta(o),
                        l = [s.type, void 0 === i.stacked && void 0 === s.stack ? o : '', s.stack].join('.');
                    void 0 === c[l] && (c[l] = {
                      positiveValues: [],
                      negativeValues: []
                    });
                    var u = c[l].positiveValues,
                        d = c[l].negativeValues;
                    a.isDatasetVisible(o) && t(s) && e.each(r.data, function (t, e) {
                      var a = +n.getRightValue(t);
                      isNaN(a) || s.data[e].hidden || (u[e] = u[e] || 0, d[e] = d[e] || 0, i.relativePoints ? u[e] = 100 : a < 0 ? d[e] += a : u[e] += a);
                    });
                  }), e.each(c, function (t) {
                    var i = t.positiveValues.concat(t.negativeValues),
                        a = e.min(i),
                        r = e.max(i);
                    n.min = null === n.min ? a : Math.min(n.min, a), n.max = null === n.max ? r : Math.max(n.max, r);
                  });
                } else e.each(o, function (i, r) {
                  var o = a.getDatasetMeta(r);
                  a.isDatasetVisible(r) && t(o) && e.each(i.data, function (t, e) {
                    var i = +n.getRightValue(t);
                    isNaN(i) || o.data[e].hidden || (null === n.min ? n.min = i : i < n.min && (n.min = i), null === n.max ? n.max = i : i > n.max && (n.max = i));
                  });
                });
                n.min = isFinite(n.min) ? n.min : l, n.max = isFinite(n.max) ? n.max : u, this.handleTickRangeOptions();
              },
              getTickLimit: function getTickLimit() {
                var n,
                    i = this,
                    a = i.options.ticks;
                if (i.isHorizontal()) n = Math.min(a.maxTicksLimit ? a.maxTicksLimit : 11, Math.ceil(i.width / 50));else {
                  var r = e.getValueOrDefault(a.fontSize, t.defaults.global.defaultFontSize);
                  n = Math.min(a.maxTicksLimit ? a.maxTicksLimit : 11, Math.ceil(i.height / (2 * r)));
                }
                return n;
              },
              handleDirectionalChanges: function handleDirectionalChanges() {
                this.isHorizontal() || this.ticks.reverse();
              },
              getLabelForIndex: function getLabelForIndex(t, e) {
                return +this.getRightValue(this.chart.data.datasets[e].data[t]);
              },
              getPixelForValue: function getPixelForValue(t) {
                var e,
                    n = this,
                    i = n.start,
                    a = +n.getRightValue(t),
                    r = n.end - i;
                return n.isHorizontal() ? (e = n.left + n.width / r * (a - i), Math.round(e)) : (e = n.bottom - n.height / r * (a - i), Math.round(e));
              },
              getValueForPixel: function getValueForPixel(t) {
                var e = this,
                    n = e.isHorizontal(),
                    i = n ? e.width : e.height,
                    a = (n ? t - e.left : e.bottom - t) / i;
                return e.start + (e.end - e.start) * a;
              },
              getPixelForTick: function getPixelForTick(t) {
                return this.getPixelForValue(this.ticksAsNumbers[t]);
              }
            });
            t.scaleService.registerScaleType('linear', i, n);
          };
        }, {}],
        46: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = e.noop;
            t.LinearScaleBase = t.Scale.extend({
              handleTickRangeOptions: function handleTickRangeOptions() {
                var t = this,
                    n = t.options,
                    i = n.ticks;
                if (i.beginAtZero) {
                  var a = e.sign(t.min),
                      r = e.sign(t.max);
                  a < 0 && r < 0 ? t.max = 0 : a > 0 && r > 0 && (t.min = 0);
                }
                void 0 !== i.min ? t.min = i.min : void 0 !== i.suggestedMin && (null === t.min ? t.min = i.suggestedMin : t.min = Math.min(t.min, i.suggestedMin)), void 0 !== i.max ? t.max = i.max : void 0 !== i.suggestedMax && (null === t.max ? t.max = i.suggestedMax : t.max = Math.max(t.max, i.suggestedMax)), t.min === t.max && (t.max++, i.beginAtZero || t.min--);
              },
              getTickLimit: n,
              handleDirectionalChanges: n,
              buildTicks: function buildTicks() {
                var n = this,
                    i = n.options,
                    a = i.ticks,
                    r = n.getTickLimit();
                r = Math.max(2, r);
                var o = {
                  maxTicks: r,
                  min: a.min,
                  max: a.max,
                  stepSize: e.getValueOrDefault(a.fixedStepSize, a.stepSize)
                },
                    s = n.ticks = t.Ticks.generators.linear(o, n);
                n.handleDirectionalChanges(), n.max = e.max(s), n.min = e.min(s), a.reverse ? (s.reverse(), n.start = n.max, n.end = n.min) : (n.start = n.min, n.end = n.max);
              },
              convertTicksToLabels: function convertTicksToLabels() {
                var e = this;
                e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(e);
              }
            });
          };
        }, {}],
        47: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            var e = t.helpers,
                n = {
              position: 'left',
              ticks: { callback: t.Ticks.formatters.logarithmic }
            },
                i = t.Scale.extend({
              determineDataLimits: function determineDataLimits() {
                function t(t) {
                  return u ? t.xAxisID === n.id : t.yAxisID === n.id;
                }
                var n = this,
                    i = n.options,
                    a = i.ticks,
                    r = n.chart,
                    o = r.data,
                    s = o.datasets,
                    l = e.getValueOrDefault,
                    u = n.isHorizontal();
                n.min = null, n.max = null, n.minNotZero = null;
                var d = i.stacked;
                if (void 0 === d && e.each(s, function (e, n) {
                  if (!d) {
                    var i = r.getDatasetMeta(n);
                    r.isDatasetVisible(n) && t(i) && void 0 !== i.stack && (d = !0);
                  }
                }), i.stacked || d) {
                  var c = {};
                  e.each(s, function (a, o) {
                    var s = r.getDatasetMeta(o),
                        l = [s.type, void 0 === i.stacked && void 0 === s.stack ? o : '', s.stack].join('.');
                    r.isDatasetVisible(o) && t(s) && (void 0 === c[l] && (c[l] = []), e.each(a.data, function (t, e) {
                      var a = c[l],
                          r = +n.getRightValue(t);
                      isNaN(r) || s.data[e].hidden || (a[e] = a[e] || 0, i.relativePoints ? a[e] = 100 : a[e] += r);
                    }));
                  }), e.each(c, function (t) {
                    var i = e.min(t),
                        a = e.max(t);
                    n.min = null === n.min ? i : Math.min(n.min, i), n.max = null === n.max ? a : Math.max(n.max, a);
                  });
                } else e.each(s, function (i, a) {
                  var o = r.getDatasetMeta(a);
                  r.isDatasetVisible(a) && t(o) && e.each(i.data, function (t, e) {
                    var i = +n.getRightValue(t);
                    isNaN(i) || o.data[e].hidden || (null === n.min ? n.min = i : i < n.min && (n.min = i), null === n.max ? n.max = i : i > n.max && (n.max = i), 0 !== i && (null === n.minNotZero || i < n.minNotZero) && (n.minNotZero = i));
                  });
                });
                n.min = l(a.min, n.min), n.max = l(a.max, n.max), n.min === n.max && (0 !== n.min && null !== n.min ? (n.min = Math.pow(10, Math.floor(e.log10(n.min)) - 1), n.max = Math.pow(10, Math.floor(e.log10(n.max)) + 1)) : (n.min = 1, n.max = 10));
              },
              buildTicks: function buildTicks() {
                var n = this,
                    i = n.options,
                    a = i.ticks,
                    r = {
                  min: a.min,
                  max: a.max
                },
                    o = n.ticks = t.Ticks.generators.logarithmic(r, n);
                n.isHorizontal() || o.reverse(), n.max = e.max(o), n.min = e.min(o), a.reverse ? (o.reverse(), n.start = n.max, n.end = n.min) : (n.start = n.min, n.end = n.max);
              },
              convertTicksToLabels: function convertTicksToLabels() {
                this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this);
              },
              getLabelForIndex: function getLabelForIndex(t, e) {
                return +this.getRightValue(this.chart.data.datasets[e].data[t]);
              },
              getPixelForTick: function getPixelForTick(t) {
                return this.getPixelForValue(this.tickValues[t]);
              },
              getPixelForValue: function getPixelForValue(t) {
                var n,
                    i,
                    a,
                    r = this,
                    o = r.start,
                    s = +r.getRightValue(t),
                    l = r.options,
                    u = l.ticks;
                return r.isHorizontal() ? (a = e.log10(r.end) - e.log10(o), 0 === s ? i = r.left : (n = r.width, i = r.left + n / a * (e.log10(s) - e.log10(o)))) : (n = r.height, 0 !== o || u.reverse ? 0 === r.end && u.reverse ? (a = e.log10(r.start) - e.log10(r.minNotZero), i = s === r.end ? r.top : s === r.minNotZero ? r.top + 0.02 * n : r.top + 0.02 * n + 0.98 * n / a * (e.log10(s) - e.log10(r.minNotZero))) : 0 === s ? i = u.reverse ? r.top : r.bottom : (a = e.log10(r.end) - e.log10(o), n = r.height, i = r.bottom - n / a * (e.log10(s) - e.log10(o))) : (a = e.log10(r.end) - e.log10(r.minNotZero), i = s === o ? r.bottom : s === r.minNotZero ? r.bottom - 0.02 * n : r.bottom - 0.02 * n - 0.98 * n / a * (e.log10(s) - e.log10(r.minNotZero)))), i;
              },
              getValueForPixel: function getValueForPixel(t) {
                var n,
                    i,
                    a = this,
                    r = e.log10(a.end) - e.log10(a.start);
                return a.isHorizontal() ? (i = a.width, n = a.start * Math.pow(10, (t - a.left) * r / i)) : (i = a.height, n = Math.pow(10, (a.bottom - t) * r / i) / a.start), n;
              }
            });
            t.scaleService.registerScaleType('logarithmic', i, n);
          };
        }, {}],
        48: [function (t, e, n) {
          'use strict';

          e.exports = function (t) {
            function e(t) {
              var e = t.options;
              return e.angleLines.display || e.pointLabels.display ? t.chart.data.labels.length : 0;
            }
            function n(t) {
              var e = t.options.pointLabels,
                  n = f.getValueOrDefault(e.fontSize, g.defaultFontSize),
                  i = f.getValueOrDefault(e.fontStyle, g.defaultFontStyle),
                  a = f.getValueOrDefault(e.fontFamily, g.defaultFontFamily),
                  r = f.fontString(n, i, a);
              return {
                size: n,
                style: i,
                family: a,
                font: r
              };
            }
            function i(t, e, n) {
              return f.isArray(n) ? {
                w: f.longestText(t, t.font, n),
                h: n.length * e + 1.5 * (n.length - 1) * e
              } : {
                w: t.measureText(n).width,
                h: e
              };
            }
            function a(t, e, n, i, a) {
              return t === i || t === a ? {
                start: e - n / 2,
                end: e + n / 2
              } : t < i || t > a ? {
                start: e - n - 5,
                end: e
              } : {
                start: e,
                end: e + n + 5
              };
            }
            function r(t) {
              var r,
                  o,
                  s,
                  l = n(t),
                  u = Math.min(t.height / 2, t.width / 2),
                  d = {
                r: t.width,
                l: 0,
                t: t.height,
                b: 0
              },
                  c = {};
              t.ctx.font = l.font, t._pointLabelSizes = [];
              var h = e(t);
              for (r = 0; r < h; r++) {
                s = t.getPointPosition(r, u), o = i(t.ctx, l.size, t.pointLabels[r] || ''), t._pointLabelSizes[r] = o;
                var g = t.getIndexAngle(r),
                    p = f.toDegrees(g) % 360,
                    m = a(p, s.x, o.w, 0, 180),
                    v = a(p, s.y, o.h, 90, 270);
                m.start < d.l && (d.l = m.start, c.l = g), m.end > d.r && (d.r = m.end, c.r = g), v.start < d.t && (d.t = v.start, c.t = g), v.end > d.b && (d.b = v.end, c.b = g);
              }
              t.setReductions(u, d, c);
            }
            function o(t) {
              var e = Math.min(t.height / 2, t.width / 2);
              t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0);
            }
            function s(t) {
              return 0 === t || 180 === t ? 'center' : t < 180 ? 'left' : 'right';
            }
            function l(t, e, n, i) {
              if (f.isArray(e)) for (var a = n.y, r = 1.5 * i, o = 0; o < e.length; ++o) {
                t.fillText(e[o], n.x, a), a += r;
              } else t.fillText(e, n.x, n.y);
            }
            function u(t, e, n) {
              90 === t || 270 === t ? n.y -= e.h / 2 : (t > 270 || t < 90) && (n.y -= e.h);
            }
            function d(t) {
              var i = t.ctx,
                  a = f.getValueOrDefault,
                  r = t.options,
                  o = r.angleLines,
                  d = r.pointLabels;
              i.lineWidth = o.lineWidth, i.strokeStyle = o.color;
              var c = t.getDistanceFromCenterForValue(r.reverse ? t.min : t.max),
                  h = n(t);
              i.textBaseline = 'top';
              for (var p = e(t) - 1; p >= 0; p--) {
                if (o.display) {
                  var m = t.getPointPosition(p, c);
                  i.beginPath(), i.moveTo(t.xCenter, t.yCenter), i.lineTo(m.x, m.y), i.stroke(), i.closePath();
                }
                if (d.display) {
                  var v = t.getPointPosition(p, c + 5),
                      y = a(d.fontColor, g.defaultFontColor);
                  i.font = h.font, i.fillStyle = y;
                  var b = t.getIndexAngle(p),
                      x = f.toDegrees(b);
                  i.textAlign = s(x), u(x, t._pointLabelSizes[p], v), l(i, t.pointLabels[p] || '', v, h.size);
                }
              }
            }
            function c(t, n, i, a) {
              var r = t.ctx;
              if (r.strokeStyle = f.getValueAtIndexOrDefault(n.color, a - 1), r.lineWidth = f.getValueAtIndexOrDefault(n.lineWidth, a - 1), t.options.gridLines.circular) r.beginPath(), r.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI), r.closePath(), r.stroke();else {
                var o = e(t);
                if (0 === o) return;
                r.beginPath();
                var s = t.getPointPosition(0, i);
                r.moveTo(s.x, s.y);
                for (var l = 1; l < o; l++) {
                  s = t.getPointPosition(l, i), r.lineTo(s.x, s.y);
                }r.closePath(), r.stroke();
              }
            }
            function h(t) {
              return f.isNumber(t) ? t : 0;
            }
            var f = t.helpers,
                g = t.defaults.global,
                p = {
              display: !0,
              animate: !0,
              position: 'chartArea',
              angleLines: {
                display: !0,
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1
              },
              gridLines: { circular: !1 },
              ticks: {
                showLabelBackdrop: !0,
                backdropColor: 'rgba(255,255,255,0.75)',
                backdropPaddingY: 2,
                backdropPaddingX: 2,
                callback: t.Ticks.formatters.linear
              },
              pointLabels: {
                display: !0,
                fontSize: 10,
                callback: function callback(t) {
                  return t;
                }
              }
            },
                m = t.LinearScaleBase.extend({
              setDimensions: function setDimensions() {
                var t = this,
                    e = t.options,
                    n = e.ticks;
                t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);
                var i = f.min([t.height, t.width]),
                    a = f.getValueOrDefault(n.fontSize, g.defaultFontSize);
                t.drawingArea = e.display ? i / 2 - (a / 2 + n.backdropPaddingY) : i / 2;
              },
              determineDataLimits: function determineDataLimits() {
                var t = this,
                    e = t.chart,
                    n = Number.POSITIVE_INFINITY,
                    i = Number.NEGATIVE_INFINITY;
                f.each(e.data.datasets, function (a, r) {
                  if (e.isDatasetVisible(r)) {
                    var o = e.getDatasetMeta(r);
                    f.each(a.data, function (e, a) {
                      var r = +t.getRightValue(e);
                      isNaN(r) || o.data[a].hidden || (n = Math.min(r, n), i = Math.max(r, i));
                    });
                  }
                }), t.min = n === Number.POSITIVE_INFINITY ? 0 : n, t.max = i === Number.NEGATIVE_INFINITY ? 0 : i, t.handleTickRangeOptions();
              },
              getTickLimit: function getTickLimit() {
                var t = this.options.ticks,
                    e = f.getValueOrDefault(t.fontSize, g.defaultFontSize);
                return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e)));
              },
              convertTicksToLabels: function convertTicksToLabels() {
                var e = this;
                t.LinearScaleBase.prototype.convertTicksToLabels.call(e), e.pointLabels = e.chart.data.labels.map(e.options.pointLabels.callback, e);
              },
              getLabelForIndex: function getLabelForIndex(t, e) {
                return +this.getRightValue(this.chart.data.datasets[e].data[t]);
              },
              fit: function fit() {
                this.options.pointLabels.display ? r(this) : o(this);
              },
              setReductions: function setReductions(t, e, n) {
                var i = this,
                    a = e.l / Math.sin(n.l),
                    r = Math.max(e.r - i.width, 0) / Math.sin(n.r),
                    o = -e.t / Math.cos(n.t),
                    s = -Math.max(e.b - i.height, 0) / Math.cos(n.b);
                a = h(a), r = h(r), o = h(o), s = h(s), i.drawingArea = Math.min(Math.round(t - (a + r) / 2), Math.round(t - (o + s) / 2)), i.setCenterPoint(a, r, o, s);
              },
              setCenterPoint: function setCenterPoint(t, e, n, i) {
                var a = this,
                    r = a.width - e - a.drawingArea,
                    o = t + a.drawingArea,
                    s = n + a.drawingArea,
                    l = a.height - i - a.drawingArea;
                a.xCenter = Math.round((o + r) / 2 + a.left), a.yCenter = Math.round((s + l) / 2 + a.top);
              },
              getIndexAngle: function getIndexAngle(t) {
                var n = 2 * Math.PI / e(this),
                    i = this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0,
                    a = i * Math.PI * 2 / 360;
                return t * n + a;
              },
              getDistanceFromCenterForValue: function getDistanceFromCenterForValue(t) {
                var e = this;
                if (null === t) return 0;
                var n = e.drawingArea / (e.max - e.min);
                return e.options.reverse ? (e.max - t) * n : (t - e.min) * n;
              },
              getPointPosition: function getPointPosition(t, e) {
                var n = this,
                    i = n.getIndexAngle(t) - Math.PI / 2;
                return {
                  x: Math.round(Math.cos(i) * e) + n.xCenter,
                  y: Math.round(Math.sin(i) * e) + n.yCenter
                };
              },
              getPointPositionForValue: function getPointPositionForValue(t, e) {
                return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
              },
              getBasePosition: function getBasePosition() {
                var t = this,
                    e = t.min,
                    n = t.max;
                return t.getPointPositionForValue(0, t.beginAtZero ? 0 : e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0);
              },
              draw: function draw() {
                var t = this,
                    e = t.options,
                    n = e.gridLines,
                    i = e.ticks,
                    a = f.getValueOrDefault;
                if (e.display) {
                  var r = t.ctx,
                      o = a(i.fontSize, g.defaultFontSize),
                      s = a(i.fontStyle, g.defaultFontStyle),
                      l = a(i.fontFamily, g.defaultFontFamily),
                      u = f.fontString(o, s, l);
                  f.each(t.ticks, function (s, l) {
                    if (l > 0 || e.reverse) {
                      var d = t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),
                          h = t.yCenter - d;
                      if (n.display && 0 !== l && c(t, n, d, l), i.display) {
                        var f = a(i.fontColor, g.defaultFontColor);
                        if (r.font = u, i.showLabelBackdrop) {
                          var p = r.measureText(s).width;
                          r.fillStyle = i.backdropColor, r.fillRect(t.xCenter - p / 2 - i.backdropPaddingX, h - o / 2 - i.backdropPaddingY, p + 2 * i.backdropPaddingX, o + 2 * i.backdropPaddingY);
                        }
                        r.textAlign = 'center', r.textBaseline = 'middle', r.fillStyle = f, r.fillText(s, t.xCenter, h);
                      }
                    }
                  }), (e.angleLines.display || e.pointLabels.display) && d(t);
                }
              }
            });
            t.scaleService.registerScaleType('radialLinear', m, p);
          };
        }, {}],
        49: [function (t, e, n) {
          'use strict';

          var i = t(6);
          i = 'function' == typeof i ? i : window.moment, e.exports = function (t) {
            function e(t, e) {
              var n = t.options.time;
              if ('string' == typeof n.parser) return i(e, n.parser);
              if ('function' == typeof n.parser) return n.parser(e);
              if ('function' == typeof e.getMonth || 'number' == typeof e) return i(e);
              if (e.isValid && e.isValid()) return e;
              var a = n.format;
              return 'string' != typeof a && a.call ? (console.warn('options.time.format is deprecated and replaced by options.time.parser.'), a(e)) : i(e, a);
            }
            function n(t, e, n, i) {
              for (var a, r = Object.keys(s), o = r.length, l = r.indexOf(t); l < o; l++) {
                a = r[l];
                var u = s[a],
                    d = u.steps && u.steps[u.steps.length - 1] || u.maxStep;
                if (void 0 === d || Math.ceil((n - e) / (d * u.size)) <= i) break;
              }
              return a;
            }
            function a(t, e, n, i) {
              var a = s[n],
                  r = a.size,
                  o = Math.ceil((e - t) / r),
                  l = 1,
                  u = e - t;
              if (a.steps) for (var d = a.steps.length, c = 0; c < d && o > i; c++) {
                l = a.steps[c], o = Math.ceil(u / (r * l));
              } else for (; o > i && i > 0;) {
                ++l, o = Math.ceil(u / (r * l));
              }return l;
            }
            function r(t, e, n) {
              var a = [];
              if (t.maxTicks) {
                var r = t.stepSize;
                a.push(void 0 !== t.min ? t.min : n.min);
                for (var o = i(n.min); o.add(r, t.unit).valueOf() < n.max;) {
                  a.push(o.valueOf());
                }var s = t.max || n.max;
                a[a.length - 1] !== s && a.push(s);
              }
              return a;
            }
            var o = t.helpers,
                s = {
              millisecond: {
                size: 1,
                steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
              },
              second: {
                size: 1000,
                steps: [1, 2, 5, 10, 30]
              },
              minute: {
                size: 60000,
                steps: [1, 2, 5, 10, 30]
              },
              hour: {
                size: 3600000,
                steps: [1, 2, 3, 6, 12]
              },
              day: {
                size: 86400000,
                steps: [1, 2, 5]
              },
              week: {
                size: 604800000,
                maxStep: 4
              },
              month: {
                size: 2628000000,
                maxStep: 3
              },
              quarter: {
                size: 7884000000,
                maxStep: 4
              },
              year: {
                size: 31540000000,
                maxStep: !1
              }
            },
                l = {
              position: 'bottom',
              time: {
                parser: !1,
                format: !1,
                unit: !1,
                round: !1,
                displayFormat: !1,
                isoWeekday: !1,
                minUnit: 'millisecond',
                displayFormats: {
                  millisecond: 'h:mm:ss.SSS a',
                  second: 'h:mm:ss a',
                  minute: 'h:mm:ss a',
                  hour: 'MMM D, hA',
                  day: 'll',
                  week: 'll',
                  month: 'MMM YYYY',
                  quarter: '[Q]Q - YYYY',
                  year: 'YYYY'
                }
              },
              ticks: { autoSkip: !1 }
            };
            t.Ticks.generators.time = function (t, e) {
              var n,
                  a,
                  o = t.isoWeekday;
              return 'week' === t.unit && o !== !1 ? (n = i(e.min).startOf('isoWeek').isoWeekday(o).valueOf(), a = i(e.max).startOf('isoWeek').isoWeekday(o), e.max - a > 0 && a.add(1, 'week'), a = a.valueOf()) : (n = i(e.min).startOf(t.unit).valueOf(), a = i(e.max).startOf(t.unit), e.max - a > 0 && a.add(1, t.unit), a = a.valueOf()), r(t, e, {
                min: n,
                max: a
              });
            };
            var u = t.Scale.extend({
              initialize: function initialize() {
                if (!i) throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
                t.Scale.prototype.initialize.call(this);
              },
              determineDataLimits: function determineDataLimits() {
                var t,
                    n = this,
                    i = n.options.time,
                    a = Number.MAX_SAFE_INTEGER,
                    r = Number.MIN_SAFE_INTEGER,
                    s = n.chart.data,
                    l = {
                  labels: [],
                  datasets: []
                };
                o.each(s.labels, function (o, s) {
                  var u = e(n, o);
                  u.isValid() && (i.round && u.startOf(i.round), t = u.valueOf(), a = Math.min(t, a), r = Math.max(t, r), l.labels[s] = t);
                }), o.each(s.datasets, function (s, u) {
                  var d = [];
                  'object' == _typeof(s.data[0]) && null !== s.data[0] && n.chart.isDatasetVisible(u) ? o.each(s.data, function (o, s) {
                    var l = e(n, n.getRightValue(o));
                    l.isValid() && (i.round && l.startOf(i.round), t = l.valueOf(), a = Math.min(t, a), r = Math.max(t, r), d[s] = t);
                  }) : d = l.labels.slice(), l.datasets[u] = d;
                }), n.dataMin = a, n.dataMax = r, n._parsedData = l;
              },
              buildTicks: function buildTicks() {
                var i,
                    r,
                    s = this,
                    l = s.options.time,
                    u = s.dataMin,
                    d = s.dataMax;
                if (l.min) {
                  var c = e(s, l.min);
                  l.round && c.round(l.round), i = c.valueOf();
                }
                l.max && (r = e(s, l.max).valueOf());
                var h = s.getLabelCapacity(i || u),
                    f = l.unit || n(l.minUnit, i || u, r || d, h);
                s.displayFormat = l.displayFormats[f];
                var g = l.stepSize || a(i || u, r || d, f, h);
                s.ticks = t.Ticks.generators.time({
                  maxTicks: h,
                  min: i,
                  max: r,
                  stepSize: g,
                  unit: f,
                  isoWeekday: l.isoWeekday
                }, {
                  min: u,
                  max: d
                }), s.max = o.max(s.ticks), s.min = o.min(s.ticks);
              },
              getLabelForIndex: function getLabelForIndex(t, n) {
                var i = this,
                    a = i.chart.data.labels && t < i.chart.data.labels.length ? i.chart.data.labels[t] : '',
                    r = i.chart.data.datasets[n].data[t];
                return null !== r && 'object' == (typeof r === 'undefined' ? 'undefined' : _typeof(r)) && (a = i.getRightValue(r)), i.options.time.tooltipFormat && (a = e(i, a).format(i.options.time.tooltipFormat)), a;
              },
              tickFormatFunction: function tickFormatFunction(t, e, n) {
                var i = t.format(this.displayFormat),
                    a = this.options.ticks,
                    r = o.getValueOrDefault(a.callback, a.userCallback);
                return r ? r(i, e, n) : i;
              },
              convertTicksToLabels: function convertTicksToLabels() {
                var t = this;
                t.ticksAsTimestamps = t.ticks, t.ticks = t.ticks.map(function (t) {
                  return i(t);
                }).map(t.tickFormatFunction, t);
              },
              getPixelForOffset: function getPixelForOffset(t) {
                var e = this,
                    n = e.max - e.min,
                    i = n ? (t - e.min) / n : 0;
                if (e.isHorizontal()) {
                  var a = e.width * i;
                  return e.left + Math.round(a);
                }
                var r = e.height * i;
                return e.top + Math.round(r);
              },
              getPixelForValue: function getPixelForValue(t, n, i) {
                var a = this,
                    r = null;
                if (void 0 !== n && void 0 !== i && (r = a._parsedData.datasets[i][n]), null === r && (t && t.isValid || (t = e(a, a.getRightValue(t))), t && t.isValid && t.isValid() && (r = t.valueOf())), null !== r) return a.getPixelForOffset(r);
              },
              getPixelForTick: function getPixelForTick(t) {
                return this.getPixelForOffset(this.ticksAsTimestamps[t]);
              },
              getValueForPixel: function getValueForPixel(t) {
                var e = this,
                    n = e.isHorizontal() ? e.width : e.height,
                    a = (t - (e.isHorizontal() ? e.left : e.top)) / n;
                return i(e.min + a * (e.max - e.min));
              },
              getLabelWidth: function getLabelWidth(e) {
                var n = this,
                    i = n.options.ticks,
                    a = n.ctx.measureText(e).width,
                    r = Math.cos(o.toRadians(i.maxRotation)),
                    s = Math.sin(o.toRadians(i.maxRotation)),
                    l = o.getValueOrDefault(i.fontSize, t.defaults.global.defaultFontSize);
                return a * r + l * s;
              },
              getLabelCapacity: function getLabelCapacity(t) {
                var e = this;
                e.displayFormat = e.options.time.displayFormats.millisecond;
                var n = e.tickFormatFunction(i(t), 0, []),
                    a = e.getLabelWidth(n),
                    r = e.isHorizontal() ? e.width : e.height,
                    o = r / a;
                return o;
              }
            });
            t.scaleService.registerScaleType('time', u, l);
          };
        }, { 6: 6 }]
      }, {}, [7])(7);
    });
  })();
})();