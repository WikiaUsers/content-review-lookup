/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Allows intergration with Discord [https://discordapp.com]
 * TODO:        I18N
 *
 * Mofified for use on magicarena.wikia.com, original at https://dev.wikia.com/wiki/DiscordIntegrator
 * Modified Version 1.0.0
 *      Aspallar: Added exclude and optout configuration messages.
 * Modified Version 2.0.2
 *      Aspallar: added open/close, excluded pages always show closed (instead of nothing),
 *      removed optout.
 *
 * TODO: deal with multiple browser tabs/windows either by using storage events to synchronize
 *       open/closed across them all, or, probably better, by storing open closed state along with 'widget'
 *       Just a "nice to have", not seen as a major issue, so may may not be done.
 */
(function() {
    /* global mw */
    'use strict';
    var mconfig = mw.config.get([
        'skin',
        'wgUserLanguage',
        'wgUserName',
        'wgTitle'
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
         * Preload resources
         */
        preload: function() {
            mw.hook('wikipage.content').add($.proxy(this.insertToContent, this));
            if (mconfig.skin !== 'oasis') {
                return;
            }
            mw.loader.using('mediawiki.api').then($.proxy(function() {
                this.api = new mw.Api();
                this.api.get({
                    action: 'query',
                    meta: 'allmessages',
                    ammessages: ['id', 'title', 'moduleHeight', 'theme', 'width', 'height', 'text', 'footer', 'exclude', 'closed'].map(function(el) {
                        return 'Custom-DiscordIntegrator-config-' + el;
                    }).join('|'),
                    amlang: mconfig.wgUserLanguage
                }).done($.proxy(function(d) {
                    if (!d.error) {
                        d.query.allmessages.forEach(function(el) {
                            if(el['*']) {
                                this.config[el.name.substring(32)] = el['*'];
                            }
                        }, this);
                        if (this.config.exclude) {
                            this.config.exclude = this.config.exclude.split('|').some(function (prefix) {
                                return mconfig.wgTitle.substring(0, prefix.length) === prefix;
                            });
                        }
                        this._loading = 0;
                        ['text', 'title', 'footer', 'closed'].forEach(this.parse, this);
                        if (this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
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
                if (clas && clas.split(/\s+/).indexOf('loaded') === -1) {
                    $('#WikiaRail').on('afterLoad.rail', $.proxy(this.insertToSiderail, this));
                } else {
                    this.insertToSiderail();
                }
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last();
            var el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
            if (this.config.title) {
                el.append(
                    $('<h2>', {
                        'class': 'activity-heading',
                        html: this.config.title
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
                el.data('closed', el.html());
                el.html(this.generateContent(el.data()))
                  .addClass('loaded');
            }, this));
        },
        /**
         * click event handler for open close link
         */
        clickOpenCloseLink: function (event) {
            event.preventDefault();
            var content = $(event.target).parent();
            var container = content.parent();
            var config = container.data();
            if (!config.id) config = this.config;
            this.toggleOpenStatus(config.id);
            content.replaceWith(this.generateContent(config));
        },
        getOpenStatus: function(id) {
            try {
                return Boolean(localStorage.getItem('DiscordOpen-' + id));
            } catch (error) {
                return false;
            }
        },
        toggleOpenStatus: function (id) {
            try {
                if (this.getOpenStatus(id))
                    localStorage.removeItem('DiscordOpen-' + id);
                else
                    localStorage.setItem('DiscordOpen-' + id, '1');
            } catch (error) { }
        },
        /**
         * Generating widget content from an object
         * @todo i18n
         * @return [String] content of the widget
         */
        generateContent: function(config) {
            if (!config.id)
                return 'Error: ID of the widget is not supplied';
            if (config.exclude) {
                return $('<div>').append(config.closed);
            }
            var openCloseLink = $('<a>')
                .addClass('mdw-discord-link')
                .attr('href', '#')
                .click($.proxy(this.clickOpenCloseLink, this))
                .after('<br>');
            var container = $('<div>').addClass('mdw-discord-container');
            if (!this.getOpenStatus(config.id)) {
                return container.append(openCloseLink.text('open')).append(config.closed);
            }
            var discordFrame = mw.html.element('iframe', {
                src: 'https://discordapp.com/widget?id=' +
                     config.id +
                     '&theme=' +
                     (config.theme === 'light' ? 'light' : 'dark'),
                width: config.width || '100%',
                height: config.height || '400px',
                allowtransparency: 'true',
                frameborder: '0'
            });
            return container.append(openCloseLink.text('close')).append(discordFrame);
        },
    };
    $($.proxy(DiscordIntegrator.preload, DiscordIntegrator));
})();