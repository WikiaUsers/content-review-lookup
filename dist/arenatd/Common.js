/* Any JavaScript here will be loaded for all users on every page load. */

(function() {
    var visited = localStorage.getItem('visited');
    if (!visited) {
        document.getElementById("halloweenpopup").style.visibility = "visible";
        localStorage.setItem('visited', true);
    }
})();

mw.hook('wikipage.content').add(function($content) {
    $content.find('.EmulatorFrame:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                height: 540,
                scrolling: 'no',
                src: '/*INSERT LINK HERE*/',
                width: 720
            })
        ).addClass('loaded');

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for secret mail. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};