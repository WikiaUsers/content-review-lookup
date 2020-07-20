require(["wikia.window", "jquery", "mw"], function(window, $, mw){
    var mwConfig = mw.config.get([
            "wgUserName",
            "wgCanonicalSpecialPageName",
            "wgPageName",
            "wgUserGroups",
            "wgAction",
            "wgFormattedNamespaces",
            "wgNamespaceNumber",
            "wgIsArticle"
        ]);
    
    if (!("wds" in (window.dev = window.dev || {})))
        importArticle({ type: "script", article: "u:dev:MediaWiki:WDSIcons/code.js" });
    if (!("i18n" in (window.dev = window.dev || {})))
        importArticle({ type: "script", article: "u:dev:MediaWiki:I18n-js/code.js" });
    if (!("colors" in (window.dev = window.dev || {})))
        importArticle({ type: "script", article: "u:dev:MediaWiki:Colors/code.js" });
    
    if (!("util" in mw)) mw.loader.load("mediawiki.util");
    
    if (!("Title" in mw)) mw.loader.load("mediawiki.Title");
    
    if (!("Api" in mw)) mw.loader.load("mediawiki.api");
    
    var username = mwConfig.wgUserName,
        specialPage = mwConfig.wgCanoniclalSpecialPageName,
        page = mwConfig.wgPageName,
        userGroups = mwConfig.wgUserGroups,
        action = mwConfig.wgAction,
        formattedNamespaces = mwConfig.wgFormattedNamespaces,
        namespaceNumber = mwConfig.wgNamespaceNumber,
        isArticle = mwConfig.wgIsArticle,
        apiURL = mw.util.wikiScript("api");
    
    var _prefCache = {}, _prefLoaded = false, _prefDeferred = $.Deferred();
    
    function safeJSONparse(string){
        var ricomments = /\/\/[^\n]*/g,
            rbcomments = /\/\*[\s\S]*?\*\//g;
        
        string = string.trim();
        
        string = string.replace(ricomments, "");
        string = string.replace(rbcomments, "");
        
        var res;

        try {
            res = JSON.parse(string);
        } catch (ignore){
            res = null;
        }
        
        return res;
    }
    
    var monthNames = 
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dayNames = 
        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var times = {
        yy: function(date){ return pad(date.getFullYear() % 100); },
        yyyy: function(date){ return date.getFullYear(); },
        M: function(date){ return date.getMonth() + 1; },
        MM: function(date){ return pad(date.getMonth() + 1); },
        MMM: function(date){ return monthNames[date.getMonth()]; },
        d: function(date){ return date.getDate(); },
        dd: function(date){ return pad(date.getDate()); },
        D: function(date){ return dayNames[date.getDay()]; },
        h: function(date){ return date.getHours(); },
        hh: function(date){ return pad(date.getHours()); },
        H: function(date){
            var d = date.getHours() % 12;
            return d === 0 ? 12 : d;
        },
        HH: function(date){
            var d = date.getHours() % 12;
            return pad(d === 0 ? 12 : d);
        },
        m: function(date){ return date.getMinutes(); },
        mm: function(date){ return pad(date.getMinutes()); },
        s: function(date){ return date.getSeconds(); },
        ss: function(date){ return pad(date.getSeconds()); },
        P: function(date){ 
            var d = date.getHours();
            if (d > 11) return "PM";
            return "AM";
        }
    };
    
    function pad(n){
        n = parseInt(n);
        if (!isFinite(n)) return 0;
        if (n < 10) n = "0" + n;
        return n;
    }
    
    function parseTimestamp(timestamp, getTime){
        var D = new Date(timestamp);
        
        getTime = getTime !== void 0 ? getTime : true;
        
        if (getTime){
            return D.getTime();
        } else {
            var format = "D, MMM d, yyyy HH:mm:ss P";
            
            format = format.replace(/[\w]*/gi, function(match){
                if (match in times) return times[match].call(window, D);
                return "";
            });
            
            return format.trim();
        }
    }
    
    function _getPrefs(user, callback){
        var deferred = $.Deferred(),
            prefTitle = "User:" + user + "/prefs.json";
        $.when($.getJSON(apiUrl, {
            action: "query",
            prop: "revisions",
            rvprop: "content|timestamp",
            titles: prefTitle,
            format: "json",
            indexpageids: true
        })).done(function(data){
            var query = "query" in data && data.query;
            
            if (!query) return deferred.reject({});
            
            var pageid = "pageids" in query && (query.pageids.length > 0 ? query.pageids[0] : false);
            
            pageid = parseInt(pageid);
            
            if (!pageid || pageid === -1) return deferred.reject({});
            
            var page = "pages" in query && query.pages[pageid];
            
            if (!page) return deferred.reject({});
            
            var rev = page.revisions.length > 0 ? page.revisions[0] : false;
            
            if (!rev) return deferred.reject({});
            
            var content = rev["*"] || "", json = {}, timestamp = rev.timestamp || "";
            
            json = safeJSONparse(content || "{}") || {};
            
            json.username = user;
            json.time = parseTimestamp(timestamp);
            
            deferred.resolve(json);
        }).fail(function(ignore){
            deferred.reject({});
        });
        
        $.when(deferred).done($.isPlainObject(callback) ? callback.done : callback)
         .fail($.isPlainObject(callback) ? ("fail" in callback ? callback.fail : callback.done) : callback)
         .always($.isPlainObject(callback) ? ("always" in callback ? callback.always : function(){}) : function(){});
    }
    
    function _def(){
        var i = 0;
        while (i < arguments.length){
            if (_isset(arguments[i])) return arguments[i];
            i++;
        }
        return null;
    }
    
    function _isset(value){
        return value !== void 0 || value !== null;
    }
    
    var FandomToolbar = {};
    
    FandomToolbar._colors = window.dev.colors;
    FandomToolbar._wds = window.dev.wds;
    FandomToolbar._i18no = window.dev.i18n;
    FandomToolbar._i18n = { msgs: {} };
    
    $.when(FandomToolbar._i18no.loadMessages("FandomToolbar"))
     .done(function(i18n){
        var msgs = i18n._messages.en;
        Object.keys(msgs).forEach(function(msg){
            FandomToolbar._i18n.msgs[msg] = {};
            $.extend(FandomToolbar._i18n.msgs[msg], {
                parse: i18n.msg(msg).parse(),
                "escape": i18n.msg(msg).escape(),
                plain: i18n.msg(msg).plain(),
                replace: function(){
                    var args = [].slice.call(arguments);
                    return i18n.msgs.apply(i18n, args).parse();
                }
            });
        });
    });
    
    (function(){
        this.msg = function(name, type){
            if (typeof type !== "string") type = "_default";
 
            if (!({}).hasOwnProperty.call(this.msgs, name)) return "";
            var msg = this.msgs[name], res = "";
 
            if (!({}).hasOwnProperty.call(msg, type)) type = "_default";
 
            if (type === "_default") type = msg[type];
 
            if (type === "replace"){
                var args = [].slice.call(arguments, 2);
                res = msg.replace.apply(msg, args);
            } else res = msg[type];
 
            return res;
        };
 
        ["parse", "plain", "escape"].forEach(function(key){
            this[key] = function(name){
                return this.msg(name, key);
            };
        }, this);
    }).call(FandomToolbar._i18n);
    
    function isAdmin(){
        var allowed = ["staff", "helper", "wiki-manager", "vstf", "sysop"];
        while (allowed.length){
            var right = allowed.shift();
            if (userGroups.indexOf(right) > -1) return true;
        }
        return false;
    }
    
    var _prefName = "FandomToolbar-prefs", _prefs = localStorage.getItem(_prefName),
        _hasPrefs = !!_prefs;
    
    if (_hasPrefs){
        _prefs = safeJSONparse(_prefs);
        if (_prefs){
            _prefCache = $.extend(_prefCache, _prefs);
            _prefsLoaded = true;
        }
    }
    
    if (_prefsLoaded) _prefsDeferred.resolve(_prefs);
    else {
        _getPrefs(username, function(prefs){
            prefs.isAnon = username !== null;
            prefs.isAdmin = isAdmin();
            
            _prefCache = $.extend(_prefCache, prefs);
            _prefsLoaded = true;
            localStorage.setItem(_prefName, JSON.stringify(prefs));
            _prefsDeferred.resolve(prefs);
        });
    }
    
    $.when(_prefsDeferred).always(function(options){
        if (_def(options.disabled, false) === true) return;
        
        var toolbar = {
            isAdmin: _def(options.isAdmin, false),
            isAnon: _def(options.isAnon, false),
            showAvatar: _def(options.showAvatar, false),
            showBackToTopButton: _def(options.showBackToTopButton, true),
            items: _def(options.items, [])
        };
        
        var conditions = _def(window.toolbarOptions, {});
        
        function getNotificationData(callback){
            var deferred = $.Deferred(), data = [];
            
            $(".WikiaNotifications").each(function(){
                var $notification = $(this), $container = $notification.children("li");
                
                var notif = {};
                
                notif.$wrapper = $notification;
                notif.$container = $container;
                notif.dataType = $container.children("div").data("type");
                
                notif.dataType = _def(notif.dataType, 2);
                
                notif.content = $container.children("div").html();
                
                data.push(notif);
            });
            
            deferred.resolve(data);
            
            $.when(deferred).done(callback);
        }
        
        function filterMenuItems(items){
            var results = [].concat(items);
            
            results = results.filter(function(item){
                if (item.adminOnly && !toolbar.isAdmin) return false;
                
                if (item.page){
                    if (Array.isArray(item.page)){
                        var i = 0;
                        while (i < item.page.length){
                            if (item.page[i] === page) return true;
                            i++;
                        }
                        return false;
                    } else if (Object(item.page) instanceof String){
                        if (item.page[i] === page) return true;
                        return false;
                    } else return false;
                }
                
                if (item.userOnly && toolbar.isAnon) return false;
                
                if (item.condition){
                    if (Object(item.condition) instanceof String){
                        if (item.condition in conditions){
                            var condition = conditions[item.condition];
                            if (Object(condition) instanceof Function){
                                condition = condition.call(this, item);
                            } else if (Object(condition) instanceof Number){
                                condition = Boolean(condition);
                            } else if (Object(condition) instanceof String){
                                condition = /true/i.test(condition);
                            }
                            
                            if (condition) return true;
                            return false;
                        } else return false;
                    } else if (Object(item.condition) instanceof Number){
                        var condition = Boolean(item.condition);
                        if (condition) return true;
                        return false;
                    } else if (Object(item.condition) instanceof Function){
                        var condition = item.condition.call(this, item);
                        if (condition) return true;
                        return false;
                    } else if (Object(item.condition) instanceof String){
                        var condition = /true/i.test(item.condition);
                        if (condition) return true;
                        return false;
                    }
                    
                    if (item.condition) return true;
                    return false;
                }
                
                return true;
            });
            
            return results;
        }
        
        var alwaysShow = ["following", "history", "what-links-here", "customize"],
            adminOnly = ["block", "delete", "wiki-features", "admin"],
            noEdit = ["edit"];
            
        function mapMenuItems(items){
            var results = [].concat(items);
            
            results = results.map(function(item){
                var id = item.id;
                
                if (alwaysShow.indexOf(id) > -1){
                    item.condition = true;
                }
                
                if (adminOnly.indexOf(id) > -1){
                    item.condition = isAdmin;
                }
                
                if (noEdit.indexOf(id) > -1){
                    item.condition = action !== "edit";
                }
                
                return item;
            });
            
            return results;
        }
        
        var templates = {
            "alwaysShow": {
                
            },
            "adminOnly": {
                
            },
            "noEdit": {
                
            }
        };
        
        function createItem(id, template){
            
        }
        
        function fillMenuItems(items){
            var result = [];
            
            var i = 0;
            
            while (i < alwaysShow.length){
                result.push(createItem(alwaysShow[i], "alwaysShow"));
                i++;
            }
            
            if (isAdmin()){
                i = 0;
                while (i < adminOnly.length){
                    result.push(createItem(adminOnly[i], "adminOnly"));
                    i++;
                }
                
            }
            
            if (action !== "edit"){
                i = 0;
                while (i < noEdit.length){
                    result.push(createItem(noEdit[i], "noEdit"));
                    i++;
                }
            }
            
            result = result.concat(items);
            
            return result;
        }
        
        toolbar.items = fillMenuItems(toolbar.items);
        
        function getItems(callback){
            var deferred = $.Deferred();
            
            if (_def(toolbar.items, []).length === 0) deferred.reject([]);
            else {
                toolbar.items = mapMenuItems(filterMenuItems(toolbar.items));
                toolbar.length = toolbar.items.length;
            
                var i = 0;
            
                while (i < toolbar.length){
                    toolbar.items[i].index = i;
                    i++;
                }
            
                deferred.resolve();
            }
            
            $.when(deferred).always(callback);
        }
    });
});