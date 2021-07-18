/**
 * @name            FastBlock
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Adds fully customizable buttons to quickly block users.
 */
(function () {
    'use strict';
    var buttons = window.FastBlock,
        $masthead = $('#UserProfileMasthead, #userProfileApp'),
        config = mw.config.get([
            'profileUserName',
            'wgUserGroups',
            'wgUserName'
        ]),
        $user = config.profileUserName || $masthead.find('.masthead-info h1').text(),
        i18n;
    if (
        window.FastBlockLoaded ||
        !buttons ||
        !Array.isArray(buttons) ||
        buttons.length === 0 ||
        !$user ||
        !/sysop|staff|helper|global-discussions-moderator|wiki-representative|soap/.test(config.wgUserGroups) ||
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
        findContainer: function () {
            var promise = $.Deferred(),
                interval = setInterval(function() {
                    var $element = $('#userProfileApp .user-identity-box__info, #UserProfileMasthead .masthead-info-lower');
                    if ($element.length) {
                        clearInterval(interval);
                        promise.resolve($element);
                    }
                }, 300);
            return promise;
        },
        /**
         * @method init
         * @description Creates the buttons
         * @param {Object} i18nData - I18n-js data
         * @returns {void}
         */
        init: function (i18nData, $container) {
            i18n = i18nData;
            $container.append($('<br/>'));
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
                $container.append(
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
                        i18n.msg('error', d.error.code).escape(),
                        'error'
                    );
                } else {
                    Main.notif(
                        i18n.msg('success', $user).parse(),
                        'confirm'
                    );
                }
            }).fail(function(code) {
                Main.notif(
                    i18n.msg('error', code || 'http').escape(),
                    'error'
                );
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
            mw.notify($('<span>', {
                html: text
            }), {
                type: type
            });
        }
    };
    mw.hook('dev.i18n').add(function (lib) {
        $.when(
            lib.loadMessages('FastBlock'),
            Main.findContainer(),
            mw.loader.using([
                'mediawiki.api',
                'mediawiki.notify',
                'mediawiki.user',
                'mediawiki.util'
            ])
        ).then(Main.init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();