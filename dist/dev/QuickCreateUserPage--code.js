/**
 * @Name            QuickCreateUserPage
 * @Version         v2.1
 * @Author          Grunny
 * @Author          TheGoldenPatrik1
 * @Description     Creates a user page with one click.
 * @License         GPLv2+
 * @Notes           Originially Modified From https://github.com/Wikia/app/blob/dev/extensions/wikia/QuickTools/modules/ext.createUserPage.js
 * @Protect         <nowiki>
 */
(function($, mw, window) {
    'use strict';
    // Config
    var config = mw.config.get([
        'wgCityId',
        'wgFormattedNamespaces',
        'wgUserName'
    ]);
    // Load Protection
    if (
        window.QuickCreateUserPageLoaded ||
        config.wgCityId === ('65099' || 65099) ||
        config.wgUserName === null
    ) {
        return;
    }
    window.QuickCreateUserPageLoaded = true;
    // Variables
    var Api,
        i18n,
        page = config.wgFormattedNamespaces[2] + ':' + config.wgUserName;
    /**
     * @class Main
     * @classdesc Central QuickCreateUserPage class
     */
    var Main = {
        /**
         * @method init
         * @description Initiates the script and creates the button
         * @param {String} i18nData - Variable for I18n-js
         */
        init: function (i18nData) {
            i18n = i18nData;
            Api = new mw.Api();
            $('.wds-list:has(#global-navigation-user-signout)').prepend(
                $('<li>', {
                    'id': 'quick-cup',
                    'class': 'QuickCreateUserPage'
                }).append(
                    $('<a>', {
                        'title': i18n.msg('button-tooltip-text').plain(),
                        'text': i18n.msg('button-link-text').plain(),
                        'href': '#',
                        'click': Main.createPage
                    })
                )
            );
        },
        /**
         * @method createPage
         * @description Analyzes the data and acts accordingly
         */
        createPage: function () {
            if (window.qtEnableUserPageOverwrite) {
                Main.makeEdit();
            } else {
                Api.get({
                    action: 'query',
                    titles: page
                }).done(function(d) {
                    if (d.query.pages[-1]) {
                        Main.makeEdit();
                    } else {
                        if (
                            confirm(
                                i18n.msg('cup-confirm').plain()
                            ) === true
                        ) {
                            Main.makeEdit();
                        } else {
                            Main.showResult('cup-error-exists');
                        }
                    }
                });
            }
        },
        /**
         * @method makeEdit
         * @description Edits the page
         */
        makeEdit: function () {
            Api.post({
                action: 'edit',
                bot: true,
                title: page,
                text:
                    window.qtUserPageTemplate ||
                    '{{w:User:' + config.wgUserName + '}}',
                summary: i18n.inContentLang().msg('cup-reason').plain(),
                token: mw.user.tokens.get('csrfToken'),
                watchlist: 'preferences'
            }).done(function(d) {
                if (d.edit.result === 'Success') {
                    Main.showResult('cup-success-text', true);
                } else {
                    Main.showResult('cup-error-failed');
                }
            }).fail(function(d) {
                Main.showResult('cup-error-failed');
            });
        },
        /**
         * @method showResult
         * @description Outputs a BannerNotification or mw.notify depending on wiki platform
         * @param {String} msg - The message to output
         * @param {String} confirm - Whether the result is a success
         */
        showResult: function (msg, confirm) {
            mw.loader.using('mediawiki.notification', function() {
                mw.notification.notify(i18n.msg(msg).escape(), {
                    tag: 'quickCreateUserPage'
                });
            });
        }
    };
    // Load Script
    mw.hook('dev.i18n').add(function(i18n) {
        $.when(
            i18n.loadMessages('QuickCreateUserPage'),
            mw.loader.using('mediawiki.api')
        ).done(Main.init);
    });
    // Import
    importArticles({
        type: 'script',
        articles: ['u:dev:MediaWiki:I18n-js/code.js']
    });
})(jQuery, mediaWiki, this);