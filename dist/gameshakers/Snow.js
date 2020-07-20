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
 
	autoStart: true,		// Whether the snow should start automatically or not.
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