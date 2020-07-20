var _is_editpage = wgAction == "edit" || wgAction == "submit";
var Queue = {
    _once: [],
    _each: [],
    addOnce: function(a, b) {
        if (b !== false) {
            this._once.push(a)
        }
        return this
    },
    addEachFragment: function(a, b) {
        if (b !== false) {
            this._each.push(a)
        }
        return this
    },
    runOnce: function() {
        $.each(this._once, function(a, b) {
            b()
        });
        return this
    },
    runEachFragment: function(a) {
        var b = this._each,
            a = a || document;
        $(a).each(function(c, d) {
            $.each(b, function(e, g) {
                g(d)
            })
        });
        return this
    }
};
addOnloadHook(function() {
    Queue.runOnce().runEachFragment(document)
});
function createMorphObjects(a) {
    $(".morphcontainer", a).each(function() {
        var g = $(this),
            k = $("*", this);
        var c = $("* .morphcontainer", this);
        c.each(function() {
            k = k.not($("*", this))
        });
        var j = k.filter(".morphlink"),
            b = k.filter(".morphcontent"),
            h = g.children(".morphlink_hilight").size() ? g.children(".morphlink_hilight").eq(0).attr("style") : "color:blue; text-decoration:underline; cursor: pointer;",
            l = g.children(".morphlink_default").size() ? g.children(".morphlink_default").eq(0).attr("style") : "color:blue; cursor: pointer;",
            d = g.hasClass("hover") ? "mouseover" : "click",
            e = [],
            m = 0,
            f = false;
        b.hide();
        g.children(".morphlink_hilight, .morphlink_default").remove();
        j.attr("style", l).addClass("fake-button").each(function(o, p) {
            e[o] = $("");
            if (g.hasClass("manualsort")) {
                var n = $(p).attr("class").replace(/(.*)morphlink(.*)/, "$1$2").match(/morph\S+/g);
                for (x in n) {
                    e[o] = e[o].add(b.filter("." + n[x].replace(/([:\.\\\/])/g, "\\$1")))
                }
            } else {
                e[o] = $(e[o]).add($(b).eq(o))
            }
            $(p).bind(d, function() {
                j.attr("style", l);
                $(p).attr("style", h);
                b.hide();
                e[o].show();
                if (f) {
                    $("iframe", e[m]).each(function() {
                        var q = $(this).attr("src").replace("&autoplay=1", "");
                        $(this).attr("src", "");
                        $(this).attr("src", q)
                    })
                }
                m = o;
                f = true
            })
        });
        k.filter(".morphprev, .morphnext").attr("unselectable", "on").click(function() {
            var n = $(this).hasClass("morphprev") ? (m - 1) : ((m + 1));
            if (n < 0) {
                n = j.size() - 1
            }
            if (n > j.size() - 1) {
                n = 0
            }
            j.eq(n).triggerHandler(d)
        });
        j.eq(m).triggerHandler(d)
    })
}
Queue.addEachFragment(createMorphObjects);
(function() {
    var TabSwitchTimer = null,
        TabSwitchGlobState = 0,
        MyEditTools = {
            updateFirstVisible: function() {
                $(".first").removeClass("first");
                $("#editpage-specialchars table tr:visible").eq(0).addClass("first")
            },
            setAll: function(t) {
                var rows = $("#editpage-specialchars table tr"),
                    sw = $("#switcher div");
                if (t) {
                    var cl = t > 0 ? "visible" : "hidden";
                    rows.each(function(i) {
                        if (!TabSwitchGlobState) {
                            $(this).data("prevstate", this.className)
                        }
                        this.className = cl
                    });
                    var cl = t > 0 ? "fixed" : "";
                    sw.each(function(i) {
                        if (!TabSwitchGlobState) {
                            $(this).data("prevstate", this.className)
                        }
                        this.className = cl
                    })
                } else {
                    rows.each(function(i) {
                        this.className = $(this).data("prevstate") || ""
                    });
                    sw.each(function(i) {
                        this.className = $(this).data("prevstate") || ""
                    })
                }
                TabSwitchGlobState = t;
                $("#pageShowAll").attr("class", t > 0 ? "swon" : "swoff");
                $("#pageHideAll").attr("class", t < 0 ? "swon" : "swoff");
                MyEditTools.updateFirstVisible()
            },
            clearTimer: function() {
                if (TabSwitchTimer) {
                    window.clearTimeout(TabSwitchTimer);
                    TabSwitchTimer = null
                }
            },
            clearSelected: function() {
                $("#switcher div.selected").removeClass("selected");
                $("#editpage-specialchars table tr.selected").removeClass("visible").addClass("hidden").removeClass("selected")
            },
            init: function() {
                if (!$("#editpage-specialchars").size()) {
                    return
                }
                $("#editpage-specialchars").css("border", "none");
                var switcher = $('<caption style="text-align:left" id="switcher"/>').prependTo($("#editpage-specialchars table"));
                var rows = $("#editpage-specialchars table tr");
                rows.each(function(i) {
                    var id = "page" + i,
                        td = $("td:first", this);
                    var row = $(this).attr("id", "r" + id).addClass(i == 0 ? "visible" : "hidden").toggleClass("first", !i).toggleClass("selected", !i);
                    var sw = $("<div/>").attr("id", "sw" + id).html((td.html() || "").replace(/:/, "")).hover(function(e) {
                        MyEditTools.clearTimer();
                        if (sw.hasClass("fixed")) {
                            return
                        }
                        TabSwitchTimer = window.setTimeout(function() {
                            MyEditTools.clearSelected();
                            sw.addClass("selected");
                            row.addClass("selected").removeClass("hidden").addClass("visible");
                            MyEditTools.updateFirstVisible()
                        }, 50)
                    }, MyEditTools.clearTimer).click(function(e) {
                        MyEditTools.clearTimer();
                        if (!sw.hasClass("fixed")) {
                            sw.removeClass("selected").addClass("fixed");
                            row.removeClass("selected").removeClass("hidden").addClass("visible")
                        } else {
                            MyEditTools.clearSelected();
                            sw.removeClass("fixed").addClass("selected")
                        }
                        MyEditTools.updateFirstVisible()
                    }).appendTo(switcher).toggleClass("selected", !i)
                });
                with(switcher) {
                    append($('<div id="pageHideAll" class="swoff">Hide All</div>').click(function() {
                        MyEditTools.clearTimer();
                        MyEditTools.setAll(TabSwitchGlobState < 0 ? 0 : -1)
                    }));
                    append($('<div id="pageShowAll" class="swoff">Show All</div>').click(function() {
                        MyEditTools.clearTimer();
                        MyEditTools.setAll(TabSwitchGlobState > 0 ? 0 : 1)
                    }))
                }
                $("#toolbar").before($(".mw-editTools"))
            }
        };
    Queue.addOnce(MyEditTools.init, _is_editpage || (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == "Upload"))
})();
Queue.addEachFragment(function(c) {
    var e = $('<div style="text-align:center;"><img src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" alt="l" /></div>'),
        b = {};

    function a(f) {
        $("html,body").animate({
            scrollTop: f
        }, 350)
    }
    $(".ajaxed", c).each(function(g, f) {
        var k = /\bajaxtarget(\S+?)(?:\s|$)/.exec(this.className);
        if (!k) {
            return
        }
        var n = k[1].replace(/([:\.\\\/])/g, "\\$1"),
            j = {},
            h = false,
            m = $(".ajaxcont" + n, c).eq(0);
        b[encodeURIComponent(k[1]).replace(/%/g, ".")] = [n, m];
        if ($(this).hasClass("ajax_addhider")) {
            h = $(".ajax_addhider.ajaxhide" + n, c).eq(0);
            if (!h.length) {
                h = false
            }
        }

        function l(o, r) {
            if (j == o[0] && o.data("remoteObtained") == 2) {
                if (!r.is(":visible")) {
                    r.show()
                }
                return
            }
            j = o[0];
            var q = o.data("remote");
            if (!jQuery.trim(q).length) {
                return
            }
            r.empty().append(q);
            o.data("remoteObtained", 2);
            $(".ajaxnoinclude", r).remove();
            if (h) {
                var p = h.clone().click(function(s) {
                    s.preventDefault();
                    m.toggle();
                    if (window.pageYOffset > ($(f).offset().top + $(f).height())) {
                        a($(f).offset().top)
                    }
                });
                r.append($('<div style="clear:both;"/>').append(p))
            }
            Queue.runEachFragment(r);
            r.show()
        }
        $("a:not(.external,.new)", this).addClass("ajaxlink").one("click", function(p) {
            p.preventDefault();
            if (p.which > 1) {
                return
            }
            var o = $(this);
            o.data({
                remote: e.clone(),
                remoteObtained: 0
            });
            m.empty().append(e.clone()).show();
            $.ajax({
                url: "/api.php?action=parse&format=json&redirects&prop=text&page=" + encodeURIComponent(o.attr("title")),
                dataType: "json",
                success: function(q) {
                    o.data({
                        remote: q.parse.text["*"],
                        remoteObtained: 1
                    });
                    if (h) {
                        h.show()
                    } else {
                        $(".ajaxhide" + n, c).show()
                    }
                    l(o, m)
                }
            });
            o.click(function(q) {
                q.preventDefault();
                l(o, m)
            })
        });
        $(".ajaxhide" + n, c).click(function(o) {
            o.preventDefault();
            m.toggle()
        })
    });
    if (!jQuery.isEmptyObject(b) && c == document) {
        function d() {
            var g = location.hash.substring(1);
            if (g in b) {
                var f = $(".ajaxed.ajaxtarget" + b[g][0] + " a.ajaxlink", c).eq(0);
                f.triggerHandler("click");
                f.parent(".morphlink.morph" + b[g][0]).triggerHandler("click");
                a(b[g][1].offset().top - 15)
            }
        }
        $(window).on("hashchange", d);
        d()
    }
});
function gallerySlideshow(b) {
    var a = "//images.wikia.com/terraria/ru/images/",
        c = new Date().getTime();
    $('a.internal[href^="/images/"], a.internal[href^="//images.wikia.com/terraria/ru"]', b).each(function() {
        var f = $(this),
            e = f.text(),
            d = f.attr("href");
        if (/\.(?:jpe?g|png|gif)$/i.test(d)) {
            f.attr({
                "data-file-description": f.attr("title"),
                "data-file-link": d,
                "data-image-gallery-box": "prettyPhoto"
            }).addClass("mediafile").data("htmlDesc", (/^(?:Media|Медиа):/i.test(e) || e == f.attr("title")) ? "" : f.html())
        }
    });
    $("a[data-image-gallery-box^='prettyPhoto']", b).prettyPhoto({
        modal: false,
        deeplinking: false,
        animation_speed: "fast",
        opacity: 0,
        gallery_markup: "",
        social_tools: false,
        ie6_fallback: false,
        show_title: false,
        changepicturecallback: function() {
            var f = (arguments[1] == "prettyPhoto") ? arguments[0].data("htmlDesc") : $('a.image[data-image-gallery-box="' + arguments[1].replace(/([\]\[])/g, "\\$1") + '"]', b).eq(arguments[3]).data("htmlDesc"),
                g = decodeURIComponent(/images\/.\/..\/(.+)$/.exec($("#fullResImage").attr("src"))[1]),
                d = $(".pp_description"),
                e = $("<a/>", {
                    href: "/Файл:" + g,
                    title: "Перейти к странице описания"
                }).text(/^(.{0,30})/.exec(g)[1].replace(/_/g, " "));
            d.html($(".pp_description").is(":hidden") ? "" : f).show();
            if ($(".pp_wikitools").length) {
                $(".pp_wikitools").empty().append(e)
            } else {
                d.append($('<div class="imagepagelink"></div>').append(e))
            }
        }
    })
}