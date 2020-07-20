/**
 * @title           ArticlePreview
 * @version         v2.0
 * @author          Ultimate Dark Carnage <https://dev.fandom.com/wiki/User:Ultimate_Dark_Carnage>
 * @description     TBA
 **/
 
 
require(["wikia.window", "jquery", "mw", "ext.wikia.design-system.loading-spinner"],
function(window, $, mw, Spinner){
    function Preview(){
        if (!(this instanceof Preview)) return new Preview();
 
        this._queue = [];
        this._elementCache = [];
        this._cache = [];
        this._callbacks = {};
        this._exceptions = [".free", ".toc a", ".wikia-button", ".button a", ".wikia-menu-button a", ".wds-button", ".button", ".wds-button a", ".new", ".external"];
        this._allowed = [];
        this._delay = 5;
        this._offset = 2;
        this._compat = false;
        this._enabled = true;
        this._orientation = "variable";
        this._maxHeight = 600;
        this._maxWidth = 450;
        this._noImage = false;
        this._defImage = "File:Image_placeholder.png";
        this._limit = 450;
 
        this.$curr = null;
        this.$base = null;
        this.$allowed = null;
        
        this.data = {};
        this.pos = { x: 0, y: 0 };
 
        return this;
    }
 
    Preview.prototype = {
        constructor: Preview,
        disable: function(){
            this.clearQueue();
            this.clearCache();
            this.$curr = null;
            this._enabled = false;
            return this;
        },
        enable: function(){
            this._enabled = true;
            return this;
        },
        toggle: function(){
            var state;
            if (arguments.length > 0){
                state = !!arguments[0];
                this._enabled = state;
                return this;
            } else {
                return this._enabled ? this.disable: this.enable();
            }
        },
        clearQueue: function(){
            var index = 0, len = this._queue.length;
 
            while (index < len){
                this._queue[index] = null;
                index++;
            }
 
            this._queue = this._queue.filter(Preview.isset);
 
            return this;
        },
        clearCache: function(){
            var index = 0, len = this._cache.length,
                eindex = 0, elen = this._elementCache.length;
 
            while (index < len){
                this._cache[index] = null;
                index++;
            }
 
            while (eindex < elen){
                this._elementCache[eindex] = null;
                eindex++;
            }
 
            this._elementCache = this._elementCache.filter(Preview.isset);
            this._cache = this._cache.filter(Preview.isset);
 
            return this;
        },
        addSelectors: function(){
            if (arguments.length === 0) return;
            
            var selectors, to, canonical = ["allowed", "exceptions"];
            
            if (arguments.length > -1){
                selectors = arguments[0];
                to = arguments[1];
            } else {
                selectors = arguments[0];
                to = "allowed";
            }
            
            if (canonical.indexOf(to) === -1) to = "allowed";
            
            if (Array.isArray(selectors)){
                while (selectors.length){
                    var selector = selectors.shift();
                    if (typeof selector !== "string") continue;
                    
                    this["_" + to].push(selector);
                }
            } else {
                if (typeof selectors !== "string") return;
                
                this["_" + to].push(selectors);
            }
        },
        removeSelectors: function(){
            if (arguments.length === 0) return;
            
            var selectors, from, canonical = ["allowed", "exceptions"];
            
            if (arguments.length > -1){
                selectors = arguments[0];
                from = arguments[1];
            } else {
                selectors = arguments[0];
                from = "allowed";
            }
            
            if (canonical.indexOf(from) === -1) from = "allowed";
            
            if (Array.isArray(selectors)){
                while (selectors.length){
                    var selector = selectors.shift(), index = this["_" + from];
                    if (typeof selector !== "string") continue;
                    
                    this["_" + from].splice(index, 1);
                }
            }
        }
	};
 
	Preview.isset = function(value){
		if (typeof value === "undefined") return false;
 
		return value !== null;
	};
	
	Preview.makePattern = function(name, flags){
	    if (flags === undefined) flags = "g";
	    else if (Array.isArray(flags)) flags = flags.join("");
 
	    var result = "", patterns = Preview.patterns;
	    if (Array.isArray(name)){
            while (name.length){
                var key = name.shift(),
                    isInternal = key.indexOf("_", 0) === 0,
                    string = null;
                if (isInternal) continue;
                
                if (!(key in patterns)){
                    var b = "regex:", i = key.indexOf(b, 0);
                    if (i === 0){
                        string = key.slice(b.length).trim();
                    } else continue;
                } else {
                    string = patterns[key];
                }
                
                console.log(string);
 
                if (typeof string !== "string") continue;
 
                result = result.concat(string);
            }
	    } else {
	        var isInternal = name.indexOf("_", 0) === 0, string = null;
	        if (isInternal) return null;
	        
	        if (!(name in patterns)){
	            var b = "regex:", i = name.indexOf(b, 0);
	            if (i === 0){
	                string = name.slice(b.length).trim();
	            } else return null;
	        } else {
	            string = patterns[name];
	        }
 
	        if (typeof string !== "string") return null;
 
	        result = result.concat(string);
	    }
 
	    return new RegExp(result, flags);
	};
 
	Preview.patterns = {};
 
	(function(){
		/* Characters and symbols */
		this._lower = "a-z";
		this._upper = "A-Z";
		this._digits = "0-9";
		this._locale = "\\u00c0-\\u00ff";
		this._wildcard = "(.*)";
		this._wildcardNC = "(?:.*)";
		this._lowerWithDigits = this._lower + this._digits;
		this._upperWithDigits = this._upper + this._digits;
		this._allLetters = this._lower + this._upper;
		this._allLettersWithDigits = this._lower + this._upper + this._digits;
		this._allLettersWithLocale = this._lower + this._upper + this._locale;
		this._allCharacters = this._allLettersWithDigits + this._locale;
		this._query = "\\?&";
		this._hash = "#";
		/* Character ranges */
		this._rangeStart = "[";
		this._rangeEnd = "]";
		this._rangePositiveIntegers = "[" + this._digits + "]";
		this._rangeIntegers = "(?:\\-)?" + this._rangePositiveIntegers;
		this._rangeNumbers = this._rangeIntegers + "*[\\.]?" + this._rangePositiveIntegers + "*" + this._rangePositiveIntegers;
		this._rangeLower = this._rangeStart + this._lower + this._rangeEnd;
		this._rangeUpper = this._rangeStart + this._upper + this._rangeEnd;
		this._rangeLetters = this._rangeStart + this._allLetters + this._rangeEnd;
		this._rangeLettersWithDigits = this._rangeStart + this._allLettersWithDigits + this._rangeEnd;
		this._rangeLettersWithLocale = this._rangeStart + this._allLettersWithLocale + this._rangeEnd;
		this._rangeLettersWithHyphen = this._rangeStart + this._allLettersWithDigits + "\\-" + this._rangeEnd;
		this._rangeLettersWithUnderscore = this._rangeStart + this._allLettersWithDigits + "_" + this._rangeEnd;
		this._rangeLettersWithUnderscoreH = this._rangeStart + this._allLettersWithDigits + "_\\-" + this._rangeEnd;
		this._rangeAllCharacters = this._rangeStart + this._allCharacters + this._rangeEnd;
		this._rangeAllCharactersWithHyphen = this._rangeStart + this._allCharacters + "\\-" + this._rangeEnd;
		/* URL Components */
		// #Protocols
		this.protocols = "https?\\:";
		// #Subdomains
		this.subdomain = this._rangeLettersWithDigits + "*" + this._rangeLettersWithHyphen + "*" + this._rangeLettersWithDigits + "+";
		this.subdomainC = "(" + this.subdomain + ")";
		this.subdomainNC = "(?:" + this.subdomain + ")";
		// #Domain
		this.domain = "(?:wikia|fandom)\\.(?:com|org)";
		this.domainC = "(" + this.domain + ")";
		this.domainNC = "(?:" + this.domain + ")";
		// #Path
		this.path = "\\/" + this._wildcard;
		this.pathNC = "\\/" + this._wildcardNC;
		// ##Wiki
		this.wikipath = "\\/wiki\\/";
		this.wiki = this.wikipath + this._wildcard;
		this.wikiNC = this.wikipath + this._wildcardNC;
		// ##Lang
		this.langFrag = "\\/(" + this._rangeLettersWithUnderscore + "*)";
		this.langFragNC = "\\/(?:" + this._rangeLettersWithUnderscore + "*)";
		this.lang = this.langFrag + "\\/" + this._wildcard;
		this.langNC = this.langFragNC + "\\/" + this._wildcardNC;
		this.langWiki = this.langFrag + "\\/" + this.wiki;
		this.langWikiNC = this.langFragNC + "\\/" + this.wikiNC;
		// ##Index
		this.index = "\\/index\\.php(?:\\?" + this._wildcardNC + ")?[" + this._query + "]title=([^&#]*)(?:&" + this._wildcardNC + ")?";
		this.indexNC = "\\/index\\.php(?:\\?" + this._wildcardNC + ")?[" + this._query + "]title=(?:[^&#]*)(?:&" + this._wildcardNC + ")?";
		// #Query
		this.query = "[" + this._query + "](" + this._rangeLettersWithUnderscore + ")(?:=([^&#]*)|&|" + this._hash + "|\\$)";
		this.queryNC = "[" + this._query + "](?:" + this._rangeLettersWithUnderscore + ")(?:=(?:[^&#]*)|&|" + this._hash + "|\\$)";
		// #Hash
		this.hash = this._hash + "([^&?#]*)";
		this.hashNC = this._hash + "(?:[^&?#]*)";
		// #URL
		// ##Host
		this.host = this.subdomainC + "\\." + this.domainC;
		this.hostNC = this.subdomainNC + "\\." + this.domainNC;
		// ##Full Host
		this.fullhost = this.protocols + "\\/\\/" + this.host;
		this.fullhostNC = this.protocols + "\\/\\/" + this.hostNC;
		// ##Full URL
		this.fullurl = this.fullhost + this.path;
		this.fullurlNC = this.fullhostNC + this.pathNC;
		// ##URL
		this.url = this.host + this.path;
		this.urlNC = this.hostNC + this.pathNC;
		// ##Full Wiki Link
		this.fullwikilink = this.fullhost + this.wiki;
		this.fullwikilinkNC = this.fullhostNC + this.wikiNC;
		// ##Wiki Link
		this.wikilink = this.host + this.wiki;
		this.wikilinkNC = this.hostNC + this.wiki;
		// ##Full index.php Link
		this.fullindexlink = this.fullhost + this.index;
		this.fullindexlinkNC = this.fullhost + this.indexNC;
		// ##Image
		this.imagelink = "(\\." + this.domain + "|(?:vignette|image)\\.wikia\\.nocookie\\.net)$";
		this.fullimagelink = "(?:" + this.protocols + "\\/\\/)" + this.imagelink;
		this.scale = "\\/scale-to-width(?:\\-down|)\\/([\\d]+)?";
		this.scaleNC = "\\/scale-to-width(?:\\-down|)\\/(?:[\\d]+)?";
	}).call(Preview.patterns);
	
	Preview.regex = {};
	
	(function(){
	    // Full links
	    // #Capture
	    this.rfullhost = Preview.makePattern("fullhost", "gi");
	    this.rfullurl = Preview.makePattern("fullurl", "gi");
	    this.rfullwikilink = Preview.makePattern("fullwikilink", "gi");
	    this.rfullindexlink = Preview.makePattern("fullindexlink", "gi");
	    this.rfullimagelink = Preview.makePattern("fullimagelink", "");
	    // #Noncapture
	    this.rfullhostnc = Preview.makePattern("fullhostNC", "gi");
	    this.rfullurlnc = Preview.makePattern("fullurlNC", "gi");
	    this.rfullwikilinknc = Preview.makePattern("fullwikilinkNC", "gi");
	    this.rfullindexlinknc = Preview.makePattern("fullindexlinkNC", "gi");
	    this.rfullimagelinknc = Preview.makePattern("fullimagelinkNC", "");
	    
	    // Short links
	    // #Capture
	    this.rhost = Preview.makePattern("host", "gi");
	    this.rurl = Preview.makePattern("url", "gi");
	    this.rwikilink = Preview.makePattern("wiki", "gi");
	    this.rindexlink = Preview.makePattern("index", "gi");
	    this.rimagelink = Preview.makePattern("imagelink", "");
	    // #Noncapture
	    this.rhostnc = Preview.makePattern("hostNC", "gi");
	    this.rurlnc = Preview.makePattern("urlNC", "gi");
	    this.rwikilinknc = Preview.makePattern("wikiNC", "gi");
	    this.rindexlinknc = Preview.makePattern("indexNC", "gi");
	    
	    // Scale
	    // #Capture
	    this.rscale = Preview.makePattern("scale", "gi");
	    // #Noncapture
	    this.rscalenc = Preview.makePattern("scaleNC", "gi");
	    
	    // Query
	    // #Capture
	    this.rquery = Preview.makePattern("query", "g");
	    // #Noncapture
	    this.rquerync = Preview.makePattern("queryNC", "g");
	    
	    // Hash
	    // #Capture
	    this.rhash = Preview.makePattern("hash", "g");
	    // #Noncapture
	    this.rhashnc = Preview.makePattern("hashNC", "g");
	    
	    // Internationalization
	    // #Short lang links
	    this.rlang = Preview.makePattern("lang", "gi");
	    this.rlangnc = Preview.makePattern("langNC", "gi");
	    this.rlangwiki = Preview.makePattern("langWiki", "gi");
	    this.rlangwikinc = Preview.makePattern("langWikiNC", "gi");
	    // #Full lang links (full host)
	    this.rfulllangfh = Preview.makePattern(["fullhost", "lang"], "gi");
	    this.rfulllangfhnc = Preview.makePattern(["fullhostNC", "langNC"], "gi");
	    this.rfulllangwikifh = Preview.makePattern(["fullhost", "langWiki"], "gi");
	    this.rfulllangwikifhnc = Preview.makePattern(["fullhostNC", "langWikiNC"], "gi");
	    this.rfulllangindexfh = Preview.makePattern(["fullhost", "langFrag", "index"], "gi");
	    this.rfulllangindexfhnc = Preview.makePattern(["fullhostNC", "langFragNC", "indexNC"], "gi");
	    // #Full lang links
	    this.rfulllang = Preview.makePattern(["host", "lang"], "gi");
	    this.rfulllangnc = Preview.makePattern(["hostNC", "langNC"], "gi");
	    this.rfulllangwiki = Preview.makePattern(["host", "langWiki"], "gi");
	    this.rfulllangwikinc = Preview.makePattern(["hostNC", "langWikiNC"], "gi");
	    this.rfulllangindex = Preview.makePattern(["host", "langFrag", "index"], "gi");
	    this.rfulllangindexnc = Preview.makePattern(["hostNc", "langFragNC", "indexNC"], "gi");
	}).call(Preview.regex);
	
	Preview.mw = {};
	
	(function(){
	    this.host = mw.config.get("wgServer");
	    this.page = mw.config.get("wgPageName");
	    this.path = mw.config.get("wgArticlePath");
	    this.action = mw.config.get("wgAction");
	    this.groups = mw.config.get("wgUserGroups");
	    this.ns = mw.config.get("wgNamespaceNumber");
	    this.namespaces = mw.config.get("wgFormattedNamespaces");
	    this.namespaceNumbers = {};
	    this.namespace = this.namespaces[this.ns];
	    
	    if (this.namespace === "Main") this.namespace = "";
	    
	    var keys = Object.keys(this.namespaces);
	    
	    keys.forEach(function(key){
	        var value = this.namespaces[key];
	        this.namespaceNumbers[value] = key;
	    }, this);
	    
	    this.isAdmin = false;
	    this.admin = ["staff", "helper", "wiki-manager", "content-team-member", "vstf", "sysop"];
	    
	    var c = [].concat(this.admin);
	    
	    while (c.length){
	        var d = c.shift();
	        
	        if (this.groups.indexOf(d) > -1){
	            this.isAdmin = true;
	            break;
	        }
	    }
	}).call(Preview.mw);
	
	Preview.getPattern = function(name, opts){
	    var key = "r", patterns = Preview.regex;
	    if (name === undefined || typeof name !== "string") return null;
	    if (opts === undefined || typeof opts !== "object") opts = {};
	    
	    var capture = !!opts.capture || true,
	        full = !!opts.full || false,
	        fullhost = !!opts.fullhost || false,
	        lang = !!opts.lang || false;
	        
	    if (full) key = key.concat("full");
	    
	    if (lang) key = key.concat("lang");
	    
	    key = key.concat(name);
	    
	    if (fullhost) key = key.concat("fh");
	    
	    if (!capture) key = key.concat("nc");
	    
	    if (!(key in patterns)) return null;
	    
	    return patterns[key];
	};
 
    window.ArticlePreviewController = window.PreviewController = Preview;
    window.ArticlePreview = window.Preview = new Preview();
});