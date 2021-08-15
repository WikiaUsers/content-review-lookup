/* Any JavaScript here will be loaded for all users on every page load. 

mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});
*/
// ================================================================
// END - Sliders/JQuery
// ================================================================

var ShowHideConfig = { autoCollapse: 2 };

/* ==============
   Quiz Extension
   ============== */

   $(function () {
        $('#WikiaRail').prepend("<iframe width='100%' height='600' src='https://fandomrewards.typeform.com/to/VLwUreRS' style='margin:20px 0'></iframe>");
    });