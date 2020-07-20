+function(global, win, $, undefined){
	var options = (typeof win.mobileJSLoader_options === "object" ? win.mobileJSLoader_options : {}),
		debug = options.debug === true,
		_undefined = "undefined",
		_wikiModAdded = false,
		log = _undefined!=typeof console ? console.log.bind(console) : function(){},
		__wikiMod__, key;
 
	if(options.disable === true){
		if(debug) log('Mobile JS Loader Disabled!');
		return;
	}
 
	if(win.MobileDeviceJSLoader === true){
		if(debug) log('Mobile JS Loader Already Exists!');
		return;
	}
 
	win.MobileDeviceJSLoader = true;
 
	if(debug){
		log('Mobile JS Loader Start', global);
	}
 
	function isjQueryAvailable(){
		if($ || (($ = (win.jQuery || win.$ || global.jQuery || global.$)) != null)){
			return true;
		}
		return false;
	}
 
	function $query(selector, target, nojQuery){
		target = target || win.document || document;
		try{
			if(nojQuery !== true && isjQueryAvailable()){
				try{
					return $(selector, target).first()[0];
				}catch(e){}
			}
			if(typeof selector !== "string"){
				return;
			}
			return target.querySelector(selector);
		}catch(e){
			if(debug) log('Error!', e);
		}
	}
 
	function $$query(selector, target, nojQuery){
		target = target || win.document || document;
		try{
			if(nojQuery !== true && isjQueryAvailable()){
				try{
					return $(selector, target).toArray();
				}catch(e){}
			}
			if(typeof selector !== "string"){
				return;
			}
			var tmp = target.querySelectorAll(selector);
			return (tmp?[].map.call(tmp, function(element) {return element;}):[]);
		}catch(e){
			if(debug) log('Error!', e);
		}
	}
 
	function addScript(js, src, id, type, async, defer){
		var newScript, data,
			_doc = win.document || document,
			head = _doc.head || _doc.getElementsByTagName('head')[0];
		if(typeof js === 'object') {data = js;} else {data = {js: js,src: src,id: id,type: type,async: async,defer: defer};}
		if(head) {
			newScript = _doc.createElement('script');
			if(typeof data.id !== 'string' && data.id){try{newScript.id = data.id;}catch(x){}}
			if(typeof data.async === 'boolean'){newScript.async = data.async;}
			if(typeof data.defer === 'boolean'){newScript.defer = data.defer;}
			if(typeof data.onload !== _undefined && data.onload){newScript.onload = data.onload;}
			if(typeof data.onerror !== _undefined && data.onerror){newScript.onerror = data.onerror;}
			newScript.type = data.type || 'text/javascript';
			if(typeof data.js === 'string' && data.js != null){try {newScript.innerHTML = data.js;} catch (x) {newScript.innerText = data.js;}}
			if(typeof data.src === 'string' && data.src){try{newScript.src = data.src;}catch(x){}}
			try{return head.appendChild(newScript);}catch(x){if(debug) log('Add Script Error!', x);}
		}
		return null;
	}
 
	function addStylesheet(url){
		var style,
			head = document.head;
 
		if(head){
			style = document.createElement('link');
			style.setAttribute('rel', 'stylesheet');
			style.href = url;
			style.type = "text/css";
			return head.appendChild(style);
		}
	}
 
	function getWM(){return (__wikiMod__ || (__wikiMod__ = (typeof wikiMod !== _undefined ? wikiMod : (global.wikiMod || win.wikiMod || undefined))));}
 
	function wikiModAdded(){
		if(!_wikiModAdded && ($query('script[src*="wikiMod.js"]') || $query('script[src*="wikiMod.min.js"]'))){
			_wikiModAdded = true;
		}
 
		return _wikiModAdded;
	}
 
	function wikiModLoaded(){
		return (getWM() ? true : false);
	}
 
	function isMediaWiki(obj){
		return (obj && obj.loader && obj.messages && obj.libs ? true : false);
	}
 
	function getMediaWiki(){
		return (
				typeof mediaWiki !== _undefined && isMediaWiki(mediaWiki) ? mediaWiki :
				typeof mw !== _undefined && isMediaWiki(mw) ? mw :
				(global.mediaWiki || global.mw || win.mediaWiki || win.mw)
				);
	}
 
	function addMediaWiki(){
		var tMW = getMediaWiki();
 
		if((!tMW || !isMediaWiki(tMW)) && !$query('script[src*="mediawiki"]')) {
			var _wgCdnRootUrl = (win.wgCdnRootUrl || global.wgCdnRootUrl || "http://slot1.images2.wikia.nocookie.net");
			return addScript(undefined, _wgCdnRootUrl + "/__load/-/debug%3Dfalse%26only%3Dscripts/mediawiki");
		}
	}
 
	var importScriptPage = function(page, server) {
		var url = '/index.php?title=' + encodeURIComponent(page.replace(/\s/g, '_')).replace('%2F', '/').replace('%3A', ':') + '&action=raw&ctype=text/javascript';
		if(typeof server == "string") {
			if(server.indexOf('://') == -1) {
				url = 'http://' + server + '.wikia.com' + url;
			} else {
				url = server + url;
			}
		}
		return addScript(undefined, url);
	};
 
	var importStylesheetPage = function(page, server) {
		var url = '/index.php?title=' + encodeURIComponent(page.replace(/\s/g, '_')).replace('%2F', '/').replace('%3A', ':') + '&action=raw&ctype=text/css';
		if(typeof server == "string") {
			if(server.indexOf('://') == -1) {
				url = 'http://' + server + '.wikia.com' + url;
			} else {
				url = server + url;
			}
		}
		return addStylesheet(url);
	};
 
	function getUrlVars(){var vars = [],hash,hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'),i = 0;for ( ; i < hashes.length; i++) {hash = hashes[i].split('=');vars.push(hash[0]);vars[hash[0]] = hash[1];}return vars;}
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
 
 
	function onWikiModLoaded(){
		if(debug) log('onWikiModLoaded');
		try {
			wikiModLoaded();
			getWM().load('mediawiki');
		} catch(e) {
			if(debug) log('wikiMod load error', e);
		}
 
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
 
		importScriptPage('User:Jgjake2/js/jsEditCount.js', 'deadisland');
	}
 
	function addWikiMod(){
		var added = wikiModAdded(),
			loaded = wikiModLoaded();
		if(!added){
			if(!loaded)
				addScript(undefined, 'http://deadisland.wikia.com/index.php?title=User:Jgjake2/js/wikiMod.min.js&action=raw&ctype=text/javascript');
			added = _wikiModAdded = true;
		}
 
		return added;
	}
 
	addMediaWiki();
	addWikiMod();
 
	+function(t,n,e,i){function o(){return typeof wikiMod!==e?wikiMod:t.wikiMod||n.wikiMod}function r(){a||(a=!0,i(t.jQuery||n.jQuery,o()))}function u(t){t=t||1;try{if(!a&&!o()&&35>t)return setTimeout(function(n){u((n||t)+1)},25,t)}catch(n){}r()}function c(){var i=t[f],o=n[f],c=!0;try{if(i===!0||o===!0)return r();try{n[f]=r}catch(a){}if(e!=typeof n[f]&&n[f]!==r&&(c=!1),i===!1||"function"!=typeof i){try{t[f]=r}catch(a){}e!=typeof t[f]&&t[f]!==r&&(c=!1)}}catch(a){}c&&u()}var f="onWikiModReady",a=!1;c()}(this,window,"undefined",function($,wikiMod){onWikiModLoaded();});
}(this, window, typeof jQuery !== "undefined" ? jQuery : typeof $ !== "undefined" ? $ : (window.jQuery || window.$));