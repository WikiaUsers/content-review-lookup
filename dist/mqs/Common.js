mw.loader.using(['mediawiki.util'], function () {
    // Get page title and URL parameters
    var pageTitle = mw.config.get('wgTitle');
    var action = mw.config.get('wgAction');
    var namespace = mw.config.get('wgCanonicalSpecialPageName');
    
    // Only proceed if the page title includes "/Chapter"
    // and it is not an edit, history, delete action or a specific Special page.
    if (
        pageTitle.includes('/Chapter') &&
        !['edit', 'history', 'delete'].includes(action) &&
        !['MovePage', 'BlankPage'].includes(namespace)
    ) {
        // Fetch the template content using the MediaWiki API
        $.ajax({
            url: mw.util.wikiScript('api'),
            method: 'GET',
            data: {
                action: 'parse',
                page: 'Template:ChapterWarning', // The template to insert
                format: 'json',
                disablepp: true
            },
            dataType: 'json',
            success: function(data) {
                if (data.parse && data.parse.text) {
                    // Create a new div with the template content
                    var chapterWarning = $('<div>').html(data.parse.text['*']);
                    
                    // Insert the template content at the top of #mw-content-text
                    $('#mw-content-text').prepend(chapterWarning);
                }
            },
            error: function() {
                console.error('Failed to fetch the ChapterWarning template.');
            }
        });
    }
});