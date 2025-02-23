function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var t = {
    preserveBehavior: !1
  },
  e = function e(_e2) {
    if ("string" == typeof _e2) return [_e2, t];
    var _e = _slicedToArray(_e2, 2),
      n = _e[0],
      _e$ = _e[1],
      r = _e$ === void 0 ? t : _e$;
    return [n, _objectSpread(_objectSpread({}, t), r)];
  },
  n = Object.freeze(
    (function (t) {
      var e = new Set();
      var n = [];
      do {
        Object.getOwnPropertyNames(n).forEach(function (t) {
          "function" == typeof n[t] && e.add(t);
        });
      } while ((n = Object.getPrototypeOf(n)) !== Object.prototype);
      return Array.from(e);
    })()
  );
!(function (t, r, o, i, a, s, c, l, d, p) {
  var u =
    arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : t;
  var f = arguments.length > 11 ? arguments[11] : undefined;
  function h() {
    f ||
      ((f = 1),
      "/" == (c = (s.lib || "/~partytown/") + (s.debug ? "debug/" : ""))[0] &&
        ((d = r.querySelectorAll('script[type="text/partytown"]')),
        i != t
          ? i.dispatchEvent(
              new CustomEvent("pt1", {
                detail: t
              })
            )
          : ((l = setTimeout(
              v,
              (null == s ? void 0 : s.fallbackTimeout) || 1e4
            )),
            r.addEventListener("pt0", w),
            a
              ? y(1)
              : o.serviceWorker
              ? o.serviceWorker
                  .register(c + (s.swPath || "partytown-sw.js"), {
                    scope: c
                  })
                  .then(function (t) {
                    t.active
                      ? y()
                      : t.installing &&
                        t.installing.addEventListener(
                          "statechange",
                          function (t) {
                            "activated" == t.target.state && y();
                          }
                        );
                  }, console.error)
              : v())));
  }
  function y(e) {
    (p = r.createElement(e ? "script" : "iframe")),
      (t._pttab = Date.now()),
      e ||
        ((p.style.display = "block"),
        (p.style.width = "0"),
        (p.style.height = "0"),
        (p.style.border = "0"),
        (p.style.visibility = "hidden"),
        p.setAttribute("aria-hidden", !0)),
      (p.src =
        c +
        "partytown-" +
        (e ? "atomics.js?v=0.11.0" : "sandbox-sw.html?" + t._pttab)),
      r.querySelector(s.sandboxParent || "body").appendChild(p);
  }
  function v(n, o) {
    for (
      w(),
        i == t &&
          (s.forward || []).map(function (n) {
            var _e3 = e(n),
              _e4 = _slicedToArray(_e3, 1),
              r = _e4[0];
            delete t[r.split(".")[0]];
          }),
        n = 0;
      n < d.length;
      n++
    )
      ((o = r.createElement("script")).innerHTML = d[n].innerHTML),
        (o.nonce = s.nonce),
        r.head.appendChild(o);
    p && p.parentNode.removeChild(p);
  }
  function w() {
    clearTimeout(l);
  }
  (s = t.partytown || {}),
    i == t &&
      (s.forward || []).map(function (r) {
        var _e5 = e(r),
          _e6 = _slicedToArray(_e5, 2),
          o = _e6[0],
          i = _e6[1].preserveBehavior;
        (u = t),
          o.split(".").map(function (e, r, o) {
            var a;
            u = u[o[r]] =
              r + 1 < o.length
                ? u[o[r]] || ((a = o[r + 1]), n.includes(a) ? [] : {})
                : (function () {
                    var e = null;
                    if (i) {
                      var _ref = (function (t, e) {
                          var n = t;
                          for (var _t = 0; _t < e.length - 1; _t += 1)
                            n = n[e[_t]];
                          return {
                            thisObject: n,
                            methodOrProperty:
                              e.length > 0 ? n[e[e.length - 1]] : void 0
                          };
                        })(t, o),
                        _n = _ref.methodOrProperty,
                        _r = _ref.thisObject;
                      "function" == typeof _n &&
                        (e = function e() {
                          for (
                            var _len = arguments.length,
                              t = new Array(_len),
                              _key = 0;
                            _key < _len;
                            _key++
                          ) {
                            t[_key] = arguments[_key];
                          }
                          return _n.apply.apply(_n, [_r].concat(t));
                        });
                    }
                    return function () {
                      var n;
                      return (
                        e && (n = e(arguments)),
                        (t._ptf = t._ptf || []).push(o, arguments),
                        n
                      );
                    };
                  })();
          });
      }),
    "complete" == r.readyState
      ? h()
      : (t.addEventListener("DOMContentLoaded", h),
        t.addEventListener("load", h));
})(window, document, navigator, top, window.crossOriginIsolated);