/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
// Start Javascript Libraries
// **************************************************
+function(a,b,c,d){function e(a){var b=a[p],c=typeof b,e=c==m;if(g(b)?(u=b,t=q,e=r):c==l&&v.push(b),e)return e;try{a[p]=d}catch(f){}try{delete a[p],a[p]=d}catch(f){}}function f(){t=q;var a=0,b=v;for(v=[];a<b.length;a++)try{b[a]()}catch(c){}}function g(a){try{if(a&&((a.name||a.displayName||"").toString().toLowerCase()==o||k!=typeof a.$$&&k!=typeof a.addStyle&&k!=typeof a.addScript))return q}catch(b){}return r}function h(){return t}function i(a){var b=typeof a,c=b==l,d=a===!0;if(c||"object"==b||d)if(d||g(a))f();else if(c)if(t)try{a()}catch(e){}else v.push(a)}function j(){return u=u||a[n]||b[n],!t&&!u&&z++<50?setTimeout(j,20):void f()}var k="undefined",l="function",m="boolean",n="wikiMod",o="wikimod",p="onWikiModReady",q=!0,r=!1,s=c.defineProperty,t=r,u,v=[],w,x,y=0,z=0;if(x=e(a)?a:d,x=e(b)?b:x,x&&typeof x[p]==m&&v.length){var A=v;for(v=[];y<A.length;y++)try{x[p]=A[y]}catch(B){}try{if(x[p]=f,x[p]!==f&&typeof x[p]==m)return j()}catch(B){}}if(!x){w={get:h,set:i,enumerable:q,configurable:r};try{s(a,p,w),k==typeof b[p]&&s(b,p,w)}catch(B){}}j()}(this,window,Object);

// importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

// **************************************************
// End Javascript Libraries
// **************************************************


