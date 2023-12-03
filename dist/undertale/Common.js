/**
 * Loading UserTags from a page with JSON
 */
mw.loader.using('mediawiki.api').then(function() {
    new mw.Api().get({
        action: 'query',
        formatversion: 2,
        titles: 'MediaWiki:Custom-user-tags.json',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main'
    }).then(function(data) {
        window.UserTagsJS = JSON.parse(data.query.pages[0].revisions[0].slots.main.content);
    });
});

/**
 * Miscellaneous code
 */
(function() {
    // AddRailModule configuration
    var ns = mw.config.get('wgNamespaceNumber');
    window.AddRailModule = (
        !localStorage.getItem('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? [
        {
            page: 'int:custom-spoiler-warning',
            prepend: true
        }
    ] : [];

    // Move spoiler warning to the top, but below ads
    // Set a listener to remove the module when dismissed
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'int:custom-spoiler-warning') {
            var $module = $('#WikiaRail .railModule');
            $module.find('#spoiler-warning-button').click(function() {
                localStorage.setItem('spoiler-warning', '1');
                $module.slideToggle();
            });
        }
    });

    mw.hook('DiscordIntegrator.added').add(function() {
        var $content = $('#WikiaRail .railModule');
        $content.insertBefore('.DiscordIntegratorModule');
    });
})();