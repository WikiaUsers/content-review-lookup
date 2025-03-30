// hi again jsrt team, wish you all the best
function _callSuper(t, o, e) {
    return (
        (o = _getPrototypeOf(o)),
        _possibleConstructorReturn(
            t,
            _isNativeReflectConstruct()
                ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
                : o.apply(t, e)
        )
    );
}
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e)
        throw new TypeError(
            "Derived constructors may only return object or undefined"
        );
    return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
    if (void 0 === e)
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    return e;
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
        );
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
function _getPrototypeOf(t) {
    return (
        (_getPrototypeOf = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
              }),
        _getPrototypeOf(t)
    );
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e)
        throw new TypeError(
            "Super expression must either be null or a function"
        );
    (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
    })),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
    return (
        (_setPrototypeOf = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                  return (t.__proto__ = e), t;
              }),
        _setPrototypeOf(t, e)
    );
}
function _toConsumableArray(r) {
    return (
        _arrayWithoutHoles(r) ||
        _iterableToArray(r) ||
        _unsupportedIterableToArray(r) ||
        _nonIterableSpread()
    );
}
function _nonIterableSpread() {
    throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return (
            "Object" === t && r.constructor && (t = r.constructor.name),
            "Map" === t || "Set" === t
                ? Array.from(r)
                : "Arguments" === t ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                  ? _arrayLikeToArray(r, a)
                  : void 0
        );
    }
}
function _iterableToArray(r) {
    if (
        ("undefined" != typeof Symbol && null != r[Symbol.iterator]) ||
        null != r["@@iterator"]
    )
        return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r &&
            (o = o.filter(function (r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })),
            t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2
            ? ownKeys(Object(t), !0).forEach(function (r) {
                  _defineProperty(e, r, t[r]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
              : ownKeys(Object(t)).forEach(function (r) {
                    Object.defineProperty(
                        e,
                        r,
                        Object.getOwnPropertyDescriptor(t, r)
                    );
                });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (
        (r = _toPropertyKey(r)) in e
            ? Object.defineProperty(e, r, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[r] = t),
        e
    );
}
function _classCallCheck(a, n) {
    if (!(a instanceof n))
        throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var o = r[t];
        (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return (
        r && _defineProperties(e.prototype, r),
        t && _defineProperties(e, t),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
    );
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _typeof(o) {
    "@babel/helpers - typeof";
    return (
        (_typeof =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                      return typeof o;
                  }
                : function (o) {
                      return o &&
                          "function" == typeof Symbol &&
                          o.constructor === Symbol &&
                          o !== Symbol.prototype
                          ? "symbol"
                          : typeof o;
                  }),
        _typeof(o)
    );
}
(function (window) {
    "use strict";

    // declare dev var
    window.dev = typeof window.dev !== "undefined" ? window.dev : {};
    window.dev.fuse = window.dev.fuse || "";

    // load fuse.js
    console.debug("Loading Fuse.js");

    /**
     * Fuse.js v7.1.0 - Lightweight fuzzy-search (http://fusejs.io)
     *
     * Copyright (c) 2025 Kiro Risk (http://kiro.me)
     * All Rights Reserved. Apache Software License 2.0
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     */
    function t(t) {
        return Array.isArray ? Array.isArray(t) : "[object Array]" === h(t);
    }
    var e = 1 / 0;
    function n(t) {
        return null == t
            ? ""
            : (function (t) {
                  if ("string" == typeof t) return t;
                  var n = t + "";
                  return "0" == n && 1 / t == -e ? "-0" : n;
              })(t);
    }
    function s(t) {
        return "string" == typeof t;
    }
    function i(t) {
        return "number" == typeof t;
    }
    function r(t) {
        return (
            !0 === t ||
            !1 === t ||
            ((function (t) {
                return u(t) && null !== t;
            })(t) &&
                "[object Boolean]" == h(t))
        );
    }
    function u(t) {
        return "object" == _typeof(t);
    }
    function c(t) {
        return null != t;
    }
    function o(t) {
        return !t.trim().length;
    }
    function h(t) {
        return null == t
            ? void 0 === t
                ? "[object Undefined]"
                : "[object Null]"
            : Object.prototype.toString.call(t);
    }
    var a = function a(t) {
            return "Missing ".concat(t, "\n property in key");
        },
        l = function l(t) {
            return "Property 'weight' in key '".concat(
                t,
                "\n' must be a positive integer"
            );
        },
        d = Object.prototype.hasOwnProperty;
    var g = /*#__PURE__*/ (function () {
        function g(t) {
            var _this = this;
            _classCallCheck(this, g);
            (this._keys = []), (this._keyMap = {});
            var e = 0;
            t.forEach(function (t) {
                var n = f(t);
                _this._keys.push(n), (_this._keyMap[n.id] = n), (e += n.weight);
            }),
                this._keys.forEach(function (t) {
                    t.weight /= e;
                });
        }
        return _createClass(g, [
            {
                key: "get",
                value: function get(t) {
                    return this._keyMap[t];
                },
            },
            {
                key: "keys",
                value: function keys() {
                    return this._keys;
                },
            },
            {
                key: "toJSON",
                value: function toJSON() {
                    return JSON.stringify(this._keys);
                },
            },
        ]);
    })();
    function f(e) {
        var n = null,
            i = null,
            r = null,
            u = 1,
            c = null;
        if (s(e) || t(e)) (r = e), (n = A(e)), (i = p(e));
        else {
            if (!d.call(e, "name")) throw new Error(a("name"));
            var _t = e.name;
            if (((r = _t), d.call(e, "weight") && ((u = e.weight), u <= 0)))
                throw new Error(l(_t));
            (n = A(_t)), (i = p(_t)), (c = e.getFn);
        }
        return {
            path: n,
            id: i,
            weight: u,
            src: r,
            getFn: c,
        };
    }
    function A(e) {
        return t(e) ? e : e.split(".");
    }
    function p(e) {
        return t(e) ? e.join(".") : e;
    }
    var C = _objectSpread(
        {
            isCaseSensitive: !1,
            ignoreDiacritics: !1,
            includeScore: !1,
            keys: [],
            shouldSort: !0,
            sortFn: function sortFn(t, e) {
                return t.score === e.score
                    ? t.idx < e.idx
                        ? -1
                        : 1
                    : t.score < e.score
                      ? -1
                      : 1;
            },
            includeMatches: !1,
            findAllMatches: !1,
            minMatchCharLength: 1,
            location: 0,
            threshold: 0.6,
            distance: 100,
        },
        {
            useExtendedSearch: !1,
            getFn: function getFn(e, u) {
                var o = [],
                    h = !1;
                var _a = function a(e, u, l) {
                    if (c(e))
                        if (u[l]) {
                            var _d = e[u[l]];
                            if (!c(_d)) return;
                            if (l === u.length - 1 && (s(_d) || i(_d) || r(_d)))
                                o.push(n(_d));
                            else if (t(_d)) {
                                h = !0;
                                for (
                                    var _t2 = 0, _e = _d.length;
                                    _t2 < _e;
                                    _t2 += 1
                                )
                                    _a(_d[_t2], u, l + 1);
                            } else u.length && _a(_d, u, l + 1);
                        } else o.push(e);
                };
                return _a(e, s(u) ? u.split(".") : u, 0), h ? o : o[0];
            },
            ignoreLocation: !1,
            ignoreFieldNorm: !1,
            fieldNormWeight: 1,
        }
    );
    var m = /[^ ]+/g;
    var F = /*#__PURE__*/ (function () {
        function F() {
            var _ref =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : {},
                _ref$getFn = _ref.getFn,
                t = _ref$getFn === void 0 ? C.getFn : _ref$getFn,
                _ref$fieldNormWeight = _ref.fieldNormWeight,
                e =
                    _ref$fieldNormWeight === void 0
                        ? C.fieldNormWeight
                        : _ref$fieldNormWeight;
            _classCallCheck(this, F);
            (this.norm = (function () {
                var t =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : 1;
                var e =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : 3;
                var n = new Map(),
                    s = Math.pow(10, e);
                return {
                    get: function get(e) {
                        var i = e.match(m).length;
                        if (n.has(i)) return n.get(i);
                        var r = 1 / Math.pow(i, 0.5 * t),
                            u = parseFloat(Math.round(r * s) / s);
                        return n.set(i, u), u;
                    },
                    clear: function clear() {
                        n.clear();
                    },
                };
            })(e, 3)),
                (this.getFn = t),
                (this.isCreated = !1),
                this.setIndexRecords();
        }
        return _createClass(F, [
            {
                key: "setSources",
                value: function setSources() {
                    var t =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : [];
                    this.docs = t;
                },
            },
            {
                key: "setIndexRecords",
                value: function setIndexRecords() {
                    var t =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : [];
                    this.records = t;
                },
            },
            {
                key: "setKeys",
                value: function setKeys() {
                    var _this2 = this;
                    var t =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : [];
                    (this.keys = t),
                        (this._keysMap = {}),
                        t.forEach(function (t, e) {
                            _this2._keysMap[t.id] = e;
                        });
                },
            },
            {
                key: "create",
                value: function create() {
                    var _this3 = this;
                    !this.isCreated &&
                        this.docs.length &&
                        ((this.isCreated = !0),
                        s(this.docs[0])
                            ? this.docs.forEach(function (t, e) {
                                  _this3._addString(t, e);
                              })
                            : this.docs.forEach(function (t, e) {
                                  _this3._addObject(t, e);
                              }),
                        this.norm.clear());
                },
            },
            {
                key: "add",
                value: function add(t) {
                    var e = this.size();
                    s(t) ? this._addString(t, e) : this._addObject(t, e);
                },
            },
            {
                key: "removeAt",
                value: function removeAt(t) {
                    this.records.splice(t, 1);
                    for (var _e2 = t, _n = this.size(); _e2 < _n; _e2 += 1)
                        this.records[_e2].i -= 1;
                },
            },
            {
                key: "getValueForItemAtKeyId",
                value: function getValueForItemAtKeyId(t, e) {
                    return t[this._keysMap[e]];
                },
            },
            {
                key: "size",
                value: function size() {
                    return this.records.length;
                },
            },
            {
                key: "_addString",
                value: function _addString(t, e) {
                    if (!c(t) || o(t)) return;
                    var n = {
                        v: t,
                        i: e,
                        n: this.norm.get(t),
                    };
                    this.records.push(n);
                },
            },
            {
                key: "_addObject",
                value: function _addObject(e, n) {
                    var _this4 = this;
                    var i = {
                        i: n,
                        $: {},
                    };
                    this.keys.forEach(function (n, r) {
                        var u = n.getFn ? n.getFn(e) : _this4.getFn(e, n.path);
                        if (c(u))
                            if (t(u)) {
                                var _e3 = [];
                                var _n2 = [
                                    {
                                        nestedArrIndex: -1,
                                        value: u,
                                    },
                                ];
                                for (; _n2.length; ) {
                                    var _n2$pop = _n2.pop(),
                                        _i = _n2$pop.nestedArrIndex,
                                        _r = _n2$pop.value;
                                    if (c(_r))
                                        if (s(_r) && !o(_r)) {
                                            var _t3 = {
                                                v: _r,
                                                i: _i,
                                                n: _this4.norm.get(_r),
                                            };
                                            _e3.push(_t3);
                                        } else
                                            t(_r) &&
                                                _r.forEach(function (t, e) {
                                                    _n2.push({
                                                        nestedArrIndex: e,
                                                        value: t,
                                                    });
                                                });
                                }
                                i.$[r] = _e3;
                            } else if (s(u) && !o(u)) {
                                var _t4 = {
                                    v: u,
                                    n: _this4.norm.get(u),
                                };
                                i.$[r] = _t4;
                            }
                    }),
                        this.records.push(i);
                },
            },
            {
                key: "toJSON",
                value: function toJSON() {
                    return {
                        keys: this.keys,
                        records: this.records,
                    };
                },
            },
        ]);
    })();
    function M(t, e) {
        var _ref2 =
                arguments.length > 2 && arguments[2] !== undefined
                    ? arguments[2]
                    : {},
            _ref2$getFn = _ref2.getFn,
            n = _ref2$getFn === void 0 ? C.getFn : _ref2$getFn,
            _ref2$fieldNormWeight = _ref2.fieldNormWeight,
            s =
                _ref2$fieldNormWeight === void 0
                    ? C.fieldNormWeight
                    : _ref2$fieldNormWeight;
        var i = new F({
            getFn: n,
            fieldNormWeight: s,
        });
        return i.setKeys(t.map(f)), i.setSources(e), i.create(), i;
    }
    function E(t) {
        var _ref3 =
                arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {},
            _ref3$errors = _ref3.errors,
            e = _ref3$errors === void 0 ? 0 : _ref3$errors,
            _ref3$currentLocation = _ref3.currentLocation,
            n = _ref3$currentLocation === void 0 ? 0 : _ref3$currentLocation,
            _ref3$expectedLocatio = _ref3.expectedLocation,
            s = _ref3$expectedLocatio === void 0 ? 0 : _ref3$expectedLocatio,
            _ref3$distance = _ref3.distance,
            i = _ref3$distance === void 0 ? C.distance : _ref3$distance,
            _ref3$ignoreLocation = _ref3.ignoreLocation,
            r =
                _ref3$ignoreLocation === void 0
                    ? C.ignoreLocation
                    : _ref3$ignoreLocation;
        var u = e / t.length;
        if (r) return u;
        var c = Math.abs(s - n);
        return i ? u + c / i : c ? 1 : u;
    }
    var D = 32;
    function B(t, e, n) {
        var _ref4 =
                arguments.length > 3 && arguments[3] !== undefined
                    ? arguments[3]
                    : {},
            _ref4$location = _ref4.location,
            s = _ref4$location === void 0 ? C.location : _ref4$location,
            _ref4$distance = _ref4.distance,
            i = _ref4$distance === void 0 ? C.distance : _ref4$distance,
            _ref4$threshold = _ref4.threshold,
            r = _ref4$threshold === void 0 ? C.threshold : _ref4$threshold,
            _ref4$findAllMatches = _ref4.findAllMatches,
            u =
                _ref4$findAllMatches === void 0
                    ? C.findAllMatches
                    : _ref4$findAllMatches,
            _ref4$minMatchCharLen = _ref4.minMatchCharLength,
            c =
                _ref4$minMatchCharLen === void 0
                    ? C.minMatchCharLength
                    : _ref4$minMatchCharLen,
            _ref4$includeMatches = _ref4.includeMatches,
            o =
                _ref4$includeMatches === void 0
                    ? C.includeMatches
                    : _ref4$includeMatches,
            _ref4$ignoreLocation = _ref4.ignoreLocation,
            h =
                _ref4$ignoreLocation === void 0
                    ? C.ignoreLocation
                    : _ref4$ignoreLocation;
        if (e.length > D)
            throw new Error("Pattern length exceeds max of ".concat(D, "\n."));
        var a = e.length,
            l = t.length,
            d = Math.max(0, Math.min(s, l));
        var g = r,
            f = d;
        var A = c > 1 || o,
            p = A ? Array(l) : [];
        var m;
        for (; (m = t.indexOf(e, f)) > -1; ) {
            var _t5 = E(e, {
                currentLocation: m,
                expectedLocation: d,
                distance: i,
                ignoreLocation: h,
            });
            if (((g = Math.min(_t5, g)), (f = m + a), A)) {
                var _t6 = 0;
                for (; _t6 < a; ) (p[m + _t6] = 1), (_t6 += 1);
            }
        }
        f = -1;
        var F = [],
            M = 1,
            B = a + l;
        var x = 1 << (a - 1);
        for (var _s = 0; _s < a; _s += 1) {
            var _r2 = 0,
                _c = B;
            for (; _r2 < _c; ) {
                E(e, {
                    errors: _s,
                    currentLocation: d + _c,
                    expectedLocation: d,
                    distance: i,
                    ignoreLocation: h,
                }) <= g
                    ? (_r2 = _c)
                    : (B = _c),
                    (_c = Math.floor((B - _r2) / 2 + _r2));
            }
            B = _c;
            var _o = Math.max(1, d - _c + 1),
                _C = u ? l : Math.min(d + _c, l) + a,
                _m = Array(_C + 2);
            _m[_C + 1] = (1 << _s) - 1;
            for (var _r3 = _C; _r3 >= _o; _r3 -= 1) {
                var _u = _r3 - 1,
                    _c2 = n[t.charAt(_u)];
                if (
                    (A && (p[_u] = +!!_c2),
                    (_m[_r3] = ((_m[_r3 + 1] << 1) | 1) & _c2),
                    _s &&
                        (_m[_r3] |=
                            ((F[_r3 + 1] | F[_r3]) << 1) | 1 | F[_r3 + 1]),
                    _m[_r3] & x &&
                        ((M = E(e, {
                            errors: _s,
                            currentLocation: _u,
                            expectedLocation: d,
                            distance: i,
                            ignoreLocation: h,
                        })),
                        M <= g))
                ) {
                    if (((g = M), (f = _u), f <= d)) break;
                    _o = Math.max(1, 2 * d - f);
                }
            }
            if (
                E(e, {
                    errors: _s + 1,
                    currentLocation: d,
                    expectedLocation: d,
                    distance: i,
                    ignoreLocation: h,
                }) > g
            )
                break;
            F = _m;
        }
        var y = {
            isMatch: f >= 0,
            score: Math.max(0.001, M),
        };
        if (A) {
            var _t7 = (function () {
                var t =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : [];
                var e =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : C.minMatchCharLength;
                var n = [],
                    s = -1,
                    i = -1,
                    r = 0;
                for (var _u2 = t.length; r < _u2; r += 1) {
                    var _u3 = t[r];
                    _u3 && -1 === s
                        ? (s = r)
                        : _u3 ||
                          -1 === s ||
                          ((i = r - 1),
                          i - s + 1 >= e && n.push([s, i]),
                          (s = -1));
                }
                return t[r - 1] && r - s >= e && n.push([s, r - 1]), n;
            })(p, c);
            _t7.length ? o && (y.indices = _t7) : (y.isMatch = !1);
        }
        return y;
    }
    function x(t) {
        var e = {};
        for (var _n3 = 0, _s2 = t.length; _n3 < _s2; _n3 += 1) {
            var _i2 = t.charAt(_n3);
            e[_i2] = (e[_i2] || 0) | (1 << (_s2 - _n3 - 1));
        }
        return e;
    }
    var y = String.prototype.normalize
        ? function (t) {
              return t
                  .normalize("NFD")
                  .replace(
                      /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g,
                      ""
                  );
          }
        : function (t) {
              return t;
          };
    var L = /*#__PURE__*/ (function () {
        function L(t) {
            var _this5 = this;
            var _ref5 =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref5$location = _ref5.location,
                e = _ref5$location === void 0 ? C.location : _ref5$location,
                _ref5$threshold = _ref5.threshold,
                n = _ref5$threshold === void 0 ? C.threshold : _ref5$threshold,
                _ref5$distance = _ref5.distance,
                s = _ref5$distance === void 0 ? C.distance : _ref5$distance,
                _ref5$includeMatches = _ref5.includeMatches,
                i =
                    _ref5$includeMatches === void 0
                        ? C.includeMatches
                        : _ref5$includeMatches,
                _ref5$findAllMatches = _ref5.findAllMatches,
                r =
                    _ref5$findAllMatches === void 0
                        ? C.findAllMatches
                        : _ref5$findAllMatches,
                _ref5$minMatchCharLen = _ref5.minMatchCharLength,
                u =
                    _ref5$minMatchCharLen === void 0
                        ? C.minMatchCharLength
                        : _ref5$minMatchCharLen,
                _ref5$isCaseSensitive = _ref5.isCaseSensitive,
                c =
                    _ref5$isCaseSensitive === void 0
                        ? C.isCaseSensitive
                        : _ref5$isCaseSensitive,
                _ref5$ignoreDiacritic = _ref5.ignoreDiacritics,
                o =
                    _ref5$ignoreDiacritic === void 0
                        ? C.ignoreDiacritics
                        : _ref5$ignoreDiacritic,
                _ref5$ignoreLocation = _ref5.ignoreLocation,
                h =
                    _ref5$ignoreLocation === void 0
                        ? C.ignoreLocation
                        : _ref5$ignoreLocation;
            _classCallCheck(this, L);
            if (
                ((this.options = {
                    location: e,
                    threshold: n,
                    distance: s,
                    includeMatches: i,
                    findAllMatches: r,
                    minMatchCharLength: u,
                    isCaseSensitive: c,
                    ignoreDiacritics: o,
                    ignoreLocation: h,
                }),
                (t = c ? t : t.toLowerCase()),
                (t = o ? y(t) : t),
                (this.pattern = t),
                (this.chunks = []),
                !this.pattern.length)
            )
                return;
            var a = function a(t, e) {
                    _this5.chunks.push({
                        pattern: t,
                        alphabet: x(t),
                        startIndex: e,
                    });
                },
                l = this.pattern.length;
            if (l > D) {
                var _t8 = 0;
                var _e4 = l % D,
                    _n4 = l - _e4;
                for (; _t8 < _n4; )
                    a(this.pattern.substr(_t8, D), _t8), (_t8 += D);
                if (_e4) {
                    var _t9 = l - D;
                    a(this.pattern.substr(_t9), _t9);
                }
            } else a(this.pattern, 0);
        }
        return _createClass(L, [
            {
                key: "searchIn",
                value: function searchIn(t) {
                    var _this$options = this.options,
                        e = _this$options.isCaseSensitive,
                        n = _this$options.ignoreDiacritics,
                        s = _this$options.includeMatches;
                    if (
                        ((t = e ? t : t.toLowerCase()),
                        (t = n ? y(t) : t),
                        this.pattern === t)
                    ) {
                        var _e5 = {
                            isMatch: !0,
                            score: 0,
                        };
                        return s && (_e5.indices = [[0, t.length - 1]]), _e5;
                    }
                    var _this$options2 = this.options,
                        i = _this$options2.location,
                        r = _this$options2.distance,
                        u = _this$options2.threshold,
                        c = _this$options2.findAllMatches,
                        o = _this$options2.minMatchCharLength,
                        h = _this$options2.ignoreLocation;
                    var a = [],
                        l = 0,
                        d = !1;
                    this.chunks.forEach(function (_ref6) {
                        var e = _ref6.pattern,
                            n = _ref6.alphabet,
                            g = _ref6.startIndex;
                        var _B = B(t, e, n, {
                                location: i + g,
                                distance: r,
                                threshold: u,
                                findAllMatches: c,
                                minMatchCharLength: o,
                                includeMatches: s,
                                ignoreLocation: h,
                            }),
                            f = _B.isMatch,
                            A = _B.score,
                            p = _B.indices;
                        f && (d = !0),
                            (l += A),
                            f &&
                                p &&
                                (a = [].concat(
                                    _toConsumableArray(a),
                                    _toConsumableArray(p)
                                ));
                    });
                    var g = {
                        isMatch: d,
                        score: d ? l / this.chunks.length : 1,
                    };
                    return d && s && (g.indices = a), g;
                },
            },
        ]);
    })();
    var k = /*#__PURE__*/ (function () {
        function k(t) {
            _classCallCheck(this, k);
            this.pattern = t;
        }
        return _createClass(
            k,
            [
                {
                    key: "search",
                    value: function search() {},
                },
            ],
            [
                {
                    key: "isMultiMatch",
                    value: function isMultiMatch(t) {
                        return _(t, this.multiRegex);
                    },
                },
                {
                    key: "isSingleMatch",
                    value: function isSingleMatch(t) {
                        return _(t, this.singleRegex);
                    },
                },
            ]
        );
    })();
    function _(t, e) {
        var n = t.match(e);
        return n ? n[1] : null;
    }
    var v = /*#__PURE__*/ (function (_k) {
        function v(t) {
            var _this6;
            var _ref7 =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref7$location = _ref7.location,
                e = _ref7$location === void 0 ? C.location : _ref7$location,
                _ref7$threshold = _ref7.threshold,
                n = _ref7$threshold === void 0 ? C.threshold : _ref7$threshold,
                _ref7$distance = _ref7.distance,
                s = _ref7$distance === void 0 ? C.distance : _ref7$distance,
                _ref7$includeMatches = _ref7.includeMatches,
                i =
                    _ref7$includeMatches === void 0
                        ? C.includeMatches
                        : _ref7$includeMatches,
                _ref7$findAllMatches = _ref7.findAllMatches,
                r =
                    _ref7$findAllMatches === void 0
                        ? C.findAllMatches
                        : _ref7$findAllMatches,
                _ref7$minMatchCharLen = _ref7.minMatchCharLength,
                u =
                    _ref7$minMatchCharLen === void 0
                        ? C.minMatchCharLength
                        : _ref7$minMatchCharLen,
                _ref7$isCaseSensitive = _ref7.isCaseSensitive,
                c =
                    _ref7$isCaseSensitive === void 0
                        ? C.isCaseSensitive
                        : _ref7$isCaseSensitive,
                _ref7$ignoreDiacritic = _ref7.ignoreDiacritics,
                o =
                    _ref7$ignoreDiacritic === void 0
                        ? C.ignoreDiacritics
                        : _ref7$ignoreDiacritic,
                _ref7$ignoreLocation = _ref7.ignoreLocation,
                h =
                    _ref7$ignoreLocation === void 0
                        ? C.ignoreLocation
                        : _ref7$ignoreLocation;
            _classCallCheck(this, v);
            (_this6 = _callSuper(this, v, [t])),
                (_this6._bitapSearch = new L(t, {
                    location: e,
                    threshold: n,
                    distance: s,
                    includeMatches: i,
                    findAllMatches: r,
                    minMatchCharLength: u,
                    isCaseSensitive: c,
                    ignoreDiacritics: o,
                    ignoreLocation: h,
                }));
            return _this6;
        }
        _inherits(v, _k);
        return _createClass(
            v,
            [
                {
                    key: "search",
                    value: function search(t) {
                        return this._bitapSearch.searchIn(t);
                    },
                },
            ],
            [
                {
                    key: "type",
                    get: function get() {
                        return "fuzzy";
                    },
                },
                {
                    key: "multiRegex",
                    get: function get() {
                        return /^"(.*)"$/;
                    },
                },
                {
                    key: "singleRegex",
                    get: function get() {
                        return /^(.*)$/;
                    },
                },
            ]
        );
    })(k);
    var S = /*#__PURE__*/ (function (_k2) {
        function S(t) {
            _classCallCheck(this, S);
            return _callSuper(this, S, [t]);
        }
        _inherits(S, _k2);
        return _createClass(
            S,
            [
                {
                    key: "search",
                    value: function search(t) {
                        var e,
                            n = 0;
                        var s = [],
                            i = this.pattern.length;
                        for (; (e = t.indexOf(this.pattern, n)) > -1; )
                            (n = e + i), s.push([e, n - 1]);
                        var r = !!s.length;
                        return {
                            isMatch: r,
                            score: r ? 0 : 1,
                            indices: s,
                        };
                    },
                },
            ],
            [
                {
                    key: "type",
                    get: function get() {
                        return "include";
                    },
                },
                {
                    key: "multiRegex",
                    get: function get() {
                        return /^'"(.*)"$/;
                    },
                },
                {
                    key: "singleRegex",
                    get: function get() {
                        return /^'(.*)$/;
                    },
                },
            ]
        );
    })(k);
    var I = [
            /*#__PURE__*/ (function (_k3) {
                function _class(t) {
                    _classCallCheck(this, _class);
                    return _callSuper(this, _class, [t]);
                }
                _inherits(_class, _k3);
                return _createClass(
                    _class,
                    [
                        {
                            key: "search",
                            value: function search(t) {
                                var e = t === this.pattern;
                                return {
                                    isMatch: e,
                                    score: e ? 0 : 1,
                                    indices: [0, this.pattern.length - 1],
                                };
                            },
                        },
                    ],
                    [
                        {
                            key: "type",
                            get: function get() {
                                return "exact";
                            },
                        },
                        {
                            key: "multiRegex",
                            get: function get() {
                                return /^="(.*)"$/;
                            },
                        },
                        {
                            key: "singleRegex",
                            get: function get() {
                                return /^=(.*)$/;
                            },
                        },
                    ]
                );
            })(k),
            S,
            /*#__PURE__*/ (function (_k4) {
                function _class2(t) {
                    _classCallCheck(this, _class2);
                    return _callSuper(this, _class2, [t]);
                }
                _inherits(_class2, _k4);
                return _createClass(
                    _class2,
                    [
                        {
                            key: "search",
                            value: function search(t) {
                                var e = t.startsWith(this.pattern);
                                return {
                                    isMatch: e,
                                    score: e ? 0 : 1,
                                    indices: [0, this.pattern.length - 1],
                                };
                            },
                        },
                    ],
                    [
                        {
                            key: "type",
                            get: function get() {
                                return "prefix-exact";
                            },
                        },
                        {
                            key: "multiRegex",
                            get: function get() {
                                return /^\^"(.*)"$/;
                            },
                        },
                        {
                            key: "singleRegex",
                            get: function get() {
                                return /^\^(.*)$/;
                            },
                        },
                    ]
                );
            })(k),
            /*#__PURE__*/ (function (_k5) {
                function _class3(t) {
                    _classCallCheck(this, _class3);
                    return _callSuper(this, _class3, [t]);
                }
                _inherits(_class3, _k5);
                return _createClass(
                    _class3,
                    [
                        {
                            key: "search",
                            value: function search(t) {
                                var e = !t.startsWith(this.pattern);
                                return {
                                    isMatch: e,
                                    score: e ? 0 : 1,
                                    indices: [0, t.length - 1],
                                };
                            },
                        },
                    ],
                    [
                        {
                            key: "type",
                            get: function get() {
                                return "inverse-prefix-exact";
                            },
                        },
                        {
                            key: "multiRegex",
                            get: function get() {
                                return /^!\^"(.*)"$/;
                            },
                        },
                        {
                            key: "singleRegex",
                            get: function get() {
                                return /^!\^(.*)$/;
                            },
                        },
                    ]
                );
            })(k),
            /*#__PURE__*/ (function (_k6) {
                function _class4(t) {
                    _classCallCheck(this, _class4);
                    return _callSuper(this, _class4, [t]);
                }
                _inherits(_class4, _k6);
                return _createClass(
                    _class4,
                    [
                        {
                            key: "search",
                            value: function search(t) {
                                var e = !t.endsWith(this.pattern);
                                return {
                                    isMatch: e,
                                    score: e ? 0 : 1,
                                    indices: [0, t.length - 1],
                                };
                            },
                        },
                    ],
                    [
                        {
                            key: "type",
                            get: function get() {
                                return "inverse-suffix-exact";
                            },
                        },
                        {
                            key: "multiRegex",
                            get: function get() {
                                return /^!"(.*)"\$$/;
                            },
                        },
                        {
                            key: "singleRegex",
                            get: function get() {
                                return /^!(.*)\$$/;
                            },
                        },
                    ]
                );
            })(k),
            /*#__PURE__*/ (function (_k7) {
                function _class5(t) {
                    _classCallCheck(this, _class5);
                    return _callSuper(this, _class5, [t]);
                }
                _inherits(_class5, _k7);
                return _createClass(
                    _class5,
                    [
                        {
                            key: "search",
                            value: function search(t) {
                                var e = t.endsWith(this.pattern);
                                return {
                                    isMatch: e,
                                    score: e ? 0 : 1,
                                    indices: [
                                        t.length - this.pattern.length,
                                        t.length - 1,
                                    ],
                                };
                            },
                        },
                    ],
                    [
                        {
                            key: "type",
                            get: function get() {
                                return "suffix-exact";
                            },
                        },
                        {
                            key: "multiRegex",
                            get: function get() {
                                return /^"(.*)"\$$/;
                            },
                        },
                        {
                            key: "singleRegex",
                            get: function get() {
                                return /^(.*)\$$/;
                            },
                        },
                    ]
                );
            })(k),
            /*#__PURE__*/ (function (_k8) {
                function _class6(t) {
                    _classCallCheck(this, _class6);
                    return _callSuper(this, _class6, [t]);
                }
                _inherits(_class6, _k8);
                return _createClass(
                    _class6,
                    [
                        {
                            key: "search",
                            value: function search(t) {
                                var e = -1 === t.indexOf(this.pattern);
                                return {
                                    isMatch: e,
                                    score: e ? 0 : 1,
                                    indices: [0, t.length - 1],
                                };
                            },
                        },
                    ],
                    [
                        {
                            key: "type",
                            get: function get() {
                                return "inverse-exact";
                            },
                        },
                        {
                            key: "multiRegex",
                            get: function get() {
                                return /^!"(.*)"$/;
                            },
                        },
                        {
                            key: "singleRegex",
                            get: function get() {
                                return /^!(.*)$/;
                            },
                        },
                    ]
                );
            })(k),
            v,
        ],
        w = I.length,
        $ = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
    var b = new Set([v.type, S.type]);
    var N = /*#__PURE__*/ (function () {
        function N(t) {
            var _ref8 =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref8$isCaseSensitive = _ref8.isCaseSensitive,
                e =
                    _ref8$isCaseSensitive === void 0
                        ? C.isCaseSensitive
                        : _ref8$isCaseSensitive,
                _ref8$ignoreDiacritic = _ref8.ignoreDiacritics,
                n =
                    _ref8$ignoreDiacritic === void 0
                        ? C.ignoreDiacritics
                        : _ref8$ignoreDiacritic,
                _ref8$includeMatches = _ref8.includeMatches,
                s =
                    _ref8$includeMatches === void 0
                        ? C.includeMatches
                        : _ref8$includeMatches,
                _ref8$minMatchCharLen = _ref8.minMatchCharLength,
                i =
                    _ref8$minMatchCharLen === void 0
                        ? C.minMatchCharLength
                        : _ref8$minMatchCharLen,
                _ref8$ignoreLocation = _ref8.ignoreLocation,
                r =
                    _ref8$ignoreLocation === void 0
                        ? C.ignoreLocation
                        : _ref8$ignoreLocation,
                _ref8$findAllMatches = _ref8.findAllMatches,
                u =
                    _ref8$findAllMatches === void 0
                        ? C.findAllMatches
                        : _ref8$findAllMatches,
                _ref8$location = _ref8.location,
                c = _ref8$location === void 0 ? C.location : _ref8$location,
                _ref8$threshold = _ref8.threshold,
                o = _ref8$threshold === void 0 ? C.threshold : _ref8$threshold,
                _ref8$distance = _ref8.distance,
                h = _ref8$distance === void 0 ? C.distance : _ref8$distance;
            _classCallCheck(this, N);
            (this.query = null),
                (this.options = {
                    isCaseSensitive: e,
                    ignoreDiacritics: n,
                    includeMatches: s,
                    minMatchCharLength: i,
                    findAllMatches: u,
                    ignoreLocation: r,
                    location: c,
                    threshold: o,
                    distance: h,
                }),
                (t = e ? t : t.toLowerCase()),
                (t = n ? y(t) : t),
                (this.pattern = t),
                (this.query = (function (t) {
                    var e =
                        arguments.length > 1 && arguments[1] !== undefined
                            ? arguments[1]
                            : {};
                    return t.split("|").map(function (t) {
                        var n = t
                                .trim()
                                .split($)
                                .filter(function (t) {
                                    return t && !!t.trim();
                                }),
                            s = [];
                        for (
                            var _t10 = 0, _i3 = n.length;
                            _t10 < _i3;
                            _t10 += 1
                        ) {
                            var _i4 = n[_t10];
                            var _r4 = !1,
                                _u4 = -1;
                            for (; !_r4 && ++_u4 < w; ) {
                                var _t11 = I[_u4];
                                var _n5 = _t11.isMultiMatch(_i4);
                                _n5 && (s.push(new _t11(_n5, e)), (_r4 = !0));
                            }
                            if (!_r4)
                                for (_u4 = -1; ++_u4 < w; ) {
                                    var _t12 = I[_u4];
                                    var _n6 = _t12.isSingleMatch(_i4);
                                    if (_n6) {
                                        s.push(new _t12(_n6, e));
                                        break;
                                    }
                                }
                        }
                        return s;
                    });
                })(this.pattern, this.options));
        }
        return _createClass(
            N,
            [
                {
                    key: "searchIn",
                    value: function searchIn(t) {
                        var e = this.query;
                        if (!e)
                            return {
                                isMatch: !1,
                                score: 1,
                            };
                        var _this$options3 = this.options,
                            n = _this$options3.includeMatches,
                            s = _this$options3.isCaseSensitive,
                            i = _this$options3.ignoreDiacritics;
                        (t = s ? t : t.toLowerCase()), (t = i ? y(t) : t);
                        var r = 0,
                            u = [],
                            c = 0;
                        for (var _s3 = 0, _i5 = e.length; _s3 < _i5; _s3 += 1) {
                            var _i6 = e[_s3];
                            (u.length = 0), (r = 0);
                            for (
                                var _e6 = 0, _s4 = _i6.length;
                                _e6 < _s4;
                                _e6 += 1
                            ) {
                                var _s5 = _i6[_e6],
                                    _s$search = _s5.search(t),
                                    _o2 = _s$search.isMatch,
                                    _h = _s$search.indices,
                                    _a2 = _s$search.score;
                                if (!_o2) {
                                    (c = 0), (r = 0), (u.length = 0);
                                    break;
                                }
                                if (((r += 1), (c += _a2), n)) {
                                    var _t13 = _s5.constructor.type;
                                    b.has(_t13)
                                        ? (u = [].concat(
                                              _toConsumableArray(u),
                                              _toConsumableArray(_h)
                                          ))
                                        : u.push(_h);
                                }
                            }
                            if (r) {
                                var _t14 = {
                                    isMatch: !0,
                                    score: c / r,
                                };
                                return n && (_t14.indices = u), _t14;
                            }
                        }
                        return {
                            isMatch: !1,
                            score: 1,
                        };
                    },
                },
            ],
            [
                {
                    key: "condition",
                    value: function condition(t, e) {
                        return e.useExtendedSearch;
                    },
                },
            ]
        );
    })();
    var R = [];
    function O(t, e) {
        for (var _n7 = 0, _s6 = R.length; _n7 < _s6; _n7 += 1) {
            var _s7 = R[_n7];
            if (_s7.condition(t, e)) return new _s7(t, e);
        }
        return new L(t, e);
    }
    var j = "$and",
        W = "$or",
        z = "$path",
        K = "$val",
        P = function P(t) {
            return !(!t[j] && !t[W]);
        },
        q = function q(t) {
            return _defineProperty(
                {},
                j,
                Object.keys(t).map(function (e) {
                    return _defineProperty({}, e, t[e]);
                })
            );
        };
    function J(e, n) {
        var _ref11 =
                arguments.length > 2 && arguments[2] !== undefined
                    ? arguments[2]
                    : {},
            _ref11$auto = _ref11.auto,
            i = _ref11$auto === void 0 ? !0 : _ref11$auto;
        var _r6 = function r(e) {
            var c = Object.keys(e);
            var o = (function (t) {
                return !!t[z];
            })(e);
            if (!o && c.length > 1 && !P(e)) return _r6(q(e));
            if (
                (function (e) {
                    return !t(e) && u(e) && !P(e);
                })(e)
            ) {
                var _t15 = o ? e[z] : c[0],
                    _r5 = o ? e[K] : e[_t15];
                if (!s(_r5))
                    throw new Error(
                        (function (t) {
                            return "Invalid value for key ".concat(t, "\n");
                        })(_t15)
                    );
                var _u5 = {
                    keyId: p(_t15),
                    pattern: _r5,
                };
                return i && (_u5.searcher = O(_r5, n)), _u5;
            }
            var h = {
                children: [],
                operator: c[0],
            };
            return (
                c.forEach(function (n) {
                    var s = e[n];
                    t(s) &&
                        s.forEach(function (t) {
                            h.children.push(_r6(t));
                        });
                }),
                h
            );
        };
        return P(e) || (e = q(e)), _r6(e);
    }
    function V(t, e) {
        var n = t.matches;
        (e.matches = []),
            c(n) &&
                n.forEach(function (t) {
                    if (!c(t.indices) || !t.indices.length) return;
                    var n = t.indices,
                        s = t.value;
                    var i = {
                        indices: n,
                        value: s,
                    };
                    t.key && (i.key = t.key.src),
                        t.idx > -1 && (i.refIndex = t.idx),
                        e.matches.push(i);
                });
    }
    function U(t, e) {
        e.score = t.score;
    }
    var G = /*#__PURE__*/ (function () {
        function G(t) {
            var e =
                arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};
            var n = arguments.length > 2 ? arguments[2] : undefined;
            _classCallCheck(this, G);
            (this.options = _objectSpread(_objectSpread({}, C), e)),
                this.options.useExtendedSearch,
                (this._keyStore = new g(this.options.keys)),
                this.setCollection(t, n);
        }
        return _createClass(G, [
            {
                key: "setCollection",
                value: function setCollection(t, e) {
                    if (((this._docs = t), e && !(e instanceof F)))
                        throw new Error("Incorrect 'index' type");
                    this._myIndex =
                        e ||
                        M(this.options.keys, this._docs, {
                            getFn: this.options.getFn,
                            fieldNormWeight: this.options.fieldNormWeight,
                        });
                },
            },
            {
                key: "add",
                value: function add(t) {
                    c(t) && (this._docs.push(t), this._myIndex.add(t));
                },
            },
            {
                key: "remove",
                value: function remove() {
                    var t =
                        arguments.length > 0 && arguments[0] !== undefined
                            ? arguments[0]
                            : function () {
                                  return !1;
                              };
                    var e = [];
                    for (
                        var _n8 = 0, _s8 = this._docs.length;
                        _n8 < _s8;
                        _n8 += 1
                    ) {
                        var _i7 = this._docs[_n8];
                        t(_i7, _n8) &&
                            (this.removeAt(_n8),
                            (_n8 -= 1),
                            (_s8 -= 1),
                            e.push(_i7));
                    }
                    return e;
                },
            },
            {
                key: "removeAt",
                value: function removeAt(t) {
                    this._docs.splice(t, 1), this._myIndex.removeAt(t);
                },
            },
            {
                key: "getIndex",
                value: function getIndex() {
                    return this._myIndex;
                },
            },
            {
                key: "search",
                value: function search(t) {
                    var _ref12 =
                            arguments.length > 1 && arguments[1] !== undefined
                                ? arguments[1]
                                : {},
                        _ref12$limit = _ref12.limit,
                        e = _ref12$limit === void 0 ? -1 : _ref12$limit;
                    var _this$options4 = this.options,
                        n = _this$options4.includeMatches,
                        r = _this$options4.includeScore,
                        u = _this$options4.shouldSort,
                        c = _this$options4.sortFn,
                        o = _this$options4.ignoreFieldNorm;
                    var h = s(t)
                        ? s(this._docs[0])
                            ? this._searchStringList(t)
                            : this._searchObjectList(t)
                        : this._searchLogical(t);
                    return (
                        (function (t, _ref13) {
                            var _ref13$ignoreFieldNor = _ref13.ignoreFieldNorm,
                                e =
                                    _ref13$ignoreFieldNor === void 0
                                        ? C.ignoreFieldNorm
                                        : _ref13$ignoreFieldNor;
                            t.forEach(function (t) {
                                var n = 1;
                                t.matches.forEach(function (_ref14) {
                                    var t = _ref14.key,
                                        s = _ref14.norm,
                                        i = _ref14.score;
                                    var r = t ? t.weight : null;
                                    n *= Math.pow(
                                        0 === i && r ? Number.EPSILON : i,
                                        (r || 1) * (e ? 1 : s)
                                    );
                                }),
                                    (t.score = n);
                            });
                        })(h, {
                            ignoreFieldNorm: o,
                        }),
                        u && h.sort(c),
                        i(e) && e > -1 && (h = h.slice(0, e)),
                        (function (t, e) {
                            var _ref15 =
                                    arguments.length > 2 &&
                                    arguments[2] !== undefined
                                        ? arguments[2]
                                        : {},
                                _ref15$includeMatches = _ref15.includeMatches,
                                n =
                                    _ref15$includeMatches === void 0
                                        ? C.includeMatches
                                        : _ref15$includeMatches,
                                _ref15$includeScore = _ref15.includeScore,
                                s =
                                    _ref15$includeScore === void 0
                                        ? C.includeScore
                                        : _ref15$includeScore;
                            var i = [];
                            return (
                                n && i.push(V),
                                s && i.push(U),
                                t.map(function (t) {
                                    var n = t.idx,
                                        s = {
                                            item: e[n],
                                            refIndex: n,
                                        };
                                    return (
                                        i.length &&
                                            i.forEach(function (e) {
                                                e(t, s);
                                            }),
                                        s
                                    );
                                })
                            );
                        })(h, this._docs, {
                            includeMatches: n,
                            includeScore: r,
                        })
                    );
                },
            },
            {
                key: "_searchStringList",
                value: function _searchStringList(t) {
                    var e = O(t, this.options),
                        n = this._myIndex.records,
                        s = [];
                    return (
                        n.forEach(function (_ref16) {
                            var t = _ref16.v,
                                n = _ref16.i,
                                i = _ref16.n;
                            if (!c(t)) return;
                            var _e$searchIn = e.searchIn(t),
                                r = _e$searchIn.isMatch,
                                u = _e$searchIn.score,
                                o = _e$searchIn.indices;
                            r &&
                                s.push({
                                    item: t,
                                    idx: n,
                                    matches: [
                                        {
                                            score: u,
                                            value: t,
                                            norm: i,
                                            indices: o,
                                        },
                                    ],
                                });
                        }),
                        s
                    );
                },
            },
            {
                key: "_searchLogical",
                value: function _searchLogical(t) {
                    var _this7 = this;
                    var e = J(t, this.options),
                        _n10 = function n(t, e, s) {
                            if (!t.children) {
                                var _n9 = t.keyId,
                                    _i8 = t.searcher,
                                    _r7 = _this7._findMatches({
                                        key: _this7._keyStore.get(_n9),
                                        value: _this7._myIndex.getValueForItemAtKeyId(
                                            e,
                                            _n9
                                        ),
                                        searcher: _i8,
                                    });
                                return _r7 && _r7.length
                                    ? [
                                          {
                                              idx: s,
                                              item: e,
                                              matches: _r7,
                                          },
                                      ]
                                    : [];
                            }
                            var i = [];
                            for (
                                var _r8 = 0, _u6 = t.children.length;
                                _r8 < _u6;
                                _r8 += 1
                            ) {
                                var _u7 = t.children[_r8],
                                    _c3 = _n10(_u7, e, s);
                                if (_c3.length)
                                    i.push.apply(i, _toConsumableArray(_c3));
                                else if (t.operator === j) return [];
                            }
                            return i;
                        },
                        s = this._myIndex.records,
                        i = {},
                        r = [];
                    return (
                        s.forEach(function (_ref17) {
                            var t = _ref17.$,
                                s = _ref17.i;
                            if (c(t)) {
                                var _u8 = _n10(e, t, s);
                                _u8.length &&
                                    (i[s] ||
                                        ((i[s] = {
                                            idx: s,
                                            item: t,
                                            matches: [],
                                        }),
                                        r.push(i[s])),
                                    _u8.forEach(function (_ref18) {
                                        var _i$s$matches;
                                        var t = _ref18.matches;
                                        (_i$s$matches =
                                            i[s].matches).push.apply(
                                            _i$s$matches,
                                            _toConsumableArray(t)
                                        );
                                    }));
                            }
                        }),
                        r
                    );
                },
            },
            {
                key: "_searchObjectList",
                value: function _searchObjectList(t) {
                    var _this8 = this;
                    var e = O(t, this.options),
                        _this$_myIndex = this._myIndex,
                        n = _this$_myIndex.keys,
                        s = _this$_myIndex.records,
                        i = [];
                    return (
                        s.forEach(function (_ref19) {
                            var t = _ref19.$,
                                s = _ref19.i;
                            if (!c(t)) return;
                            var r = [];
                            n.forEach(function (n, s) {
                                r.push.apply(
                                    r,
                                    _toConsumableArray(
                                        _this8._findMatches({
                                            key: n,
                                            value: t[s],
                                            searcher: e,
                                        })
                                    )
                                );
                            }),
                                r.length &&
                                    i.push({
                                        idx: s,
                                        item: t,
                                        matches: r,
                                    });
                        }),
                        i
                    );
                },
            },
            {
                key: "_findMatches",
                value: function _findMatches(_ref20) {
                    var e = _ref20.key,
                        n = _ref20.value,
                        s = _ref20.searcher;
                    if (!c(n)) return [];
                    var i = [];
                    if (t(n))
                        n.forEach(function (_ref21) {
                            var t = _ref21.v,
                                n = _ref21.i,
                                r = _ref21.n;
                            if (!c(t)) return;
                            var _s$searchIn = s.searchIn(t),
                                u = _s$searchIn.isMatch,
                                o = _s$searchIn.score,
                                h = _s$searchIn.indices;
                            u &&
                                i.push({
                                    score: o,
                                    key: e,
                                    value: t,
                                    idx: n,
                                    norm: r,
                                    indices: h,
                                });
                        });
                    else {
                        var _t16 = n.v,
                            _r9 = n.n,
                            _s$searchIn2 = s.searchIn(_t16),
                            _u9 = _s$searchIn2.isMatch,
                            _c4 = _s$searchIn2.score,
                            _o3 = _s$searchIn2.indices;
                        _u9 &&
                            i.push({
                                score: _c4,
                                key: e,
                                value: _t16,
                                norm: _r9,
                                indices: _o3,
                            });
                    }
                    return i;
                },
            },
        ]);
    })();
    (G.version = "7.1.0"),
        (G.createIndex = M),
        (G.parseIndex = function (t) {
            var _ref22 =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : {},
                _ref22$getFn = _ref22.getFn,
                e = _ref22$getFn === void 0 ? C.getFn : _ref22$getFn,
                _ref22$fieldNormWeigh = _ref22.fieldNormWeight,
                n =
                    _ref22$fieldNormWeigh === void 0
                        ? C.fieldNormWeight
                        : _ref22$fieldNormWeigh;
            var s = t.keys,
                i = t.records,
                r = new F({
                    getFn: e,
                    fieldNormWeight: n,
                });
            return r.setKeys(s), r.setIndexRecords(i), r;
        }),
        (G.config = C),
        (function () {
            R.push.apply(R, arguments);
        })(N);

    // how to export minified scripts to fandom, step one:
    window.dev.fuse = G;
})(this);