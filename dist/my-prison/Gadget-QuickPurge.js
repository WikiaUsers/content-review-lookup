(function() {
    'use strict';

    if (window.quickPurgeLoaded) return;
    window.quickPurgeLoaded = true;

    var api = new mw.Api();
    var isPurging = false;

    function purgePage(title) {
        if (isPurging) return;
        isPurging = true;

        // Visual feedback using MediaWiki's native notification
        mw.notify('Purging cache...', { tag: 'quickPurge', autoHide: false });

        api.post({
            action: 'purge',
            forcelinkupdate: true,
            titles: title
        }).then(function() {
            // Redirect to the actual page to ensure we leave Special:Purge
            location.href = mw.util.getUrl(title);
        }).catch(function(code, e) {
            isPurging = false;
            mw.notify('Error purging page: ' + code, { type: 'error' });
            console.warn('Purge error for "' + title + '":', e.error.info);
        });
    }

    // Intercept clicks (case-insensitive for 'purge')
    $(document.body).on("click", 'a[href*="purge" i]', function(e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;

        var url = new URL(e.currentTarget.href);
        var page = url.searchParams.get('title') || 
                   url.searchParams.get('page');

        // Handle Special:Purge/PageName format
        if (!page && url.pathname.includes('Special:Purge/')) {
            page = decodeURIComponent(url.pathname.split('Special:Purge/')[1]);
        }
        
        // Fallback to current page if no title is found in the link
        page = page || mw.config.get('wgPageName');

        if (page) {
            e.preventDefault();
            purgePage(page);
        }
    });

    // Immediate execution if the user lands on the purge confirmation action
    if (mw.config.get('wgAction') === "purge") {
        purgePage(mw.config.get('wgPageName'));
    }
})();