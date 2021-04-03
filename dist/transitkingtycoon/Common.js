/* Any JavaScript here will be loaded for all users on every page load. */
// Tooltip script for [[Template:Icon]]
if ($('.tkt-icon').length > 0) {
    var win = $(window), winWidth, winHeight, width, height;
    $('#mw-content-text').on({ 
        'mouseenter.tkt-icon': function(e) { 
            // Remove title attribute from tkt-icon anchors to prevent overlapping tooltips
            $('.tkt-icon a').find('[title]').addBack().removeAttr('title'); 

            tooltip = $(this).find('.tooltip');
            // Cache current window and tooltip size
            winWidth = win.width();
            winHeight = win.height();
            width = tooltip.outerWidth(true);
            height = tooltip.outerHeight(true);
            // Trigger a mouse movement to position the tooltip
            tooltip.trigger('mousemove', e);
        },
        'mousemove.tkt-icon': function(e, trigger) {
            // Get event data from remote trigger
            e = trigger || e;
            // Get mouse position and add default offsets
            var top = e.clientY - 34,
                left = e.clientX + 14;
            // If going off the right of the screen, go to the left of the cursor
            if (left + width > winWidth) {
                left -= width + 36;
            }
            // If now going off to the left of the screen, resort to going above the cursor
            if (left < 0) {
                left = 0;
                top -= height - 22;
                // Go below the cursor if too high
                if (top < 0) {
                    top += height + 47;
                }
            // Don't go off the top of the screen
            } else if (top < 0) {
                top = 0;
            // Don't go off the bottom of the screen
            } else if (top + height > winHeight) {
                top = winHeight - height;
            }
            // Apply the positions
            tooltip.css({
                top: top,
                left: left
            });
        }
    });
}
/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Allows intergration with Discord [https://discord.com]
 */
(function(mw, $) {
    'use strict';
    var mconfig = mw.config.get([
        'wgUserLanguage',
        'wgUserName'
    ]);
    if (window.DiscordIntegratorLoaded) {
        return;
    }
    window.DiscordIntegratorLoaded = true;
    /**
     * Main object
     * @static
     */
    var DiscordIntegrator = {
        /**
         * Configuration for the plugin
         * @property config
         * @type {Object}
         */
        config: (window.DiscordIntegratorConfig || {}).siderail || {},
        /**
         * Preloads translations.
         */
        hook: function(i18n) {
            $.when(
                i18n.loadMessages('DiscordIntegrator'),
                mw.loader.using('mediawiki.api')
            ).then($.proxy(this.preload, this));
        },
        /**
         * Preload resources
         */
        preload: function(i18n) {
            this.i18n = i18n;
            mw.hook('wikipage.content').add($.proxy(this.insertToContent, this));
            this.api = new mw.Api();
            this.api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: [
                    'id',
                    'title',
                    'moduleHeight',
                    'theme',
                    'width',
                    'height',
                    'text',
                    'logged-in',
                    'footer',
                    'username'
                ].map(function(el) {
                    return 'Custom-DiscordIntegrator-config-' + el;
                }).join('|'),
                amlang: mconfig.wgUserLanguage,
                uselang: 'content', // T97096
                smaxage: 300,
                maxage: 300
            }).done($.proxy(function(d) {
                if (!d.error) {
                    d.query.allmessages.forEach(function(el) {
                        if(el['*']) {
                            this.config[el.name.substring(32)] = el['*'];
                        }
                    }, this);
                    this._loading = 0;
                    ['text', 'title', 'footer'].forEach(this.parse, this);
                    if (this._loading === 0) {
                        this.init();
                    }
                }
            }, this));
        },
        /**
         * Parse the configuration that needs to be parsed
         */
        parse: function(msg) {
            if (this.config[msg]) {
                ++this._loading;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg]
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }
        },
        /**
         * Initializing
         */
        init: function() {
            if (this.config.id && $('#WikiaRail').length > 0) {
                var clas = $('#WikiaRail').attr('class');
                if (clas) {
                    var classSplit = clas.split(/\s+/);
                    if (classSplit.indexOf('loaded') === -1 && classSplit.indexOf('is-ready') === -1) {
                        $('#WikiaRail').on('afterLoad.rail', $.proxy(this.insertToSiderail, this));
                    } else {
                        this.insertToSiderail();
                    }
                } else {
                    this.insertToSiderail();
                }
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
            // TODO: Insert some user configuration here
                el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
            if (this.config.title) {
                el.append(
                    $('<h2>', {
                        'class': 'activity-heading',
                        html: this.config.title.trim()
                    })
                );
            }
            if (this.config.text) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleText',
                        html: this.config.text
                    })
                );
            }
            el.append(this.generateContent(this.config));
            if(this.config.footer) {
                el.append(
                    $('<p>', {
                        id: 'DiscordIntegratorModuleFooter',
                        html: this.config.footer
                    })
                );
            }
            if (filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
            if (this.config.moduleHeight) {
                mw.util.addCSS('.DiscordIntegratorModule { height: ' + Number(this.config.moduleHeight) + 'px; }');
            }
            mw.hook('DiscordIntegrator.added').fire(el);
        },
        /**
         * Finding the designated places in content
         * in which to place the widget and placing it
         */
        insertToContent: function($content) {
            $content.find('.DiscordIntegrator:not(.loaded)').each($.proxy(function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }, this));
        },
        /**
         * Generating widget content from an object
         * @todo i18n
         * @return [String] content of the widget
         */
        generateContent: function(config) {
            return config.id ?
                (
                    (
                        config.loggedIn === true ||
                        (
                            Boolean(config['logged-in']) === true &&
                            config['logged-in'] !== 'false' &&
                            config['logged-in'] !== '{{{loggedIn}}}'
                        )
                    ) &&
                    !mconfig.wgUserName
                ) ?
            this.i18n.msg('login').parse() :
            mw.html.element('iframe', {
                src: 'https://discord.com/widget?id=' +
                     config.id +
                     '&theme=' +
                     (config.theme === 'light' ? 'light' : 'dark') +
                     '&username=' + encodeURIComponent(
                         config.username === '@disabled' ?
                         '' :
                         config.username === '@function' &&
                         typeof window.DiscordIntegratorGetUsername === 'function' ?
                             window.DiscordIntegratorGetUsername() :
                             config.username || mconfig.wgUserName
                     ),
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0'
            }) : this.i18n.msg('error').escape();
        }
    };
    mw.hook('dev.i18n').add($.proxy(DiscordIntegrator.hook, DiscordIntegrator));

    if (!window.dev || !window.dev.i18n) {
        if (mw.config.get('wgVersion') === '1.19.24') {
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        } else {
            mw.loader.load('https://dev.fandom.com/load.php?mode=articles&articles=u:dev:MediaWiki:I18n-js/code.js&only=scripts');
        }
    }
})(window.mediaWiki, window.jQuery);