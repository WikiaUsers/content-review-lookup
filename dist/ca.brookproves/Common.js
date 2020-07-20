// ==================================================
//            imports
// ==================================================

importArticles({
    type: "script",
    articles: [
         "w:dev:ShowHide/code.js", /* Show and Hide code by tables */
         "w:dev:BackToTopButton/code.js", /* Back to top button */
         "w:dev:Countdown/code.js", /* Countdown timers on the wiki */
         "w:dev:DupImageList/code.js", /* Duplicate images */
         "w:dev:SearchGoButton/code.js", /* Search go button */
         "w:dev:AutoEditDropdown/code.js", /* Auto edit dropdown */
         "w:dev:FixMultipleUpload/code.js", /* Fixes the broken Edit Tools template on Special:MultipleUpload */
         "w:dev:WallGreetingButton/code.js", /* Adds a button to Message Wall pages that allows a user to easily edit their wall greeting */
         "w:dev:FileUsageAuto-update/code.js", /* Automatically updates file links throughout the wiki upon renaming */
 
    ]
});

// ==================================================
//   Slider de la [[Portada]] by User:Tierrie
// ==================================================
 
mw.loader.using(['jquery.ui.tabs'], function () {
    $(function () {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function () { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function () {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function () { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});