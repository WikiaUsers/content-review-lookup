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
    importArticle({article: 'u:dev:MediaWiki:DiscordIntegrator/code.js'});
})();