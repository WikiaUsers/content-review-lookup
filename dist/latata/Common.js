/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Allows intergration with Discord [https://discord.com]
 */
(function() {
    'use strict';
    var mconfig = mw.config.get([
        'wgContentLanguage',
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
        imported: function(i18n) {
            $.when(
                window.dev.i18n.loadMessages('DiscordIntegrator', {
                    cacheVersion: 3
                }),
                mw.loader.using('mediawiki.api')
            ).then(this.preload.bind(this));
        },
        /**
         * Preload resources
         */
        preload: function(i18n) {
            this.i18n = i18n;
            setTimeout(() => {
            	mw.hook('wikipage.content').add(this.insertToContent.bind(this));
            }, 3000)
            
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
                amlang: mconfig.wgUserLanguage === 'qqx' ?
                    mconfig.wgContentLanguage :
                    mconfig.wgUserLanguage,
                uselang: 'content', // T97096
                smaxage: 300,
                maxage: 300
            }).done((function(d) {
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
            }).bind(this));
        },
        /**
         * Parse the configuration that needs to be parsed
         */
        parse: function(msg) {
            if (this.config[msg]) {
                ++this._loading;
                this.api.get({
                    action: 'parse',
                    text: this.config[msg],
                    // Also cache the individual parser outputs of messages for anonymous users.
                    // This can be a bit more aggressive as the cache varies on the
                    // actual message text, which often contains no wikitext at all.
                    smaxage: 86400,
                    maxage: 86400
                }).done((function(d) {
                    if (!d.error) {
                        this.config[msg] = d.parse.text['*'];
                        if (--this._loading === 0) {
                            this.init();
                        }
                    }
                }).bind(this));
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
                        $('#WikiaRail').on('afterLoad.rail', this.insertToSiderail.bind(this));
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
            var filter = $('#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            // TODO: Insert some user configuration here
            var el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
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
            if (this.config.footer) {
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
            $content.find('.DiscordIntegrator:not(.loaded)').each((function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }).bind(this));
        },
        /**
         * Determines the theme of the widget.
         * @param {string} config Configured theme
         * @return {string} 'light' or 'dark' depending on the wiki theme and configuration
         */
        determineTheme: function(config) {
            // If explicitly configured to light or dark.
            if (config === 'dark') {
                return 'dark';
            }
            if (config === 'light') {
                return 'light';
            }
            // If not configured, and the current FandomDesktop theme is set.
            if ($('body').hasClass('theme-fandomdesktop-light')) {
                return 'light';
            }
            if ($('body').hasClass('theme-fandomdesktop-dark')) {
                return 'dark';
            }
            // Otherwise, default to dark.
            return 'dark';
        },
        /**
         * Generating widget content from an object
         * @return {string} Content of the widget
         */
        generateContent: function(config) {
            if (!config.id || !String(config.id).match(/\d{17,19}/)) {
                return this.i18n.msg('error').parse();
            }
            if (
                (
                    config.loggedIn === true ||
                    Boolean(config['logged-in']) === true &&
                    config['logged-in'] !== 'false' &&
                    config['logged-in'] !== '{{{loggedIn}}}'
                ) && !mconfig.wgUserName
            ) {
                return this.i18n.msg('login').parse();
            }
            var username = config.username === '@disabled' ?
                 '' :
                 config.username === '@function' &&
                 typeof window.DiscordIntegratorGetUsername === 'function' ?
                     window.DiscordIntegratorGetUsername() :
                     config.username || mconfig.wgUserName;
            return mw.html.element('iframe', {
                src: 'https://discord.com/widget?id=' + config.id +
                     '&theme=' + this.determineTheme(config.theme) +
                     '&username=' + encodeURIComponent(username),
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0',
                title: this.i18n.msg('title').plain()
            });
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    }).then(DiscordIntegrator.imported.bind(DiscordIntegrator));
})();