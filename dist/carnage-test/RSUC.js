require(["wikia.window", "jquery", "mw"], function(window, $, mw){
    var namespaces = mw.config.get("wgFormattedNamespaces"),
        page = mw.config.get("wgPageName"),
        specialPage = mw.config.get("wgCanonicalSpecialPageName"),
        cityId = mw.config.get("wgCityId"),
        scriptPath = mw.config.get("wgScriptPath"),
        has = ({}).hasOwnProperty,
        slice = [].slice;
    
    if ("RSUC" in window) return;
    
    function regesc(string){
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    
    var RSUC = {};
    
    RSUC.name = "RollbackSpamUserContribs";
    
    RSUC.version = "v1.1";
    
    (function(){
        this.msgs = {};
        
        this.msg = function(name, type){
            if (typeof type !== "string") type = "_default";
 
            if (!has.call(this.msgs, name)) return "";
            var msg = this.msgs[name], res = "";
        
            if (!has.call(msg, type)) type = "_default";
        
            if (type === "_default") type = msg[type];
        
            if (type === "replace"){
                var args = [].slice.call(arguments, 2);
                res = msg.replace.apply(msg, args);
            } else res = msg[type];
        
            return res;
        };
 
        this.replace = function(name){
            var args = slice.call(arguments, 1);
            return this.msg.apply(this.msg, [name, "replace"].concat(args));
        };
 
        ["parse", "plain", "escape"].forEach(function(key){
            this[key] = function(name){
                return this.msg(name, key);
            };
        }, this);
 
        this.load = function(){
            var ctx = this;
            mw.hook("dev.i18n").add(function(i18no){
                i18no.loadMessages(RSUC.name).done($.proxy(ctx.getMessages, ctx));
            });
        };
 
        this.getMessages = function(_i18n){
            var msgs = _i18n._messages.en;
            Object.keys(msgs).forEach(function(key){
                this.msgs[key] = {};
                this.msgs[key].parse = _i18n.msg(key).parse();
                this.msgs[key].escape = _i18n.msg(key).escape();
                this.msgs[key].plain = _i18n.msg(key).plain();
                this.msgs[key]._default = "escape";
                this.msgs[key].replace = function(){
                    var args = slice.call(arguments);
                    return _i18n.msgs.apply(_i18n, args).parse();
                };
            }, this);
            this.init.resolve();
        };
 
        this.init = $.Deferred();
    }).call((RSUC.i18n = {}));
    
    function DEF(){
        var i = 0;
        while (i < arguments.length){
            if (arguments[i] === void 0 || arguments[i] === null){
                i++;
                continue;
            }
            return arguments[i];
        }
        return null;
    }
    
    RSUC.Logger = function(name){
        if (!(this instanceof RSUC.Logger)) return new RSUC.Logger(name);
        var options = {};
        if (arguments.length === 0) return false;
        else if (arguments.length === 2 && $.isPlainObject(arguments[1])) 
            $.extend(options, arguments[1]);
        this.type = name;
        this.message = DEF(options.message, options.msg, "");
        return this;
    };
    
    (function(){
        this.constructor = RSUC.Logger;
        
        this.msg = function(msg){
            if (arguments.length === 0) return this;
            this.msg = DEF(msg, this.msg);
            return this;
        };
        
        this.msgFrom = function(name){
            if (arguments.length === 0) return this;
            var msg = RSUC.i18n.msg(name);
            this.msg = DEF(msg, this.msg);
            return this;
        };
        
        this.send = function(selector){
            var $selector = null;
            if (selector instanceof jQuery) $selector = selector;
            else $selector = $(selector);
            
            if ($selector !== null){
                var $msg = $("<div>", { "class": "rsuc-log" }).html(this.msg);
                $msg.addClass("rsuc-log-" + this.type);
                $selector.append($msg);
            } else {
                if (this.type in console){
                    if (this.type === "assert") return this;
                    console[this.type](this.msg);
                } else console.log(this.msg);
            }
            return this;
        };
        
        this.sendTo = function(selector){
            if (arguments.length === 0) return this;
            this.send(selector);
            return this;
        };
        
        this.end = function(){
            this.msg = null;
            this.type = null;
            return void 0;
        };
    }).call(RSUC.Logger.prototype);
    
    RSUC.Controller = function(username, reason){
        if (!(this instanceof RSUC.Controller))
            return new RSUC.Controller(username, reason);
        username = DEF(username, "");
        reason = DEF(reason, "");
        this.username = username;
        this.reason = reason;
        this.contribs = [];
        this.token = null;
        this.target = "";
        this.limit = 500;
        this._delay = 0;
        this._timeout = null;
        return this;
    };
    
    (function(){
        this.constructor = RSUC.Controller;
        
        this.delay = function(delay){
            var value = 0;
            if (isNaN((value = DEF(delay, Infinity))) || !isFinite(value)) return this;
            this.delay = Number(value);
            return this;
        };
        
        this.init = function(limit){
            if (this._delay > 0 && isFinite(this._delay)){
                this._timeout = setTimeout((function(){
                    clearTimeout(this._timeout);
                    this._timeout = null;
                    this.getContribInfo(limit);
                }).bind(this), this._delay);
            } else this.getContribInfo(limit);
        };
        
        this.getContribInfo = function(limit){
            var l = 0;
            $.ajax({
                method: "GET",
                dataType: "json",
                url: scriptPath + "/api.php",
                data: {
                    action: "query",
                    list: "usercontribs",
                    ucuser: this.username,
                    uclimit: (l = DEF(limit, this.limit)) > 500 ? this.limit : l,
                    ucdir: "newer",
                    format: "json"
                }
            }).done(this.searchAndDestroy.bind(this));
            
            $.ajax({
                method: "GET",
                dataType: "json",
                url: scriptPath + "/api.php",
                data: {
                    action: "query",
                    list: "allusers",
                    aufrom: encodeURIComponent(this.username),
                    format: "json"
                }
            }).done(this.searchDicussions.bind(this));
        };
        
        this.searchAndDestroy = function(data){
            var query = "query" in data && data.query;
            
            if (!query) return this.sendError(RSUC.i18n.msg("query-error"));
            
            var contribs = "contribs" in query && query.contribs;
            
            if (!contribs) return this.sendError(RSUC.i18n.msg("contribs-not-count"));
            
            contribs.forEach(function(contrib){
                var title = contrib.title, user = contrib.user,
                    contribInfo = new mw.Title(title);
                contribInfo.fullNamespace = namespaces[contribInfo.namespace];
                
                if (contribInfo.fullNamespace !== "File"){
                    $.ajax({
                        method: "GET",
                        dataType: "json",
                        url: scriptPath + "/api.php",
                        data: {
                            action: "query",
                            prop: "revisions",
                            rvtoken: "rollback",
                            titles: encodeURIComponent(title),
                            rvuser: user,
                            rvprop: "ids",
                            indexpageids: true,
                            format: "json"
                        }
                    }).done((function(res){
                        var q = "query" in res && res.query;
                        
                        if (!q) return this.sendError(RSUC.i18n.msg("rev-query-error"));
                        
                        var pages = "pages" in q && q.pages,
                            pageid = q.pageids[0];
                        
                        if (!pages || "-1" in pages) return this.sendError(RSUC.i18n.msg("rev-page-missing-error"));
                        
                        var page = pages[pageid],
                            rev = "revisions" in page && page.revisions;
                        
                        if (!rev) return this.sendError(RSUC.i18n.msg("rev-notfound-error"));
                        
                        var token = encodeURIComponent(rev[0].rollbackToken);
                        
                        contribInfo.token = token;
                        
                        $.ajax({
                            method: "POST",
                            dataType:"json",
                            url: scriptPath + "/api.php",
                            data: {
                                action: "rollback",
                                title: encodeURIComponent(title),
                                user: user,
                                markbot: true,
                                format: "json",
                                token: token
                            }
                        }).done((function(res){
                            if ("error" in res){
                                if (res.error == "onlyauthor"){
                                    $.ajax({
                                        method: "POST",
                                        dataType: "json",
                                        url: scriptPath + "/api.php",
                                        data: {
                                            action: "delete",
                                            title: encodeURIComponent(title),
                                            token: mw.user.tokens.get("editToken"),
                                            tags: "apiedit",
                                            reason: this.reason
                                        }
                                    });
                                }
                            }
                            this.contribs.push(contribInfo);
                        }).bind(this));
                    }).bind(this));
                } else {
                    $.when($.ajax({
                        method: "POST",
                        dataType: "json",
                        url: "/index.php",
                        data: {
                            title: encodeURIComponent(title),
                            action: "delete",
                            wpEditToken: mw.user.tokens.get("editToken"),
                            wpDeleteReasonList: "other",
                            wpReason: this.reason,
                            wpWatch: true
                        }
                    }), $.ajax({
                        method: "POST",
                        dataType: "json",
                        url: "/api.php",
                        data: {
                            title: encodeURIComponent(title),
                            action: "delete",
                            token: mw.user.tokens.get("editToken")
                        }
                    })).done((function(){
                        contribInfo.token = mw.user.tokens.get("editToken");
                        this.contribs.push(contribInfo);
                    }).bind(this));
                }
            }, this);
        };
        
        this.searchDiscussions = function(data){
            var query = "query" in data && data.query;
            
            if (!query) return this.sendError(RSUC.i18n.msg("dis-query-error"));
            
            var au = "allusers" in query && query.allusers;
            
            if (!au) return this.sendError(RSUC.i18n.msg("dis-au-error"));
            
            var username = au[0].name, id = au[0].id;
            
            if (username === this.username){
                var url = "https://services.wikia.com/discussion/";
                url += cityId + "/users/";
                url += id + "/posts/delete";
                
                $.ajax({
                    url: url,
                    crossDomain: true,
                    type: "PUT",
                    xhrFields: {
                        withCredentials: true
                    }
                });
            }
        };
        
        this.sendError = function(text){
            if (DEF(text, "") === "") return;
            
            var err = RSUC.Logger("error");
            err.msg(text);
            err.send().end();
            return this;
        };
    }).call(RSUC.Controller.prototype);
    
    RSUC.Loader = function(){
        if (!(this instanceof RSUC.Loader)) return new RSUC.Loader();
        
        this.isBlock = (specialPage === "Block");
        this.isContributions = (specialPage === "Contributions");
        this._delay = 0;
        this._timeout = null;
        this._deferred = $.Deferred();
        return this;
    };
    
    (function(){
        this.delay = function(delay){
            var value = 0;
            if (isNaN((value = DEF(delay, Infinity))) || !isFinite(value)) return this;
            this.delay = Number(value);
            return this;
        };
        
        this.init = function(){
            if (this._delay > 0 && isFinite(this._delay)){
                this._timeout = setTimeout((function(){
                    clearTimeout(this._timeout);
                    this._timeout = null;
                    this.emit();
                    this._deferred.resolve();
                }).bind(this), this._delay);
            } else {
                this.emit();
                this._deferred.resolve();
            }
            return this;
        };
        
        this.emit = function(){
            var rspecialblock = new RegExp(regesc(RSUC.i18n.msg("special-block")) + "\\/(.*)"),
                rspecialcontribs = new RegExp(regesc(RSUC.i18n.msg("special-contribs")) + "\\/(.*)");
            
            if (this.isBlock && rspecialblock.test(page)){
                this.insertB();
            } else if (this.isContribs && rspecialcontribs.test(page)){
                this.insertC(rspecialcontribs);
            }
        };
        
        this.insertB = function(){
            var rollbackText = RSUC.i18n.msg("rsuc-text"),
                value = $("#mw-bi-target").val();
            $(".mw-ipb-conveniencelinks").append(
                "|",
                $("<a>", { "href": "#", text: rollbackText })
                    .on("click", this.rollback.bind(this, value))
            );
        };
        
        this.insertC = function(pattern){
            var rollbackText = RSUC.i18n.msg("rsuc-text"),
                value = pattern.exec(page)[1],
                $target = null;
            if ($(".chat-change-ban").length){
                $target = $(".chat-change-ban");
            } else {
                $target = $(".chat-ban-log");
            }
            
            $target.after(
                " | ",
                $("<a>", { "href": "#", text: rollbackText })
                    .on("click", this.rollback.bind(this, value))
            )
        };
        
        this.rollback = function(username, event){
            event.preventDefault();
            // Temporary solution until a user interface is created
            var reason = prompt(RSUC.i18n.replace("rsuc-reason-prompt"));
            
            if (DEF(reason, "") === "") reason = RSUC.i18n.msg("def-reason");
            
            var controller = RSUC.controller(username, reason);
            
            controller.delay(700).init();
            
            return this;
        };
        
        this.done = function(callback){
            $.when(this._deferred).done(callback.bind(this));
        };
    }).call(RSUC.Loader.prototype);
    
    $(document).ready(function(){
        var Loader = RSUC.Loader();
        
        Loader.delay(600).init();
        
        window.RSUC = window.RollbackSpamUserContribs = RSUC;
    });
});