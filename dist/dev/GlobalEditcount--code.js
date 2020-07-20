/**
 * Name:        Global edit count script
 * Author:      Noreplyz
 *              KockaAdmiralac
 *              Dorumin (small modifications)
 * Description: Adds a global edit count to user's masthead.
 */

(function() {
    if ($('#UserProfileMasthead').length === 0 || window.GlobalEditcountLoaded) {
        return;
    }
    window.GlobalEditcountLoaded = true;
    var GlobalEditcount = {
        cache: JSON.parse(window.localStorage.getItem('GlobalEditcount')) || {},
        preload: function(i18n) {
            this.user = $('#UserProfileMasthead h1').text();
            this.url = mw.util.getUrl('Special:Editcount/' + this.user);
            $.when(
                i18n.loadMessages('GlobalEditcount'),
                this.editcount()
            ).then($.proxy(this.init, this));
        },
        editcount: function() {
            this.promise = new $.Deferred();
            var cache = this.cache[this.user];
            if (
                cache &&
                cache.timestamp &&
                // 1 hour caching
                Date.now() - cache.timestamp < 60 * 60 * 1000
            ) {
                this.promise.resolve(cache.value);
                return this.promise;
            }
            $.get(this.url, $.proxy(this.cbEditcount, this));
            return this.promise;
        },
        cbEditcount: function(page) {
            var edits = $(page)
                .find('.TablePager th')
                .eq(7)
                .text();
            if (edits) {
                this.cache[this.user] = {
                    timestamp: Date.now(),
                    value: edits
                };
                window.localStorage.setItem('GlobalEditcount', JSON.stringify(this.cache));
                this.promise.resolve(edits);
            }
        },
        init: function(i18n, edits) {
            mw.util.addCSS(
                '.UserProfileMasthead .globaledit-details a:hover {' +
                    'color: ' + mw.config.get('wgSassParams')['color-links'] + ';' +
                '}'
            );
            this.$element = $('<div>', {
                'class': 'globaledit-details discussion-details tally'
            }).append(
                $('<a>', {
                    id: 'globaleditAllEditsByUser',
                    href: window.GlobalEditcountPlain ? '#' : this.url
                }).append(
                    $('<em>', {
                        text: edits
                    }),
                    $('<span>', {
                        'class': 'globaledit-label',
                        'text': i18n.msg('globaleditcount').plain()
                    })
                )
            );
            $('.tally').first().after(this.$element);
            mw.hook('GlobalEditcount.loaded').fire(this);
        }
    };
    mw.hook('dev.i18n').add($.proxy(GlobalEditcount.preload, GlobalEditcount));
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:GlobalEditcount.css'
    });
})();