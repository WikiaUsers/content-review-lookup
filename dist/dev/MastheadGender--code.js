/**
 * Name:        MastheadGender
 * Version:     v1.3
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Adds a user's gender from preferences
 *              to the top of their masthead as a tag
 */
(function() {
    'use strict';
    if (!mw.config.get('profileUserName') || window.MastheadGenderLoaded) {
        return;
    }
    window.MastheadGenderLoaded = true;
    var MastheadGender = {
        username: mw.config.get('profileUserName'),
        cache: JSON.parse(window.localStorage.getItem('MastheadGender')) || {},
        init: function() {
            if (
                mw.util.isIPv4Address(this.username) ||
                mw.util.isIPv6Address(this.username)
            ) {
                return;
            }
            var cached = this.cache[this.username];
            if (this.validCache(cached)) {
                this.findContainer()
                    .then($.proxy(this.insert, this, cached.value));
            } else {
                $.when(
                    this.loader(),
                    this.findContainer(),
                    this.waitForI18n()
                ).done($.proxy(this.callback, this));
            }
            if (Math.round(Math.random() * 10) === 1) {
                // Let's clean up the cache but only sometimes
                for (var user in this.cache) {
                    if (!this.validCache) {
                        delete this.cache[user];
                    }
                }
                this.saveCache();
            }
        },
        waitForI18n: function() {
            var $promise = $.Deferred();
            mw.hook('dev.i18n').add(function(i18n) {
                i18n.loadMessages('MastheadGender')
                    .then($promise.resolve);
            });
            return $promise;
        },
        validCache: function(cache) {
            return cache &&
                   cache.timestamp &&
                   cache.value &&
                   Date.now() - cache.timestamp < 24 * 60 * 60 * 1000;
        },
        saveCache: function() {
            window.localStorage.setItem('MastheadGender', JSON.stringify(this.cache));
        },
        loader: function() {
            return new mw.Api().get({
                action: 'query',
                meta: 'allmessages',
                list: 'users',
                ususers: this.username,
                usprop: 'gender'
            });
        },
        findContainer: function() {
            var promise = $.Deferred(),
                interval = setInterval(function() {
                    var $element = $('#userProfileApp .user-identity-header__attributes');
                    if ($element.length) {
                        clearInterval(interval);
                        promise.resolve($element);
                    }
                }, 300);
            return promise;
        },
        callback: function(data, $container, i18n) {
            if (data[0].query.users.length === 0) {
                // No such user exists.
                return;
            }
            var gender = data[0].query.users[0].gender;
            var text = (gender === 'unknown') ?
                'unknown' :
                i18n.msg(gender).plain();
            this.cache[this.username] = {
                timestamp: Date.now(),
                value: text
            };
            this.saveCache();
            this.insert(text, $container);
        },
        insert: function(text, $container) {
            if (text === 'unknown') {
                return;
            }
            var $tag = $('<span>', {
                'class': 'tag user-identity-header__tag MastheadGender',
                text: text
            });
            $container.append($tag);
            mw.hook('dev.tags').fire($tag);
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then($.proxy(MastheadGender.init, MastheadGender));
})();