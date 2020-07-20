/**
 * @name            Fetch
 * @version         v1.2
 * @author          TheGoldenPatrik1
 * @description     Library for fetching and caching API requests.
 */
;(function (window, $, mw) {
    window.dev = window.dev || {};
    if (window.dev.fetch !== undefined) {
        return;
    }
    var config = mw.config.get([
        'debug',
        'wgUserLanguage'
    ]);
    /**
     * @method clearCache
     * @description Clears the Fetch cache
     * @returns {void}
     */
    function clearCache () {
        for (var key in localStorage) {
            if (key.startsWith('fetch-')) {
                localStorage.removeItem(key);
            }
        }
    }
    /**
     * @method fetch
     * @description Gets the message(s) and stores them
     * @param {Object} params - The Fetch parameters to use
     * @returns {promise}
     */
    function fetch (params) {
        var promise = $.Deferred();
        if (
            Array.isArray(params) ||
            typeof params === 'string'
        ) {
            params = {
                messages: params
            };
        }
        if (typeof params !== 'object') {
            console.warn('[Fetch] Insufficient parameters supplied.');
            promise.reject();
            return promise;
        }
        if (params.noCache !== true) {
            params.noCache = false;
        }
        if (params.messages) {
            var uselang = config.wgUserLanguage || 'en';
            if (typeof params.lang === 'string') {
                uselang = params.lang;
            }
            var arr;
            var msg = params.messages;
            if (Array.isArray(msg)) {
                arr = msg;
                msg = msg.join('|');
            }
            return fetch({
                request: function (resolve, reject) {
                    new mw.Api().get({
                        action: 'query',
                        meta: 'allmessages',
                        ammessages: msg,
                        amlang: uselang
                    })
                    .done(function (d) {
                        if (d.error) {
                            reject(d.error.code);
                        } else {
                            resolve(d.query.allmessages);
                        }
                    })
                    .fail(function () {
                        reject();
                    });
                },
                process: function (data) {
                    if (msg.indexOf('|') !== -1) {
                        var mo = {};
                        $.each(arr || msg.split('|'), function (k, v) {
                            mo[v] = data[k]['*'];
                            mo[k] = data[k]['*'];
                        });
                        return function (v) {
                            if (v) {
                                return mo[v];
                            } else {
                                return mo;
                            }
                        };
                    } else {
                        return data[0]['*'];
                    }
                },
                name: 'msg-' + uselang + '-' + msg,
                noCache: params.noCache,
                time: params.time
            });
        } else if (
            typeof params.request === 'function' &&
            typeof params.name === 'string'
        ) {
            var storageName = 'fetch-' + params.name;
            var storage = JSON.parse(window.localStorage.getItem(storageName));
            var time = 24 * 60 * 60 * 1000;
            if (typeof params.time === 'number') {
                time = params.time;
            }
            if (
                storage &&
                storage.data &&
                Date.now() - storage.time < time &&
                params.noCache !== true
            ) {
                if (typeof params.process === 'function') {
                    storage.data = params.process(storage.data);
                }
                promise.resolve(storage.data);
                return promise;
            }
            params.request(
                function (data) {
                    if (params.noCache !== true) {
                        window.localStorage.setItem(storageName, JSON.stringify({
                            time: Date.now(),
                            data: data
                        }));
                    }
                    if (typeof params.process === 'function') {
                        data = params.process(data);
                    }
                    promise.resolve(data);
                },
                function (data) {
                    promise.reject(data);
                }
            );
        } else {
            console.warn('[Fetch] Insufficient parameters supplied.');
            promise.reject();
        }
        return promise;
    }
    /**
     * @method init
     * @description Defines window.dev.fetch and adds cache clearing
     * @returns {void}
     */
    function init () {
        if (
            config.debug ||
            Math.floor(Math.random() * 101) === 100
        ) {
            clearCache();
        }
        window.dev.fetch = fetch;
        mw.hook('dev.fetch').fire(window.dev.fetch);
        document.addEventListener('keydown', function (e) {
            if (
                e.ctrlKey &&
                (
                    (e.shiftKey && e.which === 82) ||
                    e.which === 116
                ) &&
                (
                    !document.activeElement ||
                    ['input', 'textarea'].indexOf(
                        document.activeElement.nodeName.toLowerCase()
                    ) === -1
                )
            ) {
                e.preventDefault();
                clearCache();
                window.location.reload();
            }
        });
    }
    mw.loader.using('mediawiki.api').then(init);
})(this, jQuery, mediaWiki);