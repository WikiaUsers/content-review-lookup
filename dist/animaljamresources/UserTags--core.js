/*! Copyright (C) 2012 Lunarity
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*jshint jquery:true browser:true curly:false smarttabs:true laxbreak:true */
/*global mediaWiki UserTagsJS */
 
//
// ECMAScript 5 Polyfills
//
if (typeof(Object.freeze) !== 'function') {
    Object.freeze = function(o) { "use strict"; return o; };
    Object.isFrozen = function() { "use strict"; return false; };
}
if (typeof(Object.seal) !== 'function') {
    Object.seal = function(o) { "use strict"; return o; };
    Object.isSealed = function() { "use strict"; return false; };
}
if (typeof(Object.create) !== 'function') {
    Object.create = function(o, p) {
        "use strict";
        if (p) throw new Error('Light polyfill doesn\'t support the descriptor parameter');
        var ProtoDerive = function() {};
        ProtoDerive.prototype = o;
        return new ProtoDerive();
    };
}
 
//
// Environmental sanity, keep object literals clean.
// Stuff added to Object.prototype shows up in object literals and arrays. (for-in smash)
// Doing this makes it safe to skip the hasOwnProperty test in for-ins on plain objects.
//
(function(O) {
    "use strict";
    function clean(proto) {
        /*jshint forin:false */
        for (var p in proto) {
            delete proto[p];
        }
        O.seal(proto);
    }
    clean(O.prototype);
})(Object);
/*jshint forin:false */
 
 
//
// Dev namespace created by Pecoes
//
window.dev = $.extend(true, window.dev, { UserTags: {} });
/*global dev */
 
 
//
// Logger component
//
dev.UserTags.Logger = (function(console, slice, apply) {
    "use strict";
 
    // IE8 only gains window.console when the console is open in the UI
    // WARN: IE's console functions do not inherit Function (WTF is that?)
    console = console || { log: $.noop, warn: $.noop, info: $.noop, error: $.noop };
    var group = console.group || $.noop, groupCollapsed = console.groupCollapsed || $.noop;
 
    function Logger(prefix) {
        this._log = function(fn, args) {
            args = slice.call(args);
            args[0] = prefix + (args[0] ? '(' + args[0] + '):' : ':');
            return apply.call(fn, console, args);
        };
        try {
            Object.defineProperty(this, '_log', {
                value: this._log
                // Not writable, enumerable or configurable
            });
        } catch(e) {/*IE8 only allows defineProperty on DOM objects*/}
    }
    Logger.prototype = Object.freeze({
        constructor: Logger,
        log: function(/*component, ...*/) {
            return this._log(console.log, arguments);
        },
        inf: function(/*component, ...*/) {
            return this._log(console.info, arguments);
        },
        wrn: function(/*component, ...*/) {
            return this._log(console.warn, arguments);
        },
        err: function(/*component, ...*/) {
            return this._log(console.error, arguments);
        },
        group: function(collapsed) {
            return apply.call(collapsed ? groupCollapsed : group, console);
        },
        groupEnd: $.proxy(console.groupEnd || $.noop, console)
    });
 
    return Logger;
})(window.console, Array.prototype.slice, Function.prototype.apply);
 
 
//
// Sledge AJAX Component
//
dev.UserTags.SledgeAJAX = (function(Object, $, mw, Logger) {
    "use strict";
 
    //
    // Utility function to concat one array to another using a hash to avoid adding duplicates
    // The hash and target array will be modified. Order is preserved. Primitives only.
    //
    function concatUnique(arr, hash, newArr) {
        for (var i = 0, len = newArr.length, nI ; i < len ; ++i) {
            nI = newArr[i];
            if (hash[nI] === 1) continue;
            hash[nI] = 1;
            arr[arr.length] = nI;
        }
        return arr;
    }
    // We also clone the object as part of this because of some stupid glitch in Firefox
    // that causes it to delete index 0 of arrays when freezing them. Cloning prevents
    // it, I don't really understand why.
    // WARN: Arbitrary object graphs containing cycles may cause infinite recursion in ES3
    //    since isFrozen won't work.
    function freezeDeep(o) {
        var newO = $.isArray(o) ? [] : {}, val, p;
        for (p in o) {
            if (!o.hasOwnProperty(p)) continue; // For arrays
            val = o[p];
            if (typeof(val) === 'object' && val !== null && !Object.isFrozen(val)) {
                val = freezeDeep(val);
            }
            newO[p] = val;
        }
        return Object.freeze(newO);
    }
 
    //
    // AJAX Engine.
    // This is an AJAX manager which merges as many separate requests into as few
    // AJAX messages as possible for better performance. There isn't a good way to
    // do this so it just has hard-coded knowledge of certain message types, the
    // others are merged by slicing across list/meta.
    //
    // It only handles action=query.
    // Special messages: type=user (list=users), type=contributions (list=usercontribs)
    //    and type=usermessage (meta=allmessages). Only some parameters are accepted,
    //    others need to be specified as general messages instead.
    //
    function Sledge(logger, debugOn) {
        // Hash maps list/meta to array of individual requests
        this._requests = {};
        this._collisions = {};
        this._username = '';
        this._specials = {};
        this._logger = logger || new Logger('Sledge');
        this._debug = !!debugOn;
    }
    Sledge.prototype = {
        constructor: Sledge,
 
        //
        // Processes a request, or array of requests.
        // The promise done callback will receive json1, json2, json3, ... in order of
        // requests in the array as parameters. [A single request will get one json]
        //
        request: function(request) {
            if ($.isArray(request)) {
                var promises = [];
                for (var i = 0, len = request.length ; i < len ; ++i) {
                    promises[i] = this.request(request[i]);
                }
                return $.when.apply($, promises);
            }
            if (request.type) return this._processSpecial(request);
 
            // Check for duplicate requests and just merge them together into a single instead
            // of issuing 2 identical ones.
            var hash = this._hashRequest(request);
            var existing = this._collisions[hash];
            if (typeof(existing) === 'object') {
                return existing.deferred.promise();
            }
 
            // Check for multiple types at the same time
            var counter = 0;
            counter += (request.meta !== void 0);
            counter += (request.list !== void 0);
            counter += (request.prop !== void 0);
            if (counter === 0) {
                throw new TypeError('Unrecognised request type');
            } else if (counter !== 1) {
                throw new TypeError('One request type at a time only');
            }
 
            // Generic requests are just thrown in the pile
            var index = '@page';
            if (!request.prop) {
                index = (request.list ? '!' + request.list : '#' + request.meta);
            }
 
            // Sanity tests
            if (index.indexOf('|') !== -1) {
                throw new TypeError('Sledge can only accept individual requests, not pipe-combined ones');
            }
            if (request.action && request.action !== 'query') {
                throw new TypeError('Cannot handle non-query requests, perform those manually');
            }
 
            // Shallow clone since we want to add our own properties.
            this._collisions[hash] = request = $.extend({}, request);
 
            // Add the request to the pile and return a promise representing it
            var reqList = this._requests[index];
            if (!reqList) reqList = this._requests[index] = [];
            request.deferred = $.Deferred();
            reqList.push(request);
            return request.deferred.promise();
        },
        //
        // Dispatch. Send all AJAX and flush internal state.
        // Data will be delivered directly to installed request callbacks as it arrives
        //
        hammer: function() {
            var request, hasAny, passPromises, oneReq, arr, promises = [],
                url = mw.util.wikiScript('api');
 
            // Commit the Special requests since we're done now and no more collisions
            // are possible
            this._commitSpecial();
 
            for (;;) {
                request = {};
                hasAny = false;
                passPromises = [];
                // Slice across the hash and pop the head off each request type
                // We assemble a combined request using one of each message type.
                for (var type in this._requests) {
                    arr = this._requests[type];
                    if (arr.length === 0) {
                        delete this._requests[type];
                        continue;
                    }
                    // Get the deferred out of the request
                    oneReq = arr.shift();
                    passPromises.push(oneReq.deferred);
                    delete oneReq.deferred;
                    // Merge the request with the Ajax
                    this._mergeIntoAjax(request, oneReq);
                    hasAny = true;
                }
                if (!hasAny) break;
 
                // Issue the AJAX request
                // NOTE: mw.Api does not exist in Chrome.
                // NOTE: The reason its missing is because mw.Api is not guranteed, you must
                //    mw.loader.using('mediaWiki.Api') to get it.
                request.format = 'json';
                request.action = 'query';
                promises[promises.length] = $.ajax({
                        url: url,
                        data: request,
                        dataType: 'json'
                    })
                    .done($.proxy(this._onAjaxDone, this, passPromises))
                    .fail($.proxy(this._onAjaxFail, this, passPromises))
                    ;
            }
 
            // Flush the state
            this._collisions = {};
            // NOTE: Creating an everything-done promise is a performance suck as we need lots
            //    of .then() to fix the fail case as success. We don't need that feature so I
            //    removed it.
        },
        //
        // Set Username used with special requests. Only takes effect when
        // hammer() is called, can be changed repeatedly until that point
        // with no immediate effect.
        //
        setUsername: function(name) {
            this._username = name;
        },
        //
        // Calculates a hash string for this._collisions
        // We can't just use $.param as we need params in the same ORDER so
        // that identical requests with different key orders will match properly
        //
        _hashRequest: function(request) {
            return $.param(request).split('&').sort().join('&');
        },
        // Merge a single request into a combined request
        _mergeIntoAjax: function(request, subrequest) {
            var x, types = {list:1, meta:1};
            for (x in subrequest) {
                if (!request[x]) {
                    request[x] = subrequest[x];
                } else {
                    if (types[x] === 1) { // Mergeable collision
                        request[x] += '|' + subrequest[x];
                    } else { // Unrecoverable collision
                        throw new TypeError('Request Parameter Collision!');
                    }
                }
            }
            return request;
        },
        _onAjaxDone: function(promises, json) {
            var isError = false;
            if (!json || json.error) {
                isError = true;
            }
            if (isError || json.errors || json.warnings) {
                this._logger.wrn('Sledge', 'Bad requests (errors/warnings in response):', json);
            }
            if (this._debug) {
                this._logger.inf('Sledge', 'onAjaxDone:', json, arguments[3]);
            }
            //stop on server reported error
            if (isError) {
                this._logger.wrn('Sledge', 'Server returned an error. Exit.', json);
                return;
            }
            // Freeze the JSON so that it can't be modified. This will cause modules that try
            // to edit the JSON to crash. Editing the JSON is a bug because it may be given to
            // multiple modules.
            json = (typeof(json) !== 'object' || json === null ? json : freezeDeep(json));
            // NOTE: jQuery promises are closured, not prototypical, so we can't use $.each
            for (var i = 0, len = promises.length ; i < len ; ++i) {
                promises[i].resolve(json);
            }
        },
        _onAjaxFail: function(promises) {
            this._logger.err('Sledge', 'AJAX Failure:', Array.prototype.slice.call(arguments, 1));
            for (var i = 0, len = promises.length ; i < len ; ++i) {
                promises[i].reject();
            }
        },
        //
        // Processing for "special" (i.e. mergeable) requests. The requests are kept
        // separate so that they don't screw with the _collisions hash until committed.
        //
        _processSpecial: function(request) {
            var special;
            switch (request.type) {
            case 'user':
                this._specials.user = special = (this._specials.user || {});
                special.propHash = (special.propHash || {});
                special.prop = (special.prop || []);
                concatUnique(special.prop, special.propHash, request.prop);
                break;
 
            case 'contributions':
                if (request.dir === 'older' || !request.dir) {
                    // Limit defaulting to 1 is arbitrary, the limit parameter is not supposed to
                    // be optional here
                    this._specials.contribold = special = (this._specials.contribold || { limit: 1 });
                } else if (request.dir === 'newer') {
                    this._specials.contribnew = special = (this._specials.contribnew || { limit: 1 });
                } else {
                    throw new TypeError('contributions does not support direction "' + request.dir + '"');
                }
                special.limit = (special.limit < request.limit ? request.limit : special.limit);
                special.propHash = (special.propHash || {});
                special.prop = (special.prop || []);
                concatUnique(special.prop, special.propHash, request.prop);
                break;
 
            case 'usermessage':
                this._specials.usermessage = special = (this._specials.usermessage || {});
                special.msgHash = (special.msgHash || {});
                special.msgs = (special.msgs || []);
                concatUnique(special.msgs, special.msgHash, request.messages);
                break;
 
            default:
                throw new TypeError('Unrecognised special request type: ' + request.type);
            }
            // For the first message of a type we need to create a deferred for it.
            if (!special.deferred) {
                special.deferred = $.Deferred();
            }
 
            return special.deferred.promise();
        },
        _commitSpecial: function() {
            var specials = this._specials,
                requests = [];
 
            // We just have to convert the special requests into canonical ones.
            // Things are slightly complicated by the fact that we gave out deferreds
            // earlier so we need to connect the real deferred to the fake one.
            if (specials.user) requests[0] = {
                data: {
                    list: 'users',
                    ususers: this._username,
                    usprop: specials.user.prop.join('|')
                },
                dfd: specials.user.deferred
            };
            if (specials.usermessage) requests[requests.length] = {
                data: $.extend(true, {
                        meta: 'allmessages',
                        amenableparser: 1,
                        amargs: this._username,
                        // Anons get wikicontent, logged in get user preference
                        //amlang: mw.config.get('wgContentLanguage'),
                        ammessages: specials.usermessage.msgs.join('|')
                    }, $.getUrlVar('uselang') ? {amlang: $.getUrlVar('uselang')} : null
                ),
                dfd: specials.usermessage.deferred
            };
            var special;
            for (var which in {old:1, 'new':1}) {
                special = specials['contrib' + which];
                if (special) requests[requests.length] = {
                    data: {
                        list: 'usercontribs',
                        uclimit: special.limit,
                        ucuser: this._username,
                        ucdir: which + 'er',
                        ucprop: special.prop.join('|')
                    },
                    dfd: special.deferred
                };
            }
            // The specials are committed now, they can't be changed further without
            // corrupting the invariants around this._collisions.
            this._specials = {};
 
            // Clean closure
            special = specials = null;
 
            // Dispatch
            var callbackDone = function() {
                return this.resolve.apply(this, arguments);
                },
                callbackFail = function() {
                return this.reject.apply(this, arguments);
                };
            for (var i = 0, len = requests.length ; i < len ; ++i) {
                this.request(requests[i].data)
                    .done($.proxy(callbackDone, requests[i].dfd))
                    .fail($.proxy(callbackFail, requests[i].dfd))
                    ;
            }
        }
    };
 
    return Sledge;
})(Object, jQuery, mediaWiki, dev.UserTags.Logger);
 
 
/**
 * User "Name Tags" Script.
 *
 * This script adds extra tags to the user "masthead" on user pages. It
 * allows you to add badges for Bureaucrats, Patrollers, etc in addition
 * to the default "Founder", "Admin" and "Blocked" tags. There are also
 * several pseudo group tags for users who are inactive, haven't met the
 * minimum number of days of editing and holding an account without being
 * blocked and for global Wikia accounts that have not contributed to your
 * particular Wiki.
 *
 * This script also replicates the functionality of InactiveUsers so you
 * don't need that. You can also make up your own tags if you want.
 *
 * TERMINOLOGY: Groups are what users are in, Tags are how those groups are
 *    represented in the UI. Modules put users in groups, tags describe what
 *    the markers for each group say, if they are links and what order they
 *    are in. [NOTE: groups without an associated tag are bugs and will
 *    cause warnings in the Console]
 *
 * TODO: Split Oasis and Monobook crap out of UserTags into Strategy Modules
 *    (UserTagsJS.skinStrategies.(oasis|monobook), these can be in their own top-level as well.
 * TODO: Create a MonobookTagsModule to query allusers to get Staff/VSTF/etc memberships
 *    so that will work in Monobook too.
 * TODO: Allow grouping of tags, each group will be given a separate container so it can be
 *    placed in a different location in the masthead. E.g. Core groups go in the HGROUP as
 *    per normal, other less important ones can be placed in the main masthead area, like
 *    at the bottom, below the main body. [new "group" property, string, tag-container will
 *    receive a taggroup-GroupValue CSS class]
 * NOTE: Grouping is actually rather complicated given the CSS nonsense in the masthead,
 *    these will probably need to modules as well (group->function which creates container
 *    DOM node, inserts it and returns it, then the core can just append things into it)
 */
