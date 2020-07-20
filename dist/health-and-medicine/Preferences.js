// __NOWYSIWYG__ <source lang="javascript">
/**
 * Preferences.js (main module)
 *
 * Preferences
 * a plugin for Wikia addons that adds a web-interface with user-configurable
 * options that are saved persistently
 * documentation at: http://dev.wikia.com/wiki/Preferences
 * © Peter Coester, 2012
 *
 */

/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

;(function (module, $, mw, window) {
    
    'use strict';
    
    var Promise, Main, Form, GlobalMap, LocalMap, Request, tabs, addons, shared, formScripts, permitSave, formDefer,
        
        onForm = $.Callbacks('memory once'),
        onMain = $.Callbacks('memory once'),
        onPost = $.Callbacks(),
        onFail = $.Callbacks('memory'),
        
        isSpecialScripts = mw.config.get('wgCanonicalNamespace') === 'Special' &&
                           mw.config.get('wgTitle') === 'Scripts',
        
        current  = mw.config.get('wgUserName'),
        
        overrideUrl = '//preferences.wikia.com/wiki/User:' + current + '/preferences.js?action=raw&ctype=text/javascript&maxage=0&smaxage=0',
        
        debug = Boolean(window.sessionStorage && window.sessionStorage.getItem('debug')),
        
        log = (window.console && window.console.log && window.console.log.apply && function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('Preferences:');
            window.console.log.apply(window.console, args);
        }) || $.noop;
    
    function initFormScripts () {
        
        formScripts = [];
        formScripts.backup = [];
        formScripts.loaded = false;
        
        formScripts.push = function (value) {
            if (!isSpecialScripts || $.inArray(value, this.backup) !== -1) return;
            Array.prototype.push.call(this, value);
            Array.prototype.push.call(this.backup, value);
            if (this.loaded) {
                this.load();
            }
        };
        
        formScripts.load = function () {
            var articles = Array.prototype.splice.call(this, 0, this.length);
            if (articles.length) {
                log('loading: ', articles);
                window.importArticles({ type: 'script', articles: articles });
            }
            this.loaded = true;
        };
        
        formScripts.log = function () {
            log('formScripts: ', formScripts.backup);
        };
    }
    
    function initPage () {
        
        if (isSpecialScripts) {
            window.document.title = 'Special:Scripts';
            $(function () {
                var exchange = module.preparePage({
                    log: log, debug: debug
                });
                
                tabs = exchange.tabs;
                formDefer = exchange.defer;
                
                formScripts.load();
                
                shared.load(current)
                .done(function () {
                    var map = shared.get(current);
                    exchange.sharedTab.form(map);
                    onPost.add(function () {
                        exchange.sharedTab.post(map);
                    });
                })
                .always(function () {
                    delete module.preparePage;
                });
            });
        } else {
            $(function () {
                $('#AccountNavigation')
                .find('ul.subnav')
                .find('li').has('a[data-id="preferences"]')
                .after('<li id="script-prefs"><a href="/wiki/Special:Scripts">My scripts</a></li>');
            });
        }
    }
    
    function initMaps () {
        
        LocalMap = function (addon, wiki) {
            this.wiki = wiki;
            this.addon = addon;
            this.values = {};
        };
        
        LocalMap.prototype = new mw.Map();
        
        log.local = function (addon, wiki, values) {
            log('local for addon[' + addon + '], wiki[' + wiki + ']: ', values);
        };
        
        LocalMap.prototype.log = function () {
            log.local(this.addon, this.wiki, this.values);
        };
        
        GlobalMap = function (addon) {
            this.addon = addon;
            this.values = {};
        };
        
        GlobalMap.prototype = new mw.Map();
        
        log.global = function (addon, values) {
            log('global for addon[' + addon + ']: ', values);
        };
        
        GlobalMap.prototype.log = function () {
            log.global(this.addon, this.values);
        };
    }
    
    function initAddons () {
        
        addons = {};
        
        addons.list = (module.getData && module.getData()) || {};
        delete module.getData;
        
        addons.getLocal = function (addon, wiki) {
            this.list[addon] = this.list[addon] || { wikis: {} };
            this.list[addon].wikis = this.list[addon].wikis || {};
            this.list[addon].wikis[wiki] = this.list[addon].wikis[wiki] || {};
            var l = new LocalMap(addon, wiki);
            l.values = this.list[addon].wikis[wiki];
            return l;
        };
        
        addons.getWikis = function (addon) {
            var wikis = [];
            if (this.list[addon] && this.list[addon].wikis) {
                $.each(this.list[addon].wikis, function (wiki, data) {
                    wikis.push(wiki);
                });
            }
            return wikis;
        };
        
        addons.getGlobal = function (addon) {
            this.list[addon] = this.list[addon] || { wikis: {} };
            this.list[addon].global = this.list[addon].global || {};
            var l = new GlobalMap(addon);
            l.values = this.list[addon].global;
            return l;
        };
        
        function removeEmptyValues (obj) {
            var cleaned = {};
            $.each(obj, function (prop, value) {
                if ($.inArray(value, [undefined, null, 0, '']) === -1) {
                    cleaned[prop] = value;
                }
            });
            return $.isEmptyObject(cleaned) ? false : cleaned;
        }
        
        addons.reduce = function () {
            var reduced = {};
            $.each(this.list, function (addon, config) {
                if (config.wikis) {
                    $.each(config.wikis, function (wiki, values) {
                        var cleaned = removeEmptyValues(values);
                        if (cleaned) {
                            reduced[addon] = reduced[addon] || {};
                            reduced[addon].wikis = reduced[addon].wikis || {};
                            reduced[addon].wikis[wiki] = cleaned;
                        }
                    });
                }
                console.log('reduced: ', reduced);
                var cleaned = config.global && removeEmptyValues(config.global);
                if (cleaned) {
                    reduced[addon] = reduced[addon] || {};
                    reduced[addon].global = cleaned;
                }
            });
            return reduced;
        };
        
        addons.log = function () {
            $.each(this.list, function (addon, config) {
                if (typeof config === 'function') return;
                if (config.wikis) {
                    $.each(config.wikis, function (wiki, settings) {
                        log.local(addon, wiki, settings);
                    });
                }
                if (config.global) {
                    log.global(addon, config.global);
                }
            });
        };
    }
    
    function initShared () {
        
        function validateUsers (users) {
            if (!$.isArray(users)) {
                if (users === undefined) {
                    users = [current];
                } else {
                    users = [users];
                }
            }
            for (var i = 0, l = users.length; i < l; i++) {
                if (typeof users[i] !== 'string') {
                    throw new Error('expected username or array of usernames');
                }
            }
            return users.length ? users : false;
        }
        
        var SharedMap = function (user) {
            this.values = {};
            this.user = user;
        };
        
        SharedMap.prototype = new mw.Map();
        
        SharedMap.prototype.log = function () {
            log('shared settings for ' + this.user + ': ', this.values);
        };
        
        SharedMap.evaluate = function (user, data) {
            shared.users[user].map = new SharedMap(user);
            shared.users[user].map.values = data;
        };
        
        function attemptToResolve (users, master) {
            var slaves = 0,
                success = function () {
                    if (!--slaves) master.resolve();
                },
                failure = function () {
                    if (master.state() === 'pending') {
                        master.reject(Array.prototype.slice.call(arguments));
                    }
                },
                toLoad = [];
            for (var u, i = 0, l = users.length; i < l; i++) {
                u = users[i];
                if (!shared.users[u]) {
                    toLoad.push(u);
                    shared.users[u] = { defer: $.Deferred() };
                    shared.users[u].defer
                    .done(SharedMap.evaluate);
                }
                slaves++;
                shared.users[u].defer
                .done(success)
                .fail(failure);
            }
            return toLoad.length ? toLoad : false;
        }
        
        shared = { users: {} };
        
        shared.load = function (users) {
            users = validateUsers(users);
            var master = $.Deferred();
            if (!users) {
                master.resolve();
            } else {
                var toLoad = attemptToResolve(users, master);
                if (toLoad) {
                    if (debug) log('loading shared(s): ', toLoad);
                    var swarm = $.Deferred()
                    .done(function (results) {
                        $.each(results, function (user, data) {
                            shared.users[user].defer.resolve(user, data);
                        });
                    })
                    .fail(function () {
                        var issues = Array.prototype.slice.call(arguments);
                        $.each(shared.users, function (user, data) {
                            if (!data.map) data.defer.reject(issues);
                        });
                    });
                    var request = new Request(swarm);
                    request.send('LoadShared', toLoad);
                }
            }
            return master;
        };
        
        shared.get = function (user) {
            return (shared.users[user] && shared.users[user].map) || false;
        };
        
        shared.log = function () {
            $.each(shared.users, function (user, data) {
                log('shared for user[' + user + ']: ', data.map ? data.map.values : 'pending');
            });
        };
    }
    
    function initRequest () {
        
        var counter = 1,
            requests = {},
            iframe = window.document.getElementById('pref-server').contentWindow;
        
        Request = function (defer) {
            this.defer = defer;
            this.id = counter++;
            requests[this.id] = this;
        };
        
        Request.prototype.send = function (action, contents, addon) {
            var message = {
                user: current,
                addon: addon || false,
                action: action,
                contents: contents,
                id: this.id
            };
            if (debug) log('sending request: ', message);
            iframe.postMessage($.toJSON(message), 'http://preferences.wikia.com');
        };
        
        Request.prototype.process = function (reply) {
            if (debug) log('received reply: ', reply);
            switch (reply.result) {
                case 'success':
                    this.defer.resolve(reply.msg);
                    break;
                case 'failure':
                    this.defer.reject('failure: ', reply);
                    break;
                default:
                    this.defer.reject('bad reply: ', reply);
            }
        };
        
        function receive (event) {
            var reply;
            if (event.origin !== 'http://preferences.wikia.com' ||
                event.source !== iframe || !event.data) {
                return;
            }
            try {
                reply = $.parseJSON(event.data);
            } catch (e) {
                if (debug) log('cannot parse data: ', e);
                return;
            }
            if (!reply || !reply.result || !reply.id || !reply) {
                if (debug) log('unexpected reply: ', event);
                return;
            }
            requests[reply.id].process(reply);
            delete requests[reply.id];
        }
        
        if (window.addEventListener) {
            window.addEventListener('message', receive, false);
        } else if (window.attachEvent) {
            window.attachEvent('onmessage', receive);
        }
    }
    
    function initPromise () {
        
        var methods, defer, users = [];
        
        users.mergeUnique = function (otherArray) {
            for (var i = 0, l = otherArray.length; i < l; i++) {
                if ($.inArray(otherArray[i], this) === -1) {
                    this.push(otherArray[i]);
                }
            }
        };
        
        function searchUserNames (j, data) {
            if (data.type !== 'main') return;
            if (typeof data.arg1 === 'string') {
                data.arg1 = [data.arg1];
            }
            if (!$.isArray(data.arg1)) return;
            var newUsers = data.arg1;
            for (var i = 0; i < newUsers; i++) {
                if (typeof newUsers[i] !== 'string') return;
            }
            users.mergeUnique(newUsers);
        }
        
        function error () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('Preferences: Error: ');
            if (window.console.error) {
                window.console.error.apply(window.console, args);
            } else {
                window.console.log.apply(window.console, args);
            }
            onFail.fireWith(module, args);
        }
        
        Promise = function (addon) {
            this.addon  = addon;
        };
        
        module.addon = function (addon) {
            if (typeof addon !== 'string') {
                throw new Error('.addon() expects addon name as parameter');
            }
            return new Promise(addon);
        };
        
        Promise.extend = function (methods) {
            for (var i = 0; i < module.promises.length; i++) {
                //$.extend(module.promises[i].constructor.prototype, methods);
                $.extend(module.promises[i], methods);
            }
            $.extend(Promise.prototype, methods);
        };
        
        methods = {
            
            main: function (arg1, arg2) {
                if (isSpecialScripts) return this;
                var users = false, func = false;
                if (arg2 === undefined) {
                    func = arg1;
                    users = [];
                } else {
                    func = arg2;
                    if (typeof arg1 === 'string') {
                        users = [arg1];
                    } else if (arg1 instanceof Array) {
                        users = arg1;
                        for (var i = 0; i < arg1.length; i++) {
                            if (typeof arg1[i] !== 'string') {
                                users = false;
                                break;
                            }
                        }
                    }
                }
                if (typeof func !== 'function') {
                    func = false;
                }
                if (!users || !func) {
                    throw new Error('.main() expects list of usernames as optional first and callback as first or second parameter');
                }
                var callback = Main.callback(func, this.addon);
                if (users.length) {
                    var defer = shared.load(users);
                    onMain.add(function () {
                        defer.done(callback).fail(error);
                    });
                } else {
                    onMain.add($.proxy(callback, this));
                }
                return this;
            },
            
            form: function (arg) {
                if (!isSpecialScripts) return this;
                if (typeof arg === 'string') {
                    formScripts.push(arg);
                } else if (typeof arg === 'function') {
                    onForm.add(Form.callback(arg, this.addon));
                } else {
                    throw new Error('.form() expects scriptname or callback as parameter');
                }
                return this;
            },
            
            post: function (func) {
                if (!isSpecialScripts) return this;
                if (typeof func === 'function') {
                    onPost.add(Form.callback(func, this.addon));
                } else {
                    throw new Error('.post() expects callback as parameter');
                }
                return this;
            },
            
            fail: function (func) {
                if (typeof func === 'function') {
                    onFail.add(func);
                } else {
                    throw new Error('.fail() expects callback as parameter');
                }
                return this;
            }
        };
        
        defer = $.Deferred().resolve();
        if (!isSpecialScripts) {
            $.each(module.promises, function (i, promise) {
                $.each(promise.queue, searchUserNames);
            });
            if (users.length) {
                defer = shared.load(users);
            }
        }
        
        Promise.extend(methods);
        
        $.each(module.promises, function (i, promise) {
            $.each(promise.queue, function(j, data) {
                if (typeof promise.addon !== 'string') {
                    throw new Error('.addon() expects addon name as parameter');
                }
                promise[data.type](data.arg1, data.arg2);
            });
            delete promise.queue;
        });
        
        return defer.promise();
    }
    
    function initApis () {
        
        var wiki = (function () {
            var m = mw.config.get('wgServer').match(/^(?:https?:)?\/\/([\w\.\-]+)\.wikia\.com$/);
            return m ? m[1] : mw.config.get('wgDBname');
        }());
        
        var Api = function () {};
        
        Api.callback = function (SubClass, func, addon) {
            return function () {
                func.call(module, new SubClass(addon));
            };
        };
        
        Api.prototype.local = function (targetWiki) {
            targetWiki = targetWiki || wiki;
            if (typeof targetWiki !== 'string') {
                throw new Error('.local() expects wiki name as parameter');
            }
            return addons.getLocal(this.addon, targetWiki || wiki);
        };
        
        Api.prototype.wikis = function () {
            return addons.getWikis(this.addon);
        };
        
        Api.prototype.global = function () {
            return addons.getGlobal(this.addon);
        };
        
        Api.prototype.shared = function (user) {
            user = user || current;
            if (typeof user !== 'string') {
                throw new Error('.local() expects wiki name as parameter');
            }
            return shared.get(user);
        };
        
        Api.prototype.log = function () {
            this.local().log();
            this.global().log();
            shared.log();
            if (tabs) tabs.logAddon(this.addon);
        };
        
        Main = function (addon) {
            this.addon = addon;
        };
        
        Main.prototype = new Api();
        
        Main.callback = function (func, addon) {
            return Api.callback(Main, func, addon);
        };
        
        Form = function (addon) {
            this.addon = addon;
        };
        
        Form.prototype = new Api();
        
        Form.callback = function (func, addon) {
            return Api.callback(Form, func, addon);
        };
        
        var save = function () {
            if (isSpecialScripts) {
                if (debug) log('firing .post() callbacks');
                onPost.fire();
            }
            var defer = $.Deferred(),
                request = new Request(defer),
                s = shared.get(current);
            console.log('sending: ', {
                preferences: addons.reduce(),
                shared: s && s.values
            });
            request.send('Save', {
                preferences: addons.reduce(),
                shared: s && s.values
            });
            return defer.promise();
        };
        
        if (isSpecialScripts) {
            
            permitSave = module.initSave(save);
            delete module.initSave;
            
            Form.prototype.localTab = function (data) {
                return tabs.add(this.addon, true, data);
            };
            
            Form.prototype.globalTab = function (data) {
                return tabs.add(this.addon, false, data);
            };
            
            Form.prototype.css = function (data) {
                tabs.css(data);
                return this;
            }
            
        } else {
            console.log('setting save: ', save);
            Main.prototype.save = save;
        }
    }

    function initFiles () {
        
        var defer, saveCookie = Boolean($.cookie('specialScripts'));
        
        onPost.add(function () {
            $.cookie('specialScripts', 1, {
                expires: new Date(Date.now() + 10 * 60 * 1000),
                path: '/',
                domain: '.wikia.com'
            });
        });
        
        if (module.defer ? saveCookie : debug) {
            defer = $.getScript(overrideUrl)
            .always(function () {
                module.getData = module.getData || function () { return {}; };
            });
        } else {
            defer = $.Deferred().resolve();
        }
        
        if (debug) {
            if (!module.defer) {
                module.defer = $.Deferred();
                $(function () {
                    $('#pref-server').remove();
                    $('<iframe id="pref-server" src="//preferences.wikia.com/wiki/MediaWiki:Server1?action=render" style="display:none;"></iframe>')
                    .appendTo(document.body)
                    .on('load', function () {
                        module.defer.resolve();
                    });
                });
            }
            module.defer
            .done(function () {
                log('iframe loaded');
            });
            
            if (!module.promises) {
                module.promises = [];
                
                var Promise = function (addon) {
                    this.addon = addon;
                    this.queue = [];
                };
                
                $.each(['main', 'form', 'post', 'update', 'fail'], function (i, type) {
                    Promise.prototype[type] = function (arg1, arg2) {
                        this.queue.push({ type: type, arg1: arg1, arg2: arg2 });
                        return this;
                    };
                });
                
                module.addon = function (addon) {
                    var p = new Promise(addon);
                    module.promises.push(p);
                    return p;
                };
            }
            
            if (isSpecialScripts && (!module.preparePage || !module.initSave)) {
                defer = $.when(defer,
                    $.getScript('//preferences.wikia.com/wiki/MediaWiki:Special.js?action=raw&ctype=text/javascript')
                );
            }
        } else if (!module.defer || !module.promises || (isSpecialScripts && (!module.preparePage || !module.initSave))) {
            throw new Error('This is not a stand-alone module. Use the loader, please!');
        }
        
        return defer;
    }
    
    function updateModule () {
        delete module.promises;
        delete module.defer;
        delete module.loading;
        module.log = function () {
            formScripts.log();
            addons.log();
            shared.log();
            var state = function (callback) {
                return callback.fired() ? 'fired' : 'pending';
            };
            log('onMain: ', state(onMain));
            log('onForm: ', state(onForm));
            log('onPost: ', state(onPost));
            log('onFail: ', state(onFail));
            if (tabs) tabs.log();
        };
        module.api = function (addon) {
            if (typeof addon !== 'string') {
                throw new Error('.addon() expects addon name as parameter');
            }
            return isSpecialScripts ? new Form(addon) : new Main(addon);
        }
    }
    
    function initModule () {
        
        var defer = initFiles();
        
        module.loading = true;
        initFormScripts();
        initMaps();
        defer
        .done(function () {
            initAddons();
            module.defer
            .done(function () {
                initRequest();
                initShared();
                initPage();
                initApis();
                initPromise()
                .done(function () {
                    updateModule();
                    log('ready');
                    onForm.add(permitSave);
                    if (isSpecialScripts) {
                        if (debug) log('firing .form() callbacks');
                        formDefer.done(onForm.fire);
                    } else {
                        if (debug) log('firing .main() callbacks');
                        onMain.fire();
                    }
                });
            });
        });
    }
    
    if (!module.loading && !module.log) {
        initModule();
    }
    
}((window.dev = window.dev || {}).preferences = window.dev.preferences || {}, jQuery, mediaWiki, window));
//</source>