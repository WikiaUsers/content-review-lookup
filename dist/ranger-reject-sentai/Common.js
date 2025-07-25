AjaxRCRefreshText = "Auto-refresh", AjaxRCRefreshHoverText = "Automatically refresh the page", ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"], importScriptPage("AjaxRC/code.js", "dev"), importScriptURI("http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand");
var togglers = new Array,
    allClasses = new Object;

function toggler(e) {
    var t = togglers[e];
    if (t)
        for (var i = 0; i < t.length; i++) {
            var a = t[i][1];
            if ("string" == typeof a && (a = "-" == a.charAt(0) ? (a = document.getElementById(a.substring(1))) && new Array(a) : allClasses[a]), a && a.length) switch (t[i][0]) {
                case "_reset":
                    for (var r in a) a[r].style.display = a[r]._toggle_original_display;
                    break;
                case "_show":
                    for (var r in a) a[r].style.display = "";
                    break;
                case "_hide":
                    for (var r in a) a[r].style.display = "none";
                    break;
                case "":
                default:
                    for (var r in a) a[r].style.display = "none" == a[r].style.display ? "" : "none"
            }
        }
}

function createTogglerLink(e, t) {
    var i = document.createElement("a");
    i.className = "toggler-link", i.setAttribute("id", "toggler" + t), i.setAttribute("href", 'javascript:toggler("' + t + '");');
    t = e.firstChild;
    e.removeChild(t), i.appendChild(t), e.insertBefore(i, e.firstChild)
}

function toggleInit() {
    var e = new Array,
        t = new Array;
    togglers = new Array, (allClasses = new Object).watch = void 0, allClasses.unwatch = void 0;
    for (var i = document.getElementsByTagName("*"), a = (i.length, 0); a < i.length; a++) {
        var r = i[a];
        if (r.className) {
            r._toggle_original_display = r.style.display;
            for (var s = -1, n = r.className.split(" "), o = 0; o < n.length; o++) {
                var l, g, p = n[o];
                allClasses[p] || (allClasses[p] = new Array), allClasses[p].push(r), "_toggle" == p.substring(0, 7) && ("_togglegroup" == p ? t = new Array : "_toggle" == p ? t.push(r) : "_toggle_init" == p.substring(0, 12) ? ("show" == (g = p.substring(12)) ? r.style.display = "" : "hide" == g && (r.style.display = "none"), r._toggle_original_display = g) : "_toggler" == p.substring(0, 8) && (-1 == s && (s = togglers.length, togglers[s] = new Array, e[s] = r), -1 != (g = p.indexOf("-")) ? l = p.substring(g + 1) : (l = t, g = p.length), g = p.substring(8, g), togglers[s].push(new Array(g, l))))
            }
        }
    }
    for (a = 0; a < e.length; a++) createTogglerLink(e[a], a)
}

function owwsitesearch(e) {
    e.q.value = "site:http://openwetware.org/wiki/" + e.base.value + "++" + e.qfront.value
}
mwCustomEditButtons[mwCustomEditButtons.length] = {
    imageFile: "https://vignette.wikia.nocookie.net/worldtrigger/images/1/14/U_with_macron.png",
    speedTip: "u with macron",
    tagOpen: "ū",
    tagClose: "",
    sampleText: ""
}, mwCustomEditButtons[mwCustomEditButtons.length] = {
    imageFile: "https://vignette.wikia.nocookie.net/worldtrigger/images/f/f7/O_with_macron.png",
    speedTip: "o with macron",
    tagOpen: "ō",
    tagClose: "",
    sampleText: ""
}, window.pPreview = $.extend(!0, window.pPreview, {
    RegExp: (window.pPreview || {}).RegExp || {}
}), window.pPreview.defimage = "https://static.wikia.nocookie.net/worldtrigger/images/3/3b/Anime_Logo.png", window.pPreview.noimage = "https://static.wikia.nocookie.net/worldtrigger/images/3/3b/Anime_Logo.png", window.pPreview.RegExp.noinclude = [".hide-from-preview", ".reference", ".caption", ".toc", "sup", ".nihongo", ".references"], addOnloadHook(toggleInit);