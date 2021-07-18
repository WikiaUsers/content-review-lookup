/* PurgeD
 *
 * @author Dorumin
 * Personal use
 */

(function() {
    window.PurgeD = {
        key: 'PurgeD-cache-key',
        ttl: 1000 * 60 * 10,
        wg: mw.config.get([
            'wgUserGroups',
            'wgServer'
        ]),
        canRun: function() {
            return this.hasRights([
                'sysop',
                'staff',
                'helper',
                'global-discussions-moderator',
                'wiki-representative',
                'soap'
            ]);
        },
        hasRights: function(rights) {
            var len = rights.length;
            while (len--) {
                if (this.wg.wgUserGroups.indexOf(rights[len]) !== -1) return true;
            }

            return false;
        },
        init: function() {
            var x = sessionStorage.getItem(this.key);
            if (x) {
                var date = new Date(x);

                if (date.getTime() + this.ttl > Date.now()) return;
            }

            sessionStorage.setItem(this.key, new Date().toISOString());


            this.fetch().then(function(r) {
                if (r._embedded.threads && r._embedded.threads.length) {
                    r._embedded.threads.forEach(function(thread, i) {
                        setTimeout(function() {
                            var xhr = new XMLHttpRequest();
                            xhr.open('PUT', this.wg.wgServer + '/wikia.php?controller=DiscussionThread&method=delete&threadId=' + thread.id, true);
                            xhr.withCredentials = true;
                            xhr.send();
                        }.bind(this), i * 2000);
                    }.bind(this));
                }
            }.bind(this));
        },
        fetch: function() {
            return new Promise(function(res) {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', this.wg.wgServer + '/wikia.php?controller=DiscussionThread&method=getThreads&sortKey=trending&limit=100&responseGroup=small&viewableOnly=true', true);

                xhr.onload = function() {
                    res(JSON.parse(xhr.response));
                };

                xhr.send();
            }.bind(this));
        }
    };

    if (!PurgeD.canRun()) return;

    PurgeD.init();
})();