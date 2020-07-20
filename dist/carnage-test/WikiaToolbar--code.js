(function(window, $, mw){
    this._version = "0.5a";
    
    this._name = "FandomToolbar";
    
    this._mwConfig = mw.config.get([
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
    
    this._username = this._mwConfig.wgUserName;
    this._specialPage = this._mwConfig.wgCanonicalSpecialPageName;
    this._page = this._mwConfig.wgPageName;
    this._userGroups = this._mwConfig.wgUserGroups;
    this._action = this._mwConfig.wgAction;
    this._namespaceNumber = this._mwConfig.wgNamespaceNumber;
    this._formattedNamespaces = this._mwConfig.wgFormattedNamespaces;
    this._isArticle = this._mwConfig.wgIsArticle;
    this._apiURL = mw.util.wikiScript("api");
    
    this._prefCache = {};
    this._prefLoaded = false;
    this._prefDeferred = $.Deferred();
    
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
    
    this._monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this._dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    function pad(n){
        n = parseInt(n);
        if (!isFinite(n)) return 0;
        if (n < 10) n = "0" + n;
        return n;
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
    
    this._times = {
        yy: function(date){ return pad(date.getFullYear() % 100); },
        yyyy: function(date){ return date.getFullYear(); },
        M: function(date){ return date.getMonth() + 1; },
        MM: function(date){ return pad(date.getMonth() + 1); },
        MMM: function(date){ return this._monthNames[date.getMonth()]; },
        d: function(date){ return date.getDate(); },
        dd: function(date){ return pad(date.getDate()); },
        D: function(date){ return this._dayNames[date.getDay()]; },
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
    
    this._getPrefs = function(user, callback){
        var deferred = $.Deferred(), title = "User:" + user + "/prefs.json";
        
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
            json.time = this.parseTimestamp(timestamp);
 
            deferred.resolve(json);
        }.bind(this)).fail(function(ignore){
            deferred.reject({});
        });
        
        $.when(deferred).done($.isPlainObject(callback) ? callback.done.bind(this) : callback.bind(this))
         .fail($.isPlainObject(callback) ? ("fail" in callback ? callback.fail.bind(this) : callback.done.bind(this)) : callback.bind(this))
         .always($.isPlainObject(callback) ? ("always" in callback ? callback.always.bind(this) : function(){}) : function(){});
    };
    
    this.parseTimestamp = function(timestamp){
        var getTime = true, D = new Date(timestamp);
        
        if (arguments.length > 1) getTime = !!arguments[1];
        
        if (getTime){
            return D.getTime();
        } else {
            var format = "D, MMM d, yyyy HH:mm:ss P";
 
            format = format.replace(/[\w]*/gi, function(match){
                if (match in this._times) return this._times[match].call(this, D);
                return "";
            }.bind(this));
 
            return format.trim();
        }
    };
    
    this._colors = window.dev.colors;
    this._wds = window.dev.wds;
    this._i18no = window.dev.i18n;
    this._i18n = { msgs: {} };
    
    $.when(this._i18no.loadMessages("FandomToolbar"))
    .done(function(i18n){
        var msgs = i18n._messages.en;
        Object.keys(msgs).forEach(function(msg){
            this._i18n.msgs[msg] = {};
            this._i18n.msgs[msg].parse = i18n.msg(msg).parse();
            this._i18n.msgs[msg].escape = i18n.msg(msg).escape();
            this._i18n.msgs[msg].plain = i18n.msg(msg).plain();
            this._i18n.msgs[msg]._default = "escape";
            this._i18n.msgs[msg].replace = function(){
                var args = [].slice.call(arguments),
                    _msg = i18n.msg.apply(i18n, args),
                    _res = {};
                _res.parse = _msg.parse();
                _res.escape = _msg.escape();
                _res.plain = _msg.plain();
                return _res;
            };
        }, this);
    }.bind(this));
    
    this._i18n.msg = function(name, type){
        if (typeof type !== "string") type = "_default";
 
        if (!({}).hasOwnProperty.call(this._i18n.msgs, name)) return "";
        var msg = this._i18n.msgs[name], res = "";
 
        if (!({}).hasOwnProperty.call(msg, type)) type = "_default";
 
        if (type === "_default") type = msg[type];
 
        if (type === "replace"){
            var args = [].slice.call(arguments, 2);
            res = msg.replace.apply(msg, args);
        } else res = msg[type];
 
        return res;
    };
    
    ("parse plain escape").split(/\s+/g).forEach(function(key){
        this._i18n[key] = function(name){ return this._i18n.msg(name, key); };
    }, this);
    
    this._i18n.replace = function(){
        var msg = arguments[0], args = [].slice.call(arguments, 1);
        return this._i18n.msg.apply(this, [msg, "replace"].concat(args));
    };
    
    this.getMessage = function(name){
        var callback = null, msg, res;
        if (arguments.length > 1) callback = arguments[1];
        if (!_isset(name)) return "";
        
        if (typeof callback === "string"){
            return this._i18n.msg(name, callback);
        } else if (typeof callback === "function"){
            msg = this._i18n.msgs[name];
            res = callback.call(this, msg);
            
            if (!_isset(res)){
                return this._i18n.msg(name);
            }
            
            return res;
        }
    };
    
    function isAdmin(){
        var allowed = "staff helper wiki-manager vstf sysop".split(/\s+/g),
            i = 0;
        
        while (i < allowed.length){
            var right = allowed[i];
            if (this._userGroups.indexOf(right) > -1) return true;
            i++;
        }
        
        return false;
    }
    
    this._isAdmin = isAdmin.call(this);
    
    this._prefName = this._name + "-prefs";
    this._prefs = localStorage.getItem(this._prefName);
    
    this._hasPrefs = !!this._prefs;
    
    if (this._hasPrefs){
        this._prefs = safeJSONParse(this._prefs);
        if (this._prefs){
            this._prefCache = $.extend({}, this._prefCache, this._prefs);
            this._prefLoaded = true;
        }
    }
    
    if (this._prefsLoaded) this._prefDeferred.resolve(this._prefs);
    else {
        this._getPrefs(this._username, function(prefs){
            prefs.isAnon = this._username !== null;
            prefs.isAdmin = this._isAdmin;
            
            this._prefCache = $.extend({}, this._prefCache, prefs);
            this._prefLoaded = true;
            localStorage.setItem(this._prefName, JSON.stringify(prefs));
            this._prefDeferred.resolve(prefs);
        }.bind(this));
    }
    
    $.when(this._prefDeferred).always(function(options){
        if (_def(options.disabled, false) === true) return;
        
        this._toolbar = {};
        
        this._toolbar.isAdmin = _def(options.isAdmin, false);
        this._toolbar.isAnon = _def(options.isAnon, false);
        this._toolbar.showAvatar = _def(options.showAvatar, false);
        this._toolbar.showBackToTopButton = _def(options.showBackToTopButton, false);
        this._toolbar.items = _def(options.items, []);
        this._conditions = $.extend({}, window.ToolbarOptions);
        
        this.getNotificationData = function(callback){
            var deferred = $.Deferred(), data = [];
            
            $(".WikiaNotifications").each(function(){
                var $notification = $(this), $container = $notification.children("li");
                
                var notif = {};
                
                notif.$wrapper = $notification;
                notif.$container = $container;
                notif.dataType = $container.children("div").data("type");
                
                notif.dataType = parseInt(_def(notif.dataType, 2), 10);
                notif.content = $container.children("div").html();
                
                data.push(notif);
            });
            
            deferred.resolve(data);
            
            $.when(deferred).done(callback.bind(this));
        };
        
        this.filterMenuItems = function(items){
            var results = [].concat(item);
            
            results = results.filter(function(item){
                if (item.adminOnly && !this._toolbar.isAdmin) return false;
                
                if (item.page){
                    if (Array.isArray(item.page)){
                        var i = 0;
                        while (i < item.page.length){
                            if (item.page[i] === this._page) return true;
                            i++;
                        }
                        return false;
                    } else if (Object(item.page) instanceof String){
                        if (item.page === page) return true;
                        return false;
                    } else return false;
                }
                
                if (item.userOnly && this._toolbar.isAnon) return false;
                
                if (item.condition){
                    if (Object(item.condition) instanceof String){
                        if (item.condition in this._conditions){
                            var condition = this._conditions[item.condition];
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
            }, this);
            
            return result;
        };
        
        this._alwaysShow = ["following", "history", "what-links-here", "customize"];
        this._adminOnly = ["block", "delete", "wiki-features", "admin", "statistics"];
        this._noEdit = ["edit"];
        
        this.mapMenuItems = function(items){
            var results = [].concat(items);
            
            results = results.map(function(item){
                var id = item.id;
                
                if (this._alwaysShow.indexOf(id) > -1) item.condition = true;
                
                if (this._adminOnly.indexOf(id) > -1) item.condition = this._isAdmin;
                
                if (this._noEdit.indexOf(id) > -1) item.condition = this._action !== "edit";
                
                return item;
            }, this);
            
            function removeString(obj){
                return typeof obj !== "string";
            }
            
            results = results.filter(removeString);
            
            return results;
        };
        
        this._templates = {};
        
        this._templates.alwaysShow = {
            userOnly: true,
            condition: true
        };
        
        this._templates.adminOnly = {
            userOnly: true,
            adminOnly: true,
            condition: this._isAdmin
        };
        
        this._templates.noEdit = {
            userOnly: true,
            condition: this._action !== "edit"
        };
        
        this._handlers = {};
        
        this._handlers.customize = function(event){
            event.preventDefault();
            
            
        };
        
        this._handlers = $.extend({}, window.ToolbarHandlers, this._handlers);
        
        this.createItem = function(id){
            var _default = "alwaysShow", template, handler = null;
            
            if (arguments.length > 1){
                template = arguments[1];
                if (arguments.length > 2){
                    if (Object(arguments[2]) instanceof Function) handler = arguments[2].bind(this);
                }
            }
            
            if (!(template in this._templates)) template = _default;
            
            var item = {};
            
            item.id = id;
            item.title = this.getMessage("toolbar-item-" + id);
            if (item.handler){
                item.handler = handler;
            } else item.link = this.getMessage("toolbar-item-" + id + "-link");
            item = $.extend({}, item, this._templates[template]);
            
            return item;
        };
        
        this.fillMenuItems = function(items){
            var result = [], i = 0;
            
            while (i < this._alwaysShow.length){
                var as = this._alwaysShow[i],
                    args = [as, "alwaysShow"];
                if (as in this._handlers) args = args.concat(this._handlers[as].bind(this));
                result.push(this.createItem.apply(this, args));
                i++;
            }
            
            if (this._isAdmin){
                i = 0;
                while (i < this._adminOnly.length){
                    var ao = this._adminOnly[i],
                        args = [ao, "alwaysShow"];
                    if (ao in this._handlers) args = args.concat(this._handlers[ao].bind(this));
                    result.push(this.createItem.apply(this, args));
                    i++;
                }
            }
            
            if (this._action !== "edit"){
                i = 0;
                while (i < this._noEdit.length){
                    var ne = this._noEdit[i],
                        args = [ne, "noEdit"];
                    if (ne in this._handlers) args = args.concat(this._handlers[ne].bind(this));
                    result.push(this.createItem.apply(this, args));
                    i++;
                }
            }
            
            result = result.concat(items);
            
            return result;
        };
        
        this._toolbar.items = this.fillMenuItems.call(this, this._toolbar.items);
        
        this.getItems = function(callback){
            var deferred = $.Deferred();
            
            if (_def(this._toolbar.items, []).length === 0) deferred.reject([]);
            else {
                this._toolbar.items = this.mapMenuItems(this.filterMenuItems(this._toolbar.items));
                this._toolbar.length = this._toolbar.items.length;
                
                var i = 0;
                
                while (i < this._toolbar.length){
                    this._toolbar.items[i].index = i;
                    i++;
                }
                
                deferred.resolve(this._toolbar.items);
            }
            
            $.when(deferred).always(callback.bind(this));
        };
        
        this.renderItems = function(items){
            var amt = 2, count = _def(this._count, 4), c = 0, i = 0, j = 0,
                t = amt * count, a = [], l = items.length, curr = [];
            
            while (i < l){
                if (c === count && j < amt){
                    a.push(curr);
                    curr = [];
                    c = 0;
                    j++;
                }
                
                curr[c] = items[i];
                c++;
                if (i === items.length - 1) a.push(curr);
                i++;
            }
            
            return a;
        };
        
        this.getItems(function(items){
            this._toolbar.menu = {};
            
            var _items = this.renderItems(items);
            
            this._toolbar.menu.left = _items[0];
            this._toolbar.menu.right = _items[1];
            this._toolbar.menu.overflow = _def(_items[2], []);
            
            this._toolbar.render = function(){
                this._toolbar.$wrapper = $("<footer>", {
                    "class": "wds-toolbar__wrapper",
                    "id": "wds-toolbar__wrapper"
                });
                this._toolbar.$container = $("<nav>", {
                    "class": "wds-toolbar",
                    "id": "wds-toolbar"
                });
                this._toolbar.$collapse = $("<a>", {
                    "class": "wds-toolbar__collapse",
                    "id": "wds-toolbar__collapse",
                    "href": "#wds-toolbar",
                    html: this._toolbar.icon.collapse,
                    on: { "click": this._toolbar.collapse.bind(this) }
                });
                this._toolbar.$buttons = $("<nav>", {
                    "class": "wds-toolbar__buttons",
                    "id": "wds-toolbar__buttons"
                });
            };
            
            this._toolbar.icon = {};
            this._toolbar.icon.nav = this._wds.icon("fandom");
            this._toolbar.icon.collapse = this._wds.icon("menu-control");
            this._toolbar.icon.menu = this._wds.icon("menu");
            this._toolbar.icon.backToTop = this._wds.icon("menu-control");
            this._toolbar.icon.notification = this._wds.icon("bubble");
            
            this.getIcon = function(name){
                if (!(name in this._toolbar.icon)) return "";
                return this._toolbar.icon[name];
            };
            
            
            this.setIconAttr = function(icon, attrs){
                var $icon = $(icon);
                Object.keys((attrs = _def(attrs, {}))).forEach(function(name){
                    var value = attrs[name];
                    if (name === "size"){
                        $icon.attr({
                            "width": value,
                            "height": value
                        });
                    } else {
                        $icon.attr(name, value);
                    }
                }, this);
                
                return $icon.get(0);
            };
        });
    }.bind(this));
}).call((window.FandomToolbar = {}), window, jQuery, mw);