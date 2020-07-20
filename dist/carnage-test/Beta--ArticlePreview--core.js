/**
 * @name            ArticlePreview
 * @author          Ultimate Dark Carnage
 * @version         v2.0b
 * @description     Creates a popover that displays a preview of
 *                  the article.
 **/

require(["wikia.window", "jquery", "mw", "ext.wikia.design-system.loading-spinner"], function(window, $, mw, Spinner){
    var config = $.extend({}, window.APConfig),
        SLICE = [].slice, EACH = [].forEach,
        HAS = ({}).hasOwnProperty, TOSTRING = ({}).toString;
    
    window.dev = $.extend({}, window.dev);
    
    function isType(value, type){
        if (Array.isArray(type)){
            var a = [].concat(type);
            while (a.length){
                var v = a.shift();
                if (TOSTRING.call(v) === "[object " + v + "]") return true;
            }
            return false;
        } else if (typeof type === "string"){
            return (TOSTRING.call(type) === "[object " + type + "]");
        } else return false;
    }
    
    function DEFAULT(){
        var i = 0;
        while (i < arguments.length){
            if (ISSET(arguments[i])) return arguments[i];
            i++;
        }
        return null;
    }
    
    function ISSET(value){
        return !((typeof value === "undefined") || (value === null));
    }
    
    function ISADMIN(){
        var allowed = ["staff", "helper", "vstf", "bureaucrat", "sysop", "content-moderator"];
        while (allowed.length){
            if (mw.config.get("wgUserGroups").indexOf(allowed.shift()) > -1) return true;
        }
        return false;
    }
    
    function DEF_COND(cond){
        var args = SLICE.call(arguments, 1), a, dv;
        if (typeof cond === "boolean"){
            if (arguments.length === 2){
                return COND.apply(this, SLICE.call(arguments));
            } else if (arguments.length > 2){
                if (cond){
                    dv = args[0];
                    return DEFAULT(dv);
                } else {
                    a = [];
                    args = args.slice(1);
                    while (args.length) a.push(args.shift());
                    return DEFAULT.apply(this, a);
                }
            } else return null;
        } else if (typeof cond === "function"){
            var v = cond.call(this);
            if (ISSET(v) && v){
                dv = args[0];
                return DEFAULT(dv);
            } else {
                a = [];
                args = args.slice(1);
                while (args.length) a.push(args.shift());
                return DEFAULT.apply(this, a);
            }
        } else return null;
    }
    
    function COND(cond){
        var args = SLICE.call(arguments, 1), a;
        if (typeof cond === "boolean"){
            if (cond){
                a = [];
                while (args.length) a.push(args.shift());
                return DEFAULT.apply(this, a);
            } else return null;
        } else if (typeof cond === "function"){
            var v = cond.call(this);
            if (ISSET(v) && v){
                a = [];
                while (args.length) a.push(args.shift());
                return DEFAULT.apply(this, a);
            } else return null;
        } else return null;
    }
    
    function ArticlePreview(options){
        if (!(this instanceof ArticlePreview)) return new ArticlePreview(options);
        options = $.extend({}, options);
        // Integral properties (do not remove)
        this._name = "ArticlePreview";
        this._version = "v2.0b";
        this._callbacks = {};
        this._cache = [];
        this._uri = {};
        this._href = "";
        this._hasImage = false;
        this._new = false;
        this._host = mw.config.get("wgServer");
        this._user = mw.config.get("wgUserName");
        this._page = mw.config.get("wgPageName");
        this._site = mw.config.get("wgSiteName");
        this._apath = mw.config.get("wgArticlePath");
        this._ns = mw.config.get("wgNamespaceNumber");
        this._namespaces = mw.config.get("wgFormattedNamespaces");
        this._action = mw.config.get("wgAction");
        this._apiurl = new mw.Uri({ path: mw.config.get("wgScriptPath") + "api.php" });
        this._currLink = window.location.href;
        this._currPage = this.createUri(this.currLink).truepath;
        // Regular expression patterns
        this._prep = {};
        this._prep.rscript = /<script[^\>]*>[\s\S]*?<\/script>/gim;
        this._prep.rref = /<ref>[\s\S]*?<\/ref>/gim;
        this._rflink = /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/(?:wiki\/|index\.php\?(?:.*\&)?title=)([^?&#]*)(?:.*)?$/;
        this._rwlink1 = /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/?$/;
        this._rwlink2 = /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/?/;
        this._rwlink3 = /https?:\/\/(?:[\w\d][\w\d\-][\w\d])\.(?:fandom|wikia)\.(?:com|org)\/?/;
        this._rslink = /^\/(?:wiki\/|index\.php\?(?:.*\&)?title=)([^?&#]*)(?:.*)?$/;
        this._rns1 = /^https?:\/\/([\w\d][\w\d\-]*[\w\d])\.(?:fandom|wikia)\.(?:com|org)\/(?:wiki\/|index\.php\?(?:.*\&)?title=)([^?&#:]*)\:([^?&#]*)(?:.*)?$/;
        this._rns2 = /^\/(?:wiki\/|index\.php\?(?:.*)?title=)([^?&#:]*)\:([^?&#]*)(?:.*)?$/;
        this._rurlparams = /[?&]([^?&#=]*)(?:=([^?&#=])|#)/g;
        this._rtags = /<.*>/gm;
        this._rimage1 = /^https?:\/\/(?:vignette|image)\.wikia\.nocookie\.net(?:\/.*)$/;
        this._rimage2 = /(\.(?:wikia(?:\.nocookie)?|fandom)\.(?:com|org|net))$/;
        this._ronlyinclude = DEFAULT(options.ronlyinclude, []);
        this._riclasses = DEFAULT(options.riclasses, []);
        this._riparents = DEFAULT(options.riparents, []);
        this._ripages = DEFAULT(options.ripages, []);
        this._rilinks = DEFAULT(options.rilinks, []);
        this._riimages = DEFAULT(options.riimages, []);
        
        this._rilinks.push(this._currPage);
        this._rilinks.push(new RegExp(this._apiurl.path));
        // User interface
        this.$links = ;
        this.$elem = null;
        this.buttons = [];
        // Configurable properties
        this.onload = DEFAULT(options.onload, null);
        this.fade = DEFAULT(options.fade === true ? null : options.fade, false);
        this.delay = COND(!isNaN(options.delay), options.delay);
        this.charLimit = DEFAULT(COND((typeof options.charLimit === "number" && options.charLimit > 499), options.charLimit), Infinity);
        this.elems = DEFAULT(options.elems);
        this.content = DEFAULT(options.content, "#mw-content-text, #WikiaRail .rail-module");
        
        return this;
    }
    
    (function(){
        this.constructor = ArticlePreview;
        this.process = function(){
            
        };
    }).call(ArticlePreview.prototype);
});