/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    $(".linkhover").hover(function() {
        $(".imagehover").css("display","table");
    },function() {
        $(".imagehover").css("display","none");
    });
});
window.MassCategorizationGroups = ['sysop', 'content-moderator'];