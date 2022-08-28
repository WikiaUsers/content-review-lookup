/**
 * Name:        FilterStrings
 * Author:      kgello <kovacsgellertgabor@gmail.com> (kgello.me)
 * Description: Converts and saves specified CSS variable hexcodes as filter strings.
 * Tightly based on Barrett Sonntag's Codepen (https://codepen.io/sosuke/pen/Pjoqqp).
 */
 /* global mw */
 /* Babel transpilation objects */
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

(function () {
  "use strict";
  
  /* Filter string calculation */
  var Color = /*#__PURE__*/function () {
    function Color(r, g, b) {
      this.set(r, g, b);
    }

    var _proto = Color.prototype;

    _proto.toString = function toString() {
      return "rgb(" + Math.round(this.r) + ", " + Math.round(this.g) + ", " + Math.round(this.b) + ")";
    };

    _proto.set = function set(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    };

    _proto.hueRotate = function hueRotate(angle) {
      if (angle === void 0) {
        angle = 0;
      }

      angle = angle / 180 * Math.PI;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      this.multiply([0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928, 0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.140, 0.072 - cos * 0.072 - sin * 0.283, 0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072]);
    };

    _proto.grayscale = function grayscale(value) {
      if (value === void 0) {
        value = 1;
      }

      this.multiply([0.2126 + 0.7874 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 - 0.0722 * (1 - value), 0.2126 - 0.2126 * (1 - value), 0.7152 + 0.2848 * (1 - value), 0.0722 - 0.0722 * (1 - value), 0.2126 - 0.2126 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 + 0.9278 * (1 - value)]);
    };

    _proto.sepia = function sepia(value) {
      if (value === void 0) {
        value = 1;
      }

      this.multiply([0.393 + 0.607 * (1 - value), 0.769 - 0.769 * (1 - value), 0.189 - 0.189 * (1 - value), 0.349 - 0.349 * (1 - value), 0.686 + 0.314 * (1 - value), 0.168 - 0.168 * (1 - value), 0.272 - 0.272 * (1 - value), 0.534 - 0.534 * (1 - value), 0.131 + 0.869 * (1 - value)]);
    };

    _proto.saturate = function saturate(value) {
      if (value === void 0) {
        value = 1;
      }

      this.multiply([0.213 + 0.787 * value, 0.715 - 0.715 * value, 0.072 - 0.072 * value, 0.213 - 0.213 * value, 0.715 + 0.285 * value, 0.072 - 0.072 * value, 0.213 - 0.213 * value, 0.715 - 0.715 * value, 0.072 + 0.928 * value]);
    };

    _proto.multiply = function multiply(matrix) {
      var newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      var newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      var newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    };

    _proto.brightness = function brightness(value) {
      if (value === void 0) {
        value = 1;
      }

      this.linear(value);
    };

    _proto.contrast = function contrast(value) {
      if (value === void 0) {
        value = 1;
      }

      this.linear(value, -(0.5 * value) + 0.5);
    };

    _proto.linear = function linear(slope, intercept) {
      if (slope === void 0) {
        slope = 1;
      }

      if (intercept === void 0) {
        intercept = 0;
      }

      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    };

    _proto.invert = function invert(value) {
      if (value === void 0) {
        value = 1;
      }

      this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    };

    _proto.hsl = function hsl() {
      // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
      var r = this.r / 255;
      var g = this.g / 255;
      var b = this.b / 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h,
          s,
          l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return {
        h: h * 100,
        s: s * 100,
        l: l * 100
      };
    };

    _proto.clamp = function clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }

      return value;
    };

    return Color;
  }();

  var Solver = /*#__PURE__*/function () {
    function Solver(target, baseColor) {
      this.target = target;
      this.targetHSL = target.hsl();
      this.reusedColor = new Color(0, 0, 0);
    }

    var _proto2 = Solver.prototype;

    _proto2.solve = function solve() {
      var result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values)
      };
    };

    _proto2.solveWide = function solveWide() {
      var A = 5;
      var c = 15;
      var a = [60, 180, 18000, 600, 1.2, 1.2];
      var best = {
        loss: Infinity
      };

      for (var i = 0; best.loss > 25 && i < 3; i++) {
        var initial = [50, 20, 3750, 50, 100, 100];
        var result = this.spsa(A, a, c, initial, 1000);

        if (result.loss < best.loss) {
          best = result;
        }
      }

      return best;
    };

    _proto2.solveNarrow = function solveNarrow(wide) {
      var A = wide.loss;
      var c = 2;
      var A1 = A + 1;
      var a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    };

    _proto2.spsa = function spsa(A, a, c, values, iters) {
      var alpha = 1;
      var gamma = 0.16666666666666666;
      var best = null;
      var bestLoss = Infinity;
      var deltas = new Array(6);
      var highArgs = new Array(6);
      var lowArgs = new Array(6);

      for (var k = 0; k < iters; k++) {
        var ck = c / Math.pow(k + 1, gamma);

        for (var i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }

        var lossDiff = this.loss(highArgs) - this.loss(lowArgs);

        for (var _i = 0; _i < 6; _i++) {
          var g = lossDiff / (2 * ck) * deltas[_i];
          var ak = a[_i] / Math.pow(A + k + 1, alpha);
          values[_i] = fix(values[_i] - ak * g, _i);
        }

        var loss = this.loss(values);

        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }

      return {
        values: best,
        loss: bestLoss
      };

      function fix(value, idx) {
        var max = 100;

        if (idx === 2
        /* saturate */
        ) {
          max = 7500;
        } else if (idx === 4
        /* brightness */
        || idx === 5
        /* contrast */
        ) {
          max = 200;
        }

        if (idx === 3
        /* hue-rotate */
        ) {
          if (value > max) {
            value %= max;
          } else if (value < 0) {
            value = max + value % max;
          }
        } else if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }

        return value;
      }
    };

    _proto2.loss = function loss(filters) {
      // Argument is array of percentages.
      var color = this.reusedColor;
      color.set(0, 0, 0);
      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);
      var colorHSL = color.hsl();
      return Math.abs(color.r - this.target.r) + Math.abs(color.g - this.target.g) + Math.abs(color.b - this.target.b) + Math.abs(colorHSL.h - this.targetHSL.h) + Math.abs(colorHSL.s - this.targetHSL.s) + Math.abs(colorHSL.l - this.targetHSL.l);
    };

    _proto2.css = function css(filters) {
      function fmt(idx, multiplier) {
        if (multiplier === void 0) {
          multiplier = 1;
        }

        return Math.round(filters[idx] * multiplier);
      }

      return "invert(" + fmt(0) + "%) sepia(" + fmt(1) + "%) saturate(" + fmt(2) + "%) hue-rotate(" + fmt(3, 3.6) + "deg) brightness(" + fmt(4) + "%) contrast(" + fmt(5) + "%)";
    };

    return Solver;
  }();

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  }
  
  /* MW integration */
  function loadConfig() {
    var prefix = "Custom-FilterStrings-config-";
    var api = new mw.Api();
    var config = {
      vars: ""
    };
    api.get({
      action: "query",
      meta: "allmessages",
      ammessages: prefix + "vars"
    }).done(function (d) {
      if (!d.error) {
        d.query.allmessages.forEach(function (el) {
          if (el["*"]) {
            config[el.name.substring(prefix.length)] = el["*"];
          }
        });
        var settings = parseConfig(config);
        var colors = getColorValues(settings.vars);
        var filters = mapToFilters(colors);
        setFilterValues(settings.vars, filters);
      }
    });
  }

  function parseConfig(config) {
    if (config.vars.length == 0) config.vars = [];else config.vars = config.vars.split("\n");
    return config;
  }

  function getColorValues(vars) {
    return vars.map(function (name) {
      return getComputedStyle(document.documentElement).getPropertyValue(name);
    }).map(hexToRgb).map(function (rgb) {
      return _construct(Color, rgb);
    });
  }

  function setFilterValues(vars, filters) {
    for (var i = 0; i < vars.length; i++) {
      document.documentElement.style.setProperty(vars[i] + "--filter", filters[i]);
    }
  }

  function mapToFilters(colors) {
    return colors.map(function (color) {
      return new Solver(color).solve().filter;
    });
  }

  mw.loader.using("mediawiki.api", loadConfig);
})();