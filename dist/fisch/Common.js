/* Any JavaScript here will be loaded for all users on every page load. */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 21;
window.lockOldComments.addNoteAbove = true;
mw.loader.load('jquery.makeCollapsible');
mw.loader.using('jquery.makeCollapsible', function () {
    $(function () {
        $('.mw-collapsible').makeCollapsible();
    });
});