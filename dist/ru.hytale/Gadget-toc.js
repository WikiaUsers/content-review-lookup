!function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function(t) {
    function e(t) {
        return t.replace(/(:|\.|\/)/g, "\\$1")
    }
    var o = "1.6.0"
      , i = {}
      , l = {
        exclude: [],
        excludeWithin: [],
        offset: 0,
        direction: "top",
        delegateSelector: null,
        scrollElement: null,
        scrollTarget: null,
        beforeScroll: function() {},
        afterScroll: function() {},
        easing: "swing",
        speed: 400,
        autoCoefficient: 2,
        preventDefault: !0
    }
      , s = function(e) {
        var o = []
          , i = !1
          , l = e.dir && "left" === e.dir ? "scrollLeft" : "scrollTop";
        return this.each(function() {
            var e = t(this);
            return this !== document && this !== window ? !document.scrollingElement || this !== document.documentElement && this !== document.body ? void (e[l]() > 0 ? o.push(this) : (e[l](1),
            i = e[l]() > 0,
            i && o.push(this),
            e[l](0))) : (o.push(document.scrollingElement),
            !1) : void 0
        }),
        o.length || this.each(function() {
            "BODY" === this.nodeName && (o = [this])
        }),
        "first" === e.el && o.length > 1 && (o = [o[0]]),
        o
    };
    t.fn.extend({
        scrollable: function(t) {
            var e = s.call(this, {
                dir: t
            });
            return this.pushStack(e)
        },
        firstScrollable: function(t) {
            var e = s.call(this, {
                el: "first",
                dir: t
            });
            return this.pushStack(e)
        },
        smoothScroll: function(o, i) {
            if (o = o || {},
            "options" === o)
                return i ? this.each(function() {
                    var e = t(this)
                      , o = t.extend(e.data("ssOpts") || {}, i);
                    t(this).data("ssOpts", o)
                }) : this.first().data("ssOpts");
            var l = t.extend({}, t.fn.smoothScroll.defaults, o)
              , s = function(o) {
                var i = this
                  , s = t(this)
                  , n = t.extend({}, l, s.data("ssOpts") || {})
                  , c = l.exclude
                  , a = n.excludeWithin
                  , r = 0
                  , h = 0
                  , u = !0
                  , d = {}
                  , p = t.smoothScroll.filterPath(location.pathname)
                  , f = t.smoothScroll.filterPath(i.pathname)
                  , m = location.hostname === i.hostname || !i.hostname
                  , g = n.scrollTarget || f === p
                  , v = e(i.hash);
                if (n.scrollTarget || m && g && v) {
                    for (; u && r < c.length; )
                        s.is(e(c[r++])) && (u = !1);
                    for (; u && h < a.length; )
                        s.closest(a[h++]).length && (u = !1)
                } else
                    u = !1;
                u && (n.preventDefault && o.preventDefault(),
                t.extend(d, n, {
                    scrollTarget: n.scrollTarget || v,
                    link: i
                }),
                t.smoothScroll(d))
            };
            return null !== o.delegateSelector ? this.undelegate(o.delegateSelector, "click.smoothscroll").delegate(o.delegateSelector, "click.smoothscroll", s) : this.unbind("click.smoothscroll").bind("click.smoothscroll", s),
            this
        }
    }),
    t.smoothScroll = function(e, o) {
        if ("options" === e && "object" == typeof o)
            return t.extend(i, o);
        var l, s, n, c, a, r = 0, h = "offset", u = "scrollTop", d = {}, p = {};
        "number" == typeof e ? (l = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, i),
        n = e) : (l = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, e || {}, i),
        l.scrollElement && (h = "position",
        "static" === l.scrollElement.css("position") && l.scrollElement.css("position", "relative"))),
        u = "left" === l.direction ? "scrollLeft" : u,
        l.scrollElement ? (s = l.scrollElement,
        /^(?:HTML|BODY)$/.test(s[0].nodeName) || (r = s[u]())) : s = t("html, body").firstScrollable(l.direction),
        l.beforeScroll.call(s, l),
        n = "number" == typeof e ? e : o || t(l.scrollTarget)[h]() && t(l.scrollTarget)[h]()[l.direction] || 0,
        d[u] = n + r + l.offset,
        c = l.speed,
        "auto" === c && (a = Math.abs(d[u] - s[u]()),
        c = a / l.autoCoefficient),
        p = {
            duration: c,
            easing: l.easing,
            complete: function() {
                l.afterScroll.call(l.link, l)
            }
        },
        l.step && (p.step = l.step),
        s.length ? s.stop().animate(d, p) : l.afterScroll.call(l.link, l)
    }
    ,
    t.smoothScroll.version = o,
    t.smoothScroll.filterPath = function(t) {
        return t = t || "",
        t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }
    ,
    t.fn.smoothScroll.defaults = l
}),
jQuery.cookie = function(t, e, o) {
    if (arguments.length > 1 && "[object Object]" !== String(e)) {
        if (o = jQuery.extend({}, o),
        (null === e || void 0 === e) && (o.expires = -1),
        "number" == typeof o.expires) {
            var i = o.expires
              , l = o.expires = new Date;
            l.setDate(l.getDate() + i)
        }
        return e = String(e),
        document.cookie = [encodeURIComponent(t), "=", o.raw ? e : encodeURIComponent(e), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("")
    }
    o = e || {};
    var s, n = o.raw ? function(t) {
        return t
    }
    : decodeURIComponent;
    return (s = new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? n(s[1]) : null
}
,
jQuery(document).ready(function(t) {
    if ("undefined" != typeof toc) {
        if (t.fn.shrinkTOCWidth = function() {
            t(this).css({
                width: "auto",
                display: "table"
            }),
            /MSIE 7\./.test(navigator.userAgent) && t(this).css("width", "")
        }
        ,
        1 == toc.smooth_scroll) {
            var e = hostname = pathname = qs = hash = null;
            t("body a").click(function() {
                if (hostname = t(this).prop("hostname"),
                pathname = t(this).prop("pathname"),
                qs = t(this).prop("search"),
                hash = t(this).prop("hash"),
                pathname.length > 0 && "/" != pathname.charAt(0) && (pathname = "/" + pathname),
                window.location.hostname == hostname && window.location.pathname == pathname && window.location.search == qs && "" !== hash) {
                    var o = hash.replace(/([ !"$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g, "\\$1");
                    t(o).length > 0 ? e = hash : (anchor = hash,
                    anchor = anchor.replace("#", ""),
                    e = 'a[name="' + anchor + '"]',
                    0 == t(e).length && (e = "")),
                    offset = "undefined" != typeof toc.smooth_scroll_offset ? -1 * toc.smooth_scroll_offset : t("#wpadminbar").length > 0 && t("#wpadminbar").is(":visible") ? -30 : 0,
                    e && t.smoothScroll({
                        scrollTarget: e,
                        offset: offset
                    })
                }
            })
        }
        if ("undefined" != typeof toc.visibility_show) {
            var o = "undefined" != typeof toc.visibility_hide_by_default ? !0 : !1;
            if (t.cookie)
                var i = t.cookie("toc_hidetoc") ? toc.visibility_show : toc.visibility_hide;
            else
                var i = toc.visibility_hide;
            o && (i = i == toc.visibility_hide ? toc.visibility_show : toc.visibility_hide),
            t("#toc_container p.toc_title").append(' <span class="toc_toggle">[<a href="#">' + i + "</a>]</span>"),
            i == toc.visibility_show && (t("ul.toc_list").hide(),
            t("#toc_container").addClass("contracted").shrinkTOCWidth()),
            t("span.toc_toggle a").click(function(e) {
                switch (e.preventDefault(),
                t(this).html()) {
                case t("<div/>").html(toc.visibility_hide).text():
                    t(this).html(toc.visibility_show),
                    t.cookie && (o ? t.cookie("toc_hidetoc", null, {
                        path: "/"
                    }) : t.cookie("toc_hidetoc", "1", {
                        expires: 30,
                        path: "/"
                    })),
                    t("ul.toc_list").hide("fast"),
                    t("#toc_container").addClass("contracted").shrinkTOCWidth();
                    break;
                case t("<div/>").html(toc.visibility_show).text():
                default:
                    t(this).html(toc.visibility_hide),
                    t.cookie && (o ? t.cookie("toc_hidetoc", "1", {
                        expires: 30,
                        path: "/"
                    }) : t.cookie("toc_hidetoc", null, {
                        path: "/"
                    })),
                    t("#toc_container").css("width", toc.width).removeClass("contracted"),
                    t("ul.toc_list").show("fast")
                }
            })
        }
    }
});