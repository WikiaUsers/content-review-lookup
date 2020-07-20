// <nowiki>
/**
 * Script configuration
 */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity', 'Log', 'AbuseLog'];

/**
 * Loading UserTags from a page with JSON
 */
$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-user-tags',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
});

/**
 * Custom code
 */
(function() {
    // Apparently, Vignette is screwing up our GIF images in infoboxes and file pages
    // Interestingly, when these GIFs are scaled down, the issue doesn't happen
    // This fixes the image issue in infoboxes
    // For content review: you can test the script on [[Decibat]] page to see
    // the difference
    // I should really put this code somewhere so I don't have to copy it over and over
    $('.pi-image-collection img').each(function() {
        var $this = $(this),
            url = new mw.Uri($this.attr('src'));
        $this.removeAttr('srcset');
        if(url.path.indexOf('scale-to-width-down') !== -1) {
            return;
        }
        url.path += '/scale-to-width-down/' + $this.attr('width');
        url.query.cb = Number(url.query.cb) + 1;
        $this.attr('src', url.toString());
    });
})();