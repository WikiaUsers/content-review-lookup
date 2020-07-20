/* Any JavaScript here will be loaded for all users on every page load. */

// TwitchFeed
importScriptPage('TwitchStuff/FeedListGenerator.js', 'dev');

// Move Edit and Talk buttons. By User:Somewhatparanoid
/*$( document ).ready(function() {
    // Move the edit button
    $(".wikia-page-header > nav.wikia-menu-button:has(#ca-edit)").detach().appendTo(".header-title").css({'top': '3px', 'display': 'inline-block'});
 
    // Move the talk button
    $("a.wikia-button.comments.secondary").detach().appendTo(".header-title").css({'margin-top': '6px', 'margin-left': '5px', 'display': 'inline-block'});
}); */

//Daily Challenge Countdown

function startTime() {
    // Get system's time and reverse it to make it a countdown instead of clock
    var today=new Date();
    var h=today.getUTCHours();
    var m=today.getUTCMinutes();
    var sec=today.getUTCSeconds();
    var s1=(sec!=00)?60-sec:sec;
    var m1=(m!=00)?60-m:m;
    var h1=(24 - (h+1));

    // Call function to add a zero in front of numbers<10
    // Concat result together
    h1=checkTime(h1);
    m1=checkTime(m1);
    s1=checkTime(s1);
    result = h1 + ":" + m1 + ":" + s1;

    // Edit innerHTML
    document.getElementById("countdown").innerHTML = "<span>Next Daily<br>&nbsp;&nbsp;&nbsp;Run in:</span><em>" + result + "</em>";
t=setTimeout('startTime()',500);
}

// Function that adds a 0 in front of numbers if less than 10
function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}

// Start up timer after window has loaded
// Doesn't work on outdated browsers
if(window.addEventListener){
    window.addEventListener('load',createClock,false); //W3C
}
else{
    window.attachEvent('onload',createClock); //IE
}


// Check if WikiaPageHeader exist for that page
// Pages such as user: doesn't contain it
function createClock() {
    var wph = document.getElementById('WikiaPageHeader');
    if ( wph != null ) {

        //Create Div, set style, and append to code. 
        var countdownDisplay = document.createElement("div");
        countdownDisplay.id = "countdown";
        countdownDisplay.className = "tally";
        countdownDisplay.style.right = "110px"; 
        countdownDisplay.style.top = "8px";

        document.getElementById('WikiaPageHeader').appendChild(countdownDisplay);

        startTime();
    }
}

//End of Daily Challenge

// this creates the bar at the top of the wiki with the effect toggle
var shotSwitch = document.createElement("INPUT");
shotSwitch.setAttribute("type", "checkbox");
shotSwitch.setAttribute("id", "shotSwitch");

var newlabel = document.createElement("Label");
newlabel.setAttribute("for", shotSwitch.id);
newlabel.innerHTML = "Enable Screenshake/Sounds";


document.getElementsByClassName('nav')[0].appendChild(shotSwitch);
document.getElementsByClassName('nav')[0].appendChild(newlabel);

var shootAble = true;

function loadShootAble() {
    if (getCookie('shootEnabled') == 'false') {
        shotSwitch.checked = false;
        shootAble = false;
    } else {
        shotSwitch.checked = true;
        shotSwitch.checked = "checked";
        shootAble = true;
    }
}

loadShootAble();


shotSwitch.onclick = function() {
    shootAble = shotSwitch.checked;
    setCookie('shootEnabled', shotSwitch.checked);
}

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


// this is the screenshaker :D

var shakeAmount = 0;

setInterval(update, 10);


function update() {
    if (shakeAmount > 0) {
        shakeAmount -= 10;
    } else {
        shakeAmount = 0;
    }


    var shakeDiv = document.getElementById('WikiaPage');
    var xOff = Math.random() * shakeAmount - shakeAmount * 0.5;
    var yOff = Math.random() * shakeAmount - shakeAmount * 0.5;
    shakeDiv.style.left = xOff + "px";
    shakeDiv.style.top = yOff + "px";
}

