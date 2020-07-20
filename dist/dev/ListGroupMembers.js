window.LGMLoaded = (function(window, $, mw){
    if (mw.config.get('wgNamespaceNumber') !== -1 || mw.config.get('wgTitle') !== 'BlankPage/LGM') {
        return false;
    }
    
    importArticle({ 
        type: "script",
        article: "u:dev:MediaWiki:I18n-js/code.js"
    }, {
        type: "style",
        article: "u:dev:MediaWiki:ListGroupMembers.css"
    });
 
    var a = [], slice = a.slice, indexOf = a.indexOf,
        nsort = a.sort, each = a.forEach,
        o = {}, has = o.hasOwnProperty;
 
    Array.prototype.sort = function sort(compareFn){
        var T, A, thisArg, ctx, noctx;
 
        if (arguments.length > 1) T = arguments[1];
        else T = this;
 
        if (typeof compareFn === "function"){
            if (T === this) return nsort.call(T, compareFn);
            else {
                A = slice.call(arguments, 2);
                noctx = false;
 
                if (typeof T === "boolean"){
                    if (!T) noctx = true;
                    else ctx = window;
                } else ctx = T;
 
                if (noctx) ctx = this;
 
                return nsort.call(this, function(a, b){
                    return compareFn.apply(ctx, [a, b].concat(A));
                });
            }
        } else if (typeof compareFn === "undefined"){
            return nsort.call(this);
        } else {
            throw new TypeError("The comparison function must be either a function or undefined.");
        }
    };
 
    var LGM = {
        name: "ListGroupMembers",
        version: "v1.0.0a"
    };
 
    var i18n = { msgs: {} };
 
    i18n.msg = function(name, type){
        if (typeof type !== "string") type = "_default";
 
        if (!has.call(i18n.msgs, name)) return "";
        var msg = i18n.msgs[name], res = "";
 
        if (!has.call(msg, type)) type = "_default";
 
        if (type === "_default") type = msg[type];
 
        if (type === "replace"){
            var args = [].slice.call(arguments, 2);
            res = msg.replace.apply(msg, args);
        } else res = msg[type];
 
        return res;
    };
 
    i18n.replace = function(name){
        var args = slice.call(arguments, 1);
        return i18n.msg.apply(i18n.msg, [name, "replace"].concat(args));
    };
 
    ["parse", "plain", "escape"].forEach(function(key){
        i18n[key] = function(name){
            return i18n.msg(name, key);
        };
    });
 
    i18n.load = function(){
        mw.hook("dev.i18n").add(function(i18no){
            i18no.loadMessages("ListGroupMembers").done(i18n.getMessages);
        });
    };
 
    i18n.getMessages = function(_i18n){
        var msgs = _i18n._messages["en"];
        Object.keys(msgs).forEach(function(key){
            i18n.msgs[key] = {};
            i18n.msgs[key].parse = _i18n.msg(key).parse();
            i18n.msgs[key].escape = _i18n.msg(key).escape();
            i18n.msgs[key].plain = _i18n.msg(key).plain();
            i18n.msgs[key]._default = "escape";
            i18n.msgs[key].replace = function(){
                var args = slice.call(arguments);
                return _i18n.msgs.apply(_i18n, args).parse();
            };
        });
        i18n.init.resolve();
    };
 
    i18n.init = $.Deferred();
 
    LGM.i18n = i18n;
 
    function def(){
        var args = slice.call(arguments);
        while (args.length){ 
            if ((value = args.shift()) && value !== null) return value; 
        }
        return null;
    }
 
    LGM.def = def;
 
    function merge(){
        var res = [], args = slice.call(arguments);
 
        while (args.length){
            var value = args.shift();
 
            if (Object(value) instanceof Array) res = res.concat(value);
        }
 
        return res;
    }
 
    LGM.merge = merge;
 
    function rand(max, min, round){
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
    }
 
    LGM.rand = rand;
 
    var support = {};
 
    support.dateNow = (function(){
        try { Date.now(); return true; }
        catch (ignore){ return false; }
    }());
 
    if (!support.dateNow) Date.now = function(){
        return (new Date()).getTime();
    };
 
    LGM.sort = {
        "alphabetical-desc": function(a, b){
            return -a.username.localeCompare(b.username);
        },
        "alphabetical-asc": function(a, b){
            return a.username.localeCompare(b.username);
        },
        "alphabetical": "alphabetical-asc",
        "abc": "alphabetical-asc",
        "abc-asc": "alphabetical-asc",
        "abc-desc": "alphabetical-desc",
        "random": function(){
            return rand(1, -1, "floor");
        }
    };
 
    LGM.controller = function(options){
        if (!(this instanceof LGM.controller)){
            return new LGM.controller(options);
        }
 
        this.users = {};
        this.cache = [];
        this._callbacks = {};
        this.sort = def(options.sort, false);
        this.excludeRights = def(options.excludeRights, []);
        this.rights = merge(options.rights, ["staff", "helper", "wiki-manager", "vstf", "global-discussions-moderator", "bureaucrat", "sysop", "discussions-moderator", "chatmoderator", "rollback", "bot", "content-team-member"]);
        this.cols = def(options.cols, 4);
        this.loaded = false;
        return this.process();
    };
 
    LGM.controller.prototype = {
        constructor: LGM.controller,
        process: function(){
            each.call(this.rights, function(group){
                this.users[group] = [];
            }, this);
            return this;
        },
        load: function(){
            var keys = Object.keys(this.users), len = keys.length;
            for (var i = 0; i < len; i++){
                var group = keys[i];
                this.loadData(group);
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
                    if (this.cache.indexOf(user.name) === -1){
                        this.cache.push(user.name);
                        this.loadAvatar(user.name, group);
                    }
                }
 
                this.on("dataadd", $.proxy(this.init.resolve, this.init));
            }, this));
        },
        loadAvatar: function(username, group){
            $.ajax({
                method: "GET",
                dataType: "json",
                url: "/wikia.php",
                data: {
                    controller: "UserProfilePage",
                    method: "renderUserIdentityBox",
                    format: "json",
                    title: "User:" + username
                }
            }).done($.proxy(function(data){
                this.users[group].push({
                    username: username,
                    avatar: data.user.avatar
                });
            }, this));
        },
        hasUser: function(username, group){
            var target = [].concat(this.users[group]), res = false;
 
            while (target.length){
                var value = target.shift();
 
                if (value.username === username){
                    res = true;
                    break;
                }
            }
 
            return res;
        },
        getSort: function(sort){
            var d = "";
 
            if (sort === false) return false;
            else if (sort === true) return true;
            else if (typeof sort === "string"){
                d = "alphabetical-asc";
                if (!has.call(LGM.sort, sort)) sort = LGM.sort[d];
                else {
                    if (typeof LGM.sort[sort] === "string"){
                        sort = LGM.sort[sort];
                        if (!has.call(LGM.sort, sort)) sort = LGM.sort[d];
                        else sort = LGM.sort[sort];
                    } else if (typeof LGM.sort === "function"){
                        sort = LGM.sort[sort];
                    } else sort = LGM.sort[d];
                }
            } else return false;
 
            return sort;
        },
        createUI: function(){
            this.ui = LGM.ui();
 
            each.call(Object.keys(this.users), function(group){
                this.ui.createSection(group, {
                    name: group,
                    length: this.users[group].length
                });
 
                var target = this.users[group];
 
                if (this.sort){
                    var sortFn;
                    if (typeof this.sort === "function"){
                        sortFn = this.sort;
                    } else sortFn = this.getSort(this.sort);
 
                    if (sortFn === false || sortFn === null) sortFn = false;
                    else if (sortFn === true) target.sort();
                    else target.sort(sortFn, this);
                }
 
                var j = 0, k = 0;
 
                this.ui.addRow(group);
 
                for (var i = 0; i < target.length; i++){
                    var item = target[i];
 
                    if (j === this.cols){
                        j = 0; k++;
                        this.ui.addRow(group);
                    }
 
                    this.ui.addItem(item, group, [j, k]);
                    j++;
                }
            }, this);
            return this;
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
        on: function(name, callback){
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
        init: function(){
            this.ui.insertUI();
            return this;
        }
    };
 
    LGM.ui = function(){
        if (!(this instanceof LGM.ui)){
            return new LGM.ui();
        }
 
        this.sections = {};
        this.create();
        return this;
    };
 
    LGM.ui.prototype = {
        constructor: LGM.ui,
        create: function(){
            this.$wrapper = $("<div>", { "class": "LGM_wrapper" });
            this.$content = $("<section>", { "class": "LGM_content" });
            this.$sections = [];
            return this;
        },
        createSection: function(group, config){
            if (has.call(this.sections, group)) return;
 
            this.sections[group] = $.extend({ 
                items: []
            }, config);
 
            return this;
        },
        createRow: function(group){
            var row = [];
            row.group = group;
            this.sections[group].items.push(row);
        },
        createItem: function(obj, group, indices){
            var col = indices[0], row = indices[1];
            this.sections[group].items[row][col] = $.extend({}, obj);
            this.sections[group].items[row][col].row = row;
            this.sections[group].items[row][col].col = col;
            this.sections[group].items[row][col].title = i18n.msg(group);
            this.sections[group].items[row][col].group = group;
        },
        insertUI: function(){
            each.call(Object.keys(this.sections).filter(function(group){
                return this.sections[group].items.every(function(item){
                    return item.length > 0;
                }, this);
            }, this), function(group){
                var $section = $("<section>", { "class": "LGM_section" }),
                    obj = this.sections[group],
                    rows = obj.items;
 
                var $title = $("<h3>", { "class": "LGM_heading" }),
                    $title_heading = $("<span>", { "class": "LGM_title" }),
                    $title_bubble = $("<span>", { "class": "LGM_bubble" });
                    
                $title_heading.text(i18n.msg(obj.name));
                $title_bubble.text(obj.length);
                
                $title.html([$title_heading, $title_bubble]);
 
                var $content = $("<div>", { "class": "LGM_section_content" });
 
                each.call(rows, function(row, index){
                    var $row = $("<ul>", { "class": "LGM_row" });
 
                    $row.attr("id", "LGM_row_" + index);
 
                    each.call(row, function(item, i){
                        var $item = $("<li>", { "class": "LGM_col" });
 
                        $item.attr("id", "LGM_row_" + index + "_" + i);
 
                        $item.html([
                            $("<div>", { "class": "LGM_avatar_wrapper" })
                                .html(
                                    $("<img>", { "class": "LGM_avatar" })
                                        .attr("src", item.avatar)
                                ),
                            $("<div>", { "class": "LGM_user_wrapper" })
                                .html([
                                    $("<span>", { "class": "LGM_user" })
                                        .text(item.username),
                                    $("<span>", { "class": "LGM_group" })
                                        .text(i18n.msg(group))
                                ])
                        ]);
 
                        $row.append($item);
                    }, this);
 
                    $content.append($row);
                }, this);
 
                $section.html([$title, $content]);
 
                this.$sections.push($section);
            }, this);
 
            this.$content.html(this.$sections);
 
            this.$wrapper.html(this.$content);
 
            $("#mw-content-text").html(this.$wrapper);
        }
    };
 
    each.call([["addRow", "createRow"], ["addItem", "createItem"]], function(d){
        LGM.ui.prototype[d[0]] = LGM.ui.prototype[d[1]];
    })
 
    $(function(){
        LGM.i18n.load();
 
        var config = $.extend({ sort: "abc" }, window.LGMConfig),
            Controller = LGM.controller(config);
 
        Controller.load();
 
        var timeout = setTimeout(function(){
            clearTimeout(timeout);
 
            Controller.createUI().init();
        }, 6000);
 
        window.LGMController = Controller;
        window.LGM = LGM;
    });
 
    return true;
}(window, window.jQuery, window.mediaWiki));