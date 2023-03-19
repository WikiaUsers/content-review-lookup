/** EasterAddons
 * Script for adding effects to celebrate easter.
 */
/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mw */

console.log("[Easter Addons] Script Loading..");

var scriptLoaded = !!(window.EasterAddons && window.EasterAddons.Loaded);
window.EasterAddons = window.EasterAddons || {};
window.EasterAddons.Loaded = true;

mw.loader.using(["mediawiki.util", "mediawiki.Uri"], function () {
    var config = window.EasterAddonsConfig = Object.assign({
        autoStart: true,
        excludeMobile: true,
        onlyStartOnViewMode: true,
    }, window.EasterAddonsConfig || {});

    if (scriptLoaded) {
        if (config.optionalDeferredRegister)
            config.optionalDeferredRegister.resolve(window.EasterAddons);
        return;
    }
    var that, EasterAddons;

    window.EasterAddons = EasterAddons = that = {
        N: 5, // number of sprites
        H: 100, // width and height of a sprite in pixels
        T: 12000, // animation time in ms
        NORM_IMAGE: 6,
        ANIM_IMAGE: [
            "https://raw.githubusercontent.com/skyblock-wiki/wiki-assets/main/images/gifegg-1.gif"
        ],
        ANIM_CLASS: "gifeggs",
        MINWAIT: 3000, // minimum delay time in ms
        MAXWAIT: 7000, // maximum delay time in ms
        MORESEP: 0, // require more separation between images ('1' means 1 times the size of image)
        MAXTRIES: 200, // maximum tries for program to allocate position for sprite, until displaying on original position again instead; the safeguard for performance
        avoidElements: [ // selectors for elements to avoid setting sprites onto
            ".global-navigation", ".top-ads-container",
        ],
        X_BOUNDARIES: false, // whether sprites are restricted to appear very close to top-bottom edges
        pause: false,
        DEBUG: false,
        debuggerReady: false,
        $window: $(window),
        $document: $(document),
        isMobile: navigator.userAgent.match(/mobile|opera m(ob|in)/i),
        init: function () {
            console.log("[Easter Addons] Initializing..");
            $("<link>", {
                rel: "stylesheet",
                href: new mw.Title("Gadget-EasterAddons.css", 8).getUrl({
                    action: "raw",
                    ctype: "text/css"
                })
            }).appendTo("head");
            $(":root").css("--easteregg-sprite-size", this.H + "px");
            $(":root").css("--easteregg-animation-time", this.T + "ms");

            if (config.optionalDeferredRegister)
                config.optionalDeferredRegister.resolve(window.EasterAddons);
            if (config.autoStart)
                this.start();
        },
        start: function () {
            if (config.onlyStartOnViewMode && mw.config.get("wgAction") !== "view")
                return;
            if (config.excludeMobile && this.isMobile)
                return;
            this.debugCounter = [0, 0, this.MAXTRIES + 999, -999];
            this.x = Array.apply(null, Array(this.N)); // empty array
            this.y = Array.apply(null, Array(this.N)); // empty array
            this.bounds = this.avoidElements.map(function (v) {
                return {
                    selector: v,
                    debug: $("<div class='easteregg-bound-debug easteregg-debug-area'>"),
                };
            });
            this.regions = Array.apply(null, Array(this.N)).map(function () {
                return {
                    debug: $("<div class='easteregg-region-debug easteregg-debug-area'>"),
                };
            });
            this.sprites = Array.apply(null, Array(this.N)).map(function () {
                return $("<div class='easteregg-sprite'>");
            });
            this.canvas = $("<div class='easteregg-canvas'>").append(this.sprites);

            $("body").prepend(this.canvas);
            for (var i in this.x)
                this.calculate(i);
        },
        calculate: function (index) {
            if (document.visibilityState !== "visible" || this.pause)
                return this.waitUntilFocus().then(function () {
                    that.calculate(index);
                });

            var boundSep = this.H * 0.6, // minimum separation to screen boundaries
                centerSep = this.H * (this.MORESEP + 1); // minimum separation between centers of sprites

            var w = this.$window.width(),
                h = this.$window.height(),
                topOffset = h - (this.H / 2);

            // only for debugging purpose
            if (this.X_BOUNDARIES) {
                this.borders[0].left = 0;
                this.borders[0].top = 0;
                this.borders[0].width = boundSep;
                this.borders[0].height = h;
                this.borders[1].left = w - boundSep;
                this.borders[1].top = 0;
                this.borders[1].width = boundSep;
                this.borders[1].height = h;
            }
            var centerX = -1,
                tries = 0;

            this.setbounds();

            var allBounds = [].concat(this.bounds, this.regions);
            do {
                centerX = this.X_BOUNDARIES ? this.rand(boundSep, w - boundSep) : this.rand(0, w);
            } while (this.withinBounds(allBounds, centerX) && (++tries) < this.MAXTRIES);

            this.debugCounter[1] += tries;
            if (tries < this.debugCounter[2]) this.debugCounter[2] = tries; // stores minimum
            if (tries > this.debugCounter[3]) this.debugCounter[3] = tries; // stores maximum
            if (++this.debugCounter[0] >= 10) {
                if (this.DEBUG)
                    console.log("[EasterAddons Debug Mode] Last 10 Tries Average: " + this.debugCounter[1] / 10 + " Min: " + this.debugCounter[2] + " Max: " + this.debugCounter[3]);
                // reset counters
                this.debugCounter[0] = this.debugCounter[1] = 0;
                this.debugCounter[2] = this.MAXTRIES + 999;
                this.debugCounter[3] = -999;
            }

            if (tries < this.MAXTRIES) {
                this.x[index] = centerX;
                this.y[index] = topOffset;
                this.regions[index].top = topOffset - centerSep * 1;
                this.regions[index].left = centerX - centerSep * 1;
                this.regions[index].width = centerSep * 2;
                this.regions[index].height = centerSep * 2;
            } else
                console.log("[EasterAddons] Setting Element " + index + " to previous position.\nTry resizing your browser and/or use the 'collapse' view to get a better performance.");

            if (this.prepareDebug()) {
                this.regions[index].debug.show().css({
                    top: this.regions[index].top,
                    left: this.regions[index].left,
                    width: this.regions[index].width,
                    height: this.regions[index].height,
                });
            } else
                this.regions[index].debug.hide();

            this.set(index, this.x[index] - this.H * 0.5, this.y[index] - this.H * 0.5);
        },
        set: function (index, x, y) {
            var delay = Math.floor(Math.random() * this.MAXWAIT + this.MINWAIT);
            if (isNaN(x) || isNaN(y)) {
                setTimeout(this.calculate.bind(this, index), delay);
            } else {
                var randomImg = Math.floor(Math.random() * (this.NORM_IMAGE + this.ANIM_IMAGE.length));
                // randomImg = 5
                var classes, backgroundImage;
                if (randomImg < this.NORM_IMAGE)
                    // static images/continuous animations can be done in CSS
                    classes = "active " + "egg" + (randomImg + 1);
                else {
                    // non-continuous animations should be reloaded with script to work
                    classes = "active " + this.ANIM_CLASS;
                    backgroundImage = "url(" + this.ANIM_IMAGE[randomImg - this.NORM_IMAGE] + "?a=" + Math.random() + ")";
                }
                setTimeout(function () {
                    that.sprites[index].css({
                        left: x,
                        top: y,
                        "background-image": backgroundImage,
                    }).addClass(classes);
                    setTimeout(function () {
                        that.sprites[index].removeClass(classes).removeAttr("style");
                        that.calculate(index);
                    }, that.T);
                }, delay);
            }
        },
        setbounds: function () {
            var scrolltop = this.$document.scrollTop(),
                screenHeight = this.$window.height();

            for (var i in this.bounds) {
                var $el = $(this.bounds[i].selector);
                this.bounds[i].debug.hide();

                if ($el.length) {
                    var offset = $el.offset(),
                        elmHeight = $el.innerHeight(),
                        elmWidth = $el.innerWidth();
                    if (!(offset.top > scrolltop + screenHeight || offset.top + elmHeight < scrolltop)) {
                        var top = Math.max(offset.top - scrolltop, 0),
                            bottom = Math.min(offset.top + elmHeight - scrolltop, screenHeight);
                        this.bounds[i].top = top;
                        this.bounds[i].left = offset.left;
                        this.bounds[i].width = elmWidth;
                        this.bounds[i].height = bottom - top;
                        if (this.prepareDebug())
                            this.bounds[i].debug.show().css({
                                top: top,
                                left: offset.left,
                                width: elmWidth,
                                height: bottom - top,
                            });
                    }
                }
            }

            for (i in this.borders)
                if (this.prepareDebug())
                    this.borders[i].debug.show().css({
                        top: this.borders[i].top,
                        left: this.borders[i].left,
                        width: this.borders[i].width,
                        height: this.borders[i].height,
                    });
                else
                    this.borders[i].debug.hide();
        },
        withinBounds: function (allBounds, x) {
            for (var i in allBounds) {
                if (typeof allBounds[i] !== "undefined" &&
                    typeof allBounds[i].left !== "undefined" &&
                    typeof allBounds[i].top !== "undefined" &&
                    typeof allBounds[i].width !== "undefined" &&
                    typeof allBounds[i].height !== "undefined") {
                    var xmin = allBounds[i].left,
                        xmax = allBounds[i].left + allBounds[i].width;
                    if (x >= xmin && x <= xmax)
                        return true;
                }
            }
            return false;
        },
        rand: function (min, max) {
            return Math.floor(Math.random() * Math.floor(max - min + 1)) + Math.ceil(min);
        },
        waitUntilFocus: function () {
            var promise = $.Deferred();
            if (document.visibilityState !== "visible")
                document.addEventListener("visibilitychange", function () {
                    promise.resolve();
                }, {
                    once: true
                });
            else if (this.pause)
                (function waitUntilUnpause() {
                    if (this.pause)
                        setTimeout(waitUntilUnpause, 100);
                    else
                        promise.resolve();
                })();
            else
                return promise.resolve();
            return promise;
        },
        prepareDebug: function () {
            if (this.DEBUG && !this.debuggerReady) {
                for (var i in this.x)
                    this.regions[i].debug.appendTo(this.canvas);
                for (i in this.bounds)
                    this.bounds[i].debug.appendTo(this.canvas);
                for (i in this.borders)
                    this.borders[i].debug.appendTo(this.canvas);
                this.debuggerReady = true;
            }
            return this.DEBUG;
        },
        // functions to be used in console: EasterAddons.<function>()
        startAll: function () {
            this.pause = false;
            console.log("[Easter Addons] Starting Animations");
        },
        stopAll: function () {
            this.pause = true;
            console.log("[Easter Addons] Pausing Animations");
        },
        startDebug: function () {
            this.DEBUG = true;
            this.canvas.addClass("debug-mode");
            console.log("[Easter Addons] Entering Debug Mode");
        },
        stopDebug: function () {
            this.DEBUG = false;
            this.canvas.removeClass("debug-mode");
            console.log("[Easter Addons] Exiting Debug Mode");
        },
    };

    EasterAddons.init();
});