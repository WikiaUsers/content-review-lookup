(function ($, mw) {
    'use strict';

    if ( window.WikiaNotificationLoaded ) {
        return;
    }

    var storageKey = 'ls-wikianotifications';

    function log(error) {
        console.log('WikiaNotifications error: ' + error);
    }

    function getNotificationScope() {
        return (new mw.Api()).get({
            action: 'parse',
            disablepp: '',
            page: 'MediaWiki:Custom-WikiaNotifications-scope',
            prop: 'wikitext',
            format: 'json'
        }).then(function (res) {
            var dfd = $.Deferred();

            var valid = ['all', 'anons', 'users'];
            var scope = 'users';

            if (res.error && res.error.code != 'missingtitle') {
                return dfd.rejectWith(this, [res.error.info]);
            } else if (!res.error) {
                scope = res.parse.wikitext['*'].trim();
            }

            if (!valid.includes(scope)) {
                scope = 'users';
            }

            return dfd.resolveWith(this, [scope]);
        });
    }

    function getNotificationData() {
        return (new mw.Api()).get({
            action: 'parse',
            disablepp: '',
            page: 'MediaWiki:Custom-WikiaNotifications',
            format: 'json'
        }).then(function (res) {
            var dfd = $.Deferred();
            if (res.error) {
                return dfd.rejectWith(this, [res.error.info]);
            }

            var text = res.parse.text['*'].trim();
            text = (text || '').replace(/<script>[\s\S]*?<\/script>/igm, '').replace(/<!\-\-[\s\S]*?\-\->/igm, '');
            if (!text.length || !text.trim().length) {
                return dfd.rejectWith(this, ['empty content']);
            }

            return dfd.resolveWith(this, [{
                version: res.parse.revid,
                contents: text
            }]);
        });
    }

    function showNotificationIfNotViewed(notification) {
        var notifsData = JSON.parse(window.localStorage.getItem(storageKey)) || {},
            hasSeen = (notifsData[mw.config.get('wgCityId')] === notification.version),
            $notificationArea = $('#WikiaNotifications'),
            hasNotifications = $notificationArea.length ? 1 : 0;

        if (hasSeen) {
            return;
        }

        if (mw.config.get('wgVersion') === '1.19.24') {
            var $notif = $('<li/>')
                .attr('class', 'custom')
                .append(
                    $('<div>')
                    .attr('data-type', '2')
                    .html(notification.contents)
                    .append(
                        $('<a>')
                        .addClass('sprite close-notification')
                    )
                );

                if (hasNotifications) {
                    $notificationArea.append($notif);
                } else {
                    $('body').addClass('notifications')
                        .append($('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>')
                            .append($notif));
                }

            $('.sprite.close-notification').on('click', function () {
                $notif.hide();
                notifsData[mw.config.get('wgCityId')] = notification.version;
                window.localStorage.setItem(storageKey, JSON.stringify(notifsData));
            });
        } else {
            mw.loader.using('mediawiki.notify').then(function () {
                var text = $('<span>', {
                   html: notification.contents 
                });

                mw.notify(text, {
                   autoHide: false,
                   tag: 'WikiaNotification-' + mw.config.get('wgCityId').toString()
                });

                $('body').on('click', '.mw-notification-tag-WikiaNotification-' + mw.config.get('wgCityId').toString(), function () {
                    notifsData[mw.config.get('wgCityId')] = notification.version;
                    window.localStorage.setItem(storageKey, JSON.stringify(notifsData));
                });
            });
        }

        window.WikiaNotificationLoaded = true;
    }

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:WikiaNotification.css'
    });

    mw.loader.using('mediawiki.api', function() {
        getNotificationScope().then(function(scope) {
            var isAnon = !mw.config.get('wgUserName');

            scope = scope === 'all' || scope === 'anons' && isAnon || scope === 'users' && !isAnon;

            if (scope) {
                $(function() {
                    getNotificationData().then(showNotificationIfNotViewed).fail(log);
                });
            }
        }).fail(log);
    });
}(jQuery, mediaWiki));