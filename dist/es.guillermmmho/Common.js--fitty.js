/*
 * fitty v2.2.6 - Snugly resizes text to fit its parent container
 * Copyright (c) 2018 Rik Schennink <hello@rikschennink.nl> (http://rikschennink.nl/)
 */
 
$( document ).ready( function() {
    fitty('fit-text');
})

! function(e, t) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], t);
    else if ("undefined" != typeof exports) t(module, exports);
    else {
        var n = {
            exports: {}
        };
        t(n, n.exports), e.fitty = n.exports
    }
}(this, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var D = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
    };
    t.default = function(n) {
        if (n) {
            var i = function(e) {
                    return [].slice.call(e)
                },
                r = {
                    IDLE: 0,
                    DIRTY_CONTENT: 1,
                    DIRTY_LAYOUT: 2,
                    DIRTY: 3
                },
                o = [],
                e = null,
                u = "requestAnimationFrame" in n ? function() {
                    n.cancelAnimationFrame(e), e = n.requestAnimationFrame(function() {
                        a(o.filter(function(e) {
                            return e.dirty
                        }))
                    })
                } : function() {},
                t = function(t) {
                    return function() {
                        o.forEach(function(e) {
                            e.dirty = t
                        }), u()
                    }
                },
                a = function(e) {
                    e.filter(function(e) {
                        return !e.styleComputed
                    }).forEach(function(e) {
                        e.styleComputed = f(e)
                    }), e.filter(d).forEach(p);
                    var t = e.filter(s);
                    t.forEach(c), t.forEach(function(e) {
                        p(e), l(e)
                    }), t.forEach(m)
                },
                l = function(e) {
                    return e.dirty = r.IDLE
                },
                c = function(e) {
                    e.availableWidth = e.element.parentNode.clientWidth, e.currentWidth = e.element.scrollWidth, e.previousFontSize = e.currentFontSize, e.currentFontSize = Math.min(Math.max(e.minSize, e.availableWidth / e.currentWidth * e.previousFontSize), e.maxSize), e.whiteSpace = e.multiLine && e.currentFontSize === e.minSize ? "normal" : "nowrap"
                },
                s = function(e) {
                    return e.dirty !== r.DIRTY_LAYOUT || e.dirty === r.DIRTY_LAYOUT && e.element.parentNode.clientWidth !== e.availableWidth
                },
                f = function(e) {
                    var t = n.getComputedStyle(e.element, null);
                    e.currentFontSize = parseInt(t.getPropertyValue("font-size"), 10), e.display = t.getPropertyValue("display"), e.whiteSpace = t.getPropertyValue("white-space")
                },
                d = function(e) {
                    var t = !1;
                    return !e.preStyleTestCompleted && (/inline-/.test(e.display) || (t = !0, e.display = "inline-block"), "nowrap" !== e.whiteSpace && (t = !0, e.whiteSpace = "nowrap"), e.preStyleTestCompleted = !0, t)
                },
                p = function(e) {
                    e.originalStyle || (e.originalStyle = e.element.getAttribute("style") || ""), e.element.style.cssText = e.originalStyle + ";white-space:" + e.whiteSpace + ";display:" + e.display + ";font-size:" + e.currentFontSize + "px"
                },
                m = function(e) {
                    e.element.dispatchEvent(new CustomEvent("fit", {
                        detail: {
                            oldValue: e.previousFontSize,
                            newValue: e.currentFontSize,
                            scaleFactor: e.currentFontSize / e.previousFontSize
                        }
                    }))
                },
                v = function(e, t) {
                    return function() {
                        e.dirty = t, u()
                    }
                },
                y = function(e) {
                    e.newbie = !0, e.dirty = !0, o.push(e)
                },
                h = function(t) {
                    return function() {
                        o = o.filter(function(e) {
                            return e.element !== t.element
                        }), t.observeMutations && t.observer.disconnect(), t.element.style.cssText = t.originalStyle
                    }
                },
                S = function(e) {
                    e.observeMutations && (e.observer = new MutationObserver(v(e, r.DIRTY_CONTENT)), e.observer.observe(e.element, e.observeMutations))
                },
                b = {
                    minSize: 16,
                    maxSize: 512,
                    multiLine: !0,
                    observeMutations: "MutationObserver" in n && {
                        subtree: !0,
                        childList: !0,
                        characterData: !0
                    }
                },
                w = null,
                T = function() {
                    n.clearTimeout(w), w = n.setTimeout(t(r.DIRTY_LAYOUT), g.observeWindowDelay)
                },
                z = ["resize", "orientationchange"];
            return Object.defineProperty(g, "observeWindow", {
                set: function(e) {
                    var t = (e ? "add" : "remove") + "EventListener";
                    z.forEach(function(e) {
                        n[t](e, T)
                    })
                }
            }), g.observeWindow = !0, g.observeWindowDelay = 100, g.fitAll = t(r.DIRTY), g
        }

        function F(e, t) {
            var n = D({}, b, t),
                i = e.map(function(e) {
                    var t = D({}, n, {
                        element: e
                    });
                    return y(t), S(t), {
                        element: e,
                        fit: v(t, r.DIRTY),
                        unsubscribe: h(t)
                    }
                });
            return u(), i
        }

        function g(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            return "string" == typeof e ? F(i(document.querySelectorAll(e)), t) : F([e], t)[0]
        }
    }("undefined" == typeof window ? null : window), e.exports = t.default
});