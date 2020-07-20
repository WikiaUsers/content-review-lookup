/**
 * Script configuration
 */
$.extend(window, {
    // AbuseLogRC
    abuseLogRC_users: [
        'Cheeseskates',
        'Man Son You'
    ],
    abuseLogRC_collapsible: true,
    abuseLogRC_entries: 5,
    // AddRailModule
    ARMPrepend: true,
    // AjaxRC
    AjaxRCRefreshText: 'Auto-Refresh',
    AjaxRCRefreshHoverText: 'Automatically refresh the page',
    ajaxSpecialPages: [
        'Recentchanges',
        'WikiActivity',
        'Log',
        'AbuseLog'
    ]
});

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
 * Miscellaneous code
 */
(function() {
    // AddRailModule configuration
    var ns = mw.config.get('wgNamespaceNumber');
    window.ARMModules = (
        !$.storage.get('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? ['int:custom-spoiler-warning'] : [];

    // Apparently, Vignette is screwing up our GIF images in infoboxes and file pages
    // Interestingly, when these GIFs are scaled down, the issue doesn't happen
    // This fixes the image issue in infoboxes
    // For content review: you can test the script on [[Mettaton]] page to see
    // the difference
    $('.pi-image-collection img').each(function() {
        var $this = $(this),
            url = new mw.Uri($this.attr('src'));
        $this.removeAttr('srcset');
        if (url.path.indexOf('scale-to-width-down') === -1) {
            url.path += '/scale-to-width-down/' + $this.attr('width');
        }
        url.query.cb = Number(url.query.cb) + 1;
        $this.attr('src', url.toString());
    });

    // Move spoiler warning to the top, but below ads
    // Set a listener to remove the module when dismissed
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'int:custom-spoiler-warning') {
            var $module = $('#WikiaRail .railModule');
            $module.find('#spoiler-warning-button').click(function() {
                $.storage.set('spoiler-warning', true);
                $module.slideToggle();
            });
        }
    });

    mw.hook('DiscordIntegrator.added').add(function() {
        var $content = $('#WikiaRail .railModule');
        $content.insertBefore('.DiscordIntegratorModule');
    });
})();