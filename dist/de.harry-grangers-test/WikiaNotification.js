require(['jquery', 'mw'], function ($, mw) {
    var storageKey = 'ls-wikianotifications';
 
    function log(error) {
        console.log('WikiaNotifications error: ' + error);
    }
 
    function getNotificationData() {
        return new Promise(function(resolve,reject) {
            (new mw.Api()).get({
                action: 'query',
                titles: 'MediaWiki:Custom-WikiaNotifications',
                prop: 'revisions',
                rvprop: ['content','ids'].join('|'),
                format: 'json',
                indexpageids: true,
                rvparse: true
            }).then(function (res) {
                if (res.error) {
                    return reject(res.error.info);
                }
               if(res.query.pageids[0] != "-1") {
                    _page = res.query.pages[res.query.pageids[0]].revisions[0];
                    if(_page['*'].length && _page['*'].trim() !== '') {
                        resolve({
                            version: _page.revid,
                            contents: _page['*']
                        });
                    }
                    else {
                        reject('empty content');
                    }
               }
            });
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
 
        var $notif = $('<li/>')
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
            getNotificationData().then(showNotificationIfNotViewed).catch(log);
        });
    });
});