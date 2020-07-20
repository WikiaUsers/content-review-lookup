$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        if ($('.activity-module').exists()) {
            $('.DiscordIntegratorModule').insertAfter('.activity-module');
        } else {
            $('.DiscordIntegratorModule').prependTo('#WikiaRail');
        }
    });
});