// Read a page's GET URL variables and return them as an associative array. - jgjake2
function getUrlVars() {
    var vars = [],
        hash,
		hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'),
		i = 0;
    for ( ; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getCookie(c_name) {
    var i = 0, x, y, ARRcookies = document.cookie.split(";");
    for ( ; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function checkCookie(cookieName, cookieVal) {
    if (getCookie(cookieName) == cookieVal) return true;
    else return false;
}

window.JSExtensionConfig = window.JSExtensionConfig || {};
(function(){
	var debugUsers = ['jgjake2'], diURLVars = getUrlVars(), tmpjsextcfg;
	if(diURLVars && diURLVars.jsextcfg && typeof window.wgUserName == "string" && debugUsers.indexOf(window.wgUserName.toLowerCase()) > -1){
		try {
				tmpjsextcfg = JSON.parse(unescape(diURLVars.jsextcfg)) || {};
				if(tmpjsextcfg.wikiMod) tmpjsextcfg.wikiMod = {}; // URL config of wikiMod not allowed
				$.extend(true, window.JSExtensionConfig, tmpjsextcfg);
		} catch(e){}
	}
})();
function JSExtensionLoader(e){var s,i,t,n,o=null,r=(window.JSExtensionConfig||{}).debug||!1,l=function(e){return e.constructor===(new Array).constructor},a=function(s){if(s&&e.validVersions){if(e.validVersions instanceof RegExp)return e.validVersions.test(s);if("object"==typeof e.validVersions&&l(e.validVersions))return e.validVersions.indexOf(s)>-1}return!1},c=/(?=\.js$)/i,d=function(e,s,i,t){if(i&&t)try{var n=e.split(t||c);n&&n.length>1&&(e=[n[0],"-",escape(i),n[1]].join(""))}catch(o){}r&&console.log("Loading Script: ",e,s,i),importScriptPage(e,s||"deadisland")},f=function(e,s,i,t){if(i&&t)try{var n=e.split(t||c);n&&n.length>1&&(e=[n[0],"-",escape(i),n[1]].join(""))}catch(o){}r&&console.log("Loading Stylesheet: ",e,s,i),importStylesheetPage(e,s||"deadisland")};try{n=(window.JSExtensionConfig||{})[e.name]||{}}catch(p){}if(n.disable)return void(r&&console.log("Script Disabled: ",e.name));if(n.loaded)return void(r&&console.log("Script Already Loaded: ",e.name));if(e.skins&&window.skin)try{var u=window.skin.toString().toLowerCase();if("string"==typeof e.skins){if("*"!==e.skins&&-1==e.skins.indexOf(u))return}else if("object"==typeof e.skins&&l(e.skins)){if(-1==e.skins.indexOf(u))return}else if(e.skins instanceof RegExp&&!e.skins.test(u))return}catch(p){console.log("JSExtensionLoader skin test",p)}if(!e.validVersions&&(n.version||n.jsVersion||n.cssVersion)?console.log("Version Validation not set! ",e.name):o=n.version&&a(n.version)?n.version:null,e.script&&!n.jsDisable)if(i=n.jsVersion&&a(n.jsVersion)?n.jsVersion:o,l(e.script))for(s=0;s<e.script.length;s++)d(e.script[s].url,e.script[s].wikiName,i,e.script[s].versionPattern);else"object"==typeof e.script&&e.script.url&&d(e.script.url,e.script.wikiName,i,e.script.versionPattern);if(e.stylesheet&&!n.cssDisable)if(t=n.cssVersion&&a(n.cssVersion)?n.cssVersion:o,l(e.stylesheet))for(s=0;s<e.stylesheet.length;s++)f(e.stylesheet[s].url,e.stylesheet[s].wikiName,t,e.stylesheet[s].versionPattern);else"object"==typeof e.stylesheet&&e.stylesheet.url&&f(e.stylesheet.url,e.stylesheet.wikiName,t,e.stylesheet.versionPattern);n.loaded=!0}


// **************************************************
// wikiMod Dependant Scripts
// **************************************************


/* Tab View Edit Buttons Loader
JSExtensionLoader({
	name: 'TabViewEditButtons',
	skins: '*',
	validVersions: /(?:beta)/i,
	script: [
		{
			url: 'User:Jgjake2/js/TabView_Edit_Buttons.js',
			wikiName: 'deadisland',
			versionPattern: /(?=\.js$)/
		}
	]
});
*/

// SteamBox Config
window.SteamAPI_Config = {
	games: [
			{
				name: "Dead Island",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/91310/62632a275a4cc08f0238ed3d589ce1d8627fde91.jpg",
				appid: "91310"
			},
			{
				name: "Dead Island 2",
				image: "http://cdn.akamai.steamstatic.com/steam/apps/268150/capsule_184x69.jpg",
				appid: "268150"
			},
			{
				name: "Dead Island Riptide",
				image: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/216250/3b62996c558973a9debf26afee64fe3eadf09ef5.jpg",
				appid: "216250"
			},
			{
				name: "Dead Island: Epidemic",
				image: "http://cdn.akamai.steamstatic.com/steam/apps/222900/capsule_184x69.jpg",
				appid: "222900"
			},
			{
				name: "Escape Dead Island",
				image: "http://cdn.akamai.steamstatic.com/steam/apps/226560/capsule_184x69.jpg",
				appid: "226560"
			}
		],
		cache: {
			UserGameStatsMaxTime: 20, // Minutes
			ProfileInfoMaxTime: 10, // Minutes
			ProfileSummaryMaxTime: 5 // Minutes
		},
		UI: {
			UserInfoFadeInDelay: 50, // Milliseconds
			UserInfoFadeInTime: 800
		}
};

/* SteamBox Loader
JSExtensionLoader({
	name: 'SteamUserInfo',
	skins: '*',
	validVersions: /(?:beta)/i,
	script: [
		{
			url: 'User:Jgjake2/js/SteamUserInfo.js',
			wikiName: 'deadisland',
			versionPattern: /(?=\.js$)/
		}
	],
	stylesheet: [
		{
			url: 'User:Jgjake2/css/SteamUserInfo.css',
			wikiName: 'deadisland',
			versionPattern: /(?=\.css$)/
		}
	]
});
*/

//if(!disableJSON.jseditcount){
//	importScriptPage('User:Jgjake2/js/jsEditCount.js', 'deadisland');
//}

// **************************************************
// End wikiMod Dependant Scripts
// **************************************************

// **************************************************
// Insert Non-Time Critical Scripts Below Here...
// **************************************************

// Add Popup Script
// importScriptPage('User:Jgjake2/js/Popups.js', 'deadisland');

/* import script for auto-refresh recent changes */
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

// Add Syntax Highlighting
// importScriptPage('User:Jgjake2/js/SyntaxHighlight.js', 'deadisland');

// Change Page Name
// importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//
// If the date is in the format "x|January 01 2007 00:00:00 PST", then the timer is periodic with period x seconds using the given date as the starting time.
function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // reduce modulo period if necessary
    if (timers[i].period > 0) {
        if (diff < 0) diff = timers[i].period - ((-diff) % timers[i].period);
        else diff = diff % timers[i].period;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = '';
    } else {
        var tpm = '';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate');
    timeouts = []; // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        var str = timers[i].firstChild.nodeValue;
        var j = str.indexOf('|');
        if (j == -1) timers[i].period = 0;
        else {
            timers[i].period = parseInt(str.substr(0, j));
            if (isNaN(timers[i].period) || timers[i].period < 0) timers[i].period = 0;
            str = str.substr(j + 1);
        }
        timers[i].eventdate = new Date(str);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Taken from Wikipedia's Common.js.
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.rows;

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "3.5em";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}

addOnloadHook(createCollapseButtons);

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Taken from Wikipedia's Common.js.
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
        var NavChild = NavFrame.firstChild;
        NavChild !== null;
        NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

        // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
        var NavChild = NavFrame.firstChild;
        NavChild !== null;
        NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (
    var i = 0;
    NavFrame = divs[i];
    i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            for (
            var NavChild = NavFrame.firstChild;
            NavChild !== null;
            NavChild = NavChild.nextSibling) {
                if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                    if (NavChild.style.display == 'none') {
                        NavToggleText = document.createTextNode(NavigationBarShow);
                        break;
                    }
                }
            }

            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for (
            var j = 0;
            j < NavFrame.childNodes.length;
            j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook(createNavigationBarToggleButton);