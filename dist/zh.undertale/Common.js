/* 此处的JavaScript将加载于所有用户每一个页面。 */
/**
 * Script configuration
 */
$.extend(window, {
    // AbuseLogRC
    abuseLogRC_users: [
        'Cheeseskates',
        'Man Son You'
    ],
    abuseLogRC_collapsible: true,
    abuseLogRC_entries: 5,
    // AddRailModule
    ARMPrepend: true,
    // AjaxRC
    AjaxRCRefreshText: 'Auto-Refresh',
    AjaxRCRefreshHoverText: 'Automatically refresh the page',
    ajaxSpecialPages: [
        'Recentchanges',
        'WikiActivity',
        'Log',
        'AbuseLog'
    ]
});

/**
 * Miscellaneous code
 */
(function() {
    // AddRailModule configuration
    var ns = mw.config.get('wgNamespaceNumber');
    window.ARMModules = (
        !$.storage.get('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? ['int:custom-spoiler-warning'] : [];
 
    // Apparently, Vignette is screwing up our GIF images in infoboxes and file pages
    // Interestingly, when these GIFs are scaled down, the issue doesn't happen
    // This fixes the image issue in infoboxes
    // For content review: you can test the script on [[Mettaton]] page to see
    // the difference
    $('.pi-image-collection img').each(function() {
        var $this = $(this),
            url = new mw.Uri($this.attr('src'));
        $this.removeAttr('srcset');
        if (url.path.indexOf('scale-to-width-down') === -1) {
            url.path += '/scale-to-width-down/' + $this.attr('width');
        }
        url.query.cb = Number(url.query.cb) + 1;
        $this.attr('src', url.toString());
    });
 
    // Move spoiler warning to the top, but below ads
    // Set a listener to remove the module when dismissed
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'int:custom-spoiler-warning') {
            var $module = $('#WikiaRail .railModule');
            $module.find('#spoiler-warning-button').click(function() {
                $.storage.set('spoiler-warning', true);
                $module.slideToggle();
            });
        }
    });
 
    mw.hook('DiscordIntegrator.added').add(function() {
        var $content = $('#WikiaRail .railModule');
        $content.insertBefore('.DiscordIntegratorModule');
    });
})();


