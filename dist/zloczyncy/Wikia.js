/* Modified WikiaNotification (dev.wikia.com/MediaWiki:WikiaNotification/code.js?oldid=69174) script to send notification only for anonymous users */
require(['jquery', 'mw'], function ($, mw) {
    var storageKey = 'ls-wikianotificationsanon';
 
    function log(error) {
        console.log('WikiaNotifications error: ' + error);
    }
 
    function getNotificationData() {
        return (new mw.Api()).get({
            action: 'parse',
            disablepp: '',
            page: 'MediaWiki:Custom-WikiaNotificationsAnon',
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
 
        if (mw.config.get("wgUserName")) {
            return;
        }
 
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
            } 
            else {
                $('body').addClass('notifications')
                    .append($('<ul id="WikiaNotifications" class="WikiaNotifications"></ul>')
                        .append($notif));
            }
 
        $('.sprite.close-notification').on('click', function () {
            $notif.hide();
            notifsData[mw.config.get('wgCityId')] = notification.version;
            window.localStorage.setItem(storageKey, JSON.stringify(notifsData));
        });
    }
 
    mw.loader.using('mediawiki.api', function() {
        $(function() {
            getNotificationData().then(showNotificationIfNotViewed).fail(log);
        });
    });
});