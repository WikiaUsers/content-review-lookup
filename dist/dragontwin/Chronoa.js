/**
 * @name               Chronoa
 * @author             [[User:ClodaghelmC]]
 * @description        Creates Live, relative timestamps
 */

(function(window, $, mw) {
    'use strict';
    
    if (window.chronoaLoaded) return;
    window.chronoaLoaded = true;

    let chronoaTimer = null;
    const rtf = new Intl.RelativeTimeFormat(mw.config.get('wgUserLanguage') || 'en', { 
        numeric: 'auto'
    });

    const units = [
        { name: 'year',   seconds: 31536000 },
        { name: 'month',  seconds: 2592000 },
        { name: 'day',    seconds: 86400 },
        { name: 'hour',   seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 }
    ];

    function updateTimestamps() {
        const now = Math.floor(Date.now() / 1000);
        
        // Scope to main content and the right rail only
        const targetContainers = '#mw-content-text, .right-rail-wrapper';
        const elements = document.querySelectorAll(`${targetContainers}`);
        
        if (elements.length === 0) return;

        // Find all data-timestamp elements within those specific containers
        document.querySelectorAll(`${targetContainers} [data-timestamp]:not(.no-chronoa)`).forEach(el => {
            const rawValue = el.getAttribute('data-timestamp');
            if (!/^\d{10}$/.test(rawValue)) return; // r

            const unix = parseInt(rawValue);
            const diff = unix - now;
            const absDiff = Math.abs(diff);
            
            let output = 'just now';

            for (const u of units) {
                if (absDiff >= u.seconds) {
                    const count = Math.floor(absDiff / u.seconds);
                    output = rtf.format(diff > 0 ? count : -count, u.name);
                    break;
                }
            }
            
            if (el.textContent !== output) {
                el.textContent = output;
                el.setAttribute('data-live', output);
            }
        });
    }

    function manageTimer() {
        if (document.hidden) {
            clearInterval(chronoaTimer);
            chronoaTimer = null;
        } else {
            updateTimestamps();
            if (!chronoaTimer) {
                chronoaTimer = setInterval(updateTimestamps, 1000);
            }
        }
    }

    document.addEventListener('visibilitychange', manageTimer);
    
    // Tracks both page content and potential rail refreshes
    mw.hook('wikipage.content').add(function() {
        if (typeof manageTimer === 'function') {
            manageTimer();
        }
    });

    mw.loader.using(['mediawiki.util'], function() {
        importArticles({
            type: 'style',
            article: 'MediaWiki:Chronoa.css'
        });
    });

}(this, jQuery, mediaWiki));