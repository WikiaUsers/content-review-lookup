window.votingconfig = { strings: { none: 'brak', votesavg: 'Średnia ocena', votescount: 'Liczba ocen', uservote: 'Twoja ocena', views: 'Wyświetlenia', revcount: 'Liczba edycji', seemore: 'Zobacz więcej…', hide: '(<a>ukruj</a>)' }, style: { starsColor: { normal: 'FFDC00', empty: '999999', hover: 'FF851B' }, starSize: { other: 20 }, transitions: { starsWidth: '0.25s', starsColor: '0.25s', monobookStatsHeight: '0.5s' }, monobookClasses: '', monobookId: 'p-voting', custom: '' }, enabled: { allowedNamespaces: ['', 'File'], excludedPages: [wgMainPageTitle], mustBeArticle: true, customCheck: function customCheck() { return true; } }, monobookElement: '#p-navigation', disableViews: true, header: function header() { switch (wgCanonicalNamespace) { case '': return 'Oceń artykuł'; case 'Plik': return 'Oceń plik'; default: return 'Oceń artykuł'; } }, ratings: function ratings() { return { 1: 'Naganny', 2: 'Przeciętny', 3: 'Dobry', 4: 'Bardzo dobry', 5: 'Rewelacyjny' }; } };
 
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

/* Moduł Facebooka */
$(function() {
  $('#WikiaRail .loading').after('<div style="margin-bottom: 10px; max-height: 130px;"><iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=Darling-in-the-Franxx-Wiki-227272904708578&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="300" height="130" scrolling="no" /></div>');
});