var PF_VERSION = "2016-06-06-123516549", pfMod = window.pfMod || function(e, t) {
  var i = e.document, n = i.location.protocol, o = {
    environment: "production",
    protocol: n,
    dir: "ltr",
    usingBM: !1,
    maxImageWidth: 750,
    filePath: "/assets/versions/",
    hosts: {
      cdn: "https:" == n ? "https://cf-cdn.printnicer.com" : "http://cdn.printnicer.com",
      pf: n + "//www.printfriendly.com",
      ds: n + "//ds.printfriendly.com",
      ds_cdn: "https:" === n ? "https://ds.printfriendly.com" : "http://cdn.ds.printfriendly.com",
      pdf: n + "//pdf.printfriendly.com",
      email: n + "//email-srv.printfriendly.com",
      page: e.location.host.split(":")[0]
    },
    domains: {
      page: e.location.host.split(":")[0].split("www.").pop()
    }
  }, r = {
    isReady: !1,
    readyBound: !1,
    setWidthOfImages: function() {
      for (var e = document.getElementsByTagName("img"), t = 0; t < e.length; t++) {
        var i = e[t];
        -1 === i.className.indexOf("hidden-originally") && (i.width = i.width);
      }
    },
    convertRelativetoAbsolute: function(e) {
      for (var t = document.getElementsByTagName(e), i, n, o = 0; o < t.length; o++) {
        i = t[o];
        try {
          "img" === e ? i.src = i.src : (n = i.getAttribute("href") || "", "#" !== n.charAt(0) && (i.href = i.href));
        } catch (r) {}
      }
    },
    removeScripts: function() {
      for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) "undefined" != typeof e[t].src && -1 !== e[t].src.indexOf("printfriendly") || e[t].parentNode && (e[t].parentNode.removeChild(e[t]), 
      t--);
    },
    processElements: function() {
      for (var t = "|link|style|iframe|noscript|object|embed|select|", i, n, o, r, s = document.body.getElementsByTagName("*"), a = 0; a < s.length; a++) try {
        n = s[a], o = n.nodeName.toLowerCase(), -1 !== t.indexOf("|" + o + "|") ? (n.parentNode.removeChild(n), 
        a--) : (i = "NA", i = n.currentStyle ? n.currentStyle.display : e.getComputedStyle(n, null).getPropertyValue("display"), 
        "none" === i && (r = n.getAttribute("class"), r = r ? r : "", r += " hidden-originally", 
        n.setAttribute("class", r))), "svg" === o ? this.convertSvgToImage(n) : "canvas" === o && this.convertCanvasToImage(n);
      } catch (c) {}
    },
    convertSvgToImage: function(t) {
      var i, n, o;
      t.setAttribute("version", 1.1), t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), 
      n = t.outerHTML;
      var r = this.scaleImageDimensions({
        width: t.getBoundingClientRect().width,
        height: t.getBoundingClientRect().height
      });
      i = t.getAttribute("class"), i = i ? i : "", i += " pf-svg-image", o = new Image(), 
      o.src = "data:image/svg+xml;base64," + e.btoa(unescape(encodeURIComponent(n))), 
      o.setAttribute("class", i), o.width = r.width, o.height = r.height, t.parentNode.replaceChild(o, t);
    },
    convertCanvasToImage: function(e) {
      var t;
      classNames = e.getAttribute("class"), classNames = classNames ? classNames : "", 
      classNames += " canvas-png", t = new Image(), t.src = e.toDataURL("image/png"), 
      t.setAttribute("class", classNames), e.parentNode.replaceChild(t, e);
    },
    scaleImageDimensions: function(e) {
      if (e.width = parseInt(e.width, 10), e.height = parseInt(e.height, 10), e.width > pfMod.config.maxImageWidth) {
        var t = pfMod.config.maxImageWidth / e.width;
        e.width = e.width * t, e.height = e.height * t;
      }
      return e;
    },
    ready: function() {
      if (!r.isReady) {
        if (!document.body) return setTimeout(r.ready, 13);
        r.isReady = !0, r.readyFunc.call();
      }
    },
    doScrollCheck: function() {
      if (!r.isReady) {
        try {
          document.documentElement.doScroll("left");
        } catch (e) {
          return setTimeout(r.doScrollCheck, 50);
        }
        r.detach(), r.ready();
      }
    },
    detach: function() {
      document.addEventListener ? (document.removeEventListener("DOMContentLoaded", r.completed, !1), 
      e.removeEventListener("load", r.completed, !1)) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", r.completed), 
      e.detachEvent("onload", r.completed));
    },
    completed: function(e) {
      (document.addEventListener || "load" === e.type || "complete" === document.readyState) && (r.detach(), 
      r.ready());
    },
    bindReady: function() {
      if (!r.readyBound) {
        if (r.readyBound = !0, "complete" === document.readyState) return r.ready();
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", r.completed, !1), 
        e.addEventListener("load", r.completed, !1); else if (document.attachEvent) {
          document.attachEvent("onreadystatechange", r.completed), e.attachEvent("onload", r.completed);
          var t = !1;
          try {
            t = null == e.frameElement && document.documentElement;
          } catch (i) {}
          t && t.doScroll && r.doScrollCheck();
        }
      }
    },
    domReady: function(e) {
      this.readyFunc = e, this.bindReady();
    },
    canonicalize: function(e) {
      if (e) {
        var t = document.createElement("div");
        return t.innerHTML = "<a></a>", t.firstChild.href = e, t.innerHTML = t.innerHTML, 
        t.firstChild.href;
      }
      return e;
    },
    processDocument: function() {
      this.processElements(), this.convertRelativetoAbsolute("a"), this.convertRelativetoAbsolute("img"), 
      this.removeScripts(), e.onServer !== !0 && this.setWidthOfImages();
    }
  }, s = {
    headerImageUrl: e.pfHeaderImgUrl,
    headerTagline: e.pfHeaderTagline,
    imageDisplayStyle: e.pfImageDisplayStyle,
    customCSSURL: r.canonicalize(e.pfCustomCSS),
    disableClickToDel: e.pfdisableClickToDel,
    disablePDF: e.pfDisablePDF,
    disablePrint: e.pfDisablePrint,
    disableEmail: e.pfDisableEmail,
    hideImages: e.pfHideImages
  }, a = {
    version: PF_VERSION,
    initialized: !1,
    finished: !1,
    messages: [],
    errors: [],
    init: function(t) {
      try {
        this.initialized = !0, this.configure(t), this.setVariables(), this.detectBrowser(), 
        this.startIfNecessary(), e.print = this.start;
      } catch (i) {
        c.log(i);
      }
    },
    configure: function(t) {
      if (this.config = o, t) {
        this.config.environment = t.environment || "development";
        for (var i in t.hosts) this.config.hosts[i] = t.hosts[i];
        t.filePath && (this.config.filePath = t.filePath);
      }
      this.userOptions = {
        redirect: {
          disableForiPad: !!this.getVal(e.pfUserOptions, "redirect.disableForiPad")
        }
      };
    },
    getVal: function(e, t) {
      for (var i = t.split("."); "undefined" != typeof e && i.length; ) e = e[i.shift()];
      return e;
    },
    startIfNecessary: function() {
      (e.pfstyle || this.urlHasAutoStartParams()) && this.start();
    },
    urlHasAutoStartParams: function() {
      return -1 !== this.config.urls.page.indexOf("pfstyle=wp");
    },
    start: function() {
      a.isRedirectNecessary() ? a.redirect() : a.supportedSiteType() && r.domReady(function() {
        try {
          a.startTime = new Date().getTime(), r.processDocument(), a.detectPlatforms(), a.cacheBodyHTML(), 
          a.createMask(), a.loadCore();
        } catch (e) {
          c.log(e);
        }
      });
    },
    setVariables: function() {
      var t = this, i, o = "";
      "production" !== this.config.environment && (o = "?_=" + Math.random()), this.config.urls = {
        js: {
          jquery: n + "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
          jqueryBackup: t.config.hosts.cdn + "/javascripts/common/jquery/1.11.0/jquery.min.js",
          core: t.config.hosts.cdn + t.config.filePath + t.version + "/core.js" + o,
          algo: t.config.hosts.cdn + t.config.filePath + t.version + "/algo.js" + o
        },
        css: {
          page: t.config.hosts.cdn + t.config.filePath + t.version + "/main.css" + o
        },
        pdfMake: t.config.hosts.pdf + "/pdfs/make",
        email: t.config.hosts.email + "/email/new"
      };
      try {
        i = top.location.href;
      } catch (r) {
        i = e.location.href;
      }
      this.config.urls.page = i, this.userSettings = s, !e.pfstyle || "bk" !== e.pfstyle && "nbk" !== e.pfstyle && "cbk" !== e.pfstyle || (this.config.usingBM = !0);
    },
    detectBrowser: function() {
      this.browser = {};
      var e = navigator.appVersion;
      -1 !== e.indexOf("MSIE") ? (this.browser.version = parseFloat(e.split("MSIE")[1]), 
      this.browser.isIE = !0) : this.browser.isIE = !1;
    },
    detectPlatforms: function() {
      var t = /wp-content/i, i = /blogger.com/i, n = /squarespace.com/i, o, r = this.config.ssStyleSheetHrefs || [];
      if (0 === r.length) for (o = 0; o < document.styleSheets.length; o++) r.push(document.styleSheets[o].href);
      if ("wikihow.com" === this.config.domains.page || this.config.ssLocation && -1 !== this.config.ssLocation.indexOf("wikihow.com")) this.config.isWikiHow = !0; else if ("wsite" === e.STYLE_PREFIX) this.config.isWeebly = !0; else for (o = 0; o < r.length; o++) {
        var s = r[o];
        t.test(s) ? a.config.isWP = !0 : i.test(s) ? a.config.isBlogger = !0 : n.test(s) && (a.config.isSquareSpace = !0);
      }
    },
    createIframe: function(e) {
      var t = e.createElement("iframe");
      return t.src = "javascript:false", t.frameBorder = "0", t.allowTransparency = "true", 
      t;
    },
    loadHtmlInIframe: function(e, t, i) {
      var n, o;
      try {
        o = t.contentWindow.document;
      } catch (r) {
        n = e.domain, t.src = "javascript:var d=document.open();d.domain='" + n + "';void(0);", 
        o = t.contentWindow.document;
      }
      o.write(i), o.close();
    },
    redirect: function() {
      var e = [ "source=cs", "url=" + encodeURIComponent(top.location.href) ], t;
      for (var i in s) "undefined" != typeof s[i] && e.push(i + "=" + encodeURIComponent(s[i]));
      t = this.config.hosts.pf + "/print/?" + e.join("&"), this.urlHasAutoStartParams() ? top.location.replace(t) : top.location.href = t;
    },
    supportedSiteType: function() {
      return "about:blank" !== a.config.urls.page && ("http:" === a.config.protocol || "https:" === a.config.protocol);
    },
    isRedirectNecessary: function() {
      try {
        var t = navigator.userAgent.match(/Edge\/(\d+.\d+)/);
        return !!(navigator.userAgent.match(/(ipod|opera.mini|blackberry|playbook|bb10)/i) || this.browser.isIE && this.browser.version < 8 || this.browser.isIE && e.adsbygoogle || "undefined" != typeof $ && $.jcarousel && this.browser.isIE || this.browser.isIE && this.browser.version < 9 && "skinnytaste.com" === this.config.domains.page || t && 2 === t.length && parseFloat(t[1]) < 13.10586);
      } catch (i) {
        return c.log(i), !1;
      }
    },
    createMask: function() {
      var e = document.createElement("div");
      e.innerHTML = '<div id="pf-mask" style="z-index: 2147483627!important; position: fixed !important; top: 0pt !important; left: 0pt !important; background-color: rgb(0, 0, 0) !important; opacity: 0.8 !important;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=80); height: 100% !important; width: 100% !important;"></div>', 
      document.body.appendChild(e.firstChild);
    },
    cacheBodyHTML: function() {
      a.bodyCache = '<div id="' + document.body.id + '" class="' + document.body.className + ' pf-body-cache">' + document.body.innerHTML + "</div>", 
      a.browser.isIE && (document.body.innerHTML = "<p></p>");
    },
    refresh: function() {
      var t = a.config.urls.page.replace("pfstyle=wp", "").replace(/#(.*)$/, "");
      try {
        return document.body.innerHTML = '<div style="position:absolute; top:0; bottom:0; left:0; right:0; padding:10%; text-align:center; background:#333;">&nbsp;</div>', 
        this.urlHasAutoStartParams() ? e.top.location.href = t : e.top.location.reload(), 
        !1;
      } catch (i) {
        c.log(i), setTimeout(function() {
          e.top.location.replace(t);
        }, 100);
      }
    },
    removeDoubleSemiColon: function(e) {
      return e.replace(/;{2}/g, ";");
    },
    loadCore: function() {
      var e = '<!DOCTYPE html><html><head><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1"><script src="' + this.config.urls.js.jquery + '"></script><script src="' + this.config.urls.js.core + '"></script><link media="screen" type="text/css" rel="stylesheet" href="' + this.config.urls.css.page + '"></head><body onload="core.init();"></body>', t = this.createIframe(document);
      t.id = "pf-core", t.name = "pf-core", document.body.appendChild(t);
      var i = t.style.cssText + ";width: 100% !important;max-width:100% !important;height: 100% !important; display: block !important; overflow: hidden !important; position: absolute !important; top: 0px !important; left: 0px !important; background-color: transparent !important; z-index: 2147483637!important";
      t.style.cssText = this.removeDoubleSemiColon(i), this.loadHtmlInIframe(document, t, e);
    }
  }, c = {
    _window: e.top,
    _doc: e.top.document,
    installInitiated: !1,
    validFile: /d3nekkt1lmmhms|printfriendly\.com|printnicer\.com|algo\.js|printfriendly\.js|core\.js/,
    setVars: function() {
      this._window.frames["pf-core"] && this._window.frames["pf-core"].document && (this._window = this._window.frames["pf-core"], 
      this._doc = this._window.document);
    },
    install: function() {
      if (this.installInitiated) return !0;
      var t;
      t = e.JSON && e.JSON.stringify ? "//cdn.ravenjs.com/1.1.16/raven.min.js" : a.config.hosts.cdn + "/javascripts/raven/1.1.16/json_raven.min.js", 
      this.installInitiated = !0, this.setVars();
      var i = this._doc.createElement("script"), n = this._doc.getElementsByTagName("script")[0];
      i.src = t, n.parentNode.appendChild(i), this.wait();
    },
    wait: function() {
      return this._window.Raven ? (this.configure(), void this.pushExistingErrors()) : setTimeout(function() {
        c.wait();
      }, 100);
    },
    configure: function() {
      var e = "https://5463b49718cd4266911eab9e5c0e114d@app.getsentry.com/22091", t = {
        dataCallback: function(e) {
          var t, i;
          try {
            t = e.stacktrace.frames[0], t.filename.match(c.validFile) && "onload" !== t["function"] || e.stacktrace.frames.shift();
          } catch (n) {}
          return e;
        },
        shouldSendCallback: function(e) {
          return e && e.extra && e.extra.file ? !0 : !!(e && e.culprit && e.culprit.match(c.validFile));
        },
        release: a.version
      };
      this._window.Raven.config(e, t).install();
    },
    sendError: function(e, t) {
      t = "undefined" != typeof t ? {
        file: t.file
      } : {
        file: "printfriendly.js"
      }, t.usingBM = a.config.usingBM, t.url = a.config.urls.page, "production" === a.config.environment && this._window.Raven.captureException(e, {
        extra: t
      });
    },
    pushExistingErrors: function() {
      for (var e = 0; e < a.errors.length; e++) this.sendError(a.errors[e].err, a.errors[e].opts);
    },
    log: function(e, t) {
      a.finished = !0, t = t || {
        file: "printfriendly.js"
      };
      try {
        this._window.Raven ? this.sendError(e, t) : (a.errors.push({
          err: e,
          opts: t
        }), this.install(), a.messages.push(e.name + " : " + e.message), a.messages.push(e.stack));
      } catch (i) {}
    }
  };
  return a.exTracker = c, a;
}(window), priFri = pfMod;

"algo" === window.name || "pf-core" === window.name || pfMod.initialized || pfMod.init(window.pfOptions);