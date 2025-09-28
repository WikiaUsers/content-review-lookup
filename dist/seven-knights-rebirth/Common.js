/* === Infobox Collapsible Functionality === */
(function(mw, $) {
    if (!('.infobox-hero-main').length || window.infoboxCollapsibleLoaded) {
        return;
    }
    window.infoboxCollapsibleLoaded = true;

    function toggleCollapsible(e) {
        var $header = $(e.target);
        var $content = $header.next('.collapsible-content');

        if ($content.is(':animated')) {
            return;
        }

        $content.slideToggle(200, function() {
            $header.toggleClass('is-open'); 
        });
    }

    $(function() {
        $('.infobox-hero-main').on('click', '.section-header', toggleCollapsible);
    });
})(mediaWiki, jQuery);