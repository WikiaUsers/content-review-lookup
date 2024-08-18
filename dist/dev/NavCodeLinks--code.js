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
    $('.wds-global-navigation__user-menu .wds-list, .wiki-tools .wds-dropdown__content .wds-list').append(
        ['Common.css', 'Common.js', 'FandomMobile.css'].map(function(ext) {
            return $('<li>', {
                append: $('<a>', {
                    'href': mw.util.getUrl('MediaWiki:' + ext),
                    text: ext
                })
            });
        })
    );
})();