/** @license
 * DHTML Snowstorm! JavaScript-based Snow for web pages
 * --------------------------------------------------------
 * Version 1.43.20111201 (Previous rev: 1.42.20111120)
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/snowstorm/license.txt
 */

/*global window, document, navigator, clearInterval, setInterval */
/*jslint white: false, onevar: true, plusplus: false, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */

window.snowStorm = {

	// --- common properties ---

	autoStart: false,		// Whether the snow should start automatically or not.
	flakesMax: 50,			// Limit total amount of snow made (falling + sticking)
	flakesMaxActive: 50,		// Limit amount of snow falling at once (less = lower CPU use)
	animationInterval: 35,		// Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
	excludeMobile: true,		// Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
	flakeBottom: null,		// Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
	followMouse: false,		// Snow movement can respond to the user's mouse
	snowColor: '#fff',		// Don't eat (or use?) yellow snow.
	snowCharacter: '&bull;',	// &bull; = bullet, &middot; is square on some systems etc.
	snowStick: false,		// Whether or not snow should "stick" at the bottom. When off, will never collect.
	targetElement: document.body,	// element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
	useMeltEffect: true,		// When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
	useTwinkleEffect: false,	// Allow snow to randomly "flicker" in and out of view while falling
	usePositionFixed: true,		// true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported

	// --- less-used bits ---

	freezeOnBlur: true,		// Only snow when the window is in focus (foreground.) Saves CPU.
	flakeLeftOffset: 0,		// Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
	flakeRightOffset: 0,		// Right margin/gutter space on edge of container
	flakeWidth: 8,			// Max pixel width reserved for snow element
	flakeHeight: 8,			// Max pixel height reserved for snow element
	vMaxX: 5,			// Maximum X velocity range for snow
	vMaxY: 4,			// Maximum Y velocity range for snow
	zIndex: 0			// CSS stacking order applied to each snowflake
};
// --- End of user section ---

snowStorm.internal = {
	// UA sniffing and backCompat rendering mode checks for fixed position, etc.
	isIE: navigator.userAgent.match(/msie/i),
	isIE6: navigator.userAgent.match(/msie 6/i),
	isWin98: navigator.appVersion.match(/windows 98/i),
	isMobile: navigator.userAgent.match(/mobile|opera m(ob|in)/i),
	screenX: null,
	screenX2: null,
	screenY: null,
	scrollY: null,
	vRndX: null,
	vRndY: null,
	windOffset: 1,
	windMultiplier: 2,
	flakeTypes: 6,
	fixedForEverything: false,
	opacitySupported: true,
	didInit: false,
	docFrag: document.createDocumentFragment()
};
snowStorm.internal.isBackCompatIE = (snowStorm.internal.isIE && document.compatMode == 'BackCompat');
snowStorm.internal.noFixed = (snowStorm.internal.isMobile || snowStorm.internal.isBackCompatIE || snowStorm.internal.isIE6);
try {
	document.createElement('div').style.opacity = '0.5';
} catch(e) {
	snowStorm.internal.opacitySupported = false;
}

snowStorm.timers = [];
snowStorm.flakes = [];
snowStorm.disabled = false;
snowStorm.active = false;
snowStorm.meltFrameCount = 20;
snowStorm.meltFrames = [];

snowStorm.events = {};
snowStorm.events.add = function(element, listener, func) {
	if (!window.addEventListener && window.attachEvent) {
		element.attachEvent('on' + listener, func);
	}
	else {
		element.addEventListener.apply(element, Array.prototype.slice.call(arguments, 1))
	}
}
snowStorm.events.remove = function(element, listener, func) {
	if (!window.addEventListener && window.attachEvent) {
		element.detachEvent('on' + listener, func);
	}
	else {
		element.removeEventListener.apply(element, Array.prototype.slice.call(arguments, 1))
	}
}
 
function rnd(n, min) {
	if (isNaN(min)) {
		min = 0;
	}
	return (Math.random() * n) + min;
}
 
function plusMinus(n) {
	if (parseInt(rnd(2), 10) == 1) {
		return n * -1;
	}
	else {
		return n;
	}
}
 
