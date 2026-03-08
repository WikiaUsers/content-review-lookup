/**
 * @name:        Chronoa
 * @author:      [[User:ClodaghelmC]]
 * @description: Creates live, relative timestamps
 */
 
(function (window, $, mw) {
    'use strict';
    
    // prevent double loading
    if (window.chronoaLoaded) {
        return;
    }
    window.chronoaLoaded = true;

    let chronoaTimer = null;

    // --- Main function to find and update timestamps
    function chronoa() {
        const now = Math.floor(Date.now() / 1000);
        
        document.querySelectorAll('[data-timestamp]').forEach(el => {
            const rawValue = el.getAttribute('data-timestamp');

            // checks if the string contains only digits (\d) and is exactly 10 characters long ({10})
            if (!/^\d{10}$/.test(rawValue)) return;

            const unix = parseInt(rawValue);
            
            const diff = unix - now;
            const absDiff = Math.abs(diff);
            
            const units = [
                { n: 'year', s: 31536000 }, { n: 'month', s: 2592000 },
                { n: 'day', s: 86400 }, { n: 'hour', s: 3600 }, 
                { n: 'minute', s: 60 }, { n: 'second', s: 1 }
            ];
            
            let output = 'just now';
            for (let u of units) {
                if (absDiff >= u.s) {
                    const count = Math.floor(absDiff / u.s);
                    let unitStr = u.n;
                    let countStr = count;
                    
                    // apply natural phrasing for single units
                    if (count === 1) {
                        countStr = (u.n === 'hour') ? 'an' : 'a';
                    } else {
                        unitStr += 's'; // pluralize if count > 1
                    }
                    
                    output = `${countStr} ${unitStr}`;
                    output = diff > 0 ? `in ${output}` : `${output} ago`;
                    break;
                }
            }
            
            // only update the DOM if the text has actually changed
            if (el.textContent !== output) {
                el.textContent = output;
                // push the live string to an attribute for CSS to read
                el.setAttribute('data-live', output);
            }
        });
    }

    function chronoaVis() {
        if (document.hidden) {
            // stop the timer when the tab is hidden
            clearInterval(chronoaTimer);
            chronoaTimer = null;
        } else {
            // snap to the correct live time immediately on tab return
            chronoa();
            if (!chronoaTimer) {
                chronoaTimer = setInterval(chronoa, 1000);
            }
        }
    }
    
    // Initialize the script and listen for tab focus changes
    document.addEventListener('visibilitychange', chronoaVis);
    chronoaVis();

    mw.loader.using(['mediawiki.util'], function () {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Chronoa.css'
        });
    });

}(this, jQuery, mediaWiki));