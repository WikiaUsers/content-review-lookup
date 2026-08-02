/**
 * @name Tally
 * @desc Displays live metrics, currently from Steam and Discord
 *       For Steam, it displays player counts
 *       For Discord, it displays member metrics
 * @auth [[User:ClodaghelmC]]
 */

(function (window, $, mw) {
    'use strict';

    if (window.TallyLoaded) {
        return;
    }
    window.TallyLoaded = true;

    (window.dev = window.dev || {}).tally = {};

    var workerBase = 'https://players-right-now.clodaghelm.workers.dev/';
    var fetchCache = {};

    /**
     * Helper to fetch data and save it
     * in memory so we don't spam
     * requests.
     */
    function cachedFetch(url) {
        if (!fetchCache[url]) {
            fetchCache[url] = fetch(url).then(function (res) {
                return res.json();
            });
        }
        return fetchCache[url];
    }

    /**
     * Helper to format numbers with commas or shorten them.
     * @param {number} num raw number to format
     * @param {boolean} [trim] `true` to shorten big numbers
     * @returns {string} formatted string
     */
    function countFormat(num, trim) {
        if (trim) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
            }
            return String(num);
        }
        return num.toLocaleString();
    }

    /**
     * Parser and populator with live data.
     * @fires cachedFetch
     */
    function steamMetrics() {
        var els = document.querySelectorAll('.tally.steam.player-count');
        Array.prototype.forEach.call(els, function (el) {
            var appId = el.getAttribute('data-app-id');
            if (!appId) {
                return;
            }
            var trim = el.getAttribute('data-trim') === 'true';
            cachedFetch(workerBase + '?appid=' + appId)
                .then(function (data) {
                    el.textContent = countFormat(data.response.player_count, trim);
                })
                .catch(function (err) {
                    console.error('[Tally] Failed to load metrics for app ID ' + appId + ':', err);
                });
        });
    }

    /**
     * Parser and populator with live data.
     * @fires cachedFetch
     */
    function discordMetrics() {
        function handle(metricClass, key) {
            var els = document.querySelectorAll('.tally.discord.' + metricClass);
            Array.prototype.forEach.call(els, function (el) {
                var inviteId = el.getAttribute('data-invite-id');
                if (!inviteId) {
                    return;
                }
                var trim = el.getAttribute('data-trim') === 'true';
                cachedFetch('https://discord.com/api/v10/invites/' + inviteId + '?with_counts=true')
                    .then(function (data) {
                        el.textContent = countFormat(data[key], trim);
                    })
                    .catch(function (err) {
                        console.error('[Tally] Failed to load metrics for invite ' + inviteId + ':', err);
                    });
            });
        }
        handle('online-count', 'approximate_presence_count');
        handle('member-count', 'approximate_member_count');
    }

    $(function () {
        steamMetrics();
        discordMetrics();
    });

}(this, jQuery, mediaWiki));