snowStorm.randomizeWind = function() {
	snowStorm.internal.vRndX = plusMinus(rnd(snowStorm.vMaxX, 0.2));
	snowStorm.internal.vRndY = rnd(snowStorm.vMaxY, 0.2);
	if (snowStorm.flakes) {
		for (var i = 0; i < snowStorm.flakes.length; i++) {
			if (snowStorm.flakes[i].active) {
				snowStorm.flakes[i].setVelocities();
			}
		}
	}
};
 
snowStorm.scrollHandler = function() {
	// "attach" snowflakes to bottom of window if no absolute bottom value was given
	snowStorm.internal.scrollY = (snowStorm.flakeBottom ? 0 : parseInt(window.scrollY || document.documentElement.scrollTop || document.body.scrollTop, 10));
	if (isNaN(snowStorm.internal.scrollY)) {
		snowStorm.internal.scrollY = 0; // Netscape 6 scroll fix
	}
	if (!snowStorm.internal.fixedForEverything && !snowStorm.flakeBottom && snowStorm.flakes) {
		for (var i = snowStorm.flakes.length - 1; i >= 0; i--) {
			if (snowStorm.flakes[i].active == 0) {
				snowStorm.flakes[i].stick();
			}
		}
	}
};
 
snowStorm.resizeHandler = function() {
	if (window.innerWidth || window.innerHeight) {
		snowStorm.internal.screenX = window.innerWidth - 16 - snowStorm.flakeRightOffset;
		snowStorm.internal.screenY = (snowStorm.flakeBottom ? snowStorm.flakeBottom : window.innerHeight);
	} else {
		snowStorm.internal.screenX = (document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth) - (!snowStorm.internal.isIE ? 8 : 0) - snowStorm.flakeRightOffset;
		snowStorm.internal.screenY = snowStorm.flakeBottom ? snowStorm.flakeBottom : (document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight);
	}
	snowStorm.internal.screenX2 = parseInt(snowStorm.internal.screenX / 2, 10);
};

snowStorm.resizeHandlerAlt = function() {
	snowStorm.internal.screenX = snowStorm.targetElement.offsetLeft + snowStorm.targetElement.offsetWidth - snowStorm.flakeRightOffset;
	snowStorm.internal.screenY = snowStorm.flakeBottom ? snowStorm.flakeBottom : snowStorm.targetElement.offsetTop + snowStorm.targetElement.offsetHeight;
	snowStorm.internal.screenX2 = parseInt(snowStorm.internal.screenX/2,10);
};
 
snowStorm.freeze = function() {
	// pause animation
	if (!snowStorm.disabled) {
		snowStorm.disabled = 1;
	} else {
		return false;
	}
	for (var i = snowStorm.timers.length - 1; i >= 0; i--) {
		clearInterval(snowStorm.timers[i]);
	}
};
 
snowStorm.resume = function() {
	if (snowStorm.disabled) {
		snowStorm.disabled = 0;
	} else {
		return false;
	}
	snowStorm.timerInit();
};
 
snowStorm.toggleSnow = function() {
	if (!snowStorm.flakes.length) {
		// first run
		snowStorm.start();
	} else {
		snowStorm.active = !snowStorm.active;
		if (snowStorm.active) {
			snowStorm.show();
			snowStorm.resume();
		} else {
			snowStorm.stop();
			snowStorm.freeze();
		}
	}
};
 
snowStorm.stop = function() {
	snowStorm.freeze();
	for (var i = snowStorm.flakes.length - 1; i >= 0; i--) {
		snowStorm.flakes[i].o.style.display = 'none';
	}
	snowStorm.events.remove(window, 'scroll', snowStorm.scrollHandler);
	snowStorm.events.remove(window, 'resize', snowStorm.resizeHandler);
	if (snowStorm.freezeOnBlur) {
		if (snowStorm.internal.isIE) {
			snowStorm.events.remove(document, 'focusout', snowStorm.freeze);
			snowStorm.events.remove(document, 'focusin', snowStorm.resume);
		} else {
			snowStorm.events.remove(window, 'blur', snowStorm.freeze);
			snowStorm.events.remove(window, 'focus', snowStorm.resume);
		}
	}
};
 
