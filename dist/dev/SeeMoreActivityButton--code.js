/**
 * Name:        SeeMoreActivityButton
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Author:      Speedit <speeditwikia@gmail.com>
 * Version:     1.6
 * Description: Adds an activity button to Wiki Activity module
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    'use strict';
    // Variables, double-run protection
    var $rail = $('#WikiaRail');
    if (
        !$rail.exists() ||
        window.SeeMoreActivityButtonLoaded
    ) {
        return;
    }
    window.SeeMoreActivityButtonLoaded = true;

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
            loadLib('i18n', 'u:dev:I18n-js/code.js').then(function () {
                return window.dev.i18n.loadMessages('SeeMoreActivityButton');
            }),
            loadLib('wds', 'u:dev:WDSIcons/code.js'),
            mw.loader.using('mediawiki.api')
        ).done(function (i18n, _1, _2) {
            init(i18n);
        });
    }

    /**
     * Script preloader
     * @function            init
     * @param               {Object} i18n I18n-js message object.
     * @private
     */
    function init(i18n) {
        i18n.useUserLang();
        window.dev.seeMoreActivity = new SeeMoreActivity(i18n);
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
            diff: window.dev.wds.icon('magnifying-glass-tiny'),
            btn:  window.dev.wds.icon('menu-control-small')
        };
        this.conf = {
            rc:  window.SeeMoreActivityButtonRC || false,
            old: window.SeeMoreActivityButtonOld || false
        };

        // Test for user configured old variable.
        if (!this.conf.old) {
            this._api = new mw.Api();
            this._api.get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'Custom-SeeMoreActivityButton-config-old',
                amlang: mw.config.get('wgUserLanguage'),
                smaxage: 300,
                maxage: 300
            }).done(this._call.bind(this));
        } else {
            this._call();
        }
    }
    /**
     * Script configuration
     * @method              execute
     * @this                window.dev.seeMoreActivity
     */
    SeeMoreActivity.prototype._call = function(d) {
        // MediaWiki configuration variable.
        if (d) {
            try {
                if (JSON.parse(d.query.allmessages[0]['*'].trim())) {
                    this.conf.old = true;
                }
            } catch(e) {
                this.conf.old = false;
            }
        } else {
            this.conf.old = true;
        }

        // Rail callback.
        if ($rail.hasClass('loaded')) {
            this._execute();
        } else {
            $rail.on(
                'afterLoad.rail',
                $.proxy(this._execute, this)
            );
        }
    };

    /**
     * Script UI execution
     * @method              execute
     * @this                window.dev.seeMoreActivity
     */
    SeeMoreActivity.prototype._execute = function() {
        var $activity = $rail.children('#wikia-recent-activity');
        if (!$activity.exists()) {
            return;
        }
        // Button addition.
        $activity.children('h2').append(
            $('<a>', {
                'href':  mw.util.getUrl('Special:' +
                    (this.conf.rc ?
                        'RecentChanges' :
                        'WikiActivity')
                ),
                'class': 'wds-button wds-is-text',
                'id':    'seemoreactivity-button',
                'title': this.i18n,
                html:    this.icon.btn.cloneNode(true)
            })
        );
        // Diff link addition.
        $activity.find('.page-title-link').each($.proxy(function(i, p) {
            var $p = $(p);
            $p.parent().before(
                $('<a>', {
                    'class': 'seemoreactivity-diff-link',
                    'href':  $p.attr('href') + '?diff=cur',
                    html:    this.icon.diff.cloneNode(true)
                })
            );
        }, this));
        // Old styling.
        if (Boolean(this.conf.old)) {
            $activity.addClass('seemoreactivity-old');
            $activity.find('.activity-item:last-child .edit-info-user').css('max-width', (
                +$activity.width()
                -$activity.find('#seemoreactivity-button').width()
                -$activity.find('.activity-item:last-child .edit-info-time').width()
                -12
            ).toString() + 'px');
        }
        mw.hook('SeeMoreActivityButton.loaded').fire();
    };

    // Import CSS.
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:SeeMoreActivityButton.css'
    });

    // Import libraries.
    preload();

});