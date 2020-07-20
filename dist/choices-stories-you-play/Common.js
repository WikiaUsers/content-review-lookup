/* Any JavaScript here will be loaded for all users on every page load. */

window.railWAM = {
    logPage:"Project:WAM Log"
};
mw.hook('wikipage.content').add(function($content) {
    $content.find('.iframe:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                frameborder: 0,
                height: 550,
                src: 'https://brackethq.com/b/iezb/embed/',
                width: 750
            })
        ).addClass('loaded');
    });
});