snowStorm.show = function() {
	for (var i = snowStorm.flakes.length - 1; i >= 0; i--) {
		snowStorm.flakes[i].o.style.display = 'block';
	}
};
 
snowStorm.SnowFlake = function(type, x, y) {
	this.type = type;
	this.x = x || parseInt(rnd(snowStorm.internal.screenX - 20), 10);
	this.y = (!isNaN(y) ? y : -rnd(snowStorm.internal.screenY) - 12);
	this.vX = null;
	this.vY = null;
	this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8]; // "amplification" for vX/vY (based on flake size/type)
	this.vAmp = this.vAmpTypes[this.type];
	this.melting = false;
	this.meltFrameCount = snowStorm.meltFrameCount;
	this.meltFrames = snowStorm.meltFrames;
	this.meltFrame = 0;
	this.twinkleFrame = 0;
	this.active = 1;
	this.fontSize = (10 + (this.type / 5) * 10);
	this.o = document.createElement('div');
	this.o.innerHTML = snowStorm.snowCharacter;
	this.o.style.color = snowStorm.snowColor;
	this.o.style.position = (snowStorm.internal.fixedForEverything ? 'fixed' : 'absolute');
	this.o.style.width = snowStorm.flakeWidth + 'px';
	this.o.style.height = snowStorm.flakeHeight + 'px';
	this.o.style.fontFamily = 'arial,verdana';
	this.o.style.cursor = 'default';
	this.o.style.overflow = 'hidden';
	this.o.style.fontWeight = 'normal';
	this.o.style.zIndex = snowStorm.zIndex;
	snowStorm.internal.docFrag.appendChild(this.o);

	this.refresh = function() {
		if (isNaN(this.x) || isNaN(this.y)) {
			// safety check
			return false;
		}
		this.o.style.left = this.x + 'px';
		this.o.style.top = this.y + 'px';
	};
 
	this.stick = function() {
		if (snowStorm.internal.noFixed || (snowStorm.targetElement !== document.documentElement && snowStorm.targetElement !== document.body)) {
			this.o.style.top = (snowStorm.internal.screenY + snowStorm.internal.scrollY - snowStorm.flakeHeight) + 'px';
		} else if (snowStorm.flakeBottom) {
			this.o.style.top = snowStorm.flakeBottom + 'px';
		} else {
			this.o.style.display = 'none';
			this.o.style.top = 'auto';
			this.o.style.bottom = '0px';
			this.o.style.position = 'fixed';
			this.o.style.display = 'block';
		}
	};

	this.vCheck = function() {
		if (this.vX >= 0 && this.vX < 0.2) {
			this.vX = 0.2;
		} else if (this.vX < 0 && this.vX > -0.2) {
			this.vX = -0.2;
		}
		if (this.vY >= 0 && this.vY < 0.2) {
			this.vY = 0.2;
		}
	};
 
	this.move = function() {
		var vX = this.vX * snowStorm.internal.windOffset;
		this.x += vX;
		this.y += (this.vY * this.vAmp);
		if (this.x >= snowStorm.internal.screenX || snowStorm.internal.screenX - this.x < snowStorm.flakeWidth) { // X-axis scroll check
			this.x = 0;
		} else if (vX < 0 && this.x - snowStorm.flakeLeftOffset < -snowStorm.flakeWidth) {
			this.x = snowStorm.internal.screenX - snowStorm.flakeWidth-1; // flakeWidth;
		}
		this.refresh();
		var yDiff = snowStorm.internal.screenY + snowStorm.internal.scrollY - this.y;
		if (yDiff < snowStorm.flakeHeight) {
			this.active = 0;
			if (snowStorm.snowStick) {
				this.stick();
			} else {
				this.recycle();
			}
		} else {
			if (snowStorm.useMeltEffect && this.active && this.type < 3 && !this.melting && Math.random() > 0.998) {
				// ~1/1000 chance of melting mid-air, with each frame
				this.melting = true;
				this.melt();
				// only incrementally melt one frame
				// this.melting = false;
			}
			if (snowStorm.useTwinkleEffect) {
				if (!this.twinkleFrame) {
					if (Math.random() > 0.9) {
						this.twinkleFrame = parseInt(Math.random() * 20, 10);
					}
				} else {
					this.twinkleFrame--;
					this.o.style.visibility = (this.twinkleFrame && this.twinkleFrame % 2 == 0 ? 'hidden' : 'visible');
				}
			}
		}
	};

	this.animate = function() {
		// main animation loop
		// move, check status, die etc.
		this.move();
	};

	this.setVelocities = function() {
		this.vX = snowStorm.internal.vRndX + rnd(snowStorm.vMaxX * 0.12, 0.1);
		this.vY = snowStorm.internal.vRndY + rnd(snowStorm.vMaxY * 0.12, 0.1);
	};

	this.setOpacity = function(o, opacity) {
		if (!snowStorm.internal.opacitySupported) {
			return false;
		}
		o.style.opacity = opacity;
	};

	this.melt = function() {
		if (!snowStorm.useMeltEffect || !this.melting) {
			this.recycle();
		} else {
			if (this.meltFrame < this.meltFrameCount) {
				this.setOpacity(this.o, this.meltFrames[this.meltFrame]);
				this.o.style.fontSize = this.fontSize - (this.fontSize * (this.meltFrame / this.meltFrameCount)) + 'px';
				this.o.style.lineHeight = snowStorm.flakeHeight + 2 + (snowStorm.flakeHeight * 0.75 * (this.meltFrame / this.meltFrameCount)) + 'px';
				this.meltFrame++;
			} else {
				this.recycle();
			}
		}
	};
 
	this.recycle = function() {
		this.o.style.display = 'none';
		this.o.style.position = (snowStorm.internal.fixedForEverything ? 'fixed' : 'absolute');
		this.o.style.bottom = 'auto';
		this.setVelocities();
		this.vCheck();
		this.meltFrame = 0;
		this.melting = false;
		this.setOpacity(this.o, 1);
		this.o.style.padding = '0px';
		this.o.style.margin = '0px';
		this.o.style.fontSize = this.fontSize + 'px';
		this.o.style.lineHeight = (snowStorm.flakeHeight + 2) + 'px';
		this.o.style.textAlign = 'center';
		this.o.style.verticalAlign = 'baseline';
		this.x = parseInt(rnd(snowStorm.internal.screenX - snowStorm.flakeWidth - 20), 10);
		this.y = parseInt(rnd(snowStorm.internal.screenY) * -1, 10) - snowStorm.flakeHeight;
		this.refresh();
		this.o.style.display = 'block';
		this.active = 1;
	};

	this.recycle(); // set up x/y coords etc.
	this.refresh();

};
 
