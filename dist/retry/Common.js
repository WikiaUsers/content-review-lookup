importArticles({
    type: "script",
    articles: [
        "u:dev:Medals/code.js"
    ]
});


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
	flakesMax: 100,			// Limit total amount of snow made (falling + sticking)
	flakesMaxActive: 50,		// Limit amount of snow falling at once (less = lower CPU use)
	animationInterval: 20,		// Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
	excludeMobile: true,		// Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
	flakeBottom: null,		// Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
	followMouse: false,		// Snow movement can respond to the user's mouse
	snowColor: '#DC143C',		// Don't eat (or use?) yellow snow.
	snowCharacter: 'Merry Random Day!',
	snowStick: false,		// Whether or not snow should "stick" at the bottom. When off, will never collect.
	targetElement: document.body,	// element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
	useMeltEffect: true,		// When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
	useTwinkleEffect: false,	// Allow snow to randomly "flicker" in and out of view while falling
	usePositionFixed: true,		// true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported

	// --- less-used bits ---

	freezeOnBlur: true,		// Only snow when the window is in focus (foreground.) Saves CPU.
	flakeLeftOffset: 0,		// Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
	flakeRightOffset: 0,		// Right margin/gutter space on edge of container
	flakeWidth: 128,			// Max pixel width reserved for snow element
	flakeHeight: 16,			// Max pixel height reserved for snow element
	vMaxX: 1,			// Maximum X velocity range for snow
	vMaxY: 1,			// Maximum Y velocity range for snow
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
	this.o.style.fontFamily = 'arial,verdana,impact';
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





//////////////////////////////////////////////////////////////////////////////

// Christmas Light Smashfest
// Adapted from XLSF 2007 as originally used on http://schillmania.com/?theme=2007&christmas=1

function $(sID) {
  return document.getElementById(sID);
}

var Y = {
 // shortcuts
 A: YAHOO.util.Anim,
 D: YAHOO.util.Dom,
 E: YAHOO.util.Event,
 UE: YAHOO.util.Easing,
 CA: YAHOO.util.ColorAnim,
 BG: YAHOO.util.BgPosAnim
}

