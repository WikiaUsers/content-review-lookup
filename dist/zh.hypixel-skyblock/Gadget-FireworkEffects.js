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
			excludeMobile: true, // The flakes are likely to be bad news for mobile phones' CPUs (and batteries.) Enable at your own risk.
			rocketsMax: 3, // Make this flakesMaxActive/16 - 2 (warning: this ratio hasn't been tested so don't trust it)
			flakesMaxActive: 72, // Limit amount of firework flakes firing at once (less = lower CPU use)
			animationInterval: 35, // Theoretical "milliseconds per frame" measurement. 20 = fast + smooth, but high 
			// CPU use. 50 = more conservative, but slower
			useGPU: true, // Enable transform-based hardware acceleration, reduce CPU load.
			className: "fireworkeffect-flakes", // CSS class name for further customization on flake elements
			flakeBottom: null, // Integer for Y axis limit, 0 or null for "full-screen" effect
			starCharacter: "&bull;", // &bull; = bullet, &middot, is square on some systems etc.
			targetElement: null, // element which flakes will be appended to (null = document.body) - can be an element 
			// ID eg. "myDiv", or a DOM node reference
			useFadeEffect: true, // When recycling fallen flakes (or rarely, when falling), have it "melt" and fade out 
			// if browser supports it
			useTwinkleEffect: false, // Allow flakes to randomly "flicker" in and out of view while falling
			usePositionFixed: true, // true = flakes does not shift vertically when scrolling. May increase CPU load, 
			// disabled by default - if enabled, used only where supported
			usePixelPosition: false, // Whether to use pixel values for flakes top/left vs. percentages. Auto-enabled if 
			// body is position:relative or targetElement is specified.

			// Specific Variables For Firework Custom Script
			celebrateOnNewYear: true, // If enabled, even if autoStart is turned off, 
			celebrateOnSpecificDates: [], // Sets custom dates in the format of, for example, "31 December". On those days, the firework show will start automatically even if this.autoStart is turned off
			fireworksHideToBackground: true, // If enabled, this.zIndex will be set to -1 after the timeout
			fireworksHideTimeout: 4000, // Sets the timeout after which the firework will hide in the background

			// --- less-used bits ---
			freezeOnBlur: true, // Only show flakes when the window is in focus (foreground.) Saves CPU.
			flakeLeftOffset: 0, // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
			flakeRightOffset: 0, // Right margin/gutter space on edge of container
			flakeWidth: 8, // Max pixel width reserved for flake element
			flakeHeight: 8, // Max pixel height reserved for flake element
			vMaxX: 5, // Maximum X velocity range for a flake
			vMaxY: 4, // Maximum Y velocity range for a flake
			zIndex: 2, // CSS stacking order applied to each firework flake
			windOffset: 1,
			windMultiplier: 2,
			flakeTypes: 6,
			rocketTypes: 3, // 0: Single color. 1: 2 colors. 2: random colors. All of these may be subject to change
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
			screenX = null,
			screenX2 = null,
			screenY = null,
			scrollY = null,
			docHeight = null,
			vRndX = null,
			vRndY = null,
			fixedForEverything = false,
			targetElementIsRelative = false,
			opacitySupported = (function () {
				try {
					document.createElement("div").style.opacity = "0.5";
				} catch (e) {
					return false;
				}
				return true;
			}()),
			didInit = false,
			docFrag = document.createDocumentFragment();

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

			var testDiv = document.createElement("div");

			function has(prop) {
				// test for feature support
				var result = testDiv.style[prop];
				return result !== undefined ? prop : null;
			}

			// note local scope.
			var localFeatures = {
				transform: {
					ie: has("-ms-transform"),
					moz: has("MozTransform"),
					opera: has("OTransform"),
					webkit: has("webkitTransform"),
					w3: has("transform"),
					prop: null // the normalized property value
				},

				getAnimationFrame: getAnimationFrame
			};

			localFeatures.transform.prop = (
				localFeatures.transform.w3 ||
				localFeatures.transform.moz ||
				localFeatures.transform.webkit ||
				localFeatures.transform.ie ||
				localFeatures.transform.opera
			);

			testDiv = null;
			return localFeatures;
		}());

		this.timer = null;
		this.flakes = [];
		this.rockets = [];
		this.disabled = false;
		this.active = false;
		this.meltFrameCount = 20;
		this.meltFrames = [];

		this.setXY = function (o, x, y) {
			if (!o) return false;

			if (show.usePixelPosition || targetElementIsRelative) {
				o.style.left = (x - show.flakeWidth) + "px";
				o.style.top = (y - show.flakeHeight) + "px";
			} else if (noFixed) {
				o.style.right = (100 - (x / screenX * 100)) + "%";
				// avoid creating vertical scrollbars
				o.style.top = (Math.min(y, docHeight - show.flakeHeight)) + "px";
			} else {
				if (!show.flakeBottom) {
					// if not using a fixed bottom coordinate...
					o.style.right = (100 - (x / screenX * 100)) + "%";
					o.style.bottom = (100 - (y / screenY * 100)) + "%";
				} else {
					// absolute top.
					o.style.right = (100 - (x / screenX * 100)) + "%";
					o.style.top = (Math.min(y, docHeight - show.flakeHeight)) + "px";
				}
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

		function rnd(n, min) {
			if (isNaN(min)) min = 0;

			return (Math.random() * n) + min;
		}

		function plusMinus(n) {
			return parseInt(rnd(2), 10) === 1 ? n * -1 : n;
		}

		this.scrollHandler = function () {
			var i;
			// "attach" firework flakes to bottom of window if no absolute bottom value was given
			scrollY = (show.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || (noFixed ? document.body.scrollTop : 0), 10));
			if (isNaN(scrollY)) scrollY = 0; // Netscape 6 scroll fix
			/* if (!fixedForEverything && !show.flakeBottom && show.flakes) {
				for(i = 0; i < show.flakes.length; i++) {
					if (show.flakes[i].active === 0) {
						show.flakes[i].stick();
					}
				}
			} */
		};

		this.resizeHandler = function () {
			if (window.innerWidth || window.innerHeight) {
				screenX = window.innerWidth - 16 - show.flakeRightOffset;
				screenY = (show.flakeBottom || window.innerHeight);
			} else {
				screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!isIE ? 8 : 0) - show.flakeRightOffset;
				screenY = show.flakeBottom || document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
			}
			docHeight = document.body.offsetHeight;
			screenX2 = parseInt(screenX / 2, 10);
		};

		this.resizeHandlerAlt = function () {
			screenX = show.targetElement.offsetWidth - show.flakeRightOffset;
			screenY = show.flakeBottom || show.targetElement.offsetHeight;
			screenX2 = parseInt(screenX / 2, 10);
			docHeight = document.body.offsetHeight;
		};

		this.freeze = function () {
			// pause animation
			if (!show.disabled) {
				show.disabled = 1;
			} else {
				return false;
			}
			show.timer = null;
		};

		this.resume = function () {
			if (show.disabled) {
				show.disabled = 0;
			} else {
				return false;
			}
			show.timerInit();
		};

		this.toggleFirework = function () {
			if (!show.flakes.length) {
				// first run
				show.start();
			} else {
				show.active = !show.active;
				if (show.active) {
					show.show();
					show.resume();
				} else {
					show.stop();
					show.freeze();
				}
			}
		};

		this.stop = function () {
			var i;
			this.freeze();
			for (i = 0; i < this.flakes.length; i++) {
				this.flakes[i].o.style.display = "none";
			}
			show.events.remove(window, "scroll", show.scrollHandler);
			show.events.remove(window, "resize", show.resizeHandler);
			if (show.freezeOnBlur) {
				if (isIE) {
					show.events.remove(document, "focusout", show.freeze);
					show.events.remove(document, "focusin", show.resume);
				} else {
					show.events.remove(window, "blur", show.freeze);
					show.events.remove(window, "focus", show.resume);
				}
			}
		};

		this.show = function () {
			var i;
			for (i = 0; i < this.flakes.length; i++) {
				this.flakes[i].o.style.display = "block";
			}
		};

		this.fireworkStar = function () {
			var s = this;
			this.x = parseInt(rnd(screenX - 20), 10);
			this.y = -rnd(screenY) - 12;
			this.vX = null;
			this.vY = null;
			this.active = 0;
			this.fontSize = (30 + Math.floor(Math.random() * 5) * 2);
			this.o = document.createElement("div");
			this.o.innerHTML = show.starCharacter;
			if (show.className) {
				this.o.setAttribute("class", show.className);
			}
			this.o.style.position = (fixedForEverything ? "fixed" : "absolute");
			if (show.useGPU && features.transform.prop) {
				// GPU-accelerated flakes.
				this.o.style[features.transform.prop] = "translate3d(0px, 0px, 0px)";
			}
			this.o.style.color = "#fff";
			this.o.style.width = show.flakeWidth + "px";
			this.o.style.height = show.flakeHeight + "px";
			this.o.style.fontFamily = "arial,verdana";
			this.o.style.cursor = "default";
			this.o.style.overflow = "hidden";
			this.o.style.fontWeight = "normal";
			this.o.style.zIndex = show.zIndex;
			docFrag.appendChild(this.o);

			this.refresh = function () {
				if (isNaN(s.x) || isNaN(s.y)) {
					// safety check
					return false;
				}
				show.setXY(s.o, s.x, s.y);
			};

			this.stick = function () {
				if (noFixed || (storm.targetElement !== document.documentElement && storm.targetElement !== document.body)) {
					s.o.style.top = (screenY + scrollY - storm.flakeHeight) + "px";
				} else if (storm.flakeBottom) {
					s.o.style.top = storm.flakeBottom + "px";
				} else {
					s.o.style.display = "none";
					s.o.style.top = "auto";
					s.o.style.bottom = "0%";
					s.o.style.position = "fixed";
					s.o.style.display = "block";
				}
			};

			this.move = function () {
				s.x += s.vX;
				s.y += s.vY;
				s.vY += 0.5;
				if (s.vX !== 0) {
					s.vX -= 0.1 * s.vX / Math.abs(s.vX);
				}
				s.refresh();
				if (s.x >= screenX || s.x < 0) { // X-axis scroll check
					s.active = 0;
					s.o.style.display = "none";
					//console.log("X kill");
				}
				//console.log("Y = " + s.y.toString() + ". show.height = " + show.height.toString());
				if (s.y >= show.height) {
					s.active = 0;
					s.o.style.display = "none";
					//console.log("Y kill: Y = " + s.y.toString() + ". show.height = " + show.height.toString());
				}
			};

			this.setOpacity = function (o, opacity) {
				if (!opacitySupported) {
					return false;
				}
				o.style.opacity = opacity;
			};

			this.recycle = function (x, y, vX, vY, color) {
				s.o.style.display = "none";
				s.o.style.position = (fixedForEverything ? "fixed" : "absolute");
				s.o.style.bottom = "auto";
				s.vX = vX;
				s.vY = vY;
				s.o.style.color = color;
				s.setOpacity(s.o, 1);
				s.o.style.padding = "0px";
				s.o.style.margin = "0px";
				s.o.style.fontSize = s.fontSize + "px";
				s.o.style.lineHeight = (show.flakeHeight + 2) + "px";
				s.o.style.textAlign = "center";
				s.o.style.verticalAlign = "baseline";
				s.x = x;
				s.y = y;
				s.refresh();
				s.o.style.display = "block";
				s.active = 1;
			};

			this.recycle(); // set up x/y coords etc.
			this.refresh();
			s.active = 0;
			s.setOpacity(s.o, 0);
		};

		this.fireworkRocket = function (type) {
			var r = this;
			this.type = type;
			this.x = parseInt(rnd(screenX - 20), 10);
			this.y = screenY;
			this.vX = null; // x velocity
			this.vY = null; // y velocity
			this.tY = parseInt(rnd(50), 10) + screenY / 4; // target Y value for rocket to explode at.
			this.active = 1;
			this.fontSize = (25);
			this.o = document.createElement("img");
			this.o.src = "https://static.wikia.nocookie.net/hypixel-skyblock/images/2/25/Firework_Rocket.png/revision/latest/scale-to-width-down/160?cb=20210615224504";
			if (show.className) {
				this.o.setAttribute("class", show.className);
			}
			//this.o.style.color = "#fff";
			//this.o.style.position = (fixedForEverything ? "fixed" : "absolute");
			if (show.useGPU && features.transform.prop) {
				// GPU-accelerated flakes.
				this.o.style[features.transform.prop] = "translate3d(0px, 0px, 0px)";
			}
			this.o.style.width = "40px";
			this.o.style.height = "40px";
			this.o.style.zIndex = show.zIndex - 1;
			docFrag.appendChild(this.o);

			this.refresh = function () {
				if (isNaN(r.x) || isNaN(r.y)) {
					// safety check
					return false;
				}
				show.setXY(r.o, r.x, r.y);
			};

			this.move = function () {
				r.x += r.vX;
				r.y -= r.vY;
				r.vX *= 3 / 4;
				r.vY *= 7 / 8;
				r.refresh();
				if (r.y <= r.targetY || r.vY <= 3) {
					r.explode(r.x, r.y);
				}
			};

			this.explode = function (x, y) {
				r.active = Math.floor(Math.random() * 256) + 128 + 1;
				r.o.style.display = "none";
				//console.log("Explode! Type: " + r.type.toString());
				var inactiveStars = [];
				var i;
				for (i = 0; i < show.flakes.length; i++) {
					if (show.flakes[i].active === 0) {
						inactiveStars[inactiveStars.length] = i;
					}
				}
				if (inactiveStars.length < 16) {
					console.log("Add more flakes at initialization.");
				}
				if (type === 0) {
					r.color1 = "rgb(" + Math.floor(Math.random() * 256).toString() + "," + Math.floor(Math.random() * 256).toString() + "," + Math.floor(Math.random() * 256).toString() + ")";
					for (i = 0; i < 16; i++) {
						if (show.flakes[inactiveStars[i]])
							show.flakes[inactiveStars[i]].recycle(x, y, 10 * Math.sin(i * Math.PI / 8), 10 * Math.cos(i * Math.PI / 8) - 11, r.color1);
					}
				} else if (type === 1) {
					r.colors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]; // A thing
					r.color1 = "rgb(" + r.colors[0].toString() + "," + r.colors[1].toString() + "," + r.colors[2].toString() + ")";
					r.color2 = "rgb(" + (255 - r.colors[0]).toString() + "," + (255 - r.colors[1]).toString() + "," + (255 - r.colors[2]).toString() + ")";
					for (i = 0; i < 16; i++) {
						if (show.flakes[inactiveStars[i]])
							show.flakes[inactiveStars[i]].recycle(x, y, 10 * Math.sin(i * Math.PI / 8), 10 * Math.cos(i * Math.PI / 8) - 11, (i % 2 === 1 ? r.color1 : r.color2));
					}
				} else {
					for (i = 0; i < 16; i++) {
						if (show.flakes[inactiveStars[i]])
							show.flakes[inactiveStars[i]].recycle(x, y, 10 * Math.sin(i * Math.PI / 8), 10 * Math.cos(i * Math.PI / 8) - 11, "rgb(" + Math.floor(Math.random() * 256).toString() + "," + Math.floor(Math.random() * 256).toString() + "," + Math.floor(Math.random() * 256).toString() + ")");
					}
				}
			};

			this.setVelocities = function () {
				r.vX = rnd(8, 0.1);
				r.vY = Math.floor(Math.random() * 32) + 65;
				r.targetY = parseInt(rnd(50), 10) + screenY / 4;
			};

			this.setOpacity = function (o, opacity) {
				if (!opacitySupported) {
					return false;
				}
				o.style.opacity = opacity;
			};

			this.recycle = function () {
				r.o.style.display = "none";
				r.o.style.position = (fixedForEverything ? "fixed" : "absolute");
				r.o.style.bottom = "auto";
				r.setVelocities();
				r.setOpacity(r.o, 1);
				r.o.style.padding = "0px";
				r.o.style.margin = "0px";
				//r.o.style.fontSize = r.fontSize + "px";
				//r.o.style.lineHeight = (show.flakeHeight + 2) + "px";
				//r.o.style.textAlign = "center";
				r.o.style.verticalAlign = "baseline";
				r.x = parseInt(rnd(screenX - show.flakeWidth - 20), 10);
				r.y = screenY;
				r.refresh();
				r.o.style.display = "block";
				r.active = 1;
			};

			this.recycle(); // set up x/y coords etc.
			this.refresh();
		};

		this.fireworks = function () {
			var active = 0,
				i, j;
			for (i = 0, j = show.flakes.length; i < j; i++) {
				if (show.flakes[i].active === 1) {
					show.flakes[i].move();
					active++;
				}
			}
			for (i = 0, j = show.rockets.length; i < j; i++) {
				if (show.rockets[i].active === 1) {
					show.rockets[i].move();
				} else if (show.rockets[i].active === 2) {
					show.rockets[i].recycle();
				} else {
					show.rockets[i].active--;
				}
			}
			//console.log(show.rockets);
			if (show.timer) {
				features.getAnimationFrame(show.fireworks);
			}
		};

		this.createRockets = function (limit) {
			var i;
			for (i = 0; i < limit; i++) {
				show.rockets[show.rockets.length] = new show.fireworkRocket(Math.floor(Math.random() * 3));
			}
			show.targetElement.appendChild(docFrag);
		};

		this.createStars = function (limit) {
			var i;
			for (i = 0; i < limit; i++) {
				show.flakes[show.flakes.length] = new show.fireworkStar();
			}
			show.targetElement.appendChild(docFrag);
		};

		this.timerInit = function () {
			show.timer = true;
			show.fireworks();
		};

		this.init = function () {
			var i;
			for (i = 0; i < show.meltFrameCount; i++) {
				show.meltFrames.push(1 - (i / show.meltFrameCount));
			}
			show.createRockets(show.rocketsMax); // create initial batch
			show.createStars(show.flakesMaxActive);
			show.events.add(window, "resize", show.resizeHandler);
			show.events.add(window, "scroll", show.scrollHandler);
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
			show.scrollHandler();
			show.animationInterval = Math.max(20, show.animationInterval);
			show.timerInit();
			show.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
		};

		this.start = function (bFromOnLoad) {
			if (show.fireworksHideToBackground) {
				setTimeout(function () {
					show.zIndex = -1;
					setTimeout(function () {
						var res = $("." + show.className).css("z-index", -2);
						console.log("[FireworkEffects] Show opening is over. The firework show will continue in background.", res.length);
					}, 1000);
				}, show.fireworksHideTimeout);
			}
			if (!didInit) {
				didInit = true;
			} else if (bFromOnLoad) {
				// already loaded and running
				return true;
			}
			if (typeof show.targetElement === "string") {
				var targetID = show.targetElement;
				show.targetElement = document.getElementById(targetID);
				if (!show.targetElement) {
					throw new Error("Fireworkshow: Unable to get targetElement \"" + targetID + "\"");
				}
			}
			if (!show.targetElement) {
				show.targetElement = (document.body || document.documentElement);
			}
			if (show.targetElement !== document.documentElement && show.targetElement !== document.body) {
				// re-map handler to get element instead of screen dimensions
				show.resizeHandler = show.resizeHandlerAlt;
				//and force-enable pixel positioning
				show.usePixelPosition = true;
			}
			show.resizeHandler(); // get bounding box elements
			show.usePositionFixed = (show.usePositionFixed && !noFixed && !show.flakeBottom); // whether or not position:fixed is to be used
			if (window.getComputedStyle) {
				// attempt to determine if body or user-specified flake parent element is relatlively-positioned.
				try {
					targetElementIsRelative = (window.getComputedStyle(show.targetElement, null).getPropertyValue("position") === "relative");
				} catch (e) {
					// oh well
					targetElementIsRelative = false;
				}
			}
			fixedForEverything = show.usePositionFixed;
			if (screenX && screenY && !show.disabled) {
				show.init();
				show.active = true;
			}
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