/**
 *
 * @submodule               UserStatus/banner
 * @description             Notifies a user when editing someone else's status.
 * @author                  Americhino
 * @version                 0.8.3
 * @license                 CC-BY-SA 3.0
 **/
require(['jquery', 'mw', 'BannerNotification'], function($,mw,BannerNotification) {
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('UserStatus').done(function (i18n) {
            if (wgAction === 'edit' || wgAction === 'submit') {
                var $user = mw.config.get('wgTitle').split('/');
                var username = $user[0];
				if (
                    username === mw.config.get('wgUserName') ||
                    mw.config.get('wgNamespaceNumber') !== 2 ||
                    $user[1] !== 'status'
				) {
                    return;
				}
                $('.wds-global-navigation-wrapper').after($('<div>', {
                    class: 'banner-notifications-placeholder',
                    append: $('<div>', {
                        class: 'banner-notifications-wrapper float'
                    }).css('top', '56')
                }).css({
                    height: '0',
                    position: 'absolute',
                    left: '0',
                    right: '0'
                })
                );
                new BannerNotification(i18n.msg('edit-warning').plain() + ' <a href="' + mw.util.getUrl(wgFormattedNamespaces[2] + ':' + $user[0]) + '">' + i18n.msg('go-back').plain() + '</a>', 'warn').show();
            }
        });
    });
});
importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });