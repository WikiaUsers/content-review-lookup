/* Automatically clean up subpage titles globally */
(function() {
    // Only run on standard article pages when viewing them
    if (mw.config.get('wgIsArticle') && mw.config.get('wgAction') === 'view') {
        var pageName = mw.config.get('wgPageName');
        
        // Check if the page title contains a subpage slash
        if (pageName.includes('/')) {
            // Get just the final part of the subpage path
            var cleanTitle = pageName.split('/').pop().replace(/_/g, ' ');
            
            // Apply the clean title to the main page header
            var header = document.querySelector('.page-header__title');
            if (header) {
                header.textContent = cleanTitle;
            }
        }
    }
})();