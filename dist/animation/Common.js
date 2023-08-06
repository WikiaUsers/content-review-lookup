/* Any JavaScript here will be loaded for all users on every page load. */

/* For [[Template:Icons]] */
// Copied from https://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );
/* Spoiler alert */
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};
/* Restore protection lock for pages protected from creating */
(function ($, mw) {
    'use strict';
    var config = mw.config.get([
        'wgPageName',
        'wgNamespaceNumber'
    ]);
    if (
        [-1, 8, 500, 501, 502, 1200, 1201, 2000, 2001].indexOf(config.wgNamespaceNumber) !== -1 ||
        window.ProtectionIconsLoaded
    ) {
        return;
    }
    window.ProtectionIconsLoaded = true;
    /**
     * @class Main
     * @classdesc Main ProtectionIcons class
     */
    var Main = {
        wdsIsLoaded: $.Deferred(),
        i18nIsLoaded: $.Deferred(),
        /**
         * @method getJSON
         * @description Gets the JSON protection data for the current page.
         * @returns {void}
         */
        getJSON: function () {
            var that = this;
            $.getJSON(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'query',
                titles: config.wgPageName,
                prop: 'info',
                inprop: 'protection',
                meta: 'siteinfo',
                siprop: 'general',
            }, function (d) {
                if (!d.error) {
                   that.handleJSON(d);
                }
            });
        },
        /**
         * @method handleJSON
         * @description Analyzes protection JSON data and adds the icons.
         * @param {String} results - The protection data
         * @returns {void}
         */
        handleJSON: function (results) {
            var now,
                data,
                protection,
                protections,
                createSysop,
                createAutoconfirmed,
                editSysop,
                editAutoconfirmed,
                moveSysop,
                moveAutoconfirmed,
                uploadSysop,
                uploadAutoconfirmed;
            now = new Date(results.query.general.time);
            data = results.query.pages;
            createSysop = createAutoconfirmed = false;
            protections = data[Object.keys(data)[0]].protection;
            for (var i = 0; protections && i < protections.length; i++) {
                protection = protections[i];
                if (protection.expiry && new Date(protection.expiry) < now) {
                    // If `protection.expiry` is `infinite`/`indefinite`/`infinity`/`never`,
                    // then the constructed date will be invalid, and the comparison will fail.
                    continue;
                }
                switch (protection.type) {
                    case ('create'):
                        if (protection.level === 'sysop') {
                            createSysop = true;
                        } else if (protection.level === 'autoconfirmed') {
                            createAutoconfirmed = true;
                        }
                    break;
                }
            }
            var $editElement = $('.page-header__contribution-buttons, .page-header__actions'),
                $moveElement = $('#ca-move'),
                $replaceElement = $('#ca-replace-file');
            if (createSysop || createAutoconfirmed) {
                $editElement.prepend(
                    this.assembleSpanElement('create-protection', createSysop)
                );
            }
        },
        /**
         * @method assembleSpanElement
         * @description Creates the icon element.
         * @param {String} spanId - The icon name
         * @param {String} canSysopAct - Determines if the page is sysop protected
         * @returns {function}
         */
        assembleSpanElement: function (spanId, canSysopAct) {
            var that, actionType;
            that = this;
            actionType = spanId.split('-')[0];
            return $('<span>', {
                'class': 'protection-level',
                'id': spanId,
                'title':
                    that.i18n.msg(
                        (canSysopAct ?
                        actionType + 'Sysop' :
                        actionType + 'Autoconfirmed')
                    ).plain()
            }).append(
                this.wds.icon(
                    (canSysopAct ?
                    'lock-small' :
                    'unlock-small')
                )
            );
        },
        /**
         * @name i18nHandler
         * @description Loads I18n-js
         * @param {String} i18no - Variable for loading I18n-js
         * @returns {void}
         */
        i18nHandler: function (i18no) {
            var that = this;
            i18no.loadMessages('ProtectionIcons').done(function (i18n) {
                that.i18n = i18n;
                that.i18nIsLoaded.resolve();
            });
        },
        /**
         * @name wdsHandler
         * @description Loads WDSIcons
         * @param {String} wds - Variable for loading WDSIcons
         * @returns {void}
         */
        wdsHandler: function (wds) {
            this.wds = wds;
            this.wdsIsLoaded.resolve();
        },
        /**
         * @name init
         * @description Initiates script
         * @returns {void}
         */
        init: function () {
            mw.hook('dev.i18n').add($.proxy(Main.i18nHandler, Main));
            mw.hook('dev.wds').add($.proxy(Main.wdsHandler, Main));
            $.when(this.i18nIsLoaded, this.wdsIsLoaded).done(
                $.proxy(Main.getJSON, Main)
            );
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:ProtectionIcons.css'
            });
            importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:WDSIcons/code.js'
                ]
            });
        }
    };
    Main.init();
}(jQuery, mediaWiki));