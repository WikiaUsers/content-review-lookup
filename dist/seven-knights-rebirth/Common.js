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
/* === Tooltip effect list === */
window.tooltips_list = [
    {   classname: 'skill-tooltip',
        parse: '{'+'{Tooltips/skillIcon|<#param#>}}'}    
];
window.tooltips_config = {
	offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    noCSS: false
};