// Puts Grammarly on all pages when editing
var e = {
    71654: (e,t,n)=>{
        var i = n(33356)
          , r = "chrome-extension://__MSG_@@extension_id__/"
          , s = "moz-extension://__MSG_@@extension_id__/"
          , o = "safari-web-extension://__MSG_@@extension_id__/"
          , a = self.GR_RESOURCE_ROOT || r
          , c = self.GR_RESOURCE_ROOT || s
          , u = self.GR_RESOURCE_ROOT || o;
        e.exports = {
            __css: i.toString().replace(new RegExp(r,"g"), a).replace(new RegExp(s,"g"), c).replace(new RegExp(o,"g"), u),
            ...i.locals
        }
    }
    ,
    33356: (e,t,n)=>{
        var i = n(54933)
          , r = n(93476)(i);
        r.push([e.id, "._cWTM9-animatedUnderline{visibility:hidden;position:fixed;}._cWTM9-animatedUnderline:after{content:'';position:absolute;visibility:visible;height:3px;bottom:0;border-radius:10px;background:#488cc8;animation:_Axb1F-showUnderline 1.3s ease forwards}._cWTM9-animatedUnderline._qSuCO-completeAnimation:after{animation:_Axb1F-showUnderline .2s ease forwards}@keyframes _Axb1F-showUnderline{0%{width:0%}100%{width:100%}}._hoLGP-checkAnimatedUnderline{animation:_Axb1F-showUnderline 2s ease forwards;}._hoLGP-checkAnimatedUnderline._qSuCO-completeAnimation{animation:_Axb1F-showUnderline .2s ease forwards}", ""]),
        r.locals = {
            animatedUnderline: "_cWTM9-animatedUnderline",
            showUnderline: "_Axb1F-showUnderline",
            completeAnimation: "_qSuCO-completeAnimation",
            checkAnimatedUnderline: "_hoLGP-checkAnimatedUnderline"
        },
        e.exports = r
    }
    ,
    93476: e=>{
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var n = ""
                      , i = void 0 !== t[5];
                    return t[4] && (n += "@supports (".concat(t[4], ") {")),
                    t[2] && (n += "@media ".concat(t[2], " {")),
                    i && (n += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")),
                    n += e(t),
                    i && (n += "}"),
                    t[2] && (n += "}"),
                    t[4] && (n += "}"),
                    n
                }
                )).join("")
            }
            ,
            t.i = function(e, n, i, r, s) {
                "string" == typeof e && (e = [[null, e, void 0]]);
                var o = {};
                if (i)
                    for (var a = 0; a < this.length; a++) {
                        var c = this[a][0];
                        null != c && (o[c] = !0)
                    }
                for (var u = 0; u < e.length; u++) {
                    var l = [].concat(e[u]);
                    i && o[l[0]] || (void 0 !== s && (void 0 === l[5] || (l[1] = "@layer".concat(l[5].length > 0 ? " ".concat(l[5]) : "", " {").concat(l[1], "}")),
                    l[5] = s),
                    n && (l[2] ? (l[1] = "@media ".concat(l[2], " {").concat(l[1], "}"),
                    l[2] = n) : l[2] = n),
                    r && (l[4] ? (l[1] = "@supports (".concat(l[4], ") {").concat(l[1], "}"),
                    l[4] = r) : l[4] = "".concat(r)),
                    t.push(l))
                }
            }
            ,
            t
        }
    }
    ,
    54933: e=>{
        e.exports = function(e) {
            return e[1]
        }
    }
    ,
    70201: e=>{
        e.exports = {
            animatedUnderline: "ymqHP",
            showUnderline: "JQguZ",
            completeAnimation: "ExcM8"
        }
    }
    ,
    27061: e=>{
        var t, n, i = e.exports = {};
        function r() {
            throw new Error("setTimeout has not been defined")
        }
        function s() {
            throw new Error("clearTimeout has not been defined")
        }
        function o(e) {
            if (t === setTimeout)
                return setTimeout(e, 0);
            if ((t === r || !t) && setTimeout)
                return t = setTimeout,
                setTimeout(e, 0);
            try {
                return t(e, 0)
            } catch (n) {
                try {
                    return t.call(null, e, 0)
                } catch (n) {
                    return t.call(this, e, 0)
                }
            }
        }
        !function() {
            try {
                t = "function" == typeof setTimeout ? setTimeout : r
            } catch (e) {
                t = r
            }
            try {
                n = "function" == typeof clearTimeout ? clearTimeout : s
            } catch (e) {
                n = s
            }
        }();
        var a, c = [], u = !1, l = -1;
        function d() {
            u && a && (u = !1,
            a.length ? c = a.concat(c) : l = -1,
            c.length && h())
        }
        function h() {
            if (!u) {
                var e = o(d);
                u = !0;
                for (var t = c.length; t; ) {
                    for (a = c,
                    c = []; ++l < t; )
                        a && a[l].run();
                    l = -1,
                    t = c.length
                }
                a = null,
                u = !1,
                function(e) {
                    if (n === clearTimeout)
                        return clearTimeout(e);
                    if ((n === s || !n) && clearTimeout)
                        return n = clearTimeout,
                        clearTimeout(e);
                    try {
                        n(e)
                    } catch (t) {
                        try {
                            return n.call(null, e)
                        } catch (t) {
                            return n.call(this, e)
                        }
                    }
                }(e)
            }
        }
        function p(e, t) {
            this.fun = e,
            this.array = t
        }
        function g() {}
        i.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            c.push(new p(e,t)),
            1 !== c.length || u || o(h)
        }
        ,
        p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        i.title = "browser",
        i.browser = !0,
        i.env = {},
        i.argv = [],
        i.version = "",
        i.versions = {},
        i.on = g,
        i.addListener = g,
        i.once = g,
        i.off = g,
        i.removeListener = g,
        i.removeAllListeners = g,
        i.emit = g,
        i.prependListener = g,
        i.prependOnceListener = g,
        i.listeners = function(e) {
            return []
        }
        ,
        i.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ,
        i.cwd = function() {
            return "/"
        }
        ,
        i.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ,
        i.umask = function() {
            return 0
        }
    }
    ,
    82989: function(e, t, n) {
        var i;
        !function(r, s) {
            var o = "function"
              , a = "undefined"
              , c = "object"
              , u = "string"
              , l = "model"
              , d = "name"
              , h = "type"
              , p = "vendor"
              , g = "version"
              , f = "architecture"
              , m = "console"
              , b = "mobile"
              , v = "tablet"
              , _ = "smarttv"
              , y = "wearable"
              , w = "embedded"
              , E = "Amazon"
              , x = "Apple"
              , S = "ASUS"
              , k = "BlackBerry"
              , R = "Firefox"
              , I = "Google"
              , T = "Huawei"
              , F = "LG"
              , A = "Microsoft"
              , C = "Motorola"
              , O = "Opera"
              , N = "Samsung"
              , P = "Sharp"
              , L = "Sony"
              , M = "Xiaomi"
              , U = "Zebra"
              , D = "Facebook"
              , B = function(e) {
                for (var t = {}, n = 0; n < e.length; n++)
                    t[e[n].toUpperCase()] = e[n];
                return t
            }
              , j = function(e, t) {
                return typeof e === u && -1 !== H(t).indexOf(H(e))
            }
              , H = function(e) {
                return e.toLowerCase()
            }
              , $ = function(e, t) {
                if (typeof e === u)
                    return e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
                    typeof t === a ? e : e.substring(0, 350)
            }
              , V = function(e, t) {
                for (var n, i, r, a, u, l, d = 0; d < t.length && !u; ) {
                    var h = t[d]
                      , p = t[d + 1];
                    for (n = i = 0; n < h.length && !u; )
                        if (u = h[n++].exec(e))
                            for (r = 0; r < p.length; r++)
                                l = u[++i],
                                typeof (a = p[r]) === c && a.length > 0 ? 2 === a.length ? typeof a[1] == o ? this[a[0]] = a[1].call(this, l) : this[a[0]] = a[1] : 3 === a.length ? typeof a[1] !== o || a[1].exec && a[1].test ? this[a[0]] = l ? l.replace(a[1], a[2]) : s : this[a[0]] = l ? a[1].call(this, l, a[2]) : s : 4 === a.length && (this[a[0]] = l ? a[3].call(this, l.replace(a[1], a[2])) : s) : this[a] = l || s;
                    d += 2
                }
            }
              , W = function(e, t) {
                for (var n in t)
                    if (typeof t[n] === c && t[n].length > 0) {
                        for (var i = 0; i < t[n].length; i++)
                            if (j(t[n][i], e))
                                return "?" === n ? s : n
                    } else if (j(t[n], e))
                        return "?" === n ? s : n;
                return e
            }
              , G = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM"
            }
              , q = {
                browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [g, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [g, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, g], [/opios[\/ ]+([\w\.]+)/i], [g, [d, "Opera Mini"]], [/\bopr\/([\w\.]+)/i], [g, [d, O]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [d, g], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [g, [d, "UCBrowser"]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [g, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [g, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [g, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [g, [d, "IE"]], [/yabrowser\/([\w\.]+)/i], [g, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure Browser"], g], [/\bfocus\/([\w\.]+)/i], [g, [d, "Firefox Focus"]], [/\bopt\/([\w\.]+)/i], [g, [d, "Opera Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [g, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [g, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [g, [d, "Opera Coast"]], [/miuibrowser\/([\w\.]+)/i], [g, [d, "MIUI Browser"]], [/fxios\/([-\w\.]+)/i], [g, [d, R]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 Browser"]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 Browser"], g], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], g], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, g], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, D], g], [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, g], [/\bgsa\/([\w\.]+) .*safari\//i], [g, [d, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [g, [d, "Chrome Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, "Chrome WebView"], g], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [g, [d, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, g], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [g, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [g, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [g, W, {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, g], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], g], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [g, [d, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [d, g]],
                cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, H]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, H]]],
                device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [l, [p, N], [h, v]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [l, [p, N], [h, b]], [/\((ip(?:hone|od)[\w ]*);/i], [l, [p, x], [h, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [l, [p, x], [h, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [l, [p, T], [h, v]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [l, [p, T], [h, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[l, /_/g, " "], [p, M], [h, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[l, /_/g, " "], [p, M], [h, v]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [l, [p, "OPPO"], [h, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [l, [p, "Vivo"], [h, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [l, [p, "Realme"], [h, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [l, [p, C], [h, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [l, [p, C], [h, v]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [l, [p, F], [h, v]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [l, [p, F], [h, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [l, [p, "Lenovo"], [h, v]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[l, /_/g, " "], [p, "Nokia"], [h, b]], [/(pixel c)\b/i], [l, [p, I], [h, v]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [l, [p, I], [h, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [l, [p, L], [h, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[l, "Xperia Tablet"], [p, L], [h, v]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [l, [p, "OnePlus"], [h, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [l, [p, E], [h, v]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[l, /(.+)/g, "Fire Phone $1"], [p, E], [h, b]], [/(playbook);[-\w\),; ]+(rim)/i], [l, p, [h, v]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [l, [p, k], [h, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [l, [p, S], [h, v]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [l, [p, S], [h, b]], [/(nexus 9)/i], [l, [p, "HTC"], [h, v]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [l, /_/g, " "], [h, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [l, [p, "Acer"], [h, v]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [l, [p, "Meizu"], [h, b]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [l, [p, P], [h, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, l, [h, b]], [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, l, [h, v]], [/(surface duo)/i], [l, [p, A], [h, v]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [l, [p, "Fairphone"], [h, b]], [/(u304aa)/i], [l, [p, "AT&T"], [h, b]], [/\bsie-(\w*)/i], [l, [p, "Siemens"], [h, b]], [/\b(rct\w+) b/i], [l, [p, "RCA"], [h, v]], [/\b(venue[\d ]{2,7}) b/i], [l, [p, "Dell"], [h, v]], [/\b(q(?:mv|ta)\w+) b/i], [l, [p, "Verizon"], [h, v]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [l, [p, "Barnes & Noble"], [h, v]], [/\b(tm\d{3}\w+) b/i], [l, [p, "NuVision"], [h, v]], [/\b(k88) b/i], [l, [p, "ZTE"], [h, v]], [/\b(nx\d{3}j) b/i], [l, [p, "ZTE"], [h, b]], [/\b(gen\d{3}) b.+49h/i], [l, [p, "Swiss"], [h, b]], [/\b(zur\d{3}) b/i], [l, [p, "Swiss"], [h, v]], [/\b((zeki)?tb.*\b) b/i], [l, [p, "Zeki"], [h, v]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], l, [h, v]], [/\b(ns-?\w{0,9}) b/i], [l, [p, "Insignia"], [h, v]], [/\b((nxa|next)-?\w{0,9}) b/i], [l, [p, "NextBook"], [h, v]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], l, [h, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], l, [h, b]], [/\b(ph-1) /i], [l, [p, "Essential"], [h, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [l, [p, "Envizen"], [h, v]], [/\b(trio[-\w\. ]+) b/i], [l, [p, "MachSpeed"], [h, v]], [/\btu_(1491) b/i], [l, [p, "Rotor"], [h, v]], [/(shield[\w ]+) b/i], [l, [p, "Nvidia"], [h, v]], [/(sprint) (\w+)/i], [p, l, [h, b]], [/(kin\.[onetw]{3})/i], [[l, /\./g, " "], [p, A], [h, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [l, [p, U], [h, v]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [l, [p, U], [h, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, l, [h, m]], [/droid.+; (shield) bui/i], [l, [p, "Nvidia"], [h, m]], [/(playstation [345portablevi]+)/i], [l, [p, L], [h, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [l, [p, A], [h, m]], [/smart-tv.+(samsung)/i], [p, [h, _]], [/hbbtv.+maple;(\d+)/i], [[l, /^/, "SmartTV"], [p, N], [h, _]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, F], [h, _]], [/(apple) ?tv/i], [p, [l, "Apple TV"], [h, _]], [/crkey/i], [[l, "Chromecast"], [p, I], [h, _]], [/droid.+aft(\w)( bui|\))/i], [l, [p, E], [h, _]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [l, [p, P], [h, _]], [/(bravia[\w ]+)( bui|\))/i], [l, [p, L], [h, _]], [/(mitv-\w{5}) bui/i], [l, [p, M], [h, _]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i], [[p, $], [l, $], [h, _]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, _]], [/((pebble))app/i], [p, l, [h, y]], [/droid.+; (glass) \d/i], [l, [p, I], [h, y]], [/droid.+; (wt63?0{2,3})\)/i], [l, [p, U], [h, y]], [/(quest( 2)?)/i], [l, [p, D], [h, y]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [h, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [l, [h, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [l, [h, v]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, v]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, b]], [/(android[-\w\. ]{0,9});.+buil/i], [l, [p, "Generic"]]],
                engine: [[/windows.+ edge\/([\w\.]+)/i], [g, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [g, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [d, g], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [g, d]],
                os: [[/microsoft (windows) (vista|xp)/i], [d, g], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [g, W, G]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [g, W, G]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[g, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, "Mac OS"], [g, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [g, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, g], [/\(bb(10);/i], [g, [d, k]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [g, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [g, [d, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [g, [d, "webOS"]], [/crkey\/([\d\.]+)/i], [g, [d, "Chromecast"]], [/(cros) [\w]+ ([\w\.]+\w)/i], [[d, "Chromium OS"], g], [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, g], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], g], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [d, g]]
            }
              , z = function(e, t) {
                if (typeof e === c && (t = e,
                e = s),
                !(this instanceof z))
                    return new z(e,t).getResult();
                var n = e || (typeof r !== a && r.navigator && r.navigator.userAgent ? r.navigator.userAgent : "")
                  , i = t ? function(e, t) {
                    var n = {};
                    for (var i in e)
                        t[i] && t[i].length % 2 == 0 ? n[i] = t[i].concat(e[i]) : n[i] = e[i];
                    return n
                }(q, t) : q;
                return this.getBrowser = function() {
                    var e, t = {};
                    return t.name = s,
                    t.version = s,
                    V.call(t, n, i.browser),
                    t.major = typeof (e = t.version) === u ? e.replace(/[^\d\.]/g, "").split(".")[0] : s,
                    t
                }
                ,
                this.getCPU = function() {
                    var e = {};
                    return e.architecture = s,
                    V.call(e, n, i.cpu),
                    e
                }
                ,
                this.getDevice = function() {
                    var e = {};
                    return e.vendor = s,
                    e.model = s,
                    e.type = s,
                    V.call(e, n, i.device),
                    e
                }
                ,
                this.getEngine = function() {
                    var e = {};
                    return e.name = s,
                    e.version = s,
                    V.call(e, n, i.engine),
                    e
                }
                ,
                this.getOS = function() {
                    var e = {};
                    return e.name = s,
                    e.version = s,
                    V.call(e, n, i.os),
                    e
                }
                ,
                this.getResult = function() {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    }
                }
                ,
                this.getUA = function() {
                    return n
                }
                ,
                this.setUA = function(e) {
                    return n = typeof e === u && e.length > 350 ? $(e, 350) : e,
                    this
                }
                ,
                this.setUA(n),
                this
            };
            z.VERSION = "1.0.32",
            z.BROWSER = B([d, g, "major"]),
            z.CPU = B([f]),
            z.DEVICE = B([l, p, h, m, b, _, v, y, w]),
            z.ENGINE = z.OS = B([d, g]),
            typeof t !== a ? (e.exports && (t = e.exports = z),
            t.UAParser = z) : n.amdO ? (i = function() {
                return z
            }
            .call(t, n, t, e)) === s || (e.exports = i) : typeof r !== a && (r.UAParser = z);
            var K = typeof r !== a && (r.jQuery || r.Zepto);
            if (K && !K.ua) {
                var J = new z;
                K.ua = J.getResult(),
                K.ua.get = function() {
                    return J.getUA()
                }
                ,
                K.ua.set = function(e) {
                    J.setUA(e);
                    var t = J.getResult();
                    for (var n in t)
                        K.ua[n] = t[n]
                }
            }
        }("object" == typeof self ? self : this)
    }
}
  , t = {};
function n(i) {
    var r = t[i];
    if (void 0 !== r)
        return r.exports;
    var s = t[i] = {
        id: i,
        exports: {}
    };
    return e[i].call(s.exports, s, s.exports, n),
    s.exports
}
n.amdO = {},
(()=>{
    function e(e) {
        const t = [];
        let n;
        for (; !(n = e.next()).done; )
            t.push(n.value);
        return t
    }
    function t(e, t) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    function i(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
    }
    const r = function() {
        const e = Object.prototype.toString;
        return "[object Arguments]" === e.call(arguments) ? function(t) {
            return "[object Arguments]" === e.call(t)
        }
        : function(e) {
            return t("callee", e)
        }
    }()
      , s = function() {
        const e = !{
            toString: null
        }.propertyIsEnumerable("toString")
          , n = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"]
          , i = function() {
            return arguments.propertyIsEnumerable("length")
        }()
          , s = function(e, t) {
            for (var n = 0; n < e.length; ) {
                if (e[n] === t)
                    return !0;
                n += 1
            }
            return !1
        };
        return "function" != typeof Object.keys || i ? function(o) {
            if (Object(o) !== o)
                return [];
            let a, c;
            const u = []
              , l = i && r(o);
            for (a in o)
                !t(a, o) || l && "length" === a || (u[u.length] = a);
            if (e)
                for (c = n.length - 1; c >= 0; )
                    a = n[c],
                    t(a, o) && !s(u, a) && (u[u.length] = a),
                    c -= 1;
            return u
        }
        : function(e) {
            return Object(e) !== e ? [] : Object.keys(e)
        }
    }();
    function o(e) {
        return null === e ? "Null" : void 0 === e ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1)
    }
    function a(n, r, c=[], u=[]) {
        if (i(n, r))
            return !0;
        if (o(n) !== o(r))
            return !1;
        if (null == n || null == r)
            return !1;
        if ("function" == typeof n.equals || "function" == typeof r.equals)
            return "function" == typeof n.equals && n.equals(r) && "function" == typeof r.equals && r.equals(n);
        switch (o(n)) {
        case "Arguments":
        case "Array":
        case "Object":
            if (null != (l = n) && "function" == typeof l.then)
                return n === r;
            break;
        case "Boolean":
        case "Number":
        case "String":
            if (typeof n != typeof r || !i(n.valueOf(), r.valueOf()))
                return !1;
            break;
        case "Date":
            if (!i(n.valueOf(), r.valueOf()))
                return !1;
            break;
        case "Error":
            return n.name === r.name && n.message === r.message;
        case "RegExp":
            if (n.source !== r.source || n.global !== r.global || n.ignoreCase !== r.ignoreCase || n.multiline !== r.multiline || n.sticky !== r.sticky || n.unicode !== r.unicode)
                return !1;
            break;
        case "Map":
        case "Set":
            if (!a(e(n.entries()), e(r.entries()), c, u))
                return !1;
            break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "ArrayBuffer":
            break;
        default:
            return !1
        }
        var l;
        const d = s(n);
        if (d.length !== s(r).length)
            return !1;
        let h = c.length - 1;
        for (; h >= 0; ) {
            if (c[h] === n)
                return u[h] === r;
            h -= 1
        }
        for (c.push(n),
        u.push(r),
        h = d.length - 1; h >= 0; ) {
            const e = d[h];
            if (!t(e, r) || !a(r[e], n[e], c, u))
                return !1;
            h -= 1
        }
        return c.pop(),
        u.pop(),
        !0
    }
    function c(e, t) {
        return new Promise(((n,i)=>{
            setTimeout((()=>{
                void 0 !== t ? i(t) : n()
            }
            ), e)
        }
        ))
    }
    function u() {
        let e, t;
        return {
            promise: new Promise(((n,i)=>{
                e = n,
                t = i
            }
            )),
            resolve: e,
            reject: t
        }
    }
    function l(e) {
        return new Promise(((t,n)=>{
            e.then(n, t)
        }
        ))
    }
    class d extends Error {
    }
    function h(e) {
        return new Promise(((t,n)=>setTimeout((()=>n(new d("Promise timed out."))), e)))
    }
    const p = a;
    function g(e, t) {
        return e.some((e=>e === t)) ? t : void 0
    }
    class f extends Error {
        constructor(e) {
            super(`Matching not exhaustive: unexpected value ${JSON.stringify(e)}`)
        }
    }
    function m(e) {
        throw new f(e)
    }
    function b(e) {
        if ("string" == typeof e) {
            const t = parseInt(e, 10);
            return isNaN(t) ? void 0 : t
        }
        return "number" == typeof e ? e : void 0
    }
    function v(e, t) {
        try {
            return e()
        } catch (e) {
            return t(e)
        }
    }
    function _() {}
    function y(e) {
        return null != e
    }
    function w(e) {
        let t, n = !1;
        return (...i)=>(n || (n = !0,
        t = e(...i)),
        t)
    }
    function E(e, t, n) {
        const i = new Set;
        let r;
        return (...s)=>{
            const o = t(...s);
            return i.has(o) || (i.add(o),
            r = e(...s)),
            null == n || n(...s),
            r
        }
    }
    function x(e, t) {
        let n, i, r = !0;
        function s(e, n) {
            return r && (r = !1,
            i = u(),
            setTimeout((()=>{
                try {
                    i.resolve(t(...n))
                } catch (e) {
                    i.reject(e)
                } finally {
                    r = !0
                }
            }
            ), e)),
            i.promise
        }
        return (...t)=>{
            const i = n;
            return n = Date.now(),
            s(void 0 === i || n - i >= e ? 0 : e - (n - i), t)
        }
    }
    async function S(e, t, n) {
        const i = n();
        if (!(e > 0))
            return i;
        try {
            return await i
        } catch (i) {
            return await c(t),
            S(e - 1, t, n)
        }
    }
    var k;
    !function(e) {
        function t() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }
        e.create = function() {
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        }
    }(k || (k = {}));
    void 0 !== self.requestIdleCallback && self.requestIdleCallback;
    class R extends Error {
        constructor(e) {
            super(`Assertion failed: ${e ? "string" == typeof e ? e : e() : "(unnamed)"}`)
        }
    }
    function I(e, t) {
        if (!e)
            throw new R(t)
    }
    function T(e, t) {
        if (null == e)
            throw new R((()=>t ? `Expected ${t} to be non-null` : "Expected non-null"));
        return e
    }
    var F, A, C, O, N, P, L, M, U;
    function D(e, t) {
        return e.filter((e=>!!e)).join(t)
    }
    !function(e) {
        const t = {
            chromiumWebExtension: "chromeExt",
            firefoxWebExtension: "firefoxExt",
            safariAppExtension: "safariExt",
            safariWebExtension: "safariWebExt",
            safariIOSWebExtension: "safariIOSExt"
        };
        function n(e, n, i) {
            return "retail" === i && "safariIOSWebExtension" === n ? "safariIOSExt-retail" : "edge" === e ? "chromiumEdgeExt" : t[n]
        }
        e.getAppName = n,
        e.create = function(e, t, i, r) {
            return {
                appName: T(n(e, t, i), "gnar app name"),
                url: `https://gnar.${r}`,
                domain: `.${r}`,
                sendEmailInfoTracking: !0,
                sendFluidExperimentData: !1
            }
        }
    }(F || (F = {})),
    function(e) {
        const t = {
            chromiumWebExtension: "extensionChrome",
            firefoxWebExtension: "extensionFirefox",
            safariAppExtension: "extensionSafari",
            safariWebExtension: "extensionSafariWeb",
            safariIOSWebExtension: "extensionSafariIOS"
        };
        e.create = function(e, n, i, r) {
            let s;
            return s = "retail" === i && "safariIOSWebExtension" === n ? "extensionSafariIOS-retail" : "edge" === e ? "extensionEdge" : T(t[n], "felog app name"),
            {
                appName: s,
                sendUsageMetrics: !0,
                sendPerfMetricsType: "dev" === r ? "local" : "off"
            }
        }
    }(A || (A = {})),
    function(e) {
        const t = {
            chromiumWebExtension: "extension_chrome",
            firefoxWebExtension: "extension_firefox",
            safariAppExtension: "extension_safari",
            safariWebExtension: "extension_safari_web",
            safariIOSWebExtension: "extension_safari_ios"
        }
          , n = {
            regular: "inline",
            retail: "retail_demo"
        };
        e.create = (e,i,r)=>({
            clientType: "edge" === e ? "extension_chromium_edge" : T(t[i], "capi client type"),
            clientSubType: T(n[r], "capi client subType")
        })
    }(C || (C = {})),
    function(e) {
        e.create = function(e) {
            return {
                urls: {
                    fetchMessages: `${e}/api/v1/messages`,
                    acknowledgeMessage: `${e}/api/v1/messages/acknowledge`,
                    dismissMessage: `${e}/api/v1/messages/dismiss`
                }
            }
        }
    }(O || (O = {})),
    function(e) {
        e.create = function(e) {
            return {
                urls: {
                    getInAppMessages: `${e}/api/inApp/getMessages`,
                    track: `${e}/api/events/track`,
                    trackInAppOpen: `${e}/api/events/trackInAppOpen`,
                    trackInAppClose: `${e}/api/events/trackInAppClose`,
                    trackInAppConsume: `${e}/api/events/inAppConsume`,
                    trackInAppClick: `${e}/api/events/trackInAppClick`,
                    userUpdate: `${e}/api/users/update`
                }
            }
        }
    }(N || (N = {})),
    function(e) {
        e.create = function(e) {
            return {
                urls: {
                    getJWTToken: `${e}/token`
                }
            }
        }
    }(P || (P = {})),
    function(e) {
        const t = {
            chromiumWebExtension: "chromeExt",
            firefoxWebExtension: "firefoxExt",
            safariAppExtension: "safariExt",
            safariWebExtension: "safariWebExt",
            safariIOSWebExtension: "safariIOSExt"
        };
        e.create = function(e, n) {
            return {
                xClientType: "edge" === e ? "chromiumEdgeExt" : t[n]
            }
        }
    }(L || (L = {})),
    function(e) {
        let t;
        var n;
        n = t = e.GrStaticUrl || (e.GrStaticUrl = {}),
        n.toGrStaticUrl = e=>"https://assets.extension.grammarly.com/" + e
    }(M || (M = {})),
    function(e) {
        e.create = function(t, n, i, r, s) {
            const o = "safari" === t ? "disableAppsPromotion=true" : "";
            function a(e) {
                const t = `https://${e}.${n}`;
                return (e="",n="")=>{
                    const i = D([o, n], "&");
                    return D([t + e, i], "?")
                }
            }
            const c = a("www")
              , u = a("app")
              , l = a("account")
              , d = a("redirect")
              , h = e.GrStaticUrl.toGrStaticUrl
              , p = `https://data.${n}`
              , g = `https://auth.${n}/v3`
              , f = `https://auth.${n}/v4`
              , m = `https://capi.${n}/api/configuration/cheetah/v1/settings`
              , b = `https://capi.${n}`
              , v = `wss://capi.${n}/freews`;
            return {
                accountSubscription: l("/subscription"),
                accountSubscriptionAddBillingInfo: l("/admin/subscription", "popup=add_billing_info"),
                adminAccountSubscription: l("/admin/subscription"),
                accountAdminSubscriptionAddBillingInfoToUngatedTrial: l("/admin/subscription", "popup=ungated_trial"),
                app: u(),
                appPersonalDictionary: l("/customize"),
                featuresSettings: l("/customize/features"),
                capi: v,
                capiStatic: v,
                capiGDocs: `wss://capi.${n}/gdocs`,
                dapi: p,
                cheetahSettings: m,
                editorDictionary: u("/profile/dictionary"),
                desktop: c("/desktop"),
                dictionary: `https://capi.${n}/api/defs`,
                docs: u("/docs"),
                docsApi: `https://dox.${n}/documents`,
                newDoc: u("/docs/new"),
                tokens: `${f}/api`,
                auth: g,
                userOrAnonymous: `${g}/user/oranonymous`,
                userOrAnonymousV4: `${f}/api/userinfo`,
                signin: c("/signin"),
                signup: c("/signup"),
                dialect: `${b}/api/configuration/language/v1/settings`,
                fbSignin: c("/signin", "fromExtensionFb=true"),
                fbSignup: c("/signup", "fromExtensionFb=true"),
                googleSignin: c("/signin", "fromExtensionGoogle=true"),
                googleSignup: c("/signup", "fromExtensionGoogle=true"),
                resetPassword: c("/resetpassword"),
                newFelog: i,
                sumoLogic: r,
                vmetrics: s,
                welcomeC: c("/extension-success"),
                afterInstall: c("/after_install_page/"),
                planComparison: c("/plans"),
                businessHomepage: c("/business"),
                businessPricing: c("/business/pricing"),
                businessStyleGuide: c("/business/styleguide"),
                businessBrandTones: c("/business/brand-tones"),
                uninstall: c("/extension-uninstall"),
                terms: c("/terms"),
                policy: c("/privacy-policy"),
                californiaPolicy: c("/privacy-policy#for-california-users"),
                extensionSuccess: c("/extension-success"),
                firefoxPrivatePolicy: "https://addons.mozilla.org/en-US/firefox/addon/grammarly-1/privacy/",
                dynamicConfigUrl: "https://config.extension.grammarly.com/dynamicConfig.json",
                pageConfigUrl: "https://config.extension.grammarly.com/browserplugin/config.json",
                grammarlyDomain: n,
                grammarlyProtocol: "https:",
                redirect: d("/redirect"),
                snippetsApi: `https://goldengate.${n}/snippets/v1/snippets`,
                snippetsNew: l("/admin/snippets", "action=create"),
                snippetsAdmin: l("/admin/snippets"),
                snippetsSettings: l("/customize/snippets"),
                knowledgeHubApi: `https://goldengate.${n}/knowledge-hub/v1/institution`,
                clientControlsApi: `https://goldengate.${n}/client-controls`,
                suggestionsSettings: l("/customize/suggestions"),
                allSettings: l(),
                styleGuideSettings: l("/admin/style-guide"),
                writingStyleSettings: l("/admin/style-guide-writing-style"),
                brandTones: l("/admin/brand-tones"),
                grammarlyIdeasSelf: u("/ideas/grow/self"),
                grammarlyIdeasPeer: u("/ideas/grow/peer"),
                grammarlyIdeasSales: u("/ideas/sales"),
                iOSApp: "grammarly://home",
                iOSUpgrade: "grammarly://premium-instructions?deepLinkSource=safari",
                standWithUkraine: c("/stand-with-ukraine"),
                standWithUkraineBlockedUserPing: "https://rwsgfy.grammarly.com/stand-with-ukraine",
                tourGdocs: c("/tour-gdocs"),
                assets: {
                    assistantOnboardingTourGif: h("assets/assistant/assistant-onboarding-tour"),
                    ownerActivationIPMHeader: h("assets/ipm/owner-activation-ipm-header"),
                    graduationIpmSvg: h("assets/ipm/graduation-campaign-ipm"),
                    writingProgressIpmGif: h("assets/ipm/writing-progress-ipm-header"),
                    onboardingTour: {
                        inlineSuggestionsPreviewImage: h("assets/onboarding/inline-suggestions-preview-image-v2.jpg"),
                        inlineSuggestionsAnimation: h("assets/onboarding/inline-suggestions-v2.mp4"),
                        clickToAcceptAnimation: h("assets/onboarding/click-to-accept-v2.mp4"),
                        happyWritingAnimation: h("assets/onboarding/happy-writing-v2.mp4")
                    },
                    knowledgeShareOnboardingTour: {
                        step1: h("assets/knowledgeShareOnboarding/ks-onboarding-step1.mp4"),
                        step2: h("assets/knowledgeShareOnboarding/ks-onboarding-step2.mp4"),
                        step3: h("assets/knowledgeShareOnboarding/ks-onboarding-step3.mp4")
                    }
                },
                support: `https://support.${n}/hc/en-us/requests/new#/`,
                grammarlyEmployeesBugReportsUrl: "https://in-product.report.grammarly.io/v1/report"
            }
        }
    }(M || (M = {})),
    function(e) {
        const t = "grammarly.com"
          , n = "qagr.io"
          , i = "ppgr.io";
        e.create = function(e, r, s, o) {
            const a = (e,t,n,i,r)=>"prod" === o ? e : "qa" === o ? t : "dev-qa" === o ? n : "dev-preprod" === o ? i : "dev" === o ? r : void m(o)
              , c = "https://127.0.0.1:8000"
              , u = a("https://f-log-extension.grammarly.io", c, c, c, c)
              , l = a("https://endpoint2.collection.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV1OF-4ic11yqpre0casnyvs_ZoaCHciEYdRyBkrfwP6DMlsWt8tSVU76RPqgGvAGjXGQk_UNuxPx-pYbToJapM_Fr0CUcgKaA8_IVl-lhSr5Q==", c, c, c, c)
              , d = a("https://extension.femetrics.grammarly.io/batch/import", "https://femetrics.qagr.io/batch/import", "https://femetrics.qagr.io/batch/import", "https://femetrics.ppgr.io/batch/import", "https://femetrics.qagr.io/batch/import")
              , h = a(t, n, n, i, n)
              , p = a(t, n, n, i, t)
              , g = a("https://chipmunk.grammarly.com", "https://chipmunk.qagr.io", "https://chipmunk.qagr.io", "https://chipmunk.ppgr.io", "https://chipmunk.grammarly.com");
            return {
                url: M.create(e, p, u, l, d),
                gnar: F.create(e, r, s, h),
                felog: A.create(e, r, s, o),
                capi: C.create(e, r, s),
                chipmunk: O.create("https://chipmunk.grammarly.com"),
                iterable: N.create("https://api.iterable.com"),
                mise: P.create(g),
                auth: L.create(e, r),
                extensionId: "87677a2c52b84ad3a151a4a72f5bd3c4"
            }
        }
    }(U || (U = {}));
    const B = v((()=>browser), (()=>self.browser))
      , j = v((()=>browser), (()=>self.browser));
    self.chrome = self.chrome;
    var H, $, V, W, G, q;
    !function(e) {
        e.create = function(e, t, n, i, r, s, o, a) {
            const c = void 0 !== s && void 0 !== o ? s : "UNVERSIONED"
              , u = `${e}.${t}.${n}`;
            return {
                version: u,
                fullVersion: `${u}-${[i, ["prod" !== r ? r : null, c !== i ? c : null].filter((e=>!!e)).join(".")].filter((e=>"" !== e)).join("/")}`,
                commitHash: o,
                gitBranch: s,
                manifestVersion: a
            }
        }
        ,
        e.getManifestVersion = function(e, t, n) {
            switch (e) {
            case "safariAppExtension":
                switch (t) {
                case "bg":
                case "popup":
                    return n.safari.extension.displayVersion;
                default:
                    return
                }
            case "chromiumWebExtension":
                return n.chrome.runtime.getManifest().version;
            case "firefoxWebExtension":
                return B.runtime.getManifest().version;
            case "safariWebExtension":
            case "safariIOSWebExtension":
                return j.runtime.getManifest().version;
            default:
                return m(e)
            }
        }
    }(H || (H = {})),
    function(e) {
        e.create = function(e) {
            return g(["chrome", "safari", "firefox", "edge"], e)
        }
        ,
        e.isValidTargetBrowser = function(e) {
            return ["chrome", "safari", "firefox", "edge"].includes(e)
        }
    }($ || ($ = {})),
    function(e) {
        e.create = function(e) {
            return g(["dev", "prod", "qa", "dev-qa", "dev-preprod"], e)
        }
    }(V || (V = {})),
    function(e) {
        e.create = function(e) {
            return g(["regular", "retail"], e)
        }
    }(W || (W = {})),
    function(e) {
        e.create = function(e) {
            return g(["chromiumWebExtension", "firefoxWebExtension", "safariAppExtension", "safariWebExtension", "safariIOSWebExtension"], e)
        }
    }(G || (G = {})),
    function(e) {
        e.create = function(e, t, n, i, r) {
            return {
                browser: e,
                extensionType: t,
                deploymentType: n,
                env: i,
                context: r
            }
        }
    }(q || (q = {}));
    var z = n(82989);
    const K = e=>e.split(".")[0]
      , J = (e=self)=>{
        const t = e.navigator.userAgent
          , n = new z.UAParser(t).getResult();
        return {
            browserName: n.browser.name || "unknown",
            browserVersion: n.browser.version ? K(n.browser.version) : void 0,
            osName: n.os.name || "unknown",
            osVersion: n.os.version ? K(n.os.version) : void 0,
            userAgent: t
        }
    }
    ;
    var Y, X, Z, Q, ee;
    !function(e) {
        e.create = function(e) {
            const t = J(e);
            return {
                name: t.browserName || "other",
                version: t.browserVersion
            }
        }
    }(Y || (Y = {})),
    function(e) {
        e.create = function(e) {
            const t = J(e);
            return {
                name: t.osName,
                version: t.osVersion,
                isWindows: -1 !== e.navigator.userAgent.indexOf("Win"),
                isMac: -1 !== e.navigator.userAgent.indexOf("Mac"),
                isChromeOS: -1 !== e.navigator.userAgent.indexOf("CrOS")
            }
        }
    }(X || (X = {})),
    function(e) {
        e.create = function(e) {
            return {
                browser: Y.create(e),
                os: X.create(e)
            }
        }
    }(Z || (Z = {})),
    function(e) {
        function t(e, t, n, i, r, s, o) {
            return {
                env: e,
                major_number: t,
                build_number: n,
                release_number: i,
                git_branch: r,
                git_commit: s,
                manifest_version: o
            }
        }
        e.create = t,
        e.fromBrowserify = function() {
            return t("prod", "14", "1167", "0", "UNVERSIONED", "UNVERSIONED", "3")
        }
    }(Q || (Q = {})),
    function(e) {
        e.getTargetEnv = function(e) {
            if (!e.env)
                throw new Error("processEnv.env is null or undefined");
            const t = V.create(e.env);
            if (!t)
                throw new Error(`Invalid processEnv.env: ${e.env}`);
            return t
        }
        ,
        e.create = function(e, t, n, i, r, s) {
            const o = [r.major_number, r.build_number, r.release_number].map(b);
            let a;
            if (3 === o.length && o.every((e=>void 0 !== e)))
                a = o;
            else {
                let e;
                try {
                    e = H.getManifestVersion(t, i, self)
                } catch (e) {}
                const n = (e || "").split(".").map(b);
                a = 3 === n.length && n.every((e=>void 0 !== e)) ? n : [0, 0, 0]
            }
            const [c,u,l] = a;
            return {
                buildInfo: H.create(c, u, l, e, s, r.git_branch, r.git_commit, r.manifest_version),
                bundleInfo: q.create(e, t, n, s, i),
                appConfig: U.create(e, t, n, s),
                systemInfo: Z.create(self)
            }
        }
    }(ee || (ee = {}));
    const te = new class {
        constructor(e) {
            this._getFallbackValue = e
        }
        init(e) {
            if (void 0 !== this._value)
                throw new Error("Global value already initialized.");
            this._value = e
        }
        get() {
            if (void 0 === this._value) {
                if (void 0 === this._getFallbackValue)
                    throw new Error("Global value not initialized and no fallback value provided.");
                this._value = this._getFallbackValue()
            }
            return this._value
        }
    }
    ((()=>{
        throw new Error("Global config not initialized")
    }
    ));
    let ne = ()=>te.get();
    function ie() {
        return ne()
    }
    function re() {
        return ie().appConfig.extensionId
    }
    function se() {
        return "edge" === ie().bundleInfo.browser
    }
    function oe() {
        return ie().bundleInfo.browser
    }
    function ae() {
        return ie().bundleInfo.env
    }
    function ce() {
        try {
            return self.parent !== self
        } catch (e) {
            return !0
        }
    }
    class ue {
        constructor(e) {
            if (this.capacity = e,
            this._start = 0,
            this._end = 0,
            this._isFull = !1,
            e <= 0)
                throw new Error("Invalid capacity " + e);
            this._buffer = new Array(e)
        }
        get size() {
            return this._isFull ? this._buffer.length : (this._end - this._start + this._buffer.length) % this._buffer.length
        }
        get isEmpty() {
            return 0 === this.size
        }
        get isFull() {
            return this._isFull
        }
        get head() {
            return this.isEmpty ? null : this._buffer[this._start]
        }
        get tail() {
            return this.isEmpty ? null : this._buffer[0 === this._end ? this.capacity - 1 : this._end - 1]
        }
        enqueue(e) {
            let t = null;
            return this.isFull && (t = this._buffer[this._start],
            this._startInc()),
            this._buffer[this._end] = e,
            this._endInc(),
            this._start === this._end && (this._isFull = !0),
            t
        }
        dequeue() {
            if (this.isEmpty)
                return null;
            const e = this._buffer[this._start];
            return this._buffer[this._start] = null,
            this._startInc(),
            this._isFull = !1,
            e
        }
        delete(e) {
            const t = this._buffer.indexOf(e);
            if (t >= 0) {
                if (t < this._end) {
                    for (let e = t; e < this._end - 1; e++)
                        this._buffer[e] = this._buffer[e + 1];
                    this._buffer[--this._end] = null
                } else {
                    for (let e = this._start; e < t; e++)
                        this._buffer[e + 1] = this._buffer[e];
                    this._buffer[this._start] = null,
                    this._startInc()
                }
                return this._isFull = !1,
                !0
            }
            return !1
        }
        _startInc() {
            this._start++,
            this._start === this.capacity && (this._start = 0)
        }
        _endInc() {
            this._end++,
            this._end === this.capacity && (this._end = 0)
        }
        clear() {
            this._buffer = new Array(this.capacity),
            this._start = this._end = 0,
            this._isFull = !1
        }
        toArray() {
            let e;
            if (this.isEmpty)
                e = [];
            else if (this._start < this._end)
                e = this._buffer.slice(this._start, this._end);
            else {
                e = new Array(this.size);
                let t = 0;
                for (let n = this._start; n < this.capacity; ++n,
                ++t)
                    e[t] = this._buffer[n];
                for (let n = 0; n < this._end; ++n,
                ++t)
                    e[t] = this._buffer[n]
            }
            return e
        }
    }
    function le(e, t) {
        const n = {};
        return Object.keys(t).forEach((i=>{
            e(i, t[i]) && (n[i] = t[i])
        }
        )),
        n
    }
    const de = e=>e === Object(e) && !Array.isArray(e);
    function he(e) {
        return Number.isFinite(e) || e === Number.NEGATIVE_INFINITY || e === Number.POSITIVE_INFINITY
    }
    var pe;
    !function(e) {
        function t(e) {
            return {
                message: e.message,
                stack: e.stack
            }
        }
        function n(e) {
            try {
                return !("string" == typeof JSON.stringify(e))
            } catch (e) {
                return e.message.includes("Converting circular structure to JSON")
            }
        }
        e.normalizeException = t,
        e.isCircularObject = n,
        e.normalizeData = function e(i) {
            try {
                return self.HTMLElement && i instanceof self.HTMLElement ? {
                    type: (r = i).nodeName,
                    html: r.outerHTML,
                    attributes: Array.from(r.attributes).reduce(((e,t)=>({
                        ...e,
                        [t.nodeName]: t.nodeValue
                    })), {})
                } : i instanceof Error ? t(i) : Array.isArray(i) ? i.map((t=>e(t))) : "function" == typeof i ? `${i.name}()` : de(i) ? n(i) ? t(new Error("Couldn't normalize circular data!")) : Object.keys(i).reduce(((t,n)=>({
                    ...t,
                    [n]: e(i[n])
                })), {}) : i
            } catch (e) {
                return jt.create("HistoryLogNormalizer").error("cannot normalize data", e, i),
                t(new Error("Data normalization fail!"))
            }
            var r
        }
    }(pe || (pe = {}));
    const ge = "common";
    function fe(e) {
        return e === ge ? "common." : ""
    }
    class me {
        constructor(e) {
            var t;
            this._historyArgs = e,
            this._historyBuffers = {},
            this.isHistoryEnabled = ()=>{
                var e;
                return Boolean("prod" !== ae() || (null === (e = this._historyArgs.enabledInProd) || void 0 === e ? void 0 : e.get()))
            }
            ,
            this.isAdvancedHistoryEnabled = ()=>{
                var e, t;
                return Boolean("prod" !== ae() || (null === (e = this._historyArgs.enabledInProd) || void 0 === e ? void 0 : e.get()) && (null === (t = this._historyArgs.enableAdvancedInProd) || void 0 === t ? void 0 : t.get()))
            }
            ,
            this.getLogs = ()=>Object.entries(this._historyBuffers).map((([e,t])=>t.toArray().map((t=>({
                ...t,
                data: pe.normalizeData(t.data),
                loggerName: fe(e) + t.loggerName,
                exception: t.exception ? pe.normalizeException(t.exception) : void 0
            }))))).flat(),
            this._updateBackupStorage = ()=>{
                var e;
                null === (e = this._historyArgs.backupStorage) || void 0 === e || e.set(this._getBuffer(null).toArray())
            }
            ,
            this._initCliCommands(),
            this._historyBuffers.common = new ue(null !== (t = this._historyArgs.maxEventsToStore) && void 0 !== t ? t : 1e3)
        }
        _getBuffer(e) {
            return e ? (this._historyBuffers[e.name] || (this._historyBuffers[e.name] = new ue(e.settings.limit)),
            this._historyBuffers[e.name]) : this._historyBuffers.common
        }
        pushLog(e, t) {
            this._getBuffer(e).enqueue(t),
            this._updateBackupStorage()
        }
        _initCliCommands() {
            self.GRIsDebugEnabled = ()=>this.isHistoryEnabled(),
            self.GREnableHistoryLogger = (e=60)=>{
                var t, n;
                null === (n = (t = this._historyArgs).enableHistoryLoggerUntil) || void 0 === n || n.call(t, Date.now() + 60 * e * 1e3)
            }
            ,
            self.GRDisableHistoryLogger = ()=>{
                var e, t;
                null === (t = (e = this._historyArgs).disableHistoryLogger) || void 0 === t || t.call(e)
            }
        }
        static create(e) {
            return e.isBG ? new be(e) : new ve(e)
        }
    }
    class be extends me {
        constructor(e) {
            super(e),
            this._historyArgs = e,
            this._syncInitialStateWithStorage()
        }
        _syncInitialStateWithStorage() {
            var e;
            null === (e = this._historyArgs.backupStorage) || void 0 === e || e.get().then((e=>{
                if (!e)
                    return;
                const t = this._getBuffer(null)
                  , n = t.toArray();
                t.clear(),
                e.forEach((e=>t.enqueue(e))),
                n.forEach((e=>t.enqueue(e))),
                this._updateBackupStorage()
            }
            ))
        }
    }
    class ve extends me {
    }
    var _e;
    !function(e) {
        e.TRACE = "TRACE",
        e.DEBUG = "DEBUG",
        e.INFO = "INFO",
        e.WARN = "WARN",
        e.ERROR = "ERROR",
        e.FATAL = "FATAL"
    }(_e || (_e = {}));
    const ye = {
        [_e.TRACE]: 1,
        [_e.DEBUG]: 2,
        [_e.INFO]: 3,
        [_e.WARN]: 4,
        [_e.ERROR]: 5,
        [_e.FATAL]: 6
    };
    function we(e) {
        return ye[e] || 0
    }
    class Ee {
        constructor(e) {
            this.name = e,
            this._isError = e=>{
                const t = e;
                return t && (void 0 !== t.message && void 0 !== t.name || void 0 !== t.stack)
            }
        }
        trace(e, t, n) {
            this._logMessage(_e.TRACE, e, t, n)
        }
        debug(e, t, n) {
            this._logMessage(_e.DEBUG, e, t, n)
        }
        info(e, t, n) {
            this._logMessage(_e.INFO, e, t, n)
        }
        warn(e, t, n) {
            this._logMessage(_e.WARN, e, t, n)
        }
        error(e, t, n) {
            this._logMessage(_e.ERROR, e, t, n)
        }
        fatal(e, t, n) {
            this._logMessage(_e.FATAL, e, t, n)
        }
        _logMessage(e, t, n, i) {
            const r = {
                level: e,
                loggerName: this.name,
                message: t,
                timestamp: Date.now()
            };
            n && (this._isError(n) ? r.exception = n : r.data = n),
            r.data = r.data || i,
            this.handleEvent(r)
        }
    }
    class xe {
        constructor(e, t) {
            this.name = e,
            this._createLogger = t
        }
        trace(e, t, n) {
            void 0 === this._logger && (this._logger = this._createLogger(this.name)),
            this._logger.trace(e, t, n)
        }
        debug(e, t, n) {
            void 0 === this._logger && (this._logger = this._createLogger(this.name)),
            this._logger.debug(e, t, n)
        }
        info(e, t, n) {
            void 0 === this._logger && (this._logger = this._createLogger(this.name)),
            this._logger.info(e, t, n)
        }
        warn(e, t, n) {
            void 0 === this._logger && (this._logger = this._createLogger(this.name)),
            this._logger.warn(e, t, n)
        }
        error(e, t, n) {
            void 0 === this._logger && (this._logger = this._createLogger(this.name)),
            this._logger.error(e, t, n)
        }
        fatal(e, t, n) {
            void 0 === this._logger && (this._logger = this._createLogger(this.name)),
            this._logger.fatal(e, t, n)
        }
        isHistoryEnabled() {
            return !1
        }
        isAdvancedHistoryEnabled() {
            return !1
        }
    }
    class Se extends Ee {
        constructor(e, t, n, i) {
            var r, s;
            super(e),
            this._config = t,
            this._historyLogsService = n,
            this._loggerSettings = i,
            this._buffer = (null === (r = this._loggerSettings) || void 0 === r ? void 0 : r.historyBufferSettings) ? {
                name: this.name,
                settings: null === (s = this._loggerSettings) || void 0 === s ? void 0 : s.historyBufferSettings
            } : null
        }
        handleEvent(e) {
            var t, n;
            this._config.filterFn(e) && !(null === (t = this._loggerSettings) || void 0 === t ? void 0 : t.skipWriteToConsole) && this._config.writer.write(e),
            this._historyLogsService.isHistoryEnabled() && !(null === (n = this._loggerSettings) || void 0 === n ? void 0 : n.skipWriteToHistoryLogger) && this._historyLogsService.pushLog(this._buffer, e)
        }
        isHistoryEnabled() {
            return this._historyLogsService.isHistoryEnabled()
        }
        isAdvancedHistoryEnabled() {
            return this._historyLogsService.isAdvancedHistoryEnabled()
        }
    }
    function ke(e) {
        return new Proxy({},{
            get(t, n) {
                const i = e[n];
                return i && "function" == typeof i ? i.bind(e) : void 0
            }
        })
    }
    var Re;
    !function(e) {
        e.LEVEL = {
            [_e.TRACE]: "color: white; background: orange;",
            [_e.DEBUG]: "color: black; background: #ffdc00;",
            [_e.INFO]: "color: black; background: #abdcfb",
            [_e.WARN]: "color: white; background: darkorange;",
            [_e.ERROR]: "color: white; background: red;",
            [_e.FATAL]: "color: white; background: darkred;"
        },
        e.GRAMMARLY = "color: black; background: #bada55;";
        const t = new Map;
        function n(e, t) {
            return e + Math.floor(Math.random() * (t - e + 1))
        }
        function i(e) {
            return `color: ${e.isDark ? "white" : "black"}; background: rgb(${e.red}, ${e.green}, ${e.blue})`
        }
        e.getLoggerName = function(e) {
            const r = t.get(e);
            if (r)
                return i(r);
            const s = n(0, 255)
              , o = n(0, 255)
              , a = n(0, 255)
              , c = {
                red: s,
                green: o,
                blue: a,
                isDark: Math.sqrt(s * s * .299 + o * o * .587 + a * a * .114) < 127.5
            };
            return t.set(e, c),
            i(c)
        }
        ,
        e.RESET_DEFAULT = "color: reset;",
        e.RESET_DEBUG = `color: ${self.matchMedia && self.matchMedia("(prefers-color-scheme: dark)").matches ? "white" : "black"};`,
        e.getReset = function(t) {
            return t !== _e.TRACE && t !== _e.DEBUG ? e.RESET_DEFAULT : t === _e.TRACE || t === _e.DEBUG ? e.RESET_DEBUG : e.RESET_DEFAULT
        }
        ,
        e.outputLog = function(e) {
            return [`grm ${e.level} [${e.loggerName}] ░░ ${e.message}`]
        }
    }(Re || (Re = {}));
    class Ie {
        constructor() {
            this._writeFunc = Ie._commonWriteFunc
        }
        shouldWriteLog(e) {
            const t = we(e);
            return !!(t && 1 <= t)
        }
        write(e) {
            try {
                const t = Re.outputLog(e);
                e.data && t.push(e.data),
                e.exception && t.push(e.exception),
                this.shouldWriteLog(e.level) && this._writeFunc[e.level].apply(null, t)
            } catch (e) {}
        }
    }
    Ie._commonWriteFunc = function() {
        const {debug: e, info: t, warn: n, error: i} = ke(console);
        return {
            [_e.TRACE]: e,
            [_e.DEBUG]: e,
            [_e.INFO]: t,
            [_e.WARN]: n,
            [_e.ERROR]: i,
            [_e.FATAL]: i
        }
    }();
    var Te = function(e, t) {
        return Te = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        ,
        Te(e, t)
    };
    function Fe(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function n() {
            this.constructor = e
        }
        Te(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    Object.create;
    Object.create;
    function Ae(e) {
        return "function" == typeof e
    }
    var Ce = !1
      , Oe = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(e) {
            e && (new Error).stack;
            Ce = e
        },
        get useDeprecatedSynchronousErrorHandling() {
            return Ce
        }
    };
    function Ne(e) {
        setTimeout((function() {
            throw e
        }
        ), 0)
    }
    var Pe = {
        closed: !0,
        next: function(e) {},
        error: function(e) {
            if (Oe.useDeprecatedSynchronousErrorHandling)
                throw e;
            Ne(e)
        },
        complete: function() {}
    }
      , Le = function() {
        return Array.isArray || function(e) {
            return e && "number" == typeof e.length
        }
    }();
    function Me(e) {
        return null !== e && "object" == typeof e
    }
    var Ue = function() {
        function e(e) {
            return Error.call(this),
            this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map((function(e, t) {
                return t + 1 + ") " + e.toString()
            }
            )).join("\n  ") : "",
            this.name = "UnsubscriptionError",
            this.errors = e,
            this
        }
        return e.prototype = Object.create(Error.prototype),
        e
    }()
      , De = function() {
        function e(e) {
            this.closed = !1,
            this._parentOrParents = null,
            this._subscriptions = null,
            e && (this._ctorUnsubscribe = !0,
            this._unsubscribe = e)
        }
        return e.prototype.unsubscribe = function() {
            var t;
            if (!this.closed) {
                var n = this
                  , i = n._parentOrParents
                  , r = n._ctorUnsubscribe
                  , s = n._unsubscribe
                  , o = n._subscriptions;
                if (this.closed = !0,
                this._parentOrParents = null,
                this._subscriptions = null,
                i instanceof e)
                    i.remove(this);
                else if (null !== i)
                    for (var a = 0; a < i.length; ++a) {
                        i[a].remove(this)
                    }
                if (Ae(s)) {
                    r && (this._unsubscribe = void 0);
                    try {
                        s.call(this)
                    } catch (e) {
                        t = e instanceof Ue ? Be(e.errors) : [e]
                    }
                }
                if (Le(o)) {
                    a = -1;
                    for (var c = o.length; ++a < c; ) {
                        var u = o[a];
                        if (Me(u))
                            try {
                                u.unsubscribe()
                            } catch (e) {
                                t = t || [],
                                e instanceof Ue ? t = t.concat(Be(e.errors)) : t.push(e)
                            }
                    }
                }
                if (t)
                    throw new Ue(t)
            }
        }
        ,
        e.prototype.add = function(t) {
            var n = t;
            if (!t)
                return e.EMPTY;
            switch (typeof t) {
            case "function":
                n = new e(t);
            case "object":
                if (n === this || n.closed || "function" != typeof n.unsubscribe)
                    return n;
                if (this.closed)
                    return n.unsubscribe(),
                    n;
                if (!(n instanceof e)) {
                    var i = n;
                    (n = new e)._subscriptions = [i]
                }
                break;
            default:
                throw new Error("unrecognized teardown " + t + " added to Subscription.")
            }
            var r = n._parentOrParents;
            if (null === r)
                n._parentOrParents = this;
            else if (r instanceof e) {
                if (r === this)
                    return n;
                n._parentOrParents = [r, this]
            } else {
                if (-1 !== r.indexOf(this))
                    return n;
                r.push(this)
            }
            var s = this._subscriptions;
            return null === s ? this._subscriptions = [n] : s.push(n),
            n
        }
        ,
        e.prototype.remove = function(e) {
            var t = this._subscriptions;
            if (t) {
                var n = t.indexOf(e);
                -1 !== n && t.splice(n, 1)
            }
        }
        ,
        e.EMPTY = function(e) {
            return e.closed = !0,
            e
        }(new e),
        e
    }();
    function Be(e) {
        return e.reduce((function(e, t) {
            return e.concat(t instanceof Ue ? t.errors : t)
        }
        ), [])
    }
    var je = function() {
        return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random()
    }()
      , He = function(e) {
        function t(n, i, r) {
            var s = e.call(this) || this;
            switch (s.syncErrorValue = null,
            s.syncErrorThrown = !1,
            s.syncErrorThrowable = !1,
            s.isStopped = !1,
            arguments.length) {
            case 0:
                s.destination = Pe;
                break;
            case 1:
                if (!n) {
                    s.destination = Pe;
                    break
                }
                if ("object" == typeof n) {
                    n instanceof t ? (s.syncErrorThrowable = n.syncErrorThrowable,
                    s.destination = n,
                    n.add(s)) : (s.syncErrorThrowable = !0,
                    s.destination = new $e(s,n));
                    break
                }
            default:
                s.syncErrorThrowable = !0,
                s.destination = new $e(s,n,i,r)
            }
            return s
        }
        return Fe(t, e),
        t.prototype[je] = function() {
            return this
        }
        ,
        t.create = function(e, n, i) {
            var r = new t(e,n,i);
            return r.syncErrorThrowable = !1,
            r
        }
        ,
        t.prototype.next = function(e) {
            this.isStopped || this._next(e)
        }
        ,
        t.prototype.error = function(e) {
            this.isStopped || (this.isStopped = !0,
            this._error(e))
        }
        ,
        t.prototype.complete = function() {
            this.isStopped || (this.isStopped = !0,
            this._complete())
        }
        ,
        t.prototype.unsubscribe = function() {
            this.closed || (this.isStopped = !0,
            e.prototype.unsubscribe.call(this))
        }
        ,
        t.prototype._next = function(e) {
            this.destination.next(e)
        }
        ,
        t.prototype._error = function(e) {
            this.destination.error(e),
            this.unsubscribe()
        }
        ,
        t.prototype._complete = function() {
            this.destination.complete(),
            this.unsubscribe()
        }
        ,
        t.prototype._unsubscribeAndRecycle = function() {
            var e = this._parentOrParents;
            return this._parentOrParents = null,
            this.unsubscribe(),
            this.closed = !1,
            this.isStopped = !1,
            this._parentOrParents = e,
            this
        }
        ,
        t
    }(De)
      , $e = function(e) {
        function t(t, n, i, r) {
            var s, o = e.call(this) || this;
            o._parentSubscriber = t;
            var a = o;
            return Ae(n) ? s = n : n && (s = n.next,
            i = n.error,
            r = n.complete,
            n !== Pe && (Ae((a = Object.create(n)).unsubscribe) && o.add(a.unsubscribe.bind(a)),
            a.unsubscribe = o.unsubscribe.bind(o))),
            o._context = a,
            o._next = s,
            o._error = i,
            o._complete = r,
            o
        }
        return Fe(t, e),
        t.prototype.next = function(e) {
            if (!this.isStopped && this._next) {
                var t = this._parentSubscriber;
                Oe.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
            }
        }
        ,
        t.prototype.error = function(e) {
            if (!this.isStopped) {
                var t = this._parentSubscriber
                  , n = Oe.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                    n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e),
                    this.unsubscribe()) : (this.__tryOrUnsub(this._error, e),
                    this.unsubscribe());
                else if (t.syncErrorThrowable)
                    n ? (t.syncErrorValue = e,
                    t.syncErrorThrown = !0) : Ne(e),
                    this.unsubscribe();
                else {
                    if (this.unsubscribe(),
                    n)
                        throw e;
                    Ne(e)
                }
            }
        }
        ,
        t.prototype.complete = function() {
            var e = this;
            if (!this.isStopped) {
                var t = this._parentSubscriber;
                if (this._complete) {
                    var n = function() {
                        return e._complete.call(e._context)
                    };
                    Oe.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, n),
                    this.unsubscribe()) : (this.__tryOrUnsub(n),
                    this.unsubscribe())
                } else
                    this.unsubscribe()
            }
        }
        ,
        t.prototype.__tryOrUnsub = function(e, t) {
            try {
                e.call(this._context, t)
            } catch (e) {
                if (this.unsubscribe(),
                Oe.useDeprecatedSynchronousErrorHandling)
                    throw e;
                Ne(e)
            }
        }
        ,
        t.prototype.__tryOrSetError = function(e, t, n) {
            if (!Oe.useDeprecatedSynchronousErrorHandling)
                throw new Error("bad call");
            try {
                t.call(this._context, n)
            } catch (t) {
                return Oe.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = t,
                e.syncErrorThrown = !0,
                !0) : (Ne(t),
                !0)
            }
            return !1
        }
        ,
        t.prototype._unsubscribe = function() {
            var e = this._parentSubscriber;
            this._context = null,
            this._parentSubscriber = null,
            e.unsubscribe()
        }
        ,
        t
    }(He);
    var Ve = function() {
        return "function" == typeof Symbol && Symbol.observable || "@@observable"
    }();
    function We(e) {
        return e
    }
    function Ge(e) {
        return 0 === e.length ? We : 1 === e.length ? e[0] : function(t) {
            return e.reduce((function(e, t) {
                return t(e)
            }
            ), t)
        }
    }
    var qe = function() {
        function e(e) {
            this._isScalar = !1,
            e && (this._subscribe = e)
        }
        return e.prototype.lift = function(t) {
            var n = new e;
            return n.source = this,
            n.operator = t,
            n
        }
        ,
        e.prototype.subscribe = function(e, t, n) {
            var i = this.operator
              , r = function(e, t, n) {
                if (e) {
                    if (e instanceof He)
                        return e;
                    if (e[je])
                        return e[je]()
                }
                return e || t || n ? new He(e,t,n) : new He(Pe)
            }(e, t, n);
            if (i ? r.add(i.call(r, this.source)) : r.add(this.source || Oe.useDeprecatedSynchronousErrorHandling && !r.syncErrorThrowable ? this._subscribe(r) : this._trySubscribe(r)),
            Oe.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable && (r.syncErrorThrowable = !1,
            r.syncErrorThrown))
                throw r.syncErrorValue;
            return r
        }
        ,
        e.prototype._trySubscribe = function(e) {
            try {
                return this._subscribe(e)
            } catch (t) {
                Oe.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0,
                e.syncErrorValue = t),
                !function(e) {
                    for (; e; ) {
                        var t = e
                          , n = t.closed
                          , i = t.destination
                          , r = t.isStopped;
                        if (n || r)
                            return !1;
                        e = i && i instanceof He ? i : null
                    }
                    return !0
                }(e) ? console.warn(t) : e.error(t)
            }
        }
        ,
        e.prototype.forEach = function(e, t) {
            var n = this;
            return new (t = ze(t))((function(t, i) {
                var r;
                r = n.subscribe((function(t) {
                    try {
                        e(t)
                    } catch (e) {
                        i(e),
                        r && r.unsubscribe()
                    }
                }
                ), i, t)
            }
            ))
        }
        ,
        e.prototype._subscribe = function(e) {
            var t = this.source;
            return t && t.subscribe(e)
        }
        ,
        e.prototype[Ve] = function() {
            return this
        }
        ,
        e.prototype.pipe = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return 0 === e.length ? this : Ge(e)(this)
        }
        ,
        e.prototype.toPromise = function(e) {
            var t = this;
            return new (e = ze(e))((function(e, n) {
                var i;
                t.subscribe((function(e) {
                    return i = e
                }
                ), (function(e) {
                    return n(e)
                }
                ), (function() {
                    return e(i)
                }
                ))
            }
            ))
        }
        ,
        e.create = function(t) {
            return new e(t)
        }
        ,
        e
    }();
    function ze(e) {
        if (e || (e = Oe.Promise || Promise),
        !e)
            throw new Error("no Promise impl found");
        return e
    }
    var Ke = function() {
        function e() {
            return Error.call(this),
            this.message = "object unsubscribed",
            this.name = "ObjectUnsubscribedError",
            this
        }
        return e.prototype = Object.create(Error.prototype),
        e
    }()
      , Je = function(e) {
        function t(t, n) {
            var i = e.call(this) || this;
            return i.subject = t,
            i.subscriber = n,
            i.closed = !1,
            i
        }
        return Fe(t, e),
        t.prototype.unsubscribe = function() {
            if (!this.closed) {
                this.closed = !0;
                var e = this.subject
                  , t = e.observers;
                if (this.subject = null,
                t && 0 !== t.length && !e.isStopped && !e.closed) {
                    var n = t.indexOf(this.subscriber);
                    -1 !== n && t.splice(n, 1)
                }
            }
        }
        ,
        t
    }(De)
      , Ye = function(e) {
        function t(t) {
            var n = e.call(this, t) || this;
            return n.destination = t,
            n
        }
        return Fe(t, e),
        t
    }(He)
      , Xe = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t.observers = [],
            t.closed = !1,
            t.isStopped = !1,
            t.hasError = !1,
            t.thrownError = null,
            t
        }
        return Fe(t, e),
        t.prototype[je] = function() {
            return new Ye(this)
        }
        ,
        t.prototype.lift = function(e) {
            var t = new Ze(this,this);
            return t.operator = e,
            t
        }
        ,
        t.prototype.next = function(e) {
            if (this.closed)
                throw new Ke;
            if (!this.isStopped)
                for (var t = this.observers, n = t.length, i = t.slice(), r = 0; r < n; r++)
                    i[r].next(e)
        }
        ,
        t.prototype.error = function(e) {
            if (this.closed)
                throw new Ke;
            this.hasError = !0,
            this.thrownError = e,
            this.isStopped = !0;
            for (var t = this.observers, n = t.length, i = t.slice(), r = 0; r < n; r++)
                i[r].error(e);
            this.observers.length = 0
        }
        ,
        t.prototype.complete = function() {
            if (this.closed)
                throw new Ke;
            this.isStopped = !0;
            for (var e = this.observers, t = e.length, n = e.slice(), i = 0; i < t; i++)
                n[i].complete();
            this.observers.length = 0
        }
        ,
        t.prototype.unsubscribe = function() {
            this.isStopped = !0,
            this.closed = !0,
            this.observers = null
        }
        ,
        t.prototype._trySubscribe = function(t) {
            if (this.closed)
                throw new Ke;
            return e.prototype._trySubscribe.call(this, t)
        }
        ,
        t.prototype._subscribe = function(e) {
            if (this.closed)
                throw new Ke;
            return this.hasError ? (e.error(this.thrownError),
            De.EMPTY) : this.isStopped ? (e.complete(),
            De.EMPTY) : (this.observers.push(e),
            new Je(this,e))
        }
        ,
        t.prototype.asObservable = function() {
            var e = new qe;
            return e.source = this,
            e
        }
        ,
        t.create = function(e, t) {
            return new Ze(e,t)
        }
        ,
        t
    }(qe)
      , Ze = function(e) {
        function t(t, n) {
            var i = e.call(this) || this;
            return i.destination = t,
            i.source = n,
            i
        }
        return Fe(t, e),
        t.prototype.next = function(e) {
            var t = this.destination;
            t && t.next && t.next(e)
        }
        ,
        t.prototype.error = function(e) {
            var t = this.destination;
            t && t.error && this.destination.error(e)
        }
        ,
        t.prototype.complete = function() {
            var e = this.destination;
            e && e.complete && this.destination.complete()
        }
        ,
        t.prototype._subscribe = function(e) {
            return this.source ? this.source.subscribe(e) : De.EMPTY
        }
        ,
        t
    }(Xe)
      , Qe = function(e) {
        function t(t) {
            var n = e.call(this) || this;
            return n._value = t,
            n
        }
        return Fe(t, e),
        Object.defineProperty(t.prototype, "value", {
            get: function() {
                return this.getValue()
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype._subscribe = function(t) {
            var n = e.prototype._subscribe.call(this, t);
            return n && !n.closed && t.next(this._value),
            n
        }
        ,
        t.prototype.getValue = function() {
            if (this.hasError)
                throw this.thrownError;
            if (this.closed)
                throw new Ke;
            return this._value
        }
        ,
        t.prototype.next = function(t) {
            e.prototype.next.call(this, this._value = t)
        }
        ,
        t
    }(Xe);
    function et() {}
    var tt = function() {
        function e(e, t, n) {
            this.nextOrObserver = e,
            this.error = t,
            this.complete = n
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new nt(e,this.nextOrObserver,this.error,this.complete))
        }
        ,
        e
    }()
      , nt = function(e) {
        function t(t, n, i, r) {
            var s = e.call(this, t) || this;
            return s._tapNext = et,
            s._tapError = et,
            s._tapComplete = et,
            s._tapError = i || et,
            s._tapComplete = r || et,
            Ae(n) ? (s._context = s,
            s._tapNext = n) : n && (s._context = n,
            s._tapNext = n.next || et,
            s._tapError = n.error || et,
            s._tapComplete = n.complete || et),
            s
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            try {
                this._tapNext.call(this._context, e)
            } catch (e) {
                return void this.destination.error(e)
            }
            this.destination.next(e)
        }
        ,
        t.prototype._error = function(e) {
            try {
                this._tapError.call(this._context, e)
            } catch (e) {
                return void this.destination.error(e)
            }
            this.destination.error(e)
        }
        ,
        t.prototype._complete = function() {
            try {
                this._tapComplete.call(this._context)
            } catch (e) {
                return void this.destination.error(e)
            }
            return this.destination.complete()
        }
        ,
        t
    }(He);
    function it() {
        return function(e) {
            return e.lift(new rt(e))
        }
    }
    var rt = function() {
        function e(e) {
            this.connectable = e
        }
        return e.prototype.call = function(e, t) {
            var n = this.connectable;
            n._refCount++;
            var i = new st(e,n)
              , r = t.subscribe(i);
            return i.closed || (i.connection = n.connect()),
            r
        }
        ,
        e
    }()
      , st = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.connectable = n,
            i
        }
        return Fe(t, e),
        t.prototype._unsubscribe = function() {
            var e = this.connectable;
            if (e) {
                this.connectable = null;
                var t = e._refCount;
                if (t <= 0)
                    this.connection = null;
                else if (e._refCount = t - 1,
                t > 1)
                    this.connection = null;
                else {
                    var n = this.connection
                      , i = e._connection;
                    this.connection = null,
                    !i || n && i !== n || i.unsubscribe()
                }
            } else
                this.connection = null
        }
        ,
        t
    }(He)
      , ot = function(e) {
        function t(t, n) {
            var i = e.call(this) || this;
            return i.source = t,
            i.subjectFactory = n,
            i._refCount = 0,
            i._isComplete = !1,
            i
        }
        return Fe(t, e),
        t.prototype._subscribe = function(e) {
            return this.getSubject().subscribe(e)
        }
        ,
        t.prototype.getSubject = function() {
            var e = this._subject;
            return e && !e.isStopped || (this._subject = this.subjectFactory()),
            this._subject
        }
        ,
        t.prototype.connect = function() {
            var e = this._connection;
            return e || (this._isComplete = !1,
            (e = this._connection = new De).add(this.source.subscribe(new ct(this.getSubject(),this))),
            e.closed && (this._connection = null,
            e = De.EMPTY)),
            e
        }
        ,
        t.prototype.refCount = function() {
            return it()(this)
        }
        ,
        t
    }(qe)
      , at = function() {
        var e = ot.prototype;
        return {
            operator: {
                value: null
            },
            _refCount: {
                value: 0,
                writable: !0
            },
            _subject: {
                value: null,
                writable: !0
            },
            _connection: {
                value: null,
                writable: !0
            },
            _subscribe: {
                value: e._subscribe
            },
            _isComplete: {
                value: e._isComplete,
                writable: !0
            },
            getSubject: {
                value: e.getSubject
            },
            connect: {
                value: e.connect
            },
            refCount: {
                value: e.refCount
            }
        }
    }()
      , ct = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.connectable = n,
            i
        }
        return Fe(t, e),
        t.prototype._error = function(t) {
            this._unsubscribe(),
            e.prototype._error.call(this, t)
        }
        ,
        t.prototype._complete = function() {
            this.connectable._isComplete = !0,
            this._unsubscribe(),
            e.prototype._complete.call(this)
        }
        ,
        t.prototype._unsubscribe = function() {
            var e = this.connectable;
            if (e) {
                this.connectable = null;
                var t = e._connection;
                e._refCount = 0,
                e._subject = null,
                e._connection = null,
                t && t.unsubscribe()
            }
        }
        ,
        t
    }(Ye);
    var ut = function() {
        function e(e, t) {
            this.subjectFactory = e,
            this.selector = t
        }
        return e.prototype.call = function(e, t) {
            var n = this.selector
              , i = this.subjectFactory()
              , r = n(i).subscribe(e);
            return r.add(t.subscribe(i)),
            r
        }
        ,
        e
    }();
    function lt() {
        return new Xe
    }
    function dt() {
        return function(e) {
            return it()((t = lt,
            function(e) {
                var i;
                if (i = "function" == typeof t ? t : function() {
                    return t
                }
                ,
                "function" == typeof n)
                    return e.lift(new ut(i,n));
                var r = Object.create(e, at);
                return r.source = e,
                r.subjectFactory = i,
                r
            }
            )(e));
            var t, n
        }
    }
    function ht(e, t) {
        return function(n) {
            return n.lift(new pt(e,t))
        }
    }
    var pt = function() {
        function e(e, t) {
            this.predicate = e,
            this.thisArg = t
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new gt(e,this.predicate,this.thisArg))
        }
        ,
        e
    }()
      , gt = function(e) {
        function t(t, n, i) {
            var r = e.call(this, t) || this;
            return r.predicate = n,
            r.thisArg = i,
            r.count = 0,
            r
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            var t;
            try {
                t = this.predicate.call(this.thisArg, e, this.count++)
            } catch (e) {
                return void this.destination.error(e)
            }
            t && this.destination.next(e)
        }
        ,
        t
    }(He);
    function ft(e, t) {
        return function(n, i) {
            return t(n(e(i)), i)
        }
    }
    function mt(e, t) {
        return {
            get: e,
            set: t,
            modify: ft(e, t),
            compose: n=>mt((t=>n.get(e(t))), ((i,r)=>t(n.set(i, e(r)), r)))
        }
    }
    function bt(...e) {
        if (0 === e.length)
            throw new TypeError("Can not compose zero lenses. You probably want `Lens.identity`.");
        if (1 === e.length)
            return e[0];
        {
            let t = e[0];
            return e.slice(1).forEach((e=>{
                t = t.compose(e)
            }
            )),
            t
        }
    }
    mt((e=>e), ((e,t)=>e));
    (function e(t, n) {
        return {
            get: t,
            set: n,
            modify: ft(t, n),
            compose: i=>e((e=>{
                const n = t(e);
                return void 0 !== n ? i.get(n) : void 0
            }
            ), ((e,r)=>{
                const s = t(r);
                return void 0 !== s ? n(i.set(e, s), r) : r
            }
            ))
        }
    }
    )((e=>{}
    ), ((e,t)=>t));
    const vt = void 0 !== n(27061) && !1;
    function _t(e, t, n) {
        if (e in n && a(t, n[e]))
            return n;
        {
            const i = {};
            for (const e in n)
                i[e] = n[e];
            return i[e] = t,
            i
        }
    }
    const yt = new RegExp(["^", "function", "\\(", "[^), ]+", "\\)", "\\{", '("use strict";)?', "return\\s", "[^\\.]+\\.(\\S+?);?", "\\}", "$"].join("\\s*"));
    new RegExp(["^", "function", "\\(", "[^), ]+", "\\)", "\\{", '("use strict";)?', "(\\$_\\$wf\\(\\d+\\);)?", "return\\s", "(\\$_\\$w\\(\\d+, \\d+\\),\\s)?", "[^\\.]+\\.(\\S+?);?", "\\}", "$"].join("\\s*"));
    function wt(e) {
        return function(e) {
            const t = yt
              , n = e.match(t);
            if (n && n[2])
                return n[2].split(".");
            throw new TypeError(`Expected a property expression, got "${e}".\n\n      A property expression should be a referentially transparent (no side-effects),\n      single-expression "getter" function.\n\n      Correct example: "function (x) { return x.some }" or "x => x.some".\n      Incorrect example: "function (x) { var y = x.some; return y }" or "({some}) => some"`)
        }(e.toString())
    }
    function Et(e) {
        return void 0 === e ? e=>mt((t=>t[e]), ((t,n)=>_t(e, t, n))) : mt((t=>t[e]), ((t,n)=>_t(e, t, n)))
    }
    let xt = 0;
    function St(e) {
        if (xt < 10) {
            xt++;
            const t = `x.${e.join(".")}`
              , n = `'${e.join("', '")}'`;
            !function(e) {
                "undefined" != typeof console && "function" == typeof console.error && console.error("[Focal]: " + e);
                try {
                    throw new Error(e)
                } catch (e) {}
            }(`The property expression overload of Atom.lens and Lens.prop are deprecated and will be removed in next versions of Focal. Please use the key name overload for Atom.lens and Lens.key instead. You can convert your code by changing the calls:\n  a.lens(x => ${t}) to a.lens(${n}),\n  Lens.prop((x: T) => ${t}) to Lens.key<T>()(${n}).`)
        }
    }
    function kt(e) {
        return e && "function" == typeof e.schedule
    }
    var Rt = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return Fe(t, e),
        t.prototype.notifyNext = function(e, t, n, i, r) {
            this.destination.next(t)
        }
        ,
        t.prototype.notifyError = function(e, t) {
            this.destination.error(e)
        }
        ,
        t.prototype.notifyComplete = function(e) {
            this.destination.complete()
        }
        ,
        t
    }(He)
      , It = function(e) {
        function t(t, n, i) {
            var r = e.call(this) || this;
            return r.parent = t,
            r.outerValue = n,
            r.outerIndex = i,
            r.index = 0,
            r
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this)
        }
        ,
        t.prototype._error = function(e) {
            this.parent.notifyError(e, this),
            this.unsubscribe()
        }
        ,
        t.prototype._complete = function() {
            this.parent.notifyComplete(this),
            this.unsubscribe()
        }
        ,
        t
    }(He)
      , Tt = function(e) {
        return function(t) {
            for (var n = 0, i = e.length; n < i && !t.closed; n++)
                t.next(e[n]);
            t.complete()
        }
    };
    function Ft() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
    }
    var At = Ft()
      , Ct = function(e) {
        return e && "number" == typeof e.length && "function" != typeof e
    };
    function Ot(e) {
        return !!e && "function" != typeof e.subscribe && "function" == typeof e.then
    }
    var Nt = function(e) {
        if (e && "function" == typeof e[Ve])
            return i = e,
            function(e) {
                var t = i[Ve]();
                if ("function" != typeof t.subscribe)
                    throw new TypeError("Provided object does not correctly implement Symbol.observable");
                return t.subscribe(e)
            }
            ;
        if (Ct(e))
            return Tt(e);
        if (Ot(e))
            return n = e,
            function(e) {
                return n.then((function(t) {
                    e.closed || (e.next(t),
                    e.complete())
                }
                ), (function(t) {
                    return e.error(t)
                }
                )).then(null, Ne),
                e
            }
            ;
        if (e && "function" == typeof e[At])
            return t = e,
            function(e) {
                for (var n = t[At](); ; ) {
                    var i = void 0;
                    try {
                        i = n.next()
                    } catch (t) {
                        return e.error(t),
                        e
                    }
                    if (i.done) {
                        e.complete();
                        break
                    }
                    if (e.next(i.value),
                    e.closed)
                        break
                }
                return "function" == typeof n.return && e.add((function() {
                    n.return && n.return()
                }
                )),
                e
            }
            ;
        var t, n, i, r = Me(e) ? "an invalid object" : "'" + e + "'";
        throw new TypeError("You provided " + r + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")
    };
    function Pt(e, t, n, i, r) {
        if (void 0 === r && (r = new It(e,n,i)),
        !r.closed)
            return t instanceof qe ? t.subscribe(r) : Nt(t)(r)
    }
    function Lt(e, t) {
        return new qe((function(n) {
            var i = new De
              , r = 0;
            return i.add(t.schedule((function() {
                r !== e.length ? (n.next(e[r++]),
                n.closed || i.add(this.schedule())) : n.complete()
            }
            ))),
            i
        }
        ))
    }
    function Mt(e, t) {
        return t ? Lt(e, t) : new qe(Tt(e))
    }
    var Ut = {};
    function Dt() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = void 0
          , i = void 0;
        return kt(e[e.length - 1]) && (i = e.pop()),
        "function" == typeof e[e.length - 1] && (n = e.pop()),
        1 === e.length && Le(e[0]) && (e = e[0]),
        Mt(e, i).lift(new Ht(n))
    }
    var Bt, jt, Ht = function() {
        function e(e) {
            this.resultSelector = e
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new $t(e,this.resultSelector))
        }
        ,
        e
    }(), $t = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.resultSelector = n,
            i.active = 0,
            i.values = [],
            i.observables = [],
            i
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.values.push(Ut),
            this.observables.push(e)
        }
        ,
        t.prototype._complete = function() {
            var e = this.observables
              , t = e.length;
            if (0 === t)
                this.destination.complete();
            else {
                this.active = t,
                this.toRespond = t;
                for (var n = 0; n < t; n++) {
                    var i = e[n];
                    this.add(Pt(this, i, void 0, n))
                }
            }
        }
        ,
        t.prototype.notifyComplete = function(e) {
            0 == (this.active -= 1) && this.destination.complete()
        }
        ,
        t.prototype.notifyNext = function(e, t, n) {
            var i = this.values
              , r = i[n]
              , s = this.toRespond ? r === Ut ? --this.toRespond : this.toRespond : 0;
            i[n] = t,
            0 === s && (this.resultSelector ? this._tryResultSelector(i) : this.destination.next(i.slice()))
        }
        ,
        t.prototype._tryResultSelector = function(e) {
            var t;
            try {
                t = this.resultSelector.apply(this, e)
            } catch (e) {
                return void this.destination.error(e)
            }
            this.destination.next(t)
        }
        ,
        t
    }(Rt);
    class Vt extends Qe {
        view(...e) {
            return void 0 !== e[0] ? "function" == typeof e[0] ? new zt(this,e[0]) : "string" == typeof e[0] ? new zt(this,bt(...e.map(Et())).get) : new zt(this,(t=>e[0].get(t))) : this
        }
    }
    class Wt extends Vt {
        set(e) {
            this.modify((()=>e))
        }
        lens(e, ...t) {
            return new qt(this,"function" == typeof e ? function(e) {
                const t = wt(e);
                return vt && St(t),
                bt(...t.map(Et()))
            }(e) : "string" == typeof e ? bt(Et(e), ...t.map((e=>Et(e)))) : e,a)
        }
    }
    class Gt extends Wt {
        constructor(e) {
            super(e)
        }
        get() {
            return this.getValue()
        }
        modify(e) {
            const t = this.getValue()
              , n = e(t);
            a(t, n) || this.next(n)
        }
        set(e) {
            a(this.getValue(), e) || this.next(e)
        }
    }
    class qt extends Wt {
        _source;
        _lens;
        _eq;
        constructor(e, t, n=a) {
            super(void 0),
            this._source = e,
            this._lens = t,
            this._eq = n
        }
        get() {
            return this._subscription ? this.getValue() : this._lens.get(this._source.get())
        }
        modify(e) {
            this._source.modify((t=>this._lens.modify(e, t)))
        }
        set(e) {
            this._source.modify((t=>this._lens.set(e, t)))
        }
        _onSourceValue(e) {
            const t = this.getValue()
              , n = this._lens.get(e);
            this._eq(t, n) || this.next(n)
        }
        _subscription = null;
        _refCount = 0;
        subscribe(...e) {
            this._subscription || (this._subscription = this._source.subscribe((e=>this._onSourceValue(e)))),
            this._refCount++;
            const t = new De((()=>{
                --this._refCount <= 0 && this._subscription && (this._subscription.unsubscribe(),
                this._subscription = null)
            }
            ));
            return t.add(super.subscribe(...e)),
            t
        }
        unsubscribe() {
            this._subscription && (this._subscription.unsubscribe(),
            this._subscription = null),
            this._refCount = 0,
            super.unsubscribe()
        }
    }
    class zt extends Vt {
        _source;
        _getter;
        _eq;
        constructor(e, t, n=a) {
            super(void 0),
            this._source = e,
            this._getter = t,
            this._eq = n
        }
        get() {
            return this._subscription ? this.getValue() : this._getter(this._source.get())
        }
        _onSourceValue(e) {
            const t = this.getValue()
              , n = this._getter(e);
            this._eq(t, n) || this.next(n)
        }
        _subscription = null;
        _refCount = 0;
        subscribe(...e) {
            this._subscription || (this._subscription = this._source.subscribe((e=>this._onSourceValue(e)))),
            this._refCount++;
            const t = new De((()=>{
                --this._refCount <= 0 && this._subscription && (this._subscription.unsubscribe(),
                this._subscription = null)
            }
            ));
            return t.add(super.subscribe(...e)),
            t
        }
        unsubscribe() {
            this._subscription && (this._subscription.unsubscribe(),
            this._subscription = null),
            this._refCount = 0,
            super.unsubscribe()
        }
    }
    class Kt extends Vt {
        _sources;
        _combineFn;
        _eq;
        constructor(e, t, n=a) {
            super(void 0),
            this._sources = e,
            this._combineFn = t,
            this._eq = n
        }
        get() {
            return this._subscription ? this.getValue() : this._combineFn(this._sources.map((e=>e.get())))
        }
        _onSourceValues(e) {
            const t = this.getValue()
              , n = this._combineFn(e);
            this._eq(t, n) || this.next(n)
        }
        _subscription = null;
        _refCount = 0;
        subscribe(...e) {
            this._subscription || (this._subscription = Dt(this._sources).subscribe((e=>this._onSourceValues(e)))),
            this._refCount++;
            const t = new De((()=>{
                --this._refCount <= 0 && this._subscription && (this._subscription.unsubscribe(),
                this._subscription = null)
            }
            ));
            return t.add(super.subscribe(...e)),
            t
        }
        unsubscribe() {
            this._subscription && (this._subscription.unsubscribe(),
            this._subscription = null),
            this._refCount = 0,
            super.unsubscribe()
        }
    }
    !function(e) {
        e.create = function(e) {
            return new Gt(e)
        }
        ,
        e.log = function(e, t) {
            const n = (e,t,n)=>console.log("%c" + e, `color: ${t}; font-weight: bold`, n);
            let i = e.get();
            return e.subscribe((e=>{
                "function" == typeof t ? t(i, e) : (console.group(`UPDATE ${t ? `TYPE: ${t} ` : ""}@ ${(new Date).toTimeString()}`),
                n("prev state", "#9E9E9E", i),
                n("next state", "#4CAF50", e),
                console.groupEnd()),
                i = e
            }
            )),
            e
        }
        ,
        e.combine = function(...e) {
            return new Kt(e.slice(void 0, -1),(t=>e[e.length - 1](...t)))
        }
        ,
        e.fromObservable = function(t) {
            const n = new Qe(null)
              , i = t.pipe((r = t=>{
                const i = n.value;
                null === i ? n.next(e.create(t)) : i.set(t)
            }
            ,
            function(e) {
                return e.lift(new tt(r,s,o))
            }
            ), dt());
            var r, s, o;
            return new qe((e=>{
                const t = new De;
                return t.add(n.pipe(ht((e=>!!e))).subscribe(e)),
                t.add(i.subscribe(void 0, (t=>e.error(t)), (()=>e.complete()))),
                t
            }
            ))
        }
    }(Bt || (Bt = {}));
    class Jt {
        static getInstance() {
            if (void 0 === this._instanceShared)
                throw new Error("shared Env not inited yet");
            return this._instanceShared
        }
        static initShared(e) {
            if (void 0 !== this._instanceShared)
                throw new Error("shared Env already inited");
            this._instanceShared = e
        }
        constructor(e, t=Bt.create(!1), n=Bt.create(!1)) {
            this._enableHistoryLoggerInProd = t,
            this._enableAdvancedHistoryLoggerInProd = n,
            this.enableHistoryLoggerInProd = (e=!0)=>{
                e && !this._enableHistoryLoggerInProd.get() ? (console.warn("Debug reports have been enabled"),
                this._enableHistoryLoggerInProd.set(!0)) : !e && this._enableHistoryLoggerInProd.get() && (console.warn("Debug reports have been disabled"),
                this._enableHistoryLoggerInProd.set(!1))
            }
            ,
            this.enableAdvancedHistoryLoggerInProd = (e=!0)=>{
                e && !this._enableAdvancedHistoryLoggerInProd.get() ? (console.warn("Advanced logging has been enabled"),
                this._enableAdvancedHistoryLoggerInProd.set(!0)) : !e && this._enableAdvancedHistoryLoggerInProd.get() && (console.warn("Advanced logging has been disabled"),
                this._enableAdvancedHistoryLoggerInProd.set(!1))
            }
            ;
            const i = e.testArgs
              , r = i && i.processEnv ? i.processEnv : Q.fromBrowserify()
              , s = ee.getTargetEnv(r);
            this._initLogger(e, s);
            const o = function(e, t, n, i, r, s) {
                const o = ee.create(e, t, n, i, r, s);
                return te.init(o),
                self.GR_CFG = te.get(),
                o
            }(e.browser, e.extensionType, e.deploymentType, e.context, r, s);
            this.context = e.context,
            this.config = o
        }
        _initLogger(e, t) {
            this.historyLogsService = me.create({
                ...e.historyLoggerExtraArgs,
                enabledInProd: this._enableHistoryLoggerInProd,
                enableAdvancedInProd: this._enableAdvancedHistoryLoggerInProd
            });
            const n = "prod" !== t || "cs" !== e.context
              , i = {
                create: (e,t)=>{
                    return new Se(e,{
                        writer: new Ie,
                        filterFn: n ? e=>!0 : (i = _e.ERROR,
                        e=>we(e.level) >= we(i))
                    },this.historyLogsService,t);
                    var i
                }
            };
            this.logger = i
        }
    }
    function Yt() {
        return Jt.getInstance()
    }
    !function(e) {
        e.create = function(e, t) {
            return new xe(e,(()=>Yt().logger.create(e, t)))
        }
    }(jt || (jt = {}));
    const Xt = 1e3
      , Zt = 36e5
      , Qt = 24 * Zt;
    function en(e) {
        return e * Qt
    }
    function tn(e) {
        return e * Xt
    }
    var nn;
    !function(e) {
        e.lessThan1Week = "lessThan1Week",
        e.weekTo4Weeks = "weekTo4Weeks",
        e.moreThan4weeks = "moreThan4weeks",
        e.moreThan3Months = "moreThan3Months"
    }(nn || (nn = {}));
    new Map([[Date.now(), nn.lessThan1Week], [Date.now() - en(7), nn.weekTo4Weeks], [Date.now() - en(28), nn.moreThan4weeks], [Date.now() - en(90), nn.moreThan3Months]]);
    const rn = {
        stats: "ex_perfstats",
        csInit: "ex_csInitPerf",
        viewInjection: "viewInjectionPerf"
    };
    function sn(e) {
        const {_tag: t, ...n} = e;
        return {
            [rn[e._tag]]: n
        }
    }
    var on;
    function an(e) {
        return "object" == typeof e && null !== e && "message"in e && "string" == typeof e.message
    }
    !function(e) {
        e.INFO = "INFO",
        e.WARN = "WARN",
        e.ERROR = "ERROR"
    }(on || (on = {}));
    const cn = e=>e.reduce(((e,t,n)=>e + (t - e) / (n + 1)), 0)
      , un = (e,t)=>{
        const n = void 0 === t ? cn(e) : t;
        return e.length > 1 ? Math.sqrt(e.reduce(((e,t)=>e + (t - n) ** 2), 0) / (e.length - 1)) : 0
    }
    ;
    var ln, dn, hn;
    !function(e) {
        function t() {
            return {
                dummy: !0,
                startMeasure: ()=>({
                    endMeasure: ()=>{}
                    ,
                    cancelMeasure: _
                }),
                measure: e=>e(),
                measureAsync: e=>e(),
                custom: _
            }
        }
        e.dummy = t,
        e.dummyFactoryInitialization = ()=>()=>t()
    }(ln || (ln = {})),
    function(e) {
        e.dummy = {
            flushMeasures: e=>[],
            measure: (e,t)=>t(),
            startMeasure: e=>({
                endMeasure() {},
                cancelMeasure() {}
            })
        }
    }(dn || (dn = {})),
    function(e) {
        let t;
        !function(e) {
            let t;
            !function(e) {
                let t;
                !function(e) {
                    e.stats = "stats",
                    e.csInit = "csInit",
                    e.viewInjection = "viewInjection"
                }(t = e.Types || (e.Types = {}))
            }(t = e.Tagged || (e.Tagged = {}))
        }(t = e.Data || (e.Data = {})),
        e.getStats = function(e) {
            if (0 === e.length)
                return {
                    ct: 0
                };
            {
                const t = e.reduce(((e,t)=>Math.min(e, t)), Number.MAX_VALUE)
                  , n = e.reduce(((e,t)=>Math.max(e, t)), Number.MIN_VALUE)
                  , i = e.length >= 6 ? cn(e) : void 0;
                return {
                    ct: e.length,
                    min: t,
                    max: n,
                    range: n - t,
                    avg: i,
                    stddev: void 0 !== i && e.length > 1 ? un(e, i) : void 0
                }
            }
        }
    }(hn || (hn = {}));
    const pn = e=>e.replace("www.", "");
    function gn(e) {
        const t = e && e.ownerDocument || document
          , n = t.location || t.defaultView.location;
        return n ? pn(n.hostname) : ""
    }
    function fn(e) {
        return "firefox" === ie().bundleInfo.browser && /^about:/.test(e) ? e : "" === e ? "" : pn(new URL(e).hostname)
    }
    function mn(e) {
        return vn.includes(e)
    }
    function bn(e=gn(), t="other") {
        var n;
        return mn(e) ? null !== (n = function(e) {
            return vn.getTopSiteId(e)
        }(e)) && void 0 !== n ? n : "null" : t
    }
    const vn = new class {
        constructor(e) {
            function t(e) {
                return `Invalid pattern "${e}": "*" is allowed only at start and/or end position`
            }
            this._equal = new Set,
            this._prefix = [],
            this._suffix = [],
            this._infix = [],
            this._domain = [];
            for (const n of e)
                if (n.startsWith("**."))
                    this._domain.push(n.substring(3));
                else {
                    const e = n.indexOf("*");
                    if (-1 === e)
                        this._equal.add(n);
                    else if (e === n.length - 1)
                        this._prefix.push(n.substring(0, e));
                    else {
                        if (0 !== e)
                            throw new Error(t(n));
                        {
                            const e = n.indexOf("*", 1);
                            if (-1 === e)
                                this._suffix.push(n.substring(1));
                            else {
                                if (e !== n.length - 1)
                                    throw new Error(t(n));
                                this._infix.push(n.substring(1, e))
                            }
                        }
                    }
                }
        }
        getTopSiteId(e) {
            var t, n, i, r, s, o, a;
            return null !== (o = null !== (s = null !== (r = null !== (i = null !== (n = null !== (t = this._equal.has(e) ? e : void 0) && void 0 !== t ? t : this._domain.find((t=>t === e))) && void 0 !== n ? n : (a = this._domain.find((t=>e.endsWith("." + t)))) ? "**." + a : void 0) && void 0 !== i ? i : this._prefix.find((t=>e.startsWith(t)))) && void 0 !== r ? r : this._suffix.find((t=>e.endsWith(t)))) && void 0 !== s ? s : this._infix.find((t=>e.includes(t)))) && void 0 !== o ? o : null
        }
        includes(e) {
            return null !== this.getTopSiteId(e)
        }
    }
    (["mail.google.com", "translate.google.*", "docs.google.com", "web.whatsapp.com", "facebook.com", "outlook.*", "linkedin.com", "zendesk.*", "youtube.com", "twitter.com", "messenger.com", "*.slack.*", "*canvas*", "*instructure*", "trello.com", "editor.wix.com", "quizlet.com", "mail.yahoo.com", "*.force.*", "keep.google.com", "vk.com", "fanyi.baidu.com", "app.bullhornstaffing.com", "app.qa-world.com", "calendar.google.com", "papago.naver.com", "wordcounter.net", "blogger.*", "wattpad.com", "**.wordpress.com", "amazon.*", "smallseotools.com", "create.kahoot.it", "apps.rackspace.com", "basecamp.com", "varsitytutors.com", "canva.com", "fanyi.youdao.com", "reverso.net", "message.alibaba.com", "*schoology*", "*.blackboard.*", "classroom.google.com", "*upwork*", "business.facebook.com", "medium.com", "mail.aol.com", "workhub.transcribeme.com", "github.com", "overleaf.com", "chat.openai.com", "**.substack.com", "**.atlassian.net", "**.greenhouse.io", "**.lattice.com", "**.latticehq.com", "**.salesforce.com", "**.force.com", "**.zendesk.com", "**.microsoftonline.com", "**.outlook.com", "**.facebook.com", "**.messenger.com", "**.genesys.com", "**.cisco.com", "**.avaya.com", "**.oraclecloud.com", "**.five9.com", "**.tawk.to", "**.helpscout.com", "**.livechat.com", "**.intercom.com", "**.freshdesk.com", "**.liveagent.com", "**.hubspot.com", "google.com", "chat.google.com", "classroom.google.com", "quillbot.com", "notion.so", "**.peardeck.com", "discord.com", "**.officeapps.live.com", "student.desmos.com", "web.kamihq.com", "deepl.com", "upwork.com", "app.nearpod.com", "bard.google.com", "instagram.com", "teams.microsoft.com", "studio.youtube.com", "learning.amplify.com", "commonlit.org", "**.asana.com", "reddit.com", "forms.office.com", "sites.google.com", "*amazon.co*", "apps.studysync.com", "fiverr.com"]);
    class _n {
        constructor(e) {
            this._onMeasure = e
        }
        measure(e) {
            const t = performance.now();
            let n = !1;
            try {
                const i = e();
                return n = !0,
                i
            } finally {
                this._onMeasure(performance.now() - t, n)
            }
        }
        async measureAsync(e) {
            const t = performance.now();
            let n = !1;
            try {
                const i = await e();
                return n = !0,
                i
            } finally {
                this._onMeasure(performance.now() - t, n)
            }
        }
    }
    function yn(e) {
        return e instanceof Error ? function(e) {
            if (e instanceof Error) {
                const {name: t, message: n, stack: i, errors: r, suppressed: s, cause: o, ...a} = e;
                return {
                    ...a,
                    name: t,
                    message: n,
                    stack: i,
                    errors: r,
                    suppressed: s,
                    cause: o
                }
            }
            return e
        }(e) : e instanceof ErrorEvent ? function(e) {
            if (e instanceof ErrorEvent) {
                const {message: t, type: n, lineno: i, colno: r, filename: s, error: o, ...a} = e;
                return {
                    ...a,
                    message: t,
                    type: n,
                    lineno: i,
                    colno: r,
                    filename: s,
                    error: o
                }
            }
            return e
        }(e) : e instanceof PromiseRejectionEvent ? function(e) {
            if (e instanceof PromiseRejectionEvent) {
                const {type: t, reason: n, ...i} = e;
                return {
                    ...i,
                    type: t,
                    reason: n
                }
            }
            return e
        }(e) : e
    }
    function wn(e) {
        try {
            return JSON.stringify(e, ((e,t)=>yn(t)))
        } catch (e) {
            return JSON.stringify({
                json_error: "Cannot json stringify"
            })
        }
    }
    function En(e, t) {
        return {
            json: wn(e),
            exception: t ? {
                name: t.name,
                message: t.message,
                stack: t.stack ? kn(t.stack) : void 0,
                ...de(t.extra) ? t.extra : {}
            } : void 0
        }
    }
    function xn() {
        return Yt().browserApi.baseUri
    }
    const Sn = {
        chromium: ["<anonymous>", "native", "unknown location"],
        firefox: [],
        safari: ["[native code]"]
    };
    function kn(e, {browser: t=Yt().config.bundleInfo.browser, extensionBaseUri: n=xn()}={}) {
        if (!e)
            return e;
        const i = Sn["chrome" === t || "edge" === t ? "chromium" : t]
          , r = e=>i.some((t=>e.startsWith(t))) || n && e.startsWith(n)
          , s = e.split("\n");
        if ("chrome" === t || "edge" === t) {
            const e = [];
            let t = 0;
            for (; t < s.length && !s[t].startsWith("    at "); )
                e.push(s[t]),
                t++;
            for (; t < s.length; ) {
                const n = (o = s[t],
                a = void 0,
                c = void 0,
                u = void 0,
                null === (u = null !== (c = null !== (a = Rn.exec(o)) && void 0 !== a ? a : In.exec(o)) && void 0 !== c ? c : Tn.exec(o)) || void 0 === u ? void 0 : u[1]);
                n ? r(n) ? e.push(s[t]) : e.push("    at <hidden>") : e.push("    <unparsed>"),
                t++
            }
            return e.join("\n")
        }
        if ("firefox" === t || "safari" === t)
            return s.map((e=>[e, "firefox" === t ? Fn(e) : An(e)])).map((([e,t])=>void 0 === t ? "<unparsed>" : r(t) ? e : "<hidden>")).join("\n");
        var o, a, c, u;
        m(t)
    }
    const Rn = /^ {4}at ([^(]*)$/
      , In = /^ {4}at [^(]* \(([^()]*)\)$/
      , Tn = /^ {4}at eval \([^(]* \(([^()]*)\)\)$/;
    function Fn(e) {
        return e.split("@", 2)[1]
    }
    function An(e) {
        var t;
        return null !== (t = e.split("@", 2)[1]) && void 0 !== t ? t : e
    }
    const Cn = jt.create("lib.tracking.telemetry")
      , On = .1
      , Nn = .05
      , Pn = .01;
    var Ln;
    !function(e) {
        e.getMapPageCount = e=>void 0 === e.mapPageCount ? void 0 : e.mapPageCount > 10 ? "10+" : e.mapPageCount
    }(Ln || (Ln = {}));
    const Mn = e=>e.substring(0, 5)
      , Un = (e,t)=>{
        let n;
        try {
            n = JSON.stringify(t)
        } catch (t) {
            n = `stringify fail: '${String(t)}', '${an(t) ? t.message : "undefined"}'`,
            Cn.warn(n, e)
        }
        return n
    }
    ;
    class Dn {
        constructor(e=_, t=_, n=_, i=_, r=!1, s=ln.dummyFactoryInitialization, o=_, a=_, c=(e=>.01), u=_, l=s(((e,{hideUserInfo: t, ...n})=>{
            this._sendEvent({
                logger: e,
                level: on.INFO,
                hideUserInfo: t,
                ...sn(n)
            })
        }
        )), d=_, h=_, p=_, g=_, f=_) {
            this._sendFelog = e,
            this._sendFelogUsage = t,
            this._setUserInfo = n,
            this._setContainerId = i,
            this._sendUsageMetrics = r,
            this._sendFelogEvent = o,
            this._sendFelogCrashLogs = a,
            this._getUsageMetricsRate = c,
            this._enableDataSharing = u,
            this._createPerfLogger = l,
            this._sendFelogMetricEvent = d,
            this._sendFemetricsRate = h,
            this._startFemetricsTimer = p,
            this._endFemetricsTimer = g,
            this._sendFemetricsTimer = f,
            this._sendEvent = e=>{
                try {
                    this._sendFelogEvent(e)
                } catch (t) {
                    Cn.warn(`Failed to send felog for ${JSON.stringify(e)}`, t)
                }
            }
            ,
            this._sendException = e=>(t,n,i,r=!0)=>{
                let s;
                s = i || (an(t) ? t.message : String(t)),
                this._sendEvent({
                    message: s,
                    ...e,
                    sendToFemetrics: r,
                    extra: {
                        ...e.extra,
                        ...En(n, t)
                    }
                })
            }
            ,
            this._sendUsageMetricsSamplingRatio = this._getUsageMetricsRate(ie().bundleInfo.browser),
            this.sendFemetricsRate = (e,t,n)=>{
                this._sendFemetricsRate(e, t, n)
            }
            ,
            this.startFemetricsTimer = (e,t,n)=>{
                this._startFemetricsTimer(e, t, performance.now(), n)
            }
            ,
            this.endFemetricsTimer = (e,t,n)=>{
                this._endFemetricsTimer(e, t, performance.now(), n)
            }
            ,
            this.restoredBgConnection = e=>{
                this._send("cs.connection.bg.restored", on.INFO, {
                    timeWithoutConnection: e
                })
            }
            ,
            this.initWithoutBgConnection = ()=>{
                this._send("cs.connection.bg.disconnected", on.INFO)
            }
            ,
            this.fetchDefinitionsFail = ()=>{
                this._send("cs.connection.api.definition.failed", on.WARN)
            }
            ,
            this.tooLongPageConfigInit = e=>{
                this._send("cs.pageConfig.init.exceeded", on.WARN, {
                    initTime: e
                })
            }
            ,
            this.tooLongUserUpdateTime = e=>{
                this._send("bg.state.user.update.exceeded", on.WARN, {
                    updateTime: e
                })
            }
            ,
            this.lostBgPageConnection = ()=>{
                this._send("cs.gbutton.bgConnection.lost", on.INFO)
            }
            ,
            this.restoreBgPageConnection = e=>{
                this._send("cs.gbutton.bgConnection.restored", on.INFO, {
                    time: e
                })
            }
            ,
            this.dynamicConfigLoadFromPrefsError = e=>{
                this._sendSampled(Pn, "bg.dynamicConfig.prefs.load.error", on.ERROR, {
                    message: e
                })
            }
            ,
            this.dynamicConfigSaveToPrefsError = e=>{
                this._sendSampled(Pn, "bg.dynamicConfig.prefs.save.error", on.ERROR, {
                    message: e
                })
            }
            ,
            this.dynamicConfigLoadFromServerError = e=>{
                this._sendSampled(Pn, "bg.dynamicConfig.server.load.error", on.ERROR, {
                    message: e
                })
            }
            ,
            this.pageConfigCDNError = e=>{
                this._send("cs.pageConfig.cdn.error", on.ERROR, {
                    message: e
                })
            }
            ,
            this.pageConfigLocalStorageError = (e,t)=>{
                this._send("cs.pageConfig.localStorage.error", on.INFO, {
                    message: e,
                    name: t
                })
            }
            ,
            this.pageConfigUpdated = (e,t)=>{
                this._send("cs.pageConfig.updated", on.INFO, {
                    oldVersion: e,
                    newVersion: t
                })
            }
            ,
            this.settingsPopupTimeout = ()=>{
                this._send("settings.popup.init.timeout", on.WARN)
            }
            ,
            this.settingsUnsupportedShow = e=>{
                this._send("settings.popup.state.unsupported.show", on.INFO, {
                    popupType: e
                })
            }
            ,
            this.gnarClientInitFail = e=>{
                this._send("gnar.bg.tracking.gnar.init.fail", on.WARN, {
                    message: e
                })
            }
            ,
            this.bgTrackingInitFail = ()=>{
                this._send("debug.tracking.init.fail", on.INFO)
            }
            ,
            this.userUpgradeClick = e=>{
                this._send("cs.ui.action.upgradeClick", on.INFO, {
                    placement: e
                })
            }
            ,
            this.gGbUpHookClick = ()=>{
                this._send("cs.ui.gb.uphook.click", on.INFO)
            }
            ,
            this.gButtonClick = ()=>{
                this._send("cs.ui.gbutton.click", on.INFO)
            }
            ,
            this.unexpectedAnonymous = e=>{
                this._send("debug.bg.session.unexpectedAnonymous", on.INFO, e)
            }
            ,
            this.getDapiPropError = (e,t)=>{
                const n = "bg.connection.dapi.getProp.error"
                  , i = Un(n, {
                    statusCode: e,
                    message: t
                });
                this._sendEvent({
                    logger: n,
                    level: on.WARN,
                    extra: {
                        json: i
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.getCheetahStatusError = (e,t)=>{
                const n = "bg.connection.cheetahSettings.getStatus.error"
                  , i = Un(n, {
                    statusCode: e,
                    message: t
                });
                this._sendEvent({
                    logger: n,
                    level: on.WARN,
                    extra: {
                        json: i
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.bgApiServiceRequestSuccess = (e,t="GET",n)=>{
                this.sendFemetricsRate("info", {
                    domain: e,
                    context: n ? "accessToken enabled" : "accessToken not enabled",
                    logger: "bg.api.service.request.success",
                    message: `[${t.toUpperCase()}]`
                })
            }
            ,
            this.bgApiServiceRequestFailed = (e,t="GET",n,i)=>{
                this.sendFemetricsRate("warn", {
                    domain: e,
                    context: i ? "accessToken enabled" : "accessToken not enabled",
                    message: `[${t.toUpperCase()}] ${n}`,
                    logger: "bg.api.service.request.failed"
                })
            }
            ,
            this.setDapiPropError = (e,t)=>{
                const n = "bg.connection.dapi.setProp.error"
                  , i = Un(n, {
                    statusCode: e,
                    message: t
                });
                this._sendEvent({
                    logger: n,
                    level: on.WARN,
                    extra: {
                        json: i
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.toggleExtensionDefs = e=>{
                this._send("bg.settings.definitions.toggle", on.INFO, {
                    enabled: e
                })
            }
            ,
            this.toggleExtension = (e,t,n)=>{
                const i = {
                    enabled: e,
                    placement: t,
                    domain: n
                };
                this._sendEvent({
                    logger: "bg.settings.extension.toggle",
                    level: on.INFO,
                    sendToFemetrics: !0,
                    extra: {
                        json: wn(i)
                    },
                    femetricsExtra: i
                })
            }
            ,
            this.disableUntilNextVisit = ()=>{
                this._send("cs.gbutton.disableUntilNextVisit", on.INFO)
            }
            ,
            this.disableButtonClick = ()=>{
                this._send("cs.gbutton.disableButtonClick", on.INFO)
            }
            ,
            this.cookieOverflow = (e,t)=>{
                this._send("debug.bg.state.cookie.overflow", on.INFO, {
                    size: e,
                    biggestCookie: t
                })
            }
            ,
            this.externalChangePlan = ()=>{
                this._send("bg.api.external.changePlan", on.INFO)
            }
            ,
            this.externalChangeDialect = ()=>{
                this._send("bg.api.external.changeDialect", on.INFO)
            }
            ,
            this.externalChangeUser = ()=>{
                this._send("bg.api.external.changeUsed", on.INFO)
            }
            ,
            this.externalLogout = ()=>{
                this._send("bg.api.external.logout", on.INFO)
            }
            ,
            this.safariLogoutFail = e=>{
                this._sendEvent({
                    logger: "bg.safari.logout.error",
                    level: on.INFO,
                    message: e,
                    sendToFemetrics: !0
                })
            }
            ,
            this.csInitialized = e=>{
                if ("message"in e) {
                    const t = bn();
                    this._sendFemetricsRate("csInitialized", {
                        message: e.message,
                        isIframe: e.isIframe,
                        stage: e.stage,
                        domain: t,
                        context: e.context
                    });
                    const n = ie().buildInfo.version;
                    this._sendEvent({
                        level: on.INFO,
                        logger: "csFailInitializedVersion",
                        extra: {
                            json: JSON.stringify({
                                csVersion: n
                            })
                        }
                    }),
                    this._sendFemetricsRate("csFailInitializedVersion", {
                        csVersion: n
                    }),
                    "facebook.com" === t && this._sendEvent({
                        level: on.INFO,
                        logger: "csInitializedFailed",
                        message: e.message,
                        extra: {
                            json: JSON.stringify({
                                isIframe: e.isIframe,
                                stage: e.stage,
                                url: self.location.href,
                                context: e.context
                            })
                        },
                        hideUserInfo: !0
                    })
                } else
                    this._sendFemetricsRate("csInitialized", e, ["firstInstall", "registrationDate"])
            }
            ,
            this.acceptDataControl = ()=>{
                this._send("bg.dataControl.accepted", on.INFO)
            }
            ,
            this.bgPage = {
                bgStarted: e=>{
                    this._sendFemetricsRate("bgStarted", e),
                    "fail" === e.status && this._sendException({
                        logger: "bg.start.fail",
                        femetricsExtra: {
                            reason: e.reason
                        },
                        level: on.ERROR
                    })(e.error, {
                        reason: e.reason
                    })
                }
                ,
                bgPageStarted: (e,t)=>{
                    this._sendFemetricsRate("bgPageStarted", {
                        context: e,
                        time: t
                    })
                }
                ,
                bgPageInitFail: e=>{
                    this._send("bg.state.init.fail", on.ERROR, {
                        initAttempts: e
                    })
                }
                ,
                bgPageInitTimeout: e=>{
                    this._send("bg.state.start.timeout", on.WARN, {
                        initTime: e
                    })
                }
            },
            this.popup = {
                popupInitFail: (e,t)=>{
                    this._sendEvent({
                        logger: "popup.init.fail",
                        level: on.ERROR,
                        message: e,
                        extra: t,
                        femetricsMessage: Mn(e)
                    })
                }
                ,
                fetchTreatmentsFail: e=>{
                    this._sendFemetricsRate("popupFetchTreatmentsFails", {
                        message: Mn(e)
                    })
                }
                ,
                popupStateInitFail: e=>{
                    this._sendEvent({
                        logger: "popup.state.init.fail",
                        level: on.ERROR,
                        message: e,
                        femetricsMessage: Mn(e)
                    })
                }
                ,
                initSuccess: ()=>{
                    this._sendEvent({
                        logger: "popup.init.success",
                        level: on.INFO,
                        sendToFemetrics: !0
                    })
                }
            },
            this.extensionUpdated = (e,t)=>{
                this._send("bg.state.updated", on.INFO, {
                    currentVersion: e,
                    previousVersion: t
                })
            }
            ,
            this.extensionUpdateFail = e=>{
                this._send("bg.state.update.fail", on.INFO, {
                    previousVersion: e
                })
            }
            ,
            this.cannotGetInstallSource = ()=>{
                this._send("bg.getSource.fail", on.WARN)
            }
            ,
            this.extensionInstall = e=>{
                this._sendEvent({
                    logger: "bg.state.install",
                    level: on.INFO,
                    extra: {
                        json: JSON.stringify({
                            source: e
                        })
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.chromeContentScriptLoadError = (e,t)=>{
                this._send("bg.chrome.cs.load.error", on.WARN, {
                    message: e,
                    type: t
                })
            }
            ,
            this.reloadNotificationShow = ()=>{
                this._send("bg.ui.notification.tabsReload.show", on.WARN)
            }
            ,
            this.reloadNotificationClick = ()=>{
                this._send("bg.ui.notification.tabsReload.click", on.INFO)
            }
            ,
            this.fetchUserFail = (e,t,n,i)=>{
                const r = "bg.user.fetch.fail"
                  , s = Un(r, {
                    body: t,
                    statusCode: n,
                    reason: e,
                    fromAuthRequest: !!i
                });
                this._sendEvent({
                    logger: r,
                    level: on.WARN,
                    extra: {
                        json: s
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.getAccessTokenError = e=>this.sendFemetricsRate("oauthGetAccessTokenError", e),
            this.getAccessTokenSuccess = e=>this.sendFemetricsRate("oauthGetAccessTokenSuccess", e),
            this.initializeAccessTokenSuccess = ()=>this._sendEvent({
                logger: "bg.api.service.getAccessToken",
                message: "initialize access token",
                level: on.INFO
            }),
            this.oauthLogout = e=>this.sendFemetricsRate("oauthLogout", e),
            this.compareUserInUserUpdate = e=>this.sendFemetricsRate("compareUserInUserUpdate", e),
            this.frequentCookieChanges = e=>{
                this._send("debug.cookie.onChange.error", on.INFO, {
                    canceled: e
                })
            }
            ,
            this.initializePropFromDapi = e=>{
                this._send("bg.state.dapi.prop.initialize", on.INFO, {
                    name: e
                })
            }
            ,
            this.onboardingPopupShow = ()=>{
                this._send("cs.onboarding.popup.show", on.INFO)
            }
            ,
            this.onboardingPopupCancel = ()=>{
                this._send("cs.onboarding.popup.cancel", on.INFO)
            }
            ,
            this.onboardingTutorialShow = ()=>{
                this._send("cs.onboarding.tutorial.show", on.INFO)
            }
            ,
            this.loginReminderPopupShow = ()=>{
                this._send("cs.gbutton.popup.loginReminder.show", on.INFO)
            }
            ,
            this.loginReminderBadgeShow = ()=>{
                this._send("bg.state.user.loginReminder.enable", on.INFO)
            }
            ,
            this.loginReminderCanceled = e=>{
                this._sendFelog("bg.state.user.loginReminder.canceled", e, on.ERROR)
            }
            ,
            this.unhandledExceptions = {
                unhandledBgPageException: (e,t)=>{
                    const n = "bg.unhandledException";
                    Cn.error(n, new Error(e), t),
                    this._sendSampledEvent(Nn, {
                        logger: n,
                        level: on.ERROR,
                        message: $n(e),
                        extra: t
                    })
                }
                ,
                unhandledBgPageRejection: (e,t)=>{
                    const n = "bg.unhandledRejection";
                    Cn.error(n, new Error(e), t),
                    this._sendSampledEvent(Nn, {
                        logger: n,
                        level: on.ERROR,
                        message: Hn(e),
                        extra: t
                    })
                }
                ,
                unhandledPopupException: (e,t)=>{
                    const n = "popup.unhandledException";
                    Cn.error(n, new Error(e), t),
                    this._sendEvent({
                        logger: n,
                        level: on.ERROR,
                        message: e,
                        extra: t,
                        femetricsMessage: Mn(e)
                    })
                }
                ,
                unhandledPopupRejection: (e,t)=>{
                    const n = "popup.unhandledRejection";
                    Cn.error(n, new Error(e), t),
                    this._sendEvent({
                        logger: n,
                        level: on.ERROR,
                        message: e,
                        extra: t,
                        femetricsMessage: Mn(e)
                    })
                }
            },
            this.csUnhandled = ({message: e, femetricsExtra: t, error: n, printAsWarning: i})=>{
                const r = "cs.unhandled";
                i ? Cn.warn(r, new Error(e)) : Cn.error(r, new Error(e)),
                this._sendEvent({
                    logger: r,
                    level: i ? on.WARN : on.ERROR,
                    message: e,
                    femetricsExtra: t,
                    sendToFemetrics: !0,
                    extra: n ? En({}, n) : void 0
                })
            }
            ,
            this.csCrash = w(((e,t)=>{
                Cn.error("cs.crash", new Error(e)),
                this._sendEvent({
                    logger: "cs.crash",
                    level: on.ERROR,
                    message: e,
                    femetricsExtra: t
                })
            }
            )),
            this.storageMigrationSucceeded = ()=>{
                this._send("bg.storageMigration.success", on.INFO, {})
            }
            ,
            this.storageMigrationFailed = this._sendException({
                logger: "bg.storageMigration.failure",
                level: on.ERROR
            }),
            this.storageApplyChangesFailed = this._sendException({
                logger: "bg.storage.applyChanges.failure",
                level: on.ERROR
            }),
            this.cardShowAction = ()=>{
                this._sendSampled(On, "cs.editor.card.show", on.INFO)
            }
            ,
            this.cardHideAction = ()=>{
                this._sendSampled(On, "cs.editor.card.hide", on.INFO)
            }
            ,
            this.cardReplacementAction = ()=>{
                this._sendSampled(On, "cs.editor.card.replacement", on.INFO)
            }
            ,
            this.cardAddToDictAction = ()=>{
                this._sendSampled(On, "cs.editor.card.addToDict", on.INFO)
            }
            ,
            this.cardIgnoreAction = ()=>{
                this._sendSampled(On, "cs.editor.card.ignore", on.INFO)
            }
            ,
            this.synonymCardShowAction = e=>{
                this._sendSampled(On, "cs.editor.synonym.show", on.INFO, {
                    notFoundCard: e
                })
            }
            ,
            this.synonymCardHideAction = e=>{
                this._sendSampled(On, "cs.editor.synonym.hide", on.INFO, {
                    notFoundCard: e
                })
            }
            ,
            this.synonymReplacementAction = ()=>{
                this._sendSampled(On, "cs.editor.synonym.replacement", on.INFO)
            }
            ,
            this.dictCardShowAction = ()=>{
                this._sendSampled(On, "cs.editor.dict.show", on.INFO)
            }
            ,
            this.dictCardHideAction = ()=>{
                this._sendSampled(On, "cs.editor.dict.hide", on.INFO)
            }
            ,
            this.couldNotParseTransform = (e,t)=>{
                this._send("cs.cards.transforms.parse.error", on.WARN, {
                    transformHTML: e,
                    fallbackParseSuccessful: t
                })
            }
            ,
            this.disabledTabLoad = e=>{
                this._sendUsage("usage.loadOnDisabledTab", on.INFO, {
                    accountType: e
                })
            }
            ,
            this.disabledTabByUserLoad = e=>{
                this._sendUsage("usage.loadOnDisabledByUserTab", on.INFO, {
                    accountType: e
                })
            }
            ,
            this.initSession = (e,t,n,i)=>{
                this._sendUsage("usage.session.init", on.INFO, {
                    isTopSite: mn(e),
                    accountType: t,
                    fieldType: n,
                    fieldSupported: i
                }),
                this._sendMetric("usage.session.init", {
                    domain: e,
                    accountType: t,
                    fieldType: n,
                    fieldSupported: i
                })
            }
            ,
            this.cardFirstInteraction = (e,t)=>{
                this._sendUsage("usage.card.interaction", on.INFO, {
                    accountType: e,
                    fieldType: t
                })
            }
            ,
            this.gnar = {
                nextPingDateWriteError: e=>this._send("bg.gnarTracker.nextPingDateWriteError", on.ERROR, {
                    error: e
                }),
                sendError: (e,t)=>this._sendException({
                    logger: "bg.gnarTracker.sendError",
                    level: on.ERROR,
                    femetricsExtra: {
                        context: t
                    }
                })(e, {
                    eventName: t
                }),
                trackBeforeSetUser: e=>this._send("bg.gnarTracker.trackBeforeSetUser", on.INFO, {
                    millisSinceInit: e
                }),
                errorSetUser: this._sendException({
                    logger: "bg.gnarTracker.errorSetUser",
                    level: on.ERROR
                })
            },
            this._sendGdocsPageExecutionException = this._sendException({
                logger: "cs.gdocs.pageExecution.exception",
                level: on.ERROR
            }),
            this.gdocs = {
                nonDocumentPage: e=>{
                    this._sendEvent({
                        logger: "cs.gdocs.canvas.nonDocumentPage",
                        level: on.WARN,
                        sendToFemetrics: !0,
                        femetricsMessage: `isViewMode: ${e.isViewMode}`,
                        femetricsExtra: {
                            context: e.pageType
                        }
                    })
                }
                ,
                pageExecutionException: (e,t)=>this._sendGdocsPageExecutionException(e, {
                    isGDocsCanvas: t
                }),
                disabledBeforeForceEnable: w((e=>this._send("cs.gdocs.disabledBeforeForceEnable", on.INFO, {
                    disabledDate: e
                }))),
                enabledBeforeForceEnable: w((()=>this._send("cs.gdocs.enabledBeforeForceEnable", on.INFO))),
                replacementValidation: e=>{
                    this._sendFemetricsRate("gdocsReplacementValidation", e)
                }
                ,
                replacementSelectionErrorInfo: e=>{
                    this._sendFemetricsRate("gdocsReplacementSelectionErrorInfo", e)
                }
                ,
                eventTargetFail: w(this._sendException({
                    logger: "cs.gdocs.eventTargetFail",
                    level: on.ERROR
                })),
                sidebarFail: w(((e,t)=>this._sendException({
                    logger: "cs.gdocs.getSidebarFail",
                    level: on.ERROR
                })(e, {
                    type: t
                }))),
                layoutTreeAvailability: e=>{
                    this.sendFemetricsRate("gdocsInternalsLayoutTreeAvailability", e)
                }
            },
            this.canvasGdocs = {
                injectedException: w(this._sendException({
                    logger: "cs.gdocs.canvas.injected.exception",
                    level: on.ERROR
                })),
                injectedError: E(((e,t,n,i)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.injected.error",
                    level: on.ERROR,
                    message: t,
                    extra: {
                        json: wn({
                            context: e,
                            data: n
                        })
                    },
                    gdocsExtra: i,
                    femetricsExtra: {
                        context: e
                    }
                })), (e=>e)),
                injectedInfo: E(((e,t,n)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.injected.info",
                    eventContext: e,
                    level: on.INFO,
                    sendToFemetrics: !0,
                    gdocsExtra: t,
                    extra: {
                        json: wn({
                            context: e,
                            data: n
                        })
                    },
                    femetricsExtra: {
                        context: e
                    }
                })), (e=>e)),
                initializationException: w(((e,t,n)=>this._sendException({
                    logger: "cs.gdocs.canvas.init.exception",
                    level: on.ERROR,
                    gdocsExtra: n,
                    femetricsExtra: {
                        type: t
                    }
                })(e, {
                    type: t
                }))),
                initializationTimeout: w(((e,t,n)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.init.timeout",
                    level: on.ERROR,
                    message: `Initialization for ${t} timeout: ${e}ms`,
                    extra: {
                        json: wn({
                            type: t
                        })
                    },
                    gdocsExtra: n,
                    femetricsExtra: {
                        type: t
                    }
                }))),
                creatingException: w(((e,t)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.creating.exception",
                    level: on.ERROR,
                    message: e,
                    gdocsExtra: t
                }))),
                initInterrupted: w((e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.interrupted",
                    level: on.ERROR,
                    message: "Interrupted",
                    gdocsExtra: e
                }))),
                dataSourceException: w(((e,t)=>this._sendException({
                    logger: "cs.gdocs.canvas.dataSource.exception",
                    level: on.ERROR,
                    femetricsExtra: {
                        type: t
                    }
                })(e, {
                    type: t
                }))),
                error: E(((e,t,n,i,r)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.error",
                    level: on.ERROR,
                    message: t,
                    extra: En({
                        type: e,
                        message: t,
                        data: i
                    }, n),
                    femetricsExtra: {
                        type: e,
                        mappingName: null == r ? void 0 : r.mappingName
                    }
                })), (e=>e), ((e,t,n,i,r)=>{
                    this._sendFemetricsRate("gdocsError", {
                        type: e,
                        message: t && t.substring(0, 20) || "other",
                        mappingName: null == r ? void 0 : r.mappingName,
                        selectionDiff: "selectionService" === e ? null == i ? void 0 : i.selectionDiff : void 0
                    })
                }
                )),
                warning: E(((e,t,n)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.warning",
                    level: on.WARN,
                    message: t,
                    extra: En({
                        type: e,
                        message: t,
                        data: n
                    })
                })), (e=>e)),
                trackSessionFinalResult: w(((e,t)=>this._sendEvent({
                    logger: "cs.gdocs.canvas.start.result",
                    level: on.INFO,
                    gdocsExtra: t,
                    sendToFemetrics: !0,
                    femetricsExtra: {
                        type: e
                    }
                }))),
                started: e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.started",
                    level: on.INFO,
                    sendToFemetrics: !0,
                    gdocsExtra: e
                }),
                creating: e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.creating",
                    level: on.INFO,
                    sendToFemetrics: !0,
                    gdocsExtra: e
                }),
                showLongDocPopup: e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.longDocPopup",
                    level: on.INFO,
                    sendToFemetrics: !0,
                    gdocsExtra: e
                }),
                showSharedDocPopup: e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.sharedDocPopup",
                    level: on.INFO,
                    sendToFemetrics: !0,
                    gdocsExtra: e
                }),
                debugPageSearchFail: w((e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.pageSearch.debug",
                    level: on.INFO,
                    extra: {
                        json: wn({
                            data: e
                        })
                    }
                }))),
                debugMappingFail: w((e=>this._sendEvent({
                    logger: "cs.gdocs.canvas.mapping.debug",
                    level: on.INFO,
                    extra: {
                        json: wn({
                            data: e
                        })
                    }
                }))),
                buildTextMapPerf: this._createPerfLogger("cs.gdocs.canvas.perf.textMap", 30),
                findPage: this._createPerfLogger("cs.gdocs.canvas.perf.findPage", 100),
                mappingPerf: e=>new _n((t=>{
                    1e-4 > Math.random() && this._sendFemetricsTimer("gdocsMapping", t, {
                        ...e,
                        mapPageCount: Ln.getMapPageCount(e)
                    })
                }
                )),
                fullTextNotFound: w((()=>this._send("cs.gdocs.canvas.fullTextNotFound", on.WARN))),
                equationsRenderInfo: e=>{
                    this._sendFemetricsRate("gdocsEquationsRenderInfo", e)
                }
                ,
                mapping: ({mapPageCount: e, attempts: t, mappingName: n, mode: i, tableMode: r, partialRenderMode: s, renderRTL: o})=>{
                    this._sendFemetricsRate("gdocsMapping", {
                        mappingMode: i,
                        mappingName: n,
                        tableMode: r,
                        mapPageCount: e > 5 ? "5+" : e,
                        mappingAttempts: t.length,
                        partialRenderMode: s,
                        renderRTL: o,
                        ...t.reduce(((e,t,n)=>({
                            ...e,
                            [`mapping${n}_name`]: t.name,
                            [`mapping${n}_success`]: t.success,
                            [`mapping${n}_mappedPages`]: "number" == typeof t.mappedPageCount && t.mappedPageCount > 5 ? "5+" : t.mappedPageCount
                        })), {})
                    })
                }
                ,
                mappingFailedInfo: e=>{
                    this._sendFemetricsRate("gdocsMappingFailedInfo", e)
                }
                ,
                mappings: {
                    advanced: {
                        byFeatures: ({mapPageCount: e, injectedFeatures: t, ...n})=>{
                            this._sendFemetricsRate("gdocs.mapping.advanced.byFeatures", {
                                ...n,
                                ...Wn(t),
                                mapPageCount: e > 5 ? "5+" : e
                            }, ["os"])
                        }
                        ,
                        textCoverage: e=>{
                            this._sendFemetricsRate("gdocs.mapping.advanced.coverage", e)
                        }
                        ,
                        textCoverageShort: e=>{
                            this._sendFemetricsRate("gdocs.mapping.advanced.coverage.short", e)
                        }
                    }
                },
                mappingStats: e=>{
                    this._sendFemetricsRate("gdocsMappingStats", e, ["os"])
                }
                ,
                mappingPageStats: e=>{
                    this._sendFemetricsRate("gdocsMappingPageStats", e, ["os"])
                }
                ,
                mappingStatsByTextLength: e=>{
                    this._sendFemetricsRate("gdocsMappingStatsByTextLength", e, ["os"])
                }
                ,
                mappingPageStatsByTextLength: e=>{
                    this._sendFemetricsRate("gdocsMappingPageStatsByTextLength", e, ["os"])
                }
                ,
                mappingStatsByTableMode: e=>{
                    this._sendFemetricsRate("gdocsMappingStatsByTableMode", e, ["os"])
                }
                ,
                mappingPageStatsByTableMode: e=>{
                    this._sendFemetricsRate("gdocsMappingPageStatsByTableMode", e, ["os"])
                }
                ,
                mappingMinPageGapsStats: e=>{
                    this._sendFemetricsRate("gdocsMappingMinPageGapsStats", e, ["os"])
                }
                ,
                mappingMaxPageGapsStats: e=>{
                    this._sendFemetricsRate("gdocsMappingMaxPageGapsStats", e, ["os"])
                }
                ,
                mappingSearchStats: e=>{
                    this._sendFemetricsRate("gdocsMappingSearchStats", e, ["os"])
                }
                ,
                partialMappingByPageExperimentUsage: e=>{
                    this._sendFemetricsRate("gdocsPartialMappingByPageExperimentUsage", e, ["os"])
                }
                ,
                atmMappingPerformance: e=>{
                    this._sendFemetricsRate("gdocsATMMappingPerformance", e, ["os"])
                }
                ,
                selectionPatched: e=>{
                    this._sendFemetricsRate("gdocsSelectionPatched", e)
                }
                ,
                trackFatalPopup: (e,t)=>{
                    this._sendFemetricsRate("gdocsTrackFatalPopup", {
                        reason: (null == e ? void 0 : e.isBrowserExtFault) ? "extension" : "google",
                        content: String(null == e ? void 0 : e.textContent).slice(0, 10),
                        context: t ? "started" : "notStarted"
                    })
                }
            },
            this.gmailThreadContext = {
                warning: E(((e,t,n)=>this._sendEvent({
                    logger: "cs.threadContext.gmail.warning",
                    level: on.WARN,
                    message: t,
                    extra: {
                        json: wn({
                            type: e,
                            message: t,
                            data: n
                        })
                    }
                })), (e=>e))
            },
            this.autoFix = {
                featureToggleClick: (e,t)=>{
                    this._sendFemetricsRate("autoFixFeatureToggleClick", {
                        autoFixFeatureState: e,
                        autoFixFeatureTogglePlacement: t
                    })
                }
                ,
                attemptToApplyInParallel: e=>{
                    this._sendFemetricsRate("autoFixAttemptToApplyInParallel", {
                        autoAlerApplierVersion: e
                    })
                }
                ,
                attemptToApplyInParallelError: w(((e,t)=>this._sendEvent({
                    logger: "cs.autoFix.attemptToApplyInParallelError",
                    level: on.ERROR,
                    sendToFemetrics: !0,
                    autoFixExtra: {
                        domain: e,
                        autoAlerApplierVersion: t
                    }
                })))
            },
            this.autoApply = {
                inconsistentRevertAlertError: w(((e,t)=>this._sendEvent({
                    logger: "cs.autoApply.inconsistentRevertAlert",
                    level: on.ERROR,
                    sendToFemetrics: !0,
                    autoApplyExtra: {
                        domain: e,
                        pname: t
                    }
                }))),
                triggered: ()=>{
                    this._sendFemetricsRate("autoApplyTriggered")
                }
                ,
                cardLooked: ()=>{
                    this._sendFemetricsRate("autoApplyCardLooked")
                }
                ,
                revertClick: ()=>{
                    this._sendFemetricsRate("autoApplyRevertClick")
                }
                ,
                reverted: ()=>{
                    this._sendFemetricsRate("autoApplyReverted")
                }
                ,
                affectedByTextChange: ()=>{
                    this._sendFemetricsRate("autoApplyAffectedByTextChange")
                }
                ,
                acceptClick: ()=>{
                    this._sendFemetricsRate("autoApplyAcceptClick")
                }
                ,
                settingsClick: e=>{
                    this._sendFemetricsRate("autoApplySettingsClick", {
                        autoApplySettingsMenuState: e
                    })
                }
                ,
                turnOffUntilNextView: ()=>{
                    this._sendFemetricsRate("autoApplyTurnOffUntilNextView")
                }
                ,
                integrationCreated: ()=>{
                    this._sendFemetricsRate("autoApplyIntegrationCreated")
                }
            },
            this.knowledgeHub = {
                error: E(((e,t,n,i)=>this._sendEvent({
                    logger: "cs.knowledgeHub.error",
                    level: on.ERROR,
                    message: t,
                    extra: {
                        json: wn({
                            type: e,
                            message: t,
                            domain: n,
                            data: i
                        })
                    }
                })), (e=>e)),
                integrationCreated: (e,t)=>{
                    this._sendFemetricsRate("knowledgeHubIntegrationCreated", {
                        site: e,
                        integrationMode: t
                    })
                }
                ,
                relatedMaterialsClick: e=>{
                    this._sendFemetricsRate("knowledgeHubRelatedMaterialsClick", {
                        site: e
                    })
                }
                ,
                pointPeopleClick: (e,t)=>{
                    this._sendFemetricsRate("knowledgeHubPointPeopleClick", {
                        site: e,
                        pointPeopleClickType: t
                    })
                }
                ,
                descriptionCopyClick: e=>{
                    this._sendFemetricsRate("knowledgeHubDescriptionCopyClick", {
                        site: e
                    })
                }
                ,
                suggestEditButtonClick: e=>{
                    this._sendFemetricsRate("knowledgeHubSuggestEditButtonClick", {
                        site: e
                    })
                }
                ,
                featureToggleClick: (e,t)=>{
                    this._sendFemetricsRate("knowledgeHubFeatureToggleClick", {
                        site: e,
                        featureState: t
                    })
                }
                ,
                bgApiError: (e,t)=>{
                    const n = "bg.knowledgeHub.error"
                      , i = Un(n, {
                        statusCode: e,
                        message: t
                    });
                    this._sendEvent({
                        logger: n,
                        level: on.ERROR,
                        extra: {
                            json: i
                        },
                        sendToFemetrics: !0
                    })
                }
                ,
                onboardingPopupShow: (e,t)=>{
                    this._sendFemetricsRate("knowledgeHubOnboardingPopupShow", {
                        onboardingType: e,
                        site: t
                    })
                }
                ,
                onboardingNextButtonClick: (e,t,n)=>{
                    this._sendFemetricsRate("knowledgeHubOnboardingNextButtonClick", {
                        onboardingType: e,
                        site: t,
                        step: n
                    })
                }
                ,
                onboardingSkipButtonClick: (e,t,n)=>{
                    this._sendFemetricsRate("knowledgeHubOnboardingSkipButtonClick", {
                        onboardingType: e,
                        site: t,
                        step: n
                    })
                }
                ,
                onboardingCloseButtonClick: (e,t,n)=>{
                    this._sendFemetricsRate("knowledgeHubOnboardingCloseButtonClick", {
                        onboardingType: e,
                        site: t,
                        step: n
                    })
                }
            },
            this._cbLog = e=>E(((t,n,i,r)=>this._sendEvent({
                logger: "cs.citationBuilder",
                level: e,
                citationBuilderExtra: i,
                message: n,
                extra: En(void 0, r)
            })), (e=>e)),
            this.citationBuilder = {
                error: this._cbLog(on.ERROR),
                warning: this._cbLog(on.WARN),
                info: this._cbLog(on.INFO)
            },
            this.performance = {
                processInput: this._createPerfLogger("cs.fluid.processInput", 100),
                processAlerts: this._createPerfLogger("cs.fluid.processAlerts", 10),
                processFilterChange: this._createPerfLogger("cs.fluid.processFilterChange", 10),
                csInitialized: (e,t,n,i,r)=>{
                    this._createPerfLogger("cs.initialized").custom({
                        _tag: hn.Data.Tagged.Types.csInit,
                        domain: self.location.host,
                        hideUserInfo: !0,
                        loadTime: e,
                        initTime: t,
                        pageLoadTime: n,
                        injectTime: i,
                        error: r ? {
                            message: r.message,
                            stack: r.stack
                        } : void 0
                    })
                }
                ,
                viewInjection: e=>{
                    this._createPerfLogger("cs.viewInjection").custom({
                        _tag: hn.Data.Tagged.Types.viewInjection,
                        ...e
                    })
                }
            },
            this.autocorrect = {
                responseTime: this._createPerfLogger("cs.autocorrect.responseTime", 10),
                predictTime: this._createPerfLogger("cs.autocorrect.predictTime", 10),
                integrationCreated: ()=>{
                    this._sendFemetricsRate("autoCorrectIntegrationCreated")
                }
                ,
                triggered: ()=>{
                    this._sendFemetricsRate("autoCorrectTriggered")
                }
                ,
                cardLooked: ()=>{
                    this._sendFemetricsRate("autoCorrectCardLooked")
                }
                ,
                revertClick: ()=>{
                    this._sendFemetricsRate("autoCorrectRevertClick")
                }
                ,
                reverted: ()=>{
                    this._sendFemetricsRate("autoCorrectReverted")
                }
                ,
                acceptClick: ()=>{
                    this._sendFemetricsRate("autoCorrectAcceptClick")
                }
                ,
                settingsClick: e=>{
                    this._sendFemetricsRate("autoCorrectSettingsClick", {
                        autoCorrectSettingsMenuState: e
                    })
                }
                ,
                turnOffUntilNextView: ()=>{
                    this._sendFemetricsRate("autoCorrectTurnOffUntilNextView")
                }
                ,
                affectedByTextChange: ()=>{
                    this._sendFemetricsRate("autoCorrectAffectedByTextChange")
                }
            },
            this.assistant = {
                initTime: this._createPerfLogger("cs.assistant.initTime", 1),
                renderTime: this._createPerfLogger("cs.assistant.renderTime", 1),
                openTime: this._createPerfLogger("cs.assistant.openTime", 1),
                alertManagerError: this._sendException({
                    logger: "cs.assistant.alertManagerError",
                    level: on.ERROR
                })
            },
            this.proofit = {
                availabilityQuotaError: e=>{
                    this._sendEvent({
                        logger: "cs.proofit.availability_quota_error",
                        level: on.ERROR,
                        extra: {
                            json: JSON.stringify(e)
                        }
                    })
                }
                ,
                submitResponseError: e=>{
                    this._sendEvent({
                        logger: "cs.proofit.submit_response_error",
                        level: on.ERROR,
                        extra: {
                            json: JSON.stringify(e)
                        }
                    })
                }
                ,
                progressError: e=>{
                    this._sendEvent({
                        logger: "cs.proofit.progress_error",
                        level: on.ERROR,
                        extra: {
                            json: JSON.stringify(e)
                        }
                    })
                }
                ,
                progressRejected: e=>{
                    this._sendEvent({
                        logger: "cs.proofit.progress_rejected",
                        level: on.WARN,
                        extra: {
                            json: JSON.stringify(e)
                        }
                    })
                }
            },
            this.oauthExchangeError = e=>{
                this._send("bg.oauth.exchange.error", on.ERROR, {
                    message: e
                })
            }
            ,
            this.chipmunkAPIError = e=>{
                this._send("bg.chipmunk.api.error", on.ERROR, {
                    message: e
                })
            }
            ,
            this.getIterableError = e=>{
                this._sendEvent({
                    logger: "bg.iterable.api.error",
                    level: on.WARN,
                    extra: {
                        json: e
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.getMiseError = e=>{
                this._sendEvent({
                    logger: "bg.mise.api.token.error",
                    level: on.WARN,
                    extra: {
                        json: e
                    },
                    sendToFemetrics: !0
                })
            }
            ,
            this.alerts = {
                inconsistentAlertWithText: (e,t)=>{
                    this._sendFemetricsRate("inconsistentAlertWithText", {
                        context: e,
                        source: t
                    })
                }
                ,
                cannotShowInlineCard: (e,t)=>{
                    this._sendFemetricsRate("cannotShowInlineCard", {
                        context: e,
                        domain: bn(t)
                    })
                }
                ,
                showInlineCard: e=>{
                    this._sendFemetricsRate("showInlineCard", {
                        domain: bn(e)
                    })
                }
            },
            this.upgradeHooks = {
                showUpgradeHook: (e,t,n)=>{
                    this._sendFemetricsRate("showPremiumButton", {
                        upgradeHookName: e,
                        upgradeHookSlot: t,
                        upgradeHookVariant: n
                    })
                }
                ,
                clickUpgradeHook: (e,t,n)=>{
                    this._sendFemetricsRate("clickPremiumButton", {
                        upgradeHookName: e,
                        upgradeHookSlot: t,
                        upgradeHookVariant: n
                    })
                }
            },
            this.upgradeHooksExp = {
                upgradeHookExperimentPeek: (e,t,n)=>{
                    this._sendFemetricsRate("upgradeHookExperiment", {
                        experimentName: e,
                        experimentGroup: t,
                        domain: bn(n)
                    })
                }
                ,
                upgradeHookFirstHiddenPremiumAlertReceived: (e,t,n)=>{
                    this._sendFemetricsRate("upgradeHookFirstHiddenPremiumAlertReceived", {
                        experimentName: e,
                        experimentGroup: t,
                        domain: bn(n)
                    })
                }
                ,
                upgradeHookFirstSDUIReceivedFromCAPI: (e,t,n)=>{
                    this._sendFemetricsRate("upgradeHookFirstSDUIReceivedFromCAPI", {
                        experimentName: e,
                        experimentGroup: t,
                        domain: bn(n)
                    })
                }
                ,
                upgradeHookFeedRendered: (e,t,n)=>{
                    this._sendFemetricsRate("upgradeHookFeedRenderedWithUpgradeCard", {
                        experimentName: e,
                        experimentGroup: t,
                        domain: bn(n)
                    })
                }
                ,
                upgradeHookCardShown: (e,t,n)=>{
                    this._sendFemetricsRate("upgradeHookCardShown", {
                        experimentName: e,
                        experimentGroup: t,
                        domain: bn(n)
                    })
                }
            },
            this.sendToTabFailed = (e,t)=>{
                this._sendSampledEvent(Nn, {
                    logger: "bg.connection.sendToTabFailed",
                    level: on.ERROR,
                    message: "send message to tab emit an error",
                    extra: En(e, t)
                })
            }
            ,
            this.debugReports = {
                downloadSuccessfully: (e,t)=>{
                    const n = "debugReports.downloadSuccessfully"
                      , i = Un(n, {
                        envContext: e,
                        downloadEnvContext: t
                    });
                    this._sendEvent({
                        logger: n,
                        level: on.INFO,
                        extra: {
                            json: i
                        },
                        sendToFemetrics: !0
                    })
                }
                ,
                downloadTimeout: (e,t)=>{
                    const n = "debugReports.downloadTimeout"
                      , i = Un(n, {
                        envContext: e,
                        downloadEnvContext: t
                    });
                    this._sendEvent({
                        logger: n,
                        level: on.WARN,
                        extra: {
                            json: i
                        },
                        sendToFemetrics: !0
                    })
                }
                ,
                downloadError: (e,t)=>{
                    const n = "debugReports.downloadError"
                      , i = Un(n, {
                        envContext: e,
                        downloadEnvContext: t
                    });
                    this._sendEvent({
                        logger: n,
                        level: on.WARN,
                        extra: {
                            json: i
                        },
                        sendToFemetrics: !0
                    })
                }
            },
            this.dialectSettingsError = e=>{
                this._sendException({
                    logger: "bg.api.dialectService",
                    level: on.ERROR
                })(e)
            }
            ,
            this.debugSelectiveLogoutGate = ()=>{
                this._sendEvent({
                    logger: "bg.user.debugSelectiveLogoutGate",
                    level: on.INFO
                })
            }
            ,
            this.logoutSuccess = (e,t)=>{
                this._sendEvent({
                    logger: "bg.user.logoutSuccess",
                    level: on.INFO,
                    extra: {
                        json: JSON.stringify({
                            oauth2ApiGate: e,
                            reason: t
                        })
                    }
                })
            }
            ,
            this.logoutError = e=>{
                this._sendException({
                    logger: "bg.user.logout",
                    level: on.ERROR
                })(e)
            }
            ,
            this.logoutLastAuthnEventError = e=>{
                this._sendException({
                    logger: "bg.user.logout.lastAuthnEvent",
                    level: on.ERROR
                })(e)
            }
            ,
            this.serializeTransportMsgFailed = ()=>{
                this._sendFemetricsRate("error", {
                    logger: "bg.serialize.transport.message.failed",
                    level: on.ERROR,
                    message: "Failed to serialize rpc message"
                })
            }
            ,
            this.hiddenFieldInjectionFailed = ()=>{
                this._sendFemetricsRate("error", {
                    logger: "cs.hiddenField.injection.failed",
                    level: on.ERROR,
                    domain: bn()
                })
            }
            ,
            this.skipIntegrationForNonHtmlPage = ()=>{
                this._sendFemetricsRate("info", {
                    logger: "cs.skip.integration.for.non.html.page",
                    domain: Vn(self.location.hostname)
                })
            }
            ,
            this.backendManagedStorage = {
                error: (e,t)=>{
                    this._sendException({
                        logger: "bg.backendManagedStorage",
                        level: on.ERROR
                    })(t, void 0, e)
                }
                ,
                warn: (e,t)=>{
                    const n = Un("backendManagedStorage.warn", t);
                    this._sendEvent({
                        logger: "bg.backendManagedStorage",
                        level: on.WARN,
                        message: e,
                        extra: {
                            json: n
                        }
                    })
                }
                ,
                info: e=>{
                    this._sendEvent({
                        logger: "bg.backendManagedStorage",
                        level: on.INFO,
                        message: e
                    })
                }
            },
            this.cookiesAccessibility = {
                enabled: ()=>{
                    this.sendFemetricsRate("cookiesAccessibility", {
                        enabled: !0
                    }, ["os", "osVersion", "userOrganizationType"])
                }
                ,
                disabled: (e,t)=>{
                    this.sendFemetricsRate("cookiesAccessibility", {
                        enabled: !1,
                        reason: e
                    }, ["os", "osVersion", "userOrganizationType"]),
                    t && this._sendEvent({
                        logger: "bg.cookiesInaccessibile",
                        level: on.ERROR,
                        message: t
                    })
                }
            },
            this.replacement = {
                info: e=>{
                    this.sendFemetricsRate("replacementInfo", e, ["os", "userOrganizationType"])
                }
                ,
                infoShort: e=>{
                    this.sendFemetricsRate("replacementInfoShort", e)
                }
                ,
                infoShortExtended: e=>{
                    this.sendFemetricsRate("replacementInfoShortExtended", e)
                }
                ,
                format: {
                    short: e=>{
                        this.sendFemetricsRate("replacementInfo.format.short", e)
                    }
                    ,
                    alert: e=>{
                        this.sendFemetricsRate("replacementInfo.format.alert", e)
                    }
                    ,
                    style: e=>{
                        this.sendFemetricsRate("replacementInfo.format.style", e)
                    }
                    ,
                    hyperlinks: e=>{
                        this.sendFemetricsRate("replacementInfo.format.hyperlinks", e)
                    }
                    ,
                    smartChips: e=>{
                        this.sendFemetricsRate("replacementInfo.format.smartChips", e)
                    }
                    ,
                    footnotes: e=>{
                        this.sendFemetricsRate("replacementInfo.format.footnotes", e)
                    }
                },
                gOSInfo: e=>{
                    this.sendFemetricsRate("replacementInfo.gOS", e)
                }
                ,
                gdocs: (e,t)=>{
                    this.sendFemetricsRate("replacementInfo.gdocs", e, ["os"]);
                    for (const [n,i] of t)
                        this.sendFemetricsRate(`replacementInfo.gdocs.byGate.${n}`, {
                            ...e,
                            enabled: i
                        }, ["os"])
                }
                ,
                gdocsByFeatures: ({injectedFeatures: e, ...t})=>{
                    this.sendFemetricsRate("replacementInfo.gdocs.advanced.byFeatures", {
                        ...t,
                        ...Wn(e),
                        hasLayout: void 0
                    }, ["os"])
                }
                ,
                contentEditable: e=>{
                    this.sendFemetricsRate("replacementInfo.contentEditable", e)
                }
                ,
                sessionCount: e=>{
                    this.sendFemetricsRate("replacementSessionCount", e)
                }
                ,
                sessionStats: e=>{
                    this.sendFemetricsRate("replacementSessionStats", e)
                }
                ,
                sessionStatsBySource: e=>{
                    this.sendFemetricsRate("replacementSessionStatsBySource", e)
                }
                ,
                sessionStatsByReplacementType: e=>{
                    this.sendFemetricsRate("replacementSessionStatsByReplacementType", e)
                }
                ,
                alert: e=>{
                    this.sendFemetricsRate("replacementInfo.alert", e)
                }
                ,
                alertExtended: e=>{
                    this.sendFemetricsRate("replacementInfo.alertExtended", e)
                }
            },
            this.gOS = {
                info: (e,t,n)=>{
                    this._sendEvent({
                        logger: `gOS.${e}`,
                        level: on.INFO,
                        message: t,
                        extra: n
                    })
                }
                ,
                warn: (e,t,n)=>{
                    this._sendEvent({
                        logger: `gOS.${e}`,
                        level: on.WARN,
                        message: t,
                        extra: n
                    })
                }
                ,
                error: (e,t,n)=>{
                    this._sendEvent({
                        logger: `gOS.${e}`,
                        level: on.ERROR,
                        message: t,
                        extra: En(n)
                    })
                }
            }
        }
        _send(e, t, n) {
            const i = Un(e, n);
            try {
                this._sendFelog(e, String(null == n ? void 0 : n.message), t, n ? {
                    json: i
                } : void 0)
            } catch (t) {
                Cn.warn(`Failed to send felog for ${e}: '${an(t) ? t.message : "undefined"}'`, t)
            }
        }
        _sendUsage(e, t, n) {
            if (this._sendUsageMetrics && this._sendUsageMetricsSamplingRatio > Math.random())
                try {
                    this._sendFelogUsage(e, "", t, n)
                } catch (t) {
                    Cn.warn(`Failed to send usage felog for ${e}: '${an(t) ? t.message : "undefined"}'`, t)
                }
        }
        _sendSampled(e, t, n, i) {
            e > Math.random() && this._send(t, n, i)
        }
        _sendSampledEvent(e, t) {
            e > Math.random() && this._sendEvent(t)
        }
        _sendMetric(e, t) {
            this._sendFelogMetricEvent({
                metricName: e,
                data: t
            })
        }
        sendCrashLogs(e, t) {
            try {
                this._sendFelogCrashLogs(t)
            } catch (t) {
                Cn.warn(`Failed to send crash data data for ${e}: '${an(t) ? t.message : "undefined"}'`, t)
            }
        }
        setUserInfo(e) {
            this._setUserInfo(e)
        }
        setContainerId(e) {
            this._setContainerId(e)
        }
        enableDataSharing() {
            this._enableDataSharing()
        }
        notificationShown(e) {
            this._send("cs.notification.show", on.INFO, {
                type: e
            })
        }
        notificationHide(e) {
            this._send("cs.notification.hide", on.INFO, {
                type: e
            })
        }
    }
    var Bn, jn;
    function Hn(e) {
        return e ? "Failed to fetch" === e ? Bn.FAILED_FETCH : "Could not establish connection. Receiving end does not exist." === e || e.includes("No frame with id") || e.includes("No tab with id") || e.startsWith("Frame with ID") && e.endsWith("was removed.") ? Bn.TAB_NOT_EXISTS : e.startsWith("IO error:") ? Bn.IO_ERROR : "The browser is shutting down." === e ? Bn.BROWSER_SHUTTING_DOWN : "No available storage method found." === e ? Bn.NO_STORAGE_METHOD_FOUND : "this._firefox is undefined" === e ? Bn.FIREFOX_UNDEFINED : "Load failed" === e ? Bn.LOAD_FAILED : "Unexpected user type for login reminder" === e ? Bn.UNEXPECTED_USER_TYPE : Bn.OTHER : Bn.EMPTY
    }
    function $n(e) {
        return e ? e.includes("executing a cancelled action") ? jn.ACTION_CANCELED : "Script error." === e ? jn.SCRIPT_ERROR : "object unsubscribed" === e ? jn.OBJECT_UNSUBSCRIBED : e.includes("is not a function") ? jn.INVALID_FUNCTION : jn.OTHER : jn.EMPTY
    }
    function Vn(e) {
        const t = t=>e.endsWith(t)
          , n = bn(e);
        if ("other" === n) {
            const e = ["pubmatic.com", "quantumdex.io", "gumgum.com", "aniview.com", "amazon-adsystem", "nextmillmedia.com", "doubleclick.net", "adsrvr.org", "adnxs.com", "msn.com"].find(t);
            if (e)
                return e
        }
        return n
    }
    function Wn(e) {
        return {
            strikethrough: e.useStrikethroughFiltering,
            codeBlocks: e.useCodeBlockFiltering
        }
    }
    !function(e) {
        let t;
        !function(e) {
            e.fromPartial = e=>e
        }(t = e.Mock || (e.Mock = {}))
    }(Dn || (Dn = {})),
    function(e) {
        e.FAILED_FETCH = "FailedToFetch",
        e.TAB_NOT_EXISTS = "TabNotExists",
        e.IO_ERROR = "IOError",
        e.BROWSER_SHUTTING_DOWN = "BrowserShuttingDown",
        e.FIREFOX_UNDEFINED = "FirefoxUndefined",
        e.LOAD_FAILED = "LoadFailed",
        e.UNEXPECTED_USER_TYPE = "UnexpectedUserType",
        e.NO_STORAGE_METHOD_FOUND = "NoStorageMethodFound",
        e.EMPTY = "Empty",
        e.OTHER = "Other"
    }(Bn || (Bn = {})),
    function(e) {
        e.ACTION_CANCELED = "ActionCanceled",
        e.SCRIPT_ERROR = "ScriptError",
        e.OBJECT_UNSUBSCRIBED = "ObjectUnsubscribed",
        e.INVALID_FUNCTION = "InValidFunction",
        e.EMPTY = "Empty",
        e.OTHER = "Other"
    }(jn || (jn = {}));
    jt.create("lib.tracking.logger");
    let Gn;
    function qn() {
        if (!Gn) {
            const e = Yt().telemetryCallProvider;
            Gn = new Dn(e.sendFelog,e.sendFelogUsageEvent,e.setUserInfo,e.setContainerId,ie().appConfig.felog.sendUsageMetrics,function() {
                ie().appConfig.felog.sendPerfMetricsType,
                0;
                return
            }(),e.sendFelogEvent,e.sendFelogCrashLogs,void 0,(()=>{
                var t;
                return null === (t = e.enableDataSharing) || void 0 === t ? void 0 : t.call(e)
            }
            ),void 0,e.sendFelogMetricEvent,e.sendFemetricsRate,e.startFemetricsTimer,e.endFemetricsTimer,e.sendFemetricsTimer)
        }
        return Gn
    }
    function zn(e, t) {
        return function(n) {
            if ("function" != typeof e)
                throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
            return n.lift(new Kn(e,t))
        }
    }
    var Kn = function() {
        function e(e, t) {
            this.project = e,
            this.thisArg = t
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new Jn(e,this.project,this.thisArg))
        }
        ,
        e
    }()
      , Jn = function(e) {
        function t(t, n, i) {
            var r = e.call(this, t) || this;
            return r.project = n,
            r.count = 0,
            r.thisArg = i || r,
            r
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            var t;
            try {
                t = this.project.call(this.thisArg, e, this.count++)
            } catch (e) {
                return void this.destination.error(e)
            }
            this.destination.next(t)
        }
        ,
        t
    }(He);
    function Yn(e, t, n, i) {
        return Ae(n) && (i = n,
        n = void 0),
        i ? Yn(e, t, n).pipe(zn((function(e) {
            return Le(e) ? i.apply(void 0, e) : i(e)
        }
        ))) : new qe((function(i) {
            Xn(e, t, (function(e) {
                arguments.length > 1 ? i.next(Array.prototype.slice.call(arguments)) : i.next(e)
            }
            ), i, n)
        }
        ))
    }
    function Xn(e, t, n, i, r) {
        var s;
        if (function(e) {
            return e && "function" == typeof e.addEventListener && "function" == typeof e.removeEventListener
        }(e)) {
            var o = e;
            e.addEventListener(t, n, r),
            s = function() {
                return o.removeEventListener(t, n, r)
            }
        } else if (function(e) {
            return e && "function" == typeof e.on && "function" == typeof e.off
        }(e)) {
            var a = e;
            e.on(t, n),
            s = function() {
                return a.off(t, n)
            }
        } else if (function(e) {
            return e && "function" == typeof e.addListener && "function" == typeof e.removeListener
        }(e)) {
            var c = e;
            e.addListener(t, n),
            s = function() {
                return c.removeListener(t, n)
            }
        } else {
            if (!e || !e.length)
                throw new TypeError("Invalid event target");
            for (var u = 0, l = e.length; u < l; u++)
                Xn(e[u], t, n, i, r)
        }
        i.add(s)
    }
    var Zn = function(e) {
        function t(t, n) {
            var i = e.call(this, t, n) || this;
            return i.scheduler = t,
            i.work = n,
            i.pending = !1,
            i
        }
        return Fe(t, e),
        t.prototype.schedule = function(e, t) {
            if (void 0 === t && (t = 0),
            this.closed)
                return this;
            this.state = e;
            var n = this.id
              , i = this.scheduler;
            return null != n && (this.id = this.recycleAsyncId(i, n, t)),
            this.pending = !0,
            this.delay = t,
            this.id = this.id || this.requestAsyncId(i, this.id, t),
            this
        }
        ,
        t.prototype.requestAsyncId = function(e, t, n) {
            return void 0 === n && (n = 0),
            setInterval(e.flush.bind(e, this), n)
        }
        ,
        t.prototype.recycleAsyncId = function(e, t, n) {
            if (void 0 === n && (n = 0),
            null !== n && this.delay === n && !1 === this.pending)
                return t;
            clearInterval(t)
        }
        ,
        t.prototype.execute = function(e, t) {
            if (this.closed)
                return new Error("executing a cancelled action");
            this.pending = !1;
            var n = this._execute(e, t);
            if (n)
                return n;
            !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
        }
        ,
        t.prototype._execute = function(e, t) {
            var n = !1
              , i = void 0;
            try {
                this.work(e)
            } catch (e) {
                n = !0,
                i = !!e && e || new Error(e)
            }
            if (n)
                return this.unsubscribe(),
                i
        }
        ,
        t.prototype._unsubscribe = function() {
            var e = this.id
              , t = this.scheduler
              , n = t.actions
              , i = n.indexOf(this);
            this.work = null,
            this.state = null,
            this.pending = !1,
            this.scheduler = null,
            -1 !== i && n.splice(i, 1),
            null != e && (this.id = this.recycleAsyncId(t, e, null)),
            this.delay = null
        }
        ,
        t
    }(function(e) {
        function t(t, n) {
            return e.call(this) || this
        }
        return Fe(t, e),
        t.prototype.schedule = function(e, t) {
            return void 0 === t && (t = 0),
            this
        }
        ,
        t
    }(De))
      , Qn = function() {
        function e(t, n) {
            void 0 === n && (n = e.now),
            this.SchedulerAction = t,
            this.now = n
        }
        return e.prototype.schedule = function(e, t, n) {
            return void 0 === t && (t = 0),
            new this.SchedulerAction(this,e).schedule(n, t)
        }
        ,
        e.now = function() {
            return Date.now()
        }
        ,
        e
    }()
      , ei = function(e) {
        function t(n, i) {
            void 0 === i && (i = Qn.now);
            var r = e.call(this, n, (function() {
                return t.delegate && t.delegate !== r ? t.delegate.now() : i()
            }
            )) || this;
            return r.actions = [],
            r.active = !1,
            r.scheduled = void 0,
            r
        }
        return Fe(t, e),
        t.prototype.schedule = function(n, i, r) {
            return void 0 === i && (i = 0),
            t.delegate && t.delegate !== this ? t.delegate.schedule(n, i, r) : e.prototype.schedule.call(this, n, i, r)
        }
        ,
        t.prototype.flush = function(e) {
            var t = this.actions;
            if (this.active)
                t.push(e);
            else {
                var n;
                this.active = !0;
                do {
                    if (n = e.execute(e.state, e.delay))
                        break
                } while (e = t.shift());
                if (this.active = !1,
                n) {
                    for (; e = t.shift(); )
                        e.unsubscribe();
                    throw n
                }
            }
        }
        ,
        t
    }(Qn)
      , ti = new ei(Zn);
    function ni(e, t) {
        var n;
        return void 0 === e && (e = 0),
        void 0 === t && (t = ti),
        (Le(n = e) || !(n - parseFloat(n) + 1 >= 0) || e < 0) && (e = 0),
        t && "function" == typeof t.schedule || (t = ti),
        new qe((function(n) {
            return n.add(t.schedule(ii, e, {
                subscriber: n,
                counter: 0,
                period: e
            })),
            n
        }
        ))
    }
    function ii(e) {
        var t = e.subscriber
          , n = e.counter
          , i = e.period;
        t.next(n),
        this.schedule({
            subscriber: t,
            counter: n + 1,
            period: i
        }, i)
    }
    var ri = function() {
        function e() {
            return Error.call(this),
            this.message = "no elements in sequence",
            this.name = "EmptyError",
            this
        }
        return e.prototype = Object.create(Error.prototype),
        e
    }()
      , si = function() {
        function e() {
            return Error.call(this),
            this.message = "argument out of range",
            this.name = "ArgumentOutOfRangeError",
            this
        }
        return e.prototype = Object.create(Error.prototype),
        e
    }()
      , oi = new qe((function(e) {
        return e.complete()
    }
    ));
    function ai(e) {
        return e ? function(e) {
            return new qe((function(t) {
                return e.schedule((function() {
                    return t.complete()
                }
                ))
            }
            ))
        }(e) : oi
    }
    function ci(e) {
        return function(t) {
            return 0 === e ? ai() : t.lift(new ui(e))
        }
    }
    var ui = function() {
        function e(e) {
            if (this.total = e,
            this.total < 0)
                throw new si
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new li(e,this.total))
        }
        ,
        e
    }()
      , li = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.total = n,
            i.count = 0,
            i
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            var t = this.total
              , n = ++this.count;
            n <= t && (this.destination.next(e),
            n === t && (this.destination.complete(),
            this.unsubscribe()))
        }
        ,
        t
    }(He);
    function di(e) {
        return void 0 === e && (e = null),
        function(t) {
            return t.lift(new hi(e))
        }
    }
    var hi = function() {
        function e(e) {
            this.defaultValue = e
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new pi(e,this.defaultValue))
        }
        ,
        e
    }()
      , pi = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.defaultValue = n,
            i.isEmpty = !0,
            i
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.isEmpty = !1,
            this.destination.next(e)
        }
        ,
        t.prototype._complete = function() {
            this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete()
        }
        ,
        t
    }(He);
    function gi(e) {
        return void 0 === e && (e = bi),
        function(t) {
            return t.lift(new fi(e))
        }
    }
    var fi = function() {
        function e(e) {
            this.errorFactory = e
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new mi(e,this.errorFactory))
        }
        ,
        e
    }()
      , mi = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.errorFactory = n,
            i.hasValue = !1,
            i
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.hasValue = !0,
            this.destination.next(e)
        }
        ,
        t.prototype._complete = function() {
            if (this.hasValue)
                return this.destination.complete();
            var e = void 0;
            try {
                e = this.errorFactory()
            } catch (t) {
                e = t
            }
            this.destination.error(e)
        }
        ,
        t
    }(He);
    function bi() {
        return new ri
    }
    function vi(e, t) {
        var n = arguments.length >= 2;
        return function(i) {
            return i.pipe(e ? ht((function(t, n) {
                return e(t, n, i)
            }
            )) : We, ci(1), n ? di(t) : gi((function() {
                return new ri
            }
            )))
        }
    }
    var _i = function() {
        function e(e) {
            this.value = e
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new yi(e,this.value))
        }
        ,
        e
    }()
      , yi = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.value = n,
            i
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.destination.next(this.value)
        }
        ,
        t
    }(He);
    function wi() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = e[e.length - 1];
        return kt(n) ? (e.pop(),
        Lt(e, n)) : Mt(e)
    }
    function Ei(e, t) {
        if (null != e) {
            if (function(e) {
                return e && "function" == typeof e[Ve]
            }(e))
                return function(e, t) {
                    return new qe((function(n) {
                        var i = new De;
                        return i.add(t.schedule((function() {
                            var r = e[Ve]();
                            i.add(r.subscribe({
                                next: function(e) {
                                    i.add(t.schedule((function() {
                                        return n.next(e)
                                    }
                                    )))
                                },
                                error: function(e) {
                                    i.add(t.schedule((function() {
                                        return n.error(e)
                                    }
                                    )))
                                },
                                complete: function() {
                                    i.add(t.schedule((function() {
                                        return n.complete()
                                    }
                                    )))
                                }
                            }))
                        }
                        ))),
                        i
                    }
                    ))
                }(e, t);
            if (Ot(e))
                return function(e, t) {
                    return new qe((function(n) {
                        var i = new De;
                        return i.add(t.schedule((function() {
                            return e.then((function(e) {
                                i.add(t.schedule((function() {
                                    n.next(e),
                                    i.add(t.schedule((function() {
                                        return n.complete()
                                    }
                                    )))
                                }
                                )))
                            }
                            ), (function(e) {
                                i.add(t.schedule((function() {
                                    return n.error(e)
                                }
                                )))
                            }
                            ))
                        }
                        ))),
                        i
                    }
                    ))
                }(e, t);
            if (Ct(e))
                return Lt(e, t);
            if (function(e) {
                return e && "function" == typeof e[At]
            }(e) || "string" == typeof e)
                return function(e, t) {
                    if (!e)
                        throw new Error("Iterable cannot be null");
                    return new qe((function(n) {
                        var i, r = new De;
                        return r.add((function() {
                            i && "function" == typeof i.return && i.return()
                        }
                        )),
                        r.add(t.schedule((function() {
                            i = e[At](),
                            r.add(t.schedule((function() {
                                if (!n.closed) {
                                    var e, t;
                                    try {
                                        var r = i.next();
                                        e = r.value,
                                        t = r.done
                                    } catch (e) {
                                        return void n.error(e)
                                    }
                                    t ? n.complete() : (n.next(e),
                                    this.schedule())
                                }
                            }
                            )))
                        }
                        ))),
                        r
                    }
                    ))
                }(e, t)
        }
        throw new TypeError((null !== e && typeof e || e) + " is not observable")
    }
    function xi(e, t) {
        return t ? Ei(e, t) : e instanceof qe ? e : new qe(Nt(e))
    }
    var Si = function(e) {
        function t(t) {
            var n = e.call(this) || this;
            return n.parent = t,
            n
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.parent.notifyNext(e)
        }
        ,
        t.prototype._error = function(e) {
            this.parent.notifyError(e),
            this.unsubscribe()
        }
        ,
        t.prototype._complete = function() {
            this.parent.notifyComplete(),
            this.unsubscribe()
        }
        ,
        t
    }(He)
      , ki = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return Fe(t, e),
        t.prototype.notifyNext = function(e) {
            this.destination.next(e)
        }
        ,
        t.prototype.notifyError = function(e) {
            this.destination.error(e)
        }
        ,
        t.prototype.notifyComplete = function() {
            this.destination.complete()
        }
        ,
        t
    }(He);
    function Ri(e, t) {
        if (!t.closed)
            return e instanceof qe ? e.subscribe(t) : Nt(e)(t)
    }
    function Ii(e, t, n) {
        return void 0 === n && (n = Number.POSITIVE_INFINITY),
        "function" == typeof t ? function(i) {
            return i.pipe(Ii((function(n, i) {
                return xi(e(n, i)).pipe(zn((function(e, r) {
                    return t(n, e, i, r)
                }
                )))
            }
            ), n))
        }
        : ("number" == typeof t && (n = t),
        function(t) {
            return t.lift(new Ti(e,n))
        }
        )
    }
    var Ti = function() {
        function e(e, t) {
            void 0 === t && (t = Number.POSITIVE_INFINITY),
            this.project = e,
            this.concurrent = t
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new Fi(e,this.project,this.concurrent))
        }
        ,
        e
    }()
      , Fi = function(e) {
        function t(t, n, i) {
            void 0 === i && (i = Number.POSITIVE_INFINITY);
            var r = e.call(this, t) || this;
            return r.project = n,
            r.concurrent = i,
            r.hasCompleted = !1,
            r.buffer = [],
            r.active = 0,
            r.index = 0,
            r
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e)
        }
        ,
        t.prototype._tryNext = function(e) {
            var t, n = this.index++;
            try {
                t = this.project(e, n)
            } catch (e) {
                return void this.destination.error(e)
            }
            this.active++,
            this._innerSub(t)
        }
        ,
        t.prototype._innerSub = function(e) {
            var t = new Si(this)
              , n = this.destination;
            n.add(t);
            var i = Ri(e, t);
            i !== t && n.add(i)
        }
        ,
        t.prototype._complete = function() {
            this.hasCompleted = !0,
            0 === this.active && 0 === this.buffer.length && this.destination.complete(),
            this.unsubscribe()
        }
        ,
        t.prototype.notifyNext = function(e) {
            this.destination.next(e)
        }
        ,
        t.prototype.notifyComplete = function() {
            var e = this.buffer;
            this.active--,
            e.length > 0 ? this._next(e.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
        }
        ,
        t
    }(ki);
    function Ai(e) {
        return void 0 === e && (e = Number.POSITIVE_INFINITY),
        Ii(We, e)
    }
    function Ci() {
        return Ai(1)
    }
    function Oi() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return Ci()(wi.apply(void 0, e))
    }
    function Ni() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = e[e.length - 1];
        return kt(n) ? (e.pop(),
        function(t) {
            return Oi(e, t, n)
        }
        ) : function(t) {
            return Oi(e, t)
        }
    }
    function Pi(e, t) {
        return function(n) {
            return n.lift(new Li(e,t))
        }
    }
    var Li = function() {
        function e(e, t) {
            this.compare = e,
            this.keySelector = t
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new Mi(e,this.compare,this.keySelector))
        }
        ,
        e
    }()
      , Mi = function(e) {
        function t(t, n, i) {
            var r = e.call(this, t) || this;
            return r.keySelector = i,
            r.hasKey = !1,
            "function" == typeof n && (r.compare = n),
            r
        }
        return Fe(t, e),
        t.prototype.compare = function(e, t) {
            return e === t
        }
        ,
        t.prototype._next = function(e) {
            var t;
            try {
                var n = this.keySelector;
                t = n ? n(e) : e
            } catch (e) {
                return this.destination.error(e)
            }
            var i = !1;
            if (this.hasKey)
                try {
                    i = (0,
                    this.compare)(this.key, t)
                } catch (e) {
                    return this.destination.error(e)
                }
            else
                this.hasKey = !0;
            i || (this.key = t,
            this.destination.next(e))
        }
        ,
        t
    }(He);
    class Ui {
        constructor() {
            this._storage = this._storage || {}
        }
        get _storage() {
            return self.__CS_SHARE_STORAGE__
        }
        set _storage(e) {
            self.__CS_SHARE_STORAGE__ = e
        }
        clean() {
            this._storage = {}
        }
        set(e, t) {
            this._storage[e] = t
        }
        get(e) {
            return this._storage[e]
        }
        getOnce(e) {
            const t = this._storage[e];
            return this.remove(e),
            t
        }
        remove(e) {
            delete this._storage[e]
        }
    }
    var Di, Bi, ji, Hi;
    !function(e) {
        e.syncDevtoolsInitialStateWithTab = "syncDevtoolsInitialStateWithTab"
    }(Di || (Di = {})),
    function(e) {
        class t extends Error {
            constructor(e, t=1e3) {
                super(`SafePromiseError: ${String(e)}`),
                this.stack = (super.stack || "").slice(t)
            }
        }
        function n(e) {
            return e.catch((e=>e instanceof Error && !e.stack ? Promise.reject(new t(e.message)) : Promise.reject(e)))
        }
        e.fromPromise = n,
        e.fromAsync = function(e) {
            return (...t)=>n(e(...t))
        }
        ,
        e.noop = e.fromPromise(Promise.resolve()),
        e.create = function(e) {
            return n(new Promise(e))
        }
        ,
        e.sync = function(e) {
            return n(new Promise(((t,n)=>t(e()))))
        }
        ,
        e.createCompletionSource = u,
        e.delay = c
    }(Bi || (Bi = {}));
    class $i {
        constructor(e, t) {
            this._transport = e,
            this._log = t,
            this._calls = new Map,
            this._sub = this._transport.inbound.subscribe((e=>{
                var t;
                const n = this._calls.get(e.id);
                if (n)
                    try {
                        "err"in e ? n.reject(e.err) : n.resolve(e.res)
                    } finally {
                        this._calls.delete(e.id)
                    }
                else
                    null === (t = this._log) || void 0 === t || t.warn(`received rpc call response for unregistered call ${e.id}`)
            }
            )),
            this.api = new Proxy({},{
                get: (e,t)=>"then" === t ? void 0 : (...e)=>this._handleCall(t, e)
            })
        }
        _handleCall(e, t) {
            let n = k.create();
            for (; this._calls.has(n); )
                n = k.create();
            const i = Bi.createCompletionSource();
            return this._calls.set(n, i),
            this._transport.outbound({
                id: n,
                method: e,
                args: t
            }),
            i.promise
        }
        dispose() {
            this._sub.unsubscribe()
        }
    }
    class Vi {
        constructor(e, t, n=k.create(), i=e) {
            this._rpcMessageName = e,
            this._message = t,
            this._clientId = n,
            this._inboundMessageName = i,
            this.inbound = new qe((e=>{
                const t = t=>{
                    t.clientId === this._clientId && e.next(t.data)
                }
                ;
                return this._message.on(this._inboundMessageName, t),
                ()=>this._message.off(this._inboundMessageName, t)
            }
            )),
            this.outbound = e=>{
                this._message.sendBackground(this._rpcMessageName, {
                    clientId: this._clientId,
                    data: e
                })
            }
        }
    }
    class Wi extends $i {
        constructor(e) {
            super(new Vi("cs-to-bg-rpc-1557421403805",e))
        }
    }
    function Gi(e) {
        return "tunnel" !== e.tag
    }
    !function(e) {
        e.rpcLegacyMessageName = "cs-to-bg-rpc-1587687052565",
        e.rpcLegacyObservableName = "cs-to-bg-observable-rpc-1587687052565"
    }(ji || (ji = {})),
    function(e) {
        e.isSubscribe = e=>"action"in e.data && "subscribe" === e.data.action,
        e.isUnsubscribe = e=>"action"in e.data && "unsubscribe" === e.data.action,
        e.isDispose = e=>"action"in e.data && "dispose" === e.data.action,
        e.isPong = e=>"pong"in e.data,
        e.isPing = e=>"ping"in e.data,
        e.isObservableResult = e=>"subscribableId"in e
    }(Hi || (Hi = {}));
    const qi = Symbol();
    var zi, Ki;
    function Ji(e) {
        return e instanceof qe ? e : new qe((t=>e.subscribe(t)))
    }
    !function(e) {
        e.measure = e=>t=>new qe((n=>t.subscribe((t=>e((()=>n.next(t)))), (e=>n.error(e)), (()=>n.complete())))),
        e.using = (e,t)=>function(e, t) {
            return new qe((function(n) {
                var i, r;
                try {
                    i = e()
                } catch (e) {
                    return void n.error(e)
                }
                try {
                    r = t(i)
                } catch (e) {
                    return void n.error(e)
                }
                var s = (r ? xi(r) : oi).subscribe(n);
                return function() {
                    s.unsubscribe(),
                    i && i.unsubscribe()
                }
            }
            ))
        }(e, t),
        e.doNothing = e=>e
    }(zi || (zi = {}));
    class Yi {
        constructor(e, t, n=jt.create("GenericObservableRpcClient"), i) {
            this._transport = e,
            this._observableTransport = t,
            this._log = n,
            this._serverId = i,
            this._calls = new Map,
            this._subscribeRelatedCalls = new Map,
            this._observables = new Map,
            this._subscribers = new Map,
            this._transportSubscription = Ji(this._transport.inbound).pipe(ht(Gi)).subscribe((e=>{
                this._processResponse(e)
            }
            )),
            this._observableTransportSubscription = Ji(this._observableTransport.inbound).pipe(ht(Gi)).subscribe((e=>{
                this._processObservableMessage(e)
            }
            )),
            this.api = new Proxy({},{
                get: (e,t)=>"then" === t ? void 0 : (...e)=>this._handleCall(t, e)
            })
        }
        _processResponse(e) {
            const t = this._calls.get(e.id);
            if (t)
                try {
                    if ("err"in e)
                        t.reject(e.err);
                    else if (Hi.isObservableResult(e))
                        try {
                            const n = new qe((t=>this._createSubscribeHandler(e.subscribableId, t)));
                            this._observables.set(e.subscribableId, n),
                            t.resolve(n)
                        } catch (t) {
                            this._observables.delete(e.subscribableId)
                        }
                    else
                        t.resolve(this.transformResult(e.res))
                } finally {
                    this._calls.delete(e.id)
                }
            else
                this._log.warn(`received rpc call response for unregistered call ${e.id}`)
        }
        transformResult(e) {
            return e
        }
        _processObservableMessage(e) {
            if ("subscribed"in e) {
                const t = this._subscribeRelatedCalls.get(e.id);
                if (t)
                    try {
                        t.resolve()
                    } finally {
                        this._subscribeRelatedCalls.delete(e.id)
                    }
                else
                    this._log.warn(`received rpc call subscribed response for unregistered subscribe call ${e.id}`)
            } else if ("unsubscribed"in e) {
                const t = this._subscribeRelatedCalls.get(e.id);
                if (t)
                    try {
                        t.resolve()
                    } finally {
                        this._subscribeRelatedCalls.delete(e.id),
                        this._subscribers.delete(e.id)
                    }
                else
                    this._log.warn(`received rpc call unsubscribed response for unregistered unsubscribe call ${e.id}`)
            } else if ("next"in e)
                try {
                    const t = this._subscribers.get(e.subscriptionId);
                    t ? t.subscriber.next(e.next) : this._log.warn(`received observable next message for unregistered subscription ${e.subscriptionId}`)
                } catch (t) {
                    this._subscribers.delete(e.subscriptionId)
                }
            else if ("complete"in e)
                try {
                    const t = this._subscribers.get(e.subscriptionId);
                    t ? (t.subscriber.complete(),
                    this._subscribers.delete(e.subscriptionId)) : this._log.warn(`received observable complete for unregistered subscription ${e.subscriptionId}`)
                } catch (t) {
                    this._subscribers.delete(e.subscriptionId)
                }
            else if ("err"in e)
                try {
                    const t = this._subscribers.get(e.subscriptionId);
                    t ? t.subscriber.error(e.err) : this._log.warn(`received observable error for unregistered subscription  ${e.subscriptionId}`)
                } finally {
                    this._subscribers.delete(e.subscriptionId)
                }
            else if ("subErr"in e) {
                const t = this._subscribeRelatedCalls.get(e.id);
                try {
                    const n = this._subscribers.get(e.id);
                    n ? n.subscriber.error(e.subErr) : this._log.warn(`received subscription error response for unregistered call ${e.id}`)
                } finally {
                    t && (t.reject(e.subErr),
                    this._subscribeRelatedCalls.delete(e.id)),
                    this._observables.delete(e.subscribableId),
                    this._subscribers.delete(e.id)
                }
            } else if ("ping"in e)
                try {
                    this._observables.get(e.ping) ? this._observableTransport.outbound({
                        pong: e.ping
                    }) : this._log.warn(`received ping for unregistered observable ${e.ping}`)
                } finally {}
        }
        _handleCall(e, t) {
            let n = k.create();
            for (; this._calls.has(n); )
                n = k.create();
            const i = Bi.createCompletionSource();
            this._calls.set(n, i);
            const r = t.map((e=>{
                return t = e,
                Boolean(t) && t._tag === qi ? e.toJSON() : e;
                var t
            }
            ));
            return this._transport.outbound({
                id: n,
                method: e,
                args: r,
                serverId: this._serverId
            }),
            i.promise
        }
        _createSubscribeHandler(e, t) {
            let n = k.create();
            for (; this._subscribeRelatedCalls.has(n); )
                n = k.create();
            const i = Bi.createCompletionSource();
            return this._subscribeRelatedCalls.set(n, i),
            this._observableTransport.outbound({
                id: n,
                subscribableId: e,
                action: "subscribe"
            }),
            this._subscribers.set(n, {
                subscribableId: e,
                subscriber: t
            }),
            ()=>{
                this._handleUnsubscribe(n, e)
            }
        }
        _handleUnsubscribe(e, t) {
            let n = k.create();
            for (; this._subscribeRelatedCalls.has(n); )
                n = k.create();
            const i = Bi.createCompletionSource();
            return this._subscribeRelatedCalls.set(n, i),
            this._observableTransport.outbound({
                id: n,
                subscriptionId: e,
                subscribableId: t,
                action: "unsubscribe"
            }),
            this._subscribers.delete(e),
            i.promise
        }
        dispose() {
            for (const e of this._observables.keys())
                this._observableTransport.outbound({
                    id: k.create(),
                    subscribableId: e,
                    action: "dispose"
                });
            this._observables.clear(),
            this._transportSubscription.unsubscribe(),
            this._observableTransportSubscription.unsubscribe(),
            this._calls.clear(),
            this._subscribeRelatedCalls.clear()
        }
    }
    class Xi extends Yi {
        constructor(e) {
            super(new Vi(ji.rpcLegacyMessageName,e), new Vi(ji.rpcLegacyObservableName,e))
        }
    }
    !function(e) {
        e.rpcLegacyMessageName = "cs-to-bg-static-capi-rpc-1668544923207",
        e.rpcLegacyObservableName = "cs-to-bg-static-capi-observable-rpc-1668544923207"
    }(Ki || (Ki = {}));
    class Zi extends Yi {
        constructor(e) {
            super(new Vi(Ki.rpcLegacyMessageName,e), new Vi(Ki.rpcLegacyObservableName,e))
        }
    }
    class Qi extends Jt {
        static getInstance() {
            if (void 0 === this._instanceCSShared)
                throw new Error("nonBG Env not inited yet");
            return this._instanceCSShared
        }
        static get isInited() {
            return void 0 !== this._instanceCSShared
        }
        static initShared(e) {
            if (void 0 !== this._instanceCSShared)
                throw new Error("nonBG Env already inited");
            this._instanceCSShared = e,
            Jt.initShared(e)
        }
    }
    function er() {
        return Qi.getInstance()
    }
    const tr = jt.create("extension-api");
    class nr {
        constructor(e) {
            this._baseApi = e,
            this._log = jt.create("BaseMessageService"),
            this._initializedListenerEvents = new Set,
            this._listeners = {},
            this._logError = e=>{
                this._log.error(`${nr.name} handle an error: ${e.message}`)
            }
            ,
            this.on = (e,t)=>{
                var n;
                this._listeners[e] = null !== (n = this._listeners[e]) && void 0 !== n ? n : [],
                this._listeners[e].push(t),
                this._initializedListenerEvents.has(e) || (this._initializedListenerEvents.add(e),
                this._baseApi.listen(e, ((...t)=>{
                    var n;
                    const i = null !== (n = this._listeners[e]) && void 0 !== n ? n : [];
                    for (const e of i)
                        try {
                            e(...t)
                        } catch (e) {
                            this._logError(e)
                        }
                }
                )))
            }
            ,
            this.once = (e,t)=>{
                const n = (...i)=>{
                    this.off(e, n);
                    try {
                        t(...i)
                    } catch (e) {
                        this._logError(e)
                    }
                }
                ;
                this.on(e, n)
            }
            ,
            this.off = (e,t)=>{
                if (!this._listeners[e])
                    return;
                const n = this._listeners[e].indexOf(t);
                -1 !== n && this._listeners[e].splice(n, 1),
                0 === this._listeners[e].length && delete this._listeners[e]
            }
        }
    }
    class ir extends nr {
        constructor(e) {
            super(e),
            this._api = e,
            this.sendBackground = (e,t)=>{
                try {
                    this._api.broadcastBackground(e, t)
                } catch (e) {
                    this._logError(e)
                }
            }
        }
    }
    const rr = tn(3);
    var sr, or, ar;
    !function(e) {
        e.default = "default",
        e.fallback = "fallback"
    }(sr || (sr = {})),
    function(e) {
        e.bgHistoryLogs = "bgHistoryLogs",
        e.popupHistoryLogs = "popupHistoryLogs",
        e.csHistoryLogs = "csHistoryLogs"
    }(or || (or = {}));
    class cr {
        constructor(e, t, n, i=jt.create("DebugReportsGetterImpl")) {
            this._envName = e,
            this._getLogsDefault = t,
            this._getLogsFallback = n,
            this._log = i
        }
        _getLogMessage(e, t) {
            return t === sr.fallback ? `${e} from ${t}` : e
        }
        async _getLogs(e, t, n) {
            const i = Yt().context;
            this._log.debug(this._getLogMessage(`start get ${this._envName} logs`, t));
            try {
                const r = await Promise.race([e(), c(n).then((()=>{
                    qn().debugReports.downloadTimeout(i, this._envName),
                    this._log.warn(this._getLogMessage(`get ${this._envName} logs timeout`, t))
                }
                ))]);
                return r ? (qn().debugReports.downloadSuccessfully(i, this._envName),
                this._log.debug(this._getLogMessage(`successfully get ${this._envName}`, t)),
                r.map((e=>({
                    ...e,
                    loggerName: `${this._envName}.${e.loggerName}`
                })))) : void this._log.warn(this._getLogMessage(`${this._envName} logs is not defined`, t))
            } catch (e) {
                return qn().debugReports.downloadError(i, this._envName),
                void this._log.warn(this._getLogMessage(`fail to get ${this._envName} logs`, t), e)
            }
        }
        get envName() {
            return this._envName
        }
        async getLogs() {
            return await this._getLogs(this._getLogsDefault, sr.default, rr) || (this._getLogsFallback ? await this._getLogs(this._getLogsFallback, sr.fallback, 1e3) : void 0)
        }
        static getLogsFromSessionStorageFallbackGetter(e, t=(()=>Yt().browserApi.sessionStorage)) {
            return ()=>t().get(e).then((t=>{
                const n = t[e];
                return Array.isArray(n) ? n.map((e=>{
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        return {
                            level: _e.WARN,
                            loggerName: cr.name,
                            message: "Cannot parsed backup data!",
                            timestamp: e.timestamp,
                            data: {
                                json: e
                            },
                            exeption: t
                        }
                    }
                }
                )) : void 0
            }
            ))
        }
    }
    !function(e) {
        e.UPDATE_BACKUP_STORAGE_TIMEOUT = tn(5),
        e.BACKUP_STORAGE_LOGS_CAPACITY = 100
    }(ar || (ar = {}));
    class ur {
        constructor(e, t, n, i=x, r=jt.create(ur.name, {
            skipWriteToHistoryLogger: !0
        })) {
            this._sessionStorage = e,
            this._key = t,
            this._skipSetLogs = n,
            this._throttle = i,
            this._log = r,
            this.get = ()=>this._get(),
            this._get = cr.getLogsFromSessionStorageFallbackGetter(this._key, (()=>this._sessionStorage)),
            this.set = this._throttle(ar.UPDATE_BACKUP_STORAGE_TIMEOUT, this._set.bind(this))
        }
        async _set(e) {
            var t;
            if (await (null === (t = this._skipSetLogs) || void 0 === t ? void 0 : t.call(this)))
                return void this._log.trace("set logs is skipped");
            const n = null == e ? void 0 : e.slice(-ar.BACKUP_STORAGE_LOGS_CAPACITY).map((e=>{
                try {
                    return JSON.stringify(e)
                } catch (t) {
                    return this._log.warn("cannot parse properly backup storage data", t, e),
                    JSON.stringify({
                        level: _e.WARN,
                        loggerName: e.loggerName,
                        message: e.message,
                        timestamp: e.timestamp,
                        exception: `cannot parse properly backup storage data: ${t.message}`
                    })
                }
            }
            ));
            return this._log.trace("set new logs to session storage"),
            this._sessionStorage.set({
                [this._key]: n
            }).then((()=>this._log.trace("logs was successfully set"))).catch((e=>{
                this._log.warn(`error: on set ${this._key} logs to backup storage`, e),
                this._sessionStorage.remove(this._key).catch((e=>this._log.warn(`error: on remove ${this._key} logs from backup storage`, e)))
            }
            ))
        }
    }
    const lr = "tracking/RPC";
    class dr extends Qi {
        static get isInited() {
            return void 0 !== this._instance
        }
        static getInstance() {
            if (void 0 === this._instance)
                throw new Error("cs Env not inited yet");
            return this._instance
        }
        static init(e) {
            if (void 0 !== this._instance)
                throw new Error("cs Env already inited");
            const t = new dr(e);
            return this._instance = t,
            Qi.initShared(t),
            t.browserApi.message.start && t.browserApi.message.start(),
            t
        }
        constructor(e) {
            var t;
            super({
                browser: e.browser,
                extensionType: e.extensionType,
                deploymentType: e.deploymentType,
                context: "cs",
                historyLoggerExtraArgs: {
                    enableHistoryLoggerUntil: e=>{
                        var t;
                        null === (t = this.bgRpc) || void 0 === t || t.api.enableHistoryLoggerUntil(e)
                    }
                    ,
                    disableHistoryLogger: ()=>{
                        var e;
                        null === (e = this.bgRpc) || void 0 === e || e.api.disableHistoryLogger()
                    }
                    ,
                    backupStorage: new ur(e.browserApi.sessionStorage,or.csHistoryLogs,(async()=>{
                        var t, n;
                        return e.skipWriteLogsToBackupStorage || document.hidden || ce() || !await (null === (t = this.bgRpc) || void 0 === t ? void 0 : t.api.isGateEnabled("SessionStorageLogsBackup")) || !await (null === (n = this.bgRpc) || void 0 === n ? void 0 : n.api.isCurrentTabFocused())
                    }
                    ))
                }
            }),
            this.browserApi = e.browserApi,
            this.message = new ir(e.browserApi.message),
            e.skipInitExtensionApi || (t = e.browserApi,
            self.extensionContentScriptApi && tr.warn("Content Script Extension Api init called more than once"),
            self.extensionContentScriptApi = self.extensionContentScriptApi || t),
            this.bgRpc = new Wi(this.message),
            this.experimentClient = e.createExperimentClient(this.bgRpc),
            this.csShareStorage = new Ui,
            this.capiBgRpc = new Xi(this.message),
            this.staticCapiBgRpc = new Zi(this.message),
            this.telemetryCallProvider = function(e, t=jt.create("lib.tracking.call.transport")) {
                return new Proxy({},{
                    get: (n,i)=>{
                        if ("enableDataSharing" !== i)
                            return (...n)=>{
                                Promise.race([e.api.trackCall(lr, [i, ...n]).then((()=>null)), c(1e4).then((()=>new Error("timeout call through bg page")))]).then((e=>e && t.warn("tracking call timeout", e))).catch((e=>t.warn("tracking call failed, reason:", e)))
                            }
                    }
                })
            }(this.bgRpc)
        }
    }
    function hr() {
        return dr.getInstance()
    }
    const pr = 2147483642;
    var gr;
    !function(e) {
        function t(e, t) {
            try {
                for (const n of Object.keys(t))
                    if (t[n] && t[n](e))
                        return n;
                return null
            } catch (e) {
                return null
            }
        }
        e.isSpecific = {
            draftJs: e=>!(!e.hasAttribute("contenteditable") || !e.querySelector('[data-contents="true"] > [data-editor], [data-block]')),
            quill: e=>e.classList.contains("ql-editor") || e.classList.contains("ql-container"),
            redactor: e=>e.className.indexOf("redactor") > -1,
            prosemirror: e=>e.hasAttribute("pm-container") || e.classList.contains("ProseMirror"),
            scribe: e=>e.className.indexOf("scribe") > -1,
            trix: e=>e.className.indexOf("trix") > -1,
            "medium-editor": e=>e.className.indexOf("medium-editor") > -1,
            tinymce: e=>{
                if ("IFRAME" !== e.tagName)
                    return !1;
                const t = e;
                return t.id.indexOf("mce") > -1 || !!(t.contentDocument && t.contentDocument.querySelectorAll("#tinymce, .mce-content-body").length > 0)
            }
            ,
            ckeditor4: e=>e.matches("iframe.cke_wysiwyg_frame") || e.classList.contains("cke_editable"),
            ckeditor5: e=>e.classList.contains("ck-editor__editable"),
            slate: e=>"true" === e.getAttribute("data-slate-editor"),
            mobiledoc: e=>e.classList.contains("__mobiledoc-editor")
        },
        e.isGeneric = {
            contenteditable: e=>{
                const t = e.attributes.getNamedItem("contenteditable");
                return !(!function(e) {
                    return !(e instanceof HTMLSelectElement)
                }(e) || !t || "true" !== t.value && "" !== t.value && "plaintext-only" !== t.value)
            }
            ,
            textarea: e=>"TEXTAREA" === e.tagName,
            iframe: t=>{
                if ("IFRAME" === t.tagName) {
                    const n = t;
                    return !!(n.contentDocument && n.contentDocument.body && e.isGeneric.contenteditable(n.contentDocument.body))
                }
                return !1
            }
            ,
            iframeHost: t=>{
                if ("IFRAME" === t.tagName) {
                    const n = t;
                    return !(n.contentDocument && n.contentDocument.body && e.isGeneric.contenteditable(n.contentDocument.body))
                }
                return !1
            }
        },
        e.get = function(n) {
            return {
                generic: t(n, e.isGeneric),
                specific: t(n, e.isSpecific)
            }
        }
    }(gr || (gr = {}));
    var fr = 1
      , mr = function() {
        return Promise.resolve()
    }()
      , br = {};
    function vr(e) {
        return e in br && (delete br[e],
        !0)
    }
    var _r, yr = function(e) {
        var t = fr++;
        return br[t] = !0,
        mr.then((function() {
            return vr(t) && e()
        }
        )),
        t
    }, wr = function(e) {
        vr(e)
    }, Er = function(e) {
        function t(t, n) {
            var i = e.call(this, t, n) || this;
            return i.scheduler = t,
            i.work = n,
            i
        }
        return Fe(t, e),
        t.prototype.requestAsyncId = function(t, n, i) {
            return void 0 === i && (i = 0),
            null !== i && i > 0 ? e.prototype.requestAsyncId.call(this, t, n, i) : (t.actions.push(this),
            t.scheduled || (t.scheduled = yr(t.flush.bind(t, null))))
        }
        ,
        t.prototype.recycleAsyncId = function(t, n, i) {
            if (void 0 === i && (i = 0),
            null !== i && i > 0 || null === i && this.delay > 0)
                return e.prototype.recycleAsyncId.call(this, t, n, i);
            0 === t.actions.length && (wr(n),
            t.scheduled = void 0)
        }
        ,
        t
    }(Zn), xr = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return Fe(t, e),
        t.prototype.flush = function(e) {
            this.active = !0,
            this.scheduled = void 0;
            var t, n = this.actions, i = -1, r = n.length;
            e = e || n.shift();
            do {
                if (t = e.execute(e.state, e.delay))
                    break
            } while (++i < r && (e = n.shift()));
            if (this.active = !1,
            t) {
                for (; ++i < r && (e = n.shift()); )
                    e.unsubscribe();
                throw t
            }
        }
        ,
        t
    }(ei), Sr = new xr(Er);
    function kr() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = Number.POSITIVE_INFINITY
          , i = null
          , r = e[e.length - 1];
        return kt(r) ? (i = e.pop(),
        e.length > 1 && "number" == typeof e[e.length - 1] && (n = e.pop())) : "number" == typeof r && (n = e.pop()),
        null === i && 1 === e.length && e[0]instanceof qe ? e[0] : Ai(n)(Mt(e, i))
    }
    function Rr(e, t, n) {
        return n ? Rr(e, t).pipe(zn((function(e) {
            return Le(e) ? n.apply(void 0, e) : n(e)
        }
        ))) : new qe((function(n) {
            var i, r = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return n.next(1 === e.length ? e[0] : e)
            };
            try {
                i = e(r)
            } catch (e) {
                return void n.error(e)
            }
            if (Ae(t))
                return function() {
                    return t(r, i)
                }
        }
        ))
    }
    function Ir(e) {
        var t = e.error;
        e.subscriber.error(t)
    }
    _r || (_r = {});
    var Tr = function() {
        function e(e, t, n) {
            this.kind = e,
            this.value = t,
            this.error = n,
            this.hasValue = "N" === e
        }
        return e.prototype.observe = function(e) {
            switch (this.kind) {
            case "N":
                return e.next && e.next(this.value);
            case "E":
                return e.error && e.error(this.error);
            case "C":
                return e.complete && e.complete()
            }
        }
        ,
        e.prototype.do = function(e, t, n) {
            switch (this.kind) {
            case "N":
                return e && e(this.value);
            case "E":
                return t && t(this.error);
            case "C":
                return n && n()
            }
        }
        ,
        e.prototype.accept = function(e, t, n) {
            return e && "function" == typeof e.next ? this.observe(e) : this.do(e, t, n)
        }
        ,
        e.prototype.toObservable = function() {
            var e, t;
            switch (this.kind) {
            case "N":
                return wi(this.value);
            case "E":
                return e = this.error,
                new qe(t ? function(n) {
                    return t.schedule(Ir, 0, {
                        error: e,
                        subscriber: n
                    })
                }
                : function(t) {
                    return t.error(e)
                }
                );
            case "C":
                return ai()
            }
            throw new Error("unexpected notification kind value")
        }
        ,
        e.createNext = function(t) {
            return void 0 !== t ? new e("N",t) : e.undefinedValueNotification
        }
        ,
        e.createError = function(t) {
            return new e("E",void 0,t)
        }
        ,
        e.createComplete = function() {
            return e.completeNotification
        }
        ,
        e.completeNotification = new e("C"),
        e.undefinedValueNotification = new e("N",void 0),
        e
    }();
    function Fr(e, t) {
        return void 0 === t && (t = 0),
        function(n) {
            return n.lift(new Ar(e,t))
        }
    }
    var Ar = function() {
        function e(e, t) {
            void 0 === t && (t = 0),
            this.scheduler = e,
            this.delay = t
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new Cr(e,this.scheduler,this.delay))
        }
        ,
        e
    }()
      , Cr = function(e) {
        function t(t, n, i) {
            void 0 === i && (i = 0);
            var r = e.call(this, t) || this;
            return r.scheduler = n,
            r.delay = i,
            r
        }
        return Fe(t, e),
        t.dispatch = function(e) {
            var t = e.notification
              , n = e.destination;
            t.observe(n),
            this.unsubscribe()
        }
        ,
        t.prototype.scheduleMessage = function(e) {
            this.destination.add(this.scheduler.schedule(t.dispatch, this.delay, new Or(e,this.destination)))
        }
        ,
        t.prototype._next = function(e) {
            this.scheduleMessage(Tr.createNext(e))
        }
        ,
        t.prototype._error = function(e) {
            this.scheduleMessage(Tr.createError(e)),
            this.unsubscribe()
        }
        ,
        t.prototype._complete = function() {
            this.scheduleMessage(Tr.createComplete()),
            this.unsubscribe()
        }
        ,
        t
    }(He)
      , Or = function() {
        return function(e, t) {
            this.notification = e,
            this.destination = t
        }
    }();
    function Nr(e, t) {
        return Ii(e, t, 1)
    }
    function Pr(e, t, n, i, r, s, o, a, c, u, l, d, h, p, g, f, m, b, v, _) {
        switch (arguments.length) {
        case 1:
            return e;
        case 2:
            return t(e);
        case 3:
            return n(t(e));
        case 4:
            return i(n(t(e)));
        case 5:
            return r(i(n(t(e))));
        case 6:
            return s(r(i(n(t(e)))));
        case 7:
            return o(s(r(i(n(t(e))))));
        case 8:
            return a(o(s(r(i(n(t(e)))))));
        case 9:
            return c(a(o(s(r(i(n(t(e))))))));
        case 10:
            return u(c(a(o(s(r(i(n(t(e)))))))));
        case 11:
            return l(u(c(a(o(s(r(i(n(t(e))))))))));
        case 12:
            return d(l(u(c(a(o(s(r(i(n(t(e)))))))))));
        case 13:
            return h(d(l(u(c(a(o(s(r(i(n(t(e))))))))))));
        case 14:
            return p(h(d(l(u(c(a(o(s(r(i(n(t(e)))))))))))));
        case 15:
            return g(p(h(d(l(u(c(a(o(s(r(i(n(t(e))))))))))))));
        case 16:
            return f(g(p(h(d(l(u(c(a(o(s(r(i(n(t(e)))))))))))))));
        case 17:
            return m(f(g(p(h(d(l(u(c(a(o(s(r(i(n(t(e))))))))))))))));
        case 18:
            return b(m(f(g(p(h(d(l(u(c(a(o(s(r(i(n(t(e)))))))))))))))));
        case 19:
            return v(b(m(f(g(p(h(d(l(u(c(a(o(s(r(i(n(t(e))))))))))))))))));
        case 20:
            return _(v(b(m(f(g(p(h(d(l(u(c(a(o(s(r(i(n(t(e)))))))))))))))))))
        }
    }
    var Lr;
    function Mr(e, t) {
        var n, i, r;
        const s = null === (r = null === (i = null === (n = null == t ? void 0 : t.citationBuilder) || void 0 === n ? void 0 : n.domains) || void 0 === i ? void 0 : i[e]) || void 0 === r ? void 0 : r.disabled;
        return void 0 !== s ? !s : void 0
    }
    function Ur(e, t) {
        return Hr(t).some((t=>new RegExp(t.domain).test(e)))
    }
    function Dr(e) {
        var t, n;
        return !(null !== (n = null === (t = e.citationBuilder) || void 0 === t ? void 0 : t.disabled) && void 0 !== n && n)
    }
    function Br(e, t) {
        return Hr(t).some((t=>{
            const n = new RegExp(t.domain)
              , i = new RegExp(t.pathname);
            return n.test(e.hostname) && i.test(e.pathname)
        }
        ))
    }
    function jr(e, t, n) {
        const i = Mr(e, n);
        return Dr(t) && (void 0 === i && Ur(e, t) || !0 === i)
    }
    !function(e) {
        const t = jt.create("universal.cs.integration.observables")
          , n = e=>Yn(e, "focus", {
            capture: !0
        });
        function i(e) {
            return e instanceof Element && e.shadowRoot && e.shadowRoot.activeElement ? i(e.shadowRoot.activeElement) : e
        }
        function r(e, t) {
            return {
                document: e,
                frame: t
            }
        }
        function s(e, n) {
            const i = r(e);
            return Oi(xi(e.getElementsByTagName("iframe")), n.pipe(Nr((e=>Array.from(e.addedNodes))), ht((e=>"IFRAME" === e.nodeName)))).pipe(ht((n=>function(e, n) {
                try {
                    const t = e.src;
                    if (t && "about:blank" !== t && !t.startsWith("javascript")) {
                        return new URL(t,n.baseURI).origin === n.location.origin
                    }
                    return !0
                } catch (e) {
                    return t.warn("Error converting iframe's src to url", e),
                    !0
                }
            }(n, e))), Ii((e=>{
                try {
                    return function(e) {
                        const t = e.contentDocument;
                        return t && "complete" === t.readyState
                    }(e) ? wi(e) : Rr((t=>e.addEventListener("load", t, !0)), (t=>e.removeEventListener("load", t))).pipe(zn((()=>e)), ci(1))
                } catch (e) {
                    return t.warn("failed to receive iframes document", e),
                    wi(null)
                }
            }
            )), zn((e=>{
                try {
                    if (null !== e && null !== e.contentDocument)
                        return r(e.contentDocument, e)
                } catch (e) {
                    t.warn("failed to receive iframes document", e)
                }
                return null
            }
            )), ht((e=>null !== e))).pipe(Ni(i))
        }
        e.createFocusObservable = function(e, t, r=n) {
            return s(e, t).pipe(Ii((e=>function(e, t, n) {
                const r = e.document
                  , s = ni(Xt)
                  , o = e.frame ? oi : (l = ()=>wi(r.activeElement).pipe(ht((e=>e && r.defaultView && r.defaultView.HTMLElement && e instanceof r.defaultView.HTMLElement))),
                new qe((function(e) {
                    var t;
                    try {
                        t = l()
                    } catch (t) {
                        return void e.error(t)
                    }
                    return (t ? xi(t) : ai()).subscribe(e)
                }
                )))
                  , a = t(r).pipe(zn((e=>e.target)))
                  , c = e.frame ? oi : kr(s, n).pipe(ht((e=>!!r.defaultView && "visible" === r.visibilityState && !!r.activeElement)), zn((e=>r.activeElement)), Pi())
                  , u = kr(c, a).pipe(ht((e=>r.defaultView && r.defaultView.HTMLElement && e instanceof r.defaultView.HTMLElement)), zn((e=>i(e))));
                var l;
                return Oi(o, u).pipe(Pi())
            }(e, r, t).pipe(zn((t=>({
                element: t,
                owner: e
            })))))), Pi(), Fr(Sr))
        }
        ,
        e.createReadonlyObservable = function(e, t, n) {
            return s(e, t).pipe(Ii((e=>function(e, t, n) {
                const i = (e,t)=>e.length === t.length && e.every(((e,n)=>e === t[n]));
                return t.pipe(zn((()=>Pr(n, e.querySelectorAll.bind(e), Array.from))), Pi(i), zn((e=>Pr(e, Array.from, xi))), Ii((e=>e)), ht(y))
            }(e.document, t, n).pipe(zn((t=>({
                element: t,
                owner: e
            })))))), Pi(), Fr(Sr))
        }
        ,
        e.docInfo = r
    }(Lr || (Lr = {}));
    function Hr(e) {
        var t, n;
        return null !== (n = null === (t = e.citationBuilder) || void 0 === t ? void 0 : t.sources) && void 0 !== n ? n : []
    }
    w((()=>fn(document.location.href))),
    w((e=>{
        const t = document.location.href;
        return {
            url: t,
            domain: fn(t),
            isUrlAllowlisted: Br(document.location, e)
        }
    }
    )),
    w((()=>k.create()));
    var $r, Vr, Wr;
    !function(e) {
        function t(e, t) {
            if (!e || !t)
                return !0;
            return !t.includes(e)
        }
        function n(e, t) {
            var n;
            return Boolean((null == t ? void 0 : t.isDesktopIntegrationEnabled) && (null === (n = e.llamaIntegration) || void 0 === n ? void 0 : n.enabled))
        }
        function i(e, n, i, r) {
            var s, o;
            const a = r ? fn(r) : void 0
              , c = n.isLlamaInstalled && (null === (s = i.llamaIntegration) || void 0 === s ? void 0 : s.enabled);
            return t(a, null === (o = i.llamaIntegration) || void 0 === o ? void 0 : o.disabledByDomain) && (c || "true" === e.showDesktopIntegrationExtensionToggle)
        }
        e.isEnabled = n,
        e.showSettingPopupToggle = i,
        e.showGrayGButton = function(e, t, r, s) {
            return i(t, e, r, s) && n(r, e)
        }
        ,
        e.isIntegrationEnabled = function(e, i, r) {
            var s;
            return !(!e || !r) && (t(i, null === (s = r.llamaIntegration) || void 0 === s ? void 0 : s.disabledByDomain) && n(r, e))
        }
    }($r || ($r = {})),
    function(e) {
        const t = "grammarly-desktop-integration";
        e.inject = function(e=document.documentElement) {
            var n, i;
            const r = `\n      div.${t} {\n        position: absolute;\n        width: 1px;\n        height: 1px;\n        padding: 0;\n        margin: -1px;\n        overflow: hidden;\n        clip: rect(0, 0, 0, 0);\n        white-space: nowrap;\n        border: 0;\n        -moz-user-select: none;\n        -webkit-user-select: none;\n        -ms-user-select:none;\n        user-select:none;\n      }\n\n      div.${t}:before {\n        content: attr(data-content);\n      }\n    `
              , s = document.createElement("style");
            s.textContent = r;
            const o = document.createElement("div");
            o.setAttribute("aria-label", "grammarly-integration"),
            o.setAttribute("role", "group"),
            o.setAttribute("tabindex", "-1"),
            o.setAttribute("class", t);
            const a = document.createElement(t);
            return a.attachShadow({
                mode: "open"
            }),
            a.setAttribute("data-grammarly-shadow-root", "true"),
            null === (n = a.shadowRoot) || void 0 === n || n.appendChild(s),
            null === (i = a.shadowRoot) || void 0 === i || i.appendChild(o),
            e.appendChild(a),
            {
                activate: ({isActive: e, isUserDisabled: t, mode: n})=>{
                    null == o || o.setAttribute("data-content", JSON.stringify(n ? {
                        mode: n,
                        isActive: e,
                        isUserDisabled: t
                    } : {
                        isActive: e
                    }))
                }
                ,
                remove: ()=>{
                    var e;
                    null === (e = null == a ? void 0 : a.parentNode) || void 0 === e || e.removeChild(a)
                }
            }
        }
        ,
        e.isInjected = function() {
            return !!document.querySelector(t)
        }
    }(Vr || (Vr = {})),
    function(e) {
        e.full = "full",
        e.limited = "limited"
    }(Wr || (Wr = {}));
    class Gr {
        constructor(e=jt.create("DesktopHiddenFieldIntegration"), t=qn) {
            this._log = e,
            this._getFelog = t,
            this._integration = null,
            this._root = document.documentElement,
            this._state = Bt.create(null),
            this.getActiveElement = ()=>{
                const e = document.activeElement
                  , t = null == e ? void 0 : e.shadowRoot
                  , n = null == e ? void 0 : e.contentDocument;
                return t && t.activeElement ? t.activeElement : n && n.activeElement ? n.activeElement : e
            }
            ,
            this.updateState = (e,t,n,i)=>{
                var r;
                const s = !$r.isIntegrationEnabled(i, e, t)
                  , o = $r.isEnabled(t, i) ? Wr.limited : Wr.full
                  , a = !n;
                this._state.set({
                    isActive: s,
                    mode: o,
                    isUserDisabled: a
                }),
                a ? this.dispose() : null === (r = this.integration) || void 0 === r || r.activate({
                    isActive: s,
                    mode: o,
                    isUserDisabled: a
                })
            }
            ,
            this.updateForFocusedIntegration = ()=>{
                const e = this.getActiveElement()
                  , t = null == e ? void 0 : e.closest("[role=dialog][aria-modal=true]")
                  , n = null != t ? t : document.documentElement;
                return n !== this._root && (this._root = n,
                this.dispose()),
                this.integration
            }
            ,
            this.dispose = ()=>{
                this._integration && (this._integration.remove(),
                this._integration = null)
            }
            ,
            this._state.pipe(ht(Boolean)).subscribe((e=>{
                this._log.debug("update DesktopHiddenField state", e)
            }
            ))
        }
        get integration() {
            if (this._integration)
                return this._integration;
            if (Vr.isInjected())
                return this._log.debug("DesktopHiddenField is already injected"),
                null;
            try {
                this._integration = Vr.inject(this._root)
            } catch (e) {
                return this._log.debug("DesktopHiddenField is not injected", e),
                this._getFelog().hiddenFieldInjectionFailed(),
                null
            }
            return this._log.debug("DesktopHiddenField is injected into " + (this._root === document.documentElement ? "root" : "dialog")),
            this._integration
        }
    }
    var qr;
    !function(e) {
        function t(e, t) {
            return n(e, t).pipe(dt(), Fr(Sr))
        }
        function n(e, t) {
            return new qe((n=>{
                const i = new MutationObserver((e=>n.next(e)));
                return i.observe(e, t),
                ()=>i.disconnect()
            }
            ))
        }
        e.create = t,
        e.createUnsafe = n,
        e.createFlattenHot = function(e, t) {
            return n(e, t).pipe(Nr((e=>e)), dt())
        }
        ,
        e.observeAttribute = function(e, n) {
            return t(e, {
                attributes: !0,
                attributeFilter: [n],
                subtree: !1,
                childList: !1
            }).pipe(zn((t=>e.getAttribute(n))))
        }
        ,
        e.observeStyle = function(e) {
            return t(e, {
                attributes: !0,
                attributeFilter: ["style"],
                subtree: !1,
                childList: !1
            }).pipe(zn((t=>e.style)))
        }
        ,
        e.observeChildList = function(e) {
            return t(e, {
                attributes: !1,
                subtree: !1,
                childList: !0
            }).pipe(zn((t=>e.childNodes)))
        }
    }(qr || (qr = {}));
    const zr = "data-enable-grammarly"
      , Kr = ["data-gramm_editor", "data-gramm", "data-gramm_id", "gramm_editor", "readonly", "disabled"]
      , Jr = ["pm-container", {
        name: "class",
        value: "ProseMirror"
    }, "data-synchrony", {
        name: "data-gramm",
        value: "false"
    }, {
        name: zr,
        value: "false"
    }, {
        name: "aria-label",
        value: "Search Facebook"
    }]
      , Yr = ["changed-user", "changed-plan", "changed-dialect", "cleanup", "editor-fix", "llama-action"];
    function Xr(e, t) {
        let n = e.parentNode;
        for (; null !== n; ) {
            if (Qr(n, t))
                return n;
            n = n.parentNode
        }
        return !1
    }
    function Zr(e) {
        return "true" === e.contentEditable || "plaintext-only" === e.contentEditable
    }
    function Qr(e, t) {
        if (!e)
            return !1;
        const n = e.matches || e.msMatchesSelector || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector;
        return !!n && n.apply(e, [t])
    }
    function es(e, t=null, n) {
        return this.addEventListener(e, t, n),
        {
            off: ()=>ts.apply(this, [e, t, n])
        }
    }
    function ts(e, t, n) {
        this.removeEventListener(e, t || null, n)
    }
    var ns, is, rs, ss, os;
    !function(e) {
        e.init = function(e, t) {
            const n = jt.create("lib.external");
            !function(e, t, n, i=document, r=!1, s, o) {
                const a = e
                  , c = i.documentElement;
                if (r) {
                    const e = i.createElement("link");
                    e.href = a,
                    e.rel = "preload",
                    e.as = "script",
                    e.onload = ()=>{
                        e.remove()
                    }
                    ,
                    c.prepend(e)
                }
                const u = i.createElement("script");
                u.async = !1,
                u.defer = !1,
                u.src = a,
                u.type = "text/javascript",
                t && u.setAttribute("data-ext-id", t),
                n && u.setAttribute("data-ext-version", n),
                u.onload = ()=>{
                    null == s || s(),
                    u.remove()
                }
                ,
                u.onerror = ()=>{
                    null == o || o()
                }
                ,
                c.prepend(u)
            }(t("src/js/Grammarly-externalEventsInjectedCs.js"), re());
            const i = Yr.map((t=>{
                const i = `external:${t}`;
                return es.call(document, i, (({detail: t})=>{
                    n.trace("external event", {
                        event: i,
                        detail: t
                    }),
                    e.sendBackground(i, t)
                }
                ))
            }
            ));
            return {
                dispose: ()=>{
                    i.forEach((e=>e.off()))
                }
            }
        }
    }(ns || (ns = {})),
    function(e) {
        const t = jt.create("Reports");
        function n(e) {
            var t;
            const n = null === (t = self.document) || void 0 === t ? void 0 : t.createElement("a");
            n.href = "data:application/octet-stream," + encodeURIComponent(function(e) {
                const t = e=>{
                    try {
                        return JSON.stringify(e)
                    } catch (t) {
                        return String(e)
                    }
                }
                ;
                return [["Level", "Logger", "Timestamp", "Message"].join("\t"), ...e.map((e=>{
                    const n = [e.level, e.loggerName, new Date(e.timestamp).toISOString(), e.message];
                    return e.data && n.push(t(e.data)),
                    e.exception && n.push(t(e.exception)),
                    n.join("\t")
                }
                ))].join("\n")
            }(e)),
            n.target = "_blank",
            n.download = "grammarly-logs.tsv",
            n.click()
        }
        async function i(e) {
            if (t.debug("start download debug reports"),
            !er().historyLogsService.isHistoryEnabled())
                return t.debug("debug reports feature is not enabled"),
                alert("Logging is not enabled");
            if (!self.confirm('Click on "OK," will attempt to download a file with the information needed to investigate the issue you are experiencing. This archive may include domains you have recently visited and the text from the document you are typing in. To minimize the amount of sensitive information you share with us, we recommend that you (1) open a new browser window, (2) visit only the website where you can reproduce this issue, and (3) type in a document that includes only text you are comfortable sharing. For more details, see our Privacy Policy (https://www.grammarly.com/privacy-policy).'))
                return;
            t.debug("confirm download debug reports");
            const i = [];
            e.sort((e=>e.envName === er().context ? 1 : -1));
            try {
                await (s = Xt,
                o = r(),
                Promise.race([h(s), o]))
            } catch (e) {
                t.warn("cannot get latest app state", e)
            }
            var s, o;
            for (const t of e) {
                const e = await t.getLogs();
                i.push(...null != e ? e : [])
            }
            i.sort(((e,t)=>e.timestamp - t.timestamp)),
            n(i)
        }
        async function r() {
            t.info("latest experiments state", await er().bgRpc.api.getExperimentTreatment()),
            t.info("latest storage state", await er().browserApi.preferences.getAll()),
            t.info("browser info", J())
        }
        e.download = i,
        e.initKeyboardShortcutHandler = function(e) {
            return Yn(self, "keydown").pipe(ht((e=>"KeyS" === e.code && e.altKey && e.shiftKey && (e.ctrlKey || e.metaKey)))).subscribe((()=>{
                i(e)
            }
            ))
        }
        ,
        e.logLatestState = r
    }(is || (is = {})),
    function(e) {
        let t;
        !function(e) {
            e.disableOnTab = "disableOnTab",
            e.reloadTab = "reloadTab",
            e.showOnboardingDialog = "showOnboardingDialog",
            e.hideGdocsSigninPopupMessage = "hideGdocsSigninPopupMessage",
            e.sendCsLogsToPopup = "sendCsLogsToPopup",
            e.downloadDebugReportsFromCS = "downloadDebugReportsFromCS"
        }(t = e.Kind || (e.Kind = {}))
    }(rs || (rs = {})),
    function(e) {
        let t;
        !function(e) {
            e.sendCsLogs = "sendCsLogs"
        }(t = e.Kind || (e.Kind = {}))
    }(ss || (ss = {})),
    function(e) {
        function t(e) {
            const t = ()=>{
                e.bgRpc.api.sendToPopup({
                    kind: ss.Kind.sendCsLogs,
                    option: {
                        logs: e.historyLogsService.getLogs(),
                        isIframeIntegration: ce()
                    }
                })
            }
            ;
            return e.message.on(rs.Kind.sendCsLogsToPopup, t),
            {
                dispose() {
                    e.message.off(rs.Kind.sendCsLogsToPopup, t)
                }
            }
        }
        function n(e) {
            return [new cr("bg",(()=>e.bgRpc.api.getBGLogs()),cr.getLogsFromSessionStorageFallbackGetter(or.bgHistoryLogs)), new cr("cs",(()=>Promise.resolve(e.historyLogsService.getLogs())),cr.getLogsFromSessionStorageFallbackGetter(or.csHistoryLogs))]
        }
        function i(e) {
            return e.message.on(rs.Kind.downloadDebugReportsFromCS, s),
            {
                dispose() {
                    e.message.off(rs.Kind.sendCsLogsToPopup, s)
                }
            }
        }
        function r(e) {
            const t = ce() ? new De : is.initKeyboardShortcutHandler(n(e));
            return {
                dispose() {
                    t.unsubscribe()
                }
            }
        }
        function s() {
            const e = n(hr());
            is.download(e)
        }
        e.initSendLogsToPopupHandler = t,
        e.initDownloadDebugReportsListener = i,
        e.initKeyboardShortcutHandler = r,
        e.initListeners = function(e) {
            const n = [t(e), r(e), i(e)];
            return {
                dispose() {
                    n.forEach((e=>{
                        e.dispose()
                    }
                    ))
                }
            }
        }
        ,
        e.download = s
    }(os || (os = {}));
    var as = n(70201);
    function cs(e, t) {
        const n = e.anchorNode;
        if (!n)
            return !1;
        const i = Kr.map((e=>Array.isArray(e) ? `[${e[0]}="${e[1]}"]` : `[${e}]`)).join(",")
          , r = t.activeElement
          , s = e.toString().trim()
          , o = "TEXTAREA" !== n.tagName && "INPUT" !== n.tagName
          , a = !r || "INPUT" !== r.tagName && "TEXTAREA" !== r.tagName
          , c = !Zr(n)
          , u = !Xr(n, i) && !Qr(n, i)
          , l = !Xr(n, "[contenteditable=true],[contenteditable=plaintext-only]") && !function(e) {
            let t = e.parentNode;
            for (; null !== t; ) {
                if (Zr(t))
                    return t;
                t = t.parentNode
            }
            return !1
        }(n);
        return !!(s && o && a && c && u && l)
    }
    var us = function() {
        function e(e, t) {
            this.dueTime = e,
            this.scheduler = t
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new ls(e,this.dueTime,this.scheduler))
        }
        ,
        e
    }()
      , ls = function(e) {
        function t(t, n, i) {
            var r = e.call(this, t) || this;
            return r.dueTime = n,
            r.scheduler = i,
            r.debouncedSubscription = null,
            r.lastValue = null,
            r.hasValue = !1,
            r
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            this.clearDebounce(),
            this.lastValue = e,
            this.hasValue = !0,
            this.add(this.debouncedSubscription = this.scheduler.schedule(ds, this.dueTime, this))
        }
        ,
        t.prototype._complete = function() {
            this.debouncedNext(),
            this.destination.complete()
        }
        ,
        t.prototype.debouncedNext = function() {
            if (this.clearDebounce(),
            this.hasValue) {
                var e = this.lastValue;
                this.lastValue = null,
                this.hasValue = !1,
                this.destination.next(e)
            }
        }
        ,
        t.prototype.clearDebounce = function() {
            var e = this.debouncedSubscription;
            null !== e && (this.remove(e),
            e.unsubscribe(),
            this.debouncedSubscription = null)
        }
        ,
        t
    }(He);
    function ds(e) {
        e.debouncedNext()
    }
    function hs(e, t) {
        return "function" == typeof t ? function(n) {
            return n.pipe(hs((function(n, i) {
                return xi(e(n, i)).pipe(zn((function(e, r) {
                    return t(n, e, i, r)
                }
                )))
            }
            )))
        }
        : function(t) {
            return t.lift(new ms(e))
        }
    }
    var ps, gs, fs, ms = function() {
        function e(e) {
            this.project = e
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new bs(e,this.project))
        }
        ,
        e
    }(), bs = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            return i.project = n,
            i.index = 0,
            i
        }
        return Fe(t, e),
        t.prototype._next = function(e) {
            var t, n = this.index++;
            try {
                t = this.project(e, n)
            } catch (e) {
                return void this.destination.error(e)
            }
            this._innerSub(t)
        }
        ,
        t.prototype._innerSub = function(e) {
            var t = this.innerSubscription;
            t && t.unsubscribe();
            var n = new Si(this)
              , i = this.destination;
            i.add(n),
            this.innerSubscription = Ri(e, n),
            this.innerSubscription !== n && i.add(this.innerSubscription)
        }
        ,
        t.prototype._complete = function() {
            var t = this.innerSubscription;
            t && !t.closed || e.prototype._complete.call(this),
            this.unsubscribe()
        }
        ,
        t.prototype._unsubscribe = function() {
            this.innerSubscription = void 0
        }
        ,
        t.prototype.notifyComplete = function() {
            this.innerSubscription = void 0,
            this.isStopped && e.prototype._complete.call(this)
        }
        ,
        t.prototype.notifyNext = function(e) {
            this.destination.next(e)
        }
        ,
        t
    }(ki);
    !function(e) {
        e.anonymous = "anonymous",
        e.registered = "registered",
        e.premium = "premium",
        e.business = "business",
        e.edu = "edu",
        e.ngo = "ngo",
        e.k12 = "k12",
        e.gov = "gov"
    }(ps || (ps = {})),
    function(e) {
        function t(e) {
            return !e.anonymous && e.premium
        }
        function n(e) {
            var t;
            return ["BUSINESS", "NGO", "GOV"].includes((null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType) || "")
        }
        function i(e) {
            return !!e.institutionInfo
        }
        function r(e) {
            var t;
            return "EDU" === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType)
        }
        function s(e) {
            var t;
            return "K12" === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType)
        }
        function o(e) {
            var t;
            return "NGO" === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType)
        }
        function a(e) {
            var t;
            return "GOV" === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.organizationType)
        }
        e.getType = function(e) {
            return i(e) ? o(e) ? ps.ngo : r(e) ? ps.edu : a(e) ? ps.gov : s(e) ? ps.k12 : ps.business : e.premium ? ps.premium : e.anonymous ? ps.anonymous : ps.registered
        }
        ,
        e.isFree = function(e) {
            return !e.anonymous && !e.premium
        }
        ,
        e.isPremium = t,
        e.isFreeTrial = function(e) {
            return !!(t(e) && e.customFields && e.customFields.frontend_premiumTrialEndDate) && new Date < new Date(e.customFields.frontend_premiumTrialEndDate)
        }
        ,
        e.getUserRole = function(e, t) {
            var n;
            return null === (n = e.roles) || void 0 === n ? void 0 : n.find((e=>e.type === t))
        }
        ,
        e.isEdcBlocked = function(e) {
            return !!e.edc && !e.edc.compliant
        }
        ,
        e.isDocsDisabled = function(e) {
            var t, n;
            return null !== (n = null === (t = e.editorFeatures) || void 0 === t ? void 0 : t.docsDisabled) && void 0 !== n && n
        }
        ,
        e.hasRole = function(e) {
            return !!e.customFields && (void 0 !== e.customFields.frontend_role && "" !== e.customFields.frontend_role)
        }
        ,
        e.hasSoundFluentGoals = function(e) {
            return !!e.customFields && (void 0 !== e.customFields.frontend_soundFluent && "" !== e.customFields.frontend_soundFluent)
        }
        ,
        e.hasPrimaryLanguage = function(e) {
            return !!e.customFields && (void 0 !== e.customFields.frontend_primaryLanguage && "" !== e.customFields.frontend_primaryLanguage)
        }
        ,
        e.isBusinessAdmin = function(e) {
            var t;
            return Boolean(n(e) && (null === (t = null == e ? void 0 : e.institutionInfo) || void 0 === t ? void 0 : t.admin))
        }
        ,
        e.doesUserBelongToBusinessInstitution = n,
        e.doesUserBelongToInstitution = i,
        e.doesUserBelongToEDUInstitution = r,
        e.doesUserBelongToK12Institution = s,
        e.doesUserBelongToNGOInstitution = o,
        e.doesUserBelongToGOVInstitution = a,
        e.isClaimed = function(e) {
            return e.groups.includes("claimed-invitation")
        }
        ;
        e.isGrammarlyEmployee = function(e) {
            var t;
            return e.email.endsWith("@grammarly.com") && 624392205 === (null === (t = e.institutionInfo) || void 0 === t ? void 0 : t.id)
        }
        ,
        e.isTestUser = function(e) {
            return e.email.endsWith("@bh.exacttarget.com")
        }
        ,
        e.isConsumerUser = function(e) {
            return !i(e)
        }
        ,
        e.defaultUser = {
            anonymous: !0,
            groups: [],
            id: "",
            premium: !1,
            isTest: !1,
            settings: {},
            subscriptionFree: !1,
            type: "anonymous",
            email: "",
            registrationDate: (new Date).toString(),
            firstName: ""
        }
    }(gs || (gs = {})),
    function(e) {
        e.empty = "empty",
        e.local = "local",
        e.server = "server",
        e.localOverride = "localOverride"
    }(fs || (fs = {}));
    const vs = {
        source: fs.local,
        version: "0",
        newRichTextFieldsEnabled: !0,
        fluidDisabledForFirefox: !1,
        fluidDisabledForSafari: !1,
        fullSentenceRewritesDisabled: !1,
        overrideKey: "dynamicConfigOverrideKey",
        ungatingRenewalNotificationEnabled: !1,
        quillJSCatchAllDisabled: !1
    };
    const _s = (e,t)=>{
        const n = {
            getAll: async()=>await i.getAll(),
            get: async e=>await i.get(e),
            view: ()=>{
                throw new Error("not_implemented")
            }
            ,
            patch: async e=>await i.set(e),
            changes: (i = e.browserApi.preferences).changes
        };
        var i;
        const r = Dt(xi(n.changes).pipe(Ni(null), (o = 200,
        void 0 === a && (a = ti),
        function(e) {
            return e.lift(new us(o,a))
        }
        ), hs((()=>n.getAll()))), xi(S(5, (s = 2,
        Xt / s), (()=>e.bgRpc.api.getPageConfig(t, self.location.href))).catch((e=>null))).pipe(Ni(null)), ((e,n)=>{
            var i, r, s, o, a, c;
            const u = null !== (r = null === (i = e.extensionSettings) || void 0 === i ? void 0 : i[t]) && void 0 !== r ? r : {}
              , l = (null === (s = null == u ? void 0 : u.enabled) || void 0 === s || s) && (null === (o = null == n ? void 0 : n.enabled) || void 0 === o || o);
            return {
                user: null !== (a = e.user) && void 0 !== a ? a : gs.defaultUser,
                settings: e.extensionSettings,
                dynamicConfig: null !== (c = e.dynamicConfig) && void 0 !== c ? c : vs,
                dapi: e.dapi,
                enabled: l
            }
        }
        ));
        var s, o, a;
        return {
            storeLite: n,
            viewStoreLite: r
        }
    }
    ;
    var ys = n(71654);
    const ws = "grExtInstalled"
      , Es = "grExtDisabled";
    function xs(e) {
        var t;
        null === e && "next" === (null === (t = null === document || void 0 === document ? void 0 : document.body) || void 0 === t ? void 0 : t.dataset[Es]) || (null === e ? function() {
            var e;
            (null === (e = null === document || void 0 === document ? void 0 : document.body) || void 0 === e ? void 0 : e.dataset) && delete document.body.dataset[Es]
        }() : document.body.dataset[Es] = e)
    }
    class Ss {
        constructor(e, t, n, i=jt.create("ExtensionIntegrationCheck")) {
            this._csShareStorage = e,
            this._loadContentScript = t,
            this._log = i,
            this._pageEnable = !0,
            this._citationBuilderEnable = !1,
            this._enabledDefs = !1,
            this._isAnonymous = !0,
            this._wasLoaded = !1,
            this._isDesktopIntegrationEnable = !1,
            this._mutations = qr.createFlattenHot(self.document, {
                childList: !0,
                subtree: !0
            }),
            this._textFieldsObservable = Lr.createFocusObservable(self.document, this._mutations),
            this._subs = [this._textFieldsObservable.subscribe((e=>{
                const t = e.owner.frame || e.element
                  , n = gr.get(t);
                this._log.debug("detected click", {
                    field: t,
                    fieldType: n
                }),
                this._pageEnable && (n.generic || n.specific) && this.load()
            }
            )), Ss.clickObserver.subscribe((e=>{
                2 === e.detail && this._enabledDefs && this._pageEnable && !this._isAnonymous && Rs.isValid() && (this._log.debug("dictionary event executed", e),
                this._csShareStorage.set("extensionDictionaryEvent", e),
                this._subs.push(Rs.animation()),
                this.load())
            }
            ))],
            n && !ce() && this.load()
        }
        load() {
            this._wasLoaded && !this._isDesktopIntegrationEnable || (this._log.debug("load main content script"),
            this._wasLoaded = !0,
            Is.callExecuteContentScript(),
            this.dispose(),
            this._loadContentScript())
        }
        dispose() {
            this._subs.forEach((e=>{
                try {
                    e.unsubscribe()
                } catch (e) {}
            }
            ))
        }
        updateState(e, t, n, i, r) {
            this._isDesktopIntegrationEnable = i,
            (!this._pageEnable && t || !this._citationBuilderEnable && r) && this.load(),
            this._citationBuilderEnable = r,
            this._isAnonymous = e,
            this._pageEnable = t,
            this._enabledDefs = n,
            xs(this._pageEnable ? null : "forever")
        }
    }
    var ks, Rs, Is;
    !function(e) {
        e.clickObserver = Yn(self.document, "click", {
            capture: !0
        }),
        e.start = async function(t, n=!0, i, r=!1) {
            Is.checkScriptInitStart();
            const s = gn()
              , o = dr.init({
                ...t,
                skipInitExtensionApi: n,
                skipWriteLogsToBackupStorage: !0
            })
              , a = jt.create("universal.check");
            if ("text/html" !== document.contentType)
                return a.info("not a html page, skip integration check"),
                void qn().skipIntegrationForNonHtmlPage();
            const c = []
              , u = new e(o.csShareStorage,(()=>{
                (null != i ? i : o.bgRpc.api.loadContentScript)(),
                c.forEach((e=>e && e.dispose()))
            }
            ),r)
              , l = new Gr
              , d = ks.init(o.browserApi, o.message, o.config, s)
              , {viewStoreLite: h} = _s(o, s)
              , p = w((e=>{
                qn().sendFemetricsRate("checkScriptInitialized", {
                    domain: bn(),
                    isExtensionEnabled: e,
                    isIframe: ce()
                }, ["firstInstall", "registrationDate"])
            }
            ))
              , g = h.subscribe((e=>{
                var t, n, i, r;
                a.debug("check script state is updated", e);
                const o = null === (t = e.settings) || void 0 === t ? void 0 : t.common;
                u.updateState(null === (i = null === (n = e.user) || void 0 === n ? void 0 : n.anonymous) || void 0 === i || i, e.enabled, null !== (r = null == o ? void 0 : o.enabledDefs) && void 0 !== r && r, $r.isIntegrationEnabled(o, s, e.dynamicConfig), jr(s, e.dynamicConfig, o)),
                l.updateState(s, e.dynamicConfig, e.enabled, o),
                p(e.enabled)
            }
            ))
              , f = [u, d, l];
            o.message.once("contentScript-disconnected", (()=>{
                g.unsubscribe(),
                o.csShareStorage.clean(),
                f.forEach((e=>e && e.dispose()))
            }
            )),
            o.message.once(rs.Kind.disableOnTab, (()=>{
                l.dispose()
            }
            )),
            os.initSendLogsToPopupHandler(o),
            c.push(os.initKeyboardShortcutHandler(o)),
            Is.checkScriptInitEnd(o.bgRpc),
            (e=>{
                if (self.location.href.includes("grammarly.com/extension-success")) {
                    const t = document.getElementById("click-to-run");
                    t && (t.onclick = ()=>{
                        var t, n;
                        confirm("Always allow Grammarly to run on every website") ? (e.api.enableClickToRunOnAllWebsites(),
                        null === (t = document.getElementById("click-to-run-success")) || void 0 === t || t.click()) : null === (n = document.getElementById("click-to-run-fail")) || void 0 === n || n.click()
                    }
                    )
                }
            }
            )(o.bgRpc),
            a.debug("Check script initialized!")
        }
    }(Ss || (Ss = {})),
    function(e) {
        function t(e) {
            ni(10).pipe(ht((()=>!!document.body)), vi()).subscribe((()=>{
                document.body.dataset.newGrCSCheckLoaded = e.buildInfo.version,
                document.body.dataset[ws] = ""
            }
            ))
        }
        e.init = function(e, n, i, r) {
            const s = [];
            return t(i),
            self.location.protocol === i.appConfig.url.grammarlyProtocol && r.match(`^([a-z\\-0-9]+\\.)*${i.appConfig.url.grammarlyDomain}$`) && s.push(ns.init(n, e.getUrl)),
            {
                dispose: ()=>{
                    s.forEach((e=>e.dispose()))
                }
            }
        }
    }(ks || (ks = {})),
    function(e) {
        const t = "important";
        function n(e) {
            return String(e) + "px"
        }
        e.isValid = function() {
            const e = self.document.getSelection();
            return !(!e || e.toString().match(/[0-9_±!@#$%^&*:"|<>?~().,:}{’='-/ /]/)) && cs(e, self.document)
        }
        ,
        e.animation = function() {
            const e = document.createElement("div")
              , i = e.attachShadow({
                mode: "open"
            })
              , r = document.createElement("style");
            r.innerHTML = ys.__css,
            i.appendChild(r);
            const s = self.document.getSelection().getRangeAt(0).getBoundingClientRect()
              , o = document.createElement("div");
            o.style.setProperty("top", n(s.top), t),
            o.style.setProperty("left", n(s.left), t),
            o.style.setProperty("height", n(s.height), t),
            o.style.setProperty("max-width", n(s.width), t),
            o.style.setProperty("z-index", pr.toString(), t),
            o.classList.add(ys.animatedUnderline, ys.checkAnimatedUnderline),
            i.appendChild(o),
            document.body.appendChild(e);
            const a = ni(10)
              , c = Dt(Ss.clickObserver.pipe(vi(), (u = !1,
            function(e) {
                return e.lift(new _i(u))
            }
            ), Ni(!0), Pi()), a.pipe(zn((()=>{
                const e = "." + as.completeAnimation;
                if (document.querySelector(e))
                    return !0;
                const t = Array.from(document.querySelectorAll("grammarly-extension"));
                for (const n of t)
                    if (n.shadowRoot && n.shadowRoot.querySelector(e))
                        return !0;
                return !1
            }
            )), Ni(!1), Pi())).pipe(ht((([e,t])=>!e || t)), Pi()).subscribe(l);
            var u;
            return {
                unsubscribe: l
            };
            function l() {
                c.unsubscribe(),
                e.remove()
            }
        }
    }(Rs || (Rs = {})),
    function(e) {
        const t = Date.now()
          , n = e=>self.performance.mark("@grammarly-extension:" + e);
        e.callExecuteContentScript = ()=>n("callExecuteContentScript"),
        e.checkScriptInitEnd = e=>{
            const i = Math.random() < .01;
            if (n("checkScriptInitEnd"),
            i) {
                const n = Date.now();
                e.api.trackCall(lr, ["sendFelogEvent", {
                    ex_csInitPerf: {
                        domain: self.location.host,
                        initTime: n - t,
                        pageLoadTime: n - self.performance.timing.responseEnd
                    },
                    hideUserInfo: !0,
                    level: on.INFO,
                    logger: "checkScript.initialized"
                }])
            }
        }
        ,
        e.checkScriptInitStart = ()=>n("checkScriptInitStart")
    }(Is || (Is = {}));
    class Ts {
        setPrefetchedTreatments(e) {}
        fetchTreatments(e) {
            return Promise.resolve()
        }
        dispose() {}
        getTreatment(e) {
            return null
        }
        peekTreatment(e) {
            return null
        }
        logTreatment(e) {
            return Promise.resolve()
        }
        isGateEnabled(e) {
            return !1
        }
    }
    function Fs() {
        return self.chrome && self.chrome.runtime && self.chrome.runtime.lastError
    }
    function As() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    }
    function Cs() {
        return As() + As() + "-" + As() + "-" + As() + "-" + As() + "-" + As() + As() + As()
    }
    const Os = "docs.google.com";
    function Ns(e, t) {
        return (n,i)=>{
            return "extensionSettings" === n && ((r = i) && "object" == typeof r && "common"in r) ? function(e, t, n) {
                const i = e[Os];
                if (!1 !== (null == i ? void 0 : i.enabled) || (null == i ? void 0 : i.forcedEnabledDate_1639893688790))
                    return n(),
                    e;
                {
                    const {disabledDate: n, ...r} = i;
                    return t(n),
                    {
                        ...e,
                        [Os]: {
                            ...r,
                            enabled: !0,
                            forcedEnabledDate_1639893688790: Date.now()
                        }
                    }
                }
            }(i, e, t) : i;
            var r
        }
    }
    function Ps(e, t) {
        chrome.runtime.lastError ? t(chrome.runtime.lastError) : e()
    }
    class Ls {
        constructor() {
            this._log = jt.create("extension-api.managed-storage.validator")
        }
        validate(e, t) {
            switch (e) {
            case "GrammarlyEnrollmentToken":
                return "string" == typeof t && t.length > 0 && /^[a-z0-9_-]+$/i.test(t);
            case "GrammarlyBlockedClients":
            case "GrammarlyBlockedDomains":
                return "string" == typeof t;
            case "GrammarlyConfidentialModeEnabled":
            case "GrammarlyDlpEnabled":
                return "boolean" == typeof t;
            case "GrammarlyExtensionMode":
                return "string" == typeof t && ("limited" === t || "full" === t);
            default:
                return this._log.warn(`Unknown key: ${e}`),
                !1
            }
        }
    }
    class Ms {
        constructor() {
            this._log = jt.create("extension-api.managed-storage.chrome"),
            this._validator = new Ls
        }
        get(e) {
            return Bi.fromPromise(new Promise((t=>{
                chrome.storage.managed.get(e, (n=>{
                    Ps((()=>{
                        const i = n[e];
                        void 0 === i || this._validator.validate(e, i) ? t(i) : (this._log.warn(`Invalid value for "${e}": ${JSON.stringify(n[e])}`),
                        t(void 0))
                    }
                    ), (n=>{
                        this._log.error(`Could not get "${e}"`, n),
                        t(void 0)
                    }
                    ))
                }
                ))
            }
            )))
        }
    }
    const Us = "message:to-priv";
    var Ds;
    !function(e) {
        e[e.success = 0] = "success",
        e[e.successWithEmpty = 1] = "successWithEmpty",
        e[e.alreadyMigrated = 2] = "alreadyMigrated"
    }(Ds || (Ds = {}));
    const Bs = jt.create("extension-api.message")
      , js = ()=>`cs-bg-runtime-${re()}`
      , Hs = ()=>{}
    ;
    class $s {
        constructor() {
            this._listeners = {},
            this._queue = {},
            this.fire = (e,t,n=Hs,i)=>{
                const r = this._listeners[e] || [];
                r.length ? r.forEach((e=>e(t, n, i))) : (this._queue[e] = this._queue[e] || [],
                this._queue[e].push({
                    content: t,
                    callback: n,
                    sender: i
                }))
            }
            ,
            this.unlisten = (e,t)=>{
                const n = this._listeners[e] || []
                  , i = n.indexOf(t);
                -1 !== i && (1 === n.length ? delete this._listeners[e] : n.splice(i, 1))
            }
            ,
            this.listenOnce = (e,t)=>{
                const n = (i,r,s)=>{
                    this.unlisten(e, n),
                    t && t(i, r, s)
                }
                ;
                this.listen(e, n)
            }
            ,
            this.listen = (e,t)=>{
                this._listeners[e] = this._listeners[e] || [],
                -1 === this._listeners[e].indexOf(t) && this._listeners[e].push(t);
                const n = this._queue[e] || [];
                if (n.length) {
                    for (const e of n)
                        try {
                            t(e.content, e.callback, e.sender)
                        } catch (e) {
                            Bs.error("exception during proccesing buffered messages", e)
                        }
                    delete this._queue[e]
                }
            }
        }
    }
    const Vs = jt.create("extension-api.message.bg")
      , Ws = "popup";
    function Gs(e) {
        const {browser: t, extensionType: n} = ie().bundleInfo;
        if (!e)
            return "safariIOSWebExtension" === n || "safariWebExtension" === n;
        const i = "firefox" === t ? /^moz-extension:\/\/.*\/src\/popup.html$/ : "safariWebExtension" === n || "safariIOSWebExtension" === n ? /^safari-web-extension:\/\/.*\/src\/popup.html$/ : "chrome" === t || "edge" === t ? chrome && chrome.runtime && chrome.runtime.id ? new RegExp(chrome.runtime.id + "/src/popup.html") : void 0 : m(t);
        return void 0 !== i && i.test(e)
    }
    class qs {
        constructor(e, t, n, i) {
            this._getActiveTab = t,
            this._sendMessageToTab = n,
            this._getAllTabs = i,
            this.kind = "background-message-api",
            this.topFrameId = "0",
            this._callbacks = {},
            this._tabPorts = {
                popup: [],
                devtoolsPanel: []
            },
            this._messageHelper = new $s,
            this.toFocused = (e,t)=>Bi.fromPromise(this._getActiveTab().then((({id: n, url: i}={})=>{
                if (n)
                    return Gs(i) ? Vs.warn(`toFocussed not allowed for popup when it open like regular tab ${e}`, t) : void this._sendMessageToPorts({
                        type: e,
                        content: t,
                        callid: Cs()
                    }, n)
            }
            ))),
            this._initPortListener = e=>{
                if (e.name === Us) {
                    const {sender: t} = e;
                    if (t) {
                        if (t.tab) {
                            const {id: n, url: i} = t.tab;
                            if (n) {
                                let t = this._tabPorts[n];
                                void 0 === t && (t = this._tabPorts[n] = []),
                                t.push(e)
                            }
                            i && 0 === i.indexOf("http") && this._messageHelper.fire("tab-connected", {
                                tab: n,
                                url: i
                            }),
                            e.onDisconnect((()=>{
                                if (!n)
                                    return;
                                const t = this._tabPorts[n];
                                t && t.splice(t.indexOf(e), 1)
                            }
                            ))
                        }
                        const n = t.url ? t.url : t.tab ? t.tab.url : ""
                          , i = Gs(n)
                          , r = function(e) {
                            const {browser: t} = ie().bundleInfo;
                            return e && "chrome" === t && chrome && chrome.runtime && chrome.runtime.id && new RegExp(chrome.runtime.id + "/src/devtoolsPanel.html").test(e)
                        }(n);
                        if (i || r) {
                            const t = i ? Ws : "devtoolsPanel";
                            this._tabPorts[t] = this._tabPorts[t] || [],
                            this._tabPorts[t].push(e),
                            e.onDisconnect((()=>{
                                const n = this._tabPorts[t];
                                n.splice(n.indexOf(e), 1)
                            }
                            ))
                        }
                    }
                    e.onMessage((n=>{
                        const i = ({callid: n, content: i, type: r})=>{
                            this._callbacks[n] && (this._callbacks[n](i),
                            delete this._callbacks[n]);
                            this._messageHelper.fire(r, i, (t=>e.postMessage({
                                content: t,
                                callid: n
                            })), t && t.tab ? {
                                tabId: String(t.tab.id),
                                frameId: void 0 === t.frameId ? void 0 : String(t.frameId)
                            } : {
                                tabId: Ws
                            })
                        }
                        ;
                        "tab-connected" === n.type ? this._getActiveTab().then((({url: e}={})=>{
                            n.content = {
                                tab: Ws,
                                url: e
                            },
                            i(n)
                        }
                        )) : i(n)
                    }
                    ))
                }
            }
            ,
            e(this._initPortListener)
        }
        async _findDestinationTab(e) {
            return (await this._getAllTabs()).find((t=>String(t.id) === String(e)))
        }
        async _sendMessageToPorts(e, t, n) {
            var i;
            try {
                const r = null === (i = this._tabPorts[t]) || void 0 === i ? void 0 : i.filter((e=>!he(n) || he(e.sender.frameId) && e.sender.frameId === n));
                if (null == r ? void 0 : r.length)
                    r.forEach((t=>t.postMessage(e)));
                else if (isNaN(Number(t)))
                    Vs.warn(`tab with id ${t} couldn't be found and not valid to send a tab message`);
                else {
                    const i = await this._findDestinationTab(t);
                    if (!i || "complete" !== i.status)
                        return;
                    const r = {
                        type: js(),
                        data: e
                    };
                    Vs.warn("no specified port on current destination"),
                    this._sendMessageToTab(r, Number(t), n).catch((async e=>{
                        const n = await this._findDestinationTab(t);
                        qn().sendToTabFailed({
                            isOpen: !!n,
                            status: null == n ? void 0 : n.status
                        }, e)
                    }
                    ))
                }
            } catch (i) {
                Vs.error("send message to tab emit an error", i, {
                    tabId: t,
                    frameId: n,
                    msg: e
                })
            }
        }
        getPortExists(e) {
            return !!this._tabPorts[e]
        }
        sendTo(e, t, n, i) {
            const {tabId: r, frameId: s=null} = "object" == typeof e ? e : {
                tabId: String(e)
            }
              , o = {
                type: t,
                content: n
            };
            i && "function" == typeof i && (o.callid = Cs(),
            this._callbacks[o.callid] = i),
            this._sendMessageToPorts(o, r, s ? Number(s) : void 0)
        }
        listen(e, t) {
            this._messageHelper.listen(e, t)
        }
    }
    const zs = jt.create("Messaging.extension-api.content");
    class Ks {
        constructor(e, t, n, i) {
            this._bgIsWorking = t,
            this._extensionId = n,
            this._onRuntimeMessageFromBg = i,
            this.kind = "content-script-message-api",
            this._callbacks = {},
            this._messageHelper = new $s,
            this._disconnected = !1,
            this.broadcastBackground = async(e,t,n)=>{
                var i, r;
                const s = Cs();
                n && "function" == typeof n && (this._callbacks[s] = n);
                try {
                    if (!this.backgroundPort) {
                        if (!await this._bgIsWorking())
                            throw new Error("lost connection to bg port");
                        this.initPort(),
                        zs.trace("Content script connection was restored")
                    }
                    null === (i = this.backgroundPort) || void 0 === i || i.postMessage({
                        type: e,
                        callid: s,
                        content: t
                    })
                } catch (n) {
                    if (!await this._bgIsWorking())
                        return this._onDisconnect();
                    try {
                        this.initPort(),
                        null === (r = this.backgroundPort) || void 0 === r || r.postMessage({
                            type: e,
                            callid: s,
                            content: t
                        })
                    } catch (n) {
                        throw zs.error("failed to invoke postMessage() on bg port", n, {
                            type: e,
                            callid: s,
                            content: t
                        }),
                        n
                    }
                }
            }
            ,
            this._onRuntimeMessageHandler = async(e,t,n)=>{
                if (n({
                    status: !0
                }),
                !await this._bgIsWorking())
                    return this._onDisconnect();
                t.id !== this._extensionId && e.type !== js() || (this._onBgPortMessage(e.data),
                this.initPort())
            }
            ,
            this._onBgPortMessage = ({callid: e, content: t, type: n})=>{
                this._callbacks[e] ? (this._callbacks[e](t),
                delete this._callbacks[e]) : this._messageHelper.fire(n, t, (t=>{
                    if (!this.backgroundPort)
                        throw new Error("fail reply to bg page - connection lost");
                    this.backgroundPort.postMessage({
                        content: t,
                        callid: e
                    })
                }
                ))
            }
            ,
            this._onDisconnect = async()=>{
                var e, t;
                if (null === (t = null === (e = this.backgroundPort) || void 0 === e ? void 0 : e.removeMessageListeners) || void 0 === t || t.call(e),
                this.backgroundPort = null,
                await this._bgIsWorking())
                    return zs.trace("BG SW is shutdown, but BG SW page is still available."),
                    void this._messageHelper.fire("bgSW-shutdown", null);
                this._disconnected || (this._onRuntimeMessageFromBg.removeListener(this._onRuntimeMessageHandler),
                this._disconnected = !0,
                zs.trace("Content script messaging went disconnected."),
                this._messageHelper.fire("contentScript-disconnected", null))
            }
            ,
            this._portInit = e,
            this.initPort(),
            this._onRuntimeMessageFromBg.addListener(this._onRuntimeMessageHandler)
        }
        initPort() {
            const e = this._portInit;
            this.backgroundPort || (this.backgroundPort = e(Us),
            this.backgroundPort.onMessage(this._onBgPortMessage),
            this.backgroundPort.onDisconnect(this._onDisconnect))
        }
        listen(e, t) {
            this._messageHelper.listen(e, t)
        }
    }
    class Js {
        constructor(e, t) {
            this.port = e.runtime.connect({
                name: t
            })
        }
        onMessage(e) {
            this.port.onMessage.addListener(e)
        }
        onDisconnect(e) {
            this.port.onDisconnect.addListener(e)
        }
        postMessage(e) {
            this.port.postMessage(e)
        }
    }
    const Ys = e=>({
        get: t=>Bi.create(((n,i)=>e.storage.local.get(t, (e=>{
            Ps((()=>n(e)), i)
        }
        )))),
        set: t=>Bi.create(((n,i)=>e.storage.local.set(t, (()=>{
            Ps(n, i)
        }
        )))),
        getAll: ()=>Bi.create(((t,n)=>e.storage.local.get(null, (e=>{
            Ps((()=>t(e)), n)
        }
        )))),
        remove: t=>Bi.create(((n,i)=>e.storage.local.remove(t, (()=>{
            Ps(n, i)
        }
        )))),
        removeAll: ()=>Bi.create(((t,n)=>e.storage.local.clear((()=>{
            Ps(t, n)
        }
        ))))
    });
    class Xs {
        constructor(e) {
            this._chromeInstance = e,
            this.kind = "chrome-mv3",
            this.get = e=>Bi.create(((t,n)=>{
                this._chromeInstance.storage.session.get(e, (e=>{
                    Ps((()=>t(e)), n)
                }
                ))
            }
            )),
            this.set = e=>Bi.create(((t,n)=>{
                this._chromeInstance.storage.session.set(e, (()=>{
                    Ps(t, n)
                }
                ))
            }
            )),
            this.getAll = ()=>Bi.create(((e,t)=>{
                this._chromeInstance.storage.session.get(null, (n=>{
                    Ps((()=>e(n)), t)
                }
                ))
            }
            )),
            this.remove = e=>Bi.create(((t,n)=>{
                this._chromeInstance.storage.session.remove(e, (()=>{
                    Ps(t, n)
                }
                ))
            }
            )),
            this.removeAll = ()=>Bi.create(((e,t)=>{
                this._chromeInstance.storage.session.clear((()=>{
                    Ps(e, t)
                }
                ))
            }
            )),
            this.onChange = e=>{
                const t = ()=>{
                    this.getAll().then((t=>e(t)))
                }
                ;
                return this._chromeInstance.storage.session.onChanged.addListener(t),
                ()=>this._chromeInstance.storage.session.onChanged.removeListener(t)
            }
            ,
            this.allowCStoUseSessionStorage = ()=>Bi.create(((e,t)=>{
                var n, i, r, s, o, a;
                null === (r = null === (i = null === (n = chrome.storage) || void 0 === n ? void 0 : n.session) || void 0 === i ? void 0 : i.setAccessLevel) || void 0 === r || r.call(i, {
                    accessLevel: null !== (a = null === (o = null === (s = chrome.storage) || void 0 === s ? void 0 : s.AccessLevel) || void 0 === o ? void 0 : o.TRUSTED_AND_UNTRUSTED_CONTEXTS) && void 0 !== a ? a : "TRUSTED_AND_UNTRUSTED_CONTEXTS"
                }, (()=>{
                    Ps(e, t)
                }
                ))
            }
            ))
        }
    }
    class Zs {
        constructor() {
            this.kind = "memory",
            this._data = {},
            this._listeners = [],
            this.get = e=>Bi.sync((()=>(Array.isArray(e) ? e : [e]).reduce(((e,t)=>({
                ...e,
                [t]: this._data[t]
            })), {}))),
            this.set = e=>Bi.sync((()=>{
                this._data = {
                    ...this._data,
                    ...e
                },
                this._callListeners()
            }
            )),
            this.getAll = ()=>Bi.sync((()=>this._data)),
            this.remove = e=>Bi.sync((()=>{
                (Array.isArray(e) ? e : [e]).forEach((e=>{
                    e in this._data && delete this._data[e]
                }
                )),
                this._callListeners()
            }
            )),
            this.removeAll = ()=>Bi.sync((()=>{
                this._data = {},
                this._callListeners()
            }
            )),
            this.onChange = e=>(this._listeners.push(e),
            ()=>this._listeners.splice(this._listeners.indexOf(e), 1))
        }
        _callListeners() {
            this._listeners.forEach((e=>e(this._data)))
        }
    }
    class Qs {
        constructor(e, t) {
            this._chrome = e,
            this._manifestVersion = t,
            this.kind = "web-extension",
            this.executeScript = (e,t,n)=>Bi.create(((i,r)=>{
                "3" !== this._manifestVersion ? this._chrome.tabs.executeScript(t, {
                    file: e,
                    matchAboutBlank: !0,
                    ...n ? {
                        frameId: Number(n)
                    } : {}
                }, (e=>eo(null == e ? void 0 : e[0], i, r))) : this._chrome.scripting.executeScript({
                    files: [e],
                    target: {
                        tabId: t,
                        ...n ? {
                            frameIds: [Number(n)]
                        } : {}
                    }
                }, (e=>{
                    var t;
                    return eo(null === (t = null == e ? void 0 : e[0]) || void 0 === t ? void 0 : t.result, i, r)
                }
                ))
            }
            )),
            this.executeFunction = (e,t,n)=>Bi.create(((i,r)=>{
                "3" !== this._manifestVersion ? this._chrome.tabs.executeScript(t, {
                    code: `(${e.toString()})()`,
                    matchAboutBlank: !0,
                    ...n ? {
                        frameId: Number(n)
                    } : {}
                }, (e=>eo(null == e ? void 0 : e[0], i, r))) : this._chrome.scripting.executeScript({
                    func: e,
                    target: {
                        tabId: t,
                        ...n ? {
                            frameIds: [Number(n)]
                        } : {}
                    }
                }, (e=>{
                    var t;
                    return eo(null === (t = null == e ? void 0 : e[0]) || void 0 === t ? void 0 : t.result, i, r)
                }
                ))
            }
            )),
            this.insertCSS = (e,t,n,i)=>Bi.create(((r,s)=>{
                "3" !== this._manifestVersion ? this._chrome.tabs.insertCSS(e, {
                    file: t,
                    code: n,
                    matchAboutBlank: !0,
                    ...i ? {
                        frameId: Number(i)
                    } : {}
                }, (()=>eo(void 0, r, s))) : this._chrome.scripting.insertCSS({
                    target: {
                        tabId: e,
                        ...i ? {
                            frameIds: [Number(i)]
                        } : {}
                    },
                    files: t ? [t] : void 0,
                    css: n
                }, (()=>eo(void 0, r, s)))
            }
            ))
        }
        open(e, t) {
            return Bi.create(((n,i)=>{
                this._chrome.tabs.create({
                    url: e,
                    active: t
                }, (e=>{
                    Ps((()=>n(e)), i)
                }
                ))
            }
            ))
        }
        updateCurrent(e) {
            return Bi.create(((t,n)=>{
                this._chrome.tabs.update({
                    url: e
                }, (e=>{
                    Ps((()=>t(e)), n)
                }
                ))
            }
            ))
        }
        getActiveTab() {
            return Bi.create(((e,t)=>{
                const n = this._chrome.tabs;
                n.query({
                    active: !0,
                    lastFocusedWindow: !0
                }, (i=>{
                    Ps((()=>{
                        i && i.length ? e(i[0]) : n.query({
                            active: !0
                        }, (n=>{
                            Ps((()=>{
                                e(n[0])
                            }
                            ), t)
                        }
                        ))
                    }
                    ), t)
                }
                ))
            }
            ))
        }
        getAllTabs() {
            return Bi.create(((e,t)=>this._chrome.tabs.query({}, (n=>Ps((()=>e(n)), t)))))
        }
        getActiveTabUrl() {
            return Bi.create(((e,t)=>this.getActiveTab().then((n=>Ps((()=>e(n && n.url)), t)))))
        }
        onActiveTabChange(e, t) {
            const n = n=>{
                Ps((()=>{
                    n && e(n)
                }
                ), (n=>{
                    t(n),
                    "Tabs cannot be edited right now (user may be dragging a tab)." === (null == n ? void 0 : n.message) && setTimeout((()=>{
                        this.getActiveTab().then((n=>{
                            n && Ps((()=>e(n)), t)
                        }
                        ))
                    }
                    ), 100)
                }
                ))
            }
            ;
            this._chrome.tabs.onActivated.addListener((e=>this._chrome.tabs.get(e.tabId, (e=>n(e))))),
            this._chrome.tabs.onUpdated.addListener(((e,t)=>{
                this.getActiveTab().then((i=>{
                    i && i.id === e && (t.url || t.favIconUrl || "complete" === t.status) && this._chrome.tabs.get(e, (e=>n(e)))
                }
                ))
            }
            )),
            this._chrome.windows.onFocusChanged.addListener((e=>this._chrome.tabs.query({
                active: !0,
                windowId: e,
                lastFocusedWindow: !0
            }, (e=>n(e[0]))))),
            this.getActiveTab().then((e=>n(e)))
        }
        reload(e) {
            return Bi.create(((t,n)=>{
                const i = ()=>Ps((()=>t()), n);
                e.id ? this._chrome.tabs.reload(e.id, {}, i) : this._chrome.tabs.reload(i)
            }
            ))
        }
        focusTab(e) {
            return Bi.create(((t,n)=>{
                this._chrome.tabs.update(e, {
                    highlighted: !0
                }, (()=>{
                    Ps((()=>t()), n)
                }
                ))
            }
            ))
        }
        sendMessageToTab(e, t, n) {
            return Bi.create(((i,r)=>{
                this._chrome.tabs.sendMessage(t, e, {
                    frameId: n
                }, (()=>{
                    Ps((()=>i()), r)
                }
                ))
            }
            ))
        }
    }
    function eo(e, t, n) {
        Fs() ? n(Fs()) : t(e)
    }
    var to, no, io = function() {
        function e(e) {
            this.notifier = e
        }
        return e.prototype.call = function(e, t) {
            return t.subscribe(new ro(e,this.notifier))
        }
        ,
        e
    }(), ro = function(e) {
        function t(t, n) {
            var i = e.call(this, t) || this;
            i.hasValue = !1;
            var r = new Si(i);
            i.add(r),
            i.innerSubscription = r;
            var s = Ri(n, r);
            return s !== r && (i.add(s),
            i.innerSubscription = s),
            i
        }
        return Fe(t, e),
        t.prototype._next = function(t) {
            this.hasValue && e.prototype._next.call(this, t)
        }
        ,
        t.prototype.notifyNext = function() {
            this.hasValue = !0,
            this.innerSubscription && this.innerSubscription.unsubscribe()
        }
        ,
        t.prototype.notifyComplete = function() {}
        ,
        t
    }(ki);
    !function(e) {
        e[e.nonEmptyMigration = 0] = "nonEmptyMigration",
        e[e.emptyMigration = 1] = "emptyMigration"
    }(to || (to = {}));
    class so {
        constructor(e, t, n, i=[], r=((e,t,n)=>t)) {
            this._name = e,
            this._source = t,
            this._destination = n,
            this._destValuesToKeep = i,
            this._valuesMapper = r,
            this._migrationFlagSuccessfulValue = "ok",
            this._migrationFlagKey = `__migration-${so.migrationFlagUniqueKey}:(${this._name})`,
            this._migrationInProgress = !1,
            this.migrationAwareDestination = function(e, t) {
                const {get: n, set: i, getAll: r, remove: s} = ke(e);
                return {
                    get: n,
                    set: i,
                    getAll: r,
                    remove: s,
                    removeAll: Bi.fromAsync((async()=>{
                        const n = await e.getAll();
                        await e.removeAll(),
                        await e.set(le(t, n))
                    }
                    )),
                    changes: e.changes,
                    dispose: ()=>{}
                }
            }(this._destination, (e=>e === this._migrationFlagKey))
        }
        async _getMigrated() {
            return (await this._destination.get(this._migrationFlagKey))[this._migrationFlagKey] === this._migrationFlagSuccessfulValue
        }
        async _setMigrated() {
            await this._destination.set({
                [this._migrationFlagKey]: this._migrationFlagSuccessfulValue
            });
            const e = await this._destination.get(this._migrationFlagKey);
            if (e[this._migrationFlagKey] !== this._migrationFlagSuccessfulValue)
                throw new Error(`Could not verify status write, actual value: ${e}`)
        }
        async _runMigration() {
            I(!this._migrationInProgress, "migration already in progress"),
            this._migrationInProgress = !0;
            try {
                const e = await this._source.getAll()
                  , t = le(((e,t)=>void 0 !== t), function(e, t) {
                    const n = {};
                    return Object.keys(t).forEach((i=>n[i] = e(i, t[i]))),
                    n
                }(((t,n)=>this._valuesMapper(t, n, e)), e))
                  , n = 0 === Object.keys(t).length
                  , i = await this._destination.get(this._destValuesToKeep)
                  , r = {
                    ...t,
                    ...i
                };
                if (await this._destination.removeAll(),
                await this._destination.set(r),
                !p(r, await this._destination.getAll()))
                    throw new Error("Could not verify write");
                return this._migrationInProgress = !1,
                n ? to.emptyMigration : to.nonEmptyMigration
            } catch (e) {
                throw this._migrationInProgress = !1,
                e
            }
        }
        async ensureMigrationCompleted() {
            if (await this._getMigrated())
                return Ds.alreadyMigrated;
            {
                const e = await this._runMigration();
                switch (await this._setMigrated(),
                e) {
                case to.nonEmptyMigration:
                    return Ds.success;
                case to.emptyMigration:
                    return Ds.successWithEmpty;
                default:
                    throw new Error(`Match not exhaustive: ${e}`)
                }
            }
        }
    }
    so.migrationFlagUniqueKey = "104ccd8c-9919-9ae4-931f-782fb197486c",
    function(e) {
        e.MigrationAwarePreferencesApiImpl = class {
            constructor(e, t, n, i=[], r) {
                var s;
                this._source = t,
                this._destination = n,
                this._migrationCompleted = Bi.createCompletionSource(),
                this._ensureMigrationCompletedCalled = !1,
                this.get = this._getMigrationAwareMethod("get"),
                this.set = this._getMigrationAwareMethod("set"),
                this.getAll = this._getMigrationAwareMethod("getAll"),
                this.remove = this._getMigrationAwareMethod("remove"),
                this.removeAll = this._getMigrationAwareMethod("removeAll"),
                this._migration = new so(e,t,n,i,r),
                this.changes = xi(n.changes).pipe((s = xi(this._migrationCompleted.promise),
                function(e) {
                    return e.lift(new io(s))
                }
                ))
            }
            dispose() {
                var e, t, n, i;
                null === (t = (e = this._source).dispose) || void 0 === t || t.call(e),
                null === (i = (n = this._destination).dispose) || void 0 === i || i.call(n)
            }
            ensureMigrationCompleted() {
                return this._ensureMigrationCompletedCalled = !0,
                Bi.fromPromise(this._migration.ensureMigrationCompleted().then((e=>{
                    var t, n;
                    return null === (n = (t = this._source).dispose) || void 0 === n || n.call(t),
                    this._migrationCompleted.resolve(!0),
                    Promise.resolve(e)
                }
                ), (e=>(this._migrationCompleted.resolve(!1),
                Promise.reject(e)))))
            }
            _getMigrationAwareMethod(e) {
                return (...t)=>(I(!0 === this._ensureMigrationCompletedCalled, "supposed to run data migration before accessing prefs with web-extensions API"),
                Bi.fromPromise(this._migrationCompleted.promise.then((n=>(n ? this._migration.migrationAwareDestination : this._source)[e](...t)))))
            }
        }
        ,
        e.mapValueFromString = e=>{
            if ("undefined" !== e)
                try {
                    return e && JSON.parse(e)
                } catch (t) {
                    return null != e ? e : void 0
                }
        }
        ,
        e.mapValueToString = e=>void 0 === e ? "undefined" : JSON.stringify(e)
    }(no || (no = {}));
    const oo = "%appName%"
      , ao = {
        extensionSettingsToolbar: "%appName%SettingsToolbar",
        gdocsSidebarCardList: "%appName%AdvancedIssues",
        assistantCardList: "%appName%AdvancedIssues",
        extensionSettingsAssistant: "%appName%AssistantSettings",
        gdocsGoals: "%appName%AssistantGoals",
        extensionBusinessUphookPopup: "gb%appName%UphookPopup",
        gbExtensionSettingsToolbar: "gb%appName%SettingsToolbar",
        gbExtensionSettingsAssistant: "gb%appName%AssistantSettings",
        extensionGButton: "%appName%GButton",
        extPreviewsPopup: "%appName%PreviewsPopup",
        toneSuggestion: "%appName%ToneDetector",
        grammarlyGoPrompts: "%appName%GrammarlyGoPrompts",
        plagiarism: "%appName%_plagiarism_plagiarismView_premium"
    };
    function co(e, t) {
        return {
            key: e,
            value: t
        }
    }
    function uo(e) {
        const t = ao[e];
        return t ? t.replace(oo, ((e,t)=>{
            const n = F.getAppName(oe(), ie().bundleInfo.extensionType, ie().bundleInfo.deploymentType);
            return 0 === t ? n : (i = n).charAt(0).toUpperCase() + i.slice(1);
            var i
        }
        )) : e
    }
    function lo(e, t) {
        return co(e, t)
    }
    function ho(e) {
        return e.map((e=>[e.key, e.value].map(encodeURIComponent).join("="))).join("&")
    }
    function po(e, t) {
        if (0 === t.length)
            return e;
        const n = e.includes("?");
        return [e, ho(t)].join(n ? "&" : "?")
    }
    function go(e) {
        const t = [];
        return void 0 !== e.medium && t.push(lo("utm_medium", e.medium)),
        void 0 !== e.source && t.push(lo("utm_source", e.source)),
        void 0 !== e.campaign && t.push(lo("utm_campaign", uo(e.campaign))),
        e.clickToRun && t.push(lo("click_to_run", "true")),
        t
    }
    function fo(e) {
        return go(e)
    }
    co("fromExtension", "true");
    go({
        medium: "internal"
    })[0];
    function mo(e) {
        const t = new Map;
        for (const {isFree: n, cardLayout: {group: i}} of e) {
            t.has(i) || t.set(i, {
                lensName: i,
                free: 0,
                premium: 0
            });
            const e = t.get(i);
            e && (e[n ? "free" : "premium"] += 1)
        }
        return Array.from(t.values()).sort(((e,t)=>t.premium - e.premium))
    }
    function bo(e, t) {
        var n;
        const i = [co("app_type", "extension"), co("browser", oe()), ...e.currentAlerts ? [co("lensedAlerts", (r = mo(e.currentAlerts),
        btoa(JSON.stringify(r))))] : [], ...fo({
            medium: "internal",
            campaign: e.utmCampaign,
            source: null !== (n = e.utmSource) && void 0 !== n ? n : e.isAnonymous ? "signupHook" : "upHook"
        })];
        var r;
        const s = po(ie().appConfig.url.planComparison, i);
        t.open(s, !0)
    }
    class vo {
        constructor(e) {
            this._port = e,
            this.sender = {};
            const {sender: t, name: n} = e;
            this.name = n,
            t && (this.sender.url = t.url,
            this.sender.frameId = t.frameId,
            t.tab && t.tab.url && t.tab.id && (this.sender.tab = {
                url: t.tab.url,
                id: t.tab.id
            }))
        }
        onMessage(e) {
            this._port.onMessage.addListener(e)
        }
        onDisconnect(e) {
            this._port.onDisconnect.addListener(e)
        }
        postMessage(e) {
            this._port.postMessage(e)
        }
    }
    class _o {
        get button() {
            const e = this._action;
            return {
                kind: "web-extension",
                setBadge(t) {
                    e.setBadgeText({
                        text: t
                    })
                },
                setIconByName(t) {
                    const {prefix: n, postfix: i} = function(e) {
                        return {
                            prefix: "./src/icon/toolbar/icon",
                            postfix: e ? "-" + e : ""
                        }
                    }(t);
                    e.setIcon({
                        path: {
                            16: `${n}16${i}.png`,
                            32: `${n}32${i}.png`
                        }
                    })
                },
                setBadgeBackgroundColor(t) {
                    e.setBadgeBackgroundColor({
                        color: t
                    })
                }
            }
        }
        get baseUri() {
            var e;
            return null !== (e = this._baseUrl) && void 0 !== e ? e : chrome.runtime.getURL("")
        }
        constructor(e) {
            var t, n;
            this._isBg = e,
            this._manifestVersion = "3",
            this._isManifestV3 = "3" === this._manifestVersion,
            this._action = this._isManifestV3 ? chrome.action : chrome.browserAction,
            this.managedStorage = new Ms,
            this.sessionStorage = this._isManifestV3 && (null === (t = chrome.storage) || void 0 === t ? void 0 : t.session) ? new Xs(chrome) : new Zs,
            this.tabs = new Qs(chrome,this._manifestVersion),
            this.thirdPartyExtensionsInstalled = {},
            this.notification = {
                kind: "web-extension",
                create: e=>Bi.create(((t,n)=>{
                    const i = chrome.notifications
                      , r = Cs();
                    i.create(r, Object.assign({
                        type: "basic"
                    }, e), (()=>{
                        Ps((()=>{
                            const e = new qe((e=>{
                                const t = t=>t === r && e.next(t);
                                return i.onClicked.addListener(t),
                                ()=>i.onClicked.removeListener(t)
                            }
                            ))
                              , n = new qe((e=>{
                                const t = (t,n)=>t === r && e.next({
                                    id: t,
                                    buttonIndex: n
                                });
                                return i.onButtonClicked.addListener(t),
                                ()=>i.onButtonClicked.removeListener(t)
                            }
                            ))
                              , s = new qe((e=>{
                                const t = (t,n)=>t === r && e.next({
                                    id: t,
                                    byUser: n
                                });
                                return i.onClosed.addListener(t),
                                ()=>i.onClosed.removeListener(t)
                            }
                            ));
                            t({
                                id: r,
                                click: e,
                                buttonClick: n,
                                close: s
                            })
                        }
                        ), n)
                    }
                    ))
                }
                )),
                clear: e=>Bi.create(((t,n)=>{
                    chrome.notifications.clear(e, (e=>{
                        Ps((()=>t(e)), n)
                    }
                    ))
                }
                ))
            },
            this.cookies = {
                kind: "web-extension",
                get: e=>Bi.create(((t,n)=>chrome.cookies.get(e, (e=>Ps((()=>t(e)), n))))),
                remove: e=>Bi.fromPromise(new Promise(((t,n)=>chrome.cookies.remove(e, (()=>Ps((()=>t(null)), n)))))),
                getAll: e=>Bi.create(((t,n)=>chrome.cookies.getAll(e, (e=>Ps((()=>t(e)), n))))),
                set: e=>Bi.create(((t,n)=>chrome.cookies.set(e, (e=>Ps((()=>t(e)), n))))),
                watch(e, t) {
                    const n = n=>{
                        const {cookie: i, cause: r} = n;
                        !i || !i.name || e.path && e.path !== i.path || e.name !== i.name || e.domain && -1 === i.domain.indexOf(e.domain) || ("explicit" === r && t(i),
                        "expired_overwrite" === r && t())
                    }
                    ;
                    return chrome.cookies.onChanged.addListener(n),
                    ()=>chrome.cookies.onChanged.removeListener(n)
                },
                getChanges(e) {
                    return new qe((t=>this.watch(e, (e=>t.next(e)))))
                }
            },
            this._prefsBeforeMigration = function() {
                var e;
                const t = new Xe;
                return null === (e = chrome.storage) || void 0 === e || e.onChanged.addListener(((e,n)=>{
                    "local" === n && t.next(e)
                }
                )),
                {
                    ...Ys(chrome),
                    changes: t
                }
            }(),
            this.preferences = this._isBg ? new no.MigrationAwarePreferencesApiImpl("chromeGdocsForceEnableMigration",this._prefsBeforeMigration,this._prefsBeforeMigration,void 0,Ns((e=>qn().gdocs.disabledBeforeForceEnable(e)), (()=>qn().gdocs.enabledBeforeForceEnable()))) : this._prefsBeforeMigration,
            this.management = {
                uninstallSelf() {
                    chrome.management.uninstallSelf()
                }
            },
            this._baseUrl = v((()=>chrome.runtime.getURL("")), (e=>null)),
            this.permissions = chrome.permissions ? {
                watchAdded: e=>{
                    chrome.permissions.onAdded.addListener(e)
                }
                ,
                added: new qe((e=>{
                    const t = t=>{
                        e.next(t)
                    }
                    ;
                    return chrome.permissions.onAdded.addListener(t),
                    ()=>{
                        chrome.permissions.onAdded.removeListener(t)
                    }
                }
                )),
                watchRemoved: e=>{
                    chrome.permissions.onRemoved.addListener(e)
                }
                ,
                removed: new qe((e=>{
                    const t = t=>{
                        e.next(t)
                    }
                    ;
                    return chrome.permissions.onRemoved.addListener(t),
                    ()=>{
                        chrome.permissions.onRemoved.removeListener(t)
                    }
                }
                )),
                getAll: Bi.fromAsync((()=>new Promise((e=>chrome.permissions.getAll(e))))),
                request: Bi.fromAsync((e=>new Promise(((t,n)=>chrome.permissions.request(e, (e=>{
                    chrome.runtime.lastError ? n(chrome.runtime.lastError) : t(e)
                }
                )))))),
                contains: Bi.fromAsync((e=>new Promise(((t,n)=>{
                    chrome.permissions.contains(e, (e=>{
                        chrome.runtime.lastError ? n(chrome.runtime.lastError) : t(e)
                    }
                    ))
                }
                ))))
            } : void 0,
            this.fetchBlocklistConfig = ()=>Bi.noop,
            this.getUrl = e=>this._baseUrl ? this._baseUrl + e : chrome.runtime.getURL(e),
            this.fetchInternalResource = (e,t)=>Bi.fromPromise(fetch(this.getUrl(e)).then((e=>"json" === t ? e.json() : e.arrayBuffer()))),
            this.openUrl = e=>this.tabs.open(e, !0),
            this.openSubscriptionPage = e=>bo(e, this.tabs),
            this.isExtensionUrl = (e,t)=>this.getUrl(e) === t,
            this.reload = ()=>chrome.runtime.reload(),
            this.i18n = {
                detectLanguage: e=>Bi.create(((t,n)=>chrome.i18n.detectLanguage(e, (e=>Ps((()=>t(e)), n))))),
                getUILanguage: ()=>chrome.i18n.getUILanguage(),
                getAcceptLanguages: ()=>Bi.create(((e,t)=>chrome.i18n.getAcceptLanguages((n=>Ps((()=>e(n)), t)))))
            },
            this.initCodeSplittingListener = ()=>{
                return chrome.runtime.onMessage.addListener((e = this.tabs.executeScript,
                (t,n,i)=>{
                    t && "CODE_SPLITTING_INJECT" === t.type && t.file && n && n.tab && null != n.tab.id && (e(t.file, Number(n.tab.id), n.frameId),
                    i())
                }
                ));
                var e
            }
            ,
            this.isExtensionInstalled = Bi.fromAsync((async(e,t=!1)=>{
                if (!t && void 0 !== this.thirdPartyExtensionsInstalled[e])
                    return this.thirdPartyExtensionsInstalled[e];
                if ("undefined" == typeof fetch)
                    return !1;
                const n = _o.thirdPartyExtensionsData[e].publicResources.reduce(((t,n)=>(se() && t.push(`chrome-extension://${_o.thirdPartyExtensionsData[e].MSStoreId}${n}`),
                t.concat(`chrome-extension://${_o.thirdPartyExtensionsData[e].id}${n}`))), []);
                return (i = n.map((e=>fetch(e))),
                l(Promise.all([...i].map(l)))).then((e=>!0)).catch((e=>!1));
                var i
            }
            )),
            this.setUninstallURL = e=>chrome.runtime.setUninstallURL(e),
            this.indexedDB = self.indexedDB,
            this.message = e ? new qs((e=>chrome.runtime.onConnect.addListener((t=>e(new vo(t))))),ke(this.tabs).getActiveTab,ke(this.tabs).sendMessageToTab,ke(this.tabs).getAllTabs) : new Ks((e=>new Js(chrome,e)),(n = ()=>this.preferences.getAll(),
            async()=>{
                try {
                    return await n(),
                    !0
                } catch (e) {
                    return !1
                }
            }
            ),chrome.runtime.id,chrome.runtime.onMessage)
        }
    }
    _o.thirdPartyExtensionsData = {
        mseditor: {
            id: "gpaiobkfhnonedkhhfjpmhdalgeoebfa",
            MSStoreId: "hokifickgkhplphjiodbggjmoafhignh",
            publicResources: ["/fonts/fabric-icons.css"]
        },
        office: {
            id: "ndjpnladcallmjemlbaebfadecfhkepb",
            MSStoreId: "gggmmkjegpiggikcnhidnjjhmicpibll",
            publicResources: ["/fonts/fabric-icons.css"]
        }
    },
    Ss.start({
        browser: "chrome",
        extensionType: "chromiumWebExtension",
        deploymentType: "regular",
        browserApi: function(e) {
            return new _o(e)
        }(!1),
        createExperimentClient: function() {
            return new Ts
        }
    })
}
)();