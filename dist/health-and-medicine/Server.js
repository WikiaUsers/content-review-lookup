/** 
 * Script Preferences (server component)
 * documentation at: http://dev.wikia.com/wiki/Preferences
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 *  
 */

(function ($, w) {
 
    'use strict';
 
    var debug = true, //w.sessionStorage && w.sessionStorage.getItem('debug'),
        log = (w.console && w.console.log && function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('PrefServer:');
            w.console.log.apply(w.console, args);
        }) || $.noop;
 
 
    var list = {};
    
    var Response = new Function();
    
    Response.prototype = {
        
        init: function (source, origin, data) {
            this.source = source;
            this.origin = origin;
            if (data) {
                this.id = data.id;
                this.user = data.user;
                this.contents = data.contents;
                this.addon = data.addon;
            }
        },
        
        success: function (msg) {
            if (debug) log('success: ', msg);
            this.source.postMessage(JSON.stringify({
                result: 'success',
                id: this.id,
                msg: msg || {}
            }), this.origin);
            if (this.id) delete list[this.id];
        },
        
        failure: function (error, details) {
            if (debug) log('failure: ', error, details);
            this.source.postMessage(JSON.stringify({
                result: 'failure',
                msg: {
                    error: error,
                    details: details || {}
                }
            }), this.origin);
            if (this.id) delete list[this.id];
        }
    };
    
    var Responses = {
        Save:       new Function(),
        LoadShared: new Function(),
        CacheGet:   new Function(),
        CacheSet:   new Function()
    };
    
    Responses.Save.prototype = $.extend(new Response(), {
        
        createScript: function () {
            var pre = '(function(ns){(ns.preferences=ns.preferences||{}).getData=function(){return',
                post = '}}(window.dev=window.dev||{}));';
            return pre + JSON.stringify(this.preferences) + post;
        },
        
        editPage: function (token, file, text) {
            var deferred = new $.Deferred(),
                that = this;
            $.post('/api.php', {
                action: 'edit',
                format: 'json',
                token: token,
                title: 'User:' + this.user + file,
                text: text
            })
            .done(function (reply) {
                if (reply.edit && reply.edit.result && reply.edit.result === 'Success') {
                    deferred.resolve();
                } else {
                    that.failure('unexpected reply to save request', reply);
                    deferred.reject();
                }
            })
            .fail(function (error) {
                that.failure('could not save '+title, error);
                deferred.reject();
            });
            return deferred.promise();
        },
        
        getEditToken: function () {
            var deferred = new $.Deferred(),
                that = this;
            $.getJSON('/api.php', {
                action: 'query',
                prop: 'info',
                intoken: 'edit',
                titles: 'User:' + this.user + '/preferences.js',
                 format: 'json'
            })
            .done(function (reply) {
                var token;
                if (reply && reply.query && reply.query.pages) {
                    for (var i in reply.query.pages) {
                        if (reply.query.pages.hasOwnProperty(i)) {
                            token = reply.query.pages[i].edittoken;
                            deferred.resolve(token);
                            break;
                        }
                    }
                } else {
                    that.failure('unexpected reply to token request', reply);
                    deferred.reject();
                }
            })
            .fail(function (error) {
                that.failure('could not acquire token', error);
                deferred.reject();
            });
            return deferred.promise();
        },
        
        process: function () {
            if (!this.contents.preferences || typeof this.contents.preferences !== 'object') {
                this.failure('expected preferences object', this.contents);
            } else {
                var that = this;
                this.preferences = this.contents.preferences;
                this.shared = this.contents.shared || false;
                this.getEditToken()
                .done(function (token) {
                    that.editPage(token, '/preferences.js', that.createScript())
                    .done(function () {
                        if (that.shared) {
                            that.editPage(token, '/shared.js', JSON.stringify(that.shared))
                            .done(function () {
                                that.success();
                            });
                        } else {
                            that.success();
                        }
                    })
                });
            }
        }
    });
    
    Responses.LoadShared.prototype = $.extend(new Response(), {
        process: function () {
            var templates = [];
            if (!$.isArray(this.contents)) {
                this.failure('expected list of users', this.contents);
            } else {
                for (var i = 0, c = this.contents.length; i < c; i++) {
                    if (typeof this.contents[i] !== 'string') {
                        this.failure('expected list of strings', this.contents);
                        return;
                    }
                    var file = 'User:' + this.contents[i] + '/shared.js';
                    templates.push(
                        '"' + this.contents[i] + '":{{#ifexist:' + file + '|{{:' + file + '}}|{{(}}{{)}}}}'
                    );
                }
                var text = '{{(}}' + templates.join(',') + '{{)}}',
                    that = this;
                $.getJSON('//preferences.wikia.com/api.php', {
                    action: 'expandtemplates',
                    prop: 'templates',
                    format: 'json',
                    text: text
                })
                .done(function (data) {
                    log('$.getJSON.done: ', data);
                    if (!data || !data.expandtemplates || !data.expandtemplates['*']) {
                        that.failure('API returned error', data);
                    } else {
                        try {
                            log('data.expandtemplates["*"]: ', data.expandtemplates['*']);
                            that.success(JSON.parse(data.expandtemplates['*']));
                        } catch (e) {
                            that.failure('cannot parse API response', e);
                        }
                    }
                })
                .fail(function (error) {
                    that.failure('API request failed', error);
                });
            }
        }
    });
    
    var cache = JSON.parse(w.localStorage.getItem('preferences'));
    
    Responses.CacheGet.prototype = $.extend(new Response(), {
        process: function () {
            this.success(cache[this.addon] || {});
        }
    });
    
    Responses.CacheSet.prototype = $.extend(new Response(), {
        process: function () {
            cache[this.addon] = this.contents;
            w.localStorage.setItem('preferences', cache);
            this.success();
        }
    });
    
    function createResponse (event) {
        if (!event || !event.data || !event.origin || !/\.wikia\.com$/i.test(event.origin) ||
            !event.source || w.top !== event.source) {
            return;
        }
        
        var raw, response = new Response();
        response.init(event.source, event.origin);
        
        console.log('event: ', event);
        
        try {
            raw = JSON.parse(event.data);
        } catch (e) {
            response.failure('cannot parse data', e);
            return;
        }
        
        console.log('raw:', raw);
        
        if (!raw || raw.addon === undefined || !raw.user || !raw.id || !raw.action || !raw.contents) {
            response.failure('missing properties', event.data);
        } else if (!Responses[raw.action]) {
            response.failure('unknown action', raw.action);
        } else {
            list[raw.id] = new Responses[raw.action]();
            list[raw.id].init(event.source, event.origin, raw);
            list[raw.id].process();
        }
    }
    
    if (w.postMessage && w.JSON) {
        if (w.addEventListener) {
            w.addEventListener('message', createResponse, false);
        } else if (w.attachEvent) {
            w.attachEvent('onmessage', createResponse);
        }
    }

}(jQuery, window));