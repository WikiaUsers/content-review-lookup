/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function ($content) {
    // 1. Gather all internal wiki links on the current page
    var $links = $content.find('a[title]:not(.image):not(.new)');
    if (!$links.length) return;

    var titles = [];
    $links.each(function () {
        var title = $(this).attr('title');
        if (title && titles.indexOf(title) === -1) {
            titles.push(title);
        }
    });

    // 2. Query MediaWiki API in batches (max 50 titles per request) (BOOOOOORING.....)
    while (titles.length > 0) {
        var batch = titles.splice(0, 50);
        
        new mw.Api().get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            titles: batch.join('|'),
            formatversion: 2
        }).done(function (data) {
            if (!data.query || !data.query.pages) return;

            data.query.pages.forEach(function (page) {
                if (!page.revisions || !page.revisions[0]) return;

                var content = page.revisions[0].slots.main.content;
                
                // Check if the page uses Profile Infobox with isVerified set to true or yes
                var isVerified = /\{\{\s*Profile Infobox[\s\S]*?\|?\s*isVerified\s*=\s*(true|yes)/i.test(content);

                if (isVerified) {
            
                    var escapedTitle = $.escapeSelector(page.title);
                    $content.find('a[title="' + escapedTitle + '"]').addClass('is-verified-user');
                }
            });
        });
    }
});