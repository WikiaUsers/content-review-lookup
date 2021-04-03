/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;

$(function() {
    mw.hook('DiscordIntegrator.added').add(function($el) {
        $el.appendTo('#WikiaRail');
    });
});