if (!dev.UserTags.Core) // Run once
dev.UserTags = (function($, document, mw, settings, Logger, Sledge) {
    "use strict";
 
    var timingStart = Date.now(), timingAjax, timingDom, timingModules;
 
    // Extract the debug flag into a global
    var debugOn = $.getUrlVar('debug') || !!settings.debug;
 
    //
    // Global Logger
    //
    var logger = new Logger('USERTAGS');
 
    //
    // Check that we came from our loader. Otherwise we're screwed.
    //
    if (!settings.loader) {
        logger.err(0, 'Script was not loaded by the support loader! Aborted.');
        return;
    }
    if (({oasis:1, monobook:1})[settings.loader.skin] !== 1) {
        logger.err(0, 'Unsupported skin managed to load us? Aborted.');
        return;
    }
    var siteSkin = settings.loader.skin;
 
    //
    // Settings clean-up
    //
    settings = $.extend({
        extensions: {},
        modules: {},
        tags: {},
        oasisPlaceBefore: '', // Select where to put the tags (jQuery selector)
        debug: false // Prevents UserTagsJS cleanup, exposes deadlock checking function
    }, settings);
    settings.tags = ($.isPlainObject(settings.tags) && settings.tags) || {};
    settings.modules = ($.isPlainObject(settings.modules) && settings.modules) || {};
 
    // Canonicalise the tags data (strings to { u: 'string' })
    (function($, tags) {
        var one;
        for (var tag in tags) {
            one = tags[tag];
            if (!one) {
                delete tags[tag];
                continue;
            }
            if (!$.isPlainObject(one)) {
                one = { u: one + '' };
            }
            one.weight = 1/0; // Infinity, user wins all
            tags[tag] = one;
        }
    })($, settings.tags);
 
    // NOTE: The loader sets the default module configuration
 
 
 
    //
    // Facade Wrapper around logger for exposing it to modules
    //
    function LoggerFacade(loggerObj, component) {
        // Prevent constructing new instances outside the core
        if (loggerObj !== logger) throw new TypeError('Invalid inner logger');
        this._component = component;
        try {
            Object.defineProperty(this, '_component', {
                value: component
                // Not writable, enumerable or configurable
            });
        } catch(e) {/*IE8 only allows defineProperty on DOM objects*/}
        return this;
    }
    // We're intentionally not providing the constructor member
    var slice = Array.prototype.slice;
    LoggerFacade.prototype = Object.freeze({
        _log: function(fn, args) {
            args = slice.call(args);
            args.unshift(this._component);
            return fn.apply(logger, args);
        },
        inf: function() { return this._log(logger.inf, arguments); },
        log: function() { return this._log(logger.log, arguments); },
        wrn: function() { return this._log(logger.wrn, arguments); },
        err: function() { return this._log(logger.err, arguments); },
        group: function() { return logger.group.apply(logger, arguments); },
        groupEnd: function() { return logger.groupEnd.apply(logger, arguments); }
    });
 
 
    //
    // Utility Class for managing groups and tag data.
    // Ensures all data is handled correctly, like properly merging tag data
    // based on the weight values when there are conflicts.
    //
    var TagCollection = function() {
        this.tags = {};
        this.groupSet = {};
        this._dynamicHash = {}; // Dynamic programming cache for getCanonTag
    };
    TagCollection.prototype = {
        constructor: TagCollection,
 
        // Merges Module output into data set
        // i.e. { groups: [], tags: {} }
        merge: function(from) {
            if (typeof(from) !== 'object' || from === null) return this;
            if (from instanceof this.constructor) {
                return this.mergeCollection(from);
            }
 
            var arr, group;
            if ($.isPlainObject(from.tags)) {
                for (group in from.tags) {
                    if (!$.isPlainObject(from.tags[group])) continue;
                    arr = (this.tags[group] || []);
                    arr.push(from.tags[group]);
                    this.tags[group] = arr;
                }
            }
            if ($.isArray(arr = from.groups)) {
                for (var i = 0, len = arr.length ; i < len ; ++i) {
                    this.groupSet[arr[i]] = 1;
                }
            }
            this._dynamicHash = null;
            return this;
        },
        // Merges another tag collection into this one
        mergeCollection: function(collection, includeOnly) {
            var group;
            includeOnly = includeOnly && includeOnly.split(/\s+/);
            if (!includeOnly || $.inArray('tags', includeOnly) !== -1) {
                for (group in collection.tags) {
                    if (typeof(this.tags[group]) !== 'object') {
                        this.tags[group] = collection.tags[group].slice();
                        continue;
                    }
                    this.tags[group].push.apply(this.tags[group], collection.tags[group]);
                }
            }
            if (!includeOnly || $.inArray('groups', includeOnly) !== -1) {
                for (group in collection.groupSet) {
                    this.groupSet[group] = 1;
                }
            }
            this._dynamicHash = null;
            return this;
        },
        // Remove an array of groups from the groups set
        removeGroups: function(groups) {
            groups = ($.isArray(groups) && groups) || [groups + ''];
            for (var i = 0, len = groups.length ; i < len ; ++i) {
                delete this.groupSet[groups[i]];
            }
            return this;
        },
        _getCanonTagInternal: function(group, groupChain) {
            // Early bail via dynamic programming cache
            if (this._dynamicHash.hasOwnProperty(group)) {
                return this._dynamicHash[group];
            }
 
            // Infinite alias recursion bomb
            if (groupChain[group] === 1) {
                logger.err('TagCollection', 'Group "' + group + '" cyclically aliases itself! (Infinite loop detected)', $.extend({}, groupChain));
                return { title: 'Infinite alias cycle. You need to fix your configuration.' };
            }
            groupChain[group] = 1;
 
            // Collapse the tag data from an array into a single data set.
            // We sort by weight during the collapse so that we get the right stacking.
            var tags = this.tags[group], one;
            if (typeof(tags) === 'object') {
                one = {};
                var len = tags.sort(this._sortByWeightFunc).length, i = 0, p, tag;
                // This is basically just a custom version of $.extend
                for ( ; i < len ; ++i) {
                    tag = tags[i];
 
                    // Check for an alias. If we've got one then we need to dig in
                    // The aliased tag will inherit the weight of the alias itself
                    if (tag.alias) {
                        // Invoke recursively, we clone to avoid corrupting the cache data
                        p = Object.create(this._getCanonTagInternal(tag.alias + '', groupChain));
                        p.weight = tag.weight;
                        tag = p;
                    }
 
                    // u/m/f are a set, we only take them as such. We will not
                    // merge a f/u on top of an m/f/u (undesirably leaking the m
                    // into the tag without it) for example.
                    if (tag.u) {
                        delete one.u;
                        delete one.m;
                        delete one.f;
                    } else if (tag.m || tag.f) {
                        logger.wrn('TagCollection', 'Bad tag! It has male/female but no unknown gender data:', tags[i]);
                        tags[i] = tag = $.extend({}, tag);
                        delete tag.m;
                        delete tag.f;
                    }
                    for (p in tag) {
                        if (tag[p] === void 0) continue; // key exists but is undefined
                        one[p] = tag[p];
                    }
                }
 
                // Unknown gender data is not optional
                if (!one.u) {
                    logger.wrn('TagCollection', 'Group "' + group + '" is missing unknown gender data!');
                }
            } else {
                // Uh, oh. Group with no tag...
                logger.wrn('TagCollection', 'Group "' + group + '" does not have any tag data!');
                one = { title: 'No Tag Information. Broken module or bad configuration!' };
            }
            // TODO: Do I want to use the aliased group or the group of the alias itself?
            one.name = group;
            // We made it to the end so there is no alias cycle (yay)
            delete groupChain[group];
            // Add to the dynamic programming cache
            this._dynamicHash[group] = one;
            return one;
        },
        // Converts a group into its canonical tag (merged tag data)
        // We also add a name field to the tag data so the group that it belongs to can be
        // identified afterwards [Used for CSS class name and is useful when logging
        // in the console]
        getCanonTag: function(group) {
            this._dynamicHash = this._dynamicHash || {};
            // We clone the tag so that we won't corrupt the dynamicHash if it is modified
            // Prototype inheritance is cheaper than a copy and gets the job done since the
            // cache won't be modified, only discarded. [$.extend was an identified bottleneck]
            var r = Object.create(this._getCanonTagInternal(group, {}));
            if (!r.u) r.u = '¿' + group + '?';
            return r;
        },
        // Canonicalise the internal state into an array of output tags based on
        // the groups set and group->tag map. Output is 'finalTags' array property.
        commit: function() {
            var arr = [], group;
            for (group in this.groupSet) {
                arr[arr.length] = this.getCanonTag(group);
            }
            this.finalTags = arr.sort(this._sortByOrderFunc);
            return this;
        },
        _sortByWeightFunc: function(a, b) {
            var aW = +a.weight || 0, bW = +b.weight || 0;
            return (aW === bW ? 0 : (aW < bW ? -1 : 1));
        },
        _sortByOrderFunc: function(a, b) {
             // 1e100 is considered "at the end except for infinity" [Max=1e307]
            a = (typeof(a.order) !== 'number' && 1e100) || a.order || 0;
            b = (typeof(b.order) !== 'number' && 1e100) || b.order || 0;
            return a === b ? 0 : (a < b ? -1 : 1);
        }
    };
 
    //
    // Representation of an active module. Wraps up the logic for interfacing
    // with the module, connecting to the AJAX engine and producing consistent
    // output given the variety of outputs accepted from the modules.
    //
    var Module = function(name, module, config) {
        this.name = name;
        this.module = module;
        this.logger = new LoggerFacade(logger, 'M:' + name);
        this.config = config;
        this._started = false;
        return this;
    };
    Module.prototype = {
        constructor: Module,
 
        // Try to start the module, returns a promise that resolves to a TagCollection.
        // (or undefined if it fails). May throw if the module does.
        tryStart: function(sledge, lang, username, config) {
            var result = this._doStart(this.module, sledge, lang, username, config || this.config);
            this._started = true;
            return result;
        },
        runFilter: function(groupSet, tagCollection) {
            // Modules that fail should not participate as filters
            // If there isn't a filter function then we don't do anything
            if (!this._started || typeof(this.module.filter) !== 'function') return;
 
            var arr = this.module.filter(groupSet);
            if (!arr) return;
            tagCollection.removeGroups(arr);
        },
        // Derivation pass
        // Allows modules to inspect all groups and merge them together into combined ones
        // like bureaucrat + inactive = inactive-bureaucrat combined group.
        // (filter pass is needed to get rid of the singles separately)
        runDerivation: function(groupSet) {
            // Modules that fail should not participate as derivers
            // We also give up if there isn't a derive function
            if (!this._started || typeof(this.module.derive) !== 'function') return;
 
            // Expected output is a group array. We aren't taking any more tags.
            var ret = this.module.derive(groupSet);
            if ($.isArray(ret)) {
                return { groups: ret };
            }
            if (ret) {
                this.logger.err('derive() should have returned an array of groups, or falsy.', ret);
            }
        },
        //
        // Actual start logic, plenty of scope for crashes, hence the try/catch wrapper in the Manager.
        // Returns a promise unless a bogus startup happens, in which case you get undefined.
        //
        _doStart: function(module, sledge, lang, username, config) {
            var thisPromise = $.Deferred(), tagData = new TagCollection(), result;
 
            // If there is no start function then we're done.
            // If the start function returns undefined or other null value then we're also done.
            if (typeof(module.start) !== 'function'
             || !(result = module.start(config, username, this.logger, lang))
               ) {
                return thisPromise.resolve(tagData).promise();
            }
 
            // We accept a variety of output but we don't want to have to deal with the
            // complexity that causes so we need to canonicalise the return value into the
            // proper object map format.
            if ($.isArray(result)) {
                result = { groups: result };
            } else if (typeof(result.promise) === 'function') {
                result = { promise: result };
            } else if (!$.isPlainObject(result)) {
                // Er, what?
                this.logger.err('start() produced a bogus return value. Expected an array, $.Deferred, an object or falsy:', result);
                return;
            }
 
            // Sanity check the types on the properties.
            if (result.groups && !$.isArray(result.groups)) {
                this.logger.err('start() returned a groups property that is not an array:', result.groups);
                delete result.groups;
            }
            if (result.tags && !$.isPlainObject(result.tags)) {
                this.logger.err('start() returned a tags property that is not an object map:', result.tags);
                delete result.tags;
            }
            if (result.promise) {
                if (typeof(result.promise.promise) !== 'function') {
                    this.logger.err('start() returned an invalid jQuery promise:', result.promise);
                    delete result.promise;
                } else if (result.promise.state() === 'rejected') {
                    // If the promise we got was already rejected then give up now
                    return thisPromise.reject().promise();
                }
            }
            tagData.merge(result);
 
            //
            // This is a lot more complicated then it should be because AJAX failure is
            // NOT a fail for us unless the module can't handle it. This means we need
            // to deal with the module recovering from the fault and still produce a
            // _resolved_ promise. We then also need to deal with the promise that we
            // were given by the module which can resolve or reject before/after the AJAX
            // does.
            //
            var onSuccess = function(data) { // generate() and promise.resolve() values
                tagData.merge($.isArray(data) ? { groups: data } : data);
            }, onPromiseSuccess = function() { // Promise is processed 2nd
                onSuccess.apply(this, arguments);
                thisPromise.resolve(tagData);
            }, onFailure = function() { // Promise failure, AJAX generateFailed() failure
                thisPromise.reject();
            }, onAjaxSuccess = (
                result.promise
                ? function() { // AJAX done, wait for promise
                    onSuccess.apply(this, arguments);
                    result.promise.done(onPromiseSuccess).fail(onFailure);
                }
                : onPromiseSuccess // No promise, just resolve immediately
                )
            ;
 
            if (result.ajax) {
                if (typeof(this.module.generate) !== 'function') {
                    throw new TypeError("AJAX was requested, but there's no generate() callback!");
                }
                sledge.request(result.ajax)
                    .done(this._makeAjaxCallback(
                        result.promise, 'generate', onAjaxSuccess, onFailure,
                        function() {
                            this.logger.err('AJAX generate() function missing!');
                        }
                    ))
                    .fail(this._makeAjaxCallback(
                        result.promise, 'generateFailed', onAjaxSuccess, onFailure,
                        function() {
                            this.logger.inf('No generateFailed() handler. Module skipped.');
                        }
                    ))
                    ;
            } else {
                onAjaxSuccess.call(this);
            }
 
            return thisPromise.promise();
        },
        //
        // Helper since both success/failure for AJAX are complicated but structurally similar.
        //
        _makeAjaxCallback: function(promise, callback, onSuccess, onFailure, onNonExistent) {
            var self = this;
            return function(/* ... */) {
                // Handle the promise we were given being rejected before the AJAX
                // completed.
                if (!promise || promise.state() !== 'rejected') {
                    // Chain through.
                    if (typeof(self.module[callback]) === 'function') {
                        try {
                            return onSuccess.call(
                                self,
                                self.module[callback].apply(self.module, arguments)
                            );
                        } catch (e) {
                            self.logger.err(callback + '() crashed:', e, e.stack);
                        }
                    } else {
                        onNonExistent.call(self);
                    }
                }
                return onFailure.call(self);
            };
        }
    };
 
    //
    // Module Manager class.
    // Code for managing Module objects and for converting all the promises into single big
    // promises. This is more complicated then you'd think because, like Module's AJAX, a
    // single failure is not a total failure. Failed Modules can be ignored which makes
    // this more complex since jQuery's deferred are very awkward with this sort of thing.
    //
    var ModuleManager = function ModuleManager(settings) {
        this._modules = [];
        this._started = false;
 
        // Debugging Hook to find deadlocked modules
        this._activeModules = {};
 
        this._selectModules(settings);
        return this;
    };
    ModuleManager.prototype = {
        constructor: ModuleManager,
 
        startAll: function(sledge, lang, username) {
            var modules = this._modules, result,
                allStarted = $.Deferred(),
                data = new TagCollection(),
                counter = { c: modules.length },
                done = $.proxy(this._moduleDone, this, allStarted, counter, data),
                fail = $.proxy(this._moduleResolve, this, allStarted, counter, data),
                debugFunc;
 
            // Tracking completion for lock-up due to bad promise handling
            if (debugOn) debugFunc = function(name, ok) {
                delete this._activeModules[name];
                logger.inf('ModuleManager', 'Module "' + name + '" has ' + ok);
            };
 
            // Start all the modules and register callbacks, if the module succeeds
            // then we're happy. If it fails then we ignore it.
            // The reason the try catch is here instead of in the module class is for performance
            // since creating and tearing down try/catch is slow, we need to minimise it.
            var i = 0, len = modules.length;
            while (i < len) {
                try { // Fast try pattern, assume no exceptions so only create 1 context
                    for ( ; i < len ; ++i) {
                        result = modules[i].tryStart(sledge, lang, username);
                        if (!result) {
                            // Modules that fail to start don't count towards the
                            // running total.
                            --counter.c;
                            continue;
                        }
 
                        // Track module completion during debug
                        if (debugOn) {
                            this._activeModules[modules[i].name] = 1;
                            result
                                .done($.proxy(debugFunc, this, modules[i].name, 'resolved'))
                                .fail($.proxy(debugFunc, this, modules[i].name, 'REJECTED'))
                                ;
                        }
 
                        result.done(done).fail(fail);
                    }
                } catch(e) {
                    modules[i].logger.err('start() crashed:', e, e.stack);
                    ++i; // Skip over failed module
                }
            }
 
            // If there are no modules then just resolve immediately and quit
            if (!counter.c) {
                allStarted.resolve(data);
            }
            this._started = true;
            return allStarted.promise();
        },
        // Applies a given logic function to every module, provides an error handling framework
        _applyModules: function(tagCollection, app, crashMsg) {
            if (!this._started) throw new Error('modules are not started yet');
 
            // Run the application function against every module
            var modules = this._modules,
                canon = Object.freeze($.extend({}, tagCollection.groupSet)),
                i = 0,
                len = modules.length;
            while (i < len) {
                try {
                    for ( ; i < len ; ++i) {
                        app.call(this, modules[i], canon);
                    }
                } catch(e) {
                    modules[i].logger.err(crashMsg, e, e.stack);
                    ++i; // Skip
                }
            }
            return tagCollection;
        },
        // Execute a single derivation pass across all modules
        // This is a synchronous generation pass
        deriveAll: function(tagCollection) {
            return this._applyModules(tagCollection, function(module, canonGroups) {
                tagCollection.merge(module.runDerivation(canonGroups));
            }, 'derive() crashed:');
        },
        // Apply all filter functions of all modules
        // The TagCollection will be altered and returned as the output
        filterAll: function(tagCollection) {
            return this._applyModules(tagCollection, function(module, canonGroups) {
                module.runFilter(canonGroups, tagCollection);
            }, 'filter() crashed:');
        },
        addModule: function(name, module, config) {
            if (this._started) throw new Error('modules are already started');
 
            this._modules.push(new Module(name, module, config));
        },
 
        // Debugging Hook to find stuck modules, only works in debug mode
        getActiveModules: function() {
            var result = [];
            for (var module in this._activeModules) {
                result[result.length] = module;
            }
            return result;
        },
 
        _moduleDone: function(deferred, counter, data, result) {
            return this._moduleResolve(deferred, counter, data.mergeCollection(result));
        },
        _moduleResolve: function(deferred, counter, data) {
            if (--counter.c === 0) {
                deferred.resolve(data);
            }
        },
        _selectModules: function(settings) {
            // Gather list of active modules (config not falsy and module exists)
            var module, conf;
            for (var moduleName in settings.modules) {
                conf = settings.modules[moduleName];
                module = settings.extensions[moduleName];
                if (!conf) continue;
                if (typeof(module) !== 'object' || module === null) {
                    logger.wrn('ModuleManager', '"' + moduleName + '" is not an installed module');
                    continue;
                }
                this._modules.push(new Module(moduleName, module, conf));
            }
        }
    };
 
    //
    // Tree walking function for removing trailing white-space from a DOM tree.
    //
    function cleanWhitespace(node) {
        var child = node.lastChild, success = false;
        while (!success && child) {
            if (child.nodeType === 3) { // Text node
                if ((/^\s*$/).test(child.data)) { // Pure whitespace, kill it
                    var tmp = child.previousSibling;
                    node.removeChild(child);
                    child = tmp;
                    continue;
                }
                // Partial whitespace = done (last non-whitespace found)
                child.data = child.data.replace(/\s+$/, '');
                return true;
            } else if (child.nodeType === 1) { // Element node
                success = cleanWhitespace(child);
            }
            child = child.previousSibling;
        }
        return success;
    }
 
    //
    // The controller singleton object.
    // Creates the module manager, runs it and takes care of the DOM Manipulation as well
    // as miscellaneous crap like I18N.
    //
    var UserTags = {
        _username: '',
        _modules: null,
        _$masthead: null, // jQuery holding masthead node
        _container: null, // DOM Node to place tags in, container allows for CSS SFX
        _usergender: 'u',
        _genderPromise: null,
        _settings: null, // Settings block
 
        _startup: function(settings) {
            // If the script was not loaded by the loader or was loaded incorrectly...
            if (typeof(settings.loader.user) !== 'string' || !settings.loader.user) {
                logger.err(0, 'Username missing? Bad loader. Aborted.');
                return;
            }
            this._username = settings.loader.user;
            return true;
        },
 
        execute: function(settings) {
            // Don't run if we're not on a user page
            if (!this._startup(settings)) return;
 
            logger.log(0, 'Starting...');
 
            // Start up
            this._modules = new ModuleManager(settings);
            // Add the Oasis Tags module to the module pile
            this._modules.addModule('OasisTagsModule', this.OasisTagsModule);
 
            // Debugging hook for deadlocked modules
            if (debugOn) {
                settings.listActiveModules = $.proxy(
                    this._modules.getActiveModules,
                    this._modules
                );
            }
 
            // Save this for later since we need to merge it with the module results
            this._settings = settings;
 
            // And away we go
            var sledge = new Sledge(logger, debugOn); // Instance auto GCs when AJAX finished
            sledge.setUsername(this._username);
            timingModules = Date.now();
            this._modulesPromise = this._modules.startAll(
                sledge,
                mw.config.get('wgUserLanguage'), // UI elements display in User's language
                this._username
            );
            timingModules = Date.now() - timingModules;
 
            // Now that everything is in motion, we start our own AJAX that
            // we need to produce correct i18n messages
            this._genderPromise = sledge.request({
                type: 'user',
                prop: ['gender']
            });
            // Dispatch all AJAX
            sledge.hammer();
 
            // Next stage processing begins when the DOM is ready (find masthead)
            timingDom = Date.now();
            $($.proxy(this._onDomReady, this));
        },
 
        //
        // Callback for DOM Ready
        // Performs 2nd stage initialisation. When finished, we'll just have to wait
        // for the modules to complete.
        //
        _onDomReady: function($) {
            timingDom = Date.now() - timingDom;
            if (debugOn) {
                logger.inf(0, 'Entering DOM Ready');
            }
 
            var $masthead = $(
                siteSkin === 'oasis'
                ? '#UserProfileMasthead > .masthead-info > hgroup'
                : '#firstHeading'
            );
            if (!$masthead.length) { // This shouldn't happen
                return logger.err(0, "No Masthead found. We shouldn't have got this far...");
            }
            // In Oasis, masthead is #UserProfileMasthead, Monobook is just the H1
            this._$masthead = (siteSkin === 'oasis' ? $masthead.parent().parent() : $masthead);
 
            // Invoke the onDOMReady function in OasisTagsModule since it needs to
            // scrape the page now
            this.OasisTagsModule.onDOMReady($masthead);
 
            // Look for tag-container nodes left over from previous runs
            // (Should only happen when debugging)
            if (debugOn) {
                $masthead.find('.tag-container').remove();
            }
 
            // Now we need to decide where we are going to put the things, check if the user
            // has given us a placement selector and try to find the node. Once we know where
            // to put it, we just stick our container node into the DOM for later.
            var node = null;
            if (siteSkin === 'oasis' && settings.oasisPlaceBefore) {
                try {
                    // NOTE: A <HTML> selector will throw with .find()
                    node = $masthead.find(settings.oasisPlaceBefore)[0] || null;
                    if (!node) {
                        logger.wrn(0, 'settings.oasisPlaceBefore did not match anything:', settings.oasisPlaceBefore);
                    }
                } catch (e) {
                    logger.err(0, 'Exception while processing oasisPlaceBefore:', e, e.stack);
                }
            }
            var container = this._container = document.createElement('span');
            container.className = 'tag-container';
            $masthead[0].normalize();
            if (node) {
                node.parentNode.insertBefore(container, node);
            } else {
                // We need to remove the whitespace from the end of the masthead as it
                // will become visible if we append something after it.
                cleanWhitespace($masthead[0]);
                $masthead.append(container);
            }
 
            // We need the gender information before we can proceed at this point
            // (So we can select the right tag based on gender)
            var self = this;
            timingAjax = Date.now();
            this._genderPromise
                .done(function(json) {
                    json = json && json.query;
                    json = json && json.users;
                    json = json && json[0];
                    json = json && json.gender;
                    // Values are "male", "female", "unknown"
                    if (typeof(json) === 'string' && json) self._usergender = json.charAt(0);
                })
                .always(function() {
                    // Now that we're all set, we just need the modules to complete
                    self._modulesPromise.done($.proxy(self._onModulesDone, self));
                })
                ;
        },
 
        //
        // Final stage processing. Filtering pass and display Tags on the UI.
        //
        _onModulesDone: function(data) {
            timingAjax = Date.now() - timingAjax;
            if (debugOn) {
                logger.inf(0, 'Entering Finale');
                settings.TagData = data; // Expose TagCollection for debugging
                settings.UserTags = this;
                logger.log(0, 'Group set before derivation:', $.extend({}, data.groupSet));
            }
 
            // We need to run the derivation pass before we can generate the tags
            var timingDerive = Date.now();
            this._modules.deriveAll(data);
            timingDerive = Date.now() - timingDerive;
 
            // Log the pre filtering
            if (debugOn) {
                logger.log(0, 'Group set before filtering:', $.extend({}, data.groupSet));
            }
 
            // Merge the user's custom tag data into the data set now and
            // get the black tags out of the OasisTagsModule. We force them
            // into the output but allow the user to make them links and add
            // tooltips, but not control the order or text.
            var first, tags = this.OasisTagsModule.getBlackTags(
                data.merge({ tags: this._settings.tags })
            );
            this._writeTags(tags);
            first = tags[0] && tags[0].name;
 
            // Finally, run the filtering pass, then write the damn things to the DOM
            var timingFilter = Date.now();
            // filter users groups here
            // unblacklist requested (explicitly) groups 3.0 - prepare
            var userGroups;
            try {
                userGroups = this._settings.extensions.mwGroups._userGroups;
            } catch (exc) {}
            // groupset and usergroups must have the group in order to unblacklist it
            // tags: previously added tags (blacklist-based stuff for staff etc)
            if (userGroups && data && data.groupSet) {
                this.OasisTagsModule._blacklist = this.OasisTagsModule._blacklist.filter(function(g) {
                    return (tags.filter(function(tag){return tag.name===g}).length || !(
                                data.groupSet[g] &&
                                userGroups.indexOf(g) > -1)
                            );
                });
            }
            // previous block - end
            this._modules.filterAll(data);
            timingFilter = Date.now() - timingFilter;
            this._writeTags(tags = data.commit().finalTags);
            first = first || (tags[0] && tags[0].name);
 
            // Add masthead class
            if (first) {
                this._$masthead.addClass('usergroup-' + this._canonicaliseCSS(first));
                if (debugOn) {
                    logger.log(0, 'Group "' + first + '" picked as masthead group');
                }
            }
 
            // Timing instrumentation stats so I can figure out if I accidentally make things slower
            var total = Date.now() - timingStart, weight = total - timingModules - timingDom - timingAjax;
            function timing(caption, n) {
                return caption + ': ' + n + 'ms (' + (n / total * 100).toFixed(2) + '%); ';
            }
            logger.inf(0, 'All tasks complete in ' + total + 'ms\n'
                + timing('Module Start', timingModules)
                + timing('DOM Pause', timingDom)
                + timing('AJAX + Modules Wait', timingAjax)
                + timing('Module derivation', timingDerive)
                + timing('Module filters', timingFilter)
                + timing('Other + External Delays', weight)
            );
        },
 
        //
        // Make an arbitrary string into a valid CSS class string
        //
        _canonicaliseCSS: (function() {
            var r1 = /[^A-Za-z0-9\-_]/g, r2 = /\s+/g;
            return function(str) {
                return (str + '').replace(r2, '-').replace(r1, '');
            };
        })(),
        //
        // Gets the appropriate tag text based on the user's gender
        //
        _getTagMessage: function(tag) {
            if (debugOn) {
                logger.log('getTagMessage', tag, this._usergender);
            }
            return tag[this._usergender] || tag.u; // Fall back to unknown gender
        },
        _writeTags: function(tags) {
            var node, frag = document.createDocumentFragment(),
                isFullURL = /^(?:[A-Za-z\.+\-]+:)?\/\//, cssClass, part, link;
            for (var i = 0, len = tags.length ; i < len ; ++i) {
                if (tags[i].link) {
                    node = document.createElement('a');
                    link = tags[i].link + '';
                    if (isFullURL.test(link)) {
                        node.href = link;
                    } else {
                        // Hash links need to be broken apart since the encoder will encode it
                        // NOTE: Hashes CANNOT occur in MediaWiki page titles
                        part = link.lastIndexOf('#');
                        if (part === -1) {
                            node.href = mw.util.wikiGetlink(link);
                        } else {
                            node.href = mw.util.wikiGetlink(link.substr(0, part))
                                + '#' + mw.util.wikiUrlencode(link.substr(part + 1))
                                ;
                        }
                    }
                } else {
                    node = document.createElement('span');
                }
                if (tags[i].title) node.title = tags[i].title;
 
                node.className = 'tag';
                if (tags[i].name) {
                    cssClass = this._canonicaliseCSS(tags[i].name);
                    // -user suffix is legacy from UserBadges
                    node.className += ' usergroup-' + cssClass + ' ' + cssClass + '-user';
                }
 
                node.appendChild(document.createTextNode(this._getTagMessage(tags[i])));
                frag.appendChild(node);
                frag.appendChild(document.createTextNode(' '));
            }
            this._container.appendChild(frag);
        }
    };
 
    //
    // This is a super-module that contains the code we need in order to decode
    // and process Wikia generated tags. This is implemented as a module as it
    // reduces the amount of special and irrelevant code in the UserTags object.
    // NON-STANDARD:
    //    onDOMReady: called when the core enters the DOM Ready state
    //    getBlackTags: Get the forced output tags
    //
    // RULES:
    // Whitelist groups get added to the group pool (so they can be filtered)
    // Blacklist groups cannot be generated ever and the tags for them will be
    //    forced into the output, the text and order is forced but other settings
    //    are freely controlled.
    //
    // This used to use a whitelist but I decided to err on the side of Wikia's
    // changes probably adding things that I wouldn't want filtered out.
    //
    UserTags.OasisTagsModule = {
        _blacklist: [
            'staff',
            'wiki-manager',
            'content-team-member',
            'helper',
            'vstf',
            'global-discussions-moderator',
            'voldev',
            'vanguard',
            'council',
            'content-volunteer',
            'authenticated', // Official PR accounts of companies
        ],
        _storageKey: 'UserTags-OasisTagsModule-TagDataCache',
        //bannedfromchat fix prepare
        getbannedfromchat: function() {
            var promise = $.Deferred();
            $.getJSON('/api.php', {
                action: 'query',
                meta: 'allmessages',
                amenableparser: 1,
                amparam: this._username,
                amlang: ($.getUrlVar('uselang') || mw.config.get('wgUserLanguage') || mw.config.get('wgContentLanguage')),
                ammessages: 'user-identity-box-banned-from-chat',
                format: 'json'
            })
            .done(function(data) {
                if (data.error) {
                    promise.reject(data);
                    return this;
                }
                data = data.query.allmessages[0];
                if (data && data.missing === undefined) {
                    promise.resolve(data['*']);
                } else {
                    promise.reject(data);
                }
            })
            .fail(function(data) {
                promise.reject(data);
                return this;
            });
            return promise.promise();
        },
        //bannedfromchat fix prepare end
        //
        // We fetch the Oasis identity stuff in Monobook as well, because we can and users
        // tend to have trouble understanding why "it doesn't work"
        start: function(config, username, logger/*, lang*/) {
            this._logger = logger;
            this._blackTags = { groups: [], tags: {} };
            this._scrapedTags = {};
            //bannedfromchat fix
            var _this = this;
            this.getbannedfromchat().done(function(text) {
                _this.getbannedfromchattext = text;
            });
            //bannedfromchat fix end
 
            // Don't query if we have fresh cache
            var cache = $.storage && $.storage.get(this._storageKey);
            if (cache && cache.expiry > Date.now()) {
                this._cached = cache.data;
                return (this._promise = $.Deferred()).promise();
            }
 
            return {
                ajax: {
                    meta: 'allmessages',
                    amprefix: 'user-identity-box-group-',
                    amenableparser: '1',
                    amargs: username
                }
            };
        },
        // DOM STATE
        // Scrape Wikia's tags off the page so we can figure out what groups are currently present
        onDOMReady: function($masthead) {
            if (siteSkin === 'oasis') {
                var self = this;
                $masthead.find('.tag').each(function(index) {
                    var $this = $(this), text = $this.html();
                    if (!self._scrapedTags.hasOwnProperty(text)) {
                        self._scrapedTags[text] = index;
                    }
                    $this.remove();
                });
            }
            // If we're using cached data then generate will never be called directly
            if (this._cached) try {
                this._promise.resolve(this.generate({ query: { allmessages: this._cached } }, true));
            } catch (e) {
                this._logger.err('Implosion whilst processing cached tag data:', e, e.stack);
                $.storage.del(this._storageKey);
                this._promise.resolve(this.generateFailed());
            }
        },
        // AJAX done, figure out what the scraped tags are and build the blacklist
        generate: function(json, fromCache) {
            json = json.query.allmessages;
            var regex = /^user-identity-box-group-(.+)$/,
                groups = [], tagData = {}, blackTags = this._blackTags,
                group, group0, rawtext, text, tag, $node = $(document.createElement('div'));
            //bannedfromchat fix start
            if (this.getbannedfromchattext) {
                var jsoncopy = [];
                $.extend(true, jsoncopy, json);
                jsoncopy.push({
                    name: 'user-identity-box-group-bannedfromchat',
                    '*': this.getbannedfromchattext
                });
                json = jsoncopy;//unfreezed version
            }
            //bannedfromchat fix end
            for (var i = 0, len = json.length ; i < len ; ++i) {
                group0 = regex.exec(json[i].name);
                if (!group0) continue;
 
                group = group0[1];
                rawtext = json[i]['*'];
                text = $node.html(rawtext).text();
 
                // Biasing in favour of these over the mediaWiki group data as
                // users seem to prefer it that way. [mwGroups uses 1e100]
                // Order is placed slightly before MediaWiki groups
                tag = { u: text, weight: 2e100, order: -1 };
                if (this._scrapedTags.hasOwnProperty(rawtext)) {
                    // Blacklist tags have enforcement of order and display text
                    if ($.inArray(group, this._blacklist) !== -1) {
                        blackTags.tags[group] = {
                            u: text, weight: 1/0, order: this._scrapedTags[rawtext]
                        };
                        blackTags.groups[blackTags.groups.length] = group;
                    }
                    // We add the groups so they show up in the filter list. [So that
                    // other modules can see they exist]
                    // NOTE: Black groups will just be filtered out by our filter function later
                    groups.push(group);
                    delete this._scrapedTags[text];
                }
                // We always store the data as it may be useful even if it doesn't
                // actually exist at the moment. And we did go to the trouble of
                // fetching it, may as well make as much use of it as possible...
                tagData[group] = tag;
            }
            if (debugOn) {
                for (text in this._scrapedTags) {
                    this._logger.wrn('Scraped tag was not claimed:', text);
                }
            }
            // Cache data for reuse to avoid multiple queries for the same thing
            if (!fromCache && $.storage) {
                $.storage.set(this._storageKey, {
                    expiry: Date.now() + 36e5, // +1hr
                    data: json
                });
            }
            return {
                tags: tagData,
                groups: groups
            };
        },
        generateFailed: function() {
            // All tags are black in the event of failure
            var result = this._blackTags, $node = $(document.createElement('div')), i = 0;
            for (var tag in this._scrapedTags) {
                result.groups.push(i);
                result.tags[i] = {
                    u: $node.html(tag).text(),
                    order: this._scrapedTags[tag]
                };
                ++i;
            }
            result.error = true;
        },
        // FINALE
        // Prevent blacklisted tags from being generated ever
        filter: function(/*tags*/) {
            return this._blacklist;
        },
        // List of forced output tags
        getBlackTags: function(canon) {
            var data = new TagCollection();
            // Error case is raw tag data so we don't mix user data in
            if (!this._blackTags.error) data.mergeCollection(canon, 'tags');
            return data
                .merge(this._blackTags)
                .commit()
                .finalTags
                ;
        }
    };
    /*var TagWhitelist = {
        founder:1,
        blocked:1,
        chatmoderator:1,
        sysop:1,
        bureaucrat:1
    };*/
 
    //
    // Start.
    //
    try {
        UserTags.execute(settings);
    } catch(e) {
        return logger.err(0, 'Crash:', e, e.stack);
    }
 
    // Clean the garbage out of the global for GC and set double-run prevention
    if (!debugOn) {
        window.UserTagsJS = null; // IE8 won't let you delete from the window
        try { delete window.UserTagsJS; } catch(e) { /* and it throws */ }
        return { Core: true };
    }
    window.UserTagsJS = settings;
    dev.UserTags.Core = true;
    return dev.UserTags;
})(jQuery, document, mediaWiki, UserTagsJS, dev.UserTags.Logger, dev.UserTags.SledgeAJAX);