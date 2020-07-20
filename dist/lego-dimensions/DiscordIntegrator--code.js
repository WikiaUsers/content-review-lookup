/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Allows intergration with Discord [http://discordapp.com]
 * TODO:        I18N
 */
(function() {
    'use strict';
    var mconfig = mw.config.get([
        'skin',
        'wgUserLanguage',
        'wgUserName'
    ]),
    /**
     * Main object
     * @static
     */
        DiscordIntegrator = {
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
            if(mconfig.skin !== 'oasis' && mconfig.skin !== 'wikia') {
                this.init();
                return;
            }
            mw.loader.using('mediawiki.api').then($.proxy(function() {
                var api = new mw.Api();
                api.get({
                    action: "query",
                    meta: "allmessages",
                    ammessages: ["id", "title", "moduleHeight", "usePTB", "theme", "width", "height", "text", "logged-in"].map(function(el) {
                        return "Custom-DiscordIntegrator-config-" + el;
                    }).join("|"),
                    amlang: mconfig.wgUserLanguage
                }).done($.proxy(function(d) {
                    if(!d.error) {
                        d.query.allmessages.forEach(function(el) {
                            if(el['*']) {
                                this.config[el.name.substring(32)] = el['*'];
                            }
                        }, this);
                        this._loading = 0;
                        if(this.config.text) {
                            ++this._loading;
                            api.get({
                                action: "parse",
                                text: this.config.text
                            }).done($.proxy(function(d) {
                                if(!d.error) {
                                    this.config.text = d.parse.text["*"];
                                    if(--this._loading === 0) {
                                        this.init();
                                    }
                                }
                            }, this));
                        }
                        if(this.config.title) {
                            ++this._loading;
                            api.get({
                                action: "parse",
                                text: this.config.title
                            }).done($.proxy(function(d) {
                                if(!d.error) {
                                    this.config.title = d.parse.text["*"];
                                    if(--this._loading === 0) {
                                        this.init();
                                    }
                                }
                            }, this));
                        }
                        if(this._loading === 0) {
                            this.init();
                        }
                    }
                }, this));
            }, this));
        },
        /**
         * Initializing
         */
        init: function() {
            if(this.config.id && $('#WikiaRail').length > 0 && mconfig.wgUserName) {
                var clas = $('#WikiaRail').attr('class');
                if(clas && clas.split(/\s+/).indexOf('loaded') === -1) {
                    $('#WikiaRail').on('afterLoad.rail', this.insertToSiderail.bind(this));
                } else {
                    this.insertToSiderail();
                }
            }
            if($(".DiscordIntegrator").length > 0) {
                this.insertToContent();
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            var filter = $('#TOP_RIGHT_BOXAD, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
            // TODO: Insert some user configuration here
                el = $('<div>', { class: 'DiscordIntegratorModule module' });
            if(this.config.title) {
                el.append(
                    $('<h2>', { class: 'activity-heading' })
                        .html(this.config.title)
                );
            }
            if(this.config.text) {
                el.append(
                    $('<p>', { id: 'DiscordIntegratorModuleText' })
                        .html(this.config.text)
                );
            }
            el.append(this.generateContent(this.config));
            if(filter.length > 0) {
                el.insertAfter(filter);
            } else {
                $('#WikiaRail').prepend(el);
            }
            mw.util.addCSS(".DiscordIntegratorModule { height: " + Number(this.config.moduleHeight || 500) + "px; }");
            mw.hook('DiscordIntegrator.added').fire();
        },
        /**
         * Finding the designated places in content
         * in which to place the widget and placing it
         */
        insertToContent: function() {
            $(".DiscordIntegrator").each(function(cabbage, el) {
                el = $(el);
                el.html(this.generateContent(el.data()));
            }.bind(this));
        },
        /**
         * Generating widget content from an object
         * @todo i18n
         * @return [String] content of the widget
         */
        generateContent: function(config) {
            return config.id ? ((config.loggedIn === true || Boolean(config["logged-in"]) === true) && !mconfig.wgUserName) ? "Please log in to see this widget" : mw.html.element('iframe', {
                src: "https://" + (String(config.usePTB) === "true" ? "ptb." : "") +
                     "discordapp.com/widget?id=" +
                     config.id +
                     "&theme=" +
                     (config.theme === "light" ? "light" : "dark"),
                width: config.width || "100%",
                height: config.height || "90%",
                allowtransparency: "true",
                frameborder: "0"
            }) : "Error: ID of the widget is not supplied";
        }
    };
    $($.proxy(DiscordIntegrator.preload, DiscordIntegrator));
})();