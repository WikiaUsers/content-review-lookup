/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
// Start Javascript Libraries
// **************************************************

+function(t,e,o,n,i){function r(t){var e=t[b],o=typeof e;if(o==w)try{j.push(e)}catch(n){}try{t[b]=i}catch(n){}try{delete t[b],t[b]=i}catch(n){}return"boolean"==o}function c(){$=m;for(var t,e=0;j.length>0&&100>e;){e++,t=j[0],j[0]=i,j.splice(0,1);try{t()}catch(o){n(o)}}}function f(t){try{if(t.displayName==g||t.name==g||h!=typeof t.$&&h!=typeof t.$$&&h!=typeof t.addStyle&&h!=typeof t.addScript)return m}catch(e){}return!1}function a(){return $}function u(t){var e=typeof t,o=e==w,n=t===!0;if(o||"object"==e||n)if(n||f(t))c();else if(o)if($)try{t()}catch(i){}else j.push(t)}function l(o){o=o||1,y=typeof wikiMod!==h?wikiMod:t[g]||e[g]||(k?k[g]:i);try{if(!$&&!y&&35>o)return setTimeout(function(t){l((t||o)+1)},20,o)}catch(n){}c()}var y,p,d,s,h="undefined",w="function",g="wikiMod",b="onWikiModReady",m=!0,v=!1,k=typeof unsafeWindow!==h&&"window"===o.prototype.toString.call(unsafeWindow).replace(/^\[object |\]$/g,"").toLowerCase()?unsafeWindow:null,M=o.defineProperty,W=h!=typeof exportFunction?exportFunction:i,$=!1,j=[],C={allowCallbacks:m,allowCrossOriginArguments:m};if(k&&r(k)&&(d=k),r(t)&&!d&&(d=t),r(e)&&!d&&(d=e),d)for(s=0;s<j.length;s++)try{d[b]=j[s]}catch(S){}else{if(k&&h==typeof k[b]&&W)try{M(k,b,{get:W(a,k,C),set:W(u,k,C),enumerable:m,configurable:v})}catch(S){n(S)}p={get:a,set:u,enumerable:m,configurable:v};try{M(t,b,p)}catch(S){n(S)}if(h==typeof e[b])try{M(e,b,p)}catch(S){n(S)}l()}}(this,window,Object,console.log);

importScriptPage('User:Jgjake2/js/wikiMod.min.js', 'deadisland');

importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons.js', 'deadisland');

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

// Add Popup Script
importScriptPage('User:Jgjake2/js/Popups.js', 'deadisland');




// **************************************************
// wikiMod Dependant Scripts
// **************************************************

// will finish debugging before adding to site
//importScriptPage('User:Jgjake2/js/TabView_Edit_Buttons.js', 'deadisland');
importScriptPage('User:Jgjake2/js/jsEditCount.js', 'deadisland');

// **************************************************
// End wikiMod Dependant Scripts
// **************************************************