// Utillity for event handling with different browsers
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getEvent: function(event) {
        return event || window.event;
    },

    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents*", "2.0")) {
            return event.button;
        }
        switch (event.button) {
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;
            case 2:
            case 6:
                return 2;
            case 4:
                return 1;
        }
    }
};

// Detect webbrowser
navigator.sayswho = (function() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    return M.join(' ');
})();

// gun shot epicness
var gunSound = new Audio('https://images.wikia.nocookie.net/nuclear-throne/images/0/0b/SndPistol.ogg');
var airHorn = new Audio('https://images.wikia.nocookie.net/nuclear-throne/images/4/4c/Airhorn.ogg');

// load a wav for Safari
if (navigator.sayswho.match("Safari") !== null) {
    gunSound = new Audio('http://puu.sh/8cQCE.wav'); //TODO: find a better host
    airHorn = new Audio('http://puu.sh/8dhYc.wav'); //TODO: find a better host
}

var shootEvent = function() {
    if (shootAble) {
        shakeAmount = 40;
        gunSound.volume = 0.01;
        gunSound.pause();
        gunSound.currentTime = 0;
        gunSound.play();
    }
}

//

var keyPressed = function(event) {
    if (event.keyCode === 66 && shootAble) {
        shakeAmount = 40;
        airHorn.volume = 0.50;
        airHorn.pause();
        airHorn.currentTime = 0;
        airHorn.play();
    }
    EasterEggs.handleInput(event.keyCode);
}

EventUtil.addHandler(document.body, "mousedown", shootEvent);
EventUtil.addHandler(document.body, "keydown", keyPressed);

/*jshint smarttabs:true jquery:true browser:true bitwise:false laxbreak:true */
/*global mediaWiki */
 
// ES5 requires Date.parse to support this, ES3 doesn't (i.e. IE8 chokes on it)
Date.parseISO8601 = function(text) {
	"use strict";
	// Decode MediaWiki ISO8601 Strict date and convert it to milliseconds
	// This regex only supports basic dates that MediaWiki produces, it isn't comprehensive.
	// It also doesn't support non UTC Timezones, I'm pretty sure MW never curveballs us
	// like that though so it should be fine.
	var when = (/^(\d{4})-?(\d\d)-?(\d\d)[T\s](\d\d):?(\d\d):?(\d\d)(?:\.?(\d+))?(?:Z|\+00(?::?00)?)$/).exec(text);
	if (!when) {
		return NaN;
	}
	return +new Date(when[1], when[2] - 1, when[3], when[4], when[5], when[6], ('.' + when[7]) * 1000 | 0);
};
 
/**
 * UserTags Loader script
 *
 * UserTags is quite large and complex which means that the page weight is too much to bear
 * on every page load since most pages ARE NOT user pages. This mini-script decides whether
 * or not the current page is a user page then loads the full UserTags script only on those
 * pages. This drastically reduces the weight since this is far lighter so represents a
 * more acceptable every-page cost.
 */
