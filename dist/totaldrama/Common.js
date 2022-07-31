/* Any JavaScript here will be loaded for all users on every page load. */
/* Having TOC be collapsed by default */ 
mw.hook('wikipage.content').add(function () {
    if ($('.toctogglelabel').length) {
        $('.toctogglelabel').click();
    }
});