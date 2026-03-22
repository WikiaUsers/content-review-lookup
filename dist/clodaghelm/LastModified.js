/**
 * @name            LastModified
 * @author          [[User:ClodaghelmC]]
 * @description     Injects a dual-column footer layout for created pages
 */
 
(function(window, $, mw) {
    'use strict';

    if (window.LastModifiedLoaded || 
        mw.config.get('wgArticleId') === 0 || 
        mw.config.get('wgNamespaceNumber') < 0 || 
        mw.config.get('wgAction') !== 'view') {
        return;
    }
    window.LastModifiedLoaded = true;

    const conf = mw.config.get([
        'wgArticleId',
        'wgUserDateFormat'
    ]);

    /**
     * Helper to format dates based on Special:Preferences
     * @param {string} timestamp ISO timestamp from the API
     * @returns {string} Formatted date string
     */
    function formatUserDate(timestamp) {
        const date = new Date(timestamp);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = hours + ':' + minutes;

        // Respect user date preference from wgUserDateFormat
        switch (conf.wgUserDateFormat) {
            case 'mdy': return time + ', ' + month + ' ' + day + ', ' + year;
            case 'dmy': return time + ', ' + day + ' ' + month + ' ' + year;
            case 'ymd': return time + ', ' + year + ' ' + month + ' ' + day;
            case 'iso': return date.toISOString().split('.')[0].replace('T', ' ');
            default: return time + ', ' + month + ' ' + day + ', ' + year;
        }
    }

    /**
     * Renders the custom footer grid between Categories and Discussions
     * @param {string} dateStr - The formatted date string
     */
    function lastModified(dateStr) {
        // Target the discussion container
        const $discussions = $('#article-discussions, .mw-data-after-content');
        if (!$discussions.length) return;

        const $container = $('<div>', { 'class': 'page-footer__last-edited' });

        // == Last Modified ==
        const $leftCol = $('<div>', { 'class': 'last-edited__content' }).append(
            $('<div>', { 'class': 'rail-module__header', 'text': 'Last Modified' }),
            $('<div>', { 'class': 'footer-content', 'text': 'This page was last edited on ' + dateStr + '.' })
        );

        // == Copyright ==
        const licenseHTML = $('.license-description').html() || 'Community content is available under CC-BY-SA unless otherwise noted.';
        const $rightCol = $('<div>', { 'class': 'footer-column' }).append(
            $('<div>', { 'class': 'rail-module__header', 'text': 'Copyright' }),
            $('<div>', { 'class': 'footer-content' }).html(licenseHTML)
        );

        $container.append($leftCol, $rightCol);
        
        // Hide original license to avoid redundancy
        $('.license-description').hide();
        
        // Insert before discussions
        $container.insertBefore($discussions);
    }

    /**
     * Initialize
     */
    function init() {
        const api = new mw.Api();
        api.get({
            action: 'query',
            prop: 'revisions',
            pageids: conf.wgArticleId,
            rvprop: 'timestamp',
            formatversion: 2
        }).done(function(data) {
            if (data && data.query && data.query.pages[0].revisions) {
                lastModified(formatUserDate(data.query.pages[0].revisions[0].timestamp));
            }
        }).fail(function() {
            console.warn('LastModified: Failed to fetch page revision data.');
        });
    }

    // Run after the DOM is ready
    $(init);

}(window, jQuery, mediaWiki));