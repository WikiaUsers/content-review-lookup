/** HalloweenEffects
 * Script for adding effects to celebrate halloween.
 */
/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mw */

console.log("[Halloween Effects] Script Loading..");

var that, HalloweenEffects;
var config = window.HalloweenEffectsConfig = Object.assign({
	autoStart: true,
	excludeMobile: true,
	onlyStartOnViewMode: true,
}, window.HalloweenEffectsConfig || {});
/* Set Up Dimmer */
if (!(window.HswSiteDimmer && window.HswSiteDimmer.loaded)) {
    window.HswSiteDimmer = Object.assign({
        loaded: true,
        siteDimmed: false,
        dimClass: "hsw-site-dimmer",
    }, window.HswSiteDimmer || {});
    window.HswSiteDimmer.dim = function () {
        if (window.HswSiteDimmer.siteDimmed)
            return;
    	var el = window.HswSiteDimmer.element || $("." + window.HswSiteDimmer.dimClass);
        if (el.length > 0) {
        	el.css("opacity", 0.8);
        }
        else {
	        var themeBgCol = $("body").css("--theme-body-background-color");
	        if (!["#000", "#000000", "black"].includes(themeBgCol)) {
	            window.HswSiteDimmer.element = $("<div>", {
	                class: window.HswSiteDimmer.dimClass,
	            }).appendTo("body");
	            setTimeout(function () {
	            	window.HswSiteDimmer.element.css("opacity", 0.8);
	            }, 20);
	        }
        }
        window.HswSiteDimmer.siteDimmed = true;
    };
    window.HswSiteDimmer.undim = function () {
		(window.HswSiteDimmer.element || $("." + window.HswSiteDimmer.dimClass)).css("opacity", 0);
        window.HswSiteDimmer.siteDimmed = false;
    };
}
window.HalloweenEffects = HalloweenEffects = that = Object.assign(this, {
	N: 5, // number of sprites
	H: 80, // width and height of a sprite in pixels
	T: 5000, // animation time in ms
	MINWAIT: 3000, // minimum delay time in ms
	MAXWAIT: 7000, // maximum delay time in ms
	MORESEP: 0, // require more separation between images ('1' means 1 times the size of image)
	MAXTRIES: 200, // maximum tries for program to allocate position for sprite, until displaying on original position again instead; the safeguard for performance
	X_BOUNDARIES: false, // whether sprites are restricted to appear very close to top-bottom edges (recommend false)
	Y_BOUNDARIES: true, // whether sprites are restricted to appear very close to left-right edges
	avoidElements: [ // selectors for elements to avoid setting sprites onto
		".global-navigation", ".main-container .page", "#mixed-content-footer", ".global-footer", ".top-ads-container",
	],
	pause: false,
	DEBUG: false,
	debuggerReady: false,
	$window: $(window),
	$document: $(document),
	isMobile: navigator.userAgent.match(/mobile|opera m(ob|in)/i),
	init: function () {
		console.log("[Halloween Effects] Initializing..");
		$(":root").css("--halloween-sprite-size", this.H + "px");
		$(":root").css("--halloween-animation-time", this.T + "ms");

		this.loaded = true;
		if (config.optionalDeferredRegister)
			config.optionalDeferredRegister.resolve(window.HalloweenEffects);
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
				debug: $("<div class='halloween-bound-debug halloween-debug-area'>"),
			};
		});
		this.borders = Array.apply(null, Array(this.X_BOUNDARIES * 2 + this.Y_BOUNDARIES * 2)).map(function () {
			return {
				debug: $("<div class='halloween-border-debug halloween-debug-area'>"),
			};
		});
		this.regions = Array.apply(null, Array(this.N)).map(function () {
			return {
				debug: $("<div class='halloween-region-debug halloween-debug-area'>"),
			};
		});
		this.sprites = Array.apply(null, Array(this.N)).map(function () {
			return $("<div class='halloween-sprite'>");
		});
		this.canvas = $("<div class='halloween-canvas'>").append(this.sprites);

		$("body").prepend(this.canvas);
		window.HswSiteDimmer.dim();
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
			h = this.$window.height();

		// only for debugging purpose

		if (this.Y_BOUNDARIES) {
			this.borders[0].left = 0;
			this.borders[0].top = 0;
			this.borders[0].width = w;
			this.borders[0].height = boundSep;
			this.borders[1].left = 0;
			this.borders[1].top = h - boundSep;
			this.borders[1].width = w;
			this.borders[1].height = boundSep;
		}
		if (this.X_BOUNDARIES) {
			var off = this.Y_BOUNDARIES * 2;
			this.borders[off + 0].left = 0;
			this.borders[off + 0].top = 0;
			this.borders[off + 0].width = boundSep;
			this.borders[off + 0].height = h;
			this.borders[off + 1].left = w - boundSep;
			this.borders[off + 1].top = 0;
			this.borders[off + 1].width = boundSep;
			this.borders[off + 1].height = h;
		}
		var centerX = -1,
			centerY = -1,
			tries = 0;

		this.setbounds();

		var allBounds = [].concat(this.bounds, this.regions);
		do {
			centerX = this.X_BOUNDARIES ? this.rand(boundSep, w - boundSep) : this.rand(0, w);
			centerY = this.Y_BOUNDARIES ? this.rand(boundSep, h - boundSep) : this.rand(0, h);
		} while (this.withinBounds(allBounds, centerX, centerY) && (++tries) < this.MAXTRIES);

		this.debugCounter[1] += tries;
		if (tries < this.debugCounter[2]) this.debugCounter[2] = tries; // stores minimum
		if (tries > this.debugCounter[3]) this.debugCounter[3] = tries; // stores maximum
		if (++this.debugCounter[0] >= 10) {
			if (this.DEBUG)
				console.log("[HalloweenEffects Debug Mode] Last 10 Tries Average: " + this.debugCounter[1] / 10 + " Min: " + this.debugCounter[2] + " Max: " + this.debugCounter[3]);
			// reset counters
			this.debugCounter[0] = this.debugCounter[1] = 0;
			this.debugCounter[2] = this.MAXTRIES + 999;
			this.debugCounter[3] = -999;
		}

		if (tries < this.MAXTRIES) {
			this.x[index] = centerX;
			this.y[index] = centerY;
			this.regions[index].top = centerY - centerSep * 1;
			this.regions[index].left = centerX - centerSep * 1;
			this.regions[index].width = centerSep * 2;
			this.regions[index].height = centerSep * 2;
		}
		else
			console.log("[HalloweenEffects] Setting Element " + index + " to previous position.\nTry resizing your browser and/or use the 'collapse' view to get a better performance.");

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
		if (isNaN(x) || isNaN(y))
			setTimeout(that.calculate.bind(null, index), delay);
		else
			setTimeout(function () {
				that.sprites[index].css({
					left: x,
					top: y,
				}).addClass("animate");
				setTimeout(function () {
					that.sprites[index].removeClass("animate");
					that.calculate(index);
				}, that.T);
			}, delay);
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
	withinBounds: function (allBounds, x, y) {
		for (var i in allBounds) {
			if (typeof allBounds[i] !== "undefined" &&
				typeof allBounds[i].left !== "undefined" &&
				typeof allBounds[i].top !== "undefined" &&
				typeof allBounds[i].width !== "undefined" &&
				typeof allBounds[i].height !== "undefined") {
				var xmin = allBounds[i].left,
					xmax = allBounds[i].left + allBounds[i].width,
					ymin = allBounds[i].top,
					ymax = allBounds[i].top + allBounds[i].height;
				if (x >= xmin && x <= xmax && y >= ymin && y <= ymax)
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
	// functions to be used in console: HalloweenEffects.<function>()
	startAll: function () {
		this.pause = false;
		console.log("[Halloween Effects] Starting Animations");
	},
	stopAll: function () {
		this.pause = true;
		console.log("[Halloween Effects] Pausing Animations");
	},
	startDebug: function () {
		this.DEBUG = true;
		this.canvas.addClass("debug-mode");
		console.log("[Halloween Effects] Entering Debug Mode");
	},
	stopDebug: function () {
		this.DEBUG = false;
		this.canvas.removeClass("debug-mode");
		console.log("[Halloween Effects] Exiting Debug Mode");
	},
});

mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.Uri"], function () {
	if (HalloweenEffects.loaded) {
		if (config.optionalDeferredRegister)
			config.optionalDeferredRegister.resolve(window.HalloweenEffects);
		return;
	}
	$("<link>", {
		rel: "stylesheet",
		href: new mw.Title("Gadget-Events/HalloweenEffects.css", 8).getUrl({
			action: "raw",
			ctype: "text/css"
		})
	}).appendTo("head");
	HalloweenEffects.init();
});