snowStorm.snow = function() {
	var active = 0;
	var used = 0;
	var waiting = 0;
	var flake = null;
	for (var i = snowStorm.flakes.length - 1; i >= 0; i--) {
		if (snowStorm.flakes[i].active == 1) {
			snowStorm.flakes[i].move();
			active++;
		} else if (snowStorm.flakes[i].active == 0) {
			used++;
		} else {
			waiting++;
		}
		if (snowStorm.flakes[i].melting) {
			snowStorm.flakes[i].melt();
		}
	}
	if (active < snowStorm.flakesMaxActive) {
		flake = snowStorm.flakes[parseInt(rnd(snowStorm.flakes.length), 10)];
		if (flake.active == 0) {
			flake.melting = true;
		}
	}
};
 
snowStorm.mouseMove = function(e) {
	if (!snowStorm.followMouse) {
		return true;
	}
	var x = parseInt(e.clientX, 10);
	if (x < snowStorm.internal.screenX2) {
		snowStorm.internal.windOffset = -snowStorm.internal.windMultiplier + (x / snowStorm.internal.screenX2 * snowStorm.internal.windMultiplier);
	} else {
		x -= snowStorm.internal.screenX2;
		snowStorm.internal.windOffset = (x / snowStorm.internal.screenX2) * snowStorm.internal.windMultiplier;
	}
};
 
