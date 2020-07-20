/*
 Leaflet 1.0.3+ed36a04, a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/
! function(t, e, i) {
    function n() {
        var e = t.L;
        o.noConflict = function() {
            return t.L = e, this
        }, t.L = o
    }
    var o = {
        version: "1.0.3+ed36a04"
    };
    "object" == typeof module && "object" == typeof module.exports ? module.exports = o : "function" == typeof define && define.amd && define(o), "undefined" != typeof t && n(), o.Util = {
            extend: function(t) {
                var e, i, n, o;
                for (i = 1, n = arguments.length; i < n; i++) {
                    o = arguments[i];
                    for (e in o) t[e] = o[e]
                }
                return t
            },
            create: Object.create || function() {
                function t() {}
                return function(e) {
                    return t.prototype = e, new t
                }
            }(),
            bind: function(t, e) {
                var i = Array.prototype.slice;
                if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
                var n = i.call(arguments, 2);
                return function() {
                    return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments)
                }
            },
            stamp: function(t) {
                return t._leaflet_id = t._leaflet_id || ++o.Util.lastId, t._leaflet_id
            },
            lastId: 0,
            throttle: function(t, e, i) {
                var n, o, s, r;
                return r = function() {
                    n = !1, o && (s.apply(i, o), o = !1)
                }, s = function() {
                    n ? o = arguments : (t.apply(i, arguments), setTimeout(r, e), n = !0)
                }
            },
            wrapNum: function(t, e, i) {
                var n = e[1],
                    o = e[0],
                    s = n - o;
                return t === n && i ? t : ((t - o) % s + s) % s + o
            },
            falseFn: function() {
                return !1
            },
            formatNum: function(t, e) {
                var i = Math.pow(10, e || 5);
                return Math.round(t * i) / i
            },
            trim: function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            },
            splitWords: function(t) {
                return o.Util.trim(t).split(/\s+/)
            },
            setOptions: function(t, e) {
                t.hasOwnProperty("options") || (t.options = t.options ? o.Util.create(t.options) : {});
                for (var i in e) t.options[i] = e[i];
                return t.options
            },
            getParamString: function(t, e, i) {
                var n = [];
                for (var o in t) n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
                return (e && e.indexOf("?") !== -1 ? "&" : "?") + n.join("&")
            },
            template: function(t, e) {
                return t.replace(o.Util.templateRe, function(t, n) {
                    var o = e[n];
                    if (o === i) throw new Error("No value provided for variable " + t);
                    return "function" == typeof o && (o = o(e)), o
                })
            },
            templateRe: /\{ *([\w_\-]+) *\}/g,
            isArray: Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            indexOf: function(t, e) {
                for (var i = 0; i < t.length; i++)
                    if (t[i] === e) return i;
                return -1
            },
            emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        },
        function() {
            function e(e) {
                return t["webkit" + e] || t["moz" + e] || t["ms" + e]
            }

            function i(e) {
                var i = +new Date,
                    o = Math.max(0, 16 - (i - n));
                return n = i + o, t.setTimeout(e, o)
            }
            var n = 0,
                s = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
                r = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function(e) {
                    t.clearTimeout(e)
                };
            o.Util.requestAnimFrame = function(e, n, r) {
                return r && s === i ? void e.call(n) : s.call(t, o.bind(e, n))
            }, o.Util.cancelAnimFrame = function(e) {
                e && r.call(t, e)
            }
        }(), o.extend = o.Util.extend, o.bind = o.Util.bind, o.stamp = o.Util.stamp, o.setOptions = o.Util.setOptions, o.Class = function() {}, o.Class.extend = function(t) {
            var e = function() {
                    this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
                },
                i = e.__super__ = this.prototype,
                n = o.Util.create(i);
            n.constructor = e, e.prototype = n;
            for (var s in this) this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
            return t.statics && (o.extend(e, t.statics), delete t.statics), t.includes && (o.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), n.options && (t.options = o.Util.extend(o.Util.create(n.options), t.options)), o.extend(n, t), n._initHooks = [], n.callInitHooks = function() {
                if (!this._initHooksCalled) {
                    i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
                    for (var t = 0, e = n._initHooks.length; t < e; t++) n._initHooks[t].call(this)
                }
            }, e
        }, o.Class.include = function(t) {
            return o.extend(this.prototype, t), this
        }, o.Class.mergeOptions = function(t) {
            return o.extend(this.prototype.options, t), this
        }, o.Class.addInitHook = function(t) {
            var e = Array.prototype.slice.call(arguments, 1),
                i = "function" == typeof t ? t : function() {
                    this[t].apply(this, e)
                };
            return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this
        }, o.Evented = o.Class.extend({
            on: function(t, e, i) {
                if ("object" == typeof t)
                    for (var n in t) this._on(n, t[n], e);
                else {
                    t = o.Util.splitWords(t);
                    for (var s = 0, r = t.length; s < r; s++) this._on(t[s], e, i)
                }
                return this
            },
            off: function(t, e, i) {
                if (t)
                    if ("object" == typeof t)
                        for (var n in t) this._off(n, t[n], e);
                    else {
                        t = o.Util.splitWords(t);
                        for (var s = 0, r = t.length; s < r; s++) this._off(t[s], e, i)
                    } else delete this._events;
                return this
            },
            _on: function(t, e, n) {
                this._events = this._events || {};
                var o = this._events[t];
                o || (o = [], this._events[t] = o), n === this && (n = i);
                for (var s = {
                        fn: e,
                        ctx: n
                    }, r = o, a = 0, h = r.length; a < h; a++)
                    if (r[a].fn === e && r[a].ctx === n) return;
                r.push(s)
            },
            _off: function(t, e, n) {
                var s, r, a;
                if (this._events && (s = this._events[t])) {
                    if (!e) {
                        for (r = 0, a = s.length; r < a; r++) s[r].fn = o.Util.falseFn;
                        return void delete this._events[t]
                    }
                    if (n === this && (n = i), s)
                        for (r = 0, a = s.length; r < a; r++) {
                            var h = s[r];
                            if (h.ctx === n && h.fn === e) return h.fn = o.Util.falseFn, this._firingCount && (this._events[t] = s = s.slice()), void s.splice(r, 1)
                        }
                }
            },
            fire: function(t, e, i) {
                if (!this.listens(t, i)) return this;
                var n = o.Util.extend({}, e, {
                    type: t,
                    target: this
                });
                if (this._events) {
                    var s = this._events[t];
                    if (s) {
                        this._firingCount = this._firingCount + 1 || 1;
                        for (var r = 0, a = s.length; r < a; r++) {
                            var h = s[r];
                            h.fn.call(h.ctx || this, n)
                        }
                        this._firingCount--
                    }
                }
                return i && this._propagateEvent(n), this
            },
            listens: function(t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) return !0;
                if (e)
                    for (var n in this._eventParents)
                        if (this._eventParents[n].listens(t, e)) return !0;
                return !1
            },
            once: function(t, e, i) {
                if ("object" == typeof t) {
                    for (var n in t) this.once(n, t[n], e);
                    return this
                }
                var s = o.bind(function() {
                    this.off(t, e, i).off(t, s, i)
                }, this);
                return this.on(t, e, i).on(t, s, i)
            },
            addEventParent: function(t) {
                return this._eventParents = this._eventParents || {}, this._eventParents[o.stamp(t)] = t, this
            },
            removeEventParent: function(t) {
                return this._eventParents && delete this._eventParents[o.stamp(t)], this
            },
            _propagateEvent: function(t) {
                for (var e in this._eventParents) this._eventParents[e].fire(t.type, o.extend({
                    layer: t.target
                }, t), !0)
            }
        });
    var s = o.Evented.prototype;
    s.addEventListener = s.on, s.removeEventListener = s.clearAllEventListeners = s.off, s.addOneTimeEventListener = s.once, s.fireEvent = s.fire, s.hasEventListeners = s.listens, o.Mixin = {
            Events: s
        },
        function() {
            var i = navigator.userAgent.toLowerCase(),
                n = e.documentElement,
                s = "ActiveXObject" in t,
                r = i.indexOf("webkit") !== -1,
                a = i.indexOf("phantom") !== -1,
                h = i.search("android [23]") !== -1,
                l = i.indexOf("chrome") !== -1,
                u = i.indexOf("gecko") !== -1 && !r && !t.opera && !s,
                c = 0 === navigator.platform.indexOf("Win"),
                d = "undefined" != typeof orientation || i.indexOf("mobile") !== -1,
                _ = !t.PointerEvent && t.MSPointerEvent,
                m = t.PointerEvent || _,
                p = s && "transition" in n.style,
                f = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !h,
                g = "MozPerspective" in n.style,
                v = "OTransition" in n.style,
                y = !t.L_NO_TOUCH && (m || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
            o.Browser = {
                ie: s,
                ielt9: s && !e.addEventListener,
                edge: "msLaunchUri" in navigator && !("documentMode" in e),
                webkit: r,
                gecko: u,
                android: i.indexOf("android") !== -1,
                android23: h,
                chrome: l,
                safari: !l && i.indexOf("safari") !== -1,
                win: c,
                ie3d: p,
                webkit3d: f,
                gecko3d: g,
                opera12: v,
                any3d: !t.L_DISABLE_3D && (p || f || g) && !v && !a,
                mobile: d,
                mobileWebkit: d && r,
                mobileWebkit3d: d && f,
                mobileOpera: d && t.opera,
                mobileGecko: d && u,
                touch: !!y,
                msPointer: !!_,
                pointer: !!m,
                retina: (t.devicePixelRatio || t.screen.deviceXDPI / t.screen.logicalXDPI) > 1
            }
        }(), o.Point = function(t, e, i) {
            this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
        }, o.Point.prototype = {
            clone: function() {
                return new o.Point(this.x, this.y)
            },
            add: function(t) {
                return this.clone()._add(o.point(t))
            },
            _add: function(t) {
                return this.x += t.x, this.y += t.y, this
            },
            subtract: function(t) {
                return this.clone()._subtract(o.point(t))
            },
            _subtract: function(t) {
                return this.x -= t.x, this.y -= t.y, this
            },
            divideBy: function(t) {
                return this.clone()._divideBy(t)
            },
            _divideBy: function(t) {
                return this.x /= t, this.y /= t, this
            },
            multiplyBy: function(t) {
                return this.clone()._multiplyBy(t)
            },
            _multiplyBy: function(t) {
                return this.x *= t, this.y *= t, this
            },
            scaleBy: function(t) {
                return new o.Point(this.x * t.x, this.y * t.y)
            },
            unscaleBy: function(t) {
                return new o.Point(this.x / t.x, this.y / t.y)
            },
            round: function() {
                return this.clone()._round()
            },
            _round: function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
            },
            floor: function() {
                return this.clone()._floor()
            },
            _floor: function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
            },
            ceil: function() {
                return this.clone()._ceil()
            },
            _ceil: function() {
                return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
            },
            distanceTo: function(t) {
                t = o.point(t);
                var e = t.x - this.x,
                    i = t.y - this.y;
                return Math.sqrt(e * e + i * i)
            },
            equals: function(t) {
                return t = o.point(t), t.x === this.x && t.y === this.y
            },
            contains: function(t) {
                return t = o.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
            },
            toString: function() {
                return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
            }
        }, o.point = function(t, e, n) {
            return t instanceof o.Point ? t : o.Util.isArray(t) ? new o.Point(t[0], t[1]) : t === i || null === t ? t : "object" == typeof t && "x" in t && "y" in t ? new o.Point(t.x, t.y) : new o.Point(t, e, n)
        }, o.Bounds = function(t, e) {
            if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
        }, o.Bounds.prototype = {
            extend: function(t) {
                return t = o.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
            },
            getCenter: function(t) {
                return new o.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
            },
            getBottomLeft: function() {
                return new o.Point(this.min.x, this.max.y)
            },
            getTopRight: function() {
                return new o.Point(this.max.x, this.min.y)
            },
            getSize: function() {
                return this.max.subtract(this.min)
            },
            contains: function(t) {
                var e, i;
                return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t), t instanceof o.Bounds ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
            },
            intersects: function(t) {
                t = o.bounds(t);
                var e = this.min,
                    i = this.max,
                    n = t.min,
                    s = t.max,
                    r = s.x >= e.x && n.x <= i.x,
                    a = s.y >= e.y && n.y <= i.y;
                return r && a
            },
            overlaps: function(t) {
                t = o.bounds(t);
                var e = this.min,
                    i = this.max,
                    n = t.min,
                    s = t.max,
                    r = s.x > e.x && n.x < i.x,
                    a = s.y > e.y && n.y < i.y;
                return r && a
            },
            isValid: function() {
                return !(!this.min || !this.max)
            }
        }, o.bounds = function(t, e) {
            return !t || t instanceof o.Bounds ? t : new o.Bounds(t, e)
        }, o.Transformation = function(t, e, i, n) {
            this._a = t, this._b = e, this._c = i, this._d = n
        }, o.Transformation.prototype = {
            transform: function(t, e) {
                return this._transform(t.clone(), e)
            },
            _transform: function(t, e) {
                return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
            },
            untransform: function(t, e) {
                return e = e || 1, new o.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
            }
        }, o.DomUtil = {
            get: function(t) {
                return "string" == typeof t ? e.getElementById(t) : t
            },
            getStyle: function(t, i) {
                var n = t.style[i] || t.currentStyle && t.currentStyle[i];
                if ((!n || "auto" === n) && e.defaultView) {
                    var o = e.defaultView.getComputedStyle(t, null);
                    n = o ? o[i] : null
                }
                return "auto" === n ? null : n
            },
            create: function(t, i, n) {
                var o = e.createElement(t);
                return o.className = i || "", n && n.appendChild(o), o
            },
            remove: function(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            },
            empty: function(t) {
                for (; t.firstChild;) t.removeChild(t.firstChild)
            },
            toFront: function(t) {
                t.parentNode.appendChild(t)
            },
            toBack: function(t) {
                var e = t.parentNode;
                e.insertBefore(t, e.firstChild)
            },
            hasClass: function(t, e) {
                if (t.classList !== i) return t.classList.contains(e);
                var n = o.DomUtil.getClass(t);
                return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n)
            },
            addClass: function(t, e) {
                if (t.classList !== i)
                    for (var n = o.Util.splitWords(e), s = 0, r = n.length; s < r; s++) t.classList.add(n[s]);
                else if (!o.DomUtil.hasClass(t, e)) {
                    var a = o.DomUtil.getClass(t);
                    o.DomUtil.setClass(t, (a ? a + " " : "") + e)
                }
            },
            removeClass: function(t, e) {
                t.classList !== i ? t.classList.remove(e) : o.DomUtil.setClass(t, o.Util.trim((" " + o.DomUtil.getClass(t) + " ").replace(" " + e + " ", " ")))
            },
            setClass: function(t, e) {
                t.className.baseVal === i ? t.className = e : t.className.baseVal = e
            },
            getClass: function(t) {
                return t.className.baseVal === i ? t.className : t.className.baseVal
            },
            setOpacity: function(t, e) {
                "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && o.DomUtil._setOpacityIE(t, e)
            },
            _setOpacityIE: function(t, e) {
                var i = !1,
                    n = "DXImageTransform.Microsoft.Alpha";
                try {
                    i = t.filters.item(n)
                } catch (t) {
                    if (1 === e) return
                }
                e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
            },
            testProp: function(t) {
                for (var i = e.documentElement.style, n = 0; n < t.length; n++)
                    if (t[n] in i) return t[n];
                return !1
            },
            setTransform: function(t, e, i) {
                var n = e || new o.Point(0, 0);
                t.style[o.DomUtil.TRANSFORM] = (o.Browser.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "")
            },
            setPosition: function(t, e) {
                t._leaflet_pos = e, o.Browser.any3d ? o.DomUtil.setTransform(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
            },
            getPosition: function(t) {
                return t._leaflet_pos || new o.Point(0, 0)
            }
        },
        function() {
            o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
            var i = o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
            if (o.DomUtil.TRANSITION_END = "webkitTransition" === i || "OTransition" === i ? i + "End" : "transitionend", "onselectstart" in e) o.DomUtil.disableTextSelection = function() {
                o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
            }, o.DomUtil.enableTextSelection = function() {
                o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
            };
            else {
                var n = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
                o.DomUtil.disableTextSelection = function() {
                    if (n) {
                        var t = e.documentElement.style;
                        this._userSelect = t[n], t[n] = "none"
                    }
                }, o.DomUtil.enableTextSelection = function() {
                    n && (e.documentElement.style[n] = this._userSelect, delete this._userSelect)
                }
            }
            o.DomUtil.disableImageDrag = function() {
                o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
            }, o.DomUtil.enableImageDrag = function() {
                o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
            }, o.DomUtil.preventOutline = function(e) {
                for (; e.tabIndex === -1;) e = e.parentNode;
                e && e.style && (o.DomUtil.restoreOutline(), this._outlineElement = e, this._outlineStyle = e.style.outline, e.style.outline = "none", o.DomEvent.on(t, "keydown", o.DomUtil.restoreOutline, this))
            }, o.DomUtil.restoreOutline = function() {
                this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle, delete this._outlineElement, delete this._outlineStyle, o.DomEvent.off(t, "keydown", o.DomUtil.restoreOutline, this))
            }
        }(), o.LatLng = function(t, e, n) {
            if (isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
            this.lat = +t, this.lng = +e, n !== i && (this.alt = +n)
        }, o.LatLng.prototype = {
            equals: function(t, e) {
                if (!t) return !1;
                t = o.latLng(t);
                var n = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
                return n <= (e === i ? 1e-9 : e)
            },
            toString: function(t) {
                return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
            },
            distanceTo: function(t) {
                return o.CRS.Earth.distance(this, o.latLng(t))
            },
            wrap: function() {
                return o.CRS.Earth.wrapLatLng(this)
            },
            toBounds: function(t) {
                var e = 180 * t / 40075017,
                    i = e / Math.cos(Math.PI / 180 * this.lat);
                return o.latLngBounds([this.lat - e, this.lng - i], [this.lat + e, this.lng + i])
            },
            clone: function() {
                return new o.LatLng(this.lat, this.lng, this.alt)
            }
        }, o.latLng = function(t, e, n) {
            return t instanceof o.LatLng ? t : o.Util.isArray(t) && "object" != typeof t[0] ? 3 === t.length ? new o.LatLng(t[0], t[1], t[2]) : 2 === t.length ? new o.LatLng(t[0], t[1]) : null : t === i || null === t ? t : "object" == typeof t && "lat" in t ? new o.LatLng(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === i ? null : new o.LatLng(t, e, n)
        }, o.LatLngBounds = function(t, e) {
            if (t)
                for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
        }, o.LatLngBounds.prototype = {
            extend: function(t) {
                var e, i, n = this._southWest,
                    s = this._northEast;
                if (t instanceof o.LatLng) e = t, i = t;
                else {
                    if (!(t instanceof o.LatLngBounds)) return t ? this.extend(o.latLng(t) || o.latLngBounds(t)) : this;
                    if (e = t._southWest, i = t._northEast, !e || !i) return this
                }
                return n || s ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), s.lat = Math.max(i.lat, s.lat), s.lng = Math.max(i.lng, s.lng)) : (this._southWest = new o.LatLng(e.lat, e.lng), this._northEast = new o.LatLng(i.lat, i.lng)), this
            },
            pad: function(t) {
                var e = this._southWest,
                    i = this._northEast,
                    n = Math.abs(e.lat - i.lat) * t,
                    s = Math.abs(e.lng - i.lng) * t;
                return new o.LatLngBounds(new o.LatLng(e.lat - n, e.lng - s), new o.LatLng(i.lat + n, i.lng + s))
            },
            getCenter: function() {
                return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
            },
            getSouthWest: function() {
                return this._southWest
            },
            getNorthEast: function() {
                return this._northEast
            },
            getNorthWest: function() {
                return new o.LatLng(this.getNorth(), this.getWest())
            },
            getSouthEast: function() {
                return new o.LatLng(this.getSouth(), this.getEast())
            },
            getWest: function() {
                return this._southWest.lng
            },
            getSouth: function() {
                return this._southWest.lat
            },
            getEast: function() {
                return this._northEast.lng
            },
            getNorth: function() {
                return this._northEast.lat
            },
            contains: function(t) {
                t = "number" == typeof t[0] || t instanceof o.LatLng || "lat" in t ? o.latLng(t) : o.latLngBounds(t);
                var e, i, n = this._southWest,
                    s = this._northEast;
                return t instanceof o.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= s.lat && e.lng >= n.lng && i.lng <= s.lng
            },
            intersects: function(t) {
                t = o.latLngBounds(t);
                var e = this._southWest,
                    i = this._northEast,
                    n = t.getSouthWest(),
                    s = t.getNorthEast(),
                    r = s.lat >= e.lat && n.lat <= i.lat,
                    a = s.lng >= e.lng && n.lng <= i.lng;
                return r && a
            },
            overlaps: function(t) {
                t = o.latLngBounds(t);
                var e = this._southWest,
                    i = this._northEast,
                    n = t.getSouthWest(),
                    s = t.getNorthEast(),
                    r = s.lat > e.lat && n.lat < i.lat,
                    a = s.lng > e.lng && n.lng < i.lng;
                return r && a
            },
            toBBoxString: function() {
                return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
            },
            equals: function(t) {
                return !!t && (t = o.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
            },
            isValid: function() {
                return !(!this._southWest || !this._northEast)
            }
        }, o.latLngBounds = function(t, e) {
            return t instanceof o.LatLngBounds ? t : new o.LatLngBounds(t, e)
        }, o.Projection = {}, o.Projection.LonLat = {
            project: function(t) {
                return new o.Point(t.lng, t.lat)
            },
            unproject: function(t) {
                return new o.LatLng(t.y, t.x)
            },
            bounds: o.bounds([-180, -90], [180, 90])
        }, o.Projection.SphericalMercator = {
            R: 6378137,
            MAX_LATITUDE: 85.0511287798,
            project: function(t) {
                var e = Math.PI / 180,
                    i = this.MAX_LATITUDE,
                    n = Math.max(Math.min(i, t.lat), -i),
                    s = Math.sin(n * e);
                return new o.Point(this.R * t.lng * e, this.R * Math.log((1 + s) / (1 - s)) / 2)
            },
            unproject: function(t) {
                var e = 180 / Math.PI;
                return new o.LatLng((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
            },
            bounds: function() {
                var t = 6378137 * Math.PI;
                return o.bounds([-t, -t], [t, t])
            }()
        }, o.CRS = {
            latLngToPoint: function(t, e) {
                var i = this.projection.project(t),
                    n = this.scale(e);
                return this.transformation._transform(i, n)
            },
            pointToLatLng: function(t, e) {
                var i = this.scale(e),
                    n = this.transformation.untransform(t, i);
                return this.projection.unproject(n)
            },
            project: function(t) {
                return this.projection.project(t)
            },
            unproject: function(t) {
                return this.projection.unproject(t)
            },
            scale: function(t) {
                return 256 * Math.pow(2, t)
            },
            zoom: function(t) {
                return Math.log(t / 256) / Math.LN2
            },
            getProjectedBounds: function(t) {
                if (this.infinite) return null;
                var e = this.projection.bounds,
                    i = this.scale(t),
                    n = this.transformation.transform(e.min, i),
                    s = this.transformation.transform(e.max, i);
                return o.bounds(n, s)
            },
            infinite: !1,
            wrapLatLng: function(t) {
                var e = this.wrapLng ? o.Util.wrapNum(t.lng, this.wrapLng, !0) : t.lng,
                    i = this.wrapLat ? o.Util.wrapNum(t.lat, this.wrapLat, !0) : t.lat,
                    n = t.alt;
                return o.latLng(i, e, n)
            },
            wrapLatLngBounds: function(t) {
                var e = t.getCenter(),
                    i = this.wrapLatLng(e),
                    n = e.lat - i.lat,
                    s = e.lng - i.lng;
                if (0 === n && 0 === s) return t;
                var r = t.getSouthWest(),
                    a = t.getNorthEast(),
                    h = o.latLng({
                        lat: r.lat - n,
                        lng: r.lng - s
                    }),
                    l = o.latLng({
                        lat: a.lat - n,
                        lng: a.lng - s
                    });
                return new o.LatLngBounds(h, l)
            }
        }, o.CRS.Simple = o.extend({}, o.CRS, {
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1, 0, -1, 0),
            scale: function(t) {
                return Math.pow(2, t)
            },
            zoom: function(t) {
                return Math.log(t) / Math.LN2
            },
            distance: function(t, e) {
                var i = e.lng - t.lng,
                    n = e.lat - t.lat;
                return Math.sqrt(i * i + n * n)
            },
            infinite: !0
        }), o.CRS.Earth = o.extend({}, o.CRS, {
            wrapLng: [-180, 180],
            R: 6371e3,
            distance: function(t, e) {
                var i = Math.PI / 180,
                    n = t.lat * i,
                    o = e.lat * i,
                    s = Math.sin(n) * Math.sin(o) + Math.cos(n) * Math.cos(o) * Math.cos((e.lng - t.lng) * i);
                return this.R * Math.acos(Math.min(s, 1))
            }
        }), o.CRS.EPSG3857 = o.extend({}, o.CRS.Earth, {
            code: "EPSG:3857",
            projection: o.Projection.SphericalMercator,
            transformation: function() {
                var t = .5 / (Math.PI * o.Projection.SphericalMercator.R);
                return new o.Transformation(t, .5, -t, .5)
            }()
        }), o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
            code: "EPSG:900913"
        }), o.CRS.EPSG4326 = o.extend({}, o.CRS.Earth, {
            code: "EPSG:4326",
            projection: o.Projection.LonLat,
            transformation: new o.Transformation(1 / 180, 1, -1 / 180, .5)
        }), o.Map = o.Evented.extend({
            options: {
                crs: o.CRS.EPSG3857,
                center: i,
                zoom: i,
                minZoom: i,
                maxZoom: i,
                layers: [],
                maxBounds: i,
                renderer: i,
                zoomAnimation: !0,
                zoomAnimationThreshold: 4,
                fadeAnimation: !0,
                markerZoomAnimation: !0,
                transform3DLimit: 8388608,
                zoomSnap: 1,
                zoomDelta: 1,
                trackResize: !0
            },
            initialize: function(t, e) {
                e = o.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = o.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== i && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== i && this.setView(o.latLng(e.center), e.zoom, {
                    reset: !0
                }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this.callInitHooks(), this._zoomAnimated = o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), o.DomEvent.on(this._proxy, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)), this._addLayers(this.options.layers)
            },
            setView: function(t, e, n) {
                if (e = e === i ? this._zoom : this._limitZoom(e), t = this._limitCenter(o.latLng(t), e, this.options.maxBounds), n = n || {}, this._stop(), this._loaded && !n.reset && n !== !0) {
                    n.animate !== i && (n.zoom = o.extend({
                        animate: n.animate
                    }, n.zoom), n.pan = o.extend({
                        animate: n.animate,
                        duration: n.duration
                    }, n.pan));
                    var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
                    if (s) return clearTimeout(this._sizeTimer), this
                }
                return this._resetView(t, e), this
            },
            setZoom: function(t, e) {
                return this._loaded ? this.setView(this.getCenter(), t, {
                    zoom: e
                }) : (this._zoom = t, this)
            },
            zoomIn: function(t, e) {
                return t = t || (o.Browser.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e)
            },
            zoomOut: function(t, e) {
                return t = t || (o.Browser.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e)
            },
            setZoomAround: function(t, e, i) {
                var n = this.getZoomScale(e),
                    s = this.getSize().divideBy(2),
                    r = t instanceof o.Point ? t : this.latLngToContainerPoint(t),
                    a = r.subtract(s).multiplyBy(1 - 1 / n),
                    h = this.containerPointToLatLng(s.add(a));
                return this.setView(h, e, {
                    zoom: i
                })
            },
            _getBoundsCenterZoom: function(t, e) {
                e = e || {}, t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
                var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
                    n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
                    s = this.getBoundsZoom(t, !1, i.add(n));
                s = "number" == typeof e.maxZoom ? Math.min(e.maxZoom, s) : s;
                var r = n.subtract(i).divideBy(2),
                    a = this.project(t.getSouthWest(), s),
                    h = this.project(t.getNorthEast(), s),
                    l = this.unproject(a.add(h).divideBy(2).add(r), s);
                return {
                    center: l,
                    zoom: s
                }
            },
            fitBounds: function(t, e) {
                if (t = o.latLngBounds(t), !t.isValid()) throw new Error("Bounds are not valid.");
                var i = this._getBoundsCenterZoom(t, e);
                return this.setView(i.center, i.zoom, e)
            },
            fitWorld: function(t) {
                return this.fitBounds([
                    [-90, -180],
                    [90, 180]
                ], t)
            },
            panTo: function(t, e) {
                return this.setView(t, this._zoom, {
                    pan: e
                })
            },
            panBy: function(t, e) {
                if (t = o.point(t).round(), e = e || {}, !t.x && !t.y) return this.fire("moveend");
                if (e.animate !== !0 && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
                if (this._panAnim || (this._panAnim = new o.PosAnimation, this._panAnim.on({
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd
                    }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
                    o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                    var i = this._getMapPanePos().subtract(t).round();
                    this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this
            },
            flyTo: function(t, e, n) {
                function s(t) {
                    var e = t ? -1 : 1,
                        i = t ? v : g,
                        n = v * v - g * g + e * L * L * y * y,
                        o = 2 * i * L * y,
                        s = n / o,
                        r = Math.sqrt(s * s + 1) - s,
                        a = r < 1e-9 ? -18 : Math.log(r);
                    return a
                }

                function r(t) {
                    return (Math.exp(t) - Math.exp(-t)) / 2
                }

                function a(t) {
                    return (Math.exp(t) + Math.exp(-t)) / 2
                }

                function h(t) {
                    return r(t) / a(t)
                }

                function l(t) {
                    return g * (a(x) / a(x + P * t))
                }

                function u(t) {
                    return g * (a(x) * h(x + P * t) - r(x)) / L
                }

                function c(t) {
                    return 1 - Math.pow(1 - t, 1.5)
                }

                function d() {
                    var i = (Date.now() - w) / T,
                        n = c(i) * b;
                    i <= 1 ? (this._flyToFrame = o.Util.requestAnimFrame(d, this), this._move(this.unproject(_.add(m.subtract(_).multiplyBy(u(n) / y)), f), this.getScaleZoom(g / l(n), f), {
                        flyTo: !0
                    })) : this._move(t, e)._moveEnd(!0)
                }
                if (n = n || {}, n.animate === !1 || !o.Browser.any3d) return this.setView(t, e, n);
                this._stop();
                var _ = this.project(this.getCenter()),
                    m = this.project(t),
                    p = this.getSize(),
                    f = this._zoom;
                t = o.latLng(t), e = e === i ? f : e;
                var g = Math.max(p.x, p.y),
                    v = g * this.getZoomScale(f, e),
                    y = m.distanceTo(_) || 1,
                    P = 1.42,
                    L = P * P,
                    x = s(0),
                    w = Date.now(),
                    b = (s(1) - x) / P,
                    T = n.duration ? 1e3 * n.duration : 1e3 * b * .8;
                return this._moveStart(!0), d.call(this), this
            },
            flyToBounds: function(t, e) {
                var i = this._getBoundsCenterZoom(t, e);
                return this.flyTo(i.center, i.zoom, e)
            },
            setMaxBounds: function(t) {
                return t = o.latLngBounds(t), t.isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds))
            },
            setMinZoom: function(t) {
                return this.options.minZoom = t, this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(t) : this
            },
            setMaxZoom: function(t) {
                return this.options.maxZoom = t, this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(t) : this
            },
            panInsideBounds: function(t, e) {
                this._enforcingBounds = !0;
                var i = this.getCenter(),
                    n = this._limitCenter(i, this._zoom, o.latLngBounds(t));
                return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this
            },
            invalidateSize: function(t) {
                if (!this._loaded) return this;
                t = o.extend({
                    animate: !1,
                    pan: !0
                }, t === !0 ? {
                    animate: !0
                } : t);
                var e = this.getSize();
                this._sizeChanged = !0, this._lastCenter = null;
                var i = this.getSize(),
                    n = e.divideBy(2).round(),
                    s = i.divideBy(2).round(),
                    r = n.subtract(s);
                return r.x || r.y ? (t.animate && t.pan ? this.panBy(r) : (t.pan && this._rawPanBy(r), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                    oldSize: e,
                    newSize: i
                })) : this
            },
            stop: function() {
                return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop()
            },
            locate: function(t) {
                if (t = this._locateOptions = o.extend({
                        timeout: 1e4,
                        watch: !1
                    }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }), this;
                var e = o.bind(this._handleGeolocationResponse, this),
                    i = o.bind(this._handleGeolocationError, this);
                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this
            },
            stopLocate: function() {
                return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
            },
            _handleGeolocationError: function(t) {
                var e = t.code,
                    i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
                this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                    code: e,
                    message: "Geolocation error: " + i + "."
                })
            },
            _handleGeolocationResponse: function(t) {
                var e = t.coords.latitude,
                    i = t.coords.longitude,
                    n = new o.LatLng(e, i),
                    s = n.toBounds(t.coords.accuracy),
                    r = this._locateOptions;
                if (r.setView) {
                    var a = this.getBoundsZoom(s);
                    this.setView(n, r.maxZoom ? Math.min(a, r.maxZoom) : a)
                }
                var h = {
                    latlng: n,
                    bounds: s,
                    timestamp: t.timestamp
                };
                for (var l in t.coords) "number" == typeof t.coords[l] && (h[l] = t.coords[l]);
                this.fire("locationfound", h)
            },
            addHandler: function(t, e) {
                if (!e) return this;
                var i = this[t] = new e(this);
                return this._handlers.push(i), this.options[t] && i.enable(), this
            },
            remove: function() {
                if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
                try {
                    delete this._container._leaflet_id, delete this._containerId
                } catch (t) {
                    this._container._leaflet_id = i, this._containerId = i
                }
                o.DomUtil.remove(this._mapPane), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this._loaded && this.fire("unload");
                for (var t in this._layers) this._layers[t].remove();
                return this
            },
            createPane: function(t, e) {
                var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""),
                    n = o.DomUtil.create("div", i, e || this._mapPane);
                return t && (this._panes[t] = n), n
            },
            getCenter: function() {
                return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
            },
            getZoom: function() {
                return this._zoom
            },
            getBounds: function() {
                var t = this.getPixelBounds(),
                    e = this.unproject(t.getBottomLeft()),
                    i = this.unproject(t.getTopRight());
                return new o.LatLngBounds(e, i)
            },
            getMinZoom: function() {
                return this.options.minZoom === i ? this._layersMinZoom || 0 : this.options.minZoom
            },
            getMaxZoom: function() {
                return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
            },
            getBoundsZoom: function(t, e, i) {
                t = o.latLngBounds(t), i = o.point(i || [0, 0]);
                var n = this.getZoom() || 0,
                    s = this.getMinZoom(),
                    r = this.getMaxZoom(),
                    a = t.getNorthWest(),
                    h = t.getSouthEast(),
                    l = this.getSize().subtract(i),
                    u = o.bounds(this.project(h, n), this.project(a, n)).getSize(),
                    c = o.Browser.any3d ? this.options.zoomSnap : 1,
                    d = Math.min(l.x / u.x, l.y / u.y);
                return n = this.getScaleZoom(d, n), c && (n = Math.round(n / (c / 100)) * (c / 100), n = e ? Math.ceil(n / c) * c : Math.floor(n / c) * c), Math.max(s, Math.min(r, n))
            },
            getSize: function() {
                return this._size && !this._sizeChanged || (this._size = new o.Point(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone()
            },
            getPixelBounds: function(t, e) {
                var i = this._getTopLeftPoint(t, e);
                return new o.Bounds(i, i.add(this.getSize()))
            },
            getPixelOrigin: function() {
                return this._checkIfLoaded(), this._pixelOrigin
            },
            getPixelWorldBounds: function(t) {
                return this.options.crs.getProjectedBounds(t === i ? this.getZoom() : t)
            },
            getPane: function(t) {
                return "string" == typeof t ? this._panes[t] : t
            },
            getPanes: function() {
                return this._panes
            },
            getContainer: function() {
                return this._container
            },
            getZoomScale: function(t, e) {
                var n = this.options.crs;
                return e = e === i ? this._zoom : e, n.scale(t) / n.scale(e)
            },
            getScaleZoom: function(t, e) {
                var n = this.options.crs;
                e = e === i ? this._zoom : e;
                var o = n.zoom(t * n.scale(e));
                return isNaN(o) ? 1 / 0 : o
            },
            project: function(t, e) {
                return e = e === i ? this._zoom : e, this.options.crs.latLngToPoint(o.latLng(t), e)
            },
            unproject: function(t, e) {
                return e = e === i ? this._zoom : e, this.options.crs.pointToLatLng(o.point(t), e)
            },
            layerPointToLatLng: function(t) {
                var e = o.point(t).add(this.getPixelOrigin());
                return this.unproject(e)
            },
            latLngToLayerPoint: function(t) {
                var e = this.project(o.latLng(t))._round();
                return e._subtract(this.getPixelOrigin())
            },
            wrapLatLng: function(t) {
                return this.options.crs.wrapLatLng(o.latLng(t))
            },
            wrapLatLngBounds: function(t) {
                return this.options.crs.wrapLatLngBounds(o.latLngBounds(t))
            },
            distance: function(t, e) {
                return this.options.crs.distance(o.latLng(t), o.latLng(e))
            },
            containerPointToLayerPoint: function(t) {
                return o.point(t).subtract(this._getMapPanePos())
            },
            layerPointToContainerPoint: function(t) {
                return o.point(t).add(this._getMapPanePos())
            },
            containerPointToLatLng: function(t) {
                var e = this.containerPointToLayerPoint(o.point(t));
                return this.layerPointToLatLng(e)
            },
            latLngToContainerPoint: function(t) {
                return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
            },
            mouseEventToContainerPoint: function(t) {
                return o.DomEvent.getMousePosition(t, this._container)
            },
            mouseEventToLayerPoint: function(t) {
                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
            },
            mouseEventToLatLng: function(t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
            },
            _initContainer: function(t) {
                var e = this._container = o.DomUtil.get(t);
                if (!e) throw new Error("Map container not found.");
                if (e._leaflet_id) throw new Error("Map container is already initialized.");
                o.DomEvent.addListener(e, "scroll", this._onScroll, this), this._containerId = o.Util.stamp(e)
            },
            _initLayout: function() {
                var t = this._container;
                this._fadeAnimated = this.options.fadeAnimation && o.Browser.any3d,
                    o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch" : "") + (o.Browser.retina ? " leaflet-retina" : "") + (o.Browser.ielt9 ? " leaflet-oldie" : "") + (o.Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
                var e = o.DomUtil.getStyle(t, "position");
                "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
            },
            _initPanes: function() {
                var t = this._panes = {};
                this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0)), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, "leaflet-zoom-hide"), o.DomUtil.addClass(t.shadowPane, "leaflet-zoom-hide"))
            },
            _resetView: function(t, e) {
                o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0));
                var i = !this._loaded;
                this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
                var n = this._zoom !== e;
                this._moveStart(n)._move(t, e)._moveEnd(n), this.fire("viewreset"), i && this.fire("load")
            },
            _moveStart: function(t) {
                return t && this.fire("zoomstart"), this.fire("movestart")
            },
            _move: function(t, e, n) {
                e === i && (e = this._zoom);
                var o = this._zoom !== e;
                return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), (o || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)
            },
            _moveEnd: function(t) {
                return t && this.fire("zoomend"), this.fire("moveend")
            },
            _stop: function() {
                return o.Util.cancelAnimFrame(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
            },
            _rawPanBy: function(t) {
                o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
            },
            _getZoomSpan: function() {
                return this.getMaxZoom() - this.getMinZoom()
            },
            _panInsideMaxBounds: function() {
                this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
            },
            _checkIfLoaded: function() {
                if (!this._loaded) throw new Error("Set map center and zoom first.")
            },
            _initEvents: function(e) {
                if (o.DomEvent) {
                    this._targets = {}, this._targets[o.stamp(this._container)] = this;
                    var i = e ? "off" : "on";
                    o.DomEvent[i](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this), this.options.trackResize && o.DomEvent[i](t, "resize", this._onResize, this), o.Browser.any3d && this.options.transform3DLimit && this[i]("moveend", this._onMoveEnd)
                }
            },
            _onResize: function() {
                o.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = o.Util.requestAnimFrame(function() {
                    this.invalidateSize({
                        debounceMoveend: !0
                    })
                }, this)
            },
            _onScroll: function() {
                this._container.scrollTop = 0, this._container.scrollLeft = 0
            },
            _onMoveEnd: function() {
                var t = this._getMapPanePos();
                Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
            },
            _findEventTargets: function(t, e) {
                for (var i, n = [], s = "mouseout" === e || "mouseover" === e, r = t.target || t.srcElement, a = !1; r;) {
                    if (i = this._targets[o.stamp(r)], i && ("click" === e || "preclick" === e) && !t._simulated && this._draggableMoved(i)) {
                        a = !0;
                        break
                    }
                    if (i && i.listens(e, !0)) {
                        if (s && !o.DomEvent._isExternalTarget(r, t)) break;
                        if (n.push(i), s) break
                    }
                    if (r === this._container) break;
                    r = r.parentNode
                }
                return n.length || a || s || !o.DomEvent._isExternalTarget(r, t) || (n = [this]), n
            },
            _handleDOMEvent: function(t) {
                if (this._loaded && !o.DomEvent._skipped(t)) {
                    var e = "keypress" === t.type && 13 === t.keyCode ? "click" : t.type;
                    "mousedown" === e && o.DomUtil.preventOutline(t.target || t.srcElement), this._fireDOMEvent(t, e)
                }
            },
            _fireDOMEvent: function(t, e, i) {
                if ("click" === t.type) {
                    var n = o.Util.extend({}, t);
                    n.type = "preclick", this._fireDOMEvent(n, n.type, i)
                }
                if (!t._stopped && (i = (i || []).concat(this._findEventTargets(t, e)), i.length)) {
                    var s = i[0];
                    "contextmenu" === e && s.listens(e, !0) && o.DomEvent.preventDefault(t);
                    var r = {
                        originalEvent: t
                    };
                    if ("keypress" !== t.type) {
                        var a = s instanceof o.Marker;
                        r.containerPoint = a ? this.latLngToContainerPoint(s.getLatLng()) : this.mouseEventToContainerPoint(t), r.layerPoint = this.containerPointToLayerPoint(r.containerPoint), r.latlng = a ? s.getLatLng() : this.layerPointToLatLng(r.layerPoint)
                    }
                    for (var h = 0; h < i.length; h++)
                        if (i[h].fire(e, r, !0), r.originalEvent._stopped || i[h].options.nonBubblingEvents && o.Util.indexOf(i[h].options.nonBubblingEvents, e) !== -1) return
                }
            },
            _draggableMoved: function(t) {
                return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
            },
            _clearHandlers: function() {
                for (var t = 0, e = this._handlers.length; t < e; t++) this._handlers[t].disable()
            },
            whenReady: function(t, e) {
                return this._loaded ? t.call(e || this, {
                    target: this
                }) : this.on("load", t, e), this
            },
            _getMapPanePos: function() {
                return o.DomUtil.getPosition(this._mapPane) || new o.Point(0, 0)
            },
            _moved: function() {
                var t = this._getMapPanePos();
                return t && !t.equals([0, 0])
            },
            _getTopLeftPoint: function(t, e) {
                var n = t && e !== i ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
                return n.subtract(this._getMapPanePos())
            },
            _getNewPixelOrigin: function(t, e) {
                var i = this.getSize()._divideBy(2);
                return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round()
            },
            _latLngToNewLayerPoint: function(t, e, i) {
                var n = this._getNewPixelOrigin(i, e);
                return this.project(t, e)._subtract(n)
            },
            _latLngBoundsToNewLayerBounds: function(t, e, i) {
                var n = this._getNewPixelOrigin(i, e);
                return o.bounds([this.project(t.getSouthWest(), e)._subtract(n), this.project(t.getNorthWest(), e)._subtract(n), this.project(t.getSouthEast(), e)._subtract(n), this.project(t.getNorthEast(), e)._subtract(n)])
            },
            _getCenterLayerPoint: function() {
                return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
            },
            _getCenterOffset: function(t) {
                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
            },
            _limitCenter: function(t, e, i) {
                if (!i) return t;
                var n = this.project(t, e),
                    s = this.getSize().divideBy(2),
                    r = new o.Bounds(n.subtract(s), n.add(s)),
                    a = this._getBoundsOffset(r, i, e);
                return a.round().equals([0, 0]) ? t : this.unproject(n.add(a), e)
            },
            _limitOffset: function(t, e) {
                if (!e) return t;
                var i = this.getPixelBounds(),
                    n = new o.Bounds(i.min.add(t), i.max.add(t));
                return t.add(this._getBoundsOffset(n, e))
            },
            _getBoundsOffset: function(t, e, i) {
                var n = o.bounds(this.project(e.getNorthEast(), i), this.project(e.getSouthWest(), i)),
                    s = n.min.subtract(t.min),
                    r = n.max.subtract(t.max),
                    a = this._rebound(s.x, -r.x),
                    h = this._rebound(s.y, -r.y);
                return new o.Point(a, h)
            },
            _rebound: function(t, e) {
                return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
            },
            _limitZoom: function(t) {
                var e = this.getMinZoom(),
                    i = this.getMaxZoom(),
                    n = o.Browser.any3d ? this.options.zoomSnap : 1;
                return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t))
            },
            _onPanTransitionStep: function() {
                this.fire("move")
            },
            _onPanTransitionEnd: function() {
                o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
            },
            _tryAnimatedPan: function(t, e) {
                var i = this._getCenterOffset(t)._floor();
                return !((e && e.animate) !== !0 && !this.getSize().contains(i)) && (this.panBy(i, e), !0)
            },
            _createAnimProxy: function() {
                var t = this._proxy = o.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
                this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
                    var i = o.DomUtil.TRANSFORM,
                        n = t.style[i];
                    o.DomUtil.setTransform(t, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === t.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
                }, this), this.on("load moveend", function() {
                    var e = this.getCenter(),
                        i = this.getZoom();
                    o.DomUtil.setTransform(t, this.project(e, i), this.getZoomScale(i, 1))
                }, this)
            },
            _catchTransitionEnd: function(t) {
                this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
            },
            _nothingToAnimate: function() {
                return !this._container.getElementsByClassName("leaflet-zoom-animated").length
            },
            _tryAnimatedZoom: function(t, e, i) {
                if (this._animatingZoom) return !0;
                if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                var n = this.getZoomScale(e),
                    s = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                return !(i.animate !== !0 && !this.getSize().contains(s)) && (o.Util.requestAnimFrame(function() {
                    this._moveStart(!0)._animateZoom(t, e, !0)
                }, this), !0)
            },
            _animateZoom: function(t, e, i, n) {
                i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                    center: t,
                    zoom: e,
                    noUpdate: n
                }), setTimeout(o.bind(this._onZoomTransitionEnd, this), 250)
            },
            _onZoomTransitionEnd: function() {
                this._animatingZoom && (o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), o.Util.requestAnimFrame(function() {
                    this._moveEnd(!0)
                }, this))
            }
        }), o.map = function(t, e) {
            return new o.Map(t, e)
        }, o.Layer = o.Evented.extend({
            options: {
                pane: "overlayPane",
                nonBubblingEvents: [],
                attribution: null
            },
            addTo: function(t) {
                return t.addLayer(this), this
            },
            remove: function() {
                return this.removeFrom(this._map || this._mapToAdd)
            },
            removeFrom: function(t) {
                return t && t.removeLayer(this), this
            },
            getPane: function(t) {
                return this._map.getPane(t ? this.options[t] || t : this.options.pane)
            },
            addInteractiveTarget: function(t) {
                return this._map._targets[o.stamp(t)] = this, this
            },
            removeInteractiveTarget: function(t) {
                return delete this._map._targets[o.stamp(t)], this
            },
            getAttribution: function() {
                return this.options.attribution
            },
            _layerAdd: function(t) {
                var e = t.target;
                if (e.hasLayer(this)) {
                    if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
                        var i = this.getEvents();
                        e.on(i, this), this.once("remove", function() {
                            e.off(i, this)
                        }, this)
                    }
                    this.onAdd(e), this.getAttribution && e.attributionControl && e.attributionControl.addAttribution(this.getAttribution()), this.fire("add"), e.fire("layeradd", {
                        layer: this
                    })
                }
            }
        }), o.Map.include({
            addLayer: function(t) {
                var e = o.stamp(t);
                return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this)
            },
            removeLayer: function(t) {
                var e = o.stamp(t);
                return this._layers[e] ? (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), delete this._layers[e], this._loaded && (this.fire("layerremove", {
                    layer: t
                }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
            },
            hasLayer: function(t) {
                return !!t && o.stamp(t) in this._layers
            },
            eachLayer: function(t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this
            },
            _addLayers: function(t) {
                t = t ? o.Util.isArray(t) ? t : [t] : [];
                for (var e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
            },
            _addZoomLimit: function(t) {
                !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[o.stamp(t)] = t, this._updateZoomLevels())
            },
            _removeZoomLimit: function(t) {
                var e = o.stamp(t);
                this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels())
            },
            _updateZoomLevels: function() {
                var t = 1 / 0,
                    e = -(1 / 0),
                    n = this._getZoomSpan();
                for (var o in this._zoomBoundLayers) {
                    var s = this._zoomBoundLayers[o].options;
                    t = s.minZoom === i ? t : Math.min(t, s.minZoom), e = s.maxZoom === i ? e : Math.max(e, s.maxZoom)
                }
                this._layersMaxZoom = e === -(1 / 0) ? i : e, this._layersMinZoom = t === 1 / 0 ? i : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === i && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === i && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
            }
        });
    var r = "_leaflet_events";
    o.DomEvent = {
        on: function(t, e, i, n) {
            if ("object" == typeof e)
                for (var s in e) this._on(t, s, e[s], i);
            else {
                e = o.Util.splitWords(e);
                for (var r = 0, a = e.length; r < a; r++) this._on(t, e[r], i, n)
            }
            return this
        },
        off: function(t, e, i, n) {
            if ("object" == typeof e)
                for (var s in e) this._off(t, s, e[s], i);
            else {
                e = o.Util.splitWords(e);
                for (var r = 0, a = e.length; r < a; r++) this._off(t, e[r], i, n)
            }
            return this
        },
        _on: function(e, i, n, s) {
            var a = i + o.stamp(n) + (s ? "_" + o.stamp(s) : "");
            if (e[r] && e[r][a]) return this;
            var h = function(i) {
                    return n.call(s || e, i || t.event)
                },
                l = h;
            return o.Browser.pointer && 0 === i.indexOf("touch") ? this.addPointerListener(e, i, h, a) : !o.Browser.touch || "dblclick" !== i || !this.addDoubleTapListener || o.Browser.pointer && o.Browser.chrome ? "addEventListener" in e ? "mousewheel" === i ? e.addEventListener("onwheel" in e ? "wheel" : "mousewheel", h, !1) : "mouseenter" === i || "mouseleave" === i ? (h = function(i) {
                i = i || t.event, o.DomEvent._isExternalTarget(e, i) && l(i)
            }, e.addEventListener("mouseenter" === i ? "mouseover" : "mouseout", h, !1)) : ("click" === i && o.Browser.android && (h = function(t) {
                return o.DomEvent._filterClick(t, l)
            }), e.addEventListener(i, h, !1)) : "attachEvent" in e && e.attachEvent("on" + i, h) : this.addDoubleTapListener(e, h, a), e[r] = e[r] || {}, e[r][a] = h, this
        },
        _off: function(t, e, i, n) {
            var s = e + o.stamp(i) + (n ? "_" + o.stamp(n) : ""),
                a = t[r] && t[r][s];
            return a ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, s) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, s) : "removeEventListener" in t ? "mousewheel" === e ? t.removeEventListener("onwheel" in t ? "wheel" : "mousewheel", a, !1) : t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), t[r][s] = null, this) : this
        },
        stopPropagation: function(t) {
            return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, o.DomEvent._skipped(t), this
        },
        disableScrollPropagation: function(t) {
            return o.DomEvent.on(t, "mousewheel", o.DomEvent.stopPropagation)
        },
        disableClickPropagation: function(t) {
            var e = o.DomEvent.stopPropagation;
            return o.DomEvent.on(t, o.Draggable.START.join(" "), e), o.DomEvent.on(t, {
                click: o.DomEvent._fakeStop,
                dblclick: e
            })
        },
        preventDefault: function(t) {
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
        },
        stop: function(t) {
            return o.DomEvent.preventDefault(t).stopPropagation(t)
        },
        getMousePosition: function(t, e) {
            if (!e) return new o.Point(t.clientX, t.clientY);
            var i = e.getBoundingClientRect();
            return new o.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
        },
        _wheelPxFactor: o.Browser.win && o.Browser.chrome ? 2 : o.Browser.gecko ? t.devicePixelRatio : 1,
        getWheelDelta: function(t) {
            return o.Browser.edge ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / o.DomEvent._wheelPxFactor : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
        },
        _skipEvents: {},
        _fakeStop: function(t) {
            o.DomEvent._skipEvents[t.type] = !0
        },
        _skipped: function(t) {
            var e = this._skipEvents[t.type];
            return this._skipEvents[t.type] = !1, e
        },
        _isExternalTarget: function(t, e) {
            var i = e.relatedTarget;
            if (!i) return !0;
            try {
                for (; i && i !== t;) i = i.parentNode
            } catch (t) {
                return !1
            }
            return i !== t
        },
        _filterClick: function(t, e) {
            var i = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp,
                n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
            return n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated ? void o.DomEvent.stop(t) : (o.DomEvent._lastClick = i, void e(t))
        }
    }, o.DomEvent.addListener = o.DomEvent.on, o.DomEvent.removeListener = o.DomEvent.off, o.PosAnimation = o.Evented.extend({
        run: function(t, e, i, n) {
            this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = o.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0), this._complete())
        },
        _animate: function() {
            this._animId = o.Util.requestAnimFrame(this._animate, this), this._step()
        },
        _step: function(t) {
            var e = +new Date - this._startTime,
                i = 1e3 * this._duration;
            e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
        },
        _runFrame: function(t, e) {
            var i = this._startPos.add(this._offset.multiplyBy(t));
            e && i._round(), o.DomUtil.setPosition(this._el, i), this.fire("step")
        },
        _complete: function() {
            o.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
        },
        _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }
    }), o.Projection.Mercator = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: o.bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
        project: function(t) {
            var e = Math.PI / 180,
                i = this.R,
                n = t.lat * e,
                s = this.R_MINOR / i,
                r = Math.sqrt(1 - s * s),
                a = r * Math.sin(n),
                h = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - a) / (1 + a), r / 2);
            return n = -i * Math.log(Math.max(h, 1e-10)), new o.Point(t.lng * e * i, n)
        },
        unproject: function(t) {
            for (var e, i = 180 / Math.PI, n = this.R, s = this.R_MINOR / n, r = Math.sqrt(1 - s * s), a = Math.exp(-t.y / n), h = Math.PI / 2 - 2 * Math.atan(a), l = 0, u = .1; l < 15 && Math.abs(u) > 1e-7; l++) e = r * Math.sin(h), e = Math.pow((1 - e) / (1 + e), r / 2), u = Math.PI / 2 - 2 * Math.atan(a * e) - h, h += u;
            return new o.LatLng(h * i, t.x * i / n)
        }
    }, o.CRS.EPSG3395 = o.extend({}, o.CRS.Earth, {
        code: "EPSG:3395",
        projection: o.Projection.Mercator,