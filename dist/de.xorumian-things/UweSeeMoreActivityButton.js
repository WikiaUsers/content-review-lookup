/**
 * Origoinal Name:        SeeMoreActivityButton
 * Origoinal Author:      KockaAdmiralac <1405223@gmail.com>
 * Origoinal Author:      Speedit <speeditwikia@gmail.com>
 * URL for Original JavaScript: https://dev.fandom.com/wiki/SeeMoreActivityButton
 */
(function($){
    'use strict';
    // Prevent double load
    if (window.SeeMoreActivityButtonLoaded) return;
    window.SeeMoreActivityButtonLoaded = true;

    // Funktion zum Hinzufügen des Stylesheets
    var STYLESHEET_CLASS = "hsw-moreactivitybutton-stylesheet";
    function addStylesheetToHead(href) {
        $("head").append("<link rel='stylesheet' href='"+href+"' type='text/css' class='"+STYLESHEET_CLASS+"'>");
    }

    // Import CSS dynamically
    var stylesheetPrefix = "https://xorumian-things.fandom.com/de/index.php?action=raw&ctype=text/css&title=";
    var cssUrl = stylesheetPrefix + "MediaWiki:UweSeeMoreActivityButton.css";
    addStylesheetToHead(cssUrl);

    // Variables, double-run protection
    var $rail = $('#WikiaRail');
    if ($rail.length === 0) {
        return;
    }

    /**
     * Script preloader
     * @function            loadLib
     * @param               {string} lib Library's namespace.
     * @param               {string} mod Interwiki link to library's code.
     * @returns             {Object} jQuery Promise that resolves once the library loads and fires the relevant MediaWiki hook.
     * @private
     */
    function loadLib(lib, mod) {
        var deferred = $.Deferred();
        if (!window.dev || !window.dev[lib]) {
            importArticle({ type: 'script', article: mod });
        }
        mw.hook('dev.' + lib).add(function () {
            deferred.resolve();
        });
        return deferred.promise();
    }

    /**
     * Script preloader
     * @function            preload
     * @private
     */
    function preload() {
        $.when(
            loadLib('i18n', 'u:dev:MediaWiki:I18n-js/code.js').then(function () {
                return window.dev.i18n.loadMessages('SeeMoreActivityButton');
            }),
            loadLib('wds', 'u:dev:MediaWiki:WDSIcons/code.js'),
            mw.loader.using('mediawiki.api')
        ).done(function (i18n) {
            window.dev.seeMoreActivity = new SeeMoreActivity(i18n);
        });
    }

    /**
     * Main class.
     * @class               SeeMoreActivity
     * @this                window.dev.seeMoreActivity
     * @param               {Object} i18n I18n-js message object.
     */
    function SeeMoreActivity(i18n) {
        // Internal configuration for script.
        this.i18n = i18n.msg('see-more').plain();
        this.icon = {
            btn:  window.dev.wds.icon('menu-control-small')
        };

        // Rail callback.
        if ($rail.hasClass('loaded') || $rail.hasClass('is-ready')) {
            this._execute();
        } else {
            $rail.on(
                'afterLoad.rail',
                this._execute.bind(this)
            );
        }
    }

    /**
     * Script UI execution
     * @method              execute
     * @this                window.dev.seeMoreActivity
     */
    SeeMoreActivity.prototype._execute = function() {
        var $activity = $('#wikia-recent-activity');
        if ($activity.length === 0) {
            return;
        }
        // Button addition.
        $activity.children('h2').append(
            $('<a>', {
                'href':  mw.util.getUrl('Special:RecentChanges'),
                'class': 'wds-button wds-is-text',
                'id':    'seemoreactivity-button',
                'title': this.i18n,
                html:    this.icon.btn.cloneNode(true)
            })
        );
        mw.hook('SeeMoreActivityButton.loaded').fire();
    };

    // Import libraries.
    preload();

})(jQuery);