/* 以下內容是為了自動空格功能而加入。大多數的程式碼來自github mastermay，我僅做兼容性修改。 */
(function(window, $) {
    init = function() {
        $("body").each(function() {
            var hanzi = "[\u2E80-\u2FFF\u31C0-\u31EF\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]",
                punc = {
                    base: "[@&=_,.?!$%^*-+/]",
                    open: "[([{'\"<‘“]",
                    close: "[)]}'\">’”]"
                },
                latin = "[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]|" + punc.base,
                patterns = ["/(" + hanzi + ")(" + latin + "|" + punc.open + ")/ig", "/(" + latin + "|" + punc.close + ")(" + hanzi + ")/ig"];
            patterns.forEach(function(exp) {
                findAndReplaceDOMText(this, {
                    find: eval(exp),
                    replace: "$1<hanla>$2"
                })
            }, this);
            findAndReplaceDOMText(this, {
                find: "<hanla>",
                replace: function() {
                    return document.createElement("hanla")
                }
            });
            this.normalize();
            $("* > hanla:first-child").parent().each(function() {
                if (this.firstChild.nodeType == 1) {
                    $(this).before($("<hanla/>"));
                    $(this).find("hanla:first-child").remove()
                }
            })
        })
    }, findAndReplaceDOMText = function(a, b) {
        var b = b;
        b.filterElements = function(el) {
            var name = el.nodeName.toLowerCase(),
                classes = (el.nodeType == 1) ? el.getAttribute("class") : "",
                charized = (classes && classes.match(/han-js-charized/) != null) ? true : false;
            return name !== "style" && name !== "script" && !charized
        };
        return window.findAndReplaceDOMText(a, b)
    };
    $(function() {
        init()
    })
})(window, window.jQuery, undefined);
window.findAndReplaceDOMText = (function() {
    var j = "retain";
    var b = "first";
    var i = document;
    var d = {}.toString;

    function h(k) {
        return d.call(k) == "[object Array]"
    }

    function f(k) {
        return String(k).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
    }

    function g() {
        return e.apply(null, arguments) || a.apply(null, arguments)
    }

    function e(q, p, n, l, o) {
        if ((p && !p.nodeType) && arguments.length <= 2) {
            return false
        }
        var m = typeof n == "function";
        if (m) {
            n = (function(r) {
                return function(t, s) {
                    return r(t.text, s.startIndex)
                }
            }(n))
        }
        var k = a(p, {
            find: q,
            wrap: m ? null : n,
            replace: m ? n : "$" + (l || "&"),
            prepMatch: function(r, s) {
                if (!r[0]) {
                    throw "findAndReplaceDOMText cannot handle zero-length matches"
                }
                if (l > 0) {
                    var t = r[l];
                    r.index += r[0].indexOf(t);
                    r[0] = t
                }
                r.endIndex = r.index + r[0].length;
                r.startIndex = r.index;
                r.index = s;
                return r
            },
            filterElements: o
        });
        g.revert = function() {
            return k.revert()
        };
        return true
    }

    function a(l, k) {
        return new c(l, k)
    }
    g.Finder = c;

    function c(l, k) {
        k.portionMode = k.portionMode || j;
        this.node = l;
        this.options = k;
        this.prepMatch = k.prepMatch || this.prepMatch;
        this.reverts = [];
        this.matches = this.search();
        if (this.matches.length) {
            this.processMatches()
        }
    }
    c.prototype = {
        search: function() {
            var l;
            var k = 0;
            var m = this.options.find;
            var o = this.getAggregateText();
            var n = [];
            m = typeof m === "string" ? RegExp(f(m), "g") : m;
            if (m.global) {
                while (l = m.exec(o)) {
                    n.push(this.prepMatch(l, k++))
                }
            } else {
                if (l = o.match(m)) {
                    n.push(this.prepMatch(l, 0))
                }
            }
            return n
        },
        prepMatch: function(l, k) {
            if (!l[0]) {
                throw new Error("findAndReplaceDOMText cannot handle zero-length matches")
            }
            l.endIndex = l.index + l[0].length;
            l.startIndex = l.index;
            l.index = k;
            return l
        },
        getAggregateText: function() {
            var l = this.options.filterElements;
            return k(this.node);

            function k(n) {
                if (n.nodeType === 3) {
                    return n.data
                }
                if (l && !l(n)) {
                    return ""
                }
                var m = "";
                if (n = n.firstChild) {
                    do {
                        m += k(n)
                    } while (n = n.nextSibling)
                }
                return m
            }
        },
        processMatches: function() {
            var o = this.matches;
            var l = this.node;
            var v = this.options.filterElements;
            var n, t, k = [],
                m = l,
                p = o.shift(),
                q = 0,
                u = 0,
                r = 0,
                s;
            out: while (true) {
                if (m.nodeType === 3) {
                    if (!t && m.length + q >= p.endIndex) {
                        t = {
                            node: m,
                            index: r++,
                            text: m.data.substring(p.startIndex - q, p.endIndex - q),
                            indexInMatch: q - p.startIndex,
                            indexInNode: p.startIndex - q,
                            endIndexInNode: p.endIndex - q,
                            isEnd: true
                        }
                    } else {
                        if (n) {
                            k.push({
                                node: m,
                                index: r++,
                                text: m.data,
                                indexInMatch: q - p.startIndex,
                                indexInNode: 0
                            })
                        }
                    }
                    if (!n && m.length + q > p.startIndex) {
                        n = {
                            node: m,
                            index: r++,
                            indexInMatch: 0,
                            indexInNode: p.startIndex - q,
                            endIndexInNode: p.endIndex - q,
                            text: m.data.substring(p.startIndex - q, p.endIndex - q)
                        }
                    }
                    q += m.data.length
                }
                s = m.nodeType === 1 && v && !v(m);
                if (n && t) {
                    m = this.replaceMatch(p, n, k, t);
                    q -= (t.node.data.length - t.endIndexInNode);
                    n = null;
                    t = null;
                    k = [];
                    p = o.shift();
                    r = 0;
                    u++;
                    if (!p) {
                        break
                    }
                } else {
                    if (!s && (m.firstChild || m.nextSibling)) {
                        m = m.firstChild || m.nextSibling;
                        continue
                    }
                }
                while (true) {
                    if (m.nextSibling) {
                        m = m.nextSibling;
                        break
                    } else {
                        if (m.parentNode !== l) {
                            m = m.parentNode
                        } else {
                            break out
                        }
                    }
                }
            }
        },
        revert: function() {
            for (var k = this.reverts.length; k--;) {
                this.reverts[k]()
            }
            this.reverts = []
        },
        prepareReplacementString: function(n, m, l, k) {
            var o = this.options.portionMode;
            if (o === b && m.indexInMatch > 0) {
                return ""
            }
            n = n.replace(/\$(\d+|&|`|')/g, function(p, q) {
                var r;
                switch (q) {
                    case "&":
                        r = l[0];
                        break;
                    case "`":
                        r = l.input.substring(0, l.startIndex);
                        break;
                    case "'":
                        r = l.input.substring(l.endIndex);
                        break;
                    default:
                        r = l[+q]
                }
                return r
            });
            if (o === b) {
                return n
            }
            if (m.isEnd) {
                return n.substring(m.indexInMatch)
            }
            return n.substring(m.indexInMatch, m.indexInMatch + m.text.length)
        },
        getPortionReplacementNode: function(m, l, k) {
            var o = this.options.replace || "$&";
            var q = this.options.wrap;
            if (q && q.nodeType) {
                var p = i.createElement("div");
                p.innerHTML = q.outerHTML || new XMLSerializer().serializeToString(q);
                q = p.firstChild
            }
            if (typeof o == "function") {
                o = o(m, l, k);
                if (o && o.nodeType) {
                    return o
                }
                return i.createTextNode(String(o))
            }
            var n = typeof q == "string" ? i.createElement(q) : q;
            o = i.createTextNode(this.prepareReplacementString(o, m, l, k));
            if (!n) {
                return o
            }
            n.appendChild(o);
            return n
        },
        replaceMatch: function(v, u, n, x) {
            var o = u.node;
            var z = x.node;
            var p;
            var r;
            if (o === z) {
                var q = o;
                if (u.indexInNode > 0) {
                    p = i.createTextNode(q.data.substring(0, u.indexInNode));
                    q.parentNode.insertBefore(p, q)
                }
                var y = this.getPortionReplacementNode(x, v);
                q.parentNode.insertBefore(y, q);
                if (x.endIndexInNode < q.length) {
                    r = i.createTextNode(q.data.substring(x.endIndexInNode));
                    q.parentNode.insertBefore(r, q)
                }
                q.parentNode.removeChild(q);
                this.reverts.push(function() {
                    if (p === y.previousSibling) {
                        p.parentNode.removeChild(p)
                    }
                    if (r === y.nextSibling) {
                        r.parentNode.removeChild(r)
                    }
                    y.parentNode.replaceChild(q, y)
                });
                return y
            } else {
                p = i.createTextNode(o.data.substring(0, u.indexInNode));
                r = i.createTextNode(z.data.substring(x.endIndexInNode));
                var k = this.getPortionReplacementNode(u, v);
                var w = [];
                for (var t = 0, s = n.length; t < s; ++t) {
                    var B = n[t];
                    var A = this.getPortionReplacementNode(B, v);
                    B.node.parentNode.replaceChild(A, B.node);
                    this.reverts.push((function(l, C) {
                        return function() {
                            C.parentNode.replaceChild(l.node, C)
                        }
                    }(B, A)));
                    w.push(A)
                }
                var m = this.getPortionReplacementNode(x, v);
                o.parentNode.insertBefore(p, o);
                o.parentNode.insertBefore(k, o);
                o.parentNode.removeChild(o);
                z.parentNode.insertBefore(m, z);
                z.parentNode.insertBefore(r, z);
                z.parentNode.removeChild(z);
                this.reverts.push(function() {
                    p.parentNode.removeChild(p);
                    k.parentNode.replaceChild(o, k);
                    r.parentNode.removeChild(r);
                    m.parentNode.replaceChild(z, m)
                });
                return m
            }
        }
    };
    return g
}());
/* 以上功能是為了自動空格功能而加入。 */