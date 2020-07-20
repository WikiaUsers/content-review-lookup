/**
 * <nowiki>
 * AnnouncementsIgnore
 * Allows users to ignore announcements for certain wikis
 * With opt-out-all, you will opt out all wikis except those in exceptWikiIds
 * With opt-in-all, you will opt in all wikis, except those in exceptWikiIds
 *
 * Usage: Please see documentation. Personal use only.
 */

require([
   'mw',
   'wikia.window',
   'jquery',
   'ext.wikia.design-system.on-site-notifications.view'
   ], function(mw, window, $, View) {
      var options = (window.announcementsIgnore) || {},
         optionSet = 'option' in options && (options.option == 'opt-in-all' || options.option == 'opt-out-all'),
         wikiIds = null,
         isWikiaOrg = mw.config.get('wgServer').indexOf('wikia.org') !== -1,
         servicesUrl = 'https://services.' + (isWikiaOrg ? 'wikia.org' : 'fandom.com');

      // Clean wiki IDs
      if ('exceptWikiIds' in options && $.isArray(options.exceptWikiIds)) {
         wikiIds = [];
         $.each(options.exceptWikiIds, function(i, id) {
            if (wikiIds.indexOf(String(id)) === -1) {
               wikiIds.push(String(id));
            }
         });
      }

      if (!optionSet || wikiIds === null) {
         console.error('DiscussionsAnnounceOpt-In-Out: window.announcementsIgnore is not set correctly. No announcements ignored.');
         return;
      }

      var dai = {};

      dai.view = new View();

      // Starts the script and marks all unwanted announcements as read
      dai.init = function() {
         var newIgnoreURIs = [];
         // Get all announcements
         dai.getAnnouncements().then(function(data) {
            // Collect URIs to mark as read
            data.notifications.forEach(function(announcement) {
               if (!announcement.read && announcement.type == 'announcement-notification') {
                  if (options.option == 'opt-in-all' && wikiIds.indexOf(announcement.community.id) > -1) {
                     newIgnoreURIs.push(announcement.refersTo.uri);
                  }
                  if (options.option == 'opt-out-all' && wikiIds.indexOf(announcement.community.id) === -1) {
                     newIgnoreURIs.push(announcement.refersTo.uri);
                  }
               }
            });

            if (!newIgnoreURIs.length) {
               return;
            }
            dai.markAnnouncementsRead(newIgnoreURIs).then(function(data) {
               console.log('Ignored ' + newIgnoreURIs.length + ' announcements.');
            });
         });
      };

      // Gets list of unread announcements
      dai.getAnnouncements = function() {
         return $.ajax({
            url: servicesUrl + '/on-site-notifications/notifications/',
            type: 'GET',
            crossDomain: true,
            xhrFields: {
               withCredentials: true
            },
            data: {
               contentType: 'announcement-target'
            },
            dataType: 'json'
         });
      };

      // Marks a list of URIs as read
      dai.markAnnouncementsRead = function(uris) {
         return $.ajax({
            url: servicesUrl + '/on-site-notifications/notifications/mark-as-read/by-uri/',
            type: 'POST',
            crossDomain: true,
            xhrFields: {
               withCredentials: true
            },
            data: JSON.stringify(uris),
            contentType: 'application/json; charset=UTF-8'
         }).then(function(data) {
            // For each URI, render the notification as read
            uris.forEach(function(uri) {
               dai.view.renderNotificationAsRead(uri);
            });
            var numNotifications = dai.view._$notificationsCount.text();
            numNotifications = Math.max(numNotifications - uris.length, 0);
            dai.view.renderUnreadCount(numNotifications);
         });
      };

      // Start the script
      dai.init();
   }
);