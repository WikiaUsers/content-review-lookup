// Discussions rail module with Forum styling
// credit to User:KockaAdmiralac in [[w:c:dev:ConsistentModules]] for wrapper
(function() {
    // Module styling
    importStylesheetPage('MediaWiki:DiscussionsRailModule.css', 'speedit');
    // Rail function
    var $rail = $('#WikiaRail');
    if(!$rail.exists()) {
        return;
    }
    // Module function
    function addmodule() {
        if ($('#wikia-recent-activity').length && !$('.discussions-rail-theme.rail-module').length) {
            $('#wikia-recent-activity').after('<section class="discussions-rail-theme rail-module"></section>');
            new mw.Api().get({
                action: 'parse',
                text: '<discussions />'
            }).done(function(d) {
                $('#WikiaRail .discussions-rail-theme').html(d.parse.text['*']);
                mw.util.addCSS('.discussions-rail-theme .embeddable-discussions-module .embeddable-discussions-title { color: ' + wgSassParams["color-links"] + '; }');
                setTimeout(function() {
                    mw.hook('wikipage.content').fire(mw.util.$content);
                }, 500);
            });
        }
    }
    // Module addition
    if($rail.hasClass('loaded')) {
        addmodule();
    } else {
        var observer = new MutationObserver(addmodule);
        observer.observe($rail[0], { attributes: true });
        setTimeout(function() {
            observer.disconnect();
        }, 20000);
    }
})();