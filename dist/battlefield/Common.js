/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================

/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');

/* Stats */
importScript('MediaWiki:Common.js/stats.js');

/* Clock */
importScript('MediaWiki:Common.js/Clock.js');

/****************************/
/* spoilers by User:Tierrie */
/****************************/
importScriptPage('Content/SpoilersToggle.js', 'scripts');

// *******
// Auto-Refreshing RecentChanges, Logs, Contributions, and WikiActivity (Courtesy of Sactage)
// *******
importScriptPage('AjaxRC/code.js', 'dev');
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'AutoRefresh';

// *****************
// Template:Username
// *****************

$(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});

window.UserBadgesJS = {
	inactive: 0, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: {
        'Slopijoe': ['retired'],
        'Awyman13': ['News Team'],
        'Arks93': ['Founder'], 
    },
	names: {} // Badge display names
};
(function() {
    'use strict';
    var mconfig = mw.config.get([
        'skin',
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
                    ammessages: ['id', 'title', 'moduleHeight', 'theme', 'width', 'height', 'text', 'logged-in', 'footer'].map(function(el) {
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
                        this._loading = 0;
                        ['text', 'title', 'footer'].forEach(this.parse, this);
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
            var filter = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL, .content-review-module').last(),
            // TODO: Insert some user configuration here
                el = $('<div>', { class: 'DiscordIntegratorModule rail-module' });
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
            mw.util.addCSS('.DiscordIntegratorModule { height: ' + Number(this.config.moduleHeight || 500) + 'px; }');
            mw.hook('DiscordIntegrator.added').fire();
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
            return config.id ? ((config.loggedIn === true || Boolean(config['logged-in']) === true) && !mconfig.wgUserName) ? 'Please log in to see this widget' : mw.html.element('iframe', {
                src: 'https://discordapp.com/widget?id=' +
                     config.id +
                     '&theme=' +
                     (config.theme === 'light' ? 'light' : 'dark'),
                width: config.width || '100%',
                height: config.height || '90%',
                allowtransparency: 'true',
                frameborder: '0'
            }) : 'Error: ID of the widget is not supplied';
        }
    };
    $($.proxy(DiscordIntegrator.preload, DiscordIntegrator));
})();

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

//Username 
var username = wgUserName; 
if (username !== null) { 
    $('#InputUsername').html(username); 
}