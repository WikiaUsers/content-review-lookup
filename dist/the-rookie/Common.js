/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    mw.hook('DiscordIntegrator.added').add(function($el) {
        $el.appendTo('#WikiaRail');
    });
});