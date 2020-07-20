/**
 * Name:        MastheadGender
 * Version:     v1.2
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds a user's gender from preferences
 *              to the top of their masthead as a tag
 */
(function() {
    'use strict';
    if ($('#UserProfileMasthead').length === 0 || window.MastheadGenderLoaded) {
        return;
    }
    window.MastheadGenderLoaded = true;
    var MastheadGender = {
        username: $('.masthead-info h1').text(),
        cache: JSON.parse(window.localStorage.getItem('MastheadGender')) || {},
        init: function() {
            var cached = this.cache[this.username];
            if (this.validCache(cached)) {
                this.insert(cached.value);
            } else {
                mw.loader.using('mediawiki.api')
                    .then($.proxy(this.loader, this));
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
            new mw.Api().get({
                action: 'parse',
                text: '{{gender:' + this.username +
                      '|{{int:gender-male}}|{{int:gender-female}}|neutralstring}}',
                disablepp: true
            }).done($.proxy(this.callback, this));
        },
        callback: function(d) {
            var text = d.parse.text['*']
                .replace(/<\/?p>/g, '')
                .trim();
            this.cache[this.username] = {
                timestamp: Date.now(),
                value: text
            };
            this.saveCache();
            this.insert(text);
        },
        insert: function(text) {
            if (text === 'neutralstring') {
                return;
            }
            var $tag = $('<span>', {
                'class': 'tag MastheadGender',
                text: text
            });
            $('.masthead-info hgroup').append($tag);
            mw.hook('dev.tags').fire($tag);
        }
    };
    MastheadGender.init();
})();