(function(window, $, mw, config) {
"use strict";
 
// Core logic, detect user page and determine the skin and user names
var loaderData = (function($, mw) {
	//
	// Figure out what skin we're on.
	//
	var siteSkin = mw.config.get('skin');
	if (({oasis:1, wikia:1})[siteSkin] === 1) {
		siteSkin = 'oasis';
	} else if (({wowwiki:1, uncyclopedia:1, monobook:1, vector:1})[siteSkin] === 1) {
		siteSkin = 'monobook';
	} else {
		if (window.console) {
			window.console.log('USERTAGS(Loader): Unsupported skin:', siteSkin);
		}
		return;
	}
 
	//
	// Grab the username (complicated) and decide if we are going to run or not.
	// NOTE: We could use mw.Title for this but it must be loaded using
	//	mw.loader.using('mediaWiki.Title') first and doesn't really give us the right tools.
	//
	var username = mw.config.get('wgTitle'),
	    namespace = mw.config.get('wgNamespaceNumber') | 0;
 
	if (siteSkin === 'oasis') {
		// We need to figure out if we're on a user page or not without a DOM query
		// since we want to launch the AJAX ASAP without waiting for the DOM.
		if (({'-1':1, 2:1, 3:1, 500:1, 1200:1})[namespace] !== 1) {
			return;
		}
 
		// No masthead on edit pages
		// Message Walls are always in edit mode
		if (mw.config.get('wgAction') === 'edit' && namespace !== 1200) {
			return;
		}
 
		// MediaWiki disallows names from containing forward slashes which is very
		// useful since we need to check for subpages and forward slashes are the
		// only real way to do it.
		// (Subpages are lacking the masthead)
		if (({1200:1, 500:1, 2:1, 3:1})[namespace] === 1 && username.indexOf('/') !== -1) {
			return;
		}
 
		// Special pages need special handling...
		if (namespace === -1) {
			username = null;
			namespace = mw.config.get('wgCanonicalSpecialPageName');
			if (namespace === 'Contributions') {
				// wgPageName/wgTitle does not include the username, we need to pull
				// it directly from the window location.
				username = window.location.pathname;
 
				// Special:Contributions is dumb, here are the URL possibilities:
				// Special:Contributions = You
				// Special:Contributions/ = You
				// Special:Contributions/Username = Username
				// index.php?title=Special:Contributions = You
				// index.php?title=Special:Contributions&target= = You
				// index.php?title=Special:Contributions&target=Username = Username
				// Special:Contributions?target=Username = Username (*sigh*)
				// Special:Contributions/Username?target=OtherUser = OtherUser (*facepalm*)
 
				// Find /Username
				namespace = window.decodeURIComponent(username.substr(username.lastIndexOf('/') + 1));
				// No user name, it displays self
				namespace = (namespace !== mw.config.get('wgPageName') && namespace);
 
				// Find ?target=Username
				username = (/(?:^\?|&)target=([^&]*)/).exec(window.location.search);
				// If target is missing or has an empty string then it displays self
				username = (username && window.decodeURIComponent(username[1]));
 
				// Target param overrides the slash param
				username = username || namespace;
 
				// Canonicalise back to space instead of underscores
				username = (username && username.replace(/_/g, ' '));
			} else if (namespace !== 'Following') { // Following is self only
				return; // Some other special page.
			}
			// If the username is blank then they show self.
			username = username || mw.config.get('wgUserName');
		}
	} else {
		// User, User Talk, Message Wall
		if (({2:1, 3:1, 1200:1})[namespace] !== 1) {
			return;
		}
 
		// If we're on a subpage, drop the subpage part
		username = username.match(/^[^\/]+/)[0];
	}
	// NOTE: We only get here if this IS a compatible user page
 
	return {
		skin: siteSkin,
		user: username
	};
})($, mw);
 
// Make sure the config exists and is usable
config = ($.isPlainObject(config) && config) || {};
 
// If it's a user page then we need to expose our data to the core
if (loaderData) {
	window.UserTagsJS = config;
	config.loader = loaderData;
 
	// Debugging hook for debugging arbitrary Wikis without having to modify
	// MediaWiki:Common.js to enable debug mode.
	if ((/(?:^\?|&)debugusertags=1(?:&|$)/i).test(window.location.search)) {
		config.debug = true;
	}
 
	// Default module configuration when one is not provided.
	// TODO: Maybe I should just force this always using $.extend()?
	//	[i.e. optout by false to disable instead of optin]
	config.modules = ($.isPlainObject(config.modules) && config.modules) || {};
	if ($.isEmptyObject(config.modules)) {
		config.modules = {
			inactive: true, // Internal defaults
			newuser: true, // Internal defaults
			autoconfirmed: true,
			mwGroups: true, // Internal defaults
			metafilter: {
                                autoconfirmed: ['authenticated', 'bureaucrat', 'sysop'],
                                rollback: ['user', 'bureaucrat', 'sysop'],
				founder: ['authenticated', 'bureaucrat'],
				chatmoderator: ['sysop','bureaucrat','rollback']
			}
		};
	}
	// Force load the blocking modules unless they are manually disabled
	// (Manual disable means manually set to false/0/etc instead of just being undefined)
	config.modules.stopblocked = config.modules.stopblocked
		|| config.modules.stopblocked === void 0;
	// Only Monobook needs this, OasisTagsModule can scrape the blocked state from
	// the DOM instead.
	config.modules.isblocked = config.modules.isblocked
		|| (config.modules.isblocked === void 0 && loaderData.skin === 'monobook');
	// Force the i18n module to load
	config.modules.i18n = true;
}
 
// Dependency computations for loading modules
var importList = (function(config, alwaysOnly) {
	// These are core modules that have irregular features so need special handling
	// Most modules fit the "module.NAME.js" pattern
	var moduleMap = {
		explode: { s: 'w:dev:UserTags/module.implode.js' },
		prefLanguages: { s: 'w:dev:UserTags/module.prefLanguages.js', always: true }
	};
	moduleMap.prefCoding = moduleMap.prefLanguages;
 
	// Look for external module requests
	// NOTE: Disabled. Needs a design review for if this is the way I want to go or not.
	/*if ($.isArray(config.externals)) {
		data = config.externals;
		for (var i = 0, len = data.length ; i < len ; ++i) {
			module = data[i] + '';
			if (alwaysOnly) {
				if (module.substr(0, 5) !== 'meta.') {
					continue;
				}
			}
			module = 'w:dev:UserTags/' + module + '.js';
			if (hash[module] !== 1) {
				hash[module] = 1;
				list[list.length] = module;
			}
		}
	}*/
 
	// Check all the modules for matches in the above list.
	// Hash ensures that each one will only be imported once.
	/*jshint forin:true */
	var list = [], hash = {}, exts = config.extensions || {}, script, data, module;
	for (module in config.modules) {
		// Skip already loaded
		if (exts[module] !== void 0) { continue; }
 
		if (moduleMap.hasOwnProperty(module)) {
			data = moduleMap[module];
			if (alwaysOnly && !data.always) {
				continue;
			}
			script = data.s;
		} else if (!alwaysOnly) {
			// Attempt to load the module by name from the Dev page
			script = 'w:dev:UserTags/module.' + module + '.js';
		} else {
			continue;
		}
		if (hash[script] !== 1) {
			hash[script] = 1;
			list[list.length] = script;
		}
	}
	/*jshint forin:false */
 
	// Improve caching by ensuring list always has the same order
	list.sort();
 
	// Core script (must always be last, obviously)
	if (!alwaysOnly) {
		list[list.length] = 'w:dev:UserTags/core.js';
	}
	return list;
})(config, !loaderData);
 
// If we aren't going to load anything then we're done.
if (!importList.length) {
	// Tidy up to reduce memory usage
	window.UserTagsJS = null; // IE8 won't let you delete stuff from the window
	try { delete window.UserTagsJS; } catch(e) { /* IE8 throws just to increase it's crapness */ }
	return;
}
// If we are going to load modules despite not being on a user page then we
// need to honor the module contract by ensuring the global exists and has
// the extensions member. Everything else is unnecessary.
if (!loaderData) {
	window.UserTagsJS = config = {};
}
config.extensions = ($.isPlainObject(config.extensions) && config.extensions) || {};
 
// Do the actual load. We also need to load the core script's dependencies from
// ResourceLoader as well.
var coreDeps = ['mediawiki.util'];
mw.loader.load(coreDeps, null, true);
if (config.debug !== 'noload') {
	mw.loader.using(coreDeps, function() {
		window.importArticles({ type:'script', articles: importList });
	});
} else {
	config.imports = importList;
}
 
// Done.
})(window, jQuery, mediaWiki, window.UserTagsJS);