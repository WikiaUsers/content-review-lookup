/* This JavaScript replaces the standard rail-module activity-icon with one that links to "Special:RecentChanges" */
/**
 * Origoinal Name:              SeeMoreActivityButton
 * Origoinal Authors:           KockaAdmiralac <1405223@gmail.com> | Speedit <speeditwikia@gmail.com>
 * URL for Original JavaScript: https://dev.fandom.com/wiki/SeeMoreActivityButton
 */
(function($){
    'use strict';
    // Prevent double load
    if (window.RecentActivityButtonLoaded) return;
    window.RecentActivityButtonLoaded = true;

    // Function to add a stylesheet
    function addStylesheetToHead() {
        $("head").append("<style> #recentactivity-button svg { margin-right: 0; fill: rgba(var(--theme-page-text-color--rgb), .75); opacity: .75; } .rail-module:has(#recentactivity-button) .wds-icon.wds-icon-small.wds-activity-icon { fill: transparent /* Makes the normal icon transparent if the link icon exists */; } </style>");
    }
    addStylesheetToHead();

    // Variables, double-run protection
    var $rail = $('#WikiaRail');
    if ($rail.length === 0) {
        return;
    }

    /* Script preloader loadLib */
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

    /* Script preloader */
    function preload() {
        $.when(
            loadLib('i18n', 'u:dev:MediaWiki:I18n-js/code.js').then(function () {
                return window.dev.i18n.loadMessages('RecentActivityButton');
            }),
            loadLib('wds', 'u:dev:MediaWiki:WDSIcons/code.js'),
            mw.loader.using('mediawiki.api')
        ).done(function (i18n) {
            window.dev.recentActivity = new RecentActivity(i18n);
        });
    }

    /* Main class */
    function RecentActivity(i18n) {
        // Internal configuration for script.
        this.i18n = i18n.msg('see-more').plain();
        this.icon = {
            btn:  window.dev.wds.icon('activity-small')
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

    RecentActivity.prototype._execute = function() {
        var $activity = $('#wikia-recent-activity');
        if ($activity.length === 0) {
            return;
        }
        // Button addition.
        $activity.children('h2').append(
            $('<a>', {
                'href':  mw.util.getUrl('Special:RecentChanges'),
                'class': '',
                'id':    'recentactivity-button',
                'style': 'position: absolute; left: 0; width: 18px;',
                'title': 'Special:RecentChanges',
                html:    this.icon.btn.cloneNode(true)
            })
        );
        mw.hook('RecentActivityButton.loaded').fire();
    };

    // Import libraries.
    preload();

})(jQuery);