snowStorm.createSnow = function(limit, allowInactive) {
	for (var i = 0; i < limit; i++) {
		snowStorm.flakes.push(new snowStorm.SnowFlake(parseInt(rnd(snowStorm.internal.flakeTypes), 10)));
		if (allowInactive || i > snowStorm.flakesMaxActive) {
			snowStorm.flakes[snowStorm.flakes.length - 1].active = -1;
		}
	}
	snowStorm.targetElement.appendChild(snowStorm.internal.docFrag);
};

snowStorm.timerInit = function() {
	snowStorm.timers = (!snowStorm.internal.isWin98 ? [setInterval(snowStorm.snow, snowStorm.animationInterval)] : [setInterval(snowStorm.snow, snowStorm.animationInterval * 3), setInterval(snowStorm.snow, snowStorm.animationInterval)]);
};

snowStorm.init = function() {
	for (var i = 0; i < snowStorm.meltFrameCount; i++) {
		snowStorm.meltFrames.push(1 - (i / snowStorm.meltFrameCount));
	}
	snowStorm.randomizeWind();
	snowStorm.createSnow(snowStorm.flakesMax); // create initial batch
	snowStorm.events.add(window, 'resize', snowStorm.resizeHandler);
	snowStorm.events.add(window, 'scroll', snowStorm.scrollHandler);
	if (snowStorm.freezeOnBlur) {
		if (snowStorm.internal.isIE) {
			snowStorm.events.add(document, 'focusout', snowStorm.freeze);
			snowStorm.events.add(document, 'focusin', snowStorm.resume);
		} else {
			snowStorm.events.add(window, 'blur', snowStorm.freeze);
			snowStorm.events.add(window, 'focus', snowStorm.resume);
		}
	}
	snowStorm.resizeHandler();
	snowStorm.scrollHandler();
	if (snowStorm.followMouse) {
		snowStorm.events.add(snowStorm.internal.isIE ? document : window, 'mousemove', snowStorm.mouseMove);
	}
	snowStorm.animationInterval = Math.max(20, snowStorm.animationInterval);
	snowStorm.timerInit();
};
 
snowStorm.start = function(bFromOnLoad) {
	if (!snowStorm.internal.didInit) {
		snowStorm.internal.didInit = true;
	} else if (bFromOnLoad) {
		// already loaded and running
		return true;
	}
	if (typeof snowStorm.targetElement == 'string') {
		var targetID = snowStorm.targetElement;
		snowStorm.targetElement = document.getElementById(targetID);
		if (!snowStorm.targetElement) {
			throw new Error('Snowstorm: Unable to get targetElement "' + targetID + '"');
		}
	}
	if (!snowStorm.targetElement) {
		snowStorm.targetElement = (!snowStorm.internal.isIE ? (document.documentElement ? document.documentElement : document.body) : document.body);
	}
	if (snowStorm.targetElement !== document.documentElement && snowStorm.targetElement !== document.body) {
		snowStorm.resizeHandler = snowStorm.resizeHandlerAlt; // re-map handler to get element instead of screen dimensions
	}
	snowStorm.resizeHandler(); // get bounding box elements
	snowStorm.usePositionFixed = (snowStorm.usePositionFixed && !snowStorm.internal.noFixed); // whether or not position:fixed is supported
	snowStorm.internal.fixedForEverything = snowStorm.usePositionFixed;
	if (snowStorm.internal.screenX && snowStorm.internal.screenY && !snowStorm.disabled) {
		snowStorm.init();
		snowStorm.active = true;
	}
};

function doDelayedStart() {
	setTimeout(function() {
		snowStorm.start(true);
	}, 20);
	// event cleanup
	snowStorm.events.remove(snowStorm.internal.isIE ? document : window, 'mousemove', doDelayedStart);
}

function doStart() {
	if (!snowStorm.excludeMobile || !snowStorm.internal.isMobile) {
		if (snowStorm.freezeOnBlur) {
			snowStorm.events.add(snowStorm.internal.isIE ? document : window, 'mousemove', doDelayedStart);
		} else {
			doDelayedStart();
		}
	}
	// event cleanup
	snowStorm.events.remove(window, 'load', doStart);
}
 
// hooks for starting the snow
if (snowStorm.autoStart) {
	snowStorm.events.add(window, 'load', doStart, false);
}