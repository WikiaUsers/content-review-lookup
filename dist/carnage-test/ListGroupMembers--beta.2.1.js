require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw",
    "wikia.mustache",
    require.optional("BannerNotification"),
    require.optional("ext.wikia.design-system.loading-spinner")
], function(wk, wd, $, mw, Mustache, BannerNotification, Spinner){
    // Create the main and utility objects
    var _ = {}, _u = {};
    /* Utility */
    _u.compose = function compose(f, g){
        f = typeof f === "function" ? f : _u.noop;
        g = typeof g === "function" ? g : _u.noop;
        return function helper(){
            var a = _u.getArgs(arguments), value = g.apply(this, a);
            return f(value);
        };
    };
    _u.composeAll = function composeAll(){
        var fns = _u.getArgs(arguments);
        fns = fns.map(function(fn){
            return typeof fn === "function" ? fn : _u.noop;
        });
        return function helper(){
            var a = _u.getArgs(arguments), ctx = this;
            return fns.reduceRight(function(val, f){
                return f.apply(ctx, val);
            }, a);
        };
    };
    _u.pipe = function pipe(f, g){
        f = typeof f === "function" ? f : _u.noop;
        g = typeof g === "function" ? g : _u.noop;
        return function helper(){
            var a = _u.getArgs(arguments), value = f.apply(this, a);
            return g(value);
        };
    };
    _u.pipeAll = function pipeAll(){
        var fns = _u.getArgs(arguments);
        fns = fns.map(function(fn){
            return typeof fn === "function" ? fn : _u.noop;
        });
        return function helper(){
            var a = _u.getArgs(arguments), ctx = this;
            return fns.reduce(function(val, f){
                return f.apply(ctx, val);
            }, a);
        };
    };
    _u.curry = function curry(fn){
        var a1 = _u.getArgs(arguments).slice(1);
        return function helper(){
            var a2 = _u.getArgs(arguments);
            return fn.apply(this, a1.concat(a2));
        };
    };
    _u.revcurry = function curry(fn){
        var a1 = _u.getArgs(arguments).slice(1);
        return function helper(){
            var a2 = _u.getArgs(arguments);
            return fn.apply(this, a2.concat(a1));
        };
    };
    _u.isNumber = function isNumber(number){
        return !isNaN(number) || isFinite(number);
    };
    _u.flatten = function flatten(array, depth){
        depth = parseInt(depth, 10);
        var d = _u.isNumber(depth) ? (depth < 0 ? 0 : depth) : 1;
        return d > 0 ? array.reduce(function(arr, value){
            return arr.concat(Array.isArray(value) ? flatten(value, d - 1) : value);
        }, []) : array.slice();
    };
    _u.getArgs = function getArgs(args){
        return "from" in Array ? Array.from(args) : [].slice.call(args);
    };
    _u.flattenArgs = _u.compose(_u.flatten, _u.getArgs);
    _u.isset = function isset(value){
        var a = _u.getArgs(arguments);
        return typeof value !== "undefined" || value !== null;
    };
    _u.issetSome = function issetSome(){
        var a = _u.flattenArgs(arguments);
        return a.some(_u.isset);
    };
    _u.issetAll = function issetAll(){
        var a = _u.flattenArgs(arguments);
        return a.every(_u.isset);
    };
    _u.noop = function noop(){};
    _u.clamp = function clamp(value, min, max){
        return Math.max(min, Math.min(value, max));
    };
    _u.range = function range(min, max, step){
        var x = _u.isNumber(min) ? min : 0,
            y = _u.isNumber(max) ? max : 1,
            i, l, a = [];
        min = Number(y < x ? y : x);
        max = Number(y < x ? x : y);
        step = Number(_u.isNumber(step) ? step : 1);
        for (i = min, l = max; i <= l; step !== 1 ? i += step : i++){
            a.push(i);
        }
        return a;
    };
    _u.rand = function rand(min, max){
        var x = _u.isNumber(min) ? min : 0,
            y = _u.isNumber(max) ? max : 1;
        min = Number(y < x ? y : x);
        max = Number(y < x ? x : y);
        if (min === 0 && max === 1) return Math.random();
        return (Math.random() * (max - min + 1)) + min;
    };
    _u.randInt = function randInt(min, max){
        var fn = _u.compose(Math.round, _u.rand);
        return fn.call(this, max, min);
    };
    _u.commafy = function(number){
        var n = String(n).split('.'), num = n[0], dec = n[1], r, s, t;
        if (num.length > 3){
            s = num.length % 3;
            if (s === 0){
                t = num.substring(0, s);
                num = t + num.substring(s).replace(/(\d{3})/g, ",$1");
            } else {
                num = num.substring(s).replace(/(\d{3})/g, ",$1").substring(1);
            }
        }
        return num + (dec ? '.' + dec : '');
    };
    _u.now = function now(){
        return "now" in Date ? Date.now() : (new Date()).getTime();
    };
    _u.promisify = function promisify(deferred){
        return new Promise(function(resolve, reject){
            $.when(deferred).done(resolve).fail(reject);
        });
    };
    _u.parseHTML = function parseHTML(content){
        content = typeof content === "function" ?
            _u.getString(content) : content;
        var parser, doc, result;
        if ('DOMParser' in wk){
            parser = new DOMParser();
            doc = parser.parseFromString(content, "text/html");
        } else {
            doc = wd.implementation.createHTMLDocument('user');
            doc.body.innerHTML = content;
        }
        return doc.body.firstElementChild || doc.body.firstChild;
    };
    _u.getString = function(content){
        var result;
        return typeof content === "function" ? (
            (_u.isset((result = content.call(this))) &&
                typeof result === "string" ? 
                result : (typeof result !== "undefined" 
                    ? String(result) : "")
        )) : String(content);
    };
    /* Core */
    // Configuration object
    _.config = Object.assign({}, wk.lgmconfig);
    // Options
    _.options = {};
    // Version of the script
    _.version = "v1.5.0";
    // Name of the script
    _.name = "ListGroupMembers";
    // Default scripts needed to run the script
    _.scripts = Object.freeze([
        "u:dev:MediaWiki:I18n-js/code.js",
        "u:dev:MediaWiki:WDSIcons/code.js",
        "u:dev:MediaWiki:Colors/code.js"
    ]);
    // The script object
    _.scriptObj = Object.freeze({
        type: 'script',
        articles: _.scripts
    });
    // Default stylesheets to load
    _.stylesheets = Object.freeze([
        "u:dev:MediaWiki:ListGroupMembers.css"
    ]);
    // The style object
    _.styleObj = Object.freeze({
        type: 'style',
        articles: _.stylesheets
    });
    // Checks if the script should be loaded
    _.toLoad = !_.config.disabled || !_u.isset(wk.ListGroupMembers);
    // Development version
    _.devVersion = _.config.devVersion || "stable";
    // Double-run protection
    if (!_.toLoad) return;
    // Creating canonical developer versions
    _.devVersions = Object.freeze({
        "dev": "dev.js",
        "beta": "beta.js",
        "legacy": "legacy.js"
    });
    if (_.devVersion in _.devVersions){
        return importArticle({
            type: "script",
            article: "u:dev:MediaWiki:ListGroupMembers/" + 
                _.devVersions[_.devVersion]
        });
    }
    // Importing the utility object
    _.util = Object.assign({}, _u);
    // Deferred hook objects
    _.deferred = {};
    // I18n object
    _.i18n = {};
    // Cache object
    _.cache = [];
    // Callbacks object
    _.callbacks = {};
    // User collection object
    _.users = {};
    // The timeout object
    _.timeout = null;
    // Content selector
    _.$content = null;
    // Default configurations
    _.defaults = Object.freeze({
        sort: false,
        grouped: true,
        rights: [
            "staff", "helper", "wiki-manager", "vstf", "global-discussions-moderator",
            "bureaucrat", "sysop", "discussions-moderator", "chatmoderator",
            "rollback", "bot"
        ],
        visibleGroups: [],
        exclude: [],
        actions: ["profile", "talk", "contributions"],
        loadlimit: 500,
        userlimit: Infinity,
        cols: 'responsive',
        maxrows: Infinity,
        lazyload: false,
        badges: true,
        roundedavatars: true,
        condition: true,
        delay: 0
    });
    // Current user groups
    _.userGroups = mw.config.get("wgUserGroups");
    // Canonical user groups
    _.groups = Object.freeze([
        "staff", "helper", "wiki-manager", "vstf", "global-discussions-moderator", "content-team-member", "vanguard",
        "bureaucrat", "sysop", "discussion-moderator", "content-moderator",
        "chatmoderator", "rollback", "bot", "patroller", "codeeditor"
    ]);
    // User group badges
    _.badges = Object.freeze({
        "staff": "staff",
        "helper": "helper",
        "vstf": "vstf",
        "wiki-manager": "admin",
        "global-discussions-moderator": "global-discussions-moderator",
        "sysop": "admin",
        "discussion-moderator": "discussion-moderator",
        "content-moderator": "content-moderator",
        "chatmoderator": "discussion-moderator"
    });
    // Creating all deferred hook object
    _.deferred["dev.i18n"] = $.Deferred();
    _.deferred["dev.colors"] = $.Deferred();
    _.deferred["dev.wds"] = $.Deferred();
    // Initialization function
    _.init = function($content){
        _.$content = $content;
        importArticles(_.scriptObj, _.styleObj);
        var promises = Object.keys(_.deferred).sort().map(function(hook){
            return _u.promisify(_.deferred[hook]);
        });
        Promise.all(promises).then(function(values){
            _.i18no = values[1];
            _.i18nExists = $.Deferred();
            _.groupsLoaded = $.Deferred();
            _.colors = values[0];
            _.wds = values[2];
            _.process();
        });
        Object.keys(_.deferred).forEach(function(name){
            mw.hook(name).add(_u.curry(_.addHook, name));
        });
    };
    // Adding the hook
    _.addHook = function(name, value){
        _.deferred[name].resolve(value);
    };
    // Processing function
    _.process = function(){
        _.createI18n();
        _.generateGroups(_.config);
        Promise.all([
            _u.promisify(_.i18nExists),
            _u.promisify(_.groupsLoaded)
        ]).then(_.makeI18n);
    };
    // Creating an I18n object
    _.createI18n = function(){
        _u.promisify(_.i18no.loadMessages(_.name))
            .then(_.i18nExists.resolve)
            .catch(_.i18nExists.reject);
    };
    // Generating user groups
    _.generateGroups = function(config){
        _.options = _.getDefaults(config);
        _.options.visibleGroups = _.options.rights.filter(function(group){
            return _.options.exclude.indexOf(group) === -1;
        });
        _.users = _.options.visibleGroups.reduce(function(obj, group){
            return (obj[group] = []) && obj;
        }, {});
        _.groupsLoaded.resolve();
    };
    // Making the i18n object
    _.makeI18n = function(values){
        var base, i18n = values[0], core = i18n._messages.en,
            types = ["parse", "plain", "markdown", "escape"];
        Object.keys(core).forEach(function(name){
            base = i18n.msg(name);
            _.i18n[name] = types.reduce(function(obj, type){
                return (obj[type] = base[type].call(base)) && obj;
            }, {});
            _.i18n[name].replace = function(){
                var a = _u.getArgs(arguments),
                    b = _u.curry(i18n.msg, name);
                return b.apply(i18n, a);
            };
        });
        _.msg = function(name){
            if (!_.i18n.hasOwnProperty(name)) return "<" + String(name) + ">";
            var msg = _.i18n[name], obj;
            return (obj = Object.assign({}, {
                __name: name,
                __base: msg,
                parse: msg.parse,
                'escape': msg.escape,
                markdown: msg.markdown,
                plain: msg.plain,
                replace: msg.replace
            })) && obj;
        };
        _.loadData();
    };
    // Load data for all user groups
    _.loadData = function(config){
        _.dataLoaded = _.options.visibleGroups.reduce(function(obj, group){
            return (obj[group] = $.Deferred()) && obj;
        }, {});
        _.fetchData();
        Promise.all(Object.keys(_.dataLoaded).map(function(key){
            return _u.promisify(_.dataLoaded[key]);
        })).then(_u.curry(_.render, _.$content, true));
    };
    // Fetch all data
    _.fetchData = function(){
        _.options.visibleGroups.forEach(function(group){
            _.getGroupMembers(group).then(_u.curry(_.loadInfo, group));
        });
    };
    // Load user info
    _.loadInfo = function(group, users){
        _.users[group] = users.map(function(user){
            user.deferred = $.Deferred();
            user.fetchInfo().then(user.deferred.resolve);
            _u.promisify(user.deferred).then(function(){
                user.loaded = true;
            });
            console.log(user);
            return user;
        });
        _.dataLoaded[group].resolve();
    };
    // Fetches the Ajax request
    _.getAjax = function(group){
        return $.post(mw.util.wikiScript("api"), {
            format: 'json',
            action: 'query',
            list: 'groupmembers',
            gmgroups: group,
            gmlimit: _.options.loadlimit,
            cb: _u.now()
        });
    };
    // Fetches all group members
    _.getGroupMembers = function(group){
        return _u.promisify(_.getAjax(group)).then(function(data){
            if (!("users" in data)) return [];
            var baseUsers = data.users, result = [], users;
            result = baseUsers.filter(function(user){
                if (_.cache.indexOf(user.name) > -1) return false;
                _.cache.push(user.name);
                return true;
            });
            users = result.reduce(function(collection, user){
                collection.push(new User(user, {
                    primaryGroup: group
                }));
                return collection;
            }, []);
            return users;
        });
    };
    // Getting the group name
    _.__getGroupName = function(group){
        if (_.groups.indexOf(group) === -1) return "N/A";
        return _.msg(group).plain;
    };
    // Getting all default configurations
    _.getDefaults = function(config){
        var defaultGroups = config.rights, groups = [];
        if (typeof config.exclude !== "undefined"){
            if (Array.isArray(config.exclude)){
                groups = defaultGroups.filter(function(group){
                    return config.exclude.indexOf(group) === -1;
                });
            } else if (typeof config.exclude === "function"){
                groups = defaultGroups.filter(function(group){
                    return !config.exclude.call(_, group);
                });
            } else groups = defaultGroups;
        }
        config.visibleGroups = groups;
        return Object.assign({}, _.defaults, _.options, config);
    };
    // Creating the User constructor
    function User(user, config){
        var options = this.__getDefaults(config);
        this.name = user.name;
        this.id = user.userid;
        this.groups = user.groups;
        this.primaryGroup = options.primaryGroup;
        this.registration = options.registration;
        this.edits = options.edits;
        this.discordHandle = options.discordHandle;
        this.discussionPostCount = options.discussionPostCount;
        this.avatar = options.avatar;
        this.user = false;
        this.__loadInfo();
        return this;
    }
    
    User.prototype.__defaults = Object.freeze({
        registration: null,
        primaryGroup: "",
        edits: 0,
        discordHandle: "",
        avatar: "",
        discussionPostCount: 0
    });
    
    User.prototype.__html = (
        '<li class="lgm-item group-member" data-user="{{name}}" data-uid="{{id}}">' +
            '<div class="lgm-user-info group-member-user-info">' +
                '<div class="lgm-avatar-container-outer group-member-avatar-container-outer">' +
                    '<div class="lgm-avatar-container-inner group-member-avatar-container-inner wds-avatar">' +
                        '<img src="{{avatar}}" class="wds-avatar__image" />' +
                        '{{#badge}}' + 
                        '<span title="{{primaryGroupName}}" class="wds-avatar__badge">{{&badge}}</span>' + 
                        '{{/badge}}' +
                    '</div>' +
                '</div>' +
                '<div class="lgm-user-name-container group-member-user-name-container">' +
                    '<span class="lgm-user-name group-member-user-name">{{name}}</span>' +
                    '<span class="lgm-user-group group-member-user-group>{{primaryGroupName}}</span>' +
                '</div>' +
            '</div>' +
            '<div class="lgm-user-actions group-member-user-actions">' +
                '<nav class="lgm-user-edit-wrapper group-member-edit-wrapper">' +
                    '<div class="lgm-user-edits group-member-edits">' +
                        '<em class="lgm-editcount group-member-editcount">{{editCount}}</em>' +
                        '<span class="lgm-edit-name group-member-edit-name">{{editMsg}}</span>' +
                    '</div>' +
                    '<div class="lgm-user-discussions group-member-discussions">' +
                        '<em class="lgm-discussions-count group-member-discussions-count">{{discussionsCount}}</em>' +
                        '<span class="lgm-discussions-name group-member-discussions-name">{{discussionsMsg}}</span>' +
                    '</div>' +
                '</nav>' +
                '<div class="lgm-user-info-lower group-member-user-info-lower">' +
                    '{{#sections}}' +
                    '<section class="lgm-user-section group-member-user-section">' +
                        '<em class="lgm-user-section-label group-member-user-label">{{label}}</em>' +
                        '<span class="lgm-user-section-value group-member-user-value">{{value}}</span>' +
                    '</section>' +
                    '{{/sections}}' +
                '</div>' +
                '<nav class="lgm-user-action-buttons group-member-action-buttons">' +
                    '{{#actions}}' +
                    '<a href="{{link}}" class="lgm-user-action-button group-member-action-button">{{text}}</a>' +
                    '{{/actions}}' +
                '</nav>' +
            '</div>' +
        '</li>'
    );
    
    User.prototype.__getDefaults = function(config){
        return Object.assign({}, this.__defaults, config);
    };
    
    User.prototype.__getAjax = function(){
        return $.get(mw.util.wikiScript("wikia"), {
            controller: "UserProfilePage",
            method: "renderUserIdentityBox",
            title: "User:" + this.name,
            format: "json"
        });
    };
    
    User.prototype.__loadInfo = function(){
        return _u.promisify(this.__getAjax()).then(function(data){
            var obj = Object.assign({}, data.user);
            obj.discussionPostsCount = data.discussionPostsCount;
            if (data.isUserPageOwner && 
                obj.name !== mw.config.get("wgUserName")) return {};
            console.log(obj);
            return obj;
        });
    };
    
    User.prototype.__generateURLs = function(){
        this.profileURL = _.msg("profile-url").plain;
        this.profileURL = this.profileURL.replace("$1", encodeURIComponent(this.name));
        this.profileText = _.msg("profile-text").escape;
        this.talkURL = _.msg("talk-url").plain;
        this.talkURL = this.talkURL.replace("$1", encodeURIComponent(this.name));
        this.talkText = _.msg("talk-text").escape;
        this.messageWallURL = _.msg("message-wall-url").plain;
        this.messageWallURL = this.messageWallURL.replace("$1", encodeURIComponent(this.name));
        this.messageWallText = _.msg("message-wall-text").plain;
    };
    
    User.prototype.__getBadge = function(){
        var hasBadge = _.badges.hasOwnProperty(this.primaryGroup);
        return hasBadge ? _.wds.badge(_.badges[this.primaryGroup]).outerHTML : null;
    };
    
    User.prototype.__getRegistration = function(time){
        var d = (_u.isset(time) || time !== null || time !== 0) ?
            time : "October 18, 2004";
        return new Date(time);
    };
    
    User.prototype.__render = function(){
        var renderConfig = Object.assign({}, {
            name: this.name,
            id: this.id,
            avatar: this.avatar,
            badge: this.__getBadge(),
            primaryGroup: this.primaryGroup,
            primaryGroupName: _.__getGroupName(this.primaryGroup),
            editCount: _u.commafy(this.edits),
            editMsg: _.msg('edit').plain,
            discussionsCount: _u.commafy(this.discussionPostsCount),
            discussionsMsg: _.msg('discussions').plain,
            sections: [{
                label: _.msg('groups').plain,
                value: this.groups.map(_.__getGroupName).join(', ')
            }, {
                label: _.msg('discord').plain,
                value: ''
            }],
            actions: [{
                link: this.profileURL,
                text: this.profileText
            }, {
                link: this.talkURL,
                text: this.talkText
            }, {
                link: this.messageWallURL,
                text: this.messageWallText
            }]
        });
        return Mustache.render(this.__html, renderConfig);
    };
    
    User.prototype.fetchInfo = function(){
        return this.__loadInfo().then(function(obj){
            obj.registration = this.__getRegistration(obj.registration);
            obj.edits = parseInt(obj.edits);
            obj = this.__getDefaults(obj);
            this.registration = obj.registration;
            this.avatar = obj.avatar;
            this.edits = obj.edits;
            this.discordHandle = obj.discordHandle;
            this.discussionPostCount = obj.discussionPostCount;
            console.log(obj);
            this.__generateURLs();
        }.bind(this));
    };
    
    User.prototype.render = function(){
        var rendered = _u.parseHTML(this.__render);
        rendered.querySelector(".lgm-user.info")
            .addEventListener("click", function(event){
            rendered.classList.toggle('lgm-active');
        });
        return rendered;
    };
    // Importing the user constructor
    _.User = User;
    // The HTML for the content
    _.__html = (
        '<section class="lgm-wrapper group-member-wrapper">' +
            '{{#grouped}}' +
                '{{#groups}}' +
                    '<div class="lgm-user-section group-member-section" data-group="{{name}}">' +
                        '<h3 class="lgm-user-section-heading group-member-heading">{{heading}}</h3>' +
                        '<nav class="lgm-users group-member-users">' +
                            '<ul class="lgm-user-list group-member-list">{{&items}}</ul>' +
                        '</nav>' +
                    '</div>' +
                '{{/groups}}' +
            '{{/grouped}}' +
            '{{^grouped}}' +
                '<nav class="lgm-users group-member-users">' +
                    '<ul class="lgm-user-list group-member-list">{{&items}}</ul>' +
                '</nav>' +
            '{{/grouped}}' +
        '</section>'
    );
    // The HTML for rendering elements
    _.html = (
        '<section class="lgm-wrapper group-member-wrapper">' +
            '{{#grouped}}' +
                '{{#groups}}' +
                    '<div class="lgm-user-section group-member-section" data-group="{{name}}">' +
                        '<h3 class="lgm-user-section-heading group-member-heading">{{heading}}</h3>' +
                        '<nav class="lgm-users group-member-users">' +
                            '<ul class="lgm-user-list group-member-list"></ul>' +
                        '</nav>' +
                    '</div>' +
                '{{/groups}}' +
            '{{/grouped}}' +
            '{{^grouped}}' +
                '<nav class="lgm-users group-member-users">' +
                    '<ul class="lgm-user-list group-member-list"></ul>' +
                '</nav>' +
            '{{/grouped}}' +
        '</section>'
    );
    // Base render function
    _.__render = function(renderAll){
        renderAll = typeof renderAll === "boolean" ? renderAll : true;
        var renderConfig = Object.assign({}, {
            grouped: _.options.grouped || false
        });
        if (renderConfig.grouped){
            renderConfig.groups = Object.keys(_.users).map(function(group){
                var object = Object.assign({}, {
                    name: group,
                    heading: _.__getGroupName(group),
                    items: _.__renderItems(_.users[group])
                });
                return object;
            });
        } else {
            renderConfig.items = Object.keys(_.users).reduce(function(collection, group){
                return collection.concat(_.users[group]);
            }, []);
        }
        console.log(renderConfig);
        return Mustache.render(renderAll ? _.__html : _.html, renderConfig);
    };
    // Render all items
    _.__renderItems = function(users, renderAll){
        renderAll = typeof renderAll === "boolean" ? renderAll : true;
        return users.reduce(function(result, item){
            return renderAll ? result.concat(item.__render()) :
                (result.push(item.render()) && result) ;
        }, renderAll ? '' : []);
    };
    // Creating the render function for the main object
    _.render = function($content, renderAll){
        renderAll = typeof renderAll === "boolean" ? renderAll : true;
        var rendered = _u.parseHTML(_u.curry(_.__render, renderAll));
        $content.html(rendered);
        if (!renderAll){
            _.reflow($content.find('.lgm-users')[0], rendered);
        } else {
            _.reflow(rendered.querySelector('.lgm-users'), rendered);
        }
    };
    // Reflow function
    _.reflow = function(element, target){
        
    };
    // Loading the script
    mw.hook('wikipage.content').add(function($content){
        if (mw.config.get("wgCanonicalSpecialPageName") !== "Blankpage" ||
            mw.util.getParamValue('blankspecial') !== "listgroupmembers")
            return;
        _.init($content);
    });
    // Creating the global object
    wk.ListGroupMembers = _;
    // Creating a hook
    mw.hook("lgm").fire(wk.ListGroupMembers);
});