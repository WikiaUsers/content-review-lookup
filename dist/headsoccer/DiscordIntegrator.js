//modified version of http://dev.wikia.com/wiki/DiscordIntegrator (thanks to Trollocool)
// jshint multistr: true
/**
 * Name:        DiscordIntegrator
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Allows intergration with Discord [http://discordapp.com]
 * Note:        This script loads iframes!
 * TODO:        I18N
 */
(function() {
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
            mw.loader.using('mediawiki.api').then($.proxy(function() {
                this.api = new mw.Api();
                this.api.get({
                    action: "query",
                    meta: "allmessages",
                    ammessages: ["id", "title", "moduleHeight", "usePTB", "theme", "width", "height", "text", "logged-in"].map(function(el) {
                        return "Custom-DiscordIntegrator-config-" + el;
                    }).join("|"),
                    amlang: mw.config.get('wgUserLanguage')
                }).done($.proxy(function(d) {
                    if(!d.error) {
                        d.query.allmessages.forEach(function(el) {
                            if(el['*']) {
                                this.config[el.name.substring(32)] = el['*'];
                            }
                        }, this);
                        if(this.config.text) {
                            this.api.get({
                                action: "parse",
                                text: this.config.text
                            }).done($.proxy(function(d) {
                                if(!d.error) {
                                    this.config.text = d.parse.text["*"];
                                    this.init();
                                }
                            }, this));
                        } else {
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
            if(this.config.id) {
                this.insertToSiderail();
            }
            if($(".DiscordIntegrator").length > 0) {
                this.insertToContent();
            }
        },
        /**
         * Inserting the widget to siderail
         */
        insertToSiderail: function() {
            $("#WikiaRail").prepend('<div class="DiscordIntegratorModule module">' +
                (this.config.title ? mw.html.element("h2", {"class": "activity-heading"}, this.config.title) : "") +
                (this.config.text ? this.config.text : "") +
                this.generateContent(this.config) +
            '</div>');
            mw.util.addCSS(".DiscordIntegratorModule { height: " + Number(this.config.moduleHeight || 500) + "px; }");
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
            return config.id ? ((config.loggedIn === true || Boolean(config["logged-in"]) === true) && !mw.config.get('wgUserName')) ? "Please log in to see this widget" : mw.html.element('iframe', {
                src: "https://" + (String(config.usePTB) === "true" ? "ptb." : "") +
                     "discordapp.com/widget?id=" +
                     config.id +
                     "&theme=" +
                     (config.theme === "light" ? "light" : "dark"),
                width: config.width || "100%",
                height: config.height || "90%",
                allowtransparency: "true",
                frameborder: "0"
            }) : "ID of the widget not supplied";
        }
    };
    $($.proxy(DiscordIntegrator.preload, DiscordIntegrator));
})();