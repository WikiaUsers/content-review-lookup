/**
 * WikiActivity
 *
 * Recreates the legacy Special:WikiActivity page on the Unified
 * Community platform with a modernized appearance and a few
 * upgrades.
 *
 * Note: This script is a community project and is high-traffic.
 * If you know what you're doing and need to make any changes
 * that will impact the users of the script, you are welcome
 *
 * Author: Ultimate Dark Carnage
 * Version: v2.1
 **/

(function(window, $, mw){
	"use strict";
	
	// If the script has been ran, stop here
	if (window.wikiActivityLoaded) return;
	
	// Sets the loaded state to true
	window.wikiActivityLoaded = true;
	
	// Creates the UCP object if it does not exist
	window.UCP = window.UCP || { };
	
	// Creates the Dev object if it does not exist
	window.dev = window.dev || { };
	
	// Escapes regex characters
	function regesc( s ) {
        return s.replace( /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&" );
    }
    
    // Parses the date object
    function parseDate( x ) {
        var d = null;
        return !isNaN( (
            d = ( x instanceof Date ) ?
                x :
                new Date( x )
            )
            ) ?
            d : null;
    }
    
    // Safely parses a JSON string
    function safeJSONParse(s){
        try { return JSON.parse(s); }
        catch (e) { console.warn(e); return s; }
    }

    // Creates the storage
    function MapStorage(base) {
    	// Stores the current instance on a variable
    	const ms = this;
    	
    	// The current interval for watching the storage object
    	ms.__interval = null;
    	
    	// Determines whether the storage is checking for keys
    	ms.__watching = false;
    	
    	// Watches the storage property
    	ms.__init = function(){
    		ms.__interval = setInterval(ms.__check.bind(ms), 1000);
    		ms.__watching = true;
    	};
    	
    	// Checks for properties in the storage object
    	ms.__check = function(){
    		Object
    			.keys(localStorage)
    			.filter(function(s){
    				if (!s.startsWith(base + ":")) return false;
    				const value = localStorage.getItem(s);
    				const object = safeJSONParse(value);
    				
    				const v = typeof object === "object" ? object.value : object;
    				const e = typeof object === "object" ? Number(object.expiry) || Infinity : Infinity;
    				
    				return (v !== undefined) && (e > -1);
    			})
    			.forEach(function(key){
    				const val = safeJSONParse(localStorage.getItem(key));
    				const expiry = typeof val === "object" ? Number(object.expiry) || Infinity : Infinity;
    				
    				if (!isFinite(expiry) || isNaN(expiry)) return;
    				
    				const d = parseDate(expiry).getTime() / 1000;
    				const c = Date.now( ) / 1000;
    				const f = d - c;
    				
    				if (f < 1) localStorage.removeItem(key);
    			});
    	};
    	
    	// Fetches the value from its property
    	ms.get = function(k){
    		if (arguments.length < 1) return;
    		const key = base + ":" + k;
    		const value = localStorage.getItem(key);
    		return safeJSONParse(value);
    	};
    	
    	// Sets a value to a property
    	ms.set = function(k, v, e){
    		if (arguments.length < 1) return false;
    		
    		if (arguments.length === 1 && typeof k === "object"){
    			return Object
    				.keys(k)
    				.some(function(key){
    					var value = k[key];
    					
    					if (!(typeof value === "object" && "expiry" in value)) {
    						value = { value: value, expiry: "Infinity" };
    					}
    					
    					return ms.set(key, value);
    				});
    		}
    		
    		if (arguments.length === 3) {
    			v = { value: v, expiry: String((isNaN(e) || !isFinite(e)) ? Infinity : e) };
    		} else {
    			v = { value: v, expiry: "Infinity" };
    		}
    		
    		const key = base + ":" + k;
    		const result = JSON.stringify(v);
    		
    		localStorage.setItem(key, result);
    	};
    	
    	// Removes a property from the storage object
    	ms.remove = function(k){
    		const key = base + ":" + k;
    		localStorage.removeItem(key);
    	};
    	
    	// Clears the activity storage
    	ms.clear = function(){
    		Object
    			.keys(localStorage)
    			.filter(function(s){
    				return s.startsWith(base + ":");
    			})
    			.forEach(localStorage.removeItem);
    	};
    	
    	ms.__init();
    }
    
	// Creates the script loader
	function Loader(callback, thisArg){
		// If there is one argument, set the context to the current instance
		if (arguments.length === 1) thisArg = this;
		
		// A list of loaded scripts
		this.loadedScripts = [];
		
		// An object that contains scripts to load
		this.scripts = Object.freeze( { 
			"dev.i18n": Object.freeze( {
				script: "u:dev:MediaWiki:I18n-js/code.js",
				key: "i18n"
			} ),
			"dev.colors": Object.freeze( {
				script: "u:dev:MediaWiki:Colors/code.js",
				key: "colors"
			} ),
			"dev.wds": Object.freeze( {
				script: "u:dev:MediaWiki:WDSIcons/code.js",
				key: "wds"
			} ),
			"doru.ui": Object.freeze( {
				script: "u:dev:MediaWiki:Dorui.js",
				key: "dorui"
			} )
		} );
		
		this.loaded = false;
		
		this.init = function(){
			mw.loader
				.using("mediawiki.util")
				.then(this.loadScripts.bind(this));
		};
		
		this.loadScripts = function(){
			importArticle({
				type: "style",
				article: "u:dev:MediaWiki:WikiActivity.css"
			});
			
			const promises = Object
				.keys(this.scripts)
				.map(function(name){
					console.log(this);
					const obj = this.scripts[name];
					const key = obj.key;
					const script = obj.script;
					
					if (window.dev[key]) {
						this.loadedScripts.push(script);
						return Promise.resolve();
					}
					
					return new Promise(function(resolve, reject){
						importArticle({ 
							type: "script",
							article: script
						}).then((function(){
							this.loadedScripts.push(script);
							resolve();
						}).bind(this));
					});
				}, this);
			
			Promise
				.all(promises)
				.then((function(){
					this.loaded = true;
					callback.call(thisArg);
				}).bind(this));
		};
	}
	
	// Creates the WikiActivity constructor
	function WikiActivity(opts){
		// Stores the current instance to a variable
		const wk = this;
		
		// Name of the script (used as a local storage key)
		wk.NAME = "WikiActivity";
		
		// The current version of the script
		wk.VERSION = "v2.1";
		
		// MediaWiki configuration object
		wk.CONFIG = mw.config.get( [ 
			"wgCityId",
			"wgNamespaceNumber",
			"wgFormattedNamespaces",
			"wgTitle",
			"wgSiteName",
			"wgServer",
			"wgUserName",
			"wgUserGroups",
			"wgScriptPath"
		] );
		
		// A list of user groups
		wk.USER_GROUPS = wk.CONFIG.wgUserGroups;
		
		// Initializes the script
		wk.init = function(){
			// Checks if the user can block
			wk.canBlock = Object.freeze([
				"staff", "wiki-manager", "content-team-member",
				"soap", "sysop", "global-discussions-moderator",
				"helper"
			]).some(function(n){
				return wk.USER_GROUPS.includes(n);
			});
			
			// Checks if the user has moderator rights
			wk.isMod = Object.freeze([
				"staff", "wiki-manager", "content-team-member",
				"soap", "sysop", "global-discussions-moderator",
				"helper", "discussions-moderator", "threadmoderator"
			]).some(function(n){
				return wk.USER_GROUPS.includes(n);
			});
			
			// Checks if the user can rollback edits
			wk.canRollback = Object.freeze([
				"staff", "wiki-manager", "content-team-member",
				"soap", "sysop", "global-discussions-moderator",
				"helper", "discussions-moderator", "threadmoderator",
				"rollback"
			]).some(function(n){
				return wk.USER_GROUPS.includes(n);
			});
			
			wk.AVATAR_CACHE = {};
			
			wk.ICON_NAMES = Object.freeze({
				edit: "pencil",
				"new": "add",
				comment: "comment",
				talk: "bubble",
				categorize: "tag",
				diff: "clock",
				options: "gear",
				more: "more"
			});
			
			wk.SUBPAGES = {};
			
			wk.SUBPAGE_PATTERNS = {};
			
			wk.TYPES = Object.freeze({
				
			});
		};
		
		wk.loader = new Loader(wk.init, wk);
		
		wk.storage = new MapStorage(this.NAME);
		
		wk.loader.init();
	}
	
	window.WikiActivity = WikiActivity;
})(window, jQuery, mediaWiki);