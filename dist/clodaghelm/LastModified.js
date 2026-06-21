/**
 * @name LastModified
 * @desc Displays last modified timestamp of the current page
 * @auth [[User:ClodaghelmC]]
 */

(function (window, $, mw) {
    'use strict';
    
    // Set default
    window.LastModified = $.extend({
    	timezone: 'auto'
    }, window.LastModified || {});

    // Double load protection
    if (window.LastModified.loaded) {
        return;
    }
    window.LastModified.loaded = true;

    // Cache config
    var conf = mw.config.get([
        'wgArticleId'
    ]);

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        var api = new mw.Api();

        api.get({
            action: 'query',
            prop: 'revisions',
            pageids: conf.wgArticleId,
            rvprop: 'timestamp',
            formatversion: 2
        }).done(function (data) {
            if (!data.query || !data.query.pages || !data.query.pages[0].revisions) {
                return;
            }

            var ts = data.query.pages[0].revisions[0].timestamp;
            var dateObj = new Date(ts);

            // Determine timezone
            var targetTimeZone = (window.LastModified.timezone === 'auto')
                ? Intl.DateTimeFormat().resolvedOptions().timeZone
                : window.LastModified.timezone;

            var formatter = new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: targetTimeZone,
                timeZoneName: 'short'
            });

            var parts = formatter.formatToParts(dateObj);
            var dateStr = parts.find(function (p) { return p.type === 'day'; }).value + ' ' +
                          parts.find(function (p) { return p.type === 'month'; }).value + ' ' +
                          parts.find(function (p) { return p.type === 'year'; }).value;
            var timeStr = parts.find(function (p) { return p.type === 'hour'; }).value + ':' +
                          parts.find(function (p) { return p.type === 'minute'; }).value;
            var tzStr = parts.find(function (p) { return p.type === 'timeZoneName'; }).value;

            var formattedDate = dateStr + ', at ' + timeStr + ' (' + tzStr + ')';

            var $lastModified = $('<div>', {
                'class': 'last-modified',
                'text': 'This page was last edited on ' + formattedDate + '.'
            });

            $('.license-description').before($lastModified);
        });

        importArticles({
            type: 'style',
            articles: [
                'u:clodaghelm:MediaWiki:LastModified.css'
            ]
        });
    });
})(this, jQuery, mediaWiki);