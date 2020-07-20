(function(factory, window){
    var mw = window.mw, $ = window.jQuery,
        isChat = mw.config.get("wgCanonicalSpecialPageName") === "Chat";
    
    if (!isChat) return;
    
    window.dashboardLoaded = true;
    
    var coreDeps = [];
    
    if (!("Api" in mw)) coreDeps.push("mediawiki.api");
 
    if (!("util" in mw)) coreDeps.push("mediawiki.util");
 
    if (!("Title" in mw)) coreDeps.push("mediawiki.Title");
 
    if (!("Uri" in mw)) coreDeps.push("mediawiki.Uri");
    
    mw.loader.load(coreDeps);
    
    var deferred = {
        wds: $.Deferred(),
        colors: $.Deferred(),
        i18n: $.Deferred(),
        mainRoom: $.Deferred()
    }, name;
    
    window.dev = $.extend({}, window.dev);
 
    if ("wds" in window.dev){
        deferred.wds.resolve();
    } else {
        name = "u:dev:MediaWiki:WDSIcons/code.js";
        $(importArticle({ type: "script", article: name }))
            .on("load", deferred.wds.resolve.bind(deferred.wds));
    }
 
    if ("colors" in window.dev){
        deferred.colors.resolve();
    } else {
        name = "u:dev:MediaWiki:Colors/code.js";
        $(importArticle({ type: "script", article: name }))
            .on("load", deferred.colors.resolve.bind(deferred.colors));
    }
 
    if ("i18n" in window.dev){
        deferred.i18n.resolve();
    } else {
        name = "u:dev:MediaWiki:I18n-js/code.js";
        $(importArticle({ type: "script", article: name }))
            .on("load", deferred.i18n.resolve.bind(deferred.i18n));
    }
    
    if ("mainRoom" in window && mainRoom.isInitialized){
        deferred.mainRoom.resolve();
    } else if (!mainRoom.isInitialized){
        mainRoom.socket.bind("initial", deferred.mainRoom.resolve);
    } else {
        var t = setTimeout(function(){
            clearTimeout(t);
            t = null;
            
            deferred.mainRoom.resolve();
        }, 1200);
    }
    
    importArticle({ type: "style", article: "MediaWiki:Options.js/dashboard.css" });
    
    var k = [], keys = Object.keys(deferred), j = 0;
    
    while (j < keys.length){
        k[j] = deferred[keys[j]];
        j++;
    }
    
    window.mw = mw;
    
    window.jQuery = window.$ = $;
    
    k.push(window.mw.loader.using(coreDeps));
    window.$.when.apply(window.$, k).done(factory);
}(function(window, $, mw){
    var UtilLoaded = $.Deferred();
    if ("Util" in window){
        UtilLoaded.resolve();
    } else {
        $(importArticle({ type: "script", article: "MediaWiki:Options.js/util.js" }))
            .on("load", UtilLoaded.resolve);
    }
    
    $.when(UtilLoaded).done(function(){
        function Dashboard(options){
            if (!(this instanceof Dashboard)) return new Dashboard(options);
            options = $.extend({}, options);
            this.columns = [];
            this.loaded = false;
            this.opened = false;
            this.length = 0;
            this.user = mw.config.get("wgUserName");
            this.groups = mw.config.get("wgUserGroups");
            this.fullscreen = Util._default(options.fullscreen, true);
            this.name = Util._default(options.name, "");
            return this;
        }
        
        Dashboard.fn = Dashboard.prototype;
        
        (function(){
            this.constructor = Dashboard;
            this.column = function(options){
                var column = {};
                
                options = $.extend({}, options);
                if ($.isEmptyObject(options)) return this;
                
                column.show = Util._defaultret(options.show, true);
                column.title = Util._defaultret(options.title, false);
                column.id = Util._defaultret(options.id, "");
                column.collapsible = Util._defaultret(options.collapsible, true);
                column.rows = Util._merge(options.rows, []);
                column.length = 0;
                
                if ("generate" in options){
                    if (typeof options.generate === "function"){
                        options.generate.call(this, column);
                    }
                }
                
                if (column.id === "") return this;
                
                var that = this;
                
                column.row = function(config){
                    return that.row(column.id, config);
                };
                
                this.length = this.columns.push(column);
                return this;
            };
            
            this.getColumn = function(id){
                var index;
                if (typeof id === "number"){
                    index = id;
                } else if (isFinite(id) && !isNaN(id)){
                    index = parseInt(id, 10);
                } else {
                    var i = 0;
                    while (i < this.length){
                        var col = this.columns[i];
                        
                        if (col.id !== ""){
                            var colid = col.id;
                            if (id === colid){
                                index = i;
                                break;
                            }
                        }
                        
                        i++;
                    }
                }
                
                return this.columns[index];
            };
            
            this.row = function(id, options, retVal){
                var index, res, isarr = false;
                
                retVal = Util._default(retVal, false);
                if (typeof id === "number"){
                    index = id;
                } else if (isFinite(id) && !isNaN(id)){
                    index = parseInt(id, 10);
                } else if (Array.isArray(id)){
                    var j = 0;
                    res = [];
                    isarr = true;
                    while (j < id.length){
                        res[j] = this.row(id[j], options, true);
                        j++;
                    }
                } else {
                    var i = 0;
                    while (i < this.length){
                        var col = this.columns[i];
                        
                        if (col.id !== ""){
                            var colid = col.id;
                            if (id === colid){
                                index = i;
                                break;
                            }
                        }
                        
                        i++;
                    }
                }
                
                if (!isarr){
                    var row = {};
                
                    options = $.extend({}, options);
                    
                    row.show = Util._default(options.show, true);
                    row.title = Util._default(options.title, false);
                    row.html = Util._default(options.html, "");
                    row.collapsible = Util._default(options.collapsible, true);
                    
                    if ("generate" in options){
                        if (typeof options.generate === "function"){
                            options.generate.call(this, column);
                        }
                    }
                    
                    if (retVal){
                        return row;
                    } else {
                        this.columns[index].length = this.columns[index].rows.push(row);
                        return this;
                    }
                } else {
                    var k = 0;
                    while (k < res.length){
                        var r = res[k], name = r.colid;
                        
                        var idx = id.indexOf(name);
                        
                        if (idx > -1){
                            var _id = id[idx];
                            
                            var l = 0;
                            
                            while (l < this.length){
                                var col = this.columns[l];
                                
                                if (col.id !== ""){
                                    var colid = col.id;
                                    
                                    if (_id === colid){
                                        this.columns[l].length = this.columns[l].rows.push(r);
                                        break;
                                    }
                                }
                                
                                l++;
                            }
                        } 
                        
                        k++;
                    }
                    
                    return this;
                }
                
            };
        }).call(Dashboard.fn);
    });
}).bind(this, window, window.jQuery, window.mw), window);