/**
 * @name            FastBlock
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Adds fully customizable buttons to quickly block users.
 */
require([
    'wikia.window',
    'jquery',
    'mw',
    'BannerNotification'
], function (window, $, mw, BannerNotification) {
    'use strict';
    var buttons = window.FastBlock,
        $masthead = $('#UserProfileMasthead'),
        $user = $masthead.find('.masthead-info h1').text(),
        config = mw.config.get([
            'wgUserGroups',
            'wgUserName'
        ]),
        i18n;
    if (
        window.FastBlockLoaded ||
        !buttons ||
        !Array.isArray(buttons) ||
        buttons.length === 0 ||
        !$masthead.exists() ||
        !/sysop|staff|helper|vstf|global-discussions-moderator|wiki-manager/.test(config.wgUserGroups) ||
        $user === config.wgUserName
    ) {
        return;
    }
    window.FastBlockLoaded = true;
    /**
     * @class Main
     * @classdesc Main FastBlock class
     */
    var Main = {
        /**
         * @method init
         * @description Creates the buttons
         * @param {Object} i18nData - I18n-js data
         * @returns {void}
         */
        init: function (i18nData) {
            i18n = i18nData;
            $masthead.find('.masthead-info-lower').append(
                $('<br/>')
            );
            buttons.forEach(function (b) {
                if (!b.expiry || !b.reason || !b.label) {
                    console.warn('FastBlock: please specify an expiry, reason, and label.');
                    return;
                }
                $.each(b, function (k, v) {
                    if (typeof v === 'string') {
                        b[k] = v.trim();
                    }
                });
                $masthead.find('.masthead-info-lower').append(
                    $('<a>', {
                        'title': i18n.msg('title', b.expiry, b.reason).plain(),
                        'data': {
                            'expiry': b.expiry,
                            'reason': b.reason,
                            'nocreate': b.nocreate,
                            'autoblock': b.autoblock
                        },
                        'class': 'wds-button wds-is-secondary',
                        'id': 'fast-block',
                        'css': {
                            'margin': '2px'
                        },
                        'text': b.label,
                        'click': Main.click
                    })
                );
            });
        },
        /**
         * @method click
         * @description Button click event
         * @returns {void}
         */
        click: function () {
            if (!confirm(i18n.msg('confirm').plain())) {
                return;
            }
            var data = $(this).data();
            console.log(data);
            Main.blockUser(data);
        },
        /**
         * @method blockUser
         * @description Blocks the user
         * @param {Object} d - The button data
         * @returns {void}
         */
        blockUser: function (d) {
            new mw.Api().post({
                action: 'block',
                user: $user,
                expiry: d.expiry,
                nocreate: d.nocreate || 0,
                autoblock: d.autoblock || 0,
                reason: d.reason,
                bot: true,
                token: mw.user.tokens.get('editToken')
            }).done(function (d) {
                if (d.error) {
                    Main.notif(
                        i18n.msg('error', d.error.code).plain(),
                        'error'
                    );
                } else {
                    Main.notif(
                        i18n.msg('success', $user).parse(),
                        'confirm'
                    );
                }
            });
        },
        /**
         * @method notif
         * @description Shows a BannerNotification
         * @param {String} text - The notif text
         * @param {String} type - The notif type
         * @returns {void}
         */
        notif: function (text, type) {
            new BannerNotification(
                text,
                type
            ).show();
        }
    };
    mw.hook('dev.i18n').add(function (lib) {
        $.when(
            lib.loadMessages('FastBlock'),
            mw.loader.using([
                'mediawiki.api',
                'mediawiki.user',
                'mediawiki.util'
            ])
        ).then(Main.init);
    });
});