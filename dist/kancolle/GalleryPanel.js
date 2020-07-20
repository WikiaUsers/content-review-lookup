/**
 * 1. Move galleries to WikiaRail on ship pages, after DiscordIntegrator.
 * 2. Simultaneously switch all subtabs.
 */
(function(mw, $) {

    "use strict";

    mw.hook('DiscordIntegrator.added').add(function() {
        var wikiaRail = $('#WikiaRail');
        var shipPageGallery = $('.ship-page-gallery');
        if (wikiaRail.length === 1 && shipPageGallery.length === 1 && localStorage.getItem("WikiaRailChecked") !== "true") {
            var panelContent = $('<section class="module ship-page-gallery-module" />').prepend(shipPageGallery);
            wikiaRail.prepend(panelContent);
            window.dispatchEvent(new CustomEvent("scroll"));
        }
        $('.ship-page-gallery').each(function() {
            var buttons = $(this).find('.ship-page-gallery-tab .tabbernav a');
            buttons.each(function (i) {
                var x = $(this);
                x.mousedown(function () {
                    buttons.each(function (j) {
                        var y = $(this);
                        if (i !== j && (x.text() === 'Normal' && y.text() === 'Normal' || x.text() === 'Damaged' && y.text() === 'Damaged')) {
                            y.click();
                        }
                    });
                });
            });
        });
    });

}(mediaWiki, jQuery));