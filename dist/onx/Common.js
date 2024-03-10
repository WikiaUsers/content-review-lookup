/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces the default 'no image' image on page previews. */
window.pPreview = {};
window.pPreview.noimage = "https://static.wikia.nocookie.net/onx/images/e/e6/Site-logo.png/revision/latest?cb=20240304175616";

/* Loads Discord Integrator at the bottom of the rail every time. */
$(function() {
    mw.hook('DiscordIntegrator.added').add(function($el) {
        $el.appendTo('#WikiaRail');
    });
});