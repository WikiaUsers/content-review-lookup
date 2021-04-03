/**
 * @Name            QuickCreateMessageWallGreeting
 * @Version         v2.0
 * @Author          Cörey
 * @Author          TheGoldenPatrik1
 * @Description     Creates a message wall greeting with one click.
 * @Notes           Adapted from QuickCreateUserPage
 * @Protect         <nowiki>
 */
(function () {
    'use strict';
    // Config
    var config = mw.config.get([
        'wgFormattedNamespaces',
        'wgUserName',
        'wgVersion'
    ]);
    // Load Protection
    if (
        window.QuickCreateMessageWallGreetingLoaded ||
        config.wgUserName === null ||
        config.wgVersion !== '1.19.24'
    ) {
        return;
    }
    window.QuickCreateMessageWallGreetingLoaded = true;
    // Variables
    var Api,
        i18n,
        page = config.wgFormattedNamespaces[1202] + ':' + config.wgUserName;
    /**
     * @class Main
     * @classdesc Main QuickCreateMessageWallGreeting class
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
            if ($('.wds-global-navigation__user-menu [data-tracking-label="account.message-wall"]').exists()) {
                $('.wds-global-navigation__user-menu > div > .wds-list').append(
                    $('<li>', {
                        'id': 'quick-cup',
                        'class': 'QuickCreateMessageWallGreeting'
                    }).append(
                        $('<a>', {
                            'title': i18n.msg('button-tooltip-text').plain(),
                            'text': i18n.msg('button-link-text').plain(),
                            'href': '#',
                            'click': Main.createPage
                        })
                    )
                );
            } else {
                mw.log('[QuickCreateMessageWallGreeting] Message walls are not enabled on this wiki, exiting.');
            }
        },
        /**
         * @method createPage
         * @description Analyzes the data and acts accordingly
         */
        createPage: function () {
            if (window.qtEnableMessageWallGreetingOverwrite) {
                Main.makeEdit();
            } else {
                Api.get({
                    action: 'query',
                    titles: page
                }).done(function(d) {
                    if (d.query.pages[-1]) {
                        Main.makeEdit();
                    } else {
                        Main.showResult('cup-error-exists');
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
                title: page,
                text:
                    window.qtMessageWallGreetingTemplate ||
                    '{{w:User:' + config.wgUserName + '/MessageWallGreeting}}',
                summary: i18n.inContentLang().msg('cup-reason').plain(),
                token: mw.user.tokens.get('editToken'),
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
         * @description Outputs a BannerNotification
         * @param {String} msg - The message to output
         * @param {String} confirm - Whether the result is a success
         */
        showResult: function (msg, confirm) {
            new BannerNotification(
                i18n.msg(msg).escape(),
                confirm ? 'confirm' : 'error'
            ).show();
        }
    };
    // Load Script
    mw.hook('dev.i18n').add(function(i18n) {
        $.when(
            i18n.loadMessages('QuickCreateMessageWallGreeting'),
            mw.loader.using('mediawiki.api')
        ).done(Main.init);
    });
    // Import
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();