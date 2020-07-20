/* 
* NavCodeLinks
* Adds Wiki's CSS and JS link to navigation dropdown
* @author Monochromatic Bunny
*/
(function () {
    if (window.NavCodeLinksLoaded) {
        return;
    }
    window.NavCodeLinksLoaded = true;
    $('.wds-global-navigation__user-menu .wds-list').prepend(
        ['css', 'js'].map(function(ext) {
            return $('<li>', {
                append: $('<a>', {
                    'href': mw.util.getUrl('MediaWiki:Wikia.' + ext),
                    text: 'Wikia ' + ext.toUpperCase()
                })
            });
        })
    );
})();