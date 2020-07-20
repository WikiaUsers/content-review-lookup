window.CMHLoaded = (function(window, $, mw){
    if ((config = $.extend({}, window.CMHConfig)).disable === true) return false;
    var nativeSort = Array.prototype.sort, slice = Array.prototype.slice, has = Object.prototype.hasOwnProperty;
    Array.prototype.sort = function(/*compareFn, thisArg*/){
        if (!arguments.length) return nativeSort.call(this);
        else if (arguments.length === 1){
            if (typeof arguments[0] !== "function" && typeof arguments[0] !== "undefined"){
                throw new TypeError("The comparison function must be either a function or undefined.");
            } else if (typeof arguments[0] === "function"){
                return nativeSort.call(this, arguments[0]);
            } else if (typeof arguments[0] === "undefined"){
                return nativeSort.call(this);
            }
        } else {
            var a = slice.call(arguments), context, compareFn, args, noContext = false;
            if (typeof a[0] !== "function"){
                throw new TypeError("The comparison function must be a function.");
            } else {
                compareFn = a[0];
                var last = a.length - 1;
                if (typeof a[last] === "boolean" && !a[last]) noContext = !a[last];
                context = noContext ? this : a[last];
                args = slice.call(a, 1, last - 1);
                return nativeSort.call(this, function(a, b){
                    return compareFn.apply(context, [a, b].concat(args));
                });
            }
        }
    };
    
    var CMH = {
        i18n: { msgs: {} },
        sort: {
            "alphabetical-desc": function(a, b){
                return -a.localeCompare(b);
            },
            "alphabetical-asc": function(a, b){
                return a.localeCompare(b);
            },
            "alphabetical": "alphabetical-asc",
            "abc": "alphabetical-asc",
            "abc-asc": "alphabetical-asc",
            "abc-desc": "alphabetical-desc",
            "random": function(){
                return CMH.rand(1, -1, "floor");
            }
        }
    };
    
    CMH.i18n.msg = function(name, type){
        if (typeof type !== "string") type = "_default";
        
        if (!has.call(CMH.i18n.msg, name)) return "";
        var msg = CMH.i18n.msg[name], res = "";
        
        if (!has.call(msg, type)) type = "_default";
        
        if (type === "_default") type = msg[type];
        
        
        if (type === "replace"){
            var args = [].slice.call(arguments, 2);
            res = msg.replace.apply(msg, args);
        } else res = msg[type]();
        
        return res;
    };
    
    CMH.i18n.replace = function(name){
        var args = slice.call(arguments, 1);
        return CMH.i18n.msg.apply(CMH.i18n.msg, [name, "replace"].concat(args));
    };
    
    ["parse", "plain", "escape"].forEach(function(key){
        CMH.i18n[key] = function(name){
            return CMH.i18n.msg(name, key);
        };
    });
    
    CMH.i18n.load = function(){
        mw.hook("dev.i18n").add(function(i18no){
            i18no.loadMessages("ChatModHover").done(CMH.i18n.getMessages);
        });
    };
    
    CMH.i18n.getMessages = function(i18n){
        var msgs = i18n._messages["en"];
        Object.keys(msgs).forEach(function(key){
            CMH.i18n.msgs[key] = {};
            CMH.i18n.msgs[key].parse = i18n.msg(key).parse();
            CMH.i18n.msgs[key].escape = i18n.msg(key).escape();
            CMH.i18n.msgs[key].plain = i18n.msg(key).plain();
            CMH.i18n.msgs[key]._default = "escape";
            CMH.i18n.msgs[key].replace = function(){
                var args = slice.call(arguments);
                return i18n.msgs.apply(i18n, args).parse();
            };
        });
    };
    
    CMH.i18n.init = $.Deferred();
    
    CMH.def = function def(){
        var args = slice.call(arguments), value;
        while (args.length){ 
            if ((value = args.shift()) && value !== null) return value; 
        }
        return null;
    };
    
    CMH.rand = function rand(max, min, round){
        if (typeof min === "boolean" || typeof min === "string"){
            round = min; min = false;
        }
        
        var res = 0, n = 0;
        
        if (typeof round === "undefined" || !round) round = false;
        if (typeof min === "undefined" || !min) min = false;
        
        if (min) n = (Math.random() * (max - min + 1)) + min;
        else n = Math.random() * max;
        
        if (round !== false){
            if (round === true || round === "round") res = Math.round(n);
            else if (round === "ceil") res = Math.ceil(n);
            else if (round === "floor") res = Math.floor(n);
            else res = Math.round(n);
        } else res = n;
        
        return res;
    };
    
    CMH.controller = function Controller(options){
        if (!(this instanceof CMH.controller)){
            return new CMH.controller(options);
        }
        options = $.extend({}, options);
        this.users = {};
        this.users.staff = [];
        this.users.vstf = [];
        this.users.helper = [];
        this.users["global-discussions-moderator"] = [];
        this.users["content-team-member"] = [];
        this.users["wiki-manager"] = [];
        this.users.bureaucrat = [];
        this.users.admin = [];
        this.users["discussions-moderator"] = [];
        this.users.threadmoderator = [];
        this.users.chatmoderator = [];
        this.users.rollback = [];
        this.users.bot = [];
        
        this._callbacks = {};
        this.state = "";
        this.cache = [];
        
        // Configurable properties
        this.exclude = CMH.def(options.exclude, []);
        this.delay = CMH.def(options.delay, 60000);
        this.sort = CMH.def(options.sort, false);
        
        // Elements
        this.$username = $(".username");
        this.$curr = null;
        return this;
    };
    
    CMH.controller.prototype = {
        constructor: CMH.controller,
        set currState(value){
            this.fire("statechange", { state: value });
            this.state = value;
        },
        load: function(){
            var keys = Object.keys(this.users), len = keys.length;
            for (var i = 0; i < len; i++){
                var group = keys[i];
                if (this.exclude.indexOf(group) === -1) this.loadData(group);
                this.fire("dataload", { current: i + 1, total: len });
                if (i === len - 1) this.fire("datacomplete");
            }
            return this;
        },
        loadData: function(group){
            $.ajax({
                method: "POST",
                dataType: "json",
                url: "/api.php",
                xhr: $.proxy(function(){
                    var xhr = $.ajaxSettings.xhr();
                    
                    xhr.addEventListener("progress", $.proxy(function(event){
                        this.fire("progress", event);
                    }, this));
                    
                    return xhr;
                }, this),
                data: {
                    format: "json",
                    action: "query",
                    list: "groupmembers",
                    gmgroups: ((group === "admin") ? "sysop" : group),
                    gmlimit: 500,
                    cb: Date.now()
                }
            }).done($.proxy(function(data){
                var users = data.users;
                while (users.length){
                    var user = users.shift();
                    if (this.users[group].indexOf(user.name))
                        this.users[group].push(user.name);
                }
                
                if (this.sort === false) return this;
                else if (this.sort === true) this.users[group].sort();
                else if (typeof this.sort === "string"){
                    var sort = "alphabetical-asc";
                    if (!has.call(CMH.sort, this.sort)){
                        if (typeof CMH.sort[this.sort] === "string"){
                            sort = CMH.sort[this.sort];
                            if (!has.call(CMH.sort, sort)) sort = CMH.sort["alphabetical-asc"];
                            else sort = CMH.sort[sort];
                        } else if (typeof CMH.sort[this.sort] === "function"){
                            sort = CMH.sort[this.sort];
                        } else sort = CMH.sort[sort];
                    } else sort = CMH.sort[sort];
                    if (typeof sort === "function") this.users[group].sort(sort, this);
                } else return this;
                
                this.fire("dataadd", this.init.resolve);
            }, this));
        },
        fire: function(name){
            var args = slice.call(arguments, 1);
            name = name.split(" ");
            if (name.length === 1) name = name[0];
            if (typeof name === "string"){
                if (!has.call(this._callbacks, name)) this._callbacks[name] = $.Callbacks("memory");
                this._callbacks[name].fireWith(this, args);
            } else if (Object(name) instanceof Array) {
                name.forEach(function(key){
                    if (!has.call(this._callbacks, key)) this._callbacks[key] = $.Callbacks("memory");
                    this._callbacks[key].fireWith(this, args);
                }, this);
            } else return this;
            return this;
        },
        on: function(name){
            name = name.split(" ");
            if (name.length === 1) name = name[0];
            if (typeof name === "string"){
                if (!has.call(this._callbacks, name)) this._callbacks[name] = $.Callbacks("memory");
                this._callbacks[name].add(callback);
            } else if (Object(name) instanceof Array) {
                name.forEach(function(key){
                    if (!has.call(this._callbacks, key)) this._callbacks[key] = $.Callbacks("memory");
                    this._callbacks[key].add(callback);
                }, this);
            } else return this;
            return this;
        },
        check: function(){
            this.$username.each($.proxy(function(index, elem){
                this.$curr = $(elem);
                if (
                    (this.$curr.parents().eq(1).attr("id") !== "WikiChatList") ||
                    (this.$curr.attr("title"))
                ) return;
                
                var username = this.$curr.text();
                
                Object.keys(this.users).forEach(function(group){
                    if (
                        this.is(username, group) && 
                        (this.cache.indexOf(username) === -1)
                    ){
                        this.$curr.attr("title", CMH.i18n.escape(group));
                        if (group !== "chatmoderator"){
                            var claz = this.$curr.parent("#Rail [data-user]").attr("class");
                            claz = claz.replace("chatmoderator", group);
                            this.$curr.parent("#Rail [data-user]").attr("class", claz);
                        }
                        this.cache.push(username);
                    }
                }, this);
            }, this));
        },
        init: $.Deferred()
    };
    
    $(CMH.i18n.load);
    
    $.when(CMH.i18n.init).done(function(){
        var $controller = CMH.controller(config);
        
        $controller.load();
        
        $.when($controller.init).done(function(){
            $controller.check();
        });
        
        window.CMH = CMH;
    });
    return true;
}(window, this.jQuery, this.mw));