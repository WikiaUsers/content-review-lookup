// Discussions rail module with Forum styling
// credit to User:KockaAdmiralac for wrapper
(function() {
    // Module styling
    importArticles({
        type: 'style',
        article: 'u:dev:DiscussionsRailModule/code.css'
    });
 
    // Rail function
    var $rail = $('#WikiaRail');
    if(!$rail.exists()) {
        return;
    }
 
    // Module function
    function addmodule() {
        if ($('.insights-module').length && !$('.discussions-rail-theme.rail-module').length && $('.wds-community-header .wds-tabs__tab:last-child a[data-tracking="discuss"]').length) {
            $('.insights-module').before($('<section>', {class: 'discussions-rail-theme rail-module'}));
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