function XLSF(oTarget,urlBase) {
  var writeDebug = soundManager._wD;
  var urlBase = (urlBase?urlBase:'lights/');
  writeDebug('XLSF()');
  var IS_MOON_COMPUTER = false;
  var isIE = navigator.userAgent.match(/msie/i);
  var self = this;
  var xlsf = self;
  var animDuration = 1;
  this.oFrag = document.createDocumentFragment();
  this.oTarget = (oTarget?oTarget:document.documentElement);
  this.oExplosionBox = document.createElement('div');
  this.oExplosionBox.className = 'xlsf-fragment-box';
  this.oExplosionFrag = document.createElement('div');
  this.oExplosionFrag.className = 'xlsf-fragment';
  this.lights = [];
  this.lightClasses = {
    pico: 32,
    tiny: 50,
    small: 64,
    medium: 72,
    large: 96	
  }

  if (window.innerWidth || window.innerHeight) {
    var screenX = window.innerWidth; // -(!isIE?24:2);
    var screenY = window.innerHeight;
  } else {
    var screenX = (document.documentElement.clientWidth||document.body.clientWidth||document.body.scrollWidth); // -(!isIE?8:0);
    var screenY = (document.documentElement.clientHeight||document.body.clientHeight||document.body.scrollHeight);
  }

  this.lightClass = (screenX>1800?'small':'pico'); // kind of light to show (32px to 96px square)

  if (window.location.href.match(/size=/i)) {
    this.lightClass = window.location.href.substr(window.location.href.indexOf('size=')+5);
  }

  this.lightXY = this.lightClasses[this.lightClass]; // shortcut to w/h

  this.lightGroups = {
    left: [],
    top: [],
    right: [],
    bottom: []
  }
  this.lightSmashCounter = 0;
  this.lightIndex = 0;
  this.lightInterval = 500;
  this.timer = null;
  this.bgBaseX = 0;
  this.bgBaseY = 0;
  this.soundIDs = 0;
  this.soundPan = {
    panValue: 75,
    left: 0,
    mid: 481,
    right: 962
  }

  this.cover = document.createElement('div');
  this.cover.className = 'xlsf-cover';
  document.documentElement.appendChild(this.cover);

  this.initSounds = function() {
	for (var i=0; i<6; i++) {
	  soundManager.createSound({
	    id: 'smash'+i,
	    url: urlBase+'sound/glass'+i+'.mp3',
	    autoLoad: true,
	    multiShot: true,
		volume:50
	  });
	}
    self.initSounds = function() {} // safety net
  }

  this.appendLights = function() {
	writeDebug('xlsf.appendLights()');
    self.oTarget.appendChild(self.oFrag);
    self.oFrag = document.createDocumentFragment();
  }

  function ExplosionFragment(nType,sClass,x,y,vX,vY) {
    var self = this;
    this.o = xlsf.oExplosionFrag.cloneNode(true);
    this.nType = nType;
    this.sClass = sClass;
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.bgBaseX = 0;
    this.bgBaseY = this.h*this.nType;
    this.vX = vX*(1.5+Math.random());
    this.vY = vY*(1.5+Math.random());
    this.oA = null;
    this.oA2 = null;
    this.burstPhase = 1; // starting background offset point
    this.burstPhases = 4; // 1+offset (ignore large size)
    this.o.style.backgroundPosition = ((this.w*-this.burstPhase)+'px '+(this.h*-nType)+'px');

    // boundary checks
    if (self.sClass == 'left') {
      this.vX = Math.abs(this.vX);
    } else if (self.sClass == 'right') {
      this.vX = Math.abs(this.vX)*-1;
    }

    this.burstTween = function() {
      // determine frame to show
      var phase = 1+Math.floor((this.currentFrame/this.totalFrames)*self.burstPhases);
      if (phase != self.burstPhase) {
        self.burstPhase = phase;
        self.o.style.backgroundPosition = ((self.w*-self.burstPhase)+'px '+(self.h*-nType)+'px');
      }
    }

    this.burst = function() {
      self.oA = new Y.A(self.o,{marginLeft:{to:(self.vX*8)},marginTop:{to:(self.vY*8)}},animDuration,Y.UE.easeOutStrong);
      self.oA.onTween.subscribe(self.burstTween);
      self.oA.animate();
    }

    this.hide = function() {
      if (!isIE) self.o.style.opacity = 0;
    }

    this.reset = function() {
      self.o.style.left = '0px';
      self.o.style.top = '0px';
      self.o.style.marginLeft = '0px';
      self.o.style.marginTop = '0px';
      if (!isIE) self.o.style.opacity = 1;
    }

    this.animate = function() {
      self.reset();
      self.burst();
    }

  }

  function Explosion(nType,sClass,x,y) {
    var oParent = this;
    var self = this;
    this.o = null;
    this.nType = nType;
    this.sClass = sClass;
    this.x = x;
    this.y = y;
    this.boxVX = 0;
    this.boxVY = 0;
    this.o = xlsf.oExplosionBox.cloneNode(true);
    this.o.style.left = x+'px';
    this.o.style.top = y+'px';
    this.fragments = [];

    var mX = x;
    var mY = y;

    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,-5,-5));
    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,0,-5));
    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,5,-5));

    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,-5,0));
    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,0,0));
    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,5,0));

    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,5,-5));
    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,5,0));
    this.fragments.push(new ExplosionFragment(nType,sClass,mX,mY,5,5));

    this.init = function() {
      for (var i=self.fragments.length; i--;) {
        self.o.appendChild(self.fragments[i].o);
      }
      if (!IS_MOON_COMPUTER) {
        // faster rendering, particles get cropped
        xlsf.oFrag.appendChild(self.o);
      } else {
        // slower rendering, can overlay body
        xlsf.oFrag.appendChild(self.o);
      }
    }

    this.reset = function() {
      // clean-up
      // self.o.parentNode.removeChild(self.o);
      self.o.style.display = 'none';
      self.o.style.marginLeft = '0px';
      self.o.style.marginTop = '0px';
      self.o.style.left = self.x+'px';
      self.o.style.top = self.y+'px';
      if (!isIE) self.o.style.opacity = 1;
      for (var i=self.fragments.length; i--;) {
        self.fragments[i].reset();
      }
    }

    this.trigger = function(boxVX,boxVY) {
      self.o.style.display = 'block';
      self.boxVX = boxVX;
      self.boxVY = boxVY;
      // boundary checks
      if (self.sClass == 'right') {
        self.boxVX = Math.abs(self.boxVX)*-1;
      } else if (self.sClass == 'left') {
        self.boxVX = Math.abs(self.boxVX);
      }
      for (var i=self.fragments.length; i--;) {
        self.fragments[i].animate();
      }
      if (!isIE && (IS_MOON_COMPUTER)) {
        var oAExplode = new Y.A(self.o,{marginLeft:{to:100*self.boxVX},marginTop:{to:150*self.boxVY},opacity:{to:0.01}},animDuration,Y.UE.easeInStrong);
      } else {
        // even IE 7 sucks w/alpha-transparent PNG + CSS opacity. Boo urns.
        var oAExplode = new Y.A(self.o,{marginLeft:{to:100*self.boxVX},marginTop:{to:150*self.boxVY}},animDuration,Y.UE.easeInStrong);
      }
      oAExplode.onComplete.subscribe(self.reset);
      oAExplode.animate();
    }

    this.init();

  }

  function Light(sSizeClass,sClass,nType,x,y) {
    var self = this;
    this.o = document.createElement('div');
    this.sClass = sClass;
    this.sSizeClass = sSizeClass;
    this.nType = (nType||0);
    this.useY = (sClass == 'left' || sClass == 'right');
    this.state = null;
    this.broken = 0;
    this.w = xlsf.lightClasses[sSizeClass];
    this.h = xlsf.lightClasses[sSizeClass];
    this.x = x;
    this.y = y;
    this.bg = urlBase+'image/bulbs-'+this.w+'x'+this.h+'-'+this.sClass+'.png';
    this.o.style.width = this.w+'px';
    this.o.style.height = this.h+'px';
    this.o.style.background = 'url('+this.bg+') no-repeat 0px 0px';
    this.bgBaseX = (self.useY?-self.w*this.nType:0);
    this.bgBaseY = (!self.useY?-self.h*this.nType:0);
    this.glassType = parseInt(Math.random()*6);
    this.oExplosion = null;
    this.soundID = 'smash'+this.glassType;
    var panValue = xlsf.soundPan.panValue; // eg. +/- 80%
    this.pan = parseInt(this.x<=xlsf.soundPan.mid?-panValue+((this.x/xlsf.soundPan.mid)*panValue):(this.x-xlsf.soundPan.mid)/(xlsf.soundPan.right-xlsf.soundPan.mid)*panValue);

    this.initSound = function() {
    }

    this.setBGPos = function(x,y) {
      self.o.style.backgroundPosition = ((self.bgBaseX+x)+'px '+(self.bgBaseY+y)+'px');
    }

    this.setLight = function(bOn) {
      if (self.broken || self.state == bOn) return false;
      if (!self.w || !self.h) self.getDimensions();
      self.state = bOn;
      if (self.useY) {
        self.setBGPos(0,-this.h*(bOn?0:1));
      } else {
        self.setBGPos(-this.w*(bOn?0:1),0);
      }
    }

    this.getDimensions = function() {
      self.w = self.o.offsetWidth;
      self.h = self.o.offsetHeight;
      self.bgBaseX = (self.useY?-self.w*self.nType:0);
      self.bgBaseY = (!self.useY?-self.h*self.nType:0);
    }

    this.on = function() {
      self.setLight(1);
    }

    this.off = function() {
      self.setLight(0);
    }

    this.flickr = function() {
      self.setLight(Math.random()>=0.5?1:0);
    }

    this.toggle = function() {
      self.setLight(!self.state?1:0);
    }

    this.explode = function(e) {
      self.oExplosion.trigger(0,1); // boooom!
    }

    this.smash = function(e) {
      if (self.broken) return false;
      self.broken = true;
      if (soundManager && soundManager.ok()) {
        soundManager.play(self.soundID,{pan:self.pan});
        // soundManager.sounds[self.soundID].play({pan:self.pan});
        // if (self.bonusSound != null) window.setTimeout(self.smashBonus,1000);
      }
      self.explode(e);
      var rndFrame = 2; // +parseInt(Math.random()*3);
      if (self.useY) {
        self.setBGPos(0,self.h*-rndFrame);
      } else {
        self.setBGPos(self.w*-rndFrame,0);
      }
      xlsf.lightSmashCounter++;
    }

    this.smashBonus = function() {
      // soundManager.play(self.bonusSounds[self.bonusSound],urlBase+'sound/'+self.bonusSounds[self.bonusSound]+'.mp3');
    }

    this.reset = function() {
      if (!self.broken) return false;
      self.broken = false;
      self.state = null;
      xlsf.lightSmashCounter--;
      self.flickr();
    }

    this.init = function() {
      self.o.className = 'xlsf-light '+this.sizeClass+' '+this.sClass;
      self.o.style.left = self.x+'px';
      self.o.style.top = self.y+'px';
      self.o.style.width = self.w+'px';
      self.o.style.height = self.h+'px';
      self.o.onmouseover = self.smash;
      self.o.onclick = self.smash;
      self.flickr();
      xlsf.oFrag.appendChild(self.o);
      self.oExplosion = new Explosion(self.nType,self.sClass,self.x,self.y);
    }

    this.init();
    
  } // Light()

  this.createLight = function(sClass,nType,x,y) {
    var oLight = new Light(self.lightClass,sClass,nType,x,y);
    self.lightGroups[sClass].push(oLight);
    self.lights.push(oLight);
    return oLight;
  }

  this.rotateLights = function() {
    self.lights[self.lightIndex==self.lights.length?self.lights.length-1:self.lightIndex].off();
    self.lightIndex++;
    if (self.lightIndex == self.lights.length) {
      self.lightIndex = 0;
    }
    self.lights[self.lightIndex].on();
  }

  this.randomLights = function() {
    self.lights[parseInt(Math.random()*self.lights.length)].toggle();
  }

  
  this.destroyLights = function() {
    self.startSequence(self.destroyLight,20);
  }

  this.destroyLight = function() {
    var groupSize = 2; // # to smash at a time
    if (self.lightSmashCounter<self.lights.length) {
      var limit = Math.min(self.lightSmashCounter+groupSize,self.lights.length);
      for (var i=self.lightSmashCounter; i<limit; i++) {
        self.lights[self.lightSmashCounter].smash();
      }
    } else {
      self.stopSequence();
    }

  }

  this.uberSmash = function() {
    // make everything explode - including your CPU.
    self.stopSequence();
    var ebCN = Y.D.getElementsByClassName;
  }

  this.smashGroup = function(oGroup) {
    for (var i=oGroup.length; i--;) {
      oGroup[i].smash();
    }
  }

  this.startSequence = function(fSequence,nInterval) {
    if (self.timer) self.stopSequence();
    self.timer = window.setInterval(fSequence,(typeof nInterval != 'undefined'?nInterval:self.lightInterval));
  }

  this.stopSequence = function() {
    if (self.timer) {
      window.clearInterval(self.timer);
      self.timer = null;
    }
  }

  var i=0;
  var j=0;

  $('lights').style.display = 'block';

  // start lights to the right of <h1>
  var offset = 0; // parseInt(document.getElementsByTagName('h1')[0].offsetWidth)+16;

  var jMax = Math.floor((screenX-offset-16)/self.lightXY);
  var iMax = Math.floor((screenY-offset-16)/self.lightXY);

  for (j=0; j<jMax; j++) {
    this.createLight('top',parseInt(j/3)%4,offset+j*self.lightXY,0);
  }

  this.appendLights();
  this.startSequence(self.randomLights);
  
}

var xlsf = null;
var urlBase = null;

function smashInit() {
  if (navigator.userAgent.match(/msie 6/i)) {
    return false;
  }
  xlsf = new XLSF(document.getElementById('lights'),urlBase?urlBase:null);
  if ($('loading')) {
    $('loading').style.display = 'none';	
  }
  xlsf.initSounds();
}

soundManager.setup({
  flashVersion: 9,
  preferFlash: false,
  url: 'lights/',
  onready: function() {
    smashInit();
  },
  ontimeout: function() {
    smashInit();
  }
});