/** FireworkEffects
 * Script for displaying fireworks on New Year.
 */

/** Attribution: Script Referenced:
 * DHTML Snowstorm! JavaScript-based snow for web pages by Scott Schiller
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License
 * https://github.com/scottschiller/Snowstorm/blob/master/license.txt
 */

/*jslint nomen: true, plusplus: true, sloppy: true, vars: true, white: true */
/*global window, document, navigator, clearInterval, setInterval */

var scriptLoaded = !!(window.fireworkShow && window.fireworkShow.Loaded);

window.fireworkShow = window.fireworkShow || {};
window.fireworkShow.Loaded = true;

mw.loader.using(["mediawiki.util", "mediawiki.Uri"], function () {
	if ((mw.config.get("wgAction") !== "view") || scriptLoaded) return;

	console.log("[FireworkEffects] Script Loading.");

	window.fireworkShow = (new function () { // jshint ignore:line
		var defaults = {
			autoStart: false, // Whether the firework should start automatically or not.
			excludeMobile: true, // The sparks are likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
			max_fireworks: 5,
			max_sparks: 50, // Limit amount of firework sparks firing at once (less = lower CPU use)
			animationInterval: 35, // Theoretical "milliseconds per frame" measurement. 20 = fast + smooth, but high 
			// CPU use. 50 = more conservative, but slower
			// Specific Variables For Firework Custom Script
			celebrateOnNewYear: true, // If enabled, even if autoStart is turned off, 
			celebrateOnSpecificDates: [], // Sets custom dates in the format of, for example, "31 December". On those days, the firework show will start automatically even if this.autoStart is turned off
			fireworksHideToBackground: true, // If enabled, this.zIndex will be set to -1 after the timeout
			fireworksHideTimeout: 10000, // Sets the timeout after which the firework will hide in the background

			// --- less-used bits ---
			freezeOnBlur: true, // Only show sparks when the window is in focus (foreground.) Saves CPU.
			zIndex: 2, // CSS stacking order applied to each firework flake
		};

		var config = Object.assign(defaults, window.fireworkShow || {});

		Object.assign(this, config);

		// --- "No user-serviceable parts inside" past this point, yadda yadda ---
		var show = this,
			features,
			// UA sniffing and backCompat rendering mode checks for fixed position, etc.
			isIE = navigator.userAgent.match(/msie/i),
			isIE6 = navigator.userAgent.match(/msie 6/i),
			isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
			isBackCompatIE = (isIE && document.compatMode === "BackCompat"),
			noFixed = (isBackCompatIE || isIE6),
			targetElementIsRelative = false,
			didInit = false,
			canvas = document.createElement("canvas");
			canvas.style.position = "fixed";
			canvas.height = window.innerHeight;
			canvas.width = window.innerWidth;
			canvas.style.zIndex = show.zIndex;
			canvas.style.top = "0px";
			canvas.style.left = "0px";
			canvas.style.pointerEvents = "none";
			context = canvas.getContext('2d');
			rocket = new Image();
			rocketsrc = "https://static.wikia.nocookie.net/hypixel-skyblock/images/2/25/Firework_Rocket.png/revision/latest/scale-to-width-down/80?cb=20210615224504";
			rocket.src = rocketsrc;
			document.body.appendChild(canvas);

		features = (function () {
			var getAnimationFrame;

			/**
			 * hat tip: paul irish
			 * https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
			 * https://gist.github.com/838785
			 */
			function timeoutShim(callback) {
				window.setTimeout(callback, 1000 / (show.animationInterval || 20));
			}

			var _animationFrame = (window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				timeoutShim);

			// apply to window, avoid "illegal invocation" errors in Chrome
			getAnimationFrame = _animationFrame ? function () {
				return _animationFrame.apply(window, arguments);
			} : null;
			
			return getAnimationFrame;
		}());

		this.fireworks = [];
		this.active = false;

		this.resetFirework = function(firework) {
			firework.x = Math.floor(Math.random() * canvas.width);
			firework.y = canvas.height;
			firework.age = 0;
			firework.phase = 'fly';
		};

		for (var i = 0; i < show.max_fireworks; i++) {
			var firework = {
		    	sparks: []
			};
			for (var n = 0; n < show.max_sparks; n++) {
    			var spark = {
    				vx: Math.random() * 5 + 0.5,
    				vy: Math.random() * 5 + 0.5,
    				weight: Math.random() * 0.3 + 0.03,
    				red: Math.floor(Math.random() * 2),
    				green: Math.floor(Math.random() * 2),
    				blue: Math.floor(Math.random() * 2)
    			};
    			if (Math.random() > 0.5) spark.vx = -spark.vx;
    			if (Math.random() > 0.5) spark.vy = -spark.vy;
    			firework.sparks.push(spark);
			}
			show.fireworks.push(firework);
			show.resetFirework(firework);
		}

		this.explode = function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			explode_height = Math.round(canvas.height/4);
			for (var a = 0; a < show.fireworks.length; a++) {
				firework = show.fireworks[a];
				if (firework.phase == 'explode') {
        			for (var c = 0; c < firework.sparks.length; c++) {
        				var spark = firework.sparks[c];
        				for (var d = 0; d < 10; d++) {
        					var trailAge = firework.age + d;
        					var x = firework.x + spark.vx * trailAge;
        					var y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
        					var fade = d * 40 - firework.age * 2;
        					var r = Math.floor(spark.red * fade);
        					var g = Math.floor(spark.green * fade);
        					var b = Math.floor(spark.blue * fade);
        					context.beginPath();
        					context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
        					context.rect(x, y, 4, 4);
        					context.fill();
        				}
        			}
    				firework.age++;
    				if (firework.age > 100 && Math.random() < 0.05) {
        				show.resetFirework(firework);
    				}
				} else {
    				firework.y = firework.y - 30;
    				context.drawImage(rocket,firework.x,firework.y);
    				if (Math.random() < 0.01 || firework.y < explode_height) {
    					firework.phase = 'explode';
    				}
    			}
			}
			if (show.active && show.timer) {
            	features(show.explode);
        	}
		};
		
		this.events = (function () {
			var old = !window.addEventListener && window.attachEvent,
				slice = Array.prototype.slice,
				evt = {
					add: old ? "attachEvent" : "addEventListener",
					remove: old ? "detachEvent" : "removeEventListener",
				};

			function getArgs(oArgs) {
				var args = slice.call(oArgs),
					len = args.length;
				if (old) {
					args[1] = "on" + args[1]; // prefix
					if (len > 3) {
						args.pop(); // no capture
					}
				} else if (len === 3) {
					args.push(false);
				}
				return args;
			}

			function apply(args, sType) {
				var element = args.shift(),
					method = [evt[sType]];
				if (old) {
					element[method](args[0], args[1]);
				} else {
					element[method].apply(element, args);
				}
			}

			function addEvent() {
				apply(getArgs(arguments), "add");
			}

			function removeEvent() {
				apply(getArgs(arguments), "remove");
			}

			return {
				add: addEvent,
				remove: removeEvent
			};
		}());

		this.resizeHandler = function () {
			canvas.height = window.innerHeight;
			canvas.width = window.innerWidth;
		};

		this.resizeHandlerAlt = function () {
			canvas.height = show.targetElement.style.height;
			canvas.width = show.targetElement.style.width;
		};

		this.freeze = function () {
			show.active = false;
		};

		this.resume = function () {
			show.active = true;
			show.explode();
		};
		
		this.stop = function () {
			this.freeze();
			context.clearRect(0, 0, canvas.width, canvas.height);
		};

		this.timerInit = function () {
			show.timer = true;
		};

		this.init = function () {
			var i;
			show.events.add(window, "resize", show.resizeHandler);
			if (show.freezeOnBlur) {
				if (isIE) {
					show.events.add(document, "focusout", show.freeze);
					show.events.add(document, "focusin", show.resume);
				} else {
					show.events.add(window, "blur", show.freeze);
					show.events.add(window, "focus", show.resume);
				}
			}
			show.resizeHandler();
			show.animationInterval = Math.max(20, show.animationInterval);
			show.timerInit();
		};

		this.start = function (bFromOnLoad) {
			if (show.fireworksHideToBackground) {
				setTimeout(function () {
					console.log("[FireworkEffects] Show opening is over. The firework show will continue in background.");
					canvas.style.zIndex= -1;
				}, show.fireworksHideTimeout);
			}
			if (!didInit) {
				didInit = true;
			} else if (bFromOnLoad) {
				// already loaded and running
				return true;
			}
			document.body.style.backgroundColor = "#000";
			var styleElem = document.head.appendChild(document.createElement("style"));
			styleElem.innerHTML = ".fandom-community-header__background:before {background-image: -webkit-gradient(linear,left top,left bottom,color-stop(25%,rgba(var(--theme-body-background-color--rgb),0)),to(var(--theme-body-background-color))) !important; background-image: linear-gradient(to bottom,rgba(0,0,0,0) 25%,rgb(0,0,0)) !important;}"; //fix the webkit one, it doesn't match the normal one.
			show.init();
			show.active = true;
			show.explode();
		};

		function doDelayedStart() {
			window.setTimeout(function () {
				show.start(true);
			}, 20);
			// event cleanup
			show.events.remove(isIE ? document : window, "mousemove", doDelayedStart);
		}

		function doStart() {
			if ((!show.excludeMobile || !isMobile)) {
				doDelayedStart();
			}
			// event cleanup
			show.events.remove(window, "load", doStart);
		}

		function during(date0, date1) {
			return date0.getFullYear() == date1.getFullYear() &&
				date0.getMonth() == date1.getMonth() &&
				date0.getDate() == date1.getDate();
		}

		function duringAny(date0, dates) {
			return dates.some(function (d) {
				return during(date0, d);
			});
		}

		function celebrateDates(year) {
			var cny_lookup = {
				2021: "12 Feb 2021",
				2022: "1 Feb 2022",
				2023: "22 Jan 2023",
				2024: "10 Feb 2024",
				2025: "29 Jan 2025",
				2026: "17 Feb 2026",
				2027: "6 Feb 2027",
				2028: "26 Jan 2028",
				2029: "13 Feb 2029",
				2030: "3 Feb 2030",
				2031: "23 Jan 2031",
				2032: "11 Feb 2032",
			};
			return show.celebrateOnSpecificDates.map(function (d) {
				return new Date(d + " " + year);
			}).concat(show.celebrateOnNewYear && [
				new Date("1 January " + year), // new year (Gregorian calendar)
				new Date(cny_lookup[year]), // new year (Chinese calendar)
			] || []);
		}

		function waitTillCelebrate() {
			var date = new Date(),
				thisyear = celebrateDates(date.getFullYear()),
				nextyear = celebrateDates(date.getFullYear() + 1);

			var promise = $.Deferred();
			if (show.autoStart || duringAny(date, thisyear)) {
				console.log("[FireworkEffects] Starting celebration!");
				promise.resolve(true);
			} else if (!thisyear.length) {
				promise.resolve(false);
			} else {
				var till = Math.min.apply(this, thisyear.map(function (v, i) {
					return ((date < v) && v || nextyear[i]) - date;
				}));
				if (till < 86400000) { // Celebration in less than 1 day
					setTimeout(function () {
						console.log("[FireworkEffects] Starting celebration!");
						promise.resolve(true);
					}, till);
				} else
					promise.resolve(false);
				console.log("[FireworkEffects] " + till + "ms till celebration.");
			}
			return promise;
		}

		// hooks for starting the firework show
		waitTillCelebrate().then(function (toCelebrate) {
			if (toCelebrate) {
				if (document.readyState === "complete")
					doStart();
				else
					show.events.add(window, "load", doStart, false);
			}
		});
	}());
});