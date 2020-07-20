(function() {
    'use strict';
    var mainWorker;

    /**
     * Dummy 'mw' object fix by OneTwoThreeFall
     */
    self.mw = {
        loader: {
            state: function () {}
        }
    };

    /**
     * Generate a service worker notification
     */
    self.addEventListener('message', function(e) {
        if (e.data.command !== 'van_send_notif') { return; }
        mainWorker = e.ports[0];
        self.registration.showNotification('VanguardTools', {
            body: e.data.i18n.source,
            actions: [
                {
                    action: 'ok',
                    title: e.data.i18n.ok
                },
                {
                    action: 'cancel',
                    title: e.data.i18n.cancel,
                }
            ],
            icon: 'https://images.wikia.nocookie.net/dev/images/b/bc/Wiki.png'
        });
    });

    /**
     * Wait for action
     */
    self.addEventListener('notificationclick', function(e) {
        e.notification.close();
        if (e.action === 'ok') {
            mainWorker.postMessage({ command: 'van_create_infobox' });
        }
    });

}());