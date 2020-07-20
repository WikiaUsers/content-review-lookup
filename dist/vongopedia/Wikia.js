// Przeniesienie modułu Discorda
$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').appendTo('#WikiaRail');
    });
});